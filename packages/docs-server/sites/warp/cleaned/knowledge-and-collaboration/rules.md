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
 * [Global Rules](#global-rules)
 * [Project Rules](#project-rules)
 * [Rules precedence](#rules-precedence)
 * [How to access Rules](#how-to-access-rules)
 * [How to create, edit, or delete Rules](#how-to-create-edit-or-delete-rules)
 * [Rules as Agent context](#rules-as-agent-context)
 * [Rules Privacy](#rules-privacy)
Was this helpful?
Warp’s **Rules** feature lets you create reusable guidelines that inform how agents respond to your prompts. Rules help tailor responses to match your coding standards, project conventions, and personal preferences, making agent interactions smarter and more consistent.
Warp supports two types of rules: **Global Rules** and **Project Rules**.
## 
[](#global-rules)
Global Rules
Global Rules apply across all projects and contexts. They're ideal for:
 * Coding standards and best practices
 * Workspace-wide guidelines
 * Tool configurations or preferences you want applied everywhere
Warp may also suggest Global Rules based on your usage patterns to make future interactions smarter and more consistent.
## 
[](#project-rules)
Project Rules
Project Rules live in your codebase and apply automatically when working within that project. They’re stored in a `WARP.md` file and can be:
 * Placed in the root of your repository
 * Added in subdirectories for more targeted guidance
If manually creating a `WARP.md`, make sure to always follow that naming convention (all caps).
**When you're in a directory:**
 * Warp automatically applies the `WARP.md` in the root and in the current directory.
 * If you edit files in another subdirectory, Warp makes a best-effort attempt to include that subdirectory’s `WARP.md` as well.
Example project structure:
Copy```
project/
 api/
 WARP.md # API-specific rules
 ui/
 WARP.md # UI-specific rules
 WARP.md # Project-wide rules
```
How Warp applies these Project Rules:
 * **If the current directory is**`**ui/**`
 * Automatically applied: `project/WARP.md` and `project/ui/WARP.md`
 * Best effort: `project/api/WARP.md` if editing files there
 * **If the current directory is**`**api/**`
 * Automatically applied: `project/WARP.md` and `project/api/WARP.md`
 * Best effort: `project/ui/WARP.md` if editing files there
### 
[](#rules-precedence)
**Rules precedence**
When multiple rules apply, Warp follows this order of precedence:
 1. Rules in the current subdirectory's `WARP.md` file
 2. Rules in the root directory's `WARP.md` file
 3. Global Rules
This ensures the most specific, project-relevant rules take priority over broader ones.
* * *
## 
[](#how-to-access-rules)
How to access Rules
 * From [Warp Drive](/knowledge-and-collaboration/warp-drive): Personal > Rules
 * From the [Command Palette](/terminal/command-palette): search for "Open AI Rules"
 * From the Settings panel: `Settings > AI > Knowledge > Manage Rules`
 * Here, you can manage both Global as well as Project Rules.
 * From the macOS Menu: `AI > Open Rules `
 * From the Slash Commands menu: `/open-project-rules` to open Project Rules directly in Warp's code editor
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FJEAeZ8NDaGyzhHtA8ONl%252Fimage%2520%2812%29.png%3Falt%3Dmedia%26token%3D96bc518b-8c52-4b51-9d77-bca7ffb04687&width=768&dpr=4&quality=100&sign=a58922ee&sv=2)
Project Rules UI open in a Rules pane
## 
[](#how-to-create-edit-or-delete-rules)
How to create, edit, or delete Rules
#### 
[](#global-rules-1)
Global Rules
 * **From Warp Drive Rules pane:** `Personal > Rules > Global` Add, edit, or delete any number of rules. Each rule can include:
 * Name (optional)
 * Description (what the rule does and when to apply it)
 * **From the Slash Commands menu:** `/add-rule` in Auto or Agent input modes to create a new Global Rule (automatically opens the Warp Drive Rules pane).
Rules Demo (legacy) with just Global Rules. Project rules can also be found there.
#### 
[](#project-rules-1)
Project Rules
 * **When in a directory, set up Project Rules with a slash command:** Use `/init` in Auto or Natural language modes to:
 * Begin indexing your codebase or display indexing status
 * Generate a `WARP.md` file with initial context, or
 * Link an existing Rules file to `WARP.md`
 * Warp currently supports the following Rules files: `CLAUDE.md`, `.cursorrules`, `AGENT.md`, `AGENTS.md`, `GEMINI.md`, `.clinerules`, `.windsurfrules`, `.github/copilot-instructions.md `
To view all Project Rules and open them in Warp, access it via the Warp Drive Rules pane: `Personal > Rules > Project-based`
### 
[](#rules-as-agent-context)
Rules as Agent context
When relevant, Warp agents automatically pull in applicable rules to guide their responses. Rules used in an interaction will appear in the conversation under **References** or marked as derived from a specific rule.
![Context derived from memory](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-87a00de59467e7881853e667870d0e3f72d04fe8%252Fcontext-derived-from-memory.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=a08c749c&sv=2)
Derived from rules
![Context derived from memory](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-580cbe282a47aa93d4ee6e6b0063f003a1629aa1%252Fcontext-references-memory.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=bb66da66&sv=2)
Rules as references
### 
[](#rules-privacy)
Rules Privacy
See our [Privacy Page](/privacy/privacy) for more information on how we handle data with Rules.
[PreviousModel Context Protocol (MCP)](/knowledge-and-collaboration/mcp)[NextTeams](/knowledge-and-collaboration/teams)
Last updated 1 month ago
Was this helpful?