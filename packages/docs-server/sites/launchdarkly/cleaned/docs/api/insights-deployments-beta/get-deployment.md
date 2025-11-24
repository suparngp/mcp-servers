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
/api/v2/engineering-insights/deployments/:deploymentID
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/engineering-insights/deployments/deploymentID"
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
[](/docs/api/insights-deployments-beta/get-deployment?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
3
| "applicationKey": "billing-service",
4
| "applicationVersion": "a90a8a2",
5
| "startedAt": 1,
6
| "status": "string",
7
| "kind": "string",
8
| "active": true,
9
| "archived": false,
10
| "environmentKey": "production",
11
| "numberOfContributors": 1,
12
| "numberOfPullRequests": 2,
13
| "linesAdded": 100,
14
| "linesDeleted": 50,
15
| "leadTime": 20237000,
16
| "endedAt": 1,
17
| "durationMs": 10996000,
18
| "metadata": {
19
| "buildNumber": "1234"
20
| },
21
| "pullRequests": {
22
| "totalCount": 25,
23
| "items": [
24
| {
25
| "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
26
| "externalId": "1234",
27
| "title": "Enable new payment structure",
28
| "status": "merged",
29
| "author": "jane.doe",
30
| "createTime": 1,
31
| "baseCommitKey": "a90a8a2",
32
| "headCommitKey": "a90a8a2",
33
| "filesChanged": 2,
34
| "linesAdded": 100,
35
| "linesDeleted": 50,
36
| "url": "https://github.com/launchdarkly/LaunchDarkly-Docs/pull/406",
37
| "mergeTime": 1,
38
| "mergeCommitKey": "a90a8a2",
39
| "deployments": {
40
| "totalCount": 25,
41
| "items": [
42
| {
43
| "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
44
| "applicationKey": "billing-service",
45
| "applicationVersion": "a90a8a2",
46
| "startedAt": 1,
47
| "status": "string",
48
| "kind": "string",
49
| "active": true,
50
| "archived": false,
51
| "environmentKey": "production",
52
| "numberOfContributors": 1,
53
| "numberOfPullRequests": 2,
54
| "linesAdded": 100,
55
| "linesDeleted": 50,
56
| "leadTime": 20237000,
57
| "endedAt": 1,
58
| "durationMs": 10996000,
59
| "metadata": {
60
| "buildNumber": "1234"
61
| },
62
| "flagReferences": {
63
| "totalCount": 25,
64
| "items": [
65
| {
66
| "projectKey": "default",
67
| "flagKey": "enable-new-payment-structure",
68
| "referencesAdded": 2,
69
| "referencesRemoved": 5
70
| }
71
| ]
72
| },
73
| "leadTimeStages": {
74
| "codingDurationMs": 1000000,
75
| "reviewDurationMs": 500000,
76
| "waitDurationMs": 100000,
77
| "deployDurationMs": 100000,
78
| "totalLeadTimeMs": 1600000
79
| }
80
| }
81
| ],
82
| "_links": {
83
| "next": {
84
| "href": "/api/v2/engineering-insights/deployments?after=a4290006-1fd1-4ca5-acf7-9f31fac61cf5",
85
| "type": "application/json"
86
| },
87
| "self": {
88
| "href": "/api/v2/engineering-insights/deployments",
89
| "type": "application/json"
90
| }
91
| }
92
| },
93
| "flagReferences": {
94
| "totalCount": 25,
95
| "items": [
96
| {
97
| "projectKey": "default",
98
| "flagKey": "enable-new-payment-structure",
99
| "referencesAdded": 2,
100
| "referencesRemoved": 5
101
| }
102
| ]
103
| },
104
| "leadTime": {
105
| "codingDurationMs": 1000000,
106
| "reviewDurationMs": 500000,
107
| "maxWaitDurationMs": 100000,
108
| "avgWaitDurationMs": 100000,
109
| "maxDeployDurationMs": 100000,
110
| "avgDeployDurationMs": 100000,
111
| "maxTotalLeadTimeMs": 1600000,
112
| "avgTotalLeadTimeMs": 1600000
113
| }
114
| }
115
| ],
116
| "_links": {
117
| "next": {
118
| "href": "/api/v2/engineering-insights/pull-requests?after=a4290006-1fd1-4ca5-acf7-9f31fac61cf5",
119
| "type": "application/json"
120
| },
121
| "self": {
122
| "href": "/api/v2/engineering-insights/pull-requests",
123
| "type": "application/json"
124
| }
125
| }
126
| },
127
| "flagReferences": {
128
| "totalCount": 25,
129
| "items": [
130
| {
131
| "projectKey": "default",
132
| "flagKey": "enable-new-payment-structure",
133
| "referencesAdded": 2,
134
| "referencesRemoved": 5
135
| }
136
| ]
137
| },
138
| "leadTimeStages": {
139
| "codingDurationMs": 1000000,
140
| "reviewDurationMs": 500000,
141
| "waitDurationMs": 100000,
142
| "deployDurationMs": 100000,
143
| "totalLeadTimeMs": 1600000
144
| }
145
| }
```
Get a deployment by ID. The deployment ID is returned as part of the [List deployments](https://launchdarkly.com/docs/api/insights-deployments-beta/get-deployments) response. It is the `id` field of each element in the `items` array. ### Expanding the deployment response LaunchDarkly supports expanding the deployment response to include additional fields. To expand the response, append the `expand` query parameter and include the following: * `pullRequests` includes details on all of the pull requests associated with each deployment * `flagReferences` includes details on all of the references to flags in each deployment For example, use `?expand=pullRequests` to include the `pullRequests` field in the response. By default, this field is **not** included in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
deploymentIDstringRequired`format: "string"`
The deployment ID
### Query Parameters
expandstringOptional`format: "string"`
Expand properties in response. Options: `pullRequests`, `flagReferences`
### Response
Deployment response
idstring`format: "uuid"`
The deployment ID
applicationKeystring
The application key
applicationVersionstring
The application version
startedAtlong
The time the deployment started
statusstring
The status of the deployment
kindstring
The kind of deployment
activeboolean
Whether the deployment is active
archivedboolean
Whether the deployment is archived
environmentKeystring
The environment key
numberOfContributorsinteger
The number of contributors
numberOfPullRequestsinteger
The number of pull requests
linesAddedlong
The number of lines added
linesDeletedlong
The number of lines deleted
leadTimelong
The total lead time from first commit to deployment end in milliseconds
endedAtlong or null
The time the deployment ended
durationMslong or null
The duration of the deployment in milliseconds
metadatamap from strings to any or null
The metadata associated with the deployment
pullRequestsobject or null
The pull requests contained in the deployment
Show 3 properties
flagReferencesobject or null
The flag references contained in the deployment
Show 2 properties
leadTimeStagesobject or null
The lead time stages for the deployment
Show 5 properties
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
Get a deployment by ID.
The deployment ID is returned as part of the [List deployments](https://launchdarkly.com/docs/api/insights-deployments-beta/get-deployments) response. It is the `id` field of each element in the `items` array.
### Expanding the deployment response
LaunchDarkly supports expanding the deployment response to include additional fields.
To expand the response, append the `expand` query parameter and include the following:
 * `pullRequests` includes details on all of the pull requests associated with each deployment
 * `flagReferences` includes details on all of the references to flags in each deployment
For example, use `?expand=pullRequests` to include the `pullRequests` field in the response. By default, this field is **not** included in the response.