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
/api/v2/projects/:projectKey/views/:viewKey/linked/:resourceType
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/projects/default/views/my-view/linked/flags"
4
| 
5
| headers = {
6
| "LD-API-Version": "beta",
7
| "Authorization": "<apiKey>"
8
| }
9
| 
10
| response = requests.get(url, headers=headers)
11
| 
12
| print(response.json())
```
[](/docs/api/views-beta/get-linked-resources?explorer=true)
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
| "_links": {
5
| "self": {
6
| "href": "href",
7
| "type": "type"
8
| },
9
| "parent": {
10
| "href": "href",
11
| "type": "type"
12
| }
13
| },
14
| "resourceKey": "resourceKey",
15
| "resourceType": "flag",
16
| "linkedAt": 1,
17
| "environmentId": "environmentId",
18
| "environmentKey": "environmentKey",
19
| "resourceDetails": {
20
| "view": {
21
| "id": "id",
22
| "accountId": "accountId",
23
| "projectId": "projectId",
24
| "projectKey": "projectKey",
25
| "key": "key",
26
| "name": "name",
27
| "description": "description",
28
| "generateSdkKeys": true,
29
| "version": 0,
30
| "tags": [
31
| "tags",
32
| "tags"
33
| ],
34
| "createdAt": 6,
35
| "updatedAt": 1,
36
| "archived": false,
37
| "deleted": false,
38
| "_access": {
39
| "allowed": [
40
| {
41
| "action": "action",
42
| "reason": {
43
| "effect": "allow",
44
| "resources": [
45
| "proj/*:env/*;qa_*:/flag/*"
46
| ],
47
| "notResources": [
48
| "notResources",
49
| "notResources"
50
| ],
51
| "actions": [
52
| "*"
53
| ],
54
| "notActions": [
55
| "string",
56
| "string"
57
| ],
58
| "role_name": "role_name"
59
| }
60
| },
61
| {
62
| "action": "action",
63
| "reason": {
64
| "effect": "allow",
65
| "resources": [
66
| "proj/*:env/*;qa_*:/flag/*"
67
| ],
68
| "notResources": [
69
| "notResources",
70
| "notResources"
71
| ],
72
| "actions": [
73
| "*"
74
| ],
75
| "notActions": [
76
| "string",
77
| "string"
78
| ],
79
| "role_name": "role_name"
80
| }
81
| }
82
| ],
83
| "denied": [
84
| {
85
| "action": "action",
86
| "reason": {
87
| "effect": "allow",
88
| "resources": [
89
| "proj/*:env/*;qa_*:/flag/*"
90
| ],
91
| "notResources": [
92
| "notResources",
93
| "notResources"
94
| ],
95
| "actions": [
96
| "*"
97
| ],
98
| "notActions": [
99
| "string",
100
| "string"
101
| ],
102
| "role_name": "role_name"
103
| }
104
| },
105
| {
106
| "action": "action",
107
| "reason": {
108
| "effect": "allow",
109
| "resources": [
110
| "proj/*:env/*;qa_*:/flag/*"
111
| ],
112
| "notResources": [
113
| "notResources",
114
| "notResources"
115
| ],
116
| "actions": [
117
| "*"
118
| ],
119
| "notActions": [
120
| "string",
121
| "string"
122
| ],
123
| "role_name": "role_name"
124
| }
125
| }
126
| ]
127
| },
128
| "_links": {
129
| "self": {
130
| "href": "href",
131
| "type": "type"
132
| },
133
| "parent": {
134
| "href": "href",
135
| "type": "type"
136
| }
137
| },
138
| "archivedAt": 5,
139
| "deletedAt": 5,
140
| "maintainer": {
141
| "id": "id",
142
| "kind": "kind",
143
| "maintainerMember": {
144
| "id": "id",
145
| "email": "email",
146
| "role": "role",
147
| "firstName": "firstName",
148
| "lastName": "lastName"
149
| },
150
| "maintainerTeam": {
151
| "id": "id",
152
| "key": "key",
153
| "name": "name"
154
| }
155
| },
156
| "flagsSummary": {
157
| "count": 2,
158
| "linkedFlags": {
159
| "items": [
160
| {
161
| "key": "key",
162
| "name": "name",
163
| "links": {
164
| "self": {
165
| "href": "href",
166
| "type": "type"
167
| }
168
| }
169
| },
170
| {
171
| "key": "key",
172
| "name": "name",
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
| }
180
| ],
181
| "totalCount": 7
182
| }
183
| },
184
| "segmentsSummary": {
185
| "count": 9,
186
| "linkedSegments": {
187
| "items": [
188
| {
189
| "key": "key",
190
| "name": "name",
191
| "environmentId": "environmentId",
192
| "links": {
193
| "self": {
194
| "href": "href",
195
| "type": "type"
196
| }
197
| }
198
| },
199
| {
200
| "key": "key",
201
| "name": "name",
202
| "environmentId": "environmentId",
203
| "links": {
204
| "self": {
205
| "href": "href",
206
| "type": "type"
207
| }
208
| }
209
| }
210
| ],
211
| "totalCount": 3
212
| }
213
| },
214
| "metricsSummary": {
215
| "count": 2
216
| },
217
| "aiConfigsSummary": {
218
| "count": 4
219
| },
220
| "resourceSummary": {
221
| "flagCount": 7,
222
| "totalCount": 6,
223
| "segmentCount": 1,
224
| "metricCount": 1,
225
| "aiConfigCount": 1
226
| },
227
| "flagsExpanded": {
228
| "items": [
229
| {
230
| "key": "key",
231
| "name": "name",
232
| "description": "description",
233
| "creationDate": 7,
234
| "version": 1,
235
| "archived": true,
236
| "tags": [
237
| "tags",
238
| "tags"
239
| ],
240
| "temporary": true,
241
| "includeInSnippet": true,
242
| "_links": {
243
| "self": {
244
| "href": "href",
245
| "type": "type"
246
| },
247
| "parent": {
248
| "href": "href",
249
| "type": "type"
250
| }
251
| }
252
| },
253
| {
254
| "key": "key",
255
| "name": "name",
256
| "description": "description",
257
| "creationDate": 7,
258
| "version": 1,
259
| "archived": true,
260
| "tags": [
261
| "tags",
262
| "tags"
263
| ],
264
| "temporary": true,
265
| "includeInSnippet": true,
266
| "_links": {
267
| "self": {
268
| "href": "href",
269
| "type": "type"
270
| },
271
| "parent": {
272
| "href": "href",
273
| "type": "type"
274
| }
275
| }
276
| }
277
| ],
278
| "totalCount": 4
279
| },
280
| "segmentsExpanded": {
281
| "items": [
282
| {
283
| "key": "key",
284
| "name": "name",
285
| "environmentId": "environmentId",
286
| "environmentKey": "environmentKey",
287
| "description": "description",
288
| "creationDate": 5,
289
| "lastModifiedDate": 9,
290
| "deleted": true,
291
| "tags": [
292
| "tags",
293
| "tags"
294
| ],
295
| "unbounded": true,
296
| "version": 9,
297
| "generation": 6,
298
| "_links": {
299
| "self": {
300
| "href": "href",
301
| "type": "type"
302
| },
303
| "parent": {
304
| "href": "href",
305
| "type": "type"
306
| }
307
| }
308
| },
309
| {
310
| "key": "key",
311
| "name": "name",
312
| "environmentId": "environmentId",
313
| "environmentKey": "environmentKey",
314
| "description": "description",
315
| "creationDate": 5,
316
| "lastModifiedDate": 9,
317
| "deleted": true,
318
| "tags": [
319
| "tags",
320
| "tags"
321
| ],
322
| "unbounded": true,
323
| "version": 9,
324
| "generation": 6,
325
| "_links": {
326
| "self": {
327
| "href": "href",
328
| "type": "type"
329
| },
330
| "parent": {
331
| "href": "href",
332
| "type": "type"
333
| }
334
| }
335
| }
336
| ],
337
| "totalCount": 8
338
| },
339
| "metricsExpanded": {
340
| "items": [
341
| {
342
| "key": "key",
343
| "name": "name",
344
| "creationDate": 9,
345
| "lastModified": 6,
346
| "isActive": true,
347
| "eventKey": "eventKey",
348
| "_id": "_id",
349
| "_versionId": "_versionId",
350
| "kind": "kind",
351
| "category": "category",
352
| "description": "description",
353
| "isNumeric": true,
354
| "lastSeen": 3,
355
| "_links": {
356
| "self": {
357
| "href": "href",
358
| "type": "type"
359
| },
360
| "parent": {
361
| "href": "href",
362
| "type": "type"
363
| }
364
| }
365
| },
366
| {
367
| "key": "key",
368
| "name": "name",
369
| "creationDate": 9,
370
| "lastModified": 6,
371
| "isActive": true,
372
| "eventKey": "eventKey",
373
| "_id": "_id",
374
| "_versionId": "_versionId",
375
| "kind": "kind",
376
| "category": "category",
377
| "description": "description",
378
| "isNumeric": true,
379
| "lastSeen": 3,
380
| "_links": {
381
| "self": {
382
| "href": "href",
383
| "type": "type"
384
| },
385
| "parent": {
386
| "href": "href",
387
| "type": "type"
388
| }
389
| }
390
| }
391
| ],
392
| "totalCount": 6
393
| },
394
| "aiConfigsExpanded": {
395
| "items": [
396
| {
397
| "key": "key",
398
| "name": "name",
399
| "tags": [
400
| "tags",
401
| "tags"
402
| ],
403
| "description": "description",
404
| "version": 1,
405
| "createdAt": 2,
406
| "updatedAt": 6,
407
| "flagKey": "flagKey",
408
| "_links": {
409
| "self": {
410
| "href": "href",
411
| "type": "type"
412
| },
413
| "parent": {
414
| "href": "href",
415
| "type": "type"
416
| }
417
| }
418
| },
419
| {
420
| "key": "key",
421
| "name": "name",
422
| "tags": [
423
| "tags",
424
| "tags"
425
| ],
426
| "description": "description",
427
| "version": 1,
428
| "createdAt": 2,
429
| "updatedAt": 6,
430
| "flagKey": "flagKey",
431
| "_links": {
432
| "self": {
433
| "href": "href",
434
| "type": "type"
435
| },
436
| "parent": {
437
| "href": "href",
438
| "type": "type"
439
| }
440
| }
441
| }
442
| ],
443
| "totalCount": 6
444
| },
445
| "resourcesExpanded": {
446
| "items": {
447
| "flags": {
448
| "items": [
449
| {
450
| "key": "key",
451
| "name": "name",
452
| "description": "description",
453
| "creationDate": 7,
454
| "version": 1,
455
| "archived": true,
456
| "tags": [
457
| "tags",
458
| "tags"
459
| ],
460
| "temporary": true,
461
| "includeInSnippet": true,
462
| "_links": {
463
| "self": {
464
| "href": "href",
465
| "type": "type"
466
| },
467
| "parent": {
468
| "href": "href",
469
| "type": "type"
470
| }
471
| }
472
| },
473
| {
474
| "key": "key",
475
| "name": "name",
476
| "description": "description",
477
| "creationDate": 7,
478
| "version": 1,
479
| "archived": true,
480
| "tags": [
481
| "tags",
482
| "tags"
483
| ],
484
| "temporary": true,
485
| "includeInSnippet": true,
486
| "_links": {
487
| "self": {
488
| "href": "href",
489
| "type": "type"
490
| },
491
| "parent": {
492
| "href": "href",
493
| "type": "type"
494
| }
495
| }
496
| }
497
| ],
498
| "totalCount": 5
499
| },
500
| "segments": {
501
| "items": [
502
| {
503
| "key": "key",
504
| "name": "name",
505
| "environmentId": "environmentId",
506
| "environmentKey": "environmentKey",
507
| "description": "description",
508
| "creationDate": 5,
509
| "lastModifiedDate": 9,
510
| "deleted": true,
511
| "tags": [
512
| "tags",
513
| "tags"
514
| ],
515
| "unbounded": true,
516
| "version": 9,
517
| "generation": 6,
518
| "_links": {
519
| "self": {
520
| "href": "href",
521
| "type": "type"
522
| },
523
| "parent": {
524
| "href": "href",
525
| "type": "type"
526
| }
527
| }
528
| },
529
| {
530
| "key": "key",
531
| "name": "name",
532
| "environmentId": "environmentId",
533
| "environmentKey": "environmentKey",
534
| "description": "description",
535
| "creationDate": 5,
536
| "lastModifiedDate": 9,
537
| "deleted": true,
538
| "tags": [
539
| "tags",
540
| "tags"
541
| ],
542
| "unbounded": true,
543
| "version": 9,
544
| "generation": 6,
545
| "_links": {
546
| "self": {
547
| "href": "href",
548
| "type": "type"
549
| },
550
| "parent": {
551
| "href": "href",
552
| "type": "type"
553
| }
554
| }
555
| }
556
| ],
557
| "totalCount": 6
558
| },
559
| "aiConfigs": {
560
| "items": [
561
| {
562
| "key": "key",
563
| "name": "name",
564
| "tags": [
565
| "tags",
566
| "tags"
567
| ],
568
| "description": "description",
569
| "version": 1,
570
| "createdAt": 2,
571
| "updatedAt": 6,
572
| "flagKey": "flagKey",
573
| "_links": {
574
| "self": {
575
| "href": "href",
576
| "type": "type"
577
| },
578
| "parent": {
579
| "href": "href",
580
| "type": "type"
581
| }
582
| }
583
| },
584
| {
585
| "key": "key",
586
| "name": "name",
587
| "tags": [
588
| "tags",
589
| "tags"
590
| ],
591
| "description": "description",
592
| "version": 1,
593
| "createdAt": 2,
594
| "updatedAt": 6,
595
| "flagKey": "flagKey",
596
| "_links": {
597
| "self": {
598
| "href": "href",
599
| "type": "type"
600
| },
601
| "parent": {
602
| "href": "href",
603
| "type": "type"
604
| }
605
| }
606
| }
607
| ],
608
| "totalCount": 3
609
| },
610
| "metrics": {
611
| "items": [
612
| {
613
| "key": "key",
614
| "name": "name",
615
| "creationDate": 9,
616
| "lastModified": 6,
617
| "isActive": true,
618
| "eventKey": "eventKey",
619
| "_id": "_id",
620
| "_versionId": "_versionId",
621
| "kind": "kind",
622
| "category": "category",
623
| "description": "description",
624
| "isNumeric": true,
625
| "lastSeen": 3,
626
| "_links": {
627
| "self": {
628
| "href": "href",
629
| "type": "type"
630
| },
631
| "parent": {
632
| "href": "href",
633
| "type": "type"
634
| }
635
| }
636
| },
637
| {
638
| "key": "key",
639
| "name": "name",
640
| "creationDate": 9,
641
| "lastModified": 6,
642
| "isActive": true,
643
| "eventKey": "eventKey",
644
| "_id": "_id",
645
| "_versionId": "_versionId",
646
| "kind": "kind",
647
| "category": "category",
648
| "description": "description",
649
| "isNumeric": true,
650
| "lastSeen": 3,
651
| "_links": {
652
| "self": {
653
| "href": "href",
654
| "type": "type"
655
| },
656
| "parent": {
657
| "href": "href",
658
| "type": "type"
659
| }
660
| }
661
| }
662
| ],
663
| "totalCount": 3
664
| }
665
| },
666
| "totalCount": 7
667
| }
668
| },
669
| "flag": {
670
| "key": "key",
671
| "name": "name",
672
| "description": "description",
673
| "creationDate": 7,
674
| "version": 1,
675
| "archived": true,
676
| "tags": [
677
| "tags",
678
| "tags"
679
| ],
680
| "temporary": true,
681
| "includeInSnippet": true,
682
| "_links": {
683
| "self": {
684
| "href": "href",
685
| "type": "type"
686
| },
687
| "parent": {
688
| "href": "href",
689
| "type": "type"
690
| }
691
| }
692
| },
693
| "segment": {
694
| "key": "key",
695
| "name": "name",
696
| "environmentId": "environmentId",
697
| "environmentKey": "environmentKey",
698
| "description": "description",
699
| "creationDate": 5,
700
| "lastModifiedDate": 9,
701
| "deleted": true,
702
| "tags": [
703
| "tags",
704
| "tags"
705
| ],
706
| "unbounded": true,
707
| "version": 9,
708
| "generation": 6,
709
| "_links": {
710
| "self": {
711
| "href": "href",
712
| "type": "type"
713
| },
714
| "parent": {
715
| "href": "href",
716
| "type": "type"
717
| }
718
| }
719
| },
720
| "aiConfig": {
721
| "key": "key",
722
| "name": "name",
723
| "tags": [
724
| "tags",
725
| "tags"
726
| ],
727
| "description": "description",
728
| "version": 1,
729
| "createdAt": 2,
730
| "updatedAt": 6,
731
| "flagKey": "flagKey",
732
| "_links": {
733
| "self": {
734
| "href": "href",
735
| "type": "type"
736
| },
737
| "parent": {
738
| "href": "href",
739
| "type": "type"
740
| }
741
| }
742
| },
743
| "metric": {
744
| "key": "key",
745
| "name": "name",
746
| "creationDate": 9,
747
| "lastModified": 6,
748
| "isActive": true,
749
| "eventKey": "eventKey",
750
| "_id": "_id",
751
| "_versionId": "_versionId",
752
| "kind": "kind",
753
| "category": "category",
754
| "description": "description",
755
| "isNumeric": true,
756
| "lastSeen": 3,
757
| "_links": {
758
| "self": {
759
| "href": "href",
760
| "type": "type"
761
| },
762
| "parent": {
763
| "href": "href",
764
| "type": "type"
765
| }
766
| }
767
| }
768
| }
769
| },
770
| {
771
| "_links": {
772
| "self": {
773
| "href": "href",
774
| "type": "type"
775
| },
776
| "parent": {
777
| "href": "href",
778
| "type": "type"
779
| }
780
| },
781
| "resourceKey": "resourceKey",
782
| "resourceType": "flag",
783
| "linkedAt": 1,
784
| "environmentId": "environmentId",
785
| "environmentKey": "environmentKey",
786
| "resourceDetails": {
787
| "view": {
788
| "id": "id",
789
| "accountId": "accountId",
790
| "projectId": "projectId",
791
| "projectKey": "projectKey",
792
| "key": "key",
793
| "name": "name",
794
| "description": "description",
795
| "generateSdkKeys": true,
796
| "version": 0,
797
| "tags": [
798
| "tags",
799
| "tags"
800
| ],
801
| "createdAt": 6,
802
| "updatedAt": 1,
803
| "archived": false,
804
| "deleted": false,
805
| "_access": {
806
| "allowed": [
807
| {
808
| "action": "action",
809
| "reason": {
810
| "effect": "allow",
811
| "resources": [
812
| "proj/*:env/*;qa_*:/flag/*"
813
| ],
814
| "notResources": [
815
| "notResources",
816
| "notResources"
817
| ],
818
| "actions": [
819
| "*"
820
| ],
821
| "notActions": [
822
| "string",
823
| "string"
824
| ],
825
| "role_name": "role_name"
826
| }
827
| },
828
| {
829
| "action": "action",
830
| "reason": {
831
| "effect": "allow",
832
| "resources": [
833
| "proj/*:env/*;qa_*:/flag/*"
834
| ],
835
| "notResources": [
836
| "notResources",
837
| "notResources"
838
| ],
839
| "actions": [
840
| "*"
841
| ],
842
| "notActions": [
843
| "string",
844
| "string"
845
| ],
846
| "role_name": "role_name"
847
| }
848
| }
849
| ],
850
| "denied": [
851
| {
852
| "action": "action",
853
| "reason": {
854
| "effect": "allow",
855
| "resources": [
856
| "proj/*:env/*;qa_*:/flag/*"
857
| ],
858
| "notResources": [
859
| "notResources",
860
| "notResources"
861
| ],
862
| "actions": [
863
| "*"
864
| ],
865
| "notActions": [
866
| "string",
867
| "string"
868
| ],
869
| "role_name": "role_name"
870
| }
871
| },
872
| {
873
| "action": "action",
874
| "reason": {
875
| "effect": "allow",
876
| "resources": [
877
| "proj/*:env/*;qa_*:/flag/*"
878
| ],
879
| "notResources": [
880
| "notResources",
881
| "notResources"
882
| ],
883
| "actions": [
884
| "*"
885
| ],
886
| "notActions": [
887
| "string",
888
| "string"
889
| ],
890
| "role_name": "role_name"
891
| }
892
| }
893
| ]
894
| },
895
| "_links": {
896
| "self": {
897
| "href": "href",
898
| "type": "type"
899
| },
900
| "parent": {
901
| "href": "href",
902
| "type": "type"
903
| }
904
| },
905
| "archivedAt": 5,
906
| "deletedAt": 5,
907
| "maintainer": {
908
| "id": "id",
909
| "kind": "kind",
910
| "maintainerMember": {
911
| "id": "id",
912
| "email": "email",
913
| "role": "role",
914
| "firstName": "firstName",
915
| "lastName": "lastName"
916
| },
917
| "maintainerTeam": {
918
| "id": "id",
919
| "key": "key",
920
| "name": "name"
921
| }
922
| },
923
| "flagsSummary": {
924
| "count": 2,
925
| "linkedFlags": {
926
| "items": [
927
| {
928
| "key": "key",
929
| "name": "name",
930
| "links": {
931
| "self": {
932
| "href": "href",
933
| "type": "type"
934
| }
935
| }
936
| },
937
| {
938
| "key": "key",
939
| "name": "name",
940
| "links": {
941
| "self": {
942
| "href": "href",
943
| "type": "type"
944
| }
945
| }
946
| }
947
| ],
948
| "totalCount": 7
949
| }
950
| },
951
| "segmentsSummary": {
952
| "count": 9,
953
| "linkedSegments": {
954
| "items": [
955
| {
956
| "key": "key",
957
| "name": "name",
958
| "environmentId": "environmentId",
959
| "links": {
960
| "self": {
961
| "href": "href",
962
| "type": "type"
963
| }
964
| }
965
| },
966
| {
967
| "key": "key",
968
| "name": "name",
969
| "environmentId": "environmentId",
970
| "links": {
971
| "self": {
972
| "href": "href",
973
| "type": "type"
974
| }
975
| }
976
| }
977
| ],
978
| "totalCount": 3
979
| }
980
| },
981
| "metricsSummary": {
982
| "count": 2
983
| },
984
| "aiConfigsSummary": {
985
| "count": 4
986
| },
987
| "resourceSummary": {
988
| "flagCount": 7,
989
| "totalCount": 6,
990
| "segmentCount": 1,
991
| "metricCount": 1,
992
| "aiConfigCount": 1
993
| },
994
| "flagsExpanded": {
995
| "items": [
996
| {
997
| "key": "key",
998
| "name": "name",
999
| "description": "description",
1000
| "creationDate": 7,
1001
| "version": 1,
1002
| "archived": true,
1003
| "tags": [
1004
| "tags",
1005
| "tags"
1006
| ],
1007
| "temporary": true,
1008
| "includeInSnippet": true,
1009
| "_links": {
1010
| "self": {
1011
| "href": "href",
1012
| "type": "type"
1013
| },
1014
| "parent": {
1015
| "href": "href",
1016
| "type": "type"
1017
| }
1018
| }
1019
| },
1020
| {
1021
| "key": "key",
1022
| "name": "name",
1023
| "description": "description",
1024
| "creationDate": 7,
1025
| "version": 1,
1026
| "archived": true,
1027
| "tags": [
1028
| "tags",
1029
| "tags"
1030
| ],
1031
| "temporary": true,
1032
| "includeInSnippet": true,
1033
| "_links": {
1034
| "self": {
1035
| "href": "href",
1036
| "type": "type"
1037
| },
1038
| "parent": {
1039
| "href": "href",
1040
| "type": "type"
1041
| }
1042
| }
1043
| }
1044
| ],
1045
| "totalCount": 4
1046
| },
1047
| "segmentsExpanded": {
1048
| "items": [
1049
| {
1050
| "key": "key",
1051
| "name": "name",
1052
| "environmentId": "environmentId",
1053
| "environmentKey": "environmentKey",
1054
| "description": "description",
1055
| "creationDate": 5,
1056
| "lastModifiedDate": 9,
1057
| "deleted": true,
1058
| "tags": [
1059
| "tags",
1060
| "tags"
1061
| ],
1062
| "unbounded": true,
1063
| "version": 9,
1064
| "generation": 6,
1065
| "_links": {
1066
| "self": {
1067
| "href": "href",
1068
| "type": "type"
1069
| },
1070
| "parent": {
1071
| "href": "href",
1072
| "type": "type"
1073
| }
1074
| }
1075
| },
1076
| {
1077
| "key": "key",
1078
| "name": "name",
1079
| "environmentId": "environmentId",
1080
| "environmentKey": "environmentKey",
1081
| "description": "description",
1082
| "creationDate": 5,
1083
| "lastModifiedDate": 9,
1084
| "deleted": true,
1085
| "tags": [
1086
| "tags",
1087
| "tags"
1088
| ],
1089
| "unbounded": true,
1090
| "version": 9,
1091
| "generation": 6,
1092
| "_links": {
1093
| "self": {
1094
| "href": "href",
1095
| "type": "type"
1096
| },
1097
| "parent": {
1098
| "href": "href",
1099
| "type": "type"
1100
| }
1101
| }
1102
| }
1103
| ],
1104
| "totalCount": 8
1105
| },
1106
| "metricsExpanded": {
1107
| "items": [
1108
| {
1109
| "key": "key",
1110
| "name": "name",
1111
| "creationDate": 9,
1112
| "lastModified": 6,
1113
| "isActive": true,
1114
| "eventKey": "eventKey",
1115
| "_id": "_id",
1116
| "_versionId": "_versionId",
1117
| "kind": "kind",
1118
| "category": "category",
1119
| "description": "description",
1120
| "isNumeric": true,
1121
| "lastSeen": 3,
1122
| "_links": {
1123
| "self": {
1124
| "href": "href",
1125
| "type": "type"
1126
| },
1127
| "parent": {
1128
| "href": "href",
1129
| "type": "type"
1130
| }
1131
| }
1132
| },
1133
| {
1134
| "key": "key",
1135
| "name": "name",
1136
| "creationDate": 9,
1137
| "lastModified": 6,
1138
| "isActive": true,
1139
| "eventKey": "eventKey",
1140
| "_id": "_id",
1141
| "_versionId": "_versionId",
1142
| "kind": "kind",
1143
| "category": "category",
1144
| "description": "description",
1145
| "isNumeric": true,
1146
| "lastSeen": 3,
1147
| "_links": {
1148
| "self": {
1149
| "href": "href",
1150
| "type": "type"
1151
| },
1152
| "parent": {
1153
| "href": "href",
1154
| "type": "type"
1155
| }
1156
| }
1157
| }
1158
| ],
1159
| "totalCount": 6
1160
| },
1161
| "aiConfigsExpanded": {
1162
| "items": [
1163
| {
1164
| "key": "key",
1165
| "name": "name",
1166
| "tags": [
1167
| "tags",
1168
| "tags"
1169
| ],
1170
| "description": "description",
1171
| "version": 1,
1172
| "createdAt": 2,
1173
| "updatedAt": 6,
1174
| "flagKey": "flagKey",
1175
| "_links": {
1176
| "self": {
1177
| "href": "href",
1178
| "type": "type"
1179
| },
1180
| "parent": {
1181
| "href": "href",
1182
| "type": "type"
1183
| }
1184
| }
1185
| },
1186
| {
1187
| "key": "key",
1188
| "name": "name",
1189
| "tags": [
1190
| "tags",
1191
| "tags"
1192
| ],
1193
| "description": "description",
1194
| "version": 1,
1195
| "createdAt": 2,
1196
| "updatedAt": 6,
1197
| "flagKey": "flagKey",
1198
| "_links": {
1199
| "self": {
1200
| "href": "href",
1201
| "type": "type"
1202
| },
1203
| "parent": {
1204
| "href": "href",
1205
| "type": "type"
1206
| }
1207
| }
1208
| }
1209
| ],
1210
| "totalCount": 6
1211
| },
1212
| "resourcesExpanded": {
1213
| "items": {
1214
| "flags": {
1215
| "items": [
1216
| {
1217
| "key": "key",
1218
| "name": "name",
1219
| "description": "description",
1220
| "creationDate": 7,
1221
| "version": 1,
1222
| "archived": true,
1223
| "tags": [
1224
| "tags",
1225
| "tags"
1226
| ],
1227
| "temporary": true,
1228
| "includeInSnippet": true,
1229
| "_links": {
1230
| "self": {
1231
| "href": "href",
1232
| "type": "type"
1233
| },
1234
| "parent": {
1235
| "href": "href",
1236
| "type": "type"
1237
| }
1238
| }
1239
| },
1240
| {
1241
| "key": "key",
1242
| "name": "name",
1243
| "description": "description",
1244
| "creationDate": 7,
1245
| "version": 1,
1246
| "archived": true,
1247
| "tags": [
1248
| "tags",
1249
| "tags"
1250
| ],
1251
| "temporary": true,
1252
| "includeInSnippet": true,
1253
| "_links": {
1254
| "self": {
1255
| "href": "href",
1256
| "type": "type"
1257
| },
1258
| "parent": {
1259
| "href": "href",
1260
| "type": "type"
1261
| }
1262
| }
1263
| }
1264
| ],
1265
| "totalCount": 5
1266
| },
1267
| "segments": {
1268
| "items": [
1269
| {
1270
| "key": "key",
1271
| "name": "name",
1272
| "environmentId": "environmentId",
1273
| "environmentKey": "environmentKey",
1274
| "description": "description",
1275
| "creationDate": 5,
1276
| "lastModifiedDate": 9,
1277
| "deleted": true,
1278
| "tags": [
1279
| "tags",
1280
| "tags"
1281
| ],
1282
| "unbounded": true,
1283
| "version": 9,
1284
| "generation": 6,
1285
| "_links": {
1286
| "self": {
1287
| "href": "href",
1288
| "type": "type"
1289
| },
1290
| "parent": {
1291
| "href": "href",
1292
| "type": "type"
1293
| }
1294
| }
1295
| },
1296
| {
1297
| "key": "key",
1298
| "name": "name",
1299
| "environmentId": "environmentId",
1300
| "environmentKey": "environmentKey",
1301
| "description": "description",
1302
| "creationDate": 5,
1303
| "lastModifiedDate": 9,
1304
| "deleted": true,
1305
| "tags": [
1306
| "tags",
1307
| "tags"
1308
| ],
1309
| "unbounded": true,
1310
| "version": 9,
1311
| "generation": 6,
1312
| "_links": {
1313
| "self": {
1314
| "href": "href",
1315
| "type": "type"
1316
| },
1317
| "parent": {
1318
| "href": "href",
1319
| "type": "type"
1320
| }
1321
| }
1322
| }
1323
| ],
1324
| "totalCount": 6
1325
| },
1326
| "aiConfigs": {
1327
| "items": [
1328
| {
1329
| "key": "key",
1330
| "name": "name",
1331
| "tags": [
1332
| "tags",
1333
| "tags"
1334
| ],
1335
| "description": "description",
1336
| "version": 1,
1337
| "createdAt": 2,
1338
| "updatedAt": 6,
1339
| "flagKey": "flagKey",
1340
| "_links": {
1341
| "self": {
1342
| "href": "href",
1343
| "type": "type"
1344
| },
1345
| "parent": {
1346
| "href": "href",
1347
| "type": "type"
1348
| }
1349
| }
1350
| },
1351
| {
1352
| "key": "key",
1353
| "name": "name",
1354
| "tags": [
1355
| "tags",
1356
| "tags"
1357
| ],
1358
| "description": "description",
1359
| "version": 1,
1360
| "createdAt": 2,
1361
| "updatedAt": 6,
1362
| "flagKey": "flagKey",
1363
| "_links": {
1364
| "self": {
1365
| "href": "href",
1366
| "type": "type"
1367
| },
1368
| "parent": {
1369
| "href": "href",
1370
| "type": "type"
1371
| }
1372
| }
1373
| }
1374
| ],
1375
| "totalCount": 3
1376
| },
1377
| "metrics": {
1378
| "items": [
1379
| {
1380
| "key": "key",
1381
| "name": "name",
1382
| "creationDate": 9,
1383
| "lastModified": 6,
1384
| "isActive": true,
1385
| "eventKey": "eventKey",
1386
| "_id": "_id",
1387
| "_versionId": "_versionId",
1388
| "kind": "kind",
1389
| "category": "category",
1390
| "description": "description",
1391
| "isNumeric": true,
1392
| "lastSeen": 3,
1393
| "_links": {
1394
| "self": {
1395
| "href": "href",
1396
| "type": "type"
1397
| },
1398
| "parent": {
1399
| "href": "href",
1400
| "type": "type"
1401
| }
1402
| }
1403
| },
1404
| {
1405
| "key": "key",
1406
| "name": "name",
1407
| "creationDate": 9,
1408
| "lastModified": 6,
1409
| "isActive": true,
1410
| "eventKey": "eventKey",
1411
| "_id": "_id",
1412
| "_versionId": "_versionId",
1413
| "kind": "kind",
1414
| "category": "category",
1415
| "description": "description",
1416
| "isNumeric": true,
1417
| "lastSeen": 3,
1418
| "_links": {
1419
| "self": {
1420
| "href": "href",
1421
| "type": "type"
1422
| },
1423
| "parent": {
1424
| "href": "href",
1425
| "type": "type"
1426
| }
1427
| }
1428
| }
1429
| ],
1430
| "totalCount": 3
1431
| }
1432
| },
1433
| "totalCount": 7
1434
| }
1435
| },
1436
| "flag": {
1437
| "key": "key",
1438
| "name": "name",
1439
| "description": "description",
1440
| "creationDate": 7,
1441
| "version": 1,
1442
| "archived": true,
1443
| "tags": [
1444
| "tags",
1445
| "tags"
1446
| ],
1447
| "temporary": true,
1448
| "includeInSnippet": true,
1449
| "_links": {
1450
| "self": {
1451
| "href": "href",
1452
| "type": "type"
1453
| },
1454
| "parent": {
1455
| "href": "href",
1456
| "type": "type"
1457
| }
1458
| }
1459
| },
1460
| "segment": {
1461
| "key": "key",
1462
| "name": "name",
1463
| "environmentId": "environmentId",
1464
| "environmentKey": "environmentKey",
1465
| "description": "description",
1466
| "creationDate": 5,
1467
| "lastModifiedDate": 9,
1468
| "deleted": true,
1469
| "tags": [
1470
| "tags",
1471
| "tags"
1472
| ],
1473
| "unbounded": true,
1474
| "version": 9,
1475
| "generation": 6,
1476
| "_links": {
1477
| "self": {
1478
| "href": "href",
1479
| "type": "type"
1480
| },
1481
| "parent": {
1482
| "href": "href",
1483
| "type": "type"
1484
| }
1485
| }
1486
| },
1487
| "aiConfig": {
1488
| "key": "key",
1489
| "name": "name",
1490
| "tags": [
1491
| "tags",
1492
| "tags"
1493
| ],
1494
| "description": "description",
1495
| "version": 1,
1496
| "createdAt": 2,
1497
| "updatedAt": 6,
1498
| "flagKey": "flagKey",
1499
| "_links": {
1500
| "self": {
1501
| "href": "href",
1502
| "type": "type"
1503
| },
1504
| "parent": {
1505
| "href": "href",
1506
| "type": "type"
1507
| }
1508
| }
1509
| },
1510
| "metric": {
1511
| "key": "key",
1512
| "name": "name",
1513
| "creationDate": 9,
1514
| "lastModified": 6,
1515
| "isActive": true,
1516
| "eventKey": "eventKey",
1517
| "_id": "_id",
1518
| "_versionId": "_versionId",
1519
| "kind": "kind",
1520
| "category": "category",
1521
| "description": "description",
1522
| "isNumeric": true,
1523
| "lastSeen": 3,
1524
| "_links": {
1525
| "self": {
1526
| "href": "href",
1527
| "type": "type"
1528
| },
1529
| "parent": {
1530
| "href": "href",
1531
| "type": "type"
1532
| }
1533
| }
1534
| }
1535
| }
1536
| }
1537
| ],
1538
| "totalCount": 5,
1539
| "_links": {
1540
| "self": {
1541
| "href": "href",
1542
| "type": "type"
1543
| },
1544
| "first": {
1545
| "href": "href",
1546
| "type": "type"
1547
| },
1548
| "last": {
1549
| "href": "href",
1550
| "type": "type"
1551
| },
1552
| "next": {
1553
| "href": "href",
1554
| "type": "type"
1555
| },
1556
| "prev": {
1557
| "href": "href",
1558
| "type": "type"
1559
| }
1560
| }
1561
| }
```
Get a list of all linked resources for a given view.
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
### Query Parameters
limitintegerOptional
The number of views to return.
offsetintegerOptional
Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.
sortenumOptionalDefaults to `linkedAt`
Field to sort by. Default field is `linkedAt`, default order is ascending.
Allowed values:linkedAtname
### Response
Successful response
itemslist of objects
Show 7 properties
totalCountinteger
_linksobject or null
Show 5 properties
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