[ Skip to content ](#pydantic_aimcp)
# `pydantic_ai.mcp`
### MCPServer
Bases: `AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.toolsets.abstract.AbstractToolset")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]`, `ABC[](https://docs.python.org/3/library/abc.html#abc.ABC "abc.ABC")`
Base class for attaching agents to MCP servers.
See <https://modelcontextprotocol.io> for more information.
Source code in `pydantic_ai_slim/pydantic_ai/mcp.py`
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
```
| ```
classMCPServer(AbstractToolset[Any], ABC):
"""Base class for attaching agents to MCP servers.
 See <https://modelcontextprotocol.io> for more information.
 """
 tool_prefix: str | None
"""A prefix to add to all tools that are registered with the server.
 If not empty, will include a trailing underscore(`_`).
 e.g. if `tool_prefix='foo'`, then a tool named `bar` will be registered as `foo_bar`
 """
 log_level: mcp_types.LoggingLevel | None
"""The log level to set when connecting to the server, if any.
 See <https://modelcontextprotocol.io/specification/2025-03-26/server/utilities/logging#logging> for more details.
 If `None`, no log level will be set.
 """
 log_handler: LoggingFnT | None
"""A handler for logging messages from the server."""
 timeout: float
"""The timeout in seconds to wait for the client to initialize."""
 read_timeout: float
"""Maximum time in seconds to wait for new messages before timing out.
 This timeout applies to the long-lived connection after it's established.
 If no new messages are received within this time, the connection will be considered stale
 and may be closed. Defaults to 5 minutes (300 seconds).
 """
 process_tool_call: ProcessToolCallback | None
"""Hook to customize tool calling and optionally pass extra metadata."""
 allow_sampling: bool
"""Whether to allow MCP sampling through this client."""
 sampling_model: models.Model | None
"""The model to use for sampling."""
 max_retries: int
"""The maximum number of times to retry a tool call."""
 elicitation_callback: ElicitationFnT | None = None
"""Callback function to handle elicitation requests from the server."""
 _id: str | None
 _enter_lock: Lock = field(compare=False)
 _running_count: int
 _exit_stack: AsyncExitStack | None
 _client: ClientSession
 _read_stream: MemoryObjectReceiveStream[SessionMessage | Exception]
 _write_stream: MemoryObjectSendStream[SessionMessage]
 _server_info: mcp_types.Implementation
 def__init__(
 self,
 tool_prefix: str | None = None,
 log_level: mcp_types.LoggingLevel | None = None,
 log_handler: LoggingFnT | None = None,
 timeout: float = 5,
 read_timeout: float = 5 * 60,
 process_tool_call: ProcessToolCallback | None = None,
 allow_sampling: bool = True,
 sampling_model: models.Model | None = None,
 max_retries: int = 1,
 elicitation_callback: ElicitationFnT | None = None,
 *,
 id: str | None = None,
 ):
 self.tool_prefix = tool_prefix
 self.log_level = log_level
 self.log_handler = log_handler
 self.timeout = timeout
 self.read_timeout = read_timeout
 self.process_tool_call = process_tool_call
 self.allow_sampling = allow_sampling
 self.sampling_model = sampling_model
 self.max_retries = max_retries
 self.elicitation_callback = elicitation_callback
 self._id = id or tool_prefix
 self.__post_init__()
 def__post_init__(self):
 self._enter_lock = Lock()
 self._running_count = 0
 self._exit_stack = None
 @abstractmethod
 @asynccontextmanager
 async defclient_streams(
 self,
 ) -> AsyncIterator[
 tuple[
 MemoryObjectReceiveStream[SessionMessage | Exception],
 MemoryObjectSendStream[SessionMessage],
 ]
 ]:
"""Create the streams for the MCP server."""
 raise NotImplementedError('MCP Server subclasses must implement this method.')
 yield
 @property
 defid(self) -> str | None:
 return self._id
 @id.setter
 defid(self, value: str | None):
 self._id = value
 @property
 deflabel(self) -> str:
 if self.id:
 return super().label # pragma: no cover
 else:
 return repr(self)
 @property
 deftool_name_conflict_hint(self) -> str:
 return 'Set the `tool_prefix` attribute to avoid name conflicts.'
 @property
 defserver_info(self) -> mcp_types.Implementation:
"""Access the information send by the MCP server during initialization."""
 if getattr(self, '_server_info', None) is None:
 raise AttributeError(
 f'The `{self.__class__.__name__}.server_info` is only instantiated after initialization.'
 )
 return self._server_info
 async deflist_tools(self) -> list[mcp_types.Tool]:
"""Retrieve tools that are currently active on the server.
 Note:
 - We don't cache tools as they might change.
 - We also don't subscribe to the server to avoid complexity.
 """
 async with self: # Ensure server is running
 result = await self._client.list_tools()
 return result.tools
 async defdirect_call_tool(
 self,
 name: str,
 args: dict[str, Any],
 metadata: dict[str, Any] | None = None,
 ) -> ToolResult:
"""Call a tool on the server.
 Args:
 name: The name of the tool to call.
 args: The arguments to pass to the tool.
 metadata: Request-level metadata (optional)
 Returns:
 The result of the tool call.
 Raises:
 ModelRetry: If the tool call fails.
 """
 async with self: # Ensure server is running
 try:
 result = await self._client.send_request(
 mcp_types.ClientRequest(
 mcp_types.CallToolRequest(
 method='tools/call',
 params=mcp_types.CallToolRequestParams(
 name=name,
 arguments=args,
 _meta=mcp_types.RequestParams.Meta(**metadata) if metadata else None,
 ),
 )
 ),
 mcp_types.CallToolResult,
 )
 except McpError as e:
 raise exceptions.ModelRetry(e.error.message)
 if result.isError:
 message: str | None = None
 if result.content: # pragma: no branch
 text_parts = [part.text for part in result.content if isinstance(part, mcp_types.TextContent)]
 message = '\n'.join(text_parts)
 raise exceptions.ModelRetry(message or 'MCP tool call failed')
 # Prefer structured content if there are only text parts, which per the docs would contain the JSON-encoded structured content for backward compatibility.
 # See https://github.com/modelcontextprotocol/python-sdk#structured-output
 if (structured := result.structuredContent) and not any(
 not isinstance(part, mcp_types.TextContent) for part in result.content
 ):
 # The MCP SDK wraps primitives and generic types like list in a `result` key, but we want to use the raw value returned by the tool function.
 # See https://github.com/modelcontextprotocol/python-sdk#structured-output
 if isinstance(structured, dict) and len(structured) == 1 and 'result' in structured:
 return structured['result']
 return structured
 mapped = [await self._map_tool_result_part(part) for part in result.content]
 return mapped[0] if len(mapped) == 1 else mapped
 async defcall_tool(
 self,
 name: str,
 tool_args: dict[str, Any],
 ctx: RunContext[Any],
 tool: ToolsetTool[Any],
 ) -> ToolResult:
 if self.tool_prefix:
 name = name.removeprefix(f'{self.tool_prefix}_')
 ctx = replace(ctx, tool_name=name)
 if self.process_tool_call is not None:
 return await self.process_tool_call(ctx, self.direct_call_tool, name, tool_args)
 else:
 return await self.direct_call_tool(name, tool_args)
 async defget_tools(self, ctx: RunContext[Any]) -> dict[str, ToolsetTool[Any]]:
 return {
 name: self.tool_for_tool_def(
 ToolDefinition(
 name=name,
 description=mcp_tool.description,
 parameters_json_schema=mcp_tool.inputSchema,
 metadata={
 'meta': mcp_tool.meta,
 'annotations': mcp_tool.annotations.model_dump() if mcp_tool.annotations else None,
 'output_schema': mcp_tool.outputSchema or None,
 },
 ),
 )
 for mcp_tool in await self.list_tools()
 if (name := f'{self.tool_prefix}_{mcp_tool.name}' if self.tool_prefix else mcp_tool.name)
 }
 deftool_for_tool_def(self, tool_def: ToolDefinition) -> ToolsetTool[Any]:
 return ToolsetTool(
 toolset=self,
 tool_def=tool_def,
 max_retries=self.max_retries,
 args_validator=TOOL_SCHEMA_VALIDATOR,
 )
 async def__aenter__(self) -> Self:
"""Enter the MCP server context.
 This will initialize the connection to the server.
 If this server is an [`MCPServerStdio`][pydantic_ai.mcp.MCPServerStdio], the server will first be started as a subprocess.
 This is a no-op if the MCP server has already been entered.
 """
 async with self._enter_lock:
 if self._running_count == 0:
 async with AsyncExitStack() as exit_stack:
 self._read_stream, self._write_stream = await exit_stack.enter_async_context(self.client_streams())
 client = ClientSession(
 read_stream=self._read_stream,
 write_stream=self._write_stream,
 sampling_callback=self._sampling_callback if self.allow_sampling else None,
 elicitation_callback=self.elicitation_callback,
 logging_callback=self.log_handler,
 read_timeout_seconds=timedelta(seconds=self.read_timeout),
 )
 self._client = await exit_stack.enter_async_context(client)
 with anyio.fail_after(self.timeout):
 result = await self._client.initialize()
 self._server_info = result.serverInfo
 if log_level := self.log_level:
 await self._client.set_logging_level(log_level)
 self._exit_stack = exit_stack.pop_all()
 self._running_count += 1
 return self
 async def__aexit__(self, *args: Any) -> bool | None:
 if self._running_count == 0:
 raise ValueError('MCPServer.__aexit__ called more times than __aenter__')
 async with self._enter_lock:
 self._running_count -= 1
 if self._running_count == 0 and self._exit_stack is not None:
 await self._exit_stack.aclose()
 self._exit_stack = None
 @property
 defis_running(self) -> bool:
"""Check if the MCP server is running."""
 return bool(self._running_count)
 async def_sampling_callback(
 self, context: RequestContext[ClientSession, Any], params: mcp_types.CreateMessageRequestParams
 ) -> mcp_types.CreateMessageResult | mcp_types.ErrorData:
"""MCP sampling callback."""
 if self.sampling_model is None:
 raise ValueError('Sampling model is not set') # pragma: no cover
 pai_messages = _mcp.map_from_mcp_params(params)
 model_settings = models.ModelSettings()
 if max_tokens := params.maxTokens: # pragma: no branch
 model_settings['max_tokens'] = max_tokens
 if temperature := params.temperature: # pragma: no branch
 model_settings['temperature'] = temperature
 if stop_sequences := params.stopSequences: # pragma: no branch
 model_settings['stop_sequences'] = stop_sequences
 model_response = await model_request(self.sampling_model, pai_messages, model_settings=model_settings)
 return mcp_types.CreateMessageResult(
 role='assistant',
 content=_mcp.map_from_model_response(model_response),
 model=self.sampling_model.model_name,
 )
 async def_map_tool_result_part(
 self, part: mcp_types.ContentBlock
 ) -> str | messages.BinaryContent | dict[str, Any] | list[Any]:
 # See https://github.com/jlowin/fastmcp/blob/main/docs/servers/tools.mdx#return-values
 if isinstance(part, mcp_types.TextContent):
 text = part.text
 if text.startswith(('[', '{')):
 try:
 return pydantic_core.from_json(text)
 except ValueError:
 pass
 return text
 elif isinstance(part, mcp_types.ImageContent):
 return messages.BinaryContent(data=base64.b64decode(part.data), media_type=part.mimeType)
 elif isinstance(part, mcp_types.AudioContent):
 # NOTE: The FastMCP server doesn't support audio content.
 # See <https://github.com/modelcontextprotocol/python-sdk/issues/952> for more details.
 return messages.BinaryContent(
 data=base64.b64decode(part.data), media_type=part.mimeType
 ) # pragma: no cover
 elif isinstance(part, mcp_types.EmbeddedResource):
 resource = part.resource
 return self._get_content(resource)
 elif isinstance(part, mcp_types.ResourceLink):
 resource_result: mcp_types.ReadResourceResult = await self._client.read_resource(part.uri)
 return (
 self._get_content(resource_result.contents[0])
 if len(resource_result.contents) == 1
 else [self._get_content(resource) for resource in resource_result.contents]
 )
 else:
 assert_never(part)
 def_get_content(
 self, resource: mcp_types.TextResourceContents | mcp_types.BlobResourceContents
 ) -> str | messages.BinaryContent:
 if isinstance(resource, mcp_types.TextResourceContents):
 return resource.text
 elif isinstance(resource, mcp_types.BlobResourceContents):
 return messages.BinaryContent(
 data=base64.b64decode(resource.blob), media_type=resource.mimeType or 'application/octet-stream'
 )
 else:
 assert_never(resource)
 def__eq__(self, value: object, /) -> bool:
 return isinstance(value, MCPServer) and self.id == value.id and self.tool_prefix == value.tool_prefix
```
---|--- 
#### tool_prefix `instance-attribute`
```
tool_prefix: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = tool_prefix
```
A prefix to add to all tools that are registered with the server.
If not empty, will include a trailing underscore(`_`).
e.g. if `tool_prefix='foo'`, then a tool named `bar` will be registered as `foo_bar`
#### log_level `instance-attribute`
```
log_level: LoggingLevel | None = log_level
```
The log level to set when connecting to the server, if any.
See <https://modelcontextprotocol.io/specification/2025-03-26/server/utilities/logging#logging> for more details.
If `None`, no log level will be set.
#### log_handler `instance-attribute`
```
log_handler: LoggingFnT | None = log_handler
```
A handler for logging messages from the server.
#### timeout `instance-attribute`
```
timeout: float[](https://docs.python.org/3/library/functions.html#float) = timeout
```
The timeout in seconds to wait for the client to initialize.
#### read_timeout `instance-attribute`
```
read_timeout: float[](https://docs.python.org/3/library/functions.html#float) = read_timeout
```
Maximum time in seconds to wait for new messages before timing out.
This timeout applies to the long-lived connection after it's established. If no new messages are received within this time, the connection will be considered stale and may be closed. Defaults to 5 minutes (300 seconds).
#### process_tool_call `instance-attribute`
```
process_tool_call: ProcessToolCallback | None = (
 process_tool_call
)
```
Hook to customize tool calling and optionally pass extra metadata.
#### allow_sampling `instance-attribute`
```
allow_sampling: bool[](https://docs.python.org/3/library/functions.html#bool) = allow_sampling
```
Whether to allow MCP sampling through this client.
#### sampling_model `instance-attribute`
```
sampling_model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | None = sampling_model
```
The model to use for sampling.
#### max_retries `instance-attribute`
```
max_retries: int[](https://docs.python.org/3/library/functions.html#int) = max_retries
```
The maximum number of times to retry a tool call.
#### elicitation_callback `class-attribute` `instance-attribute`
```
elicitation_callback: ElicitationFnT | None = (
 elicitation_callback
)
```
Callback function to handle elicitation requests from the server.
#### client_streams `abstractmethod` `async`
```
client_streams() -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[
 tuple[](https://docs.python.org/3/library/stdtypes.html#tuple)[
 MemoryObjectReceiveStream[
 SessionMessage | Exception[](https://docs.python.org/3/library/exceptions.html#Exception)
 ],
 MemoryObjectSendStream[SessionMessage],
 ]
]
```
Create the streams for the MCP server.
Source code in `pydantic_ai_slim/pydantic_ai/mcp.py`
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
```
| ```
@abstractmethod
@asynccontextmanager
async defclient_streams(
 self,
) -> AsyncIterator[
 tuple[
 MemoryObjectReceiveStream[SessionMessage | Exception],
 MemoryObjectSendStream[SessionMessage],
 ]
]:
"""Create the streams for the MCP server."""
 raise NotImplementedError('MCP Server subclasses must implement this method.')
 yield
```
---|--- 
#### server_info `property`
```
server_info: Implementation[](https://modelcontextprotocol.github.io/python-sdk/api/#mcp.Implementation "mcp.types.Implementation")
```
Access the information send by the MCP server during initialization.
#### list_tools `async`
```
list_tools() -> list[](https://docs.python.org/3/library/stdtypes.html#list)[Tool[](https://modelcontextprotocol.github.io/python-sdk/api/#mcp.Tool "mcp.types.Tool")]
```
Retrieve tools that are currently active on the server.
Note: - We don't cache tools as they might change. - We also don't subscribe to the server to avoid complexity.
Source code in `pydantic_ai_slim/pydantic_ai/mcp.py`
```
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
```
| ```
async deflist_tools(self) -> list[mcp_types.Tool]:
"""Retrieve tools that are currently active on the server.
 Note:
 - We don't cache tools as they might change.
 - We also don't subscribe to the server to avoid complexity.
 """
 async with self: # Ensure server is running
 result = await self._client.list_tools()
 return result.tools
```
---|--- 
#### direct_call_tool `async`
```
direct_call_tool(
 name: str[](https://docs.python.org/3/library/stdtypes.html#str),
 args: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")],
 metadata: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = None,
) -> ToolResult
```
Call a tool on the server.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`name` | `str[](https://docs.python.org/3/library/stdtypes.html#str)` | The name of the tool to call. | _required_ 
`args` | `dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]` | The arguments to pass to the tool. | _required_ 
`metadata` | `dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None` | Request-level metadata (optional) | `None` 
Returns:
Type | Description 
---|--- 
`ToolResult` | The result of the tool call. 
Raises:
Type | Description 
---|--- 
`ModelRetry[](../exceptions/#pydantic_ai.exceptions.ModelRetry "pydantic_ai.exceptions.ModelRetry")` | If the tool call fails. 
Source code in `pydantic_ai_slim/pydantic_ai/mcp.py`
```
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
```
| ```
async defdirect_call_tool(
 self,
 name: str,
 args: dict[str, Any],
 metadata: dict[str, Any] | None = None,
) -> ToolResult:
"""Call a tool on the server.
 Args:
 name: The name of the tool to call.
 args: The arguments to pass to the tool.
 metadata: Request-level metadata (optional)
 Returns:
 The result of the tool call.
 Raises:
 ModelRetry: If the tool call fails.
 """
 async with self: # Ensure server is running
 try:
 result = await self._client.send_request(
 mcp_types.ClientRequest(
 mcp_types.CallToolRequest(
 method='tools/call',
 params=mcp_types.CallToolRequestParams(
 name=name,
 arguments=args,
 _meta=mcp_types.RequestParams.Meta(**metadata) if metadata else None,
 ),
 )
 ),
 mcp_types.CallToolResult,
 )
 except McpError as e:
 raise exceptions.ModelRetry(e.error.message)
 if result.isError:
 message: str | None = None
 if result.content: # pragma: no branch
 text_parts = [part.text for part in result.content if isinstance(part, mcp_types.TextContent)]
 message = '\n'.join(text_parts)
 raise exceptions.ModelRetry(message or 'MCP tool call failed')
 # Prefer structured content if there are only text parts, which per the docs would contain the JSON-encoded structured content for backward compatibility.
 # See https://github.com/modelcontextprotocol/python-sdk#structured-output
 if (structured := result.structuredContent) and not any(
 not isinstance(part, mcp_types.TextContent) for part in result.content
 ):
 # The MCP SDK wraps primitives and generic types like list in a `result` key, but we want to use the raw value returned by the tool function.
 # See https://github.com/modelcontextprotocol/python-sdk#structured-output
 if isinstance(structured, dict) and len(structured) == 1 and 'result' in structured:
 return structured['result']
 return structured
 mapped = [await self._map_tool_result_part(part) for part in result.content]
 return mapped[0] if len(mapped) == 1 else mapped
```
---|--- 
#### __aenter__ `async`
```
__aenter__() -> Self[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Self "typing_extensions.Self")
```
Enter the MCP server context.
This will initialize the connection to the server. If this server is an [`MCPServerStdio`](#pydantic_ai.mcp.MCPServerStdio), the server will first be started as a subprocess.
This is a no-op if the MCP server has already been entered.
Source code in `pydantic_ai_slim/pydantic_ai/mcp.py`
```
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
```
| ```
async def__aenter__(self) -> Self:
"""Enter the MCP server context.
 This will initialize the connection to the server.
 If this server is an [`MCPServerStdio`][pydantic_ai.mcp.MCPServerStdio], the server will first be started as a subprocess.
 This is a no-op if the MCP server has already been entered.
 """
 async with self._enter_lock:
 if self._running_count == 0:
 async with AsyncExitStack() as exit_stack:
 self._read_stream, self._write_stream = await exit_stack.enter_async_context(self.client_streams())
 client = ClientSession(
 read_stream=self._read_stream,
 write_stream=self._write_stream,
 sampling_callback=self._sampling_callback if self.allow_sampling else None,
 elicitation_callback=self.elicitation_callback,
 logging_callback=self.log_handler,
 read_timeout_seconds=timedelta(seconds=self.read_timeout),
 )
 self._client = await exit_stack.enter_async_context(client)
 with anyio.fail_after(self.timeout):
 result = await self._client.initialize()
 self._server_info = result.serverInfo
 if log_level := self.log_level:
 await self._client.set_logging_level(log_level)
 self._exit_stack = exit_stack.pop_all()
 self._running_count += 1
 return self
```
---|--- 
#### is_running `property`
```
is_running: bool[](https://docs.python.org/3/library/functions.html#bool)
```
Check if the MCP server is running.
### MCPServerStdio
Bases: `MCPServer[](#pydantic_ai.mcp.MCPServer "pydantic_ai.mcp.MCPServer")`
Runs an MCP server in a subprocess and communicates with it over stdin/stdout.
This class implements the stdio transport from the MCP specification. See <https://spec.modelcontextprotocol.io/specification/2024-11-05/basic/transports/#stdio> for more information.
Note
Using this class as an async context manager will start the server as a subprocess when entering the context, and stop it when exiting the context.
Example: 
```
frompydantic_aiimport Agent
frompydantic_ai.mcpimport MCPServerStdio
server = MCPServerStdio( # (1)!
 'uv', args=['run', 'mcp-run-python', 'stdio'], timeout=10
)
agent = Agent('openai:gpt-4o', toolsets=[server])
```
 1. See [MCP Run Python](https://github.com/pydantic/mcp-run-python) for more information.
Source code in `pydantic_ai_slim/pydantic_ai/mcp.py`
```
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
```
| ```
classMCPServerStdio(MCPServer):
"""Runs an MCP server in a subprocess and communicates with it over stdin/stdout.
 This class implements the stdio transport from the MCP specification.
 See <https://spec.modelcontextprotocol.io/specification/2024-11-05/basic/transports/#stdio> for more information.
 !!! note
 Using this class as an async context manager will start the server as a subprocess when entering the context,
 and stop it when exiting the context.
 Example:
```python {py="3.10"}
 from pydantic_ai import Agent
 from pydantic_ai.mcp import MCPServerStdio
 server = MCPServerStdio( # (1)!
 'uv', args=['run', 'mcp-run-python', 'stdio'], timeout=10
 )
 agent = Agent('openai:gpt-4o', toolsets=[server])
```
 1. See [MCP Run Python](https://github.com/pydantic/mcp-run-python) for more information.
 """
 command: str
"""The command to run."""
 args: Sequence[str]
"""The arguments to pass to the command."""
 env: dict[str, str] | None
"""The environment variables the CLI server will have access to.
 By default the subprocess will not inherit any environment variables from the parent process.
 If you want to inherit the environment variables from the parent process, use `env=os.environ`.
 """
 cwd: str | Path | None
"""The working directory to use when spawning the process."""
 # last fields are re-defined from the parent class so they appear as fields
 tool_prefix: str | None
 log_level: mcp_types.LoggingLevel | None
 log_handler: LoggingFnT | None
 timeout: float
 read_timeout: float
 process_tool_call: ProcessToolCallback | None
 allow_sampling: bool
 sampling_model: models.Model | None
 max_retries: int
 elicitation_callback: ElicitationFnT | None = None
 def__init__(
 self,
 command: str,
 args: Sequence[str],
 *,
 env: dict[str, str] | None = None,
 cwd: str | Path | None = None,
 tool_prefix: str | None = None,
 log_level: mcp_types.LoggingLevel | None = None,
 log_handler: LoggingFnT | None = None,
 timeout: float = 5,
 read_timeout: float = 5 * 60,
 process_tool_call: ProcessToolCallback | None = None,
 allow_sampling: bool = True,
 sampling_model: models.Model | None = None,
 max_retries: int = 1,
 elicitation_callback: ElicitationFnT | None = None,
 id: str | None = None,
 ):
"""Build a new MCP server.
 Args:
 command: The command to run.
 args: The arguments to pass to the command.
 env: The environment variables to set in the subprocess.
 cwd: The working directory to use when spawning the process.
 tool_prefix: A prefix to add to all tools that are registered with the server.
 log_level: The log level to set when connecting to the server, if any.
 log_handler: A handler for logging messages from the server.
 timeout: The timeout in seconds to wait for the client to initialize.
 read_timeout: Maximum time in seconds to wait for new messages before timing out.
 process_tool_call: Hook to customize tool calling and optionally pass extra metadata.
 allow_sampling: Whether to allow MCP sampling through this client.
 sampling_model: The model to use for sampling.
 max_retries: The maximum number of times to retry a tool call.
 elicitation_callback: Callback function to handle elicitation requests from the server.
 id: An optional unique ID for the MCP server. An MCP server needs to have an ID in order to be used in a durable execution environment like Temporal, in which case the ID will be used to identify the server's activities within the workflow.
 """
 self.command = command
 self.args = args
 self.env = env
 self.cwd = cwd
 super().__init__(
 tool_prefix,
 log_level,
 log_handler,
 timeout,
 read_timeout,
 process_tool_call,
 allow_sampling,
 sampling_model,
 max_retries,
 elicitation_callback,
 id=id,
 )
 @classmethod
 def__get_pydantic_core_schema__(cls, _: Any, __: Any) -> CoreSchema:
 return core_schema.no_info_after_validator_function(
 lambda dct: MCPServerStdio(**dct),
 core_schema.typed_dict_schema(
 {
 'command': core_schema.typed_dict_field(core_schema.str_schema()),
 'args': core_schema.typed_dict_field(core_schema.list_schema(core_schema.str_schema())),
 'env': core_schema.typed_dict_field(
 core_schema.dict_schema(core_schema.str_schema(), core_schema.str_schema()),
 required=False,
 ),
 }
 ),
 )
 @asynccontextmanager
 async defclient_streams(
 self,
 ) -> AsyncIterator[
 tuple[
 MemoryObjectReceiveStream[SessionMessage | Exception],
 MemoryObjectSendStream[SessionMessage],
 ]
 ]:
 server = StdioServerParameters(command=self.command, args=list(self.args), env=self.env, cwd=self.cwd)
 async with stdio_client(server=server) as (read_stream, write_stream):
 yield read_stream, write_stream
 def__repr__(self) -> str:
 repr_args = [
 f'command={self.command!r}',
 f'args={self.args!r}',
 ]
 if self.id:
 repr_args.append(f'id={self.id!r}') # pragma: lax no cover
 return f'{self.__class__.__name__}({", ".join(repr_args)})'
 def__eq__(self, value: object, /) -> bool:
 return (
 super().__eq__(value)
 and isinstance(value, MCPServerStdio)
 and self.command == value.command
 and self.args == value.args
 and self.env == value.env
 and self.cwd == value.cwd
 )
```
---|--- 
#### __init__
```
__init__(
 command: str[](https://docs.python.org/3/library/stdtypes.html#str),
 args: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[str[](https://docs.python.org/3/library/stdtypes.html#str)],
 *,
 env: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), str[](https://docs.python.org/3/library/stdtypes.html#str)] | None = None,
 cwd: str[](https://docs.python.org/3/library/stdtypes.html#str) | Path[](https://docs.python.org/3/library/pathlib.html#pathlib.Path "pathlib.Path") | None = None,
 tool_prefix: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 log_level: LoggingLevel | None = None,
 log_handler: LoggingFnT | None = None,
 timeout: float[](https://docs.python.org/3/library/functions.html#float) = 5,
 read_timeout: float[](https://docs.python.org/3/library/functions.html#float) = 5 * 60,
 process_tool_call: ProcessToolCallback | None = None,
 allow_sampling: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 sampling_model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | None = None,
 max_retries: int[](https://docs.python.org/3/library/functions.html#int) = 1,
 elicitation_callback: ElicitationFnT | None = None,
 id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
)
```
Build a new MCP server.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`command` | `str[](https://docs.python.org/3/library/stdtypes.html#str)` | The command to run. | _required_ 
`args` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[str[](https://docs.python.org/3/library/stdtypes.html#str)]` | The arguments to pass to the command. | _required_ 
`env` | `dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), str[](https://docs.python.org/3/library/stdtypes.html#str)] | None` | The environment variables to set in the subprocess. | `None` 
`cwd` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Path[](https://docs.python.org/3/library/pathlib.html#pathlib.Path "pathlib.Path") | None` | The working directory to use when spawning the process. | `None` 
`tool_prefix` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | A prefix to add to all tools that are registered with the server. | `None` 
`log_level` | `LoggingLevel | None` | The log level to set when connecting to the server, if any. | `None` 
`log_handler` | `LoggingFnT | None` | A handler for logging messages from the server. | `None` 
`timeout` | `float[](https://docs.python.org/3/library/functions.html#float)` | The timeout in seconds to wait for the client to initialize. | `5` 
`read_timeout` | `float[](https://docs.python.org/3/library/functions.html#float)` | Maximum time in seconds to wait for new messages before timing out. | `5 * 60` 
`process_tool_call` | `ProcessToolCallback | None` | Hook to customize tool calling and optionally pass extra metadata. | `None` 
`allow_sampling` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to allow MCP sampling through this client. | `True` 
`sampling_model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | None` | The model to use for sampling. | `None` 
`max_retries` | `int[](https://docs.python.org/3/library/functions.html#int)` | The maximum number of times to retry a tool call. | `1` 
`elicitation_callback` | `ElicitationFnT | None` | Callback function to handle elicitation requests from the server. | `None` 
`id` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | An optional unique ID for the MCP server. An MCP server needs to have an ID in order to be used in a durable execution environment like Temporal, in which case the ID will be used to identify the server's activities within the workflow. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/mcp.py`
```
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
```
| ```
def__init__(
 self,
 command: str,
 args: Sequence[str],
 *,
 env: dict[str, str] | None = None,
 cwd: str | Path | None = None,
 tool_prefix: str | None = None,
 log_level: mcp_types.LoggingLevel | None = None,
 log_handler: LoggingFnT | None = None,
 timeout: float = 5,
 read_timeout: float = 5 * 60,
 process_tool_call: ProcessToolCallback | None = None,
 allow_sampling: bool = True,
 sampling_model: models.Model | None = None,
 max_retries: int = 1,
 elicitation_callback: ElicitationFnT | None = None,
 id: str | None = None,
):
"""Build a new MCP server.
 Args:
 command: The command to run.
 args: The arguments to pass to the command.
 env: The environment variables to set in the subprocess.
 cwd: The working directory to use when spawning the process.
 tool_prefix: A prefix to add to all tools that are registered with the server.
 log_level: The log level to set when connecting to the server, if any.
 log_handler: A handler for logging messages from the server.
 timeout: The timeout in seconds to wait for the client to initialize.
 read_timeout: Maximum time in seconds to wait for new messages before timing out.
 process_tool_call: Hook to customize tool calling and optionally pass extra metadata.
 allow_sampling: Whether to allow MCP sampling through this client.
 sampling_model: The model to use for sampling.
 max_retries: The maximum number of times to retry a tool call.
 elicitation_callback: Callback function to handle elicitation requests from the server.
 id: An optional unique ID for the MCP server. An MCP server needs to have an ID in order to be used in a durable execution environment like Temporal, in which case the ID will be used to identify the server's activities within the workflow.
 """
 self.command = command
 self.args = args
 self.env = env
 self.cwd = cwd
 super().__init__(
 tool_prefix,
 log_level,
 log_handler,
 timeout,
 read_timeout,
 process_tool_call,
 allow_sampling,
 sampling_model,
 max_retries,
 elicitation_callback,
 id=id,
 )
```
---|--- 
#### command `instance-attribute`
```
command: str[](https://docs.python.org/3/library/stdtypes.html#str) = command
```
The command to run.
#### args `instance-attribute`
```
args: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[str[](https://docs.python.org/3/library/stdtypes.html#str)] = args
```
The arguments to pass to the command.
#### env `instance-attribute`
```
env: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), str[](https://docs.python.org/3/library/stdtypes.html#str)] | None = env
```
The environment variables the CLI server will have access to.
By default the subprocess will not inherit any environment variables from the parent process. If you want to inherit the environment variables from the parent process, use `env=os.environ`.
#### cwd `instance-attribute`
```
cwd: str[](https://docs.python.org/3/library/stdtypes.html#str) | Path[](https://docs.python.org/3/library/pathlib.html#pathlib.Path "pathlib.Path") | None = cwd
```
The working directory to use when spawning the process.
### MCPServerSSE
Bases: `_MCPServerHTTP`
An MCP server that connects over streamable HTTP connections.
This class implements the SSE transport from the MCP specification. See <https://spec.modelcontextprotocol.io/specification/2024-11-05/basic/transports/#http-with-sse> for more information.
Note
Using this class as an async context manager will create a new pool of HTTP connections to connect to a server which should already be running.
Example: 
```
frompydantic_aiimport Agent
frompydantic_ai.mcpimport MCPServerSSE
server = MCPServerSSE('http://localhost:3001/sse')
agent = Agent('openai:gpt-4o', toolsets=[server])
```
Source code in `pydantic_ai_slim/pydantic_ai/mcp.py`
```
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
```
| ```
classMCPServerSSE(_MCPServerHTTP):
"""An MCP server that connects over streamable HTTP connections.
 This class implements the SSE transport from the MCP specification.
 See <https://spec.modelcontextprotocol.io/specification/2024-11-05/basic/transports/#http-with-sse> for more information.
 !!! note
 Using this class as an async context manager will create a new pool of HTTP connections to connect
 to a server which should already be running.
 Example:
```python {py="3.10"}
 from pydantic_ai import Agent
 from pydantic_ai.mcp import MCPServerSSE
 server = MCPServerSSE('http://localhost:3001/sse')
 agent = Agent('openai:gpt-4o', toolsets=[server])
```
 """
 @classmethod
 def__get_pydantic_core_schema__(cls, _: Any, __: Any) -> CoreSchema:
 return core_schema.no_info_after_validator_function(
 lambda dct: MCPServerSSE(**dct),
 core_schema.typed_dict_schema(
 {
 'url': core_schema.typed_dict_field(core_schema.str_schema()),
 'headers': core_schema.typed_dict_field(
 core_schema.dict_schema(core_schema.str_schema(), core_schema.str_schema()), required=False
 ),
 }
 ),
 )
 @property
 def_transport_client(self):
 return sse_client # pragma: no cover
 def__eq__(self, value: object, /) -> bool:
 return super().__eq__(value) and isinstance(value, MCPServerSSE) and self.url == value.url
```
---|--- 
### MCPServerHTTP `deprecated`
Bases: `MCPServerSSE[](#pydantic_ai.mcp.MCPServerSSE "pydantic_ai.mcp.MCPServerSSE")`
Deprecated
The `MCPServerHTTP` class is deprecated, use `MCPServerSSE` instead.
An MCP server that connects over HTTP using the old SSE transport.
This class implements the SSE transport from the MCP specification. See <https://spec.modelcontextprotocol.io/specification/2024-11-05/basic/transports/#http-with-sse> for more information.
Note
Using this class as an async context manager will create a new pool of HTTP connections to connect to a server which should already be running.
Example: 
```
frompydantic_aiimport Agent
frompydantic_ai.mcpimport MCPServerHTTP
server = MCPServerHTTP('http://localhost:3001/sse')
agent = Agent('openai:gpt-4o', toolsets=[server])
```
Source code in `pydantic_ai_slim/pydantic_ai/mcp.py`
```
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
```
| ```
@deprecated('The `MCPServerHTTP` class is deprecated, use `MCPServerSSE` instead.')
classMCPServerHTTP(MCPServerSSE):
"""An MCP server that connects over HTTP using the old SSE transport.
 This class implements the SSE transport from the MCP specification.
 See <https://spec.modelcontextprotocol.io/specification/2024-11-05/basic/transports/#http-with-sse> for more information.
 !!! note
 Using this class as an async context manager will create a new pool of HTTP connections to connect
 to a server which should already be running.
 Example:
```python {py="3.10" test="skip"}
 from pydantic_ai import Agent
 from pydantic_ai.mcp import MCPServerHTTP
 server = MCPServerHTTP('http://localhost:3001/sse')
 agent = Agent('openai:gpt-4o', toolsets=[server])
```
 """
```
---|--- 
### MCPServerStreamableHTTP
Bases: `_MCPServerHTTP`
An MCP server that connects over HTTP using the Streamable HTTP transport.
This class implements the Streamable HTTP transport from the MCP specification. See <https://modelcontextprotocol.io/introduction#streamable-http> for more information.
Note
Using this class as an async context manager will create a new pool of HTTP connections to connect to a server which should already be running.
Example: 
```
frompydantic_aiimport Agent
frompydantic_ai.mcpimport MCPServerStreamableHTTP
server = MCPServerStreamableHTTP('http://localhost:8000/mcp')
agent = Agent('openai:gpt-4o', toolsets=[server])
```
Source code in `pydantic_ai_slim/pydantic_ai/mcp.py`
```
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
classMCPServerStreamableHTTP(_MCPServerHTTP):
"""An MCP server that connects over HTTP using the Streamable HTTP transport.
 This class implements the Streamable HTTP transport from the MCP specification.
 See <https://modelcontextprotocol.io/introduction#streamable-http> for more information.
 !!! note
 Using this class as an async context manager will create a new pool of HTTP connections to connect
 to a server which should already be running.
 Example:
```python {py="3.10"}
 from pydantic_ai import Agent
 from pydantic_ai.mcp import MCPServerStreamableHTTP
 server = MCPServerStreamableHTTP('http://localhost:8000/mcp')
 agent = Agent('openai:gpt-4o', toolsets=[server])
```
 """
 @classmethod
 def__get_pydantic_core_schema__(cls, _: Any, __: Any) -> CoreSchema:
 return core_schema.no_info_after_validator_function(
 lambda dct: MCPServerStreamableHTTP(**dct),
 core_schema.typed_dict_schema(
 {
 'url': core_schema.typed_dict_field(core_schema.str_schema()),
 'headers': core_schema.typed_dict_field(
 core_schema.dict_schema(core_schema.str_schema(), core_schema.str_schema()), required=False
 ),
 }
 ),
 )
 @property
 def_transport_client(self):
 return streamablehttp_client # pragma: no cover
 def__eq__(self, value: object, /) -> bool:
 return super().__eq__(value) and isinstance(value, MCPServerStreamableHTTP) and self.url == value.url
```
---|--- 
### load_mcp_servers
```
load_mcp_servers(
 config_path: str[](https://docs.python.org/3/library/stdtypes.html#str) | Path[](https://docs.python.org/3/library/pathlib.html#pathlib.Path "pathlib.Path"),
) -> list[](https://docs.python.org/3/library/stdtypes.html#list)[
 MCPServerStdio[](#pydantic_ai.mcp.MCPServerStdio "pydantic_ai.mcp.MCPServerStdio") | MCPServerStreamableHTTP[](#pydantic_ai.mcp.MCPServerStreamableHTTP "pydantic_ai.mcp.MCPServerStreamableHTTP") | MCPServerSSE[](#pydantic_ai.mcp.MCPServerSSE "pydantic_ai.mcp.MCPServerSSE")
]
```
Load MCP servers from a configuration file.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`config_path` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | Path[](https://docs.python.org/3/library/pathlib.html#pathlib.Path "pathlib.Path")` | The path to the configuration file. | _required_ 
Returns:
Type | Description 
---|--- 
`list[](https://docs.python.org/3/library/stdtypes.html#list)[MCPServerStdio[](#pydantic_ai.mcp.MCPServerStdio "pydantic_ai.mcp.MCPServerStdio") | MCPServerStreamableHTTP[](#pydantic_ai.mcp.MCPServerStreamableHTTP "pydantic_ai.mcp.MCPServerStreamableHTTP") | MCPServerSSE[](#pydantic_ai.mcp.MCPServerSSE "pydantic_ai.mcp.MCPServerSSE")]` | A list of MCP servers. 
Raises:
Type | Description 
---|--- 
`FileNotFoundError[](https://docs.python.org/3/library/exceptions.html#FileNotFoundError)` | If the configuration file does not exist. 
`ValidationError` | If the configuration file does not match the schema. 
Source code in `pydantic_ai_slim/pydantic_ai/mcp.py`
```
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
```
| ```
defload_mcp_servers(config_path: str | Path) -> list[MCPServerStdio | MCPServerStreamableHTTP | MCPServerSSE]:
"""Load MCP servers from a configuration file.
 Args:
 config_path: The path to the configuration file.
 Returns:
 A list of MCP servers.
 Raises:
 FileNotFoundError: If the configuration file does not exist.
 ValidationError: If the configuration file does not match the schema.
 """
 config_path = Path(config_path)
 if not config_path.exists():
 raise FileNotFoundError(f'Config file {config_path} not found')
 config = MCPServerConfig.model_validate_json(config_path.read_bytes())
 servers: list[MCPServerStdio | MCPServerStreamableHTTP | MCPServerSSE] = []
 for name, server in config.mcp_servers.items():
 server.id = name
 server.tool_prefix = name
 servers.append(server)
 return servers
```
---|---