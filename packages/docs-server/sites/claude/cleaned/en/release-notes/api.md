Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Release Notes
Claude Developer Platform
[Welcome](/en/home)[Claude Developer Platform](/en/docs/intro)[Claude Code](/en/docs/claude-code/overview)[Model Context Protocol (MCP)](/en/docs/mcp)[API Reference](/en/api/messages)[Resources](/en/resources/overview)[Release Notes](/en/release-notes/overview)
##### Release Notes
 * [Overview](/en/release-notes/overview)
 * [Claude Developer Platform](/en/release-notes/api)
 * [Claude Apps](/en/release-notes/claude-apps)
 * [System Prompts](/en/release-notes/system-prompts)
 * [Claude Code](/en/release-notes/claude-code)
On this page
 * [October 16, 2025](#october-16%2C-2025)
 * [October 15, 2025](#october-15%2C-2025)
 * [September 29, 2025](#september-29%2C-2025)
 * [September 17, 2025](#september-17%2C-2025)
 * [September 16, 2025](#september-16%2C-2025)
 * [September 10, 2025](#september-10%2C-2025)
 * [September 8, 2025](#september-8%2C-2025)
 * [September 5, 2025](#september-5%2C-2025)
 * [September 3, 2025](#september-3%2C-2025)
 * [September 2, 2025](#september-2%2C-2025)
 * [August 27, 2025](#august-27%2C-2025)
 * [August 26, 2025](#august-26%2C-2025)
 * [August 19, 2025](#august-19%2C-2025)
 * [August 18, 2025](#august-18%2C-2025)
 * [August 13, 2025](#august-13%2C-2025)
 * [August 12, 2025](#august-12%2C-2025)
 * [August 11, 2025](#august-11%2C-2025)
 * [August 8, 2025](#august-8%2C-2025)
 * [August 5, 2025](#august-5%2C-2025)
 * [July 28, 2025](#july-28%2C-2025)
 * [July 24, 2025](#july-24%2C-2025)
 * [July 21, 2025](#july-21%2C-2025)
 * [July 17, 2025](#july-17%2C-2025)
 * [July 3, 2025](#july-3%2C-2025)
 * [June 30, 2025](#june-30%2C-2025)
 * [June 23, 2025](#june-23%2C-2025)
 * [June 11, 2025](#june-11%2C-2025)
 * [May 22, 2025](#may-22%2C-2025)
 * [May 21, 2025](#may-21%2C-2025)
 * [May 7, 2025](#may-7%2C-2025)
 * [May 1, 2025](#may-1%2C-2025)
 * [April 9th, 2025](#april-9th%2C-2025)
 * [March 31st, 2025](#march-31st%2C-2025)
 * [February 27th, 2025](#february-27th%2C-2025)
 * [February 24th, 2025](#february-24th%2C-2025)
 * [February 10th, 2025](#february-10th%2C-2025)
 * [January 31st, 2025](#january-31st%2C-2025)
 * [January 23rd, 2025](#january-23rd%2C-2025)
 * [January 21st, 2025](#january-21st%2C-2025)
 * [January 15th, 2025](#january-15th%2C-2025)
 * [January 10th, 2025](#january-10th%2C-2025)
 * [December 19th, 2024](#december-19th%2C-2024)
 * [December 17th, 2024](#december-17th%2C-2024)
 * [December 4th, 2024](#december-4th%2C-2024)
 * [November 21st, 2024](#november-21st%2C-2024)
 * [November 20th, 2024](#november-20th%2C-2024)
 * [November 13th, 2024](#november-13th%2C-2024)
 * [November 6th, 2024](#november-6th%2C-2024)
 * [November 4th, 2024](#november-4th%2C-2024)
 * [November 1st, 2024](#november-1st%2C-2024)
 * [October 22nd, 2024](#october-22nd%2C-2024)
 * [October 8th, 2024](#october-8th%2C-2024)
 * [October 3rd, 2024](#october-3rd%2C-2024)
 * [September 10th, 2024](#september-10th%2C-2024)
 * [September 4th, 2024](#september-4th%2C-2024)
 * [August 22nd, 2024](#august-22nd%2C-2024)
 * [August 19th, 2024](#august-19th%2C-2024)
 * [August 14th, 2024](#august-14th%2C-2024)
 * [July 15th, 2024](#july-15th%2C-2024)
 * [July 9th, 2024](#july-9th%2C-2024)
 * [June 27th, 2024](#june-27th%2C-2024)
 * [June 20th, 2024](#june-20th%2C-2024)
 * [May 30th, 2024](#may-30th%2C-2024)
 * [May 10th, 2024](#may-10th%2C-2024)
#### 
[​](#october-16%2C-2025)
October 16, 2025
 * We’ve launched [Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) (`skills-2025-10-02` beta), a new way to extend Claude’s capabilities. Skills are organized folders of instructions, scripts, and resources that Claude loads dynamically to perform specialized tasks. The initial release includes:
 * **Anthropic-managed Skills** : Pre-built Skills for working with PowerPoint (.pptx), Excel (.xlsx), Word (.docx), and PDF files
 * **Custom Skills** : Upload your own Skills via the Skills API (`/v1/skills` endpoints) to package domain expertise and organizational workflows
 * Skills require the [code execution tool](/en/docs/agents-and-tools/tool-use/code-execution-tool) to be enabled
 * Learn more in our [Agent Skills documentation](/en/docs/agents-and-tools/agent-skills/overview) and [API reference](/en/api/skills/create-skill)
#### 
[​](#october-15%2C-2025)
October 15, 2025
 * We’ve launched [Claude Haiku 4.5](https://www.anthropic.com/news/claude-haiku-4-5), our fastest and most intelligent Haiku model with near-frontier performance. Ideal for real-time applications, high-volume processing, and cost-sensitive deployments requiring strong reasoning. Learn more in our [Models & Pricing documentation](/en/docs/about-claude/models).
#### 
[​](#september-29%2C-2025)
September 29, 2025
 * We’ve launched [Claude Sonnet 4.5](https://www.anthropic.com/news/claude-sonnet-4-5), our best model for complex agents and coding, with the highest intelligence across most tasks. Learn more in [What’s new in Claude 4.5](/en/docs/about-claude/models/whats-new-claude-4-5).
 * We’ve introduced [global endpoint pricing](/en/docs/about-claude/pricing#third-party-platform-pricing) for AWS Bedrock and Google Vertex AI. The Claude API (1P) pricing is unaffected.
 * We’ve introduced a new stop reason `model_context_window_exceeded` that allows you to request the maximum possible tokens without calculating input size. Learn more in our [handling stop reasons documentation](/en/api/handling-stop-reasons).
 * We’ve launched the memory tool in beta, enabling Claude to store and consult information across conversations. Learn more in our [memory tool documentation](/en/docs/agents-and-tools/tool-use/memory-tool).
 * We’ve launched context editing in beta, providing strategies to automatically manage conversation context. The initial release supports clearing older tool results and calls when approaching token limits. Learn more in our [context editing documentation](/en/docs/build-with-claude/context-editing).
#### 
[​](#september-17%2C-2025)
September 17, 2025
 * We’ve launched tool helpers in beta for the Python and TypeScript SDKs, simplifying tool creation and execution with type-safe input validation and a tool runner for automated tool handling in conversations. For details, see the documentation for [the Python SDK](https://github.com/anthropics/anthropic-sdk-python/blob/main/tools.md) and [the TypeScript SDK](https://github.com/anthropics/anthropic-sdk-typescript/blob/main/helpers.md#tool-helpers).
#### 
[​](#september-16%2C-2025)
September 16, 2025
 * We’ve unified our developer offerings under the Claude brand. You should see updated naming and URLs across our platform and documentation, but **our developer interfaces will remain the same**. Here are some notable changes:
 * Anthropic Console ([console.anthropic.com](https://console.anthropic.com)) → Claude Console ([platform.claude.com](https://platform.claude.com)). The console will be available at both URLs until December 16, 2025. After that date, [console.anthropic.com](https://console.anthropic.com) will automatically redirect to [platform.claude.com](https://platform.claude.com).
 * Anthropic Docs ([docs.claude.com](https://docs.claude.com)) → Claude Docs ([docs.claude.com](https://docs.claude.com))
 * Anthropic Help Center ([support.claude.com](https://support.claude.com)) → Claude Help Center ([support.claude.com](https://support.claude.com))
 * API endpoints, headers, environment variables, and SDKs remain the same. Your existing integrations will continue working without any changes.
#### 
[​](#september-10%2C-2025)
September 10, 2025
 * We’ve launched the web fetch tool in beta, allowing Claude to retrieve full content from specified web pages and PDF documents. Learn more in our [web fetch tool documentation](/en/docs/agents-and-tools/tool-use/web-fetch-tool).
 * We’ve launched the [Claude Code Analytics API](/en/api/claude-code-analytics-api), enabling organizations to programmatically access daily aggregated usage metrics for Claude Code, including productivity metrics, tool usage statistics, and cost data.
#### 
[​](#september-8%2C-2025)
September 8, 2025
 * We launched a beta version of the [C# SDK](https://github.com/anthropics/anthropic-sdk-csharp).
#### 
[​](#september-5%2C-2025)
September 5, 2025
 * We’ve launched [rate limit charts](/en/api/rate-limits#monitoring-your-rate-limits-in-the-console) in the Console [Usage](https://console.anthropic.com/settings/usage) page, allowing you to monitor your API rate limit usage and caching rates over time.
#### 
[​](#september-3%2C-2025)
September 3, 2025
 * We’ve launched support for citable documents in client-side tool results. Learn more in our [tool use documentation](en/docs/agents-and-tools/tool-use/implement-tool-use.mdx).
#### 
[​](#september-2%2C-2025)
September 2, 2025
 * We’ve launched v2 of the [Code Execution Tool](/en/docs/agents-and-tools/tool-use/code-execution-tool) in public beta, replacing the original Python-only tool with Bash command execution and direct file manipulation capabilities, including writing code in other languages.
#### 
[​](#august-27%2C-2025)
August 27, 2025
 * We launched a beta version of the [PHP SDK](https://github.com/anthropics/anthropic-sdk-php).
#### 
[​](#august-26%2C-2025)
August 26, 2025
 * We’ve increased rate limits on the [1M token context window](/en/docs/build-with-claude/context-windows#1m-token-context-window) for Claude Sonnet 4 on the Claude API. For more information, see [Long context rate limits](/en/api/rate-limits#long-context-rate-limits).
 * The 1m token context window is now available on Google Cloud’s Vertex AI. For more information, see [Claude on Vertex AI](/en/api/claude-on-vertex-ai).
#### 
[​](#august-19%2C-2025)
August 19, 2025
 * Request IDs are now included directly in error response bodies alongside the existing `request-id` header. Learn more in our [error documentation](/en/api/errors#error-shapes).
#### 
[​](#august-18%2C-2025)
August 18, 2025
 * We’ve released the [Usage & Cost API](/en/api/usage-cost-api), allowing administrators to programmatically monitor their organization’s usage and cost data.
 * We’ve added a new endpoint to the Admin API for retrieving organization information. For details, see the [Organization Info Admin API reference](/en/api/admin-api/organization/get-me).
#### 
[​](#august-13%2C-2025)
August 13, 2025
 * We announced the deprecation of the Claude Sonnet 3.5 models (`claude-3-5-sonnet-20240620` and `claude-3-5-sonnet-20241022`). These models will be retired on October 22, 2025. We recommend migrating to Claude Sonnet 4.5 (`claude-sonnet-4-5-20250929`) for improved performance and capabilities. Read more in the [Model deprecations documentation](/en/docs/about-claude/model-deprecations).
 * The 1-hour cache duration for prompt caching is now generally available. You can now use the extended cache TTL without a beta header. Learn more in our [prompt caching documentation](/en/docs/build-with-claude/prompt-caching#1-hour-cache-duration).
#### 
[​](#august-12%2C-2025)
August 12, 2025
 * We’ve launched beta support for a [1M token context window](/en/docs/build-with-claude/context-windows#1m-token-context-window) in Claude Sonnet 4 on the Claude API and Amazon Bedrock.
#### 
[​](#august-11%2C-2025)
August 11, 2025
 * Some customers might encounter 429 (`rate_limit_error`) [errors](/en/api/errors) following a sharp increase in API usage due to acceleration limits on the API. Previously, 529 (`overloaded_error`) errors would occur in similar scenarios.
#### 
[​](#august-8%2C-2025)
August 8, 2025
 * Search result content blocks are now generally available on the Claude API and Google Cloud’s Vertex AI. This feature enables natural citations for RAG applications with proper source attribution. The beta header `search-results-2025-06-09` is no longer required. Learn more in our [search results documentation](/en/docs/build-with-claude/search-results).
#### 
[​](#august-5%2C-2025)
August 5, 2025
 * We’ve launched [Claude Opus 4.1](https://www.anthropic.com/news/claude-opus-4-1), an incremental update to Claude Opus 4 with enhanced capabilities and performance improvements.* Learn more in our [Models & Pricing documentation](/en/docs/about-claude/models).
_* - Opus 4.1 does not allow both`temperature` and `top_p` parameters to be specified. Please use only one. _
#### 
[​](#july-28%2C-2025)
July 28, 2025
 * We’ve released `text_editor_20250728`, an updated text editor tool that fixes some issues from the previous versions and adds an optional `max_characters` parameter that allows you to control the truncation length when viewing large files.
#### 
[​](#july-24%2C-2025)
July 24, 2025
 * We’ve increased [rate limits](/en/api/rate-limits) for Claude Opus 4 on the Claude API to give you more capacity to build and scale with Claude. For customers with [usage tier 1-4 rate limits](/en/api/rate-limits#rate-limits), these changes apply immediately to your account - no action needed.
#### 
[​](#july-21%2C-2025)
July 21, 2025
 * We’ve retired the Claude 2.0, Claude 2.1, and Claude Sonnet 3 models. All requests to these models will now return an error. Read more in [our documentation](/en/docs/about-claude/model-deprecations).
#### 
[​](#july-17%2C-2025)
July 17, 2025
 * We’ve increased [rate limits](/en/api/rate-limits) for Claude Sonnet 4 on the Claude API to give you more capacity to build and scale with Claude. For customers with [usage tier 1-4 rate limits](/en/api/rate-limits#rate-limits), these changes apply immediately to your account - no action needed.
#### 
[​](#july-3%2C-2025)
July 3, 2025
 * We’ve launched search result content blocks in beta, enabling natural citations for RAG applications. Tools can now return search results with proper source attribution, and Claude will automatically cite these sources in its responses - matching the citation quality of web search. This eliminates the need for document workarounds in custom knowledge base applications. Learn more in our [search results documentation](/en/docs/build-with-claude/search-results). To enable this feature, use the beta header `search-results-2025-06-09`.
#### 
[​](#june-30%2C-2025)
June 30, 2025
 * We announced the deprecation of the Claude Opus 3 model. Read more in [our documentation](/en/docs/about-claude/model-deprecations).
#### 
[​](#june-23%2C-2025)
June 23, 2025
 * Console users with the Developer role can now access the [Cost](https://console.anthropic.com/settings/cost) page. Previously, the Developer role allowed access to the [Usage](https://console.anthropic.com/settings/usage) page, but not the Cost page.
#### 
[​](#june-11%2C-2025)
June 11, 2025
 * We’ve launched [fine-grained tool streaming](/en/docs/agents-and-tools/tool-use/fine-grained-tool-streaming) in public beta, a feature that enables Claude to stream tool use parameters without buffering / JSON validation. To enable fine-grained tool streaming, use the [beta header](/en/api/beta-headers) `fine-grained-tool-streaming-2025-05-14`.
#### 
[​](#may-22%2C-2025)
May 22, 2025
 * We’ve launched [Claude Opus 4 and Claude Sonnet 4](http://www.anthropic.com/news/claude-4), our latest models with extended thinking capabilities. Learn more in our [Models & Pricing documentation](/en/docs/about-claude/models).
 * The default behavior of [extended thinking](/en/docs/build-with-claude/extended-thinking) in Claude 4 models returns a summary of Claude’s full thinking process, with the full thinking encrypted and returned in the `signature` field of `thinking` block output.
 * We’ve launched [interleaved thinking](/en/docs/build-with-claude/extended-thinking#interleaved-thinking) in public beta, a feature that enables Claude to think in between tool calls. To enable interleaved thinking, use the [beta header](/en/api/beta-headers) `interleaved-thinking-2025-05-14`.
 * We’ve launched the [Files API](/en/docs/build-with-claude/files) in public beta, enabling you to upload files and reference them in the Messages API and code execution tool.
 * We’ve launched the [Code execution tool](/en/docs/agents-and-tools/tool-use/code-execution-tool) in public beta, a tool that enables Claude to execute Python code in a secure, sandboxed environment.
 * We’ve launched the [MCP connector](/en/docs/agents-and-tools/mcp-connector) in public beta, a feature that allows you to connect to remote MCP servers directly from the Messages API.
 * To increase answer quality and decrease tool errors, we’ve changed the default value for the `top_p` [nucleus sampling](https://en.wikipedia.org/wiki/Top-p_sampling) parameter in the Messages API from 0.999 to 0.99 for all models. To revert this change, set `top_p` to 0.999. Additionally, when extended thinking is enabled, you can now set `top_p` to values between 0.95 and 1.
 * We’ve moved our [Go SDK](https://github.com/anthropics/anthropic-sdk-go) from beta to GA.
 * We’ve included minute and hour level granularity to the [Usage](https://console.anthropic.com/settings/usage) page of Console alongside 429 error rates on the Usage page.
#### 
[​](#may-21%2C-2025)
May 21, 2025
 * We’ve moved our [Ruby SDK](https://github.com/anthropics/anthropic-sdk-ruby) from beta to GA.
#### 
[​](#may-7%2C-2025)
May 7, 2025
 * We’ve launched a web search tool in the API, allowing Claude to access up-to-date information from the web. Learn more in our [web search tool documentation](/en/docs/agents-and-tools/tool-use/web-search-tool).
#### 
[​](#may-1%2C-2025)
May 1, 2025
 * Cache control must now be specified directly in the parent `content` block of `tool_result` and `document.source`. For backwards compatibility, if cache control is detected on the last block in `tool_result.content` or `document.source.content`, it will be automatically applied to the parent block instead. Cache control on any other blocks within `tool_result.content` and `document.source.content` will result in a validation error.
#### 
[​](#april-9th%2C-2025)
April 9th, 2025
 * We launched a beta version of the [Ruby SDK](https://github.com/anthropics/anthropic-sdk-ruby)
#### 
[​](#march-31st%2C-2025)
March 31st, 2025
 * We’ve moved our [Java SDK](https://github.com/anthropics/anthropic-sdk-java) from beta to GA.
 * We’ve moved our [Go SDK](https://github.com/anthropics/anthropic-sdk-go) from alpha to beta.
#### 
[​](#february-27th%2C-2025)
February 27th, 2025
 * We’ve added URL source blocks for images and PDFs in the Messages API. You can now reference images and PDFs directly via URL instead of having to base64-encode them. Learn more in our [vision documentation](/en/docs/build-with-claude/vision) and [PDF support documentation](/en/docs/build-with-claude/pdf-support).
 * We’ve added support for a `none` option to the `tool_choice` parameter in the Messages API that prevents Claude from calling any tools. Additionally, you’re no longer required to provide any `tools` when including `tool_use` and `tool_result` blocks.
 * We’ve launched an OpenAI-compatible API endpoint, allowing you to test Claude models by changing just your API key, base URL, and model name in existing OpenAI integrations. This compatibility layer supports core chat completions functionality. Learn more in our [OpenAI SDK compatibility documentation](/en/api/openai-sdk).
#### 
[​](#february-24th%2C-2025)
February 24th, 2025
 * We’ve launched [Claude Sonnet 3.7](http://www.anthropic.com/news/claude-3-7-sonnet), our most intelligent model yet. Claude Sonnet 3.7 can produce near-instant responses or show its extended thinking step-by-step. One model, two ways to think. Learn more about all Claude models in our [Models & Pricing documentation](/en/docs/about-claude/models).
 * We’ve added vision support to Claude Haiku 3.5, enabling the model to analyze and understand images.
 * We’ve released a token-efficient tool use implementation, improving overall performance when using tools with Claude. Learn more in our [tool use documentation](/en/docs/agents-and-tools/tool-use/overview).
 * We’ve changed the default temperature in the [Console](https://console.anthropic.com/workbench) for new prompts from 0 to 1 for consistency with the default temperature in the API. Existing saved prompts are unchanged.
 * We’ve released updated versions of our tools that decouple the text edit and bash tools from the computer use system prompt:
 * `bash_20250124`: Same functionality as previous version but is independent from computer use. Does not require a beta header.
 * `text_editor_20250124`: Same functionality as previous version but is independent from computer use. Does not require a beta header.
 * `computer_20250124`: Updated computer use tool with new command options including “hold_key”, “left_mouse_down”, “left_mouse_up”, “scroll”, “triple_click”, and “wait”. This tool requires the “computer-use-2025-01-24” anthropic-beta header. Learn more in our [tool use documentation](/en/docs/agents-and-tools/tool-use/overview).
#### 
[​](#february-10th%2C-2025)
February 10th, 2025
 * We’ve added the `anthropic-organization-id` response header to all API responses. This header provides the organization ID associated with the API key used in the request.
#### 
[​](#january-31st%2C-2025)
January 31st, 2025
 * We’ve moved our [Java SDK](https://github.com/anthropics/anthropic-sdk-java) from alpha to beta.
#### 
[​](#january-23rd%2C-2025)
January 23rd, 2025
 * We’ve launched citations capability in the API, allowing Claude to provide source attribution for information. Learn more in our [citations documentation](/en/docs/build-with-claude/citations).
 * We’ve added support for plain text documents and custom content documents in the Messages API.
#### 
[​](#january-21st%2C-2025)
January 21st, 2025
 * We announced the deprecation of the Claude 2, Claude 2.1, and Claude Sonnet 3 models. Read more in [our documentation](/en/docs/about-claude/model-deprecations).
#### 
[​](#january-15th%2C-2025)
January 15th, 2025
 * We’ve updated [prompt caching](/en/docs/build-with-claude/prompt-caching) to be easier to use. Now, when you set a cache breakpoint, we’ll automatically read from your longest previously cached prefix.
 * You can now put words in Claude’s mouth when using tools.
#### 
[​](#january-10th%2C-2025)
January 10th, 2025
 * We’ve optimized support for [prompt caching in the Message Batches API](/en/docs/build-with-claude/batch-processing#using-prompt-caching-with-message-batches) to improve cache hit rate.
#### 
[​](#december-19th%2C-2024)
December 19th, 2024
 * We’ve added support for a [delete endpoint](/en/api/deleting-message-batches) in the Message Batches API
#### 
[​](#december-17th%2C-2024)
December 17th, 2024
The following features are now generally available in the Claude API:
 * [Models API](/en/api/models-list): Query available models, validate model IDs, and resolve [model aliases](/en/docs/about-claude/models#model-names) to their canonical model IDs.
 * [Message Batches API](/en/docs/build-with-claude/batch-processing): Process large batches of messages asynchronously at 50% of the standard API cost.
 * [Token counting API](/en/docs/build-with-claude/token-counting): Calculate token counts for Messages before sending them to Claude.
 * [Prompt Caching](/en/docs/build-with-claude/prompt-caching): Reduce costs by up to 90% and latency by up to 80% by caching and reusing prompt content.
 * [PDF support](/en/docs/build-with-claude/pdf-support): Process PDFs to analyze both text and visual content within documents.
We also released new official SDKs:
 * [Java SDK](https://github.com/anthropics/anthropic-sdk-java) (alpha)
 * [Go SDK](https://github.com/anthropics/anthropic-sdk-go) (alpha)
#### 
[​](#december-4th%2C-2024)
December 4th, 2024
 * We’ve added the ability to group by API key to the [Usage](https://console.anthropic.com/settings/usage) and [Cost](https://console.anthropic.com/settings/cost) pages of the [Developer Console](https://console.anthropic.com)
 * We’ve added two new **Last used at** and **Cost** columns and the ability to sort by any column in the [API keys](https://console.anthropic.com/settings/keys) page of the [Developer Console](https://console.anthropic.com)
#### 
[​](#november-21st%2C-2024)
November 21st, 2024
 * We’ve released the [Admin API](/en/api/administration-api), allowing users to programmatically manage their organization’s resources.
### 
[​](#november-20th%2C-2024)
November 20th, 2024
 * We’ve updated our rate limits for the Messages API. We’ve replaced the tokens per minute rate limit with new input and output tokens per minute rate limits. Read more in our [documentation](/en/api/rate-limits).
 * We’ve added support for [tool use](/en/docs/agents-and-tools/tool-use/overview) in the [Workbench](https://console.anthropic.com/workbench).
### 
[​](#november-13th%2C-2024)
November 13th, 2024
 * We’ve added PDF support for all Claude Sonnet 3.5 models. Read more in our [documentation](/en/docs/build-with-claude/pdf-support).
### 
[​](#november-6th%2C-2024)
November 6th, 2024
 * We’ve retired the Claude 1 and Instant models. Read more in [our documentation](/en/docs/about-claude/model-deprecations).
#### 
[​](#november-4th%2C-2024)
November 4th, 2024
 * [Claude Haiku 3.5](https://www.anthropic.com/claude/haiku) is now available on the Claude API as a text-only model.
#### 
[​](#november-1st%2C-2024)
November 1st, 2024
 * We’ve added PDF support for use with the new Claude Sonnet 3.5. Read more in our [documentation](/en/docs/build-with-claude/pdf-support).
 * We’ve also added token counting, which allows you to determine the total number of tokens in a Message, prior to sending it to Claude. Read more in our [documentation](/en/docs/build-with-claude/token-counting).
#### 
[​](#october-22nd%2C-2024)
October 22nd, 2024
 * We’ve added Anthropic-defined computer use tools to our API for use with the new Claude Sonnet 3.5. Read more in our [documentation](/en/docs/agents-and-tools/tool-use/computer-use-tool).
 * Claude Sonnet 3.5, our most intelligent model yet, just got an upgrade and is now available on the Claude API. Read more [here](https://www.anthropic.com/claude/sonnet).
#### 
[​](#october-8th%2C-2024)
October 8th, 2024
 * The Message Batches API is now available in beta. Process large batches of queries asynchronously in the Claude API for 50% less cost. Read more in our [documentation](/en/docs/build-with-claude/batch-processing).
 * We’ve loosened restrictions on the ordering of `user`/`assistant` turns in our Messages API. Consecutive `user`/`assistant` messages will be combined into a single message instead of erroring, and we no longer require the first input message to be a `user` message.
 * We’ve deprecated the Build and Scale plans in favor of a standard feature suite (formerly referred to as Build), along with additional features that are available through sales. Read more [here](https://claude.com/platform/api).
#### 
[​](#october-3rd%2C-2024)
October 3rd, 2024
 * We’ve added the ability to disable parallel tool use in the API. Set `disable_parallel_tool_use: true` in the `tool_choice` field to ensure that Claude uses at most one tool. Read more in our [documentation](/en/docs/agents-and-tools/tool-use/implement-tool-use#parallel-tool-use).
#### 
[​](#september-10th%2C-2024)
September 10th, 2024
 * We’ve added Workspaces to the [Developer Console](https://console.anthropic.com). Workspaces allow you to set custom spend or rate limits, group API keys, track usage by project, and control access with user roles. Read more in our [blog post](https://www.anthropic.com/news/workspaces).
#### 
[​](#september-4th%2C-2024)
September 4th, 2024
 * We announced the deprecation of the Claude 1 models. Read more in [our documentation](/en/docs/about-claude/model-deprecations).
#### 
[​](#august-22nd%2C-2024)
August 22nd, 2024
 * We’ve added support for usage of the SDK in browsers by returning CORS headers in the API responses. Set `dangerouslyAllowBrowser: true` in the SDK instantiation to enable this feature.
#### 
[​](#august-19th%2C-2024)
August 19th, 2024
 * We’ve moved 8,192 token outputs from beta to general availability for Claude Sonnet 3.5.
#### 
[​](#august-14th%2C-2024)
August 14th, 2024
 * [Prompt caching](/en/docs/build-with-claude/prompt-caching) is now available as a beta feature in the Claude API. Cache and re-use prompts to reduce latency by up to 80% and costs by up to 90%.
#### 
[​](#july-15th%2C-2024)
July 15th, 2024
 * Generate outputs up to 8,192 tokens in length from Claude Sonnet 3.5 with the new `anthropic-beta: max-tokens-3-5-sonnet-2024-07-15` header.
#### 
[​](#july-9th%2C-2024)
July 9th, 2024
 * Automatically generate test cases for your prompts using Claude in the [Developer Console](https://console.anthropic.com).
 * Compare the outputs from different prompts side by side in the new output comparison mode in the [Developer Console](https://console.anthropic.com).
#### 
[​](#june-27th%2C-2024)
June 27th, 2024
 * View API usage and billing broken down by dollar amount, token count, and API keys in the new [Usage](https://console.anthropic.com/settings/usage) and [Cost](https://console.anthropic.com/settings/cost) tabs in the [Developer Console](https://console.anthropic.com).
 * View your current API rate limits in the new [Rate Limits](https://console.anthropic.com/settings/limits) tab in the [Developer Console](https://console.anthropic.com).
#### 
[​](#june-20th%2C-2024)
June 20th, 2024
 * [Claude Sonnet 3.5](http://anthropic.com/news/claude-3-5-sonnet), our most intelligent model yet, is now generally available across the Claude API, Amazon Bedrock, and Google Vertex AI.
#### 
[​](#may-30th%2C-2024)
May 30th, 2024
 * [Tool use](/en/docs/agents-and-tools/tool-use/overview) is now generally available across the Claude API, Amazon Bedrock, and Google Vertex AI.
#### 
[​](#may-10th%2C-2024)
May 10th, 2024
 * Our prompt generator tool is now available in the [Developer Console](https://console.anthropic.com). Prompt Generator makes it easy to guide Claude to generate a high-quality prompts tailored to your specific tasks. Read more in our [blog post](https://www.anthropic.com/news/prompt-generator).
Was this page helpful?
YesNo
[Overview](/en/release-notes/overview)[Claude Apps](/en/release-notes/claude-apps)
Assistant
Responses are generated using AI and may contain mistakes.