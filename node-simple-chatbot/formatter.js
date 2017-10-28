const header = 
`
<html>
	<style>
		#wrapper{
			width: 620px;
  			height: 650px;	
			font-family:sans-serif, verdana;
  			background: #e7e7e7;
  			padding: 5px 3px;
  			border-radius: 5px;
  			overflow: hidden;	
		}
		.message-box{
			width: 100%
			height: 320px;
			background: #0E6655;
			padding: 5px 3px;
			text-align: right;
			border-radius: 5px;
		}
		.button{
			font-size: 15px;
			margin: 2px 1px;
			border-radius: 5px;
			background-color: #CDCDCD;
			border: none;
			padding: 12px 25px;
			display: inline-block;
		}
		.text-input{
			font-size: 15px;
			margin: 2px 1px;
			border-radius: 5px;
			padding: 12px 25px;
			display: inline-block;
		}
		.chat{
			width:560px;
			height:565px;
			padding-left: 30px;
			padding-right: 30px
			padding-top: 20px;

		}
		.user{
			text-align:right;
			float:right;
			background: #3498DB;
		}
		.bot{
			text-align:left;
			float:left;
			background: #FDFEFE;
		}
		.message{
			border-radius: 5px;
			font-size: 18px;
			padding-top:5px;
			padding-left:5px;
			padding-right:5px;
			margin: 2px 1px;
			width: 300px;
			height: 30px;
		}
		.message-large{
			border-radius: 5px;
			font-size: 18px;
			padding-top:5px;
			padding-left:5px;
			padding-right:5px;
			margin: 2px 1px;
			width: 300px;
			height: 60px;		}
		form{
			padding-right:15px;
			padding-top:9px;
		}		
	</style>
	<body>
		<div id="wrapper">
			<div class="chat">
`

const footer =
`
			</div>
			<div class="message-box">
				<form action="#">
					<input type="text" class="text-input" name="userMessage" size="50">
					<input type="submit" class="button" value="Send">
				</form>
			</div>
		</div>
	</body>
</html>
`

exports.formatter = [header, footer]

