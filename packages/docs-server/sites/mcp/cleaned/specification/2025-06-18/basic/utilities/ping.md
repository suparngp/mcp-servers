[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Version 2025-06-18 (latest)
Search...
⌘K
Search...
Navigation
Utilities
Ping
[Documentation](/docs/getting-started/intro)[Specification](/specification/2025-06-18)[Community](/community/communication)[About MCP](/about)
 * [Specification](/specification/2025-06-18)
 * [Key Changes](/specification/2025-06-18/changelog)
 * [Architecture](/specification/2025-06-18/architecture)
##### Base Protocol
 * [Overview](/specification/2025-06-18/basic)
 * [Lifecycle](/specification/2025-06-18/basic/lifecycle)
 * [Transports](/specification/2025-06-18/basic/transports)
 * [Authorization](/specification/2025-06-18/basic/authorization)
 * [Security Best Practices](/specification/2025-06-18/basic/security_best_practices)
 * Utilities
 * [Cancellation](/specification/2025-06-18/basic/utilities/cancellation)
 * [Ping](/specification/2025-06-18/basic/utilities/ping)
 * [Progress](/specification/2025-06-18/basic/utilities/progress)
##### Client Features
 * [Roots](/specification/2025-06-18/client/roots)
 * [Sampling](/specification/2025-06-18/client/sampling)
 * [Elicitation](/specification/2025-06-18/client/elicitation)
##### Server Features
 * [Overview](/specification/2025-06-18/server)
 * [Prompts](/specification/2025-06-18/server/prompts)
 * [Resources](/specification/2025-06-18/server/resources)
 * [Tools](/specification/2025-06-18/server/tools)
 * Utilities
 * [Schema Reference](/specification/2025-06-18/schema)
On this page
 * [Overview](#overview)
 * [Message Format](#message-format)
 * [Behavior Requirements](#behavior-requirements)
 * [Usage Patterns](#usage-patterns)
 * [Implementation Considerations](#implementation-considerations)
 * [Error Handling](#error-handling)
**Protocol Revision** : 2025-06-18
The Model Context Protocol includes an optional ping mechanism that allows either party to verify that their counterpart is still responsive and the connection is alive.
## 
[​](#overview)
Overview
The ping functionality is implemented through a simple request/response pattern. Either the client or server can initiate a ping by sending a `ping` request.
## 
[​](#message-format)
Message Format
A ping request is a standard JSON-RPC request with no parameters:
Copy
```
{
 "jsonrpc": "2.0",
 "id": "123",
 "method": "ping"
}
```
## 
[​](#behavior-requirements)
Behavior Requirements
 1. The receiver **MUST** respond promptly with an empty response:
Copy
```
{
 "jsonrpc": "2.0",
 "id": "123",
 "result": {}
}
```
 1. If no response is received within a reasonable timeout period, the sender **MAY** :
 * Consider the connection stale
 * Terminate the connection
 * Attempt reconnection procedures
## 
[​](#usage-patterns)
Usage Patterns
## 
[​](#implementation-considerations)
Implementation Considerations
 * Implementations **SHOULD** periodically issue pings to detect connection health
 * The frequency of pings **SHOULD** be configurable
 * Timeouts **SHOULD** be appropriate for the network environment
 * Excessive pinging **SHOULD** be avoided to reduce network overhead
## 
[​](#error-handling)
Error Handling
 * Timeouts **SHOULD** be treated as connection failures
 * Multiple failed pings **MAY** trigger connection reset
 * Implementations **SHOULD** log ping failures for diagnostics
Was this page helpful?
YesNo
[Cancellation](/specification/2025-06-18/basic/utilities/cancellation)[Progress](/specification/2025-06-18/basic/utilities/progress)
⌘I