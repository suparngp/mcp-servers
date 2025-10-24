[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Version 2024-11-05
Search...
⌘K
Search...
Navigation
Utilities
Logging
[Documentation](/docs/getting-started/intro)[Specification](/specification/2025-06-18)[Community](/community/communication)[About MCP](/about)
 * [Specification](/specification/2024-11-05)
 * [Architecture](/specification/2024-11-05/architecture)
##### Base Protocol
 * [Overview](/specification/2024-11-05/basic)
 * [Lifecycle](/specification/2024-11-05/basic/lifecycle)
 * [Messages](/specification/2024-11-05/basic/messages)
 * [Transports](/specification/2024-11-05/basic/transports)
 * Utilities
##### Client Features
 * [Roots](/specification/2024-11-05/client/roots)
 * [Sampling](/specification/2024-11-05/client/sampling)
##### Server Features
 * [Overview](/specification/2024-11-05/server)
 * [Prompts](/specification/2024-11-05/server/prompts)
 * [Resources](/specification/2024-11-05/server/resources)
 * [Tools](/specification/2024-11-05/server/tools)
 * Utilities
 * [Completion](/specification/2024-11-05/server/utilities/completion)
 * [Logging](/specification/2024-11-05/server/utilities/logging)
 * [Pagination](/specification/2024-11-05/server/utilities/pagination)
On this page
 * [User Interaction Model](#user-interaction-model)
 * [Capabilities](#capabilities)
 * [Log Levels](#log-levels)
 * [Protocol Messages](#protocol-messages)
 * [Setting Log Level](#setting-log-level)
 * [Log Message Notifications](#log-message-notifications)
 * [Message Flow](#message-flow)
 * [Error Handling](#error-handling)
 * [Implementation Considerations](#implementation-considerations)
 * [Security](#security)
**Protocol Revision** : 2024-11-05
The Model Context Protocol (MCP) provides a standardized way for servers to send structured log messages to clients. Clients can control logging verbosity by setting minimum log levels, with servers sending notifications containing severity levels, optional logger names, and arbitrary JSON-serializable data.
## 
[​](#user-interaction-model)
User Interaction Model
Implementations are free to expose logging through any interface pattern that suits their needs—the protocol itself does not mandate any specific user interaction model.
## 
[​](#capabilities)
Capabilities
Servers that emit log message notifications **MUST** declare the `logging` capability:
Copy
```
{
 "capabilities": {
 "logging": {}
 }
}
```
## 
[​](#log-levels)
Log Levels
The protocol follows the standard syslog severity levels specified in [RFC 5424](https://datatracker.ietf.org/doc/html/rfc5424#section-6.2.1): Level | Description | Example Use Case 
---|---|--- 
debug | Detailed debugging information | Function entry/exit points 
info | General informational messages | Operation progress updates 
notice | Normal but significant events | Configuration changes 
warning | Warning conditions | Deprecated feature usage 
error | Error conditions | Operation failures 
critical | Critical conditions | System component failures 
alert | Action must be taken immediately | Data corruption detected 
emergency | System is unusable | Complete system failure 
## 
[​](#protocol-messages)
Protocol Messages
### 
[​](#setting-log-level)
Setting Log Level
To configure the minimum log level, clients **MAY** send a `logging/setLevel` request: **Request:**
Copy
```
{
 "jsonrpc": "2.0",
 "id": 1,
 "method": "logging/setLevel",
 "params": {
 "level": "info"
 }
}
```
### 
[​](#log-message-notifications)
Log Message Notifications
Servers send log messages using `notifications/message` notifications:
Copy
```
{
 "jsonrpc": "2.0",
 "method": "notifications/message",
 "params": {
 "level": "error",
 "logger": "database",
 "data": {
 "error": "Connection failed",
 "details": {
 "host": "localhost",
 "port": 5432
 }
 }
 }
}
```
## 
[​](#message-flow)
Message Flow
## 
[​](#error-handling)
Error Handling
Servers **SHOULD** return standard JSON-RPC errors for common failure cases:
 * Invalid log level: `-32602` (Invalid params)
 * Configuration errors: `-32603` (Internal error)
## 
[​](#implementation-considerations)
Implementation Considerations
 1. Servers **SHOULD** :
 * Rate limit log messages
 * Include relevant context in data field
 * Use consistent logger names
 * Remove sensitive information
 2. Clients **MAY** :
 * Present log messages in the UI
 * Implement log filtering/search
 * Display severity visually
 * Persist log messages
## 
[​](#security)
Security
 1. Log messages **MUST NOT** contain:
 * Credentials or secrets
 * Personal identifying information
 * Internal system details that could aid attacks
 2. Implementations **SHOULD** :
 * Rate limit messages
 * Validate all data fields
 * Control log access
 * Monitor for sensitive content
Was this page helpful?
YesNo
[Completion](/specification/2024-11-05/server/utilities/completion)[Pagination](/specification/2024-11-05/server/utilities/pagination)
⌘I