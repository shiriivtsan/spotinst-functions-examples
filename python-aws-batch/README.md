# Connect Elastigroups with AWS Batch Queue

[Check Out the Code](https://github.com/spotinst/spotinst-functions-examples/tree/master/python-aws-batch)

This function will connect to your AWS batch queue and check the memory and vcpus that are required for the jobs waiting in the "RUNNABLE" queue. Then it will scale your Elastigroup based on the users choice of either memory or vcpus. It will only change the target value and not the minimum or maximum so the group cannot scale outside of your set boundaries.

## Download

To download this project as a template for your own Spotinst Function please use this command

```bash
serverless create --template-url https://github.com/spotinst/spotinst-functions-examples/tree/master/python-aws-batch
```


### Prerequisites

You will need to have the serverless framework installed, your Spotinst credentials set up and you will need AWS credentials, environment ID and account ID in order to run this project. 

First you will want to install the serverless framework onto your local machine using the terminal command

```bash
npm install -g serverless
```

Once this has finished downloading you will have to set up your credentials to link your local machine projects to your Spotinst console. To do this please follow the directions listed [here](https://serverless.com/framework/docs/providers/spotinst/guide/credentials/).

You will also need your environment ID for your function. This can be found on the Spotinst console under the Serverless Functions tab. Select the application you wish to deploy this funciton to and locate the environment that you wish to use. Copy the environment ID and save this for later use

The last thing you will need is your account ID which can be found in the Spotinst console under user setting. Save this for later use. 

### Installing

First you will need to fork this repository and set it up on your local machine. Then you will need to install the serverless-spotinst-functions plugin by running this command:

```bash
npm install
```

Then you will need to have the boto3, os, and requests SDK installed into your project directory so you will need to run this command in the root directory for your project

```bash
pip install -r requirements.txt -t /path/to/project-dir
```

Once this has been completed navigate to the handler.py file and input your Spotinst and AWS credentials. Then you will need to navigate to the serverless.yml file and under environment add in the environment ID in the environment section.

## Deployment

Next you will want to deploy this function using this command:

```bash
sls deploy
```

The first time you run this command your new function will be created and linked to your Spotinst account under the environment that you specified. You can check this on the Spotinst Functions console. 

## Environment Variables

After the project has been deployed you will need to enter you Spotinst Account ID, Spotinst API token, Elastigroup ID and adjustment value as environment variables. To do this go to your function on the Spotinst Console and find the variable key `spotAccount`, `spotToken`, `spotGroup`, `min`, `max` and `target` then enter the value for each of these followed by press Update Function.

**Warning:** If you edit your code then re-deploy the function your environment variables will get over written. To stop this from happening delete the list of environment variables from the `serverless.yml` file after the first deploy

## Testing

To test if this is working use the command:

```bash
sls invoke -f AWSCheckBatch
```


## Set Timer

If you want you can set this function up to run on a schedule using the cron function in the serverless.yml file. Use the [cron function reference](https://crontab.guru/) for help on setting up your cron function. 

