const mysql = require('mysql')

const pool = mysql.createPool({
	host: "microservice.cbjx9z9suoal.ca-central-1.rds.amazonaws.com",
	user: "user",
	password: "password",
	database: "Microservice",
	port: 3306
});

module.exports.main = function main (event, context, callback) {
	let sql = "SELECT * FROM pet WHERE "
	if(event.query.name!=undefined){
		sql += `name='${event.query.name}' AND `
	}
	if(event.query.owner!=undefined){
		sql += `owner='${event.query.owner}' AND `
	}
	if(event.query.age!=undefined){
		sql += `age='${event.query.age}' AND `
	}
	if(sql == "SELECT * FROM pet WHERE "){
		sql = sql.slice(0,-6)
	}else{
		sql = sql.slice(0,-4)
	}
	console.log(sql)

    pool.getConnection((err, con) =>{
		if(err){
			console.log(err)
			callback(null, {statusCode: 400, body: err});	
		}

		con.query(sql, (err, res)=>{
			if(err){
				console.log(err)
				callback(null, {statusCode: 400, body: err});				
			}
			let output = ""

			if(res.length == 0){
				output="Not in table"
			}else{
				output = "["
				for(index in res){
					output += `{"name":"${res[index].name}","owner":"${res[index].owner}","age":"${res[index].age}"},`
				}
				output = output.slice(0,-1)+"]"
			}
			console.log(output)

			callback(null, {statusCode: 200, body: output});
		})
		con.release();
	})
};
