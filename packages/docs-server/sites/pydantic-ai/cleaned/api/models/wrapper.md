[ Skip to content ](#pydantic_aimodelswrapper)
# pydantic_ai.models.wrapper
### WrapperModel `dataclass`
Bases: `Model[](../base/#pydantic_ai.models.Model "pydantic_ai.models.Model")`
Model which wraps another model.
Does nothing on its own, used as a base class.
Source code in `pydantic_ai_slim/pydantic_ai/models/wrapper.py`
```
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
```
| ```
@dataclass(init=False)
classWrapperModel(Model):
"""Model which wraps another model.
 Does nothing on its own, used as a base class.
 """
 wrapped: Model
"""The underlying model being wrapped."""
 def__init__(self, wrapped: Model | KnownModelName):
 super().__init__()
 self.wrapped = infer_model(wrapped)
 async defrequest(self, *args: Any, **kwargs: Any) -> ModelResponse:
 return await self.wrapped.request(*args, **kwargs)
 @asynccontextmanager
 async defrequest_stream(
 self,
 messages: list[ModelMessage],
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 run_context: RunContext[Any] | None = None,
 ) -> AsyncIterator[StreamedResponse]:
 async with self.wrapped.request_stream(
 messages, model_settings, model_request_parameters, run_context
 ) as response_stream:
 yield response_stream
 defcustomize_request_parameters(self, model_request_parameters: ModelRequestParameters) -> ModelRequestParameters:
 return self.wrapped.customize_request_parameters(model_request_parameters)
 defprepare_request(
 self,
 model_settings: ModelSettings | None,
 model_request_parameters: ModelRequestParameters,
 ) -> tuple[ModelSettings | None, ModelRequestParameters]:
 return self.wrapped.prepare_request(model_settings, model_request_parameters)
 @property
 defmodel_name(self) -> str:
 return self.wrapped.model_name
 @property
 defsystem(self) -> str:
 return self.wrapped.system
 @cached_property
 defprofile(self) -> ModelProfile:
 return self.wrapped.profile
 @property
 defsettings(self) -> ModelSettings | None:
"""Get the settings from the wrapped model."""
 return self.wrapped.settings
 def__getattr__(self, item: str):
 return getattr(self.wrapped, item)
```
---|--- 
#### wrapped `instance-attribute`
```
wrapped: Model[](../base/#pydantic_ai.models.Model "pydantic_ai.models.Model") = infer_model(wrapped)
```
The underlying model being wrapped.
#### settings `property`
```
settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None
```
Get the settings from the wrapped model.