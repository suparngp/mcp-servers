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
/api/v2/projects/:projectKey/ai-configs
cURL
```
1
| curl https://app.launchdarkly.com/api/v2/projects/default/ai-configs \
---|--- 
2
| -H "LD-API-Version: beta" \
3
| -H "Authorization: <apiKey>"
```
[](/docs/api/ai-configs-beta/get-ai-configs?explorer=true)
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
| "description": "description",
5
| "key": "key",
6
| "name": "name",
7
| "tags": [
8
| "tags",
9
| "tags"
10
| ],
11
| "version": 0,
12
| "variations": [
13
| {
14
| "key": "key",
15
| "_id": "_id",
16
| "model": "{}",
17
| "name": "name",
18
| "createdAt": 6,
19
| "version": 1,
20
| "_links": {
21
| "parent": {
22
| "href": "href",
23
| "type": "type"
24
| }
25
| },
26
| "color": "color",
27
| "comment": "comment",
28
| "description": "description",
29
| "instructions": "instructions",
30
| "messages": [
31
| {
32
| "content": "content",
33
| "role": "role"
34
| },
35
| {
36
| "content": "content",
37
| "role": "role"
38
| }
39
| ],
40
| "modelConfigKey": "modelConfigKey",
41
| "state": "state",
42
| "_archivedAt": 5,
43
| "_publishedAt": 5,
44
| "tools": [
45
| {
46
| "key": "key",
47
| "version": 2
48
| },
49
| {
50
| "key": "key",
51
| "version": 2
52
| }
53
| ],
54
| "judgeConfiguration": {
55
| "judges": [
56
| {
57
| "judgeConfigKey": "judgeConfigKey",
58
| "samplingRate": 0.7061401
59
| },
60
| {
61
| "judgeConfigKey": "judgeConfigKey",
62
| "samplingRate": 0.7061401
63
| }
64
| ]
65
| },
66
| "judgingConfigKeys": [
67
| "judgingConfigKeys",
68
| "judgingConfigKeys"
69
| ]
70
| },
71
| {
72
| "key": "key",
73
| "_id": "_id",
74
| "model": "{}",
75
| "name": "name",
76
| "createdAt": 6,
77
| "version": 1,
78
| "_links": {
79
| "parent": {
80
| "href": "href",
81
| "type": "type"
82
| }
83
| },
84
| "color": "color",
85
| "comment": "comment",
86
| "description": "description",
87
| "instructions": "instructions",
88
| "messages": [
89
| {
90
| "content": "content",
91
| "role": "role"
92
| },
93
| {
94
| "content": "content",
95
| "role": "role"
96
| }
97
| ],
98
| "modelConfigKey": "modelConfigKey",
99
| "state": "state",
100
| "_archivedAt": 5,
101
| "_publishedAt": 5,
102
| "tools": [
103
| {
104
| "key": "key",
105
| "version": 2
106
| },
107
| {
108
| "key": "key",
109
| "version": 2
110
| }
111
| ],
112
| "judgeConfiguration": {
113
| "judges": [
114
| {
115
| "judgeConfigKey": "judgeConfigKey",
116
| "samplingRate": 0.7061401
117
| },
118
| {
119
| "judgeConfigKey": "judgeConfigKey",
120
| "samplingRate": 0.7061401
121
| }
122
| ]
123
| },
124
| "judgingConfigKeys": [
125
| "judgingConfigKeys",
126
| "judgingConfigKeys"
127
| ]
128
| }
129
| ],
130
| "createdAt": 9,
131
| "updatedAt": 3,
132
| "_access": {
133
| "denied": [
134
| {
135
| "action": "action",
136
| "reason": {
137
| "effect": "allow",
138
| "resources": [
139
| "proj/*:env/*;qa_*:/flag/*"
140
| ],
141
| "notResources": [
142
| "notResources",
143
| "notResources"
144
| ],
145
| "actions": [
146
| "*"
147
| ],
148
| "notActions": [
149
| "string",
150
| "string"
151
| ],
152
| "role_name": "role_name"
153
| }
154
| },
155
| {
156
| "action": "action",
157
| "reason": {
158
| "effect": "allow",
159
| "resources": [
160
| "proj/*:env/*;qa_*:/flag/*"
161
| ],
162
| "notResources": [
163
| "notResources",
164
| "notResources"
165
| ],
166
| "actions": [
167
| "*"
168
| ],
169
| "notActions": [
170
| "string",
171
| "string"
172
| ],
173
| "role_name": "role_name"
174
| }
175
| }
176
| ],
177
| "allowed": [
178
| {
179
| "action": "action",
180
| "reason": {
181
| "effect": "allow",
182
| "resources": [
183
| "proj/*:env/*;qa_*:/flag/*"
184
| ],
185
| "notResources": [
186
| "notResources",
187
| "notResources"
188
| ],
189
| "actions": [
190
| "*"
191
| ],
192
| "notActions": [
193
| "string",
194
| "string"
195
| ],
196
| "role_name": "role_name"
197
| }
198
| },
199
| {
200
| "action": "action",
201
| "reason": {
202
| "effect": "allow",
203
| "resources": [
204
| "proj/*:env/*;qa_*:/flag/*"
205
| ],
206
| "notResources": [
207
| "notResources",
208
| "notResources"
209
| ],
210
| "actions": [
211
| "*"
212
| ],
213
| "notActions": [
214
| "string",
215
| "string"
216
| ],
217
| "role_name": "role_name"
218
| }
219
| }
220
| ]
221
| },
222
| "_links": {
223
| "self": {
224
| "href": "href",
225
| "type": "type"
226
| },
227
| "parent": {
228
| "href": "href",
229
| "type": "type"
230
| }
231
| },
232
| "_maintainer": {
233
| "_id": "string",
234
| "email": "string",
235
| "role": "string",
236
| "kind": "kind"
237
| },
238
| "mode": "completion",
239
| "evaluationMetricKeys": [
240
| "evaluationMetricKeys",
241
| "evaluationMetricKeys"
242
| ]
243
| },
244
| {
245
| "description": "description",
246
| "key": "key",
247
| "name": "name",
248
| "tags": [
249
| "tags",
250
| "tags"
251
| ],
252
| "version": 0,
253
| "variations": [
254
| {
255
| "key": "key",
256
| "_id": "_id",
257
| "model": "{}",
258
| "name": "name",
259
| "createdAt": 6,
260
| "version": 1,
261
| "_links": {
262
| "parent": {
263
| "href": "href",
264
| "type": "type"
265
| }
266
| },
267
| "color": "color",
268
| "comment": "comment",
269
| "description": "description",
270
| "instructions": "instructions",
271
| "messages": [
272
| {
273
| "content": "content",
274
| "role": "role"
275
| },
276
| {
277
| "content": "content",
278
| "role": "role"
279
| }
280
| ],
281
| "modelConfigKey": "modelConfigKey",
282
| "state": "state",
283
| "_archivedAt": 5,
284
| "_publishedAt": 5,
285
| "tools": [
286
| {
287
| "key": "key",
288
| "version": 2
289
| },
290
| {
291
| "key": "key",
292
| "version": 2
293
| }
294
| ],
295
| "judgeConfiguration": {
296
| "judges": [
297
| {
298
| "judgeConfigKey": "judgeConfigKey",
299
| "samplingRate": 0.7061401
300
| },
301
| {
302
| "judgeConfigKey": "judgeConfigKey",
303
| "samplingRate": 0.7061401
304
| }
305
| ]
306
| },
307
| "judgingConfigKeys": [
308
| "judgingConfigKeys",
309
| "judgingConfigKeys"
310
| ]
311
| },
312
| {
313
| "key": "key",
314
| "_id": "_id",
315
| "model": "{}",
316
| "name": "name",
317
| "createdAt": 6,
318
| "version": 1,
319
| "_links": {
320
| "parent": {
321
| "href": "href",
322
| "type": "type"
323
| }
324
| },
325
| "color": "color",
326
| "comment": "comment",
327
| "description": "description",
328
| "instructions": "instructions",
329
| "messages": [
330
| {
331
| "content": "content",
332
| "role": "role"
333
| },
334
| {
335
| "content": "content",
336
| "role": "role"
337
| }
338
| ],
339
| "modelConfigKey": "modelConfigKey",
340
| "state": "state",
341
| "_archivedAt": 5,
342
| "_publishedAt": 5,
343
| "tools": [
344
| {
345
| "key": "key",
346
| "version": 2
347
| },
348
| {
349
| "key": "key",
350
| "version": 2
351
| }
352
| ],
353
| "judgeConfiguration": {
354
| "judges": [
355
| {
356
| "judgeConfigKey": "judgeConfigKey",
357
| "samplingRate": 0.7061401
358
| },
359
| {
360
| "judgeConfigKey": "judgeConfigKey",
361
| "samplingRate": 0.7061401
362
| }
363
| ]
364
| },
365
| "judgingConfigKeys": [
366
| "judgingConfigKeys",
367
| "judgingConfigKeys"
368
| ]
369
| }
370
| ],
371
| "createdAt": 9,
372
| "updatedAt": 3,
373
| "_access": {
374
| "denied": [
375
| {
376
| "action": "action",
377
| "reason": {
378
| "effect": "allow",
379
| "resources": [
380
| "proj/*:env/*;qa_*:/flag/*"
381
| ],
382
| "notResources": [
383
| "notResources",
384
| "notResources"
385
| ],
386
| "actions": [
387
| "*"
388
| ],
389
| "notActions": [
390
| "string",
391
| "string"
392
| ],
393
| "role_name": "role_name"
394
| }
395
| },
396
| {
397
| "action": "action",
398
| "reason": {
399
| "effect": "allow",
400
| "resources": [
401
| "proj/*:env/*;qa_*:/flag/*"
402
| ],
403
| "notResources": [
404
| "notResources",
405
| "notResources"
406
| ],
407
| "actions": [
408
| "*"
409
| ],
410
| "notActions": [
411
| "string",
412
| "string"
413
| ],
414
| "role_name": "role_name"
415
| }
416
| }
417
| ],
418
| "allowed": [
419
| {
420
| "action": "action",
421
| "reason": {
422
| "effect": "allow",
423
| "resources": [
424
| "proj/*:env/*;qa_*:/flag/*"
425
| ],
426
| "notResources": [
427
| "notResources",
428
| "notResources"
429
| ],
430
| "actions": [
431
| "*"
432
| ],
433
| "notActions": [
434
| "string",
435
| "string"
436
| ],
437
| "role_name": "role_name"
438
| }
439
| },
440
| {
441
| "action": "action",
442
| "reason": {
443
| "effect": "allow",
444
| "resources": [
445
| "proj/*:env/*;qa_*:/flag/*"
446
| ],
447
| "notResources": [
448
| "notResources",
449
| "notResources"
450
| ],
451
| "actions": [
452
| "*"
453
| ],
454
| "notActions": [
455
| "string",
456
| "string"
457
| ],
458
| "role_name": "role_name"
459
| }
460
| }
461
| ]
462
| },
463
| "_links": {
464
| "self": {
465
| "href": "href",
466
| "type": "type"
467
| },
468
| "parent": {
469
| "href": "href",
470
| "type": "type"
471
| }
472
| },
473
| "_maintainer": {
474
| "_id": "string",
475
| "email": "string",
476
| "role": "string",
477
| "kind": "kind"
478
| },
479
| "mode": "completion",
480
| "evaluationMetricKeys": [
481
| "evaluationMetricKeys",
482
| "evaluationMetricKeys"
483
| ]
484
| }
485
| ],
486
| "totalCount": 2,
487
| "_links": {
488
| "self": {
489
| "href": "href",
490
| "type": "type"
491
| },
492
| "first": {
493
| "href": "href",
494
| "type": "type"
495
| },
496
| "last": {
497
| "href": "href",
498
| "type": "type"
499
| },
500
| "next": {
501
| "href": "href",
502
| "type": "type"
503
| },
504
| "prev": {
505
| "href": "href",
506
| "type": "type"
507
| }
508
| }
509
| }
```
Get a list of all AI Configs in the given project.
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
sortstringOptional
A sort to apply to the list of AI Configs.
limitintegerOptional
The number of AI Configs to return.
offsetintegerOptional
Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.
filterstringOptional
A filter to apply to the list of AI Configs.
### Response
Successful response
itemslist of objects
Show 13 properties
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