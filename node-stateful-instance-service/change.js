const rp = require("request-promise")

const environmentURL = "https://app-098d0fae-spotinstapi-execute-function1.spotinst.io/"

const getAllStateful = {
	uri: environmentURL+"get-all-stateful",
	method:"POST",
	headers:{"Content-Type": "application/json"},
	json:true
}

function pauseAll(groups){
	return ({
		uri: environmentURL+"pause-stateful",
		method:"POST",
		headers:{"Content-Type": "application/json"},
		body:groups,
		json:true
	})
}

function resumeAll(groups){
	return ({
		uri: environmentURL+"resume-stateful",
		method:"POST",
		headers:{"Content-Type": "application/json"},
		body:groups,
		json:true
	})
}

module.exports.main = function main (event, context, callback) {
	let payload = null
	if(event.body) payload = JSON.parse(event.body)
	else callback(null, {statusCode:400, body:"Params not included"})

	console.log(payload)
	let request

	rp(getAllStateful).then((res)=>{
		console.log(res)
		if(payload.state=="pause") request = pauseAll(res)
		else if(payload.state=="resume") request = resumeAll(res)

		rp(request).then((res)=>{
			payload["results"] = res
			console.log(payload)
			callback(null, {statusCode:200, body:JSON.stringify(payload)})
		}).catch((err)=>{
			console.log(err)
			callback(null, {statusCode:400, body:"Error"})
		})
	}).catch((err)=>{
		console.log(err)
		callback(null, {statusCode:400, body:"Error"})
	})

}