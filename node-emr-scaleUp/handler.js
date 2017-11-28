const rp = require('request-promise')

/*
This function will scale up your emr elastigroup by whatever number of instances
that you decide in the adjustment. It will never exeed the max number of 
instances you allow in your elastigroup and will return status 400 if you try.
To get this function to work simply add in your Spotinst credentials below.
*/
module.exports.main = function main (event, context, callback) {
	// Spotinst credentialss
	let account = process.env['spotAccount']
	let token = process.env['spotToken']
	let emr = process.env['spotEMR']
	let adjustment = process.env['adjustment']

	let options = {
		uri:'https://api.spotinst.io/aws/emr/mrScaler/'+emr+'/scale/up',
		method: "PUT",
		qs: {accountId: account,
			 adjustment: adjustment},
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token},
		json:true
	}

	rp(options).then((res)=>{
		console.log(res)
	    callback(null, {
			statusCode: 200, 
			body: 'Success: Scaled Up',
			headers: {"Content-Type": "application/json"}
		});
	}).catch((err)=>{
		console.log(err)
	    callback(null, {
			statusCode: 400, 
			body: 'Error: Check Logs',
			headers: {"Content-Type": "application/json"}
		});
	})
};
