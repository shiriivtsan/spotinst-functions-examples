// Where most of the HTML and all the CSS for the app is stored
const formatter = require('./formatter.js')
const header = formatter.formatter[0]
const footer = formatter.formatter[1]

// Basic layout of the main page with the form for the user to fill out to play
// add in your link from deploying your project
const html = 
header+
`		
			<h1>Raffle App</h1>
			<h4>This is a basic raffle application that entirely runs on Spotinst Serverless!!</h4>
			<form action="{MySQLConnect Link}">
				<input type="text" class="text-input" name="firstName" placeholder="First Name" required>
				<input type="text" class="text-input" name="lastName" placeholder="Last Name" required>
				<br>
				<input type="email" class="text-input" name="email" placeholder="Enter in Valid Email" required>
				<input type="text" class="text-input" name="company" placeholder="Company Name" required>
				<input type="hidden" name="number" value="1">
				<br><br>
				<input type="submit" class="button" value="Enter to Win">
			</form>

`
+footer

/*
This function is used to display the home page that the users actually use. On this page we 
have a form where the user enters first name, last name, email and company. If the feilds
are not entered correctly the user will be propted to fix this. 

@return Promise  The serverless framework requires that a Promise object is returned in order
                 to run properly
*/
exports.main = function main () {
  return new Promise(function(resolve, reject){
    return resolve({
      statusCode: 200,
      headers:{
      	'Content-Type': 'text/html'
      },
      body: html
    });
  });
};
