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
 * [Implementation](#implementation)
 * [Troubleshooting SSH](#troubleshooting-ssh)
 * [channel 2: open failed: connect failed: open failed](#channel-2-open-failed-connect-failed-open-failed)
 * [SSH Wrapper fails](#ssh-wrapper-fails)
Was this helpful?
If you are looking to troubleshoot the TMUX SSH feature, see the [SSH](/terminal/warpify/ssh).
When you SSH into a remote box, you get all the features of Warp without any configuration on your part. The input editor, auto-completions, and history search work the same, regardless of machine.
[Limitations of SSH](https://github.com/warpdotdev/Warp/issues/578) (as of May 2024):
 * The SSH Wrapper only supports `bash`or `zsh` shells in remote sessions.
 * If you're using a different shell, you'll want to use `command ssh` directly (see below for more details).
 * For zsh, xxd is required to bootstrap warp.
 * For Windows, [Cygwin](https://www.cygwin.com/) is required to bootstrap the SSH Wrapper.
 * RemoteCommand causes the ssh wrapper to fail.
 * [Tmux is not currently supported.](https://github.com/warpdotdev/Warp/discussions/501)
If you're using zsh on the remote host, Warp creates a temp folder to act as the ZDOTDIR during the bootstrapping process and removes it when the shell is set up.
![SSH](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-d1dfbe0032fc3388c17b2ecb4eaff36a7a2b5d6c%252F6_ssh%2520%281%29.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=1d29717b&sv=2)
SSH
## 
[](#implementation)
Implementation
We create a wrapper (around `/usr/bin/ssh`) to set up the shell for Warp's feature set. We authenticate normally using `/usr/bin/ssh`, and bootstrap the remote shell to work with Warp Blocks and the Input Editor. You can opt out of this functionality by invoking `command ssh` directly.
 * Warp takes over the prompt which enables us to build a modern input editor.
 * Warp configures histcontrol to ignore commands with leading spaces. We do this so our bootstrapping code does not clutter the history.
You can see the SSH wrapper by using `which warp_ssh_helper` in zsh, `type warp_ssh_helper` in bash.
_Note:_ The ssh wrapper is only _initialized_ on your local machine. We don’t currently support bootstrapping nested ssh sessions.
Warp [Completions](/terminal/command-completions/completions) for ssh show entries in `~/.ssh/config` and `~/.ssh/known_hosts`
## 
[](#troubleshooting-ssh)
Troubleshooting SSH
### 
[](#channel-2-open-failed-connect-failed-open-failed)
channel 2: open failed: connect failed: open failed
If you're seeing these errors, you may have some config on your server (usually in `/etc/ssh/sshd_config`) preventing Warp's ControlMaster connection from working. In this state, completions that require information from your remote host won't work and your history also won't work.
You should ensure that `MaxSessions` is either commented out or is at least `2`.
Write access in `/etc/ssh/` typically requires sudo access. After any edits, you'd also need to restart the `sshd` daemon.
### 
[](#ssh-wrapper-fails)
SSH Wrapper fails
There are several [known issues with SSH Wrapper](https://github.com/warpdotdev/Warp/issues?q=is%3Aissue+is%3Aopen+sort%3Acreated-desc+label%3ABugs+label%3ASSH). As a workaround to the SSH Wrapper, you can add `command ssh` to your `Settings > Subshells > Added commands`, then run `command ssh <user@server>` to connect to a remote session, this will attempt to enable Warp features as a [subshell](/terminal/warpify/subshells).
If the subshell workaround helps, we recommend you disable the SSH Wrapper in `Settings > Features.`You'll need to start a new session before a change is reflected or try invoking the SSH binary directly with `command ssh`.
![Command SSH subshell workaround](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-5cfba89554e738ad331b86151eae6b7bb819e306%252Fsubshell-ssh-demo.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=ebf1db60&sv=2)
Warpify SSH Demo
[PreviousSSH](/terminal/warpify/ssh)[NextMore Features](/terminal/more-features)
Last updated 1 month ago
Was this helpful?