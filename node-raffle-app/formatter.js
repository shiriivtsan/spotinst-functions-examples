const header = 
`<html>
	<style>
		#wrapper {
			padding-top: 15px;
			width: 620px;
  			height: 320px;
			font-family:sans-serif, verdana;
  			background: #C70039;
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
		.reset{
			float: right;
			padding-right: 40px;
		}
		.player-list{
			text-align:left;
			padding-left:40px;
			column-count:3;
		}
	</style>
	<body>
		<div id="wrapper">
`;

const footer = 
`		</div>
	</body>
</html>`;



exports.formatter = [header, footer]