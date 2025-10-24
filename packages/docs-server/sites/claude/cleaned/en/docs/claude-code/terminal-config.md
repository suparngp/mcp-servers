Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Configuration
Optimize your terminal setup
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
 * [Themes and appearance](#themes-and-appearance)
 * [Line breaks](#line-breaks)
 * [Set up Shift+Enter (VS Code or iTerm2):](#set-up-shift%2Benter-vs-code-or-iterm2-%3A)
 * [Set up Option+Enter (VS Code, iTerm2 or macOS Terminal.app):](#set-up-option%2Benter-vs-code%2C-iterm2-or-macos-terminal-app-%3A)
 * [Notification setup](#notification-setup)
 * [iTerm 2 system notifications](#iterm-2-system-notifications)
 * [Custom notification hooks](#custom-notification-hooks)
 * [Handling large inputs](#handling-large-inputs)
 * [Vim Mode](#vim-mode)
### 
[​](#themes-and-appearance)
Themes and appearance
Claude cannot control the theme of your terminal. That’s handled by your terminal application. You can match Claude Code’s theme to your terminal any time via the `/config` command. For additional customization of the Claude Code interface itself, you can configure a [custom status line](/en/docs/claude-code/statusline) to display contextual information like the current model, working directory, or git branch at the bottom of your terminal.
### 
[​](#line-breaks)
Line breaks
You have several options for entering linebreaks into Claude Code:
 * **Quick escape** : Type `\` followed by Enter to create a newline
 * **Keyboard shortcut** : Set up a keybinding to insert a newline
#### 
[​](#set-up-shift%2Benter-vs-code-or-iterm2-%3A)
Set up Shift+Enter (VS Code or iTerm2):
Run `/terminal-setup` within Claude Code to automatically configure Shift+Enter.
#### 
[​](#set-up-option%2Benter-vs-code%2C-iterm2-or-macos-terminal-app-%3A)
Set up Option+Enter (VS Code, iTerm2 or macOS Terminal.app):
**For Mac Terminal.app:**
 1. Open Settings → Profiles → Keyboard
 2. Check “Use Option as Meta Key”
**For iTerm2 and VS Code terminal:**
 1. Open Settings → Profiles → Keys
 2. Under General, set Left/Right Option key to “Esc+“
### 
[​](#notification-setup)
Notification setup
Never miss when Claude completes a task with proper notification configuration:
#### 
[​](#iterm-2-system-notifications)
iTerm 2 system notifications
For iTerm 2 alerts when tasks complete:
 1. Open iTerm 2 Preferences
 2. Navigate to Profiles → Terminal
 3. Enable “Silence bell” and Filter Alerts → “Send escape sequence-generated alerts”
 4. Set your preferred notification delay
Note that these notifications are specific to iTerm 2 and not available in the default macOS Terminal.
#### 
[​](#custom-notification-hooks)
Custom notification hooks
For advanced notification handling, you can create [notification hooks](/en/docs/claude-code/hooks#notification) to run your own logic.
### 
[​](#handling-large-inputs)
Handling large inputs
When working with extensive code or long instructions:
 * **Avoid direct pasting** : Claude Code may struggle with very long pasted content
 * **Use file-based workflows** : Write content to a file and ask Claude to read it
 * **Be aware of VS Code limitations** : The VS Code terminal is particularly prone to truncating long pastes
### 
[​](#vim-mode)
Vim Mode
Claude Code supports a subset of Vim keybindings that can be enabled with `/vim` or configured via `/config`. The supported subset includes:
 * Mode switching: `Esc` (to NORMAL), `i`/`I`, `a`/`A`, `o`/`O` (to INSERT)
 * Navigation: `h`/`j`/`k`/`l`, `w`/`e`/`b`, `0`/`$`/`^`, `gg`/`G`
 * Editing: `x`, `dw`/`de`/`db`/`dd`/`D`, `cw`/`ce`/`cb`/`cc`/`C`, `.` (repeat)
Was this page helpful?
YesNo
[JetBrains IDEs](/en/docs/claude-code/jetbrains)[Model configuration](/en/docs/claude-code/model-config)
Assistant
Responses are generated using AI and may contain mistakes.