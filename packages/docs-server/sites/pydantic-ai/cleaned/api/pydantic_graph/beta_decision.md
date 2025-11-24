[ Skip to content ](#pydantic_graphbetadecision)
# `pydantic_graph.beta.decision`
Decision node implementation for conditional branching in graph execution.
This module provides the Decision node type and related classes for implementing conditional branching logic in parallel control flow graphs. Decision nodes allow the graph to choose different execution paths based on runtime conditions.
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
### HandledT `module-attribute`
```
HandledT = TypeVar('HandledT', infer_variance=True)
```
Type variable used to track types handled by the branches of a Decision.
### T `module-attribute`
```
T = TypeVar('T', infer_variance=True)
```
Generic type variable.
### Decision `dataclass`
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), HandledT[](#pydantic_graph.beta.decision.HandledT "pydantic_graph.beta.decision.HandledT")]`
Decision node for conditional branching in graph execution.
A Decision node evaluates conditions and routes execution to different branches based on the input data type or custom matching logic.
Source code in `pydantic_graph/pydantic_graph/beta/decision.py`
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
79
80
```
| ```
@dataclass(kw_only=True)
classDecision(Generic[StateT, DepsT, HandledT]):
"""Decision node for conditional branching in graph execution.
 A Decision node evaluates conditions and routes execution to different
 branches based on the input data type or custom matching logic.
 """
 id: NodeID
"""Unique identifier for this decision node."""
 branches: list[DecisionBranch[Any]]
"""List of branches that can be taken from this decision."""
 note: str | None
"""Optional documentation note for this decision."""
 defbranch(self, branch: DecisionBranch[T]) -> Decision[StateT, DepsT, HandledT | T]:
"""Add a new branch to this decision.
 Args:
 branch: The branch to add to this decision.
 Returns:
 A new Decision with the additional branch.
 """
 return Decision(id=self.id, branches=self.branches + [branch], note=self.note)
 def_force_handled_contravariant(self, inputs: HandledT) -> Never: # pragma: no cover
"""Forces this type to be contravariant in the HandledT type variable.
 This is an implementation detail of how we can type-check that all possible input types have
 been exhaustively covered.
 Args:
 inputs: Input data of handled types.
 Raises:
 RuntimeError: Always, as this method should never be executed.
 """
 raise RuntimeError('This method should never be called, it is just defined for typing purposes.')
```
---|--- 
#### id `instance-attribute`
```
id: NodeID
```
Unique identifier for this decision node.
#### branches `instance-attribute`
```
branches: list[](https://docs.python.org/3/library/stdtypes.html#list)[DecisionBranch[](#pydantic_graph.beta.decision.DecisionBranch "pydantic_graph.beta.decision.DecisionBranch")[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]
```
List of branches that can be taken from this decision.
#### note `instance-attribute`
```
note: str[](https://docs.python.org/3/library/stdtypes.html#str) | None
```
Optional documentation note for this decision.
#### branch
```
branch(
 branch: DecisionBranch[](#pydantic_graph.beta.decision.DecisionBranch "pydantic_graph.beta.decision.DecisionBranch")[T[](#pydantic_graph.beta.decision.T "pydantic_graph.beta.decision.T")],
) -> Decision[](#pydantic_graph.beta.decision.Decision "pydantic_graph.beta.decision.Decision")[StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), HandledT[](#pydantic_graph.beta.decision.HandledT "pydantic_graph.beta.decision.HandledT") | T[](#pydantic_graph.beta.decision.T "pydantic_graph.beta.decision.T")]
```
Add a new branch to this decision.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`branch` | `DecisionBranch[](#pydantic_graph.beta.decision.DecisionBranch "pydantic_graph.beta.decision.DecisionBranch")[T[](#pydantic_graph.beta.decision.T "pydantic_graph.beta.decision.T")]` | The branch to add to this decision. | _required_ 
Returns:
Type | Description 
---|--- 
`Decision[](#pydantic_graph.beta.decision.Decision "pydantic_graph.beta.decision.Decision")[StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), HandledT[](#pydantic_graph.beta.decision.HandledT "pydantic_graph.beta.decision.HandledT") | T[](#pydantic_graph.beta.decision.T "pydantic_graph.beta.decision.T")]` | A new Decision with the additional branch. 
Source code in `pydantic_graph/pydantic_graph/beta/decision.py`
```
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
defbranch(self, branch: DecisionBranch[T]) -> Decision[StateT, DepsT, HandledT | T]:
"""Add a new branch to this decision.
 Args:
 branch: The branch to add to this decision.
 Returns:
 A new Decision with the additional branch.
 """
 return Decision(id=self.id, branches=self.branches + [branch], note=self.note)
```
---|--- 
### SourceT `module-attribute`
```
SourceT = TypeVar('SourceT', infer_variance=True)
```
Type variable for source data for a DecisionBranch.
### DecisionBranch `dataclass`
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[SourceT[](#pydantic_graph.beta.decision.SourceT "pydantic_graph.beta.decision.SourceT")]`
Represents a single branch within a decision node.
Each branch defines the conditions under which it should be taken and the path to follow when those conditions are met.
Note: with the current design, it is actually _critical_ that this class is invariant in SourceT for the sake of type-checking that inputs to a Decision are actually handled. See the `# type: ignore` comment in `tests.graph.beta.test_graph_edge_cases.test_decision_no_matching_branch` for an example of how this works.
Source code in `pydantic_graph/pydantic_graph/beta/decision.py`
```
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
```
| ```
@dataclass
classDecisionBranch(Generic[SourceT]):
"""Represents a single branch within a decision node.
 Each branch defines the conditions under which it should be taken
 and the path to follow when those conditions are met.
 Note: with the current design, it is actually _critical_ that this class is invariant in SourceT for the sake
 of type-checking that inputs to a Decision are actually handled. See the `# type: ignore` comment in
 `tests.graph.beta.test_graph_edge_cases.test_decision_no_matching_branch` for an example of how this works.
 """
 source: TypeOrTypeExpression[SourceT]
"""The expected type of data for this branch.
 This is necessary for exhaustiveness-checking when handling the inputs to a decision node."""
 matches: Callable[[Any], bool] | None
"""An optional predicate function used to determine whether input data matches this branch.
 If `None`, default logic is used which attempts to check the value for type-compatibility with the `source` type:
 * If `source` is `Any` or `object`, the branch will always match
 * If `source` is a `Literal` type, this branch will match if the value is one of the parametrizing literal values
 * If `source` is any other type, the value will be checked for matching using `isinstance`
 Inputs are tested against each branch of a decision node in order, and the path of the first matching branch is
 used to handle the input value.
 """
 path: Path
"""The execution path to follow when an input value matches this branch of a decision node.
 This can include transforming, mapping, and broadcasting the output before sending to the next node or nodes.
 The path can also include position-aware labels which are used when generating mermaid diagrams."""
 destinations: list[AnyDestinationNode]
"""The destination nodes that can be referenced by DestinationMarker in the path."""
```
---|--- 
#### source `instance-attribute`
```
source: TypeOrTypeExpression[SourceT[](#pydantic_graph.beta.decision.SourceT "pydantic_graph.beta.decision.SourceT")]
```
The expected type of data for this branch.
This is necessary for exhaustiveness-checking when handling the inputs to a decision node.
#### matches `instance-attribute`
```
matches: Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")], bool[](https://docs.python.org/3/library/functions.html#bool)] | None
```
An optional predicate function used to determine whether input data matches this branch.
If `None`, default logic is used which attempts to check the value for type-compatibility with the `source` type: * If `source` is `Any` or `object`, the branch will always match * If `source` is a `Literal` type, this branch will match if the value is one of the parametrizing literal values * If `source` is any other type, the value will be checked for matching using `isinstance`
Inputs are tested against each branch of a decision node in order, and the path of the first matching branch is used to handle the input value.
#### path `instance-attribute`
```
path: Path
```
The execution path to follow when an input value matches this branch of a decision node.
This can include transforming, mapping, and broadcasting the output before sending to the next node or nodes.
The path can also include position-aware labels which are used when generating mermaid diagrams.
#### destinations `instance-attribute`
```
destinations: list[](https://docs.python.org/3/library/stdtypes.html#list)[AnyDestinationNode]
```
The destination nodes that can be referenced by DestinationMarker in the path.
### OutputT `module-attribute`
```
OutputT = TypeVar('OutputT', infer_variance=True)
```
Type variable for the output data of a node.
### NewOutputT `module-attribute`
```
NewOutputT = TypeVar('NewOutputT', infer_variance=True)
```
Type variable for transformed output.
### DecisionBranchBuilder `dataclass`
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), OutputT[](#pydantic_graph.beta.decision.OutputT "pydantic_graph.beta.decision.OutputT"), SourceT[](#pydantic_graph.beta.decision.SourceT "pydantic_graph.beta.decision.SourceT"), HandledT[](#pydantic_graph.beta.decision.HandledT "pydantic_graph.beta.decision.HandledT")]`
Builder for constructing decision branches with fluent API.
This builder provides methods to configure branches with destinations, forks, and transformations in a type-safe manner.
Instances of this class should be created using [`GraphBuilder.match`](../beta_graph_builder/#pydantic_graph.beta.graph_builder.GraphBuilder), not created directly.
Source code in `pydantic_graph/pydantic_graph/beta/decision.py`
```
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
```
| ```
@dataclass(init=False)
classDecisionBranchBuilder(Generic[StateT, DepsT, OutputT, SourceT, HandledT]):
"""Builder for constructing decision branches with fluent API.
 This builder provides methods to configure branches with destinations,
 forks, and transformations in a type-safe manner.
 Instances of this class should be created using [`GraphBuilder.match`][pydantic_graph.beta.graph_builder.GraphBuilder],
 not created directly.
 """
 _decision: Decision[StateT, DepsT, HandledT]
"""The parent decision node."""
 _source: TypeOrTypeExpression[SourceT]
"""The expected source type for this branch."""
 _matches: Callable[[Any], bool] | None
"""Optional matching predicate."""
 _path_builder: PathBuilder[StateT, DepsT, OutputT]
"""Builder for the execution path."""
 def__init__(
 self,
 *,
 decision: Decision[StateT, DepsT, HandledT],
 source: TypeOrTypeExpression[SourceT],
 matches: Callable[[Any], bool] | None,
 path_builder: PathBuilder[StateT, DepsT, OutputT],
 ):
 # This manually-defined initializer is necessary due to https://github.com/python/mypy/issues/17623.
 self._decision = decision
 self._source = source
 self._matches = matches
 self._path_builder = path_builder
 defto(
 self,
 destination: DestinationNode[StateT, DepsT, OutputT] | type[BaseNode[StateT, DepsT, Any]],
 /,
 *extra_destinations: DestinationNode[StateT, DepsT, OutputT] | type[BaseNode[StateT, DepsT, Any]],
 fork_id: str | None = None,
 ) -> DecisionBranch[SourceT]:
"""Set the destination(s) for this branch.
 Args:
 destination: The primary destination node.
 *extra_destinations: Additional destination nodes.
 fork_id: Optional node ID to use for the resulting broadcast fork if multiple destinations are provided.
 Returns:
 A completed DecisionBranch with the specified destinations.
 """
 destination = get_origin(destination) or destination
 extra_destinations = tuple(get_origin(d) or d for d in extra_destinations)
 destinations = [(NodeStep(d) if inspect.isclass(d) else d) for d in (destination, *extra_destinations)]
 return DecisionBranch(
 source=self._source,
 matches=self._matches,
 path=self._path_builder.to(*destinations, fork_id=fork_id),
 destinations=destinations,
 )
 defbroadcast(
 self, get_forks: Callable[[Self], Sequence[DecisionBranch[SourceT]]], /, *, fork_id: str | None = None
 ) -> DecisionBranch[SourceT]:
"""Broadcast this decision branch into multiple destinations.
 Args:
 get_forks: The callback that will return a sequence of decision branches to broadcast to.
 fork_id: Optional node ID to use for the resulting broadcast fork.
 Returns:
 A completed DecisionBranch with the specified destinations.
 """
 fork_decision_branches = get_forks(self)
 new_paths = [b.path for b in fork_decision_branches]
 if not new_paths:
 raise GraphBuildingError(f'The call to {get_forks} returned no branches, but must return at least one.')
 path = self._path_builder.broadcast(new_paths, fork_id=fork_id)
 destinations = [d for fdp in fork_decision_branches for d in fdp.destinations]
 return DecisionBranch(source=self._source, matches=self._matches, path=path, destinations=destinations)
 deftransform(
 self, func: TransformFunction[StateT, DepsT, OutputT, NewOutputT], /
 ) -> DecisionBranchBuilder[StateT, DepsT, NewOutputT, SourceT, HandledT]:
"""Apply a transformation to the branch's output.
 Args:
 func: Transformation function to apply.
 Returns:
 A new DecisionBranchBuilder where the provided transform is applied prior to generating the final output.
 """
 return DecisionBranchBuilder(
 decision=self._decision,
 source=self._source,
 matches=self._matches,
 path_builder=self._path_builder.transform(func),
 )
 defmap(
 self: DecisionBranchBuilder[StateT, DepsT, Iterable[T], SourceT, HandledT]
 | DecisionBranchBuilder[StateT, DepsT, AsyncIterable[T], SourceT, HandledT],
 *,
 fork_id: str | None = None,
 downstream_join_id: str | None = None,
 ) -> DecisionBranchBuilder[StateT, DepsT, T, SourceT, HandledT]:
"""Spread the branch's output.
 To do this, the current output must be iterable, and any subsequent steps in the path being built for this
 branch will be applied to each item of the current output in parallel.
 Args:
 fork_id: Optional ID for the fork, defaults to a generated value
 downstream_join_id: Optional ID of a downstream join node which is involved when mapping empty iterables
 Returns:
 A new DecisionBranchBuilder where mapping is performed prior to generating the final output.
 """
 return DecisionBranchBuilder(
 decision=self._decision,
 source=self._source,
 matches=self._matches,
 path_builder=self._path_builder.map(fork_id=fork_id, downstream_join_id=downstream_join_id),
 )
 deflabel(self, label: str) -> DecisionBranchBuilder[StateT, DepsT, OutputT, SourceT, HandledT]:
"""Apply a label to the branch at the current point in the path being built.
 These labels are only used in generated mermaid diagrams.
 Args:
 label: The label to apply.
 Returns:
 A new DecisionBranchBuilder where the label has been applied at the end of the current path being built.
 """
 return DecisionBranchBuilder(
 decision=self._decision,
 source=self._source,
 matches=self._matches,
 path_builder=self._path_builder.label(label),
 )
```
---|--- 
#### to
```
to(
 destination: (
 DestinationNode[StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), OutputT[](#pydantic_graph.beta.decision.OutputT "pydantic_graph.beta.decision.OutputT")]
 | type[](https://docs.python.org/3/library/functions.html#type)[BaseNode[](../nodes/#pydantic_graph.nodes.BaseNode "pydantic_graph.BaseNode")[StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]
 ),
 /,
 *extra_destinations: DestinationNode[
 StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), OutputT[](#pydantic_graph.beta.decision.OutputT "pydantic_graph.beta.decision.OutputT")
 ]
 | type[](https://docs.python.org/3/library/functions.html#type)[BaseNode[](../nodes/#pydantic_graph.nodes.BaseNode "pydantic_graph.BaseNode")[StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]],
 fork_id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
) -> DecisionBranch[](#pydantic_graph.beta.decision.DecisionBranch "pydantic_graph.beta.decision.DecisionBranch")[SourceT[](#pydantic_graph.beta.decision.SourceT "pydantic_graph.beta.decision.SourceT")]
```
Set the destination(s) for this branch.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`destination` | `DestinationNode[StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), OutputT[](#pydantic_graph.beta.decision.OutputT "pydantic_graph.beta.decision.OutputT")] | type[](https://docs.python.org/3/library/functions.html#type)[BaseNode[](../nodes/#pydantic_graph.nodes.BaseNode "pydantic_graph.BaseNode")[StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]` | The primary destination node. | _required_ 
`*extra_destinations` | `DestinationNode[StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), OutputT[](#pydantic_graph.beta.decision.OutputT "pydantic_graph.beta.decision.OutputT")] | type[](https://docs.python.org/3/library/functions.html#type)[BaseNode[](../nodes/#pydantic_graph.nodes.BaseNode "pydantic_graph.BaseNode")[StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]]` | Additional destination nodes. | `()` 
`fork_id` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional node ID to use for the resulting broadcast fork if multiple destinations are provided. | `None` 
Returns:
Type | Description 
---|--- 
`DecisionBranch[](#pydantic_graph.beta.decision.DecisionBranch "pydantic_graph.beta.decision.DecisionBranch")[SourceT[](#pydantic_graph.beta.decision.SourceT "pydantic_graph.beta.decision.SourceT")]` | A completed DecisionBranch with the specified destinations. 
Source code in `pydantic_graph/pydantic_graph/beta/decision.py`
```
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
```
| ```
defto(
 self,
 destination: DestinationNode[StateT, DepsT, OutputT] | type[BaseNode[StateT, DepsT, Any]],
 /,
 *extra_destinations: DestinationNode[StateT, DepsT, OutputT] | type[BaseNode[StateT, DepsT, Any]],
 fork_id: str | None = None,
) -> DecisionBranch[SourceT]:
"""Set the destination(s) for this branch.
 Args:
 destination: The primary destination node.
 *extra_destinations: Additional destination nodes.
 fork_id: Optional node ID to use for the resulting broadcast fork if multiple destinations are provided.
 Returns:
 A completed DecisionBranch with the specified destinations.
 """
 destination = get_origin(destination) or destination
 extra_destinations = tuple(get_origin(d) or d for d in extra_destinations)
 destinations = [(NodeStep(d) if inspect.isclass(d) else d) for d in (destination, *extra_destinations)]
 return DecisionBranch(
 source=self._source,
 matches=self._matches,
 path=self._path_builder.to(*destinations, fork_id=fork_id),
 destinations=destinations,
 )
```
---|--- 
#### broadcast
```
broadcast(
 get_forks: Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[
 [Self[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Self "typing_extensions.Self")], Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[DecisionBranch[](#pydantic_graph.beta.decision.DecisionBranch "pydantic_graph.beta.decision.DecisionBranch")[SourceT[](#pydantic_graph.beta.decision.SourceT "pydantic_graph.beta.decision.SourceT")]]
 ],
 /,
 *,
 fork_id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
) -> DecisionBranch[](#pydantic_graph.beta.decision.DecisionBranch "pydantic_graph.beta.decision.DecisionBranch")[SourceT[](#pydantic_graph.beta.decision.SourceT "pydantic_graph.beta.decision.SourceT")]
```
Broadcast this decision branch into multiple destinations.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`get_forks` | `Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[Self[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Self "typing_extensions.Self")], Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[DecisionBranch[](#pydantic_graph.beta.decision.DecisionBranch "pydantic_graph.beta.decision.DecisionBranch")[SourceT[](#pydantic_graph.beta.decision.SourceT "pydantic_graph.beta.decision.SourceT")]]]` | The callback that will return a sequence of decision branches to broadcast to. | _required_ 
`fork_id` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional node ID to use for the resulting broadcast fork. | `None` 
Returns:
Type | Description 
---|--- 
`DecisionBranch[](#pydantic_graph.beta.decision.DecisionBranch "pydantic_graph.beta.decision.DecisionBranch")[SourceT[](#pydantic_graph.beta.decision.SourceT "pydantic_graph.beta.decision.SourceT")]` | A completed DecisionBranch with the specified destinations. 
Source code in `pydantic_graph/pydantic_graph/beta/decision.py`
```
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
```
| ```
defbroadcast(
 self, get_forks: Callable[[Self], Sequence[DecisionBranch[SourceT]]], /, *, fork_id: str | None = None
) -> DecisionBranch[SourceT]:
"""Broadcast this decision branch into multiple destinations.
 Args:
 get_forks: The callback that will return a sequence of decision branches to broadcast to.
 fork_id: Optional node ID to use for the resulting broadcast fork.
 Returns:
 A completed DecisionBranch with the specified destinations.
 """
 fork_decision_branches = get_forks(self)
 new_paths = [b.path for b in fork_decision_branches]
 if not new_paths:
 raise GraphBuildingError(f'The call to {get_forks} returned no branches, but must return at least one.')
 path = self._path_builder.broadcast(new_paths, fork_id=fork_id)
 destinations = [d for fdp in fork_decision_branches for d in fdp.destinations]
 return DecisionBranch(source=self._source, matches=self._matches, path=path, destinations=destinations)
```
---|--- 
#### transform
```
transform(
 func: TransformFunction[
 StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), OutputT[](#pydantic_graph.beta.decision.OutputT "pydantic_graph.beta.decision.OutputT"), NewOutputT[](#pydantic_graph.beta.decision.NewOutputT "pydantic_graph.beta.decision.NewOutputT")
 ],
) -> DecisionBranchBuilder[](#pydantic_graph.beta.decision.DecisionBranchBuilder "pydantic_graph.beta.decision.DecisionBranchBuilder")[
 StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), NewOutputT[](#pydantic_graph.beta.decision.NewOutputT "pydantic_graph.beta.decision.NewOutputT"), SourceT[](#pydantic_graph.beta.decision.SourceT "pydantic_graph.beta.decision.SourceT"), HandledT[](#pydantic_graph.beta.decision.HandledT "pydantic_graph.beta.decision.HandledT")
]
```
Apply a transformation to the branch's output.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`func` | `TransformFunction[StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), OutputT[](#pydantic_graph.beta.decision.OutputT "pydantic_graph.beta.decision.OutputT"), NewOutputT[](#pydantic_graph.beta.decision.NewOutputT "pydantic_graph.beta.decision.NewOutputT")]` | Transformation function to apply. | _required_ 
Returns:
Type | Description 
---|--- 
`DecisionBranchBuilder[](#pydantic_graph.beta.decision.DecisionBranchBuilder "pydantic_graph.beta.decision.DecisionBranchBuilder")[StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), NewOutputT[](#pydantic_graph.beta.decision.NewOutputT "pydantic_graph.beta.decision.NewOutputT"), SourceT[](#pydantic_graph.beta.decision.SourceT "pydantic_graph.beta.decision.SourceT"), HandledT[](#pydantic_graph.beta.decision.HandledT "pydantic_graph.beta.decision.HandledT")]` | A new DecisionBranchBuilder where the provided transform is applied prior to generating the final output. 
Source code in `pydantic_graph/pydantic_graph/beta/decision.py`
```
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
```
| ```
deftransform(
 self, func: TransformFunction[StateT, DepsT, OutputT, NewOutputT], /
) -> DecisionBranchBuilder[StateT, DepsT, NewOutputT, SourceT, HandledT]:
"""Apply a transformation to the branch's output.
 Args:
 func: Transformation function to apply.
 Returns:
 A new DecisionBranchBuilder where the provided transform is applied prior to generating the final output.
 """
 return DecisionBranchBuilder(
 decision=self._decision,
 source=self._source,
 matches=self._matches,
 path_builder=self._path_builder.transform(func),
 )
```
---|--- 
#### map
```
map(
 *,
 fork_id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 downstream_join_id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
) -> DecisionBranchBuilder[](#pydantic_graph.beta.decision.DecisionBranchBuilder "pydantic_graph.beta.decision.DecisionBranchBuilder")[
 StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), T[](#pydantic_graph.beta.decision.T "pydantic_graph.beta.decision.T"), SourceT[](#pydantic_graph.beta.decision.SourceT "pydantic_graph.beta.decision.SourceT"), HandledT[](#pydantic_graph.beta.decision.HandledT "pydantic_graph.beta.decision.HandledT")
]
```
Spread the branch's output.
To do this, the current output must be iterable, and any subsequent steps in the path being built for this branch will be applied to each item of the current output in parallel.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`fork_id` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional ID for the fork, defaults to a generated value | `None` 
`downstream_join_id` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Optional ID of a downstream join node which is involved when mapping empty iterables | `None` 
Returns:
Type | Description 
---|--- 
`DecisionBranchBuilder[](#pydantic_graph.beta.decision.DecisionBranchBuilder "pydantic_graph.beta.decision.DecisionBranchBuilder")[StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), T[](#pydantic_graph.beta.decision.T "pydantic_graph.beta.decision.T"), SourceT[](#pydantic_graph.beta.decision.SourceT "pydantic_graph.beta.decision.SourceT"), HandledT[](#pydantic_graph.beta.decision.HandledT "pydantic_graph.beta.decision.HandledT")]` | A new DecisionBranchBuilder where mapping is performed prior to generating the final output. 
Source code in `pydantic_graph/pydantic_graph/beta/decision.py`
```
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
```
| ```
defmap(
 self: DecisionBranchBuilder[StateT, DepsT, Iterable[T], SourceT, HandledT]
 | DecisionBranchBuilder[StateT, DepsT, AsyncIterable[T], SourceT, HandledT],
 *,
 fork_id: str | None = None,
 downstream_join_id: str | None = None,
) -> DecisionBranchBuilder[StateT, DepsT, T, SourceT, HandledT]:
"""Spread the branch's output.
 To do this, the current output must be iterable, and any subsequent steps in the path being built for this
 branch will be applied to each item of the current output in parallel.
 Args:
 fork_id: Optional ID for the fork, defaults to a generated value
 downstream_join_id: Optional ID of a downstream join node which is involved when mapping empty iterables
 Returns:
 A new DecisionBranchBuilder where mapping is performed prior to generating the final output.
 """
 return DecisionBranchBuilder(
 decision=self._decision,
 source=self._source,
 matches=self._matches,
 path_builder=self._path_builder.map(fork_id=fork_id, downstream_join_id=downstream_join_id),
 )
```
---|--- 
#### label
```
label(
 label: str[](https://docs.python.org/3/library/stdtypes.html#str),
) -> DecisionBranchBuilder[](#pydantic_graph.beta.decision.DecisionBranchBuilder "pydantic_graph.beta.decision.DecisionBranchBuilder")[
 StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), OutputT[](#pydantic_graph.beta.decision.OutputT "pydantic_graph.beta.decision.OutputT"), SourceT[](#pydantic_graph.beta.decision.SourceT "pydantic_graph.beta.decision.SourceT"), HandledT[](#pydantic_graph.beta.decision.HandledT "pydantic_graph.beta.decision.HandledT")
]
```
Apply a label to the branch at the current point in the path being built.
These labels are only used in generated mermaid diagrams.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`label` | `str[](https://docs.python.org/3/library/stdtypes.html#str)` | The label to apply. | _required_ 
Returns:
Type | Description 
---|--- 
`DecisionBranchBuilder[](#pydantic_graph.beta.decision.DecisionBranchBuilder "pydantic_graph.beta.decision.DecisionBranchBuilder")[StateT[](#pydantic_graph.beta.decision.StateT "pydantic_graph.beta.decision.StateT"), DepsT[](#pydantic_graph.beta.decision.DepsT "pydantic_graph.beta.decision.DepsT"), OutputT[](#pydantic_graph.beta.decision.OutputT "pydantic_graph.beta.decision.OutputT"), SourceT[](#pydantic_graph.beta.decision.SourceT "pydantic_graph.beta.decision.SourceT"), HandledT[](#pydantic_graph.beta.decision.HandledT "pydantic_graph.beta.decision.HandledT")]` | A new DecisionBranchBuilder where the label has been applied at the end of the current path being built. 
Source code in `pydantic_graph/pydantic_graph/beta/decision.py`
```
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
```
| ```
deflabel(self, label: str) -> DecisionBranchBuilder[StateT, DepsT, OutputT, SourceT, HandledT]:
"""Apply a label to the branch at the current point in the path being built.
 These labels are only used in generated mermaid diagrams.
 Args:
 label: The label to apply.
 Returns:
 A new DecisionBranchBuilder where the label has been applied at the end of the current path being built.
 """
 return DecisionBranchBuilder(
 decision=self._decision,
 source=self._source,
 matches=self._matches,
 path_builder=self._path_builder.label(label),
 )
```
---|---