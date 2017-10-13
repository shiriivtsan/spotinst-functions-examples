# Node Serverless Function using Spotinst API

This is a simple node project that allows you to connect to the Spotinst API and perform operations like describe current Elastigroups, add new Elasigroups, scale a specific group up or down, etc. 

### Prerequisites

You will need to have the serverless framework installed, your Spotinst credentials set up and you will need an API token, environment ID and account ID in order to run this project. 

First you will want to install the serverless framework onto your local machine using the terminal command

```
npm install -g serverless
```

Once this has finished downloading you will have to set up your credentials to link your local machine projects to your Spotinst console. To do this please follow the directions listed [here](https://serverless.com/framework/docs/providers/spotinst/guide/credentials/) This will generate a token which you will need in order to gain access to the Spotinst API so copy this somewhere for later use. 

You will also need your environment ID for your function. This can be found on the Spotinst console under the Serverless Functions tab. Select the application you wish to deploy this funciton to and locate the environment that you wish to use. Copy the environment ID and save this for later use

The last thing you will need is your account ID which can be found in the Spotinst console under user setting. Save this for later use. 

### Installing

First you will need to fork this repository and set it up on your local machine. Then you will need to install the serverless-spotinst-functions plugin by running this command inside the project repository:

```
npm install
```

Once this has been completed navigate to the handler.js file and input your token and account ID. Then you will need to navigate to the serverless.yml file and under environment add in the environment ID in the environment section.

## Deployment

Next you will want to deploy this function using this command:

```
sls deploy
```

The first time you run this command your new function will be created and linked to your Spotinst account under the environment that you specified. You can check this on the Spotinst Functions console. 

## Testing

To test if this is working use the command:

```
sls invoke -f NewElastigroupSNS
```

Or you can use the test feature on the Spoinst console. Either way the output to the console should be 'No new Elasitgroups' if you do not have any new Elasitgroups in the last minute. Or you will see 'Post success' if you do have a new Elastigroup within the last minute
