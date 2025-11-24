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
/api/v2/flags/:projectKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/flags/projectKey"
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
[](/docs/api/feature-flags/get-feature-flags?explorer=true)
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
| "name": "My Flag",
5
| "kind": "boolean",
6
| "key": "flag-key-123abc",
7
| "_version": 1,
8
| "creationDate": 1,
9
| "variations": [
10
| {
11
| "value": null,
12
| "_id": "e432f62b-55f6-49dd-a02f-eb24acf39d05"
13
| },
14
| {
15
| "value": null,
16
| "_id": "a00bf58d-d252-476c-b915-15a74becacb4"
17
| }
18
| ],
19
| "temporary": true,
20
| "tags": [
21
| "example-tag"
22
| ],
23
| "_links": {
24
| "parent": {
25
| "href": "/api/v2/flags/my-project",
26
| "type": "application/json"
27
| },
28
| "self": {
29
| "href": "/api/v2/flags/my-project/my-flag",
30
| "type": "application/json"
31
| }
32
| },
33
| "experiments": {
34
| "baselineIdx": 1,
35
| "items": [
36
| {
37
| "metricKey": "my-metric",
38
| "_metric": {
39
| "_id": "5902deadbeef667524a01290",
40
| "_versionId": "version-id-123abc",
41
| "key": "metric-key-123abc",
42
| "name": "My metric",
43
| "kind": "custom",
44
| "_links": {
45
| "parent": {
46
| "href": "/api/v2/metrics/my-project",
47
| "type": "application/json"
48
| },
49
| "self": {
50
| "href": "/api/v2/metrics/my-project/my-metric",
51
| "type": "application/json"
52
| }
53
| },
54
| "tags": [],
55
| "_creationDate": 1,
56
| "dataSource": {
57
| "key": "string",
58
| "environmentKey": "string",
59
| "_name": "string",
60
| "_integrationKey": "string"
61
| },
62
| "experimentCount": 0,
63
| "metricGroupCount": 0,
64
| "activeExperimentCount": 2,
65
| "activeGuardedRolloutCount": 1,
66
| "_version": 1,
67
| "_attachedFlagCount": 0,
68
| "_site": {
69
| "href": "string",
70
| "type": "string"
71
| },
72
| "_access": {
73
| "denied": [
74
| {
75
| "action": "string",
76
| "reason": {
77
| "effect": "allow",
78
| "resources": [
79
| "proj/*:env/*;qa_*:/flag/*"
80
| ],
81
| "notResources": [
82
| "string"
83
| ],
84
| "actions": [
85
| "*"
86
| ],
87
| "notActions": [
88
| "string"
89
| ],
90
| "role_name": "string"
91
| }
92
| }
93
| ],
94
| "allowed": [
95
| {
96
| "action": "string",
97
| "reason": {
98
| "effect": "allow",
99
| "resources": [
100
| "proj/*:env/*;qa_*:/flag/*"
101
| ],
102
| "notResources": [
103
| "string"
104
| ],
105
| "actions": [
106
| "*"
107
| ],
108
| "notActions": [
109
| "string"
110
| ],
111
| "role_name": "string"
112
| }
113
| }
114
| ]
115
| },
116
| "lastModified": {
117
| "date": "2021-08-05T19:46:31.148082Z"
118
| },
119
| "maintainerId": "569fdeadbeef1644facecafe",
120
| "_maintainer": {
121
| "_links": {
122
| "self": {
123
| "href": "/api/v2/members/569f183514f4432160000007",
124
| "type": "application/json"
125
| }
126
| },
127
| "_id": "569f183514f4432160000007",
128
| "role": "admin",
129
| "email": "ariel@acme.com",
130
| "firstName": "Ariel",
131
| "lastName": "Flores"
132
| },
133
| "description": "string",
134
| "category": "Error monitoring",
135
| "isNumeric": true,
136
| "successCriteria": "HigherThanBaseline",
137
| "unit": "string",
138
| "eventKey": "Order placed",
139
| "randomizationUnits": [
140
| "user"
141
| ],
142
| "filters": {
143
| "type": "contextAttribute",
144
| "op": "string",
145
| "values": [
146
| "JP"
147
| ],
148
| "negate": false,
149
| "attribute": "country",
150
| "contextKind": "user"
151
| },
152
| "unitAggregationType": "average",
153
| "analysisType": "mean",
154
| "percentileValue": 95,
155
| "eventDefault": {
156
| "disabled": true,
157
| "value": 0
158
| },
159
| "archived": true,
160
| "archivedAt": 1,
161
| "selector": "string",
162
| "urls": [
163
| {}
164
| ]
165
| },
166
| "environments": [
167
| "production",
168
| "test",
169
| "my-environment"
170
| ],
171
| "_environmentSettings": {}
172
| }
173
| ]
174
| },
175
| "customProperties": {},
176
| "archived": false,
177
| "description": "This flag controls the example widgets",
178
| "clientSideAvailability": {
179
| "usingMobileKey": true,
180
| "usingEnvironmentId": true
181
| },
182
| "maintainerId": "569f183514f4432160000007",
183
| "_maintainer": {
184
| "_links": {
185
| "self": {
186
| "href": "/api/v2/members/569f183514f4432160000007",
187
| "type": "application/json"
188
| }
189
| },
190
| "_id": "569f183514f4432160000007",
191
| "role": "admin",
192
| "email": "ariel@acme.com",
193
| "firstName": "Ariel",
194
| "lastName": "Flores"
195
| },
196
| "maintainerTeamKey": "team-1",
197
| "_maintainerTeam": {
198
| "key": "team-key-123abc",
199
| "name": "Example team",
200
| "_links": {
201
| "parent": {
202
| "href": "/api/v2/teams",
203
| "type": "application/json"
204
| },
205
| "roles": {
206
| "href": "/api/v2/teams/example-team/roles",
207
| "type": "application/json"
208
| },
209
| "self": {
210
| "href": "/api/v2/teams/example-team",
211
| "type": "application/json"
212
| }
213
| }
214
| },
215
| "archivedDate": 1,
216
| "deprecated": false,
217
| "deprecatedDate": 1,
218
| "defaults": {
219
| "onVariation": 0,
220
| "offVariation": 1
221
| },
222
| "_purpose": "string",
223
| "migrationSettings": {
224
| "contextKind": "device",
225
| "stageCount": 6
226
| },
227
| "environments": {
228
| "my-environment": {
229
| "on": false,
230
| "archived": false,
231
| "salt": "61eddeadbeef4da1facecafe3a60a397",
232
| "sel": "810edeadbeef4844facecafe438f2999492",
233
| "lastModified": 1627071171347,
234
| "version": 1,
235
| "_site": {
236
| "href": "/default/my-environment/features/client-side-flag",
237
| "type": "text/html"
238
| },
239
| "_environmentName": "My Environment",
240
| "trackEvents": false,
241
| "trackEventsFallthrough": false,
242
| "targets": [
243
| {
244
| "values": [
245
| "user-key-123abc"
246
| ],
247
| "variation": 0,
248
| "contextKind": "user"
249
| }
250
| ],
251
| "contextTargets": [
252
| {
253
| "values": [
254
| "device-key-123abc"
255
| ],
256
| "variation": 0,
257
| "contextKind": "device"
258
| }
259
| ],
260
| "rules": [],
261
| "fallthrough": {
262
| "variation": 0
263
| },
264
| "offVariation": 1,
265
| "prerequisites": [],
266
| "_summary": {
267
| "variations": {
268
| "0": {
269
| "rules": 0,
270
| "nullRules": 0,
271
| "targets": 1,
272
| "contextTargets": 1,
273
| "isFallthrough": true
274
| },
275
| "1": {
276
| "rules": 0,
277
| "nullRules": 0,
278
| "targets": 0,
279
| "isOff": true
280
| }
281
| },
282
| "prerequisites": 0
283
| }
284
| }
285
| },
286
| "includeInSnippet": true,
287
| "goalIds": []
288
| }
289
| ],
290
| "_links": {
291
| "self": {
292
| "href": "/api/v2/flags/default",
293
| "type": "application/json"
294
| }
295
| },
296
| "totalCount": 1,
297
| "totalCountWithDifferences": 0
298
| }
```
Get a list of all feature flags in the given project. You can include information specific to different environments by adding `env` query parameter. For example, setting `env=production` adds configuration details about your production environment to the response. You can also filter feature flags by tag with the `tag` query parameter. > #### Recommended use > > This endpoint can return a large amount of information. We recommend using some or all of these query parameters to decrease response time and overall payload size: `limit`, `env`, `query`, and `filter=creationDate`. ### Filtering flags You can filter on certain fields using the `filter` query parameter. For example, setting `filter=query:dark-mode,tags:beta+test` matches flags with the string `dark-mode` in their key or name, ignoring case, which also have the tags `beta` and `test`. The `filter` query parameter supports the following arguments: | Filter argument | Description | Example | |-----------------------|-------------|----------------------| | `applicationEvaluated` | A string. It filters the list to flags that are evaluated in the application with the given key. | `filter=applicationEvaluated:com.launchdarkly.cafe` | | `archived` | (deprecated) A boolean value. It filters the list to archived flags. | Use `filter=state:archived` instead | | `contextKindsEvaluated` | A `+`-separated list of context kind keys. It filters the list to flags which have been evaluated in the past 30 days for all of the context kinds in the list. | `filter=contextKindsEvaluated:user+application` | | `codeReferences.max` | An integer value. Use `0` to return flags that do not have code references. | `filter=codeReferences.max:0` | | `codeReferences.min` | An integer value. Use `1` to return flags that do have code references. | `filter=codeReferences.min:1` | | `creationDate` | An object with an optional `before` field whose value is Unix time in milliseconds. It filters the list to flags created before the date. | `filter=creationDate:{"before":1690527600000}` | | `evaluated` | An object that contains a key of `after` and a value in Unix time in milliseconds. It filters the list to all flags that have been evaluated since the time you specify, in the environment provided. This filter requires the `filterEnv` filter. | `filter=evaluated:{"after":1690527600000},filterEnv:production` | | `filterEnv` | A valid environment key. You must use this field for filters that are environment-specific. If there are multiple environment-specific filters, you only need to include this field once. | `filter=evaluated:{"after": 1590768455282},filterEnv:production` | | `guardedRollout` | A string, one of `any`, `monitoring`, `regressed`, `rolledBack`, `completed`, `archived`. It filters the list to flags that are part of guarded rollouts. | `filter=guardedRollout:monitoring` | | `hasExperiment` | A boolean value. It filters the list to flags that are used in an experiment. | `filter=hasExperiment:true` | | `maintainerId` | A valid member ID. It filters the list to flags that are maintained by this member. | `filter=maintainerId:12ab3c45de678910abc12345` | | `maintainerTeamKey` | A string. It filters the list to flags that are maintained by the team with this key. | `filter=maintainerTeamKey:example-team-key` | | `query` | A string. It filters the list to flags that include the specified string in their key or name. It is not case sensitive. | `filter=query:example` | | `releasePipeline` | A release pipeline key. It filters the list to flags that are either currently active in the release pipeline or have completed the release pipeline. | `filter=releasePipeline:default-release-pipeline` | | `state` | A string, either `live`, `deprecated`, or `archived`. It filters the list to flags in this state. | `filter=state:archived` | | `sdkAvailability` | A string, one of `client`, `mobile`, `anyClient`, `server`. Using `client` filters the list to flags whose client-side SDK availability is set to use the client-side ID. Using `mobile` filters to flags set to use the mobile key. Using `anyClient` filters to flags set to use either the client-side ID or the mobile key. Using `server` filters to flags set to use neither, that is, to flags only available in server-side SDKs. | `filter=sdkAvailability:client` | | `tags` | A `+`-separated list of tags. It filters the list to flags that have all of the tags in the list. | `filter=tags:beta+test` | | `type` | A string, either `temporary` or `permanent`. It filters the list to flags with the specified type. | `filter=type:permanent` | The documented values for the `filter` query are prior to URL encoding. For example, the `+` in `filter=tags:beta+test` must be encoded to `%2B`. By default, this endpoint returns all flags. You can page through the list with the `limit` parameter and by following the `first`, `prev`, `next`, and `last` links in the returned `_links` field. These links will not be present if the pages they refer to don't exist. For example, the `first` and `prev` links will be missing from the response on the first page. ### Sorting flags You can sort flags based on the following fields: - `creationDate` sorts by the creation date of the flag. - `key` sorts by the key of the flag. - `maintainerId` sorts by the flag maintainer. - `name` sorts by flag name. - `tags` sorts by tags. - `targetingModifiedDate` sorts by the date that the flag's targeting rules were last modified in a given environment. It must be used with `env` parameter and it can not be combined with any other sort. If multiple `env` values are provided, it will perform sort using the first one. For example, `sort=-targetingModifiedDate&env=production&env=staging` returns results sorted by `targetingModifiedDate` for the `production` environment. - `type` sorts by flag type All fields are sorted in ascending order by default. To sort in descending order, prefix the field with a dash ( - ). For example, `sort=-name` sorts the response by flag name in descending order. ### Expanding response LaunchDarkly supports the `expand` query param to include additional fields in the response, with the following fields: - `codeReferences` includes code references for the feature flag - `evaluation` includes evaluation information within returned environments, including which context kinds the flag has been evaluated for in the past 30 days - `migrationSettings` includes migration settings information within the flag and within returned environments. These settings are only included for migration flags, that is, where `purpose` is `migration`. For example, `expand=evaluation` includes the `evaluation` field in the response. ### Migration flags For migration flags, the cohort information is included in the `rules` property of a flag's response, and default cohort information is included in the `fallthrough` property of a flag's response. To learn more, read [Migration Flags](https://launchdarkly.com/docs/home/flags/migration). 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
### Query Parameters
envstringOptional`format: "string"`
Filter configurations by environment
tagstringOptional`format: "string"`
Filter feature flags by tag
limitlongOptional
The number of feature flags to return. Defaults to 20.
offsetlongOptional
Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.
archivedbooleanOptionalDeprecated
Deprecated, use `filter=archived:true` instead. A boolean to filter the list to archived flags. When this is absent, only unarchived flags will be returned
summarybooleanOptional
By default, flags do _not_ include their lists of prerequisites, targets, or rules for each environment. Set `summary=0` and include the `env` query parameter to include these fields for each flag returned.
filterstringOptional`format: "string"`
A comma-separated list of filters. Each filter is of the form field:value. Read the endpoint description for a full list of available filter fields.
sortstringOptional`format: "string"`
A comma-separated list of fields to sort by. Fields prefixed by a dash ( - ) sort in descending order. Read the endpoint description for a full list of available sort fields.
comparebooleanOptionalDeprecated
Deprecated, unavailable in API version `20240415`. A boolean to filter results by only flags that have differences between environments.
expandstringOptional`format: "string"`
A comma-separated list of fields to expand in the response. Supported fields are explained above.
### Response
Global flags collection response
itemslist of objects
An array of feature flags
Show 27 properties
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
totalCountinteger or null
The total number of flags
totalCountWithDifferencesinteger or null
The number of flags that have differences between environments. Only shown when query parameter `compare` is `true`.
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
Get a list of all feature flags in the given project. You can include information specific to different environments by adding `env` query parameter. For example, setting `env=production` adds configuration details about your production environment to the response. You can also filter feature flags by tag with the `tag` query parameter.
> #### Recommended use
> This endpoint can return a large amount of information. We recommend using some or all of these query parameters to decrease response time and overall payload size: `limit`, `env`, `query`, and `filter=creationDate`.
### Filtering flags
You can filter on certain fields using the `filter` query parameter. For example, setting `filter=query:dark-mode,tags:beta+test` matches flags with the string `dark-mode` in their key or name, ignoring case, which also have the tags `beta` and `test`.
The `filter` query parameter supports the following arguments:
Filter argument | Description | Example 
---|---|--- 
`applicationEvaluated` | A string. It filters the list to flags that are evaluated in the application with the given key. | `filter=applicationEvaluated:com.launchdarkly.cafe` 
`archived` | (deprecated) A boolean value. It filters the list to archived flags. | Use `filter=state:archived` instead 
`contextKindsEvaluated` | A `+`-separated list of context kind keys. It filters the list to flags which have been evaluated in the past 30 days for all of the context kinds in the list. | `filter=contextKindsEvaluated:user+application` 
`codeReferences.max` | An integer value. Use `0` to return flags that do not have code references. | `filter=codeReferences.max:0` 
`codeReferences.min` | An integer value. Use `1` to return flags that do have code references. | `filter=codeReferences.min:1` 
`creationDate` | An object with an optional `before` field whose value is Unix time in milliseconds. It filters the list to flags created before the date. | `filter=creationDate:{"before":1690527600000}` 
`evaluated` | An object that contains a key of `after` and a value in Unix time in milliseconds. It filters the list to all flags that have been evaluated since the time you specify, in the environment provided. This filter requires the `filterEnv` filter. | `filter=evaluated:{"after":1690527600000},filterEnv:production` 
`filterEnv` | A valid environment key. You must use this field for filters that are environment-specific. If there are multiple environment-specific filters, you only need to include this field once. | `filter=evaluated:{"after": 1590768455282},filterEnv:production` 
`guardedRollout` | A string, one of `any`, `monitoring`, `regressed`, `rolledBack`, `completed`, `archived`. It filters the list to flags that are part of guarded rollouts. | `filter=guardedRollout:monitoring` 
`hasExperiment` | A boolean value. It filters the list to flags that are used in an experiment. | `filter=hasExperiment:true` 
`maintainerId` | A valid member ID. It filters the list to flags that are maintained by this member. | `filter=maintainerId:12ab3c45de678910abc12345` 
`maintainerTeamKey` | A string. It filters the list to flags that are maintained by the team with this key. | `filter=maintainerTeamKey:example-team-key` 
`query` | A string. It filters the list to flags that include the specified string in their key or name. It is not case sensitive. | `filter=query:example` 
`releasePipeline` | A release pipeline key. It filters the list to flags that are either currently active in the release pipeline or have completed the release pipeline. | `filter=releasePipeline:default-release-pipeline` 
`state` | A string, either `live`, `deprecated`, or `archived`. It filters the list to flags in this state. | `filter=state:archived` 
`sdkAvailability` | A string, one of `client`, `mobile`, `anyClient`, `server`. Using `client` filters the list to flags whose client-side SDK availability is set to use the client-side ID. Using `mobile` filters to flags set to use the mobile key. Using `anyClient` filters to flags set to use either the client-side ID or the mobile key. Using `server` filters to flags set to use neither, that is, to flags only available in server-side SDKs. | `filter=sdkAvailability:client` 
`tags` | A `+`-separated list of tags. It filters the list to flags that have all of the tags in the list. | `filter=tags:beta+test` 
`type` | A string, either `temporary` or `permanent`. It filters the list to flags with the specified type. | `filter=type:permanent` 
The documented values for the `filter` query are prior to URL encoding. For example, the `+` in `filter=tags:beta+test` must be encoded to `%2B`.
By default, this endpoint returns all flags. You can page through the list with the `limit` parameter and by following the `first`, `prev`, `next`, and `last` links in the returned `_links` field. These links will not be present if the pages they refer to don’t exist. For example, the `first` and `prev` links will be missing from the response on the first page.
### Sorting flags
You can sort flags based on the following fields:
 * `creationDate` sorts by the creation date of the flag.
 * `key` sorts by the key of the flag.
 * `maintainerId` sorts by the flag maintainer.
 * `name` sorts by flag name.
 * `tags` sorts by tags.
 * `targetingModifiedDate` sorts by the date that the flag’s targeting rules were last modified in a given environment. It must be used with `env` parameter and it can not be combined with any other sort. If multiple `env` values are provided, it will perform sort using the first one. For example, `sort=-targetingModifiedDate&env=production&env=staging` returns results sorted by `targetingModifiedDate` for the `production` environment.
 * `type` sorts by flag type
All fields are sorted in ascending order by default. To sort in descending order, prefix the field with a dash ( - ). For example, `sort=-name` sorts the response by flag name in descending order.
### Expanding response
LaunchDarkly supports the `expand` query param to include additional fields in the response, with the following fields:
 * `codeReferences` includes code references for the feature flag
 * `evaluation` includes evaluation information within returned environments, including which context kinds the flag has been evaluated for in the past 30 days
 * `migrationSettings` includes migration settings information within the flag and within returned environments. These settings are only included for migration flags, that is, where `purpose` is `migration`.
For example, `expand=evaluation` includes the `evaluation` field in the response.
### Migration flags
For migration flags, the cohort information is included in the `rules` property of a flag’s response, and default cohort information is included in the `fallthrough` property of a flag’s response. To learn more, read [Migration Flags](https://launchdarkly.com/docs/home/flags/migration).