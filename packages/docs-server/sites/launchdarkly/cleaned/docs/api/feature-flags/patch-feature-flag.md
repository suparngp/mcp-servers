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
| payload = { "patch": [
6
| {
7
| "op": "replace",
8
| "path": "/description",
9
| "value": None
10
| }
11
| ] }
12
| headers = {
13
| "Authorization": "<apiKey>",
14
| "Content-Type": "application/json"
15
| }
16
| 
17
| response = requests.patch(url, json=payload, headers=headers)
18
| 
19
| print(response.json())
```
[](/docs/api/feature-flags/patch-feature-flag?explorer=true)
200Updated
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
Perform a partial update to a feature flag. The request body must be a valid semantic patch, JSON patch, or JSON merge patch. To learn more the different formats, read [Updates](https://launchdarkly.com/docs/api#updates). ### Using semantic patches on a feature flag To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch). The body of a semantic patch request for updating feature flags takes the following properties: * `comment` (string): (Optional) A description of the update. * `environmentKey` (string): (Required for some instructions only) The key of the LaunchDarkly environment. * `instructions` (array): (Required) A list of actions the update should perform. Each action in the list must be an object with a `kind` property that indicates the instruction. If the action requires parameters, you must include those parameters as additional fields in the object. The body of a single semantic patch can contain many different instructions. ### Instructions Semantic patch requests support the following `kind` instructions for updating feature flags. <details> <summary>Click to expand instructions for <strong>turning flags on and off</strong></summary> These instructions require the `environmentKey` parameter. #### turnFlagOff Sets the flag's targeting state to **Off**. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "turnFlagOff" } ] } ``` #### turnFlagOn Sets the flag's targeting state to **On**. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "turnFlagOn" } ] } ``` </details><br /> <details> <summary>Click to expand instructions for <strong>working with targeting and variations</strong></summary> These instructions require the `environmentKey` parameter. Several of the instructions for working with targeting and variations require flag rule IDs, variation IDs, or clause IDs as parameters. Each of these are returned as part of the [Get feature flag](https://launchdarkly.com/docs/api/feature-flags/get-feature-flag) response. The flag rule ID is the `_id` field of each element in the `rules` array within each environment listed in the `environments` object. The variation ID is the `_id` field in each element of the `variations` array. The clause ID is the `_id` field of each element of the `clauses` array within the `rules` array within each environment listed in the `environments` object. #### addClauses Adds the given clauses to the rule indicated by `ruleId`. ##### Parameters - `ruleId`: ID of a rule in the flag. - `clauses`: Array of clause objects, with `contextKind` (string), `attribute` (string), `op` (string), `negate` (boolean), and `values` (array of strings, numbers, or dates) properties. The `contextKind`, `attribute`, and `values` are case sensitive. The `op` must be lower-case. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "addClauses", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", "clauses": [{ "contextKind": "user", "attribute": "country", "op": "in", "negate": false, "values": ["USA", "Canada"] }] }] } ``` #### addPrerequisite Adds the flag indicated by `key` with variation `variationId` as a prerequisite to the flag in the path parameter. ##### Parameters - `key`: Flag key of the prerequisite flag. - `variationId`: ID of a variation of the prerequisite flag. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "addPrerequisite", "key": "example-prereq-flag-key", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" }] } ``` #### addRule Adds a new targeting rule to the flag. The rule may contain `clauses` and serve the variation that `variationId` indicates, or serve a percentage rollout that `rolloutWeights`, `rolloutBucketBy`, and `rolloutContextKind` indicate. If you set `beforeRuleId`, this adds the new rule before the indicated rule. Otherwise, adds the new rule to the end of the list. ##### Parameters - `clauses`: Array of clause objects, with `contextKind` (string), `attribute` (string), `op` (string), `negate` (boolean), and `values` (array of strings, numbers, or dates) properties. The `contextKind`, `attribute`, and `values` are case sensitive. The `op` must be lower-case. - `beforeRuleId`: (Optional) ID of a flag rule. - Either - `variationId`: ID of a variation of the flag. or - `rolloutWeights`: (Optional) Map of `variationId` to weight, in thousandths of a percent (0-100000). - `rolloutBucketBy`: (Optional) Context attribute available in the specified `rolloutContextKind`. - `rolloutContextKind`: (Optional) Context kind, defaults to `user` Here's an example that uses a `variationId`: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "addRule", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00", "clauses": [{ "contextKind": "organization", "attribute": "located_in", "op": "in", "negate": false, "values": ["Sweden", "Norway"] }] }] } ``` Here's an example that uses a percentage rollout: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "addRule", "clauses": [{ "contextKind": "organization", "attribute": "located_in", "op": "in", "negate": false, "values": ["Sweden", "Norway"] }], "rolloutContextKind": "organization", "rolloutWeights": { "2f43f67c-3e4e-4945-a18a-26559378ca00": 15000, // serve 15% this variation "e5830889-1ec5-4b0c-9cc9-c48790090c43": 85000 // serve 85% this variation } }] } ``` #### addTargets Adds context keys to the individual context targets for the context kind that `contextKind` specifies and the variation that `variationId` specifies. Returns an error if this causes the flag to target the same context key in multiple variations. ##### Parameters - `values`: List of context keys. - `contextKind`: (Optional) Context kind to target, defaults to `user` - `variationId`: ID of a variation on the flag. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "addTargets", "values": ["context-key-123abc", "context-key-456def"], "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" }] } ``` #### addUserTargets Adds user keys to the individual user targets for the variation that `variationId` specifies. Returns an error if this causes the flag to target the same user key in multiple variations. If you are working with contexts, use `addTargets` instead of this instruction. ##### Parameters - `values`: List of user keys. - `variationId`: ID of a variation on the flag. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "addUserTargets", "values": ["user-key-123abc", "user-key-456def"], "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" }] } ``` #### addValuesToClause Adds `values` to the values of the clause that `ruleId` and `clauseId` indicate. Does not update the context kind, attribute, or operator. ##### Parameters - `ruleId`: ID of a rule in the flag. - `clauseId`: ID of a clause in that rule. - `values`: Array of strings, case sensitive. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "addValuesToClause", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", "clauseId": "10a58772-3121-400f-846b-b8a04e8944ed", "values": ["beta_testers"] }] } ``` #### addVariation Adds a variation to the flag. ##### Parameters - `value`: The variation value. - `name`: (Optional) The variation name. - `description`: (Optional) A description for the variation. Here's an example: ```json { "instructions": [ { "kind": "addVariation", "value": 20, "name": "New variation" } ] } ``` #### clearTargets Removes all individual targets from the variation that `variationId` specifies. This includes both user and non-user targets. ##### Parameters - `variationId`: ID of a variation on the flag. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "clearTargets", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" } ] } ``` #### clearUserTargets Removes all individual user targets from the variation that `variationId` specifies. If you are working with contexts, use `clearTargets` instead of this instruction. ##### Parameters - `variationId`: ID of a variation on the flag. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "clearUserTargets", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" } ] } ``` #### removeClauses Removes the clauses specified by `clauseIds` from the rule indicated by `ruleId`. ##### Parameters - `ruleId`: ID of a rule in the flag. - `clauseIds`: Array of IDs of clauses in the rule. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "removeClauses", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", "clauseIds": ["10a58772-3121-400f-846b-b8a04e8944ed", "36a461dc-235e-4b08-97b9-73ce9365873e"] }] } ``` #### removePrerequisite Removes the prerequisite flag indicated by `key`. Does nothing if this prerequisite does not exist. ##### Parameters - `key`: Flag key of an existing prerequisite flag. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "removePrerequisite", "key": "prereq-flag-key-123abc" } ] } ``` #### removeRule Removes the targeting rule specified by `ruleId`. Does nothing if the rule does not exist. ##### Parameters - `ruleId`: ID of a rule in the flag. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "removeRule", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29" } ] } ``` #### removeTargets Removes context keys from the individual context targets for the context kind that `contextKind` specifies and the variation that `variationId` specifies. Does nothing if the flag does not target the context keys. ##### Parameters - `values`: List of context keys. - `contextKind`: (Optional) Context kind to target, defaults to `user` - `variationId`: ID of a flag variation. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "removeTargets", "values": ["context-key-123abc", "context-key-456def"], "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" }] } ``` #### removeUserTargets Removes user keys from the individual user targets for the variation that `variationId` specifies. Does nothing if the flag does not target the user keys. If you are working with contexts, use `removeTargets` instead of this instruction. ##### Parameters - `values`: List of user keys. - `variationId`: ID of a flag variation. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "removeUserTargets", "values": ["user-key-123abc", "user-key-456def"], "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" }] } ``` #### removeValuesFromClause Removes `values` from the values of the clause indicated by `ruleId` and `clauseId`. Does not update the context kind, attribute, or operator. ##### Parameters - `ruleId`: ID of a rule in the flag. - `clauseId`: ID of a clause in that rule. - `values`: Array of strings, case sensitive. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "removeValuesFromClause", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", "clauseId": "10a58772-3121-400f-846b-b8a04e8944ed", "values": ["beta_testers"] }] } ``` #### removeVariation Removes a variation from the flag. ##### Parameters - `variationId`: ID of a variation of the flag to remove. Here's an example: ```json { "instructions": [ { "kind": "removeVariation", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" } ] } ``` #### reorderRules Rearranges the rules to match the order given in `ruleIds`. Returns an error if `ruleIds` does not match the current set of rules on the flag. ##### Parameters - `ruleIds`: Array of IDs of all rules in the flag. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "reorderRules", "ruleIds": ["a902ef4a-2faf-4eaf-88e1-ecc356708a29", "63c238d1-835d-435e-8f21-c8d5e40b2a3d"] }] } ``` #### replacePrerequisites Removes all existing prerequisites and replaces them with the list you provide. ##### Parameters - `prerequisites`: A list of prerequisites. Each item in the list must include a flag `key` and `variationId`. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "replacePrerequisites", "prerequisites": [ { "key": "prereq-flag-key-123abc", "variationId": "10a58772-3121-400f-846b-b8a04e8944ed" }, { "key": "another-prereq-flag-key-456def", "variationId": "e5830889-1ec5-4b0c-9cc9-c48790090c43" } ] } ] } ``` #### replaceRules Removes all targeting rules for the flag and replaces them with the list you provide. ##### Parameters - `rules`: A list of rules. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "replaceRules", "rules": [ { "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00", "description": "My new rule", "clauses": [ { "contextKind": "user", "attribute": "segmentMatch", "op": "segmentMatch", "values": ["test"] } ], "trackEvents": true } ] } ] } ``` #### replaceTargets Removes all existing targeting and replaces it with the list of targets you provide. ##### Parameters - `targets`: A list of context targeting. Each item in the list includes an optional `contextKind` that defaults to `user`, a required `variationId`, and a required list of `values`. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "replaceTargets", "targets": [ { "contextKind": "user", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00", "values": ["user-key-123abc"] }, { "contextKind": "device", "variationId": "e5830889-1ec5-4b0c-9cc9-c48790090c43", "values": ["device-key-456def"] } ] } ] } ``` #### replaceUserTargets Removes all existing user targeting and replaces it with the list of targets you provide. In the list of targets, you must include a target for each of the flag's variations. If you are working with contexts, use `replaceTargets` instead of this instruction. ##### Parameters - `targets`: A list of user targeting. Each item in the list must include a `variationId` and a list of `values`. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "replaceUserTargets", "targets": [ { "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00", "values": ["user-key-123abc", "user-key-456def"] }, { "variationId": "e5830889-1ec5-4b0c-9cc9-c48790090c43", "values": ["user-key-789ghi"] } ] } ] } ``` #### updateClause Replaces the clause indicated by `ruleId` and `clauseId` with `clause`. ##### Parameters - `ruleId`: ID of a rule in the flag. - `clauseId`: ID of a clause in that rule. - `clause`: New `clause` object, with `contextKind` (string), `attribute` (string), `op` (string), `negate` (boolean), and `values` (array of strings, numbers, or dates) properties. The `contextKind`, `attribute`, and `values` are case sensitive. The `op` must be lower-case. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "updateClause", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", "clauseId": "10c7462a-2062-45ba-a8bb-dfb3de0f8af5", "clause": { "contextKind": "user", "attribute": "country", "op": "in", "negate": false, "values": ["Mexico", "Canada"] } }] } ``` #### updateDefaultVariation Updates the default on or off variation of the flag. ##### Parameters - `onVariationValue`: (Optional) The value of the variation of the new on variation. - `offVariationValue`: (Optional) The value of the variation of the new off variation Here's an example: ```json { "instructions": [ { "kind": "updateDefaultVariation", "OnVariationValue": true, "OffVariationValue": false } ] } ``` #### updateFallthroughVariationOrRollout Updates the default or "fallthrough" rule for the flag, which the flag serves when a context matches none of the targeting rules. The rule can serve either the variation that `variationId` indicates, or a percentage rollout that `rolloutWeights` and `rolloutBucketBy` indicate. ##### Parameters - `variationId`: ID of a variation of the flag. or - `rolloutWeights`: Map of `variationId` to weight, in thousandths of a percent (0-100000). - `rolloutBucketBy`: (Optional) Context attribute available in the specified `rolloutContextKind`. - `rolloutContextKind`: (Optional) Context kind, defaults to `user` Here's an example that uses a `variationId`: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "updateFallthroughVariationOrRollout", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" }] } ``` Here's an example that uses a percentage rollout: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "updateFallthroughVariationOrRollout", "rolloutContextKind": "user", "rolloutWeights": { "2f43f67c-3e4e-4945-a18a-26559378ca00": 15000, // serve 15% this variation "e5830889-1ec5-4b0c-9cc9-c48790090c43": 85000 // serve 85% this variation } }] } ``` #### updateOffVariation Updates the default off variation to `variationId`. The flag serves the default off variation when the flag's targeting is **Off**. ##### Parameters - `variationId`: ID of a variation of the flag. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "updateOffVariation", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" } ] } ``` #### updatePrerequisite Changes the prerequisite flag that `key` indicates to use the variation that `variationId` indicates. Returns an error if this prerequisite does not exist. ##### Parameters - `key`: Flag key of an existing prerequisite flag. - `variationId`: ID of a variation of the prerequisite flag. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "updatePrerequisite", "key": "example-prereq-flag-key", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" }] } ``` #### updateRuleDescription Updates the description of the feature flag rule. ##### Parameters - `description`: The new human-readable description for this rule. - `ruleId`: The ID of the rule. You can retrieve this by making a GET request for the flag. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "updateRuleDescription", "description": "New rule description", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29" }] } ``` #### updateRuleTrackEvents Updates whether or not LaunchDarkly tracks events for the feature flag associated with this rule. ##### Parameters - `ruleId`: The ID of the rule. You can retrieve this by making a GET request for the flag. - `trackEvents`: Whether or not events are tracked. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "updateRuleTrackEvents", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", "trackEvents": true }] } ``` #### updateRuleVariationOrRollout Updates what `ruleId` serves when its clauses evaluate to true. The rule can serve either the variation that `variationId` indicates, or a percent rollout that `rolloutWeights` and `rolloutBucketBy` indicate. ##### Parameters - `ruleId`: ID of a rule in the flag. - `variationId`: ID of a variation of the flag. or - `rolloutWeights`: Map of `variationId` to weight, in thousandths of a percent (0-100000). - `rolloutBucketBy`: (Optional) Context attribute available in the specified `rolloutContextKind`. - `rolloutContextKind`: (Optional) Context kind, defaults to `user` Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "updateRuleVariationOrRollout", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" }] } ``` #### updateTrackEvents Updates whether or not LaunchDarkly tracks events for the feature flag, for all rules. ##### Parameters - `trackEvents`: Whether or not events are tracked. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "updateTrackEvents", "trackEvents": true } ] } ``` #### updateTrackEventsFallthrough Updates whether or not LaunchDarkly tracks events for the feature flag, for the default rule. ##### Parameters - `trackEvents`: Whether or not events are tracked. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "updateTrackEventsFallthrough", "trackEvents": true } ] } ``` #### updateVariation Updates a variation of the flag. ##### Parameters - `variationId`: The ID of the variation to update. - `name`: (Optional) The updated variation name. - `value`: (Optional) The updated variation value. - `description`: (Optional) The updated variation description. Here's an example: ```json { "instructions": [ { "kind": "updateVariation", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00", "value": 20 } ] } ``` </details><br /> <details> <summary>Click to expand instructions for <strong>updating flag settings</strong></summary> These instructions do not require the `environmentKey` parameter. They make changes that apply to the flag across all environments. #### addCustomProperties Adds a new custom property to the feature flag. Custom properties are used to associate feature flags with LaunchDarkly integrations. For example, if you create an integration with an issue tracking service, you may want to associate a flag with a list of issues related to a feature's development. ##### Parameters - `key`: The custom property key. - `name`: The custom property name. - `values`: A list of the associated values for the custom property. Here's an example: ```json { "instructions": [{ "kind": "addCustomProperties", "key": "example-custom-property", "name": "Example custom property", "values": ["value1", "value2"] }] } ``` #### addTags Adds tags to the feature flag. ##### Parameters - `values`: A list of tags to add. Here's an example: ```json { "instructions": [ { "kind": "addTags", "values": ["tag1", "tag2"] } ] } ``` #### makeFlagPermanent Marks the feature flag as permanent. LaunchDarkly does not prompt you to remove permanent flags, even if one variation is rolled out to all your customers. Here's an example: ```json { "instructions": [ { "kind": "makeFlagPermanent" } ] } ``` #### makeFlagTemporary Marks the feature flag as temporary. Here's an example: ```json { "instructions": [ { "kind": "makeFlagTemporary" } ] } ``` #### removeCustomProperties Removes the associated values from a custom property. If all the associated values are removed, this instruction also removes the custom property. ##### Parameters - `key`: The custom property key. - `values`: A list of the associated values to remove from the custom property. ```json { "instructions": [{ "kind": "replaceCustomProperties", "key": "example-custom-property", "values": ["value1", "value2"] }] } ``` #### removeMaintainer Removes the flag's maintainer. To set a new maintainer, use the `updateMaintainerMember` or `updateMaintainerTeam` instructions. Here's an example: ```json { "instructions": [ { "kind": "removeMaintainer" } ] } ``` #### removeTags Removes tags from the feature flag. ##### Parameters - `values`: A list of tags to remove. Here's an example: ```json { "instructions": [ { "kind": "removeTags", "values": ["tag1", "tag2"] } ] } ``` #### replaceCustomProperties Replaces the existing associated values for a custom property with the new values. ##### Parameters - `key`: The custom property key. - `name`: The custom property name. - `values`: A list of the new associated values for the custom property. Here's an example: ```json { "instructions": [{ "kind": "replaceCustomProperties", "key": "example-custom-property", "name": "Example custom property", "values": ["value1", "value2"] }] } ``` #### turnOffClientSideAvailability Turns off client-side SDK availability for the flag. This is equivalent to unchecking the **SDKs using Mobile key** and/or **SDKs using Client-side ID** boxes for the flag. If you're using a client-side or mobile SDK, you must expose your feature flags in order for the client-side or mobile SDKs to evaluate them. ##### Parameters - `value`: Use "usingMobileKey" to turn off availability for mobile SDKs. Use "usingEnvironmentId" to turn on availability for client-side SDKs. Here's an example: ```json { "instructions": [ { "kind": "turnOffClientSideAvailability", "value": "usingMobileKey" } ] } ``` #### turnOnClientSideAvailability Turns on client-side SDK availability for the flag. This is equivalent to checking the **SDKs using Mobile key** and/or **SDKs using Client-side ID** boxes for the flag. If you're using a client-side or mobile SDK, you must expose your feature flags in order for the client-side or mobile SDKs to evaluate them. ##### Parameters - `value`: Use "usingMobileKey" to turn on availability for mobile SDKs. Use "usingEnvironmentId" to turn on availability for client-side SDKs. Here's an example: ```json { "instructions": [ { "kind": "turnOnClientSideAvailability", "value": "usingMobileKey" } ] } ``` #### updateDescription Updates the feature flag description. ##### Parameters - `value`: The new description. Here's an example: ```json { "instructions": [ { "kind": "updateDescription", "value": "Updated flag description" } ] } ``` #### updateMaintainerMember Updates the maintainer of the flag to an existing member and removes the existing maintainer. ##### Parameters - `value`: The ID of the member. Here's an example: ```json { "instructions": [ { "kind": "updateMaintainerMember", "value": "61e9b714fd47591727db558a" } ] } ``` #### updateMaintainerTeam Updates the maintainer of the flag to an existing team and removes the existing maintainer. ##### Parameters - `value`: The key of the team. Here's an example: ```json { "instructions": [ { "kind": "updateMaintainerTeam", "value": "example-team-key" } ] } ``` #### updateName Updates the feature flag name. ##### Parameters - `value`: The new name. Here's an example: ```json { "instructions": [ { "kind": "updateName", "value": "Updated flag name" } ] } ``` </details><br /> <details> <summary>Click to expand instructions for <strong>updating the flag lifecycle</strong></summary> These instructions do not require the `environmentKey` parameter. They make changes that apply to the flag across all environments. #### archiveFlag Archives the feature flag. This retires it from LaunchDarkly without deleting it. You cannot archive a flag that is a prerequisite of other flags. ```json { "instructions": [ { "kind": "archiveFlag" } ] } ``` #### deleteFlag Deletes the feature flag and its rules. You cannot restore a deleted flag. If this flag is requested again, the flag value defined in code will be returned for all contexts. Here's an example: ```json { "instructions": [ { "kind": "deleteFlag" } ] } ``` #### deprecateFlag Deprecates the feature flag. This hides it from the live flags list without archiving or deleting it. Here's an example: ```json { "instructions": [ { "kind": "deprecateFlag" } ] } ``` #### restoreDeprecatedFlag Restores the feature flag if it was previously deprecated. Here's an example: ```json { "instructions": [ { "kind": "restoreDeprecatedFlag" } ] } ``` #### restoreFlag Restores the feature flag if it was previously archived. Here's an example: ```json { "instructions": [ { "kind": "restoreFlag" } ] } ``` </details> ### Using JSON patches on a feature flag If you do not include the semantic patch header described above, you can use a [JSON patch](https://launchdarkly.com/docs/api#updates-using-json-patch) or [JSON merge patch](https://datatracker.ietf.org/doc/html/rfc7386) representation of the desired changes. In the JSON patch representation, use a JSON pointer in the `path` element to describe what field to change. Use the [Get feature flag](https://launchdarkly.com/docs/api/feature-flags/get-feature-flag) endpoint to find the field you want to update. There are a few special cases to keep in mind when determining the value of the `path` element: * To add an individual target to a specific variation if the flag variation already has individual targets, the path for the JSON patch operation is: ```json [ { "op": "add", "path": "/environments/devint/targets/0/values/-", "value": "TestClient10" } ] ``` * To add an individual target to a specific variation if the flag variation does not already have individual targets, the path for the JSON patch operation is: ```json [ { "op": "add", "path": "/environments/devint/targets/-", "value": { "variation": 0, "values": ["TestClient10"] } } ] ``` * To add a flag to a release pipeline, the path for the JSON patch operation is: ```json [ { "op": "add", "path": "/releasePipelineKey", "value": "example-release-pipeline-key" } ] ``` ### Required approvals If a request attempts to alter a flag configuration in an environment where approvals are required for the flag, the request will fail with a 405. Changes to the flag configuration in that environment will require creating an [approval request](https://launchdarkly.com/docs/api/approvals). ### Conflicts If a flag configuration change made through this endpoint would cause a pending scheduled change or approval request to fail, this endpoint will return a 400. You can ignore this check by adding an `ignoreConflicts` query parameter set to `true`. ### Migration flags For migration flags, the cohort information is included in the `rules` property of a flag's response. You can update cohorts by updating `rules`. Default cohort information is included in the `fallthrough` property of a flag's response. You can update the default cohort by updating `fallthrough`. When you update the rollout for a cohort or the default cohort through the API, provide a rollout instead of a single `variationId`. To learn more, read [Migration flags](https://launchdarkly.com/docs/home/flags/migration). 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
featureFlagKeystringRequired`format: "string"`
The feature flag key. The key identifies the flag in your code.
### Query Parameters
ignoreConflictsbooleanOptional
If true, the patch will be applied even if it causes a pending scheduled change or approval request to fail.
### Request
This endpoint expects an object.
patchlist of objectsRequired
A JSON patch representation of the change to make
Show 3 properties
commentstringOptional
Optional comment
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
400
Bad Request Error
401
Unauthorized Error
404
Not Found Error
405
Method Not Allowed Error
409
Conflict Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Perform a partial update to a feature flag. The request body must be a valid semantic patch, JSON patch, or JSON merge patch. To learn more the different formats, read [Updates](https://launchdarkly.com/docs/api#updates).
### Using semantic patches on a feature flag
To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch).
The body of a semantic patch request for updating feature flags takes the following properties:
 * `comment` (string): (Optional) A description of the update.
 * `environmentKey` (string): (Required for some instructions only) The key of the LaunchDarkly environment.
 * `instructions` (array): (Required) A list of actions the update should perform. Each action in the list must be an object with a `kind` property that indicates the instruction. If the action requires parameters, you must include those parameters as additional fields in the object. The body of a single semantic patch can contain many different instructions.
