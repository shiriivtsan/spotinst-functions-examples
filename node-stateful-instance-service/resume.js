const rp = require("request-promise")
const async = require("async")

function setPause(input){
	return ({
		uri:`https://api.spotinst.io/aws/ec2/group/${input.groupId}/statefulInstance/${input.ssiID}/resume`,
		method:`PUT`,
		qs:{"accountId": input.accountId},
		headers:{
			"Content-Type": "application/json",
			"Authorization": `Bearer ${input.token}`},
		json:true
	})
}

module.exports.main = function main (event, context, callback) {
	let input = {
		accountId: process.env['accountId'],
		token: process.env['token']
	}

	let payload = null
	if(event.body) payload = JSON.parse(event.body)
	else callback(null, {statusCode:400, body:"Params not included"})

	let groupsList = Object.keys(payload)
	let instanceList, requestList = []


	groupsList.forEach((singleGroup)=>{
		console.log(singleGroup)

		input.groupId = singleGroup
		instanceList = payload[singleGroup]

		instanceList.forEach((singleInstance)=>{
			console.log(singleInstance)

			input.ssiID = singleInstance
			requestList.push(setPause(input))
		})
		console.log("\n")
	})

	async.map(requestList, (singleRequest, mapCallback)=>{
		rp(singleRequest).then((res)=>{
			let successID = res.request.url.split("/")[6]
			mapCallback(null, {resume:true, id: successID})
		}).catch((err)=>{
			let failedID = err.error.request.url.split("/")[5]
			mapCallback(null, {resume:false, id: failedID})		
		})
	}, (err, asyncRes)=>{
		if(err) callback(null, {statusCode:400, body: console.log(err)})

		console.log(asyncRes)

		let success = [], failed = []
		asyncRes.forEach((singleResponse)=>{
			if(singleResponse.resume) success.push(singleResponse.id)
			else failed.push(singleResponse.id)
		})

		console.log(JSON.stringify({success:success, failed:failed}))
		callback(null, {statusCode:200, body: JSON.stringify({success:success, failed:failed})})
	})
};

