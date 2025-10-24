[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * * [Quickstart Guided](/)
 * [Migrate to Warp](/getting-started/migrate-to-warp)
 * [Supported Shells](/getting-started/supported-shells)
 * [Keyboard Shortcuts](/getting-started/keyboard-shortcuts)
 * [Changelog](/getting-started/changelog)
 * * [Agents Overview](/agents/agents-overview)
 * [Using Agents](/agents/using-agents)
 * [Agent Conversations](/agents/using-agents/agent-conversations)
 * [Conversation Forking](/agents/using-agents/agent-conversations/conversation-forking)
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
 * [How conversation forking works](#how-conversation-forking-works)
 * [Ways to fork a conversation](#ways-to-fork-a-conversation)
 * [Using forked conversations](#using-forked-conversations)
Was this helpful?
Warp allows you to **fork conversations** to create a new thread that inherits all of the context, messages, and history from an existing conversation. This is useful when you want to branch off in a new direction without affecting the original conversation.
### 
[](#how-conversation-forking-works)
How conversation forking works
 * When you fork a conversation, the new thread starts with the same context and history as the original.
 * Any follow-ups in the forked conversation do **not** impact the original. Likewise, continuing in the original conversation does not change the fork.
 * Forked conversations behave just like any other conversation: you can move them into new windows, panes, or tabs.
_Example_ : You can fork a conversation to explore an alternate solution, ask “what if” questions, or continue down two separate paths in parallel.
### 
[](#ways-to-fork-a-conversation)
Ways to fork a conversation
There are two ways to fork an existing conversation:
#### 
[](#id-1.-from-the-command-palette)
**1. From the command palette**
Open the menu using the command palette (`CMD + Y` on macOS / `CTRL + SHIFT + Y` on Windows/Linux). 
Select **Fork current conversation** to fork your current conversation, or fork a specific conversation from open conversations.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FSKCijjzp8nseHBOdukzp%252Fimage.png%3Falt%3Dmedia%26token%3D0263dd4e-ef62-4ad2-9bd2-20cf87f45ff8&width=768&dpr=4&quality=100&sign=1c96bc6b&sv=2)
In addition, when you hover over any open conversation in the command palette, you’ll see a **fork button**. This lets you fork not only active conversations, but also inactive and historical ones.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F5VLXP84aFlCF8bLc2wur%252Fimage.png%3Falt%3Dmedia%26token%3D65b1a442-858f-4899-8d3a-b09319fb3bb4&width=768&dpr=4&quality=100&sign=f30c80dd&sv=2)
You can also access this conversation view from the [universal input chip](https://app.gitbook.com/o/-MbqIZLCtzerswjFm7mh/s/-MbqIgTw17KQvq_DQuRr/~/diff/~/changes/1112/terminal/universal-input/~/overview) in the current conversation.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FaW3ygIznjLPDwgMTcmx7%252Fimage.png%3Falt%3Dmedia%26token%3Dd43cfddc-2ac3-4959-a330-4d1f05f9688e&width=768&dpr=4&quality=100&sign=9b7e58ee&sv=2)
#### 
[](#id-2.-from-the-footer-of-the-most-recent-ai-response-block)
**2. From the footer of the most recent AI response block**
In any conversation in the blocklist, click the **fork button** in the footer of the most recent AI block. A new conversation opens in a separate pane with the full context of the original.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F3QYAqIEzJvqvpffUy5MN%252Fimage.png%3Falt%3Dmedia%26token%3Ddd647c0a-83d0-41f7-9621-c0c31a339d4d&width=768&dpr=4&quality=100&sign=baf62fc2&sv=2)
### 
[](#using-forked-conversations)
Using forked conversations
 * Once forked, you can continue prompting as if you were still in the original conversation. The original conversation remains unchanged, allowing you to reference or continue both in parallel.
 * For example, after forking you might ask _“Could you explain more?”_ and Warp will respond using the inherited context.
**Forking is especially useful when:**
 * You want to explore different approaches without losing the original thread.
 * You need to keep one conversation “clean” while experimenting in another.
 * You want to reuse context or specific blocks from older conversations.
[PreviousAgent Conversations](/agents/using-agents/agent-conversations)[NextAgent Context](/agents/using-agents/agent-context)
Last updated 19 days ago
Was this helpful?