### Instructions
Semantic patch requests support the following `kind` instructions for updating feature flags.
Click to expand instructions for **turning flags on and off**
These instructions require the `environmentKey` parameter.
#### turnFlagOff
Sets the flag’s targeting state to **Off**.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [ { "kind": "turnFlagOff" } ]
4
| }
```
#### turnFlagOn
Sets the flag’s targeting state to **On**.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [ { "kind": "turnFlagOn" } ]
4
| }
```
Click to expand instructions for **working with targeting and variations**
These instructions require the `environmentKey` parameter.
Several of the instructions for working with targeting and variations require flag rule IDs, variation IDs, or clause IDs as parameters. Each of these are returned as part of the [Get feature flag](https://launchdarkly.com/docs/api/feature-flags/get-feature-flag) response. The flag rule ID is the `_id` field of each element in the `rules` array within each environment listed in the `environments` object. The variation ID is the `_id` field in each element of the `variations` array. The clause ID is the `_id` field of each element of the `clauses` array within the `rules` array within each environment listed in the `environments` object.
#### addClauses
Adds the given clauses to the rule indicated by `ruleId`.
##### Parameters
 * `ruleId`: ID of a rule in the flag.
 * `clauses`: Array of clause objects, with `contextKind` (string), `attribute` (string), `op` (string), `negate` (boolean), and `values` (array of strings, numbers, or dates) properties. The `contextKind`, `attribute`, and `values` are case sensitive. The `op` must be lower-case.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [{
4
| "kind": "addClauses",
5
| "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29",
6
| "clauses": [{
7
| "contextKind": "user",
8
| "attribute": "country",
9
| "op": "in",
10
| "negate": false,
11
| "values": ["USA", "Canada"]
12
| }]
13
| }]
14
| }
```
#### addPrerequisite
Adds the flag indicated by `key` with variation `variationId` as a prerequisite to the flag in the path parameter.
##### Parameters
 * `key`: Flag key of the prerequisite flag.
 * `variationId`: ID of a variation of the prerequisite flag.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [{
4
| "kind": "addPrerequisite",
5
| "key": "example-prereq-flag-key",
6
| "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00"
7
| }]
8
| }
```
#### addRule
Adds a new targeting rule to the flag. The rule may contain `clauses` and serve the variation that `variationId` indicates, or serve a percentage rollout that `rolloutWeights`, `rolloutBucketBy`, and `rolloutContextKind` indicate.
If you set `beforeRuleId`, this adds the new rule before the indicated rule. Otherwise, adds the new rule to the end of the list.
##### Parameters
 * `clauses`: Array of clause objects, with `contextKind` (string), `attribute` (string), `op` (string), `negate` (boolean), and `values` (array of strings, numbers, or dates) properties. The `contextKind`, `attribute`, and `values` are case sensitive. The `op` must be lower-case.
 * `beforeRuleId`: (Optional) ID of a flag rule.
 * Either
 * `variationId`: ID of a variation of the flag.
