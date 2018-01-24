# Connect Elastigroup to Data Dog Metrics

[Check Out the Code](https://github.com/spotinst/spotinst-functions-examples/tree/master/node-datadog-connect)

This project we will connect your Elastigroups to Data Dog to send a report every minute to Data Dog on the number of instances you have as a metric.

## Download

To download this project as a template for your own Spotinst Function please use this command

```bash
serverless create --template-url https://github.com/spotinst/spotinst-functions-examples/tree/master/node-datadog-connect
```

### Prerequisites

You will need to have the serverless framework installed, your Spotinst credentials set up and you will need Data Dog account in order to run this project. 

First you will want to install the serverless framework onto your local machine using the terminal command

```bash
npm install -g serverless
```

Once this has finished downloading you will have to set up your credentials to link your local machine projects to your Spotinst console. To do this please follow the directions listed [here](https://serverless.com/framework/docs/providers/spotinst/guide/credentials/).

You will also need your environment ID for your function. This can be found on the Spotinst console under the Serverless Functions tab. Select the application you wish to deploy this funciton to and locate the environment that you wish to use. Copy the environment ID and save this for later use

Next you will need an API key from Data Dog. 

The last thing you will need is your account ID which can be found in the Spotinst console under user setting. Save this for later use. 

### Installing

First you will need to fork this repository and set it up on your local machine. Then you will need to install the serverless-spotinst-functions plugin, the request and the request promise libraries by running this command inside the project repository:

```bash
npm install
```

Once this has been completed will need to navigate to the serverless.yml file and under environment add in the environment ID in the environment section.

## Deployment

Next you will want to deploy this function using this command:

```bash
sls deploy
```

The first time you run this command your new function will be created and linked to your Spotinst account under the environment that you specified. You can check this on the Spotinst Functions console. 

## Environment Variables

After the project has been deployed you will need to enter you Data Dog API token, Spotinst Token and Spotinst Account ID as environment variables. To do this go to your function on the Spotinst Console and find the variable key `datadogAPI`, `spotToken`, `spotAccount` then enter the value for each of these followed by press Update Function.

**Warning:** If you edit your code then re-deploy the function your environment variables will get over written. To stop this from happening delete the list of environment variables from the `serverless.yml` file after the first deploy

## Setting Up Timer

The timer function is meant to run on a schedule using the cron function in the serverless.yml file. Use the [cron function reference](https://crontab.guru/) for help on setting up your cron function to select how many times you want the function to check your Elastigroup and post to Data Dog


