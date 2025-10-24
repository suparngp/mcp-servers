Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
SDKs
OpenAI SDK compatibility
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
 * [Getting started with the OpenAI SDK](#getting-started-with-the-openai-sdk)
 * [Quick start example](#quick-start-example)
 * [Important OpenAI compatibility limitations](#important-openai-compatibility-limitations)
 * [API behavior](#api-behavior)
 * [Output quality considerations](#output-quality-considerations)
 * [System / Developer message hoisting](#system-%2F-developer-message-hoisting)
 * [Extended thinking support](#extended-thinking-support)
 * [Rate limits](#rate-limits)
 * [Detailed OpenAI Compatible API Support](#detailed-openai-compatible-api-support)
 * [Request fields](#request-fields)
 * [Simple fields](#simple-fields)
 * [tools / functions fields](#tools-%2F-functions-fields)
 * [messages array fields](#messages-array-fields)
 * [Response fields](#response-fields)
 * [Error message compatibility](#error-message-compatibility)
 * [Header compatibility](#header-compatibility)
This compatibility layer is primarily intended to test and compare model capabilities, and is not considered a long-term or production-ready solution for most use cases. While we do intend to keep it fully functional and not make breaking changes, our priority is the reliability and effectiveness of the [Claude API](/en/api/overview).For more information on known compatibility limitations, see [Important OpenAI compatibility limitations](#important-openai-compatibility-limitations).If you encounter any issues with the OpenAI SDK compatibility feature, please let us know [here](https://forms.gle/oQV4McQNiuuNbz9n8).
For the best experience and access to Claude API full feature set ([PDF processing](/en/docs/build-with-claude/pdf-support), [citations](/en/docs/build-with-claude/citations), [extended thinking](/en/docs/build-with-claude/extended-thinking), and [prompt caching](/en/docs/build-with-claude/prompt-caching)), we recommend using the native [Claude API](/en/api/getting-started).
## 
[​](#getting-started-with-the-openai-sdk)
Getting started with the OpenAI SDK
To use the OpenAI SDK compatibility feature, you’ll need to:
 1. Use an official OpenAI SDK
 2. Change the following
 * Update your base URL to point to the Claude API
 * Replace your API key with an [Claude API key](https://console.anthropic.com/settings/keys)
 * Update your model name to use a [Claude model](/en/docs/about-claude/models/overview)
 3. Review the documentation below for what features are supported
### 
[​](#quick-start-example)
Quick start example
Python
TypeScript
Copy
```
from openai import OpenAI
client = OpenAI(
 api_key="ANTHROPIC_API_KEY", # Your Claude API key
 base_url="https://api.anthropic.com/v1/" # the Claude API endpoint
)
response = client.chat.completions.create(
 model="claude-sonnet-4-5", # Anthropic model name
 messages=[
 {"role": "system", "content": "You are a helpful assistant."},
 {"role": "user", "content": "Who are you?"}
 ],
)
print(response.choices[0].message.content)
```
## 
[​](#important-openai-compatibility-limitations)
Important OpenAI compatibility limitations
#### 
[​](#api-behavior)
API behavior
Here are the most substantial differences from using OpenAI:
 * The `strict` parameter for function calling is ignored, which means the tool use JSON is not guaranteed to follow the supplied schema.
 * Audio input is not supported; it will simply be ignored and stripped from input
 * Prompt caching is not supported, but it is supported in [the Anthropic SDK](/en/api/client-sdks)
 * System/developer messages are hoisted and concatenated to the beginning of the conversation, as Anthropic only supports a single initial system message.
Most unsupported fields are silently ignored rather than producing errors. These are all documented below.
#### 
[​](#output-quality-considerations)
Output quality considerations
If you’ve done lots of tweaking to your prompt, it’s likely to be well-tuned to OpenAI specifically. Consider using our [prompt improver in the Claude Console](https://console.anthropic.com/dashboard) as a good starting point.
#### 
[​](#system-%2F-developer-message-hoisting)
System / Developer message hoisting
Most of the inputs to the OpenAI SDK clearly map directly to Anthropic’s API parameters, but one distinct difference is the handling of system / developer prompts. These two prompts can be put throughout a chat conversation via OpenAI. Since Anthropic only supports an initial system message, we take all system/developer messages and concatenate them together with a single newline (`\n`) in between them. This full string is then supplied as a single system message at the start of the messages.
#### 
[​](#extended-thinking-support)
Extended thinking support
You can enable [extended thinking](/en/docs/build-with-claude/extended-thinking) capabilities by adding the `thinking` parameter. While this will improve Claude’s reasoning for complex tasks, the OpenAI SDK won’t return Claude’s detailed thought process. For full extended thinking features, including access to Claude’s step-by-step reasoning output, use the native Claude API.
Python
TypeScript
Copy
```
response = client.chat.completions.create(
 model="claude-sonnet-4-5",
 messages=...,
 extra_body={
 "thinking": { "type": "enabled", "budget_tokens": 2000 }
 }
)
```
## 
[​](#rate-limits)
Rate limits
Rate limits follow Anthropic’s [standard limits](/en/api/rate-limits) for the `/v1/messages` endpoint.
## 
[​](#detailed-openai-compatible-api-support)
Detailed OpenAI Compatible API Support
### 
[​](#request-fields)
Request fields
#### 
[​](#simple-fields)
Simple fields
Field | Support status 
---|--- 
`model` | Use Claude model names 
`max_tokens` | Fully supported 
`max_completion_tokens` | Fully supported 
`stream` | Fully supported 
`stream_options` | Fully supported 
`top_p` | Fully supported 
`parallel_tool_calls` | Fully supported 
`stop` | All non-whitespace stop sequences work 
`temperature` | Between 0 and 1 (inclusive). Values greater than 1 are capped at 1. 
`n` | Must be exactly 1 
`logprobs` | Ignored 
`metadata` | Ignored 
`response_format` | Ignored 
`prediction` | Ignored 
`presence_penalty` | Ignored 
`frequency_penalty` | Ignored 
`seed` | Ignored 
`service_tier` | Ignored 
`audio` | Ignored 
`logit_bias` | Ignored 
`store` | Ignored 
`user` | Ignored 
`modalities` | Ignored 
`top_logprobs` | Ignored 
`reasoning_effort` | Ignored 
#### 
[​](#tools-%2F-functions-fields)
`tools` / `functions` fields
Show fields
 * Tools
 * Functions
`tools[n].function` fields Field | Support status 
---|--- 
`name` | Fully supported 
`description` | Fully supported 
`parameters` | Fully supported 
`strict` | Ignored 
#### 
[​](#messages-array-fields)
`messages` array fields
Show fields
 * Developer role
 * System role
 * User role
 * Assistant role
 * Tool role
 * Function role
Fields for `messages[n].role == "developer"`
Developer messages are hoisted to beginning of conversation as part of the initial system message
Field | Support status 
---|--- 
`content` | Fully supported, but hoisted 
`name` | Ignored 
### 
[​](#response-fields)
Response fields
Field | Support status 
---|--- 
`id` | Fully supported 
`choices[]` | Will always have a length of 1 
`choices[].finish_reason` | Fully supported 
`choices[].index` | Fully supported 
`choices[].message.role` | Fully supported 
`choices[].message.content` | Fully supported 
`choices[].message.tool_calls` | Fully supported 
`object` | Fully supported 
`created` | Fully supported 
`model` | Fully supported 
`finish_reason` | Fully supported 
`content` | Fully supported 
`usage.completion_tokens` | Fully supported 
`usage.prompt_tokens` | Fully supported 
`usage.total_tokens` | Fully supported 
`usage.completion_tokens_details` | Always empty 
`usage.prompt_tokens_details` | Always empty 
`choices[].message.refusal` | Always empty 
`choices[].message.audio` | Always empty 
`logprobs` | Always empty 
`service_tier` | Always empty 
`system_fingerprint` | Always empty 
### 
[​](#error-message-compatibility)
Error message compatibility
The compatibility layer maintains consistent error formats with the OpenAI API. However, the detailed error messages will not be equivalent. We recommend only using the error messages for logging and debugging.
### 
[​](#header-compatibility)
Header compatibility
While the OpenAI SDK automatically manages headers, here is the complete list of headers supported by the Claude API for developers who need to work with them directly. Header | Support Status 
---|--- 
`x-ratelimit-limit-requests` | Fully supported 
`x-ratelimit-limit-tokens` | Fully supported 
`x-ratelimit-remaining-requests` | Fully supported 
`x-ratelimit-remaining-tokens` | Fully supported 
`x-ratelimit-reset-requests` | Fully supported 
`x-ratelimit-reset-tokens` | Fully supported 
`retry-after` | Fully supported 
`request-id` | Fully supported 
`openai-version` | Always `2020-10-01` 
`authorization` | Fully supported 
`openai-processing-ms` | Always empty 
Was this page helpful?
YesNo
[Client SDKs](/en/api/client-sdks)[Migrate to Claude Agent SDK](/en/docs/claude-code/sdk/migration-guide)
Assistant
Responses are generated using AI and may contain mistakes.