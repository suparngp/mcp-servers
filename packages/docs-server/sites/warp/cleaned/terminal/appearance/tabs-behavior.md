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
 * [Tab Indicators](#tab-indicators)
 * [How to toggle Tab Indicators](#how-to-toggle-tab-indicators)
 * [Tab Bar](#tab-bar)
 * [How to configure the Tab Bar](#how-to-configure-the-tab-bar)
 * [Tab Close Button](#tab-close-button)
 * [How to configure the Tab Close Button](#how-to-configure-the-tab-close-button)
 * [Recommended AI prompts](#recommended-ai-prompts)
 * [How to toggle recommended AI prompts](#how-to-toggle-recommended-ai-prompts)
Was this helpful?
## 
[](#tab-indicators)
Tab Indicators
Tab indicators provide visual cues in the tab bar under certain specific conditions: When the current pane is maximized, when panes or tabs are syncronized, and when a command exits with an error. These indicators serve as quick references.
### 
[](#how-to-toggle-tab-indicators)
How to toggle Tab Indicators
 * Navigate to `Settings > Appearance > Tabs`, and switch the "Show Tab Indicators" option.
 * Utilize the [Command Palette](/terminal/command-palette), then search for "Tab indicators" to toggle the tab indicators.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-e15caaccd0a3cd50fde45eb6333367d7522289a9%252Ftab-indicator-demo.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=f8ae52a3&sv=2)
Tab Indicator Demo
## 
[](#tab-bar)
Tab Bar
The tab bar provides easy navigation between open tabs. By default, the tab bar is visible in windowed mode but hides in fullscreen. To access the tab bar when hidden, hover near the top of the window. You can customize its visibility based on your preferences.
### 
[](#how-to-configure-the-tab-bar)
How to configure the Tab Bar
 * Navigate to `Settings > Appearance > Tabs > Show the tab bar` to toggle the visibility of the tab bar. Choose from the following options:
 * Always – Keeps the tab bar visible at all times.
 * Only on hover – Hides the tab bar in both modes.
 * When windowed – Displays the tab bar only in windowed mode.
 * Block dividers
On macOS, traffic lights will not be shown when in windowed mode if the tab bar is set to show only on hover.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-136a85d4addad0cd9dacd621aff494bce668fd5d%252Ftab-bar-demo.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=3aede5ca&sv=2)
Tab Bar Demo
## 
[](#tab-close-button)
Tab Close Button
You can configure the position of the Tab close button to be either on the left or right side of the tab.
### 
[](#how-to-configure-the-tab-close-button)
How to configure the Tab Close Button
Navigate to `Settings > Appearance > Tabs > Tab close button position`, then choose from the following options:
 * Left - the close button will be on the left side of the Tab (macOS style)
 * Right – the close button will be on the right side of the tab (Windows | Linux style) 
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Foy1EliItNj0xEHi6FKrC%252FCleanShot%25202025-07-03%2520at%252015.13.26.gif%3Falt%3Dmedia%26token%3D0ddcb755-9517-4902-8db2-e20d55dd34f4&width=768&dpr=4&quality=100&sign=961184a5&sv=2)
Tab close button demo
## 
[](#recommended-ai-prompts)
Recommended AI prompts
Recommended prompts can be shown in new tabs to help get quick help from Agent Mode with installing, coding, deploying, or something else.
### 
[](#how-to-toggle-recommended-ai-prompts)
How to toggle recommended AI prompts
 * Navigate to `Settings > Features > General`, and switch the "Recommend AI Prompts on new tab" option.
 * Utilize the [Command Palette](/terminal/command-palette), then search for "Recommend AI Prompts" to toggle.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FSb3ihWjH7I2oOZKnVaHu%252FCleanShot%25202025-06-02%2520at%252009.33.56.png%3Falt%3Dmedia%26token%3D1c780a74-88d9-4f8f-ae44-6fdcebeaa3d6&width=768&dpr=4&quality=100&sign=8d082b6e&sv=2)
Recommended AI Prompts in new tab
[PreviousBlocks Behavior](/terminal/appearance/blocks-behavior)[NextApp Icons](/terminal/appearance/app-icons)
Last updated 3 months ago
Was this helpful?