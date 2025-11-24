[ Skip to content ](#pydantic_aicommon_tools)
# `pydantic_ai.common_tools`
### duckduckgo_search_tool
```
duckduckgo_search_tool(
 duckduckgo_client: DDGS | None = None,
 max_results: int[](https://docs.python.org/3/library/functions.html#int) | None = None,
)
```
Creates a DuckDuckGo search tool.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`duckduckgo_client` | `DDGS | None` | The DuckDuckGo search client. | `None` 
`max_results` | `int[](https://docs.python.org/3/library/functions.html#int) | None` | The maximum number of results. If None, returns results only from the first response. | `None` 
Source code in `pydantic_ai_slim/pydantic_ai/common_tools/duckduckgo.py`
```
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
```
| ```
defduckduckgo_search_tool(duckduckgo_client: DDGS | None = None, max_results: int | None = None):
"""Creates a DuckDuckGo search tool.
 Args:
 duckduckgo_client: The DuckDuckGo search client.
 max_results: The maximum number of results. If None, returns results only from the first response.
 """
 return Tool[Any](
 DuckDuckGoSearchTool(client=duckduckgo_client or DDGS(), max_results=max_results).__call__,
 name='duckduckgo_search',
 description='Searches DuckDuckGo for the given query and returns the results.',
 )
```
---|--- 
### tavily_search_tool
```
tavily_search_tool(api_key: str[](https://docs.python.org/3/library/stdtypes.html#str))
```
Creates a Tavily search tool.
Parameters:
Name | Type | Description | Default 
---|---|---|--- 
`api_key` | `str[](https://docs.python.org/3/library/stdtypes.html#str)` | The Tavily API key. You can get one by signing up at <https://app.tavily.com/home>. | _required_ 
Source code in `pydantic_ai_slim/pydantic_ai/common_tools/tavily.py`
```
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
```
| ```
deftavily_search_tool(api_key: str):
"""Creates a Tavily search tool.
 Args:
 api_key: The Tavily API key.
 You can get one by signing up at [https://app.tavily.com/home](https://app.tavily.com/home).
 """
 return Tool[Any](
 TavilySearchTool(client=AsyncTavilyClient(api_key)).__call__,
 name='tavily_search',
 description='Searches Tavily for the given query and returns the results.',
 )
```
---|---