[ Skip to content ](#pydantic_evalsevaluators)
# `pydantic_evals.evaluators`
### Contains `dataclass`
Bases: `Evaluator[](#pydantic_evals.evaluators.Evaluator "pydantic_evals.evaluators.evaluator.Evaluator")[object[](https://docs.python.org/3/library/functions.html#object), object[](https://docs.python.org/3/library/functions.html#object), object[](https://docs.python.org/3/library/functions.html#object)]`
Check if the output contains the expected output.
For strings, checks if expected_output is a substring of output. For lists/tuples, checks if expected_output is in output. For dicts, checks if all key-value pairs in expected_output are in output.
Note: case_sensitive only applies when both the value and output are strings.
Source code in `pydantic_evals/pydantic_evals/evaluators/common.py`
```
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
@dataclass(repr=False)
classContains(Evaluator[object, object, object]):
"""Check if the output contains the expected output.
 For strings, checks if expected_output is a substring of output.
 For lists/tuples, checks if expected_output is in output.
 For dicts, checks if all key-value pairs in expected_output are in output.
 Note: case_sensitive only applies when both the value and output are strings.
 """
 value: Any
 case_sensitive: bool = True
 as_strings: bool = False
 evaluation_name: str | None = field(default=None)
 defevaluate(
 self,
 ctx: EvaluatorContext[object, object, object],
 ) -> EvaluationReason:
 # Convert objects to strings if requested
 failure_reason: str | None = None
 as_strings = self.as_strings or (isinstance(self.value, str) and isinstance(ctx.output, str))
 if as_strings:
 output_str = str(ctx.output)
 expected_str = str(self.value)
 if not self.case_sensitive:
 output_str = output_str.lower()
 expected_str = expected_str.lower()
 failure_reason: str | None = None
 if expected_str not in output_str:
 output_trunc = _truncated_repr(output_str, max_length=100)
 expected_trunc = _truncated_repr(expected_str, max_length=100)
 failure_reason = f'Output string {output_trunc} does not contain expected string {expected_trunc}'
 return EvaluationReason(value=failure_reason is None, reason=failure_reason)
 try:
 # Handle different collection types
 if isinstance(ctx.output, dict):
 if isinstance(self.value, dict):
 # Cast to Any to avoid type checking issues
 output_dict = cast(dict[Any, Any], ctx.output) # pyright: ignore[reportUnknownMemberType]
 expected_dict = cast(dict[Any, Any], self.value) # pyright: ignore[reportUnknownMemberType]
 for k in expected_dict:
 if k not in output_dict:
 k_trunc = _truncated_repr(k, max_length=30)
 failure_reason = f'Output dictionary does not contain expected key {k_trunc}'
 break
 elif output_dict[k] != expected_dict[k]:
 k_trunc = _truncated_repr(k, max_length=30)
 output_v_trunc = _truncated_repr(output_dict[k], max_length=100)
 expected_v_trunc = _truncated_repr(expected_dict[k], max_length=100)
 failure_reason = f'Output dictionary has different value for key {k_trunc}: {output_v_trunc} != {expected_v_trunc}'
 break
 else:
 if self.value not in ctx.output: # pyright: ignore[reportUnknownMemberType]
 output_trunc = _truncated_repr(ctx.output, max_length=200) # pyright: ignore[reportUnknownMemberType]
 failure_reason = f'Output {output_trunc} does not contain provided value as a key'
 elif self.value not in ctx.output: # pyright: ignore[reportOperatorIssue] # will be handled by except block
 output_trunc = _truncated_repr(ctx.output, max_length=200)
 failure_reason = f'Output {output_trunc} does not contain provided value'
 except (TypeError, ValueError) as e:
 failure_reason = f'Containment check failed: {e}'
 return EvaluationReason(value=failure_reason is None, reason=failure_reason)
```
---|--- 
### Equals `dataclass`
Bases: `Evaluator[](#pydantic_evals.evaluators.Evaluator "pydantic_evals.evaluators.evaluator.Evaluator")[object[](https://docs.python.org/3/library/functions.html#object), object[](https://docs.python.org/3/library/functions.html#object), object[](https://docs.python.org/3/library/functions.html#object)]`
Check if the output exactly equals the provided value.
Source code in `pydantic_evals/pydantic_evals/evaluators/common.py`
```
28
29
30
31
32
33
34
35
36
```
| ```
@dataclass(repr=False)
classEquals(Evaluator[object, object, object]):
"""Check if the output exactly equals the provided value."""
 value: Any
 evaluation_name: str | None = field(default=None)
 defevaluate(self, ctx: EvaluatorContext[object, object, object]) -> bool:
 return ctx.output == self.value
```
---|--- 
### EqualsExpected `dataclass`
Bases: `Evaluator[](#pydantic_evals.evaluators.Evaluator "pydantic_evals.evaluators.evaluator.Evaluator")[object[](https://docs.python.org/3/library/functions.html#object), object[](https://docs.python.org/3/library/functions.html#object), object[](https://docs.python.org/3/library/functions.html#object)]`
Check if the output exactly equals the expected output.
Source code in `pydantic_evals/pydantic_evals/evaluators/common.py`
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
```
| ```
@dataclass(repr=False)
classEqualsExpected(Evaluator[object, object, object]):
"""Check if the output exactly equals the expected output."""
 evaluation_name: str | None = field(default=None)
 defevaluate(self, ctx: EvaluatorContext[object, object, object]) -> bool | dict[str, bool]:
 if ctx.expected_output is None:
 return {} # Only compare if expected output is provided
 return ctx.output == ctx.expected_output
```
---|--- 
### HasMatchingSpan `dataclass`
Bases: `Evaluator[](#pydantic_evals.evaluators.Evaluator "pydantic_evals.evaluators.evaluator.Evaluator")[object[](https://docs.python.org/3/library/functions.html#object), object[](https://docs.python.org/3/library/functions.html#object), object[](https://docs.python.org/3/library/functions.html#object)]`
Check if the span tree contains a span that matches the specified query.
Source code in `pydantic_evals/pydantic_evals/evaluators/common.py`
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
```
| ```
@dataclass(repr=False)
classHasMatchingSpan(Evaluator[object, object, object]):
"""Check if the span tree contains a span that matches the specified query."""
 query: SpanQuery
 evaluation_name: str | None = field(default=None)
 defevaluate(
 self,
 ctx: EvaluatorContext[object, object, object],
 ) -> bool:
 return ctx.span_tree.any(self.query)
```
---|--- 
### IsInstance `dataclass`
Bases: `Evaluator[](#pydantic_evals.evaluators.Evaluator "pydantic_evals.evaluators.evaluator.Evaluator")[object[](https://docs.python.org/3/library/functions.html#object), object[](https://docs.python.org/3/library/functions.html#object), object[](https://docs.python.org/3/library/functions.html#object)]`
Check if the output is an instance of a type with the given name.
Source code in `pydantic_evals/pydantic_evals/evaluators/common.py`
```
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
```
| ```
@dataclass(repr=False)
classIsInstance(Evaluator[object, object, object]):
"""Check if the output is an instance of a type with the given name."""
 type_name: str
 evaluation_name: str | None = field(default=None)
 defevaluate(self, ctx: EvaluatorContext[object, object, object]) -> EvaluationReason:
 output = ctx.output
 for cls in type(output).__mro__:
 if cls.__name__ == self.type_name or cls.__qualname__ == self.type_name:
 return EvaluationReason(value=True)
 reason = f'output is of type {type(output).__name__}'
 if type(output).__qualname__ != type(output).__name__:
 reason += f' (qualname: {type(output).__qualname__})'
 return EvaluationReason(value=False, reason=reason)
```
---|--- 
### LLMJudge `dataclass`
Bases: `Evaluator[](#pydantic_evals.evaluators.Evaluator "pydantic_evals.evaluators.evaluator.Evaluator")[object[](https://docs.python.org/3/library/functions.html#object), object[](https://docs.python.org/3/library/functions.html#object), object[](https://docs.python.org/3/library/functions.html#object)]`
Judge whether the output of a language model meets the criteria of a provided rubric.
If you do not specify a model, it uses the default model for judging. This starts as 'openai:gpt-4o', but can be overridden by calling [`set_default_judge_model`](#pydantic_evals.evaluators.llm_as_a_judge.set_default_judge_model).
Source code in `pydantic_evals/pydantic_evals/evaluators/common.py`
```
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
```
| ```
@dataclass(repr=False)
classLLMJudge(Evaluator[object, object, object]):
"""Judge whether the output of a language model meets the criteria of a provided rubric.
 If you do not specify a model, it uses the default model for judging. This starts as 'openai:gpt-4o', but can be
 overridden by calling [`set_default_judge_model`][pydantic_evals.evaluators.llm_as_a_judge.set_default_judge_model].
 """
 rubric: str
 model: models.Model | models.KnownModelName | None = None
 include_input: bool = False
 include_expected_output: bool = False
 model_settings: ModelSettings | None = None
 score: OutputConfig | Literal[False] = False
 assertion: OutputConfig | Literal[False] = field(default_factory=lambda: OutputConfig(include_reason=True))
 async defevaluate(
 self,
 ctx: EvaluatorContext[object, object, object],
 ) -> EvaluatorOutput:
 if self.include_input:
 if self.include_expected_output:
 from.llm_as_a_judgeimport judge_input_output_expected
 grading_output = await judge_input_output_expected(
 ctx.inputs, ctx.output, ctx.expected_output, self.rubric, self.model, self.model_settings
 )
 else:
 from.llm_as_a_judgeimport judge_input_output
 grading_output = await judge_input_output(
 ctx.inputs, ctx.output, self.rubric, self.model, self.model_settings
 )
 else:
 if self.include_expected_output:
 from.llm_as_a_judgeimport judge_output_expected
 grading_output = await judge_output_expected(
 ctx.output, ctx.expected_output, self.rubric, self.model, self.model_settings
 )
 else:
 from.llm_as_a_judgeimport judge_output
 grading_output = await judge_output(ctx.output, self.rubric, self.model, self.model_settings)
 output: dict[str, EvaluationScalar | EvaluationReason] = {}
 include_both = self.score is not False and self.assertion is not False
 evaluation_name = self.get_default_evaluation_name()
 if self.score is not False:
 default_name = f'{evaluation_name}_score' if include_both else evaluation_name
 _update_combined_output(output, grading_output.score, grading_output.reason, self.score, default_name)
 if self.assertion is not False:
 default_name = f'{evaluation_name}_pass' if include_both else evaluation_name
 _update_combined_output(output, grading_output.pass_, grading_output.reason, self.assertion, default_name)
 return output
 defbuild_serialization_arguments(self):
 result = super().build_serialization_arguments()
 # always serialize the model as a string when present; use its name if it's a KnownModelName
 if (model := result.get('model')) and isinstance(model, models.Model): # pragma: no branch
 result['model'] = f'{model.system}:{model.model_name}'
 # Note: this may lead to confusion if you try to serialize-then-deserialize with a custom model.
 # I expect that is rare enough to be worth not solving yet, but common enough that we probably will want to
 # solve it eventually. I'm imagining some kind of model registry, but don't want to work out the details yet.
 return result
```
---|--- 
### MaxDuration `dataclass`
Bases: `Evaluator[](#pydantic_evals.evaluators.Evaluator "pydantic_evals.evaluators.evaluator.Evaluator")[object[](https://docs.python.org/3/library/functions.html#object), object[](https://docs.python.org/3/library/functions.html#object), object[](https://docs.python.org/3/library/functions.html#object)]`
Check if the execution time is under the specified maximum.
Source code in `pydantic_evals/pydantic_evals/evaluators/common.py`
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
```
| ```
@dataclass(repr=False)
classMaxDuration(Evaluator[object, object, object]):
"""Check if the execution time is under the specified maximum."""
 seconds: float | timedelta
 defevaluate(self, ctx: EvaluatorContext[object, object, object]) -> bool:
 duration = timedelta(seconds=ctx.duration)
 seconds = self.seconds
 if not isinstance(seconds, timedelta):
 seconds = timedelta(seconds=seconds)
 return duration <= seconds
```
---|--- 
### OutputConfig
Bases: `TypedDict[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.TypedDict "typing_extensions.TypedDict")`
Configuration for the score and assertion outputs of the LLMJudge evaluator.
Source code in `pydantic_evals/pydantic_evals/evaluators/common.py`
```
164
165
166
167
168
```
| ```
classOutputConfig(TypedDict, total=False):
"""Configuration for the score and assertion outputs of the LLMJudge evaluator."""
 evaluation_name: str
 include_reason: bool
```
---|--- 
### EvaluatorContext `dataclass`
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[InputsT, OutputT, MetadataT]`
Context for evaluating a task execution.
An instance of this class is the sole input to all Evaluators. It contains all the information needed to evaluate the task execution, including inputs, outputs, metadata, and telemetry data.
Evaluators use this context to access the task inputs, actual output, expected output, and other information when evaluating the result of the task execution.
Example: 
```
fromdataclassesimport dataclass
frompydantic_evals.evaluatorsimport Evaluator, EvaluatorContext
@dataclass
classExactMatch(Evaluator):
 defevaluate(self, ctx: EvaluatorContext) -> bool:
 # Use the context to access task inputs, outputs, and expected outputs
 return ctx.output == ctx.expected_output
```
Source code in `pydantic_evals/pydantic_evals/evaluators/context.py`
```
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
```
| ```
@dataclass(kw_only=True)
classEvaluatorContext(Generic[InputsT, OutputT, MetadataT]):
"""Context for evaluating a task execution.
 An instance of this class is the sole input to all Evaluators. It contains all the information
 needed to evaluate the task execution, including inputs, outputs, metadata, and telemetry data.
 Evaluators use this context to access the task inputs, actual output, expected output, and other
 information when evaluating the result of the task execution.
 Example:
```python
 from dataclasses import dataclass
 from pydantic_evals.evaluators import Evaluator, EvaluatorContext
 @dataclass
 class ExactMatch(Evaluator):
 def evaluate(self, ctx: EvaluatorContext) -> bool:
 # Use the context to access task inputs, outputs, and expected outputs
 return ctx.output == ctx.expected_output
```
 """
 name: str | None
"""The name of the case."""
 inputs: InputsT
"""The inputs provided to the task for this case."""
 metadata: MetadataT | None
"""Metadata associated with the case, if provided. May be None if no metadata was specified."""
 expected_output: OutputT | None
"""The expected output for the case, if provided. May be None if no expected output was specified."""
 output: OutputT
"""The actual output produced by the task for this case."""
 duration: float
"""The duration of the task run for this case."""
 _span_tree: SpanTree | SpanTreeRecordingError = field(repr=False)
"""The span tree for the task run for this case.
 This will be `None` if `logfire.configure` has not been called.
 """
 attributes: dict[str, Any]
"""Attributes associated with the task run for this case.
 These can be set by calling `pydantic_evals.dataset.set_eval_attribute` in any code executed
 during the evaluation task."""
 metrics: dict[str, int | float]
"""Metrics associated with the task run for this case.
 These can be set by calling `pydantic_evals.dataset.increment_eval_metric` in any code executed
 during the evaluation task."""
 @property
 defspan_tree(self) -> SpanTree:
"""Get the `SpanTree` for this task execution.
 The span tree is a graph where each node corresponds to an OpenTelemetry span recorded during the task
 execution, including timing information and any custom spans created during execution.
 Returns:
 The span tree for the task execution.
 Raises:
 SpanTreeRecordingError: If spans were not captured during execution of the task, e.g. due to not having
 the necessary dependencies installed.
 """
 if isinstance(self._span_tree, SpanTreeRecordingError):
 # In this case, there was a reason we couldn't record the SpanTree. We raise that now
 raise self._span_tree
 return self._span_tree
```
---|--- 
#### name `instance-attribute`
```
name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None
```
The name of the case.
#### inputs `instance-attribute`
```
inputs: InputsT
```
The inputs provided to the task for this case.
#### metadata `instance-attribute`
```
metadata: MetadataT | None
```
Metadata associated with the case, if provided. May be None if no metadata was specified.
#### expected_output `instance-attribute`
```
expected_output: OutputT | None
```
The expected output for the case, if provided. May be None if no expected output was specified.
#### output `instance-attribute`
```
output: OutputT
```
The actual output produced by the task for this case.
#### duration `instance-attribute`
```
duration: float[](https://docs.python.org/3/library/functions.html#float)
```
The duration of the task run for this case.
#### attributes `instance-attribute`
```
attributes: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
Attributes associated with the task run for this case.
These can be set by calling `pydantic_evals.dataset.set_eval_attribute` in any code executed during the evaluation task.
#### metrics `instance-attribute`
```
metrics: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), int[](https://docs.python.org/3/library/functions.html#int) | float[](https://docs.python.org/3/library/functions.html#float)]
```
Metrics associated with the task run for this case.
These can be set by calling `pydantic_evals.dataset.increment_eval_metric` in any code executed during the evaluation task.
#### span_tree `property`
```
span_tree: SpanTree[](../otel/#pydantic_evals.otel.SpanTree "pydantic_evals.otel.span_tree.SpanTree")
```
Get the `SpanTree` for this task execution.
The span tree is a graph where each node corresponds to an OpenTelemetry span recorded during the task execution, including timing information and any custom spans created during execution.
Returns:
Type | Description 
---|--- 
`SpanTree[](../otel/#pydantic_evals.otel.SpanTree "pydantic_evals.otel.span_tree.SpanTree")` | The span tree for the task execution. 
Raises:
Type | Description 
---|--- 
`SpanTreeRecordingError` | If spans were not captured during execution of the task, e.g. due to not having the necessary dependencies installed. 
### EvaluationReason `dataclass`
The result of running an evaluator with an optional explanation.
Contains a scalar value and an optional "reason" explaining the value.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`value` | `EvaluationScalar` | The scalar result of the evaluation (boolean, integer, float, or string). | _required_ 
`reason` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | An optional explanation of the evaluation result. | `None` 
Source code in `pydantic_evals/pydantic_evals/evaluators/evaluator.py`
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
```
| ```
@dataclass
classEvaluationReason:
"""The result of running an evaluator with an optional explanation.
 Contains a scalar value and an optional "reason" explaining the value.
 Args:
 value: The scalar result of the evaluation (boolean, integer, float, or string).
 reason: An optional explanation of the evaluation result.
 """
 value: EvaluationScalar
 reason: str | None = None
```
---|--- 
### EvaluationResult `dataclass`
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[EvaluationScalarT]`
The details of an individual evaluation result.
Contains the name, value, reason, and source evaluator for a single evaluation.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`name` | `str[](https://docs.python.org/3/library/stdtypes.html#str)` | The name of the evaluation. | _required_ 
`value` | `EvaluationScalarT` | The scalar result of the evaluation. | _required_ 
`reason` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | An optional explanation of the evaluation result. | _required_ 
`source` | `EvaluatorSpec[](#pydantic_evals.evaluators.EvaluatorSpec "pydantic_evals.evaluators.spec.EvaluatorSpec")` | The spec of the evaluator that produced this result. | _required_ 
Source code in `pydantic_evals/pydantic_evals/evaluators/evaluator.py`
```
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
```
| ```
@dataclass
classEvaluationResult(Generic[EvaluationScalarT]):
"""The details of an individual evaluation result.
 Contains the name, value, reason, and source evaluator for a single evaluation.
 Args:
 name: The name of the evaluation.
 value: The scalar result of the evaluation.
 reason: An optional explanation of the evaluation result.
 source: The spec of the evaluator that produced this result.
 """
 name: str
 value: EvaluationScalarT
 reason: str | None
 source: EvaluatorSpec
 defdowncast(self, *value_types: type[T]) -> EvaluationResult[T] | None:
"""Attempt to downcast this result to a more specific type.
 Args:
 *value_types: The types to check the value against.
 Returns:
 A downcast version of this result if the value is an instance of one of the given types,
 otherwise None.
 """
 # Check if value matches any of the target types, handling bool as a special case
 for value_type in value_types:
 if isinstance(self.value, value_type):
 # Only match bool with explicit bool type
 if isinstance(self.value, bool) and value_type is not bool:
 continue
 return cast(EvaluationResult[T], self)
 return None
```
---|--- 
#### downcast
```
downcast(
 *value_types: type[](https://docs.python.org/3/library/functions.html#type)[T],
) -> EvaluationResult[](#pydantic_evals.evaluators.EvaluationResult "pydantic_evals.evaluators.evaluator.EvaluationResult")[T] | None
```
Attempt to downcast this result to a more specific type.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`*value_types` | `type[](https://docs.python.org/3/library/functions.html#type)[T]` | The types to check the value against. | `()` 
Returns:
Type | Description 
---|--- 
`EvaluationResult[](#pydantic_evals.evaluators.EvaluationResult "pydantic_evals.evaluators.evaluator.EvaluationResult")[T] | None` | A downcast version of this result if the value is an instance of one of the given types, 
`EvaluationResult[](#pydantic_evals.evaluators.EvaluationResult "pydantic_evals.evaluators.evaluator.EvaluationResult")[T] | None` | otherwise None. 
Source code in `pydantic_evals/pydantic_evals/evaluators/evaluator.py`
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
 93
 94
 95
 96
 97
 98
 99
100
101
```
| ```
defdowncast(self, *value_types: type[T]) -> EvaluationResult[T] | None:
"""Attempt to downcast this result to a more specific type.
 Args:
 *value_types: The types to check the value against.
 Returns:
 A downcast version of this result if the value is an instance of one of the given types,
 otherwise None.
 """
 # Check if value matches any of the target types, handling bool as a special case
 for value_type in value_types:
 if isinstance(self.value, value_type):
 # Only match bool with explicit bool type
 if isinstance(self.value, bool) and value_type is not bool:
 continue
 return cast(EvaluationResult[T], self)
 return None
```
---|--- 
### Evaluator `dataclass`
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[InputsT, OutputT, MetadataT]`
Base class for all evaluators.
Evaluators can assess the performance of a task in a variety of ways, as a function of the EvaluatorContext.
Subclasses must implement the `evaluate` method. Note it can be defined with either `def` or `async def`.
Example: 
```
fromdataclassesimport dataclass
frompydantic_evals.evaluatorsimport Evaluator, EvaluatorContext
@dataclass
classExactMatch(Evaluator):
 defevaluate(self, ctx: EvaluatorContext) -> bool:
 return ctx.output == ctx.expected_output
```
Source code in `pydantic_evals/pydantic_evals/evaluators/evaluator.py`
```
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
282
283
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
```
| ```
@dataclass(repr=False)
classEvaluator(Generic[InputsT, OutputT, MetadataT], metaclass=_StrictABCMeta):
"""Base class for all evaluators.
 Evaluators can assess the performance of a task in a variety of ways, as a function of the EvaluatorContext.
 Subclasses must implement the `evaluate` method. Note it can be defined with either `def` or `async def`.
 Example:
```python
 from dataclasses import dataclass
 from pydantic_evals.evaluators import Evaluator, EvaluatorContext
 @dataclass
 class ExactMatch(Evaluator):
 def evaluate(self, ctx: EvaluatorContext) -> bool:
 return ctx.output == ctx.expected_output
```
 """
 __pydantic_config__ = ConfigDict(arbitrary_types_allowed=True)
 @classmethod
 defget_serialization_name(cls) -> str:
"""Return the 'name' of this Evaluator to use during serialization.
 Returns:
 The name of the Evaluator, which is typically the class name.
 """
 return cls.__name__
 @classmethod
 @deprecated('`name` has been renamed, use `get_serialization_name` instead.')
 defname(cls) -> str:
"""`name` has been renamed, use `get_serialization_name` instead."""
 return cls.get_serialization_name()
 defget_default_evaluation_name(self) -> str:
"""Return the default name to use in reports for the output of this evaluator.
 By default, if the evaluator has an attribute called `evaluation_name` of type string, that will be used.
 Otherwise, the serialization name of the evaluator (which is usually the class name) will be used.
 This can be overridden to get a more descriptive name in evaluation reports, e.g. using instance information.
 Note that evaluators that return a mapping of results will always use the keys of that mapping as the names
 of the associated evaluation results.
 """
 evaluation_name = getattr(self, 'evaluation_name', None)
 if isinstance(evaluation_name, str):
 # If the evaluator has an attribute `name` of type string, use that
 return evaluation_name
 return self.get_serialization_name()
 @abstractmethod
 defevaluate(
 self, ctx: EvaluatorContext[InputsT, OutputT, MetadataT]
 ) -> EvaluatorOutput | Awaitable[EvaluatorOutput]: # pragma: no cover
"""Evaluate the task output in the given context.
 This is the main evaluation method that subclasses must implement. It can be either synchronous
 or asynchronous, returning either an EvaluatorOutput directly or an Awaitable[EvaluatorOutput].
 Args:
 ctx: The context containing the inputs, outputs, and metadata for evaluation.
 Returns:
 The evaluation result, which can be a scalar value, an EvaluationReason, or a mapping
 of evaluation names to either of those. Can be returned either synchronously or as an
 awaitable for asynchronous evaluation.
 """
 raise NotImplementedError('You must implement `evaluate`.')
 defevaluate_sync(self, ctx: EvaluatorContext[InputsT, OutputT, MetadataT]) -> EvaluatorOutput:
"""Run the evaluator synchronously, handling both sync and async implementations.
 This method ensures synchronous execution by running any async evaluate implementation
 to completion using run_until_complete.
 Args:
 ctx: The context containing the inputs, outputs, and metadata for evaluation.
 Returns:
 The evaluation result, which can be a scalar value, an EvaluationReason, or a mapping
 of evaluation names to either of those.
 """
 output = self.evaluate(ctx)
 if inspect.iscoroutine(output): # pragma: no cover
 return get_event_loop().run_until_complete(output)
 else:
 return cast(EvaluatorOutput, output)
 async defevaluate_async(self, ctx: EvaluatorContext[InputsT, OutputT, MetadataT]) -> EvaluatorOutput:
"""Run the evaluator asynchronously, handling both sync and async implementations.
 This method ensures asynchronous execution by properly awaiting any async evaluate
 implementation. For synchronous implementations, it returns the result directly.
 Args:
 ctx: The context containing the inputs, outputs, and metadata for evaluation.
 Returns:
 The evaluation result, which can be a scalar value, an EvaluationReason, or a mapping
 of evaluation names to either of those.
 """
 # Note: If self.evaluate is synchronous, but you need to prevent this from blocking, override this method with:
 # return await anyio.to_thread.run_sync(self.evaluate, ctx)
 output = self.evaluate(ctx)
 if inspect.iscoroutine(output):
 return await output
 else:
 return cast(EvaluatorOutput, output)
 @model_serializer(mode='plain')
 defserialize(self, info: SerializationInfo) -> Any:
"""Serialize this Evaluator to a JSON-serializable form.
 Returns:
 A JSON-serializable representation of this evaluator as an EvaluatorSpec.
 """
 return to_jsonable_python(
 self.as_spec(),
 context=info.context,
 serialize_unknown=True,
 )
 defas_spec(self) -> EvaluatorSpec:
 raw_arguments = self.build_serialization_arguments()
 arguments: None | tuple[Any,] | dict[str, Any]
 if len(raw_arguments) == 0:
 arguments = None
 elif len(raw_arguments) == 1:
 arguments = (next(iter(raw_arguments.values())),)
 else:
 arguments = raw_arguments
 return EvaluatorSpec(name=self.get_serialization_name(), arguments=arguments)
 defbuild_serialization_arguments(self) -> dict[str, Any]:
"""Build the arguments for serialization.
 Evaluators are serialized for inclusion as the "source" in an `EvaluationResult`.
 If you want to modify how the evaluator is serialized for that or other purposes, you can override this method.
 Returns:
 A dictionary of arguments to be used during serialization.
 """
 raw_arguments: dict[str, Any] = {}
 for field in fields(self):
 value = getattr(self, field.name)
 # always exclude defaults:
 if field.default is not MISSING:
 if value == field.default:
 continue
 if field.default_factory is not MISSING:
 if value == field.default_factory(): # pragma: no branch
 continue
 raw_arguments[field.name] = value
 return raw_arguments
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### get_serialization_name `classmethod`
```
get_serialization_name() -> str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Return the 'name' of this Evaluator to use during serialization.
Returns:
Type | Description 
---|--- 
`str[](https://docs.python.org/3/library/stdtypes.html#str)` | The name of the Evaluator, which is typically the class name. 
Source code in `pydantic_evals/pydantic_evals/evaluators/evaluator.py`
```
162
163
164
165
166
167
168
169
```
| ```
@classmethod
defget_serialization_name(cls) -> str:
"""Return the 'name' of this Evaluator to use during serialization.
 Returns:
 The name of the Evaluator, which is typically the class name.
 """
 return cls.__name__
```
---|--- 
#### name `classmethod` `deprecated`
```
name() -> str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Deprecated
`name` has been renamed, use `get_serialization_name` instead.
`name` has been renamed, use `get_serialization_name` instead.
Source code in `pydantic_evals/pydantic_evals/evaluators/evaluator.py`
```
171
172
173
174
175
```
| ```
@classmethod
@deprecated('`name` has been renamed, use `get_serialization_name` instead.')
defname(cls) -> str:
"""`name` has been renamed, use `get_serialization_name` instead."""
 return cls.get_serialization_name()
```
---|--- 
#### get_default_evaluation_name
```
get_default_evaluation_name() -> str[](https://docs.python.org/3/library/stdtypes.html#str)
```
Return the default name to use in reports for the output of this evaluator.
By default, if the evaluator has an attribute called `evaluation_name` of type string, that will be used. Otherwise, the serialization name of the evaluator (which is usually the class name) will be used.
This can be overridden to get a more descriptive name in evaluation reports, e.g. using instance information.
Note that evaluators that return a mapping of results will always use the keys of that mapping as the names of the associated evaluation results.
Source code in `pydantic_evals/pydantic_evals/evaluators/evaluator.py`
```
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
```
| ```
defget_default_evaluation_name(self) -> str:
"""Return the default name to use in reports for the output of this evaluator.
 By default, if the evaluator has an attribute called `evaluation_name` of type string, that will be used.
 Otherwise, the serialization name of the evaluator (which is usually the class name) will be used.
 This can be overridden to get a more descriptive name in evaluation reports, e.g. using instance information.
 Note that evaluators that return a mapping of results will always use the keys of that mapping as the names
 of the associated evaluation results.
 """
 evaluation_name = getattr(self, 'evaluation_name', None)
 if isinstance(evaluation_name, str):
 # If the evaluator has an attribute `name` of type string, use that
 return evaluation_name
 return self.get_serialization_name()
```
---|--- 
#### evaluate `abstractmethod`
```
evaluate(
 ctx: EvaluatorContext[](#pydantic_evals.evaluators.EvaluatorContext "pydantic_evals.evaluators.context.EvaluatorContext")[InputsT, OutputT, MetadataT],
) -> EvaluatorOutput[](#pydantic_evals.evaluators.EvaluatorOutput "pydantic_evals.evaluators.evaluator.EvaluatorOutput") | Awaitable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Awaitable "collections.abc.Awaitable")[EvaluatorOutput[](#pydantic_evals.evaluators.EvaluatorOutput "pydantic_evals.evaluators.evaluator.EvaluatorOutput")]
```
Evaluate the task output in the given context.
This is the main evaluation method that subclasses must implement. It can be either synchronous or asynchronous, returning either an EvaluatorOutput directly or an Awaitable[EvaluatorOutput].
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`ctx` | `EvaluatorContext[](#pydantic_evals.evaluators.EvaluatorContext "pydantic_evals.evaluators.context.EvaluatorContext")[InputsT, OutputT, MetadataT]` | The context containing the inputs, outputs, and metadata for evaluation. | _required_ 
Returns:
Type | Description 
---|--- 
`EvaluatorOutput[](#pydantic_evals.evaluators.EvaluatorOutput "pydantic_evals.evaluators.evaluator.EvaluatorOutput") | Awaitable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Awaitable "collections.abc.Awaitable")[EvaluatorOutput[](#pydantic_evals.evaluators.EvaluatorOutput "pydantic_evals.evaluators.evaluator.EvaluatorOutput")]` | The evaluation result, which can be a scalar value, an EvaluationReason, or a mapping 
`EvaluatorOutput[](#pydantic_evals.evaluators.EvaluatorOutput "pydantic_evals.evaluators.evaluator.EvaluatorOutput") | Awaitable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Awaitable "collections.abc.Awaitable")[EvaluatorOutput[](#pydantic_evals.evaluators.EvaluatorOutput "pydantic_evals.evaluators.evaluator.EvaluatorOutput")]` | of evaluation names to either of those. Can be returned either synchronously or as an 
`EvaluatorOutput[](#pydantic_evals.evaluators.EvaluatorOutput "pydantic_evals.evaluators.evaluator.EvaluatorOutput") | Awaitable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Awaitable "collections.abc.Awaitable")[EvaluatorOutput[](#pydantic_evals.evaluators.EvaluatorOutput "pydantic_evals.evaluators.evaluator.EvaluatorOutput")]` | awaitable for asynchronous evaluation. 
Source code in `pydantic_evals/pydantic_evals/evaluators/evaluator.py`
```
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
```
| ```
@abstractmethod
defevaluate(
 self, ctx: EvaluatorContext[InputsT, OutputT, MetadataT]
) -> EvaluatorOutput | Awaitable[EvaluatorOutput]: # pragma: no cover
"""Evaluate the task output in the given context.
 This is the main evaluation method that subclasses must implement. It can be either synchronous
 or asynchronous, returning either an EvaluatorOutput directly or an Awaitable[EvaluatorOutput].
 Args:
 ctx: The context containing the inputs, outputs, and metadata for evaluation.
 Returns:
 The evaluation result, which can be a scalar value, an EvaluationReason, or a mapping
 of evaluation names to either of those. Can be returned either synchronously or as an
 awaitable for asynchronous evaluation.
 """
 raise NotImplementedError('You must implement `evaluate`.')
```
---|--- 
#### evaluate_sync
```
evaluate_sync(
 ctx: EvaluatorContext[](#pydantic_evals.evaluators.EvaluatorContext "pydantic_evals.evaluators.context.EvaluatorContext")[InputsT, OutputT, MetadataT],
) -> EvaluatorOutput[](#pydantic_evals.evaluators.EvaluatorOutput "pydantic_evals.evaluators.evaluator.EvaluatorOutput")
```
Run the evaluator synchronously, handling both sync and async implementations.
This method ensures synchronous execution by running any async evaluate implementation to completion using run_until_complete.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`ctx` | `EvaluatorContext[](#pydantic_evals.evaluators.EvaluatorContext "pydantic_evals.evaluators.context.EvaluatorContext")[InputsT, OutputT, MetadataT]` | The context containing the inputs, outputs, and metadata for evaluation. | _required_ 
Returns:
Type | Description 
---|--- 
`EvaluatorOutput[](#pydantic_evals.evaluators.EvaluatorOutput "pydantic_evals.evaluators.evaluator.EvaluatorOutput")` | The evaluation result, which can be a scalar value, an EvaluationReason, or a mapping 
`EvaluatorOutput[](#pydantic_evals.evaluators.EvaluatorOutput "pydantic_evals.evaluators.evaluator.EvaluatorOutput")` | of evaluation names to either of those. 
Source code in `pydantic_evals/pydantic_evals/evaluators/evaluator.py`
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
```
| ```
defevaluate_sync(self, ctx: EvaluatorContext[InputsT, OutputT, MetadataT]) -> EvaluatorOutput:
"""Run the evaluator synchronously, handling both sync and async implementations.
 This method ensures synchronous execution by running any async evaluate implementation
 to completion using run_until_complete.
 Args:
 ctx: The context containing the inputs, outputs, and metadata for evaluation.
 Returns:
 The evaluation result, which can be a scalar value, an EvaluationReason, or a mapping
 of evaluation names to either of those.
 """
 output = self.evaluate(ctx)
 if inspect.iscoroutine(output): # pragma: no cover
 return get_event_loop().run_until_complete(output)
 else:
 return cast(EvaluatorOutput, output)
```
---|--- 
#### evaluate_async `async`
```
evaluate_async(
 ctx: EvaluatorContext[](#pydantic_evals.evaluators.EvaluatorContext "pydantic_evals.evaluators.context.EvaluatorContext")[InputsT, OutputT, MetadataT],
) -> EvaluatorOutput[](#pydantic_evals.evaluators.EvaluatorOutput "pydantic_evals.evaluators.evaluator.EvaluatorOutput")
```
Run the evaluator asynchronously, handling both sync and async implementations.
This method ensures asynchronous execution by properly awaiting any async evaluate implementation. For synchronous implementations, it returns the result directly.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`ctx` | `EvaluatorContext[](#pydantic_evals.evaluators.EvaluatorContext "pydantic_evals.evaluators.context.EvaluatorContext")[InputsT, OutputT, MetadataT]` | The context containing the inputs, outputs, and metadata for evaluation. | _required_ 
Returns:
Type | Description 
---|--- 
`EvaluatorOutput[](#pydantic_evals.evaluators.EvaluatorOutput "pydantic_evals.evaluators.evaluator.EvaluatorOutput")` | The evaluation result, which can be a scalar value, an EvaluationReason, or a mapping 
`EvaluatorOutput[](#pydantic_evals.evaluators.EvaluatorOutput "pydantic_evals.evaluators.evaluator.EvaluatorOutput")` | of evaluation names to either of those. 
Source code in `pydantic_evals/pydantic_evals/evaluators/evaluator.py`
```
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
```
| ```
async defevaluate_async(self, ctx: EvaluatorContext[InputsT, OutputT, MetadataT]) -> EvaluatorOutput:
"""Run the evaluator asynchronously, handling both sync and async implementations.
 This method ensures asynchronous execution by properly awaiting any async evaluate
 implementation. For synchronous implementations, it returns the result directly.
 Args:
 ctx: The context containing the inputs, outputs, and metadata for evaluation.
 Returns:
 The evaluation result, which can be a scalar value, an EvaluationReason, or a mapping
 of evaluation names to either of those.
 """
 # Note: If self.evaluate is synchronous, but you need to prevent this from blocking, override this method with:
 # return await anyio.to_thread.run_sync(self.evaluate, ctx)
 output = self.evaluate(ctx)
 if inspect.iscoroutine(output):
 return await output
 else:
 return cast(EvaluatorOutput, output)
```
---|--- 
#### serialize
```
serialize(info: SerializationInfo[](https://docs.pydantic.dev/latest/api/pydantic_core_schema/#pydantic_core.core_schema.SerializationInfo "pydantic_core.core_schema.SerializationInfo")) -> Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")
```
Serialize this Evaluator to a JSON-serializable form.
Returns:
Type | Description 
---|--- 
`Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")` | A JSON-serializable representation of this evaluator as an EvaluatorSpec. 
Source code in `pydantic_evals/pydantic_evals/evaluators/evaluator.py`
```
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
```
| ```
@model_serializer(mode='plain')
defserialize(self, info: SerializationInfo) -> Any:
"""Serialize this Evaluator to a JSON-serializable form.
 Returns:
 A JSON-serializable representation of this evaluator as an EvaluatorSpec.
 """
 return to_jsonable_python(
 self.as_spec(),
 context=info.context,
 serialize_unknown=True,
 )
```
---|--- 
#### build_serialization_arguments
```
build_serialization_arguments() -> dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
Build the arguments for serialization.
Evaluators are serialized for inclusion as the "source" in an `EvaluationResult`. If you want to modify how the evaluator is serialized for that or other purposes, you can override this method.
Returns:
Type | Description 
---|--- 
`dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]` | A dictionary of arguments to be used during serialization. 
Source code in `pydantic_evals/pydantic_evals/evaluators/evaluator.py`
```
280
281
282
283
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
```
| ```
defbuild_serialization_arguments(self) -> dict[str, Any]:
"""Build the arguments for serialization.
 Evaluators are serialized for inclusion as the "source" in an `EvaluationResult`.
 If you want to modify how the evaluator is serialized for that or other purposes, you can override this method.
 Returns:
 A dictionary of arguments to be used during serialization.
 """
 raw_arguments: dict[str, Any] = {}
 for field in fields(self):
 value = getattr(self, field.name)
 # always exclude defaults:
 if field.default is not MISSING:
 if value == field.default:
 continue
 if field.default_factory is not MISSING:
 if value == field.default_factory(): # pragma: no branch
 continue
 raw_arguments[field.name] = value
 return raw_arguments
```
---|--- 
### EvaluatorFailure `dataclass`
Represents a failure raised during the execution of an evaluator.
Source code in `pydantic_evals/pydantic_evals/evaluators/evaluator.py`
```
104
105
106
107
108
109
110
111
```
| ```
@dataclass
classEvaluatorFailure:
"""Represents a failure raised during the execution of an evaluator."""
 name: str
 error_message: str
 error_stacktrace: str
 source: EvaluatorSpec
```
---|--- 
### EvaluatorOutput `module-attribute`
```
EvaluatorOutput = (
 EvaluationScalar
 | EvaluationReason[](#pydantic_evals.evaluators.EvaluationReason "pydantic_evals.evaluators.evaluator.EvaluationReason")
 | Mapping[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Mapping "collections.abc.Mapping")[str[](https://docs.python.org/3/library/stdtypes.html#str), EvaluationScalar | EvaluationReason[](#pydantic_evals.evaluators.EvaluationReason "pydantic_evals.evaluators.evaluator.EvaluationReason")]
)
```
Type for the output of an evaluator, which can be a scalar, an EvaluationReason, or a mapping of names to either.
### EvaluatorSpec
Bases: `BaseModel[](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel "pydantic.BaseModel")`
The specification of an evaluator to be run.
This class is used to represent evaluators in a serializable format, supporting various short forms for convenience when defining evaluators in YAML or JSON dataset files.
In particular, each of the following forms is supported for specifying an evaluator with name `MyEvaluator`: * `'MyEvaluator'` - Just the (string) name of the Evaluator subclass is used if its `__init__` takes no arguments * `{'MyEvaluator': first_arg}` - A single argument is passed as the first positional argument to `MyEvaluator.__init__` * `{'MyEvaluator': {k1: v1, k2: v2}}` - Multiple kwargs are passed to `MyEvaluator.__init__`
Source code in `pydantic_evals/pydantic_evals/evaluators/spec.py`
```
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
```
| ```
classEvaluatorSpec(BaseModel):
"""The specification of an evaluator to be run.
 This class is used to represent evaluators in a serializable format, supporting various
 short forms for convenience when defining evaluators in YAML or JSON dataset files.
 In particular, each of the following forms is supported for specifying an evaluator with name `MyEvaluator`:
 * `'MyEvaluator'` - Just the (string) name of the Evaluator subclass is used if its `__init__` takes no arguments
 * `{'MyEvaluator': first_arg}` - A single argument is passed as the first positional argument to `MyEvaluator.__init__`
 * `{'MyEvaluator': {k1: v1, k2: v2}}` - Multiple kwargs are passed to `MyEvaluator.__init__`
 """
 name: str
"""The name of the evaluator class; should be the value returned by `EvaluatorClass.get_serialization_name()`"""
 arguments: None | tuple[Any] | dict[str, Any]
"""The arguments to pass to the evaluator's constructor.
 Can be None (no arguments), a tuple (a single positional argument), or a dict (keyword arguments).
 """
 @property
 defargs(self) -> tuple[Any, ...]:
"""Get the positional arguments for the evaluator.
 Returns:
 A tuple of positional arguments if arguments is a tuple, otherwise an empty tuple.
 """
 if isinstance(self.arguments, tuple):
 return self.arguments
 return ()
 @property
 defkwargs(self) -> dict[str, Any]:
"""Get the keyword arguments for the evaluator.
 Returns:
 A dictionary of keyword arguments if arguments is a dict, otherwise an empty dict.
 """
 if isinstance(self.arguments, dict):
 return self.arguments
 return {}
 @model_validator(mode='wrap')
 @classmethod
 defdeserialize(cls, value: Any, handler: ModelWrapValidatorHandler[EvaluatorSpec]) -> EvaluatorSpec:
"""Deserialize an EvaluatorSpec from various formats.
 This validator handles the various short forms of evaluator specifications,
 converting them to a consistent EvaluatorSpec instance.
 Args:
 value: The value to deserialize.
 handler: The validator handler.
 Returns:
 The deserialized EvaluatorSpec.
 Raises:
 ValidationError: If the value cannot be deserialized.
 """
 try:
 result = handler(value)
 return result
 except ValidationError as exc:
 try:
 deserialized = _SerializedEvaluatorSpec.model_validate(value)
 except ValidationError:
 raise exc # raise the original error
 return deserialized.to_evaluator_spec()
 @model_serializer(mode='wrap')
 defserialize(self, handler: SerializerFunctionWrapHandler, info: SerializationInfo) -> Any:
"""Serialize using the appropriate short-form if possible.
 Returns:
 The serialized evaluator specification, using the shortest form possible:
 - Just the name if there are no arguments
 - {name: first_arg} if there's a single positional argument
 - {name: {kwargs}} if there are multiple (keyword) arguments
 """
 if isinstance(info.context, dict) and info.context.get('use_short_form'): # pyright: ignore[reportUnknownMemberType]
 if self.arguments is None:
 return self.name
 elif isinstance(self.arguments, tuple):
 return {self.name: self.arguments[0]}
 else:
 return {self.name: self.arguments}
 else:
 return handler(self)
```
---|--- 
#### name `instance-attribute`
```
name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The name of the evaluator class; should be the value returned by `EvaluatorClass.get_serialization_name()`
#### arguments `instance-attribute`
```
arguments: None | tuple[](https://docs.python.org/3/library/stdtypes.html#tuple)[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
The arguments to pass to the evaluator's constructor.
Can be None (no arguments), a tuple (a single positional argument), or a dict (keyword arguments).
#### args `property`
```
args: tuple[](https://docs.python.org/3/library/stdtypes.html#tuple)[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any"), ...]
```
Get the positional arguments for the evaluator.
Returns:
Type | Description 
---|--- 
`tuple[](https://docs.python.org/3/library/stdtypes.html#tuple)[Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any"), ...]` | A tuple of positional arguments if arguments is a tuple, otherwise an empty tuple. 
#### kwargs `property`
```
kwargs: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
Get the keyword arguments for the evaluator.
Returns:
Type | Description 
---|--- 
`dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]` | A dictionary of keyword arguments if arguments is a dict, otherwise an empty dict. 
#### deserialize `classmethod`
```
deserialize(
 value: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any"),
 handler: ModelWrapValidatorHandler[](https://docs.pydantic.dev/latest/api/functional_validators/#pydantic.functional_validators.ModelWrapValidatorHandler "pydantic.ModelWrapValidatorHandler")[EvaluatorSpec[](#pydantic_evals.evaluators.EvaluatorSpec "pydantic_evals.evaluators.spec.EvaluatorSpec")],
) -> EvaluatorSpec[](#pydantic_evals.evaluators.EvaluatorSpec "pydantic_evals.evaluators.spec.EvaluatorSpec")
```
Deserialize an EvaluatorSpec from various formats.
This validator handles the various short forms of evaluator specifications, converting them to a consistent EvaluatorSpec instance.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`value` | `Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")` | The value to deserialize. | _required_ 
`handler` | `ModelWrapValidatorHandler[](https://docs.pydantic.dev/latest/api/functional_validators/#pydantic.functional_validators.ModelWrapValidatorHandler "pydantic.ModelWrapValidatorHandler")[EvaluatorSpec[](#pydantic_evals.evaluators.EvaluatorSpec "pydantic_evals.evaluators.spec.EvaluatorSpec")]` | The validator handler. | _required_ 
Returns:
Type | Description 
---|--- 
`EvaluatorSpec[](#pydantic_evals.evaluators.EvaluatorSpec "pydantic_evals.evaluators.spec.EvaluatorSpec")` | The deserialized EvaluatorSpec. 
Raises:
Type | Description 
---|--- 
`ValidationError` | If the value cannot be deserialized. 
Source code in `pydantic_evals/pydantic_evals/evaluators/spec.py`
```
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
```
| ```
@model_validator(mode='wrap')
@classmethod
defdeserialize(cls, value: Any, handler: ModelWrapValidatorHandler[EvaluatorSpec]) -> EvaluatorSpec:
"""Deserialize an EvaluatorSpec from various formats.
 This validator handles the various short forms of evaluator specifications,
 converting them to a consistent EvaluatorSpec instance.
 Args:
 value: The value to deserialize.
 handler: The validator handler.
 Returns:
 The deserialized EvaluatorSpec.
 Raises:
 ValidationError: If the value cannot be deserialized.
 """
 try:
 result = handler(value)
 return result
 except ValidationError as exc:
 try:
 deserialized = _SerializedEvaluatorSpec.model_validate(value)
 except ValidationError:
 raise exc # raise the original error
 return deserialized.to_evaluator_spec()
```
---|--- 
#### serialize
```
serialize(
 handler: SerializerFunctionWrapHandler,
 info: SerializationInfo[](https://docs.pydantic.dev/latest/api/pydantic_core_schema/#pydantic_core.core_schema.SerializationInfo "pydantic_core.core_schema.SerializationInfo"),
) -> Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")
```
Serialize using the appropriate short-form if possible.
Returns:
Type | Description 
---|--- 
`Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")` | The serialized evaluator specification, using the shortest form possible: 
`Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")` | 
 * Just the name if there are no arguments
`Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")` | 
 * {name: first_arg} if there's a single positional argument
`Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")` | 
 * {name: {kwargs}} if there are multiple (keyword) arguments
Source code in `pydantic_evals/pydantic_evals/evaluators/spec.py`
```
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
```
| ```
@model_serializer(mode='wrap')
defserialize(self, handler: SerializerFunctionWrapHandler, info: SerializationInfo) -> Any:
"""Serialize using the appropriate short-form if possible.
 Returns:
 The serialized evaluator specification, using the shortest form possible:
 - Just the name if there are no arguments
 - {name: first_arg} if there's a single positional argument
 - {name: {kwargs}} if there are multiple (keyword) arguments
 """
 if isinstance(info.context, dict) and info.context.get('use_short_form'): # pyright: ignore[reportUnknownMemberType]
 if self.arguments is None:
 return self.name
 elif isinstance(self.arguments, tuple):
 return {self.name: self.arguments[0]}
 else:
 return {self.name: self.arguments}
 else:
 return handler(self)
```
---|--- 
### GradingOutput
Bases: `BaseModel[](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel "pydantic.BaseModel")`
The output of a grading operation.
Source code in `pydantic_evals/pydantic_evals/evaluators/llm_as_a_judge.py`
```
26
27
28
29
30
31
```
| ```
classGradingOutput(BaseModel, populate_by_name=True):
"""The output of a grading operation."""
 reason: str
 pass_: bool = Field(validation_alias='pass', serialization_alias='pass')
 score: float
```
---|--- 
### judge_output `async`
```
judge_output(
 output: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any"),
 rubric: str[](https://docs.python.org/3/library/stdtypes.html#str),
 model: Model[](../../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | None = None,
 model_settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
) -> GradingOutput[](#pydantic_evals.evaluators.llm_as_a_judge.GradingOutput "pydantic_evals.evaluators.llm_as_a_judge.GradingOutput")
```
Judge the output of a model based on a rubric.
If the model is not specified, a default model is used. The default model starts as 'openai:gpt-4o', but this can be changed using the `set_default_judge_model` function.
Source code in `pydantic_evals/pydantic_evals/evaluators/llm_as_a_judge.py`
```
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
async defjudge_output(
 output: Any,
 rubric: str,
 model: models.Model | models.KnownModelName | None = None,
 model_settings: ModelSettings | None = None,
) -> GradingOutput:
"""Judge the output of a model based on a rubric.
 If the model is not specified, a default model is used. The default model starts as 'openai:gpt-4o',
 but this can be changed using the `set_default_judge_model` function.
 """
 user_prompt = _build_prompt(output=output, rubric=rubric)
 return (
 await _judge_output_agent.run(user_prompt, model=model or _default_model, model_settings=model_settings)
 ).output
```
---|--- 
### judge_input_output `async`
```
judge_input_output(
 inputs: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any"),
 output: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any"),
 rubric: str[](https://docs.python.org/3/library/stdtypes.html#str),
 model: Model[](../../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | None = None,
 model_settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
) -> GradingOutput[](#pydantic_evals.evaluators.llm_as_a_judge.GradingOutput "pydantic_evals.evaluators.llm_as_a_judge.GradingOutput")
```
Judge the output of a model based on the inputs and a rubric.
If the model is not specified, a default model is used. The default model starts as 'openai:gpt-4o', but this can be changed using the `set_default_judge_model` function.
Source code in `pydantic_evals/pydantic_evals/evaluators/llm_as_a_judge.py`
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
107
108
109
110
111
```
| ```
async defjudge_input_output(
 inputs: Any,
 output: Any,
 rubric: str,
 model: models.Model | models.KnownModelName | None = None,
 model_settings: ModelSettings | None = None,
) -> GradingOutput:
"""Judge the output of a model based on the inputs and a rubric.
 If the model is not specified, a default model is used. The default model starts as 'openai:gpt-4o',
 but this can be changed using the `set_default_judge_model` function.
 """
 user_prompt = _build_prompt(inputs=inputs, output=output, rubric=rubric)
 return (
 await _judge_input_output_agent.run(user_prompt, model=model or _default_model, model_settings=model_settings)
 ).output
```
---|--- 
### judge_input_output_expected `async`
```
judge_input_output_expected(
 inputs: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any"),
 output: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any"),
 expected_output: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any"),
 rubric: str[](https://docs.python.org/3/library/stdtypes.html#str),
 model: Model[](../../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | None = None,
 model_settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
) -> GradingOutput[](#pydantic_evals.evaluators.llm_as_a_judge.GradingOutput "pydantic_evals.evaluators.llm_as_a_judge.GradingOutput")
```
Judge the output of a model based on the inputs and a rubric.
If the model is not specified, a default model is used. The default model starts as 'openai:gpt-4o', but this can be changed using the `set_default_judge_model` function.
Source code in `pydantic_evals/pydantic_evals/evaluators/llm_as_a_judge.py`
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
```
| ```
async defjudge_input_output_expected(
 inputs: Any,
 output: Any,
 expected_output: Any,
 rubric: str,
 model: models.Model | models.KnownModelName | None = None,
 model_settings: ModelSettings | None = None,
) -> GradingOutput:
"""Judge the output of a model based on the inputs and a rubric.
 If the model is not specified, a default model is used. The default model starts as 'openai:gpt-4o',
 but this can be changed using the `set_default_judge_model` function.
 """
 user_prompt = _build_prompt(inputs=inputs, output=output, rubric=rubric, expected_output=expected_output)
 return (
 await _judge_input_output_expected_agent.run(
 user_prompt, model=model or _default_model, model_settings=model_settings
 )
 ).output
```
---|--- 
### judge_output_expected `async`
```
judge_output_expected(
 output: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any"),
 expected_output: Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any"),
 rubric: str[](https://docs.python.org/3/library/stdtypes.html#str),
 model: Model[](../../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName") | None = None,
 model_settings: ModelSettings[](../../settings/#pydantic_ai.settings.ModelSettings "pydantic_ai.settings.ModelSettings") | None = None,
) -> GradingOutput[](#pydantic_evals.evaluators.llm_as_a_judge.GradingOutput "pydantic_evals.evaluators.llm_as_a_judge.GradingOutput")
```
Judge the output of a model based on the expected output, output, and a rubric.
If the model is not specified, a default model is used. The default model starts as 'openai:gpt-4o', but this can be changed using the `set_default_judge_model` function.
Source code in `pydantic_evals/pydantic_evals/evaluators/llm_as_a_judge.py`
```
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
```
| ```
async defjudge_output_expected(
 output: Any,
 expected_output: Any,
 rubric: str,
 model: models.Model | models.KnownModelName | None = None,
 model_settings: ModelSettings | None = None,
) -> GradingOutput:
"""Judge the output of a model based on the expected output, output, and a rubric.
 If the model is not specified, a default model is used. The default model starts as 'openai:gpt-4o',
 but this can be changed using the `set_default_judge_model` function.
 """
 user_prompt = _build_prompt(output=output, rubric=rubric, expected_output=expected_output)
 return (
 await _judge_output_expected_agent.run(
 user_prompt, model=model or _default_model, model_settings=model_settings
 )
 ).output
```
---|--- 
### set_default_judge_model
```
set_default_judge_model(
 model: Model[](../../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model") | KnownModelName[](../../models/base/#pydantic_ai.models.KnownModelName "pydantic_ai.models.KnownModelName"),
) -> None
```
Set the default model used for judging.
This model is used if `None` is passed to the `model` argument of `judge_output` and `judge_input_output`.
Source code in `pydantic_evals/pydantic_evals/evaluators/llm_as_a_judge.py`
```
204
205
206
207
208
209
210
```
| ```
defset_default_judge_model(model: models.Model | models.KnownModelName) -> None:
"""Set the default model used for judging.
 This model is used if `None` is passed to the `model` argument of `judge_output` and `judge_input_output`.
 """
 global _default_model
 _default_model = model
```
---|---