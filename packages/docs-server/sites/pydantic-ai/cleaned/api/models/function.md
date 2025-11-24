[ Skip to content ](#pydantic_aimodelsfunction)
# `pydantic_ai.models.function`
A model controlled by a local function.
[`FunctionModel`](#pydantic_ai.models.function.FunctionModel) is similar to [`TestModel`](../test/), but allows greater control over the model's behavior.
Its primary use case is for more advanced unit testing than is possible with `TestModel`.
Here's a minimal example:
function_model_usage.py```
frompydantic_aiimport Agent
frompydantic_aiimport ModelMessage, ModelResponse, TextPart
frompydantic_ai.models.functionimport FunctionModel, AgentInfo
my_agent = Agent('openai:gpt-5')
async defmodel_function(
 messages: list[ModelMessage], info: AgentInfo
) -> ModelResponse:
 print(messages)
"""
 [
 ModelRequest(
 parts=[
 UserPromptPart(
 content='Testing my agent...',
 timestamp=datetime.datetime(...),
 )
 ]
 )
 ]
 """
 print(info)
"""
 AgentInfo(
 function_tools=[], allow_text_output=True, output_tools=[], model_settings=None
 )
 """
 return ModelResponse(parts=[TextPart('hello world')])
async deftest_my_agent():
"""Unit test for my_agent, to be run by pytest."""
 with my_agent.override(model=FunctionModel(model_function)):
 result = await my_agent.run('Testing my agent...')
 assert result.output == 'hello world'
```
See [Unit testing with `FunctionModel`](../../../testing/#unit-testing-with-functionmodel) for detailed documentation.
### FunctionModel `dataclass`
Bases: `Model[](../base/#pydantic_ai.models.Model "pydantic_ai.models.Model")`
A model controlled by a local function.
Apart from `__init__`, all methods are private or match those of the base class.
Source code in `pydantic_ai_slim/pydantic_ai/models/function.py`
```
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
```
| ```
@dataclass(init=False)
classFunctionModel(Model):
"""A model controlled by a local function.
 Apart from `__init__`, all methods are private or match those of the base class.
 """
 function: FunctionDef | None
 stream_function: StreamFunctionDef | None
 _model_name: str = field(repr=False)
 _system: str = field(default='function', repr=False)
 @overload
 def__init__(
 self,
 function: FunctionDef,
 *,
 model_name: str | None = None,
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings | None = None,
 ) -> None: ...
 @overload
 def__init__(
 self,
 *,
 stream_function: StreamFunctionDef,
 model_name: str | None = None,
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings | None = None,
 ) -> None: ...
 @overload
 def__init__(
 self,
 function: FunctionDef,
 *,
 stream_function: StreamFunctionDef,
 model_name: str | None = None,
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings | None = None,
 ) -> None: ...
 def__init__(
 self,
 function: FunctionDef | None = None,
 *,
 stream_function: StreamFunctionDef | None = None,
 model_name: str | None = None,
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings | None = None,
 ):
"""Initialize a `FunctionModel`.
 Either `function` or `stream_function` must be provided, providing both is allowed.
 Args:
 function: The function to call for non-streamed requests.
 stream_function: The function to call for streamed requests.
 model_name: The name of the model. If not provided, a name is generated from the function names.
 profile: The model profile to use.
 settings: Model-specific settings that will be used as defaults for this model.
 """
 if function is None and stream_function is None:
 raise TypeError('Either `function` or `stream_function` must be provided')
 self.function = function
 self.stream_function = stream_function
 function_name = self.function.__name__ if self.function is not None else ''
 stream_function_name = self.stream_function.__name__ if self.stream_function is not None else ''
 self._model_name = model_name or f'function:{function_name}:{stream_function_name}'
 # Use a default profile that supports JSON schema and object output if none provided
 if profile is None:
 profile = ModelProfile(
 supports_json_schema_output=True,
 supports_json_object_output=True,
 )
 super().__init__(settings=settings, profile=profile)
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
 agent_info = AgentInfo(
 function_tools=model_request_parameters.function_tools,
 allow_text_output=model_request_parameters.allow_text_output,
 output_tools=model_request_parameters.output_tools,
 model_settings=model_settings,
 )
 assert self.function is not None, 'FunctionModel must receive a `function` to support non-streamed requests'
 if inspect.iscoroutinefunction(self.function):
 response = await self.function(messages, agent_info)
 else:
 response_ = await _utils.run_in_executor(self.function, messages, agent_info)
 assert isinstance(response_, ModelResponse), response_
 response = response_
 response.model_name = self._model_name
 # Add usage data if not already present
 if not response.usage.has_values(): # pragma: no branch
 response.usage = _estimate_usage(chain(messages, [response]))
 return response
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
 agent_info = AgentInfo(
 function_tools=model_request_parameters.function_tools,
 allow_text_output=model_request_parameters.allow_text_output,
 output_tools=model_request_parameters.output_tools,
 model_settings=model_settings,
 )
 assert self.stream_function is not None, (
 'FunctionModel must receive a `stream_function` to support streamed requests'
 )
 response_stream = PeekableAsyncStream(self.stream_function(messages, agent_info))
 first = await response_stream.peek()
 if isinstance(first, _utils.Unset):
 raise ValueError('Stream function must return at least one item')
 yield FunctionStreamedResponse(
 model_request_parameters=model_request_parameters,
 _model_name=self._model_name,
 _iter=response_stream,
 )
 @property
 defmodel_name(self) -> str:
"""The model name."""
 return self._model_name
 @property
 defsystem(self) -> str:
"""The system / model provider."""
 return self._system
```
---|--- 
#### __init__
```
__init__(
 function: FunctionDef[](#pydantic_ai.models.function.FunctionDef "pydantic_ai.models.function.FunctionDef"),
 *,
 model_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None
) -> None
```
```
__init__(
 *,
 stream_function: StreamFunctionDef[](#pydantic_ai.models.function.StreamFunctionDef "pydantic_ai.models.function.StreamFunctionDef"),
 model_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None
) -> None
```
```
__init__(
 function: FunctionDef[](#pydantic_ai.models.function.FunctionDef "pydantic_ai.models.function.FunctionDef"),
 *,
 stream_function: StreamFunctionDef[](#pydantic_ai.models.function.StreamFunctionDef "pydantic_ai.models.function.StreamFunctionDef"),
 model_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None
) -> None
```
```
__init__(
 function: FunctionDef[](#pydantic_ai.models.function.FunctionDef "pydantic_ai.models.function.FunctionDef") | None = None,
 *,
 stream_function: StreamFunctionDef[](#pydantic_ai.models.function.StreamFunctionDef "pydantic_ai.models.function.StreamFunctionDef") | None = None,
 model_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None
)
```
Initialize a `FunctionModel`.
Either `function` or `stream_function` must be provided, providing both is allowed.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`function` | `FunctionDef[](#pydantic_ai.models.function.FunctionDef "pydantic_ai.models.function.FunctionDef") | None` | The function to call for non-streamed requests. | `None` 
`stream_function` | `StreamFunctionDef[](#pydantic_ai.models.function.StreamFunctionDef "pydantic_ai.models.function.StreamFunctionDef") | None` | The function to call for streamed requests. | `None` 
`model_name` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | The name of the model. If not provided, a name is generated from the function names. | `None` 
`profile` | `ModelProfileSpec | None` | The model profile to use. | `None` 
`settings` | `ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Model-specific settings that will be used as defaults for this model. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/models/function.py`
```
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
```
| ```
def__init__(
 self,
 function: FunctionDef | None = None,
 *,
 stream_function: StreamFunctionDef | None = None,
 model_name: str | None = None,
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings | None = None,
):
"""Initialize a `FunctionModel`.
 Either `function` or `stream_function` must be provided, providing both is allowed.
 Args:
 function: The function to call for non-streamed requests.
 stream_function: The function to call for streamed requests.
 model_name: The name of the model. If not provided, a name is generated from the function names.
 profile: The model profile to use.
 settings: Model-specific settings that will be used as defaults for this model.
 """
 if function is None and stream_function is None:
 raise TypeError('Either `function` or `stream_function` must be provided')
 self.function = function
 self.stream_function = stream_function
 function_name = self.function.__name__ if self.function is not None else ''
 stream_function_name = self.stream_function.__name__ if self.stream_function is not None else ''
 self._model_name = model_name or f'function:{function_name}:{stream_function_name}'
 # Use a default profile that supports JSON schema and object output if none provided
 if profile is None:
 profile = ModelProfile(
 supports_json_schema_output=True,
 supports_json_object_output=True,
 )
 super().__init__(settings=settings, profile=profile)
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
The system / model provider.
### AgentInfo `dataclass`
Information about an agent.
This is passed as the second to functions used within [`FunctionModel`](#pydantic_ai.models.function.FunctionModel).
Source code in `pydantic_ai_slim/pydantic_ai/models/function.py`
```
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
```
| ```
@dataclass(frozen=True, kw_only=True)
classAgentInfo:
"""Information about an agent.
 This is passed as the second to functions used within [`FunctionModel`][pydantic_ai.models.function.FunctionModel].
 """
 function_tools: list[ToolDefinition]
"""The function tools available on this agent.
 These are the tools registered via the [`tool`][pydantic_ai.Agent.tool] and
 [`tool_plain`][pydantic_ai.Agent.tool_plain] decorators.
 """
 allow_text_output: bool
"""Whether a plain text output is allowed."""
 output_tools: list[ToolDefinition]
"""The tools that can called to produce the final output of the run."""
 model_settings: ModelSettings | None
"""The model settings passed to the run call."""
```
---|--- 
#### function_tools `instance-attribute`
```
function_tools: list[](https://docs.python.org/3/library/stdtypes.html#list)[ToolDefinition[](../../tools/#pydantic_ai.tools.ToolDefinition "pydantic_ai.tools.ToolDefinition")]
```
The function tools available on this agent.
These are the tools registered via the [`tool`](../../agent/#pydantic_ai.agent.Agent.tool) and [`tool_plain`](../../agent/#pydantic_ai.agent.Agent.tool_plain) decorators.
#### allow_text_output `instance-attribute`
```
allow_text_output: bool[](https://docs.python.org/3/library/functions.html#bool)
```
Whether a plain text output is allowed.
#### output_tools `instance-attribute`
```
output_tools: list[](https://docs.python.org/3/library/stdtypes.html#list)[ToolDefinition[](../../tools/#pydantic_ai.tools.ToolDefinition "pydantic_ai.tools.ToolDefinition")]
```
The tools that can called to produce the final output of the run.
#### model_settings `instance-attribute`
```
model_settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None
```
The model settings passed to the run call.
### DeltaToolCall `dataclass`
Incremental change to a tool call.
Used to describe a chunk when streaming structured responses.
Source code in `pydantic_ai_slim/pydantic_ai/models/function.py`
```
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
```
| ```
@dataclass
classDeltaToolCall:
"""Incremental change to a tool call.
 Used to describe a chunk when streaming structured responses.
 """
 name: str | None = None
"""Incremental change to the name of the tool."""
 json_args: str | None = None
"""Incremental change to the arguments as JSON"""
 _: KW_ONLY
 tool_call_id: str | None = None
"""Incremental change to the tool call ID."""
```
---|--- 
#### name `class-attribute` `instance-attribute`
```
name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
Incremental change to the name of the tool.
#### json_args `class-attribute` `instance-attribute`
```
json_args: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
Incremental change to the arguments as JSON
#### tool_call_id `class-attribute` `instance-attribute`
```
tool_call_id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
Incremental change to the tool call ID.
### DeltaThinkingPart `dataclass`
Incremental change to a thinking part.
Used to describe a chunk when streaming thinking responses.
Source code in `pydantic_ai_slim/pydantic_ai/models/function.py`
```
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
```
| ```
@dataclass(kw_only=True)
classDeltaThinkingPart:
"""Incremental change to a thinking part.
 Used to describe a chunk when streaming thinking responses.
 """
 content: str | None = None
"""Incremental change to the thinking content."""
 signature: str | None = None
"""Incremental change to the thinking signature."""
```
---|--- 
#### content `class-attribute` `instance-attribute`
```
content: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
Incremental change to the thinking content.
#### signature `class-attribute` `instance-attribute`
```
signature: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
Incremental change to the thinking signature.
### DeltaToolCalls `module-attribute`
```
DeltaToolCalls: TypeAlias[](https://docs.python.org/3/library/typing.html#typing.TypeAlias "typing.TypeAlias") = dict[](https://docs.python.org/3/library/stdtypes.html#dict)[int[](https://docs.python.org/3/library/functions.html#int), DeltaToolCall[](#pydantic_ai.models.function.DeltaToolCall "pydantic_ai.models.function.DeltaToolCall")]
```
A mapping of tool call IDs to incremental changes.
### DeltaThinkingCalls `module-attribute`
```
DeltaThinkingCalls: TypeAlias[](https://docs.python.org/3/library/typing.html#typing.TypeAlias "typing.TypeAlias") = dict[](https://docs.python.org/3/library/stdtypes.html#dict)[int[](https://docs.python.org/3/library/functions.html#int), DeltaThinkingPart[](#pydantic_ai.models.function.DeltaThinkingPart "pydantic_ai.models.function.DeltaThinkingPart")]
```
A mapping of thinking call IDs to incremental changes.
### FunctionDef `module-attribute`
```
FunctionDef: TypeAlias[](https://docs.python.org/3/library/typing.html#typing.TypeAlias "typing.TypeAlias") = Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[
 [list[](https://docs.python.org/3/library/stdtypes.html#list)[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")], AgentInfo[](#pydantic_ai.models.function.AgentInfo "pydantic_ai.models.function.AgentInfo")],
 ModelResponse[](../../messages/#pydantic_ai.messages.ModelResponse "pydantic_ai.messages.ModelResponse") | Awaitable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Awaitable "collections.abc.Awaitable")[ModelResponse[](../../messages/#pydantic_ai.messages.ModelResponse "pydantic_ai.messages.ModelResponse")],
]
```
A function used to generate a non-streamed response.
### StreamFunctionDef `module-attribute`
```
StreamFunctionDef: TypeAlias[](https://docs.python.org/3/library/typing.html#typing.TypeAlias "typing.TypeAlias") = Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[
 [list[](https://docs.python.org/3/library/stdtypes.html#list)[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")], AgentInfo[](#pydantic_ai.models.function.AgentInfo "pydantic_ai.models.function.AgentInfo")],
 AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[
 str[](https://docs.python.org/3/library/stdtypes.html#str)
 | DeltaToolCalls[](#pydantic_ai.models.function.DeltaToolCalls "pydantic_ai.models.function.DeltaToolCalls")
 | DeltaThinkingCalls[](#pydantic_ai.models.function.DeltaThinkingCalls "pydantic_ai.models.function.DeltaThinkingCalls")
 | BuiltinToolCallsReturns
 ],
]
```
A function used to generate a streamed response.
While this is defined as having return type of `AsyncIterator[str | DeltaToolCalls | DeltaThinkingCalls | BuiltinTools]`, it should really be considered as `AsyncIterator[str] | AsyncIterator[DeltaToolCalls] | AsyncIterator[DeltaThinkingCalls]`,
E.g. you need to yield all text, all `DeltaToolCalls`, all `DeltaThinkingCalls`, or all `BuiltinToolCallsReturns`, not mix them.
### FunctionStreamedResponse `dataclass`
Bases: `StreamedResponse[](../base/#pydantic_ai.models.StreamedResponse "pydantic_ai.models.StreamedResponse")`
Implementation of `StreamedResponse` for [FunctionModel](#pydantic_ai.models.function.FunctionModel).
Source code in `pydantic_ai_slim/pydantic_ai/models/function.py`
```
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
```
| ```
@dataclass
classFunctionStreamedResponse(StreamedResponse):
"""Implementation of `StreamedResponse` for [FunctionModel][pydantic_ai.models.function.FunctionModel]."""
 _model_name: str
 _iter: AsyncIterator[str | DeltaToolCalls | DeltaThinkingCalls | BuiltinToolCallsReturns]
 _timestamp: datetime = field(default_factory=_utils.now_utc)
 def__post_init__(self):
 self._usage += _estimate_usage([])
 async def_get_event_iterator(self) -> AsyncIterator[ModelResponseStreamEvent]:
 async for item in self._iter:
 if isinstance(item, str):
 response_tokens = _estimate_string_tokens(item)
 self._usage += usage.RequestUsage(output_tokens=response_tokens)
 maybe_event = self._parts_manager.handle_text_delta(vendor_part_id='content', content=item)
 if maybe_event is not None: # pragma: no branch
 yield maybe_event
 elif isinstance(item, dict) and item:
 for dtc_index, delta in item.items():
 if isinstance(delta, DeltaThinkingPart):
 if delta.content: # pragma: no branch
 response_tokens = _estimate_string_tokens(delta.content)
 self._usage += usage.RequestUsage(output_tokens=response_tokens)
 yield self._parts_manager.handle_thinking_delta(
 vendor_part_id=dtc_index,
 content=delta.content,
 signature=delta.signature,
 provider_name='function' if delta.signature else None,
 )
 elif isinstance(delta, DeltaToolCall):
 if delta.json_args:
 response_tokens = _estimate_string_tokens(delta.json_args)
 self._usage += usage.RequestUsage(output_tokens=response_tokens)
 maybe_event = self._parts_manager.handle_tool_call_delta(
 vendor_part_id=dtc_index,
 tool_name=delta.name,
 args=delta.json_args,
 tool_call_id=delta.tool_call_id,
 )
 if maybe_event is not None: # pragma: no branch
 yield maybe_event
 elif isinstance(delta, BuiltinToolCallPart):
 if content := delta.args_as_json_str(): # pragma: no branch
 response_tokens = _estimate_string_tokens(content)
 self._usage += usage.RequestUsage(output_tokens=response_tokens)
 yield self._parts_manager.handle_part(vendor_part_id=dtc_index, part=delta)
 elif isinstance(delta, BuiltinToolReturnPart):
 if content := delta.model_response_str(): # pragma: no branch
 response_tokens = _estimate_string_tokens(content)
 self._usage += usage.RequestUsage(output_tokens=response_tokens)
 yield self._parts_manager.handle_part(vendor_part_id=dtc_index, part=delta)
 else:
 assert_never(delta)
 @property
 defmodel_name(self) -> str:
"""Get the model name of the response."""
 return self._model_name
 @property
 defprovider_name(self) -> None:
"""Get the provider name."""
 return None
 @property
 deftimestamp(self) -> datetime:
"""Get the timestamp of the response."""
 return self._timestamp
```
---|--- 
#### model_name `property`
```
model_name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Get the model name of the response.
#### provider_name `property`
```
provider_name: None
```
Get the provider name.
#### timestamp `property`
```
timestamp: datetime[](https://docs.python.org/3/library/datetime.html#datetime.datetime "datetime.datetime")
```
Get the timestamp of the response.