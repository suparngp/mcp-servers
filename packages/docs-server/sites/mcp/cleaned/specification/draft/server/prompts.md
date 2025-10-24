[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Draft
Search...
⌘K
Search...
Navigation
Server Features
Prompts
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
 * [User Interaction Model](#user-interaction-model)
 * [Capabilities](#capabilities)
 * [Protocol Messages](#protocol-messages)
 * [Listing Prompts](#listing-prompts)
 * [Getting a Prompt](#getting-a-prompt)
 * [List Changed Notification](#list-changed-notification)
 * [Message Flow](#message-flow)
 * [Data Types](#data-types)
 * [Prompt](#prompt)
 * [PromptMessage](#promptmessage)
 * [Text Content](#text-content)
 * [Image Content](#image-content)
 * [Audio Content](#audio-content)
 * [Embedded Resources](#embedded-resources)
 * [Error Handling](#error-handling)
 * [Implementation Considerations](#implementation-considerations)
 * [Security](#security)
**Protocol Revision** : draft
The Model Context Protocol (MCP) provides a standardized way for servers to expose prompt templates to clients. Prompts allow servers to provide structured messages and instructions for interacting with language models. Clients can discover available prompts, retrieve their contents, and provide arguments to customize them.
## 
[​](#user-interaction-model)
User Interaction Model
Prompts are designed to be **user-controlled** , meaning they are exposed from servers to clients with the intention of the user being able to explicitly select them for use. Typically, prompts would be triggered through user-initiated commands in the user interface, which allows users to naturally discover and invoke available prompts. For example, as slash commands: ![Example of prompt exposed as slash command](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/specification/draft/server/slash-command.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=02e1902c84120c10cfa83d0234a0040d) However, implementors are free to expose prompts through any interface pattern that suits their needs—the protocol itself does not mandate any specific user interaction model.
## 
[​](#capabilities)
Capabilities
Servers that support prompts **MUST** declare the `prompts` capability during [initialization](/specification/draft/basic/lifecycle#initialization):
Copy
```
{
 "capabilities": {
 "prompts": {
 "listChanged": true
 }
 }
}
```
`listChanged` indicates whether the server will emit notifications when the list of available prompts changes.
## 
[​](#protocol-messages)
Protocol Messages
### 
[​](#listing-prompts)
Listing Prompts
To retrieve available prompts, clients send a `prompts/list` request. This operation supports [pagination](/specification/draft/server/utilities/pagination). **Request:**
Copy
```
{
 "jsonrpc": "2.0",
 "id": 1,
 "method": "prompts/list",
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
 "prompts": [
 {
 "name": "code_review",
 "title": "Request Code Review",
 "description": "Asks the LLM to analyze code quality and suggest improvements",
 "arguments": [
 {
 "name": "code",
 "description": "The code to review",
 "required": true
 }
 ],
 "icons": [
 {
 "src": "https://example.com/review-icon.svg",
 "mimeType": "image/svg+xml",
 "sizes": ["any"]
 }
 ]
 }
 ],
 "nextCursor": "next-page-cursor"
 }
}
```
### 
[​](#getting-a-prompt)
Getting a Prompt
To retrieve a specific prompt, clients send a `prompts/get` request. Arguments may be auto-completed through [the completion API](/specification/draft/server/utilities/completion). **Request:**
Copy
```
{
 "jsonrpc": "2.0",
 "id": 2,
 "method": "prompts/get",
 "params": {
 "name": "code_review",
 "arguments": {
 "code": "def hello():\n print('world')"
 }
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
 "description": "Code review prompt",
 "messages": [
 {
 "role": "user",
 "content": {
 "type": "text",
 "text": "Please review this Python code:\ndef hello():\n print('world')"
 }
 }
 ]
 }
}
```
### 
[​](#list-changed-notification)
List Changed Notification
When the list of available prompts changes, servers that declared the `listChanged` capability **SHOULD** send a notification:
Copy
```
{
 "jsonrpc": "2.0",
 "method": "notifications/prompts/list_changed"
}
```
## 
[​](#message-flow)
Message Flow
## 
[​](#data-types)
Data Types
### 
[​](#prompt)
Prompt
A prompt definition includes:
 * `name`: Unique identifier for the prompt
 * `title`: Optional human-readable name of the prompt for display purposes.
 * `description`: Optional human-readable description
 * `arguments`: Optional list of arguments for customization
### 
[​](#promptmessage)
PromptMessage
Messages in a prompt can contain:
 * `role`: Either “user” or “assistant” to indicate the speaker
 * `content`: One of the following content types:
All content types in prompt messages support optional [annotations](/specification/2025-06-18/server/resources#annotations) for metadata about audience, priority, and modification times.
#### 
[​](#text-content)
Text Content
Text content represents plain text messages:
Copy
```
{
 "type": "text",
 "text": "The text content of the message"
}
```
This is the most common content type used for natural language interactions.
#### 
[​](#image-content)
Image Content
Image content allows including visual information in messages:
Copy
```
{
 "type": "image",
 "data": "base64-encoded-image-data",
 "mimeType": "image/png"
}
```
The image data **MUST** be base64-encoded and include a valid MIME type. This enables multi-modal interactions where visual context is important.
#### 
[​](#audio-content)
Audio Content
Audio content allows including audio information in messages:
Copy
```
{
 "type": "audio",
 "data": "base64-encoded-audio-data",
 "mimeType": "audio/wav"
}
```
The audio data MUST be base64-encoded and include a valid MIME type. This enables multi-modal interactions where audio context is important.
#### 
[​](#embedded-resources)
Embedded Resources
Embedded resources allow referencing server-side resources directly in messages:
Copy
```
{
 "type": "resource",
 "resource": {
 "uri": "resource://example",
 "mimeType": "text/plain",
 "text": "Resource content"
 }
}
```
Resources can contain either text or binary (blob) data and **MUST** include:
 * A valid resource URI
 * The appropriate MIME type
 * Either text content or base64-encoded blob data
Embedded resources enable prompts to seamlessly incorporate server-managed content like documentation, code samples, or other reference materials directly into the conversation flow.
## 
[​](#error-handling)
Error Handling
Servers **SHOULD** return standard JSON-RPC errors for common failure cases:
 * Invalid prompt name: `-32602` (Invalid params)
 * Missing required arguments: `-32602` (Invalid params)
 * Internal errors: `-32603` (Internal error)
## 
[​](#implementation-considerations)
Implementation Considerations
 1. Servers **SHOULD** validate prompt arguments before processing
 2. Clients **SHOULD** handle pagination for large prompt lists
 3. Both parties **SHOULD** respect capability negotiation
## 
[​](#security)
Security
Implementations **MUST** carefully validate all prompt inputs and outputs to prevent injection attacks or unauthorized access to resources.
Was this page helpful?
YesNo
[Overview](/specification/draft/server)[Resources](/specification/draft/server/resources)
⌘I