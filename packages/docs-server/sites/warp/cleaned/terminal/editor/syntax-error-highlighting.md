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
 * [What is Syntax Highlighting](#what-is-syntax-highlighting)
 * [How to access Syntax Highlighting](#how-to-access-syntax-highlighting)
 * [How to enable/disable Syntax Highlighting](#how-to-enable-disable-syntax-highlighting)
 * [How Syntax Highlighting Works](#how-syntax-highlighting-works)
 * [What is Error Underlining](#what-is-error-underlining)
 * [How to access Error Underlining](#how-to-access-error-underlining)
 * [How to enable/disable Error Underlining](#how-to-enable-disable-error-underlining)
 * [How Error Underlining works](#how-error-underlining-works)
Was this helpful?
## 
[](#what-is-syntax-highlighting)
What is Syntax Highlighting
Warp supports Syntax Highlighting in the [Input Editor.](/terminal/editor) It colors each part of a command to help differentiate between sub-commands, options/flags, arguments, and variables.
Newly installed apps or newly created aliases will not trigger syntax highlighting until you open a new Warp session (new window, tab, or pane), even if you `source` the RC files in the current session.
### 
[](#how-to-access-syntax-highlighting)
How to access Syntax Highlighting
When Syntax Highlighting is enabled, Warp's [Input Editor](/terminal/editor) automatically recognizes each part of the command as you type it into the Input Editor, and syntactically highlight them.
### 
[](#how-to-enable-disable-syntax-highlighting)
How to enable/disable Syntax Highlighting
Syntax highlighting is enabled by default, to toggle it:
 * Through the [Command Palette](/terminal/command-palette), search for the "Syntax Highlighting" option and click it (or press enter) to enable/disable.
 * Through `Settings > Features > Editor` , toggle "Syntax highlighting for commands"
### 
[](#how-syntax-highlighting-works)
How Syntax Highlighting Works
Syntax Highlighting Demo
## 
[](#what-is-error-underlining)
What is Error Underlining
Warp highlights errors in commands that are typed within the [Input Editor](/terminal/editor) e.g. if the binary for the command you've typed does not exist.
Newly installed apps or newly created aliases will trigger error underlining until you open a new Warp session (new window, tab, or pane), even if you `source` the RC files in the current session.
### 
[](#how-to-access-error-underlining)
How to access Error Underlining
When Error Underlining is enabled, Warp automatically underlines any invalid commands with a dashed red underline.
### 
[](#how-to-enable-disable-error-underlining)
How to enable/disable Error Underlining
Error underlining is enabled by default, to toggle it:
 * Through the [Command Palette](/terminal/command-palette), search for the "Syntax Highlighting" option and click it (or press enter) to enable/disable.
 * Through `Settings > Features > Editor` , toggle "Error underlining for commands"
### 
[](#how-error-underlining-works)
How Error Underlining works
Error Underlining Demo
[PreviousCommand Inspector](/terminal/editor/command-inspector)[NextInput Editor Vim Keybindings](/terminal/editor/vim)
Last updated 4 months ago
Was this helpful?