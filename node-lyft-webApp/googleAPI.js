const rp = require('request-promise') 

function setGoogleOptions(googleAPI, address){
	return ({
		uri: 'https://maps.googleapis.com/maps/api/geocode/json',
		method: "GET",
		qs:{address:address, key:googleAPI},
		json: true
	})
}

function setDocStoreOptions(list, spotAccount, spotToken, spotEnvironment){
	return({
		uri:'https://api.spotinst.io/functions/environment/'+spotEnvironment+'/userDocument',
		method: "POST",
		qs: {accountId: spotAccount},
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + spotToken},
		body: {"userDocument": {"key": "lyftVars","value": list}},
		json:true})
}

module.exports.main = function main (event, context, callback) {
	let origin = event.query.origin
	let destination = event.query.destination
	let type = event.query.type

	let spotToken = process.env['spotToken'] 
	let spotAccount = process.env['spotAccount'] 
	let spotEnvironment = process.env['spotEnvironment'] 
	let googleAPI = process.env['googleAPI']

	let originOptions = setGoogleOptions(googleAPI, origin)
	let destOptions = setGoogleOptions(googleAPI, destination)

	let html =
	`
	<html>
	    <head>
	        <meta http-equiv="refresh" content="0;url=#" />
	    </head>
	</html>
	`

	Promise.all([rp(originOptions), rp(destOptions)]).then((res)=>{
		let originLat = res[0]["results"][0]["geometry"]["location"]["lat"]
		let originLon = res[0]["results"][0]["geometry"]["location"]["lng"]
		
		let destLat = res[1]["results"][0]["geometry"]["location"]["lat"]
		let destLon = res[1]["results"][0]["geometry"]["location"]["lng"]

		let keyPairs = JSON.stringify({
			"origin":origin, 
			"destination":destination, 
			"type":type, 
			"originLat":originLat, 
			"originLon": originLon, 
			"destLat":destLat, 
			"destLon":destLon
		})

		let optionsList = setDocStoreOptions(keyPairs, spotAccount, spotToken, spotEnvironment)

		rp(optionsList).then((res)=>{
			console.log(res)
			
			callback(null, {
				statusCode: 200, 
				body: html,
				headers: {"Content-Type": "text/html"}
			});

		}).catch((err)=>{
			console.log(err)
		    callback(null, {
				statusCode: 400, 
				body: "Error check logs",
				headers: {"Content-Type": "text/html"}
			});
		})
	}).catch((err)=>{
		console.log(err)
	    callback(null, {
			statusCode: 400, 
			body: "Error check logs",
			headers: {"Content-Type": "text/html"}
		});
	})
};