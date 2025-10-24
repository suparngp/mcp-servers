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
 * [Warpify](/terminal/warpify)
 * [More Features](/terminal/more-features)
 * [Accessibility](/terminal/more-features/accessibility)
 * [Files, Links, & Scripts](/terminal/more-features/files-and-links)
 * [Markdown Viewer](/terminal/more-features/markdown-viewer)
 * [Working Directory](/terminal/more-features/working-directory)
 * [Text Selection](/terminal/more-features/text-selection)
 * [Full-screen Apps](/terminal/more-features/full-screen-apps)
 * [Desktop Notifications](/terminal/more-features/notifications)
 * [Audible Bell](/terminal/more-features/audible-bell)
 * [Settings Sync (Beta)](/terminal/more-features/settings-sync)
 * [Quit Warning](/terminal/more-features/quit-warning)
 * [URI Scheme](/terminal/more-features/uri-scheme)
 * [Linux](/terminal/more-features/linux)
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
 * [Mouse and Scroll Reporting](#mouse-and-scroll-reporting)
 * [How to access it](#how-to-access-it)
 * [How it works](#how-it-works)
 * [Padding](#padding)
 * [How to access it](#how-to-access-it-1)
Was this helpful?
## 
[](#mouse-and-scroll-reporting)
Mouse and Scroll Reporting
Warp supports configuring how to handle mouse and scroll events. They can be sent to the currently running app, e.g. `vim`, or kept and handled by Warp.
Mouse reporting must be enabled to also toggle scroll reporting.
Once mouse reporting is enabled, Warp will use ANSI escape sequences to communicate mouse events to the running app.
If you want a mouse event to go to Warp instead (for example, for text selection) without disabling mouse reporting, you can hold the `SHIFT` key.
### 
[](#how-to-access-it)
How to access it
 * From the Settings panel, `Settings > Features > Enable Mouse Reporting`
 * Scroll Reporting can be enabled after toggling `Enable Mouse Reporting`
 * From the [Command Palette](/terminal/command-palette), search for "Toggle Mouse Reporting"
 * From the macOS Menu, `View > Toggle Mouse Reporting`
### 
[](#how-it-works)
How it works
Mouse and Scroll Reporting Demo
## 
[](#padding)
Padding
Warp supports configuring how much padding surrounds full-screen apps. The default is 0 pixel padding, but this can be changed to a custom padding amount or to match the padding in the Blocklist.
Warp allows you to scale your terminal by fractions of a cell width | height. When your terminal size is not perfectly aligned to a cell width | height, the extra space appears as padding on the right | bottom.
### 
[](#how-to-access-it-1)
How to access it
 * Go to `Settings > Appearance > Full Screen Apps` or from the [Command Palette](/terminal/command-palette) search for "Appearance"
 * `Use custom padding in alt-screen` is enabled by default, you can disable it to match the Blocklist padding
 * Set the desired uniform padding (px) pixels, which is set to 0px by default
Some full-screen applications don't behave well when resizing. If you are experiencing rendering issues with full screen apps, try turning this setting off. This will ensure that full-screen apps don't need to resize when starting up.
![alt-screen padding setting](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FUySo4Ib6wmdr7vEqc3yr%252FCleanShot%25202024-12-05%2520at%252012.11.18.png%3Falt%3Dmedia%26token%3D19376df7-27b7-41d0-8f83-ce26fc321d73&width=768&dpr=4&quality=100&sign=97bd8129&sv=2)
Alt-screen padding setting
[PreviousText Selection](/terminal/more-features/text-selection)[NextDesktop Notifications](/terminal/more-features/notifications)
Last updated 4 months ago
Was this helpful?