[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Version 2024-11-05
Search...
⌘K
Search...
Navigation
Utilities
Progress
[Documentation](/docs/getting-started/intro)[Specification](/specification/2025-06-18)[Community](/community/communication)[About MCP](/about)
 * [Specification](/specification/2024-11-05)
 * [Architecture](/specification/2024-11-05/architecture)
##### Base Protocol
 * [Overview](/specification/2024-11-05/basic)
 * [Lifecycle](/specification/2024-11-05/basic/lifecycle)
 * [Messages](/specification/2024-11-05/basic/messages)
 * [Transports](/specification/2024-11-05/basic/transports)
 * Utilities
 * [Cancellation](/specification/2024-11-05/basic/utilities/cancellation)
 * [Ping](/specification/2024-11-05/basic/utilities/ping)
 * [Progress](/specification/2024-11-05/basic/utilities/progress)
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
 * [Progress Flow](#progress-flow)
 * [Behavior Requirements](#behavior-requirements)
 * [Implementation Notes](#implementation-notes)
**Protocol Revision** : 2024-11-05
The Model Context Protocol (MCP) supports optional progress tracking for long-running operations through notification messages. Either side can send progress notifications to provide updates about operation status.
## 
[​](#progress-flow)
Progress Flow
When a party wants to _receive_ progress updates for a request, it includes a `progressToken` in the request metadata.
 * Progress tokens **MUST** be a string or integer value
 * Progress tokens can be chosen by the sender using any means, but **MUST** be unique across all active requests.
Copy
```
{
 "jsonrpc": "2.0",
 "id": 1,
 "method": "some_method",
 "params": {
 "_meta": {
 "progressToken": "abc123"
 }
 }
}
```
The receiver **MAY** then send progress notifications containing:
 * The original progress token
 * The current progress value so far
 * An optional “total” value
Copy
```
{
 "jsonrpc": "2.0",
 "method": "notifications/progress",
 "params": {
 "progressToken": "abc123",
 "progress": 50,
 "total": 100
 }
}
```
 * The `progress` value **MUST** increase with each notification, even if the total is unknown.
 * The `progress` and the `total` values **MAY** be floating point.
## 
[​](#behavior-requirements)
Behavior Requirements
 1. Progress notifications **MUST** only reference tokens that:
 * Were provided in an active request
 * Are associated with an in-progress operation
 2. Receivers of progress requests **MAY** :
 * Choose not to send any progress notifications
 * Send notifications at whatever frequency they deem appropriate
 * Omit the total value if unknown
## 
[​](#implementation-notes)
Implementation Notes
 * Senders and receivers **SHOULD** track active progress tokens
 * Both parties **SHOULD** implement rate limiting to prevent flooding
 * Progress notifications **MUST** stop after completion
Was this page helpful?
YesNo
[Ping](/specification/2024-11-05/basic/utilities/ping)[Roots](/specification/2024-11-05/client/roots)
⌘I