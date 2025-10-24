[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Version 2025-03-26
Search...
⌘K
Search...
Navigation
Key Changes
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
On this page
 * [Major changes](#major-changes)
 * [Other schema changes](#other-schema-changes)
 * [Full changelog](#full-changelog)
This document lists changes made to the Model Context Protocol (MCP) specification since the previous revision, [2024-11-05](/specification/2024-11-05).
## 
[​](#major-changes)
Major changes
 1. Added a comprehensive **[authorization framework](/specification/2025-03-26/basic/authorization)** based on OAuth 2.1 (PR [#133](https://github.com/modelcontextprotocol/specification/pull/133))
 2. Replaced the previous HTTP+SSE transport with a more flexible **[Streamable HTTP transport](/specification/2025-03-26/basic/transports#streamable-http)** (PR [#206](https://github.com/modelcontextprotocol/specification/pull/206))
 3. Added support for JSON-RPC **[batching](https://www.jsonrpc.org/specification#batch)** (PR [#228](https://github.com/modelcontextprotocol/specification/pull/228))
 4. Added comprehensive **tool annotations** for better describing tool behavior, like whether it is read-only or destructive (PR [#185](https://github.com/modelcontextprotocol/specification/pull/185))
## 
[​](#other-schema-changes)
Other schema changes
 * Added `message` field to `ProgressNotification` to provide descriptive status updates
 * Added support for audio data, joining the existing text and image content types
 * Added `completions` capability to explicitly indicate support for argument autocompletion suggestions
See [the updated schema](https://github.com/modelcontextprotocol/specification/tree/main/schema/2025-03-26/schema.ts) for more details.
## 
[​](#full-changelog)
Full changelog
For a complete list of all changes that have been made since the last protocol revision, [see GitHub](https://github.com/modelcontextprotocol/specification/compare/2024-11-05...2025-03-26).
Was this page helpful?
YesNo
[Specification](/specification/2025-03-26)[Architecture](/specification/2025-03-26/architecture/index)
⌘I