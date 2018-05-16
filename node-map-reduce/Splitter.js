const rp = require('request-promise')

function setRequest(json){
	return rp({
		uri:{Function URL for Mapper},
		method:'POST',
		qs:{data:json},
		json:true
	})
}

module.exports.main = function main (event, context, callback) {
	let data = JSON.parse(event.query.data)
	console.log(data.length)
	let looper = 0
	let temp = `[`

	let requestList = []

	while(looper<data.length){
		temp = `[`
		for(let i = 0; i<10; i++){
			if(data[looper]!=undefined){
				console.log(data[looper])
				temp += JSON.stringify(data[looper]) + ","
			}
			looper += 1
		}
		temp = temp.slice(0,-1) + `]`
		console.log(temp + "\n")
		requestList.push(setRequest(temp))
	}

	Promise.all(requestList).then((res)=>{
		let one = 0
		let two = 0
		let three = 0
		let four = 0
		for(let i in res){
			let temp = res[i]
			console.log(temp)
			for(let j in temp){
				if(temp[j].hasOwnProperty('1')){
					one += parseInt(temp[j]['1'])
				}else if(temp[j].hasOwnProperty('2')){
					two += parseInt(temp[j]['2'])
				}else if(temp[j].hasOwnProperty('3')){
					three += parseInt(temp[j]['3'])
				}else if(temp[j].hasOwnProperty('4')){
					four += parseInt(temp[j]['4'])
				}
			}
			
		}
		let output = `[{"1":"${one}"},{"2":"${two}"},{"3":"${three}"},{"4":"${four}"}]`
		console.log(output)
		callback(null, {statusCode: 200, body: output});
	}).catch((err)=>{
		console.log(err)
		callback(null, {statusCode: 400, body: err});
	})
};
