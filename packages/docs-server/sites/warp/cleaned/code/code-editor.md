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
 * [File Tree](/code/code-editor/file-tree)
 * [Find and Replace](/code/code-editor/find-and-replace)
 * [Code Editor Vim Keybindings](/code/code-editor/code-editor-vim-keybindings)
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
 * [Built-in Code Editor](#built-in-code-editor)
 * [Opening Files in Warp](#opening-files-in-warp)
 * [Tabbed File Viewer](#tabbed-file-viewer)
 * [File Layout Options](#file-layout-options)
 * [Supported Languages](#supported-languages)
 * [Other Editor Features](#other-editor-features)
Was this helpful?
## 
[](#built-in-code-editor)
Built-in Code Editor
Warp comes with a native code editor designed for quick, in-flow edits alongside your Agent conversations. Instead of switching back and forth to an IDE, you can open and edit files directly in Warp — with essentials like syntax highlighting, a tabbed file viewer, find and replace, Vim keybindings, and a file tree for browsing and adding files as context.
The editor is built for fast changes to agent-generated code: renaming a variable, tweaking copy, or rewriting a short function. Having just enough editing power in-context makes it easier to land an agent’s changes and keep momentum.
### 
[](#opening-files-in-warp)
Opening Files in Warp
**You can open files in the editor in several ways:**
 1. **Click a file path** from the terminal output or an AI conversation and select "Open in Warp."
 2. **Use the file menu in the command palette**(`CMD + O` on macOS, `CTRL + SHIFT + O` on Windows or Linux) when in a Git-tracked repo to search for and open files inside that repo.
 1. You can also access this via the magnifying glass icon in the pane coding toolbelt at the top left of any pane.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fz9pMEJrTpevacHCc5UPE%252Fimage.png%3Falt%3Dmedia%26token%3D02412a1e-fc3b-45a9-93b8-9781a5a84233&width=768&dpr=4&quality=100&sign=ea723cd6&sv=2)
 3. **Browse via the**[File Tree](/code/code-editor/file-tree) to open or create files.
 4. **Opening a generated code diff** from an Agent Conversation: [Code Diffs in Agent Conversations](/code/reviewing-code).
**To save your changes to files** : use `CMD + S` on macOS or `CTRL + S` on Windows or Linux.
### 
[](#tabbed-file-viewer)
Tabbed File Viewer
Warp can group multiple files into a single tabbed viewer, reducing clutter and making it easier to work across multiple files.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FJCeD0Q3MFmViNPfjqlHk%252Fimage.png%3Falt%3Dmedia%26token%3D3b777a82-3a6a-4af0-83c3-04894301e4c3&width=768&dpr=4&quality=100&sign=8f8255c1&sv=2)
 * Enabled by default for new users (can be toggled in `Settings > Features > General > Group files into a single editor pane`)
 * Reorder, close, or drag file viewers between tabs.
 * Merge enter panes together by dragging one into another.
**Here's a more in-depth demo:**
### 
[](#file-layout-options)
**File Layout Options**
Choose how new files open in Warp by default in: `Settings > Features > General > Choose a layout to open files in Warp`
 * **Split pane** : new files open alongside the current editor
 * **New tab** : new files open in their own tabbed viewer
### 
[](#supported-languages)
Supported Languages
The editor supports syntax highlighting and editing for a wide range of languages, including:
Rust, Go, YAML, Python, JavaScript/TypeScript, JSX/TSX, Java/Groovy, C++, Shell/Bash, C#, HTML, CSS, C, JSON, HCL/Terraform, Lua, Ruby, PHP, TOML, Swift, Kotlin, Starlark, SQL, Powershell, and Elixir.
We’re continuously expanding language support.
### 
[](#other-editor-features)
Other Editor Features
Warp's native code editor also supports the following features:
 * [File Tree](/code/code-editor/file-tree) — Browse, open, and manage your project with Warp’s native file tree.
 * [Find and Replace](/code/code-editor/find-and-replace) — Use Warp’s built-in find and replace to quickly search across a file, jump between matches, and make precise edits with options for regex, case sensitivity, and smart case preservation.
 * [Code Editor Vim Keybindings](/code/code-editor/code-editor-vim-keybindings) - Use Vim keybindings to edit code and text in Warp's native code editor.
[PreviousCode Overview](/code/code-overview)[NextFile Tree](/code/code-editor/file-tree)
Last updated 1 month ago
Was this helpful?