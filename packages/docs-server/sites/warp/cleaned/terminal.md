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
 * [Breaking down the Universal Input](#breaking-down-the-universal-input)
 * [Input Modes](#input-modes)
 * [Entering Agent Mode](#entering-agent-mode)
 * [Exiting Agent or Terminal Modes](#exiting-agent-or-terminal-modes)
 * [Natural Language Auto-detection Settings](#natural-language-auto-detection-settings)
 * [Contextual Input Chips](#contextual-input-chips)
 * [Input toolbelt](#input-toolbelt)
 * [Model Picker](#model-picker)
Was this helpful?
The **Universal Input** is the main input interface for using Warp. It accepts both terminal commands and natural language [Agent](/agents/agents-overview) prompts, letting you run shell workflows and kick off agentic tasks from the same place.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F9x9oYdD9HUSZF4oVJW1m%252Fimage.png%3Falt%3Dmedia%26token%3Dbe2af7ec-f160-446c-ae65-c1fc750238f2&width=768&dpr=4&quality=100&sign=1a97490f&sv=2)
The Universal Input with an Agent prompt and multiple contextual chips active.
Using the Universal Input
### 
[](#breaking-down-the-universal-input)
Breaking down the Universal Input
The Universal Input brings together all of Warp's input features into one streamlined editor:
 * **Natural language auto-detection** : Warp can automatically detect when you're writing in plain English, as opposed to a shell command, and switch you into [Agent Mode](/agents/using-agents#what-is-agent-mode).
 * **Contextual chips** : See your current directory, previous conversations, Git status, node version, and more, all inline with your input.
 * [**Modern text editing**](/terminal/editor): Enjoy IDE-like editing features such as [completions](/terminal/command-completions), [syntax highlighting](/terminal/editor/syntax-error-highlighting), mouse support, [rectangular selection](/terminal/more-features/text-selection), and [Next Command](/agents/active-ai) predictions.
 * **Input toolbelt** : Quickly access [@-context](/agents/using-agents/agent-context/using-to-add-context), [Slash Commands](/agents/slash-commands), [voice input](/agents/voice), [image attachments](/agents/using-agents/agent-context/images-as-context) as context, and other AI features.
If you prefer a more traditional terminal input experience, you can switch to [Classic Input](/terminal/universal-input/classic-input) in `Settings > Appearance > Input`. Classic input also supports oh-my-posh, PS1 customizations, and [same line prompt.](/terminal/appearance/prompt#same-line-prompt)
## 
[](#input-modes)
Input Modes
The Universal Input supports three modes, shown in the input switcher:
#### 
[](#id-1.-agent-mode-natural-language)
1. Agent Mode (natural language)
Ask Warp's agent to build, debug, or run tasks in natural language. Warp uses leading LLMs to interpret your request, run the right commands, surface code diffs, and stream results directly into your session.
_Indicator:_ Agent icon is highlighted in the switcher.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FOqiFtv1TYMifpZAlvWJa%252Fimage.png%3Falt%3Dmedia%26token%3D2fe43234-c717-4182-b88e-e91d90931699&width=768&dpr=4&quality=100&sign=40856512&sv=2)
Universal Input locked in Agent Mode.
#### 
[](#id-2.-terminal-mode-shell-commands)
2. Terminal Mode (shell commands)
Enter shell commands just like any terminal, with the benefit of Warp’s modern editor features—completions, syntax highlighting, error underlining, and more included.
_Indicator_ : Terminal icon highlighted in the switcher
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FvXo1ZK2tifu4c5ANxoT8%252Fimage.png%3Falt%3Dmedia%26token%3D260b379c-ecd8-46c8-8aab-fb966b9d93f7&width=768&dpr=4&quality=100&sign=afeb1245&sv=2)
Universal Input locked in Terminal Mode.
#### 
[](#id-3.-auto-detection-mode)
3. Auto-detection Mode
Warp automatically detects whether your input is natural language or a shell command. You can stay in detection mode or explicitly lock into Terminal or Agent Mode.
_Indicator_ : Neither mode highlighted.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FwvquaMNhxrSZCI0JJl2h%252Fimage.png%3Falt%3Dmedia%26token%3D3f443979-62ca-4de3-b4e9-511a9aa2bfa3&width=768&dpr=4&quality=100&sign=f1fa2034&sv=2)
Universal Input in an empty / zero state.
When Warp detects an input type, the input switcher softly highlights the corresponding mode.
Agent (natural language) mode detected
Terminal (shell) mode detected
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fz2DGo5GmBe8QJWmhXgS9%252Fimage.png%3Falt%3Dmedia%26token%3D63880d63-b237-46cc-86bf-92b01b2a26f9&width=768&dpr=4&quality=100&sign=90a2bb94&sv=2)
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FvygPytxWyI6y5o73bvDL%252Fimage.png%3Falt%3Dmedia%26token%3Dd46b670a-e709-4b0c-b490-c3b446bac0e7&width=768&dpr=4&quality=100&sign=2dae76b0&sv=2)
The model Warp uses to detect natural language automatically is completely local.
#### 
[](#disabling-natural-language-auto-detection)
Disabling Natural Language Auto-detection
By default, auto-detection is enabled. This means Warp decides whether to treat your input as a command or an Agent prompt. 
 * **To turn off auto-detection** : go to `Settings > AI > Input > Natural Language Detection`
 * When disabled: You’ll explicitly be in either Terminal or Agent Mode. Use the following keyboard shortcuts to switch between modes:
 * `CMD+I` (macOS)
 * `CTRL+I` (Windows/Linux)
Agent (natural language) mode enabled
Terminal (shell) mode enabled
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FO4U2xjmmWoIX32BZaUPJ%252Fimage.png%3Falt%3Dmedia%26token%3D96b06a4e-905f-4cef-b992-06d64351c838&width=768&dpr=4&quality=100&sign=2db09636&sv=2)
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FnR7ho12LfS6QTSSlAdG1%252Fimage.png%3Falt%3Dmedia%26token%3Dcce73508-6570-4adb-b51e-cda4b8fd513d&width=768&dpr=4&quality=100&sign=df5dfa6b&sv=2)
### 
[](#entering-agent-mode)
Entering Agent Mode
[Agent Mode](/agents/using-agents) is how you interact directly with Warp’s AI to ask questions, run tasks, and collaborate in natural language. There are multiple ways to enter Agent Mode depending on where you are in your workflow:
macOS
Windows
Linux
 * **Type natural language directly** : If auto-detection is enabled, you can type a task or question into the input, and Warp will recognize it as natural language using its local auto-detection feature.
 * **Use keyboard shortcuts** : Quickly toggle into Agent Mode with `CMD + I`.
 * **Attach blocks to a prompt** : From any block you want to use as context, click the ✨ icon in the toolbelt or select "Attach block(s)" to AI query from the block’s context menu.
 * **Force a mode with special characters** :
 * `!` at the start of input forces Terminal Mode.
 * `*` at the start of input forces Agent Mode.
 * **Switch modes manually** : Click the Agent icon in the input switcher to lock into Agent Mode, or click the terminal icon to switch to Terminal Mode.
 * **Type natural language directly** : If auto-detection is enabled, you can type a task or question into the input, and Warp will recognize it as natural language using its local auto-detection feature.
 * **Use keyboard shortcuts** : Quickly toggle into Agent Mode with `CTRL + I`.
 * **Attach blocks to a prompt** : From any block you want to use as context, click the ✨ icon in the toolbelt or select "Attach block(s)" to AI query from the block’s context menu.
 * **Force a mode with special characters** :
 * `!` at the start of input forces Terminal Mode.
 * `*` at the start of input forces Agent Mode.
 * **Switch modes manually** : Click the Agent icon in the input switcher to lock into Agent Mode, or click the terminal icon to switch to Terminal Mode.
 * **Type natural language directly** : If auto-detection is enabled, you can type a task or question into the input, and Warp will recognize it as natural language using its local auto-detection feature.
 * **Use keyboard shortcuts** : Quickly toggle into Agent Mode with `CTRL + I`.
 * **Attach blocks to a prompt** : From any block you want to use as context, click the ✨ icon in the toolbelt or select "Attach block(s)" to AI query from the block’s context menu.
 * **Force a mode with special characters** :
 * `!` at the start of input forces Terminal Mode.
 * `*` at the start of input forces Agent Mode.
 * **Switch modes manually** : Click the Agent icon in the input switcher to lock into Agent Mode, or click the terminal icon to switch to Terminal Mode.
When you’re in Agent Mode, the **Agent icon** will be highlighted in the [Universal Input](/terminal/universal-input).
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FbaMyDG98RwA7Q1QuUaO8%252Fimage.png%3Falt%3Dmedia%26token%3Df0b75834-97ad-4b6e-a302-e4d56d0bed3a&width=768&dpr=4&quality=100&sign=62ef9c05&sv=2)
The Agent icon in the Universal input indicates that Agent Mode is active.
In Classic Input, you’ll also see a ✨ sparkles indicator inline. 
![The sparkles on the command line indicate Agent Mode is active.](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-f886e83dea97c4d46e3af7e2ee5274d8da4c79a1%252Fundo_my_git_commit.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=474c68b4&sv=2)
The sparkles in the Classic input indicates that Agent Mode is active.
By default, entering Agent Mode starts you in _Pair Mode_ , where you can continue an ongoing conversation by asking follow-up questions or assigning tasks. From here, you can ask the agent to build, debug, fix, or even deploy code as needed.
### 
[](#exiting-agent-or-terminal-modes)
Exiting Agent or Terminal Modes
You can leave Agent or Terminal Modes in several ways:
macOS
Windows
Linux
 * **Keyboard shortcuts**
 * Press `ESC` to quit the current mode.
 * Toggle modes with `CMD + I`
 * **Force modes with special characters**
 * `!` at the start of input forces Terminal Mode.
 * `*` at the start of input forces Agent Mode.
 * **Manual switching** : click the Agent icon or Terminal icon in the input switcher to swap modes directly.
 * **Keyboard shortcuts**
 * Press `ESC` to quit the current mode.
 * Toggle modes with `CTRL + I`
 * **Force modes with special characters**
 * `!` at the start of input forces Terminal Mode.
 * `*` at the start of input forces Agent Mode.
 * **Manual switching** : click the Agent icon or Terminal icon in the input switcher to swap modes directly.
 * **Keyboard shortcuts**
 * Press `ESC` to quit the current mode.
 * Toggle modes with `CTRL + I`
 * **Force modes with special characters**
 * `!` at the start of input forces Terminal Mode.
 * `*` at the start of input forces Agent Mode.
 * **Manual switching** : click the Agent icon or Terminal icon in the input switcher to swap modes directly.
### 
[](#natural-language-auto-detection-settings)
Natural Language Auto-detection Settings
Warp can automatically detect when you’re writing in plain English and switch you into Agent Mode. If needed, you can customize or disable this behavior.
#### 
[](#fixing-false-detections)
Fixing false detections
If certain shell commands are mistakenly detected as natural language, you can add them to the denylist: `Settings > AI > Input > Natural language denylist`
#### 
[](#turning-off-auto-detection)
Turning off auto-detection
To disable natural language detection entirely, go to: `Settings > AI > Input Auto-detection`
When auto-detection is turned off, you’ll need to explicitly switch between Terminal Mode and Agent Mode using `CMD + I` (macOS) or `CTRL + I` (Windows/Linux).
#### 
[](#first-time-setup)
First-time setup
The first time you enter Agent Mode, Warp will display a banner with the option to disable natural language detection for your command line:
![Warp displays an option to toggle natural language detection on / off](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-33884cb98a4271fb1f7f91f543c69a916201ad4e%252Fbanner_for_auto-detection_first_experience.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=193673d9&sv=2)
Warp displays an option to toggle natural language detection on / off
* * *
## 
[](#contextual-input-chips)
Contextual Input Chips
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FiJcRyNv9wDvWDbRHyHT0%252Fimage.png%3Falt%3Dmedia%26token%3D5a64530a-5bce-45ba-b9af-0da05fbd2342&width=768&dpr=4&quality=100&sign=87ad2da&sv=2)
Universal Input's contextual input chips, from left to right: conversation management, node version, active directory, Git and code diffs, and 2 attached images.
The Universal Input includes **contextual chips** that provide inline information about your current environment. These chips surface relevant details such as directory paths, Git status, conversations, or runtime versions, making it easier to navigate, manage context, and take quick actions without leaving the input.
#### 
[](#conversation-management-chip)
Conversation Management chip
The conversation management chip shows your recent [Agent conversations](/agents/using-agents/agent-conversations), allowing you to reference or reopen them directly. 
These chips appear in both Agent Mode and Terminal Mode, so you can continue a previous conversation without starting from scratch. For more details, see [Agent Conversations](/agents/using-agents/agent-conversations).
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FbhDH1U5l9ZIRntdgWxIl%252Fimage.png%3Falt%3Dmedia%26token%3Dee39b048-9665-4edf-852b-50317272d39d&width=768&dpr=4&quality=100&sign=9f5958b3&sv=2)
The Conversation Management chip displays recent Agent conversations and lets you continue or reopen them directly from the input.
These chips appear in both Agent Mode and Terminal Mode, helping you continue a previous conversation without starting from scratch. For more details, refer to [Agent Conversations](/agents/using-agents/agent-conversations).
#### 
[](#active-directory-chip)
Active directory chip
The active directory chip displays your current working directory and enables simple file navigation. Clicking on a folder moves you into that folder, while clicking on a file opens it in [Warp’s native code editor](/code/code-editor). This makes it possible to move around your workspace seamlessly from within the input.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Ft3gURK9EN4cZrZdjWPOW%252Fimage.png%3Falt%3Dmedia%26token%3D7315edf4-29fe-4361-ad5e-f84fc6f1e7e2&width=768&dpr=4&quality=100&sign=14ca16a5&sv=2)
The Active Directory chip lets you browse directories and open files directly from the input.
#### 
[](#git-status-chip)
Git Status chip 
When you’re in a Git-tracked repository, the Git Status chip displays file- and line-level changes. You can switch branches by clicking on the branch name or review modified files in Warp’s [native Code Review panel](/code/code-review). 
The chip updates automatically as files are added, removed, or changed, giving you a real-time view of your repository state.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FzLd8DotHGTidjtMCWZaM%252Fimage.png%3Falt%3Dmedia%26token%3D1ba21e2c-6bb1-4ffb-a3a4-7ecc2ecb105a&width=768&dpr=4&quality=100&sign=857876d0&sv=2)
The Git Status chip highlights repository changes and provides quick access to code review.
#### 
[](#file-attachments-chips)
File attachments chips
The file attachments chip lets you attach images and other files directly to a prompt. You can upload up to five [images at a time (as Agent Context)](/agents/using-agents/agent-context/images-as-context) using the upload button in the toolbelt or by dragging and dropping files into the input. This makes it possible to add screenshots, diagrams, PDFs, or other references directly to your query, giving the Agent richer context.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FLdwM9pGxJogHIIBhMeuk%252Fimage.png%3Falt%3Dmedia%26token%3D183c91a8-30f5-4014-b200-9c1d3d9807f3&width=768&dpr=4&quality=100&sign=acc6a2d8&sv=2)
The File Attachments chip allows you to add images or files as context for your queries.
**Node version chip**
In repositories that include a `package.json`, a Node Version chip appears to show the detected Node.js version. This gives you visibility into your runtime environment without needing to run additional commands.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F2jBPpkEWyEsSfMxvHmfm%252Fimage.png%3Falt%3Dmedia%26token%3D79ef980c-b1a6-4e31-aaeb-cffe444aacc7&width=768&dpr=4&quality=100&sign=e4556694&sv=2)
The Node Version chip displays the Node.js version detected in your repository.
At this time, contextual chips are not configurable, but they update automatically based on your workspace and repository state.
* * *
## 
[](#input-toolbelt)
Input toolbelt
The **Input Toolbelt** provides quick-access controls alongside the Universal Input. These tools allow you to attach context, run shortcuts, and configure Agent behavior without leaving the input field. Depending on the mode you are in, some features are automatically enabled or will place you into Agent Mode.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FWJLGpGSRKUhIPqoxyxgh%252Fimage.png%3Falt%3Dmedia%26token%3D8975eb97-0420-4753-82d4-e3d4a21a582f&width=768&dpr=4&quality=100&sign=3a514ca8&sv=2)
The Input Toolbelt in Warp’s Universal Input, showing quick-access controls for context, slash commands, voice input, attachments, profiles, and model selection.
#### 
[](#context)
@ - Context 
The [@ context chip](/agents/using-agents/agent-context/using-to-add-context) is available when you are working in a Git repository. Outside of a Git repo, it appears dimmed. 
This feature allows you to attach specific files, folders, code symbols, Warp Drive objects, or blocks from other sessions as context for a prompt. Typing **@** inside the input also opens a context menu where you can search for and select files or directories to include.
Attaching context with @ works in both Agent mode (when interacting with Agents) and classic Terminal commands (for referencing file paths).
**Slash Commands**
[Slash Commands](/agents/slash-commands) are available in Agent Mode and Auto-detection Modes. They allow you to quickly run built-in actions or saved prompts without leaving the input field. Typing / displays a menu of available commands, which can be customized or extended.
**Voice Input**
[Voice Input](/agents/voice) automatically places you in Agent Mode. Speaking directly into Warp lets you phrase tasks, commands, or queries in natural language, and Warp will interpret them as if you had typed them. This feature is especially useful when you want hands-free interaction or when dictating longer tasks.
**Image Attachments**
You can [attach images as context](/agents/using-agents/agent-context/images-as-context) directly to a prompt, which will automatically place you in Agent Mode. This is useful when you want the Agent to reference visual materials such as screenshots, diagrams, or other assets.
You can add images using the image upload button in the toolbelt (located at the bottom left or right, depending on your input layout). For additional methods of attaching images, see [Images as Context](/agents/using-agents/agent-context/images-as-context).
**Fast Forward**
Fast Forward gives the Agent full autonomy for the remainder of a task or conversation. When enabled, the next prompt you enter allows the Agent to execute commands, read files, and apply code diffs without asking for confirmation each time. This is useful for complex workflows where step-by-step approval would slow things down.
#### 
[](#profile-picker)
Profile Picker
The Profile Picker allows you to select from different [Agent Profiles](/agents/using-agents/agent-profiles-permissions), each with its own configuration of autonomy, tools, and default model. If you have only one profile, the picker will not appear in the UI.
From the Profile Picker, you can view all available profiles, switch between them, and quickly see the default model attached to each one. Profiles make it possible to tailor Agent behavior for different types of tasks or projects.
### 
[](#model-picker)
Model Picker
The Model Picker is tied to your current Agent Profile. Each profile has a default model, but you can override it at any time using the picker. Warp curates a selection of top large language models (LLMs) for you to choose from, balancing speed, quality, and reasoning ability depending on your needs.
For a full list of supported models and guidance on when to use them, see [Model Choice](/agents/using-agents/model-choice).
[PreviousCode Diffs in Agent Conversations](/code/reviewing-code)[NextClassic Input](/terminal/universal-input/classic-input)
Last updated 1 month ago
Was this helpful?