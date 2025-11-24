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
/api/v2/projects/:projectKey/ai-configs/:configKey/targeting
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/ai-configs/configKey/targeting"
4
| 
5
| payload = {
6
| "environmentKey": "environmentKey",
7
| "instructions": [{ "key": "" }, { "key": "" }],
8
| "comment": "comment"
9
| }
10
| headers = {
11
| "LD-API-Version": "beta",
12
| "Authorization": "<apiKey>",
13
| "Content-Type": "application/json"
14
| }
15
| 
16
| response = requests.patch(url, json=payload, headers=headers)
17
| 
18
| print(response.json())
```
[](/docs/api/ai-configs-beta/patch-ai-config-targeting?explorer=true)
200Updated
```
1
| {
---|--- 
2
| "createdAt": 0,
3
| "environments": {
4
| "key": {
5
| "contextTargets": [
6
| {
7
| "contextKind": "contextKind",
8
| "values": [
9
| "values",
10
| "values"
11
| ],
12
| "variation": 5
13
| },
14
| {
15
| "contextKind": "contextKind",
16
| "values": [
17
| "values",
18
| "values"
19
| ],
20
| "variation": 5
21
| }
22
| ],
23
| "enabled": true,
24
| "fallthrough": {
25
| "variation": 5,
26
| "rollout": {
27
| "contextKind": "contextKind",
28
| "variations": [
29
| {
30
| "variation": 9,
31
| "weight": 3,
32
| "_untracked": true
33
| },
34
| {
35
| "variation": 9,
36
| "weight": 3,
37
| "_untracked": true
38
| }
39
| ],
40
| "bucketBy": "bucketBy",
41
| "experimentAllocation": {
42
| "canReshuffle": true,
43
| "defaultVariation": 2,
44
| "type": "type"
45
| },
46
| "seed": 7
47
| }
48
| },
49
| "lastModified": 2,
50
| "rules": [
51
| {
52
| "clauses": [
53
| {
54
| "attribute": "attribute",
55
| "id": "id",
56
| "negate": true,
57
| "op": "op",
58
| "values": [
59
| "",
60
| ""
61
| ]
62
| },
63
| {
64
| "attribute": "attribute",
65
| "id": "id",
66
| "negate": true,
67
| "op": "op",
68
| "values": [
69
| "",
70
| ""
71
| ]
72
| }
73
| ],
74
| "trackEvents": true
75
| },
76
| {
77
| "clauses": [
78
| {
79
| "attribute": "attribute",
80
| "id": "id",
81
| "negate": true,
82
| "op": "op",
83
| "values": [
84
| "",
85
| ""
86
| ]
87
| },
88
| {
89
| "attribute": "attribute",
90
| "id": "id",
91
| "negate": true,
92
| "op": "op",
93
| "values": [
94
| "",
95
| ""
96
| ]
97
| }
98
| ],
99
| "trackEvents": true
100
| }
101
| ],
102
| "targets": [
103
| {
104
| "contextKind": "contextKind",
105
| "values": [
106
| "values",
107
| "values"
108
| ],
109
| "variation": 5
110
| },
111
| {
112
| "contextKind": "contextKind",
113
| "values": [
114
| "values",
115
| "values"
116
| ],
117
| "variation": 5
118
| }
119
| ],
120
| "trackEvents": true,
121
| "trackEventsFallthrough": true,
122
| "_environmentName": "_environmentName",
123
| "_version": 7,
124
| "offVariation": 4
125
| }
126
| },
127
| "experiments": {
128
| "baselineIdx": 1,
129
| "items": [
130
| {
131
| "metricKey": "my-metric",
132
| "_metric": {
133
| "_id": "5902deadbeef667524a01290",
134
| "_versionId": "version-id-123abc",
135
| "key": "metric-key-123abc",
136
| "name": "My metric",
137
| "kind": "custom",
138
| "_links": {
139
| "parent": {
140
| "href": "/api/v2/metrics/my-project",
141
| "type": "application/json"
142
| },
143
| "self": {
144
| "href": "/api/v2/metrics/my-project/my-metric",
145
| "type": "application/json"
146
| }
147
| },
148
| "tags": [],
149
| "_creationDate": 1,
150
| "dataSource": {
151
| "key": "key",
152
| "environmentKey": "environmentKey",
153
| "_name": "_name",
154
| "_integrationKey": "_integrationKey"
155
| },
156
| "experimentCount": 0,
157
| "metricGroupCount": 0,
158
| "guardedRolloutCount": 0,
159
| "activeExperimentCount": 2,
160
| "activeGuardedRolloutCount": 1,
161
| "_version": 1,
162
| "_attachedFlagCount": 0,
163
| "_site": {
164
| "href": "href",
165
| "type": "type"
166
| },
167
| "_access": {
168
| "denied": [
169
| {
170
| "action": "action",
171
| "reason": {
172
| "effect": "allow",
173
| "resources": [
174
| "proj/*:env/*;qa_*:/flag/*"
175
| ],
176
| "notResources": [
177
| "notResources",
178
| "notResources"
179
| ],
180
| "actions": [
181
| "*"
182
| ],
183
| "notActions": [
184
| "string",
185
| "string"
186
| ],
187
| "role_name": "role_name"
188
| }
189
| },
190
| {
191
| "action": "action",
192
| "reason": {
193
| "effect": "allow",
194
| "resources": [
195
| "proj/*:env/*;qa_*:/flag/*"
196
| ],
197
| "notResources": [
198
| "notResources",
199
| "notResources"
200
| ],
201
| "actions": [
202
| "*"
203
| ],
204
| "notActions": [
205
| "string",
206
| "string"
207
| ],
208
| "role_name": "role_name"
209
| }
210
| }
211
| ],
212
| "allowed": [
213
| {
214
| "action": "action",
215
| "reason": {
216
| "effect": "allow",
217
| "resources": [
218
| "proj/*:env/*;qa_*:/flag/*"
219
| ],
220
| "notResources": [
221
| "notResources",
222
| "notResources"
223
| ],
224
| "actions": [
225
| "*"
226
| ],
227
| "notActions": [
228
| "string",
229
| "string"
230
| ],
231
| "role_name": "role_name"
232
| }
233
| },
234
| {
235
| "action": "action",
236
| "reason": {
237
| "effect": "allow",
238
| "resources": [
239
| "proj/*:env/*;qa_*:/flag/*"
240
| ],
241
| "notResources": [
242
| "notResources",
243
| "notResources"
244
| ],
245
| "actions": [
246
| "*"
247
| ],
248
| "notActions": [
249
| "string",
250
| "string"
251
| ],
252
| "role_name": "role_name"
253
| }
254
| }
255
| ]
256
| },
257
| "lastModified": {
258
| "date": "2021-08-05T19:46:31.148Z"
259
| },
260
| "maintainerId": "569fdeadbeef1644facecafe",
261
| "_maintainer": {
262
| "_links": {
263
| "self": {
264
| "href": "/api/v2/members/569f183514f4432160000007",
265
| "type": "application/json"
266
| }
267
| },
268
| "_id": "569f183514f4432160000007",
269
| "role": "admin",
270
| "email": "ariel@acme.com",
271
| "firstName": "Ariel",
272
| "lastName": "Flores"
273
| },
274
| "description": "description",
275
| "category": "Error monitoring",
276
| "isNumeric": true,
277
| "successCriteria": "HigherThanBaseline",
278
| "unit": "unit",
279
| "eventKey": "Order placed",
280
| "randomizationUnits": [
281
| "user"
282
| ],
283
| "filters": {
284
| "type": "contextAttribute",
285
| "op": "op",
286
| "values": [
287
| "JP"
288
| ],
289
| "negate": false,
290
| "attribute": "country",
291
| "contextKind": "user"
292
| },
293
| "unitAggregationType": "average",
294
| "analysisType": "mean",
295
| "percentileValue": 95,
296
| "eventDefault": {
297
| "disabled": true,
298
| "value": 0
299
| },
300
| "archived": true,
301
| "archivedAt": 1,
302
| "selector": "selector",
303
| "urls": [
304
| {},
305
| {}
306
| ]
307
| },
308
| "environments": [
309
| "production",
310
| "test",
311
| "my-environment"
312
| ],
313
| "_environmentSettings": {
314
| "key": {
315
| "startDate": 6,
316
| "stopDate": 7,
317
| "enabledPeriods": [
318
| {
319
| "startDate": 1,
320
| "stopDate": 4
321
| },
322
| {
323
| "startDate": 1,
324
| "stopDate": 4
325
| }
326
| ]
327
| }
328
| }
329
| },
330
| {
331
| "metricKey": "my-metric",
332
| "_metric": {
333
| "_id": "5902deadbeef667524a01290",
334
| "_versionId": "version-id-123abc",
335
| "key": "metric-key-123abc",
336
| "name": "My metric",
337
| "kind": "custom",
338
| "_links": {
339
| "parent": {
340
| "href": "/api/v2/metrics/my-project",
341
| "type": "application/json"
342
| },
343
| "self": {
344
| "href": "/api/v2/metrics/my-project/my-metric",
345
| "type": "application/json"
346
| }
347
| },
348
| "tags": [],
349
| "_creationDate": 1,
350
| "dataSource": {
351
| "key": "key",
352
| "environmentKey": "environmentKey",
353
| "_name": "_name",
354
| "_integrationKey": "_integrationKey"
355
| },
356
| "experimentCount": 0,
357
| "metricGroupCount": 0,
358
| "guardedRolloutCount": 0,
359
| "activeExperimentCount": 2,
360
| "activeGuardedRolloutCount": 1,
361
| "_version": 1,
362
| "_attachedFlagCount": 0,
363
| "_site": {
364
| "href": "href",
365
| "type": "type"
366
| },
367
| "_access": {
368
| "denied": [
369
| {
370
| "action": "action",
371
| "reason": {
372
| "effect": "allow",
373
| "resources": [
374
| "proj/*:env/*;qa_*:/flag/*"
375
| ],
376
| "notResources": [
377
| "notResources",
378
| "notResources"
379
| ],
380
| "actions": [
381
| "*"
382
| ],
383
| "notActions": [
384
| "string",
385
| "string"
386
| ],
387
| "role_name": "role_name"
388
| }
389
| },
390
| {
391
| "action": "action",
392
| "reason": {
393
| "effect": "allow",
394
| "resources": [
395
| "proj/*:env/*;qa_*:/flag/*"
396
| ],
397
| "notResources": [
398
| "notResources",
399
| "notResources"
400
| ],
401
| "actions": [
402
| "*"
403
| ],
404
| "notActions": [
405
| "string",
406
| "string"
407
| ],
408
| "role_name": "role_name"
409
| }
410
| }
411
| ],
412
| "allowed": [
413
| {
414
| "action": "action",
415
| "reason": {
416
| "effect": "allow",
417
| "resources": [
418
| "proj/*:env/*;qa_*:/flag/*"
419
| ],
420
| "notResources": [
421
| "notResources",
422
| "notResources"
423
| ],
424
| "actions": [
425
| "*"
426
| ],
427
| "notActions": [
428
| "string",
429
| "string"
430
| ],
431
| "role_name": "role_name"
432
| }
433
| },
434
| {
435
| "action": "action",
436
| "reason": {
437
| "effect": "allow",
438
| "resources": [
439
| "proj/*:env/*;qa_*:/flag/*"
440
| ],
441
| "notResources": [
442
| "notResources",
443
| "notResources"
444
| ],
445
| "actions": [
446
| "*"
447
| ],
448
| "notActions": [
449
| "string",
450
| "string"
451
| ],
452
| "role_name": "role_name"
453
| }
454
| }
455
| ]
456
| },
457
| "lastModified": {
458
| "date": "2021-08-05T19:46:31.148Z"
459
| },
460
| "maintainerId": "569fdeadbeef1644facecafe",
461
| "_maintainer": {
462
| "_links": {
463
| "self": {
464
| "href": "/api/v2/members/569f183514f4432160000007",
465
| "type": "application/json"
466
| }
467
| },
468
| "_id": "569f183514f4432160000007",
469
| "role": "admin",
470
| "email": "ariel@acme.com",
471
| "firstName": "Ariel",
472
| "lastName": "Flores"
473
| },
474
| "description": "description",
475
| "category": "Error monitoring",
476
| "isNumeric": true,
477
| "successCriteria": "HigherThanBaseline",
478
| "unit": "unit",
479
| "eventKey": "Order placed",
480
| "randomizationUnits": [
481
| "user"
482
| ],
483
| "filters": {
484
| "type": "contextAttribute",
485
| "op": "op",
486
| "values": [
487
| "JP"
488
| ],
489
| "negate": false,
490
| "attribute": "country",
491
| "contextKind": "user"
492
| },
493
| "unitAggregationType": "average",
494
| "analysisType": "mean",
495
| "percentileValue": 95,
496
| "eventDefault": {
497
| "disabled": true,
498
| "value": 0
499
| },
500
| "archived": true,
501
| "archivedAt": 1,
502
| "selector": "selector",
503
| "urls": [
504
| {},
505
| {}
506
| ]
507
| },
508
| "environments": [
509
| "production",
510
| "test",
511
| "my-environment"
512
| ],
513
| "_environmentSettings": {
514
| "key": {
515
| "startDate": 6,
516
| "stopDate": 7,
517
| "enabledPeriods": [
518
| {
519
| "startDate": 1,
520
| "stopDate": 4
521
| },
522
| {
523
| "startDate": 1,
524
| "stopDate": 4
525
| }
526
| ]
527
| }
528
| }
529
| }
530
| ]
531
| },
532
| "key": "key",
533
| "name": "name",
534
| "tags": [
535
| "tags",
536
| "tags"
537
| ],
538
| "variations": [
539
| {
540
| "_id": "_id",
541
| "description": "description",
542
| "name": "name",
543
| "value": {}
544
| },
545
| {
546
| "_id": "_id",
547
| "description": "description",
548
| "name": "name",
549
| "value": {}
550
| }
551
| ],
552
| "_version": 5,
553
| "defaults": {
554
| "onVariation": 6,
555
| "offVariation": 1
556
| }
557
| }
```
Perform a partial update to an AI Config's targeting. The request body must be a valid semantic patch. ### Using semantic patches on an AI Config To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch). The body of a semantic patch request for updating an AI Config's targeting takes the following properties: * `comment` (string): (Optional) A description of the update. * `environmentKey` (string): The key of the LaunchDarkly environment. * `instructions` (array): (Required) A list of actions the update should perform. Each action in the list must be an object with a `kind` property that indicates the instruction. If the action requires parameters, you must include those parameters as additional fields in the object. The body of a single semantic patch can contain many different instructions. ### Instructions Semantic patch requests support the following `kind` instructions for updating AI Configs. <details> <summary>Click to expand instructions for <strong>working with targeting and variations</strong> for AI Configs</summary> #### addClauses Adds the given clauses to the rule indicated by `ruleId`. ##### Parameters - `ruleId`: ID of a rule in the AI Config. - `clauses`: Array of clause objects, with `contextKind` (string), `attribute` (string), `op` (string), `negate` (boolean), and `values` (array of strings, numbers, or dates) properties. The `contextKind`, `attribute`, and `values` are case sensitive. The `op` must be lower-case. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "addClauses", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", "clauses": [{ "contextKind": "user", "attribute": "country", "op": "in", "negate": false, "values": ["USA", "Canada"] }] }] } ``` #### addRule Adds a new targeting rule to the AI Config. The rule may contain `clauses` and serve the variation that `variationId` indicates, or serve a percentage rollout that `rolloutWeights`, `rolloutBucketBy`, and `rolloutContextKind` indicate. If you set `beforeRuleId`, this adds the new rule before the indicated rule. Otherwise, adds the new rule to the end of the list. ##### Parameters - `clauses`: Array of clause objects, with `contextKind` (string), `attribute` (string), `op` (string), `negate` (boolean), and `values` (array of strings, numbers, or dates) properties. The `contextKind`, `attribute`, and `values` are case sensitive. The `op` must be lower-case. - `beforeRuleId`: (Optional) ID of a rule. - Either - `variationId`: ID of a variation. or - `rolloutWeights`: (Optional) Map of `variationId` to weight, in thousandths of a percent (0-100000). - `rolloutBucketBy`: (Optional) Context attribute available in the specified `rolloutContextKind`. - `rolloutContextKind`: (Optional) Context kind, defaults to `user` Here's an example that uses a `variationId`: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "addRule", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00", "clauses": [{ "contextKind": "organization", "attribute": "located_in", "op": "in", "negate": false, "values": ["Sweden", "Norway"] }] }] } ``` Here's an example that uses a percentage rollout: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "addRule", "clauses": [{ "contextKind": "organization", "attribute": "located_in", "op": "in", "negate": false, "values": ["Sweden", "Norway"] }], "rolloutContextKind": "organization", "rolloutWeights": { "2f43f67c-3e4e-4945-a18a-26559378ca00": 15000, // serve 15% this variation "e5830889-1ec5-4b0c-9cc9-c48790090c43": 85000 // serve 85% this variation } }] } ``` #### addTargets Adds context keys to the individual context targets for the context kind that `contextKind` specifies and the variation that `variationId` specifies. Returns an error if this causes the AI Config to target the same context key in multiple variations. ##### Parameters - `values`: List of context keys. - `contextKind`: (Optional) Context kind to target, defaults to `user` - `variationId`: ID of a variation. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "addTargets", "values": ["context-key-123abc", "context-key-456def"], "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" }] } ``` #### addValuesToClause Adds `values` to the values of the clause that `ruleId` and `clauseId` indicate. Does not update the context kind, attribute, or operator. ##### Parameters - `ruleId`: ID of a rule in the AI Config. - `clauseId`: ID of a clause in that rule. - `values`: Array of strings, case sensitive. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "addValuesToClause", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", "clauseId": "10a58772-3121-400f-846b-b8a04e8944ed", "values": ["beta_testers"] }] } ``` #### clearTargets Removes all individual targets from the variation that `variationId` specifies. This includes both user and non-user targets. ##### Parameters - `variationId`: ID of a variation. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "clearTargets", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" } ] } ``` #### removeClauses Removes the clauses specified by `clauseIds` from the rule indicated by `ruleId`. ##### Parameters - `ruleId`: ID of a rule. - `clauseIds`: Array of IDs of clauses in the rule. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "removeClauses", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", "clauseIds": ["10a58772-3121-400f-846b-b8a04e8944ed", "36a461dc-235e-4b08-97b9-73ce9365873e"] }] } ``` #### removeRule Removes the targeting rule specified by `ruleId`. Does nothing if the rule does not exist. ##### Parameters - `ruleId`: ID of a rule. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "removeRule", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29" } ] } ``` #### removeTargets Removes context keys from the individual context targets for the context kind that `contextKind` specifies and the variation that `variationId` specifies. Does nothing if the flag does not target the context keys. ##### Parameters - `values`: List of context keys. - `contextKind`: (Optional) Context kind to target, defaults to `user` - `variationId`: ID of a variation. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "removeTargets", "values": ["context-key-123abc", "context-key-456def"], "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" }] } ``` #### removeValuesFromClause Removes `values` from the values of the clause indicated by `ruleId` and `clauseId`. Does not update the context kind, attribute, or operator. ##### Parameters - `ruleId`: ID of a rule. - `clauseId`: ID of a clause in that rule. - `values`: Array of strings, case sensitive. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "removeValuesFromClause", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", "clauseId": "10a58772-3121-400f-846b-b8a04e8944ed", "values": ["beta_testers"] }] } ``` #### reorderRules Rearranges the rules to match the order given in `ruleIds`. Returns an error if `ruleIds` does not match the current set of rules on the AI Config. ##### Parameters - `ruleIds`: Array of IDs of all rules. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "reorderRules", "ruleIds": ["a902ef4a-2faf-4eaf-88e1-ecc356708a29", "63c238d1-835d-435e-8f21-c8d5e40b2a3d"] }] } ``` #### replaceRules Removes all targeting rules for the AI Config and replaces them with the list you provide. ##### Parameters - `rules`: A list of rules. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "replaceRules", "rules": [ { "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00", "description": "My new rule", "clauses": [ { "contextKind": "user", "attribute": "segmentMatch", "op": "segmentMatch", "values": ["test"] } ] } ] } ] } ``` #### replaceTargets Removes all existing targeting and replaces it with the list of targets you provide. ##### Parameters - `targets`: A list of context targeting. Each item in the list includes an optional `contextKind` that defaults to `user`, a required `variationId`, and a required list of `values`. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "replaceTargets", "targets": [ { "contextKind": "user", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00", "values": ["user-key-123abc"] }, { "contextKind": "device", "variationId": "e5830889-1ec5-4b0c-9cc9-c48790090c43", "values": ["device-key-456def"] } ] } ] } ``` #### updateClause Replaces the clause indicated by `ruleId` and `clauseId` with `clause`. ##### Parameters - `ruleId`: ID of a rule. - `clauseId`: ID of a clause in that rule. - `clause`: New `clause` object, with `contextKind` (string), `attribute` (string), `op` (string), `negate` (boolean), and `values` (array of strings, numbers, or dates) properties. The `contextKind`, `attribute`, and `values` are case sensitive. The `op` must be lower-case. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "updateClause", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", "clauseId": "10c7462a-2062-45ba-a8bb-dfb3de0f8af5", "clause": { "contextKind": "user", "attribute": "country", "op": "in", "negate": false, "values": ["Mexico", "Canada"] } }] } ``` #### updateDefaultVariation Updates the default on or off variation of the AI Config. ##### Parameters - `onVariationValue`: (Optional) The value of the variation of the new on variation. - `offVariationValue`: (Optional) The value of the variation of the new off variation Here's an example: ```json { "instructions": [ { "kind": "updateDefaultVariation", "OnVariationValue": true, "OffVariationValue": false } ] } ``` #### updateFallthroughVariationOrRollout Updates the default or "fallthrough" rule for the AI Config, which the AI Config serves when a context matches none of the targeting rules. The rule can serve either the variation that `variationId` indicates, or a percentage rollout that `rolloutWeights` and `rolloutBucketBy` indicate. ##### Parameters - `variationId`: ID of a variation. or - `rolloutWeights`: Map of `variationId` to weight, in thousandths of a percent (0-100000). - `rolloutBucketBy`: (Optional) Context attribute available in the specified `rolloutContextKind`. - `rolloutContextKind`: (Optional) Context kind, defaults to `user` Here's an example that uses a `variationId`: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "updateFallthroughVariationOrRollout", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" }] } ``` Here's an example that uses a percentage rollout: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "updateFallthroughVariationOrRollout", "rolloutContextKind": "user", "rolloutWeights": { "2f43f67c-3e4e-4945-a18a-26559378ca00": 15000, // serve 15% this variation "e5830889-1ec5-4b0c-9cc9-c48790090c43": 85000 // serve 85% this variation } }] } ``` #### updateOffVariation Updates the default off variation to `variationId`. The AI Config serves the default off variation when the AI Config's targeting is **Off**. ##### Parameters - `variationId`: ID of a variation. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "updateOffVariation", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" } ] } ``` #### updateRuleDescription Updates the description of the targeting rule. ##### Parameters - `description`: The new human-readable description for this rule. - `ruleId`: The ID of the rule. You can retrieve this by making a GET request for the AI Config. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "updateRuleDescription", "description": "New rule description", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29" }] } ``` #### updateRuleTrackEvents Updates whether or not LaunchDarkly tracks events for the AI Config associated with this rule. ##### Parameters - `ruleId`: The ID of the rule. You can retrieve this by making a GET request for the AI Config. - `trackEvents`: Whether or not events are tracked. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "updateRuleTrackEvents", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", "trackEvents": true }] } ``` #### updateRuleVariationOrRollout Updates what `ruleId` serves when its clauses evaluate to true. The rule can serve either the variation that `variationId` indicates, or a percent rollout that `rolloutWeights` and `rolloutBucketBy` indicate. ##### Parameters - `ruleId`: ID of a rule. - `variationId`: ID of a variation. or - `rolloutWeights`: Map of `variationId` to weight, in thousandths of a percent (0-100000). - `rolloutBucketBy`: (Optional) Context attribute available in the specified `rolloutContextKind`. - `rolloutContextKind`: (Optional) Context kind, defaults to `user` Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [{ "kind": "updateRuleVariationOrRollout", "ruleId": "a902ef4a-2faf-4eaf-88e1-ecc356708a29", "variationId": "2f43f67c-3e4e-4945-a18a-26559378ca00" }] } ``` #### updateTrackEvents Updates whether or not LaunchDarkly tracks events for the AI Config, for all rules. ##### Parameters - `trackEvents`: Whether or not events are tracked. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "updateTrackEvents", "trackEvents": true } ] } ``` #### updateTrackEventsFallthrough Updates whether or not LaunchDarkly tracks events for the AI Config, for the default rule. ##### Parameters - `trackEvents`: Whether or not events are tracked. Here's an example: ```json { "environmentKey": "environment-key-123abc", "instructions": [ { "kind": "updateTrackEventsFallthrough", "trackEvents": true } ] } ``` </details>
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired
configKeystringRequired
### Headers
LD-API-VersionenumRequired
Version of the endpoint.
Allowed values:beta
### Request
AI Config targeting semantic patch instructions
environmentKeystringRequired
instructionslist of maps from strings to anyRequired
commentstringOptional
### Response
AI Config targeting updated
createdAtlong
Unix timestamp in milliseconds
environmentsmap from strings to objects
Show 11 properties
experimentsobject
Show 2 properties
keystring
namestring
tagslist of strings
variationslist of objects
Show 4 properties
_versioninteger
defaultsobject or null
Show 2 properties
### Errors
400
Bad Request Error
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
Perform a partial update to an AI Config’s targeting. The request body must be a valid semantic patch.
### Using semantic patches on an AI Config
To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch).
The body of a semantic patch request for updating an AI Config’s targeting takes the following properties:
 * `comment` (string): (Optional) A description of the update.
 * `environmentKey` (string): The key of the LaunchDarkly environment.
 * `instructions` (array): (Required) A list of actions the update should perform. Each action in the list must be an object with a `kind` property that indicates the instruction. If the action requires parameters, you must include those parameters as additional fields in the object. The body of a single semantic patch can contain many different instructions.
