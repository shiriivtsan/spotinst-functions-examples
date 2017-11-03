const IncomingWebhook = require('@slack/client').IncomingWebhook
const GitHub = require('github-api')

/*
This function connects to both your Slack channel and your GitHub Repo and checks if
your repositories have been updated in the past week. Then it send a message to your
Slack letting you know which ones have been updated and which ones have not.

@params NOT USED
@return callback  will return a callback function that is resolved by the serverless
                  framework. 
*/
module.exports.main = function main (event, context, callback) {
	// Token needed to connect to your GitHub account. 
	let token = {Your GitHub Token}
	let gh = new GitHub({token:token})
	// Slack URL key that gives you access to post in a specific chat
	let url = {Your Slack Web Hook URL}
	let webhook = new IncomingWebhook(url);

	// getting all the repos from the organization listed
	gh.getOrganization({Group to Connect to}).getRepos((err,res)=>{
		let current = []
		let stale = []
		// If the repo not been updated in a week it 
		for(let element in res){
			if(Math.abs(new Date - new Date(res[element].updated_at))<=604800000) stale.push(res[element].name)
			else current.push(res[element].name)
		}
		let outputString = "" 
		outputString += "Updated in the past Week: \n"
		for(let element in current) {outputString += current[element] + "\n"}
		outputString += "\n\n"
		outputString += "Not updated recently: \n" 
		for(let element in stale) {outputString+=stale[element] + "\n"}


		webhook.send(outputString,(err, header, statusCode, body)=>{
			if(err) console.log(err)
	    	callback(null, {
				statusCode: 200, 
				body: "Success"
			});
		})
	})
};
