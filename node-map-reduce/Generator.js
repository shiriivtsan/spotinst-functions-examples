const rp = require("request")

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports.main = function main (event, context, callback) {
	let suit, value

	let output = `[`

	let loopvalue = getRandomInt(process.env['size'])
	console.log(loopvalue)

	while(loopvalue>0){
		suit = getRandomInt(4)+1
		value = getRandomInt(13)+1
		console.log(`{${suit}: ${value}},`)
		output+=`{"${suit}": "${value}"},`
		loopvalue -= 1
	}
	output = output.slice(0,-1) + `]`

	let options = {
		uri: {Function URL for Splitter},
		method: 'POST',
		qs:{data:output},
		json:true
	}

	rp(options)

	callback(null, {statusCode: 200, body: "Success"});
};
