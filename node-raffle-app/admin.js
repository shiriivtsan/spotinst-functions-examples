// Where most of the HTML and all the CSS for the app is stored
const formatter = require('./formatter.js')
const header = formatter.formatter[0]
const footer = formatter.formatter[1]

// This is the HTML for the admin page with the three buttons play, reset, display
// Input your URLs that are generated from deploying the project
const html = 
header+
`		
			<h1>Raffle App</h1>
			<h4>Admin Page</h4>
			<a href="{MySQLConnect Link}" class="button">Display Players</a>
			<a href="{RunGame Link}" class="button">Run Game</a>
			<a href="{Reset Link}" class="button">Reset</a>
`
+footer

/*
This is the function that is used to display the Admin page. From this page you are able
to look at all the players, run the game, or reset the game. Each one of these choices
maps to a serverless function.

@return callbck  The serverless framework requires that a callback is returned in order
                 to run properly
*/
module.exports.main = function main (event, context, callback) {
  callback(null, {
  statusCode: 200, 
    body: html,
    headers: {'Content-Type': 'text/html'}
  });
};
