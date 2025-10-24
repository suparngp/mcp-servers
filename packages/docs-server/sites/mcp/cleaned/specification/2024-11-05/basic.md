[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Version 2024-11-05
Search...
⌘K
Search...
Navigation
Base Protocol
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
On this page
 * [Protocol Layers](#protocol-layers)
 * [Auth](#auth)
 * [Schema](#schema)
**Protocol Revision** : 2024-11-05
All messages between MCP clients and servers **MUST** follow the [JSON-RPC 2.0](https://www.jsonrpc.org/specification) specification. The protocol defines three fundamental types of messages: Type | Description | Requirements 
---|---|--- 
`Requests` | Messages sent to initiate an operation | Must include unique ID and method name 
`Responses` | Messages sent in reply to requests | Must include same ID as request 
`Notifications` | One-way messages with no reply | Must not include an ID 
**Responses** are further sub-categorized as either **successful results** or **errors**. Results can follow any JSON object structure, while errors must include an error code and message at minimum.
## 
[​](#protocol-layers)
Protocol Layers
The Model Context Protocol consists of several key components that work together:
 * **Base Protocol** : Core JSON-RPC message types
 * **Lifecycle Management** : Connection initialization, capability negotiation, and session control
 * **Server Features** : Resources, prompts, and tools exposed by servers
 * **Client Features** : Sampling and root directory lists provided by clients
 * **Utilities** : Cross-cutting concerns like logging and argument completion
All implementations **MUST** support the base protocol and lifecycle management components. Other components **MAY** be implemented based on the specific needs of the application. These protocol layers establish clear separation of concerns while enabling rich interactions between clients and servers. The modular design allows implementations to support exactly the features they need. See the following pages for more details on the different components:
## [Lifecycle](/specification/2024-11-05/basic/lifecycle)## [Resources](/specification/2024-11-05/server/resources)## [Prompts](/specification/2024-11-05/server/prompts)## [Tools](/specification/2024-11-05/server/tools)## [Logging](/specification/2024-11-05/server/utilities/logging)## [Sampling](/specification/2024-11-05/client/sampling)
## 
[​](#auth)
Auth
Authentication and authorization are not currently part of the core MCP specification, but we are considering ways to introduce them in future. Join us in [GitHub Discussions](https://github.com/modelcontextprotocol/specification/discussions) to help shape the future of the protocol! Clients and servers **MAY** negotiate their own custom authentication and authorization strategies.
## 
[​](#schema)
Schema
The full specification of the protocol is defined as a [TypeScript schema](https://github.com/modelcontextprotocol/specification/tree/main/schema/2024-11-05/schema.ts). This is the source of truth for all protocol messages and structures. There is also a [JSON Schema](https://github.com/modelcontextprotocol/specification/tree/main/schema/2024-11-05/schema.json), which is automatically generated from the TypeScript source of truth, for use with various automated tooling.
Was this page helpful?
YesNo
[Architecture](/specification/2024-11-05/architecture/index)[Lifecycle](/specification/2024-11-05/basic/lifecycle)
⌘I