[ Skip to content ](#pydantic_aimodelsmcp_sampling)
# pydantic_ai.models.mcp_sampling
### MCPSamplingModelSettings
Bases: `ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings")`
Settings used for an MCP Sampling model request.
Source code in `pydantic_ai_slim/pydantic_ai/models/mcp_sampling.py`
```
19
20
21
22
23
24
25
```
| ```
classMCPSamplingModelSettings(ModelSettings, total=False):
"""Settings used for an MCP Sampling model request."""
 # ALL FIELDS MUST BE `mcp_` PREFIXED SO YOU CAN MERGE THEM WITH OTHER MODELS.
 mcp_model_preferences: ModelPreferences
"""Model preferences to use for MCP Sampling."""
```
---|--- 
#### mcp_model_preferences `instance-attribute`
```
mcp_model_preferences: ModelPreferences
```
Model preferences to use for MCP Sampling.
### MCPSamplingModel `dataclass`
Bases: `Model[](../base/#pydantic_ai.models.Model "pydantic_ai.models.Model")`
A model that uses MCP Sampling.
[MCP Sampling](https://modelcontextprotocol.io/docs/concepts/sampling) allows an MCP server to make requests to a model by calling back to the MCP client that connected to it.
Source code in `pydantic_ai_slim/pydantic_ai/models/mcp_sampling.py`
```
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
```
| ```
@dataclass
classMCPSamplingModel(Model):
"""A model that uses MCP Sampling.
 [MCP Sampling](https://modelcontextprotocol.io/docs/concepts/sampling)
 allows an MCP server to make requests to a model by calling back to the MCP client that connected to it.
 """
 session: ServerSession
"""The MCP server session to use for sampling."""
 _: KW_ONLY
 default_max_tokens: int = 16_384
"""Default max tokens to use if not set in [`ModelSettings`][pydantic_ai.settings.ModelSettings.max_tokens].
 Max tokens is a required parameter for MCP Sampling, but optional on
 [`ModelSettings`][pydantic_ai.settings.ModelSettings], so this value is used as fallback.
 """
 async defrequest(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ) -> ModelResponse:
 system_prompt, sampling_messages = _mcp.map_from_pai_messages(messages)
 model_settings, _ = self.prepare_request(model_settings, model_request_parameters)
 model_settings = cast(MCPSamplingModelSettings, model_settings or {})
 result = await self.session.create_message(
 sampling_messages,
 max_tokens=model_settings.get('max_tokens', self.default_max_tokens),
 system_prompt=system_prompt,
 temperature=model_settings.get('temperature'),
 model_preferences=model_settings.get('mcp_model_preferences'),
 stop_sequences=model_settings.get('stop_sequences'),
 )
 if result.role == 'assistant':
 return ModelResponse(
 parts=[_mcp.map_from_sampling_content(result.content)],
 model_name=result.model,
 )
 else:
 raise exceptions.UnexpectedModelBehavior(
 f'Unexpected result from MCP sampling, expected "assistant" role, got {result.role}.'
 )
 @asynccontextmanager
 async defrequest_stream(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 run_context: RunContext[Any] | None = None,
 ) -> AsyncIterator[StreamedResponse]:
 raise NotImplementedError('MCP Sampling does not support streaming')
 yield
 @property
 defmodel_name(self) -> str:
"""The model name.
 Since the model name isn't known until the request is made, this property always returns `'mcp-sampling'`.
 """
 return 'mcp-sampling'
 @property
 defsystem(self) -> str:
"""The system / model provider, returns `'MCP'`."""
 return 'MCP'
```
---|--- 
#### session `instance-attribute`
```
session: ServerSession[](https://modelcontextprotocol.github.io/python-sdk/api/#mcp.ServerSession "mcp.ServerSession")
```
The MCP server session to use for sampling.
#### default_max_tokens `class-attribute` `instance-attribute`
```
default_max_tokens: int[](https://docs.python.org/3/library/functions.html#int) = 16384
```
Default max tokens to use if not set in [`ModelSettings`](../../settings/#pydantic_ai.settings.ModelSettings.max_tokens).
Max tokens is a required parameter for MCP Sampling, but optional on [`ModelSettings`](../../settings/#pydantic_ai.settings.ModelSettings), so this value is used as fallback.
#### model_name `property`
```
model_name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The model name.
Since the model name isn't known until the request is made, this property always returns `'mcp-sampling'`.
#### system `property`
```
system: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The system / model provider, returns `'MCP'`.