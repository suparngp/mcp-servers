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
/api/v2/engineering-insights/insights/groups
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/engineering-insights/insights/groups"
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
[](/docs/api/insights-scores-beta/get-insight-groups?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "totalCount": 15,
3
| "items": [
4
| {
5
| "key": "default-production-all-apps",
6
| "name": "Production - All Apps",
7
| "projectKey": "default",
8
| "environmentKey": "production",
9
| "createdAt": 1,
10
| "environment": {
11
| "_links": {
12
| "self": {
13
| "href": "/api/v2/projects/my-project/environments/my-environment",
14
| "type": "application/json"
15
| }
16
| },
17
| "_id": "57be1db38b75bf0772d11384",
18
| "key": "environment-key-123abc",
19
| "name": "My Environment",
20
| "apiKey": "sdk-xxx",
21
| "mobileKey": "mob-xxx",
22
| "color": "F5A623",
23
| "defaultTtl": 5,
24
| "secureMode": true,
25
| "defaultTrackEvents": false,
26
| "requireComments": true,
27
| "confirmChanges": true,
28
| "tags": [
29
| "ops"
30
| ],
31
| "critical": true,
32
| "_access": {
33
| "denied": [
34
| {
35
| "action": "string",
36
| "reason": {
37
| "effect": "allow",
38
| "resources": [
39
| "proj/*:env/*;qa_*:/flag/*"
40
| ],
41
| "notResources": [
42
| "string"
43
| ],
44
| "actions": [
45
| "*"
46
| ],
47
| "notActions": [
48
| "string"
49
| ],
50
| "role_name": "string"
51
| }
52
| }
53
| ],
54
| "allowed": [
55
| {
56
| "action": "string",
57
| "reason": {
58
| "effect": "allow",
59
| "resources": [
60
| "proj/*:env/*;qa_*:/flag/*"
61
| ],
62
| "notResources": [
63
| "string"
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
| "string"
70
| ],
71
| "role_name": "string"
72
| }
73
| }
74
| ]
75
| },
76
| "approvalSettings": {
77
| "required": true,
78
| "bypassApprovalsForPendingChanges": false,
79
| "minNumApprovals": 1,
80
| "canReviewOwnRequest": false,
81
| "canApplyDeclinedChanges": true,
82
| "serviceKind": "launchdarkly",
83
| "serviceConfig": {},
84
| "requiredApprovalTags": [
85
| "require-approval"
86
| ],
87
| "autoApplyApprovedChanges": true,
88
| "serviceKindConfigurationId": "1ef45a85-218f-4428-a8b2-a97e5f56c258",
89
| "resourceKind": "string"
90
| },
91
| "resourceApprovalSettings": {}
92
| },
93
| "scores": {
94
| "overall": {
95
| "score": 100,
96
| "indicator": "string",
97
| "indicatorRange": {
98
| "min": 0,
99
| "max": 100
100
| },
101
| "aggregateOf": [
102
| "deploymentFrequency",
103
| "leadTime"
104
| ],
105
| "diffVsLastPeriod": 1
106
| },
107
| "deploymentFrequency": {
108
| "score": 100,
109
| "indicator": "string",
110
| "indicatorRange": {
111
| "min": 0,
112
| "max": 100
113
| },
114
| "aggregateOf": [
115
| "deploymentFrequency",
116
| "leadTime"
117
| ],
118
| "diffVsLastPeriod": 1
119
| },
120
| "deploymentFailureRate": {
121
| "score": 100,
122
| "indicator": "string",
123
| "indicatorRange": {
124
| "min": 0,
125
| "max": 100
126
| },
127
| "aggregateOf": [
128
| "deploymentFrequency",
129
| "leadTime"
130
| ],
131
| "diffVsLastPeriod": 1
132
| },
133
| "leadTime": {
134
| "score": 100,
135
| "indicator": "string",
136
| "indicatorRange": {
137
| "min": 0,
138
| "max": 100
139
| },
140
| "aggregateOf": [
141
| "deploymentFrequency",
142
| "leadTime"
143
| ],
144
| "diffVsLastPeriod": 1
145
| },
146
| "impactSize": {
147
| "score": 100,
148
| "indicator": "string",
149
| "indicatorRange": {
150
| "min": 0,
151
| "max": 100
152
| },
153
| "aggregateOf": [
154
| "deploymentFrequency",
155
| "leadTime"
156
| ],
157
| "diffVsLastPeriod": 1
158
| },
159
| "experimentationCoverage": {
160
| "score": 100,
161
| "indicator": "string",
162
| "indicatorRange": {
163
| "min": 0,
164
| "max": 100
165
| },
166
| "aggregateOf": [
167
| "deploymentFrequency",
168
| "leadTime"
169
| ],
170
| "diffVsLastPeriod": 1
171
| },
172
| "flagHealth": {
173
| "score": 100,
174
| "indicator": "string",
175
| "indicatorRange": {
176
| "min": 0,
177
| "max": 100
178
| },
179
| "aggregateOf": [
180
| "deploymentFrequency",
181
| "leadTime"
182
| ],
183
| "diffVsLastPeriod": 1
184
| },
185
| "velocity": {
186
| "score": 100,
187
| "indicator": "string",
188
| "indicatorRange": {
189
| "min": 0,
190
| "max": 100
191
| },
192
| "aggregateOf": [
193
| "deploymentFrequency",
194
| "leadTime"
195
| ],
196
| "diffVsLastPeriod": 1
197
| },
198
| "risk": {
199
| "score": 100,
200
| "indicator": "string",
201
| "indicatorRange": {
202
| "min": 0,
203
| "max": 100
204
| },
205
| "aggregateOf": [
206
| "deploymentFrequency",
207
| "leadTime"
208
| ],
209
| "diffVsLastPeriod": 1
210
| },
211
| "efficiency": {
212
| "score": 100,
213
| "indicator": "string",
214
| "indicatorRange": {
215
| "min": 0,
216
| "max": 100
217
| },
218
| "aggregateOf": [
219
| "deploymentFrequency",
220
| "leadTime"
221
| ],
222
| "diffVsLastPeriod": 1
223
| },
224
| "creationRatio": {
225
| "score": 100,
226
| "indicator": "string",
227
| "indicatorRange": {
228
| "min": 0,
229
| "max": 100
230
| },
231
| "aggregateOf": [
232
| "deploymentFrequency",
233
| "leadTime"
234
| ],
235
| "diffVsLastPeriod": 1
236
| }
237
| },
238
| "scoreMetadata": {
239
| "period": {
240
| "startTime": 1,
241
| "endTime": 1
242
| },
243
| "lastPeriod": {
244
| "startTime": 1,
245
| "endTime": 1
246
| }
247
| },
248
| "applicationKeys": [
249
| "billing-service",
250
| "inventory-service"
251
| ]
252
| }
253
| ],
254
| "_links": {},
255
| "metadata": {
256
| "countByIndicator": {
257
| "excellent": 1,
258
| "good": 1,
259
| "fair": 1,
260
| "needsAttention": 1,
261
| "notCalculated": 1,
262
| "unknown": 1,
263
| "total": 6
264
| }
265
| },
266
| "scoreMetadata": {
267
| "period": {
268
| "startTime": 1,
269
| "endTime": 1
270
| },
271
| "lastPeriod": {
272
| "startTime": 1,
273
| "endTime": 1
274
| }
275
| }
276
| }
```
List groups for which you are collecting insights ### Expanding the insight groups collection response LaunchDarkly supports expanding the insight groups collection response to include additional fields. To expand the response, append the `expand` query parameter and include the following: * `scores` includes details on all of the scores used in the engineering insights metrics views for each group * `environment` includes details on each environment associated with each group * `metadata` includes counts of the number of insight groups with particular indicators, such as "excellent," "good," "fair," and so on. For example, use `?expand=scores` to include the `scores` field in the response. By default, this field is **not** included in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Query Parameters
limitlongOptional
The number of insight groups to return. Default is 20. Must be between 1 and 20 inclusive.
offsetlongOptional
Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.
sortstringOptional`format: "string"`
Sort flag list by field. Prefix field with `-` to sort in descending order. Allowed fields: name
querystringOptional`format: "string"`
Filter list of insights groups by name.
expandstringOptional`format: "string"`
Options: `scores`, `environment`, `metadata`
### Response
Insight groups collection response
totalCountinteger
The total number of insight groups
itemslist of objects
A list of insight groups
Show 9 properties
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
metadataobject or null
Metadata about the insight groups
Show 1 properties
scoreMetadataobject or null
Metadata about the insight scores, when expanded
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
List groups for which you are collecting insights
### Expanding the insight groups collection response
LaunchDarkly supports expanding the insight groups collection response to include additional fields.
To expand the response, append the `expand` query parameter and include the following:
 * `scores` includes details on all of the scores used in the engineering insights metrics views for each group
 * `environment` includes details on each environment associated with each group
 * `metadata` includes counts of the number of insight groups with particular indicators, such as “excellent,” “good,” “fair,” and so on.
For example, use `?expand=scores` to include the `scores` field in the response. By default, this field is **not** included in the response.