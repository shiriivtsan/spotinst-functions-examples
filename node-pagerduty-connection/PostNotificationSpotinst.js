var rp = require('request-promise');

let token = "ffa33233d20d522b15dc99626224435ba20000e3984bb203fb5709e2ee845f9d"
let group = "sig-088b5828"
let endpoint = "https://app-d1ecaf45-pagerplace-execute-function1.spotinst.io/fx-2bb34b63"


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
			"eventType": "AWS_EC2_INSTANCE_TERMINATE"
	  }
	},
	json:true
}

rp(options).then((err, res)=>{
	console.log(err)
	console.log(res)
})