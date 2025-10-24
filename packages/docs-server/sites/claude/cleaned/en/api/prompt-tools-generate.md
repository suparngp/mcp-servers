Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Prompt tools
Generate a prompt
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
curl -X POST https://api.anthropic.com/v1/experimental/generate_prompt \
 --header "x-api-key: $ANTHROPIC_API_KEY" \
 --header "anthropic-version: 2023-06-01" \
 --header "anthropic-beta: prompt-tools-2025-04-02" \
 --header "content-type: application/json" \
 --data \
'{
 "task": "a chef for a meal prep planning service",
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
 "text": "<generated prompt>",
 "type": "text"
 }
 ],
 "role": "user"
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
generate_prompt
cURL
cURL
Copy
```
curl -X POST https://api.anthropic.com/v1/experimental/generate_prompt \
 --header "x-api-key: $ANTHROPIC_API_KEY" \
 --header "anthropic-version: 2023-06-01" \
 --header "anthropic-beta: prompt-tools-2025-04-02" \
 --header "content-type: application/json" \
 --data \
'{
 "task": "a chef for a meal prep planning service",
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
 "text": "<generated prompt>",
 "type": "text"
 }
 ],
 "role": "user"
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
[​](#getting-started-with-the-prompt-generator)
Getting started with the prompt generator
To use the prompt generation API, you’ll need to:
 1. Have joined the closed research preview for the prompt tools APIs
 2. Use the API directly, rather than the SDK
 3. Add the beta header `prompt-tools-2025-04-02`
This API is not available in the SDK
## 
[​](#generate-a-prompt)
Generate a prompt
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
[​](#body-task)
task
string
required
Description of the prompt's purpose.
The `task` parameter tells Claude what the prompt should do or what kind of role or functionality you want to create. This helps guide the prompt generation process toward your intended use case.
Example:
```
{"task": "a chef for a meal prep planning service"}
```
Examples:
`"a chef for a meal prep planning service"`
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
The response contains a list of message objects in the same format used by the Messages API. Typically includes a user message with the complete generated prompt text, and may include an assistant message with a prefill to guide the model's initial response.
These messages can be used directly in a Messages API request to start a conversation with the generated prompt.
Example:
```
{ 
 "messages": [ 
 { 
 "role": "user", 
 "content": [ 
 { 
 "type": "text", 
 "text": "You are a chef for a meal prep planning service..." 
 } 
 ] 
 }, 
 { 
 "role": "assistant", 
 "content": [ 
 { 
 "type": "text", 
 "text": "<recipe_planning>" 
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
 "text": "<generated prompt>", 
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
default:""
required
Currently, the `system` field is always returned as an empty string (""). In future iterations, this field may contain generated system prompts.
Directions similar to what would normally be included in a system prompt are included in `messages` when generating a prompt.
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
[Get Claude Code Usage Report](/en/api/admin-api/claude-code/get-claude-code-usage-report)[Improve a prompt](/en/api/prompt-tools-improve)
Assistant
Responses are generated using AI and may contain mistakes.