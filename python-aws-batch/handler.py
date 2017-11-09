import boto3
import requests
import json

"""
This function checks the batch queue for the jobs that are in the RUNNING queue
and returns if the memory and vcpu's are greater than a certain number. This is 
where you would change the number you want this function to check for 

Args:
	runnable: this is the list of runnable jobs in the batch queue
	batch:    this variable hold the connection to the batch queue
Return:
	bool:     returns if the memory and vcpu are greater than specified values
"""
def checkBatchSize(runnable, batch):
	jobs = []
	memory = 0
	vcpu = 0

	for element in runnable['jobSummaryList']:	
		jobs.append(element['jobId'])

	response = batch.describe_jobs(jobs=jobs)

	for jobs in response['jobs']:
		memory += jobs['container']['memory']
		vcpu += jobs['container']['vcpus']
	print(memory)
	print(vcpu)

	return memory>60 and vcpu>4

"""
This function is called if you want to scale down your Elastigroup

Args:
	group:        Group ID needed to make the request
	account:      Account ID needed to make the request 
	headers:      Headers needed to make the request
	requests:     Library used to create a put request to scale Elastigroup
	json:         Library used to parse the output from the put request
Return:
	statusCode:   The status code for the function 200 if ok 400 if error
	outputString: The output string that is displayed to the console
"""
def scaleDown(group, account, headers, requests, json):
	statusCode = 200
	outputString = "Scaling Down"
	scaleDownUrl = "https://api.spotinst.io/aws/ec2/group/"+group+"/scale/down"
	data = {'accountId':account, 'adjustment':'1'}

	r = requests.put(scaleDownUrl, headers=headers, params=data)
	statusCheck = json.loads(r.text)['response']['status']['code']
	print(statusCheck)

	if statusCheck!=200:
		statusCode = 400
		if statusCheck==400:
			outputString = "Cannot Scale Down: Check Elatigroup"
		else:
			outputString = "Access Denied Error: Check Logs"

	return [statusCode, outputString]

"""
This function is called if you want to scale up your Elastigroup

Args:
	group:        Group ID needed to make the request
	account:      Account ID needed to make the request 
	headers:      Headers needed to make the request
	requests:     Library used to create a put request to scale Elastigroup
	json:         Library used to parse the output from the put request
Return:
	statusCode:   The status code for the function 200 if ok 400 if error
	outputString: The output string that is displayed to the console
"""
def scaleUp(group, account, headers, requests, json):
	statusCode = 200
	outputString="Scaling Up"
	scaleUpUrl = "https://api.spotinst.io/aws/ec2/group/"+group+"/scale/up"
	data = {'accountId':account, 'adjustment':'1'}

	r = requests.put(scaleUpUrl, headers=headers, params=data)
	statusCheck = json.loads(r.text)['response']['status']['code']
	print(statusCheck)

	if statusCheck!=200:
		statusCode = 400
		if statusCheck==400:
			outputString = "Cannot Scale Up: Check Elastigroup"
		else:
			outputString = "Access Denied Error: Check Logs"

	return [statusCode, outputString]

"""
This function is used to check if the jobs that are in you batch queue and see if you should
either scale up or down your elastigroups based on the ammount of memory and vcpu's needed
for the upcoming jobs

Return: 
	(Serverless Object): Serverless object that will have a status code 400 if there
	                     was an error executing the code or 200 if not
"""
def main(event, context):
	outputString="No Change"
	statusCode = 200

	# Spotinst Credentials
	group = {Your Spotinst Elastigroup ID}
	account = {Your Spotinst Account Number}
	token = {Your Spotinst Token}
	
	# AWS Credentials
	aws_account = {Your AWS Access Key}
	aws_secret = {Your AWS Secret Key}
	region = {Your Queue Region}
	queue = {Name of Your Queue}
	
	headers = {'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'}

	batch = boto3.client('batch',region_name=region,aws_access_key_id=aws_account, aws_secret_access_key=aws_secret)
	runnable = batch.list_jobs(jobQueue=queue, jobStatus="RUNNABLE")
	running = batch.list_jobs(jobQueue=queue, jobStatus="RUNNING")

	if len(runnable['jobSummaryList'])==0 and len(running['jobSummaryList'])==0:
		[statusCode, outputString]= scaleDown(group, account, headers, requests, json)
	else:
		if checkBatchSize(runnable, batch):
			[statusCode, outputString] = scaleUp(group, account, headers, requests, json)

	return {
		'statusCode': statusCode,
		'body': outputString,
		'headers': {"Content-Type": "application/json"}
	}