Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Prompt tools
Templatize a prompt
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
 * Prompt tools
 * [POSTGenerate a prompt](/en/api/prompt-tools-generate)
 * [POSTImprove a prompt](/en/api/prompt-tools-improve)
 * [POSTTemplatize a prompt](/en/api/prompt-tools-templatize)
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
cURL
cURL
Copy
```
curl -X POST https://api.anthropic.com/v1/experimental/templatize_prompt \
 --header "x-api-key: $ANTHROPIC_API_KEY" \
 --header "anthropic-version: 2023-06-01" \
 --header "anthropic-beta: prompt-tools-2025-04-02" \
 --header "content-type: application/json" \
 --data \
'{
 "messages": [{"role": "user", "content": "Translate hello to German"}],
 "system": "You are an English to German translator"
}'
```
200
4XX
Copy
```
{
 "messages": [
 {
 "content": [
 {
 "text": "Translate {{WORD_TO_TRANSLATE}} to {{TARGET_LANGUAGE}}",
 "type": "text"
 }
 ],
 "role": "user"
 }
 ],
 "system": "You are a professional English to {{TARGET_LANGUAGE}} translator",
 "usage": [
 {
 "input_tokens": 490,
 "output_tokens": 661
 }
 ],
 "variable_values": {
 "TARGET_LANGUAGE": "German",
 "WORD_TO_TRANSLATE": "hello"
 }
}
```
POST
/
v1
/
experimental
/
templatize_prompt
cURL
cURL
Copy
```
curl -X POST https://api.anthropic.com/v1/experimental/templatize_prompt \
 --header "x-api-key: $ANTHROPIC_API_KEY" \
 --header "anthropic-version: 2023-06-01" \
 --header "anthropic-beta: prompt-tools-2025-04-02" \
 --header "content-type: application/json" \
 --data \
'{
 "messages": [{"role": "user", "content": "Translate hello to German"}],
 "system": "You are an English to German translator"
}'
```
200
4XX
Copy
```
{
 "messages": [
 {
 "content": [
 {
 "text": "Translate {{WORD_TO_TRANSLATE}} to {{TARGET_LANGUAGE}}",
 "type": "text"
 }
 ],
 "role": "user"
 }
 ],
 "system": "You are a professional English to {{TARGET_LANGUAGE}} translator",
 "usage": [
 {
 "input_tokens": 490,
 "output_tokens": 661
 }
 ],
 "variable_values": {
 "TARGET_LANGUAGE": "German",
 "WORD_TO_TRANSLATE": "hello"
 }
}
```
The prompt tools APIs are in a closed research preview. [Request to join the closed research preview](https://forms.gle/LajXBafpsf1SuJHp7).
## 
[​](#before-you-begin)
Before you begin
The prompt tools are a set of APIs to generate and improve prompts. Unlike our other APIs, this is an experimental API: you’ll need to request access, and it doesn’t have the same level of commitment to long-term support as other APIs. These APIs are similar to what’s available in the [Anthropic Workbench](https://console.anthropic.com/workbench), and are intented for use by other prompt engineering platforms and playgrounds.
## 
[​](#getting-started-with-the-prompt-improver)
Getting started with the prompt improver
To use the prompt generation API, you’ll need to:
 1. Have joined the closed research preview for the prompt tools APIs
 2. Use the API directly, rather than the SDK
 3. Add the beta header `prompt-tools-2025-04-02`
This API is not available in the SDK
## 
[​](#templatize-a-prompt)
Templatize a prompt
#### Headers
[​](#parameter-anthropic-beta)
anthropic-beta
string[]
Optional header to specify the beta version(s) you want to use.
To use multiple betas, use a comma separated list like `beta1,beta2` or specify the header multiple times for each beta.
[​](#parameter-x-api-key)
x-api-key
string
required
Your unique API key for authentication.
This key is required in the header of all API requests, to authenticate your account and access Anthropic's services. Get your API key through the [Console](https://console.anthropic.com/settings/keys). Each key is scoped to a Workspace.
#### Body
application/json
[​](#body-messages)
messages
InputMessage · object[]
required
The prompt to templatize, structured as a list of `message` objects.
Each message in the `messages` array must:
 * Contain only text-only content blocks
 * Not include tool calls, images, or prompt caching blocks
Example of a simple text prompt:
```
[ 
 { 
 "role": "user", 
 "content": [ 
 { 
 "type": "text", 
 "text": "Translate hello to German" 
 } 
 ] 
 } 
]
```
Note that only contiguous user messages with text content are allowed. Assistant prefill is permitted, but other content types will cause validation errors.
Show child attributes
Examples:
```
[ 
 { 
 "content": [ 
 { 
 "text": "Translate hello to German", 
 "type": "text" 
 } 
 ], 
 "role": "user" 
 } 
]
```
[​](#body-system)
system
string | null
The existing system prompt to templatize.
```
{ 
 "system": "You are a professional English to German translator", 
 [...] 
}
```
Note that this differs from the Messages API; it is strictly a string.
Examples:
`"You are a professional English to German translator"`
#### Response
200
application/json
Successful Response
[​](#response-messages)
messages
InputMessage · object[]
required
The templatized prompt with variable placeholders.
The response includes the input messages with specific values replaced by variable placeholders. These messages maintain the original message structure but contain uppercase variable names in place of concrete values.
For example, an input message content like `"Translate hello to German"` would be transformed to `"Translate {{WORD_TO_TRANSLATE}} to {{TARGET_LANGUAGE}}"`.
```
{ 
 "messages": [ 
 { 
 "role": "user", 
 "content": [ 
 { 
 "type": "text", 
 "text": "Translate {{WORD_TO_TRANSLATE}} to {{TARGET_LANGUAGE}}" 
 } 
 ] 
 } 
 ] 
}
```
Show child attributes
Examples:
```
[ 
 { 
 "content": [ 
 { 
 "text": "Translate {{WORD_TO_TRANSLATE}} to {{TARGET_LANGUAGE}}", 
 "type": "text" 
 } 
 ], 
 "role": "user" 
 } 
]
```
[​](#response-system)
system
string
required
The input system prompt with variables identified and replaced.
If no system prompt was provided in the original request, this field will be an empty string.
Examples:
`"You are a professional English to {{TARGET_LANGUAGE}} translator"`
[​](#response-usage)
usage
object
required
Usage information
Show child attributes
[​](#response-variable-values)
variable_values
object
required
A mapping of template variable names to their original values, as extracted from the input prompt during templatization. Each key represents a variable name identified in the templatized prompt, and each value contains the corresponding content from the original prompt that was replaced by that variable.
Example:
```
"variable_values": { 
 "WORD_TO_TRANSLATE": "hello", 
 "TARGET_LANGUAGE": "German" 
}
```
In this example response, the original prompt – `Translate hello to German` – was templatized to `Translate WORD_TO_TRANSLATE to TARGET_LANGUAGE`, with the variable values extracted as shown.
Show child attributes
Examples:
```
{ 
 "TARGET_LANGUAGE": "German", 
 "WORD_TO_TRANSLATE": "hello" 
}
```
Was this page helpful?
YesNo
[Improve a prompt](/en/api/prompt-tools-improve)[Migrating from Text Completions](/en/api/migrating-from-text-completions-to-messages)
Assistant
Responses are generated using AI and may contain mistakes.