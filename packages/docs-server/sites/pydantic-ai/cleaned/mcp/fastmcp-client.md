[ Skip to content ](#fastmcp-client)
# FastMCP Client
[FastMCP](https://gofastmcp.com/) is a higher-level MCP framework that bills itself as "The fast, Pythonic way to build MCP servers and clients." It supports additional capabilities on top of the MCP specification like [Tool Transformation](https://gofastmcp.com/patterns/tool-transformation), [OAuth](https://gofastmcp.com/clients/auth/oauth), and more.
As an alternative to Pydantic AI's standard [`MCPServer` MCP client](../client/) built on the [MCP SDK](https://github.com/modelcontextprotocol/python-sdk), you can use the [`FastMCPToolset`](../../api/toolsets/#pydantic_ai.toolsets.fastmcp.FastMCPToolset) [toolset](../../toolsets/) that leverages the [FastMCP Client](https://gofastmcp.com/clients/) to connect to local and remote MCP servers, whether or not they're built using [FastMCP Server](https://gofastmcp.com/servers/).
Note that it does not yet support integration elicitation or sampling, which are supported by the [standard `MCPServer` client](../client/).
## Install
To use the `FastMCPToolset`, you will need to install [`pydantic-ai-slim`](../../install/#slim-install) with the `fastmcp` optional group:
pipuv
```
pip"pydantic-ai-slim[fastmcp]"
```
```
uv"pydantic-ai-slim[fastmcp]"
```
## Usage
A `FastMCPToolset` can then be created from:
 * A FastMCP Server: `FastMCPToolset(fastmcp.FastMCP('my_server'))`
 * A FastMCP Client: `FastMCPToolset(fastmcp.Client(...))`
 * A FastMCP Transport: `FastMCPToolset(fastmcp.StdioTransport(command='uvx', args=['mcp-run-python', 'stdio']))`
 * A Streamable HTTP URL: `FastMCPToolset('http://localhost:8000/mcp')`
 * An HTTP SSE URL: `FastMCPToolset('http://localhost:8000/sse')`
 * A Python Script: `FastMCPToolset('my_server.py')`
 * A Node.js Script: `FastMCPToolset('my_server.js')`
 * A JSON MCP Configuration: `FastMCPToolset({'mcpServers': {'my_server': {'command': 'uvx', 'args': ['mcp-run-python', 'stdio']}}})`
If you already have a [FastMCP Server](https://gofastmcp.com/servers) in the same codebase as your Pydantic AI agent, you can create a `FastMCPToolset` directly from it and save agent a network round trip:
```
fromfastmcpimport FastMCP
frompydantic_aiimport Agent
frompydantic_ai.toolsets.fastmcpimport FastMCPToolset
fastmcp_server = FastMCP('my_server')
@fastmcp_server.tool()
async defadd(a: int, b: int) -> int:
 return a + b
toolset = FastMCPToolset(fastmcp_server)
agent = Agent('openai:gpt-5', toolsets=[toolset])
async defmain():
 result = await agent.run('What is 7 plus 5?')
 print(result.output)
 #> The answer is 12.
```
_(This example is complete, it can be run "as is" — you'll need to add`asyncio.run(main())` to run `main`)_
Connecting your agent to a Streamable HTTP MCP Server is as simple as:
```
frompydantic_aiimport Agent
frompydantic_ai.toolsets.fastmcpimport FastMCPToolset
toolset = FastMCPToolset('http://localhost:8000/mcp')
agent = Agent('openai:gpt-5', toolsets=[toolset])
```
_(This example is complete, it can be run "as is" — you'll need to add`asyncio.run(main())` to run `main`)_
You can also create a `FastMCPToolset` from a JSON MCP Configuration:
```
frompydantic_aiimport Agent
frompydantic_ai.toolsets.fastmcpimport FastMCPToolset
mcp_config = {
 'mcpServers': {
 'time_mcp_server': {
 'command': 'uvx',
 'args': ['mcp-run-python', 'stdio']
 }
 }
}
toolset = FastMCPToolset(mcp_config)
agent = Agent('openai:gpt-5', toolsets=[toolset])
```
_(This example is complete, it can be run "as is" — you'll need to add`asyncio.run(main())` to run `main`)_