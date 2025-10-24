[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Draft
Search...
⌘K
Search...
Navigation
Utilities
Pagination
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
 * [Completion](/specification/draft/server/utilities/completion)
 * [Logging](/specification/draft/server/utilities/logging)
 * [Pagination](/specification/draft/server/utilities/pagination)
 * [Schema Reference](/specification/draft/schema)
On this page
 * [Pagination Model](#pagination-model)
 * [Response Format](#response-format)
 * [Request Format](#request-format)
 * [Pagination Flow](#pagination-flow)
 * [Operations Supporting Pagination](#operations-supporting-pagination)
 * [Implementation Guidelines](#implementation-guidelines)
 * [Error Handling](#error-handling)
**Protocol Revision** : draft
The Model Context Protocol (MCP) supports paginating list operations that may return large result sets. Pagination allows servers to yield results in smaller chunks rather than all at once. Pagination is especially important when connecting to external services over the internet, but also useful for local integrations to avoid performance issues with large data sets.
## 
[​](#pagination-model)
Pagination Model
Pagination in MCP uses an opaque cursor-based approach, instead of numbered pages.
 * The **cursor** is an opaque string token, representing a position in the result set
 * **Page size** is determined by the server, and clients **MUST NOT** assume a fixed page size
## 
[​](#response-format)
Response Format
Pagination starts when the server sends a **response** that includes:
 * The current page of results
 * An optional `nextCursor` field if more results exist
Copy
```
{
 "jsonrpc": "2.0",
 "id": "123",
 "result": {
 "resources": [...],
 "nextCursor": "eyJwYWdlIjogM30="
 }
}
```
## 
[​](#request-format)
Request Format
After receiving a cursor, the client can _continue_ paginating by issuing a request including that cursor:
Copy
```
{
 "jsonrpc": "2.0",
 "id": "124",
 "method": "resources/list",
 "params": {
 "cursor": "eyJwYWdlIjogMn0="
 }
}
```
## 
[​](#pagination-flow)
Pagination Flow
## 
[​](#operations-supporting-pagination)
Operations Supporting Pagination
The following MCP operations support pagination:
 * `resources/list` - List available resources
 * `resources/templates/list` - List resource templates
 * `prompts/list` - List available prompts
 * `tools/list` - List available tools
## 
[​](#implementation-guidelines)
Implementation Guidelines
 1. Servers **SHOULD** :
 * Provide stable cursors
 * Handle invalid cursors gracefully
 2. Clients **SHOULD** :
 * Treat a missing `nextCursor` as the end of results
 * Support both paginated and non-paginated flows
 3. Clients **MUST** treat cursors as opaque tokens:
 * Don’t make assumptions about cursor format
 * Don’t attempt to parse or modify cursors
 * Don’t persist cursors across sessions
## 
[​](#error-handling)
Error Handling
Invalid cursors **SHOULD** result in an error with code -32602 (Invalid params).
Was this page helpful?
YesNo
[Logging](/specification/draft/server/utilities/logging)[Schema Reference](/specification/draft/schema)
⌘I