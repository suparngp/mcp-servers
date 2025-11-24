[ Skip to content ](#pydantic_aisettings)
# `pydantic_ai.settings`
### ModelSettings
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
Settings to configure an LLM.
Here we include only settings which apply to multiple models / model providers, though not all of these settings are supported by all models.
Source code in `pydantic_ai_slim/pydantic_ai/settings.py`
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
```
| ```
classModelSettings(TypedDict, total=False):
"""Settings to configure an LLM.
 Here we include only settings which apply to multiple models / model providers,
 though not all of these settings are supported by all models.
 """
 max_tokens: int
"""The maximum number of tokens to generate before stopping.
 Supported by:
 * Gemini
 * Anthropic
 * OpenAI
 * Groq
 * Cohere
 * Mistral
 * Bedrock
 * MCP Sampling
 * Outlines (all providers)
 """
 temperature: float
"""Amount of randomness injected into the response.
 Use `temperature` closer to `0.0` for analytical / multiple choice, and closer to a model's
 maximum `temperature` for creative and generative tasks.
 Note that even with `temperature` of `0.0`, the results will not be fully deterministic.
 Supported by:
 * Gemini
 * Anthropic
 * OpenAI
 * Groq
 * Cohere
 * Mistral
 * Bedrock
 * Outlines (Transformers, LlamaCpp, SgLang, VLLMOffline)
 """
 top_p: float
"""An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass.
 So 0.1 means only the tokens comprising the top 10% probability mass are considered.
 You should either alter `temperature` or `top_p`, but not both.
 Supported by:
 * Gemini
 * Anthropic
 * OpenAI
 * Groq
 * Cohere
 * Mistral
 * Bedrock
 * Outlines (Transformers, LlamaCpp, SgLang, VLLMOffline)
 """
 timeout: float | Timeout
"""Override the client-level default timeout for a request, in seconds.
 Supported by:
 * Gemini
 * Anthropic
 * OpenAI
 * Groq
 * Mistral
 """
 parallel_tool_calls: bool
"""Whether to allow parallel tool calls.
 Supported by:
 * OpenAI (some models, not o1)
 * Groq
 * Anthropic
 """
 seed: int
"""The random seed to use for the model, theoretically allowing for deterministic results.
 Supported by:
 * OpenAI
 * Groq
 * Cohere
 * Mistral
 * Gemini
 * Outlines (LlamaCpp, VLLMOffline)
 """
 presence_penalty: float
"""Penalize new tokens based on whether they have appeared in the text so far.
 Supported by:
 * OpenAI
 * Groq
 * Cohere
 * Gemini
 * Mistral
 * Outlines (LlamaCpp, SgLang, VLLMOffline)
 """
 frequency_penalty: float
"""Penalize new tokens based on their existing frequency in the text so far.
 Supported by:
 * OpenAI
 * Groq
 * Cohere
 * Gemini
 * Mistral
 * Outlines (LlamaCpp, SgLang, VLLMOffline)
 """
 logit_bias: dict[str, int]
"""Modify the likelihood of specified tokens appearing in the completion.
 Supported by:
 * OpenAI
 * Groq
 * Outlines (Transformers, LlamaCpp, VLLMOffline)
 """
 stop_sequences: list[str]
"""Sequences that will cause the model to stop generating.
 Supported by:
 * OpenAI
 * Anthropic
 * Bedrock
 * Mistral
 * Groq
 * Cohere
 * Google
 """
 extra_headers: dict[str, str]
"""Extra headers to send to the model.
 Supported by:
 * OpenAI
 * Anthropic
 * Groq
 """
 extra_body: object
"""Extra body to send to the model.
 Supported by:
 * OpenAI
 * Anthropic
 * Groq
 * Outlines (all providers)
 """
```
---|--- 
#### max_tokens `instance-attribute`
```
max_tokens: int[](https://docs.python.org/3/library/functions.html#int)
```
The maximum number of tokens to generate before stopping.
Supported by:
 * Gemini
 * Anthropic
 * OpenAI
 * Groq
 * Cohere
 * Mistral
 * Bedrock
 * MCP Sampling
 * Outlines (all providers)
#### temperature `instance-attribute`
```
temperature: float[](https://docs.python.org/3/library/functions.html#float)
```
Amount of randomness injected into the response.
Use `temperature` closer to `0.0` for analytical / multiple choice, and closer to a model's maximum `temperature` for creative and generative tasks.
Note that even with `temperature` of `0.0`, the results will not be fully deterministic.
Supported by:
 * Gemini
 * Anthropic
 * OpenAI
 * Groq
 * Cohere
 * Mistral
 * Bedrock
 * Outlines (Transformers, LlamaCpp, SgLang, VLLMOffline)
#### top_p `instance-attribute`
```
top_p: float[](https://docs.python.org/3/library/functions.html#float)
```
An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass.
So 0.1 means only the tokens comprising the top 10% probability mass are considered.
You should either alter `temperature` or `top_p`, but not both.
Supported by:
 * Gemini
 * Anthropic
 * OpenAI
 * Groq
 * Cohere
 * Mistral
 * Bedrock
 * Outlines (Transformers, LlamaCpp, SgLang, VLLMOffline)
#### timeout `instance-attribute`
```
timeout: float[](https://docs.python.org/3/library/functions.html#float) | Timeout
```
Override the client-level default timeout for a request, in seconds.
Supported by:
 * Gemini
 * Anthropic
 * OpenAI
 * Groq
 * Mistral
#### parallel_tool_calls `instance-attribute`
```
parallel_tool_calls: bool[](https://docs.python.org/3/library/functions.html#bool)
```
Whether to allow parallel tool calls.
Supported by:
 * OpenAI (some models, not o1)
 * Groq
 * Anthropic
#### seed `instance-attribute`
```
seed: int[](https://docs.python.org/3/library/functions.html#int)
```
The random seed to use for the model, theoretically allowing for deterministic results.
Supported by:
 * OpenAI
 * Groq
 * Cohere
 * Mistral
 * Gemini
 * Outlines (LlamaCpp, VLLMOffline)
#### presence_penalty `instance-attribute`
```
presence_penalty: float[](https://docs.python.org/3/library/functions.html#float)
```
Penalize new tokens based on whether they have appeared in the text so far.
Supported by:
 * OpenAI
 * Groq
 * Cohere
 * Gemini
 * Mistral
 * Outlines (LlamaCpp, SgLang, VLLMOffline)
#### frequency_penalty `instance-attribute`
```
frequency_penalty: float[](https://docs.python.org/3/library/functions.html#float)
```
Penalize new tokens based on their existing frequency in the text so far.
Supported by:
 * OpenAI
 * Groq
 * Cohere
 * Gemini
 * Mistral
 * Outlines (LlamaCpp, SgLang, VLLMOffline)
#### logit_bias `instance-attribute`
```
logit_bias: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), int[](https://docs.python.org/3/library/functions.html#int)]
```
Modify the likelihood of specified tokens appearing in the completion.
Supported by:
 * OpenAI
 * Groq
 * Outlines (Transformers, LlamaCpp, VLLMOffline)
#### stop_sequences `instance-attribute`
```
stop_sequences: list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Sequences that will cause the model to stop generating.
Supported by:
 * OpenAI
 * Anthropic
 * Bedrock
 * Mistral
 * Groq
 * Cohere
 * Google
#### extra_headers `instance-attribute`
```
extra_headers: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Extra headers to send to the model.
Supported by:
 * OpenAI
 * Anthropic
 * Groq
#### extra_body `instance-attribute`
```
extra_body: object[](https://docs.python.org/3/library/functions.html#object)
```
Extra body to send to the model.
Supported by:
 * OpenAI
 * Anthropic
 * Groq
 * Outlines (all providers)