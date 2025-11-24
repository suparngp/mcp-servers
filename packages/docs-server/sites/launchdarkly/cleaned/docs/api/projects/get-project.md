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
/api/v2/projects/:projectKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey"
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
[](/docs/api/projects/get-project?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "_links": {
3
| "environments": {
4
| "href": "/api/v2/projects/my-project/environments",
5
| "type": "application/json"
6
| },
7
| "self": {
8
| "href": "/api/v2/projects/my-project",
9
| "type": "application/json"
10
| }
11
| },
12
| "_id": "57be1db38b75bf0772d11383",
13
| "key": "project-key-123abc",
14
| "includeInSnippetByDefault": true,
15
| "name": "My Project",
16
| "tags": [
17
| "ops"
18
| ],
19
| "defaultClientSideAvailability": {
20
| "usingMobileKey": true,
21
| "usingEnvironmentId": true
22
| },
23
| "_access": {
24
| "denied": [
25
| {
26
| "action": "string",
27
| "reason": {
28
| "effect": "allow",
29
| "resources": [
30
| "proj/*:env/*;qa_*:/flag/*"
31
| ],
32
| "notResources": [
33
| "string"
34
| ],
35
| "actions": [
36
| "*"
37
| ],
38
| "notActions": [
39
| "string"
40
| ],
41
| "role_name": "string"
42
| }
43
| }
44
| ],
45
| "allowed": [
46
| {
47
| "action": "string",
48
| "reason": {
49
| "effect": "allow",
50
| "resources": [
51
| "proj/*:env/*;qa_*:/flag/*"
52
| ],
53
| "notResources": [
54
| "string"
55
| ],
56
| "actions": [
57
| "*"
58
| ],
59
| "notActions": [
60
| "string"
61
| ],
62
| "role_name": "string"
63
| }
64
| }
65
| ]
66
| },
67
| "defaultReleasePipelineKey": "string",
68
| "environments": {
69
| "items": [
70
| {
71
| "_links": {
72
| "self": {
73
| "href": "/api/v2/projects/my-project/environments/my-environment",
74
| "type": "application/json"
75
| }
76
| },
77
| "_id": "57be1db38b75bf0772d11384",
78
| "key": "environment-key-123abc",
79
| "name": "My Environment",
80
| "apiKey": "sdk-xxx",
81
| "mobileKey": "mob-xxx",
82
| "color": "F5A623",
83
| "defaultTtl": 5,
84
| "secureMode": true,
85
| "defaultTrackEvents": false,
86
| "requireComments": true,
87
| "confirmChanges": true,
88
| "tags": [
89
| "ops"
90
| ],
91
| "critical": true,
92
| "_access": {
93
| "denied": [
94
| {
95
| "action": "string",
96
| "reason": {
97
| "effect": "allow",
98
| "resources": [
99
| "proj/*:env/*;qa_*:/flag/*"
100
| ],
101
| "notResources": [
102
| "string"
103
| ],
104
| "actions": [
105
| "*"
106
| ],
107
| "notActions": [
108
| "string"
109
| ],
110
| "role_name": "string"
111
| }
112
| }
113
| ],
114
| "allowed": [
115
| {
116
| "action": "string",
117
| "reason": {
118
| "effect": "allow",
119
| "resources": [
120
| "proj/*:env/*;qa_*:/flag/*"
121
| ],
122
| "notResources": [
123
| "string"
124
| ],
125
| "actions": [
126
| "*"
127
| ],
128
| "notActions": [
129
| "string"
130
| ],
131
| "role_name": "string"
132
| }
133
| }
134
| ]
135
| },
136
| "approvalSettings": {
137
| "required": true,
138
| "bypassApprovalsForPendingChanges": false,
139
| "minNumApprovals": 1,
140
| "canReviewOwnRequest": false,
141
| "canApplyDeclinedChanges": true,
142
| "serviceKind": "launchdarkly",
143
| "serviceConfig": {},
144
| "requiredApprovalTags": [
145
| "require-approval"
146
| ],
147
| "autoApplyApprovedChanges": true,
148
| "serviceKindConfigurationId": "1ef45a85-218f-4428-a8b2-a97e5f56c258",
149
| "resourceKind": "string"
150
| },
151
| "resourceApprovalSettings": {}
152
| }
153
| ],
154
| "_links": {},
155
| "totalCount": 2
156
| }
157
| }
```
Get a single project by key. ### Expanding the project response LaunchDarkly supports one field for expanding the "Get project" response. By default, these fields are **not** included in the response. To expand the response, append the `expand` query parameter and add a comma-separated list with any of the following fields: * `environments` includes a paginated list of the project environments. For example, `expand=environments` includes the `environments` field for the project in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key.
### Query Parameters
expandstringOptional`format: "string"`
A comma-separated list of properties that can reveal additional information in the response.
### Response
Project response
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
_idstring
The ID of this project
keystring
The key of this project
includeInSnippetByDefaultboolean
Whether or not flags created in this project are made available to the client-side JavaScript SDK by default
namestring
A human-friendly name for the project
tagslist of strings
A list of tags for the project
defaultClientSideAvailabilityobject or null
Describes which client-side SDKs can use new flags by default
Show 2 properties
_accessobject or null
Details on the allowed and denied actions for this project
Show 2 properties
defaultReleasePipelineKeystring or null
The key of the default release pipeline for this project
environmentsobject or null
A paginated list of environments for the project. By default this field is omitted unless expanded by the client.
Show 3 properties
### Errors
400
Bad Request Error
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
Get a single project by key.
### Expanding the project response
LaunchDarkly supports one field for expanding the “Get project” response. By default, these fields are **not** included in the response.
To expand the response, append the `expand` query parameter and add a comma-separated list with any of the following fields:
 * `environments` includes a paginated list of the project environments.
For example, `expand=environments` includes the `environments` field for the project in the response.