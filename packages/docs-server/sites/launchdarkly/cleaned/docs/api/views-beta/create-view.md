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
POST
/api/v2/projects/:projectKey/views
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/default/views"
4
| 
5
| payload = {
6
| "key": "key",
7
| "name": "name",
8
| "description": "",
9
| "generateSdkKeys": False,
10
| "maintainerId": "maintainerId",
11
| "maintainerTeamKey": "maintainerTeamKey",
12
| "tags": ["tags", "tags"]
13
| }
14
| headers = {
15
| "LD-API-Version": "beta",
16
| "Authorization": "<apiKey>",
17
| "Content-Type": "application/json"
18
| }
19
| 
20
| response = requests.post(url, json=payload, headers=headers)
21
| 
22
| print(response.json())
```
[](/docs/api/views-beta/create-view?explorer=true)
200Successful
```
1
| {
---|--- 
2
| "id": "id",
3
| "accountId": "accountId",
4
| "projectId": "projectId",
5
| "projectKey": "projectKey",
6
| "key": "key",
7
| "name": "name",
8
| "description": "description",
9
| "generateSdkKeys": true,
10
| "version": 0,
11
| "tags": [
12
| "tags",
13
| "tags"
14
| ],
15
| "createdAt": 6,
16
| "updatedAt": 1,
17
| "archived": false,
18
| "deleted": false,
19
| "_access": {
20
| "allowed": [
21
| {
22
| "action": "action",
23
| "reason": {
24
| "effect": "allow",
25
| "resources": [
26
| "proj/*:env/*;qa_*:/flag/*"
27
| ],
28
| "notResources": [
29
| "notResources",
30
| "notResources"
31
| ],
32
| "actions": [
33
| "*"
34
| ],
35
| "notActions": [
36
| "string",
37
| "string"
38
| ],
39
| "role_name": "role_name"
40
| }
41
| },
42
| {
43
| "action": "action",
44
| "reason": {
45
| "effect": "allow",
46
| "resources": [
47
| "proj/*:env/*;qa_*:/flag/*"
48
| ],
49
| "notResources": [
50
| "notResources",
51
| "notResources"
52
| ],
53
| "actions": [
54
| "*"
55
| ],
56
| "notActions": [
57
| "string",
58
| "string"
59
| ],
60
| "role_name": "role_name"
61
| }
62
| }
63
| ],
64
| "denied": [
65
| {
66
| "action": "action",
67
| "reason": {
68
| "effect": "allow",
69
| "resources": [
70
| "proj/*:env/*;qa_*:/flag/*"
71
| ],
72
| "notResources": [
73
| "notResources",
74
| "notResources"
75
| ],
76
| "actions": [
77
| "*"
78
| ],
79
| "notActions": [
80
| "string",
81
| "string"
82
| ],
83
| "role_name": "role_name"
84
| }
85
| },
86
| {
87
| "action": "action",
88
| "reason": {
89
| "effect": "allow",
90
| "resources": [
91
| "proj/*:env/*;qa_*:/flag/*"
92
| ],
93
| "notResources": [
94
| "notResources",
95
| "notResources"
96
| ],
97
| "actions": [
98
| "*"
99
| ],
100
| "notActions": [
101
| "string",
102
| "string"
103
| ],
104
| "role_name": "role_name"
105
| }
106
| }
107
| ]
108
| },
109
| "_links": {
110
| "self": {
111
| "href": "href",
112
| "type": "type"
113
| },
114
| "parent": {
115
| "href": "href",
116
| "type": "type"
117
| }
118
| },
119
| "archivedAt": 5,
120
| "deletedAt": 5,
121
| "maintainer": {
122
| "id": "id",
123
| "kind": "kind",
124
| "maintainerMember": {
125
| "id": "id",
126
| "email": "email",
127
| "role": "role",
128
| "firstName": "firstName",
129
| "lastName": "lastName"
130
| },
131
| "maintainerTeam": {
132
| "id": "id",
133
| "key": "key",
134
| "name": "name"
135
| }
136
| },
137
| "flagsSummary": {
138
| "count": 2,
139
| "linkedFlags": {
140
| "items": [
141
| {
142
| "key": "key",
143
| "name": "name",
144
| "links": {
145
| "self": {
146
| "href": "href",
147
| "type": "type"
148
| }
149
| }
150
| },
151
| {
152
| "key": "key",
153
| "name": "name",
154
| "links": {
155
| "self": {
156
| "href": "href",
157
| "type": "type"
158
| }
159
| }
160
| }
161
| ],
162
| "totalCount": 7
163
| }
164
| },
165
| "segmentsSummary": {
166
| "count": 9,
167
| "linkedSegments": {
168
| "items": [
169
| {
170
| "key": "key",
171
| "name": "name",
172
| "environmentId": "environmentId",
173
| "links": {
174
| "self": {
175
| "href": "href",
176
| "type": "type"
177
| }
178
| }
179
| },
180
| {
181
| "key": "key",
182
| "name": "name",
183
| "environmentId": "environmentId",
184
| "links": {
185
| "self": {
186
| "href": "href",
187
| "type": "type"
188
| }
189
| }
190
| }
191
| ],
192
| "totalCount": 3
193
| }
194
| },
195
| "metricsSummary": {
196
| "count": 2
197
| },
198
| "aiConfigsSummary": {
199
| "count": 4
200
| },
201
| "resourceSummary": {
202
| "flagCount": 7,
203
| "totalCount": 6,
204
| "segmentCount": 1,
205
| "metricCount": 1,
206
| "aiConfigCount": 1
207
| },
208
| "flagsExpanded": {
209
| "items": [
210
| {
211
| "key": "key",
212
| "name": "name",
213
| "description": "description",
214
| "creationDate": 7,
215
| "version": 1,
216
| "archived": true,
217
| "tags": [
218
| "tags",
219
| "tags"
220
| ],
221
| "temporary": true,
222
| "includeInSnippet": true,
223
| "_links": {
224
| "self": {
225
| "href": "href",
226
| "type": "type"
227
| },
228
| "parent": {
229
| "href": "href",
230
| "type": "type"
231
| }
232
| }
233
| },
234
| {
235
| "key": "key",
236
| "name": "name",
237
| "description": "description",
238
| "creationDate": 7,
239
| "version": 1,
240
| "archived": true,
241
| "tags": [
242
| "tags",
243
| "tags"
244
| ],
245
| "temporary": true,
246
| "includeInSnippet": true,
247
| "_links": {
248
| "self": {
249
| "href": "href",
250
| "type": "type"
251
| },
252
| "parent": {
253
| "href": "href",
254
| "type": "type"
255
| }
256
| }
257
| }
258
| ],
259
| "totalCount": 4
260
| },
261
| "segmentsExpanded": {
262
| "items": [
263
| {
264
| "key": "key",
265
| "name": "name",
266
| "environmentId": "environmentId",
267
| "environmentKey": "environmentKey",
268
| "description": "description",
269
| "creationDate": 5,
270
| "lastModifiedDate": 9,
271
| "deleted": true,
272
| "tags": [
273
| "tags",
274
| "tags"
275
| ],
276
| "unbounded": true,
277
| "version": 9,
278
| "generation": 6,
279
| "_links": {
280
| "self": {
281
| "href": "href",
282
| "type": "type"
283
| },
284
| "parent": {
285
| "href": "href",
286
| "type": "type"
287
| }
288
| }
289
| },
290
| {
291
| "key": "key",
292
| "name": "name",
293
| "environmentId": "environmentId",
294
| "environmentKey": "environmentKey",
295
| "description": "description",
296
| "creationDate": 5,
297
| "lastModifiedDate": 9,
298
| "deleted": true,
299
| "tags": [
300
| "tags",
301
| "tags"
302
| ],
303
| "unbounded": true,
304
| "version": 9,
305
| "generation": 6,
306
| "_links": {
307
| "self": {
308
| "href": "href",
309
| "type": "type"
310
| },
311
| "parent": {
312
| "href": "href",
313
| "type": "type"
314
| }
315
| }
316
| }
317
| ],
318
| "totalCount": 8
319
| },
320
| "metricsExpanded": {
321
| "items": [
322
| {
323
| "key": "key",
324
| "name": "name",
325
| "creationDate": 9,
326
| "lastModified": 6,
327
| "isActive": true,
328
| "eventKey": "eventKey",
329
| "_id": "_id",
330
| "_versionId": "_versionId",
331
| "kind": "kind",
332
| "category": "category",
333
| "description": "description",
334
| "isNumeric": true,
335
| "lastSeen": 3,
336
| "_links": {
337
| "self": {
338
| "href": "href",
339
| "type": "type"
340
| },
341
| "parent": {
342
| "href": "href",
343
| "type": "type"
344
| }
345
| }
346
| },
347
| {
348
| "key": "key",
349
| "name": "name",
350
| "creationDate": 9,
351
| "lastModified": 6,
352
| "isActive": true,
353
| "eventKey": "eventKey",
354
| "_id": "_id",
355
| "_versionId": "_versionId",
356
| "kind": "kind",
357
| "category": "category",
358
| "description": "description",
359
| "isNumeric": true,
360
| "lastSeen": 3,
361
| "_links": {
362
| "self": {
363
| "href": "href",
364
| "type": "type"
365
| },
366
| "parent": {
367
| "href": "href",
368
| "type": "type"
369
| }
370
| }
371
| }
372
| ],
373
| "totalCount": 6
374
| },
375
| "aiConfigsExpanded": {
376
| "items": [
377
| {
378
| "key": "key",
379
| "name": "name",
380
| "tags": [
381
| "tags",
382
| "tags"
383
| ],
384
| "description": "description",
385
| "version": 1,
386
| "createdAt": 2,
387
| "updatedAt": 6,
388
| "flagKey": "flagKey",
389
| "_links": {
390
| "self": {
391
| "href": "href",
392
| "type": "type"
393
| },
394
| "parent": {
395
| "href": "href",
396
| "type": "type"
397
| }
398
| }
399
| },
400
| {
401
| "key": "key",
402
| "name": "name",
403
| "tags": [
404
| "tags",
405
| "tags"
406
| ],
407
| "description": "description",
408
| "version": 1,
409
| "createdAt": 2,
410
| "updatedAt": 6,
411
| "flagKey": "flagKey",
412
| "_links": {
413
| "self": {
414
| "href": "href",
415
| "type": "type"
416
| },
417
| "parent": {
418
| "href": "href",
419
| "type": "type"
420
| }
421
| }
422
| }
423
| ],
424
| "totalCount": 6
425
| },
426
| "resourcesExpanded": {
427
| "items": {
428
| "flags": {
429
| "items": [
430
| {
431
| "key": "key",
432
| "name": "name",
433
| "description": "description",
434
| "creationDate": 7,
435
| "version": 1,
436
| "archived": true,
437
| "tags": [
438
| "tags",
439
| "tags"
440
| ],
441
| "temporary": true,
442
| "includeInSnippet": true,
443
| "_links": {
444
| "self": {
445
| "href": "href",
446
| "type": "type"
447
| },
448
| "parent": {
449
| "href": "href",
450
| "type": "type"
451
| }
452
| }
453
| },
454
| {
455
| "key": "key",
456
| "name": "name",
457
| "description": "description",
458
| "creationDate": 7,
459
| "version": 1,
460
| "archived": true,
461
| "tags": [
462
| "tags",
463
| "tags"
464
| ],
465
| "temporary": true,
466
| "includeInSnippet": true,
467
| "_links": {
468
| "self": {
469
| "href": "href",
470
| "type": "type"
471
| },
472
| "parent": {
473
| "href": "href",
474
| "type": "type"
475
| }
476
| }
477
| }
478
| ],
479
| "totalCount": 5
480
| },
481
| "segments": {
482
| "items": [
483
| {
484
| "key": "key",
485
| "name": "name",
486
| "environmentId": "environmentId",
487
| "environmentKey": "environmentKey",
488
| "description": "description",
489
| "creationDate": 5,
490
| "lastModifiedDate": 9,
491
| "deleted": true,
492
| "tags": [
493
| "tags",
494
| "tags"
495
| ],
496
| "unbounded": true,
497
| "version": 9,
498
| "generation": 6,
499
| "_links": {
500
| "self": {
501
| "href": "href",
502
| "type": "type"
503
| },
504
| "parent": {
505
| "href": "href",
506
| "type": "type"
507
| }
508
| }
509
| },
510
| {
511
| "key": "key",
512
| "name": "name",
513
| "environmentId": "environmentId",
514
| "environmentKey": "environmentKey",
515
| "description": "description",
516
| "creationDate": 5,
517
| "lastModifiedDate": 9,
518
| "deleted": true,
519
| "tags": [
520
| "tags",
521
| "tags"
522
| ],
523
| "unbounded": true,
524
| "version": 9,
525
| "generation": 6,
526
| "_links": {
527
| "self": {
528
| "href": "href",
529
| "type": "type"
530
| },
531
| "parent": {
532
| "href": "href",
533
| "type": "type"
534
| }
535
| }
536
| }
537
| ],
538
| "totalCount": 6
539
| },
540
| "aiConfigs": {
541
| "items": [
542
| {
543
| "key": "key",
544
| "name": "name",
545
| "tags": [
546
| "tags",
547
| "tags"
548
| ],
549
| "description": "description",
550
| "version": 1,
551
| "createdAt": 2,
552
| "updatedAt": 6,
553
| "flagKey": "flagKey",
554
| "_links": {
555
| "self": {
556
| "href": "href",
557
| "type": "type"
558
| },
559
| "parent": {
560
| "href": "href",
561
| "type": "type"
562
| }
563
| }
564
| },
565
| {
566
| "key": "key",
567
| "name": "name",
568
| "tags": [
569
| "tags",
570
| "tags"
571
| ],
572
| "description": "description",
573
| "version": 1,
574
| "createdAt": 2,
575
| "updatedAt": 6,
576
| "flagKey": "flagKey",
577
| "_links": {
578
| "self": {
579
| "href": "href",
580
| "type": "type"
581
| },
582
| "parent": {
583
| "href": "href",
584
| "type": "type"
585
| }
586
| }
587
| }
588
| ],
589
| "totalCount": 3
590
| },
591
| "metrics": {
592
| "items": [
593
| {
594
| "key": "key",
595
| "name": "name",
596
| "creationDate": 9,
597
| "lastModified": 6,
598
| "isActive": true,
599
| "eventKey": "eventKey",
600
| "_id": "_id",
601
| "_versionId": "_versionId",
602
| "kind": "kind",
603
| "category": "category",
604
| "description": "description",
605
| "isNumeric": true,
606
| "lastSeen": 3,
607
| "_links": {
608
| "self": {
609
| "href": "href",
610
| "type": "type"
611
| },
612
| "parent": {
613
| "href": "href",
614
| "type": "type"
615
| }
616
| }
617
| },
618
| {
619
| "key": "key",
620
| "name": "name",
621
| "creationDate": 9,
622
| "lastModified": 6,
623
| "isActive": true,
624
| "eventKey": "eventKey",
625
| "_id": "_id",
626
| "_versionId": "_versionId",
627
| "kind": "kind",
628
| "category": "category",
629
| "description": "description",
630
| "isNumeric": true,
631
| "lastSeen": 3,
632
| "_links": {
633
| "self": {
634
| "href": "href",
635
| "type": "type"
636
| },
637
| "parent": {
638
| "href": "href",
639
| "type": "type"
640
| }
641
| }
642
| }
643
| ],
644
| "totalCount": 3
645
| }
646
| },
647
| "totalCount": 7
648
| }
649
| }
```
Create a new view in the given project.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired
### Headers
LD-API-VersionenumRequired
Version of the endpoint.
Allowed values:beta
### Request
View object to create
keystringRequired
Unique key for the view within the account/project
namestringRequired
Human-readable name for the view
descriptionstringOptionalDefaults to 
Optional detailed description of the view
generateSdkKeysbooleanOptionalDefaults to `false`
Whether to generate SDK keys for this view
maintainerIdstringOptional
Member ID of the maintainer for this view. Only one of `maintainerId` or `maintainerTeamKey` can be specified.
maintainerTeamKeystringOptional
Key of the maintainer team for this view. Only one of `maintainerId` or `maintainerTeamKey` can be specified.
tagslist of stringsOptional
Tags associated with this view
### Response
Successful response
idstring`format: "string"`
Unique ID of this view
accountIdstring
ID of the account that owns this view
projectIdstring
ID of the project this view belongs to
projectKeystring
Key of the project this view belongs to
keystring
Unique key for the view within the account/project
namestring
Human-readable name for the view
descriptionstring
Optional detailed description of the view
generateSdkKeysboolean
Whether to generate SDK keys for this view. Defaults to false.
versioninteger
Version number for tracking changes
tagslist of strings
Tags associated with this view
createdAtlong
updatedAtlong
archivedbooleanDefaults to `false`
Whether this view is archived
deletedbooleanDefaults to `false`
Whether this view is deleted
_accessobject or null
Show 2 properties
_linksobject or null
The location and content type of related resources
Show 2 properties
archivedAtlong or null
deletedAtlong or null
maintainerobject or null
Show 4 properties
flagsSummaryobject or null
Show 2 properties
segmentsSummaryobject or null
Show 2 properties
metricsSummaryobject or null
Show 1 properties
aiConfigsSummaryobject or null
Show 1 properties
resourceSummaryobject or null
Show 5 properties
flagsExpandedobject or null
Details on linked flags for a view - requires passing the ‘allFlags’ expand field
Show 2 properties
segmentsExpandedobject or null
Details on linked segments for a view - requires passing the ‘allSegments’ expand field
Show 2 properties
metricsExpandedobject or null
Show 2 properties
aiConfigsExpandedobject or null
Show 2 properties
resourcesExpandedobject or null
Details on linked resources for a view - requires passing the ‘allResources’ expand field
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