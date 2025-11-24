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
/api/v2/projects/:projectKey/environments/:environmentKey/holdouts/:holdoutKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/environments/environmentKey/holdouts/holdoutKey"
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
[](/docs/api/holdouts-beta/get-holdout?explorer=true)
200Retrieved
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
| "isDirty": true,
591
| "relatedExperiments": [
592
| {
593
| "key": "experiment-key-123abc",
594
| "name": "Example experiment",
595
| "_maintainerId": "12ab3c45de678910fgh12345",
596
| "_creationDate": 1,
597
| "environmentKey": "string",
598
| "_links": {
599
| "parent": {
600
| "href": "/api/v2/projects/my-project/environments/my-environment",
601
| "type": "application/json"
602
| },
603
| "self": {
604
| "href": "/api/v2/projects/my-project/environments/my-environment/experiments/my-experiment",
605
| "type": "application/json"
606
| }
607
| },
608
| "_id": "12ab3c45de678910fgh12345",
609
| "description": "An example experiment, used in testing",
610
| "archivedDate": 1,
611
| "tags": [
612
| "experiment",
613
| "feature"
614
| ],
615
| "holdoutId": "f3b74309-d581-44e1-8a2b-bb2933b4fe40",
616
| "currentIteration": {
617
| "hypothesis": "The new button placement will increase conversion",
618
| "status": "running",
619
| "createdAt": 1,
620
| "_id": "12ab3c45de678910fgh12345",
621
| "startedAt": 1,
622
| "endedAt": 1,
623
| "winningTreatmentId": "122c9f3e-da26-4321-ba68-e0fc02eced58",
624
| "winningReason": "We ran this iteration for two weeks and the winning variation was clear",
625
| "canReshuffleTraffic": true,
626
| "flags": {},
627
| "reallocationFrequencyMillis": 3600000,
628
| "version": 0,
629
| "primaryMetric": {
630
| "key": "metric-key-123abc",
631
| "_versionId": "string",
632
| "name": "My metric",
633
| "kind": "custom",
634
| "_links": {
635
| "self": {
636
| "href": "/api/v2/metrics/my-project/my-metric",
637
| "type": "application/json"
638
| }
639
| },
640
| "isGroup": true,
641
| "isNumeric": true,
642
| "eventKey": "event-key-123abc",
643
| "metrics": [
644
| {
645
| "key": "metric-key-123abc",
646
| "name": "Example metric",
647
| "kind": "custom",
648
| "_links": {
649
| "self": {
650
| "href": "/api/v2/metrics/my-project/my-metric",
651
| "type": "application/json"
652
| }
653
| },
654
| "_versionId": "version-id-123abc",
655
| "isNumeric": true,
656
| "unitAggregationType": "sum",
657
| "eventKey": "event-key-123abc",
658
| "nameInGroup": "Step 1",
659
| "randomizationUnits": [
660
| "user"
661
| ]
662
| }
663
| ]
664
| },
665
| "primarySingleMetric": {
666
| "key": "metric-key-123abc",
667
| "name": "Example metric",
668
| "kind": "custom",
669
| "_links": {
670
| "self": {
671
| "href": "/api/v2/metrics/my-project/my-metric",
672
| "type": "application/json"
673
| }
674
| },
675
| "_versionId": "version-id-123abc",
676
| "isNumeric": true,
677
| "unitAggregationType": "sum",
678
| "eventKey": "event-key-123abc"
679
| },
680
| "primaryFunnel": {
681
| "key": "metric-group-key-123abc",
682
| "name": "My metric group",
683
| "kind": "funnel",
684
| "_links": {
685
| "parent": {
686
| "href": "/api/v2/projects/my-project",
687
| "type": "application/json"
688
| },
689
| "self": {
690
| "href": "/api/v2/projects/my-project/metric-groups/my-metric-group",
691
| "type": "application/json"
692
| }
693
| },
694
| "metrics": [
695
| {
696
| "key": "metric-key-123abc",
697
| "name": "Example metric",
698
| "kind": "custom",
699
| "_links": {
700
| "self": {
701
| "href": "/api/v2/metrics/my-project/my-metric",
702
| "type": "application/json"
703
| }
704
| },
705
| "_versionId": "version-id-123abc",
706
| "isNumeric": true,
707
| "unitAggregationType": "sum",
708
| "eventKey": "event-key-123abc",
709
| "nameInGroup": "Step 1",
710
| "randomizationUnits": [
711
| "user"
712
| ]
713
| }
714
| ]
715
| },
716
| "randomizationUnit": "user",
717
| "attributes": [
718
| "string"
719
| ],
720
| "treatments": [
721
| {
722
| "name": "Treatment 1",
723
| "allocationPercent": "10",
724
| "_id": "122c9f3e-da26-4321-ba68-e0fc02eced58",
725
| "baseline": true,
726
| "parameters": [
727
| {
728
| "variationId": "string",
729
| "flagKey": "string"
730
| }
731
| ]
732
| }
733
| ],
734
| "metrics": [
735
| {
736
| "key": "metric-key-123abc",
737
| "_versionId": "string",
738
| "name": "My metric",
739
| "kind": "custom",
740
| "_links": {
741
| "self": {
742
| "href": "/api/v2/metrics/my-project/my-metric",
743
| "type": "application/json"
744
| }
745
| },
746
| "isGroup": true,
747
| "isNumeric": true,
748
| "eventKey": "event-key-123abc",
749
| "metrics": [
750
| {
751
| "key": "metric-key-123abc",
752
| "name": "Example metric",
753
| "kind": "custom",
754
| "_links": {
755
| "self": {
756
| "href": "/api/v2/metrics/my-project/my-metric",
757
| "type": "application/json"
758
| }
759
| },
760
| "_versionId": "version-id-123abc",
761
| "isNumeric": true,
762
| "unitAggregationType": "sum",
763
| "eventKey": "event-key-123abc",
764
| "nameInGroup": "Step 1",
765
| "randomizationUnits": [
766
| "user"
767
| ]
768
| }
769
| ]
770
| }
771
| ],
772
| "layerSnapshot": {
773
| "key": "checkout-flow",
774
| "name": "Checkout Flow",
775
| "reservationPercent": 10,
776
| "otherReservationPercent": 70
777
| },
778
| "covarianceInfo": {
779
| "id": "74a49a2b-4834-4246-917e-5d85231d8c2a",
780
| "fileName": "covariance.csv",
781
| "createdAt": 1
782
| },
783
| "secondaryMetrics": [
784
| {
785
| "key": "metric-key-123abc",
786
| "name": "Example metric",
787
| "kind": "custom",
788
| "_links": {
789
| "self": {
790
| "href": "/api/v2/metrics/my-project/my-metric",
791
| "type": "application/json"
792
| }
793
| },
794
| "_versionId": "version-id-123abc",
795
| "isNumeric": true,
796
| "unitAggregationType": "sum",
797
| "eventKey": "event-key-123abc"
798
| }
799
| ]
800
| },
801
| "draftIteration": {
802
| "hypothesis": "The new button placement will increase conversion",
803
| "status": "running",
804
| "createdAt": 1,
805
| "_id": "12ab3c45de678910fgh12345",
806
| "startedAt": 1,
807
| "endedAt": 1,
808
| "winningTreatmentId": "122c9f3e-da26-4321-ba68-e0fc02eced58",
809
| "winningReason": "We ran this iteration for two weeks and the winning variation was clear",
810
| "canReshuffleTraffic": true,
811
| "flags": {},
812
| "reallocationFrequencyMillis": 3600000,
813
| "version": 0,
814
| "primaryMetric": {
815
| "key": "metric-key-123abc",
816
| "_versionId": "string",
817
| "name": "My metric",
818
| "kind": "custom",
819
| "_links": {
820
| "self": {
821
| "href": "/api/v2/metrics/my-project/my-metric",
822
| "type": "application/json"
823
| }
824
| },
825
| "isGroup": true,
826
| "isNumeric": true,
827
| "eventKey": "event-key-123abc",
828
| "metrics": [
829
| {
830
| "key": "metric-key-123abc",
831
| "name": "Example metric",
832
| "kind": "custom",
833
| "_links": {
834
| "self": {
835
| "href": "/api/v2/metrics/my-project/my-metric",
836
| "type": "application/json"
837
| }
838
| },
839
| "_versionId": "version-id-123abc",
840
| "isNumeric": true,
841
| "unitAggregationType": "sum",
842
| "eventKey": "event-key-123abc",
843
| "nameInGroup": "Step 1",
844
| "randomizationUnits": [
845
| "user"
846
| ]
847
| }
848
| ]
849
| },
850
| "primarySingleMetric": {
851
| "key": "metric-key-123abc",
852
| "name": "Example metric",
853
| "kind": "custom",
854
| "_links": {
855
| "self": {
856
| "href": "/api/v2/metrics/my-project/my-metric",
857
| "type": "application/json"
858
| }
859
| },
860
| "_versionId": "version-id-123abc",
861
| "isNumeric": true,
862
| "unitAggregationType": "sum",
863
| "eventKey": "event-key-123abc"
864
| },
865
| "primaryFunnel": {
866
| "key": "metric-group-key-123abc",
867
| "name": "My metric group",
868
| "kind": "funnel",
869
| "_links": {
870
| "parent": {
871
| "href": "/api/v2/projects/my-project",
872
| "type": "application/json"
873
| },
874
| "self": {
875
| "href": "/api/v2/projects/my-project/metric-groups/my-metric-group",
876
| "type": "application/json"
877
| }
878
| },
879
| "metrics": [
880
| {
881
| "key": "metric-key-123abc",
882
| "name": "Example metric",
883
| "kind": "custom",
884
| "_links": {
885
| "self": {
886
| "href": "/api/v2/metrics/my-project/my-metric",
887
| "type": "application/json"
888
| }
889
| },
890
| "_versionId": "version-id-123abc",
891
| "isNumeric": true,
892
| "unitAggregationType": "sum",
893
| "eventKey": "event-key-123abc",
894
| "nameInGroup": "Step 1",
895
| "randomizationUnits": [
896
| "user"
897
| ]
898
| }
899
| ]
900
| },
901
| "randomizationUnit": "user",
902
| "attributes": [
903
| "string"
904
| ],
905
| "treatments": [
906
| {
907
| "name": "Treatment 1",
908
| "allocationPercent": "10",
909
| "_id": "122c9f3e-da26-4321-ba68-e0fc02eced58",
910
| "baseline": true,
911
| "parameters": [
912
| {
913
| "variationId": "string",
914
| "flagKey": "string"
915
| }
916
| ]
917
| }
918
| ],
919
| "metrics": [
920
| {
921
| "key": "metric-key-123abc",
922
| "_versionId": "string",
923
| "name": "My metric",
924
| "kind": "custom",
925
| "_links": {
926
| "self": {
927
| "href": "/api/v2/metrics/my-project/my-metric",
928
| "type": "application/json"
929
| }
930
| },
931
| "isGroup": true,
932
| "isNumeric": true,
933
| "eventKey": "event-key-123abc",
934
| "metrics": [
935
| {
936
| "key": "metric-key-123abc",
937
| "name": "Example metric",
938
| "kind": "custom",
939
| "_links": {
940
| "self": {
941
| "href": "/api/v2/metrics/my-project/my-metric",
942
| "type": "application/json"
943
| }
944
| },
945
| "_versionId": "version-id-123abc",
946
| "isNumeric": true,
947
| "unitAggregationType": "sum",
948
| "eventKey": "event-key-123abc",
949
| "nameInGroup": "Step 1",
950
| "randomizationUnits": [
951
| "user"
952
| ]
953
| }
954
| ]
955
| }
956
| ],
957
| "layerSnapshot": {
958
| "key": "checkout-flow",
959
| "name": "Checkout Flow",
960
| "reservationPercent": 10,
961
| "otherReservationPercent": 70
962
| },
963
| "covarianceInfo": {
964
| "id": "74a49a2b-4834-4246-917e-5d85231d8c2a",
965
| "fileName": "covariance.csv",
966
| "createdAt": 1
967
| },
968
| "secondaryMetrics": [
969
| {
970
| "key": "metric-key-123abc",
971
| "name": "Example metric",
972
| "kind": "custom",
973
| "_links": {
974
| "self": {
975
| "href": "/api/v2/metrics/my-project/my-metric",
976
| "type": "application/json"
977
| }
978
| },
979
| "_versionId": "version-id-123abc",
980
| "isNumeric": true,
981
| "unitAggregationType": "sum",
982
| "eventKey": "event-key-123abc"
983
| }
984
| ]
985
| },
986
| "previousIterations": [
987
| {
988
| "hypothesis": "The new button placement will increase conversion",
989
| "status": "running",
990
| "createdAt": 1,
991
| "_id": "12ab3c45de678910fgh12345",
992
| "startedAt": 1,
993
| "endedAt": 1,
994
| "winningTreatmentId": "122c9f3e-da26-4321-ba68-e0fc02eced58",
995
| "winningReason": "We ran this iteration for two weeks and the winning variation was clear",
996
| "canReshuffleTraffic": true,
997
| "flags": {},
998
| "reallocationFrequencyMillis": 3600000,
999
| "version": 0,
1000
| "primaryMetric": {
1001
| "key": "metric-key-123abc",
1002
| "_versionId": "string",
1003
| "name": "My metric",
1004
| "kind": "custom",
1005
| "_links": {
1006
| "self": {
1007
| "href": "/api/v2/metrics/my-project/my-metric",
1008
| "type": "application/json"
1009
| }
1010
| },
1011
| "isGroup": true,
1012
| "isNumeric": true,
1013
| "eventKey": "event-key-123abc",
1014
| "metrics": [
1015
| {
1016
| "key": "metric-key-123abc",
1017
| "name": "Example metric",
1018
| "kind": "custom",
1019
| "_links": {
1020
| "self": {
1021
| "href": "/api/v2/metrics/my-project/my-metric",
1022
| "type": "application/json"
1023
| }
1024
| },
1025
| "_versionId": "version-id-123abc",
1026
| "isNumeric": true,
1027
| "unitAggregationType": "sum",
1028
| "eventKey": "event-key-123abc",
1029
| "nameInGroup": "Step 1",
1030
| "randomizationUnits": [
1031
| "user"
1032
| ]
1033
| }
1034
| ]
1035
| },
1036
| "primarySingleMetric": {
1037
| "key": "metric-key-123abc",
1038
| "name": "Example metric",
1039
| "kind": "custom",
1040
| "_links": {
1041
| "self": {
1042
| "href": "/api/v2/metrics/my-project/my-metric",
1043
| "type": "application/json"
1044
| }
1045
| },
1046
| "_versionId": "version-id-123abc",
1047
| "isNumeric": true,
1048
| "unitAggregationType": "sum",
1049
| "eventKey": "event-key-123abc"
1050
| },
1051
| "primaryFunnel": {
1052
| "key": "metric-group-key-123abc",
1053
| "name": "My metric group",
1054
| "kind": "funnel",
1055
| "_links": {
1056
| "parent": {
1057
| "href": "/api/v2/projects/my-project",
1058
| "type": "application/json"
1059
| },
1060
| "self": {
1061
| "href": "/api/v2/projects/my-project/metric-groups/my-metric-group",
1062
| "type": "application/json"
1063
| }
1064
| },
1065
| "metrics": [
1066
| {
1067
| "key": "metric-key-123abc",
1068
| "name": "Example metric",
1069
| "kind": "custom",
1070
| "_links": {
1071
| "self": {
1072
| "href": "/api/v2/metrics/my-project/my-metric",
1073
| "type": "application/json"
1074
| }
1075
| },
1076
| "_versionId": "version-id-123abc",
1077
| "isNumeric": true,
1078
| "unitAggregationType": "sum",
1079
| "eventKey": "event-key-123abc",
1080
| "nameInGroup": "Step 1",
1081
| "randomizationUnits": [
1082
| "user"
1083
| ]
1084
| }
1085
| ]
1086
| },
1087
| "randomizationUnit": "user",
1088
| "attributes": [
1089
| "string"
1090
| ],
1091
| "treatments": [
1092
| {
1093
| "name": "Treatment 1",
1094
| "allocationPercent": "10",
1095
| "_id": "122c9f3e-da26-4321-ba68-e0fc02eced58",
1096
| "baseline": true,
1097
| "parameters": [
1098
| {
1099
| "variationId": "string",
1100
| "flagKey": "string"
1101
| }
1102
| ]
1103
| }
1104
| ],
1105
| "metrics": [
1106
| {
1107
| "key": "metric-key-123abc",
1108
| "_versionId": "string",
1109
| "name": "My metric",
1110
| "kind": "custom",
1111
| "_links": {
1112
| "self": {
1113
| "href": "/api/v2/metrics/my-project/my-metric",
1114
| "type": "application/json"
1115
| }
1116
| },
1117
| "isGroup": true,
1118
| "isNumeric": true,
1119
| "eventKey": "event-key-123abc",
1120
| "metrics": [
1121
| {
1122
| "key": "metric-key-123abc",
1123
| "name": "Example metric",
1124
| "kind": "custom",
1125
| "_links": {
1126
| "self": {
1127
| "href": "/api/v2/metrics/my-project/my-metric",
1128
| "type": "application/json"
1129
| }
1130
| },
1131
| "_versionId": "version-id-123abc",
1132
| "isNumeric": true,
1133
| "unitAggregationType": "sum",
1134
| "eventKey": "event-key-123abc",
1135
| "nameInGroup": "Step 1",
1136
| "randomizationUnits": [
1137
| "user"
1138
| ]
1139
| }
1140
| ]
1141
| }
1142
| ],
1143
| "layerSnapshot": {
1144
| "key": "checkout-flow",
1145
| "name": "Checkout Flow",
1146
| "reservationPercent": 10,
1147
| "otherReservationPercent": 70
1148
| },
1149
| "covarianceInfo": {
1150
| "id": "74a49a2b-4834-4246-917e-5d85231d8c2a",
1151
| "fileName": "covariance.csv",
1152
| "createdAt": 1
1153
| },
1154
| "secondaryMetrics": [
1155
| {
1156
| "key": "metric-key-123abc",
1157
| "name": "Example metric",
1158
| "kind": "custom",
1159
| "_links": {
1160
| "self": {
1161
| "href": "/api/v2/metrics/my-project/my-metric",
1162
| "type": "application/json"
1163
| }
1164
| },
1165
| "_versionId": "version-id-123abc",
1166
| "isNumeric": true,
1167
| "unitAggregationType": "sum",
1168
| "eventKey": "event-key-123abc"
1169
| }
1170
| ]
1171
| }
1172
| ]
1173
| }
1174
| ]
1175
| }
```
Get details about a holdout. ### Expanding the holdout response LaunchDarkly supports the following fields for expanding the "Get holdout" response. By default, these fields are **not** included in the response. To expand the response, append the `expand` query parameter and add a comma-separated list with any of the following fields: - `draftIteration` includes the iteration which has not been started yet, if any, for this holdout. - `previousIterations` includes all iterations prior to the current iteration, for this holdout. By default only the current iteration is included in the response. - `rel-draftIteration` includes the iteration which has not been started yet, if any, for the experiments related to this holdout. - `rel-metrics` includes metrics for experiments related to this holdout. - `rel-previousIterations` includes all iterations prior to the current iteration, for the experiments related to this holdout. - `rel-secondaryMetrics` includes secondary metrics for experiments related to this holdout. - `rel-treatments` includes all treatment and parameter details for experiments related to this holdout. - `secondaryMetrics` includes secondary metrics for this holdout. By default only the primary metric is included in the response. - `treatments` includes all treatment and parameter details for this holdout. By default treatment data is not included in the response. For example, `expand=draftIteration,rel-draftIteration` includes the `draftIteration` and `rel-draftIteration` fields in the response. If fields that you request with the `expand` query parameter are empty, they are not included in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
holdoutKeystringRequired`format: "string"`
The holdout experiment key
### Query Parameters
expandstringOptional`format: "string"`
A comma-separated list of properties that can reveal additional information in the response. Supported fields are explained above. Holdout experiment expansion fields have no prefix. Related experiment expansion fields have `rel-` as a prefix.
### Response
HoldoutDetail response with full experiments
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
isDirtyboolean or null
Indicates if the holdout experiment is running and if any related experiments are running.
relatedExperimentslist of objects or null
Show 14 properties
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
Get details about a holdout.
### Expanding the holdout response
LaunchDarkly supports the following fields for expanding the “Get holdout” response. By default, these fields are **not** included in the response.
To expand the response, append the `expand` query parameter and add a comma-separated list with any of the following fields:
 * `draftIteration` includes the iteration which has not been started yet, if any, for this holdout.
 * `previousIterations` includes all iterations prior to the current iteration, for this holdout. By default only the current iteration is included in the response.
 * `rel-draftIteration` includes the iteration which has not been started yet, if any, for the experiments related to this holdout.
 * `rel-metrics` includes metrics for experiments related to this holdout.
 * `rel-previousIterations` includes all iterations prior to the current iteration, for the experiments related to this holdout.
 * `rel-secondaryMetrics` includes secondary metrics for experiments related to this holdout.
 * `rel-treatments` includes all treatment and parameter details for experiments related to this holdout.
 * `secondaryMetrics` includes secondary metrics for this holdout. By default only the primary metric is included in the response.
 * `treatments` includes all treatment and parameter details for this holdout. By default treatment data is not included in the response.
For example, `expand=draftIteration,rel-draftIteration` includes the `draftIteration` and `rel-draftIteration` fields in the response. If fields that you request with the `expand` query parameter are empty, they are not included in the response.