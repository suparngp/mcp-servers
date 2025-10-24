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
 * [Launch Configurations](/terminal/sessions/launch-configurations)
 * [Session Navigation](/terminal/sessions/session-navigation)
 * [Session Restoration](/terminal/sessions/session-restoration)
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
 * [What is it](#what-is-it)
 * [Creating a Launch Configuration](#creating-a-launch-configuration)
 * [From the UI](#from-the-ui)
 * [With a YAML File](#with-a-yaml-file)
 * [Using a Launch Configuration](#using-a-launch-configuration)
 * [How it works](#how-it-works)
 * [Launch Configuration YAML Format](#launch-configuration-yaml-format)
 * [Windows](#windows-2)
 * [Tabs](#tabs)
 * [Panes](#panes)
 * [Active and Focus](#active-and-focus)
 * [Commands](#commands)
Was this helpful?
## 
[](#what-is-it)
What is it
With Launch configurations you can save in the app or by adding a yaml file.
## 
[](#creating-a-launch-configuration)
Creating a Launch Configuration
### 
[](#from-the-ui)
From the UI
 1. Set up the configuration of windows, tabs, and panes you would like to save.
 2. Open the [Command Palette](/terminal/command-palette), and type in `Save New Launch Configuration`.
 3. Name the configuration file. The name field cannot be empty.
 4. Click the Save configuration button.
### 
[](#with-a-yaml-file)
With a YAML File
 * Launch Configurations files are generated when you create them with the UI and can also be created or modified manually.
 * Please see the below for [Launch Configuration YAML file locations, format, and examples](/terminal/sessions/launch-configurations#launch-configuration-yaml-format).
## 
[](#using-a-launch-configuration)
Using a Launch Configuration
macOS
Windows
Linux
 * From the [Command Palette](/terminal/command-palette), enter `Launch Configuration` to open and select Launch Configuration.
 * Right-clicking the new Tab **+** button to open a menu and select saved Launch Configuration.
 * From the Mac Menu, `File > Launch Configurations`, where you can search through and open your saved Launch Configuration.
 * Single-window launch configs can be launched into the active window from the launch configuration palette using `CMD-ENTER` on Mac.
 * From the [Command Palette](/terminal/command-palette), enter `Launch Configuration` to open and select Launch Configuration.
 * Right-clicking the new Tab **+** button to open a menu and select saved Launch Configuration.
 * Single-window launch configs can be launched into the active window from the launch configuration palette using `CTRL-ENTER` on Linux.
To open a WSL tab with a Launch Configuration, you must first set WSL as your default shell in Warp:
 * Go to `Settings > Features > Session > Startup shell for new sessions`.
 * Select your desired WSL distribution (e.g., Ubuntu) as the default shell.
After this, any Launch Configuration you open will use WSL as the shell.
 * From the [Command Palette](/terminal/command-palette), enter `Launch Configuration` to open and select Launch Configuration.
 * Right-clicking the new Tab **+** button to open a menu and select saved Launch Configuration.
 * Single-window launch configs can be launched into the active window from the launch configuration palette using `CTRL-ENTER` on Linux.
**Terminal Tip** You can open saved Launch Configurations via Alfred Workflow or [Raycast](/terminal/integrations-and-plugins#raycast) Extension. Learn more [here](https://blog.joe.codes/open-warp-launch-configurations-from-raycast-and-alfred). Credit to [@joetannenbaum](https://twitter.com/joetannenbaum/status/1633538768866009115)
## 
[](#how-it-works)
How it works
Launch Configuration Demo
## 
[](#launch-configuration-yaml-format)
Launch Configuration YAML Format
All Launch Configuration yaml files are stored in the following location:
macOS
Windows
Linux
Copy```
$HOME/.warp/launch_configurations/
```
Copy```
$env:APPDATA\warp\Warp\data\launch_configurations\
```
Copy```
${XDG_DATA_HOME:-$HOME/.local/share}/warp-terminal/launch_configurations/
```
The `cwd:` value in the yaml code must contain an absolute path or `""`. Note that `~` or empty paths will result in the file not being visible on the list of options for Launch Configurations.
### 
[](#windows-2)
Windows
Sample configuration that shows how windows are structured in launch configuration files.
Copy```
# Warp Launch Configuration
#
# This configuration has two windows, 
# each with one tab in different starting directories.
---
name: Example Windows
windows:
 - tabs:
 - title: Documents
 layout:
 cwd: /Users/warp-user/Documents
 color: blue
 - tabs:
 - title: Warp User
 layout:
 cwd: /Users/warp-user
 color: green
```
### 
[](#tabs)
Tabs
Here's a sample configuration that shows how tabs are structured in launch configuration files.
 * Use the `title` field to set a custom tab name
 * Use the `color` field to set the tab color
 * We currently support using the terminal colors (ANSI colors):
`Red | Green | Yellow | Blue | Magenta | Cyan`
The actual color values will be automatically derived from your Warp theme
Copy```
# Warp Launch Configuration
#
# This configuration has two tabs in the same window.
---
name: Example Tabs
windows:
 - tabs:
 - title: Documents 
 layout:
 cwd: /Users/warp-user/Documents
 color: blue
 - title: Warp User
 layout:
 cwd: /Users/warp-user
 color: green
```
### 
[](#panes)
Panes
Launch Configurations support setting split panes in each tab. Note that Warp also supports nesting split panes in launch configuration files.
Copy```
# Warp Launch Configuration
#
# This configuration is two windows, each with split panes. 
# The first window contains a vertically split tab with two panes.
# The second window contains a horizontally split tab, 
# with a vertically split tab on the right.
---
name: Example Panes
windows:
 - tabs:
 - title: Downloads and Warp User
 layout:
 split_direction: vertical
 panes:
 - cwd: /Users/warp-user/Downloads
 - cwd: /Users/warp-user
 color: blue
 - tabs:
 - title: Desktop, Documents, and Warp User
 layout:
 split_direction: horizontal
 panes:
 - cwd: /Users/warp-user/Desktop
 - split_direction: vertical
 panes:
 - cwd: /Users/warp-user/Documents
 - cwd: /Users/warp-user
 color: green
```
### 
[](#active-and-focus)
Active and Focus
Sample configuration that shows how a Window and Tab can be activated with a session in focus.
 * Use the `active_window_index` and `active_tab_index`fields to set your active Window and Tab.
 * Use the `is_focused` field to set which Pane is focused in each tab.
Not that when you use `- active_tab_index:` the `tabs:` field doesn't need the `-` prefix, as this can cause syntax issues.
Copy```
# Warp Launch Configuration
#
# This configurations has two tabs, with the second tab active.
# Two vertical split panes in the first tab and the top pane focused.
# Two horizontal split panes in the second tab and the right pane focused.
---
name: Example Active and Focus
active_window_index: 0
windows:
 - active_tab_index: 1
 tabs:
 - title: Tab 1
 layout:
 split_direction: vertical
 panes:
 - cwd: /Users/warp-user/Documents
 is_focused: true
 - cwd: /Users/warp-user/Documents/Projects
 - title: Tab 2
 layout:
 split_direction: horizontal
 panes:
 - cwd: /Users/warp-user/Downloads
 - cwd: /Users/warp-user
 is_focused: true
```
### 
[](#commands)
Commands
Use the `commands` field to define a set of commands to run when a launch configuration in run.
You may need to use double quotes for commands with special characters. Commands in separate lines are chained together with `&&` when run, as such commands run after `ssh` commands may not execute.
Copy```
# Warp Launch Configuration
#
# This configuration has two windows,
# the first window executes two commands on start,
# the second window has a split pane that executes a command on start.
---
name: Example Commands
windows:
 - tabs:
 - title: Documents
 layout:
 cwd: /Users/warp-user/Documents
 commands:
 - exec: ls
 - exec: code .
 color: blue
 - tabs:
 - title: Downloads
 layout:
 split_direction: vertical
 panes:
 - cwd: /Users/warp-user/Downloads
 commands:
 - exec: curl http://example.com -o my.file
 - exec: cp my.file my.file2
 - cwd: /Users/warp-user
 commands:
 - exec: ssh [email protected][](/cdn-cgi/l/email-protection)
 color: green
```
[PreviousSession Management](/terminal/sessions)[NextSession Navigation](/terminal/sessions/session-navigation)
Last updated 3 months ago
Was this helpful?