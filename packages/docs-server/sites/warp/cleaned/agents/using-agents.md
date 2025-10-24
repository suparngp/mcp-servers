[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * * [Quickstart Guided](/)
 * [Migrate to Warp](/getting-started/migrate-to-warp)
 * [Supported Shells](/getting-started/supported-shells)
 * [Keyboard Shortcuts](/getting-started/keyboard-shortcuts)
 * [Changelog](/getting-started/changelog)
 * * [Agents Overview](/agents/agents-overview)
 * [Using Agents](/agents/using-agents)
 * [Agent Conversations](/agents/using-agents/agent-conversations)
 * [Agent Context](/agents/using-agents/agent-context)
 * [Managing Agents](/agents/using-agents/managing-agents)
 * [Agent Profiles & Permissions](/agents/using-agents/agent-profiles-permissions)
 * [Agent Task Lists](/agents/using-agents/agent-tasklists)
 * [Model Choice](/agents/using-agents/model-choice)
 * [Slash Commands](/agents/slash-commands)
 * [Active AI](/agents/active-ai)
 * [Generate](/agents/generate)
 * [Voice](/agents/voice)
 * [AI FAQs](/agents/ai-faqs)
 * * [Code Overview](/code/code-overview)
 * [Code Editor](/code/code-editor)
 * [Codebase Context](/code/codebase-context)
 * [Code Review](/code/code-review)
 * [Code Diffs in Agent Conversations](/code/reviewing-code)
 * * [Universal Input](/terminal/universal-input)
 * [Appearance](/terminal/appearance)
 * [Blocks](/terminal/blocks)
 * [Modern Text Editing](/terminal/editor)
 * [Command Entry](/terminal/entry)
 * [Command Completions](/terminal/command-completions)
 * [Command Palette](/terminal/command-palette)
 * [Session Management](/terminal/sessions)
 * [Window Management](/terminal/windows)
 * [Warpify](/terminal/warpify)
 * [More Features](/terminal/more-features)
 * [Comparisons](/terminal/comparisons)
 * [Integrations](/terminal/integrations-and-plugins)
 * * [Warp Drive](/knowledge-and-collaboration/warp-drive)
 * [Model Context Protocol (MCP)](/knowledge-and-collaboration/mcp)
 * [Rules](/knowledge-and-collaboration/rules)
 * [Teams](/knowledge-and-collaboration/teams)
 * [Admin Panel](/knowledge-and-collaboration/admin-panel)
 * [Session Sharing](/knowledge-and-collaboration/session-sharing)
 * * [Warp CLI](/developers/cli)
 * * [Privacy](/privacy/privacy)
 * [Secret Redaction](/privacy/secret-redaction)
 * [Network Log](/privacy/network-log)
 * * [Refer a Friend & Earn Rewards](/community/refer-a-friend)
 * [Warp Preview & Alpha Program](/community/warp-preview-and-alpha-program)
 * * [Sending Feedback & Logs](/support-and-billing/sending-us-feedback)
 * [Plans & Pricing](/support-and-billing/plans-and-pricing)
 * [Updating Warp](/support-and-billing/updating-warp)
 * [Using Warp Offline](/support-and-billing/using-warp-offline)
 * [Logging Out & Uninstalling](/support-and-billing/uninstalling-warp)
 * [Known Issues](/support-and-billing/known-issues)
 * [Troubleshooting Login](/support-and-billing/troubleshooting-login-issues)
 * [Open Source Licenses](/support-and-billing/licenses)
[Powered by GitBook](https://www.gitbook.com/?utm_source=content&utm_medium=trademark&utm_campaign=-MbqIgTw17KQvq_DQuRr)
 * [Agents in Warp](#agents-in-warp)
 * [What is Agent Mode?](#what-is-agent-mode)
 * [Entering Agent Mode](#entering-agent-mode)
 * [Models Powering Agent Mode](#models-powering-agent-mode)
 * [Demo: Starting a Coding Task with Warp](#demo-starting-a-coding-task-with-warp)
Was this helpful?
## 
[](#agents-in-warp)
Agents in Warp
Agents in Warp let you go beyond manual commands by collaborating with AI directly inside the [Agentic Development Environment](https://www.warp.dev/blog/reimagining-coding-agentic-development-environment). You can describe a task in natural language, and the Agent will translate it into runnable commands, manage context, and break complex requests into clear steps.
Agents are designed to work alongside you. They never act without visibility, and you remain in control of their autonomy and permissions.
**Key concepts related to Agents include:**
 * Agent Mode — run terminal or coding workflows with natural language.
 * [Conversations](/agents/using-agents/agent-conversations) — group queries and blocks for a specific task.
 * [Context](/agents/using-agents/agent-context) — attach and manage information to improve responses.
 * [Task Lists](/agents/using-agents/agent-tasklists) — break complex requests into clear, trackable steps.
 * [Agent Management](/agents/using-agents/managing-agents) — monitor, configure, and control active agents.
 * [Profiles and Permissions](/agents/using-agents/agent-profiles-permissions) — customize autonomy, tools, and behavior.
To make sure you can fully use Agents, confirm that the global AI toggle is enabled under `Settings > AI`.
## 
[](#what-is-agent-mode)
What is Agent Mode?
Agent Mode is the primary way to interact with Warp’s Agent. It lets you run terminal or coding workflows by typing plain English instead of shell commands or IDE operations. When you enter a request, Warp uses leading LLMs to interpret it, suggest or run the right commands , surface code diffs when applicable, and stream results directly into your session, all tailored to your environment and setup. **Agent Mode can:**
 1. Understand natural language input, not just command syntax.
 2. Execute commands and use their output to guide the next step.
 3. Correct itself when it encounters mistakes or errors occur.
 4. Learn and integrate with any service that has public docs or `--help`.
 5. Leverage saved workflows, project context, and other guidelines to improve accuracy.
### 
[](#entering-agent-mode)
Entering Agent Mode
Agent Mode is how you interact directly with Warp’s AI to ask questions, run tasks, and collaborate in natural language. There are multiple ways to enter Agent Mode depending on where you are in your workflow:
macOS
Windows
Linux
 * Type natural language directly: If auto-detection is enabled, you can type a task or question into the input, and Warp will recognize it as natural language using its local auto-detection feature.
 * Use keyboard shortcuts: Quickly toggle into Agent Mode with `CMD + I`.
 * Attach blocks to a prompt: From any block you want to use as context, click the ✨ icon in the toolbelt or select Attach block(s) to AI query from the block’s context menu.
 * Type natural language directly: If auto-detection is enabled, you can type a task or question into the input, and Warp will recognize it as natural language using its local auto-detection feature.
 * Use keyboard shortcuts: Quickly toggle into Agent Mode with `CTRL + I`.
 * Attach blocks to a prompt: From any block you want to use as context, click the ✨ icon in the toolbelt or select Attach block(s) to AI query from the block’s context menu.
 * Type natural language directly: If auto-detection is enabled, you can type a task or question into the input, and Warp will recognize it as natural language using its local auto-detection feature.
 * Use keyboard shortcuts: Quickly toggle into Agent Mode with `CTRL + I`.
 * Attach blocks to a prompt: From any block you want to use as context, click the ✨ icon in the toolbelt or select Attach block(s) to AI query from the block’s context menu.
When you’re in Agent Mode, the **Agent icon** will be highlighted in the [Universal Input](/terminal/universal-input).
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FbaMyDG98RwA7Q1QuUaO8%252Fimage.png%3Falt%3Dmedia%26token%3Df0b75834-97ad-4b6e-a302-e4d56d0bed3a&width=768&dpr=4&quality=100&sign=62ef9c05&sv=2)
The Agent icon in the Universal input indicates that Agent Mode is active.
In Classic Input, you’ll also see a ✨ sparkles indicator inline. 
![The sparkles on the command line indicate Agent Mode is active.](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-f886e83dea97c4d46e3af7e2ee5274d8da4c79a1%252Fundo_my_git_commit.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=474c68b4&sv=2)
The sparkles in the Classic input indicates that Agent Mode is active.
By default, entering Agent Mode starts you in _Pair Mode_ , where you can continue an ongoing conversation by asking follow-up questions or assigning tasks. From here, you can ask the agent to build, debug, fix, or even deploy code as needed.
### 
[](#models-powering-agent-mode)
Models Powering Agent Mode
Agent Mode is backed by a curated selection of leading large language models (LLMs). By default, Warp uses **Claude 4 Sonnet** for "auto", balancing speed and quality. 
However, you can switch to other supported models at any time based on your needs—for example, choosing a faster model for quick iterations or a more advanced model for complex reasoning.
For the full list of available models and guidance on when to use each, see [Model Choice](/agents/using-agents/model-choice).
### 
[](#demo-starting-a-coding-task-with-warp)
Demo: Starting a Coding Task with Warp
Here's an example from [Warp University](https://www.warp.dev/university), where Zach demonstrates a quick fix using Warp’s Agents to code:
[PreviousAgents Overview](/agents/agents-overview)[NextAgent Conversations](/agents/using-agents/agent-conversations)
Last updated 1 month ago
Was this helpful?