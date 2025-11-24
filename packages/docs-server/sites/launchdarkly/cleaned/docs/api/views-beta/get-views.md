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
[](/docs/api/views-beta/get-views?explorer=true)
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
| "id": "id",
5
| "accountId": "accountId",
6
| "projectId": "projectId",
7
| "projectKey": "projectKey",
8
| "key": "key",
9
| "name": "name",
10
| "description": "description",
11
| "generateSdkKeys": true,
12
| "version": 0,
13
| "tags": [
14
| "tags",
15
| "tags"
16
| ],
17
| "createdAt": 6,
18
| "updatedAt": 1,
19
| "archived": false,
20
| "deleted": false,
21
| "_access": {
22
| "allowed": [
23
| {
24
| "action": "action",
25
| "reason": {
26
| "effect": "allow",
27
| "resources": [
28
| "proj/*:env/*;qa_*:/flag/*"
29
| ],
30
| "notResources": [
31
| "notResources",
32
| "notResources"
33
| ],
34
| "actions": [
35
| "*"
36
| ],
37
| "notActions": [
38
| "string",
39
| "string"
40
| ],
41
| "role_name": "role_name"
42
| }
43
| },
44
| {
45
| "action": "action",
46
| "reason": {
47
| "effect": "allow",
48
| "resources": [
49
| "proj/*:env/*;qa_*:/flag/*"
50
| ],
51
| "notResources": [
52
| "notResources",
53
| "notResources"
54
| ],
55
| "actions": [
56
| "*"
57
| ],
58
| "notActions": [
59
| "string",
60
| "string"
61
| ],
62
| "role_name": "role_name"
63
| }
64
| }
65
| ],
66
| "denied": [
67
| {
68
| "action": "action",
69
| "reason": {
70
| "effect": "allow",
71
| "resources": [
72
| "proj/*:env/*;qa_*:/flag/*"
73
| ],
74
| "notResources": [
75
| "notResources",
76
| "notResources"
77
| ],
78
| "actions": [
79
| "*"
80
| ],
81
| "notActions": [
82
| "string",
83
| "string"
84
| ],
85
| "role_name": "role_name"
86
| }
87
| },
88
| {
89
| "action": "action",
90
| "reason": {
91
| "effect": "allow",
92
| "resources": [
93
| "proj/*:env/*;qa_*:/flag/*"
94
| ],
95
| "notResources": [
96
| "notResources",
97
| "notResources"
98
| ],
99
| "actions": [
100
| "*"
101
| ],
102
| "notActions": [
103
| "string",
104
| "string"
105
| ],
106
| "role_name": "role_name"
107
| }
108
| }
109
| ]
110
| },
111
| "_links": {
112
| "self": {
113
| "href": "href",
114
| "type": "type"
115
| },
116
| "parent": {
117
| "href": "href",
118
| "type": "type"
119
| }
120
| },
121
| "archivedAt": 5,
122
| "deletedAt": 5,
123
| "maintainer": {
124
| "id": "id",
125
| "kind": "kind",
126
| "maintainerMember": {
127
| "id": "id",
128
| "email": "email",
129
| "role": "role",
130
| "firstName": "firstName",
131
| "lastName": "lastName"
132
| },
133
| "maintainerTeam": {
134
| "id": "id",
135
| "key": "key",
136
| "name": "name"
137
| }
138
| },
139
| "flagsSummary": {
140
| "count": 2,
141
| "linkedFlags": {
142
| "items": [
143
| {
144
| "key": "key",
145
| "name": "name",
146
| "links": {
147
| "self": {
148
| "href": "href",
149
| "type": "type"
150
| }
151
| }
152
| },
153
| {
154
| "key": "key",
155
| "name": "name",
156
| "links": {
157
| "self": {
158
| "href": "href",
159
| "type": "type"
160
| }
161
| }
162
| }
163
| ],
164
| "totalCount": 7
165
| }
166
| },
167
| "segmentsSummary": {
168
| "count": 9,
169
| "linkedSegments": {
170
| "items": [
171
| {
172
| "key": "key",
173
| "name": "name",
174
| "environmentId": "environmentId",
175
| "links": {
176
| "self": {
177
| "href": "href",
178
| "type": "type"
179
| }
180
| }
181
| },
182
| {
183
| "key": "key",
184
| "name": "name",
185
| "environmentId": "environmentId",
186
| "links": {
187
| "self": {
188
| "href": "href",
189
| "type": "type"
190
| }
191
| }
192
| }
193
| ],
194
| "totalCount": 3
195
| }
196
| },
197
| "metricsSummary": {
198
| "count": 2
199
| },
200
| "aiConfigsSummary": {
201
| "count": 4
202
| },
203
| "resourceSummary": {
204
| "flagCount": 7,
205
| "totalCount": 6,
206
| "segmentCount": 1,
207
| "metricCount": 1,
208
| "aiConfigCount": 1
209
| },
210
| "flagsExpanded": {
211
| "items": [
212
| {
213
| "key": "key",
214
| "name": "name",
215
| "description": "description",
216
| "creationDate": 7,
217
| "version": 1,
218
| "archived": true,
219
| "tags": [
220
| "tags",
221
| "tags"
222
| ],
223
| "temporary": true,
224
| "includeInSnippet": true,
225
| "_links": {
226
| "self": {
227
| "href": "href",
228
| "type": "type"
229
| },
230
| "parent": {
231
| "href": "href",
232
| "type": "type"
233
| }
234
| }
235
| },
236
| {
237
| "key": "key",
238
| "name": "name",
239
| "description": "description",
240
| "creationDate": 7,
241
| "version": 1,
242
| "archived": true,
243
| "tags": [
244
| "tags",
245
| "tags"
246
| ],
247
| "temporary": true,
248
| "includeInSnippet": true,
249
| "_links": {
250
| "self": {
251
| "href": "href",
252
| "type": "type"
253
| },
254
| "parent": {
255
| "href": "href",
256
| "type": "type"
257
| }
258
| }
259
| }
260
| ],
261
| "totalCount": 4
262
| },
263
| "segmentsExpanded": {
264
| "items": [
265
| {
266
| "key": "key",
267
| "name": "name",
268
| "environmentId": "environmentId",
269
| "environmentKey": "environmentKey",
270
| "description": "description",
271
| "creationDate": 5,
272
| "lastModifiedDate": 9,
273
| "deleted": true,
274
| "tags": [
275
| "tags",
276
| "tags"
277
| ],
278
| "unbounded": true,
279
| "version": 9,
280
| "generation": 6,
281
| "_links": {
282
| "self": {
283
| "href": "href",
284
| "type": "type"
285
| },
286
| "parent": {
287
| "href": "href",
288
| "type": "type"
289
| }
290
| }
291
| },
292
| {
293
| "key": "key",
294
| "name": "name",
295
| "environmentId": "environmentId",
296
| "environmentKey": "environmentKey",
297
| "description": "description",
298
| "creationDate": 5,
299
| "lastModifiedDate": 9,
300
| "deleted": true,
301
| "tags": [
302
| "tags",
303
| "tags"
304
| ],
305
| "unbounded": true,
306
| "version": 9,
307
| "generation": 6,
308
| "_links": {
309
| "self": {
310
| "href": "href",
311
| "type": "type"
312
| },
313
| "parent": {
314
| "href": "href",
315
| "type": "type"
316
| }
317
| }
318
| }
319
| ],
320
| "totalCount": 8
321
| },
322
| "metricsExpanded": {
323
| "items": [
324
| {
325
| "key": "key",
326
| "name": "name",
327
| "creationDate": 9,
328
| "lastModified": 6,
329
| "isActive": true,
330
| "eventKey": "eventKey",
331
| "_id": "_id",
332
| "_versionId": "_versionId",
333
| "kind": "kind",
334
| "category": "category",
335
| "description": "description",
336
| "isNumeric": true,
337
| "lastSeen": 3,
338
| "_links": {
339
| "self": {
340
| "href": "href",
341
| "type": "type"
342
| },
343
| "parent": {
344
| "href": "href",
345
| "type": "type"
346
| }
347
| }
348
| },
349
| {
350
| "key": "key",
351
| "name": "name",
352
| "creationDate": 9,
353
| "lastModified": 6,
354
| "isActive": true,
355
| "eventKey": "eventKey",
356
| "_id": "_id",
357
| "_versionId": "_versionId",
358
| "kind": "kind",
359
| "category": "category",
360
| "description": "description",
361
| "isNumeric": true,
362
| "lastSeen": 3,
363
| "_links": {
364
| "self": {
365
| "href": "href",
366
| "type": "type"
367
| },
368
| "parent": {
369
| "href": "href",
370
| "type": "type"
371
| }
372
| }
373
| }
374
| ],
375
| "totalCount": 6
376
| },
377
| "aiConfigsExpanded": {
378
| "items": [
379
| {
380
| "key": "key",
381
| "name": "name",
382
| "tags": [
383
| "tags",
384
| "tags"
385
| ],
386
| "description": "description",
387
| "version": 1,
388
| "createdAt": 2,
389
| "updatedAt": 6,
390
| "flagKey": "flagKey",
391
| "_links": {
392
| "self": {
393
| "href": "href",
394
| "type": "type"
395
| },
396
| "parent": {
397
| "href": "href",
398
| "type": "type"
399
| }
400
| }
401
| },
402
| {
403
| "key": "key",
404
| "name": "name",
405
| "tags": [
406
| "tags",
407
| "tags"
408
| ],
409
| "description": "description",
410
| "version": 1,
411
| "createdAt": 2,
412
| "updatedAt": 6,
413
| "flagKey": "flagKey",
414
| "_links": {
415
| "self": {
416
| "href": "href",
417
| "type": "type"
418
| },
419
| "parent": {
420
| "href": "href",
421
| "type": "type"
422
| }
423
| }
424
| }
425
| ],
426
| "totalCount": 6
427
| },
428
| "resourcesExpanded": {
429
| "items": {
430
| "flags": {
431
| "items": [
432
| {
433
| "key": "key",
434
| "name": "name",
435
| "description": "description",
436
| "creationDate": 7,
437
| "version": 1,
438
| "archived": true,
439
| "tags": [
440
| "tags",
441
| "tags"
442
| ],
443
| "temporary": true,
444
| "includeInSnippet": true,
445
| "_links": {
446
| "self": {
447
| "href": "href",
448
| "type": "type"
449
| },
450
| "parent": {
451
| "href": "href",
452
| "type": "type"
453
| }
454
| }
455
| },
456
| {
457
| "key": "key",
458
| "name": "name",
459
| "description": "description",
460
| "creationDate": 7,
461
| "version": 1,
462
| "archived": true,
463
| "tags": [
464
| "tags",
465
| "tags"
466
| ],
467
| "temporary": true,
468
| "includeInSnippet": true,
469
| "_links": {
470
| "self": {
471
| "href": "href",
472
| "type": "type"
473
| },
474
| "parent": {
475
| "href": "href",
476
| "type": "type"
477
| }
478
| }
479
| }
480
| ],
481
| "totalCount": 5
482
| },
483
| "segments": {
484
| "items": [
485
| {
486
| "key": "key",
487
| "name": "name",
488
| "environmentId": "environmentId",
489
| "environmentKey": "environmentKey",
490
| "description": "description",
491
| "creationDate": 5,
492
| "lastModifiedDate": 9,
493
| "deleted": true,
494
| "tags": [
495
| "tags",
496
| "tags"
497
| ],
498
| "unbounded": true,
499
| "version": 9,
500
| "generation": 6,
501
| "_links": {
502
| "self": {
503
| "href": "href",
504
| "type": "type"
505
| },
506
| "parent": {
507
| "href": "href",
508
| "type": "type"
509
| }
510
| }
511
| },
512
| {
513
| "key": "key",
514
| "name": "name",
515
| "environmentId": "environmentId",
516
| "environmentKey": "environmentKey",
517
| "description": "description",
518
| "creationDate": 5,
519
| "lastModifiedDate": 9,
520
| "deleted": true,
521
| "tags": [
522
| "tags",
523
| "tags"
524
| ],
525
| "unbounded": true,
526
| "version": 9,
527
| "generation": 6,
528
| "_links": {
529
| "self": {
530
| "href": "href",
531
| "type": "type"
532
| },
533
| "parent": {
534
| "href": "href",
535
| "type": "type"
536
| }
537
| }
538
| }
539
| ],
540
| "totalCount": 6
541
| },
542
| "aiConfigs": {
543
| "items": [
544
| {
545
| "key": "key",
546
| "name": "name",
547
| "tags": [
548
| "tags",
549
| "tags"
550
| ],
551
| "description": "description",
552
| "version": 1,
553
| "createdAt": 2,
554
| "updatedAt": 6,
555
| "flagKey": "flagKey",
556
| "_links": {
557
| "self": {
558
| "href": "href",
559
| "type": "type"
560
| },
561
| "parent": {
562
| "href": "href",
563
| "type": "type"
564
| }
565
| }
566
| },
567
| {
568
| "key": "key",
569
| "name": "name",
570
| "tags": [
571
| "tags",
572
| "tags"
573
| ],
574
| "description": "description",
575
| "version": 1,
576
| "createdAt": 2,
577
| "updatedAt": 6,
578
| "flagKey": "flagKey",
579
| "_links": {
580
| "self": {
581
| "href": "href",
582
| "type": "type"
583
| },
584
| "parent": {
585
| "href": "href",
586
| "type": "type"
587
| }
588
| }
589
| }
590
| ],
591
| "totalCount": 3
592
| },
593
| "metrics": {
594
| "items": [
595
| {
596
| "key": "key",
597
| "name": "name",
598
| "creationDate": 9,
599
| "lastModified": 6,
600
| "isActive": true,
601
| "eventKey": "eventKey",
602
| "_id": "_id",
603
| "_versionId": "_versionId",
604
| "kind": "kind",
605
| "category": "category",
606
| "description": "description",
607
| "isNumeric": true,
608
| "lastSeen": 3,
609
| "_links": {
610
| "self": {
611
| "href": "href",
612
| "type": "type"
613
| },
614
| "parent": {
615
| "href": "href",
616
| "type": "type"
617
| }
618
| }
619
| },
620
| {
621
| "key": "key",
622
| "name": "name",
623
| "creationDate": 9,
624
| "lastModified": 6,
625
| "isActive": true,
626
| "eventKey": "eventKey",
627
| "_id": "_id",
628
| "_versionId": "_versionId",
629
| "kind": "kind",
630
| "category": "category",
631
| "description": "description",
632
| "isNumeric": true,
633
| "lastSeen": 3,
634
| "_links": {
635
| "self": {
636
| "href": "href",
637
| "type": "type"
638
| },
639
| "parent": {
640
| "href": "href",
641
| "type": "type"
642
| }
643
| }
644
| }
645
| ],
646
| "totalCount": 3
647
| }
648
| },
649
| "totalCount": 7
650
| }
651
| },
652
| {
653
| "id": "id",
654
| "accountId": "accountId",
655
| "projectId": "projectId",
656
| "projectKey": "projectKey",
657
| "key": "key",
658
| "name": "name",
659
| "description": "description",
660
| "generateSdkKeys": true,
661
| "version": 0,
662
| "tags": [
663
| "tags",
664
| "tags"
665
| ],
666
| "createdAt": 6,
667
| "updatedAt": 1,
668
| "archived": false,
669
| "deleted": false,
670
| "_access": {
671
| "allowed": [
672
| {
673
| "action": "action",
674
| "reason": {
675
| "effect": "allow",
676
| "resources": [
677
| "proj/*:env/*;qa_*:/flag/*"
678
| ],
679
| "notResources": [
680
| "notResources",
681
| "notResources"
682
| ],
683
| "actions": [
684
| "*"
685
| ],
686
| "notActions": [
687
| "string",
688
| "string"
689
| ],
690
| "role_name": "role_name"
691
| }
692
| },
693
| {
694
| "action": "action",
695
| "reason": {
696
| "effect": "allow",
697
| "resources": [
698
| "proj/*:env/*;qa_*:/flag/*"
699
| ],
700
| "notResources": [
701
| "notResources",
702
| "notResources"
703
| ],
704
| "actions": [
705
| "*"
706
| ],
707
| "notActions": [
708
| "string",
709
| "string"
710
| ],
711
| "role_name": "role_name"
712
| }
713
| }
714
| ],
715
| "denied": [
716
| {
717
| "action": "action",
718
| "reason": {
719
| "effect": "allow",
720
| "resources": [
721
| "proj/*:env/*;qa_*:/flag/*"
722
| ],
723
| "notResources": [
724
| "notResources",
725
| "notResources"
726
| ],
727
| "actions": [
728
| "*"
729
| ],
730
| "notActions": [
731
| "string",
732
| "string"
733
| ],
734
| "role_name": "role_name"
735
| }
736
| },
737
| {
738
| "action": "action",
739
| "reason": {
740
| "effect": "allow",
741
| "resources": [
742
| "proj/*:env/*;qa_*:/flag/*"
743
| ],
744
| "notResources": [
745
| "notResources",
746
| "notResources"
747
| ],
748
| "actions": [
749
| "*"
750
| ],
751
| "notActions": [
752
| "string",
753
| "string"
754
| ],
755
| "role_name": "role_name"
756
| }
757
| }
758
| ]
759
| },
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
| },
770
| "archivedAt": 5,
771
| "deletedAt": 5,
772
| "maintainer": {
773
| "id": "id",
774
| "kind": "kind",
775
| "maintainerMember": {
776
| "id": "id",
777
| "email": "email",
778
| "role": "role",
779
| "firstName": "firstName",
780
| "lastName": "lastName"
781
| },
782
| "maintainerTeam": {
783
| "id": "id",
784
| "key": "key",
785
| "name": "name"
786
| }
787
| },
788
| "flagsSummary": {
789
| "count": 2,
790
| "linkedFlags": {
791
| "items": [
792
| {
793
| "key": "key",
794
| "name": "name",
795
| "links": {
796
| "self": {
797
| "href": "href",
798
| "type": "type"
799
| }
800
| }
801
| },
802
| {
803
| "key": "key",
804
| "name": "name",
805
| "links": {
806
| "self": {
807
| "href": "href",
808
| "type": "type"
809
| }
810
| }
811
| }
812
| ],
813
| "totalCount": 7
814
| }
815
| },
816
| "segmentsSummary": {
817
| "count": 9,
818
| "linkedSegments": {
819
| "items": [
820
| {
821
| "key": "key",
822
| "name": "name",
823
| "environmentId": "environmentId",
824
| "links": {
825
| "self": {
826
| "href": "href",
827
| "type": "type"
828
| }
829
| }
830
| },
831
| {
832
| "key": "key",
833
| "name": "name",
834
| "environmentId": "environmentId",
835
| "links": {
836
| "self": {
837
| "href": "href",
838
| "type": "type"
839
| }
840
| }
841
| }
842
| ],
843
| "totalCount": 3
844
| }
845
| },
846
| "metricsSummary": {
847
| "count": 2
848
| },
849
| "aiConfigsSummary": {
850
| "count": 4
851
| },
852
| "resourceSummary": {
853
| "flagCount": 7,
854
| "totalCount": 6,
855
| "segmentCount": 1,
856
| "metricCount": 1,
857
| "aiConfigCount": 1
858
| },
859
| "flagsExpanded": {
860
| "items": [
861
| {
862
| "key": "key",
863
| "name": "name",
864
| "description": "description",
865
| "creationDate": 7,
866
| "version": 1,
867
| "archived": true,
868
| "tags": [
869
| "tags",
870
| "tags"
871
| ],
872
| "temporary": true,
873
| "includeInSnippet": true,
874
| "_links": {
875
| "self": {
876
| "href": "href",
877
| "type": "type"
878
| },
879
| "parent": {
880
| "href": "href",
881
| "type": "type"
882
| }
883
| }
884
| },
885
| {
886
| "key": "key",
887
| "name": "name",
888
| "description": "description",
889
| "creationDate": 7,
890
| "version": 1,
891
| "archived": true,
892
| "tags": [
893
| "tags",
894
| "tags"
895
| ],
896
| "temporary": true,
897
| "includeInSnippet": true,
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
| }
908
| }
909
| ],
910
| "totalCount": 4
911
| },
912
| "segmentsExpanded": {
913
| "items": [
914
| {
915
| "key": "key",
916
| "name": "name",
917
| "environmentId": "environmentId",
918
| "environmentKey": "environmentKey",
919
| "description": "description",
920
| "creationDate": 5,
921
| "lastModifiedDate": 9,
922
| "deleted": true,
923
| "tags": [
924
| "tags",
925
| "tags"
926
| ],
927
| "unbounded": true,
928
| "version": 9,
929
| "generation": 6,
930
| "_links": {
931
| "self": {
932
| "href": "href",
933
| "type": "type"
934
| },
935
| "parent": {
936
| "href": "href",
937
| "type": "type"
938
| }
939
| }
940
| },
941
| {
942
| "key": "key",
943
| "name": "name",
944
| "environmentId": "environmentId",
945
| "environmentKey": "environmentKey",
946
| "description": "description",
947
| "creationDate": 5,
948
| "lastModifiedDate": 9,
949
| "deleted": true,
950
| "tags": [
951
| "tags",
952
| "tags"
953
| ],
954
| "unbounded": true,
955
| "version": 9,
956
| "generation": 6,
957
| "_links": {
958
| "self": {
959
| "href": "href",
960
| "type": "type"
961
| },
962
| "parent": {
963
| "href": "href",
964
| "type": "type"
965
| }
966
| }
967
| }
968
| ],
969
| "totalCount": 8
970
| },
971
| "metricsExpanded": {
972
| "items": [
973
| {
974
| "key": "key",
975
| "name": "name",
976
| "creationDate": 9,
977
| "lastModified": 6,
978
| "isActive": true,
979
| "eventKey": "eventKey",
980
| "_id": "_id",
981
| "_versionId": "_versionId",
982
| "kind": "kind",
983
| "category": "category",
984
| "description": "description",
985
| "isNumeric": true,
986
| "lastSeen": 3,
987
| "_links": {
988
| "self": {
989
| "href": "href",
990
| "type": "type"
991
| },
992
| "parent": {
993
| "href": "href",
994
| "type": "type"
995
| }
996
| }
997
| },
998
| {
999
| "key": "key",
1000
| "name": "name",
1001
| "creationDate": 9,
1002
| "lastModified": 6,
1003
| "isActive": true,
1004
| "eventKey": "eventKey",
1005
| "_id": "_id",
1006
| "_versionId": "_versionId",
1007
| "kind": "kind",
1008
| "category": "category",
1009
| "description": "description",
1010
| "isNumeric": true,
1011
| "lastSeen": 3,
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
| }
1023
| ],
1024
| "totalCount": 6
1025
| },
1026
| "aiConfigsExpanded": {
1027
| "items": [
1028
| {
1029
| "key": "key",
1030
| "name": "name",
1031
| "tags": [
1032
| "tags",
1033
| "tags"
1034
| ],
1035
| "description": "description",
1036
| "version": 1,
1037
| "createdAt": 2,
1038
| "updatedAt": 6,
1039
| "flagKey": "flagKey",
1040
| "_links": {
1041
| "self": {
1042
| "href": "href",
1043
| "type": "type"
1044
| },
1045
| "parent": {
1046
| "href": "href",
1047
| "type": "type"
1048
| }
1049
| }
1050
| },
1051
| {
1052
| "key": "key",
1053
| "name": "name",
1054
| "tags": [
1055
| "tags",
1056
| "tags"
1057
| ],
1058
| "description": "description",
1059
| "version": 1,
1060
| "createdAt": 2,
1061
| "updatedAt": 6,
1062
| "flagKey": "flagKey",
1063
| "_links": {
1064
| "self": {
1065
| "href": "href",
1066
| "type": "type"
1067
| },
1068
| "parent": {
1069
| "href": "href",
1070
| "type": "type"
1071
| }
1072
| }
1073
| }
1074
| ],
1075
| "totalCount": 6
1076
| },
1077
| "resourcesExpanded": {
1078
| "items": {
1079
| "flags": {
1080
| "items": [
1081
| {
1082
| "key": "key",
1083
| "name": "name",
1084
| "description": "description",
1085
| "creationDate": 7,
1086
| "version": 1,
1087
| "archived": true,
1088
| "tags": [
1089
| "tags",
1090
| "tags"
1091
| ],
1092
| "temporary": true,
1093
| "includeInSnippet": true,
1094
| "_links": {
1095
| "self": {
1096
| "href": "href",
1097
| "type": "type"
1098
| },
1099
| "parent": {
1100
| "href": "href",
1101
| "type": "type"
1102
| }
1103
| }
1104
| },
1105
| {
1106
| "key": "key",
1107
| "name": "name",
1108
| "description": "description",
1109
| "creationDate": 7,
1110
| "version": 1,
1111
| "archived": true,
1112
| "tags": [
1113
| "tags",
1114
| "tags"
1115
| ],
1116
| "temporary": true,
1117
| "includeInSnippet": true,
1118
| "_links": {
1119
| "self": {
1120
| "href": "href",
1121
| "type": "type"
1122
| },
1123
| "parent": {
1124
| "href": "href",
1125
| "type": "type"
1126
| }
1127
| }
1128
| }
1129
| ],
1130
| "totalCount": 5
1131
| },
1132
| "segments": {
1133
| "items": [
1134
| {
1135
| "key": "key",
1136
| "name": "name",
1137
| "environmentId": "environmentId",
1138
| "environmentKey": "environmentKey",
1139
| "description": "description",
1140
| "creationDate": 5,
1141
| "lastModifiedDate": 9,
1142
| "deleted": true,
1143
| "tags": [
1144
| "tags",
1145
| "tags"
1146
| ],
1147
| "unbounded": true,
1148
| "version": 9,
1149
| "generation": 6,
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
| },
1161
| {
1162
| "key": "key",
1163
| "name": "name",
1164
| "environmentId": "environmentId",
1165
| "environmentKey": "environmentKey",
1166
| "description": "description",
1167
| "creationDate": 5,
1168
| "lastModifiedDate": 9,
1169
| "deleted": true,
1170
| "tags": [
1171
| "tags",
1172
| "tags"
1173
| ],
1174
| "unbounded": true,
1175
| "version": 9,
1176
| "generation": 6,
1177
| "_links": {
1178
| "self": {
1179
| "href": "href",
1180
| "type": "type"
1181
| },
1182
| "parent": {
1183
| "href": "href",
1184
| "type": "type"
1185
| }
1186
| }
1187
| }
1188
| ],
1189
| "totalCount": 6
1190
| },
1191
| "aiConfigs": {
1192
| "items": [
1193
| {
1194
| "key": "key",
1195
| "name": "name",
1196
| "tags": [
1197
| "tags",
1198
| "tags"
1199
| ],
1200
| "description": "description",
1201
| "version": 1,
1202
| "createdAt": 2,
1203
| "updatedAt": 6,
1204
| "flagKey": "flagKey",
1205
| "_links": {
1206
| "self": {
1207
| "href": "href",
1208
| "type": "type"
1209
| },
1210
| "parent": {
1211
| "href": "href",
1212
| "type": "type"
1213
| }
1214
| }
1215
| },
1216
| {
1217
| "key": "key",
1218
| "name": "name",
1219
| "tags": [
1220
| "tags",
1221
| "tags"
1222
| ],
1223
| "description": "description",
1224
| "version": 1,
1225
| "createdAt": 2,
1226
| "updatedAt": 6,
1227
| "flagKey": "flagKey",
1228
| "_links": {
1229
| "self": {
1230
| "href": "href",
1231
| "type": "type"
1232
| },
1233
| "parent": {
1234
| "href": "href",
1235
| "type": "type"
1236
| }
1237
| }
1238
| }
1239
| ],
1240
| "totalCount": 3
1241
| },
1242
| "metrics": {
1243
| "items": [
1244
| {
1245
| "key": "key",
1246
| "name": "name",
1247
| "creationDate": 9,
1248
| "lastModified": 6,
1249
| "isActive": true,
1250
| "eventKey": "eventKey",
1251
| "_id": "_id",
1252
| "_versionId": "_versionId",
1253
| "kind": "kind",
1254
| "category": "category",
1255
| "description": "description",
1256
| "isNumeric": true,
1257
| "lastSeen": 3,
1258
| "_links": {
1259
| "self": {
1260
| "href": "href",
1261
| "type": "type"
1262
| },
1263
| "parent": {
1264
| "href": "href",
1265
| "type": "type"
1266
| }
1267
| }
1268
| },
1269
| {
1270
| "key": "key",
1271
| "name": "name",
1272
| "creationDate": 9,
1273
| "lastModified": 6,
1274
| "isActive": true,
1275
| "eventKey": "eventKey",
1276
| "_id": "_id",
1277
| "_versionId": "_versionId",
1278
| "kind": "kind",
1279
| "category": "category",
1280
| "description": "description",
1281
| "isNumeric": true,
1282
| "lastSeen": 3,
1283
| "_links": {
1284
| "self": {
1285
| "href": "href",
1286
| "type": "type"
1287
| },
1288
| "parent": {
1289
| "href": "href",
1290
| "type": "type"
1291
| }
1292
| }
1293
| }
1294
| ],
1295
| "totalCount": 3
1296
| }
1297
| },
1298
| "totalCount": 7
1299
| }
1300
| }
1301
| ],
1302
| "totalCount": 0,
1303
| "_links": {
1304
| "self": {
1305
| "href": "href",
1306
| "type": "type"
1307
| },
1308
| "first": {
1309
| "href": "href",
1310
| "type": "type"
1311
| },
1312
| "last": {
1313
| "href": "href",
1314
| "type": "type"
1315
| },
1316
| "next": {
1317
| "href": "href",
1318
| "type": "type"
1319
| },
1320
| "prev": {
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
```
Get a list of all views in the given project.
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
projectKeystringRequired
### Headers
LD-API-VersionenumRequired
Version of the endpoint.
Allowed values:beta
### Query Parameters
sortenumOptional
A sort to apply to the list of views.
Allowed values:keynameupdatedAt
limitintegerOptional
The number of views to return.
offsetintegerOptional
Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.
filterstringOptional
A filter to apply to the list of views.
expandlist of enumsOptional
A comma-separated list of fields to expand.
Allowed values:flagsSummarysegmentsSummarymetricsSummaryaiConfigsSummaryresourceSummary
### Response
Successful response
itemslist of objects
Show 29 properties
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