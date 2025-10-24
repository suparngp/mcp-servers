Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Guides
Slash Commands in the SDK
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
 * [Discovering Available Slash Commands](#discovering-available-slash-commands)
 * [Sending Slash Commands](#sending-slash-commands)
 * [Common Slash Commands](#common-slash-commands)
 * [/compact - Compact Conversation History](#%2Fcompact-compact-conversation-history)
 * [/clear - Clear Conversation](#%2Fclear-clear-conversation)
 * [Creating Custom Slash Commands](#creating-custom-slash-commands)
 * [File Locations](#file-locations)
 * [File Format](#file-format)
 * [Basic Example](#basic-example)
 * [With Frontmatter](#with-frontmatter)
 * [Using Custom Commands in the SDK](#using-custom-commands-in-the-sdk)
 * [Advanced Features](#advanced-features)
 * [Arguments and Placeholders](#arguments-and-placeholders)
 * [Bash Command Execution](#bash-command-execution)
 * [File References](#file-references)
 * [Organization with Namespacing](#organization-with-namespacing)
 * [Practical Examples](#practical-examples)
 * [Code Review Command](#code-review-command)
 * [Test Runner Command](#test-runner-command)
 * [See Also](#see-also)
Slash commands provide a way to control Claude Code sessions with special commands that start with `/`. These commands can be sent through the SDK to perform actions like clearing conversation history, compacting messages, or getting help.
## 
[​](#discovering-available-slash-commands)
Discovering Available Slash Commands
The Claude Agent SDK provides information about available slash commands in the system initialization message. Access this information when your session starts:
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk";
for await (const message of query({
 prompt: "Hello Claude",
 options: { maxTurns: 1 }
})) {
 if (message.type === "system" && message.subtype === "init") {
 console.log("Available slash commands:", message.slash_commands);
 // Example output: ["/compact", "/clear", "/help"]
 }
}
```
## 
[​](#sending-slash-commands)
Sending Slash Commands
Send slash commands by including them in your prompt string, just like regular text:
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk";
// Send a slash command
for await (const message of query({
 prompt: "/compact",
 options: { maxTurns: 1 }
})) {
 if (message.type === "result") {
 console.log("Command executed:", message.result);
 }
}
```
## 
[​](#common-slash-commands)
Common Slash Commands
### 
[​](#%2Fcompact-compact-conversation-history)
`/compact` - Compact Conversation History
The `/compact` command reduces the size of your conversation history by summarizing older messages while preserving important context:
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk";
for await (const message of query({
 prompt: "/compact",
 options: { maxTurns: 1 }
})) {
 if (message.type === "system" && message.subtype === "compact_boundary") {
 console.log("Compaction completed");
 console.log("Pre-compaction tokens:", message.compact_metadata.pre_tokens);
 console.log("Trigger:", message.compact_metadata.trigger);
 }
}
```
### 
[​](#%2Fclear-clear-conversation)
`/clear` - Clear Conversation
The `/clear` command starts a fresh conversation by clearing all previous history:
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk";
// Clear conversation and start fresh
for await (const message of query({
 prompt: "/clear",
 options: { maxTurns: 1 }
})) {
 if (message.type === "system" && message.subtype === "init") {
 console.log("Conversation cleared, new session started");
 console.log("Session ID:", message.session_id);
 }
}
```
## 
[​](#creating-custom-slash-commands)
Creating Custom Slash Commands
In addition to using built-in slash commands, you can create your own custom commands that are available through the SDK. Custom commands are defined as markdown files in specific directories, similar to how subagents are configured.
### 
[​](#file-locations)
File Locations
Custom slash commands are stored in designated directories based on their scope:
 * **Project commands** : `.claude/commands/` - Available only in the current project
 * **Personal commands** : `~/.claude/commands/` - Available across all your projects
### 
[​](#file-format)
File Format
Each custom command is a markdown file where:
 * The filename (without `.md` extension) becomes the command name
 * The file content defines what the command does
 * Optional YAML frontmatter provides configuration
#### 
[​](#basic-example)
Basic Example
Create `.claude/commands/refactor.md`:
Copy
```
Refactor the selected code to improve readability and maintainability.
Focus on clean code principles and best practices.
```
This creates the `/refactor` command that you can use through the SDK.
#### 
[​](#with-frontmatter)
With Frontmatter
Create `.claude/commands/security-check.md`:
Copy
```
---
allowed-tools: Read, Grep, Glob
description: Run security vulnerability scan
model: claude-sonnet-4-5-20250929
---
Analyze the codebase for security vulnerabilities including:
- SQL injection risks
- XSS vulnerabilities
- Exposed credentials
- Insecure configurations
```
### 
[​](#using-custom-commands-in-the-sdk)
Using Custom Commands in the SDK
Once defined in the filesystem, custom commands are automatically available through the SDK:
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk";
// Use a custom command
for await (const message of query({
 prompt: "/refactor src/auth/login.ts",
 options: { maxTurns: 3 }
})) {
 if (message.type === "assistant") {
 console.log("Refactoring suggestions:", message.message);
 }
}
// Custom commands appear in the slash_commands list
for await (const message of query({
 prompt: "Hello",
 options: { maxTurns: 1 }
})) {
 if (message.type === "system" && message.subtype === "init") {
 // Will include both built-in and custom commands
 console.log("Available commands:", message.slash_commands);
 // Example: ["/compact", "/clear", "/help", "/refactor", "/security-check"]
 }
}
```
### 
[​](#advanced-features)
Advanced Features
#### 
[​](#arguments-and-placeholders)
Arguments and Placeholders
Custom commands support dynamic arguments using placeholders: Create `.claude/commands/fix-issue.md`:
Copy
```
---
argument-hint: [issue-number] [priority]
description: Fix a GitHub issue
---
Fix issue #$1 with priority $2.
Check the issue description and implement the necessary changes.
```
Use in SDK:
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk";
// Pass arguments to custom command
for await (const message of query({
 prompt: "/fix-issue 123 high",
 options: { maxTurns: 5 }
})) {
 // Command will process with $1="123" and $2="high"
 if (message.type === "result") {
 console.log("Issue fixed:", message.result);
 }
}
```
#### 
[​](#bash-command-execution)
Bash Command Execution
Custom commands can execute bash commands and include their output: Create `.claude/commands/git-commit.md`:
Copy
```
---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
description: Create a git commit
---
## Context
- Current status: !`git status`
- Current diff: !`git diff HEAD`
## Task
Create a git commit with appropriate message based on the changes.
```
#### 
[​](#file-references)
File References
Include file contents using the `@` prefix: Create `.claude/commands/review-config.md`:
Copy
```
---
description: Review configuration files
---
Review the following configuration files for issues:
- Package config: @package.json
- TypeScript config: @tsconfig.json
- Environment config: @.env
Check for security issues, outdated dependencies, and misconfigurations.
```
### 
[​](#organization-with-namespacing)
Organization with Namespacing
Organize commands in subdirectories for better structure:
Copy
```
.claude/commands/
├── frontend/
│ ├── component.md # Creates /component (project:frontend)
│ └── style-check.md # Creates /style-check (project:frontend)
├── backend/
│ ├── api-test.md # Creates /api-test (project:backend)
│ └── db-migrate.md # Creates /db-migrate (project:backend)
└── review.md # Creates /review (project)
```
The subdirectory appears in the command description but doesn’t affect the command name itself.
### 
[​](#practical-examples)
Practical Examples
#### 
[​](#code-review-command)
Code Review Command
Create `.claude/commands/code-review.md`:
Copy
```
---
allowed-tools: Read, Grep, Glob, Bash(git diff:*)
description: Comprehensive code review
---
## Changed Files
!`git diff --name-only HEAD~1`
## Detailed Changes
!`git diff HEAD~1`
## Review Checklist
Review the above changes for:
1. Code quality and readability
2. Security vulnerabilities
3. Performance implications
4. Test coverage
5. Documentation completeness
Provide specific, actionable feedback organized by priority.
```
#### 
[​](#test-runner-command)
Test Runner Command
Create `.claude/commands/test.md`:
Copy
```
---
allowed-tools: Bash, Read, Edit
argument-hint: [test-pattern]
description: Run tests with optional pattern
---
Run tests matching pattern: $ARGUMENTS
1. Detect the test framework (Jest, pytest, etc.)
2. Run tests with the provided pattern
3. If tests fail, analyze and fix them
4. Re-run to verify fixes
```
Use these commands through the SDK:
TypeScript
Python
Copy
```
import { query } from "@anthropic-ai/claude-agent-sdk";
// Run code review
for await (const message of query({
 prompt: "/code-review",
 options: { maxTurns: 3 }
})) {
 // Process review feedback
}
// Run specific tests
for await (const message of query({
 prompt: "/test auth",
 options: { maxTurns: 5 }
})) {
 // Handle test results
}
```
## 
[​](#see-also)
See Also
 * [Slash Commands](/en/docs/claude-code/slash-commands) - Complete slash command documentation
 * [Subagents in the SDK](/en/api/agent-sdk/subagents) - Similar filesystem-based configuration for subagents
 * [TypeScript SDK reference](/en/docs/claude-code/typescript-sdk-reference) - Complete API documentation
 * [SDK overview](/en/api/agent-sdk/overview) - General SDK concepts
 * [CLI reference](/en/docs/claude-code/cli-reference) - Command-line interface
Was this page helpful?
YesNo
[Subagents in the SDK](/en/api/agent-sdk/subagents)[Tracking Costs and Usage](/en/api/agent-sdk/cost-tracking)
Assistant
Responses are generated using AI and may contain mistakes.