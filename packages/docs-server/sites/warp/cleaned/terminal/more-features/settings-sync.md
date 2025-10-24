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
 * [How to toggle settings sync](#how-to-toggle-settings-sync)
 * [How settings sync works](#how-settings-sync-works)
 * [Non-synced settings](#non-synced-settings)
Was this helpful?
Settings Sync is an experimental (Beta) feature. We will post updates on github request [#2561](https://github.com/warpdotdev/Warp/issues/2561). Please note that it sends your settings information to Warp’s servers. Read more about privacy for cloud features in the [privacy overview](https://www.warp.dev/privacy/overview).
Starting January 9, 2025, we will be enabling Settings Sync gradually for a percentage of Warp users. New users who are included in this percentage rollout will have Settings Sync on by default; existing users in the percentage rollout will need to opt-in to Settings Sync in Settings > Account.
## 
[](#how-to-toggle-settings-sync)
How to toggle settings sync
 * You can toggle Settings Sync within the `Settings > Account` pane
 * Through the [Command Palette](/terminal/command-palette) by searching for “Settings Sync”
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-662986453e3d04b84693ebfa18afc07802c85cdf%252Fsettings-sync-account.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=aeb8120d&sv=2)
Settings Sync in Account pane
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-15ccabe97d60491d7005c4f1c7fd8243bf48d542%252Fsettings-sync-palette.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=7ec0cbf3&sv=2)
Settings Sync in Command Palette
## 
[](#how-settings-sync-works)
How settings sync works
Settings Sync works by syncing the state of most of your Warp settings to our cloud servers.
When you log in to Warp on another device or through the browser if you have Settings Sync enabled, most of your settings will be the same as they were when you were logged in before.
That means your themes, most features, privacy settings, ai settings, are all the same everywhere you use Warp, saving you the time from having to set them up again.
When you first enable Settings Sync, the settings from the computer you enabled it on become the default settings for all devices. This is true if you toggle Settings Sync off and on as well - the synced settings are always from the last device you enabled Settings Sync on, so toggling effectively causes all of your devices to have settings from the current logged in instance.
### 
[](#non-synced-settings)
Non-synced settings
Not all settings are synced, however. Notably, Warp does not sync:
 * Custom keybindings (we may in the future). Alhough, you can set [custom keybinds with a file](/getting-started/keyboard-shortcuts#custom-keyboard-shortcuts)
 * Custom themes (we may in the future)
 * Device specific settings (e.g. what editor you prefer using, startup shell)
 * Platform-specific settings are synced across devices on the same platform (e.g. your settings for how to interact with the Linux clipboard are synced across all Linux devices, but not on Mac, Windows or Web).
You can tell when a setting is not synced because it will have a special cloud strikethrough icon in the settings panel.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-697734a14c0718b40ea2513bfdbe2d6ce8d1ea82%252Fsettings-not-synced.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=65cad272&sv=2)
Settings not synced
[PreviousAudible Bell](/terminal/more-features/audible-bell)[NextQuit Warning](/terminal/more-features/quit-warning)
Last updated 4 months ago
Was this helpful?