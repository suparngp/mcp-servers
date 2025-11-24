[ Skip to content ](#pydantic_aidurable_exec)
# `pydantic_ai.durable_exec`
### TemporalAgent
Bases: `WrapperAgent[](../agent/#pydantic_ai.agent.WrapperAgent "pydantic_ai.agent.WrapperAgent")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]`
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/temporal/_agent.py`
```
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
 82
 83
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
106
107
108
109
110
111
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
187
188
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
506
507
508
509
510
511
512
513
514
515
516
517
518
519
520
521
522
523
524
525
526
527
528
529
530
531
532
533
534
535
536
537
538
539
540
541
542
543
544
545
546
547
548
549
550
551
552
553
554
555
556
557
558
559
560
561
562
563
564
565
566
567
568
569
570
571
572
573
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
633
634
635
636
637
638
639
640
641
642
643
644
645
646
647
648
649
650
651
652
653
654
655
656
657
658
659
660
661
662
663
664
665
666
667
668
669
670
671
672
673
674
675
676
677
678
679
680
681
682
683
684
685
686
687
688
689
690
691
692
693
694
695
696
697
698
699
700
701
702
703
704
705
706
707
708
709
710
711
712
713
714
715
716
717
718
719
720
721
722
723
724
725
726
727
728
729
730
731
732
733
734
735
736
737
738
739
740
741
742
743
744
745
746
747
748
749
750
751
752
753
754
755
756
757
758
759
760
761
762
763
764
765
766
767
768
769
770
771
772
773
774
775
776
777
778
779
780
781
782
783
784
785
786
787
788
789
790
791
792
793
794
795
796
797
798
799
800
801
802
803
804
805
806
807
808
809
810
811
812
813
814
815
816
817
818
819
820
821
822
823
824
825
826
827
828
829
830
831
832
833
834
835
836
837
838
839
840
841
842
843
844
845
846
847
848
849
850
851
852
853
854
855
856
857
858
859
860
861
862
863
864
865
866
867
868
869
870
871
872
873
874
875
876
877
878
879
880
881
882
883
884
885
886
887
888
889
890
891
892
893
894
895
896
897
898
899
900
901
902
903
904
905
906
907
908
909
910
911
912
913
914
915
916
917
918
919
920
921
922
923
924
925
926
927
928
929
930
931
932
933
934
935
936
```
| ```
classTemporalAgent(WrapperAgent[AgentDepsT, OutputDataT]):
 def__init__(
 self,
 wrapped: AbstractAgent[AgentDepsT, OutputDataT],
 *,
 name: str | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 activity_config: ActivityConfig | None = None,
 model_activity_config: ActivityConfig | None = None,
 toolset_activity_config: dict[str, ActivityConfig] | None = None,
 tool_activity_config: dict[str, dict[str, ActivityConfig | Literal[False]]] | None = None,
 run_context_type: type[TemporalRunContext[AgentDepsT]] = TemporalRunContext[AgentDepsT],
 temporalize_toolset_func: Callable[
 [
 AbstractToolset[AgentDepsT],
 str,
 ActivityConfig,
 dict[str, ActivityConfig | Literal[False]],
 type[AgentDepsT],
 type[TemporalRunContext[AgentDepsT]],
 ],
 AbstractToolset[AgentDepsT],
 ] = temporalize_toolset,
 ):
"""Wrap an agent to enable it to be used inside a Temporal workflow, by automatically offloading model requests, tool calls, and MCP server communication to Temporal activities.
 After wrapping, the original agent can still be used as normal outside of the Temporal workflow, but any changes to its model or toolsets after wrapping will not be reflected in the durable agent.
 Args:
 wrapped: The agent to wrap.
 name: Optional unique agent name to use in the Temporal activities' names. If not provided, the agent's `name` will be used.
 event_stream_handler: Optional event stream handler to use instead of the one set on the wrapped agent.
 activity_config: The base Temporal activity config to use for all activities. If no config is provided, a `start_to_close_timeout` of 60 seconds is used.
 model_activity_config: The Temporal activity config to use for model request activities. This is merged with the base activity config.
 toolset_activity_config: The Temporal activity config to use for get-tools and call-tool activities for specific toolsets identified by ID. This is merged with the base activity config.
 tool_activity_config: The Temporal activity config to use for specific tool call activities identified by toolset ID and tool name.
 This is merged with the base and toolset-specific activity configs.
 If a tool does not use IO, you can specify `False` to disable using an activity.
 Note that the tool is required to be defined as an `async` function as non-async tools are run in threads which are non-deterministic and thus not supported outside of activities.
 run_context_type: The `TemporalRunContext` subclass to use to serialize and deserialize the run context for use inside a Temporal activity.
 By default, only the `deps`, `retries`, `tool_call_id`, `tool_name`, `retry` and `run_step` attributes will be available.
 To make another attribute available, create a `TemporalRunContext` subclass with a custom `serialize_run_context` class method that returns a dictionary that includes the attribute.
 temporalize_toolset_func: Optional function to use to prepare "leaf" toolsets (i.e. those that implement their own tool listing and calling) for Temporal by wrapping them in a `TemporalWrapperToolset` that moves methods that require IO to Temporal activities.
 If not provided, only `FunctionToolset` and `MCPServer` will be prepared for Temporal.
 The function takes the toolset, the activity name prefix, the toolset-specific activity config, the tool-specific activity configs and the run context type.
 """
 super().__init__(wrapped)
 self._name = name
 self._event_stream_handler = event_stream_handler
 self.run_context_type = run_context_type
 # start_to_close_timeout is required
 activity_config = activity_config or ActivityConfig(start_to_close_timeout=timedelta(seconds=60))
 # `pydantic_ai.exceptions.UserError` and `pydantic.errors.PydanticUserError` are not retryable
 retry_policy = activity_config.get('retry_policy') or RetryPolicy()
 retry_policy.non_retryable_error_types = [
 *(retry_policy.non_retryable_error_types or []),
 UserError.__name__,
 PydanticUserError.__name__,
 ]
 activity_config['retry_policy'] = retry_policy
 self.activity_config = activity_config
 model_activity_config = model_activity_config or {}
 toolset_activity_config = toolset_activity_config or {}
 tool_activity_config = tool_activity_config or {}
 if self.name is None:
 raise UserError(
 "An agent needs to have a unique `name` in order to be used with Temporal. The name will be used to identify the agent's activities within the workflow."
 )
 activity_name_prefix = f'agent__{self.name}'
 activities: list[Callable[..., Any]] = []
 if not isinstance(wrapped.model, Model):
 raise UserError(
 'An agent needs to have a `model` in order to be used with Temporal, it cannot be set at agent run time.'
 )
 async defevent_stream_handler_activity(params: _EventStreamHandlerParams, deps: AgentDepsT) -> None:
 # We can never get here without an `event_stream_handler`, as `TemporalAgent.run_stream` and `TemporalAgent.iter` raise an error saying to use `TemporalAgent.run` instead,
 # and that only ends up calling `event_stream_handler` if it is set.
 assert self.event_stream_handler is not None
 run_context = self.run_context_type.deserialize_run_context(params.serialized_run_context, deps=deps)
 async defstreamed_response():
 yield params.event
 await self.event_stream_handler(run_context, streamed_response())
 # Set type hint explicitly so that Temporal can take care of serialization and deserialization
 event_stream_handler_activity.__annotations__['deps'] = self.deps_type
 self.event_stream_handler_activity = activity.defn(name=f'{activity_name_prefix}__event_stream_handler')(
 event_stream_handler_activity
 )
 activities.append(self.event_stream_handler_activity)
 temporal_model = TemporalModel(
 wrapped.model,
 activity_name_prefix=activity_name_prefix,
 activity_config=activity_config | model_activity_config,
 deps_type=self.deps_type,
 run_context_type=self.run_context_type,
 event_stream_handler=self.event_stream_handler,
 )
 activities.extend(temporal_model.temporal_activities)
 deftemporalize_toolset(toolset: AbstractToolset[AgentDepsT]) -> AbstractToolset[AgentDepsT]:
 id = toolset.id
 if id is None:
 raise UserError(
 "Toolsets that are 'leaves' (i.e. those that implement their own tool listing and calling) need to have a unique `id` in order to be used with Temporal. The ID will be used to identify the toolset's activities within the workflow."
 )
 toolset = temporalize_toolset_func(
 toolset,
 activity_name_prefix,
 activity_config | toolset_activity_config.get(id, {}),
 tool_activity_config.get(id, {}),
 self.deps_type,
 self.run_context_type,
 )
 if isinstance(toolset, TemporalWrapperToolset):
 activities.extend(toolset.temporal_activities)
 return toolset
 temporal_toolsets = [toolset.visit_and_replace(temporalize_toolset) for toolset in wrapped.toolsets]
 self._model = temporal_model
 self._toolsets = temporal_toolsets
 self._temporal_activities = activities
 self._temporal_overrides_active: ContextVar[bool] = ContextVar('_temporal_overrides_active', default=False)
 @property
 defname(self) -> str | None:
 return self._name or super().name
 @name.setter
 defname(self, value: str | None) -> None: # pragma: no cover
 raise UserError(
 'The agent name cannot be changed after creation. If you need to change the name, create a new agent.'
 )
 @property
 defmodel(self) -> Model:
 return self._model
 @property
 defevent_stream_handler(self) -> EventStreamHandler[AgentDepsT] | None:
 handler = self._event_stream_handler or super().event_stream_handler
 if handler is None:
 return None
 elif workflow.in_workflow():
 return self._call_event_stream_handler_activity
 else:
 return handler
 async def_call_event_stream_handler_activity(
 self, ctx: RunContext[AgentDepsT], stream: AsyncIterable[_messages.AgentStreamEvent]
 ) -> None:
 serialized_run_context = self.run_context_type.serialize_run_context(ctx)
 async for event in stream:
 await workflow.execute_activity( # pyright: ignore[reportUnknownMemberType]
 activity=self.event_stream_handler_activity,
 args=[
 _EventStreamHandlerParams(
 event=event,
 serialized_run_context=serialized_run_context,
 ),
 ctx.deps,
 ],
 **self.activity_config,
 )
 @property
 deftoolsets(self) -> Sequence[AbstractToolset[AgentDepsT]]:
 with self._temporal_overrides():
 return super().toolsets
 @property
 deftemporal_activities(self) -> list[Callable[..., Any]]:
 return self._temporal_activities
 @contextmanager
 def_temporal_overrides(self) -> Iterator[None]:
 # We reset tools here as the temporalized function toolset is already in self._toolsets.
 with super().override(model=self._model, toolsets=self._toolsets, tools=[]):
 token = self._temporal_overrides_active.set(True)
 try:
 yield
 except PydanticSerializationError as e:
 raise UserError(
 "The `deps` object failed to be serialized. Temporal requires all objects that are passed to activities to be serializable using Pydantic's `TypeAdapter`."
 ) frome
 finally:
 self._temporal_overrides_active.reset(token)
 @overload
 async defrun(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 ) -> AgentRunResult[OutputDataT]: ...
 @overload
 async defrun(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT],
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 ) -> AgentRunResult[RunOutputDataT]: ...
 async defrun(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
 ) -> AgentRunResult[Any]:
"""Run the agent with a user prompt in async mode.
 This method builds an internal agent graph (using system prompts, tools and result schemas) and then
 runs the graph to completion. The result of the run is returned.
 Example:
 ```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 async def main():
 agent_run = await agent.run('What is the capital of France?')
 print(agent_run.output)
 #> The capital of France is Paris.
 ```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 event_stream_handler: Optional event stream handler to use for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 The result of the run.
 """
 if workflow.in_workflow() and event_stream_handler is not None:
 raise UserError(
 'Event stream handler cannot be set at agent run time inside a Temporal workflow, it must be set at agent creation time.'
 )
 with self._temporal_overrides():
 return await super().run(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 event_stream_handler=event_stream_handler or self.event_stream_handler,
 **_deprecated_kwargs,
 )
 @overload
 defrun_sync(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 ) -> AgentRunResult[OutputDataT]: ...
 @overload
 defrun_sync(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT],
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 ) -> AgentRunResult[RunOutputDataT]: ...
 defrun_sync(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
 ) -> AgentRunResult[Any]:
"""Synchronously run the agent with a user prompt.
 This is a convenience method that wraps [`self.run`][pydantic_ai.agent.AbstractAgent.run] with `loop.run_until_complete(...)`.
 You therefore can't use this method inside async code or if there's an active event loop.
 Example:
 ```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 result_sync = agent.run_sync('What is the capital of Italy?')
 print(result_sync.output)
 #> The capital of Italy is Rome.
 ```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 event_stream_handler: Optional event stream handler to use for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 The result of the run.
 """
 if workflow.in_workflow():
 raise UserError(
 '`agent.run_sync()` cannot be used inside a Temporal workflow. Use `await agent.run()` instead.'
 )
 return super().run_sync(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 event_stream_handler=event_stream_handler,
 **_deprecated_kwargs,
 )
 @overload
 defrun_stream(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 ) -> AbstractAsyncContextManager[StreamedRunResult[AgentDepsT, OutputDataT]]: ...
 @overload
 defrun_stream(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT],
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 ) -> AbstractAsyncContextManager[StreamedRunResult[AgentDepsT, RunOutputDataT]]: ...
 @asynccontextmanager
 async defrun_stream(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
 ) -> AsyncIterator[StreamedRunResult[AgentDepsT, Any]]:
"""Run the agent with a user prompt in async mode, returning a streamed response.
 Example:
 ```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 async def main():
 async with agent.run_stream('What is the capital of the UK?') as response:
 print(await response.get_output())
 #> The capital of the UK is London.
 ```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 event_stream_handler: Optional event stream handler to use for this run. It will receive all the events up until the final result is found, which you can then read or stream from inside the context manager.
 Returns:
 The result of the run.
 """
 if workflow.in_workflow():
 raise UserError(
 '`agent.run_stream()` cannot be used inside a Temporal workflow. '
 'Set an `event_stream_handler` on the agent and use `agent.run()` instead.'
 )
 async with super().run_stream(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 event_stream_handler=event_stream_handler,
 builtin_tools=builtin_tools,
 **_deprecated_kwargs,
 ) as result:
 yield result
 @overload
 defrun_stream_events(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 ) -> AsyncIterator[_messages.AgentStreamEvent | AgentRunResultEvent[OutputDataT]]: ...
 @overload
 defrun_stream_events(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT],
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 ) -> AsyncIterator[_messages.AgentStreamEvent | AgentRunResultEvent[RunOutputDataT]]: ...
 defrun_stream_events(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 ) -> AsyncIterator[_messages.AgentStreamEvent | AgentRunResultEvent[Any]]:
"""Run the agent with a user prompt in async mode and stream events from the run.
 This is a convenience method that wraps [`self.run`][pydantic_ai.agent.AbstractAgent.run] and
 uses the `event_stream_handler` kwarg to get a stream of events from the run.
 Example:
 ```python
 from pydantic_ai import Agent, AgentRunResultEvent, AgentStreamEvent
 agent = Agent('openai:gpt-4o')
 async def main():
 events: list[AgentStreamEvent | AgentRunResultEvent] = []
 async for event in agent.run_stream_events('What is the capital of France?'):
 events.append(event)
 print(events)
 '''
 [
 PartStartEvent(index=0, part=TextPart(content='The capital of ')),
 FinalResultEvent(tool_name=None, tool_call_id=None),
 PartDeltaEvent(index=0, delta=TextPartDelta(content_delta='France is Paris. ')),
 PartEndEvent(
 index=0, part=TextPart(content='The capital of France is Paris. ')
 ),
 AgentRunResultEvent(
 result=AgentRunResult(output='The capital of France is Paris. ')
 ),
 ]
 '''
 ```
 Arguments are the same as for [`self.run`][pydantic_ai.agent.AbstractAgent.run],
 except that `event_stream_handler` is now allowed.
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 An async iterable of stream events `AgentStreamEvent` and finally a `AgentRunResultEvent` with the final
 run result.
 """
 if workflow.in_workflow():
 raise UserError(
 '`agent.run_stream_events()` cannot be used inside a Temporal workflow. '
 'Set an `event_stream_handler` on the agent and use `agent.run()` instead.'
 )
 return super().run_stream_events(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 )
 @overload
 defiter(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 **_deprecated_kwargs: Never,
 ) -> AbstractAsyncContextManager[AgentRun[AgentDepsT, OutputDataT]]: ...
 @overload
 defiter(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT],
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 **_deprecated_kwargs: Never,
 ) -> AbstractAsyncContextManager[AgentRun[AgentDepsT, RunOutputDataT]]: ...
 @asynccontextmanager
 async defiter(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 **_deprecated_kwargs: Never,
 ) -> AsyncIterator[AgentRun[AgentDepsT, Any]]:
"""A contextmanager which can be used to iterate over the agent graph's nodes as they are executed.
 This method builds an internal agent graph (using system prompts, tools and output schemas) and then returns an
 `AgentRun` object. The `AgentRun` can be used to async-iterate over the nodes of the graph as they are
 executed. This is the API to use if you want to consume the outputs coming from each LLM model response, or the
 stream of events coming from the execution of tools.
 The `AgentRun` also provides methods to access the full message history, new messages, and usage statistics,
 and the final result of the run once it has completed.
 For more details, see the documentation of `AgentRun`.
 Example:
 ```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 async def main():
 nodes = []
 async with agent.iter('What is the capital of France?') as agent_run:
 async for node in agent_run:
 nodes.append(node)
 print(nodes)
 '''
 [
 UserPromptNode(
 user_prompt='What is the capital of France?',
 instructions_functions=[],
 system_prompts=(),
 system_prompt_functions=[],
 system_prompt_dynamic_functions={},
 ),
 ModelRequestNode(
 request=ModelRequest(
 parts=[
 UserPromptPart(
 content='What is the capital of France?',
 timestamp=datetime.datetime(...),
 )
 ]
 )
 ),
 CallToolsNode(
 model_response=ModelResponse(
 parts=[TextPart(content='The capital of France is Paris.')],
 usage=RequestUsage(input_tokens=56, output_tokens=7),
 model_name='gpt-4o',
 timestamp=datetime.datetime(...),
 )
 ),
 End(data=FinalResult(output='The capital of France is Paris.')),
 ]
 '''
 print(agent_run.result.output)
 #> The capital of France is Paris.
 ```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 The result of the run.
 """
 if workflow.in_workflow():
 if not self._temporal_overrides_active.get():
 raise UserError(
 '`agent.iter()` cannot be used inside a Temporal workflow. '
 'Set an `event_stream_handler` on the agent and use `agent.run()` instead.'
 )
 if model is not None:
 raise UserError(
 'Model cannot be set at agent run time inside a Temporal workflow, it must be set at agent creation time.'
 )
 if toolsets is not None:
 raise UserError(
 'Toolsets cannot be set at agent run time inside a Temporal workflow, it must be set at agent creation time.'
 )
 async with super().iter(
 user_prompt=user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 **_deprecated_kwargs,
 ) as run:
 yield run
 @contextmanager
 defoverride(
 self,
 *,
 name: str | _utils.Unset = _utils.UNSET,
 deps: AgentDepsT | _utils.Unset = _utils.UNSET,
 model: models.Model | models.KnownModelName | str | _utils.Unset = _utils.UNSET,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | _utils.Unset = _utils.UNSET,
 tools: Sequence[Tool[AgentDepsT] | ToolFuncEither[AgentDepsT, ...]] | _utils.Unset = _utils.UNSET,
 instructions: Instructions[AgentDepsT] | _utils.Unset = _utils.UNSET,
 ) -> Iterator[None]:
"""Context manager to temporarily override agent name, dependencies, model, toolsets, tools, or instructions.
 This is particularly useful when testing.
 You can find an example of this [here](../testing.md#overriding-model-via-pytest-fixtures).
 Args:
 name: The name to use instead of the name passed to the agent constructor and agent run.
 deps: The dependencies to use instead of the dependencies passed to the agent run.
 model: The model to use instead of the model passed to the agent run.
 toolsets: The toolsets to use instead of the toolsets passed to the agent constructor and agent run.
 tools: The tools to use instead of the tools registered with the agent.
 instructions: The instructions to use instead of the instructions registered with the agent.
 """
 if workflow.in_workflow():
 if _utils.is_set(model):
 raise UserError(
 'Model cannot be contextually overridden inside a Temporal workflow, it must be set at agent creation time.'
 )
 if _utils.is_set(toolsets):
 raise UserError(
 'Toolsets cannot be contextually overridden inside a Temporal workflow, they must be set at agent creation time.'
 )
 if _utils.is_set(tools):
 raise UserError(
 'Tools cannot be contextually overridden inside a Temporal workflow, they must be set at agent creation time.'
 )
 with super().override(
 name=name,
 deps=deps,
 model=model,
 toolsets=toolsets,
 tools=tools,
 instructions=instructions,
 ):
 yield
