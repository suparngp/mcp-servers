[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Version 2025-06-18 (latest)
Search...
⌘K
Search...
Navigation
Utilities
Cancellation
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
 * [Cancellation Flow](#cancellation-flow)
 * [Behavior Requirements](#behavior-requirements)
 * [Timing Considerations](#timing-considerations)
 * [Implementation Notes](#implementation-notes)
 * [Error Handling](#error-handling)
**Protocol Revision** : 2025-06-18
The Model Context Protocol (MCP) supports optional cancellation of in-progress requests through notification messages. Either side can send a cancellation notification to indicate that a previously-issued request should be terminated.
## 
[​](#cancellation-flow)
Cancellation Flow
When a party wants to cancel an in-progress request, it sends a `notifications/cancelled` notification containing:
 * The ID of the request to cancel
 * An optional reason string that can be logged or displayed
Copy
```
{
 "jsonrpc": "2.0",
 "method": "notifications/cancelled",
 "params": {
 "requestId": "123",
 "reason": "User requested cancellation"
 }
}
```
## 
[​](#behavior-requirements)
Behavior Requirements
 1. Cancellation notifications **MUST** only reference requests that:
 * Were previously issued in the same direction
 * Are believed to still be in-progress
 2. The `initialize` request **MUST NOT** be cancelled by clients
 3. Receivers of cancellation notifications **SHOULD** :
 * Stop processing the cancelled request
 * Free associated resources
 * Not send a response for the cancelled request
 4. Receivers **MAY** ignore cancellation notifications if:
 * The referenced request is unknown
 * Processing has already completed
 * The request cannot be cancelled
 5. The sender of the cancellation notification **SHOULD** ignore any response to the request that arrives afterward
## 
[​](#timing-considerations)
Timing Considerations
Due to network latency, cancellation notifications may arrive after request processing has completed, and potentially after a response has already been sent. Both parties **MUST** handle these race conditions gracefully:
## 
[​](#implementation-notes)
Implementation Notes
 * Both parties **SHOULD** log cancellation reasons for debugging
 * Application UIs **SHOULD** indicate when cancellation is requested
## 
[​](#error-handling)
Error Handling
Invalid cancellation notifications **SHOULD** be ignored:
 * Unknown request IDs
 * Already completed requests
 * Malformed notifications
This maintains the “fire and forget” nature of notifications while allowing for race conditions in asynchronous communication.
Was this page helpful?
YesNo
[Security Best Practices](/specification/2025-06-18/basic/security_best_practices)[Ping](/specification/2025-06-18/basic/utilities/ping)
⌘I