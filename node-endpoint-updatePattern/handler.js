const rp = require('request-promise')

module.exports.main = function main (event, context, callback) {
    let account = process.env['spotAccount']
    let token = process.env['spotToken']
    let patternId = process.env['spotPattern']
    let method = process.env['mathod']
    let pattern = process.env['pattern']
    let functionId = process.env['spotFunction']

    let options = {
		uri:'https://api.spotinst.io/functions/pattern/'+patternId,
		method:'PUT' ,
		qs:{accountId:account},
		headers:{
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token},
		body:{
			"pattern": {
				"method": method,
				"pattern": pattern,
				"functionId": functionId
			}
		},
		json:true
	}

    rp(options).then((res)=>{
    	console.log(res['response'])
    	callback(null, {statusCode: 200, body: "Success"});
    }).catch((err)=>{
    	console.log(err)
    	callback(null, {statusCode: 400, body: "Error Check Logs"});
    })
};
