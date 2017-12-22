const rp = require('request-promise')

/*
This function will scale up your elastigroup by whatever number of instances
that you decide in the adjustment. It will never exeed the max number of 
instances you allow in your elastigroup and will return status 400 if you try.
To get this function to work simply add in your Spotinst credentials below.
*/
module.exports.main = function main (event, context, callback) {
	// Spotinst credentials
	let account = process.env['accountId']
	let token = process.env['token']
	let group = process.env['groupId']
	let adjustment = process.env['adjustment']

	// options for request to scale up Elastigroup
	let options = {
		uri: 'https://api.spotinst.io/aws/ec2/group/'+group+"/scale/up",
		method: 'PUT',
		qs: {accountId: account, 
			 adjustment: adjustment},
		headers:{
			"Content-Type": "application/json",
			"Authorization" : "Bearer " + token},
		json: true
	}

	rp(options).then((res)=>{
		console.log(res)
	    callback(null, {
			statusCode: 200, 
			body: "Success"
		});
	}).catch((err)=>{
		console.log(err)
	    callback(null, {
			statusCode: 400, 
			body: "Error: Check Logs"
		});
	})
};