or
 * `rolloutWeights`: (Optional) Map of `variationId` to weight, in thousandths of a percent (0-100000).
 * `rolloutBucketBy`: (Optional) Context attribute available in the specified `rolloutContextKind`.
 * `rolloutContextKind`: (Optional) Context kind, defaults to `user`
Here’s an example that uses a `variationId`:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [{
4
| "kind": "addRule",
5
| "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00",
6
| "clauses": [{
7
| "contextKind": "organization",
8
| "attribute": "located_in",
9
| "op": "in",
10
| "negate": false,
11
| "values": ["Sweden", "Norway"]
12
| }]
13
| }]
14
| }
```
Here’s an example that uses a percentage rollout:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [{
4
| "kind": "addRule",
5
| "clauses": [{
6
| "contextKind": "organization",
7
| "attribute": "located_in",
8
| "op": "in",
9
| "negate": false,
10
| "values": ["Sweden", "Norway"]
11
| }],
12
| "rolloutContextKind": "organization",
13
| "rolloutWeights": {
14
| "2f43f67c-3e4e-4945-a18a-26559378ca00": 15000, // serve 15% this variation
15
| "e5830889-1ec5-4b0c-9cc9-c48790090c43": 85000 // serve 85% this variation
16
| }
17
| }]
18
| }
```
#### addTargets
Adds context keys to the individual context targets for the context kind that `contextKind` specifies and the variation that `variationId` specifies. Returns an error if this causes the flag to target the same context key in multiple variations.
##### Parameters
 * `values`: List of context keys.
 * `contextKind`: (Optional) Context kind to target, defaults to `user`
 * `variationId`: ID of a variation on the flag.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [{
4
| "kind": "addTargets",
5
| "values": ["context-key-123abc", "context-key-456def"],
6
| "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00"
7
| }]
8
| }
```
#### addUserTargets
Adds user keys to the individual user targets for the variation that `variationId` specifies. Returns an error if this causes the flag to target the same user key in multiple variations. If you are working with contexts, use `addTargets` instead of this instruction.
##### Parameters
 * `values`: List of user keys.
 * `variationId`: ID of a variation on the flag.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [{
4
| "kind": "addUserTargets",
5
| "values": ["user-key-123abc", "user-key-456def"],
6
| "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00"
7
| }]
8
| }
```
#### addValuesToClause
Adds `values` to the values of the clause that `ruleId` and `clauseId` indicate. Does not update the context kind, attribute, or operator.
##### Parameters
 * `ruleId`: ID of a rule in the flag.
 * `clauseId`: ID of a clause in that rule.
 * `values`: Array of strings, case sensitive.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [{
4
| "kind": "addValuesToClause",
5
| "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29",
6
| "clauseId": "10a58772-3121-400f-846b-b8a04e8944ed",
7
| "values": ["beta_testers"]
8
| }]
9
| }
```
#### addVariation
Adds a variation to the flag.
##### Parameters
 * `value`: The variation value.
 * `name`: (Optional) The variation name.
 * `description`: (Optional) A description for the variation.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "addVariation", "value": 20, "name": "New variation" } ]
3
| }
```
#### clearTargets
Removes all individual targets from the variation that `variationId` specifies. This includes both user and non-user targets.
##### Parameters
 * `variationId`: ID of a variation on the flag.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [ { "kind": "clearTargets", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" } ]
4
| }
```
#### clearUserTargets
Removes all individual user targets from the variation that `variationId` specifies. If you are working with contexts, use `clearTargets` instead of this instruction.
##### Parameters
 * `variationId`: ID of a variation on the flag.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [ { "kind": "clearUserTargets", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" } ]
4
| }
```
#### removeClauses
Removes the clauses specified by `clauseIds` from the rule indicated by `ruleId`.
##### Parameters
 * `ruleId`: ID of a rule in the flag.
 * `clauseIds`: Array of IDs of clauses in the rule.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [{
4
| "kind": "removeClauses",
5
| "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29",
6
| "clauseIds": ["10a58772-3121-400f-846b-b8a04e8944ed", "36a461dc-235e-4b08-97b9-73ce9365873e"]
7
| }]
8
| }
```
#### removePrerequisite
Removes the prerequisite flag indicated by `key`. Does nothing if this prerequisite does not exist.
##### Parameters
 * `key`: Flag key of an existing prerequisite flag.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [ { "kind": "removePrerequisite", "key": "prereq-flag-key-123abc" } ]
4
| }
```
#### removeRule
Removes the targeting rule specified by `ruleId`. Does nothing if the rule does not exist.
##### Parameters
 * `ruleId`: ID of a rule in the flag.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [ { "kind": "removeRule", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29" } ]
4
| }
```
#### removeTargets
Removes context keys from the individual context targets for the context kind that `contextKind` specifies and the variation that `variationId` specifies. Does nothing if the flag does not target the context keys.
##### Parameters
 * `values`: List of context keys.
 * `contextKind`: (Optional) Context kind to target, defaults to `user`
 * `variationId`: ID of a flag variation.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [{
4
| "kind": "removeTargets",
5
| "values": ["context-key-123abc", "context-key-456def"],
6
| "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00"
7
| }]
8
| }
```
#### removeUserTargets
Removes user keys from the individual user targets for the variation that `variationId` specifies. Does nothing if the flag does not target the user keys. If you are working with contexts, use `removeTargets` instead of this instruction.
##### Parameters
 * `values`: List of user keys.
 * `variationId`: ID of a flag variation.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [{
4
| "kind": "removeUserTargets",
5
| "values": ["user-key-123abc", "user-key-456def"],
6
| "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00"
7
| }]
8
| }
```
#### removeValuesFromClause
Removes `values` from the values of the clause indicated by `ruleId` and `clauseId`. Does not update the context kind, attribute, or operator.
##### Parameters
 * `ruleId`: ID of a rule in the flag.
 * `clauseId`: ID of a clause in that rule.
 * `values`: Array of strings, case sensitive.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [{
4
| "kind": "removeValuesFromClause",
5
| "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29",
6
| "clauseId": "10a58772-3121-400f-846b-b8a04e8944ed",
7
| "values": ["beta_testers"]
8
| }]
9
| }
```
#### removeVariation
Removes a variation from the flag.
##### Parameters
 * `variationId`: ID of a variation of the flag to remove.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "removeVariation", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" } ]
