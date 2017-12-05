const formatter = require('./formatter.js')
const header = formatter.formatter[0]
const footer = formatter.formatter[1]

module.exports.main = function main (event, context, callback) {
	let html = header
	html += 
	`
				<form action="#">
					Where are you located: 
					<input type="text" class="text-input" name="origin" placeholder="Origin" required>
					<br><br>
					Where are you going:
					<input type="text" class="text-input" name="destination" placeholder="Desitination" required>
					<br><br>
					Ride Type:
					<select class="select" name="type" required>
						<option value="lyft">lyft</option>
						<option value="lyft_plus">lyft plus</option>
						<option value="lyft_line">lyft line</option>
						<option value="lyft_premier">lyft premier</option>
						<option value="lyft_lux">lyft lux</option>
						<option value="lyft_luxsuv">lyft luxsuv</option>
					</select>
					<br><br>
					<input type="submit" class="button" value="Request">
				</form>
	`
	html+=footer
    callback(null, {
		statusCode: 200, 
		body: html,
		headers: {"Content-Type": "text/html"}
	});
};
