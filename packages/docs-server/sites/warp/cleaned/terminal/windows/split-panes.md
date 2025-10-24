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
 * [Command Completions](/terminal/command-completions)
 * [Command Palette](/terminal/command-palette)
 * [Session Management](/terminal/sessions)
 * [Window Management](/terminal/windows)
 * [Global Hotkey](/terminal/windows/global-hotkey)
 * [Tabs](/terminal/windows/tabs)
 * [Split Panes](/terminal/windows/split-panes)
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
 * [How to use Split Panes](#how-to-use-split-panes)
 * [CTRL-TAB Behaviour](#ctrl-tab-behaviour)
 * [How Split Panes work](#how-split-panes-work)
Was this helpful?
## 
[](#how-to-use-split-panes)
How to use Split Panes
macOS
Windows
Linux
 * Split Panes to the right / down with `CMD-D` / `SHIFT-CMD-D` or in any direction by right-clicking on any Pane.
 * Activate the Previous / Next Pane with `CMD-[` / `CMD-]` or by clicking a pane.
 * Navigate among Split Panes with `OPT-CMD-ARROW`, the active pane will be marked with a triangle in the top corner.
 * Toggle Maximize Pane with `CMD-SHIFT-ENTER`.
 * Close the active Pane with `CMD-W`.
 * You can also drag and drop panes. Click and drag a Pane’s header around a given tab, drag the Pane to the tab bar to move it to another Tab, or make it into a Tab.
 * Split Panes to the right / down with `CTRL-SHIFT-D` / `CTRL-SHIFT-E` or in any direction by right-clicking on any Pane.
 * Activate the Previous / Next Pane with `CTRL-SHIFT-{` / `CTRL-SHIFT-}` or by clicking a pane.
 * Navigate among Split Panes with `CTRL-ALT-ARROW`, the active pane will be marked with a triangle in the top corner.
 * Toggle Maximize Pane with `CTRL-SHIFT-ENTER`.
 * Close the active Pane with `CTRL-SHIFT-W`.
 * You can also drag and drop panes. Click and drag a Pane’s header around a given tab, drag the Pane to the tab bar to move it to another Tab, or make it into a Tab.
 * Split Panes to the right / down with `CTRL-SHIFT-D` / `CTRL-SHIFT-E` or in any direction by right-clicking on any Pane.
 * Activate the Previous / Next Pane with `CTRL-SHIFT-{` / `CTRL-SHIFT-}` or by clicking a pane.
 * Navigate among Split Panes with `CTRL-ALT-ARROW`, the active pane will be marked with a triangle in the top corner.
 * Toggle Maximize Pane with `CTRL-SHIFT-ENTER`.
 * Close the active Pane with `CTRL-SHIFT-W`.
 * You can also drag and drop panes. Click and drag a Pane’s header around a given tab, drag the Pane to the tab bar to move it to another Tab, or make it into a Tab.
You can quickly find all the **pane** shortcuts by using the [Command Palette](/terminal/command-palette). You can also remap the shortcuts to your liking. See [Custom Keyboard Shortcuts](/getting-started/keyboard-shortcuts#custom-keyboard-shortcuts) for more details.
### 
[](#ctrl-tab-behaviour)
CTRL-TAB Behaviour
`CTRL-TAB` shortcut defaults to activate the previous / next [Tabs](/terminal/windows/tabs). You can configure the shortcut to cycle the most recent session, including any Split Panes, in `Settings > Features > Keys > Ctrl-Tab behavior`
## 
[](#how-split-panes-work)
How Split Panes work
Split Panes Demo
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-44512f81f876be15ad0a63749dc0740ddcc2e9cd%252Fsplit-panes-dragging-demo.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=bdb3a5cc&sv=2)
Split Panes Drag and Drop Demo
[PreviousTabs](/terminal/windows/tabs)[NextWarpify](/terminal/warpify)
Last updated 4 months ago
Was this helpful?