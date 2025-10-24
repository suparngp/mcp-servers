[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Version 2025-06-18 (latest)
Search...
⌘K
Search...
Navigation
Base Protocol
Overview
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
 * [Messages](#messages)
 * [Requests](#requests)
 * [Responses](#responses)
 * [Notifications](#notifications)
 * [Auth](#auth)
 * [Schema](#schema)
 * [General fields](#general-fields)
 * [_meta](#meta)
**Protocol Revision** : 2025-06-18
The Model Context Protocol consists of several key components that work together:
 * **Base Protocol** : Core JSON-RPC message types
 * **Lifecycle Management** : Connection initialization, capability negotiation, and session control
 * **Authorization** : Authentication and authorization framework for HTTP-based transports
 * **Server Features** : Resources, prompts, and tools exposed by servers
 * **Client Features** : Sampling and root directory lists provided by clients
 * **Utilities** : Cross-cutting concerns like logging and argument completion
All implementations **MUST** support the base protocol and lifecycle management components. Other components **MAY** be implemented based on the specific needs of the application. These protocol layers establish clear separation of concerns while enabling rich interactions between clients and servers. The modular design allows implementations to support exactly the features they need.
## 
[​](#messages)
Messages
All messages between MCP clients and servers **MUST** follow the [JSON-RPC 2.0](https://www.jsonrpc.org/specification) specification. The protocol defines these types of messages:
### 
[​](#requests)
Requests
Requests are sent from the client to the server or vice versa, to initiate an operation.
Copy
```
{
 jsonrpc: "2.0";
 id: string | number;
 method: string;
 params?: {
 [key: string]: unknown;
 };
}
```
 * Requests **MUST** include a string or integer ID.
 * Unlike base JSON-RPC, the ID **MUST NOT** be `null`.
 * The request ID **MUST NOT** have been previously used by the requestor within the same session.
### 
[​](#responses)
Responses
Responses are sent in reply to requests, containing the result or error of the operation.
Copy
```
{
 jsonrpc: "2.0";
 id: string | number;
 result?: {
 [key: string]: unknown;
 }
 error?: {
 code: number;
 message: string;
 data?: unknown;
 }
}
```
 * Responses **MUST** include the same ID as the request they correspond to.
 * **Responses** are further sub-categorized as either **successful results** or **errors**. Either a `result` or an `error` **MUST** be set. A response **MUST NOT** set both.
 * Results **MAY** follow any JSON object structure, while errors **MUST** include an error code and message at minimum.
 * Error codes **MUST** be integers.
### 
[​](#notifications)
Notifications
Notifications are sent from the client to the server or vice versa, as a one-way message. The receiver **MUST NOT** send a response.
Copy
```
{
 jsonrpc: "2.0";
 method: string;
 params?: {
 [key: string]: unknown;
 };
}
```
 * Notifications **MUST NOT** include an ID.
## 
[​](#auth)
Auth
MCP provides an [Authorization](/specification/2025-06-18/basic/authorization) framework for use with HTTP. Implementations using an HTTP-based transport **SHOULD** conform to this specification, whereas implementations using STDIO transport **SHOULD NOT** follow this specification, and instead retrieve credentials from the environment. Additionally, clients and servers **MAY** negotiate their own custom authentication and authorization strategies. For further discussions and contributions to the evolution of MCP’s auth mechanisms, join us in [GitHub Discussions](https://github.com/modelcontextprotocol/specification/discussions) to help shape the future of the protocol!
## 
[​](#schema)
Schema
The full specification of the protocol is defined as a [TypeScript schema](https://github.com/modelcontextprotocol/specification/blob/main/schema/2025-06-18/schema.ts). This is the source of truth for all protocol messages and structures. There is also a [JSON Schema](https://github.com/modelcontextprotocol/specification/blob/main/schema/2025-06-18/schema.json), which is automatically generated from the TypeScript source of truth, for use with various automated tooling.
### 
[​](#general-fields)
General fields
#### 
[​](#meta)
`_meta`
The `_meta` property/parameter is reserved by MCP to allow clients and servers to attach additional metadata to their interactions. Certain key names are reserved by MCP for protocol-level metadata, as specified below; implementations MUST NOT make assumptions about values at these keys. Additionally, definitions in the [schema](https://github.com/modelcontextprotocol/specification/blob/main/schema/2025-06-18/schema.ts) may reserve particular names for purpose-specific metadata, as declared in those definitions. **Key name format:** valid `_meta` key names have two segments: an optional **prefix** , and a **name**. **Prefix:**
 * If specified, MUST be a series of labels separated by dots (`.`), followed by a slash (`/`).
 * Labels MUST start with a letter and end with a letter or digit; interior characters can be letters, digits, or hyphens (`-`).
 * Any prefix beginning with zero or more valid labels, followed by `modelcontextprotocol` or `mcp`, followed by any valid label, is **reserved** for MCP use.
 * For example: `modelcontextprotocol.io/`, `mcp.dev/`, `api.modelcontextprotocol.org/`, and `tools.mcp.com/` are all reserved.
**Name:**
 * Unless empty, MUST begin and end with an alphanumeric character (`[a-z0-9A-Z]`).
 * MAY contain hyphens (`-`), underscores (`_`), dots (`.`), and alphanumerics in between.
Was this page helpful?
YesNo
[Architecture](/specification/2025-06-18/architecture/index)[Lifecycle](/specification/2025-06-18/basic/lifecycle)
⌘I