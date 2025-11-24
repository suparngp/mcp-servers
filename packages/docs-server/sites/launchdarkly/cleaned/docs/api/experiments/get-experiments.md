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
/api/v2/projects/:projectKey/environments/:environmentKey/experiments
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/environments/environmentKey/experiments"
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
[](/docs/api/experiments/get-experiments?explorer=true)
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
| "key": "experiment-key-123abc",
5
| "name": "Example experiment",
6
| "_maintainerId": "12ab3c45de678910fgh12345",
7
| "_creationDate": 1,
8
| "environmentKey": "string",
9
| "_links": {
10
| "parent": {
11
| "href": "/api/v2/projects/my-project/environments/my-environment",
12
| "type": "application/json"
13
| },
14
| "self": {
15
| "href": "/api/v2/projects/my-project/environments/my-environment/experiments/my-experiment",
16
| "type": "application/json"
17
| }
18
| },
19
| "_id": "12ab3c45de678910fgh12345",
20
| "description": "An example experiment, used in testing",
21
| "archivedDate": 1,
22
| "tags": [
23
| "experiment",
24
| "feature"
25
| ],
26
| "holdoutId": "f3b74309-d581-44e1-8a2b-bb2933b4fe40",
27
| "currentIteration": {
28
| "hypothesis": "The new button placement will increase conversion",
29
| "status": "running",
30
| "createdAt": 1,
31
| "_id": "12ab3c45de678910fgh12345",
32
| "startedAt": 1,
33
| "endedAt": 1,
34
| "winningTreatmentId": "122c9f3e-da26-4321-ba68-e0fc02eced58",
35
| "winningReason": "We ran this iteration for two weeks and the winning variation was clear",
36
| "canReshuffleTraffic": true,
37
| "flags": {},
38
| "reallocationFrequencyMillis": 3600000,
39
| "version": 0,
40
| "primaryMetric": {
41
| "key": "metric-key-123abc",
42
| "_versionId": "string",
43
| "name": "My metric",
44
| "kind": "custom",
45
| "_links": {
46
| "self": {
47
| "href": "/api/v2/metrics/my-project/my-metric",
48
| "type": "application/json"
49
| }
50
| },
51
| "isGroup": true,
52
| "isNumeric": true,
53
| "eventKey": "event-key-123abc",
54
| "metrics": [
55
| {
56
| "key": "metric-key-123abc",
57
| "name": "Example metric",
58
| "kind": "custom",
59
| "_links": {
60
| "self": {
61
| "href": "/api/v2/metrics/my-project/my-metric",
62
| "type": "application/json"
63
| }
64
| },
65
| "_versionId": "version-id-123abc",
66
| "isNumeric": true,
67
| "unitAggregationType": "sum",
68
| "eventKey": "event-key-123abc",
69
| "nameInGroup": "Step 1",
70
| "randomizationUnits": [
71
| "user"
72
| ]
73
| }
74
| ]
75
| },
76
| "primarySingleMetric": {
77
| "key": "metric-key-123abc",
78
| "name": "Example metric",
79
| "kind": "custom",
80
| "_links": {
81
| "self": {
82
| "href": "/api/v2/metrics/my-project/my-metric",
83
| "type": "application/json"
84
| }
85
| },
86
| "_versionId": "version-id-123abc",
87
| "isNumeric": true,
88
| "unitAggregationType": "sum",
89
| "eventKey": "event-key-123abc"
90
| },
91
| "primaryFunnel": {
92
| "key": "metric-group-key-123abc",
93
| "name": "My metric group",
94
| "kind": "funnel",
95
| "_links": {
96
| "parent": {
97
| "href": "/api/v2/projects/my-project",
98
| "type": "application/json"
99
| },
100
| "self": {
101
| "href": "/api/v2/projects/my-project/metric-groups/my-metric-group",
102
| "type": "application/json"
103
| }
104
| },
105
| "metrics": [
106
| {
107
| "key": "metric-key-123abc",
108
| "name": "Example metric",
109
| "kind": "custom",
110
| "_links": {
111
| "self": {
112
| "href": "/api/v2/metrics/my-project/my-metric",
113
| "type": "application/json"
114
| }
115
| },
116
| "_versionId": "version-id-123abc",
117
| "isNumeric": true,
118
| "unitAggregationType": "sum",
119
| "eventKey": "event-key-123abc",
120
| "nameInGroup": "Step 1",
121
| "randomizationUnits": [
122
| "user"
123
| ]
124
| }
125
| ]
126
| },
127
| "randomizationUnit": "user",
128
| "attributes": [
129
| "string"
130
| ],
131
| "treatments": [
132
| {
133
| "name": "Treatment 1",
134
| "allocationPercent": "10",
135
| "_id": "122c9f3e-da26-4321-ba68-e0fc02eced58",
136
| "baseline": true,
137
| "parameters": [
138
| {
139
| "variationId": "string",
140
| "flagKey": "string"
141
| }
142
| ]
143
| }
144
| ],
145
| "metrics": [
146
| {
147
| "key": "metric-key-123abc",
148
| "_versionId": "string",
149
| "name": "My metric",
150
| "kind": "custom",
151
| "_links": {
152
| "self": {
153
| "href": "/api/v2/metrics/my-project/my-metric",
154
| "type": "application/json"
155
| }
156
| },
157
| "isGroup": true,
158
| "isNumeric": true,
159
| "eventKey": "event-key-123abc",
160
| "metrics": [
161
| {
162
| "key": "metric-key-123abc",
163
| "name": "Example metric",
164
| "kind": "custom",
165
| "_links": {
166
| "self": {
167
| "href": "/api/v2/metrics/my-project/my-metric",
168
| "type": "application/json"
169
| }
170
| },
171
| "_versionId": "version-id-123abc",
172
| "isNumeric": true,
173
| "unitAggregationType": "sum",
174
| "eventKey": "event-key-123abc",
175
| "nameInGroup": "Step 1",
176
| "randomizationUnits": [
177
| "user"
178
| ]
179
| }
180
| ]
181
| }
182
| ],
183
| "layerSnapshot": {
184
| "key": "checkout-flow",
185
| "name": "Checkout Flow",
186
| "reservationPercent": 10,
187
| "otherReservationPercent": 70
188
| },
189
| "covarianceInfo": {
190
| "id": "74a49a2b-4834-4246-917e-5d85231d8c2a",
191
| "fileName": "covariance.csv",
192
| "createdAt": 1
193
| },
194
| "secondaryMetrics": [
195
| {
196
| "key": "metric-key-123abc",
197
| "name": "Example metric",
198
| "kind": "custom",
199
| "_links": {
200
| "self": {
201
| "href": "/api/v2/metrics/my-project/my-metric",
202
| "type": "application/json"
203
| }
204
| },
205
| "_versionId": "version-id-123abc",
206
| "isNumeric": true,
207
| "unitAggregationType": "sum",
208
| "eventKey": "event-key-123abc"
209
| }
210
| ]
211
| },
212
| "draftIteration": {
213
| "hypothesis": "The new button placement will increase conversion",
214
| "status": "running",
215
| "createdAt": 1,
216
| "_id": "12ab3c45de678910fgh12345",
217
| "startedAt": 1,
218
| "endedAt": 1,
219
| "winningTreatmentId": "122c9f3e-da26-4321-ba68-e0fc02eced58",
220
| "winningReason": "We ran this iteration for two weeks and the winning variation was clear",
221
| "canReshuffleTraffic": true,
222
| "flags": {},
223
| "reallocationFrequencyMillis": 3600000,
224
| "version": 0,
225
| "primaryMetric": {
226
| "key": "metric-key-123abc",
227
| "_versionId": "string",
228
| "name": "My metric",
229
| "kind": "custom",
230
| "_links": {
231
| "self": {
232
| "href": "/api/v2/metrics/my-project/my-metric",
233
| "type": "application/json"
234
| }
235
| },
236
| "isGroup": true,
237
| "isNumeric": true,
238
| "eventKey": "event-key-123abc",
239
| "metrics": [
240
| {
241
| "key": "metric-key-123abc",
242
| "name": "Example metric",
243
| "kind": "custom",
244
| "_links": {
245
| "self": {
246
| "href": "/api/v2/metrics/my-project/my-metric",
247
| "type": "application/json"
248
| }
249
| },
250
| "_versionId": "version-id-123abc",
251
| "isNumeric": true,
252
| "unitAggregationType": "sum",
253
| "eventKey": "event-key-123abc",
254
| "nameInGroup": "Step 1",
255
| "randomizationUnits": [
256
| "user"
257
| ]
258
| }
259
| ]
260
| },
261
| "primarySingleMetric": {
262
| "key": "metric-key-123abc",
263
| "name": "Example metric",
264
| "kind": "custom",
265
| "_links": {
266
| "self": {
267
| "href": "/api/v2/metrics/my-project/my-metric",
268
| "type": "application/json"
269
| }
270
| },
271
| "_versionId": "version-id-123abc",
272
| "isNumeric": true,
273
| "unitAggregationType": "sum",
274
| "eventKey": "event-key-123abc"
275
| },
276
| "primaryFunnel": {
277
| "key": "metric-group-key-123abc",
278
| "name": "My metric group",
279
| "kind": "funnel",
280
| "_links": {
281
| "parent": {
282
| "href": "/api/v2/projects/my-project",
283
| "type": "application/json"
284
| },
285
| "self": {
286
| "href": "/api/v2/projects/my-project/metric-groups/my-metric-group",
287
| "type": "application/json"
288
| }
289
| },
290
| "metrics": [
291
| {
292
| "key": "metric-key-123abc",
293
| "name": "Example metric",
294
| "kind": "custom",
295
| "_links": {
296
| "self": {
297
| "href": "/api/v2/metrics/my-project/my-metric",
298
| "type": "application/json"
299
| }
300
| },
301
| "_versionId": "version-id-123abc",
302
| "isNumeric": true,
303
| "unitAggregationType": "sum",
304
| "eventKey": "event-key-123abc",
305
| "nameInGroup": "Step 1",
306
| "randomizationUnits": [
307
| "user"
308
| ]
309
| }
310
| ]
311
| },
312
| "randomizationUnit": "user",
313
| "attributes": [
314
| "string"
315
| ],
316
| "treatments": [
317
| {
318
| "name": "Treatment 1",
319
| "allocationPercent": "10",
320
| "_id": "122c9f3e-da26-4321-ba68-e0fc02eced58",
321
| "baseline": true,
322
| "parameters": [
323
| {
324
| "variationId": "string",
325
| "flagKey": "string"
326
| }
327
| ]
328
| }
329
| ],
330
| "metrics": [
331
| {
332
| "key": "metric-key-123abc",
333
| "_versionId": "string",
334
| "name": "My metric",
335
| "kind": "custom",
336
| "_links": {
337
| "self": {
338
| "href": "/api/v2/metrics/my-project/my-metric",
339
| "type": "application/json"
340
| }
341
| },
342
| "isGroup": true,
343
| "isNumeric": true,
344
| "eventKey": "event-key-123abc",
345
| "metrics": [
346
| {
347
| "key": "metric-key-123abc",
348
| "name": "Example metric",
349
| "kind": "custom",
350
| "_links": {
351
| "self": {
352
| "href": "/api/v2/metrics/my-project/my-metric",
353
| "type": "application/json"
354
| }
355
| },
356
| "_versionId": "version-id-123abc",
357
| "isNumeric": true,
358
| "unitAggregationType": "sum",
359
| "eventKey": "event-key-123abc",
360
| "nameInGroup": "Step 1",
361
| "randomizationUnits": [
362
| "user"
363
| ]
364
| }
365
| ]
366
| }
367
| ],
368
| "layerSnapshot": {
369
| "key": "checkout-flow",
370
| "name": "Checkout Flow",
371
| "reservationPercent": 10,
372
| "otherReservationPercent": 70
373
| },
374
| "covarianceInfo": {
375
| "id": "74a49a2b-4834-4246-917e-5d85231d8c2a",
376
| "fileName": "covariance.csv",
377
| "createdAt": 1
378
| },
379
| "secondaryMetrics": [
380
| {
381
| "key": "metric-key-123abc",
382
| "name": "Example metric",
383
| "kind": "custom",
384
| "_links": {
385
| "self": {
386
| "href": "/api/v2/metrics/my-project/my-metric",
387
| "type": "application/json"
388
| }
389
| },
390
| "_versionId": "version-id-123abc",
391
| "isNumeric": true,
392
| "unitAggregationType": "sum",
393
| "eventKey": "event-key-123abc"
394
| }
395
| ]
396
| },
397
| "previousIterations": [
398
| {
399
| "hypothesis": "The new button placement will increase conversion",
400
| "status": "running",
401
| "createdAt": 1,
402
| "_id": "12ab3c45de678910fgh12345",
403
| "startedAt": 1,
404
| "endedAt": 1,
405
| "winningTreatmentId": "122c9f3e-da26-4321-ba68-e0fc02eced58",
406
| "winningReason": "We ran this iteration for two weeks and the winning variation was clear",
407
| "canReshuffleTraffic": true,
408
| "flags": {},
409
| "reallocationFrequencyMillis": 3600000,
410
| "version": 0,
411
| "primaryMetric": {
412
| "key": "metric-key-123abc",
413
| "_versionId": "string",
414
| "name": "My metric",
415
| "kind": "custom",
416
| "_links": {
417
| "self": {
418
| "href": "/api/v2/metrics/my-project/my-metric",
419
| "type": "application/json"
420
| }
421
| },
422
| "isGroup": true,
423
| "isNumeric": true,
424
| "eventKey": "event-key-123abc",
425
| "metrics": [
426
| {
427
| "key": "metric-key-123abc",
428
| "name": "Example metric",
429
| "kind": "custom",
430
| "_links": {
431
| "self": {
432
| "href": "/api/v2/metrics/my-project/my-metric",
433
| "type": "application/json"
434
| }
435
| },
436
| "_versionId": "version-id-123abc",
437
| "isNumeric": true,
438
| "unitAggregationType": "sum",
439
| "eventKey": "event-key-123abc",
440
| "nameInGroup": "Step 1",
441
| "randomizationUnits": [
442
| "user"
443
| ]
444
| }
445
| ]
446
| },
447
| "primarySingleMetric": {
448
| "key": "metric-key-123abc",
449
| "name": "Example metric",
450
| "kind": "custom",
451
| "_links": {
452
| "self": {
453
| "href": "/api/v2/metrics/my-project/my-metric",
454
| "type": "application/json"
455
| }
456
| },
457
| "_versionId": "version-id-123abc",
458
| "isNumeric": true,
459
| "unitAggregationType": "sum",
460
| "eventKey": "event-key-123abc"
461
| },
462
| "primaryFunnel": {
463
| "key": "metric-group-key-123abc",
464
| "name": "My metric group",
465
| "kind": "funnel",
466
| "_links": {
467
| "parent": {
468
| "href": "/api/v2/projects/my-project",
469
| "type": "application/json"
470
| },
471
| "self": {
472
| "href": "/api/v2/projects/my-project/metric-groups/my-metric-group",
473
| "type": "application/json"
474
| }
475
| },
476
| "metrics": [
477
| {
478
| "key": "metric-key-123abc",
479
| "name": "Example metric",
480
| "kind": "custom",
481
| "_links": {
482
| "self": {
483
| "href": "/api/v2/metrics/my-project/my-metric",
484
| "type": "application/json"
485
| }
486
| },
487
| "_versionId": "version-id-123abc",
488
| "isNumeric": true,
489
| "unitAggregationType": "sum",
490
| "eventKey": "event-key-123abc",
491
| "nameInGroup": "Step 1",
492
| "randomizationUnits": [
493
| "user"
494
| ]
495
| }
496
| ]
497
| },
498
| "randomizationUnit": "user",
499
| "attributes": [
500
| "string"
501
| ],
502
| "treatments": [
503
| {
504
| "name": "Treatment 1",
505
| "allocationPercent": "10",
506
| "_id": "122c9f3e-da26-4321-ba68-e0fc02eced58",
507
| "baseline": true,
508
| "parameters": [
509
| {
510
| "variationId": "string",
511
| "flagKey": "string"
512
| }
513
| ]
514
| }
515
| ],
516
| "metrics": [
517
| {
518
| "key": "metric-key-123abc",
519
| "_versionId": "string",
520
| "name": "My metric",
521
| "kind": "custom",
522
| "_links": {
523
| "self": {
524
| "href": "/api/v2/metrics/my-project/my-metric",
525
| "type": "application/json"
526
| }
527
| },
528
| "isGroup": true,
529
| "isNumeric": true,
530
| "eventKey": "event-key-123abc",
531
| "metrics": [
532
| {
533
| "key": "metric-key-123abc",
534
| "name": "Example metric",
535
| "kind": "custom",
536
| "_links": {
537
| "self": {
538
| "href": "/api/v2/metrics/my-project/my-metric",
539
| "type": "application/json"
540
| }
541
| },
542
| "_versionId": "version-id-123abc",
543
| "isNumeric": true,
544
| "unitAggregationType": "sum",
545
| "eventKey": "event-key-123abc",
546
| "nameInGroup": "Step 1",
547
| "randomizationUnits": [
548
| "user"
549
| ]
550
| }
551
| ]
552
| }
553
| ],
554
| "layerSnapshot": {
555
| "key": "checkout-flow",
556
| "name": "Checkout Flow",
557
| "reservationPercent": 10,
558
| "otherReservationPercent": 70
559
| },
560
| "covarianceInfo": {
561
| "id": "74a49a2b-4834-4246-917e-5d85231d8c2a",
562
| "fileName": "covariance.csv",
563
| "createdAt": 1
564
| },
565
| "secondaryMetrics": [
566
| {
567
| "key": "metric-key-123abc",
568
| "name": "Example metric",
569
| "kind": "custom",
570
| "_links": {
571
| "self": {
572
| "href": "/api/v2/metrics/my-project/my-metric",
573
| "type": "application/json"
574
| }
575
| },
576
| "_versionId": "version-id-123abc",
577
| "isNumeric": true,
578
| "unitAggregationType": "sum",
579
| "eventKey": "event-key-123abc"
580
| }
581
| ]
582
| }
583
| ]
584
| }
585
| ],
586
| "total_count": 1,
587
| "_links": {}
588
| }
```
Get details about all experiments in an environment. ### Filtering experiments LaunchDarkly supports the `filter` query param for filtering, with the following fields: - `flagKey` filters for only experiments that use the flag with the given key. - `metricKey` filters for only experiments that use the metric with the given key. - `status` filters for only experiments with an iteration with the given status. An iteration can have the status `not_started`, `running` or `stopped`. For example, `filter=flagKey:my-flag,status:running,metricKey:page-load-ms` filters for experiments for the given flag key and the given metric key which have a currently running iteration. ### Expanding the experiments response LaunchDarkly supports four fields for expanding the "Get experiments" response. By default, these fields are **not** included in the response. To expand the response, append the `expand` query parameter and add a comma-separated list with any of the following fields: - `previousIterations` includes all iterations prior to the current iteration. By default only the current iteration is included in the response. - `draftIteration` includes the iteration which has not been started yet, if any. - `secondaryMetrics` includes secondary metrics. By default only the primary metric is included in the response. - `treatments` includes all treatment and parameter details. By default treatment data is not included in the response. For example, `expand=draftIteration,treatments` includes the `draftIteration` and `treatments` fields in the response. If fields that you request with the `expand` query parameter are empty, they are not included in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
### Query Parameters
limitlongOptional
The maximum number of experiments to return. Defaults to 20.
offsetlongOptional
Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.
filterstringOptional`format: "string"`
A comma-separated list of filters. Each filter is of the form `field:value`. Supported fields are explained above.
expandstringOptional`format: "string"`
A comma-separated list of properties that can reveal additional information in the response. Supported fields are explained above.
lifecycleStatestringOptional`format: "string"`
A comma-separated list of experiment archived states. Supports `archived`, `active`, or both. Defaults to `active` experiments.
### Response
Experiment collection response
itemslist of objects
An array of experiments
Show 14 properties
total_countinteger or null
The total number of experiments in this project and environment. Does not include legacy experiments.
_linksmap from strings to objects or null
The location and content type of related resources
Show 2 properties
### Errors
400
Bad Request Error
401
Unauthorized Error
403
Forbidden Error
404
Not Found Error
405
Method Not Allowed Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Get details about all experiments in an environment.
### Filtering experiments
LaunchDarkly supports the `filter` query param for filtering, with the following fields:
 * `flagKey` filters for only experiments that use the flag with the given key.
 * `metricKey` filters for only experiments that use the metric with the given key.
 * `status` filters for only experiments with an iteration with the given status. An iteration can have the status `not_started`, `running` or `stopped`.
For example, `filter=flagKey:my-flag,status:running,metricKey:page-load-ms` filters for experiments for the given flag key and the given metric key which have a currently running iteration.
### Expanding the experiments response
LaunchDarkly supports four fields for expanding the “Get experiments” response. By default, these fields are **not** included in the response.
To expand the response, append the `expand` query parameter and add a comma-separated list with any of the following fields:
 * `previousIterations` includes all iterations prior to the current iteration. By default only the current iteration is included in the response.
 * `draftIteration` includes the iteration which has not been started yet, if any.
 * `secondaryMetrics` includes secondary metrics. By default only the primary metric is included in the response.
 * `treatments` includes all treatment and parameter details. By default treatment data is not included in the response.
For example, `expand=draftIteration,treatments` includes the `draftIteration` and `treatments` fields in the response. If fields that you request with the `expand` query parameter are empty, they are not included in the response.