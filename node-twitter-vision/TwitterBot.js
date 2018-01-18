const Twitter = require('twitter')
const rp = require('request-promise')

function setRequest(imageInfo){
	return rp({
		uri:{Your Picture Function URL},
		method:'POST',
		qs:{imageInfo:imageInfo.toString()},
		json:true
	})
}

module.exports.main = function main (event, context, callback) {
	let twitterConsumerKey = process.env["consumerKey"] 
	let twitterConsumerSecret = process.env["consumerSecret"] 
	let twitterAccessToken = process.env["accessKey"] 
	let twitterAccessSecret = process.env["accessSecret"] 

	let client = new Twitter({
		consumer_key: twitterConsumerKey,
		consumer_secret: twitterConsumerSecret,
		access_token_key: twitterAccessToken,
		access_token_secret: twitterAccessSecret
	});

	let parameters = {q:"spotinst"}
	client.get('search/tweets', parameters, (err,data, res)=>{
		if(err){
			callback(null,{statusCode:400,body:err})
		}
		let requestList = []
		for(i in data.statuses){
			let imageInfo = []

			let currentTime = new Date()
			let minuteAgo = currentTime.setMinutes(currentTime.getMinutes() - 1)
			let postTime = new Date(data.statuses[i].created_at)

			if(postTime > minuteAgo){
				let statusEntities = data.statuses[i].entities
				let user = data.statuses[i].user.screen_name

				if(statusEntities.media){
					console.log(user)
					imageInfo.push(user)
					for(j in statusEntities.media){
						let url = statusEntities.media[j].media_url_https
						console.log(url)
						imageInfo.push(url)
					}
					requestList.push(setRequest(imageInfo))
				}
			}
		}
		Promise.all(requestList).then((res)=>{
			console.log(res)
			callback(null,{statusCode:200,body:"Success"})
		}).catch((err)=>{
			console.log(err)
			callback(null,{statusCode:400,body:err})
		})
	})	
}

