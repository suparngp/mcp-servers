[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Draft
Search...
⌘K
Search...
Navigation
Server Features
Overview
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
**Protocol Revision** : draft
Servers provide the fundamental building blocks for adding context to language models via MCP. These primitives enable rich interactions between clients, servers, and language models:
 * **Prompts** : Pre-defined templates or instructions that guide language model interactions
 * **Resources** : Structured data or content that provides additional context to the model
 * **Tools** : Executable functions that allow models to perform actions or retrieve information
Each primitive can be summarized in the following control hierarchy: Primitive | Control | Description | Example 
---|---|---|--- 
Prompts | User-controlled | Interactive templates invoked by user choice | Slash commands, menu options 
Resources | Application-controlled | Contextual data attached and managed by the client | File contents, git history 
Tools | Model-controlled | Functions exposed to the LLM to take actions | API POST requests, file writing 
Explore these key primitives in more detail below:
## [Prompts](/specification/draft/server/prompts)## [Resources](/specification/draft/server/resources)## [Tools](/specification/draft/server/tools)
Was this page helpful?
YesNo
[Elicitation](/specification/draft/client/elicitation)[Prompts](/specification/draft/server/prompts)
⌘I