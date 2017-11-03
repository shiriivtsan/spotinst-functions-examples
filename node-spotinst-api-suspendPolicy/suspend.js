/*
This function will suspend one of your Elastigroups policy. All you need is to enter
in your account ID, Spotinst token, group name and policy name. You can also set this
function on a timer so it will automatically suspend a policy on a regualr interval.
*/
var rp = require('request-promise');

module.exports.main = function main (event, context, callback) {
	let token = {Your Token}
	let account = {Your Account ID}
	let group = {Your Group ID}
	let policyName = {Your Policy Name}

	let options = {
		uri:'https://api.spotinst.io/aws/ec2/group/' + group + '/scale/suspendPolicy',
		method: 'POST',
		qs: {accountId: account,
		     policyName: policyName},
		headers:{
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token},
		json:true
	}

	rp(options).then((response)=>{
		console.log(response)
		callback(null, {
			statusCode: 200, 
			body: "Success"
		});
	}).catch((err)=>{
		console.log(err)
		callback(null, {
			statusCode: 400, 
			body: "Error, check logs for more details"
		});
	})
};
