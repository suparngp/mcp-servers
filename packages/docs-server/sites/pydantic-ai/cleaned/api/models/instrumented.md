[ Skip to content ](#pydantic_aimodelsinstrumented)
# pydantic_ai.models.instrumented
### instrument_model
```
instrument_model(
 model: Model[](../base/#pydantic_ai.models.Model "pydantic_ai.models.Model"), instrument: InstrumentationSettings[](#pydantic_ai.models.instrumented.InstrumentationSettings "pydantic_ai.models.instrumented.InstrumentationSettings") | bool[](https://docs.python.org/3/library/functions.html#bool)
) -> Model[](../base/#pydantic_ai.models.Model "pydantic_ai.models.Model")
```
Instrument a model with OpenTelemetry/logfire.
Source code in `pydantic_ai_slim/pydantic_ai/models/instrumented.py`
```
66
67
68
69
70
71
72
73
74
```
| ```
definstrument_model(model: Model, instrument: InstrumentationSettings | bool) -> Model:
"""Instrument a model with OpenTelemetry/logfire."""
 if instrument and not isinstance(model, InstrumentedModel):
 if instrument is True:
 instrument = InstrumentationSettings()
 model = InstrumentedModel(model, instrument)
 return model
```
---|--- 
### InstrumentationSettings `dataclass`
Options for instrumenting models and agents with OpenTelemetry.
Used in:
 * `Agent(instrument=...)`
 * [`Agent.instrument_all()`](../../agent/#pydantic_ai.agent.Agent.instrument_all)
 * [`InstrumentedModel`](#pydantic_ai.models.instrumented.InstrumentedModel)
See the [Debugging and Monitoring guide](https://ai.pydantic.dev/logfire/) for more info.
Source code in `pydantic_ai_slim/pydantic_ai/models/instrumented.py`
```
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
```
| ```
@dataclass(init=False)
classInstrumentationSettings:
"""Options for instrumenting models and agents with OpenTelemetry.
 Used in:
 - `Agent(instrument=...)`
 - [`Agent.instrument_all()`][pydantic_ai.agent.Agent.instrument_all]
 - [`InstrumentedModel`][pydantic_ai.models.instrumented.InstrumentedModel]
 See the [Debugging and Monitoring guide](https://ai.pydantic.dev/logfire/) for more info.
 """
 tracer: Tracer = field(repr=False)
 event_logger: EventLogger = field(repr=False)
 event_mode: Literal['attributes', 'logs'] = 'attributes'
 include_binary_content: bool = True
 include_content: bool = True
 version: Literal[1, 2, 3] = DEFAULT_INSTRUMENTATION_VERSION
 def__init__(
 self,
 *,
 tracer_provider: TracerProvider | None = None,
 meter_provider: MeterProvider | None = None,
 include_binary_content: bool = True,
 include_content: bool = True,
 version: Literal[1, 2, 3] = DEFAULT_INSTRUMENTATION_VERSION,
 event_mode: Literal['attributes', 'logs'] = 'attributes',
 event_logger_provider: EventLoggerProvider | None = None,
 ):
"""Create instrumentation options.
 Args:
 tracer_provider: The OpenTelemetry tracer provider to use.
 If not provided, the global tracer provider is used.
 Calling `logfire.configure()` sets the global tracer provider, so most users don't need this.
 meter_provider: The OpenTelemetry meter provider to use.
 If not provided, the global meter provider is used.
 Calling `logfire.configure()` sets the global meter provider, so most users don't need this.
 include_binary_content: Whether to include binary content in the instrumentation events.
 include_content: Whether to include prompts, completions, and tool call arguments and responses
 in the instrumentation events.
 version: Version of the data format. This is unrelated to the Pydantic AI package version.
 Version 1 is based on the legacy event-based OpenTelemetry GenAI spec
 and will be removed in a future release.
 The parameters `event_mode` and `event_logger_provider` are only relevant for version 1.
 Version 2 uses the newer OpenTelemetry GenAI spec and stores messages in the following attributes:
 - `gen_ai.system_instructions` for instructions passed to the agent.
 - `gen_ai.input.messages` and `gen_ai.output.messages` on model request spans.
 - `pydantic_ai.all_messages` on agent run spans.
 event_mode: The mode for emitting events in version 1.
 If `'attributes'`, events are attached to the span as attributes.
 If `'logs'`, events are emitted as OpenTelemetry log-based events.
 event_logger_provider: The OpenTelemetry event logger provider to use.
 If not provided, the global event logger provider is used.
 Calling `logfire.configure()` sets the global event logger provider, so most users don't need this.
 This is only used if `event_mode='logs'` and `version=1`.
 """
 frompydantic_aiimport __version__
 tracer_provider = tracer_provider or get_tracer_provider()
 meter_provider = meter_provider or get_meter_provider()
 event_logger_provider = event_logger_provider or get_event_logger_provider()
 scope_name = 'pydantic-ai'
 self.tracer = tracer_provider.get_tracer(scope_name, __version__)
 self.meter = meter_provider.get_meter(scope_name, __version__)
 self.event_logger = event_logger_provider.get_event_logger(scope_name, __version__)
 self.event_mode = event_mode
 self.include_binary_content = include_binary_content
 self.include_content = include_content
 if event_mode == 'logs' and version != 1:
 warnings.warn(
 'event_mode is only relevant for version=1 which is deprecated and will be removed in a future release.',
 stacklevel=2,
 )
 version = 1
 self.version = version
 # As specified in the OpenTelemetry GenAI metrics spec:
 # https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-metrics/#metric-gen_aiclienttokenusage
 tokens_histogram_kwargs = dict(
 name='gen_ai.client.token.usage',
 unit='{token}',
 description='Measures number of input and output tokens used',
 )
 try:
 self.tokens_histogram = self.meter.create_histogram(
 **tokens_histogram_kwargs,
 explicit_bucket_boundaries_advisory=TOKEN_HISTOGRAM_BOUNDARIES,
 )
 except TypeError: # pragma: lax no cover
 # Older OTel/logfire versions don't support explicit_bucket_boundaries_advisory
 self.tokens_histogram = self.meter.create_histogram(
 **tokens_histogram_kwargs, # pyright: ignore
 )
 self.cost_histogram = self.meter.create_histogram(
 'operation.cost',
 unit='{USD}',
 description='Monetary cost',
 )
 defmessages_to_otel_events(self, messages: list[ModelMessage]) -> list[Event]:
"""Convert a list of model messages to OpenTelemetry events.
 Args:
 messages: The messages to convert.
 Returns:
 A list of OpenTelemetry events.
 """
 events: list[Event] = []
 instructions = InstrumentedModel._get_instructions(messages) # pyright: ignore [reportPrivateUsage]
 if instructions is not None:
 events.append(
 Event(
 'gen_ai.system.message',
 body={**({'content': instructions} if self.include_content else {}), 'role': 'system'},
 )
 )
 for message_index, message in enumerate(messages):
 message_events: list[Event] = []
 if isinstance(message, ModelRequest):
 for part in message.parts:
 if hasattr(part, 'otel_event'):
 message_events.append(part.otel_event(self))
 elif isinstance(message, ModelResponse): # pragma: no branch
 message_events = message.otel_events(self)
 for event in message_events:
 event.attributes = {
 'gen_ai.message.index': message_index,
 **(event.attributes or {}),
 }
 events.extend(message_events)
 for event in events:
 event.body = InstrumentedModel.serialize_any(event.body)
 return events
 defmessages_to_otel_messages(self, messages: list[ModelMessage]) -> list[_otel_messages.ChatMessage]:
 result: list[_otel_messages.ChatMessage] = []
 for message in messages:
 if isinstance(message, ModelRequest):
 for is_system, group in itertools.groupby(message.parts, key=lambda p: isinstance(p, SystemPromptPart)):
 message_parts: list[_otel_messages.MessagePart] = []
 for part in group:
 if hasattr(part, 'otel_message_parts'):
 message_parts.extend(part.otel_message_parts(self))
 result.append(
 _otel_messages.ChatMessage(role='system' if is_system else 'user', parts=message_parts)
 )
 elif isinstance(message, ModelResponse): # pragma: no branch
 otel_message = _otel_messages.OutputMessage(role='assistant', parts=message.otel_message_parts(self))
 if message.finish_reason is not None:
 otel_message['finish_reason'] = message.finish_reason
 result.append(otel_message)
 return result
 defhandle_messages(self, input_messages: list[ModelMessage], response: ModelResponse, system: str, span: Span):
 if self.version == 1:
 events = self.messages_to_otel_events(input_messages)
 for event in self.messages_to_otel_events([response]):
 events.append(
 Event(
 'gen_ai.choice',
 body={
 'index': 0,
 'message': event.body,
 },
 )
 )
 for event in events:
 event.attributes = {
 GEN_AI_SYSTEM_ATTRIBUTE: system,
 **(event.attributes or {}),
 }
 self._emit_events(span, events)
 else:
 output_messages = self.messages_to_otel_messages([response])
 assert len(output_messages) == 1
 output_message = output_messages[0]
 instructions = InstrumentedModel._get_instructions(input_messages) # pyright: ignore [reportPrivateUsage]
 system_instructions_attributes = self.system_instructions_attributes(instructions)
 attributes: dict[str, AttributeValue] = {
 'gen_ai.input.messages': json.dumps(self.messages_to_otel_messages(input_messages)),
 'gen_ai.output.messages': json.dumps([output_message]),
 **system_instructions_attributes,
 'logfire.json_schema': json.dumps(
 {
 'type': 'object',
 'properties': {
 'gen_ai.input.messages': {'type': 'array'},
 'gen_ai.output.messages': {'type': 'array'},
 **(
 {'gen_ai.system_instructions': {'type': 'array'}}
 if system_instructions_attributes
 else {}
 ),
 'model_request_parameters': {'type': 'object'},
 },
 }
 ),
 }
 span.set_attributes(attributes)
 defsystem_instructions_attributes(self, instructions: str | None) -> dict[str, str]:
 if instructions and self.include_content:
 return {
 'gen_ai.system_instructions': json.dumps([_otel_messages.TextPart(type='text', content=instructions)]),
 }
 return {}
 def_emit_events(self, span: Span, events: list[Event]) -> None:
 if self.event_mode == 'logs':
 for event in events:
 self.event_logger.emit(event)
 else:
 attr_name = 'events'
 span.set_attributes(
 {
 attr_name: json.dumps([InstrumentedModel.event_to_dict(event) for event in events]),
 'logfire.json_schema': json.dumps(
 {
 'type': 'object',
 'properties': {
 attr_name: {'type': 'array'},
 'model_request_parameters': {'type': 'object'},
 },
 }
 ),
 }
 )
 defrecord_metrics(
 self,
 response: ModelResponse,
 price_calculation: PriceCalculation | None,
 attributes: dict[str, AttributeValue],
 ):
 for typ in ['input', 'output']:
 if not (tokens := getattr(response.usage, f'{typ}_tokens', 0)): # pragma: no cover
 continue
 token_attributes = {**attributes, 'gen_ai.token.type': typ}
 self.tokens_histogram.record(tokens, token_attributes)
 if price_calculation:
 cost = float(getattr(price_calculation, f'{typ}_price'))
 self.cost_histogram.record(cost, token_attributes)
```
---|--- 
#### __init__
```
__init__(
 *,
 tracer_provider: TracerProvider | None = None,
 meter_provider: MeterProvider | None = None,
 include_binary_content: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 include_content: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 version: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[
 1, 2, 3
 ] = DEFAULT_INSTRUMENTATION_VERSION,
 event_mode: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[
 "attributes", "logs"
 ] = "attributes",
 event_logger_provider: EventLoggerProvider | None = None
)
```
Create instrumentation options.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`tracer_provider` | `TracerProvider | None` | The OpenTelemetry tracer provider to use. If not provided, the global tracer provider is used. Calling `logfire.configure()` sets the global tracer provider, so most users don't need this. | `None` 
`meter_provider` | `MeterProvider | None` | The OpenTelemetry meter provider to use. If not provided, the global meter provider is used. Calling `logfire.configure()` sets the global meter provider, so most users don't need this. | `None` 
`include_binary_content` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to include binary content in the instrumentation events. | `True` 
`include_content` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to include prompts, completions, and tool call arguments and responses in the instrumentation events. | `True` 
`version` | `Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[1, 2, 3]` | Version of the data format. This is unrelated to the Pydantic AI package version. Version 1 is based on the legacy event-based OpenTelemetry GenAI spec and will be removed in a future release. The parameters `event_mode` and `event_logger_provider` are only relevant for version 1. Version 2 uses the newer OpenTelemetry GenAI spec and stores messages in the following attributes: - `gen_ai.system_instructions` for instructions passed to the agent. - `gen_ai.input.messages` and `gen_ai.output.messages` on model request spans. - `pydantic_ai.all_messages` on agent run spans. | `DEFAULT_INSTRUMENTATION_VERSION` 
`event_mode` | `Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['attributes', 'logs']` | The mode for emitting events in version 1. If `'attributes'`, events are attached to the span as attributes. If `'logs'`, events are emitted as OpenTelemetry log-based events. | `'attributes'` 
`event_logger_provider` | `EventLoggerProvider | None` | The OpenTelemetry event logger provider to use. If not provided, the global event logger provider is used. Calling `logfire.configure()` sets the global event logger provider, so most users don't need this. This is only used if `event_mode='logs'` and `version=1`. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/models/instrumented.py`
```
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
```
| ```
def__init__(
 self,
 *,
 tracer_provider: TracerProvider | None = None,
 meter_provider: MeterProvider | None = None,
 include_binary_content: bool = True,
 include_content: bool = True,
 version: Literal[1, 2, 3] = DEFAULT_INSTRUMENTATION_VERSION,
 event_mode: Literal['attributes', 'logs'] = 'attributes',
 event_logger_provider: EventLoggerProvider | None = None,
):
"""Create instrumentation options.
 Args:
 tracer_provider: The OpenTelemetry tracer provider to use.
 If not provided, the global tracer provider is used.
 Calling `logfire.configure()` sets the global tracer provider, so most users don't need this.
 meter_provider: The OpenTelemetry meter provider to use.
 If not provided, the global meter provider is used.
 Calling `logfire.configure()` sets the global meter provider, so most users don't need this.
 include_binary_content: Whether to include binary content in the instrumentation events.
 include_content: Whether to include prompts, completions, and tool call arguments and responses
 in the instrumentation events.
 version: Version of the data format. This is unrelated to the Pydantic AI package version.
 Version 1 is based on the legacy event-based OpenTelemetry GenAI spec
 and will be removed in a future release.
 The parameters `event_mode` and `event_logger_provider` are only relevant for version 1.
 Version 2 uses the newer OpenTelemetry GenAI spec and stores messages in the following attributes:
 - `gen_ai.system_instructions` for instructions passed to the agent.
 - `gen_ai.input.messages` and `gen_ai.output.messages` on model request spans.
 - `pydantic_ai.all_messages` on agent run spans.
 event_mode: The mode for emitting events in version 1.
 If `'attributes'`, events are attached to the span as attributes.
 If `'logs'`, events are emitted as OpenTelemetry log-based events.
 event_logger_provider: The OpenTelemetry event logger provider to use.
 If not provided, the global event logger provider is used.
 Calling `logfire.configure()` sets the global event logger provider, so most users don't need this.
 This is only used if `event_mode='logs'` and `version=1`.
 """
 frompydantic_aiimport __version__
 tracer_provider = tracer_provider or get_tracer_provider()
 meter_provider = meter_provider or get_meter_provider()
 event_logger_provider = event_logger_provider or get_event_logger_provider()
 scope_name = 'pydantic-ai'
 self.tracer = tracer_provider.get_tracer(scope_name, __version__)
 self.meter = meter_provider.get_meter(scope_name, __version__)
 self.event_logger = event_logger_provider.get_event_logger(scope_name, __version__)
 self.event_mode = event_mode
 self.include_binary_content = include_binary_content
 self.include_content = include_content
 if event_mode == 'logs' and version != 1:
 warnings.warn(
 'event_mode is only relevant for version=1 which is deprecated and will be removed in a future release.',
 stacklevel=2,
 )
 version = 1
 self.version = version
 # As specified in the OpenTelemetry GenAI metrics spec:
 # https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-metrics/#metric-gen_aiclienttokenusage
 tokens_histogram_kwargs = dict(
 name='gen_ai.client.token.usage',
 unit='{token}',
 description='Measures number of input and output tokens used',
 )
 try:
 self.tokens_histogram = self.meter.create_histogram(
 **tokens_histogram_kwargs,
 explicit_bucket_boundaries_advisory=TOKEN_HISTOGRAM_BOUNDARIES,
 )
 except TypeError: # pragma: lax no cover
 # Older OTel/logfire versions don't support explicit_bucket_boundaries_advisory
 self.tokens_histogram = self.meter.create_histogram(
 **tokens_histogram_kwargs, # pyright: ignore
 )
 self.cost_histogram = self.meter.create_histogram(
 'operation.cost',
 unit='{USD}',
 description='Monetary cost',
 )
```
---|--- 
#### messages_to_otel_events
```
messages_to_otel_events(
 messages: list[](https://docs.python.org/3/library/stdtypes.html#list)[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")],
) -> list[](https://docs.python.org/3/library/stdtypes.html#list)[Event]
```
Convert a list of model messages to OpenTelemetry events.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`messages` | `list[](https://docs.python.org/3/library/stdtypes.html#list)[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")]` | The messages to convert. | _required_ 
Returns:
Type | Description 
---|--- 
`list[](https://docs.python.org/3/library/stdtypes.html#list)[Event]` | A list of OpenTelemetry events. 
Source code in `pydantic_ai_slim/pydantic_ai/models/instrumented.py`
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
```
| ```
defmessages_to_otel_events(self, messages: list[ModelMessage]) -> list[Event]:
"""Convert a list of model messages to OpenTelemetry events.
 Args:
 messages: The messages to convert.
 Returns:
 A list of OpenTelemetry events.
 """
 events: list[Event] = []
 instructions = InstrumentedModel._get_instructions(messages) # pyright: ignore [reportPrivateUsage]
 if instructions is not None:
 events.append(
 Event(
 'gen_ai.system.message',
 body={**({'content': instructions} if self.include_content else {}), 'role': 'system'},
 )
 )
 for message_index, message in enumerate(messages):
 message_events: list[Event] = []
 if isinstance(message, ModelRequest):
 for part in message.parts:
 if hasattr(part, 'otel_event'):
 message_events.append(part.otel_event(self))
 elif isinstance(message, ModelResponse): # pragma: no branch
 message_events = message.otel_events(self)
 for event in message_events:
 event.attributes = {
 'gen_ai.message.index': message_index,
 **(event.attributes or {}),
 }
 events.extend(message_events)
 for event in events:
 event.body = InstrumentedModel.serialize_any(event.body)
 return events
```
---|--- 
### InstrumentedModel `dataclass`
Bases: `WrapperModel[](../wrapper/#pydantic_ai.models.wrapper.WrapperModel "pydantic_ai.models.wrapper.WrapperModel")`
Model which wraps another model so that requests are instrumented with OpenTelemetry.
See the [Debugging and Monitoring guide](https://ai.pydantic.dev/logfire/) for more info.
Source code in `pydantic_ai_slim/pydantic_ai/models/instrumented.py`
```
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
```
| ```
@dataclass(init=False)
classInstrumentedModel(WrapperModel):
"""Model which wraps another model so that requests are instrumented with OpenTelemetry.
 See the [Debugging and Monitoring guide](https://ai.pydantic.dev/logfire/) for more info.
 """
 instrumentation_settings: InstrumentationSettings
"""Instrumentation settings for this model."""
 def__init__(
 self,
 wrapped: Model | KnownModelName,
 options: InstrumentationSettings | None = None,
 ) -> None:
 super().__init__(wrapped)
 self.instrumentation_settings = options or InstrumentationSettings()
 async defrequest(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ) -> ModelResponse:
 prepared_settings, prepared_parameters = self.wrapped.prepare_request(
 model_settings,
 model_request_parameters,
 )
 with self._instrument(messages, prepared_settings, prepared_parameters) as finish:
 response = await self.wrapped.request(messages, model_settings, model_request_parameters)
 finish(response)
 return response
 @asynccontextmanager
 async defrequest_stream(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 run_context: RunContext[Any] | None = None,
 ) -> AsyncIterator[StreamedResponse]:
 prepared_settings, prepared_parameters = self.wrapped.prepare_request(
 model_settings,
 model_request_parameters,
 )
 with self._instrument(messages, prepared_settings, prepared_parameters) as finish:
 response_stream: StreamedResponse | None = None
 try:
 async with self.wrapped.request_stream(
 messages, model_settings, model_request_parameters, run_context
 ) as response_stream:
 yield response_stream
 finally:
 if response_stream: # pragma: no branch
 finish(response_stream.get())
 @contextmanager
 def_instrument(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ) -> Iterator[Callable[[ModelResponse], None]]:
 operation = 'chat'
 span_name = f'{operation}{self.model_name}'
 # TODO Missing attributes:
 # - error.type: unclear if we should do something here or just always rely on span exceptions
 # - gen_ai.request.stop_sequences/top_k: model_settings doesn't include these
 attributes: dict[str, AttributeValue] = {
 'gen_ai.operation.name': operation,
 **self.model_attributes(self.wrapped),
 'model_request_parameters': json.dumps(InstrumentedModel.serialize_any(model_request_parameters)),
 'logfire.json_schema': json.dumps(
 {
 'type': 'object',
 'properties': {'model_request_parameters': {'type': 'object'}},
 }
 ),
 }
 if model_settings:
 for key in MODEL_SETTING_ATTRIBUTES:
 if isinstance(value := model_settings.get(key), float | int):
 attributes[f'gen_ai.request.{key}'] = value
 record_metrics: Callable[[], None] | None = None
 try:
 with self.instrumentation_settings.tracer.start_as_current_span(span_name, attributes=attributes) as span:
 deffinish(response: ModelResponse):
 # FallbackModel updates these span attributes.
 attributes.update(getattr(span, 'attributes', {}))
 request_model = attributes[GEN_AI_REQUEST_MODEL_ATTRIBUTE]
 system = cast(str, attributes[GEN_AI_SYSTEM_ATTRIBUTE])
 response_model = response.model_name or request_model
 price_calculation = None
 def_record_metrics():
 metric_attributes = {
 GEN_AI_SYSTEM_ATTRIBUTE: system,
 'gen_ai.operation.name': operation,
 'gen_ai.request.model': request_model,
 'gen_ai.response.model': response_model,
 }
 self.instrumentation_settings.record_metrics(response, price_calculation, metric_attributes)
 nonlocal record_metrics
 record_metrics = _record_metrics
 if not span.is_recording():
 return
 self.instrumentation_settings.handle_messages(messages, response, system, span)
 attributes_to_set = {
 **response.usage.opentelemetry_attributes(),
 'gen_ai.response.model': response_model,
 }
 try:
 price_calculation = response.cost()
 except LookupError:
 # The cost of this provider/model is unknown, which is common.
 pass
 except Exception as e:
 warnings.warn(
 f'Failed to get cost from response: {type(e).__name__}: {e}', CostCalculationFailedWarning
 )
 else:
 attributes_to_set['operation.cost'] = float(price_calculation.total_price)
 if response.provider_response_id is not None:
 attributes_to_set['gen_ai.response.id'] = response.provider_response_id
 if response.finish_reason is not None:
 attributes_to_set['gen_ai.response.finish_reasons'] = [response.finish_reason]
 span.set_attributes(attributes_to_set)
 span.update_name(f'{operation}{request_model}')
 yield finish
 finally:
 if record_metrics:
 # We only want to record metrics after the span is finished,
 # to prevent them from being redundantly recorded in the span itself by logfire.
 record_metrics()
 @staticmethod
 defmodel_attributes(model: Model):
 attributes: dict[str, AttributeValue] = {
 GEN_AI_SYSTEM_ATTRIBUTE: model.system,
 GEN_AI_REQUEST_MODEL_ATTRIBUTE: model.model_name,
 }
 if base_url := model.base_url:
 try:
 parsed = urlparse(base_url)
 except Exception: # pragma: no cover
 pass
 else:
 if parsed.hostname: # pragma: no branch
 attributes['server.address'] = parsed.hostname
 if parsed.port: # pragma: no branch
 attributes['server.port'] = parsed.port
 return attributes
 @staticmethod
 defevent_to_dict(event: Event) -> dict[str, Any]:
 if not event.body:
 body = {} # pragma: no cover
 elif isinstance(event.body, Mapping):
 body = event.body # type: ignore
 else:
 body = {'body': event.body}
 return {**body, **(event.attributes or {})}
 @staticmethod
 defserialize_any(value: Any) -> str:
 try:
 return ANY_ADAPTER.dump_python(value, mode='json')
 except Exception:
 try:
 return str(value)
 except Exception as e:
 return f'Unable to serialize: {e}'
```
---|--- 
#### instrumentation_settings `instance-attribute`
```
instrumentation_settings: InstrumentationSettings[](#pydantic_ai.models.instrumented.InstrumentationSettings "pydantic_ai.models.instrumented.InstrumentationSettings") = (
 options or InstrumentationSettings[](#pydantic_ai.models.instrumented.InstrumentationSettings "pydantic_ai.models.instrumented.InstrumentationSettings")()
)
```
Instrumentation settings for this model.