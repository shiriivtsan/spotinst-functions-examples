const rp = require('request-promise')

function checkEventType(eventDetails){
	let title = ""
	let text = ""
	if(eventDetails.event == "AWS_EC2_INSTANCE_LAUNCH"){
		title = "New Instance Launched in " + eventDetails.resourceId
		text = "Instance ID " + eventDetails.instanceId
	}else if(eventDetails.event == "AWS_EC2_INSTANCE_TERMINATE"){
		title = "Instance Terminated in " + eventDetails.resourceId
		text = "Instance ID " + eventDetails.instanceId
	}else if(eventDetails.event == "AWS_EC2_INSTANCE_UNHEALTHY_IN_ELB"){
		title = "Instance Unhealthy in " + eventDetails.resourceId
		text = "Instance ID " + eventDetails.instanceId
	}
	return [title, text]
}

// returned if there was an error with a callback
function callbackError(){
	return ({
			statusCode: 400, 
			body: 'Error: Check logs',
			headers: {"Content-Type": "application/json"}
		})
}

module.exports.main = function main (event, context, callback) {
	// Data dog key
	let key = {Your Data Dog Key}

	// Check if event has been triggered
	try{
	    let eventDetails = JSON.parse(JSON.parse(event.body).message)
	    console.log(eventDetails)

	    let title = checkEventType(eventDetails)[0]
	    let text = checkEventType(eventDetails)[1]
	}catch(e){
		console.log(e)
	    callback(null, callbackError());
	}

	// Options to post an event to DD
	let options = {
		uri:'https://app.datadoghq.com/api/v1/events',
		method: "POST",
		qs: {api_key: key},
		headers: {
			"Content-Type": "application/json"},
		body: 
		{"title": title,
		"text": text,
		"priority": "normal",
		"tags": ["Spotinst"],
		"alert_type": "info"},
		json:true
	}

	console.log(title)
	rp(options).then((res)=>{
		console.log(res)
	    callback(null, {
			statusCode: 200, 
			body: 'Success',
			headers: {"Content-Type": "application/json"}
		});
	}).catch((err)=>{
		console.log(err)
	    callback(null, callbackError());
	})
};
