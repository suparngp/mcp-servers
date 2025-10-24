Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Guides
Subagents in the SDK
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
 * [Benefits of Using Subagents](#benefits-of-using-subagents)
 * [Context Management](#context-management)
 * [Parallelization](#parallelization)
 * [Specialized Instructions and Knowledge](#specialized-instructions-and-knowledge)
 * [Tool Restrictions](#tool-restrictions)
 * [Creating Subagents](#creating-subagents)
 * [Programmatic Definition (Recommended)](#programmatic-definition-recommended)
 * [AgentDefinition Configuration](#agentdefinition-configuration)
 * [Filesystem-Based Definition (Alternative)](#filesystem-based-definition-alternative)
 * [How the SDK Uses Subagents](#how-the-sdk-uses-subagents)
 * [Example Subagents](#example-subagents)
 * [SDK Integration Patterns](#sdk-integration-patterns)
 * [Automatic Invocation](#automatic-invocation)
 * [Explicit Invocation](#explicit-invocation)
 * [Dynamic Agent Configuration](#dynamic-agent-configuration)
 * [Tool Restrictions](#tool-restrictions-2)
 * [Common Tool Combinations](#common-tool-combinations)
 * [Related Documentation](#related-documentation)
Subagents in the Claude Agent SDK are specialized AIs that are orchestrated by the main agent. Use subagents for context management and parallelization. This guide explains how to define and use subagents in the SDK using the `agents` parameter.
## 
[​](#overview)
Overview
Subagents can be defined in two ways when using the SDK:
 1. **Programmatically** - Using the `agents` parameter in your `query()` options (recommended for SDK applications)
 2. **Filesystem-based** - Placing markdown files with YAML frontmatter in designated directories (`.claude/agents/`)
This guide primarily focuses on the programmatic approach using the `agents` parameter, which provides a more integrated development experience for SDK applications.
## 
[​](#benefits-of-using-subagents)
Benefits of Using Subagents
### 
[​](#context-management)
Context Management
Subagents maintain separate context from the main agent, preventing information overload and keeping interactions focused. This isolation ensures that specialized tasks don’t pollute the main conversation context with irrelevant details. **Example** : A `research-assistant` subagent can explore dozens of files and documentation pages without cluttering the main conversation with all the intermediate search results - only returning the relevant findings.
### 
[​](#parallelization)
Parallelization
Multiple subagents can run concurrently, dramatically speeding up complex workflows. **Example** : During a code review, you can run `style-checker`, `security-scanner`, and `test-coverage` subagents simultaneously, reducing review time from minutes to seconds.
### 
[​](#specialized-instructions-and-knowledge)
Specialized Instructions and Knowledge
Each subagent can have tailored system prompts with specific expertise, best practices, and constraints. **Example** : A `database-migration` subagent can have detailed knowledge about SQL best practices, rollback strategies, and data integrity checks that would be unnecessary noise in the main agent’s instructions.
### 
[​](#tool-restrictions)
Tool Restrictions
Subagents can be limited to specific tools, reducing the risk of unintended actions. **Example** : A `doc-reviewer` subagent might only have access to Read and Grep tools, ensuring it can analyze but never accidentally modify your documentation files.
## 
[​](#creating-subagents)
Creating Subagents
### 
[​](#programmatic-definition-recommended)
Programmatic Definition (Recommended)
Define subagents directly in your code using the `agents` parameter:
Copy
```
import { query } from '@anthropic-ai/claude-agent-sdk';
const result = query({
 prompt: "Review the authentication module for security issues",
 options: {
 agents: {
 'code-reviewer': {
 description: 'Expert code review specialist. Use for quality, security, and maintainability reviews.',
 prompt: `You are a code review specialist with expertise in security, performance, and best practices.
When reviewing code:
- Identify security vulnerabilities
- Check for performance issues
- Verify adherence to coding standards
- Suggest specific improvements
Be thorough but concise in your feedback.`,
 tools: ['Read', 'Grep', 'Glob'],
 model: 'sonnet'
 },
 'test-runner': {
 description: 'Runs and analyzes test suites. Use for test execution and coverage analysis.',
 prompt: `You are a test execution specialist. Run tests and provide clear analysis of results.
Focus on:
- Running test commands
- Analyzing test output
- Identifying failing tests
- Suggesting fixes for failures`,
 tools: ['Bash', 'Read', 'Grep'],
 }
 }
 }
});
for await (const message of result) {
 console.log(message);
}
```
### 
[​](#agentdefinition-configuration)
AgentDefinition Configuration
Field | Type | Required | Description 
---|---|---|--- 
`description` | `string` | Yes | Natural language description of when to use this agent 
`prompt` | `string` | Yes | The agent’s system prompt defining its role and behavior 
`tools` | `string[]` | No | Array of allowed tool names. If omitted, inherits all tools 
`model` | `'sonnet' | 'opus' | 'haiku' | 'inherit'` | No | Model override for this agent. Defaults to main model if omitted 
### 
[​](#filesystem-based-definition-alternative)
Filesystem-Based Definition (Alternative)
You can also define subagents as markdown files in specific directories:
 * **Project-level** : `.claude/agents/*.md` - Available only in the current project
 * **User-level** : `~/.claude/agents/*.md` - Available across all projects
Each subagent is a markdown file with YAML frontmatter:
Copy
```
---
name: code-reviewer
description: Expert code review specialist. Use for quality, security, and maintainability reviews.
tools: Read, Grep, Glob, Bash
---
Your subagent's system prompt goes here. This defines the subagent's
role, capabilities, and approach to solving problems.
```
**Note:** Programmatically defined agents (via the `agents` parameter) take precedence over filesystem-based agents with the same name.
## 
[​](#how-the-sdk-uses-subagents)
How the SDK Uses Subagents
When using the Claude Agent SDK, subagents can be defined programmatically or loaded from the filesystem. Claude will:
 1. **Load programmatic agents** from the `agents` parameter in your options
 2. **Auto-detect filesystem agents** from `.claude/agents/` directories (if not overridden)
 3. **Invoke them automatically** based on task matching and the agent’s `description`
 4. **Use their specialized prompts** and tool restrictions
 5. **Maintain separate context** for each subagent invocation
Programmatically defined agents (via `agents` parameter) take precedence over filesystem-based agents with the same name.
## 
[​](#example-subagents)
Example Subagents
For comprehensive examples of subagents including code reviewers, test runners, debuggers, and security auditors, see the [main Subagents guide](/en/docs/claude-code/sub-agents#example-subagents). The guide includes detailed configurations and best practices for creating effective subagents.
## 
[​](#sdk-integration-patterns)
SDK Integration Patterns
### 
[​](#automatic-invocation)
Automatic Invocation
The SDK will automatically invoke appropriate subagents based on the task context. Ensure your agent’s `description` field clearly indicates when it should be used:
Copy
```
const result = query({
 prompt: "Optimize the database queries in the API layer",
 options: {
 agents: {
 'performance-optimizer': {
 description: 'Use PROACTIVELY when code changes might impact performance. MUST BE USED for optimization tasks.',
 prompt: 'You are a performance optimization specialist...',
 tools: ['Read', 'Edit', 'Bash', 'Grep'],
 model: 'sonnet'
 }
 }
 }
});
```
### 
[​](#explicit-invocation)
Explicit Invocation
Users can request specific subagents in their prompts:
Copy
```
const result = query({
 prompt: "Use the code-reviewer agent to check the authentication module",
 options: {
 agents: {
 'code-reviewer': {
 description: 'Expert code review specialist',
 prompt: 'You are a security-focused code reviewer...',
 tools: ['Read', 'Grep', 'Glob']
 }
 }
 }
});
```
### 
[​](#dynamic-agent-configuration)
Dynamic Agent Configuration
You can dynamically configure agents based on your application’s needs:
Copy
```
import { query, type AgentDefinition } from '@anthropic-ai/claude-agent-sdk';
function createSecurityAgent(securityLevel: 'basic' | 'strict'): AgentDefinition {
 return {
 description: 'Security code reviewer',
 prompt: `You are a ${securityLevel === 'strict' ? 'strict' : 'balanced'} security reviewer...`,
 tools: ['Read', 'Grep', 'Glob'],
 model: securityLevel === 'strict' ? 'opus' : 'sonnet'
 };
}
const result = query({
 prompt: "Review this PR for security issues",
 options: {
 agents: {
 'security-reviewer': createSecurityAgent('strict')
 }
 }
});
```
## 
[​](#tool-restrictions-2)
Tool Restrictions
Subagents can have restricted tool access via the `tools` field:
 * **Omit the field** - Agent inherits all available tools (default)
 * **Specify tools** - Agent can only use listed tools
Example of a read-only analysis agent:
Copy
```
const result = query({
 prompt: "Analyze the architecture of this codebase",
 options: {
 agents: {
 'code-analyzer': {
 description: 'Static code analysis and architecture review',
 prompt: `You are a code architecture analyst. Analyze code structure,
identify patterns, and suggest improvements without making changes.`,
 tools: ['Read', 'Grep', 'Glob'] // No write or execute permissions
 }
 }
 }
});
```
### 
[​](#common-tool-combinations)
Common Tool Combinations
**Read-only agents** (analysis, review):
Copy
```
tools: ['Read', 'Grep', 'Glob']
```
**Test execution agents** :
Copy
```
tools: ['Bash', 'Read', 'Grep']
```
**Code modification agents** :
Copy
```
tools: ['Read', 'Edit', 'Write', 'Grep', 'Glob']
```
## 
[​](#related-documentation)
Related Documentation
 * [Main Subagents Guide](/en/docs/claude-code/sub-agents) - Comprehensive subagent documentation
 * [SDK Overview](/en/api/agent-sdk/overview) - Overview of Claude Agent SDK
 * [Settings](/en/docs/claude-code/settings) - Configuration file reference
 * [Slash Commands](/en/docs/claude-code/slash-commands) - Custom command creation
Was this page helpful?
YesNo
[Custom Tools](/en/api/agent-sdk/custom-tools)[Slash Commands in the SDK](/en/api/agent-sdk/slash-commands)
Assistant
Responses are generated using AI and may contain mistakes.