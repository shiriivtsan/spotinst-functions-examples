# Suspend and Unsuspend Scaling Policy Using Spotinst API 

This is a simple node project that allows you to connect to the Spotinst API and either suspend or unsuspend scaling policies on your Elastigroup.

## Download

To download this project as a template for your own Spotinst Function please use this command

```bash
serverless create --template-url https://github.com/spotinst/spotinst-functions-examples/tree/master/node-spotinst-api-suspendPolicy
```

### Prerequisites

You will need to have the serverless framework installed, your Spotinst credentials set up and you will need an API token, environment ID and account ID in order to run this project. 

First you will want to install the serverless framework onto your local machine using the terminal command

```bash
npm install -g serverless
```

Once this has finished downloading you will have to set up your credentials to link your local machine projects to your Spotinst console. To do this please follow the directions listed [here](https://serverless.com/framework/docs/providers/spotinst/guide/credentials/) This will generate a token which you will need in order to gain access to the Spotinst API so copy this somewhere for later use. 

You will also need your environment ID for your functions. This can be found on the Spotinst console under the Serverless Functions tab. Select the application you wish to deploy this funciton to and locate the environment that you wish to use. Copy the environment ID and save this for later use

The last thing you will need is your account ID which can be found in the Spotinst console under user setting. Save this for later use. 

### Installing

First you will need to fork this repository and set it up on your local machine. Then you will need to install the serverless-spotinst-functions plugin as well as the request and the request-promise libraries by running this command inside the project repository:

```bash
npm install
```

Once this has been completed navigate to the suspend.js file and the unsuspend.js file to input your token, account ID, group ID, and scaling policy name in both. Then you will need to navigate to the serverless.yml file and under environment add in the environment ID in the environment section.

## Deployment

Next you will want to deploy these functions using this command:

```bash
sls deploy
```

The first time you run this command your new functions will be created and linked to your Spotinst account under the environment that you specified. You can check this on the Spotinst Functions console. 

## Testing

To test if this is working use the command:

```bash
sls invoke -f suspend
sls invoke -f unsuspend
```

Or you can use the test feature on the Spoinst console. Either way the output to the console should be 'Success' if the request was made successfully and your process will be suspended or unsuspended. If you have entered the wrong credentials or if you try to suspend a policy that is already suspended or unsuspend a policy that is already unsuspended you will get an error.

## Invoking 

For practical use, every Spotinst function is given a unique URL that will run the function every time the HTTPS request is made. In this case you will have two unique URLs, one for suspending and one for unsuspending 

## Optional

If you want you can set these functions up to run on a schedule using the cron function in the serverless.yml file. Use the [cron function reference](https://crontab.guru/) for help on setting up your cron function. 


