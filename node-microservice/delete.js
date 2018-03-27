const mysql = require('mysql')

const pool = mysql.createPool({
	host: "microservice.cbjx9z9suoal.ca-central-1.rds.amazonaws.com",
	user: "user",
	password: "password",
	database: "Microservice",
	port: 3306
});

module.exports.main = function main (event, context, callback) {
	console.log(event.query)

	if(event.query.name==undefined || event.query.owner==undefined || event.query.age==undefined){
		callback(null, {statusCode: 400, body:"Not Correct Format"})
	}

    pool.getConnection((err, con) =>{
		if(err){
			console.log(err)
			callback(null, {statusCode: 400, body: err});	
		}

		let sql = `DELETE FROM pet WHERE name='${event.query.name}' AND owner='${event.query.owner}' AND age='${event.query.age}'` 

		con.query(sql, (err, res)=>{
			if(err){
				console.log(err)
				callback(null, {statusCode: 400, body: err});				
			}
			console.log(res.affectedRows)
			callback(null, {statusCode: 200, body: `Success: ${res.affectedRows} instances of ${event.query.name} deleted`});
		})
		con.release();
	})
};