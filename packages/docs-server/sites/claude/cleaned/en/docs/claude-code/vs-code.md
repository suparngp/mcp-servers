Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Configuration
Visual Studio Code
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
 * [VS Code Extension (Beta)](#vs-code-extension-beta)
 * [Features](#features)
 * [Requirements](#requirements)
 * [Installation](#installation)
 * [How It Works](#how-it-works)
 * [Using Third-Party Providers (Vertex and Bedrock)](#using-third-party-providers-vertex-and-bedrock)
 * [Environment Variables](#environment-variables)
 * [Not Yet Implemented](#not-yet-implemented)
 * [Security Considerations](#security-considerations)
 * [Legacy CLI Integration](#legacy-cli-integration)
 * [Troubleshooting](#troubleshooting)
 * [Extension Not Installing](#extension-not-installing)
 * [Legacy Integration Not Working](#legacy-integration-not-working)
![Claude Code VS Code Extension Interface](https://mintcdn.com/anthropic-claude-docs/Xfpgr-ckk38MZnw3/images/vs-code-extension-interface.jpg?fit=max&auto=format&n=Xfpgr-ckk38MZnw3&q=85&s=600835067c8b03557a0529978e3f0261)
## 
[​](#vs-code-extension-beta)
VS Code Extension (Beta)
The VS Code extension, available in beta, lets you see Claude’s changes in real-time through a native graphical interface integrated directly into your IDE. The VS Code extension makes it easier to access and interact with Claude Code for users who prefer a visual interface over the terminal.
### 
[​](#features)
Features
The VS Code extension provides:
 * **Native IDE experience** : Dedicated Claude Code sidebar panel accessed via the Spark icon
 * **Plan mode with editing** : Review and edit Claude’s plans before accepting them
 * **Auto-accept edits mode** : Automatically apply Claude’s changes as they’re made
 * **File management** : @-mention files or attach files and images using the system file picker
 * **MCP server usage** : Use Model Context Protocol servers configured through the CLI
 * **Conversation history** : Easy access to past conversations
 * **Multiple sessions** : Run multiple Claude Code sessions simultaneously
 * **Keyboard shortcuts** : Support for most shortcuts from the CLI
 * **Slash commands** : Access most CLI slash commands directly in the extension
### 
[​](#requirements)
Requirements
 * VS Code 1.98.0 or higher
### 
[​](#installation)
Installation
Download and install the extension from the [Visual Studio Code Extension Marketplace](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code).
### 
[​](#how-it-works)
How It Works
Once installed, you can start using Claude Code through the VS Code interface:
 1. Click the Spark icon in your editor’s sidebar to open the Claude Code panel
 2. Prompt Claude Code in the same way you would in the terminal
 3. Watch as Claude analyzes your code and suggests changes
 4. Review and accept edits directly in the interface
 * **Tip** : Drag the sidebar wider to see inline diffs, then click on them to expand for full details
### 
[​](#using-third-party-providers-vertex-and-bedrock)
Using Third-Party Providers (Vertex and Bedrock)
The VS Code extension supports using Claude Code with third-party providers like Amazon Bedrock and Google Vertex AI. When configured with these providers, the extension will not prompt for login. To use third-party providers, configure environment variables in the VS Code extension settings:
 1. Open VS Code settings
 2. Search for “Claude Code: Environment Variables”
 3. Add the required environment variables
#### 
[​](#environment-variables)
Environment Variables
Variable | Description | Required | Example 
---|---|---|--- 
`CLAUDE_CODE_USE_BEDROCK` | Enable Amazon Bedrock integration | Required for Bedrock | `"1"` or `"true"` 
`CLAUDE_CODE_USE_VERTEX` | Enable Google Vertex AI integration | Required for Vertex AI | `"1"` or `"true"` 
`ANTHROPIC_API_KEY` | API key for third-party access | Required | `"your-api-key"` 
`AWS_REGION` | AWS region for Bedrock | | `"us-east-2"` 
`AWS_PROFILE` | AWS profile for Bedrock authentication | | `"your-profile"` 
`CLOUD_ML_REGION` | Region for Vertex AI | | `"global"` or `"us-east5"` 
`ANTHROPIC_VERTEX_PROJECT_ID` | GCP project ID for Vertex AI | | `"your-project-id"` 
`ANTHROPIC_MODEL` | Override primary model | Override model ID | `"us.anthropic.claude-3-7-sonnet-20250219-v1:0"` 
`ANTHROPIC_SMALL_FAST_MODEL` | Override small/fast model | Optional | `"us.anthropic.claude-3-5-haiku-20241022-v1:0"` 
`CLAUDE_CODE_SKIP_AUTH_LOGIN` | Disable all prompts to login | Optional | `"1"` or `"true"` 
For detailed setup instructions and additional configuration options, see:
 * [Claude Code on Amazon Bedrock](/en/docs/claude-code/amazon-bedrock)
 * [Claude Code on Google Vertex AI](/en/docs/claude-code/google-vertex-ai)
### 
[​](#not-yet-implemented)
Not Yet Implemented
The following features are not yet available in the VS Code extension:
 * **Full MCP server configuration** : You need to [configure MCP servers through the CLI](/en/docs/claude-code/mcp) first, then the extension will use them
 * **Subagents configuration** : Configure [subagents through the CLI](/en/docs/claude-code/sub-agents) to use them in VS Code
 * **Checkpoints** : Save and restore conversation state at specific points
 * **Advanced shortcuts** :
 * `#` shortcut to add to memory
 * `!` shortcut to run bash commands directly
 * **Tab completion** : File path completion with tab key
We are working on adding these features in future updates.
## 
[​](#security-considerations)
Security Considerations
When Claude Code runs in VS Code with auto-edit permissions enabled, it may be able to modify IDE configuration files that can be automatically executed by your IDE. This may increase the risk of running Claude Code in auto-edit mode and allow bypassing Claude Code’s permission prompts for bash execution. When running in VS Code, consider:
 * Enabling [VS Code Restricted Mode](https://code.visualstudio.com/docs/editor/workspace-trust#_restricted-mode) for untrusted workspaces
 * Using manual approval mode for edits
 * Taking extra care to ensure Claude is only used with trusted prompts
## 
[​](#legacy-cli-integration)
Legacy CLI Integration
The first VS Code integration that we released allows Claude Code running in the terminal to interact with your IDE. It provides selection context sharing (current selection/tab is automatically shared with Claude Code), diff viewing in the IDE instead of terminal, file reference shortcuts (`Cmd+Option+K` on Mac or `Alt+Ctrl+K` on Windows/Linux to insert file references like @File#L1-99), and automatic diagnostic sharing (lint and syntax errors). The legacy integration auto-installs when you run `claude` from VS Code’s integrated terminal. Simply run `claude` from the terminal and all features activate. For external terminals, use the `/ide` command to connect Claude Code to your VS Code instance. To configure, run `claude`, enter `/config`, and set the diff tool to `auto` for automatic IDE detection. Both the extension and CLI integration work with Visual Studio Code, Cursor, Windsurf, and VSCodium.
## 
[​](#troubleshooting)
Troubleshooting
### 
[​](#extension-not-installing)
Extension Not Installing
 * Ensure you have a compatible version of VS Code (1.85.0 or later)
 * Check that VS Code has permission to install extensions
 * Try installing directly from the marketplace website
### 
[​](#legacy-integration-not-working)
Legacy Integration Not Working
 * Ensure you’re running Claude Code from VS Code’s integrated terminal
 * Ensure the CLI for your IDE variant is installed:
 * VS Code: `code` command should be available
 * Cursor: `cursor` command should be available
 * Windsurf: `windsurf` command should be available
 * VSCodium: `codium` command should be available
 * If the command isn’t installed:
 1. Open command palette with `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
 2. Search for “Shell Command: Install ‘code’ command in PATH” (or equivalent for your IDE)
For additional help, see our [troubleshooting guide](/en/docs/claude-code/troubleshooting).
Was this page helpful?
YesNo
[Settings](/en/docs/claude-code/settings)[JetBrains IDEs](/en/docs/claude-code/jetbrains)
Assistant
Responses are generated using AI and may contain mistakes.