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
 * [Themes](/terminal/appearance/themes)
 * [Custom Themes](/terminal/appearance/custom-themes)
 * [Prompt](/terminal/appearance/prompt)
 * [Input Position](/terminal/appearance/input-position)
 * [Text, Fonts, & Cursor](/terminal/appearance/text-fonts-cursor)
 * [Size, Opacity, & Blurring](/terminal/appearance/size-opacity-blurring)
 * [Pane Dimming & Focus](/terminal/appearance/pane-dimming)
 * [Blocks Behavior](/terminal/appearance/blocks-behavior)
 * [Tabs Behavior](/terminal/appearance/tabs-behavior)
 * [App Icons](/terminal/appearance/app-icons)
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
 * [How to access it](#how-to-access-it)
 * [Related commands](#related-commands)
 * [How it works](#how-it-works)
Was this helpful?
You can select from three different input positions, which each have different modes of behavior for the flow of input/output Blocks.
Input position
Behavior
Start at the top (Classic mode)
When you select “start at the top,” the prompt with input will initiate at the top of the view and move down in the view as you enter commands. Blocks of input/output will stack above the prompt and command input. You can scroll up or navigate up to visit past commands. You can enter `CTRL-L` or the `clear` command at any time to return the input to the top of the screen while still maintaining your scroll history.
Pin to the top (Reverse mode)
When you select “pin to the top,” the prompt with input will display pinned to the top of your terminal view. Blocks of grouped input/output will flow down the view in reverse order with your latest results at the top. You can scroll down or navigate down to visit past commands. For long-running commands, you can also click "Lock scrolling at bottom of block" to continue to follow the stdout.
Pin to the bottom (Warp mode)
Warp mode starts with input pinned to the bottom of your terminal view. Blocks of grouped input/output flow up and out of view. You can scroll up or navigate up to visit past commands.
## 
[](#how-to-access-it)
How to access it
 * You can configure your input position by navigating to `Settings > Appearance > Input`.
 * You can also choose and set modes from the [Command Palette](/terminal/command-palette).
Changes to the Input position take place immediately and apply to all open panes.
### 
[](#related-commands)
Related commands
macOS
Windows
Linux
 * `CMD-K` will clear the entire list of input/output blocks for a clean view
 * `CTRL-L` will move the list of input/output blocks outside of the view and past the scroll so you have a clean view and the ability to easily visit past commands
 * For long Blocks, you can press `SHIFT-CMD-UP`/`SHIFT-CMD-DOWN` to Scroll to the top/bottom the selected block.
 * `CTRL-SHIFT-K` will clear the entire list of input/output blocks for a clean view
 * `CTRL-L` will move the list of input/output blocks outside of the view and past the scroll so you have a clear view and the ability to easily visit past commands
 * For long Blocks, you can press `CTRL-SHIFT-UP`/`CTRL-SHIFT-DOWN` to Scroll to the top/bottom of the selected block.
 * `CTRL-SHIFT-K` will clear the entire list of input/output blocks for a clean view
 * `CTRL-L` will move the list of input/output blocks outside of the view and past the scroll so you have a clear view and the ability to easily visit past commands
 * For long Blocks, you can press `CTRL-SHIFT-UP`/`CTRL-SHIFT-DOWN` to Scroll to the top/bottom of the selected block.
## 
[](#how-it-works)
How it works
Input Position Demo
[PreviousPrompt](/terminal/appearance/prompt)[NextText, Fonts, & Cursor](/terminal/appearance/text-fonts-cursor)
Last updated 4 months ago
Was this helpful?