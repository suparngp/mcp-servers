[ Skip to content ](#pydantic_graphbetagraph)
# `pydantic_graph.beta.graph`
Core graph execution engine for the next version of the pydantic-graph library.
This module provides the main `Graph` class and `GraphRun` execution engine that handles the orchestration of nodes, edges, and parallel execution paths in the graph-based workflow system.
### StateT `module-attribute`
```
StateT = TypeVar('StateT', infer_variance=True)
```
Type variable for graph state.
### DepsT `module-attribute`
```
DepsT = TypeVar('DepsT', infer_variance=True)
```
Type variable for graph dependencies.
### InputT `module-attribute`
```
InputT = TypeVar('InputT', infer_variance=True)
```
Type variable for graph inputs.
### OutputT `module-attribute`
```
OutputT = TypeVar('OutputT', infer_variance=True)
```
Type variable for graph outputs.
### EndMarker `dataclass`
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")]`
A marker indicating the end of graph execution with a final value.
EndMarker is used internally to signal that the graph has completed execution and carries the final output value.
Type Parameters
OutputT: The type of the final output value
Source code in `pydantic_graph/pydantic_graph/beta/graph.py`
```
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
```
| ```
@dataclass(init=False)
classEndMarker(Generic[OutputT]):
"""A marker indicating the end of graph execution with a final value.
 EndMarker is used internally to signal that the graph has completed
 execution and carries the final output value.
 Type Parameters:
 OutputT: The type of the final output value
 """
 _value: OutputT
"""The final output value from the graph execution."""
 def__init__(self, value: OutputT):
 # This manually-defined initializer is necessary due to https://github.com/python/mypy/issues/17623.
 self._value = value
 @property
 defvalue(self) -> OutputT:
 return self._value
```
---|--- 
### JoinItem `dataclass`
An item representing data flowing into a join operation.
JoinItem carries input data from a parallel execution path to a join node, along with metadata about which execution 'fork' it originated from.
Source code in `pydantic_graph/pydantic_graph/beta/graph.py`
```
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
@dataclass
classJoinItem:
"""An item representing data flowing into a join operation.
 JoinItem carries input data from a parallel execution path to a join
 node, along with metadata about which execution 'fork' it originated from.
 """
 join_id: JoinID
"""The ID of the join node this item is targeting."""
 inputs: Any
"""The input data for the join operation."""
 fork_stack: ForkStack
"""The stack of ForkStackItems that led to producing this join item."""
```
---|--- 
#### join_id `instance-attribute`
```
join_id: JoinID
```
The ID of the join node this item is targeting.
#### inputs `instance-attribute`
```
inputs: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")
```
The input data for the join operation.
#### fork_stack `instance-attribute`
```
fork_stack: ForkStack
```
The stack of ForkStackItems that led to producing this join item.
### Graph `dataclass`
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[StateT[](#pydantic_graph.beta.graph.StateT "pydantic_graph.beta.graph.StateT"), DepsT[](#pydantic_graph.beta.graph.DepsT "pydantic_graph.beta.graph.DepsT"), InputT[](#pydantic_graph.beta.graph.InputT "pydantic_graph.beta.graph.InputT"), OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")]`
A complete graph definition ready for execution.
The Graph class represents a complete workflow graph with typed inputs, outputs, state, and dependencies. It contains all nodes, edges, and metadata needed for execution.
Type Parameters
StateT: The type of the graph state DepsT: The type of the dependencies InputT: The type of the input data OutputT: The type of the output data
Source code in `pydantic_graph/pydantic_graph/beta/graph.py`
```
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
```
| ```
@dataclass(repr=False)
classGraph(Generic[StateT, DepsT, InputT, OutputT]):
"""A complete graph definition ready for execution.
 The Graph class represents a complete workflow graph with typed inputs,
 outputs, state, and dependencies. It contains all nodes, edges, and
 metadata needed for execution.
 Type Parameters:
 StateT: The type of the graph state
 DepsT: The type of the dependencies
 InputT: The type of the input data
 OutputT: The type of the output data
 """
 name: str | None
"""Optional name for the graph, if not provided the name will be inferred from the calling frame on the first call to a graph method."""
 state_type: type[StateT]
"""The type of the graph state."""
 deps_type: type[DepsT]
"""The type of the dependencies."""
 input_type: type[InputT]
"""The type of the input data."""
 output_type: type[OutputT]
"""The type of the output data."""
 auto_instrument: bool
"""Whether to automatically create instrumentation spans."""
 nodes: dict[NodeID, AnyNode]
"""All nodes in the graph indexed by their ID."""
 edges_by_source: dict[NodeID, list[Path]]
"""Outgoing paths from each source node."""
 parent_forks: dict[JoinID, ParentFork[NodeID]]
"""Parent fork information for each join node."""
 defget_parent_fork(self, join_id: JoinID) -> ParentFork[NodeID]:
"""Get the parent fork information for a join node.
 Args:
 join_id: The ID of the join node
 Returns:
 The parent fork information for the join
 Raises:
 RuntimeError: If the join ID is not found or has no parent fork
 """
 result = self.parent_forks.get(join_id)
 if result is None:
 raise RuntimeError(f'Node {join_id} is not a join node or did not have a dominating fork (this is a bug)')
 return result
 async defrun(
 self,
 *,
 state: StateT = None,
 deps: DepsT = None,
 inputs: InputT = None,
 span: AbstractContextManager[AbstractSpan] | None = None,
 infer_name: bool = True,
 ) -> OutputT:
"""Execute the graph and return the final output.
 This is the main entry point for graph execution. It runs the graph
 to completion and returns the final output value.
 Args:
 state: The graph state instance
 deps: The dependencies instance
 inputs: The input data for the graph
 span: Optional span for tracing/instrumentation
 infer_name: Whether to infer the graph name from the calling frame.
 Returns:
 The final output from the graph execution
 """
 if infer_name and self.name is None:
 inferred_name = infer_obj_name(self, depth=2)
 if inferred_name is not None: # pragma: no branch
 self.name = inferred_name
 async with self.iter(state=state, deps=deps, inputs=inputs, span=span, infer_name=False) as graph_run:
 # Note: This would probably be better using `async for _ in graph_run`, but this tests the `next` method,
 # which I'm less confident will be implemented correctly if not used on the critical path. We can change it
 # once we have tests, etc.
 event: Any = None
 while True:
 try:
 event = await graph_run.next(event)
 except StopAsyncIteration:
 assert isinstance(event, EndMarker), 'Graph run should end with an EndMarker.'
 return cast(EndMarker[OutputT], event).value
 @asynccontextmanager
 async defiter(
 self,
 *,
 state: StateT = None,
 deps: DepsT = None,
 inputs: InputT = None,
 span: AbstractContextManager[AbstractSpan] | None = None,
 infer_name: bool = True,
 ) -> AsyncIterator[GraphRun[StateT, DepsT, OutputT]]:
"""Create an iterator for step-by-step graph execution.
 This method allows for more fine-grained control over graph execution,
 enabling inspection of intermediate states and results.
 Args:
 state: The graph state instance
 deps: The dependencies instance
 inputs: The input data for the graph
 span: Optional span for tracing/instrumentation
 infer_name: Whether to infer the graph name from the calling frame.
 Yields:
 A GraphRun instance that can be iterated for step-by-step execution
 """
 if infer_name and self.name is None:
 inferred_name = infer_obj_name(self, depth=3) # depth=3 because asynccontextmanager adds one
 if inferred_name is not None: # pragma: no branch
 self.name = inferred_name
 with ExitStack() as stack:
 entered_span: AbstractSpan | None = None
 if span is None:
 if self.auto_instrument:
 entered_span = stack.enter_context(logfire_span('run graph {graph.name}', graph=self))
 else:
 entered_span = stack.enter_context(span)
 traceparent = None if entered_span is None else get_traceparent(entered_span)
 async with GraphRun[StateT, DepsT, OutputT](
 graph=self,
 state=state,
 deps=deps,
 inputs=inputs,
 traceparent=traceparent,
 ) as graph_run:
 yield graph_run
 defrender(self, *, title: str | None = None, direction: StateDiagramDirection | None = None) -> str:
"""Render the graph as a Mermaid diagram string.
 Args:
 title: Optional title for the diagram
 direction: Optional direction for the diagram layout
 Returns:
 A string containing the Mermaid diagram representation
 """
 frompydantic_graph.beta.mermaidimport build_mermaid_graph
 return build_mermaid_graph(self.nodes, self.edges_by_source).render(title=title, direction=direction)
 def__repr__(self) -> str:
 super_repr = super().__repr__() # include class and memory address
 # Insert the result of calling `__str__` before the final '>' in the repr
 return f'{super_repr[:-1]}\n{self}\n{super_repr[-1]}'
 def__str__(self) -> str:
"""Return a Mermaid diagram representation of the graph.
 Returns:
 A string containing the Mermaid diagram of the graph
 """
 return self.render()
```
---|--- 
#### name `instance-attribute`
```
name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None
```
Optional name for the graph, if not provided the name will be inferred from the calling frame on the first call to a graph method.
#### state_type `instance-attribute`
```
state_type: type[](https://docs.python.org/3/library/functions.html#type)[StateT[](#pydantic_graph.beta.graph.StateT "pydantic_graph.beta.graph.StateT")]
```
The type of the graph state.
#### deps_type `instance-attribute`
```
deps_type: type[](https://docs.python.org/3/library/functions.html#type)[DepsT[](#pydantic_graph.beta.graph.DepsT "pydantic_graph.beta.graph.DepsT")]
```
The type of the dependencies.
#### input_type `instance-attribute`
```
input_type: type[](https://docs.python.org/3/library/functions.html#type)[InputT[](#pydantic_graph.beta.graph.InputT "pydantic_graph.beta.graph.InputT")]
```
The type of the input data.
#### output_type `instance-attribute`
```
output_type: type[](https://docs.python.org/3/library/functions.html#type)[OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")]
```
The type of the output data.
#### auto_instrument `instance-attribute`
```
auto_instrument: bool[](https://docs.python.org/3/library/functions.html#bool)
```
Whether to automatically create instrumentation spans.
#### nodes `instance-attribute`
```
nodes: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[NodeID, AnyNode]
```
All nodes in the graph indexed by their ID.
#### edges_by_source `instance-attribute`
```
edges_by_source: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[NodeID, list[](https://docs.python.org/3/library/stdtypes.html#list)[Path]]
```
Outgoing paths from each source node.
#### parent_forks `instance-attribute`
```
parent_forks: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[JoinID, ParentFork[NodeID]]
```
Parent fork information for each join node.
#### get_parent_fork
```
get_parent_fork(join_id: JoinID) -> ParentFork[NodeID]
```
Get the parent fork information for a join node.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`join_id` | `JoinID` | The ID of the join node | _required_ 
Returns:
Type | Description 
---|--- 
`ParentFork[NodeID]` | The parent fork information for the join 
Raises:
Type | Description 
---|--- 
`RuntimeError[](https://docs.python.org/3/library/exceptions.html#RuntimeError)` | If the join ID is not found or has no parent fork 
Source code in `pydantic_graph/pydantic_graph/beta/graph.py`
```
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
```
| ```
defget_parent_fork(self, join_id: JoinID) -> ParentFork[NodeID]:
"""Get the parent fork information for a join node.
 Args:
 join_id: The ID of the join node
 Returns:
 The parent fork information for the join
 Raises:
 RuntimeError: If the join ID is not found or has no parent fork
 """
 result = self.parent_forks.get(join_id)
 if result is None:
 raise RuntimeError(f'Node {join_id} is not a join node or did not have a dominating fork (this is a bug)')
 return result
```
---|--- 
#### run `async`
```
run(
 *,
 state: StateT[](#pydantic_graph.beta.graph.StateT "pydantic_graph.beta.graph.StateT") = None,
 deps: DepsT[](#pydantic_graph.beta.graph.DepsT "pydantic_graph.beta.graph.DepsT") = None,
 inputs: InputT[](#pydantic_graph.beta.graph.InputT "pydantic_graph.beta.graph.InputT") = None,
 span: (
 AbstractContextManager[](https://docs.python.org/3/library/contextlib.html#contextlib.AbstractContextManager "contextlib.AbstractContextManager")[AbstractSpan] | None
 ) = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True
) -> OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")
```
Execute the graph and return the final output.
This is the main entry point for graph execution. It runs the graph to completion and returns the final output value.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`state` | `StateT[](#pydantic_graph.beta.graph.StateT "pydantic_graph.beta.graph.StateT")` | The graph state instance | `None` 
`deps` | `DepsT[](#pydantic_graph.beta.graph.DepsT "pydantic_graph.beta.graph.DepsT")` | The dependencies instance | `None` 
`inputs` | `InputT[](#pydantic_graph.beta.graph.InputT "pydantic_graph.beta.graph.InputT")` | The input data for the graph | `None` 
`span` | `AbstractContextManager[](https://docs.python.org/3/library/contextlib.html#contextlib.AbstractContextManager "contextlib.AbstractContextManager")[AbstractSpan] | None` | Optional span for tracing/instrumentation | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to infer the graph name from the calling frame. | `True` 
Returns:
Type | Description 
---|--- 
`OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")` | The final output from the graph execution 
Source code in `pydantic_graph/pydantic_graph/beta/graph.py`
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
```
| ```
async defrun(
 self,
 *,
 state: StateT = None,
 deps: DepsT = None,
 inputs: InputT = None,
 span: AbstractContextManager[AbstractSpan] | None = None,
 infer_name: bool = True,
) -> OutputT:
"""Execute the graph and return the final output.
 This is the main entry point for graph execution. It runs the graph
 to completion and returns the final output value.
 Args:
 state: The graph state instance
 deps: The dependencies instance
 inputs: The input data for the graph
 span: Optional span for tracing/instrumentation
 infer_name: Whether to infer the graph name from the calling frame.
 Returns:
 The final output from the graph execution
 """
 if infer_name and self.name is None:
 inferred_name = infer_obj_name(self, depth=2)
 if inferred_name is not None: # pragma: no branch
 self.name = inferred_name
 async with self.iter(state=state, deps=deps, inputs=inputs, span=span, infer_name=False) as graph_run:
 # Note: This would probably be better using `async for _ in graph_run`, but this tests the `next` method,
 # which I'm less confident will be implemented correctly if not used on the critical path. We can change it
 # once we have tests, etc.
 event: Any = None
 while True:
 try:
 event = await graph_run.next(event)
 except StopAsyncIteration:
 assert isinstance(event, EndMarker), 'Graph run should end with an EndMarker.'
 return cast(EndMarker[OutputT], event).value
```
---|--- 
#### iter `async`
```
iter(
 *,
 state: StateT[](#pydantic_graph.beta.graph.StateT "pydantic_graph.beta.graph.StateT") = None,
 deps: DepsT[](#pydantic_graph.beta.graph.DepsT "pydantic_graph.beta.graph.DepsT") = None,
 inputs: InputT[](#pydantic_graph.beta.graph.InputT "pydantic_graph.beta.graph.InputT") = None,
 span: (
 AbstractContextManager[](https://docs.python.org/3/library/contextlib.html#contextlib.AbstractContextManager "contextlib.AbstractContextManager")[AbstractSpan] | None
 ) = None,
 infer_name: bool[](https://docs.python.org/3/library/functions.html#bool) = True
) -> AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[GraphRun[](#pydantic_graph.beta.graph.GraphRun "pydantic_graph.beta.graph.GraphRun")[StateT[](#pydantic_graph.beta.graph.StateT "pydantic_graph.beta.graph.StateT"), DepsT[](#pydantic_graph.beta.graph.DepsT "pydantic_graph.beta.graph.DepsT"), OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")]]
```
Create an iterator for step-by-step graph execution.
This method allows for more fine-grained control over graph execution, enabling inspection of intermediate states and results.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`state` | `StateT[](#pydantic_graph.beta.graph.StateT "pydantic_graph.beta.graph.StateT")` | The graph state instance | `None` 
`deps` | `DepsT[](#pydantic_graph.beta.graph.DepsT "pydantic_graph.beta.graph.DepsT")` | The dependencies instance | `None` 
`inputs` | `InputT[](#pydantic_graph.beta.graph.InputT "pydantic_graph.beta.graph.InputT")` | The input data for the graph | `None` 
`span` | `AbstractContextManager[](https://docs.python.org/3/library/contextlib.html#contextlib.AbstractContextManager "contextlib.AbstractContextManager")[AbstractSpan] | None` | Optional span for tracing/instrumentation | `None` 
`infer_name` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether to infer the graph name from the calling frame. | `True` 
Yields:
Type | Description 
---|--- 
`AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[GraphRun[](#pydantic_graph.beta.graph.GraphRun "pydantic_graph.beta.graph.GraphRun")[StateT[](#pydantic_graph.beta.graph.StateT "pydantic_graph.beta.graph.StateT"), DepsT[](#pydantic_graph.beta.graph.DepsT "pydantic_graph.beta.graph.DepsT"), OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")]]` | A GraphRun instance that can be iterated for step-by-step execution 
Source code in `pydantic_graph/pydantic_graph/beta/graph.py`
```
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
```
| ```
@asynccontextmanager
async defiter(
 self,
 *,
 state: StateT = None,
 deps: DepsT = None,
 inputs: InputT = None,
 span: AbstractContextManager[AbstractSpan] | None = None,
 infer_name: bool = True,
) -> AsyncIterator[GraphRun[StateT, DepsT, OutputT]]:
"""Create an iterator for step-by-step graph execution.
 This method allows for more fine-grained control over graph execution,
 enabling inspection of intermediate states and results.
 Args:
 state: The graph state instance
 deps: The dependencies instance
 inputs: The input data for the graph
 span: Optional span for tracing/instrumentation
 infer_name: Whether to infer the graph name from the calling frame.
 Yields:
 A GraphRun instance that can be iterated for step-by-step execution
 """
 if infer_name and self.name is None:
 inferred_name = infer_obj_name(self, depth=3) # depth=3 because asynccontextmanager adds one
 if inferred_name is not None: # pragma: no branch
 self.name = inferred_name
 with ExitStack() as stack:
 entered_span: AbstractSpan | None = None
 if span is None:
 if self.auto_instrument:
 entered_span = stack.enter_context(logfire_span('run graph {graph.name}', graph=self))
 else:
 entered_span = stack.enter_context(span)
 traceparent = None if entered_span is None else get_traceparent(entered_span)
 async with GraphRun[StateT, DepsT, OutputT](
 graph=self,
 state=state,
 deps=deps,
 inputs=inputs,
 traceparent=traceparent,
 ) as graph_run:
 yield graph_run
```
---|--- 
#### render
```
render(
 *,
 title: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 direction: StateDiagramDirection | None = None
) -> str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Render the graph as a Mermaid diagram string.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`title` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional title for the diagram | `None` 
`direction` | `StateDiagramDirection | None` | Optional direction for the diagram layout | `None` 
Returns:
Type | Description 
---|--- 
`str[](https://docs.python.org/3/library/stdtypes.html#str)` | A string containing the Mermaid diagram representation 
Source code in `pydantic_graph/pydantic_graph/beta/graph.py`
```
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
```
| ```
defrender(self, *, title: str | None = None, direction: StateDiagramDirection | None = None) -> str:
"""Render the graph as a Mermaid diagram string.
 Args:
 title: Optional title for the diagram
 direction: Optional direction for the diagram layout
 Returns:
 A string containing the Mermaid diagram representation
 """
 frompydantic_graph.beta.mermaidimport build_mermaid_graph
 return build_mermaid_graph(self.nodes, self.edges_by_source).render(title=title, direction=direction)
```
---|--- 
#### __str__
```
__str__() -> str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Return a Mermaid diagram representation of the graph.
Returns:
Type | Description 
---|--- 
`str[](https://docs.python.org/3/library/stdtypes.html#str)` | A string containing the Mermaid diagram of the graph 
Source code in `pydantic_graph/pydantic_graph/beta/graph.py`
```
275
276
277
278
279
280
281
```
| ```
def__str__(self) -> str:
"""Return a Mermaid diagram representation of the graph.
 Returns:
 A string containing the Mermaid diagram of the graph
 """
 return self.render()
```
---|--- 
### GraphTask `dataclass`
A single task representing the execution of a node in the graph.
GraphTask encapsulates all the information needed to execute a specific node, including its inputs and the fork context it's executing within.
Source code in `pydantic_graph/pydantic_graph/beta/graph.py`
```
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
```
| ```
@dataclass
classGraphTask:
"""A single task representing the execution of a node in the graph.
 GraphTask encapsulates all the information needed to execute a specific
 node, including its inputs and the fork context it's executing within.
 """
 # With our current BaseNode thing, next_node_id and next_node_inputs are merged into `next_node` itself
 node_id: NodeID
"""The ID of the node to execute."""
 inputs: Any
"""The input data for the node."""
 fork_stack: ForkStack = field(repr=False)
"""Stack of forks that have been entered.
 Used by the GraphRun to decide when to proceed through joins.
 """
 task_id: TaskID = field(default_factory=lambda: TaskID(str(uuid.uuid4())), repr=False)
"""Unique identifier for this task."""
```
---|--- 
#### node_id `instance-attribute`
```
node_id: NodeID
```
The ID of the node to execute.
#### inputs `instance-attribute`
```
inputs: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")
```
The input data for the node.
#### fork_stack `class-attribute` `instance-attribute`
```
fork_stack: ForkStack = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(repr=False)
```
Stack of forks that have been entered.
Used by the GraphRun to decide when to proceed through joins.
#### task_id `class-attribute` `instance-attribute`
```
task_id: TaskID = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(
 default_factory=lambda: TaskID(str[](https://docs.python.org/3/library/stdtypes.html#str)(uuid4[](https://docs.python.org/3/library/uuid.html#uuid.uuid4 "uuid.uuid4")())), repr=False
)
```
Unique identifier for this task.
### GraphRun
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[StateT[](#pydantic_graph.beta.graph.StateT "pydantic_graph.beta.graph.StateT"), DepsT[](#pydantic_graph.beta.graph.DepsT "pydantic_graph.beta.graph.DepsT"), OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")]`
A single execution instance of a graph.
GraphRun manages the execution state for a single run of a graph, including task scheduling, fork/join coordination, and result tracking.
Type Parameters
StateT: The type of the graph state DepsT: The type of the dependencies OutputT: The type of the output data
Source code in `pydantic_graph/pydantic_graph/beta/graph.py`
```
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
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
364
365
366
367
368
369
370
371
372
373
374
375
376
377
378
379
380
381
382
383
384
385
386
387
388
389
390
391
392
393
394
395
396
397
398
399
400
401
402
403
404
405
406
407
408
409
410
411
412
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
425
426
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
```
| ```
classGraphRun(Generic[StateT, DepsT, OutputT]):
"""A single execution instance of a graph.
 GraphRun manages the execution state for a single run of a graph,
 including task scheduling, fork/join coordination, and result tracking.
 Type Parameters:
 StateT: The type of the graph state
 DepsT: The type of the dependencies
 OutputT: The type of the output data
 """
 def__init__(
 self,
 graph: Graph[StateT, DepsT, InputT, OutputT],
 *,
 state: StateT,
 deps: DepsT,
 inputs: InputT,
 traceparent: str | None,
 ):
"""Initialize a graph run.
 Args:
 graph: The graph to execute
 state: The graph state instance
 deps: The dependencies instance
 inputs: The input data for the graph
 traceparent: Optional trace parent for instrumentation
 """
 self.graph = graph
"""The graph being executed."""
 self.state = state
"""The graph state instance."""
 self.deps = deps
"""The dependencies instance."""
 self.inputs = inputs
"""The initial input data."""
 self._active_reducers: dict[tuple[JoinID, NodeRunID], JoinState] = {}
"""Active reducers for join operations."""
 self._next: EndMarker[OutputT] | Sequence[GraphTask] | None = None
"""The next item to be processed."""
 run_id = GraphRunID(str(uuid.uuid4()))
 initial_fork_stack: ForkStack = (ForkStackItem(StartNode.id, NodeRunID(run_id), 0),)
 self._first_task = GraphTask(node_id=StartNode.id, inputs=inputs, fork_stack=initial_fork_stack)
 self._iterator_instance = _GraphIterator[StateT, DepsT, OutputT](self.graph, self.state, self.deps)
 self._iterator = self._iterator_instance.iter_graph(self._first_task)
 self.__traceparent = traceparent
 async def__aenter__(self):
 return self
 async def__aexit__(self, exc_type: Any, exc_val: Any, exc_tb: Any):
 self._iterator_instance.iter_stream_sender.close()
 self._iterator_instance.iter_stream_receiver.close()
 await self._iterator.aclose()
 @overload
 def_traceparent(self, *, required: Literal[False]) -> str | None: ...
 @overload
 def_traceparent(self) -> str: ...
 def_traceparent(self, *, required: bool = True) -> str | None:
"""Get the trace parent for instrumentation.
 Args:
 required: Whether to raise an error if no traceparent exists
 Returns:
 The traceparent string, or None if not required and not set
 Raises:
 GraphRuntimeError: If required is True and no traceparent exists
 """
 if self.__traceparent is None and required: # pragma: no cover
 raise exceptions.GraphRuntimeError('No span was created for this graph run')
 return self.__traceparent
 def__aiter__(self) -> AsyncIterator[EndMarker[OutputT] | Sequence[GraphTask]]:
"""Return self as an async iterator.
 Returns:
 Self for async iteration
 """
 return self
 async def__anext__(self) -> EndMarker[OutputT] | Sequence[GraphTask]:
"""Get the next item in the async iteration.
 Returns:
 The next execution result from the graph
 """
 if self._next is None:
 self._next = await anext(self._iterator)
 else:
 self._next = await self._iterator.asend(self._next)
 return self._next
 async defnext(
 self, value: EndMarker[OutputT] | Sequence[GraphTask] | None = None
 ) -> EndMarker[OutputT] | Sequence[GraphTask]:
"""Advance the graph execution by one step.
 This method allows for sending a value to the iterator, which is useful
 for resuming iteration or overriding intermediate results.
 Args:
 value: Optional value to send to the iterator
 Returns:
 The next execution result: either an EndMarker, or sequence of GraphTasks
 """
 if self._next is None:
 # Prevent `TypeError: can't send non-None value to a just-started async generator`
 # if `next` is called before the `first_node` has run.
 await anext(self)
 if value is not None:
 self._next = value
 return await anext(self)
 @property
 defnext_task(self) -> EndMarker[OutputT] | Sequence[GraphTask]:
"""Get the next task(s) to be executed.
 Returns:
 The next execution item, or the initial task if none is set
 """
 return self._next or [self._first_task]
 @property
 defoutput(self) -> OutputT | None:
"""Get the final output if the graph has completed.
 Returns:
 The output value if execution is complete, None otherwise
 """
 if isinstance(self._next, EndMarker):
 return self._next.value
 return None
```
---|--- 
#### __init__
```
__init__(
 graph: Graph[](#pydantic_graph.beta.graph.Graph "pydantic_graph.beta.graph.Graph")[StateT[](#pydantic_graph.beta.graph.StateT "pydantic_graph.beta.graph.StateT"), DepsT[](#pydantic_graph.beta.graph.DepsT "pydantic_graph.beta.graph.DepsT"), InputT[](#pydantic_graph.beta.graph.InputT "pydantic_graph.beta.graph.InputT"), OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")],
 *,
 state: StateT[](#pydantic_graph.beta.graph.StateT "pydantic_graph.beta.graph.StateT"),
 deps: DepsT[](#pydantic_graph.beta.graph.DepsT "pydantic_graph.beta.graph.DepsT"),
 inputs: InputT[](#pydantic_graph.beta.graph.InputT "pydantic_graph.beta.graph.InputT"),
 traceparent: str[](https://docs.python.org/3/library/stdtypes.html#str) | None
)
```
Initialize a graph run.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`graph` | `Graph[](#pydantic_graph.beta.graph.Graph "pydantic_graph.beta.graph.Graph")[StateT[](#pydantic_graph.beta.graph.StateT "pydantic_graph.beta.graph.StateT"), DepsT[](#pydantic_graph.beta.graph.DepsT "pydantic_graph.beta.graph.DepsT"), InputT[](#pydantic_graph.beta.graph.InputT "pydantic_graph.beta.graph.InputT"), OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")]` | The graph to execute | _required_ 
`state` | `StateT[](#pydantic_graph.beta.graph.StateT "pydantic_graph.beta.graph.StateT")` | The graph state instance | _required_ 
`deps` | `DepsT[](#pydantic_graph.beta.graph.DepsT "pydantic_graph.beta.graph.DepsT")` | The dependencies instance | _required_ 
`inputs` | `InputT[](#pydantic_graph.beta.graph.InputT "pydantic_graph.beta.graph.InputT")` | The input data for the graph | _required_ 
`traceparent` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional trace parent for instrumentation | _required_ 
Source code in `pydantic_graph/pydantic_graph/beta/graph.py`
```
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
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
```
| ```
def__init__(
 self,
 graph: Graph[StateT, DepsT, InputT, OutputT],
 *,
 state: StateT,
 deps: DepsT,
 inputs: InputT,
 traceparent: str | None,
):
"""Initialize a graph run.
 Args:
 graph: The graph to execute
 state: The graph state instance
 deps: The dependencies instance
 inputs: The input data for the graph
 traceparent: Optional trace parent for instrumentation
 """
 self.graph = graph
"""The graph being executed."""
 self.state = state
"""The graph state instance."""
 self.deps = deps
"""The dependencies instance."""
 self.inputs = inputs
"""The initial input data."""
 self._active_reducers: dict[tuple[JoinID, NodeRunID], JoinState] = {}
"""Active reducers for join operations."""
 self._next: EndMarker[OutputT] | Sequence[GraphTask] | None = None
"""The next item to be processed."""
 run_id = GraphRunID(str(uuid.uuid4()))
 initial_fork_stack: ForkStack = (ForkStackItem(StartNode.id, NodeRunID(run_id), 0),)
 self._first_task = GraphTask(node_id=StartNode.id, inputs=inputs, fork_stack=initial_fork_stack)
 self._iterator_instance = _GraphIterator[StateT, DepsT, OutputT](self.graph, self.state, self.deps)
 self._iterator = self._iterator_instance.iter_graph(self._first_task)
 self.__traceparent = traceparent
```
---|--- 
#### graph `instance-attribute`
```
graph = graph
```
The graph being executed.
#### state `instance-attribute`
```
state = state
```
The graph state instance.
#### deps `instance-attribute`
```
deps = deps
```
The dependencies instance.
#### inputs `instance-attribute`
```
inputs = inputs
```
The initial input data.
#### __aiter__
```
__aiter__() -> (
 AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EndMarker[](#pydantic_graph.beta.graph.EndMarker "pydantic_graph.beta.graph.EndMarker")[OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")] | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[GraphTask[](#pydantic_graph.beta.graph.GraphTask "pydantic_graph.beta.graph.GraphTask")]]
)
```
Return self as an async iterator.
Returns:
Type | Description 
---|--- 
`AsyncIterator[](https://docs.python.org/3/library/collections.abc.html#collections.abc.AsyncIterator "collections.abc.AsyncIterator")[EndMarker[](#pydantic_graph.beta.graph.EndMarker "pydantic_graph.beta.graph.EndMarker")[OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")] | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[GraphTask[](#pydantic_graph.beta.graph.GraphTask "pydantic_graph.beta.graph.GraphTask")]]` | Self for async iteration 
Source code in `pydantic_graph/pydantic_graph/beta/graph.py`
```
393
394
395
396
397
398
399
```
| ```
def__aiter__(self) -> AsyncIterator[EndMarker[OutputT] | Sequence[GraphTask]]:
"""Return self as an async iterator.
 Returns:
 Self for async iteration
 """
 return self
```
---|--- 
#### __anext__ `async`
```
__anext__() -> EndMarker[](#pydantic_graph.beta.graph.EndMarker "pydantic_graph.beta.graph.EndMarker")[OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")] | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[GraphTask[](#pydantic_graph.beta.graph.GraphTask "pydantic_graph.beta.graph.GraphTask")]
```
Get the next item in the async iteration.
Returns:
Type | Description 
---|--- 
`EndMarker[](#pydantic_graph.beta.graph.EndMarker "pydantic_graph.beta.graph.EndMarker")[OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")] | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[GraphTask[](#pydantic_graph.beta.graph.GraphTask "pydantic_graph.beta.graph.GraphTask")]` | The next execution result from the graph 
Source code in `pydantic_graph/pydantic_graph/beta/graph.py`
```
401
402
403
404
405
406
407
408
409
410
411
```
| ```
async def__anext__(self) -> EndMarker[OutputT] | Sequence[GraphTask]:
"""Get the next item in the async iteration.
 Returns:
 The next execution result from the graph
 """
 if self._next is None:
 self._next = await anext(self._iterator)
 else:
 self._next = await self._iterator.asend(self._next)
 return self._next
```
---|--- 
#### next `async`
```
next(
 value: (
 EndMarker[](#pydantic_graph.beta.graph.EndMarker "pydantic_graph.beta.graph.EndMarker")[OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")] | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[GraphTask[](#pydantic_graph.beta.graph.GraphTask "pydantic_graph.beta.graph.GraphTask")] | None
 ) = None,
) -> EndMarker[](#pydantic_graph.beta.graph.EndMarker "pydantic_graph.beta.graph.EndMarker")[OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")] | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[GraphTask[](#pydantic_graph.beta.graph.GraphTask "pydantic_graph.beta.graph.GraphTask")]
```
Advance the graph execution by one step.
This method allows for sending a value to the iterator, which is useful for resuming iteration or overriding intermediate results.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`value` | `EndMarker[](#pydantic_graph.beta.graph.EndMarker "pydantic_graph.beta.graph.EndMarker")[OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")] | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[GraphTask[](#pydantic_graph.beta.graph.GraphTask "pydantic_graph.beta.graph.GraphTask")] | None` | Optional value to send to the iterator | `None` 
Returns:
Type | Description 
---|--- 
`EndMarker[](#pydantic_graph.beta.graph.EndMarker "pydantic_graph.beta.graph.EndMarker")[OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")] | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[GraphTask[](#pydantic_graph.beta.graph.GraphTask "pydantic_graph.beta.graph.GraphTask")]` | The next execution result: either an EndMarker, or sequence of GraphTasks 
Source code in `pydantic_graph/pydantic_graph/beta/graph.py`
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
425
426
427
428
429
430
431
432
433
```
| ```
async defnext(
 self, value: EndMarker[OutputT] | Sequence[GraphTask] | None = None
) -> EndMarker[OutputT] | Sequence[GraphTask]:
"""Advance the graph execution by one step.
 This method allows for sending a value to the iterator, which is useful
 for resuming iteration or overriding intermediate results.
 Args:
 value: Optional value to send to the iterator
 Returns:
 The next execution result: either an EndMarker, or sequence of GraphTasks
 """
 if self._next is None:
 # Prevent `TypeError: can't send non-None value to a just-started async generator`
 # if `next` is called before the `first_node` has run.
 await anext(self)
 if value is not None:
 self._next = value
 return await anext(self)
```
---|--- 
#### next_task `property`
```
next_task: EndMarker[](#pydantic_graph.beta.graph.EndMarker "pydantic_graph.beta.graph.EndMarker")[OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")] | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[GraphTask[](#pydantic_graph.beta.graph.GraphTask "pydantic_graph.beta.graph.GraphTask")]
```
Get the next task(s) to be executed.
Returns:
Type | Description 
---|--- 
`EndMarker[](#pydantic_graph.beta.graph.EndMarker "pydantic_graph.beta.graph.EndMarker")[OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT")] | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[GraphTask[](#pydantic_graph.beta.graph.GraphTask "pydantic_graph.beta.graph.GraphTask")]` | The next execution item, or the initial task if none is set 
#### output `property`
```
output: OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT") | None
```
Get the final output if the graph has completed.
Returns:
Type | Description 
---|--- 
`OutputT[](#pydantic_graph.beta.graph.OutputT "pydantic_graph.beta.graph.OutputT") | None` | The output value if execution is complete, None otherwise