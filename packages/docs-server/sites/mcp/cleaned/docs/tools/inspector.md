[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Search...
⌘K
Search...
Navigation
Developer tools
MCP Inspector
[Documentation](/docs/getting-started/intro)[Specification](/specification/2025-06-18)[Community](/community/communication)[About MCP](/about)
##### Get started
 * [What is MCP?](/docs/getting-started/intro)
##### About MCP
 * [Architecture](/docs/learn/architecture)
 * [Servers](/docs/learn/server-concepts)
 * [Clients](/docs/learn/client-concepts)
 * [Versioning](/specification/versioning)
##### Develop with MCP
 * [Connect to local MCP servers](/docs/develop/connect-local-servers)
 * [Connect to remote MCP Servers](/docs/develop/connect-remote-servers)
 * [Build an MCP server](/docs/develop/build-server)
 * [Build an MCP client](/docs/develop/build-client)
 * [SDKs](/docs/sdk)
 * Security
##### Developer tools
 * [MCP Inspector](/docs/tools/inspector)
On this page
 * [Getting started](#getting-started)
 * [Installation and basic usage](#installation-and-basic-usage)
 * [Inspecting servers from npm or PyPI](#inspecting-servers-from-npm-or-pypi)
 * [Inspecting locally developed servers](#inspecting-locally-developed-servers)
 * [Feature overview](#feature-overview)
 * [Server connection pane](#server-connection-pane)
 * [Resources tab](#resources-tab)
 * [Prompts tab](#prompts-tab)
 * [Tools tab](#tools-tab)
 * [Notifications pane](#notifications-pane)
 * [Best practices](#best-practices)
 * [Development workflow](#development-workflow)
 * [Next steps](#next-steps)
The [MCP Inspector](https://github.com/modelcontextprotocol/inspector) is an interactive developer tool for testing and debugging MCP servers. While the [Debugging Guide](/legacy/tools/debugging) covers the Inspector as part of the overall debugging toolkit, this document provides a detailed exploration of the Inspector’s features and capabilities.
## 
[​](#getting-started)
Getting started
### 
[​](#installation-and-basic-usage)
Installation and basic usage
The Inspector runs directly through `npx` without requiring installation:
Copy
```
npx @modelcontextprotocol/inspector <command>
```
Copy
```
npx @modelcontextprotocol/inspector <command> <arg1> <arg2>
```
#### 
[​](#inspecting-servers-from-npm-or-pypi)
Inspecting servers from npm or PyPI
A common way to start server packages from [npm](https://npmjs.com) or [PyPI](https://pypi.org).
 * npm package
 * PyPI package
Copy
```
npx -y @modelcontextprotocol/inspector npx <package-name> <args>
# For example
npx -y @modelcontextprotocol/inspector npx @modelcontextprotocol/server-filesystem /Users/username/Desktop
```
#### 
[​](#inspecting-locally-developed-servers)
Inspecting locally developed servers
To inspect servers locally developed or downloaded as a repository, the most common way is:
 * TypeScript
 * Python
Copy
```
npx @modelcontextprotocol/inspector node path/to/server/index.js args...
```
Please carefully read any attached README for the most accurate instructions.
## 
[​](#feature-overview)
Feature overview
![](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/mcp-inspector.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=83b12e2a457c96ef4ad17c7357236290)
The MCP Inspector interface
The Inspector provides several features for interacting with your MCP server:
### 
[​](#server-connection-pane)
Server connection pane
 * Allows selecting the [transport](/legacy/concepts/transports) for connecting to the server
 * For local servers, supports customizing the command-line arguments and environment
### 
[​](#resources-tab)
Resources tab
 * Lists all available resources
 * Shows resource metadata (MIME types, descriptions)
 * Allows resource content inspection
 * Supports subscription testing
### 
[​](#prompts-tab)
Prompts tab
 * Displays available prompt templates
 * Shows prompt arguments and descriptions
 * Enables prompt testing with custom arguments
 * Previews generated messages
### 
[​](#tools-tab)
Tools tab
 * Lists available tools
 * Shows tool schemas and descriptions
 * Enables tool testing with custom inputs
 * Displays tool execution results
### 
[​](#notifications-pane)
Notifications pane
 * Presents all logs recorded from the server
 * Shows notifications received from the server
## 
[​](#best-practices)
Best practices
### 
[​](#development-workflow)
Development workflow
 1. Start Development
 * Launch Inspector with your server
 * Verify basic connectivity
 * Check capability negotiation
 2. Iterative testing
 * Make server changes
 * Rebuild the server
 * Reconnect the Inspector
 * Test affected features
 * Monitor messages
 3. Test edge cases
 * Invalid inputs
 * Missing prompt arguments
 * Concurrent operations
 * Verify error handling and error responses
## 
[​](#next-steps)
Next steps
## [Inspector Repository Check out the MCP Inspector source code ](https://github.com/modelcontextprotocol/inspector)## [Debugging Guide Learn about broader debugging strategies ](/legacy/tools/debugging)
Was this page helpful?
YesNo
[Understanding Authorization in MCP](/docs/tutorials/security/authorization)
⌘I