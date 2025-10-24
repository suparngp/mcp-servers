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
 * [What is it](#what-is-it)
 * [How to access it](#how-to-access-it)
 * [Notifications](#notifications)
 * [How it works](#how-it-works)
 * [Troubleshooting Notifications](#troubleshooting-notifications)
Was this helpful?
## 
[](#what-is-it)
What is it
Notifications can be sent when a command completes after a configurable number of seconds or when a running command needs you to enter a password to proceed. For either of these triggers, Warp will only send you a desktop notification if you are using a different app at the time the trigger is fired.
## 
[](#how-to-access-it)
How to access it
### 
[](#notifications)
Notifications
 * Notifications are enabled by default and require system permissions to appear.
 * If you've turned Notifications off before, toggle it back on by going to `Settings > Features > Session`, or quickly toggle Notifications with the [Command Palette](/terminal/command-palette).
 * Customize Notification triggers for long-running commands or password prompts by going to `Settings > Features`.
On macOS, you will want to **Allow** or **Accept** the request so that Warp can send you desktop notifications. If you accidentally denied it or would like to re-enable Notifications later, check the [troubleshooting guide below](/terminal/more-features/notifications#troubleshooting-notifications).
## 
[](#how-it-works)
How it works
Notifications Demo
## 
[](#troubleshooting-notifications)
Troubleshooting Notifications
macOS
Windows
Linux
Warp requires two distinct notification settings to work. Mac system settings found in `Mac > System Preferences > Notifications & Focus` and Warp app settings found in `Settings > Features > Session` must both be enabled for Notifications to show. If you have Notifications enabled in the system and Warp, but you still aren't receiving desktop notifications, try the following:
 * Make sure that you are navigated away from Warp when you expect to receive the notification.
 * Make sure the **Do Not Disturb** mode is turned off in `Mac > System Preferences > Notifications > Notifications & Focus > Focus`.
 * Go to `Mac > System Preferences > Notifications & Focus > Notifications` and select Warp in the list. Make sure either banner style or alert style notifications are selected, then quit and restart Warp.
 * To get the MacOS notification prompt to show again for Warp, run `defaults delete dev.warp.Warp-Stable Notifications`, then restart Warp and toggle on the `Settings > Features > Receive desktop notifications from Warp`.
 * Once all of the above is done, please Restart MacOS to apply the changes and that should help with restoring notifications in Warp.
Warp requires two distinct notification settings to work. Windows system settings found in `Settings > System > Notifications > Warp` and Warp app settings found in `Settings > Features > Session` must both be enabled for Notifications to show.
If you have Notifications enabled in the system and Warp, but you still aren't receiving desktop notifications, try the following:
 * Make sure that you are navigated away from Warp when you expect to receive the notification.
 * Make sure the **Do Not Disturb** mode or **Focus** is turned off.
 * Go to `System > Notifications` and select Warp in the list. Make sure notifications are turned on, then quit and restart Warp.
Warp requires two distinct notification settings to work. Linux system settings found in `Settings > Notifications > Warp` and Warp app settings found in `Settings > Features > Session` must both be enabled for Notifications to show.
If you have Notifications enabled in the system and Warp, but you still aren't receiving desktop notifications, try the following:
 * Make sure that you are navigated away from Warp when you expect to receive the notification.
 * Make sure the **Do Not Disturb** mode (if your distribution supports it) is turned off.
 * Go to `Settings > Notifications` and select Warp in the list. Make sure notifications are turned on, then quit and restart Warp.
Please [reach out to us](/support-and-billing/sending-us-feedback#sending-warp-feedback) if any other issues.
[PreviousFull-screen Apps](/terminal/more-features/full-screen-apps)[NextAudible Bell](/terminal/more-features/audible-bell)
Last updated 3 months ago
Was this helpful?