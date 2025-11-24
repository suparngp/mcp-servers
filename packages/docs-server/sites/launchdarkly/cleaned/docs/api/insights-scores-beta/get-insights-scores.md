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
/api/v2/engineering-insights/insights/scores
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/engineering-insights/insights/scores"
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
[](/docs/api/insights-scores-beta/get-insights-scores?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "period": {
3
| "startTime": 1,
4
| "endTime": 1
5
| },
6
| "lastPeriod": {
7
| "startTime": 1,
8
| "endTime": 1
9
| },
10
| "scores": {
11
| "overall": {
12
| "score": 100,
13
| "indicator": "string",
14
| "indicatorRange": {
15
| "min": 0,
16
| "max": 100
17
| },
18
| "aggregateOf": [
19
| "deploymentFrequency",
20
| "leadTime"
21
| ],
22
| "diffVsLastPeriod": 1
23
| },
24
| "deploymentFrequency": {
25
| "score": 100,
26
| "indicator": "string",
27
| "indicatorRange": {
28
| "min": 0,
29
| "max": 100
30
| },
31
| "aggregateOf": [
32
| "deploymentFrequency",
33
| "leadTime"
34
| ],
35
| "diffVsLastPeriod": 1
36
| },
37
| "deploymentFailureRate": {
38
| "score": 100,
39
| "indicator": "string",
40
| "indicatorRange": {
41
| "min": 0,
42
| "max": 100
43
| },
44
| "aggregateOf": [
45
| "deploymentFrequency",
46
| "leadTime"
47
| ],
48
| "diffVsLastPeriod": 1
49
| },
50
| "leadTime": {
51
| "score": 100,
52
| "indicator": "string",
53
| "indicatorRange": {
54
| "min": 0,
55
| "max": 100
56
| },
57
| "aggregateOf": [
58
| "deploymentFrequency",
59
| "leadTime"
60
| ],
61
| "diffVsLastPeriod": 1
62
| },
63
| "impactSize": {
64
| "score": 100,
65
| "indicator": "string",
66
| "indicatorRange": {
67
| "min": 0,
68
| "max": 100
69
| },
70
| "aggregateOf": [
71
| "deploymentFrequency",
72
| "leadTime"
73
| ],
74
| "diffVsLastPeriod": 1
75
| },
76
| "experimentationCoverage": {
77
| "score": 100,
78
| "indicator": "string",
79
| "indicatorRange": {
80
| "min": 0,
81
| "max": 100
82
| },
83
| "aggregateOf": [
84
| "deploymentFrequency",
85
| "leadTime"
86
| ],
87
| "diffVsLastPeriod": 1
88
| },
89
| "flagHealth": {
90
| "score": 100,
91
| "indicator": "string",
92
| "indicatorRange": {
93
| "min": 0,
94
| "max": 100
95
| },
96
| "aggregateOf": [
97
| "deploymentFrequency",
98
| "leadTime"
99
| ],
100
| "diffVsLastPeriod": 1
101
| },
102
| "velocity": {
103
| "score": 100,
104
| "indicator": "string",
105
| "indicatorRange": {
106
| "min": 0,
107
| "max": 100
108
| },
109
| "aggregateOf": [
110
| "deploymentFrequency",
111
| "leadTime"
112
| ],
113
| "diffVsLastPeriod": 1
114
| },
115
| "risk": {
116
| "score": 100,
117
| "indicator": "string",
118
| "indicatorRange": {
119
| "min": 0,
120
| "max": 100
121
| },
122
| "aggregateOf": [
123
| "deploymentFrequency",
124
| "leadTime"
125
| ],
126
| "diffVsLastPeriod": 1
127
| },
128
| "efficiency": {
129
| "score": 100,
130
| "indicator": "string",
131
| "indicatorRange": {
132
| "min": 0,
133
| "max": 100
134
| },
135
| "aggregateOf": [
136
| "deploymentFrequency",
137
| "leadTime"
138
| ],
139
| "diffVsLastPeriod": 1
140
| },
141
| "creationRatio": {
142
| "score": 100,
143
| "indicator": "string",
144
| "indicatorRange": {
145
| "min": 0,
146
| "max": 100
147
| },
148
| "aggregateOf": [
149
| "deploymentFrequency",
150
| "leadTime"
151
| ],
152
| "diffVsLastPeriod": 1
153
| }
154
| },
155
| "_links": {}
156
| }
```
Return insights scores, based on the given parameters. This data is also used in engineering insights metrics views.
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
### Response
Insight score response
periodobject
The time period for the scores
Show 2 properties
lastPeriodobject
The time period for the scores in the last period
Show 2 properties
scoresobject
The scores for the insight groups
Show 11 properties
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
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs