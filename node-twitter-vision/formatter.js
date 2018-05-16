const header = 
`
<!DOCTYPE html>
<html>
	<style>
		#wrapper {
			padding-top: 15px;
			font-family:sans-serif, verdana;
  			text-align: center;
  			padding: 20px 20px;
  			overflow: hidden;
			background: #72a8ff;
		}
		div.singlePost{
			border:3px solid black;
			padding: 15px 15px;
			border-radius: 5px;
			background:white;
			margin: 25px;
			width: 500px;
			height: 450px;
			float:left;
			display: inline-block;
		}
		img{
		    width:  250px;
		    max-height: 250px;
		    overflow:hidden;
		    border: 1px solid #ddd; 
		    border-radius: 4px;  
		    padding: 5px; 
		}
		.container{
			padding-left:100px;
		}
	</style>
	<body>
		<div id="wrapper">
			<h1>Spotinst Tweets</h1>
`;

const footer = 
`		</div>
	</body>
</html>`;



exports.formatter = [header, footer]