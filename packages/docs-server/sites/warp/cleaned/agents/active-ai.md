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
 * [Active AI](#active-ai)
 * [Prompt Suggestions](#prompt-suggestions)
 * [Next Command](#next-command)
 * [Suggested Code Diffs](#suggested-code-diffs)
 * [Active AI Privacy](#active-ai-privacy)
Was this helpful?
## 
[](#active-ai)
Active AI
Active AI features can be disabled in `Settings > AI` with the Active AI toggle.
### 
[](#prompt-suggestions)
Prompt Suggestions
Prompt Suggestions are contextual, AI-powered suggestions that activate Agent Mode. These banners will provide suggestions for what to ask Agent Mode in specific scenarios, similar to how Warp already suggests commands to run.
To disable, please visit `Settings > AI > Active AI > Prompt Suggestions`
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-9068c40fd8eea9b45eebcda6f08832023b4e9fa0%252Fprompt-suggestions-example.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=85ee0131&sv=2)
Example of inline banner popping up when relevant contextually.
#### 
[](#accepting-a-prompt-suggestion)
Accepting a Prompt Suggestion
If you press `CMD-ENTER` (on Mac), `CTRL-SHIFT-ENTER` (on Linux/Windows), or click on the chip, the suggestion will auto-populate into your input and run against [Agent Mode](/agents/using-agents) (with the most recent block attached).
Prompt Suggestions use an LLM to generate prompts based on your terminal session, specifically the most recent block. These AI requests do not contribute towards your AI limits, however, any accepted prompts run in Agent Mode contribute as normal. Visit **Settings > AI > Active AI** if you'd like to turn it off.
If [Secret Redaction](/privacy/secret-redaction) is enabled, any selected regexes are applied to content sent to Active AI features to prevent any sensitive data being leaked.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-010f0d6e8d02c054768b2939c9d45cf84447b5e4%252Fprompt-suggestions-setting.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=44d53faa&sv=2)
Setting for Prompt Suggestions
### 
[](#next-command)
Next Command
Next Command uses AI to suggest the next command to run based on your active terminal session and command history. It uses your active terminal session contents and an LLM to generate commands.
To disable, please visit `Settings > AI > Active AI > Next Command`
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F6Nhtn8IxcbySsHTXjK8S%252FScreenshot%25202024-12-12%2520at%25205.26.10%25E2%2580%25AFPM.png%3Falt%3Dmedia%26token%3Dc94a5275-9b40-452c-b3d0-c5d86069b1a1&width=768&dpr=4&quality=100&sign=eee09a30&sv=2)
Next Command is an LLM-based feature which utilizes your command history (enriched with git branch, exit code, and directory metadata) as well as recent block input and output to generate the next command suggestions.
[Secret Redaction](/privacy/secret-redaction) is automatically applied to any content sent to Active AI features to prevent any sensitive data being leaked.
#### 
[](#accepting-next-commands)
Accepting Next Commands
Accept a Next Command Suggestion with `TAB` , `→` , or `CTRL-F` to add the suggested next command to your input buffer. `ENTER` executes the accepted command.
#### 
[](#billing)
Billing
Next Commands are unlimited across all of Warp's plans, including the Free plan. For the latest information on other AI limits and other pricing details, visit [warp.dev/pricing](https://warp.dev/pricing). 
### 
[](#suggested-code-diffs)
Suggested Code Diffs
Suggested Code Diffs automatically surface potential fixes for command-line errors encountered within Warp. These are most often compiler errors, but they may also include other situations where Warp can confidently predict a straightforward resolution, such as simple merge conflicts.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F2bUTqJJz7MKJTHHmeKz3%252Fimage%2520%2817%29.png%3Falt%3Dmedia%26token%3Da7087273-b089-4d1e-a913-86f40cf1d240&width=768&dpr=4&quality=100&sign=af87abcb&sv=2)
When an error occurs, Warp evaluates whether it is appropriate for an LLM to generate a fix. If so, a “Generating fix” banner will appear while Warp prepares a proposed diff. You can stop this process at any time by pressing `CTRL + C` or the stop button.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FoO9vh5qitKoTNQGXZlxZ%252Fimage%2520%2818%29.png%3Falt%3Dmedia%26token%3D968d4ab4-4d76-4d48-97b6-32ab29dcffe3&width=768&dpr=4&quality=100&sign=13a473f2&sv=2)
#### 
[](#using-a-suggested-code-diff)
**Using a Suggested Code Diff**
Once the diff is generated, you can either dismiss it or accept it. Acceptance can be done directly via the buttons in the diff view, or with `CMD + ENTER` on macOS and `CTRL + ENTER` on Windows/Linux. 
You can also view additional details of the diff by pressing `CMD + E` (macOS) or `CTRL + E` (Windows/Linux), which expands the view to allow further inspection (including refining or editing it). You can also use `↓` to view the entire diff.
**Billing**
Suggested Code Diffs do not count toward your AI request limits. There are maximum limits to the number of code diffs surfaced per month, which scales based on your plan tier. For the latest details on plan limits and pricing, please visit [warp.dev/pricing](https://warp.dev/pricing).
## 
[](#active-ai-privacy)
Active AI Privacy
See our [Privacy Page](/privacy/privacy) for more information on how we handle data with Active AI.
[PreviousSlash Commands](/agents/slash-commands)[NextGenerate](/agents/generate)
Last updated 2 months ago
Was this helpful?