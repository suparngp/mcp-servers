[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Draft
Search...
⌘K
Search...
Navigation
Key Changes
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
 * [Major changes](#major-changes)
 * [Minor changes](#minor-changes)
 * [Other schema changes](#other-schema-changes)
 * [Full changelog](#full-changelog)
This document lists changes made to the Model Context Protocol (MCP) specification since the previous revision, [2025-06-18](/specification/2025-06-18).
## 
[​](#major-changes)
Major changes
 1. Enhance authorization server discovery with support for [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html). (PR [#797](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/797))
 2. Allow servers to expose icons as additional metadata for tools, resources, resource templates, and prompts ([SEP-973](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/973)).
 3. Enhance authorization flows with incremental scope consent via `WWW-Authenticate` ([SEP-835](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/835))
 4. Provide guidance on tool names ([SEP-986](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/1603))
## 
[​](#minor-changes)
Minor changes
 1. Clarify that servers must respond with HTTP 403 Forbidden for invalid Origin headers in Streamable HTTP transport. (PR [#1439](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/1439))
 2. Updated the [Security Best Practices guidance](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices).
## 
[​](#other-schema-changes)
Other schema changes
## 
[​](#full-changelog)
Full changelog
For a complete list of all changes that have been made since the last protocol revision, [see GitHub](https://github.com/modelcontextprotocol/specification/compare/2025-06-18...draft).
Was this page helpful?
YesNo
[Specification](/specification/draft)[Architecture](/specification/draft/architecture/index)
⌘I