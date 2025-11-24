[ Skip to content ](#pydantic_aitools)
# `pydantic_ai.tools`
### AgentDepsT `module-attribute`
```
AgentDepsT = TypeVar(
 "AgentDepsT", default=None, contravariant=True
)
```
Type variable for agent dependencies.
### RunContext `dataclass`
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[AgentDepsT[](#pydantic_ai.tools.AgentDepsT "pydantic_ai._run_context.AgentDepsT")]`
Information about the current call.
Source code in `pydantic_ai_slim/pydantic_ai/_run_context.py`
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
```
| ```
@dataclasses.dataclass(repr=False, kw_only=True)
classRunContext(Generic[AgentDepsT]):
"""Information about the current call."""
 deps: AgentDepsT
"""Dependencies for the agent."""
 model: Model
"""The model used in this run."""
 usage: RunUsage
"""LLM usage associated with the run."""
 prompt: str | Sequence[_messages.UserContent] | None = None
"""The original user prompt passed to the run."""
 messages: list[_messages.ModelMessage] = field(default_factory=list)
"""Messages exchanged in the conversation so far."""
 tracer: Tracer = field(default_factory=NoOpTracer)
"""The tracer to use for tracing the run."""
 trace_include_content: bool = False
"""Whether to include the content of the messages in the trace."""
 instrumentation_version: int = DEFAULT_INSTRUMENTATION_VERSION
"""Instrumentation settings version, if instrumentation is enabled."""
 retries: dict[str, int] = field(default_factory=dict)
"""Number of retries for each tool so far."""
 tool_call_id: str | None = None
"""The ID of the tool call."""
 tool_name: str | None = None
"""Name of the tool being called."""
 retry: int = 0
"""Number of retries of this tool so far."""
 max_retries: int = 0
"""The maximum number of retries of this tool."""
 run_step: int = 0
"""The current step in the run."""
 tool_call_approved: bool = False
"""Whether a tool call that required approval has now been approved."""
 @property
 deflast_attempt(self) -> bool:
"""Whether this is the last attempt at running this tool before an error is raised."""
 return self.retry == self.max_retries
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### deps `instance-attribute`
```
deps: AgentDepsT[](#pydantic_ai.tools.AgentDepsT "pydantic_ai._run_context.AgentDepsT")
```
Dependencies for the agent.
#### model `instance-attribute`
```
model: Model[](../models/base/#pydantic_ai.models.Model "pydantic_ai.models.Model")
```
The model used in this run.
#### usage `instance-attribute`
```
usage: RunUsage[](../usage/#pydantic_ai.usage.RunUsage "pydantic_ai.result.RunUsage")
```
LLM usage associated with the run.
#### prompt `class-attribute` `instance-attribute`
```
prompt: str[](https://docs.python.org/3/library/stdtypes.html#str) | Sequence[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence")[UserContent] | None = None
```
The original user prompt passed to the run.
#### messages `class-attribute` `instance-attribute`
```
messages: list[](https://docs.python.org/3/library/stdtypes.html#list)[ModelMessage[](../messages/#pydantic_ai.messages.ModelMessage "pydantic_ai.messages.ModelMessage")] = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(default_factory=list[](https://docs.python.org/3/library/stdtypes.html#list))
```
Messages exchanged in the conversation so far.
#### tracer `class-attribute` `instance-attribute`
```
tracer: Tracer = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(default_factory=NoOpTracer)
```
The tracer to use for tracing the run.
#### trace_include_content `class-attribute` `instance-attribute`
```
trace_include_content: bool[](https://docs.python.org/3/library/functions.html#bool) = False
```
Whether to include the content of the messages in the trace.
#### instrumentation_version `class-attribute` `instance-attribute`
```
instrumentation_version: int[](https://docs.python.org/3/library/functions.html#int) = (
 DEFAULT_INSTRUMENTATION_VERSION
)
```
Instrumentation settings version, if instrumentation is enabled.
#### retries `class-attribute` `instance-attribute`
```
retries: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), int[](https://docs.python.org/3/library/functions.html#int)] = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(default_factory=dict[](https://docs.python.org/3/library/stdtypes.html#dict))
```
Number of retries for each tool so far.
#### tool_call_id `class-attribute` `instance-attribute`
```
tool_call_id: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The ID of the tool call.
#### tool_name `class-attribute` `instance-attribute`
```
tool_name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
Name of the tool being called.
#### retry `class-attribute` `instance-attribute`
```
retry: int[](https://docs.python.org/3/library/functions.html#int) = 0
```
Number of retries of this tool so far.
#### max_retries `class-attribute` `instance-attribute`
```
max_retries: int[](https://docs.python.org/3/library/functions.html#int) = 0
```
The maximum number of retries of this tool.
#### run_step `class-attribute` `instance-attribute`
```
run_step: int[](https://docs.python.org/3/library/functions.html#int) = 0
```
The current step in the run.
#### tool_call_approved `class-attribute` `instance-attribute`
```
tool_call_approved: bool[](https://docs.python.org/3/library/functions.html#bool) = False
```
Whether a tool call that required approval has now been approved.
#### last_attempt `property`
```
last_attempt: bool[](https://docs.python.org/3/library/functions.html#bool)
```
Whether this is the last attempt at running this tool before an error is raised.
### ToolParams `module-attribute`
```
ToolParams = ParamSpec[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.ParamSpec "typing_extensions.ParamSpec")('ToolParams', default=...)
```
Retrieval function param spec.
### SystemPromptFunc `module-attribute`
```
SystemPromptFunc: TypeAlias[](https://docs.python.org/3/library/typing.html#typing.TypeAlias "typing.TypeAlias") = (
 Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[RunContext[](#pydantic_ai.tools.RunContext "pydantic_ai._run_context.RunContext")[AgentDepsT[](#pydantic_ai.tools.AgentDepsT "pydantic_ai._run_context.AgentDepsT")]], str[](https://docs.python.org/3/library/stdtypes.html#str)]
 | Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[RunContext[](#pydantic_ai.tools.RunContext "pydantic_ai._run_context.RunContext")[AgentDepsT[](#pydantic_ai.tools.AgentDepsT "pydantic_ai._run_context.AgentDepsT")]], Awaitable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Awaitable "collections.abc.Awaitable")[str[](https://docs.python.org/3/library/stdtypes.html#str)]]
 | Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[], str[](https://docs.python.org/3/library/stdtypes.html#str)]
 | Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[[], Awaitable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Awaitable "collections.abc.Awaitable")[str[](https://docs.python.org/3/library/stdtypes.html#str)]]
)
```
A function that may or maybe not take `RunContext` as an argument, and may or may not be async.
Usage `SystemPromptFunc[AgentDepsT]`.
### ToolFuncContext `module-attribute`
```
ToolFuncContext: TypeAlias[](https://docs.python.org/3/library/typing.html#typing.TypeAlias "typing.TypeAlias") = Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[
 Concatenate[](https://docs.python.org/3/library/typing.html#typing.Concatenate "typing.Concatenate")[RunContext[](#pydantic_ai.tools.RunContext "pydantic_ai._run_context.RunContext")[AgentDepsT[](#pydantic_ai.tools.AgentDepsT "pydantic_ai._run_context.AgentDepsT")], ToolParams[](#pydantic_ai.tools.ToolParams "pydantic_ai.tools.ToolParams")], Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")
]
```
A tool function that takes `RunContext` as the first argument.
Usage `ToolContextFunc[AgentDepsT, ToolParams]`.
### ToolFuncPlain `module-attribute`
```
ToolFuncPlain: TypeAlias[](https://docs.python.org/3/library/typing.html#typing.TypeAlias "typing.TypeAlias") = Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[ToolParams[](#pydantic_ai.tools.ToolParams "pydantic_ai.tools.ToolParams"), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
A tool function that does not take `RunContext` as the first argument.
Usage `ToolPlainFunc[ToolParams]`.
### ToolFuncEither `module-attribute`
```
ToolFuncEither: TypeAlias[](https://docs.python.org/3/library/typing.html#typing.TypeAlias "typing.TypeAlias") = (
 ToolFuncContext[](#pydantic_ai.tools.ToolFuncContext "pydantic_ai.tools.ToolFuncContext")[AgentDepsT[](#pydantic_ai.tools.AgentDepsT "pydantic_ai._run_context.AgentDepsT"), ToolParams[](#pydantic_ai.tools.ToolParams "pydantic_ai.tools.ToolParams")]
 | ToolFuncPlain[](#pydantic_ai.tools.ToolFuncPlain "pydantic_ai.tools.ToolFuncPlain")[ToolParams[](#pydantic_ai.tools.ToolParams "pydantic_ai.tools.ToolParams")]
)
```
Either kind of tool function.
This is just a union of [`ToolFuncContext`](#pydantic_ai.tools.ToolFuncContext) and [`ToolFuncPlain`](#pydantic_ai.tools.ToolFuncPlain).
Usage `ToolFuncEither[AgentDepsT, ToolParams]`.
### ToolPrepareFunc `module-attribute`
```
ToolPrepareFunc: TypeAlias[](https://docs.python.org/3/library/typing.html#typing.TypeAlias "typing.TypeAlias") = Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[
 [RunContext[](#pydantic_ai.tools.RunContext "pydantic_ai._run_context.RunContext")[AgentDepsT[](#pydantic_ai.tools.AgentDepsT "pydantic_ai._run_context.AgentDepsT")], "ToolDefinition"],
 Awaitable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Awaitable "collections.abc.Awaitable")["ToolDefinition | None"],
]
```
Definition of a function that can prepare a tool definition at call time.
See [tool docs](../../tools-advanced/#tool-prepare) for more information.
Example — here `only_if_42` is valid as a `ToolPrepareFunc`:
```
frompydantic_aiimport RunContext, Tool
frompydantic_ai.toolsimport ToolDefinition
async defonly_if_42(
 ctx: RunContext[int], tool_def: ToolDefinition
) -> ToolDefinition | None:
 if ctx.deps == 42:
 return tool_def
defhitchhiker(ctx: RunContext[int], answer: str) -> str:
 return f'{ctx.deps}{answer}'
hitchhiker = Tool(hitchhiker, prepare=only_if_42)
```
Usage `ToolPrepareFunc[AgentDepsT]`.
### ToolsPrepareFunc `module-attribute`
```
ToolsPrepareFunc: TypeAlias[](https://docs.python.org/3/library/typing.html#typing.TypeAlias "typing.TypeAlias") = Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[
 [RunContext[](#pydantic_ai.tools.RunContext "pydantic_ai._run_context.RunContext")[AgentDepsT[](#pydantic_ai.tools.AgentDepsT "pydantic_ai._run_context.AgentDepsT")], list[](https://docs.python.org/3/library/stdtypes.html#list)["ToolDefinition"]],
 Awaitable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Awaitable "collections.abc.Awaitable")["list[ToolDefinition] | None"],
]
```
Definition of a function that can prepare the tool definition of all tools for each step. This is useful if you want to customize the definition of multiple tools or you want to register a subset of tools for a given step.
Example — here `turn_on_strict_if_openai` is valid as a `ToolsPrepareFunc`:
```
fromdataclassesimport replace
frompydantic_aiimport Agent, RunContext
frompydantic_ai.toolsimport ToolDefinition
async defturn_on_strict_if_openai(
 ctx: RunContext[None], tool_defs: list[ToolDefinition]
) -> list[ToolDefinition] | None:
 if ctx.model.system == 'openai':
 return [replace(tool_def, strict=True) for tool_def in tool_defs]
 return tool_defs
agent = Agent('openai:gpt-4o', prepare_tools=turn_on_strict_if_openai)
```
Usage `ToolsPrepareFunc[AgentDepsT]`.
### DocstringFormat `module-attribute`
```
DocstringFormat: TypeAlias[](https://docs.python.org/3/library/typing.html#typing.TypeAlias "typing.TypeAlias") = Literal[](https://docs.python.org/3/library/typing.html#typing.Literal "typing.Literal")[
 "google", "numpy", "sphinx", "auto"
]
```
Supported docstring formats.
 * `'google'` — [Google-style](https://google.github.io/styleguide/pyguide.html#381-docstrings) docstrings.
 * `'numpy'` — [Numpy-style](https://numpydoc.readthedocs.io/en/latest/format.html) docstrings.
 * `'sphinx'` — [Sphinx-style](https://sphinx-rtd-tutorial.readthedocs.io/en/latest/docstrings.html#the-sphinx-docstring-format) docstrings.
 * `'auto'` — Automatically infer the format based on the structure of the docstring.
### DeferredToolRequests `dataclass`
Tool calls that require approval or external execution.
This can be used as an agent's `output_type` and will be used as the output of the agent run if the model called any deferred tools.
Results can be passed to the next agent run using a [`DeferredToolResults`](#pydantic_ai.tools.DeferredToolResults) object with the same tool call IDs.
See [deferred tools docs](../../deferred-tools/#deferred-tools) for more information.
Source code in `pydantic_ai_slim/pydantic_ai/tools.py`
```
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
```
| ```
@dataclass(kw_only=True)
classDeferredToolRequests:
"""Tool calls that require approval or external execution.
 This can be used as an agent's `output_type` and will be used as the output of the agent run if the model called any deferred tools.
 Results can be passed to the next agent run using a [`DeferredToolResults`][pydantic_ai.tools.DeferredToolResults] object with the same tool call IDs.
 See [deferred tools docs](../deferred-tools.md#deferred-tools) for more information.
 """
 calls: list[ToolCallPart] = field(default_factory=list)
"""Tool calls that require external execution."""
 approvals: list[ToolCallPart] = field(default_factory=list)
"""Tool calls that require human-in-the-loop approval."""
```
---|--- 
#### calls `class-attribute` `instance-attribute`
```
calls: list[](https://docs.python.org/3/library/stdtypes.html#list)[ToolCallPart[](../messages/#pydantic_ai.messages.ToolCallPart "pydantic_ai.messages.ToolCallPart")] = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(default_factory=list[](https://docs.python.org/3/library/stdtypes.html#list))
```
Tool calls that require external execution.
#### approvals `class-attribute` `instance-attribute`
```
approvals: list[](https://docs.python.org/3/library/stdtypes.html#list)[ToolCallPart[](../messages/#pydantic_ai.messages.ToolCallPart "pydantic_ai.messages.ToolCallPart")] = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(default_factory=list[](https://docs.python.org/3/library/stdtypes.html#list))
```
Tool calls that require human-in-the-loop approval.
### ToolApproved `dataclass`
Indicates that a tool call has been approved and that the tool function should be executed.
Source code in `pydantic_ai_slim/pydantic_ai/tools.py`
```
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
@dataclass(kw_only=True)
classToolApproved:
"""Indicates that a tool call has been approved and that the tool function should be executed."""
 override_args: dict[str, Any] | None = None
"""Optional tool call arguments to use instead of the original arguments."""
 kind: Literal['tool-approved'] = 'tool-approved'
```
---|--- 
#### override_args `class-attribute` `instance-attribute`
```
override_args: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = None
```
Optional tool call arguments to use instead of the original arguments.
### ToolDenied `dataclass`
Indicates that a tool call has been denied and that a denial message should be returned to the model.
Source code in `pydantic_ai_slim/pydantic_ai/tools.py`
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
```
| ```
@dataclass
classToolDenied:
"""Indicates that a tool call has been denied and that a denial message should be returned to the model."""
 message: str = 'The tool call was denied.'
"""The message to return to the model."""
 _: KW_ONLY
 kind: Literal['tool-denied'] = 'tool-denied'
```
---|--- 
#### message `class-attribute` `instance-attribute`
```
message: str[](https://docs.python.org/3/library/stdtypes.html#str) = 'The tool call was denied.'
```
The message to return to the model.
### DeferredToolResults `dataclass`
Results for deferred tool calls from a previous run that required approval or external execution.
The tool call IDs need to match those from the [`DeferredToolRequests`](../output/#pydantic_ai.output.DeferredToolRequests) output object from the previous run.
See [deferred tools docs](../../deferred-tools/#deferred-tools) for more information.
Source code in `pydantic_ai_slim/pydantic_ai/tools.py`
```
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
```
| ```
@dataclass(kw_only=True)
classDeferredToolResults:
"""Results for deferred tool calls from a previous run that required approval or external execution.
 The tool call IDs need to match those from the [`DeferredToolRequests`][pydantic_ai.output.DeferredToolRequests] output object from the previous run.
 See [deferred tools docs](../deferred-tools.md#deferred-tools) for more information.
 """
 calls: dict[str, DeferredToolCallResult | Any] = field(default_factory=dict)
"""Map of tool call IDs to results for tool calls that required external execution."""
 approvals: dict[str, bool | DeferredToolApprovalResult] = field(default_factory=dict)
"""Map of tool call IDs to results for tool calls that required human-in-the-loop approval."""
```
---|--- 
#### calls `class-attribute` `instance-attribute`
```
calls: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), DeferredToolCallResult | Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(
 default_factory=dict[](https://docs.python.org/3/library/stdtypes.html#dict)
)
```
Map of tool call IDs to results for tool calls that required external execution.
#### approvals `class-attribute` `instance-attribute`
```
approvals: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), bool[](https://docs.python.org/3/library/functions.html#bool) | DeferredToolApprovalResult] = (
 field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(default_factory=dict[](https://docs.python.org/3/library/stdtypes.html#dict))
)
```
Map of tool call IDs to results for tool calls that required human-in-the-loop approval.
### Tool `dataclass`
Bases: `Generic[](https://docs.python.org/3/library/typing.html#typing.Generic "typing.Generic")[AgentDepsT[](#pydantic_ai.tools.AgentDepsT "pydantic_ai._run_context.AgentDepsT")]`
A tool function for an agent.
Source code in `pydantic_ai_slim/pydantic_ai/tools.py`
```
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
```
| ```
@dataclass(init=False)
classTool(Generic[AgentDepsT]):
"""A tool function for an agent."""
 function: ToolFuncEither[AgentDepsT]
 takes_ctx: bool
 max_retries: int | None
 name: str
 description: str | None
 prepare: ToolPrepareFunc[AgentDepsT] | None
 docstring_format: DocstringFormat
 require_parameter_descriptions: bool
 strict: bool | None
 sequential: bool
 requires_approval: bool
 metadata: dict[str, Any] | None
 function_schema: _function_schema.FunctionSchema
"""
 The base JSON schema for the tool's parameters.
 This schema may be modified by the `prepare` function or by the Model class prior to including it in an API request.
 """
 def__init__(
 self,
 function: ToolFuncEither[AgentDepsT],
 *,
 takes_ctx: bool | None = None,
 max_retries: int | None = None,
 name: str | None = None,
 description: str | None = None,
 prepare: ToolPrepareFunc[AgentDepsT] | None = None,
 docstring_format: DocstringFormat = 'auto',
 require_parameter_descriptions: bool = False,
 schema_generator: type[GenerateJsonSchema] = GenerateToolJsonSchema,
 strict: bool | None = None,
 sequential: bool = False,
 requires_approval: bool = False,
 metadata: dict[str, Any] | None = None,
 function_schema: _function_schema.FunctionSchema | None = None,
 ):
"""Create a new tool instance.
 Example usage:
 ```python {noqa="I001"}
 from pydantic_ai import Agent, RunContext, Tool
 async def my_tool(ctx: RunContext[int], x: int, y: int) -> str:
 return f'{ctx.deps} {x} {y}'
 agent = Agent('test', tools=[Tool(my_tool)])
 ```
 or with a custom prepare method:
 ```python {noqa="I001"}
 from pydantic_ai import Agent, RunContext, Tool
 from pydantic_ai.tools import ToolDefinition
 async def my_tool(ctx: RunContext[int], x: int, y: int) -> str:
 return f'{ctx.deps} {x} {y}'
 async def prep_my_tool(
 ctx: RunContext[int], tool_def: ToolDefinition
 ) -> ToolDefinition | None:
 # only register the tool if `deps == 42`
 if ctx.deps == 42:
 return tool_def
 agent = Agent('test', tools=[Tool(my_tool, prepare=prep_my_tool)])
 ```
 Args:
 function: The Python function to call as the tool.
 takes_ctx: Whether the function takes a [`RunContext`][pydantic_ai.tools.RunContext] first argument,
 this is inferred if unset.
 max_retries: Maximum number of retries allowed for this tool, set to the agent default if `None`.
 name: Name of the tool, inferred from the function if `None`.
 description: Description of the tool, inferred from the function if `None`.
 prepare: custom method to prepare the tool definition for each step, return `None` to omit this
 tool from a given step. This is useful if you want to customise a tool at call time,
 or omit it completely from a step. See [`ToolPrepareFunc`][pydantic_ai.tools.ToolPrepareFunc].
 docstring_format: The format of the docstring, see [`DocstringFormat`][pydantic_ai.tools.DocstringFormat].
 Defaults to `'auto'`, such that the format is inferred from the structure of the docstring.
 require_parameter_descriptions: If True, raise an error if a parameter description is missing. Defaults to False.
 schema_generator: The JSON schema generator class to use. Defaults to `GenerateToolJsonSchema`.
 strict: Whether to enforce JSON schema compliance (only affects OpenAI).
 See [`ToolDefinition`][pydantic_ai.tools.ToolDefinition] for more info.
 sequential: Whether the function requires a sequential/serial execution environment. Defaults to False.
 requires_approval: Whether this tool requires human-in-the-loop approval. Defaults to False.
 See the [tools documentation](../deferred-tools.md#human-in-the-loop-tool-approval) for more info.
 metadata: Optional metadata for the tool. This is not sent to the model but can be used for filtering and tool behavior customization.
 function_schema: The function schema to use for the tool. If not provided, it will be generated.
 """
 self.function = function
 self.function_schema = function_schema or _function_schema.function_schema(
 function,
 schema_generator,
 takes_ctx=takes_ctx,
 docstring_format=docstring_format,
 require_parameter_descriptions=require_parameter_descriptions,
 )
 self.takes_ctx = self.function_schema.takes_ctx
 self.max_retries = max_retries
 self.name = name or function.__name__
 self.description = description or self.function_schema.description
 self.prepare = prepare
 self.docstring_format = docstring_format
 self.require_parameter_descriptions = require_parameter_descriptions
 self.strict = strict
 self.sequential = sequential
 self.requires_approval = requires_approval
 self.metadata = metadata
 @classmethod
 deffrom_schema(
 cls,
 function: Callable[..., Any],
 name: str,
 description: str | None,
 json_schema: JsonSchemaValue,
 takes_ctx: bool = False,
 sequential: bool = False,
 ) -> Self:
"""Creates a Pydantic tool from a function and a JSON schema.
 Args:
 function: The function to call.
 This will be called with keywords only, and no validation of
 the arguments will be performed.
 name: The unique name of the tool that clearly communicates its purpose
 description: Used to tell the model how/when/why to use the tool.
 You can provide few-shot examples as a part of the description.
 json_schema: The schema for the function arguments
 takes_ctx: An optional boolean parameter indicating whether the function
 accepts the context object as an argument.
 sequential: Whether the function requires a sequential/serial execution environment. Defaults to False.
 Returns:
 A Pydantic tool that calls the function
 """
 function_schema = _function_schema.FunctionSchema(
 function=function,
 description=description,
 validator=SchemaValidator(schema=core_schema.any_schema()),
 json_schema=json_schema,
 takes_ctx=takes_ctx,
 is_async=_utils.is_async_callable(function),
 )
 return cls(
 function,
 takes_ctx=takes_ctx,
 name=name,
 description=description,
 function_schema=function_schema,
 sequential=sequential,
 )
 @property
 deftool_def(self):
 return ToolDefinition(
 name=self.name,
 description=self.description,
 parameters_json_schema=self.function_schema.json_schema,
 strict=self.strict,
 sequential=self.sequential,
 metadata=self.metadata,
 )
 async defprepare_tool_def(self, ctx: RunContext[AgentDepsT]) -> ToolDefinition | None:
"""Get the tool definition.
 By default, this method creates a tool definition, then either returns it, or calls `self.prepare`
 if it's set.
 Returns:
 return a `ToolDefinition` or `None` if the tools should not be registered for this run.
 """
 base_tool_def = self.tool_def
 if self.requires_approval and not ctx.tool_call_approved:
 base_tool_def = replace(base_tool_def, kind='unapproved')
 if self.prepare is not None:
 return await self.prepare(ctx, base_tool_def)
 else:
 return base_tool_def
```
---|--- 
#### __init__
```
__init__(
 function: ToolFuncEither[](#pydantic_ai.tools.ToolFuncEither "pydantic_ai.tools.ToolFuncEither")[AgentDepsT[](#pydantic_ai.tools.AgentDepsT "pydantic_ai._run_context.AgentDepsT")],
 *,
 takes_ctx: bool[](https://docs.python.org/3/library/functions.html#bool) | None = None,
 max_retries: int[](https://docs.python.org/3/library/functions.html#int) | None = None,
 name: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 description: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None,
 prepare: ToolPrepareFunc[](#pydantic_ai.tools.ToolPrepareFunc "pydantic_ai.tools.ToolPrepareFunc")[AgentDepsT[](#pydantic_ai.tools.AgentDepsT "pydantic_ai._run_context.AgentDepsT")] | None = None,
 docstring_format: DocstringFormat[](#pydantic_ai.tools.DocstringFormat "pydantic_ai.tools.DocstringFormat") = "auto",
 require_parameter_descriptions: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 schema_generator: type[](https://docs.python.org/3/library/functions.html#type)[
 GenerateJsonSchema[](https://docs.pydantic.dev/latest/api/json_schema/#pydantic.json_schema.GenerateJsonSchema "pydantic.json_schema.GenerateJsonSchema")
 ] = GenerateToolJsonSchema,
 strict: bool[](https://docs.python.org/3/library/functions.html#bool) | None = None,
 sequential: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 requires_approval: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 metadata: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = None,
 function_schema: FunctionSchema | None = None
)
```
Create a new tool instance.
Example usage:
```
frompydantic_aiimport Agent, RunContext, Tool
async defmy_tool(ctx: RunContext[int], x: int, y: int) -> str:
 return f'{ctx.deps}{x}{y}'
agent = Agent('test', tools=[Tool(my_tool)])
```
or with a custom prepare method:
```
frompydantic_aiimport Agent, RunContext, Tool
frompydantic_ai.toolsimport ToolDefinition
async defmy_tool(ctx: RunContext[int], x: int, y: int) -> str:
 return f'{ctx.deps}{x}{y}'
async defprep_my_tool(
 ctx: RunContext[int], tool_def: ToolDefinition
) -> ToolDefinition | None:
 # only register the tool if `deps == 42`
 if ctx.deps == 42:
 return tool_def
agent = Agent('test', tools=[Tool(my_tool, prepare=prep_my_tool)])
```
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`function` | `ToolFuncEither[](#pydantic_ai.tools.ToolFuncEither "pydantic_ai.tools.ToolFuncEither")[AgentDepsT[](#pydantic_ai.tools.AgentDepsT "pydantic_ai._run_context.AgentDepsT")]` | The Python function to call as the tool. | _required_ 
`takes_ctx` | `bool[](https://docs.python.org/3/library/functions.html#bool) | None` | Whether the function takes a [`RunContext`](#pydantic_ai.tools.RunContext) first argument, this is inferred if unset. | `None` 
`max_retries` | `int[](https://docs.python.org/3/library/functions.html#int) | None` | Maximum number of retries allowed for this tool, set to the agent default if `None`. | `None` 
`name` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Name of the tool, inferred from the function if `None`. | `None` 
`description` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Description of the tool, inferred from the function if `None`. | `None` 
`prepare` | `ToolPrepareFunc[](#pydantic_ai.tools.ToolPrepareFunc "pydantic_ai.tools.ToolPrepareFunc")[AgentDepsT[](#pydantic_ai.tools.AgentDepsT "pydantic_ai._run_context.AgentDepsT")] | None` | custom method to prepare the tool definition for each step, return `None` to omit this tool from a given step. This is useful if you want to customise a tool at call time, or omit it completely from a step. See [`ToolPrepareFunc`](#pydantic_ai.tools.ToolPrepareFunc). | `None` 
`docstring_format` | `DocstringFormat[](#pydantic_ai.tools.DocstringFormat "pydantic_ai.tools.DocstringFormat")` | The format of the docstring, see [`DocstringFormat`](#pydantic_ai.tools.DocstringFormat). Defaults to `'auto'`, such that the format is inferred from the structure of the docstring. | `'auto'` 
`require_parameter_descriptions` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | If True, raise an error if a parameter description is missing. Defaults to False. | `False` 
`schema_generator` | `type[](https://docs.python.org/3/library/functions.html#type)[GenerateJsonSchema[](https://docs.pydantic.dev/latest/api/json_schema/#pydantic.json_schema.GenerateJsonSchema "pydantic.json_schema.GenerateJsonSchema")]` | The JSON schema generator class to use. Defaults to `GenerateToolJsonSchema`. | `GenerateToolJsonSchema` 
`strict` | `bool[](https://docs.python.org/3/library/functions.html#bool) | None` | Whether to enforce JSON schema compliance (only affects OpenAI). See [`ToolDefinition`](#pydantic_ai.tools.ToolDefinition) for more info. | `None` 
`sequential` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether the function requires a sequential/serial execution environment. Defaults to False. | `False` 
`requires_approval` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether this tool requires human-in-the-loop approval. Defaults to False. See the [tools documentation](../../deferred-tools/#human-in-the-loop-tool-approval) for more info. | `False` 
`metadata` | `dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None` | Optional metadata for the tool. This is not sent to the model but can be used for filtering and tool behavior customization. | `None` 
`function_schema` | `FunctionSchema | None` | The function schema to use for the tool. If not provided, it will be generated. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/tools.py`
```
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
```
| ```
def__init__(
 self,
 function: ToolFuncEither[AgentDepsT],
 *,
 takes_ctx: bool | None = None,
 max_retries: int | None = None,
 name: str | None = None,
 description: str | None = None,
 prepare: ToolPrepareFunc[AgentDepsT] | None = None,
 docstring_format: DocstringFormat = 'auto',
 require_parameter_descriptions: bool = False,
 schema_generator: type[GenerateJsonSchema] = GenerateToolJsonSchema,
 strict: bool | None = None,
 sequential: bool = False,
 requires_approval: bool = False,
 metadata: dict[str, Any] | None = None,
 function_schema: _function_schema.FunctionSchema | None = None,
):
"""Create a new tool instance.
 Example usage:
```python {noqa="I001"}
 from pydantic_ai import Agent, RunContext, Tool
 async def my_tool(ctx: RunContext[int], x: int, y: int) -> str:
 return f'{ctx.deps} {x} {y}'
 agent = Agent('test', tools=[Tool(my_tool)])
```
 or with a custom prepare method:
```python {noqa="I001"}
 from pydantic_ai import Agent, RunContext, Tool
 from pydantic_ai.tools import ToolDefinition
 async def my_tool(ctx: RunContext[int], x: int, y: int) -> str:
 return f'{ctx.deps} {x} {y}'
 async def prep_my_tool(
 ctx: RunContext[int], tool_def: ToolDefinition
 ) -> ToolDefinition | None:
 # only register the tool if `deps == 42`
 if ctx.deps == 42:
 return tool_def
 agent = Agent('test', tools=[Tool(my_tool, prepare=prep_my_tool)])
```
 Args:
 function: The Python function to call as the tool.
 takes_ctx: Whether the function takes a [`RunContext`][pydantic_ai.tools.RunContext] first argument,
 this is inferred if unset.
 max_retries: Maximum number of retries allowed for this tool, set to the agent default if `None`.
 name: Name of the tool, inferred from the function if `None`.
 description: Description of the tool, inferred from the function if `None`.
 prepare: custom method to prepare the tool definition for each step, return `None` to omit this
 tool from a given step. This is useful if you want to customise a tool at call time,
 or omit it completely from a step. See [`ToolPrepareFunc`][pydantic_ai.tools.ToolPrepareFunc].
 docstring_format: The format of the docstring, see [`DocstringFormat`][pydantic_ai.tools.DocstringFormat].
 Defaults to `'auto'`, such that the format is inferred from the structure of the docstring.
 require_parameter_descriptions: If True, raise an error if a parameter description is missing. Defaults to False.
 schema_generator: The JSON schema generator class to use. Defaults to `GenerateToolJsonSchema`.
 strict: Whether to enforce JSON schema compliance (only affects OpenAI).
 See [`ToolDefinition`][pydantic_ai.tools.ToolDefinition] for more info.
 sequential: Whether the function requires a sequential/serial execution environment. Defaults to False.
 requires_approval: Whether this tool requires human-in-the-loop approval. Defaults to False.
 See the [tools documentation](../deferred-tools.md#human-in-the-loop-tool-approval) for more info.
 metadata: Optional metadata for the tool. This is not sent to the model but can be used for filtering and tool behavior customization.
 function_schema: The function schema to use for the tool. If not provided, it will be generated.
 """
 self.function = function
 self.function_schema = function_schema or _function_schema.function_schema(
 function,
 schema_generator,
 takes_ctx=takes_ctx,
 docstring_format=docstring_format,
 require_parameter_descriptions=require_parameter_descriptions,
 )
 self.takes_ctx = self.function_schema.takes_ctx
 self.max_retries = max_retries
 self.name = name or function.__name__
 self.description = description or self.function_schema.description
 self.prepare = prepare
 self.docstring_format = docstring_format
 self.require_parameter_descriptions = require_parameter_descriptions
 self.strict = strict
 self.sequential = sequential
 self.requires_approval = requires_approval
 self.metadata = metadata
```
---|--- 
#### function_schema `instance-attribute`
```
function_schema: FunctionSchema = (
 function_schema
 or function_schema(
 function,
 schema_generator,
 takes_ctx=takes_ctx,
 docstring_format=docstring_format,
 require_parameter_descriptions=require_parameter_descriptions,
 )
)
```
The base JSON schema for the tool's parameters.
This schema may be modified by the `prepare` function or by the Model class prior to including it in an API request.
#### from_schema `classmethod`
```
from_schema(
 function: Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[..., Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")],
 name: str[](https://docs.python.org/3/library/stdtypes.html#str),
 description: str[](https://docs.python.org/3/library/stdtypes.html#str) | None,
 json_schema: JsonSchemaValue[](https://docs.pydantic.dev/latest/api/json_schema/#pydantic.json_schema.JsonSchemaValue "pydantic.json_schema.JsonSchemaValue"),
 takes_ctx: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
 sequential: bool[](https://docs.python.org/3/library/functions.html#bool) = False,
) -> Self[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Self "typing_extensions.Self")
```
Creates a Pydantic tool from a function and a JSON schema.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`function` | `Callable[](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable "collections.abc.Callable")[..., Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]` | The function to call. This will be called with keywords only, and no validation of the arguments will be performed. | _required_ 
`name` | `str[](https://docs.python.org/3/library/stdtypes.html#str)` | The unique name of the tool that clearly communicates its purpose | _required_ 
`description` | `str[](https://docs.python.org/3/library/stdtypes.html#str) | None` | Used to tell the model how/when/why to use the tool. You can provide few-shot examples as a part of the description. | _required_ 
`json_schema` | `JsonSchemaValue[](https://docs.pydantic.dev/latest/api/json_schema/#pydantic.json_schema.JsonSchemaValue "pydantic.json_schema.JsonSchemaValue")` | The schema for the function arguments | _required_ 
`takes_ctx` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | An optional boolean parameter indicating whether the function accepts the context object as an argument. | `False` 
`sequential` | `bool[](https://docs.python.org/3/library/functions.html#bool)` | Whether the function requires a sequential/serial execution environment. Defaults to False. | `False` 
Returns:
Type | Description 
---|--- 
`Self[](https://typing-extensions.readthedocs.io/en/latest/index.html#typing_extensions.Self "typing_extensions.Self")` | A Pydantic tool that calls the function 
Source code in `pydantic_ai_slim/pydantic_ai/tools.py`
```
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
```
| ```
@classmethod
deffrom_schema(
 cls,
 function: Callable[..., Any],
 name: str,
 description: str | None,
 json_schema: JsonSchemaValue,
 takes_ctx: bool = False,
 sequential: bool = False,
) -> Self:
"""Creates a Pydantic tool from a function and a JSON schema.
 Args:
 function: The function to call.
 This will be called with keywords only, and no validation of
 the arguments will be performed.
 name: The unique name of the tool that clearly communicates its purpose
 description: Used to tell the model how/when/why to use the tool.
 You can provide few-shot examples as a part of the description.
 json_schema: The schema for the function arguments
 takes_ctx: An optional boolean parameter indicating whether the function
 accepts the context object as an argument.
 sequential: Whether the function requires a sequential/serial execution environment. Defaults to False.
 Returns:
 A Pydantic tool that calls the function
 """
 function_schema = _function_schema.FunctionSchema(
 function=function,
 description=description,
 validator=SchemaValidator(schema=core_schema.any_schema()),
 json_schema=json_schema,
 takes_ctx=takes_ctx,
 is_async=_utils.is_async_callable(function),
 )
 return cls(
 function,
 takes_ctx=takes_ctx,
 name=name,
 description=description,
 function_schema=function_schema,
 sequential=sequential,
 )
```
---|--- 
#### prepare_tool_def `async`
```
prepare_tool_def(
 ctx: RunContext[](#pydantic_ai.tools.RunContext "pydantic_ai._run_context.RunContext")[AgentDepsT[](#pydantic_ai.tools.AgentDepsT "pydantic_ai._run_context.AgentDepsT")],
) -> ToolDefinition[](#pydantic_ai.tools.ToolDefinition "pydantic_ai.tools.ToolDefinition") | None
```
Get the tool definition.
By default, this method creates a tool definition, then either returns it, or calls `self.prepare` if it's set.
Returns:
Type | Description 
---|--- 
`ToolDefinition[](#pydantic_ai.tools.ToolDefinition "pydantic_ai.tools.ToolDefinition") | None` | return a `ToolDefinition` or `None` if the tools should not be registered for this run. 
Source code in `pydantic_ai_slim/pydantic_ai/tools.py`
```
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
async defprepare_tool_def(self, ctx: RunContext[AgentDepsT]) -> ToolDefinition | None:
"""Get the tool definition.
 By default, this method creates a tool definition, then either returns it, or calls `self.prepare`
 if it's set.
 Returns:
 return a `ToolDefinition` or `None` if the tools should not be registered for this run.
 """
 base_tool_def = self.tool_def
 if self.requires_approval and not ctx.tool_call_approved:
 base_tool_def = replace(base_tool_def, kind='unapproved')
 if self.prepare is not None:
 return await self.prepare(ctx, base_tool_def)
 else:
 return base_tool_def
```
---|--- 
### ObjectJsonSchema `module-attribute`
```
ObjectJsonSchema: TypeAlias[](https://docs.python.org/3/library/typing.html#typing.TypeAlias "typing.TypeAlias") = dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")]
```
Type representing JSON schema of an object, e.g. where `"type": "object"`.
This type is used to define tools parameters (aka arguments) in [ToolDefinition](#pydantic_ai.tools.ToolDefinition).
With PEP-728 this should be a TypedDict with `type: Literal['object']`, and `extra_parts=Any`
### ToolDefinition `dataclass`
Definition of a tool passed to a model.
This is used for both function tools and output tools.
Source code in `pydantic_ai_slim/pydantic_ai/tools.py`
```
448
449
450
451
452
453
454
455
456
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
478
479
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
504
505
506
507
508
509
510
```
| ```
@dataclass(repr=False, kw_only=True)
classToolDefinition:
"""Definition of a tool passed to a model.
 This is used for both function tools and output tools.
 """
 name: str
"""The name of the tool."""
 parameters_json_schema: ObjectJsonSchema = field(default_factory=lambda: {'type': 'object', 'properties': {}})
"""The JSON schema for the tool's parameters."""
 description: str | None = None
"""The description of the tool."""
 outer_typed_dict_key: str | None = None
"""The key in the outer [TypedDict] that wraps an output tool.
 This will only be set for output tools which don't have an `object` JSON schema.
 """
 strict: bool | None = None
"""Whether to enforce (vendor-specific) strict JSON schema validation for tool calls.
 Setting this to `True` while using a supported model generally imposes some restrictions on the tool's JSON schema
 in exchange for guaranteeing the API responses strictly match that schema.
 When `False`, the model may be free to generate other properties or types (depending on the vendor).
 When `None` (the default), the value will be inferred based on the compatibility of the parameters_json_schema.
 Note: this is currently only supported by OpenAI models.
 """
 sequential: bool = False
"""Whether this tool requires a sequential/serial execution environment."""
 kind: ToolKind = field(default='function')
"""The kind of tool:
 - `'function'`: a tool that will be executed by Pydantic AI during an agent run and has its result returned to the model
 - `'output'`: a tool that passes through an output value that ends the run
 - `'external'`: a tool whose result will be produced outside of the Pydantic AI agent run in which it was called, because it depends on an upstream service (or user) or could take longer to generate than it's reasonable to keep the agent process running.
 See the [tools documentation](../deferred-tools.md#deferred-tools) for more info.
 - `'unapproved'`: a tool that requires human-in-the-loop approval.
 See the [tools documentation](../deferred-tools.md#human-in-the-loop-tool-approval) for more info.
 """
 metadata: dict[str, Any] | None = None
"""Tool metadata that can be set by the toolset this tool came from. It is not sent to the model, but can be used for filtering and tool behavior customization.
 For MCP tools, this contains the `meta`, `annotations`, and `output_schema` fields from the tool definition.
 """
 @property
 defdefer(self) -> bool:
"""Whether calls to this tool will be deferred.
 See the [tools documentation](../deferred-tools.md#deferred-tools) for more info.
 """
 return self.kind in ('external', 'unapproved')
 __repr__ = _utils.dataclasses_no_defaults_repr
```
---|--- 
#### name `instance-attribute`
```
name: str[](https://docs.python.org/3/library/stdtypes.html#str)
```
The name of the tool.
#### parameters_json_schema `class-attribute` `instance-attribute`
```
parameters_json_schema: ObjectJsonSchema[](#pydantic_ai.tools.ObjectJsonSchema "pydantic_ai.tools.ObjectJsonSchema") = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(
 default_factory=lambda: {
 "type": "object",
 "properties": {},
 }
)
```
The JSON schema for the tool's parameters.
#### description `class-attribute` `instance-attribute`
```
description: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The description of the tool.
#### outer_typed_dict_key `class-attribute` `instance-attribute`
```
outer_typed_dict_key: str[](https://docs.python.org/3/library/stdtypes.html#str) | None = None
```
The key in the outer [TypedDict] that wraps an output tool.
This will only be set for output tools which don't have an `object` JSON schema.
#### strict `class-attribute` `instance-attribute`
```
strict: bool[](https://docs.python.org/3/library/functions.html#bool) | None = None
```
Whether to enforce (vendor-specific) strict JSON schema validation for tool calls.
Setting this to `True` while using a supported model generally imposes some restrictions on the tool's JSON schema in exchange for guaranteeing the API responses strictly match that schema.
When `False`, the model may be free to generate other properties or types (depending on the vendor). When `None` (the default), the value will be inferred based on the compatibility of the parameters_json_schema.
Note: this is currently only supported by OpenAI models.
#### sequential `class-attribute` `instance-attribute`
```
sequential: bool[](https://docs.python.org/3/library/functions.html#bool) = False
```
Whether this tool requires a sequential/serial execution environment.
#### kind `class-attribute` `instance-attribute`
```
kind: ToolKind = field[](https://docs.python.org/3/library/dataclasses.html#dataclasses.field "dataclasses.field")(default='function')
```
The kind of tool:
 * `'function'`: a tool that will be executed by Pydantic AI during an agent run and has its result returned to the model
 * `'output'`: a tool that passes through an output value that ends the run
 * `'external'`: a tool whose result will be produced outside of the Pydantic AI agent run in which it was called, because it depends on an upstream service (or user) or could take longer to generate than it's reasonable to keep the agent process running. See the [tools documentation](../../deferred-tools/#deferred-tools) for more info.
 * `'unapproved'`: a tool that requires human-in-the-loop approval. See the [tools documentation](../../deferred-tools/#human-in-the-loop-tool-approval) for more info.
#### metadata `class-attribute` `instance-attribute`
```
metadata: dict[](https://docs.python.org/3/library/stdtypes.html#dict)[str[](https://docs.python.org/3/library/stdtypes.html#str), Any[](https://docs.python.org/3/library/typing.html#typing.Any "typing.Any")] | None = None
```
Tool metadata that can be set by the toolset this tool came from. It is not sent to the model, but can be used for filtering and tool behavior customization.
For MCP tools, this contains the `meta`, `annotations`, and `output_schema` fields from the tool definition.
#### defer `property`
```
defer: bool[](https://docs.python.org/3/library/functions.html#bool)
```
Whether calls to this tool will be deferred.
See the [tools documentation](../../deferred-tools/#deferred-tools) for more info.