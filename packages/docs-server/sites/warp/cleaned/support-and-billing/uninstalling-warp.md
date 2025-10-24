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
 * [Logging out](#logging-out)
 * [Known issues:](#known-issues)
 * [Uninstalling Warp](#uninstalling-warp)
Was this helpful?
## 
[](#logging-out)
Logging out
You can log out of Warp through:
 * `Settings > Account`, with the "Log out" button
 * [Command Palette](/terminal/command-palette), with the "Log Out" item.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-5906d41458bb7f76b7df89941c20e995c6cfab94%252Flogout.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=2ee4d31c&sv=2)
Logout Demo
### 
[](#known-issues)
Known issues:
 1. When you log out, you will lose all running processes and all unsaved objects.
 2. When you log out and log in to Warp with another account, the following preferences will be preserved from the original account:
 1. Theme
 2. Keybindings
 3. Settings (e.g. autosuggestion, notifications, font size, welcome tips status)
 3. Whenever you log in to Warp, you will receive the onboarding survey.
## 
[](#uninstalling-warp)
Uninstalling Warp
Removing Warp from your computer involves uninstalling Warp and then removing any files or data.
If you're using Warp Preview, replace "Warp-Stable" with "Warp-Preview" in the commands below (e.g., `defaults delete dev.warp.Warp-Preview`).
macOS
Windows
Linux
**Uninstalling Warp by dmg**
 * Remove Warp with `sudo rm -r /Applications/Warp.app`
 * Go to Mac `Finder > Applications` and right-click on Warp, and "Move to Trash"
**Uninstalling Warp by Homebrew**
 * Remove Warp with `brew uninstall warp`
**Removing Warp settings, files, logs, and database**
Copy```
# Remove Warp settings defaults
defaults delete dev.warp.Warp-Stable
# Remove Warp logs
sudo rm -r $HOME/Library/Logs/warp.log
# Remove Warp database, codebase context, and mcp logs
sudo rm -r "$HOME/Library/Application Support/dev.warp.Warp-Stable"
# Remove Warp user files, themes, and launch configurations
sudo rm -r $HOME/.warp
# Note: Removing $HOME/.warp will delete files for both Stable and Preview.
# If you wish to delete it all, then: sudo rm -r $HOME/.warp
```
**For Warp Preview users:**
Copy```
# Remove Warp Preview settings defaults
defaults delete dev.warp.Warp-Preview
# Remove Warp Preview logs
sudo rm -r $HOME/Library/Logs/warp_preview.log
# Remove Warp Preview database, codebase context, and mcp logs
sudo rm -r "$HOME/Library/Application Support/dev.warp.Warp-Preview"
# Note: Removing $HOME/.warp will delete files for both Preview and Stable. 
# If you wish to delete it all, then: sudo rm -r $HOME/.warp
```
**Uninstalling Warp installed by Installer**
 * Search for "Installed apps" section of the Control Panel.
 * Search for and Uninstall the Warp application
**Removing Warp settings, files, logs, and database**
Copy```
# Remove Warp settings in the Windows Registry
Remove-Item -Path "HKCU:\Software\Warp.dev\Warp" -Recurse -Force
# Remove Warp user files, logs, database, codebase context, and mcp logs
Remove-Item -Path "$env:LOCALAPPDATA\warp\Warp" -Recurse -Force
# Remove Warp themes and launch configurations
Remove-Item -Path "$env:APPDATA\warp\Warp" -Recurse -Force
```
**For Warp Preview users:**
Copy```
# Remove Warp Preview settings in the Windows Registry
Remove-Item -Path "HKCU:\Software\Warp.dev\Warp-Preview" -Recurse -Force
# Remove Warp Preview user files, logs, database, codebase context, and mcp logs
Remove-Item -Path "$env:LOCALAPPDATA\warp\Warp-Preview" -Recurse -Force
# Remove Warp Preview themes and launch configurations
Remove-Item -Path "$env:APPDATA\warp\Warp-Preview" -Recurse -Force
```
**Uninstalling Warp by package manager**
Copy```
# apt uninstall
sudo apt remove warp-terminal
# dnf uninstall
sudo dnf remove warp-terminal
# zypper uninstall
sudo zypper remove warp-terminal
# pacman uninstall
sudo pacman -R warp-terminal
```
 * Uninstall Warp using the same package manager that you used to [install](/) it.
**Removing Warp settings, files, logs, and database**
Copy```
# Remove Warp settings files
rm -r ${XDG_CONFIG_HOME:-$HOME/.config}/warp-terminal
# Remove Warp user files, logs, database, codebase context, and mcp logs
rm -r ${XDG_STATE_HOME:-$HOME/.local/state}/warp-terminal
# Remove Warp themes and launch configurations
rm -r ${XDG_STATE_HOME:-$HOME/.local/share}/warp-terminal
```
**For Warp Preview users:**
Copy```
# apt uninstall
sudo apt remove warp-terminal-preview
# dnf uninstall
sudo dnf remove warp-terminal-preview
# zypper uninstall
sudo zypper remove warp-terminal-preview
# pacman uninstall
sudo pacman -R warp-terminal-preview
```
 * Uninstall Warp Preview using the same package manager that you used to install it.
Copy```
# Remove Warp Preview settings files
rm -r ${XDG_CONFIG_HOME:-$HOME/.config}/warp-terminal-preview
# Remove Warp Preview user files, logs, database, codebase context, and mcp logs
rm -r ${XDG_STATE_HOME:-$HOME/.local/state}/warp-terminal-preview
# Remove Warp Preview themes and launch configurations
rm -r ${XDG_STATE_HOME:-$HOME/.local/share}/warp-terminal-preview
```
[PreviousUsing Warp Offline](/support-and-billing/using-warp-offline)[NextKnown Issues](/support-and-billing/known-issues)
Last updated 4 months ago
Was this helpful?