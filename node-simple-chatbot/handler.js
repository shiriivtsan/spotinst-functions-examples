const mysql = require('mysql')
const rp = require('request-promise')
// where most of the html and all the css code is stored
const formatter = require('./formatter.js')

// Creating usable varibales from the formatter files
const header = formatter.formatter[0]
const footer = formatter.formatter[1]

//connecting to the msql database and creating a pool for queries
const pool = mysql.createPool({
    host: {Your Hose},
    user: {Your Username},
    password: {Your Password},
    database: {Your Database},
    port: 3306
});

// setting the options to query the DialogFlow chatbot app that we train
function setOptions(query){
	return options = {
		uri:{Dialog Flow API URL},
		qs: {'v': {Your Version},
	         'query':query,
	         'lang':{Language Choice},
	         'sessionId':{Your Session ID},
	         'timezone':{Your Time Zone},
	     },
		headers:{
			"Authorization": "Bearer {Your Token}"},
		json:true
	}
}

/*
This function is used to refresh the conversation between the user and the chat bot. We need
to connect to the DB, drop the original table then create a new table with the same columns.
Then adjust the html to refect the changes then render them through the callback function.

@param con        This is the variable that holds the connection to the database
@param html       This is the varieble that holds the html code for how the app will be rendered
@param callback   The serverless framework requires that a callback function be returned therefore 
                  we need to pass it through as a parameter
@return callback  This function is required to be returned by the serverless framwework. Because
                  we want this to be a web app we have set the header to accept html code
*/
function refresh(con, html, callback){
	// Dropping the current conversation
	let query = "DROP TABLE conversation"
	con.query(query,(err,res)=>{
		// creating a new table with the same columns and same name
		query = "CREATE TABLE conversation(id INT AUTO_INCREMENT PRIMARY KEY, string VARCHAR(100) NOT NULL, player VARCHAR(50) NOT NULL)"
		con.query(query,(err,res)=>{
			con.release()
			html += footer
			callback(null, {
				statusCode: 200, 
				body: html,
				headers: {'Content-Type': 'text/html'}
			});
		})
	})
}

/*
This function is used to get the response that was input by the user, find out if there is a 
response that the bot can use, inserts both the input and response to the DB then gets all the
messages between the bot and user. Finally it formats both the bot and user messages to look
like a chat.

@param req        This is where the url parameters are held
@param con        This is the variable that holds the connection to the database
@param html       This is the varieble that holds the html code for how the app will be rendered
@param callback   The serverless framework requires that a callback function be returned therefore 
                  we need to pass it through as a parameter
@return callback  This function is required to be returned by the serverless framwework. Because
                  we want this to be a web app we have set the header to accept html code
*/
function getResponse(event, con, html, callback){
	let query = ""
	let botMessage = ""
	let messageSize = ""
	
	//query the chatbot and getting the bot response
	rp(setOptions(event.query.userMessage)).then((res)=>{
		botMessage = res.result.fulfillment.speech
		// insert the users message to the db
		query = `INSERT INTO conversation(string, player) VALUES('${event.query.userMessage}', 'user' );`
		con.query(query,(err, res)=>{
			// insert the bots message into the db
			query = `INSERT INTO conversation(string, player) VALUES('${botMessage}','bot');`
			con.query(query,(err,res)=>{
				// getting all messages that are in the db
				query = "SELECT * FROM conversation"
				con.query(query,(err, res)=>{
					con.release()
					// formatting the messages
					for(let element in res){
						if(res[element].string.length>70) messageSize = "message-large"
						else if(res[element].string.length>38) messageSize = "message-medium"
						else messageSize = "message"

						if(res[element].player=="user") html += `<p class="`+messageSize+` user">${res[element].string}</p>`
						else if(res[element].player=="bot") html += `<p class="`+messageSize+` bot">${res[element].string}</p>`
					}
					html += footer
					callback(null, {
						statusCode: 200, 
						body: html,
						headers: {'Content-Type': 'text/html'}
					});
				})
			})
		})
	})
}

/*
This is the main function that is run by the serverless framework. It is used to simulate
a basic chat bot that is entirly serverless. The user is able to enter in a message then 
if there is a response that matches it will response. 

@param event      This is used to get the URL parameters in this case the user message
@return callback  The serverless framework requires that a callback function is returned in order
                  to run properly
*/ 
module.exports.main = function main (event, context, callback) {
	let html = header
	return pool.getConnection((err,con)=>{
		if(event.query.userMessage!=undefined){
			return getResponse(event, con, html, callback)
		}else{
			return refresh(con, html, callback)
		}
	})
};

