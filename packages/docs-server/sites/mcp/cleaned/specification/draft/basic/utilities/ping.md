[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Draft
Search...
⌘K
Search...
Navigation
Utilities
Ping
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
 * [Cancellation](/specification/draft/basic/utilities/cancellation)
 * [Ping](/specification/draft/basic/utilities/ping)
 * [Progress](/specification/draft/basic/utilities/progress)
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
 * [Overview](#overview)
 * [Message Format](#message-format)
 * [Behavior Requirements](#behavior-requirements)
 * [Usage Patterns](#usage-patterns)
 * [Implementation Considerations](#implementation-considerations)
 * [Error Handling](#error-handling)
**Protocol Revision** : draft
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
[Cancellation](/specification/draft/basic/utilities/cancellation)[Progress](/specification/draft/basic/utilities/progress)
⌘I