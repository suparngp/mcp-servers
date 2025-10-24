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
 * [Accessibility](/terminal/more-features/accessibility)
 * [Files, Links, & Scripts](/terminal/more-features/files-and-links)
 * [Markdown Viewer](/terminal/more-features/markdown-viewer)
 * [Working Directory](/terminal/more-features/working-directory)
 * [Text Selection](/terminal/more-features/text-selection)
 * [Full-screen Apps](/terminal/more-features/full-screen-apps)
 * [Desktop Notifications](/terminal/more-features/notifications)
 * [Audible Bell](/terminal/more-features/audible-bell)
 * [Settings Sync (Beta)](/terminal/more-features/settings-sync)
 * [Quit Warning](/terminal/more-features/quit-warning)
 * [URI Scheme](/terminal/more-features/uri-scheme)
 * [Linux](/terminal/more-features/linux)
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
 * [Opening a file link within a block](#opening-a-file-link-within-a-block)
 * [Markdown-viewing commands](#markdown-viewing-commands)
 * [Opening a Markdown file from Finder](#opening-a-markdown-file-from-finder)
 * [Toggling between editor and viewer](#toggling-between-editor-and-viewer)
 * [Shell commands in Markdown files](#shell-commands-in-markdown-files)
Was this helpful?
Warp can be used for both editing and viewing rendered Markdown files in a [split pane](/terminal/windows/split-panes). Any local file with the `.md` or `.markdown` extension is treated as a Markdown file. Remote files are currently not supported. Turning on `Settings > Features > General > Open Markdown files in Warp's Markdown viewer by default` will make the Markdown viewer default, otherwise Markdown files will open in Warp's editor.
### 
[](#opening-a-file-link-within-a-block)
Opening a file link within a block
macOS
Windows
Linux
For any link to a Markdown file within a block, you can open the file in Warp by `CMD`-clicking on the link, from the link tooltip, or the right-click context menu on the link.
For any link to a Markdown file within a block, you can open the file in Warp by `CTRL`-clicking on the link, from the link tooltip, or the right-click context menu on the link.
For any link to a Markdown file within a block, you can open the file in Warp by `CTRL`-clicking on the link, from the link tooltip, or the right-click context menu on the link.
![Clicking a Markdown file link in the output of ls to open it in Warp](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-838cc78bfe78ea51475f75bfdb58e8ac59893755%252Fopen-markdown-viewer.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=bb5a8527&sv=2)
Opening a Markdown file in Warp using the link tooltip
### 
[](#markdown-viewing-commands)
Markdown-viewing commands
If you run a Markdown-viewing command like `cat myfile.md`, Warp will show a banner with a button to open the Markdown file.
The following commands are considered Markdown viewers:
 * `cat`
 * `glow`
 * `less`
### 
[](#opening-a-markdown-file-from-finder)
Opening a Markdown file from Finder
From Finder, you can open a Markdown file in Warp from the “Open With” menu that appears when right-clicking on the file.
### 
[](#toggling-between-editor-and-viewer)
Toggling between editor and viewer
You can toggle between the Markdown editor and viewer via the pane overflow menu.
![Clicking a Markdown file link in the output of ls to open it in Warp](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-27a4d58bd65e92e65b65913c77a92b2381effc14%252Fmarkdown-raw-rendered-toggle.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=907782a4&sv=2)
Toggling between editor and viewer
## 
[](#shell-commands-in-markdown-files)
Shell commands in Markdown files
Warp can run shell commands from Markdown code blocks in your active terminal session. Click the run icon `>_` to insert a command into the terminal input.
The shell command must be in a code block with three backticks ````` and not inline code for Warp to treat the code like a runnable command.
Markdown shell blocks also support keyboard navigation. There are two ways to enter the keyboard navigation mode:
macOS
Windows
Linux
 * Clicking on a shell block.
 * Pressing `CMD-UP` or `CMD-DOWN`.
Once a shell block is selected, press `CMD-ENTER` to insert it into the terminal input. You can also use `UP`, `DOWN`, `CMD-UP`, and `CMD-DOWN` to navigate between shell blocks. While the Markdown file is focused, press `CMD-L` to switch focus back to the terminal without inserting a command.
 * Clicking on a shell block.
 * Pressing `CTRL-UP` or `CTRL-DOWN`.
Once a shell block is selected, press `CTRL-ENTER` to insert it into the terminal input. You can also use `UP`, `DOWN`, `CTRL-UP`, and `CTRL-DOWN` to navigate between shell blocks. While the Markdown file is focused, press `CTRL-SHIFT-L` to switch focus back to the terminal without inserting a command.
 * Clicking on a shell block.
 * Pressing `CTRL-UP` or `CTRL-DOWN`.
Once a shell block is selected, press `CTRL-ENTER` to insert it into the terminal input. You can also use `UP`, `DOWN`, `CTRL-UP`, and `CTRL-DOWN` to navigate between shell blocks. While the Markdown file is focused, press `CTRL-SHIFT-L` to switch focus back to the terminal without inserting a command.
If the command contains any arguments using the curly brace `{{param}}` syntax, they will be treated as Workflow arguments. Learn more about [Workflows](/knowledge-and-collaboration/warp-drive/workflows).
![Demo of running two commands from a Markdown file in Warp](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-b8c067eeb9cd819702a18393daf9ac863140d279%252Frun-markdown-file-command.gif%3Falt%3Dmedia%26token%3D5f339436-e7a8-4e5e-9470-e66b380ed629&width=768&dpr=4&quality=100&sign=2b37ed7a&sv=2)
Navigating between and running commands in a Markdown file
In addition, all shell and code blocks have a copy button to quickly copy the block’s text to the clipboard.
Code blocks without a set language, or one of the following languages, are treated as shell commands: `sh`, `shell`, `bash`, `fish`, `zsh`, `warp-runnable-command`.
[PreviousFiles, Links, & Scripts](/terminal/more-features/files-and-links)[NextWorking Directory](/terminal/more-features/working-directory)
Last updated 20 days ago
Was this helpful?