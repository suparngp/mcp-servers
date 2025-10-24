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
 * [Launch Configurations](/terminal/sessions/launch-configurations)
 * [Session Navigation](/terminal/sessions/session-navigation)
 * [Session Restoration](/terminal/sessions/session-restoration)
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
 * [How to access Session Restoration](#how-to-access-session-restoration)
 * [How Session Restoration works](#how-session-restoration-works)
Was this helpful?
## 
[](#what-is-it)
What is it
Session restoration allows you to quickly pick up where you left off in your previous terminal session.
## 
[](#how-to-access-session-restoration)
How to access Session Restoration
 * Session Restoration comes enabled by default in Warp.
On Linux, opening windows at a specific position is not supported in Wayland.
 * You can disable Session Restoration by going to `Settings > Features`, then toggling off `Restore windows, tabs, and panes on startup`.
Toggling off Session Restoration will not clear the [SQLite database](/terminal/sessions/session-restoration#session-restoration-database); however, Warp will stop recording new output.
## 
[](#how-session-restoration-works)
How Session Restoration works
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-eea5d549c432c9c124c175120bc2b901b1add9fb%252Fsessions-block_restoration.gif%3Falt%3Dmedia%26token%3D56d16d7b-d27f-4d3d-b0af-a5ff017b5ead&width=768&dpr=4&quality=100&sign=854d44db&sv=2)
Session Restoration Demo
#### 
[](#session-restoration-database)
Session Restoration database
Warp saves the data from your previous session's windows, tabs, and panes to a SQLite database on your computer, and every time you quit the app, this data is overwritten by your latest session. You can open the database directly and inspect its full contents like so:
macOS
Windows
Linux
Copy```
sqlite3 "$HOME/Library/Application Support/dev.warp.Warp-Stable/warp.sqlite"
```
Copy```
sqlite3 $env:LOCALAPPDATA\warp\Warp\data\warp.sqlite
```
Copy```
sqlite3 "${XDG_STATE_HOME:-$HOME/.local/state}/warp-terminal/warp.sqlite"
```
**How to clear the Session Restoration database**
Sometimes, you may want to prevent a sensitive Block from being saved on your computer, or you may want to clear blocks from a machine entirely.
This interferes with the running session's ability to save content and may require you close Warp before running the database removal commands.
The following guidance is destructive and will delete any sessions and block history.
There are two ways to do this:
macOS
Windows
Linux
 * Clear the blocks from your running Warp session with `CMD-K`.
 * Delete the SQLite file entirely with the following command:
Copy```
rm -f "$HOME/Library/Application Support/dev.warp.Warp-Stable/warp.sqlite"
```
 * Clear the blocks from your running Warp session with `CTRL-SHIFT-K`.
 * Delete the SQLite file entirely with the following command:
Copy```
Remove-Item -Force $env:LOCALAPPDATA\warp\Warp\data\warp.sqlite
```
 * Clear the blocks from your running Warp session with `CTRL-SHIFT-K`.
 * Delete the SQLite file entirely with the following command:
Copy```
rm -f "${XDG_STATE_HOME:-$HOME/.local/state}/warp-terminal/warp.sqlite"
```
[PreviousSession Navigation](/terminal/sessions/session-navigation)[NextWindow Management](/terminal/windows)
Last updated 1 month ago
Was this helpful?