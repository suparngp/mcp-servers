[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Version 2025-06-18 (latest)
Search...
⌘K
Search...
Navigation
Key Changes
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
 * [Major changes](#major-changes)
 * [Other schema changes](#other-schema-changes)
 * [Full changelog](#full-changelog)
This document lists changes made to the Model Context Protocol (MCP) specification since the previous revision, [2025-03-26](/specification/2025-03-26).
## 
[​](#major-changes)
Major changes
 1. Remove support for JSON-RPC **[batching](https://www.jsonrpc.org/specification#batch)** (PR [#416](https://github.com/modelcontextprotocol/specification/pull/416))
 2. Add support for [structured tool output](/specification/2025-06-18/server/tools#structured-content) (PR [#371](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/371))
 3. Classify MCP servers as [OAuth Resource Servers](/specification/2025-06-18/basic/authorization#authorization-server-discovery), adding protected resource metadata to discover the corresponding Authorization server. (PR [#338](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/338))
 4. Require MCP clients to implement Resource Indicators as described in [RFC 8707](https://www.rfc-editor.org/rfc/rfc8707.html) to prevent malicious servers from obtaining access tokens. (PR [#734](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/734))
 5. Clarify [security considerations](/specification/2025-06-18/basic/authorization#security-considerations) and best practices in the authorization spec and in a new [security best practices page](/specification/2025-06-18/basic/security_best_practices).
 6. Add support for **[elicitation](/specification/2025-06-18/client/elicitation)** , enabling servers to request additional information from users during interactions. (PR [#382](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/382))
 7. Add support for **[resource links](/specification/2025-06-18/server/tools#resource-links)** in tool call results. (PR [#603](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/603))
 8. Require [negotiated protocol version to be specified](/specification/2025-06-18/basic/transports#protocol-version-header) via `MCP-Protocol-Version` header in subsequent requests when using HTTP (PR [#548](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/548)).
 9. Change **SHOULD** to **MUST** in [Lifecycle Operation](/specification/2025-06-18/basic/lifecycle#operation)
## 
[​](#other-schema-changes)
Other schema changes
 1. Add `_meta` field to additional interface types (PR [#710](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/710)), and specify [proper usage](/specification/2025-06-18/basic#meta).
 2. Add `context` field to `CompletionRequest`, providing for completion requests to include previously-resolved variables (PR [#598](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/598)).
 3. Add `title` field for human-friendly display names, so that `name` can be used as a programmatic identifier (PR [#663](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/663))
## 
[​](#full-changelog)
Full changelog
For a complete list of all changes that have been made since the last protocol revision, [see GitHub](https://github.com/modelcontextprotocol/specification/compare/2025-03-26...2025-06-18).
Was this page helpful?
YesNo
[Specification](/specification/2025-06-18)[Architecture](/specification/2025-06-18/architecture/index)
⌘I