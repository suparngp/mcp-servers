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
/api/v2/engineering-insights/deployments
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/engineering-insights/deployments"
4
| 
5
| querystring = {"projectKey":"projectKey","environmentKey":"environmentKey"}
6
| 
7
| headers = {"Authorization": "<apiKey>"}
8
| 
9
| response = requests.get(url, headers=headers, params=querystring)
10
| 
11
| print(response.json())
```
[](/docs/api/insights-deployments-beta/get-deployments?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "totalCount": 25,
3
| "items": [
4
| {
5
| "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
6
| "applicationKey": "billing-service",
7
| "applicationVersion": "a90a8a2",
8
| "startedAt": 1,
9
| "status": "string",
10
| "kind": "string",
11
| "active": true,
12
| "archived": false,
13
| "environmentKey": "production",
14
| "numberOfContributors": 1,
15
| "numberOfPullRequests": 2,
16
| "linesAdded": 100,
17
| "linesDeleted": 50,
18
| "leadTime": 20237000,
19
| "endedAt": 1,
20
| "durationMs": 10996000,
21
| "metadata": {
22
| "buildNumber": "1234"
23
| },
24
| "pullRequests": {
25
| "totalCount": 25,
26
| "items": [
27
| {
28
| "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
29
| "externalId": "1234",
30
| "title": "Enable new payment structure",
31
| "status": "merged",
32
| "author": "jane.doe",
33
| "createTime": 1,
34
| "baseCommitKey": "a90a8a2",
35
| "headCommitKey": "a90a8a2",
36
| "filesChanged": 2,
37
| "linesAdded": 100,
38
| "linesDeleted": 50,
39
| "url": "https://github.com/launchdarkly/LaunchDarkly-Docs/pull/406",
40
| "mergeTime": 1,
41
| "mergeCommitKey": "a90a8a2",
42
| "deployments": {
43
| "totalCount": 25,
44
| "items": [
45
| null
46
| ],
47
| "_links": {
48
| "next": {
49
| "href": "/api/v2/engineering-insights/deployments?after=a4290006-1fd1-4ca5-acf7-9f31fac61cf5",
50
| "type": "application/json"
51
| },
52
| "self": {
53
| "href": "/api/v2/engineering-insights/deployments",
54
| "type": "application/json"
55
| }
56
| }
57
| },
58
| "flagReferences": {
59
| "totalCount": 25,
60
| "items": [
61
| {
62
| "projectKey": "default",
63
| "flagKey": "enable-new-payment-structure",
64
| "referencesAdded": 2,
65
| "referencesRemoved": 5
66
| }
67
| ]
68
| },
69
| "leadTime": {
70
| "codingDurationMs": 1000000,
71
| "reviewDurationMs": 500000,
72
| "maxWaitDurationMs": 100000,
73
| "avgWaitDurationMs": 100000,
74
| "maxDeployDurationMs": 100000,
75
| "avgDeployDurationMs": 100000,
76
| "maxTotalLeadTimeMs": 1600000,
77
| "avgTotalLeadTimeMs": 1600000
78
| }
79
| }
80
| ],
81
| "_links": {
82
| "next": {
83
| "href": "/api/v2/engineering-insights/pull-requests?after=a4290006-1fd1-4ca5-acf7-9f31fac61cf5",
84
| "type": "application/json"
85
| },
86
| "self": {
87
| "href": "/api/v2/engineering-insights/pull-requests",
88
| "type": "application/json"
89
| }
90
| }
91
| },
92
| "flagReferences": {
93
| "totalCount": 25,
94
| "items": [
95
| {
96
| "projectKey": "default",
97
| "flagKey": "enable-new-payment-structure",
98
| "referencesAdded": 2,
99
| "referencesRemoved": 5
100
| }
101
| ]
102
| },
103
| "leadTimeStages": {
104
| "codingDurationMs": 1000000,
105
| "reviewDurationMs": 500000,
106
| "waitDurationMs": 100000,
107
| "deployDurationMs": 100000,
108
| "totalLeadTimeMs": 1600000
109
| }
110
| }
111
| ],
112
| "_links": {
113
| "next": {
114
| "href": "/api/v2/engineering-insights/deployments?after=a4290006-1fd1-4ca5-acf7-9f31fac61cf5",
115
| "type": "application/json"
116
| },
117
| "self": {
118
| "href": "/api/v2/engineering-insights/deployments",
119
| "type": "application/json"
120
| }
121
| }
122
| }
```
Get a list of deployments ### Expanding the deployment collection response LaunchDarkly supports expanding the deployment collection response to include additional fields. To expand the response, append the `expand` query parameter and include the following: * `pullRequests` includes details on all of the pull requests associated with each deployment * `flagReferences` includes details on all of the references to flags in each deployment For example, use `?expand=pullRequests` to include the `pullRequests` field in the response. By default, this field is **not** included in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Query Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
applicationKeystringOptional`format: "string"`
Comma separated list of application keys
limitlongOptional
The number of deployments to return. Default is 20. Maximum allowed is 100.
expandstringOptional`format: "string"`
Expand properties in response. Options: `pullRequests`, `flagReferences`
fromlongOptional
Unix timestamp in milliseconds. Default value is 7 days ago.
tolongOptional
Unix timestamp in milliseconds. Default value is now.
afterstringOptional`format: "string"`
Identifier used for pagination
beforestringOptional`format: "string"`
Identifier used for pagination
kindstringOptional`format: "string"`
The deployment kind
statusstringOptional`format: "string"`
The deployment status
### Response
Deployment collection response
totalCountinteger
The total number of deployments
itemslist of objects
A list of deployments
Show 20 properties
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
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
Get a list of deployments
### Expanding the deployment collection response
LaunchDarkly supports expanding the deployment collection response to include additional fields.
To expand the response, append the `expand` query parameter and include the following:
 * `pullRequests` includes details on all of the pull requests associated with each deployment
 * `flagReferences` includes details on all of the references to flags in each deployment
For example, use `?expand=pullRequests` to include the `pullRequests` field in the response. By default, this field is **not** included in the response.