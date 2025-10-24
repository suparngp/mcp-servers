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
 * [Agent status indicators](#agent-status-indicators)
 * [Agent Management Panel](#agent-management-panel)
 * [In-app agent notifications](#in-app-agent-notifications)
 * [Autonomy and controls](#autonomy-and-controls)
 * [Demo: Using multiple agents at once in Warp](#demo-using-multiple-agents-at-once-in-warp)
Was this helpful?
Warp’s agent management system is designed to support complex, multi-agent workflows across multiple terminal panes. You can run several agents at once, monitor their status, and step in when needed, without losing track of what’s happening across your sessions.
Agents will notify you when they need input, such as permission to run a command or approval to apply a code diff. This allows you to shift focus to other work, knowing you’ll be alerted when intervention is required. At any point, you can cancel an agent that’s stuck or going in circles. The agent will pause and wait for your input before continuing the task.
This page covers how agent statuses are displayed, how to use the Agent Management Panel, how notifications work, and how to configure agent autonomy and permissions.
### 
[](#agent-status-indicators)
**Agent status indicators**
Each tab that contains an agent conversation will display a status icon indicating the agent’s current state.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FkagAmrrGVHsWeNpO5f62%252FScreenshot%25202025-06-17%2520at%25201.52.11%25E2%2580%25AFPM.png%3Falt%3Dmedia%26token%3De3453b2c-755f-4ff3-91bd-e0673854e10e&width=768&dpr=4&quality=100&sign=51aef2e3&sv=2)
Tabs with agents in different states, each displaying a corresponding status icon.
Icon
Agent status
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fs4N1O4LSfsmvDPxiz9QD%252Fimage.png%3Falt%3Dmedia%26token%3D85ca64c9-a424-4916-8fc8-31bd0188a017&width=768&dpr=4&quality=100&sign=498cb224&sv=2)
In progress. The agent is currently running.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FH8P6sUjpkpsACWPcn7pz%252Fimage.png%3Falt%3Dmedia%26token%3D92e9b551-a274-4298-a40f-a16a03407f9e&width=768&dpr=4&quality=100&sign=ad382a7c&sv=2)
Task delegated to agent has completed successfully.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F3QyNuBA94Y6feeQDunWR%252Fimage.png%3Falt%3Dmedia%26token%3Df2c45769-0b53-41ec-a238-ffa327cec685&width=768&dpr=4&quality=100&sign=9a2ccdf8&sv=2)
Agent requires your attention (e.g. waiting for input or approval).
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FmUCX86ygT273h9505rgt%252Fimage.png%3Falt%3Dmedia%26token%3D89f02321-8489-4742-86cc-bce3bec90c87&width=768&dpr=4&quality=100&sign=2f52a8e6&sv=2)
Agent was manually stopped and is idle.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FoCYG0ctIOzwlLcM2T7ph%252Fimage.png%3Falt%3Dmedia%26token%3D5d651389-e82a-4bb5-bba4-414676ba86ed&width=768&dpr=4&quality=100&sign=b2b0d8a4&sv=2)
An error occurred. This may be due to a model failure, an API issue (such as LLM provider downtime), a lost internet connection, or other unexpected problems.
**Notes:**
 * Status icon colors follow Warp's semantic theme settings, so they appear as theme-specific variants rather than the exact shades shown above.
 * If an agent encounters an error, the error will be surfaced in the last block of the affected conversation.
 * In tabs with multiple agent interactions (across different panes), the status icon reflects the agent state of the most recently focused pane.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FMkCUt58cssaSM9y0RSJZ%252FScreenshot%25202025-06-17%2520at%25201.52.19%25E2%2580%25AFPM.png%3Falt%3Dmedia%26token%3D8fff0ebc-07e8-4e4f-a966-ea0d93d98fa1&width=768&dpr=4&quality=100&sign=6f8d6d2&sv=2)
Agent status icons shown across multiple panes in a tab.
### 
[](#agent-management-panel)
**Agent Management Panel**
Warp includes an Agent Management Panel that provides a centralized view of all active agents across your sessions. You can monitor their status, cancel running tasks, review errors, and jump directly to conversations that need input.
This panel is accessible from the top right of the interface and is designed to keep you informed without disrupting your workflow.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fc5bvb9ZwlVUj3H7hPY26%252FScreenshot%25202025-06-17%2520at%25201.52.25%25E2%2580%25AFPM.png%3Falt%3Dmedia%26token%3D470a6b42-ebbb-425d-8e20-ec1b30a4b73a&width=768&dpr=4&quality=100&sign=378a8b2&sv=2)
Agent management panel, highlighting five agents with differing statuses.
The Agent Management Panel provides a centralized view of all agent activity across your sessions. From this panel, you can:
 * View the current status of all agents across active terminal sessions
 * Cancel agents that are currently in progress (only agents in the “in progress” state will show a stop option)
 * Review agents that are waiting for input or have encountered an error
 * Jump directly to the associated terminal pane or conversation
Once an agent is cancelled, it will stop executing and no further updates or notifications will be sent.
Agent activity is ordered by most recent interaction. If a single tab contains multiple agents across different panes, each conversation will appear separately in the panel, sorted by recency.
### 
[](#in-app-agent-notifications)
**In-app agent notifications**
Warp provides two types of in-app notifications to keep you informed about agent activity:
 1. **Toasts** appear briefly at the top right of the screen and link directly to the relevant conversation. If dismissed or ignored, they disappear from view but remain marked as unread in the Agent Management Panel.
 2. The **red dot indicator** appears on the Agent Management button in the top-right corner when there are unread agent notifications. Opening the panel clears the red dot and marks all associated notifications as read.
These notifications ensure you don’t miss critical updates, such as when an agent encounters an error or requests manual approval.
### 
[](#autonomy-and-controls)
**Autonomy and controls**
You can configure how much autonomy and control agents have in `Settings > AI > Agents > Permissions` . From this settings page, you can:
 * Require manual approval before the agent applies code diffs, reads files, creates plans, or runs commands
 * Define allowlists or denylists to control agent behavior based on command types or patterns
These settings let you fine-tune how agents interact with your system and control the level of automation based on task sensitivity. For more information on autonomy, please reference: [Agent Profiles & Permissions](/agents/using-agents/agent-profiles-permissions).
### 
[](#demo-using-multiple-agents-at-once-in-warp)
Demo: Using multiple agents at once in Warp
Here's an example from [Warp University](https://www.warp.dev/university), where Zach demonstrates how he uses and manages multiple agents in Warp:
[PreviousUsing @ to Add Context](/agents/using-agents/agent-context/using-to-add-context)[NextAgent Profiles & Permissions](/agents/using-agents/agent-profiles-permissions)
Last updated 1 month ago
Was this helpful?