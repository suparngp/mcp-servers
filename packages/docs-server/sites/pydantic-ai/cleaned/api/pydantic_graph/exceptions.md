[ Skip to content ](#pydantic_graphexceptions)
# `pydantic_graph.exceptions`
### GraphSetupError
Bases: `TypeError[](https://docs.python.org/3/library/exceptions.html#TypeError)`
Error caused by an incorrectly configured graph.
Source code in `pydantic_graph/pydantic_graph/exceptions.py`
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
```
| ```
classGraphSetupError(TypeError):
"""Error caused by an incorrectly configured graph."""
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
### GraphBuildingError
Bases: `ValueError[](https://docs.python.org/3/library/exceptions.html#ValueError)`
An error raised during graph-building.
Source code in `pydantic_graph/pydantic_graph/exceptions.py`
```
18
19
20
21
22
23
24
25
26
```
| ```
classGraphBuildingError(ValueError):
"""An error raised during graph-building."""
 message: str
"""The error message."""
 def__init__(self, message: str):
 self.message = message
 super().__init__(message)
```
---|--- 
#### message `instance-attribute`
```
message: str[](https://docs.python.org/3/library/stdtypes.html#str) = message
```
The error message.
### GraphValidationError
Bases: `ValueError[](https://docs.python.org/3/library/exceptions.html#ValueError)`
An error raised during graph validation.
Source code in `pydantic_graph/pydantic_graph/exceptions.py`
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
```
| ```
classGraphValidationError(ValueError):
"""An error raised during graph validation."""
 message: str
"""The error message."""
 def__init__(self, message: str):
 self.message = message
 super().__init__(message)
```
---|--- 
#### message `instance-attribute`
```
message: str[](https://docs.python.org/3/library/stdtypes.html#str) = message
```
The error message.
### GraphRuntimeError
Bases: `RuntimeError[](https://docs.python.org/3/library/exceptions.html#RuntimeError)`
Error caused by an issue during graph execution.
Source code in `pydantic_graph/pydantic_graph/exceptions.py`
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
```
| ```
classGraphRuntimeError(RuntimeError):
"""Error caused by an issue during graph execution."""
 message: str
"""The error message."""
 def__init__(self, message: str):
 self.message = message
 super().__init__(message)
```
---|--- 
#### message `instance-attribute`
```
message: str[](https://docs.python.org/3/library/stdtypes.html#str) = message
```
The error message.
### GraphNodeStatusError
Bases: `GraphRuntimeError[](#pydantic_graph.exceptions.GraphRuntimeError "pydantic_graph.exceptions.GraphRuntimeError")`
Error caused by trying to run a node that already has status `'running'`, `'success'`, or `'error'`.
Source code in `pydantic_graph/pydantic_graph/exceptions.py`
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
```
| ```
classGraphNodeStatusError(GraphRuntimeError):
"""Error caused by trying to run a node that already has status `'running'`, `'success'`, or `'error'`."""
 def__init__(self, actual_status: 'SnapshotStatus'):
 self.actual_status = actual_status
 super().__init__(f"Incorrect snapshot status {actual_status!r}, must be 'created' or 'pending'.")
 @classmethod
 defcheck(cls, status: 'SnapshotStatus') -> None:
"""Check if the status is valid."""
 if status not in {'created', 'pending'}:
 raise cls(status)
```
---|--- 
#### check `classmethod`
```
check(status: SnapshotStatus[](../persistence/#pydantic_graph.persistence.SnapshotStatus "pydantic_graph.persistence.SnapshotStatus")) -> None
```
Check if the status is valid.
Source code in `pydantic_graph/pydantic_graph/exceptions.py`
```
58
59
60
61
62
```
| ```
@classmethod
defcheck(cls, status: 'SnapshotStatus') -> None:
"""Check if the status is valid."""
 if status not in {'created', 'pending'}:
 raise cls(status)
```
---|---