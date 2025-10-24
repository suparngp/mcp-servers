Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Using the APIs
Overview
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
 * [Accessing the API](#accessing-the-api)
 * [Authentication](#authentication)
 * [Content types](#content-types)
 * [Request size limits](#request-size-limits)
 * [Response Headers](#response-headers)
 * [Examples](#examples)
## 
[​](#accessing-the-api)
Accessing the API
The API is made available via our web [Console](https://console.anthropic.com/). You can use the [Workbench](https://console.anthropic.com/workbench) to try out the API in the browser and then generate API keys in [Account Settings](https://console.anthropic.com/account/keys). Use [workspaces](https://console.anthropic.com/settings/workspaces) to segment your API keys and [control spend](/en/api/rate-limits) by use case.
## 
[​](#authentication)
Authentication
All requests to the Claude API must include an `x-api-key` header with your API key. If you are using the Client SDKs, you will set the API when constructing a client, and then the SDK will send the header on your behalf with every request. If integrating directly with the API, you’ll need to send this header yourself.
## 
[​](#content-types)
Content types
The Claude API always accepts JSON in request bodies and returns JSON in response bodies. You will need to send the `content-type: application/json` header in requests. If you are using the Client SDKs, this will be taken care of automatically.
## 
[​](#request-size-limits)
Request size limits
The API has a maximum request size of 32 MB for standard endpoints, including the Messages API and Token Counting API. If you exceed this limit, you’ll receive a 413 `request_too_large` error from Cloudflare. Specific endpoints have different limits:
 * **Standard endpoints** (Messages, Token Counting): 32 MB
 * **[Batch API](/en/docs/build-with-claude/batch-processing)** : 256 MB
 * **[Files API](/en/docs/build-with-claude/files)** : 500 MB
## 
[​](#response-headers)
Response Headers
The Claude API includes the following headers in every response:
 * `request-id`: A globally unique identifier for the request.
 * `anthropic-organization-id`: The organization ID associated with the API key used in the request.
## 
[​](#examples)
Examples
 * curl
 * Python
 * TypeScript
Shell
Copy
```
curl https://api.anthropic.com/v1/messages \
 --header "x-api-key: $ANTHROPIC_API_KEY" \
 --header "anthropic-version: 2023-06-01" \
 --header "content-type: application/json" \
 --data \
'{
 "model": "claude-sonnet-4-5",
 "max_tokens": 1024,
 "messages": [
 {"role": "user", "content": "Hello, world"}
 ]
}'
```
Was this page helpful?
YesNo
[Rate limits](/en/api/rate-limits)
Assistant
Responses are generated using AI and may contain mistakes.