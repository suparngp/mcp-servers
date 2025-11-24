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
PATCH
/api/v2/projects/:projectKey/ai-tools/:toolKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/ai-tools/toolKey"
4
| 
5
| payload = {
6
| "maintainerId": "maintainerId",
7
| "maintainerTeamKey": "maintainerTeamKey",
8
| "description": "description",
9
| "schema": "{}"
10
| }
11
| headers = {
12
| "LD-API-Version": "beta",
13
| "Authorization": "<apiKey>",
14
| "Content-Type": "application/json"
15
| }
16
| 
17
| response = requests.patch(url, json=payload, headers=headers)
18
| 
19
| print(response.json())
```
[](/docs/api/ai-configs-beta/patch-ai-tool?explorer=true)
200Updated
```
1
| {
---|--- 
2
| "key": "key",
3
| "schema": "{}",
4
| "version": 0,
5
| "createdAt": 6,
6
| "_access": {
7
| "denied": [
8
| {
9
| "action": "action",
10
| "reason": {
11
| "effect": "allow",
12
| "resources": [
13
| "proj/*:env/*;qa_*:/flag/*"
14
| ],
15
| "notResources": [
16
| "notResources",
17
| "notResources"
18
| ],
19
| "actions": [
20
| "*"
21
| ],
22
| "notActions": [
23
| "string",
24
| "string"
25
| ],
26
| "role_name": "role_name"
27
| }
28
| },
29
| {
30
| "action": "action",
31
| "reason": {
32
| "effect": "allow",
33
| "resources": [
34
| "proj/*:env/*;qa_*:/flag/*"
35
| ],
36
| "notResources": [
37
| "notResources",
38
| "notResources"
39
| ],
40
| "actions": [
41
| "*"
42
| ],
43
| "notActions": [
44
| "string",
45
| "string"
46
| ],
47
| "role_name": "role_name"
48
| }
49
| }
50
| ],
51
| "allowed": [
52
| {
53
| "action": "action",
54
| "reason": {
55
| "effect": "allow",
56
| "resources": [
57
| "proj/*:env/*;qa_*:/flag/*"
58
| ],
59
| "notResources": [
60
| "notResources",
61
| "notResources"
62
| ],
63
| "actions": [
64
| "*"
65
| ],
66
| "notActions": [
67
| "string",
68
| "string"
69
| ],
70
| "role_name": "role_name"
71
| }
72
| },
73
| {
74
| "action": "action",
75
| "reason": {
76
| "effect": "allow",
77
| "resources": [
78
| "proj/*:env/*;qa_*:/flag/*"
79
| ],
80
| "notResources": [
81
| "notResources",
82
| "notResources"
83
| ],
84
| "actions": [
85
| "*"
86
| ],
87
| "notActions": [
88
| "string",
89
| "string"
90
| ],
91
| "role_name": "role_name"
92
| }
93
| }
94
| ]
95
| },
96
| "_links": {
97
| "self": {
98
| "href": "href",
99
| "type": "type"
100
| },
101
| "parent": {
102
| "href": "href",
103
| "type": "type"
104
| }
105
| },
106
| "_maintainer": {
107
| "_id": "string",
108
| "email": "string",
109
| "role": "string",
110
| "kind": "kind"
111
| },
112
| "description": "description"
113
| }
```
Edit an existing AI tool.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired
toolKeystringRequired
### Headers
LD-API-VersionenumRequired
Version of the endpoint.
Allowed values:beta
### Request
AI tool object to update
maintainerIdstringOptional
maintainerTeamKeystringOptional
descriptionstringOptional
schemaobjectOptional
### Response
AI tool updated
keystring
schemaobject
versioninteger
createdAtlong
_accessobject or null
Show 2 properties
_linksobject or null
The location and content type of related resources
Show 2 properties
_maintainerobject or null
Show 2 variants
descriptionstring or null
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