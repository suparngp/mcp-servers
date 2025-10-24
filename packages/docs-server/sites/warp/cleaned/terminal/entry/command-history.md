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
 * [What is it](#what-is-it)
 * [How to access it](#how-to-access-it)
 * [How it works](#how-it-works)
Was this helpful?
## 
[](#what-is-it)
What is it
While running, Warp isolates the history of each shell session e.g. if you have two Split Panes open, commands created in one pane do not populate the history of the other. Warp combines the history upon closing.
Command History also provides rich information like exit code, directory, thread, time to finish running, last run, etc.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-abf97bc8031534f9b5db2c988b486f5d69f10ba0%252Fcommand-history-rich.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=b27f5af1&sv=2)
Command History rich information
## 
[](#how-to-access-it)
How to access it
 * Hitting `UP` in the [Input Editor](https://github.com/warpdotdev/docs/blob/main/features/entry/editor/README.md) brings up your history and performs a prefix search based on input.
 * Pressing `CTRL-R` opens the [Command Search](/terminal/entry/command-search) panel and initiates a search of your Command History. To navigate the Command Search panel:
 * Start typing and Warp will automatically filter using fuzzy search. Warp bolds matching text when filtering with fuzzy search.
## 
[](#how-it-works)
How it works
Command History Demo
[PreviousCommand Search](/terminal/entry/command-search)[NextSynchronized Inputs](/terminal/entry/synchronized-inputs)
Last updated 4 months ago
Was this helpful?