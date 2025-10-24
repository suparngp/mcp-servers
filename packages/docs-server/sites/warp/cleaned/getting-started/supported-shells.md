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
 * [Warp default shell](#warp-default-shell)
 * [Changing what shell Warp uses](#changing-what-shell-warp-uses)
 * [Customizing Your Shell Environment](#customizing-your-shell-environment)
 * [Customize Your zsh Shell Environment](#customize-your-zsh-shell-environment)
 * [Customize Your Bash Shell Environment](#customize-your-bash-shell-environment)
 * [Customize Your Fish Shell Environment](#customize-your-fish-shell-environment)
 * [Customize Your PowerShell Shell Environment](#customize-your-powershell-shell-environment)
 * [Additional shell guidance for macOS](#additional-shell-guidance-for-macos)
 * [Using fish shell with Warp on macOS](#using-fish-shell-with-warp-on-macos)
 * [Using PowerShell (pwsh) with Warp on macOS](#using-powershell-pwsh-with-warp-on-macos)
 * [Using Warp with shells on Windows](#using-warp-with-shells-on-windows)
Was this helpful?
## 
[](#warp-default-shell)
Warp default shell
Warp tries to load your login shell by default. Currently, Warp supports bash, fish, zsh, and PowerShell (pwsh). If your login shell is set to something else (e.g. Nushell) Warp will show a banner indicating it's not supported and load the default shells listed below:
 * On macOS, zsh is the default shell.
 * On Windows, PowerShell (pwsh) is the default shell.
 * On Linux, bash is the the default shell.
If you run into issues configuring your RC files (`~/.bashrc`, `~/.zshrc`, `config.fish`, `Microsoft.PowerShell_profile.ps1`) with Warp, please see [Configuring and debugging your RC files](https://docs.warp.dev/help/known-issues#configuring-and-debugging-your-rc-files).
### 
[](#changing-what-shell-warp-uses)
Changing what shell Warp uses
To change the default shell, e recommend you choose a shell in Warp by going to `Settings > Features` and scrolling to the `Session` section, then select the "Startup shell for new sessions"
The changes to your shell will only take effect when you start a new session.
## 
[](#customizing-your-shell-environment)
Customizing Your Shell Environment
### 
[](#customize-your-zsh-shell-environment)
Customize Your zsh Shell Environment
Zsh can be customized via the `~/.zshrc` file, which runs whenever a new session starts (window, tab, or pane). Use it to set environment variables, aliases, and customize the [prompt](https://docs.warp.dev/features/prompt).
#### 
[](#editing-the-.zshrc-file)
Editing the .zshrc File
Edit `~/.zshrc` using `nano ~/.zshrc` or `vi ~/.zshrc`.
Files starting with a dot (`.`) are hidden by default. Check your file explorer’s settings to show hidden files.
#### 
[](#reloading-the-zshrc-file)
Reloading the zshrc File
Apply changes by running `source ~/.zshrc` or restarting Warp/opening a new session.
### 
[](#customize-your-bash-shell-environment)
Customize Your Bash Shell Environment
Bash is pre-installed on macOS and can be customized using `~/.bashrc` (for non-login shells) or `~/.bash_profile` (for login shells). Use these files to set environment variables, aliases, and customize the [prompt](https://docs.warp.dev/features/prompt).
#### 
[](#editing-the-.bashrc-file)
Editing the .bashrc File
Edit `~/.bashrc` using `nano ~/.bashrc` or `vi ~/.bashrc`.
#### 
[](#reloading-the-bashrc-file)
Reloading the bashrc File
Apply changes by running `source ~/.bashrc` or restarting Warp/opening a new session.
Files starting with a dot (`.`) are hidden by default. Check your file explorer’s settings to show hidden files.
### 
[](#customize-your-fish-shell-environment)
Customize Your Fish Shell Environment
Fish is a user-friendly shell with autosuggestions and syntax highlighting. Its configuration file is `~/.config/fish/config.fish`.
#### 
[](#editing-the-config.fish-file)
Editing the config.fish File
Edit `~/.config/fish/config.fish` using `nano ~/.config/fish`. Use it to set environment variables, aliases, and functions.
#### 
[](#reloading-the-config.fish-file)
Reloading the config.fish File
Apply changes by running `source ~/.config/fish` or restarting Warp/opening a new session.
Unlike Bash and Zsh, Fish does not use `export VAR=value`. Use `set -Ux VAR value` for persistent environment variables.
### 
[](#customize-your-powershell-shell-environment)
Customize Your PowerShell Shell Environment
PowerShell can be customized via its profile script, located at `$PROFILE`. Check if it exists with `Test-Path $PROFILE`, and create it if needed with `New-Item -Path $PROFILE -ItemType File -Force`.
#### 
[](#editing-the-powershell-profile)
Editing the PowerShell Profile
Edit the profile using `code $PROFILE`, and use it to set environment variables, aliases, custom prompts, and scripts.
#### 
[](#reloading-the-powershell-profile)
Reloading the PowerShell Profile
Apply changes by restarting Warp or opening a new session.
PowerShell’s execution policy may block scripts. Enable profile execution with:
Copy```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
## 
[](#additional-shell-guidance-for-macos)
Additional shell guidance for macOS
#### 
[](#setting-up-zsh-on-warp)
Setting up zsh on Warp
By default, macOS ships with [zsh](https://zsh.sourceforge.io/Doc/Release/zsh_toc.html) located in `/bin/zsh`. You can confirm this location by typing `which zsh` in Warp. You can also check the version of zsh installed on your system by simply typing the following:
`$ zsh --version`
### 
[](#using-fish-shell-with-warp-on-macos)
Using fish shell with Warp on macOS
#### 
[](#step-1-install-fish)
Step 1: Install fish
While bash, and zsh come pre-installed on macOS systems, fish shell does not. So before using fish with Warp, you will need to install it. Install fish 3.6 or above using one of the methods listed below -
 1. With Homebrew: If you already have homebrew installed, you can simply type `brew install fish`, and follow the instructions.
 2. Download the installer at [fishshell.com](https://fishshell.com/)
#### 
[](#step-2-switch-to-fish-as-the-default-shell)
Step 2: Switch to fish as the default shell
Once you’ve installed fish on your computer, you can set it as your default shell, so Warp will use it every time a new tab, pane, or window is opened. You can either make fish the default shell for only Warp, from the session settings (`Settings > Features > Session`), or for your user account. To change your account's default shell, you need to run two commands.
**If you used Homebrew to install fish on a macOS or if you used the Mac installer** available on fishshell.com to install fish, type the following two commands in Warp:
Copy```
echo $(which fish) | sudo tee -a /etc/shells
chsh -s $(which fish)
```
If you prefer, you can also manually edit the `/etc/shells` file using the editor of your choice (you may need sudo privileges).
**Why the different locations?** The location of fish depends on how it was installed. Homebrew installs programs under `/usr/local` on Macs running Intel processors, but under `/opt/homebrew` for Macs running Apple Silicon. So, if you used Homebrew to install fish on a Mac with Apple Silicon, the location of the executable is - `/opt/homebrew/bin/fish`. You can identify where fish is installed by running `which fish`.
### 
[](#using-powershell-pwsh-with-warp-on-macos)
Using PowerShell (pwsh) with Warp on macOS
#### 
[](#step-1-install-powershell)
Step 1: Install PowerShell
While bash, and zsh come pre-installed on macOS systems, PowerShell shell does not. So before using PowerShell with Warp, you will need to install it. Install PowerShell 7.0 or above using one of the methods listed below -
 1. With Homebrew: If you already have homebrew installed, you can simply type `brew install powershell/tap/powershell`, and follow the instructions.
 2. Download from the [official Microsoft website](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell).
#### 
[](#step-2-switch-to-pwsh-as-the-default-shell)
Step 2: Switch to pwsh as the default shell
Once you’ve installed PowerShell on your computer, you can set it as your default shell, so Warp will use it every time a new tab, pane, or window is opened. You can either make pwsh the default shell for only Warp, from the session settings (`Settings > Features > Session`), or for your user account. To change your account's default shell, you need to run two commands.
Copy```
echo $(which pwsh) | sudo tee -a /etc/shells
chsh -s $(which pwsh)
```
If you prefer, you can also manually edit the `/etc/shells` file using the editor of your choice (you may need sudo privileges).
**Why the different locations?** The location of pwsh depends on how it was installed. Homebrew installs programs under `/usr/local` on Macs running Intel processors, but under `/opt/homebrew` for Macs running Apple Silicon. So, if you used Homebrew to install pwsh on a Mac with Apple Silicon, the location of the executable is - `/opt/homebrew/bin/pwsh`. You can identify where pwsh is installed by running `which pwsh`.
## 
[](#using-warp-with-shells-on-windows)
Using Warp with shells on Windows
On Windows, Warp's default shell is PowerShell 7 (pwsh). Warp for Windows supports several shells:
 * PowerShell 7 (default)
 * PowerShell 5
 * Windows Subsystem for Linux (WSL2)
 * Git Bash
Windows Command Prompt (cmd.exe) is not currently supported. For more information and updates about cmd.exe support, please see [this GitHub issue](https://github.com/warpdotdev/Warp/issues/5882).
[PreviousMigrate to Warp](/getting-started/migrate-to-warp)[NextKeyboard Shortcuts](/getting-started/keyboard-shortcuts)
Last updated 4 months ago
Was this helpful?