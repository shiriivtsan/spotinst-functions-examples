const rp = require('request-promise')
const formatter = require('./formatter.js')
const header = formatter.formatter[0]
const footer = formatter.formatter[1]

function lyftOAuth(lyftID, lyftSecret){
	return({
		uri: 'https://api.lyft.com/oauth/token',
		method: 'POST',
		headers:{
			"Content-Type": "application/json"
		},
	    auth: {
	        'user': lyftID,
	        'pass': "SANDBOX-"+ lyftSecret
	    },
		body:{
			"grant_type": "client_credentials", "scope": "rides.request"
		},
		json: true
	})
}

function lyftRequest(authToken, hereLat, hereLon, thereLat, thereLon, origin, destination, type){
	return({
		uri: 'https://api.lyft.com/v1/rides',
		method: 'POST',
		headers:{
			'Authorization': 'Bearer ' + authToken,
			'Content-Type': 'application/json'},
		body: {
			"ride_type":type, 
			"origin": 
				{"lat":hereLat, "lng":hereLon, "address": origin},  
			"destination" : 
				{"lat":thereLat, "lng":thereLon, "destination":destination} },
		json: true
	})
}

module.exports.main = function main (event, context, callback) {
	let lyftID = process.env['lyftID'] 
	let lyftSecret = process.env['lyftSecret'] 

	let spotAccount = process.env['spotAccount']
	let spotToken = process.env['spotToken']
	let spotEnvironment = process.env['spotEnvironment']

	let getLyftVars = {
		uri:'https://api.spotinst.io/functions/environment/'+spotEnvironment+'/userDocument/lyftVars',
		method: "GET",
		qs: {accountId: spotAccount},
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + spotToken},
		json:true
	}

	let deleteLyftVars = {
		uri:'https://api.spotinst.io/functions/environment/'+spotEnvironment+'/userDocument/lyftVars',
		method: "DELETE",
		qs: {accountId: spotAccount},
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + spotToken},
		json:true
	}

	let variables

	let html = header
	html += 
	`
				<h1>Ride Requested</h1>
	`

	rp(getLyftVars).then((res)=>{
		variables = JSON.parse(res["response"]["items"][0]["value"])
		rp(deleteLyftVars).then((res)=>{
			rp(lyftOAuth(lyftID,lyftSecret)).then((res)=>{
				let authToken = res.access_token
				rp(lyftRequest(authToken, variables["originLat"], variables["originLon"], variables["destLat"], variables["destLon"], variables["origin"], variables["destination"], variables["type"])).then((res)=>{
					console.log(res)
					html +=
					`
					<p>
						From:
						${variables["origin"]}
						<br>
						To:
						${variables["destination"]}
						<br>
						Type:
						${variables["type"]}
						<br>
						With:
						${res["passenger"]["first_name"]}
						${res["passenger"]["last_name"]}


					</p>
					`

					html += footer
					callback(null, {
						statusCode: 200, 
						body: html,
						headers: {"Content-Type": "text/html"}
					});
				}).catch((err)=>{
					callback(null, {
						statusCode: 400, 
						body: "Error Check Logs",
						headers: {"Content-Type": "text/html"}
					});
				})
			}).catch((err)=>{
				callback(null, {
					statusCode: 400, 
					body: "Error Check Logs",
					headers: {"Content-Type": "text/html"}
				});				
			})
		}).catch((err)=>{
			callback(null, {
				statusCode: 400, 
				body: "Error Check Logs",
				headers: {"Content-Type": "text/html"}
			});
		})
	}).catch((err)=>{
		console.log(err)
		callback(null, {
			statusCode: 400, 
			body: "Error Check Logs",
			headers: {"Content-Type": "text/html"}
		});
	})
};