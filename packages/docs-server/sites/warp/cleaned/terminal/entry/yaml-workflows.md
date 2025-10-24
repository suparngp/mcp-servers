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
 * [Command Corrections](/terminal/entry/command-corrections)
 * [Command Search](/terminal/entry/command-search)
 * [Command History](/terminal/entry/command-history)
 * [Synchronized Inputs](/terminal/entry/synchronized-inputs)
 * [YAML Workflows](/terminal/entry/yaml-workflows)
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
 * [What is it](#what-is-it)
 * [How to use it](#how-to-use-it)
 * [How it works](#how-it-works)
 * [How is this Different from Aliases?](#how-is-this-different-from-aliases)
 * [Creating Custom Workflows](#creating-custom-workflows)
 * [How to create a workflow with YAML](#how-to-create-a-workflow-with-yaml)
 * [Where to save workflows](#where-to-save-workflows)
Was this helpful?
You can continue to use YAML-based workflows, but we recommend using new [workflows in Warp Drive](/knowledge-and-collaboration/warp-drive/workflows) instead for a better editing experience.
## 
[](#what-is-it)
What is it
Workflows are easily parameterized and searchable by name, description, or command arguments. [Common Workflows](https://github.com/warpdotdev/workflows) sourced by the Warp team and community are readily available within the app. Additionally, you can create and scope Workflows locally or to a git repository.
## 
[](#how-to-use-it)
How to use it
 * Open the [Command Search](/terminal/entry/command-search) or Workflow Search `CTRL-SHIFT-R` panel to find Workflows.
 * Once inside the menu, start typing in the search bar to filter the existing Workflows. (e.g. git, android, npm, etc.)
 * When a Workflow is selected with `ENTER`, you can use `SHIFT-TAB` to cycle through the arguments.
 * You can also expand the menu horizontally with the mouse by dragging it on the right edge.
Tailor your [Command Search](/terminal/entry/command-search) experience by toggling off "Show Global Workflows" in `Settings > Features`. When disabled, your search will exclusively encompass YAML and Warp Drive Workflows.
## 
[](#how-it-works)
How it works
![YAML Workflows Demo](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-e4870de99dab35a374dd44479208db26bf03e0b3%252Fyaml_workflows_demo.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=a23d5155&sv=2)
YAML Workflows Demo
### 
[](#how-is-this-different-from-aliases)
How is this Different from Aliases?
Workflows solve some major pain points with aliases, specifically the:
 1. need to context switch
 1. leave vim, source dotfiles, or reset shell
 2. difficulty with attaching documentation
 3. inability to easily search or share
 4. inability to easily parameterize
## 
[](#creating-custom-workflows)
Creating Custom Workflows
### 
[](#how-to-create-a-workflow-with-yaml)
How to create a workflow with YAML
You can store local workflows (scoped to your machine) in:
macOS
Windows
Linux
Copy```
$HOME/.warp/workflows/
```
Copy```
$env:APPDATA\warp\Warp\data\workflows\
```
Copy```
${XDG_DATA_HOME:-$HOME/.local/share}/warp-terminal/workflows/
```
Or, you can share them with your team by saving them in `{{path_to_git_repo}}/.warp/workflows/`. Local and repository Workflows can be accessed under the "My Workflows" and "Repository Workflows" tab of the Workflows menu, respectively.
See the existing Workflow spec within the [Workflows repo](https://github.com/warpdotdev/Workflows/tree/main/specs) for examples. Additionally, we outline the file format below:
[Workflow File Format](https://github.com/warpdotdev/Workflows/blob/main/FORMAT.md)[](#workflow-file-format)
The Workflow file format is a [yaml](https://yaml.org/) file and must have either a `.yml ` or `yaml` extension. If you're new to YAML and want to learn more, see [Learn YAML in Y minutes](https://learnxinyminutes.com/docs/yaml/).
* * *
`**name**`
The name of the Workflow. Required.
`**command**`
The command that is executed when the Workflow is selected. Required.
`**tags**`
An array of tags that are useful to categorize the Workflow. Optional.
Copy```
tags: ["git", "GitHub"]
```
`**description**`
The description of the Workflow and what it does. Optional.
`**source_url**`
The URL from where the Workflow was originally generated from. This is surfaced in [commands.dev](https://www.commands.dev/) for attribution purposes. Optional.
`**author**`
The original author of the Workflow. For example, if this Workflow was generated from StackOverflow, the `author` would be the `author` of the StackOverflow post. This is surfaced in [commands.dev](https://www.commands.dev/) for attribution purposes. Optional.
`**author_url**`
The URL of original author of the Workflow. For example, if this Workflow was generated from StackOverflow, the `author_url` would be the StackOverflow author's profile page. This is surfaced in [commands.dev](https://www.commands.dev/) for attribution purposes. Optional.
`**shells**`
The list of shells where this Workflow is valid. If not specified, the Workflow is assumed to be valid in all shells. This must be one of `zsh`, `bash`, or `fish`.
`**arguments**`
A Workflow can have parameterized arguments to specify pieces of the Workflow that need to be filled in by the user.
You can specify which part of the Workflow command maps to an argument by surrounding it with two curly braces (`{{<argument>}}`).
For example the Workflow command:
Copy```
for {{variable}} in {{sequence}}; do
 {{command}}
done
```
Includes 3 arguments: `variable`, `sequence`, and `command`.
`**arguments.name**`
The name of the argument. The argument name is used within the command to specify the ranges of the argument. Required.
Copy```
name: Example Workflow
command: echo {{string}}
arguments:
 - name: string
 description: The value to echo
```
`**arguments.description**`
The description of the argument. This is surfaced in both [commands.dev](https://www.commands.dev/) and Warp to help users fill in Workflow arguments. Optional
`**arguments.default_value**`
The default value for the argument. If specified, the `default_value` replaces the argument name within the command. Optional
* * *
### 
[](#where-to-save-workflows)
Where to save workflows
Local Workflows are scoped to your machine. Repository Workflows are scoped to a git repository and can be accessed by anyone who has cloned the repo. _Note:_ Repository Workflows will not appear if you are ssh into a remote machine.
macOS
Windows
Linux
Copy```
# Local Workflow Path
$HOME/.warp/workflows/
# Repository Workflow Path
{{path_to_git_repo}}/.warp/workflows
```
Copy```
# Local Workflow Path
$env:APPDATA\warp\Warp\data\workflows\
# Repository Workflow Path
{{path_to_git_repo}}\.warp\workflows
```
Copy```
# Local Workflow Path
${XDG_DATA_HOME:-$HOME/.local/share}/warp-terminal/workflows/
# Repository Workflow Path
{{path_to_git_repo}}/.warp/workflows
```
#### 
[](#local-workflows)
Local Workflows
To start, create a Workflow subdirectory within
macOS
Windows
Linux
Copy```
mkdir -p $HOME/.warp/workflows/
```
Copy```
New-Item -Path "$env:APPDATA\warp\Warp\data\workflows\" -ItemType Directory
```
Copy```
mkdir -p ${XDG_DATA_HOME:-$HOME/.local/share}/warp-terminal/workflows/
```
Add your Workflow’s `.yaml` file to this directory; if the file format is valid Warp should automatically load it into the Workflows menu.
`cp ~/path/to/my_awesome_workflow.yaml {{path_to_local_workflow_folder}}`
#### 
[](#repository-workflows)
Repository Workflows
You can add a repository Workflow similarly to how you added a local Workflow. Create a Workflows folder in a repository’s root directory and save your `.yaml` file like so:
Copy```
cd {{repository_path}}
mkdir -p .warp/workflows/
cp ~/path/to/my_awesome_workflow.yaml {{path_to_local_workflow_folder}}
```
#### 
[](#global-workflows)
Global Workflows
You can contribute Workflows that will be made available to other Warp users by forking the [Workflows repo](https://github.com/warpdotdev/workflows/tree/main/specs) and opening a pull request. See the [Contributing](https://github.com/warpdotdev/workflows#contributing) section for more details.
[PreviousSynchronized Inputs](/terminal/entry/synchronized-inputs)[NextCommand Completions](/terminal/command-completions)
Last updated 4 months ago
Was this helpful?