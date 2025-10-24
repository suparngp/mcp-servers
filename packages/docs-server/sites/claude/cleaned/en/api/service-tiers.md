Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Using the APIs
Service tiers
[Welcome](/en/home)[Claude Developer Platform](/en/docs/intro)[Claude Code](/en/docs/claude-code/overview)[Model Context Protocol (MCP)](/en/docs/mcp)[API Reference](/en/api/messages)[Resources](/en/resources/overview)[Release Notes](/en/release-notes/overview)
* [](/en/docs/intro)
* [](/en/api/overview)
##### Using the APIs
 * [Overview](/en/api/overview)
 * [Rate limits](/en/api/rate-limits)
 * [Service tiers](/en/api/service-tiers)
 * [Errors](/en/api/errors)
 * [Handling stop reasons](/en/api/handling-stop-reasons)
 * [Beta headers](/en/api/beta-headers)
##### API reference
 * Messages
 * Models
 * Message Batches
 * Files
 * Skills
 * Admin API
 * Experimental APIs
 * Text Completions (Legacy)
##### SDKs
 * [Client SDKs](/en/api/client-sdks)
 * [OpenAI SDK compatibility](/en/api/openai-sdk)
 * Agent SDK
##### Examples
 * [Messages examples](/en/api/messages-examples)
 * [Message Batches examples](/en/api/messages-batch-examples)
##### 3rd-party APIs
 * [Amazon Bedrock API](/en/api/claude-on-amazon-bedrock)
 * [Vertex AI API](/en/api/claude-on-vertex-ai)
##### Using the Admin API
 * [Admin API overview](/en/api/administration-api)
 * [Usage and Cost API](/en/api/usage-cost-api)
 * [Claude Code Analytics API](/en/api/claude-code-analytics-api)
##### Support & configuration
 * [Versions](/en/api/versioning)
 * [IP addresses](/en/api/ip-addresses)
 * [Supported regions](/en/api/supported-regions)
 * [Getting help](/en/api/getting-help)
On this page
 * [Standard Tier](#standard-tier)
 * [Priority Tier](#priority-tier)
 * [How requests get assigned tiers](#how-requests-get-assigned-tiers)
 * [Using service tiers](#using-service-tiers)
 * [Get started with Priority Tier](#get-started-with-priority-tier)
 * [Supported models](#supported-models)
 * [How to access Priority Tier](#how-to-access-priority-tier)
We offer three service tiers:
 * **Priority Tier:** Best for workflows deployed in production where time, availability, and predictable pricing are important
 * **Standard:** Default tier for both piloting and scaling everyday use cases
 * **Batch:** Best for asynchronous workflows which can wait or benefit from being outside your normal capacity
## 
[​](#standard-tier)
Standard Tier
The standard tier is the default service tier for all API requests. Requests in this tier are prioritized alongside all other requests and observe best-effort availability.
## 
[​](#priority-tier)
Priority Tier
Requests in this tier are prioritized over all other requests to Anthropic. This prioritization helps minimize [“server overloaded” errors](/en/api/errors#http-errors), even during peak times. For more information, see [Get started with Priority Tier](#get-started-with-priority-tier)
## 
[​](#how-requests-get-assigned-tiers)
How requests get assigned tiers
When handling a request, Anthropic decides to assign a request to Priority Tier in the following scenarios:
 * Your organization has sufficient priority tier capacity **input** tokens per minute
 * Your organization has sufficient priority tier capacity **output** tokens per minute
Anthropic counts usage against Priority Tier capacity as follows: **Input Tokens**
 * Cache reads as 0.1 tokens per token read from the cache
 * Cache writes as 1.25 tokens per token written to the cache with a 5 minute TTL
 * Cache writes as 2.00 tokens per token written to the cache with a 1 hour TTL
 * For [long-context](/en/docs/build-with-claude/context-windows) (>200k input tokens) requests, input tokens are 2 tokens per token
 * All other input tokens are 1 token per token
**Output Tokens**
 * For [long-context](/en/docs/build-with-claude/context-windows) (>200k input tokens) requests, output tokens are 1.5 tokens per token
 * All other output tokens are 1 token per token
Otherwise, requests proceed at standard tier.
Requests assigned Priority Tier pull from both the Priority Tier capacity and the regular rate limits. If servicing the request would exceed the rate limits, the request is declined.
## 
[​](#using-service-tiers)
Using service tiers
You can control which service tiers can be used for a request by setting the `service_tier` parameter:
Copy
```
message = client.messages.create(
 model="claude-sonnet-4-5",
 max_tokens=1024,
 messages=[{"role": "user", "content": "Hello, Claude!"}],
 service_tier="auto" # Automatically use Priority Tier when available, fallback to standard
)
```
The `service_tier` parameter accepts the following values:
 * `"auto"` (default) - Uses the Priority Tier capacity if available, falling back to your other capacity if not
 * `"standard_only"` - Only use standard tier capacity, useful if you don’t want to use your Priority Tier capacity
The response `usage` object also includes the service tier assigned to the request:
Copy
```
{
 "usage": {
 "input_tokens": 410,
 "cache_creation_input_tokens": 0,
 "cache_read_input_tokens": 0,
 "output_tokens": 585,
 "service_tier": "priority"
 }
}
```
This allows you to determine which service tier was assigned to the request. When requesting `service_tier="auto"` with a model with a Priority Tier commitment, these response headers provide insights:
Copy
```
anthropic-priority-input-tokens-limit: 10000
anthropic-priority-input-tokens-remaining: 9618
anthropic-priority-input-tokens-reset: 2025-01-12T23:11:59Z
anthropic-priority-output-tokens-limit: 10000
anthropic-priority-output-tokens-remaining: 6000
anthropic-priority-output-tokens-reset: 2025-01-12T23:12:21Z
```
You can use the presence of these headers to detect if your request was eligible for Priority Tier, even if it was over the limit.
## 
[​](#get-started-with-priority-tier)
Get started with Priority Tier
You may want to commit to Priority Tier capacity if you are interested in:
 * **Higher availability** : Target 99.5% uptime with prioritized computational resources
 * **Cost Control** : Predictable spend and discounts for longer commitments
 * **Flexible overflow** : Automatically falls back to standard tier when you exceed your committed capacity
Committing to Priority Tier will involve deciding:
 * A number of input tokens per minute
 * A number of output tokens per minute
 * A commitment duration (1, 3, 6, or 12 months)
 * A specific model version
The ratio of input to output tokens you purchase matters. Sizing your Priority Tier capacity to align with your actual traffic patterns helps you maximize utilization of your purchased tokens.
### 
[​](#supported-models)
Supported models
Priority Tier is supported by:
 * Claude Opus 4.1
 * Claude Opus 4
 * Claude Sonnet 4
 * Claude Sonnet 3.7
 * Claude Sonnet 3.5 (both versions)
 * Claude Haiku 3.5
Check the [model overview page](/en/docs/about-claude/models/overview) for more details on our models.
### 
[​](#how-to-access-priority-tier)
How to access Priority Tier
To begin using Priority Tier:
 1. [Contact sales](https://claude.com/contact-sales/priority-tier) to complete provisioning
 2. (Optional) Update your API requests to optionally set the `service_tier` parameter to `auto`
 3. Monitor your usage through response headers and the Claude Console
Was this page helpful?
YesNo
[Rate limits](/en/api/rate-limits)[Errors](/en/api/errors)
Assistant
Responses are generated using AI and may contain mistakes.