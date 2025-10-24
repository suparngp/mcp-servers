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
 * [FAQs](#faqs)
 * [Do I have to manually Warpify every time?](#do-i-have-to-manually-warpify-every-time)
Was this helpful?
This page is dedicated to the SSH features powered by `tmux`.
If you are looking to troubleshoot the legacy SSH implementation, see the [SSH (Legacy)](/terminal/warpify/ssh-legacy).
Warpifying your SSH session gives you all the features of Warp while connected to a remote machine: the input editor, auto-completions, history search, and more. We achieve this by running commands like `ls` on the remote machine on your behalf.
**Warpifying a remote SSH Session** [**will never make lasting changes to the remote machine without your explicit consent**](/terminal/warpify/ssh#will-warpifying-a-remote-ssh-session-make-changes-to-the-remote-machine)**.**
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-d750cd2460fe3cc59aef6a301b61fdccc4970088%252Fwarpify_ssh_prompt.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=c7f0bfcc&sv=2)
SSH
## 
[](#faqs)
FAQs
#### 
[](#will-warpifying-a-remote-ssh-session-make-changes-to-the-remote-machine)
Will Warpifying a remote SSH session make changes to the remote machine?
Only to install [`tmux`](/terminal/warpify/ssh#why-do-i-need-tmux-on-the-remote-machine) (a popular open source terminal multiplexer) and only with your explicit permission. If `tmux` is not installed, Warp will offer to install it for you and will show you the list of commands that will be run. You can always decline and continue to use your ssh session without some of Warp's features (or install `tmux` yourself and re-run Warpification [via the command palette](/terminal/warpify/ssh#what-if-warp-fails-to-detect-my-ssh-session)).
#### 
[](#why-do-i-need-tmux-on-the-remote-machine)
Why do I need `tmux` on the remote machine?
`tmux` is used to asynchronously run commands on the remote machine without disrupting your interactive session. [tmux](https://github.com/tmux/tmux/wiki) is a popular open source terminal multiplexer, which lets you run multiple sessions within one ssh connection. It requires minimal permissions and is widely adopted (⭐ 35k+ on GitHub). Warpifying a remote SSH session uses [tmux Control Mode](https://github.com/tmux/tmux/wiki/Control-Mode) to run adhoc background tasks (like those required to autocomplete a `cd` command, or populate the contents of a custom prompt).
#### 
[](#can-i-ssh-to-remote-machines-that-i-dont-want-to-warpify)
Can I ssh to remote machines that I don't want to Warpify?
Yes! You can always cancel Warpification and continue to use SSH, just without some of Warp's additional features. You can also explicitly add hosts to the Denylist to ensure you’re never asked to Warpify that host again.
### 
[](#do-i-have-to-manually-warpify-every-time)
Do I have to manually Warpify every time?
After you successfully Warpify an SSH connection manually, we provide a brief script you can run to append a message at the end of your shell's rcfile. This allows us to know when your shell is ready to be Warpified, and be found at the bottom of your rcfile for the best results.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-b2a6821c94e4894c2e0313ccc5b328897106949d%252Fwarpify_ssh_auto_script.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=71a717de&sv=2)
Setting up Auto-Warpify
#### 
[](#what-shells-and-operating-systems-are-supported)
What shells and operating systems are supported?
At the time of writing, we support macOS and most flavors of Linux as remote hosts. Supported shells are `bash` and `zsh`.
#### 
[](#what-if-warp-fails-to-detect-my-ssh-session)
What if Warp fails to detect my SSH session?
If you are ever in a remote SSH Session and would like to manually Warpify, you can do so by using the [Command Palette](/terminal/command-palette) and searching for "Warpify SSH Session".
#### 
[](#what-triggers-ssh-session-detection-for-warpification)
What triggers SSH Session Detection for Warpification?
If SSH Session Detection is enabled, Warp will detect when you run an `ssh` command with arguments that suggest it's starting an interactive session. If you've aliased `ssh` or are running it as part of a script, we will not perform SSH Session Detection.
Once we have confidence you have successfully authenticated (by detecting `Last login:` or something resembling a basic prompt) we will prompt you to Warpify your active SSH session.
If SSH Session Detection does not detect your session, you can still [Warpify manually](/terminal/warpify/ssh#what-if-warp-fails-to-detect-my-ssh-session).
[PreviousSubshells](/terminal/warpify/subshells)[NextSSH Legacy](/terminal/warpify/ssh-legacy)
Last updated 1 month ago
Was this helpful?