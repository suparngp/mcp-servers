Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Organization Member Management
List Users
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
 * Organization Info
 * Organization Member Management
 * [GETGet User](/en/api/admin-api/users/get-user)
 * [GETList Users](/en/api/admin-api/users/list-users)
 * [POSTUpdate User](/en/api/admin-api/users/update-user)
 * [DELRemove User](/en/api/admin-api/users/remove-user)
 * Organization Invites
 * Workspace Management
 * Workspace Member Management
 * API Keys
 * Usage and Cost
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
curl "https://api.anthropic.com/v1/organizations/users" \
 --header "anthropic-version: 2023-06-01" \
 --header "content-type: application/json" \
 --header "x-api-key: $ANTHROPIC_ADMIN_KEY"
```
200
4XX
Copy
```
{
 "data": [
 {
 "added_at": "2024-10-30T23:58:27.427722Z",
 "email": "[email protected][](/cdn-cgi/l/email-protection)",
 "id": "user_01WCz1FkmYMm4gnmykNKUu3Q",
 "name": "Jane Doe",
 "role": "user",
 "type": "user"
 }
 ],
 "first_id": "<string>",
 "has_more": true,
 "last_id": "<string>"
}
```
GET
/
v1
/
organizations
/
users
cURL
cURL
Copy
```
curl "https://api.anthropic.com/v1/organizations/users" \
 --header "anthropic-version: 2023-06-01" \
 --header "content-type: application/json" \
 --header "x-api-key: $ANTHROPIC_ADMIN_KEY"
```
200
4XX
Copy
```
{
 "data": [
 {
 "added_at": "2024-10-30T23:58:27.427722Z",
 "email": "[email protected][](/cdn-cgi/l/email-protection)",
 "id": "user_01WCz1FkmYMm4gnmykNKUu3Q",
 "name": "Jane Doe",
 "role": "user",
 "type": "user"
 }
 ],
 "first_id": "<string>",
 "has_more": true,
 "last_id": "<string>"
}
```
#### Headers
[​](#parameter-x-api-key)
x-api-key
string
required
Your unique Admin API key for authentication.
This key is required in the header of all Admin API requests, to authenticate your account and access Anthropic's services. Get your Admin API key through the [Console](https://console.anthropic.com/settings/admin-keys).
[​](#parameter-anthropic-version)
anthropic-version
string
required
The version of the Claude API you want to use.
Read more about versioning and our version history [here](https://docs.claude.com/en/api/versioning).
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
[​](#parameter-email)
email
string<email>
Filter by user email.
#### Response
200
application/json
Successful Response
[​](#response-data)
data
User · object[]
required
Show child attributes
[​](#response-first-id)
first_id
string | null
required
First ID in the `data` list. Can be used as the `before_id` for the previous page.
[​](#response-has-more)
has_more
boolean
required
Indicates if there are more results in the requested page direction.
[​](#response-last-id)
last_id
string | null
required
Last ID in the `data` list. Can be used as the `after_id` for the next page.
Was this page helpful?
YesNo
[Get User](/en/api/admin-api/users/get-user)[Update User](/en/api/admin-api/users/update-user)
Assistant
Responses are generated using AI and may contain mistakes.