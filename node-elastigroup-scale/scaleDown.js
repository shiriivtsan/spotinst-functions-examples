const rp = require('request-promise')

/*
This funciton will scale down your Elastigroup by whatever adjustment that 
you set in the ajustment variable. It will never go below zero and will return
with a status 400 if you try. To get this function to work input your Spotinst
credentials below.
*/
module.exports.main = function main (event, context, callback) {
	// Spotinst Credentials
	let account = {Your Account ID}
	let token = {Your API Token}
	let group = {Your Group ID}
	let adjustment = {Ammount To Scale}

	// Options for scaling down elastigroup
	let options = {
		uri: 'https://api.spotinst.io/aws/ec2/group/'+group+"/scale/down",
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
