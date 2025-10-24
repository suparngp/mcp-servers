Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Prompt tools
Improve a prompt
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
curl -X POST https://api.anthropic.com/v1/experimental/improve_prompt \
 --header "x-api-key: $ANTHROPIC_API_KEY" \
 --header "anthropic-version: 2023-06-01" \
 --header "anthropic-beta: prompt-tools-2025-04-02" \
 --header "content-type: application/json" \
 --data \
'{
 "messages": [{"role": "user", "content": [{"type": "text", "text": "Create a recipe for {{food}}"}]}],
 "system": "You are a professional chef",
 "feedback": "Make it more detailed and include cooking times",
 "target_model": "claude-3-7-sonnet-20250219"
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
 "text": "<improved prompt>",
 "type": "text"
 }
 ],
 "role": "user"
 },
 {
 "content": [
 {
 "text": "<assistant prefill>",
 "type": "text"
 }
 ],
 "role": "assistant"
 }
 ],
 "system": "",
 "usage": [
 {
 "input_tokens": 490,
 "output_tokens": 661
 }
 ]
}
```
POST
/
v1
/
experimental
/
improve_prompt
cURL
cURL
Copy
```
curl -X POST https://api.anthropic.com/v1/experimental/improve_prompt \
 --header "x-api-key: $ANTHROPIC_API_KEY" \
 --header "anthropic-version: 2023-06-01" \
 --header "anthropic-beta: prompt-tools-2025-04-02" \
 --header "content-type: application/json" \
 --data \
'{
 "messages": [{"role": "user", "content": [{"type": "text", "text": "Create a recipe for {{food}}"}]}],
 "system": "You are a professional chef",
 "feedback": "Make it more detailed and include cooking times",
 "target_model": "claude-3-7-sonnet-20250219"
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
 "text": "<improved prompt>",
 "type": "text"
 }
 ],
 "role": "user"
 },
 {
 "content": [
 {
 "text": "<assistant prefill>",
 "type": "text"
 }
 ],
 "role": "assistant"
 }
 ],
 "system": "",
 "usage": [
 {
 "input_tokens": 490,
 "output_tokens": 661
 }
 ]
}
```
The prompt tools APIs are in a closed research preview. [Request to join the closed research preview](https://forms.gle/LajXBafpsf1SuJHp7).
## 
[​](#before-you-begin)
Before you begin
The prompt tools are a set of APIs to generate and improve prompts. Unlike our other APIs, this is an experimental API: you’ll need to request access, and it doesn’t have the same level of commitment to long-term support as other APIs. These APIs are similar to what’s available in the [Anthropic Workbench](https://console.anthropic.com/workbench), and are intended for use by other prompt engineering platforms and playgrounds.
## 
[​](#getting-started-with-the-prompt-improver)
Getting started with the prompt improver
To use the prompt generation API, you’ll need to:
 1. Have joined the closed research preview for the prompt tools APIs
 2. Use the API directly, rather than the SDK
 3. Add the beta header `prompt-tools-2025-04-02`
This API is not available in the SDK
## 
[​](#improve-a-prompt)
Improve a prompt
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
The prompt to improve, structured as a list of `message` objects.
Each message in the `messages` array must:
 * Contain only text-only content blocks
 * Not include tool calls, images, or prompt caching blocks
As a simple text prompt:
```
[ 
 { 
 "role": "user", 
 "content": [ 
 { 
 "type": "text", 
 "text": "Concise recipe for {{food}}" 
 } 
 ] 
 } 
]
```
With example interactions to guide improvement:
```
[ 
 { 
 "role": "user", 
 "content": [ 
 { 
 "type": "text", 
 "text": "Concise for {{food}}.\n\nexample\mandu: Put the mandu in the air fryer at 380F for 7 minutes." 
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
 "text": "<generated prompt>", 
 "type": "text" 
 } 
 ], 
 "role": "user" 
 } 
]
```
[​](#body-feedback)
feedback
string | null
Feedback for improving the prompt.
Use this parameter to share specific guidance on what aspects of the prompt should be enhanced or modified.
Example:
```
{ 
 "messages": [...], 
 "feedback": "Make the recipes shorter" 
}
```
When not set, the API will improve the prompt using general prompt engineering best practices.
Examples:
`"Make it more detailed and include cooking times"`
[​](#body-system)
system
string | null
The existing system prompt to incorporate, if any.
```
{ 
 "system": "You are a professional meal prep chef", 
 [...] 
}
```
Note that while system prompts typically appear as separate parameters in standard API calls, in the `improve_prompt` response, the system content will be incorporated directly into the returned user message.
Examples:
`"You are a professional chef"`
[​](#body-target-model)
target_model
string | null
default:""
The model this prompt will be used for. This optional parameter helps us understand which models our prompt tools are being used with, but it doesn't currently affect functionality.
Example:
```
"claude-3-7-sonnet-20250219"
```
Required string length: `1 - 256`
Examples:
`"claude-3-7-sonnet-20250219"`
#### Response
200
application/json
Successful Response
[​](#response-messages)
messages
InputMessage · object[]
required
Contains the result of the prompt improvement process in a list of `message` objects.
Includes a `user`-role message with the improved prompt text and may optionally include an `assistant`-role message with a prefill. These messages follow the standard Messages API format and can be used directly in subsequent API calls.
Show child attributes
Examples:
```
[ 
 { 
 "content": [ 
 { 
 "text": "<improved prompt>", 
 "type": "text" 
 } 
 ], 
 "role": "user" 
 }, 
 { 
 "content": [ 
 { 
 "text": "<assistant prefill>", 
 "type": "text" 
 } 
 ], 
 "role": "assistant" 
 } 
]
```
[​](#response-system)
system
string
required
Currently, the `system` field is always returned as an empty string (""). In future iterations, this field may contain generated system prompts.
Directions similar to what would normally be included in a system prompt are included in `messages` when improving a prompt.
Examples:
`""`
[​](#response-usage)
usage
object
required
Usage information
Show child attributes
Was this page helpful?
YesNo
[Generate a prompt](/en/api/prompt-tools-generate)[Templatize a prompt](/en/api/prompt-tools-templatize)
Assistant
Responses are generated using AI and may contain mistakes.