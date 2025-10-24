[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Guides
Handling Permissions
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
 * [SDK Permissions](#sdk-permissions)
 * [Overview](#overview)
 * [Permission Flow Diagram](#permission-flow-diagram)
 * [Permission Modes](#permission-modes)
 * [Available Modes](#available-modes)
 * [Setting Permission Mode](#setting-permission-mode)
 * [1. Initial Configuration](#1-initial-configuration)
 * [2. Dynamic Mode Changes (Streaming Only)](#2-dynamic-mode-changes-streaming-only)
 * [Mode-Specific Behaviors](#mode-specific-behaviors)
 * [Accept Edits Mode (acceptEdits)](#accept-edits-mode-acceptedits)
 * [Bypass Permissions Mode (bypassPermissions)](#bypass-permissions-mode-bypasspermissions)
 * [Mode Priority in Permission Flow](#mode-priority-in-permission-flow)
 * [Best Practices](#best-practices)
 * [canUseTool](#canusetool)
 * [Related Resources](#related-resources)
# 
[​](#sdk-permissions)
SDK Permissions
The Claude Agent SDK provides powerful permission controls that allow you to manage how Claude uses tools in your application. This guide covers how to implement permission systems using the `canUseTool` callback, hooks, and settings.json permission rules. For complete API documentation, see the [TypeScript SDK reference](/en/docs/claude-code/typescript-sdk-reference).
## 
[​](#overview)
Overview
The Claude Agent SDK provides four complementary ways to control tool usage:
 1. **[Permission Modes](#permission-modes)** - Global permission behavior settings that affect all tools
 2. **[canUseTool callback](/en/docs/claude-code/typescript-sdk-reference#canusetool)** - Runtime permission handler for cases not covered by other rules
 3. **[Hooks](/en/docs/claude-code/typescript-sdk-reference#hook-types)** - Fine-grained control over every tool execution with custom logic
 4. **[Permission rules (settings.json)](/en/docs/claude-code/settings#permission-settings)** - Declarative allow/deny rules with integrated bash command parsing
Use cases for each approach:
 * Permission modes - Set overall permission behavior (planning, auto-accepting edits, bypassing checks)
 * `canUseTool` - Dynamic approval for uncovered cases, prompts user for permission
 * Hooks - Programmatic control over all tool executions
 * Permission rules - Static policies with intelligent bash command parsing
## 
[​](#permission-flow-diagram)
Permission Flow Diagram
**Processing Order:** PreToolUse Hook → Deny Rules → Allow Rules → Ask Rules → Permission Mode Check → canUseTool Callback → PostToolUse Hook
## 
[​](#permission-modes)
Permission Modes
Permission modes provide global control over how Claude uses tools. You can set the permission mode when calling `query()` or change it dynamically during streaming sessions.
### 
[​](#available-modes)
Available Modes
The SDK supports four permission modes, each with different behavior: Mode | Description | Tool Behavior 
---|---|--- 
`default` | Standard permission behavior | Normal permission checks apply 
`plan` | Planning mode - no execution | Claude can only use read-only tools; presents a plan before execution **(Not currently supported in SDK)** 
`acceptEdits` | Auto-accept file edits | File edits and filesystem operations are automatically approved 
`bypassPermissions` | Bypass all permission checks | All tools run without permission prompts (use with caution) 
### 
[​](#setting-permission-mode)
Setting Permission Mode
You can set the permission mode in two ways:
#### 
[​](#1-initial-configuration)
1. Initial Configuration
Set the mode when creating a query:
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk";
const result = await query({
 prompt: "Help me refactor this code",
 options: {
 permissionMode: 'default' // Standard permission mode
 }
});
```
#### 
[​](#2-dynamic-mode-changes-streaming-only)
2. Dynamic Mode Changes (Streaming Only)
Change the mode during a streaming session:
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk";
// Create an async generator for streaming input
async function* streamInput() {
 yield { 
 type: 'user',
 message: { 
 role: 'user', 
 content: "Let's start with default permissions"
 }
 };
 // Later in the conversation...
 yield {
 type: 'user',
 message: {
 role: 'user',
 content: "Now let's speed up development"
 }
 };
}
const q = query({
 prompt: streamInput(),
 options: {
 permissionMode: 'default' // Start in default mode
 }
});
// Change mode dynamically
await q.setPermissionMode('acceptEdits');
// Process messages
for await (const message of q) {
 console.log(message);
}
```
### 
[​](#mode-specific-behaviors)
Mode-Specific Behaviors
#### 
[​](#accept-edits-mode-acceptedits)
Accept Edits Mode (`acceptEdits`)
In accept edits mode:
 * All file edits are automatically approved
 * Filesystem operations (mkdir, touch, rm, etc.) are auto-approved
 * Other tools still require normal permissions
 * Speeds up development when you trust Claude’s edits
 * Useful for rapid prototyping and iterations
Auto-approved operations:
 * File edits (Edit, Write tools)
 * Bash filesystem commands (mkdir, touch, rm, mv, cp)
 * File creation and deletion
#### 
[​](#bypass-permissions-mode-bypasspermissions)
Bypass Permissions Mode (`bypassPermissions`)
In bypass permissions mode:
 * **ALL tool uses are automatically approved**
 * No permission prompts appear
 * Hooks still execute (can still block operations)
 * **Use with extreme caution** - Claude has full system access
 * Recommended only for controlled environments
### 
[​](#mode-priority-in-permission-flow)
Mode Priority in Permission Flow
Permission modes are evaluated at a specific point in the permission flow:
 1. **Hooks execute first** - Can allow, deny, ask, or continue
 2. **Deny rules** are checked - Block tools regardless of mode
 3. **Allow rules** are checked - Permit tools if matched
 4. **Ask rules** are checked - Prompt for permission if matched
 5. **Permission mode** is evaluated:
 * **`bypassPermissions`mode** - If active, allows all remaining tools
 * **Other modes** - Defer to `canUseTool` callback
 6. **`canUseTool`callback** - Handles remaining cases
This means:
 * Hooks can always control tool use, even in `bypassPermissions` mode
 * Explicit deny rules override all permission modes
 * Ask rules are evaluated before permission modes
 * `bypassPermissions` mode overrides the `canUseTool` callback for unmatched tools
### 
[​](#best-practices)
Best Practices
 1. **Use default mode** for controlled execution with normal permission checks
 2. **Use acceptEdits mode** when working on isolated files or directories
 3. **Avoid bypassPermissions** in production or on systems with sensitive data
 4. **Combine modes with hooks** for fine-grained control
 5. **Switch modes dynamically** based on task progress and confidence
Example of mode progression:
Copy
```
// Start in default mode for controlled execution
permissionMode: 'default'
// Switch to acceptEdits for rapid iteration
await q.setPermissionMode('acceptEdits')
```
## 
[​](#canusetool)
canUseTool
The `canUseTool` callback is passed as an option when calling the `query` function. It receives the tool name and input parameters, and must return a decision- either allow or deny. canUseTool fires whenever Claude Code would show a permission prompt to a user, e.g. hooks and permission rules do not cover it and it is not in acceptEdits mode. Here’s a complete example showing how to implement interactive tool approval:
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk";
async function promptForToolApproval(toolName: string, input: any) {
 console.log("\n🔧 Tool Request:");
 console.log(` Tool: ${toolName}`);
 // Display tool parameters
 if (input && Object.keys(input).length > 0) {
 console.log(" Parameters:");
 for (const [key, value] of Object.entries(input)) {
 let displayValue = value;
 if (typeof value === 'string' && value.length > 100) {
 displayValue = value.substring(0, 100) + "...";
 } else if (typeof value === 'object') {
 displayValue = JSON.stringify(value, null, 2);
 }
 console.log(` ${key}: ${displayValue}`);
 }
 }
 // Get user approval (replace with your UI logic)
 const approved = await getUserApproval();
 if (approved) {
 console.log(" ✅ Approved\n");
 return {
 behavior: "allow",
 updatedInput: input
 };
 } else {
 console.log(" ❌ Denied\n");
 return {
 behavior: "deny",
 message: "User denied permission for this tool"
 };
 }
}
// Use the permission callback
const result = await query({
 prompt: "Help me analyze this codebase",
 options: {
 canUseTool: async (toolName, input) => {
 return promptForToolApproval(toolName, input);
 }
 }
});
```
## 
[​](#related-resources)
Related Resources
 * [Hooks Guide](/en/docs/claude-code/hooks-guide) - Learn how to implement hooks for fine-grained control over tool execution
 * [Settings: Permission Rules](/en/docs/claude-code/settings#permission-settings) - Configure declarative allow/deny rules with bash command parsing
Was this page helpful?
YesNo
[Streaming Input](/en/api/agent-sdk/streaming-vs-single-mode)[Session Management](/en/api/agent-sdk/sessions)
Assistant
Responses are generated using AI and may contain mistakes.