[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * * [Quickstart Guided](/)
 * [Installation and setup](/getting-started/readme/installation-and-setup)
 * [Coding in Warp](/getting-started/readme/coding-in-warp)
 * [Agents in Warp](/getting-started/readme/agents-in-warp)
 * [Customizing Warp](/getting-started/readme/customizing-warp)
 * [Migrate to Warp](/getting-started/migrate-to-warp)
 * [Supported Shells](/getting-started/supported-shells)
 * [Keyboard Shortcuts](/getting-started/keyboard-shortcuts)
 * [Changelog](/getting-started/changelog)
 * * [Agents Overview](/agents/agents-overview)
 * [Using Agents](/agents/using-agents)
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
 * [Agent Autonomy](#agent-autonomy)
 * [Agent Profiles](#agent-profiles)
 * [Managing multiple agents](#managing-multiple-agents)
Was this helpful?
Describe what you want to do (_you can even use your voice_), and Warp’s agents will intelligently take action using your environment, codebase, and saved context to tailor their responses.
**Agents can:**
 1. Write and edit code across single or multiple files.
 2. Fix errors based on output or stack traces.
 3. Execute shell commands and use the output to guide next steps
 4. Automatically recover from common errors and retry with adjustments.
 5. Learn and integrate with any tool that offers public docs or `--help`.
 6. Leverage your saved [Warp Drive](https://docs.warp.dev/knowledge-and-collaboration/warp-drive) contents, [MCP servers](https://docs.warp.dev/knowledge-and-collaboration/mcp), and [Rules](https://docs.warp.dev/knowledge-and-collaboration/rules) to provide tailored responses.
**Give this prompt a try —**[ _open the below Prompt in Warp_](https://app.warp.dev/drive/prompt/Clone-and-install-Warps-themes-repository-PkK9Zw16SCD3JKzOUoGuj4)
Copy```
Detect my current operating system. Based on that, navigate to the appropriate Warp themes directory (e.g. ~/.warp/ on macOS). 
Then, clone the official Warp themes repository using SSH ([email protected][](/cdn-cgi/l/email-protection):warpdotdev/themes.git) into that directory, following the structure and instructions provided in the repo’s README. If SSH does not work, try HTTPS (https://github.com/warpdotdev/themes.git) or via the GitHub CLI (gh repo clone warpdotdev/themes).
```
### 
[](#agent-autonomy)
Agent Autonomy
Under `Settings > AI > Agents > Permissions`, you can control how much autonomy the agent has when performing different types of actions, such as:
 * Reading files
 * Creating plans
 * Executing commands
 * Calling MCP servers, and more
For each action, you can set the autonomy level to one of the following:
 * Let the agent decide
 * Always prompt for confirmation
 * Always allow
 * Never
You can also configure an **allowlist** and **denylist** for specific commands you always want to run—either with or without confirmation.
### 
[](#agent-profiles)
Agent Profiles
Define profiles in `Settings > AI` with unique permissions and model choices. You can switch profiles at any time by clicking the "profile" icon in Warp's input area. In addition to your default permissions, you may create:
 * YOLO mode: Loose permissions for using in personal projects
 * Prod mode: Limit AI permissions to "Always Ask" when in high-risk environments like your production server
### 
[](#managing-multiple-agents)
Managing multiple agents
You can run multiple agents in Warp simultaneously, monitor their status, and step in when needed—without losing track of what’s happening across your sessions. Each tab includes a [status icon](https://docs.warp.dev/agents/using-agents/managing-agents#agent-status-indicators) that shows the agent’s current state. All of your active agents are tracked in the [Agent Management Panel](https://docs.warp.dev/agents/using-agents/managing-agents#agent-management-panel), located in the top-right corner next to your avatar.
Agents will also [notify](https://docs.warp.dev/agents/using-agents/managing-agents#agent-status-indicators) you when they need input, such as permission to run a command or approval to apply a code diff. This lets you focus on other work, knowing you’ll be alerted when your attention is required.
[PreviousCoding in Warp](/getting-started/readme/coding-in-warp)[NextCustomizing Warp](/getting-started/readme/customizing-warp)
Last updated 1 month ago
Was this helpful?