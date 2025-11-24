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
/api/v2/projects
cURL
```
1
| curl -X POST https://app.launchdarkly.com/api/v2/projects \
---|--- 
2
| -H "Authorization: <apiKey>" \
3
| -H "Content-Type: application/json" \
4
| -d '{
5
| "name": "My Project",
6
| "key": "project-key-123abc"
7
| }'
```
[](/docs/api/projects/post-project?explorer=true)
201Created
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
| "environments": [
20
| {
21
| "_links": {
22
| "self": {
23
| "href": "/api/v2/projects/my-project/environments/my-environment",
24
| "type": "application/json"
25
| }
26
| },
27
| "_id": "57be1db38b75bf0772d11384",
28
| "key": "environment-key-123abc",
29
| "name": "My Environment",
30
| "apiKey": "sdk-xxx",
31
| "mobileKey": "mob-xxx",
32
| "color": "F5A623",
33
| "defaultTtl": 5,
34
| "secureMode": true,
35
| "defaultTrackEvents": false,
36
| "requireComments": true,
37
| "confirmChanges": true,
38
| "tags": [
39
| "ops"
40
| ],
41
| "critical": true,
42
| "_access": {
43
| "denied": [
44
| {
45
| "action": "string",
46
| "reason": {
47
| "effect": "allow",
48
| "resources": [
49
| "proj/*:env/*;qa_*:/flag/*"
50
| ],
51
| "notResources": [
52
| "string"
53
| ],
54
| "actions": [
55
| "*"
56
| ],
57
| "notActions": [
58
| "string"
59
| ],
60
| "role_name": "string"
61
| }
62
| }
63
| ],
64
| "allowed": [
65
| {
66
| "action": "string",
67
| "reason": {
68
| "effect": "allow",
69
| "resources": [
70
| "proj/*:env/*;qa_*:/flag/*"
71
| ],
72
| "notResources": [
73
| "string"
74
| ],
75
| "actions": [
76
| "*"
77
| ],
78
| "notActions": [
79
| "string"
80
| ],
81
| "role_name": "string"
82
| }
83
| }
84
| ]
85
| },
86
| "approvalSettings": {
87
| "required": true,
88
| "bypassApprovalsForPendingChanges": false,
89
| "minNumApprovals": 1,
90
| "canReviewOwnRequest": false,
91
| "canApplyDeclinedChanges": true,
92
| "serviceKind": "launchdarkly",
93
| "serviceConfig": {},
94
| "requiredApprovalTags": [
95
| "require-approval"
96
| ],
97
| "autoApplyApprovedChanges": true,
98
| "serviceKindConfigurationId": "1ef45a85-218f-4428-a8b2-a97e5f56c258",
99
| "resourceKind": "string"
100
| },
101
| "resourceApprovalSettings": {}
102
| }
103
| ],
104
| "defaultClientSideAvailability": {
105
| "usingMobileKey": true,
106
| "usingEnvironmentId": true
107
| },
108
| "_access": {
109
| "denied": [
110
| {
111
| "action": "string",
112
| "reason": {
113
| "effect": "allow",
114
| "resources": [
115
| "proj/*:env/*;qa_*:/flag/*"
116
| ],
117
| "notResources": [
118
| "string"
119
| ],
120
| "actions": [
121
| "*"
122
| ],
123
| "notActions": [
124
| "string"
125
| ],
126
| "role_name": "string"
127
| }
128
| }
129
| ],
130
| "allowed": [
131
| {
132
| "action": "string",
133
| "reason": {
134
| "effect": "allow",
135
| "resources": [
136
| "proj/*:env/*;qa_*:/flag/*"
137
| ],
138
| "notResources": [
139
| "string"
140
| ],
141
| "actions": [
142
| "*"
143
| ],
144
| "notActions": [
145
| "string"
146
| ],
147
| "role_name": "string"
148
| }
149
| }
150
| ]
151
| },
152
| "defaultReleasePipelineKey": "string"
153
| }
```
Create a new project with the given key and name. Project keys must be unique within an account.
### Authentication
Authorizationstring
API Key authentication via header
### Request
This endpoint expects an object.
namestringRequired
A human-friendly name for the project.
keystringRequired
A unique key used to reference the project in your code.
includeInSnippetByDefaultbooleanOptional
Whether or not flags created in this project are made available to the client-side JavaScript SDK by default.
defaultClientSideAvailabilityobjectOptional
Controls which client-side SDKs can use new flags by default.
Show 2 properties
tagslist of stringsOptional
Tags for the project
environmentslist of objectsOptional
Creates the provided environments for this project. If omitted default environments will be created instead.
Show 11 properties
namingConventionobjectOptional
The flag key convention for this project. Omit this field if you don't want to enforce any conventions for flag keys.
Show 2 properties
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
environmentslist of objects
A list of environments for the project
Show 17 properties
defaultClientSideAvailabilityobject or null
Describes which client-side SDKs can use new flags by default
Show 2 properties
_accessobject or null
Details on the allowed and denied actions for this project
Show 2 properties
defaultReleasePipelineKeystring or null
The key of the default release pipeline for this project
### Errors
400
Bad Request Error
401
Unauthorized Error
403
Forbidden Error
409
Conflict Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs