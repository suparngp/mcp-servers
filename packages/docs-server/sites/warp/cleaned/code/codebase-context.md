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
 * [Indexing your codebase](#indexing-your-codebase)
 * [Codebase indexing states](#codebase-indexing-states)
 * [When does codebase syncing happen?](#when-does-codebase-syncing-happen)
 * [File and Codebase Limits](#file-and-codebase-limits)
 * [Ignore files](#ignore-files)
 * [Multi-repo context](#multi-repo-context)
 * [Demo: Explain My Codebase with Warp](#demo-explain-my-codebase-with-warp)
Was this helpful?
Codebase Context helps Warp Agents understand your project by indexing your local codebase. This allows Agents to generate more accurate completions, suggest context-aware edits, and answer questions using real knowledge of your code.
Code indexed with Codebase Context is never stored on our servers. Warps coding agent only work on local repositories. The agent can make changes on remote or docker repositories, but fallback to using terminal commands (i.e. `sed`, `grep` ) to make the changes.
**Codebase context doesn't work within SSH or WSL sessions.** Feature requests for support are being tracked in the following Github issues: - SSH: <https://github.com/warpdotdev/Warp/issues/6831> - WSL: <https://github.com/warpdotdev/Warp/issues/6744>
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FzAaNur9t5FcFwCJZNK7d%252Fimage%2520%289%29.png%3Falt%3Dmedia%26token%3D7f2c77a0-ff23-40ed-82fa-587dd2f08a69&width=768&dpr=4&quality=100&sign=5fbe7cbf&sv=2)
Codebase indexing settings in Warp. Easily track sync status and manage which folders are indexed for AI-powered context and suggestions.
## 
[](#indexing-your-codebase)
Indexing your codebase
When you open a directory in Warp, we check if it is part of a Git repository. If it is, Warp begins indexing the source code to provide rich context for Warp Agents. 
**Codebase indexing intervals and triggers:**
 * Initially when you have Codebase Context enabled.
 * Warp automatically triggers a codebase index periodically.
 * Whenever a new Agent conversation begins.
 * When you click on the sync 🔄`Settings > Code` menu.
**This embeddings index helps Agents:**
 * Understand your project structure and reference relevant code
 * Generate completions that match your style and patterns
 * Suggest edits in the correct locations based on real context
For large projects, indexing may take a few minutes. Warp Agents will not use codebase context until indexing is complete, but **agentic coding features remain fully available in the meantime**.
You can view and manage your indexed codebases under `Settings > Code > Codebase Index`. You can also choose whether to automatically index new folders as you navigate them.
### 
[](#codebase-indexing-states)
**Codebase indexing states**
When viewing indexed codebases in Warp under `Settings > Code`, you may see different status indicators:
 * **Synced** — Indexing is complete and the codebase is ready to be used as context.
 * **Discovering files** – Warp is currently scanning and indexing files in the codebase.
 * **Failed** – Indexing failed. Common reasons include unreadable `.git` directories or corrupted repositories. Try re-cloning the repo and syncing again.
 * **Codebase too large** – The number of files in the codebase exceeds your current plan’s limit. You can either reduce the number of files being indexed using `.warpindexingignore`, or [contact sales](https://warp.dev/contact-sales) for support with larger codebases.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FK1bKZnhG3DCbCUlATjaN%252Fimage.png%3Falt%3Dmedia%26token%3D67195f1b-83f9-4dc5-b65f-bd609751e2ca&width=768&dpr=4&quality=100&sign=d0008bdb&sv=2)
View and manage the indexing status of your codebases in Warp. Easily see which projects are synced, in progress, or require attention.
### 
[](#when-does-codebase-syncing-happen)
When does codebase syncing happen?
Warp automatically triggers a codebase sync initially and periodically, when you click on the sync 🔄`Settings > Code` menu, or when you start a new Agent conversation. However, if many files have changed or the network is slow, the sync may not complete before the Agent tries to access context.
In large projects (e.g. after a branch switch), there may be a short delay where the Agent references stale or outdated files.
### 
[](#file-and-codebase-limits)
File and Codebase Limits
The number of codebases you can index and the maximum number of files per codebase vary by plan. All plans support indexing **at least 5,000 files per codebase** , with higher tiers including support for more files and additional codebases.
For full details, visit our [pricing page](https://www.warp.dev/pricing).
### 
[](#ignore-files)
Ignore files
For large codebases, Warp supports several ignore files to give you control over what gets indexed. This allows each developer to focus context on the parts of the codebase most relevant to their work.
Warp respects the following ignore files:
 * `.gitignore`
 * `.warpindexingignore`
 * `.cursorignore`
 * `.cursorindexingignore`
 * `.codeiumignore`
Use these files to skip indexing of folders, generated files, or any content you don't want agents to reference. This can improve performance and result quality.
Files excluded by ignore rules **do not** count toward your codebase's file limit.
## 
[](#multi-repo-context)
Multi-repo context
Warp supports referencing context across multiple indexed repositories. Note that you don’t need to be inside a specific repo for agents to use its context. 
**This is especially useful when:**
 * Implementing a feature across multiple repos, such as full-stack work across client and server
 * Using one repo as a reference while building in another, for example: “copy the implementation from repo A into my repo B”
Agents will only reference other repositories if they are already indexed. During cross-repo tasks, Warp's Agents have access to the file paths of all indexed repos. It is more likely to use cross-repo context when you mention the exact name of the repo in your prompt.
## 
[](#demo-explain-my-codebase-with-warp)
Demo: Explain My Codebase with Warp
Here's an example from [Warp University](https://www.warp.dev/university), where Zach demonstrates how Warp uses Codebase Context to search for and use the relevant files as context:
[PreviousCode Editor Vim Keybindings](/code/code-editor/code-editor-vim-keybindings)[NextCode Review](/code/code-review)
Last updated 1 month ago
Was this helpful?