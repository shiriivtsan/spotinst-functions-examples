import boto3
import requests
import json
import os

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

	if(len(jobs)==0):
		return[0,0]

	response = batch.describe_jobs(jobs=jobs)
	
	for jobs in response['jobs']:
		memory += jobs['container']['memory']
		vcpu += jobs['container']['vcpus']

	return [memory, vcpu]

"""
This function will get the current metircs of your Elastigroup so it wont scale beyond the
limits that are set

Args:
	goup:     This is the Elastigroup ID
	account:  This is the account number for the group you want to access
	headers:  This holds the required headers for the API request
	requests: This module will allow you to make requests to the Spotinst API
	json:     This module will load the response into a json format to be parsed
Return:
	minimum:  The minimum capacity limit on the elastigroup
	maximum:  The maximum capacity limit on the elastigroup
	target:   The target capacity limit on the elastigroup
"""
def getCurrentMetrics(group, account, headers, requests, json):
	getGroupURL = "https://api.spotinst.io/aws/ec2/group/"+group
	data = {'accountId':account}
	r = requests.get(getGroupURL, headers=headers, params=data)
	capacity = json.loads(r.text)['response']['items'][0]['capacity']

	return [capacity['minimum'], capacity['maximum'], capacity['target']]

"""
This function will change the target in the capacity limits of the Elastigroup but wont change
the set maximum or minimum allowing the group to scale up or down depending on the batch queue

Args:
	goup:     This is the Elastigroup ID
	account:  This is the account number for the group you want to access
	headers:  This holds the required headers for the API request
	requests: This module will allow you to make requests to the Spotinst API
	scaleTarget: New target value for the Elastigroup based on the Batch queue
	currentMin:  Current minimum capacity limit
	currentMax:  Current maximum capacity limit
"""
def scaleGroup(group, account, headers, requests, scaleTarget, currentMin, currentMax):
	updateGroupURL = "https://api.spotinst.io/aws/ec2/group/"+group
	data = {'accountId':account}
	json = {"group": {"capacity": {"target": scaleTarget,"minimum": currentMin,"maximum": currentMax}}}
	print(json)
	r = requests.put(updateGroupURL, headers=headers, params=data, json=json)
	print(r.text)

"""
This function will change the weighted capacity variable for the spot instances that the user
has selected. This is required for the dynamic auto scaling to work properly. The user has the 
option to change the scaling variable to be either memeory or vcpu

Args:
	goup:         This is the Elastigroup ID
	account:      This is the account number for the group you want to access
	headers:      This holds the required headers for the API request
	requests:     This module will allow you to make requests to the Spotinst API
	json:         This module will load the response into a json format to be parsed
	instanceData: This is the JSON that holds all the instance types and their memory and vcpu
	capacityType: This variable holds the users choice to either use memory or vcpus
"""
def setCapacity(requests, group, account, headers, json, instanceData, capacityType):
	getGroupURL = "https://api.spotinst.io/aws/ec2/group/"+group
	updateGroupURL = "https://api.spotinst.io/aws/ec2/group/"+group
	data = {'accountId':account}
	r = requests.get(getGroupURL, headers=headers, params=data)
	instances = json.loads(r.text)['response']['items'][0]['compute']['instanceTypes']['spot']
	weights = []

	for spot in instances:
		tempMem = float(instanceData[spot.split(".")[0]][spot.split(".")[1]]['memory'])
		tempVcpu = float(instanceData[spot.split(".")[0]][spot.split(".")[1]]['vcpu'])	
		if(capacityType=="memory"):
			weightedCapacity = (1024)*tempMem
		elif(capacityType=="vcpu"):
			weightedCapacity= tempVcpu

		tempInstance = {"instanceType": spot,"weightedCapacity": int(weightedCapacity)}	
		weights.append(tempInstance)
	
	json = {"group": {"compute": {"instanceTypes": {"weights": weights}}}} 
	r = requests.put(updateGroupURL, headers=headers, params=data, json=json)

"""
This function connects to your AWS batch, checks the running queue then will set capacity limits
for your Elastigroup based on these metrics. For this to work we are using the Weighted Capacity
feature of Elastigroups which means we are only able to either scale by vcpu or memory depending
on the users choice.
"""
def main(event, context):
	# JSON that holds all the instance types and their metrics
	with open('./instance.json') as json_data:
		instanceData = json.loads(json_data.read())
		json_data.close()

	outputString="No Change"
	statusCode = 200

	# Spotinst Credentials
	group = os.environ["spotGroup"]
	account = os.environ["spotAccount"]
	token = os.environ["spotToken"]
	
	# AWS Credentials
	aws_account = os.environ["AWSaccount"]
	aws_secret =os.environ["AWSsecret"]
	region = os.environ["AWSregion"]
	queue = os.environ["AWSqueue"]

	# Users choice between memory or vcpu
	capacityType = os.environ["capacityType"]
	
	headers = {'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'}

	# Check the runable queue
	batch = boto3.client('batch',region_name=region,aws_access_key_id=aws_account, aws_secret_access_key=aws_secret)
	runnable = batch.list_jobs(jobQueue=queue, jobStatus="RUNNABLE")

	# Set Elastigroup weighted capacity to either represent memeory or vcpu
	setCapacity(requests, group, account, headers, json, instanceData, capacityType)

	# Getting the metrics from AWS and Spotinst
	[neededMemory, neededVCPU] = checkBatchSize(runnable, batch)
	[currentMin, currentMax, currentTarget] = getCurrentMetrics(group, account, headers, requests, json)

	print(neededVCPU, neededMemory)

	if(neededMemory==0 and neededVCPU==0):
		outputString = "scale to 0"
		scaleGroup(group, account, headers, requests, 0, currentMin, currentMax)
	else:
		# Chosing the target value
		if(capacityType=="memory"):
			target = int(neededMemory)
		elif(capacityType=="vcpu"):
			target = int(neededVCPU)

		print(capacityType)
		print(target)

		if(target>currentMax):
			target=currentMax
			print(target)

		# Scaling Elastigroup
		scaleGroup(group, account, headers, requests, target, currentMin, currentMax)
		outputString= "Scaling group. Target: " + str(target)

	print(outputString)
	return {
		'statusCode': statusCode,
		'body': outputString,
		'headers': {"Content-Type": "application/json"}
	}