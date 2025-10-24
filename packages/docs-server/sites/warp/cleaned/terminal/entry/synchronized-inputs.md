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
 * [Command Entry](/terminal/entry)
 * [Command Corrections](/terminal/entry/command-corrections)
 * [Command Search](/terminal/entry/command-search)
 * [Command History](/terminal/entry/command-history)
 * [Synchronized Inputs](/terminal/entry/synchronized-inputs)
 * [YAML Workflows](/terminal/entry/yaml-workflows)
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
 * [Synchronized inputs vs. broadcast input](#synchronized-inputs-vs.-broadcast-input)
 * [How to access it](#how-to-access-it)
 * [How to use it](#how-to-use-it)
 * [How it works](#how-it-works)
Was this helpful?
### 
[](#synchronized-inputs-vs.-broadcast-input)
Synchronized inputs vs. broadcast input
Synchronized inputs in Warp work similarly to “broadcast input” settings in other terminals, but there are some differences.
With Warp’s synchronized inputs, whatever command you enter in one session will sync to the other sessions in its entirety. Whereas, "broadcast input" typically allows you to "broadcast" individual keystrokes, which may be more suitable for editing parts of commands.
## 
[](#how-to-access-it)
How to access it
There are three ways to access controls to synchronize inputs:
 * [Command Palette](/terminal/command-palette) in Warp: Search for “synchronize”
 * Mac menus for the Warp app: `Edit > Synchronize Input`
## 
[](#how-to-use-it)
How to use it
macOS
Windows
Linux
There are two modes available to scope how input is synchronized and one to stop any synchronization:
 * Synchronize All Panes in All Tabs
 * Synchronize All Panes in Current Tab `OPT-CMD-I`
 * Stop Synchronizing Any Panes `OPT-CMD-I`
There are two modes available to scope how input is synchronized and one to stop any synchronization:
 * Synchronize All Panes in All Tabs
 * Synchronize All Panes in Current Tab `CTRL-ALT-I`
 * Stop Synchronizing Any Panes `CTRL-ALT-I`
There are two modes available to scope how input is synchronized and one to stop any synchronization:
 * Synchronize All Panes in All Tabs
 * Synchronize All Panes in Current Tab `CTRL-ALT-I`
 * Stop Synchronizing Any Panes `CTRL-ALT-I`
When inputs are synchronized, you can start typing in one input editor and that same input will be entered into all of the input editors for all panes in your current tab or all tabs, depending on the scope you selected.
If you are working in an alternative editor mode (like vim), synchronized inputs will only apply to all tabs with that same editor type running.
When you get done, you can select “Stop Synchronizing Any Panes” to end the synchronization.
## 
[](#how-it-works)
How it works
![Demo showing synchronized inputs across panes and tabs](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2Fgithub.com%2Fwarpdotdev%2Fgitbook%2Fblob%2Fmain%2Fdocs%2F.gitbook%2Fassets%2FSynchronized-Inputs.gif&width=768&dpr=4&quality=100&sign=2df7c93e&sv=2)
Synchronized Inputs Demo
[PreviousCommand History](/terminal/entry/command-history)[NextYAML Workflows](/terminal/entry/yaml-workflows)
Last updated 4 months ago
Was this helpful?