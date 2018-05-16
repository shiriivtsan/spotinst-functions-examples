
module.exports.main = function main (event, context, callback) {
	let data = JSON.parse(event.query.data)
	let number = event.query.number

	console.log(number)
	console.log(data)

	let outputCount = 0
	for(let index in data){
		outputCount += parseInt(data[index][number])
	}	

	let output = `{"${number}":"${outputCount}"}`
	console.log(output)
	callback(null, {statusCode: 200, body: output});

};
