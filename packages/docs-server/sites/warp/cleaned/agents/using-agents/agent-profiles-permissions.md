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
 * [Agent Profiles](#agent-profiles)
 * [Agent Permissions](#agent-permissions)
 * [Command allowlist](#command-allowlist)
 * [Command denylist](#command-denylist)
 * [MCP permissions](#mcp-permissions)
 * [Run until completion](#run-until-completion)
Was this helpful?
## 
[](#agent-profiles)
Agent Profiles
Agent Profiles let you configure how your Agent behaves in different situations. Each profile defines the Agent's autonomy, base and planning models, and tool access. You can create multiple profiles and edit them directly in `Settings > AI > Agents > Profiles`.
 * **Default profile** : Every user starts with a default profile, you can edit it at any time, and new profiles will copy its settings as a starting point.
 * **Other profiles** : Set up different profiles for different workflows (e.g., "Safe & cautious", "YOLO mode", etc.). Manage them in the Profiles settings menu. 
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F2zYVbzx95PenR2XetOiZ%252Fimage.png%3Falt%3Dmedia%26token%3Dffbbfc39-1d97-4506-accd-b19b3501d9b8&width=768&dpr=4&quality=100&sign=65d1661d&sv=2)
Agent Profiles in Settings: define how your Agent operates.
**In each Agent Profile, you can configure:**
 * The name of the profile
 * Base and planning models
 * **Base model** : The core engine for your Agent. It handles most interactions and invokes other models when needed (e.g. for planning or code generation). 
 * **Planning model** : Responsible for breaking down complex tasks into actionable steps. It generates structured execution plans and decides how to route work between models.
 * Agent Permissions
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FnZXz56B6b4aSnQQWNoMI%252Fimage.png%3Falt%3Dmedia%26token%3De8b23e91-b5b1-450b-8be9-4259a5d3e67b&width=768&dpr=4&quality=100&sign=2c5f5c08&sv=2)
Agent Profiles in Settings: editting a Profile.
## 
[](#agent-permissions)
Agent Permissions
Agent Permissions let you define how your Agent in a specific Profile operates — control its autonomy, choose what tools or MCP servers it can access, and set when it should act independently or ask for approval. 
You can control how much autonomy the Agent has when performing different types of actions under `Settings > AI > Agents > Profiles > Permissions` . Agent permission types:
 * Apply code diffs
 * Read files
 * Create plans
 * Execute commands
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FLZD6638YFqRCyDMBYfvn%252Fimage.png%3Falt%3Dmedia%26token%3Db934607a-74b0-437d-b862-f1939780c470&width=768&dpr=4&quality=100&sign=7934b253&sv=2)
Fine-tuning agent control: This permissions panel lets users customize how much autonomy the Agent has when applying code diffs, reading files, creating plans, and executing commands.
**Each permission has different levels of autonomy:**
Autonomy level
Description
Agent Decides
Agent will act autonomously when it's confident, but prompt for approval when uncertain. This option balances speed with control, allowing the Agent to go ahead with common workflows while keeping you in the loop for more complex or risky steps.
Always ask
Agent will request explicit user approval before taking any action. Choose this for sensitive actions.
Always allow
Agent will perform the action without ever requesting explicit conformation. Use this for tasks you fully trust the Agent to handle on its own.
Never
Agent will not ever take the action (i.e. Create plans).
_When all Agent permissions are set to Always allow, the Agent gains full autonomy (“YOLO mode”); however, any denylist rules will still override these settings._
### 
[](#command-allowlist)
Command allowlist
The Warp Agent lets you define an allowlist of commands that run automatically without confirmation. It’s empty by default, but users often add read-only commands such as:
 * `which .*` - Find executable locations
 * `ls(\s.*)?` - List directory contents
 * `grep(\s.*)?` - Search file contents
 * `find .*` - Search for files
 * `echo(\s.*)?` - Print text output
You can add your own regular expressions to this list in `Settings > AI > Agents > Command allowlist`. Commands in the allowlist will always auto-execute, even if they are not read-only operations.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F4bNAajTwJJorFDe8kpCD%252Fimage.png%3Falt%3Dmedia%26token%3D9a781923-5715-4b72-bb18-d091fc21b241&width=768&dpr=4&quality=100&sign=481b3056&sv=2)
Command allowlist and denylists as part of an Agent Profile.
### 
[](#command-denylist)
Command denylist
For safety, the Agent always prompts for confirmation before executing potentially risky commands. The default denylist includes several examples, such as:
 * `wget(\s.*)?` - Network downloads
 * `curl(\s.*)?` - Network requests
 * `rm(\s.*)?` - File deletion
 * `eval(\s.*)?` - Shell code execution
The denylist takes precedence over both the allowlist and `Agent decides`. If a command matches the denylist, user permission will always be required, regardless of other settings. You can add your own regular expressions to this list in `Settings > AI > Agents > Command denylist`.
### 
[](#mcp-permissions)
MCP permissions
MCP servers let you extend the Agent with custom tools and data sources using standardized, plugin-like modules.
In this settings menu, you can configure which MCP servers the Agent is allowed to call:
 * Use the MCP allowlist to give the Agent permission to call specific servers without asking.
 * Use the MCP denylist to require approval before calling certain servers, even if they’re also in the allowlist.
 * Or set the Agent to “decide” — it will act autonomously when confident, and ask for confirmation when uncertain.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fb63gwsDEwTIZ8dhGd4me%252Fimage.png%3Falt%3Dmedia%26token%3D04ad1e81-653c-4f81-acb0-1340d0a97664&width=768&dpr=4&quality=100&sign=5fd427ef&sv=2)
Customize how the Agent interacts with MCP servers by choosing between “Agent decides,” allowlist, or denylist settings.
To learn how to build and configure your own MCP server, check out the [MCP feature docs](/knowledge-and-collaboration/mcp).
## 
[](#run-until-completion)
Run until completion
During an Agent interaction, you can give the Agent full autonomy for the current task. When auto-approve is on, every suggested command runs immediately until the task finishes, or you stop it with `Ctrl + C`.
macOS
Windows
Linux
Auto-approve all Agent actions with: `CMD + SHIFT + I`
Auto-approve all Agent actions with: `CTRL + SHIFT + I`
Auto-approve all Agent actions with: `CTRL + SHIFT + I`
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F7F8747WAauEBVZWmGhjh%252Fimage.png%3Falt%3Dmedia%26token%3D8c8e2c57-eba9-4dfb-8db4-c89a57c1f88d&width=768&dpr=4&quality=100&sign=9c824dd6&sv=2)
A button overlay in the lower-right corner lets you enable auto-approve or end the Agent interaction.
_Run until completion_ ignores the denylist entirely. It’s the purest form of “YOLO” mode and essentially a fully “autonomous mode” where the Agent proceeds without asking for confirmation.
[PreviousManaging Agents](/agents/using-agents/managing-agents)[NextAgent Task Lists](/agents/using-agents/agent-tasklists)
Last updated 1 month ago
Was this helpful?