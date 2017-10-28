# Node Raffle App

This app is a basic raffle app. It uses a MySQL database to store the users information then randomly select from the pool of users one winner. The whole app consists of a user side and an admin side. The admin is the game master and can see the users, run the game and reset, which will eliminate the table and create a new one.

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

## Testing

To test if this is working you will have to find the the URL that was created when you deploy your fuction. Under Service Information you will see the name of the function BasicChatBot. Under this heading you should see id, version and URL. Copy the URL and paste it into your favorite browser.

Another way to find the URL is to go to your Spotinst console and navigate to the environment where this function is located. Here you will see the function name and URL. Copy this and paste it into your favorite browser.

**Note** Serverless functions do take time to be injected into their containers right after a deploy is fired so be patient if it does not show up right away

## Personalize 

To make this project work on its own you will need to deploy it first and create unique URLs for each of the functions then add then URLs into the code as needed. I have left them out so the project wont run properly until you put them in. Also you will need to put in your own DB information 
