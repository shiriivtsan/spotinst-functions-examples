var rp = require('request-promise');

exports.main = function main () {
	let token = {Your Token}
	let account = {Your Account ID}
	let group = {Your Group ID}
	let policyName = {Your Policy Name}

	let options = {
		uri:'https://api.spotinst.io/aws/ec2/group/' + group + '/scale/resumePolicy',
		method: 'POST',
		qs: {accountId: account,
		     policyName: policyName},
		headers:{
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token},
		json:true
	}

	return new Promise(function(resolve, reject){
		rp(options).then((response)=>{
			console.log(response)
			return resolve({
				statusCode: 200,
				body: "Sucess"
			});
		}).catch((err)=>{
			console.log(err)
			return resolve({
				statusCode: 400,
				body: "Error, Check logs for more details"
			});
		})
	});
};
