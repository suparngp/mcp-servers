[ Skip to content ](#pydantic_aibuiltin_tools)
# `pydantic_ai.builtin_tools`
### AbstractBuiltinTool `dataclass`
Bases: `ABC[](https://docs.python.org/3/library/abc.html#abc.ABC "abc.ABC")`
A builtin tool that can be used by an agent.
This class is abstract and cannot be instantiated directly.
The builtin tools are passed to the model as part of the `ModelRequestParameters`.
Source code in `pydantic_ai_slim/pydantic_ai/builtin_tools.py`
```
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
37
38
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
```
| ```
@dataclass(kw_only=True)
classAbstractBuiltinTool(ABC):
"""A builtin tool that can be used by an agent.
 This class is abstract and cannot be instantiated directly.
 The builtin tools are passed to the model as part of the `ModelRequestParameters`.
 """
 kind: str = 'unknown_builtin_tool'
"""Built-in tool identifier, this should be available on all built-in tools as a discriminator."""
 @property
 defunique_id(self) -> str:
"""A unique identifier for the builtin tool.
 If multiple instances of the same builtin tool can be passed to the model, subclasses should override this property to allow them to be distinguished.
 """
 return self.kind
 def__init_subclass__(cls, **kwargs: Any) -> None:
 super().__init_subclass__(**kwargs)
 _BUILTIN_TOOL_TYPES[cls.kind] = cls
 @classmethod
 def__get_pydantic_core_schema__(
 cls, _source_type: Any, handler: pydantic.GetCoreSchemaHandler
 ) -> core_schema.CoreSchema:
 if cls is not AbstractBuiltinTool:
 return handler(cls)
 tools = _BUILTIN_TOOL_TYPES.values()
 if len(tools) == 1: # pragma: no cover
 tools_type = next(iter(tools))
 else:
 tools_annotated = [Annotated[tool, pydantic.Tag(tool.kind)] for tool in tools]
 tools_type = Annotated[Union[tuple(tools_annotated)], pydantic.Discriminator(_tool_discriminator)] # noqa: UP007
 return handler(tools_type)
```
---|--- 
#### kind `class-attribute` `instance-attribute`
```
kind: str[](https://docs.python.org/3/library/stdtypes.html#str) = 'unknown_builtin_tool'
```
Built-in tool identifier, this should be available on all built-in tools as a discriminator.
#### unique_id `property`
```
unique_id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
A unique identifier for the builtin tool.
If multiple instances of the same builtin tool can be passed to the model, subclasses should override this property to allow them to be distinguished.
### WebSearchTool `dataclass`
Bases: `AbstractBuiltinTool[](#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")`
A builtin tool that allows your agent to search the web for information.
The parameters that PydanticAI passes depend on the model, as some parameters may not be supported by certain models.
Supported by:
 * Anthropic
 * OpenAI Responses
 * Groq
 * Google
Source code in `pydantic_ai_slim/pydantic_ai/builtin_tools.py`
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
```
| ```
@dataclass(kw_only=True)
classWebSearchTool(AbstractBuiltinTool):
"""A builtin tool that allows your agent to search the web for information.
 The parameters that PydanticAI passes depend on the model, as some parameters may not be supported by certain models.
 Supported by:
 * Anthropic
 * OpenAI Responses
 * Groq
 * Google
 """
 search_context_size: Literal['low', 'medium', 'high'] = 'medium'
"""The `search_context_size` parameter controls how much context is retrieved from the web to help the tool formulate a response.
 Supported by:
 * OpenAI Responses
 """
 user_location: WebSearchUserLocation | None = None
"""The `user_location` parameter allows you to localize search results based on a user's location.
 Supported by:
 * Anthropic
 * OpenAI Responses
 """
 blocked_domains: list[str] | None = None
"""If provided, these domains will never appear in results.
 With Anthropic, you can only use one of `blocked_domains` or `allowed_domains`, not both.
 Supported by:
 * Anthropic, see <https://docs.anthropic.com/en/docs/build-with-claude/tool-use/web-search-tool#domain-filtering>
 * Groq, see <https://console.groq.com/docs/agentic-tooling#search-settings>
 """
 allowed_domains: list[str] | None = None
"""If provided, only these domains will be included in results.
 With Anthropic, you can only use one of `blocked_domains` or `allowed_domains`, not both.
 Supported by:
 * Anthropic, see <https://docs.anthropic.com/en/docs/build-with-claude/tool-use/web-search-tool#domain-filtering>
 * Groq, see <https://console.groq.com/docs/agentic-tooling#search-settings>
 """
 max_uses: int | None = None
"""If provided, the tool will stop searching the web after the given number of uses.
 Supported by:
 * Anthropic
 """
 kind: str = 'web_search'
"""The kind of tool."""
```
---|--- 
#### search_context_size `class-attribute` `instance-attribute`
```
search_context_size: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["low", "medium", "high"] = (
 "medium"
)
```
The `search_context_size` parameter controls how much context is retrieved from the web to help the tool formulate a response.
Supported by:
 * OpenAI Responses
#### user_location `class-attribute` `instance-attribute`
```
user_location: WebSearchUserLocation[](#pydantic_ai.builtin_tools.WebSearchUserLocation "pydantic_ai.builtin_tools.WebSearchUserLocation") | None = None
```
The `user_location` parameter allows you to localize search results based on a user's location.
Supported by:
 * Anthropic
 * OpenAI Responses
#### blocked_domains `class-attribute` `instance-attribute`
```
blocked_domains: list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)] | None = None
```
If provided, these domains will never appear in results.
With Anthropic, you can only use one of `blocked_domains` or `allowed_domains`, not both.
Supported by:
 * Anthropic, see <https://docs.anthropic.com/en/docs/build-with-claude/tool-use/web-search-tool#domain-filtering>
 * Groq, see <https://console.groq.com/docs/agentic-tooling#search-settings>
#### allowed_domains `class-attribute` `instance-attribute`
```
allowed_domains: list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)] | None = None
```
If provided, only these domains will be included in results.
With Anthropic, you can only use one of `blocked_domains` or `allowed_domains`, not both.
Supported by:
 * Anthropic, see <https://docs.anthropic.com/en/docs/build-with-claude/tool-use/web-search-tool#domain-filtering>
 * Groq, see <https://console.groq.com/docs/agentic-tooling#search-settings>
#### max_uses `class-attribute` `instance-attribute`
```
max_uses: int[](https://docs.python.org/3/library/functions.html#int) | None = None
```
If provided, the tool will stop searching the web after the given number of uses.
Supported by:
 * Anthropic
#### kind `class-attribute` `instance-attribute`
```
kind: str[](https://docs.python.org/3/library/stdtypes.html#str) = 'web_search'
```
The kind of tool.
### WebSearchUserLocation
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
Allows you to localize search results based on a user's location.
Supported by:
 * Anthropic
 * OpenAI Responses
Source code in `pydantic_ai_slim/pydantic_ai/builtin_tools.py`
```
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
```
| ```
classWebSearchUserLocation(TypedDict, total=False):
"""Allows you to localize search results based on a user's location.
 Supported by:
 * Anthropic
 * OpenAI Responses
 """
 city: str
"""The city where the user is located."""
 country: str
"""The country where the user is located. For OpenAI, this must be a 2-letter country code (e.g., 'US', 'GB')."""
 region: str
"""The region or state where the user is located."""
 timezone: str
"""The timezone of the user's location."""
```
---|--- 
#### city `instance-attribute`
```
city: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The city where the user is located.
#### country `instance-attribute`
```
country: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The country where the user is located. For OpenAI, this must be a 2-letter country code (e.g., 'US', 'GB').
#### region `instance-attribute`
```
region: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The region or state where the user is located.
#### timezone `instance-attribute`
```
timezone: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The timezone of the user's location.
### CodeExecutionTool `dataclass`
Bases: `AbstractBuiltinTool[](#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")`
A builtin tool that allows your agent to execute code.
Supported by:
 * Anthropic
 * OpenAI Responses
 * Google
Source code in `pydantic_ai_slim/pydantic_ai/builtin_tools.py`
```
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
```
| ```
@dataclass(kw_only=True)
classCodeExecutionTool(AbstractBuiltinTool):
"""A builtin tool that allows your agent to execute code.
 Supported by:
 * Anthropic
 * OpenAI Responses
 * Google
 """
 kind: str = 'code_execution'
"""The kind of tool."""
```
---|--- 
#### kind `class-attribute` `instance-attribute`
```
kind: str[](https://docs.python.org/3/library/stdtypes.html#str) = 'code_execution'
```
The kind of tool.
### UrlContextTool `dataclass`
Bases: `AbstractBuiltinTool[](#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")`
Allows your agent to access contents from URLs.
Supported by:
 * Google
Source code in `pydantic_ai_slim/pydantic_ai/builtin_tools.py`
```
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
@dataclass(kw_only=True)
classUrlContextTool(AbstractBuiltinTool):
"""Allows your agent to access contents from URLs.
 Supported by:
 * Google
 """
 kind: str = 'url_context'
"""The kind of tool."""
```
---|--- 
#### kind `class-attribute` `instance-attribute`
```
kind: str[](https://docs.python.org/3/library/stdtypes.html#str) = 'url_context'
```
The kind of tool.
### ImageGenerationTool `dataclass`
Bases: `AbstractBuiltinTool[](#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")`
A builtin tool that allows your agent to generate images.
Supported by:
 * OpenAI Responses
 * Google
Source code in `pydantic_ai_slim/pydantic_ai/builtin_tools.py`
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
@dataclass(kw_only=True)
classImageGenerationTool(AbstractBuiltinTool):
"""A builtin tool that allows your agent to generate images.
 Supported by:
 * OpenAI Responses
 * Google
 """
 background: Literal['transparent', 'opaque', 'auto'] = 'auto'
"""Background type for the generated image.
 Supported by:
 * OpenAI Responses. 'transparent' is only supported for 'png' and 'webp' output formats.
 """
 input_fidelity: Literal['high', 'low'] | None = None
"""
 Control how much effort the model will exert to match the style and features,
 especially facial features, of input images.
 Supported by:
 * OpenAI Responses. Default: 'low'.
 """
 moderation: Literal['auto', 'low'] = 'auto'
"""Moderation level for the generated image.
 Supported by:
 * OpenAI Responses
 """
 output_compression: int = 100
"""Compression level for the output image.
 Supported by:
 * OpenAI Responses. Only supported for 'png' and 'webp' output formats.
 """
 output_format: Literal['png', 'webp', 'jpeg'] | None = None
"""The output format of the generated image.
 Supported by:
 * OpenAI Responses. Default: 'png'.
 """
 partial_images: int = 0
"""
 Number of partial images to generate in streaming mode.
 Supported by:
 * OpenAI Responses. Supports 0 to 3.
 """
 quality: Literal['low', 'medium', 'high', 'auto'] = 'auto'
"""The quality of the generated image.
 Supported by:
 * OpenAI Responses
 """
 size: Literal['1024x1024', '1024x1536', '1536x1024', 'auto'] = 'auto'
"""The size of the generated image.
 Supported by:
 * OpenAI Responses
 """
 kind: str = 'image_generation'
"""The kind of tool."""
```
---|--- 
#### background `class-attribute` `instance-attribute`
```
background: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["transparent", "opaque", "auto"] = (
 "auto"
)
```
Background type for the generated image.
Supported by:
 * OpenAI Responses. 'transparent' is only supported for 'png' and 'webp' output formats.
#### input_fidelity `class-attribute` `instance-attribute`
```
input_fidelity: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['high', 'low'] | None = None
```
Control how much effort the model will exert to match the style and features, especially facial features, of input images.
Supported by:
 * OpenAI Responses. Default: 'low'.
#### moderation `class-attribute` `instance-attribute`
```
moderation: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['auto', 'low'] = 'auto'
```
Moderation level for the generated image.
Supported by:
 * OpenAI Responses
#### output_compression `class-attribute` `instance-attribute`
```
output_compression: int[](https://docs.python.org/3/library/functions.html#int) = 100
```
Compression level for the output image.
Supported by:
 * OpenAI Responses. Only supported for 'png' and 'webp' output formats.
#### output_format `class-attribute` `instance-attribute`
```
output_format: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['png', 'webp', 'jpeg'] | None = None
```
The output format of the generated image.
Supported by:
 * OpenAI Responses. Default: 'png'.
#### partial_images `class-attribute` `instance-attribute`
```
partial_images: int[](https://docs.python.org/3/library/functions.html#int) = 0
```
Number of partial images to generate in streaming mode.
Supported by:
 * OpenAI Responses. Supports 0 to 3.
#### quality `class-attribute` `instance-attribute`
```
quality: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['low', 'medium', 'high', 'auto'] = 'auto'
```
The quality of the generated image.
Supported by:
 * OpenAI Responses
#### size `class-attribute` `instance-attribute`
```
size: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[
 "1024x1024", "1024x1536", "1536x1024", "auto"
] = "auto"
```
The size of the generated image.
Supported by:
 * OpenAI Responses
#### kind `class-attribute` `instance-attribute`
```
kind: str[](https://docs.python.org/3/library/stdtypes.html#str) = 'image_generation'
```
The kind of tool.
### MemoryTool `dataclass`
Bases: `AbstractBuiltinTool[](#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")`
A builtin tool that allows your agent to use memory.
Supported by:
 * Anthropic
Source code in `pydantic_ai_slim/pydantic_ai/builtin_tools.py`
```
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
```
| ```
@dataclass(kw_only=True)
classMemoryTool(AbstractBuiltinTool):
"""A builtin tool that allows your agent to use memory.
 Supported by:
 * Anthropic
 """
 kind: str = 'memory'
"""The kind of tool."""
```
---|--- 
#### kind `class-attribute` `instance-attribute`
```
kind: str[](https://docs.python.org/3/library/stdtypes.html#str) = 'memory'
```
The kind of tool.
### MCPServerTool `dataclass`
Bases: `AbstractBuiltinTool[](#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")`
A builtin tool that allows your agent to use MCP servers.
Supported by:
 * OpenAI Responses
 * Anthropic
Source code in `pydantic_ai_slim/pydantic_ai/builtin_tools.py`
```
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
```
| ```
@dataclass(kw_only=True)
classMCPServerTool(AbstractBuiltinTool):
"""A builtin tool that allows your agent to use MCP servers.
 Supported by:
 * OpenAI Responses
 * Anthropic
 """
 id: str
"""A unique identifier for the MCP server."""
 url: str
"""The URL of the MCP server to use.
 For OpenAI Responses, it is possible to use `connector_id` by providing it as `x-openai-connector:<connector_id>`.
 """
 authorization_token: str | None = None
"""Authorization header to use when making requests to the MCP server.
 Supported by:
 * OpenAI Responses
 * Anthropic
 """
 description: str | None = None
"""A description of the MCP server.
 Supported by:
 * OpenAI Responses
 """
 allowed_tools: list[str] | None = None
"""A list of tools that the MCP server can use.
 Supported by:
 * OpenAI Responses
 * Anthropic
 """
 headers: dict[str, str] | None = None
"""Optional HTTP headers to send to the MCP server.
 Use for authentication or other purposes.
 Supported by:
 * OpenAI Responses
 """
 kind: str = 'mcp_server'
 @property
 defunique_id(self) -> str:
 return ':'.join([self.kind, self.id])
```
---|--- 
#### id `instance-attribute`
```
id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
A unique identifier for the MCP server.
#### url `instance-attribute`
```
url: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The URL of the MCP server to use.
For OpenAI Responses, it is possible to use `connector_id` by providing it as `x-openai-connector:<connector_id>`.
#### authorization_token `class-attribute` `instance-attribute`
```
authorization_token: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
Authorization header to use when making requests to the MCP server.
Supported by:
 * OpenAI Responses
 * Anthropic
#### description `class-attribute` `instance-attribute`
```
description: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
A description of the MCP server.
Supported by:
 * OpenAI Responses
#### allowed_tools `class-attribute` `instance-attribute`
```
allowed_tools: list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)] | None = None
```
A list of tools that the MCP server can use.
Supported by:
 * OpenAI Responses
 * Anthropic
#### headers `class-attribute` `instance-attribute`
```
headers: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), str[](https://docs.python.org/3/library/stdtypes.html#str)] | None = None
```
Optional HTTP headers to send to the MCP server.
Use for authentication or other purposes.
Supported by:
 * OpenAI Responses