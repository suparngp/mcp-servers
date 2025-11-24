[ Skip to content ](#pydantic_graphbetajoin)
# `pydantic_graph.beta.join`
Join operations and reducers for graph execution.
This module provides the core components for joining parallel execution paths in a graph, including various reducer types that aggregate data from multiple sources into a single output.
### JoinState `dataclass`
The state of a join during graph execution associated to a particular fork run.
Source code in `pydantic_graph/pydantic_graph/beta/join.py`
```
31
32
33
34
35
36
37
```
| ```
@dataclass
classJoinState:
"""The state of a join during graph execution associated to a particular fork run."""
 current: Any
 downstream_fork_stack: ForkStack
 cancelled_sibling_tasks: bool = False
```
---|--- 
### ReducerContext `dataclass`
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[StateT, DepsT]`
Context information passed to reducer functions during graph execution.
The reducer context provides access to the current graph state and dependencies.
Type Parameters
StateT: The type of the graph state DepsT: The type of the dependencies
Source code in `pydantic_graph/pydantic_graph/beta/join.py`
```
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
```
| ```
@dataclass(init=False)
classReducerContext(Generic[StateT, DepsT]):
"""Context information passed to reducer functions during graph execution.
 The reducer context provides access to the current graph state and dependencies.
 Type Parameters:
 StateT: The type of the graph state
 DepsT: The type of the dependencies
 """
 _state: StateT
"""The current graph state."""
 _deps: DepsT
"""The dependencies of the current graph run."""
 _join_state: JoinState
"""The JoinState for this reducer context."""
 def__init__(self, *, state: StateT, deps: DepsT, join_state: JoinState):
 self._state = state
 self._deps = deps
 self._join_state = join_state
 @property
 defstate(self) -> StateT:
"""The state of the graph run."""
 return self._state
 @property
 defdeps(self) -> DepsT:
"""The deps for the graph run."""
 return self._deps
 defcancel_sibling_tasks(self):
"""Cancel all sibling tasks created from the same fork.
 You can call this if you want your join to have early-stopping behavior.
 """
 self._join_state.cancelled_sibling_tasks = True
```
---|--- 
#### state `property`
```
state: StateT
```
The state of the graph run.
#### deps `property`
```
deps: DepsT
```
The deps for the graph run.
#### cancel_sibling_tasks
```
cancel_sibling_tasks()
```
Cancel all sibling tasks created from the same fork.
You can call this if you want your join to have early-stopping behavior.
Source code in `pydantic_graph/pydantic_graph/beta/join.py`
```
73
74
75
76
77
78
```
| ```
defcancel_sibling_tasks(self):
"""Cancel all sibling tasks created from the same fork.
 You can call this if you want your join to have early-stopping behavior.
 """
 self._join_state.cancelled_sibling_tasks = True
```
---|--- 
### ReducerFunction `module-attribute`
```
ReducerFunction = TypeAliasType[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypeAliasType "typing_extensions.TypeAliasType")(
 "ReducerFunction",
 ContextReducerFunction[StateT, DepsT, InputT, OutputT]
 | PlainReducerFunction[InputT, OutputT],
 type_params=(StateT, DepsT, InputT, OutputT),
)
```
A function used for reducing inputs to a join node.
### reduce_null
```
reduce_null(current: None, inputs: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")) -> None
```
A reducer that discards all input data and returns None.
Source code in `pydantic_graph/pydantic_graph/beta/join.py`
```
101
102
103
```
| ```
defreduce_null(current: None, inputs: Any) -> None:
"""A reducer that discards all input data and returns None."""
 return None
```
---|--- 
### reduce_list_append
```
reduce_list_append(
 current: list[](https://docs.python.org/3/library/stdtypes.html#list)[T], inputs: T
) -> list[](https://docs.python.org/3/library/stdtypes.html#list)[T]
```
A reducer that appends to a list.
Source code in `pydantic_graph/pydantic_graph/beta/join.py`
```
106
107
108
109
```
| ```
defreduce_list_append(current: list[T], inputs: T) -> list[T]:
"""A reducer that appends to a list."""
 current.append(inputs)
 return current
```
---|--- 
### reduce_list_extend
```
reduce_list_extend(
 current: list[](https://docs.python.org/3/library/stdtypes.html#list)[T], inputs: Iterable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Iterable "collections.abc.Iterable")[T]
) -> list[](https://docs.python.org/3/library/stdtypes.html#list)[T]
```
A reducer that extends a list.
Source code in `pydantic_graph/pydantic_graph/beta/join.py`
```
112
113
114
115
```
| ```
defreduce_list_extend(current: list[T], inputs: Iterable[T]) -> list[T]:
"""A reducer that extends a list."""
 current.extend(inputs)
 return current
```
---|--- 
### reduce_dict_update
```
reduce_dict_update(
 current: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[K, V], inputs: Mapping[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Mapping "collections.abc.Mapping")[K, V]
) -> dict[](https://docs.python.org/3/library/stdtypes.html#dict)[K, V]
```
A reducer that updates a dict.
Source code in `pydantic_graph/pydantic_graph/beta/join.py`
```
118
119
120
121
```
| ```
defreduce_dict_update(current: dict[K, V], inputs: Mapping[K, V]) -> dict[K, V]:
"""A reducer that updates a dict."""
 current.update(inputs)
 return current
```
---|--- 
### SupportsSum
Bases: `Protocol[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Protocol "typing_extensions.Protocol")`
A protocol for a type that supports adding to itself.
Source code in `pydantic_graph/pydantic_graph/beta/join.py`
```
124
125
126
127
128
129
```
| ```
classSupportsSum(Protocol):
"""A protocol for a type that supports adding to itself."""
 @abstractmethod
 def__add__(self, other: Self, /) -> Self:
 pass
```
---|--- 
### reduce_sum
```
reduce_sum(current: NumericT, inputs: NumericT) -> NumericT
```
A reducer that sums numbers.
Source code in `pydantic_graph/pydantic_graph/beta/join.py`
```
135
136
137
```
| ```
defreduce_sum(current: NumericT, inputs: NumericT) -> NumericT:
"""A reducer that sums numbers."""
 return current + inputs
```
---|--- 
### ReduceFirstValue `dataclass`
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[T]`
A reducer that returns the first value it encounters, and cancels all other tasks.
Source code in `pydantic_graph/pydantic_graph/beta/join.py`
```
140
141
142
143
144
145
146
147
```
| ```
@dataclass
classReduceFirstValue(Generic[T]):
"""A reducer that returns the first value it encounters, and cancels all other tasks."""
 def__call__(self, ctx: ReducerContext[object, object], current: T, inputs: T) -> T:
"""The reducer function."""
 ctx.cancel_sibling_tasks()
 return inputs
```
---|--- 
#### __call__
```
__call__(
 ctx: ReducerContext[](#pydantic_graph.beta.join.ReducerContext "pydantic_graph.beta.join.ReducerContext")[object[](https://docs.python.org/3/library/functions.html#object), object[](https://docs.python.org/3/library/functions.html#object)],
 current: T,
 inputs: T,
) -> T
```
The reducer function.
Source code in `pydantic_graph/pydantic_graph/beta/join.py`
```
144
145
146
147
```
| ```
def__call__(self, ctx: ReducerContext[object, object], current: T, inputs: T) -> T:
"""The reducer function."""
 ctx.cancel_sibling_tasks()
 return inputs
```
---|--- 
### Join `dataclass`
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[StateT, DepsT, InputT, OutputT]`
A join operation that synchronizes and aggregates parallel execution paths.
A join defines how to combine outputs from multiple parallel execution paths using a [`ReducerFunction`](#pydantic_graph.beta.join.ReducerFunction). It specifies which fork it joins (if any) and manages the initialization of reducers.
Type Parameters
StateT: The type of the graph state DepsT: The type of the dependencies InputT: The type of input data to join OutputT: The type of the final joined output
Source code in `pydantic_graph/pydantic_graph/beta/join.py`
```
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
```
| ```
@dataclass(init=False)
classJoin(Generic[StateT, DepsT, InputT, OutputT]):
"""A join operation that synchronizes and aggregates parallel execution paths.
 A join defines how to combine outputs from multiple parallel execution paths
 using a [`ReducerFunction`][pydantic_graph.beta.join.ReducerFunction]. It specifies which fork
 it joins (if any) and manages the initialization of reducers.
 Type Parameters:
 StateT: The type of the graph state
 DepsT: The type of the dependencies
 InputT: The type of input data to join
 OutputT: The type of the final joined output
 """
 id: JoinID
 _reducer: ReducerFunction[StateT, DepsT, InputT, OutputT]
 _initial_factory: Callable[[], OutputT]
 parent_fork_id: ForkID | None
 preferred_parent_fork: Literal['closest', 'farthest']
 def__init__(
 self,
 *,
 id: JoinID,
 reducer: ReducerFunction[StateT, DepsT, InputT, OutputT],
 initial_factory: Callable[[], OutputT],
 parent_fork_id: ForkID | None = None,
 preferred_parent_fork: Literal['farthest', 'closest'] = 'farthest',
 ):
 self.id = id
 self._reducer = reducer
 self._initial_factory = initial_factory
 self.parent_fork_id = parent_fork_id
 self.preferred_parent_fork = preferred_parent_fork
 @property
 defreducer(self):
 return self._reducer
 @property
 definitial_factory(self):
 return self._initial_factory
 defreduce(self, ctx: ReducerContext[StateT, DepsT], current: OutputT, inputs: InputT) -> OutputT:
 n_parameters = len(inspect.signature(self.reducer).parameters)
 if n_parameters == 2:
 return cast(PlainReducerFunction[InputT, OutputT], self.reducer)(current, inputs)
 else:
 return cast(ContextReducerFunction[StateT, DepsT, InputT, OutputT], self.reducer)(ctx, current, inputs)
 @overload
 defas_node(self, inputs: None = None) -> JoinNode[StateT, DepsT]: ...
 @overload
 defas_node(self, inputs: InputT) -> JoinNode[StateT, DepsT]: ...
 defas_node(self, inputs: InputT | None = None) -> JoinNode[StateT, DepsT]:
"""Create a step node with bound inputs.
 Args:
 inputs: The input data to bind to this step, or None
 Returns:
 A [`StepNode`][pydantic_graph.beta.step.StepNode] with this step and the bound inputs
 """
 return JoinNode(self, inputs)
```
---|--- 
#### as_node
```
as_node(inputs: None = None) -> JoinNode[](#pydantic_graph.beta.join.JoinNode "pydantic_graph.beta.join.JoinNode")[StateT, DepsT]
```
```
as_node(inputs: InputT) -> JoinNode[](#pydantic_graph.beta.join.JoinNode "pydantic_graph.beta.join.JoinNode")[StateT, DepsT]
```
```
as_node(
 inputs: InputT | None = None,
) -> JoinNode[](#pydantic_graph.beta.join.JoinNode "pydantic_graph.beta.join.JoinNode")[StateT, DepsT]
```
Create a step node with bound inputs.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`inputs` | `InputT | None` | The input data to bind to this step, or None | `None` 
Returns:
Type | Description 
---|--- 
`JoinNode[](#pydantic_graph.beta.join.JoinNode "pydantic_graph.beta.join.JoinNode")[StateT, DepsT]` | A [`StepNode`](../beta_step/#pydantic_graph.beta.step.StepNode) with this step and the bound inputs 
Source code in `pydantic_graph/pydantic_graph/beta/join.py`
```
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
```
| ```
defas_node(self, inputs: InputT | None = None) -> JoinNode[StateT, DepsT]:
"""Create a step node with bound inputs.
 Args:
 inputs: The input data to bind to this step, or None
 Returns:
 A [`StepNode`][pydantic_graph.beta.step.StepNode] with this step and the bound inputs
 """
 return JoinNode(self, inputs)
```
---|--- 
### JoinNode `dataclass`
Bases: `BaseNode[](../nodes/#pydantic_graph.nodes.BaseNode "pydantic_graph.BaseNode")[StateT, DepsT, Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]`
A base node that represents a join item with bound inputs.
JoinNode bridges between the v1 and v2 graph execution systems by wrapping a [`Join`](#pydantic_graph.beta.join.Join) with bound inputs in a BaseNode interface. It is not meant to be run directly but rather used to indicate transitions to v2-style steps.
Source code in `pydantic_graph/pydantic_graph/beta/join.py`
```
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
```
| ```
@dataclass
classJoinNode(BaseNode[StateT, DepsT, Any]):
"""A base node that represents a join item with bound inputs.
 JoinNode bridges between the v1 and v2 graph execution systems by wrapping
 a [`Join`][pydantic_graph.beta.join.Join] with bound inputs in a BaseNode interface.
 It is not meant to be run directly but rather used to indicate transitions
 to v2-style steps.
 """
 join: Join[StateT, DepsT, Any, Any]
"""The step to execute."""
 inputs: Any
"""The inputs bound to this step."""
 async defrun(self, ctx: GraphRunContext[StateT, DepsT]) -> BaseNode[StateT, DepsT, Any] | End[Any]:
"""Attempt to run the join node.
 Args:
 ctx: The graph execution context
 Returns:
 The result of step execution
 Raises:
 NotImplementedError: Always raised as StepNode is not meant to be run directly
 """
 raise NotImplementedError(
 '`JoinNode` is not meant to be run directly, it is meant to be used in `BaseNode` subclasses to indicate a transition to v2-style steps.'
 )
```
---|--- 
#### join `instance-attribute`
```
join: Join[](#pydantic_graph.beta.join.Join "pydantic_graph.beta.join.Join")[StateT, DepsT, Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
The step to execute.
#### inputs `instance-attribute`
```
inputs: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")
```
The inputs bound to this step.
#### run `async`
```
run(
 ctx: GraphRunContext[](../nodes/#pydantic_graph.nodes.GraphRunContext "pydantic_graph.GraphRunContext")[StateT, DepsT],
) -> BaseNode[](../nodes/#pydantic_graph.nodes.BaseNode "pydantic_graph.BaseNode")[StateT, DepsT, Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | End[](../nodes/#pydantic_graph.nodes.End "pydantic_graph.End")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
Attempt to run the join node.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`ctx` | `GraphRunContext[](../nodes/#pydantic_graph.nodes.GraphRunContext "pydantic_graph.GraphRunContext")[StateT, DepsT]` | The graph execution context | _required_ 
Returns:
Type | Description 
---|--- 
`BaseNode[](../nodes/#pydantic_graph.nodes.BaseNode "pydantic_graph.BaseNode")[StateT, DepsT, Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | End[](../nodes/#pydantic_graph.nodes.End "pydantic_graph.End")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]` | The result of step execution 
Raises:
Type | Description 
---|--- 
`NotImplementedError[](https://docs.python.org/3/library/exceptions.html#NotImplementedError)` | Always raised as StepNode is not meant to be run directly 
Source code in `pydantic_graph/pydantic_graph/beta/join.py`
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
```
| ```
async defrun(self, ctx: GraphRunContext[StateT, DepsT]) -> BaseNode[StateT, DepsT, Any] | End[Any]:
"""Attempt to run the join node.
 Args:
 ctx: The graph execution context
 Returns:
 The result of step execution
 Raises:
 NotImplementedError: Always raised as StepNode is not meant to be run directly
 """
 raise NotImplementedError(
 '`JoinNode` is not meant to be run directly, it is meant to be used in `BaseNode` subclasses to indicate a transition to v2-style steps.'
 )
```
---|---