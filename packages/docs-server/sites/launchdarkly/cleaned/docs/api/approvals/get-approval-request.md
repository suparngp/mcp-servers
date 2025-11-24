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
/api/v2/approval-requests/:id
Python
```
1
| import requests
---|--- 
2
| 
3
| url = "https://app.launchdarkly.com/api/v2/approval-requests/id"
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
[](/docs/api/approvals/get-approval-request?explorer=true)
200Retrieved
```
1
| {
---|--- 
2
| "_id": "12ab3c45de678910abc12345",
3
| "_version": 1,
4
| "creationDate": 1,
5
| "serviceKind": "string",
6
| "reviewStatus": "pending",
7
| "allReviews": [
8
| {
9
| "_id": "12ab3c45de678910abc12345",
10
| "kind": "approve",
11
| "creationDate": 1,
12
| "comment": "Approved!",
13
| "memberId": "12ab3c45de678910abc12345",
14
| "serviceTokenId": "12ab3c45de678910abc12345"
15
| }
16
| ],
17
| "notifyMemberIds": [
18
| "1234a56b7c89d012345e678f"
19
| ],
20
| "status": "pending",
21
| "instructions": [
22
| {}
23
| ],
24
| "conflicts": [
25
| {
26
| "instruction": {},
27
| "reason": "string"
28
| }
29
| ],
30
| "_links": {},
31
| "requestorId": "12ab3c45de678910abc12345",
32
| "description": "example: request approval from someone",
33
| "appliedDate": 1,
34
| "appliedByMemberId": "1234a56b7c89d012345e678f",
35
| "appliedByServiceTokenId": "1234a56b7c89d012345e678f",
36
| "executionDate": 1,
37
| "operatingOnId": "12ab3c45de678910abc12345",
38
| "integrationMetadata": {
39
| "externalId": "string",
40
| "externalStatus": {
41
| "display": "string",
42
| "value": "string"
43
| },
44
| "externalUrl": "string",
45
| "lastChecked": 1
46
| },
47
| "source": {
48
| "key": "source-flag-key-123abc",
49
| "version": 1
50
| },
51
| "customWorkflowMetadata": {
52
| "name": "Example workflow name",
53
| "stage": {
54
| "index": 0,
55
| "name": "Stage 1"
56
| }
57
| },
58
| "resourceId": "string",
59
| "approvalSettings": {
60
| "required": true,
61
| "bypassApprovalsForPendingChanges": false,
62
| "minNumApprovals": 1,
63
| "canReviewOwnRequest": false,
64
| "canApplyDeclinedChanges": true,
65
| "serviceKind": "launchdarkly",
66
| "serviceConfig": {},
67
| "requiredApprovalTags": [
68
| "require-approval"
69
| ],
70
| "autoApplyApprovedChanges": true,
71
| "serviceKindConfigurationId": "1ef45a85-218f-4428-a8b2-a97e5f56c258",
72
| "resourceKind": "string"
73
| },
74
| "project": {
75
| "_links": {
76
| "environments": {
77
| "href": "/api/v2/projects/my-project/environments",
78
| "type": "application/json"
79
| },
80
| "self": {
81
| "href": "/api/v2/projects/my-project",
82
| "type": "application/json"
83
| }
84
| },
85
| "_id": "57be1db38b75bf0772d11383",
86
| "key": "project-key-123abc",
87
| "includeInSnippetByDefault": true,
88
| "name": "My Project",
89
| "tags": [
90
| "ops"
91
| ],
92
| "defaultClientSideAvailability": {
93
| "usingMobileKey": true,
94
| "usingEnvironmentId": true
95
| },
96
| "_access": {
97
| "denied": [
98
| {
99
| "action": "string",
100
| "reason": {
101
| "effect": "allow",
102
| "resources": [
103
| "proj/*:env/*;qa_*:/flag/*"
104
| ],
105
| "notResources": [
106
| "string"
107
| ],
108
| "actions": [
109
| "*"
110
| ],
111
| "notActions": [
112
| "string"
113
| ],
114
| "role_name": "string"
115
| }
116
| }
117
| ],
118
| "allowed": [
119
| {
120
| "action": "string",
121
| "reason": {
122
| "effect": "allow",
123
| "resources": [
124
| "proj/*:env/*;qa_*:/flag/*"
125
| ],
126
| "notResources": [
127
| "string"
128
| ],
129
| "actions": [
130
| "*"
131
| ],
132
| "notActions": [
133
| "string"
134
| ],
135
| "role_name": "string"
136
| }
137
| }
138
| ]
139
| },
140
| "defaultReleasePipelineKey": "string",
141
| "environments": {
142
| "items": [
143
| {
144
| "_links": {
145
| "self": {
146
| "href": "/api/v2/projects/my-project/environments/my-environment",
147
| "type": "application/json"
148
| }
149
| },
150
| "_id": "57be1db38b75bf0772d11384",
151
| "key": "environment-key-123abc",
152
| "name": "My Environment",
153
| "apiKey": "sdk-xxx",
154
| "mobileKey": "mob-xxx",
155
| "color": "F5A623",
156
| "defaultTtl": 5,
157
| "secureMode": true,
158
| "defaultTrackEvents": false,
159
| "requireComments": true,
160
| "confirmChanges": true,
161
| "tags": [
162
| "ops"
163
| ],
164
| "critical": true,
165
| "_access": {
166
| "denied": [
167
| {
168
| "action": "string",
169
| "reason": {
170
| "effect": "allow",
171
| "resources": [
172
| "proj/*:env/*;qa_*:/flag/*"
173
| ],
174
| "notResources": [
175
| "string"
176
| ],
177
| "actions": [
178
| "*"
179
| ],
180
| "notActions": [
181
| "string"
182
| ],
183
| "role_name": "string"
184
| }
185
| }
186
| ],
187
| "allowed": [
188
| {
189
| "action": "string",
190
| "reason": {
191
| "effect": "allow",
192
| "resources": [
193
| "proj/*:env/*;qa_*:/flag/*"
194
| ],
195
| "notResources": [
196
| "string"
197
| ],
198
| "actions": [
199
| "*"
200
| ],
201
| "notActions": [
202
| "string"
203
| ],
204
| "role_name": "string"
205
| }
206
| }
207
| ]
208
| },
209
| "approvalSettings": {
210
| "required": true,
211
| "bypassApprovalsForPendingChanges": false,
212
| "minNumApprovals": 1,
213
| "canReviewOwnRequest": false,
214
| "canApplyDeclinedChanges": true,
215
| "serviceKind": "launchdarkly",
216
| "serviceConfig": {},
217
| "requiredApprovalTags": [
218
| "require-approval"
219
| ],
220
| "autoApplyApprovedChanges": true,
221
| "serviceKindConfigurationId": "1ef45a85-218f-4428-a8b2-a97e5f56c258",
222
| "resourceKind": "string"
223
| },
224
| "resourceApprovalSettings": {}
225
| }
226
| ],
227
| "_links": {},
228
| "totalCount": 2
229
| }
230
| },
231
| "environments": [
232
| {
233
| "_links": {
234
| "self": {
235
| "href": "/api/v2/projects/my-project/environments/my-environment",
236
| "type": "application/json"
237
| }
238
| },
239
| "_id": "57be1db38b75bf0772d11384",
240
| "key": "environment-key-123abc",
241
| "name": "My Environment",
242
| "apiKey": "sdk-xxx",
243
| "mobileKey": "mob-xxx",
244
| "color": "F5A623",
245
| "defaultTtl": 5,
246
| "secureMode": true,
247
| "defaultTrackEvents": false,
248
| "requireComments": true,
249
| "confirmChanges": true,
250
| "tags": [
251
| "ops"
252
| ],
253
| "critical": true,
254
| "_access": {
255
| "denied": [
256
| {
257
| "action": "string",
258
| "reason": {
259
| "effect": "allow",
260
| "resources": [
261
| "proj/*:env/*;qa_*:/flag/*"
262
| ],
263
| "notResources": [
264
| "string"
265
| ],
266
| "actions": [
267
| "*"
268
| ],
269
| "notActions": [
270
| "string"
271
| ],
272
| "role_name": "string"
273
| }
274
| }
275
| ],
276
| "allowed": [
277
| {
278
| "action": "string",
279
| "reason": {
280
| "effect": "allow",
281
| "resources": [
282
| "proj/*:env/*;qa_*:/flag/*"
283
| ],
284
| "notResources": [
285
| "string"
286
| ],
287
| "actions": [
288
| "*"
289
| ],
290
| "notActions": [
291
| "string"
292
| ],
293
| "role_name": "string"
294
| }
295
| }
296
| ]
297
| },
298
| "approvalSettings": {
299
| "required": true,
300
| "bypassApprovalsForPendingChanges": false,
301
| "minNumApprovals": 1,
302
| "canReviewOwnRequest": false,
303
| "canApplyDeclinedChanges": true,
304
| "serviceKind": "launchdarkly",
305
| "serviceConfig": {},
306
| "requiredApprovalTags": [
307
| "require-approval"
308
| ],
309
| "autoApplyApprovedChanges": true,
310
| "serviceKindConfigurationId": "1ef45a85-218f-4428-a8b2-a97e5f56c258",
311
| "resourceKind": "string"
312
| },
313
| "resourceApprovalSettings": {}
314
| }
315
| ],
316
| "flag": {
317
| "name": "My Flag",
318
| "kind": "boolean",
319
| "key": "flag-key-123abc",
320
| "_version": 1,
321
| "creationDate": 1,
322
| "variations": [
323
| {
324
| "value": null,
325
| "_id": "e432f62b-55f6-49dd-a02f-eb24acf39d05"
326
| },
327
| {
328
| "value": null,
329
| "_id": "a00bf58d-d252-476c-b915-15a74becacb4"
330
| }
331
| ],
332
| "temporary": true,
333
| "tags": [
334
| "example-tag"
335
| ],
336
| "_links": {
337
| "parent": {
338
| "href": "/api/v2/flags/my-project",
339
| "type": "application/json"
340
| },
341
| "self": {
342
| "href": "/api/v2/flags/my-project/my-flag",
343
| "type": "application/json"
344
| }
345
| },
346
| "customProperties": {},
347
| "archived": false,
348
| "description": "This flag controls the example widgets",
349
| "clientSideAvailability": {
350
| "usingMobileKey": true,
351
| "usingEnvironmentId": true
352
| },
353
| "maintainerId": "569f183514f4432160000007",
354
| "_maintainer": {
355
| "_links": {
356
| "self": {
357
| "href": "/api/v2/members/569f183514f4432160000007",
358
| "type": "application/json"
359
| }
360
| },
361
| "_id": "569f183514f4432160000007",
362
| "role": "admin",
363
| "email": "ariel@acme.com",
364
| "firstName": "Ariel",
365
| "lastName": "Flores"
366
| },
367
| "archivedDate": 1,
368
| "defaults": {
369
| "onVariation": 0,
370
| "offVariation": 1
371
| },
372
| "includeInSnippet": true
373
| },
374
| "resource": {
375
| "kind": "flag",
376
| "aiConfig": {
377
| "key": "aiconfig-key-123abc",
378
| "name": "AI Config 1"
379
| },
380
| "flag": {
381
| "name": "My Flag",
382
| "kind": "boolean",
383
| "key": "flag-key-123abc",
384
| "_version": 1,
385
| "creationDate": 1,
386
| "variations": [
387
| {
388
| "value": null,
389
| "_id": "e432f62b-55f6-49dd-a02f-eb24acf39d05"
390
| },
391
| {
392
| "value": null,
393
| "_id": "a00bf58d-d252-476c-b915-15a74becacb4"
394
| }
395
| ],
396
| "temporary": true,
397
| "tags": [
398
| "example-tag"
399
| ],
400
| "_links": {
401
| "parent": {
402
| "href": "/api/v2/flags/my-project",
403
| "type": "application/json"
404
| },
405
| "self": {
406
| "href": "/api/v2/flags/my-project/my-flag",
407
| "type": "application/json"
408
| }
409
| },
410
| "customProperties": {},
411
| "archived": false,
412
| "description": "This flag controls the example widgets",
413
| "clientSideAvailability": {
414
| "usingMobileKey": true,
415
| "usingEnvironmentId": true
416
| },
417
| "maintainerId": "569f183514f4432160000007",
418
| "_maintainer": {
419
| "_links": {
420
| "self": {
421
| "href": "/api/v2/members/569f183514f4432160000007",
422
| "type": "application/json"
423
| }
424
| },
425
| "_id": "569f183514f4432160000007",
426
| "role": "admin",
427
| "email": "ariel@acme.com",
428
| "firstName": "Ariel",
429
| "lastName": "Flores"
430
| },
431
| "archivedDate": 1,
432
| "defaults": {
433
| "onVariation": 0,
434
| "offVariation": 1
435
| },
436
| "includeInSnippet": true
437
| },
438
| "segment": {
439
| "name": "Example segment",
440
| "tags": [
441
| "testing"
442
| ],
443
| "creationDate": 1,
444
| "lastModifiedDate": 1,
445
| "key": "segment-key-123abc",
446
| "_links": {},
447
| "rules": [
448
| {
449
| "clauses": [
450
| {
451
| "attribute": "email",
452
| "op": "endsWith",
453
| "values": [
454
| ".edu"
455
| ],
456
| "negate": false,
457
| "_id": "12ab3c45de678910fab12345"
458
| }
459
| ],
460
| "_id": "1234a56b7c89d012345e678f"
461
| }
462
| ],
463
| "version": 1,
464
| "deleted": false,
465
| "generation": 1,
466
| "description": "Bundle our sample customers together",
467
| "included": [
468
| "user-key-123abc"
469
| ],
470
| "excluded": [
471
| "user-key-123abc"
472
| ],
473
| "includedContexts": [
474
| {
475
| "values": [
476
| "string"
477
| ],
478
| "contextKind": "string"
479
| }
480
| ],
481
| "excludedContexts": [
482
| {
483
| "values": [
484
| "string"
485
| ],
486
| "contextKind": "string"
487
| }
488
| ],
489
| "_access": {
490
| "denied": [
491
| {
492
| "action": "string",
493
| "reason": {
494
| "effect": "allow",
495
| "resources": [
496
| "proj/*:env/*;qa_*:/flag/*"
497
| ],
498
| "notResources": [
499
| "string"
500
| ],
501
| "actions": [
502
| "*"
503
| ],
504
| "notActions": [
505
| "string"
506
| ],
507
| "role_name": "string"
508
| }
509
| }
510
| ],
511
| "allowed": [
512
| {
513
| "action": "string",
514
| "reason": {
515
| "effect": "allow",
516
| "resources": [
517
| "proj/*:env/*;qa_*:/flag/*"
518
| ],
519
| "notResources": [
520
| "string"
521
| ],
522
| "actions": [
523
| "*"
524
| ],
525
| "notActions": [
526
| "string"
527
| ],
528
| "role_name": "string"
529
| }
530
| }
531
| ]
532
| },
533
| "_flags": [
534
| {
535
| "name": "Example flag",
536
| "key": "flag-key-123abc",
537
| "_links": {},
538
| "_site": {
539
| "href": "string",
540
| "type": "string"
541
| }
542
| }
543
| ],
544
| "unbounded": false,
545
| "unboundedContextKind": "string",
546
| "_unboundedMetadata": {
547
| "envId": "string",
548
| "segmentId": "string",
549
| "version": 1,
550
| "includedCount": 1,
551
| "excludedCount": 1,
552
| "lastModified": 1,
553
| "deleted": true
554
| },
555
| "_external": "amplitude",
556
| "_externalLink": "https://analytics.amplitude.com/org/1234/cohort/123abc",
557
| "_importInProgress": false
558
| }
559
| }
560
| }
```
Get an approval request by approval request ID. ### Expanding approval response LaunchDarkly supports the `expand` query param to include additional fields in the response, with the following fields: - `environments` includes the environments the approval request relates to - `flag` includes the flag the approval request belongs to - `project` includes the project the approval request belongs to - `resource` includes details on the resource (flag or segment) the approval request relates to For example, `expand=project,flag` includes the `project` and `flag` fields in the response. 
### Authentication
Authorizationstring
API Key authentication via header
### Path Parameters
idstringRequired`format: "string"`
The approval request ID
### Query Parameters
expandstringOptional`format: "string"`
A comma-separated list of fields to expand in the response. Supported fields are explained above.
### Response
Approval request response
_idstring
The ID of this approval request
_versioninteger
Version of the approval request
creationDatelong
Timestamp of when the approval request was created
serviceKindstring
The approval service for this request. May be LaunchDarkly or an external approval service, such as ServiceNow or JIRA.
reviewStatusenum
Current status of the review of this approval request
Allowed values:approveddeclinedpending
allReviewslist of objects
An array of individual reviews of this approval request
Show 6 properties
notifyMemberIdslist of strings
An array of member IDs. These members are notified to review the approval request.
statusenum
Current status of the approval request
Allowed values:pendingcompletedfailedscheduled
instructionslist of maps from strings to any
List of instructions in semantic patch format to be applied to the feature flag
conflictslist of objects
Details on any conflicting approval requests
Show 2 properties
_linksmap from strings to any
The location and content type of related resources
requestorIdstring or null
The ID of the member who requested the approval
descriptionstring or null
A human-friendly name for the approval request
appliedDatelong or null
Timestamp of when the approval request was applied
appliedByMemberIdstring or null
The member ID of the member who applied the approval request
appliedByServiceTokenIdstring or null
The service token ID of the service token which applied the approval request
executionDatelong or null
Timestamp for when instructions will be executed
operatingOnIdstring or null
ID of scheduled change to edit or delete
integrationMetadataobject or null
Details about the object in an external service corresponding to this approval request, such as a ServiceNow change request or a JIRA ticket, if an external approval service is being used
Show 4 properties
sourceobject or null
Details about the source feature flag, if copied
Show 2 properties
customWorkflowMetadataobject or null
Details about the custom workflow, if this approval request is part of a custom workflow
Show 2 properties
resourceIdstring or null
String representation of a resource
approvalSettingsobject or null
The settings for this approval
Show 11 properties
projectobject or null
Project the approval request belongs to
Show 10 properties
environmentslist of objects or null
List of environments the approval impacts
Show 17 properties
flagobject or null
Flag the approval request belongs to
Show 18 properties
resourceobject or null
Resource the approval request belongs to
Show 4 properties
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
Get an approval request by approval request ID.
### Expanding approval response
LaunchDarkly supports the `expand` query param to include additional fields in the response, with the following fields:
 * `environments` includes the environments the approval request relates to
 * `flag` includes the flag the approval request belongs to
 * `project` includes the project the approval request belongs to
 * `resource` includes details on the resource (flag or segment) the approval request relates to
For example, `expand=project,flag` includes the `project` and `flag` fields in the response.