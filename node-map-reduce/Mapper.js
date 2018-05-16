const rp = require('request-promise')

function setRequests(inputArray){
	let output = []
	for(let index in inputArray){
		console.log(JSON.stringify(inputArray[index]))
		output.push(rp({
			uri:{Function URL for Reducer},
			method:'POST',
			qs:{data:JSON.stringify(inputArray[index]),
				number:parseInt(index)+1},
			json:true
		}))
	}
	return output
}

module.exports.main = function main (event, context, callback) {
	let data = JSON.parse(event.query.data)
	console.log(data)
	let one = []
	let two = []
	let three = []
	let four = []

	for(let index in data){
		if(data[index].hasOwnProperty('1')){
			one.push(data[index])
		}else if(data[index].hasOwnProperty('2')){
			two.push(data[index])
		}else if(data[index].hasOwnProperty('3')){
			three.push(data[index])
		}else if(data[index].hasOwnProperty('4')){
			four.push(data[index])
		}
	}

	Promise.all(setRequests([one, two, three, four])).then((res)=>{
		console.log(res)
		callback(null, {statusCode: 200, body: JSON.stringify(res)});
	}).catch((err)=>{
		console.log(err)
		callback(null, {statusCode: 400, body: err});
	})
};
