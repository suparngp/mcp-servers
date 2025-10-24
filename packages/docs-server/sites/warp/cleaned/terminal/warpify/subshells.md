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
 * [Subshells](/terminal/warpify/subshells)
 * [SSH](/terminal/warpify/ssh)
 * [SSH Legacy](/terminal/warpify/ssh-legacy)
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
 * [What is a subshell?](#what-is-a-subshell)
 * [How to Warpify the subshell](#how-to-warpify-the-subshell)
 * [Configuring subshell-compatible commands](#configuring-subshell-compatible-commands)
 * [Automatically "Warpify" subshells](#automatically-warpify-subshells)
 * [Background commands](#background-commands)
 * [Show/hide background blocks](#show-hide-background-blocks)
 * [Disable background commands in remote sessions](#disable-background-commands-in-remote-sessions)
Was this helpful?
## 
[](#what-is-a-subshell)
What is a subshell?
Within the context of the Warp terminal, a "subshell" is defined as any nested interactive shell session that's spawned and running within the context of an existing, running shell. This might be a nested session running locally on your machine, a shell session running within a Docker container, or a remote server accessed through SSH. [See more on SSH Warpification](/terminal/warpify/ssh).
Note that Warp's definition of a subshell differs from the more common definition of a Unix subshell, which typically refers to any shell process spawned as a child of the interactive shell. For example, in bash, a command wrapped in parentheses is executed in a subshell with its own PID and addressable memory space.
## 
[](#how-to-warpify-the-subshell)
How to Warpify the subshell
By default, Warp automatically recognizes the following commands as **subshell-compatible** :
 * bash, fish, zsh
 * docker exec
 * gcloud compute ssh
 * eb ssh
 * poetry shell
When you run a command that's subshell-compatible, Warp will prompt you and invite you to "Warpify" the subshell which makes all of the modern IDE features of Warp available in that subshell. The list of subshell-compatible commands is configurable in Subshell settings as described [below](/terminal/warpify/subshells#configuring-subshell-compatible-commands).
bash, zsh, or fish (3.6 or above) must be set as the default shell within containers and ssh sessions for the Warpification of the subshells to work.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-bbd768d41f956ba63cc7410138fc2e5980c74d30%252Fsubshells-demo.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=f6265a87&sv=2)
Subshells Demo
### 
[](#configuring-subshell-compatible-commands)
Configuring subshell-compatible commands
To configure subshell-compatible commands, navigate to the Settings > Subshells.
#### 
[](#adding-compatible-commands)
Adding compatible commands
You can add any command that spawns a bash, fish, or zsh subshell to ‘Added commands’ to make it eligible for "Warpification."
Furthermore, you can add regular expressions to the Added commands list. Any commands that match an added regex will be eligible for "Warpification."
#### 
[](#blocklisting-commands)
Blocklisting commands
Some types of subshells are not compatible, and you may also want to control Warp so it never invites you to "Warpify" the subshells for specific commands. When you add commands to the Blocklist, Warp will never invite you to "Warpify" subshells spawned by those commands.
### 
[](#automatically-warpify-subshells)
Automatically "Warpify" subshells
To remember your preferences for a command and bypass the confirmation banner, you can manually paste the appropriate snippet to the end of the RC file corresponding to your subshell (bash, fish, or zsh).
Copy```
# For zsh subshells, add to ~/.zshrc.
printf '\eP$f{"hook": "SourcedRcFileForWarp", "value": { "shell": "zsh"}}\x9c'
# For bash subshells, add to ~/.bashrc or ~/.bash_profile.
printf '\eP$f{"hook": "SourcedRcFileForWarp", "value": { "shell": "bash"}}\x9c'
# For fish subshells, add to ~/.config/fish/config.fish.
if status is-interactive
 printf '\eP$f{"hook": "SourcedRcFileForWarp", "value": { "shell": "fish"}}\x9c'
end
```
Once added, Warp will automatically "Warpify" subsequent subshell sessions for the corresponding shell on the machine with the newly updated RC file.
Under the hood, this snippet prints a Device Control String ([DCS](https://vt100.net/docs/vt510-rm/chapter4.html)) to be read by Warp, signaling that a subshell session has started and is ready to be "Warpified." In turn, Warp executes a setup script in the session that enables the full suite of Warp features like blocks, completions, and the input editor.
For this reason, it’s best to ensure the snippet is added to the end of the RC file, so Warp does not attempt to execute the setup script before the shell has finished sourcing your RC file.
To disable automatic integration, simply remove the snippet from the corresponding RC file.
If you happen to encounter issues in subshell sessions where the RC file is sourced, don’t hesitate to [file a GitHub issue](https://github.com/warpdotdev/Warp/issues/new/choose).
## 
[](#background-commands)
Background commands
Warp runs background commands to power useful features like completions, syntax highlighting, and command corrections. For example, in order to provide completions for git checkout, Warp runs a background command that lists all git branches in the current repo.
In local subshell sessions, these commands are run in forked shell processes, isolated from your interactive shell session. This is the same implementation used for any non-subshell session.
In remote sessions, however, Warp takes a different approach – while a forked shell process is running on your local machine (where the Warp app is running), your remote session might be running on a server elsewhere. In these cases, Warp takes advantage of the session’s “idle time” – when no command is currently running – to run background commands directly in the session itself. These commands are executed in a non-interactive subshell process to prevent modifications to the session state (they cannot modify an environment variable, for instance).
### 
[](#show-hide-background-blocks)
Show/hide background blocks
By default, blocks for background commands are hidden. To show background command blocks, select ‘Show background blocks’ in the ‘Blocks’ menu of the macOS menu bar.
### 
[](#disable-background-commands-in-remote-sessions)
Disable background commands in remote sessions
We understand that some developers may want to disable background commands for certain or all environments.
To disable background commands in remote subshell sessions, you can execute the following command in a top-level terminal session:
macOS
Windows
Linux
Update the settings defaults located in `dev.warp.Warp-Stable` to include the following name-value pair: `"DisableInBandCommands": "true"`.
Copy```
defaults update dev.warp.Warp-Stable DisableInBandCommands true
```
Update the settings registry located at `HKCU:\Software\Warp.dev\Warp` to include the following name-value pair: `"DisableInBandCommands": "true"`.
Copy```
Set-ItemProperty -Path "HKCU:\SOFTWARE\Warp.dev\Warp" -Name DisableInBandCommands -Value true
```
Update the settings file located at `~/.config/warp-terminal/user_preferences.json` to include the following name-value pair: `"DisableInBandCommands": "true"`.
Copy```
cd ~/.config/warp-terminal/
jq '.prefs += {"DisableInBandCommands": "true"}' user_preferences.json > tmp.json && mv tmp.json user_preferences.json
```
This will effectively disable tab completions, syntax highlighting, command corrections, and the git status prompt indicator in remote subshells.
[PreviousWarpify](/terminal/warpify)[NextSSH](/terminal/warpify/ssh)
Last updated 4 months ago
Was this helpful?