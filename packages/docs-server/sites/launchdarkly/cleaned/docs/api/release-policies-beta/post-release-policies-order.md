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
/api/v2/projects/:projectKey/release-policies/order
cURL
```
1
| curl -X POST https://app.launchdarkly.com/api/v2/projects/default/release-policies/order \
---|--- 
2
| -H "LD-API-Version: beta" \
3
| -H "Authorization: <apiKey>" \
4
| -H "Content-Type: application/json" \
5
| -d '[
6
| "string"
7
| ]'
```
[](/docs/api/release-policies-beta/post-release-policies-order?explorer=true)
200Successful
```
1
| [
---|--- 
2
| {
3
| "_id": "550e8400-e29b-41d4-a716-446655440000",
4
| "rank": 1,
5
| "releaseMethod": "guarded-release",
6
| "name": "Production Release",
7
| "key": "production-release",
8
| "_access": {
9
| "allowed": [
10
| {
11
| "action": "action",
12
| "reason": {
13
| "effect": "allow",
14
| "resources": [
15
| "proj/*:env/*;qa_*:/flag/*"
16
| ],
17
| "notResources": [
18
| "notResources",
19
| "notResources"
20
| ],
21
| "actions": [
22
| "*"
23
| ],
24
| "notActions": [
25
| "string",
26
| "string"
27
| ],
28
| "role_name": "role_name"
29
| }
30
| },
31
| {
32
| "action": "action",
33
| "reason": {
34
| "effect": "allow",
35
| "resources": [
36
| "proj/*:env/*;qa_*:/flag/*"
37
| ],
38
| "notResources": [
39
| "notResources",
40
| "notResources"
41
| ],
42
| "actions": [
43
| "*"
44
| ],
45
| "notActions": [
46
| "string",
47
| "string"
48
| ],
49
| "role_name": "role_name"
50
| }
51
| }
52
| ],
53
| "denied": [
54
| {
55
| "action": "action",
56
| "reason": {
57
| "effect": "allow",
58
| "resources": [
59
| "proj/*:env/*;qa_*:/flag/*"
60
| ],
61
| "notResources": [
62
| "notResources",
63
| "notResources"
64
| ],
65
| "actions": [
66
| "*"
67
| ],
68
| "notActions": [
69
| "string",
70
| "string"
71
| ],
72
| "role_name": "role_name"
73
| }
74
| },
75
| {
76
| "action": "action",
77
| "reason": {
78
| "effect": "allow",
79
| "resources": [
80
| "proj/*:env/*;qa_*:/flag/*"
81
| ],
82
| "notResources": [
83
| "notResources",
84
| "notResources"
85
| ],
86
| "actions": [
87
| "*"
88
| ],
89
| "notActions": [
90
| "string",
91
| "string"
92
| ],
93
| "role_name": "role_name"
94
| }
95
| }
96
| ]
97
| },
98
| "scope": {
99
| "environmentKeys": [
100
| "production",
101
| "staging"
102
| ],
103
| "flagTagKeys": [
104
| "frontend",
105
| "backend"
106
| ],
107
| "viewKeys": [
108
| "feature-a",
109
| "team-a"
110
| ]
111
| },
112
| "guardedReleaseConfig": {
113
| "rollbackOnRegression": true,
114
| "minSampleSize": 100,
115
| "metricKeys": [
116
| "http-errors",
117
| "latency"
118
| ],
119
| "rolloutContextKindKey": "user",
120
| "metricRegressionThreshold": 0.05,
121
| "metricGroupKeys": [
122
| "frontend-metrics",
123
| "backend-metrics"
124
| ],
125
| "stages": [
126
| {
127
| "allocation": 25000,
128
| "durationMillis": 60000
129
| },
130
| {
131
| "allocation": 25000,
132
| "durationMillis": 60000
133
| }
134
| ]
135
| },
136
| "progressiveReleaseConfig": {
137
| "rolloutContextKindKey": "user",
138
| "stages": [
139
| {
140
| "allocation": 25000,
141
| "durationMillis": 60000
142
| },
143
| {
144
| "allocation": 25000,
145
| "durationMillis": 60000
146
| }
147
| ]
148
| }
149
| }
150
| ]
```
Update the order of existing release policies for the specified project.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired
The project key
### Headers
LD-API-VersionenumRequired
Version of the endpoint.
Allowed values:beta
### Request
Array of release policy keys in the desired rank order (scoped policies only). These keys must include _all_ of the scoped release policies for the project.
### Response
Release policies updated successfully
_idstring
The unique identifier of the release policy
rankinteger
The rank/priority of the release policy
releaseMethodenum
The release method for this policy
Allowed values:guarded-releaseprogressive-release
namestring`<=256 characters`
The name of the release policy
keystring
The human-readable key of the release policy
_accessobject or null
Show 2 properties
scopeobject or null
Show 1 properties
guardedReleaseConfigobject or null
Configuration for guarded releases
Show 2 properties
progressiveReleaseConfigobject or null
Configuration for progressive releases
### Errors
400
Bad Request Error
401
Unauthorized Error
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