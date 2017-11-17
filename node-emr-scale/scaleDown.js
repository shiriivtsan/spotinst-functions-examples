const rp = require('request-promise')

/*
This funciton will scale down your EMR Elastigroup by whatever adjustment that 
you set in the ajustment variable. It will never go below zero and will return
with a status 400 if you try. To get this function to work input your Spotinst
credentials below.
*/
module.exports.main = function main (event, context, callback) {
	// Spotist credentials
	let account = process.env['spotAccount']
	let token = process.env['spotToken']
	let emr = process.env['spotEMR']
	let adjustment = process.env['adjustment']

	let options = {
		uri:'https://api.spotinst.io/aws/emr/mrScaler/'+emr+'/scale/down',
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
			body: 'Success: Scaled Down',
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
