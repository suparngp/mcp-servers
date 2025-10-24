[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Version 2025-03-26
Search...
⌘K
Search...
Navigation
Utilities
Completion
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
 * [Completion](/specification/2025-03-26/server/utilities/completion)
 * [Logging](/specification/2025-03-26/server/utilities/logging)
 * [Pagination](/specification/2025-03-26/server/utilities/pagination)
On this page
 * [User Interaction Model](#user-interaction-model)
 * [Capabilities](#capabilities)
 * [Protocol Messages](#protocol-messages)
 * [Requesting Completions](#requesting-completions)
 * [Reference Types](#reference-types)
 * [Completion Results](#completion-results)
 * [Message Flow](#message-flow)
 * [Data Types](#data-types)
 * [CompleteRequest](#completerequest)
 * [CompleteResult](#completeresult)
 * [Error Handling](#error-handling)
 * [Implementation Considerations](#implementation-considerations)
 * [Security](#security)
**Protocol Revision** : 2025-03-26
The Model Context Protocol (MCP) provides a standardized way for servers to offer argument autocompletion suggestions for prompts and resource URIs. This enables rich, IDE-like experiences where users receive contextual suggestions while entering argument values.
## 
[​](#user-interaction-model)
User Interaction Model
Completion in MCP is designed to support interactive user experiences similar to IDE code completion. For example, applications may show completion suggestions in a dropdown or popup menu as users type, with the ability to filter and select from available options. However, implementations are free to expose completion through any interface pattern that suits their needs—the protocol itself does not mandate any specific user interaction model.
## 
[​](#capabilities)
Capabilities
Servers that support completions **MUST** declare the `completions` capability:
Copy
```
{
 "capabilities": {
 "completions": {}
 }
}
```
## 
[​](#protocol-messages)
Protocol Messages
### 
[​](#requesting-completions)
Requesting Completions
To get completion suggestions, clients send a `completion/complete` request specifying what is being completed through a reference type: **Request:**
Copy
```
{
 "jsonrpc": "2.0",
 "id": 1,
 "method": "completion/complete",
 "params": {
 "ref": {
 "type": "ref/prompt",
 "name": "code_review"
 },
 "argument": {
 "name": "language",
 "value": "py"
 }
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
 "completion": {
 "values": ["python", "pytorch", "pyside"],
 "total": 10,
 "hasMore": true
 }
 }
}
```
### 
[​](#reference-types)
Reference Types
The protocol supports two types of completion references: Type | Description | Example 
---|---|--- 
`ref/prompt` | References a prompt by name | `{"type": "ref/prompt", "name": "code_review"}` 
`ref/resource` | References a resource URI | `{"type": "ref/resource", "uri": "file:///{path}"}` 
### 
[​](#completion-results)
Completion Results
Servers return an array of completion values ranked by relevance, with:
 * Maximum 100 items per response
 * Optional total number of available matches
 * Boolean indicating if additional results exist
## 
[​](#message-flow)
Message Flow
## 
[​](#data-types)
Data Types
### 
[​](#completerequest)
CompleteRequest
 * `ref`: A `PromptReference` or `ResourceReference`
 * `argument`: Object containing:
 * `name`: Argument name
 * `value`: Current value
### 
[​](#completeresult)
CompleteResult
 * `completion`: Object containing:
 * `values`: Array of suggestions (max 100)
 * `total`: Optional total matches
 * `hasMore`: Additional results flag
## 
[​](#error-handling)
Error Handling
Servers **SHOULD** return standard JSON-RPC errors for common failure cases:
 * Method not found: `-32601` (Capability not supported)
 * Invalid prompt name: `-32602` (Invalid params)
 * Missing required arguments: `-32602` (Invalid params)
 * Internal errors: `-32603` (Internal error)
## 
[​](#implementation-considerations)
Implementation Considerations
 1. Servers **SHOULD** :
 * Return suggestions sorted by relevance
 * Implement fuzzy matching where appropriate
 * Rate limit completion requests
 * Validate all inputs
 2. Clients **SHOULD** :
 * Debounce rapid completion requests
 * Cache completion results where appropriate
 * Handle missing or partial results gracefully
## 
[​](#security)
Security
Implementations **MUST** :
 * Validate all completion inputs
 * Implement appropriate rate limiting
 * Control access to sensitive suggestions
 * Prevent completion-based information disclosure
Was this page helpful?
YesNo
[Tools](/specification/2025-03-26/server/tools)[Logging](/specification/2025-03-26/server/utilities/logging)
⌘I