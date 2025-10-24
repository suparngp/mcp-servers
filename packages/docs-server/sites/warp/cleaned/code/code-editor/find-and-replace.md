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
 * [File Tree](/code/code-editor/file-tree)
 * [Find and Replace](/code/code-editor/find-and-replace)
 * [Code Editor Vim Keybindings](/code/code-editor/code-editor-vim-keybindings)
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
 * [Find](#find)
 * [Replace](#replace)
Was this helpful?
## 
[](#find)
Find
Press `CMD-F` on macOS or `CTRL-SHIFT-F` on Windows and Linux to open the find menu. As you type, all matches in the file are highlighted, and the match closest to your cursor is selected.
 * Press `ENTER` or use the down arrow to jump to the next match
 * Press `SHIFT-ENTER` or use the up arrow to go to the previous match
 * Click "Select All" to highlight all matches and close the menu
You can toggle regex and case-sensitive search options directly in the query editor.
![using find in the code editor](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-855117616ffd1d4361aaf770ac3388045616e48d%252Fcode-find-menu.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=cd02636c&sv=2)
Using the find menu in Warp's Code Editor
## 
[](#replace)
Replace
Click the dropdown to the left of the find menu to open the replace options.
 * Press Enter to replace the currently selected match
 * Use Replace All to replace all matches
Toggle Preserve Case to keep the original casing of replaced text. Case is preserved in text that contains PascalCase, camelCase, hyphens, and underscores. For example:
 * Replacing “old” with “new” will turn “Old” into “New” and “OLD” into “NEW”
 * Replacing “oldValue” with “NewValue” will result in “newValue”
 * Replacing “OldValue” with “newValue” will result in “NewValue”
 * Replacing “my-Old-VALUE” with “my-new-value” will result in “my-New-VALUE”
![using replace in the code editor](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-8e786a8f163bde3d9e695a1485e7f55d921222dd%252Fcode-replace-menu.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=b5bc1fc7&sv=2)
Using the replace menu in Warp's Code Editor
[PreviousFile Tree](/code/code-editor/file-tree)[NextCode Editor Vim Keybindings](/code/code-editor/code-editor-vim-keybindings)
Last updated 5 days ago
Was this helpful?