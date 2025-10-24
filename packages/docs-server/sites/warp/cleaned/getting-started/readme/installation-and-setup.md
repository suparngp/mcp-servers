[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * * [Quickstart Guided](/)
 * [Installation and setup](/getting-started/readme/installation-and-setup)
 * [Coding in Warp](/getting-started/readme/coding-in-warp)
 * [Agents in Warp](/getting-started/readme/agents-in-warp)
 * [Customizing Warp](/getting-started/readme/customizing-warp)
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
 * [Install Warp](#install-warp)
 * [Initial Setup](#initial-setup)
 * [Log in to Warp (Optional)](#log-in-to-warp-optional)
 * [Use Warp offline](#use-warp-offline)
 * [Import your settings](#import-your-settings)
 * [Set up your Warp default shell](#set-up-your-warp-default-shell)
Was this helpful?
**Platform support:** Warp is supported on macOS (Intel and Mac Silicon), Windows (x86_64 and ARM64), and Linux (x86_64 and ARM64)
## 
[](#install-warp)
Install Warp
**Visit** [Known Issues](/support-and-billing/known-issues) **to get more details on setting up and troubleshooting Warp.**
macOS
Windows
Linux
**Minimum requirements:** Intel or Apple silicon macOS 10.14 or above and hardware that supports [Metal](https://support.apple.com/en-us/HT205073).
**Download Warp and drag into your Applications folder**
[![Logo](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2Fwww.warp.dev%2Ffavicon.png&width=20&dpr=4&quality=100&sign=b500d5b0&sv=2)Download: Get the Agentic Development EnvironmentWarp](https://www.warp.dev/download)
Download Warp
**Install using Homebrew by running the command below**
Copy```
brew install --cask warp
```
After installation, you can find Warp in your Applications folder.
**Minimum requirements:** Warp requires Windows 10 version 1809 (build 17763) or later, Windows Server 2019 (build 17763) and Windows Server 2022 (build 20348) or later. This is a requirement for [Windows Pseudo Console (ConPTY)](https://devblogs.microsoft.com/commandline/windows-command-line-introducing-the-windows-pseudo-console-conpty/).
**Download Warp, then open and run the installer**
[![Logo](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2Fwww.warp.dev%2Ffavicon.png&width=20&dpr=4&quality=100&sign=b500d5b0&sv=2)Download: Get the Agentic Development EnvironmentWarp](https://www.warp.dev/download)
Download Warp
**Install using WinGet by running the command below**
Copy```
winget install Warp.Warp
```
After installation, you can find Warp in the Start menu.
**Minimum requirements:** Linux distribution with glibc >= 2.31 (released Feb. 2020) and support for _either_ [OpenGL ES 3.0+ or Vulkan](https://github.com/gfx-rs/wgpu?tab=readme-ov-file#supported-platforms).
This includes (but is not limited to) the following:
 * Ubuntu 20.04
 * Debian 11 ("bullseye")
 * Fedora 32
 * Arch Linux
**Visit the Warp download page for the full list of Linux installation options**
[![Logo](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2Fwww.warp.dev%2Ffavicon.png&width=20&dpr=4&quality=100&sign=b500d5b0&sv=2)Download: Get the Agentic Development EnvironmentWarp](https://www.warp.dev/download)
Download Warp
**Debian- and Ubuntu-based distributions**
The easiest way to install Warp is to download [x64 .deb package](https://app.warp.dev/download?package=deb) or [ARM64 deb package](https://app.warp.dev/download?package=deb_arm64). After downloading, you can install the package with:
Copy```
sudo apt install ./<file>.deb
```
Installing the .deb package will automatically set up the Warp apt repository and signing key needed to automatically update Warp and verify the integrity of the downloaded packages.
Alternatively, you can manually configure the Warp apt repository and install Warp by running the following commands:
Copy```
sudo apt-get install wget gpg
wget -qO- https://releases.warp.dev/linux/keys/warp.asc | gpg --dearmor > warpdotdev.gpg
sudo install -D -o root -g root -m 644 warpdotdev.gpg /etc/apt/keyrings/warpdotdev.gpg
sudo sh -c 'echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/warpdotdev.gpg] https://releases.warp.dev/linux/deb stable main" > /etc/apt/sources.list.d/warpdotdev.list'
rm warpdotdev.gpg
sudo apt update && sudo apt install warp-terminal
```
**RHEL-, Fedora-, and CentOS-based distributions**
The easiest way to install Warp is to download the [x64 .rpm package](https://app.warp.dev/download?package=rpm) or [ARM64 .rpm package](https://app.warp.dev/download?package=rpm_arm64). After downloading, you can install the package with:
Copy```
sudo dnf install ./<file>.rpm
```
Installing the .rpm package will automatically set up the Warp yum repository. On first update, `dnf` will retrieve the signing key needed to verify the integrity of the downloaded packages.
Alternatively, you can manually configure the Warp yum repository and install Warp by running the following commands:
Copy```
sudo rpm --import https://releases.warp.dev/linux/keys/warp.asc
sudo sh -c 'echo -e "[warpdotdev]\nname=warpdotdev\nbaseurl=https://releases.warp.dev/linux/rpm/stable\nenabled=1\ngpgcheck=1\ngpgkey=https://releases.warp.dev/linux/keys/warp.asc" > /etc/yum.repos.d/warpdotdev.repo'
sudo dnf install warp-terminal
```
**Arch Linux-based distributions**
The easiest way to install Warp is to download the [x64 .pkg.tar.zst package](https://app.warp.dev/download?package=pacman) or [ARM64 pacman package](https://app.warp.dev/download?package=pacman_arm64). After downloading, you can install the package with:
Copy```
sudo pacman -U ./<file>.pkg.tar.zst
```
The first time you update Warp through the app, it will guide you through setting up the Warp pacman repository and signing key.
Alternatively, you can manually configure the Warp pacman repository and install Warp by running the following commands:
Copy```
sudo sh -c "echo -e '\n[warpdotdev]\nServer = https://releases.warp.dev/linux/pacman/\$repo/\$arch' >> /etc/pacman.conf"
sudo pacman-key -r "[email protected][](/cdn-cgi/l/email-protection)"
sudo pacman-key --lsign-key "[email protected][](/cdn-cgi/l/email-protection)"
sudo pacman -Sy warp-terminal
```
**OpenSUSE- and SLE-based distributions**
The Warp yum repository also works for OpenSUSE- and SLE-based systems. Download the [x64 .rpm package](https://app.warp.dev/download?package=rpm) or [ARM64 .rpm package](https://app.warp.dev/download?package=rpm_arm64). After downloading, you can install the package with:
Copy```
sudo zypper install ./<file>.rpm
```
Installing the .rpm package will automatically set up the Warp yum repository. On first update, `zypper` will retrieve the signing key needed to verify the integrity of the downloaded packages.
Alternatively, you can manually configure the Warp yum repository and install Warp by running the following commands:
Copy```
sudo rpm --import https://releases.warp.dev/linux/keys/warp.asc
sudo sh -c 'echo -e "[warpdotdev]\nname=warpdotdev\ntype=rpm-md\nbaseurl=https://releases.warp.dev/linux/rpm/stable\nenabled=1\nautorefresh=1\ngpgcheck=1\ngpgkey=https://releases.warp.dev/linux/keys/warp.asc\nkeeppackages=0" > /etc/zypp/repos.d/warpdotdev.repo'
sudo zypper install warp-terminal
```
**AppImage**
We also provide an [AppImage](https://appimage.org), a single-file executable version of Warp. Installing Warp via a package manager is recommended, as it will ensure your system has all necessary dependencies installed.
You can download the Warp AppImage with the following commands:
Copy```
# On x64 systems
curl -L "https://app.warp.dev/download?package=appimage" -o Warp-x64.AppImage
chmod +x Warp-x64.AppImage
```
Copy```
# On ARM64 systems
curl -L "https://app.warp.dev/download?package=appimage_arm64" -o Warp-ARM64.AppImage
chmod +x Warp-ARM64.AppImage
```
**Running Warp on Linux**
If you installed a package, find Warp in your desktop manager or run `warp-terminal` on your terminal. If you're using the AppImage, you can launch it by navigating to the directory where the AppImage is located and running `./Warp-*.AppImage`.
Want to try our newest features? [Warp Preview](/community/warp-preview-and-alpha-program) is available on all platforms and architectures (macOS, Windows, Linux) for early access to experimental features.
## 
[](#initial-setup)
Initial Setup
### 
[](#log-in-to-warp-optional)
Log in to Warp (Optional)
After installation, you have the option to create a Warp account thru the "Sign up" bottom on the top right or in `Settings > Account > Sign up`. You have the option to skip this step. If you're having issues logging in, you can check out the [Login Troubleshooting](/support-and-billing/troubleshooting-login-issues) page.
If you sign up using Google or GitHub, Warp only gets access to the associated email address. Visit the [Privacy](/privacy/privacy) page for more details on Warp's approach to privacy.
### 
[](#use-warp-offline)
Use Warp offline
You will only need an active internet connection when you open the Warp app for the first time. Once opened, [Warp is able to run with no internet connection](/support-and-billing/using-warp-offline), although certain features that require an internet connection like AI and real-time collaboration features will be unavailable.
### 
[](#import-your-settings)
Import your settings
If you are migrating to Warp from a terminal like iTerm2, you can easily import your settings, such as keyboard shortcuts and color themes. For more details, visit the [Migrate to Warp](/getting-started/migrate-to-warp) docs.
### 
[](#set-up-your-warp-default-shell)
Set up your Warp default shell
Warp tries to load your login shell by default. Currently, Warp supports bash, fish, zsh, and PowerShell (pwsh). If your login shell is set to something else (for example, Nushell) Warp will load zsh by default.
Zsh is the default login and interactive shell on macOS (starting with macOS Catalina in 2019), replacing the bash shell. For most Linux distributions, the default shell is bash.
You can change your default shell by going to `Settings > Features > Session`. In the Startup shell for new sessions section, you can choose which shell you want Warp to use.
[PreviousQuickstart Guided](/)[NextCoding in Warp](/getting-started/readme/coding-in-warp)
Last updated 3 months ago
Was this helpful?