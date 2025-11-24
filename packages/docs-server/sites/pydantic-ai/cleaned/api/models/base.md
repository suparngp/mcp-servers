[ Skip to content ](#pydantic_aimodels)
# `pydantic_ai.models`
Logic related to making requests to an LLM.
The aim here is to make a common interface for different LLMs, so that the rest of the code can be agnostic to the specific LLM being used.
### KnownModelName `module-attribute`
```
KnownModelName = TypeAliasType[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypeAliasType "typing_extensions.TypeAliasType")(
 "KnownModelName",
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[
 "anthropic:claude-3-5-haiku-20241022",
 "anthropic:claude-3-5-haiku-latest",
 "anthropic:claude-3-5-sonnet-20240620",
 "anthropic:claude-3-5-sonnet-20241022",
 "anthropic:claude-3-5-sonnet-latest",
 "anthropic:claude-haiku-4-5",
 "anthropic:claude-haiku-4-5-20251001",
 "anthropic:claude-3-7-sonnet-20250219",
 "anthropic:claude-3-7-sonnet-latest",
 "anthropic:claude-3-haiku-20240307",
 "anthropic:claude-3-opus-20240229",
 "anthropic:claude-3-opus-latest",
 "anthropic:claude-4-opus-20250514",
 "anthropic:claude-4-sonnet-20250514",
 "anthropic:claude-opus-4-0",
 "anthropic:claude-opus-4-1-20250805",
 "anthropic:claude-opus-4-20250514",
 "anthropic:claude-sonnet-4-0",
 "anthropic:claude-sonnet-4-20250514",
 "anthropic:claude-sonnet-4-5",
 "anthropic:claude-sonnet-4-5-20250929",
 "bedrock:amazon.titan-tg1-large",
 "bedrock:amazon.titan-text-lite-v1",
 "bedrock:amazon.titan-text-express-v1",
 "bedrock:us.amazon.nova-pro-v1:0",
 "bedrock:us.amazon.nova-lite-v1:0",
 "bedrock:us.amazon.nova-micro-v1:0",
 "bedrock:anthropic.claude-3-5-sonnet-20241022-v2:0",
 "bedrock:us.anthropic.claude-3-5-sonnet-20241022-v2:0",
 "bedrock:anthropic.claude-3-5-haiku-20241022-v1:0",
 "bedrock:us.anthropic.claude-3-5-haiku-20241022-v1:0",
 "bedrock:anthropic.claude-instant-v1",
 "bedrock:anthropic.claude-v2:1",
 "bedrock:anthropic.claude-v2",
 "bedrock:anthropic.claude-3-sonnet-20240229-v1:0",
 "bedrock:us.anthropic.claude-3-sonnet-20240229-v1:0",
 "bedrock:anthropic.claude-3-haiku-20240307-v1:0",
 "bedrock:us.anthropic.claude-3-haiku-20240307-v1:0",
 "bedrock:anthropic.claude-3-opus-20240229-v1:0",
 "bedrock:us.anthropic.claude-3-opus-20240229-v1:0",
 "bedrock:anthropic.claude-3-5-sonnet-20240620-v1:0",
 "bedrock:us.anthropic.claude-3-5-sonnet-20240620-v1:0",
 "bedrock:anthropic.claude-3-7-sonnet-20250219-v1:0",
 "bedrock:us.anthropic.claude-3-7-sonnet-20250219-v1:0",
 "bedrock:anthropic.claude-opus-4-20250514-v1:0",
 "bedrock:us.anthropic.claude-opus-4-20250514-v1:0",
 "bedrock:anthropic.claude-sonnet-4-20250514-v1:0",
 "bedrock:us.anthropic.claude-sonnet-4-20250514-v1:0",
 "bedrock:cohere.command-text-v14",
 "bedrock:cohere.command-r-v1:0",
 "bedrock:cohere.command-r-plus-v1:0",
 "bedrock:cohere.command-light-text-v14",
 "bedrock:meta.llama3-8b-instruct-v1:0",
 "bedrock:meta.llama3-70b-instruct-v1:0",
 "bedrock:meta.llama3-1-8b-instruct-v1:0",
 "bedrock:us.meta.llama3-1-8b-instruct-v1:0",
 "bedrock:meta.llama3-1-70b-instruct-v1:0",
 "bedrock:us.meta.llama3-1-70b-instruct-v1:0",
 "bedrock:meta.llama3-1-405b-instruct-v1:0",
 "bedrock:us.meta.llama3-2-11b-instruct-v1:0",
 "bedrock:us.meta.llama3-2-90b-instruct-v1:0",
 "bedrock:us.meta.llama3-2-1b-instruct-v1:0",
 "bedrock:us.meta.llama3-2-3b-instruct-v1:0",
 "bedrock:us.meta.llama3-3-70b-instruct-v1:0",
 "bedrock:mistral.mistral-7b-instruct-v0:2",
 "bedrock:mistral.mixtral-8x7b-instruct-v0:1",
 "bedrock:mistral.mistral-large-2402-v1:0",
 "bedrock:mistral.mistral-large-2407-v1:0",
 "cerebras:gpt-oss-120b",
 "cerebras:llama3.1-8b",
 "cerebras:llama-3.3-70b",
 "cerebras:llama-4-scout-17b-16e-instruct",
 "cerebras:llama-4-maverick-17b-128e-instruct",
 "cerebras:qwen-3-235b-a22b-instruct-2507",
 "cerebras:qwen-3-32b",
 "cerebras:qwen-3-coder-480b",
 "cerebras:qwen-3-235b-a22b-thinking-2507",
 "cohere:c4ai-aya-expanse-32b",
 "cohere:c4ai-aya-expanse-8b",
 "cohere:command-nightly",
 "cohere:command-r-08-2024",
 "cohere:command-r-plus-08-2024",
 "cohere:command-r7b-12-2024",
 "deepseek:deepseek-chat",
 "deepseek:deepseek-reasoner",
 "google-gla:gemini-2.0-flash",
 "google-gla:gemini-2.0-flash-lite",
 "google-gla:gemini-2.5-flash",
 "google-gla:gemini-2.5-flash-preview-09-2025",
 "google-gla:gemini-flash-latest",
 "google-gla:gemini-2.5-flash-lite",
 "google-gla:gemini-2.5-flash-lite-preview-09-2025",
 "google-gla:gemini-flash-lite-latest",
 "google-gla:gemini-2.5-pro",
 "google-vertex:gemini-2.0-flash",
 "google-vertex:gemini-2.0-flash-lite",
 "google-vertex:gemini-2.5-flash",
 "google-vertex:gemini-2.5-flash-preview-09-2025",
 "google-vertex:gemini-flash-latest",
 "google-vertex:gemini-2.5-flash-lite",
 "google-vertex:gemini-2.5-flash-lite-preview-09-2025",
 "google-vertex:gemini-flash-lite-latest",
 "google-vertex:gemini-2.5-pro",
 "grok:grok-4",
 "grok:grok-4-0709",
 "grok:grok-3",
 "grok:grok-3-mini",
 "grok:grok-3-fast",
 "grok:grok-3-mini-fast",
 "grok:grok-2-vision-1212",
 "grok:grok-2-image-1212",
 "groq:distil-whisper-large-v3-en",
 "groq:gemma2-9b-it",
 "groq:llama-3.3-70b-versatile",
 "groq:llama-3.1-8b-instant",
 "groq:llama-guard-3-8b",
 "groq:llama3-70b-8192",
 "groq:llama3-8b-8192",
 "groq:moonshotai/kimi-k2-instruct",
 "groq:whisper-large-v3",
 "groq:whisper-large-v3-turbo",
 "groq:playai-tts",
 "groq:playai-tts-arabic",
 "groq:qwen-qwq-32b",
 "groq:mistral-saba-24b",
 "groq:qwen-2.5-coder-32b",
 "groq:qwen-2.5-32b",
 "groq:deepseek-r1-distill-qwen-32b",
 "groq:deepseek-r1-distill-llama-70b",
 "groq:llama-3.3-70b-specdec",
 "groq:llama-3.2-1b-preview",
 "groq:llama-3.2-3b-preview",
 "groq:llama-3.2-11b-vision-preview",
 "groq:llama-3.2-90b-vision-preview",
 "heroku:claude-3-5-haiku",
 "heroku:claude-3-5-sonnet-latest",
 "heroku:claude-3-7-sonnet",
 "heroku:claude-4-sonnet",
 "heroku:claude-3-haiku",
 "heroku:gpt-oss-120b",
 "heroku:nova-lite",
 "heroku:nova-pro",
 "huggingface:Qwen/QwQ-32B",
 "huggingface:Qwen/Qwen2.5-72B-Instruct",
 "huggingface:Qwen/Qwen3-235B-A22B",
 "huggingface:Qwen/Qwen3-32B",
 "huggingface:deepseek-ai/DeepSeek-R1",
 "huggingface:meta-llama/Llama-3.3-70B-Instruct",
 "huggingface:meta-llama/Llama-4-Maverick-17B-128E-Instruct",
 "huggingface:meta-llama/Llama-4-Scout-17B-16E-Instruct",
 "mistral:codestral-latest",
 "mistral:mistral-large-latest",
 "mistral:mistral-moderation-latest",
 "mistral:mistral-small-latest",
 "moonshotai:moonshot-v1-8k",
 "moonshotai:moonshot-v1-32k",
 "moonshotai:moonshot-v1-128k",
 "moonshotai:moonshot-v1-8k-vision-preview",
 "moonshotai:moonshot-v1-32k-vision-preview",
 "moonshotai:moonshot-v1-128k-vision-preview",
 "moonshotai:kimi-latest",
 "moonshotai:kimi-thinking-preview",
 "moonshotai:kimi-k2-0711-preview",
 "openai:chatgpt-4o-latest",
 "openai:codex-mini-latest",
 "openai:gpt-3.5-turbo",
 "openai:gpt-3.5-turbo-0125",
 "openai:gpt-3.5-turbo-0301",
 "openai:gpt-3.5-turbo-0613",
 "openai:gpt-3.5-turbo-1106",
 "openai:gpt-3.5-turbo-16k",
 "openai:gpt-3.5-turbo-16k-0613",
 "openai:gpt-4",
 "openai:gpt-4-0125-preview",
 "openai:gpt-4-0314",
 "openai:gpt-4-0613",
 "openai:gpt-4-1106-preview",
 "openai:gpt-4-32k",
 "openai:gpt-4-32k-0314",
 "openai:gpt-4-32k-0613",
 "openai:gpt-4-turbo",
 "openai:gpt-4-turbo-2024-04-09",
 "openai:gpt-4-turbo-preview",
 "openai:gpt-4-vision-preview",
 "openai:gpt-4.1",
 "openai:gpt-4.1-2025-04-14",
 "openai:gpt-4.1-mini",
 "openai:gpt-4.1-mini-2025-04-14",
 "openai:gpt-4.1-nano",
 "openai:gpt-4.1-nano-2025-04-14",
 "openai:gpt-4o",
 "openai:gpt-4o-2024-05-13",
 "openai:gpt-4o-2024-08-06",
 "openai:gpt-4o-2024-11-20",
 "openai:gpt-4o-audio-preview",
 "openai:gpt-4o-audio-preview-2024-10-01",
 "openai:gpt-4o-audio-preview-2024-12-17",
 "openai:gpt-4o-audio-preview-2025-06-03",
 "openai:gpt-4o-mini",
 "openai:gpt-4o-mini-2024-07-18",
 "openai:gpt-4o-mini-audio-preview",
 "openai:gpt-4o-mini-audio-preview-2024-12-17",
 "openai:gpt-4o-mini-search-preview",
 "openai:gpt-4o-mini-search-preview-2025-03-11",
 "openai:gpt-4o-search-preview",
 "openai:gpt-4o-search-preview-2025-03-11",
 "openai:gpt-5",
 "openai:gpt-5-2025-08-07",
 "openai:o1",
 "openai:gpt-5-chat-latest",
 "openai:o1-2024-12-17",
 "openai:gpt-5-mini",
 "openai:o1-mini",
 "openai:gpt-5-mini-2025-08-07",
 "openai:o1-mini-2024-09-12",
 "openai:gpt-5-nano",
 "openai:o1-preview",
 "openai:gpt-5-nano-2025-08-07",
 "openai:o1-preview-2024-09-12",
 "openai:o1-pro",
 "openai:o1-pro-2025-03-19",
 "openai:o3",
 "openai:o3-2025-04-16",
 "openai:o3-deep-research",
 "openai:o3-deep-research-2025-06-26",
 "openai:o3-mini",
 "openai:o3-mini-2025-01-31",
 "openai:o4-mini",
 "openai:o4-mini-2025-04-16",
 "openai:o4-mini-deep-research",
 "openai:o4-mini-deep-research-2025-06-26",
 "openai:o3-pro",
 "openai:o3-pro-2025-06-10",
 "openai:computer-use-preview",
 "openai:computer-use-preview-2025-03-11",
 "test",
 ],
)
```
Known model names that can be used with the `model` parameter of [`Agent`](../../agent/#pydantic_ai.agent.Agent).
`KnownModelName` is provided as a concise way to specify a model.
### ModelRequestParameters `dataclass`
Configuration for an agent's request to a model, specifically related to tools and output handling.
Source code in `pydantic_ai_slim/pydantic_ai/models/__init__.py`
```
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
```
| ```
@dataclass(repr=False, kw_only=True)
classModelRequestParameters:
"""Configuration for an agent's request to a model, specifically related to tools and output handling."""
 function_tools: list[ToolDefinition] = field(default_factory=list)
 builtin_tools: list[AbstractBuiltinTool] = field(default_factory=list)
 output_mode: OutputMode = 'text'
 output_object: OutputObjectDefinition | None = None
 output_tools: list[ToolDefinition] = field(default_factory=list)
 allow_text_output: bool = True
 allow_image_output: bool = False
 @cached_property
 deftool_defs(self) -> dict[str, ToolDefinition]:
 return {tool_def.name: tool_def for tool_def in [*self.function_tools, *self.output_tools]}
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
### Model
Bases: `ABC[](https://docs.python.org/3/library/abc.html#abc.ABC "abc.ABC")`
Abstract class for a model.
Source code in `pydantic_ai_slim/pydantic_ai/models/__init__.py`
```
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
classModel(ABC):
"""Abstract class for a model."""
 _profile: ModelProfileSpec | None = None
 _settings: ModelSettings | None = None
 def__init__(
 self,
 *,
 settings: ModelSettings | None = None,
 profile: ModelProfileSpec | None = None,
 ) -> None:
"""Initialize the model with optional settings and profile.
 Args:
 settings: Model-specific settings that will be used as defaults for this model.
 profile: The model profile to use.
 """
 self._settings = settings
 self._profile = profile
 @property
 defsettings(self) -> ModelSettings | None:
"""Get the model settings."""
 return self._settings
 @abstractmethod
 async defrequest(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ) -> ModelResponse:
"""Make a request to the model."""
 raise NotImplementedError()
 async defcount_tokens(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ) -> RequestUsage:
"""Make a request to the model for counting tokens."""
 # This method is not required, but you need to implement it if you want to support `UsageLimits.count_tokens_before_request`.
 raise NotImplementedError(f'Token counting ahead of the request is not supported by {self.__class__.__name__}')
 @asynccontextmanager
 async defrequest_stream(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 run_context: RunContext[Any] | None = None,
 ) -> AsyncIterator[StreamedResponse]:
"""Make a request to the model and return a streaming response."""
 # This method is not required, but you need to implement it if you want to support streamed responses
 raise NotImplementedError(f'Streamed requests not supported by this {self.__class__.__name__}')
 # yield is required to make this a generator for type checking
 # noinspection PyUnreachableCode
 yield # pragma: no cover
 defcustomize_request_parameters(self, model_request_parameters: ModelRequestParameters) -> ModelRequestParameters:
"""Customize the request parameters for the model.
 This method can be overridden by subclasses to modify the request parameters before sending them to the model.
 In particular, this method can be used to make modifications to the generated tool JSON schemas if necessary
 for vendor/model-specific reasons.
 """
 if transformer := self.profile.json_schema_transformer:
 model_request_parameters = replace(
 model_request_parameters,
 function_tools=[_customize_tool_def(transformer, t) for t in model_request_parameters.function_tools],
 output_tools=[_customize_tool_def(transformer, t) for t in model_request_parameters.output_tools],
 )
 if output_object := model_request_parameters.output_object:
 model_request_parameters = replace(
 model_request_parameters,
 output_object=_customize_output_object(transformer, output_object),
 )
 return model_request_parameters
 defprepare_request(
 self,
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ) -> tuple[ModelSettings | None, ModelRequestParameters]:
"""Prepare request inputs before they are passed to the provider.
 This merges the given ``model_settings`` with the model's own ``settings`` attribute and ensures
 ``customize_request_parameters`` is applied to the resolved
 [`ModelRequestParameters`][pydantic_ai.models.ModelRequestParameters]. Subclasses can override this method if
 they need to customize the preparation flow further, but most implementations should simply call
 ``self.prepare_request(...)`` at the start of their ``request`` (and related) methods.
 """
 model_settings = merge_model_settings(self.settings, model_settings)
 if builtin_tools := model_request_parameters.builtin_tools:
 # Deduplicate builtin tools
 model_request_parameters = replace(
 model_request_parameters,
 builtin_tools=list({tool.unique_id: tool for tool in builtin_tools}.values()),
 )
 model_request_parameters = self.customize_request_parameters(model_request_parameters)
 return model_settings, model_request_parameters
 @property
 @abstractmethod
 defmodel_name(self) -> str:
"""The model name."""
 raise NotImplementedError()
 @cached_property
 defprofile(self) -> ModelProfile:
"""The model profile."""
 _profile = self._profile
 if callable(_profile):
 _profile = _profile(self.model_name)
 if _profile is None:
 return DEFAULT_PROFILE
 return _profile
 @property
 @abstractmethod
 defsystem(self) -> str:
"""The model provider, ex: openai.
 Use to populate the `gen_ai.system` OpenTelemetry semantic convention attribute,
 so should use well-known values listed in
 https://opentelemetry.io/docs/specs/semconv/attributes-registry/gen-ai/#gen-ai-system
 when applicable.
 """
 raise NotImplementedError()
 @property
 defbase_url(self) -> str | None:
"""The base URL for the provider API, if available."""
 return None
 @staticmethod
 def_get_instructions(messages: list[ModelMessage]) -> str | None:
"""Get instructions from the first ModelRequest found when iterating messages in reverse.
 In the case that a "mock" request was generated to include a tool-return part for a result tool,
 we want to use the instructions from the second-to-most-recent request (which should correspond to the
 original request that generated the response that resulted in the tool-return part).
 """
 last_two_requests: list[ModelRequest] = []
 for message in reversed(messages):
 if isinstance(message, ModelRequest):
 last_two_requests.append(message)
 if len(last_two_requests) == 2:
 break
 if message.instructions is not None:
 return message.instructions
 # If we don't have two requests, and we didn't already return instructions, there are definitely not any:
 if len(last_two_requests) != 2:
 return None
 most_recent_request = last_two_requests[0]
 second_most_recent_request = last_two_requests[1]
 # If we've gotten this far and the most recent request consists of only tool-return parts or retry-prompt parts,
 # we use the instructions from the second-to-most-recent request. This is necessary because when handling
 # result tools, we generate a "mock" ModelRequest with a tool-return part for it, and that ModelRequest will not
 # have the relevant instructions from the agent.
 # While it's possible that you could have a message history where the most recent request has only tool returns,
 # I believe there is no way to achieve that would _change_ the instructions without manually crafting the most
 # recent message. That might make sense in principle for some usage pattern, but it's enough of an edge case
 # that I think it's not worth worrying about, since you can work around this by inserting another ModelRequest
 # with no parts at all immediately before the request that has the tool calls (that works because we only look
 # at the two most recent ModelRequests here).
 # If you have a use case where this causes pain, please open a GitHub issue and we can discuss alternatives.
 if all(p.part_kind == 'tool-return' or p.part_kind == 'retry-prompt' for p in most_recent_request.parts):
 return second_most_recent_request.instructions
 return None
```
---|--- 
#### __init__
```
__init__(
 *,
 settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 profile: ModelProfileSpec | None = None
) -> None
```
Initialize the model with optional settings and profile.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`settings` | `ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Model-specific settings that will be used as defaults for this model. | `None` 
`profile` | `ModelProfileSpec | None` | The model profile to use. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/models/__init__.py`
```
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
```
| ```
def__init__(
 self,
 *,
 settings: ModelSettings | None = None,
 profile: ModelProfileSpec | None = None,
) -> None:
"""Initialize the model with optional settings and profile.
 Args:
 settings: Model-specific settings that will be used as defaults for this model.
 profile: The model profile to use.
 """
 self._settings = settings
 self._profile = profile
```
---|--- 
#### settings `property`
```
settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None
```
Get the model settings.
#### request `abstractmethod` `async`
```
request(
 messages: list[](https://docs.python.org/3/library/stdtypes.html#list)[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")],
 model_settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None,
 model_request_parameters: ModelRequestParameters[](#pydantic_ai.models.ModelRequestParameters "pydantic_ai.models.ModelRequestParameters"),
) -> ModelResponse[](../../messages/#pydantic_ai.messages.ModelResponse "pydantic_ai.messages.ModelResponse")
```
Make a request to the model.
Source code in `pydantic_ai_slim/pydantic_ai/models/__init__.py`
```
348
349
350
351
352
353
354
355
356
```
| ```
@abstractmethod
async defrequest(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
) -> ModelResponse:
"""Make a request to the model."""
 raise NotImplementedError()
```
---|--- 
#### count_tokens `async`
```
count_tokens(
 messages: list[](https://docs.python.org/3/library/stdtypes.html#list)[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")],
 model_settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None,
 model_request_parameters: ModelRequestParameters[](#pydantic_ai.models.ModelRequestParameters "pydantic_ai.models.ModelRequestParameters"),
) -> RequestUsage[](../../usage/#pydantic_ai.usage.RequestUsage "pydantic_ai.usage.RequestUsage")
```
Make a request to the model for counting tokens.
Source code in `pydantic_ai_slim/pydantic_ai/models/__init__.py`
```
358
359
360
361
362
363
364
365
366
```
| ```
async defcount_tokens(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
) -> RequestUsage:
"""Make a request to the model for counting tokens."""
 # This method is not required, but you need to implement it if you want to support `UsageLimits.count_tokens_before_request`.
 raise NotImplementedError(f'Token counting ahead of the request is not supported by {self.__class__.__name__}')
```
---|--- 
#### request_stream `async`
```
request_stream(
 messages: list[](https://docs.python.org/3/library/stdtypes.html#list)[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")],
 model_settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None,
 model_request_parameters: ModelRequestParameters[](#pydantic_ai.models.ModelRequestParameters "pydantic_ai.models.ModelRequestParameters"),
 run_context: RunContext[](../../tools/#pydantic_ai.tools.RunContext "pydantic_ai._run_context.RunContext")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = None,
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[StreamedResponse[](#pydantic_ai.models.StreamedResponse "pydantic_ai.models.StreamedResponse")]
```
Make a request to the model and return a streaming response.
Source code in `pydantic_ai_slim/pydantic_ai/models/__init__.py`
```
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
"""Make a request to the model and return a streaming response."""
 # This method is not required, but you need to implement it if you want to support streamed responses
 raise NotImplementedError(f'Streamed requests not supported by this {self.__class__.__name__}')
 # yield is required to make this a generator for type checking
 # noinspection PyUnreachableCode
 yield # pragma: no cover
```
---|--- 
#### customize_request_parameters
```
customize_request_parameters(
 model_request_parameters: ModelRequestParameters[](#pydantic_ai.models.ModelRequestParameters "pydantic_ai.models.ModelRequestParameters"),
) -> ModelRequestParameters[](#pydantic_ai.models.ModelRequestParameters "pydantic_ai.models.ModelRequestParameters")
```
Customize the request parameters for the model.
This method can be overridden by subclasses to modify the request parameters before sending them to the model. In particular, this method can be used to make modifications to the generated tool JSON schemas if necessary for vendor/model-specific reasons.
Source code in `pydantic_ai_slim/pydantic_ai/models/__init__.py`
```
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
```
| ```
defcustomize_request_parameters(self, model_request_parameters: ModelRequestParameters) -> ModelRequestParameters:
"""Customize the request parameters for the model.
 This method can be overridden by subclasses to modify the request parameters before sending them to the model.
 In particular, this method can be used to make modifications to the generated tool JSON schemas if necessary
 for vendor/model-specific reasons.
 """
 if transformer := self.profile.json_schema_transformer:
 model_request_parameters = replace(
 model_request_parameters,
 function_tools=[_customize_tool_def(transformer, t) for t in model_request_parameters.function_tools],
 output_tools=[_customize_tool_def(transformer, t) for t in model_request_parameters.output_tools],
 )
 if output_object := model_request_parameters.output_object:
 model_request_parameters = replace(
 model_request_parameters,
 output_object=_customize_output_object(transformer, output_object),
 )
 return model_request_parameters
```
---|--- 
#### prepare_request
```
prepare_request(
 model_settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None,
 model_request_parameters: ModelRequestParameters[](#pydantic_ai.models.ModelRequestParameters "pydantic_ai.models.ModelRequestParameters"),
) -> tuple[](https://docs.python.org/3/library/stdtypes.html#tuple)[ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None, ModelRequestParameters[](#pydantic_ai.models.ModelRequestParameters "pydantic_ai.models.ModelRequestParameters")]
```
Prepare request inputs before they are passed to the provider.
This merges the given `model_settings` with the model's own `settings` attribute and ensures `customize_request_parameters` is applied to the resolved [`ModelRequestParameters`](#pydantic_ai.models.ModelRequestParameters). Subclasses can override this method if they need to customize the preparation flow further, but most implementations should simply call `self.prepare_request(...)` at the start of their `request` (and related) methods.
Source code in `pydantic_ai_slim/pydantic_ai/models/__init__.py`
```
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
```
| ```
defprepare_request(
 self,
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
) -> tuple[ModelSettings | None, ModelRequestParameters]:
"""Prepare request inputs before they are passed to the provider.
 This merges the given ``model_settings`` with the model's own ``settings`` attribute and ensures
 ``customize_request_parameters`` is applied to the resolved
 [`ModelRequestParameters`][pydantic_ai.models.ModelRequestParameters]. Subclasses can override this method if
 they need to customize the preparation flow further, but most implementations should simply call
 ``self.prepare_request(...)`` at the start of their ``request`` (and related) methods.
 """
 model_settings = merge_model_settings(self.settings, model_settings)
 if builtin_tools := model_request_parameters.builtin_tools:
 # Deduplicate builtin tools
 model_request_parameters = replace(
 model_request_parameters,
 builtin_tools=list({tool.unique_id: tool for tool in builtin_tools}.values()),
 )
 model_request_parameters = self.customize_request_parameters(model_request_parameters)
 return model_settings, model_request_parameters
```
---|--- 
#### model_name `abstractmethod` `property`
```
model_name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The model name.
#### profile `cached` `property`
```
profile: ModelProfile[](../../profiles/#pydantic_ai.profiles.ModelProfile "pydantic_ai.profiles.ModelProfile")
```
The model profile.
#### system `abstractmethod` `property`
```
system: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The model provider, ex: openai.
Use to populate the `gen_ai.system` OpenTelemetry semantic convention attribute, so should use well-known values listed in https://opentelemetry.io/docs/specs/semconv/attributes-registry/gen-ai/#gen-ai-system when applicable.
#### base_url `property`
```
base_url: str[](https://docs.python.org/3/library/stdtypes.html#str) | None
```
The base URL for the provider API, if available.
### StreamedResponse `dataclass`
Bases: `ABC[](https://docs.python.org/3/library/abc.html#abc.ABC "abc.ABC")`
Streamed response from an LLM when calling a tool.
Source code in `pydantic_ai_slim/pydantic_ai/models/__init__.py`
```
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
```
| ```
@dataclass
classStreamedResponse(ABC):
"""Streamed response from an LLM when calling a tool."""
 model_request_parameters: ModelRequestParameters
 final_result_event: FinalResultEvent | None = field(default=None, init=False)
 provider_response_id: str | None = field(default=None, init=False)
 provider_details: dict[str, Any] | None = field(default=None, init=False)
 finish_reason: FinishReason | None = field(default=None, init=False)
 _parts_manager: ModelResponsePartsManager = field(default_factory=ModelResponsePartsManager, init=False)
 _event_iterator: AsyncIterator[ModelResponseStreamEvent] | None = field(default=None, init=False)
 _usage: RequestUsage = field(default_factory=RequestUsage, init=False)
 def__aiter__(self) -> AsyncIterator[ModelResponseStreamEvent]:
"""Stream the response as an async iterable of [`ModelResponseStreamEvent`][pydantic_ai.messages.ModelResponseStreamEvent]s.
 This proxies the `_event_iterator()` and emits all events, while also checking for matches
 on the result schema and emitting a [`FinalResultEvent`][pydantic_ai.messages.FinalResultEvent] if/when the
 first match is found.
 """
 if self._event_iterator is None:
 async defiterator_with_final_event(
 iterator: AsyncIterator[ModelResponseStreamEvent],
 ) -> AsyncIterator[ModelResponseStreamEvent]:
 async for event in iterator:
 yield event
 if (
 final_result_event := _get_final_result_event(event, self.model_request_parameters)
 ) is not None:
 self.final_result_event = final_result_event
 yield final_result_event
 break
 # If we broke out of the above loop, we need to yield the rest of the events
 # If we didn't, this will just be a no-op
 async for event in iterator:
 yield event
 async defiterator_with_part_end(
 iterator: AsyncIterator[ModelResponseStreamEvent],
 ) -> AsyncIterator[ModelResponseStreamEvent]:
 last_start_event: PartStartEvent | None = None
 defpart_end_event(next_part: ModelResponsePart | None = None) -> PartEndEvent | None:
 if not last_start_event:
 return None
 index = last_start_event.index
 part = self._parts_manager.get_parts()[index]
 if not isinstance(part, TextPart | ThinkingPart | BaseToolCallPart):
 # Parts other than these 3 don't have deltas, so don't need an end part.
 return None
 return PartEndEvent(
 index=index,
 part=part,
 next_part_kind=next_part.part_kind if next_part else None,
 )
 async for event in iterator:
 if isinstance(event, PartStartEvent):
 if last_start_event:
 end_event = part_end_event(event.part)
 if end_event:
 yield end_event
 event.previous_part_kind = last_start_event.part.part_kind
 last_start_event = event
 yield event
 end_event = part_end_event()
 if end_event:
 yield end_event
 self._event_iterator = iterator_with_part_end(iterator_with_final_event(self._get_event_iterator()))
 return self._event_iterator
 @abstractmethod
 async def_get_event_iterator(self) -> AsyncIterator[ModelResponseStreamEvent]:
"""Return an async iterator of [`ModelResponseStreamEvent`][pydantic_ai.messages.ModelResponseStreamEvent]s.
 This method should be implemented by subclasses to translate the vendor-specific stream of events into
 pydantic_ai-format events.
 It should use the `_parts_manager` to handle deltas, and should update the `_usage` attributes as it goes.
 """
 raise NotImplementedError()
 # noinspection PyUnreachableCode
 yield
 defget(self) -> ModelResponse:
"""Build a [`ModelResponse`][pydantic_ai.messages.ModelResponse] from the data received from the stream so far."""
 return ModelResponse(
 parts=self._parts_manager.get_parts(),
 model_name=self.model_name,
 timestamp=self.timestamp,
 usage=self.usage(),
 provider_name=self.provider_name,
 provider_response_id=self.provider_response_id,
 provider_details=self.provider_details,
 finish_reason=self.finish_reason,
 )
 # TODO (v2): Make this a property
 defusage(self) -> RequestUsage:
"""Get the usage of the response so far. This will not be the final usage until the stream is exhausted."""
 return self._usage
 @property
 @abstractmethod
 defmodel_name(self) -> str:
"""Get the model name of the response."""
 raise NotImplementedError()
 @property
 @abstractmethod
 defprovider_name(self) -> str | None:
"""Get the provider name."""
 raise NotImplementedError()
 @property
 @abstractmethod
 deftimestamp(self) -> datetime:
"""Get the timestamp of the response."""
 raise NotImplementedError()
```
---|--- 
#### __aiter__
```
__aiter__() -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[ModelResponseStreamEvent[](../../messages/#pydantic_ai.messages.ModelResponseStreamEvent "pydantic_ai.messages.ModelResponseStreamEvent")]
```
Stream the response as an async iterable of [`ModelResponseStreamEvent`](../../messages/#pydantic_ai.messages.ModelResponseStreamEvent)s.
This proxies the `_event_iterator()` and emits all events, while also checking for matches on the result schema and emitting a [`FinalResultEvent`](../../messages/#pydantic_ai.messages.FinalResultEvent) if/when the first match is found.
Source code in `pydantic_ai_slim/pydantic_ai/models/__init__.py`
```
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
```
| ```
def__aiter__(self) -> AsyncIterator[ModelResponseStreamEvent]:
"""Stream the response as an async iterable of [`ModelResponseStreamEvent`][pydantic_ai.messages.ModelResponseStreamEvent]s.
 This proxies the `_event_iterator()` and emits all events, while also checking for matches
 on the result schema and emitting a [`FinalResultEvent`][pydantic_ai.messages.FinalResultEvent] if/when the
 first match is found.
 """
 if self._event_iterator is None:
 async defiterator_with_final_event(
 iterator: AsyncIterator[ModelResponseStreamEvent],
 ) -> AsyncIterator[ModelResponseStreamEvent]:
 async for event in iterator:
 yield event
 if (
 final_result_event := _get_final_result_event(event, self.model_request_parameters)
 ) is not None:
 self.final_result_event = final_result_event
 yield final_result_event
 break
 # If we broke out of the above loop, we need to yield the rest of the events
 # If we didn't, this will just be a no-op
 async for event in iterator:
 yield event
 async defiterator_with_part_end(
 iterator: AsyncIterator[ModelResponseStreamEvent],
 ) -> AsyncIterator[ModelResponseStreamEvent]:
 last_start_event: PartStartEvent | None = None
 defpart_end_event(next_part: ModelResponsePart | None = None) -> PartEndEvent | None:
 if not last_start_event:
 return None
 index = last_start_event.index
 part = self._parts_manager.get_parts()[index]
 if not isinstance(part, TextPart | ThinkingPart | BaseToolCallPart):
 # Parts other than these 3 don't have deltas, so don't need an end part.
 return None
 return PartEndEvent(
 index=index,
 part=part,
 next_part_kind=next_part.part_kind if next_part else None,
 )
 async for event in iterator:
 if isinstance(event, PartStartEvent):
 if last_start_event:
 end_event = part_end_event(event.part)
 if end_event:
 yield end_event
 event.previous_part_kind = last_start_event.part.part_kind
 last_start_event = event
 yield event
 end_event = part_end_event()
 if end_event:
 yield end_event
 self._event_iterator = iterator_with_part_end(iterator_with_final_event(self._get_event_iterator()))
 return self._event_iterator
```
---|--- 
#### get
```
get() -> ModelResponse[](../../messages/#pydantic_ai.messages.ModelResponse "pydantic_ai.messages.ModelResponse")
```
Build a [`ModelResponse`](../../messages/#pydantic_ai.messages.ModelResponse) from the data received from the stream so far.
Source code in `pydantic_ai_slim/pydantic_ai/models/__init__.py`
```
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
```
| ```
defget(self) -> ModelResponse:
"""Build a [`ModelResponse`][pydantic_ai.messages.ModelResponse] from the data received from the stream so far."""
 return ModelResponse(
 parts=self._parts_manager.get_parts(),
 model_name=self.model_name,
 timestamp=self.timestamp,
 usage=self.usage(),
 provider_name=self.provider_name,
 provider_response_id=self.provider_response_id,
 provider_details=self.provider_details,
 finish_reason=self.finish_reason,
 )
```
---|--- 
#### usage
```
usage() -> RequestUsage[](../../usage/#pydantic_ai.usage.RequestUsage "pydantic_ai.usage.RequestUsage")
```
Get the usage of the response so far. This will not be the final usage until the stream is exhausted.
Source code in `pydantic_ai_slim/pydantic_ai/models/__init__.py`
```
617
618
619
```
| ```
defusage(self) -> RequestUsage:
"""Get the usage of the response so far. This will not be the final usage until the stream is exhausted."""
 return self._usage
```
---|--- 
#### model_name `abstractmethod` `property`
```
model_name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Get the model name of the response.
#### provider_name `abstractmethod` `property`
```
provider_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None
```
Get the provider name.
#### timestamp `abstractmethod` `property`
```
timestamp: datetime[](https://docs.python.org/3/library/datetime.html#datetime.datetime "datetime.datetime")
```
Get the timestamp of the response.
### ALLOW_MODEL_REQUESTS `module-attribute`
```
ALLOW_MODEL_REQUESTS = True
```
Whether to allow requests to models.
This global setting allows you to disable request to most models, e.g. to make sure you don't accidentally make costly requests to a model during tests.
The testing models [`TestModel`](../test/#pydantic_ai.models.test.TestModel) and [`FunctionModel`](../function/#pydantic_ai.models.function.FunctionModel) are no affected by this setting.
### check_allow_model_requests
```
check_allow_model_requests() -> None
```
Check if model requests are allowed.
If you're defining your own models that have costs or latency associated with their use, you should call this in [`Model.request`](#pydantic_ai.models.Model.request) and [`Model.request_stream`](#pydantic_ai.models.Model.request_stream).
Raises:
Type | Description 
---|--- 
`RuntimeError[](https://docs.python.org/3/library/exceptions.html#RuntimeError)` | If model requests are not allowed. 
Source code in `pydantic_ai_slim/pydantic_ai/models/__init__.py`
```
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
```
| ```
defcheck_allow_model_requests() -> None:
"""Check if model requests are allowed.
 If you're defining your own models that have costs or latency associated with their use, you should call this in
 [`Model.request`][pydantic_ai.models.Model.request] and [`Model.request_stream`][pydantic_ai.models.Model.request_stream].
 Raises:
 RuntimeError: If model requests are not allowed.
 """
 if not ALLOW_MODEL_REQUESTS:
 raise RuntimeError('Model requests are not allowed, since ALLOW_MODEL_REQUESTS is False')
```
---|--- 
### override_allow_model_requests
```
override_allow_model_requests(
 allow_model_requests: bool[](https://docs.python.org/3/library/functions.html#bool),
) -> Iterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Iterator "collections.abc.Iterator")[None]
```
Context manager to temporarily override [`ALLOW_MODEL_REQUESTS`](#pydantic_ai.models.ALLOW_MODEL_REQUESTS).
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`allow_model_requests` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to allow model requests within the context. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/models/__init__.py`
```
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
```
| ```
@contextmanager
defoverride_allow_model_requests(allow_model_requests: bool) -> Iterator[None]:
"""Context manager to temporarily override [`ALLOW_MODEL_REQUESTS`][pydantic_ai.models.ALLOW_MODEL_REQUESTS].
 Args:
 allow_model_requests: Whether to allow model requests within the context.
 """
 global ALLOW_MODEL_REQUESTS
 old_value = ALLOW_MODEL_REQUESTS
 ALLOW_MODEL_REQUESTS = allow_model_requests # pyright: ignore[reportConstantRedefinition]
 try:
 yield
 finally:
 ALLOW_MODEL_REQUESTS = old_value # pyright: ignore[reportConstantRedefinition]
```
---|---