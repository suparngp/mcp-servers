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
 * [Block Basics](/terminal/blocks/block-basics)
 * [Block Actions](/terminal/blocks/block-actions)
 * [Block Sharing](/terminal/blocks/block-sharing)
 * [Block Find](/terminal/blocks/find)
 * [Block Filtering](/terminal/blocks/block-filtering)
 * [Background Blocks](/terminal/blocks/background-blocks)
 * [Sticky Command Header](/terminal/blocks/sticky-command-header)
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
 * [What is it](#what-is-it)
 * [How to use it](#how-to-use-it)
 * [How it works](#how-it-works)
 * [Troubleshooting Background Blocks](#troubleshooting-background-blocks)
Was this helpful?
## 
[](#what-is-it)
What is it
Commands can start background processes that continue even after they exit. You can also start a background process directly from the shell, such as by running it with `&`.
If Warp receives output that is likely from a background process, the output goes into a _background block_. Background blocks act like regular blocks, except that they don't have an associated command.
This lets you use all of Warp's block features with background output, such as sharing and bookmarking.
## 
[](#how-to-use-it)
How to use it
Background blocks are automatically created as needed, in between regular blocks running. If you run commands while a background process is still producing output, that output gets split into multiple blocks interleaved with your commands.
## 
[](#how-it-works)
How it works
Create Background Blocks
## 
[](#troubleshooting-background-blocks)
Troubleshooting Background Blocks
There are some limitations, because Warp doesn't know _which_ process any given output came from:
 * If a background process writes output while a foreground command is running in a regular block, the output goes into that block.
 * If there are multiple background processes running at the same time, their output may be mixed together.
In addition, if you start entering a command while another one is running (typeahead), in some cases Warp will mistake the partial command for background output. The most common cause is editing typeahead when using bash versions older than 4.0 (for example, deleting and re-typing part of it).
[PreviousBlock Filtering](/terminal/blocks/block-filtering)[NextSticky Command Header](/terminal/blocks/sticky-command-header)
Last updated 1 year ago
Was this helpful?