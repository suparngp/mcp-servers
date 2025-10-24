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
 * [Files & Links](#files-and-links)
 * [Scripts](#scripts)
Was this helpful?
## 
[](#files-and-links)
Files & Links
Warp supports opening files, folders, and URL links that are within Blocks. Multiple URL protocols are supported e.g. `https`, `ftp`, `file`, etc. Warp can open files and folders in a variety of editors and opens web links directly in your default browser. Warp can also open markdown files directly with a [Markdown Viewer](/terminal/more-features/markdown-viewer).
Warp also supports iTerm2 and Kitty Image protocols on macOS and Linux. You will need to use a cli tool to view images, in some cases the tools expect `$TERM=kitty`, so you may need to workaround this by setting `TERM=kitty` before the command. We're working on updating the popular tools to recognize Warp natively.
Warp parses relative and absolute file paths. Warp also tries to capture line and column numbers attached to the file path, supported formats include:
 * `file_name:line_num`
 * `file_name:line_num:column_num`
 * `file_name[line_num, column_num]`
 * `file_name(line_num, column_num)`
 * `file_name, line: line_num, column: column_num`
 * `file_name, line: line_num, in`
macOS
Windows
Linux
 1. After hovering over a link, open it directly by holding down `CMD` while clicking it.
 2. Clicking a link normally will open a clickable tooltip that says “Open File/Folder/Link”.
 3. Right-clicking a link will open a context menu that supports copying the absolute file path or URL to the clipboard.
 1. After hovering over a link, open it directly by holding down `CTRL` while clicking it.
 2. Clicking a link normally will open a clickable tooltip that says “Open File/Folder/Link”.
 3. Right-clicking a link will open a context menu that supports copying the absolute file path or URL to the clipboard.
 1. After hovering over a link, open it directly by holding down `CTRL` while clicking it.
 2. Clicking a link normally will open a clickable tooltip that says “Open File/Folder/Link”.
 3. Right-clicking a link will open a context menu that supports copying the absolute file path or URL to the clipboard.
 * You can also Drag and drop a folder or file onto the Warp dock icon to open a new tab in this directory.
 * You can also right-click on a folder or file in Finder, then select Services, and "Open new Warp Tab | Window here".
 * Configure the default editor to open files by navigating to `Settings > Features > Choose an editor to open file links`.
 * Selecting "Default App" uses your system's default application for the file type.
#### 
[](#list-of-supported-editors)
List of supported editors
Non exhaustive list of editors, please submit new ones on our GitHub, see [Sending Feedback](/support-and-billing/sending-us-feedback#sending-warp-feedback).
 1. `$EDITOR `
 2. Visual Studio Code
 3. JetBrains IDEs
 * WebStorm
 * PhpStorm
 * GoLand
 * PyCharm
 * DataGrip
 * DataSpell
 * Rider
 * RubyMine
 4. Zed and Zed Preview
 5. Cursor
 6. Windsurf
 7. Sublime Text
 8. Android Studio
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-4b35a52c9e42ce96877811f1ce788c85411727f5%252Ffiles-links-demo.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=d164d83&sv=2)
Files & Links Demo
## 
[](#scripts)
Scripts
Warp can open `.command` and Unix Executable files from the finder directly.
 1. Find a `.command` or Shell script you'd like to open in Finder.
 2. Right-click and open the script with Warp.
Make sure the file has the appropriate executable permissions before you can run it in Warp. (e.g. `chmod +x script.command`)
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-f7a1e04f36dc80e8840fd8b556d1e2ab92d933be%252Fscript-demo.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=2373475b&sv=2)
Scripts Demo
[PreviousAccessibility](/terminal/more-features/accessibility)[NextMarkdown Viewer](/terminal/more-features/markdown-viewer)
Last updated 1 month ago
Was this helpful?