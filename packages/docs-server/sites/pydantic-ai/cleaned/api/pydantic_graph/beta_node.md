[ Skip to content ](#pydantic_graphbetanode)
# `pydantic_graph.beta.node`
Core node types for graph construction and execution.
This module defines the fundamental node types used to build execution graphs, including start/end nodes and fork nodes for parallel execution.
### StateT `module-attribute`
```
StateT = TypeVar('StateT', infer_variance=True)
```
Type variable for graph state.
### OutputT `module-attribute`
```
OutputT = TypeVar('OutputT', infer_variance=True)
```
Type variable for node output data.
### InputT `module-attribute`
```
InputT = TypeVar('InputT', infer_variance=True)
```
Type variable for node input data.
### StartNode
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[OutputT[](#pydantic_graph.beta.node.OutputT "pydantic_graph.beta.node.OutputT")]`
Entry point node for graph execution.
The StartNode represents the beginning of a graph execution flow.
Source code in `pydantic_graph/pydantic_graph/beta/node.py`
```
26
27
28
29
30
31
32
33
```
| ```
classStartNode(Generic[OutputT]):
"""Entry point node for graph execution.
 The StartNode represents the beginning of a graph execution flow.
 """
 id = NodeID('__start__')
"""Fixed identifier for the start node."""
```
---|--- 
#### id `class-attribute` `instance-attribute`
```
id = NodeID('__start__')
```
Fixed identifier for the start node.
### EndNode
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[InputT[](#pydantic_graph.beta.node.InputT "pydantic_graph.beta.node.InputT")]`
Terminal node representing the completion of graph execution.
The EndNode marks the successful completion of a graph execution flow and can collect the final output data.
Source code in `pydantic_graph/pydantic_graph/beta/node.py`
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
```
| ```
classEndNode(Generic[InputT]):
"""Terminal node representing the completion of graph execution.
 The EndNode marks the successful completion of a graph execution flow
 and can collect the final output data.
 """
 id = NodeID('__end__')
"""Fixed identifier for the end node."""
 def_force_variance(self, inputs: InputT) -> None: # pragma: no cover
"""Force type variance for proper generic typing.
 This method exists solely for type checking purposes and should never be called.
 Args:
 inputs: Input data of type InputT.
 Raises:
 RuntimeError: Always, as this method should never be executed.
 """
 raise RuntimeError('This method should never be called, it is just defined for typing purposes.')
```
---|--- 
#### id `class-attribute` `instance-attribute`
```
id = NodeID('__end__')
```
Fixed identifier for the end node.
### Fork `dataclass`
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[InputT[](#pydantic_graph.beta.node.InputT "pydantic_graph.beta.node.InputT"), OutputT[](#pydantic_graph.beta.node.OutputT "pydantic_graph.beta.node.OutputT")]`
Fork node that creates parallel execution branches.
A Fork node splits the execution flow into multiple parallel branches, enabling concurrent execution of downstream nodes. It can either map a sequence across multiple branches or duplicate data to each branch.
Source code in `pydantic_graph/pydantic_graph/beta/node.py`
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
```
| ```
@dataclass
classFork(Generic[InputT, OutputT]):
"""Fork node that creates parallel execution branches.
 A Fork node splits the execution flow into multiple parallel branches,
 enabling concurrent execution of downstream nodes. It can either map
 a sequence across multiple branches or duplicate data to each branch.
 """
 id: ForkID
"""Unique identifier for this fork node."""
 is_map: bool
"""Determines fork behavior.
 If True, InputT must be Sequence[OutputT] and each element is sent to a separate branch.
 If False, InputT must be OutputT and the same data is sent to all branches.
 """
 downstream_join_id: JoinID | None
"""Optional identifier of a downstream join node that should be jumped to if mapping an empty iterable."""
 def_force_variance(self, inputs: InputT) -> OutputT: # pragma: no cover
"""Force type variance for proper generic typing.
 This method exists solely for type checking purposes and should never be called.
 Args:
 inputs: Input data to be forked.
 Returns:
 Output data type (never actually returned).
 Raises:
 RuntimeError: Always, as this method should never be executed.
 """
 raise RuntimeError('This method should never be called, it is just defined for typing purposes.')
```
---|--- 
#### id `instance-attribute`
```
id: ForkID
```
Unique identifier for this fork node.
#### is_map `instance-attribute`
```
is_map: bool[](https://docs.python.org/3/library/functions.html#bool)
```
Determines fork behavior.
If True, InputT must be Sequence[OutputT] and each element is sent to a separate branch. If False, InputT must be OutputT and the same data is sent to all branches.
#### downstream_join_id `instance-attribute`
```
downstream_join_id: JoinID | None
```
Optional identifier of a downstream join node that should be jumped to if mapping an empty iterable.