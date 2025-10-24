Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Agent SDK
Agent SDK overview
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
 * [Installation](#installation)
 * [SDK Options](#sdk-options)
 * [Why use the Claude Agent SDK?](#why-use-the-claude-agent-sdk%3F)
 * [What can you build with the SDK?](#what-can-you-build-with-the-sdk%3F)
 * [Core Concepts](#core-concepts)
 * [Authentication](#authentication)
 * [Full Claude Code Feature Support](#full-claude-code-feature-support)
 * [System Prompts](#system-prompts)
 * [Tool Permissions](#tool-permissions)
 * [Model Context Protocol (MCP)](#model-context-protocol-mcp)
 * [Reporting Bugs](#reporting-bugs)
 * [Changelog](#changelog)
 * [Related Resources](#related-resources)
The Claude Code SDK has been renamed to the **Claude Agent SDK**. If you’re migrating from the old SDK, see the [Migration Guide](/en/docs/claude-code/sdk/migration-guide).
## 
[​](#installation)
Installation
TypeScript
Python
Copy
```
npm install @anthropic-ai/claude-agent-sdk
```
## 
[​](#sdk-options)
SDK Options
The Claude Agent SDK is available in multiple forms to suit different use cases:
 * **[TypeScript SDK](/en/api/agent-sdk/typescript)** - For Node.js and web applications
 * **[Python SDK](/en/api/agent-sdk/python)** - For Python applications and data science
 * **[Streaming vs Single Mode](/en/api/agent-sdk/streaming-vs-single-mode)** - Understanding input modes and best practices
## 
[​](#why-use-the-claude-agent-sdk%3F)
Why use the Claude Agent SDK?
Built on top of the agent harness that powers Claude Code, the Claude Agent SDK provides all the building blocks you need to build production-ready agents. Taking advantage of the work we’ve done on Claude Code including:
 * **Context Management** : Automatic compaction and context management to ensure your agent doesn’t run out of context.
 * **Rich tool ecosystem** : File operations, code execution, web search, and MCP extensibility
 * **Advanced permissions** : Fine-grained control over agent capabilities
 * **Production essentials** : Built-in error handling, session management, and monitoring
 * **Optimized Claude integration** : Automatic prompt caching and performance optimizations
## 
[​](#what-can-you-build-with-the-sdk%3F)
What can you build with the SDK?
Here are some example agent types you can create: **Coding agents:**
 * SRE agents that diagnose and fix production issues
 * Security review bots that audit code for vulnerabilities
 * Oncall engineering assistants that triage incidents
 * Code review agents that enforce style and best practices
**Business agents:**
 * Legal assistants that review contracts and compliance
 * Finance advisors that analyze reports and forecasts
 * Customer support agents that resolve technical issues
 * Content creation assistants for marketing teams
## 
[​](#core-concepts)
Core Concepts
### 
[​](#authentication)
Authentication
For basic authentication, retrieve an Claude API key from the [Claude Console](https://console.anthropic.com/) and set the `ANTHROPIC_API_KEY` environment variable. The SDK also supports authentication via third-party API providers:
 * **Amazon Bedrock** : Set `CLAUDE_CODE_USE_BEDROCK=1` environment variable and configure AWS credentials
 * **Google Vertex AI** : Set `CLAUDE_CODE_USE_VERTEX=1` environment variable and configure Google Cloud credentials
For detailed configuration instructions for third-party providers, see the [Amazon Bedrock](/en/docs/claude-code/amazon-bedrock) and [Google Vertex AI](/en/docs/claude-code/google-vertex-ai) documentation.
Unless previously approved, we do not allow third party developers to apply Claude.ai rate limits for their products, including agents built on the Claude Agent SDK. Please use the API key authentication methods described in this document instead.
### 
[​](#full-claude-code-feature-support)
Full Claude Code Feature Support
The SDK provides access to all the default features available in Claude Code, leveraging the same file system-based configuration:
 * **Subagents** : Launch specialized agents stored as Markdown files in `./.claude/agents/`
 * **Hooks** : Execute custom commands configured in `./.claude/settings.json` that respond to tool events
 * **Slash Commands** : Use custom commands defined as Markdown files in `./.claude/commands/`
 * **Memory (CLAUDE.md)** : Maintain project context through `CLAUDE.md` or `.claude/CLAUDE.md` files in your project directory, or `~/.claude/CLAUDE.md` for user-level instructions. To load these files, you must explicitly set `settingSources: ['project']` (TypeScript) or `setting_sources=["project"]` (Python) in your options. See [Modifying system prompts](/en/api/agent-sdk/modifying-system-prompts#method-1-claudemd-files-project-level-instructions) for details.
These features work identically to their Claude Code counterparts by reading from the same file system locations.
### 
[​](#system-prompts)
System Prompts
System prompts define your agent’s role, expertise, and behavior. This is where you specify what kind of agent you’re building.
### 
[​](#tool-permissions)
Tool Permissions
Control which tools your agent can use with fine-grained permissions:
 * `allowedTools` - Explicitly allow specific tools
 * `disallowedTools` - Block specific tools
 * `permissionMode` - Set overall permission strategy
### 
[​](#model-context-protocol-mcp)
Model Context Protocol (MCP)
Extend your agents with custom tools and integrations through MCP servers. This allows you to connect to databases, APIs, and other external services.
## 
[​](#reporting-bugs)
Reporting Bugs
If you encounter bugs or issues with the Agent SDK:
 * **TypeScript SDK** : [Report issues on GitHub](https://github.com/anthropics/claude-agent-sdk-typescript/issues)
 * **Python SDK** : [Report issues on GitHub](https://github.com/anthropics/claude-agent-sdk-python/issues)
## 
[​](#changelog)
Changelog
View the full changelog for SDK updates, bug fixes, and new features:
 * **TypeScript SDK** : [View CHANGELOG.md](https://github.com/anthropics/claude-agent-sdk-typescript/blob/main/CHANGELOG.md)
 * **Python SDK** : [View CHANGELOG.md](https://github.com/anthropics/claude-agent-sdk-python/blob/main/CHANGELOG.md)
## 
[​](#related-resources)
Related Resources
 * [CLI Reference](/en/docs/claude-code/cli-reference) - Complete CLI documentation
 * [GitHub Actions Integration](/en/docs/claude-code/github-actions) - Automate your GitHub workflow
 * [MCP Documentation](/en/docs/claude-code/mcp) - Extend Claude with custom tools
 * [Common Workflows](/en/docs/claude-code/common-workflows) - Step-by-step guides
 * [Troubleshooting](/en/docs/claude-code/troubleshooting) - Common issues and solutions
Was this page helpful?
YesNo
[Migrate to Claude Agent SDK](/en/docs/claude-code/sdk/migration-guide)[TypeScript SDK](/en/api/agent-sdk/typescript)
Assistant
Responses are generated using AI and may contain mistakes.