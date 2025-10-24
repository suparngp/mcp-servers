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
 * [General](#general)
 * [SSH](#ssh)
 * [Online features don't work](#online-features-dont-work)
 * [English-only UI](#english-only-ui)
 * [Abnormal rendering of Chinese characters](#abnormal-rendering-of-chinese-characters)
 * [Warp fails to render a window](#warp-fails-to-render-a-window)
 * [Misc.](#misc)
 * [Agent Mode](#agent-mode)
 * [Shells](#shells)
 * [fish shell read command](#fish-shell-read-command)
 * [Warp shell loads slowly due to EDR](#warp-shell-loads-slowly-due-to-edr)
 * [Configuring and debugging your RC files](#configuring-and-debugging-your-rc-files)
 * [Operating systems](#operating-systems)
Was this helpful?
To see a complete list of Warp issues and feature requests, please visit our [GitHub issues page](https://github.com/warpdotdev/Warp/issues?q=is%3Aissue+is%3Aopen+sort%3Acreated-desc). 
Please note that there are tools that are incompatible with Warp, as listed [below](/support-and-billing/known-issues#list-of-incompatible-tools). You can find debugging information in this [section](/support-and-billing/known-issues#debugging).
## 
[](#general)
General
### 
[](#ssh)
SSH
To enable Blocks over SSH, Warp uses an SSH Wrapper function; navigate to settings > features if you need to disable it. Please see [Troubleshooting Legacy SSH](/terminal/warpify/ssh-legacy#troubleshooting-ssh) for more info on workarounds to SSH issues, or see the [new SSH Page](/terminal/warpify/ssh) for more on the upcoming features.
### 
[](#online-features-dont-work)
Online features don't work
There is a known issue that can occur that causes online features to break ([Warp AI](/agents/agents-overview), [Generate](/agents/generate), [Block Sharing](/terminal/blocks/block-sharing), [Refer a Friend](/community/refer-a-friend) ). This is due to the login token going stale, typically due to a password change, and can be resolved by the following steps:
macOS
Windows
Linux
 1. Remove Warp user login with the following command:
Copy```
sudosecuritydelete-generic-password-l"dev.warp.Warp-Stable" $HOME/Library/Keychains/login.keychain
```
 1. [Login to Warp](/#logging-into-warp)
 1. Remove any user files with the following command:
Copy```
Remove-Item $env:LOCALAPPDATA\warp\Warp\data\*-User
```
 1. [Login to Warp](/#logging-into-warp)
 1. Remove Warp user login with your keychain manager (gnome-keyring, kwallet, etc.). Search for `dev.warp.Warp` and delete the `User` password/secret.
 2. Remove any user files with the following command:
Copy```
rm-f ${XDG_STATE_HOME:-$HOME/.local/state}/warp-terminal/*-User
```
 1. [Login to Warp](/#logging-into-warp)
### 
[](#english-only-ui)
English-only UI
Nov 2021: We have added character support for Chinese, Korean, and Japanese, but our UI currently only supports English.
### 
[](#abnormal-rendering-of-chinese-characters)
Abnormal rendering of Chinese characters
If you notice issues with the terminal rendering Chinese characters (i.e. [#3366](https://github.com/warpdotdev/Warp/issues/3366)). Please try adding the following lines to your rc file.
Copy```
export LC_ALL=zh_CN.UTF-8
export LANG=zh_CN.UTF-8
```
### 
[](#warp-fails-to-render-a-window)
Warp fails to render a window
This can likely occur due to some corruption in the local sqlite db. You may see a similar error your [logs](/support-and-billing/sending-us-feedback#gathering-warp-logs):
Copy```
[WARN] SQLite error 283 (A WAL mode database file was recovered): recovered 383 frames from WAL file /home/xxxxx/.local/state/warp-terminal/warp.sqlite-wal
```
To try and resolve the issue of Warp not rendering a window, [delete the Session Restoration SQLite database files](/terminal/sessions/session-restoration#session-restoration-database).
### 
[](#misc)
Misc.
 * When you [SSH](/support-and-billing/known-issues#ssh), we start a bash shell on the remote host. We built a wrapper around SSH to make Warp features possible.
 * If your default shell is zsh, your aliases typically do not transfer over. Other shells are unsupported for now.
 * When you open a [non-shell-based subshell (REPL)](https://github.com/warpdotdev/Warp/issues/4082), Warp does not modify the environment — it behaves like a standard terminal session.
 * Warp may become unresponsive if it doesn't have permission to access the folders.
 * [No touch input support](https://github.com/warpdotdev/Warp/issues/5347)
## 
[](#agent-mode)
Agent Mode
 * Note that Agent Mode blocks are not shareable during [session sharing](/knowledge-and-collaboration/session-sharing). Participants will be able to share regular shell commands that are run, but will not be able to share AI interactions (requested commands, AI blocks, etc.).
 * Block actions such as [Block Sharing](/terminal/blocks/block-sharing) are not available on Agent Mode AI blocks.
 * Agents do not have up-to-date information on several commands’ completion specs
 * Agent Mode works better with Warp's default prompt settings, where the prompt starts on a new line, than it does with a same-line prompt. If you are using the same-line prompt, the cursor will jump from the end of the single line to the start of the input box when you switch to Agent Mode.
## 
[](#shells)
Shells
### 
[](#fish-shell-read-command)
fish shell `read` command
There is an issue in fish shell version 3.6 and below that causes the `read` built-in command to break Warp's integration with fish. This means that using `read` directly or any fish scripts that call `read` will not work as expected in Warp. That issue is resolved in the fish repository and so should be fixed in the next release of fish itself. We recommend upgrading fish to the most recent version to resolve this issue.
### 
[](#warp-shell-loads-slowly-due-to-edr)
Warp shell loads slowly due to EDR
If you comment out the rc files (i.e. `~/.zshrc`, `~/.bashrc`, `~/.config/fish/config.fish`), and still notice a slowdown on loading the shell. It could be due to an Endpoint Detection and Response or EDR (i.e. Sentinel One, CrowdStrike, Carbon Black) causing the issue. Please restart your system and see if the issue persists. If so, please [Send us Feedback](/support-and-billing/sending-us-feedback) and provide details of your EDR, OS, shell, etc.
### 
[](#configuring-and-debugging-your-rc-files)
Configuring and debugging your RC files
To support Blocks ([custom hooks](https://blog.warp.dev/how-warp-works/#implementing-blocks)), a native Input Editor experience, AI blocks, etc. we have built custom support for a subset of shell functionality (decouple functionality from the shell and move to the terminal). This leads to Warp being incompatible with various tools and plugins. Please see the [list of incompatible](/support-and-billing/known-issues#list-of-incompatible-tools) tools to find the tools that are known not to work with Warp. 
Unlike typical terminals which are essentially continuous character grids, each section of Warp is its own (separate) UI element. Please see our [Prompt](/terminal/appearance/prompt) page for more information on custom prompts. 
#### 
[](#debugging)
Debugging
If Warp is not working with your dotfile configuration, you can run your shell in Warp with a clean configuration using examples below:
bash
zsh
fish
pwsh
You can set up clean configs for Bash (Bourne Again SHell) by moving or commenting out your `.bashrc` If Warp starts working correctly then Warp is incompatible with something in the current dotfiles. We can isolate what is incompatible by iteratively disabling sections of our dotfiles with the `WarpTerminal` flag until we find the culprit. See the list of incompatible tools below and comment them out just for Warp with the following conditionals:
Copy```
# bash (See ~/.bashrc)
if [[ $TERM_PROGRAM != "WarpTerminal" ]]; then
##### WHAT YOU WANT TO DISABLE FOR WARP - BELOW
 # Unsupported plugin/prompt code here, i.e.
##### WHAT YOU WANT TO DISABLE FOR WARP - ABOVE
fi
```
You can set up clean configs for Zsh (Z SHell) by moving or commenting out your `.zshrc` If Warp starts working correctly then Warp is incompatible with something in the current dotfiles. We can isolate what is incompatible by iteratively disabling sections of our dotfiles with the `WarpTerminal` flag until we find the culprit. See the list of incompatible tools below and comment them out just for Warp with the following conditional:
Copy```
# zsh (See ~/.zshrc)
if [[ $TERM_PROGRAM != "WarpTerminal" ]]; then
##### WHAT YOU WANT TO DISABLE FOR WARP - BELOW
 # Unsupported plugin/prompt code here
##### WHAT YOU WANT TO DISABLE FOR WARP - ABOVE
fi
```
You can set up clean configs for Fish (Friendly Interactive SHell) by moving or commenting out your `config.fish` If Warp starts working correctly then Warp is incompatible with something in the current config file. We can isolate what is incompatible by iteratively disabling sections of our config file with the `WarpTerminal` flag until we find the culprit. See the list of incompatible tools below and comment them out just for Warp with the following conditional:
Copy```
# fish (see ~/.config/fish/config.fish)
if test "$TERM_PROGRAM" != "WarpTerminal"
 ##### WHAT YOU WANT TO DISABLE FOR WARP - BELOW
 # Unsupported plugin/prompt code here
 ##### WHAT YOU WANT TO DISABLE FOR WARP - ABOVE
end
```
You can set up clean configs for pwsh (PowerShell) by moving or commenting out your `$PROFILE`
If Warp starts working correctly then Warp is incompatible with something in the current profile. We can isolate what is incompatible by iteratively disabling sections of our profile with the WarpTerminal flag until we find the culprit. See the list of incompatible tools below and comment them out just for Warp with the following conditional:
Copy```
# pwsh (see $PROFILE)
if ($env:TERM_PROGRAM -ne "WarpTerminal") {
 ##### WHAT YOU WANT TO DISABLE FOR WARP - BELOW
 # Unsupported plugin/prompt code here
 ##### WHAT YOU WANT TO DISABLE FOR WARP - ABOVE
}
```
#### 
[](#list-of-incompatible-tools)
List of incompatible tools
The following non exhaustive list of plugins, prompts, or tools can cause potential issues in Warp:
 * oh-my-fish, oh-my-bash, or other unsupported shell prompts. See our [Custom Prompt Compatibility Table](/terminal/appearance/prompt#custom-prompt-compatibility-table).
 * [iterm shell integration](https://iterm2.com/documentation-shell-integration.html)
 * `test -e "${HOME}/.iterm2_shell_integration.zsh" && source "${HOME}/.iterm2_shell_integration.zsh" || true`
 * [Termium](https://codeium.com/blog/termium-codeium-in-terminal-launch)
 * `eval "$(termium shell-hook show pre)"`
 * `eval "$(termium shell-hook show post)"`
 * [thefuck experimental instant mode](https://github.com/nvbn/thefuck?tab=readme-ov-file#experimental-instant-mode)
 * `eval $(thefuck --alias --enable-experimental-instant-mode)`
 * [fubectl](https://github.com/kubermatic/fubectl)
 * `[ -f ${HOME}/bin/fubectl.source ] && source ${HOME}/bin/fubectl.source`
 * [BIND keys](https://github.com/warpdotdev/Warp/issues/537)
 * `bindkey '^j' down-line-or-beginning-search`, which causes users to have to hit ENTER twice to run a command.
 * `bindkey 'tab' autosuggest-accept`, which causes incorrect behavior with autocompletion.
 * `z`, `compdef`, `compinit`, [prezto utility module](https://github.com/sorin-ionescu/prezto/blob/master/modules/utility/README.md), [bash-it](https://github.com/Bash-it/bash-it), CodeWhisperer or other [shell-based completion](https://github.com/warpdotdev/Warp/discussions/434) plugins.
 * OH-MY-ZSH Themes
 * e.g. avit, spaceship, maybe more ...
 * OH-MY-ZSH Plugins
 * e.g. zsh-autosuggestions, zsh-autocomplete, maybe more ...
 * Oh-My-Tmux
 * zsh4h (ZSH for Humans)
 * znap
 * FZF
 * `[[ -r "/usr/local/etc/profile.d/bash_completion.sh" ]] && "/usr/local/etc/profile.d/bash_completion.sh"`
 * `eval "$(rbenv init -)"`
 * `grml-zsh-config`
 * Python virtual environment PS1 [settings](https://github.com/warpdotdev/Warp/issues/2713#issuecomment-1447129449)
 * [Starship settings](/terminal/appearance/prompt#starship-settings)
 * `zle-line-init`
 * Potentially more — this is an non exhaustive list. If you find an incompatible tool, please email us at [[email protected]](/cdn-cgi/l/email-protection#7d1b1818191f1c1e163d0a1c0f0d5319180b)
## 
[](#operating-systems)
Operating systems
macOS
Windows
Linux
### 
[](#ssh-to-local-network-device-is-denied-on-macos)
SSH to local network device is denied on macOS
On macOS, you may be [denied permission to SSH](https://github.com/warpdotdev/Warp/issues/5550) from Warp into other devices in your local network and see an error like: `ssh: connect to host <host_name> port 22: Undefined error: 0`. To resolve this issue, go to `Mac > System Settings > Privacy & Security > Local Network`, and add Warp.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FW0BXTGpugzShTEoHALpv%252Fimage.png%3Falt%3Dmedia%26token%3Dc6c7eb5e-e02b-4ba8-9f5f-b6da308b2bce&width=768&dpr=4&quality=100&sign=b03b270c&sv=2)
Mac SSH permission error
### 
[](#unexpected-loss-of-permission-on-macos)
Unexpected loss of permission on macOS
On macOS, you may see a `Operation not permitted` error when trying to run commands in directories that have already been granted macOS permissions (Documents, Downloads, Desktop, etc). The best workaround at this time, is to [apply any pending Updates](/support-and-billing/updating-warp) so that the new Warp binary has the correct permissions. We are and tracking this issue [here](https://github.com/warpdotdev/Warp/issues/3009).
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-370abd65f5c5fdf62512be8fd49ae0fa8e84f974%252FCleanShot%25202024-11-01%2520at%252013.37.01.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=136c47a6&sv=2)
Permission error on macOS
### 
[](#auto-update-error-on-macos)
Auto-Update error on macOS
Warp may have an error opening after auto-update on macOS Ventura. This issue has been resolved for current and future releases of Warp. To avoid the issue, [update Warp](/support-and-billing/updating-warp) _before_ you upgrade to macOS Ventura. If you experience an error opening Warp, please try the following:
 * Go to the macOS Applications folder, right-click on Warp, choose Open, then the '"Warp" is damaged' dialog will have the option to click the Open button.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-82a70bea410ba4f025216d258f10a8a71956613b%252Fopen-warp-mac.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=e831f670&sv=2)
 * If the above doesn't work, [uninstall Warp](/support-and-billing/uninstalling-warp), then [re-install Warp](/).
### 
[](#running-x86-commands-with-macos)
Running x86 commands with macOS
In some cases, [CLI applications only work on x86](https://discord.com/channels/851854972600451112/1204829324847358002) so you can run Warp with Rosetta on macOS to be able to use them by doing the following.
 * Go to `Finder > Applications` and search for Warp.
 * Right-click and select Get Info.
 * Then check the box on Open with Rosetta.
### 
[](#unsupported-in-warp-on-windows)
Unsupported in Warp on Windows
The following feature are not supported in Warp on Windows. Please track the relevant GitHub issues linked below for any changes:
 * [cmd.exe](https://github.com/warpdotdev/Warp/issues/5882) or [fish](https://github.com/warpdotdev/Warp/issues/6060) shells
### 
[](#warp-wont-run-on-windows)
Warp won't run on Windows
We're tracking some issues on Windows where [Warp crashes on startup](https://github.com/warpdotdev/Warp/issues/5840) or doesn't render, with some possible workarounds below. If none of the workarounds help, please open a [new GitHub issue](https://github.com/warpdotdev/warp/issues/new/choose) and include [logs](/support-and-billing/sending-us-feedback#gathering-warp-logs), installation (Baremetal or VM, x86_64 or ARM64), and the issue you had.
 * Graphics
 * You can select the graphics backend used to render new Warp windows in the Settings menu, under `Features` > `System` > `Preferred graphics backend`.
 * You can also opt to render new Warp windows with an integrated GPU, under `Features` > `System` > `Prefer rendering new windows with integrated GPU (low power)`.
### 
[](#crash-on-opening-a-launch-configuration-or-doesnt-become-transparent-on-windows)
Crash on opening a Launch configuration or doesn't become transparent on Windows
When a user has an Nvidia 572.xx or AMD 23.10.x drivers or above, Warp may [crash when trying to open a Launch Configuration](https://github.com/warpdotdev/Warp/issues/5875), or [Warp fails to become transparent](https://github.com/warpdotdev/Warp/issues/5903) (opacity setting doesn't work). These are known limitations of the graphics drivers. We're investigating the issues and will updated on the GitHub issues above. You can workaround this by forcing the graphics backend to Vulkan or OpenGL by running the following from another terminal and setting your GPU driver Vulkan/OpenGL render method setting to "Prefer Native", or using the [DX12 backend](/support-and-billing/known-issues#warp-wont-run-or-render-on-windows):
Copy```
# Run if Warp on Windows is installed for a single user
$env:WGPU_BACKEND="vulkan,gl"; & "$env:LOCALAPPDATA\Programs\Warp\warp.exe"
# Run if Warp on Windows is installed for all users
$env:WGPU_BACKEND="vulkan,gl"; & "$env:PROGRAMFILES\Warp\warp.exe"
```
### 
[](#warp-wont-run-on-linux)
Warp won't run on Linux
We're tracking some issues on Linux where a [Warp window doesn't show/render](https://github.com/warpdotdev/Warp/issues/4215) and won't run in [Virtual Machines](https://github.com/warpdotdev/Warp/issues/4476), over [remote desktops](https://github.com/warpdotdev/Warp/issues/4435), or on [WSL](https://github.com/warpdotdev/Warp/issues/4240). Some possible workarounds are below. If none of the workarounds help, please open a [new GitHub issue](https://github.com/warpdotdev/warp/issues/new/choose) and include [logs](/support-and-billing/sending-us-feedback#gathering-warp-logs) with your Linux distro, installation (WSL, Baremetal or VM, x86_64 or ARM64), and the issue you had.
 * Many package install examples are for Ubuntu using `apt`, your distro may use different commands (`dnf`, `pacman`, `zypper`) or package names.
 * GPU Drivers and Default GPU / Graphics API environmental variables are system-dependent. e.g. AMD vs NVIDIA and OpenGL vs Vulkan
 * System
 * Installing or Updating [Xorg](https://www.x.org/wiki/) / [Wayland](https://wayland.freedesktop.org/): `sudo apt install xserver-xorg` / `sudo apt install wayland`
 * Installing [Hack font](https://sourcefoundry.org/hack/) on WSL and VMs: `sudo apt install fonts-hack`
 * Install [WSL utilities](https://wslutiliti.es/wslu/install.html): `sudo apt install wslu`
 * Install Mesa utilities: `sudo apt install mesa-utils`
 * Install Mesa Vulkan drivers: `sudo apt install mesa-vulkan-drivers`
 * If unable to use the file picker: `sudo apt install xdg-desktop-portal xdg-desktop-portal-gtk zenity`
 * If unable to copy-paste: `sudo apt install wl-clipboard`
 * Graphics
 * Install or Update your GPU driver: e.g. [NVIDIA](https://github.com/warpdotdev/Warp/issues/4215#issuecomment-1969750786) 535.x or below drivers
 * For Ubuntu: `sudo ubuntu-drivers install`
 * For Fedora: `sudo dnf install akmod-nvidia`
 * For Arch Linux: `sudo pacman -S nvidia`
 * For openSUSE: `sudo zypper install x11-video-nvidiaG05`
 * Use [Low Power (integrated) GPU](https://github.com/warpdotdev/Warp/issues/4215#issuecomment-1967500574) in `~/.config/warp-terminal/user_preferences.json` file: `{"prefs":{"PreferLowPowerGPU": "true",}}`. The low-power workaround is particularly helpful if you see [`Unrecognized device error ERROR_INITIALIZATION_FAILED` in warp.log](https://github.com/warpdotdev/Warp/issues/4390#issuecomment-1989493913).
 * Environmental Variables
 * Prefix `warp-terminal` with the variables (multiple can be used), and once you confirm they work, `export` them in your `.profile`/`.zprofile` to [load on startup](https://github.com/warpdotdev/Warp/issues/4240#issuecomment-1968228029):
 * [Default to Wayland](https://github.com/warpdotdev/Warp/issues/4240#issuecomment-1961993281): `WARP_ENABLE_WAYLAND=1`
 * Set [Default GPU](https://docs.mesa3d.org/drivers/d3d12.html#utilities) for WSL: e.g. `MESA_D3D12_DEFAULT_ADAPTER_NAME=NVIDIA`
 * Set [Graphics APIs](https://github.com/gfx-rs/wgpu?tab=readme-ov-file#environment-variables): e.g. `WGPU_BACKEND=gl`
### 
[](#update-fails-after-upgrading-linux)
Update fails after upgrading Linux
Some Linux distros may modify Warp's package repository during the the OS upgrades. We're aware of this on Ubuntu, but this may affect other Linux distros. We're tracking this issue on GitHub [here](https://github.com/warpdotdev/Warp/issues/5201). To workaround this issue, manually add the repository to update Warp. The Ubuntu example is below:
Copy```
sudo apt-get install wget gpg
wget -qO- https://releases.warp.dev/linux/keys/warp.asc | gpg --dearmor > warpdotdev.gpg
sudo install -D -o root -g root -m 644 warpdotdev.gpg /etc/apt/keyrings/warpdotdev.gpg
sudo sh -c 'echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/warpdotdev.gpg] https://releases.warp.dev/linux/deb stable main" > /etc/apt/sources.list.d/warpdotdev.list'
rm warpdotdev.gpg
sudo apt update && sudo apt install warp-terminal
```
See the instructions for other Linux distros on our [Quick Start Guide](/#linux).
[PreviousLogging Out & Uninstalling](/support-and-billing/uninstalling-warp)[NextTroubleshooting Login](/support-and-billing/troubleshooting-login-issues)
Last updated 1 month ago
Was this helpful?