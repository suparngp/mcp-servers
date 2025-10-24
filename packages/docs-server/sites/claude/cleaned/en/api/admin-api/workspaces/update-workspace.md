Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Workspace Management
Update Workspace
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
 * [GETGet Workspace](/en/api/admin-api/workspaces/get-workspace)
 * [GETList Workspaces](/en/api/admin-api/workspaces/list-workspaces)
 * [POSTUpdate Workspace](/en/api/admin-api/workspaces/update-workspace)
 * [POSTCreate Workspace](/en/api/admin-api/workspaces/create-workspace)
 * [POSTArchive Workspace](/en/api/admin-api/workspaces/archive-workspace)
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
curl "https://api.anthropic.com/v1/organizations/workspaces/wrkspc_01JwQvzr7rXLA5AGx3HKfFUJ" \
 --header "anthropic-version: 2023-06-01" \
 --header "content-type: application/json" \
 --header "x-api-key: $ANTHROPIC_ADMIN_KEY" \
 --data '{
 "name": "Workspace Name"
 }'
```
200
4XX
Copy
```
{
 "archived_at": "2024-11-01T23:59:27.427722Z",
 "created_at": "2024-10-30T23:58:27.427722Z",
 "display_color": "#6C5BB9",
 "id": "wrkspc_01JwQvzr7rXLA5AGx3HKfFUJ",
 "name": "Workspace Name",
 "type": "workspace"
}
```
POST
/
v1
/
organizations
/
workspaces
/
{workspace_id}
cURL
cURL
Copy
```
curl "https://api.anthropic.com/v1/organizations/workspaces/wrkspc_01JwQvzr7rXLA5AGx3HKfFUJ" \
 --header "anthropic-version: 2023-06-01" \
 --header "content-type: application/json" \
 --header "x-api-key: $ANTHROPIC_ADMIN_KEY" \
 --data '{
 "name": "Workspace Name"
 }'
```
200
4XX
Copy
```
{
 "archived_at": "2024-11-01T23:59:27.427722Z",
 "created_at": "2024-10-30T23:58:27.427722Z",
 "display_color": "#6C5BB9",
 "id": "wrkspc_01JwQvzr7rXLA5AGx3HKfFUJ",
 "name": "Workspace Name",
 "type": "workspace"
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
[​](#parameter-workspace-id)
workspace_id
string
required
ID of the Workspace.
#### Body
application/json
[​](#body-name)
name
string
required
Name of the Workspace.
Required string length: `1 - 40`
#### Response
200
application/json
Successful Response
[​](#response-archived-at)
archived_at
string<date-time> | null
required
RFC 3339 datetime string indicating when the Workspace was archived, or null if the Workspace is not archived.
Examples:
`"2024-11-01T23:59:27.427722Z"`
[​](#response-created-at)
created_at
string<date-time>
required
RFC 3339 datetime string indicating when the Workspace was created.
Examples:
`"2024-10-30T23:58:27.427722Z"`
[​](#response-display-color)
display_color
string
required
Hex color code representing the Workspace in the Anthropic Console.
Examples:
`"#6C5BB9"`
[​](#response-id)
id
string
required
ID of the Workspace.
Examples:
`"wrkspc_01JwQvzr7rXLA5AGx3HKfFUJ"`
[​](#response-name)
name
string
required
Name of the Workspace.
Examples:
`"Workspace Name"`
[​](#response-type)
type
enum<string>
default:workspace
required
Object type.
For Workspaces, this is always `"workspace"`.
Available options: Title | Const 
---|--- 
Type | `workspace` 
Was this page helpful?
YesNo
[List Workspaces](/en/api/admin-api/workspaces/list-workspaces)[Create Workspace](/en/api/admin-api/workspaces/create-workspace)
Assistant
Responses are generated using AI and may contain mistakes.