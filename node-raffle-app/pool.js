const mysql = require('mysql')
exports.pool = mysql.createPool({
	host: {Your Host},
	user: {Your Username},
	password: {Your Password},
	database: {Your Database},
	port: 3306
});