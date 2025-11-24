[ Skip to content ](#pydantic_aiprofiles)
# `pydantic_ai.profiles`
Describes how requests to and responses from specific models or families of models need to be constructed and processed to get the best results, independent of the model and provider classes used.
Source code in `pydantic_ai_slim/pydantic_ai/profiles/__init__.py`
```
21
22
23
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
```
| ```
@dataclass(kw_only=True)
classModelProfile:
"""Describes how requests to and responses from specific models or families of models need to be constructed and processed to get the best results, independent of the model and provider classes used."""
 supports_tools: bool = True
"""Whether the model supports tools."""
 supports_json_schema_output: bool = False
"""Whether the model supports JSON schema output."""
 supports_json_object_output: bool = False
"""Whether the model supports JSON object output."""
 supports_image_output: bool = False
"""Whether the model supports image output."""
 default_structured_output_mode: StructuredOutputMode = 'tool'
"""The default structured output mode to use for the model."""
 prompted_output_template: str = dedent(
"""
 Always respond with a JSON object that's compatible with this schema:
 {schema}
 Don't include any text or Markdown fencing before or after.
 """
 )
"""The instructions template to use for prompted structured output. The '{schema}' placeholder will be replaced with the JSON schema for the output."""
 json_schema_transformer: type[JsonSchemaTransformer] | None = None
"""The transformer to use to make JSON schemas for tools and structured output compatible with the model."""
 thinking_tags: tuple[str, str] = ('<think>', '</think>')
"""The tags used to indicate thinking parts in the model's output. Defaults to ('<think>', '</think>')."""
 ignore_streamed_leading_whitespace: bool = False
"""Whether to ignore leading whitespace when streaming a response.
 This is a workaround for models that emit `<think>\n</think>\n\n` or an empty text part ahead of tool calls (e.g. Ollama + Qwen3),
 which we don't want to end up treating as a final result when using `run_stream` with `str` a valid `output_type`.
 This is currently only used by `OpenAIChatModel`, `HuggingFaceModel`, and `GroqModel`.
 """
 @classmethod
 deffrom_profile(cls, profile: ModelProfile | None) -> Self:
"""Build a ModelProfile subclass instance from a ModelProfile instance."""
 if isinstance(profile, cls):
 return profile
 return cls().update(profile)
 defupdate(self, profile: ModelProfile | None) -> Self:
"""Update this ModelProfile (subclass) instance with the non-default values from another ModelProfile instance."""
 if not profile:
 return self
 field_names = set(f.name for f in fields(self))
 non_default_attrs = {
 f.name: getattr(profile, f.name)
 for f in fields(profile)
 if f.name in field_names and getattr(profile, f.name) != f.default
 }
 return replace(self, **non_default_attrs)
```
---|--- 
### supports_tools `class-attribute` `instance-attribute`
```
supports_tools: bool[](https://docs.python.org/3/library/functions.html#bool) = True
```
Whether the model supports tools.
### supports_json_schema_output `class-attribute` `instance-attribute`
```
supports_json_schema_output: bool[](https://docs.python.org/3/library/functions.html#bool) = False
```
Whether the model supports JSON schema output.
### supports_json_object_output `class-attribute` `instance-attribute`
```
supports_json_object_output: bool[](https://docs.python.org/3/library/functions.html#bool) = False
```
Whether the model supports JSON object output.
### supports_image_output `class-attribute` `instance-attribute`
```
supports_image_output: bool[](https://docs.python.org/3/library/functions.html#bool) = False
```
Whether the model supports image output.
### default_structured_output_mode `class-attribute` `instance-attribute`
```
default_structured_output_mode: StructuredOutputMode = (
 "tool"
)
```
The default structured output mode to use for the model.
### prompted_output_template `class-attribute` `instance-attribute`
```
prompted_output_template: str[](https://docs.python.org/3/library/stdtypes.html#str) = dedent[](https://docs.python.org/3/library/textwrap.html#textwrap.dedent "textwrap.dedent")(
 "\n Always respond with a JSON object that's compatible with this schema:\n\n{schema}\n\n Don't include any text or Markdown fencing before or after.\n "
)
```
The instructions template to use for prompted structured output. The '{schema}' placeholder will be replaced with the JSON schema for the output.
### json_schema_transformer `class-attribute` `instance-attribute`
```
json_schema_transformer: (
 type[](https://docs.python.org/3/library/functions.html#type)[JsonSchemaTransformer] | None
) = None
```
The transformer to use to make JSON schemas for tools and structured output compatible with the model.
### thinking_tags `class-attribute` `instance-attribute`
```
thinking_tags: tuple[](https://docs.python.org/3/library/stdtypes.html#tuple)[str[](https://docs.python.org/3/library/stdtypes.html#str), str[](https://docs.python.org/3/library/stdtypes.html#str)] = ('<think>', '</think>')
```
The tags used to indicate thinking parts in the model's output. Defaults to ('', '').
### ignore_streamed_leading_whitespace `class-attribute` `instance-attribute`
```
ignore_streamed_leading_whitespace: bool[](https://docs.python.org/3/library/functions.html#bool) = False
```
Whether to ignore leading whitespace when streaming a response.
```
This is a workaround for models that emit `<think>
```
`or an empty text part ahead of tool calls (e.g. Ollama + Qwen3), which we don't want to end up treating as a final result when using`run_stream`with`str`a valid`output_type`.
```
This is currently only used by `OpenAIChatModel`, `HuggingFaceModel`, and `GroqModel`.
```
### from_profile `classmethod`
```
from_profile(profile: ModelProfile[](#pydantic_ai.profiles.ModelProfile "pydantic_ai.profiles.ModelProfile") | None) -> Self[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Self "typing_extensions.Self")
```
Build a ModelProfile subclass instance from a ModelProfile instance.
Source code in `pydantic_ai_slim/pydantic_ai/profiles/__init__.py`
```
60
61
62
63
64
65
```
| ```
@classmethod
deffrom_profile(cls, profile: ModelProfile | None) -> Self:
"""Build a ModelProfile subclass instance from a ModelProfile instance."""
 if isinstance(profile, cls):
 return profile
 return cls().update(profile)
```
---|--- 
### update
```
update(profile: ModelProfile[](#pydantic_ai.profiles.ModelProfile "pydantic_ai.profiles.ModelProfile") | None) -> Self[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Self "typing_extensions.Self")
```
Update this ModelProfile (subclass) instance with the non-default values from another ModelProfile instance.
Source code in `pydantic_ai_slim/pydantic_ai/profiles/__init__.py`
```
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
```
| ```
defupdate(self, profile: ModelProfile | None) -> Self:
"""Update this ModelProfile (subclass) instance with the non-default values from another ModelProfile instance."""
 if not profile:
 return self
 field_names = set(f.name for f in fields(self))
 non_default_attrs = {
 f.name: getattr(profile, f.name)
 for f in fields(profile)
 if f.name in field_names and getattr(profile, f.name) != f.default
 }
 return replace(self, **non_default_attrs)
```
---|--- 
### OpenAIModelProfile `dataclass`
Bases: `ModelProfile[](#pydantic_ai.profiles.ModelProfile "pydantic_ai.profiles.ModelProfile")`
Profile for models used with `OpenAIChatModel`.
ALL FIELDS MUST BE `openai_` PREFIXED SO YOU CAN MERGE THEM WITH OTHER MODELS.
Source code in `pydantic_ai_slim/pydantic_ai/profiles/openai.py`
```
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
```
| ```
@dataclass(kw_only=True)
classOpenAIModelProfile(ModelProfile):
"""Profile for models used with `OpenAIChatModel`.
 ALL FIELDS MUST BE `openai_` PREFIXED SO YOU CAN MERGE THEM WITH OTHER MODELS.
 """
 openai_supports_strict_tool_definition: bool = True
"""This can be set by a provider or user if the OpenAI-"compatible" API doesn't support strict tool definitions."""
 openai_supports_sampling_settings: bool = True
"""Turn off to don't send sampling settings like `temperature` and `top_p` to models that don't support them, like OpenAI's o-series reasoning models."""
 openai_unsupported_model_settings: Sequence[str] = ()
"""A list of model settings that are not supported by this model."""
 # Some OpenAI-compatible providers (e.g. MoonshotAI) currently do **not** accept
 # `tool_choice="required"`. This flag lets the calling model know whether it's
 # safe to pass that value along. Default is `True` to preserve existing
 # behaviour for OpenAI itself and most providers.
 openai_supports_tool_choice_required: bool = True
"""Whether the provider accepts the value ``tool_choice='required'`` in the request payload."""
 openai_system_prompt_role: OpenAISystemPromptRole | None = None
"""The role to use for the system prompt message. If not provided, defaults to `'system'`."""
 openai_chat_supports_web_search: bool = False
"""Whether the model supports web search in Chat Completions API."""
 openai_supports_encrypted_reasoning_content: bool = False
"""Whether the model supports including encrypted reasoning content in the response."""
 openai_responses_requires_function_call_status_none: bool = False
"""Whether the Responses API requires the `status` field on function tool calls to be `None`.
 This is required by vLLM Responses API versions before https://github.com/vllm-project/vllm/pull/26706.
 See https://github.com/pydantic/pydantic-ai/issues/3245 for more details.
 """
 def__post_init__(self): # pragma: no cover
 if not self.openai_supports_sampling_settings:
 warnings.warn(
 'The `openai_supports_sampling_settings` has no effect, and it will be removed in future versions. '
 'Use `openai_unsupported_model_settings` instead.',
 DeprecationWarning,
 )
```
---|--- 
#### openai_supports_strict_tool_definition `class-attribute` `instance-attribute`
```
openai_supports_strict_tool_definition: bool[](https://docs.python.org/3/library/functions.html#bool) = True
```
This can be set by a provider or user if the OpenAI-"compatible" API doesn't support strict tool definitions.
#### openai_supports_sampling_settings `class-attribute` `instance-attribute`
```
openai_supports_sampling_settings: bool[](https://docs.python.org/3/library/functions.html#bool) = True
```
Turn off to don't send sampling settings like `temperature` and `top_p` to models that don't support them, like OpenAI's o-series reasoning models.
#### openai_unsupported_model_settings `class-attribute` `instance-attribute`
```
openai_unsupported_model_settings: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[str[](https://docs.python.org/3/library/stdtypes.html#str)] = ()
```
A list of model settings that are not supported by this model.
#### openai_supports_tool_choice_required `class-attribute` `instance-attribute`
```
openai_supports_tool_choice_required: bool[](https://docs.python.org/3/library/functions.html#bool) = True
```
Whether the provider accepts the value `tool_choice='required'` in the request payload.
#### openai_system_prompt_role `class-attribute` `instance-attribute`
```
openai_system_prompt_role: OpenAISystemPromptRole | None = (
 None
)
```
The role to use for the system prompt message. If not provided, defaults to `'system'`.
#### openai_chat_supports_web_search `class-attribute` `instance-attribute`
```
openai_chat_supports_web_search: bool[](https://docs.python.org/3/library/functions.html#bool) = False
```
Whether the model supports web search in Chat Completions API.
#### openai_supports_encrypted_reasoning_content `class-attribute` `instance-attribute`
```
openai_supports_encrypted_reasoning_content: bool[](https://docs.python.org/3/library/functions.html#bool) = False
```
Whether the model supports including encrypted reasoning content in the response.
#### openai_responses_requires_function_call_status_none `class-attribute` `instance-attribute`
```
openai_responses_requires_function_call_status_none: (
 bool[](https://docs.python.org/3/library/functions.html#bool)
) = False
```
Whether the Responses API requires the `status` field on function tool calls to be `None`.
This is required by vLLM Responses API versions before https://github.com/vllm-project/vllm/pull/26706. See https://github.com/pydantic/pydantic-ai/issues/3245 for more details.
### openai_model_profile
```
openai_model_profile(model_name: str[](https://docs.python.org/3/library/stdtypes.html#str)) -> ModelProfile[](#pydantic_ai.profiles.ModelProfile "pydantic_ai.profiles.ModelProfile")
```
Get the model profile for an OpenAI model.
Source code in `pydantic_ai_slim/pydantic_ai/profiles/openai.py`
```
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
defopenai_model_profile(model_name: str) -> ModelProfile:
"""Get the model profile for an OpenAI model."""
 is_reasoning_model = model_name.startswith('o') or model_name.startswith('gpt-5')
 # Check if the model supports web search (only specific search-preview models)
 supports_web_search = '-search-preview' in model_name
 # Structured Outputs (output mode 'native') is only supported with the gpt-4o-mini, gpt-4o-mini-2024-07-18, and gpt-4o-2024-08-06 model snapshots and later.
 # We leave it in here for all models because the `default_structured_output_mode` is `'tool'`, so `native` is only used
 # when the user specifically uses the `NativeOutput` marker, so an error from the API is acceptable.
 if is_reasoning_model:
 openai_unsupported_model_settings = (
 'temperature',
 'top_p',
 'presence_penalty',
 'frequency_penalty',
 'logit_bias',
 'logprobs',
 'top_logprobs',
 )
 else:
 openai_unsupported_model_settings = ()
 # The o1-mini model doesn't support the `system` role, so we default to `user`.
 # See https://github.com/pydantic/pydantic-ai/issues/974 for more details.
 openai_system_prompt_role = 'user' if model_name.startswith('o1-mini') else None
 return OpenAIModelProfile(
 json_schema_transformer=OpenAIJsonSchemaTransformer,
 supports_json_schema_output=True,
 supports_json_object_output=True,
 supports_image_output=is_reasoning_model or '4.1' in model_name or '4o' in model_name,
 openai_unsupported_model_settings=openai_unsupported_model_settings,
 openai_system_prompt_role=openai_system_prompt_role,
 openai_chat_supports_web_search=supports_web_search,
 openai_supports_encrypted_reasoning_content=is_reasoning_model,
 )
```
---|--- 
### OpenAIJsonSchemaTransformer `dataclass`
Bases: `JsonSchemaTransformer`
Recursively handle the schema to make it compatible with OpenAI strict mode.
See https://platform.openai.com/docs/guides/function-calling?api-mode=responses#strict-mode for more details, but this basically just requires: * `additionalProperties` must be set to false for each object in the parameters * all fields in properties must be marked as required
Source code in `pydantic_ai_slim/pydantic_ai/profiles/openai.py`
```
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
```
| ```
@dataclass(init=False)
classOpenAIJsonSchemaTransformer(JsonSchemaTransformer):
"""Recursively handle the schema to make it compatible with OpenAI strict mode.
 See https://platform.openai.com/docs/guides/function-calling?api-mode=responses#strict-mode for more details,
 but this basically just requires:
 * `additionalProperties` must be set to false for each object in the parameters
 * all fields in properties must be marked as required
 """
 def__init__(self, schema: JsonSchema, *, strict: bool | None = None):
 super().__init__(schema, strict=strict)
 self.root_ref = schema.get('$ref')
 defwalk(self) -> JsonSchema:
 # Note: OpenAI does not support anyOf at the root in strict mode
 # However, we don't need to check for it here because we ensure in pydantic_ai._utils.check_object_json_schema
 # that the root schema either has type 'object' or is recursive.
 result = super().walk()
 # For recursive models, we need to tweak the schema to make it compatible with strict mode.
 # Because the following should never change the semantics of the schema we apply it unconditionally.
 if self.root_ref is not None:
 result.pop('$ref', None) # We replace references to the self.root_ref with just '#' in the transform method
 root_key = re.sub(r'^#/\$defs/', '', self.root_ref)
 result.update(self.defs.get(root_key) or {})
 return result
 deftransform(self, schema: JsonSchema) -> JsonSchema: # noqa C901
 # Remove unnecessary keys
 schema.pop('title', None)
 schema.pop('$schema', None)
 schema.pop('discriminator', None)
 default = schema.get('default', _sentinel)
 if default is not _sentinel:
 # the "default" keyword is not allowed in strict mode, but including it makes some Ollama models behave
 # better, so we keep it around when not strict
 if self.strict is True:
 schema.pop('default', None)
 elif self.strict is None: # pragma: no branch
 self.is_strict_compatible = False
 if schema_ref := schema.get('$ref'):
 if schema_ref == self.root_ref:
 schema['$ref'] = '#'
 if len(schema) > 1:
 # OpenAI Strict mode doesn't support siblings to "$ref", but _does_ allow siblings to "anyOf".
 # So if there is a "description" field or any other extra info, we move the "$ref" into an "anyOf":
 schema['anyOf'] = [{'$ref': schema.pop('$ref')}]
 # Track strict-incompatible keys
 incompatible_values: dict[str, Any] = {}
 for key in _STRICT_INCOMPATIBLE_KEYS:
 value = schema.get(key, _sentinel)
 if value is not _sentinel:
 incompatible_values[key] = value
 if format := schema.get('format'):
 if format not in _STRICT_COMPATIBLE_STRING_FORMATS:
 incompatible_values['format'] = format
 description = schema.get('description')
 if incompatible_values:
 if self.strict is True:
 notes: list[str] = []
 for key, value in incompatible_values.items():
 schema.pop(key)
 notes.append(f'{key}={value}')
 notes_string = ', '.join(notes)
 schema['description'] = notes_string if not description else f'{description} ({notes_string})'
 elif self.strict is None: # pragma: no branch
 self.is_strict_compatible = False
 schema_type = schema.get('type')
 if 'oneOf' in schema:
 # OpenAI does not support oneOf in strict mode
 if self.strict is True:
 schema['anyOf'] = schema.pop('oneOf')
 else:
 self.is_strict_compatible = False
 if schema_type == 'object':
 if self.strict is True:
 # additional properties are disallowed
 schema['additionalProperties'] = False
 # all properties are required
 if 'properties' not in schema:
 schema['properties'] = dict[str, Any]()
 schema['required'] = list(schema['properties'].keys())
 elif self.strict is None:
 if schema.get('additionalProperties', None) not in (None, False):
 self.is_strict_compatible = False
 else:
 # additional properties are disallowed by default
 schema['additionalProperties'] = False
 if 'properties' not in schema or 'required' not in schema:
 self.is_strict_compatible = False
 else:
 required = schema['required']
 for k in schema['properties'].keys():
 if k not in required:
 self.is_strict_compatible = False
 return schema
```
---|--- 
### anthropic_model_profile
```
anthropic_model_profile(
 model_name: str[](https://docs.python.org/3/library/stdtypes.html#str),
) -> ModelProfile[](#pydantic_ai.profiles.ModelProfile "pydantic_ai.profiles.ModelProfile") | None
```
Get the model profile for an Anthropic model.
Source code in `pydantic_ai_slim/pydantic_ai/profiles/anthropic.py`
```
6
7
8
```
| ```
defanthropic_model_profile(model_name: str) -> ModelProfile | None:
"""Get the model profile for an Anthropic model."""
 return ModelProfile(thinking_tags=('<thinking>', '</thinking>'))
```
---|--- 
### google_model_profile
```
google_model_profile(
 model_name: str[](https://docs.python.org/3/library/stdtypes.html#str),
) -> ModelProfile[](#pydantic_ai.profiles.ModelProfile "pydantic_ai.profiles.ModelProfile") | None
```
Get the model profile for a Google model.
Source code in `pydantic_ai_slim/pydantic_ai/profiles/google.py`
```
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
```
| ```
defgoogle_model_profile(model_name: str) -> ModelProfile | None:
"""Get the model profile for a Google model."""
 is_image_model = 'image' in model_name
 return ModelProfile(
 json_schema_transformer=GoogleJsonSchemaTransformer,
 supports_image_output=is_image_model,
 supports_json_schema_output=not is_image_model,
 supports_json_object_output=not is_image_model,
 supports_tools=not is_image_model,
 )
```
---|--- 
### GoogleJsonSchemaTransformer
Bases: `JsonSchemaTransformer`
Transforms the JSON Schema from Pydantic to be suitable for Gemini.
Gemini which [supports](https://ai.google.dev/gemini-api/docs/function-calling#function_declarations) a subset of OpenAPI v3.0.3.
Specifically: * gemini doesn't allow the `title` keyword to be set * gemini doesn't allow `$defs` — we need to inline the definitions where possible
Source code in `pydantic_ai_slim/pydantic_ai/profiles/google.py`
```
 23
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
100
101
102
103
104
105
106
```
| ```
classGoogleJsonSchemaTransformer(JsonSchemaTransformer):
"""Transforms the JSON Schema from Pydantic to be suitable for Gemini.
 Gemini which [supports](https://ai.google.dev/gemini-api/docs/function-calling#function_declarations)
 a subset of OpenAPI v3.0.3.
 Specifically:
 * gemini doesn't allow the `title` keyword to be set
 * gemini doesn't allow `$defs` — we need to inline the definitions where possible
 """
 def__init__(self, schema: JsonSchema, *, strict: bool | None = None):
 super().__init__(schema, strict=strict, prefer_inlined_defs=True, simplify_nullable_unions=True)
 deftransform(self, schema: JsonSchema) -> JsonSchema:
 # Note: we need to remove `additionalProperties: False` since it is currently mishandled by Gemini
 additional_properties = schema.pop(
 'additionalProperties', None
 ) # don't pop yet so it's included in the warning
 if additional_properties:
 original_schema = {**schema, 'additionalProperties': additional_properties}
 warnings.warn(
 '`additionalProperties` is not supported by Gemini; it will be removed from the tool JSON schema.'
 f' Full schema: {self.schema}\n\n'
 f'Source of additionalProperties within the full schema: {original_schema}\n\n'
 'If this came from a field with a type like `dict[str, MyType]`, that field will always be empty.\n\n'
 "If Google's APIs are updated to support this properly, please create an issue on the Pydantic AI GitHub"
 ' and we will fix this behavior.',
 UserWarning,
 )
 schema.pop('title', None)
 schema.pop('$schema', None)
 if (const := schema.pop('const', None)) is not None:
 # Gemini doesn't support const, but it does support enum with a single value
 schema['enum'] = [const]
 schema.pop('discriminator', None)
 schema.pop('examples', None)
 # TODO: Should we use the trick from pydantic_ai.models.openai._OpenAIJsonSchema
 # where we add notes about these properties to the field description?
 schema.pop('exclusiveMaximum', None)
 schema.pop('exclusiveMinimum', None)
 # Gemini only supports string enums, so we need to convert any enum values to strings.
 # Pydantic will take care of transforming the transformed string values to the correct type.
 if enum := schema.get('enum'):
 schema['type'] = 'string'
 schema['enum'] = [str(val) for val in enum]
 type_ = schema.get('type')
 if 'oneOf' in schema and 'type' not in schema: # pragma: no cover
 # This gets hit when we have a discriminated union
 # Gemini returns an API error in this case even though it says in its error message it shouldn't...
 # Changing the oneOf to an anyOf prevents the API error and I think is functionally equivalent
 schema['anyOf'] = schema.pop('oneOf')
 if type_ == 'string' and (fmt := schema.pop('format', None)):
 description = schema.get('description')
 if description:
 schema['description'] = f'{description} (format: {fmt})'
 else:
 schema['description'] = f'Format: {fmt}'
 if '$ref' in schema:
 raise UserError(f'Recursive `$ref`s in JSON Schema are not supported by Gemini: {schema["$ref"]}')
 if 'prefixItems' in schema:
 # prefixItems is not currently supported in Gemini, so we convert it to items for best compatibility
 prefix_items = schema.pop('prefixItems')
 items = schema.get('items')
 unique_items = [items] if items is not None else []
 for item in prefix_items:
 if item not in unique_items:
 unique_items.append(item)
 if len(unique_items) > 1: # pragma: no cover
 schema['items'] = {'anyOf': unique_items}
 elif len(unique_items) == 1: # pragma: no branch
 schema['items'] = unique_items[0]
 schema.setdefault('minItems', len(prefix_items))
 if items is None: # pragma: no branch
 schema.setdefault('maxItems', len(prefix_items))
 return schema
```
---|--- 
### meta_model_profile
```
meta_model_profile(model_name: str[](https://docs.python.org/3/library/stdtypes.html#str)) -> ModelProfile[](#pydantic_ai.profiles.ModelProfile "pydantic_ai.profiles.ModelProfile") | None
```
Get the model profile for a Meta model.
Source code in `pydantic_ai_slim/pydantic_ai/profiles/meta.py`
```
6
7
8
```
| ```
defmeta_model_profile(model_name: str) -> ModelProfile | None:
"""Get the model profile for a Meta model."""
 return ModelProfile(json_schema_transformer=InlineDefsJsonSchemaTransformer)
```
---|--- 
### amazon_model_profile
```
amazon_model_profile(
 model_name: str[](https://docs.python.org/3/library/stdtypes.html#str),
) -> ModelProfile[](#pydantic_ai.profiles.ModelProfile "pydantic_ai.profiles.ModelProfile") | None
```
Get the model profile for an Amazon model.
Source code in `pydantic_ai_slim/pydantic_ai/profiles/amazon.py`
```
6
7
8
```
| ```
defamazon_model_profile(model_name: str) -> ModelProfile | None:
"""Get the model profile for an Amazon model."""
 return ModelProfile(json_schema_transformer=InlineDefsJsonSchemaTransformer)
```
---|--- 
### deepseek_model_profile
```
deepseek_model_profile(
 model_name: str[](https://docs.python.org/3/library/stdtypes.html#str),
) -> ModelProfile[](#pydantic_ai.profiles.ModelProfile "pydantic_ai.profiles.ModelProfile") | None
```
Get the model profile for a DeepSeek model.
Source code in `pydantic_ai_slim/pydantic_ai/profiles/deepseek.py`
```
6
7
8
```
| ```
defdeepseek_model_profile(model_name: str) -> ModelProfile | None:
"""Get the model profile for a DeepSeek model."""
 return ModelProfile(ignore_streamed_leading_whitespace='r1' in model_name)
```
---|--- 
### grok_model_profile
```
grok_model_profile(model_name: str[](https://docs.python.org/3/library/stdtypes.html#str)) -> ModelProfile[](#pydantic_ai.profiles.ModelProfile "pydantic_ai.profiles.ModelProfile") | None
```
Get the model profile for a Grok model.
Source code in `pydantic_ai_slim/pydantic_ai/profiles/grok.py`
```
6
7
8
```
| ```
defgrok_model_profile(model_name: str) -> ModelProfile | None:
"""Get the model profile for a Grok model."""
 return None
```
---|--- 
### mistral_model_profile
```
mistral_model_profile(
 model_name: str[](https://docs.python.org/3/library/stdtypes.html#str),
) -> ModelProfile[](#pydantic_ai.profiles.ModelProfile "pydantic_ai.profiles.ModelProfile") | None
```
Get the model profile for a Mistral model.
Source code in `pydantic_ai_slim/pydantic_ai/profiles/mistral.py`
```
6
7
8
```
| ```
defmistral_model_profile(model_name: str) -> ModelProfile | None:
"""Get the model profile for a Mistral model."""
 return None
```
---|--- 
### qwen_model_profile
```
qwen_model_profile(model_name: str[](https://docs.python.org/3/library/stdtypes.html#str)) -> ModelProfile[](#pydantic_ai.profiles.ModelProfile "pydantic_ai.profiles.ModelProfile") | None
```
Get the model profile for a Qwen model.
Source code in `pydantic_ai_slim/pydantic_ai/profiles/qwen.py`
```
 7
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
```
| ```
defqwen_model_profile(model_name: str) -> ModelProfile | None:
"""Get the model profile for a Qwen model."""
 if model_name.startswith('qwen-3-coder'):
 return OpenAIModelProfile(
 json_schema_transformer=InlineDefsJsonSchemaTransformer,
 openai_supports_tool_choice_required=False,
 openai_supports_strict_tool_definition=False,
 ignore_streamed_leading_whitespace=True,
 )
 return ModelProfile(
 json_schema_transformer=InlineDefsJsonSchemaTransformer,
 ignore_streamed_leading_whitespace=True,
 )
```
---|---