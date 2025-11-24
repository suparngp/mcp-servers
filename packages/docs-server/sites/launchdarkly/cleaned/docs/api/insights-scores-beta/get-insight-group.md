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
/api/v2/engineering-insights/insights/groups/:insightGroupKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/engineering-insights/insights/groups/insightGroupKey"
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
[](/docs/api/insights-scores-beta/get-insight-group?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "key": "default-production-all-apps",
3
| "name": "Production - All Apps",
4
| "projectKey": "default",
5
| "environmentKey": "production",
6
| "createdAt": 1,
7
| "environment": {
8
| "_links": {
9
| "self": {
10
| "href": "/api/v2/projects/my-project/environments/my-environment",
11
| "type": "application/json"
12
| }
13
| },
14
| "_id": "57be1db38b75bf0772d11384",
15
| "key": "environment-key-123abc",
16
| "name": "My Environment",
17
| "apiKey": "sdk-xxx",
18
| "mobileKey": "mob-xxx",
19
| "color": "F5A623",
20
| "defaultTtl": 5,
21
| "secureMode": true,
22
| "defaultTrackEvents": false,
23
| "requireComments": true,
24
| "confirmChanges": true,
25
| "tags": [
26
| "ops"
27
| ],
28
| "critical": true,
29
| "_access": {
30
| "denied": [
31
| {
32
| "action": "string",
33
| "reason": {
34
| "effect": "allow",
35
| "resources": [
36
| "proj/*:env/*;qa_*:/flag/*"
37
| ],
38
| "notResources": [
39
| "string"
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
| "string"
46
| ],
47
| "role_name": "string"
48
| }
49
| }
50
| ],
51
| "allowed": [
52
| {
53
| "action": "string",
54
| "reason": {
55
| "effect": "allow",
56
| "resources": [
57
| "proj/*:env/*;qa_*:/flag/*"
58
| ],
59
| "notResources": [
60
| "string"
61
| ],
62
| "actions": [
63
| "*"
64
| ],
65
| "notActions": [
66
| "string"
67
| ],
68
| "role_name": "string"
69
| }
70
| }
71
| ]
72
| },
73
| "approvalSettings": {
74
| "required": true,
75
| "bypassApprovalsForPendingChanges": false,
76
| "minNumApprovals": 1,
77
| "canReviewOwnRequest": false,
78
| "canApplyDeclinedChanges": true,
79
| "serviceKind": "launchdarkly",
80
| "serviceConfig": {},
81
| "requiredApprovalTags": [
82
| "require-approval"
83
| ],
84
| "autoApplyApprovedChanges": true,
85
| "serviceKindConfigurationId": "1ef45a85-218f-4428-a8b2-a97e5f56c258",
86
| "resourceKind": "string"
87
| },
88
| "resourceApprovalSettings": {}
89
| },
90
| "scores": {
91
| "overall": {
92
| "score": 100,
93
| "indicator": "string",
94
| "indicatorRange": {
95
| "min": 0,
96
| "max": 100
97
| },
98
| "aggregateOf": [
99
| "deploymentFrequency",
100
| "leadTime"
101
| ],
102
| "diffVsLastPeriod": 1
103
| },
104
| "deploymentFrequency": {
105
| "score": 100,
106
| "indicator": "string",
107
| "indicatorRange": {
108
| "min": 0,
109
| "max": 100
110
| },
111
| "aggregateOf": [
112
| "deploymentFrequency",
113
| "leadTime"
114
| ],
115
| "diffVsLastPeriod": 1
116
| },
117
| "deploymentFailureRate": {
118
| "score": 100,
119
| "indicator": "string",
120
| "indicatorRange": {
121
| "min": 0,
122
| "max": 100
123
| },
124
| "aggregateOf": [
125
| "deploymentFrequency",
126
| "leadTime"
127
| ],
128
| "diffVsLastPeriod": 1
129
| },
130
| "leadTime": {
131
| "score": 100,
132
| "indicator": "string",
133
| "indicatorRange": {
134
| "min": 0,
135
| "max": 100
136
| },
137
| "aggregateOf": [
138
| "deploymentFrequency",
139
| "leadTime"
140
| ],
141
| "diffVsLastPeriod": 1
142
| },
143
| "impactSize": {
144
| "score": 100,
145
| "indicator": "string",
146
| "indicatorRange": {
147
| "min": 0,
148
| "max": 100
149
| },
150
| "aggregateOf": [
151
| "deploymentFrequency",
152
| "leadTime"
153
| ],
154
| "diffVsLastPeriod": 1
155
| },
156
| "experimentationCoverage": {
157
| "score": 100,
158
| "indicator": "string",
159
| "indicatorRange": {
160
| "min": 0,
161
| "max": 100
162
| },
163
| "aggregateOf": [
164
| "deploymentFrequency",
165
| "leadTime"
166
| ],
167
| "diffVsLastPeriod": 1
168
| },
169
| "flagHealth": {
170
| "score": 100,
171
| "indicator": "string",
172
| "indicatorRange": {
173
| "min": 0,
174
| "max": 100
175
| },
176
| "aggregateOf": [
177
| "deploymentFrequency",
178
| "leadTime"
179
| ],
180
| "diffVsLastPeriod": 1
181
| },
182
| "velocity": {
183
| "score": 100,
184
| "indicator": "string",
185
| "indicatorRange": {
186
| "min": 0,
187
| "max": 100
188
| },
189
| "aggregateOf": [
190
| "deploymentFrequency",
191
| "leadTime"
192
| ],
193
| "diffVsLastPeriod": 1
194
| },
195
| "risk": {
196
| "score": 100,
197
| "indicator": "string",
198
| "indicatorRange": {
199
| "min": 0,
200
| "max": 100
201
| },
202
| "aggregateOf": [
203
| "deploymentFrequency",
204
| "leadTime"
205
| ],
206
| "diffVsLastPeriod": 1
207
| },
208
| "efficiency": {
209
| "score": 100,
210
| "indicator": "string",
211
| "indicatorRange": {
212
| "min": 0,
213
| "max": 100
214
| },
215
| "aggregateOf": [
216
| "deploymentFrequency",
217
| "leadTime"
218
| ],
219
| "diffVsLastPeriod": 1
220
| },
221
| "creationRatio": {
222
| "score": 100,
223
| "indicator": "string",
224
| "indicatorRange": {
225
| "min": 0,
226
| "max": 100
227
| },
228
| "aggregateOf": [
229
| "deploymentFrequency",
230
| "leadTime"
231
| ],
232
| "diffVsLastPeriod": 1
233
| }
234
| },
235
| "scoreMetadata": {
236
| "period": {
237
| "startTime": 1,
238
| "endTime": 1
239
| },
240
| "lastPeriod": {
241
| "startTime": 1,
242
| "endTime": 1
243
| }
244
| },
245
| "applicationKeys": [
246
| "billing-service",
247
| "inventory-service"
248
| ]
249
| }
```
Get insight group ### Expanding the insight group response LaunchDarkly supports expanding the insight group response to include additional fields. To expand the response, append the `expand` query parameter and include the following: * `scores` includes details on all of the scores used in the engineering insights metrics views for this group * `environment` includes details on each environment associated with this group For example, use `?expand=scores` to include the `scores` field in the response. By default, this field is **not** included in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
insightGroupKeystringRequired`format: "string"`
The insight group key
### Query Parameters
expandstringOptional`format: "string"`
Options: `scores`, `environment`
### Response
Insight group response
keystring
The insight group key
namestring
The insight group name
projectKeystring
The project key
environmentKeystring
The environment key
createdAtlong
The time the insight group was created
environmentobject or null
Expanded details about the environment
Show 17 properties
scoresobject or null
The scores for the insight group
Show 11 properties
scoreMetadataobject or null
Metadata about the insight scores, when expanded
Show 2 properties
applicationKeyslist of strings or null
The application keys
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
Get insight group
### Expanding the insight group response
LaunchDarkly supports expanding the insight group response to include additional fields.
To expand the response, append the `expand` query parameter and include the following:
 * `scores` includes details on all of the scores used in the engineering insights metrics views for this group
 * `environment` includes details on each environment associated with this group
For example, use `?expand=scores` to include the `scores` field in the response. By default, this field is **not** included in the response.