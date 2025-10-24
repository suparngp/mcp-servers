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
 * [What is a workflow?](#what-is-a-workflow)
 * [How to save and edit workflows](#how-to-save-and-edit-workflows)
 * [Working with arguments](#working-with-arguments)
 * [Working with aliases](#working-with-aliases)
 * [Editing workflows](#editing-workflows)
 * [Editing workflows with a team](#editing-workflows-with-a-team)
 * [How to execute workflows](#how-to-execute-workflows)
 * [Support for YAML Workflows](#support-for-yaml-workflows)
 * [Import and Export Workflows in Warp Drive](#import-and-export-workflows-in-warp-drive)
Was this helpful?
## 
[](#what-is-a-workflow)
What is a workflow?
A workflow is a parameterized command you can name and save in Warp with descriptions and arguments. Workflows are searchable and easily accessed from the [Command Palette](/terminal/command-palette) so you can find and execute them without switching contexts.
## 
[](#how-to-save-and-edit-workflows)
How to save and edit workflows
You can create a new workflow from various entry points in Warp:
 * From Warp Drive, + > New workflow
 * Using Block Actions, Save as Workflow
 * From Warp AI results, Save as Workflow
 * From the [Command Palette](/terminal/command-palette), Create a New Personal Workflow
Any of these entry points will open the workflow editor where you can:
 * Name your workflow
 * Edit the command along with any arguments (also known as parameters)
 * Add a meaningful description that will be indexed for search (optional)
 * Add arguments, descriptions for arguments, and default values (optional)
![Workflows save and edit modal](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-ac0ba786b03b5431ec11e2292243060b52b62d12%252Fedit-workflow-pane.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=7379dd4a&sv=2)
Workflows save / edit pane
Save Workflow Demo
### 
[](#working-with-arguments)
Working with arguments
In the workflow editor, you can add arguments manually with "New argument" or by typing in double curly braces (`{{argument}}`) within the command field. If you select "New argument" while you have text selected, Warp will wrap that text in curly braces to create an argument.
There are some rules for creating valid arguments:
 * Argument names can only include characters `A-Za-z0-9`, hyphens `-` and underscores `_`
 * The first character of an argument cannot be a number
Arguments can be one of two types: text or enum. By default, all new arguments are text type.
#### 
[](#enum-type-arguments)
Enum type arguments
Enums allow you to specify expected inputs to a workflow argument. When you insert a workflow with enums into the input editor, you will be prompted with suggestions for filling in the argument. You can open the suggestions menu by pressing `SHIFT-TAB` while selecting an argument.
Enum Input Suggestions Demo
To create an enum type argument:
 1. Navigate to the "default value" field of an argument.
 2. Select the "Enum" type.
 3. Click "New" to create a new enum, or select an existing one from the dropdown menu.
 4. If you selected "New", you can choose to create a "Static" enum or "Dynamic" enum. Dynamic enums are associated with a shell command whose output is parsed to determine the set of valid values for that argument.
Enum Creation Demo
### 
[](#working-with-aliases)
Working with aliases
Workflow aliases allow you to create personalized shortcuts and custom configurations for your frequently used workflows. These aliases provide enhanced flexibility in how you use and configure workflows. Aliases are personal to your account, not shared with everyone who has the workflow. If settings sync is enabled, they'll be synced across devices logged in to your account. Aliases can set default values for each [argument](/knowledge-and-collaboration/warp-drive/workflows#working-with-arguments), but don't have to. Aliases can have [Environmental Variables](/knowledge-and-collaboration/warp-drive/environment-variables) associated with them.
Workflow aliases are not compatible with [YAML Workflows](/terminal/entry/yaml-workflows). They can only be used with Workflows created in [Warp Drive](/knowledge-and-collaboration/warp-drive).
### 
[](#editing-workflows)
Editing workflows
Once a workflow has been created, you can edit it at any time, as long as you have access to an internet connection.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-8e33c4c88fb2361939d53100aca3004e8125d241%252FEdit_Workflow.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=5d754cab&sv=2)
Edit workflow menu
#### 
[](#ai-autofill)
AI Autofill
Workflows also have the option to use [Warp AI](/agents/agents-overview) to automatically generate a title, descriptions, or parameters.
 * Create or edit a Workflow, in the edit view you should see the option to AutoFill.
 * Warp AI will fill in the fields based on the Workflow you're creating.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-c5fd9fb1cff247dfd36ecc03624f1acbfbde9675%252FEdit-workflows-autofill.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=e25d9121&sv=2)
Edit Workflows - Autofill
### 
[](#editing-workflows-with-a-team)
Editing workflows with a team
If the workflow is shared with a team, all team members will have access to edit the workflow and updates will sync immediately for all members of the team.
If a workflow in the Warp Drive has been edited by another team member or a user on another device while you are attempting to edit the same workflow, you will not be able to save changes; you will need to check out the latest version and try again.
## 
[](#how-to-execute-workflows)
How to execute workflows
You can execute a workflow in several ways:
 * From Warp Drive, click the workflow
 * From the [Command Palette](/terminal/command-palette), search for a workflow you’d like to execute, click or select, and enter
 * From [Command Search](/terminal/entry/command-search), search for a workflow you'd like to execute, click or select, and enter.
 * When a workflow is selected, you can use `SHIFT-TAB` to cycle through the arguments.
When you create two or more arguments with the same name, Warp automatically selects and puts multiple cursors over the arguments in the input editor so they are synced. Also, tailor your Command Search experience by toggling off "Show Global Workflows" in `Settings > Features`. When disabled, your search will exclusively encompass YAML and Warp Drive Workflows.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-375626cd398bd4fec5b7b807d3cd659e27144e88%252FScreenshot%25202023-06-17%2520at%252012.16.55%2520PM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=8d45943c&sv=2)
Search for any workflow in the Command Palette with `CMD + P`
These options will paste the workflow into your active terminal input. Workflow names and any relevant descriptions and arguments will be displayed in a dialog, so you can understand how to use the workflow.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-b41e3c7f62e21477cd2e0f35dbc9d119bfe5ecd8%252FScreenshot%25202023-06-17%2520at%252012.18.13%2520PM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=530e6463&sv=2)
Execute a Workflow
You make any adjustments you need to the arguments (or the command itself) before running the command in your input editor.
Running Workflow Demo
## 
[](#support-for-yaml-workflows)
Support for YAML Workflows
Warp will indefinitely support the [YAML Workflows](/terminal/entry/yaml-workflows), which includes personal and community workflows sourced from an open-source repository.
If needed, you can continue to access your `.yaml` file workflows using [Command Search](/terminal/entry/command-search) or the [Command Palette](/terminal/command-palette). However, these file-based workflows will not be available to access, organize, or share in Warp Drive.
### 
[](#import-and-export-workflows-in-warp-drive)
Import and Export Workflows in Warp Drive
Please see our [Warp Drive Import and Export](/knowledge-and-collaboration/warp-drive#import-and-export) instructions.
[PreviousNotebooks](/knowledge-and-collaboration/warp-drive/notebooks)[NextPrompts](/knowledge-and-collaboration/warp-drive/prompts)
Last updated 4 months ago
Was this helpful?