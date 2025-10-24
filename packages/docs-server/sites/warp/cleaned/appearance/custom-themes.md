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
 * [Warp's Custom Theme Repository](#warps-custom-theme-repository)
 * [How do I use a custom theme in Warp?](#how-do-i-use-a-custom-theme-in-warp)
 * [Create your custom theme, manually](#create-your-custom-theme-manually)
 * [Create your custom theme, automatically](#create-your-custom-theme-automatically)
 * [Create your custom theme, with a tool](#create-your-custom-theme-with-a-tool)
 * [Background Images and Gradients](#background-images-and-gradients)
 * [Contributing](#contributing)
 * [Community](#community)
 * [Open source dependencies](#open-source-dependencies)
Was this helpful?
Examples and a collection of themes can be found in the [Warp themes repository](https://github.com/warpdotdev/themes).
## 
[](#warps-custom-theme-repository)
Warp's Custom Theme Repository
We have a [repository of themes hosted on GitHub.](https://github.com/warpdotdev/themes)
Each theme has a preview generated in the README.
The main difference between "standard" and "base16" themes is that "standard" themes follow the typical color setup, while "base16" themes follow the framework suggested by [@chriskempson](https://github.com/chriskempson/base16).
There are 2 ways to install a theme from this repo.
 1. Download a single file and follow the steps in the section below.
 2. Clone the entire repo into the appropriate location based on your OS below:
macOS
Windows
Linux
Copy```
mkdir-p $HOME/.warp
cd $HOME/.warp/
gitclonehttps://github.com/warpdotdev/themes.git
```
Copy```
New-Item-Path "$env:APPDATA\warp\Warp\data\"-ItemType Directory
Set-Location-Path $env:APPDATA\warp\Warp\data\
git clone https://github.com/warpdotdev/themes.git
```
Copy```
mkdir-p ${XDG_DATA_HOME:-$HOME/.local/share}/warp-terminal
cd ${XDG_DATA_HOME:-$HOME/.local/share}/warp-terminal/
gitclonehttps://github.com/warpdotdev/themes.git
```
Here is a step-by-step YouTube video that goes through these 2 steps for an example theme. Note the location for the files is based on macOS.
Adding a Custom Theme to Warp
## 
[](#how-do-i-use-a-custom-theme-in-warp)
How do I use a custom theme in Warp?
 1. To start, create the following directory:
macOS
Windows
Linux
Copy```
mkdir -p $HOME/.warp/themes/
```
Copy```
New-Item -Path "$env:APPDATA\warp\Warp\data\themes\" -ItemType Directory
```
Copy```
mkdir -p ${XDG_DATA_HOME:-$HOME/.local/share}/warp-terminal/themes/
```
It may take several minutes for Warp to initially discover the new themes directory. You can either wait or restart Warp. After that step, all future changes to the directory will be reflected within seconds.
 1. Add your new custom theme yaml file to this directory:
Copy```
cp ~/Downloads/my_awesome_theme.yaml {{path_to_your_themes_directory_from_step1}}
```
Your new theme should now be visible on the list of available themes.
## 
[](#create-your-custom-theme-manually)
Create your custom theme, manually
Warp supports creating custom themes using .yaml files.
The format itself might expand, but we'll do our best to avoid breaking changes and maintain forward compatibility. We also plan on supporting sharing/creating custom themes directly within Warp.
A custom theme in Warp has the following `.yaml` structure:
Copy```
name: Custom Theme # Name for the theme
accent: '#268bd2' # Accent color for UI elements
cursor: '#95D886' # Input cursor color (optional; defaults to accent color if omitted)
background: '#002b36' # Terminal background color
foreground: '#839496' # The foreground color
details: darker # Whether the theme is lighter or darker
terminal_colors: # Ansi escape colors
 bright:
 black: '#002b36'
 blue: '#839496'
 cyan: '#93a1a1'
 green: '#586e75'
 magenta: '#6c71c4'
 red: '#cb4b16'
 white: '#fdf6e3'
 yellow: '#657b83'
 normal:
 black: '#073642'
 blue: '#268bd2'
 cyan: '#2aa198'
 green: '#859900'
 magenta: '#d33682'
 red: '#dc322f'
 white: '#eee8d5'
 yellow: '#b58900'
```
Each color is represented in hex and must start with `#`.
 * `name`: Name for the theme, will show up in the Theme picker.
 * `accent`: Color used for highlights in Warp's UI
 * `cursor`: Color for the input cursor (optional; defaults to accent color if omitted)
 * `background`: Color of background
 * `foreground`: Color of foreground
 * `details`: Color used for detailing options
 * `darker`: Color used for dark theme
 * `lighter`: Color used for light-mode theme
 * `terminal_colors`: Collection of normal & bright colors (16 total) known for other terminal themes (ANSI colors)
## 
[](#create-your-custom-theme-automatically)
Create your custom theme, automatically
Automatically create new themes based on a background image. Click the `+` button in the theme picker `Settings > Appearance > Current Theme` or search `Open Theme Picker` within the [Command Palette](/terminal/command-palette).
## 
[](#create-your-custom-theme-with-a-tool)
Create your custom theme, with a tool
Use [Terminal-Themes](https://terminal-themes.com/) to create a custom theme and generate the appropriate RGB values for your custom theme. Once the YAML file is created, you can edit the file to add the background images or gradients.
## 
[](#background-images-and-gradients)
Background Images and Gradients
To add a background image you can use this attribute: `background_image:` with the name of the image you want to use as the background.
Note: Warp currently only supports images with the _.jpg_ file format:
 * `.jpeg`
 * `.jpg`
 * `.JPEG`
A `.yaml` config looks like this:
Copy```
name: Custom Theme
accent: '#268bd2'
cursor: '#95D886'
background: '#002b36'
details: darker
foreground: '#839496'
############################################################### SEE BELOW
background_image:
 # the path is relative to ~/.warp/themes/
 # the full path to the picture is: ~/.warp/themes/warp.jpg
 path: warp.jpg
 # the opacity value is required and can range from 0-100
 opacity: 60
############################################################### SEE ABOVE
terminal_colors:
 bright:
 black: '#002b36'
 blue: '#839496'
 cyan: '#93a1a1'
 green: '#586e75'
 magenta: '#6c71c4'
 red: '#cb4b16'
 white: '#fdf6e3'
 yellow: '#657b83'
 normal:
 black: '#073642'
 blue: '#268bd2'
 cyan: '#2aa198'
 green: '#859900'
 magenta: '#d33682'
 red: '#dc322f'
 white: '#eee8d5'
 yellow: '#b58900'
```
To set up a gradient, create a sublevel under accent with two key-value pairs:
 * "left" and "right" or
 * "top" and "bottom".
Copy```
accent:
 top: '#abcdef'
 bottom: '#fedcba'
```
Copy```
accent:
 left: '#abcdef'
 right: '#fedcba'
```
Warp also supports setting a gradient for the background.
Copy```
# accent has a gradient
accent:
 left: '#474747'
 right: '#ffffff'
# background has a gradient
background:
 top: '#474747'
 bottom: '#ffffff'
```
### 
[](#contributing)
Contributing
Contributions to this repo are greatly appreciated!
 1. Fork the project
 2. Create your branch with `git checkout -b theme/AwesomeTheme`
 3. Regenerate thumbnails
 4. Commit and open a pull request
Run this script to generate the thumbnails.
Copy```
# Assuming you're adding the theme to the `standard` directory:
python3 ./scripts/gen_theme_previews.py standard
```
Note: We cannot accept pull requests that include custom background images because:
 * Licensing restrictions
 * Trying to keep the binary size of the repo as small as possible (only the yaml files)
If your theme has an intended custom background image, include a comment in the yaml with a link to where people should download it.
## 
[](#community)
Community
All other Warp-related things can be discussed, please [contact us](/support-and-billing/sending-us-feedback).
## 
[](#open-source-dependencies)
Open source dependencies
We'd like to call out a few of the open-source themes and repositories that helped bootstrap the set of themes for Warp:
 * [iTerm colors pencil](https://github.com/mattly/iterm-colors-pencil)
 * [Alacritty-theme](https://github.com/eendroroy/alacritty-theme)
 * [base16-Alacritty](https://github.com/aarowill/base16-alacritty)
 * [base16](https://github.com/chriskempson/base16)
 * [Solarized](https://ethanschoonover.com/solarized/)
 * [Dracula](https://draculatheme.com/)
 * [Gruvbox](https://github.com/morhetz/gruvbox)
[PreviousThemes](/terminal/appearance/themes)[NextPrompt](/terminal/appearance/prompt)
Last updated 4 months ago
Was this helpful?