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
/api/v2/flags/:projectKey/:featureFlagKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/flags/projectKey/featureFlagKey"
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
[](/docs/api/feature-flags/get-feature-flag?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "name": "My Flag",
3
| "kind": "boolean",
4
| "key": "flag-key-123abc",
5
| "_version": 1,
6
| "creationDate": 1,
7
| "variations": [
8
| {
9
| "value": null,
10
| "_id": "e432f62b-55f6-49dd-a02f-eb24acf39d05"
11
| },
12
| {
13
| "value": null,
14
| "_id": "a00bf58d-d252-476c-b915-15a74becacb4"
15
| }
16
| ],
17
| "temporary": true,
18
| "tags": [
19
| "example-tag"
20
| ],
21
| "_links": {
22
| "parent": {
23
| "href": "/api/v2/flags/my-project",
24
| "type": "application/json"
25
| },
26
| "self": {
27
| "href": "/api/v2/flags/my-project/my-flag",
28
| "type": "application/json"
29
| }
30
| },
31
| "experiments": {
32
| "baselineIdx": 1,
33
| "items": [
34
| {
35
| "metricKey": "my-metric",
36
| "_metric": {
37
| "_id": "5902deadbeef667524a01290",
38
| "_versionId": "version-id-123abc",
39
| "key": "metric-key-123abc",
40
| "name": "My metric",
41
| "kind": "custom",
42
| "_links": {
43
| "parent": {
44
| "href": "/api/v2/metrics/my-project",
45
| "type": "application/json"
46
| },
47
| "self": {
48
| "href": "/api/v2/metrics/my-project/my-metric",
49
| "type": "application/json"
50
| }
51
| },
52
| "tags": [],
53
| "_creationDate": 1,
54
| "dataSource": {
55
| "key": "string",
56
| "environmentKey": "string",
57
| "_name": "string",
58
| "_integrationKey": "string"
59
| },
60
| "experimentCount": 0,
61
| "metricGroupCount": 0,
62
| "activeExperimentCount": 2,
63
| "activeGuardedRolloutCount": 1,
64
| "_version": 1,
65
| "_attachedFlagCount": 0,
66
| "_site": {
67
| "href": "string",
68
| "type": "string"
69
| },
70
| "_access": {
71
| "denied": [
72
| {
73
| "action": "string",
74
| "reason": {
75
| "effect": "allow",
76
| "resources": [
77
| "proj/*:env/*;qa_*:/flag/*"
78
| ],
79
| "notResources": [
80
| "string"
81
| ],
82
| "actions": [
83
| "*"
84
| ],
85
| "notActions": [
86
| "string"
87
| ],
88
| "role_name": "string"
89
| }
90
| }
91
| ],
92
| "allowed": [
93
| {
94
| "action": "string",
95
| "reason": {
96
| "effect": "allow",
97
| "resources": [
98
| "proj/*:env/*;qa_*:/flag/*"
99
| ],
100
| "notResources": [
101
| "string"
102
| ],
103
| "actions": [
104
| "*"
105
| ],
106
| "notActions": [
107
| "string"
108
| ],
109
| "role_name": "string"
110
| }
111
| }
112
| ]
113
| },
114
| "lastModified": {
115
| "date": "2021-08-05T19:46:31.148082Z"
116
| },
117
| "maintainerId": "569fdeadbeef1644facecafe",
118
| "_maintainer": {
119
| "_links": {
120
| "self": {
121
| "href": "/api/v2/members/569f183514f4432160000007",
122
| "type": "application/json"
123
| }
124
| },
125
| "_id": "569f183514f4432160000007",
126
| "role": "admin",
127
| "email": "ariel@acme.com",
128
| "firstName": "Ariel",
129
| "lastName": "Flores"
130
| },
131
| "description": "string",
132
| "category": "Error monitoring",
133
| "isNumeric": true,
134
| "successCriteria": "HigherThanBaseline",
135
| "unit": "string",
136
| "eventKey": "Order placed",
137
| "randomizationUnits": [
138
| "user"
139
| ],
140
| "filters": {
141
| "type": "contextAttribute",
142
| "op": "string",
143
| "values": [
144
| "JP"
145
| ],
146
| "negate": false,
147
| "attribute": "country",
148
| "contextKind": "user"
149
| },
150
| "unitAggregationType": "average",
151
| "analysisType": "mean",
152
| "percentileValue": 95,
153
| "eventDefault": {
154
| "disabled": true,
155
| "value": 0
156
| },
157
| "archived": true,
158
| "archivedAt": 1,
159
| "selector": "string",
160
| "urls": [
161
| {}
162
| ]
163
| },
164
| "environments": [
165
| "production",
166
| "test",
167
| "my-environment"
168
| ],
169
| "_environmentSettings": {}
170
| }
171
| ]
172
| },
173
| "customProperties": {},
174
| "archived": false,
175
| "description": "This flag controls the example widgets",
176
| "clientSideAvailability": {
177
| "usingMobileKey": true,
178
| "usingEnvironmentId": true
179
| },
180
| "maintainerId": "569f183514f4432160000007",
181
| "_maintainer": {
182
| "_links": {
183
| "self": {
184
| "href": "/api/v2/members/569f183514f4432160000007",
185
| "type": "application/json"
186
| }
187
| },
188
| "_id": "569f183514f4432160000007",
189
| "role": "admin",
190
| "email": "ariel@acme.com",
191
| "firstName": "Ariel",
192
| "lastName": "Flores"
193
| },
194
| "maintainerTeamKey": "team-1",
195
| "_maintainerTeam": {
196
| "key": "team-key-123abc",
197
| "name": "Example team",
198
| "_links": {
199
| "parent": {
200
| "href": "/api/v2/teams",
201
| "type": "application/json"
202
| },
203
| "roles": {
204
| "href": "/api/v2/teams/example-team/roles",
205
| "type": "application/json"
206
| },
207
| "self": {
208
| "href": "/api/v2/teams/example-team",
209
| "type": "application/json"
210
| }
211
| }
212
| },
213
| "archivedDate": 1,
214
| "deprecated": false,
215
| "deprecatedDate": 1,
216
| "defaults": {
217
| "onVariation": 0,
218
| "offVariation": 1
219
| },
220
| "_purpose": "string",
221
| "migrationSettings": {
222
| "contextKind": "device",
223
| "stageCount": 6
224
| },
225
| "environments": {
226
| "my-environment": {
227
| "on": false,
228
| "archived": false,
229
| "salt": "61eddeadbeef4da1facecafe3a60a397",
230
| "sel": "810edeadbeef4844facecafe438f2999492",
231
| "lastModified": 1627071171347,
232
| "version": 1,
233
| "_site": {
234
| "href": "/default/my-environment/features/client-side-flag",
235
| "type": "text/html"
236
| },
237
| "_environmentName": "My Environment",
238
| "trackEvents": false,
239
| "trackEventsFallthrough": false,
240
| "targets": [
241
| {
242
| "values": [
243
| "user-key-123abc"
244
| ],
245
| "variation": 0,
246
| "contextKind": "user"
247
| }
248
| ],
249
| "contextTargets": [
250
| {
251
| "values": [
252
| "device-key-123abc"
253
| ],
254
| "variation": 0,
255
| "contextKind": "device"
256
| }
257
| ],
258
| "rules": [],
259
| "fallthrough": {
260
| "variation": 0
261
| },
262
| "offVariation": 1,
263
| "prerequisites": [],
264
| "_summary": {
265
| "variations": {
266
| "0": {
267
| "rules": 0,
268
| "nullRules": 0,
269
| "targets": 1,
270
| "contextTargets": 1,
271
| "isFallthrough": true
272
| },
273
| "1": {
274
| "rules": 0,
275
| "nullRules": 0,
276
| "targets": 0,
277
| "isOff": true
278
| }
279
| },
280
| "prerequisites": 0
281
| }
282
| }
283
| },
284
| "includeInSnippet": true,
285
| "goalIds": []
286
| }
```
Get a single feature flag by key. By default, this returns the configurations for all environments. You can filter environments with the `env` query parameter. For example, setting `env=production` restricts the returned configurations to just the `production` environment. > #### Recommended use > > This endpoint can return a large amount of information. Specifying one or multiple environments with the `env` parameter can decrease response time and overall payload size. We recommend using this parameter to return only the environments relevant to your query. ### Expanding response LaunchDarkly supports the `expand` query param to include additional fields in the response, with the following fields: - `evaluation` includes evaluation information within returned environments, including which context kinds the flag has been evaluated for in the past 30 days - `migrationSettings` includes migration settings information within the flag and within returned environments. These settings are only included for migration flags, that is, where `purpose` is `migration`. For example, `expand=evaluation` includes the `evaluation` field in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
featureFlagKeystringRequired`format: "string"`
The feature flag key
### Query Parameters
envstringOptional`format: "string"`
Filter configurations by environment
expandstringOptional`format: "string"`
A comma-separated list of fields to expand in the response. Supported fields are explained above.
### Response
Global flag response
namestring
A human-friendly name for the feature flag
kindenum
Kind of feature flag
Allowed values:booleanmultivariate
keystring
A unique key used to reference the flag in your code
_versioninteger
Version of the feature flag
creationDatelong
Timestamp of flag creation date
variationslist of objects
An array of possible variations for the flag
Show 4 properties
temporaryboolean
Whether the flag is a temporary flag
tagslist of strings
Tags for the feature flag
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
experimentsobject
Experimentation data for the feature flag
Show 2 properties
customPropertiesmap from strings to objects
Metadata attached to the feature flag, in the form of the property key associated with a name and array of values for the metadata to associate with this flag. Typically used to store data related to an integration.
Show 2 properties
archivedboolean
Boolean indicating if the feature flag is archived
descriptionstring or null
Description of the feature flag
clientSideAvailabilityobject or null
Which type of client-side SDKs the feature flag is available to
Show 2 properties
maintainerIdstring or null
Associated maintainerId for the feature flag
_maintainerobject or null
Associated maintainer member info for the feature flag
Show 6 properties
maintainerTeamKeystring or null
The key of the associated team that maintains this feature flag
_maintainerTeamobject or null
Associated maintainer team info for the feature flag
Show 3 properties
archivedDatelong or null
If archived is true, date of archive
deprecatedboolean or null
Boolean indicating if the feature flag is deprecated
deprecatedDatelong or null
If deprecated is true, date of deprecation
defaultsobject or null
The indices, from the array of variations, for the variations to serve by default when targeting is on and when targeting is off. These variations will be used for this flag in new environments. If omitted, the first and last variation will be used.
Show 2 properties
_purposestring or null
migrationSettingsobject or null
Migration-related settings for the flag
Show 2 properties
environmentsmap from strings to objects or null
Details on the environments for this flag. Only returned if the request is filtered by environment, using the `filterEnv` query parameter.
Show 21 properties
includeInSnippetboolean or nullDeprecated
Deprecated, use `clientSideAvailability`. Whether this flag should be made available to the client-side JavaScript SDK
goalIdslist of strings or nullDeprecated
Deprecated, use `experiments` instead
### Errors
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
Get a single feature flag by key. By default, this returns the configurations for all environments. You can filter environments with the `env` query parameter. For example, setting `env=production` restricts the returned configurations to just the `production` environment.
> #### Recommended use
> This endpoint can return a large amount of information. Specifying one or multiple environments with the `env` parameter can decrease response time and overall payload size. We recommend using this parameter to return only the environments relevant to your query.
### Expanding response
LaunchDarkly supports the `expand` query param to include additional fields in the response, with the following fields:
 * `evaluation` includes evaluation information within returned environments, including which context kinds the flag has been evaluated for in the past 30 days
 * `migrationSettings` includes migration settings information within the flag and within returned environments. These settings are only included for migration flags, that is, where `purpose` is `migration`.
For example, `expand=evaluation` includes the `evaluation` field in the response.