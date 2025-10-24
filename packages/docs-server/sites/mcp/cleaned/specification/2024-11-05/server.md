[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Version 2024-11-05
Search...
⌘K
Search...
Navigation
Server Features
Overview
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
**Protocol Revision** : 2024-11-05
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
## [Prompts](/specification/2024-11-05/server/prompts)## [Resources](/specification/2024-11-05/server/resources)## [Tools](/specification/2024-11-05/server/tools)
Was this page helpful?
YesNo
[Sampling](/specification/2024-11-05/client/sampling)[Prompts](/specification/2024-11-05/server/prompts)
⌘I