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
 * [What is a Prompt?](#what-is-a-prompt)
 * [Demo: Trigger Reusable Actions with Saved Prompts](#demo-trigger-reusable-actions-with-saved-prompts)
 * [How to save and edit Prompts](#how-to-save-and-edit-prompts)
 * [Working with arguments](#working-with-arguments)
 * [Editing Prompts with a team](#editing-prompts-with-a-team)
 * [How to execute Prompts](#how-to-execute-prompts)
 * [Import and Export Prompts in Warp Drive](#import-and-export-prompts-in-warp-drive)
Was this helpful?
## 
[](#what-is-a-prompt)
What is a Prompt?
A Prompt is a parameterized natural language query you can name and save in Warp to use with [Agent Mode](/agents/using-agents).
Prompts are searchable and easily accessed from the [Command Palette](/terminal/command-palette) so you can find and execute them without switching context. They allow you to save and reuse specific and complex AI workflows, making it easier to repeat multi-step tasks with Agent Mode.
![View of a Prompt in Warp Drive showing the command view interface](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-4a7a7593ea9e583c8acde5950aff4814fd6953c1%252Fprompts-command-view.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=41d7f082&sv=2)
Command view of a Prompt in Warp Drive
### 
[](#demo-trigger-reusable-actions-with-saved-prompts)
Demo: Trigger Reusable Actions with Saved Prompts
Here's an example from [Warp University](https://www.warp.dev/university), where Zach walks through what Prompts he uses for PRs and Git commits:
There's other great examples of Prompts on [Do Things](https://dothings.warp.dev/) and [Warp University](https://www.warp.dev/university).
## 
[](#how-to-save-and-edit-prompts)
How to save and edit Prompts
You can create a new Prompt from Warp Drive by clicking the + button and selecting "Prompt".
 * Name your Prompt
 * Edit the natural language query along with any arguments (also known as parameters)
 * Add a meaningful description that will be indexed for search (optional)
 * Add arguments, descriptions for arguments, and default values (optional)
![View of the Prompt editor interface showing the edit form with fields for name, query, description, and arguments](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-b5f0aa58be3db8f09ff0288c2a04ee3d3c2a9b18%252Fprompts-edit-view.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=973c3949&sv=2)
Edit view of a Prompt in Warp Drive
Once a Prompt has been created, you can edit it at any time, as long as you have access to an internet connection.
### 
[](#working-with-arguments)
Working with arguments
In the Prompt editor, you can add arguments manually with "New argument" or by typing in double curly braces (`{{argument}}`) within the command field. If you select "New argument" while you have text selected, Warp will wrap that text in curly braces to create an argument.
There are some rules for creating valid arguments:
 * Argument names can only include characters `A-Za-z0-9`, hyphens `-` and underscores `_`
 * The first character of an argument cannot be a number
Arguments can be one of two types: text or enum. By default, all new arguments are text type.
#### 
[](#enum-type-arguments)
Enum type arguments
Enums allow you to specify expected inputs to a Prompt argument. When you insert a Prompt with enums into the input editor, you will be prompted with suggestions for filling in the argument. You can open the suggestions menu by pressing `SHIFT-TAB` while selecting an argument.
For detailed information about creating and using enum type arguments, please see the [Enum type arguments section in Workflows documentation](/knowledge-and-collaboration/warp-drive/workflows#enum-type-arguments).
### 
[](#editing-prompts-with-a-team)
Editing Prompts with a team
If the Prompt is shared with a team, all team members will have access to edit it and updates will sync immediately for all members of the team.
If a Prompt in the Warp Drive has been edited by another team member or a user on another device while you are attempting to edit the same Prompt, you will not be able to save changes; you will need to check out the latest version and try again.
## 
[](#how-to-execute-prompts)
How to execute Prompts
You can execute a Prompt in several ways:
 * From Warp Drive, click the Prompt
 * From the [Command Palette](/terminal/command-palette) or [Command Search](/terminal/entry/command-search), search for a Prompt by name or type "prompts:" to see all available prompts and your prompt history
 * When a Prompt is selected, you can use `SHIFT-TAB` to cycle through the arguments.
![Command Palette interface showing a search for Prompts with results displayed](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-390738e6639a1537144c71a295dbf0f2de7c4103%252Fprompts-command-palette.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=dba514f7&sv=2)
Search for Prompts in the Command Palette with `CMD + P`
![Command Search interface showing a search for Prompts with results displayed](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-b88aa05c6d16d5d02a0f72d1976d33c2450f66fe%252Fprompts-command-search.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=51fe7ae&sv=2)
Search for Prompts in Command Search with `CTRL + R`
These options will paste the Prompt into your active terminal input. Prompt names and any relevant descriptions and arguments will be displayed in a dialog, so you can understand how to use the Prompt.
You can make any adjustments you need to the arguments before running the Prompt in your input editor.
### 
[](#import-and-export-prompts-in-warp-drive)
Import and Export Prompts in Warp Drive
Please see our [Warp Drive Import and Export](/knowledge-and-collaboration/warp-drive#import-and-export) instructions.
[PreviousWorkflows](/knowledge-and-collaboration/warp-drive/workflows)[NextEnvironment Variables](/knowledge-and-collaboration/warp-drive/environment-variables)
Last updated 1 month ago
Was this helpful?