3
| }
```
#### reorderRules
Rearranges the rules to match the order given in `ruleIds`. Returns an error if `ruleIds` does not match the current set of rules on the flag.
##### Parameters
 * `ruleIds`: Array of IDs of all rules in the flag.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [{
4
| "kind": "reorderRules",
5
| "ruleIds": ["a902ef4a-2faf-4eaf-88e1-ecc356708a29", "63c238d1-835d-435e-8f21-c8d5e40b2a3d"]
6
| }]
7
| }
```
#### replacePrerequisites
Removes all existing prerequisites and replaces them with the list you provide.
##### Parameters
 * `prerequisites`: A list of prerequisites. Each item in the list must include a flag `key` and `variationId`.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [
4
| {
5
| "kind": "replacePrerequisites",
6
| "prerequisites": [
7
| {
8
| "key": "prereq-flag-key-123abc",
9
| "variationId": "10a58772-3121-400f-846b-b8a04e8944ed"
10
| },
11
| {
12
| "key": "another-prereq-flag-key-456def",
13
| "variationId": "e5830889-1ec5-4b0c-9cc9-c48790090c43"
14
| }
15
| ]
16
| }
17
| ]
18
| }
```
#### replaceRules
Removes all targeting rules for the flag and replaces them with the list you provide.
##### Parameters
 * `rules`: A list of rules.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [
4
| {
5
| "kind": "replaceRules",
6
| "rules": [
7
| {
8
| "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00",
9
| "description": "My new rule",
10
| "clauses": [
11
| {
12
| "contextKind": "user",
13
| "attribute": "segmentMatch",
14
| "op": "segmentMatch",
15
| "values": ["test"]
16
| }
17
| ],
18
| "trackEvents": true
19
| }
20
| ]
21
| }
22
| ]
23
| }
```
#### replaceTargets
Removes all existing targeting and replaces it with the list of targets you provide.
##### Parameters
 * `targets`: A list of context targeting. Each item in the list includes an optional `contextKind` that defaults to `user`, a required `variationId`, and a required list of `values`.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [
4
| {
5
| "kind": "replaceTargets",
6
| "targets": [
7
| {
8
| "contextKind": "user",
9
| "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00",
10
| "values": ["user-key-123abc"]
11
| },
12
| {
13
| "contextKind": "device",
14
| "variationId": "e5830889-1ec5-4b0c-9cc9-c48790090c43",
15
| "values": ["device-key-456def"]
16
| }
17
| ]
18
| } 
19
| ]
20
| }
```
#### replaceUserTargets
Removes all existing user targeting and replaces it with the list of targets you provide. In the list of targets, you must include a target for each of the flag’s variations. If you are working with contexts, use `replaceTargets` instead of this instruction.
##### Parameters
 * `targets`: A list of user targeting. Each item in the list must include a `variationId` and a list of `values`.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [
4
| {
5
| "kind": "replaceUserTargets",
6
| "targets": [
7
| {
8
| "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00",
9
| "values": ["user-key-123abc", "user-key-456def"]
10
| },
11
| {
12
| "variationId": "e5830889-1ec5-4b0c-9cc9-c48790090c43",
13
| "values": ["user-key-789ghi"]
14
| }
15
| ]
16
| }
17
| ]
18
| }
```
#### updateClause
Replaces the clause indicated by `ruleId` and `clauseId` with `clause`.
##### Parameters
 * `ruleId`: ID of a rule in the flag.
 * `clauseId`: ID of a clause in that rule.
 * `clause`: New `clause` object, with `contextKind` (string), `attribute` (string), `op` (string), `negate` (boolean), and `values` (array of strings, numbers, or dates) properties. The `contextKind`, `attribute`, and `values` are case sensitive. The `op` must be lower-case.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [{
4
| "kind": "updateClause",
5
| "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29",
6
| "clauseId": "10c7462a-2062-45ba-a8bb-dfb3de0f8af5",
7
| "clause": {
8
| "contextKind": "user",
9
| "attribute": "country",
10
| "op": "in",
11
| "negate": false,
12
| "values": ["Mexico", "Canada"]
13
| }
14
| }]
15
| }
```
#### updateDefaultVariation
Updates the default on or off variation of the flag.
##### Parameters
 * `onVariationValue`: (Optional) The value of the variation of the new on variation.
 * `offVariationValue`: (Optional) The value of the variation of the new off variation
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "updateDefaultVariation", "OnVariationValue": true, "OffVariationValue": false } ]
3
| }
```
#### updateFallthroughVariationOrRollout
Updates the default or “fallthrough” rule for the flag, which the flag serves when a context matches none of the targeting rules. The rule can serve either the variation that `variationId` indicates, or a percentage rollout that `rolloutWeights` and `rolloutBucketBy` indicate.
##### Parameters
 * `variationId`: ID of a variation of the flag.
