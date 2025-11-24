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
POST
/api/v2/projects/:projectKey/ai-configs/model-configs
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/default/ai-configs/model-configs"
4
| 
5
| payload = {
6
| "name": "name",
7
| "key": "key",
8
| "id": "id",
9
| "icon": "icon",
10
| "provider": "provider",
11
| "params": "{}",
12
| "customParams": "{}",
13
| "tags": ["tags", "tags"],
14
| "costPerInputToken": 0.8008281904610115,
15
| "costPerOutputToken": 6.027456183070403
16
| }
17
| headers = {
18
| "LD-API-Version": "beta",
19
| "Authorization": "<apiKey>",
20
| "Content-Type": "application/json"
21
| }
22
| 
23
| response = requests.post(url, json=payload, headers=headers)
24
| 
25
| print(response.json())
```
[](/docs/api/ai-configs-beta/post-model-config?explorer=true)
200Successful
```
1
| {
---|--- 
2
| "name": "name",
3
| "key": "key",
4
| "id": "id",
5
| "global": true,
6
| "tags": [
7
| "tags",
8
| "tags"
9
| ],
10
| "version": 0,
11
| "isRestricted": true,
12
| "_access": {
13
| "denied": [
14
| {
15
| "action": "action",
16
| "reason": {
17
| "effect": "allow",
18
| "resources": [
19
| "proj/*:env/*;qa_*:/flag/*"
20
| ],
21
| "notResources": [
22
| "notResources",
23
| "notResources"
24
| ],
25
| "actions": [
26
| "*"
27
| ],
28
| "notActions": [
29
| "string",
30
| "string"
31
| ],
32
| "role_name": "role_name"
33
| }
34
| },
35
| {
36
| "action": "action",
37
| "reason": {
38
| "effect": "allow",
39
| "resources": [
40
| "proj/*:env/*;qa_*:/flag/*"
41
| ],
42
| "notResources": [
43
| "notResources",
44
| "notResources"
45
| ],
46
| "actions": [
47
| "*"
48
| ],
49
| "notActions": [
50
| "string",
51
| "string"
52
| ],
53
| "role_name": "role_name"
54
| }
55
| }
56
| ],
57
| "allowed": [
58
| {
59
| "action": "action",
60
| "reason": {
61
| "effect": "allow",
62
| "resources": [
63
| "proj/*:env/*;qa_*:/flag/*"
64
| ],
65
| "notResources": [
66
| "notResources",
67
| "notResources"
68
| ],
69
| "actions": [
70
| "*"
71
| ],
72
| "notActions": [
73
| "string",
74
| "string"
75
| ],
76
| "role_name": "role_name"
77
| }
78
| },
79
| {
80
| "action": "action",
81
| "reason": {
82
| "effect": "allow",
83
| "resources": [
84
| "proj/*:env/*;qa_*:/flag/*"
85
| ],
86
| "notResources": [
87
| "notResources",
88
| "notResources"
89
| ],
90
| "actions": [
91
| "*"
92
| ],
93
| "notActions": [
94
| "string",
95
| "string"
96
| ],
97
| "role_name": "role_name"
98
| }
99
| }
100
| ]
101
| },
102
| "icon": "icon",
103
| "provider": "provider",
104
| "params": "{}",
105
| "customParams": "{}",
106
| "costPerInputToken": 6.027456183070403,
107
| "costPerOutputToken": 1.4658129805029452
108
| }
```
Create an AI model config. You can use this in any variation for any AI Config in your project.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired
### Headers
LD-API-VersionenumRequired
Version of the endpoint.
Allowed values:beta
### Request
AI model config object to create
namestringRequired
Human readable name of the model
keystringRequired
Unique key for the model
idstringRequired
Identifier for the model, for use with third party providers
iconstringOptional
Icon for the model
providerstringOptional
Provider for the model
paramsobjectOptional
customParamsobjectOptional
tagslist of stringsOptional
costPerInputTokendoubleOptional
Cost per input token in USD
costPerOutputTokendoubleOptional
Cost per output token in USD
### Response
Successful response
namestring
Human readable name of the model
keystring
Unique key for the model
idstring
Identifier for the model, for use with third party providers
globalboolean
Whether the model is global
tagslist of strings
versioninteger
isRestrictedboolean
Whether the model is restricted
_accessobject or null
Show 2 properties
iconstring or null
Icon for the model
providerstring or null
Provider for the model
paramsobject or null
customParamsobject or null
costPerInputTokendouble or null
Cost per input token in USD
costPerOutputTokendouble or null
Cost per output token in USD
### Errors
400
Bad Request Error
403
Forbidden Error
404
Not Found Error
500
Internal Server Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs