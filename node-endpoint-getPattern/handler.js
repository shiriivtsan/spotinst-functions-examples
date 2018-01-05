const rp = require('request-promise')

module.exports.main = function main (event, context, callback) {
    let account = process.env['spotAccount']
    let token = process.env['spotToken']
    let environment = process.env['spotEnvironment']

    let options = {
		uri:'https://api.spotinst.io/functions/pattern',
		method:'GET',
		qs:{accountId:account,
		    environmentId: environment},
		headers:{
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token},
		json:true
	}

    rp(options).then((res)=>{
    	console.log(res['response']['items'])
    	callback(null, {statusCode: 200, body: "Success"});
    }).catch((err)=>{
    	console.log(err)
    	callback(null, {statusCode: 400, body: "Error Check Logs"});
    })
};
