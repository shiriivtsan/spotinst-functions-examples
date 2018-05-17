# Ruby Gems: XML Parser

This simple Ruby project illustrates how to use gems on Spotinst Functions. It uses [MultiXML.](https://github.com/sferik/multi_xml)

## Download

To download this project as a template for your own Spotinst Function please use this command

```bash
serverless create --template-url https://github.com/spotinst/spotinst-functions-examples/tree/master/ruby-xml-parser
```


### Prerequisites
#### Serverless/Spotinst
You will need to have the serverless framework installed, your Spotinst credentials set up and you will need an API token, environment ID and account ID in order to run this project. 

First you will want to install the serverless framework onto your local machine using the terminal command

```bash
npm install -g serverless
```

Once this has finished downloading you will have to set up your credentials to link your local machine projects to your Spotinst console. To do this please follow the directions listed [here](https://serverless.com/framework/docs/providers/spotinst/guide/credentials/) This will generate a token which you will need in order to gain access to the Spotinst API so copy this somewhere for later use. 

You will also need your environment ID for your function. This can be found on the Spotinst console under the Serverless Functions tab. Select the application you wish to deploy this funciton to and locate the environment that you wish to use. Copy the environment ID and save this for later use

The last thing you will need is your account ID, found in the Spotinst console under user settings. Save this for later use.

#### Ruby

We will use bundler for our ruby configuration. Your Gemfile should contain:

```ruby
source 'https://rubygems.org'
gem 'multi_xml'
```

Dont forget to tell Ruby to look for the bundler/setup in your handler.rb:

```ruby
require_relative './bundler/setup' 
```

### Installing

First you will need to fork this repository and set it up on your local machine. Then you will need to install the serverless-spotinst-functions plugin by running this command inside the project repository:

```bash
npm install
```

Navigate to the serverless.yml file add in the environment ID.

Next, install the gem locally to your project root with the following command:
```ruby
bundle --standalone --path ./
```

## Deployment

Next, deploy this function using this command:

```bash
sls deploy
```

The first time you run this command, your new function will be created and linked to your Spotinst account under the environment that you specified. You can check this on the Spotinst Functions console. 

## Testing

Run this function by triggering the endpoint. On the Spotinst Console, navigate to your envionment and function, then select "Run test" under the Test tab. You will see the user's name returned as a string in the console window and logs if the project has been hooked up correctly!

### Next Steps:
You could configure this function to parse XML sent in the body of an http request with some minor changes. You could then make a request from an external program - written in any language - and pass back your parsed string. 

You can use this template to add in any gem you want by updating the Gemfile and rerunning the bundle command. This enables you to use your favorite gems anywhere and at any time!





