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
 * [Notebooks](/knowledge-and-collaboration/warp-drive/notebooks)
 * [Workflows](/knowledge-and-collaboration/warp-drive/workflows)
 * [Prompts](/knowledge-and-collaboration/warp-drive/prompts)
 * [Environment Variables](/knowledge-and-collaboration/warp-drive/environment-variables)
 * [Warp Drive on the Web](/knowledge-and-collaboration/warp-drive/warp-drive-on-the-web)
 * [Warp Drive as Agent Mode Context](/knowledge-and-collaboration/warp-drive/warp-drive-as-agent-mode-context)
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
 * [What is a Notebook?](#what-is-a-notebook)
 * [How to save and edit notebooks](#how-to-save-and-edit-notebooks)
 * [Working with Notebooks](#working-with-notebooks)
 * [Working with Notebooks in a team](#working-with-notebooks-in-a-team)
 * [Import and Export Notebooks in Warp Drive](#import-and-export-notebooks-in-warp-drive)
Was this helpful?
### 
[](#what-is-a-notebook)
What is a Notebook?
Notebooks are runnable documentation consisting of markdown text and list elements, code blocks, and runnable shell snippets that can be automatically executed in your terminal session. Notebooks are searchable and accessible through the [Command Palette](/terminal/command-palette) so you can access and run your documentation without ever leaving the terminal. You can also export Notebooks in .md format at any time.
### 
[](#how-to-save-and-edit-notebooks)
How to save and edit notebooks
You can create a new notebook from various entry points in Warp
macOS
Windows
Linux
 * From Warp Drive, + > New notebook
 * From the [Command Palette](/terminal/command-palette), create a new team or personal notebook.
 * From Warp Drive, + > New notebook
 * From the [Command Palette](/terminal/command-palette), create a new team or personal notebook.
 * From Warp Drive, + > New notebook
 * From the [Command Palette](/terminal/command-palette), create a new team or personal notebook.
Any of these entry points will open the notebook editor where you can:
 * Title your notebook.
 * Start adding text and code elements.
Note: The notebook will not be saved until either title or body text is added.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-4b9e7ba6e4520a38ebc283cae3bbeae80badea2c%252Fnotebooks_editor.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=abd8949d&sv=2)
Editing a Notebook
### 
[](#working-with-notebooks)
Working with Notebooks
#### 
[](#adding-new-elements)
Adding new elements
Notebook elements (text, code, list items) can be added in several ways:
 * Using the appropriate markdown shortcut (e.g. ### for Heading 3).
 * Typing /, which will open up a selection menu of supported elements.
 * Pressing the + icon which appears when hovering over a line and selecting from the menu of supported elements.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-bace71efc7ac809b73430ac964dcd925c296fcef%252FScreenshot%25202024-02-20%2520at%25209.53.34%25E2%2580%25AFAM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=c073e521&sv=2)
Markdown element types
#### 
[](#styling-existing-elements)
Styling existing elements
Existing notebook elements can be styled in several ways:
 * Selecting an existing element and selecting text decorations (like bold, italics, or inline code) from the hover menu.
 * Using markdown syntax for text stylings like **bold** or *italic*.
 * Selecting an existing element and changing the overall type of the element via the dropdown element menu.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-a44f76dd4a83fcf4f6647925ee6a3aa0c2b953c0%252FScreenshot%25202024-02-20%2520at%25209.54.37%25E2%2580%25AFAM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=2dcaf756&sv=2)
Styling menu
#### 
[](#using-command-and-code-blocks)
Using Command and Code Blocks
Command and code blocks have several unique properties such as syntax highlighting and quick actions that make working with code-based documentation simple. You can create a code or command block by either:
 * Selecting Command or Code from the new element menu
 * Typing ````` (triple backticks)
Once you’ve inserted your code block you can select the language at the bottom of the block from numerous options which will apply the appropriate syntax highlighting if available (or default to Code if your language is not found). All code and command blocks will apply syntax highlighting and provide a quick copy button for easy access.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-74d6ea0a64832a1e2a30b43891bf6c6c1a7a7f2f%252Fnotebook-code-block.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=d14e319b&sv=2)
Example code block
#### 
[](#special-properties-of-command-blocks)
Special Properties of Command Blocks
If you insert a Command block or specify the language as “Shell”, Warp provides extra functionality to simplify terminal work.
#### 
[](#executing-command-blocks)
Executing Command Blocks
Developers can execute shell command blocks by:
macOS
Windows
Linux
 * Using the insert button at the bottom of the block
 * Pressing `CMD-ENTER` while the block is selected (a blue highlight will appear)
 * Using the insert button at the bottom of the block
 * Pressing `CTRL-ENTER` while the block is selected (a blue highlight will appear)
 * Using the insert button at the bottom of the block
 * Pressing `CTRL-ENTER` while the block is selected (a blue highlight will appear)
The command text will be inserted into the developer’s active terminal session, or a new session if none are active.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-a6dd0c127c8cb4c2d82114901dcafbf58d1b5322%252Fnotebook-cmd-block-run.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=b05acc85&sv=2)
Run option for command block
#### 
[](#adding-arguments-to-command-blocks)
Adding arguments to Command Blocks
Command blocks accept parameters in the same format as [Workflows](/knowledge-and-collaboration/warp-drive/workflows). To add an argument to your command block, use {{double_curly_brackets}} to specify your argument term.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-7dd079367cb23d6824851fd0bb30c26bab9ff5b1%252Fnotebook-cmd-with-params.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=d7d47eff&sv=2)
Command block with parameters
#### 
[](#navigating-command-blocks-with-the-keyboard)
Navigating command blocks with the keyboard
Command Blocks also support keyboard navigation. There are two ways to enter the keyboard navigation mode:
macOS
Windows
Linux
 * Clicking on a shell block.
 * Pressing `CMD-UP` or `CMD-DOWN.`
Once a command block is selected, press `CMD-ENTER` to insert it into the terminal input. You can also use `UP, DOWN, CMD-UP`, and `CMD-DOWN` to navigate between command blocks. While the Notebook is focused, press `CMD-L` to switch focus back to the terminal without inserting a command.
 * Clicking on a shell block.
 * Pressing `CTRL-UP` or `CTRL-DOWN.`
Once a command block is selected, press `CTRL-ENTER` to insert it into the terminal input. You can also use `UP, DOWN, CTRL-UP,` and `CTRL-DOWN` to navigate between command blocks. While the Notebook is focused, press `CTRL-L` to switch focus back to the terminal without inserting a command.
 * Clicking on a shell block.
 * Pressing `CTRL-UP` or `CTRL-DOWN.`
Once a command block is selected, press `CTRL-ENTER` to insert it into the terminal input. You can also use `UP, DOWN, CTRL-UP,` and `CTRL-DOWN` to navigate between command blocks. While the Notebook is focused, press `CTRL-L` to switch focus back to the terminal without inserting a command.
#### 
[](#adding-existing-workflows-to-notebooks)
Adding existing Workflows to Notebooks
If you have existing [Workflows](/knowledge-and-collaboration/warp-drive/workflows) that you’d like to insert into your notebook rather than duplicating their content, you can select Embedded Workflow from the new element menu and select from the available Workflows. Once embedded in a notebook, the workflow will be executable like a regular command block. To edit the content of the embedded workflow, you will need to edit the source workflow which can be found by searching for the title in the [Command Palette](/terminal/command-palette).
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-fd9bc4dfd10d5c519c5d798efa387dd68d49c559%252FScreenshot%25202024-02-20%2520at%25209.58.44%25E2%2580%25AFAM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=89182fee&sv=2)
Embedding an existing workflow in a notebook.
### 
[](#working-with-notebooks-in-a-team)
Working with Notebooks in a team
If the notebook is shared with a team, all team members will have access to edit the notebook and updates will sync immediately for all members of the team.
Note that only one editor is allowed at a given time. Opening the notebook while there is an active editor will open the notebook in Viewing mode. Your mode (view vs edit) can be toggled above the notebook’s title.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-f50062bc4be1b34771fecbc6f6d1ee7d5bd3830b%252Fnotebook-view-mode.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=6077081d&sv=2)
View mode example
### 
[](#import-and-export-notebooks-in-warp-drive)
Import and Export Notebooks in Warp Drive
Please see our [Warp Drive Import and Export](/knowledge-and-collaboration/warp-drive#import-and-export) instructions.
[PreviousWarp Drive](/knowledge-and-collaboration/warp-drive)[NextWorkflows](/knowledge-and-collaboration/warp-drive/workflows)
Last updated 4 months ago
Was this helpful?