const rp = require('request-promise')

module.exports.main = function main (event, context, callback) {
	let account = process.env['spotAccount']
	let token = process.env['spotToken']
	let group = process.env['spotGroup']
	let target = process.env['target']
	let max = process.env['max']
	let min = process.env['min']

	let options = {
		uri:'https://api.spotinst.io/aws/ec2/group/'+group,
		method: "PUT",
		qs: {accountId: account},
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token},
		body:{
			"group": {
				"capacity": {
					"target": target,
					"minimum": min,
					"maximum": max
				}
			}
		},
		json:true
	}

	rp(options).then((res)=>{
		console.log(res)
	    callback(null, {
			statusCode: 200, 
			body: 'Success: Adjustment Accepted',
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
