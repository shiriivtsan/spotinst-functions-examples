var rp = require('request-promise');

module.exports.main = function main (event, context, callback) {
  let skillID = {Your Skill ID}
  let incomingID = JSON.parse(event.body).session.application.applicationId
  let incomingIntent = JSON.parse(event.body).request.intent

  let token = {Your Spotinst Token}
  let account = {Your Account ID}
  let options = {
    uri:'https://api.spotinst.io/aws/ec2/group',
    qs: {accountId: account},
    headers:{
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token },
    json:true
  }

  if(skillID == incomingID){
    if(incomingIntent.name=="HelloWorldIntent"){
      callback(null, {
        statusCode: 200, 
        body: `{
          "version": "1.0",
          "response": {
            "outputSpeech": {
              "type": "PlainText",
              "text": "Welcome to my app"
          },
          "shouldEndSession": true
          }
        }`,
        headers: {"Content-Type": "application/json"}
      })
    }else if(incomingIntent.name=="CheckUser"){
      rp(options).then((response)=>{
        let groups = response.response.items
        let outputString = ``
        for(let index in groups){
          outputString += `Your Group: ${groups[index].id} has ${groups[index].compute.instanceTypes.spot} spot instances and ${groups[index].compute.instanceTypes.ondemand} on demand instance. `
        }
        console.log(outputString)
        callback(null, {
          statusCode: 200, 
          body: `{
            "version": "1.0",
            "response": {
              "outputSpeech": {
                "type": "PlainText",
                "text": "${outputString}"
            },
            "shouldEndSession": true
            }
          }`,
          headers: {"Content-Type": "application/json"}
          })
        })
    }
  }else{
    callback(null, {
      statusCode: 400, 
      body: `{
        "version": "1.0",
        "response": {
          "outputSpeech": {
            "type": "PlainText",
            "text": "Incorrect Skill Access"
        },
        "shouldEndSession": true
        }
      }`,
      headers: {"Content-Type": "application/json"}
    })
  }
};
