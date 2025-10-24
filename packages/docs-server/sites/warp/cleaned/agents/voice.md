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
 * [Getting Started with Voice](#getting-started-with-voice)
 * [Initial Setup](#initial-setup)
 * [Using Voice](#using-voice)
 * [Sample use cases](#sample-use-cases)
 * [Privacy & Security](#privacy-and-security)
 * [Usage Limits](#usage-limits)
 * [Troubleshooting](#troubleshooting)
 * [Common Issues](#common-issues)
Was this helpful?
Warp's Voice feature transforms how you interact with your terminal, letting you naturally speak commands and questions instead of typing them. This is especially powerful when combined with Agent Mode for complex operations or when you need to explain longer scenarios.
Voice input functionality can be configured in `Settings > AI > Voice`. You can toggle voice input and select your preferred activation hotkey from pre-defined options.
Voice Demo
## 
[](#getting-started-with-voice)
Getting Started with Voice
### 
[](#initial-setup)
Initial Setup
First-time users will need to grant microphone permissions:
 * On macOS: Accept the system permission prompt or allow Warp microphone access in `System Settings > Privacy & Security > Microphone`
 * On Windows: Allow Warp microphone access in `Settings > Privacy & Security > Microphone`
 * On Linux: Configure through system sound settings
### 
[](#using-voice)
Using Voice
There are two ways to activate Voice:
 1. **Microphone Button in Agent Mode**
 * Click the microphone icon in Agent Mode
 * Start speaking when the indicator shows it's listening
 * Click again to stop recording
 2. **Hotkey Method**
macOS
Windows
Linux
 * Press and hold the `Fn` key (configurable) to start recording
 * Speak your command or query while holding the key
 * Release the `Fn` key to stop recording and transcribe
 * Press and hold the `ALT-RIGHT` key (configurable) to start recording
 * Speak your command or query while holding the key
 * Release the `ALT-RIGHT` key to stop recording and transcribe
 * Press and hold the `ALT-RIGHT` key (configurable) to start recording
 * Speak your command or query while holding the key
 * Release the `ALT-RIGHT` key to stop recording and transcribe
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-8ec7b05f1abdfc4fa153e33dfde31bd2213efbc0%252Fvoice-settings.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=a3ae99b7&sv=2)
Voice settings panel showing hotkey configuration and voice input toggle options
### 
[](#sample-use-cases)
Sample use cases
Voice input makes complex interactions with Agent Mode more natural and efficient. Instead of typing lengthy queries, you can speak naturally to accomplish various tasks. For example, you might ask "Create a new Node.js project, install Express and MongoDB, then set up a basic server with a health check endpoint," or "What's the difference between chmod and chown? Give me examples of when to use each one."
You can also describe multi-step system tasks like "Find all log files in my project that contain errors from the last 24 hours, create a summary of the errors, and email it to me." Agent Mode will help break down these requests into the necessary commands and provide detailed explanations.
Voice input is not limited to just Agent Mode - it works across all of Warp's input interfaces. Whether you're using the Find dialog to search through text, entering commands in the terminal, or working with other input editors, you can use voice commands to quickly input your text.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-f221503dbf54c309fa459017ce8809890a8b7c84%252Fvoice-in-find.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=616a91f9&sv=2)
Voice input works across Warp's editor interfaces, including the Find dialog and other input editors
## 
[](#privacy-and-security)
Privacy & Security
The transcription is powered by [Wispr Flow](https://wisprflow.ai/). Voice data is processed in real-time by Wispr Flow and is not retained as a recording after transcription.
## 
[](#usage-limits)
Usage Limits
Voice features have anti-abuse limits in place to ensure fair usage. These limits are subject to change as we continue to improve the service.
## 
[](#troubleshooting)
Troubleshooting
### 
[](#common-issues)
Common Issues
 1. **Microphone not detected** If your microphone isn't being detected, first check your system permissions to ensure Warp has access. You should also verify that your microphone is properly connected to your system. If issues persist, try restarting Warp to reset the connection.
 2. **Poor transcription quality** To improve transcription quality, try to minimize background noise in your environment. Position yourself closer to the microphone while speaking, and verify that your microphone input levels are properly adjusted in your system settings. For best results, speak clearly at a natural pace and use complete sentences to provide better context. When referring to specific file names or commands, enunciate them clearly. It's also recommended to review the transcription before sending to ensure accuracy.
 3. **Feature not activating** If the Voice feature isn't activating, confirm that your hotkey settings are correctly configured in Warp. Check for any conflicting keyboard shortcuts that might interfere with Voice activation. Also ensure that you're running the latest version of Warp, as older versions may have compatibility issues.
If you are on an Enterprise plan, your administrator may have disabled Voice functionality, or it may be pending approval.
[PreviousGenerate](/agents/generate)[NextAI FAQs](/agents/ai-faqs)
Last updated 4 months ago
Was this helpful?