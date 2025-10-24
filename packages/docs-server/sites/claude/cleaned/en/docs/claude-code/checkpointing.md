Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Reference
Checkpointing
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
 * [How checkpoints work](#how-checkpoints-work)
 * [Automatic tracking](#automatic-tracking)
 * [Rewinding changes](#rewinding-changes)
 * [Common use cases](#common-use-cases)
 * [Limitations](#limitations)
 * [Bash command changes not tracked](#bash-command-changes-not-tracked)
 * [External changes not tracked](#external-changes-not-tracked)
 * [Not a replacement for version control](#not-a-replacement-for-version-control)
 * [See also](#see-also)
Claude Code automatically tracks Claude’s file edits as you work, allowing you to quickly undo changes and rewind to previous states if anything gets off track.
## 
[​](#how-checkpoints-work)
How checkpoints work
As you work with Claude, checkpointing automatically captures the state of your code before each edit. This safety net lets you pursue ambitious, wide-scale tasks knowing you can always return to a prior code state.
### 
[​](#automatic-tracking)
Automatic tracking
Claude Code tracks all changes made by its file editing tools:
 * Every user prompt creates a new checkpoint
 * Checkpoints persist across sessions, so you can access them in resumed conversations
 * Automatically cleaned up along with sessions after 30 days (configurable)
### 
[​](#rewinding-changes)
Rewinding changes
Press `Esc` twice (`Esc` + `Esc`) or use the `/rewind` command to open up the rewind menu. You can choose to restore:
 * **Conversation only** : Rewind to a user message while keeping code changes
 * **Code only** : Revert file changes while keeping the conversation
 * **Both code and conversation** : Restore both to a prior point in the session
## 
[​](#common-use-cases)
Common use cases
Checkpoints are particularly useful when:
 * **Exploring alternatives** : Try different implementation approaches without losing your starting point
 * **Recovering from mistakes** : Quickly undo changes that introduced bugs or broke functionality
 * **Iterating on features** : Experiment with variations knowing you can revert to working states
## 
[​](#limitations)
Limitations
### 
[​](#bash-command-changes-not-tracked)
Bash command changes not tracked
Checkpointing does not track files modified by bash commands. For example, if Claude Code runs:
Copy
```
rm file.txt
mv old.txt new.txt
cp source.txt dest.txt
```
These file modifications cannot be undone through rewind. Only direct file edits made through Claude’s file editing tools are tracked.
### 
[​](#external-changes-not-tracked)
External changes not tracked
Checkpointing only tracks files that have been edited within the current session. Manual changes you make to files outside of Claude Code and edits from other concurrent sessions are normally not captured, unless they happen to modify the same files as the current session.
### 
[​](#not-a-replacement-for-version-control)
Not a replacement for version control
Checkpoints are designed for quick, session-level recovery. For permanent version history and collaboration:
 * Continue using version control (ex. Git) for commits, branches, and long-term history
 * Checkpoints complement but don’t replace proper version control
 * Think of checkpoints as “local undo” and Git as “permanent history”
## 
[​](#see-also)
See also
 * [Interactive mode](/en/docs/claude-code/interactive-mode) - Keyboard shortcuts and session controls
 * [Slash commands](/en/docs/claude-code/slash-commands) - Accessing checkpoints using `/rewind`
 * [CLI reference](/en/docs/claude-code/cli-reference) - Command-line options
Was this page helpful?
YesNo
[Slash commands](/en/docs/claude-code/slash-commands)[Hooks reference](/en/docs/claude-code/hooks)
Assistant
Responses are generated using AI and may contain mistakes.