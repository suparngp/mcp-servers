[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Draft
Search...
⌘K
Search...
Navigation
Base Protocol
Lifecycle
[Documentation](/docs/getting-started/intro)[Specification](/specification/2025-06-18)[Community](/community/communication)[About MCP](/about)
 * [Specification](/specification/draft)
 * [Key Changes](/specification/draft/changelog)
 * [Architecture](/specification/draft/architecture)
##### Base Protocol
 * [Overview](/specification/draft/basic)
 * [Lifecycle](/specification/draft/basic/lifecycle)
 * [Transports](/specification/draft/basic/transports)
 * [Authorization](/specification/draft/basic/authorization)
 * [Security Best Practices](/specification/draft/basic/security_best_practices)
 * Utilities
##### Client Features
 * [Roots](/specification/draft/client/roots)
 * [Sampling](/specification/draft/client/sampling)
 * [Elicitation](/specification/draft/client/elicitation)
##### Server Features
 * [Overview](/specification/draft/server)
 * [Prompts](/specification/draft/server/prompts)
 * [Resources](/specification/draft/server/resources)
 * [Tools](/specification/draft/server/tools)
 * Utilities
 * [Schema Reference](/specification/draft/schema)
On this page
 * [Lifecycle Phases](#lifecycle-phases)
 * [Initialization](#initialization)
 * [Version Negotiation](#version-negotiation)
 * [Capability Negotiation](#capability-negotiation)
 * [Operation](#operation)
 * [Shutdown](#shutdown)
 * [stdio](#stdio)
 * [HTTP](#http)
 * [Timeouts](#timeouts)
 * [Error Handling](#error-handling)
**Protocol Revision** : draft
The Model Context Protocol (MCP) defines a rigorous lifecycle for client-server connections that ensures proper capability negotiation and state management.
 1. **Initialization** : Capability negotiation and protocol version agreement
 2. **Operation** : Normal protocol communication
 3. **Shutdown** : Graceful termination of the connection
## 
[​](#lifecycle-phases)
Lifecycle Phases
### 
[​](#initialization)
Initialization
The initialization phase **MUST** be the first interaction between client and server. During this phase, the client and server:
 * Establish protocol version compatibility
 * Exchange and negotiate capabilities
 * Share implementation details
The client **MUST** initiate this phase by sending an `initialize` request containing:
 * Protocol version supported
 * Client capabilities
 * Client implementation information
Copy
```
{
 "jsonrpc": "2.0",
 "id": 1,
 "method": "initialize",
 "params": {
 "protocolVersion": "2024-11-05",
 "capabilities": {
 "roots": {
 "listChanged": true
 },
 "sampling": {},
 "elicitation": {}
 },
 "clientInfo": {
 "name": "ExampleClient",
 "title": "Example Client Display Name",
 "version": "1.0.0",
 "icons": [
 {
 "src": "https://example.com/icon.png",
 "mimeType": "image/png",
 "sizes": ["48x48"]
 }
 ],
 "websiteUrl": "https://example.com"
 }
 }
}
```
The server **MUST** respond with its own capabilities and information:
Copy
```
{
 "jsonrpc": "2.0",
 "id": 1,
 "result": {
 "protocolVersion": "2024-11-05",
 "capabilities": {
 "logging": {},
 "prompts": {
 "listChanged": true
 },
 "resources": {
 "subscribe": true,
 "listChanged": true
 },
 "tools": {
 "listChanged": true
 }
 },
 "serverInfo": {
 "name": "ExampleServer",
 "title": "Example Server Display Name",
 "version": "1.0.0",
 "icons": [
 {
 "src": "https://example.com/server-icon.svg",
 "mimeType": "image/svg+xml",
 "sizes": ["any"]
 }
 ],
 "websiteUrl": "https://example.com/server"
 },
 "instructions": "Optional instructions for the client"
 }
}
```
After successful initialization, the client **MUST** send an `initialized` notification to indicate it is ready to begin normal operations:
Copy
```
{
 "jsonrpc": "2.0",
 "method": "notifications/initialized"
}
```
 * The client **SHOULD NOT** send requests other than [pings](/specification/draft/basic/utilities/ping) before the server has responded to the `initialize` request.
 * The server **SHOULD NOT** send requests other than [pings](/specification/draft/basic/utilities/ping) and [logging](/specification/draft/server/utilities/logging) before receiving the `initialized` notification.
#### 
[​](#version-negotiation)
Version Negotiation
In the `initialize` request, the client **MUST** send a protocol version it supports. This **SHOULD** be the _latest_ version supported by the client. If the server supports the requested protocol version, it **MUST** respond with the same version. Otherwise, the server **MUST** respond with another protocol version it supports. This **SHOULD** be the _latest_ version supported by the server. If the client does not support the version in the server’s response, it **SHOULD** disconnect.
If using HTTP, the client **MUST** include the `MCP-Protocol-Version: <protocol-version>` HTTP header on all subsequent requests to the MCP server. For details, see [the Protocol Version Header section in Transports](/specification/draft/basic/transports#protocol-version-header).
#### 
[​](#capability-negotiation)
Capability Negotiation
Client and server capabilities establish which optional protocol features will be available during the session. Key capabilities include: Category | Capability | Description 
---|---|--- 
Client | `roots` | Ability to provide filesystem [roots](/specification/draft/client/roots) 
Client | `sampling` | Support for LLM [sampling](/specification/draft/client/sampling) requests 
Client | `elicitation` | Support for server [elicitation](/specification/draft/client/elicitation) requests 
Client | `experimental` | Describes support for non-standard experimental features 
Server | `prompts` | Offers [prompt templates](/specification/draft/server/prompts) 
Server | `resources` | Provides readable [resources](/specification/draft/server/resources) 
Server | `tools` | Exposes callable [tools](/specification/draft/server/tools) 
Server | `logging` | Emits structured [log messages](/specification/draft/server/utilities/logging) 
Server | `completions` | Supports argument [autocompletion](/specification/draft/server/utilities/completion) 
Server | `experimental` | Describes support for non-standard experimental features 
Capability objects can describe sub-capabilities like:
 * `listChanged`: Support for list change notifications (for prompts, resources, and tools)
 * `subscribe`: Support for subscribing to individual items’ changes (resources only)
### 
[​](#operation)
Operation
During the operation phase, the client and server exchange messages according to the negotiated capabilities. Both parties **MUST** :
 * Respect the negotiated protocol version
 * Only use capabilities that were successfully negotiated
### 
[​](#shutdown)
Shutdown
During the shutdown phase, one side (usually the client) cleanly terminates the protocol connection. No specific shutdown messages are defined—instead, the underlying transport mechanism should be used to signal connection termination:
#### 
[​](#stdio)
stdio
For the stdio [transport](/specification/draft/basic/transports), the client **SHOULD** initiate shutdown by:
 1. First, closing the input stream to the child process (the server)
 2. Waiting for the server to exit, or sending `SIGTERM` if the server does not exit within a reasonable time
 3. Sending `SIGKILL` if the server does not exit within a reasonable time after `SIGTERM`
The server **MAY** initiate shutdown by closing its output stream to the client and exiting.
#### 
[​](#http)
HTTP
For HTTP [transports](/specification/draft/basic/transports), shutdown is indicated by closing the associated HTTP connection(s).
## 
[​](#timeouts)
Timeouts
Implementations **SHOULD** establish timeouts for all sent requests, to prevent hung connections and resource exhaustion. When the request has not received a success or error response within the timeout period, the sender **SHOULD** issue a [cancellation notification](/specification/draft/basic/utilities/cancellation) for that request and stop waiting for a response. SDKs and other middleware **SHOULD** allow these timeouts to be configured on a per-request basis. Implementations **MAY** choose to reset the timeout clock when receiving a [progress notification](/specification/draft/basic/utilities/progress) corresponding to the request, as this implies that work is actually happening. However, implementations **SHOULD** always enforce a maximum timeout, regardless of progress notifications, to limit the impact of a misbehaving client or server.
## 
[​](#error-handling)
Error Handling
Implementations **SHOULD** be prepared to handle these error cases:
 * Protocol version mismatch
 * Failure to negotiate required capabilities
 * Request [timeouts](#timeouts)
Example initialization error:
Copy
```
{
 "jsonrpc": "2.0",
 "id": 1,
 "error": {
 "code": -32602,
 "message": "Unsupported protocol version",
 "data": {
 "supported": ["2024-11-05"],
 "requested": "1.0.0"
 }
 }
}
```
Was this page helpful?
YesNo
[Overview](/specification/draft/basic)[Transports](/specification/draft/basic/transports)
⌘I