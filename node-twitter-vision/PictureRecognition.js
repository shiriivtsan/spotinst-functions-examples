const rp = require('request-promise')

module.exports.main = function main (event, context, callback) {
	let params = event.query.imageInfo.split(",")
	let user = params[0]
	let url = params[1]

	let visionKey = process.env['visionKey']

	let account = process.env['spotAccount']
	let token = process.env['spotToken']
	let environment = process.env['spotEnvironment']

	let body = {"requests":[
		{
			"image":{"source":{"imageUri":url}},
			"features":{"type": "LABEL_DETECTION",}
		}
	]}

	let options = {
		uri:'https://vision.googleapis.com/v1/images:annotate',
		qs:{key: visionKey},
		method:'POST',
		headers:{ 'Content-Type': 'application/json'},
		body:body,
		json:true
	}

	rp(options).then((res)=>{
		let resList = res.responses[0].labelAnnotations
		let tags = []
		for(index in resList){
			tags.push(resList[index].description)
		}

		let postValue = `{
			"user":"${user}",
			"url":"${url}",
			"tags":"${tags.toString()}"
		}`

		let postOptions = {
			uri:'https://api.spotinst.io/functions/environment/'+environment+'/userDocument',
			method: "POST",
			qs: {accountId: account},
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token},
			body: {
				"userDocument": {
					"key": url.slice(28,-4),
					"value": postValue}},
			json:true
		}
		console.log(postOptions)

		rp(postOptions).then((res)=>{
			console.log(res)
			callback(null,{statusCode:200,body:"Success"})
		}).catch((err)=>{
			console.log(err)
			callback(null, {statusCode:400, body:err})
		})	
	}).catch((err)=>{
		console.log(err)
		callback(null, {statusCode:400,body:err})
	})
}

