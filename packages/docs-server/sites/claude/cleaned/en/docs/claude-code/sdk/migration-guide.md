Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Agent SDK
Migrate to Claude Agent SDK
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
 * [What’s Changed](#what%E2%80%99s-changed)
 * [Migration Steps](#migration-steps)
 * [For TypeScript/JavaScript Projects](#for-typescript%2Fjavascript-projects)
 * [For Python Projects](#for-python-projects)
 * [Breaking changes](#breaking-changes)
 * [Python: ClaudeCodeOptions renamed to ClaudeAgentOptions](#python%3A-claudecodeoptions-renamed-to-claudeagentoptions)
 * [System prompt no longer default](#system-prompt-no-longer-default)
 * [Settings Sources No Longer Loaded by Default](#settings-sources-no-longer-loaded-by-default)
 * [Why the Rename?](#why-the-rename%3F)
 * [Getting Help](#getting-help)
 * [Next Steps](#next-steps)
## 
[​](#overview)
Overview
The Claude Code SDK has been renamed to the **Claude Agent SDK** and its documentation has been reorganized. This change reflects the SDK’s broader capabilities for building AI agents beyond just coding tasks.
## 
[​](#what%E2%80%99s-changed)
What’s Changed
Aspect | Old | New 
---|---|--- 
**Package Name (TS/JS)** | `@anthropic-ai/claude-code` | `@anthropic-ai/claude-agent-sdk` 
**Python Package** | `claude-code-sdk` | `claude-agent-sdk` 
**Documentation Location** | Claude Code docs → SDK section | API Guide → Agent SDK section 
**Documentation Changes:** The Agent SDK documentation has moved from the Claude Code docs to the API Guide under a dedicated [Agent SDK](/en/api/agent-sdk/overview) section. The Claude Code docs now focus on the CLI tool and automation features.
## 
[​](#migration-steps)
Migration Steps
### 
[​](#for-typescript%2Fjavascript-projects)
For TypeScript/JavaScript Projects
**1. Uninstall the old package:**
Copy
```
npm uninstall @anthropic-ai/claude-code
```
**2. Install the new package:**
Copy
```
npm install @anthropic-ai/claude-agent-sdk
```
**3. Update your imports:** Change all imports from `@anthropic-ai/claude-code` to `@anthropic-ai/claude-agent-sdk`:
Copy
```
// Before
import { query, tool, createSdkMcpServer } from "@anthropic-ai/claude-code";
// After
import {
 query,
 tool,
 createSdkMcpServer,
} from "@anthropic-ai/claude-agent-sdk";
```
**4. Update package.json dependencies:** If you have the package listed in your `package.json`, update it:
Copy
```
// Before
{
 "dependencies": {
 "@anthropic-ai/claude-code": "^1.0.0"
 }
}
// After
{
 "dependencies": {
 "@anthropic-ai/claude-agent-sdk": "^0.1.0"
 }
}
```
That’s it! No other code changes are required.
### 
[​](#for-python-projects)
For Python Projects
**1. Uninstall the old package:**
Copy
```
pip uninstall claude-code-sdk
```
**2. Install the new package:**
Copy
```
pip install claude-agent-sdk
```
**3. Update your imports:** Change all imports from `claude_code_sdk` to `claude_agent_sdk`:
Copy
```
# Before
from claude_code_sdk import query, ClaudeCodeOptions
# After
from claude_agent_sdk import query, ClaudeAgentOptions
```
**4. Update type names:** Change `ClaudeCodeOptions` to `ClaudeAgentOptions`:
Copy
```
# Before
from claude_agent_sdk import query, ClaudeCodeOptions
options = ClaudeCodeOptions(
 model="claude-sonnet-4-5"
)
# After
from claude_agent_sdk import query, ClaudeAgentOptions
options = ClaudeAgentOptions(
 model="claude-sonnet-4-5"
)
```
**5. Review[breaking changes](#breaking-changes)** Make any code changes needed to complete the migration.
## 
[​](#breaking-changes)
Breaking changes
To improve isolation and explicit configuration, Claude Agent SDK v0.1.0 introduces breaking changes for users migrating from Claude Code SDK. Review this section carefully before migrating.
### 
[​](#python%3A-claudecodeoptions-renamed-to-claudeagentoptions)
Python: ClaudeCodeOptions renamed to ClaudeAgentOptions
**What changed:** The Python SDK type `ClaudeCodeOptions` has been renamed to `ClaudeAgentOptions`. **Migration:**
Copy
```
# BEFORE (v0.0.x)
from claude_agent_sdk import query, ClaudeCodeOptions
options = ClaudeCodeOptions(
 model="claude-sonnet-4-5",
 permission_mode="acceptEdits"
)
# AFTER (v0.1.0)
from claude_agent_sdk import query, ClaudeAgentOptions
options = ClaudeAgentOptions(
 model="claude-sonnet-4-5",
 permission_mode="acceptEdits"
)
```
**Why this changed:** The type name now matches the “Claude Agent SDK” branding and provides consistency across the SDK’s naming conventions.
### 
[​](#system-prompt-no-longer-default)
System prompt no longer default
**What changed:** The SDK no longer uses Claude Code’s system prompt by default. **Migration:**
TypeScript
Python
Copy
```
// BEFORE (v0.0.x) - Used Claude Code's system prompt by default
const result = query({ prompt: "Hello" });
// AFTER (v0.1.0) - Uses empty system prompt by default
// To get the old behavior, explicitly request Claude Code's preset:
const result = query({
 prompt: "Hello",
 options: {
 systemPrompt: { type: "preset", preset: "claude_code" }
 }
});
// Or use a custom system prompt:
const result = query({
 prompt: "Hello",
 options: {
 systemPrompt: "You are a helpful coding assistant"
 }
});
```
**Why this changed:** Provides better control and isolation for SDK applications. You can now build agents with custom behavior without inheriting Claude Code’s CLI-focused instructions.
### 
[​](#settings-sources-no-longer-loaded-by-default)
Settings Sources No Longer Loaded by Default
**What changed:** The SDK no longer reads from filesystem settings (CLAUDE.md, settings.json, slash commands, etc.) by default. **Migration:**
TypeScript
Python
Copy
```
// BEFORE (v0.0.x) - Loaded all settings automatically
const result = query({ prompt: "Hello" });
// Would read from:
// - ~/.claude/settings.json (user)
// - .claude/settings.json (project)
// - .claude/settings.local.json (local)
// - CLAUDE.md files
// - Custom slash commands
// AFTER (v0.1.0) - No settings loaded by default
// To get the old behavior:
const result = query({
 prompt: "Hello",
 options: {
 settingSources: ["user", "project", "local"]
 }
});
// Or load only specific sources:
const result = query({
 prompt: "Hello",
 options: {
 settingSources: ["project"] // Only project settings
 }
});
```
**Why this changed:** Ensures SDK applications have predictable behavior independent of local filesystem configurations. This is especially important for:
 * **CI/CD environments** - Consistent behavior without local customizations
 * **Deployed applications** - No dependency on filesystem settings
 * **Testing** - Isolated test environments
 * **Multi-tenant systems** - Prevent settings leakage between users
**Backward compatibility:** If your application relied on filesystem settings (custom slash commands, CLAUDE.md instructions, etc.), add `settingSources: ['user', 'project', 'local']` to your options.
## 
[​](#why-the-rename%3F)
Why the Rename?
The Claude Code SDK was originally designed for coding tasks, but it has evolved into a powerful framework for building all types of AI agents. The new name “Claude Agent SDK” better reflects its capabilities:
 * Building business agents (legal assistants, finance advisors, customer support)
 * Creating specialized coding agents (SRE bots, security reviewers, code review agents)
 * Developing custom agents for any domain with tool use, MCP integration, and more
## 
[​](#getting-help)
Getting Help
If you encounter any issues during migration: **For TypeScript/JavaScript:**
 1. Check that all imports are updated to use `@anthropic-ai/claude-agent-sdk`
 2. Verify your package.json has the new package name
 3. Run `npm install` to ensure dependencies are updated
**For Python:**
 1. Check that all imports are updated to use `claude_agent_sdk`
 2. Verify your requirements.txt or pyproject.toml has the new package name
 3. Run `pip install claude-agent-sdk` to ensure the package is installed
See the [Troubleshooting](/en/docs/claude-code/troubleshooting) guide for common issues.
## 
[​](#next-steps)
Next Steps
 * Explore the [Agent SDK Overview](/en/api/agent-sdk/overview) to learn about available features
 * Check out the [TypeScript SDK Reference](/en/api/agent-sdk/typescript) for detailed API documentation
 * Review the [Python SDK Reference](/en/api/agent-sdk/python) for Python-specific documentation
 * Learn about [Custom Tools](/en/api/agent-sdk/custom-tools) and [MCP Integration](/en/api/agent-sdk/mcp)
Was this page helpful?
YesNo
[OpenAI SDK compatibility](/en/api/openai-sdk)[Overview](/en/api/agent-sdk/overview)
Assistant
Responses are generated using AI and may contain mistakes.