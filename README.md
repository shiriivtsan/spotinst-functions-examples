[![Spotinst Serverless Functions](./assets/functions.png)](https://serverless.com/framework/docs/providers/spotinst/)

[Spotinst Functions Website](https://spotinst.com/products/spotinst-functions/) • [Spointst Community Slack](https://join.slack.com/t/spotinst-community/shared_invite/enQtMjM5MjUzMDYwMzY4LTQ4YjNkODgyNmE3MGE4ZjU3MjdmZmQ0ZTk3NTZmOTNmZmI3NjFhYjYwNzI1MzAxMzM1Yzk3NTY5MDhiN2U3Zjg) • [Spotinst Serverless Documentation](https://serverless.com/framework/docs/providers/spotinst/) • [Spoitinst Serverless Help](https://help.spotinst.com/hc/en-us/categories/115000701089-Spotinst-Functions-)

# Spotinst Serverless Examples

<img align="right" width="400" src="./assets/terminal.jpg" />

Here are a few examples to help you get started with Spotinst Serverless Functions

## Getting Started 

If you are new to using Spotinst Serverless Functions you can view the documentation on the [Serverless Fameworks Documentation](https://serverless.com/framework/docs/providers/spotinst/). You will need to have the serverless framework installed on your local machine as well as set up your Spotinst credentials.

## Examples

Each of the projects listed here have their own `README.md` that will help you set up each project and their use cases

**Have an example?** Fork this repository and submit a PR for review

To start any of the examples you can use any of the URLs as a template with the serverless framework. Simply type in:

```bash
serverless create --template-url <Project URL>
```

Example:

```bash
serverless create --template-url https://github.com/spotinst/spotinst-functions-examples/tree/master/node-spotinst-api-getGroups
```


| Example | Runtime  |
|:--------------------------- |:-----|
|[Node Spotinst API Get All Elastigroups](https://github.com/spotinst/spotinst-functions-examples/tree/master/node-spotinst-api-getGroups) </br> This example shows you how to connect to the Spotinst API and return all the Elastigroups that were created in the past hour| nodeJS |
|[Node Spotinst API Suspend/Unsuspend Scaling Policies](https://github.com/spotinst/spotinst-functions-examples/tree/master/node-spotinst-api-suspendPolicy) </br> This example shows you how to connect to the Spotinst API to suspend or unsupend scaling policies on your elastigroups| nodeJS |
|[Python Spotinst SDK Get All Elastigroups](https://github.com/spotinst/spotinst-functions-examples/tree/master/python-spotinst-sdk-getGroups) </br> This example shows you how to connect to the Spotinst SDK and return all the Elastigroups that were created in the past hour| Python |
|[Node MySQL Connection](https://github.com/spotinst/spotinst-functions-examples/tree/master/node-mysql-connection) </br> This example shows you how to connect to a MySQL table and insert new values or return all the entries in your table| nodeJS |
|[Python MySQL Connection](https://github.com/spotinst/spotinst-functions-examples/tree/master/python-mysql-connection) </br> This example shows you how to connect to a MySQL table and insert new values or return all the entries in your table| Python |
|[Simple Node Chatbot](https://github.com/spotinst/spotinst-functions-examples/tree/master/node-simple-chatbot) </br> This example simulates a basic chat bot that allows the user to enter a message and get a pre programmed response| nodeJS |
|[Node Raffle App](https://github.com/spotinst/spotinst-functions-examples/tree/master/node-raffle-app) </br> This project is a simple raffle app where users are able to enter to win and one user is randomly selected| nodeJS |
|[Node Slack Bot](https://github.com/spotinst/spotinst-functions-examples/tree/master/node-slack-bot) </br> This app will create a basic Slack bot that connects to your GitHub and message you once a week with a status update on your repos| nodeJS |
|[Node Elastigroup-PagerDuty Connection](https://github.com/spotinst/spotinst-functions-examples/tree/master/node-pagerduty-connection) </br> You can use this function to connect your Elastigroup to PagerDuty to push notification when you launch and terminate instances as well as other supported notifications| nodeJS |
