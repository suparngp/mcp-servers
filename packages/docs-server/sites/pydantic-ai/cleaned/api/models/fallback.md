[ Skip to content ](#pydantic_aimodelsfallback)
# pydantic_ai.models.fallback
### FallbackModel `dataclass`
Bases: `Model[](../base/#pydantic_ai.models.Model "pydantic_ai.models.Model")`
A model that uses one or more fallback models upon failure.
Apart from `__init__`, all methods are private or match those of the base class.
Source code in `pydantic_ai_slim/pydantic_ai/models/fallback.py`
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
@dataclass(init=False)
classFallbackModel(Model):
"""A model that uses one or more fallback models upon failure.
 Apart from `__init__`, all methods are private or match those of the base class.
 """
 models: list[Model]
 _model_name: str = field(repr=False)
 _fallback_on: Callable[[Exception], bool]
 def__init__(
 self,
 default_model: Model | KnownModelName | str,
 *fallback_models: Model | KnownModelName | str,
 fallback_on: Callable[[Exception], bool] | tuple[type[Exception], ...] = (ModelHTTPError,),
 ):
"""Initialize a fallback model instance.
 Args:
 default_model: The name or instance of the default model to use.
 fallback_models: The names or instances of the fallback models to use upon failure.
 fallback_on: A callable or tuple of exceptions that should trigger a fallback.
 """
 super().__init__()
 self.models = [infer_model(default_model), *[infer_model(m) for m in fallback_models]]
 if isinstance(fallback_on, tuple):
 self._fallback_on = _default_fallback_condition_factory(fallback_on)
 else:
 self._fallback_on = fallback_on
 @property
 defmodel_name(self) -> str:
"""The model name."""
 return f'fallback:{",".join(model.model_nameformodelinself.models)}'
 @property
 defsystem(self) -> str:
 return f'fallback:{",".join(model.systemformodelinself.models)}'
 @property
 defbase_url(self) -> str | None:
 return self.models[0].base_url
 async defrequest(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ) -> ModelResponse:
"""Try each model in sequence until one succeeds.
 In case of failure, raise a FallbackExceptionGroup with all exceptions.
 """
 exceptions: list[Exception] = []
 for model in self.models:
 try:
 response = await model.request(messages, model_settings, model_request_parameters)
 except Exception as exc:
 if self._fallback_on(exc):
 exceptions.append(exc)
 continue
 raise exc
 self._set_span_attributes(model)
 return response
 raise FallbackExceptionGroup('All models from FallbackModel failed', exceptions)
 @asynccontextmanager
 async defrequest_stream(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 run_context: RunContext[Any] | None = None,
 ) -> AsyncIterator[StreamedResponse]:
"""Try each model in sequence until one succeeds."""
 exceptions: list[Exception] = []
 for model in self.models:
 async with AsyncExitStack() as stack:
 try:
 response = await stack.enter_async_context(
 model.request_stream(messages, model_settings, model_request_parameters, run_context)
 )
 except Exception as exc:
 if self._fallback_on(exc):
 exceptions.append(exc)
 continue
 raise exc # pragma: no cover
 self._set_span_attributes(model)
 yield response
 return
 raise FallbackExceptionGroup('All models from FallbackModel failed', exceptions)
 def_set_span_attributes(self, model: Model):
 with suppress(Exception):
 span = get_current_span()
 if span.is_recording():
 attributes = getattr(span, 'attributes', {})
 if attributes.get('gen_ai.request.model') == self.model_name: # pragma: no branch
 span.set_attributes(InstrumentedModel.model_attributes(model))
```
---|--- 
#### __init__
```
__init__(
 default_model: Model[](../base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str),
 *fallback_models: Model[](../base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str),
 fallback_on: (
 Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[Exception[](https://docs.python.org/3/library/exceptions.html#Exception)], bool[](https://docs.python.org/3/library/functions.html#bool)]
 | tuple[](https://docs.python.org/3/library/stdtypes.html#tuple)[type[](https://docs.python.org/3/library/functions.html#type)[Exception[](https://docs.python.org/3/library/exceptions.html#Exception)], ...]
 ) = (ModelHTTPError[](../../exceptions/#pydantic_ai.exceptions.ModelHTTPError "pydantic_ai.exceptions.ModelHTTPError"),)
)
```
Initialize a fallback model instance.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`default_model` | `Model[](../base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str)` | The name or instance of the default model to use. | _required_ 
`fallback_models` | `Model[](../base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str)` | The names or instances of the fallback models to use upon failure. | `()` 
`fallback_on` | `Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[Exception[](https://docs.python.org/3/library/exceptions.html#Exception)], bool[](https://docs.python.org/3/library/functions.html#bool)] | tuple[](https://docs.python.org/3/library/stdtypes.html#tuple)[type[](https://docs.python.org/3/library/functions.html#type)[Exception[](https://docs.python.org/3/library/exceptions.html#Exception)], ...]` | A callable or tuple of exceptions that should trigger a fallback. | `(ModelHTTPError[](../../exceptions/#pydantic_ai.exceptions.ModelHTTPError "pydantic_ai.exceptions.ModelHTTPError"),)` 
Source code in `pydantic_ai_slim/pydantic_ai/models/fallback.py`
```
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
```
| ```
def__init__(
 self,
 default_model: Model | KnownModelName | str,
 *fallback_models: Model | KnownModelName | str,
 fallback_on: Callable[[Exception], bool] | tuple[type[Exception], ...] = (ModelHTTPError,),
):
"""Initialize a fallback model instance.
 Args:
 default_model: The name or instance of the default model to use.
 fallback_models: The names or instances of the fallback models to use upon failure.
 fallback_on: A callable or tuple of exceptions that should trigger a fallback.
 """
 super().__init__()
 self.models = [infer_model(default_model), *[infer_model(m) for m in fallback_models]]
 if isinstance(fallback_on, tuple):
 self._fallback_on = _default_fallback_condition_factory(fallback_on)
 else:
 self._fallback_on = fallback_on
```
---|--- 
#### model_name `property`
```
model_name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The model name.
#### request `async`
```
request(
 messages: list[](https://docs.python.org/3/library/stdtypes.html#list)[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")],
 model_settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None,
 model_request_parameters: ModelRequestParameters[](../base/#pydantic_ai.models.ModelRequestParameters "pydantic_ai.models.ModelRequestParameters"),
) -> ModelResponse[](../../messages/#pydantic_ai.messages.ModelResponse "pydantic_ai.messages.ModelResponse")
```
Try each model in sequence until one succeeds.
In case of failure, raise a FallbackExceptionGroup with all exceptions.
Source code in `pydantic_ai_slim/pydantic_ai/models/fallback.py`
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
```
| ```
async defrequest(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
) -> ModelResponse:
"""Try each model in sequence until one succeeds.
 In case of failure, raise a FallbackExceptionGroup with all exceptions.
 """
 exceptions: list[Exception] = []
 for model in self.models:
 try:
 response = await model.request(messages, model_settings, model_request_parameters)
 except Exception as exc:
 if self._fallback_on(exc):
 exceptions.append(exc)
 continue
 raise exc
 self._set_span_attributes(model)
 return response
 raise FallbackExceptionGroup('All models from FallbackModel failed', exceptions)
```
---|--- 
#### request_stream `async`
```
request_stream(
 messages: list[](https://docs.python.org/3/library/stdtypes.html#list)[ModelMessage[](../../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")],
 model_settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None,
 model_request_parameters: ModelRequestParameters[](../base/#pydantic_ai.models.ModelRequestParameters "pydantic_ai.models.ModelRequestParameters"),
 run_context: RunContext[](../../tools/#pydantic_ai.tools.RunContext "pydantic_ai._run_context.RunContext")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = None,
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[StreamedResponse[](../base/#pydantic_ai.models.StreamedResponse "pydantic_ai.models.StreamedResponse")]
```
Try each model in sequence until one succeeds.
Source code in `pydantic_ai_slim/pydantic_ai/models/fallback.py`
```
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
```
| ```
@asynccontextmanager
async defrequest_stream(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 run_context: RunContext[Any] | None = None,
) -> AsyncIterator[StreamedResponse]:
"""Try each model in sequence until one succeeds."""
 exceptions: list[Exception] = []
 for model in self.models:
 async with AsyncExitStack() as stack:
 try:
 response = await stack.enter_async_context(
 model.request_stream(messages, model_settings, model_request_parameters, run_context)
 )
 except Exception as exc:
 if self._fallback_on(exc):
 exceptions.append(exc)
 continue
 raise exc # pragma: no cover
 self._set_span_attributes(model)
 yield response
 return
 raise FallbackExceptionGroup('All models from FallbackModel failed', exceptions)
```
---|---