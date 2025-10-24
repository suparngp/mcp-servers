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
 * [Static Slash Commands](#static-slash-commands)
 * [Tips](#tips)
 * [Example of using a Slash Command](#example-of-using-a-slash-command)
Was this helpful?
When using Agent Mode or Auto-Detection Mode, typing `/` in the input field opens the Slash Commands menu.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FN1t3UklbIC1yFdXWl5cV%252Fimage%2520%2813%29.png%3Falt%3Dmedia%26token%3D78067032-bc47-429d-8ec4-9a66e4e802d1&width=768&dpr=4&quality=100&sign=41c36e08&sv=2)
Slash Commands menu
As you type, the menu filters results in real time, making it easy to find and run the command or prompt you need.
## 
[](#static-slash-commands)
Static Slash Commands
Warp currently supports the following built-in Slash Commands:
Slash Command
Description
`/add-mcp`
Add a new [MCP server](/knowledge-and-collaboration/mcp).
`/add-prompt`
Add a new [Agent Prompt](/knowledge-and-collaboration/warp-drive/prompts) in Warp Drive.
`/add-rule`
Add a new [Global Rule](/knowledge-and-collaboration/rules) for the Agent.
`/diff-review`
Open the [diff review pane](/code/reviewing-code).
`/index`
Index the current codebase using [Codebase Context](/code/codebase-context).
`/init`
Index the current codebase and generate a [WARP.md file](/knowledge-and-collaboration/rules). `*`
`/open-project-rules`
Open the [Project Rules](/knowledge-and-collaboration/rules#project-rules) file (`WARP.md`).
`/view-mcp`
View the status of your [MCP servers](/knowledge-and-collaboration/mcp).
Slash commands marked with a `*` consume AI requests to complete the task.
#### 
[](#using-prompts-via-slash-commands)
Using Prompts via Slash Commands
In addition to static commands, the menu also shows [Agent Prompts](/knowledge-and-collaboration/warp-drive/prompts) saved in your [Warp Drive](/knowledge-and-collaboration/warp-drive).
 * These prompts can be custom ones you’ve created or ones shared with you.
 * As you type after `/`, prompts are filtered dynamically, so you can quickly run them without leaving the input field.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FYyd9cjQkt5SnDs8Dpmay%252Fimage%2520%2814%29.png%3Falt%3Dmedia%26token%3D831817d7-6d7a-42a8-b5c3-3f68e8ce749a&width=768&dpr=4&quality=100&sign=abf278fb&sv=2)
Slash Commands menu with filtered Agent Prompts
### 
[](#tips)
Tips
 * **Context-aware:** Many Slash Commands use your current working directory or file selection as context.
 * **Quick access:** Use `/` from anywhere in Agent Mode or Auto-Detection Mode to avoid navigating through menus.
### 
[](#example-of-using-a-slash-command)
Example of using a Slash Command
Below is an example interaction when `/init` is ran:
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FfqqKxXYSR79zwEZTtOU3%252Fimage%2520%2815%29.png%3Falt%3Dmedia%26token%3Dd970b017-288f-4def-88cd-4cae9d9e6673&width=768&dpr=4&quality=100&sign=24e21bee&sv=2)
/init setup flow; 1 of 2
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F0VoMWIyHOZ5IXJnUBI1i%252Fimage%2520%2816%29.png%3Falt%3Dmedia%26token%3D1049c696-717d-4501-a4ff-d561479b7d1a&width=768&dpr=4&quality=100&sign=19f923e8&sv=2)
/init setup flow; 2 of 2
[PreviousModel Choice](/agents/using-agents/model-choice)[NextActive AI](/agents/active-ai)
Last updated 1 month ago
Was this helpful?