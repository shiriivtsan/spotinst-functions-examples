const rp = require('request-promise')

// Set the request for each group in account
function setRequests(group, account, token){
	return rp({
			uri:'https://api.spotinst.io/aws/ec2/group/'+group+'/status',
			qs: {accountId: account},
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token},
			json:true
		})
}

// creates a metric point for DD
function createMetrics(type, instances, group){
	return ({"metric": "spotinst."+group+"."+type,
	"points": [[Math.round(new Date().getTime()/1000), instances]],
	"tags": ["Spotinst",type]})
}

// From the requests get the number of spot and OD instnaces and prep them for DD
function getData(res){
	let metrics = []

	for(let index in res){
		let onDemand = 0
		let spot = 0
		let group = (res[index].request.url).split('/')[4]
		let instances = res[index].response.items

		for(let index in instances){
			if(instances[index].spotInstanceRequestId==null){
				onDemand += 1
			}else{
				spot += 1
			}
		}
		metrics.push(createMetrics("onDemand", onDemand, group))
		metrics.push(createMetrics("spot", spot, group))	
	}
	console.log(metrics)

	let data = {
		"series":
			metrics
	}

	return data
}

// returned if there was an error with a callback
function callbackError(){
	return ({
			statusCode: 400, 
			body: 'Error: Check logs',
			headers: {"Content-Type": "application/json"}
		})
}

module.exports.main = function main (event, context, callback) {
	// Data Dog Key
	let api_key = {Your DD API Key}

	//Spotinst Credentials
	let token = {Your Spotinst Token}
	let account = {Your Account}

	//Options to get all groups from account
	let groupOptions = {
		uri:'https://api.spotinst.io/aws/ec2/group/',
		qs: {accountId: account},
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token},
		json:true
	}

	// Get all groups from account
	rp(groupOptions).then((res)=>{
		let groups = res.response.items
		let requests = []
		// Prep request multiple promises at once
		for(let index in groups){
			requests.push(setRequests(groups[index].id, account, token))
		}
		// Request each group for their number of spot and OD instances 
		Promise.all(requests).then((res)=>{
			// Options to post to Data Dog the metrics
			let dataDogOptions = {
				uri:'https://app.datadoghq.com/api/v1/series',
				method: "POST",
				qs: {api_key: api_key},
				headers: {
					"Content-Type": "application/json"},
				body: getData(res),
				json:true
			}
			// Posting metrics to Data Dog
			rp(dataDogOptions).then((res)=>{
				console.log(res)
			    callback(null, {
					statusCode: 200, 
					body: 'Success',
					headers: {"Content-Type": "application/json"}
				});
			}).catch((err)=>{
				console.log(err)
			    callback(null, callbackError());
			})
		}).catch((err)=>{
			console.log(err)
		    callback(null, callbackError());
		})
	}).catch((err)=>{
		console.log(err)
	    callback(null, callbackError());
	})
};
