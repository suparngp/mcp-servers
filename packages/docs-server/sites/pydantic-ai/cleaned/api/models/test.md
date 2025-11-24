[ Skip to content ](#pydantic_aimodelstest)
# `pydantic_ai.models.test`
Utility model for quickly testing apps built with Pydantic AI.
Here's a minimal example:
test_model_usage.py```
frompydantic_aiimport Agent
frompydantic_ai.models.testimport TestModel
my_agent = Agent('openai:gpt-5', system_prompt='...')
async deftest_my_agent():
"""Unit test for my_agent, to be run by pytest."""
 m = TestModel()
 with my_agent.override(model=m):
 result = await my_agent.run('Testing my agent...')
 assert result.output == 'success (no tool calls)'
 assert m.last_model_request_parameters.function_tools == []
```
See [Unit testing with `TestModel`](../../../testing/#unit-testing-with-testmodel) for detailed documentation.
### TestModel `dataclass`
Bases: `Model[](../base/#pydantic_ai.models.Model "pydantic_ai.models.Model")`
A model specifically for testing purposes.
This will (by default) call all tools in the agent, then return a tool response if possible, otherwise a plain response.
How useful this model is will vary significantly.
Apart from `__init__` derived by the `dataclass` decorator, all methods are private or match those of the base class.
Source code in `pydantic_ai_slim/pydantic_ai/models/test.py`
```
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
```
| ```
@dataclass(init=False)
classTestModel(Model):
"""A model specifically for testing purposes.
 This will (by default) call all tools in the agent, then return a tool response if possible,
 otherwise a plain response.
 How useful this model is will vary significantly.
 Apart from `__init__` derived by the `dataclass` decorator, all methods are private or match those
 of the base class.
 """
 # NOTE: Avoid test discovery by pytest.
 __test__ = False
 call_tools: list[str] | Literal['all'] = 'all'
"""List of tools to call. If `'all'`, all tools will be called."""
 custom_output_text: str | None = None
"""If set, this text is returned as the final output."""
 custom_output_args: Any | None = None
"""If set, these args will be passed to the output tool."""
 seed: int = 0
"""Seed for generating random data."""
 last_model_request_parameters: ModelRequestParameters | None = field(default=None, init=False)
"""The last ModelRequestParameters passed to the model in a request.
 The ModelRequestParameters contains information about the function and output tools available during request handling.
 This is set when a request is made, so will reflect the function tools from the last step of the last run.
 """
 _model_name: str = field(default='test', repr=False)
 _system: str = field(default='test', repr=False)
 def__init__(
 self,
 *,
 call_tools: list[str] | Literal['all'] = 'all',
 custom_output_text: str | None = None,
 custom_output_args: Any | None = None,
 seed: int = 0,
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings | None = None,
 ):
"""Initialize TestModel with optional settings and profile."""
 self.call_tools = call_tools
 self.custom_output_text = custom_output_text
 self.custom_output_args = custom_output_args
 self.seed = seed
 self.last_model_request_parameters = None
 self._model_name = 'test'
 self._system = 'test'
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
 self.last_model_request_parameters = model_request_parameters
 model_response = self._request(messages, model_settings, model_request_parameters)
 model_response.usage = _estimate_usage([*messages, model_response])
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
 self.last_model_request_parameters = model_request_parameters
 model_response = self._request(messages, model_settings, model_request_parameters)
 yield TestStreamedResponse(
 model_request_parameters=model_request_parameters,
 _model_name=self._model_name,
 _structured_response=model_response,
 _messages=messages,
 _provider_name=self._system,
 )
 @property
 defmodel_name(self) -> str:
"""The model name."""
 return self._model_name
 @property
 defsystem(self) -> str:
"""The model provider."""
 return self._system
 defgen_tool_args(self, tool_def: ToolDefinition) -> Any:
 return _JsonSchemaTestData(tool_def.parameters_json_schema, self.seed).generate()
 def_get_tool_calls(self, model_request_parameters: ModelRequestParameters) -> list[tuple[str, ToolDefinition]]:
 if self.call_tools == 'all':
 return [(r.name, r) for r in model_request_parameters.function_tools]
 else:
 function_tools_lookup = {t.name: t for t in model_request_parameters.function_tools}
 tools_to_call = (function_tools_lookup[name] for name in self.call_tools)
 return [(r.name, r) for r in tools_to_call]
 def_get_output(self, model_request_parameters: ModelRequestParameters) -> _WrappedTextOutput | _WrappedToolOutput:
 if self.custom_output_text is not None:
 assert model_request_parameters.output_mode != 'tool', (
 'Plain response not allowed, but `custom_output_text` is set.'
 )
 assert self.custom_output_args is None, 'Cannot set both `custom_output_text` and `custom_output_args`.'
 return _WrappedTextOutput(self.custom_output_text)
 elif self.custom_output_args is not None:
 assert model_request_parameters.output_tools is not None, (
 'No output tools provided, but `custom_output_args` is set.'
 )
 output_tool = model_request_parameters.output_tools[0]
 if k := output_tool.outer_typed_dict_key:
 return _WrappedToolOutput({k: self.custom_output_args})
 else:
 return _WrappedToolOutput(self.custom_output_args)
 elif model_request_parameters.allow_text_output:
 return _WrappedTextOutput(None)
 elif model_request_parameters.output_tools:
 return _WrappedToolOutput(None)
 else:
 return _WrappedTextOutput(None)
 def_request(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ) -> ModelResponse:
 if model_request_parameters.builtin_tools:
 raise UserError('TestModel does not support built-in tools')
 tool_calls = self._get_tool_calls(model_request_parameters)
 output_wrapper = self._get_output(model_request_parameters)
 output_tools = model_request_parameters.output_tools
 # if there are tools, the first thing we want to do is call all of them
 if tool_calls and not any(isinstance(m, ModelResponse) for m in messages):
 return ModelResponse(
 parts=[
 ToolCallPart(name, self.gen_tool_args(args), tool_call_id=f'pyd_ai_tool_call_id__{name}')
 for name, args in tool_calls
 ],
 model_name=self._model_name,
 )
 if messages: # pragma: no branch
 last_message = messages[-1]
 assert isinstance(last_message, ModelRequest), 'Expected last message to be a `ModelRequest`.'
 # check if there are any retry prompts, if so retry them
 new_retry_names = {p.tool_name for p in last_message.parts if isinstance(p, RetryPromptPart)}
 if new_retry_names:
 # Handle retries for both function tools and output tools
 # Check function tools first
 retry_parts: list[ModelResponsePart] = [
 ToolCallPart(name, self.gen_tool_args(args)) for name, args in tool_calls if name in new_retry_names
 ]
 # Check output tools
 if output_tools:
 retry_parts.extend(
 [
 ToolCallPart(
 tool.name,
 output_wrapper.value
 if isinstance(output_wrapper, _WrappedToolOutput) and output_wrapper.value is not None
 else self.gen_tool_args(tool),
 tool_call_id=f'pyd_ai_tool_call_id__{tool.name}',
 )
 for tool in output_tools
 if tool.name in new_retry_names
 ]
 )
 return ModelResponse(parts=retry_parts, model_name=self._model_name)
 if isinstance(output_wrapper, _WrappedTextOutput):
 if (response_text := output_wrapper.value) is None:
 # build up details of tool responses
 output: dict[str, Any] = {}
 for message in messages:
 if isinstance(message, ModelRequest):
 for part in message.parts:
 if isinstance(part, ToolReturnPart):
 output[part.tool_name] = part.content
 if output:
 return ModelResponse(
 parts=[TextPart(pydantic_core.to_json(output).decode())], model_name=self._model_name
 )
 else:
 return ModelResponse(parts=[TextPart('success (no tool calls)')], model_name=self._model_name)
 else:
 return ModelResponse(parts=[TextPart(response_text)], model_name=self._model_name)
 else:
 assert output_tools, 'No output tools provided'
 custom_output_args = output_wrapper.value
 output_tool = output_tools[self.seed % len(output_tools)]
 if custom_output_args is not None:
 return ModelResponse(
 parts=[
 ToolCallPart(
 output_tool.name,
 custom_output_args,
 tool_call_id=f'pyd_ai_tool_call_id__{output_tool.name}',
 )
 ],
 model_name=self._model_name,
 )
 else:
 response_args = self.gen_tool_args(output_tool)
 return ModelResponse(
 parts=[
 ToolCallPart(
 output_tool.name,
 response_args,
 tool_call_id=f'pyd_ai_tool_call_id__{output_tool.name}',
 )
 ],
 model_name=self._model_name,
 )
```
---|--- 
#### __init__
```
__init__(
 *,
 call_tools: list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)] | Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["all"] = "all",
 custom_output_text: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 custom_output_args: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any") | None = None,
 seed: int[](https://docs.python.org/3/library/functions.html#int) = 0,
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None
)
```
Initialize TestModel with optional settings and profile.
Source code in `pydantic_ai_slim/pydantic_ai/models/test.py`
```
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
```
| ```
def__init__(
 self,
 *,
 call_tools: list[str] | Literal['all'] = 'all',
 custom_output_text: str | None = None,
 custom_output_args: Any | None = None,
 seed: int = 0,
 profile: ModelProfileSpec | None = None,
 settings: ModelSettings | None = None,
):
"""Initialize TestModel with optional settings and profile."""
 self.call_tools = call_tools
 self.custom_output_text = custom_output_text
 self.custom_output_args = custom_output_args
 self.seed = seed
 self.last_model_request_parameters = None
 self._model_name = 'test'
 self._system = 'test'
 super().__init__(settings=settings, profile=profile)
```
---|--- 
#### call_tools `class-attribute` `instance-attribute`
```
call_tools: list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)] | Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['all'] = call_tools
```
List of tools to call. If `'all'`, all tools will be called.
#### custom_output_text `class-attribute` `instance-attribute`
```
custom_output_text: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = custom_output_text
```
If set, this text is returned as the final output.
#### custom_output_args `class-attribute` `instance-attribute`
```
custom_output_args: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any") | None = custom_output_args
```
If set, these args will be passed to the output tool.
#### seed `class-attribute` `instance-attribute`
```
seed: int[](https://docs.python.org/3/library/functions.html#int) = seed
```
Seed for generating random data.
#### last_model_request_parameters `class-attribute` `instance-attribute`
```
last_model_request_parameters: (
 ModelRequestParameters[](../base/#pydantic_ai.models.ModelRequestParameters "pydantic_ai.models.ModelRequestParameters") | None
) = None
```
The last ModelRequestParameters passed to the model in a request.
The ModelRequestParameters contains information about the function and output tools available during request handling.
This is set when a request is made, so will reflect the function tools from the last step of the last run.
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
### TestStreamedResponse `dataclass`
Bases: `StreamedResponse[](../base/#pydantic_ai.models.StreamedResponse "pydantic_ai.models.StreamedResponse")`
A structured response that streams test data.
Source code in `pydantic_ai_slim/pydantic_ai/models/test.py`
```
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
```
| ```
@dataclass
classTestStreamedResponse(StreamedResponse):
"""A structured response that streams test data."""
 _model_name: str
 _structured_response: ModelResponse
 _messages: InitVar[Iterable[ModelMessage]]
 _provider_name: str
 _timestamp: datetime = field(default_factory=_utils.now_utc, init=False)
 def__post_init__(self, _messages: Iterable[ModelMessage]):
 self._usage = _estimate_usage(_messages)
 async def_get_event_iterator(self) -> AsyncIterator[ModelResponseStreamEvent]:
 for i, part in enumerate(self._structured_response.parts):
 if isinstance(part, TextPart):
 text = part.content
 *words, last_word = text.split(' ')
 words = [f'{word} ' for word in words]
 words.append(last_word)
 if len(words) == 1 and len(text) > 2:
 mid = len(text) // 2
 words = [text[:mid], text[mid:]]
 self._usage += _get_string_usage('')
 maybe_event = self._parts_manager.handle_text_delta(vendor_part_id=i, content='')
 if maybe_event is not None: # pragma: no branch
 yield maybe_event
 for word in words:
 self._usage += _get_string_usage(word)
 maybe_event = self._parts_manager.handle_text_delta(vendor_part_id=i, content=word)
 if maybe_event is not None: # pragma: no branch
 yield maybe_event
 elif isinstance(part, ToolCallPart):
 yield self._parts_manager.handle_tool_call_part(
 vendor_part_id=i, tool_name=part.tool_name, args=part.args, tool_call_id=part.tool_call_id
 )
 elif isinstance(part, BuiltinToolCallPart | BuiltinToolReturnPart): # pragma: no cover
 # NOTE: These parts are not generated by TestModel, but we need to handle them for type checking
 assert False, f'Unexpected part type in TestModel: {type(part).__name__}'
 elif isinstance(part, ThinkingPart): # pragma: no cover
 # NOTE: There's no way to reach this part of the code, since we don't generate ThinkingPart on TestModel.
 assert False, "This should be unreachable — we don't generate ThinkingPart on TestModel."
 elif isinstance(part, FilePart): # pragma: no cover
 # NOTE: There's no way to reach this part of the code, since we don't generate FilePart on TestModel.
 assert False, "This should be unreachable — we don't generate FilePart on TestModel."
 else:
 assert_never(part)
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
provider_name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Get the provider name.
#### timestamp `property`
```
timestamp: datetime[](https://docs.python.org/3/library/datetime.html#datetime.datetime "datetime.datetime")
```
Get the timestamp of the response.