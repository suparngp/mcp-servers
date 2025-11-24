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
/api/v2/projects/:projectKey/ai-configs/:configKey/variations/:variationKey
cURL
```
1
| curl https://app.launchdarkly.com/api/v2/projects/default/ai-configs/default/variations/default \
---|--- 
2
| -H "LD-API-Version: beta" \
3
| -H "Authorization: <apiKey>"
```
[](/docs/api/ai-configs-beta/get-ai-config-variation?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "items": [
3
| {
4
| "key": "key",
5
| "_id": "_id",
6
| "model": "{}",
7
| "name": "name",
8
| "createdAt": 6,
9
| "version": 1,
10
| "_links": {
11
| "parent": {
12
| "href": "href",
13
| "type": "type"
14
| }
15
| },
16
| "color": "color",
17
| "comment": "comment",
18
| "description": "description",
19
| "instructions": "instructions",
20
| "messages": [
21
| {
22
| "content": "content",
23
| "role": "role"
24
| },
25
| {
26
| "content": "content",
27
| "role": "role"
28
| }
29
| ],
30
| "modelConfigKey": "modelConfigKey",
31
| "state": "state",
32
| "_archivedAt": 5,
33
| "_publishedAt": 5,
34
| "tools": [
35
| {
36
| "key": "key",
37
| "version": 2
38
| },
39
| {
40
| "key": "key",
41
| "version": 2
42
| }
43
| ],
44
| "judgeConfiguration": {
45
| "judges": [
46
| {
47
| "judgeConfigKey": "judgeConfigKey",
48
| "samplingRate": 0.7061401
49
| },
50
| {
51
| "judgeConfigKey": "judgeConfigKey",
52
| "samplingRate": 0.7061401
53
| }
54
| ]
55
| },
56
| "judgingConfigKeys": [
57
| "judgingConfigKeys",
58
| "judgingConfigKeys"
59
| ]
60
| },
61
| {
62
| "key": "key",
63
| "_id": "_id",
64
| "model": "{}",
65
| "name": "name",
66
| "createdAt": 6,
67
| "version": 1,
68
| "_links": {
69
| "parent": {
70
| "href": "href",
71
| "type": "type"
72
| }
73
| },
74
| "color": "color",
75
| "comment": "comment",
76
| "description": "description",
77
| "instructions": "instructions",
78
| "messages": [
79
| {
80
| "content": "content",
81
| "role": "role"
82
| },
83
| {
84
| "content": "content",
85
| "role": "role"
86
| }
87
| ],
88
| "modelConfigKey": "modelConfigKey",
89
| "state": "state",
90
| "_archivedAt": 5,
91
| "_publishedAt": 5,
92
| "tools": [
93
| {
94
| "key": "key",
95
| "version": 2
96
| },
97
| {
98
| "key": "key",
99
| "version": 2
100
| }
101
| ],
102
| "judgeConfiguration": {
103
| "judges": [
104
| {
105
| "judgeConfigKey": "judgeConfigKey",
106
| "samplingRate": 0.7061401
107
| },
108
| {
109
| "judgeConfigKey": "judgeConfigKey",
110
| "samplingRate": 0.7061401
111
| }
112
| ]
113
| },
114
| "judgingConfigKeys": [
115
| "judgingConfigKeys",
116
| "judgingConfigKeys"
117
| ]
118
| }
119
| ],
120
| "totalCount": 0
121
| }
```
Get an AI Config variation by key. The response includes all variation versions for the given variation key.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired
configKeystringRequired
variationKeystringRequired
### Headers
LD-API-VersionenumRequired
Version of the endpoint.
Allowed values:beta
### Response
Successful response
itemslist of objects
Show 19 properties
totalCountinteger
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