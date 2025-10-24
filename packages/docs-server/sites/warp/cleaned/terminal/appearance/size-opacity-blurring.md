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
 * [How to use it](#how-to-use-it)
 * [Window Size](#window-size)
 * [Window Opacity](#window-opacity)
 * [Window Blurring](#window-blurring)
 * [How it works](#how-it-works)
 * [Troubleshooting transparency on Windows](#troubleshooting-transparency-on-windows)
Was this helpful?
## 
[](#how-to-use-it)
How to use it
### 
[](#window-size)
Window Size
To access size settings, go to `Settings > Appearance > Window`.
 * Enable "Open new windows with custom size", Then configure your preferred columns and rows.
If [Session Restoration](/terminal/sessions/session-restoration) is enabled, Warp will restore the size of the last window closed when you quit the app. Either make sure the custom-sized window is the last one closed, or disable Session Restoration to ensure Warp launches with the custom-sized window.
### 
[](#window-opacity)
Window Opacity
To access it, go to `Settings > Appearance > Themes`
 * The slider supports setting the opacity value between `1` and `100` where `100` is completely opaque or solid.
### 
[](#window-blurring)
Window Blurring
After decreasing Opacity (moving the slider to a value less than `100`), you can also blur the background.
 * On MacOS, this is done using the blur slider. Increasing the slider increases the blur radius that's applied to the background image.
 * On Windows, this is done by toggling the Acrylic background texture on or off.
On macOS, large blur radiuses may affect performance, especially on Retina displays.
On Linux, window blurring is not supported.
On Windows, some graphics drivers may not support rendering transparent or translucent windows. See below for troubleshooting tips.
## 
[](#how-it-works)
How it works
![Window Size Demo](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-79a7d9b64b98fad12b103e20f755d20d59d1f88c%252Fwindow_size_demo.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=292a7ba3&sv=2)
Window Size Demo
Window Opacity and Blurring Demo
### 
[](#troubleshooting-transparency-on-windows)
Troubleshooting transparency on Windows
At the moment, window opacity in Warp on Windows **does not work** in the following circumstances:
 * When using DirectX 12 as the rendering backend
 * When using any rendering backend with an Nvidia GPU when "Auto" or "Prefer layered" is selected as the value for "Vulkan/OpenGL present method" in NVIDIA Control Panel > Manage 3D Settings
Some graphics drivers and rendering backends may not support rendering transparent windows.
You can select the Vulkan or OpenGL graphics backend to render new Warp windows in the Settings menu, under `Features` > `System` > `Preferred graphics backend`.
You can also opt to render new Warp windows with an integrated GPU, under `Features` > `System` > `Prefer rendering new windows with integrated GPU (low power)`.
[PreviousText, Fonts, & Cursor](/terminal/appearance/text-fonts-cursor)[NextPane Dimming & Focus](/terminal/appearance/pane-dimming)
Last updated 4 months ago
Was this helpful?