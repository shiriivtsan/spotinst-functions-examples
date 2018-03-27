# Pause and Resume all Stateful Instances in Your Account

This project allows you to pause or resume all the stateful instances in your account, or you can specify the group ID and SSI ID for the instances that you want to pause or resume

## Download

To download this project as a template for your own Spotinst Function please use this command.

```bash
serverless create --template-url https://github.com/spotinst/spotinst-functions-examples/tree/master/node-stateful-instance-service
```

### Prerequisites

You will need to have the serverless framework installed, your Spotinst credentials set up and you will need MySQL database credentials, environment ID and account ID in order to run this project. 

First you will want to install the serverless framework onto your local machine using the terminal command

```bash
npm install -g serverless
```

Once this has finished downloading you will have to set up your credentials to link your local machine projects to your Spotinst console. To do this please follow the directions listed [here](https://serverless.com/framework/docs/providers/spotinst/guide/credentials/).

The last thing you will need is your account ID which can be found in the Spotinst console under user setting. Save this for later use. 

### Installing

First you will need to fork this repository and set it up on your local machine. Then you will need to install the serverless-spotinst-functions plugin, reuqest and request-promise libraries by running this command inside the project repository:

```bash
npm install
```

Once this has been completed you will need to navigate to the serverless.yml file and under environment add in the environment ID in the environment section.

## Deployment

Next you will want to deploy this function using this command:

```bash
sls deploy
```

The first time you run this command your new function will be created and linked to your Spotinst account under the environment that you specified. You can check this on the Spotinst Functions console. 

## Environment Variables

After the project has been deployed you will need to enter you Spotinst Account ID, Spotinst API token. To do this go to the functions on the Spotinst Console and find the variable key `accountid` and `token` then enter the value for each of these followed by press Update Function.

## Testing

To test this service you can make a `POST` request to the `ChangeRunningAll` function endpoint where the body is a json like this
`{state:"resume"} ` or `{state:"pause"}`. Or if you only want to pause/resume specific instances in your account you can make a `POST` request to either `PauseStateful` or `ResumeStateful` with the body like this 
```json
{
	"groupId": ["instanceId", "instanceId", "instanceId"],
	"groupId": ["instanceId", "instanceId", "instanceId"]
}

```




