[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * * [Quickstart Guided](/)
 * [Migrate to Warp](/getting-started/migrate-to-warp)
 * [Supported Shells](/getting-started/supported-shells)
 * [Keyboard Shortcuts](/getting-started/keyboard-shortcuts)
 * [Changelog](/getting-started/changelog)
 * * [Agents Overview](/agents/agents-overview)
 * [Using Agents](/agents/using-agents)
 * [Agent Conversations](/agents/using-agents/agent-conversations)
 * [Agent Context](/agents/using-agents/agent-context)
 * [Managing Agents](/agents/using-agents/managing-agents)
 * [Agent Profiles & Permissions](/agents/using-agents/agent-profiles-permissions)
 * [Agent Task Lists](/agents/using-agents/agent-tasklists)
 * [Model Choice](/agents/using-agents/model-choice)
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
 * [Available models](#available-models)
 * [Auto Models](#auto-models)
 * [How to change models](#how-to-change-models)
 * [Configuring models per Agent Profile](#configuring-models-per-agent-profile)
Was this helpful?
## 
[](#available-models)
Available models
Warp lets you choose from a curated set of Large Language Models (LLMs) to power your Agentic Development Environment.
**Warp supports the following models:**
 * OpenAI: `GPT-5` (select between _low, medium,_ and _high_ reasoning modes)
 * Anthropic: `Claude Sonnet 4.5`, `Claude Opus 4.1`, `Claude Haiku 4.5` , `Claude Sonnet 4`
 * Google: `Gemini 2.5 Pro`
### 
[](#auto-models)
Auto Models
Warp also offers two _Auto_ modes that intelligently select the best model for your task based on the context and request type:
 1. **Auto (Cost-efficient)** : Optimizes for lower credit consumption while maintaining strong output quality, helping extend your available usage.
 2. **Auto (Responsiveness)** : Prioritizes the highest-quality results using the fastest available model, though it may consume credits more quickly.
Both Auto models perform well across all agent workflows and are ideal if you prefer Warp to manage model selection dynamically.
### 
[](#how-to-change-models)
How to change models
You can use the model picker in your prompt input to quickly switch between models. The currently active model appears directly in the input editor.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FrAPu78L6xKATO5gSYLAK%252Fimage.png%3Falt%3Dmedia%26token%3D2d72c56b-331b-419b-a0f4-3e44fe431c5c&width=768&dpr=4&quality=100&sign=881faf6d&sv=2)
Model selector in Warp's Universal Input.
To change models, click the displayed model name (for example, _Claude Sonnet 4.5_) to open a dropdown with all supported options. Your selection will automatically persist for future prompts.
### 
[](#configuring-models-per-agent-profile)
Configuring models per Agent Profile
You can configure the base and planning models for each [Agent Profiles & Permissions](/agents/using-agents/agent-profiles-permissions), defining the Agent’s autonomy, tool access, and other permissions. 
Edit your default profile or more profiles directly in `Settings > AI > Agents > Profiles`.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fw36LG9PBswBHP1VXxGEb%252Fimage.png%3Falt%3Dmedia%26token%3D2a1b5412-41ff-49c1-8d57-7675ff88d680&width=768&dpr=4&quality=100&sign=d494e15c&sv=2)
Model choice example, where the base model is Auto (Claude 4 Sonnet) and the planning model is o3.
[PreviousAgent Task Lists](/agents/using-agents/agent-tasklists)[NextSlash Commands](/agents/slash-commands)
Last updated 4 days ago
Was this helpful?