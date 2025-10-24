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
 * [Accessibility](/terminal/more-features/accessibility)
 * [Files, Links, & Scripts](/terminal/more-features/files-and-links)
 * [Markdown Viewer](/terminal/more-features/markdown-viewer)
 * [Working Directory](/terminal/more-features/working-directory)
 * [Text Selection](/terminal/more-features/text-selection)
 * [Full-screen Apps](/terminal/more-features/full-screen-apps)
 * [Desktop Notifications](/terminal/more-features/notifications)
 * [Audible Bell](/terminal/more-features/audible-bell)
 * [Settings Sync (Beta)](/terminal/more-features/settings-sync)
 * [Quit Warning](/terminal/more-features/quit-warning)
 * [URI Scheme](/terminal/more-features/uri-scheme)
 * [Linux](/terminal/more-features/linux)
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
 * [How to use Warp with Voice Over?](#how-to-use-warp-with-voice-over)
 * [Differences from the regular VoiceOver workflow](#differences-from-the-regular-voiceover-workflow)
 * [A11y specific actions](#a11y-specific-actions)
 * [Voice Input](#voice-input)
 * [Future work](#future-work)
Was this helpful?
Note that currently, these instructions are for macOS only. Warp doesn't support screen readers on Linux or Windows and it's being tracked here: <https://github.com/warpdotdev/Warp/issues/3847>
We recognize the need to improve the experience for those visually impaired, as - to our best knowledge - other terminal emulator apps didn't do a good job in this area. This doc summarizes what we've done so far, how Warp works with VoiceOver, and outlines the main changes from the typical workflow. For the features documentation and its keyboard shortcuts, please go to the feature-specific page in the documentation.
**Keep in mind that this is a work-in-progress and the current state is not a final state of accessibility in Warp**.
## 
[](#how-to-use-warp-with-voice-over)
How to use Warp with Voice Over?
The best way to start working with Warp & VoiceOver is to install it using Homebrew:
`brew install warp`
This will ensure that you can receive all future updates automatically, without the need to go through a macOS standard drag-and-drop installation process.
From there, Warp should seamlessly work with VoiceOver and start announcing what's happening on the screen and what actions you can take. This may be a major difference from other apps - as Warp announces stuff on its own, letting you know what's going on. There's currently no way to navigate between different UI elements using VO key combinations.
Once installed, it will ask you to log in. Warp also sends telemetry that we use to improve the overall user experience. You can find out more about that in the [privacy section](/privacy/privacy).
The login flow will require you to navigate between the app and your browser. The last step before you can start enjoying our new terminal app is filling up the onboarding survey.
The main terminal window is not that different from other terminals - there's a place to type commands (Command Input) and a list of the previously executed commands and their outputs. Warp groups those together - each command and output create a Block. You can navigate blocks with your keyboard to easily check what was the command, learn whether it was successful or not, and what was the output, as well as more easily copy the command, output, or both for further processing.
A main entry point for discovering new features and actions is our Command Palette, which you can access by executing the cmd-p shortcut.
## 
[](#differences-from-the-regular-voiceover-workflow)
Differences from the regular VoiceOver workflow
As you may notice, typical Voice Over navigation keys or settings do not currently work in Warp. In short - it's related to how our UI Framework is currently implemented and that as of now we don't yet offer a keyboard-accessible way to navigate the UI elements.
Instead, whenever you perform an action and/or something happens in the background, Warp announces it to you, letting you know what's going on and what possible actions you can take. Since it's a terminal, we care about all user actions being keyboard accessible from the start, so pretty much all our features have the assigned keybindings already. You can adjust the default keybindings following the guide from this GitHub repository: <https://github.com/warpdotdev/keysets>. You can also always fall back to using cmd-p to check the keybinding or execute the specific action.
### 
[](#a11y-specific-actions)
A11y specific actions
Some a11y-specific settings are available through the command palette. For example, you can adjust the verbosity level of messages. Simply enter the [Command Palette](/terminal/command-palette) and type "a11y" to discover related options and their keybindings.
### 
[](#voice-input)
Voice Input
Warp supports voice input as an alternative way to interact with your terminal. This can be especially helpful for users who prefer or require voice commands over typing. You can use voice input to:
 * Issue terminal commands
 * Ask questions about command usage
 * Perform complex multi-step operations
Voice input can be enabled in `Settings > AI > Voice`. For detailed information about voice features and setup, see our [Voice documentation](/agents/voice).
## 
[](#future-work)
Future work
While not all Warp features are accessible yet, we've implemented a process around releasing new features and changes to the main app, to ensure that all new code provides proper a11y announcements.
This is not the ideal and final implementation. We're happy to hear your thoughts and ideas on how we can improve. The biggest milestone for this work is to add support for navigating the UI elements using the keyboard. Give Warp a try, and please, do not hesitate to [share your feedback](/support-and-billing/sending-us-feedback).
[PreviousMore Features](/terminal/more-features)[NextFiles, Links, & Scripts](/terminal/more-features/files-and-links)
Last updated 1 month ago
Was this helpful?