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
 * [What is it](#what-is-it)
 * [How to use it](#how-to-use-it)
 * [How it Works](#how-it-works)
 * [Known Issues with Network Log](#known-issues-with-network-log)
Was this helpful?
## 
[](#what-is-it)
What is it
You can use Warp’s network log to help debug issues or simply use it to understand when information is sent or received over the network throughout a Warp terminal session.
Each log item is a timestamped Debug format string for either a request or response object handled by Warp. Messages are logged via pre-request and post-response hooks in Warp’s internal HTTP client.
## 
[](#how-to-use-it)
How to use it
 1. To access the network log, select the Input in a session and open the [Command Palette](/terminal/command-palette), then search for “Show Warp Network Log”.
 2. That will insert a command into your Input editor - it should look something like this: `tail -f "some/path/to/warp_network.log"`.
 3. Press Enter to run this command. You’ll then see the corresponding requests and responses logged in the network log.
## 
[](#how-it-works)
How it Works
Network Log Demo
## 
[](#known-issues-with-network-log)
Known Issues with Network Log
At the moment, network traffic originating from crash reports and error messages is not captured in the network log. This is due to our use of the Sentry SDK, which encapsulates all network logic and doesn’t currently expose a hook for handling requests and responses directly. The team is actively investigating a solution to include such traffic in the log in a future release. You may also disable Crash Reporting entirely in Warp’s `Settings > Privacy` tab.
[PreviousSecret Redaction](/privacy/secret-redaction)[NextRefer a Friend & Earn Rewards](/community/refer-a-friend)
Last updated 4 months ago
Was this helpful?