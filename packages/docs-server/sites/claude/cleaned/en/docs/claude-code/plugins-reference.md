Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Reference
Plugins reference
[Welcome](/en/home)[Claude Developer Platform](/en/docs/intro)[Claude Code](/en/docs/claude-code/overview)[Model Context Protocol (MCP)](/en/docs/mcp)[API Reference](/en/api/messages)[Resources](/en/resources/overview)[Release Notes](/en/release-notes/overview)
##### Getting started
 * [Overview](/en/docs/claude-code/overview)
 * [Quickstart](/en/docs/claude-code/quickstart)
 * [Common workflows](/en/docs/claude-code/common-workflows)
 * [Claude Code on the web](/en/docs/claude-code/claude-code-on-the-web)
##### Build with Claude Code
 * [Subagents](/en/docs/claude-code/sub-agents)
 * [Plugins](/en/docs/claude-code/plugins)
 * [Agent Skills](/en/docs/claude-code/skills)
 * [Output styles](/en/docs/claude-code/output-styles)
 * [Hooks](/en/docs/claude-code/hooks-guide)
 * [Headless mode](/en/docs/claude-code/headless)
 * [GitHub Actions](/en/docs/claude-code/github-actions)
 * [GitLab CI/CD](/en/docs/claude-code/gitlab-ci-cd)
 * [Model Context Protocol (MCP)](/en/docs/claude-code/mcp)
 * [Troubleshooting](/en/docs/claude-code/troubleshooting)
##### Claude Agent SDK
 * [Migrate to Claude Agent SDK](/en/docs/claude-code/sdk/migration-guide)
##### Deployment
 * [Overview](/en/docs/claude-code/third-party-integrations)
 * [Amazon Bedrock](/en/docs/claude-code/amazon-bedrock)
 * [Google Vertex AI](/en/docs/claude-code/google-vertex-ai)
 * [Network configuration](/en/docs/claude-code/network-config)
 * [LLM gateway](/en/docs/claude-code/llm-gateway)
 * [Development containers](/en/docs/claude-code/devcontainer)
 * [Sandboxing](/en/docs/claude-code/sandboxing)
##### Administration
 * [Advanced installation](/en/docs/claude-code/setup)
 * [Identity and Access Management](/en/docs/claude-code/iam)
 * [Security](/en/docs/claude-code/security)
 * [Data usage](/en/docs/claude-code/data-usage)
 * [Monitoring](/en/docs/claude-code/monitoring-usage)
 * [Costs](/en/docs/claude-code/costs)
 * [Analytics](/en/docs/claude-code/analytics)
 * [Plugin marketplaces](/en/docs/claude-code/plugin-marketplaces)
##### Configuration
 * [Settings](/en/docs/claude-code/settings)
 * [Visual Studio Code](/en/docs/claude-code/vs-code)
 * [JetBrains IDEs](/en/docs/claude-code/jetbrains)
 * [Terminal configuration](/en/docs/claude-code/terminal-config)
 * [Model configuration](/en/docs/claude-code/model-config)
 * [Memory management](/en/docs/claude-code/memory)
 * [Status line configuration](/en/docs/claude-code/statusline)
##### Reference
 * [CLI reference](/en/docs/claude-code/cli-reference)
 * [Interactive mode](/en/docs/claude-code/interactive-mode)
 * [Slash commands](/en/docs/claude-code/slash-commands)
 * [Checkpointing](/en/docs/claude-code/checkpointing)
 * [Hooks reference](/en/docs/claude-code/hooks)
 * [Plugins reference](/en/docs/claude-code/plugins-reference)
##### Resources
 * [Legal and compliance](/en/docs/claude-code/legal-and-compliance)
