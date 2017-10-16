const mysql = require('mysql');

exports.main = function main (req, res) {
	var pool = mysql.createPool({
		host: {Your Host},
		user: {Your Username},
		password: {Your Password},
		database: {Your Database},
		port: 3306
	});
	var query = ""
	return new Promise(function(resolve, reject){
		return pool.getConnection((err, con)=>{
			if(req.query.number==1){
				if(req.query.firstName==undefined || req.query.lastName==undefined ||
				   req.query.email==undefined || req.query.instances==undefined){
					return resolve({
						statusCode: 400,
						body: "Parameters not defined"
					});
				}else{
					con.query("SELECT COUNT(*) FROM customers "+
						        "WHERE first_name='"+req.query.firstName+"' "+
						        "AND last_name='"+req.query.lastName+"' "+
						        "AND email='"+req.query.email+"';", (err,res)=>{
						if(res[0]['COUNT(*)']>0){
							return resolve({
								statusCode: 400,
								body: "You have already entered this customer"
							});
						}
					});
					query = "INSERT INTO customers (first_name, last_name, email, instances) VALUES"
					query +=  "('"+req.query.firstName+"', '"+req.query.lastName+"', '"
						            +req.query.email+"', '"+req.query.instances+"');"
				}			
			}else{
				query = "SELECT * FROM customers"
			}
			console.log(query)
			con.query(query,(err,res)=>{
				console.log(res)
				return resolve({
					statusCode: 200,
					body: "Success"
				});
			})
		})
	})
};
