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
 * [About Vim keybindings](#about-vim-keybindings)
 * [How to enable Vim Keybindings](#how-to-enable-vim-keybindings)
 * [Customizing Keybindings](#customizing-keybindings)
 * [Supported Keybindings](#supported-keybindings)
 * [Movement](#movement)
 * [Editing](#editing)
 * [Search](#search)
 * [Mode Switching](#mode-switching)
 * [Registers](#registers)
 * [Feedback](#feedback)
Was this helpful?
## 
[](#about-vim-keybindings)
About Vim keybindings
The Vi family of programs (including Vim and Neovim) are modal text editors that allow for keyboard-driven text editing. Vi-style keybindings are especially popular among developers for their speed and precision in navigating and manipulating code. Warp’s [code editor](/code/code-editor) now includes native support for Vim keybindings (also known as Vim mode), offering a familiar editing experience directly within your coding workflows.
### 
[](#how-to-enable-vim-keybindings)
How to enable Vim Keybindings
Vim mode in the code editor uses the same setting toggle as the input editor. To enable:
 * Through the [Command Palette](/terminal/command-palette), search for "Vim Keybindings".
 * Through `Settings > Features > General`, toggle "Edit code and commands with Vim keybindings".
Unlike the input editor, the Vim implementation in the code editor starts in Normal mode. 
### 
[](#customizing-keybindings)
Customizing Keybindings
At the moment, Warp only supports default Vim keybindings.
One exception is the keyboard shortcut for exiting insert mode, which can be rebound under `Settings > Keyboard Shortcuts > Exit Vim Insert Mode`, or through the [Command Palette](/terminal/command-palette) search for "Exit Vim Insert Mode".
## 
[](#supported-keybindings)
Supported Keybindings
Below is a list of the vim functionality implemented in Warp so far.
### 
[](#movement)
Movement
See [Vim docs: motion](https://vimdoc.sourceforge.net/htmldoc/motion.html) for more information.
#### 
[](#basic)
Basic
Command(s)
Description
`h`, `j`, `k`, `l`
single-char movement
`<space>`, `<backspace>`
single-char movement with line wrap
`w`, `W`, `b`, `B`, `e`, `E`
word movement
`ge`, `gE`
end of previous word
`$`
end of line
`0`
beginning of line
`^`
first non-whitespace character of line
`%`
jump to matching bracket
`[`, `]`
prev/next unmatched bracket
`_`
beginning of the current line
`+`
first non-whitespace character of the next line
`-`
first non-whitespace character of the previous line
`{`, `}`
prev/next paragraph
#### 
[](#multi-line-related)
Multi-line-related
Command(s)
Description
`gg`, `G`
jump to first/last line
### 
[](#editing)
Editing
Command(s)
Description
`r`
replace character under cursor
`d`, `D`
delete a range or object
`c`, `C`
change a range or object (delete, then go to insert mode)
`s`, `S`
substitute (like change, but can only delete at the cursor)
`x`, `X`
delete under cursor
`y`, `Y`
yank (copy) into the clipboard
`p`, `P`
paste from the clipboard
`u`, `⌃r`
undo, redo
`~`
toggle upper/lowercase under cursor
`gu`
lowercase under cursor (`u` in visual mode)
`gU`
uppercase under cursor (`U` in visual mode)
`J`
join current and following lines
`.`
repeat last edit
`gcc`
toggle comments on current line
`gc`
toggle comments on visual selection
See [Vim docs: editing](https://vimdoc.sourceforge.net/htmldoc/editing.html) for more information.
#### 
[](#text-objects)
Text Objects
Command(s)
Description
`i`
inner (exclude delimiters in text object)
`a`
around (include delimiters in text object)
`w`, `W`
whitespace-delimited string (word)
`"`, `'`, ```
quote-delimited string
`(`, `{`, `[`
parenthesized/bracketed string
See [Vim docs: text objects](https://vimdoc.sourceforge.net/htmldoc/motion.html#text-objects) for more information.
### 
[](#search)
Search
#### 
[](#character-search)
Character Search
Command(s)
Description
`t`, `T`, `f`, `F`
find next/prev matching character on line
`;`
repeat last character search in the same direction
`,`
repeat last character search in the opposite direction
See [Vim docs: left-right motions](https://vimdoc.sourceforge.net/htmldoc/motion.html#f) for more information.
#### 
[](#general-search)
General Search
Unlike Vim, general search commands don't search within the buffer. Instead, they open Warp's native command search.
Command(s)
Description
`/`, `?`, `*`, `#`
open Warp command search
### 
[](#mode-switching)
Mode Switching
Command(s)
Description
`i`
insert text before the cursor
`I`
insert text before the first non-whitespace character in the line
`a`
append text after the cursor
`A`
append text at the end of the line
`o`
begin new line below the cursor and insert text
`O`
begin new line above the cursor and insert text
`v`
visual character mode
`V`
visual line mode
See [Vim docs: insert](https://vimdoc.sourceforge.net/htmldoc/insert.html#insert) and [Vim docs: visual mode](https://vimdoc.sourceforge.net/htmldoc/visual.html#visual-mode) for more information.
### 
[](#registers)
Registers
Command(s)
Description
`"`
register prefix
Warp currently supports the following registers:
Register name
Description
`a`–`z`, `A`–`Z`
named registers
`+`
system clipboard
`*`
system clipboard
`"`
unnamed register, containing the text of the last delete or yank
See [Vim docs: registers](https://vimdoc.sourceforge.net/htmldoc/change.html#registers) for more information.
## 
[](#feedback)
Feedback
The best way to report bugs and request features is through Warp's [GitHub Issues](https://github.com/warpdotdev/Warp/issues) page. Please note that the issue or request is for Vim Keybindings.
[PreviousFind and Replace](/code/code-editor/find-and-replace)[NextCodebase Context](/code/codebase-context)
Last updated 1 month ago
Was this helpful?