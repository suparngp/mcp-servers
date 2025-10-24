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
 * [How to use Tabs](#how-to-use-tabs)
 * [Tab Restoration](#tab-restoration)
 * [CTRL-TAB Behavior](#ctrl-tab-behavior)
 * [Tabs Behavior](#tabs-behavior)
 * [How Tabs work](#how-tabs-work)
Was this helpful?
New Tabs will default to the active Tabs’ current [Working Directory](/terminal/more-features/working-directory) and the actual color values will be automatically derived from your Warp [Theme](/terminal/appearance/themes).
## 
[](#how-to-use-tabs)
How to use Tabs
macOS
Windows
Linux
 * Right-click on the new Tab button `+` to make a new tab, restore closed tab, or run a saved [Launch Configuration](/terminal/sessions/launch-configurations).
 * Open a new Tab with `CMD-T` or by clicking on the `+` in the top bar.
 * Close the current Tab with `CMD-W` or by clicking on the `X` on hover over a Tab.
 * Reopen closed tabs with `SHIFT-CMD-T`.
 * Move a Tab to the Left / Right with `CTRL-SHIFT-LEFT` / `CTRL-SHIFT-RIGHT` or by clicking and dragging a Tab.
 * Activate the Previous / Next Tab with `SHIFT-CMD-{` / `SHIFT-CMD-}` or by clicking a Tab.
 * Activate the first through eighth Tabs with `CMD-1` thru `CMD-8`.
 * Switch to the last Tab with `CMD-9`.
 * Double-click a Tab to rename it.
 * Right-clicking on a Tab reveals more options you can explore within the [Command Palette](/terminal/command-palette) or [Keyboard Shortcuts](/getting-started/keyboard-shortcuts#fundamentals).
 * Right-click on the new Tab button `+` to make a new tab, restore closed tab, or run a saved [Launch Configuration](/terminal/sessions/launch-configurations).
 * Open a new Tab with `CTRL-SHIFT-T` or by clicking on the `+` in the top bar.
 * Close the current Tab with `CTRL-SHIFT-W` or by clicking on the `x` on hover over a Tab.
 * Reopen closed tabs with `CTRL-ALT-T`.
 * Move a Tab to the Left / Right with `CTRL-SHIFT-LEFT` / `CTRL-SHIFT-RIGHT` or by clicking and dragging a Tab.
 * Activate the Previous / Next Tab with `CTRL-PGUP` / `CTRL-PGDN` or by clicking a Tab.
 * Activate the first through eighth Tabs with `CTRL-1` thru `CTRL-8`.
 * Switch to the last Tab with `CTRL-9`.
 * Double-click a Tab to rename it.
 * Right-clicking on a Tab reveals more options you can explore within the [Command Palette](/terminal/command-palette) or [Keyboard Shortcuts](/getting-started/keyboard-shortcuts#fundamentals).
 * Right-click on the new Tab button `+` to make a new tab, restore closed tab, or run a saved [Launch Configuration](/terminal/sessions/launch-configurations).
 * Open a new Tab with `CTRL-SHIFT-T` or by clicking on the `+` in the top bar.
 * Close the current Tab with `CTRL-SHIFT-W` or by clicking on the `x` on hover over a Tab.
 * Reopen closed tabs with `CTRL-ALT-T`.
 * Move a Tab to the Left / Right with `CTRL-SHIFT-LEFT` / `CTRL-SHIFT-RIGHT` or by clicking and dragging a Tab.
 * Activate the Previous / Next Tab with `CTRL-PGUP` / `CTRL-PGDN` or by clicking a Tab.
 * Activate the first through eighth Tabs with `CTRL-1` thru `CTRL-8`.
 * Switch to the last Tab with `CTRL-9`.
 * Double-click a Tab to rename it.
 * Right-clicking on a Tab reveals more options you can explore within the [Command Palette](/terminal/command-palette) or [Keyboard Shortcuts](/getting-started/keyboard-shortcuts#fundamentals).
**Terminal Tip** Using your `.zshrc` or `.bashrc` files on macOS or Linux, you can set a new Tab name:
Copy```
# Set name, where MyTabName would be whatever you want to see in the Tab ( either a fixed string, $PWD, or something else )
functionset_name () {
echo-ne"\033]0;MyTabName\007"
}
# Add the function to the environment variable in either Zsh or Bash
if [ -n"$ZSH_VERSION" ]; then
 precmd_functions+=(set_name)
elif [ -n"$BASH_VERSION" ]; then
 PROMPT_COMMAND='set_name'
fi
```
Learn more about Tab names [here](https://learn.microsoft.com/en-us/windows/terminal/tutorials/tab-title#set-the-shells-title).
### 
[](#tab-restoration)
Tab Restoration
Tab Restoration enables you to reopen recently closed tabs for up to 60 seconds. Configure this feature in `Settings > Features > Session > Enable reopening of closed sessions`
### 
[](#ctrl-tab-behavior)
CTRL-TAB Behavior
`CTRL-TAB` shortcut defaults to activate the previous / next Tab. You can configure the shortcut to cycle the most recent session, including any [Split Panes](/terminal/windows/split-panes), in `Settings > Features > Keys > Ctrl-Tab behavior`
### 
[](#tabs-behavior)
Tabs Behavior
Please see our [Appearance > Tabs Behavior](/terminal/appearance/tabs-behavior) docs for more Tab related settings.
### 
[](#how-tabs-work)
How Tabs work
Tabs Demo
[PreviousGlobal Hotkey](/terminal/windows/global-hotkey)[NextSplit Panes](/terminal/windows/split-panes)
Last updated 4 months ago
Was this helpful?