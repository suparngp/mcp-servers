Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Guides
Streaming Input
[Welcome](/en/home)[Claude Developer Platform](/en/docs/intro)[Claude Code](/en/docs/claude-code/overview)[Model Context Protocol (MCP)](/en/docs/mcp)[API Reference](/en/api/messages)[Resources](/en/resources/overview)[Release Notes](/en/release-notes/overview)
* [](/en/docs/intro)
* [](/en/api/overview)
##### Using the APIs
 * [Overview](/en/api/overview)
 * [Rate limits](/en/api/rate-limits)
 * [Service tiers](/en/api/service-tiers)
 * [Errors](/en/api/errors)
 * [Handling stop reasons](/en/api/handling-stop-reasons)
 * [Beta headers](/en/api/beta-headers)
##### API reference
 * Messages
 * Models
 * Message Batches
 * Files
 * Skills
 * Admin API
 * Experimental APIs
 * Text Completions (Legacy)
##### SDKs
 * [Client SDKs](/en/api/client-sdks)
 * [OpenAI SDK compatibility](/en/api/openai-sdk)
 * Agent SDK
 * [Migrate to Claude Agent SDK](/en/docs/claude-code/sdk/migration-guide)
 * [Overview](/en/api/agent-sdk/overview)
 * [TypeScript SDK](/en/api/agent-sdk/typescript)
 * [Python SDK](/en/api/agent-sdk/python)
 * Guides
 * [Streaming Input](/en/api/agent-sdk/streaming-vs-single-mode)
 * [Handling Permissions](/en/api/agent-sdk/permissions)
 * [Session Management](/en/api/agent-sdk/sessions)
 * [Hosting the Agent SDK](/en/api/agent-sdk/hosting)
 * [Modifying system prompts](/en/api/agent-sdk/modifying-system-prompts)
 * [MCP in the SDK](/en/api/agent-sdk/mcp)
 * [Custom Tools](/en/api/agent-sdk/custom-tools)
 * [Subagents in the SDK](/en/api/agent-sdk/subagents)
 * [Slash Commands in the SDK](/en/api/agent-sdk/slash-commands)
 * [Tracking Costs and Usage](/en/api/agent-sdk/cost-tracking)
 * [Todo Lists](/en/api/agent-sdk/todo-tracking)
##### Examples
 * [Messages examples](/en/api/messages-examples)
 * [Message Batches examples](/en/api/messages-batch-examples)
##### 3rd-party APIs
 * [Amazon Bedrock API](/en/api/claude-on-amazon-bedrock)
 * [Vertex AI API](/en/api/claude-on-vertex-ai)
##### Using the Admin API
 * [Admin API overview](/en/api/administration-api)
 * [Usage and Cost API](/en/api/usage-cost-api)
 * [Claude Code Analytics API](/en/api/claude-code-analytics-api)
##### Support & configuration
 * [Versions](/en/api/versioning)
 * [IP addresses](/en/api/ip-addresses)
 * [Supported regions](/en/api/supported-regions)
 * [Getting help](/en/api/getting-help)
On this page
 * [Overview](#overview)
 * [Streaming Input Mode (Recommended)](#streaming-input-mode-recommended)
 * [How It Works](#how-it-works)
 * [Benefits](#benefits)
 * [Implementation Example](#implementation-example)
 * [Single Message Input](#single-message-input)
 * [When to Use Single Message Input](#when-to-use-single-message-input)
 * [Limitations](#limitations)
 * [Implementation Example](#implementation-example-2)
## 
[​](#overview)
Overview
The Claude Agent SDK supports two distinct input modes for interacting with agents:
 * **Streaming Input Mode** (Default & Recommended) - A persistent, interactive session
 * **Single Message Input** - One-shot queries that use session state and resuming
This guide explains the differences, benefits, and use cases for each mode to help you choose the right approach for your application.
## 
[​](#streaming-input-mode-recommended)
Streaming Input Mode (Recommended)
Streaming input mode is the **preferred** way to use the Claude Agent SDK. It provides full access to the agent’s capabilities and enables rich, interactive experiences. It allows the agent to operate as a long lived process that takes in user input, handles interruptions, surfaces permission requests, and handles session management.
### 
[​](#how-it-works)
How It Works
### 
[​](#benefits)
Benefits
## Image Uploads
Attach images directly to messages for visual analysis and understanding
## Queued Messages
Send multiple messages that process sequentially, with ability to interrupt
## Tool Integration
Full access to all tools and custom MCP servers during the session
## Hooks Support
Use lifecycle hooks to customize behavior at various points
## Real-time Feedback
See responses as they’re generated, not just final results
## Context Persistence
Maintain conversation context across multiple turns naturally
### 
[​](#implementation-example)
Implementation Example
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk";
import { readFileSync } from "fs";
async function* generateMessages() {
 // First message
 yield {
 type: "user" as const,
 message: {
 role: "user" as const,
 content: "Analyze this codebase for security issues"
 }
 };
 // Wait for conditions or user input
 await new Promise(resolve => setTimeout(resolve, 2000));
 // Follow-up with image
 yield {
 type: "user" as const,
 message: {
 role: "user" as const,
 content: [
 {
 type: "text",
 text: "Review this architecture diagram"
 },
 {
 type: "image",
 source: {
 type: "base64",
 media_type: "image/png",
 data: readFileSync("diagram.png", "base64")
 }
 }
 ]
 }
 };
}
// Process streaming responses
for await (const message of query({
 prompt: generateMessages(),
 options: {
 maxTurns: 10,
 allowedTools: ["Read", "Grep"]
 }
})) {
 if (message.type === "result") {
 console.log(message.result);
 }
}
```
## 
[​](#single-message-input)
Single Message Input
Single message input is simpler but more limited.
### 
[​](#when-to-use-single-message-input)
When to Use Single Message Input
Use single message input when:
 * You need a one-shot response
 * You do not need image attachments, hooks, etc.
 * You need to operate in a stateless environment, such as a lambda function
### 
[​](#limitations)
Limitations
Single message input mode does **not** support:
 * Direct image attachments in messages
 * Dynamic message queueing
 * Real-time interruption
 * Hook integration
 * Natural multi-turn conversations
### 
[​](#implementation-example-2)
Implementation Example
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk";
// Simple one-shot query
for await (const message of query({
 prompt: "Explain the authentication flow",
 options: {
 maxTurns: 1,
 allowedTools: ["Read", "Grep"]
 }
})) {
 if (message.type === "result") {
 console.log(message.result);
 }
}
// Continue conversation with session management
for await (const message of query({
 prompt: "Now explain the authorization process",
 options: {
 continue: true,
 maxTurns: 1
 }
})) {
 if (message.type === "result") {
 console.log(message.result);
 }
}
```
Was this page helpful?
YesNo
[Python SDK](/en/api/agent-sdk/python)[Handling Permissions](/en/api/agent-sdk/permissions)
Assistant
Responses are generated using AI and may contain mistakes.