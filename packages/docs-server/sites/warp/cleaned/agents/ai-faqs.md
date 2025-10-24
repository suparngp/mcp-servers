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
 * [General](#general)
 * [What data is sent and/or stored when using Agents in Warp?](#what-data-is-sent-and-or-stored-when-using-agents-in-warp)
 * [What happened to the old Warp AI chat panel?](#what-happened-to-the-old-warp-ai-chat-panel)
 * [Is my data used for model training?](#is-my-data-used-for-model-training)
 * [What model are you using for Agent Mode?](#what-model-are-you-using-for-agent-mode)
 * [Can I use my own LLM API key?](#can-i-use-my-own-llm-api-key)
 * [Billing](#billing)
 * [Common AI error messages](#common-ai-error-messages)
 * [Gathering AI debugging ID](#gathering-ai-debugging-id)
Was this helpful?
## 
[](#general)
General
### 
[](#what-data-is-sent-and-or-stored-when-using-agents-in-warp)
What data is sent and/or stored when using Agents in Warp?
See our [Privacy Page](/privacy/privacy) for more information on how we handle data used by Agents in Warp.
### 
[](#what-happened-to-the-old-warp-ai-chat-panel)
What happened to the old Warp AI chat panel?
Agent Mode has replaced the Warp AI chat panel. Agent Mode is more powerful in all of the chat panel's use cases. Not only can Agent Mode run commands for you, it can also gather context without you needing to copy and paste. To start a similar chat panel, click the AI button in the menu bar to start on a new AI pane.
### 
[](#is-my-data-used-for-model-training)
Is my data used for model training?
No, Warp nor its providers (i.e. OpenAI, Anthropic, etc.) train on your data.
### 
[](#what-model-are-you-using-for-agent-mode)
What model are you using for Agent Mode?
Warp supports a curated list of LLMs from providers like OpenAI, Anthropic, and Gemini. To view the full list of supported models and learn how to switch between them, visit the [Model Choice](/agents/using-agents/model-choice) page.
### 
[](#can-i-use-my-own-llm-api-key)
Can I use my own LLM API key?
Organizations on the Enterprise plan can enable a “Bring Your Own LLM” option to meet strict security or compliance requirements. Our team will work closely with you to support your preferred LLM provider. This feature is not currently available on other plans.
## 
[](#billing)
Billing
Every Warp plan includes a set number of AI credits per user per month. Please refer to [pricing](https://www.warp.dev/pricing) to compare plans.
AI credit limits apply to Agent Mode, [Generate](/agents/generate), and [AI autofill in Workflows](/knowledge-and-collaboration/warp-drive/workflows#ai-autofill). When you have used up your allotted credits for the cycle, you will not be able to issue any more AI credits until the cycle renews.
For questions around what counts as a AI credit, what counts as a token, and how often credits refresh, please refer to [AI Credits](/support-and-billing/plans-and-pricing/ai-credits)and more on the [Plans & Pricing](/support-and-billing/plans-and-pricing)page.
## 
[](#common-ai-error-messages)
Common AI error messages
#### 
[](#message-token-limit-exceeded-error)
**"Message token limit exceeded" error**
This error means your input (plus attached context) exceeds the maximum context window of the model you're using. For example, GPT-4o has a context window limit of 123,904 tokens. If you exceed that, you may receive no output.
To fix this, try:
 * Starting a new conversation
 * Reducing the number of blocks or lines attached to your query
#### 
[](#monthly-request-limit-exceeded-or-monthly-credit-limit-exceeded-errors)
**"Monthly request limit exceeded" or "Monthly credit limit exceeded" errors**
Once you exceed your AI credits on the Turbo plan (see [pricing](https://www.warp.dev/pricing) for current limits), premium models will be disabled until your quota resets at the start of your next billing cycle.
**Request failed with error: QuotaLimit**
Once you exceed your AI token limits, all models will be disabled. Note that credits and tokens are calculated separately, and even though the plans may have a set number of credits, they also have a limited number of tokens.
**Request failed with error: ErrorStatus (403, "Your account has been blocked from using AI features")**
This message means your account has been blocked from using AI features, typically due to a violation of our [Terms of Service](https://www.warp.dev/terms-of-service) or suspected abuse (e.g. attempting to bypass credit or token limits).
To resolve or clarify this, please contact our team at [[email protected]](/cdn-cgi/l/email-protection#197869697c78756a596e786b69377d7c6f) if you believe this was an error. We'll review your case and respond as soon as possible.
Note that any error that does not mention [[email protected]](/cdn-cgi/l/email-protection) isn't related to being blocked and should be reported as feedback or a bug. See [Sending Feedback & Logs](/support-and-billing/sending-us-feedback) for more.
## 
[](#gathering-ai-debugging-id)
Gathering AI debugging ID
In cases where you have issues with the Agent, we may ask for the AI debugging ID to troubleshoot the specific conversation. To gather the debugging ID, see [Gathering AI debugging ID](/support-and-billing/sending-us-feedback#gathering-ai-debugging-id) for detailed steps.
[PreviousVoice](/agents/voice)[NextCode Overview](/code/code-overview)
Last updated 4 days ago
Was this helpful?