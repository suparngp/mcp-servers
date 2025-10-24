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
 * [Sending Warp feedback](#sending-warp-feedback)
 * [Gathering Warp Logs](#gathering-warp-logs)
 * [Gathering AI debugging ID](#gathering-ai-debugging-id)
Was this helpful?
### 
[](#sending-warp-feedback)
Sending Warp feedback
 * Open a new issue or feature request in our [GitHub repository](https://github.com/warpdotdev/warp/issues/new/choose).
 * [Command Palette](/terminal/command-palette), type and select "Send Feedback".
 * Warp Essentials💡, click on Feedback.
 * Join our [Discord](https://discord.com/invite/warpdotdev) server. Send a message in [`#questions-and-feedback`](https://discord.com/channels/851854972600451112/1154432424873296012).
 * Join our [Warp Community Slack](https://go.warp.dev/join-preview) and share feedback in **#feedback-general** (or **#feedback-preview** if it is specific to [Warp Preview](/community/warp-preview-and-alpha-program).
For enterprise clients, please direct all feedback (including bug reports and debugging IDs) to the designated Warp Slack channel.
For billing-related issues (refunds, cancellation, promos, etc.), please email [[email protected]](/cdn-cgi/l/email-protection#93f1fafffffafdf4d3e4f2e1e3bdf7f6e5).
For security-related issues or questions, please email [[email protected]](/cdn-cgi/l/email-protection#ccbfa9afb9bea5b8b58cbbadbebce2a8a9ba).
![sending feedback from the mac menu and warp essentials](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-9268c761926444cfe505027d78b13dcce21275d0%252Fsend-feedback-demo.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=162897f6&sv=2)
Send Feedback
## 
[](#gathering-warp-logs)
Gathering Warp Logs
In some cases, we may also ask for your Warp logs. You can retrieve them by following the instructions for your platform below. Locate the log file and attach it to your GitHub issue comment, feedback email, or discord message.
Warp's logs and crash reports do _not_ contain any console input or output. See more on how we handle [Crash Reports and Telemetry](/privacy/privacy#what-telemetry-data-are-you-collecting-and-why).
macOS
Windows
Linux
The Warp log files are located at `~/Library/Logs/`.
Close Warp and run the following from another terminal to zip the logs to your Desktop:
Copy```
zip -j ~/Desktop/warp-logs.zip ~/Library/Logs/warp.log*
```
If your issue is graphical (e.g. no display of windows) or a crash, please run Warp with the following command to capture more log information:
Copy```
RUST_LOG=wgpu_core=info,wgpu_hal=info /Applications/Warp.app/Contents/MacOS/stable
```
The Warp log files are located at `$env:LOCALAPPDATA\warp\Warp\data\logs\`.
Close Warp and run the following from another terminal to zip the logs to your Desktop:
Copy```
Compress-Archive -Path "$env:LOCALAPPDATA\warp\Warp\data\logs\warp.log*" -DestinationPath "$([Environment]::GetFolderPath('Desktop'))\warp-logs.zip"
```
If your issue is graphical (e.g. no display of windows) or a crash, please run Warp with the following command to capture more log information:
Copy```
# Run if Warp on Windows is installed for a single user
$env:RUST_LOG="wgpu_core=info,wgpu_hal=info"; & "$env:LOCALAPPDATA\Programs\Warp\warp.exe"
# Run if Warp on Windows is installed for all users
$env:RUST_LOG="wgpu_core=info,wgpu_hal=info"; & "$env:PROGRAMFILES\Warp\warp.exe"
```
The Warp log files are located at `~/.local/state/warp-terminal/`.
Close Warp and run the following from another terminal to zip the logs to your home directory:
Copy```
tar -czf ~/warp-logs.tar.gz -C ~/.local/state/warp-terminal warp.log*
```
If your issue is graphical (e.g. no display of windows) or a crash, please run Warp with the following command to capture more log information:
Copy```
RUST_LOG=wgpu_core=info,wgpu_hal=info MESA_DEBUG=1 EGL_LOG_LEVEL=debug warp-terminal
```
## 
[](#gathering-ai-debugging-id)
Gathering AI debugging ID
In cases where you have issues with the Agent, we may ask for the AI debugging ID to troubleshoot the specific conversation. 
To gather the debugging ID, `RIGHT-CLICK` on the AI conversation block in question and select "Copy debugging ID", then paste that into the [bug report](/support-and-billing/sending-us-feedback#sending-warp-feedback) that you submit so that our team can investigate the issue. 
Whenever there is an error in the Agent Conversation, there will also be an option to directly copy the debugging ID for the bug report.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FTWNZfjUq6s6CoZF7qCzu%252FScreenshot%25202025-08-27%2520at%25209.54.51%25E2%2580%25AFAM.png%3Falt%3Dmedia%26token%3D01ca6a80-a360-4d48-a158-32d490a8b284&width=768&dpr=4&quality=100&sign=a379608c&sv=2)
[PreviousWarp Preview & Alpha Program](/community/warp-preview-and-alpha-program)[NextPlans & Pricing](/support-and-billing/plans-and-pricing)
Last updated 22 days ago
Was this helpful?