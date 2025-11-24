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
/api/v2/engineering-insights/pull-requests
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/engineering-insights/pull-requests"
4
| 
5
| querystring = {"projectKey":"projectKey"}
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
[](/docs/api/insights-pull-requests-beta/get-pull-requests?explorer=true)
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
| "externalId": "1234",
7
| "title": "Enable new payment structure",
8
| "status": "merged",
9
| "author": "jane.doe",
10
| "createTime": 1,
11
| "baseCommitKey": "a90a8a2",
12
| "headCommitKey": "a90a8a2",
13
| "filesChanged": 2,
14
| "linesAdded": 100,
15
| "linesDeleted": 50,
16
| "url": "https://github.com/launchdarkly/LaunchDarkly-Docs/pull/406",
17
| "mergeTime": 1,
18
| "mergeCommitKey": "a90a8a2",
19
| "deployments": {
20
| "totalCount": 25,
21
| "items": [
22
| {
23
| "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
24
| "applicationKey": "billing-service",
25
| "applicationVersion": "a90a8a2",
26
| "startedAt": 1,
27
| "status": "string",
28
| "kind": "string",
29
| "active": true,
30
| "archived": false,
31
| "environmentKey": "production",
32
| "numberOfContributors": 1,
33
| "numberOfPullRequests": 2,
34
| "linesAdded": 100,
35
| "linesDeleted": 50,
36
| "leadTime": 20237000,
37
| "endedAt": 1,
38
| "durationMs": 10996000,
39
| "metadata": {
40
| "buildNumber": "1234"
41
| },
42
| "pullRequests": {
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
| "href": "/api/v2/engineering-insights/pull-requests?after=a4290006-1fd1-4ca5-acf7-9f31fac61cf5",
50
| "type": "application/json"
51
| },
52
| "self": {
53
| "href": "/api/v2/engineering-insights/pull-requests",
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
| "leadTimeStages": {
70
| "codingDurationMs": 1000000,
71
| "reviewDurationMs": 500000,
72
| "waitDurationMs": 100000,
73
| "deployDurationMs": 100000,
74
| "totalLeadTimeMs": 1600000
75
| }
76
| }
77
| ],
78
| "_links": {
79
| "next": {
80
| "href": "/api/v2/engineering-insights/deployments?after=a4290006-1fd1-4ca5-acf7-9f31fac61cf5",
81
| "type": "application/json"
82
| },
83
| "self": {
84
| "href": "/api/v2/engineering-insights/deployments",
85
| "type": "application/json"
86
| }
87
| }
88
| },
89
| "flagReferences": {
90
| "totalCount": 25,
91
| "items": [
92
| {
93
| "projectKey": "default",
94
| "flagKey": "enable-new-payment-structure",
95
| "referencesAdded": 2,
96
| "referencesRemoved": 5
97
| }
98
| ]
99
| },
100
| "leadTime": {
101
| "codingDurationMs": 1000000,
102
| "reviewDurationMs": 500000,
103
| "maxWaitDurationMs": 100000,
104
| "avgWaitDurationMs": 100000,
105
| "maxDeployDurationMs": 100000,
106
| "avgDeployDurationMs": 100000,
107
| "maxTotalLeadTimeMs": 1600000,
108
| "avgTotalLeadTimeMs": 1600000
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
| "href": "/api/v2/engineering-insights/pull-requests?after=a4290006-1fd1-4ca5-acf7-9f31fac61cf5",
115
| "type": "application/json"
116
| },
117
| "self": {
118
| "href": "/api/v2/engineering-insights/pull-requests",
119
| "type": "application/json"
120
| }
121
| }
122
| }
```
Get a list of pull requests ### Expanding the pull request collection response LaunchDarkly supports expanding the pull request collection response to include additional fields. To expand the response, append the `expand` query parameter and include the following: * `deployments` includes details on all of the deployments associated with each pull request * `flagReferences` includes details on all of the references to flags in each pull request * `leadTime` includes details about the lead time of the pull request for each stage For example, use `?expand=deployments` to include the `deployments` field in the response. By default, this field is **not** included in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Query Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringOptional`format: "string"`
Required if you are using the `sort` parameter’s `leadTime` option to sort pull requests.
applicationKeystringOptional`format: "string"`
Filter the results to pull requests deployed to a comma separated list of applications
statusstringOptional`format: "string"`
Filter results to pull requests with the given status. Options: `open`, `merged`, `closed`, `deployed`.
querystringOptional`format: "string"`
Filter list of pull requests by title or author
limitlongOptional
The number of pull requests to return. Default is 20. Maximum allowed is 100.
expandstringOptional`format: "string"`
Expand properties in response. Options: `deployments`, `flagReferences`, `leadTime`.
sortstringOptional`format: "string"`
Sort results. Requires the `environmentKey` to be set. Options: `leadTime` (asc) and `-leadTime` (desc). When query option is excluded, default sort is by created or merged date.
fromdatetimeOptional
Unix timestamp in milliseconds. Default value is 7 days ago.
todatetimeOptional
Unix timestamp in milliseconds. Default value is now.
afterstringOptional`format: "string"`
Identifier used for pagination
beforestringOptional`format: "string"`
Identifier used for pagination
### Response
Pull request collection response
totalCountinteger
The total number of pull requests
itemslist of objects
A list of pull requests
Show 17 properties
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
Get a list of pull requests
### Expanding the pull request collection response
LaunchDarkly supports expanding the pull request collection response to include additional fields.
To expand the response, append the `expand` query parameter and include the following:
 * `deployments` includes details on all of the deployments associated with each pull request
 * `flagReferences` includes details on all of the references to flags in each pull request
 * `leadTime` includes details about the lead time of the pull request for each stage
For example, use `?expand=deployments` to include the `deployments` field in the response. By default, this field is **not** included in the response.