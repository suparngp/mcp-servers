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
 * [Modern Text Editing](/terminal/editor)
 * [Alias Expansion](/terminal/editor/alias-expansion)
 * [Command Inspector](/terminal/editor/command-inspector)
 * [Syntax & Error Highlighting](/terminal/editor/syntax-error-highlighting)
 * [Input Editor Vim Keybindings](/terminal/editor/vim)
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
 * [Soft Wrapping](#soft-wrapping)
 * [Copy on Select](#copy-on-select)
 * [Autocomplete Quotes, Parentheses, and Brackets](#autocomplete-quotes-parentheses-and-brackets)
 * [How to use it](#how-to-use-it)
 * [How it Works](#how-it-works)
Was this helpful?
Text Editor Input also works for [SSH sessions](/terminal/warpify/ssh).
### 
[](#soft-wrapping)
Soft Wrapping
Warp supports soft wrapping in the input editor. If an autosuggestion goes off-screen, the input editor will be horizontally scrollable to make it visible. Some operations treat soft-wrapped lines like a logical line (`TRIPLE-CLICK`) while other operations treat soft wrapped lines like visible different lines (`UP`/`DOWN`, `SHIFT-UP`/`SHIFT-DOWN`).
### 
[](#copy-on-select)
Copy on Select
Warp supports copy on select for selectable text within [Blocks](/terminal/blocks).
 * Toggle this feature `Settings > Features > General` or search for "Copy on select" in the [Command Palette](/terminal/command-palette).
### 
[](#autocomplete-quotes-parentheses-and-brackets)
Autocomplete Quotes, Parentheses, and Brackets
Warp can automatically complete quotes, brackets, and parentheses like you're used to in IDEs.
 * Toggle this feature `Settings > Features > Editor` or search for "Autocomplete quotes" in the [Command Palette](/terminal/command-palette).
## 
[](#how-to-use-it)
How to use it
macOS
Windows
Linux
Keyboard binding
Shortcut description
`ESCAPE`
Closes the input suggestions or history menu
`CTRL-L`
Clears the terminal
`CTRL-H`
Backspace
`CTRL-C`
Clear the entire editor buffer
`CTRL-U`
Copy and Clear the current line
`CMD-SHIFT-K`
Clear selected lines
`CMD-C`, `CMD-X`, `CMD-V`
Copy, cut, paste
`CTRL-W` / `OPT-D`
Cut the word to the left / right of the cursor
`OPT-BACKSPACE` / `OPT-D`
Delete the word to the left / right of the cursor
`CTRL-K CMD-DELETE`
Delete everything to the right of the cursor
`OPT-LEFT` / `OPT-RIGHT`
Move to the beginning of the previous / next word
`CTRL-OPT-LEFT` / `CTRL-OPT-RIGHT`
Move backward / forward by one subword
`CMD-LEFT` `CTRL-A`/ `CTRL-E` `CMD-DOWN` `CMD-RIGHT`
Move the cursor to the start / end of the line
`SHIFT-LEFT` / `SHIFT-RIGHT`
Select the character to the left / right of the cursor
`OPT-SHIFT-LEFT` / `OPT-SHIFT-RIGHT`
Select the word to the left / right of the cursor
`CMD-SHIFT-LEFT` / `CMD-SHIFT-RIGHT`
Select everything to the left / right of the cursor
`SHIFT-UP` / `SHIFT-UP`
Select everything above / below the cursor
`CMD-A`
Select the entire editor buffer
`SHIFT-ENTER` `CTRL-ENTER` `OPT-ENTER`
Insert newline
`CTRL-R`
Command Search
`CMD-D`
Split pane
Keyboard binding
Shortcut description
`ESCAPE`
Closes the input suggestions or history menu
`CTRL-L`
Clears the terminal
`CTRL-H`
Backspace
`CTRL-C`
Clear the entire editor buffer
`CTRL-U`
Copy and Clear the current line
`CTRL-SHIFT-K`
Clear selected lines
`CTRL-C`, `CTRL-X`, `CTRL-V`
Copy, cut, paste
`CTRL-W` / `ALT-D`
Cut the word to the left / right of the cursor
`ALT-BACKSPACE` / `ALT-D`
Delete the word to the left / right of the cursor
`CTRL-K`
Delete everything to the right of the cursor
`ALT-LEFT` / `ALT-RIGHT`
Move to the beginning of the previous / next word
`CTRL-LEFT` / `CTRL-RIGHT`
Move backward / forward by one subword
`CTRL-A`/ `CTRL-E`
Move the cursor to the start / end of the line
Select the character to the left / right of the cursor
`META-SHIFT-B` / `META-SHIFT-F`
Select the word to the left / right of the cursor
Select everything to the left / right of the cursor
`SHIFT-UP` / `SHIFT-UP`
Select everything above / below the cursor
`CTRL-A`
Select the entire editor buffer
`SHIFT-ENTER` `CTRL-ENTER` `ALT-ENTER`
Insert newline
`CTRL-R`
Command Search
`CTRL-SHIFT-D`
Split pane
Keyboard binding
Shortcut description
`ESCAPE`
Closes the input suggestions or history menu
`CTRL-L`
Clears the terminal
`CTRL-H`
Backspace
`CTRL-C`
Clear the entire editor buffer
`CTRL-U`
Copy and Clear the current line
`CTRL-SHIFT-K`
Clear selected lines
`CTRL-C`, `CTRL-X`, `CTRL-V`
Copy, cut, paste
`CTRL-W` / `ALT-D`
Cut the word to the left / right of the cursor
`ALT-BACKSPACE` / `ALT-D`
Delete the word to the left / right of the cursor
`CTRL-K`
Delete everything to the right of the cursor
`ALT-LEFT` / `ALT-RIGHT`
Move to the beginning of the previous / next word
`CTRL-LEFT` / `CTRL-RIGHT`
Move backward / forward by one subword
`CTRL-A`/ `CTRL-E`
Move the cursor to the start / end of the line
Select the character to the left / right of the cursor
`META-SHIFT-B` / `META-SHIFT-F`
Select the word to the left / right of the cursor
Select everything to the left / right of the cursor
`SHIFT-UP` / `SHIFT-UP`
Select everything above / below the cursor
`CTRL-A`
Select the entire editor buffer
`SHIFT-ENTER` `CTRL-ENTER` `ALT-ENTER`
Insert newline
`CTRL-R`
Command Search
`CTRL-SHIFT-D`
Split pane
## 
[](#how-it-works)
How it Works
Text Editor Input Demo
![soft wrapping text in Warp terminal input editor](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-e80844ae06b894bf60fbb2baad6a1d8843095fcd%252Fsoft-wrapping.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=36d1da09&sv=2)
Soft Wrapping Demo
[PreviousSticky Command Header](/terminal/blocks/sticky-command-header)[NextAlias Expansion](/terminal/editor/alias-expansion)
Last updated 4 months ago
Was this helpful?