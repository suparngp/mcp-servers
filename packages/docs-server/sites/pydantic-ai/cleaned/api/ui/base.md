[ Skip to content ](#pydantic_aiui)
# `pydantic_ai.ui`
### StateDeps `dataclass`
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[StateT]`
Dependency type that holds state.
This class is used to manage the state of an agent run. It allows setting the state of the agent run with a specific type of state model, which must be a subclass of `BaseModel`.
The state is set using the `state` setter by the `Adapter` when the run starts.
Implements the `StateHandler` protocol.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_adapter.py`
```
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
```
| ```
@dataclass
classStateDeps(Generic[StateT]):
"""Dependency type that holds state.
 This class is used to manage the state of an agent run. It allows setting
 the state of the agent run with a specific type of state model, which must
 be a subclass of `BaseModel`.
 The state is set using the `state` setter by the `Adapter` when the run starts.
 Implements the `StateHandler` protocol.
 """
 state: StateT
```
---|--- 
### StateHandler
Bases: `Protocol[](https://docs.python.org/3/library/typing.html#typing.Protocol "typing.Protocol")`
Protocol for state handlers in agent runs. Requires the class to be a dataclass with a `state` field.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_adapter.py`
```
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
```
| ```
@runtime_checkable
classStateHandler(Protocol):
"""Protocol for state handlers in agent runs. Requires the class to be a dataclass with a `state` field."""
 # Has to be a dataclass so we can use `replace` to update the state.
 # From https://github.com/python/typeshed/blob/9ab7fde0a0cd24ed7a72837fcb21093b811b80d8/stdlib/_typeshed/__init__.pyi#L352
 __dataclass_fields__: ClassVar[dict[str, Field[Any]]]
 @property
 defstate(self) -> Any:
"""Get the current state of the agent run."""
 ...
 @state.setter
 defstate(self, state: Any) -> None:
"""Set the state of the agent run.
 This method is called to update the state of the agent run with the
 provided state.
 Args:
 state: The run state.
 """
 ...
```
---|--- 
#### state `property` `writable`
```
state: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")
```
Get the current state of the agent run.
### UIAdapter `dataclass`
Bases: `ABC[](https://docs.python.org/3/library/abc.html#abc.ABC "abc.ABC")`, `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[RunInputT, MessageT, EventT, AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]`
Base class for UI adapters.
This class is responsible for transforming agent run input received from the frontend into arguments for [`Agent.run_stream_events()`](../../agent/#pydantic_ai.agent.AbstractAgent.run_stream_events), running the agent, and then transforming Pydantic AI events into protocol-specific events.
The event stream transformation is handled by a protocol-specific [`UIEventStream`](#pydantic_ai.ui.UIEventStream) subclass.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_adapter.py`
```
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
```
| ```
@dataclass
classUIAdapter(ABC, Generic[RunInputT, MessageT, EventT, AgentDepsT, OutputDataT]):
"""Base class for UI adapters.
 This class is responsible for transforming agent run input received from the frontend into arguments for [`Agent.run_stream_events()`][pydantic_ai.Agent.run_stream_events], running the agent, and then transforming Pydantic AI events into protocol-specific events.
 The event stream transformation is handled by a protocol-specific [`UIEventStream`][pydantic_ai.ui.UIEventStream] subclass.
 """
 agent: AbstractAgent[AgentDepsT, OutputDataT]
"""The Pydantic AI agent to run."""
 run_input: RunInputT
"""The protocol-specific run input object."""
 _: KW_ONLY
 accept: str | None = None
"""The `Accept` header value of the request, used to determine how to encode the protocol-specific events for the streaming response."""
 @classmethod
 async deffrom_request(
 cls, request: Request, *, agent: AbstractAgent[AgentDepsT, OutputDataT]
 ) -> UIAdapter[RunInputT, MessageT, EventT, AgentDepsT, OutputDataT]:
"""Create an adapter from a request."""
 return cls(
 agent=agent,
 run_input=cls.build_run_input(await request.body()),
 accept=request.headers.get('accept'),
 )
 @classmethod
 @abstractmethod
 defbuild_run_input(cls, body: bytes) -> RunInputT:
"""Build a protocol-specific run input object from the request body."""
 raise NotImplementedError
 @classmethod
 @abstractmethod
 defload_messages(cls, messages: Sequence[MessageT]) -> list[ModelMessage]:
"""Transform protocol-specific messages into Pydantic AI messages."""
 raise NotImplementedError
 @abstractmethod
 defbuild_event_stream(self) -> UIEventStream[RunInputT, EventT, AgentDepsT, OutputDataT]:
"""Build a protocol-specific event stream transformer."""
 raise NotImplementedError
 @cached_property
 @abstractmethod
 defmessages(self) -> list[ModelMessage]:
"""Pydantic AI messages from the protocol-specific run input."""
 raise NotImplementedError
 @cached_property
 deftoolset(self) -> AbstractToolset[AgentDepsT] | None:
"""Toolset representing frontend tools from the protocol-specific run input."""
 return None
 @cached_property
 defstate(self) -> dict[str, Any] | None:
"""Frontend state from the protocol-specific run input."""
 return None
 deftransform_stream(
 self,
 stream: AsyncIterator[NativeEvent],
 on_complete: OnCompleteFunc[EventT] | None = None,
 ) -> AsyncIterator[EventT]:
"""Transform a stream of Pydantic AI events into protocol-specific events.
 Args:
 stream: The stream of Pydantic AI events to transform.
 on_complete: Optional callback function called when the agent run completes successfully.
 The callback receives the completed [`AgentRunResult`][pydantic_ai.agent.AgentRunResult] and can optionally yield additional protocol-specific events.
 """
 return self.build_event_stream().transform_stream(stream, on_complete=on_complete)
 defencode_stream(self, stream: AsyncIterator[EventT]) -> AsyncIterator[str]:
"""Encode a stream of protocol-specific events as strings according to the `Accept` header value.
 Args:
 stream: The stream of protocol-specific events to encode.
 """
 return self.build_event_stream().encode_stream(stream)
 defstreaming_response(self, stream: AsyncIterator[EventT]) -> StreamingResponse:
"""Generate a streaming response from a stream of protocol-specific events.
 Args:
 stream: The stream of protocol-specific events to encode.
 """
 return self.build_event_stream().streaming_response(stream)
 defrun_stream_native(
 self,
 *,
 output_type: OutputSpec[Any] | None = None,
 message_history: Sequence[ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: Model | KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: UsageLimits | None = None,
 usage: RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 ) -> AsyncIterator[NativeEvent]:
"""Run the agent with the protocol-specific run input and stream Pydantic AI events.
 Args:
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
 builtin_tools: Optional additional builtin tools to use for this run.
 """
 message_history = [*(message_history or []), *self.messages]
 toolset = self.toolset
 if toolset:
 output_type = [output_type or self.agent.output_type, DeferredToolRequests]
 toolsets = [*(toolsets or []), toolset]
 if isinstance(deps, StateHandler):
 raw_state = self.state or {}
 if isinstance(deps.state, BaseModel):
 state = type(deps.state).model_validate(raw_state)
 else:
 state = raw_state
 deps.state = state
 elif self.state:
 raise UserError(
 f'State is provided but `deps` of type `{type(deps).__name__}` does not implement the `StateHandler` protocol: it needs to be a dataclass with a non-optional `state` field.'
 )
 return self.agent.run_stream_events(
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
 defrun_stream(
 self,
 *,
 output_type: OutputSpec[Any] | None = None,
 message_history: Sequence[ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: Model | KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: UsageLimits | None = None,
 usage: RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 on_complete: OnCompleteFunc[EventT] | None = None,
 ) -> AsyncIterator[EventT]:
"""Run the agent with the protocol-specific run input and stream protocol-specific events.
 Args:
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
 builtin_tools: Optional additional builtin tools to use for this run.
 on_complete: Optional callback function called when the agent run completes successfully.
 The callback receives the completed [`AgentRunResult`][pydantic_ai.agent.AgentRunResult] and can optionally yield additional protocol-specific events.
 """
 return self.transform_stream(
 self.run_stream_native(
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
 ),
 on_complete=on_complete,
 )
 @classmethod
 async defdispatch_request(
 cls,
 request: Request,
 *,
 agent: AbstractAgent[AgentDepsT, OutputDataT],
 message_history: Sequence[ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: Model | KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 output_type: OutputSpec[Any] | None = None,
 model_settings: ModelSettings | None = None,
 usage_limits: UsageLimits | None = None,
 usage: RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 on_complete: OnCompleteFunc[EventT] | None = None,
 ) -> Response:
"""Handle a protocol-specific HTTP request by running the agent and returning a streaming response of protocol-specific events.
 Args:
 request: The incoming Starlette/FastAPI request.
 agent: The agent to run.
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
 builtin_tools: Optional additional builtin tools to use for this run.
 on_complete: Optional callback function called when the agent run completes successfully.
 The callback receives the completed [`AgentRunResult`][pydantic_ai.agent.AgentRunResult] and can optionally yield additional protocol-specific events.
 Returns:
 A streaming Starlette response with protocol-specific events encoded per the request's `Accept` header value.
 """
 try:
 fromstarlette.responsesimport Response
 except ImportError as e: # pragma: no cover
 raise ImportError(
 'Please install the `starlette` package to use `dispatch_request()` method, '
 'you can use the `ui` optional group — `pip install "pydantic-ai-slim[ui]"`'
 ) frome
 try:
 adapter = await cls.from_request(request, agent=agent)
 except ValidationError as e: # pragma: no cover
 return Response(
 content=e.json(),
 media_type='application/json',
 status_code=HTTPStatus.UNPROCESSABLE_ENTITY,
 )
 return adapter.streaming_response(
 adapter.run_stream(
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 deps=deps,
 output_type=output_type,
 model=model,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 on_complete=on_complete,
 ),
 )
```
---|--- 
#### agent `instance-attribute`
```
agent: AbstractAgent[](../../agent/#pydantic_ai.agent.AbstractAgent "pydantic_ai.agent.AbstractAgent")[AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]
```
The Pydantic AI agent to run.
#### run_input `instance-attribute`
```
run_input: RunInputT
```
The protocol-specific run input object.
#### accept `class-attribute` `instance-attribute`
```
accept: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The `Accept` header value of the request, used to determine how to encode the protocol-specific events for the streaming response.
#### from_request `async` `classmethod`
```
from_request(
 request: Request[](https://fastapi.tiangolo.com/reference/request/#fastapi.Request "starlette.requests.Request"),
 *,
 agent: AbstractAgent[](../../agent/#pydantic_ai.agent.AbstractAgent "pydantic_ai.agent.AbstractAgent")[AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]
) -> UIAdapter[](#pydantic_ai.ui.UIAdapter "pydantic_ai.ui._adapter.UIAdapter")[
 RunInputT, MessageT, EventT, AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")
]
```
Create an adapter from a request.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_adapter.py`
```
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
```
| ```
@classmethod
async deffrom_request(
 cls, request: Request, *, agent: AbstractAgent[AgentDepsT, OutputDataT]
) -> UIAdapter[RunInputT, MessageT, EventT, AgentDepsT, OutputDataT]:
"""Create an adapter from a request."""
 return cls(
 agent=agent,
 run_input=cls.build_run_input(await request.body()),
 accept=request.headers.get('accept'),
 )
```
---|--- 
#### build_run_input `abstractmethod` `classmethod`
```
build_run_input(body: bytes[](https://docs.python.org/3/library/stdtypes.html#bytes)) -> RunInputT
```
Build a protocol-specific run input object from the request body.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_adapter.py`
```
133
134
135
136
137
```
| ```
@classmethod
@abstractmethod
defbuild_run_input(cls, body: bytes) -> RunInputT:
"""Build a protocol-specific run input object from the request body."""
 raise NotImplementedError
```
---|--- 
#### load_messages `abstractmethod` `classmethod`
```
load_messages(
 messages: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[MessageT],
) -> list[](https://docs.python.org/3/library/stdtypes.html#list)[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")]
```
Transform protocol-specific messages into Pydantic AI messages.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_adapter.py`
```
139
140
141
142
143
```
| ```
@classmethod
@abstractmethod
defload_messages(cls, messages: Sequence[MessageT]) -> list[ModelMessage]:
"""Transform protocol-specific messages into Pydantic AI messages."""
 raise NotImplementedError
```
---|--- 
#### build_event_stream `abstractmethod`
```
build_event_stream() -> (
 UIEventStream[](#pydantic_ai.ui.UIEventStream "pydantic_ai.ui._event_stream.UIEventStream")[
 RunInputT, EventT, AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")
 ]
)
```
Build a protocol-specific event stream transformer.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_adapter.py`
```
145
146
147
148
```
| ```
@abstractmethod
defbuild_event_stream(self) -> UIEventStream[RunInputT, EventT, AgentDepsT, OutputDataT]:
"""Build a protocol-specific event stream transformer."""
 raise NotImplementedError
```
---|--- 
#### messages `abstractmethod` `cached` `property`
```
messages: list[](https://docs.python.org/3/library/stdtypes.html#list)[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")]
```
Pydantic AI messages from the protocol-specific run input.
#### toolset `cached` `property`
```
toolset: AbstractToolset[](../../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.toolsets.AbstractToolset")[AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
```
Toolset representing frontend tools from the protocol-specific run input.
#### state `cached` `property`
```
state: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None
```
Frontend state from the protocol-specific run input.
#### transform_stream
```
transform_stream(
 stream: AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[NativeEvent[](#pydantic_ai.ui.NativeEvent "pydantic_ai.ui._event_stream.NativeEvent")],
 on_complete: OnCompleteFunc[](#pydantic_ai.ui.OnCompleteFunc "pydantic_ai.ui._event_stream.OnCompleteFunc")[EventT] | None = None,
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Transform a stream of Pydantic AI events into protocol-specific events.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`stream` | `AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[NativeEvent[](#pydantic_ai.ui.NativeEvent "pydantic_ai.ui._event_stream.NativeEvent")]` | The stream of Pydantic AI events to transform. | _required_ 
`on_complete` | `OnCompleteFunc[](#pydantic_ai.ui.OnCompleteFunc "pydantic_ai.ui._event_stream.OnCompleteFunc")[EventT] | None` | Optional callback function called when the agent run completes successfully. The callback receives the completed [`AgentRunResult`](../../agent/#pydantic_ai.agent.AgentRunResult) and can optionally yield additional protocol-specific events. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_adapter.py`
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
```
| ```
deftransform_stream(
 self,
 stream: AsyncIterator[NativeEvent],
 on_complete: OnCompleteFunc[EventT] | None = None,
) -> AsyncIterator[EventT]:
"""Transform a stream of Pydantic AI events into protocol-specific events.
 Args:
 stream: The stream of Pydantic AI events to transform.
 on_complete: Optional callback function called when the agent run completes successfully.
 The callback receives the completed [`AgentRunResult`][pydantic_ai.agent.AgentRunResult] and can optionally yield additional protocol-specific events.
 """
 return self.build_event_stream().transform_stream(stream, on_complete=on_complete)
```
---|--- 
#### encode_stream
```
encode_stream(
 stream: AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT],
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Encode a stream of protocol-specific events as strings according to the `Accept` header value.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`stream` | `AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]` | The stream of protocol-specific events to encode. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_adapter.py`
```
180
181
182
183
184
185
186
```
| ```
defencode_stream(self, stream: AsyncIterator[EventT]) -> AsyncIterator[str]:
"""Encode a stream of protocol-specific events as strings according to the `Accept` header value.
 Args:
 stream: The stream of protocol-specific events to encode.
 """
 return self.build_event_stream().encode_stream(stream)
```
---|--- 
#### streaming_response
```
streaming_response(
 stream: AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT],
) -> StreamingResponse[](https://fastapi.tiangolo.com/reference/responses/#fastapi.responses.StreamingResponse "starlette.responses.StreamingResponse")
```
Generate a streaming response from a stream of protocol-specific events.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`stream` | `AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]` | The stream of protocol-specific events to encode. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_adapter.py`
```
188
189
190
191
192
193
194
```
| ```
defstreaming_response(self, stream: AsyncIterator[EventT]) -> StreamingResponse:
"""Generate a streaming response from a stream of protocol-specific events.
 Args:
 stream: The stream of protocol-specific events to encode.
 """
 return self.build_event_stream().streaming_response(stream)
```
---|--- 
#### run_stream_native
```
run_stream_native(
 *,
 output_type: OutputSpec[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.DeferredToolResults") | None
 ) = None,
 model: Model[](../../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.toolsets.AbstractToolset")[AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[NativeEvent[](#pydantic_ai.ui.NativeEvent "pydantic_ai.ui._event_stream.NativeEvent")]
```
Run the agent with the protocol-specific run input and stream Pydantic AI events.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`output_type` | `OutputSpec[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.toolsets.AbstractToolset")[AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools to use for this run. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_adapter.py`
```
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
```
| ```
defrun_stream_native(
 self,
 *,
 output_type: OutputSpec[Any] | None = None,
 message_history: Sequence[ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: Model | KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: UsageLimits | None = None,
 usage: RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
) -> AsyncIterator[NativeEvent]:
"""Run the agent with the protocol-specific run input and stream Pydantic AI events.
 Args:
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
 builtin_tools: Optional additional builtin tools to use for this run.
 """
 message_history = [*(message_history or []), *self.messages]
 toolset = self.toolset
 if toolset:
 output_type = [output_type or self.agent.output_type, DeferredToolRequests]
 toolsets = [*(toolsets or []), toolset]
 if isinstance(deps, StateHandler):
 raw_state = self.state or {}
 if isinstance(deps.state, BaseModel):
 state = type(deps.state).model_validate(raw_state)
 else:
 state = raw_state
 deps.state = state
 elif self.state:
 raise UserError(
 f'State is provided but `deps` of type `{type(deps).__name__}` does not implement the `StateHandler` protocol: it needs to be a dataclass with a non-optional `state` field.'
 )
 return self.agent.run_stream_events(
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
#### run_stream
```
run_stream(
 *,
 output_type: OutputSpec[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.DeferredToolResults") | None
 ) = None,
 model: Model[](../../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.toolsets.AbstractToolset")[AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 on_complete: OnCompleteFunc[](#pydantic_ai.ui.OnCompleteFunc "pydantic_ai.ui._event_stream.OnCompleteFunc")[EventT] | None = None
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Run the agent with the protocol-specific run input and stream protocol-specific events.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`output_type` | `OutputSpec[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.toolsets.AbstractToolset")[AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools to use for this run. | `None` 
`on_complete` | `OnCompleteFunc[](#pydantic_ai.ui.OnCompleteFunc "pydantic_ai.ui._event_stream.OnCompleteFunc")[EventT] | None` | Optional callback function called when the agent run completes successfully. The callback receives the completed [`AgentRunResult`](../../agent/#pydantic_ai.agent.AgentRunResult) and can optionally yield additional protocol-specific events. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_adapter.py`
```
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
```
| ```
defrun_stream(
 self,
 *,
 output_type: OutputSpec[Any] | None = None,
 message_history: Sequence[ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: Model | KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 model_settings: ModelSettings | None = None,
 usage_limits: UsageLimits | None = None,
 usage: RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 on_complete: OnCompleteFunc[EventT] | None = None,
) -> AsyncIterator[EventT]:
"""Run the agent with the protocol-specific run input and stream protocol-specific events.
 Args:
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
 builtin_tools: Optional additional builtin tools to use for this run.
 on_complete: Optional callback function called when the agent run completes successfully.
 The callback receives the completed [`AgentRunResult`][pydantic_ai.agent.AgentRunResult] and can optionally yield additional protocol-specific events.
 """
 return self.transform_stream(
 self.run_stream_native(
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
 ),
 on_complete=on_complete,
 )
```
---|--- 
#### dispatch_request `async` `classmethod`
```
dispatch_request(
 request: Request[](https://fastapi.tiangolo.com/reference/request/#fastapi.Request "starlette.requests.Request"),
 *,
 agent: AbstractAgent[](../../agent/#pydantic_ai.agent.AbstractAgent "pydantic_ai.agent.AbstractAgent")[AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")],
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.DeferredToolResults") | None
 ) = None,
 model: Model[](../../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 output_type: OutputSpec[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = None,
 model_settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.toolsets.AbstractToolset")[AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 on_complete: OnCompleteFunc[](#pydantic_ai.ui.OnCompleteFunc "pydantic_ai.ui._event_stream.OnCompleteFunc")[EventT] | None = None
) -> Response[](https://fastapi.tiangolo.com/reference/response/#fastapi.Response "starlette.responses.Response")
```
Handle a protocol-specific HTTP request by running the agent and returning a streaming response of protocol-specific events.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`request` | `Request[](https://fastapi.tiangolo.com/reference/request/#fastapi.Request "starlette.requests.Request")` | The incoming Starlette/FastAPI request. | _required_ 
`agent` | `AbstractAgent[](../../agent/#pydantic_ai.agent.AbstractAgent "pydantic_ai.agent.AbstractAgent")[AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]` | The agent to run. | _required_ 
`output_type` | `OutputSpec[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.toolsets.AbstractToolset")[AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools to use for this run. | `None` 
`on_complete` | `OnCompleteFunc[](#pydantic_ai.ui.OnCompleteFunc "pydantic_ai.ui._event_stream.OnCompleteFunc")[EventT] | None` | Optional callback function called when the agent run completes successfully. The callback receives the completed [`AgentRunResult`](../../agent/#pydantic_ai.agent.AgentRunResult) and can optionally yield additional protocol-specific events. | `None` 
Returns:
Type | Description 
---|--- 
`Response[](https://fastapi.tiangolo.com/reference/response/#fastapi.Response "starlette.responses.Response")` | A streaming Starlette response with protocol-specific events encoded per the request's `Accept` header value. 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_adapter.py`
```
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
```
| ```
@classmethod
async defdispatch_request(
 cls,
 request: Request,
 *,
 agent: AbstractAgent[AgentDepsT, OutputDataT],
 message_history: Sequence[ModelMessage] | None = None,
 deferred_tool_results: DeferredToolResults | None = None,
 model: Model | KnownModelName | str | None = None,
 deps: AgentDepsT = None,
 output_type: OutputSpec[Any] | None = None,
 model_settings: ModelSettings | None = None,
 usage_limits: UsageLimits | None = None,
 usage: RunUsage | None = None,
 infer_name: bool = True,
 toolsets: Sequence[AbstractToolset[AgentDepsT]] | None = None,
 builtin_tools: Sequence[AbstractBuiltinTool] | None = None,
 on_complete: OnCompleteFunc[EventT] | None = None,
) -> Response:
"""Handle a protocol-specific HTTP request by running the agent and returning a streaming response of protocol-specific events.
 Args:
 request: The incoming Starlette/FastAPI request.
 agent: The agent to run.
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
 builtin_tools: Optional additional builtin tools to use for this run.
 on_complete: Optional callback function called when the agent run completes successfully.
 The callback receives the completed [`AgentRunResult`][pydantic_ai.agent.AgentRunResult] and can optionally yield additional protocol-specific events.
 Returns:
 A streaming Starlette response with protocol-specific events encoded per the request's `Accept` header value.
 """
 try:
 fromstarlette.responsesimport Response
 except ImportError as e: # pragma: no cover
 raise ImportError(
 'Please install the `starlette` package to use `dispatch_request()` method, '
 'you can use the `ui` optional group — `pip install "pydantic-ai-slim[ui]"`'
 ) frome
 try:
 adapter = await cls.from_request(request, agent=agent)
 except ValidationError as e: # pragma: no cover
 return Response(
 content=e.json(),
 media_type='application/json',
 status_code=HTTPStatus.UNPROCESSABLE_ENTITY,
 )
 return adapter.streaming_response(
 adapter.run_stream(
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 deps=deps,
 output_type=output_type,
 model=model,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 builtin_tools=builtin_tools,
 on_complete=on_complete,
 ),
 )
```
---|--- 
### SSE_CONTENT_TYPE `module-attribute`
```
SSE_CONTENT_TYPE = 'text/event-stream'
```
Content type header value for Server-Sent Events (SSE).
### NativeEvent `module-attribute`
```
NativeEvent: TypeAlias[](https://docs.python.org/3/library/typing.html#typing.TypeAlias "typing.TypeAlias") = (
 AgentStreamEvent[](../../messages/#pydantic_ai.messages.AgentStreamEvent "pydantic_ai.messages.AgentStreamEvent") | AgentRunResultEvent[](../../run/#pydantic_ai.run.AgentRunResultEvent "pydantic_ai.run.AgentRunResultEvent")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
)
```
Type alias for the native event type, which is either an `AgentStreamEvent` or an `AgentRunResultEvent`.
### OnCompleteFunc `module-attribute`
```
OnCompleteFunc: TypeAlias[](https://docs.python.org/3/library/typing.html#typing.TypeAlias "typing.TypeAlias") = (
 Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[AgentRunResult[](../../run/#pydantic_ai.run.AgentRunResult "pydantic_ai.run.AgentRunResult")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]], None]
 | Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[AgentRunResult[](../../run/#pydantic_ai.run.AgentRunResult "pydantic_ai.run.AgentRunResult")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]], Awaitable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Awaitable "collections.abc.Awaitable")[None]]
 | Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[AgentRunResult[](../../run/#pydantic_ai.run.AgentRunResult "pydantic_ai.run.AgentRunResult")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]], AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]]
)
```
Callback function type that receives the `AgentRunResult` of the completed run. Can be sync, async, or an async generator of protocol-specific events.
### UIEventStream `dataclass`
Bases: `ABC[](https://docs.python.org/3/library/abc.html#abc.ABC "abc.ABC")`, `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[RunInputT, EventT, AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]`
Base class for UI event stream transformers.
This class is responsible for transforming Pydantic AI events into protocol-specific events.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
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
```
| ```
@dataclass
classUIEventStream(ABC, Generic[RunInputT, EventT, AgentDepsT, OutputDataT]):
"""Base class for UI event stream transformers.
 This class is responsible for transforming Pydantic AI events into protocol-specific events.
 """
 run_input: RunInputT
 accept: str | None = None
"""The `Accept` header value of the request, used to determine how to encode the protocol-specific events for the streaming response."""
 message_id: str = field(default_factory=lambda: str(uuid4()))
"""The message ID to use for the next event."""
 _turn: Literal['request', 'response'] | None = None
 _result: AgentRunResult[OutputDataT] | None = None
 _final_result_event: FinalResultEvent | None = None
 defnew_message_id(self) -> str:
"""Generate and store a new message ID."""
 self.message_id = str(uuid4())
 return self.message_id
 @property
 defresponse_headers(self) -> Mapping[str, str] | None:
"""Response headers to return to the frontend."""
 return None
 @property
 defcontent_type(self) -> str:
"""Get the content type for the event stream, compatible with the `Accept` header value.
 By default, this returns the Server-Sent Events content type (`text/event-stream`).
 If a subclass supports other types as well, it should consider `self.accept` in [`encode_event()`][pydantic_ai.ui.UIEventStream.encode_event] and return the resulting content type.
 """
 return SSE_CONTENT_TYPE
 @abstractmethod
 defencode_event(self, event: EventT) -> str:
"""Encode a protocol-specific event as a string."""
 raise NotImplementedError
 async defencode_stream(self, stream: AsyncIterator[EventT]) -> AsyncIterator[str]:
"""Encode a stream of protocol-specific events as strings according to the `Accept` header value."""
 async for event in stream:
 yield self.encode_event(event)
 defstreaming_response(self, stream: AsyncIterator[EventT]) -> StreamingResponse:
"""Generate a streaming response from a stream of protocol-specific events."""
 try:
 fromstarlette.responsesimport StreamingResponse
 except ImportError as e: # pragma: no cover
 raise ImportError(
 'Please install the `starlette` package to use the `streaming_response()` method, '
 'you can use the `ui` optional group — `pip install "pydantic-ai-slim[ui]"`'
 ) frome
 return StreamingResponse(
 self.encode_stream(stream),
 headers=self.response_headers,
 media_type=self.content_type,
 )
 async deftransform_stream( # noqa: C901
 self, stream: AsyncIterator[NativeEvent], on_complete: OnCompleteFunc[EventT] | None = None
 ) -> AsyncIterator[EventT]:
"""Transform a stream of Pydantic AI events into protocol-specific events.
 This method dispatches to specific hooks and `handle_*` methods that subclasses can override:
 - [`before_stream()`][pydantic_ai.ui.UIEventStream.before_stream]
 - [`after_stream()`][pydantic_ai.ui.UIEventStream.after_stream]
 - [`on_error()`][pydantic_ai.ui.UIEventStream.on_error]
 - [`before_request()`][pydantic_ai.ui.UIEventStream.before_request]
 - [`after_request()`][pydantic_ai.ui.UIEventStream.after_request]
 - [`before_response()`][pydantic_ai.ui.UIEventStream.before_response]
 - [`after_response()`][pydantic_ai.ui.UIEventStream.after_response]
 - [`handle_event()`][pydantic_ai.ui.UIEventStream.handle_event]
 Args:
 stream: The stream of Pydantic AI events to transform.
 on_complete: Optional callback function called when the agent run completes successfully.
 The callback receives the completed [`AgentRunResult`][pydantic_ai.agent.AgentRunResult] and can optionally yield additional protocol-specific events.
 """
 async for e in self.before_stream():
 yield e
 try:
 async for event in stream:
 if isinstance(event, PartStartEvent):
 async for e in self._turn_to('response'):
 yield e
 elif isinstance(event, FunctionToolCallEvent):
 async for e in self._turn_to('request'):
 yield e
 elif isinstance(event, AgentRunResultEvent):
 if (
 self._final_result_event
 and (tool_call_id := self._final_result_event.tool_call_id)
 and (tool_name := self._final_result_event.tool_name)
 ):
 async for e in self._turn_to('request'):
 yield e
 self._final_result_event = None
 # Ensure the stream does not end on a dangling tool call without a result.
 output_tool_result_event = FunctionToolResultEvent(
 result=ToolReturnPart(
 tool_call_id=tool_call_id,
 tool_name=tool_name,
 content='Final result processed.',
 )
 )
 async for e in self.handle_function_tool_result(output_tool_result_event):
 yield e
 result = cast(AgentRunResult[OutputDataT], event.result)
 self._result = result
 async for e in self._turn_to(None):
 yield e
 if on_complete is not None:
 if inspect.isasyncgenfunction(on_complete):
 async for e in on_complete(result):
 yield e
 elif _utils.is_async_callable(on_complete):
 await on_complete(result)
 else:
 await _utils.run_in_executor(on_complete, result)
 elif isinstance(event, FinalResultEvent):
 self._final_result_event = event
 if isinstance(event, BuiltinToolCallEvent | BuiltinToolResultEvent): # pyright: ignore[reportDeprecated]
 # These events were deprecated before this feature was introduced
 continue
 async for e in self.handle_event(event):
 yield e
 except Exception as e:
 async for e in self.on_error(e):
 yield e
 finally:
 async for e in self._turn_to(None):
 yield e
 async for e in self.after_stream():
 yield e
 async def_turn_to(self, to_turn: Literal['request', 'response'] | None) -> AsyncIterator[EventT]:
"""Fire hooks when turning from request to response or vice versa."""
 if to_turn == self._turn:
 return
 if self._turn == 'request':
 async for e in self.after_request():
 yield e
 elif self._turn == 'response':
 async for e in self.after_response():
 yield e
 self._turn = to_turn
 if to_turn == 'request':
 async for e in self.before_request():
 yield e
 elif to_turn == 'response':
 async for e in self.before_response():
 yield e
 async defhandle_event(self, event: NativeEvent) -> AsyncIterator[EventT]:
"""Transform a Pydantic AI event into one or more protocol-specific events.
 This method dispatches to specific `handle_*` methods based on event type:
 - [`PartStartEvent`][pydantic_ai.messages.PartStartEvent] -> [`handle_part_start()`][pydantic_ai.ui.UIEventStream.handle_part_start]
 - [`PartDeltaEvent`][pydantic_ai.messages.PartDeltaEvent] -> `handle_part_delta`
 - [`PartEndEvent`][pydantic_ai.messages.PartEndEvent] -> `handle_part_end`
 - [`FinalResultEvent`][pydantic_ai.messages.FinalResultEvent] -> `handle_final_result`
 - [`FunctionToolCallEvent`][pydantic_ai.messages.FunctionToolCallEvent] -> `handle_function_tool_call`
 - [`FunctionToolResultEvent`][pydantic_ai.messages.FunctionToolResultEvent] -> `handle_function_tool_result`
 - [`AgentRunResultEvent`][pydantic_ai.run.AgentRunResultEvent] -> `handle_run_result`
 Subclasses are encouraged to override the individual `handle_*` methods rather than this one.
 If you need specific behavior for all events, make sure you call the super method.
 """
 match event:
 case PartStartEvent():
 async for e in self.handle_part_start(event):
 yield e
 case PartDeltaEvent():
 async for e in self.handle_part_delta(event):
 yield e
 case PartEndEvent():
 async for e in self.handle_part_end(event):
 yield e
 case FinalResultEvent():
 async for e in self.handle_final_result(event):
 yield e
 case FunctionToolCallEvent():
 async for e in self.handle_function_tool_call(event):
 yield e
 case FunctionToolResultEvent():
 async for e in self.handle_function_tool_result(event):
 yield e
 case AgentRunResultEvent():
 async for e in self.handle_run_result(event):
 yield e
 case_:
 pass
 async defhandle_part_start(self, event: PartStartEvent) -> AsyncIterator[EventT]:
"""Handle a `PartStartEvent`.
 This method dispatches to specific `handle_*` methods based on part type:
 - [`TextPart`][pydantic_ai.messages.TextPart] -> [`handle_text_start()`][pydantic_ai.ui.UIEventStream.handle_text_start]
 - [`ThinkingPart`][pydantic_ai.messages.ThinkingPart] -> [`handle_thinking_start()`][pydantic_ai.ui.UIEventStream.handle_thinking_start]
 - [`ToolCallPart`][pydantic_ai.messages.ToolCallPart] -> [`handle_tool_call_start()`][pydantic_ai.ui.UIEventStream.handle_tool_call_start]
 - [`BuiltinToolCallPart`][pydantic_ai.messages.BuiltinToolCallPart] -> [`handle_builtin_tool_call_start()`][pydantic_ai.ui.UIEventStream.handle_builtin_tool_call_start]
 - [`BuiltinToolReturnPart`][pydantic_ai.messages.BuiltinToolReturnPart] -> [`handle_builtin_tool_return()`][pydantic_ai.ui.UIEventStream.handle_builtin_tool_return]
 - [`FilePart`][pydantic_ai.messages.FilePart] -> [`handle_file()`][pydantic_ai.ui.UIEventStream.handle_file]
 Subclasses are encouraged to override the individual `handle_*` methods rather than this one.
 If you need specific behavior for all part start events, make sure you call the super method.
 Args:
 event: The part start event.
 """
 part = event.part
 previous_part_kind = event.previous_part_kind
 match part:
 case TextPart():
 async for e in self.handle_text_start(part, follows_text=previous_part_kind == 'text'):
 yield e
 case ThinkingPart():
 async for e in self.handle_thinking_start(part, follows_thinking=previous_part_kind == 'thinking'):
 yield e
 case ToolCallPart():
 async for e in self.handle_tool_call_start(part):
 yield e
 case BuiltinToolCallPart():
 async for e in self.handle_builtin_tool_call_start(part):
 yield e
 case BuiltinToolReturnPart():
 async for e in self.handle_builtin_tool_return(part):
 yield e
 case FilePart(): # pragma: no branch
 async for e in self.handle_file(part):
 yield e
 async defhandle_part_delta(self, event: PartDeltaEvent) -> AsyncIterator[EventT]:
"""Handle a PartDeltaEvent.
 This method dispatches to specific `handle_*_delta` methods based on part delta type:
 - [`TextPartDelta`][pydantic_ai.messages.TextPartDelta] -> [`handle_text_delta()`][pydantic_ai.ui.UIEventStream.handle_text_delta]
 - [`ThinkingPartDelta`][pydantic_ai.messages.ThinkingPartDelta] -> [`handle_thinking_delta()`][pydantic_ai.ui.UIEventStream.handle_thinking_delta]
 - [`ToolCallPartDelta`][pydantic_ai.messages.ToolCallPartDelta] -> [`handle_tool_call_delta()`][pydantic_ai.ui.UIEventStream.handle_tool_call_delta]
 Subclasses are encouraged to override the individual `handle_*_delta` methods rather than this one.
 If you need specific behavior for all part delta events, make sure you call the super method.
 Args:
 event: The PartDeltaEvent.
 """
 delta = event.delta
 match delta:
 case TextPartDelta():
 async for e in self.handle_text_delta(delta):
 yield e
 case ThinkingPartDelta():
 async for e in self.handle_thinking_delta(delta):
 yield e
 case ToolCallPartDelta(): # pragma: no branch
 async for e in self.handle_tool_call_delta(delta):
 yield e
 async defhandle_part_end(self, event: PartEndEvent) -> AsyncIterator[EventT]:
"""Handle a `PartEndEvent`.
 This method dispatches to specific `handle_*_end` methods based on part type:
 - [`TextPart`][pydantic_ai.messages.TextPart] -> [`handle_text_end()`][pydantic_ai.ui.UIEventStream.handle_text_end]
 - [`ThinkingPart`][pydantic_ai.messages.ThinkingPart] -> [`handle_thinking_end()`][pydantic_ai.ui.UIEventStream.handle_thinking_end]
 - [`ToolCallPart`][pydantic_ai.messages.ToolCallPart] -> [`handle_tool_call_end()`][pydantic_ai.ui.UIEventStream.handle_tool_call_end]
 - [`BuiltinToolCallPart`][pydantic_ai.messages.BuiltinToolCallPart] -> [`handle_builtin_tool_call_end()`][pydantic_ai.ui.UIEventStream.handle_builtin_tool_call_end]
 Subclasses are encouraged to override the individual `handle_*_end` methods rather than this one.
 If you need specific behavior for all part end events, make sure you call the super method.
 Args:
 event: The part end event.
 """
 part = event.part
 next_part_kind = event.next_part_kind
 match part:
 case TextPart():
 async for e in self.handle_text_end(part, followed_by_text=next_part_kind == 'text'):
 yield e
 case ThinkingPart():
 async for e in self.handle_thinking_end(part, followed_by_thinking=next_part_kind == 'thinking'):
 yield e
 case ToolCallPart():
 async for e in self.handle_tool_call_end(part):
 yield e
 case BuiltinToolCallPart():
 async for e in self.handle_builtin_tool_call_end(part):
 yield e
 case BuiltinToolReturnPart() | FilePart(): # pragma: no cover
 # These don't have deltas, so they don't need to be ended.
 pass
 async defbefore_stream(self) -> AsyncIterator[EventT]:
"""Yield events before agent streaming starts.
 This hook is called before any agent events are processed.
 Override this to inject custom events at the start of the stream.
 """
 return # pragma: no cover
 yield # Make this an async generator
 async defafter_stream(self) -> AsyncIterator[EventT]:
"""Yield events after agent streaming completes.
 This hook is called after all agent events have been processed.
 Override this to inject custom events at the end of the stream.
 """
 return # pragma: no cover
 yield # Make this an async generator
 async defon_error(self, error: Exception) -> AsyncIterator[EventT]:
"""Handle errors that occur during streaming.
 Args:
 error: The error that occurred during streaming.
 """
 return # pragma: no cover
 yield # Make this an async generator
 async defbefore_request(self) -> AsyncIterator[EventT]:
"""Yield events before a model request is processed.
 Override this to inject custom events at the start of the request.
 """
 return
 yield # Make this an async generator
 async defafter_request(self) -> AsyncIterator[EventT]:
"""Yield events after a model request is processed.
 Override this to inject custom events at the end of the request.
 """
 return
 yield # Make this an async generator
 async defbefore_response(self) -> AsyncIterator[EventT]:
"""Yield events before a model response is processed.
 Override this to inject custom events at the start of the response.
 """
 return
 yield # Make this an async generator
 async defafter_response(self) -> AsyncIterator[EventT]:
"""Yield events after a model response is processed.
 Override this to inject custom events at the end of the response.
 """
 return
 yield # Make this an async generator
 async defhandle_text_start(self, part: TextPart, follows_text: bool = False) -> AsyncIterator[EventT]:
"""Handle the start of a `TextPart`.
 Args:
 part: The text part.
 follows_text: Whether the part is directly preceded by another text part. In this case, you may want to yield a "text-delta" event instead of a "text-start" event.
 """
 return # pragma: no cover
 yield # Make this an async generator
 async defhandle_text_delta(self, delta: TextPartDelta) -> AsyncIterator[EventT]:
"""Handle a `TextPartDelta`.
 Args:
 delta: The text part delta.
 """
 return # pragma: no cover
 yield # Make this an async generator
 async defhandle_text_end(self, part: TextPart, followed_by_text: bool = False) -> AsyncIterator[EventT]:
"""Handle the end of a `TextPart`.
 Args:
 part: The text part.
 followed_by_text: Whether the part is directly followed by another text part. In this case, you may not want to yield a "text-end" event yet.
 """
 return # pragma: no cover
 yield # Make this an async generator
 async defhandle_thinking_start(self, part: ThinkingPart, follows_thinking: bool = False) -> AsyncIterator[EventT]:
"""Handle the start of a `ThinkingPart`.
 Args:
 part: The thinking part.
 follows_thinking: Whether the part is directly preceded by another thinking part. In this case, you may want to yield a "thinking-delta" event instead of a "thinking-start" event.
 """
 return # pragma: no cover
 yield # Make this an async generator
 async defhandle_thinking_delta(self, delta: ThinkingPartDelta) -> AsyncIterator[EventT]:
"""Handle a `ThinkingPartDelta`.
 Args:
 delta: The thinking part delta.
 """
 return # pragma: no cover
 yield # Make this an async generator
 async defhandle_thinking_end(
 self, part: ThinkingPart, followed_by_thinking: bool = False
 ) -> AsyncIterator[EventT]:
"""Handle the end of a `ThinkingPart`.
 Args:
 part: The thinking part.
 followed_by_thinking: Whether the part is directly followed by another thinking part. In this case, you may not want to yield a "thinking-end" event yet.
 """
 return # pragma: no cover
 yield # Make this an async generator
 async defhandle_tool_call_start(self, part: ToolCallPart) -> AsyncIterator[EventT]:
"""Handle the start of a `ToolCallPart`.
 Args:
 part: The tool call part.
 """
 return # pragma: no cover
 yield # Make this an async generator
 async defhandle_tool_call_delta(self, delta: ToolCallPartDelta) -> AsyncIterator[EventT]:
"""Handle a `ToolCallPartDelta`.
 Args:
 delta: The tool call part delta.
 """
 return # pragma: no cover
 yield # Make this an async generator
 async defhandle_tool_call_end(self, part: ToolCallPart) -> AsyncIterator[EventT]:
"""Handle the end of a `ToolCallPart`.
 Args:
 part: The tool call part.
 """
 return # pragma: no cover
 yield # Make this an async generator
 async defhandle_builtin_tool_call_start(self, part: BuiltinToolCallPart) -> AsyncIterator[EventT]:
"""Handle a `BuiltinToolCallPart` at start.
 Args:
 part: The builtin tool call part.
 """
 return # pragma: no cover
 yield # Make this an async generator
 async defhandle_builtin_tool_call_end(self, part: BuiltinToolCallPart) -> AsyncIterator[EventT]:
"""Handle the end of a `BuiltinToolCallPart`.
 Args:
 part: The builtin tool call part.
 """
 return # pragma: no cover
 yield # Make this an async generator
 async defhandle_builtin_tool_return(self, part: BuiltinToolReturnPart) -> AsyncIterator[EventT]:
"""Handle a `BuiltinToolReturnPart`.
 Args:
 part: The builtin tool return part.
 """
 return # pragma: no cover
 yield # Make this an async generator
 async defhandle_file(self, part: FilePart) -> AsyncIterator[EventT]:
"""Handle a `FilePart`.
 Args:
 part: The file part.
 """
 return # pragma: no cover
 yield # Make this an async generator
 async defhandle_final_result(self, event: FinalResultEvent) -> AsyncIterator[EventT]:
"""Handle a `FinalResultEvent`.
 Args:
 event: The final result event.
 """
 return
 yield # Make this an async generator
 async defhandle_function_tool_call(self, event: FunctionToolCallEvent) -> AsyncIterator[EventT]:
"""Handle a `FunctionToolCallEvent`.
 Args:
 event: The function tool call event.
 """
 return
 yield # Make this an async generator
 async defhandle_function_tool_result(self, event: FunctionToolResultEvent) -> AsyncIterator[EventT]:
"""Handle a `FunctionToolResultEvent`.
 Args:
 event: The function tool result event.
 """
 return # pragma: no cover
 yield # Make this an async generator
 async defhandle_run_result(self, event: AgentRunResultEvent) -> AsyncIterator[EventT]:
"""Handle an `AgentRunResultEvent`.
 Args:
 event: The agent run result event.
 """
 return
 yield # Make this an async generator
```
---|--- 
#### accept `class-attribute` `instance-attribute`
```
accept: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The `Accept` header value of the request, used to determine how to encode the protocol-specific events for the streaming response.
#### message_id `class-attribute` `instance-attribute`
```
message_id: str[](https://docs.python.org/3/library/stdtypes.html#str) = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(
 default_factory=lambda: str[](https://docs.python.org/3/library/stdtypes.html#str)(uuid4[](https://docs.python.org/3/library/uuid.html#uuid.uuid4 "uuid.uuid4")())
)
```
The message ID to use for the next event.
#### new_message_id
```
new_message_id() -> str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Generate and store a new message ID.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
81
82
83
84
```
| ```
defnew_message_id(self) -> str:
"""Generate and store a new message ID."""
 self.message_id = str(uuid4())
 return self.message_id
```
---|--- 
#### response_headers `property`
```
response_headers: Mapping[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Mapping "collections.abc.Mapping")[str[](https://docs.python.org/3/library/stdtypes.html#str), str[](https://docs.python.org/3/library/stdtypes.html#str)] | None
```
Response headers to return to the frontend.
#### content_type `property`
```
content_type: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Get the content type for the event stream, compatible with the `Accept` header value.
By default, this returns the Server-Sent Events content type (`text/event-stream`). If a subclass supports other types as well, it should consider `self.accept` in [`encode_event()`](#pydantic_ai.ui.UIEventStream.encode_event) and return the resulting content type.
#### encode_event `abstractmethod`
```
encode_event(event: EventT) -> str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Encode a protocol-specific event as a string.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
100
101
102
103
```
| ```
@abstractmethod
defencode_event(self, event: EventT) -> str:
"""Encode a protocol-specific event as a string."""
 raise NotImplementedError
```
---|--- 
#### encode_stream `async`
```
encode_stream(
 stream: AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT],
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Encode a stream of protocol-specific events as strings according to the `Accept` header value.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
105
106
107
108
```
| ```
async defencode_stream(self, stream: AsyncIterator[EventT]) -> AsyncIterator[str]:
"""Encode a stream of protocol-specific events as strings according to the `Accept` header value."""
 async for event in stream:
 yield self.encode_event(event)
```
---|--- 
#### streaming_response
```
streaming_response(
 stream: AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT],
) -> StreamingResponse[](https://fastapi.tiangolo.com/reference/responses/#fastapi.responses.StreamingResponse "starlette.responses.StreamingResponse")
```
Generate a streaming response from a stream of protocol-specific events.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
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
```
| ```
defstreaming_response(self, stream: AsyncIterator[EventT]) -> StreamingResponse:
"""Generate a streaming response from a stream of protocol-specific events."""
 try:
 fromstarlette.responsesimport StreamingResponse
 except ImportError as e: # pragma: no cover
 raise ImportError(
 'Please install the `starlette` package to use the `streaming_response()` method, '
 'you can use the `ui` optional group — `pip install "pydantic-ai-slim[ui]"`'
 ) frome
 return StreamingResponse(
 self.encode_stream(stream),
 headers=self.response_headers,
 media_type=self.content_type,
 )
```
---|--- 
#### transform_stream `async`
```
transform_stream(
 stream: AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[NativeEvent[](#pydantic_ai.ui.NativeEvent "pydantic_ai.ui._event_stream.NativeEvent")],
 on_complete: OnCompleteFunc[](#pydantic_ai.ui.OnCompleteFunc "pydantic_ai.ui._event_stream.OnCompleteFunc")[EventT] | None = None,
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Transform a stream of Pydantic AI events into protocol-specific events.
This method dispatches to specific hooks and `handle_*` methods that subclasses can override: - [`before_stream()`](#pydantic_ai.ui.UIEventStream.before_stream) - [`after_stream()`](#pydantic_ai.ui.UIEventStream.after_stream) - [`on_error()`](#pydantic_ai.ui.UIEventStream.on_error) - [`before_request()`](#pydantic_ai.ui.UIEventStream.before_request) - [`after_request()`](#pydantic_ai.ui.UIEventStream.after_request) - [`before_response()`](#pydantic_ai.ui.UIEventStream.before_response) - [`after_response()`](#pydantic_ai.ui.UIEventStream.after_response) - [`handle_event()`](#pydantic_ai.ui.UIEventStream.handle_event)
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`stream` | `AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[NativeEvent[](#pydantic_ai.ui.NativeEvent "pydantic_ai.ui._event_stream.NativeEvent")]` | The stream of Pydantic AI events to transform. | _required_ 
`on_complete` | `OnCompleteFunc[](#pydantic_ai.ui.OnCompleteFunc "pydantic_ai.ui._event_stream.OnCompleteFunc")[EventT] | None` | Optional callback function called when the agent run completes successfully. The callback receives the completed [`AgentRunResult`](../../agent/#pydantic_ai.agent.AgentRunResult) and can optionally yield additional protocol-specific events. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
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
```
| ```
async deftransform_stream( # noqa: C901
 self, stream: AsyncIterator[NativeEvent], on_complete: OnCompleteFunc[EventT] | None = None
) -> AsyncIterator[EventT]:
"""Transform a stream of Pydantic AI events into protocol-specific events.
 This method dispatches to specific hooks and `handle_*` methods that subclasses can override:
 - [`before_stream()`][pydantic_ai.ui.UIEventStream.before_stream]
 - [`after_stream()`][pydantic_ai.ui.UIEventStream.after_stream]
 - [`on_error()`][pydantic_ai.ui.UIEventStream.on_error]
 - [`before_request()`][pydantic_ai.ui.UIEventStream.before_request]
 - [`after_request()`][pydantic_ai.ui.UIEventStream.after_request]
 - [`before_response()`][pydantic_ai.ui.UIEventStream.before_response]
 - [`after_response()`][pydantic_ai.ui.UIEventStream.after_response]
 - [`handle_event()`][pydantic_ai.ui.UIEventStream.handle_event]
 Args:
 stream: The stream of Pydantic AI events to transform.
 on_complete: Optional callback function called when the agent run completes successfully.
 The callback receives the completed [`AgentRunResult`][pydantic_ai.agent.AgentRunResult] and can optionally yield additional protocol-specific events.
 """
 async for e in self.before_stream():
 yield e
 try:
 async for event in stream:
 if isinstance(event, PartStartEvent):
 async for e in self._turn_to('response'):
 yield e
 elif isinstance(event, FunctionToolCallEvent):
 async for e in self._turn_to('request'):
 yield e
 elif isinstance(event, AgentRunResultEvent):
 if (
 self._final_result_event
 and (tool_call_id := self._final_result_event.tool_call_id)
 and (tool_name := self._final_result_event.tool_name)
 ):
 async for e in self._turn_to('request'):
 yield e
 self._final_result_event = None
 # Ensure the stream does not end on a dangling tool call without a result.
 output_tool_result_event = FunctionToolResultEvent(
 result=ToolReturnPart(
 tool_call_id=tool_call_id,
 tool_name=tool_name,
 content='Final result processed.',
 )
 )
 async for e in self.handle_function_tool_result(output_tool_result_event):
 yield e
 result = cast(AgentRunResult[OutputDataT], event.result)
 self._result = result
 async for e in self._turn_to(None):
 yield e
 if on_complete is not None:
 if inspect.isasyncgenfunction(on_complete):
 async for e in on_complete(result):
 yield e
 elif _utils.is_async_callable(on_complete):
 await on_complete(result)
 else:
 await _utils.run_in_executor(on_complete, result)
 elif isinstance(event, FinalResultEvent):
 self._final_result_event = event
 if isinstance(event, BuiltinToolCallEvent | BuiltinToolResultEvent): # pyright: ignore[reportDeprecated]
 # These events were deprecated before this feature was introduced
 continue
 async for e in self.handle_event(event):
 yield e
 except Exception as e:
 async for e in self.on_error(e):
 yield e
 finally:
 async for e in self._turn_to(None):
 yield e
 async for e in self.after_stream():
 yield e
```
---|--- 
#### handle_event `async`
```
handle_event(event: NativeEvent[](#pydantic_ai.ui.NativeEvent "pydantic_ai.ui._event_stream.NativeEvent")) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Transform a Pydantic AI event into one or more protocol-specific events.
This method dispatches to specific `handle_*` methods based on event type:
 * [`PartStartEvent`](../../messages/#pydantic_ai.messages.PartStartEvent) -> [`handle_part_start()`](#pydantic_ai.ui.UIEventStream.handle_part_start)
 * [`PartDeltaEvent`](../../messages/#pydantic_ai.messages.PartDeltaEvent) -> `handle_part_delta`
 * [`PartEndEvent`](../../messages/#pydantic_ai.messages.PartEndEvent) -> `handle_part_end`
 * [`FinalResultEvent`](../../messages/#pydantic_ai.messages.FinalResultEvent) -> `handle_final_result`
 * [`FunctionToolCallEvent`](../../messages/#pydantic_ai.messages.FunctionToolCallEvent) -> `handle_function_tool_call`
 * [`FunctionToolResultEvent`](../../messages/#pydantic_ai.messages.FunctionToolResultEvent) -> `handle_function_tool_result`
 * [`AgentRunResultEvent`](../../run/#pydantic_ai.run.AgentRunResultEvent) -> `handle_run_result`
Subclasses are encouraged to override the individual `handle_*` methods rather than this one. If you need specific behavior for all events, make sure you call the super method.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
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
```
| ```
async defhandle_event(self, event: NativeEvent) -> AsyncIterator[EventT]:
"""Transform a Pydantic AI event into one or more protocol-specific events.
 This method dispatches to specific `handle_*` methods based on event type:
 - [`PartStartEvent`][pydantic_ai.messages.PartStartEvent] -> [`handle_part_start()`][pydantic_ai.ui.UIEventStream.handle_part_start]
 - [`PartDeltaEvent`][pydantic_ai.messages.PartDeltaEvent] -> `handle_part_delta`
 - [`PartEndEvent`][pydantic_ai.messages.PartEndEvent] -> `handle_part_end`
 - [`FinalResultEvent`][pydantic_ai.messages.FinalResultEvent] -> `handle_final_result`
 - [`FunctionToolCallEvent`][pydantic_ai.messages.FunctionToolCallEvent] -> `handle_function_tool_call`
 - [`FunctionToolResultEvent`][pydantic_ai.messages.FunctionToolResultEvent] -> `handle_function_tool_result`
 - [`AgentRunResultEvent`][pydantic_ai.run.AgentRunResultEvent] -> `handle_run_result`
 Subclasses are encouraged to override the individual `handle_*` methods rather than this one.
 If you need specific behavior for all events, make sure you call the super method.
 """
 match event:
 case PartStartEvent():
 async for e in self.handle_part_start(event):
 yield e
 case PartDeltaEvent():
 async for e in self.handle_part_delta(event):
 yield e
 case PartEndEvent():
 async for e in self.handle_part_end(event):
 yield e
 case FinalResultEvent():
 async for e in self.handle_final_result(event):
 yield e
 case FunctionToolCallEvent():
 async for e in self.handle_function_tool_call(event):
 yield e
 case FunctionToolResultEvent():
 async for e in self.handle_function_tool_result(event):
 yield e
 case AgentRunResultEvent():
 async for e in self.handle_run_result(event):
 yield e
 case_:
 pass
```
---|--- 
#### handle_part_start `async`
```
handle_part_start(
 event: PartStartEvent[](../../messages/#pydantic_ai.messages.PartStartEvent "pydantic_ai.messages.PartStartEvent"),
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle a `PartStartEvent`.
This method dispatches to specific `handle_*` methods based on part type:
 * [`TextPart`](../../messages/#pydantic_ai.messages.TextPart) -> [`handle_text_start()`](#pydantic_ai.ui.UIEventStream.handle_text_start)
 * [`ThinkingPart`](../../messages/#pydantic_ai.messages.ThinkingPart) -> [`handle_thinking_start()`](#pydantic_ai.ui.UIEventStream.handle_thinking_start)
 * [`ToolCallPart`](../../messages/#pydantic_ai.messages.ToolCallPart) -> [`handle_tool_call_start()`](#pydantic_ai.ui.UIEventStream.handle_tool_call_start)
 * [`BuiltinToolCallPart`](../../messages/#pydantic_ai.messages.BuiltinToolCallPart) -> [`handle_builtin_tool_call_start()`](#pydantic_ai.ui.UIEventStream.handle_builtin_tool_call_start)
 * [`BuiltinToolReturnPart`](../../messages/#pydantic_ai.messages.BuiltinToolReturnPart) -> [`handle_builtin_tool_return()`](#pydantic_ai.ui.UIEventStream.handle_builtin_tool_return)
 * [`FilePart`](../../messages/#pydantic_ai.messages.FilePart) -> [`handle_file()`](#pydantic_ai.ui.UIEventStream.handle_file)
Subclasses are encouraged to override the individual `handle_*` methods rather than this one. If you need specific behavior for all part start events, make sure you call the super method.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`event` | `PartStartEvent[](../../messages/#pydantic_ai.messages.PartStartEvent "pydantic_ai.messages.PartStartEvent")` | The part start event. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
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
```
| ```
async defhandle_part_start(self, event: PartStartEvent) -> AsyncIterator[EventT]:
"""Handle a `PartStartEvent`.
 This method dispatches to specific `handle_*` methods based on part type:
 - [`TextPart`][pydantic_ai.messages.TextPart] -> [`handle_text_start()`][pydantic_ai.ui.UIEventStream.handle_text_start]
 - [`ThinkingPart`][pydantic_ai.messages.ThinkingPart] -> [`handle_thinking_start()`][pydantic_ai.ui.UIEventStream.handle_thinking_start]
 - [`ToolCallPart`][pydantic_ai.messages.ToolCallPart] -> [`handle_tool_call_start()`][pydantic_ai.ui.UIEventStream.handle_tool_call_start]
 - [`BuiltinToolCallPart`][pydantic_ai.messages.BuiltinToolCallPart] -> [`handle_builtin_tool_call_start()`][pydantic_ai.ui.UIEventStream.handle_builtin_tool_call_start]
 - [`BuiltinToolReturnPart`][pydantic_ai.messages.BuiltinToolReturnPart] -> [`handle_builtin_tool_return()`][pydantic_ai.ui.UIEventStream.handle_builtin_tool_return]
 - [`FilePart`][pydantic_ai.messages.FilePart] -> [`handle_file()`][pydantic_ai.ui.UIEventStream.handle_file]
 Subclasses are encouraged to override the individual `handle_*` methods rather than this one.
 If you need specific behavior for all part start events, make sure you call the super method.
 Args:
 event: The part start event.
 """
 part = event.part
 previous_part_kind = event.previous_part_kind
 match part:
 case TextPart():
 async for e in self.handle_text_start(part, follows_text=previous_part_kind == 'text'):
 yield e
 case ThinkingPart():
 async for e in self.handle_thinking_start(part, follows_thinking=previous_part_kind == 'thinking'):
 yield e
 case ToolCallPart():
 async for e in self.handle_tool_call_start(part):
 yield e
 case BuiltinToolCallPart():
 async for e in self.handle_builtin_tool_call_start(part):
 yield e
 case BuiltinToolReturnPart():
 async for e in self.handle_builtin_tool_return(part):
 yield e
 case FilePart(): # pragma: no branch
 async for e in self.handle_file(part):
 yield e
```
---|--- 
#### handle_part_delta `async`
```
handle_part_delta(
 event: PartDeltaEvent[](../../messages/#pydantic_ai.messages.PartDeltaEvent "pydantic_ai.messages.PartDeltaEvent"),
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle a PartDeltaEvent.
This method dispatches to specific `handle_*_delta` methods based on part delta type:
 * [`TextPartDelta`](../../messages/#pydantic_ai.messages.TextPartDelta) -> [`handle_text_delta()`](#pydantic_ai.ui.UIEventStream.handle_text_delta)
 * [`ThinkingPartDelta`](../../messages/#pydantic_ai.messages.ThinkingPartDelta) -> [`handle_thinking_delta()`](#pydantic_ai.ui.UIEventStream.handle_thinking_delta)
 * [`ToolCallPartDelta`](../../messages/#pydantic_ai.messages.ToolCallPartDelta) -> [`handle_tool_call_delta()`](#pydantic_ai.ui.UIEventStream.handle_tool_call_delta)
Subclasses are encouraged to override the individual `handle_*_delta` methods rather than this one. If you need specific behavior for all part delta events, make sure you call the super method.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`event` | `PartDeltaEvent[](../../messages/#pydantic_ai.messages.PartDeltaEvent "pydantic_ai.messages.PartDeltaEvent")` | The PartDeltaEvent. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
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
```
| ```
async defhandle_part_delta(self, event: PartDeltaEvent) -> AsyncIterator[EventT]:
"""Handle a PartDeltaEvent.
 This method dispatches to specific `handle_*_delta` methods based on part delta type:
 - [`TextPartDelta`][pydantic_ai.messages.TextPartDelta] -> [`handle_text_delta()`][pydantic_ai.ui.UIEventStream.handle_text_delta]
 - [`ThinkingPartDelta`][pydantic_ai.messages.ThinkingPartDelta] -> [`handle_thinking_delta()`][pydantic_ai.ui.UIEventStream.handle_thinking_delta]
 - [`ToolCallPartDelta`][pydantic_ai.messages.ToolCallPartDelta] -> [`handle_tool_call_delta()`][pydantic_ai.ui.UIEventStream.handle_tool_call_delta]
 Subclasses are encouraged to override the individual `handle_*_delta` methods rather than this one.
 If you need specific behavior for all part delta events, make sure you call the super method.
 Args:
 event: The PartDeltaEvent.
 """
 delta = event.delta
 match delta:
 case TextPartDelta():
 async for e in self.handle_text_delta(delta):
 yield e
 case ThinkingPartDelta():
 async for e in self.handle_thinking_delta(delta):
 yield e
 case ToolCallPartDelta(): # pragma: no branch
 async for e in self.handle_tool_call_delta(delta):
 yield e
```
---|--- 
#### handle_part_end `async`
```
handle_part_end(
 event: PartEndEvent[](../../messages/#pydantic_ai.messages.PartEndEvent "pydantic_ai.messages.PartEndEvent"),
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle a `PartEndEvent`.
This method dispatches to specific `handle_*_end` methods based on part type:
 * [`TextPart`](../../messages/#pydantic_ai.messages.TextPart) -> [`handle_text_end()`](#pydantic_ai.ui.UIEventStream.handle_text_end)
 * [`ThinkingPart`](../../messages/#pydantic_ai.messages.ThinkingPart) -> [`handle_thinking_end()`](#pydantic_ai.ui.UIEventStream.handle_thinking_end)
 * [`ToolCallPart`](../../messages/#pydantic_ai.messages.ToolCallPart) -> [`handle_tool_call_end()`](#pydantic_ai.ui.UIEventStream.handle_tool_call_end)
 * [`BuiltinToolCallPart`](../../messages/#pydantic_ai.messages.BuiltinToolCallPart) -> [`handle_builtin_tool_call_end()`](#pydantic_ai.ui.UIEventStream.handle_builtin_tool_call_end)
Subclasses are encouraged to override the individual `handle_*_end` methods rather than this one. If you need specific behavior for all part end events, make sure you call the super method.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`event` | `PartEndEvent[](../../messages/#pydantic_ai.messages.PartEndEvent "pydantic_ai.messages.PartEndEvent")` | The part end event. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
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
```
| ```
async defhandle_part_end(self, event: PartEndEvent) -> AsyncIterator[EventT]:
"""Handle a `PartEndEvent`.
 This method dispatches to specific `handle_*_end` methods based on part type:
 - [`TextPart`][pydantic_ai.messages.TextPart] -> [`handle_text_end()`][pydantic_ai.ui.UIEventStream.handle_text_end]
 - [`ThinkingPart`][pydantic_ai.messages.ThinkingPart] -> [`handle_thinking_end()`][pydantic_ai.ui.UIEventStream.handle_thinking_end]
 - [`ToolCallPart`][pydantic_ai.messages.ToolCallPart] -> [`handle_tool_call_end()`][pydantic_ai.ui.UIEventStream.handle_tool_call_end]
 - [`BuiltinToolCallPart`][pydantic_ai.messages.BuiltinToolCallPart] -> [`handle_builtin_tool_call_end()`][pydantic_ai.ui.UIEventStream.handle_builtin_tool_call_end]
 Subclasses are encouraged to override the individual `handle_*_end` methods rather than this one.
 If you need specific behavior for all part end events, make sure you call the super method.
 Args:
 event: The part end event.
 """
 part = event.part
 next_part_kind = event.next_part_kind
 match part:
 case TextPart():
 async for e in self.handle_text_end(part, followed_by_text=next_part_kind == 'text'):
 yield e
 case ThinkingPart():
 async for e in self.handle_thinking_end(part, followed_by_thinking=next_part_kind == 'thinking'):
 yield e
 case ToolCallPart():
 async for e in self.handle_tool_call_end(part):
 yield e
 case BuiltinToolCallPart():
 async for e in self.handle_builtin_tool_call_end(part):
 yield e
 case BuiltinToolReturnPart() | FilePart(): # pragma: no cover
 # These don't have deltas, so they don't need to be ended.
 pass
```
---|--- 
#### before_stream `async`
```
before_stream() -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Yield events before agent streaming starts.
This hook is called before any agent events are processed. Override this to inject custom events at the start of the stream.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
375
376
377
378
379
380
381
382
```
| ```
async defbefore_stream(self) -> AsyncIterator[EventT]:
"""Yield events before agent streaming starts.
 This hook is called before any agent events are processed.
 Override this to inject custom events at the start of the stream.
 """
 return # pragma: no cover
 yield # Make this an async generator
```
---|--- 
#### after_stream `async`
```
after_stream() -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Yield events after agent streaming completes.
This hook is called after all agent events have been processed. Override this to inject custom events at the end of the stream.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
384
385
386
387
388
389
390
391
```
| ```
async defafter_stream(self) -> AsyncIterator[EventT]:
"""Yield events after agent streaming completes.
 This hook is called after all agent events have been processed.
 Override this to inject custom events at the end of the stream.
 """
 return # pragma: no cover
 yield # Make this an async generator
```
---|--- 
#### on_error `async`
```
on_error(error: Exception[](https://docs.python.org/3/library/exceptions.html#Exception)) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle errors that occur during streaming.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`error` | `Exception[](https://docs.python.org/3/library/exceptions.html#Exception)` | The error that occurred during streaming. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
393
394
395
396
397
398
399
400
```
| ```
async defon_error(self, error: Exception) -> AsyncIterator[EventT]:
"""Handle errors that occur during streaming.
 Args:
 error: The error that occurred during streaming.
 """
 return # pragma: no cover
 yield # Make this an async generator
```
---|--- 
#### before_request `async`
```
before_request() -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Yield events before a model request is processed.
Override this to inject custom events at the start of the request.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
402
403
404
405
406
407
408
```
| ```
async defbefore_request(self) -> AsyncIterator[EventT]:
"""Yield events before a model request is processed.
 Override this to inject custom events at the start of the request.
 """
 return
 yield # Make this an async generator
```
---|--- 
#### after_request `async`
```
after_request() -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Yield events after a model request is processed.
Override this to inject custom events at the end of the request.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
410
411
412
413
414
415
416
```
| ```
async defafter_request(self) -> AsyncIterator[EventT]:
"""Yield events after a model request is processed.
 Override this to inject custom events at the end of the request.
 """
 return
 yield # Make this an async generator
```
---|--- 
#### before_response `async`
```
before_response() -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Yield events before a model response is processed.
Override this to inject custom events at the start of the response.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
418
419
420
421
422
423
424
```
| ```
async defbefore_response(self) -> AsyncIterator[EventT]:
"""Yield events before a model response is processed.
 Override this to inject custom events at the start of the response.
 """
 return
 yield # Make this an async generator
```
---|--- 
#### after_response `async`
```
after_response() -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Yield events after a model response is processed.
Override this to inject custom events at the end of the response.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
426
427
428
429
430
431
432
```
| ```
async defafter_response(self) -> AsyncIterator[EventT]:
"""Yield events after a model response is processed.
 Override this to inject custom events at the end of the response.
 """
 return
 yield # Make this an async generator
```
---|--- 
#### handle_text_start `async`
```
handle_text_start(
 part: TextPart[](../../messages/#pydantic_ai.messages.TextPart "pydantic_ai.messages.TextPart"), follows_text: bool[](https://docs.python.org/3/library/functions.html#bool) = False
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle the start of a `TextPart`.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`part` | `TextPart[](../../messages/#pydantic_ai.messages.TextPart "pydantic_ai.messages.TextPart")` | The text part. | _required_ 
`follows_text` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether the part is directly preceded by another text part. In this case, you may want to yield a "text-delta" event instead of a "text-start" event. | `False` 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
434
435
436
437
438
439
440
441
442
```
| ```
async defhandle_text_start(self, part: TextPart, follows_text: bool = False) -> AsyncIterator[EventT]:
"""Handle the start of a `TextPart`.
 Args:
 part: The text part.
 follows_text: Whether the part is directly preceded by another text part. In this case, you may want to yield a "text-delta" event instead of a "text-start" event.
 """
 return # pragma: no cover
 yield # Make this an async generator
```
---|--- 
#### handle_text_delta `async`
```
handle_text_delta(
 delta: TextPartDelta[](../../messages/#pydantic_ai.messages.TextPartDelta "pydantic_ai.messages.TextPartDelta"),
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle a `TextPartDelta`.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`delta` | `TextPartDelta[](../../messages/#pydantic_ai.messages.TextPartDelta "pydantic_ai.messages.TextPartDelta")` | The text part delta. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
444
445
446
447
448
449
450
451
```
| ```
async defhandle_text_delta(self, delta: TextPartDelta) -> AsyncIterator[EventT]:
"""Handle a `TextPartDelta`.
 Args:
 delta: The text part delta.
 """
 return # pragma: no cover
 yield # Make this an async generator
```
---|--- 
#### handle_text_end `async`
```
handle_text_end(
 part: TextPart[](../../messages/#pydantic_ai.messages.TextPart "pydantic_ai.messages.TextPart"), followed_by_text: bool[](https://docs.python.org/3/library/functions.html#bool) = False
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle the end of a `TextPart`.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`part` | `TextPart[](../../messages/#pydantic_ai.messages.TextPart "pydantic_ai.messages.TextPart")` | The text part. | _required_ 
`followed_by_text` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether the part is directly followed by another text part. In this case, you may not want to yield a "text-end" event yet. | `False` 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
453
454
455
456
457
458
459
460
461
```
| ```
async defhandle_text_end(self, part: TextPart, followed_by_text: bool = False) -> AsyncIterator[EventT]:
"""Handle the end of a `TextPart`.
 Args:
 part: The text part.
 followed_by_text: Whether the part is directly followed by another text part. In this case, you may not want to yield a "text-end" event yet.
 """
 return # pragma: no cover
 yield # Make this an async generator
```
---|--- 
#### handle_thinking_start `async`
```
handle_thinking_start(
 part: ThinkingPart[](../../messages/#pydantic_ai.messages.ThinkingPart "pydantic_ai.messages.ThinkingPart"), follows_thinking: bool[](https://docs.python.org/3/library/functions.html#bool) = False
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle the start of a `ThinkingPart`.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`part` | `ThinkingPart[](../../messages/#pydantic_ai.messages.ThinkingPart "pydantic_ai.messages.ThinkingPart")` | The thinking part. | _required_ 
`follows_thinking` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether the part is directly preceded by another thinking part. In this case, you may want to yield a "thinking-delta" event instead of a "thinking-start" event. | `False` 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
463
464
465
466
467
468
469
470
471
```
| ```
async defhandle_thinking_start(self, part: ThinkingPart, follows_thinking: bool = False) -> AsyncIterator[EventT]:
"""Handle the start of a `ThinkingPart`.
 Args:
 part: The thinking part.
 follows_thinking: Whether the part is directly preceded by another thinking part. In this case, you may want to yield a "thinking-delta" event instead of a "thinking-start" event.
 """
 return # pragma: no cover
 yield # Make this an async generator
```
---|--- 
#### handle_thinking_delta `async`
```
handle_thinking_delta(
 delta: ThinkingPartDelta[](../../messages/#pydantic_ai.messages.ThinkingPartDelta "pydantic_ai.messages.ThinkingPartDelta"),
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle a `ThinkingPartDelta`.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`delta` | `ThinkingPartDelta[](../../messages/#pydantic_ai.messages.ThinkingPartDelta "pydantic_ai.messages.ThinkingPartDelta")` | The thinking part delta. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
473
474
475
476
477
478
479
480
```
| ```
async defhandle_thinking_delta(self, delta: ThinkingPartDelta) -> AsyncIterator[EventT]:
"""Handle a `ThinkingPartDelta`.
 Args:
 delta: The thinking part delta.
 """
 return # pragma: no cover
 yield # Make this an async generator
```
---|--- 
#### handle_thinking_end `async`
```
handle_thinking_end(
 part: ThinkingPart[](../../messages/#pydantic_ai.messages.ThinkingPart "pydantic_ai.messages.ThinkingPart"), followed_by_thinking: bool[](https://docs.python.org/3/library/functions.html#bool) = False
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle the end of a `ThinkingPart`.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`part` | `ThinkingPart[](../../messages/#pydantic_ai.messages.ThinkingPart "pydantic_ai.messages.ThinkingPart")` | The thinking part. | _required_ 
`followed_by_thinking` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether the part is directly followed by another thinking part. In this case, you may not want to yield a "thinking-end" event yet. | `False` 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
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
```
| ```
async defhandle_thinking_end(
 self, part: ThinkingPart, followed_by_thinking: bool = False
) -> AsyncIterator[EventT]:
"""Handle the end of a `ThinkingPart`.
 Args:
 part: The thinking part.
 followed_by_thinking: Whether the part is directly followed by another thinking part. In this case, you may not want to yield a "thinking-end" event yet.
 """
 return # pragma: no cover
 yield # Make this an async generator
```
---|--- 
#### handle_tool_call_start `async`
```
handle_tool_call_start(
 part: ToolCallPart[](../../messages/#pydantic_ai.messages.ToolCallPart "pydantic_ai.messages.ToolCallPart"),
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle the start of a `ToolCallPart`.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`part` | `ToolCallPart[](../../messages/#pydantic_ai.messages.ToolCallPart "pydantic_ai.messages.ToolCallPart")` | The tool call part. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
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
async defhandle_tool_call_start(self, part: ToolCallPart) -> AsyncIterator[EventT]:
"""Handle the start of a `ToolCallPart`.
 Args:
 part: The tool call part.
 """
 return # pragma: no cover
 yield # Make this an async generator
```
---|--- 
#### handle_tool_call_delta `async`
```
handle_tool_call_delta(
 delta: ToolCallPartDelta[](../../messages/#pydantic_ai.messages.ToolCallPartDelta "pydantic_ai.messages.ToolCallPartDelta"),
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle a `ToolCallPartDelta`.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`delta` | `ToolCallPartDelta[](../../messages/#pydantic_ai.messages.ToolCallPartDelta "pydantic_ai.messages.ToolCallPartDelta")` | The tool call part delta. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
503
504
505
506
507
508
509
510
```
| ```
async defhandle_tool_call_delta(self, delta: ToolCallPartDelta) -> AsyncIterator[EventT]:
"""Handle a `ToolCallPartDelta`.
 Args:
 delta: The tool call part delta.
 """
 return # pragma: no cover
 yield # Make this an async generator
```
---|--- 
#### handle_tool_call_end `async`
```
handle_tool_call_end(
 part: ToolCallPart[](../../messages/#pydantic_ai.messages.ToolCallPart "pydantic_ai.messages.ToolCallPart"),
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle the end of a `ToolCallPart`.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`part` | `ToolCallPart[](../../messages/#pydantic_ai.messages.ToolCallPart "pydantic_ai.messages.ToolCallPart")` | The tool call part. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
512
513
514
515
516
517
518
519
```
| ```
async defhandle_tool_call_end(self, part: ToolCallPart) -> AsyncIterator[EventT]:
"""Handle the end of a `ToolCallPart`.
 Args:
 part: The tool call part.
 """
 return # pragma: no cover
 yield # Make this an async generator
```
---|--- 
#### handle_builtin_tool_call_start `async`
```
handle_builtin_tool_call_start(
 part: BuiltinToolCallPart[](../../messages/#pydantic_ai.messages.BuiltinToolCallPart "pydantic_ai.messages.BuiltinToolCallPart"),
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle a `BuiltinToolCallPart` at start.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`part` | `BuiltinToolCallPart[](../../messages/#pydantic_ai.messages.BuiltinToolCallPart "pydantic_ai.messages.BuiltinToolCallPart")` | The builtin tool call part. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
521
522
523
524
525
526
527
528
```
| ```
async defhandle_builtin_tool_call_start(self, part: BuiltinToolCallPart) -> AsyncIterator[EventT]:
"""Handle a `BuiltinToolCallPart` at start.
 Args:
 part: The builtin tool call part.
 """
 return # pragma: no cover
 yield # Make this an async generator
```
---|--- 
#### handle_builtin_tool_call_end `async`
```
handle_builtin_tool_call_end(
 part: BuiltinToolCallPart[](../../messages/#pydantic_ai.messages.BuiltinToolCallPart "pydantic_ai.messages.BuiltinToolCallPart"),
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle the end of a `BuiltinToolCallPart`.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`part` | `BuiltinToolCallPart[](../../messages/#pydantic_ai.messages.BuiltinToolCallPart "pydantic_ai.messages.BuiltinToolCallPart")` | The builtin tool call part. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
530
531
532
533
534
535
536
537
```
| ```
async defhandle_builtin_tool_call_end(self, part: BuiltinToolCallPart) -> AsyncIterator[EventT]:
"""Handle the end of a `BuiltinToolCallPart`.
 Args:
 part: The builtin tool call part.
 """
 return # pragma: no cover
 yield # Make this an async generator
```
---|--- 
#### handle_builtin_tool_return `async`
```
handle_builtin_tool_return(
 part: BuiltinToolReturnPart[](../../messages/#pydantic_ai.messages.BuiltinToolReturnPart "pydantic_ai.messages.BuiltinToolReturnPart"),
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle a `BuiltinToolReturnPart`.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`part` | `BuiltinToolReturnPart[](../../messages/#pydantic_ai.messages.BuiltinToolReturnPart "pydantic_ai.messages.BuiltinToolReturnPart")` | The builtin tool return part. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
539
540
541
542
543
544
545
546
```
| ```
async defhandle_builtin_tool_return(self, part: BuiltinToolReturnPart) -> AsyncIterator[EventT]:
"""Handle a `BuiltinToolReturnPart`.
 Args:
 part: The builtin tool return part.
 """
 return # pragma: no cover
 yield # Make this an async generator
```
---|--- 
#### handle_file `async`
```
handle_file(part: FilePart[](../../messages/#pydantic_ai.messages.FilePart "pydantic_ai.messages.FilePart")) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle a `FilePart`.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`part` | `FilePart[](../../messages/#pydantic_ai.messages.FilePart "pydantic_ai.messages.FilePart")` | The file part. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
548
549
550
551
552
553
554
555
```
| ```
async defhandle_file(self, part: FilePart) -> AsyncIterator[EventT]:
"""Handle a `FilePart`.
 Args:
 part: The file part.
 """
 return # pragma: no cover
 yield # Make this an async generator
```
---|--- 
#### handle_final_result `async`
```
handle_final_result(
 event: FinalResultEvent[](../../messages/#pydantic_ai.messages.FinalResultEvent "pydantic_ai.messages.FinalResultEvent"),
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle a `FinalResultEvent`.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`event` | `FinalResultEvent[](../../messages/#pydantic_ai.messages.FinalResultEvent "pydantic_ai.messages.FinalResultEvent")` | The final result event. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
557
558
559
560
561
562
563
564
```
| ```
async defhandle_final_result(self, event: FinalResultEvent) -> AsyncIterator[EventT]:
"""Handle a `FinalResultEvent`.
 Args:
 event: The final result event.
 """
 return
 yield # Make this an async generator
```
---|--- 
#### handle_function_tool_call `async`
```
handle_function_tool_call(
 event: FunctionToolCallEvent[](../../messages/#pydantic_ai.messages.FunctionToolCallEvent "pydantic_ai.messages.FunctionToolCallEvent"),
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle a `FunctionToolCallEvent`.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`event` | `FunctionToolCallEvent[](../../messages/#pydantic_ai.messages.FunctionToolCallEvent "pydantic_ai.messages.FunctionToolCallEvent")` | The function tool call event. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
566
567
568
569
570
571
572
573
```
| ```
async defhandle_function_tool_call(self, event: FunctionToolCallEvent) -> AsyncIterator[EventT]:
"""Handle a `FunctionToolCallEvent`.
 Args:
 event: The function tool call event.
 """
 return
 yield # Make this an async generator
```
---|--- 
#### handle_function_tool_result `async`
```
handle_function_tool_result(
 event: FunctionToolResultEvent[](../../messages/#pydantic_ai.messages.FunctionToolResultEvent "pydantic_ai.messages.FunctionToolResultEvent"),
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle a `FunctionToolResultEvent`.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`event` | `FunctionToolResultEvent[](../../messages/#pydantic_ai.messages.FunctionToolResultEvent "pydantic_ai.messages.FunctionToolResultEvent")` | The function tool result event. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
575
576
577
578
579
580
581
582
```
| ```
async defhandle_function_tool_result(self, event: FunctionToolResultEvent) -> AsyncIterator[EventT]:
"""Handle a `FunctionToolResultEvent`.
 Args:
 event: The function tool result event.
 """
 return # pragma: no cover
 yield # Make this an async generator
```
---|--- 
#### handle_run_result `async`
```
handle_run_result(
 event: AgentRunResultEvent[](../../run/#pydantic_ai.run.AgentRunResultEvent "pydantic_ai.run.AgentRunResultEvent"),
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]
```
Handle an `AgentRunResultEvent`.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`event` | `AgentRunResultEvent[](../../run/#pydantic_ai.run.AgentRunResultEvent "pydantic_ai.run.AgentRunResultEvent")` | The agent run result event. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/ui/_event_stream.py`
```
584
585
586
587
588
589
590
591
```
| ```
async defhandle_run_result(self, event: AgentRunResultEvent) -> AsyncIterator[EventT]:
"""Handle an `AgentRunResultEvent`.
 Args:
 event: The agent run result event.
 """
 return
 yield # Make this an async generator
```
---|--- 
### MessagesBuilder `dataclass`
Helper class to build Pydantic AI messages from request/response parts.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_messages_builder.py`
```
 8
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
```
| ```
@dataclass
classMessagesBuilder:
"""Helper class to build Pydantic AI messages from request/response parts."""
 messages: list[ModelMessage] = field(default_factory=list)
 defadd(self, part: ModelRequestPart | ModelResponsePart) -> None:
"""Add a new part, creating a new request or response message if necessary."""
 last_message = self.messages[-1] if self.messages else None
 if isinstance(part, get_union_args(ModelRequestPart)):
 part = cast(ModelRequestPart, part)
 if isinstance(last_message, ModelRequest):
 last_message.parts = [*last_message.parts, part]
 else:
 self.messages.append(ModelRequest(parts=[part]))
 else:
 part = cast(ModelResponsePart, part)
 if isinstance(last_message, ModelResponse):
 last_message.parts = [*last_message.parts, part]
 else:
 self.messages.append(ModelResponse(parts=[part]))
```
---|--- 
#### add
```
add(part: ModelRequestPart[](../../messages/#pydantic_ai.messages.ModelRequestPart "pydantic_ai.messages.ModelRequestPart") | ModelResponsePart[](../../messages/#pydantic_ai.messages.ModelResponsePart "pydantic_ai.messages.ModelResponsePart")) -> None
```
Add a new part, creating a new request or response message if necessary.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_messages_builder.py`
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
```
| ```
defadd(self, part: ModelRequestPart | ModelResponsePart) -> None:
"""Add a new part, creating a new request or response message if necessary."""
 last_message = self.messages[-1] if self.messages else None
 if isinstance(part, get_union_args(ModelRequestPart)):
 part = cast(ModelRequestPart, part)
 if isinstance(last_message, ModelRequest):
 last_message.parts = [*last_message.parts, part]
 else:
 self.messages.append(ModelRequest(parts=[part]))
 else:
 part = cast(ModelResponsePart, part)
 if isinstance(last_message, ModelResponse):
 last_message.parts = [*last_message.parts, part]
 else:
 self.messages.append(ModelResponse(parts=[part]))
```
---|---