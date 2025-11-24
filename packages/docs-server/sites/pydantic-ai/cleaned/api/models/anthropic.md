[ Skip to content ](#pydantic_aimodelsanthropic)
# `pydantic_ai.models.anthropic`
## Setup
For details on how to set up authentication with this model, see [model configuration for Anthropic](../../../models/anthropic/).
### LatestAnthropicModelNames `module-attribute`
```
LatestAnthropicModelNames = ModelParam
```
Latest Anthropic models.
### AnthropicModelName `module-attribute`
```
AnthropicModelName = str[](https://docs.python.org/3/library/stdtypes.html#str) | LatestAnthropicModelNames[](#pydantic_ai.models.anthropic.LatestAnthropicModelNames "pydantic_ai.models.anthropic.LatestAnthropicModelNames")
```
Possible Anthropic model names.
Since Anthropic supports a variety of date-stamped models, we explicitly list the latest models but allow any name in the type hints. See [the Anthropic docs](https://docs.anthropic.com/en/docs/about-claude/models) for a full list.
### AnthropicModelSettings
Bases: `ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings")`
Settings used for an Anthropic model request.
Source code in `pydantic_ai_slim/pydantic_ai/models/anthropic.py`
```
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
classAnthropicModelSettings(ModelSettings, total=False):
"""Settings used for an Anthropic model request."""
 # ALL FIELDS MUST BE `anthropic_` PREFIXED SO YOU CAN MERGE THEM WITH OTHER MODELS.
 anthropic_metadata: BetaMetadataParam
"""An object describing metadata about the request.
 Contains `user_id`, an external identifier for the user who is associated with the request.
 """
 anthropic_thinking: BetaThinkingConfigParam
"""Determine whether the model should generate a thinking block.
 See [the Anthropic docs](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking) for more information.
 """
```
---|--- 
#### anthropic_metadata `instance-attribute`
```
anthropic_metadata: BetaMetadataParam
```
An object describing metadata about the request.
Contains `user_id`, an external identifier for the user who is associated with the request.
#### anthropic_thinking `instance-attribute`
```
anthropic_thinking: BetaThinkingConfigParam
```
Determine whether the model should generate a thinking block.
See [the Anthropic docs](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking) for more information.
### AnthropicModel `dataclass`
Bases: `Model[](../base/#pydantic_ai.models.Model "pydantic_ai.models.Model")`
A model that uses the Anthropic API.
Internally, this uses the [Anthropic Python client](https://github.com/anthropics/anthropic-sdk-python) to interact with the API.
Apart from `__init__`, all methods are private or match those of the base class.
Source code in `pydantic_ai_slim/pydantic_ai/models/anthropic.py`
```
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
```
| ```
@dataclass(init=False)
classAnthropicModel(Model):
"""A model that uses the Anthropic API.
 Internally, this uses the [Anthropic Python client](https://github.com/anthropics/anthropic-sdk-python) to interact with the API.
 Apart from `__init__`, all methods are private or match those of the base class.
 """
 client: AsyncAnthropicClient = field(repr=False)
 _model_name: AnthropicModelName = field(repr=False)
 _provider: Provider[AsyncAnthropicClient] = field(repr=False)
 def__init__(
 self,
 model_name: AnthropicModelName,
 *,
 provider: Literal['anthropic', 'gateway'] | Provider[AsyncAnthropicClient] = 'anthropic',
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings | None = None,
 ):
"""Initialize an Anthropic model.
 Args:
 model_name: The name of the Anthropic model to use. List of model names available
 [here](https://docs.anthropic.com/en/docs/about-claude/models).
 provider: The provider to use for the Anthropic API. Can be either the string 'anthropic' or an
 instance of `Provider[AsyncAnthropicClient]`. If not provided, the other parameters will be used.
 profile: The model profile to use. Defaults to a profile picked by the provider based on the model name.
 settings: Default model settings for this model instance.
 """
 self._model_name = model_name
 if isinstance(provider, str):
 provider = infer_provider('gateway/anthropic' if provider == 'gateway' else provider)
 self._provider = provider
 self.client = provider.client
 super().__init__(settings=settings, profile=profile or provider.model_profile)
 @property
 defbase_url(self) -> str:
 return str(self.client.base_url)
 @property
 defmodel_name(self) -> AnthropicModelName:
"""The model name."""
 return self._model_name
 @property
 defsystem(self) -> str:
"""The model provider."""
 return self._provider.name
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
 response = await self._messages_create(
 messages, False, cast(AnthropicModelSettings, model_settings or {}), model_request_parameters
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
 response = await self._messages_create(
 messages, True, cast(AnthropicModelSettings, model_settings or {}), model_request_parameters
 )
 async with response:
 yield await self._process_streamed_response(response, model_request_parameters)
 @overload
 async def_messages_create(
 self,
 messages: list[ModelMessage],
 stream: Literal[True],
 model_settings: AnthropicModelSettings,
 model_request_parameters: ModelRequestParameters,
 ) -> AsyncStream[BetaRawMessageStreamEvent]:
 pass
 @overload
 async def_messages_create(
 self,
 messages: list[ModelMessage],
 stream: Literal[False],
 model_settings: AnthropicModelSettings,
 model_request_parameters: ModelRequestParameters,
 ) -> BetaMessage:
 pass
 async def_messages_create(
 self,
 messages: list[ModelMessage],
 stream: bool,
 model_settings: AnthropicModelSettings,
 model_request_parameters: ModelRequestParameters,
 ) -> BetaMessage | AsyncStream[BetaRawMessageStreamEvent]:
 # standalone function to make it easier to override
 tools = self._get_tools(model_request_parameters)
 tools, mcp_servers, beta_features = self._add_builtin_tools(tools, model_request_parameters)
 tool_choice: BetaToolChoiceParam | None
 if not tools:
 tool_choice = None
 else:
 if not model_request_parameters.allow_text_output:
 tool_choice = {'type': 'any'}
 if (thinking := model_settings.get('anthropic_thinking')) and thinking.get('type') == 'enabled':
 raise UserError(
 'Anthropic does not support thinking and output tools at the same time. Use `output_type=PromptedOutput(...)` instead.'
 )
 else:
 tool_choice = {'type': 'auto'}
 if (allow_parallel_tool_calls := model_settings.get('parallel_tool_calls')) is not None:
 tool_choice['disable_parallel_tool_use'] = not allow_parallel_tool_calls
 system_prompt, anthropic_messages = await self._map_message(messages)
 try:
 extra_headers = model_settings.get('extra_headers', {})
 extra_headers.setdefault('User-Agent', get_user_agent())
 if beta_features:
 if 'anthropic-beta' in extra_headers:
 beta_features.insert(0, extra_headers['anthropic-beta'])
 extra_headers['anthropic-beta'] = ','.join(beta_features)
 return await self.client.beta.messages.create(
 max_tokens=model_settings.get('max_tokens', 4096),
 system=system_prompt or OMIT,
 messages=anthropic_messages,
 model=self._model_name,
 tools=tools or OMIT,
 tool_choice=tool_choice or OMIT,
 mcp_servers=mcp_servers or OMIT,
 stream=stream,
 thinking=model_settings.get('anthropic_thinking', OMIT),
 stop_sequences=model_settings.get('stop_sequences', OMIT),
 temperature=model_settings.get('temperature', OMIT),
 top_p=model_settings.get('top_p', OMIT),
 timeout=model_settings.get('timeout', NOT_GIVEN),
 metadata=model_settings.get('anthropic_metadata', OMIT),
 extra_headers=extra_headers,
 extra_body=model_settings.get('extra_body'),
 )
 except APIStatusError as e:
 if (status_code := e.status_code) >= 400:
 raise ModelHTTPError(status_code=status_code, model_name=self.model_name, body=e.body) frome
 raise # pragma: lax no cover
 def_process_response(self, response: BetaMessage) -> ModelResponse:
"""Process a non-streamed response, and prepare a message to return."""
 items: list[ModelResponsePart] = []
 builtin_tool_calls: dict[str, BuiltinToolCallPart] = {}
 for item in response.content:
 if isinstance(item, BetaTextBlock):
 items.append(TextPart(content=item.text))
 elif isinstance(item, BetaServerToolUseBlock):
 call_part = _map_server_tool_use_block(item, self.system)
 builtin_tool_calls[call_part.tool_call_id] = call_part
 items.append(call_part)
 elif isinstance(item, BetaWebSearchToolResultBlock):
 items.append(_map_web_search_tool_result_block(item, self.system))
 elif isinstance(item, BetaCodeExecutionToolResultBlock):
 items.append(_map_code_execution_tool_result_block(item, self.system))
 elif isinstance(item, BetaRedactedThinkingBlock):
 items.append(
 ThinkingPart(id='redacted_thinking', content='', signature=item.data, provider_name=self.system)
 )
 elif isinstance(item, BetaThinkingBlock):
 items.append(ThinkingPart(content=item.thinking, signature=item.signature, provider_name=self.system))
 elif isinstance(item, BetaMCPToolUseBlock):
 call_part = _map_mcp_server_use_block(item, self.system)
 builtin_tool_calls[call_part.tool_call_id] = call_part
 items.append(call_part)
 elif isinstance(item, BetaMCPToolResultBlock):
 call_part = builtin_tool_calls.get(item.tool_use_id)
 items.append(_map_mcp_server_result_block(item, call_part, self.system))
 else:
 assert isinstance(item, BetaToolUseBlock), f'unexpected item type {type(item)}'
 items.append(
 ToolCallPart(
 tool_name=item.name,
 args=cast(dict[str, Any], item.input),
 tool_call_id=item.id,
 )
 )
 finish_reason: FinishReason | None = None
 provider_details: dict[str, Any] | None = None
 if raw_finish_reason := response.stop_reason: # pragma: no branch
 provider_details = {'finish_reason': raw_finish_reason}
 finish_reason = _FINISH_REASON_MAP.get(raw_finish_reason)
 return ModelResponse(
 parts=items,
 usage=_map_usage(response, self._provider.name, self._provider.base_url, self._model_name),
 model_name=response.model,
 provider_response_id=response.id,
 provider_name=self._provider.name,
 finish_reason=finish_reason,
 provider_details=provider_details,
 )
 async def_process_streamed_response(
 self, response: AsyncStream[BetaRawMessageStreamEvent], model_request_parameters: ModelRequestParameters
 ) -> StreamedResponse:
 peekable_response = _utils.PeekableAsyncStream(response)
 first_chunk = await peekable_response.peek()
 if isinstance(first_chunk, _utils.Unset):
 raise UnexpectedModelBehavior('Streamed response ended without content or tool calls') # pragma: no cover
 assert isinstance(first_chunk, BetaRawMessageStartEvent)
 return AnthropicStreamedResponse(
 model_request_parameters=model_request_parameters,
 _model_name=first_chunk.message.model,
 _response=peekable_response,
 _timestamp=_utils.now_utc(),
 _provider_name=self._provider.name,
 _provider_url=self._provider.base_url,
 )
 def_get_tools(self, model_request_parameters: ModelRequestParameters) -> list[BetaToolUnionParam]:
 return [self._map_tool_definition(r) for r in model_request_parameters.tool_defs.values()]
 def_add_builtin_tools(
 self, tools: list[BetaToolUnionParam], model_request_parameters: ModelRequestParameters
 ) -> tuple[list[BetaToolUnionParam], list[BetaRequestMCPServerURLDefinitionParam], list[str]]:
 beta_features: list[str] = []
 mcp_servers: list[BetaRequestMCPServerURLDefinitionParam] = []
 for tool in model_request_parameters.builtin_tools:
 if isinstance(tool, WebSearchTool):
 user_location = UserLocation(type='approximate', **tool.user_location) if tool.user_location else None
 tools.append(
 BetaWebSearchTool20250305Param(
 name='web_search',
 type='web_search_20250305',
 max_uses=tool.max_uses,
 allowed_domains=tool.allowed_domains,
 blocked_domains=tool.blocked_domains,
 user_location=user_location,
 )
 )
 elif isinstance(tool, CodeExecutionTool): # pragma: no branch
 tools.append(BetaCodeExecutionTool20250522Param(name='code_execution', type='code_execution_20250522'))
 beta_features.append('code-execution-2025-05-22')
 elif isinstance(tool, MemoryTool): # pragma: no branch
 if 'memory' not in model_request_parameters.tool_defs:
 raise UserError("Built-in `MemoryTool` requires a 'memory' tool to be defined.")
 # Replace the memory tool definition with the built-in memory tool
 tools = [tool for tool in tools if tool['name'] != 'memory']
 tools.append(BetaMemoryTool20250818Param(name='memory', type='memory_20250818'))
 beta_features.append('context-management-2025-06-27')
 elif isinstance(tool, MCPServerTool) and tool.url:
 mcp_server_url_definition_param = BetaRequestMCPServerURLDefinitionParam(
 type='url',
 name=tool.id,
 url=tool.url,
 )
 if tool.allowed_tools is not None: # pragma: no branch
 mcp_server_url_definition_param['tool_configuration'] = BetaRequestMCPServerToolConfigurationParam(
 enabled=bool(tool.allowed_tools),
 allowed_tools=tool.allowed_tools,
 )
 if tool.authorization_token: # pragma: no cover
 mcp_server_url_definition_param['authorization_token'] = tool.authorization_token
 mcp_servers.append(mcp_server_url_definition_param)
 beta_features.append('mcp-client-2025-04-04')
 else: # pragma: no cover
 raise UserError(
 f'`{tool.__class__.__name__}` is not supported by `AnthropicModel`. If it should be, please file an issue.'
 )
 return tools, mcp_servers, beta_features
 async def_map_message(self, messages: list[ModelMessage]) -> tuple[str, list[BetaMessageParam]]: # noqa: C901
"""Just maps a `pydantic_ai.Message` to a `anthropic.types.MessageParam`."""
 system_prompt_parts: list[str] = []
 anthropic_messages: list[BetaMessageParam] = []
 for m in messages:
 if isinstance(m, ModelRequest):
 user_content_params: list[BetaContentBlockParam] = []
 for request_part in m.parts:
 if isinstance(request_part, SystemPromptPart):
 system_prompt_parts.append(request_part.content)
 elif isinstance(request_part, UserPromptPart):
 async for content in self._map_user_prompt(request_part):
 user_content_params.append(content)
 elif isinstance(request_part, ToolReturnPart):
 tool_result_block_param = BetaToolResultBlockParam(
 tool_use_id=_guard_tool_call_id(t=request_part),
 type='tool_result',
 content=request_part.model_response_str(),
 is_error=False,
 )
 user_content_params.append(tool_result_block_param)
 elif isinstance(request_part, RetryPromptPart): # pragma: no branch
 if request_part.tool_name is None:
 text = request_part.model_response() # pragma: no cover
 retry_param = BetaTextBlockParam(type='text', text=text) # pragma: no cover
 else:
 retry_param = BetaToolResultBlockParam(
 tool_use_id=_guard_tool_call_id(t=request_part),
 type='tool_result',
 content=request_part.model_response(),
 is_error=True,
 )
 user_content_params.append(retry_param)
 if len(user_content_params) > 0:
 anthropic_messages.append(BetaMessageParam(role='user', content=user_content_params))
 elif isinstance(m, ModelResponse):
 assistant_content_params: list[
 BetaTextBlockParam
 | BetaToolUseBlockParam
 | BetaServerToolUseBlockParam
 | BetaWebSearchToolResultBlockParam
 | BetaCodeExecutionToolResultBlockParam
 | BetaThinkingBlockParam
 | BetaRedactedThinkingBlockParam
 | BetaMCPToolUseBlockParam
 | BetaMCPToolResultBlock
 ] = []
 for response_part in m.parts:
 if isinstance(response_part, TextPart):
 if response_part.content:
 assistant_content_params.append(BetaTextBlockParam(text=response_part.content, type='text'))
 elif isinstance(response_part, ToolCallPart):
 tool_use_block_param = BetaToolUseBlockParam(
 id=_guard_tool_call_id(t=response_part),
 type='tool_use',
 name=response_part.tool_name,
 input=response_part.args_as_dict(),
 )
 assistant_content_params.append(tool_use_block_param)
 elif isinstance(response_part, ThinkingPart):
 if (
 response_part.provider_name == self.system and response_part.signature is not None
 ): # pragma: no branch
 if response_part.id == 'redacted_thinking':
 assistant_content_params.append(
 BetaRedactedThinkingBlockParam(
 data=response_part.signature,
 type='redacted_thinking',
 )
 )
 else:
 assistant_content_params.append(
 BetaThinkingBlockParam(
 thinking=response_part.content,
 signature=response_part.signature,
 type='thinking',
 )
 )
 elif response_part.content: # pragma: no branch
 start_tag, end_tag = self.profile.thinking_tags
 assistant_content_params.append(
 BetaTextBlockParam(
 text='\n'.join([start_tag, response_part.content, end_tag]), type='text'
 )
 )
 elif isinstance(response_part, BuiltinToolCallPart):
 if response_part.provider_name == self.system:
 tool_use_id = _guard_tool_call_id(t=response_part)
 if response_part.tool_name == WebSearchTool.kind:
 server_tool_use_block_param = BetaServerToolUseBlockParam(
 id=tool_use_id,
 type='server_tool_use',
 name='web_search',
 input=response_part.args_as_dict(),
 )
 assistant_content_params.append(server_tool_use_block_param)
 elif response_part.tool_name == CodeExecutionTool.kind:
 server_tool_use_block_param = BetaServerToolUseBlockParam(
 id=tool_use_id,
 type='server_tool_use',
 name='code_execution',
 input=response_part.args_as_dict(),
 )
 assistant_content_params.append(server_tool_use_block_param)
 elif (
 response_part.tool_name.startswith(MCPServerTool.kind)
 and (server_id := response_part.tool_name.split(':', 1)[1])
 and (args := response_part.args_as_dict())
 and (tool_name := args.get('tool_name'))
 and (tool_args := args.get('tool_args'))
 ): # pragma: no branch
 mcp_tool_use_block_param = BetaMCPToolUseBlockParam(
 id=tool_use_id,
 type='mcp_tool_use',
 server_name=server_id,
 name=tool_name,
 input=tool_args,
 )
 assistant_content_params.append(mcp_tool_use_block_param)
 elif isinstance(response_part, BuiltinToolReturnPart):
 if response_part.provider_name == self.system:
 tool_use_id = _guard_tool_call_id(t=response_part)
 if response_part.tool_name in (
 WebSearchTool.kind,
 'web_search_tool_result', # Backward compatibility
 ) and isinstance(response_part.content, dict | list):
 assistant_content_params.append(
 BetaWebSearchToolResultBlockParam(
 tool_use_id=tool_use_id,
 type='web_search_tool_result',
 content=cast(
 BetaWebSearchToolResultBlockParamContentParam,
 response_part.content, # pyright: ignore[reportUnknownMemberType]
 ),
 )
 )
 elif response_part.tool_name in ( # pragma: no branch
 CodeExecutionTool.kind,
 'code_execution_tool_result', # Backward compatibility
 ) and isinstance(response_part.content, dict):
 assistant_content_params.append(
 BetaCodeExecutionToolResultBlockParam(
 tool_use_id=tool_use_id,
 type='code_execution_tool_result',
 content=cast(
 BetaCodeExecutionToolResultBlockParamContentParam,
 response_part.content, # pyright: ignore[reportUnknownMemberType]
 ),
 )
 )
 elif response_part.tool_name.startswith(MCPServerTool.kind) and isinstance(
 response_part.content, dict
 ): # pragma: no branch
 assistant_content_params.append(
 BetaMCPToolResultBlock(
 tool_use_id=tool_use_id,
 type='mcp_tool_result',
 **cast(dict[str, Any], response_part.content), # pyright: ignore[reportUnknownMemberType]
 )
 )
 elif isinstance(response_part, FilePart): # pragma: no cover
 # Files generated by models are not sent back to models that don't themselves generate files.
 pass
 else:
 assert_never(response_part)
 if len(assistant_content_params) > 0:
 anthropic_messages.append(BetaMessageParam(role='assistant', content=assistant_content_params))
 else:
 assert_never(m)
 if instructions := self._get_instructions(messages):
 system_prompt_parts.insert(0, instructions)
 system_prompt = '\n\n'.join(system_prompt_parts)
 return system_prompt, anthropic_messages
 @staticmethod
 async def_map_user_prompt(
 part: UserPromptPart,
 ) -> AsyncGenerator[BetaContentBlockParam]:
 if isinstance(part.content, str):
 if part.content: # Only yield non-empty text
 yield BetaTextBlockParam(text=part.content, type='text')
 else:
 for item in part.content:
 if isinstance(item, str):
 if item: # Only yield non-empty text
 yield BetaTextBlockParam(text=item, type='text')
 elif isinstance(item, BinaryContent):
 if item.is_image:
 yield BetaImageBlockParam(
 source={'data': io.BytesIO(item.data), 'media_type': item.media_type, 'type': 'base64'}, # type: ignore
 type='image',
 )
 elif item.media_type == 'application/pdf':
 yield BetaBase64PDFBlockParam(
 source=BetaBase64PDFSourceParam(
 data=io.BytesIO(item.data),
 media_type='application/pdf',
 type='base64',
 ),
 type='document',
 )
 else:
 raise RuntimeError('Only images and PDFs are supported for binary content')
 elif isinstance(item, ImageUrl):
 yield BetaImageBlockParam(source={'type': 'url', 'url': item.url}, type='image')
 elif isinstance(item, DocumentUrl):
 if item.media_type == 'application/pdf':
 yield BetaBase64PDFBlockParam(source={'url': item.url, 'type': 'url'}, type='document')
 elif item.media_type == 'text/plain':
 downloaded_item = await download_item(item, data_format='text')
 yield BetaBase64PDFBlockParam(
 source=BetaPlainTextSourceParam(
 data=downloaded_item['data'], media_type=item.media_type, type='text'
 ),
 type='document',
 )
 else: # pragma: no cover
 raise RuntimeError(f'Unsupported media type: {item.media_type}')
 else:
 raise RuntimeError(f'Unsupported content type: {type(item)}') # pragma: no cover
 @staticmethod
 def_map_tool_definition(f: ToolDefinition) -> BetaToolParam:
 return {
 'name': f.name,
 'description': f.description or '',
 'input_schema': f.parameters_json_schema,
 }
```
---|--- 
#### __init__
```
__init__(
 model_name: AnthropicModelName[](#pydantic_ai.models.anthropic.AnthropicModelName "pydantic_ai.models.anthropic.AnthropicModelName"),
 *,
 provider: (
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["anthropic", "gateway"]
 | Provider[](../../providers/#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncAnthropicClient]
 ) = "anthropic",
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None
)
```
Initialize an Anthropic model.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`model_name` | `AnthropicModelName[](#pydantic_ai.models.anthropic.AnthropicModelName "pydantic_ai.models.anthropic.AnthropicModelName")` | The name of the Anthropic model to use. List of model names available [here](https://docs.anthropic.com/en/docs/about-claude/models). | _required_ 
`provider` | `Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['anthropic', 'gateway'] | Provider[](../../providers/#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[AsyncAnthropicClient]` | The provider to use for the Anthropic API. Can be either the string 'anthropic' or an instance of `Provider[AsyncAnthropicClient]`. If not provided, the other parameters will be used. | `'anthropic'` 
`profile` | `ModelProfileSpec | None` | The model profile to use. Defaults to a profile picked by the provider based on the model name. | `None` 
`settings` | `ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Default model settings for this model instance. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/models/anthropic.py`
```
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
 model_name: AnthropicModelName,
 *,
 provider: Literal['anthropic', 'gateway'] | Provider[AsyncAnthropicClient] = 'anthropic',
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings | None = None,
):
"""Initialize an Anthropic model.
 Args:
 model_name: The name of the Anthropic model to use. List of model names available
 [here](https://docs.anthropic.com/en/docs/about-claude/models).
 provider: The provider to use for the Anthropic API. Can be either the string 'anthropic' or an
 instance of `Provider[AsyncAnthropicClient]`. If not provided, the other parameters will be used.
 profile: The model profile to use. Defaults to a profile picked by the provider based on the model name.
 settings: Default model settings for this model instance.
 """
 self._model_name = model_name
 if isinstance(provider, str):
 provider = infer_provider('gateway/anthropic' if provider == 'gateway' else provider)
 self._provider = provider
 self.client = provider.client
 super().__init__(settings=settings, profile=profile or provider.model_profile)
```
---|--- 
#### model_name `property`
```
model_name: AnthropicModelName[](#pydantic_ai.models.anthropic.AnthropicModelName "pydantic_ai.models.anthropic.AnthropicModelName")
```
The model name.
#### system `property`
```
system: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The model provider.
### AnthropicStreamedResponse `dataclass`
Bases: `StreamedResponse[](../base/#pydantic_ai.models.StreamedResponse "pydantic_ai.models.StreamedResponse")`
Implementation of `StreamedResponse` for Anthropic models.
Source code in `pydantic_ai_slim/pydantic_ai/models/anthropic.py`
```
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
```
| ```
@dataclass
classAnthropicStreamedResponse(StreamedResponse):
"""Implementation of `StreamedResponse` for Anthropic models."""
 _model_name: AnthropicModelName
 _response: AsyncIterable[BetaRawMessageStreamEvent]
 _timestamp: datetime
 _provider_name: str
 _provider_url: str
 async def_get_event_iterator(self) -> AsyncIterator[ModelResponseStreamEvent]: # noqa: C901
 current_block: BetaContentBlock | None = None
 builtin_tool_calls: dict[str, BuiltinToolCallPart] = {}
 async for event in self._response:
 if isinstance(event, BetaRawMessageStartEvent):
 self._usage = _map_usage(event, self._provider_name, self._provider_url, self._model_name)
 self.provider_response_id = event.message.id
 elif isinstance(event, BetaRawContentBlockStartEvent):
 current_block = event.content_block
 if isinstance(current_block, BetaTextBlock) and current_block.text:
 maybe_event = self._parts_manager.handle_text_delta(
 vendor_part_id=event.index, content=current_block.text
 )
 if maybe_event is not None: # pragma: no branch
 yield maybe_event
 elif isinstance(current_block, BetaThinkingBlock):
 yield self._parts_manager.handle_thinking_delta(
 vendor_part_id=event.index,
 content=current_block.thinking,
 signature=current_block.signature,
 provider_name=self.provider_name,
 )
 elif isinstance(current_block, BetaRedactedThinkingBlock):
 yield self._parts_manager.handle_thinking_delta(
 vendor_part_id=event.index,
 id='redacted_thinking',
 signature=current_block.data,
 provider_name=self.provider_name,
 )
 elif isinstance(current_block, BetaToolUseBlock):
 maybe_event = self._parts_manager.handle_tool_call_delta(
 vendor_part_id=event.index,
 tool_name=current_block.name,
 args=cast(dict[str, Any], current_block.input) or None,
 tool_call_id=current_block.id,
 )
 if maybe_event is not None: # pragma: no branch
 yield maybe_event
 elif isinstance(current_block, BetaServerToolUseBlock):
 call_part = _map_server_tool_use_block(current_block, self.provider_name)
 builtin_tool_calls[call_part.tool_call_id] = call_part
 yield self._parts_manager.handle_part(
 vendor_part_id=event.index,
 part=call_part,
 )
 elif isinstance(current_block, BetaWebSearchToolResultBlock):
 yield self._parts_manager.handle_part(
 vendor_part_id=event.index,
 part=_map_web_search_tool_result_block(current_block, self.provider_name),
 )
 elif isinstance(current_block, BetaCodeExecutionToolResultBlock):
 yield self._parts_manager.handle_part(
 vendor_part_id=event.index,
 part=_map_code_execution_tool_result_block(current_block, self.provider_name),
 )
 elif isinstance(current_block, BetaMCPToolUseBlock):
 call_part = _map_mcp_server_use_block(current_block, self.provider_name)
 builtin_tool_calls[call_part.tool_call_id] = call_part
 args_json = call_part.args_as_json_str()
 # Drop the final `{}}` so that we can add tool args deltas
 args_json_delta = args_json[:-3]
 assert args_json_delta.endswith('"tool_args":'), (
 f'Expected {args_json_delta!r} to end in `"tool_args":`'
 )
 yield self._parts_manager.handle_part(
 vendor_part_id=event.index, part=replace(call_part, args=None)
 )
 maybe_event = self._parts_manager.handle_tool_call_delta(
 vendor_part_id=event.index,
 args=args_json_delta,
 )
 if maybe_event is not None: # pragma: no branch
 yield maybe_event
 elif isinstance(current_block, BetaMCPToolResultBlock):
 call_part = builtin_tool_calls.get(current_block.tool_use_id)
 yield self._parts_manager.handle_part(
 vendor_part_id=event.index,
 part=_map_mcp_server_result_block(current_block, call_part, self.provider_name),
 )
 elif isinstance(event, BetaRawContentBlockDeltaEvent):
 if isinstance(event.delta, BetaTextDelta):
 maybe_event = self._parts_manager.handle_text_delta(
 vendor_part_id=event.index, content=event.delta.text
 )
 if maybe_event is not None: # pragma: no branch
 yield maybe_event
 elif isinstance(event.delta, BetaThinkingDelta):
 yield self._parts_manager.handle_thinking_delta(
 vendor_part_id=event.index,
 content=event.delta.thinking,
 provider_name=self.provider_name,
 )
 elif isinstance(event.delta, BetaSignatureDelta):
 yield self._parts_manager.handle_thinking_delta(
 vendor_part_id=event.index,
 signature=event.delta.signature,
 provider_name=self.provider_name,
 )
 elif isinstance(event.delta, BetaInputJSONDelta):
 maybe_event = self._parts_manager.handle_tool_call_delta(
 vendor_part_id=event.index,
 args=event.delta.partial_json,
 )
 if maybe_event is not None: # pragma: no branch
 yield maybe_event
 # TODO(Marcelo): We need to handle citations.
 elif isinstance(event.delta, BetaCitationsDelta):
 pass
 elif isinstance(event, BetaRawMessageDeltaEvent):
 self._usage = _map_usage(event, self._provider_name, self._provider_url, self._model_name, self._usage)
 if raw_finish_reason := event.delta.stop_reason: # pragma: no branch
 self.provider_details = {'finish_reason': raw_finish_reason}
 self.finish_reason = _FINISH_REASON_MAP.get(raw_finish_reason)
 elif isinstance(event, BetaRawContentBlockStopEvent): # pragma: no branch
 if isinstance(current_block, BetaMCPToolUseBlock):
 maybe_event = self._parts_manager.handle_tool_call_delta(
 vendor_part_id=event.index,
 args='}',
 )
 if maybe_event is not None: # pragma: no branch
 yield maybe_event
 current_block = None
 elif isinstance(event, BetaRawMessageStopEvent): # pragma: no branch
 current_block = None
 @property
 defmodel_name(self) -> AnthropicModelName:
"""Get the model name of the response."""
 return self._model_name
 @property
 defprovider_name(self) -> str:
"""Get the provider name."""
 return self._provider_name
 @property
 deftimestamp(self) -> datetime:
"""Get the timestamp of the response."""
 return self._timestamp
```
---|--- 
#### model_name `property`
```
model_name: AnthropicModelName[](#pydantic_ai.models.anthropic.AnthropicModelName "pydantic_ai.models.anthropic.AnthropicModelName")
```
Get the model name of the response.
#### provider_name `property`
```
provider_name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Get the provider name.
#### timestamp `property`
```
timestamp: datetime[](https://docs.python.org/3/library/datetime.html#datetime.datetime "datetime.datetime")
```
Get the timestamp of the response.