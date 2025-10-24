[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Version 2025-03-26
Search...
⌘K
Search...
Navigation
Server Features
Resources
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
 * [User Interaction Model](#user-interaction-model)
 * [Capabilities](#capabilities)
 * [Protocol Messages](#protocol-messages)
 * [Listing Resources](#listing-resources)
 * [Reading Resources](#reading-resources)
 * [Resource Templates](#resource-templates)
 * [List Changed Notification](#list-changed-notification)
 * [Subscriptions](#subscriptions)
 * [Message Flow](#message-flow)
 * [Data Types](#data-types)
 * [Resource](#resource)
 * [Resource Contents](#resource-contents)
 * [Text Content](#text-content)
 * [Binary Content](#binary-content)
 * [Common URI Schemes](#common-uri-schemes)
 * [https://](#https%3A%2F%2F)
 * [file://](#file%3A%2F%2F)
 * [git://](#git%3A%2F%2F)
 * [Error Handling](#error-handling)
 * [Security Considerations](#security-considerations)
**Protocol Revision** : 2025-03-26
The Model Context Protocol (MCP) provides a standardized way for servers to expose resources to clients. Resources allow servers to share data that provides context to language models, such as files, database schemas, or application-specific information. Each resource is uniquely identified by a [URI](https://datatracker.ietf.org/doc/html/rfc3986).
## 
[​](#user-interaction-model)
User Interaction Model
Resources in MCP are designed to be **application-driven** , with host applications determining how to incorporate context based on their needs. For example, applications could:
 * Expose resources through UI elements for explicit selection, in a tree or list view
 * Allow the user to search through and filter available resources
 * Implement automatic context inclusion, based on heuristics or the AI model’s selection
![Example of resource context picker](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/specification/2025-03-26/server/resource-picker.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=7f6d9a491a97e714b5d5fc74cb0c7132) However, implementations are free to expose resources through any interface pattern that suits their needs—the protocol itself does not mandate any specific user interaction model.
## 
[​](#capabilities)
Capabilities
Servers that support resources **MUST** declare the `resources` capability:
Copy
```
{
 "capabilities": {
 "resources": {
 "subscribe": true,
 "listChanged": true
 }
 }
}
```
The capability supports two optional features:
 * `subscribe`: whether the client can subscribe to be notified of changes to individual resources.
 * `listChanged`: whether the server will emit notifications when the list of available resources changes.
Both `subscribe` and `listChanged` are optional—servers can support neither, either, or both:
Copy
```
{
 "capabilities": {
 "resources": {} // Neither feature supported
 }
}
```
Copy
```
{
 "capabilities": {
 "resources": {
 "subscribe": true // Only subscriptions supported
 }
 }
}
```
Copy
```
{
 "capabilities": {
 "resources": {
 "listChanged": true // Only list change notifications supported
 }
 }
}
```
## 
[​](#protocol-messages)
Protocol Messages
### 
[​](#listing-resources)
Listing Resources
To discover available resources, clients send a `resources/list` request. This operation supports [pagination](/specification/2025-03-26/server/utilities/pagination). **Request:**
Copy
```
{
 "jsonrpc": "2.0",
 "id": 1,
 "method": "resources/list",
 "params": {
 "cursor": "optional-cursor-value"
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
 "resources": [
 {
 "uri": "file:///project/src/main.rs",
 "name": "main.rs",
 "description": "Primary application entry point",
 "mimeType": "text/x-rust"
 }
 ],
 "nextCursor": "next-page-cursor"
 }
}
```
### 
[​](#reading-resources)
Reading Resources
To retrieve resource contents, clients send a `resources/read` request: **Request:**
Copy
```
{
 "jsonrpc": "2.0",
 "id": 2,
 "method": "resources/read",
 "params": {
 "uri": "file:///project/src/main.rs"
 }
}
```
**Response:**
Copy
```
{
 "jsonrpc": "2.0",
 "id": 2,
 "result": {
 "contents": [
 {
 "uri": "file:///project/src/main.rs",
 "mimeType": "text/x-rust",
 "text": "fn main() {\n println!(\"Hello world!\");\n}"
 }
 ]
 }
}
```
### 
[​](#resource-templates)
Resource Templates
Resource templates allow servers to expose parameterized resources using [URI templates](https://datatracker.ietf.org/doc/html/rfc6570). Arguments may be auto-completed through [the completion API](/specification/2025-03-26/server/utilities/completion). **Request:**
Copy
```
{
 "jsonrpc": "2.0",
 "id": 3,
 "method": "resources/templates/list"
}
```
**Response:**
Copy
```
{
 "jsonrpc": "2.0",
 "id": 3,
 "result": {
 "resourceTemplates": [
 {
 "uriTemplate": "file:///{path}",
 "name": "Project Files",
 "description": "Access files in the project directory",
 "mimeType": "application/octet-stream"
 }
 ]
 }
}
```
### 
[​](#list-changed-notification)
List Changed Notification
When the list of available resources changes, servers that declared the `listChanged` capability **SHOULD** send a notification:
Copy
```
{
 "jsonrpc": "2.0",
 "method": "notifications/resources/list_changed"
}
```
### 
[​](#subscriptions)
Subscriptions
The protocol supports optional subscriptions to resource changes. Clients can subscribe to specific resources and receive notifications when they change: **Subscribe Request:**
Copy
```
{
 "jsonrpc": "2.0",
 "id": 4,
 "method": "resources/subscribe",
 "params": {
 "uri": "file:///project/src/main.rs"
 }
}
```
**Update Notification:**
Copy
```
{
 "jsonrpc": "2.0",
 "method": "notifications/resources/updated",
 "params": {
 "uri": "file:///project/src/main.rs"
 }
}
```
## 
[​](#message-flow)
Message Flow
## 
[​](#data-types)
Data Types
### 
[​](#resource)
Resource
A resource definition includes:
 * `uri`: Unique identifier for the resource
 * `name`: Human-readable name
 * `description`: Optional description
 * `mimeType`: Optional MIME type
 * `size`: Optional size in bytes
### 
[​](#resource-contents)
Resource Contents
Resources can contain either text or binary data:
#### 
[​](#text-content)
Text Content
Copy
```
{
 "uri": "file:///example.txt",
 "mimeType": "text/plain",
 "text": "Resource content"
}
```
#### 
[​](#binary-content)
Binary Content
Copy
```
{
 "uri": "file:///example.png",
 "mimeType": "image/png",
 "blob": "base64-encoded-data"
}
```
## 
[​](#common-uri-schemes)
Common URI Schemes
The protocol defines several standard URI schemes. This list not exhaustive—implementations are always free to use additional, custom URI schemes.
### 
[​](#https%3A%2F%2F)
https://
Used to represent a resource available on the web. Servers **SHOULD** use this scheme only when the client is able to fetch and load the resource directly from the web on its own—that is, it doesn’t need to read the resource via the MCP server. For other use cases, servers **SHOULD** prefer to use another URI scheme, or define a custom one, even if the server will itself be downloading resource contents over the internet.
### 
[​](#file%3A%2F%2F)
file://
Used to identify resources that behave like a filesystem. However, the resources do not need to map to an actual physical filesystem. MCP servers **MAY** identify file:// resources with an [XDG MIME type](https://specifications.freedesktop.org/shared-mime-info-spec/0.14/ar01s02.html#id-1.3.14), like `inode/directory`, to represent non-regular files (such as directories) that don’t otherwise have a standard MIME type.
### 
[​](#git%3A%2F%2F)
git://
Git version control integration.
## 
[​](#error-handling)
Error Handling
Servers **SHOULD** return standard JSON-RPC errors for common failure cases:
 * Resource not found: `-32002`
 * Internal errors: `-32603`
Example error:
Copy
```
{
 "jsonrpc": "2.0",
 "id": 5,
 "error": {
 "code": -32002,
 "message": "Resource not found",
 "data": {
 "uri": "file:///nonexistent.txt"
 }
 }
}
```
## 
[​](#security-considerations)
Security Considerations
 1. Servers **MUST** validate all resource URIs
 2. Access controls **SHOULD** be implemented for sensitive resources
 3. Binary data **MUST** be properly encoded
 4. Resource permissions **SHOULD** be checked before operations
Was this page helpful?
YesNo
[Prompts](/specification/2025-03-26/server/prompts)[Tools](/specification/2025-03-26/server/tools)
⌘I