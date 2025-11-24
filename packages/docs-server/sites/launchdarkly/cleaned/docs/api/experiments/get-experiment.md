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
/api/v2/projects/:projectKey/environments/:environmentKey/experiments/:experimentKey
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/projectKey/environments/environmentKey/experiments/experimentKey"
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
[](/docs/api/experiments/get-experiment?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "key": "experiment-key-123abc",
3
| "name": "Example experiment",
4
| "_maintainerId": "12ab3c45de678910fgh12345",
5
| "_creationDate": 1,
6
| "environmentKey": "string",
7
| "_links": {
8
| "parent": {
9
| "href": "/api/v2/projects/my-project/environments/my-environment",
10
| "type": "application/json"
11
| },
12
| "self": {
13
| "href": "/api/v2/projects/my-project/environments/my-environment/experiments/my-experiment",
14
| "type": "application/json"
15
| }
16
| },
17
| "_id": "12ab3c45de678910fgh12345",
18
| "description": "An example experiment, used in testing",
19
| "archivedDate": 1,
20
| "tags": [
21
| "experiment",
22
| "feature"
23
| ],
24
| "holdoutId": "f3b74309-d581-44e1-8a2b-bb2933b4fe40",
25
| "currentIteration": {
26
| "hypothesis": "The new button placement will increase conversion",
27
| "status": "running",
28
| "createdAt": 1,
29
| "_id": "12ab3c45de678910fgh12345",
30
| "startedAt": 1,
31
| "endedAt": 1,
32
| "winningTreatmentId": "122c9f3e-da26-4321-ba68-e0fc02eced58",
33
| "winningReason": "We ran this iteration for two weeks and the winning variation was clear",
34
| "canReshuffleTraffic": true,
35
| "flags": {},
36
| "reallocationFrequencyMillis": 3600000,
37
| "version": 0,
38
| "primaryMetric": {
39
| "key": "metric-key-123abc",
40
| "_versionId": "string",
41
| "name": "My metric",
42
| "kind": "custom",
43
| "_links": {
44
| "self": {
45
| "href": "/api/v2/metrics/my-project/my-metric",
46
| "type": "application/json"
47
| }
48
| },
49
| "isGroup": true,
50
| "isNumeric": true,
51
| "eventKey": "event-key-123abc",
52
| "metrics": [
53
| {
54
| "key": "metric-key-123abc",
55
| "name": "Example metric",
56
| "kind": "custom",
57
| "_links": {
58
| "self": {
59
| "href": "/api/v2/metrics/my-project/my-metric",
60
| "type": "application/json"
61
| }
62
| },
63
| "_versionId": "version-id-123abc",
64
| "isNumeric": true,
65
| "unitAggregationType": "sum",
66
| "eventKey": "event-key-123abc",
67
| "nameInGroup": "Step 1",
68
| "randomizationUnits": [
69
| "user"
70
| ]
71
| }
72
| ]
73
| },
74
| "primarySingleMetric": {
75
| "key": "metric-key-123abc",
76
| "name": "Example metric",
77
| "kind": "custom",
78
| "_links": {
79
| "self": {
80
| "href": "/api/v2/metrics/my-project/my-metric",
81
| "type": "application/json"
82
| }
83
| },
84
| "_versionId": "version-id-123abc",
85
| "isNumeric": true,
86
| "unitAggregationType": "sum",
87
| "eventKey": "event-key-123abc"
88
| },
89
| "primaryFunnel": {
90
| "key": "metric-group-key-123abc",
91
| "name": "My metric group",
92
| "kind": "funnel",
93
| "_links": {
94
| "parent": {
95
| "href": "/api/v2/projects/my-project",
96
| "type": "application/json"
97
| },
98
| "self": {
99
| "href": "/api/v2/projects/my-project/metric-groups/my-metric-group",
100
| "type": "application/json"
101
| }
102
| },
103
| "metrics": [
104
| {
105
| "key": "metric-key-123abc",
106
| "name": "Example metric",
107
| "kind": "custom",
108
| "_links": {
109
| "self": {
110
| "href": "/api/v2/metrics/my-project/my-metric",
111
| "type": "application/json"
112
| }
113
| },
114
| "_versionId": "version-id-123abc",
115
| "isNumeric": true,
116
| "unitAggregationType": "sum",
117
| "eventKey": "event-key-123abc",
118
| "nameInGroup": "Step 1",
119
| "randomizationUnits": [
120
| "user"
121
| ]
122
| }
123
| ]
124
| },
125
| "randomizationUnit": "user",
126
| "attributes": [
127
| "string"
128
| ],
129
| "treatments": [
130
| {
131
| "name": "Treatment 1",
132
| "allocationPercent": "10",
133
| "_id": "122c9f3e-da26-4321-ba68-e0fc02eced58",
134
| "baseline": true,
135
| "parameters": [
136
| {
137
| "variationId": "string",
138
| "flagKey": "string"
139
| }
140
| ]
141
| }
142
| ],
143
| "metrics": [
144
| {
145
| "key": "metric-key-123abc",
146
| "_versionId": "string",
147
| "name": "My metric",
148
| "kind": "custom",
149
| "_links": {
150
| "self": {
151
| "href": "/api/v2/metrics/my-project/my-metric",
152
| "type": "application/json"
153
| }
154
| },
155
| "isGroup": true,
156
| "isNumeric": true,
157
| "eventKey": "event-key-123abc",
158
| "metrics": [
159
| {
160
| "key": "metric-key-123abc",
161
| "name": "Example metric",
162
| "kind": "custom",
163
| "_links": {
164
| "self": {
165
| "href": "/api/v2/metrics/my-project/my-metric",
166
| "type": "application/json"
167
| }
168
| },
169
| "_versionId": "version-id-123abc",
170
| "isNumeric": true,
171
| "unitAggregationType": "sum",
172
| "eventKey": "event-key-123abc",
173
| "nameInGroup": "Step 1",
174
| "randomizationUnits": [
175
| "user"
176
| ]
177
| }
178
| ]
179
| }
180
| ],
181
| "layerSnapshot": {
182
| "key": "checkout-flow",
183
| "name": "Checkout Flow",
184
| "reservationPercent": 10,
185
| "otherReservationPercent": 70
186
| },
187
| "covarianceInfo": {
188
| "id": "74a49a2b-4834-4246-917e-5d85231d8c2a",
189
| "fileName": "covariance.csv",
190
| "createdAt": 1
191
| },
192
| "secondaryMetrics": [
193
| {
194
| "key": "metric-key-123abc",
195
| "name": "Example metric",
196
| "kind": "custom",
197
| "_links": {
198
| "self": {
199
| "href": "/api/v2/metrics/my-project/my-metric",
200
| "type": "application/json"
201
| }
202
| },
203
| "_versionId": "version-id-123abc",
204
| "isNumeric": true,
205
| "unitAggregationType": "sum",
206
| "eventKey": "event-key-123abc"
207
| }
208
| ]
209
| },
210
| "draftIteration": {
211
| "hypothesis": "The new button placement will increase conversion",
212
| "status": "running",
213
| "createdAt": 1,
214
| "_id": "12ab3c45de678910fgh12345",
215
| "startedAt": 1,
216
| "endedAt": 1,
217
| "winningTreatmentId": "122c9f3e-da26-4321-ba68-e0fc02eced58",
218
| "winningReason": "We ran this iteration for two weeks and the winning variation was clear",
219
| "canReshuffleTraffic": true,
220
| "flags": {},
221
| "reallocationFrequencyMillis": 3600000,
222
| "version": 0,
223
| "primaryMetric": {
224
| "key": "metric-key-123abc",
225
| "_versionId": "string",
226
| "name": "My metric",
227
| "kind": "custom",
228
| "_links": {
229
| "self": {
230
| "href": "/api/v2/metrics/my-project/my-metric",
231
| "type": "application/json"
232
| }
233
| },
234
| "isGroup": true,
235
| "isNumeric": true,
236
| "eventKey": "event-key-123abc",
237
| "metrics": [
238
| {
239
| "key": "metric-key-123abc",
240
| "name": "Example metric",
241
| "kind": "custom",
242
| "_links": {
243
| "self": {
244
| "href": "/api/v2/metrics/my-project/my-metric",
245
| "type": "application/json"
246
| }
247
| },
248
| "_versionId": "version-id-123abc",
249
| "isNumeric": true,
250
| "unitAggregationType": "sum",
251
| "eventKey": "event-key-123abc",
252
| "nameInGroup": "Step 1",
253
| "randomizationUnits": [
254
| "user"
255
| ]
256
| }
257
| ]
258
| },
259
| "primarySingleMetric": {
260
| "key": "metric-key-123abc",
261
| "name": "Example metric",
262
| "kind": "custom",
263
| "_links": {
264
| "self": {
265
| "href": "/api/v2/metrics/my-project/my-metric",
266
| "type": "application/json"
267
| }
268
| },
269
| "_versionId": "version-id-123abc",
270
| "isNumeric": true,
271
| "unitAggregationType": "sum",
272
| "eventKey": "event-key-123abc"
273
| },
274
| "primaryFunnel": {
275
| "key": "metric-group-key-123abc",
276
| "name": "My metric group",
277
| "kind": "funnel",
278
| "_links": {
279
| "parent": {
280
| "href": "/api/v2/projects/my-project",
281
| "type": "application/json"
282
| },
283
| "self": {
284
| "href": "/api/v2/projects/my-project/metric-groups/my-metric-group",
285
| "type": "application/json"
286
| }
287
| },
288
| "metrics": [
289
| {
290
| "key": "metric-key-123abc",
291
| "name": "Example metric",
292
| "kind": "custom",
293
| "_links": {
294
| "self": {
295
| "href": "/api/v2/metrics/my-project/my-metric",
296
| "type": "application/json"
297
| }
298
| },
299
| "_versionId": "version-id-123abc",
300
| "isNumeric": true,
301
| "unitAggregationType": "sum",
302
| "eventKey": "event-key-123abc",
303
| "nameInGroup": "Step 1",
304
| "randomizationUnits": [
305
| "user"
306
| ]
307
| }
308
| ]
309
| },
310
| "randomizationUnit": "user",
311
| "attributes": [
312
| "string"
313
| ],
314
| "treatments": [
315
| {
316
| "name": "Treatment 1",
317
| "allocationPercent": "10",
318
| "_id": "122c9f3e-da26-4321-ba68-e0fc02eced58",
319
| "baseline": true,
320
| "parameters": [
321
| {
322
| "variationId": "string",
323
| "flagKey": "string"
324
| }
325
| ]
326
| }
327
| ],
328
| "metrics": [
329
| {
330
| "key": "metric-key-123abc",
331
| "_versionId": "string",
332
| "name": "My metric",
333
| "kind": "custom",
334
| "_links": {
335
| "self": {
336
| "href": "/api/v2/metrics/my-project/my-metric",
337
| "type": "application/json"
338
| }
339
| },
340
| "isGroup": true,
341
| "isNumeric": true,
342
| "eventKey": "event-key-123abc",
343
| "metrics": [
344
| {
345
| "key": "metric-key-123abc",
346
| "name": "Example metric",
347
| "kind": "custom",
348
| "_links": {
349
| "self": {
350
| "href": "/api/v2/metrics/my-project/my-metric",
351
| "type": "application/json"
352
| }
353
| },
354
| "_versionId": "version-id-123abc",
355
| "isNumeric": true,
356
| "unitAggregationType": "sum",
357
| "eventKey": "event-key-123abc",
358
| "nameInGroup": "Step 1",
359
| "randomizationUnits": [
360
| "user"
361
| ]
362
| }
363
| ]
364
| }
365
| ],
366
| "layerSnapshot": {
367
| "key": "checkout-flow",
368
| "name": "Checkout Flow",
369
| "reservationPercent": 10,
370
| "otherReservationPercent": 70
371
| },
372
| "covarianceInfo": {
373
| "id": "74a49a2b-4834-4246-917e-5d85231d8c2a",
374
| "fileName": "covariance.csv",
375
| "createdAt": 1
376
| },
377
| "secondaryMetrics": [
378
| {
379
| "key": "metric-key-123abc",
380
| "name": "Example metric",
381
| "kind": "custom",
382
| "_links": {
383
| "self": {
384
| "href": "/api/v2/metrics/my-project/my-metric",
385
| "type": "application/json"
386
| }
387
| },
388
| "_versionId": "version-id-123abc",
389
| "isNumeric": true,
390
| "unitAggregationType": "sum",
391
| "eventKey": "event-key-123abc"
392
| }
393
| ]
394
| },
395
| "previousIterations": [
396
| {
397
| "hypothesis": "The new button placement will increase conversion",
398
| "status": "running",
399
| "createdAt": 1,
400
| "_id": "12ab3c45de678910fgh12345",
401
| "startedAt": 1,
402
| "endedAt": 1,
403
| "winningTreatmentId": "122c9f3e-da26-4321-ba68-e0fc02eced58",
404
| "winningReason": "We ran this iteration for two weeks and the winning variation was clear",
405
| "canReshuffleTraffic": true,
406
| "flags": {},
407
| "reallocationFrequencyMillis": 3600000,
408
| "version": 0,
409
| "primaryMetric": {
410
| "key": "metric-key-123abc",
411
| "_versionId": "string",
412
| "name": "My metric",
413
| "kind": "custom",
414
| "_links": {
415
| "self": {
416
| "href": "/api/v2/metrics/my-project/my-metric",
417
| "type": "application/json"
418
| }
419
| },
420
| "isGroup": true,
421
| "isNumeric": true,
422
| "eventKey": "event-key-123abc",
423
| "metrics": [
424
| {
425
| "key": "metric-key-123abc",
426
| "name": "Example metric",
427
| "kind": "custom",
428
| "_links": {
429
| "self": {
430
| "href": "/api/v2/metrics/my-project/my-metric",
431
| "type": "application/json"
432
| }
433
| },
434
| "_versionId": "version-id-123abc",
435
| "isNumeric": true,
436
| "unitAggregationType": "sum",
437
| "eventKey": "event-key-123abc",
438
| "nameInGroup": "Step 1",
439
| "randomizationUnits": [
440
| "user"
441
| ]
442
| }
443
| ]
444
| },
445
| "primarySingleMetric": {
446
| "key": "metric-key-123abc",
447
| "name": "Example metric",
448
| "kind": "custom",
449
| "_links": {
450
| "self": {
451
| "href": "/api/v2/metrics/my-project/my-metric",
452
| "type": "application/json"
453
| }
454
| },
455
| "_versionId": "version-id-123abc",
456
| "isNumeric": true,
457
| "unitAggregationType": "sum",
458
| "eventKey": "event-key-123abc"
459
| },
460
| "primaryFunnel": {
461
| "key": "metric-group-key-123abc",
462
| "name": "My metric group",
463
| "kind": "funnel",
464
| "_links": {
465
| "parent": {
466
| "href": "/api/v2/projects/my-project",
467
| "type": "application/json"
468
| },
469
| "self": {
470
| "href": "/api/v2/projects/my-project/metric-groups/my-metric-group",
471
| "type": "application/json"
472
| }
473
| },
474
| "metrics": [
475
| {
476
| "key": "metric-key-123abc",
477
| "name": "Example metric",
478
| "kind": "custom",
479
| "_links": {
480
| "self": {
481
| "href": "/api/v2/metrics/my-project/my-metric",
482
| "type": "application/json"
483
| }
484
| },
485
| "_versionId": "version-id-123abc",
486
| "isNumeric": true,
487
| "unitAggregationType": "sum",
488
| "eventKey": "event-key-123abc",
489
| "nameInGroup": "Step 1",
490
| "randomizationUnits": [
491
| "user"
492
| ]
493
| }
494
| ]
495
| },
496
| "randomizationUnit": "user",
497
| "attributes": [
498
| "string"
499
| ],
500
| "treatments": [
501
| {
502
| "name": "Treatment 1",
503
| "allocationPercent": "10",
504
| "_id": "122c9f3e-da26-4321-ba68-e0fc02eced58",
505
| "baseline": true,
506
| "parameters": [
507
| {
508
| "variationId": "string",
509
| "flagKey": "string"
510
| }
511
| ]
512
| }
513
| ],
514
| "metrics": [
515
| {
516
| "key": "metric-key-123abc",
517
| "_versionId": "string",
518
| "name": "My metric",
519
| "kind": "custom",
520
| "_links": {
521
| "self": {
522
| "href": "/api/v2/metrics/my-project/my-metric",
523
| "type": "application/json"
524
| }
525
| },
526
| "isGroup": true,
527
| "isNumeric": true,
528
| "eventKey": "event-key-123abc",
529
| "metrics": [
530
| {
531
| "key": "metric-key-123abc",
532
| "name": "Example metric",
533
| "kind": "custom",
534
| "_links": {
535
| "self": {
536
| "href": "/api/v2/metrics/my-project/my-metric",
537
| "type": "application/json"
538
| }
539
| },
540
| "_versionId": "version-id-123abc",
541
| "isNumeric": true,
542
| "unitAggregationType": "sum",
543
| "eventKey": "event-key-123abc",
544
| "nameInGroup": "Step 1",
545
| "randomizationUnits": [
546
| "user"
547
| ]
548
| }
549
| ]
550
| }
551
| ],
552
| "layerSnapshot": {
553
| "key": "checkout-flow",
554
| "name": "Checkout Flow",
555
| "reservationPercent": 10,
556
| "otherReservationPercent": 70
557
| },
558
| "covarianceInfo": {
559
| "id": "74a49a2b-4834-4246-917e-5d85231d8c2a",
560
| "fileName": "covariance.csv",
561
| "createdAt": 1
562
| },
563
| "secondaryMetrics": [
564
| {
565
| "key": "metric-key-123abc",
566
| "name": "Example metric",
567
| "kind": "custom",
568
| "_links": {
569
| "self": {
570
| "href": "/api/v2/metrics/my-project/my-metric",
571
| "type": "application/json"
572
| }
573
| },
574
| "_versionId": "version-id-123abc",
575
| "isNumeric": true,
576
| "unitAggregationType": "sum",
577
| "eventKey": "event-key-123abc"
578
| }
579
| ]
580
| }
581
| ]
582
| }
```
Get details about an experiment. ### Expanding the experiment response LaunchDarkly supports four fields for expanding the "Get experiment" response. By default, these fields are **not** included in the response. To expand the response, append the `expand` query parameter and add a comma-separated list with any of the following fields: - `previousIterations` includes all iterations prior to the current iteration. By default only the current iteration is included in the response. - `draftIteration` includes the iteration which has not been started yet, if any. - `secondaryMetrics` includes secondary metrics. By default only the primary metric is included in the response. - `treatments` includes all treatment and parameter details. By default treatment data is not included in the response. For example, `expand=draftIteration,treatments` includes the `draftIteration` and `treatments` fields in the response. If fields that you request with the `expand` query parameter are empty, they are not included in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired`format: "string"`
The project key
environmentKeystringRequired`format: "string"`
The environment key
experimentKeystringRequired`format: "string"`
The experiment key
### Query Parameters
expandstringOptional`format: "string"`
A comma-separated list of properties that can reveal additional information in the response. Supported fields are explained above.
### Response
Experiment response
keystring
The experiment key
namestring
The experiment name
_maintainerIdstring
The ID of the member who maintains this experiment.
_creationDatelong
Timestamp of when the experiment was created
environmentKeystring
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
_idstring or null
The experiment ID
descriptionstring or null
The experiment description
archivedDatelong or null
Timestamp of when the experiment was archived
tagslist of strings or null
Tags for the experiment
holdoutIdstring or null
The holdout ID
currentIterationobject or null
Details on the current iteration
Show 22 properties
draftIterationobject or null
Details on the current iteration. This iteration may be already started, or may still be a draft.
Show 22 properties
previousIterationslist of objects or null
Details on the previous iterations for this experiment.
Show 22 properties
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
Get details about an experiment.
### Expanding the experiment response
LaunchDarkly supports four fields for expanding the “Get experiment” response. By default, these fields are **not** included in the response.
To expand the response, append the `expand` query parameter and add a comma-separated list with any of the following fields:
 * `previousIterations` includes all iterations prior to the current iteration. By default only the current iteration is included in the response.
 * `draftIteration` includes the iteration which has not been started yet, if any.
 * `secondaryMetrics` includes secondary metrics. By default only the primary metric is included in the response.
 * `treatments` includes all treatment and parameter details. By default treatment data is not included in the response.
For example, `expand=draftIteration,treatments` includes the `draftIteration` and `treatments` fields in the response. If fields that you request with the `expand` query parameter are empty, they are not included in the response.