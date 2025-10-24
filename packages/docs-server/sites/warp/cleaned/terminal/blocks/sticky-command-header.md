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
 * [How to access Sticky Command Header](#how-to-access-sticky-command-header)
 * [How to use Sticky Command Header](#how-to-use-sticky-command-header)
 * [How Sticky Command Header works](#how-sticky-command-header-works)
Was this helpful?
For long-running commands that take up the full screen, the sticky header only shows after you start scrolling up. This is to prevent the header from blocking the top part of the output for commands like `git log` that simulate full-screen apps.
## 
[](#how-to-access-sticky-command-header)
How to access Sticky Command Header
macOS
Windows
Linux
 * Sticky Command Header is enabled by default.
 * Toggle Sticky Command Header by going to `Settings > Features` > toggle “Show sticky command header”.
 * Toggle by searching for “Sticky Command Header” within the [Command Palette](/terminal/command-palette) or by pressing `CTRL-CMD-S`.
 * You can also "Toggle the Sticky Command Header in the Active Pane" with `CTRL-S`. This won't disable the feature entirely, only minimize it on the active session.
 * Sticky Command Header is enabled by default.
 * Toggle the Sticky Command Header by going to `Settings > Features` > toggle “Show sticky command header”.
 * Toggle by searching for “Sticky Command Header” within the [Command Palette](/terminal/command-palette) or by setting up a key bind in `Settings > Keyboard Shortcuts`.
 * You can also "Toggle the Sticky Command Header in the Active Pane" in the Command Palette or by setting up a key bind in `Settings > Keyboard Shortcuts`. This won't disable the feature entirely, only minimize it on the active session.
 * Sticky Command Header is enabled by default.
 * Toggle the Sticky Command Header by going to `Settings > Features` > toggle “Show sticky command header”.
 * Toggle by searching for “Sticky Command Header” within the [Command Palette](/terminal/command-palette) or by setting up a key bind in `Settings > Keyboard Shortcuts`.
 * You can also "Toggle the Sticky Command Header in the Active Pane" in the Command Palette or by setting up a key bind in `Settings > Keyboard Shortcuts`. This won't disable the feature entirely, only minimize it on the active session.
## 
[](#how-to-use-sticky-command-header)
How to use Sticky Command Header
 * If a Block has a large output ( e.g. `seq 1 1000`), the header of the Block will show on the top of the active Window, Tab, or Pane.
 * Click on the Sticky Command Header to quickly jump to the top of the Block.
 * While active you can also minimize the Sticky Command Header on the active pane by clicking the UP/DOWN arrow in the middle of the header.
## 
[](#how-sticky-command-header-works)
How Sticky Command Header works
Sticky Command Header Demo
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-242f19a3d854b7d78baad1fbfab7eb39e99406c9%252Fsticky-header-toggle-active-demo.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=ff2c2072&sv=2)
Toggle active header and Jump to bottom of block demo
[PreviousBackground Blocks](/terminal/blocks/background-blocks)[NextModern Text Editing](/terminal/editor)
Last updated 4 months ago
Was this helpful?