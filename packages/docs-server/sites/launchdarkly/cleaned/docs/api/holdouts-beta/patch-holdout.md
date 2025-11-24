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
/api/v2/projects/:projectKey/environments/:environmentKey/holdouts/:holdoutKey
cURL
```
1
| curl -X PATCH https://app.launchdarkly.com/api/v2/projects/projectKey/environments/environmentKey/holdouts/holdoutKey \
---|--- 
2
| -H "Authorization: <apiKey>" \
3
| -H "Content-Type: application/json" \
4
| -d '{
5
| "instructions": [
6
| {
7
| "kind": "updateName",
8
| "value": "Updated holdout name"
9
| }
10
| ],
11
| "comment": "Optional comment describing the update"
12
| }'
```
[](/docs/api/holdouts-beta/patch-holdout?explorer=true)
200Updated
```
1
| {
---|--- 
2
| "_id": "string",
3
| "status": "created",
4
| "holdoutAmount": "string",
5
| "createdAt": 1,
6
| "updatedAt": 1,
7
| "baseExperiment": {
8
| "key": "experiment-key-123abc",
9
| "name": "Example experiment",
10
| "_maintainerId": "12ab3c45de678910fgh12345",
11
| "_creationDate": 1,
12
| "environmentKey": "string",
13
| "_links": {
14
| "parent": {
15
| "href": "/api/v2/projects/my-project/environments/my-environment",
16
| "type": "application/json"
17
| },
18
| "self": {
19
| "href": "/api/v2/projects/my-project/environments/my-environment/experiments/my-experiment",
20
| "type": "application/json"
21
| }
22
| },
23
| "_id": "12ab3c45de678910fgh12345",
24
| "description": "An example experiment, used in testing",
25
| "archivedDate": 1,
26
| "tags": [
27
| "experiment",
28
| "feature"
29
| ],
30
| "holdoutId": "f3b74309-d581-44e1-8a2b-bb2933b4fe40",
31
| "currentIteration": {
32
| "hypothesis": "The new button placement will increase conversion",
33
| "status": "running",
34
| "createdAt": 1,
35
| "_id": "12ab3c45de678910fgh12345",
36
| "startedAt": 1,
37
| "endedAt": 1,
38
| "winningTreatmentId": "122c9f3e-da26-4321-ba68-e0fc02eced58",
39
| "winningReason": "We ran this iteration for two weeks and the winning variation was clear",
40
| "canReshuffleTraffic": true,
41
| "flags": {},
42
| "reallocationFrequencyMillis": 3600000,
43
| "version": 0,
44
| "primaryMetric": {
45
| "key": "metric-key-123abc",
46
| "_versionId": "string",
47
| "name": "My metric",
48
| "kind": "custom",
49
| "_links": {
50
| "self": {
51
| "href": "/api/v2/metrics/my-project/my-metric",
52
| "type": "application/json"
53
| }
54
| },
55
| "isGroup": true,
56
| "isNumeric": true,
57
| "eventKey": "event-key-123abc",
58
| "metrics": [
59
| {
60
| "key": "metric-key-123abc",
61
| "name": "Example metric",
62
| "kind": "custom",
63
| "_links": {
64
| "self": {
65
| "href": "/api/v2/metrics/my-project/my-metric",
66
| "type": "application/json"
67
| }
68
| },
69
| "_versionId": "version-id-123abc",
70
| "isNumeric": true,
71
| "unitAggregationType": "sum",
72
| "eventKey": "event-key-123abc",
73
| "nameInGroup": "Step 1",
74
| "randomizationUnits": [
75
| "user"
76
| ]
77
| }
78
| ]
79
| },
80
| "primarySingleMetric": {
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
| "eventKey": "event-key-123abc"
94
| },
95
| "primaryFunnel": {
96
| "key": "metric-group-key-123abc",
97
| "name": "My metric group",
98
| "kind": "funnel",
99
| "_links": {
100
| "parent": {
101
| "href": "/api/v2/projects/my-project",
102
| "type": "application/json"
103
| },
104
| "self": {
105
| "href": "/api/v2/projects/my-project/metric-groups/my-metric-group",
106
| "type": "application/json"
107
| }
108
| },
109
| "metrics": [
110
| {
111
| "key": "metric-key-123abc",
112
| "name": "Example metric",
113
| "kind": "custom",
114
| "_links": {
115
| "self": {
116
| "href": "/api/v2/metrics/my-project/my-metric",
117
| "type": "application/json"
118
| }
119
| },
120
| "_versionId": "version-id-123abc",
121
| "isNumeric": true,
122
| "unitAggregationType": "sum",
123
| "eventKey": "event-key-123abc",
124
| "nameInGroup": "Step 1",
125
| "randomizationUnits": [
126
| "user"
127
| ]
128
| }
129
| ]
130
| },
131
| "randomizationUnit": "user",
132
| "attributes": [
133
| "string"
134
| ],
135
| "treatments": [
136
| {
137
| "name": "Treatment 1",
138
| "allocationPercent": "10",
139
| "_id": "122c9f3e-da26-4321-ba68-e0fc02eced58",
140
| "baseline": true,
141
| "parameters": [
142
| {
143
| "variationId": "string",
144
| "flagKey": "string"
145
| }
146
| ]
147
| }
148
| ],
149
| "metrics": [
150
| {
151
| "key": "metric-key-123abc",
152
| "_versionId": "string",
153
| "name": "My metric",
154
| "kind": "custom",
155
| "_links": {
156
| "self": {
157
| "href": "/api/v2/metrics/my-project/my-metric",
158
| "type": "application/json"
159
| }
160
| },
161
| "isGroup": true,
162
| "isNumeric": true,
163
| "eventKey": "event-key-123abc",
164
| "metrics": [
165
| {
166
| "key": "metric-key-123abc",
167
| "name": "Example metric",
168
| "kind": "custom",
169
| "_links": {
170
| "self": {
171
| "href": "/api/v2/metrics/my-project/my-metric",
172
| "type": "application/json"
173
| }
174
| },
175
| "_versionId": "version-id-123abc",
176
| "isNumeric": true,
177
| "unitAggregationType": "sum",
178
| "eventKey": "event-key-123abc",
179
| "nameInGroup": "Step 1",
180
| "randomizationUnits": [
181
| "user"
182
| ]
183
| }
184
| ]
185
| }
186
| ],
187
| "layerSnapshot": {
188
| "key": "checkout-flow",
189
| "name": "Checkout Flow",
190
| "reservationPercent": 10,
191
| "otherReservationPercent": 70
192
| },
193
| "covarianceInfo": {
194
| "id": "74a49a2b-4834-4246-917e-5d85231d8c2a",
195
| "fileName": "covariance.csv",
196
| "createdAt": 1
197
| },
198
| "secondaryMetrics": [
199
| {
200
| "key": "metric-key-123abc",
201
| "name": "Example metric",
202
| "kind": "custom",
203
| "_links": {
204
| "self": {
205
| "href": "/api/v2/metrics/my-project/my-metric",
206
| "type": "application/json"
207
| }
208
| },
209
| "_versionId": "version-id-123abc",
210
| "isNumeric": true,
211
| "unitAggregationType": "sum",
212
| "eventKey": "event-key-123abc"
213
| }
214
| ]
215
| },
216
| "draftIteration": {
217
| "hypothesis": "The new button placement will increase conversion",
218
| "status": "running",
219
| "createdAt": 1,
220
| "_id": "12ab3c45de678910fgh12345",
221
| "startedAt": 1,
222
| "endedAt": 1,
223
| "winningTreatmentId": "122c9f3e-da26-4321-ba68-e0fc02eced58",
224
| "winningReason": "We ran this iteration for two weeks and the winning variation was clear",
225
| "canReshuffleTraffic": true,
226
| "flags": {},
227
| "reallocationFrequencyMillis": 3600000,
228
| "version": 0,
229
| "primaryMetric": {
230
| "key": "metric-key-123abc",
231
| "_versionId": "string",
232
| "name": "My metric",
233
| "kind": "custom",
234
| "_links": {
235
| "self": {
236
| "href": "/api/v2/metrics/my-project/my-metric",
237
| "type": "application/json"
238
| }
239
| },
240
| "isGroup": true,
241
| "isNumeric": true,
242
| "eventKey": "event-key-123abc",
243
| "metrics": [
244
| {
245
| "key": "metric-key-123abc",
246
| "name": "Example metric",
247
| "kind": "custom",
248
| "_links": {
249
| "self": {
250
| "href": "/api/v2/metrics/my-project/my-metric",
251
| "type": "application/json"
252
| }
253
| },
254
| "_versionId": "version-id-123abc",
255
| "isNumeric": true,
256
| "unitAggregationType": "sum",
257
| "eventKey": "event-key-123abc",
258
| "nameInGroup": "Step 1",
259
| "randomizationUnits": [
260
| "user"
261
| ]
262
| }
263
| ]
264
| },
265
| "primarySingleMetric": {
266
| "key": "metric-key-123abc",
267
| "name": "Example metric",
268
| "kind": "custom",
269
| "_links": {
270
| "self": {
271
| "href": "/api/v2/metrics/my-project/my-metric",
272
| "type": "application/json"
273
| }
274
| },
275
| "_versionId": "version-id-123abc",
276
| "isNumeric": true,
277
| "unitAggregationType": "sum",
278
| "eventKey": "event-key-123abc"
279
| },
280
| "primaryFunnel": {
281
| "key": "metric-group-key-123abc",
282
| "name": "My metric group",
283
| "kind": "funnel",
284
| "_links": {
285
| "parent": {
286
| "href": "/api/v2/projects/my-project",
287
| "type": "application/json"
288
| },
289
| "self": {
290
| "href": "/api/v2/projects/my-project/metric-groups/my-metric-group",
291
| "type": "application/json"
292
| }
293
| },
294
| "metrics": [
295
| {
296
| "key": "metric-key-123abc",
297
| "name": "Example metric",
298
| "kind": "custom",
299
| "_links": {
300
| "self": {
301
| "href": "/api/v2/metrics/my-project/my-metric",
302
| "type": "application/json"
303
| }
304
| },
305
| "_versionId": "version-id-123abc",
306
| "isNumeric": true,
307
| "unitAggregationType": "sum",
308
| "eventKey": "event-key-123abc",
309
| "nameInGroup": "Step 1",
310
| "randomizationUnits": [
311
| "user"
312
| ]
313
| }
314
| ]
315
| },
316
| "randomizationUnit": "user",
317
| "attributes": [
318
| "string"
319
| ],
320
| "treatments": [
321
| {
322
| "name": "Treatment 1",
323
| "allocationPercent": "10",
324
| "_id": "122c9f3e-da26-4321-ba68-e0fc02eced58",
325
| "baseline": true,
326
| "parameters": [
327
| {
328
| "variationId": "string",
329
| "flagKey": "string"
330
| }
331
| ]
332
| }
333
| ],
334
| "metrics": [
335
| {
336
| "key": "metric-key-123abc",
337
| "_versionId": "string",
338
| "name": "My metric",
339
| "kind": "custom",
340
| "_links": {
341
| "self": {
342
| "href": "/api/v2/metrics/my-project/my-metric",
343
| "type": "application/json"
344
| }
345
| },
346
| "isGroup": true,
347
| "isNumeric": true,
348
| "eventKey": "event-key-123abc",
349
| "metrics": [
350
| {
351
| "key": "metric-key-123abc",
352
| "name": "Example metric",
353
| "kind": "custom",
354
| "_links": {
355
| "self": {
356
| "href": "/api/v2/metrics/my-project/my-metric",
357
| "type": "application/json"
358
| }
359
| },
360
| "_versionId": "version-id-123abc",
361
| "isNumeric": true,
362
| "unitAggregationType": "sum",
363
| "eventKey": "event-key-123abc",
364
| "nameInGroup": "Step 1",
365
| "randomizationUnits": [
366
| "user"
367
| ]
368
| }
369
| ]
370
| }
371
| ],
372
| "layerSnapshot": {
373
| "key": "checkout-flow",
374
| "name": "Checkout Flow",
375
| "reservationPercent": 10,
376
| "otherReservationPercent": 70
377
| },
378
| "covarianceInfo": {
379
| "id": "74a49a2b-4834-4246-917e-5d85231d8c2a",
380
| "fileName": "covariance.csv",
381
| "createdAt": 1
382
| },
383
| "secondaryMetrics": [
384
| {
385
| "key": "metric-key-123abc",
386
| "name": "Example metric",
387
| "kind": "custom",
388
| "_links": {
389
| "self": {
390
| "href": "/api/v2/metrics/my-project/my-metric",
391
| "type": "application/json"
392
| }
393
| },
394
| "_versionId": "version-id-123abc",
395
| "isNumeric": true,
396
| "unitAggregationType": "sum",
397
| "eventKey": "event-key-123abc"
398
| }
399
| ]
400
| },
401
| "previousIterations": [
402
| {
403
| "hypothesis": "The new button placement will increase conversion",
404
| "status": "running",
405
| "createdAt": 1,
406
| "_id": "12ab3c45de678910fgh12345",
407
| "startedAt": 1,
408
| "endedAt": 1,
409
| "winningTreatmentId": "122c9f3e-da26-4321-ba68-e0fc02eced58",
410
| "winningReason": "We ran this iteration for two weeks and the winning variation was clear",
411
| "canReshuffleTraffic": true,
412
| "flags": {},
413
| "reallocationFrequencyMillis": 3600000,
414
| "version": 0,
415
| "primaryMetric": {
416
| "key": "metric-key-123abc",
417
| "_versionId": "string",
418
| "name": "My metric",
419
| "kind": "custom",
420
| "_links": {
421
| "self": {
422
| "href": "/api/v2/metrics/my-project/my-metric",
423
| "type": "application/json"
424
| }
425
| },
426
| "isGroup": true,
427
| "isNumeric": true,
428
| "eventKey": "event-key-123abc",
429
| "metrics": [
430
| {
431
| "key": "metric-key-123abc",
432
| "name": "Example metric",
433
| "kind": "custom",
434
| "_links": {
435
| "self": {
436
| "href": "/api/v2/metrics/my-project/my-metric",
437
| "type": "application/json"
438
| }
439
| },
440
| "_versionId": "version-id-123abc",
441
| "isNumeric": true,
442
| "unitAggregationType": "sum",
443
| "eventKey": "event-key-123abc",
444
| "nameInGroup": "Step 1",
445
| "randomizationUnits": [
446
| "user"
447
| ]
448
| }
449
| ]
450
| },
451
| "primarySingleMetric": {
452
| "key": "metric-key-123abc",
453
| "name": "Example metric",
454
| "kind": "custom",
455
| "_links": {
456
| "self": {
457
| "href": "/api/v2/metrics/my-project/my-metric",
458
| "type": "application/json"
459
| }
460
| },
461
| "_versionId": "version-id-123abc",
462
| "isNumeric": true,
463
| "unitAggregationType": "sum",
464
| "eventKey": "event-key-123abc"
465
| },
466
| "primaryFunnel": {
467
| "key": "metric-group-key-123abc",
468
| "name": "My metric group",
469
| "kind": "funnel",
470
| "_links": {
471
| "parent": {
472
| "href": "/api/v2/projects/my-project",
473
| "type": "application/json"
474
| },
475
| "self": {
476
| "href": "/api/v2/projects/my-project/metric-groups/my-metric-group",
477
| "type": "application/json"
478
| }
479
| },
480
| "metrics": [
481
| {
482
| "key": "metric-key-123abc",
483
| "name": "Example metric",
484
| "kind": "custom",
485
| "_links": {
486
| "self": {
487
| "href": "/api/v2/metrics/my-project/my-metric",
488
| "type": "application/json"
489
| }
490
| },
491
| "_versionId": "version-id-123abc",
492
| "isNumeric": true,
493
| "unitAggregationType": "sum",
494
| "eventKey": "event-key-123abc",
495
| "nameInGroup": "Step 1",
496
| "randomizationUnits": [
497
| "user"
498
| ]
499
| }
500
| ]
501
| },
502
| "randomizationUnit": "user",
503
| "attributes": [
504
| "string"
505
| ],
506
| "treatments": [
507
| {
508
| "name": "Treatment 1",
509
| "allocationPercent": "10",
510
| "_id": "122c9f3e-da26-4321-ba68-e0fc02eced58",
511
| "baseline": true,
512
| "parameters": [
513
| {
514
| "variationId": "string",
515
| "flagKey": "string"
516
| }
517
| ]
518
| }
519
| ],
520
| "metrics": [
521
| {
522
| "key": "metric-key-123abc",
523
| "_versionId": "string",
524
| "name": "My metric",
525
| "kind": "custom",
526
| "_links": {
527
| "self": {
528
| "href": "/api/v2/metrics/my-project/my-metric",
529
| "type": "application/json"
530
| }
531
| },
532
| "isGroup": true,
533
| "isNumeric": true,
534
| "eventKey": "event-key-123abc",
535
| "metrics": [
536
| {
537
| "key": "metric-key-123abc",
538
| "name": "Example metric",
539
| "kind": "custom",
540
| "_links": {
541
| "self": {
542
| "href": "/api/v2/metrics/my-project/my-metric",
543
| "type": "application/json"
544
| }
545
| },
546
| "_versionId": "version-id-123abc",
547
| "isNumeric": true,
548
| "unitAggregationType": "sum",
549
| "eventKey": "event-key-123abc",
550
| "nameInGroup": "Step 1",
551
| "randomizationUnits": [
552
| "user"
553
| ]
554
| }
555
| ]
556
| }
557
| ],
558
| "layerSnapshot": {
559
| "key": "checkout-flow",
560
| "name": "Checkout Flow",
561
| "reservationPercent": 10,
562
| "otherReservationPercent": 70
563
| },
564
| "covarianceInfo": {
565
| "id": "74a49a2b-4834-4246-917e-5d85231d8c2a",
566
| "fileName": "covariance.csv",
567
| "createdAt": 1
568
| },
569
| "secondaryMetrics": [
570
| {
571
| "key": "metric-key-123abc",
572
| "name": "Example metric",
573
| "kind": "custom",
574
| "_links": {
575
| "self": {
576
| "href": "/api/v2/metrics/my-project/my-metric",
577
| "type": "application/json"
578
| }
579
| },
580
| "_versionId": "version-id-123abc",
581
| "isNumeric": true,
582
| "unitAggregationType": "sum",
583
| "eventKey": "event-key-123abc"
584
| }
585
| ]
586
| }
587
| ]
588
| },
589
| "description": "string",
590
| "experiments": [
591
| {
592
| "key": "string",
593
| "name": "string",
594
| "environment": "string"
595
| }
596
| ]
597
| }
```
Updates an existing holdout, and returns the updated holdout. Updating holdouts uses the semantic patch format. To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch). ### Instructions Semantic patch requests support the following `kind` instructions for updating holdouts. <details> <summary>Click to expand instructions for <strong>updating holdouts</strong></summary> #### endHoldout Ends a holdout. ##### Parameters None. Here's an example: ```json { "comment": "Optional comment describing why the holdout is ending", "instructions": [{ "kind": "endHoldout" }] } ``` #### removeExperiment Removes an experiment from a holdout. ##### Parameters - `value`: The key of the experiment to remove Here's an example: ```json { "comment": "Optional comment describing the change", "instructions": [{ "kind": "removeExperiment", "value": "experiment-key" }] } ``` #### updateDescription Updates the description of the holdout. ##### Parameters - `value`: The new description. Here's an example: ```json { "comment": "Optional comment describing the update", "instructions": [{ "kind": "updateDescription", "value": "Updated holdout description" }] } ``` #### updateName Updates the name of the holdout. ##### Parameters - `value`: The new name. Here's an example: ```json { "comment": "Optional comment describing the update", "instructions": [{ "kind": "updateName", "value": "Updated holdout name" }] } ``` </details>
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
holdoutKeystringRequired`format: "string"`
The holdout key
### Request
This endpoint expects an object.
instructionslist of maps from strings to anyRequired
The instructions to perform when updating. This should be an array with objects that look like <code>{“kind”: “update_action”}</code>. Some instructions also require a <code>value</code> field in the array element.
commentstringOptional
Optional comment describing the update
### Response
Holdout response
_idstring
statusenum
Allowed values:createdenabledrunningended
holdoutAmountstring
The percentage of traffic allocated to this holdout.
createdAtlong
updatedAtlong
baseExperimentobject
Show 14 properties
descriptionstring or null
experimentslist of objects or null
Show 3 properties
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
Updates an existing holdout, and returns the updated holdout. Updating holdouts uses the semantic patch format.
To make a semantic patch request, you must append `domain-model=launchdarkly.semanticpatch` to your `Content-Type` header. To learn more, read [Updates using semantic patch](https://launchdarkly.com/docs/api#updates-using-semantic-patch).
### Instructions
Semantic patch requests support the following `kind` instructions for updating holdouts.
Click to expand instructions for **updating holdouts**
#### endHoldout
Ends a holdout.
##### Parameters
None.
Here’s an example:
```
1
| {
---|--- 
2
| "comment": "Optional comment describing why the holdout is ending",
3
| "instructions": [{
4
| "kind": "endHoldout"
5
| }]
6
| }
```
#### removeExperiment
Removes an experiment from a holdout.
##### Parameters
 * `value`: The key of the experiment to remove
Here’s an example:
```
1
| {
---|--- 
2
| "comment": "Optional comment describing the change",
3
| "instructions": [{
4
| "kind": "removeExperiment",
5
| "value": "experiment-key"
6
| }]
7
| }
```
#### updateDescription
Updates the description of the holdout.
##### Parameters
 * `value`: The new description.
Here’s an example:
```
1
| {
---|--- 
2
| "comment": "Optional comment describing the update",
3
| "instructions": [{
4
| "kind": "updateDescription",
5
| "value": "Updated holdout description"
6
| }]
7
| }
```
#### updateName
Updates the name of the holdout.
##### Parameters
 * `value`: The new name.
Here’s an example:
```
1
| {
---|--- 
2
| "comment": "Optional comment describing the update",
3
| "instructions": [{
4
| "kind": "updateName",
5
| "value": "Updated holdout name"
6
| }]
7
| }
```