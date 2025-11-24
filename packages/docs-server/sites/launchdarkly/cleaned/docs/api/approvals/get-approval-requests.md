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
/api/v2/approval-requests
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/approval-requests"
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
[](/docs/api/approvals/get-approval-requests?explorer=true)
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
| "_id": "12ab3c45de678910abc12345",
5
| "_version": 1,
6
| "creationDate": 1,
7
| "serviceKind": "string",
8
| "reviewStatus": "pending",
9
| "allReviews": [
10
| {
11
| "_id": "12ab3c45de678910abc12345",
12
| "kind": "approve",
13
| "creationDate": 1,
14
| "comment": "Approved!",
15
| "memberId": "12ab3c45de678910abc12345",
16
| "serviceTokenId": "12ab3c45de678910abc12345"
17
| }
18
| ],
19
| "notifyMemberIds": [
20
| "1234a56b7c89d012345e678f"
21
| ],
22
| "status": "pending",
23
| "instructions": [
24
| {}
25
| ],
26
| "conflicts": [
27
| {
28
| "instruction": {},
29
| "reason": "string"
30
| }
31
| ],
32
| "_links": {},
33
| "requestorId": "12ab3c45de678910abc12345",
34
| "description": "example: request approval from someone",
35
| "appliedDate": 1,
36
| "appliedByMemberId": "1234a56b7c89d012345e678f",
37
| "appliedByServiceTokenId": "1234a56b7c89d012345e678f",
38
| "executionDate": 1,
39
| "operatingOnId": "12ab3c45de678910abc12345",
40
| "integrationMetadata": {
41
| "externalId": "string",
42
| "externalStatus": {
43
| "display": "string",
44
| "value": "string"
45
| },
46
| "externalUrl": "string",
47
| "lastChecked": 1
48
| },
49
| "source": {
50
| "key": "source-flag-key-123abc",
51
| "version": 1
52
| },
53
| "customWorkflowMetadata": {
54
| "name": "Example workflow name",
55
| "stage": {
56
| "index": 0,
57
| "name": "Stage 1"
58
| }
59
| },
60
| "resourceId": "string",
61
| "approvalSettings": {
62
| "required": true,
63
| "bypassApprovalsForPendingChanges": false,
64
| "minNumApprovals": 1,
65
| "canReviewOwnRequest": false,
66
| "canApplyDeclinedChanges": true,
67
| "serviceKind": "launchdarkly",
68
| "serviceConfig": {},
69
| "requiredApprovalTags": [
70
| "require-approval"
71
| ],
72
| "autoApplyApprovedChanges": true,
73
| "serviceKindConfigurationId": "1ef45a85-218f-4428-a8b2-a97e5f56c258",
74
| "resourceKind": "string"
75
| },
76
| "project": {
77
| "_links": {
78
| "environments": {
79
| "href": "/api/v2/projects/my-project/environments",
80
| "type": "application/json"
81
| },
82
| "self": {
83
| "href": "/api/v2/projects/my-project",
84
| "type": "application/json"
85
| }
86
| },
87
| "_id": "57be1db38b75bf0772d11383",
88
| "key": "project-key-123abc",
89
| "includeInSnippetByDefault": true,
90
| "name": "My Project",
91
| "tags": [
92
| "ops"
93
| ],
94
| "defaultClientSideAvailability": {
95
| "usingMobileKey": true,
96
| "usingEnvironmentId": true
97
| },
98
| "_access": {
99
| "denied": [
100
| {
101
| "action": "string",
102
| "reason": {
103
| "effect": "allow",
104
| "resources": [
105
| "proj/*:env/*;qa_*:/flag/*"
106
| ],
107
| "notResources": [
108
| "string"
109
| ],
110
| "actions": [
111
| "*"
112
| ],
113
| "notActions": [
114
| "string"
115
| ],
116
| "role_name": "string"
117
| }
118
| }
119
| ],
120
| "allowed": [
121
| {
122
| "action": "string",
123
| "reason": {
124
| "effect": "allow",
125
| "resources": [
126
| "proj/*:env/*;qa_*:/flag/*"
127
| ],
128
| "notResources": [
129
| "string"
130
| ],
131
| "actions": [
132
| "*"
133
| ],
134
| "notActions": [
135
| "string"
136
| ],
137
| "role_name": "string"
138
| }
139
| }
140
| ]
141
| },
142
| "defaultReleasePipelineKey": "string",
143
| "environments": {
144
| "items": [
145
| {
146
| "_links": {
147
| "self": {
148
| "href": "/api/v2/projects/my-project/environments/my-environment",
149
| "type": "application/json"
150
| }
151
| },
152
| "_id": "57be1db38b75bf0772d11384",
153
| "key": "environment-key-123abc",
154
| "name": "My Environment",
155
| "apiKey": "sdk-xxx",
156
| "mobileKey": "mob-xxx",
157
| "color": "F5A623",
158
| "defaultTtl": 5,
159
| "secureMode": true,
160
| "defaultTrackEvents": false,
161
| "requireComments": true,
162
| "confirmChanges": true,
163
| "tags": [
164
| "ops"
165
| ],
166
| "critical": true,
167
| "_access": {
168
| "denied": [
169
| {
170
| "action": "string",
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
| "string"
178
| ],
179
| "actions": [
180
| "*"
181
| ],
182
| "notActions": [
183
| "string"
184
| ],
185
| "role_name": "string"
186
| }
187
| }
188
| ],
189
| "allowed": [
190
| {
191
| "action": "string",
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
| "string"
199
| ],
200
| "actions": [
201
| "*"
202
| ],
203
| "notActions": [
204
| "string"
205
| ],
206
| "role_name": "string"
207
| }
208
| }
209
| ]
210
| },
211
| "approvalSettings": {
212
| "required": true,
213
| "bypassApprovalsForPendingChanges": false,
214
| "minNumApprovals": 1,
215
| "canReviewOwnRequest": false,
216
| "canApplyDeclinedChanges": true,
217
| "serviceKind": "launchdarkly",
218
| "serviceConfig": {},
219
| "requiredApprovalTags": [
220
| "require-approval"
221
| ],
222
| "autoApplyApprovedChanges": true,
223
| "serviceKindConfigurationId": "1ef45a85-218f-4428-a8b2-a97e5f56c258",
224
| "resourceKind": "string"
225
| },
226
| "resourceApprovalSettings": {}
227
| }
228
| ],
229
| "_links": {},
230
| "totalCount": 2
231
| }
232
| },
233
| "environments": [
234
| {
235
| "_links": {
236
| "self": {
237
| "href": "/api/v2/projects/my-project/environments/my-environment",
238
| "type": "application/json"
239
| }
240
| },
241
| "_id": "57be1db38b75bf0772d11384",
242
| "key": "environment-key-123abc",
243
| "name": "My Environment",
244
| "apiKey": "sdk-xxx",
245
| "mobileKey": "mob-xxx",
246
| "color": "F5A623",
247
| "defaultTtl": 5,
248
| "secureMode": true,
249
| "defaultTrackEvents": false,
250
| "requireComments": true,
251
| "confirmChanges": true,
252
| "tags": [
253
| "ops"
254
| ],
255
| "critical": true,
256
| "_access": {
257
| "denied": [
258
| {
259
| "action": "string",
260
| "reason": {
261
| "effect": "allow",
262
| "resources": [
263
| "proj/*:env/*;qa_*:/flag/*"
264
| ],
265
| "notResources": [
266
| "string"
267
| ],
268
| "actions": [
269
| "*"
270
| ],
271
| "notActions": [
272
| "string"
273
| ],
274
| "role_name": "string"
275
| }
276
| }
277
| ],
278
| "allowed": [
279
| {
280
| "action": "string",
281
| "reason": {
282
| "effect": "allow",
283
| "resources": [
284
| "proj/*:env/*;qa_*:/flag/*"
285
| ],
286
| "notResources": [
287
| "string"
288
| ],
289
| "actions": [
290
| "*"
291
| ],
292
| "notActions": [
293
| "string"
294
| ],
295
| "role_name": "string"
296
| }
297
| }
298
| ]
299
| },
300
| "approvalSettings": {
301
| "required": true,
302
| "bypassApprovalsForPendingChanges": false,
303
| "minNumApprovals": 1,
304
| "canReviewOwnRequest": false,
305
| "canApplyDeclinedChanges": true,
306
| "serviceKind": "launchdarkly",
307
| "serviceConfig": {},
308
| "requiredApprovalTags": [
309
| "require-approval"
310
| ],
311
| "autoApplyApprovedChanges": true,
312
| "serviceKindConfigurationId": "1ef45a85-218f-4428-a8b2-a97e5f56c258",
313
| "resourceKind": "string"
314
| },
315
| "resourceApprovalSettings": {}
316
| }
317
| ],
318
| "flag": {
319
| "name": "My Flag",
320
| "kind": "boolean",
321
| "key": "flag-key-123abc",
322
| "_version": 1,
323
| "creationDate": 1,
324
| "variations": [
325
| {
326
| "value": null,
327
| "_id": "e432f62b-55f6-49dd-a02f-eb24acf39d05"
328
| },
329
| {
330
| "value": null,
331
| "_id": "a00bf58d-d252-476c-b915-15a74becacb4"
332
| }
333
| ],
334
| "temporary": true,
335
| "tags": [
336
| "example-tag"
337
| ],
338
| "_links": {
339
| "parent": {
340
| "href": "/api/v2/flags/my-project",
341
| "type": "application/json"
342
| },
343
| "self": {
344
| "href": "/api/v2/flags/my-project/my-flag",
345
| "type": "application/json"
346
| }
347
| },
348
| "customProperties": {},
349
| "archived": false,
350
| "description": "This flag controls the example widgets",
351
| "clientSideAvailability": {
352
| "usingMobileKey": true,
353
| "usingEnvironmentId": true
354
| },
355
| "maintainerId": "569f183514f4432160000007",
356
| "_maintainer": {
357
| "_links": {
358
| "self": {
359
| "href": "/api/v2/members/569f183514f4432160000007",
360
| "type": "application/json"
361
| }
362
| },
363
| "_id": "569f183514f4432160000007",
364
| "role": "admin",
365
| "email": "ariel@acme.com",
366
| "firstName": "Ariel",
367
| "lastName": "Flores"
368
| },
369
| "archivedDate": 1,
370
| "defaults": {
371
| "onVariation": 0,
372
| "offVariation": 1
373
| },
374
| "includeInSnippet": true
375
| },
376
| "resource": {
377
| "kind": "flag",
378
| "aiConfig": {
379
| "key": "aiconfig-key-123abc",
380
| "name": "AI Config 1"
381
| },
382
| "flag": {
383
| "name": "My Flag",
384
| "kind": "boolean",
385
| "key": "flag-key-123abc",
386
| "_version": 1,
387
| "creationDate": 1,
388
| "variations": [
389
| {
390
| "value": null,
391
| "_id": "e432f62b-55f6-49dd-a02f-eb24acf39d05"
392
| },
393
| {
394
| "value": null,
395
| "_id": "a00bf58d-d252-476c-b915-15a74becacb4"
396
| }
397
| ],
398
| "temporary": true,
399
| "tags": [
400
| "example-tag"
401
| ],
402
| "_links": {
403
| "parent": {
404
| "href": "/api/v2/flags/my-project",
405
| "type": "application/json"
406
| },
407
| "self": {
408
| "href": "/api/v2/flags/my-project/my-flag",
409
| "type": "application/json"
410
| }
411
| },
412
| "customProperties": {},
413
| "archived": false,
414
| "description": "This flag controls the example widgets",
415
| "clientSideAvailability": {
416
| "usingMobileKey": true,
417
| "usingEnvironmentId": true
418
| },
419
| "maintainerId": "569f183514f4432160000007",
420
| "_maintainer": {
421
| "_links": {
422
| "self": {
423
| "href": "/api/v2/members/569f183514f4432160000007",
424
| "type": "application/json"
425
| }
426
| },
427
| "_id": "569f183514f4432160000007",
428
| "role": "admin",
429
| "email": "ariel@acme.com",
430
| "firstName": "Ariel",
431
| "lastName": "Flores"
432
| },
433
| "archivedDate": 1,
434
| "defaults": {
435
| "onVariation": 0,
436
| "offVariation": 1
437
| },
438
| "includeInSnippet": true
439
| },
440
| "segment": {
441
| "name": "Example segment",
442
| "tags": [
443
| "testing"
444
| ],
445
| "creationDate": 1,
446
| "lastModifiedDate": 1,
447
| "key": "segment-key-123abc",
448
| "_links": {},
449
| "rules": [
450
| {
451
| "clauses": [
452
| {
453
| "attribute": "email",
454
| "op": "endsWith",
455
| "values": [
456
| ".edu"
457
| ],
458
| "negate": false,
459
| "_id": "12ab3c45de678910fab12345"
460
| }
461
| ],
462
| "_id": "1234a56b7c89d012345e678f"
463
| }
464
| ],
465
| "version": 1,
466
| "deleted": false,
467
| "generation": 1,
468
| "description": "Bundle our sample customers together",
469
| "included": [
470
| "user-key-123abc"
471
| ],
472
| "excluded": [
473
| "user-key-123abc"
474
| ],
475
| "includedContexts": [
476
| {
477
| "values": [
478
| "string"
479
| ],
480
| "contextKind": "string"
481
| }
482
| ],
483
| "excludedContexts": [
484
| {
485
| "values": [
486
| "string"
487
| ],
488
| "contextKind": "string"
489
| }
490
| ],
491
| "_access": {
492
| "denied": [
493
| {
494
| "action": "string",
495
| "reason": {
496
| "effect": "allow",
497
| "resources": [
498
| "proj/*:env/*;qa_*:/flag/*"
499
| ],
500
| "notResources": [
501
| "string"
502
| ],
503
| "actions": [
504
| "*"
505
| ],
506
| "notActions": [
507
| "string"
508
| ],
509
| "role_name": "string"
510
| }
511
| }
512
| ],
513
| "allowed": [
514
| {
515
| "action": "string",
516
| "reason": {
517
| "effect": "allow",
518
| "resources": [
519
| "proj/*:env/*;qa_*:/flag/*"
520
| ],
521
| "notResources": [
522
| "string"
523
| ],
524
| "actions": [
525
| "*"
526
| ],
527
| "notActions": [
528
| "string"
529
| ],
530
| "role_name": "string"
531
| }
532
| }
533
| ]
534
| },
535
| "_flags": [
536
| {
537
| "name": "Example flag",
538
| "key": "flag-key-123abc",
539
| "_links": {},
540
| "_site": {
541
| "href": "string",
542
| "type": "string"
543
| }
544
| }
545
| ],
546
| "unbounded": false,
547
| "unboundedContextKind": "string",
548
| "_unboundedMetadata": {
549
| "envId": "string",
550
| "segmentId": "string",
551
| "version": 1,
552
| "includedCount": 1,
553
| "excludedCount": 1,
554
| "lastModified": 1,
555
| "deleted": true
556
| },
557
| "_external": "amplitude",
558
| "_externalLink": "https://analytics.amplitude.com/org/1234/cohort/123abc",
559
| "_importInProgress": false
560
| }
561
| }
562
| }
563
| ],
564
| "totalCount": 1,
565
| "_links": {}
566
| }
```
Get all approval requests. ### Filtering approvals LaunchDarkly supports the `filter` query param for filtering, with the following fields: - `notifyMemberIds` filters for only approvals that are assigned to a member in the specified list. For example: `filter=notifyMemberIds anyOf ["memberId1", "memberId2"]`. - `requestorId` filters for only approvals that correspond to the ID of the member who requested the approval. For example: `filter=requestorId equals 457034721476302714390214`. - `resourceId` filters for only approvals that correspond to the the specified resource identifier. For example: `filter=resourceId equals proj/my-project:env/my-environment:flag/my-flag`. - `resourceKind` filters for only approvals that correspond to the specified resource kind. For example: `filter=resourceKind equals flag`. Currently, `flag`, `segment`, and `aiConfig` resource kinds are supported. - `reviewStatus` filters for only approvals which correspond to the review status in the specified list. The possible values are `approved`, `declined`, and `pending`. For example: `filter=reviewStatus anyOf ["pending", "approved"]`. - `status` filters for only approvals which correspond to the status in the specified list. The possible values are `pending`, `scheduled`, `failed`, and `completed`. For example: `filter=status anyOf ["pending", "scheduled"]`. You can also apply multiple filters at once. For example, setting `filter=projectKey equals my-project, reviewStatus anyOf ["pending","approved"]` matches approval requests which correspond to the `my-project` project key, and a review status of either `pending` or `approved`. ### Expanding approval response LaunchDarkly supports the `expand` query param to include additional fields in the response, with the following fields: - `flag` includes the flag the approval request belongs to - `project` includes the project the approval request belongs to - `environments` includes the environments the approval request relates to For example, `expand=project,flag` includes the `project` and `flag` fields in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Query Parameters
filterstringOptional`format: "string"`
A comma-separated list of filters. Each filter is of the form `field operator value`. Supported fields are explained above.
expandstringOptional`format: "string"`
A comma-separated list of fields to expand in the response. Supported fields are explained above.
limitlongOptional
The number of approvals to return. Defaults to 20. Maximum limit is 200.
offsetlongOptional
Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.
### Response
Approval request collection response
itemslist of objects
An array of approval requests
Show 27 properties
totalCountinteger
Total number of approval requests
_linksmap from strings to objects
The location and content type of related resources
Show 2 properties
### Errors
400
Bad Request Error
401
Unauthorized Error
403
Forbidden Error
429
Too Many Requests Error
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
Get all approval requests.
### Filtering approvals
LaunchDarkly supports the `filter` query param for filtering, with the following fields:
 * `notifyMemberIds` filters for only approvals that are assigned to a member in the specified list. For example: `filter=notifyMemberIds anyOf ["memberId1", "memberId2"]`.
 * `requestorId` filters for only approvals that correspond to the ID of the member who requested the approval. For example: `filter=requestorId equals 457034721476302714390214`.
 * `resourceId` filters for only approvals that correspond to the the specified resource identifier. For example: `filter=resourceId equals proj/my-project:env/my-environment:flag/my-flag`.
 * `resourceKind` filters for only approvals that correspond to the specified resource kind. For example: `filter=resourceKind equals flag`. Currently, `flag`, `segment`, and `aiConfig` resource kinds are supported.
 * `reviewStatus` filters for only approvals which correspond to the review status in the specified list. The possible values are `approved`, `declined`, and `pending`. For example: `filter=reviewStatus anyOf ["pending", "approved"]`.
 * `status` filters for only approvals which correspond to the status in the specified list. The possible values are `pending`, `scheduled`, `failed`, and `completed`. For example: `filter=status anyOf ["pending", "scheduled"]`.
You can also apply multiple filters at once. For example, setting `filter=projectKey equals my-project, reviewStatus anyOf ["pending","approved"]` matches approval requests which correspond to the `my-project` project key, and a review status of either `pending` or `approved`.
### Expanding approval response
LaunchDarkly supports the `expand` query param to include additional fields in the response, with the following fields:
 * `flag` includes the flag the approval request belongs to
 * `project` includes the project the approval request belongs to
 * `environments` includes the environments the approval request relates to
For example, `expand=project,flag` includes the `project` and `flag` fields in the response.