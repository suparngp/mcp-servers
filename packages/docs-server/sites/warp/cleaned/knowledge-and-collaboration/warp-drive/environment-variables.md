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
 * [What are Environment Variables in Warp?](#what-are-environment-variables-in-warp)
 * [How to create and edit environment variables](#how-to-create-and-edit-environment-variables)
 * [Managing individual environment variables](#managing-individual-environment-variables)
 * [Static variables](#static-variables)
 * [Dynamic variables](#dynamic-variables)
 * [How to create and edit dynamic environment variables](#how-to-create-and-edit-dynamic-environment-variables)
 * [How to write a custom secret command](#how-to-write-a-custom-secret-command)
 * [Using environment variables](#using-environment-variables)
 * [Import and Export Environment Variables in Warp Drive](#import-and-export-environment-variables-in-warp-drive)
Was this helpful?
## 
[](#what-are-environment-variables-in-warp)
What are Environment Variables in Warp?
Environment Variables in Warp are similar to .env files, except you can:
 * Load them into your terminal session with a click.
 * Use them in parameterized workflows.
 * Dynamically reference secrets from external managers.
## 
[](#how-to-create-and-edit-environment-variables)
How to create and edit environment variables
You can create new environment variables through:
 * [Warp Drive](/knowledge-and-collaboration/warp-drive), + → Environment variable
 * [Command Palette](/terminal/command-palette), create new team or personal environment variables
Any of these entry points will open the environment variables editor where you can name and describe your environment variables.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-60031624761404b585bab0b0ab8bc102146f8774%252FScreenshot%25202024-09-25%2520at%25205.35.23%25E2%2580%25AFPM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=c04e61d1&sv=2)
## 
[](#managing-individual-environment-variables)
Managing individual environment variables
Warp supports two types of environment variables: static variables and dynamic variables.
### 
[](#static-variables)
Static variables
Static variables are similar to .env files. You create the variables by entering raw strings of text. Each variable has a variable name and a corresponding value.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-9d2ebafcff40c9a4b42c1f4688dfc0b4df7442bc%252FScreenshot%25202024-09-25%2520at%25205.38.40%25E2%2580%25AFPM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=40f32b8c&sv=2)
After you save the environment variable, you can click it to load it into your terminal session.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-84d294108011a26c1622563395493d9b906041d3%252FScreenshot%25202024-09-25%2520at%25205.40.04%25E2%2580%25AFPM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=bda27173&sv=2)
When you use static variables, Warp stores them securely in Warp Drive. Note: Static variables should not be used to replace a secret manager. Please use dynamic variables for any sensitive information.
### 
[](#dynamic-variables)
Dynamic variables
Warp never stores secrets used in dynamic variables. Warp only stores the command used to dynamically retrieve the secrets at runtime.
Dynamic variables let you reference secrets that are stored securely outside of Warp in external secret managers, such as 1Password or LastPass.
You can use custom commands to create dynamic variables for any system with a public API or CLI, such as AWS or Hashicorp Vault.
### 
[](#how-to-create-and-edit-dynamic-environment-variables)
**How to create and edit dynamic environment variables**
To create a new dynamic variable:
 1. Open the environment variable editor.
 2. Use the key icon to reveal the dynamic variable menu.
 3. Select an integrated password manager or "Command" to write your own custom integration.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-a21c85e8db37d7db7d45f441a11686d34e44c197%252FScreenshot%25202024-09-25%2520at%25205.54.24%25E2%2580%25AFPM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=ab939a9e&sv=2)
#### 
[](#integrated-password-managers)
**Integrated password managers**
Before you get started, please ensure you have the CLI installed for your tool of choice and follow the instructions to enable the CLI:
 * [1Password CLI](https://developer.1password.com/docs/cli/get-started/)
 * [LastPass CLI](https://github.com/lastpass/lastpass-cli)
Then, you can click the key icon and select your manager from the dropdown menu.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-a2842e00c0d30d8be8f770e275e4522c7be018a3%252FScreenshot%25202024-09-25%2520at%25206.07.50%25E2%2580%25AFPM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=5ed95762&sv=2)
The CLI will require you to authenticate and then provide you with a list of available secrets.
Selecting a secret name never stores the actual secret. Warp uses your selection to generate a command that dynamically pulls in your selected secret at runtime.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2Flh7-rt.googleusercontent.com%2Fdocsz%2FAD_4nXcqiazhpRvaHxxSW5n3Ql6nFRDDRkyVdlRB9E-Q6HE0lpL2KFgwLM1P1PPrJG_i0KIHWuEKp2PMFq4T1auWvQOxXrpuERpLRZG1h2V4DDYmNRZRqShxjPzWyqGR2VfXYNhttAK0HT2-aQNjAt3xdCA9MwE%3Fkey%3Dq_xMyXgvJVA02ysqZAH4Jw&width=768&dpr=4&quality=100&sign=6e7d444d&sv=2)
### 
[](#how-to-write-a-custom-secret-command)
**How to write a custom secret command**
Reference the documentation for your external secret manager. Then, write a custom command to retrieve secrets.
Your custom command should return the exact string you want loaded into your environment. Please make sure that you are selecting the exact field you want loaded as many secret manager CLIs provide additional formatting by default.
For example, you could write a command using the [Hashicorp Vault CLI](https://developer.hashicorp.com/vault/docs/commands) to retrieve and load the password field for the staging server. When using secret commands, Warp stores the command but never the actual secrets. The secrets will be referenced and loaded into a terminal session at runtime.
Copy```
// vault kv get -field=password secret/staging/app/server/creds
```
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2Flh7-rt.googleusercontent.com%2Fdocsz%2FAD_4nXcltckpSwesjA1O84nzZhUKc0Wuie0OH3iN6g0WPBojhtY5pckPSZgOZxqIjiV12ppe9t0jtF9z2Yf7d-fIZJhSu8-tLIT8CoG_Xh_NvCzFbrJgD5FA2ounNtHurq9nDLALiOekjPeVoru-FzeYOWkfm9PN%3Fkey%3Dq_xMyXgvJVA02ysqZAH4Jw&width=768&dpr=4&quality=100&sign=f491a414&sv=2)
### 
[](#using-environment-variables)
Using environment variables
There are three ways to invoke your environment variables and load them into a terminal session:
 1. [Click to load into a current section](/knowledge-and-collaboration/warp-drive/environment-variables#click-to-load-into-a-current-session)
 2. [Click to load into a subshell](/knowledge-and-collaboration/warp-drive/environment-variables#click-to-load-into-a-subshell)
 3. [Select to load in with a workflow](/knowledge-and-collaboration/warp-drive/environment-variables#select-to-load-with-a-workflow)
#### 
[](#click-to-load-into-a-current-session)
Click to load into a current session
First, click your environment variable from Warp Drive or the Command Palette.
Then, review the confirmation block. If your environment variables are correct, hit enter to load them into your session.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-72be659d8d1c0e250378a9f614277835ce20a207%252Fenv-var-load-to-input.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=deba5480&sv=2)
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-1700f9b09f242a312d4bd1e81662acc1092dc172%252FScreenshot%25202024-09-25%2520at%25206.14.17%25E2%2580%25AFPM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=d79ac5fd&sv=2)
These environment variables will now be present for the remainder of your session.
#### 
[](#click-to-load-into-a-subshell)
Click to load into a subshell
To load environment variables into a subshell, you will need to open [Warp Drive](/knowledge-and-collaboration/warp-drive) and locate your environment variable in the Warp Drive index. You can then use the overflow menu to select "Load in subshell."
Loading an environment into a subshell reduces the risk of your environment variables accidentally contaminating your workspace. The subshell is clearly defined and once you exit it, any environment variables set by Warp Environment Variables will be cleared, unless they are already present in the parent session.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2Flh7-rt.googleusercontent.com%2Fdocsz%2FAD_4nXeqhj2saz5AJTYUCx-PClwCLX421mKEzXelcnnkeHkqvDexelvBDmPpESHOmV_SjAOEuLKk8YgYaIodX-cOuXm1Nm05wUU88zcIv3otd1HRvXO455EiKEfs5tTB5ft9OoW7qxMK9BV1OPAVIc9AhMqsgweK%3Fkey%3Dq_xMyXgvJVA02ysqZAH4Jw&width=768&dpr=4&quality=100&sign=9f18c700&sv=2)
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2Flh7-rt.googleusercontent.com%2Fdocsz%2FAD_4nXeeXyJEMxJV2DpOBJS7pKOEpBSm6aypAIKd4ygJKT13opDBxeS5k0S5NtM8Cr_Z_lafyj-cn1T-hJ-93AkZhpWTrbvYHYIRs96_V7dr3mfiM3lPx6-kMS_eLjINPHIr6Ex0NaMr-TRCkNQ1fdVv8cApJ0QJ%3Fkey%3Dq_xMyXgvJVA02ysqZAH4Jw&width=768&dpr=4&quality=100&sign=61257ea&sv=2)
#### 
[](#select-to-load-with-a-workflow)
Select to load with a workflow
Any time you run a workflow, you can select from existing environment variables. This allows you to dynamically inject environment variables into a parameterized workflow so you can use a single workflow command in multiple environments, such as production and staging.
For example, you might have a workflow to create a new team that uses the environment variable $SERVER_URL. By using the environment variables dropdown in the workflow card, you can dynamically inject the necessary variables. This ensures the workflow references the appropriate values so the command runs with the relevant environment-specific information.
These environment variables will now be present for the remainder of your session until you clear them or overwrite them with a different environment.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2Flh7-rt.googleusercontent.com%2Fdocsz%2FAD_4nXcuOxH8UeVLSvWRpZwvdoVBgbpFhb2rXKbDw2CnZ5BQCTWSgzjwERe-fzKLEYBQZGKzjV-Pdd_z6tB9BTSWYos9ADRaDbChskSg-MZpjaKme0kG8UwWsJ2HBJk7iBu4SKbGZCobZy0uD2nFkrNoVjNZEEOW%3Fkey%3Dq_xMyXgvJVA02ysqZAH4Jw&width=768&dpr=4&quality=100&sign=9ff6e747&sv=2)
### 
[](#import-and-export-environment-variables-in-warp-drive)
Import and Export Environment Variables in Warp Drive
Please see our [Warp Drive Import and Export](/knowledge-and-collaboration/warp-drive#import-and-export) instructions.
[PreviousPrompts](/knowledge-and-collaboration/warp-drive/prompts)[NextWarp Drive on the Web](/knowledge-and-collaboration/warp-drive/warp-drive-on-the-web)
Last updated 6 days ago
Was this helpful?