[ Skip to content ](#fasta2a_1)
# `fasta2a`
### FastA2A
Bases: `Starlette`
The main class for the FastA2A library.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/applications.py`
```
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
```
| ```
classFastA2A(Starlette):
"""The main class for the FastA2A library."""
 def__init__(
 self,
 *,
 storage: Storage,
 broker: Broker,
 # Agent card
 name: str | None = None,
 url: str = 'http://localhost:8000',
 version: str = '1.0.0',
 description: str | None = None,
 provider: AgentProvider | None = None,
 skills: list[Skill] | None = None,
 # Starlette
 debug: bool = False,
 routes: Sequence[Route] | None = None,
 middleware: Sequence[Middleware] | None = None,
 exception_handlers: dict[Any, ExceptionHandler] | None = None,
 lifespan: Lifespan[FastA2A] | None = None,
 ):
 if lifespan is None:
 lifespan = _default_lifespan
 super().__init__(
 debug=debug,
 routes=routes,
 middleware=middleware,
 exception_handlers=exception_handlers,
 lifespan=lifespan,
 )
 self.name = name or 'My Agent'
 self.url = url
 self.version = version
 self.description = description
 self.provider = provider
 self.skills = skills or []
 # NOTE: For now, I don't think there's any reason to support any other input/output modes.
 self.default_input_modes = ['application/json']
 self.default_output_modes = ['application/json']
 self.task_manager = TaskManager(broker=broker, storage=storage)
 # Setup
 self._agent_card_json_schema: bytes | None = None
 self.router.add_route('/.well-known/agent.json', self._agent_card_endpoint, methods=['HEAD', 'GET', 'OPTIONS'])
 self.router.add_route('/', self._agent_run_endpoint, methods=['POST'])
 self.router.add_route('/docs', self._docs_endpoint, methods=['GET'])
 async def__call__(self, scope: Scope, receive: Receive, send: Send) -> None:
 if scope['type'] == 'http' and not self.task_manager.is_running:
 raise RuntimeError('TaskManager was not properly initialized.')
 await super().__call__(scope, receive, send)
 async def_agent_card_endpoint(self, request: Request) -> Response:
 if self._agent_card_json_schema is None:
 agent_card = AgentCard(
 name=self.name,
 description=self.description or 'An AI agent exposed as an A2A agent.',
 url=self.url,
 version=self.version,
 protocol_version='0.2.5',
 skills=self.skills,
 default_input_modes=self.default_input_modes,
 default_output_modes=self.default_output_modes,
 capabilities=AgentCapabilities(
 streaming=False, push_notifications=False, state_transition_history=False
 ),
 )
 if self.provider is not None:
 agent_card['provider'] = self.provider
 self._agent_card_json_schema = agent_card_ta.dump_json(agent_card, by_alias=True)
 return Response(content=self._agent_card_json_schema, media_type='application/json')
 async def_docs_endpoint(self, request: Request) -> Response:
"""Serve the documentation interface."""
 docs_path = Path(__file__).parent / 'static' / 'docs.html'
 return FileResponse(docs_path, media_type='text/html')
 async def_agent_run_endpoint(self, request: Request) -> Response:
"""This is the main endpoint for the A2A server.
 Although the specification allows freedom of choice and implementation, I'm pretty sure about some decisions.
 1. The server will always either send a "submitted" or a "failed" on `tasks/send`.
 Never a "completed" on the first message.
 2. There are three possible ends for the task:
 2.1. The task was "completed" successfully.
 2.2. The task was "canceled".
 2.3. The task "failed".
 3. The server will send a "working" on the first chunk on `tasks/pushNotification/get`.
 """
 data = await request.body()
 a2a_request = a2a_request_ta.validate_json(data)
 if a2a_request['method'] == 'message/send':
 jsonrpc_response = await self.task_manager.send_message(a2a_request)
 elif a2a_request['method'] == 'tasks/get':
 jsonrpc_response = await self.task_manager.get_task(a2a_request)
 elif a2a_request['method'] == 'tasks/cancel':
 jsonrpc_response = await self.task_manager.cancel_task(a2a_request)
 else:
 raise NotImplementedError(f'Method {a2a_request["method"]} not implemented.')
 return Response(
 content=a2a_response_ta.dump_json(jsonrpc_response, by_alias=True), media_type='application/json'
 )
```
---|--- 
### Broker `dataclass`
Bases: `ABC[](https://docs.python.org/3/library/abc.html#abc.ABC "abc.ABC")`
The broker class is in charge of scheduling the tasks.
The HTTP server uses the broker to schedule tasks.
The simple implementation is the `InMemoryBroker`, which is the broker that runs the tasks in the same process as the HTTP server. That said, this class can be extended to support remote workers.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/broker.py`
```
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
```
| ```
@dataclass
classBroker(ABC):
"""The broker class is in charge of scheduling the tasks.
 The HTTP server uses the broker to schedule tasks.
 The simple implementation is the `InMemoryBroker`, which is the broker that
 runs the tasks in the same process as the HTTP server. That said, this class can be
 extended to support remote workers.
 """
 @abstractmethod
 async defrun_task(self, params: TaskSendParams) -> None:
"""Send a task to be executed by the worker."""
 raise NotImplementedError('send_run_task is not implemented yet.')
 @abstractmethod
 async defcancel_task(self, params: TaskIdParams) -> None:
"""Cancel a task."""
 raise NotImplementedError('send_cancel_task is not implemented yet.')
 @abstractmethod
 async def__aenter__(self) -> Self: ...
 @abstractmethod
 async def__aexit__(self, exc_type: Any, exc_value: Any, traceback: Any): ...
 @abstractmethod
 defreceive_task_operations(self) -> AsyncIterator[TaskOperation]:
"""Receive task operations from the broker.
 On a multi-worker setup, the broker will need to round-robin the task operations
 between the workers.
 """
```
---|--- 
#### run_task `abstractmethod` `async`
```
run_task(params: TaskSendParams[](#fasta2a.schema.TaskSendParams "fasta2a.schema.TaskSendParams")) -> None
```
Send a task to be executed by the worker.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/broker.py`
```
30
31
32
33
```
| ```
@abstractmethod
async defrun_task(self, params: TaskSendParams) -> None:
"""Send a task to be executed by the worker."""
 raise NotImplementedError('send_run_task is not implemented yet.')
```
---|--- 
#### cancel_task `abstractmethod` `async`
```
cancel_task(params: TaskIdParams[](#fasta2a.schema.TaskIdParams "fasta2a.schema.TaskIdParams")) -> None
```
Cancel a task.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/broker.py`
```
35
36
37
38
```
| ```
@abstractmethod
async defcancel_task(self, params: TaskIdParams) -> None:
"""Cancel a task."""
 raise NotImplementedError('send_cancel_task is not implemented yet.')
```
---|--- 
#### receive_task_operations `abstractmethod`
```
receive_task_operations() -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[TaskOperation]
```
Receive task operations from the broker.
On a multi-worker setup, the broker will need to round-robin the task operations between the workers.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/broker.py`
```
46
47
48
49
50
51
52
```
| ```
@abstractmethod
defreceive_task_operations(self) -> AsyncIterator[TaskOperation]:
"""Receive task operations from the broker.
 On a multi-worker setup, the broker will need to round-robin the task operations
 between the workers.
 """
```
---|--- 
### Skill
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
Skills are a unit of capability that an agent can perform.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
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
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classSkill(TypedDict):
"""Skills are a unit of capability that an agent can perform."""
 id: str
"""A unique identifier for the skill."""
 name: str
"""Human readable name of the skill."""
 description: str
"""A human-readable description of the skill.
 It will be used by the client or a human as a hint to understand the skill.
 """
 tags: list[str]
"""Set of tag-words describing classes of capabilities for this specific skill.
 Examples: "cooking", "customer support", "billing".
 """
 examples: NotRequired[list[str]]
"""The set of example scenarios that the skill can perform.
 Will be used by the client as a hint to understand how the skill can be used. (e.g. "I need a recipe for bread")
 """
 input_modes: list[str]
"""Supported mime types for input data."""
 output_modes: list[str]
"""Supported mime types for output data."""
```
---|--- 
#### id `instance-attribute`
```
id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
A unique identifier for the skill.
#### name `instance-attribute`
```
name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Human readable name of the skill.
#### description `instance-attribute`
```
description: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
A human-readable description of the skill.
It will be used by the client or a human as a hint to understand the skill.
#### tags `instance-attribute`
```
tags: list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Set of tag-words describing classes of capabilities for this specific skill.
Examples: "cooking", "customer support", "billing".
#### examples `instance-attribute`
```
examples: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)]]
```
The set of example scenarios that the skill can perform.
Will be used by the client as a hint to understand how the skill can be used. (e.g. "I need a recipe for bread")
#### input_modes `instance-attribute`
```
input_modes: list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Supported mime types for input data.
#### output_modes `instance-attribute`
```
output_modes: list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Supported mime types for output data.
### Storage
Bases: `ABC[](https://docs.python.org/3/library/abc.html#abc.ABC "abc.ABC")`, `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[ContextT]`
A storage to retrieve and save tasks, as well as retrieve and save context.
The storage serves two purposes: 1. Task storage: Stores tasks in A2A protocol format with their status, artifacts, and message history 2. Context storage: Stores conversation context in a format optimized for the specific agent implementation
Source code in `.venv/lib/python3.12/site-packages/fasta2a/storage.py`
```
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
```
| ```
classStorage(ABC, Generic[ContextT]):
"""A storage to retrieve and save tasks, as well as retrieve and save context.
 The storage serves two purposes:
 1. Task storage: Stores tasks in A2A protocol format with their status, artifacts, and message history
 2. Context storage: Stores conversation context in a format optimized for the specific agent implementation
 """
 @abstractmethod
 async defload_task(self, task_id: str, history_length: int | None = None) -> Task | None:
"""Load a task from storage.
 If the task is not found, return None.
 """
 @abstractmethod
 async defsubmit_task(self, context_id: str, message: Message) -> Task:
"""Submit a task to storage."""
 @abstractmethod
 async defupdate_task(
 self,
 task_id: str,
 state: TaskState,
 new_artifacts: list[Artifact] | None = None,
 new_messages: list[Message] | None = None,
 ) -> Task:
"""Update the state of a task. Appends artifacts and messages, if specified."""
 @abstractmethod
 async defload_context(self, context_id: str) -> ContextT | None:
"""Retrieve the stored context given the `context_id`."""
 @abstractmethod
 async defupdate_context(self, context_id: str, context: ContextT) -> None:
"""Updates the context for a `context_id`.
 Implementing agent can decide what to store in context.
 """
```
---|--- 
#### load_task `abstractmethod` `async`
```
load_task(
 task_id: str[](https://docs.python.org/3/library/stdtypes.html#str), history_length: int[](https://docs.python.org/3/library/functions.html#int) | None = None
) -> Task[](#fasta2a.schema.Task "fasta2a.schema.Task") | None
```
Load a task from storage.
If the task is not found, return None.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/storage.py`
```
25
26
27
28
29
30
```
| ```
@abstractmethod
async defload_task(self, task_id: str, history_length: int | None = None) -> Task | None:
"""Load a task from storage.
 If the task is not found, return None.
 """
```
---|--- 
#### submit_task `abstractmethod` `async`
```
submit_task(context_id: str[](https://docs.python.org/3/library/stdtypes.html#str), message: Message[](#fasta2a.schema.Message "fasta2a.schema.Message")) -> Task[](#fasta2a.schema.Task "fasta2a.schema.Task")
```
Submit a task to storage.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/storage.py`
```
32
33
34
```
| ```
@abstractmethod
async defsubmit_task(self, context_id: str, message: Message) -> Task:
"""Submit a task to storage."""
```
---|--- 
#### update_task `abstractmethod` `async`
```
update_task(
 task_id: str[](https://docs.python.org/3/library/stdtypes.html#str),
 state: TaskState[](#fasta2a.schema.TaskState "fasta2a.schema.TaskState"),
 new_artifacts: list[](https://docs.python.org/3/library/stdtypes.html#list)[Artifact[](#fasta2a.schema.Artifact "fasta2a.schema.Artifact")] | None = None,
 new_messages: list[](https://docs.python.org/3/library/stdtypes.html#list)[Message[](#fasta2a.schema.Message "fasta2a.schema.Message")] | None = None,
) -> Task[](#fasta2a.schema.Task "fasta2a.schema.Task")
```
Update the state of a task. Appends artifacts and messages, if specified.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/storage.py`
```
36
37
38
39
40
41
42
43
44
```
| ```
@abstractmethod
async defupdate_task(
 self,
 task_id: str,
 state: TaskState,
 new_artifacts: list[Artifact] | None = None,
 new_messages: list[Message] | None = None,
) -> Task:
"""Update the state of a task. Appends artifacts and messages, if specified."""
```
---|--- 
#### load_context `abstractmethod` `async`
```
load_context(context_id: str[](https://docs.python.org/3/library/stdtypes.html#str)) -> ContextT | None
```
Retrieve the stored context given the `context_id`.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/storage.py`
```
46
47
48
```
| ```
@abstractmethod
async defload_context(self, context_id: str) -> ContextT | None:
"""Retrieve the stored context given the `context_id`."""
```
---|--- 
#### update_context `abstractmethod` `async`
```
update_context(context_id: str[](https://docs.python.org/3/library/stdtypes.html#str), context: ContextT) -> None
```
Updates the context for a `context_id`.
Implementing agent can decide what to store in context.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/storage.py`
```
50
51
52
53
54
55
```
| ```
@abstractmethod
async defupdate_context(self, context_id: str, context: ContextT) -> None:
"""Updates the context for a `context_id`.
 Implementing agent can decide what to store in context.
 """
```
---|--- 
### Worker `dataclass`
Bases: `ABC[](https://docs.python.org/3/library/abc.html#abc.ABC "abc.ABC")`, `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[ContextT]`
A worker is responsible for executing tasks.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/worker.py`
```
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
```
| ```
@dataclass
classWorker(ABC, Generic[ContextT]):
"""A worker is responsible for executing tasks."""
 broker: Broker
 storage: Storage[ContextT]
 @asynccontextmanager
 async defrun(self) -> AsyncIterator[None]:
"""Run the worker.
 It connects to the broker, and it makes itself available to receive commands.
 """
 async with anyio.create_task_group() as tg:
 tg.start_soon(self._loop)
 yield
 tg.cancel_scope.cancel()
 async def_loop(self) -> None:
 async for task_operation in self.broker.receive_task_operations():
 await self._handle_task_operation(task_operation)
 async def_handle_task_operation(self, task_operation: TaskOperation) -> None:
 try:
 with use_span(task_operation['_current_span']):
 with tracer.start_as_current_span(
 f'{task_operation["operation"]} task', attributes={'logfire.tags': ['fasta2a']}
 ):
 if task_operation['operation'] == 'run':
 await self.run_task(task_operation['params'])
 elif task_operation['operation'] == 'cancel':
 await self.cancel_task(task_operation['params'])
 else:
 assert_never(task_operation)
 except Exception:
 await self.storage.update_task(task_operation['params']['id'], state='failed')
 @abstractmethod
 async defrun_task(self, params: TaskSendParams) -> None: ...
 @abstractmethod
 async defcancel_task(self, params: TaskIdParams) -> None: ...
 @abstractmethod
 defbuild_message_history(self, history: list[Message]) -> list[Any]: ...
 @abstractmethod
 defbuild_artifacts(self, result: Any) -> list[Artifact]: ...
```
---|--- 
#### run `async`
```
run() -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[None]
```
Run the worker.
It connects to the broker, and it makes itself available to receive commands.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/worker.py`
```
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
```
| ```
@asynccontextmanager
async defrun(self) -> AsyncIterator[None]:
"""Run the worker.
 It connects to the broker, and it makes itself available to receive commands.
 """
 async with anyio.create_task_group() as tg:
 tg.start_soon(self._loop)
 yield
 tg.cancel_scope.cancel()
```
---|--- 
This module contains the schema for the agent card.
### AgentCard
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
The card that describes an agent.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
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
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classAgentCard(TypedDict):
"""The card that describes an agent."""
 name: str
"""Human readable name of the agent e.g. "Recipe Agent"."""
 description: str
"""A human-readable description of the agent.
 Used to assist users and other agents in understanding what the agent can do.
 (e.g. "Agent that helps users with recipes and cooking.")
 """
 url: str
"""A URL to the address the agent is hosted at."""
 version: str
"""The version of the agent - format is up to the provider. (e.g. "1.0.0")"""
 protocol_version: str
"""The version of the A2A protocol this agent supports."""
 provider: NotRequired[AgentProvider]
"""The service provider of the agent."""
 documentation_url: NotRequired[str]
"""A URL to documentation for the agent."""
 icon_url: NotRequired[str]
"""A URL to an icon for the agent."""
 preferred_transport: NotRequired[str]
"""The transport of the preferred endpoint. If empty, defaults to JSONRPC."""
 additional_interfaces: NotRequired[list[AgentInterface]]
"""Announcement of additional supported transports."""
 capabilities: AgentCapabilities
"""The capabilities of the agent."""
 security: NotRequired[list[dict[str, list[str]]]]
"""Security requirements for contacting the agent."""
 security_schemes: NotRequired[dict[str, SecurityScheme]]
"""Security scheme definitions."""
 default_input_modes: list[str]
"""Supported mime types for input data."""
 default_output_modes: list[str]
"""Supported mime types for output data."""
 skills: list[Skill]
```
---|--- 
#### name `instance-attribute`
```
name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Human readable name of the agent e.g. "Recipe Agent".
#### description `instance-attribute`
```
description: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
A human-readable description of the agent.
Used to assist users and other agents in understanding what the agent can do. (e.g. "Agent that helps users with recipes and cooking.")
#### url `instance-attribute`
```
url: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
A URL to the address the agent is hosted at.
#### version `instance-attribute`
```
version: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The version of the agent - format is up to the provider. (e.g. "1.0.0")
#### protocol_version `instance-attribute`
```
protocol_version: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The version of the A2A protocol this agent supports.
#### provider `instance-attribute`
```
provider: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[AgentProvider[](#fasta2a.schema.AgentProvider "fasta2a.schema.AgentProvider")]
```
The service provider of the agent.
#### documentation_url `instance-attribute`
```
documentation_url: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
A URL to documentation for the agent.
#### icon_url `instance-attribute`
```
icon_url: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
A URL to an icon for the agent.
#### preferred_transport `instance-attribute`
```
preferred_transport: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
The transport of the preferred endpoint. If empty, defaults to JSONRPC.
#### additional_interfaces `instance-attribute`
```
additional_interfaces: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[list[](https://docs.python.org/3/library/stdtypes.html#list)[AgentInterface[](#fasta2a.schema.AgentInterface "fasta2a.schema.AgentInterface")]]
```
Announcement of additional supported transports.
#### capabilities `instance-attribute`
```
capabilities: AgentCapabilities[](#fasta2a.schema.AgentCapabilities "fasta2a.schema.AgentCapabilities")
```
The capabilities of the agent.
#### security `instance-attribute`
```
security: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[list[](https://docs.python.org/3/library/stdtypes.html#list)[dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)]]]]
```
Security requirements for contacting the agent.
#### security_schemes `instance-attribute`
```
security_schemes: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), SecurityScheme[](#fasta2a.schema.SecurityScheme "fasta2a.schema.SecurityScheme")]]
```
Security scheme definitions.
#### default_input_modes `instance-attribute`
```
default_input_modes: list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Supported mime types for input data.
#### default_output_modes `instance-attribute`
```
default_output_modes: list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Supported mime types for output data.
### AgentProvider
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
The service provider of the agent.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
72
73
74
75
76
```
| ```
classAgentProvider(TypedDict):
"""The service provider of the agent."""
 organization: str
 url: str
```
---|--- 
### AgentCapabilities
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
The capabilities of the agent.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
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
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classAgentCapabilities(TypedDict):
"""The capabilities of the agent."""
 streaming: NotRequired[bool]
"""Whether the agent supports streaming."""
 push_notifications: NotRequired[bool]
"""Whether the agent can notify updates to client."""
 state_transition_history: NotRequired[bool]
"""Whether the agent exposes status change history for tasks."""
```
---|--- 
#### streaming `instance-attribute`
```
streaming: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[bool[](https://docs.python.org/3/library/functions.html#bool)]
```
Whether the agent supports streaming.
#### push_notifications `instance-attribute`
```
push_notifications: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[bool[](https://docs.python.org/3/library/functions.html#bool)]
```
Whether the agent can notify updates to client.
#### state_transition_history `instance-attribute`
```
state_transition_history: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[bool[](https://docs.python.org/3/library/functions.html#bool)]
```
Whether the agent exposes status change history for tasks.
### HttpSecurityScheme
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
HTTP security scheme.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
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
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classHttpSecurityScheme(TypedDict):
"""HTTP security scheme."""
 type: Literal['http']
 scheme: str
"""The name of the HTTP Authorization scheme."""
 bearer_format: NotRequired[str]
"""A hint to the client to identify how the bearer token is formatted."""
 description: NotRequired[str]
"""Description of this security scheme."""
```
---|--- 
#### scheme `instance-attribute`
```
scheme: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The name of the HTTP Authorization scheme.
#### bearer_format `instance-attribute`
```
bearer_format: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
A hint to the client to identify how the bearer token is formatted.
#### description `instance-attribute`
```
description: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Description of this security scheme.
### ApiKeySecurityScheme
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
API Key security scheme.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
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
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classApiKeySecurityScheme(TypedDict):
"""API Key security scheme."""
 type: Literal['apiKey']
 name: str
"""The name of the header, query or cookie parameter to be used."""
 in_: Literal['query', 'header', 'cookie']
"""The location of the API key."""
 description: NotRequired[str]
"""Description of this security scheme."""
```
---|--- 
#### name `instance-attribute`
```
name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The name of the header, query or cookie parameter to be used.
#### in_ `instance-attribute`
```
in_: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['query', 'header', 'cookie']
```
The location of the API key.
#### description `instance-attribute`
```
description: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Description of this security scheme.
### OAuth2SecurityScheme
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
OAuth2 security scheme.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
119
120
121
122
123
124
125
126
127
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classOAuth2SecurityScheme(TypedDict):
"""OAuth2 security scheme."""
 type: Literal['oauth2']
 flows: dict[str, Any]
"""An object containing configuration information for the flow types supported."""
 description: NotRequired[str]
"""Description of this security scheme."""
```
---|--- 
#### flows `instance-attribute`
```
flows: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
An object containing configuration information for the flow types supported.
#### description `instance-attribute`
```
description: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Description of this security scheme.
### OpenIdConnectSecurityScheme
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
OpenID Connect security scheme.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
130
131
132
133
134
135
136
137
138
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classOpenIdConnectSecurityScheme(TypedDict):
"""OpenID Connect security scheme."""
 type: Literal['openIdConnect']
 open_id_connect_url: str
"""OpenId Connect URL to discover OAuth2 configuration values."""
 description: NotRequired[str]
"""Description of this security scheme."""
```
---|--- 
#### open_id_connect_url `instance-attribute`
```
open_id_connect_url: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
OpenId Connect URL to discover OAuth2 configuration values.
#### description `instance-attribute`
```
description: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Description of this security scheme.
### SecurityScheme `module-attribute`
```
SecurityScheme = Annotated[](https://docs.python.org/3/library/typing.html#typing.Annotated "typing.Annotated")[
 Union[](https://docs.python.org/3/library/typing.html#typing.Union "typing.Union")[
 HttpSecurityScheme[](#fasta2a.schema.HttpSecurityScheme "fasta2a.schema.HttpSecurityScheme"),
 ApiKeySecurityScheme[](#fasta2a.schema.ApiKeySecurityScheme "fasta2a.schema.ApiKeySecurityScheme"),
 OAuth2SecurityScheme[](#fasta2a.schema.OAuth2SecurityScheme "fasta2a.schema.OAuth2SecurityScheme"),
 OpenIdConnectSecurityScheme[](#fasta2a.schema.OpenIdConnectSecurityScheme "fasta2a.schema.OpenIdConnectSecurityScheme"),
 ],
 Field[](https://docs.pydantic.dev/latest/api/fields/#pydantic.fields.Field "pydantic.Field")(discriminator="type"),
]
```
A security scheme for authentication.
### AgentInterface
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
An interface that the agent supports.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
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
159
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classAgentInterface(TypedDict):
"""An interface that the agent supports."""
 transport: str
"""The transport protocol (e.g., 'jsonrpc', 'websocket')."""
 url: str
"""The URL endpoint for this transport."""
 description: NotRequired[str]
"""Description of this interface."""
```
---|--- 
#### transport `instance-attribute`
```
transport: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The transport protocol (e.g., 'jsonrpc', 'websocket').
#### url `instance-attribute`
```
url: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The URL endpoint for this transport.
#### description `instance-attribute`
```
description: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Description of this interface.
### AgentExtension
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
A declaration of an extension supported by an Agent.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
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
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classAgentExtension(TypedDict):
"""A declaration of an extension supported by an Agent."""
 uri: str
"""The URI of the extension."""
 description: NotRequired[str]
"""A description of how this agent uses this extension."""
 required: NotRequired[bool]
"""Whether the client must follow specific requirements of the extension."""
 params: NotRequired[dict[str, Any]]
"""Optional configuration for the extension."""
```
---|--- 
#### uri `instance-attribute`
```
uri: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The URI of the extension.
#### description `instance-attribute`
```
description: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
A description of how this agent uses this extension.
#### required `instance-attribute`
```
required: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[bool[](https://docs.python.org/3/library/functions.html#bool)]
```
Whether the client must follow specific requirements of the extension.
#### params `instance-attribute`
```
params: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]
```
Optional configuration for the extension.
### Skill
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
Skills are a unit of capability that an agent can perform.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
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
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classSkill(TypedDict):
"""Skills are a unit of capability that an agent can perform."""
 id: str
"""A unique identifier for the skill."""
 name: str
"""Human readable name of the skill."""
 description: str
"""A human-readable description of the skill.
 It will be used by the client or a human as a hint to understand the skill.
 """
 tags: list[str]
"""Set of tag-words describing classes of capabilities for this specific skill.
 Examples: "cooking", "customer support", "billing".
 """
 examples: NotRequired[list[str]]
"""The set of example scenarios that the skill can perform.
 Will be used by the client as a hint to understand how the skill can be used. (e.g. "I need a recipe for bread")
 """
 input_modes: list[str]
"""Supported mime types for input data."""
 output_modes: list[str]
"""Supported mime types for output data."""
```
---|--- 
#### id `instance-attribute`
```
id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
A unique identifier for the skill.
#### name `instance-attribute`
```
name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Human readable name of the skill.
#### description `instance-attribute`
```
description: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
A human-readable description of the skill.
It will be used by the client or a human as a hint to understand the skill.
#### tags `instance-attribute`
```
tags: list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Set of tag-words describing classes of capabilities for this specific skill.
Examples: "cooking", "customer support", "billing".
#### examples `instance-attribute`
```
examples: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)]]
```
The set of example scenarios that the skill can perform.
Will be used by the client as a hint to understand how the skill can be used. (e.g. "I need a recipe for bread")
#### input_modes `instance-attribute`
```
input_modes: list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Supported mime types for input data.
#### output_modes `instance-attribute`
```
output_modes: list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Supported mime types for output data.
### Artifact
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
Agents generate Artifacts as an end result of a Task.
Artifacts are immutable, can be named, and can have multiple parts. A streaming response can append parts to existing Artifacts.
A single Task can generate many Artifacts. For example, "create a webpage" could create separate HTML and image Artifacts.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
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
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classArtifact(TypedDict):
"""Agents generate Artifacts as an end result of a Task.
 Artifacts are immutable, can be named, and can have multiple parts. A streaming response can append parts to
 existing Artifacts.
 A single Task can generate many Artifacts. For example, "create a webpage" could create separate HTML and image
 Artifacts.
 """
 artifact_id: str
"""Unique identifier for the artifact."""
 name: NotRequired[str]
"""The name of the artifact."""
 description: NotRequired[str]
"""A description of the artifact."""
 parts: list[Part]
"""The parts that make up the artifact."""
 metadata: NotRequired[dict[str, Any]]
"""Metadata about the artifact."""
 extensions: NotRequired[list[str]]
"""Array of extensions."""
 append: NotRequired[bool]
"""Whether to append this artifact to an existing one."""
 last_chunk: NotRequired[bool]
"""Whether this is the last chunk of the artifact."""
```
---|--- 
#### artifact_id `instance-attribute`
```
artifact_id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Unique identifier for the artifact.
#### name `instance-attribute`
```
name: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
The name of the artifact.
#### description `instance-attribute`
```
description: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
A description of the artifact.
#### parts `instance-attribute`
```
parts: list[](https://docs.python.org/3/library/stdtypes.html#list)[Part[](#fasta2a.schema.Part "fasta2a.schema.Part")]
```
The parts that make up the artifact.
#### metadata `instance-attribute`
```
metadata: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]
```
Metadata about the artifact.
#### extensions `instance-attribute`
```
extensions: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)]]
```
Array of extensions.
#### append `instance-attribute`
```
append: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[bool[](https://docs.python.org/3/library/functions.html#bool)]
```
Whether to append this artifact to an existing one.
#### last_chunk `instance-attribute`
```
last_chunk: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[bool[](https://docs.python.org/3/library/functions.html#bool)]
```
Whether this is the last chunk of the artifact.
### PushNotificationConfig
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
Configuration for push notifications.
A2A supports a secure notification mechanism whereby an agent can notify a client of an update outside of a connected session via a PushNotificationService. Within and across enterprises, it is critical that the agent verifies the identity of the notification service, authenticates itself with the service, and presents an identifier that ties the notification to the executing Task.
The target server of the PushNotificationService should be considered a separate service, and is not guaranteed (or even expected) to be the client directly. This PushNotificationService is responsible for authenticating and authorizing the agent and for proxying the verified notification to the appropriate endpoint (which could be anything from a pub/sub queue, to an email inbox or other service, etc).
For contrived scenarios with isolated client-agent pairs (e.g. local service mesh in a contained VPC, etc.) or isolated environments without enterprise security concerns, the client may choose to simply open a port and act as its own PushNotificationService. Any enterprise implementation will likely have a centralized service that authenticates the remote agents with trusted notification credentials and can handle online/offline scenarios. (This should be thought of similarly to a mobile Push Notification Service).
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
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
260
261
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
273
274
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
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classPushNotificationConfig(TypedDict):
"""Configuration for push notifications.
 A2A supports a secure notification mechanism whereby an agent can notify a client of an update
 outside of a connected session via a PushNotificationService. Within and across enterprises,
 it is critical that the agent verifies the identity of the notification service, authenticates
 itself with the service, and presents an identifier that ties the notification to the executing
 Task.
 The target server of the PushNotificationService should be considered a separate service, and
 is not guaranteed (or even expected) to be the client directly. This PushNotificationService is
 responsible for authenticating and authorizing the agent and for proxying the verified notification
 to the appropriate endpoint (which could be anything from a pub/sub queue, to an email inbox or
 other service, etc).
 For contrived scenarios with isolated client-agent pairs (e.g. local service mesh in a contained
 VPC, etc.) or isolated environments without enterprise security concerns, the client may choose to
 simply open a port and act as its own PushNotificationService. Any enterprise implementation will
 likely have a centralized service that authenticates the remote agents with trusted notification
 credentials and can handle online/offline scenarios. (This should be thought of similarly to a
 mobile Push Notification Service).
 """
 id: NotRequired[str]
"""Server-assigned identifier."""
 url: str
"""The URL to send push notifications to."""
 token: NotRequired[str]
"""Token unique to this task/session."""
 authentication: NotRequired[SecurityScheme]
"""Authentication details for push notifications."""
```
---|--- 
#### id `instance-attribute`
```
id: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Server-assigned identifier.
#### url `instance-attribute`
```
url: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The URL to send push notifications to.
#### token `instance-attribute`
```
token: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Token unique to this task/session.
#### authentication `instance-attribute`
```
authentication: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[SecurityScheme[](#fasta2a.schema.SecurityScheme "fasta2a.schema.SecurityScheme")]
```
Authentication details for push notifications.
### TaskPushNotificationConfig
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
Configuration for task push notifications.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
287
288
289
290
291
292
293
294
295
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classTaskPushNotificationConfig(TypedDict):
"""Configuration for task push notifications."""
 id: str
"""The task id."""
 push_notification_config: PushNotificationConfig
"""The push notification configuration."""
```
---|--- 
#### id `instance-attribute`
```
id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The task id.
#### push_notification_config `instance-attribute`
```
push_notification_config: PushNotificationConfig[](#fasta2a.schema.PushNotificationConfig "fasta2a.schema.PushNotificationConfig")
```
The push notification configuration.
### Message
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
A Message contains any content that is not an Artifact.
This can include things like agent thoughts, user context, instructions, errors, status, or metadata.
All content from a client comes in the form of a Message. Agents send Messages to communicate status or to provide instructions (whereas generated results are sent as Artifacts).
A Message can have multiple parts to denote different pieces of content. For example, a user request could include a textual description from a user and then multiple files used as context from the client.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
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
335
336
337
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classMessage(TypedDict):
"""A Message contains any content that is not an Artifact.
 This can include things like agent thoughts, user context, instructions, errors, status, or metadata.
 All content from a client comes in the form of a Message. Agents send Messages to communicate status or to provide
 instructions (whereas generated results are sent as Artifacts).
 A Message can have multiple parts to denote different pieces of content. For example, a user request could include
 a textual description from a user and then multiple files used as context from the client.
 """
 role: Literal['user', 'agent']
"""The role of the message."""
 parts: list[Part]
"""The parts of the message."""
 kind: Literal['message']
"""Event type."""
 metadata: NotRequired[dict[str, Any]]
"""Metadata about the message."""
 # Additional fields
 message_id: str
"""Identifier created by the message creator."""
 context_id: NotRequired[str]
"""The context the message is associated with."""
 task_id: NotRequired[str]
"""Identifier of task the message is related to."""
 reference_task_ids: NotRequired[list[str]]
"""Array of task IDs this message references."""
 extensions: NotRequired[list[str]]
"""Array of extensions."""
```
---|--- 
#### role `instance-attribute`
```
role: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['user', 'agent']
```
The role of the message.
#### parts `instance-attribute`
```
parts: list[](https://docs.python.org/3/library/stdtypes.html#list)[Part[](#fasta2a.schema.Part "fasta2a.schema.Part")]
```
The parts of the message.
#### kind `instance-attribute`
```
kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['message']
```
Event type.
#### metadata `instance-attribute`
```
metadata: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]
```
Metadata about the message.
#### message_id `instance-attribute`
```
message_id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Identifier created by the message creator.
#### context_id `instance-attribute`
```
context_id: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
The context the message is associated with.
#### task_id `instance-attribute`
```
task_id: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Identifier of task the message is related to.
#### reference_task_ids `instance-attribute`
```
reference_task_ids: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)]]
```
Array of task IDs this message references.
#### extensions `instance-attribute`
```
extensions: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)]]
```
Array of extensions.
### TextPart
Bases: `_BasePart`
A part that contains text.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
346
347
348
349
350
351
352
353
354
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classTextPart(_BasePart):
"""A part that contains text."""
 kind: Literal['text']
"""The kind of the part."""
 text: str
"""The text of the part."""
```
---|--- 
#### kind `instance-attribute`
```
kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['text']
```
The kind of the part.
#### text `instance-attribute`
```
text: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The text of the part.
### FileWithBytes
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
File with base64 encoded data.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
357
358
359
360
361
362
363
364
365
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classFileWithBytes(TypedDict):
"""File with base64 encoded data."""
 bytes: str
"""The base64 encoded content of the file."""
 mime_type: NotRequired[str]
"""Optional mime type for the file."""
```
---|--- 
#### bytes `instance-attribute`
```
bytes: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The base64 encoded content of the file.
#### mime_type `instance-attribute`
```
mime_type: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Optional mime type for the file.
### FileWithUri
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
File with URI reference.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
368
369
370
371
372
373
374
375
376
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classFileWithUri(TypedDict):
"""File with URI reference."""
 uri: str
"""The URI of the file."""
 mime_type: NotRequired[str]
"""The mime type of the file."""
```
---|--- 
#### uri `instance-attribute`
```
uri: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The URI of the file.
#### mime_type `instance-attribute`
```
mime_type: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
The mime type of the file.
### FilePart
Bases: `_BasePart`
A part that contains a file.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
379
380
381
382
383
384
385
386
387
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classFilePart(_BasePart):
"""A part that contains a file."""
 kind: Literal['file']
"""The kind of the part."""
 file: FileWithBytes | FileWithUri
"""The file content - either bytes or URI."""
```
---|--- 
#### kind `instance-attribute`
```
kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['file']
```
The kind of the part.
#### file `instance-attribute`
```
file: FileWithBytes[](#fasta2a.schema.FileWithBytes "fasta2a.schema.FileWithBytes") | FileWithUri[](#fasta2a.schema.FileWithUri "fasta2a.schema.FileWithUri")
```
The file content - either bytes or URI.
### DataPart
Bases: `_BasePart`
A part that contains structured data.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
390
391
392
393
394
395
396
397
398
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classDataPart(_BasePart):
"""A part that contains structured data."""
 kind: Literal['data']
"""The kind of the part."""
 data: dict[str, Any]
"""The data of the part."""
```
---|--- 
#### kind `instance-attribute`
```
kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['data']
```
The kind of the part.
#### data `instance-attribute`
```
data: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
The data of the part.
### Part `module-attribute`
```
Part = Annotated[](https://docs.python.org/3/library/typing.html#typing.Annotated "typing.Annotated")[
 Union[](https://docs.python.org/3/library/typing.html#typing.Union "typing.Union")[TextPart[](#fasta2a.schema.TextPart "fasta2a.schema.TextPart"), FilePart[](#fasta2a.schema.FilePart "fasta2a.schema.FilePart"), DataPart[](#fasta2a.schema.DataPart "fasta2a.schema.DataPart")],
 Field[](https://docs.pydantic.dev/latest/api/fields/#pydantic.fields.Field "pydantic.Field")(discriminator="kind"),
]
```
A fully formed piece of content exchanged between a client and a remote agent as part of a Message or an Artifact.
Each Part has its own content type and metadata.
### TaskState `module-attribute`
```
TaskState: TypeAlias[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypeAlias "typing_extensions.TypeAlias") = Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[
 "submitted",
 "working",
 "input-required",
 "completed",
 "canceled",
 "failed",
 "rejected",
 "auth-required",
 "unknown",
]
```
The possible states of a task.
### TaskStatus
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
Status and accompanying message for a task.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
413
414
415
416
417
418
419
420
421
422
423
424
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classTaskStatus(TypedDict):
"""Status and accompanying message for a task."""
 state: TaskState
"""The current state of the task."""
 message: NotRequired[Message]
"""Additional status updates for client."""
 timestamp: NotRequired[str]
"""ISO datetime value of when the status was updated."""
```
---|--- 
#### state `instance-attribute`
```
state: TaskState[](#fasta2a.schema.TaskState "fasta2a.schema.TaskState")
```
The current state of the task.
#### message `instance-attribute`
```
message: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[Message[](#fasta2a.schema.Message "fasta2a.schema.Message")]
```
Additional status updates for client.
#### timestamp `instance-attribute`
```
timestamp: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
ISO datetime value of when the status was updated.
### Task
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
A Task is a stateful entity that allows Clients and Remote Agents to achieve a specific outcome.
Clients and Remote Agents exchange Messages within a Task. Remote Agents generate results as Artifacts. A Task is always created by a Client and the status is always determined by the Remote Agent.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
427
428
429
430
431
432
433
434
435
436
437
438
439
440
441
442
443
444
445
446
447
448
449
450
451
452
453
454
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classTask(TypedDict):
"""A Task is a stateful entity that allows Clients and Remote Agents to achieve a specific outcome.
 Clients and Remote Agents exchange Messages within a Task. Remote Agents generate results as Artifacts.
 A Task is always created by a Client and the status is always determined by the Remote Agent.
 """
 id: str
"""Unique identifier for the task."""
 context_id: str
"""The context the task is associated with."""
 kind: Literal['task']
"""Event type."""
 status: TaskStatus
"""Current status of the task."""
 history: NotRequired[list[Message]]
"""Optional history of messages."""
 artifacts: NotRequired[list[Artifact]]
"""Collection of artifacts created by the agent."""
 metadata: NotRequired[dict[str, Any]]
"""Extension metadata."""
```
---|--- 
#### id `instance-attribute`
```
id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Unique identifier for the task.
#### context_id `instance-attribute`
```
context_id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The context the task is associated with.
#### kind `instance-attribute`
```
kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['task']
```
Event type.
#### status `instance-attribute`
```
status: TaskStatus[](#fasta2a.schema.TaskStatus "fasta2a.schema.TaskStatus")
```
Current status of the task.
#### history `instance-attribute`
```
history: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[list[](https://docs.python.org/3/library/stdtypes.html#list)[Message[](#fasta2a.schema.Message "fasta2a.schema.Message")]]
```
Optional history of messages.
#### artifacts `instance-attribute`
```
artifacts: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[list[](https://docs.python.org/3/library/stdtypes.html#list)[Artifact[](#fasta2a.schema.Artifact "fasta2a.schema.Artifact")]]
```
Collection of artifacts created by the agent.
#### metadata `instance-attribute`
```
metadata: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]
```
Extension metadata.
### TaskStatusUpdateEvent
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
Sent by server during message/stream requests.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
457
458
459
460
461
462
463
464
465
466
467
468
469
470
471
472
473
474
475
476
477
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classTaskStatusUpdateEvent(TypedDict):
"""Sent by server during message/stream requests."""
 task_id: str
"""The id of the task."""
 context_id: str
"""The context the task is associated with."""
 kind: Literal['status-update']
"""Event type."""
 status: TaskStatus
"""The status of the task."""
 final: bool
"""Indicates the end of the event stream."""
 metadata: NotRequired[dict[str, Any]]
"""Extension metadata."""
```
---|--- 
#### task_id `instance-attribute`
```
task_id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The id of the task.
#### context_id `instance-attribute`
```
context_id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The context the task is associated with.
#### kind `instance-attribute`
```
kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['status-update']
```
Event type.
#### status `instance-attribute`
```
status: TaskStatus[](#fasta2a.schema.TaskStatus "fasta2a.schema.TaskStatus")
```
The status of the task.
#### final `instance-attribute`
```
final: bool[](https://docs.python.org/3/library/functions.html#bool)
```
Indicates the end of the event stream.
#### metadata `instance-attribute`
```
metadata: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]
```
Extension metadata.
### TaskArtifactUpdateEvent
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
Sent by server during message/stream requests.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
480
481
482
483
484
485
486
487
488
489
490
491
492
493
494
495
496
497
498
499
500
501
502
503
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classTaskArtifactUpdateEvent(TypedDict):
"""Sent by server during message/stream requests."""
 task_id: str
"""The id of the task."""
 context_id: str
"""The context the task is associated with."""
 kind: Literal['artifact-update']
"""Event type identification."""
 artifact: Artifact
"""The artifact that was updated."""
 append: NotRequired[bool]
"""Whether to append to existing artifact (true) or replace (false)."""
 last_chunk: NotRequired[bool]
"""Indicates this is the final chunk of the artifact."""
 metadata: NotRequired[dict[str, Any]]
"""Extension metadata."""
```
---|--- 
#### task_id `instance-attribute`
```
task_id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The id of the task.
#### context_id `instance-attribute`
```
context_id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The context the task is associated with.
#### kind `instance-attribute`
```
kind: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['artifact-update']
```
Event type identification.
#### artifact `instance-attribute`
```
artifact: Artifact[](#fasta2a.schema.Artifact "fasta2a.schema.Artifact")
```
The artifact that was updated.
#### append `instance-attribute`
```
append: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[bool[](https://docs.python.org/3/library/functions.html#bool)]
```
Whether to append to existing artifact (true) or replace (false).
#### last_chunk `instance-attribute`
```
last_chunk: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[bool[](https://docs.python.org/3/library/functions.html#bool)]
```
Indicates this is the final chunk of the artifact.
#### metadata `instance-attribute`
```
metadata: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]
```
Extension metadata.
### TaskIdParams
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
Parameters for a task id.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
506
507
508
509
510
511
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classTaskIdParams(TypedDict):
"""Parameters for a task id."""
 id: str
 metadata: NotRequired[dict[str, Any]]
```
---|--- 
### TaskQueryParams
Bases: `TaskIdParams[](#fasta2a.schema.TaskIdParams "fasta2a.schema.TaskIdParams")`
Query parameters for a task.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
514
515
516
517
518
519
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classTaskQueryParams(TaskIdParams):
"""Query parameters for a task."""
 history_length: NotRequired[int]
"""Number of recent messages to be retrieved."""
```
---|--- 
#### history_length `instance-attribute`
```
history_length: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[int[](https://docs.python.org/3/library/functions.html#int)]
```
Number of recent messages to be retrieved.
### MessageSendConfiguration
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
Configuration for the send message request.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
522
523
524
525
526
527
528
529
530
531
532
533
534
535
536
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classMessageSendConfiguration(TypedDict):
"""Configuration for the send message request."""
 accepted_output_modes: list[str]
"""Accepted output modalities by the client."""
 blocking: NotRequired[bool]
"""If the server should treat the client as a blocking request."""
 history_length: NotRequired[int]
"""Number of recent messages to be retrieved."""
 push_notification_config: NotRequired[PushNotificationConfig]
"""Where the server should send notifications when disconnected."""
```
---|--- 
#### accepted_output_modes `instance-attribute`
```
accepted_output_modes: list[](https://docs.python.org/3/library/stdtypes.html#list)[str[](https://docs.python.org/3/library/stdtypes.html#str)]
```
Accepted output modalities by the client.
#### blocking `instance-attribute`
```
blocking: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[bool[](https://docs.python.org/3/library/functions.html#bool)]
```
If the server should treat the client as a blocking request.
#### history_length `instance-attribute`
```
history_length: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[int[](https://docs.python.org/3/library/functions.html#int)]
```
Number of recent messages to be retrieved.
#### push_notification_config `instance-attribute`
```
push_notification_config: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[
 PushNotificationConfig[](#fasta2a.schema.PushNotificationConfig "fasta2a.schema.PushNotificationConfig")
]
```
Where the server should send notifications when disconnected.
### MessageSendParams
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
Parameters for message/send method.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
539
540
541
542
543
544
545
546
547
548
549
550
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classMessageSendParams(TypedDict):
"""Parameters for message/send method."""
 configuration: NotRequired[MessageSendConfiguration]
"""Send message configuration."""
 message: Message
"""The message being sent to the server."""
 metadata: NotRequired[dict[str, Any]]
"""Extension metadata."""
```
---|--- 
#### configuration `instance-attribute`
```
configuration: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[MessageSendConfiguration[](#fasta2a.schema.MessageSendConfiguration "fasta2a.schema.MessageSendConfiguration")]
```
Send message configuration.
#### message `instance-attribute`
```
message: Message[](#fasta2a.schema.Message "fasta2a.schema.Message")
```
The message being sent to the server.
#### metadata `instance-attribute`
```
metadata: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]
```
Extension metadata.
### TaskSendParams
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
Internal parameters for task execution within the framework.
Note: This is not part of the A2A protocol - it's used internally for broker/worker communication.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
553
554
555
556
557
558
559
560
561
562
563
564
565
566
567
568
569
570
571
572
573
574
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classTaskSendParams(TypedDict):
"""Internal parameters for task execution within the framework.
 Note: This is not part of the A2A protocol - it's used internally
 for broker/worker communication.
 """
 id: str
"""The id of the task."""
 context_id: str
"""The context id for the task."""
 message: Message
"""The message to process."""
 history_length: NotRequired[int]
"""Number of recent messages to be retrieved."""
 metadata: NotRequired[dict[str, Any]]
"""Extension metadata."""
```
---|--- 
#### id `instance-attribute`
```
id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The id of the task.
#### context_id `instance-attribute`
```
context_id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The context id for the task.
#### message `instance-attribute`
```
message: Message[](#fasta2a.schema.Message "fasta2a.schema.Message")
```
The message to process.
#### history_length `instance-attribute`
```
history_length: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[int[](https://docs.python.org/3/library/functions.html#int)]
```
Number of recent messages to be retrieved.
#### metadata `instance-attribute`
```
metadata: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]
```
Extension metadata.
### ListTaskPushNotificationConfigParams
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
Parameters for getting list of pushNotificationConfigurations associated with a Task.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
577
578
579
580
581
582
583
584
585
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classListTaskPushNotificationConfigParams(TypedDict):
"""Parameters for getting list of pushNotificationConfigurations associated with a Task."""
 id: str
"""Task id."""
 metadata: NotRequired[dict[str, Any]]
"""Extension metadata."""
```
---|--- 
#### id `instance-attribute`
```
id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Task id.
#### metadata `instance-attribute`
```
metadata: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]
```
Extension metadata.
### DeleteTaskPushNotificationConfigParams
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
Parameters for removing pushNotificationConfiguration associated with a Task.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
588
589
590
591
592
593
594
595
596
597
598
599
```
| ```
@pydantic.with_config({'alias_generator': to_camel})
classDeleteTaskPushNotificationConfigParams(TypedDict):
"""Parameters for removing pushNotificationConfiguration associated with a Task."""
 id: str
"""Task id."""
 push_notification_config_id: str
"""The push notification config id to delete."""
 metadata: NotRequired[dict[str, Any]]
"""Extension metadata."""
```
---|--- 
#### id `instance-attribute`
```
id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Task id.
#### push_notification_config_id `instance-attribute`
```
push_notification_config_id: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The push notification config id to delete.
#### metadata `instance-attribute`
```
metadata: NotRequired[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.NotRequired "typing_extensions.NotRequired")[dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]
```
Extension metadata.
### JSONRPCMessage
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
A JSON RPC message.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
602
603
604
605
606
607
608
609
```
| ```
classJSONRPCMessage(TypedDict):
"""A JSON RPC message."""
 jsonrpc: Literal['2.0']
"""The JSON RPC version."""
 id: int | str | None
"""The request id."""
```
---|--- 
#### jsonrpc `instance-attribute`
```
jsonrpc: Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")['2.0']
```
The JSON RPC version.
#### id `instance-attribute`
```
id: int[](https://docs.python.org/3/library/functions.html#int) | str[](https://docs.python.org/3/library/stdtypes.html#str) | None
```
The request id.
### JSONRPCRequest
Bases: `JSONRPCMessage[](#fasta2a.schema.JSONRPCMessage "fasta2a.schema.JSONRPCMessage")`, `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[Method, Params]`
A JSON RPC request.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
616
617
618
619
620
621
622
623
```
| ```
classJSONRPCRequest(JSONRPCMessage, Generic[Method, Params]):
"""A JSON RPC request."""
 method: Method
"""The method to call."""
 params: Params
"""The parameters to pass to the method."""
```
---|--- 
#### method `instance-attribute`
```
method: Method
```
The method to call.
#### params `instance-attribute`
```
params: Params
```
The parameters to pass to the method.
### JSONRPCError
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`, `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[CodeT, MessageT]`
A JSON RPC error.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
634
635
636
637
638
639
```
| ```
classJSONRPCError(TypedDict, Generic[CodeT, MessageT]):
"""A JSON RPC error."""
 code: CodeT
 message: MessageT
 data: NotRequired[Any]
```
---|--- 
### JSONRPCResponse
Bases: `JSONRPCMessage[](#fasta2a.schema.JSONRPCMessage "fasta2a.schema.JSONRPCMessage")`, `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[ResultT, ErrorT]`
A JSON RPC response.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/schema.py`
```
646
647
648
649
650
```
| ```
classJSONRPCResponse(JSONRPCMessage, Generic[ResultT, ErrorT]):
"""A JSON RPC response."""
 result: NotRequired[ResultT]
 error: NotRequired[ErrorT]
```
---|--- 
### JSONParseError `module-attribute`
```
JSONParseError = JSONRPCError[](#fasta2a.schema.JSONRPCError "fasta2a.schema.JSONRPCError")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[-32700], Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["Invalid JSON payload"]
]
```
A JSON RPC error for a parse error.
### InvalidRequestError `module-attribute`
```
InvalidRequestError = JSONRPCError[](#fasta2a.schema.JSONRPCError "fasta2a.schema.JSONRPCError")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[-32600],
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["Request payload validation error"],
]
```
A JSON RPC error for an invalid request.
### MethodNotFoundError `module-attribute`
```
MethodNotFoundError = JSONRPCError[](#fasta2a.schema.JSONRPCError "fasta2a.schema.JSONRPCError")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[-32601], Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["Method not found"]
]
```
A JSON RPC error for a method not found.
### InvalidParamsError `module-attribute`
```
InvalidParamsError = JSONRPCError[](#fasta2a.schema.JSONRPCError "fasta2a.schema.JSONRPCError")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[-32602], Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["Invalid parameters"]
]
```
A JSON RPC error for invalid parameters.
### InternalError `module-attribute`
```
InternalError = JSONRPCError[](#fasta2a.schema.JSONRPCError "fasta2a.schema.JSONRPCError")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[-32603], Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["Internal error"]
]
```
A JSON RPC error for an internal error.
### TaskNotFoundError `module-attribute`
```
TaskNotFoundError = JSONRPCError[](#fasta2a.schema.JSONRPCError "fasta2a.schema.JSONRPCError")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[-32001], Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["Task not found"]
]
```
A JSON RPC error for a task not found.
### TaskNotCancelableError `module-attribute`
```
TaskNotCancelableError = JSONRPCError[](#fasta2a.schema.JSONRPCError "fasta2a.schema.JSONRPCError")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[-32002], Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["Task not cancelable"]
]
```
A JSON RPC error for a task not cancelable.
### PushNotificationNotSupportedError `module-attribute`
```
PushNotificationNotSupportedError = JSONRPCError[](#fasta2a.schema.JSONRPCError "fasta2a.schema.JSONRPCError")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[-32003],
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["Push notification not supported"],
]
```
A JSON RPC error for a push notification not supported.
### UnsupportedOperationError `module-attribute`
```
UnsupportedOperationError = JSONRPCError[](#fasta2a.schema.JSONRPCError "fasta2a.schema.JSONRPCError")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[-32004],
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["This operation is not supported"],
]
```
A JSON RPC error for an unsupported operation.
### ContentTypeNotSupportedError `module-attribute`
```
ContentTypeNotSupportedError = JSONRPCError[](#fasta2a.schema.JSONRPCError "fasta2a.schema.JSONRPCError")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[-32005], Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["Incompatible content types"]
]
```
A JSON RPC error for incompatible content types.
### InvalidAgentResponseError `module-attribute`
```
InvalidAgentResponseError = JSONRPCError[](#fasta2a.schema.JSONRPCError "fasta2a.schema.JSONRPCError")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[-32006], Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["Invalid agent response"]
]
```
A JSON RPC error for invalid agent response.
### SendMessageRequest `module-attribute`
```
SendMessageRequest = JSONRPCRequest[](#fasta2a.schema.JSONRPCRequest "fasta2a.schema.JSONRPCRequest")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["message/send"], MessageSendParams[](#fasta2a.schema.MessageSendParams "fasta2a.schema.MessageSendParams")
]
```
A JSON RPC request to send a message.
### SendMessageResponse `module-attribute`
```
SendMessageResponse = JSONRPCResponse[](#fasta2a.schema.JSONRPCResponse "fasta2a.schema.JSONRPCResponse")[
 Union[](https://docs.python.org/3/library/typing.html#typing.Union "typing.Union")[Task[](#fasta2a.schema.Task "fasta2a.schema.Task"), Message[](#fasta2a.schema.Message "fasta2a.schema.Message")], JSONRPCError[](#fasta2a.schema.JSONRPCError "fasta2a.schema.JSONRPCError")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
]
```
A JSON RPC response to send a message.
### StreamMessageRequest `module-attribute`
```
StreamMessageRequest = JSONRPCRequest[](#fasta2a.schema.JSONRPCRequest "fasta2a.schema.JSONRPCRequest")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["message/stream"], MessageSendParams[](#fasta2a.schema.MessageSendParams "fasta2a.schema.MessageSendParams")
]
```
A JSON RPC request to stream a message.
### GetTaskRequest `module-attribute`
```
GetTaskRequest = JSONRPCRequest[](#fasta2a.schema.JSONRPCRequest "fasta2a.schema.JSONRPCRequest")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["tasks/get"], TaskQueryParams[](#fasta2a.schema.TaskQueryParams "fasta2a.schema.TaskQueryParams")
]
```
A JSON RPC request to get a task.
### GetTaskResponse `module-attribute`
```
GetTaskResponse = JSONRPCResponse[](#fasta2a.schema.JSONRPCResponse "fasta2a.schema.JSONRPCResponse")[Task[](#fasta2a.schema.Task "fasta2a.schema.Task"), TaskNotFoundError[](#fasta2a.schema.TaskNotFoundError "fasta2a.schema.TaskNotFoundError")]
```
A JSON RPC response to get a task.
### CancelTaskRequest `module-attribute`
```
CancelTaskRequest = JSONRPCRequest[](#fasta2a.schema.JSONRPCRequest "fasta2a.schema.JSONRPCRequest")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["tasks/cancel"], TaskIdParams[](#fasta2a.schema.TaskIdParams "fasta2a.schema.TaskIdParams")
]
```
A JSON RPC request to cancel a task.
### CancelTaskResponse `module-attribute`
```
CancelTaskResponse = JSONRPCResponse[](#fasta2a.schema.JSONRPCResponse "fasta2a.schema.JSONRPCResponse")[
 Task[](#fasta2a.schema.Task "fasta2a.schema.Task"), Union[](https://docs.python.org/3/library/typing.html#typing.Union "typing.Union")[TaskNotCancelableError[](#fasta2a.schema.TaskNotCancelableError "fasta2a.schema.TaskNotCancelableError"), TaskNotFoundError[](#fasta2a.schema.TaskNotFoundError "fasta2a.schema.TaskNotFoundError")]
]
```
A JSON RPC response to cancel a task.
### SetTaskPushNotificationRequest `module-attribute`
```
SetTaskPushNotificationRequest = JSONRPCRequest[](#fasta2a.schema.JSONRPCRequest "fasta2a.schema.JSONRPCRequest")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["tasks/pushNotification/set"],
 TaskPushNotificationConfig[](#fasta2a.schema.TaskPushNotificationConfig "fasta2a.schema.TaskPushNotificationConfig"),
]
```
A JSON RPC request to set a task push notification.
### SetTaskPushNotificationResponse `module-attribute`
```
SetTaskPushNotificationResponse = JSONRPCResponse[](#fasta2a.schema.JSONRPCResponse "fasta2a.schema.JSONRPCResponse")[
 TaskPushNotificationConfig[](#fasta2a.schema.TaskPushNotificationConfig "fasta2a.schema.TaskPushNotificationConfig"),
 PushNotificationNotSupportedError[](#fasta2a.schema.PushNotificationNotSupportedError "fasta2a.schema.PushNotificationNotSupportedError"),
]
```
A JSON RPC response to set a task push notification.
### GetTaskPushNotificationRequest `module-attribute`
```
GetTaskPushNotificationRequest = JSONRPCRequest[](#fasta2a.schema.JSONRPCRequest "fasta2a.schema.JSONRPCRequest")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["tasks/pushNotification/get"], TaskIdParams[](#fasta2a.schema.TaskIdParams "fasta2a.schema.TaskIdParams")
]
```
A JSON RPC request to get a task push notification.
### GetTaskPushNotificationResponse `module-attribute`
```
GetTaskPushNotificationResponse = JSONRPCResponse[](#fasta2a.schema.JSONRPCResponse "fasta2a.schema.JSONRPCResponse")[
 TaskPushNotificationConfig[](#fasta2a.schema.TaskPushNotificationConfig "fasta2a.schema.TaskPushNotificationConfig"),
 PushNotificationNotSupportedError[](#fasta2a.schema.PushNotificationNotSupportedError "fasta2a.schema.PushNotificationNotSupportedError"),
]
```
A JSON RPC response to get a task push notification.
### ResubscribeTaskRequest `module-attribute`
```
ResubscribeTaskRequest = JSONRPCRequest[](#fasta2a.schema.JSONRPCRequest "fasta2a.schema.JSONRPCRequest")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["tasks/resubscribe"], TaskIdParams[](#fasta2a.schema.TaskIdParams "fasta2a.schema.TaskIdParams")
]
```
A JSON RPC request to resubscribe to a task.
### ListTaskPushNotificationConfigRequest `module-attribute`
```
ListTaskPushNotificationConfigRequest = JSONRPCRequest[](#fasta2a.schema.JSONRPCRequest "fasta2a.schema.JSONRPCRequest")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["tasks/pushNotificationConfig/list"],
 ListTaskPushNotificationConfigParams[](#fasta2a.schema.ListTaskPushNotificationConfigParams "fasta2a.schema.ListTaskPushNotificationConfigParams"),
]
```
A JSON RPC request to list task push notification configs.
### DeleteTaskPushNotificationConfigRequest `module-attribute`
```
DeleteTaskPushNotificationConfigRequest = JSONRPCRequest[](#fasta2a.schema.JSONRPCRequest "fasta2a.schema.JSONRPCRequest")[
 Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")["tasks/pushNotificationConfig/delete"],
 DeleteTaskPushNotificationConfigParams[](#fasta2a.schema.DeleteTaskPushNotificationConfigParams "fasta2a.schema.DeleteTaskPushNotificationConfigParams"),
]
```
A JSON RPC request to delete a task push notification config.
### A2ARequest `module-attribute`
```
A2ARequest = Annotated[](https://docs.python.org/3/library/typing.html#typing.Annotated "typing.Annotated")[
 Union[](https://docs.python.org/3/library/typing.html#typing.Union "typing.Union")[
 SendMessageRequest[](#fasta2a.schema.SendMessageRequest "fasta2a.schema.SendMessageRequest"),
 StreamMessageRequest[](#fasta2a.schema.StreamMessageRequest "fasta2a.schema.StreamMessageRequest"),
 GetTaskRequest[](#fasta2a.schema.GetTaskRequest "fasta2a.schema.GetTaskRequest"),
 CancelTaskRequest[](#fasta2a.schema.CancelTaskRequest "fasta2a.schema.CancelTaskRequest"),
 SetTaskPushNotificationRequest[](#fasta2a.schema.SetTaskPushNotificationRequest "fasta2a.schema.SetTaskPushNotificationRequest"),
 GetTaskPushNotificationRequest[](#fasta2a.schema.GetTaskPushNotificationRequest "fasta2a.schema.GetTaskPushNotificationRequest"),
 ResubscribeTaskRequest[](#fasta2a.schema.ResubscribeTaskRequest "fasta2a.schema.ResubscribeTaskRequest"),
 ListTaskPushNotificationConfigRequest[](#fasta2a.schema.ListTaskPushNotificationConfigRequest "fasta2a.schema.ListTaskPushNotificationConfigRequest"),
 DeleteTaskPushNotificationConfigRequest[](#fasta2a.schema.DeleteTaskPushNotificationConfigRequest "fasta2a.schema.DeleteTaskPushNotificationConfigRequest"),
 ],
 Discriminator[](https://docs.pydantic.dev/latest/api/types/#pydantic.types.Discriminator "pydantic.Discriminator")("method"),
]
```
A JSON RPC request to the A2A server.
### A2AResponse `module-attribute`
```
A2AResponse: TypeAlias[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypeAlias "typing_extensions.TypeAlias") = Union[](https://docs.python.org/3/library/typing.html#typing.Union "typing.Union")[
 SendMessageResponse[](#fasta2a.schema.SendMessageResponse "fasta2a.schema.SendMessageResponse"),
 GetTaskResponse[](#fasta2a.schema.GetTaskResponse "fasta2a.schema.GetTaskResponse"),
 CancelTaskResponse[](#fasta2a.schema.CancelTaskResponse "fasta2a.schema.CancelTaskResponse"),
 SetTaskPushNotificationResponse[](#fasta2a.schema.SetTaskPushNotificationResponse "fasta2a.schema.SetTaskPushNotificationResponse"),
 GetTaskPushNotificationResponse[](#fasta2a.schema.GetTaskPushNotificationResponse "fasta2a.schema.GetTaskPushNotificationResponse"),
]
```
A JSON RPC response from the A2A server.
### A2AClient
A client for the A2A protocol.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/client.py`
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
```
| ```
classA2AClient:
"""A client for the A2A protocol."""
 def__init__(self, base_url: str = 'http://localhost:8000', http_client: httpx.AsyncClient | None = None) -> None:
 if http_client is None:
 self.http_client = httpx.AsyncClient(base_url=base_url)
 else:
 self.http_client = http_client
 self.http_client.base_url = base_url
 async defsend_message(
 self,
 message: Message,
 *,
 metadata: dict[str, Any] | None = None,
 configuration: MessageSendConfiguration | None = None,
 ) -> SendMessageResponse:
"""Send a message using the A2A protocol.
 Returns a JSON-RPC response containing either a result (Task) or an error.
 """
 params = MessageSendParams(message=message)
 if metadata is not None:
 params['metadata'] = metadata
 if configuration is not None:
 params['configuration'] = configuration
 request_id = str(uuid.uuid4())
 payload = SendMessageRequest(jsonrpc='2.0', id=request_id, method='message/send', params=params)
 content = send_message_request_ta.dump_json(payload, by_alias=True)
 response = await self.http_client.post('/', content=content, headers={'Content-Type': 'application/json'})
 self._raise_for_status(response)
 return send_message_response_ta.validate_json(response.content)
 async defget_task(self, task_id: str) -> GetTaskResponse:
 payload = GetTaskRequest(jsonrpc='2.0', id=None, method='tasks/get', params={'id': task_id})
 content = a2a_request_ta.dump_json(payload, by_alias=True)
 response = await self.http_client.post('/', content=content, headers={'Content-Type': 'application/json'})
 self._raise_for_status(response)
 return get_task_response_ta.validate_json(response.content)
 def_raise_for_status(self, response: httpx.Response) -> None:
 if response.status_code >= 400:
 raise UnexpectedResponseError(response.status_code, response.text)
```
---|--- 
#### send_message `async`
```
send_message(
 message: Message[](#fasta2a.schema.Message "fasta2a.schema.Message"),
 *,
 metadata: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = None,
 configuration: MessageSendConfiguration[](#fasta2a.schema.MessageSendConfiguration "fasta2a.schema.MessageSendConfiguration") | None = None
) -> SendMessageResponse[](#fasta2a.schema.SendMessageResponse "fasta2a.schema.SendMessageResponse")
```
Send a message using the A2A protocol.
Returns a JSON-RPC response containing either a result (Task) or an error.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/client.py`
```
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
```
| ```
async defsend_message(
 self,
 message: Message,
 *,
 metadata: dict[str, Any] | None = None,
 configuration: MessageSendConfiguration | None = None,
) -> SendMessageResponse:
"""Send a message using the A2A protocol.
 Returns a JSON-RPC response containing either a result (Task) or an error.
 """
 params = MessageSendParams(message=message)
 if metadata is not None:
 params['metadata'] = metadata
 if configuration is not None:
 params['configuration'] = configuration
 request_id = str(uuid.uuid4())
 payload = SendMessageRequest(jsonrpc='2.0', id=request_id, method='message/send', params=params)
 content = send_message_request_ta.dump_json(payload, by_alias=True)
 response = await self.http_client.post('/', content=content, headers={'Content-Type': 'application/json'})
 self._raise_for_status(response)
 return send_message_response_ta.validate_json(response.content)
```
---|--- 
### UnexpectedResponseError
Bases: `Exception[](https://docs.python.org/3/library/exceptions.html#Exception)`
An error raised when an unexpected response is received from the server.
Source code in `.venv/lib/python3.12/site-packages/fasta2a/client.py`
```
78
79
80
81
82
83
```
| ```
classUnexpectedResponseError(Exception):
"""An error raised when an unexpected response is received from the server."""
 def__init__(self, status_code: int, content: str) -> None:
 self.status_code = status_code
 self.content = content
```
---|---