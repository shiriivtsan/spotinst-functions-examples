""" 
This function will connect to your database and if you do not enter any URL parameters
it will return with all the values in your data table. If you enter 'number=1' into
the URL parameters then we will attempt to add a new row into the data table. First
we will check that all the neccessary parameters are entered into the URL then check
that the row does not already exsist in the data table. If both checks pass then 
the new row will be inserted into the data table

To personalize this function you will need to enter your own MySQL credentials as well
as check the appropriate query paramneters that are needed for your data table throughout
this function.
"""
import mysql.connector

"""This function when called will print out all the values in the data table to the console
Args:
	cursor: This holds the connection to the database and will execute the query then 
	        hold the result to be printed
"""
def getAllRows(cursor):
	query = "SELECT * FROM customers"
	print(query)
	cursor.execute(query)

	for element in cursor:
		print(element) 

"""
This funcition takes in the query parameters and check that they are all completed.
It will return False if all params are there and True if even one is missing.
Here is where you should enter in your own data table columns that are required for 
inserting a new row
Args: 
	queryparams: This is where the URL parameters live and are reference by name.
Returns:
	(Bool): Will return False if all parameters are set in the URL
"""
def checkParams(queryparams):
	try:
		queryparams['firstName']
		queryparams['lastName']
		queryparams['email']
		queryparams['instances']
	except:
		return True
	else:
		return False
"""
This function will take in the connection to the DB and the array of parameters to check
that the row that is being entered does not already exsist in the data table. If it does
the function will return True, if not it will return False
Args: 
	queryparams: This is where the URL parameters live and are reference by name.
         cursor: This holds the connection to the database and will execute the 
                 query then hold the result to be printed
Returns:   
	(Bool): Will return True if the row exsist in the data table
"""
def checkInTable(queryparams, cursor):
	testString = "first_name='" + queryparams['firstName'] + "' AND last_name='" + queryparams['lastName'] + "' AND email='" + queryparams['email'] + "'"
	testQuery = "SELECT COUNT(*) FROM customers WHERE " + testString
	cursor.execute(testQuery)
	for element in cursor:
		if(element[0]>0):
			return True
	return False

"""
This function will insert a new row into the data table. You need the query parameters
to know what values to insert, you need the cursor to execute the Insert function and
you need the connection object to write those changes
Args:
	queryparams: This is where the URL parameters live and are reference by name.
         cursor: This holds the connection to the database and will execute the 
                 query then hold the result to be printed
     connection: This connection to the DB allows you to write the new value to the table
"""
def insertNewRow(queryparams, cursor, connection):
	queryString = "( '" + queryparams['firstName'] + "', '" + queryparams['lastName'] + "', '" + queryparams['email'] + "', '" + queryparams['instances'] + "' )"
	query = "INSERT INTO customers (first_name, last_name, email, instances) VALUES"+queryString
	print(query)
	cursor.execute(query)
	connection.commit()

"""
This is the main function that is executed by the Serverless framework. It takes in
the URL parameters and return a serverless object that either return status code 400
if there was an error. Here is where you will need to configure your MySQL database
connection
Args:
	                arg: Serverless object that contains the URL parameters
Returns: 
	(Serverless Object): Serverless object that will have a status code 400 if there
	                     was an error executing the code or 200 if not
"""	
def main(args):
	#configuring connection to Database
	config = {
		'user':{Your Username}, 
		'password':{Your Password}, 
		'host':{Your Host Name},
		'database':{Your Database Name}
	}
	#creating a connection to write to database and a cursor to read from database
	connection = mysql.connector.connect(**config)
	cursor = connection.cursor(buffered=True)

	#getting URL parameters
	queryparams = args.get("query", {})
	# Checking if there is 'number=1' in the URL params
	try:
		queryparams['number']
	except:
		# Getting all rows if there is no 'number=1'
		getAllRows(cursor)
	else:
		#checking that all the parameters are met
		if checkParams(queryparams):
			return {
				'statusCode': 400,
				'body': 'Parameters not defined',
				'headers': {"Content-Type": "application/json"}
			}
		#checking that the row being inserted does not exist in the table
		elif checkInTable(queryparams, cursor):
			return {
				'statusCode': 400,
				'body': 'You have already entered this row',
				'headers': {"Content-Type": "application/json"}
			}
		#inserting the new row if all the parameters are met
		else:
			insertNewRow(queryparams, cursor, connection)

	#closing both connections to the database
	cursor.close()
	connection.close()

	return {
	    'statusCode': 200,
	    'body': 'Success',
	    'headers': {"Content-Type": "application/json"}
	}
