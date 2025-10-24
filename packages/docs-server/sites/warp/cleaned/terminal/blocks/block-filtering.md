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
Was this helpful?
Filter the output lines of a block in Warp to quickly focus on a subset of the block. You can filter by plaintext, regex, invert, or make your filter case-sensitive. You can also add context lines to view output around matches. Filtering does not delete any output lines, so you can clear the filter to go back to the original output.
## 
[](#how-to-filter-a-block)
How to filter a block
To apply a filter to a block:
 1. Click on the filter icon in the top right corner of a block. A filter editor will appear with a large input field with two buttons on the left and a smaller input field on the right.
 2. Type in the input to filter the block in the left input field. Only lines containing text that matches the filter query will be shown.
 3. (Optional) Click on the regex, case sensitive search, or invert filter buttons to enable.
 4. (Optional) Type a number in the right input field to add context lines around matched lines.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-5f6785698f91c37b77b73df65d4d4d93808bec3a%252Fblock_filtering_with_context_lines.gif%3Falt%3Dmedia%26token%3D1008c7bb-0679-40c8-a936-8acb60208eef&width=768&dpr=4&quality=100&sign=c644bc03&sv=2)
Filter a block's output, with the ability to add context lines.
macOS
Windows
Linux
You can also toggle a filter by:
 * Using the keybinding `OPT-SHIFT-F` by default to toggle filtering on the selected or latest block
 * Selecting `Toggle Block Filter` in the block context menu
You can also toggle a filter on/off by:
 * Using the keybinding `ALT-SHIFT-F` to toggle filtering on the selected or latest block
 * Selecting `Toggle Block Filter` in the block context menu
You can also toggle a filter on/off by:
 * Using the keybinding `ALT-SHIFT-F` to toggle filtering on the selected or latest block
 * Selecting `Toggle Block Filter` in the block context menu
Toggling a filter on a block without a filter applied will open the filter editor. If you toggle a filter off, the same filter will be applied if you toggle filtering on again.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-6ef2a07dd1deac53be41c2fa3c8b9dcdb4a8bc42%252Fblock_filtering_toggle.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=f61a5d67&sv=2)
Toggle a block filter on/off.
[PreviousBlock Find](/terminal/blocks/find)[NextBackground Blocks](/terminal/blocks/background-blocks)
Last updated 8 months ago
Was this helpful?