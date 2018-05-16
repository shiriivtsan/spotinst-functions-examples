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

We will use bundler for our ruby configuration. Be sure to include a setup.rb within a bundler directory in your project root. Your Gemfile should contain:

```ruby
source 'https://rubygems.org'
gem 'multi_xml'
```

### Installing

First you will need to fork this repository and set it up on your local machine. Then you will need to install the serverless-spotinst-functions plugin as well as the request and the request-promise libraries by running this command inside the project repository:

```bash
npm install
```

Once this has been completed navigate to the handler.js file and input your token and account ID. Then you will need to navigate to the serverless.yml file and under environment add in the environment ID in the environment section.

Next, install the gem locally to your project root with the following command:
```ruby
bundle install --path=./
```

Double check that the path to your gem matches the path listed in bundler/config.rb. For this example, you'll notice I've hard-coded 2.3.0 as our example gem is not supported in 2.4.1.

## Deployment

Next, deploy this function using this command:

```bash
sls deploy
```

The first time you run this command your new function will be created and linked to your Spotinst account under the environment that you specified. You can check this on the Spotinst Functions console. 

## Testing

Run this function by triggering the endpoint. On the Spotinst Console, navigate to your envionment and function, then select "run test" under the Test tab. You will see the user's name returned as a string in the console window and logs if the project has been hooked up correctly!

### Next Steps:
You could configure this function to parse XML send in the body of an http request with some minor changes. You could then make a request from an external program - written in any language - and get back your parsed string. This enables you to use your favorite gems anywhere and at any time!





