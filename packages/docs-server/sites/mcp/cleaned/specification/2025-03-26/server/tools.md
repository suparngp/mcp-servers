[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Version 2025-03-26
Search...
⌘K
Search...
Navigation
Server Features
Tools
[Documentation](/docs/getting-started/intro)[Specification](/specification/2025-06-18)[Community](/community/communication)[About MCP](/about)
 * [Specification](/specification/2025-03-26)
 * [Key Changes](/specification/2025-03-26/changelog)
 * [Architecture](/specification/2025-03-26/architecture)
##### Base Protocol
 * [Overview](/specification/2025-03-26/basic)
 * [Lifecycle](/specification/2025-03-26/basic/lifecycle)
 * [Transports](/specification/2025-03-26/basic/transports)
 * [Authorization](/specification/2025-03-26/basic/authorization)
 * Utilities
##### Client Features
 * [Roots](/specification/2025-03-26/client/roots)
 * [Sampling](/specification/2025-03-26/client/sampling)
##### Server Features
 * [Overview](/specification/2025-03-26/server)
 * [Prompts](/specification/2025-03-26/server/prompts)
 * [Resources](/specification/2025-03-26/server/resources)
 * [Tools](/specification/2025-03-26/server/tools)
 * Utilities
On this page
 * [User Interaction Model](#user-interaction-model)
 * [Capabilities](#capabilities)
 * [Protocol Messages](#protocol-messages)
 * [Listing Tools](#listing-tools)
 * [Calling Tools](#calling-tools)
 * [List Changed Notification](#list-changed-notification)
 * [Message Flow](#message-flow)
 * [Data Types](#data-types)
 * [Tool](#tool)
 * [Tool Result](#tool-result)
 * [Text Content](#text-content)
 * [Image Content](#image-content)
 * [Audio Content](#audio-content)
 * [Embedded Resources](#embedded-resources)
 * [Error Handling](#error-handling)
 * [Security Considerations](#security-considerations)
**Protocol Revision** : 2025-03-26
The Model Context Protocol (MCP) allows servers to expose tools that can be invoked by language models. Tools enable models to interact with external systems, such as querying databases, calling APIs, or performing computations. Each tool is uniquely identified by a name and includes metadata describing its schema.
## 
[​](#user-interaction-model)
User Interaction Model
Tools in MCP are designed to be **model-controlled** , meaning that the language model can discover and invoke tools automatically based on its contextual understanding and the user’s prompts. However, implementations are free to expose tools through any interface pattern that suits their needs—the protocol itself does not mandate any specific user interaction model.
For trust & safety and security, there **SHOULD** always be a human in the loop with the ability to deny tool invocations.Applications **SHOULD** :
 * Provide UI that makes clear which tools are being exposed to the AI model
 * Insert clear visual indicators when tools are invoked
 * Present confirmation prompts to the user for operations, to ensure a human is in the loop
## 
[​](#capabilities)
Capabilities
Servers that support tools **MUST** declare the `tools` capability:
Copy
```
{
 "capabilities": {
 "tools": {
 "listChanged": true
 }
 }
}
```
`listChanged` indicates whether the server will emit notifications when the list of available tools changes.
## 
[​](#protocol-messages)
Protocol Messages
### 
[​](#listing-tools)
Listing Tools
To discover available tools, clients send a `tools/list` request. This operation supports [pagination](/specification/2025-03-26/server/utilities/pagination). **Request:**
Copy
```
{
 "jsonrpc": "2.0",
 "id": 1,
 "method": "tools/list",
 "params": {
 "cursor": "optional-cursor-value"
 }
}
```
**Response:**
Copy
```
{
 "jsonrpc": "2.0",
 "id": 1,
 "result": {
 "tools": [
 {
 "name": "get_weather",
 "description": "Get current weather information for a location",
 "inputSchema": {
 "type": "object",
 "properties": {
 "location": {
 "type": "string",
 "description": "City name or zip code"
 }
 },
 "required": ["location"]
 }
 }
 ],
 "nextCursor": "next-page-cursor"
 }
}
```
### 
[​](#calling-tools)
Calling Tools
To invoke a tool, clients send a `tools/call` request: **Request:**
Copy
```
{
 "jsonrpc": "2.0",
 "id": 2,
 "method": "tools/call",
 "params": {
 "name": "get_weather",
 "arguments": {
 "location": "New York"
 }
 }
}
```
**Response:**
Copy
```
{
 "jsonrpc": "2.0",
 "id": 2,
 "result": {
 "content": [
 {
 "type": "text",
 "text": "Current weather in New York:\nTemperature: 72°F\nConditions: Partly cloudy"
 }
 ],
 "isError": false
 }
}
```
### 
[​](#list-changed-notification)
List Changed Notification
When the list of available tools changes, servers that declared the `listChanged` capability **SHOULD** send a notification:
Copy
```
{
 "jsonrpc": "2.0",
 "method": "notifications/tools/list_changed"
}
```
## 
[​](#message-flow)
Message Flow
## 
[​](#data-types)
Data Types
### 
[​](#tool)
Tool
A tool definition includes:
 * `name`: Unique identifier for the tool
 * `description`: Human-readable description of functionality
 * `inputSchema`: JSON Schema defining expected parameters
 * `annotations`: optional properties describing tool behavior
For trust & safety and security, clients **MUST** consider tool annotations to be untrusted unless they come from trusted servers.
### 
[​](#tool-result)
Tool Result
Tool results can contain multiple content items of different types:
#### 
[​](#text-content)
Text Content
Copy
```
{
 "type": "text",
 "text": "Tool result text"
}
```
#### 
[​](#image-content)
Image Content
Copy
```
{
 "type": "image",
 "data": "base64-encoded-data",
 "mimeType": "image/png"
}
```
#### 
[​](#audio-content)
Audio Content
Copy
```
{
 "type": "audio",
 "data": "base64-encoded-audio-data",
 "mimeType": "audio/wav"
}
```
#### 
[​](#embedded-resources)
Embedded Resources
[Resources](/specification/2025-03-26/server/resources) **MAY** be embedded, to provide additional context or data, behind a URI that can be subscribed to or fetched again by the client later:
Copy
```
{
 "type": "resource",
 "resource": {
 "uri": "resource://example",
 "mimeType": "text/plain",
 "text": "Resource content"
 }
}
```
## 
[​](#error-handling)
Error Handling
Tools use two error reporting mechanisms:
 1. **Protocol Errors** : Standard JSON-RPC errors for issues like:
 * Unknown tools
 * Invalid arguments
 * Server errors
 2. **Tool Execution Errors** : Reported in tool results with `isError: true`:
 * API failures
 * Invalid input data
 * Business logic errors
Example protocol error:
Copy
```
{
 "jsonrpc": "2.0",
 "id": 3,
 "error": {
 "code": -32602,
 "message": "Unknown tool: invalid_tool_name"
 }
}
```
Example tool execution error:
Copy
```
{
 "jsonrpc": "2.0",
 "id": 4,
 "result": {
 "content": [
 {
 "type": "text",
 "text": "Failed to fetch weather data: API rate limit exceeded"
 }
 ],
 "isError": true
 }
}
```
## 
[​](#security-considerations)
Security Considerations
 1. Servers **MUST** :
 * Validate all tool inputs
 * Implement proper access controls
 * Rate limit tool invocations
 * Sanitize tool outputs
 2. Clients **SHOULD** :
 * Prompt for user confirmation on sensitive operations
 * Show tool inputs to the user before calling the server, to avoid malicious or accidental data exfiltration
 * Validate tool results before passing to LLM
 * Implement timeouts for tool calls
 * Log tool usage for audit purposes
Was this page helpful?
YesNo
[Resources](/specification/2025-03-26/server/resources)[Completion](/specification/2025-03-26/server/utilities/completion)
⌘I