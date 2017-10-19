import spotinst 
import json
from datetime import datetime

def getGroupInfo(getGroups):
	output = "No New Group Found"
	newGroups = []
	for group in getGroups:
		elasigroupCreationSeconds = (datetime.utcnow()-datetime.strptime(group['created_at'], '%Y-%m-%dT%H:%M:%S.000Z')).seconds
		# 3600 seconds = 1 hour
		if(elasigroupCreationSeconds<=3600):
			output = "New Group(s) Found: "
			newGroups.append(group['id'])

	for single in newGroups:
		output += single + "  "
	return output

def main(args):
	token = "a91bbd28ba0276df2b9f5a9ec74fb52ee4fe182d0ee55350c89faa154c6d0e00"
	accountId = "act-92879601"

	client = spotinst.SpotinstClient(auth_token=token, account_id=accountId)
	getGroups = json.loads(json.dumps(client.get_elastigroups()))

	return {
	    'statusCode': 200,
	    'body': getGroupInfo(getGroups),
	    'headers': {"Content-Type": "application/json"}
	}






