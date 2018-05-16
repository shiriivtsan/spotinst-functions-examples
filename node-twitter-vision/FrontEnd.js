const rp = require('request-promise')
const formatter = require('./formatter.js')
const header = formatter.formatter[0]
const footer = formatter.formatter[1]

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

module.exports.main = function main (event, context, callback) {
	let account = process.env['spotAccount']
	let token = process.env['spotToken']
	let environment = process.env['spotEnvironment']

	let html = header
    
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
			html += `<div class="container">`
			for(index in res){
				let singleImage = JSON.parse(res[index].response.items[0].value)
				html += `<div class="singlePost"> 
							<div class="col"><h3>User Name:</h3> ${singleImage.user}</div><br>
							<div class="col"><img src=${singleImage.url}></div>
							<div class="col"><h3>Image Tags:</h3> ${singleImage.tags.replace(/,/g,", ")}</div>
						</div>`
				
			}
			html += `</div>` + footer
			callback(null, {statusCode: 200, body: html,headers: {"Content-Type": "text/html"}})
		}).catch((err)=>{
			console.log(err)
			html += err
			callback(null, {statusCode: 200, body: html,headers: {"Content-Type": "text/html"}})
		})
	}).catch((err)=>{
		console.log(err)
		html += err
		callback(null, {statusCode: 200, body: html,headers: {"Content-Type": "text/html"}})
	})
}