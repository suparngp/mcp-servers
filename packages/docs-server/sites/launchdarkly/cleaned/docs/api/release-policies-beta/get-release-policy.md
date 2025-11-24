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
/api/v2/projects/:projectKey/release-policies/:policyKey
cURL
```
1
| curl https://app.launchdarkly.com/api/v2/projects/default/release-policies/production-release \
---|--- 
2
| -H "LD-API-Version: beta" \
3
| -H "Authorization: <apiKey>"
```
[](/docs/api/release-policies-beta/get-release-policy?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "_id": "550e8400-e29b-41d4-a716-446655440000",
3
| "rank": 1,
4
| "releaseMethod": "guarded-release",
5
| "name": "Production Release",
6
| "key": "production-release",
7
| "_access": {
8
| "allowed": [
9
| {
10
| "action": "action",
11
| "reason": {
12
| "effect": "allow",
13
| "resources": [
14
| "proj/*:env/*;qa_*:/flag/*"
15
| ],
16
| "notResources": [
17
| "notResources",
18
| "notResources"
19
| ],
20
| "actions": [
21
| "*"
22
| ],
23
| "notActions": [
24
| "string",
25
| "string"
26
| ],
27
| "role_name": "role_name"
28
| }
29
| },
30
| {
31
| "action": "action",
32
| "reason": {
33
| "effect": "allow",
34
| "resources": [
35
| "proj/*:env/*;qa_*:/flag/*"
36
| ],
37
| "notResources": [
38
| "notResources",
39
| "notResources"
40
| ],
41
| "actions": [
42
| "*"
43
| ],
44
| "notActions": [
45
| "string",
46
| "string"
47
| ],
48
| "role_name": "role_name"
49
| }
50
| }
51
| ],
52
| "denied": [
53
| {
54
| "action": "action",
55
| "reason": {
56
| "effect": "allow",
57
| "resources": [
58
| "proj/*:env/*;qa_*:/flag/*"
59
| ],
60
| "notResources": [
61
| "notResources",
62
| "notResources"
63
| ],
64
| "actions": [
65
| "*"
66
| ],
67
| "notActions": [
68
| "string",
69
| "string"
70
| ],
71
| "role_name": "role_name"
72
| }
73
| },
74
| {
75
| "action": "action",
76
| "reason": {
77
| "effect": "allow",
78
| "resources": [
79
| "proj/*:env/*;qa_*:/flag/*"
80
| ],
81
| "notResources": [
82
| "notResources",
83
| "notResources"
84
| ],
85
| "actions": [
86
| "*"
87
| ],
88
| "notActions": [
89
| "string",
90
| "string"
91
| ],
92
| "role_name": "role_name"
93
| }
94
| }
95
| ]
96
| },
97
| "scope": {
98
| "environmentKeys": [
99
| "production",
100
| "staging"
101
| ],
102
| "flagTagKeys": [
103
| "frontend",
104
| "backend"
105
| ],
106
| "viewKeys": [
107
| "feature-a",
108
| "team-a"
109
| ]
110
| },
111
| "guardedReleaseConfig": {
112
| "rollbackOnRegression": true,
113
| "minSampleSize": 100,
114
| "metricKeys": [
115
| "http-errors",
116
| "latency"
117
| ],
118
| "rolloutContextKindKey": "user",
119
| "metricRegressionThreshold": 0.05,
120
| "metricGroupKeys": [
121
| "frontend-metrics",
122
| "backend-metrics"
123
| ],
124
| "stages": [
125
| {
126
| "allocation": 25000,
127
| "durationMillis": 60000
128
| },
129
| {
130
| "allocation": 25000,
131
| "durationMillis": 60000
132
| }
133
| ]
134
| },
135
| "progressiveReleaseConfig": {
136
| "rolloutContextKindKey": "user",
137
| "stages": [
138
| {
139
| "allocation": 25000,
140
| "durationMillis": 60000
141
| },
142
| {
143
| "allocation": 25000,
144
| "durationMillis": 60000
145
| }
146
| ]
147
| }
148
| }
```
Retrieve a single release policy by its key for the specified project.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired
The project key
policyKeystringRequired
The release policy key
### Headers
LD-API-VersionenumRequired
Version of the endpoint.
Allowed values:beta
### Response
Release policy found
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