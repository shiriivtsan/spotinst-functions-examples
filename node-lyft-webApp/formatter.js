const header = 
`<html>
	<style>
		#wrapper {
			padding-top: 15px;
			width: 620px;
  			height: 370px;
			font-family:sans-serif, verdana;
  			background: #352384;
  			text-align: center;
  			padding: 5px 3px;
  			border-radius: 5px;
  			overflow: hidden;
		}
		.button{
			font-size: 15px;
			margin: 2px 1px;
			border-radius: 5px;
			background-color: #CDCDCD;
			border: none;
			padding: 12px 25px;
			text-decoration: none;
			display: inline-block;
			color: black;
		}
		.text-input{
			font-size: 15px;
			margin: 2px 1px;
			border-radius: 5px;
			padding: 12px 25px;
			display: inline-block;
		}
		.select{
			font-size: 15px;
			margin: 2px 1px;
			border-radius: 5px;
			padding: 12px 25px;
			display: inline-block;
		}
	</style>
	<body>
		<div id="wrapper">
			<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Lyft_logo.svg/1200px-Lyft_logo.svg.png" alt="Lyft Logo" style="height:100px">
			<br><br>
`;

const footer = 
`		</div>
	</body>
</html>`;



exports.formatter = [header, footer]