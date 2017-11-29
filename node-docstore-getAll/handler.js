const rp = require('request-promise')

/*
This funciton returns request promises objects for all the elements in the document store in a 
specific region. This is to allow us to access the value of each element

@param environment The environment ID that the user specifies
@param account     The users account ID
@param token       The users Spotinst API token 
@param key         The key that we will use to look up the key
*/
function setGetRequests(environment, account, token, key){
	return rp({
		uri:'https://api.spotinst.io/functions/environment/'+environment+'/userDocument/'+key,
		method: "GET",
		qs: {accountId: account},
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token},
		json:true
	})
}

/*
This functions first makes a GET request to get all the keys that are in the document store for
the region specified. Then requests are made for every key to get their value. Then all the
requests are sent through Promise all and the values are returned in the logs
*/
module.exports.main = function main (event, context, callback) {
	// Spotinst Credentials
	let account = process.env['spotAccount']
	let token = process.env['spotToken']
	let environment = process.env['spotEnvironment']

	// Get request options to get all keys in the document store
	let getAllOptions = {
		uri:'https://api.spotinst.io/functions/environment/'+environment+'/userDocument',
		method: "GET",
		qs: {accountId: account},
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token},
		json:true
	}

	rp(getAllOptions).then((res)=>{
		let docsList = res['response']['items']
		let requestsList = []
		for(let index in docsList){
			requestsList.push(setGetRequests(environment, account, token, docsList[index]['key']))
		}
		
		Promise.all(requestsList).then((res)=>{
			for(let index in res){
				let singleValue = res[index]['response']['items'][0]['value']
				let singleKey = res[index]['response']['items'][0]['key']

				console.log(singleKey + " : " + singleValue)
			}

		    callback(null, {
				statusCode: 200, 
				body: "Success",
				headers: {"Content-Type": "application/json"}
			});
		}).catch((err)=>{
			console.log(err)
		    callback(null, {
				statusCode: 400, 
				body: "Error Check Logs",
				headers: {"Content-Type": "application/json"}
			});
		})
	}).catch((err)=>{
		console.log(err)
	    callback(null, {
			statusCode: 400, 
			body: "Error Check Logs",
			headers: {"Content-Type": "application/json"}
		});
	})
};
