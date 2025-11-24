[ Skip to content ](#pydantic_aiuivercel_ai)
# `pydantic_ai.ui.vercel_ai`
Vercel AI protocol adapter for Pydantic AI agents.
This module provides classes for integrating Pydantic AI agents with the Vercel AI protocol, enabling streaming event-based communication for interactive AI applications.
Converted to Python from: https://github.com/vercel/ai/blob/ai%405.0.34/packages/ai/src/ui/ui-messages.ts
### VercelAIAdapter `dataclass`
Bases: `UIAdapter[](../base/#pydantic_ai.ui.UIAdapter "pydantic_ai.ui.UIAdapter")[RequestData[](#pydantic_ai.ui.vercel_ai.request_types.RequestData "pydantic_ai.ui.vercel_ai.request_types.RequestData"), UIMessage[](#pydantic_ai.ui.vercel_ai.request_types.UIMessage "pydantic_ai.ui.vercel_ai.request_types.UIMessage"), BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk"), AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]`
UI adapter for the Vercel AI protocol.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/_adapter.py`
```
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
```
| ```
@dataclass
classVercelAIAdapter(UIAdapter[RequestData, UIMessage, BaseChunk, AgentDepsT, OutputDataT]):
"""UI adapter for the Vercel AI protocol."""
 @classmethod
 defbuild_run_input(cls, body: bytes) -> RequestData:
"""Build a Vercel AI run input object from the request body."""
 return request_data_ta.validate_json(body)
 defbuild_event_stream(self) -> UIEventStream[RequestData, BaseChunk, AgentDepsT, OutputDataT]:
"""Build a Vercel AI event stream transformer."""
 return VercelAIEventStream(self.run_input, accept=self.accept)
 @cached_property
 defmessages(self) -> list[ModelMessage]:
"""Pydantic AI messages from the Vercel AI run input."""
 return self.load_messages(self.run_input.messages)
 @classmethod
 defload_messages(cls, messages: Sequence[UIMessage]) -> list[ModelMessage]: # noqa: C901
"""Transform Vercel AI messages into Pydantic AI messages."""
 builder = MessagesBuilder()
 for msg in messages:
 if msg.role == 'system':
 for part in msg.parts:
 if isinstance(part, TextUIPart):
 builder.add(SystemPromptPart(content=part.text))
 else: # pragma: no cover
 raise ValueError(f'Unsupported system message part type: {type(part)}')
 elif msg.role == 'user':
 user_prompt_content: str | list[UserContent] = []
 for part in msg.parts:
 if isinstance(part, TextUIPart):
 user_prompt_content.append(part.text)
 elif isinstance(part, FileUIPart):
 try:
 file = BinaryContent.from_data_uri(part.url)
 except ValueError:
 media_type_prefix = part.media_type.split('/', 1)[0]
 match media_type_prefix:
 case 'image':
 file = ImageUrl(url=part.url, media_type=part.media_type)
 case 'video':
 file = VideoUrl(url=part.url, media_type=part.media_type)
 case 'audio':
 file = AudioUrl(url=part.url, media_type=part.media_type)
 case_:
 file = DocumentUrl(url=part.url, media_type=part.media_type)
 user_prompt_content.append(file)
 else: # pragma: no cover
 raise ValueError(f'Unsupported user message part type: {type(part)}')
 if user_prompt_content: # pragma: no branch
 if len(user_prompt_content) == 1 and isinstance(user_prompt_content[0], str):
 user_prompt_content = user_prompt_content[0]
 builder.add(UserPromptPart(content=user_prompt_content))
 elif msg.role == 'assistant':
 for part in msg.parts:
 if isinstance(part, TextUIPart):
 builder.add(TextPart(content=part.text))
 elif isinstance(part, ReasoningUIPart):
 builder.add(ThinkingPart(content=part.text))
 elif isinstance(part, FileUIPart):
 try:
 file = BinaryContent.from_data_uri(part.url)
 except ValueError as e: # pragma: no cover
 # We don't yet handle non-data-URI file URLs returned by assistants, as no Pydantic AI models do this.
 raise ValueError(
 'Vercel AI integration can currently only handle assistant file parts with data URIs.'
 ) frome
 builder.add(FilePart(content=file))
 elif isinstance(part, ToolUIPart | DynamicToolUIPart):
 if isinstance(part, DynamicToolUIPart):
 tool_name = part.tool_name
 builtin_tool = False
 else:
 tool_name = part.type.removeprefix('tool-')
 builtin_tool = part.provider_executed
 tool_call_id = part.tool_call_id
 args = part.input
 if builtin_tool:
 call_part = BuiltinToolCallPart(tool_name=tool_name, tool_call_id=tool_call_id, args=args)
 builder.add(call_part)
 if isinstance(part, ToolOutputAvailablePart | ToolOutputErrorPart):
 if part.state == 'output-available':
 output = part.output
 else:
 output = {'error_text': part.error_text, 'is_error': True}
 provider_name = (
 (part.call_provider_metadata or {}).get('pydantic_ai', {}).get('provider_name')
 )
 call_part.provider_name = provider_name
 builder.add(
 BuiltinToolReturnPart(
 tool_name=tool_name,
 tool_call_id=tool_call_id,
 content=output,
 provider_name=provider_name,
 )
 )
 else:
 builder.add(ToolCallPart(tool_name=tool_name, tool_call_id=tool_call_id, args=args))
 if part.state == 'output-available':
 builder.add(
 ToolReturnPart(tool_name=tool_name, tool_call_id=tool_call_id, content=part.output)
 )
 elif part.state == 'output-error':
 builder.add(
 RetryPromptPart(
 tool_name=tool_name, tool_call_id=tool_call_id, content=part.error_text
 )
 )
 elif isinstance(part, DataUIPart): # pragma: no cover
 # Contains custom data that shouldn't be sent to the model
 pass
 elif isinstance(part, SourceUrlUIPart): # pragma: no cover
 # TODO: Once we support citations: https://github.com/pydantic/pydantic-ai/issues/3126
 pass
 elif isinstance(part, SourceDocumentUIPart): # pragma: no cover
 # TODO: Once we support citations: https://github.com/pydantic/pydantic-ai/issues/3126
 pass
 elif isinstance(part, StepStartUIPart): # pragma: no cover
 # Nothing to do here
 pass
 else:
 assert_never(part)
 else:
 assert_never(msg.role)
 return builder.messages
```
---|--- 
#### build_run_input `classmethod`
```
build_run_input(body: bytes[](https://docs.python.org/3/library/stdtypes.html#bytes)) -> RequestData[](#pydantic_ai.ui.vercel_ai.request_types.RequestData "pydantic_ai.ui.vercel_ai.request_types.RequestData")
```
Build a Vercel AI run input object from the request body.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/_adapter.py`
```
66
67
68
69
```
| ```
@classmethod
defbuild_run_input(cls, body: bytes) -> RequestData:
"""Build a Vercel AI run input object from the request body."""
 return request_data_ta.validate_json(body)
```
---|--- 
#### build_event_stream
```
build_event_stream() -> (
 UIEventStream[](../base/#pydantic_ai.ui.UIEventStream "pydantic_ai.ui.UIEventStream")[
 RequestData[](#pydantic_ai.ui.vercel_ai.request_types.RequestData "pydantic_ai.ui.vercel_ai.request_types.RequestData"), BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk"), AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")
 ]
)
```
Build a Vercel AI event stream transformer.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/_adapter.py`
```
71
72
73
```
| ```
defbuild_event_stream(self) -> UIEventStream[RequestData, BaseChunk, AgentDepsT, OutputDataT]:
"""Build a Vercel AI event stream transformer."""
 return VercelAIEventStream(self.run_input, accept=self.accept)
```
---|--- 
#### messages `cached` `property`
```
messages: list[](https://docs.python.org/3/library/stdtypes.html#list)[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")]
```
Pydantic AI messages from the Vercel AI run input.
#### load_messages `classmethod`
```
load_messages(
 messages: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UIMessage[](#pydantic_ai.ui.vercel_ai.request_types.UIMessage "pydantic_ai.ui.vercel_ai.request_types.UIMessage")],
) -> list[](https://docs.python.org/3/library/stdtypes.html#list)[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")]
```
Transform Vercel AI messages into Pydantic AI messages.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/_adapter.py`
```
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
```
| ```
@classmethod
defload_messages(cls, messages: Sequence[UIMessage]) -> list[ModelMessage]: # noqa: C901
"""Transform Vercel AI messages into Pydantic AI messages."""
 builder = MessagesBuilder()
 for msg in messages:
 if msg.role == 'system':
 for part in msg.parts:
 if isinstance(part, TextUIPart):
 builder.add(SystemPromptPart(content=part.text))
 else: # pragma: no cover
 raise ValueError(f'Unsupported system message part type: {type(part)}')
 elif msg.role == 'user':
 user_prompt_content: str | list[UserContent] = []
 for part in msg.parts:
 if isinstance(part, TextUIPart):
 user_prompt_content.append(part.text)
 elif isinstance(part, FileUIPart):
 try:
 file = BinaryContent.from_data_uri(part.url)
 except ValueError:
 media_type_prefix = part.media_type.split('/', 1)[0]
 match media_type_prefix:
 case 'image':
 file = ImageUrl(url=part.url, media_type=part.media_type)
 case 'video':
 file = VideoUrl(url=part.url, media_type=part.media_type)
 case 'audio':
 file = AudioUrl(url=part.url, media_type=part.media_type)
 case_:
 file = DocumentUrl(url=part.url, media_type=part.media_type)
 user_prompt_content.append(file)
 else: # pragma: no cover
 raise ValueError(f'Unsupported user message part type: {type(part)}')
 if user_prompt_content: # pragma: no branch
 if len(user_prompt_content) == 1 and isinstance(user_prompt_content[0], str):
 user_prompt_content = user_prompt_content[0]
 builder.add(UserPromptPart(content=user_prompt_content))
 elif msg.role == 'assistant':
 for part in msg.parts:
 if isinstance(part, TextUIPart):
 builder.add(TextPart(content=part.text))
 elif isinstance(part, ReasoningUIPart):
 builder.add(ThinkingPart(content=part.text))
 elif isinstance(part, FileUIPart):
 try:
 file = BinaryContent.from_data_uri(part.url)
 except ValueError as e: # pragma: no cover
 # We don't yet handle non-data-URI file URLs returned by assistants, as no Pydantic AI models do this.
 raise ValueError(
 'Vercel AI integration can currently only handle assistant file parts with data URIs.'
 ) frome
 builder.add(FilePart(content=file))
 elif isinstance(part, ToolUIPart | DynamicToolUIPart):
 if isinstance(part, DynamicToolUIPart):
 tool_name = part.tool_name
 builtin_tool = False
 else:
 tool_name = part.type.removeprefix('tool-')
 builtin_tool = part.provider_executed
 tool_call_id = part.tool_call_id
 args = part.input
 if builtin_tool:
 call_part = BuiltinToolCallPart(tool_name=tool_name, tool_call_id=tool_call_id, args=args)
 builder.add(call_part)
 if isinstance(part, ToolOutputAvailablePart | ToolOutputErrorPart):
 if part.state == 'output-available':
 output = part.output
 else:
 output = {'error_text': part.error_text, 'is_error': True}
 provider_name = (
 (part.call_provider_metadata or {}).get('pydantic_ai', {}).get('provider_name')
 )
 call_part.provider_name = provider_name
 builder.add(
 BuiltinToolReturnPart(
 tool_name=tool_name,
 tool_call_id=tool_call_id,
 content=output,
 provider_name=provider_name,
 )
 )
 else:
 builder.add(ToolCallPart(tool_name=tool_name, tool_call_id=tool_call_id, args=args))
 if part.state == 'output-available':
 builder.add(
 ToolReturnPart(tool_name=tool_name, tool_call_id=tool_call_id, content=part.output)
 )
 elif part.state == 'output-error':
 builder.add(
 RetryPromptPart(
 tool_name=tool_name, tool_call_id=tool_call_id, content=part.error_text
 )
 )
 elif isinstance(part, DataUIPart): # pragma: no cover
 # Contains custom data that shouldn't be sent to the model
 pass
 elif isinstance(part, SourceUrlUIPart): # pragma: no cover
 # TODO: Once we support citations: https://github.com/pydantic/pydantic-ai/issues/3126
 pass
 elif isinstance(part, SourceDocumentUIPart): # pragma: no cover
 # TODO: Once we support citations: https://github.com/pydantic/pydantic-ai/issues/3126
 pass
 elif isinstance(part, StepStartUIPart): # pragma: no cover
 # Nothing to do here
 pass
 else:
 assert_never(part)
 else:
 assert_never(msg.role)
 return builder.messages
```
---|--- 
### VercelAIEventStream `dataclass`
Bases: `UIEventStream[](../base/#pydantic_ai.ui.UIEventStream "pydantic_ai.ui.UIEventStream")[RequestData[](#pydantic_ai.ui.vercel_ai.request_types.RequestData "pydantic_ai.ui.vercel_ai.request_types.RequestData"), BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk"), AgentDepsT[](../../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]`
UI event stream transformer for the Vercel AI protocol.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/_event_stream.py`
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
```
| ```
@dataclass
classVercelAIEventStream(UIEventStream[RequestData, BaseChunk, AgentDepsT, OutputDataT]):
"""UI event stream transformer for the Vercel AI protocol."""
 _step_started: bool = False
 @property
 defresponse_headers(self) -> Mapping[str, str] | None:
 return VERCEL_AI_DSP_HEADERS
 defencode_event(self, event: BaseChunk) -> str:
 return f'data: {event.encode()}\n\n'
 async defbefore_stream(self) -> AsyncIterator[BaseChunk]:
 yield StartChunk()
 async defbefore_response(self) -> AsyncIterator[BaseChunk]:
 if self._step_started:
 yield FinishStepChunk()
 self._step_started = True
 yield StartStepChunk()
 async defafter_stream(self) -> AsyncIterator[BaseChunk]:
 yield FinishStepChunk()
 yield FinishChunk()
 yield DoneChunk()
 async defon_error(self, error: Exception) -> AsyncIterator[BaseChunk]:
 yield ErrorChunk(error_text=str(error))
 async defhandle_text_start(self, part: TextPart, follows_text: bool = False) -> AsyncIterator[BaseChunk]:
 if follows_text:
 message_id = self.message_id
 else:
 message_id = self.new_message_id()
 yield TextStartChunk(id=message_id)
 if part.content:
 yield TextDeltaChunk(id=message_id, delta=part.content)
 async defhandle_text_delta(self, delta: TextPartDelta) -> AsyncIterator[BaseChunk]:
 if delta.content_delta: # pragma: no branch
 yield TextDeltaChunk(id=self.message_id, delta=delta.content_delta)
 async defhandle_text_end(self, part: TextPart, followed_by_text: bool = False) -> AsyncIterator[BaseChunk]:
 if not followed_by_text:
 yield TextEndChunk(id=self.message_id)
 async defhandle_thinking_start(
 self, part: ThinkingPart, follows_thinking: bool = False
 ) -> AsyncIterator[BaseChunk]:
 message_id = self.new_message_id()
 yield ReasoningStartChunk(id=message_id)
 if part.content:
 yield ReasoningDeltaChunk(id=message_id, delta=part.content)
 async defhandle_thinking_delta(self, delta: ThinkingPartDelta) -> AsyncIterator[BaseChunk]:
 if delta.content_delta: # pragma: no branch
 yield ReasoningDeltaChunk(id=self.message_id, delta=delta.content_delta)
 async defhandle_thinking_end(
 self, part: ThinkingPart, followed_by_thinking: bool = False
 ) -> AsyncIterator[BaseChunk]:
 yield ReasoningEndChunk(id=self.message_id)
 defhandle_tool_call_start(self, part: ToolCallPart | BuiltinToolCallPart) -> AsyncIterator[BaseChunk]:
 return self._handle_tool_call_start(part)
 defhandle_builtin_tool_call_start(self, part: BuiltinToolCallPart) -> AsyncIterator[BaseChunk]:
 return self._handle_tool_call_start(part, provider_executed=True)
 async def_handle_tool_call_start(
 self,
 part: ToolCallPart | BuiltinToolCallPart,
 tool_call_id: str | None = None,
 provider_executed: bool | None = None,
 ) -> AsyncIterator[BaseChunk]:
 tool_call_id = tool_call_id or part.tool_call_id
 yield ToolInputStartChunk(
 tool_call_id=tool_call_id,
 tool_name=part.tool_name,
 provider_executed=provider_executed,
 )
 if part.args:
 yield ToolInputDeltaChunk(tool_call_id=tool_call_id, input_text_delta=part.args_as_json_str())
 async defhandle_tool_call_delta(self, delta: ToolCallPartDelta) -> AsyncIterator[BaseChunk]:
 tool_call_id = delta.tool_call_id or ''
 assert tool_call_id, '`ToolCallPartDelta.tool_call_id` must be set'
 yield ToolInputDeltaChunk(
 tool_call_id=tool_call_id,
 input_text_delta=delta.args_delta if isinstance(delta.args_delta, str) else _json_dumps(delta.args_delta),
 )
 async defhandle_tool_call_end(self, part: ToolCallPart) -> AsyncIterator[BaseChunk]:
 yield ToolInputAvailableChunk(tool_call_id=part.tool_call_id, tool_name=part.tool_name, input=part.args)
 async defhandle_builtin_tool_call_end(self, part: BuiltinToolCallPart) -> AsyncIterator[BaseChunk]:
 yield ToolInputAvailableChunk(
 tool_call_id=part.tool_call_id,
 tool_name=part.tool_name,
 input=part.args,
 provider_executed=True,
 provider_metadata={'pydantic_ai': {'provider_name': part.provider_name}},
 )
 async defhandle_builtin_tool_return(self, part: BuiltinToolReturnPart) -> AsyncIterator[BaseChunk]:
 yield ToolOutputAvailableChunk(
 tool_call_id=part.tool_call_id,
 output=part.content,
 provider_executed=True,
 )
 async defhandle_file(self, part: FilePart) -> AsyncIterator[BaseChunk]:
 file = part.content
 yield FileChunk(url=file.data_uri, media_type=file.media_type)
 async defhandle_function_tool_result(self, event: FunctionToolResultEvent) -> AsyncIterator[BaseChunk]:
 result = event.result
 if isinstance(result, RetryPromptPart):
 yield ToolOutputErrorChunk(tool_call_id=result.tool_call_id, error_text=result.model_response())
 else:
 yield ToolOutputAvailableChunk(tool_call_id=result.tool_call_id, output=result.content)
```
---|--- 
Vercel AI request types (UI messages).
Converted to Python from: https://github.com/vercel/ai/blob/ai%405.0.59/packages/ai/src/ui/ui-messages.ts
### ProviderMetadata `module-attribute`
```
ProviderMetadata = dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), JSONValue]]
```
Provider metadata.
### BaseUIPart
Bases: `CamelBaseModel`, `ABC[](https://docs.python.org/3/library/abc.html#abc.ABC "abc.ABC")`
Abstract base class for all UI parts.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/request_types.py`
```
20
21
```
| ```
classBaseUIPart(CamelBaseModel, ABC):
"""Abstract base class for all UI parts."""
```
---|--- 
### TextUIPart
Bases: `BaseUIPart[](#pydantic_ai.ui.vercel_ai.request_types.BaseUIPart "pydantic_ai.ui.vercel_ai.request_types.BaseUIPart")`
A text part of a message.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/request_types.py`
```
24
25
26
27
28
29
30
31
32
33
34
35
36
```
| ```
classTextUIPart(BaseUIPart):
"""A text part of a message."""
 type: Literal['text'] = 'text'
 text: str
"""The text content."""
 state: Literal['streaming', 'done'] | None = None
"""The state of the text part."""
 provider_metadata: ProviderMetadata | None = None
"""The provider metadata."""
```
---|--- 
#### text `instance-attribute`
```
text: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The text content.
#### state `class-attribute` `instance-attribute`
```
state: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['streaming', 'done'] | None = None
```
The state of the text part.
#### provider_metadata `class-attribute` `instance-attribute`
```
provider_metadata: ProviderMetadata[](#pydantic_ai.ui.vercel_ai.request_types.ProviderMetadata "pydantic_ai.ui.vercel_ai.request_types.ProviderMetadata") | None = None
```
The provider metadata.
### ReasoningUIPart
Bases: `BaseUIPart[](#pydantic_ai.ui.vercel_ai.request_types.BaseUIPart "pydantic_ai.ui.vercel_ai.request_types.BaseUIPart")`
A reasoning part of a message.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/request_types.py`
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
```
| ```
classReasoningUIPart(BaseUIPart):
"""A reasoning part of a message."""
 type: Literal['reasoning'] = 'reasoning'
 text: str
"""The reasoning text."""
 state: Literal['streaming', 'done'] | None = None
"""The state of the reasoning part."""
 provider_metadata: ProviderMetadata | None = None
"""The provider metadata."""
```
---|--- 
#### text `instance-attribute`
```
text: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The reasoning text.
#### state `class-attribute` `instance-attribute`
```
state: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['streaming', 'done'] | None = None
```
The state of the reasoning part.
#### provider_metadata `class-attribute` `instance-attribute`
```
provider_metadata: ProviderMetadata[](#pydantic_ai.ui.vercel_ai.request_types.ProviderMetadata "pydantic_ai.ui.vercel_ai.request_types.ProviderMetadata") | None = None
```
The provider metadata.
### SourceUrlUIPart
Bases: `BaseUIPart[](#pydantic_ai.ui.vercel_ai.request_types.BaseUIPart "pydantic_ai.ui.vercel_ai.request_types.BaseUIPart")`
A source part of a message.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/request_types.py`
```
54
55
56
57
58
59
60
61
```
| ```
classSourceUrlUIPart(BaseUIPart):
"""A source part of a message."""
 type: Literal['source-url'] = 'source-url'
 source_id: str
 url: str
 title: str | None = None
 provider_metadata: ProviderMetadata | None = None
```
---|--- 
### SourceDocumentUIPart
Bases: `BaseUIPart[](#pydantic_ai.ui.vercel_ai.request_types.BaseUIPart "pydantic_ai.ui.vercel_ai.request_types.BaseUIPart")`
A document source part of a message.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/request_types.py`
```
64
65
66
67
68
69
70
71
72
```
| ```
classSourceDocumentUIPart(BaseUIPart):
"""A document source part of a message."""
 type: Literal['source-document'] = 'source-document'
 source_id: str
 media_type: str
 title: str
 filename: str | None = None
 provider_metadata: ProviderMetadata | None = None
```
---|--- 
### FileUIPart
Bases: `BaseUIPart[](#pydantic_ai.ui.vercel_ai.request_types.BaseUIPart "pydantic_ai.ui.vercel_ai.request_types.BaseUIPart")`
A file part of a message.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/request_types.py`
```
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
```
| ```
classFileUIPart(BaseUIPart):
"""A file part of a message."""
 type: Literal['file'] = 'file'
 media_type: str
"""
 IANA media type of the file.
 @see https://www.iana.org/assignments/media-types/media-types.xhtml
 """
 filename: str | None = None
"""Optional filename of the file."""
 url: str
"""
 The URL of the file.
 It can either be a URL to a hosted file or a [Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs).
 """
 provider_metadata: ProviderMetadata | None = None
"""The provider metadata."""
```
---|--- 
#### media_type `instance-attribute`
```
media_type: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
IANA media type of the file. @see https://www.iana.org/assignments/media-types/media-types.xhtml
#### filename `class-attribute` `instance-attribute`
```
filename: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
Optional filename of the file.
#### url `instance-attribute`
```
url: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The URL of the file. It can either be a URL to a hosted file or a [Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs).
#### provider_metadata `class-attribute` `instance-attribute`
```
provider_metadata: ProviderMetadata[](#pydantic_ai.ui.vercel_ai.request_types.ProviderMetadata "pydantic_ai.ui.vercel_ai.request_types.ProviderMetadata") | None = None
```
The provider metadata.
### StepStartUIPart
Bases: `BaseUIPart[](#pydantic_ai.ui.vercel_ai.request_types.BaseUIPart "pydantic_ai.ui.vercel_ai.request_types.BaseUIPart")`
A step boundary part of a message.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/request_types.py`
```
 99
100
101
102
```
| ```
classStepStartUIPart(BaseUIPart):
"""A step boundary part of a message."""
 type: Literal['step-start'] = 'step-start'
```
---|--- 
### DataUIPart
Bases: `BaseUIPart[](#pydantic_ai.ui.vercel_ai.request_types.BaseUIPart "pydantic_ai.ui.vercel_ai.request_types.BaseUIPart")`
Data part with dynamic type based on data name.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/request_types.py`
```
105
106
107
108
109
110
```
| ```
classDataUIPart(BaseUIPart):
"""Data part with dynamic type based on data name."""
 type: Annotated[str, Field(pattern=r'^data-')]
 id: str | None = None
 data: Any
```
---|--- 
### ToolInputStreamingPart
Bases: `BaseUIPart[](#pydantic_ai.ui.vercel_ai.request_types.BaseUIPart "pydantic_ai.ui.vercel_ai.request_types.BaseUIPart")`
Tool part in input-streaming state.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/request_types.py`
```
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
classToolInputStreamingPart(BaseUIPart):
"""Tool part in input-streaming state."""
 type: Annotated[str, Field(pattern=r'^tool-')]
 tool_call_id: str
 state: Literal['input-streaming'] = 'input-streaming'
 input: Any | None = None
 provider_executed: bool | None = None
```
---|--- 
### ToolInputAvailablePart
Bases: `BaseUIPart[](#pydantic_ai.ui.vercel_ai.request_types.BaseUIPart "pydantic_ai.ui.vercel_ai.request_types.BaseUIPart")`
Tool part in input-available state.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/request_types.py`
```
124
125
126
127
128
129
130
131
132
```
| ```
classToolInputAvailablePart(BaseUIPart):
"""Tool part in input-available state."""
 type: Annotated[str, Field(pattern=r'^tool-')]
 tool_call_id: str
 state: Literal['input-available'] = 'input-available'
 input: Any | None = None
 provider_executed: bool | None = None
 call_provider_metadata: ProviderMetadata | None = None
```
---|--- 
### ToolOutputAvailablePart
Bases: `BaseUIPart[](#pydantic_ai.ui.vercel_ai.request_types.BaseUIPart "pydantic_ai.ui.vercel_ai.request_types.BaseUIPart")`
Tool part in output-available state.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/request_types.py`
```
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
```
| ```
classToolOutputAvailablePart(BaseUIPart):
"""Tool part in output-available state."""
 type: Annotated[str, Field(pattern=r'^tool-')]
 tool_call_id: str
 state: Literal['output-available'] = 'output-available'
 input: Any | None = None
 output: Any | None = None
 provider_executed: bool | None = None
 call_provider_metadata: ProviderMetadata | None = None
 preliminary: bool | None = None
```
---|--- 
### ToolOutputErrorPart
Bases: `BaseUIPart[](#pydantic_ai.ui.vercel_ai.request_types.BaseUIPart "pydantic_ai.ui.vercel_ai.request_types.BaseUIPart")`
Tool part in output-error state.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/request_types.py`
```
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
```
| ```
classToolOutputErrorPart(BaseUIPart):
"""Tool part in output-error state."""
 type: Annotated[str, Field(pattern=r'^tool-')]
 tool_call_id: str
 state: Literal['output-error'] = 'output-error'
 input: Any | None = None
 raw_input: Any | None = None
 error_text: str
 provider_executed: bool | None = None
 call_provider_metadata: ProviderMetadata | None = None
```
---|--- 
### ToolUIPart `module-attribute`
```
ToolUIPart = (
 ToolInputStreamingPart[](#pydantic_ai.ui.vercel_ai.request_types.ToolInputStreamingPart "pydantic_ai.ui.vercel_ai.request_types.ToolInputStreamingPart")
 | ToolInputAvailablePart[](#pydantic_ai.ui.vercel_ai.request_types.ToolInputAvailablePart "pydantic_ai.ui.vercel_ai.request_types.ToolInputAvailablePart")
 | ToolOutputAvailablePart[](#pydantic_ai.ui.vercel_ai.request_types.ToolOutputAvailablePart "pydantic_ai.ui.vercel_ai.request_types.ToolOutputAvailablePart")
 | ToolOutputErrorPart[](#pydantic_ai.ui.vercel_ai.request_types.ToolOutputErrorPart "pydantic_ai.ui.vercel_ai.request_types.ToolOutputErrorPart")
)
```
Union of all tool part types.
### DynamicToolInputStreamingPart
Bases: `BaseUIPart[](#pydantic_ai.ui.vercel_ai.request_types.BaseUIPart "pydantic_ai.ui.vercel_ai.request_types.BaseUIPart")`
Dynamic tool part in input-streaming state.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/request_types.py`
```
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
classDynamicToolInputStreamingPart(BaseUIPart):
"""Dynamic tool part in input-streaming state."""
 type: Literal['dynamic-tool'] = 'dynamic-tool'
 tool_name: str
 tool_call_id: str
 state: Literal['input-streaming'] = 'input-streaming'
 input: Any | None = None
```
---|--- 
### DynamicToolInputAvailablePart
Bases: `BaseUIPart[](#pydantic_ai.ui.vercel_ai.request_types.BaseUIPart "pydantic_ai.ui.vercel_ai.request_types.BaseUIPart")`
Dynamic tool part in input-available state.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/request_types.py`
```
176
177
178
179
180
181
182
183
184
```
| ```
classDynamicToolInputAvailablePart(BaseUIPart):
"""Dynamic tool part in input-available state."""
 type: Literal['dynamic-tool'] = 'dynamic-tool'
 tool_name: str
 tool_call_id: str
 state: Literal['input-available'] = 'input-available'
 input: Any
 call_provider_metadata: ProviderMetadata | None = None
```
---|--- 
### DynamicToolOutputAvailablePart
Bases: `BaseUIPart[](#pydantic_ai.ui.vercel_ai.request_types.BaseUIPart "pydantic_ai.ui.vercel_ai.request_types.BaseUIPart")`
Dynamic tool part in output-available state.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/request_types.py`
```
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
classDynamicToolOutputAvailablePart(BaseUIPart):
"""Dynamic tool part in output-available state."""
 type: Literal['dynamic-tool'] = 'dynamic-tool'
 tool_name: str
 tool_call_id: str
 state: Literal['output-available'] = 'output-available'
 input: Any
 output: Any
 call_provider_metadata: ProviderMetadata | None = None
 preliminary: bool | None = None
```
---|--- 
### DynamicToolOutputErrorPart
Bases: `BaseUIPart[](#pydantic_ai.ui.vercel_ai.request_types.BaseUIPart "pydantic_ai.ui.vercel_ai.request_types.BaseUIPart")`
Dynamic tool part in output-error state.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/request_types.py`
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
```
| ```
classDynamicToolOutputErrorPart(BaseUIPart):
"""Dynamic tool part in output-error state."""
 type: Literal['dynamic-tool'] = 'dynamic-tool'
 tool_name: str
 tool_call_id: str
 state: Literal['output-error'] = 'output-error'
 input: Any
 error_text: str
 call_provider_metadata: ProviderMetadata | None = None
```
---|--- 
### DynamicToolUIPart `module-attribute`
```
DynamicToolUIPart = (
 DynamicToolInputStreamingPart[](#pydantic_ai.ui.vercel_ai.request_types.DynamicToolInputStreamingPart "pydantic_ai.ui.vercel_ai.request_types.DynamicToolInputStreamingPart")
 | DynamicToolInputAvailablePart[](#pydantic_ai.ui.vercel_ai.request_types.DynamicToolInputAvailablePart "pydantic_ai.ui.vercel_ai.request_types.DynamicToolInputAvailablePart")
 | DynamicToolOutputAvailablePart[](#pydantic_ai.ui.vercel_ai.request_types.DynamicToolOutputAvailablePart "pydantic_ai.ui.vercel_ai.request_types.DynamicToolOutputAvailablePart")
 | DynamicToolOutputErrorPart[](#pydantic_ai.ui.vercel_ai.request_types.DynamicToolOutputErrorPart "pydantic_ai.ui.vercel_ai.request_types.DynamicToolOutputErrorPart")
)
```
Union of all dynamic tool part types.
### UIMessagePart `module-attribute`
```
UIMessagePart = (
 TextUIPart[](#pydantic_ai.ui.vercel_ai.request_types.TextUIPart "pydantic_ai.ui.vercel_ai.request_types.TextUIPart")
 | ReasoningUIPart[](#pydantic_ai.ui.vercel_ai.request_types.ReasoningUIPart "pydantic_ai.ui.vercel_ai.request_types.ReasoningUIPart")
 | ToolUIPart[](#pydantic_ai.ui.vercel_ai.request_types.ToolUIPart "pydantic_ai.ui.vercel_ai.request_types.ToolUIPart")
 | DynamicToolUIPart[](#pydantic_ai.ui.vercel_ai.request_types.DynamicToolUIPart "pydantic_ai.ui.vercel_ai.request_types.DynamicToolUIPart")
 | SourceUrlUIPart[](#pydantic_ai.ui.vercel_ai.request_types.SourceUrlUIPart "pydantic_ai.ui.vercel_ai.request_types.SourceUrlUIPart")
 | SourceDocumentUIPart[](#pydantic_ai.ui.vercel_ai.request_types.SourceDocumentUIPart "pydantic_ai.ui.vercel_ai.request_types.SourceDocumentUIPart")
 | FileUIPart[](#pydantic_ai.ui.vercel_ai.request_types.FileUIPart "pydantic_ai.ui.vercel_ai.request_types.FileUIPart")
 | DataUIPart[](#pydantic_ai.ui.vercel_ai.request_types.DataUIPart "pydantic_ai.ui.vercel_ai.request_types.DataUIPart")
 | StepStartUIPart[](#pydantic_ai.ui.vercel_ai.request_types.StepStartUIPart "pydantic_ai.ui.vercel_ai.request_types.StepStartUIPart")
)
```
Union of all message part types.
### UIMessage
Bases: `CamelBaseModel`
A message as displayed in the UI by Vercel AI Elements.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/request_types.py`
```
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
```
| ```
classUIMessage(CamelBaseModel):
"""A message as displayed in the UI by Vercel AI Elements."""
 id: str
"""A unique identifier for the message."""
 role: Literal['system', 'user', 'assistant']
"""The role of the message."""
 metadata: Any | None = None
"""The metadata of the message."""
 parts: list[UIMessagePart]
"""
 The parts of the message. Use this for rendering the message in the UI.
 System messages should be avoided (set the system prompt on the server instead).
 They can have text parts.
 User messages can have text parts and file parts.
 Assistant messages can have text, reasoning, tool invocation, and file parts.
 """
```
---|--- 
#### id `instance-attribute`
```
id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
A unique identifier for the message.
#### role `instance-attribute`
```
role: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['system', 'user', 'assistant']
```
The role of the message.
#### metadata `class-attribute` `instance-attribute`
```
metadata: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any") | None = None
```
The metadata of the message.
#### parts `instance-attribute`
```
parts: list[](https://docs.python.org/3/library/stdtypes.html#list)[UIMessagePart[](#pydantic_ai.ui.vercel_ai.request_types.UIMessagePart "pydantic_ai.ui.vercel_ai.request_types.UIMessagePart")]
```
The parts of the message. Use this for rendering the message in the UI. System messages should be avoided (set the system prompt on the server instead). They can have text parts. User messages can have text parts and file parts. Assistant messages can have text, reasoning, tool invocation, and file parts.
### SubmitMessage
Bases: `CamelBaseModel`
Submit message request.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/request_types.py`
```
257
258
259
260
261
262
```
| ```
classSubmitMessage(CamelBaseModel, extra='allow'):
"""Submit message request."""
 trigger: Literal['submit-message'] = 'submit-message'
 id: str
 messages: list[UIMessage]
```
---|--- 
### RegenerateMessage
Bases: `CamelBaseModel`
Ask the agent to regenerate a message.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/request_types.py`
```
265
266
267
268
269
270
271
```
| ```
classRegenerateMessage(CamelBaseModel, extra='allow'):
"""Ask the agent to regenerate a message."""
 trigger: Literal['regenerate-message']
 id: str
 messages: list[UIMessage]
 message_id: str
```
---|--- 
### RequestData `module-attribute`
```
RequestData = Annotated[](https://docs.python.org/3/library/typing.html#typing.Annotated "typing.Annotated")[
 SubmitMessage[](#pydantic_ai.ui.vercel_ai.request_types.SubmitMessage "pydantic_ai.ui.vercel_ai.request_types.SubmitMessage") | RegenerateMessage[](#pydantic_ai.ui.vercel_ai.request_types.RegenerateMessage "pydantic_ai.ui.vercel_ai.request_types.RegenerateMessage"),
 Discriminator[](https://docs.pydantic.dev/latest/api/types/#pydantic.types.Discriminator "pydantic.Discriminator")("trigger"),
]
```
Union of all request data types.
Vercel AI response types (SSE chunks).
Converted to Python from: https://github.com/vercel/ai/blob/ai%405.0.59/packages/ai/src/ui-message-stream/ui-message-chunks.ts
### ProviderMetadata `module-attribute`
```
ProviderMetadata = dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), JSONValue]]
```
Provider metadata.
### BaseChunk
Bases: `CamelBaseModel`, `ABC[](https://docs.python.org/3/library/abc.html#abc.ABC "abc.ABC")`
Abstract base class for response SSE events.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
20
21
22
23
24
```
| ```
classBaseChunk(CamelBaseModel, ABC):
"""Abstract base class for response SSE events."""
 defencode(self) -> str:
 return self.model_dump_json(by_alias=True, exclude_none=True)
```
---|--- 
### TextStartChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Text start chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
27
28
29
30
31
32
```
| ```
classTextStartChunk(BaseChunk):
"""Text start chunk."""
 type: Literal['text-start'] = 'text-start'
 id: str
 provider_metadata: ProviderMetadata | None = None
```
---|--- 
### TextDeltaChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Text delta chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
35
36
37
38
39
40
41
```
| ```
classTextDeltaChunk(BaseChunk):
"""Text delta chunk."""
 type: Literal['text-delta'] = 'text-delta'
 delta: str
 id: str
 provider_metadata: ProviderMetadata | None = None
```
---|--- 
### TextEndChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Text end chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
44
45
46
47
48
49
```
| ```
classTextEndChunk(BaseChunk):
"""Text end chunk."""
 type: Literal['text-end'] = 'text-end'
 id: str
 provider_metadata: ProviderMetadata | None = None
```
---|--- 
### ReasoningStartChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Reasoning start chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
52
53
54
55
56
57
```
| ```
classReasoningStartChunk(BaseChunk):
"""Reasoning start chunk."""
 type: Literal['reasoning-start'] = 'reasoning-start'
 id: str
 provider_metadata: ProviderMetadata | None = None
```
---|--- 
### ReasoningDeltaChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Reasoning delta chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
60
61
62
63
64
65
66
```
| ```
classReasoningDeltaChunk(BaseChunk):
"""Reasoning delta chunk."""
 type: Literal['reasoning-delta'] = 'reasoning-delta'
 id: str
 delta: str
 provider_metadata: ProviderMetadata | None = None
```
---|--- 
### ReasoningEndChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Reasoning end chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
69
70
71
72
73
74
```
| ```
classReasoningEndChunk(BaseChunk):
"""Reasoning end chunk."""
 type: Literal['reasoning-end'] = 'reasoning-end'
 id: str
 provider_metadata: ProviderMetadata | None = None
```
---|--- 
### ErrorChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Error chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
77
78
79
80
81
```
| ```
classErrorChunk(BaseChunk):
"""Error chunk."""
 type: Literal['error'] = 'error'
 error_text: str
```
---|--- 
### ToolInputStartChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Tool input start chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
84
85
86
87
88
89
90
91
```
| ```
classToolInputStartChunk(BaseChunk):
"""Tool input start chunk."""
 type: Literal['tool-input-start'] = 'tool-input-start'
 tool_call_id: str
 tool_name: str
 provider_executed: bool | None = None
 dynamic: bool | None = None
```
---|--- 
### ToolInputDeltaChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Tool input delta chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
94
95
96
97
98
99
```
| ```
classToolInputDeltaChunk(BaseChunk):
"""Tool input delta chunk."""
 type: Literal['tool-input-delta'] = 'tool-input-delta'
 tool_call_id: str
 input_text_delta: str
```
---|--- 
### ToolOutputAvailableChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Tool output available chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
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
```
| ```
classToolOutputAvailableChunk(BaseChunk):
"""Tool output available chunk."""
 type: Literal['tool-output-available'] = 'tool-output-available'
 tool_call_id: str
 output: Any
 provider_executed: bool | None = None
 dynamic: bool | None = None
 preliminary: bool | None = None
```
---|--- 
### ToolInputAvailableChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Tool input available chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
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
```
| ```
classToolInputAvailableChunk(BaseChunk):
"""Tool input available chunk."""
 type: Literal['tool-input-available'] = 'tool-input-available'
 tool_call_id: str
 tool_name: str
 input: Any
 provider_executed: bool | None = None
 provider_metadata: ProviderMetadata | None = None
 dynamic: bool | None = None
```
---|--- 
### ToolInputErrorChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Tool input error chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
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
```
| ```
classToolInputErrorChunk(BaseChunk):
"""Tool input error chunk."""
 type: Literal['tool-input-error'] = 'tool-input-error'
 tool_call_id: str
 tool_name: str
 input: Any
 provider_executed: bool | None = None
 provider_metadata: ProviderMetadata | None = None
 dynamic: bool | None = None
 error_text: str
```
---|--- 
### ToolOutputErrorChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Tool output error chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
138
139
140
141
142
143
144
145
```
| ```
classToolOutputErrorChunk(BaseChunk):
"""Tool output error chunk."""
 type: Literal['tool-output-error'] = 'tool-output-error'
 tool_call_id: str
 error_text: str
 provider_executed: bool | None = None
 dynamic: bool | None = None
```
---|--- 
### SourceUrlChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Source URL chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
148
149
150
151
152
153
154
155
```
| ```
classSourceUrlChunk(BaseChunk):
"""Source URL chunk."""
 type: Literal['source-url'] = 'source-url'
 source_id: str
 url: str
 title: str | None = None
 provider_metadata: ProviderMetadata | None = None
```
---|--- 
### SourceDocumentChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Source document chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
158
159
160
161
162
163
164
165
166
```
| ```
classSourceDocumentChunk(BaseChunk):
"""Source document chunk."""
 type: Literal['source-document'] = 'source-document'
 source_id: str
 media_type: str
 title: str
 filename: str | None = None
 provider_metadata: ProviderMetadata | None = None
```
---|--- 
### FileChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
File chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
169
170
171
172
173
174
```
| ```
classFileChunk(BaseChunk):
"""File chunk."""
 type: Literal['file'] = 'file'
 url: str
 media_type: str
```
---|--- 
### DataChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Data chunk with dynamic type.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
177
178
179
180
181
```
| ```
classDataChunk(BaseChunk):
"""Data chunk with dynamic type."""
 type: Annotated[str, Field(pattern=r'^data-')]
 data: Any
```
---|--- 
### StartStepChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Start step chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
184
185
186
187
```
| ```
classStartStepChunk(BaseChunk):
"""Start step chunk."""
 type: Literal['start-step'] = 'start-step'
```
---|--- 
### FinishStepChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Finish step chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
190
191
192
193
```
| ```
classFinishStepChunk(BaseChunk):
"""Finish step chunk."""
 type: Literal['finish-step'] = 'finish-step'
```
---|--- 
### StartChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Start chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
196
197
198
199
200
201
```
| ```
classStartChunk(BaseChunk):
"""Start chunk."""
 type: Literal['start'] = 'start'
 message_id: str | None = None
 message_metadata: Any | None = None
```
---|--- 
### FinishChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Finish chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
204
205
206
207
208
```
| ```
classFinishChunk(BaseChunk):
"""Finish chunk."""
 type: Literal['finish'] = 'finish'
 message_metadata: Any | None = None
```
---|--- 
### AbortChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Abort chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
211
212
213
214
```
| ```
classAbortChunk(BaseChunk):
"""Abort chunk."""
 type: Literal['abort'] = 'abort'
```
---|--- 
### MessageMetadataChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Message metadata chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
217
218
219
220
221
```
| ```
classMessageMetadataChunk(BaseChunk):
"""Message metadata chunk."""
 type: Literal['message-metadata'] = 'message-metadata'
 message_metadata: Any
```
---|--- 
### DoneChunk
Bases: `BaseChunk[](#pydantic_ai.ui.vercel_ai.response_types.BaseChunk "pydantic_ai.ui.vercel_ai.response_types.BaseChunk")`
Done chunk.
Source code in `pydantic_ai_slim/pydantic_ai/ui/vercel_ai/response_types.py`
```
224
225
226
227
228
229
230
```
| ```
classDoneChunk(BaseChunk):
"""Done chunk."""
 type: Literal['done'] = 'done'
 defencode(self) -> str:
 return '[DONE]'
```
---|---