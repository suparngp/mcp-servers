Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Files
List Files
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
 * [POSTCreate a File](/en/api/files-create)
 * [GETList Files](/en/api/files-list)
 * [GETGet File Metadata](/en/api/files-metadata)
 * [GETDownload a File](/en/api/files-content)
 * [DELDelete a File](/en/api/files-delete)
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
curl "https://api.anthropic.com/v1/files" \
 -H "x-api-key: $ANTHROPIC_API_KEY" \
 -H "anthropic-version: 2023-06-01" \
 -H "anthropic-beta: files-api-2025-04-14"
```
200
4XX
Copy
```
{
 "data": [
 {
 "created_at": "2023-11-07T05:31:56Z",
 "downloadable": false,
 "filename": "<string>",
 "id": "<string>",
 "mime_type": "<string>",
 "size_bytes": 1,
 "type": "file"
 }
 ],
 "first_id": "<string>",
 "has_more": false,
 "last_id": "<string>"
}
```
GET
/
v1
/
files
cURL
cURL
Copy
```
curl "https://api.anthropic.com/v1/files" \
 -H "x-api-key: $ANTHROPIC_API_KEY" \
 -H "anthropic-version: 2023-06-01" \
 -H "anthropic-beta: files-api-2025-04-14"
```
200
4XX
Copy
```
{
 "data": [
 {
 "created_at": "2023-11-07T05:31:56Z",
 "downloadable": false,
 "filename": "<string>",
 "id": "<string>",
 "mime_type": "<string>",
 "size_bytes": 1,
 "type": "file"
 }
 ],
 "first_id": "<string>",
 "has_more": false,
 "last_id": "<string>"
}
```
The Files API allows you to upload and manage files to use with the Claude API without having to re-upload content with each request. For more information about the Files API, see the [developer guide for files](/en/docs/build-with-claude/files).
The Files API is currently in beta. To use the Files API, you’ll need to include the beta feature header: `anthropic-beta: files-api-2025-04-14`.Please reach out through our [feedback form](https://forms.gle/tisHyierGwgN4DUE9) to share your experience with the Files API.
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
#### Query Parameters
[​](#parameter-before-id)
before_id
string
ID of the object to use as a cursor for pagination. When provided, returns the page of results immediately before this object.
[​](#parameter-after-id)
after_id
string
ID of the object to use as a cursor for pagination. When provided, returns the page of results immediately after this object.
[​](#parameter-limit)
limit
integer
default:20
Number of items to return per page.
Defaults to `20`. Ranges from `1` to `1000`.
Required range: `1 <= x <= 1000`
#### Response
200
application/json
Successful Response
[​](#response-data)
data
FileMetadataSchema · object[]
required
List of file metadata objects.
Show child attributes
[​](#response-first-id)
first_id
string | null
ID of the first file in this page of results.
[​](#response-has-more)
has_more
boolean
default:false
Whether there are more results available.
[​](#response-last-id)
last_id
string | null
ID of the last file in this page of results.
Was this page helpful?
YesNo
[Create a File](/en/api/files-create)[Get File Metadata](/en/api/files-metadata)
Assistant
Responses are generated using AI and may contain mistakes.