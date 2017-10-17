/*
This serverless function uses the request-promise library to connect to the 
Spotinst API and returns all the Elasigroups that have been created in the past
hour. To change the time that it is checking, change the number in the if 
statment bellow. It is calculated in miliseconds. 

To get this function to check your account information, enter in your token and 
account number bellow. 
*/

var rp = require('request-promise');

/*
Function that takes in the JSON from the API call and returns a string to be
printed out to the console. Here is where you can change the check time on when
new Elastigroups have been created.

@param   response      the returned JSON from API call
@return  outputString  string printed to console
*/
function getGroupInfo(response){
	let outputString = "No New Group Found"
	let groups = response.response.items
	let newGroups = []
	for (let group in groups){
		let jsonDate = new Date(groups[group].createdAt)
		// 3600000 miliseconds = 1 hour
		if(Math.abs(new Date() - jsonDate)<=3600000){
			outputString = "New Group(s) Found: "
			newGroups.push(groups[group].id)
		}
	}
	for(let group in newGroups){
		outputString += newGroups[group] + "  "
	}
	return outputString
}

/*
This is the main function that is being exported and executed by the serverless
framework. This funciton has to return a Promise object. This is where you will
enter in your API token and account ID. Then the request options are set up with
the appropriate headers and URI endpoint. 

@return Promise  will return either a Promise object with a 200 status code if
                 no errors occur or a Promise object with a 400 status code if
                 there was an issue executing the API call
*/
exports.main = function main () {
	let token = {Your API Token}
	let account = {Your Account ID}

	let options = {
		uri:'https://api.spotinst.io/aws/ec2/group',
		qs: {accountId: account},
		headers:{
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token },
		json:true
	}

	return new Promise(function(resolve, reject){
		rp(options).then((response)=>{
			return resolve({
				statusCode: 200,
				body: getGroupInfo(response)
			});
		}).catch((err)=>{
			return resolve({
				statusCode: 400,
				body: "Error has occured, check logs"
			});
		})
	});
};
