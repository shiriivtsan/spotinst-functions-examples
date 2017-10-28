// Where most of the HTML and all the CSS for the app is stored 
const formatter = require('./formatter.js')
const header = formatter.formatter[0]
const footer = formatter.formatter[1]
// Connection to mysql pool
const connector = require('./pool.js')
const pool = connector.pool

/*
This function will randomly select a row in the DB to be the winner of the raffle. 

@return Promise  The serverless framework requires that a Promise object is returned in order
                 to run properly
*/
exports.main = function main () {
	let html = header
	return new Promise(function(resolve, reject){
		pool.getConnection((err, con)=>{
			// selecting a random player in the database
			let query = "SELECT email FROM players ORDER BY RAND() LIMIT 1"
			con.query(query,(err,res)=>{
				console.log(res)
				con.release()
				// if there are no users you cant play the game
				if(res.length===0){
					html+= `<h1>There are no participants</h1>
					        <a href="{Admin Link}" class="button">Go Back to Home</a>`+footer
				}else{
					html += `<h1>The Winner is!!<h1>
					         <h3>${res[0]['email']}</h3><br><br>
					         <a href="{Admin Link}" class="button">Go Back to Home</a>`+footer					
				}
				return resolve({
					statusCode: 200,
					headers:{
						'Content-Type': 'text/html'
					},
					body: html
				});
			})
		})
	});
};
