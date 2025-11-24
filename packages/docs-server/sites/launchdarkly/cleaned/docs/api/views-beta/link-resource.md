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
/api/v2/projects/:projectKey/views/:viewKey/link/:resourceType
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/default/views/my-view/link/flags"
4
| 
5
| payload = {
6
| "keys": ["keys", "keys"],
7
| "comment": ""
8
| }
9
| headers = {
10
| "LD-API-Version": "beta",
11
| "Authorization": "<apiKey>",
12
| "Content-Type": "application/json"
13
| }
14
| 
15
| response = requests.post(url, json=payload, headers=headers)
16
| 
17
| print(response.json())
```
[](/docs/api/views-beta/link-resource?explorer=true)
200Successful
```
1
| {
---|--- 
2
| "successCount": 0,
3
| "failureCount": 6,
4
| "linkedResources": {
5
| "items": [
6
| {
7
| "_links": {
8
| "self": {
9
| "href": "href",
10
| "type": "type"
11
| },
12
| "parent": {
13
| "href": "href",
14
| "type": "type"
15
| }
16
| },
17
| "resourceKey": "resourceKey",
18
| "resourceType": "flag",
19
| "linkedAt": 1,
20
| "environmentId": "environmentId",
21
| "environmentKey": "environmentKey",
22
| "resourceDetails": {
23
| "view": {
24
| "id": "id",
25
| "accountId": "accountId",
26
| "projectId": "projectId",
27
| "projectKey": "projectKey",
28
| "key": "key",
29
| "name": "name",
30
| "description": "description",
31
| "generateSdkKeys": true,
32
| "version": 0,
33
| "tags": [
34
| "tags",
35
| "tags"
36
| ],
37
| "createdAt": 6,
38
| "updatedAt": 1,
39
| "archived": false,
40
| "deleted": false,
41
| "_access": {
42
| "allowed": [
43
| {
44
| "action": "action",
45
| "reason": {
46
| "effect": "allow",
47
| "resources": [
48
| "proj/*:env/*;qa_*:/flag/*"
49
| ],
50
| "notResources": [
51
| "notResources",
52
| "notResources"
53
| ],
54
| "actions": [
55
| "*"
56
| ],
57
| "notActions": [
58
| "string",
59
| "string"
60
| ],
61
| "role_name": "role_name"
62
| }
63
| },
64
| {
65
| "action": "action",
66
| "reason": {
67
| "effect": "allow",
68
| "resources": [
69
| "proj/*:env/*;qa_*:/flag/*"
70
| ],
71
| "notResources": [
72
| "notResources",
73
| "notResources"
74
| ],
75
| "actions": [
76
| "*"
77
| ],
78
| "notActions": [
79
| "string",
80
| "string"
81
| ],
82
| "role_name": "role_name"
83
| }
84
| }
85
| ],
86
| "denied": [
87
| {
88
| "action": "action",
89
| "reason": {
90
| "effect": "allow",
91
| "resources": [
92
| "proj/*:env/*;qa_*:/flag/*"
93
| ],
94
| "notResources": [
95
| "notResources",
96
| "notResources"
97
| ],
98
| "actions": [
99
| "*"
100
| ],
101
| "notActions": [
102
| "string",
103
| "string"
104
| ],
105
| "role_name": "role_name"
106
| }
107
| },
108
| {
109
| "action": "action",
110
| "reason": {
111
| "effect": "allow",
112
| "resources": [
113
| "proj/*:env/*;qa_*:/flag/*"
114
| ],
115
| "notResources": [
116
| "notResources",
117
| "notResources"
118
| ],
119
| "actions": [
120
| "*"
121
| ],
122
| "notActions": [
123
| "string",
124
| "string"
125
| ],
126
| "role_name": "role_name"
127
| }
128
| }
129
| ]
130
| },
131
| "_links": {
132
| "self": {
133
| "href": "href",
134
| "type": "type"
135
| },
136
| "parent": {
137
| "href": "href",
138
| "type": "type"
139
| }
140
| },
141
| "archivedAt": 5,
142
| "deletedAt": 5,
143
| "maintainer": {
144
| "id": "id",
145
| "kind": "kind",
146
| "maintainerMember": {
147
| "id": "id",
148
| "email": "email",
149
| "role": "role",
150
| "firstName": "firstName",
151
| "lastName": "lastName"
152
| },
153
| "maintainerTeam": {
154
| "id": "id",
155
| "key": "key",
156
| "name": "name"
157
| }
158
| },
159
| "flagsSummary": {
160
| "count": 2,
161
| "linkedFlags": {
162
| "items": [
163
| {
164
| "key": "key",
165
| "name": "name",
166
| "links": {
167
| "self": {
168
| "href": "href",
169
| "type": "type"
170
| }
171
| }
172
| },
173
| {
174
| "key": "key",
175
| "name": "name",
176
| "links": {
177
| "self": {
178
| "href": "href",
179
| "type": "type"
180
| }
181
| }
182
| }
183
| ],
184
| "totalCount": 7
185
| }
186
| },
187
| "segmentsSummary": {
188
| "count": 9,
189
| "linkedSegments": {
190
| "items": [
191
| {
192
| "key": "key",
193
| "name": "name",
194
| "environmentId": "environmentId",
195
| "links": {
196
| "self": {
197
| "href": "href",
198
| "type": "type"
199
| }
200
| }
201
| },
202
| {
203
| "key": "key",
204
| "name": "name",
205
| "environmentId": "environmentId",
206
| "links": {
207
| "self": {
208
| "href": "href",
209
| "type": "type"
210
| }
211
| }
212
| }
213
| ],
214
| "totalCount": 3
215
| }
216
| },
217
| "metricsSummary": {
218
| "count": 2
219
| },
220
| "aiConfigsSummary": {
221
| "count": 4
222
| },
223
| "resourceSummary": {
224
| "flagCount": 7,
225
| "totalCount": 6,
226
| "segmentCount": 1,
227
| "metricCount": 1,
228
| "aiConfigCount": 1
229
| },
230
| "flagsExpanded": {
231
| "items": [
232
| {
233
| "key": "key",
234
| "name": "name",
235
| "description": "description",
236
| "creationDate": 7,
237
| "version": 1,
238
| "archived": true,
239
| "tags": [
240
| "tags",
241
| "tags"
242
| ],
243
| "temporary": true,
244
| "includeInSnippet": true,
245
| "_links": {
246
| "self": {
247
| "href": "href",
248
| "type": "type"
249
| },
250
| "parent": {
251
| "href": "href",
252
| "type": "type"
253
| }
254
| }
255
| },
256
| {
257
| "key": "key",
258
| "name": "name",
259
| "description": "description",
260
| "creationDate": 7,
261
| "version": 1,
262
| "archived": true,
263
| "tags": [
264
| "tags",
265
| "tags"
266
| ],
267
| "temporary": true,
268
| "includeInSnippet": true,
269
| "_links": {
270
| "self": {
271
| "href": "href",
272
| "type": "type"
273
| },
274
| "parent": {
275
| "href": "href",
276
| "type": "type"
277
| }
278
| }
279
| }
280
| ],
281
| "totalCount": 4
282
| },
283
| "segmentsExpanded": {
284
| "items": [
285
| {
286
| "key": "key",
287
| "name": "name",
288
| "environmentId": "environmentId",
289
| "environmentKey": "environmentKey",
290
| "description": "description",
291
| "creationDate": 5,
292
| "lastModifiedDate": 9,
293
| "deleted": true,
294
| "tags": [
295
| "tags",
296
| "tags"
297
| ],
298
| "unbounded": true,
299
| "version": 9,
300
| "generation": 6,
301
| "_links": {
302
| "self": {
303
| "href": "href",
304
| "type": "type"
305
| },
306
| "parent": {
307
| "href": "href",
308
| "type": "type"
309
| }
310
| }
311
| },
312
| {
313
| "key": "key",
314
| "name": "name",
315
| "environmentId": "environmentId",
316
| "environmentKey": "environmentKey",
317
| "description": "description",
318
| "creationDate": 5,
319
| "lastModifiedDate": 9,
320
| "deleted": true,
321
| "tags": [
322
| "tags",
323
| "tags"
324
| ],
325
| "unbounded": true,
326
| "version": 9,
327
| "generation": 6,
328
| "_links": {
329
| "self": {
330
| "href": "href",
331
| "type": "type"
332
| },
333
| "parent": {
334
| "href": "href",
335
| "type": "type"
336
| }
337
| }
338
| }
339
| ],
340
| "totalCount": 8
341
| },
342
| "metricsExpanded": {
343
| "items": [
344
| {
345
| "key": "key",
346
| "name": "name",
347
| "creationDate": 9,
348
| "lastModified": 6,
349
| "isActive": true,
350
| "eventKey": "eventKey",
351
| "_id": "_id",
352
| "_versionId": "_versionId",
353
| "kind": "kind",
354
| "category": "category",
355
| "description": "description",
356
| "isNumeric": true,
357
| "lastSeen": 3,
358
| "_links": {
359
| "self": {
360
| "href": "href",
361
| "type": "type"
362
| },
363
| "parent": {
364
| "href": "href",
365
| "type": "type"
366
| }
367
| }
368
| },
369
| {
370
| "key": "key",
371
| "name": "name",
372
| "creationDate": 9,
373
| "lastModified": 6,
374
| "isActive": true,
375
| "eventKey": "eventKey",
376
| "_id": "_id",
377
| "_versionId": "_versionId",
378
| "kind": "kind",
379
| "category": "category",
380
| "description": "description",
381
| "isNumeric": true,
382
| "lastSeen": 3,
383
| "_links": {
384
| "self": {
385
| "href": "href",
386
| "type": "type"
387
| },
388
| "parent": {
389
| "href": "href",
390
| "type": "type"
391
| }
392
| }
393
| }
394
| ],
395
| "totalCount": 6
396
| },
397
| "aiConfigsExpanded": {
398
| "items": [
399
| {
400
| "key": "key",
401
| "name": "name",
402
| "tags": [
403
| "tags",
404
| "tags"
405
| ],
406
| "description": "description",
407
| "version": 1,
408
| "createdAt": 2,
409
| "updatedAt": 6,
410
| "flagKey": "flagKey",
411
| "_links": {
412
| "self": {
413
| "href": "href",
414
| "type": "type"
415
| },
416
| "parent": {
417
| "href": "href",
418
| "type": "type"
419
| }
420
| }
421
| },
422
| {
423
| "key": "key",
424
| "name": "name",
425
| "tags": [
426
| "tags",
427
| "tags"
428
| ],
429
| "description": "description",
430
| "version": 1,
431
| "createdAt": 2,
432
| "updatedAt": 6,
433
| "flagKey": "flagKey",
434
| "_links": {
435
| "self": {
436
| "href": "href",
437
| "type": "type"
438
| },
439
| "parent": {
440
| "href": "href",
441
| "type": "type"
442
| }
443
| }
444
| }
445
| ],
446
| "totalCount": 6
447
| },
448
| "resourcesExpanded": {
449
| "items": {
450
| "flags": {
451
| "items": [
452
| {
453
| "key": "key",
454
| "name": "name",
455
| "description": "description",
456
| "creationDate": 7,
457
| "version": 1,
458
| "archived": true,
459
| "tags": [
460
| "tags",
461
| "tags"
462
| ],
463
| "temporary": true,
464
| "includeInSnippet": true,
465
| "_links": {
466
| "self": {
467
| "href": "href",
468
| "type": "type"
469
| },
470
| "parent": {
471
| "href": "href",
472
| "type": "type"
473
| }
474
| }
475
| },
476
| {
477
| "key": "key",
478
| "name": "name",
479
| "description": "description",
480
| "creationDate": 7,
481
| "version": 1,
482
| "archived": true,
483
| "tags": [
484
| "tags",
485
| "tags"
486
| ],
487
| "temporary": true,
488
| "includeInSnippet": true,
489
| "_links": {
490
| "self": {
491
| "href": "href",
492
| "type": "type"
493
| },
494
| "parent": {
495
| "href": "href",
496
| "type": "type"
497
| }
498
| }
499
| }
500
| ],
501
| "totalCount": 5
502
| },
503
| "segments": {
504
| "items": [
505
| {
506
| "key": "key",
507
| "name": "name",
508
| "environmentId": "environmentId",
509
| "environmentKey": "environmentKey",
510
| "description": "description",
511
| "creationDate": 5,
512
| "lastModifiedDate": 9,
513
| "deleted": true,
514
| "tags": [
515
| "tags",
516
| "tags"
517
| ],
518
| "unbounded": true,
519
| "version": 9,
520
| "generation": 6,
521
| "_links": {
522
| "self": {
523
| "href": "href",
524
| "type": "type"
525
| },
526
| "parent": {
527
| "href": "href",
528
| "type": "type"
529
| }
530
| }
531
| },
532
| {
533
| "key": "key",
534
| "name": "name",
535
| "environmentId": "environmentId",
536
| "environmentKey": "environmentKey",
537
| "description": "description",
538
| "creationDate": 5,
539
| "lastModifiedDate": 9,
540
| "deleted": true,
541
| "tags": [
542
| "tags",
543
| "tags"
544
| ],
545
| "unbounded": true,
546
| "version": 9,
547
| "generation": 6,
548
| "_links": {
549
| "self": {
550
| "href": "href",
551
| "type": "type"
552
| },
553
| "parent": {
554
| "href": "href",
555
| "type": "type"
556
| }
557
| }
558
| }
559
| ],
560
| "totalCount": 6
561
| },
562
| "aiConfigs": {
563
| "items": [
564
| {
565
| "key": "key",
566
| "name": "name",
567
| "tags": [
568
| "tags",
569
| "tags"
570
| ],
571
| "description": "description",
572
| "version": 1,
573
| "createdAt": 2,
574
| "updatedAt": 6,
575
| "flagKey": "flagKey",
576
| "_links": {
577
| "self": {
578
| "href": "href",
579
| "type": "type"
580
| },
581
| "parent": {
582
| "href": "href",
583
| "type": "type"
584
| }
585
| }
586
| },
587
| {
588
| "key": "key",
589
| "name": "name",
590
| "tags": [
591
| "tags",
592
| "tags"
593
| ],
594
| "description": "description",
595
| "version": 1,
596
| "createdAt": 2,
597
| "updatedAt": 6,
598
| "flagKey": "flagKey",
599
| "_links": {
600
| "self": {
601
| "href": "href",
602
| "type": "type"
603
| },
604
| "parent": {
605
| "href": "href",
606
| "type": "type"
607
| }
608
| }
609
| }
610
| ],
611
| "totalCount": 3
612
| },
613
| "metrics": {
614
| "items": [
615
| {
616
| "key": "key",
617
| "name": "name",
618
| "creationDate": 9,
619
| "lastModified": 6,
620
| "isActive": true,
621
| "eventKey": "eventKey",
622
| "_id": "_id",
623
| "_versionId": "_versionId",
624
| "kind": "kind",
625
| "category": "category",
626
| "description": "description",
627
| "isNumeric": true,
628
| "lastSeen": 3,
629
| "_links": {
630
| "self": {
631
| "href": "href",
632
| "type": "type"
633
| },
634
| "parent": {
635
| "href": "href",
636
| "type": "type"
637
| }
638
| }
639
| },
640
| {
641
| "key": "key",
642
| "name": "name",
643
| "creationDate": 9,
644
| "lastModified": 6,
645
| "isActive": true,
646
| "eventKey": "eventKey",
647
| "_id": "_id",
648
| "_versionId": "_versionId",
649
| "kind": "kind",
650
| "category": "category",
651
| "description": "description",
652
| "isNumeric": true,
653
| "lastSeen": 3,
654
| "_links": {
655
| "self": {
656
| "href": "href",
657
| "type": "type"
658
| },
659
| "parent": {
660
| "href": "href",
661
| "type": "type"
662
| }
663
| }
664
| }
665
| ],
666
| "totalCount": 3
667
| }
668
| },
669
| "totalCount": 7
670
| }
671
| },
672
| "flag": {
673
| "key": "key",
674
| "name": "name",
675
| "description": "description",
676
| "creationDate": 7,
677
| "version": 1,
678
| "archived": true,
679
| "tags": [
680
| "tags",
681
| "tags"
682
| ],
683
| "temporary": true,
684
| "includeInSnippet": true,
685
| "_links": {
686
| "self": {
687
| "href": "href",
688
| "type": "type"
689
| },
690
| "parent": {
691
| "href": "href",
692
| "type": "type"
693
| }
694
| }
695
| },
696
| "segment": {
697
| "key": "key",
698
| "name": "name",
699
| "environmentId": "environmentId",
700
| "environmentKey": "environmentKey",
701
| "description": "description",
702
| "creationDate": 5,
703
| "lastModifiedDate": 9,
704
| "deleted": true,
705
| "tags": [
706
| "tags",
707
| "tags"
708
| ],
709
| "unbounded": true,
710
| "version": 9,
711
| "generation": 6,
712
| "_links": {
713
| "self": {
714
| "href": "href",
715
| "type": "type"
716
| },
717
| "parent": {
718
| "href": "href",
719
| "type": "type"
720
| }
721
| }
722
| },
723
| "aiConfig": {
724
| "key": "key",
725
| "name": "name",
726
| "tags": [
727
| "tags",
728
| "tags"
729
| ],
730
| "description": "description",
731
| "version": 1,
732
| "createdAt": 2,
733
| "updatedAt": 6,
734
| "flagKey": "flagKey",
735
| "_links": {
736
| "self": {
737
| "href": "href",
738
| "type": "type"
739
| },
740
| "parent": {
741
| "href": "href",
742
| "type": "type"
743
| }
744
| }
745
| },
746
| "metric": {
747
| "key": "key",
748
| "name": "name",
749
| "creationDate": 9,
750
| "lastModified": 6,
751
| "isActive": true,
752
| "eventKey": "eventKey",
753
| "_id": "_id",
754
| "_versionId": "_versionId",
755
| "kind": "kind",
756
| "category": "category",
757
| "description": "description",
758
| "isNumeric": true,
759
| "lastSeen": 3,
760
| "_links": {
761
| "self": {
762
| "href": "href",
763
| "type": "type"
764
| },
765
| "parent": {
766
| "href": "href",
767
| "type": "type"
768
| }
769
| }
770
| }
771
| }
772
| },
773
| {
774
| "_links": {
775
| "self": {
776
| "href": "href",
777
| "type": "type"
778
| },
779
| "parent": {
780
| "href": "href",
781
| "type": "type"
782
| }
783
| },
784
| "resourceKey": "resourceKey",
785
| "resourceType": "flag",
786
| "linkedAt": 1,
787
| "environmentId": "environmentId",
788
| "environmentKey": "environmentKey",
789
| "resourceDetails": {
790
| "view": {
791
| "id": "id",
792
| "accountId": "accountId",
793
| "projectId": "projectId",
794
| "projectKey": "projectKey",
795
| "key": "key",
796
| "name": "name",
797
| "description": "description",
798
| "generateSdkKeys": true,
799
| "version": 0,
800
| "tags": [
801
| "tags",
802
| "tags"
803
| ],
804
| "createdAt": 6,
805
| "updatedAt": 1,
806
| "archived": false,
807
| "deleted": false,
808
| "_access": {
809
| "allowed": [
810
| {
811
| "action": "action",
812
| "reason": {
813
| "effect": "allow",
814
| "resources": [
815
| "proj/*:env/*;qa_*:/flag/*"
816
| ],
817
| "notResources": [
818
| "notResources",
819
| "notResources"
820
| ],
821
| "actions": [
822
| "*"
823
| ],
824
| "notActions": [
825
| "string",
826
| "string"
827
| ],
828
| "role_name": "role_name"
829
| }
830
| },
831
| {
832
| "action": "action",
833
| "reason": {
834
| "effect": "allow",
835
| "resources": [
836
| "proj/*:env/*;qa_*:/flag/*"
837
| ],
838
| "notResources": [
839
| "notResources",
840
| "notResources"
841
| ],
842
| "actions": [
843
| "*"
844
| ],
845
| "notActions": [
846
| "string",
847
| "string"
848
| ],
849
| "role_name": "role_name"
850
| }
851
| }
852
| ],
853
| "denied": [
854
| {
855
| "action": "action",
856
| "reason": {
857
| "effect": "allow",
858
| "resources": [
859
| "proj/*:env/*;qa_*:/flag/*"
860
| ],
861
| "notResources": [
862
| "notResources",
863
| "notResources"
864
| ],
865
| "actions": [
866
| "*"
867
| ],
868
| "notActions": [
869
| "string",
870
| "string"
871
| ],
872
| "role_name": "role_name"
873
| }
874
| },
875
| {
876
| "action": "action",
877
| "reason": {
878
| "effect": "allow",
879
| "resources": [
880
| "proj/*:env/*;qa_*:/flag/*"
881
| ],
882
| "notResources": [
883
| "notResources",
884
| "notResources"
885
| ],
886
| "actions": [
887
| "*"
888
| ],
889
| "notActions": [
890
| "string",
891
| "string"
892
| ],
893
| "role_name": "role_name"
894
| }
895
| }
896
| ]
897
| },
898
| "_links": {
899
| "self": {
900
| "href": "href",
901
| "type": "type"
902
| },
903
| "parent": {
904
| "href": "href",
905
| "type": "type"
906
| }
907
| },
908
| "archivedAt": 5,
909
| "deletedAt": 5,
910
| "maintainer": {
911
| "id": "id",
912
| "kind": "kind",
913
| "maintainerMember": {
914
| "id": "id",
915
| "email": "email",
916
| "role": "role",
917
| "firstName": "firstName",
918
| "lastName": "lastName"
919
| },
920
| "maintainerTeam": {
921
| "id": "id",
922
| "key": "key",
923
| "name": "name"
924
| }
925
| },
926
| "flagsSummary": {
927
| "count": 2,
928
| "linkedFlags": {
929
| "items": [
930
| {
931
| "key": "key",
932
| "name": "name",
933
| "links": {
934
| "self": {
935
| "href": "href",
936
| "type": "type"
937
| }
938
| }
939
| },
940
| {
941
| "key": "key",
942
| "name": "name",
943
| "links": {
944
| "self": {
945
| "href": "href",
946
| "type": "type"
947
| }
948
| }
949
| }
950
| ],
951
| "totalCount": 7
952
| }
953
| },
954
| "segmentsSummary": {
955
| "count": 9,
956
| "linkedSegments": {
957
| "items": [
958
| {
959
| "key": "key",
960
| "name": "name",
961
| "environmentId": "environmentId",
962
| "links": {
963
| "self": {
964
| "href": "href",
965
| "type": "type"
966
| }
967
| }
968
| },
969
| {
970
| "key": "key",
971
| "name": "name",
972
| "environmentId": "environmentId",
973
| "links": {
974
| "self": {
975
| "href": "href",
976
| "type": "type"
977
| }
978
| }
979
| }
980
| ],
981
| "totalCount": 3
982
| }
983
| },
984
| "metricsSummary": {
985
| "count": 2
986
| },
987
| "aiConfigsSummary": {
988
| "count": 4
989
| },
990
| "resourceSummary": {
991
| "flagCount": 7,
992
| "totalCount": 6,
993
| "segmentCount": 1,
994
| "metricCount": 1,
995
| "aiConfigCount": 1
996
| },
997
| "flagsExpanded": {
998
| "items": [
999
| {
1000
| "key": "key",
1001
| "name": "name",
1002
| "description": "description",
1003
| "creationDate": 7,
1004
| "version": 1,
1005
| "archived": true,
1006
| "tags": [
1007
| "tags",
1008
| "tags"
1009
| ],
1010
| "temporary": true,
1011
| "includeInSnippet": true,
1012
| "_links": {
1013
| "self": {
1014
| "href": "href",
1015
| "type": "type"
1016
| },
1017
| "parent": {
1018
| "href": "href",
1019
| "type": "type"
1020
| }
1021
| }
1022
| },
1023
| {
1024
| "key": "key",
1025
| "name": "name",
1026
| "description": "description",
1027
| "creationDate": 7,
1028
| "version": 1,
1029
| "archived": true,
1030
| "tags": [
1031
| "tags",
1032
| "tags"
1033
| ],
1034
| "temporary": true,
1035
| "includeInSnippet": true,
1036
| "_links": {
1037
| "self": {
1038
| "href": "href",
1039
| "type": "type"
1040
| },
1041
| "parent": {
1042
| "href": "href",
1043
| "type": "type"
1044
| }
1045
| }
1046
| }
1047
| ],
1048
| "totalCount": 4
1049
| },
1050
| "segmentsExpanded": {
1051
| "items": [
1052
| {
1053
| "key": "key",
1054
| "name": "name",
1055
| "environmentId": "environmentId",
1056
| "environmentKey": "environmentKey",
1057
| "description": "description",
1058
| "creationDate": 5,
1059
| "lastModifiedDate": 9,
1060
| "deleted": true,
1061
| "tags": [
1062
| "tags",
1063
| "tags"
1064
| ],
1065
| "unbounded": true,
1066
| "version": 9,
1067
| "generation": 6,
1068
| "_links": {
1069
| "self": {
1070
| "href": "href",
1071
| "type": "type"
1072
| },
1073
| "parent": {
1074
| "href": "href",
1075
| "type": "type"
1076
| }
1077
| }
1078
| },
1079
| {
1080
| "key": "key",
1081
| "name": "name",
1082
| "environmentId": "environmentId",
1083
| "environmentKey": "environmentKey",
1084
| "description": "description",
1085
| "creationDate": 5,
1086
| "lastModifiedDate": 9,
1087
| "deleted": true,
1088
| "tags": [
1089
| "tags",
1090
| "tags"
1091
| ],
1092
| "unbounded": true,
1093
| "version": 9,
1094
| "generation": 6,
1095
| "_links": {
1096
| "self": {
1097
| "href": "href",
1098
| "type": "type"
1099
| },
1100
| "parent": {
1101
| "href": "href",
1102
| "type": "type"
1103
| }
1104
| }
1105
| }
1106
| ],
1107
| "totalCount": 8
1108
| },
1109
| "metricsExpanded": {
1110
| "items": [
1111
| {
1112
| "key": "key",
1113
| "name": "name",
1114
| "creationDate": 9,
1115
| "lastModified": 6,
1116
| "isActive": true,
1117
| "eventKey": "eventKey",
1118
| "_id": "_id",
1119
| "_versionId": "_versionId",
1120
| "kind": "kind",
1121
| "category": "category",
1122
| "description": "description",
1123
| "isNumeric": true,
1124
| "lastSeen": 3,
1125
| "_links": {
1126
| "self": {
1127
| "href": "href",
1128
| "type": "type"
1129
| },
1130
| "parent": {
1131
| "href": "href",
1132
| "type": "type"
1133
| }
1134
| }
1135
| },
1136
| {
1137
| "key": "key",
1138
| "name": "name",
1139
| "creationDate": 9,
1140
| "lastModified": 6,
1141
| "isActive": true,
1142
| "eventKey": "eventKey",
1143
| "_id": "_id",
1144
| "_versionId": "_versionId",
1145
| "kind": "kind",
1146
| "category": "category",
1147
| "description": "description",
1148
| "isNumeric": true,
1149
| "lastSeen": 3,
1150
| "_links": {
1151
| "self": {
1152
| "href": "href",
1153
| "type": "type"
1154
| },
1155
| "parent": {
1156
| "href": "href",
1157
| "type": "type"
1158
| }
1159
| }
1160
| }
1161
| ],
1162
| "totalCount": 6
1163
| },
1164
| "aiConfigsExpanded": {
1165
| "items": [
1166
| {
1167
| "key": "key",
1168
| "name": "name",
1169
| "tags": [
1170
| "tags",
1171
| "tags"
1172
| ],
1173
| "description": "description",
1174
| "version": 1,
1175
| "createdAt": 2,
1176
| "updatedAt": 6,
1177
| "flagKey": "flagKey",
1178
| "_links": {
1179
| "self": {
1180
| "href": "href",
1181
| "type": "type"
1182
| },
1183
| "parent": {
1184
| "href": "href",
1185
| "type": "type"
1186
| }
1187
| }
1188
| },
1189
| {
1190
| "key": "key",
1191
| "name": "name",
1192
| "tags": [
1193
| "tags",
1194
| "tags"
1195
| ],
1196
| "description": "description",
1197
| "version": 1,
1198
| "createdAt": 2,
1199
| "updatedAt": 6,
1200
| "flagKey": "flagKey",
1201
| "_links": {
1202
| "self": {
1203
| "href": "href",
1204
| "type": "type"
1205
| },
1206
| "parent": {
1207
| "href": "href",
1208
| "type": "type"
1209
| }
1210
| }
1211
| }
1212
| ],
1213
| "totalCount": 6
1214
| },
1215
| "resourcesExpanded": {
1216
| "items": {
1217
| "flags": {
1218
| "items": [
1219
| {
1220
| "key": "key",
1221
| "name": "name",
1222
| "description": "description",
1223
| "creationDate": 7,
1224
| "version": 1,
1225
| "archived": true,
1226
| "tags": [
1227
| "tags",
1228
| "tags"
1229
| ],
1230
| "temporary": true,
1231
| "includeInSnippet": true,
1232
| "_links": {
1233
| "self": {
1234
| "href": "href",
1235
| "type": "type"
1236
| },
1237
| "parent": {
1238
| "href": "href",
1239
| "type": "type"
1240
| }
1241
| }
1242
| },
1243
| {
1244
| "key": "key",
1245
| "name": "name",
1246
| "description": "description",
1247
| "creationDate": 7,
1248
| "version": 1,
1249
| "archived": true,
1250
| "tags": [
1251
| "tags",
1252
| "tags"
1253
| ],
1254
| "temporary": true,
1255
| "includeInSnippet": true,
1256
| "_links": {
1257
| "self": {
1258
| "href": "href",
1259
| "type": "type"
1260
| },
1261
| "parent": {
1262
| "href": "href",
1263
| "type": "type"
1264
| }
1265
| }
1266
| }
1267
| ],
1268
| "totalCount": 5
1269
| },
1270
| "segments": {
1271
| "items": [
1272
| {
1273
| "key": "key",
1274
| "name": "name",
1275
| "environmentId": "environmentId",
1276
| "environmentKey": "environmentKey",
1277
| "description": "description",
1278
| "creationDate": 5,
1279
| "lastModifiedDate": 9,
1280
| "deleted": true,
1281
| "tags": [
1282
| "tags",
1283
| "tags"
1284
| ],
1285
| "unbounded": true,
1286
| "version": 9,
1287
| "generation": 6,
1288
| "_links": {
1289
| "self": {
1290
| "href": "href",
1291
| "type": "type"
1292
| },
1293
| "parent": {
1294
| "href": "href",
1295
| "type": "type"
1296
| }
1297
| }
1298
| },
1299
| {
1300
| "key": "key",
1301
| "name": "name",
1302
| "environmentId": "environmentId",
1303
| "environmentKey": "environmentKey",
1304
| "description": "description",
1305
| "creationDate": 5,
1306
| "lastModifiedDate": 9,
1307
| "deleted": true,
1308
| "tags": [
1309
| "tags",
1310
| "tags"
1311
| ],
1312
| "unbounded": true,
1313
| "version": 9,
1314
| "generation": 6,
1315
| "_links": {
1316
| "self": {
1317
| "href": "href",
1318
| "type": "type"
1319
| },
1320
| "parent": {
1321
| "href": "href",
1322
| "type": "type"
1323
| }
1324
| }
1325
| }
1326
| ],
1327
| "totalCount": 6
1328
| },
1329
| "aiConfigs": {
1330
| "items": [
1331
| {
1332
| "key": "key",
1333
| "name": "name",
1334
| "tags": [
1335
| "tags",
1336
| "tags"
1337
| ],
1338
| "description": "description",
1339
| "version": 1,
1340
| "createdAt": 2,
1341
| "updatedAt": 6,
1342
| "flagKey": "flagKey",
1343
| "_links": {
1344
| "self": {
1345
| "href": "href",
1346
| "type": "type"
1347
| },
1348
| "parent": {
1349
| "href": "href",
1350
| "type": "type"
1351
| }
1352
| }
1353
| },
1354
| {
1355
| "key": "key",
1356
| "name": "name",
1357
| "tags": [
1358
| "tags",
1359
| "tags"
1360
| ],
1361
| "description": "description",
1362
| "version": 1,
1363
| "createdAt": 2,
1364
| "updatedAt": 6,
1365
| "flagKey": "flagKey",
1366
| "_links": {
1367
| "self": {
1368
| "href": "href",
1369
| "type": "type"
1370
| },
1371
| "parent": {
1372
| "href": "href",
1373
| "type": "type"
1374
| }
1375
| }
1376
| }
1377
| ],
1378
| "totalCount": 3
1379
| },
1380
| "metrics": {
1381
| "items": [
1382
| {
1383
| "key": "key",
1384
| "name": "name",
1385
| "creationDate": 9,
1386
| "lastModified": 6,
1387
| "isActive": true,
1388
| "eventKey": "eventKey",
1389
| "_id": "_id",
1390
| "_versionId": "_versionId",
1391
| "kind": "kind",
1392
| "category": "category",
1393
| "description": "description",
1394
| "isNumeric": true,
1395
| "lastSeen": 3,
1396
| "_links": {
1397
| "self": {
1398
| "href": "href",
1399
| "type": "type"
1400
| },
1401
| "parent": {
1402
| "href": "href",
1403
| "type": "type"
1404
| }
1405
| }
1406
| },
1407
| {
1408
| "key": "key",
1409
| "name": "name",
1410
| "creationDate": 9,
1411
| "lastModified": 6,
1412
| "isActive": true,
1413
| "eventKey": "eventKey",
1414
| "_id": "_id",
1415
| "_versionId": "_versionId",
1416
| "kind": "kind",
1417
| "category": "category",
1418
| "description": "description",
1419
| "isNumeric": true,
1420
| "lastSeen": 3,
1421
| "_links": {
1422
| "self": {
1423
| "href": "href",
1424
| "type": "type"
1425
| },
1426
| "parent": {
1427
| "href": "href",
1428
| "type": "type"
1429
| }
1430
| }
1431
| }
1432
| ],
1433
| "totalCount": 3
1434
| }
1435
| },
1436
| "totalCount": 7
1437
| }
1438
| },
1439
| "flag": {
1440
| "key": "key",
1441
| "name": "name",
1442
| "description": "description",
1443
| "creationDate": 7,
1444
| "version": 1,
1445
| "archived": true,
1446
| "tags": [
1447
| "tags",
1448
| "tags"
1449
| ],
1450
| "temporary": true,
1451
| "includeInSnippet": true,
1452
| "_links": {
1453
| "self": {
1454
| "href": "href",
1455
| "type": "type"
1456
| },
1457
| "parent": {
1458
| "href": "href",
1459
| "type": "type"
1460
| }
1461
| }
1462
| },
1463
| "segment": {
1464
| "key": "key",
1465
| "name": "name",
1466
| "environmentId": "environmentId",
1467
| "environmentKey": "environmentKey",
1468
| "description": "description",
1469
| "creationDate": 5,
1470
| "lastModifiedDate": 9,
1471
| "deleted": true,
1472
| "tags": [
1473
| "tags",
1474
| "tags"
1475
| ],
1476
| "unbounded": true,
1477
| "version": 9,
1478
| "generation": 6,
1479
| "_links": {
1480
| "self": {
1481
| "href": "href",
1482
| "type": "type"
1483
| },
1484
| "parent": {
1485
| "href": "href",
1486
| "type": "type"
1487
| }
1488
| }
1489
| },
1490
| "aiConfig": {
1491
| "key": "key",
1492
| "name": "name",
1493
| "tags": [
1494
| "tags",
1495
| "tags"
1496
| ],
1497
| "description": "description",
1498
| "version": 1,
1499
| "createdAt": 2,
1500
| "updatedAt": 6,
1501
| "flagKey": "flagKey",
1502
| "_links": {
1503
| "self": {
1504
| "href": "href",
1505
| "type": "type"
1506
| },
1507
| "parent": {
1508
| "href": "href",
1509
| "type": "type"
1510
| }
1511
| }
1512
| },
1513
| "metric": {
1514
| "key": "key",
1515
| "name": "name",
1516
| "creationDate": 9,
1517
| "lastModified": 6,
1518
| "isActive": true,
1519
| "eventKey": "eventKey",
1520
| "_id": "_id",
1521
| "_versionId": "_versionId",
1522
| "kind": "kind",
1523
| "category": "category",
1524
| "description": "description",
1525
| "isNumeric": true,
1526
| "lastSeen": 3,
1527
| "_links": {
1528
| "self": {
1529
| "href": "href",
1530
| "type": "type"
1531
| },
1532
| "parent": {
1533
| "href": "href",
1534
| "type": "type"
1535
| }
1536
| }
1537
| }
1538
| }
1539
| }
1540
| ],
1541
| "totalCount": 5,
1542
| "_links": {
1543
| "self": {
1544
| "href": "href",
1545
| "type": "type"
1546
| },
1547
| "first": {
1548
| "href": "href",
1549
| "type": "type"
1550
| },
1551
| "last": {
1552
| "href": "href",
1553
| "type": "type"
1554
| },
1555
| "next": {
1556
| "href": "href",
1557
| "type": "type"
1558
| },
1559
| "prev": {
1560
| "href": "href",
1561
| "type": "type"
1562
| }
1563
| }
1564
| },
1565
| "failedResources": [
1566
| {
1567
| "resourceKey": "resourceKey",
1568
| "resourceType": "flag",
1569
| "errorMessage": "errorMessage",
1570
| "environmentId": "environmentId"
1571
| },
1572
| {
1573
| "resourceKey": "resourceKey",
1574
| "resourceType": "flag",
1575
| "errorMessage": "errorMessage",
1576
| "environmentId": "environmentId"
1577
| }
1578
| ]
1579
| }
```
Link one or multiple resources to a view: - Link flags using flag keys - Link AI configs using AI config keys - Link metrics using metric keys - Link segments using segment IDs 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired
viewKeystringRequired
resourceTypeenumRequired
Allowed values:flagssegmentsaiConfigsmetrics
### Headers
LD-API-VersionenumRequired
Version of the endpoint.
Allowed values:beta
### Request
The resource to link to the view. Flags are identified by key. Segments are identified by segment ID.
ViewLinkRequestKeysobjectRequired
Show 2 properties
OR
ViewLinkRequestSegmentIdentifiersobjectRequired
Show 2 properties
### Response
Successful response
successCountinteger
The number of resources successfully linked.
failureCountinteger
The number of resources that failed to link.
linkedResourcesobject or null
Show 3 properties
failedResourceslist of objects or null
Details of resources that failed to link.
Show 4 properties
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
Link one or multiple resources to a view:
 * Link flags using flag keys
 * Link AI configs using AI config keys
 * Link metrics using metric keys
 * Link segments using segment IDs