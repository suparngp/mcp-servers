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
 * [Share a session](#share-a-session)
 * [Known limitations](#known-limitations)
Was this helpful?
This action sends command information to Warp’s servers and is explicitly opt-in. Read more about privacy for cloud features in the [privacy overview](https://www.warp.dev/privacy/overview).
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-49346a9f4cbf5ef87cdada308b4f7708d41fc938%252Fsession_sharing_preview.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=6c156d76&sv=2)
Session Sharing allows multiple teammates to edit the input at the same time
### 
[](#share-a-session)
Share a session
To start sharing:
 1. From the [Command Palette](/terminal/command-palette), search for and select "Share New Session" or "Share Current Session".
 2. From the Pane header overflow menu, select "Start Session sharing"
 3. From the `RIGHT-CLICK` context menu, select "Share session..."
#### 
[](#how-to-control-a-starting-point-for-sharing)
How to control a starting point for sharing
If you select to share a current session, you will be given the option to share without scrollback or from the start of the session. When you share access from the start of a session (with scrollback), collaborators will be able to view and interact with your entire session history including command outputs from before sharing was initiated.
If you initiate a shared session using Block actions, you will be given the option to start sharing from the selected block onwards. This option gives you the precision to select a specific block of output in your session history as the starting point, excluding all previous scrollback before that block.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-9eff70e46ce75eaed56052c14b2b54226d0e1b61%252FScreenshot%25202024-04-24%2520at%25203.09.05%25E2%2580%25AFPM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=990945e4&sv=2)
Start sharing from a selected block onward or an entire session with or without scrollback
#### 
[](#how-to-allow-access-to-collaborators-in-your-session)
How to allow access to collaborators in your session
After starting a shared session, Warp will copy a link to your clipboard that you can share. Share links open the Warp's native app or the Web.
By default the links are restricted to only emails that have access. It’s critical you only share your session links in private channels with known teammates and approved collaborators. Do not include your session-sharing links in any public forums.
You can adjust who has view or edit access to your session and specifically:
 * Add emails to grant access
 * Allow anyone with the link
 * Allow anyone on your team
 * Revoke edit access from collaborators
 * Remove collaborators from the session
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-cbc2de4884896428461d94ea4930edf5e4e45345%252Fsession-who-has-access.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=d8475946&sv=2)
Update permissions through the share icon
When somebody accesses your shared session, they will be able to:
 * View your session in Warp including your command line input and output
 * Highlight blocks and text in your session
 * Request control to edit and enter commands in the sharer’s session
If granted access, collaborators can edit the input together in real-time and execute commands.
You can also:
 * Reference avatars and usernames for every collaborator who has access to your session
 * Jump to a collaborator’s selection by clicking on their avatar
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-8bd8c322de21dbc965dc969d693a9b2469c681c9%252Fsession-sharing-native-web-demo.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=586176b6&sv=2)
Session Sharing Native to Web Demo
#### 
[](#how-to-end-a-shared-session)
How to end a shared session
When you’re ready to end a shared session, click `Share > Stop` sharing to wrap up and close access for all collaborators.
#### 
[](#multiple-shared-sessions)
Multiple shared sessions
You may share multiple sessions simultaneously. If you have multiple shared sessions, you will find _Other shared sessions_ listed in the Share dropdown menu. You may also end multiple shared sessions at the same time with `Share > Stop` sharing all.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-72dc9022fb52487a8704ea93fd558b45ce9c1c57%252Fswitch-stop-session-sharing.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=b0f69ff&sv=2)
Switch between shared sessions or stop all shared sessions at once
### 
[](#known-limitations)
Known limitations
 * [Agent Mode blocks](/agents/using-agents) are not shareable during session sharing. Participants will be able to share regular shell commands that are run, but will not be able to share AI interactions (requested commands, AI blocks, etc.)
 * Even if enabled, [Secret Redaction](/privacy/secret-redaction) is not applied during session sharing.
 * There is a session size limit of 100MB per session, 1GB per user per day, and a maximum of 10 participants per session (excluding the sharer). These limits are subject to change.
 * Some of Warp's plans are limited to 5 shared sessions and the session limits do not reset. Upgrade to a [paid plan](https://www.warp.dev/pricing) to get unlimited sessions.
If you have any questions, please email [[email protected]](/cdn-cgi/l/email-protection#caacafafaea8aba9a1e1b9b98abdabb8bae4aeafbc).
[PreviousAdmin Panel](/knowledge-and-collaboration/admin-panel)[NextWarp CLI](/developers/cli)
Last updated 3 months ago
Was this helpful?