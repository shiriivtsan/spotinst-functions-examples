// Where most of the HTML and all the CSS for the app is stored 
const formatter = require('./formatter.js')
const header = formatter.formatter[0]
const footer = formatter.formatter[1]
// Connection to mysql pool
const connector = require('./pool.js')
const pool = connector.pool

/*
This function that is used to reset the game. This is only accessable through the admin page.
It will drop the table that is being used for the game then creates a new one with the same
name and the same columns. Then it will return a Promise object and renders "Game Reset" with 
a back button. 

@return callbck  The serverless framework requires that a callback is returned in order
                 to run properly
*/
module.exports.main = function main (event, context, callback) {
	let html = header

	pool.getConnection((err, con)=>{
		// drop the current table with the raffle entries
		let query = "DROP TABLE players;"
		con.query(query,(err,res)=>{
			console.log(res)
		})
		// creating a new table with the same name and columns
		query = "CREATE TABLE players (id INT AUTO_INCREMENT PRIMARY KEY, firstName VARCHAR(50) NOT NULL, lastName VARCHAR(50) NOT NULL, email VARCHAR(50) NOT NULL, company VARCHAR(50) NOT NULL);"
		con.query(query, (err,res)=>{
			console.log(res)
			html += `<h1>Game Reset!!<h1>
				     <a href="{Admin Link}" class="button">Go Back to Home</a>`+footer
			callback(null, {
				statusCode: 200, 
				body: html,
				headers: {'Content-Type': 'text/html'}
			});
		})
	})
};