### Instructions
Semantic patch requests support the following `kind` instructions for updating AI Configs.
Click to expand instructions for **working with targeting and variations** for AI Configs
#### addClauses
Adds the given clauses to the rule indicated by `ruleId`.
##### Parameters
 * `ruleId`: ID of a rule in the AI Config.
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
#### addRule
Adds a new targeting rule to the AI Config. The rule may contain `clauses` and serve the variation that `variationId` indicates, or serve a percentage rollout that `rolloutWeights`, `rolloutBucketBy`, and `rolloutContextKind` indicate.
If you set `beforeRuleId`, this adds the new rule before the indicated rule. Otherwise, adds the new rule to the end of the list.
##### Parameters
 * `clauses`: Array of clause objects, with `contextKind` (string), `attribute` (string), `op` (string), `negate` (boolean), and `values` (array of strings, numbers, or dates) properties. The `contextKind`, `attribute`, and `values` are case sensitive. The `op` must be lower-case.
 * `beforeRuleId`: (Optional) ID of a rule.
 * Either
 * `variationId`: ID of a variation.
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
Adds context keys to the individual context targets for the context kind that `contextKind` specifies and the variation that `variationId` specifies. Returns an error if this causes the AI Config to target the same context key in multiple variations.
##### Parameters
 * `values`: List of context keys.
 * `contextKind`: (Optional) Context kind to target, defaults to `user`
 * `variationId`: ID of a variation.
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
#### addValuesToClause
Adds `values` to the values of the clause that `ruleId` and `clauseId` indicate. Does not update the context kind, attribute, or operator.
##### Parameters
 * `ruleId`: ID of a rule in the AI Config.
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
#### clearTargets
Removes all individual targets from the variation that `variationId` specifies. This includes both user and non-user targets.
##### Parameters
 * `variationId`: ID of a variation.
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
#### removeClauses
Removes the clauses specified by `clauseIds` from the rule indicated by `ruleId`.
##### Parameters
 * `ruleId`: ID of a rule.
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
#### removeRule
Removes the targeting rule specified by `ruleId`. Does nothing if the rule does not exist.
##### Parameters
 * `ruleId`: ID of a rule.
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
 * `variationId`: ID of a variation.
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
#### removeValuesFromClause
Removes `values` from the values of the clause indicated by `ruleId` and `clauseId`. Does not update the context kind, attribute, or operator.
##### Parameters
 * `ruleId`: ID of a rule.
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
#### reorderRules
Rearranges the rules to match the order given in `ruleIds`. Returns an error if `ruleIds` does not match the current set of rules on the AI Config.
##### Parameters
 * `ruleIds`: Array of IDs of all rules.
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
#### replaceRules
Removes all targeting rules for the AI Config and replaces them with the list you provide.
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
| ]
18
| }
19
| ]
20
| }
21
| ]
22
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
#### updateClause
Replaces the clause indicated by `ruleId` and `clauseId` with `clause`.
##### Parameters
 * `ruleId`: ID of a rule.
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
Updates the default on or off variation of the AI Config.
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
Updates the default or “fallthrough” rule for the AI Config, which the AI Config serves when a context matches none of the targeting rules. The rule can serve either the variation that `variationId` indicates, or a percentage rollout that `rolloutWeights` and `rolloutBucketBy` indicate.
##### Parameters
 * `variationId`: ID of a variation.
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
Updates the default off variation to `variationId`. The AI Config serves the default off variation when the AI Config’s targeting is **Off**.
##### Parameters
 * `variationId`: ID of a variation.
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
#### updateRuleDescription
Updates the description of the targeting rule.
##### Parameters
 * `description`: The new human-readable description for this rule.
 * `ruleId`: The ID of the rule. You can retrieve this by making a GET request for the AI Config.
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
Updates whether or not LaunchDarkly tracks events for the AI Config associated with this rule.
##### Parameters
 * `ruleId`: The ID of the rule. You can retrieve this by making a GET request for the AI Config.
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
 * `ruleId`: ID of a rule.
 * `variationId`: ID of a variation.
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
Updates whether or not LaunchDarkly tracks events for the AI Config, for all rules.
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
Updates whether or not LaunchDarkly tracks events for the AI Config, for the default rule.
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