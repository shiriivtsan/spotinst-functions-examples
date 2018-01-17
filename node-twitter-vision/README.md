# Twitter Vision App

This service uses three functions to create a web application that tracks twitter for the word 'Spotinst' that is accompanied by an image, sends the image to Google Vision API to get tags of what it is, then displays the images and tags on a web page

## Download

To download this project as a template for your own Spotinst Function please use this command

```bash
serverless create --template-url https://github.com/spotinst/spotinst-functions-examples/tree/master/node-twitter-vision
```

### Prerequisites

You will need to have the serverless framework installed, your Spotinst credentials set up, environment ID and account ID in order to run this project. 

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

Once this has been completed you will need to navigate to the serverless.yml file and under environment add in the environment ID in the environment section.

## Deployment

Next you will want to deploy this function using this command:

```bash
sls deploy
```

The first time you run this command your new functions will be created and linked to your Spotinst account under the environment that you specified. You can check this on the Spotinst Functions console. 

## Environment Variables

After the project has been deployed you will need to enter you Spotinst Account ID, Spotinst API token, Elastigroup ID and adjustment value as environment variables. To do this go to your function on the Spotinst Console and find the variable key `spotAccount`, `spotToken`, `spotEnivronment`, `visionKey`, `consumerKey` , `consumerSecret`, `accessKey` and `accessSecret` then enter the value for each of these followed by press Update Function.

**Warning:** If you edit your code then re-deploy the function your environment variables will get over written. To stop this from happening delete the list of environment variables from the `serverless.yml` file after the first deploy

## Testing

To test to see if this is working, after deploying and adding in the appropriate variables above enter the URL for the front end function into a web browser. You should see the tweets that have been posted recently that contain an image and the word 'Spotinst'.

To make this application more personal you might want to change the word that Twitter is searching for. Also if you want to change the layout most of the CSS is in the formatter.js file.

