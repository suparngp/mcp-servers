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
/api/v2/projects/:projectKey/environments/:environmentKey/experiments/:experimentKey/iterations
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/environments/environmentKey/experiments/experimentKey/iterations"
4
| 
5
| payload = {
6
| "hypothesis": "Example hypothesis, the new button placement will increase conversion",
7
| "metrics": [{ "key": "metric-key-123abc" }],
8
| "treatments": [
9
| {
10
| "name": "Treatment 1",
11
| "baseline": True,
12
| "allocationPercent": "10",
13
| "parameters": [
14
| {
15
| "flagKey": "example-flag-for-experiment",
16
| "variationId": "e432f62b-55f6-49dd-a02f-eb24acf39d05"
17
| }
18
| ]
19
| }
20
| ]
21
| }
22
| headers = {
23
| "Authorization": "<apiKey>",
24
| "Content-Type": "application/json"
25
| }
26
| 
27
| response = requests.post(url, json=payload, headers=headers)
28
| 
29
| print(response.json())
```
[](/docs/api/experiments/create-iteration?explorer=true)
200Successful
```
1
| {
---|--- 
2
| "hypothesis": "The new button placement will increase conversion",
3
| "status": "running",
4
| "createdAt": 1,
5
| "_id": "12ab3c45de678910fgh12345",
6
| "startedAt": 1,
7
| "endedAt": 1,
8
| "winningTreatmentId": "122c9f3e-da26-4321-ba68-e0fc02eced58",
9
| "winningReason": "We ran this iteration for two weeks and the winning variation was clear",
10
| "canReshuffleTraffic": true,
11
| "flags": {},
12
| "reallocationFrequencyMillis": 3600000,
13
| "version": 0,
14
| "primaryMetric": {
15
| "key": "metric-key-123abc",
16
| "_versionId": "string",
17
| "name": "My metric",
18
| "kind": "custom",
19
| "_links": {
20
| "self": {
21
| "href": "/api/v2/metrics/my-project/my-metric",
22
| "type": "application/json"
23
| }
24
| },
25
| "isGroup": true,
26
| "isNumeric": true,
27
| "eventKey": "event-key-123abc",
28
| "metrics": [
29
| {
30
| "key": "metric-key-123abc",
31
| "name": "Example metric",
32
| "kind": "custom",
33
| "_links": {
34
| "self": {
35
| "href": "/api/v2/metrics/my-project/my-metric",
36
| "type": "application/json"
37
| }
38
| },
39
| "_versionId": "version-id-123abc",
40
| "isNumeric": true,
41
| "unitAggregationType": "sum",
42
| "eventKey": "event-key-123abc",
43
| "nameInGroup": "Step 1",
44
| "randomizationUnits": [
45
| "user"
46
| ]
47
| }
48
| ]
49
| },
50
| "primarySingleMetric": {
51
| "key": "metric-key-123abc",
52
| "name": "Example metric",
53
| "kind": "custom",
54
| "_links": {
55
| "self": {
56
| "href": "/api/v2/metrics/my-project/my-metric",
57
| "type": "application/json"
58
| }
59
| },
60
| "_versionId": "version-id-123abc",
61
| "isNumeric": true,
62
| "unitAggregationType": "sum",
63
| "eventKey": "event-key-123abc"
64
| },
65
| "primaryFunnel": {
66
| "key": "metric-group-key-123abc",
67
| "name": "My metric group",
68
| "kind": "funnel",
69
| "_links": {
70
| "parent": {
71
| "href": "/api/v2/projects/my-project",
72
| "type": "application/json"
73
| },
74
| "self": {
75
| "href": "/api/v2/projects/my-project/metric-groups/my-metric-group",
76
| "type": "application/json"
77
| }
78
| },
79
| "metrics": [
80
| {
81
| "key": "metric-key-123abc",
82
| "name": "Example metric",
83
| "kind": "custom",
84
| "_links": {
85
| "self": {
86
| "href": "/api/v2/metrics/my-project/my-metric",
87
| "type": "application/json"
88
| }
89
| },
90
| "_versionId": "version-id-123abc",
91
| "isNumeric": true,
92
| "unitAggregationType": "sum",
93
| "eventKey": "event-key-123abc",
94
| "nameInGroup": "Step 1",
95
| "randomizationUnits": [
96
| "user"
97
| ]
98
| }
99
| ]
100
| },
101
| "randomizationUnit": "user",
102
| "attributes": [
103
| "string"
104
| ],
105
| "treatments": [
106
| {
107
| "name": "Treatment 1",
108
| "allocationPercent": "10",
109
| "_id": "122c9f3e-da26-4321-ba68-e0fc02eced58",
110
| "baseline": true,
111
| "parameters": [
112
| {
113
| "variationId": "string",
114
| "flagKey": "string"
115
| }
116
| ]
117
| }
118
| ],
119
| "metrics": [
120
| {
121
| "key": "metric-key-123abc",
122
| "_versionId": "string",
123
| "name": "My metric",
124
| "kind": "custom",
125
| "_links": {
126
| "self": {
127
| "href": "/api/v2/metrics/my-project/my-metric",
128
| "type": "application/json"
129
| }
130
| },
131
| "isGroup": true,
132
| "isNumeric": true,
133
| "eventKey": "event-key-123abc",
134
| "metrics": [
135
| {
136
| "key": "metric-key-123abc",
137
| "name": "Example metric",
138
| "kind": "custom",
139
| "_links": {
140
| "self": {
141
| "href": "/api/v2/metrics/my-project/my-metric",
142
| "type": "application/json"
143
| }
144
| },
145
| "_versionId": "version-id-123abc",
146
| "isNumeric": true,
147
| "unitAggregationType": "sum",
148
| "eventKey": "event-key-123abc",
149
| "nameInGroup": "Step 1",
150
| "randomizationUnits": [
151
| "user"
152
| ]
153
| }
154
| ]
155
| }
156
| ],
157
| "layerSnapshot": {
158
| "key": "checkout-flow",
159
| "name": "Checkout Flow",
160
| "reservationPercent": 10,
161
| "otherReservationPercent": 70
162
| },
163
| "covarianceInfo": {
164
| "id": "74a49a2b-4834-4246-917e-5d85231d8c2a",
165
| "fileName": "covariance.csv",
166
| "createdAt": 1
167
| },
168
| "secondaryMetrics": [
169
| {
170
| "key": "metric-key-123abc",
171
| "name": "Example metric",
172
| "kind": "custom",
173
| "_links": {
174
| "self": {
175
| "href": "/api/v2/metrics/my-project/my-metric",
176
| "type": "application/json"
177
| }
178
| },
179
| "_versionId": "version-id-123abc",
180
| "isNumeric": true,
181
| "unitAggregationType": "sum",
182
| "eventKey": "event-key-123abc"
183
| }
184
| ]
185
| }
```
Create an experiment iteration. Experiment iterations let you record experiments in individual blocks of time. Initially, iterations are created with a status of `not_started` and appear in the `draftIteration` field of an experiment. To start or stop an iteration, [update the experiment](https://launchdarkly.com/docs/api/experiments/patch-experiment) with the `startIteration` or `stopIteration` instruction. To learn more, read [Start experiment iterations](https://launchdarkly.com/docs/home/experimentation/feature#start-experiment-iterations). 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
experimentKeystringRequired`format: "string"`
The experiment key
### Request
This endpoint expects an object.
hypothesisstringRequired
The expected outcome of this experiment
metricslist of objectsRequired
Details on the metrics for this experiment
Show 3 properties
treatmentslist of objectsRequired
Details on the variations you are testing in the experiment. You establish these variations in feature flags, and then reuse them in experiments.
Show 4 properties
flagsmap from strings to objectsRequired
Details on the feature flag and targeting rules for this iteration
Show 3 properties
canReshuffleTrafficbooleanOptional
Whether to allow the experiment to reassign traffic to different variations when you increase or decrease the traffic in your experiment audience (true) or keep all traffic assigned to its initial variation (false). Defaults to true.
primarySingleMetricKeystringOptional
The key of the primary metric for this experiment. Either `primarySingleMetricKey` or `primaryFunnelKey` must be present.
primaryFunnelKeystringOptional
The key of the primary funnel group for this experiment. Either `primarySingleMetricKey` or `primaryFunnelKey` must be present.
randomizationUnitstringOptional
The unit of randomization for this iteration. Defaults to user.
covarianceIdstringOptional
The ID of the covariance CSV
attributeslist of stringsOptional
The attributes that this iteration's results can be sliced by
### Response
Iteration response
hypothesisstring
The expected outcome of this experiment
statusstring
The status of the iteration: `not_started`, `running`, `stopped`
createdAtlong
Timestamp of when the iteration was created
_idstring or null
The iteration ID
startedAtlong or null
Timestamp of when the iteration started
endedAtlong or null
Timestamp of when the iteration ended
winningTreatmentIdstring or null
The ID of the treatment chosen when the experiment stopped
winningReasonstring or null
The reason you stopped the experiment
canReshuffleTrafficboolean or null
Whether the experiment may reassign traffic to different variations when the experiment audience changes (true) or must keep all traffic assigned to its initial variation (false).
flagsmap from strings to objects or null
Details on the flag used in this experiment
Show 6 properties
reallocationFrequencyMillisinteger or null
The cadence (in milliseconds) to update the allocation. Only present for multi-armed bandits.
versioninteger or null
The current version that the iteration is on
primaryMetricobject or null
Deprecated, use `primarySingleMetric` and `primaryFunnel` instead. Details on the primary metric for this experiment.
Show 9 properties
primarySingleMetricobject or null
Details on the primary metric for this experiment
Show 8 properties
primaryFunnelobject or null
Details on the primary funnel group for this experiment
Show 5 properties
randomizationUnitstring or null
The unit of randomization for this iteration
attributeslist of strings or null
The available attribute filters for this iteration
treatmentslist of objects or null
Details on the variations you are testing in the experiment
Show 5 properties
metricslist of objects or null
Details on the metrics for this experiment
Show 9 properties
layerSnapshotobject or null
Snapshot of the layer state on iteration stop, if part of a layer. Otherwise omitted.
Show 4 properties
covarianceInfoobject or null
Details of the covariance file for stratified sampling
Show 3 properties
secondaryMetricslist of objects or nullDeprecated
Deprecated, use `metrics` instead. Details on the secondary metrics for this experiment.
Show 8 properties
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
Create an experiment iteration.
Experiment iterations let you record experiments in individual blocks of time. Initially, iterations are created with a status of `not_started` and appear in the `draftIteration` field of an experiment. To start or stop an iteration, [update the experiment](https://launchdarkly.com/docs/api/experiments/patch-experiment) with the `startIteration` or `stopIteration` instruction.
To learn more, read [Start experiment iterations](https://launchdarkly.com/docs/home/experimentation/feature#start-experiment-iterations).