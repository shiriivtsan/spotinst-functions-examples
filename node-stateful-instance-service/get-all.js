const rp = require("request-promise")

function getAllGroups(input){
	return ({
		uri:`https://api.spotinst.io/aws/ec2/group`,
		method:`GET`,
		qs:{"accountId": input.accountId},
		headers:{
			"Content-Type": "application/json",
			"Authorization": `Bearer ${input.token}`},
		json:true
	})
}

function getAllInstances(input){
	return rp({
		uri:`https://api.spotinst.io/aws/ec2/group/${input.groupId}/statefulInstance`,
		method:`GET`,
		qs:{"accountId": input.accountId},
		headers:{
			"Content-Type": "application/json",
			"Authorization": `Bearer ${input.token}`},
		json:true
	})
}

module.exports.main = function main (event, context, callback) {
	let input = {
		accountId: process.env['acountId'],
		token: process.env['token']
	}
	let output = {}

	rp(getAllGroups(input)).then((res)=>{
		let groupData = res.response.items
		let groupQueries = []

		groupData.forEach((singleGroup)=>{
			console.log(singleGroup.id)
			input.groupId = singleGroup.id
			groupQueries.push(getAllInstances(input))
		})

		Promise.all(groupQueries).then((res)=>{
			for(let index in res){
				let groupId = res[index].request.url.split("/")[4]
				let instances = res[index].response.items
				let instanceList = []
				instances.forEach((singleInstance)=>{
					instanceList.push(singleInstance.id)
				})

				if(instances.length>0){
					output[groupId] = instanceList
				}
			}
			console.log(output)
			callback(null, {statusCode:200, body:JSON.stringify(output)})
		}).catch((err)=>{
			console.log(err)
			callback(null, {statusCode:400, body:"Error"})
		})

	}).catch((err)=>{
		console.log(err)
		callback(null, {statusCode:400, body:"Error"})
	})
}