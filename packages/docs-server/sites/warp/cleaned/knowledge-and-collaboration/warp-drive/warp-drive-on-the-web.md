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
 * [Notebooks](/knowledge-and-collaboration/warp-drive/notebooks)
 * [Workflows](/knowledge-and-collaboration/warp-drive/workflows)
 * [Prompts](/knowledge-and-collaboration/warp-drive/prompts)
 * [Environment Variables](/knowledge-and-collaboration/warp-drive/environment-variables)
 * [Warp Drive on the Web](/knowledge-and-collaboration/warp-drive/warp-drive-on-the-web)
 * [Warp Drive as Agent Mode Context](/knowledge-and-collaboration/warp-drive/warp-drive-as-agent-mode-context)
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
 * [What is Warp Drive on the Web?](#what-is-warp-drive-on-the-web)
 * [Accessing Warp Drive on the Web](#accessing-warp-drive-on-the-web)
 * [Managing Your View Preferences - Web or Desktop](#managing-your-view-preferences-web-or-desktop)
 * [Supported Browsers](#supported-browsers)
Was this helpful?
## 
[](#what-is-warp-drive-on-the-web)
What is Warp Drive on the Web?
Warp now gives developers the ability to view their drives and shared sessions on the browser.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-52d21001e932c73386278e1b2620eab6d6458e3f%252FScreenshot%25202024-07-23%2520at%252012.54.16%25E2%2580%25AFPM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=3b424303&sv=2)
A web-based rendering of a Team Workflow
## 
[](#accessing-warp-drive-on-the-web)
Accessing Warp Drive on the Web
Warp's web-based viewing experience can currently be accessed via:
 * The [`app.warp.dev/app` homepage](https://app.warp.dev/app)
 * [Drive Object](/knowledge-and-collaboration/warp-drive#sharing-your-drive-objects) Links
 * [Session Sharing](/knowledge-and-collaboration/session-sharing#how-to-allow-access-to-collaborators-in-your-session) Links
You should be able to edit and view web-based objects and session as normal. The one exception is executing a command from a workflow or notebook since there is no shell session running on the web.
## 
[](#managing-your-view-preferences-web-or-desktop)
Managing Your View Preferences - Web or Desktop
If the Warp app is installed, links will open on the desktop by default. You can manage whether Warp links open in Warp's desktop app or the browser in multiple ways:
The desktop option is only presented if Warp's web service is able to detect the Warp app installed locally. Warp desktop opens localhost port 9277 to accomplish this detection. This is done in a separate process that does not have access to your terminal contents. If you would like to use Warp locally and do not have it installed, please visit our [installation guide.](/)
 1. The first time you follow a link, if Warp is not installed, you will be prompted to download it. You can dismiss the popup to stay on the web.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-6c15d2ac9052fa75752d817b0a66102fd511537b%252FScreenshot%25202024-07-11%2520at%252010.07.22%25E2%2580%25AFAM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=92b9c650&sv=2)
 1. This preference can be changed at any point in _Settings > Features > General > Open links in desktop app._ Note that this setting is only available while on the web-based version of Warp.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-b94827a5b83e6d43952114c6914880293523040d%252FScreenshot%25202024-07-23%2520at%25201.09.06%25E2%2580%25AFPM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=ac4fb4a8&sv=2)
Setting managing how to open links
 2. You can always switch between web and desktop views on a case-by-case basis.
 1. To switch from a web-view to Desktop for a given object, open the _overflow menu > Open link on Desktop._
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-2d8b447362bf1656dc81ae9fb8e5773ad6990423%252FScreenshot%25202024-07-23%2520at%25201.10.58%25E2%2580%25AFPM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=fe88e9ab&sv=2)
 2. To stay on the web for a given object despite a global Desktop preference, follow the _View on the web_ option that is part of the redirect screen to Desktop.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-43d213d98c824a9f6282d57dd026329fee7cf746%252FScreenshot%25202024-07-23%2520at%25201.11.20%25E2%2580%25AFPM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=34d09797&sv=2)
## 
[](#supported-browsers)
Supported Browsers
Modern browser support currently includes
 * Chrome
 * Firefox
 * Safari
[PreviousEnvironment Variables](/knowledge-and-collaboration/warp-drive/environment-variables)[NextWarp Drive as Agent Mode Context](/knowledge-and-collaboration/warp-drive/warp-drive-as-agent-mode-context)
Last updated 4 months ago
Was this helpful?