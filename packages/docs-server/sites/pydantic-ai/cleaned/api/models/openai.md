[ Skip to content ](#pydantic_aimodelsopenai)
# `pydantic_ai.models.openai`
## Setup
For details on how to set up authentication with this model, see [model configuration for OpenAI](../../../models/openai/).
### OpenAIModelName `module-attribute`
```
OpenAIModelName = str[](https://docs.python.org/3/library/stdtypes.html#str) | AllModels
```
Possible OpenAI model names.
Since OpenAI supports a variety of date-stamped models, we explicitly list the latest models but allow any name in the type hints. See [the OpenAI docs](https://platform.openai.com/docs/models) for a full list.
Using this more broad type for the model name instead of the ChatModel definition allows this model to be used more easily with other model types (ie, Ollama, Deepseek).
### OpenAIChatModelSettings
Bases: `ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings")`
Settings used for an OpenAI model request.
Source code in `pydantic_ai_slim/pydantic_ai/models/openai.py`
```
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
```
| ```
classOpenAIChatModelSettings(ModelSettings, total=False):
"""Settings used for an OpenAI model request."""
 # ALL FIELDS MUST BE `openai_` PREFIXED SO YOU CAN MERGE THEM WITH OTHER MODELS.
 openai_reasoning_effort: ReasoningEffort
"""Constrains effort on reasoning for [reasoning models](https://platform.openai.com/docs/guides/reasoning).
 Currently supported values are `low`, `medium`, and `high`. Reducing reasoning effort can
 result in faster responses and fewer tokens used on reasoning in a response.
 """
 openai_logprobs: bool
"""Include log probabilities in the response."""
 openai_top_logprobs: int
"""Include log probabilities of the top n tokens in the response."""
 openai_user: str
"""A unique identifier representing the end-user, which can help OpenAI monitor and detect abuse.
 See [OpenAI's safety best practices](https://platform.openai.com/docs/guides/safety-best-practices#end-user-ids) for more details.
 """
 openai_service_tier: Literal['auto', 'default', 'flex', 'priority']
"""The service tier to use for the model request.
 Currently supported values are `auto`, `default`, `flex`, and `priority`.
 For more information, see [OpenAI's service tiers documentation](https://platform.openai.com/docs/api-reference/chat/object#chat/object-service_tier).
 """
 openai_prediction: ChatCompletionPredictionContentParam
"""Enables [predictive outputs](https://platform.openai.com/docs/guides/predicted-outputs).
 This feature is currently only supported for some OpenAI models.
 """
```
---|--- 
#### openai_reasoning_effort `instance-attribute`
```
openai_reasoning_effort: ReasoningEffort
```
Constrains effort on reasoning for [reasoning models](https://platform.openai.com/docs/guides/reasoning).
Currently supported values are `low`, `medium`, and `high`. Reducing reasoning effort can result in faster responses and fewer tokens used on reasoning in a response.
#### openai_logprobs `instance-attribute`
```
openai_logprobs: bool[](https://docs.python.org/3/library/functions.html#bool)
```
Include log probabilities in the response.
#### openai_top_logprobs `instance-attribute`
```
openai_top_logprobs: int[](https://docs.python.org/3/library/functions.html#int)
```
Include log probabilities of the top n tokens in the response.
#### openai_user `instance-attribute`
```
openai_user: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
A unique identifier representing the end-user, which can help OpenAI monitor and detect abuse.
See [OpenAI's safety best practices](https://platform.openai.com/docs/guides/safety-best-practices#end-user-ids) for more details.
#### openai_service_tier `instance-attribute`
```
openai_service_tier: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[
 "auto", "default", "flex", "priority"
]
```
The service tier to use for the model request.
Currently supported values are `auto`, `default`, `flex`, and `priority`. For more information, see [OpenAI's service tiers documentation](https://platform.openai.com/docs/api-reference/chat/object#chat/object-service_tier).
#### openai_prediction `instance-attribute`
```
openai_prediction: ChatCompletionPredictionContentParam
```
Enables [predictive outputs](https://platform.openai.com/docs/guides/predicted-outputs).
This feature is currently only supported for some OpenAI models.
### OpenAIModelSettings `deprecated`
Bases: `OpenAIChatModelSettings[](#pydantic_ai.models.openai.OpenAIChatModelSettings "pydantic_ai.models.openai.OpenAIChatModelSettings")`
Deprecated
Use `OpenAIChatModelSettings` instead.
Deprecated alias for `OpenAIChatModelSettings`.
Source code in `pydantic_ai_slim/pydantic_ai/models/openai.py`
```
176
177
178
```
| ```
@deprecated('Use `OpenAIChatModelSettings` instead.')
classOpenAIModelSettings(OpenAIChatModelSettings, total=False):
"""Deprecated alias for `OpenAIChatModelSettings`."""
```
---|--- 
### OpenAIResponsesModelSettings
Bases: `OpenAIChatModelSettings[](#pydantic_ai.models.openai.OpenAIChatModelSettings "pydantic_ai.models.openai.OpenAIChatModelSettings")`
Settings used for an OpenAI Responses model request.
ALL FIELDS MUST BE `openai_` PREFIXED SO YOU CAN MERGE THEM WITH OTHER MODELS.
Source code in `pydantic_ai_slim/pydantic_ai/models/openai.py`
```
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
```
| ```
classOpenAIResponsesModelSettings(OpenAIChatModelSettings, total=False):
"""Settings used for an OpenAI Responses model request.
 ALL FIELDS MUST BE `openai_` PREFIXED SO YOU CAN MERGE THEM WITH OTHER MODELS.
 """
 openai_builtin_tools: Sequence[FileSearchToolParam | WebSearchToolParam | ComputerToolParam]
"""The provided OpenAI built-in tools to use.
 See [OpenAI's built-in tools](https://platform.openai.com/docs/guides/tools?api-mode=responses) for more details.
 """
 openai_reasoning_generate_summary: Literal['detailed', 'concise']
"""Deprecated alias for `openai_reasoning_summary`."""
 openai_reasoning_summary: Literal['detailed', 'concise']
"""A summary of the reasoning performed by the model.
 This can be useful for debugging and understanding the model's reasoning process.
 One of `concise` or `detailed`.
 Check the [OpenAI Reasoning documentation](https://platform.openai.com/docs/guides/reasoning?api-mode=responses#reasoning-summaries)
 for more details.
 """
 openai_send_reasoning_ids: bool
"""Whether to send the unique IDs of reasoning, text, and function call parts from the message history to the model. Enabled by default for reasoning models.
 This can result in errors like `"Item 'rs_123' of type 'reasoning' was provided without its required following item."`
 if the message history you're sending does not match exactly what was received from the Responses API in a previous response,
 for example if you're using a [history processor](../../message-history.md#processing-message-history).
 In that case, you'll want to disable this.
 """
 openai_truncation: Literal['disabled', 'auto']
"""The truncation strategy to use for the model response.
 It can be either:
 - `disabled` (default): If a model response will exceed the context window size for a model, the
 request will fail with a 400 error.
 - `auto`: If the context of this response and previous ones exceeds the model's context window size,
 the model will truncate the response to fit the context window by dropping input items in the
 middle of the conversation.
 """
 openai_text_verbosity: Literal['low', 'medium', 'high']
"""Constrains the verbosity of the model's text response.
 Lower values will result in more concise responses, while higher values will
 result in more verbose responses. Currently supported values are `low`,
 `medium`, and `high`.
 """
 openai_previous_response_id: Literal['auto'] | str
"""The ID of a previous response from the model to use as the starting point for a continued conversation.
 When set to `'auto'`, the request automatically uses the most recent
 `provider_response_id` from the message history and omits earlier messages.
 This enables the model to use server-side conversation state and faithfully reference previous reasoning.
 See the [OpenAI Responses API documentation](https://platform.openai.com/docs/guides/reasoning#keeping-reasoning-items-in-context)
 for more information.
 """
 openai_include_code_execution_outputs: bool
"""Whether to include the code execution results in the response.
 Corresponds to the `code_interpreter_call.outputs` value of the `include` parameter in the Responses API.
 """
 openai_include_web_search_sources: bool
"""Whether to include the web search results in the response.
 Corresponds to the `web_search_call.action.sources` value of the `include` parameter in the Responses API.
 """
```
---|--- 
#### openai_builtin_tools `instance-attribute`
```
openai_builtin_tools: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[
 FileSearchToolParam
 | WebSearchToolParam
 | ComputerToolParam
]
```
The provided OpenAI built-in tools to use.
See [OpenAI's built-in tools](https://platform.openai.com/docs/guides/tools?api-mode=responses) for more details.
#### openai_reasoning_generate_summary `instance-attribute`
```
openai_reasoning_generate_summary: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[
 "detailed", "concise"
]
```
Deprecated alias for `openai_reasoning_summary`.
#### openai_reasoning_summary `instance-attribute`
```
openai_reasoning_summary: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['detailed', 'concise']
```
A summary of the reasoning performed by the model.
This can be useful for debugging and understanding the model's reasoning process. One of `concise` or `detailed`.
Check the [OpenAI Reasoning documentation](https://platform.openai.com/docs/guides/reasoning?api-mode=responses#reasoning-summaries) for more details.
#### openai_send_reasoning_ids `instance-attribute`
```
openai_send_reasoning_ids: bool[](https://docs.python.org/3/library/functions.html#bool)
```
Whether to send the unique IDs of reasoning, text, and function call parts from the message history to the model. Enabled by default for reasoning models.
This can result in errors like `"Item 'rs_123' of type 'reasoning' was provided without its required following item."` if the message history you're sending does not match exactly what was received from the Responses API in a previous response, for example if you're using a [history processor](../../../message-history/#processing-message-history). In that case, you'll want to disable this.
#### openai_truncation `instance-attribute`
```
openai_truncation: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['disabled', 'auto']
```
The truncation strategy to use for the model response.
It can be either: - `disabled` (default): If a model response will exceed the context window size for a model, the request will fail with a 400 error. - `auto`: If the context of this response and previous ones exceeds the model's context window size, the model will truncate the response to fit the context window by dropping input items in the middle of the conversation.
#### openai_text_verbosity `instance-attribute`
```
openai_text_verbosity: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['low', 'medium', 'high']
```
Constrains the verbosity of the model's text response.
Lower values will result in more concise responses, while higher values will result in more verbose responses. Currently supported values are `low`, `medium`, and `high`.
#### openai_previous_response_id `instance-attribute`
```
openai_previous_response_id: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['auto'] | str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The ID of a previous response from the model to use as the starting point for a continued conversation.
When set to `'auto'`, the request automatically uses the most recent `provider_response_id` from the message history and omits earlier messages.
This enables the model to use server-side conversation state and faithfully reference previous reasoning. See the [OpenAI Responses API documentation](https://platform.openai.com/docs/guides/reasoning#keeping-reasoning-items-in-context) for more information.
#### openai_include_code_execution_outputs `instance-attribute`
```
openai_include_code_execution_outputs: bool[](https://docs.python.org/3/library/functions.html#bool)
```
Whether to include the code execution results in the response.
Corresponds to the `code_interpreter_call.outputs` value of the `include` parameter in the Responses API.
#### openai_include_web_search_sources `instance-attribute`
```
openai_include_web_search_sources: bool[](https://docs.python.org/3/library/functions.html#bool)
```
Whether to include the web search results in the response.
Corresponds to the `web_search_call.action.sources` value of the `include` parameter in the Responses API.
### OpenAIChatModel `dataclass`
Bases: `Model[](../base/#pydantic_ai.models.Model "pydantic_ai.models.Model")`
A model that uses the OpenAI API.
Internally, this uses the [OpenAI Python client](https://github.com/openai/openai-python) to interact with the API.
Apart from `__init__`, all methods are private or match those of the base class.
Source code in `pydantic_ai_slim/pydantic_ai/models/openai.py`
```
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
```
| ```
@dataclass(init=False)
classOpenAIChatModel(Model):
"""A model that uses the OpenAI API.
 Internally, this uses the [OpenAI Python client](https://github.com/openai/openai-python) to interact with the API.
 Apart from `__init__`, all methods are private or match those of the base class.
 """
 client: AsyncOpenAI = field(repr=False)
 _model_name: OpenAIModelName = field(repr=False)
 _provider: Provider[AsyncOpenAI] = field(repr=False)
 @overload
 def__init__(
 self,
 model_name: OpenAIModelName,
 *,
 provider: Literal[
 'azure',
 'deepseek',
 'cerebras',
 'fireworks',
 'github',
 'grok',
 'heroku',
 'moonshotai',
 'ollama',
 'openai',
 'openai-chat',
 'openrouter',
 'together',
 'vercel',
 'litellm',
 'nebius',
 'ovhcloud',
 'gateway',
 ]
 | Provider[AsyncOpenAI] = 'openai',
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings | None = None,
 ) -> None: ...
 @deprecated('Set the `system_prompt_role` in the `OpenAIModelProfile` instead.')
 @overload
 def__init__(
 self,
 model_name: OpenAIModelName,
 *,
 provider: Literal[
 'azure',
 'deepseek',
 'cerebras',
 'fireworks',
 'github',
 'grok',
 'heroku',
 'moonshotai',
 'ollama',
 'openai',
 'openai-chat',
 'openrouter',
 'together',
 'vercel',
 'litellm',
 'nebius',
 'ovhcloud',
 'gateway',
 ]
 | Provider[AsyncOpenAI] = 'openai',
 profile: ModelProfileSpec | None = None,
 system_prompt_role: OpenAISystemPromptRole | None = None,
 settings: ModelSettings | None = None,
 ) -> None: ...
 def__init__(
 self,
 model_name: OpenAIModelName,
 *,
 provider: Literal[
 'azure',
 'deepseek',
 'cerebras',
 'fireworks',
 'github',
 'grok',
 'heroku',
 'moonshotai',
 'ollama',
 'openai',
 'openai-chat',
 'openrouter',
 'together',
 'vercel',
 'litellm',
 'nebius',
 'ovhcloud',
 'gateway',
 ]
 | Provider[AsyncOpenAI] = 'openai',
 profile: ModelProfileSpec | None = None,
 system_prompt_role: OpenAISystemPromptRole | None = None,
 settings: ModelSettings | None = None,
 ):
"""Initialize an OpenAI model.
 Args:
 model_name: The name of the OpenAI model to use. List of model names available
 [here](https://github.com/openai/openai-python/blob/v1.54.3/src/openai/types/chat_model.py#L7)
 (Unfortunately, despite being ask to do so, OpenAI do not provide `.inv` files for their API).
 provider: The provider to use. Defaults to `'openai'`.
 profile: The model profile to use. Defaults to a profile picked by the provider based on the model name.
 system_prompt_role: The role to use for the system prompt message. If not provided, defaults to `'system'`.
 In the future, this may be inferred from the model name.
 settings: Default model settings for this model instance.
 """
 self._model_name = model_name
 if isinstance(provider, str):
 provider = infer_provider('gateway/openai' if provider == 'gateway' else provider)
 self._provider = provider
 self.client = provider.client
 super().__init__(settings=settings, profile=profile or provider.model_profile)
 if system_prompt_role is not None:
 self.profile = OpenAIModelProfile(openai_system_prompt_role=system_prompt_role).update(self.profile)
 @property
 defbase_url(self) -> str:
 return str(self.client.base_url)
 @property
 defmodel_name(self) -> OpenAIModelName:
"""The model name."""
 return self._model_name
 @property
 defsystem(self) -> str:
"""The model provider."""
 return self._provider.name
 @property
 @deprecated('Set the `system_prompt_role` in the `OpenAIModelProfile` instead.')
 defsystem_prompt_role(self) -> OpenAISystemPromptRole | None:
 return OpenAIModelProfile.from_profile(self.profile).openai_system_prompt_role
 async defrequest(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ) -> ModelResponse:
 check_allow_model_requests()
 model_settings, model_request_parameters = self.prepare_request(
 model_settings,
 model_request_parameters,
 )
 response = await self._completions_create(
 messages, False, cast(OpenAIChatModelSettings, model_settings or {}), model_request_parameters
 )
 model_response = self._process_response(response)
 return model_response
 @asynccontextmanager
 async defrequest_stream(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 run_context: RunContext[Any] | None = None,
 ) -> AsyncIterator[StreamedResponse]:
 check_allow_model_requests()
 model_settings, model_request_parameters = self.prepare_request(
 model_settings,
 model_request_parameters,
 )
 response = await self._completions_create(
 messages, True, cast(OpenAIChatModelSettings, model_settings or {}), model_request_parameters
 )
 async with response:
 yield await self._process_streamed_response(response, model_request_parameters)
 @overload
 async def_completions_create(
 self,
 messages: list[ModelMessage],
 stream: Literal[True],
 model_settings: OpenAIChatModelSettings,
 model_request_parameters: ModelRequestParameters,
 ) -> AsyncStream[ChatCompletionChunk]: ...
 @overload
 async def_completions_create(
 self,
 messages: list[ModelMessage],
 stream: Literal[False],
 model_settings: OpenAIChatModelSettings,
 model_request_parameters: ModelRequestParameters,
 ) -> chat.ChatCompletion: ...
 async def_completions_create(
 self,
 messages: list[ModelMessage],
 stream: bool,
 model_settings: OpenAIChatModelSettings,
 model_request_parameters: ModelRequestParameters,
 ) -> chat.ChatCompletion | AsyncStream[ChatCompletionChunk]:
 tools = self._get_tools(model_request_parameters)
 web_search_options = self._get_web_search_options(model_request_parameters)
 if not tools:
 tool_choice: Literal['none', 'required', 'auto'] | None = None
 elif (
 not model_request_parameters.allow_text_output
 and OpenAIModelProfile.from_profile(self.profile).openai_supports_tool_choice_required
 ):
 tool_choice = 'required'
 else:
 tool_choice = 'auto'
 openai_messages = await self._map_messages(messages)
 response_format: chat.completion_create_params.ResponseFormat | None = None
 if model_request_parameters.output_mode == 'native':
 output_object = model_request_parameters.output_object
 assert output_object is not None
 response_format = self._map_json_schema(output_object)
 elif (
 model_request_parameters.output_mode == 'prompted' and self.profile.supports_json_object_output
 ): # pragma: no branch
 response_format = {'type': 'json_object'}
 unsupported_model_settings = OpenAIModelProfile.from_profile(self.profile).openai_unsupported_model_settings
 for setting in unsupported_model_settings:
 model_settings.pop(setting, None)
 try:
 extra_headers = model_settings.get('extra_headers', {})
 extra_headers.setdefault('User-Agent', get_user_agent())
 return await self.client.chat.completions.create(
 model=self._model_name,
 messages=openai_messages,
 parallel_tool_calls=model_settings.get('parallel_tool_calls', NOT_GIVEN),
 tools=tools or NOT_GIVEN,
 tool_choice=tool_choice or NOT_GIVEN,
 stream=stream,
 stream_options={'include_usage': True} if stream else NOT_GIVEN,
 stop=model_settings.get('stop_sequences', NOT_GIVEN),
 max_completion_tokens=model_settings.get('max_tokens', NOT_GIVEN),
 timeout=model_settings.get('timeout', NOT_GIVEN),
 response_format=response_format or NOT_GIVEN,
 seed=model_settings.get('seed', NOT_GIVEN),
 reasoning_effort=model_settings.get('openai_reasoning_effort', NOT_GIVEN),
 user=model_settings.get('openai_user', NOT_GIVEN),
 web_search_options=web_search_options or NOT_GIVEN,
 service_tier=model_settings.get('openai_service_tier', NOT_GIVEN),
 prediction=model_settings.get('openai_prediction', NOT_GIVEN),
 temperature=model_settings.get('temperature', NOT_GIVEN),
 top_p=model_settings.get('top_p', NOT_GIVEN),
 presence_penalty=model_settings.get('presence_penalty', NOT_GIVEN),
 frequency_penalty=model_settings.get('frequency_penalty', NOT_GIVEN),
 logit_bias=model_settings.get('logit_bias', NOT_GIVEN),
 logprobs=model_settings.get('openai_logprobs', NOT_GIVEN),
 top_logprobs=model_settings.get('openai_top_logprobs', NOT_GIVEN),
 extra_headers=extra_headers,
 extra_body=model_settings.get('extra_body'),
 )
 except APIStatusError as e:
 if (status_code := e.status_code) >= 400:
 raise ModelHTTPError(status_code=status_code, model_name=self.model_name, body=e.body) frome
 raise # pragma: lax no cover
 def_process_response(self, response: chat.ChatCompletion | str) -> ModelResponse:
"""Process a non-streamed response, and prepare a message to return."""
 # Although the OpenAI SDK claims to return a Pydantic model (`ChatCompletion`) from the chat completions function:
 # * it hasn't actually performed validation (presumably they're creating the model with `model_construct` or something?!)
 # * if the endpoint returns plain text, the return type is a string
 # Thus we validate it fully here.
 if not isinstance(response, chat.ChatCompletion):
 raise UnexpectedModelBehavior('Invalid response from OpenAI chat completions endpoint, expected JSON data')
 if response.created:
 timestamp = number_to_datetime(response.created)
 else:
 timestamp = _now_utc()
 response.created = int(timestamp.timestamp())
 # Workaround for local Ollama which sometimes returns a `None` finish reason.
 if response.choices and (choice := response.choices[0]) and choice.finish_reason is None: # pyright: ignore[reportUnnecessaryComparison]
 choice.finish_reason = 'stop'
 try:
 response = chat.ChatCompletion.model_validate(response.model_dump())
 except ValidationError as e:
 raise UnexpectedModelBehavior(f'Invalid response from OpenAI chat completions endpoint: {e}') frome
 choice = response.choices[0]
 items: list[ModelResponsePart] = []
 # The `reasoning_content` field is only present in DeepSeek models.
 # https://api-docs.deepseek.com/guides/reasoning_model
 if reasoning_content := getattr(choice.message, 'reasoning_content', None):
 items.append(ThinkingPart(id='reasoning_content', content=reasoning_content, provider_name=self.system))
 # The `reasoning` field is only present in gpt-oss via Ollama and OpenRouter.
 # - https://cookbook.openai.com/articles/gpt-oss/handle-raw-cot#chat-completions-api
 # - https://openrouter.ai/docs/use-cases/reasoning-tokens#basic-usage-with-reasoning-tokens
 if reasoning := getattr(choice.message, 'reasoning', None):
 items.append(ThinkingPart(id='reasoning', content=reasoning, provider_name=self.system))
 # NOTE: We don't currently handle OpenRouter `reasoning_details`:
 # - https://openrouter.ai/docs/use-cases/reasoning-tokens#preserving-reasoning-blocks
 # If you need this, please file an issue.
 if choice.message.content:
 items.extend(
 (replace(part, id='content', provider_name=self.system) if isinstance(part, ThinkingPart) else part)
 for part in split_content_into_text_and_thinking(choice.message.content, self.profile.thinking_tags)
 )
 if choice.message.tool_calls is not None:
 for c in choice.message.tool_calls:
 if isinstance(c, ChatCompletionMessageFunctionToolCall):
 part = ToolCallPart(c.function.name, c.function.arguments, tool_call_id=c.id)
 elif isinstance(c, ChatCompletionMessageCustomToolCall): # pragma: no cover
 # NOTE: Custom tool calls are not supported.
 # See <https://github.com/pydantic/pydantic-ai/issues/2513> for more details.
 raise RuntimeError('Custom tool calls are not supported')
 else:
 assert_never(c)
 part.tool_call_id = _guard_tool_call_id(part)
 items.append(part)
 vendor_details: dict[str, Any] = {}
 # Add logprobs to vendor_details if available
 if choice.logprobs is not None and choice.logprobs.content:
 # Convert logprobs to a serializable format
 vendor_details['logprobs'] = [
 {
 'token': lp.token,
 'bytes': lp.bytes,
 'logprob': lp.logprob,
 'top_logprobs': [
 {'token': tlp.token, 'bytes': tlp.bytes, 'logprob': tlp.logprob} for tlp in lp.top_logprobs
 ],
 }
 for lp in choice.logprobs.content
 ]
 raw_finish_reason = choice.finish_reason
 vendor_details['finish_reason'] = raw_finish_reason
 finish_reason = _CHAT_FINISH_REASON_MAP.get(raw_finish_reason)
 return ModelResponse(
 parts=items,
 usage=_map_usage(response, self._provider.name, self._provider.base_url, self._model_name),
 model_name=response.model,
 timestamp=timestamp,
 provider_details=vendor_details or None,
 provider_response_id=response.id,
 provider_name=self._provider.name,
 finish_reason=finish_reason,
 )
 async def_process_streamed_response(
 self, response: AsyncStream[ChatCompletionChunk], model_request_parameters: ModelRequestParameters
 ) -> OpenAIStreamedResponse:
"""Process a streamed response, and prepare a streaming response to return."""
 peekable_response = _utils.PeekableAsyncStream(response)
 first_chunk = await peekable_response.peek()
 if isinstance(first_chunk, _utils.Unset):
 raise UnexpectedModelBehavior( # pragma: no cover
 'Streamed response ended without content or tool calls'
 )
 # When using Azure OpenAI and a content filter is enabled, the first chunk will contain a `''` model name,
 # so we set it from a later chunk in `OpenAIChatStreamedResponse`.
 model_name = first_chunk.model or self._model_name
 return OpenAIStreamedResponse(
 model_request_parameters=model_request_parameters,
 _model_name=model_name,
 _model_profile=self.profile,
 _response=peekable_response,
 _timestamp=number_to_datetime(first_chunk.created),
 _provider_name=self._provider.name,
 _provider_url=self._provider.base_url,
 )
 def_get_tools(self, model_request_parameters: ModelRequestParameters) -> list[chat.ChatCompletionToolParam]:
 return [self._map_tool_definition(r) for r in model_request_parameters.tool_defs.values()]
 def_get_web_search_options(self, model_request_parameters: ModelRequestParameters) -> WebSearchOptions | None:
 for tool in model_request_parameters.builtin_tools:
 if isinstance(tool, WebSearchTool): # pragma: no branch
 if not OpenAIModelProfile.from_profile(self.profile).openai_chat_supports_web_search:
 raise UserError(
 f'WebSearchTool is not supported with `OpenAIChatModel` and model {self.model_name!r}. '
 f'Please use `OpenAIResponsesModel` instead.'
 )
 if tool.user_location:
 return WebSearchOptions(
 search_context_size=tool.search_context_size,
 user_location=WebSearchOptionsUserLocation(
 type='approximate',
 approximate=WebSearchOptionsUserLocationApproximate(**tool.user_location),
 ),
 )
 return WebSearchOptions(search_context_size=tool.search_context_size)
 else:
 raise UserError(
 f'`{tool.__class__.__name__}` is not supported by `OpenAIChatModel`. If it should be, please file an issue.'
 )
 async def_map_messages(self, messages: list[ModelMessage]) -> list[chat.ChatCompletionMessageParam]:
"""Just maps a `pydantic_ai.Message` to a `openai.types.ChatCompletionMessageParam`."""
 openai_messages: list[chat.ChatCompletionMessageParam] = []
 for message in messages:
 if isinstance(message, ModelRequest):
 async for item in self._map_user_message(message):
 openai_messages.append(item)
 elif isinstance(message, ModelResponse):
 texts: list[str] = []
 tool_calls: list[ChatCompletionMessageFunctionToolCallParam] = []
 for item in message.parts:
 if isinstance(item, TextPart):
 texts.append(item.content)
 elif isinstance(item, ThinkingPart):
 # NOTE: DeepSeek `reasoning_content` field should NOT be sent back per https://api-docs.deepseek.com/guides/reasoning_model,
 # but we currently just send it in `<think>` tags anyway as we don't want DeepSeek-specific checks here.
 # If you need this changed, please file an issue.
 start_tag, end_tag = self.profile.thinking_tags
 texts.append('\n'.join([start_tag, item.content, end_tag]))
 elif isinstance(item, ToolCallPart):
 tool_calls.append(self._map_tool_call(item))
 # OpenAI doesn't return built-in tool calls
 elif isinstance(item, BuiltinToolCallPart | BuiltinToolReturnPart): # pragma: no cover
 pass
 elif isinstance(item, FilePart): # pragma: no cover
 # Files generated by models are not sent back to models that don't themselves generate files.
 pass
 else:
 assert_never(item)
 message_param = chat.ChatCompletionAssistantMessageParam(role='assistant')
 if texts:
 # Note: model responses from this model should only have one text item, so the following
 # shouldn't merge multiple texts into one unless you switch models between runs:
 message_param['content'] = '\n\n'.join(texts)
 else:
 message_param['content'] = None
 if tool_calls:
 message_param['tool_calls'] = tool_calls
 openai_messages.append(message_param)
 else:
 assert_never(message)
 if instructions := self._get_instructions(messages):
 openai_messages.insert(0, chat.ChatCompletionSystemMessageParam(content=instructions, role='system'))
 return openai_messages
 @staticmethod
 def_map_tool_call(t: ToolCallPart) -> ChatCompletionMessageFunctionToolCallParam:
 return ChatCompletionMessageFunctionToolCallParam(
 id=_guard_tool_call_id(t=t),
 type='function',
 function={'name': t.tool_name, 'arguments': t.args_as_json_str()},
 )
 def_map_json_schema(self, o: OutputObjectDefinition) -> chat.completion_create_params.ResponseFormat:
 response_format_param: chat.completion_create_params.ResponseFormatJSONSchema = { # pyright: ignore[reportPrivateImportUsage]
 'type': 'json_schema',
 'json_schema': {'name': o.name or DEFAULT_OUTPUT_TOOL_NAME, 'schema': o.json_schema},
 }
 if o.description:
 response_format_param['json_schema']['description'] = o.description
 if OpenAIModelProfile.from_profile(self.profile).openai_supports_strict_tool_definition: # pragma: no branch
 response_format_param['json_schema']['strict'] = o.strict
 return response_format_param
 def_map_tool_definition(self, f: ToolDefinition) -> chat.ChatCompletionToolParam:
 tool_param: chat.ChatCompletionToolParam = {
 'type': 'function',
 'function': {
 'name': f.name,
 'description': f.description or '',
 'parameters': f.parameters_json_schema,
 },
 }
 if f.strict and OpenAIModelProfile.from_profile(self.profile).openai_supports_strict_tool_definition:
 tool_param['function']['strict'] = f.strict
 return tool_param
 async def_map_user_message(self, message: ModelRequest) -> AsyncIterable[chat.ChatCompletionMessageParam]:
 for part in message.parts:
 if isinstance(part, SystemPromptPart):
 system_prompt_role = OpenAIModelProfile.from_profile(self.profile).openai_system_prompt_role
 if system_prompt_role == 'developer':
 yield chat.ChatCompletionDeveloperMessageParam(role='developer', content=part.content)
 elif system_prompt_role == 'user':
 yield chat.ChatCompletionUserMessageParam(role='user', content=part.content)
 else:
 yield chat.ChatCompletionSystemMessageParam(role='system', content=part.content)
 elif isinstance(part, UserPromptPart):
 yield await self._map_user_prompt(part)
 elif isinstance(part, ToolReturnPart):
 yield chat.ChatCompletionToolMessageParam(
 role='tool',
 tool_call_id=_guard_tool_call_id(t=part),
 content=part.model_response_str(),
 )
 elif isinstance(part, RetryPromptPart):
 if part.tool_name is None:
 yield chat.ChatCompletionUserMessageParam(role='user', content=part.model_response())
 else:
 yield chat.ChatCompletionToolMessageParam(
 role='tool',
 tool_call_id=_guard_tool_call_id(t=part),
 content=part.model_response(),
 )
 else:
 assert_never(part)
 async def_map_user_prompt(self, part: UserPromptPart) -> chat.ChatCompletionUserMessageParam: # noqa: C901
 content: str | list[ChatCompletionContentPartParam]
 if isinstance(part.content, str):
 content = part.content
 else:
 content = []
 for item in part.content:
 if isinstance(item, str):
 content.append(ChatCompletionContentPartTextParam(text=item, type='text'))
 elif isinstance(item, ImageUrl):
 image_url: ImageURL = {'url': item.url}
 if metadata := item.vendor_metadata:
 image_url['detail'] = metadata.get('detail', 'auto')
 if item.force_download:
 image_content = await download_item(item, data_format='base64_uri', type_format='extension')
 image_url['url'] = image_content['data']
 content.append(ChatCompletionContentPartImageParam(image_url=image_url, type='image_url'))
 elif isinstance(item, BinaryContent):
 if self._is_text_like_media_type(item.media_type):
 # Inline text-like binary content as a text block
 content.append(
 self._inline_text_file_part(
 item.data.decode('utf-8'),
 media_type=item.media_type,
 identifier=item.identifier,
 )
 )
 elif item.is_image:
 image_url = ImageURL(url=item.data_uri)
 if metadata := item.vendor_metadata:
 image_url['detail'] = metadata.get('detail', 'auto')
 content.append(ChatCompletionContentPartImageParam(image_url=image_url, type='image_url'))
 elif item.is_audio:
 assert item.format in ('wav', 'mp3')
 audio = InputAudio(data=base64.b64encode(item.data).decode('utf-8'), format=item.format)
 content.append(ChatCompletionContentPartInputAudioParam(input_audio=audio, type='input_audio'))
 elif item.is_document:
 content.append(
 File(
 file=FileFile(
 file_data=item.data_uri,
 filename=f'filename.{item.format}',
 ),
 type='file',
 )
 )
 else: # pragma: no cover
 raise RuntimeError(f'Unsupported binary content type: {item.media_type}')
 elif isinstance(item, AudioUrl):
 downloaded_item = await download_item(item, data_format='base64', type_format='extension')
 assert downloaded_item['data_type'] in (
 'wav',
 'mp3',
 ), f'Unsupported audio format: {downloaded_item["data_type"]}'
 audio = InputAudio(data=downloaded_item['data'], format=downloaded_item['data_type'])
 content.append(ChatCompletionContentPartInputAudioParam(input_audio=audio, type='input_audio'))
 elif isinstance(item, DocumentUrl):
 if self._is_text_like_media_type(item.media_type):
 downloaded_text = await download_item(item, data_format='text')
 content.append(
 self._inline_text_file_part(
 downloaded_text['data'],
 media_type=item.media_type,
 identifier=item.identifier,
 )
 )
 else:
 downloaded_item = await download_item(item, data_format='base64_uri', type_format='extension')
 content.append(
 File(
 file=FileFile(
 file_data=downloaded_item['data'],
 filename=f'filename.{downloaded_item["data_type"]}',
 ),
 type='file',
 )
 )
 elif isinstance(item, VideoUrl): # pragma: no cover
 raise NotImplementedError('VideoUrl is not supported for OpenAI')
 else:
 assert_never(item)
 return chat.ChatCompletionUserMessageParam(role='user', content=content)
 @staticmethod
 def_is_text_like_media_type(media_type: str) -> bool:
 return (
 media_type.startswith('text/')
 or media_type == 'application/json'
 or media_type.endswith('+json')
 or media_type == 'application/xml'
 or media_type.endswith('+xml')
 or media_type in ('application/x-yaml', 'application/yaml')
 )
 @staticmethod
 def_inline_text_file_part(text: str, *, media_type: str, identifier: str) -> ChatCompletionContentPartTextParam:
 text = '\n'.join(
 [
 f'-----BEGIN FILE id="{identifier}" type="{media_type}"-----',
 text,
 f'-----END FILE id="{identifier}"-----',
 ]
 )
 return ChatCompletionContentPartTextParam(text=text, type='text')
```
---|--- 
#### __init__
```
__init__(
 model_name: OpenAIModelName[](#pydantic_ai.models.openai.OpenAIModelName "pydantic_ai.models.openai.OpenAIModelName"),
 *,
 provider: (
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[
 "azure",
 "deepseek",
 "cerebras",
 "fireworks",
 "github",
 "grok",
 "heroku",
 "moonshotai",
 "ollama",
 "openai",
 "openai-chat",
 "openrouter",
 "together",
 "vercel",
 "litellm",
 "nebius",
 "ovhcloud",
 "gateway",
 ]
 | Provider[](../../providers/#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]
 ) = "openai",
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None
) -> None
```
```
__init__(
 model_name: OpenAIModelName[](#pydantic_ai.models.openai.OpenAIModelName "pydantic_ai.models.openai.OpenAIModelName"),
 *,
 provider: (
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[
 "azure",
 "deepseek",
 "cerebras",
 "fireworks",
 "github",
 "grok",
 "heroku",
 "moonshotai",
 "ollama",
 "openai",
 "openai-chat",
 "openrouter",
 "together",
 "vercel",
 "litellm",
 "nebius",
 "ovhcloud",
 "gateway",
 ]
 | Provider[](../../providers/#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]
 ) = "openai",
 profile: ModelProfileSpec | None = None,
 system_prompt_role: (
 OpenAISystemPromptRole | None
 ) = None,
 settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None
) -> None
```
```
__init__(
 model_name: OpenAIModelName[](#pydantic_ai.models.openai.OpenAIModelName "pydantic_ai.models.openai.OpenAIModelName"),
 *,
 provider: (
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[
 "azure",
 "deepseek",
 "cerebras",
 "fireworks",
 "github",
 "grok",
 "heroku",
 "moonshotai",
 "ollama",
 "openai",
 "openai-chat",
 "openrouter",
 "together",
 "vercel",
 "litellm",
 "nebius",
 "ovhcloud",
 "gateway",
 ]
 | Provider[](../../providers/#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]
 ) = "openai",
 profile: ModelProfileSpec | None = None,
 system_prompt_role: (
 OpenAISystemPromptRole | None
 ) = None,
 settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None
)
```
Initialize an OpenAI model.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`model_name` | `OpenAIModelName[](#pydantic_ai.models.openai.OpenAIModelName "pydantic_ai.models.openai.OpenAIModelName")` | The name of the OpenAI model to use. List of model names available [here](https://github.com/openai/openai-python/blob/v1.54.3/src/openai/types/chat_model.py#L7) (Unfortunately, despite being ask to do so, OpenAI do not provide `.inv` files for their API). | _required_ 
`provider` | `Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['azure', 'deepseek', 'cerebras', 'fireworks', 'github', 'grok', 'heroku', 'moonshotai', 'ollama', 'openai', 'openai-chat', 'openrouter', 'together', 'vercel', 'litellm', 'nebius', 'ovhcloud', 'gateway'] | Provider[](../../providers/#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]` | The provider to use. Defaults to `'openai'`. | `'openai'` 
`profile` | `ModelProfileSpec | None` | The model profile to use. Defaults to a profile picked by the provider based on the model name. | `None` 
`system_prompt_role` | `OpenAISystemPromptRole | None` | The role to use for the system prompt message. If not provided, defaults to `'system'`. In the future, this may be inferred from the model name. | `None` 
`settings` | `ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Default model settings for this model instance. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/models/openai.py`
```
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
```
| ```
def__init__(
 self,
 model_name: OpenAIModelName,
 *,
 provider: Literal[
 'azure',
 'deepseek',
 'cerebras',
 'fireworks',
 'github',
 'grok',
 'heroku',
 'moonshotai',
 'ollama',
 'openai',
 'openai-chat',
 'openrouter',
 'together',
 'vercel',
 'litellm',
 'nebius',
 'ovhcloud',
 'gateway',
 ]
 | Provider[AsyncOpenAI] = 'openai',
 profile: ModelProfileSpec | None = None,
 system_prompt_role: OpenAISystemPromptRole | None = None,
 settings: ModelSettings | None = None,
):
"""Initialize an OpenAI model.
 Args:
 model_name: The name of the OpenAI model to use. List of model names available
 [here](https://github.com/openai/openai-python/blob/v1.54.3/src/openai/types/chat_model.py#L7)
 (Unfortunately, despite being ask to do so, OpenAI do not provide `.inv` files for their API).
 provider: The provider to use. Defaults to `'openai'`.
 profile: The model profile to use. Defaults to a profile picked by the provider based on the model name.
 system_prompt_role: The role to use for the system prompt message. If not provided, defaults to `'system'`.
 In the future, this may be inferred from the model name.
 settings: Default model settings for this model instance.
 """
 self._model_name = model_name
 if isinstance(provider, str):
 provider = infer_provider('gateway/openai' if provider == 'gateway' else provider)
 self._provider = provider
 self.client = provider.client
 super().__init__(settings=settings, profile=profile or provider.model_profile)
 if system_prompt_role is not None:
 self.profile = OpenAIModelProfile(openai_system_prompt_role=system_prompt_role).update(self.profile)
```
---|--- 
#### model_name `property`
```
model_name: OpenAIModelName[](#pydantic_ai.models.openai.OpenAIModelName "pydantic_ai.models.openai.OpenAIModelName")
```
The model name.
#### system `property`
```
system: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The model provider.
### OpenAIModel `dataclass` `deprecated`
Bases: `OpenAIChatModel[](#pydantic_ai.models.openai.OpenAIChatModel "pydantic_ai.models.openai.OpenAIChatModel")`
Deprecated
`OpenAIModel` was renamed to `OpenAIChatModel` to clearly distinguish it from `OpenAIResponsesModel` which uses OpenAI's newer Responses API. Use that unless you're using an OpenAI Chat Completions-compatible API, or require a feature that the Responses API doesn't support yet like audio.
Deprecated alias for `OpenAIChatModel`.
Source code in `pydantic_ai_slim/pydantic_ai/models/openai.py`
```
888
889
890
891
892
893
894
895
```
| ```
@deprecated(
 '`OpenAIModel` was renamed to `OpenAIChatModel` to clearly distinguish it from `OpenAIResponsesModel` which '
 "uses OpenAI's newer Responses API. Use that unless you're using an OpenAI Chat Completions-compatible API, or "
 "require a feature that the Responses API doesn't support yet like audio."
)
@dataclass(init=False)
classOpenAIModel(OpenAIChatModel):
"""Deprecated alias for `OpenAIChatModel`."""
```
---|--- 
### OpenAIResponsesModel `dataclass`
Bases: `Model[](../base/#pydantic_ai.models.Model "pydantic_ai.models.Model")`
A model that uses the OpenAI Responses API.
The [OpenAI Responses API](https://platform.openai.com/docs/api-reference/responses) is the new API for OpenAI models.
If you are interested in the differences between the Responses API and the Chat Completions API, see the [OpenAI API docs](https://platform.openai.com/docs/guides/responses-vs-chat-completions).
Source code in `pydantic_ai_slim/pydantic_ai/models/openai.py`
```
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
 937
 938
 939
 940
 941
 942
 943
 944
 945
 946
 947
 948
 949
 950
 951
 952
 953
 954
 955
 956
 957
 958
 959
 960
 961
 962
 963
 964
 965
 966
 967
 968
 969
 970
 971
 972
 973
 974
 975
 976
 977
 978
 979
 980
 981
 982
 983
 984
 985
 986
 987
 988
 989
 990
 991
 992
 993
 994
 995
 996
 997
 998
 999
1000
1001
1002
1003
1004
1005
1006
1007
1008
1009
1010
1011
1012
1013
1014
1015
1016
1017
1018
1019
1020
1021
1022
1023
1024
1025
1026
1027
1028
1029
1030
1031
1032
1033
1034
1035
1036
1037
1038
1039
1040
1041
1042
1043
1044
1045
1046
1047
1048
1049
1050
1051
1052
1053
1054
1055
1056
1057
1058
1059
1060
1061
1062
1063
1064
1065
1066
1067
1068
1069
1070
1071
1072
1073
1074
1075
1076
1077
1078
1079
1080
1081
1082
1083
1084
1085
1086
1087
1088
1089
1090
1091
1092
1093
1094
1095
1096
1097
1098
1099
1100
1101
1102
1103
1104
1105
1106
1107
1108
1109
1110
1111
1112
1113
1114
1115
1116
1117
1118
1119
1120
1121
1122
1123
1124
1125
1126
1127
1128
1129
1130
1131
1132
1133
1134
1135
1136
1137
1138
1139
1140
1141
1142
1143
1144
1145
1146
1147
1148
1149
1150
1151
1152
1153
1154
1155
1156
1157
1158
1159
1160
1161
1162
1163
1164
1165
1166
1167
1168
1169
1170
1171
1172
1173
1174
1175
1176
1177
1178
1179
1180
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
1431
1432
1433
1434
1435
1436
1437
1438
1439
1440
1441
1442
1443
1444
1445
1446
1447
1448
1449
1450
1451
1452
1453
1454
1455
1456
1457
1458
1459
1460
1461
1462
1463
1464
1465
1466
1467
1468
1469
1470
1471
1472
1473
1474
1475
1476
1477
1478
1479
1480
1481
1482
1483
1484
1485
1486
1487
1488
1489
1490
1491
1492
1493
1494
1495
1496
1497
1498
1499
1500
1501
1502
1503
1504
1505
1506
1507
1508
1509
1510
1511
1512
1513
1514
1515
1516
1517
1518
1519
1520
1521
1522
1523
1524
1525
1526
1527
1528
1529
1530
1531
1532
1533
1534
1535
1536
1537
1538
1539
1540
1541
1542
1543
1544
1545
1546
1547
1548
1549
1550
1551
1552
1553
1554
1555
1556
1557
1558
1559
1560
1561
1562
1563
1564
1565
1566
1567
1568
1569
1570
1571
1572
1573
1574
1575
1576
1577
1578
1579
1580
1581
1582
1583
1584
1585
1586
1587
1588
1589
1590
1591
1592
1593
1594
1595
1596
1597
1598
1599
1600
1601
1602
1603
1604
1605
1606
1607
1608
1609
1610
1611
1612
1613
1614
1615
1616
1617
1618
1619
1620
1621
1622
1623
1624
1625
1626
1627
1628
1629
1630
1631
1632
1633
1634
1635
1636
1637
1638
1639
1640
1641
1642
1643
1644
1645
1646
1647
1648
1649
1650
1651
1652
1653
1654
1655
1656
1657
1658
1659
1660
1661
1662
1663
1664
1665
1666
1667
1668
1669
```
| ```
@dataclass(init=False)
classOpenAIResponsesModel(Model):
"""A model that uses the OpenAI Responses API.
 The [OpenAI Responses API](https://platform.openai.com/docs/api-reference/responses) is the
 new API for OpenAI models.
 If you are interested in the differences between the Responses API and the Chat Completions API,
 see the [OpenAI API docs](https://platform.openai.com/docs/guides/responses-vs-chat-completions).
 """
 client: AsyncOpenAI = field(repr=False)
 _model_name: OpenAIModelName = field(repr=False)
 _provider: Provider[AsyncOpenAI] = field(repr=False)
 def__init__(
 self,
 model_name: OpenAIModelName,
 *,
 provider: Literal[
 'openai',
 'deepseek',
 'azure',
 'openrouter',
 'grok',
 'fireworks',
 'together',
 'nebius',
 'ovhcloud',
 'gateway',
 ]
 | Provider[AsyncOpenAI] = 'openai',
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings | None = None,
 ):
"""Initialize an OpenAI Responses model.
 Args:
 model_name: The name of the OpenAI model to use.
 provider: The provider to use. Defaults to `'openai'`.
 profile: The model profile to use. Defaults to a profile picked by the provider based on the model name.
 settings: Default model settings for this model instance.
 """
 self._model_name = model_name
 if isinstance(provider, str):
 provider = infer_provider('gateway/openai' if provider == 'gateway' else provider)
 self._provider = provider
 self.client = provider.client
 super().__init__(settings=settings, profile=profile or provider.model_profile)
 @property
 defmodel_name(self) -> OpenAIModelName:
"""The model name."""
 return self._model_name
 @property
 defsystem(self) -> str:
"""The model provider."""
 return self._provider.name
 async defrequest(
 self,
 messages: list[ModelRequest | ModelResponse],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ) -> ModelResponse:
 check_allow_model_requests()
 model_settings, model_request_parameters = self.prepare_request(
 model_settings,
 model_request_parameters,
 )
 response = await self._responses_create(
 messages, False, cast(OpenAIResponsesModelSettings, model_settings or {}), model_request_parameters
 )
 return self._process_response(response, model_request_parameters)
 @asynccontextmanager
 async defrequest_stream(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 run_context: RunContext[Any] | None = None,
 ) -> AsyncIterator[StreamedResponse]:
 check_allow_model_requests()
 model_settings, model_request_parameters = self.prepare_request(
 model_settings,
 model_request_parameters,
 )
 response = await self._responses_create(
 messages, True, cast(OpenAIResponsesModelSettings, model_settings or {}), model_request_parameters
 )
 async with response:
 yield await self._process_streamed_response(response, model_request_parameters)
 def_process_response( # noqa: C901
 self, response: responses.Response, model_request_parameters: ModelRequestParameters
 ) -> ModelResponse:
"""Process a non-streamed response, and prepare a message to return."""
 timestamp = number_to_datetime(response.created_at)
 items: list[ModelResponsePart] = []
 for item in response.output:
 if isinstance(item, responses.ResponseReasoningItem):
 signature = item.encrypted_content
 if item.summary:
 for summary in item.summary:
 # We use the same id for all summaries so that we can merge them on the round trip.
 items.append(
 ThinkingPart(
 content=summary.text,
 id=item.id,
 signature=signature,
 provider_name=self.system if signature else None,
 )
 )
 # We only need to store the signature once.
 signature = None
 elif signature:
 items.append(
 ThinkingPart(
 content='',
 id=item.id,
 signature=signature,
 provider_name=self.system,
 )
 )
 # NOTE: We don't currently handle the raw CoT from gpt-oss `reasoning_text`: https://cookbook.openai.com/articles/gpt-oss/handle-raw-cot
 # If you need this, please file an issue.
 elif isinstance(item, responses.ResponseOutputMessage):
 for content in item.content:
 if isinstance(content, responses.ResponseOutputText): # pragma: no branch
 items.append(TextPart(content.text, id=item.id))
 elif isinstance(item, responses.ResponseFunctionToolCall):
 items.append(
 ToolCallPart(
 item.name,
 item.arguments,
 tool_call_id=item.call_id,
 id=item.id,
 )
 )
 elif isinstance(item, responses.ResponseCodeInterpreterToolCall):
 call_part, return_part, file_parts = _map_code_interpreter_tool_call(item, self.system)
 items.append(call_part)
 if file_parts:
 items.extend(file_parts)
 items.append(return_part)
 elif isinstance(item, responses.ResponseFunctionWebSearch):
 call_part, return_part = _map_web_search_tool_call(item, self.system)
 items.append(call_part)
 items.append(return_part)
 elif isinstance(item, responses.response_output_item.ImageGenerationCall):
 call_part, return_part, file_part = _map_image_generation_tool_call(item, self.system)
 items.append(call_part)
 if file_part: # pragma: no branch
 items.append(file_part)
 items.append(return_part)
 elif isinstance(item, responses.ResponseComputerToolCall): # pragma: no cover
 # Pydantic AI doesn't yet support the ComputerUse built-in tool
 pass
 elif isinstance(item, responses.ResponseCustomToolCall): # pragma: no cover
 # Support is being implemented in https://github.com/pydantic/pydantic-ai/pull/2572
 pass
 elif isinstance(item, responses.response_output_item.LocalShellCall): # pragma: no cover
 # Pydantic AI doesn't yet support the `codex-mini-latest` LocalShell built-in tool
 pass
 elif isinstance(item, responses.ResponseFileSearchToolCall): # pragma: no cover
 # Pydantic AI doesn't yet support the FileSearch built-in tool
 pass
 elif isinstance(item, responses.response_output_item.McpCall):
 call_part, return_part = _map_mcp_call(item, self.system)
 items.append(call_part)
 items.append(return_part)
 elif isinstance(item, responses.response_output_item.McpListTools):
 call_part, return_part = _map_mcp_list_tools(item, self.system)
 items.append(call_part)
 items.append(return_part)
 elif isinstance(item, responses.response_output_item.McpApprovalRequest): # pragma: no cover
 # Pydantic AI doesn't yet support McpApprovalRequest (explicit tool usage approval)
 pass
 finish_reason: FinishReason | None = None
 provider_details: dict[str, Any] | None = None
 raw_finish_reason = details.reason if (details := response.incomplete_details) else response.status
 if raw_finish_reason:
 provider_details = {'finish_reason': raw_finish_reason}
 finish_reason = _RESPONSES_FINISH_REASON_MAP.get(raw_finish_reason)
 return ModelResponse(
 parts=items,
 usage=_map_usage(response, self._provider.name, self._provider.base_url, self._model_name),
 model_name=response.model,
 provider_response_id=response.id,
 timestamp=timestamp,
 provider_name=self._provider.name,
 finish_reason=finish_reason,
 provider_details=provider_details,
 )
 async def_process_streamed_response(
 self,
 response: AsyncStream[responses.ResponseStreamEvent],
 model_request_parameters: ModelRequestParameters,
 ) -> OpenAIResponsesStreamedResponse:
"""Process a streamed response, and prepare a streaming response to return."""
 peekable_response = _utils.PeekableAsyncStream(response)
 first_chunk = await peekable_response.peek()
 if isinstance(first_chunk, _utils.Unset): # pragma: no cover
 raise UnexpectedModelBehavior('Streamed response ended without content or tool calls')
 assert isinstance(first_chunk, responses.ResponseCreatedEvent)
 return OpenAIResponsesStreamedResponse(
 model_request_parameters=model_request_parameters,
 _model_name=first_chunk.response.model,
 _response=peekable_response,
 _timestamp=number_to_datetime(first_chunk.response.created_at),
 _provider_name=self._provider.name,
 _provider_url=self._provider.base_url,
 )
 @overload
 async def_responses_create(
 self,
 messages: list[ModelRequest | ModelResponse],
 stream: Literal[False],
 model_settings: OpenAIResponsesModelSettings,
 model_request_parameters: ModelRequestParameters,
 ) -> responses.Response: ...
 @overload
 async def_responses_create(
 self,
 messages: list[ModelRequest | ModelResponse],
 stream: Literal[True],
 model_settings: OpenAIResponsesModelSettings,
 model_request_parameters: ModelRequestParameters,
 ) -> AsyncStream[responses.ResponseStreamEvent]: ...
 async def_responses_create(
 self,
 messages: list[ModelRequest | ModelResponse],
 stream: bool,
 model_settings: OpenAIResponsesModelSettings,
 model_request_parameters: ModelRequestParameters,
 ) -> responses.Response | AsyncStream[responses.ResponseStreamEvent]:
 tools = (
 self._get_builtin_tools(model_request_parameters)
 + list(model_settings.get('openai_builtin_tools', []))
 + self._get_tools(model_request_parameters)
 )
 profile = OpenAIModelProfile.from_profile(self.profile)
 if not tools:
 tool_choice: Literal['none', 'required', 'auto'] | None = None
 elif not model_request_parameters.allow_text_output and profile.openai_supports_tool_choice_required:
 tool_choice = 'required'
 else:
 tool_choice = 'auto'
 previous_response_id = model_settings.get('openai_previous_response_id')
 if previous_response_id == 'auto':
 previous_response_id, messages = self._get_previous_response_id_and_new_messages(messages)
 instructions, openai_messages = await self._map_messages(messages, model_settings)
 reasoning = self._get_reasoning(model_settings)
 text: responses.ResponseTextConfigParam | None = None
 if model_request_parameters.output_mode == 'native':
 output_object = model_request_parameters.output_object
 assert output_object is not None
 text = {'format': self._map_json_schema(output_object)}
 elif (
 model_request_parameters.output_mode == 'prompted' and self.profile.supports_json_object_output
 ): # pragma: no branch
 text = {'format': {'type': 'json_object'}}
 # Without this trick, we'd hit this error:
 # > Response input messages must contain the word 'json' in some form to use 'text.format' of type 'json_object'.
 # Apparently they're only checking input messages for "JSON", not instructions.
 assert isinstance(instructions, str)
 openai_messages.insert(0, responses.EasyInputMessageParam(role='system', content=instructions))
 instructions = NOT_GIVEN
 if verbosity := model_settings.get('openai_text_verbosity'):
 text = text or {}
 text['verbosity'] = verbosity
 unsupported_model_settings = profile.openai_unsupported_model_settings
 for setting in unsupported_model_settings:
 model_settings.pop(setting, None)
 include: list[responses.ResponseIncludable] = []
 if profile.openai_supports_encrypted_reasoning_content:
 include.append('reasoning.encrypted_content')
 if model_settings.get('openai_include_code_execution_outputs'):
 include.append('code_interpreter_call.outputs')
 if model_settings.get('openai_include_web_search_sources'):
 include.append('web_search_call.action.sources') # pyright: ignore[reportArgumentType]
 try:
 extra_headers = model_settings.get('extra_headers', {})
 extra_headers.setdefault('User-Agent', get_user_agent())
 return await self.client.responses.create(
 input=openai_messages,
 model=self._model_name,
 instructions=instructions,
 parallel_tool_calls=model_settings.get('parallel_tool_calls', NOT_GIVEN),
 tools=tools or NOT_GIVEN,
 tool_choice=tool_choice or NOT_GIVEN,
 max_output_tokens=model_settings.get('max_tokens', NOT_GIVEN),
 stream=stream,
 temperature=model_settings.get('temperature', NOT_GIVEN),
 top_p=model_settings.get('top_p', NOT_GIVEN),
 truncation=model_settings.get('openai_truncation', NOT_GIVEN),
 timeout=model_settings.get('timeout', NOT_GIVEN),
 service_tier=model_settings.get('openai_service_tier', NOT_GIVEN),
 previous_response_id=previous_response_id or NOT_GIVEN,
 reasoning=reasoning,
 user=model_settings.get('openai_user', NOT_GIVEN),
 text=text or NOT_GIVEN,
 include=include or NOT_GIVEN,
 extra_headers=extra_headers,
 extra_body=model_settings.get('extra_body'),
 )
 except APIStatusError as e:
 if (status_code := e.status_code) >= 400:
 raise ModelHTTPError(status_code=status_code, model_name=self.model_name, body=e.body) frome
 raise # pragma: lax no cover
 def_get_reasoning(self, model_settings: OpenAIResponsesModelSettings) -> Reasoning | NotGiven:
 reasoning_effort = model_settings.get('openai_reasoning_effort', None)
 reasoning_summary = model_settings.get('openai_reasoning_summary', None)
 reasoning_generate_summary = model_settings.get('openai_reasoning_generate_summary', None)
 if reasoning_summary and reasoning_generate_summary: # pragma: no cover
 raise ValueError('`openai_reasoning_summary` and `openai_reasoning_generate_summary` cannot both be set.')
 if reasoning_generate_summary is not None: # pragma: no cover
 warnings.warn(
 '`openai_reasoning_generate_summary` is deprecated, use `openai_reasoning_summary` instead',
 DeprecationWarning,
 )
 reasoning_summary = reasoning_generate_summary
 if reasoning_effort is None and reasoning_summary is None:
 return NOT_GIVEN
 return Reasoning(effort=reasoning_effort, summary=reasoning_summary)
 def_get_tools(self, model_request_parameters: ModelRequestParameters) -> list[responses.FunctionToolParam]:
 return [self._map_tool_definition(r) for r in model_request_parameters.tool_defs.values()]
 def_get_builtin_tools(self, model_request_parameters: ModelRequestParameters) -> list[responses.ToolParam]:
 tools: list[responses.ToolParam] = []
 has_image_generating_tool = False
 for tool in model_request_parameters.builtin_tools:
 if isinstance(tool, WebSearchTool):
 web_search_tool = responses.WebSearchToolParam(
 type='web_search', search_context_size=tool.search_context_size
 )
 if tool.user_location:
 web_search_tool['user_location'] = responses.web_search_tool_param.UserLocation(
 type='approximate', **tool.user_location
 )
 tools.append(web_search_tool)
 elif isinstance(tool, CodeExecutionTool):
 has_image_generating_tool = True
 tools.append({'type': 'code_interpreter', 'container': {'type': 'auto'}})
 elif isinstance(tool, MCPServerTool):
 mcp_tool = responses.tool_param.Mcp(
 type='mcp',
 server_label=tool.id,
 require_approval='never',
 )
 if tool.authorization_token: # pragma: no branch
 mcp_tool['authorization'] = tool.authorization_token
 if tool.allowed_tools is not None: # pragma: no branch
 mcp_tool['allowed_tools'] = tool.allowed_tools
 if tool.description: # pragma: no branch
 mcp_tool['server_description'] = tool.description
 if tool.headers: # pragma: no branch
 mcp_tool['headers'] = tool.headers
 if tool.url.startswith(MCP_SERVER_TOOL_CONNECTOR_URI_SCHEME + ':'):
 _, connector_id = tool.url.split(':', maxsplit=1)
 mcp_tool['connector_id'] = connector_id # pyright: ignore[reportGeneralTypeIssues]
 else:
 mcp_tool['server_url'] = tool.url
 tools.append(mcp_tool)
 elif isinstance(tool, ImageGenerationTool): # pragma: no branch
 has_image_generating_tool = True
 tools.append(
 responses.tool_param.ImageGeneration(
 type='image_generation',
 background=tool.background,
 input_fidelity=tool.input_fidelity,
 moderation=tool.moderation,
 output_compression=tool.output_compression,
 output_format=tool.output_format or 'png',
 partial_images=tool.partial_images,
 quality=tool.quality,
 size=tool.size,
 )
 )
 else:
 raise UserError( # pragma: no cover
 f'`{tool.__class__.__name__}` is not supported by `OpenAIResponsesModel`. If it should be, please file an issue.'
 )
 if model_request_parameters.allow_image_output and not has_image_generating_tool:
 tools.append({'type': 'image_generation'})
 return tools
 def_map_tool_definition(self, f: ToolDefinition) -> responses.FunctionToolParam:
 return {
 'name': f.name,
 'parameters': f.parameters_json_schema,
 'type': 'function',
 'description': f.description,
 'strict': bool(
 f.strict and OpenAIModelProfile.from_profile(self.profile).openai_supports_strict_tool_definition
 ),
 }
 def_get_previous_response_id_and_new_messages(
 self, messages: list[ModelMessage]
 ) -> tuple[str | None, list[ModelMessage]]:
 # When `openai_previous_response_id` is set to 'auto', the most recent
 # `provider_response_id` from the message history is selected and all
 # earlier messages are omitted. This allows the OpenAI SDK to reuse
 # server-side history for efficiency. The returned tuple contains the
 # `previous_response_id` (if found) and the trimmed list of messages.
 previous_response_id = None
 trimmed_messages: list[ModelMessage] = []
 for m in reversed(messages):
 if isinstance(m, ModelResponse) and m.provider_name == self.system:
 previous_response_id = m.provider_response_id
 break
 else:
 trimmed_messages.append(m)
 if previous_response_id and trimmed_messages:
 return previous_response_id, list(reversed(trimmed_messages))
 else:
 return None, messages
 async def_map_messages( # noqa: C901
 self, messages: list[ModelMessage], model_settings: OpenAIResponsesModelSettings
 ) -> tuple[str | NotGiven, list[responses.ResponseInputItemParam]]:
"""Just maps a `pydantic_ai.Message` to a `openai.types.responses.ResponseInputParam`."""
 profile = OpenAIModelProfile.from_profile(self.profile)
 send_item_ids = model_settings.get(
 'openai_send_reasoning_ids', profile.openai_supports_encrypted_reasoning_content
 )
 openai_messages: list[responses.ResponseInputItemParam] = []
 for message in messages:
 if isinstance(message, ModelRequest):
 for part in message.parts:
 if isinstance(part, SystemPromptPart):
 openai_messages.append(responses.EasyInputMessageParam(role='system', content=part.content))
 elif isinstance(part, UserPromptPart):
 openai_messages.append(await self._map_user_prompt(part))
 elif isinstance(part, ToolReturnPart):
 call_id = _guard_tool_call_id(t=part)
 call_id, _ = _split_combined_tool_call_id(call_id)
 item = FunctionCallOutput(
 type='function_call_output',
 call_id=call_id,
 output=part.model_response_str(),
 )
 openai_messages.append(item)
 elif isinstance(part, RetryPromptPart):
 if part.tool_name is None:
 openai_messages.append(
 Message(role='user', content=[{'type': 'input_text', 'text': part.model_response()}])
 )
 else:
 call_id = _guard_tool_call_id(t=part)
 call_id, _ = _split_combined_tool_call_id(call_id)
 item = FunctionCallOutput(
 type='function_call_output',
 call_id=call_id,
 output=part.model_response(),
 )
 openai_messages.append(item)
 else:
 assert_never(part)
 elif isinstance(message, ModelResponse):
 send_item_ids = send_item_ids and message.provider_name == self.system
 message_item: responses.ResponseOutputMessageParam | None = None
 reasoning_item: responses.ResponseReasoningItemParam | None = None
 web_search_item: responses.ResponseFunctionWebSearchParam | None = None
 code_interpreter_item: responses.ResponseCodeInterpreterToolCallParam | None = None
 for item in message.parts:
 if isinstance(item, TextPart):
 if item.id and send_item_ids:
 if message_item is None or message_item['id'] != item.id: # pragma: no branch
 message_item = responses.ResponseOutputMessageParam(
 role='assistant',
 id=item.id,
 content=[],
 type='message',
 status='completed',
 )
 openai_messages.append(message_item)
 message_item['content'] = [
 *message_item['content'],
 responses.ResponseOutputTextParam(
 text=item.content, type='output_text', annotations=[]
 ),
 ]
 else:
 openai_messages.append(
 responses.EasyInputMessageParam(role='assistant', content=item.content)
 )
 elif isinstance(item, ToolCallPart):
 call_id = _guard_tool_call_id(t=item)
 call_id, id = _split_combined_tool_call_id(call_id)
 id = id or item.id
 param = responses.ResponseFunctionToolCallParam(
 name=item.tool_name,
 arguments=item.args_as_json_str(),
 call_id=call_id,
 type='function_call',
 )
 if profile.openai_responses_requires_function_call_status_none:
 param['status'] = None # type: ignore[reportGeneralTypeIssues]
 if id and send_item_ids: # pragma: no branch
 param['id'] = id
 openai_messages.append(param)
 elif isinstance(item, BuiltinToolCallPart):
 if item.provider_name == self.system and send_item_ids:
 if (
 item.tool_name == CodeExecutionTool.kind
 and item.tool_call_id
 and (args := item.args_as_dict())
 and (container_id := args.get('container_id'))
 ):
 code_interpreter_item = responses.ResponseCodeInterpreterToolCallParam(
 id=item.tool_call_id,
 code=args.get('code'),
 container_id=container_id,
 outputs=None, # These can be read server-side
 status='completed',
 type='code_interpreter_call',
 )
 openai_messages.append(code_interpreter_item)
 elif (
 item.tool_name == WebSearchTool.kind
 and item.tool_call_id
 and (args := item.args_as_dict())
 ):
 web_search_item = responses.ResponseFunctionWebSearchParam(
 id=item.tool_call_id,
 action=cast(responses.response_function_web_search_param.Action, args),
 status='completed',
 type='web_search_call',
 )
 openai_messages.append(web_search_item)
 elif item.tool_name == ImageGenerationTool.kind and item.tool_call_id:
 # The cast is necessary because of https://github.com/openai/openai-python/issues/2648
 image_generation_item = cast(
 responses.response_input_item_param.ImageGenerationCall,
 {
 'id': item.tool_call_id,
 'type': 'image_generation_call',
 },
 )
 openai_messages.append(image_generation_item)
 elif ( # pragma: no branch
 item.tool_name.startswith(MCPServerTool.kind)
 and item.tool_call_id
 and (server_id := item.tool_name.split(':', 1)[1])
 and (args := item.args_as_dict())
 and (action := args.get('action'))
 ):
 if action == 'list_tools':
 mcp_list_tools_item = responses.response_input_item_param.McpListTools(
 id=item.tool_call_id,
 type='mcp_list_tools',
 server_label=server_id,
 tools=[], # These can be read server-side
 )
 openai_messages.append(mcp_list_tools_item)
 elif ( # pragma: no branch
 action == 'call_tool'
 and (tool_name := args.get('tool_name'))
 and (tool_args := args.get('tool_args'))
 ):
 mcp_call_item = responses.response_input_item_param.McpCall(
 id=item.tool_call_id,
 server_label=server_id,
 name=tool_name,
 arguments=to_json(tool_args).decode(),
 error=None, # These can be read server-side
 output=None, # These can be read server-side
 type='mcp_call',
 )
 openai_messages.append(mcp_call_item)
 elif isinstance(item, BuiltinToolReturnPart):
 if item.provider_name == self.system and send_item_ids:
 if (
 item.tool_name == CodeExecutionTool.kind
 and code_interpreter_item is not None
 and isinstance(item.content, dict)
 and (content := cast(dict[str, Any], item.content)) # pyright: ignore[reportUnknownMemberType]
 and (status := content.get('status'))
 ):
 code_interpreter_item['status'] = status
 elif (
 item.tool_name == WebSearchTool.kind
 and web_search_item is not None
 and isinstance(item.content, dict) # pyright: ignore[reportUnknownMemberType]
 and (content := cast(dict[str, Any], item.content)) # pyright: ignore[reportUnknownMemberType]
 and (status := content.get('status'))
 ):
 web_search_item['status'] = status
 elif item.tool_name == ImageGenerationTool.kind:
 # Image generation result does not need to be sent back, just the `id` off of `BuiltinToolCallPart`.
 pass
 elif item.tool_name.startswith(MCPServerTool.kind): # pragma: no branch
 # MCP call result does not need to be sent back, just the fields off of `BuiltinToolCallPart`.
 pass
 elif isinstance(item, FilePart):
 # This was generated by the `ImageGenerationTool` or `CodeExecutionTool`,
 # and does not need to be sent back separately from the corresponding `BuiltinToolReturnPart`.
 # If `send_item_ids` is false, we won't send the `BuiltinToolReturnPart`, but OpenAI does not have a type for files from the assistant.
 pass
 elif isinstance(item, ThinkingPart):
 if item.id and send_item_ids:
 signature: str | None = None
 if (
 item.signature
 and item.provider_name == self.system
 and profile.openai_supports_encrypted_reasoning_content
 ):
 signature = item.signature
 if (reasoning_item is None or reasoning_item['id'] != item.id) and (
 signature or item.content
 ): # pragma: no branch
 reasoning_item = responses.ResponseReasoningItemParam(
 id=item.id,
 summary=[],
 encrypted_content=signature,
 type='reasoning',
 )
 openai_messages.append(reasoning_item)
 if item.content:
 # The check above guarantees that `reasoning_item` is not None
 assert reasoning_item is not None
 reasoning_item['summary'] = [
 *reasoning_item['summary'],
 Summary(text=item.content, type='summary_text'),
 ]
 else:
 start_tag, end_tag = profile.thinking_tags
 openai_messages.append(
 responses.EasyInputMessageParam(
 role='assistant', content='\n'.join([start_tag, item.content, end_tag])
 )
 )
 else:
 assert_never(item)
 else:
 assert_never(message)
 instructions = self._get_instructions(messages) or NOT_GIVEN
 return instructions, openai_messages
 def_map_json_schema(self, o: OutputObjectDefinition) -> responses.ResponseFormatTextJSONSchemaConfigParam:
 response_format_param: responses.ResponseFormatTextJSONSchemaConfigParam = {
 'type': 'json_schema',
 'name': o.name or DEFAULT_OUTPUT_TOOL_NAME,
 'schema': o.json_schema,
 }
 if o.description:
 response_format_param['description'] = o.description
 if OpenAIModelProfile.from_profile(self.profile).openai_supports_strict_tool_definition: # pragma: no branch
 response_format_param['strict'] = o.strict
 return response_format_param
 @staticmethod
 async def_map_user_prompt(part: UserPromptPart) -> responses.EasyInputMessageParam:
 content: str | list[responses.ResponseInputContentParam]
 if isinstance(part.content, str):
 content = part.content
 else:
 content = []
 for item in part.content:
 if isinstance(item, str):
 content.append(responses.ResponseInputTextParam(text=item, type='input_text'))
 elif isinstance(item, BinaryContent):
 if item.is_image:
 detail: Literal['auto', 'low', 'high'] = 'auto'
 if metadata := item.vendor_metadata:
 detail = cast(
 Literal['auto', 'low', 'high'],
 metadata.get('detail', 'auto'),
 )
 content.append(
 responses.ResponseInputImageParam(
 image_url=item.data_uri,
 type='input_image',
 detail=detail,
 )
 )
 elif item.is_document:
 content.append(
 responses.ResponseInputFileParam(
 type='input_file',
 file_data=item.data_uri,
 # NOTE: Type wise it's not necessary to include the filename, but it's required by the
 # API itself. If we add empty string, the server sends a 500 error - which OpenAI needs
 # to fix. In any case, we add a placeholder name.
 filename=f'filename.{item.format}',
 )
 )
 elif item.is_audio:
 raise NotImplementedError('Audio as binary content is not supported for OpenAI Responses API.')
 else: # pragma: no cover
 raise RuntimeError(f'Unsupported binary content type: {item.media_type}')
 elif isinstance(item, ImageUrl):
 detail: Literal['auto', 'low', 'high'] = 'auto'
 image_url = item.url
 if metadata := item.vendor_metadata:
 detail = cast(Literal['auto', 'low', 'high'], metadata.get('detail', 'auto'))
 if item.force_download:
 downloaded_item = await download_item(item, data_format='base64_uri', type_format='extension')
 image_url = downloaded_item['data']
 content.append(
 responses.ResponseInputImageParam(
 image_url=image_url,
 type='input_image',
 detail=detail,
 )
 )
 elif isinstance(item, AudioUrl): # pragma: no cover
 downloaded_item = await download_item(item, data_format='base64_uri', type_format='extension')
 content.append(
 responses.ResponseInputFileParam(
 type='input_file',
 file_data=downloaded_item['data'],
 filename=f'filename.{downloaded_item["data_type"]}',
 )
 )
 elif isinstance(item, DocumentUrl):
 downloaded_item = await download_item(item, data_format='base64_uri', type_format='extension')
 content.append(
 responses.ResponseInputFileParam(
 type='input_file',
 file_data=downloaded_item['data'],
 filename=f'filename.{downloaded_item["data_type"]}',
 )
 )
 elif isinstance(item, VideoUrl): # pragma: no cover
 raise NotImplementedError('VideoUrl is not supported for OpenAI.')
 else:
 assert_never(item)
 return responses.EasyInputMessageParam(role='user', content=content)
```
---|--- 
#### __init__
```
__init__(
 model_name: OpenAIModelName[](#pydantic_ai.models.openai.OpenAIModelName "pydantic_ai.models.openai.OpenAIModelName"),
 *,
 provider: (
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[
 "openai",
 "deepseek",
 "azure",
 "openrouter",
 "grok",
 "fireworks",
 "together",
 "nebius",
 "ovhcloud",
 "gateway",
 ]
 | Provider[](../../providers/#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]
 ) = "openai",
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None
)
```
Initialize an OpenAI Responses model.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`model_name` | `OpenAIModelName[](#pydantic_ai.models.openai.OpenAIModelName "pydantic_ai.models.openai.OpenAIModelName")` | The name of the OpenAI model to use. | _required_ 
`provider` | `Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['openai', 'deepseek', 'azure', 'openrouter', 'grok', 'fireworks', 'together', 'nebius', 'ovhcloud', 'gateway'] | Provider[](../../providers/#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncOpenAI]` | The provider to use. Defaults to `'openai'`. | `'openai'` 
`profile` | `ModelProfileSpec | None` | The model profile to use. Defaults to a profile picked by the provider based on the model name. | `None` 
`settings` | `ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Default model settings for this model instance. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/models/openai.py`
```
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
937
938
939
940
941
942
943
944
945
946
947
948
949
```
| ```
def__init__(
 self,
 model_name: OpenAIModelName,
 *,
 provider: Literal[
 'openai',
 'deepseek',
 'azure',
 'openrouter',
 'grok',
 'fireworks',
 'together',
 'nebius',
 'ovhcloud',
 'gateway',
 ]
 | Provider[AsyncOpenAI] = 'openai',
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings | None = None,
):
"""Initialize an OpenAI Responses model.
 Args:
 model_name: The name of the OpenAI model to use.
 provider: The provider to use. Defaults to `'openai'`.
 profile: The model profile to use. Defaults to a profile picked by the provider based on the model name.
 settings: Default model settings for this model instance.
 """
 self._model_name = model_name
 if isinstance(provider, str):
 provider = infer_provider('gateway/openai' if provider == 'gateway' else provider)
 self._provider = provider
 self.client = provider.client
 super().__init__(settings=settings, profile=profile or provider.model_profile)
```
---|--- 
#### model_name `property`
```
model_name: OpenAIModelName[](#pydantic_ai.models.openai.OpenAIModelName "pydantic_ai.models.openai.OpenAIModelName")
```
The model name.
#### system `property`
```
system: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The model provider.