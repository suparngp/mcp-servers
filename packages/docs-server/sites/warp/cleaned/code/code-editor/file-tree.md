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
 * [Opening the file tree](#opening-the-file-tree)
 * [Browsing and opening files](#browsing-and-opening-files)
 * [File and Folder Actions](#file-and-folder-actions)
Was this helpful?
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FPk94rz69QSYvxe24v3JV%252Fimage.png%3Falt%3Dmedia%26token%3D7d1eda61-fd78-4cd3-8256-7920d484c8b4&width=768&dpr=4&quality=100&sign=7facdb22&sv=2)
Warp includes a**native file tree** that makes it easy to explore and manage project files. The file tree is available whenever you’re working in a Git-tracked repository, and it automatically reflects your project structure as files are added, removed, or changed.
### 
[](#opening-the-file-tree)
Opening the file tree
You can open the file tree in two ways:
 * **Pane coding toolbelt** : Click the `</>` button in the top left of a pane, whenever in a Git-tracked repo.
 * **Keyboard shortcut** : Press `CMD + SHIFT + E` on macOS or `ALT + SHIFT + E` on Windows/Linux.
Warp supports icons for common file types. If a file type is missing an icon, please [file a GitHub issue](https://github.com/warpdotdev/Warp/issues) so we can review and add support.
### 
[](#browsing-and-opening-files)
Browsing and opening files
Clicking on a file opens it directly in Warp’s [**native Code Editor**](/code/code-editor), where you can view and edit code in a separate pane or tab.
## 
[](#file-and-folder-actions)
File and Folder Actions
Right-clicking any **file** opens a context menu with several useful options:
 * **Open in new pane** : Open the file in a side-by-side pane.
 * **Open in new tab** : Open the file in a new tab.
 * **Attach as context** : Insert the file into an agent prompt so the Agent can analyze or reference it.
 * **Copy path** : Copy the absolute file path.
 * **Copy relative path** : Copy the path relative to your current working directory.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FeyHs93RXX0H9Sm0BW7Ht%252Fimage.png%3Falt%3Dmedia%26token%3Dff42b512-de88-4aef-b12c-49d314d944b8&width=768&dpr=4&quality=100&sign=cd83e32f&sv=2)
Right-click context menu on a folder in the file tree.
Right-clicking any **folder** opens a context menu with the following options:
 * **Create new file** : Add a new file directly from the tree.
 * **Attach as context** : Insert the selected file into your agent prompt so the Agent can analyze or reference it.
 * **Copy path** : Copy the absolute file path to your clipboard.
 * **Copy relative path** : Copy the path relative to your current working directory.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FIZe0g7hP2PfDrWVov28q%252Fimage.png%3Falt%3Dmedia%26token%3D9847528b-15d0-4ea6-80e0-8c30d4f8921a&width=768&dpr=4&quality=100&sign=f5c6fa1e&sv=2)
Right-click context menu on a directory in the file tree.
[PreviousCode Editor](/code/code-editor)[NextFind and Replace](/code/code-editor/find-and-replace)
Last updated 1 month ago
Was this helpful?