[ Skip to content ](#pydantic_aiuiag_ui)
# `pydantic_ai.ui.ag_ui`
AG-UI protocol integration for Pydantic AI agents.
### AGUIAdapter `dataclass`
Bases: `UIAdapter[](../base/#pydantic_ai.ui.UIAdapter "pydantic_ai.ui.UIAdapter")[RunAgentInput, Message, BaseEvent, AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]`
UI adapter for the Agent-User Interaction (AG-UI) protocol.
Source code in `pydantic_ai_slim/pydantic_ai/ui/ag_ui/_adapter.py`
```
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
```
| ```
classAGUIAdapter(UIAdapter[RunAgentInput, Message, BaseEvent, AgentDepsT, OutputDataT]):
"""UI adapter for the Agent-User Interaction (AG-UI) protocol."""
 @classmethod
 defbuild_run_input(cls, body: bytes) -> RunAgentInput:
"""Build an AG-UI run input object from the request body."""
 return RunAgentInput.model_validate_json(body)
 defbuild_event_stream(self) -> UIEventStream[RunAgentInput, BaseEvent, AgentDepsT, OutputDataT]:
"""Build an AG-UI event stream transformer."""
 return AGUIEventStream(self.run_input, accept=self.accept)
 @cached_property
 defmessages(self) -> list[ModelMessage]:
"""Pydantic AI messages from the AG-UI run input."""
 return self.load_messages(self.run_input.messages)
 @cached_property
 deftoolset(self) -> AbstractToolset[AgentDepsT] | None:
"""Toolset representing frontend tools from the AG-UI run input."""
 if self.run_input.tools:
 return _AGUIFrontendToolset[AgentDepsT](self.run_input.tools)
 return None
 @cached_property
 defstate(self) -> dict[str, Any] | None:
"""Frontend state from the AG-UI run input."""
 return self.run_input.state
 @classmethod
 defload_messages(cls, messages: Sequence[Message]) -> list[ModelMessage]:
"""Transform AG-UI messages into Pydantic AI messages."""
 builder = MessagesBuilder()
 tool_calls: dict[str, str] = {} # Tool call ID to tool name mapping.
 for msg in messages:
 if isinstance(msg, UserMessage | SystemMessage | DeveloperMessage) or (
 isinstance(msg, ToolMessage) and not msg.tool_call_id.startswith(BUILTIN_TOOL_CALL_ID_PREFIX)
 ):
 if isinstance(msg, UserMessage):
 builder.add(UserPromptPart(content=msg.content))
 elif isinstance(msg, SystemMessage | DeveloperMessage):
 builder.add(SystemPromptPart(content=msg.content))
 else:
 tool_call_id = msg.tool_call_id
 tool_name = tool_calls.get(tool_call_id)
 if tool_name is None: # pragma: no cover
 raise ValueError(f'Tool call with ID {tool_call_id} not found in the history.')
 builder.add(
 ToolReturnPart(
 tool_name=tool_name,
 content=msg.content,
 tool_call_id=tool_call_id,
 )
 )
 elif isinstance(msg, AssistantMessage) or ( # pragma: no branch
 isinstance(msg, ToolMessage) and msg.tool_call_id.startswith(BUILTIN_TOOL_CALL_ID_PREFIX)
 ):
 if isinstance(msg, AssistantMessage):
 if msg.content:
 builder.add(TextPart(content=msg.content))
 if msg.tool_calls:
 for tool_call in msg.tool_calls:
 tool_call_id = tool_call.id
 tool_name = tool_call.function.name
 tool_calls[tool_call_id] = tool_name
 if tool_call_id.startswith(BUILTIN_TOOL_CALL_ID_PREFIX):
 _, provider_name, tool_call_id = tool_call_id.split('|', 2)
 builder.add(
 BuiltinToolCallPart(
 tool_name=tool_name,
 args=tool_call.function.arguments,
 tool_call_id=tool_call_id,
 provider_name=provider_name,
 )
 )
 else:
 builder.add(
 ToolCallPart(
 tool_name=tool_name,
 tool_call_id=tool_call_id,
 args=tool_call.function.arguments,
 )
 )
 else:
 tool_call_id = msg.tool_call_id
 tool_name = tool_calls.get(tool_call_id)
 if tool_name is None: # pragma: no cover
 raise ValueError(f'Tool call with ID {tool_call_id} not found in the history.')
 _, provider_name, tool_call_id = tool_call_id.split('|', 2)
 builder.add(
 BuiltinToolReturnPart(
 tool_name=tool_name,
 content=msg.content,
 tool_call_id=tool_call_id,
 provider_name=provider_name,
 )
 )
 return builder.messages
```
---|--- 
#### build_run_input `classmethod`
```
build_run_input(body: bytes[](https://docs.python.org/3/library/stdtypes.html#bytes)) -> RunAgentInput
```
Build an AG-UI run input object from the request body.
Source code in `pydantic_ai_slim/pydantic_ai/ui/ag_ui/_adapter.py`
```
86
87
88
89
```
| ```
@classmethod
defbuild_run_input(cls, body: bytes) -> RunAgentInput:
"""Build an AG-UI run input object from the request body."""
 return RunAgentInput.model_validate_json(body)
```
---|--- 
#### build_event_stream
```
build_event_stream() -> (
 UIEventStream[](../base/#pydantic_ai.ui.UIEventStream "pydantic_ai.ui.UIEventStream")[
 RunAgentInput, BaseEvent, AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")
 ]
)
```
Build an AG-UI event stream transformer.
Source code in `pydantic_ai_slim/pydantic_ai/ui/ag_ui/_adapter.py`
```
91
92
93
```
| ```
defbuild_event_stream(self) -> UIEventStream[RunAgentInput, BaseEvent, AgentDepsT, OutputDataT]:
"""Build an AG-UI event stream transformer."""
 return AGUIEventStream(self.run_input, accept=self.accept)
```
---|--- 
#### messages `cached` `property`
```
messages: list[](https://docs.python.org/3/library/stdtypes.html#list)[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")]
```
Pydantic AI messages from the AG-UI run input.
#### toolset `cached` `property`
```
toolset: AbstractToolset[](../../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.toolsets.AbstractToolset")[AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")] | None
```
Toolset representing frontend tools from the AG-UI run input.
#### state `cached` `property`
```
state: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None
```
Frontend state from the AG-UI run input.
#### load_messages `classmethod`
```
load_messages(
 messages: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[Message],
) -> list[](https://docs.python.org/3/library/stdtypes.html#list)[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")]
```
Transform AG-UI messages into Pydantic AI messages.
Source code in `pydantic_ai_slim/pydantic_ai/ui/ag_ui/_adapter.py`
```
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
```
| ```
@classmethod
defload_messages(cls, messages: Sequence[Message]) -> list[ModelMessage]:
"""Transform AG-UI messages into Pydantic AI messages."""
 builder = MessagesBuilder()
 tool_calls: dict[str, str] = {} # Tool call ID to tool name mapping.
 for msg in messages:
 if isinstance(msg, UserMessage | SystemMessage | DeveloperMessage) or (
 isinstance(msg, ToolMessage) and not msg.tool_call_id.startswith(BUILTIN_TOOL_CALL_ID_PREFIX)
 ):
 if isinstance(msg, UserMessage):
 builder.add(UserPromptPart(content=msg.content))
 elif isinstance(msg, SystemMessage | DeveloperMessage):
 builder.add(SystemPromptPart(content=msg.content))
 else:
 tool_call_id = msg.tool_call_id
 tool_name = tool_calls.get(tool_call_id)
 if tool_name is None: # pragma: no cover
 raise ValueError(f'Tool call with ID {tool_call_id} not found in the history.')
 builder.add(
 ToolReturnPart(
 tool_name=tool_name,
 content=msg.content,
 tool_call_id=tool_call_id,
 )
 )
 elif isinstance(msg, AssistantMessage) or ( # pragma: no branch
 isinstance(msg, ToolMessage) and msg.tool_call_id.startswith(BUILTIN_TOOL_CALL_ID_PREFIX)
 ):
 if isinstance(msg, AssistantMessage):
 if msg.content:
 builder.add(TextPart(content=msg.content))
 if msg.tool_calls:
 for tool_call in msg.tool_calls:
 tool_call_id = tool_call.id
 tool_name = tool_call.function.name
 tool_calls[tool_call_id] = tool_name
 if tool_call_id.startswith(BUILTIN_TOOL_CALL_ID_PREFIX):
 _, provider_name, tool_call_id = tool_call_id.split('|', 2)
 builder.add(
 BuiltinToolCallPart(
 tool_name=tool_name,
 args=tool_call.function.arguments,
 tool_call_id=tool_call_id,
 provider_name=provider_name,
 )
 )
 else:
 builder.add(
 ToolCallPart(
 tool_name=tool_name,
 tool_call_id=tool_call_id,
 args=tool_call.function.arguments,
 )
 )
 else:
 tool_call_id = msg.tool_call_id
 tool_name = tool_calls.get(tool_call_id)
 if tool_name is None: # pragma: no cover
 raise ValueError(f'Tool call with ID {tool_call_id} not found in the history.')
 _, provider_name, tool_call_id = tool_call_id.split('|', 2)
 builder.add(
 BuiltinToolReturnPart(
 tool_name=tool_name,
 content=msg.content,
 tool_call_id=tool_call_id,
 provider_name=provider_name,
 )
 )
 return builder.messages
```
---|--- 
### AGUIEventStream `dataclass`
Bases: `UIEventStream[](../base/#pydantic_ai.ui.UIEventStream "pydantic_ai.ui.UIEventStream")[RunAgentInput, BaseEvent, AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]`
UI event stream transformer for the Agent-User Interaction (AG-UI) protocol.
Source code in `pydantic_ai_slim/pydantic_ai/ui/ag_ui/_event_stream.py`
```
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
```
| ```
@dataclass
classAGUIEventStream(UIEventStream[RunAgentInput, BaseEvent, AgentDepsT, OutputDataT]):
"""UI event stream transformer for the Agent-User Interaction (AG-UI) protocol."""
 _thinking_text: bool = False
 _builtin_tool_call_ids: dict[str, str] = field(default_factory=dict)
 _error: bool = False
 @property
 def_event_encoder(self) -> EventEncoder:
 return EventEncoder(accept=self.accept or SSE_CONTENT_TYPE)
 @property
 defcontent_type(self) -> str:
 return self._event_encoder.get_content_type()
 defencode_event(self, event: BaseEvent) -> str:
 return self._event_encoder.encode(event)
 async defbefore_stream(self) -> AsyncIterator[BaseEvent]:
 yield RunStartedEvent(
 thread_id=self.run_input.thread_id,
 run_id=self.run_input.run_id,
 )
 async defafter_stream(self) -> AsyncIterator[BaseEvent]:
 if not self._error:
 yield RunFinishedEvent(
 thread_id=self.run_input.thread_id,
 run_id=self.run_input.run_id,
 )
 async defon_error(self, error: Exception) -> AsyncIterator[BaseEvent]:
 self._error = True
 yield RunErrorEvent(message=str(error))
 async defhandle_text_start(self, part: TextPart, follows_text: bool = False) -> AsyncIterator[BaseEvent]:
 if follows_text:
 message_id = self.message_id
 else:
 message_id = self.new_message_id()
 yield TextMessageStartEvent(message_id=message_id)
 if part.content: # pragma: no branch
 yield TextMessageContentEvent(message_id=message_id, delta=part.content)
 async defhandle_text_delta(self, delta: TextPartDelta) -> AsyncIterator[BaseEvent]:
 if delta.content_delta: # pragma: no branch
 yield TextMessageContentEvent(message_id=self.message_id, delta=delta.content_delta)
 async defhandle_text_end(self, part: TextPart, followed_by_text: bool = False) -> AsyncIterator[BaseEvent]:
 if not followed_by_text:
 yield TextMessageEndEvent(message_id=self.message_id)
 async defhandle_thinking_start(
 self, part: ThinkingPart, follows_thinking: bool = False
 ) -> AsyncIterator[BaseEvent]:
 if not follows_thinking:
 yield ThinkingStartEvent(type=EventType.THINKING_START)
 if part.content:
 yield ThinkingTextMessageStartEvent(type=EventType.THINKING_TEXT_MESSAGE_START)
 yield ThinkingTextMessageContentEvent(type=EventType.THINKING_TEXT_MESSAGE_CONTENT, delta=part.content)
 self._thinking_text = True
 async defhandle_thinking_delta(self, delta: ThinkingPartDelta) -> AsyncIterator[BaseEvent]:
 if not delta.content_delta:
 return # pragma: no cover
 if not self._thinking_text:
 yield ThinkingTextMessageStartEvent(type=EventType.THINKING_TEXT_MESSAGE_START)
 self._thinking_text = True
 yield ThinkingTextMessageContentEvent(type=EventType.THINKING_TEXT_MESSAGE_CONTENT, delta=delta.content_delta)
 async defhandle_thinking_end(
 self, part: ThinkingPart, followed_by_thinking: bool = False
 ) -> AsyncIterator[BaseEvent]:
 if self._thinking_text:
 yield ThinkingTextMessageEndEvent(type=EventType.THINKING_TEXT_MESSAGE_END)
 self._thinking_text = False
 if not followed_by_thinking:
 yield ThinkingEndEvent(type=EventType.THINKING_END)
 defhandle_tool_call_start(self, part: ToolCallPart | BuiltinToolCallPart) -> AsyncIterator[BaseEvent]:
 return self._handle_tool_call_start(part)
 defhandle_builtin_tool_call_start(self, part: BuiltinToolCallPart) -> AsyncIterator[BaseEvent]:
 tool_call_id = part.tool_call_id
 builtin_tool_call_id = '|'.join([BUILTIN_TOOL_CALL_ID_PREFIX, part.provider_name or '', tool_call_id])
 self._builtin_tool_call_ids[tool_call_id] = builtin_tool_call_id
 tool_call_id = builtin_tool_call_id
 return self._handle_tool_call_start(part, tool_call_id)
 async def_handle_tool_call_start(
 self, part: ToolCallPart | BuiltinToolCallPart, tool_call_id: str | None = None
 ) -> AsyncIterator[BaseEvent]:
 tool_call_id = tool_call_id or part.tool_call_id
 message_id = self.message_id or self.new_message_id()
 yield ToolCallStartEvent(tool_call_id=tool_call_id, tool_call_name=part.tool_name, parent_message_id=message_id)
 if part.args:
 yield ToolCallArgsEvent(tool_call_id=tool_call_id, delta=part.args_as_json_str())
 async defhandle_tool_call_delta(self, delta: ToolCallPartDelta) -> AsyncIterator[BaseEvent]:
 tool_call_id = delta.tool_call_id
 assert tool_call_id, '`ToolCallPartDelta.tool_call_id` must be set'
 if tool_call_id in self._builtin_tool_call_ids:
 tool_call_id = self._builtin_tool_call_ids[tool_call_id]
 yield ToolCallArgsEvent(
 tool_call_id=tool_call_id,
 delta=delta.args_delta if isinstance(delta.args_delta, str) else json.dumps(delta.args_delta),
 )
 async defhandle_tool_call_end(self, part: ToolCallPart) -> AsyncIterator[BaseEvent]:
 yield ToolCallEndEvent(tool_call_id=part.tool_call_id)
 async defhandle_builtin_tool_call_end(self, part: BuiltinToolCallPart) -> AsyncIterator[BaseEvent]:
 yield ToolCallEndEvent(tool_call_id=self._builtin_tool_call_ids[part.tool_call_id])
 async defhandle_builtin_tool_return(self, part: BuiltinToolReturnPart) -> AsyncIterator[BaseEvent]:
 tool_call_id = self._builtin_tool_call_ids[part.tool_call_id]
 yield ToolCallResultEvent(
 message_id=self.new_message_id(),
 type=EventType.TOOL_CALL_RESULT,
 role='tool',
 tool_call_id=tool_call_id,
 content=part.model_response_str(),
 )
 async defhandle_function_tool_result(self, event: FunctionToolResultEvent) -> AsyncIterator[BaseEvent]:
 result = event.result
 output = result.model_response() if isinstance(result, RetryPromptPart) else result.model_response_str()
 yield ToolCallResultEvent(
 message_id=self.new_message_id(),
 type=EventType.TOOL_CALL_RESULT,
 role='tool',
 tool_call_id=result.tool_call_id,
 content=output,
 )
 # ToolCallResultEvent.content may hold user parts (e.g. text, images) that AG-UI does not currently have events for
 if isinstance(result, ToolReturnPart):
 # Check for AG-UI events returned by tool calls.
 possible_event = result.metadata or result.content
 if isinstance(possible_event, BaseEvent):
 yield possible_event
 elif isinstance(possible_event, str | bytes): # pragma: no branch
 # Avoid iterable check for strings and bytes.
 pass
 elif isinstance(possible_event, Iterable): # pragma: no branch
 for item in possible_event: # type: ignore[reportUnknownMemberType]
 if isinstance(item, BaseEvent): # pragma: no branch
 yield item
```
---|--- 
AG-UI protocol integration for Pydantic AI agents.
### AGUIApp
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]`, `Starlette`
ASGI application for running Pydantic AI agents with AG-UI protocol support.
Source code in `pydantic_ai_slim/pydantic_ai/ui/ag_ui/app.py`
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
```
| ```
classAGUIApp(Generic[AgentDepsT, OutputDataT], Starlette):
"""ASGI application for running Pydantic AI agents with AG-UI protocol support."""
 def__init__(
 self,
 agent: AbstractAgent[AgentDepsT, OutputDataT],
 *,
 # AGUIAdapter.dispatch_request parameters
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
 on_complete: OnCompleteFunc[Any] | None = None,
 # Starlette parameters
 debug: bool = False,
 routes: Sequence[BaseRoute] | None = None,
 middleware: Sequence[Middleware] | None = None,
 exception_handlers: Mapping[Any, ExceptionHandler] | None = None,
 on_startup: Sequence[Callable[[], Any]] | None = None,
 on_shutdown: Sequence[Callable[[], Any]] | None = None,
 lifespan: Lifespan[Self] | None = None,
 ) -> None:
"""An ASGI application that handles every request by running the agent and streaming the response.
 Note that the `deps` will be the same for each request, with the exception of the frontend state that's
 injected into the `state` field of a `deps` object that implements the [`StateHandler`][pydantic_ai.ui.StateHandler] protocol.
 To provide different `deps` for each request (e.g. based on the authenticated user),
 use [`AGUIAdapter.run_stream()`][pydantic_ai.ui.ag_ui.AGUIAdapter.run_stream] or
 [`AGUIAdapter.dispatch_request()`][pydantic_ai.ui.ag_ui.AGUIAdapter.dispatch_request] instead.
 Args:
 agent: The agent to run.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has
 no output validators since output validators would expect an argument that matches the agent's
 output type.
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
 on_complete: Optional callback function called when the agent run completes successfully.
 The callback receives the completed [`AgentRunResult`][pydantic_ai.agent.AgentRunResult] and can access `all_messages()` and other result data.
 debug: Boolean indicating if debug tracebacks should be returned on errors.
 routes: A list of routes to serve incoming HTTP and WebSocket requests.
 middleware: A list of middleware to run for every request. A starlette application will always
 automatically include two middleware classes. `ServerErrorMiddleware` is added as the very
 outermost middleware, to handle any uncaught errors occurring anywhere in the entire stack.
 `ExceptionMiddleware` is added as the very innermost middleware, to deal with handled
 exception cases occurring in the routing or endpoints.
 exception_handlers: A mapping of either integer status codes, or exception class types onto
 callables which handle the exceptions. Exception handler callables should be of the form
 `handler(request, exc) -> response` and may be either standard functions, or async functions.
 on_startup: A list of callables to run on application startup. Startup handler callables do not
 take any arguments, and may be either standard functions, or async functions.
 on_shutdown: A list of callables to run on application shutdown. Shutdown handler callables do
 not take any arguments, and may be either standard functions, or async functions.
 lifespan: A lifespan context function, which can be used to perform startup and shutdown tasks.
 This is a newer style that replaces the `on_startup` and `on_shutdown` handlers. Use one or
 the other, not both.
 """
 super().__init__(
 debug=debug,
 routes=routes,
 middleware=middleware,
 exception_handlers=exception_handlers,
 on_startup=on_startup,
 on_shutdown=on_shutdown,
 lifespan=lifespan,
 )
 async defrun_agent(request: Request) -> Response:
"""Endpoint to run the agent with the provided input data."""
 # `dispatch_request` will store the frontend state from the request on `deps.state` (if it implements the `StateHandler` protocol),
 # so we need to copy the deps to avoid different requests mutating the same deps object.
 nonlocal deps
 if isinstance(deps, StateHandler): # pragma: no branch
 deps = replace(deps)
 return await AGUIAdapter[AgentDepsT, OutputDataT].dispatch_request(
 request,
 agent=agent,
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
 on_complete=on_complete,
 )
 self.router.add_route('/', run_agent, methods=['POST'])
```
---|--- 
#### __init__
```
__init__(
 agent: AbstractAgent[](../../agent/#pydantic_ai.agent.AbstractAgent "pydantic_ai.agent.AbstractAgent")[AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")],
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
 on_complete: OnCompleteFunc[](../base/#pydantic_ai.ui.OnCompleteFunc "pydantic_ai.ui.OnCompleteFunc")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = None,
 debug: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 routes: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[BaseRoute] | None = None,
 middleware: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[Middleware] | None = None,
 exception_handlers: (
 Mapping[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Mapping "collections.abc.Mapping")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any"), ExceptionHandler] | None
 ) = None,
 on_startup: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[], Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]] | None = None,
 on_shutdown: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[], Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]] | None = None,
 lifespan: Lifespan[Self[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Self "typing_extensions.Self")] | None = None
) -> None
```
An ASGI application that handles every request by running the agent and streaming the response.
Note that the `deps` will be the same for each request, with the exception of the frontend state that's injected into the `state` field of a `deps` object that implements the [`StateHandler`](../base/#pydantic_ai.ui.StateHandler) protocol. To provide different `deps` for each request (e.g. based on the authenticated user), use [`AGUIAdapter.run_stream()`](../base/#pydantic_ai.ui.UIAdapter.run_stream) or [`AGUIAdapter.dispatch_request()`](../base/#pydantic_ai.ui.UIAdapter.dispatch_request) instead.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
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
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools for this run. | `None` 
`on_complete` | `OnCompleteFunc[](../base/#pydantic_ai.ui.OnCompleteFunc "pydantic_ai.ui.OnCompleteFunc")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None` | Optional callback function called when the agent run completes successfully. The callback receives the completed [`AgentRunResult`](../../agent/#pydantic_ai.agent.AgentRunResult) and can access `all_messages()` and other result data. | `None` 
`debug` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Boolean indicating if debug tracebacks should be returned on errors. | `False` 
`routes` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[BaseRoute] | None` | A list of routes to serve incoming HTTP and WebSocket requests. | `None` 
`middleware` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[Middleware] | None` | A list of middleware to run for every request. A starlette application will always automatically include two middleware classes. `ServerErrorMiddleware` is added as the very outermost middleware, to handle any uncaught errors occurring anywhere in the entire stack. `ExceptionMiddleware` is added as the very innermost middleware, to deal with handled exception cases occurring in the routing or endpoints. | `None` 
`exception_handlers` | `Mapping[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Mapping "collections.abc.Mapping")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any"), ExceptionHandler] | None` | A mapping of either integer status codes, or exception class types onto callables which handle the exceptions. Exception handler callables should be of the form `handler(request, exc) -> response` and may be either standard functions, or async functions. | `None` 
`on_startup` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[], Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]] | None` | A list of callables to run on application startup. Startup handler callables do not take any arguments, and may be either standard functions, or async functions. | `None` 
`on_shutdown` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[], Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]] | None` | A list of callables to run on application shutdown. Shutdown handler callables do not take any arguments, and may be either standard functions, or async functions. | `None` 
`lifespan` | `Lifespan[Self[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Self "typing_extensions.Self")] | None` | A lifespan context function, which can be used to perform startup and shutdown tasks. This is a newer style that replaces the `on_startup` and `on_shutdown` handlers. Use one or the other, not both. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/ui/ag_ui/app.py`
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
```
| ```
def__init__(
 self,
 agent: AbstractAgent[AgentDepsT, OutputDataT],
 *,
 # AGUIAdapter.dispatch_request parameters
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
 on_complete: OnCompleteFunc[Any] | None = None,
 # Starlette parameters
 debug: bool = False,
 routes: Sequence[BaseRoute] | None = None,
 middleware: Sequence[Middleware] | None = None,
 exception_handlers: Mapping[Any, ExceptionHandler] | None = None,
 on_startup: Sequence[Callable[[], Any]] | None = None,
 on_shutdown: Sequence[Callable[[], Any]] | None = None,
 lifespan: Lifespan[Self] | None = None,
) -> None:
"""An ASGI application that handles every request by running the agent and streaming the response.
 Note that the `deps` will be the same for each request, with the exception of the frontend state that's
 injected into the `state` field of a `deps` object that implements the [`StateHandler`][pydantic_ai.ui.StateHandler] protocol.
 To provide different `deps` for each request (e.g. based on the authenticated user),
 use [`AGUIAdapter.run_stream()`][pydantic_ai.ui.ag_ui.AGUIAdapter.run_stream] or
 [`AGUIAdapter.dispatch_request()`][pydantic_ai.ui.ag_ui.AGUIAdapter.dispatch_request] instead.
 Args:
 agent: The agent to run.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has
 no output validators since output validators would expect an argument that matches the agent's
 output type.
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
 on_complete: Optional callback function called when the agent run completes successfully.
 The callback receives the completed [`AgentRunResult`][pydantic_ai.agent.AgentRunResult] and can access `all_messages()` and other result data.
 debug: Boolean indicating if debug tracebacks should be returned on errors.
 routes: A list of routes to serve incoming HTTP and WebSocket requests.
 middleware: A list of middleware to run for every request. A starlette application will always
 automatically include two middleware classes. `ServerErrorMiddleware` is added as the very
 outermost middleware, to handle any uncaught errors occurring anywhere in the entire stack.
 `ExceptionMiddleware` is added as the very innermost middleware, to deal with handled
 exception cases occurring in the routing or endpoints.
 exception_handlers: A mapping of either integer status codes, or exception class types onto
 callables which handle the exceptions. Exception handler callables should be of the form
 `handler(request, exc) -> response` and may be either standard functions, or async functions.
 on_startup: A list of callables to run on application startup. Startup handler callables do not
 take any arguments, and may be either standard functions, or async functions.
 on_shutdown: A list of callables to run on application shutdown. Shutdown handler callables do
 not take any arguments, and may be either standard functions, or async functions.
 lifespan: A lifespan context function, which can be used to perform startup and shutdown tasks.
 This is a newer style that replaces the `on_startup` and `on_shutdown` handlers. Use one or
 the other, not both.
 """
 super().__init__(
 debug=debug,
 routes=routes,
 middleware=middleware,
 exception_handlers=exception_handlers,
 on_startup=on_startup,
 on_shutdown=on_shutdown,
 lifespan=lifespan,
 )
 async defrun_agent(request: Request) -> Response:
"""Endpoint to run the agent with the provided input data."""
 # `dispatch_request` will store the frontend state from the request on `deps.state` (if it implements the `StateHandler` protocol),
 # so we need to copy the deps to avoid different requests mutating the same deps object.
 nonlocal deps
 if isinstance(deps, StateHandler): # pragma: no branch
 deps = replace(deps)
 return await AGUIAdapter[AgentDepsT, OutputDataT].dispatch_request(
 request,
 agent=agent,
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
 on_complete=on_complete,
 )
 self.router.add_route('/', run_agent, methods=['POST'])
```
---|---