```
---|--- 
#### __init__
```
__init__(
 wrapped: AbstractAgent[](../agent/#pydantic_ai.agent.AbstractAgent "pydantic_ai.agent.AbstractAgent")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")],
 *,
 name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None,
 activity_config: ActivityConfig | None = None,
 model_activity_config: ActivityConfig | None = None,
 toolset_activity_config: (
 dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), ActivityConfig] | None
 ) = None,
 tool_activity_config: (
 dict[](https://docs.python.org/3/library/stdtypes.html#dict)[
 str[](https://docs.python.org/3/library/stdtypes.html#str), dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), ActivityConfig | Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[False]]
 ]
 | None
 ) = None,
 run_context_type: type[](https://docs.python.org/3/library/functions.html#type)[
 TemporalRunContext[](#pydantic_ai.durable_exec.temporal.TemporalRunContext "pydantic_ai.durable_exec.temporal._run_context.TemporalRunContext")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]
 ] = TemporalRunContext[](#pydantic_ai.durable_exec.temporal.TemporalRunContext "pydantic_ai.durable_exec.temporal._run_context.TemporalRunContext")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")],
 temporalize_toolset_func: Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[
 [
 AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")],
 str[](https://docs.python.org/3/library/stdtypes.html#str),
 ActivityConfig,
 dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), ActivityConfig | Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[False]],
 type[](https://docs.python.org/3/library/functions.html#type)[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")],
 type[](https://docs.python.org/3/library/functions.html#type)[TemporalRunContext[](#pydantic_ai.durable_exec.temporal.TemporalRunContext "pydantic_ai.durable_exec.temporal._run_context.TemporalRunContext")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]],
 ],
 AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")],
 ] = temporalize_toolset
)
```
Wrap an agent to enable it to be used inside a Temporal workflow, by automatically offloading model requests, tool calls, and MCP server communication to Temporal activities.
After wrapping, the original agent can still be used as normal outside of the Temporal workflow, but any changes to its model or toolsets after wrapping will not be reflected in the durable agent.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`wrapped` | `AbstractAgent[](../agent/#pydantic_ai.agent.AbstractAgent "pydantic_ai.agent.AbstractAgent")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]` | The agent to wrap. | _required_ 
`name` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional unique agent name to use in the Temporal activities' names. If not provided, the agent's `name` will be used. | `None` 
`event_stream_handler` | `EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None` | Optional event stream handler to use instead of the one set on the wrapped agent. | `None` 
`activity_config` | `ActivityConfig | None` | The base Temporal activity config to use for all activities. If no config is provided, a `start_to_close_timeout` of 60 seconds is used. | `None` 
`model_activity_config` | `ActivityConfig | None` | The Temporal activity config to use for model request activities. This is merged with the base activity config. | `None` 
`toolset_activity_config` | `dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), ActivityConfig] | None` | The Temporal activity config to use for get-tools and call-tool activities for specific toolsets identified by ID. This is merged with the base activity config. | `None` 
`tool_activity_config` | `dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), ActivityConfig | Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[False]]] | None` | The Temporal activity config to use for specific tool call activities identified by toolset ID and tool name. This is merged with the base and toolset-specific activity configs. If a tool does not use IO, you can specify `False` to disable using an activity. Note that the tool is required to be defined as an `async` function as non-async tools are run in threads which are non-deterministic and thus not supported outside of activities. | `None` 
`run_context_type` | `type[](https://docs.python.org/3/library/functions.html#type)[TemporalRunContext[](#pydantic_ai.durable_exec.temporal.TemporalRunContext "pydantic_ai.durable_exec.temporal._run_context.TemporalRunContext")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]]` | The `TemporalRunContext` subclass to use to serialize and deserialize the run context for use inside a Temporal activity. By default, only the `deps`, `retries`, `tool_call_id`, `tool_name`, `retry` and `run_step` attributes will be available. To make another attribute available, create a `TemporalRunContext` subclass with a custom `serialize_run_context` class method that returns a dictionary that includes the attribute. | `TemporalRunContext[](#pydantic_ai.durable_exec.temporal.TemporalRunContext "pydantic_ai.durable_exec.temporal._run_context.TemporalRunContext")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]` 
`temporalize_toolset_func` | `Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")], str[](https://docs.python.org/3/library/stdtypes.html#str), ActivityConfig, dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), ActivityConfig | Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[False]], type[](https://docs.python.org/3/library/functions.html#type)[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")], type[](https://docs.python.org/3/library/functions.html#type)[TemporalRunContext[](#pydantic_ai.durable_exec.temporal.TemporalRunContext "pydantic_ai.durable_exec.temporal._run_context.TemporalRunContext")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]]], AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]]` | Optional function to use to prepare "leaf" toolsets (i.e. those that implement their own tool listing and calling) for Temporal by wrapping them in a `TemporalWrapperToolset` that moves methods that require IO to Temporal activities. If not provided, only `FunctionToolset` and `MCPServer` will be prepared for Temporal. The function takes the toolset, the activity name prefix, the toolset-specific activity config, the tool-specific activity configs and the run context type. | `temporalize_toolset` 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/temporal/_agent.py`
```
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
 82
 83
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
106
107
108
109
110
111
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
187
188
189
190
191
```
| ```
def__init__(
 self,
 wrapped: AbstractAgent[AgentDepsT, OutputDataT],
 *,
 name: str | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 activity_config: ActivityConfig | None = None,
 model_activity_config: ActivityConfig | None = None,
 toolset_activity_config: dict[str, ActivityConfig] | None = None,
 tool_activity_config: dict[str, dict[str, ActivityConfig | Literal[False]]] | None = None,
 run_context_type: type[TemporalRunContext[AgentDepsT]] = TemporalRunContext[AgentDepsT],
 temporalize_toolset_func: Callable[
 [
 AbstractToolset[AgentDepsT],
 str,
 ActivityConfig,
 dict[str, ActivityConfig | Literal[False]],
 type[AgentDepsT],
 type[TemporalRunContext[AgentDepsT]],
 ],
 AbstractToolset[AgentDepsT],
 ] = temporalize_toolset,
):
"""Wrap an agent to enable it to be used inside a Temporal workflow, by automatically offloading model requests, tool calls, and MCP server communication to Temporal activities.
 After wrapping, the original agent can still be used as normal outside of the Temporal workflow, but any changes to its model or toolsets after wrapping will not be reflected in the durable agent.
 Args:
 wrapped: The agent to wrap.
 name: Optional unique agent name to use in the Temporal activities' names. If not provided, the agent's `name` will be used.
 event_stream_handler: Optional event stream handler to use instead of the one set on the wrapped agent.
 activity_config: The base Temporal activity config to use for all activities. If no config is provided, a `start_to_close_timeout` of 60 seconds is used.
 model_activity_config: The Temporal activity config to use for model request activities. This is merged with the base activity config.
 toolset_activity_config: The Temporal activity config to use for get-tools and call-tool activities for specific toolsets identified by ID. This is merged with the base activity config.
 tool_activity_config: The Temporal activity config to use for specific tool call activities identified by toolset ID and tool name.
 This is merged with the base and toolset-specific activity configs.
 If a tool does not use IO, you can specify `False` to disable using an activity.
 Note that the tool is required to be defined as an `async` function as non-async tools are run in threads which are non-deterministic and thus not supported outside of activities.
 run_context_type: The `TemporalRunContext` subclass to use to serialize and deserialize the run context for use inside a Temporal activity.
 By default, only the `deps`, `retries`, `tool_call_id`, `tool_name`, `retry` and `run_step` attributes will be available.
 To make another attribute available, create a `TemporalRunContext` subclass with a custom `serialize_run_context` class method that returns a dictionary that includes the attribute.
 temporalize_toolset_func: Optional function to use to prepare "leaf" toolsets (i.e. those that implement their own tool listing and calling) for Temporal by wrapping them in a `TemporalWrapperToolset` that moves methods that require IO to Temporal activities.
 If not provided, only `FunctionToolset` and `MCPServer` will be prepared for Temporal.
 The function takes the toolset, the activity name prefix, the toolset-specific activity config, the tool-specific activity configs and the run context type.
 """
 super().__init__(wrapped)
 self._name = name
 self._event_stream_handler = event_stream_handler
 self.run_context_type = run_context_type
 # start_to_close_timeout is required
 activity_config = activity_config or ActivityConfig(start_to_close_timeout=timedelta(seconds=60))
 # `pydantic_ai.exceptions.UserError` and `pydantic.errors.PydanticUserError` are not retryable
 retry_policy = activity_config.get('retry_policy') or RetryPolicy()
 retry_policy.non_retryable_error_types = [
 *(retry_policy.non_retryable_error_types or []),
 UserError.__name__,
 PydanticUserError.__name__,
 ]
 activity_config['retry_policy'] = retry_policy
 self.activity_config = activity_config
 model_activity_config = model_activity_config or {}
 toolset_activity_config = toolset_activity_config or {}
 tool_activity_config = tool_activity_config or {}
 if self.name is None:
 raise UserError(
 "An agent needs to have a unique `name` in order to be used with Temporal. The name will be used to identify the agent's activities within the workflow."
 )
 activity_name_prefix = f'agent__{self.name}'
 activities: list[Callable[..., Any]] = []
 if not isinstance(wrapped.model, Model):
 raise UserError(
 'An agent needs to have a `model` in order to be used with Temporal, it cannot be set at agent run time.'
 )
 async defevent_stream_handler_activity(params: _EventStreamHandlerParams, deps: AgentDepsT) -> None:
 # We can never get here without an `event_stream_handler`, as `TemporalAgent.run_stream` and `TemporalAgent.iter` raise an error saying to use `TemporalAgent.run` instead,
 # and that only ends up calling `event_stream_handler` if it is set.
 assert self.event_stream_handler is not None
 run_context = self.run_context_type.deserialize_run_context(params.serialized_run_context, deps=deps)
 async defstreamed_response():
 yield params.event
 await self.event_stream_handler(run_context, streamed_response())
 # Set type hint explicitly so that Temporal can take care of serialization and deserialization
 event_stream_handler_activity.__annotations__['deps'] = self.deps_type
 self.event_stream_handler_activity = activity.defn(name=f'{activity_name_prefix}__event_stream_handler')(
 event_stream_handler_activity
 )
 activities.append(self.event_stream_handler_activity)
 temporal_model = TemporalModel(
 wrapped.model,
 activity_name_prefix=activity_name_prefix,
 activity_config=activity_config | model_activity_config,
 deps_type=self.deps_type,
 run_context_type=self.run_context_type,
 event_stream_handler=self.event_stream_handler,
 )
 activities.extend(temporal_model.temporal_activities)
 deftemporalize_toolset(toolset: AbstractToolset[AgentDepsT]) -> AbstractToolset[AgentDepsT]:
 id = toolset.id
 if id is None:
 raise UserError(
 "Toolsets that are 'leaves' (i.e. those that implement their own tool listing and calling) need to have a unique `id` in order to be used with Temporal. The ID will be used to identify the toolset's activities within the workflow."
 )
 toolset = temporalize_toolset_func(
 toolset,
 activity_name_prefix,
 activity_config | toolset_activity_config.get(id, {}),
 tool_activity_config.get(id, {}),
 self.deps_type,
 self.run_context_type,
 )
 if isinstance(toolset, TemporalWrapperToolset):
 activities.extend(toolset.temporal_activities)
 return toolset
 temporal_toolsets = [toolset.visit_and_replace(temporalize_toolset) for toolset in wrapped.toolsets]
 self._model = temporal_model
 self._toolsets = temporal_toolsets
 self._temporal_activities = activities
 self._temporal_overrides_active: ContextVar[bool] = ContextVar('_temporal_overrides_active', default=False)
```
---|--- 
#### run `async`
```
run(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None
) -> AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]
```
```
run(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")],
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None
) -> AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")]
```
```
run(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None,
 **_deprecated_kwargs: Never[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Never "typing_extensions.Never")
) -> AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
Run the agent with a user prompt in async mode.
This method builds an internal agent graph (using system prompts, tools and result schemas) and then runs the graph to completion. The result of the run is returned.
Example: 
```
frompydantic_aiimport Agent
agent = Agent('openai:gpt-4o')
async defmain():
 agent_run = await agent.run('What is the capital of France?')
 print(agent_run.output)
 #> The capital of France is Paris.
```
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`user_prompt` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None` | User input to start/continue the conversation. | `None` 
`output_type` | `OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`event_stream_handler` | `EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None` | Optional event stream handler to use for this run. | `None` 
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools for this run. | `None` 
Returns:
Type | Description 
---|--- 
`AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]` | The result of the run. 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/temporal/_agent.py`
```
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
```
| ```
async defrun(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
) -> AgentRunResult[Any]:
"""Run the agent with a user prompt in async mode.
 This method builds an internal agent graph (using system prompts, tools and result schemas) and then
 runs the graph to completion. The result of the run is returned.
 Example:
```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 async def main():
 agent_run = await agent.run('What is the capital of France?')
 print(agent_run.output)
 #> The capital of France is Paris.
```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 event_stream_handler: Optional event stream handler to use for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 The result of the run.
 """
 if workflow.in_workflow() and event_stream_handler is not None:
 raise UserError(
 'Event stream handler cannot be set at agent run time inside a Temporal workflow, it must be set at agent creation time.'
 )
 with self._temporal_overrides():
 return await super().run(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 event_stream_handler=event_stream_handler or self.event_stream_handler,
 **_deprecated_kwargs,
 )
```
---|--- 
#### run_sync
```
run_sync(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None
) -> AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]
```
```
run_sync(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")],
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None
) -> AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")]
```
```
run_sync(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None,
 **_deprecated_kwargs: Never[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Never "typing_extensions.Never")
) -> AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
Synchronously run the agent with a user prompt.
This is a convenience method that wraps [`self.run`](../agent/#pydantic_ai.agent.AbstractAgent.run) with `loop.run_until_complete(...)`. You therefore can't use this method inside async code or if there's an active event loop.
Example: 
```
frompydantic_aiimport Agent
agent = Agent('openai:gpt-4o')
result_sync = agent.run_sync('What is the capital of Italy?')
print(result_sync.output)
#> The capital of Italy is Rome.
```
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`user_prompt` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None` | User input to start/continue the conversation. | `None` 
`output_type` | `OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`event_stream_handler` | `EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None` | Optional event stream handler to use for this run. | `None` 
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools for this run. | `None` 
Returns:
Type | Description 
---|--- 
`AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]` | The result of the run. 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/temporal/_agent.py`
```
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
```
| ```
defrun_sync(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
) -> AgentRunResult[Any]:
"""Synchronously run the agent with a user prompt.
 This is a convenience method that wraps [`self.run`][pydantic_ai.agent.AbstractAgent.run] with `loop.run_until_complete(...)`.
 You therefore can't use this method inside async code or if there's an active event loop.
 Example:
```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 result_sync = agent.run_sync('What is the capital of Italy?')
 print(result_sync.output)
 #> The capital of Italy is Rome.
```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 event_stream_handler: Optional event stream handler to use for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 The result of the run.
 """
 if workflow.in_workflow():
 raise UserError(
 '`agent.run_sync()` cannot be used inside a Temporal workflow. Use `await agent.run()` instead.'
 )
 return super().run_sync(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 event_stream_handler=event_stream_handler,
 **_deprecated_kwargs,
 )
```
---|--- 
#### run_stream `async`
```
run_stream(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None
) -> AbstractAsyncContextManager[](https://docs.python.org/3/library/contextlib.html#contextlib.AbstractAsyncContextManager "contextlib.AbstractAsyncContextManager")[
 StreamedRunResult[](../result/#pydantic_ai.result.StreamedRunResult "pydantic_ai.result.StreamedRunResult")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]
]
```
```
run_stream(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")],
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None
) -> AbstractAsyncContextManager[](https://docs.python.org/3/library/contextlib.html#contextlib.AbstractAsyncContextManager "contextlib.AbstractAsyncContextManager")[
 StreamedRunResult[](../result/#pydantic_ai.result.StreamedRunResult "pydantic_ai.result.StreamedRunResult")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")]
]
```
```
run_stream(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None,
 **_deprecated_kwargs: Never[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Never "typing_extensions.Never")
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[StreamedRunResult[](../result/#pydantic_ai.result.StreamedRunResult "pydantic_ai.result.StreamedRunResult")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]
```
Run the agent with a user prompt in async mode, returning a streamed response.
Example: 
```
frompydantic_aiimport Agent
agent = Agent('openai:gpt-4o')
async defmain():
 async with agent.run_stream('What is the capital of the UK?') as response:
 print(await response.get_output())
 #> The capital of the UK is London.
```
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`user_prompt` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None` | User input to start/continue the conversation. | `None` 
`output_type` | `OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools for this run. | `None` 
`event_stream_handler` | `EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None` | Optional event stream handler to use for this run. It will receive all the events up until the final result is found, which you can then read or stream from inside the context manager. | `None` 
Returns:
Type | Description 
---|--- 
`AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[StreamedRunResult[](../result/#pydantic_ai.result.StreamedRunResult "pydantic_ai.result.StreamedRunResult")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]` | The result of the run. 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/temporal/_agent.py`
```
523
524
525
526
527
528
529
530
531
532
533
534
535
536
537
538
539
540
541
542
543
544
545
546
547
548
549
550
551
552
553
554
555
556
557
558
559
560
561
562
563
564
565
566
567
568
569
570
571
572
573
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
```
| ```
@asynccontextmanager
async defrun_stream(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
) -> AsyncIterator[StreamedRunResult[AgentDepsT, Any]]:
"""Run the agent with a user prompt in async mode, returning a streamed response.
 Example:
```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 async def main():
 async with agent.run_stream('What is the capital of the UK?') as response:
 print(await response.get_output())
 #> The capital of the UK is London.
```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 event_stream_handler: Optional event stream handler to use for this run. It will receive all the events up until the final result is found, which you can then read or stream from inside the context manager.
 Returns:
 The result of the run.
 """
 if workflow.in_workflow():
 raise UserError(
 '`agent.run_stream()` cannot be used inside a Temporal workflow. '
 'Set an `event_stream_handler` on the agent and use `agent.run()` instead.'
 )
 async with super().run_stream(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 event_stream_handler=event_stream_handler,
 builtin_tools=builtin_tools,
 **_deprecated_kwargs,
 ) as result:
 yield result
```
---|--- 
#### run_stream_events
```
run_stream_events(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[
 AgentStreamEvent[](../messages/#pydantic_ai.messages.AgentStreamEvent "pydantic_ai.messages.AgentStreamEvent") | AgentRunResultEvent[](../run/#pydantic_ai.run.AgentRunResultEvent "pydantic_ai.AgentRunResultEvent")[OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]
]
```
```
run_stream_events(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")],
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[
 AgentStreamEvent[](../messages/#pydantic_ai.messages.AgentStreamEvent "pydantic_ai.messages.AgentStreamEvent") | AgentRunResultEvent[](../run/#pydantic_ai.run.AgentRunResultEvent "pydantic_ai.AgentRunResultEvent")[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")]
]
```
```
run_stream_events(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[
 AgentStreamEvent[](../messages/#pydantic_ai.messages.AgentStreamEvent "pydantic_ai.messages.AgentStreamEvent") | AgentRunResultEvent[](../run/#pydantic_ai.run.AgentRunResultEvent "pydantic_ai.AgentRunResultEvent")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
]
```
Run the agent with a user prompt in async mode and stream events from the run.
This is a convenience method that wraps [`self.run`](../agent/#pydantic_ai.agent.AbstractAgent.run) and uses the `event_stream_handler` kwarg to get a stream of events from the run.
Example: 
```
frompydantic_aiimport Agent, AgentRunResultEvent, AgentStreamEvent
agent = Agent('openai:gpt-4o')
async defmain():
 events: list[AgentStreamEvent | AgentRunResultEvent] = []
 async for event in agent.run_stream_events('What is the capital of France?'):
 events.append(event)
 print(events)
'''
 [
 PartStartEvent(index=0, part=TextPart(content='The capital of ')),
 FinalResultEvent(tool_name=None, tool_call_id=None),
 PartDeltaEvent(index=0, delta=TextPartDelta(content_delta='France is Paris. ')),
 PartEndEvent(
 index=0, part=TextPart(content='The capital of France is Paris. ')
 ),
 AgentRunResultEvent(
 result=AgentRunResult(output='The capital of France is Paris. ')
 ),
 ]
 '''
```
Arguments are the same as for [`self.run`](../agent/#pydantic_ai.agent.AbstractAgent.run), except that `event_stream_handler` is now allowed.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`user_prompt` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None` | User input to start/continue the conversation. | `None` 
`output_type` | `OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools for this run. | `None` 
Returns:
Type | Description 
---|--- 
`AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[AgentStreamEvent[](../messages/#pydantic_ai.messages.AgentStreamEvent "pydantic_ai.messages.AgentStreamEvent") | AgentRunResultEvent[](../run/#pydantic_ai.run.AgentRunResultEvent "pydantic_ai.AgentRunResultEvent")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]` | An async iterable of stream events `AgentStreamEvent` and finally a `AgentRunResultEvent` with the final 
`AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[AgentStreamEvent[](../messages/#pydantic_ai.messages.AgentStreamEvent "pydantic_ai.messages.AgentStreamEvent") | AgentRunResultEvent[](../run/#pydantic_ai.run.AgentRunResultEvent "pydantic_ai.AgentRunResultEvent")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]` | run result. 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/temporal/_agent.py`
```
635
636
637
638
639
640
641
642
643
644
645
646
647
648
649
650
651
652
653
654
655
656
657
658
659
660
661
662
663
664
665
666
667
668
669
670
671
672
673
674
675
676
677
678
679
680
681
682
683
684
685
686
687
688
689
690
691
692
693
694
695
696
697
698
699
700
701
702
703
704
705
706
707
708
709
710
711
712
713
714
715
716
717
718
719
720
721
722
723
```
| ```
defrun_stream_events(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
) -> AsyncIterator[_messages.AgentStreamEvent | AgentRunResultEvent[Any]]:
"""Run the agent with a user prompt in async mode and stream events from the run.
 This is a convenience method that wraps [`self.run`][pydantic_ai.agent.AbstractAgent.run] and
 uses the `event_stream_handler` kwarg to get a stream of events from the run.
 Example:
```python
 from pydantic_ai import Agent, AgentRunResultEvent, AgentStreamEvent
 agent = Agent('openai:gpt-4o')
 async def main():
 events: list[AgentStreamEvent | AgentRunResultEvent] = []
 async for event in agent.run_stream_events('What is the capital of France?'):
 events.append(event)
 print(events)
 '''
 [
 PartStartEvent(index=0, part=TextPart(content='The capital of ')),
 FinalResultEvent(tool_name=None, tool_call_id=None),
 PartDeltaEvent(index=0, delta=TextPartDelta(content_delta='France is Paris. ')),
 PartEndEvent(
 index=0, part=TextPart(content='The capital of France is Paris. ')
 ),
 AgentRunResultEvent(
 result=AgentRunResult(output='The capital of France is Paris. ')
 ),
 ]
 '''
```
 Arguments are the same as for [`self.run`][pydantic_ai.agent.AbstractAgent.run],
 except that `event_stream_handler` is now allowed.
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 An async iterable of stream events `AgentStreamEvent` and finally a `AgentRunResultEvent` with the final
 run result.
 """
 if workflow.in_workflow():
 raise UserError(
 '`agent.run_stream_events()` cannot be used inside a Temporal workflow. '
 'Set an `event_stream_handler` on the agent and use `agent.run()` instead.'
 )
 return super().run_stream_events(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 )
```
---|--- 
#### iter `async`
```
iter(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 **_deprecated_kwargs: Never[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Never "typing_extensions.Never")
) -> AbstractAsyncContextManager[](https://docs.python.org/3/library/contextlib.html#contextlib.AbstractAsyncContextManager "contextlib.AbstractAsyncContextManager")[
 AgentRun[](../agent/#pydantic_ai.agent.AgentRun "pydantic_ai.agent.AgentRun")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]
]
```
```
iter(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")],
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 **_deprecated_kwargs: Never[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Never "typing_extensions.Never")
) -> AbstractAsyncContextManager[](https://docs.python.org/3/library/contextlib.html#contextlib.AbstractAsyncContextManager "contextlib.AbstractAsyncContextManager")[
 AgentRun[](../agent/#pydantic_ai.agent.AgentRun "pydantic_ai.agent.AgentRun")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")]
]
```
```
iter(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 **_deprecated_kwargs: Never[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Never "typing_extensions.Never")
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[AgentRun[](../agent/#pydantic_ai.agent.AgentRun "pydantic_ai.agent.AgentRun")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]
```
A contextmanager which can be used to iterate over the agent graph's nodes as they are executed.
This method builds an internal agent graph (using system prompts, tools and output schemas) and then returns an `AgentRun` object. The `AgentRun` can be used to async-iterate over the nodes of the graph as they are executed. This is the API to use if you want to consume the outputs coming from each LLM model response, or the stream of events coming from the execution of tools.
The `AgentRun` also provides methods to access the full message history, new messages, and usage statistics, and the final result of the run once it has completed.
For more details, see the documentation of `AgentRun`.
Example: 
```
frompydantic_aiimport Agent
agent = Agent('openai:gpt-4o')
async defmain():
 nodes = []
 async with agent.iter('What is the capital of France?') as agent_run:
 async for node in agent_run:
 nodes.append(node)
 print(nodes)
'''
 [
 UserPromptNode(
 user_prompt='What is the capital of France?',
 instructions_functions=[],
 system_prompts=(),
 system_prompt_functions=[],
 system_prompt_dynamic_functions={},
 ),
 ModelRequestNode(
 request=ModelRequest(
 parts=[
 UserPromptPart(
 content='What is the capital of France?',
 timestamp=datetime.datetime(...),
 )
 ]
 )
 ),
 CallToolsNode(
 model_response=ModelResponse(
 parts=[TextPart(content='The capital of France is Paris.')],
 usage=RequestUsage(input_tokens=56, output_tokens=7),
 model_name='gpt-4o',
 timestamp=datetime.datetime(...),
 )
 ),
 End(data=FinalResult(output='The capital of France is Paris.')),
 ]
 '''
 print(agent_run.result.output)
 #> The capital of France is Paris.
```
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`user_prompt` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None` | User input to start/continue the conversation. | `None` 
`output_type` | `OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools for this run. | `None` 
Returns:
Type | Description 
---|--- 
`AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[AgentRun[](../agent/#pydantic_ai.agent.AgentRun "pydantic_ai.agent.AgentRun")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]` | The result of the run. 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/temporal/_agent.py`
```
763
764
765
766
767
768
769
770
771
772
773
774
775
776
777
778
779
780
781
782
783
784
785
786
787
788
789
790
791
792
793
794
795
796
797
798
799
800
801
802
803
804
805
806
807
808
809
810
811
812
813
814
815
816
817
818
819
820
821
822
823
824
825
826
827
828
829
830
831
832
833
834
835
836
837
838
839
840
841
842
843
844
845
846
847
848
849
850
851
852
853
854
855
856
857
858
859
860
861
862
863
864
865
866
867
868
869
870
871
872
873
874
875
876
877
878
879
880
881
882
883
884
885
886
887
888
```
| ```
@asynccontextmanager
async defiter(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 **_deprecated_kwargs: Never,
) -> AsyncIterator[AgentRun[AgentDepsT, Any]]:
"""A contextmanager which can be used to iterate over the agent graph's nodes as they are executed.
 This method builds an internal agent graph (using system prompts, tools and output schemas) and then returns an
 `AgentRun` object. The `AgentRun` can be used to async-iterate over the nodes of the graph as they are
 executed. This is the API to use if you want to consume the outputs coming from each LLM model response, or the
 stream of events coming from the execution of tools.
 The `AgentRun` also provides methods to access the full message history, new messages, and usage statistics,
 and the final result of the run once it has completed.
 For more details, see the documentation of `AgentRun`.
 Example:
```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 async def main():
 nodes = []
 async with agent.iter('What is the capital of France?') as agent_run:
 async for node in agent_run:
 nodes.append(node)
 print(nodes)
 '''
 [
 UserPromptNode(
 user_prompt='What is the capital of France?',
 instructions_functions=[],
 system_prompts=(),
 system_prompt_functions=[],
 system_prompt_dynamic_functions={},
 ),
 ModelRequestNode(
 request=ModelRequest(
 parts=[
 UserPromptPart(
 content='What is the capital of France?',
 timestamp=datetime.datetime(...),
 )
 ]
 )
 ),
 CallToolsNode(
 model_response=ModelResponse(
 parts=[TextPart(content='The capital of France is Paris.')],
 usage=RequestUsage(input_tokens=56, output_tokens=7),
 model_name='gpt-4o',
 timestamp=datetime.datetime(...),
 )
 ),
 End(data=FinalResult(output='The capital of France is Paris.')),
 ]
 '''
 print(agent_run.result.output)
 #> The capital of France is Paris.
```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 The result of the run.
 """
 if workflow.in_workflow():
 if not self._temporal_overrides_active.get():
 raise UserError(
 '`agent.iter()` cannot be used inside a Temporal workflow. '
 'Set an `event_stream_handler` on the agent and use `agent.run()` instead.'
 )
 if model is not None:
 raise UserError(
 'Model cannot be set at agent run time inside a Temporal workflow, it must be set at agent creation time.'
 )
 if toolsets is not None:
 raise UserError(
 'Toolsets cannot be set at agent run time inside a Temporal workflow, it must be set at agent creation time.'
 )
 async with super().iter(
 user_prompt=user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 **_deprecated_kwargs,
 ) as run:
 yield run
```
---|--- 
#### override
```
override(
 *,
 name: str[](https://docs.python.org/3/library/stdtypes.html#str) | Unset = UNSET,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") | Unset = UNSET,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | Unset = UNSET,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | Unset
 ) = UNSET,
 tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[
 Tool[](../tools/#pydantic_ai.tools.Tool "pydantic_ai.tools.Tool")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]
 | ToolFuncEither[](../tools/#pydantic_ai.tools.ToolFuncEither "pydantic_ai.tools.ToolFuncEither")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), ...]
 ]
 | Unset
 ) = UNSET,
 instructions: Instructions[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | Unset = UNSET
) -> Iterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Iterator "collections.abc.Iterator")[None]
```
Context manager to temporarily override agent name, dependencies, model, toolsets, tools, or instructions.
This is particularly useful when testing. You can find an example of this [here](../../testing/#overriding-model-via-pytest-fixtures).
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`name` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Unset` | The name to use instead of the name passed to the agent constructor and agent run. | `UNSET` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") | Unset` | The dependencies to use instead of the dependencies passed to the agent run. | `UNSET` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | Unset` | The model to use instead of the model passed to the agent run. | `UNSET` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | Unset` | The toolsets to use instead of the toolsets passed to the agent constructor and agent run. | `UNSET` 
`tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[Tool[](../tools/#pydantic_ai.tools.Tool "pydantic_ai.tools.Tool")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | ToolFuncEither[](../tools/#pydantic_ai.tools.ToolFuncEither "pydantic_ai.tools.ToolFuncEither")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), ...]] | Unset` | The tools to use instead of the tools registered with the agent. | `UNSET` 
`instructions` | `Instructions[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | Unset` | The instructions to use instead of the instructions registered with the agent. | `UNSET` 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/temporal/_agent.py`
```
890
891
892
893
894
895
896
897
898
899
900
901
902
903
904
905
906
907
908
909
910
911
912
913
914
915
916
917
918
919
920
921
922
923
924
925
926
927
928
929
930
931
932
933
934
935
936
```
| ```
@contextmanager
defoverride(
 self,
 *,
 name: str | _utils.Unset = _utils.UNSET,
 deps: AgentDepsT | _utils.Unset = _utils.UNSET,
 model: models.Model | models.KnownModelName | str | _utils.Unset = _utils.UNSET,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | _utils.Unset = _utils.UNSET,
 tools: Sequence[Tool[AgentDepsT] | ToolFuncEither[AgentDepsT, ...]] | _utils.Unset = _utils.UNSET,
 instructions: Instructions[AgentDepsT] | _utils.Unset = _utils.UNSET,
) -> Iterator[None]:
"""Context manager to temporarily override agent name, dependencies, model, toolsets, tools, or instructions.
 This is particularly useful when testing.
 You can find an example of this [here](../testing.md#overriding-model-via-pytest-fixtures).
 Args:
 name: The name to use instead of the name passed to the agent constructor and agent run.
 deps: The dependencies to use instead of the dependencies passed to the agent run.
 model: The model to use instead of the model passed to the agent run.
 toolsets: The toolsets to use instead of the toolsets passed to the agent constructor and agent run.
 tools: The tools to use instead of the tools registered with the agent.
 instructions: The instructions to use instead of the instructions registered with the agent.
 """
 if workflow.in_workflow():
 if _utils.is_set(model):
 raise UserError(
 'Model cannot be contextually overridden inside a Temporal workflow, it must be set at agent creation time.'
 )
 if _utils.is_set(toolsets):
 raise UserError(
 'Toolsets cannot be contextually overridden inside a Temporal workflow, they must be set at agent creation time.'
 )
 if _utils.is_set(tools):
 raise UserError(
 'Tools cannot be contextually overridden inside a Temporal workflow, they must be set at agent creation time.'
 )
 with super().override(
 name=name,
 deps=deps,
 model=model,
 toolsets=toolsets,
 tools=tools,
 instructions=instructions,
 ):
 yield
```
---|--- 
### LogfirePlugin
Bases: `Plugin`
Temporal client plugin for Logfire.
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/temporal/_logfire.py`
```
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
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
```
| ```
classLogfirePlugin(ClientPlugin):
"""Temporal client plugin for Logfire."""
 def__init__(self, setup_logfire: Callable[[], Logfire] = _default_setup_logfire, *, metrics: bool = True):
 try:
 importlogfire # noqa: F401 # pyright: ignore[reportUnusedImport]
 except ImportError as _import_error:
 raise ImportError(
 'Please install the `logfire` package to use the Logfire plugin, '
 'you can use the `logfire` optional group — `pip install "pydantic-ai-slim[logfire]"`'
 ) from_import_error
 self.setup_logfire = setup_logfire
 self.metrics = metrics
 definit_client_plugin(self, next: ClientPlugin) -> None:
 self.next_client_plugin = next
 defconfigure_client(self, config: ClientConfig) -> ClientConfig:
 fromopentelemetry.traceimport get_tracer
 fromtemporalio.contrib.opentelemetryimport TracingInterceptor
 interceptors = config.get('interceptors', [])
 config['interceptors'] = [*interceptors, TracingInterceptor(get_tracer('temporalio'))]
 return self.next_client_plugin.configure_client(config)
 async defconnect_service_client(self, config: ConnectConfig) -> ServiceClient:
 logfire = self.setup_logfire()
 if self.metrics:
 logfire_config = logfire.config
 token = logfire_config.token
 if logfire_config.send_to_logfire and token is not None and logfire_config.metrics is not False:
 base_url = logfire_config.advanced.generate_base_url(token)
 metrics_url = base_url + '/v1/metrics'
 headers = {'Authorization': f'Bearer {token}'}
 config.runtime = Runtime(
 telemetry=TelemetryConfig(metrics=OpenTelemetryConfig(url=metrics_url, headers=headers))
 )
 return await self.next_client_plugin.connect_service_client(config)
```
---|--- 
### TemporalRunContext
Bases: `RunContext[](../tools/#pydantic_ai.tools.RunContext "pydantic_ai.tools.RunContext")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]`
The [`RunContext`](../tools/#pydantic_ai.tools.RunContext) subclass to use to serialize and deserialize the run context for use inside a Temporal activity.
By default, only the `deps`, `retries`, `tool_call_id`, `tool_name`, `tool_call_approved`, `retry`, `max_retries` and `run_step` attributes will be available. To make another attribute available, create a `TemporalRunContext` subclass with a custom `serialize_run_context` class method that returns a dictionary that includes the attribute and pass it to [`TemporalAgent`](#pydantic_ai.durable_exec.temporal.TemporalAgent).
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/temporal/_run_context.py`
```
 9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
```
| ```
classTemporalRunContext(RunContext[AgentDepsT]):
"""The [`RunContext`][pydantic_ai.tools.RunContext] subclass to use to serialize and deserialize the run context for use inside a Temporal activity.
 By default, only the `deps`, `retries`, `tool_call_id`, `tool_name`, `tool_call_approved`, `retry`, `max_retries` and `run_step` attributes will be available.
 To make another attribute available, create a `TemporalRunContext` subclass with a custom `serialize_run_context` class method that returns a dictionary that includes the attribute and pass it to [`TemporalAgent`][pydantic_ai.durable_exec.temporal.TemporalAgent].
 """
 def__init__(self, deps: AgentDepsT, **kwargs: Any):
 self.__dict__ = {**kwargs, 'deps': deps}
 setattr(
 self,
 '__dataclass_fields__',
 {name: field for name, field in RunContext.__dataclass_fields__.items() if name in self.__dict__},
 )
 def__getattribute__(self, name: str) -> Any:
 try:
 return super().__getattribute__(name)
 except AttributeError as e: # pragma: no cover
 if name in RunContext.__dataclass_fields__:
 raise UserError(
 f'{self.__class__.__name__!r} object has no attribute {name!r}. '
 'To make the attribute available, create a `TemporalRunContext` subclass with a custom `serialize_run_context` class method that returns a dictionary that includes the attribute and pass it to `TemporalAgent`.'
 )
 else:
 raise e
 @classmethod
 defserialize_run_context(cls, ctx: RunContext[Any]) -> dict[str, Any]:
"""Serialize the run context to a `dict[str, Any]`."""
 return {
 'retries': ctx.retries,
 'tool_call_id': ctx.tool_call_id,
 'tool_name': ctx.tool_name,
 'tool_call_approved': ctx.tool_call_approved,
 'retry': ctx.retry,
 'max_retries': ctx.max_retries,
 'run_step': ctx.run_step,
 }
 @classmethod
 defdeserialize_run_context(cls, ctx: dict[str, Any], deps: AgentDepsT) -> TemporalRunContext[AgentDepsT]:
"""Deserialize the run context from a `dict[str, Any]`."""
 return cls(**ctx, deps=deps)
```
---|--- 
#### serialize_run_context `classmethod`
```
serialize_run_context(
 ctx: RunContext[](../tools/#pydantic_ai.tools.RunContext "pydantic_ai.tools.RunContext")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")],
) -> dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
Serialize the run context to a `dict[str, Any]`.
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/temporal/_run_context.py`
```
36
37
38
39
40
41
42
43
44
45
46
47
```
| ```
@classmethod
defserialize_run_context(cls, ctx: RunContext[Any]) -> dict[str, Any]:
"""Serialize the run context to a `dict[str, Any]`."""
 return {
 'retries': ctx.retries,
 'tool_call_id': ctx.tool_call_id,
 'tool_name': ctx.tool_name,
 'tool_call_approved': ctx.tool_call_approved,
 'retry': ctx.retry,
 'max_retries': ctx.max_retries,
 'run_step': ctx.run_step,
 }
```
---|--- 
#### deserialize_run_context `classmethod`
```
deserialize_run_context(
 ctx: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")], deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")
) -> TemporalRunContext[](#pydantic_ai.durable_exec.temporal.TemporalRunContext "pydantic_ai.durable_exec.temporal._run_context.TemporalRunContext")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]
```
Deserialize the run context from a `dict[str, Any]`.
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/temporal/_run_context.py`
```
49
50
51
52
```
| ```
@classmethod
defdeserialize_run_context(cls, ctx: dict[str, Any], deps: AgentDepsT) -> TemporalRunContext[AgentDepsT]:
"""Deserialize the run context from a `dict[str, Any]`."""
 return cls(**ctx, deps=deps)
```
---|--- 
### PydanticAIPlugin
Bases: `Plugin`, `Plugin`
Temporal client and worker plugin for Pydantic AI.
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/temporal/__init__.py`
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
 82
 83
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
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
```
| ```
classPydanticAIPlugin(ClientPlugin, WorkerPlugin):
"""Temporal client and worker plugin for Pydantic AI."""
 definit_client_plugin(self, next: ClientPlugin) -> None:
 self.next_client_plugin = next
 definit_worker_plugin(self, next: WorkerPlugin) -> None:
 self.next_worker_plugin = next
 defconfigure_client(self, config: ClientConfig) -> ClientConfig:
 config['data_converter'] = self._get_new_data_converter(config.get('data_converter'))
 return self.next_client_plugin.configure_client(config)
 defconfigure_worker(self, config: WorkerConfig) -> WorkerConfig:
 runner = config.get('workflow_runner') # pyright: ignore[reportUnknownMemberType]
 if isinstance(runner, SandboxedWorkflowRunner): # pragma: no branch
 config['workflow_runner'] = replace(
 runner,
 restrictions=runner.restrictions.with_passthrough_modules(
 'pydantic_ai',
 'pydantic',
 'pydantic_core',
 'logfire',
 'rich',
 'httpx',
 'anyio',
 'httpcore',
 # Imported inside `logfire._internal.json_encoder` when running `logfire.info` inside an activity with attributes to serialize
 'attrs',
 # Imported inside `logfire._internal.json_schema` when running `logfire.info` inside an activity with attributes to serialize
 'numpy',
 'pandas',
 ),
 )
 config['workflow_failure_exception_types'] = [
 *config.get('workflow_failure_exception_types', []), # pyright: ignore[reportUnknownMemberType]
 UserError,
 PydanticUserError,
 ]
 return self.next_worker_plugin.configure_worker(config)
 async defconnect_service_client(self, config: ConnectConfig) -> ServiceClient:
 return await self.next_client_plugin.connect_service_client(config)
 async defrun_worker(self, worker: Worker) -> None:
 await self.next_worker_plugin.run_worker(worker)
 defconfigure_replayer(self, config: ReplayerConfig) -> ReplayerConfig: # pragma: no cover
 config['data_converter'] = self._get_new_data_converter(config.get('data_converter')) # pyright: ignore[reportUnknownMemberType]
 return self.next_worker_plugin.configure_replayer(config)
 defrun_replayer(
 self,
 replayer: Replayer,
 histories: AsyncIterator[WorkflowHistory],
 ) -> AbstractAsyncContextManager[AsyncIterator[WorkflowReplayResult]]: # pragma: no cover
 return self.next_worker_plugin.run_replayer(replayer, histories)
 def_get_new_data_converter(self, converter: DataConverter | None) -> DataConverter:
 if converter and converter.payload_converter_class not in (
 DefaultPayloadConverter,
 PydanticPayloadConverter,
 ):
 warnings.warn( # pragma: no cover
 'A non-default Temporal data converter was used which has been replaced with the Pydantic data converter.'
 )
 return pydantic_data_converter
```
---|--- 
### AgentPlugin
Bases: `Plugin`
Temporal worker plugin for a specific Pydantic AI agent.
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/temporal/__init__.py`
```
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
```
| ```
classAgentPlugin(WorkerPlugin):
"""Temporal worker plugin for a specific Pydantic AI agent."""
 def__init__(self, agent: TemporalAgent[Any, Any]):
 self.agent = agent
 definit_worker_plugin(self, next: WorkerPlugin) -> None:
 self.next_worker_plugin = next
 defconfigure_worker(self, config: WorkerConfig) -> WorkerConfig:
 activities: Sequence[Callable[..., Any]] = config.get('activities', []) # pyright: ignore[reportUnknownMemberType]
 # Activities are checked for name conflicts by Temporal.
 config['activities'] = [*activities, *self.agent.temporal_activities]
 return self.next_worker_plugin.configure_worker(config)
 async defrun_worker(self, worker: Worker) -> None:
 await self.next_worker_plugin.run_worker(worker)
 defconfigure_replayer(self, config: ReplayerConfig) -> ReplayerConfig: # pragma: no cover
 return self.next_worker_plugin.configure_replayer(config)
 defrun_replayer(
 self,
 replayer: Replayer,
 histories: AsyncIterator[WorkflowHistory],
 ) -> AbstractAsyncContextManager[AsyncIterator[WorkflowReplayResult]]: # pragma: no cover
 return self.next_worker_plugin.run_replayer(replayer, histories)
```
---|--- 
### DBOSAgent
Bases: `WrapperAgent[](../agent/#pydantic_ai.agent.WrapperAgent "pydantic_ai.agent.WrapperAgent")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]`, `DBOSConfiguredInstance`
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/dbos/_agent.py`
```
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
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
 82
 83
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
106
107
108
109
110
111
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
187
188
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
506
507
508
509
510
511
512
513
514
515
516
517
518
519
520
521
522
523
524
525
526
527
528
529
530
531
532
533
534
535
536
537
538
539
540
541
542
543
544
545
546
547
548
549
550
551
552
553
554
555
556
557
558
559
560
561
562
563
564
565
566
567
568
569
570
571
572
573
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
633
634
635
636
637
638
639
640
641
642
643
644
645
646
647
648
649
650
651
652
653
654
655
656
657
658
659
660
661
662
663
664
665
666
667
668
669
670
671
672
673
674
675
676
677
678
679
680
681
682
683
684
685
686
687
688
689
690
691
692
693
694
695
696
697
698
699
700
701
702
703
704
705
706
707
708
709
710
711
712
713
714
715
716
717
718
719
720
721
722
723
724
725
726
727
728
729
730
731
732
733
734
735
736
737
738
739
740
741
742
743
744
745
746
747
748
749
750
751
752
753
754
755
756
757
758
759
760
761
762
763
764
765
766
767
768
769
770
771
772
773
774
775
776
777
778
779
780
781
782
783
784
785
786
787
788
789
790
791
792
793
794
795
796
797
798
799
800
801
802
803
804
805
806
807
808
809
810
811
812
813
814
815
816
817
818
819
820
821
822
823
824
825
826
827
828
829
830
831
832
833
834
835
836
837
838
839
840
841
842
843
844
845
846
847
848
849
850
851
852
853
854
855
856
857
858
859
860
861
862
863
864
865
866
867
868
869
870
871
872
```
| ```
@DBOS.dbos_class()
classDBOSAgent(WrapperAgent[AgentDepsT, OutputDataT], DBOSConfiguredInstance):
 def__init__(
 self,
 wrapped: AbstractAgent[AgentDepsT, OutputDataT],
 *,
 name: str | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 mcp_step_config: StepConfig | None = None,
 model_step_config: StepConfig | None = None,
 ):
"""Wrap an agent to enable it with DBOS durable workflows, by automatically offloading model requests, tool calls, and MCP server communication to DBOS steps.
 After wrapping, the original agent can still be used as normal outside of the DBOS workflow.
 Args:
 wrapped: The agent to wrap.
 name: Optional unique agent name to use as the DBOS configured instance name. If not provided, the agent's `name` will be used.
 event_stream_handler: Optional event stream handler to use instead of the one set on the wrapped agent.
 mcp_step_config: The base DBOS step config to use for MCP server steps. If no config is provided, use the default settings of DBOS.
 model_step_config: The DBOS step config to use for model request steps. If no config is provided, use the default settings of DBOS.
 """
 super().__init__(wrapped)
 self._name = name or wrapped.name
 self._event_stream_handler = event_stream_handler
 if self._name is None:
 raise UserError(
 "An agent needs to have a unique `name` in order to be used with DBOS. The name will be used to identify the agent's workflows and steps."
 )
 # Merge the config with the default DBOS config
 self._mcp_step_config = mcp_step_config or {}
 self._model_step_config = model_step_config or {}
 if not isinstance(wrapped.model, Model):
 raise UserError(
 'An agent needs to have a `model` in order to be used with DBOS, it cannot be set at agent run time.'
 )
 dbos_model = DBOSModel(
 wrapped.model,
 step_name_prefix=self._name,
 step_config=self._model_step_config,
 event_stream_handler=self.event_stream_handler,
 )
 self._model = dbos_model
 dbosagent_name = self._name
 defdbosify_toolset(toolset: AbstractToolset[AgentDepsT]) -> AbstractToolset[AgentDepsT]:
 # Replace MCPServer with DBOSMCPServer
 try:
 frompydantic_ai.mcpimport MCPServer
 from._mcp_serverimport DBOSMCPServer
 except ImportError:
 pass
 else:
 if isinstance(toolset, MCPServer):
 return DBOSMCPServer(
 wrapped=toolset,
 step_name_prefix=dbosagent_name,
 step_config=self._mcp_step_config,
 )
 return toolset
 dbos_toolsets = [toolset.visit_and_replace(dbosify_toolset) for toolset in wrapped.toolsets]
 self._toolsets = dbos_toolsets
 DBOSConfiguredInstance.__init__(self, self._name)
 # Wrap the `run` method in a DBOS workflow
 @DBOS.workflow(name=f'{self._name}.run')
 async defwrapped_run_workflow(
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
 ) -> AgentRunResult[Any]:
 with self._dbos_overrides():
 return await super(WrapperAgent, self).run(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 event_stream_handler=event_stream_handler,
 **_deprecated_kwargs,
 )
 self.dbos_wrapped_run_workflow = wrapped_run_workflow
 # Wrap the `run_sync` method in a DBOS workflow
 @DBOS.workflow(name=f'{self._name}.run_sync')
 defwrapped_run_sync_workflow(
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
 ) -> AgentRunResult[Any]:
 with self._dbos_overrides():
 return super(DBOSAgent, self).run_sync(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 event_stream_handler=event_stream_handler,
 **_deprecated_kwargs,
 )
 self.dbos_wrapped_run_sync_workflow = wrapped_run_sync_workflow
 @property
 defname(self) -> str | None:
 return self._name
 @name.setter
 defname(self, value: str | None) -> None: # pragma: no cover
 raise UserError(
 'The agent name cannot be changed after creation. If you need to change the name, create a new agent.'
 )
 @property
 defmodel(self) -> Model:
 return self._model
 @property
 defevent_stream_handler(self) -> EventStreamHandler[AgentDepsT] | None:
 handler = self._event_stream_handler or super().event_stream_handler
 if handler is None:
 return None
 elif DBOS.workflow_id is not None and DBOS.step_id is None:
 # Special case if it's in a DBOS workflow but not a step, we need to iterate through all events and call the handler.
 return self._call_event_stream_handler_in_workflow
 else:
 return handler
 async def_call_event_stream_handler_in_workflow(
 self, ctx: RunContext[AgentDepsT], stream: AsyncIterable[_messages.AgentStreamEvent]
 ) -> None:
 handler = self._event_stream_handler or super().event_stream_handler
 assert handler is not None
 async defstreamed_response(event: _messages.AgentStreamEvent):
 yield event
 async for event in stream:
 await handler(ctx, streamed_response(event))
 @property
 deftoolsets(self) -> Sequence[AbstractToolset[AgentDepsT]]:
 with self._dbos_overrides():
 return super().toolsets
 @contextmanager
 def_dbos_overrides(self) -> Iterator[None]:
 # Override with DBOSModel and DBOSMCPServer in the toolsets.
 with (
 super().override(model=self._model, toolsets=self._toolsets, tools=[]),
 self.sequential_tool_calls(),
 ):
 yield
 @overload
 async defrun(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 ) -> AgentRunResult[OutputDataT]: ...
 @overload
 async defrun(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT],
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 ) -> AgentRunResult[RunOutputDataT]: ...
 async defrun(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
 ) -> AgentRunResult[Any]:
"""Run the agent with a user prompt in async mode.
 This method builds an internal agent graph (using system prompts, tools and result schemas) and then
 runs the graph to completion. The result of the run is returned.
 Example:
 ```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 async def main():
 agent_run = await agent.run('What is the capital of France?')
 print(agent_run.output)
 #> The capital of France is Paris.
 ```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 event_stream_handler: Optional event stream handler to use for this run.
 Returns:
 The result of the run.
 """
 return await self.dbos_wrapped_run_workflow(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 event_stream_handler=event_stream_handler,
 **_deprecated_kwargs,
 )
 @overload
 defrun_sync(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 ) -> AgentRunResult[OutputDataT]: ...
 @overload
 defrun_sync(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT],
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 ) -> AgentRunResult[RunOutputDataT]: ...
 defrun_sync(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
 ) -> AgentRunResult[Any]:
"""Synchronously run the agent with a user prompt.
 This is a convenience method that wraps [`self.run`][pydantic_ai.agent.AbstractAgent.run] with `loop.run_until_complete(...)`.
 You therefore can't use this method inside async code or if there's an active event loop.
 Example:
 ```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 result_sync = agent.run_sync('What is the capital of Italy?')
 print(result_sync.output)
 #> The capital of Italy is Rome.
 ```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 event_stream_handler: Optional event stream handler to use for this run.
 Returns:
 The result of the run.
 """
 return self.dbos_wrapped_run_sync_workflow(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 event_stream_handler=event_stream_handler,
 **_deprecated_kwargs,
 )
 @overload
 defrun_stream(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 ) -> AbstractAsyncContextManager[StreamedRunResult[AgentDepsT, OutputDataT]]: ...
 @overload
 defrun_stream(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT],
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 ) -> AbstractAsyncContextManager[StreamedRunResult[AgentDepsT, RunOutputDataT]]: ...
 @asynccontextmanager
 async defrun_stream(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
 ) -> AsyncIterator[StreamedRunResult[AgentDepsT, Any]]:
"""Run the agent with a user prompt in async mode, returning a streamed response.
 Example:
 ```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 async def main():
 async with agent.run_stream('What is the capital of the UK?') as response:
 print(await response.get_output())
 #> The capital of the UK is London.
 ```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 event_stream_handler: Optional event stream handler to use for this run. It will receive all the events up until the final result is found, which you can then read or stream from inside the context manager.
 Returns:
 The result of the run.
 """
 if DBOS.workflow_id is not None and DBOS.step_id is None:
 raise UserError(
 '`agent.run_stream()` cannot be used inside a DBOS workflow. '
 'Set an `event_stream_handler` on the agent and use `agent.run()` instead.'
 )
 async with super().run_stream(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 event_stream_handler=event_stream_handler,
 **_deprecated_kwargs,
 ) as result:
 yield result
 @overload
 defrun_stream_events(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 ) -> AsyncIterator[_messages.AgentStreamEvent | AgentRunResultEvent[OutputDataT]]: ...
 @overload
 defrun_stream_events(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT],
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 ) -> AsyncIterator[_messages.AgentStreamEvent | AgentRunResultEvent[RunOutputDataT]]: ...
 defrun_stream_events(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 ) -> AsyncIterator[_messages.AgentStreamEvent | AgentRunResultEvent[Any]]:
"""Run the agent with a user prompt in async mode and stream events from the run.
 This is a convenience method that wraps [`self.run`][pydantic_ai.agent.AbstractAgent.run] and
 uses the `event_stream_handler` kwarg to get a stream of events from the run.
 Example:
 ```python
 from pydantic_ai import Agent, AgentRunResultEvent, AgentStreamEvent
 agent = Agent('openai:gpt-4o')
 async def main():
 events: list[AgentStreamEvent | AgentRunResultEvent] = []
 async for event in agent.run_stream_events('What is the capital of France?'):
 events.append(event)
 print(events)
 '''
 [
 PartStartEvent(index=0, part=TextPart(content='The capital of ')),
 FinalResultEvent(tool_name=None, tool_call_id=None),
 PartDeltaEvent(index=0, delta=TextPartDelta(content_delta='France is Paris. ')),
 PartEndEvent(
 index=0, part=TextPart(content='The capital of France is Paris. ')
 ),
 AgentRunResultEvent(
 result=AgentRunResult(output='The capital of France is Paris. ')
 ),
 ]
 '''
 ```
 Arguments are the same as for [`self.run`][pydantic_ai.agent.AbstractAgent.run],
 except that `event_stream_handler` is now allowed.
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 An async iterable of stream events `AgentStreamEvent` and finally a `AgentRunResultEvent` with the final
 run result.
 """
 raise UserError(
 '`agent.run_stream_events()` cannot be used with DBOS. '
 'Set an `event_stream_handler` on the agent and use `agent.run()` instead.'
 )
 @overload
 defiter(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 **_deprecated_kwargs: Never,
 ) -> AbstractAsyncContextManager[AgentRun[AgentDepsT, OutputDataT]]: ...
 @overload
 defiter(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT],
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 **_deprecated_kwargs: Never,
 ) -> AbstractAsyncContextManager[AgentRun[AgentDepsT, RunOutputDataT]]: ...
 @asynccontextmanager
 async defiter(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 **_deprecated_kwargs: Never,
 ) -> AsyncIterator[AgentRun[AgentDepsT, Any]]:
"""A contextmanager which can be used to iterate over the agent graph's nodes as they are executed.
 This method builds an internal agent graph (using system prompts, tools and output schemas) and then returns an
 `AgentRun` object. The `AgentRun` can be used to async-iterate over the nodes of the graph as they are
 executed. This is the API to use if you want to consume the outputs coming from each LLM model response, or the
 stream of events coming from the execution of tools.
 The `AgentRun` also provides methods to access the full message history, new messages, and usage statistics,
 and the final result of the run once it has completed.
 For more details, see the documentation of `AgentRun`.
 Example:
 ```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 async def main():
 nodes = []
 async with agent.iter('What is the capital of France?') as agent_run:
 async for node in agent_run:
 nodes.append(node)
 print(nodes)
 '''
 [
 UserPromptNode(
 user_prompt='What is the capital of France?',
 instructions_functions=[],
 system_prompts=(),
 system_prompt_functions=[],
 system_prompt_dynamic_functions={},
 ),
 ModelRequestNode(
 request=ModelRequest(
 parts=[
 UserPromptPart(
 content='What is the capital of France?',
 timestamp=datetime.datetime(...),
 )
 ]
 )
 ),
 CallToolsNode(
 model_response=ModelResponse(
 parts=[TextPart(content='The capital of France is Paris.')],
 usage=RequestUsage(input_tokens=56, output_tokens=7),
 model_name='gpt-4o',
 timestamp=datetime.datetime(...),
 )
 ),
 End(data=FinalResult(output='The capital of France is Paris.')),
 ]
 '''
 print(agent_run.result.output)
 #> The capital of France is Paris.
 ```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 The result of the run.
 """
 if model is not None and not isinstance(model, DBOSModel):
 raise UserError(
 'Non-DBOS model cannot be set at agent run time inside a DBOS workflow, it must be set at agent creation time.'
 )
 with self._dbos_overrides():
 async with super().iter(
 user_prompt=user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 **_deprecated_kwargs,
 ) as run:
 yield run
 @contextmanager
 defoverride(
 self,
 *,
 name: str | _utils.Unset = _utils.UNSET,
 deps: AgentDepsT | _utils.Unset = _utils.UNSET,
 model: models.Model | models.KnownModelName | str | _utils.Unset = _utils.UNSET,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | _utils.Unset = _utils.UNSET,
 tools: Sequence[Tool[AgentDepsT] | ToolFuncEither[AgentDepsT, ...]] | _utils.Unset = _utils.UNSET,
 instructions: Instructions[AgentDepsT] | _utils.Unset = _utils.UNSET,
 ) -> Iterator[None]:
"""Context manager to temporarily override agent name, dependencies, model, toolsets, tools, or instructions.
 This is particularly useful when testing.
 You can find an example of this [here](../testing.md#overriding-model-via-pytest-fixtures).
 Args:
 name: The name to use instead of the name passed to the agent constructor and agent run.
 deps: The dependencies to use instead of the dependencies passed to the agent run.
 model: The model to use instead of the model passed to the agent run.
 toolsets: The toolsets to use instead of the toolsets passed to the agent constructor and agent run.
 tools: The tools to use instead of the tools registered with the agent.
 instructions: The instructions to use instead of the instructions registered with the agent.
 """
 if _utils.is_set(model) and not isinstance(model, (DBOSModel)):
 raise UserError(
 'Non-DBOS model cannot be contextually overridden inside a DBOS workflow, it must be set at agent creation time.'
 )
 with super().override(
 name=name,
 deps=deps,
 model=model,
 toolsets=toolsets,
 tools=tools,
 instructions=instructions,
 ):
 yield
```
---|--- 
#### __init__
```
__init__(
 wrapped: AbstractAgent[](../agent/#pydantic_ai.agent.AbstractAgent "pydantic_ai.agent.AbstractAgent")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")],
 *,
 name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None,
 mcp_step_config: StepConfig[](#pydantic_ai.durable_exec.dbos.StepConfig "pydantic_ai.durable_exec.dbos._utils.StepConfig") | None = None,
 model_step_config: StepConfig[](#pydantic_ai.durable_exec.dbos.StepConfig "pydantic_ai.durable_exec.dbos._utils.StepConfig") | None = None
)
```
Wrap an agent to enable it with DBOS durable workflows, by automatically offloading model requests, tool calls, and MCP server communication to DBOS steps.
After wrapping, the original agent can still be used as normal outside of the DBOS workflow.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`wrapped` | `AbstractAgent[](../agent/#pydantic_ai.agent.AbstractAgent "pydantic_ai.agent.AbstractAgent")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]` | The agent to wrap. | _required_ 
`name` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional unique agent name to use as the DBOS configured instance name. If not provided, the agent's `name` will be used. | `None` 
`event_stream_handler` | `EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None` | Optional event stream handler to use instead of the one set on the wrapped agent. | `None` 
`mcp_step_config` | `StepConfig[](#pydantic_ai.durable_exec.dbos.StepConfig "pydantic_ai.durable_exec.dbos._utils.StepConfig") | None` | The base DBOS step config to use for MCP server steps. If no config is provided, use the default settings of DBOS. | `None` 
`model_step_config` | `StepConfig[](#pydantic_ai.durable_exec.dbos.StepConfig "pydantic_ai.durable_exec.dbos._utils.StepConfig") | None` | The DBOS step config to use for model request steps. If no config is provided, use the default settings of DBOS. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/dbos/_agent.py`
```
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
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
 82
 83
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
106
107
108
109
110
111
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
def__init__(
 self,
 wrapped: AbstractAgent[AgentDepsT, OutputDataT],
 *,
 name: str | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 mcp_step_config: StepConfig | None = None,
 model_step_config: StepConfig | None = None,
):
"""Wrap an agent to enable it with DBOS durable workflows, by automatically offloading model requests, tool calls, and MCP server communication to DBOS steps.
 After wrapping, the original agent can still be used as normal outside of the DBOS workflow.
 Args:
 wrapped: The agent to wrap.
 name: Optional unique agent name to use as the DBOS configured instance name. If not provided, the agent's `name` will be used.
 event_stream_handler: Optional event stream handler to use instead of the one set on the wrapped agent.
 mcp_step_config: The base DBOS step config to use for MCP server steps. If no config is provided, use the default settings of DBOS.
 model_step_config: The DBOS step config to use for model request steps. If no config is provided, use the default settings of DBOS.
 """
 super().__init__(wrapped)
 self._name = name or wrapped.name
 self._event_stream_handler = event_stream_handler
 if self._name is None:
 raise UserError(
 "An agent needs to have a unique `name` in order to be used with DBOS. The name will be used to identify the agent's workflows and steps."
 )
 # Merge the config with the default DBOS config
 self._mcp_step_config = mcp_step_config or {}
 self._model_step_config = model_step_config or {}
 if not isinstance(wrapped.model, Model):
 raise UserError(
 'An agent needs to have a `model` in order to be used with DBOS, it cannot be set at agent run time.'
 )
 dbos_model = DBOSModel(
 wrapped.model,
 step_name_prefix=self._name,
 step_config=self._model_step_config,
 event_stream_handler=self.event_stream_handler,
 )
 self._model = dbos_model
 dbosagent_name = self._name
 defdbosify_toolset(toolset: AbstractToolset[AgentDepsT]) -> AbstractToolset[AgentDepsT]:
 # Replace MCPServer with DBOSMCPServer
 try:
 frompydantic_ai.mcpimport MCPServer
 from._mcp_serverimport DBOSMCPServer
 except ImportError:
 pass
 else:
 if isinstance(toolset, MCPServer):
 return DBOSMCPServer(
 wrapped=toolset,
 step_name_prefix=dbosagent_name,
 step_config=self._mcp_step_config,
 )
 return toolset
 dbos_toolsets = [toolset.visit_and_replace(dbosify_toolset) for toolset in wrapped.toolsets]
 self._toolsets = dbos_toolsets
 DBOSConfiguredInstance.__init__(self, self._name)
 # Wrap the `run` method in a DBOS workflow
 @DBOS.workflow(name=f'{self._name}.run')
 async defwrapped_run_workflow(
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
 ) -> AgentRunResult[Any]:
 with self._dbos_overrides():
 return await super(WrapperAgent, self).run(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 event_stream_handler=event_stream_handler,
 **_deprecated_kwargs,
 )
 self.dbos_wrapped_run_workflow = wrapped_run_workflow
 # Wrap the `run_sync` method in a DBOS workflow
 @DBOS.workflow(name=f'{self._name}.run_sync')
 defwrapped_run_sync_workflow(
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
 ) -> AgentRunResult[Any]:
 with self._dbos_overrides():
 return super(DBOSAgent, self).run_sync(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 event_stream_handler=event_stream_handler,
 **_deprecated_kwargs,
 )
 self.dbos_wrapped_run_sync_workflow = wrapped_run_sync_workflow
```
---|--- 
#### run `async`
```
run(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None
) -> AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]
```
```
run(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")],
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None
) -> AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")]
```
```
run(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None,
 **_deprecated_kwargs: Never[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Never "typing_extensions.Never")
) -> AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
Run the agent with a user prompt in async mode.
This method builds an internal agent graph (using system prompts, tools and result schemas) and then runs the graph to completion. The result of the run is returned.
Example: 
```
frompydantic_aiimport Agent
agent = Agent('openai:gpt-4o')
async defmain():
 agent_run = await agent.run('What is the capital of France?')
 print(agent_run.output)
 #> The capital of France is Paris.
```
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`user_prompt` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None` | User input to start/continue the conversation. | `None` 
`output_type` | `OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools for this run. | `None` 
`event_stream_handler` | `EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None` | Optional event stream handler to use for this run. | `None` 
Returns:
Type | Description 
---|--- 
`AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]` | The result of the run. 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/dbos/_agent.py`
```
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
```
| ```
async defrun(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
) -> AgentRunResult[Any]:
"""Run the agent with a user prompt in async mode.
 This method builds an internal agent graph (using system prompts, tools and result schemas) and then
 runs the graph to completion. The result of the run is returned.
 Example:
```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 async def main():
 agent_run = await agent.run('What is the capital of France?')
 print(agent_run.output)
 #> The capital of France is Paris.
```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 event_stream_handler: Optional event stream handler to use for this run.
 Returns:
 The result of the run.
 """
 return await self.dbos_wrapped_run_workflow(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 event_stream_handler=event_stream_handler,
 **_deprecated_kwargs,
 )
```
---|--- 
#### run_sync
```
run_sync(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None
) -> AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]
```
```
run_sync(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")],
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None
) -> AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")]
```
```
run_sync(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None,
 **_deprecated_kwargs: Never[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Never "typing_extensions.Never")
) -> AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
Synchronously run the agent with a user prompt.
This is a convenience method that wraps [`self.run`](../agent/#pydantic_ai.agent.AbstractAgent.run) with `loop.run_until_complete(...)`. You therefore can't use this method inside async code or if there's an active event loop.
Example: 
```
frompydantic_aiimport Agent
agent = Agent('openai:gpt-4o')
result_sync = agent.run_sync('What is the capital of Italy?')
print(result_sync.output)
#> The capital of Italy is Rome.
```
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`user_prompt` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None` | User input to start/continue the conversation. | `None` 
`output_type` | `OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools for this run. | `None` 
`event_stream_handler` | `EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None` | Optional event stream handler to use for this run. | `None` 
Returns:
Type | Description 
---|--- 
`AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]` | The result of the run. 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/dbos/_agent.py`
```
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
```
| ```
defrun_sync(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
) -> AgentRunResult[Any]:
"""Synchronously run the agent with a user prompt.
 This is a convenience method that wraps [`self.run`][pydantic_ai.agent.AbstractAgent.run] with `loop.run_until_complete(...)`.
 You therefore can't use this method inside async code or if there's an active event loop.
 Example:
```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 result_sync = agent.run_sync('What is the capital of Italy?')
 print(result_sync.output)
 #> The capital of Italy is Rome.
```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 event_stream_handler: Optional event stream handler to use for this run.
 Returns:
 The result of the run.
 """
 return self.dbos_wrapped_run_sync_workflow(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 event_stream_handler=event_stream_handler,
 **_deprecated_kwargs,
 )
```
---|--- 
#### run_stream `async`
```
run_stream(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None
) -> AbstractAsyncContextManager[](https://docs.python.org/3/library/contextlib.html#contextlib.AbstractAsyncContextManager "contextlib.AbstractAsyncContextManager")[
 StreamedRunResult[](../result/#pydantic_ai.result.StreamedRunResult "pydantic_ai.result.StreamedRunResult")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]
]
```
```
run_stream(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")],
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None
) -> AbstractAsyncContextManager[](https://docs.python.org/3/library/contextlib.html#contextlib.AbstractAsyncContextManager "contextlib.AbstractAsyncContextManager")[
 StreamedRunResult[](../result/#pydantic_ai.result.StreamedRunResult "pydantic_ai.result.StreamedRunResult")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")]
]
```
```
run_stream(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None,
 **_deprecated_kwargs: Never[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Never "typing_extensions.Never")
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[StreamedRunResult[](../result/#pydantic_ai.result.StreamedRunResult "pydantic_ai.result.StreamedRunResult")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]
```
Run the agent with a user prompt in async mode, returning a streamed response.
Example: 
```
frompydantic_aiimport Agent
agent = Agent('openai:gpt-4o')
async defmain():
 async with agent.run_stream('What is the capital of the UK?') as response:
 print(await response.get_output())
 #> The capital of the UK is London.
```
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`user_prompt` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None` | User input to start/continue the conversation. | `None` 
`output_type` | `OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools for this run. | `None` 
`event_stream_handler` | `EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None` | Optional event stream handler to use for this run. It will receive all the events up until the final result is found, which you can then read or stream from inside the context manager. | `None` 
Returns:
Type | Description 
---|--- 
`AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[StreamedRunResult[](../result/#pydantic_ai.result.StreamedRunResult "pydantic_ai.result.StreamedRunResult")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]` | The result of the run. 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/dbos/_agent.py`
```
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
506
507
508
509
510
511
512
513
514
515
516
517
518
519
520
521
522
523
524
525
526
527
528
529
530
531
532
533
534
535
536
537
538
539
540
541
542
543
544
545
546
547
548
549
550
551
552
553
554
555
556
557
558
559
560
561
562
563
564
565
566
567
568
```
| ```
@asynccontextmanager
async defrun_stream(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
) -> AsyncIterator[StreamedRunResult[AgentDepsT, Any]]:
"""Run the agent with a user prompt in async mode, returning a streamed response.
 Example:
```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 async def main():
 async with agent.run_stream('What is the capital of the UK?') as response:
 print(await response.get_output())
 #> The capital of the UK is London.
```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 event_stream_handler: Optional event stream handler to use for this run. It will receive all the events up until the final result is found, which you can then read or stream from inside the context manager.
 Returns:
 The result of the run.
 """
 if DBOS.workflow_id is not None and DBOS.step_id is None:
 raise UserError(
 '`agent.run_stream()` cannot be used inside a DBOS workflow. '
 'Set an `event_stream_handler` on the agent and use `agent.run()` instead.'
 )
 async with super().run_stream(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 event_stream_handler=event_stream_handler,
 **_deprecated_kwargs,
 ) as result:
 yield result
```
---|--- 
#### run_stream_events
```
run_stream_events(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[
 AgentStreamEvent[](../messages/#pydantic_ai.messages.AgentStreamEvent "pydantic_ai.messages.AgentStreamEvent") | AgentRunResultEvent[](../run/#pydantic_ai.run.AgentRunResultEvent "pydantic_ai.AgentRunResultEvent")[OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]
]
```
```
run_stream_events(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")],
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[
 AgentStreamEvent[](../messages/#pydantic_ai.messages.AgentStreamEvent "pydantic_ai.messages.AgentStreamEvent") | AgentRunResultEvent[](../run/#pydantic_ai.run.AgentRunResultEvent "pydantic_ai.AgentRunResultEvent")[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")]
]
```
```
run_stream_events(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[
 AgentStreamEvent[](../messages/#pydantic_ai.messages.AgentStreamEvent "pydantic_ai.messages.AgentStreamEvent") | AgentRunResultEvent[](../run/#pydantic_ai.run.AgentRunResultEvent "pydantic_ai.AgentRunResultEvent")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
]
```
Run the agent with a user prompt in async mode and stream events from the run.
This is a convenience method that wraps [`self.run`](../agent/#pydantic_ai.agent.AbstractAgent.run) and uses the `event_stream_handler` kwarg to get a stream of events from the run.
Example: 
```
frompydantic_aiimport Agent, AgentRunResultEvent, AgentStreamEvent
agent = Agent('openai:gpt-4o')
async defmain():
 events: list[AgentStreamEvent | AgentRunResultEvent] = []
 async for event in agent.run_stream_events('What is the capital of France?'):
 events.append(event)
 print(events)
'''
 [
 PartStartEvent(index=0, part=TextPart(content='The capital of ')),
 FinalResultEvent(tool_name=None, tool_call_id=None),
 PartDeltaEvent(index=0, delta=TextPartDelta(content_delta='France is Paris. ')),
 PartEndEvent(
 index=0, part=TextPart(content='The capital of France is Paris. ')
 ),
 AgentRunResultEvent(
 result=AgentRunResult(output='The capital of France is Paris. ')
 ),
 ]
 '''
```
Arguments are the same as for [`self.run`](../agent/#pydantic_ai.agent.AbstractAgent.run), except that `event_stream_handler` is now allowed.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`user_prompt` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None` | User input to start/continue the conversation. | `None` 
`output_type` | `OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools for this run. | `None` 
Returns:
Type | Description 
---|--- 
`AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[AgentStreamEvent[](../messages/#pydantic_ai.messages.AgentStreamEvent "pydantic_ai.messages.AgentStreamEvent") | AgentRunResultEvent[](../run/#pydantic_ai.run.AgentRunResultEvent "pydantic_ai.AgentRunResultEvent")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]` | An async iterable of stream events `AgentStreamEvent` and finally a `AgentRunResultEvent` with the final 
`AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[AgentStreamEvent[](../messages/#pydantic_ai.messages.AgentStreamEvent "pydantic_ai.messages.AgentStreamEvent") | AgentRunResultEvent[](../run/#pydantic_ai.run.AgentRunResultEvent "pydantic_ai.AgentRunResultEvent")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]` | run result. 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/dbos/_agent.py`
```
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
633
634
635
636
637
638
639
640
641
642
643
644
645
646
647
648
649
650
651
652
653
654
655
656
657
658
659
660
661
662
663
664
665
666
667
668
669
670
671
672
673
674
675
676
677
678
```
| ```
defrun_stream_events(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
) -> AsyncIterator[_messages.AgentStreamEvent | AgentRunResultEvent[Any]]:
"""Run the agent with a user prompt in async mode and stream events from the run.
 This is a convenience method that wraps [`self.run`][pydantic_ai.agent.AbstractAgent.run] and
 uses the `event_stream_handler` kwarg to get a stream of events from the run.
 Example:
```python
 from pydantic_ai import Agent, AgentRunResultEvent, AgentStreamEvent
 agent = Agent('openai:gpt-4o')
 async def main():
 events: list[AgentStreamEvent | AgentRunResultEvent] = []
 async for event in agent.run_stream_events('What is the capital of France?'):
 events.append(event)
 print(events)
 '''
 [
 PartStartEvent(index=0, part=TextPart(content='The capital of ')),
 FinalResultEvent(tool_name=None, tool_call_id=None),
 PartDeltaEvent(index=0, delta=TextPartDelta(content_delta='France is Paris. ')),
 PartEndEvent(
 index=0, part=TextPart(content='The capital of France is Paris. ')
 ),
 AgentRunResultEvent(
 result=AgentRunResult(output='The capital of France is Paris. ')
 ),
 ]
 '''
```
 Arguments are the same as for [`self.run`][pydantic_ai.agent.AbstractAgent.run],
 except that `event_stream_handler` is now allowed.
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 An async iterable of stream events `AgentStreamEvent` and finally a `AgentRunResultEvent` with the final
 run result.
 """
 raise UserError(
 '`agent.run_stream_events()` cannot be used with DBOS. '
 'Set an `event_stream_handler` on the agent and use `agent.run()` instead.'
 )
```
---|--- 
#### iter `async`
```
iter(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 **_deprecated_kwargs: Never[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Never "typing_extensions.Never")
) -> AbstractAsyncContextManager[](https://docs.python.org/3/library/contextlib.html#contextlib.AbstractAsyncContextManager "contextlib.AbstractAsyncContextManager")[
 AgentRun[](../agent/#pydantic_ai.agent.AgentRun "pydantic_ai.agent.AgentRun")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]
]
```
```
iter(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")],
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 **_deprecated_kwargs: Never[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Never "typing_extensions.Never")
) -> AbstractAsyncContextManager[](https://docs.python.org/3/library/contextlib.html#contextlib.AbstractAsyncContextManager "contextlib.AbstractAsyncContextManager")[
 AgentRun[](../agent/#pydantic_ai.agent.AgentRun "pydantic_ai.agent.AgentRun")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")]
]
```
```
iter(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 **_deprecated_kwargs: Never[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Never "typing_extensions.Never")
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[AgentRun[](../agent/#pydantic_ai.agent.AgentRun "pydantic_ai.agent.AgentRun")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]
```
A contextmanager which can be used to iterate over the agent graph's nodes as they are executed.
This method builds an internal agent graph (using system prompts, tools and output schemas) and then returns an `AgentRun` object. The `AgentRun` can be used to async-iterate over the nodes of the graph as they are executed. This is the API to use if you want to consume the outputs coming from each LLM model response, or the stream of events coming from the execution of tools.
The `AgentRun` also provides methods to access the full message history, new messages, and usage statistics, and the final result of the run once it has completed.
For more details, see the documentation of `AgentRun`.
Example: 
```
frompydantic_aiimport Agent
agent = Agent('openai:gpt-4o')
async defmain():
 nodes = []
 async with agent.iter('What is the capital of France?') as agent_run:
 async for node in agent_run:
 nodes.append(node)
 print(nodes)
'''
 [
 UserPromptNode(
 user_prompt='What is the capital of France?',
 instructions_functions=[],
 system_prompts=(),
 system_prompt_functions=[],
 system_prompt_dynamic_functions={},
 ),
 ModelRequestNode(
 request=ModelRequest(
 parts=[
 UserPromptPart(
 content='What is the capital of France?',
 timestamp=datetime.datetime(...),
 )
 ]
 )
 ),
 CallToolsNode(
 model_response=ModelResponse(
 parts=[TextPart(content='The capital of France is Paris.')],
 usage=RequestUsage(input_tokens=56, output_tokens=7),
 model_name='gpt-4o',
 timestamp=datetime.datetime(...),
 )
 ),
 End(data=FinalResult(output='The capital of France is Paris.')),
 ]
 '''
 print(agent_run.result.output)
 #> The capital of France is Paris.
```
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`user_prompt` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None` | User input to start/continue the conversation. | `None` 
`output_type` | `OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools for this run. | `None` 
Returns:
Type | Description 
---|--- 
`AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[AgentRun[](../agent/#pydantic_ai.agent.AgentRun "pydantic_ai.agent.AgentRun")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]` | The result of the run. 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/dbos/_agent.py`
```
718
719
720
721
722
723
724
725
726
727
728
729
730
731
732
733
734
735
736
737
738
739
740
741
742
743
744
745
746
747
748
749
750
751
752
753
754
755
756
757
758
759
760
761
762
763
764
765
766
767
768
769
770
771
772
773
774
775
776
777
778
779
780
781
782
783
784
785
786
787
788
789
790
791
792
793
794
795
796
797
798
799
800
801
802
803
804
805
806
807
808
809
810
811
812
813
814
815
816
817
818
819
820
821
822
823
824
825
826
827
828
829
830
831
832
833
```
| ```
@asynccontextmanager
async defiter(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 **_deprecated_kwargs: Never,
) -> AsyncIterator[AgentRun[AgentDepsT, Any]]:
"""A contextmanager which can be used to iterate over the agent graph's nodes as they are executed.
 This method builds an internal agent graph (using system prompts, tools and output schemas) and then returns an
 `AgentRun` object. The `AgentRun` can be used to async-iterate over the nodes of the graph as they are
 executed. This is the API to use if you want to consume the outputs coming from each LLM model response, or the
 stream of events coming from the execution of tools.
 The `AgentRun` also provides methods to access the full message history, new messages, and usage statistics,
 and the final result of the run once it has completed.
 For more details, see the documentation of `AgentRun`.
 Example:
```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 async def main():
 nodes = []
 async with agent.iter('What is the capital of France?') as agent_run:
 async for node in agent_run:
 nodes.append(node)
 print(nodes)
 '''
 [
 UserPromptNode(
 user_prompt='What is the capital of France?',
 instructions_functions=[],
 system_prompts=(),
 system_prompt_functions=[],
 system_prompt_dynamic_functions={},
 ),
 ModelRequestNode(
 request=ModelRequest(
 parts=[
 UserPromptPart(
 content='What is the capital of France?',
 timestamp=datetime.datetime(...),
 )
 ]
 )
 ),
 CallToolsNode(
 model_response=ModelResponse(
 parts=[TextPart(content='The capital of France is Paris.')],
 usage=RequestUsage(input_tokens=56, output_tokens=7),
 model_name='gpt-4o',
 timestamp=datetime.datetime(...),
 )
 ),
 End(data=FinalResult(output='The capital of France is Paris.')),
 ]
 '''
 print(agent_run.result.output)
 #> The capital of France is Paris.
```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 The result of the run.
 """
 if model is not None and not isinstance(model, DBOSModel):
 raise UserError(
 'Non-DBOS model cannot be set at agent run time inside a DBOS workflow, it must be set at agent creation time.'
 )
 with self._dbos_overrides():
 async with super().iter(
 user_prompt=user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 **_deprecated_kwargs,
 ) as run:
 yield run
```
---|--- 
#### override
```
override(
 *,
 name: str[](https://docs.python.org/3/library/stdtypes.html#str) | Unset = UNSET,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") | Unset = UNSET,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | Unset = UNSET,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | Unset
 ) = UNSET,
 tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[
 Tool[](../tools/#pydantic_ai.tools.Tool "pydantic_ai.tools.Tool")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]
 | ToolFuncEither[](../tools/#pydantic_ai.tools.ToolFuncEither "pydantic_ai.tools.ToolFuncEither")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), ...]
 ]
 | Unset
 ) = UNSET,
 instructions: Instructions[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | Unset = UNSET
) -> Iterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Iterator "collections.abc.Iterator")[None]
```
Context manager to temporarily override agent name, dependencies, model, toolsets, tools, or instructions.
This is particularly useful when testing. You can find an example of this [here](../../testing/#overriding-model-via-pytest-fixtures).
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`name` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Unset` | The name to use instead of the name passed to the agent constructor and agent run. | `UNSET` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") | Unset` | The dependencies to use instead of the dependencies passed to the agent run. | `UNSET` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | Unset` | The model to use instead of the model passed to the agent run. | `UNSET` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | Unset` | The toolsets to use instead of the toolsets passed to the agent constructor and agent run. | `UNSET` 
`tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[Tool[](../tools/#pydantic_ai.tools.Tool "pydantic_ai.tools.Tool")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | ToolFuncEither[](../tools/#pydantic_ai.tools.ToolFuncEither "pydantic_ai.tools.ToolFuncEither")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), ...]] | Unset` | The tools to use instead of the tools registered with the agent. | `UNSET` 
`instructions` | `Instructions[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | Unset` | The instructions to use instead of the instructions registered with the agent. | `UNSET` 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/dbos/_agent.py`
```
835
836
837
838
839
840
841
842
843
844
845
846
847
848
849
850
851
852
853
854
855
856
857
858
859
860
861
862
863
864
865
866
867
868
869
870
871
872
```
| ```
@contextmanager
defoverride(
 self,
 *,
 name: str | _utils.Unset = _utils.UNSET,
 deps: AgentDepsT | _utils.Unset = _utils.UNSET,
 model: models.Model | models.KnownModelName | str | _utils.Unset = _utils.UNSET,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | _utils.Unset = _utils.UNSET,
 tools: Sequence[Tool[AgentDepsT] | ToolFuncEither[AgentDepsT, ...]] | _utils.Unset = _utils.UNSET,
 instructions: Instructions[AgentDepsT] | _utils.Unset = _utils.UNSET,
) -> Iterator[None]:
"""Context manager to temporarily override agent name, dependencies, model, toolsets, tools, or instructions.
 This is particularly useful when testing.
 You can find an example of this [here](../testing.md#overriding-model-via-pytest-fixtures).
 Args:
 name: The name to use instead of the name passed to the agent constructor and agent run.
 deps: The dependencies to use instead of the dependencies passed to the agent run.
 model: The model to use instead of the model passed to the agent run.
 toolsets: The toolsets to use instead of the toolsets passed to the agent constructor and agent run.
 tools: The tools to use instead of the tools registered with the agent.
 instructions: The instructions to use instead of the instructions registered with the agent.
 """
 if _utils.is_set(model) and not isinstance(model, (DBOSModel)):
 raise UserError(
 'Non-DBOS model cannot be contextually overridden inside a DBOS workflow, it must be set at agent creation time.'
 )
 with super().override(
 name=name,
 deps=deps,
 model=model,
 toolsets=toolsets,
 tools=tools,
 instructions=instructions,
 ):
 yield
```
---|--- 
### DBOSMCPServer
Bases: `WrapperToolset[](../toolsets/#pydantic_ai.toolsets.WrapperToolset "pydantic_ai.WrapperToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]`, `ABC[](https://docs.python.org/3/library/abc.html#abc.ABC "abc.ABC")`
A wrapper for MCPServer that integrates with DBOS, turning call_tool and get_tools to DBOS steps.
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/dbos/_mcp_server.py`
```
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
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
82
83
84
85
86
87
88
89
90
```
| ```
classDBOSMCPServer(WrapperToolset[AgentDepsT], ABC):
"""A wrapper for MCPServer that integrates with DBOS, turning call_tool and get_tools to DBOS steps."""
 def__init__(
 self,
 wrapped: MCPServer,
 *,
 step_name_prefix: str,
 step_config: StepConfig,
 ):
 super().__init__(wrapped)
 self._step_config = step_config or {}
 self._step_name_prefix = step_name_prefix
 id_suffix = f'__{wrapped.id}' if wrapped.id else ''
 self._name = f'{step_name_prefix}__mcp_server{id_suffix}'
 # Wrap get_tools in a DBOS step.
 @DBOS.step(
 name=f'{self._name}.get_tools',
 **self._step_config,
 )
 async defwrapped_get_tools_step(
 ctx: RunContext[AgentDepsT],
 ) -> dict[str, ToolsetTool[AgentDepsT]]:
 return await super(DBOSMCPServer, self).get_tools(ctx)
 self._dbos_wrapped_get_tools_step = wrapped_get_tools_step
 # Wrap call_tool in a DBOS step.
 @DBOS.step(
 name=f'{self._name}.call_tool',
 **self._step_config,
 )
 async defwrapped_call_tool_step(
 name: str,
 tool_args: dict[str, Any],
 ctx: RunContext[AgentDepsT],
 tool: ToolsetTool[AgentDepsT],
 ) -> ToolResult:
 return await super(DBOSMCPServer, self).call_tool(name, tool_args, ctx, tool)
 self._dbos_wrapped_call_tool_step = wrapped_call_tool_step
 @property
 defid(self) -> str | None:
 return self.wrapped.id
 async def__aenter__(self) -> Self:
 # The wrapped MCPServer enters itself around listing and calling tools
 # so we don't need to enter it here (nor could we because we're not inside a DBOS step).
 return self
 async def__aexit__(self, *args: Any) -> bool | None:
 return None
 defvisit_and_replace(
 self, visitor: Callable[[AbstractToolset[AgentDepsT]], AbstractToolset[AgentDepsT]]
 ) -> AbstractToolset[AgentDepsT]:
 # DBOS-ified toolsets cannot be swapped out after the fact.
 return self
 async defget_tools(self, ctx: RunContext[AgentDepsT]) -> dict[str, ToolsetTool[AgentDepsT]]:
 return await self._dbos_wrapped_get_tools_step(ctx)
 async defcall_tool(
 self,
 name: str,
 tool_args: dict[str, Any],
 ctx: RunContext[AgentDepsT],
 tool: ToolsetTool[AgentDepsT],
 ) -> ToolResult:
 return await self._dbos_wrapped_call_tool_step(name, tool_args, ctx, tool)
```
---|--- 
### DBOSModel
Bases: `WrapperModel[](../models/wrapper/#pydantic_ai.models.wrapper.WrapperModel "pydantic_ai.models.wrapper.WrapperModel")`
A wrapper for Model that integrates with DBOS, turning request and request_stream to DBOS steps.
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/dbos/_model.py`
```
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
 82
 83
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
106
107
108
109
110
111
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
```
| ```
classDBOSModel(WrapperModel):
"""A wrapper for Model that integrates with DBOS, turning request and request_stream to DBOS steps."""
 def__init__(
 self,
 model: Model,
 *,
 step_name_prefix: str,
 step_config: StepConfig,
 event_stream_handler: EventStreamHandler[Any] | None = None,
 ):
 super().__init__(model)
 self.step_config = step_config
 self.event_stream_handler = event_stream_handler
 self._step_name_prefix = step_name_prefix
 # Wrap the request in a DBOS step.
 @DBOS.step(
 name=f'{self._step_name_prefix}__model.request',
 **self.step_config,
 )
 async defwrapped_request_step(
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ) -> ModelResponse:
 return await super(DBOSModel, self).request(messages, model_settings, model_request_parameters)
 self._dbos_wrapped_request_step = wrapped_request_step
 # Wrap the request_stream in a DBOS step.
 @DBOS.step(
 name=f'{self._step_name_prefix}__model.request_stream',
 **self.step_config,
 )
 async defwrapped_request_stream_step(
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 run_context: RunContext[Any] | None = None,
 ) -> ModelResponse:
 async with super(DBOSModel, self).request_stream(
 messages, model_settings, model_request_parameters, run_context
 ) as streamed_response:
 if self.event_stream_handler is not None:
 assert run_context is not None, (
 'A DBOS model cannot be used with `pydantic_ai.direct.model_request_stream()` as it requires a `run_context`. Set an `event_stream_handler` on the agent and use `agent.run()` instead.'
 )
 await self.event_stream_handler(run_context, streamed_response)
 async for _ in streamed_response:
 pass
 return streamed_response.get()
 self._dbos_wrapped_request_stream_step = wrapped_request_stream_step
 async defrequest(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ) -> ModelResponse:
 return await self._dbos_wrapped_request_step(messages, model_settings, model_request_parameters)
 @asynccontextmanager
 async defrequest_stream(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 run_context: RunContext[Any] | None = None,
 ) -> AsyncIterator[StreamedResponse]:
 # If not in a workflow (could be in a step), just call the wrapped request_stream method.
 if DBOS.workflow_id is None or DBOS.step_id is not None:
 async with super().request_stream(
 messages, model_settings, model_request_parameters, run_context
 ) as streamed_response:
 yield streamed_response
 return
 response = await self._dbos_wrapped_request_stream_step(
 messages, model_settings, model_request_parameters, run_context
 )
 yield DBOSStreamedResponse(model_request_parameters, response)
```
---|--- 
### StepConfig
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
Configuration for a step in the DBOS workflow.
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/dbos/_utils.py`
```
 4
 5
 6
 7
 8
 9
10
```
| ```
classStepConfig(TypedDict, total=False):
"""Configuration for a step in the DBOS workflow."""
 retries_allowed: bool
 interval_seconds: float
 max_attempts: int
 backoff_rate: float
```
---|--- 
### PrefectAgent
Bases: `WrapperAgent[](../agent/#pydantic_ai.agent.WrapperAgent "pydantic_ai.agent.WrapperAgent")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]`
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/prefect/_agent.py`
```
 42
 43
 44
 45
 46
 47
 48
 49
 50
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
 82
 83
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
106
107
108
109
110
111
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
187
188
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
506
507
508
509
510
511
512
513
514
515
516
517
518
519
520
521
522
523
524
525
526
527
528
529
530
531
532
533
534
535
536
537
538
539
540
541
542
543
544
545
546
547
548
549
550
551
552
553
554
555
556
557
558
559
560
561
562
563
564
565
566
567
568
569
570
571
572
573
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
633
634
635
636
637
638
639
640
641
642
643
644
645
646
647
648
649
650
651
652
653
654
655
656
657
658
659
660
661
662
663
664
665
666
667
668
669
670
671
672
673
674
675
676
677
678
679
680
681
682
683
684
685
686
687
688
689
690
691
692
693
694
695
696
697
698
699
700
701
702
703
704
705
706
707
708
709
710
711
712
713
714
715
716
717
718
719
720
721
722
723
724
725
726
727
728
729
730
731
732
733
734
735
736
737
738
739
740
741
742
743
744
745
746
747
748
749
750
751
752
753
754
755
756
757
758
759
760
761
762
763
764
765
766
767
768
769
770
771
772
773
774
775
776
777
778
779
780
781
782
783
784
785
786
787
788
789
790
791
792
793
794
795
796
797
798
799
800
801
802
803
804
805
806
807
808
809
810
811
812
813
814
815
816
817
818
819
820
821
822
823
824
825
826
827
828
829
830
831
832
833
834
835
836
```
| ```
classPrefectAgent(WrapperAgent[AgentDepsT, OutputDataT]):
 def__init__(
 self,
 wrapped: AbstractAgent[AgentDepsT, OutputDataT],
 *,
 name: str | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 mcp_task_config: TaskConfig | None = None,
 model_task_config: TaskConfig | None = None,
 tool_task_config: TaskConfig | None = None,
 tool_task_config_by_name: dict[str, TaskConfig | None] | None = None,
 event_stream_handler_task_config: TaskConfig | None = None,
 prefectify_toolset_func: Callable[
 [AbstractToolset[AgentDepsT], TaskConfig, TaskConfig, dict[str, TaskConfig | None]],
 AbstractToolset[AgentDepsT],
 ] = prefectify_toolset,
 ):
"""Wrap an agent to enable it with Prefect durable flows, by automatically offloading model requests, tool calls, and MCP server communication to Prefect tasks.
 After wrapping, the original agent can still be used as normal outside of the Prefect flow.
 Args:
 wrapped: The agent to wrap.
 name: Optional unique agent name to use as the Prefect flow name prefix. If not provided, the agent's `name` will be used.
 event_stream_handler: Optional event stream handler to use instead of the one set on the wrapped agent.
 mcp_task_config: The base Prefect task config to use for MCP server tasks. If no config is provided, use the default settings of Prefect.
 model_task_config: The Prefect task config to use for model request tasks. If no config is provided, use the default settings of Prefect.
 tool_task_config: The default Prefect task config to use for tool calls. If no config is provided, use the default settings of Prefect.
 tool_task_config_by_name: Per-tool task configuration. Keys are tool names, values are TaskConfig or None (None disables task wrapping for that tool).
 event_stream_handler_task_config: The Prefect task config to use for the event stream handler task. If no config is provided, use the default settings of Prefect.
 prefectify_toolset_func: Optional function to use to prepare toolsets for Prefect by wrapping them in a `PrefectWrapperToolset` that moves methods that require IO to Prefect tasks.
 If not provided, only `FunctionToolset` and `MCPServer` will be prepared for Prefect.
 The function takes the toolset, the task config, the tool-specific task config, and the tool-specific task config by name.
 """
 super().__init__(wrapped)
 self._name = name or wrapped.name
 self._event_stream_handler = event_stream_handler
 if self._name is None:
 raise UserError(
 "An agent needs to have a unique `name` in order to be used with Prefect. The name will be used to identify the agent's flows and tasks."
 )
 # Merge the config with the default Prefect config
 self._mcp_task_config = default_task_config | (mcp_task_config or {})
 self._model_task_config = default_task_config | (model_task_config or {})
 self._tool_task_config = default_task_config | (tool_task_config or {})
 self._tool_task_config_by_name = tool_task_config_by_name or {}
 self._event_stream_handler_task_config = default_task_config | (event_stream_handler_task_config or {})
 if not isinstance(wrapped.model, Model):
 raise UserError(
 'An agent needs to have a `model` in order to be used with Prefect, it cannot be set at agent run time.'
 )
 prefect_model = PrefectModel(
 wrapped.model,
 task_config=self._model_task_config,
 event_stream_handler=self.event_stream_handler,
 )
 self._model = prefect_model
 def_prefectify_toolset(toolset: AbstractToolset[AgentDepsT]) -> AbstractToolset[AgentDepsT]:
"""Convert a toolset to its Prefect equivalent."""
 return prefectify_toolset_func(
 toolset,
 self._mcp_task_config,
 self._tool_task_config,
 self._tool_task_config_by_name,
 )
 prefect_toolsets = [toolset.visit_and_replace(_prefectify_toolset) for toolset in wrapped.toolsets]
 self._toolsets = prefect_toolsets
 # Context variable to track when we're inside this agent's Prefect flow
 self._in_prefect_agent_flow: ContextVar[bool] = ContextVar(
 f'_in_prefect_agent_flow_{self._name}', default=False
 )
 @property
 defname(self) -> str | None:
 return self._name
 @name.setter
 defname(self, value: str | None) -> None: # pragma: no cover
 raise UserError(
 'The agent name cannot be changed after creation. If you need to change the name, create a new agent.'
 )
 @property
 defmodel(self) -> Model:
 return self._model
 @property
 defevent_stream_handler(self) -> EventStreamHandler[AgentDepsT] | None:
 handler = self._event_stream_handler or super().event_stream_handler
 if handler is None:
 return None
 elif FlowRunContext.get() is not None:
 # Special case if it's in a Prefect flow, we need to iterate through all events and call the handler.
 return self._call_event_stream_handler_in_flow
 else:
 return handler
 async def_call_event_stream_handler_in_flow(
 self, ctx: RunContext[AgentDepsT], stream: AsyncIterable[_messages.AgentStreamEvent]
 ) -> None:
 handler = self._event_stream_handler or super().event_stream_handler
 assert handler is not None
 # Create a task to handle each event
 @task(name='Handle Stream Event', **self._event_stream_handler_task_config)
 async defevent_stream_handler_task(event: _messages.AgentStreamEvent) -> None:
 async defstreamed_response():
 yield event
 await handler(ctx, streamed_response())
 async for event in stream:
 await event_stream_handler_task(event)
 @property
 deftoolsets(self) -> Sequence[AbstractToolset[AgentDepsT]]:
 with self._prefect_overrides():
 return super().toolsets
 @contextmanager
 def_prefect_overrides(self) -> Iterator[None]:
 # Override with PrefectModel and PrefectMCPServer in the toolsets.
 with super().override(model=self._model, toolsets=self._toolsets, tools=[]):
 yield
 @overload
 async defrun(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 ) -> AgentRunResult[OutputDataT]: ...
 @overload
 async defrun(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT],
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 ) -> AgentRunResult[RunOutputDataT]: ...
 async defrun(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
 ) -> AgentRunResult[Any]:
"""Run the agent with a user prompt in async mode.
 This method builds an internal agent graph (using system prompts, tools and result schemas) and then
 runs the graph to completion. The result of the run is returned.
 Example:
 ```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 async def main():
 agent_run = await agent.run('What is the capital of France?')
 print(agent_run.output)
 #> The capital of France is Paris.
 ```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 event_stream_handler: Optional event stream handler to use for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 The result of the run.
 """
 @flow(name=f'{self._name} Run')
 async defwrapped_run_flow() -> AgentRunResult[Any]:
 # Mark that we're inside a PrefectAgent flow
 token = self._in_prefect_agent_flow.set(True)
 try:
 with self._prefect_overrides():
 result = await super(WrapperAgent, self).run(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 event_stream_handler=event_stream_handler,
 )
 return result
 finally:
 self._in_prefect_agent_flow.reset(token)
 return await wrapped_run_flow()
 @overload
 defrun_sync(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 ) -> AgentRunResult[OutputDataT]: ...
 @overload
 defrun_sync(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT],
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 ) -> AgentRunResult[RunOutputDataT]: ...
 defrun_sync(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
 ) -> AgentRunResult[Any]:
"""Synchronously run the agent with a user prompt.
 This is a convenience method that wraps [`self.run`][pydantic_ai.agent.AbstractAgent.run] with `loop.run_until_complete(...)`.
 You therefore can't use this method inside async code or if there's an active event loop.
 Example:
 ```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 result_sync = agent.run_sync('What is the capital of Italy?')
 print(result_sync.output)
 #> The capital of Italy is Rome.
 ```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 event_stream_handler: Optional event stream handler to use for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 The result of the run.
 """
 @flow(name=f'{self._name} Sync Run')
 defwrapped_run_sync_flow() -> AgentRunResult[Any]:
 # Mark that we're inside a PrefectAgent flow
 token = self._in_prefect_agent_flow.set(True)
 try:
 with self._prefect_overrides():
 # Using `run_coro_as_sync` from Prefect with async `run` to avoid event loop conflicts.
 result = run_coro_as_sync(
 super(PrefectAgent, self).run(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 event_stream_handler=event_stream_handler,
 )
 )
 return result
 finally:
 self._in_prefect_agent_flow.reset(token)
 return wrapped_run_sync_flow()
 @overload
 defrun_stream(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 ) -> AbstractAsyncContextManager[StreamedRunResult[AgentDepsT, OutputDataT]]: ...
 @overload
 defrun_stream(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT],
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 ) -> AbstractAsyncContextManager[StreamedRunResult[AgentDepsT, RunOutputDataT]]: ...
 @asynccontextmanager
 async defrun_stream(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
 ) -> AsyncIterator[StreamedRunResult[AgentDepsT, Any]]:
"""Run the agent with a user prompt in async mode, returning a streamed response.
 Example:
 ```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 async def main():
 async with agent.run_stream('What is the capital of the UK?') as response:
 print(await response.get_output())
 #> The capital of the UK is London.
 ```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 event_stream_handler: Optional event stream handler to use for this run. It will receive all the events up until the final result is found, which you can then read or stream from inside the context manager.
 Returns:
 The result of the run.
 """
 if FlowRunContext.get() is not None:
 raise UserError(
 '`agent.run_stream()` cannot be used inside a Prefect flow. '
 'Set an `event_stream_handler` on the agent and use `agent.run()` instead.'
 )
 async with super().run_stream(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 event_stream_handler=event_stream_handler,
 builtin_tools=builtin_tools,
 **_deprecated_kwargs,
 ) as result:
 yield result
 @overload
 defrun_stream_events(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 ) -> AsyncIterator[_messages.AgentStreamEvent | AgentRunResultEvent[OutputDataT]]: ...
 @overload
 defrun_stream_events(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT],
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 ) -> AsyncIterator[_messages.AgentStreamEvent | AgentRunResultEvent[RunOutputDataT]]: ...
 defrun_stream_events(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 ) -> AsyncIterator[_messages.AgentStreamEvent | AgentRunResultEvent[Any]]:
"""Run the agent with a user prompt in async mode and stream events from the run.
 This is a convenience method that wraps [`self.run`][pydantic_ai.agent.AbstractAgent.run] and
 uses the `event_stream_handler` kwarg to get a stream of events from the run.
 Example:
 ```python
 from pydantic_ai import Agent, AgentRunResultEvent, AgentStreamEvent
 agent = Agent('openai:gpt-4o')
 async def main():
 events: list[AgentStreamEvent | AgentRunResultEvent] = []
 async for event in agent.run_stream_events('What is the capital of France?'):
 events.append(event)
 print(events)
 '''
 [
 PartStartEvent(index=0, part=TextPart(content='The capital of ')),
 FinalResultEvent(tool_name=None, tool_call_id=None),
 PartDeltaEvent(index=0, delta=TextPartDelta(content_delta='France is Paris. ')),
 PartEndEvent(
 index=0, part=TextPart(content='The capital of France is Paris. ')
 ),
 AgentRunResultEvent(
 result=AgentRunResult(output='The capital of France is Paris. ')
 ),
 ]
 '''
 ```
 Arguments are the same as for [`self.run`][pydantic_ai.agent.AbstractAgent.run],
 except that `event_stream_handler` is now allowed.
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 An async iterable of stream events `AgentStreamEvent` and finally a `AgentRunResultEvent` with the final
 run result.
 """
 if FlowRunContext.get() is not None:
 raise UserError(
 '`agent.run_stream_events()` cannot be used inside a Prefect flow. '
 'Set an `event_stream_handler` on the agent and use `agent.run()` instead.'
 )
 return super().run_stream_events(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 )
 @overload
 defiter(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 ) -> AbstractAsyncContextManager[AgentRun[AgentDepsT, OutputDataT]]: ...
 @overload
 defiter(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT],
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 ) -> AbstractAsyncContextManager[AgentRun[AgentDepsT, RunOutputDataT]]: ...
 @asynccontextmanager
 async defiter(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 ) -> AsyncIterator[AgentRun[AgentDepsT, Any]]:
"""A contextmanager which can be used to iterate over the agent graph's nodes as they are executed.
 This method builds an internal agent graph (using system prompts, tools and output schemas) and then returns an
 `AgentRun` object. The `AgentRun` can be used to async-iterate over the nodes of the graph as they are
 executed. This is the API to use if you want to consume the outputs coming from each LLM model response, or the
 stream of events coming from the execution of tools.
 The `AgentRun` also provides methods to access the full message history, new messages, and usage statistics,
 and the final result of the run once it has completed.
 For more details, see the documentation of `AgentRun`.
 Example:
 ```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 async def main():
 nodes = []
 async with agent.iter('What is the capital of France?') as agent_run:
 async for node in agent_run:
 nodes.append(node)
 print(nodes)
 '''
 [
 UserPromptNode(
 user_prompt='What is the capital of France?',
 instructions_functions=[],
 system_prompts=(),
 system_prompt_functions=[],
 system_prompt_dynamic_functions={},
 ),
 ModelRequestNode(
 request=ModelRequest(
 parts=[
 UserPromptPart(
 content='What is the capital of France?',
 timestamp=datetime.datetime(...),
 )
 ]
 )
 ),
 CallToolsNode(
 model_response=ModelResponse(
 parts=[TextPart(content='The capital of France is Paris.')],
 usage=RequestUsage(input_tokens=56, output_tokens=7),
 model_name='gpt-4o',
 timestamp=datetime.datetime(...),
 )
 ),
 End(data=FinalResult(output='The capital of France is Paris.')),
 ]
 '''
 print(agent_run.result.output)
 #> The capital of France is Paris.
 ```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 The result of the run.
 """
 if model is not None and not isinstance(model, PrefectModel):
 raise UserError(
 'Non-Prefect model cannot be set at agent run time inside a Prefect flow, it must be set at agent creation time.'
 )
 with self._prefect_overrides():
 async with super().iter(
 user_prompt=user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 ) as run:
 yield run
 @contextmanager
 defoverride(
 self,
 *,
 name: str | _utils.Unset = _utils.UNSET,
 deps: AgentDepsT | _utils.Unset = _utils.UNSET,
 model: models.Model | models.KnownModelName | str | _utils.Unset = _utils.UNSET,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | _utils.Unset = _utils.UNSET,
 tools: Sequence[Tool[AgentDepsT] | ToolFuncEither[AgentDepsT, ...]] | _utils.Unset = _utils.UNSET,
 instructions: Instructions[AgentDepsT] | _utils.Unset = _utils.UNSET,
 ) -> Iterator[None]:
"""Context manager to temporarily override agent dependencies, model, toolsets, tools, or instructions.
 This is particularly useful when testing.
 You can find an example of this [here](../testing.md#overriding-model-via-pytest-fixtures).
 Args:
 name: The name to use instead of the name passed to the agent constructor and agent run.
 deps: The dependencies to use instead of the dependencies passed to the agent run.
 model: The model to use instead of the model passed to the agent run.
 toolsets: The toolsets to use instead of the toolsets passed to the agent constructor and agent run.
 tools: The tools to use instead of the tools registered with the agent.
 instructions: The instructions to use instead of the instructions registered with the agent.
 """
 if _utils.is_set(model) and not isinstance(model, PrefectModel):
 raise UserError(
 'Non-Prefect model cannot be contextually overridden inside a Prefect flow, it must be set at agent creation time.'
 )
 with super().override(
 name=name, deps=deps, model=model, toolsets=toolsets, tools=tools, instructions=instructions
 ):
 yield
```
---|--- 
#### __init__
```
__init__(
 wrapped: AbstractAgent[](../agent/#pydantic_ai.agent.AbstractAgent "pydantic_ai.agent.AbstractAgent")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")],
 *,
 name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None,
 mcp_task_config: TaskConfig[](#pydantic_ai.durable_exec.prefect.TaskConfig "pydantic_ai.durable_exec.prefect._types.TaskConfig") | None = None,
 model_task_config: TaskConfig[](#pydantic_ai.durable_exec.prefect.TaskConfig "pydantic_ai.durable_exec.prefect._types.TaskConfig") | None = None,
 tool_task_config: TaskConfig[](#pydantic_ai.durable_exec.prefect.TaskConfig "pydantic_ai.durable_exec.prefect._types.TaskConfig") | None = None,
 tool_task_config_by_name: (
 dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), TaskConfig[](#pydantic_ai.durable_exec.prefect.TaskConfig "pydantic_ai.durable_exec.prefect._types.TaskConfig") | None] | None
 ) = None,
 event_stream_handler_task_config: (
 TaskConfig[](#pydantic_ai.durable_exec.prefect.TaskConfig "pydantic_ai.durable_exec.prefect._types.TaskConfig") | None
 ) = None,
 prefectify_toolset_func: Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[
 [
 AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")],
 TaskConfig[](#pydantic_ai.durable_exec.prefect.TaskConfig "pydantic_ai.durable_exec.prefect._types.TaskConfig"),
 TaskConfig[](#pydantic_ai.durable_exec.prefect.TaskConfig "pydantic_ai.durable_exec.prefect._types.TaskConfig"),
 dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), TaskConfig[](#pydantic_ai.durable_exec.prefect.TaskConfig "pydantic_ai.durable_exec.prefect._types.TaskConfig") | None],
 ],
 AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")],
 ] = prefectify_toolset
)
```
Wrap an agent to enable it with Prefect durable flows, by automatically offloading model requests, tool calls, and MCP server communication to Prefect tasks.
After wrapping, the original agent can still be used as normal outside of the Prefect flow.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`wrapped` | `AbstractAgent[](../agent/#pydantic_ai.agent.AbstractAgent "pydantic_ai.agent.AbstractAgent")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]` | The agent to wrap. | _required_ 
`name` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional unique agent name to use as the Prefect flow name prefix. If not provided, the agent's `name` will be used. | `None` 
`event_stream_handler` | `EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None` | Optional event stream handler to use instead of the one set on the wrapped agent. | `None` 
`mcp_task_config` | `TaskConfig[](#pydantic_ai.durable_exec.prefect.TaskConfig "pydantic_ai.durable_exec.prefect._types.TaskConfig") | None` | The base Prefect task config to use for MCP server tasks. If no config is provided, use the default settings of Prefect. | `None` 
`model_task_config` | `TaskConfig[](#pydantic_ai.durable_exec.prefect.TaskConfig "pydantic_ai.durable_exec.prefect._types.TaskConfig") | None` | The Prefect task config to use for model request tasks. If no config is provided, use the default settings of Prefect. | `None` 
`tool_task_config` | `TaskConfig[](#pydantic_ai.durable_exec.prefect.TaskConfig "pydantic_ai.durable_exec.prefect._types.TaskConfig") | None` | The default Prefect task config to use for tool calls. If no config is provided, use the default settings of Prefect. | `None` 
`tool_task_config_by_name` | `dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), TaskConfig[](#pydantic_ai.durable_exec.prefect.TaskConfig "pydantic_ai.durable_exec.prefect._types.TaskConfig") | None] | None` | Per-tool task configuration. Keys are tool names, values are TaskConfig or None (None disables task wrapping for that tool). | `None` 
`event_stream_handler_task_config` | `TaskConfig[](#pydantic_ai.durable_exec.prefect.TaskConfig "pydantic_ai.durable_exec.prefect._types.TaskConfig") | None` | The Prefect task config to use for the event stream handler task. If no config is provided, use the default settings of Prefect. | `None` 
`prefectify_toolset_func` | `Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")], TaskConfig[](#pydantic_ai.durable_exec.prefect.TaskConfig "pydantic_ai.durable_exec.prefect._types.TaskConfig"), TaskConfig[](#pydantic_ai.durable_exec.prefect.TaskConfig "pydantic_ai.durable_exec.prefect._types.TaskConfig"), dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), TaskConfig[](#pydantic_ai.durable_exec.prefect.TaskConfig "pydantic_ai.durable_exec.prefect._types.TaskConfig") | None]], AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]]` | Optional function to use to prepare toolsets for Prefect by wrapping them in a `PrefectWrapperToolset` that moves methods that require IO to Prefect tasks. If not provided, only `FunctionToolset` and `MCPServer` will be prepared for Prefect. The function takes the toolset, the task config, the tool-specific task config, and the tool-specific task config by name. | `prefectify_toolset` 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/prefect/_agent.py`
```
 43
 44
 45
 46
 47
 48
 49
 50
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
 82
 83
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
106
107
108
109
110
111
112
113
114
115
116
117
118
119
```
| ```
def__init__(
 self,
 wrapped: AbstractAgent[AgentDepsT, OutputDataT],
 *,
 name: str | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 mcp_task_config: TaskConfig | None = None,
 model_task_config: TaskConfig | None = None,
 tool_task_config: TaskConfig | None = None,
 tool_task_config_by_name: dict[str, TaskConfig | None] | None = None,
 event_stream_handler_task_config: TaskConfig | None = None,
 prefectify_toolset_func: Callable[
 [AbstractToolset[AgentDepsT], TaskConfig, TaskConfig, dict[str, TaskConfig | None]],
 AbstractToolset[AgentDepsT],
 ] = prefectify_toolset,
):
"""Wrap an agent to enable it with Prefect durable flows, by automatically offloading model requests, tool calls, and MCP server communication to Prefect tasks.
 After wrapping, the original agent can still be used as normal outside of the Prefect flow.
 Args:
 wrapped: The agent to wrap.
 name: Optional unique agent name to use as the Prefect flow name prefix. If not provided, the agent's `name` will be used.
 event_stream_handler: Optional event stream handler to use instead of the one set on the wrapped agent.
 mcp_task_config: The base Prefect task config to use for MCP server tasks. If no config is provided, use the default settings of Prefect.
 model_task_config: The Prefect task config to use for model request tasks. If no config is provided, use the default settings of Prefect.
 tool_task_config: The default Prefect task config to use for tool calls. If no config is provided, use the default settings of Prefect.
 tool_task_config_by_name: Per-tool task configuration. Keys are tool names, values are TaskConfig or None (None disables task wrapping for that tool).
 event_stream_handler_task_config: The Prefect task config to use for the event stream handler task. If no config is provided, use the default settings of Prefect.
 prefectify_toolset_func: Optional function to use to prepare toolsets for Prefect by wrapping them in a `PrefectWrapperToolset` that moves methods that require IO to Prefect tasks.
 If not provided, only `FunctionToolset` and `MCPServer` will be prepared for Prefect.
 The function takes the toolset, the task config, the tool-specific task config, and the tool-specific task config by name.
 """
 super().__init__(wrapped)
 self._name = name or wrapped.name
 self._event_stream_handler = event_stream_handler
 if self._name is None:
 raise UserError(
 "An agent needs to have a unique `name` in order to be used with Prefect. The name will be used to identify the agent's flows and tasks."
 )
 # Merge the config with the default Prefect config
 self._mcp_task_config = default_task_config | (mcp_task_config or {})
 self._model_task_config = default_task_config | (model_task_config or {})
 self._tool_task_config = default_task_config | (tool_task_config or {})
 self._tool_task_config_by_name = tool_task_config_by_name or {}
 self._event_stream_handler_task_config = default_task_config | (event_stream_handler_task_config or {})
 if not isinstance(wrapped.model, Model):
 raise UserError(
 'An agent needs to have a `model` in order to be used with Prefect, it cannot be set at agent run time.'
 )
 prefect_model = PrefectModel(
 wrapped.model,
 task_config=self._model_task_config,
 event_stream_handler=self.event_stream_handler,
 )
 self._model = prefect_model
 def_prefectify_toolset(toolset: AbstractToolset[AgentDepsT]) -> AbstractToolset[AgentDepsT]:
"""Convert a toolset to its Prefect equivalent."""
 return prefectify_toolset_func(
 toolset,
 self._mcp_task_config,
 self._tool_task_config,
 self._tool_task_config_by_name,
 )
 prefect_toolsets = [toolset.visit_and_replace(_prefectify_toolset) for toolset in wrapped.toolsets]
 self._toolsets = prefect_toolsets
 # Context variable to track when we're inside this agent's Prefect flow
 self._in_prefect_agent_flow: ContextVar[bool] = ContextVar(
 f'_in_prefect_agent_flow_{self._name}', default=False
 )
```
---|--- 
#### run `async`
```
run(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None
) -> AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]
```
```
run(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")],
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None
) -> AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")]
```
```
run(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None,
 **_deprecated_kwargs: Never[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Never "typing_extensions.Never")
) -> AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
Run the agent with a user prompt in async mode.
This method builds an internal agent graph (using system prompts, tools and result schemas) and then runs the graph to completion. The result of the run is returned.
Example: 
```
frompydantic_aiimport Agent
agent = Agent('openai:gpt-4o')
async defmain():
 agent_run = await agent.run('What is the capital of France?')
 print(agent_run.output)
 #> The capital of France is Paris.
```
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`user_prompt` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None` | User input to start/continue the conversation. | `None` 
`output_type` | `OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`event_stream_handler` | `EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None` | Optional event stream handler to use for this run. | `None` 
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools for this run. | `None` 
Returns:
Type | Description 
---|--- 
`AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]` | The result of the run. 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/prefect/_agent.py`
```
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
```
| ```
async defrun(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
) -> AgentRunResult[Any]:
"""Run the agent with a user prompt in async mode.
 This method builds an internal agent graph (using system prompts, tools and result schemas) and then
 runs the graph to completion. The result of the run is returned.
 Example:
```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 async def main():
 agent_run = await agent.run('What is the capital of France?')
 print(agent_run.output)
 #> The capital of France is Paris.
```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 event_stream_handler: Optional event stream handler to use for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 The result of the run.
 """
 @flow(name=f'{self._name} Run')
 async defwrapped_run_flow() -> AgentRunResult[Any]:
 # Mark that we're inside a PrefectAgent flow
 token = self._in_prefect_agent_flow.set(True)
 try:
 with self._prefect_overrides():
 result = await super(WrapperAgent, self).run(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 event_stream_handler=event_stream_handler,
 )
 return result
 finally:
 self._in_prefect_agent_flow.reset(token)
 return await wrapped_run_flow()
```
---|--- 
#### run_sync
```
run_sync(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None
) -> AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]
```
```
run_sync(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")],
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None
) -> AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")]
```
```
run_sync(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None,
 **_deprecated_kwargs: Never[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Never "typing_extensions.Never")
) -> AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
Synchronously run the agent with a user prompt.
This is a convenience method that wraps [`self.run`](../agent/#pydantic_ai.agent.AbstractAgent.run) with `loop.run_until_complete(...)`. You therefore can't use this method inside async code or if there's an active event loop.
Example: 
```
frompydantic_aiimport Agent
agent = Agent('openai:gpt-4o')
result_sync = agent.run_sync('What is the capital of Italy?')
print(result_sync.output)
#> The capital of Italy is Rome.
```
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`user_prompt` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None` | User input to start/continue the conversation. | `None` 
`output_type` | `OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`event_stream_handler` | `EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None` | Optional event stream handler to use for this run. | `None` 
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools for this run. | `None` 
Returns:
Type | Description 
---|--- 
`AgentRunResult[](../agent/#pydantic_ai.agent.AgentRunResult "pydantic_ai.agent.AgentRunResult")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]` | The result of the run. 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/prefect/_agent.py`
```
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
```
| ```
defrun_sync(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
) -> AgentRunResult[Any]:
"""Synchronously run the agent with a user prompt.
 This is a convenience method that wraps [`self.run`][pydantic_ai.agent.AbstractAgent.run] with `loop.run_until_complete(...)`.
 You therefore can't use this method inside async code or if there's an active event loop.
 Example:
```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 result_sync = agent.run_sync('What is the capital of Italy?')
 print(result_sync.output)
 #> The capital of Italy is Rome.
```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 event_stream_handler: Optional event stream handler to use for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 The result of the run.
 """
 @flow(name=f'{self._name} Sync Run')
 defwrapped_run_sync_flow() -> AgentRunResult[Any]:
 # Mark that we're inside a PrefectAgent flow
 token = self._in_prefect_agent_flow.set(True)
 try:
 with self._prefect_overrides():
 # Using `run_coro_as_sync` from Prefect with async `run` to avoid event loop conflicts.
 result = run_coro_as_sync(
 super(PrefectAgent, self).run(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 event_stream_handler=event_stream_handler,
 )
 )
 return result
 finally:
 self._in_prefect_agent_flow.reset(token)
 return wrapped_run_sync_flow()
```
---|--- 
#### run_stream `async`
```
run_stream(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None
) -> AbstractAsyncContextManager[](https://docs.python.org/3/library/contextlib.html#contextlib.AbstractAsyncContextManager "contextlib.AbstractAsyncContextManager")[
 StreamedRunResult[](../result/#pydantic_ai.result.StreamedRunResult "pydantic_ai.result.StreamedRunResult")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]
]
```
```
run_stream(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")],
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None
) -> AbstractAsyncContextManager[](https://docs.python.org/3/library/contextlib.html#contextlib.AbstractAsyncContextManager "contextlib.AbstractAsyncContextManager")[
 StreamedRunResult[](../result/#pydantic_ai.result.StreamedRunResult "pydantic_ai.result.StreamedRunResult")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")]
]
```
```
run_stream(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 event_stream_handler: (
 EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
 ) = None,
 **_deprecated_kwargs: Never[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Never "typing_extensions.Never")
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[StreamedRunResult[](../result/#pydantic_ai.result.StreamedRunResult "pydantic_ai.result.StreamedRunResult")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]
```
Run the agent with a user prompt in async mode, returning a streamed response.
Example: 
```
frompydantic_aiimport Agent
agent = Agent('openai:gpt-4o')
async defmain():
 async with agent.run_stream('What is the capital of the UK?') as response:
 print(await response.get_output())
 #> The capital of the UK is London.
```
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`user_prompt` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None` | User input to start/continue the conversation. | `None` 
`output_type` | `OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools for this run. | `None` 
`event_stream_handler` | `EventStreamHandler[](../agent/#pydantic_ai.agent.EventStreamHandler "pydantic_ai.agent.EventStreamHandler")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None` | Optional event stream handler to use for this run. It will receive all the events up until the final result is found, which you can then read or stream from inside the context manager. | `None` 
Returns:
Type | Description 
---|--- 
`AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[StreamedRunResult[](../result/#pydantic_ai.result.StreamedRunResult "pydantic_ai.result.StreamedRunResult")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]` | The result of the run. 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/prefect/_agent.py`
```
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
506
507
508
509
510
511
512
513
514
515
516
517
518
519
520
521
522
523
524
525
526
```
| ```
@asynccontextmanager
async defrun_stream(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 event_stream_handler: EventStreamHandler[AgentDepsT] | None = None,
 **_deprecated_kwargs: Never,
) -> AsyncIterator[StreamedRunResult[AgentDepsT, Any]]:
"""Run the agent with a user prompt in async mode, returning a streamed response.
 Example:
```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 async def main():
 async with agent.run_stream('What is the capital of the UK?') as response:
 print(await response.get_output())
 #> The capital of the UK is London.
```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 event_stream_handler: Optional event stream handler to use for this run. It will receive all the events up until the final result is found, which you can then read or stream from inside the context manager.
 Returns:
 The result of the run.
 """
 if FlowRunContext.get() is not None:
 raise UserError(
 '`agent.run_stream()` cannot be used inside a Prefect flow. '
 'Set an `event_stream_handler` on the agent and use `agent.run()` instead.'
 )
 async with super().run_stream(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 event_stream_handler=event_stream_handler,
 builtin_tools=builtin_tools,
 **_deprecated_kwargs,
 ) as result:
 yield result
```
---|--- 
#### run_stream_events
```
run_stream_events(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[
 AgentStreamEvent[](../messages/#pydantic_ai.messages.AgentStreamEvent "pydantic_ai.messages.AgentStreamEvent") | AgentRunResultEvent[](../run/#pydantic_ai.run.AgentRunResultEvent "pydantic_ai.AgentRunResultEvent")[OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]
]
```
```
run_stream_events(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")],
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[
 AgentStreamEvent[](../messages/#pydantic_ai.messages.AgentStreamEvent "pydantic_ai.messages.AgentStreamEvent") | AgentRunResultEvent[](../run/#pydantic_ai.run.AgentRunResultEvent "pydantic_ai.AgentRunResultEvent")[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")]
]
```
```
run_stream_events(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[
 AgentStreamEvent[](../messages/#pydantic_ai.messages.AgentStreamEvent "pydantic_ai.messages.AgentStreamEvent") | AgentRunResultEvent[](../run/#pydantic_ai.run.AgentRunResultEvent "pydantic_ai.AgentRunResultEvent")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
]
```
Run the agent with a user prompt in async mode and stream events from the run.
This is a convenience method that wraps [`self.run`](../agent/#pydantic_ai.agent.AbstractAgent.run) and uses the `event_stream_handler` kwarg to get a stream of events from the run.
Example: 
```
frompydantic_aiimport Agent, AgentRunResultEvent, AgentStreamEvent
agent = Agent('openai:gpt-4o')
async defmain():
 events: list[AgentStreamEvent | AgentRunResultEvent] = []
 async for event in agent.run_stream_events('What is the capital of France?'):
 events.append(event)
 print(events)
'''
 [
 PartStartEvent(index=0, part=TextPart(content='The capital of ')),
 FinalResultEvent(tool_name=None, tool_call_id=None),
 PartDeltaEvent(index=0, delta=TextPartDelta(content_delta='France is Paris. ')),
 PartEndEvent(
 index=0, part=TextPart(content='The capital of France is Paris. ')
 ),
 AgentRunResultEvent(
 result=AgentRunResult(output='The capital of France is Paris. ')
 ),
 ]
 '''
```
Arguments are the same as for [`self.run`](../agent/#pydantic_ai.agent.AbstractAgent.run), except that `event_stream_handler` is now allowed.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`user_prompt` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None` | User input to start/continue the conversation. | `None` 
`output_type` | `OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools for this run. | `None` 
Returns:
Type | Description 
---|--- 
`AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[AgentStreamEvent[](../messages/#pydantic_ai.messages.AgentStreamEvent "pydantic_ai.messages.AgentStreamEvent") | AgentRunResultEvent[](../run/#pydantic_ai.run.AgentRunResultEvent "pydantic_ai.AgentRunResultEvent")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]` | An async iterable of stream events `AgentStreamEvent` and finally a `AgentRunResultEvent` with the final 
`AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[AgentStreamEvent[](../messages/#pydantic_ai.messages.AgentStreamEvent "pydantic_ai.messages.AgentStreamEvent") | AgentRunResultEvent[](../run/#pydantic_ai.run.AgentRunResultEvent "pydantic_ai.AgentRunResultEvent")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]` | run result. 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/prefect/_agent.py`
```
564
565
566
567
568
569
570
571
572
573
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
633
634
635
636
637
638
639
640
641
642
643
644
645
646
647
648
649
650
651
652
```
| ```
defrun_stream_events(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
) -> AsyncIterator[_messages.AgentStreamEvent | AgentRunResultEvent[Any]]:
"""Run the agent with a user prompt in async mode and stream events from the run.
 This is a convenience method that wraps [`self.run`][pydantic_ai.agent.AbstractAgent.run] and
 uses the `event_stream_handler` kwarg to get a stream of events from the run.
 Example:
```python
 from pydantic_ai import Agent, AgentRunResultEvent, AgentStreamEvent
 agent = Agent('openai:gpt-4o')
 async def main():
 events: list[AgentStreamEvent | AgentRunResultEvent] = []
 async for event in agent.run_stream_events('What is the capital of France?'):
 events.append(event)
 print(events)
 '''
 [
 PartStartEvent(index=0, part=TextPart(content='The capital of ')),
 FinalResultEvent(tool_name=None, tool_call_id=None),
 PartDeltaEvent(index=0, delta=TextPartDelta(content_delta='France is Paris. ')),
 PartEndEvent(
 index=0, part=TextPart(content='The capital of France is Paris. ')
 ),
 AgentRunResultEvent(
 result=AgentRunResult(output='The capital of France is Paris. ')
 ),
 ]
 '''
```
 Arguments are the same as for [`self.run`][pydantic_ai.agent.AbstractAgent.run],
 except that `event_stream_handler` is now allowed.
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 An async iterable of stream events `AgentStreamEvent` and finally a `AgentRunResultEvent` with the final
 run result.
 """
 if FlowRunContext.get() is not None:
 raise UserError(
 '`agent.run_stream_events()` cannot be used inside a Prefect flow. '
 'Set an `event_stream_handler` on the agent and use `agent.run()` instead.'
 )
 return super().run_stream_events(
 user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 )
```
---|--- 
#### iter `async`
```
iter(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None
) -> AbstractAsyncContextManager[](https://docs.python.org/3/library/contextlib.html#contextlib.AbstractAsyncContextManager "contextlib.AbstractAsyncContextManager")[
 AgentRun[](../agent/#pydantic_ai.agent.AgentRun "pydantic_ai.agent.AgentRun")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]
]
```
```
iter(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")],
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None
) -> AbstractAsyncContextManager[](https://docs.python.org/3/library/contextlib.html#contextlib.AbstractAsyncContextManager "contextlib.AbstractAsyncContextManager")[
 AgentRun[](../agent/#pydantic_ai.agent.AgentRun "pydantic_ai.agent.AgentRun")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")]
]
```
```
iter(
 user_prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[AgentRun[](../agent/#pydantic_ai.agent.AgentRun "pydantic_ai.agent.AgentRun")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]
```
A contextmanager which can be used to iterate over the agent graph's nodes as they are executed.
This method builds an internal agent graph (using system prompts, tools and output schemas) and then returns an `AgentRun` object. The `AgentRun` can be used to async-iterate over the nodes of the graph as they are executed. This is the API to use if you want to consume the outputs coming from each LLM model response, or the stream of events coming from the execution of tools.
The `AgentRun` also provides methods to access the full message history, new messages, and usage statistics, and the final result of the run once it has completed.
For more details, see the documentation of `AgentRun`.
Example: 
```
frompydantic_aiimport Agent
agent = Agent('openai:gpt-4o')
async defmain():
 nodes = []
 async with agent.iter('What is the capital of France?') as agent_run:
 async for node in agent_run:
 nodes.append(node)
 print(nodes)
'''
 [
 UserPromptNode(
 user_prompt='What is the capital of France?',
 instructions_functions=[],
 system_prompts=(),
 system_prompt_functions=[],
 system_prompt_dynamic_functions={},
 ),
 ModelRequestNode(
 request=ModelRequest(
 parts=[
 UserPromptPart(
 content='What is the capital of France?',
 timestamp=datetime.datetime(...),
 )
 ]
 )
 ),
 CallToolsNode(
 model_response=ModelResponse(
 parts=[TextPart(content='The capital of France is Paris.')],
 usage=RequestUsage(input_tokens=56, output_tokens=7),
 model_name='gpt-4o',
 timestamp=datetime.datetime(...),
 )
 ),
 End(data=FinalResult(output='The capital of France is Paris.')),
 ]
 '''
 print(agent_run.result.output)
 #> The capital of France is Paris.
```
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`user_prompt` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None` | User input to start/continue the conversation. | `None` 
`output_type` | `OutputSpec[RunOutputDataT[](../agent/#pydantic_ai.agent.RunOutputDataT "pydantic_ai.agent.abstract.RunOutputDataT")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.tools.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools for this run. | `None` 
Returns:
Type | Description 
---|--- 
`AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[AgentRun[](../agent/#pydantic_ai.agent.AgentRun "pydantic_ai.agent.AgentRun")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]` | The result of the run. 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/prefect/_agent.py`
```
690
691
692
693
694
695
696
697
698
699
700
701
702
703
704
705
706
707
708
709
710
711
712
713
714
715
716
717
718
719
720
721
722
723
724
725
726
727
728
729
730
731
732
733
734
735
736
737
738
739
740
741
742
743
744
745
746
747
748
749
750
751
752
753
754
755
756
757
758
759
760
761
762
763
764
765
766
767
768
769
770
771
772
773
774
775
776
777
778
779
780
781
782
783
784
785
786
787
788
789
790
791
792
793
794
795
796
797
798
799
800
801
802
```
| ```
@asynccontextmanager
async defiter(
 self,
 user_prompt: str | Sequence[_messages.UserContent] | None = None,
 *,
 output_type: OutputSpec[RunOutputDataT] | None = None,
 message_history: Sequence[_messages.ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: models.Model | models.KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: _usage.UsageLimits | None = None,
 usage: _usage.RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
) -> AsyncIterator[AgentRun[AgentDepsT, Any]]:
"""A contextmanager which can be used to iterate over the agent graph's nodes as they are executed.
 This method builds an internal agent graph (using system prompts, tools and output schemas) and then returns an
 `AgentRun` object. The `AgentRun` can be used to async-iterate over the nodes of the graph as they are
 executed. This is the API to use if you want to consume the outputs coming from each LLM model response, or the
 stream of events coming from the execution of tools.
 The `AgentRun` also provides methods to access the full message history, new messages, and usage statistics,
 and the final result of the run once it has completed.
 For more details, see the documentation of `AgentRun`.
 Example:
```python
 from pydantic_ai import Agent
 agent = Agent('openai:gpt-4o')
 async def main():
 nodes = []
 async with agent.iter('What is the capital of France?') as agent_run:
 async for node in agent_run:
 nodes.append(node)
 print(nodes)
 '''
 [
 UserPromptNode(
 user_prompt='What is the capital of France?',
 instructions_functions=[],
 system_prompts=(),
 system_prompt_functions=[],
 system_prompt_dynamic_functions={},
 ),
 ModelRequestNode(
 request=ModelRequest(
 parts=[
 UserPromptPart(
 content='What is the capital of France?',
 timestamp=datetime.datetime(...),
 )
 ]
 )
 ),
 CallToolsNode(
 model_response=ModelResponse(
 parts=[TextPart(content='The capital of France is Paris.')],
 usage=RequestUsage(input_tokens=56, output_tokens=7),
 model_name='gpt-4o',
 timestamp=datetime.datetime(...),
 )
 ),
 End(data=FinalResult(output='The capital of France is Paris.')),
 ]
 '''
 print(agent_run.result.output)
 #> The capital of France is Paris.
```
 Args:
 user_prompt: User input to start/continue the conversation.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 builtin_tools: Optional additional builtin tools for this run.
 Returns:
 The result of the run.
 """
 if model is not None and not isinstance(model, PrefectModel):
 raise UserError(
 'Non-Prefect model cannot be set at agent run time inside a Prefect flow, it must be set at agent creation time.'
 )
 with self._prefect_overrides():
 async with super().iter(
 user_prompt=user_prompt,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 deps=deps,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 ) as run:
 yield run
```
---|--- 
#### override
```
override(
 *,
 name: str[](https://docs.python.org/3/library/stdtypes.html#str) | Unset = UNSET,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") | Unset = UNSET,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | Unset = UNSET,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | Unset
 ) = UNSET,
 tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[
 Tool[](../tools/#pydantic_ai.tools.Tool "pydantic_ai.tools.Tool")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]
 | ToolFuncEither[](../tools/#pydantic_ai.tools.ToolFuncEither "pydantic_ai.tools.ToolFuncEither")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), ...]
 ]
 | Unset
 ) = UNSET,
 instructions: Instructions[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | Unset = UNSET
) -> Iterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Iterator "collections.abc.Iterator")[None]
```
Context manager to temporarily override agent dependencies, model, toolsets, tools, or instructions.
This is particularly useful when testing. You can find an example of this [here](../../testing/#overriding-model-via-pytest-fixtures).
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`name` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Unset` | The name to use instead of the name passed to the agent constructor and agent run. | `UNSET` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") | Unset` | The dependencies to use instead of the dependencies passed to the agent run. | `UNSET` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | Unset` | The model to use instead of the model passed to the agent run. | `UNSET` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | Unset` | The toolsets to use instead of the toolsets passed to the agent constructor and agent run. | `UNSET` 
`tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[Tool[](../tools/#pydantic_ai.tools.Tool "pydantic_ai.tools.Tool")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | ToolFuncEither[](../tools/#pydantic_ai.tools.ToolFuncEither "pydantic_ai.tools.ToolFuncEither")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), ...]] | Unset` | The tools to use instead of the tools registered with the agent. | `UNSET` 
`instructions` | `Instructions[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | Unset` | The instructions to use instead of the instructions registered with the agent. | `UNSET` 
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/prefect/_agent.py`
```
804
805
806
807
808
809
810
811
812
813
814
815
816
817
818
819
820
821
822
823
824
825
826
827
828
829
830
831
832
833
834
835
836
```
| ```
@contextmanager
defoverride(
 self,
 *,
 name: str | _utils.Unset = _utils.UNSET,
 deps: AgentDepsT | _utils.Unset = _utils.UNSET,
 model: models.Model | models.KnownModelName | str | _utils.Unset = _utils.UNSET,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | _utils.Unset = _utils.UNSET,
 tools: Sequence[Tool[AgentDepsT] | ToolFuncEither[AgentDepsT, ...]] | _utils.Unset = _utils.UNSET,
 instructions: Instructions[AgentDepsT] | _utils.Unset = _utils.UNSET,
) -> Iterator[None]:
"""Context manager to temporarily override agent dependencies, model, toolsets, tools, or instructions.
 This is particularly useful when testing.
 You can find an example of this [here](../testing.md#overriding-model-via-pytest-fixtures).
 Args:
 name: The name to use instead of the name passed to the agent constructor and agent run.
 deps: The dependencies to use instead of the dependencies passed to the agent run.
 model: The model to use instead of the model passed to the agent run.
 toolsets: The toolsets to use instead of the toolsets passed to the agent constructor and agent run.
 tools: The tools to use instead of the tools registered with the agent.
 instructions: The instructions to use instead of the instructions registered with the agent.
 """
 if _utils.is_set(model) and not isinstance(model, PrefectModel):
 raise UserError(
 'Non-Prefect model cannot be contextually overridden inside a Prefect flow, it must be set at agent creation time.'
 )
 with super().override(
 name=name, deps=deps, model=model, toolsets=toolsets, tools=tools, instructions=instructions
 ):
 yield
```
---|--- 
### PrefectFunctionToolset
Bases: `PrefectWrapperToolset[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]`
A wrapper for FunctionToolset that integrates with Prefect, turning tool calls into Prefect tasks.
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/prefect/_function_toolset.py`
```
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
```
| ```
classPrefectFunctionToolset(PrefectWrapperToolset[AgentDepsT]):
"""A wrapper for FunctionToolset that integrates with Prefect, turning tool calls into Prefect tasks."""
 def__init__(
 self,
 wrapped: FunctionToolset[AgentDepsT],
 *,
 task_config: TaskConfig,
 tool_task_config: dict[str, TaskConfig | None],
 ):
 super().__init__(wrapped)
 self._task_config = default_task_config | (task_config or {})
 self._tool_task_config = tool_task_config or {}
 @task
 async def_call_tool_task(
 tool_name: str,
 tool_args: dict[str, Any],
 ctx: RunContext[AgentDepsT],
 tool: ToolsetTool[AgentDepsT],
 ) -> Any:
 return await super(PrefectFunctionToolset, self).call_tool(tool_name, tool_args, ctx, tool)
 self._call_tool_task = _call_tool_task
 async defcall_tool(
 self,
 name: str,
 tool_args: dict[str, Any],
 ctx: RunContext[AgentDepsT],
 tool: ToolsetTool[AgentDepsT],
 ) -> Any:
"""Call a tool, wrapped as a Prefect task with a descriptive name."""
 # Check if this specific tool has custom config or is disabled
 tool_specific_config = self._tool_task_config.get(name, default_task_config)
 if tool_specific_config is None:
 # None means this tool should not be wrapped as a task
 return await super().call_tool(name, tool_args, ctx, tool)
 # Merge tool-specific config with default config
 merged_config = self._task_config | tool_specific_config
 return await self._call_tool_task.with_options(name=f'Call Tool: {name}', **merged_config)(
 name, tool_args, ctx, tool
 )
```
---|--- 
#### call_tool `async`
```
call_tool(
 name: str[](https://docs.python.org/3/library/stdtypes.html#str),
 tool_args: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")],
 ctx: RunContext[](../tools/#pydantic_ai.tools.RunContext "pydantic_ai.tools.RunContext")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")],
 tool: ToolsetTool[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")],
) -> Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")
```
Call a tool, wrapped as a Prefect task with a descriptive name.
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/prefect/_function_toolset.py`
```
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
```
| ```
async defcall_tool(
 self,
 name: str,
 tool_args: dict[str, Any],
 ctx: RunContext[AgentDepsT],
 tool: ToolsetTool[AgentDepsT],
) -> Any:
"""Call a tool, wrapped as a Prefect task with a descriptive name."""
 # Check if this specific tool has custom config or is disabled
 tool_specific_config = self._tool_task_config.get(name, default_task_config)
 if tool_specific_config is None:
 # None means this tool should not be wrapped as a task
 return await super().call_tool(name, tool_args, ctx, tool)
 # Merge tool-specific config with default config
 merged_config = self._task_config | tool_specific_config
 return await self._call_tool_task.with_options(name=f'Call Tool: {name}', **merged_config)(
 name, tool_args, ctx, tool
 )
```
---|--- 
### PrefectMCPServer
Bases: `PrefectWrapperToolset[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]`, `ABC[](https://docs.python.org/3/library/abc.html#abc.ABC "abc.ABC")`
A wrapper for MCPServer that integrates with Prefect, turning call_tool and get_tools into Prefect tasks.
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/prefect/_mcp_server.py`
```
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
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
```
| ```
classPrefectMCPServer(PrefectWrapperToolset[AgentDepsT], ABC):
"""A wrapper for MCPServer that integrates with Prefect, turning call_tool and get_tools into Prefect tasks."""
 def__init__(
 self,
 wrapped: MCPServer,
 *,
 task_config: TaskConfig,
 ):
 super().__init__(wrapped)
 self._task_config = default_task_config | (task_config or {})
 self._mcp_id = wrapped.id
 @task
 async def_call_tool_task(
 tool_name: str,
 tool_args: dict[str, Any],
 ctx: RunContext[AgentDepsT],
 tool: ToolsetTool[AgentDepsT],
 ) -> ToolResult:
 return await super(PrefectMCPServer, self).call_tool(tool_name, tool_args, ctx, tool)
 self._call_tool_task = _call_tool_task
 async def__aenter__(self) -> Self:
 await self.wrapped.__aenter__()
 return self
 async def__aexit__(self, *args: Any) -> bool | None:
 return await self.wrapped.__aexit__(*args)
 async defcall_tool(
 self,
 name: str,
 tool_args: dict[str, Any],
 ctx: RunContext[AgentDepsT],
 tool: ToolsetTool[AgentDepsT],
 ) -> ToolResult:
"""Call an MCP tool, wrapped as a Prefect task with a descriptive name."""
 return await self._call_tool_task.with_options(name=f'Call MCP Tool: {name}', **self._task_config)(
 name, tool_args, ctx, tool
 )
```
---|--- 
#### call_tool `async`
```
call_tool(
 name: str[](https://docs.python.org/3/library/stdtypes.html#str),
 tool_args: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")],
 ctx: RunContext[](../tools/#pydantic_ai.tools.RunContext "pydantic_ai.tools.RunContext")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")],
 tool: ToolsetTool[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")],
) -> ToolResult
```
Call an MCP tool, wrapped as a Prefect task with a descriptive name.
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/prefect/_mcp_server.py`
```
50
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
```
| ```
async defcall_tool(
 self,
 name: str,
 tool_args: dict[str, Any],
 ctx: RunContext[AgentDepsT],
 tool: ToolsetTool[AgentDepsT],
) -> ToolResult:
"""Call an MCP tool, wrapped as a Prefect task with a descriptive name."""
 return await self._call_tool_task.with_options(name=f'Call MCP Tool: {name}', **self._task_config)(
 name, tool_args, ctx, tool
 )
```
---|--- 
### PrefectModel
Bases: `WrapperModel[](../models/wrapper/#pydantic_ai.models.wrapper.WrapperModel "pydantic_ai.models.wrapper.WrapperModel")`
A wrapper for Model that integrates with Prefect, turning request and request_stream into Prefect tasks.
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/prefect/_model.py`
```
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
 82
 83
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
106
107
108
109
110
111
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
```
| ```
classPrefectModel(WrapperModel):
"""A wrapper for Model that integrates with Prefect, turning request and request_stream into Prefect tasks."""
 def__init__(
 self,
 model: Any,
 *,
 task_config: TaskConfig,
 event_stream_handler: EventStreamHandler[Any] | None = None,
 ):
 super().__init__(model)
 self.task_config = default_task_config | (task_config or {})
 self.event_stream_handler = event_stream_handler
 @task
 async defwrapped_request(
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ) -> ModelResponse:
 response = await super(PrefectModel, self).request(messages, model_settings, model_request_parameters)
 return response
 self._wrapped_request = wrapped_request
 @task
 async defrequest_stream_task(
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ctx: RunContext[Any] | None,
 ) -> ModelResponse:
 async with super(PrefectModel, self).request_stream(
 messages, model_settings, model_request_parameters, ctx
 ) as streamed_response:
 if self.event_stream_handler is not None:
 assert ctx is not None, (
 'A Prefect model cannot be used with `pydantic_ai.direct.model_request_stream()` as it requires a `run_context`. '
 'Set an `event_stream_handler` on the agent and use `agent.run()` instead.'
 )
 await self.event_stream_handler(ctx, streamed_response)
 # Consume the entire stream
 async for _ in streamed_response:
 pass
 response = streamed_response.get()
 return response
 self._wrapped_request_stream = request_stream_task
 async defrequest(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ) -> ModelResponse:
"""Make a model request, wrapped as a Prefect task when in a flow."""
 return await self._wrapped_request.with_options(
 name=f'Model Request: {self.wrapped.model_name}', **self.task_config
 )(messages, model_settings, model_request_parameters)
 @asynccontextmanager
 async defrequest_stream(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 run_context: RunContext[Any] | None = None,
 ) -> AsyncIterator[StreamedResponse]:
"""Make a streaming model request.
 When inside a Prefect flow, the stream is consumed within a task and
 a non-streaming response is returned. When not in a flow, behaves normally.
 """
 # Check if we're in a flow context
 flow_run_context = FlowRunContext.get()
 # If not in a flow, just call the wrapped request_stream method
 if flow_run_context is None:
 async with super().request_stream(
 messages, model_settings, model_request_parameters, run_context
 ) as streamed_response:
 yield streamed_response
 return
 # If in a flow, consume the stream in a task and return the final response
 response = await self._wrapped_request_stream.with_options(
 name=f'Model Request (Streaming): {self.wrapped.model_name}', **self.task_config
 )(messages, model_settings, model_request_parameters, run_context)
 yield PrefectStreamedResponse(model_request_parameters, response)
```
---|--- 
#### request `async`
```
request(
 messages: list[](https://docs.python.org/3/library/stdtypes.html#list)[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.ModelMessage")],
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None,
 model_request_parameters: ModelRequestParameters[](../models/base/#pydantic_ai.models.ModelRequestParameters "pydantic_ai.models.ModelRequestParameters"),
) -> ModelResponse[](../messages/#pydantic_ai.messages.ModelResponse "pydantic_ai.ModelResponse")
```
Make a model request, wrapped as a Prefect task when in a flow.
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/prefect/_model.py`
```
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
```
| ```
async defrequest(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
) -> ModelResponse:
"""Make a model request, wrapped as a Prefect task when in a flow."""
 return await self._wrapped_request.with_options(
 name=f'Model Request: {self.wrapped.model_name}', **self.task_config
 )(messages, model_settings, model_request_parameters)
```
---|--- 
#### request_stream `async`
```
request_stream(
 messages: list[](https://docs.python.org/3/library/stdtypes.html#list)[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.ModelMessage")],
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None,
 model_request_parameters: ModelRequestParameters[](../models/base/#pydantic_ai.models.ModelRequestParameters "pydantic_ai.models.ModelRequestParameters"),
 run_context: RunContext[](../tools/#pydantic_ai.tools.RunContext "pydantic_ai.tools.RunContext")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = None,
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[StreamedResponse[](../models/base/#pydantic_ai.models.StreamedResponse "pydantic_ai.models.StreamedResponse")]
```
Make a streaming model request.
When inside a Prefect flow, the stream is consumed within a task and a non-streaming response is returned. When not in a flow, behaves normally.
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/prefect/_model.py`
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
```
| ```
@asynccontextmanager
async defrequest_stream(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 run_context: RunContext[Any] | None = None,
) -> AsyncIterator[StreamedResponse]:
"""Make a streaming model request.
 When inside a Prefect flow, the stream is consumed within a task and
 a non-streaming response is returned. When not in a flow, behaves normally.
 """
 # Check if we're in a flow context
 flow_run_context = FlowRunContext.get()
 # If not in a flow, just call the wrapped request_stream method
 if flow_run_context is None:
 async with super().request_stream(
 messages, model_settings, model_request_parameters, run_context
 ) as streamed_response:
 yield streamed_response
 return
 # If in a flow, consume the stream in a task and return the final response
 response = await self._wrapped_request_stream.with_options(
 name=f'Model Request (Streaming): {self.wrapped.model_name}', **self.task_config
 )(messages, model_settings, model_request_parameters, run_context)
 yield PrefectStreamedResponse(model_request_parameters, response)
```
---|--- 
### TaskConfig
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
Configuration for a task in Prefect.
These options are passed to the `@task` decorator.
Source code in `pydantic_ai_slim/pydantic_ai/durable_exec/prefect/_types.py`
```
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
```
| ```
classTaskConfig(TypedDict, total=False):
"""Configuration for a task in Prefect.
 These options are passed to the `@task` decorator.
 """
 retries: int
"""Maximum number of retries for the task."""
 retry_delay_seconds: float | list[float]
"""Delay between retries in seconds. Can be a single value or a list for custom backoff."""
 timeout_seconds: float
"""Maximum time in seconds for the task to complete."""
 cache_policy: CachePolicy
"""Prefect cache policy for the task."""
 persist_result: bool
"""Whether to persist the task result."""
 result_storage: ResultStorage
"""Prefect result storage for the task. Should be a storage block or a block slug like `s3-bucket/my-storage`."""
 log_prints: bool
"""Whether to log print statements from the task."""
```
---|--- 
#### retries `instance-attribute`
```
retries: int[](https://docs.python.org/3/library/functions.html#int)
```
Maximum number of retries for the task.
#### retry_delay_seconds `instance-attribute`
```
retry_delay_seconds: float[](https://docs.python.org/3/library/functions.html#float) | list[](https://docs.python.org/3/library/stdtypes.html#list)[float[](https://docs.python.org/3/library/functions.html#float)]
```
Delay between retries in seconds. Can be a single value or a list for custom backoff.
#### timeout_seconds `instance-attribute`
```
timeout_seconds: float[](https://docs.python.org/3/library/functions.html#float)
```
Maximum time in seconds for the task to complete.
#### cache_policy `instance-attribute`
```
cache_policy: CachePolicy
```
Prefect cache policy for the task.
#### persist_result `instance-attribute`
```
persist_result: bool[](https://docs.python.org/3/library/functions.html#bool)
```
Whether to persist the task result.
#### result_storage `instance-attribute`
```
result_storage: ResultStorage
```
Prefect result storage for the task. Should be a storage block or a block slug like `s3-bucket/my-storage`.
#### log_prints `instance-attribute`
```
log_prints: bool[](https://docs.python.org/3/library/functions.html#bool)
```
Whether to log print statements from the task.