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
 * [AI Credits](/support-and-billing/plans-and-pricing/ai-credits)
 * [Overages](/support-and-billing/plans-and-pricing/usage-overages)
 * [Updating Warp](/support-and-billing/updating-warp)
 * [Using Warp Offline](/support-and-billing/using-warp-offline)
 * [Logging Out & Uninstalling](/support-and-billing/uninstalling-warp)
 * [Known Issues](/support-and-billing/known-issues)
 * [Troubleshooting Login](/support-and-billing/troubleshooting-login-issues)
 * [Open Source Licenses](/support-and-billing/licenses)
[Powered by GitBook](https://www.gitbook.com/?utm_source=content&utm_medium=trademark&utm_campaign=-MbqIgTw17KQvq_DQuRr)
 * [What are Warp AI credits?](#what-are-warp-ai-credits)
 * [How are Warp AI credits calculated?](#how-are-warp-ai-credits-calculated)
Was this helpful?
### 
[](#what-are-warp-ai-credits)
What are Warp AI credits?
Each time you submit a prompt in Warp, whether to generate code, suggest a command, or accomplish a task, you initiate an interaction with the Agent. 
This interaction consumes **at least one AI credit** , though more complex interactions may use **multiple credits**. The number of credits consumed can vary based on factors such as your codebase and environment, the model used, number of tool calls the agent makes, amount of context gathered, steps required to accomplish the given task, and other factors. 
Because of these factors and the nature of LLMs, AI credit usage is **non-deterministic** -- two similar prompts can still use a different number of credits.
For a general breakdown of what factors contribute to how many AI credits are consumed, please refer to: [How are Warp AI credits calculated?](/support-and-billing/plans-and-pricing/ai-credits#how-are-warp-ai-credits-calculated)
Since there's no exact formula for predicting usage, we recommend building an intuitive understanding by experimenting with different prompts, models, and tracking how many credits they consume.
**Tracking your AI****credit usage**
In an Agent conversation, a **turn** represents a single exchange (a response from the LLM). To see how many credits a turn consumed, hover over the **credit count chip** at the bottom of the Agent's response:
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252F7xw9hyR4FDzIJLDX424e%252Fimage.png%3Falt%3Dmedia%26token%3D73e91486-e802-45a7-b5b5-75dde6e2dc36&width=768&dpr=4&quality=100&sign=a0dd4953&sv=2)
The conversation AI usage footer shows how many credits a conversation has consumed, and breaks down the usage by credits, tool calls, context window, files changed, diffs applied, and more.
You can view your total AI credit usage, along with other billing details, in `Settings > Billing and usage`.
#### 
[](#credit-limits-and-billing)
Credit**limits and billing**
 * **Seat-level allocation** : on team plans, credit limits apply per seat — each team member has their own allowance.
 * **Hitting the credit limits** : Once you hit your monthly credit limit, your access will depend on your plan. On the Free plan, AI access stops until your next billing cycle. On paid plans with overages enabled, you can continue using AI with [**usage-based billing**](/support-and-billing/plans-and-pricing/usage-overages), charged per extra credit.
#### 
[](#other-features-that-use-ai-credits)
**Other features that use AI** credit**s**
In addition to direct Agent conversations, the following features also consume AI credits:
 * [Generate](/agents/generate) helps you look up commands and suggestions as you type. As you refine your input, multiple credits may be used before you select a final suggestion.
 * [AI Autofill in Workflows](/knowledge-and-collaboration/warp-drive/workflows#ai-autofill) count as a credit each time it is run.
Regular shell commands in Warp do not consume or count towards AI credits.
### 
[](#how-are-warp-ai-credits-calculated)
How are Warp AI credits calculated?
An **AI credit** in Warp is a unit of work representing the total processing required to complete an interaction with an AI Agent. It is **not** the same as “one user message” — instead, it scales with the number of tokens processed during the interaction.
In short: **the more tokens used, the more AI** credit**s consumed**.
Several factors influence how many credits are counted for a single interaction:
#### 
[](#id-1.-the-llm-model-used)
**1. The LLM model used**
Generally, smaller, faster models typically consume fewer credits than larger, reasoning-based models. For example, **Claude Opus 4.1** tends to consume the most tokens and credits in Warp, followed by **Claude Sonnet 4, GPT-5, Gemini 2.5 Pro** , and others in roughly that order. This generally correlates with model pricing as well.
**Tip** : If your task doesn't require deep reasoning, planning, or multi-step problem solving, choose a more lightweight model to reduce credit usage.
#### 
[](#id-2.-tool-calls-triggered-by-the-agent)
2. Tool calls triggered by the Agent
Warp's Agents make a variety of tool calls, including:
 * Searching for files (grep)
 * Retrieving and reading files
 * Making and applying code diffs
 * Gathering web or documentation context
 * Running other utilities
Some prompts require only a couple of tool calls, while others may trigger many — especially if the Agent needs to explore your development environment, navigate a large codebase, or apply complex changes. **More tool calls = more credits**.
#### 
[](#id-3.-task-complexity-and-number-of-steps)
3. Task complexity and number of steps
Some tasks are straightforward and may require only a single quick response, without much thinking or reasoning. Others can involve multiple stages—such as planning, generating intermediate outputs, verifying results, applying changes, and self-correcting—each of which can add to the credits count.
**Tip** : Keep tasks that you give to the Agent well-scoped, work incrementally, and break large changes into smaller, contained steps.
#### 
[](#id-4.-amount-of-context-passed-to-the-model)
4. Amount of context passed to the model
Prompts that include large amounts of context (such as [attached blocks](/agents/using-agents/agent-context#attaching-blocks-as-context), long user query messages, etc.) or file attachments like [images](/agents/using-agents/agent-context#attaching-images-as-context) may also increase the number of credits used due to increased token consumption.
**Tip** : When sharing logs, code, or other large pieces of content, attach only the most relevant portions instead of full outputs.
#### 
[](#id-5.-prompt-caching-hits-and-misses)
5. Prompt caching (hits and misses)
Many model prompts include repeated content, like system instructions:
 * **Cache hits** : if the model provider can match a prefix or a part of the prompt from a past request, it can reuse results from the cache, reducing both tokens consumed and latency.
 * **Cache misses** : if no match is found, the full prompt may be processed again, which can increase credit consumption.
Because cache results depend on model provider behavior and timing, two similar prompts may still have different credit counts, depending on when you run the commands. 
**Tip** : Work in a continuous session when possible to improve cache hit rates.
These are the most common factors affecting credit usage, though there are others. Understanding them can help you manage your credits more efficiently and get the most from your plan.
[PreviousPlans & Pricing](/support-and-billing/plans-and-pricing)[NextOverages](/support-and-billing/plans-and-pricing/usage-overages)
Last updated 15 days ago
Was this helpful?