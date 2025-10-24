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
 * [The Basics](#the-basics)
 * [Create A Block](#create-a-block)
 * [Select a Single Block](#select-a-single-block)
 * [Select Multiple Blocks](#select-multiple-blocks)
 * [Navigate Blocks](#navigate-blocks)
Was this helpful?
## 
[](#the-basics)
The Basics
 * Blocks group your command and command output
 * The Input Editor can pin to the bottom, pin to the top, or start at the top.
 * Blocks grow from the bottom to the top.
 * Blocks are color-coded. Blocks that quit with a non-zero exit code have a red background and red sidebar.
Try it yourself! Type `xyz` (or some other command that doesn’t exist) and hit `ENTER`
## 
[](#create-a-block)
Create A Block
 1. Execute a command (type `ls` and hit `ENTER`) in the Input Editor at the bottom of the screen.
 2. Your command and output are grouped into a Block.
 3. Try executing a different command (type `echo hello` and hit `ENTER`).
 4. Warp adds your newly created Block to the bottom (directly above the input editor).
Create a Block
## 
[](#select-a-single-block)
Select a Single Block
macOS
Windows
Linux
 * Using your mouse: click on a Block.
 * Or using your keyboard: hit `CMD-UP` (or `CMD-DOWN` if input as pinned up top) to select the most recently executed Block and use the `UP ↑` and `DOWN ↓` arrow keys to navigate to the desired Block.
 * For long Blocks:
 * You can click "Jump to the bottom of this block".
 * You can press `SHIFT-CMD-UP`/`SHIFT-CMD-DOWN` to Scroll to the top/bottom of the selected block.
 * From the [Command Palette](/terminal/command-palette), you can also "Scroll to the top/bottom of selected block".
 * Using your mouse: Click on a Block.
 * Or using your keyboard: hit `CTRL-UP` (or `CTRL-DOWN` if input as pinned up top) to select the most recently executed Block and use the `UP ↑` and `DOWN ↓` arrow keys to navigate to the desired Block.
 * For long Blocks:
 * You can click "Jump to the bottom of this block".
 * You can press `CTRL-SHIFT-UP`/`CTRL-SHIFT-DOWN` to Scroll to the top/bottom of the selected block.
 * From the [Command Palette](/terminal/command-palette), you can also "Scroll to the top/bottom of selected block".
 * Using your mouse: Click on a Block.
 * Or using your keyboard: hit `CTRL-UP` (or `CTRL-DOWN` if input as pinned up top) to select the most recently executed Block and use the `UP ↑` and `DOWN ↓` arrow keys to navigate to the desired Block.
 * For long Blocks:
 * You can click "Jump to the bottom of this block".
 * You can press `CTRL-SHIFT-UP`/`CTRL-SHIFT-DOWN` to Scroll to the top/bottom of the selected block.
 * From the [Command Palette](/terminal/command-palette), you can also "Scroll to the top/bottom of selected block".
Select a Single Block
## 
[](#select-multiple-blocks)
Select Multiple Blocks
macOS
Windows
Linux
 * Click another Block while holding `CMD` to toggle the selection of that Block, or
 * Click another Block while holding `SHIFT` to select a range of Block, or
 * Use `SHIFT-UP ↑` or `SHIFT-DOWN ↓` to expand the active selection (the Block with the thicker border) up or down, respectively.
 * Click another Block while holding `CTRL-SHIFT` to toggle the selection of that Block, or
 * Click another Block while holding `SHIFT` to select a range of Block, or
 * Use `SHIFT-UP ↑` or `SHIFT-DOWN ↓` to expand the active selection (the Block with the thicker border) up or down, respectively.
 * Click another Block while holding `CTRL-SHIFT` to toggle the selection of that Block, or
 * Click another Block while holding `SHIFT` to select a range of Block, or
 * Use `SHIFT-UP ↑` or `SHIFT-DOWN ↓` to expand the active selection (the Block with the thicker border) up or down, respectively.
Select Multiple Blocks
## 
[](#navigate-blocks)
Navigate Blocks
 * Either scroll using your mouse or the scrollbar or select a Block and use the `UP ↑` and `DOWN ↓` arrow keys.
 * "Scroll Terminal output up/down one line" is also a way to navigate block output, and can be configured with a keyboard shortcut or accessed from the [Command Palette](/terminal/command-palette).
 * When the output of a command is cut off, Warp keeps the [Sticky Command Header](/terminal/blocks/sticky-command-header) pinned at the top that displays the command the Block corresponds to. Clicking the header will scroll the screen to the start of the Block.
Navigate between Blocks
[PreviousBlocks](/terminal/blocks)[NextBlock Actions](/terminal/blocks/block-actions)
Last updated 4 months ago
Was this helpful?