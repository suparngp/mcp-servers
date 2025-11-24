[ Skip to content ](#pydantic_aiag_ui)
# `pydantic_ai.ag_ui`
Provides an AG-UI protocol adapter for the Pydantic AI agent.
This package provides seamless integration between pydantic-ai agents and ag-ui for building interactive AI applications with streaming event-based communication.
### SSE_CONTENT_TYPE `module-attribute`
```
SSE_CONTENT_TYPE = 'text/event-stream'
```
Content type header value for Server-Sent Events (SSE).
### OnCompleteFunc `module-attribute`
```
OnCompleteFunc: TypeAlias[](https://docs.python.org/3/library/typing.html#typing.TypeAlias "typing.TypeAlias") = (
 Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[AgentRunResult[](../run/#pydantic_ai.run.AgentRunResult "pydantic_ai.run.AgentRunResult")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]], None]
 | Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[AgentRunResult[](../run/#pydantic_ai.run.AgentRunResult "pydantic_ai.run.AgentRunResult")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]], Awaitable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Awaitable "collections.abc.Awaitable")[None]]
 | Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[AgentRunResult[](../run/#pydantic_ai.run.AgentRunResult "pydantic_ai.run.AgentRunResult")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]], AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EventT]]
)
```
Callback function type that receives the `AgentRunResult` of the completed run. Can be sync, async, or an async generator of protocol-specific events.
### StateDeps `dataclass`
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[StateT]`
Dependency type that holds state.
This class is used to manage the state of an agent run. It allows setting the state of the agent run with a specific type of state model, which must be a subclass of `BaseModel`.
The state is set using the `state` setter by the `Adapter` when the run starts.
Implements the `StateHandler` protocol.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_adapter.py`
```
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
classStateDeps(Generic[StateT]):
"""Dependency type that holds state.
 This class is used to manage the state of an agent run. It allows setting
 the state of the agent run with a specific type of state model, which must
 be a subclass of `BaseModel`.
 The state is set using the `state` setter by the `Adapter` when the run starts.
 Implements the `StateHandler` protocol.
 """
 state: StateT
```
---|--- 
### StateHandler
Bases: `Protocol[](https://docs.python.org/3/library/typing.html#typing.Protocol "typing.Protocol")`
Protocol for state handlers in agent runs. Requires the class to be a dataclass with a `state` field.
Source code in `pydantic_ai_slim/pydantic_ai/ui/_adapter.py`
```
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
```
| ```
@runtime_checkable
classStateHandler(Protocol):
"""Protocol for state handlers in agent runs. Requires the class to be a dataclass with a `state` field."""
 # Has to be a dataclass so we can use `replace` to update the state.
 # From https://github.com/python/typeshed/blob/9ab7fde0a0cd24ed7a72837fcb21093b811b80d8/stdlib/_typeshed/__init__.pyi#L352
 __dataclass_fields__: ClassVar[dict[str, Field[Any]]]
 @property
 defstate(self) -> Any:
"""Get the current state of the agent run."""
 ...
 @state.setter
 defstate(self, state: Any) -> None:
"""Set the state of the agent run.
 This method is called to update the state of the agent run with the
 provided state.
 Args:
 state: The run state.
 """
 ...
```
---|--- 
#### state `property` `writable`
```
state: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")
```
Get the current state of the agent run.
### AGUIApp
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]`, `Starlette`
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
 agent: AbstractAgent[](../agent/#pydantic_ai.agent.AbstractAgent "pydantic_ai.agent.AbstractAgent")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")],
 *,
 output_type: OutputSpec[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.toolsets.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 builtin_tools: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None
 ) = None,
 on_complete: OnCompleteFunc[](../ui/base/#pydantic_ai.ui.OnCompleteFunc "pydantic_ai.ui.OnCompleteFunc")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = None,
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
Note that the `deps` will be the same for each request, with the exception of the frontend state that's injected into the `state` field of a `deps` object that implements the [`StateHandler`](../ui/base/#pydantic_ai.ui.StateHandler) protocol. To provide different `deps` for each request (e.g. based on the authenticated user), use [`AGUIAdapter.run_stream()`](../ui/base/#pydantic_ai.ui.UIAdapter.run_stream) or [`AGUIAdapter.dispatch_request()`](../ui/base/#pydantic_ai.ui.UIAdapter.dispatch_request) instead.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`agent` | `AbstractAgent[](../agent/#pydantic_ai.agent.AbstractAgent "pydantic_ai.agent.AbstractAgent")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), OutputDataT[](../output/#pydantic_ai.output.OutputDataT "pydantic_ai.output.OutputDataT")]` | The agent to run. | _required_ 
`output_type` | `OutputSpec[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.toolsets.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`builtin_tools` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractBuiltinTool[](../builtin_tools/#pydantic_ai.builtin_tools.AbstractBuiltinTool "pydantic_ai.builtin_tools.AbstractBuiltinTool")] | None` | Optional additional builtin tools for this run. | `None` 
`on_complete` | `OnCompleteFunc[](../ui/base/#pydantic_ai.ui.OnCompleteFunc "pydantic_ai.ui.OnCompleteFunc")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None` | Optional callback function called when the agent run completes successfully. The callback receives the completed [`AgentRunResult`](../agent/#pydantic_ai.agent.AgentRunResult) and can access `all_messages()` and other result data. | `None` 
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
### handle_ag_ui_request `async`
```
handle_ag_ui_request(
 agent: AbstractAgent[](../agent/#pydantic_ai.agent.AbstractAgent "pydantic_ai.agent.AbstractAgent")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")],
 request: Request[](https://fastapi.tiangolo.com/reference/request/#fastapi.Request "starlette.requests.Request"),
 *,
 output_type: OutputSpec[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.toolsets.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 on_complete: OnCompleteFunc[](../ui/base/#pydantic_ai.ui.OnCompleteFunc "pydantic_ai.ui.OnCompleteFunc")[BaseEvent] | None = None
) -> Response[](https://fastapi.tiangolo.com/reference/response/#fastapi.Response "starlette.responses.Response")
```
Handle an AG-UI request by running the agent and returning a streaming response.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`agent` | `AbstractAgent[](../agent/#pydantic_ai.agent.AbstractAgent "pydantic_ai.agent.AbstractAgent")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]` | The agent to run. | _required_ 
`request` | `Request[](https://fastapi.tiangolo.com/reference/request/#fastapi.Request "starlette.requests.Request")` | The Starlette request (e.g. from FastAPI) containing the AG-UI run input. | _required_ 
`output_type` | `OutputSpec[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.toolsets.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`on_complete` | `OnCompleteFunc[](../ui/base/#pydantic_ai.ui.OnCompleteFunc "pydantic_ai.ui.OnCompleteFunc")[BaseEvent] | None` | Optional callback function called when the agent run completes successfully. The callback receives the completed [`AgentRunResult`](../agent/#pydantic_ai.agent.AgentRunResult) and can access `all_messages()` and other result data. | `None` 
Returns:
Type | Description 
---|--- 
`Response[](https://fastapi.tiangolo.com/reference/response/#fastapi.Response "starlette.responses.Response")` | A streaming Starlette response with AG-UI protocol events. 
Source code in `pydantic_ai_slim/pydantic_ai/ag_ui.py`
```
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
```
| ```
async defhandle_ag_ui_request(
 agent: AbstractAgent[AgentDepsT, Any],
 request: Request,
 *,
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
 on_complete: OnCompleteFunc[BaseEvent] | None = None,
) -> Response:
"""Handle an AG-UI request by running the agent and returning a streaming response.
 Args:
 agent: The agent to run.
 request: The Starlette request (e.g. from FastAPI) containing the AG-UI run input.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 on_complete: Optional callback function called when the agent run completes successfully.
 The callback receives the completed [`AgentRunResult`][pydantic_ai.agent.AgentRunResult] and can access `all_messages()` and other result data.
 Returns:
 A streaming Starlette response with AG-UI protocol events.
 """
 return await AGUIAdapter[AgentDepsT].dispatch_request(
 request,
 agent=agent,
 deps=deps,
 output_type=output_type,
 message_history=message_history,
 deferred_tool_results=deferred_tool_results,
 model=model,
 model_settings=model_settings,
 usage_limits=usage_limits,
 usage=usage,
 infer_name=infer_name,
 toolsets=toolsets,
 on_complete=on_complete,
 )
```
---|--- 
### run_ag_ui
```
run_ag_ui(
 agent: AbstractAgent[](../agent/#pydantic_ai.agent.AbstractAgent "pydantic_ai.agent.AbstractAgent")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")],
 run_input: RunAgentInput,
 accept: str[](https://docs.python.org/3/library/stdtypes.html#str) = SSE_CONTENT_TYPE[](../ui/base/#pydantic_ai.ui.SSE_CONTENT_TYPE "pydantic_ai.ui.SSE_CONTENT_TYPE"),
 *,
 output_type: OutputSpec[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = None,
 message_history: Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None = None,
 deferred_tool_results: (
 DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.DeferredToolResults") | None
 ) = None,
 model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 deps: AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT") = None,
 model_settings: ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
 usage_limits: UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None = None,
 usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True,
 toolsets: (
 Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.toolsets.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None
 ) = None,
 on_complete: OnCompleteFunc[](../ui/base/#pydantic_ai.ui.OnCompleteFunc "pydantic_ai.ui.OnCompleteFunc")[BaseEvent] | None = None
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Run the agent with the AG-UI run input and stream AG-UI protocol events.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`agent` | `AbstractAgent[](../agent/#pydantic_ai.agent.AbstractAgent "pydantic_ai.agent.AbstractAgent")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]` | The agent to run. | _required_ 
`run_input` | `RunAgentInput` | The AG-UI run input containing thread_id, run_id, messages, etc. | _required_ 
`accept` | `str[](https://docs.python.org/3/library/stdtypes.html#str)` | The accept header value for the run. | `SSE_CONTENT_TYPE[](../ui/base/#pydantic_ai.ui.SSE_CONTENT_TYPE "pydantic_ai.ui.SSE_CONTENT_TYPE")` 
`output_type` | `OutputSpec[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None` | Custom output type to use for this run, `output_type` may only be used if the agent has no output validators since output validators would expect an argument that matches the agent's output type. | `None` 
`message_history` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] | None` | History of the conversation so far. | `None` 
`deferred_tool_results` | `DeferredToolResults[](../tools/#pydantic_ai.tools.DeferredToolResults "pydantic_ai.DeferredToolResults") | None` | Optional results for deferred tool calls in the message history. | `None` 
`model` | `Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional model to use for this run, required if `model` was not set when creating the agent. | `None` 
`deps` | `AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")` | Optional dependencies to use for this run. | `None` 
`model_settings` | `ModelSettings[](../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None` | Optional settings to use for this model's request. | `None` 
`usage_limits` | `UsageLimits[](../usage/#pydantic_ai.usage.UsageLimits "pydantic_ai.usage.UsageLimits") | None` | Optional limits on model request count or token usage. | `None` 
`usage` | `RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.usage.RunUsage") | None` | Optional usage to start with, useful for resuming a conversation or agents used in tools. | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to try to infer the agent name from the call frame if it's not set. | `True` 
`toolsets` | `Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[AbstractToolset[](../toolsets/#pydantic_ai.toolsets.AbstractToolset "pydantic_ai.toolsets.AbstractToolset")[AgentDepsT[](../tools/#pydantic_ai.tools.AgentDepsT "pydantic_ai.tools.AgentDepsT")]] | None` | Optional additional toolsets for this run. | `None` 
`on_complete` | `OnCompleteFunc[](../ui/base/#pydantic_ai.ui.OnCompleteFunc "pydantic_ai.ui.OnCompleteFunc")[BaseEvent] | None` | Optional callback function called when the agent run completes successfully. The callback receives the completed [`AgentRunResult`](../agent/#pydantic_ai.agent.AgentRunResult) and can access `all_messages()` and other result data. | `None` 
Yields:
Type | Description 
---|--- 
`AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[str[](https://docs.python.org/3/library/stdtypes.html#str)]` | Streaming event chunks encoded as strings according to the accept header value. 
Source code in `pydantic_ai_slim/pydantic_ai/ag_ui.py`
```
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
```
| ```
defrun_ag_ui(
 agent: AbstractAgent[AgentDepsT, Any],
 run_input: RunAgentInput,
 accept: str = SSE_CONTENT_TYPE,
 *,
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
 on_complete: OnCompleteFunc[BaseEvent] | None = None,
) -> AsyncIterator[str]:
"""Run the agent with the AG-UI run input and stream AG-UI protocol events.
 Args:
 agent: The agent to run.
 run_input: The AG-UI run input containing thread_id, run_id, messages, etc.
 accept: The accept header value for the run.
 output_type: Custom output type to use for this run, `output_type` may only be used if the agent has no
 output validators since output validators would expect an argument that matches the agent's output type.
 message_history: History of the conversation so far.
 deferred_tool_results: Optional results for deferred tool calls in the message history.
 model: Optional model to use for this run, required if `model` was not set when creating the agent.
 deps: Optional dependencies to use for this run.
 model_settings: Optional settings to use for this model's request.
 usage_limits: Optional limits on model request count or token usage.
 usage: Optional usage to start with, useful for resuming a conversation or agents used in tools.
 infer_name: Whether to try to infer the agent name from the call frame if it's not set.
 toolsets: Optional additional toolsets for this run.
 on_complete: Optional callback function called when the agent run completes successfully.
 The callback receives the completed [`AgentRunResult`][pydantic_ai.agent.AgentRunResult] and can access `all_messages()` and other result data.
 Yields:
 Streaming event chunks encoded as strings according to the accept header value.
 """
 adapter = AGUIAdapter(agent=agent, run_input=run_input, accept=accept)
 return adapter.encode_stream(
 adapter.run_stream(
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
 on_complete=on_complete,
 ),
 )
```
---|---