Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Guides
MCP in the SDK
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
 * [Configuration](#configuration)
 * [Basic Configuration](#basic-configuration)
 * [Using MCP Servers in SDK](#using-mcp-servers-in-sdk)
 * [Transport Types](#transport-types)
 * [stdio Servers](#stdio-servers)
 * [HTTP/SSE Servers](#http%2Fsse-servers)
 * [SDK MCP Servers](#sdk-mcp-servers)
 * [Resource Management](#resource-management)
 * [Authentication](#authentication)
 * [Environment Variables](#environment-variables)
 * [OAuth2 Authentication](#oauth2-authentication)
 * [Error Handling](#error-handling)
 * [Related Resources](#related-resources)
## 
[​](#overview)
Overview
Model Context Protocol (MCP) servers extend Claude Code with custom tools and capabilities. MCPs can run as external processes, connect via HTTP/SSE, or execute directly within your SDK application.
## 
[​](#configuration)
Configuration
### 
[​](#basic-configuration)
Basic Configuration
Configure MCP servers in `.mcp.json` at your project root:
TypeScript
Python
Copy
```
{
 "mcpServers": {
 "filesystem": {
 "command": "npx",
 "args": ["@modelcontextprotocol/server-filesystem"],
 "env": {
 "ALLOWED_PATHS": "/Users/me/projects"
 }
 }
 }
}
```
### 
[​](#using-mcp-servers-in-sdk)
Using MCP Servers in SDK
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk";
for await (const message of query({
 prompt: "List files in my project",
 options: {
 mcpServers: {
 "filesystem": {
 command: "npx",
 args: ["@modelcontextprotocol/server-filesystem"],
 env: {
 ALLOWED_PATHS: "/Users/me/projects"
 }
 }
 },
 allowedTools: ["mcp__filesystem__list_files"]
 }
})) {
 if (message.type === "result" && message.subtype === "success") {
 console.log(message.result);
 }
}
```
## 
[​](#transport-types)
Transport Types
### 
[​](#stdio-servers)
stdio Servers
External processes communicating via stdin/stdout:
TypeScript
Python
Copy
```
// .mcp.json configuration
{
 "mcpServers": {
 "my-tool": {
 "command": "node",
 "args": ["./my-mcp-server.js"],
 "env": {
 "DEBUG": "${DEBUG:-false}"
 }
 }
 }
}
```
### 
[​](#http%2Fsse-servers)
HTTP/SSE Servers
Remote servers with network communication:
TypeScript
Python
Copy
```
// SSE server configuration
{
 "mcpServers": {
 "remote-api": {
 "type": "sse",
 "url": "https://api.example.com/mcp/sse",
 "headers": {
 "Authorization": "Bearer ${API_TOKEN}"
 }
 }
 }
}
// HTTP server configuration
{
 "mcpServers": {
 "http-service": {
 "type": "http",
 "url": "https://api.example.com/mcp",
 "headers": {
 "X-API-Key": "${API_KEY}"
 }
 }
 }
}
```
### 
[​](#sdk-mcp-servers)
SDK MCP Servers
In-process servers running within your application. For detailed information on creating custom tools, see the [Custom Tools guide](/en/api/agent-sdk/custom-tools):
## 
[​](#resource-management)
Resource Management
MCP servers can expose resources that Claude can list and read:
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk";
// List available resources
for await (const message of query({
 prompt: "What resources are available from the database server?",
 options: {
 mcpServers: {
 "database": {
 command: "npx",
 args: ["@modelcontextprotocol/server-database"]
 }
 },
 allowedTools: ["mcp__list_resources", "mcp__read_resource"]
 }
})) {
 if (message.type === "result") console.log(message.result);
}
```
## 
[​](#authentication)
Authentication
### 
[​](#environment-variables)
Environment Variables
TypeScript
Python
Copy
```
// .mcp.json with environment variables
{
 "mcpServers": {
 "secure-api": {
 "type": "sse",
 "url": "https://api.example.com/mcp",
 "headers": {
 "Authorization": "Bearer ${API_TOKEN}",
 "X-API-Key": "${API_KEY:-default-key}"
 }
 }
 }
}
// Set environment variables
process.env.API_TOKEN = "your-token";
process.env.API_KEY = "your-key";
```
### 
[​](#oauth2-authentication)
OAuth2 Authentication
OAuth2 MCP authentication in-client is not currently supported.
## 
[​](#error-handling)
Error Handling
Handle MCP connection failures gracefully:
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk";
for await (const message of query({
 prompt: "Process data",
 options: {
 mcpServers: {
 "data-processor": dataServer
 }
 }
})) {
 if (message.type === "system" && message.subtype === "init") {
 // Check MCP server status
 const failedServers = message.mcp_servers.filter(
 s => s.status !== "connected"
 );
 if (failedServers.length > 0) {
 console.warn("Failed to connect:", failedServers);
 }
 }
 if (message.type === "result" && message.subtype === "error_during_execution") {
 console.error("Execution failed");
 }
}
```
## 
[​](#related-resources)
Related Resources
 * [Custom Tools Guide](/en/api/agent-sdk/custom-tools) - Detailed guide on creating SDK MCP servers
 * [TypeScript SDK Reference](/en/api/agent-sdk/typescript)
 * [Python SDK Reference](/en/api/agent-sdk/python)
 * [SDK Permissions](/en/api/agent-sdk/sdk-permissions)
 * [Common Workflows](/en/docs/claude-code/common-workflows)
Was this page helpful?
YesNo
[Modifying system prompts](/en/api/agent-sdk/modifying-system-prompts)[Custom Tools](/en/api/agent-sdk/custom-tools)
Assistant
Responses are generated using AI and may contain mistakes.