// Where most of the HTML and all the CSS for the app is stored 
const formatter = require('./formatter.js')
const header = formatter.formatter[0]
const footer = formatter.formatter[1]
// Connection to mysql pool
const connector = require('./pool.js')
const pool = connector.pool

/*
This function will check that all the requried feilds to enter the raffle are filled out
on the form

@param event    this is the varibale that stores the URL parameters that has the form fields
@return bool    returns true if there is a missing paramter and true if they are all present
*/
function checkParams(event){
	return (event.query.email==undefined||event.query.email==""||
		    event.query.company==undefined||event.query.company==""||
		    event.query.firstName==undefined||event.query.firstName==""||
		    event.query.lastName==undefined||event.query.lastName=="")
}

/*
This funcion only fires if the parameters are not properly input. If they are not input 
correctly it will show on the browser that the Parameters were not defined so the user can
go back and fix it. 

@param html       This is the varieble that holds the html code for how the app will be rendered
@param footer     this holds the closing tags 
@param callback   The serverless framework requires that a callback be returned therefore 
                  we need to pass it through as a parameter
@return callback  This object is required to be returned by the serverless framwework. Because
                  we want this to be a web app we have set the header to accept html code
*/
function paramsNotFound(html, footer, callback){
	html += `<h1>Parameters not defined</h1>
	         <a href="{HomePage Link}" class="button">Go Back</a>` 
	         + footer;
	console.log("Error: Parameters not defined")
	return callback(null, {
		statusCode: 400, 
		body: html,
		headers: {'Content-Type': 'text/html'}
	});
}

/*
This function will fire if the user has previously tried to enter in this user name. If they
have the browser will show that the value already exsists in the DB. We dontcheck other 
values but if you wanted  to add this you can by changing the query bellow.

@param html       This is the varieble that holds the html code for how the app will be rendered
@param footer     this holds the closing tags 
@param callback   The serverless framework requires that a callback be returned therefore 
                  we need to pass it through as a parameter
@return callback  This object is required to be returned by the serverless framwework. Because
                  we want this to be a web app we have set the header to accept html code
*/
function doubleEntry(html, footer, callback){
	html += `
			<h1>You have already entered this value</h1>
	        <a href="{HomePage Link}" class="button">Go Back</a>
	        ` + footer;
	console.log("Error: Value already present in table")
	return callback(null, {
		statusCode: 400, 
		body: html,
		headers: {'Content-Type': 'text/html'}
	});
}

/*
This function is called when the admin pressed Display players. This will show the admin all
the email addresses of the players. It takes in the res of the query and then loops through
all values and puts them in the HTML

@param html       This is the varieble that holds the html code for how the app will be rendered
@param res        This is the result of the query that holds the player emails
@param footer     this holds the closing tags 
@param callback   The serverless framework requires that a callback be returned therefore 
                  we need to pass it through as a parameter
@return callback  This object is required to be returned by the serverless framwework. Because
                  we want this to be a web app we have set the header to accept html code
*/
function getAllPlayers(html, res, footer,callback){
	html += `<div class="player-list">`
	for(let i in res){
		html+=`${res[i].email} <br>`
	}
	html+= `</div>
			<br><br>
		    <a href="{Admin Link}" class="button">Go Back to Home</a>`
	html += footer
	return callback(null, {
		statusCode: 200, 
		body: html,
		headers: {'Content-Type': 'text/html'}
	});	
}

/*
This function gets fired when the user enters in new information and gets entered into the
raffle

@param html       This is the varieble that holds the html code for how the app will be rendered
@param footer     this holds the closing tags 
@param req        the variable that hold the URL parameters 
@param callback   The serverless framework requires that a callback be returned therefore 
                  we need to pass it through as a parameter
@return callback  This object is required to be returned by the serverless framwework. Because
                  we want this to be a web app we have set the header to accept html code
*/
function enterNewPlayer(html, footer, req, callback){
	html += `<h1>Added New Player</h1>` +
	        `<h3>${req.query.firstName} is now in the game</h3>` +
	        footer
	return callback(null, {
		statusCode: 200, 
		body: html,
		headers: {'Content-Type': 'text/html'}
	});
}

/*
This is the main function that is run by the serverless framework. It will either add a new
user into the raffle or it will return all the values in the DB

@return callbck  The serverless framework requires that a callback is returned in order
                 to run properly
*/
module.exports.main = function main (event, context, callback) {
	let query = ""
	let html = header;

	return pool.getConnection((err, con)=>{
		// check if the user is entering a new value or view all the entries
		if(event.query.number==1){
			// check if the params were input
			if(checkParams(event)){
				return paramsNotFound(html, footer, callback)
			}
			query="SELECT COUNT(*) FROM players WHERE email='"+event.query.email+"';"
		}else{
			html += `<h1>Get All Players</h1>`
			query="SELECT * FROM players"
		}
		con.query(query,(err,res)=>{
			if(query=="SELECT * FROM players"){
				con.release()
				console.log(res)
				return 	getAllPlayers(html, res, footer,callback)					
			}else if(res[0]['COUNT(*)']>0){
				con.release()
				return doubleEntry(html, footer, callback)			
			}else{
				query = "INSERT INTO players (firstName, lastName, email, company) VALUES"
		 		query +=  "('"+event.query.firstName+"', '"+event.query.lastName+"', '"+event.query.email+"', '"+event.query.company+"');"
		 		return con.query(query,(err,res)=>{
		 			con.release()
		 			return enterNewPlayer(html, footer, event, callback)
		 		})
			}
		})
	})	
};

