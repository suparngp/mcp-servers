Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Message Batches
Create a Message Batch
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
curl https://api.anthropic.com/v1/messages/batches \
 --header "x-api-key: $ANTHROPIC_API_KEY" \
 --header "anthropic-version: 2023-06-01" \
 --header "content-type: application/json" \
 --data \
'{
 "requests": [
 {
 "custom_id": "my-first-request",
 "params": {
 "model": "claude-3-7-sonnet-20250219",
 "max_tokens": 1024,
 "messages": [
 {"role": "user", "content": "Hello, world"}
 ]
 }
 },
 {
 "custom_id": "my-second-request",
 "params": {
 "model": "claude-3-7-sonnet-20250219",
 "max_tokens": 1024,
 "messages": [
 {"role": "user", "content": "Hi again, friend"}
 ]
 }
 }
 ]
}'
```
200
4XX
Copy
```
{
 "archived_at": "2024-08-20T18:37:24.100435Z",
 "cancel_initiated_at": "2024-08-20T18:37:24.100435Z",
 "created_at": "2024-08-20T18:37:24.100435Z",
 "ended_at": "2024-08-20T18:37:24.100435Z",
 "expires_at": "2024-08-20T18:37:24.100435Z",
 "id": "msgbatch_013Zva2CMHLNnXjNJJKqJ2EF",
 "processing_status": "in_progress",
 "request_counts": {
 "canceled": 10,
 "errored": 30,
 "expired": 10,
 "processing": 100,
 "succeeded": 50
 },
 "results_url": "https://api.anthropic.com/v1/messages/batches/msgbatch_013Zva2CMHLNnXjNJJKqJ2EF/results",
 "type": "message_batch"
}
```
POST
/
v1
/
messages
/
batches
cURL
cURL
Copy
```
curl https://api.anthropic.com/v1/messages/batches \
 --header "x-api-key: $ANTHROPIC_API_KEY" \
 --header "anthropic-version: 2023-06-01" \
 --header "content-type: application/json" \
 --data \
'{
 "requests": [
 {
 "custom_id": "my-first-request",
 "params": {
 "model": "claude-3-7-sonnet-20250219",
 "max_tokens": 1024,
 "messages": [
 {"role": "user", "content": "Hello, world"}
 ]
 }
 },
 {
 "custom_id": "my-second-request",
 "params": {
 "model": "claude-3-7-sonnet-20250219",
 "max_tokens": 1024,
 "messages": [
 {"role": "user", "content": "Hi again, friend"}
 ]
 }
 }
 ]
}'
```
200
4XX
Copy
```
{
 "archived_at": "2024-08-20T18:37:24.100435Z",
 "cancel_initiated_at": "2024-08-20T18:37:24.100435Z",
 "created_at": "2024-08-20T18:37:24.100435Z",
 "ended_at": "2024-08-20T18:37:24.100435Z",
 "expires_at": "2024-08-20T18:37:24.100435Z",
 "id": "msgbatch_013Zva2CMHLNnXjNJJKqJ2EF",
 "processing_status": "in_progress",
 "request_counts": {
 "canceled": 10,
 "errored": 30,
 "expired": 10,
 "processing": 100,
 "succeeded": 50
 },
 "results_url": "https://api.anthropic.com/v1/messages/batches/msgbatch_013Zva2CMHLNnXjNJJKqJ2EF/results",
 "type": "message_batch"
}
```
## 
[​](#feature-support)
Feature Support
The Message Batches API supports the following models: Claude Haiku 3, Claude Opus 3, Claude Sonnet 3.5, Claude Sonnet 3.5 v2, Claude Sonnet 3.7, Claude Sonnet 4, Claude Sonnet 4.5, and Claude Opus 4. All features available in the Messages API, including beta features, are available through the Message Batches API. Batches may contain up to 100,000 requests and be up to 256 MB in total size.
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
#### Body
application/json
[​](#body-requests)
requests
MessageBatchIndividualRequestParams · object[]
required
List of requests for prompt completion. Each is an individual request to create a Message.
Required array length: `1 - 10000` elements
Show child attributes
#### Response
200
application/json
Successful Response
[​](#response-archived-at)
archived_at
string<date-time> | null
required
RFC 3339 datetime string representing the time at which the Message Batch was archived and its results became unavailable.
Examples:
`"2024-08-20T18:37:24.100435Z"`
[​](#response-cancel-initiated-at)
cancel_initiated_at
string<date-time> | null
required
RFC 3339 datetime string representing the time at which cancellation was initiated for the Message Batch. Specified only if cancellation was initiated.
Examples:
`"2024-08-20T18:37:24.100435Z"`
[​](#response-created-at)
created_at
string<date-time>
required
RFC 3339 datetime string representing the time at which the Message Batch was created.
Examples:
`"2024-08-20T18:37:24.100435Z"`
[​](#response-ended-at)
ended_at
string<date-time> | null
required
RFC 3339 datetime string representing the time at which processing for the Message Batch ended. Specified only once processing ends.
Processing ends when every request in a Message Batch has either succeeded, errored, canceled, or expired.
Examples:
`"2024-08-20T18:37:24.100435Z"`
[​](#response-expires-at)
expires_at
string<date-time>
required
RFC 3339 datetime string representing the time at which the Message Batch will expire and end processing, which is 24 hours after creation.
Examples:
`"2024-08-20T18:37:24.100435Z"`
[​](#response-id)
id
string
required
Unique object identifier.
The format and length of IDs may change over time.
Examples:
`"msgbatch_013Zva2CMHLNnXjNJJKqJ2EF"`
[​](#response-processing-status)
processing_status
enum<string>
required
Processing status of the Message Batch.
Available options:
`in_progress`,
`canceling`,
`ended`
[​](#response-request-counts)
request_counts
object
required
Tallies requests within the Message Batch, categorized by their status.
Requests start as `processing` and move to one of the other statuses only once processing of the entire batch ends. The sum of all values always matches the total number of requests in the batch.
Show child attributes
[​](#response-results-url)
results_url
string | null
required
URL to a `.jsonl` file containing the results of the Message Batch requests. Specified only once processing ends.
Results in the file are not guaranteed to be in the same order as requests. Use the `custom_id` field to match results to requests.
Examples:
`"https://api.anthropic.com/v1/messages/batches/msgbatch_013Zva2CMHLNnXjNJJKqJ2EF/results"`
[​](#response-type)
type
enum<string>
default:message_batch
required
Object type.
For Message Batches, this is always `"message_batch"`.
Available options: Title | Const 
---|--- 
Type | `message_batch` 
Was this page helpful?
YesNo
[Get a Model](/en/api/models)[Retrieve a Message Batch](/en/api/retrieving-message-batches)
Assistant
Responses are generated using AI and may contain mistakes.