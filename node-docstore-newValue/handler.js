const rp = require('request-promise')

/*
This function take in the user specified key and value through environment variables then
POSTs the new document to the document store in the specified environment
*/
module.exports.main = function main (event, context, callback) {
	// Spotinst Credentials
	let account = process.env['spotAccount']
	let token = process.env['spotToken']
	let environment = process.env['spotEnvironment']

	// Key Value Pair to be added into the document store
	let key = process.env['key']
	let value = process.env['value']

	// Options to make post request to add key/value pair to document store
	let postOptions = {
		uri:'https://api.spotinst.io/functions/environment/'+environment+'/userDocument',
		method: "POST",
		qs: {accountId: account},
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token},
		body: {
			"userDocument": {
				"key": key,
				"value": value}},
		json:true
	}

	rp(postOptions).then((res)=>{
		console.log(res['response'])
	    callback(null, {
			statusCode: 200, 
			body: 'Success',
			headers: {"Content-Type": "application/json"}
		});
	}).catch((err)=>{
		console.log(err)
	    callback(null, {
			statusCode: 400, 
			body: 'Error. Check Logs',
			headers: {"Content-Type": "application/json"}
		});
	})
};
