[ Skip to content ](#pydantic_aiext)
# `pydantic_ai.ext`
### tool_from_langchain
```
tool_from_langchain(langchain_tool: LangChainTool) -> Tool[](../tools/#pydantic_ai.tools.Tool "pydantic_ai.tools.Tool")
```
Creates a Pydantic AI tool proxy from a LangChain tool.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`langchain_tool` | `LangChainTool` | The LangChain tool to wrap. | _required_ 
Returns:
Type | Description 
---|--- 
`Tool[](../tools/#pydantic_ai.tools.Tool "pydantic_ai.tools.Tool")` | A Pydantic AI tool that corresponds to the LangChain tool. 
Source code in `pydantic_ai_slim/pydantic_ai/ext/langchain.py`
```
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
```
| ```
deftool_from_langchain(langchain_tool: LangChainTool) -> Tool:
"""Creates a Pydantic AI tool proxy from a LangChain tool.
 Args:
 langchain_tool: The LangChain tool to wrap.
 Returns:
 A Pydantic AI tool that corresponds to the LangChain tool.
 """
 function_name = langchain_tool.name
 function_description = langchain_tool.description
 inputs = langchain_tool.args.copy()
 required = sorted({name for name, detail in inputs.items() if 'default' not in detail})
 schema: JsonSchemaValue = langchain_tool.get_input_jsonschema()
 if 'additionalProperties' not in schema:
 schema['additionalProperties'] = False
 if required:
 schema['required'] = required
 defaults = {name: detail['default'] for name, detail in inputs.items() if 'default' in detail}
 # restructures the arguments to match langchain tool run
 defproxy(*args: Any, **kwargs: Any) -> str:
 assert not args, 'This should always be called with kwargs'
 kwargs = defaults | kwargs
 return langchain_tool.run(kwargs)
 return Tool.from_schema(
 function=proxy,
 name=function_name,
 description=function_description,
 json_schema=schema,
 )
```
---|--- 
### LangChainToolset
Bases: `FunctionToolset[](../toolsets/#pydantic_ai.toolsets.FunctionToolset "pydantic_ai.FunctionToolset")`
A toolset that wraps LangChain tools.
Source code in `pydantic_ai_slim/pydantic_ai/ext/langchain.py`
```
67
68
69
70
71
```
| ```
classLangChainToolset(FunctionToolset):
"""A toolset that wraps LangChain tools."""
 def__init__(self, tools: list[LangChainTool], *, id: str | None = None):
 super().__init__([tool_from_langchain(tool) for tool in tools], id=id)
```
---|--- 
### tool_from_aci
```
tool_from_aci(
 aci_function: str[](https://docs.python.org/3/library/stdtypes.html#str), linked_account_owner_id: str[](https://docs.python.org/3/library/stdtypes.html#str)
) -> Tool[](../tools/#pydantic_ai.tools.Tool "pydantic_ai.tools.Tool")
```
Creates a Pydantic AI tool proxy from an ACI.dev function.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`aci_function` | `str[](https://docs.python.org/3/library/stdtypes.html#str)` | The ACI.dev function to wrap. | _required_ 
`linked_account_owner_id` | `str[](https://docs.python.org/3/library/stdtypes.html#str)` | The ACI user ID to execute the function on behalf of. | _required_ 
Returns:
Type | Description 
---|--- 
`Tool[](../tools/#pydantic_ai.tools.Tool "pydantic_ai.tools.Tool")` | A Pydantic AI tool that corresponds to the ACI.dev tool. 
Source code in `pydantic_ai_slim/pydantic_ai/ext/aci.py`
```
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
```
| ```
deftool_from_aci(aci_function: str, linked_account_owner_id: str) -> Tool:
"""Creates a Pydantic AI tool proxy from an ACI.dev function.
 Args:
 aci_function: The ACI.dev function to wrap.
 linked_account_owner_id: The ACI user ID to execute the function on behalf of.
 Returns:
 A Pydantic AI tool that corresponds to the ACI.dev tool.
 """
 aci = ACI()
 function_definition = aci.functions.get_definition(aci_function)
 function_name = function_definition['function']['name']
 function_description = function_definition['function']['description']
 inputs = function_definition['function']['parameters']
 json_schema = {
 'additionalProperties': inputs.get('additionalProperties', False),
 'properties': inputs.get('properties', {}),
 'required': inputs.get('required', []),
 # Default to 'object' if not specified
 'type': inputs.get('type', 'object'),
 }
 # Clean the schema
 json_schema = _clean_schema(json_schema)
 defimplementation(*args: Any, **kwargs: Any) -> str:
 if args:
 raise TypeError('Positional arguments are not allowed')
 return aci.handle_function_call(
 function_name,
 kwargs,
 linked_account_owner_id=linked_account_owner_id,
 allowed_apps_only=True,
 )
 return Tool.from_schema(
 function=implementation,
 name=function_name,
 description=function_description,
 json_schema=json_schema,
 )
```
---|--- 
### ACIToolset
Bases: `FunctionToolset[](../toolsets/#pydantic_ai.toolsets.FunctionToolset "pydantic_ai.FunctionToolset")`
A toolset that wraps ACI.dev tools.
Source code in `pydantic_ai_slim/pydantic_ai/ext/aci.py`
```
70
71
72
73
74
75
76
```
| ```
classACIToolset(FunctionToolset):
"""A toolset that wraps ACI.dev tools."""
 def__init__(self, aci_functions: Sequence[str], linked_account_owner_id: str, *, id: str | None = None):
 super().__init__(
 [tool_from_aci(aci_function, linked_account_owner_id) for aci_function in aci_functions], id=id
 )
```
---|---