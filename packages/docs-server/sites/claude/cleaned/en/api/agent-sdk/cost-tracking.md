Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Guides
Tracking Costs and Usage
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
 * [SDK Cost Tracking](#sdk-cost-tracking)
 * [Understanding Token Usage](#understanding-token-usage)
 * [Key Concepts](#key-concepts)
 * [Usage Reporting Structure](#usage-reporting-structure)
 * [Single vs Parallel Tool Use](#single-vs-parallel-tool-use)
 * [Message Flow Example](#message-flow-example)
 * [Important Usage Rules](#important-usage-rules)
 * [1. Same ID = Same Usage](#1-same-id-%3D-same-usage)
 * [2. Charge Once Per Step](#2-charge-once-per-step)
 * [3. Result Message Contains Cumulative Usage](#3-result-message-contains-cumulative-usage)
 * [Implementation: Cost Tracking System](#implementation%3A-cost-tracking-system)
 * [Handling Edge Cases](#handling-edge-cases)
 * [Output Token Discrepancies](#output-token-discrepancies)
 * [Cache Token Tracking](#cache-token-tracking)
 * [Best Practices](#best-practices)
 * [Usage Fields Reference](#usage-fields-reference)
 * [Example: Building a Billing Dashboard](#example%3A-building-a-billing-dashboard)
 * [Related Documentation](#related-documentation)
# 
[​](#sdk-cost-tracking)
SDK Cost Tracking
The Claude Agent SDK provides detailed token usage information for each interaction with Claude. This guide explains how to properly track costs and understand usage reporting, especially when dealing with parallel tool uses and multi-step conversations. For complete API documentation, see the [TypeScript SDK reference](/en/docs/claude-code/typescript-sdk-reference).
## 
[​](#understanding-token-usage)
Understanding Token Usage
When Claude processes requests, it reports token usage at the message level. This usage data is essential for tracking costs and billing users appropriately.
### 
[​](#key-concepts)
Key Concepts
 1. **Steps** : A step is a single request/response pair between your application and Claude
 2. **Messages** : Individual messages within a step (text, tool uses, tool results)
 3. **Usage** : Token consumption data attached to assistant messages
## 
[​](#usage-reporting-structure)
Usage Reporting Structure
### 
[​](#single-vs-parallel-tool-use)
Single vs Parallel Tool Use
When Claude executes tools, the usage reporting differs based on whether tools are executed sequentially or in parallel:
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk";
// Example: Tracking usage in a conversation
const result = await query({
 prompt: "Analyze this codebase and run tests",
 options: {
 onMessage: (message) => {
 if (message.type === 'assistant' && message.usage) {
 console.log(`Message ID: ${message.id}`);
 console.log(`Usage:`, message.usage);
 }
 }
 }
});
```
### 
[​](#message-flow-example)
Message Flow Example
Here’s how messages and usage are reported in a typical multi-step conversation:
Copy
```
<!-- Step 1: Initial request with parallel tool uses -->
assistant (text) { id: "msg_1", usage: { output_tokens: 100, ... } }
assistant (tool_use) { id: "msg_1", usage: { output_tokens: 100, ... } }
assistant (tool_use) { id: "msg_1", usage: { output_tokens: 100, ... } }
assistant (tool_use) { id: "msg_1", usage: { output_tokens: 100, ... } }
user (tool_result)
user (tool_result)
user (tool_result)
<!-- Step 2: Follow-up response -->
assistant (text) { id: "msg_2", usage: { output_tokens: 98, ... } }
```
## 
[​](#important-usage-rules)
Important Usage Rules
### 
[​](#1-same-id-%3D-same-usage)
1. Same ID = Same Usage
**All messages with the same`id` field report identical usage**. When Claude sends multiple messages in the same turn (e.g., text + tool uses), they share the same message ID and usage data.
Copy
```
// All these messages have the same ID and usage
const messages = [
 { type: 'assistant', id: 'msg_123', usage: { output_tokens: 100 } },
 { type: 'assistant', id: 'msg_123', usage: { output_tokens: 100 } },
 { type: 'assistant', id: 'msg_123', usage: { output_tokens: 100 } }
];
// Charge only once per unique message ID
const uniqueUsage = messages[0].usage; // Same for all messages with this ID
```
### 
[​](#2-charge-once-per-step)
2. Charge Once Per Step
**You should only charge users once per step** , not for each individual message. When you see multiple assistant messages with the same ID, use the usage from any one of them.
### 
[​](#3-result-message-contains-cumulative-usage)
3. Result Message Contains Cumulative Usage
The final `result` message contains the total cumulative usage from all steps in the conversation:
Copy
```
// Final result includes total usage
const result = await query({
 prompt: "Multi-step task",
 options: { /* ... */ }
});
console.log("Total usage:", result.usage);
console.log("Total cost:", result.usage.total_cost_usd);
```
## 
[​](#implementation%3A-cost-tracking-system)
Implementation: Cost Tracking System
Here’s a complete example of implementing a cost tracking system:
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk";
class CostTracker {
 private processedMessageIds = new Set<string>();
 private stepUsages: Array<any> = [];
 async trackConversation(prompt: string) {
 const result = await query({
 prompt,
 options: {
 onMessage: (message) => {
 this.processMessage(message);
 }
 }
 });
 return {
 result,
 stepUsages: this.stepUsages,
 totalCost: result.usage?.total_cost_usd || 0
 };
 }
 private processMessage(message: any) {
 // Only process assistant messages with usage
 if (message.type !== 'assistant' || !message.usage) {
 return;
 }
 // Skip if we've already processed this message ID
 if (this.processedMessageIds.has(message.id)) {
 return;
 }
 // Mark as processed and record usage
 this.processedMessageIds.add(message.id);
 this.stepUsages.push({
 messageId: message.id,
 timestamp: new Date().toISOString(),
 usage: message.usage,
 costUSD: this.calculateCost(message.usage)
 });
 }
 private calculateCost(usage: any): number {
 // Implement your pricing calculation here
 // This is a simplified example
 const inputCost = usage.input_tokens * 0.00003;
 const outputCost = usage.output_tokens * 0.00015;
 const cacheReadCost = (usage.cache_read_input_tokens || 0) * 0.0000075;
 return inputCost + outputCost + cacheReadCost;
 }
}
// Usage
const tracker = new CostTracker();
const { result, stepUsages, totalCost } = await tracker.trackConversation(
 "Analyze and refactor this code"
);
console.log(`Steps processed: ${stepUsages.length}`);
console.log(`Total cost: ${totalCost.toFixed(4)}`);
```
## 
[​](#handling-edge-cases)
Handling Edge Cases
### 
[​](#output-token-discrepancies)
Output Token Discrepancies
In rare cases, you might observe different `output_tokens` values for messages with the same ID. When this occurs:
 1. **Use the highest value** - The final message in a group typically contains the accurate total
 2. **Verify against total cost** - The `total_cost_usd` in the result message is authoritative
 3. **Report inconsistencies** - File issues at the [Claude Code GitHub repository](https://github.com/anthropics/claude-code/issues)
### 
[​](#cache-token-tracking)
Cache Token Tracking
When using prompt caching, track these token types separately:
Copy
```
interface CacheUsage {
 cache_creation_input_tokens: number;
 cache_read_input_tokens: number;
 cache_creation: {
 ephemeral_5m_input_tokens: number;
 ephemeral_1h_input_tokens: number;
 };
}
```
## 
[​](#best-practices)
Best Practices
 1. **Use Message IDs for Deduplication** : Always track processed message IDs to avoid double-charging
 2. **Monitor the Result Message** : The final result contains authoritative cumulative usage
 3. **Implement Logging** : Log all usage data for auditing and debugging
 4. **Handle Failures Gracefully** : Track partial usage even if a conversation fails
 5. **Consider Streaming** : For streaming responses, accumulate usage as messages arrive
## 
[​](#usage-fields-reference)
Usage Fields Reference
Each usage object contains:
 * `input_tokens`: Base input tokens processed
 * `output_tokens`: Tokens generated in the response
 * `cache_creation_input_tokens`: Tokens used to create cache entries
 * `cache_read_input_tokens`: Tokens read from cache
 * `service_tier`: The service tier used (e.g., “standard”)
 * `total_cost_usd`: Total cost in USD (only in result message)
## 
[​](#example%3A-building-a-billing-dashboard)
Example: Building a Billing Dashboard
Here’s how to aggregate usage data for a billing dashboard:
Copy
```
class BillingAggregator {
 private userUsage = new Map<string, {
 totalTokens: number;
 totalCost: number;
 conversations: number;
 }>();
 async processUserRequest(userId: string, prompt: string) {
 const tracker = new CostTracker();
 const { result, stepUsages, totalCost } = await tracker.trackConversation(prompt);
 // Update user totals
 const current = this.userUsage.get(userId) || {
 totalTokens: 0,
 totalCost: 0,
 conversations: 0
 };
 const totalTokens = stepUsages.reduce((sum, step) =>
 sum + step.usage.input_tokens + step.usage.output_tokens, 0
 );
 this.userUsage.set(userId, {
 totalTokens: current.totalTokens + totalTokens,
 totalCost: current.totalCost + totalCost,
 conversations: current.conversations + 1
 });
 return result;
 }
 getUserBilling(userId: string) {
 return this.userUsage.get(userId) || {
 totalTokens: 0,
 totalCost: 0,
 conversations: 0
 };
 }
}
```
## 
[​](#related-documentation)
Related Documentation
 * [TypeScript SDK Reference](/en/docs/claude-code/typescript-sdk-reference) - Complete API documentation
 * [SDK Overview](/en/api/agent-sdk/overview) - Getting started with the SDK
 * [SDK Permissions](/en/api/agent-sdk/sdk-permissions) - Managing tool permissions
Was this page helpful?
YesNo
[Slash Commands in the SDK](/en/api/agent-sdk/slash-commands)[Todo Lists](/en/api/agent-sdk/todo-tracking)
Assistant
Responses are generated using AI and may contain mistakes.