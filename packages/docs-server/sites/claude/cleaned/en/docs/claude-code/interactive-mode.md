Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Reference
Interactive mode
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
 * [Keyboard shortcuts](#keyboard-shortcuts)
 * [General controls](#general-controls)
 * [Multiline input](#multiline-input)
 * [Quick commands](#quick-commands)
 * [Vim editor mode](#vim-editor-mode)
 * [Mode switching](#mode-switching)
 * [Navigation (NORMAL mode)](#navigation-normal-mode)
 * [Editing (NORMAL mode)](#editing-normal-mode)
 * [Command history](#command-history)
 * [Reverse search with Ctrl+R](#reverse-search-with-ctrl%2Br)
 * [Background bash commands](#background-bash-commands)
 * [How backgrounding works](#how-backgrounding-works)
 * [Bash mode with ! prefix](#bash-mode-with-prefix)
 * [See also](#see-also)
## 
[​](#keyboard-shortcuts)
Keyboard shortcuts
Keyboard shortcuts may vary by platform and terminal. Press `?` to see available shortcuts for your environment.
### 
[​](#general-controls)
General controls
Shortcut | Description | Context 
---|---|--- 
`Ctrl+C` | Cancel current input or generation | Standard interrupt 
`Ctrl+D` | Exit Claude Code session | EOF signal 
`Ctrl+L` | Clear terminal screen | Keeps conversation history 
`Ctrl+O` | Toggle verbose output | Shows detailed tool usage and execution 
`Ctrl+R` | Reverse search command history | Search through previous commands interactively 
`Ctrl+V` (macOS/Linux) or `Alt+V` (Windows) | Paste image from clipboard | Pastes an image or path to an image file 
`Up/Down arrows` | Navigate command history | Recall previous inputs 
`Esc` + `Esc` | Rewind the code/conversation | Restore the code and/or conversation to a previous point 
`Tab` | Toggle [extended thinking](/en/docs/build-with-claude/extended-thinking) | Switch between Thinking on and Thinking off 
`Shift+Tab` or `Alt+M` (some configurations) | Toggle permission modes | Switch between Auto-Accept Mode, Plan Mode, and normal mode 
### 
[​](#multiline-input)
Multiline input
Method | Shortcut | Context 
---|---|--- 
Quick escape | `\` + `Enter` | Works in all terminals 
macOS default | `Option+Enter` | Default on macOS 
Terminal setup | `Shift+Enter` | After `/terminal-setup` 
Control sequence | `Ctrl+J` | Line feed character for multiline 
Paste mode | Paste directly | For code blocks, logs 
Configure your preferred line break behavior in terminal settings. Run `/terminal-setup` to install Shift+Enter binding for iTerm2 and VS Code terminals.
### 
[​](#quick-commands)
Quick commands
Shortcut | Description | Notes 
---|---|--- 
`#` at start | Memory shortcut - add to CLAUDE.md | Prompts for file selection 
`/` at start | Slash command | See [slash commands](/en/docs/claude-code/slash-commands) 
`!` at start | Bash mode | Run commands directly and add execution output to the session 
`@` | File path mention | Trigger file path autocomplete 
## 
[​](#vim-editor-mode)
Vim editor mode
Enable vim-style editing with `/vim` command or configure permanently via `/config`.
### 
[​](#mode-switching)
Mode switching
Command | Action | From mode 
---|---|--- 
`Esc` | Enter NORMAL mode | INSERT 
`i` | Insert before cursor | NORMAL 
`I` | Insert at beginning of line | NORMAL 
`a` | Insert after cursor | NORMAL 
`A` | Insert at end of line | NORMAL 
`o` | Open line below | NORMAL 
`O` | Open line above | NORMAL 
### 
[​](#navigation-normal-mode)
Navigation (NORMAL mode)
Command | Action 
---|--- 
`h`/`j`/`k`/`l` | Move left/down/up/right 
`w` | Next word 
`e` | End of word 
`b` | Previous word 
`0` | Beginning of line 
`$` | End of line 
`^` | First non-blank character 
`gg` | Beginning of input 
`G` | End of input 
### 
[​](#editing-normal-mode)
Editing (NORMAL mode)
Command | Action 
---|--- 
`x` | Delete character 
`dd` | Delete line 
`D` | Delete to end of line 
`dw`/`de`/`db` | Delete word/to end/back 
`cc` | Change line 
`C` | Change to end of line 
`cw`/`ce`/`cb` | Change word/to end/back 
`.` | Repeat last change 
## 
[​](#command-history)
Command history
Claude Code maintains command history for the current session:
 * History is stored per working directory
 * Cleared with `/clear` command
 * Use Up/Down arrows to navigate (see keyboard shortcuts above)
 * **Note** : History expansion (`!`) is disabled by default
### 
[​](#reverse-search-with-ctrl%2Br)
Reverse search with Ctrl+R
Press `Ctrl+R` to interactively search through your command history:
 1. **Start search** : Press `Ctrl+R` to activate reverse history search
 2. **Type query** : Enter text to search for in previous commands - the search term will be highlighted in matching results
 3. **Navigate matches** : Press `Ctrl+R` again to cycle through older matches
 4. **Accept match** :
 * Press `Tab` or `Esc` to accept the current match and continue editing
 * Press `Enter` to accept and execute the command immediately
 5. **Cancel search** :
 * Press `Ctrl+C` to cancel and restore your original input
 * Press `Backspace` on empty search to cancel
The search displays matching commands with the search term highlighted, making it easy to find and reuse previous inputs.
## 
[​](#background-bash-commands)
Background bash commands
Claude Code supports running bash commands in the background, allowing you to continue working while long-running processes execute.
### 
[​](#how-backgrounding-works)
How backgrounding works
When Claude Code runs a command in the background, it runs the command asynchronously and immediately returns a background task ID. Claude Code can respond to new prompts while the command continues executing in the background. To run commands in the background, you can either:
 * Prompt Claude Code to run a command in the background
 * Press Ctrl+B to move a regular Bash tool invocation to the background. (Tmux users must press Ctrl+B twice due to tmux’s prefix key.)
**Key features:**
 * Output is buffered and Claude can retrieve it using the BashOutput tool
 * Background tasks have unique IDs for tracking and output retrieval
 * Background tasks are automatically cleaned up when Claude Code exits
**Common backgrounded commands:**
 * Build tools (webpack, vite, make)
 * Package managers (npm, yarn, pnpm)
 * Test runners (jest, pytest)
 * Development servers
 * Long-running processes (docker, terraform)
### 
[​](#bash-mode-with-prefix)
Bash mode with `!` prefix
Run bash commands directly without going through Claude by prefixing your input with `!`:
Copy
```
! npm test
! git status
! ls -la
```
Bash mode:
 * Adds the command and its output to the conversation context
 * Shows real-time progress and output
 * Supports the same `Ctrl+B` backgrounding for long-running commands
 * Does not require Claude to interpret or approve the command
This is useful for quick shell operations while maintaining conversation context.
## 
[​](#see-also)
See also
 * [Slash commands](/en/docs/claude-code/slash-commands) - Interactive session commands
 * [Checkpointing](/en/docs/claude-code/checkpointing) - Rewind Claude’s edits and restore previous states
 * [CLI reference](/en/docs/claude-code/cli-reference) - Command-line flags and options
 * [Settings](/en/docs/claude-code/settings) - Configuration options
 * [Memory management](/en/docs/claude-code/memory) - Managing CLAUDE.md files
Was this page helpful?
YesNo
[CLI reference](/en/docs/claude-code/cli-reference)[Slash commands](/en/docs/claude-code/slash-commands)
Assistant
Responses are generated using AI and may contain mistakes.