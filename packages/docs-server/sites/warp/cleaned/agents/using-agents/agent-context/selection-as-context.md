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
 * [Blocks as Context](/agents/using-agents/agent-context/blocks-as-context)
 * [Images as Context](/agents/using-agents/agent-context/images-as-context)
 * [URLs as Context](/agents/using-agents/agent-context/urls-as-context)
 * [Selection as Context](/agents/using-agents/agent-context/selection-as-context)
 * [Using @ to Add Context](/agents/using-agents/agent-context/using-to-add-context)
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
 * [Attaching selections from Warp's native code editor](#attaching-selections-from-warps-native-code-editor)
 * [Attaching selections from Warp’s Code Review panel](#attaching-selections-from-warps-code-review-panel)
Was this helpful?
### 
[](#attaching-selections-from-warps-native-code-editor)
Attaching selections from Warp's native code editor
When you have Warp’s [native code editor](/code/code-editor) open beside a regular pane, you can easily attach specific lines of code as context:
 1. **Select text** in the editor. A tooltip will appear in the bottom-right corner of the selection.
 2. **Add as context** by clicking the tooltip or using the keyboard shortcuts `Cmd + L` (macOS) or `CTRL + SHIFT + L` (Windows or Linux).
 3. Warp automatically adds the relative file path and context, in addition to the line numbers of the hunk, as a formatted string into the prompt.
This makes it easy to highlight just the lines you want the Agent to analyze or modify.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F5ac6IYV3LZeNAxK1nlwV%252Fimage.png%3Falt%3Dmedia%26token%3D04766628-4437-4633-a693-3c83530b38f4&width=768&dpr=4&quality=100&sign=e69c09d7&sv=2)
Selecting a function and attaching it as context from Warp's native code editor.
### 
[](#attaching-selections-from-warps-code-review-panel)
Attaching selections from Warp’s Code Review panel
You can also directly attach context from the [Code Review panel](/code/code-review):
 1. Hover over any **diff hunk** to reveal the option to attach it as context.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FXVmoOEaM4P9fWvbxG7LD%252FAdd%2520diff%2520as%2520context.png%3Falt%3Dmedia%26token%3Ddf5ea124-5f08-4ca8-b6df-58fbeb5b19a9&width=768&dpr=4&quality=100&sign=2cf66fd7&sv=2)
On-hover option to attach diff as context into the prompt.
 1. Attaching a diff will automatically insert the relevant file path and changed lines into your prompt.
This helps the Agent understand exactly what has been modified, making it easier to request explanations, feedback, or follow-up edits.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F64tVTMWrnPTkG8tRu7WW%252Fgit%2520diff%2520full%2520view.png%3Falt%3Dmedia%26token%3Da40ecfa1-646a-46e5-a038-f4b4bdae0f2b&width=768&dpr=4&quality=100&sign=da827d8d&sv=2)
Code Review panel with diffs for review.
[PreviousURLs as Context](/agents/using-agents/agent-context/urls-as-context)[NextUsing @ to Add Context](/agents/using-agents/agent-context/using-to-add-context)
Last updated 1 month ago
Was this helpful?