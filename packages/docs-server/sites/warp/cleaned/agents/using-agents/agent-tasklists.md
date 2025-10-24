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
 * [How Task Lists work](#how-task-lists-work)
 * [Task statuses](#task-statuses)
 * [Task List access](#task-list-access)
Was this helpful?
The Agent can automatically break down complex requests into clear, trackable steps in the form of a task list with to-do items. When you make a sufficiently complex request that requires multiple actions, the Agent will automatically create a list of steps, execute them in order, and track progress from start to finish. There’s no need to adjust settings or enable a special mode—the Agent detects and creates task lists automatically.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FlW30hZGN1lS6zwgbXW1j%252Fin-progress-tasklist.png%3Falt%3Dmedia%26token%3Dfc30348f-0241-421d-a5db-c983341e184e&width=768&dpr=4&quality=100&sign=610f3066&sv=2)
An example of a Task List in progress.
### 
[](#how-task-lists-work)
**How Task Lists work**
 1. **Automatic task creation** — For complex requests, the Agent generates a structured list of tasks to complete.
 2. **Step-by-step execution** — The Agent works through each task in sequence, updating statuses in real time.
 3. **Summary** — Once all tasks are complete, the Agent provides a concise summary of what was done, including outputs, results, and relevant context. If any tasks were skipped or couldn’t be completed, it explains why.
After each step is completed, there is also a completion marker in the Agent conversation.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FOnLBapkCIZGQgnILCG1X%252Fcompletion-markers.png%3Falt%3Dmedia%26token%3D5a621657-b65e-4dcc-b913-a2fed745247a&width=768&dpr=4&quality=100&sign=fb752149&sv=2)
Completion markers inside the Agent conversation after each task is completed.
### 
[](#task-statuses)
Task statuses
Each task in the list has a visual indicator so you can quickly see its progress.
Status
Icon
Meaning
Current task
● (filled circle)
The Agent is actively working on this task.
Completed
✔︎
The Agent has finished this task successfully.
Not started
○ (empty circle)
The task is in the queue but work hasn’t begun.
Cancelled
■ (filled square)
The task was stopped before completion.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FWJf8SQaerRBQ3iZz8Xub%252Ftasklist-small.png%3Falt%3Dmedia%26token%3Dcb76d68a-1c85-4813-9d19-cd0f7189e619&width=768&dpr=4&quality=100&sign=6812a745&sv=2)
### 
[](#task-list-access)
Task List access
During any Agent conversation, a task list chip appears at the bottom-right of the screen (when input is pinned to the bottom; otherwise, it may appear along the right side).
 * Click the chip to open the current task list.
 * You can collapse or expand the view at any time without interrupting the Agent.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FxJOXMv2zCg2HRsxyk60f%252Ftasklist-popup.png%3Falt%3Dmedia%26token%3D825d62c5-b112-4f2c-882c-2c420ab3d371&width=768&dpr=4&quality=100&sign=ab17ca23&sv=2)
Access the Task List during an Agent conversation in the Task List chip in the conversation.
[PreviousAgent Profiles & Permissions](/agents/using-agents/agent-profiles-permissions)[NextModel Choice](/agents/using-agents/model-choice)
Last updated 2 months ago
Was this helpful?