or
 * `rolloutWeights`: Map of `variationId` to weight, in thousandths of a percent (0-100000).
 * `rolloutBucketBy`: (Optional) Context attribute available in the specified `rolloutContextKind`.
 * `rolloutContextKind`: (Optional) Context kind, defaults to `user`
Here’s an example that uses a `variationId`:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [{
4
| "kind": "updateFallthroughVariationOrRollout",
5
| "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00"
6
| }]
7
| }
```
Here’s an example that uses a percentage rollout:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [{
4
| "kind": "updateFallthroughVariationOrRollout",
5
| "rolloutContextKind": "user",
6
| "rolloutWeights": {
7
| "2f43f67c-3e4e-4945-a18a-26559378ca00": 15000, // serve 15% this variation
8
| "e5830889-1ec5-4b0c-9cc9-c48790090c43": 85000 // serve 85% this variation
9
| }
10
| }]
11
| }
```
#### updateOffVariation
Updates the default off variation to `variationId`. The flag serves the default off variation when the flag’s targeting is **Off**.
##### Parameters
 * `variationId`: ID of a variation of the flag.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [ { "kind": "updateOffVariation", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" } ]
4
| }
```
#### updatePrerequisite
Changes the prerequisite flag that `key` indicates to use the variation that `variationId` indicates. Returns an error if this prerequisite does not exist.
##### Parameters
 * `key`: Flag key of an existing prerequisite flag.
 * `variationId`: ID of a variation of the prerequisite flag.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [{
4
| "kind": "updatePrerequisite",
5
| "key": "example-prereq-flag-key",
6
| "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00"
7
| }]
8
| }
```
#### updateRuleDescription
Updates the description of the feature flag rule.
##### Parameters
 * `description`: The new human-readable description for this rule.
 * `ruleId`: The ID of the rule. You can retrieve this by making a GET request for the flag.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [{
4
| "kind": "updateRuleDescription",
5
| "description": "New rule description",
6
| "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29"
7
| }]
8
| }
```
#### updateRuleTrackEvents
Updates whether or not LaunchDarkly tracks events for the feature flag associated with this rule.
##### Parameters
 * `ruleId`: The ID of the rule. You can retrieve this by making a GET request for the flag.
 * `trackEvents`: Whether or not events are tracked.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [{
4
| "kind": "updateRuleTrackEvents",
5
| "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29",
6
| "trackEvents": true
7
| }]
8
| }
```
#### updateRuleVariationOrRollout
Updates what `ruleId` serves when its clauses evaluate to true. The rule can serve either the variation that `variationId` indicates, or a percent rollout that `rolloutWeights` and `rolloutBucketBy` indicate.
##### Parameters
 * `ruleId`: ID of a rule in the flag.
 * `variationId`: ID of a variation of the flag.
