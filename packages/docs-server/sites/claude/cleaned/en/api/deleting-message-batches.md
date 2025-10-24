Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Message Batches
Delete a Message Batch
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
 * [POSTCreate a Message Batch](/en/api/creating-message-batches)
 * [GETRetrieve a Message Batch](/en/api/retrieving-message-batches)
 * [GETRetrieve Message Batch Results](/en/api/retrieving-message-batch-results)
 * [GETList Message Batches](/en/api/listing-message-batches)
 * [POSTCancel a Message Batch](/en/api/canceling-message-batches)
 * [DELDelete a Message Batch](/en/api/deleting-message-batches)
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
cURL
cURL
Copy
```
curl -X DELETE https://api.anthropic.com/v1/messages/batches/msgbatch_01HkcTjaV5uDC8jWR4ZsDV8d \
 --header "x-api-key: $ANTHROPIC_API_KEY" \
 --header "anthropic-version: 2023-06-01"
```
200
4XX
Copy
```
{
 "id": "msgbatch_013Zva2CMHLNnXjNJJKqJ2EF",
 "type": "message_batch_deleted"
}
```
DELETE
/
v1
/
messages
/
batches
/
{message_batch_id}
cURL
cURL
Copy
```
curl -X DELETE https://api.anthropic.com/v1/messages/batches/msgbatch_01HkcTjaV5uDC8jWR4ZsDV8d \
 --header "x-api-key: $ANTHROPIC_API_KEY" \
 --header "anthropic-version: 2023-06-01"
```
200
4XX
Copy
```
{
 "id": "msgbatch_013Zva2CMHLNnXjNJJKqJ2EF",
 "type": "message_batch_deleted"
}
```
#### Headers
[​](#parameter-anthropic-beta)
anthropic-beta
string[]
Optional header to specify the beta version(s) you want to use.
To use multiple betas, use a comma separated list like `beta1,beta2` or specify the header multiple times for each beta.
[​](#parameter-anthropic-version)
anthropic-version
string
required
The version of the Claude API you want to use.
Read more about versioning and our version history [here](https://docs.claude.com/en/api/versioning).
[​](#parameter-x-api-key)
x-api-key
string
required
Your unique API key for authentication.
This key is required in the header of all API requests, to authenticate your account and access Anthropic's services. Get your API key through the [Console](https://console.anthropic.com/settings/keys). Each key is scoped to a Workspace.
#### Path Parameters
[​](#parameter-message-batch-id)
message_batch_id
string
required
ID of the Message Batch.
#### Response
200
application/json
Successful Response
[​](#response-id)
id
string
required
ID of the Message Batch.
Examples:
`"msgbatch_013Zva2CMHLNnXjNJJKqJ2EF"`
[​](#response-type)
type
enum<string>
default:message_batch_deleted
required
Deleted object type.
For Message Batches, this is always `"message_batch_deleted"`.
Available options: Title | Const 
---|--- 
Type | `message_batch_deleted` 
Was this page helpful?
YesNo
[Cancel a Message Batch](/en/api/canceling-message-batches)[Create a File](/en/api/files-create)
Assistant
Responses are generated using AI and may contain mistakes.