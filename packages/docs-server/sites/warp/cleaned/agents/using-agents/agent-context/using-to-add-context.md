[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * * [Quickstart Guided](/)
 * [Migrate to Warp](/getting-started/migrate-to-warp)
 * [Supported Shells](/getting-started/supported-shells)
 * [Keyboard Shortcuts](/getting-started/keyboard-shortcuts)
 * [Changelog](/getting-started/changelog)
 * * [Agents Overview](/agents/agents-overview)
 * [Using Agents](/agents/using-agents)
 * [Agent Conversations](/agents/using-agents/agent-conversations)
 * [Agent Context](/agents/using-agents/agent-context)
 * [Blocks as Context](/agents/using-agents/agent-context/blocks-as-context)
 * [Images as Context](/agents/using-agents/agent-context/images-as-context)
 * [URLs as Context](/agents/using-agents/agent-context/urls-as-context)
 * [Selection as Context](/agents/using-agents/agent-context/selection-as-context)
 * [Using @ to Add Context](/agents/using-agents/agent-context/using-to-add-context)
 * [Managing Agents](/agents/using-agents/managing-agents)
 * [Agent Profiles & Permissions](/agents/using-agents/agent-profiles-permissions)
 * [Agent Task Lists](/agents/using-agents/agent-tasklists)
 * [Model Choice](/agents/using-agents/model-choice)
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
 * [How the @ context menu works](#how-the-context-menu-works)
 * [Referencing code symbols](#referencing-code-symbols)
 * [Referencing Warp Drive objects](#referencing-warp-drive-objects)
 * [Referencing blocks from other sessions](#referencing-blocks-from-other-sessions)
 * [Why @ to reference context?](#why-to-reference-context)
Was this helpful?
## 
[](#how-the-context-menu-works)
How the @ context menu works
You can attach specific files, folders, code symbols, Warp Drive objects, and blocks from other sessions as context to a prompt using the @ symbol. When you’re inside a **Git repository** , typing @ opens a context menu that allows you to search for and select files or directories to include.
Attaching context with @ works in **both natural language mode** (when interacting with Agents) and **classic terminal commands** for referencing file paths.
**Note** : the search in the @-context menu is always relative to the root of the Git repository, even when you're working in a subdirectory. This means you can reference _any_ file or folder tracked in the repo, regardless of the current working directory.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FJIhpplAknpp14mEoOeKb%252Fimage.png%3Falt%3Dmedia%26token%3D08ba4d91-1396-4cab-886e-fcfbff80a849&width=768&dpr=4&quality=100&sign=582d54b2&sv=2)
Using the @ symbol to search for and attach a file or folder from the project root.
Additionally, no codebase indexing (via [Codebase Context](/code/codebase-context)) is required — file search is available immediately in any Git-initialized directory. The search also respects `.gitignore` rules and will exclude ignored files from the results.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F062Fbwc6zKsU3UaTxwVc%252Fimage.png%3Falt%3Dmedia%26token%3D311cb9fe-a65e-4c69-813e-ab5d10a18125&width=768&dpr=4&quality=100&sign=c5d7175&sv=2)
Filtering files using @app to locate files containing “app” in their name or path.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FrGM6khvT6T6WM0YUBQOP%252Fimage.png%3Falt%3Dmedia%26token%3D06dad38d-5e48-4239-8e66-e032b43a9fdb&width=768&dpr=4&quality=100&sign=badac299&sv=2)
Referencing a folder or all files within it by typing @styles.
### 
[](#referencing-code-symbols)
Referencing code symbols
The @ menu can also be used to fuzzy-search for code symbols in your codebase. This includes functions, classes, interfaces, etc.
If you type something like `@main`, Warp will surface a matching `main()` function and insert it into your prompt as a reference with the line number. By pointing the Agent to a specific symbol, you can give it exactly the context it needs to make a targeted edit or explanation.
### 
[](#referencing-warp-drive-objects)
Referencing Warp Drive objects
Warp Drive objects are another way to attach context with **@**. You can reference:
 * [Workflows](/knowledge-and-collaboration/warp-drive/workflows) — parameterized commands you can name and save in Warp with descriptions and arguments.
 * [Notebooks](/knowledge-and-collaboration/warp-drive/notebooks) — runnable documentation consisting of markdown text and list elements, code blocks, and runnable shell snippets that can be automatically executed in your terminal session.
 * [Rules](/knowledge-and-collaboration/rules) — reusable guidelines and constraints that inform how Agents respond to your prompts/
When you select one of these objects, Warp inserts a reference token into your prompt. The contents of the object are then automatically passed as context to the Agent.
### 
[](#referencing-blocks-from-other-sessions)
Referencing blocks from other sessions
You are not limited to the current terminal session. With @, you can also bring in blocks of output from earlier sessions.
In the demo below, Ian shows how he previously ran cargo clippy and now wants help fixing the reported errors. Typing `@cargo clippy` surfaces the relevant block, which you can insert into your prompt. Once added, the Agent parses the output and generates fixes or explanations directly. 
You can also reference live blocks, not just those that have already completed execution.
### 
[](#why-to-reference-context)
Why @ to reference context?
Attaching context with @ helps you:
 * Reference exact outputs instead of copy-pasting entire logs
 * Attaching relevant files or directories without leaving Warp
 * Reuse existing context and knowledge in Warp Drive
This makes Agent interactions more accurate, clearer, and efficient, without additional setup.
[PreviousSelection as Context](/agents/using-agents/agent-context/selection-as-context)[NextManaging Agents](/agents/using-agents/managing-agents)
Last updated 1 month ago
Was this helpful?