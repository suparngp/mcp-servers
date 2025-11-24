`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Overview](/docs/api)
 * [Access Tokens](/docs/api/access-tokens)
 * [Account Members](/docs/api/account-members)
 * [Account Usage Beta](/docs/api/account-usage-beta)
 * [AI Configs Beta](/docs/api/ai-configs-beta)
 * [Announcements](/docs/api/announcements)
 * [Applications Beta](/docs/api/applications-beta)
 * [Approvals](/docs/api/approvals)
 * [Approvals Beta](/docs/api/approvals-beta)
 * [Audit Log](/docs/api/audit-log)
 * [Code References](/docs/api/code-references)
 * [Contexts](/docs/api/contexts)
 * [Context Settings](/docs/api/context-settings)
 * [Custom Roles](/docs/api/custom-roles)
 * [Data Export Destinations](/docs/api/data-export-destinations)
 * [Environments](/docs/api/environments)
 * [Experiments](/docs/api/experiments)
 * [Feature Flags](/docs/api/feature-flags)
 * [Feature Flags Beta](/docs/api/feature-flags-beta)
 * [Flag Import Configurations Beta](/docs/api/flag-import-configurations-beta)
 * [Flag Links Beta](/docs/api/flag-links-beta)
 * [Flag Triggers](/docs/api/flag-triggers)
 * [Follow Flags](/docs/api/follow-flags)
 * [Holdouts Beta](/docs/api/holdouts-beta)
 * [Insights Charts Beta](/docs/api/insights-charts-beta)
 * [Insights Deployments Beta](/docs/api/insights-deployments-beta)
 * [Insights Flag Events Beta](/docs/api/insights-flag-events-beta)
 * [Insights Pull Requests Beta](/docs/api/insights-pull-requests-beta)
 * [Insights Repositories Beta](/docs/api/insights-repositories-beta)
 * [Insights Scores Beta](/docs/api/insights-scores-beta)
 * [Integration Audit Log Subscriptions](/docs/api/integration-audit-log-subscriptions)
 * [Integration Delivery Configurations Beta](/docs/api/integration-delivery-configurations-beta)
 * [Integrations Beta](/docs/api/integrations-beta)
 * [Layers](/docs/api/layers)
 * [Metrics](/docs/api/metrics)
 * [Metrics Beta](/docs/api/metrics-beta)
 * [O Auth2clients](/docs/api/o-auth-2-clients)
 * [Persistent Store Integrations Beta](/docs/api/persistent-store-integrations-beta)
 * [Projects](/docs/api/projects)
 * [Relay Proxy Configurations](/docs/api/relay-proxy-configurations)
 * [Release Pipelines Beta](/docs/api/release-pipelines-beta)
 * [Releases Beta](/docs/api/releases-beta)
 * [Scheduled Changes](/docs/api/scheduled-changes)
 * [Segments](/docs/api/segments)
 * [Tags](/docs/api/tags)
 * [Teams](/docs/api/teams)
 * [Teams Beta](/docs/api/teams-beta)
 * [Users](/docs/api/users)
 * [Users Beta](/docs/api/users-beta)
 * [User Settings](/docs/api/user-settings)
 * [Views Beta](/docs/api/views-beta)
 * [Webhooks](/docs/api/webhooks)
 * [Workflows](/docs/api/workflows)
 * [Workflow Templates](/docs/api/workflow-templates)
 * [Other](/docs/api/other)
 * Release Policies Beta
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
GET
/api/v2/auditlog/:id
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/auditlog/id"
4
| 
5
| headers = {"Authorization": "<apiKey>"}
6
| 
7
| response = requests.get(url, headers=headers)
8
| 
9
| print(response.json())
```
[](/docs/api/audit-log/get-audit-log-entry?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "_links": {},
3
| "_id": "1234a56b7c89d012345e678f",
4
| "_accountId": "1234a56b7c89d012345e678f",
5
| "date": 1,
6
| "accesses": [
7
| {
8
| "action": "string",
9
| "resource": "string"
10
| }
11
| ],
12
| "kind": "string",
13
| "name": "Example feature flag",
14
| "description": "Example, turning on the flag for testing",
15
| "shortDescription": "Example, turning on the flag",
16
| "comment": "This is an automated test",
17
| "subject": {
18
| "_links": {},
19
| "name": "string",
20
| "avatarUrl": "string"
21
| },
22
| "member": {
23
| "_links": {},
24
| "_id": "507f1f77bcf86cd799439011",
25
| "email": "ariel@acme.com",
26
| "firstName": "Ariel",
27
| "lastName": "Flores"
28
| },
29
| "token": {
30
| "_links": {},
31
| "_id": "string",
32
| "name": "DevOps token",
33
| "ending": "2345",
34
| "serviceToken": false
35
| },
36
| "app": {
37
| "_links": {},
38
| "_id": "string",
39
| "isScim": true,
40
| "name": "string",
41
| "maintainerName": "string"
42
| },
43
| "titleVerb": "turned on the flag",
44
| "title": "string",
45
| "target": {
46
| "_links": {},
47
| "name": "Example flag name",
48
| "resources": [
49
| "proj/example-project:env/production:flag/example-flag"
50
| ]
51
| },
52
| "parent": {
53
| "_links": {},
54
| "name": "string",
55
| "resource": "string"
56
| },
57
| "delta": null,
58
| "triggerBody": null,
59
| "merge": null,
60
| "previousVersion": null,
61
| "currentVersion": null,
62
| "subentries": [
63
| {
64
| "_links": {},
65
| "_id": "1234a56b7c89d012345e678f",
66
| "_accountId": "1234a56b7c89d012345e678f",
67
| "date": 1,
68
| "accesses": [
69
| {
70
| "action": "string",
71
| "resource": "string"
72
| }
73
| ],
74
| "kind": "string",
75
| "name": "Example feature flag",
76
| "description": "Example, turning on the flag for testing",
77
| "shortDescription": "Example, turning on the flag",
78
| "comment": "This is an automated test",
79
| "subject": {
80
| "_links": {},
81
| "name": "string",
82
| "avatarUrl": "string"
83
| },
84
| "member": {
85
| "_links": {},
86
| "_id": "507f1f77bcf86cd799439011",
87
| "email": "ariel@acme.com",
88
| "firstName": "Ariel",
89
| "lastName": "Flores"
90
| },
91
| "token": {
92
| "_links": {},
93
| "_id": "string",
94
| "name": "DevOps token",
95
| "ending": "2345",
96
| "serviceToken": false
97
| },
98
| "app": {
99
| "_links": {},
100
| "_id": "string",
101
| "isScim": true,
102
| "name": "string",
103
| "maintainerName": "string"
104
| },
105
| "titleVerb": "turned on the flag",
106
| "title": "string",
107
| "target": {
108
| "_links": {},
109
| "name": "Example flag name",
110
| "resources": [
111
| "proj/example-project:env/production:flag/example-flag"
112
| ]
113
| },
114
| "parent": {
115
| "_links": {},
116
| "name": "string",
117
| "resource": "string"
118
| }
119
| }
120
| ]
121
| }
```
Fetch a detailed audit log entry representation. The detailed representation includes several fields that are not present in the summary representation, including: - `previousVersion`: a JSON representation of the previous version of the entity. - `currentVersion`: a JSON representation of the current version of the entity. - `delta`: the JSON patch body that was used in the request to update the entity. This is only included if the update was made through a [JSON patch](https://launchdarkly.com/docs/api#updates-using-json-patch). It is null when the update was made using [semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch). Because most [flag updates](https://launchdarkly.com/docs/api/feature-flags/patch-feature-flag) are made using semantic patch, this field is rarely returned. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
idstringRequired`format: "string"`
The ID of the audit log entry
### Response
Audit log entry response
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
_idstring
The ID of the audit log entry
_accountIdstring
The ID of the account to which this audit log entry belongs
datelong
Timestamp of the audit log entry
accesseslist of objects
Details on the actions performed and resources acted on in this audit log entry
Show 2 properties
kindstring
The type of resource this audit log entry refers to
namestring
The name of the resource this audit log entry refers to
descriptionstring
Description of the change recorded in the audit log entry
shortDescriptionstring
Shorter version of the change recorded in the audit log entry
commentstring or null
Optional comment for the audit log entry
subjectobject or null
Details of the subject who initiated the action described in the audit log entry
Show 3 properties
memberobject or null
Details of the member who initiated the action described in the audit log entry
Show 5 properties
tokenobject or null
Details of the access token that initiated the action described in the audit log entry
Show 5 properties
appobject or null
Details of the authorized application that initiated the action described in the audit log entry
Show 5 properties
titleVerbstring or null
The action and resource recorded in this audit log entry
titlestring or null
A description of what occurred, in the format `member` `titleVerb` `target`
targetobject or null
Details of the resource acted upon in this audit log entry
Show 3 properties
parentobject or null
Show 3 properties
deltaany or null
If the audit log entry has been updated, this is the JSON patch body that was used in the request to update the entity
triggerBodyany or null
A JSON representation of the external trigger for this audit log entry, if any
mergeany or null
A JSON representation of the merge information for this audit log entry, if any
previousVersionany or null
If the audit log entry has been updated, this is a JSON representation of the previous version of the entity
currentVersionany or null
If the audit log entry has been updated, this is a JSON representation of the current version of the entity
subentrieslist of objects or null
Show 18 properties
### Errors
401
Unauthorized Error
403
Forbidden Error
404
Not Found Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Fetch a detailed audit log entry representation. The detailed representation includes several fields that are not present in the summary representation, including:
 * `previousVersion`: a JSON representation of the previous version of the entity.
 * `currentVersion`: a JSON representation of the current version of the entity.
 * `delta`: the JSON patch body that was used in the request to update the entity. This is only included if the update was made through a [JSON patch](https://launchdarkly.com/docs/api#updates-using-json-patch). It is null when the update was made using [semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch). Because most [flag updates](https://launchdarkly.com/docs/api/feature-flags/patch-feature-flag) are made using semantic patch, this field is rarely returned.