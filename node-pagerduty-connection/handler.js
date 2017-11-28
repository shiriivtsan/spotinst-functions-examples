const rp = require('request-promise')

/*
This function take in the POST information from the notifcation on your Elastigroup. Here we can check
what type of notification you received and then retun a String value that you want to corrispond to
the notification

@param eventDetails This variable holds the information that is returned from the POST request that is
                    made when this function is triggered
@return String      Return the String value that you want to see for each event type
*/
function checkEventType(eventDetails){
	if(eventDetails.event == "AWS_EC2_INSTANCE_LAUNCH") return `Launch new Instance (${eventDetails.instanceId})`
	else if(eventDetails.event == "AWS_EC2_INSTANCE_TERMINATE") return `Terminate Instance (${eventDetails.instanceId})`
	else if(eventDetails.event == "AWS_EC2_INSTANCE_UNHEALTHY_IN_ELB") return  `Unhealthy Instance (${eventDetails.instanceId})`
}

/*
This function will connect your Spotinst account to your Pagerduty acount and depending on which 
notification you assign you can configure this function to post an event trigger on pager duty.
The first steps for this function is the set up your elastigroup to have this function as its end point.
For information on how to do this please refer to the main README. Next you will need to input your
own personal token and service key/API key that will connect you to your PagerDuty account. Then you 
will want to configure which event you are listening for if the function checkEventType(). This is 
also where you will want to set the description that you want to see when this function is triggered.

@param event      This hold the information that triggered this function to run. For us this means
                  we are getting the POST value information from the notification call
@return callback  This is the required return for Serverless Functions.
*/
module.exports.main = function main (event, context, callback) {
	let token = process.env['pagerToken']
	let key = process.env['pagerKey']

	let eventDetails = JSON.parse(JSON.parse(event.body).message)
	let description = "False Alarm"
	let url = "https://console.spotinst.com/#/aws/ec2/elastigroup/view/" + eventDetails.resourceId

	console.log(JSON.parse(JSON.parse(event.body).message))

	description = checkEventType(eventDetails)

	let options = {
		uri:'https://events.pagerduty.com/generic/2010-04-15/create_event.json',
		method:"POST",
		headers:{
			"Accept": "application/vnd.pagerduty+json;version=2",
			"Authorization": "Token token=" + token },
		body:{    
			"service_key": key,
			"event_type": "trigger",
			"description": description,
			"client": "Spotinst",
			"client_url": url,
			"details": {
				"event": eventDetails.event,
				"instance_ID": eventDetails.instanceId,
				"group_ID": eventDetails.resourceId,
				"group_name": eventDetails.resourceName
			},
		},
		json:true
	}

	rp(options).then((res)=>{
		console.log(res)
    	callback(null, {
			statusCode: 200, 
			body: "Success",
			headers: {"Content-Type": "application/json"}
		});
	}).catch((err)=>{
		console.log(err)
    	callback(null, {
			statusCode: 400, 
			body: "Error Check Logs for Details",
			headers: {"Content-Type": "application/json"}
		});
	})

	
};