On this page
 * [Plugin components reference](#plugin-components-reference)
 * [Commands](#commands)
 * [Agents](#agents)
 * [Skills](#skills)
 * [Hooks](#hooks)
 * [MCP servers](#mcp-servers)
 * [Plugin manifest schema](#plugin-manifest-schema)
 * [Complete schema](#complete-schema)
 * [Required fields](#required-fields)
 * [Metadata fields](#metadata-fields)
 * [Component path fields](#component-path-fields)
 * [Path behavior rules](#path-behavior-rules)
 * [Environment variables](#environment-variables)
 * [Plugin directory structure](#plugin-directory-structure)
 * [Standard plugin layout](#standard-plugin-layout)
 * [File locations reference](#file-locations-reference)
 * [Debugging and development tools](#debugging-and-development-tools)
 * [Debugging commands](#debugging-commands)
 * [Common issues](#common-issues)
 * [Distribution and versioning reference](#distribution-and-versioning-reference)
 * [Version management](#version-management)
For hands-on tutorials and practical usage, see [Plugins](/en/docs/claude-code/plugins). For plugin management across teams and communities, see [Plugin marketplaces](/en/docs/claude-code/plugin-marketplaces).
This reference provides complete technical specifications for the Claude Code plugin system, including component schemas, CLI commands, and development tools.
## 
[​](#plugin-components-reference)
Plugin components reference
This section documents the five types of components that plugins can provide.
### 
[​](#commands)
Commands
Plugins add custom slash commands that integrate seamlessly with Claude Code’s command system. **Location** : `commands/` directory in plugin root **File format** : Markdown files with frontmatter For complete details on plugin command structure, invocation patterns, and features, see [Plugin commands](/en/docs/claude-code/slash-commands#plugin-commands).
### 
[​](#agents)
Agents
Plugins can provide specialized subagents for specific tasks that Claude can invoke automatically when appropriate. **Location** : `agents/` directory in plugin root **File format** : Markdown files describing agent capabilities **Agent structure** :
Copy
```
---
description: What this agent specializes in
capabilities: ["task1", "task2", "task3"]
---
# Agent Name
Detailed description of the agent's role, expertise, and when Claude should invoke it.
## Capabilities
- Specific task the agent excels at
- Another specialized capability
- When to use this agent vs others
## Context and examples
Provide examples of when this agent should be used and what kinds of problems it solves.
```
**Integration points** :
 * Agents appear in the `/agents` interface
 * Claude can invoke agents automatically based on task context
 * Agents can be invoked manually by users
 * Plugin agents work alongside built-in Claude agents
### 
[​](#skills)
Skills
Plugins can provide Agent Skills that extend Claude’s capabilities. Skills are model-invoked—Claude autonomously decides when to use them based on the task context. **Location** : `skills/` directory in plugin root **File format** : Directories containing `SKILL.md` files with frontmatter **Skill structure** :
Copy
```
skills/
├── pdf-processor/
│ ├── SKILL.md
│ ├── reference.md (optional)
│ └── scripts/ (optional)
└── code-reviewer/
 └── SKILL.md
```
**Integration behavior** :
 * Plugin Skills are automatically discovered when the plugin is installed
 * Claude autonomously invokes Skills based on matching task context
 * Skills can include supporting files alongside SKILL.md
For SKILL.md format and complete Skill authoring guidance, see:
 * [Use Skills in Claude Code](/en/docs/claude-code/skills)
 * [Agent Skills overview](/en/docs/agents-and-tools/agent-skills/overview#skill-structure)
### 
[​](#hooks)
Hooks
Plugins can provide event handlers that respond to Claude Code events automatically. **Location** : `hooks/hooks.json` in plugin root, or inline in plugin.json **Format** : JSON configuration with event matchers and actions **Hook configuration** :
Copy
```
{
 "hooks": {
 "PostToolUse": [
 {
 "matcher": "Write|Edit",
 "hooks": [
 {
 "type": "command",
 "command": "${CLAUDE_PLUGIN_ROOT}/scripts/format-code.sh"
 }
 ]
 }
 ]
 }
}
```
**Available events** :
 * `PreToolUse`: Before Claude uses any tool
 * `PostToolUse`: After Claude uses any tool
 * `UserPromptSubmit`: When user submits a prompt
 * `Notification`: When Claude Code sends notifications
 * `Stop`: When Claude attempts to stop
 * `SubagentStop`: When a subagent attempts to stop
 * `SessionStart`: At the beginning of sessions
 * `SessionEnd`: At the end of sessions
 * `PreCompact`: Before conversation history is compacted
**Hook types** :
 * `command`: Execute shell commands or scripts
 * `validation`: Validate file contents or project state
 * `notification`: Send alerts or status updates
### 
[​](#mcp-servers)
MCP servers
Plugins can bundle Model Context Protocol (MCP) servers to connect Claude Code with external tools and services. **Location** : `.mcp.json` in plugin root, or inline in plugin.json **Format** : Standard MCP server configuration **MCP server configuration** :
Copy
```
{
 "mcpServers": {
 "plugin-database": {
 "command": "${CLAUDE_PLUGIN_ROOT}/servers/db-server",
 "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"],
 "env": {
 "DB_PATH": "${CLAUDE_PLUGIN_ROOT}/data"
 }
 },
 "plugin-api-client": {
 "command": "npx",
 "args": ["@company/mcp-server", "--plugin-mode"],
 "cwd": "${CLAUDE_PLUGIN_ROOT}"
 }
 }
}
```
**Integration behavior** :
 * Plugin MCP servers start automatically when the plugin is enabled
 * Servers appear as standard MCP tools in Claude’s toolkit
 * Server capabilities integrate seamlessly with Claude’s existing tools
 * Plugin servers can be configured independently of user MCP servers
* * *
## 
[​](#plugin-manifest-schema)
Plugin manifest schema
The `plugin.json` file defines your plugin’s metadata and configuration. This section documents all supported fields and options.
### 
[​](#complete-schema)
Complete schema
Copy
```
{
 "name": "plugin-name",
 "version": "1.2.0",
 "description": "Brief plugin description",
 "author": {
 "name": "Author Name",
 "email": "[email protected][](/cdn-cgi/l/email-protection)",
 "url": "https://github.com/author"
 },
 "homepage": "https://docs.example.com/plugin",
 "repository": "https://github.com/author/plugin",
 "license": "MIT",
 "keywords": ["keyword1", "keyword2"],
 "commands": ["./custom/commands/special.md"],
 "agents": "./custom/agents/",
 "hooks": "./config/hooks.json",
 "mcpServers": "./mcp-config.json"
}
```
### 
[​](#required-fields)
Required fields
Field | Type | Description | Example 
---|---|---|--- 
`name` | string | Unique identifier (kebab-case, no spaces) | `"deployment-tools"` 
### 
[​](#metadata-fields)
Metadata fields
Field | Type | Description | Example 
---|---|---|--- 
`version` | string | Semantic version | `"2.1.0"` 
`description` | string | Brief explanation of plugin purpose | `"Deployment automation tools"` 
`author` | object | Author information | `{"name": "Dev Team", "email": "[email protected][](/cdn-cgi/l/email-protection)"}` 
`homepage` | string | Documentation URL | `"https://docs.example.com"` 
`repository` | string | Source code URL | `"https://github.com/user/plugin"` 
`license` | string | License identifier | `"MIT"`, `"Apache-2.0"` 
`keywords` | array | Discovery tags | `["deployment", "ci-cd"]` 
### 
[​](#component-path-fields)
Component path fields
Field | Type | Description | Example 
---|---|---|--- 
`commands` | string|array | Additional command files/directories | `"./custom/cmd.md"` or `["./cmd1.md"]` 
`agents` | string|array | Additional agent files | `"./custom/agents/"` 
`hooks` | string|object | Hook config path or inline config | `"./hooks.json"` 
`mcpServers` | string|object | MCP config path or inline config | `"./mcp.json"` 
### 
[​](#path-behavior-rules)
Path behavior rules
**Important** : Custom paths supplement default directories - they don’t replace them.
 * If `commands/` exists, it’s loaded in addition to custom command paths
 * All paths must be relative to plugin root and start with `./`
 * Commands from custom paths use the same naming and namespacing rules
 * Multiple paths can be specified as arrays for flexibility
**Path examples** :
Copy
```
{
 "commands": [
 "./specialized/deploy.md",
 "./utilities/batch-process.md"
 ],
 "agents": [
 "./custom-agents/reviewer.md",
 "./custom-agents/tester.md"
 ]
}
```
### 
[​](#environment-variables)
Environment variables
**`${CLAUDE_PLUGIN_ROOT}`**: Contains the absolute path to your plugin directory. Use this in hooks, MCP servers, and scripts to ensure correct paths regardless of installation location.
Copy
```
{
 "hooks": {
 "PostToolUse": [
 {
 "hooks": [
 {
 "type": "command",
 "command": "${CLAUDE_PLUGIN_ROOT}/scripts/process.sh"
 }
 ]
 }
 ]
 }
}
```
* * *
## 
[​](#plugin-directory-structure)
Plugin directory structure
### 
[​](#standard-plugin-layout)
Standard plugin layout
A complete plugin follows this structure:
Copy
```
enterprise-plugin/
├── .claude-plugin/ # Metadata directory
│ └── plugin.json # Required: plugin manifest
├── commands/ # Default command location
│ ├── status.md
│ └── logs.md
├── agents/ # Default agent location
│ ├── security-reviewer.md
│ ├── performance-tester.md
│ └── compliance-checker.md
├── skills/ # Agent Skills
│ ├── code-reviewer/
│ │ └── SKILL.md
│ └── pdf-processor/
│ ├── SKILL.md
│ └── scripts/
├── hooks/ # Hook configurations
│ ├── hooks.json # Main hook config
│ └── security-hooks.json # Additional hooks
├── .mcp.json # MCP server definitions
├── scripts/ # Hook and utility scripts
│ ├── security-scan.sh
│ ├── format-code.py
│ └── deploy.js
├── LICENSE # License file
└── CHANGELOG.md # Version history
```
The `.claude-plugin/` directory contains the `plugin.json` file. All other directories (commands/, agents/, skills/, hooks/) must be at the plugin root, not inside `.claude-plugin/`.
### 
[​](#file-locations-reference)
File locations reference
Component | Default Location | Purpose 
---|---|--- 
**Manifest** | `.claude-plugin/plugin.json` | Required metadata file 
**Commands** | `commands/` | Slash command markdown files 
**Agents** | `agents/` | Subagent markdown files 
**Skills** | `skills/` | Agent Skills with SKILL.md files 
**Hooks** | `hooks/hooks.json` | Hook configuration 
**MCP servers** | `.mcp.json` | MCP server definitions 
* * *
## 
[​](#debugging-and-development-tools)
Debugging and development tools
### 
[​](#debugging-commands)
Debugging commands
Use `claude --debug` to see plugin loading details:
Copy
```
claude --debug
```
This shows:
 * Which plugins are being loaded
 * Any errors in plugin manifests
 * Command, agent, and hook registration
 * MCP server initialization
### 
[​](#common-issues)
Common issues
Issue | Cause | Solution 
---|---|--- 
Plugin not loading | Invalid `plugin.json` | Validate JSON syntax 
Commands not appearing | Wrong directory structure | Ensure `commands/` at root, not in `.claude-plugin/` 
Hooks not firing | Script not executable | Run `chmod +x script.sh` 
MCP server fails | Missing `${CLAUDE_PLUGIN_ROOT}` | Use variable for all plugin paths 
Path errors | Absolute paths used | All paths must be relative and start with `./` 
* * *
## 
[​](#distribution-and-versioning-reference)
Distribution and versioning reference
### 
[​](#version-management)
Version management
Follow semantic versioning for plugin releases:
Copy
```
## See also
- [Plugins](/en/docs/claude-code/plugins) - Tutorials and practical usage
- [Plugin marketplaces](/en/docs/claude-code/plugin-marketplaces) - Creating and managing marketplaces
- [Slash commands](/en/docs/claude-code/slash-commands) - Command development details
- [Subagents](/en/docs/claude-code/sub-agents) - Agent configuration and capabilities
- [Agent Skills](/en/docs/claude-code/skills) - Extend Claude's capabilities
- [Hooks](/en/docs/claude-code/hooks) - Event handling and automation
- [MCP](/en/docs/claude-code/mcp) - External tool integration
- [Settings](/en/docs/claude-code/settings) - Configuration options for plugins
```
Was this page helpful?
YesNo
[Hooks reference](/en/docs/claude-code/hooks)[Legal and compliance](/en/docs/claude-code/legal-and-compliance)
Assistant
Responses are generated using AI and may contain mistakes.