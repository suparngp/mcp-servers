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
Was this helpful?
## 
[](#attaching-blocks-as-context)
Attaching blocks as context
Warp’s Agent can use blocks from your Agent conversations as context to better understand your queries and generate more relevant responses.
You can attach a block directly from the terminal blocklist by clicking the AI sparkles icon on it and selecting “Attach as context.”
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-974d0c18bc9b51dc26a5591c6613e69065891e5e%252Fremove_all_untracked_files.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=ff6ca9b9&sv=2)
From a block of output, attach the block and ask Agent Mode to remove all untracked files.
The most common use case is to ask the AI to fix an error. You can attach the error in a query to Agent Mode and type "fix it."
**If you're already in Agent Mode, use the following ways to attach or clear context from your query:**
macOS
Windows
Linux
**Attach a previous block**
 * To attach blocks to a query, you can use `CMD-UP` to attach the previous block as context to the query. While holding `CMD`, you can then use your `UP/DOWN` keys to pick another block to attach.
 * You may also use your mouse to attach blocks in your session. Hold `CMD` as you click on other blocks to extend your block selection.
**Clear a previous block**
 * To clear blocks from a query, you can use `CMD-DOWN` until the blocks are removed from context.
 * You may also use your mouse to clear blocks in your session. Hold `CMD` as you click on an attached block to clear it.
When using "Pin to the top" [Input Position](/terminal/appearance/input-position), the direction for attaching or detaching is reversed (i.e. `CMD-DOWN` attaches blocks to context, while `CMD-UP` clears blocks from context).
**Attach a previous block**
 * To attach blocks to a query, you can use `CTRL-UP` to attach the previous block as context to the query. While holding `CTRL`, you can then use your `UP/DOWN` keys to pick another block to attach.
 * You may also use your mouse to select blocks in your session. Hold `CTRL` as you click on other blocks to extend your block selection.
**Clear a previous block**
 * To clear blocks from a query, you can use `CTRL-DOWN` until the blocks are removed from context.
 * You may also use your mouse to clear blocks in your session. Hold `CTRL` as you click on an attached block to clear it.
When using "Pin to the top" [Input Position](/terminal/appearance/input-position), the direction for attaching or detaching is reversed (i.e. `CTRL-DOWN` attaches blocks to context, while `CTRL-UP` clears blocks from context).
**Attach a previous block**
 * To attach blocks to a query, you can use `CTRL-UP` to attach the previous block as context to the query. While holding `CTRL`, you can then use your `UP/DOWN` keys to pick another block to attach.
 * You may also use your mouse to select blocks in your session. Hold `CTRL` as you click on other blocks to extend your block selection.
**Clear a previous block**
 * To clear blocks from a query, you can use `CTRL-DOWN` until the blocks are removed from context.
 * You may also use your mouse to clear blocks in your session. Hold `CTRL` as you click on an attached block to clear it.
When using "Pin to the top" [Input Position](/terminal/appearance/input-position), the direction for attaching or detaching is reversed (i.e. `CTRL-DOWN` attaches blocks to context, while `CTRL-UP` clears blocks from context).
[PreviousAgent Context](/agents/using-agents/agent-context)[NextImages as Context](/agents/using-agents/agent-context/images-as-context)
Last updated 1 month ago
Was this helpful?