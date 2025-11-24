[ Skip to content ](#pydantic_aiexceptions)
# `pydantic_ai.exceptions`
### ModelRetry
Bases: `Exception[](https://docs.python.org/3/library/exceptions.html#Exception)`
Exception to raise when a tool function should be retried.
The agent will return the message to the model and ask it to try calling the function/tool again.
Source code in `pydantic_ai_slim/pydantic_ai/exceptions.py`
```
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
classModelRetry(Exception):
"""Exception to raise when a tool function should be retried.
 The agent will return the message to the model and ask it to try calling the function/tool again.
 """
 message: str
"""The message to return to the model."""
 def__init__(self, message: str):
 self.message = message
 super().__init__(message)
 def__eq__(self, other: Any) -> bool:
 return isinstance(other, self.__class__) and other.message == self.message
 @classmethod
 def__get_pydantic_core_schema__(cls, _: Any, __: Any) -> core_schema.CoreSchema:
"""Pydantic core schema to allow `ModelRetry` to be (de)serialized."""
 schema = core_schema.typed_dict_schema(
 {
 'message': core_schema.typed_dict_field(core_schema.str_schema()),
 'kind': core_schema.typed_dict_field(core_schema.literal_schema(['model-retry'])),
 }
 )
 return core_schema.no_info_after_validator_function(
 lambda dct: ModelRetry(dct['message']),
 schema,
 serialization=core_schema.plain_serializer_function_ser_schema(
 lambda x: {'message': x.message, 'kind': 'model-retry'},
 return_schema=schema,
 ),
 )
```
---|--- 
#### message `instance-attribute`
```
message: str[](https://docs.python.org/3/library/stdtypes.html#str) = message
```
The message to return to the model.
#### __get_pydantic_core_schema__ `classmethod`
```
__get_pydantic_core_schema__(_: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any"), __: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")) -> CoreSchema
```
Pydantic core schema to allow `ModelRetry` to be (de)serialized.
Source code in `pydantic_ai_slim/pydantic_ai/exceptions.py`
```
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
@classmethod
def__get_pydantic_core_schema__(cls, _: Any, __: Any) -> core_schema.CoreSchema:
"""Pydantic core schema to allow `ModelRetry` to be (de)serialized."""
 schema = core_schema.typed_dict_schema(
 {
 'message': core_schema.typed_dict_field(core_schema.str_schema()),
 'kind': core_schema.typed_dict_field(core_schema.literal_schema(['model-retry'])),
 }
 )
 return core_schema.no_info_after_validator_function(
 lambda dct: ModelRetry(dct['message']),
 schema,
 serialization=core_schema.plain_serializer_function_ser_schema(
 lambda x: {'message': x.message, 'kind': 'model-retry'},
 return_schema=schema,
 ),
 )
```
---|--- 
### CallDeferred
Bases: `Exception[](https://docs.python.org/3/library/exceptions.html#Exception)`
Exception to raise when a tool call should be deferred.
See [tools docs](../../deferred-tools/#deferred-tools) for more information.
Source code in `pydantic_ai_slim/pydantic_ai/exceptions.py`
```
66
67
68
69
70
71
72
```
| ```
classCallDeferred(Exception):
"""Exception to raise when a tool call should be deferred.
 See [tools docs](../deferred-tools.md#deferred-tools) for more information.
 """
 pass
```
---|--- 
### ApprovalRequired
Bases: `Exception[](https://docs.python.org/3/library/exceptions.html#Exception)`
Exception to raise when a tool call requires human-in-the-loop approval.
See [tools docs](../../deferred-tools/#human-in-the-loop-tool-approval) for more information.
Source code in `pydantic_ai_slim/pydantic_ai/exceptions.py`
```
75
76
77
78
79
80
81
```
| ```
classApprovalRequired(Exception):
"""Exception to raise when a tool call requires human-in-the-loop approval.
 See [tools docs](../deferred-tools.md#human-in-the-loop-tool-approval) for more information.
 """
 pass
```
---|--- 
### UserError
Bases: `RuntimeError[](https://docs.python.org/3/library/exceptions.html#RuntimeError)`
Error caused by a usage mistake by the application developer — You!
Source code in `pydantic_ai_slim/pydantic_ai/exceptions.py`
```
84
85
86
87
88
89
90
91
92
```
| ```
classUserError(RuntimeError):
"""Error caused by a usage mistake by the application developer — You!"""
 message: str
"""Description of the mistake."""
 def__init__(self, message: str):
 self.message = message
 super().__init__(message)
```
---|--- 
#### message `instance-attribute`
```
message: str[](https://docs.python.org/3/library/stdtypes.html#str) = message
```
Description of the mistake.
### AgentRunError
Bases: `RuntimeError[](https://docs.python.org/3/library/exceptions.html#RuntimeError)`
Base class for errors occurring during an agent run.
Source code in `pydantic_ai_slim/pydantic_ai/exceptions.py`
```
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
classAgentRunError(RuntimeError):
"""Base class for errors occurring during an agent run."""
 message: str
"""The error message."""
 def__init__(self, message: str):
 self.message = message
 super().__init__(message)
 def__str__(self) -> str:
 return self.message
```
---|--- 
#### message `instance-attribute`
```
message: str[](https://docs.python.org/3/library/stdtypes.html#str) = message
```
The error message.
### UsageLimitExceeded
Bases: `AgentRunError[](#pydantic_ai.exceptions.AgentRunError "pydantic_ai.exceptions.AgentRunError")`
Error raised when a Model's usage exceeds the specified limits.
Source code in `pydantic_ai_slim/pydantic_ai/exceptions.py`
```
109
110
```
| ```
classUsageLimitExceeded(AgentRunError):
"""Error raised when a Model's usage exceeds the specified limits."""
```
---|--- 
### UnexpectedModelBehavior
Bases: `AgentRunError[](#pydantic_ai.exceptions.AgentRunError "pydantic_ai.exceptions.AgentRunError")`
Error caused by unexpected Model behavior, e.g. an unexpected response code.
Source code in `pydantic_ai_slim/pydantic_ai/exceptions.py`
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
```
| ```
classUnexpectedModelBehavior(AgentRunError):
"""Error caused by unexpected Model behavior, e.g. an unexpected response code."""
 message: str
"""Description of the unexpected behavior."""
 body: str | None
"""The body of the response, if available."""
 def__init__(self, message: str, body: str | None = None):
 self.message = message
 if body is None:
 self.body: str | None = None
 else:
 try:
 self.body = json.dumps(json.loads(body), indent=2)
 except ValueError:
 self.body = body
 super().__init__(message)
 def__str__(self) -> str:
 if self.body:
 return f'{self.message}, body:\n{self.body}'
 else:
 return self.message
```
---|--- 
#### message `instance-attribute`
```
message: str[](https://docs.python.org/3/library/stdtypes.html#str) = message
```
Description of the unexpected behavior.
#### body `instance-attribute`
```
body: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = dumps[](https://docs.python.org/3/library/json.html#json.dumps "json.dumps")(loads[](https://docs.python.org/3/library/json.html#json.loads "json.loads")(body), indent=2)
```
The body of the response, if available.
### ModelHTTPError
Bases: `AgentRunError[](#pydantic_ai.exceptions.AgentRunError "pydantic_ai.exceptions.AgentRunError")`
Raised when an model provider response has a status code of 4xx or 5xx.
Source code in `pydantic_ai_slim/pydantic_ai/exceptions.py`
```
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
```
| ```
classModelHTTPError(AgentRunError):
"""Raised when an model provider response has a status code of 4xx or 5xx."""
 status_code: int
"""The HTTP status code returned by the API."""
 model_name: str
"""The name of the model associated with the error."""
 body: object | None
"""The body of the response, if available."""
 message: str
"""The error message with the status code and response body, if available."""
 def__init__(self, status_code: int, model_name: str, body: object | None = None):
 self.status_code = status_code
 self.model_name = model_name
 self.body = body
 message = f'status_code: {status_code}, model_name: {model_name}, body: {body}'
 super().__init__(message)
```
---|--- 
#### message `instance-attribute`
```
message: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The error message with the status code and response body, if available.
#### status_code `instance-attribute`
```
status_code: int[](https://docs.python.org/3/library/functions.html#int) = status_code
```
The HTTP status code returned by the API.
#### model_name `instance-attribute`
```
model_name: str[](https://docs.python.org/3/library/stdtypes.html#str) = model_name
```
The name of the model associated with the error.
#### body `instance-attribute`
```
body: object[](https://docs.python.org/3/library/functions.html#object) | None = body
```
The body of the response, if available.
### FallbackExceptionGroup
Bases: `ExceptionGroup[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]`
A group of exceptions that can be raised when all fallback models fail.
Source code in `pydantic_ai_slim/pydantic_ai/exceptions.py`
```
162
163
```
| ```
classFallbackExceptionGroup(ExceptionGroup[Any]):
"""A group of exceptions that can be raised when all fallback models fail."""
```
---|--- 
### IncompleteToolCall
Bases: `UnexpectedModelBehavior[](#pydantic_ai.exceptions.UnexpectedModelBehavior "pydantic_ai.exceptions.UnexpectedModelBehavior")`
Error raised when a model stops due to token limit while emitting a tool call.
Source code in `pydantic_ai_slim/pydantic_ai/exceptions.py`
```
174
175
```
| ```
classIncompleteToolCall(UnexpectedModelBehavior):
"""Error raised when a model stops due to token limit while emitting a tool call."""
```
---|---