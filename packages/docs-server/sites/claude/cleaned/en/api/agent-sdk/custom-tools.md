Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Guides
Custom Tools
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
 * [Creating Custom Tools](#creating-custom-tools)
 * [Using Custom Tools](#using-custom-tools)
 * [Tool Name Format](#tool-name-format)
 * [Configuring Allowed Tools](#configuring-allowed-tools)
 * [Multiple Tools Example](#multiple-tools-example)
 * [Type Safety with Python](#type-safety-with-python)
 * [Error Handling](#error-handling)
 * [Example Tools](#example-tools)
 * [Database Query Tool](#database-query-tool)
 * [API Gateway Tool](#api-gateway-tool)
 * [Calculator Tool](#calculator-tool)
 * [Related Documentation](#related-documentation)
Custom tools allow you to extend Claude Code’s capabilities with your own functionality through in-process MCP servers, enabling Claude to interact with external services, APIs, or perform specialized operations.
## 
[​](#creating-custom-tools)
Creating Custom Tools
Use the `createSdkMcpServer` and `tool` helper functions to define type-safe custom tools:
TypeScript
Python
Copy
```
import { query, tool, createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";
// Create an SDK MCP server with custom tools
const customServer = createSdkMcpServer({
 name: "my-custom-tools",
 version: "1.0.0",
 tools: [
 tool(
 "get_weather",
 "Get current weather for a location",
 {
 location: z.string().describe("City name or coordinates"),
 units: z.enum(["celsius", "fahrenheit"]).default("celsius").describe("Temperature units")
 },
 async (args) => {
 // Call weather API
 const response = await fetch(
 `https://api.weather.com/v1/current?q=${args.location}&units=${args.units}`
 );
 const data = await response.json();
 return {
 content: [{
 type: "text",
 text: `Temperature: ${data.temp}°\nConditions: ${data.conditions}\nHumidity: ${data.humidity}%`
 }]
 };
 }
 )
 ]
});
```
## 
[​](#using-custom-tools)
Using Custom Tools
Pass the custom server to the `query` function via the `mcpServers` option as a dictionary/object.
**Important:** Custom MCP tools require streaming input mode. You must use an async generator/iterable for the `prompt` parameter - a simple string will not work with MCP servers.
### 
[​](#tool-name-format)
Tool Name Format
When MCP tools are exposed to Claude, their names follow a specific format:
 * Pattern: `mcp__{server_name}__{tool_name}`
 * Example: A tool named `get_weather` in server `my-custom-tools` becomes `mcp__my-custom-tools__get_weather`
### 
[​](#configuring-allowed-tools)
Configuring Allowed Tools
You can control which tools Claude can use via the `allowedTools` option:
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-code";
// Use the custom tools in your query with streaming input
async function* generateMessages() {
 yield {
 type: "user" as const,
 message: {
 role: "user" as const,
 content: "What's the weather in San Francisco?"
 }
 };
}
for await (const message of query({
 prompt: generateMessages(), // Use async generator for streaming input
 options: {
 mcpServers: {
 "my-custom-tools": customServer // Pass as object/dictionary, not array
 },
 // Optionally specify which tools Claude can use
 allowedTools: [
 "mcp__my-custom-tools__get_weather", // Allow the weather tool
 // Add other tools as needed
 ],
 maxTurns: 3
 }
})) {
 if (message.type === "result" && message.subtype === "success") {
 console.log(message.result);
 }
}
```
### 
[​](#multiple-tools-example)
Multiple Tools Example
When your MCP server has multiple tools, you can selectively allow them:
TypeScript
Python
Copy
```
const multiToolServer = createSdkMcpServer({
 name: "utilities",
 version: "1.0.0",
 tools: [
 tool("calculate", "Perform calculations", { /* ... */ }, async (args) => { /* ... */ }),
 tool("translate", "Translate text", { /* ... */ }, async (args) => { /* ... */ }),
 tool("search_web", "Search the web", { /* ... */ }, async (args) => { /* ... */ })
 ]
});
// Allow only specific tools with streaming input
async function* generateMessages() {
 yield {
 type: "user" as const,
 message: {
 role: "user" as const,
 content: "Calculate 5 + 3 and translate 'hello' to Spanish"
 }
 };
}
for await (const message of query({
 prompt: generateMessages(), // Use async generator for streaming input
 options: {
 mcpServers: {
 utilities: multiToolServer
 },
 allowedTools: [
 "mcp__utilities__calculate", // Allow calculator
 "mcp__utilities__translate", // Allow translator
 // "mcp__utilities__search_web" is NOT allowed
 ]
 }
})) {
 // Process messages
}
```
## 
[​](#type-safety-with-python)
Type Safety with Python
The `@tool` decorator supports various schema definition approaches for type safety:
TypeScript
Python
Copy
```
import { z } from "zod";
tool(
 "process_data",
 "Process structured data with type safety",
 {
 // Zod schema defines both runtime validation and TypeScript types
 data: z.object({
 name: z.string(),
 age: z.number().min(0).max(150),
 email: z.string().email(),
 preferences: z.array(z.string()).optional()
 }),
 format: z.enum(["json", "csv", "xml"]).default("json")
 },
 async (args) => {
 // args is fully typed based on the schema
 // TypeScript knows: args.data.name is string, args.data.age is number, etc.
 console.log(`Processing ${args.data.name}'s data as ${args.format}`);
 // Your processing logic here
 return {
 content: [{
 type: "text",
 text: `Processed data for ${args.data.name}`
 }]
 };
 }
)
```
## 
[​](#error-handling)
Error Handling
Handle errors gracefully to provide meaningful feedback:
TypeScript
Python
Copy
```
tool(
 "fetch_data",
 "Fetch data from an API",
 {
 endpoint: z.string().url().describe("API endpoint URL")
 },
 async (args) => {
 try {
 const response = await fetch(args.endpoint);
 if (!response.ok) {
 return {
 content: [{
 type: "text",
 text: `API error: ${response.status} ${response.statusText}`
 }]
 };
 }
 const data = await response.json();
 return {
 content: [{
 type: "text",
 text: JSON.stringify(data, null, 2)
 }]
 };
 } catch (error) {
 return {
 content: [{
 type: "text",
 text: `Failed to fetch data: ${error.message}`
 }]
 };
 }
 }
)
```
## 
[​](#example-tools)
Example Tools
### 
[​](#database-query-tool)
Database Query Tool
TypeScript
Python
Copy
```
const databaseServer = createSdkMcpServer({
 name: "database-tools",
 version: "1.0.0",
 tools: [
 tool(
 "query_database",
 "Execute a database query",
 {
 query: z.string().describe("SQL query to execute"),
 params: z.array(z.any()).optional().describe("Query parameters")
 },
 async (args) => {
 const results = await db.query(args.query, args.params || []);
 return {
 content: [{
 type: "text",
 text: `Found ${results.length} rows:\n${JSON.stringify(results, null, 2)}`
 }]
 };
 }
 )
 ]
});
```
### 
[​](#api-gateway-tool)
API Gateway Tool
TypeScript
Python
Copy
```
const apiGatewayServer = createSdkMcpServer({
 name: "api-gateway",
 version: "1.0.0",
 tools: [
 tool(
 "api_request",
 "Make authenticated API requests to external services",
 {
 service: z.enum(["stripe", "github", "openai", "slack"]).describe("Service to call"),
 endpoint: z.string().describe("API endpoint path"),
 method: z.enum(["GET", "POST", "PUT", "DELETE"]).describe("HTTP method"),
 body: z.record(z.any()).optional().describe("Request body"),
 query: z.record(z.string()).optional().describe("Query parameters")
 },
 async (args) => {
 const config = {
 stripe: { baseUrl: "https://api.stripe.com/v1", key: process.env.STRIPE_KEY },
 github: { baseUrl: "https://api.github.com", key: process.env.GITHUB_TOKEN },
 openai: { baseUrl: "https://api.openai.com/v1", key: process.env.OPENAI_KEY },
 slack: { baseUrl: "https://slack.com/api", key: process.env.SLACK_TOKEN }
 };
 const { baseUrl, key } = config[args.service];
 const url = new URL(`${baseUrl}${args.endpoint}`);
 if (args.query) {
 Object.entries(args.query).forEach(([k, v]) => url.searchParams.set(k, v));
 }
 const response = await fetch(url, {
 method: args.method,
 headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
 body: args.body ? JSON.stringify(args.body) : undefined
 });
 const data = await response.json();
 return {
 content: [{
 type: "text",
 text: JSON.stringify(data, null, 2)
 }]
 };
 }
 )
 ]
});
```
### 
[​](#calculator-tool)
Calculator Tool
TypeScript
Python
Copy
```
const calculatorServer = createSdkMcpServer({
 name: "calculator",
 version: "1.0.0",
 tools: [
 tool(
 "calculate",
 "Perform mathematical calculations",
 {
 expression: z.string().describe("Mathematical expression to evaluate"),
 precision: z.number().optional().default(2).describe("Decimal precision")
 },
 async (args) => {
 try {
 // Use a safe math evaluation library in production
 const result = eval(args.expression); // Example only!
 const formatted = Number(result).toFixed(args.precision);
 return {
 content: [{
 type: "text",
 text: `${args.expression} = ${formatted}`
 }]
 };
 } catch (error) {
 return {
 content: [{
 type: "text",
 text: `Error: Invalid expression - ${error.message}`
 }]
 };
 }
 }
 ),
 tool(
 "compound_interest",
 "Calculate compound interest for an investment",
 {
 principal: z.number().positive().describe("Initial investment amount"),
 rate: z.number().describe("Annual interest rate (as decimal, e.g., 0.05 for 5%)"),
 time: z.number().positive().describe("Investment period in years"),
 n: z.number().positive().default(12).describe("Compounding frequency per year")
 },
 async (args) => {
 const amount = args.principal * Math.pow(1 + args.rate / args.n, args.n * args.time);
 const interest = amount - args.principal;
 return {
 content: [{
 type: "text",
 text: `Investment Analysis:\n` +
 `Principal: ${args.principal.toFixed(2)}\n` +
 `Rate: ${(args.rate * 100).toFixed(2)}%\n` +
 `Time: ${args.time} years\n` +
 `Compounding: ${args.n} times per year\n\n` +
 `Final Amount: ${amount.toFixed(2)}\n` +
 `Interest Earned: ${interest.toFixed(2)}\n` +
 `Return: ${((interest / args.principal) * 100).toFixed(2)}%`
 }]
 };
 }
 )
 ]
});
```
## 
[​](#related-documentation)
Related Documentation
 * [TypeScript SDK Reference](/en/api/agent-sdk/typescript)
 * [Python SDK Reference](/en/api/agent-sdk/python)
 * [MCP Documentation](https://modelcontextprotocol.io)
 * [SDK Overview](/en/api/agent-sdk/overview)
Was this page helpful?
YesNo
[MCP in the SDK](/en/api/agent-sdk/mcp)[Subagents in the SDK](/en/api/agent-sdk/subagents)
Assistant
Responses are generated using AI and may contain mistakes.