[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * * [Quickstart Guided](/)
 * [Installation and setup](/getting-started/readme/installation-and-setup)
 * [Coding in Warp](/getting-started/readme/coding-in-warp)
 * [Agents in Warp](/getting-started/readme/agents-in-warp)
 * [Customizing Warp](/getting-started/readme/customizing-warp)
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
Was this helpful?
When you enter a git repo for the first time, Warp will enter an initialization flow to index your codebase and generate a WARP.md file. 
As you're in the repo, Warp will enter an advanced code generation flow that supports both single-line and multi-file changes when it detects an opportunity to write code.
For example, Warp may write code when you prompt:
 * **Code creation** : “Write a function in JavaScript to debounce an input”
 * **Based on error outputs, suggest fixes** : “Fix this TypeScript error.”
 * **Edit a single file** : “Update all instances of ‘var’ to ‘let’ in this file.”
 * **Make batch changes** : “Add headers to all .py files in this directory”
**The best way to experience this is to try it yourself —**[ _open the Prompt below in Warp_](https://app.warp.dev/drive/prompt/Generate-a-custom-Warp-theme-K8oloLrCZAHuaYKfz2cNqI)
Copy```
Detect the correct Warp themes directory based on the current operating system:
- On macOS, use ~/.warp/themes/
- On Linux, use ${XDG_DATA_HOME:-$HOME/.local/share}/warp-terminal/themes/
- On Windows, use $env:APPDATA\warp\Warp\data\themes\
Create the directory if it doesn’t already exist. 
Then, generate a custom Warp theme named {{theme_name}} in valid YAML format, following the official structure from Warp’s documentation. Exclude the background_image field, and do not include any extra or missing fields. Save the theme as {{theme_name}}.yaml in the detected themes directory.
Once the theme is created and verified, confirm completion by telling me where the theme file was saved.
```
* * *
### 
[](#context)
Context
#### 
[](#codebase-context)
Codebase Context
Warp can index your Git-tracked codebases to help agents understand your code and generate accurate, context-aware responses. **No code is stored on Warp servers**.
You can view and manage your indexed codebases under `Settings > Code > Codebase Index` and you can also specify whether to automatically index new folders as you navigate them.
If your codebase is large, you can exclude specific files by adding them to a `.warpindexingignore` file.
#### 
[](#other-types-of-context)
Other types of context
You can provide different types of input as context directly to the agent to guide its behavior and improve response quality. This includes:
 * [Blocks](https://docs.warp.dev/agents/using-agents/agent-context#attaching-blocks-as-context) from your terminal output
 * [Images](https://docs.warp.dev/agents/using-agents/agent-context#attaching-images-as-context)
 * [Files and code](https://docs.warp.dev/agents/using-agents/agent-context#referencing-files-and-code-using) (using the @ symbol)
 * [Public websites](https://docs.warp.dev/agents/using-agents/agent-context#referencing-websites-via-urls) via URLs
#### 
[](#warp-drive-as-context)
Warp Drive as Context
Agents pull directly from your [**Warp Drive**](https://docs.warp.dev/features/warp-drive) contents to generate more accurate responses -- including your **Workflows** , **Notebooks** , **Prompts** , and **Environment Variables**.
 * When used, context appears under the “References” or “Derived from” section in the conversation.
 * This setting is **enabled by default** and can be managed via: `Settings > AI > Knowledge > Warp Drive as Agent Mode Context`.
#### 
[](#rules)
Rules
**Rules** let you provide persistent context to Agents, enabling smarter and more personalized responses. 
You can create global rules (accessed through [Warp Drive](https://docs.warp.dev/features/warp-drive) > Personal > Rules) or project scoped rules, defined in a WARP.md file.
**Examples of Rules include:**
 * Coding standards and best practices
 * Project- or workspace-specific guidelines
 * Personal preferences for tools, formatting, or behavior
How to access project-specific Rules
 1. From the file-searcher, CMD+O and search "WARP.md"
 2. From the file tree, click the "code" icon when in a repo
How to access Global Rules
 1. From the [Warp Drive](https://docs.warp.dev/features/warp-drive) > Personal > Rules
 2. From the [Command Palette](https://github.com/warpdotdev/gitbook/blob/main/docs/features/warp-ai/command-palette.md), search for "Open AI Rules"
 3. From the Settings panel, `Settings > AI > Knowledge > Manage Rules`
 4. From the macOS Menu, `AI > Open Rules`
[PreviousInstallation and setup](/getting-started/readme/installation-and-setup)[NextAgents in Warp](/getting-started/readme/agents-in-warp)
Last updated 1 month ago
Was this helpful?