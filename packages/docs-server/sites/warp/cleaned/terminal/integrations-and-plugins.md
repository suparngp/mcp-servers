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
 * [Docker](#docker)
 * [Raycast](#raycast)
 * [VSCode](#vscode)
 * [JetBrains IDEs](#jetbrains-ides)
Was this helpful?
## 
[](#docker)
Docker
Currently, the Docker extension is only available on macOS.
[Warp’s Docker extension](https://hub.docker.com/extensions/warpdotdev/warp) makes it more convenient to open Docker containers in Warp. With the extension, you can click to open any Docker container in a [Warpified subshell](/terminal/warpify/subshells), without manually running `docker exec` or typing out lengthy container IDs.
Select a container from the list and specify a shell type. Note, that only `bash|zsh|fish` are supported shells for docker containers. Then, select a user (optional) and finally click “Open in Warp” to run commands within the Docker container.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-77ea0935865e88730f4ebf91dde38821bdf4f7c4%252Fdocker-extension.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=22428b15&sv=2)
Warp's extension for Docker lists available containers
## 
[](#raycast)
Raycast
Currently, the Raycast extension is only available on macOS.
Warp + Raycast extension helps you open new windows, tabs, or Launch Configurations with [ease](https://twitter.com/warpdotdev/status/1678432353461637121).
[![Logo](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2Fwww.raycast.com%2Ffavicon-production.png&width=20&dpr=4&quality=100&sign=f4a33ccb&sv=2)Raycast Store: Warpwww.raycast.com](https://www.raycast.com/warpdotdev/warp)
Warp + Raycast Extension Link
**Terminal Tip** Within `Raycast Settings > Extensions > Apps` search for Warp and assign the alias "terminal" so that it will show up on a search.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-3d1d4202e04925116dbbfe1b4f19422831dc1a5a%252Fraycast-terminal-tip.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=29b42a22&sv=2)
Raycast Terminal Tip
## 
[](#vscode)
VSCode
macOS
Windows
Linux
Press `SHIFT-CMD-C` while in [VSCode](https://code.visualstudio.com/docs/terminal/basics) to open a new session in Warp.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-453d61e19a9ee3f466a4e9f363f24518a05343c1%252Fvscode_new_session.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=a291beb5&sv=2)
VSCode New Session Shortcut
To configure this, navigate to Settings in VSCode and search for `Terminal › External: Osx Exec`. Change this to `Warp.app` if you've installed Warp in the default location. Otherwise, put in the full path to the executable.
Press `CTRL-SHIFT-C` while in [VSCode](https://code.visualstudio.com/docs/terminal/basics) to open a new session in Warp.
To configure this, navigate to Settings in VSCode and search for `Terminal › External: Windows Exec`. Change this to `%LOCALAPPDATA%\Programs\Warp\warp.exe` if you've installed Warp in the default location for a single user or `C:\Program Files\Warp\warp.exe` if you've installed Warp in the default location for all users. Otherwise, put in the full path to the executable.
Press `CTRL-SHIFT-C` while in [VSCode](https://code.visualstudio.com/docs/terminal/basics) to open a new session in Warp.
To configure this, navigate to Settings in VSCode and search for `Terminal › External: Linux Exec`. Change this to `warp-terminal` if you've installed Warp with your distribution's package manager. Otherwise, put in the full path to the executable (e.g. if it is an AppImage).
## 
[](#jetbrains-ides)
JetBrains IDEs
Currently, the JetBrains IDE configuration is only available on macOS.
Press a keyboard shortcut of choice while in a JetBrains IDE to open a new session in Warp.
To configure this, use the Apple Menu. Click on `Preferences`, go to `External Tools` , and click `Add`. In this menu, put the following information:
 * _Name_ : Open Warp
 * _Program_ : `/Applications/Warp.app`
 * _Arguments_ : `$ProjectFileDir$`
 * _Working Directory_ : `/Applications`
Then press `Ok`. Now you will be able to `Open Warp` from the Apple Menu under `Tools` -> `External Tools`.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-aab1bcc9d3fcea88ca8461a6d02289776f118e15%252Fjetbrains_external_terminal_config.gif%3Falt%3Dmedia%26token%3Dcaa7c9a2-4124-41ec-8740-c18873bec399&width=768&dpr=4&quality=100&sign=dd40a194&sv=2)
JetBrains New Session Shortcut
To attach this configuration to a keyboard shortcut, you must go to the Apple Menu -> `Preferences`. Then go to `Keymap` -> `External Tools`. You will find `Open Warp`. Right-click on it, and select `Add Keyboard Shortcut`. Type your desired shortcut and click save! You're ready to open Warp with a keyboard shortcut.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-92cd0abc478f47ba9505df4ae2abdc067dbba72f%252Fjetbrains_external_window_keymap_config.gif%3Falt%3Dmedia%26token%3Df23c5c20-5ad0-4211-85d9-fe732ddaa047&width=768&dpr=4&quality=100&sign=6b93fbc6&sv=2)
JetBrains Configure Keyboard Shortcut
[PreviousTerminal features](/terminal/comparisons/terminal-features)[NextWarp Drive](/knowledge-and-collaboration/warp-drive)
Last updated 4 months ago
Was this helpful?