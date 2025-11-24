[ Skip to content ](#pydantic_evalsreporting)
# `pydantic_evals.reporting`
### ReportCase `dataclass`
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[InputsT, OutputT, MetadataT]`
A single case in an evaluation report.
Source code in `pydantic_evals/pydantic_evals/reporting/__init__.py`
```
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
```
| ```
@dataclass(kw_only=True)
classReportCase(Generic[InputsT, OutputT, MetadataT]):
"""A single case in an evaluation report."""
 name: str
"""The name of the [case][pydantic_evals.Case]."""
 inputs: InputsT
"""The inputs to the task, from [`Case.inputs`][pydantic_evals.Case.inputs]."""
 metadata: MetadataT | None
"""Any metadata associated with the case, from [`Case.metadata`][pydantic_evals.Case.metadata]."""
 expected_output: OutputT | None
"""The expected output of the task, from [`Case.expected_output`][pydantic_evals.Case.expected_output]."""
 output: OutputT
"""The output of the task execution."""
 metrics: dict[str, float | int]
 attributes: dict[str, Any]
 scores: dict[str, EvaluationResult[int | float]]
 labels: dict[str, EvaluationResult[str]]
 assertions: dict[str, EvaluationResult[bool]]
 task_duration: float
 total_duration: float # includes evaluator execution time
 trace_id: str | None = None
"""The trace ID of the case span."""
 span_id: str | None = None
"""The span ID of the case span."""
 evaluator_failures: list[EvaluatorFailure] = field(default_factory=list)
```
---|--- 
#### name `instance-attribute`
```
name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The name of the [case](../dataset/#pydantic_evals.dataset.Case).
#### inputs `instance-attribute`
```
inputs: InputsT
```
The inputs to the task, from [`Case.inputs`](../dataset/#pydantic_evals.dataset.Case.inputs).
#### metadata `instance-attribute`
```
metadata: MetadataT | None
```
Any metadata associated with the case, from [`Case.metadata`](../dataset/#pydantic_evals.dataset.Case.metadata).
#### expected_output `instance-attribute`
```
expected_output: OutputT | None
```
The expected output of the task, from [`Case.expected_output`](../dataset/#pydantic_evals.dataset.Case.expected_output).
#### output `instance-attribute`
```
output: OutputT
```
The output of the task execution.
#### trace_id `class-attribute` `instance-attribute`
```
trace_id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The trace ID of the case span.
#### span_id `class-attribute` `instance-attribute`
```
span_id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The span ID of the case span.
### ReportCaseFailure `dataclass`
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[InputsT, OutputT, MetadataT]`
A single case in an evaluation report that failed due to an error during task execution.
Source code in `pydantic_evals/pydantic_evals/reporting/__init__.py`
```
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
```
| ```
@dataclass(kw_only=True)
classReportCaseFailure(Generic[InputsT, OutputT, MetadataT]):
"""A single case in an evaluation report that failed due to an error during task execution."""
 name: str
"""The name of the [case][pydantic_evals.Case]."""
 inputs: InputsT
"""The inputs to the task, from [`Case.inputs`][pydantic_evals.Case.inputs]."""
 metadata: MetadataT | None
"""Any metadata associated with the case, from [`Case.metadata`][pydantic_evals.Case.metadata]."""
 expected_output: OutputT | None
"""The expected output of the task, from [`Case.expected_output`][pydantic_evals.Case.expected_output]."""
 error_message: str
"""The message of the exception that caused the failure."""
 error_stacktrace: str
"""The stacktrace of the exception that caused the failure."""
 trace_id: str | None = None
"""The trace ID of the case span."""
 span_id: str | None = None
"""The span ID of the case span."""
```
---|--- 
#### name `instance-attribute`
```
name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The name of the [case](../dataset/#pydantic_evals.dataset.Case).
#### inputs `instance-attribute`
```
inputs: InputsT
```
The inputs to the task, from [`Case.inputs`](../dataset/#pydantic_evals.dataset.Case.inputs).
#### metadata `instance-attribute`
```
metadata: MetadataT | None
```
Any metadata associated with the case, from [`Case.metadata`](../dataset/#pydantic_evals.dataset.Case.metadata).
#### expected_output `instance-attribute`
```
expected_output: OutputT | None
```
The expected output of the task, from [`Case.expected_output`](../dataset/#pydantic_evals.dataset.Case.expected_output).
#### error_message `instance-attribute`
```
error_message: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The message of the exception that caused the failure.
#### error_stacktrace `instance-attribute`
```
error_stacktrace: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The stacktrace of the exception that caused the failure.
#### trace_id `class-attribute` `instance-attribute`
```
trace_id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The trace ID of the case span.
#### span_id `class-attribute` `instance-attribute`
```
span_id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The span ID of the case span.
### ReportCaseAggregate
Bases: `BaseModel[](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel "pydantic.BaseModel")`
A synthetic case that summarizes a set of cases.
Source code in `pydantic_evals/pydantic_evals/reporting/__init__.py`
```
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
```
| ```
classReportCaseAggregate(BaseModel):
"""A synthetic case that summarizes a set of cases."""
 name: str
 scores: dict[str, float | int]
 labels: dict[str, dict[str, float]]
 metrics: dict[str, float | int]
 assertions: float | None
 task_duration: float
 total_duration: float
 @staticmethod
 defaverage(cases: list[ReportCase]) -> ReportCaseAggregate:
"""Produce a synthetic "summary" case by averaging quantitative attributes."""
 num_cases = len(cases)
 if num_cases == 0:
 return ReportCaseAggregate(
 name='Averages',
 scores={},
 labels={},
 metrics={},
 assertions=None,
 task_duration=0.0,
 total_duration=0.0,
 )
 def_scores_averages(scores_by_name: list[dict[str, int | float | bool]]) -> dict[str, float]:
 counts_by_name: dict[str, int] = defaultdict(int)
 sums_by_name: dict[str, float] = defaultdict(float)
 for sbn in scores_by_name:
 for name, score in sbn.items():
 counts_by_name[name] += 1
 sums_by_name[name] += score
 return {name: sums_by_name[name] / counts_by_name[name] for name in sums_by_name}
 def_labels_averages(labels_by_name: list[dict[str, str]]) -> dict[str, dict[str, float]]:
 counts_by_name: dict[str, int] = defaultdict(int)
 sums_by_name: dict[str, dict[str, float]] = defaultdict(lambda: defaultdict(float))
 for lbn in labels_by_name:
 for name, label in lbn.items():
 counts_by_name[name] += 1
 sums_by_name[name][label] += 1
 return {
 name: {value: count / counts_by_name[name] for value, count in sums_by_name[name].items()}
 for name in sums_by_name
 }
 average_task_duration = sum(case.task_duration for case in cases) / num_cases
 average_total_duration = sum(case.total_duration for case in cases) / num_cases
 # average_assertions: dict[str, float] = _scores_averages([{k: v.value for k, v in case.scores.items()} for case in cases])
 average_scores: dict[str, float] = _scores_averages(
 [{k: v.value for k, v in case.scores.items()} for case in cases]
 )
 average_labels: dict[str, dict[str, float]] = _labels_averages(
 [{k: v.value for k, v in case.labels.items()} for case in cases]
 )
 average_metrics: dict[str, float] = _scores_averages([case.metrics for case in cases])
 average_assertions: float | None = None
 n_assertions = sum(len(case.assertions) for case in cases)
 if n_assertions > 0:
 n_passing = sum(1 for case in cases for assertion in case.assertions.values() if assertion.value)
 average_assertions = n_passing / n_assertions
 return ReportCaseAggregate(
 name='Averages',
 scores=average_scores,
 labels=average_labels,
 metrics=average_metrics,
 assertions=average_assertions,
 task_duration=average_task_duration,
 total_duration=average_total_duration,
 )
```
---|--- 
#### average `staticmethod`
```
average(cases: list[](https://docs.python.org/3/library/stdtypes.html#list)[ReportCase[](#pydantic_evals.reporting.ReportCase "pydantic_evals.reporting.ReportCase")]) -> ReportCaseAggregate[](#pydantic_evals.reporting.ReportCaseAggregate "pydantic_evals.reporting.ReportCaseAggregate")
```
Produce a synthetic "summary" case by averaging quantitative attributes.
Source code in `pydantic_evals/pydantic_evals/reporting/__init__.py`
```
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
```
| ```
@staticmethod
defaverage(cases: list[ReportCase]) -> ReportCaseAggregate:
"""Produce a synthetic "summary" case by averaging quantitative attributes."""
 num_cases = len(cases)
 if num_cases == 0:
 return ReportCaseAggregate(
 name='Averages',
 scores={},
 labels={},
 metrics={},
 assertions=None,
 task_duration=0.0,
 total_duration=0.0,
 )
 def_scores_averages(scores_by_name: list[dict[str, int | float | bool]]) -> dict[str, float]:
 counts_by_name: dict[str, int] = defaultdict(int)
 sums_by_name: dict[str, float] = defaultdict(float)
 for sbn in scores_by_name:
 for name, score in sbn.items():
 counts_by_name[name] += 1
 sums_by_name[name] += score
 return {name: sums_by_name[name] / counts_by_name[name] for name in sums_by_name}
 def_labels_averages(labels_by_name: list[dict[str, str]]) -> dict[str, dict[str, float]]:
 counts_by_name: dict[str, int] = defaultdict(int)
 sums_by_name: dict[str, dict[str, float]] = defaultdict(lambda: defaultdict(float))
 for lbn in labels_by_name:
 for name, label in lbn.items():
 counts_by_name[name] += 1
 sums_by_name[name][label] += 1
 return {
 name: {value: count / counts_by_name[name] for value, count in sums_by_name[name].items()}
 for name in sums_by_name
 }
 average_task_duration = sum(case.task_duration for case in cases) / num_cases
 average_total_duration = sum(case.total_duration for case in cases) / num_cases
 # average_assertions: dict[str, float] = _scores_averages([{k: v.value for k, v in case.scores.items()} for case in cases])
 average_scores: dict[str, float] = _scores_averages(
 [{k: v.value for k, v in case.scores.items()} for case in cases]
 )
 average_labels: dict[str, dict[str, float]] = _labels_averages(
 [{k: v.value for k, v in case.labels.items()} for case in cases]
 )
 average_metrics: dict[str, float] = _scores_averages([case.metrics for case in cases])
 average_assertions: float | None = None
 n_assertions = sum(len(case.assertions) for case in cases)
 if n_assertions > 0:
 n_passing = sum(1 for case in cases for assertion in case.assertions.values() if assertion.value)
 average_assertions = n_passing / n_assertions
 return ReportCaseAggregate(
 name='Averages',
 scores=average_scores,
 labels=average_labels,
 metrics=average_metrics,
 assertions=average_assertions,
 task_duration=average_task_duration,
 total_duration=average_total_duration,
 )
```
---|--- 
### EvaluationReport `dataclass`
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[InputsT, OutputT, MetadataT]`
A report of the results of evaluating a model on a set of cases.
Source code in `pydantic_evals/pydantic_evals/reporting/__init__.py`
```
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
364
365
366
367
368
369
370
371
372
373
374
375
376
377
378
379
380
381
382
383
384
385
386
387
388
389
390
391
392
393
394
395
396
397
398
399
400
401
402
403
404
405
406
407
408
409
410
411
412
413
414
415
416
417
418
419
420
421
422
423
424
425
426
427
428
429
430
431
432
433
434
435
436
437
438
439
440
441
442
443
444
445
446
447
448
449
450
451
452
453
454
455
456
457
458
459
460
461
462
463
464
465
466
467
468
469
470
471
472
473
474
475
476
477
478
479
480
481
482
483
484
485
486
487
488
489
490
491
492
493
494
495
496
497
498
499
500
501
502
503
504
505
```
| ```
@dataclass(kw_only=True)
classEvaluationReport(Generic[InputsT, OutputT, MetadataT]):
"""A report of the results of evaluating a model on a set of cases."""
 name: str
"""The name of the report."""
 cases: list[ReportCase[InputsT, OutputT, MetadataT]]
"""The cases in the report."""
 failures: list[ReportCaseFailure[InputsT, OutputT, MetadataT]] = field(default_factory=list)
"""The failures in the report. These are cases where task execution raised an exception."""
 experiment_metadata: dict[str, Any] | None = None
"""Metadata associated with the specific experiment represented by this report."""
 trace_id: str | None = None
"""The trace ID of the evaluation."""
 span_id: str | None = None
"""The span ID of the evaluation."""
 defaverages(self) -> ReportCaseAggregate | None:
 if self.cases:
 return ReportCaseAggregate.average(self.cases)
 return None
 defrender(
 self,
 width: int | None = None,
 baseline: EvaluationReport[InputsT, OutputT, MetadataT] | None = None,
 *,
 include_input: bool = False,
 include_metadata: bool = False,
 include_expected_output: bool = False,
 include_output: bool = False,
 include_durations: bool = True,
 include_total_duration: bool = False,
 include_removed_cases: bool = False,
 include_averages: bool = True,
 include_errors: bool = True,
 include_error_stacktrace: bool = False,
 include_evaluator_failures: bool = True,
 input_config: RenderValueConfig | None = None,
 metadata_config: RenderValueConfig | None = None,
 output_config: RenderValueConfig | None = None,
 score_configs: dict[str, RenderNumberConfig] | None = None,
 label_configs: dict[str, RenderValueConfig] | None = None,
 metric_configs: dict[str, RenderNumberConfig] | None = None,
 duration_config: RenderNumberConfig | None = None,
 include_reasons: bool = False,
 ) -> str:
"""Render this report to a nicely-formatted string, optionally comparing it to a baseline report.
 If you want more control over the output, use `console_table` instead and pass it to `rich.Console.print`.
 """
 io_file = StringIO()
 console = Console(width=width, file=io_file)
 self.print(
 width=width,
 baseline=baseline,
 console=console,
 include_input=include_input,
 include_metadata=include_metadata,
 include_expected_output=include_expected_output,
 include_output=include_output,
 include_durations=include_durations,
 include_total_duration=include_total_duration,
 include_removed_cases=include_removed_cases,
 include_averages=include_averages,
 include_errors=include_errors,
 include_error_stacktrace=include_error_stacktrace,
 include_evaluator_failures=include_evaluator_failures,
 input_config=input_config,
 metadata_config=metadata_config,
 output_config=output_config,
 score_configs=score_configs,
 label_configs=label_configs,
 metric_configs=metric_configs,
 duration_config=duration_config,
 include_reasons=include_reasons,
 )
 return io_file.getvalue()
 defprint(
 self,
 width: int | None = None,
 baseline: EvaluationReport[InputsT, OutputT, MetadataT] | None = None,
 *,
 console: Console | None = None,
 include_input: bool = False,
 include_metadata: bool = False,
 include_expected_output: bool = False,
 include_output: bool = False,
 include_durations: bool = True,
 include_total_duration: bool = False,
 include_removed_cases: bool = False,
 include_averages: bool = True,
 include_errors: bool = True,
 include_error_stacktrace: bool = False,
 include_evaluator_failures: bool = True,
 input_config: RenderValueConfig | None = None,
 metadata_config: RenderValueConfig | None = None,
 output_config: RenderValueConfig | None = None,
 score_configs: dict[str, RenderNumberConfig] | None = None,
 label_configs: dict[str, RenderValueConfig] | None = None,
 metric_configs: dict[str, RenderNumberConfig] | None = None,
 duration_config: RenderNumberConfig | None = None,
 include_reasons: bool = False,
 ) -> None:
"""Print this report to the console, optionally comparing it to a baseline report.
 If you want more control over the output, use `console_table` instead and pass it to `rich.Console.print`.
 """
 if console is None: # pragma: no branch
 console = Console(width=width)
 metadata_panel = self._metadata_panel(baseline=baseline)
 renderable: RenderableType = self.console_table(
 baseline=baseline,
 include_input=include_input,
 include_metadata=include_metadata,
 include_expected_output=include_expected_output,
 include_output=include_output,
 include_durations=include_durations,
 include_total_duration=include_total_duration,
 include_removed_cases=include_removed_cases,
 include_averages=include_averages,
 include_evaluator_failures=include_evaluator_failures,
 input_config=input_config,
 metadata_config=metadata_config,
 output_config=output_config,
 score_configs=score_configs,
 label_configs=label_configs,
 metric_configs=metric_configs,
 duration_config=duration_config,
 include_reasons=include_reasons,
 with_title=not metadata_panel,
 )
 # Wrap table with experiment metadata panel if present
 if metadata_panel:
 renderable = Group(metadata_panel, renderable)
 console.print(renderable)
 if include_errors and self.failures: # pragma: no cover
 failures_table = self.failures_table(
 include_input=include_input,
 include_metadata=include_metadata,
 include_expected_output=include_expected_output,
 include_error_message=True,
 include_error_stacktrace=include_error_stacktrace,
 input_config=input_config,
 metadata_config=metadata_config,
 )
 console.print(failures_table, style='red')
 # TODO(DavidM): in v2, change the return type here to RenderableType
 defconsole_table(
 self,
 baseline: EvaluationReport[InputsT, OutputT, MetadataT] | None = None,
 *,
 include_input: bool = False,
 include_metadata: bool = False,
 include_expected_output: bool = False,
 include_output: bool = False,
 include_durations: bool = True,
 include_total_duration: bool = False,
 include_removed_cases: bool = False,
 include_averages: bool = True,
 include_evaluator_failures: bool = True,
 input_config: RenderValueConfig | None = None,
 metadata_config: RenderValueConfig | None = None,
 output_config: RenderValueConfig | None = None,
 score_configs: dict[str, RenderNumberConfig] | None = None,
 label_configs: dict[str, RenderValueConfig] | None = None,
 metric_configs: dict[str, RenderNumberConfig] | None = None,
 duration_config: RenderNumberConfig | None = None,
 include_reasons: bool = False,
 with_title: bool = True,
 ) -> Table:
"""Return a table containing the data from this report.
 If a baseline is provided, returns a diff between this report and the baseline report.
 Optionally include input and output details.
 """
 renderer = EvaluationRenderer(
 include_input=include_input,
 include_metadata=include_metadata,
 include_expected_output=include_expected_output,
 include_output=include_output,
 include_durations=include_durations,
 include_total_duration=include_total_duration,
 include_removed_cases=include_removed_cases,
 include_averages=include_averages,
 include_error_message=False,
 include_error_stacktrace=False,
 include_evaluator_failures=include_evaluator_failures,
 input_config={**_DEFAULT_VALUE_CONFIG, **(input_config or {})},
 metadata_config={**_DEFAULT_VALUE_CONFIG, **(metadata_config or {})},
 output_config=output_config or _DEFAULT_VALUE_CONFIG,
 score_configs=score_configs or {},
 label_configs=label_configs or {},
 metric_configs=metric_configs or {},
 duration_config=duration_config or _DEFAULT_DURATION_CONFIG,
 include_reasons=include_reasons,
 )
 if baseline is None:
 return renderer.build_table(self, with_title=with_title)
 else:
 return renderer.build_diff_table(self, baseline, with_title=with_title)
 def_metadata_panel(
 self, baseline: EvaluationReport[InputsT, OutputT, MetadataT] | None = None
 ) -> RenderableType | None:
"""Wrap a table with an experiment metadata panel if metadata exists.
 Args:
 table: The table to wrap
 baseline: Optional baseline report for diff metadata
 Returns:
 Either the table unchanged or a Group with Panel and Table
 """
 if baseline is None:
 # Single report - show metadata if present
 if self.experiment_metadata:
 metadata_text = Text()
 items = list(self.experiment_metadata.items())
 for i, (key, value) in enumerate(items):
 metadata_text.append(f'{key}: {value}', style='dim')
 if i < len(items) - 1:
 metadata_text.append('\n')
 return Panel(
 metadata_text,
 title=f'Evaluation Summary: {self.name}',
 title_align='left',
 border_style='dim',
 padding=(0, 1),
 expand=False,
 )
 else:
 # Diff report - show metadata diff if either has metadata
 if self.experiment_metadata or baseline.experiment_metadata:
 diff_name = baseline.name if baseline.name == self.name else f'{baseline.name} → {self.name}'
 metadata_text = Text()
 lines_styles: list[tuple[str, str]] = []
 if baseline.experiment_metadata and self.experiment_metadata:
 # Collect all keys from both
 all_keys = sorted(set(baseline.experiment_metadata.keys()) | set(self.experiment_metadata.keys()))
 for key in all_keys:
 baseline_val = baseline.experiment_metadata.get(key)
 report_val = self.experiment_metadata.get(key)
 if baseline_val == report_val:
 lines_styles.append((f'{key}: {report_val}', 'dim'))
 elif baseline_val is None:
 lines_styles.append((f'+ {key}: {report_val}', 'green'))
 elif report_val is None:
 lines_styles.append((f'- {key}: {baseline_val}', 'red'))
 else:
 lines_styles.append((f'{key}: {baseline_val} → {report_val}', 'yellow'))
 elif self.experiment_metadata:
 lines_styles = [(f'+ {k}: {v}', 'green') for k, v in self.experiment_metadata.items()]
 else: # baseline.experiment_metadata only
 assert baseline.experiment_metadata is not None
 lines_styles = [(f'- {k}: {v}', 'red') for k, v in baseline.experiment_metadata.items()]
 for i, (line, style) in enumerate(lines_styles):
 metadata_text.append(line, style=style)
 if i < len(lines_styles) - 1:
 metadata_text.append('\n')
 return Panel(
 metadata_text,
 title=f'Evaluation Diff: {diff_name}',
 title_align='left',
 border_style='dim',
 padding=(0, 1),
 expand=False,
 )
 return None
 # TODO(DavidM): in v2, change the return type here to RenderableType
 deffailures_table(
 self,
 *,
 include_input: bool = False,
 include_metadata: bool = False,
 include_expected_output: bool = False,
 include_error_message: bool = True,
 include_error_stacktrace: bool = True,
 input_config: RenderValueConfig | None = None,
 metadata_config: RenderValueConfig | None = None,
 ) -> Table:
"""Return a table containing the failures in this report."""
 renderer = EvaluationRenderer(
 include_input=include_input,
 include_metadata=include_metadata,
 include_expected_output=include_expected_output,
 include_output=False,
 include_durations=False,
 include_total_duration=False,
 include_removed_cases=False,
 include_averages=False,
 input_config={**_DEFAULT_VALUE_CONFIG, **(input_config or {})},
 metadata_config={**_DEFAULT_VALUE_CONFIG, **(metadata_config or {})},
 output_config=_DEFAULT_VALUE_CONFIG,
 score_configs={},
 label_configs={},
 metric_configs={},
 duration_config=_DEFAULT_DURATION_CONFIG,
 include_reasons=False,
 include_error_message=include_error_message,
 include_error_stacktrace=include_error_stacktrace,
 include_evaluator_failures=False, # Not applicable for failures table
 )
 return renderer.build_failures_table(self)
 def__str__(self) -> str: # pragma: lax no cover
"""Return a string representation of the report."""
 return self.render()
```
---|--- 
#### name `instance-attribute`
```
name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The name of the report.
#### cases `instance-attribute`
```
cases: list[](https://docs.python.org/3/library/stdtypes.html#list)[ReportCase[](#pydantic_evals.reporting.ReportCase "pydantic_evals.reporting.ReportCase")[InputsT, OutputT, MetadataT]]
```
The cases in the report.
#### failures `class-attribute` `instance-attribute`
```
failures: list[](https://docs.python.org/3/library/stdtypes.html#list)[
 ReportCaseFailure[](#pydantic_evals.reporting.ReportCaseFailure "pydantic_evals.reporting.ReportCaseFailure")[InputsT, OutputT, MetadataT]
] = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(default_factory=list[](https://docs.python.org/3/library/stdtypes.html#list))
```
The failures in the report. These are cases where task execution raised an exception.
#### experiment_metadata `class-attribute` `instance-attribute`
```
experiment_metadata: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = None
```
Metadata associated with the specific experiment represented by this report.
#### trace_id `class-attribute` `instance-attribute`
```
trace_id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The trace ID of the evaluation.
#### span_id `class-attribute` `instance-attribute`
```
span_id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The span ID of the evaluation.
#### render
```
render(
 width: int[](https://docs.python.org/3/library/functions.html#int) | None = None,
 baseline: (
 EvaluationReport[](#pydantic_evals.reporting.EvaluationReport "pydantic_evals.reporting.EvaluationReport")[InputsT, OutputT, MetadataT] | None
 ) = None,
 *,
 include_input: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_metadata: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_expected_output: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_output: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_durations: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 include_total_duration: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_removed_cases: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_averages: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 include_errors: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 include_error_stacktrace: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_evaluator_failures: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 input_config: RenderValueConfig[](#pydantic_evals.reporting.RenderValueConfig "pydantic_evals.reporting.RenderValueConfig") | None = None,
 metadata_config: RenderValueConfig[](#pydantic_evals.reporting.RenderValueConfig "pydantic_evals.reporting.RenderValueConfig") | None = None,
 output_config: RenderValueConfig[](#pydantic_evals.reporting.RenderValueConfig "pydantic_evals.reporting.RenderValueConfig") | None = None,
 score_configs: (
 dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), RenderNumberConfig[](#pydantic_evals.reporting.RenderNumberConfig "pydantic_evals.reporting.RenderNumberConfig")] | None
 ) = None,
 label_configs: (
 dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), RenderValueConfig[](#pydantic_evals.reporting.RenderValueConfig "pydantic_evals.reporting.RenderValueConfig")] | None
 ) = None,
 metric_configs: (
 dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), RenderNumberConfig[](#pydantic_evals.reporting.RenderNumberConfig "pydantic_evals.reporting.RenderNumberConfig")] | None
 ) = None,
 duration_config: RenderNumberConfig[](#pydantic_evals.reporting.RenderNumberConfig "pydantic_evals.reporting.RenderNumberConfig") | None = None,
 include_reasons: bool[](https://docs.python.org/3/library/functions.html#bool) = False
) -> str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Render this report to a nicely-formatted string, optionally comparing it to a baseline report.
If you want more control over the output, use `console_table` instead and pass it to `rich.Console.print`.
Source code in `pydantic_evals/pydantic_evals/reporting/__init__.py`
```
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
```
| ```
defrender(
 self,
 width: int | None = None,
 baseline: EvaluationReport[InputsT, OutputT, MetadataT] | None = None,
 *,
 include_input: bool = False,
 include_metadata: bool = False,
 include_expected_output: bool = False,
 include_output: bool = False,
 include_durations: bool = True,
 include_total_duration: bool = False,
 include_removed_cases: bool = False,
 include_averages: bool = True,
 include_errors: bool = True,
 include_error_stacktrace: bool = False,
 include_evaluator_failures: bool = True,
 input_config: RenderValueConfig | None = None,
 metadata_config: RenderValueConfig | None = None,
 output_config: RenderValueConfig | None = None,
 score_configs: dict[str, RenderNumberConfig] | None = None,
 label_configs: dict[str, RenderValueConfig] | None = None,
 metric_configs: dict[str, RenderNumberConfig] | None = None,
 duration_config: RenderNumberConfig | None = None,
 include_reasons: bool = False,
) -> str:
"""Render this report to a nicely-formatted string, optionally comparing it to a baseline report.
 If you want more control over the output, use `console_table` instead and pass it to `rich.Console.print`.
 """
 io_file = StringIO()
 console = Console(width=width, file=io_file)
 self.print(
 width=width,
 baseline=baseline,
 console=console,
 include_input=include_input,
 include_metadata=include_metadata,
 include_expected_output=include_expected_output,
 include_output=include_output,
 include_durations=include_durations,
 include_total_duration=include_total_duration,
 include_removed_cases=include_removed_cases,
 include_averages=include_averages,
 include_errors=include_errors,
 include_error_stacktrace=include_error_stacktrace,
 include_evaluator_failures=include_evaluator_failures,
 input_config=input_config,
 metadata_config=metadata_config,
 output_config=output_config,
 score_configs=score_configs,
 label_configs=label_configs,
 metric_configs=metric_configs,
 duration_config=duration_config,
 include_reasons=include_reasons,
 )
 return io_file.getvalue()
```
---|--- 
#### print
```
print(
 width: int[](https://docs.python.org/3/library/functions.html#int) | None = None,
 baseline: (
 EvaluationReport[](#pydantic_evals.reporting.EvaluationReport "pydantic_evals.reporting.EvaluationReport")[InputsT, OutputT, MetadataT] | None
 ) = None,
 *,
 console: Console[](https://rich.readthedocs.io/en/stable/reference/console.html#rich.console.Console "rich.console.Console") | None = None,
 include_input: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_metadata: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_expected_output: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_output: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_durations: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 include_total_duration: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_removed_cases: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_averages: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 include_errors: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 include_error_stacktrace: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_evaluator_failures: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 input_config: RenderValueConfig[](#pydantic_evals.reporting.RenderValueConfig "pydantic_evals.reporting.RenderValueConfig") | None = None,
 metadata_config: RenderValueConfig[](#pydantic_evals.reporting.RenderValueConfig "pydantic_evals.reporting.RenderValueConfig") | None = None,
 output_config: RenderValueConfig[](#pydantic_evals.reporting.RenderValueConfig "pydantic_evals.reporting.RenderValueConfig") | None = None,
 score_configs: (
 dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), RenderNumberConfig[](#pydantic_evals.reporting.RenderNumberConfig "pydantic_evals.reporting.RenderNumberConfig")] | None
 ) = None,
 label_configs: (
 dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), RenderValueConfig[](#pydantic_evals.reporting.RenderValueConfig "pydantic_evals.reporting.RenderValueConfig")] | None
 ) = None,
 metric_configs: (
 dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), RenderNumberConfig[](#pydantic_evals.reporting.RenderNumberConfig "pydantic_evals.reporting.RenderNumberConfig")] | None
 ) = None,
 duration_config: RenderNumberConfig[](#pydantic_evals.reporting.RenderNumberConfig "pydantic_evals.reporting.RenderNumberConfig") | None = None,
 include_reasons: bool[](https://docs.python.org/3/library/functions.html#bool) = False
) -> None
```
Print this report to the console, optionally comparing it to a baseline report.
If you want more control over the output, use `console_table` instead and pass it to `rich.Console.print`.
Source code in `pydantic_evals/pydantic_evals/reporting/__init__.py`
```
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
338
339
```
| ```
defprint(
 self,
 width: int | None = None,
 baseline: EvaluationReport[InputsT, OutputT, MetadataT] | None = None,
 *,
 console: Console | None = None,
 include_input: bool = False,
 include_metadata: bool = False,
 include_expected_output: bool = False,
 include_output: bool = False,
 include_durations: bool = True,
 include_total_duration: bool = False,
 include_removed_cases: bool = False,
 include_averages: bool = True,
 include_errors: bool = True,
 include_error_stacktrace: bool = False,
 include_evaluator_failures: bool = True,
 input_config: RenderValueConfig | None = None,
 metadata_config: RenderValueConfig | None = None,
 output_config: RenderValueConfig | None = None,
 score_configs: dict[str, RenderNumberConfig] | None = None,
 label_configs: dict[str, RenderValueConfig] | None = None,
 metric_configs: dict[str, RenderNumberConfig] | None = None,
 duration_config: RenderNumberConfig | None = None,
 include_reasons: bool = False,
) -> None:
"""Print this report to the console, optionally comparing it to a baseline report.
 If you want more control over the output, use `console_table` instead and pass it to `rich.Console.print`.
 """
 if console is None: # pragma: no branch
 console = Console(width=width)
 metadata_panel = self._metadata_panel(baseline=baseline)
 renderable: RenderableType = self.console_table(
 baseline=baseline,
 include_input=include_input,
 include_metadata=include_metadata,
 include_expected_output=include_expected_output,
 include_output=include_output,
 include_durations=include_durations,
 include_total_duration=include_total_duration,
 include_removed_cases=include_removed_cases,
 include_averages=include_averages,
 include_evaluator_failures=include_evaluator_failures,
 input_config=input_config,
 metadata_config=metadata_config,
 output_config=output_config,
 score_configs=score_configs,
 label_configs=label_configs,
 metric_configs=metric_configs,
 duration_config=duration_config,
 include_reasons=include_reasons,
 with_title=not metadata_panel,
 )
 # Wrap table with experiment metadata panel if present
 if metadata_panel:
 renderable = Group(metadata_panel, renderable)
 console.print(renderable)
 if include_errors and self.failures: # pragma: no cover
 failures_table = self.failures_table(
 include_input=include_input,
 include_metadata=include_metadata,
 include_expected_output=include_expected_output,
 include_error_message=True,
 include_error_stacktrace=include_error_stacktrace,
 input_config=input_config,
 metadata_config=metadata_config,
 )
 console.print(failures_table, style='red')
```
---|--- 
#### console_table
```
console_table(
 baseline: (
 EvaluationReport[](#pydantic_evals.reporting.EvaluationReport "pydantic_evals.reporting.EvaluationReport")[InputsT, OutputT, MetadataT] | None
 ) = None,
 *,
 include_input: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_metadata: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_expected_output: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_output: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_durations: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 include_total_duration: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_removed_cases: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_averages: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 include_evaluator_failures: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 input_config: RenderValueConfig[](#pydantic_evals.reporting.RenderValueConfig "pydantic_evals.reporting.RenderValueConfig") | None = None,
 metadata_config: RenderValueConfig[](#pydantic_evals.reporting.RenderValueConfig "pydantic_evals.reporting.RenderValueConfig") | None = None,
 output_config: RenderValueConfig[](#pydantic_evals.reporting.RenderValueConfig "pydantic_evals.reporting.RenderValueConfig") | None = None,
 score_configs: (
 dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), RenderNumberConfig[](#pydantic_evals.reporting.RenderNumberConfig "pydantic_evals.reporting.RenderNumberConfig")] | None
 ) = None,
 label_configs: (
 dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), RenderValueConfig[](#pydantic_evals.reporting.RenderValueConfig "pydantic_evals.reporting.RenderValueConfig")] | None
 ) = None,
 metric_configs: (
 dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), RenderNumberConfig[](#pydantic_evals.reporting.RenderNumberConfig "pydantic_evals.reporting.RenderNumberConfig")] | None
 ) = None,
 duration_config: RenderNumberConfig[](#pydantic_evals.reporting.RenderNumberConfig "pydantic_evals.reporting.RenderNumberConfig") | None = None,
 include_reasons: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 with_title: bool[](https://docs.python.org/3/library/functions.html#bool) = True
) -> Table[](https://rich.readthedocs.io/en/stable/reference/table.html#rich.table.Table "rich.table.Table")
```
Return a table containing the data from this report.
If a baseline is provided, returns a diff between this report and the baseline report. Optionally include input and output details.
Source code in `pydantic_evals/pydantic_evals/reporting/__init__.py`
```
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
364
365
366
367
368
369
370
371
372
373
374
375
376
377
378
379
380
381
382
383
384
385
386
387
388
389
390
391
392
393
394
```
| ```
defconsole_table(
 self,
 baseline: EvaluationReport[InputsT, OutputT, MetadataT] | None = None,
 *,
 include_input: bool = False,
 include_metadata: bool = False,
 include_expected_output: bool = False,
 include_output: bool = False,
 include_durations: bool = True,
 include_total_duration: bool = False,
 include_removed_cases: bool = False,
 include_averages: bool = True,
 include_evaluator_failures: bool = True,
 input_config: RenderValueConfig | None = None,
 metadata_config: RenderValueConfig | None = None,
 output_config: RenderValueConfig | None = None,
 score_configs: dict[str, RenderNumberConfig] | None = None,
 label_configs: dict[str, RenderValueConfig] | None = None,
 metric_configs: dict[str, RenderNumberConfig] | None = None,
 duration_config: RenderNumberConfig | None = None,
 include_reasons: bool = False,
 with_title: bool = True,
) -> Table:
"""Return a table containing the data from this report.
 If a baseline is provided, returns a diff between this report and the baseline report.
 Optionally include input and output details.
 """
 renderer = EvaluationRenderer(
 include_input=include_input,
 include_metadata=include_metadata,
 include_expected_output=include_expected_output,
 include_output=include_output,
 include_durations=include_durations,
 include_total_duration=include_total_duration,
 include_removed_cases=include_removed_cases,
 include_averages=include_averages,
 include_error_message=False,
 include_error_stacktrace=False,
 include_evaluator_failures=include_evaluator_failures,
 input_config={**_DEFAULT_VALUE_CONFIG, **(input_config or {})},
 metadata_config={**_DEFAULT_VALUE_CONFIG, **(metadata_config or {})},
 output_config=output_config or _DEFAULT_VALUE_CONFIG,
 score_configs=score_configs or {},
 label_configs=label_configs or {},
 metric_configs=metric_configs or {},
 duration_config=duration_config or _DEFAULT_DURATION_CONFIG,
 include_reasons=include_reasons,
 )
 if baseline is None:
 return renderer.build_table(self, with_title=with_title)
 else:
 return renderer.build_diff_table(self, baseline, with_title=with_title)
```
---|--- 
#### failures_table
```
failures_table(
 *,
 include_input: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_metadata: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_expected_output: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 include_error_message: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 include_error_stacktrace: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 input_config: RenderValueConfig[](#pydantic_evals.reporting.RenderValueConfig "pydantic_evals.reporting.RenderValueConfig") | None = None,
 metadata_config: RenderValueConfig[](#pydantic_evals.reporting.RenderValueConfig "pydantic_evals.reporting.RenderValueConfig") | None = None
) -> Table[](https://rich.readthedocs.io/en/stable/reference/table.html#rich.table.Table "rich.table.Table")
```
Return a table containing the failures in this report.
Source code in `pydantic_evals/pydantic_evals/reporting/__init__.py`
```
468
469
470
471
472
473
474
475
476
477
478
479
480
481
482
483
484
485
486
487
488
489
490
491
492
493
494
495
496
497
498
499
500
501
```
| ```
deffailures_table(
 self,
 *,
 include_input: bool = False,
 include_metadata: bool = False,
 include_expected_output: bool = False,
 include_error_message: bool = True,
 include_error_stacktrace: bool = True,
 input_config: RenderValueConfig | None = None,
 metadata_config: RenderValueConfig | None = None,
) -> Table:
"""Return a table containing the failures in this report."""
 renderer = EvaluationRenderer(
 include_input=include_input,
 include_metadata=include_metadata,
 include_expected_output=include_expected_output,
 include_output=False,
 include_durations=False,
 include_total_duration=False,
 include_removed_cases=False,
 include_averages=False,
 input_config={**_DEFAULT_VALUE_CONFIG, **(input_config or {})},
 metadata_config={**_DEFAULT_VALUE_CONFIG, **(metadata_config or {})},
 output_config=_DEFAULT_VALUE_CONFIG,
 score_configs={},
 label_configs={},
 metric_configs={},
 duration_config=_DEFAULT_DURATION_CONFIG,
 include_reasons=False,
 include_error_message=include_error_message,
 include_error_stacktrace=include_error_stacktrace,
 include_evaluator_failures=False, # Not applicable for failures table
 )
 return renderer.build_failures_table(self)
```
---|--- 
#### __str__
```
__str__() -> str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Return a string representation of the report.
Source code in `pydantic_evals/pydantic_evals/reporting/__init__.py`
```
503
504
505
```
| ```
def__str__(self) -> str: # pragma: lax no cover
"""Return a string representation of the report."""
 return self.render()
```
---|--- 
### RenderValueConfig
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
A configuration for rendering a values in an Evaluation report.
Source code in `pydantic_evals/pydantic_evals/reporting/__init__.py`
```
511
512
513
514
515
516
517
```
| ```
classRenderValueConfig(TypedDict, total=False):
"""A configuration for rendering a values in an Evaluation report."""
 value_formatter: str | Callable[[Any], str]
 diff_checker: Callable[[Any, Any], bool] | None
 diff_formatter: Callable[[Any, Any], str | None] | None
 diff_style: str
```
---|--- 
### RenderNumberConfig
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
A configuration for rendering a particular score or metric in an Evaluation report.
See the implementation of `_RenderNumber` for more clarity on how these parameters affect the rendering.
Source code in `pydantic_evals/pydantic_evals/reporting/__init__.py`
```
574
575
576
577
578
579
580
581
582
583
584
585
586
587
588
589
590
591
592
593
594
595
596
597
598
599
600
601
602
603
604
605
606
607
608
609
610
611
612
613
614
615
616
617
618
619
620
621
622
623
624
625
626
627
628
629
630
631
632
```
| ```
classRenderNumberConfig(TypedDict, total=False):
"""A configuration for rendering a particular score or metric in an Evaluation report.
 See the implementation of `_RenderNumber` for more clarity on how these parameters affect the rendering.
 """
 value_formatter: str | Callable[[float | int], str]
"""The logic to use for formatting values.
 * If not provided, format as ints if all values are ints, otherwise at least one decimal place and at least four significant figures.
 * You can also use a custom string format spec, e.g. '{:.3f}'
 * You can also use a custom function, e.g. lambda x: f'{x:.3f}'
 """
 diff_formatter: str | Callable[[float | int, float | int], str | None] | None
"""The logic to use for formatting details about the diff.
 The strings produced by the value_formatter will always be included in the reports, but the diff_formatter is
 used to produce additional text about the difference between the old and new values, such as the absolute or
 relative difference.
 * If not provided, format as ints if all values are ints, otherwise at least one decimal place and at least four
 significant figures, and will include the percentage change.
 * You can also use a custom string format spec, e.g. '{:+.3f}'
 * You can also use a custom function, e.g. lambda x: f'{x:+.3f}'.
 If this function returns None, no extra diff text will be added.
 * You can also use None to never generate extra diff text.
 """
 diff_atol: float
"""The absolute tolerance for considering a difference "significant".
 A difference is "significant" if `abs(new - old) < self.diff_atol + self.diff_rtol * abs(old)`.
 If a difference is not significant, it will not have the diff styles applied. Note that we still show
 both the rendered before and after values in the diff any time they differ, even if the difference is not
 significant. (If the rendered values are exactly the same, we only show the value once.)
 If not provided, use 1e-6.
 """
 diff_rtol: float
"""The relative tolerance for considering a difference "significant".
 See the description of `diff_atol` for more details about what makes a difference "significant".
 If not provided, use 0.001 if all values are ints, otherwise 0.05.
 """
 diff_increase_style: str
"""The style to apply to diffed values that have a significant increase.
 See the description of `diff_atol` for more details about what makes a difference "significant".
 If not provided, use green for scores and red for metrics. You can also use arbitrary `rich` styles, such as "bold red".
 """
 diff_decrease_style: str
"""The style to apply to diffed values that have significant decrease.
 See the description of `diff_atol` for more details about what makes a difference "significant".
 If not provided, use red for scores and green for metrics. You can also use arbitrary `rich` styles, such as "bold red".
 """
```
---|--- 
#### value_formatter `instance-attribute`
```
value_formatter: str[](https://docs.python.org/3/library/stdtypes.html#str) | Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[float[](https://docs.python.org/3/library/functions.html#float) | int[](https://docs.python.org/3/library/functions.html#int)], str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
The logic to use for formatting values.
 * If not provided, format as ints if all values are ints, otherwise at least one decimal place and at least four significant figures.
 * You can also use a custom string format spec, e.g. '{:.3f}'
 * You can also use a custom function, e.g. lambda x: f'{x:.3f}'
#### diff_formatter `instance-attribute`
```
diff_formatter: (
 str[](https://docs.python.org/3/library/stdtypes.html#str)
 | Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[float[](https://docs.python.org/3/library/functions.html#float) | int[](https://docs.python.org/3/library/functions.html#int), float[](https://docs.python.org/3/library/functions.html#float) | int[](https://docs.python.org/3/library/functions.html#int)], str[](https://docs.python.org/3/library/stdtypes.html#str) | None]
 | None
)
```
The logic to use for formatting details about the diff.
The strings produced by the value_formatter will always be included in the reports, but the diff_formatter is used to produce additional text about the difference between the old and new values, such as the absolute or relative difference.
 * If not provided, format as ints if all values are ints, otherwise at least one decimal place and at least four significant figures, and will include the percentage change.
 * You can also use a custom string format spec, e.g. '{:+.3f}'
 * You can also use a custom function, e.g. lambda x: f'{x:+.3f}'. If this function returns None, no extra diff text will be added.
 * You can also use None to never generate extra diff text.
#### diff_atol `instance-attribute`
```
diff_atol: float[](https://docs.python.org/3/library/functions.html#float)
```
The absolute tolerance for considering a difference "significant".
A difference is "significant" if `abs(new - old) < self.diff_atol + self.diff_rtol * abs(old)`.
If a difference is not significant, it will not have the diff styles applied. Note that we still show both the rendered before and after values in the diff any time they differ, even if the difference is not significant. (If the rendered values are exactly the same, we only show the value once.)
If not provided, use 1e-6.
#### diff_rtol `instance-attribute`
```
diff_rtol: float[](https://docs.python.org/3/library/functions.html#float)
```
The relative tolerance for considering a difference "significant".
See the description of `diff_atol` for more details about what makes a difference "significant".
If not provided, use 0.001 if all values are ints, otherwise 0.05.
#### diff_increase_style `instance-attribute`
```
diff_increase_style: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The style to apply to diffed values that have a significant increase.
See the description of `diff_atol` for more details about what makes a difference "significant".
If not provided, use green for scores and red for metrics. You can also use arbitrary `rich` styles, such as "bold red".
#### diff_decrease_style `instance-attribute`
```
diff_decrease_style: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The style to apply to diffed values that have significant decrease.
See the description of `diff_atol` for more details about what makes a difference "significant".
If not provided, use red for scores and green for metrics. You can also use arbitrary `rich` styles, such as "bold red".
### EvaluationRenderer `dataclass`
A class for rendering an EvalReport or the diff between two EvalReports.
Source code in `pydantic_evals/pydantic_evals/reporting/__init__.py`
```
1181
1182
1183
1184
1185
1186
1187
1188
1189
1190
1191
1192
1193
1194
1195
1196
1197
1198
1199
1200
1201
1202
1203
1204
1205
1206
1207
1208
1209
1210
1211
1212
1213
1214
1215
1216
1217
1218
1219
1220
1221
1222
1223
1224
1225
1226
1227
1228
1229
1230
1231
1232
1233
1234
1235
1236
1237
1238
1239
1240
1241
1242
1243
1244
1245
1246
1247
1248
1249
1250
1251
1252
1253
1254
1255
1256
1257
1258
1259
1260
1261
1262
1263
1264
1265
1266
1267
1268
1269
1270
1271
1272
1273
1274
1275
1276
1277
1278
1279
1280
1281
1282
1283
1284
1285
1286
1287
1288
1289
1290
1291
1292
1293
1294
1295
1296
1297
1298
1299
1300
1301
1302
1303
1304
1305
1306
1307
1308
1309
1310
1311
1312
1313
1314
1315
1316
1317
1318
1319
1320
1321
1322
1323
1324
1325
1326
1327
1328
1329
1330
1331
1332
1333
1334
1335
1336
1337
1338
1339
1340
1341
1342
1343
1344
1345
1346
1347
1348
1349
1350
1351
1352
1353
1354
1355
1356
1357
1358
1359
1360
1361
1362
1363
1364
1365
1366
1367
1368
1369
1370
1371
1372
1373
1374
1375
1376
1377
1378
1379
1380
1381
1382
1383
1384
1385
1386
1387
1388
1389
1390
1391
1392
1393
1394
1395
1396
1397
1398
1399
1400
1401
1402
1403
1404
1405
1406
1407
1408
1409
1410
1411
1412
1413
1414
1415
1416
1417
1418
1419
1420
1421
1422
1423
1424
1425
1426
1427
1428
1429
1430
```
| ```
@dataclass(kw_only=True)
classEvaluationRenderer:
"""A class for rendering an EvalReport or the diff between two EvalReports."""
 # Columns to include
 include_input: bool
 include_metadata: bool
 include_expected_output: bool
 include_output: bool
 include_durations: bool
 include_total_duration: bool
 # Rows to include
 include_removed_cases: bool
 include_averages: bool
 input_config: RenderValueConfig
 metadata_config: RenderValueConfig
 output_config: RenderValueConfig
 score_configs: dict[str, RenderNumberConfig]
 label_configs: dict[str, RenderValueConfig]
 metric_configs: dict[str, RenderNumberConfig]
 duration_config: RenderNumberConfig
 # Data to include
 include_reasons: bool # only applies to reports, not to diffs
 include_error_message: bool
 include_error_stacktrace: bool
 include_evaluator_failures: bool
 definclude_scores(self, report: EvaluationReport, baseline: EvaluationReport | None = None):
 return any(case.scores for case in self._all_cases(report, baseline))
 definclude_labels(self, report: EvaluationReport, baseline: EvaluationReport | None = None):
 return any(case.labels for case in self._all_cases(report, baseline))
 definclude_metrics(self, report: EvaluationReport, baseline: EvaluationReport | None = None):
 return any(case.metrics for case in self._all_cases(report, baseline))
 definclude_assertions(self, report: EvaluationReport, baseline: EvaluationReport | None = None):
 return any(case.assertions for case in self._all_cases(report, baseline))
 definclude_evaluator_failures_column(self, report: EvaluationReport, baseline: EvaluationReport | None = None):
 return self.include_evaluator_failures and any(
 case.evaluator_failures for case in self._all_cases(report, baseline)
 )
 def_all_cases(self, report: EvaluationReport, baseline: EvaluationReport | None) -> list[ReportCase]:
 if not baseline:
 return report.cases
 else:
 return report.cases + self._baseline_cases_to_include(report, baseline)
 def_baseline_cases_to_include(self, report: EvaluationReport, baseline: EvaluationReport) -> list[ReportCase]:
 if self.include_removed_cases:
 return baseline.cases
 report_case_names = {case.name for case in report.cases}
 return [case for case in baseline.cases if case.name in report_case_names]
 def_get_case_renderer(
 self, report: EvaluationReport, baseline: EvaluationReport | None = None
 ) -> ReportCaseRenderer:
 input_renderer = _ValueRenderer.from_config(self.input_config)
 metadata_renderer = _ValueRenderer.from_config(self.metadata_config)
 output_renderer = _ValueRenderer.from_config(self.output_config)
 score_renderers = self._infer_score_renderers(report, baseline)
 label_renderers = self._infer_label_renderers(report, baseline)
 metric_renderers = self._infer_metric_renderers(report, baseline)
 duration_renderer = _NumberRenderer.infer_from_config(
 self.duration_config, 'duration', [x.task_duration for x in self._all_cases(report, baseline)]
 )
 return ReportCaseRenderer(
 include_input=self.include_input,
 include_metadata=self.include_metadata,
 include_expected_output=self.include_expected_output,
 include_output=self.include_output,
 include_scores=self.include_scores(report, baseline),
 include_labels=self.include_labels(report, baseline),
 include_metrics=self.include_metrics(report, baseline),
 include_assertions=self.include_assertions(report, baseline),
 include_reasons=self.include_reasons,
 include_durations=self.include_durations,
 include_total_duration=self.include_total_duration,
 include_error_message=self.include_error_message,
 include_error_stacktrace=self.include_error_stacktrace,
 include_evaluator_failures=self.include_evaluator_failures_column(report, baseline),
 input_renderer=input_renderer,
 metadata_renderer=metadata_renderer,
 output_renderer=output_renderer,
 score_renderers=score_renderers,
 label_renderers=label_renderers,
 metric_renderers=metric_renderers,
 duration_renderer=duration_renderer,
 )
 # TODO(DavidM): in v2, change the return type here to RenderableType
 defbuild_table(self, report: EvaluationReport, *, with_title: bool = True) -> Table:
"""Build a table for the report.
 Args:
 report: The evaluation report to render
 with_title: Whether to include the title in the table (default True)
 Returns:
 A Rich Table object
 """
 case_renderer = self._get_case_renderer(report)
 title = f'Evaluation Summary: {report.name}' if with_title else ''
 table = case_renderer.build_base_table(title)
 for case in report.cases:
 table.add_row(*case_renderer.build_row(case))
 if self.include_averages: # pragma: no branch
 average = report.averages()
 if average: # pragma: no branch
 table.add_row(*case_renderer.build_aggregate_row(average))
 return table
 # TODO(DavidM): in v2, change the return type here to RenderableType
 defbuild_diff_table(
 self, report: EvaluationReport, baseline: EvaluationReport, *, with_title: bool = True
 ) -> Table:
"""Build a diff table comparing report to baseline.
 Args:
 report: The evaluation report to compare
 baseline: The baseline report to compare against
 with_title: Whether to include the title in the table (default True)
 Returns:
 A Rich Table object
 """
 report_cases = report.cases
 baseline_cases = self._baseline_cases_to_include(report, baseline)
 report_cases_by_id = {case.name: case for case in report_cases}
 baseline_cases_by_id = {case.name: case for case in baseline_cases}
 diff_cases: list[tuple[ReportCase, ReportCase]] = []
 removed_cases: list[ReportCase] = []
 added_cases: list[ReportCase] = []
 for case_id in sorted(set(baseline_cases_by_id.keys()) | set(report_cases_by_id.keys())):
 maybe_baseline_case = baseline_cases_by_id.get(case_id)
 maybe_report_case = report_cases_by_id.get(case_id)
 if maybe_baseline_case and maybe_report_case:
 diff_cases.append((maybe_baseline_case, maybe_report_case))
 elif maybe_baseline_case:
 removed_cases.append(maybe_baseline_case)
 elif maybe_report_case:
 added_cases.append(maybe_report_case)
 else: # pragma: no cover
 assert False, 'This should be unreachable'
 case_renderer = self._get_case_renderer(report, baseline)
 diff_name = baseline.name if baseline.name == report.name else f'{baseline.name} → {report.name}'
 title = f'Evaluation Diff: {diff_name}' if with_title else ''
 table = case_renderer.build_base_table(title)
 for baseline_case, new_case in diff_cases:
 table.add_row(*case_renderer.build_diff_row(new_case, baseline_case))
 for case in added_cases:
 row = case_renderer.build_row(case)
 row[0] = f'[green]+ Added Case[/]\n{row[0]}'
 table.add_row(*row)
 for case in removed_cases:
 row = case_renderer.build_row(case)
 row[0] = f'[red]- Removed Case[/]\n{row[0]}'
 table.add_row(*row)
 if self.include_averages: # pragma: no branch
 report_average = ReportCaseAggregate.average(report_cases)
 baseline_average = ReportCaseAggregate.average(baseline_cases)
 table.add_row(*case_renderer.build_diff_aggregate_row(report_average, baseline_average))
 return table
 # TODO(DavidM): in v2, change the return type here to RenderableType
 defbuild_failures_table(self, report: EvaluationReport) -> Table:
 case_renderer = self._get_case_renderer(report)
 table = case_renderer.build_failures_table('Case Failures')
 for case in report.failures:
 table.add_row(*case_renderer.build_failure_row(case))
 return table
 def_infer_score_renderers(
 self, report: EvaluationReport, baseline: EvaluationReport | None
 ) -> dict[str, _NumberRenderer]:
 all_cases = self._all_cases(report, baseline)
 values_by_name: dict[str, list[float | int]] = {}
 for case in all_cases:
 for k, score in case.scores.items():
 values_by_name.setdefault(k, []).append(score.value)
 all_renderers: dict[str, _NumberRenderer] = {}
 for name, values in values_by_name.items():
 merged_config = _DEFAULT_NUMBER_CONFIG.copy()
 merged_config.update(self.score_configs.get(name, {}))
 all_renderers[name] = _NumberRenderer.infer_from_config(merged_config, 'score', values)
 return all_renderers
 def_infer_label_renderers(
 self, report: EvaluationReport, baseline: EvaluationReport | None
 ) -> dict[str, _ValueRenderer]:
 all_cases = self._all_cases(report, baseline)
 all_names: set[str] = set()
 for case in all_cases:
 for k in case.labels:
 all_names.add(k)
 all_renderers: dict[str, _ValueRenderer] = {}
 for name in all_names:
 merged_config = _DEFAULT_VALUE_CONFIG.copy()
 merged_config.update(self.label_configs.get(name, {}))
 all_renderers[name] = _ValueRenderer.from_config(merged_config)
 return all_renderers
 def_infer_metric_renderers(
 self, report: EvaluationReport, baseline: EvaluationReport | None
 ) -> dict[str, _NumberRenderer]:
 all_cases = self._all_cases(report, baseline)
 values_by_name: dict[str, list[float | int]] = {}
 for case in all_cases:
 for k, v in case.metrics.items():
 values_by_name.setdefault(k, []).append(v)
 all_renderers: dict[str, _NumberRenderer] = {}
 for name, values in values_by_name.items():
 merged_config = _DEFAULT_NUMBER_CONFIG.copy()
 merged_config.update(self.metric_configs.get(name, {}))
 all_renderers[name] = _NumberRenderer.infer_from_config(merged_config, 'metric', values)
 return all_renderers
 def_infer_duration_renderer(
 self, report: EvaluationReport, baseline: EvaluationReport | None
 ) -> _NumberRenderer: # pragma: no cover
 all_cases = self._all_cases(report, baseline)
 all_durations = [x.task_duration for x in all_cases]
 if self.include_total_duration:
 all_durations += [x.total_duration for x in all_cases]
 return _NumberRenderer.infer_from_config(self.duration_config, 'duration', all_durations)
```
---|--- 
#### build_table
```
build_table(
 report: EvaluationReport[](#pydantic_evals.reporting.EvaluationReport "pydantic_evals.reporting.EvaluationReport"), *, with_title: bool[](https://docs.python.org/3/library/functions.html#bool) = True
) -> Table[](https://rich.readthedocs.io/en/stable/reference/table.html#rich.table.Table "rich.table.Table")
```
Build a table for the report.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`report` | `EvaluationReport[](#pydantic_evals.reporting.EvaluationReport "pydantic_evals.reporting.EvaluationReport")` | The evaluation report to render | _required_ 
`with_title` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to include the title in the table (default True) | `True` 
Returns:
Type | Description 
---|--- 
`Table[](https://rich.readthedocs.io/en/stable/reference/table.html#rich.table.Table "rich.table.Table")` | A Rich Table object 
Source code in `pydantic_evals/pydantic_evals/reporting/__init__.py`
```
1279
1280
1281
1282
1283
1284
1285
1286
1287
1288
1289
1290
1291
1292
1293
1294
1295
1296
1297
1298
1299
1300
1301
1302
```
| ```
defbuild_table(self, report: EvaluationReport, *, with_title: bool = True) -> Table:
"""Build a table for the report.
 Args:
 report: The evaluation report to render
 with_title: Whether to include the title in the table (default True)
 Returns:
 A Rich Table object
 """
 case_renderer = self._get_case_renderer(report)
 title = f'Evaluation Summary: {report.name}' if with_title else ''
 table = case_renderer.build_base_table(title)
 for case in report.cases:
 table.add_row(*case_renderer.build_row(case))
 if self.include_averages: # pragma: no branch
 average = report.averages()
 if average: # pragma: no branch
 table.add_row(*case_renderer.build_aggregate_row(average))
 return table
```
---|--- 
#### build_diff_table
```
build_diff_table(
 report: EvaluationReport[](#pydantic_evals.reporting.EvaluationReport "pydantic_evals.reporting.EvaluationReport"),
 baseline: EvaluationReport[](#pydantic_evals.reporting.EvaluationReport "pydantic_evals.reporting.EvaluationReport"),
 *,
 with_title: bool[](https://docs.python.org/3/library/functions.html#bool) = True
) -> Table[](https://rich.readthedocs.io/en/stable/reference/table.html#rich.table.Table "rich.table.Table")
```
Build a diff table comparing report to baseline.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`report` | `EvaluationReport[](#pydantic_evals.reporting.EvaluationReport "pydantic_evals.reporting.EvaluationReport")` | The evaluation report to compare | _required_ 
`baseline` | `EvaluationReport[](#pydantic_evals.reporting.EvaluationReport "pydantic_evals.reporting.EvaluationReport")` | The baseline report to compare against | _required_ 
`with_title` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to include the title in the table (default True) | `True` 
Returns:
Type | Description 
---|--- 
`Table[](https://rich.readthedocs.io/en/stable/reference/table.html#rich.table.Table "rich.table.Table")` | A Rich Table object 
Source code in `pydantic_evals/pydantic_evals/reporting/__init__.py`
```
1305
1306
1307
1308
1309
1310
1311
1312
1313
1314
1315
1316
1317
1318
1319
1320
1321
1322
1323
1324
1325
1326
1327
1328
1329
1330
1331
1332
1333
1334
1335
1336
1337
1338
1339
1340
1341
1342
1343
1344
1345
1346
1347
1348
1349
1350
1351
1352
1353
1354
1355
1356
1357
1358
1359
1360
1361
1362
```
| ```
defbuild_diff_table(
 self, report: EvaluationReport, baseline: EvaluationReport, *, with_title: bool = True
) -> Table:
"""Build a diff table comparing report to baseline.
 Args:
 report: The evaluation report to compare
 baseline: The baseline report to compare against
 with_title: Whether to include the title in the table (default True)
 Returns:
 A Rich Table object
 """
 report_cases = report.cases
 baseline_cases = self._baseline_cases_to_include(report, baseline)
 report_cases_by_id = {case.name: case for case in report_cases}
 baseline_cases_by_id = {case.name: case for case in baseline_cases}
 diff_cases: list[tuple[ReportCase, ReportCase]] = []
 removed_cases: list[ReportCase] = []
 added_cases: list[ReportCase] = []
 for case_id in sorted(set(baseline_cases_by_id.keys()) | set(report_cases_by_id.keys())):
 maybe_baseline_case = baseline_cases_by_id.get(case_id)
 maybe_report_case = report_cases_by_id.get(case_id)
 if maybe_baseline_case and maybe_report_case:
 diff_cases.append((maybe_baseline_case, maybe_report_case))
 elif maybe_baseline_case:
 removed_cases.append(maybe_baseline_case)
 elif maybe_report_case:
 added_cases.append(maybe_report_case)
 else: # pragma: no cover
 assert False, 'This should be unreachable'
 case_renderer = self._get_case_renderer(report, baseline)
 diff_name = baseline.name if baseline.name == report.name else f'{baseline.name} → {report.name}'
 title = f'Evaluation Diff: {diff_name}' if with_title else ''
 table = case_renderer.build_base_table(title)
 for baseline_case, new_case in diff_cases:
 table.add_row(*case_renderer.build_diff_row(new_case, baseline_case))
 for case in added_cases:
 row = case_renderer.build_row(case)
 row[0] = f'[green]+ Added Case[/]\n{row[0]}'
 table.add_row(*row)
 for case in removed_cases:
 row = case_renderer.build_row(case)
 row[0] = f'[red]- Removed Case[/]\n{row[0]}'
 table.add_row(*row)
 if self.include_averages: # pragma: no branch
 report_average = ReportCaseAggregate.average(report_cases)
 baseline_average = ReportCaseAggregate.average(baseline_cases)
 table.add_row(*case_renderer.build_diff_aggregate_row(report_average, baseline_average))
 return table
```
---|---