or
 * `rolloutWeights`: Map of `variationId` to weight, in thousandths of a percent (0-100000).
 * `rolloutBucketBy`: (Optional) Context attribute available in the specified `rolloutContextKind`.
 * `rolloutContextKind`: (Optional) Context kind, defaults to `user`
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [{
4
| "kind": "updateRuleVariationOrRollout",
5
| "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29",
6
| "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00"
7
| }]
8
| }
```
#### updateTrackEvents
Updates whether or not LaunchDarkly tracks events for the feature flag, for all rules.
##### Parameters
 * `trackEvents`: Whether or not events are tracked.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [ { "kind": "updateTrackEvents", "trackEvents": true } ]
4
| }
```
#### updateTrackEventsFallthrough
Updates whether or not LaunchDarkly tracks events for the feature flag, for the default rule.
##### Parameters
 * `trackEvents`: Whether or not events are tracked.
Here’s an example:
```
1
| {
---|--- 
2
| "environmentKey": "environment-key-123abc",
3
| "instructions": [ { "kind": "updateTrackEventsFallthrough", "trackEvents": true } ]
4
| }
```
#### updateVariation
Updates a variation of the flag.
##### Parameters
 * `variationId`: The ID of the variation to update.
 * `name`: (Optional) The updated variation name.
 * `value`: (Optional) The updated variation value.
 * `description`: (Optional) The updated variation description.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "updateVariation", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00", "value": 20 } ]
