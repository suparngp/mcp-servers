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
 * [Classic Input](/terminal/universal-input/classic-input)
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
 * [Classic Input Style](#classic-input-style)
 * [Learn more about Classic Input](#learn-more-about-classic-input)
 * [How to enter Agent Mode](#how-to-enter-agent-mode)
 * [Auto-detection for natural language and configurable settings](#auto-detection-for-natural-language-and-configurable-settings)
 * [Input Hints](#input-hints)
 * [How to exit Agent Mode](#how-to-exit-agent-mode)
 * [How to run commands in Agent Mode](#how-to-run-commands-in-agent-mode)
Was this helpful?
## 
[](#classic-input-style)
Classic Input Style
Warp supports two input styles: **Classic Input** and [Universal Input](/terminal/universal-input). Classic Input is closer to a traditional terminal experience, with support for shell customizations (e.g. PS1, same-line prompts, oh-my-zsh themes, and more). 
You can switch between input styles in `Settings > Appearance > Input`.
[Universal Input](/terminal/universal-input) is the default input style in Warp. Many of our newest features are only available in Universal Input and may not work in Classic Input. Classic Input remains supported for users who prefer a traditional terminal experience, but it is considered a legacy option. We encourage you to use Universal Input for the best experience.
[Agent Mode](/agents/using-agents) works in Classic Input just like it does in Universal Input, with some minor differences.
### 
[](#learn-more-about-classic-input)
Learn more about Classic Input
Classic Input supports all of Warp’s core terminal features, including the following and more:
 * [Prompt](/terminal/appearance/prompt) — Use a fully customizable Warp prompt or your shell prompt, with support for PS1 and same-line prompts.
 * [Input Position](/terminal/appearance/input-position) — Choose where the input appears in Warp, including both the prompt and the command line.
 * [Modern Text Editing](/terminal/editor)— Warp’s input editor works like a modern IDE, with rich editing capabilities not found in most terminals.
 * [Command Entry](/terminal/entry) — Access Warp’s features for command history, synchronized inputs, YAML workflows, and more.
 * [Text Selection](/terminal/more-features/text-selection) — Use smart selection or rectangular (column) selection to highlight text precisely without tedious cleanup.
### 
[](#how-to-enter-agent-mode)
How to enter Agent Mode
You may enter Agent Mode in a few ways:
macOS
Windows
Linux
 * Type any natural language, like a task or a question, in the terminal input. Warp will recognize natural language with a local auto-detection feature and prepare to send your query to Warp AI.
 * Use keyboard shortcuts to toggle into Agent Mode `CMD-I` or type `ASTERISK-SPACE`.
 * Click the “AI” sparkles icon in the menu bar, and this will open a new terminal pane that starts in Agent Mode.
 * From a block, you want to ask Warp AI about. You can click the sparkles icon in the toolbelt, or click on its block context menu item “Attach block(s) to AI query”.
 * Type any natural language, like a task or a question, in the terminal input. Warp will recognize natural language with a local auto-detection feature and prepare to send your query to Warp AI.
 * Use keyboard shortcuts to toggle into Agent Mode `CTRL-I` or type `ASTERISK-SPACE`.
 * Click the “AI” sparkles icon in the menu bar, and this will open a new terminal pane that starts in Agent Mode.
 * From a block, you want to ask Warp AI about. You can click the sparkles icon in the toolbelt, or click on its block context menu item “Attach block(s) to AI query”.
 * Type any natural language, like a task or a question, in the terminal input. Warp will recognize natural language with a local auto-detection feature and prepare to send your query to Warp AI.
 * Use keyboard shortcuts to toggle into Agent Mode `CTRL-I` or type `ASTERISK-SPACE`.
 * Click the “AI” sparkles icon in the menu bar, and this will open a new terminal pane that starts in Agent Mode.
 * From a block, you want to ask Warp AI about. You can click the sparkles icon in the toolbelt, or click on its block context menu item “Attach block(s) to AI query”.
This will put you in _Pair_ mode by default. While pairing with Warp, you can write out questions and tasks in an ongoing conversation.
When you are in Agent Mode, a ✨ sparkles icon will display in line with your terminal input.
![The sparkles on the command line indicate Agent Mode is active.](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-f886e83dea97c4d46e3af7e2ee5274d8da4c79a1%252Fundo_my_git_commit.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=474c68b4&sv=2)
The sparkles on the command line indicate Agent Mode is active.
### 
[](#auto-detection-for-natural-language-and-configurable-settings)
Auto-detection for natural language and configurable settings
The feature Warp uses to detect natural language automatically is completely local. None of your input is sent to AI unless you press `ENTER` in Agent Mode.
If you find that certain shell commands are falsely detected as natural language, you can fix the model by adding those commands to a denylist in `Settings > AI > Auto-detection denylist`.
You may also turn autodetection off from `Settings > AI > Input Auto-detection`.
The first time you enter Agent Mode, you will be served a banner with the option to disable auto-detection for natural language on your command line:
![Warp displays an option to toggle natural language detection on / off](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-33884cb98a4271fb1f7f91f543c69a916201ad4e%252Fbanner_for_auto-detection_first_experience.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=193673d9&sv=2)
Warp displays an option to toggle natural language detection on / off
### 
[](#input-hints)
Input Hints
Warp input occasionally shows hints within the input editor in a light grey text that helps users learn about features. It's enabled by default.
 * Toggle this feature `Settings > AI > Show input hint text` or search for "Input hint text" in the [Command Palette](/terminal/command-palette) or Right-click on the input editor.
### 
[](#how-to-exit-agent-mode)
How to exit Agent Mode
macOS
Windows
Linux
You can quit Agent Mode at any point with `ESC` or `CTRL-C`, or toggle out of Agent Mode with `CMD-I`.
You can quit Agent Mode at any point with `ESC` or `CTRL-C`, or toggle out of Agent Mode with `CTRL-I`.
You can quit Agent Mode at any point with `ESC` or `CTRL-C`, or toggle out of Agent Mode with `CTRL-I`.
### 
[](#how-to-run-commands-in-agent-mode)
How to run commands in Agent Mode
Once you have typed your question or task in the input, press `ENTER` to execute your AI query. Agent Mode will send your request to Warp AI and begin streaming output in the form of an AI block.
Unlike a chat panel, Agent Mode can complete tasks for you by running commands directly in your session.
#### 
[](#agent-mode-command-suggestions)
Agent Mode Command Suggestions
If Agent Mode finds a suitable command that will accomplish your task, it will describe the command in the AI block. It will also fill your terminal input with the suggested command so you can press `ENTER` to run the command.
When you run a command suggested by Agent Mode, that command will work like a standard command you've written in the terminal. No data will be sent back to the AI.
If the suggested command fails and you want to resolve the error, you may start a new AI query to address the problem.
![Agent Mode makes a suggestion to run a command.](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-36ee84d97a6458bc9607bf5c868a21935007e721%252Fagent-mode-suggestion%2520%283%29%2520%281%29.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=c4b4497&sv=2)
Agent Mode makes a suggestion to run a command.
#### 
[](#agent-mode-requested-commands)
Agent Mode Requested Commands
If Agent Mode doesn't have enough context to assist with a task, it will ask permission to run a command and read the output of that command.
You must explicitly agree and press `ENTER` to run the requested command. When you hit enter, both the command input and the output will be sent to Warp AI.
If you do not wish to send the command or its output to AI, you can click Cancel or press `CTRL-C` to exit Agent Mode and return to the traditional command line.
![Warp AI asks permission to run a command and read the output.](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-6872236ded0f64a0dfb3de102a23be643f7e8974%252FScreenshot%25202024-06-14%2520at%25205.13.02%25E2%2580%25AFPM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=6c07d571&sv=2)
Warp AI asks permission to run a command and read the output.
Once a requested command is executed, you may click to expand the output and view command details.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-85e9e1e0fd2be28e1e4515bcd0b54673d2b8cbbf%252FScreenshot%25202024-06-14%2520at%25205.21.37%25E2%2580%25AFPM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=b01a789&sv=2)
Viewing command details
In the case that a requested command fails, Warp AI will detect that. Agent Mode is self-correcting. It will request another command until it completes the task for you.
Warp lets you choose from a curated list of LLMs for use in Agent Mode. By default, Warp uses **Claude 4 Sonnet** for auto, but you can switch to other supported models. For all available models, please refer to [Model Choice](/agents/using-agents/model-choice).
[PreviousUniversal Input](/terminal/universal-input)[NextAppearance](/terminal/appearance)
Last updated 1 month ago
Was this helpful?