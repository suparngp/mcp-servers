[Skip to main content](#content-area)
[Model Context Protocol home page![light logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/light.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=4498cb8a57d574005f3dca62bdd49c95)![dark logo](https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/logo/dark.svg?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c0687c003f8f2cbdb24772ab4c8a522c)](/)
Draft
Search...
⌘K
Search...
Navigation
Client Features
Sampling
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
 * [Creating Messages](#creating-messages)
 * [Message Flow](#message-flow)
 * [Data Types](#data-types)
 * [Messages](#messages)
 * [Text Content](#text-content)
 * [Image Content](#image-content)
 * [Audio Content](#audio-content)
 * [Model Preferences](#model-preferences)
 * [Capability Priorities](#capability-priorities)
 * [Model Hints](#model-hints)
 * [Error Handling](#error-handling)
 * [Security Considerations](#security-considerations)
**Protocol Revision** : draft
The Model Context Protocol (MCP) provides a standardized way for servers to request LLM sampling (“completions” or “generations”) from language models via clients. This flow allows clients to maintain control over model access, selection, and permissions while enabling servers to leverage AI capabilities—with no server API keys necessary. Servers can request text, audio, or image-based interactions and optionally include context from MCP servers in their prompts.
## 
[​](#user-interaction-model)
User Interaction Model
Sampling in MCP allows servers to implement agentic behaviors, by enabling LLM calls to occur _nested_ inside other MCP server features. Implementations are free to expose sampling through any interface pattern that suits their needs—the protocol itself does not mandate any specific user interaction model.
For trust & safety and security, there **SHOULD** always be a human in the loop with the ability to deny sampling requests.Applications **SHOULD** :
 * Provide UI that makes it easy and intuitive to review sampling requests
 * Allow users to view and edit prompts before sending
 * Present generated responses for review before delivery
## 
[​](#capabilities)
Capabilities
Clients that support sampling **MUST** declare the `sampling` capability during [initialization](/specification/draft/basic/lifecycle#initialization):
Copy
```
{
 "capabilities": {
 "sampling": {}
 }
}
```
## 
[​](#protocol-messages)
Protocol Messages
### 
[​](#creating-messages)
Creating Messages
To request a language model generation, servers send a `sampling/createMessage` request: **Request:**
Copy
```
{
 "jsonrpc": "2.0",
 "id": 1,
 "method": "sampling/createMessage",
 "params": {
 "messages": [
 {
 "role": "user",
 "content": {
 "type": "text",
 "text": "What is the capital of France?"
 }
 }
 ],
 "modelPreferences": {
 "hints": [
 {
 "name": "claude-3-sonnet"
 }
 ],
 "intelligencePriority": 0.8,
 "speedPriority": 0.5
 },
 "systemPrompt": "You are a helpful assistant.",
 "maxTokens": 100
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
 "role": "assistant",
 "content": {
 "type": "text",
 "text": "The capital of France is Paris."
 },
 "model": "claude-3-sonnet-20240307",
 "stopReason": "endTurn"
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
[​](#messages)
Messages
Sampling messages can contain:
#### 
[​](#text-content)
Text Content
Copy
```
{
 "type": "text",
 "text": "The message content"
}
```
#### 
[​](#image-content)
Image Content
Copy
```
{
 "type": "image",
 "data": "base64-encoded-image-data",
 "mimeType": "image/jpeg"
}
```
#### 
[​](#audio-content)
Audio Content
Copy
```
{
 "type": "audio",
 "data": "base64-encoded-audio-data",
 "mimeType": "audio/wav"
}
```
### 
[​](#model-preferences)
Model Preferences
Model selection in MCP requires careful abstraction since servers and clients may use different AI providers with distinct model offerings. A server cannot simply request a specific model by name since the client may not have access to that exact model or may prefer to use a different provider’s equivalent model. To solve this, MCP implements a preference system that combines abstract capability priorities with optional model hints:
#### 
[​](#capability-priorities)
Capability Priorities
Servers express their needs through three normalized priority values (0-1):
 * `costPriority`: How important is minimizing costs? Higher values prefer cheaper models.
 * `speedPriority`: How important is low latency? Higher values prefer faster models.
 * `intelligencePriority`: How important are advanced capabilities? Higher values prefer more capable models.
#### 
[​](#model-hints)
Model Hints
While priorities help select models based on characteristics, `hints` allow servers to suggest specific models or model families:
 * Hints are treated as substrings that can match model names flexibly
 * Multiple hints are evaluated in order of preference
 * Clients **MAY** map hints to equivalent models from different providers
 * Hints are advisory—clients make final model selection
For example:
Copy
```
{
 "hints": [
 { "name": "claude-3-sonnet" }, // Prefer Sonnet-class models
 { "name": "claude" } // Fall back to any Claude model
 ],
 "costPriority": 0.3, // Cost is less important
 "speedPriority": 0.8, // Speed is very important
 "intelligencePriority": 0.5 // Moderate capability needs
}
```
The client processes these preferences to select an appropriate model from its available options. For instance, if the client doesn’t have access to Claude models but has Gemini, it might map the sonnet hint to `gemini-1.5-pro` based on similar capabilities.
## 
[​](#error-handling)
Error Handling
Clients **SHOULD** return errors for common failure cases: Example error:
Copy
```
{
 "jsonrpc": "2.0",
 "id": 1,
 "error": {
 "code": -1,
 "message": "User rejected sampling request"
 }
}
```
## 
[​](#security-considerations)
Security Considerations
 1. Clients **SHOULD** implement user approval controls
 2. Both parties **SHOULD** validate message content
 3. Clients **SHOULD** respect model preference hints
 4. Clients **SHOULD** implement rate limiting
 5. Both parties **MUST** handle sensitive data appropriately
Was this page helpful?
YesNo
[Roots](/specification/draft/client/roots)[Elicitation](/specification/draft/client/elicitation)
⌘I