3
| }
```
Click to expand instructions for **updating flag settings**
These instructions do not require the `environmentKey` parameter. They make changes that apply to the flag across all environments.
#### addCustomProperties
Adds a new custom property to the feature flag. Custom properties are used to associate feature flags with LaunchDarkly integrations. For example, if you create an integration with an issue tracking service, you may want to associate a flag with a list of issues related to a feature’s development.
##### Parameters
 * `key`: The custom property key.
 * `name`: The custom property name.
 * `values`: A list of the associated values for the custom property.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "addCustomProperties",
4
| "key": "example-custom-property",
5
| "name": "Example custom property",
6
| "values": ["value1", "value2"]
7
| }]
8
| }
```
#### addTags
Adds tags to the feature flag.
##### Parameters
 * `values`: A list of tags to add.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "addTags", "values": ["tag1", "tag2"] } ]
3
| }
```
#### makeFlagPermanent
Marks the feature flag as permanent. LaunchDarkly does not prompt you to remove permanent flags, even if one variation is rolled out to all your customers.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "makeFlagPermanent" } ]
3
| }
```
#### makeFlagTemporary
Marks the feature flag as temporary.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "makeFlagTemporary" } ]
3
| }
```
#### removeCustomProperties
Removes the associated values from a custom property. If all the associated values are removed, this instruction also removes the custom property.
##### Parameters
 * `key`: The custom property key.
 * `values`: A list of the associated values to remove from the custom property.
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "replaceCustomProperties",
4
| "key": "example-custom-property",
5
| "values": ["value1", "value2"]
6
| }]
7
| }
```
#### removeMaintainer
Removes the flag’s maintainer. To set a new maintainer, use the `updateMaintainerMember` or `updateMaintainerTeam` instructions.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "removeMaintainer" } ]
3
| }
```
#### removeTags
Removes tags from the feature flag.
##### Parameters
 * `values`: A list of tags to remove.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "removeTags", "values": ["tag1", "tag2"] } ]
3
| }
```
#### replaceCustomProperties
Replaces the existing associated values for a custom property with the new values.
##### Parameters
 * `key`: The custom property key.
 * `name`: The custom property name.
 * `values`: A list of the new associated values for the custom property.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [{
3
| "kind": "replaceCustomProperties",
4
| "key": "example-custom-property",
5
| "name": "Example custom property",
6
| "values": ["value1", "value2"]
7
| }]
8
| }
```
#### turnOffClientSideAvailability
Turns off client-side SDK availability for the flag. This is equivalent to unchecking the **SDKs using Mobile key** and/or **SDKs using Client-side ID** boxes for the flag. If you’re using a client-side or mobile SDK, you must expose your feature flags in order for the client-side or mobile SDKs to evaluate them.
##### Parameters
 * `value`: Use “usingMobileKey” to turn off availability for mobile SDKs. Use “usingEnvironmentId” to turn on availability for client-side SDKs.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "turnOffClientSideAvailability", "value": "usingMobileKey" } ]
3
| }
```
#### turnOnClientSideAvailability
Turns on client-side SDK availability for the flag. This is equivalent to checking the **SDKs using Mobile key** and/or **SDKs using Client-side ID** boxes for the flag. If you’re using a client-side or mobile SDK, you must expose your feature flags in order for the client-side or mobile SDKs to evaluate them.
##### Parameters
 * `value`: Use “usingMobileKey” to turn on availability for mobile SDKs. Use “usingEnvironmentId” to turn on availability for client-side SDKs.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "turnOnClientSideAvailability", "value": "usingMobileKey" } ]
