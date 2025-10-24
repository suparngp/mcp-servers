Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
API Keys
Update API Keys
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
 * Organization Invites
 * Workspace Management
 * Workspace Member Management
 * API Keys
 * [GETGet API Key](/en/api/admin-api/apikeys/get-api-key)
 * [GETList API Keys](/en/api/admin-api/apikeys/list-api-keys)
 * [POSTUpdate API Keys](/en/api/admin-api/apikeys/update-api-key)
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
curl "https://api.anthropic.com/v1/organizations/api_keys/apikey_01Rj2N8SVvo6BePZj99NhmiT" \
 --header "anthropic-version: 2023-06-01" \
 --header "content-type: application/json" \
 --header "x-api-key: $ANTHROPIC_ADMIN_KEY" \
 --data '{
 "status": "active",
 "name": "Developer Key"
 }'
```
200
4XX
Copy
```
{
 "created_at": "2024-10-30T23:58:27.427722Z",
 "created_by": {
 "id": "user_01WCz1FkmYMm4gnmykNKUu3Q",
 "type": "user"
 },
 "id": "apikey_01Rj2N8SVvo6BePZj99NhmiT",
 "name": "Developer Key",
 "partial_key_hint": "sk-ant-api03-R2D...igAA",
 "status": "active",
 "type": "api_key",
 "workspace_id": "wrkspc_01JwQvzr7rXLA5AGx3HKfFUJ"
}
```
POST
/
v1
/
organizations
/
api_keys
/
{api_key_id}
cURL
cURL
Copy
```
curl "https://api.anthropic.com/v1/organizations/api_keys/apikey_01Rj2N8SVvo6BePZj99NhmiT" \
 --header "anthropic-version: 2023-06-01" \
 --header "content-type: application/json" \
 --header "x-api-key: $ANTHROPIC_ADMIN_KEY" \
 --data '{
 "status": "active",
 "name": "Developer Key"
 }'
```
200
4XX
Copy
```
{
 "created_at": "2024-10-30T23:58:27.427722Z",
 "created_by": {
 "id": "user_01WCz1FkmYMm4gnmykNKUu3Q",
 "type": "user"
 },
 "id": "apikey_01Rj2N8SVvo6BePZj99NhmiT",
 "name": "Developer Key",
 "partial_key_hint": "sk-ant-api03-R2D...igAA",
 "status": "active",
 "type": "api_key",
 "workspace_id": "wrkspc_01JwQvzr7rXLA5AGx3HKfFUJ"
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
#### Path Parameters
[​](#parameter-api-key-id)
api_key_id
string
required
ID of the API key.
#### Body
application/json
[​](#body-name)
name
string
Name of the API key.
Required string length: `1 - 500`
[​](#body-status)
status
enum<string> | null
Status of the API key.
Available options:
`active`,
`inactive`,
`archived`
#### Response
200
application/json
Successful Response
[​](#response-created-at)
created_at
string<date-time>
required
RFC 3339 datetime string indicating when the API Key was created.
Examples:
`"2024-10-30T23:58:27.427722Z"`
[​](#response-created-by)
created_by
object
required
The ID and type of the actor that created the API key.
Show child attributes
[​](#response-id)
id
string
required
ID of the API key.
Examples:
`"apikey_01Rj2N8SVvo6BePZj99NhmiT"`
[​](#response-name)
name
string
required
Name of the API key.
Examples:
`"Developer Key"`
[​](#response-partial-key-hint)
partial_key_hint
string | null
required
Partially redacted hint for the API key.
Examples:
`"sk-ant-api03-R2D...igAA"`
[​](#response-status)
status
enum<string>
required
Status of the API key.
Available options:
`active`,
`inactive`,
`archived`
Examples:
`"active"`
[​](#response-type)
type
enum<string>
default:api_key
required
Object type.
For API Keys, this is always `"api_key"`.
Available options: Title | Const 
---|--- 
Type | `api_key` 
[​](#response-workspace-id)
workspace_id
string | null
required
ID of the Workspace associated with the API key, or null if the API key belongs to the default Workspace.
Examples:
`"wrkspc_01JwQvzr7rXLA5AGx3HKfFUJ"`
Was this page helpful?
YesNo
[List API Keys](/en/api/admin-api/apikeys/list-api-keys)[Get Usage Report for the Messages API](/en/api/admin-api/usage-cost/get-messages-usage-report)
Assistant
Responses are generated using AI and may contain mistakes.