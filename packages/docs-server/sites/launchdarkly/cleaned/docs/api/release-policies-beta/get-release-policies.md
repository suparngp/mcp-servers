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
/api/v2/projects/:projectKey/release-policies
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/default/release-policies"
4
| 
5
| querystring = {"excludeDefault":"false"}
6
| 
7
| headers = {
8
| "LD-API-Version": "beta",
9
| "Authorization": "<apiKey>"
10
| }
11
| 
12
| response = requests.get(url, headers=headers, params=querystring)
13
| 
14
| print(response.json())
```
[](/docs/api/release-policies-beta/get-release-policies?explorer=true)
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
| "_id": "550e8400-e29b-41d4-a716-446655440000",
5
| "rank": 1,
6
| "releaseMethod": "guarded-release",
7
| "name": "Production Release",
8
| "key": "production-release",
9
| "_access": {
10
| "allowed": [
11
| {
12
| "action": "action",
13
| "reason": {
14
| "effect": "allow",
15
| "resources": [
16
| "proj/*:env/*;qa_*:/flag/*"
17
| ],
18
| "notResources": [
19
| "notResources",
20
| "notResources"
21
| ],
22
| "actions": [
23
| "*"
24
| ],
25
| "notActions": [
26
| "string",
27
| "string"
28
| ],
29
| "role_name": "role_name"
30
| }
31
| },
32
| {
33
| "action": "action",
34
| "reason": {
35
| "effect": "allow",
36
| "resources": [
37
| "proj/*:env/*;qa_*:/flag/*"
38
| ],
39
| "notResources": [
40
| "notResources",
41
| "notResources"
42
| ],
43
| "actions": [
44
| "*"
45
| ],
46
| "notActions": [
47
| "string",
48
| "string"
49
| ],
50
| "role_name": "role_name"
51
| }
52
| }
53
| ],
54
| "denied": [
55
| {
56
| "action": "action",
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
| "notResources",
64
| "notResources"
65
| ],
66
| "actions": [
67
| "*"
68
| ],
69
| "notActions": [
70
| "string",
71
| "string"
72
| ],
73
| "role_name": "role_name"
74
| }
75
| },
76
| {
77
| "action": "action",
78
| "reason": {
79
| "effect": "allow",
80
| "resources": [
81
| "proj/*:env/*;qa_*:/flag/*"
82
| ],
83
| "notResources": [
84
| "notResources",
85
| "notResources"
86
| ],
87
| "actions": [
88
| "*"
89
| ],
90
| "notActions": [
91
| "string",
92
| "string"
93
| ],
94
| "role_name": "role_name"
95
| }
96
| }
97
| ]
98
| },
99
| "scope": {
100
| "environmentKeys": [
101
| "production",
102
| "staging"
103
| ],
104
| "flagTagKeys": [
105
| "frontend",
106
| "backend"
107
| ],
108
| "viewKeys": [
109
| "feature-a",
110
| "team-a"
111
| ]
112
| },
113
| "guardedReleaseConfig": {
114
| "rollbackOnRegression": true,
115
| "minSampleSize": 100,
116
| "metricKeys": [
117
| "http-errors",
118
| "latency"
119
| ],
120
| "rolloutContextKindKey": "user",
121
| "metricRegressionThreshold": 0.05,
122
| "metricGroupKeys": [
123
| "frontend-metrics",
124
| "backend-metrics"
125
| ],
126
| "stages": [
127
| {
128
| "allocation": 25000,
129
| "durationMillis": 60000
130
| },
131
| {
132
| "allocation": 25000,
133
| "durationMillis": 60000
134
| }
135
| ]
136
| },
137
| "progressiveReleaseConfig": {
138
| "rolloutContextKindKey": "user",
139
| "stages": [
140
| {
141
| "allocation": 25000,
142
| "durationMillis": 60000
143
| },
144
| {
145
| "allocation": 25000,
146
| "durationMillis": 60000
147
| }
148
| ]
149
| }
150
| },
151
| {
152
| "_id": "550e8400-e29b-41d4-a716-446655440000",
153
| "rank": 1,
154
| "releaseMethod": "guarded-release",
155
| "name": "Production Release",
156
| "key": "production-release",
157
| "_access": {
158
| "allowed": [
159
| {
160
| "action": "action",
161
| "reason": {
162
| "effect": "allow",
163
| "resources": [
164
| "proj/*:env/*;qa_*:/flag/*"
165
| ],
166
| "notResources": [
167
| "notResources",
168
| "notResources"
169
| ],
170
| "actions": [
171
| "*"
172
| ],
173
| "notActions": [
174
| "string",
175
| "string"
176
| ],
177
| "role_name": "role_name"
178
| }
179
| },
180
| {
181
| "action": "action",
182
| "reason": {
183
| "effect": "allow",
184
| "resources": [
185
| "proj/*:env/*;qa_*:/flag/*"
186
| ],
187
| "notResources": [
188
| "notResources",
189
| "notResources"
190
| ],
191
| "actions": [
192
| "*"
193
| ],
194
| "notActions": [
195
| "string",
196
| "string"
197
| ],
198
| "role_name": "role_name"
199
| }
200
| }
201
| ],
202
| "denied": [
203
| {
204
| "action": "action",
205
| "reason": {
206
| "effect": "allow",
207
| "resources": [
208
| "proj/*:env/*;qa_*:/flag/*"
209
| ],
210
| "notResources": [
211
| "notResources",
212
| "notResources"
213
| ],
214
| "actions": [
215
| "*"
216
| ],
217
| "notActions": [
218
| "string",
219
| "string"
220
| ],
221
| "role_name": "role_name"
222
| }
223
| },
224
| {
225
| "action": "action",
226
| "reason": {
227
| "effect": "allow",
228
| "resources": [
229
| "proj/*:env/*;qa_*:/flag/*"
230
| ],
231
| "notResources": [
232
| "notResources",
233
| "notResources"
234
| ],
235
| "actions": [
236
| "*"
237
| ],
238
| "notActions": [
239
| "string",
240
| "string"
241
| ],
242
| "role_name": "role_name"
243
| }
244
| }
245
| ]
246
| },
247
| "scope": {
248
| "environmentKeys": [
249
| "production",
250
| "staging"
251
| ],
252
| "flagTagKeys": [
253
| "frontend",
254
| "backend"
255
| ],
256
| "viewKeys": [
257
| "feature-a",
258
| "team-a"
259
| ]
260
| },
261
| "guardedReleaseConfig": {
262
| "rollbackOnRegression": true,
263
| "minSampleSize": 100,
264
| "metricKeys": [
265
| "http-errors",
266
| "latency"
267
| ],
268
| "rolloutContextKindKey": "user",
269
| "metricRegressionThreshold": 0.05,
270
| "metricGroupKeys": [
271
| "frontend-metrics",
272
| "backend-metrics"
273
| ],
274
| "stages": [
275
| {
276
| "allocation": 25000,
277
| "durationMillis": 60000
278
| },
279
| {
280
| "allocation": 25000,
281
| "durationMillis": 60000
282
| }
283
| ]
284
| },
285
| "progressiveReleaseConfig": {
286
| "rolloutContextKindKey": "user",
287
| "stages": [
288
| {
289
| "allocation": 25000,
290
| "durationMillis": 60000
291
| },
292
| {
293
| "allocation": 25000,
294
| "durationMillis": 60000
295
| }
296
| ]
297
| }
298
| }
299
| ],
300
| "totalCount": 42
301
| }
```
Get a list of release policies for the specified project with optional filtering.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired
The project key
### Headers
LD-API-VersionenumRequired
Version of the endpoint.
Allowed values:beta
### Query Parameters
excludeDefaultbooleanOptionalDefaults to `false`
When true, exclude the default release policy from the response. When false or omitted, include the default policy if an environment filter is present.
### Response
List of release policies
itemslist of objects
List of release policies
Show 9 properties
totalCountinteger
Total number of release policies
### Errors
400
Bad Request Error
401
Unauthorized Error
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