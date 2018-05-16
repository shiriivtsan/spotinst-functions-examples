# Basic Slack Bot That Connects to Your GitHub

[Check Out the Code](https://github.com/spotinst/spotinst-functions-examples/tree/master/node-slack-bot)

This project is a basic slack bot that will connect to a group on GitHub and check all the repositories to see when they were updated. Then it will send a message to your Slack channel alerting you of the repos that have been updated in the past week or not. 

## Download

To download this project as a template for your own Spotinst Function please use this command

```bash
serverless create --template-url https://github.com/spotinst/spotinst-functions-examples/tree/master/node-slack-bot
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

First you will need to fork this repository and set it up on your local machine. Then you will need to install the serverless-spotinst-functions plugin, GitHub and Slack libraries by running this command inside the project repository:

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
sls invoke -f SlackBot
```

Or you can use the test feature on the Spoinst console. Either way if it is connected properly it will send you a message to your Slack channel. 

## Invoking 

To make this a proper bot you will want to set it up on a cron function to fire once a week. Use the [cron function reference](https://crontab.guru/) for help on setting up your cron function. 


