[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Search...
⌘K
Search...
Navigation
About MCP
Versioning
[Documentation](/docs/getting-started/intro)[Specification](/specification/2025-06-18)[Community](/community/communication)[About MCP](/about)
##### Get started
 * [What is MCP?](/docs/getting-started/intro)
##### About MCP
 * [Architecture](/docs/learn/architecture)
 * [Servers](/docs/learn/server-concepts)
 * [Clients](/docs/learn/client-concepts)
 * [Versioning](/specification/versioning)
##### Develop with MCP
 * [Connect to local MCP servers](/docs/develop/connect-local-servers)
 * [Connect to remote MCP Servers](/docs/develop/connect-remote-servers)
 * [Build an MCP server](/docs/develop/build-server)
 * [Build an MCP client](/docs/develop/build-client)
 * [SDKs](/docs/sdk)
 * Security
##### Developer tools
 * [MCP Inspector](/docs/tools/inspector)
On this page
 * [Revisions](#revisions)
 * [Negotiation](#negotiation)
The Model Context Protocol uses string-based version identifiers following the format `YYYY-MM-DD`, to indicate the last date backwards incompatible changes were made.
The protocol version will _not_ be incremented when the protocol is updated, as long as the changes maintain backwards compatibility. This allows for incremental improvements while preserving interoperability.
## 
[​](#revisions)
Revisions
Revisions may be marked as:
 * **Draft** : in-progress specifications, not yet ready for consumption.
 * **Current** : the current protocol version, which is ready for use and may continue to receive backwards compatible changes.
 * **Final** : past, complete specifications that will not be changed.
The **current** protocol version is [**2025-06-18**](/specification/2025-06-18).
## 
[​](#negotiation)
Negotiation
Version negotiation happens during [initialization](/specification/2025-06-18/basic/lifecycle#initialization). Clients and servers **MAY** support multiple protocol versions simultaneously, but they **MUST** agree on a single version to use for the session. The protocol provides appropriate error handling if version negotiation fails, allowing clients to gracefully terminate connections when they cannot find a version compatible with the server.
Was this page helpful?
YesNo
[Clients](/docs/learn/client-concepts)[Connect to local MCP servers](/docs/develop/connect-local-servers)
⌘I