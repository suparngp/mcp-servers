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
Was this helpful?
Warp automatically checks for updates on startup. A notification will appear in the top right corner of the Warp window when a new update is available.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-976978f8711aaeb81d33778ed5c3a9d0a5820831%252Fupdate-available%2520%282%29%2520%281%29.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=e4f9680d&sv=2)
Update Available
To check for updates, search for "update" in the [Command Palette](/terminal/command-palette) or go to `Settings > Accounts` and click "Check for Update".
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-99ab35e6148db2f437666654403f1e91bcb92151%252Fcheck-for-update.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=24720267&sv=2)
Check for Update manually
If nothing happens, it means you already have the latest stable build.
## 
[](#auto-update-issues)
Auto-Update Issues
Warp cannot auto-update if it does not have the correct permissions to replace the running version of Warp If this is the case, a banner will prompt you to manually update Warp.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-5b32279175fc86324225ee14a9eb1b38db1f8489%252Fimage.png%3Falt%3Dmedia%26token%3D3677f821-42b2-42a0-b341-2d78a573b5b6&width=768&dpr=4&quality=100&sign=761b0492&sv=2)
Update Available
There are 2 main causes of this:
 1. You opened Warp directly from the mounted volume instead of dragging it into your Applications directory. If this is the case, the easiest fix is to quit Warp, drag the application into /Applications, and restart Warp.
 2. You are a non-Admin user. This can happen if you use a computer with multiple profiles. If you have admin access on the computer, opening the app with the admin user should fix the auto-update issues.
(Oct 2022): There is a known issue with [auto-update on MacOS Ventura](/support-and-billing/known-issues#auto-update-on-macos-ventura).
[PreviousOverages](/support-and-billing/plans-and-pricing/usage-overages)[NextUsing Warp Offline](/support-and-billing/using-warp-offline)
Last updated 4 months ago
Was this helpful?