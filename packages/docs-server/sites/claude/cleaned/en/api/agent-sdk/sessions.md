Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Guides
Session Management
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
 * [Session Management](#session-management)
 * [How Sessions Work](#how-sessions-work)
 * [Getting the Session ID](#getting-the-session-id)
 * [Resuming Sessions](#resuming-sessions)
 * [Forking Sessions](#forking-sessions)
 * [When to Fork a Session](#when-to-fork-a-session)
 * [Forking vs Continuing](#forking-vs-continuing)
 * [Example: Forking a Session](#example%3A-forking-a-session)
# 
[​](#session-management)
Session Management
The Claude Agent SDK provides session management capabilities for handling conversation state and resumption. Sessions allow you to continue conversations across multiple interactions while maintaining full context.
## 
[​](#how-sessions-work)
How Sessions Work
When you start a new query, the SDK automatically creates a session and returns a session ID in the initial system message. You can capture this ID to resume the session later.
### 
[​](#getting-the-session-id)
Getting the Session ID
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk"
let sessionId: string | undefined
const response = query({
 prompt: "Help me build a web application",
 options: {
 model: "claude-sonnet-4-5"
 }
})
for await (const message of response) {
 // The first message is a system init message with the session ID
 if (message.type === 'system' && message.subtype === 'init') {
 sessionId = message.session_id
 console.log(`Session started with ID: ${sessionId}`)
 // You can save this ID for later resumption
 }
 // Process other messages...
 console.log(message)
}
// Later, you can use the saved sessionId to resume
if (sessionId) {
 const resumedResponse = query({
 prompt: "Continue where we left off",
 options: {
 resume: sessionId
 }
 })
}
```
## 
[​](#resuming-sessions)
Resuming Sessions
The SDK supports resuming sessions from previous conversation states, enabling continuous development workflows. Use the `resume` option with a session ID to continue a previous conversation.
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk"
// Resume a previous session using its ID
const response = query({
 prompt: "Continue implementing the authentication system from where we left off",
 options: {
 resume: "session-xyz", // Session ID from previous conversation
 model: "claude-sonnet-4-5",
 allowedTools: ["Read", "Edit", "Write", "Glob", "Grep", "Bash"]
 }
})
// The conversation continues with full context from the previous session
for await (const message of response) {
 console.log(message)
}
```
The SDK automatically handles loading the conversation history and context when you resume a session, allowing Claude to continue exactly where it left off.
## 
[​](#forking-sessions)
Forking Sessions
When resuming a session, you can choose to either continue the original session or fork it into a new branch. By default, resuming continues the original session. Use the `forkSession` option (TypeScript) or `fork_session` option (Python) to create a new session ID that starts from the resumed state.
### 
[​](#when-to-fork-a-session)
When to Fork a Session
Forking is useful when you want to:
 * Explore different approaches from the same starting point
 * Create multiple conversation branches without modifying the original
 * Test changes without affecting the original session history
 * Maintain separate conversation paths for different experiments
### 
[​](#forking-vs-continuing)
Forking vs Continuing
Behavior | `forkSession: false` (default) | `forkSession: true` 
---|---|--- 
**Session ID** | Same as original | New session ID generated 
**History** | Appends to original session | Creates new branch from resume point 
**Original Session** | Modified | Preserved unchanged 
**Use Case** | Continue linear conversation | Branch to explore alternatives 
### 
[​](#example%3A-forking-a-session)
Example: Forking a Session
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk"
// First, capture the session ID
let sessionId: string | undefined
const response = query({
 prompt: "Help me design a REST API",
 options: { model: "claude-sonnet-4-5" }
})
for await (const message of response) {
 if (message.type === 'system' && message.subtype === 'init') {
 sessionId = message.session_id
 console.log(`Original session: ${sessionId}`)
 }
}
// Fork the session to try a different approach
const forkedResponse = query({
 prompt: "Now let's redesign this as a GraphQL API instead",
 options: {
 resume: sessionId,
 forkSession: true, // Creates a new session ID
 model: "claude-sonnet-4-5"
 }
})
for await (const message of forkedResponse) {
 if (message.type === 'system' && message.subtype === 'init') {
 console.log(`Forked session: ${message.session_id}`)
 // This will be a different session ID
 }
}
// The original session remains unchanged and can still be resumed
const originalContinued = query({
 prompt: "Add authentication to the REST API",
 options: {
 resume: sessionId,
 forkSession: false, // Continue original session (default)
 model: "claude-sonnet-4-5"
 }
})
```
Was this page helpful?
YesNo
[Handling Permissions](/en/api/agent-sdk/permissions)[Hosting the Agent SDK](/en/api/agent-sdk/hosting)
Assistant
Responses are generated using AI and may contain mistakes.