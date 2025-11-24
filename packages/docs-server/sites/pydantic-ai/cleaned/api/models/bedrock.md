[ Skip to content ](#pydantic_aimodelsbedrock)
# `pydantic_ai.models.bedrock`
## Setup
For details on how to set up authentication with this model, see [model configuration for Bedrock](../../../models/bedrock/).
### LatestBedrockModelNames `module-attribute`
```
LatestBedrockModelNames = Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[
 "amazon.titan-tg1-large",
 "amazon.titan-text-lite-v1",
 "amazon.titan-text-express-v1",
 "us.amazon.nova-pro-v1:0",
 "us.amazon.nova-lite-v1:0",
 "us.amazon.nova-micro-v1:0",
 "anthropic.claude-3-5-sonnet-20241022-v2:0",
 "us.anthropic.claude-3-5-sonnet-20241022-v2:0",
 "anthropic.claude-3-5-haiku-20241022-v1:0",
 "us.anthropic.claude-3-5-haiku-20241022-v1:0",
 "anthropic.claude-instant-v1",
 "anthropic.claude-v2:1",
 "anthropic.claude-v2",
 "anthropic.claude-3-sonnet-20240229-v1:0",
 "us.anthropic.claude-3-sonnet-20240229-v1:0",
 "anthropic.claude-3-haiku-20240307-v1:0",
 "us.anthropic.claude-3-haiku-20240307-v1:0",
 "anthropic.claude-3-opus-20240229-v1:0",
 "us.anthropic.claude-3-opus-20240229-v1:0",
 "anthropic.claude-3-5-sonnet-20240620-v1:0",
 "us.anthropic.claude-3-5-sonnet-20240620-v1:0",
 "anthropic.claude-3-7-sonnet-20250219-v1:0",
 "us.anthropic.claude-3-7-sonnet-20250219-v1:0",
 "anthropic.claude-opus-4-20250514-v1:0",
 "us.anthropic.claude-opus-4-20250514-v1:0",
 "anthropic.claude-sonnet-4-20250514-v1:0",
 "us.anthropic.claude-sonnet-4-20250514-v1:0",
 "cohere.command-text-v14",
 "cohere.command-r-v1:0",
 "cohere.command-r-plus-v1:0",
 "cohere.command-light-text-v14",
 "meta.llama3-8b-instruct-v1:0",
 "meta.llama3-70b-instruct-v1:0",
 "meta.llama3-1-8b-instruct-v1:0",
 "us.meta.llama3-1-8b-instruct-v1:0",
 "meta.llama3-1-70b-instruct-v1:0",
 "us.meta.llama3-1-70b-instruct-v1:0",
 "meta.llama3-1-405b-instruct-v1:0",
 "us.meta.llama3-2-11b-instruct-v1:0",
 "us.meta.llama3-2-90b-instruct-v1:0",
 "us.meta.llama3-2-1b-instruct-v1:0",
 "us.meta.llama3-2-3b-instruct-v1:0",
 "us.meta.llama3-3-70b-instruct-v1:0",
 "mistral.mistral-7b-instruct-v0:2",
 "mistral.mixtral-8x7b-instruct-v0:1",
 "mistral.mistral-large-2402-v1:0",
 "mistral.mistral-large-2407-v1:0",
]
```
Latest Bedrock models.
### BedrockModelName `module-attribute`
```
BedrockModelName = str[](https://docs.python.org/3/library/stdtypes.html#str) | LatestBedrockModelNames[](#pydantic_ai.models.bedrock.LatestBedrockModelNames "pydantic_ai.models.bedrock.LatestBedrockModelNames")
```
Possible Bedrock model names.
Since Bedrock supports a variety of date-stamped models, we explicitly list the latest models but allow any name in the type hints. See [the Bedrock docs](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html) for a full list.
### BedrockModelSettings
Bases: `ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings")`
Settings for Bedrock models.
See [the Bedrock Converse API docs](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html#API_runtime_Converse_RequestSyntax) for a full list. See [the boto3 implementation](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime/client/converse.html) of the Bedrock Converse API.
Source code in `pydantic_ai_slim/pydantic_ai/models/bedrock.py`
```
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
```
| ```
classBedrockModelSettings(ModelSettings, total=False):
"""Settings for Bedrock models.
 See [the Bedrock Converse API docs](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html#API_runtime_Converse_RequestSyntax) for a full list.
 See [the boto3 implementation](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime/client/converse.html) of the Bedrock Converse API.
 """
 # ALL FIELDS MUST BE `bedrock_` PREFIXED SO YOU CAN MERGE THEM WITH OTHER MODELS.
 bedrock_guardrail_config: GuardrailConfigurationTypeDef
"""Content moderation and safety settings for Bedrock API requests.
 See more about it on <https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_GuardrailConfiguration.html>.
 """
 bedrock_performance_configuration: PerformanceConfigurationTypeDef
"""Performance optimization settings for model inference.
 See more about it on <https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_PerformanceConfiguration.html>.
 """
 bedrock_request_metadata: dict[str, str]
"""Additional metadata to attach to Bedrock API requests.
 See more about it on <https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html#API_runtime_Converse_RequestSyntax>.
 """
 bedrock_additional_model_response_fields_paths: list[str]
"""JSON paths to extract additional fields from model responses.
 See more about it on <https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html>.
 """
 bedrock_prompt_variables: Mapping[str, PromptVariableValuesTypeDef]
"""Variables for substitution into prompt templates.
 See more about it on <https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_PromptVariableValues.html>.
 """
 bedrock_additional_model_requests_fields: Mapping[str, Any]
"""Additional model-specific parameters to include in requests.
 See more about it on <https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html>.
 """
```
---|--- 
#### bedrock_guardrail_config `instance-attribute`
```
bedrock_guardrail_config: GuardrailConfigurationTypeDef
```
Content moderation and safety settings for Bedrock API requests.
See more about it on <https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_GuardrailConfiguration.html>.
#### bedrock_performance_configuration `instance-attribute`
```
bedrock_performance_configuration: (
 PerformanceConfigurationTypeDef
)
```
Performance optimization settings for model inference.
See more about it on <https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_PerformanceConfiguration.html>.
#### bedrock_request_metadata `instance-attribute`
```
bedrock_request_metadata: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Additional metadata to attach to Bedrock API requests.
See more about it on <https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html#API_runtime_Converse_RequestSyntax>.
#### bedrock_additional_model_response_fields_paths `instance-attribute`
```
bedrock_additional_model_response_fields_paths: list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
JSON paths to extract additional fields from model responses.
See more about it on <https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html>.
#### bedrock_prompt_variables `instance-attribute`
```
bedrock_prompt_variables: Mapping[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Mapping "collections.abc.Mapping")[
 str[](https://docs.python.org/3/library/stdtypes.html#str), PromptVariableValuesTypeDef
]
```
Variables for substitution into prompt templates.
See more about it on <https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_PromptVariableValues.html>.
#### bedrock_additional_model_requests_fields `instance-attribute`
```
bedrock_additional_model_requests_fields: Mapping[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Mapping "collections.abc.Mapping")[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
Additional model-specific parameters to include in requests.
See more about it on <https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html>.
### BedrockConverseModel `dataclass`
Bases: `Model[](../base/#pydantic_ai.models.Model "pydantic_ai.models.Model")`
A model that uses the Bedrock Converse API.
Source code in `pydantic_ai_slim/pydantic_ai/models/bedrock.py`
```
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
```
| ```
@dataclass(init=False)
classBedrockConverseModel(Model):
"""A model that uses the Bedrock Converse API."""
 client: BedrockRuntimeClient
 _model_name: BedrockModelName = field(repr=False)
 _provider: Provider[BaseClient] = field(repr=False)
 def__init__(
 self,
 model_name: BedrockModelName,
 *,
 provider: Literal['bedrock', 'gateway'] | Provider[BaseClient] = 'bedrock',
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings | None = None,
 ):
"""Initialize a Bedrock model.
 Args:
 model_name: The name of the model to use.
 model_name: The name of the Bedrock model to use. List of model names available
 [here](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html).
 provider: The provider to use for authentication and API access. Can be either the string
 'bedrock' or an instance of `Provider[BaseClient]`. If not provided, a new provider will be
 created using the other parameters.
 profile: The model profile to use. Defaults to a profile picked by the provider based on the model name.
 settings: Model-specific settings that will be used as defaults for this model.
 """
 self._model_name = model_name
 if isinstance(provider, str):
 provider = infer_provider('gateway/bedrock' if provider == 'gateway' else provider)
 self._provider = provider
 self.client = cast('BedrockRuntimeClient', provider.client)
 super().__init__(settings=settings, profile=profile or provider.model_profile)
 @property
 defbase_url(self) -> str:
 return str(self.client.meta.endpoint_url)
 @property
 defmodel_name(self) -> str:
"""The model name."""
 return self._model_name
 @property
 defsystem(self) -> str:
"""The model provider."""
 return self._provider.name
 def_get_tools(self, model_request_parameters: ModelRequestParameters) -> list[ToolTypeDef]:
 return [self._map_tool_definition(r) for r in model_request_parameters.tool_defs.values()]
 @staticmethod
 def_map_tool_definition(f: ToolDefinition) -> ToolTypeDef:
 tool_spec: ToolSpecificationTypeDef = {'name': f.name, 'inputSchema': {'json': f.parameters_json_schema}}
 if f.description: # pragma: no branch
 tool_spec['description'] = f.description
 return {'toolSpec': tool_spec}
 async defrequest(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ) -> ModelResponse:
 model_settings, model_request_parameters = self.prepare_request(
 model_settings,
 model_request_parameters,
 )
 settings = cast(BedrockModelSettings, model_settings or {})
 response = await self._messages_create(messages, False, settings, model_request_parameters)
 model_response = await self._process_response(response)
 return model_response
 @asynccontextmanager
 async defrequest_stream(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 run_context: RunContext[Any] | None = None,
 ) -> AsyncIterator[StreamedResponse]:
 model_settings, model_request_parameters = self.prepare_request(
 model_settings,
 model_request_parameters,
 )
 settings = cast(BedrockModelSettings, model_settings or {})
 response = await self._messages_create(messages, True, settings, model_request_parameters)
 yield BedrockStreamedResponse(
 model_request_parameters=model_request_parameters,
 _model_name=self.model_name,
 _event_stream=response['stream'],
 _provider_name=self._provider.name,
 _provider_response_id=response.get('ResponseMetadata', {}).get('RequestId', None),
 )
 async def_process_response(self, response: ConverseResponseTypeDef) -> ModelResponse:
 items: list[ModelResponsePart] = []
 if message := response['output'].get('message'): # pragma: no branch
 for item in message['content']:
 if reasoning_content := item.get('reasoningContent'):
 if redacted_content := reasoning_content.get('redactedContent'):
 items.append(
 ThinkingPart(
 id='redacted_content',
 content='',
 signature=redacted_content.decode('utf-8'),
 provider_name=self.system,
 )
 )
 elif reasoning_text := reasoning_content.get('reasoningText'): # pragma: no branch
 signature = reasoning_text.get('signature')
 items.append(
 ThinkingPart(
 content=reasoning_text['text'],
 signature=signature,
 provider_name=self.system if signature else None,
 )
 )
 if text := item.get('text'):
 items.append(TextPart(content=text))
 elif tool_use := item.get('toolUse'):
 items.append(
 ToolCallPart(
 tool_name=tool_use['name'],
 args=tool_use['input'],
 tool_call_id=tool_use['toolUseId'],
 ),
 )
 u = usage.RequestUsage(
 input_tokens=response['usage']['inputTokens'],
 output_tokens=response['usage']['outputTokens'],
 )
 response_id = response.get('ResponseMetadata', {}).get('RequestId', None)
 raw_finish_reason = response['stopReason']
 provider_details = {'finish_reason': raw_finish_reason}
 finish_reason = _FINISH_REASON_MAP.get(raw_finish_reason)
 return ModelResponse(
 parts=items,
 usage=u,
 model_name=self.model_name,
 provider_response_id=response_id,
 provider_name=self._provider.name,
 finish_reason=finish_reason,
 provider_details=provider_details,
 )
 @overload
 async def_messages_create(
 self,
 messages: list[ModelMessage],
 stream: Literal[True],
 model_settings: BedrockModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ) -> ConverseStreamResponseTypeDef:
 pass
 @overload
 async def_messages_create(
 self,
 messages: list[ModelMessage],
 stream: Literal[False],
 model_settings: BedrockModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ) -> ConverseResponseTypeDef:
 pass
 async def_messages_create(
 self,
 messages: list[ModelMessage],
 stream: bool,
 model_settings: BedrockModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ) -> ConverseResponseTypeDef | ConverseStreamResponseTypeDef:
 system_prompt, bedrock_messages = await self._map_messages(messages)
 inference_config = self._map_inference_config(model_settings)
 params: ConverseRequestTypeDef = {
 'modelId': self.model_name,
 'messages': bedrock_messages,
 'system': system_prompt,
 'inferenceConfig': inference_config,
 }
 tool_config = self._map_tool_config(model_request_parameters)
 if tool_config:
 params['toolConfig'] = tool_config
 if model_request_parameters.builtin_tools:
 raise UserError('Bedrock does not support built-in tools')
 # Bedrock supports a set of specific extra parameters
 if model_settings:
 if guardrail_config := model_settings.get('bedrock_guardrail_config', None):
 params['guardrailConfig'] = guardrail_config
 if performance_configuration := model_settings.get('bedrock_performance_configuration', None):
 params['performanceConfig'] = performance_configuration
 if request_metadata := model_settings.get('bedrock_request_metadata', None):
 params['requestMetadata'] = request_metadata
 if additional_model_response_fields_paths := model_settings.get(
 'bedrock_additional_model_response_fields_paths', None
 ):
 params['additionalModelResponseFieldPaths'] = additional_model_response_fields_paths
 if additional_model_requests_fields := model_settings.get('bedrock_additional_model_requests_fields', None):
 params['additionalModelRequestFields'] = additional_model_requests_fields
 if prompt_variables := model_settings.get('bedrock_prompt_variables', None):
 params['promptVariables'] = prompt_variables
 if stream:
 model_response = await anyio.to_thread.run_sync(functools.partial(self.client.converse_stream, **params))
 else:
 model_response = await anyio.to_thread.run_sync(functools.partial(self.client.converse, **params))
 return model_response
 @staticmethod
 def_map_inference_config(
 model_settings: ModelSettings | None,
 ) -> InferenceConfigurationTypeDef:
 model_settings = model_settings or {}
 inference_config: InferenceConfigurationTypeDef = {}
 if max_tokens := model_settings.get('max_tokens'):
 inference_config['maxTokens'] = max_tokens
 if (temperature := model_settings.get('temperature')) is not None:
 inference_config['temperature'] = temperature
 if top_p := model_settings.get('top_p'):
 inference_config['topP'] = top_p
 if stop_sequences := model_settings.get('stop_sequences'):
 inference_config['stopSequences'] = stop_sequences
 return inference_config
 def_map_tool_config(self, model_request_parameters: ModelRequestParameters) -> ToolConfigurationTypeDef | None:
 tools = self._get_tools(model_request_parameters)
 if not tools:
 return None
 tool_choice: ToolChoiceTypeDef
 if not model_request_parameters.allow_text_output:
 tool_choice = {'any': {}}
 else:
 tool_choice = {'auto': {}}
 tool_config: ToolConfigurationTypeDef = {'tools': tools}
 if tool_choice and BedrockModelProfile.from_profile(self.profile).bedrock_supports_tool_choice:
 tool_config['toolChoice'] = tool_choice
 return tool_config
 async def_map_messages( # noqa: C901
 self, messages: list[ModelMessage]
 ) -> tuple[list[SystemContentBlockTypeDef], list[MessageUnionTypeDef]]:
"""Maps a `pydantic_ai.Message` to the Bedrock `MessageUnionTypeDef`.
 Groups consecutive ToolReturnPart objects into a single user message as required by Bedrock Claude/Nova models.
 """
 profile = BedrockModelProfile.from_profile(self.profile)
 system_prompt: list[SystemContentBlockTypeDef] = []
 bedrock_messages: list[MessageUnionTypeDef] = []
 document_count: Iterator[int] = count(1)
 for message in messages:
 if isinstance(message, ModelRequest):
 for part in message.parts:
 if isinstance(part, SystemPromptPart) and part.content:
 system_prompt.append({'text': part.content})
 elif isinstance(part, UserPromptPart):
 bedrock_messages.extend(await self._map_user_prompt(part, document_count))
 elif isinstance(part, ToolReturnPart):
 assert part.tool_call_id is not None
 bedrock_messages.append(
 {
 'role': 'user',
 'content': [
 {
 'toolResult': {
 'toolUseId': part.tool_call_id,
 'content': [
 {'text': part.model_response_str()}
 if profile.bedrock_tool_result_format == 'text'
 else {'json': part.model_response_object()}
 ],
 'status': 'success',
 }
 }
 ],
 }
 )
 elif isinstance(part, RetryPromptPart):
 # TODO(Marcelo): We need to add a test here.
 if part.tool_name is None: # pragma: no cover
 bedrock_messages.append({'role': 'user', 'content': [{'text': part.model_response()}]})
 else:
 assert part.tool_call_id is not None
 bedrock_messages.append(
 {
 'role': 'user',
 'content': [
 {
 'toolResult': {
 'toolUseId': part.tool_call_id,
 'content': [{'text': part.model_response()}],
 'status': 'error',
 }
 }
 ],
 }
 )
 elif isinstance(message, ModelResponse):
 content: list[ContentBlockOutputTypeDef] = []
 for item in message.parts:
 if isinstance(item, TextPart):
 content.append({'text': item.content})
 elif isinstance(item, ThinkingPart):
 if (
 item.provider_name == self.system
 and item.signature
 and BedrockModelProfile.from_profile(self.profile).bedrock_send_back_thinking_parts
 ):
 if item.id == 'redacted_content':
 reasoning_content: ReasoningContentBlockOutputTypeDef = {
 'redactedContent': item.signature.encode('utf-8'),
 }
 else:
 reasoning_content: ReasoningContentBlockOutputTypeDef = {
 'reasoningText': {
 'text': item.content,
 'signature': item.signature,
 }
 }
 content.append({'reasoningContent': reasoning_content})
 else:
 start_tag, end_tag = self.profile.thinking_tags
 content.append({'text': '\n'.join([start_tag, item.content, end_tag])})
 elif isinstance(item, BuiltinToolCallPart | BuiltinToolReturnPart):
 pass
 else:
 assert isinstance(item, ToolCallPart)
 content.append(self._map_tool_call(item))
 bedrock_messages.append({'role': 'assistant', 'content': content})
 else:
 assert_never(message)
 # Merge together sequential user messages.
 processed_messages: list[MessageUnionTypeDef] = []
 last_message: dict[str, Any] | None = None
 for current_message in bedrock_messages:
 if (
 last_message is not None
 and current_message['role'] == last_message['role']
 and current_message['role'] == 'user'
 ):
 # Add the new user content onto the existing user message.
 last_content = list(last_message['content'])
 last_content.extend(current_message['content'])
 last_message['content'] = last_content
 continue
 # Add the entire message to the list of messages.
 processed_messages.append(current_message)
 last_message = cast(dict[str, Any], current_message)
 if instructions := self._get_instructions(messages):
 system_prompt.insert(0, {'text': instructions})
 return system_prompt, processed_messages
 @staticmethod
 async def_map_user_prompt(part: UserPromptPart, document_count: Iterator[int]) -> list[MessageUnionTypeDef]:
 content: list[ContentBlockUnionTypeDef] = []
 if isinstance(part.content, str):
 content.append({'text': part.content})
 else:
 for item in part.content:
 if isinstance(item, str):
 content.append({'text': item})
 elif isinstance(item, BinaryContent):
 format = item.format
 if item.is_document:
 name = f'Document {next(document_count)}'
 assert format in ('pdf', 'txt', 'csv', 'doc', 'docx', 'xls', 'xlsx', 'html', 'md')
 content.append({'document': {'name': name, 'format': format, 'source': {'bytes': item.data}}})
 elif item.is_image:
 assert format in ('jpeg', 'png', 'gif', 'webp')
 content.append({'image': {'format': format, 'source': {'bytes': item.data}}})
 elif item.is_video:
 assert format in ('mkv', 'mov', 'mp4', 'webm', 'flv', 'mpeg', 'mpg', 'wmv', 'three_gp')
 content.append({'video': {'format': format, 'source': {'bytes': item.data}}})
 else:
 raise NotImplementedError('Binary content is not supported yet.')
 elif isinstance(item, ImageUrl | DocumentUrl | VideoUrl):
 downloaded_item = await download_item(item, data_format='bytes', type_format='extension')
 format = downloaded_item['data_type']
 if item.kind == 'image-url':
 format = item.media_type.split('/')[1]
 assert format in ('jpeg', 'png', 'gif', 'webp'), f'Unsupported image format: {format}'
 image: ImageBlockTypeDef = {'format': format, 'source': {'bytes': downloaded_item['data']}}
 content.append({'image': image})
 elif item.kind == 'document-url':
 name = f'Document {next(document_count)}'
 document: DocumentBlockTypeDef = {
 'name': name,
 'format': item.format,
 'source': {'bytes': downloaded_item['data']},
 }
 content.append({'document': document})
 elif item.kind == 'video-url': # pragma: no branch
 format = item.media_type.split('/')[1]
 assert format in (
 'mkv',
 'mov',
 'mp4',
 'webm',
 'flv',
 'mpeg',
 'mpg',
 'wmv',
 'three_gp',
 ), f'Unsupported video format: {format}'
 video: VideoBlockTypeDef = {'format': format, 'source': {'bytes': downloaded_item['data']}}
 content.append({'video': video})
 elif isinstance(item, AudioUrl): # pragma: no cover
 raise NotImplementedError('Audio is not supported yet.')
 else:
 assert_never(item)
 return [{'role': 'user', 'content': content}]
 @staticmethod
 def_map_tool_call(t: ToolCallPart) -> ContentBlockOutputTypeDef:
 return {
 'toolUse': {'toolUseId': _utils.guard_tool_call_id(t=t), 'name': t.tool_name, 'input': t.args_as_dict()}
 }
```
---|--- 
#### __init__
```
__init__(
 model_name: BedrockModelName[](#pydantic_ai.models.bedrock.BedrockModelName "pydantic_ai.models.bedrock.BedrockModelName"),
 *,
 provider: (
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["bedrock", "gateway"] | Provider[](../../providers/#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[BaseClient]
 ) = "bedrock",
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None
)
```
Initialize a Bedrock model.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`model_name` | `BedrockModelName[](#pydantic_ai.models.bedrock.BedrockModelName "pydantic_ai.models.bedrock.BedrockModelName")` | The name of the model to use. | _required_ 
`model_name` | `BedrockModelName[](#pydantic_ai.models.bedrock.BedrockModelName "pydantic_ai.models.bedrock.BedrockModelName")` | The name of the Bedrock model to use. List of model names available [here](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html). | _required_ 
`provider` | `Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['bedrock', 'gateway'] | Provider[](../../providers/#pydantic_ai.providers.Provider "pydantic_ai.providers.Provider")[BaseClient]` | The provider to use for authentication and API access. Can be either the string 'bedrock' or an instance of `Provider[BaseClient]`. If not provided, a new provider will be created using the other parameters. | `'bedrock'` 
`profile` | `ModelProfileSpec | None` | The model profile to use. Defaults to a profile picked by the provider based on the model name. | `None` 
`settings` | `ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Model-specific settings that will be used as defaults for this model. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/models/bedrock.py`
```
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
```
| ```
def__init__(
 self,
 model_name: BedrockModelName,
 *,
 provider: Literal['bedrock', 'gateway'] | Provider[BaseClient] = 'bedrock',
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings | None = None,
):
"""Initialize a Bedrock model.
 Args:
 model_name: The name of the model to use.
 model_name: The name of the Bedrock model to use. List of model names available
 [here](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html).
 provider: The provider to use for authentication and API access. Can be either the string
 'bedrock' or an instance of `Provider[BaseClient]`. If not provided, a new provider will be
 created using the other parameters.
 profile: The model profile to use. Defaults to a profile picked by the provider based on the model name.
 settings: Model-specific settings that will be used as defaults for this model.
 """
 self._model_name = model_name
 if isinstance(provider, str):
 provider = infer_provider('gateway/bedrock' if provider == 'gateway' else provider)
 self._provider = provider
 self.client = cast('BedrockRuntimeClient', provider.client)
 super().__init__(settings=settings, profile=profile or provider.model_profile)
```
---|--- 
#### model_name `property`
```
model_name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The model name.
#### system `property`
```
system: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The model provider.
### BedrockStreamedResponse `dataclass`
Bases: `StreamedResponse[](../base/#pydantic_ai.models.StreamedResponse "pydantic_ai.models.StreamedResponse")`
Implementation of `StreamedResponse` for Bedrock models.
Source code in `pydantic_ai_slim/pydantic_ai/models/bedrock.py`
```
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
```
| ```
@dataclass
classBedrockStreamedResponse(StreamedResponse):
"""Implementation of `StreamedResponse` for Bedrock models."""
 _model_name: BedrockModelName
 _event_stream: EventStream[ConverseStreamOutputTypeDef]
 _provider_name: str
 _timestamp: datetime = field(default_factory=_utils.now_utc)
 _provider_response_id: str | None = None
 async def_get_event_iterator(self) -> AsyncIterator[ModelResponseStreamEvent]: # noqa: C901
"""Return an async iterator of [`ModelResponseStreamEvent`][pydantic_ai.messages.ModelResponseStreamEvent]s.
 This method should be implemented by subclasses to translate the vendor-specific stream of events into
 pydantic_ai-format events.
 """
 if self._provider_response_id is not None: # pragma: no cover
 self.provider_response_id = self._provider_response_id
 chunk: ConverseStreamOutputTypeDef
 tool_id: str | None = None
 async for chunk in _AsyncIteratorWrapper(self._event_stream):
 match chunk:
 case{'messageStart': _}:
 continue
 case {'messageStop': message_stop}:
 raw_finish_reason = message_stop['stopReason']
 self.provider_details = {'finish_reason': raw_finish_reason}
 self.finish_reason = _FINISH_REASON_MAP.get(raw_finish_reason)
 case {'metadata': metadata}:
 if 'usage' in metadata: # pragma: no branch
 self._usage += self._map_usage(metadata)
 case {'contentBlockStart': content_block_start}:
 index = content_block_start['contentBlockIndex']
 start = content_block_start['start']
 if 'toolUse' in start: # pragma: no branch
 tool_use_start = start['toolUse']
 tool_id = tool_use_start['toolUseId']
 tool_name = tool_use_start['name']
 maybe_event = self._parts_manager.handle_tool_call_delta(
 vendor_part_id=index,
 tool_name=tool_name,
 args=None,
 tool_call_id=tool_id,
 )
 if maybe_event: # pragma: no branch
 yield maybe_event
 case {'contentBlockDelta': content_block_delta}:
 index = content_block_delta['contentBlockIndex']
 delta = content_block_delta['delta']
 if 'reasoningContent' in delta:
 if redacted_content := delta['reasoningContent'].get('redactedContent'):
 yield self._parts_manager.handle_thinking_delta(
 vendor_part_id=index,
 id='redacted_content',
 signature=redacted_content.decode('utf-8'),
 provider_name=self.provider_name,
 )
 else:
 signature = delta['reasoningContent'].get('signature')
 yield self._parts_manager.handle_thinking_delta(
 vendor_part_id=index,
 content=delta['reasoningContent'].get('text'),
 signature=signature,
 provider_name=self.provider_name if signature else None,
 )
 if text := delta.get('text'):
 maybe_event = self._parts_manager.handle_text_delta(vendor_part_id=index, content=text)
 if maybe_event is not None: # pragma: no branch
 yield maybe_event
 if 'toolUse' in delta:
 tool_use = delta['toolUse']
 maybe_event = self._parts_manager.handle_tool_call_delta(
 vendor_part_id=index,
 tool_name=tool_use.get('name'),
 args=tool_use.get('input'),
 tool_call_id=tool_id,
 )
 if maybe_event: # pragma: no branch
 yield maybe_event
 case_:
 pass # pyright wants match statements to be exhaustive
 @property
 defmodel_name(self) -> str:
"""Get the model name of the response."""
 return self._model_name
 @property
 defprovider_name(self) -> str:
"""Get the provider name."""
 return self._provider_name
 @property
 deftimestamp(self) -> datetime:
 return self._timestamp
 def_map_usage(self, metadata: ConverseStreamMetadataEventTypeDef) -> usage.RequestUsage:
 return usage.RequestUsage(
 input_tokens=metadata['usage']['inputTokens'],
 output_tokens=metadata['usage']['outputTokens'],
 )
```
---|--- 
#### model_name `property`
```
model_name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Get the model name of the response.
#### provider_name `property`
```
provider_name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Get the provider name.