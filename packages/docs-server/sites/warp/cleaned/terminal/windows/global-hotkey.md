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
 * [How to access it](#how-to-access-it)
 * [Dedicated Window](#dedicated-window)
 * [Show/Hide All Windows](#show-hide-all-windows)
 * [How it works](#how-it-works)
 * [Troubleshooting Hotkey Dedicated Window](#troubleshooting-hotkey-dedicated-window)
Was this helpful?
On macOS, [system keyboard shortcuts](https://support.apple.com/en-us/HT201236) like `CMD-ESC`, `CMD-BACKTICK`, `CMD-TAB`, `CMD-PERIOD`, and `CMD-TILDE` need to be [unbound](https://support.apple.com/guide/mac-help/keyboard-shortcuts-mchlp2262/mac) before you can use them in Warp.
On Linux, the Global Hotkey may not work for some X11 window managers that do not implement [Extended Window Manager Hints](https://en.wikipedia.org/wiki/Extended_Window_Manager_Hints). Some examples include: [sowm](https://github.com/dylanaraps/sowm), [catwm](https://github.com/pyknite/catwm), [Fvwm](https://www.fvwm.org/), [dwm](https://dwm.suckless.org/), [2bWM](https://github.com/venam/2bwm), [monsterwm](https://github.com/c00kiemon5ter/monsterwm), [TinyWM](https://github.com/mackstann/tinywm), [x11fs](https://github.com/sdhand/x11fs), [XMonad](https://xmonad.org/)
## 
[](#how-to-access-it)
How to access it
### 
[](#dedicated-window)
Dedicated Window
Dedicated Window allows you to customize the windows' pinned position and its width and height ratio relative to your active screen size (also known as Quake Mode).
 1. Open `Settings > Features > Keys` and select "Dedicated hotkey window" from the Global Hotkey dropdown to enable the feature.
 2. Configure the keybinding, the windows position, screen, and relative size or uncheck "Autohides on the loss of keyboard focus" which will cause the dedicated Hotkey Window to stay on top when triggered regardless of mouse or keyboard focus.
On Linux and Windows, Warp does not support the "Autohides on the loss of keyboard focus" feature.
### 
[](#show-hide-all-windows)
Show/Hide All Windows
Show/Hide All Windows allows you to configure a shortcut to show/hide all Warp windows.
 1. Open `Settings > Features > Keys` and select "Show/hide all windows" from the Global Hotkey dropdown to enable the feature.
 2. Configure your preferred keybinding.
On Linux, hidden windows may not appear in your `ALT-TAB` window switcher menu. Furthermore, the ordering of windows beyond the top window may change after toggling.
## 
[](#how-it-works)
How it works
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-048acf9fd85b0fa2129bb90a1b3d8a2d1f911f5b%252FDedicated%2520Window.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=21e1a9a6&sv=2)
Global Hotkey - Dedicated Window Demo
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-af6164e0085e8fa8f3d2ff3602178e4c9343332c%252FShow-Hide%2520All%2520Windows.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=55679827&sv=2)
Global Hotkey - Show/Hide All Windows Demo
## 
[](#troubleshooting-hotkey-dedicated-window)
Troubleshooting Hotkey Dedicated Window
Review platform-specific instructions for troubleshooting the global hotkey below
macOS
Windows
Linux
If the keybinding doesn't work, check under `System Preferences > Security & Privacy > Accessibility` and tick the checkbox to grant Warp access.
On Windows, there are no known issues with Global Hotkey Dedicated Window. If you find an issue, please [send feedback](/support-and-billing/sending-us-feedback) to let us know.
The hotkey window may appear on the incorrect monitor under certain window sizes. For example, with GNOME, if the hotkey window is supposed to show on a monitor having the taskbar (GNOME Panel), and the window height is 100%, causing an overlap, the hotkey window may fallback to showing on an external monitor if you have one. Try working around this by setting a window height to a lesser percentage, e.g. 90%.
[PreviousWindow Management](/terminal/windows)[NextTabs](/terminal/windows/tabs)
Last updated 4 months ago
Was this helpful?