Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Guides
Todo Lists
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
 * [Todo Lifecycle](#todo-lifecycle)
 * [When Todos Are Used](#when-todos-are-used)
 * [Examples](#examples)
 * [Monitoring Todo Changes](#monitoring-todo-changes)
 * [Real-time Progress Display](#real-time-progress-display)
 * [Related Documentation](#related-documentation)
Todo tracking provides a structured way to manage tasks and display progress to users. The Claude Agent SDK includes built-in todo functionality that helps organize complex workflows and keep users informed about task progression.
### 
[​](#todo-lifecycle)
Todo Lifecycle
Todos follow a predictable lifecycle:
 1. **Created** as `pending` when tasks are identified
 2. **Activated** to `in_progress` when work begins
 3. **Completed** when the task finishes successfully
 4. **Removed** when all tasks in a group are completed
### 
[​](#when-todos-are-used)
When Todos Are Used
The SDK automatically creates todos for:
 * **Complex multi-step tasks** requiring 3 or more distinct actions
 * **User-provided task lists** when multiple items are mentioned
 * **Non-trivial operations** that benefit from progress tracking
 * **Explicit requests** when users ask for todo organization
## 
[​](#examples)
Examples
### 
[​](#monitoring-todo-changes)
Monitoring Todo Changes
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk";
for await (const message of query({
 prompt: "Optimize my React app performance and track progress with todos",
 options: { maxTurns: 15 }
})) {
 // Todo updates are reflected in the message stream
 if (message.type === "assistant") {
 for (const block of message.message.content) {
 if (block.type === "tool_use" && block.name === "TodoWrite") {
 const todos = block.input.todos;
 console.log("Todo Status Update:");
 todos.forEach((todo, index) => {
 const status = todo.status === "completed" ? "✅" :
 todo.status === "in_progress" ? "🔧" : "❌";
 console.log(`${index + 1}. ${status} ${todo.content}`);
 });
 }
 }
 }
}
```
### 
[​](#real-time-progress-display)
Real-time Progress Display
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk";
class TodoTracker {
 private todos: any[] = [];
 displayProgress() {
 if (this.todos.length === 0) return;
 const completed = this.todos.filter(t => t.status === "completed").length;
 const inProgress = this.todos.filter(t => t.status === "in_progress").length;
 const total = this.todos.length;
 console.log(`\nProgress: ${completed}/${total} completed`);
 console.log(`Currently working on: ${inProgress} task(s)\n`);
 this.todos.forEach((todo, index) => {
 const icon = todo.status === "completed" ? "✅" :
 todo.status === "in_progress" ? "🔧" : "❌";
 const text = todo.status === "in_progress" ? todo.activeForm : todo.content;
 console.log(`${index + 1}. ${icon} ${text}`);
 });
 }
 async trackQuery(prompt: string) {
 for await (const message of query({
 prompt,
 options: { maxTurns: 20 }
 })) {
 if (message.type === "assistant") {
 for (const block of message.message.content) {
 if (block.type === "tool_use" && block.name === "TodoWrite") {
 this.todos = block.input.todos;
 this.displayProgress();
 }
 }
 }
 }
 }
}
// Usage
const tracker = new TodoTracker();
await tracker.trackQuery("Build a complete authentication system with todos");
```
## 
[​](#related-documentation)
Related Documentation
 * [TypeScript SDK Reference](/en/api/agent-sdk/typescript)
 * [Python SDK Reference](/en/api/agent-sdk/python)
 * [Streaming vs Single Mode](/en/api/agent-sdk/streaming-vs-single-mode)
 * [Custom Tools](/en/api/agent-sdk/custom-tools)
Was this page helpful?
YesNo
[Tracking Costs and Usage](/en/api/agent-sdk/cost-tracking)[Messages examples](/en/api/messages-examples)
Assistant
Responses are generated using AI and may contain mistakes.