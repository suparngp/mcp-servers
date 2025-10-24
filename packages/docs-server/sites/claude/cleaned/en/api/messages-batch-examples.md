Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Examples
Message Batches examples
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
 * [Creating a Message Batch](#creating-a-message-batch)
 * [Polling for Message Batch completion](#polling-for-message-batch-completion)
 * [Listing all Message Batches in a Workspace](#listing-all-message-batches-in-a-workspace)
 * [Retrieving Message Batch Results](#retrieving-message-batch-results)
 * [Canceling a Message Batch](#canceling-a-message-batch)
The Message Batches API supports the same set of features as the Messages API. While this page focuses on how to use the Message Batches API, see [Messages API examples](/en/api/messages-examples) for examples of the Messages API feature set.
## 
[​](#creating-a-message-batch)
Creating a Message Batch
Python
TypeScript
Shell
Copy
```
import anthropic
from anthropic.types.message_create_params import MessageCreateParamsNonStreaming
from anthropic.types.messages.batch_create_params import Request
client = anthropic.Anthropic()
message_batch = client.messages.batches.create(
 requests=[
 Request(
 custom_id="my-first-request",
 params=MessageCreateParamsNonStreaming(
 model="claude-sonnet-4-5",
 max_tokens=1024,
 messages=[{
 "role": "user",
 "content": "Hello, world",
 }]
 )
 ),
 Request(
 custom_id="my-second-request",
 params=MessageCreateParamsNonStreaming(
 model="claude-sonnet-4-5",
 max_tokens=1024,
 messages=[{
 "role": "user",
 "content": "Hi again, friend",
 }]
 )
 )
 ]
)
print(message_batch)
```
JSON
Copy
```
{
 "id": "msgbatch_013Zva2CMHLNnXjNJJKqJ2EF",
 "type": "message_batch",
 "processing_status": "in_progress",
 "request_counts": {
 "processing": 2,
 "succeeded": 0,
 "errored": 0,
 "canceled": 0,
 "expired": 0
 },
 "ended_at": null,
 "created_at": "2024-09-24T18:37:24.100435Z",
 "expires_at": "2024-09-25T18:37:24.100435Z",
 "cancel_initiated_at": null,
 "results_url": null
}
```
## 
[​](#polling-for-message-batch-completion)
Polling for Message Batch completion
To poll a Message Batch, you’ll need its `id`, which is provided in the response when [creating](#creating-a-message-batch) request or by [listing](#listing-all-message-batches-in-a-workspace) batches. Example `id`: `msgbatch_013Zva2CMHLNnXjNJJKqJ2EF`.
Python
TypeScript
Shell
Copy
```
import anthropic
client = anthropic.Anthropic()
message_batch = None
while True:
 message_batch = client.messages.batches.retrieve(
 MESSAGE_BATCH_ID
 )
 if message_batch.processing_status == "ended":
 break
 print(f"Batch {MESSAGE_BATCH_ID} is still processing...")
 time.sleep(60)
print(message_batch)
```
## 
[​](#listing-all-message-batches-in-a-workspace)
Listing all Message Batches in a Workspace
Python
TypeScript
Shell
Copy
```
import anthropic
client = anthropic.Anthropic()
# Automatically fetches more pages as needed.
for message_batch in client.messages.batches.list(
 limit=20
):
 print(message_batch)
```
Output
Copy
```
{
 "id": "msgbatch_013Zva2CMHLNnXjNJJKqJ2EF",
 "type": "message_batch",
 ...
}
{
 "id": "msgbatch_01HkcTjaV5uDC8jWR4ZsDV8d",
 "type": "message_batch",
 ...
}
```
## 
[​](#retrieving-message-batch-results)
Retrieving Message Batch Results
Once your Message Batch status is `ended`, you will be able to view the `results_url` of the batch and retrieve results in the form of a `.jsonl` file.
Python
TypeScript
Shell
Copy
```
import anthropic
client = anthropic.Anthropic()
# Stream results file in memory-efficient chunks, processing one at a time
for result in client.messages.batches.results(
 MESSAGE_BATCH_ID,
):
 print(result)
```
Output
Copy
```
{
 "id": "my-second-request",
 "result": {
 "type": "succeeded",
 "message": {
 "id": "msg_018gCsTGsXkYJVqYPxTgDHBU",
 "type": "message",
 ...
 }
 }
}
{
 "custom_id": "my-first-request",
 "result": {
 "type": "succeeded",
 "message": {
 "id": "msg_01XFDUDYJgAACzvnptvVoYEL",
 "type": "message",
 ...
 }
 }
}
```
## 
[​](#canceling-a-message-batch)
Canceling a Message Batch
Immediately after cancellation, a batch’s `processing_status` will be `canceling`. You can use the same [polling for batch completion](#polling-for-message-batch-completion) technique to poll for when cancellation is finalized as canceled batches also end up `ended` and may contain results.
Python
TypeScript
Shell
Copy
```
import anthropic
client = anthropic.Anthropic()
message_batch = client.messages.batches.cancel(
 MESSAGE_BATCH_ID,
)
print(message_batch)
```
JSON
Copy
```
{
 "id": "msgbatch_013Zva2CMHLNnXjNJJKqJ2EF",
 "type": "message_batch",
 "processing_status": "canceling",
 "request_counts": {
 "processing": 2,
 "succeeded": 0,
 "errored": 0,
 "canceled": 0,
 "expired": 0
 },
 "ended_at": null,
 "created_at": "2024-09-24T18:37:24.100435Z",
 "expires_at": "2024-09-25T18:37:24.100435Z",
 "cancel_initiated_at": "2024-09-24T18:39:03.114875Z",
 "results_url": null
}
```
Was this page helpful?
YesNo
[Messages examples](/en/api/messages-examples)[Amazon Bedrock API](/en/api/claude-on-amazon-bedrock)
Assistant
Responses are generated using AI and may contain mistakes.