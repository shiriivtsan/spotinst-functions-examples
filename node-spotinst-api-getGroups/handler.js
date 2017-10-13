const https = require('https');

exports.main = function main (req, res) {
  // Arguments, account ID and token to access their accounts
  var token = {Your Token}
  var account = {Your Account ID}

  // Get options for HTTPS request to Spotinst API
  var getAllElastigroupsOptions = {
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
    https.request(getAllElastigroupsOptions, (response) => {
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
        var newGroups = []

        for(var elastigroup in groups){
          // Date object created from the API call 
          var jsonDate = new Date(groups[elastigroup].createdAt);

          // Checking if the Elasigroups were created in the past 1 minute
          if(Math.abs(new Date() - jsonDate)<=3600000){
            outputString = "New Group(s) Found:\n"  
            newGroups.push(groups[elastigroup]["id"])
          } 
        }
        for(var id in newGroups){
          outputString += newGroups[id] + "\n"
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
