# Connect Elastigroups with AWS Batch Queue

This function will connect to your AWS batch queue and check the memory and vcpus that are required for the jobs waiting in the "RUNNABLE" queue. If those numbers are above a certain threshold it will scale up your Elasigroup. If there are no more jobs left in "RUNNABLE" and "RUNNING" then it will scale down your Elastigroup. 

## Download

To download this project as a template for your own Spotinst Function please use this command

```bash
serverless create --template-url https://github.com/spotinst/spotinst-functions-examples/tree/master/python-aws-batch
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

First you will need to fork this repository and set it up on your local machine. Then you will need to install the serverless-spotinst-functions plugin by running this command:

```bash
npm install
```

Then you will need to have the boto3 and requests SDK installed into your project directory so you will need to run this command in the root directory for your project

```bash
pip install boto3 -t /path/to/project-dir
pip install requests -t /path/to/project-dir
```

Once this has been completed navigate to the handler.py file and input your Spotinst and AWS credentials. Then you will need to navigate to the serverless.yml file and under environment add in the environment ID in the environment section.

## Deployment

Next you will want to deploy this function using this command:

```bash
sls deploy
```

The first time you run this command your new function will be created and linked to your Spotinst account under the environment that you specified. You can check this on the Spotinst Functions console. 

## Testing

To test if this is working use the command:

```bash
sls invoke -f CheckBatch
```

Or you can use the test feature on the Spoinst console. Either way you should see "No Change", "Scale Up", or "Scale Down" depenging on what the appropriate course of action at that time.

## Set Timer

If you want you can set this function up to run on a schedule using the cron function in the serverless.yml file. Use the [cron function reference](https://crontab.guru/) for help on setting up your cron function. 

