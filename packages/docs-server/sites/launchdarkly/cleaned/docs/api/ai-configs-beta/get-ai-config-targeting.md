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
/api/v2/projects/:projectKey/ai-configs/:configKey/targeting
cURL
```
1
| curl https://app.launchdarkly.com/api/v2/projects/projectKey/ai-configs/configKey/targeting \
---|--- 
2
| -H "LD-API-Version: beta" \
3
| -H "Authorization: <apiKey>"
```
[](/docs/api/ai-configs-beta/get-ai-config-targeting?explorer=true)
200Retrieved
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
Retrieves a specific AI Config's targeting by its key
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
### Response
Successful response
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