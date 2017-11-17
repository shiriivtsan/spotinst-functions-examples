# Connect Elastigroup to Data Dog Events and Metrics

This project we will connect your Elastigroups to Data Dog to send an event notification when you add, delete or have an unhealthy instance.

## Download

To download this project as a template for your own Spotinst Function please use this command

```bash
serverless create --template-url https://github.com/spotinst/spotinst-functions-examples/tree/master/node-datadog-event
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

Once this has been completed navigate to the handler.js files to input your Data Dog credentials. Then you will need to navigate to the serverless.yml file and under environment add in the environment ID in the environment section.

## Deployment

Next you will want to deploy this function using this command:

```bash
sls deploy
```

The first time you run this command your new function will be created and linked to your Spotinst account under the environment that you specified. You can check this on the Spotinst Functions console. 

## Setting Up Trigger

To set up your Elastigroup to send HTTPS notifications that link to this function you will first need to make sure that you have already deployed this function at least once. This is because you will need the unique URL that is create for each function. Once you have obtained the URL you will need to run the node file PostNotificationSpotinst.js that is provided. In that file you will need to enter your token, group ID, and the URL that was generated from this function. Then you select the event type to be one of the following:

```
AWS_EC2_INSTANCE_TERMINATE 
AWS_EC2_INSTANCE_TERMINATED 
AWS_EC2_INSTANCE_LAUNCH 
AWS_EC2_INSTANCE_UNHEALTHY_IN_ELB 
GROUP_ROLL_FAILED 
GROUP_ROLL_FINISHED 
CANT_SCALE_UP_GROUP_MAX_CAPACITY
```  

**Note:** The options you select here will have to match the options that you input for the checkEventType() function in the handler.js



