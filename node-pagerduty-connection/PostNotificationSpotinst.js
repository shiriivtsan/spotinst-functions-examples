var rp = require('request-promise');

let token = {Your Token}
let group = {Your Elastigroup ID}
let endpoint = {URL for your function}
let eventType = {Your Event Type Choice}
/*
AWS_EC2_INSTANCE_TERMINATE 
AWS_EC2_INSTANCE_TERMINATED 
AWS_EC2_INSTANCE_LAUNCH 
AWS_EC2_INSTANCE_UNHEALTHY_IN_ELB 
GROUP_ROLL_FAILED 
GROUP_ROLL_FINISHED 
CANT_SCALE_UP_GROUP_MAX_CAPACITY
*/

let options = {
	uri:'https://api.spotinst.io/events/subscription',
	method: 'POST',
	headers:{
		"Content-Type": "application/json",
		"Authorization": "Bearer " + token},
	body:{
		"subscription": {
			"resourceId": group,
			"protocol": "https",
			"endpoint": endpoint,
			"eventType": eventType
	  }
	},
	json:true
}

rp(options).then((err, res)=>{
	console.log(err)
	console.log(res)
})