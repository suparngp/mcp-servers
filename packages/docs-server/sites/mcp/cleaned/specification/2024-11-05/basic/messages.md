[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Version 2024-11-05
Search...
⌘K
Search...
Navigation
Base Protocol
Messages
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
On this page
 * [Requests](#requests)
 * [Responses](#responses)
 * [Notifications](#notifications)
**Protocol Revision** : 2024-11-05
All messages in MCP **MUST** follow the [JSON-RPC 2.0](https://www.jsonrpc.org/specification) specification. The protocol defines three types of messages:
## 
[​](#requests)
Requests
Requests are sent from the client to the server or vice versa.
Copy
```
{
 jsonrpc: "2.0";
 id: string | number;
 method: string;
 params?: {
 [key: string]: unknown;
 };
}
```
 * Requests **MUST** include a string or integer ID.
 * Unlike base JSON-RPC, the ID **MUST NOT** be `null`.
 * The request ID **MUST NOT** have been previously used by the requestor within the same session.
## 
[​](#responses)
Responses
Responses are sent in reply to requests.
Copy
```
{
 jsonrpc: "2.0";
 id: string | number;
 result?: {
 [key: string]: unknown;
 }
 error?: {
 code: number;
 message: string;
 data?: unknown;
 }
}
```
 * Responses **MUST** include the same ID as the request they correspond to.
 * Either a `result` or an `error` **MUST** be set. A response **MUST NOT** set both.
 * Error codes **MUST** be integers.
## 
[​](#notifications)
Notifications
Notifications are sent from the client to the server or vice versa. They do not expect a response.
Copy
```
{
 jsonrpc: "2.0";
 method: string;
 params?: {
 [key: string]: unknown;
 };
}
```
 * Notifications **MUST NOT** include an ID.
Was this page helpful?
YesNo
[Lifecycle](/specification/2024-11-05/basic/lifecycle)[Transports](/specification/2024-11-05/basic/transports)
⌘I