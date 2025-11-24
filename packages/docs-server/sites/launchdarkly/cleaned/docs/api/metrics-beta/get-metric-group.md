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
/api/v2/projects/:projectKey/metric-groups/:metricGroupKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/metric-groups/metricGroupKey"
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
[](/docs/api/metrics-beta/get-metric-group?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "_id": "bc3e5be1-02d2-40c7-9926-26d0aacd7aab",
3
| "key": "metric-group-key-123abc",
4
| "name": "My metric group",
5
| "kind": "funnel",
6
| "_links": {
7
| "parent": {
8
| "href": "/api/v2/projects/my-project",
9
| "type": "application/json"
10
| },
11
| "self": {
12
| "href": "/api/v2/projects/my-project/metric-groups/my-metric-group",
13
| "type": "application/json"
14
| }
15
| },
16
| "tags": [
17
| "ops"
18
| ],
19
| "_creationDate": 1,
20
| "_lastModified": 1,
21
| "maintainer": {
22
| "member": {
23
| "_links": {
24
| "self": {
25
| "href": "/api/v2/members/569f183514f4432160000007",
26
| "type": "application/json"
27
| }
28
| },
29
| "_id": "569f183514f4432160000007",
30
| "role": "admin",
31
| "email": "ariel@acme.com",
32
| "firstName": "Ariel",
33
| "lastName": "Flores"
34
| },
35
| "team": {
36
| "customRoleKeys": [
37
| "access-to-test-projects"
38
| ],
39
| "key": "team-key-123abc",
40
| "name": "QA Team",
41
| "_links": {}
42
| }
43
| },
44
| "metrics": [
45
| {
46
| "key": "metric-key-123abc",
47
| "name": "Example metric",
48
| "kind": "custom",
49
| "_links": {
50
| "self": {
51
| "href": "/api/v2/metrics/my-project/my-metric",
52
| "type": "application/json"
53
| }
54
| },
55
| "_versionId": "version-id-123abc",
56
| "isNumeric": true,
57
| "unitAggregationType": "sum",
58
| "eventKey": "event-key-123abc",
59
| "nameInGroup": "Step 1",
60
| "randomizationUnits": [
61
| "user"
62
| ]
63
| }
64
| ],
65
| "_version": 1,
66
| "description": "Description of the metric group",
67
| "_access": {
68
| "denied": [
69
| {
70
| "action": "string",
71
| "reason": {
72
| "effect": "allow",
73
| "resources": [
74
| "proj/*:env/*;qa_*:/flag/*"
75
| ],
76
| "notResources": [
77
| "string"
78
| ],
79
| "actions": [
80
| "*"
81
| ],
82
| "notActions": [
83
| "string"
84
| ],
85
| "role_name": "string"
86
| }
87
| }
88
| ],
89
| "allowed": [
90
| {
91
| "action": "string",
92
| "reason": {
93
| "effect": "allow",
94
| "resources": [
95
| "proj/*:env/*;qa_*:/flag/*"
96
| ],
97
| "notResources": [
98
| "string"
99
| ],
100
| "actions": [
101
| "*"
102
| ],
103
| "notActions": [
104
| "string"
105
| ],
106
| "role_name": "string"
107
| }
108
| }
109
| ]
110
| },
111
| "experiments": [
112
| {
113
| "key": "experiment-key-123abc",
114
| "name": "Example experiment",
115
| "environmentId": "1234a56b7c89d012345e678f",
116
| "environmentKey": "production",
117
| "creationDate": 1,
118
| "_links": {
119
| "parent": {
120
| "href": "/api/v2/projects/my-project/environments/my-environment",
121
| "type": "application/json"
122
| },
123
| "self": {
124
| "href": "/api/v2/projects/my-project/environments/my-environment/experiments/example-experiment",
125
| "type": "application/json"
126
| }
127
| },
128
| "archivedDate": 1
129
| }
130
| ],
131
| "experimentCount": 0,
132
| "activeExperimentCount": 0,
133
| "activeGuardedRolloutCount": 0
134
| }
```
Get information for a single metric group from the specific project. ### Expanding the metric group response LaunchDarkly supports two fields for expanding the "Get metric group" response. By default, these fields are **not** included in the response. To expand the response, append the `expand` query parameter and add a comma-separated list with either or both of the following fields: - `experiments` includes all experiments from the specific project that use the metric group - `experimentCount` includes the number of experiments from the specific project that use the metric group For example, `expand=experiments` includes the `experiments` field in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
metricGroupKeystringRequired`format: "string"`
The metric group key
### Query Parameters
expandstringOptional`format: "string"`
A comma-separated list of properties that can reveal additional information in the response.
### Response
Metric group response
_idstring
The ID of this metric group
keystring
A unique key to reference the metric group
namestring
A human-friendly name for the metric group
kindenum
The type of the metric group
Allowed values:funnelstandardguardrail
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
tagslist of strings
Tags for the metric group
_creationDatelong
Timestamp of when the metric group was created
_lastModifiedlong
Timestamp of when the metric group was last modified
maintainerobject
The maintainer of this metric
Show 2 properties
metricslist of objects
An ordered list of the metrics in this metric group
Show 10 properties
_versioninteger
The version of this metric group
descriptionstring or null
Description of the metric group
_accessobject or null
Details on the allowed and denied actions for this metric group
Show 2 properties
experimentslist of objects or null
Experiments that use this metric group. Only included if specified in the `expand` query parameter in a `getMetricGroup` request.
Show 7 properties
experimentCountinteger or null
The number of experiments using this metric group
activeExperimentCountinteger or null
The number of active experiments using this metric group
activeGuardedRolloutCountinteger or null
The number of active guarded rollouts using this metric group
### Errors
400
Bad Request Error
401
Unauthorized Error
403
Forbidden Error
404
Not Found Error
405
Method Not Allowed Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Get information for a single metric group from the specific project.
### Expanding the metric group response
LaunchDarkly supports two fields for expanding the “Get metric group” response. By default, these fields are **not** included in the response.
To expand the response, append the `expand` query parameter and add a comma-separated list with either or both of the following fields:
 * `experiments` includes all experiments from the specific project that use the metric group
 * `experimentCount` includes the number of experiments from the specific project that use the metric group
For example, `expand=experiments` includes the `experiments` field in the response.