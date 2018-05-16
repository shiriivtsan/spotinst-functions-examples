# Connect to MySQL Database and Insert a New Value

[Check Out the Code](https://github.com/spotinst/spotinst-functions-examples/tree/master/node-mysql-connection)

This project will allow you to create a connection to a MySQL database and either return all the values or given the right parameters will insert a new value into your table.

## Download

To download this project as a template for your own Spotinst Function please use this command

```bash
serverless create --template-url https://github.com/spotinst/spotinst-functions-examples/tree/master/node-mysql-connection
```

### Prerequisites

You will need to have the serverless framework installed, your Spotinst credentials set up and you will need MySQL database credentials, environment ID and account ID in order to run this project. 

First you will want to install the serverless framework onto your local machine using the terminal command

```bash
npm install -g serverless
```

Once this has finished downloading you will have to set up your credentials to link your local machine projects to your Spotinst console. To do this please follow the directions listed [here](https://serverless.com/framework/docs/providers/spotinst/guide/credentials/).

You will also need your environment ID for your function. This can be found on the Spotinst console under the Serverless Functions tab. Select the application you wish to deploy this funciton to and locate the environment that you wish to use. Copy the environment ID and save this for later use

Additionally you will need to have your MySQL `host`, `username`, `database`, and `password` to gain access to your data table.

The last thing you will need is your account ID which can be found in the Spotinst console under user setting. Save this for later use. 

### Installing

First you will need to fork this repository and set it up on your local machine. Then you will need to install the serverless-spotinst-functions plugin and the mysql library by running this command inside the project repository:

```bash
npm install
```

Once this has been completed navigate to the handler.js file and input your MySQL credentials. Then you will need to navigate to the serverless.yml file and under environment add in the environment ID in the environment section.

## Deployment

Next you will want to deploy this function using this command:

```bash
sls deploy
```

The first time you run this command your new function will be created and linked to your Spotinst account under the environment that you specified. You can check this on the Spotinst Functions console. 

## Testing

To test if this is working use the command:

```bash
sls invoke -f SQLConnect
```

Or you can use the test feature on the Spoinst console. Either way the output to the console should be 'Success' if you have connected to your data table properly. If you look at the logs on the Spotinst console you will see all the contents of your data table. If you have entered the wrong credentials you will get an error.

## Invoking 

For practical use, every Spotinst function is given a unique URL that will run the function every time the HTTPS request is made. This function also has URL parameters that can be changed to enter in new rows to your data table. In order to do this you will need to add a new row you will need to add the parameter `number=1` to the URL. Additionally there are four fields that need to be entered as well and they are:

	* `firstName`
	* `lastName`
	* `email`
	* `instances`

These feilds are specific to the data table and can be personalized to your project. 

**To access URL parameters** simply add `req.query.{parameter}` into your code as needed.

## Optional

If you want you can set this function up to run on a schedule using the cron function in the serverless.yml file. Use the [cron function reference](https://crontab.guru/) for help on setting up your cron function. 