3
| }
```
#### updateDescription
Updates the feature flag description.
##### Parameters
 * `value`: The new description.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "updateDescription", "value": "Updated flag description" } ]
3
| }
```
#### updateMaintainerMember
Updates the maintainer of the flag to an existing member and removes the existing maintainer.
##### Parameters
 * `value`: The ID of the member.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "updateMaintainerMember", "value": "61e9b714fd47591727db558a" } ]
3
| }
```
#### updateMaintainerTeam
Updates the maintainer of the flag to an existing team and removes the existing maintainer.
##### Parameters
 * `value`: The key of the team.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "updateMaintainerTeam", "value": "example-team-key" } ]
3
| }
```
#### updateName
Updates the feature flag name.
##### Parameters
 * `value`: The new name.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "updateName", "value": "Updated flag name" } ]
3
| }
```
Click to expand instructions for **updating the flag lifecycle**
These instructions do not require the `environmentKey` parameter. They make changes that apply to the flag across all environments.
#### archiveFlag
Archives the feature flag. This retires it from LaunchDarkly without deleting it. You cannot archive a flag that is a prerequisite of other flags.
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "archiveFlag" } ]
3
| }
```
#### deleteFlag
Deletes the feature flag and its rules. You cannot restore a deleted flag. If this flag is requested again, the flag value defined in code will be returned for all contexts.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "deleteFlag" } ]
3
| }
```
#### deprecateFlag
Deprecates the feature flag. This hides it from the live flags list without archiving or deleting it.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "deprecateFlag" } ]
3
| }
```
#### restoreDeprecatedFlag
Restores the feature flag if it was previously deprecated.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "restoreDeprecatedFlag" } ]
3
| }
```
#### restoreFlag
Restores the feature flag if it was previously archived.
Here’s an example:
```
1
| {
---|--- 
2
| "instructions": [ { "kind": "restoreFlag" } ]
3
| }
```
### Using JSON patches on a feature flag
If you do not include the semantic patch header described above, you can use a [JSON patch](https://launchdarkly.com/docs/api#updates-using-json-patch) or [JSON merge patch](https://datatracker.ietf.org/doc/html/rfc7386) representation of the desired changes.
In the JSON patch representation, use a JSON pointer in the `path` element to describe what field to change. Use the [Get feature flag](https://launchdarkly.com/docs/api/feature-flags/get-feature-flag) endpoint to find the field you want to update.
There are a few special cases to keep in mind when determining the value of the `path` element:
 * To add an individual target to a specific variation if the flag variation already has individual targets, the path for the JSON patch operation is:
```
1
| [
---|--- 
2
| {
3
| "op": "add",
4
| "path": "/environments/devint/targets/0/values/-",
5
| "value": "TestClient10"
6
| }
7
| ]
```
 * To add an individual target to a specific variation if the flag variation does not already have individual targets, the path for the JSON patch operation is:
```
1
| [
---|--- 
2
| {
3
| "op": "add",
4
| "path": "/environments/devint/targets/-",
5
| "value": { "variation": 0, "values": ["TestClient10"] }
6
| }
7
| ]
```
 * To add a flag to a release pipeline, the path for the JSON patch operation is:
```
1
| [
---|--- 
2
| {
3
| "op": "add",
4
| "path": "/releasePipelineKey",
5
| "value": "example-release-pipeline-key"
6
| }
7
| ]
```
### Required approvals
If a request attempts to alter a flag configuration in an environment where approvals are required for the flag, the request will fail with a 405. Changes to the flag configuration in that environment will require creating an [approval request](https://launchdarkly.com/docs/api/approvals).
### Conflicts
If a flag configuration change made through this endpoint would cause a pending scheduled change or approval request to fail, this endpoint will return a 400. You can ignore this check by adding an `ignoreConflicts` query parameter set to `true`.
### Migration flags
For migration flags, the cohort information is included in the `rules` property of a flag’s response. You can update cohorts by updating `rules`. Default cohort information is included in the `fallthrough` property of a flag’s response. You can update the default cohort by updating `fallthrough`. When you update the rollout for a cohort or the default cohort through the API, provide a rollout instead of a single `variationId`. To learn more, read [Migration flags](https://launchdarkly.com/docs/home/flags/migration).