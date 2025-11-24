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
PATCH
/api/v2/metrics/:projectKey/:metricKey
cURL
```
1
| curl -X PATCH https://app.launchdarkly.com/api/v2/metrics/projectKey/metricKey \
---|--- 
2
| -H "Authorization: <apiKey>" \
3
| -H "Content-Type: application/json" \
4
| -d '[
5
| {
6
| "op": "replace",
7
| "path": "/name",
8
| "value": null
9
| }
10
| ]'
```
[](/docs/api/metrics/patch-metric?explorer=true)
200Updated
```
1
| {
---|--- 
2
| "_id": "5902deadbeef667524a01290",
3
| "_versionId": "version-id-123abc",
4
| "key": "metric-key-123abc",
5
| "name": "My metric",
6
| "kind": "custom",
7
| "_links": {
8
| "parent": {
9
| "href": "/api/v2/metrics/my-project",
10
| "type": "application/json"
11
| },
12
| "self": {
13
| "href": "/api/v2/metrics/my-project/my-metric",
14
| "type": "application/json"
15
| }
16
| },
17
| "tags": [],
18
| "_creationDate": 1,
19
| "dataSource": {
20
| "key": "string",
21
| "environmentKey": "string",
22
| "_name": "string",
23
| "_integrationKey": "string"
24
| },
25
| "experimentCount": 0,
26
| "metricGroupCount": 0,
27
| "activeExperimentCount": 2,
28
| "activeGuardedRolloutCount": 1,
29
| "_version": 1,
30
| "_attachedFlagCount": 0,
31
| "_site": {
32
| "href": "string",
33
| "type": "string"
34
| },
35
| "_access": {
36
| "denied": [
37
| {
38
| "action": "string",
39
| "reason": {
40
| "effect": "allow",
41
| "resources": [
42
| "proj/*:env/*;qa_*:/flag/*"
43
| ],
44
| "notResources": [
45
| "string"
46
| ],
47
| "actions": [
48
| "*"
49
| ],
50
| "notActions": [
51
| "string"
52
| ],
53
| "role_name": "string"
54
| }
55
| }
56
| ],
57
| "allowed": [
58
| {
59
| "action": "string",
60
| "reason": {
61
| "effect": "allow",
62
| "resources": [
63
| "proj/*:env/*;qa_*:/flag/*"
64
| ],
65
| "notResources": [
66
| "string"
67
| ],
68
| "actions": [
69
| "*"
70
| ],
71
| "notActions": [
72
| "string"
73
| ],
74
| "role_name": "string"
75
| }
76
| }
77
| ]
78
| },
79
| "lastModified": {
80
| "date": "2021-08-05T19:46:31.148082Z"
81
| },
82
| "maintainerId": "569fdeadbeef1644facecafe",
83
| "_maintainer": {
84
| "_links": {
85
| "self": {
86
| "href": "/api/v2/members/569f183514f4432160000007",
87
| "type": "application/json"
88
| }
89
| },
90
| "_id": "569f183514f4432160000007",
91
| "role": "admin",
92
| "email": "ariel@acme.com",
93
| "firstName": "Ariel",
94
| "lastName": "Flores"
95
| },
96
| "description": "string",
97
| "category": "Error monitoring",
98
| "isNumeric": true,
99
| "successCriteria": "HigherThanBaseline",
100
| "unit": "string",
101
| "eventKey": "Order placed",
102
| "randomizationUnits": [
103
| "user"
104
| ],
105
| "filters": {
106
| "type": "contextAttribute",
107
| "op": "string",
108
| "values": [
109
| "JP"
110
| ],
111
| "negate": false,
112
| "attribute": "country",
113
| "contextKind": "user"
114
| },
115
| "unitAggregationType": "average",
116
| "analysisType": "mean",
117
| "percentileValue": 95,
118
| "eventDefault": {
119
| "disabled": true,
120
| "value": 0
121
| },
122
| "archived": true,
123
| "archivedAt": 1,
124
| "selector": "string",
125
| "urls": [
126
| {}
127
| ],
128
| "experiments": [
129
| {
130
| "key": "experiment-key-123abc",
131
| "name": "Example experiment",
132
| "environmentId": "1234a56b7c89d012345e678f",
133
| "environmentKey": "production",
134
| "creationDate": 1,
135
| "_links": {
136
| "parent": {
137
| "href": "/api/v2/projects/my-project/environments/my-environment",
138
| "type": "application/json"
139
| },
140
| "self": {
141
| "href": "/api/v2/projects/my-project/environments/my-environment/experiments/example-experiment",
142
| "type": "application/json"
143
| }
144
| },
145
| "archivedDate": 1
146
| }
147
| ],
148
| "metricGroups": [
149
| {
150
| "key": "metric-group-key-123abc",
151
| "name": "My metric group",
152
| "kind": "funnel",
153
| "_links": {
154
| "parent": {
155
| "href": "/api/v2/projects/my-project",
156
| "type": "application/json"
157
| },
158
| "self": {
159
| "href": "/api/v2/projects/my-project/metric-groups/my-metric-group",
160
| "type": "application/json"
161
| }
162
| }
163
| }
164
| ],
165
| "lastUsedInExperiment": {
166
| "key": "experiment-key-123abc",
167
| "name": "Example experiment",
168
| "environmentId": "1234a56b7c89d012345e678f",
169
| "environmentKey": "production",
170
| "creationDate": 1,
171
| "_links": {
172
| "parent": {
173
| "href": "/api/v2/projects/my-project/environments/my-environment",
174
| "type": "application/json"
175
| },
176
| "self": {
177
| "href": "/api/v2/projects/my-project/environments/my-environment/experiments/example-experiment",
178
| "type": "application/json"
179
| }
180
| },
181
| "archivedDate": 1
182
| },
183
| "lastUsedInGuardedRollout": {
184
| "_id": "885ccadf-181b-4a9a-8414-7ad6f7ba2db0",
185
| "flagKey": "my-flag",
186
| "flagName": "My Flag",
187
| "environmentKey": "production",
188
| "environmentName": "Production",
189
| "status": "monitoring",
190
| "creationDate": 1,
191
| "_links": {
192
| "self": {
193
| "href": "/api/v2/projects/my-project/flags/my-flag/environments/production/measured-rollouts/885ccadf-181b-4a9a-8414-7ad6f7ba2db0",
194
| "type": "application/json"
195
| }
196
| }
197
| },
198
| "isActive": true,
199
| "_attachedFeatures": [
200
| {
201
| "name": "Example flag",
202
| "key": "flag-key-123abc",
203
| "_links": {},
204
| "_site": {
205
| "href": "string",
206
| "type": "string"
207
| }
208
| }
209
| ]
210
| }
```
Patch a metric by key. Updating a metric uses a [JSON patch](https://datatracker.ietf.org/doc/html/rfc6902) representation of the desired changes. To learn more, read [Updates](https://launchdarkly.com/docs/api#updates).
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
metricKeystringRequired`format: "string"`
The metric key
### Request
This endpoint expects a list of objects.
opstringRequired
The type of operation to perform
pathstringRequired
A JSON Pointer string specifying the part of the document to operate on
valueanyOptional
A JSON value used in "add", "replace", and "test" operations
### Response
Metric response
_idstring
The ID of this metric
_versionIdstring
The version ID of the metric
keystring
A unique key to reference the metric
namestring
A human-friendly name for the metric
kindenum
The kind of event the metric tracks
Allowed values:pageviewclickcustom
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
tagslist of strings
Tags for the metric
_creationDatelong
Timestamp of when the metric was created
dataSourceobject
Show 4 properties
experimentCountinteger or null
The number of experiments using this metric
metricGroupCountinteger or null
The number of metric groups using this metric
activeExperimentCountinteger or null
The number of active experiments using this metric
activeGuardedRolloutCountinteger or null
The number of active guarded rollouts using this metric
_versioninteger or null
Version of the metric
_attachedFlagCountinteger or null
The number of feature flags currently attached to this metric
_siteobject or null
Details on how to access the metric in the LaunchDarkly UI
Show 2 properties
_accessobject or null
Details on the allowed and denied actions for this metric
Show 2 properties
lastModifiedobject or null
Show 1 properties
maintainerIdstring or null
The ID of the member who maintains this metric
_maintainerobject or null
Details on the member who maintains this metric
Show 6 properties
descriptionstring or null
Description of the metric
categorystring or null
The category of the metric
isNumericboolean or null
For custom metrics, whether to track numeric changes in value against a baseline (`true`) or to track a conversion when an end user takes an action (`false`).
successCriteriaenum or null
For custom metrics, the success criteria
Allowed values:HigherThanBaselineLowerThanBaseline
unitstring or null
For numeric custom metrics, the unit of measure
eventKeystring or null
For custom metrics, the event key to use in your code
randomizationUnitslist of strings or null
An array of randomization units allowed for this metric
filtersobject or null
The filters narrowing down the audience based on context attributes or event properties.
Show 6 properties
unitAggregationTypeenum or null
The method by which multiple unit event values are aggregated
Allowed values:averagesum
analysisTypeenum or null
The method for analyzing metric events
Allowed values:meanpercentile
percentileValueinteger or null
The percentile for the analysis method. An integer denoting the target percentile between 0 and 100. Required when `analysisType` is `percentile`.
eventDefaultobject or null
Show 2 properties
archivedboolean or null
Whether the metric version is archived
archivedAtlong or null
Timestamp when the metric version was archived
selectorstring or null
For click metrics, the CSS selectors
urlslist of maps from strings to any or null
For click and pageview metrics, the target URLs
experimentslist of objects or null
Experiments that use this metric, including those using a metric group that contains this metric
Show 7 properties
metricGroupslist of objects or null
Metric groups that use this metric
Show 4 properties
lastUsedInExperimentobject or null
The most recent experiment that used this metric
Show 7 properties
lastUsedInGuardedRolloutobject or null
The most recent guarded rollout that used this metric
Show 8 properties
isActiveboolean or null
Whether the metric is active
_attachedFeatureslist of objects or null
Details on the flags attached to this metric
Show 4 properties
### Errors
400
Bad Request Error
401
Unauthorized Error
404
Not Found Error
409
Conflict Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Patch a metric by key. Updating a metric uses a [JSON patch](https://datatracker.ietf.org/doc/html/rfc6902) representation of the desired changes. To learn more, read [Updates](https://launchdarkly.com/docs/api#updates).