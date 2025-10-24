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
 * [Themes](/terminal/appearance/themes)
 * [Custom Themes](/terminal/appearance/custom-themes)
 * [Prompt](/terminal/appearance/prompt)
 * [Input Position](/terminal/appearance/input-position)
 * [Text, Fonts, & Cursor](/terminal/appearance/text-fonts-cursor)
 * [Size, Opacity, & Blurring](/terminal/appearance/size-opacity-blurring)
 * [Pane Dimming & Focus](/terminal/appearance/pane-dimming)
 * [Blocks Behavior](/terminal/appearance/blocks-behavior)
 * [Tabs Behavior](/terminal/appearance/tabs-behavior)
 * [App Icons](/terminal/appearance/app-icons)
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
 * [Warp prompt](#warp-prompt)
 * [Same line prompt](#same-line-prompt)
 * [Shell prompt (PS1)](#shell-prompt-ps1)
 * [How to access it](#how-to-access-it)
 * [How it works](#how-it-works)
 * [Shell Prompt Compatibility Table](#shell-prompt-compatibility-table)
 * [Known incompatibilities](#known-incompatibilities)
 * [Starship](#starship)
 * [Powerlevel10k](#powerlevel10k)
 * [Spaceship](#spaceship)
 * [Prezto](#prezto)
 * [Disabling unsupported prompts for Warp](#disabling-unsupported-prompts-for-warp)
Was this helpful?
### 
[](#warp-prompt)
Warp prompt
Warp has a native prompt that is customizable and can show a variety of information including cwd, git, svn, kubernetes, pyenv, date, time, an so on. You can visit `Settings > Appearance > Input > Classic > Current prompt > Warp Prompt` to drag and drop context chips into your Warp prompt until it displays the pieces of information you'd like to include.
#### 
[](#git-and-subversion)
Git and Subversion
Git and Subversion context chips show which branch you are on locally, as well as the number of uncommitted changed files. This includes any new files, modified files, and deleted files that are staged or unstaged.
#### 
[](#kubernetes)
Kubernetes
Kubernetes context chip shows relevant information when you're using one of the following commands:
`kubectl|helm|kubens|kubectx|oc|istioctl|kogito|k9s|helmfile|flux|fluxctl|stern|kubeseal|skaffold|kubent|kubecolor|cmctl|sparkctl|etcd|fubectl`
Warp respects the `KUBECONFIG` environmental variable, make sure you set it to your preferred configuration file location, if it's not the default path of `~/.kube/config`
### 
[](#same-line-prompt)
Same line prompt
By default, Warp's prompt displays on two lines where the command line input is one line below the prompt.
If you'd like to set your prompt such that the command line input and the prompt display together inline, you can configure this under `Settings > Appearance > Input > Classic > Current prompt > Warp Prompt` and check the box for "Same line prompt."
If you're using a [Shell prompt (PS1)](/terminal/appearance/prompt#custom-prompt), Warp will use the same line prompt settings to respect any styles or theme configurations. You may optionally configure a new line prompt with PS1 but you will need to write your configuration, according to your theme of choice.
If you want to add back the new line on your Shell prompt, please run the following based on your shell or prompt:
Copy```
# Bash
echo-e'\nPS1="${PS1}"
### 
[](#shell-prompt-ps1)
Shell prompt (PS1)
You can also set up a Shell prompt by configuring the **PS1** variable or installing a supported shell prompt plugin, see [Shell Prompt Compatibility Table](/terminal/appearance/prompt#shell-prompt-compatibility-table). Visit `Settings > Appearance > Input > Classic > Current prompt > Shell Prompt (PS1)` to enabled it.
The PS1 is a variable used by the shell to generate the prompt, it represents the primary prompt string (hence the “PS”) - which the terminal typically displays before typing new commands.
#### 
[](#multi-line-and-right-sided-prompts)
Multi-Line and Right-Sided Prompts
The Shell prompt supports multi-line or right-sided prompts in zsh and fish, not bash. However, you can't have a multiline right-side prompt, only a multiline left prompt.
## 
[](#how-to-access-it)
How to access it
 * Toggle the prompt by right-clicking on the prompt area above the input and selecting `Settings > Appearance > Input > Classic > Current prompt`. There you will be able to select and customize the Warp prompt or select the Shell prompt (PS1).
 * When using Warp prompt, you can right-click the prompt to copy the entire prompt, working directory, current git branch, git uncommitted file count, etc.
 * When using a Shell prompt, you can right-click the prompt to copy the entire prompt or select any part of the custom prompt in previously run blocks in your session.
## 
[](#how-it-works)
How it works
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FqszvkCy871DKxCMD7aPQ%252Fclassic-prompt.gif%3Falt%3Dmedia%26token%3D31ec7fc3-3f38-485f-870d-b139e0499b4b&width=768&dpr=4&quality=100&sign=5eb66b27&sv=2)
Classic input
![Warp Prompt + Custom Prompt Demo](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-8b122e4df5d9c51a70da30de03ee1d10e9ffffb5%252Fwarp-custom-prompt-demo.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=2f89ce9e&sv=2)
Warp Prompt | Shell Prompt Demo
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-462ef97281a686730bbf123d404ecf7ae1606988%252Fedit-prompt-modal%2520%281%29%2520%281%29.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=6ca3646b&sv=2)
Prompt edit modal
### 
[](#shell-prompt-compatibility-table)
Shell Prompt Compatibility Table
Shell
Tool
Does it work?
bash | zsh
[PS1](https://www.warp.dev/blog/whats-so-special-about-ps1)
Working
bash | zsh | fish | pwsh
[Starship](https://github.com/starship/starship)
[Working*](/terminal/appearance/prompt#starship)
bash | zsh | fish | pwsh
[oh-my-posh](https://github.com/JanDeDobbeleer/oh-my-posh)
Working
zsh
[Powerlevel10k](https://github.com/romkatv/powerlevel10k)
[Working*](/terminal/appearance/prompt#powerlevel10k)
zsh
[Spaceship](https://github.com/spaceship-prompt/spaceship-prompt)
[Working*](/terminal/appearance/prompt#spaceship)
zsh
[oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh)
Working
zsh
[prezto](https://github.com/sorin-ionescu/prezto)
[Working*](/terminal/appearance/prompt#prezto)
ssh
Working
bash
[oh-my-bash](https://github.com/ohmybash/oh-my-bash)
Not supported
bash
[bash-it](https://github.com/Bash-it/bash-it)
Not supported
bash
[SBP](https://github.com/brujoand/sbp)
Not supported
bash
[synth-shell-prompt](https://github.com/andresgongora/synth-shell-prompt)
Not supported
bash | zsh
[Powerline-shell](https://github.com/b-ryan/powerline-shell)
Not supported
zsh
[zplug](https://github.com/zplug/zplug)
Not supported
fish
[tide](https://github.com/IlanCosman/tide)
[Not supported](https://github.com/warpdotdev/Warp/issues/3358)
fish
[oh-my-fish](https://github.com/oh-my-fish/oh-my-fish)
[Not supported](https://github.com/warpdotdev/Warp/issues/3796)
## 
[](#known-incompatibilities)
Known incompatibilities
If you’re having issues with prompts, please see below or our [Known Issues](/support-and-billing/known-issues#configuring-and-debugging-your-rc-files) for more troubleshooting steps. Also, although some prompts are not officially supported, they may still work in Warp.
### 
[](#starship)
Starship
#### 
[](#starship-settings)
Starship Settings
Some `~/.config/starship.toml` settings are known to cause errors in Warp. `#` or `DEL` the following lines to resolve known errors:
Copy```
# Get editor completions based on the config schema
'' = 'https://starship.rs/config-schema.json'
# Disables the custom module
[custom]
disabled = false
```
For `fish` shell, optional for `bash|zsh`, disable the multi-line prompt in Starship by putting the following in your `~/.config/starship.toml`:
Copy```
[line_break]
disabled = true
```
You may also see an error relating to timeout. You can set the `command_timeout` variable in your `~/.config/starship.toml` to fix this. See more in the [starship docs](https://starship.rs/config/#prompt).
#### 
[](#starship--bash)
Starship + bash
Starship prompt may not render properly if your [default shell](/getting-started/supported-shells#changing-default-shell) is `/bin/bash`. To [workaround](https://github.com/warpdotdev/Warp/issues/3066#issuecomment-1548643121) the issue, we recommend you upgrade bash, find the path with `echo $(which bash)`, then put the path in your `Settings > Features > Session > "Startup shell for new sessions" > Custom`.
#### 
[](#starship--zsh)
Starship + zsh
If you want to restore the additional line after the Starship prompt on `zsh`, add the following to the bottom of your `~/.zshrc` file: `PROMPT="${PROMPT}"$'\n'`
### 
[](#powerlevel10k)
Powerlevel10k
When installing the Powerlevel10k (P10k) prompt, we recommend you use the [Meslo Nerd Font](https://github.com/romkatv/powerlevel10k/blob/master/font.md). P10K may display the arrow dividers as grey instead of color. The color for those chars is rendered grey due to Warp's minimum contrast setting. To [workaround](https://github.com/warpdotdev/Warp/issues/2851#issuecomment-1605005256) this issue, go to `Settings > Appearance > Text > Enforce minimum contrast` and set it to "Never".
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-3a6ac0a4154cd83d02dda41e9d1e65f21fdeb7de%252Fp10k-grey-arrow-prompt.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=e22cb657&sv=2)
Example of the grey dividers in p10k
Warp does support [p10k](https://github.com/romkatv/powerlevel10k#installation) version 1.19.0 and above. Ensure you have the latest version installed and restart Warp after the installation/update of p10k. Then enable the custom prompt as stated [above](/terminal/appearance/prompt#how-to-access-it) and it should work.
Warp still doesn't fully support some p10k features like transient prompt and visual features like gradients.
Installing Powerlevel10k
Please note the Installing Powerlevel10k video mentions enabling a custom prompt in `Settings > Features > Honor users custom prompt (PS1)`, but it's now in `Settings > Appearance > Input > Classic > Current prompt > Shell Prompt (PS1)` .
### 
[](#spaceship)
Spaceship
This prompt can cause an issue with typeahead in Warp's input editor. To [workaround](https://github.com/warpdotdev/Warp/issues/1973#issuecomment-1340150521) the issue, run `echo "SPACESHIP_PROMPT_ASYNC=FALSE" >>! ~/.zshrc`.
### 
[](#prezto)
Prezto
Although Warp does have support for prezto's prompt, enabling the [prezto utility module](https://github.com/sorin-ionescu/prezto/blob/master/modules/utility/README.md) in the `.zpreztorc` is not supported as with many other autocompletion [plugins that are incompatible](/support-and-billing/known-issues#list-of-incompatible-tools).
### 
[](#disabling-unsupported-prompts-for-warp)
Disabling unsupported prompts for Warp
We advise using Warp's default prompt or installing one of the supported tools, see [Compatibility Table](/terminal/appearance/prompt#custom-prompt-compatibility-table). You can disable unsupported prompts for Warp as such:
Copy```
if [[ $TERM_PROGRAM != "WarpTerminal" ]]; then
##### WHAT YOU WANT TO DISABLE FOR WARP - BELOW
 # Unsupported Custom Prompt Code
##### WHAT YOU WANT TO DISABLE FOR WARP - ABOVE
fi
```
#### 
[](#iterm2)
iTerm2
The iTerm2 shell integration breaks Warp and your custom prompt will not be able to be visible with this on. If you're coming from iTerm2 please check your dotfiles for it. We advise disabling the integration for Warp like so:
Copy```
if [[ $TERM_PROGRAM != "WarpTerminal" ]]; then
##### WHAT YOU WANT TO DISABLE FOR WARP - BELOW
test -e "${HOME}/.iterm2_shell_integration.zsh" && source "${HOME}/.iterm2_shell_integration.zsh"
##### WHAT YOU WANT TO DISABLE FOR WARP - ABOVE
fi
```
[PreviousCustom Themes](/terminal/appearance/custom-themes)[NextInput Position](/terminal/appearance/input-position)
Last updated 3 months ago
Was this helpful?\''\\n'\'''>>~/.bashrc
# Zsh
echo-e'\nPROMPT="${PROMPT}"
### 
[](#shell-prompt-ps1)
Shell prompt (PS1)
You can also set up a Shell prompt by configuring the **PS1** variable or installing a supported shell prompt plugin, see [Shell Prompt Compatibility Table](/terminal/appearance/prompt#shell-prompt-compatibility-table). Visit `Settings > Appearance > Input > Classic > Current prompt > Shell Prompt (PS1)` to enabled it.
The PS1 is a variable used by the shell to generate the prompt, it represents the primary prompt string (hence the “PS”) - which the terminal typically displays before typing new commands.
#### 
[](#multi-line-and-right-sided-prompts)
Multi-Line and Right-Sided Prompts
The Shell prompt supports multi-line or right-sided prompts in zsh and fish, not bash. However, you can't have a multiline right-side prompt, only a multiline left prompt.
## 
[](#how-to-access-it)
How to access it
 * Toggle the prompt by right-clicking on the prompt area above the input and selecting `Settings > Appearance > Input > Classic > Current prompt`. There you will be able to select and customize the Warp prompt or select the Shell prompt (PS1).
 * When using Warp prompt, you can right-click the prompt to copy the entire prompt, working directory, current git branch, git uncommitted file count, etc.
 * When using a Shell prompt, you can right-click the prompt to copy the entire prompt or select any part of the custom prompt in previously run blocks in your session.
## 
[](#how-it-works)
How it works
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FqszvkCy871DKxCMD7aPQ%252Fclassic-prompt.gif%3Falt%3Dmedia%26token%3D31ec7fc3-3f38-485f-870d-b139e0499b4b&width=768&dpr=4&quality=100&sign=5eb66b27&sv=2)
Classic input
![Warp Prompt + Custom Prompt Demo](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-8b122e4df5d9c51a70da30de03ee1d10e9ffffb5%252Fwarp-custom-prompt-demo.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=2f89ce9e&sv=2)
Warp Prompt | Shell Prompt Demo
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-462ef97281a686730bbf123d404ecf7ae1606988%252Fedit-prompt-modal%2520%281%29%2520%281%29.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=6ca3646b&sv=2)
Prompt edit modal
### 
[](#shell-prompt-compatibility-table)
Shell Prompt Compatibility Table
Shell
Tool
Does it work?
bash | zsh
[PS1](https://www.warp.dev/blog/whats-so-special-about-ps1)
Working
bash | zsh | fish | pwsh
[Starship](https://github.com/starship/starship)
[Working*](/terminal/appearance/prompt#starship)
bash | zsh | fish | pwsh
[oh-my-posh](https://github.com/JanDeDobbeleer/oh-my-posh)
Working
zsh
[Powerlevel10k](https://github.com/romkatv/powerlevel10k)
[Working*](/terminal/appearance/prompt#powerlevel10k)
zsh
[Spaceship](https://github.com/spaceship-prompt/spaceship-prompt)
[Working*](/terminal/appearance/prompt#spaceship)
zsh
[oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh)
Working
zsh
[prezto](https://github.com/sorin-ionescu/prezto)
[Working*](/terminal/appearance/prompt#prezto)
ssh
Working
bash
[oh-my-bash](https://github.com/ohmybash/oh-my-bash)
Not supported
bash
[bash-it](https://github.com/Bash-it/bash-it)
Not supported
bash
[SBP](https://github.com/brujoand/sbp)
Not supported
bash
[synth-shell-prompt](https://github.com/andresgongora/synth-shell-prompt)
Not supported
bash | zsh
[Powerline-shell](https://github.com/b-ryan/powerline-shell)
Not supported
zsh
[zplug](https://github.com/zplug/zplug)
Not supported
fish
[tide](https://github.com/IlanCosman/tide)
[Not supported](https://github.com/warpdotdev/Warp/issues/3358)
fish
[oh-my-fish](https://github.com/oh-my-fish/oh-my-fish)
[Not supported](https://github.com/warpdotdev/Warp/issues/3796)
## 
[](#known-incompatibilities)
Known incompatibilities
If you’re having issues with prompts, please see below or our [Known Issues](/support-and-billing/known-issues#configuring-and-debugging-your-rc-files) for more troubleshooting steps. Also, although some prompts are not officially supported, they may still work in Warp.
### 
[](#starship)
Starship
#### 
[](#starship-settings)
Starship Settings
Some `~/.config/starship.toml` settings are known to cause errors in Warp. `#` or `DEL` the following lines to resolve known errors:
Copy__CODE_BLOCK_1__
For `fish` shell, optional for `bash|zsh`, disable the multi-line prompt in Starship by putting the following in your `~/.config/starship.toml`:
Copy__CODE_BLOCK_2__
You may also see an error relating to timeout. You can set the `command_timeout` variable in your `~/.config/starship.toml` to fix this. See more in the [starship docs](https://starship.rs/config/#prompt).
#### 
[](#starship--bash)
Starship + bash
Starship prompt may not render properly if your [default shell](/getting-started/supported-shells#changing-default-shell) is `/bin/bash`. To [workaround](https://github.com/warpdotdev/Warp/issues/3066#issuecomment-1548643121) the issue, we recommend you upgrade bash, find the path with `echo $(which bash)`, then put the path in your `Settings > Features > Session > "Startup shell for new sessions" > Custom`.
#### 
[](#starship--zsh)
Starship + zsh
If you want to restore the additional line after the Starship prompt on `zsh`, add the following to the bottom of your `~/.zshrc` file: `PROMPT="${PROMPT}"$'\n'`
### 
[](#powerlevel10k)
Powerlevel10k
When installing the Powerlevel10k (P10k) prompt, we recommend you use the [Meslo Nerd Font](https://github.com/romkatv/powerlevel10k/blob/master/font.md). P10K may display the arrow dividers as grey instead of color. The color for those chars is rendered grey due to Warp's minimum contrast setting. To [workaround](https://github.com/warpdotdev/Warp/issues/2851#issuecomment-1605005256) this issue, go to `Settings > Appearance > Text > Enforce minimum contrast` and set it to "Never".
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-3a6ac0a4154cd83d02dda41e9d1e65f21fdeb7de%252Fp10k-grey-arrow-prompt.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=e22cb657&sv=2)
Example of the grey dividers in p10k
Warp does support [p10k](https://github.com/romkatv/powerlevel10k#installation) version 1.19.0 and above. Ensure you have the latest version installed and restart Warp after the installation/update of p10k. Then enable the custom prompt as stated [above](/terminal/appearance/prompt#how-to-access-it) and it should work.
Warp still doesn't fully support some p10k features like transient prompt and visual features like gradients.
Installing Powerlevel10k
Please note the Installing Powerlevel10k video mentions enabling a custom prompt in `Settings > Features > Honor users custom prompt (PS1)`, but it's now in `Settings > Appearance > Input > Classic > Current prompt > Shell Prompt (PS1)` .
### 
[](#spaceship)
Spaceship
This prompt can cause an issue with typeahead in Warp's input editor. To [workaround](https://github.com/warpdotdev/Warp/issues/1973#issuecomment-1340150521) the issue, run `echo "SPACESHIP_PROMPT_ASYNC=FALSE" >>! ~/.zshrc`.
### 
[](#prezto)
Prezto
Although Warp does have support for prezto's prompt, enabling the [prezto utility module](https://github.com/sorin-ionescu/prezto/blob/master/modules/utility/README.md) in the `.zpreztorc` is not supported as with many other autocompletion [plugins that are incompatible](/support-and-billing/known-issues#list-of-incompatible-tools).
### 
[](#disabling-unsupported-prompts-for-warp)
Disabling unsupported prompts for Warp
We advise using Warp's default prompt or installing one of the supported tools, see [Compatibility Table](/terminal/appearance/prompt#custom-prompt-compatibility-table). You can disable unsupported prompts for Warp as such:
Copy__CODE_BLOCK_3__
#### 
[](#iterm2)
iTerm2
The iTerm2 shell integration breaks Warp and your custom prompt will not be able to be visible with this on. If you're coming from iTerm2 please check your dotfiles for it. We advise disabling the integration for Warp like so:
Copy__CODE_BLOCK_4__
[PreviousCustom Themes](/terminal/appearance/custom-themes)[NextInput Position](/terminal/appearance/input-position)
Last updated 3 months ago
Was this helpful?\''\\n'\'''>>~/.zshrc
# Fish
echo-e'\nfunctions --copy fish_prompt fish_prompt_orig; function fish_prompt; fish_prompt_orig; echo; end'>>~/.config/fish/config.fish
# Powershell
$rawString = @'
$originalPrompt = Get-Item Function:\prompt
Set-Item -Path Function:\prompt_original -Value $originalPrompt
function prompt {
 "$(& prompt_original)`n"
}
'@
Add-Content-Path $PROFILE -Value"`n$rawString`n"
# Powerlevel10k
p10kconfigure
# Starship Prompt
echo'[line_break]\ndisabled = false'>>~/.config/starship.toml
```
### 
[](#shell-prompt-ps1)
Shell prompt (PS1)
You can also set up a Shell prompt by configuring the **PS1** variable or installing a supported shell prompt plugin, see [Shell Prompt Compatibility Table](/terminal/appearance/prompt#shell-prompt-compatibility-table). Visit `Settings > Appearance > Input > Classic > Current prompt > Shell Prompt (PS1)` to enabled it.
The PS1 is a variable used by the shell to generate the prompt, it represents the primary prompt string (hence the “PS”) - which the terminal typically displays before typing new commands.
#### 
[](#multi-line-and-right-sided-prompts)
Multi-Line and Right-Sided Prompts
The Shell prompt supports multi-line or right-sided prompts in zsh and fish, not bash. However, you can't have a multiline right-side prompt, only a multiline left prompt.
## 
[](#how-to-access-it)
How to access it
 * Toggle the prompt by right-clicking on the prompt area above the input and selecting `Settings > Appearance > Input > Classic > Current prompt`. There you will be able to select and customize the Warp prompt or select the Shell prompt (PS1).
 * When using Warp prompt, you can right-click the prompt to copy the entire prompt, working directory, current git branch, git uncommitted file count, etc.
 * When using a Shell prompt, you can right-click the prompt to copy the entire prompt or select any part of the custom prompt in previously run blocks in your session.
## 
[](#how-it-works)
How it works
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FqszvkCy871DKxCMD7aPQ%252Fclassic-prompt.gif%3Falt%3Dmedia%26token%3D31ec7fc3-3f38-485f-870d-b139e0499b4b&width=768&dpr=4&quality=100&sign=5eb66b27&sv=2)
Classic input
![Warp Prompt + Custom Prompt Demo](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-8b122e4df5d9c51a70da30de03ee1d10e9ffffb5%252Fwarp-custom-prompt-demo.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=2f89ce9e&sv=2)
Warp Prompt | Shell Prompt Demo
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-462ef97281a686730bbf123d404ecf7ae1606988%252Fedit-prompt-modal%2520%281%29%2520%281%29.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=6ca3646b&sv=2)
Prompt edit modal
### 
[](#shell-prompt-compatibility-table)
Shell Prompt Compatibility Table
Shell
Tool
Does it work?
bash | zsh
[PS1](https://www.warp.dev/blog/whats-so-special-about-ps1)
Working
bash | zsh | fish | pwsh
[Starship](https://github.com/starship/starship)
[Working*](/terminal/appearance/prompt#starship)
bash | zsh | fish | pwsh
[oh-my-posh](https://github.com/JanDeDobbeleer/oh-my-posh)
Working
zsh
[Powerlevel10k](https://github.com/romkatv/powerlevel10k)
[Working*](/terminal/appearance/prompt#powerlevel10k)
zsh
[Spaceship](https://github.com/spaceship-prompt/spaceship-prompt)
[Working*](/terminal/appearance/prompt#spaceship)
zsh
[oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh)
Working
zsh
[prezto](https://github.com/sorin-ionescu/prezto)
[Working*](/terminal/appearance/prompt#prezto)
ssh
Working
bash
[oh-my-bash](https://github.com/ohmybash/oh-my-bash)
Not supported
bash
[bash-it](https://github.com/Bash-it/bash-it)
Not supported
bash
[SBP](https://github.com/brujoand/sbp)
Not supported
bash
[synth-shell-prompt](https://github.com/andresgongora/synth-shell-prompt)
Not supported
bash | zsh
[Powerline-shell](https://github.com/b-ryan/powerline-shell)
Not supported
zsh
[zplug](https://github.com/zplug/zplug)
Not supported
fish
[tide](https://github.com/IlanCosman/tide)
[Not supported](https://github.com/warpdotdev/Warp/issues/3358)
fish
[oh-my-fish](https://github.com/oh-my-fish/oh-my-fish)
[Not supported](https://github.com/warpdotdev/Warp/issues/3796)
## 
[](#known-incompatibilities)
Known incompatibilities
If you’re having issues with prompts, please see below or our [Known Issues](/support-and-billing/known-issues#configuring-and-debugging-your-rc-files) for more troubleshooting steps. Also, although some prompts are not officially supported, they may still work in Warp.
### 
[](#starship)
Starship
#### 
[](#starship-settings)
Starship Settings
Some `~/.config/starship.toml` settings are known to cause errors in Warp. `#` or `DEL` the following lines to resolve known errors:
Copy__CODE_BLOCK_1__
For `fish` shell, optional for `bash|zsh`, disable the multi-line prompt in Starship by putting the following in your `~/.config/starship.toml`:
Copy__CODE_BLOCK_2__
You may also see an error relating to timeout. You can set the `command_timeout` variable in your `~/.config/starship.toml` to fix this. See more in the [starship docs](https://starship.rs/config/#prompt).
#### 
[](#starship--bash)
Starship + bash
Starship prompt may not render properly if your [default shell](/getting-started/supported-shells#changing-default-shell) is `/bin/bash`. To [workaround](https://github.com/warpdotdev/Warp/issues/3066#issuecomment-1548643121) the issue, we recommend you upgrade bash, find the path with `echo $(which bash)`, then put the path in your `Settings > Features > Session > "Startup shell for new sessions" > Custom`.
#### 
[](#starship--zsh)
Starship + zsh
If you want to restore the additional line after the Starship prompt on `zsh`, add the following to the bottom of your `~/.zshrc` file: `PROMPT="${PROMPT}"$'\n'`
### 
[](#powerlevel10k)
Powerlevel10k
When installing the Powerlevel10k (P10k) prompt, we recommend you use the [Meslo Nerd Font](https://github.com/romkatv/powerlevel10k/blob/master/font.md). P10K may display the arrow dividers as grey instead of color. The color for those chars is rendered grey due to Warp's minimum contrast setting. To [workaround](https://github.com/warpdotdev/Warp/issues/2851#issuecomment-1605005256) this issue, go to `Settings > Appearance > Text > Enforce minimum contrast` and set it to "Never".
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-3a6ac0a4154cd83d02dda41e9d1e65f21fdeb7de%252Fp10k-grey-arrow-prompt.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=e22cb657&sv=2)
Example of the grey dividers in p10k
Warp does support [p10k](https://github.com/romkatv/powerlevel10k#installation) version 1.19.0 and above. Ensure you have the latest version installed and restart Warp after the installation/update of p10k. Then enable the custom prompt as stated [above](/terminal/appearance/prompt#how-to-access-it) and it should work.
Warp still doesn't fully support some p10k features like transient prompt and visual features like gradients.
Installing Powerlevel10k
Please note the Installing Powerlevel10k video mentions enabling a custom prompt in `Settings > Features > Honor users custom prompt (PS1)`, but it's now in `Settings > Appearance > Input > Classic > Current prompt > Shell Prompt (PS1)` .
### 
[](#spaceship)
Spaceship
This prompt can cause an issue with typeahead in Warp's input editor. To [workaround](https://github.com/warpdotdev/Warp/issues/1973#issuecomment-1340150521) the issue, run `echo "SPACESHIP_PROMPT_ASYNC=FALSE" >>! ~/.zshrc`.
### 
[](#prezto)
Prezto
Although Warp does have support for prezto's prompt, enabling the [prezto utility module](https://github.com/sorin-ionescu/prezto/blob/master/modules/utility/README.md) in the `.zpreztorc` is not supported as with many other autocompletion [plugins that are incompatible](/support-and-billing/known-issues#list-of-incompatible-tools).
### 
[](#disabling-unsupported-prompts-for-warp)
Disabling unsupported prompts for Warp
We advise using Warp's default prompt or installing one of the supported tools, see [Compatibility Table](/terminal/appearance/prompt#custom-prompt-compatibility-table). You can disable unsupported prompts for Warp as such:
Copy__CODE_BLOCK_3__
#### 
[](#iterm2)
iTerm2
The iTerm2 shell integration breaks Warp and your custom prompt will not be able to be visible with this on. If you're coming from iTerm2 please check your dotfiles for it. We advise disabling the integration for Warp like so:
Copy__CODE_BLOCK_4__
[PreviousCustom Themes](/terminal/appearance/custom-themes)[NextInput Position](/terminal/appearance/input-position)
Last updated 3 months ago
Was this helpful?