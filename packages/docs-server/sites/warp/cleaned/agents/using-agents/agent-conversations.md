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
 * [Conversations with Warp's Agent](#conversations-with-warps-agent)
 * [Staying in a Conversation (Follow-Ups)](#staying-in-a-conversation-follow-ups)
 * [Managing Conversations](#managing-conversations)
 * [Starting a New Conversation](#starting-a-new-conversation)
 * [Context Window Management](#context-window-management)
 * [Warp provides a context window usage indicator to help you track this:](#warp-provides-a-context-window-usage-indicator-to-help-you-track-this)
 * [Conversation Segmentation](#conversation-segmentation)
Was this helpful?
## 
[](#conversations-with-warps-agent)
Conversations with Warp's Agent
Conceptually, a conversation is a sequence of AI queries and blocks. Conversations are tied to sessions and you can run multiple Agent Mode conversations simultaneously in different windows, tabs, or panes.
Conversations work best when the queries are related. If your new question builds on the last one, continue in the same conversation. If it is unrelated, it is better to start a new one so that the context remains relevant.
Long conversations can cause slower performance and lower-quality answers. When working on a separate task or question, start fresh rather than relying on context from earlier interactions.
### 
[](#staying-in-a-conversation-follow-ups)
Staying in a Conversation (Follow-Ups)
By default, if you ask an AI query immediately after interacting in Agent Mode, your query is sent as a **follow-up** to the current conversation.
 * In **Classic Input** , you’ll see both the pink highlight bar on the left side of the block and a bent follow-up arrow (↳) next to your input. The conversation input chip also shows which conversation you are in.
 * In **Universal Input,** the pink highlight bar and the conversation input chip serve as the indicators, but the bent arrow is not shown.
**To follow-up on a previous conversation:**
 * Simply continue prompting the agent if you are already in an active conversation.
 * Open the **Conversations menu** (`CMD + Y` on macOS, `CTRL + SHIFT + Y` on Windows/Linux), select a conversation, and then enter your query.
 * Alternatively, click the pink conversation chip in the input field to resume.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FxmPM6KzKpqd0Tw7WxYaN%252Fimage.png%3Falt%3Dmedia%26token%3D6c94a22b-936f-44d6-a9f1-4e534bfc2cbd&width=768&dpr=4&quality=100&sign=34e21fb9&sv=2)
Continuing an Agent conversation in Classic Input (with indicator)
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fl4OZFLonEXHhR1bavEXW%252Fimage.png%3Falt%3Dmedia%26token%3Dfe1f1d26-1d12-4ecc-a5b6-7a0988a7db54&width=768&dpr=4&quality=100&sign=eff9b9db&sv=2)
Continuing an Agent conversation in Universal Input
### 
[](#managing-conversations)
**Managing Conversations**
You can view previous conversations or start a new conversation via the **Conversations Menu** (`CMD + Y` on macOS, `CTRL + SHIFT + Y` on Windows/Linux).
The "New Conversation" item disappears once you start searching for an actual conversation.
### 
[](#starting-a-new-conversation)
**Starting a New Conversation**
Warp automatically creates a new conversation in a few situations. For example, if you ask an AI query after running a shell command or if three hours pass without activity, Agent Mode will start a fresh conversation.
Visual indicators differ slightly depending on input mode:
 * In **Classic Input,** a new conversation begins when there is no follow-up arrow (↳) next to your input.
 * In **Universal Input** , a new conversation begins when there is no pink highlight bar on the left side of the block. The conversation input chip also helps confirm whether you’re in a new or existing thread.
macOS
Windows
Linux
You can also start a new conversation manually at any time:
 * In **Classic Input** , press `CMD + I` or press `BACKSPACE` while in follow-up mode.
 * In **Universal Input** , press `CMD + SHIFT + N` or click directly on the conversation input chip.
 * Open the **Conversations Menu** using `CMD + Y` and selecting "New Conversation".
You can also start a new conversation manually at any time:
 * In **Classic Input** , press `CTRL + I` or press `BACKSPACE` while in follow-up mode.
 * In **Universal Input** , press `CTRL + ALT + SHIFT + N` or click directly on the conversation input chip.
 * Open the **Conversations Menu** using `CMD + SHIFT + Y` and selecting "New Conversation".
You can also start a new conversation manually at any time:
 * In **Classic Input** , press `CTRL + I` or press `BACKSPACE` while in follow-up mode.
 * In **Universal Input** , press `CTRL + ALT + SHIFT + N` or click directly on the conversation input chip.
 * Open the **Conversations Menu** using `CMD + SHIFT + Y` and selecting "New Conversation".
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fqj30MTkapmJer9YKyYGw%252Fimage.png%3Falt%3Dmedia%26token%3Dd8d86eaa-1637-49c6-b373-229318923a55&width=768&dpr=4&quality=100&sign=64ea6703&sv=2)
Starting a new Conversation in Classic Input
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FwrdTXPJJ1Iw40Ognehs5%252Fimage.png%3Falt%3Dmedia%26token%3D91fa86c4-0ab7-4f42-b4b9-fe69e758b647&width=768&dpr=4&quality=100&sign=8013a29e&sv=2)
Starting a new Agent Conversation in Universal Input
## 
[](#context-window-management)
Context Window Management
Every conversation with an agent consumes tokens stored in a **context window**. The context window (sometimes called _context length_) is the amount of text (measured in tokens) that a Large Language Model (LLM) can process at one time. **The size of the context window depends on the model you are using.**
As tokens accumulate and exceed the context window, performance and response quality may degrade. If the context window is exceeded, the model may lose track of earlier parts of the conversation, and **Warp will automatically summarize the conversation to free up space**.
### 
[](#warp-provides-a-context-window-usage-indicator-to-help-you-track-this)
Warp provides a **context window usage indicator** to help you track this:
When less than 20% of the window is used, no indicator is shown. As more tokens accumulate, the usage bar progresses to reflect how much of the context window has been consumed.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FiiFWrNHyota3ntlEPsWS%252Fimage.png%3Falt%3Dmedia%26token%3Dc349e460-156a-4c8a-a31d-180784d76ecc&width=768&dpr=4&quality=100&sign=5147a91d&sv=2)
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FtQBJJA7SrLkmYTB4BhLE%252Fimage.png%3Falt%3Dmedia%26token%3D8393caba-aa13-4a67-834b-176413d52592&width=768&dpr=4&quality=100&sign=d50a1d9e&sv=2)
As you approach the limit, the indicator turns red to warn that the context window is nearly full.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FqvHHPeeGz7dyo71JNz09%252Fimage.png%3Falt%3Dmedia%26token%3D900ccaa1-cbe2-4457-971a-001aee2867c4&width=768&dpr=4&quality=100&sign=93254744&sv=2)
Once the limit is exceeded, Warp automatically summarizes the conversation so you can continue without losing important context.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F6u0EPGtI9nsutxHsWTMl%252Fimage.png%3Falt%3Dmedia%26token%3D9caa2d65-26a9-483f-88b4-e100e1853002&width=768&dpr=4&quality=100&sign=d223caf8&sv=2)
The context window usage indicator is available only in **Universal Input** , which you can enable under `Settings > Appearance > Input`.
If you switch models during a conversation, the context usage indicator updates only after you send your next message.
## 
[](#conversation-segmentation)
Conversation Segmentation
Warp automatically detects when your query has shifted to a new topic. When this happens, it suggests starting a new conversation instead of continuing in the same context.
These options appear in the blocklist, where you can decide whether to branch off into a new conversation or keep going with the current one.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FkXVKyztgN6YMTdVl0Va4%252Fconversation-segmentation.png%3Falt%3Dmedia%26token%3Dd855753d-bdf8-4fde-be91-a6b8c56f413c&width=768&dpr=4&quality=100&sign=2235adc1&sv=2)
You can also create a new conversation manually at any time by using the keyboard shortcut, opening a new tab, or opening a new pane.
macOS
Windows
Linux
 * Start a new conversation: `CMD + SHIFT + N`
 * Open a new tab: `CMD + T`
 * Open a new pane: `CMD + D`
 * Start a new conversation: `CTRL + SHIFT + N`
 * Open a new tab: `CTRL + SHIFT + T`
 * Open a new pane: `CTRL + SHIFT + D`
 * Start a new conversation: `CTRL + SHIFT + N`
 * Open a new tab: `CTRL + SHIFT + T`
 * Open a new pane: `CTRL + SHIFT + D`
[PreviousUsing Agents](/agents/using-agents)[NextConversation Forking](/agents/using-agents/agent-conversations/conversation-forking)
Last updated 2 months ago
Was this helpful?