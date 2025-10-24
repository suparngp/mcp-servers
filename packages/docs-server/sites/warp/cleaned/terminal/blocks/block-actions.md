[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * * [Quickstart Guided](/)
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
 * [Block Basics](/terminal/blocks/block-basics)
 * [Block Actions](/terminal/blocks/block-actions)
 * [Block Sharing](/terminal/blocks/block-sharing)
 * [Block Find](/terminal/blocks/find)
 * [Block Filtering](/terminal/blocks/block-filtering)
 * [Background Blocks](/terminal/blocks/background-blocks)
 * [Sticky Command Header](/terminal/blocks/sticky-command-header)
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
 * [Accessing Block Actions](#accessing-block-actions)
 * [Copy Input / Output of Block](#copy-input-output-of-block)
 * [Sharing a Block](#sharing-a-block)
 * [Bookmarking a Block](#bookmarking-a-block)
 * [Search Within A Block](#search-within-a-block)
 * [Filtering a Block](#filtering-a-block)
Was this helpful?
## 
[](#accessing-block-actions)
Accessing Block Actions
There are 2 ways you can access Block actions.
 1. Hover over a Block and click the kebab (three dots) button on the right-hand side.
 2. Right-click a Block.
Accessing Block Actions
## 
[](#copy-input-output-of-block)
Copy Input / Output of Block
For command blocks, you can `RIGHT-CLICK` on a Block or click the context menu and copy the Block command, output, or both.
For AI blocks, you can `RIGHT-CLICK` to copy the prompt, output, both or the entire conversation.
Copy Block Actions
## 
[](#sharing-a-block)
Sharing a Block
Share a block easily with coworkers or teammates by creating a web permalink. This preserves formatting and makes debugging and sharing output easy. [See Block Sharing Page.](/terminal/blocks/block-sharing)
## 
[](#bookmarking-a-block)
Bookmarking a Block
Quickly navigate to important Blocks despite where they are in the terminal history.
macOS
Windows
Linux
Ways to bookmark a Block:
 1. Select `Toggle bookmark` in the block context menu
 2. Use `CMD-B` keybinding to bookmark a selected block
Navigate to a bookmarked Block, by:
 * Clicking on the indicator. The indicator position reflects the approximate position of the Block in the Block history. Hovering over the indicator will give a snapshot of the Block including its prompt, command, and the last two lines of output.
 * Pressing `OPTION-UP` and `OPTION-DOWN`
There are Ways to bookmark a Block:
 1. Select `Toggle bookmark` in the block context menu
 2. Use `CTRL-SHIFT-B` keybinding to bookmark a selected block
Navigate to a bookmarked Block, by:
 * Clicking on the indicator. The indicator position reflects the approximate position of the Block in the Block history. Hovering over the indicator will give a snapshot of the Block including its prompt, command, and the last two lines of output.
 * Pressing `ALT-UP` and `ALT-DOWN`
Ways to bookmark a Block:
 1. Click on the bookmark icon in the top right corner of a Block
 2. Select `Toggle bookmark` in the block context menu
 3. Use `CTRL-SHIFT-B` keybinding to bookmark a selected block
Navigate to a bookmarked Block, by:
 * Clicking on the indicator. The indicator position reflects the approximate position of the Block in the Block history. Hovering over the indicator will give a snapshot of the Block including its prompt, command, and the last two lines of output.
 * Pressing `ALT-UP` and `ALT-DOWN`
Bookmarks only persist while the session is open, once you close the session they are lost. If you want to save the command and output for later use, [Share the Block](/terminal/blocks/block-sharing).
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F77dBOaIl2cHGtcXJsCoP%252FCleanShot%25202025-03-03%2520at%252016.39.10.gif%3Falt%3Dmedia%26token%3Ddbb9acb2-3351-4e81-b0fb-7dffee423f67&width=768&dpr=4&quality=100&sign=4d6d1ac1&sv=2)
Bookmarking a Block
## 
[](#search-within-a-block)
Search Within A Block
Quickly find important information within a Block. [See Find page](/terminal/blocks/find)
macOS
Windows
Linux
With a Block selected, press "Find Within Block" or use `CMD-F` to search within a Block.
With a Block selected, Press "Find Within Block" or use `CTRL-SHIFT-F` to search within a Block.
With a Block selected, Press "Find Within Block" or use `CTRL-SHIFT-F` to search within a Block.
Search within a Block
## 
[](#filtering-a-block)
Filtering a Block
Filter the output lines of a block natively in Warp to quickly focus on a subset of the block. [See Block Filtering Page](/terminal/blocks/block-filtering).
macOS
Windows
Linux
 * Using the keybinding `OPT-SHIFT-F` by default to toggle filtering on the selected or latest block
 * Selecting `Toggle Block Filter` in the block context menu
 * Using the keybinding `ALT-SHIFT-F` to toggle filtering on the selected or latest block
 * Selecting `Toggle Block Filter` in the block context menu
 * Using the keybinding `ALT-SHIFT-F` to toggle filtering on the selected or latest block
 * Selecting `Toggle Block Filter` in the block context menu
[PreviousBlock Basics](/terminal/blocks/block-basics)[NextBlock Sharing](/terminal/blocks/block-sharing)
Last updated 2 months ago
Was this helpful?