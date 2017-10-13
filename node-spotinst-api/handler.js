const https = require('https');

exports.main = function main (req, res) {
  // Arguments, account ID and token to access their accounts
  var token = {Your Token}
  var account = {Your Account ID}

  // Get options for HTTPS request to Spotinst API
  var getOptions = {
    host: 'api.spotinst.io',
    path: '/aws/ec2/group?accountId=' + account,
    method: 'GET',
    headers:{
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  }

 return new Promise(function(resolve, reject){
    var outputString = "No new Elasitgroups"
    // Get request for all the Elasitgroups that are associated with the Account ID and Token
    https.request(getOptions, (response) => {
      var output = '';

      response.on('data', (chunk) => {
        output += chunk;
      
      }).on('end', () => {
        output = JSON.parse(output);

        // Error handeling if Token or Account ID are incorrecr
        if(output.response.status.message=="Unauthorized"){
          console.log("ERROR 400 (Bad Request):Incorrect Token or Account ID. Please try again.")
          return resolve({
            statusCode: 400,
            body: "ERROR 400 (Bad Request):Incorrect Token or Account ID. Please try again."
          });         
        }

        var groups = output.response.items;        
        for(var elastigroup in groups){
          // Date object created from the API call 
          var jsonDate = new Date(groups[elastigroup].createdAt);

          // Checking if the Elasigroups were created in the past 1 minute
          if(Math.abs(new Date() - jsonDate)<=60000){
            outputString = "New Group Found\n"
            var format = null

            // If the region and format change based on the region either us-west or us-eat
            var region = groups[elastigroup].compute.availabilityZones[0].name;
            region = region.substring(0,region.length-1)
            if(region == "us-west-2"){
              region = "arn:aws:sns:us-west-2:842422002533:test-sns-Verizon2"//"arn:aws:sns:us-west-2:763038095101:SpotInstance_Fulfilled"
              format = {"event":"%event%","instanceId":"%instance-id%","resourceId":"%resource-id%","resourceName":"%resource-name%","accountId":"084309170734","region":"us-west-2"}
            } 
            if(region == "us-east-1") {
              region = "arn:aws:sns:us-east-1:842422002533:test-sns-Verizon"//"arn:aws:sns:us-east-1:763038095101:SpotInstance_Fulfilled"
              format = {"event":"%event%","instanceId":"%instance-id%","resourceId":"%resource-id%","resourceName":"%resource-name%","accountId":"084309170734","region":"us-east-1"}
            }
            
            // Info to be posted to the subscriptions DB 
             var postBody = JSON.stringify({
              "subscription": {
                "resourceId": groups[elastigroup].id,
                "protocol": "aws-sns",
                "endpoint": region, 
                "eventType": "AWS_EC2_INSTANCE_LAUNCH",
                "eventFormat": format
              }
             })
             // Options needed to post to the subscriptions DB 
             var postOptions = {
                host: 'api.spotinst.io',
                path: '/events/subscription',
                method: 'POST',
                headers:{
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + token,
                  "Content-Length": Buffer.byteLength(postBody)
                }
              }
            // Post request to add the new Elastigroup to the subscriptions DB
            https.request(postOptions).write(postBody)
            outputString += "Post Success"
          } 
        }
        console.log(outputString)
        return resolve({
          statusCode: 200,
          body: outputString
        });  
      });
    }).end();
  });
};