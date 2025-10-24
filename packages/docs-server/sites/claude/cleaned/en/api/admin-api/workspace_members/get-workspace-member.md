Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Workspace Member Management
Get Workspace Member
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
 * [GETGet Workspace Member](/en/api/admin-api/workspace_members/get-workspace-member)
 * [GETList Workspace Members](/en/api/admin-api/workspace_members/list-workspace-members)
 * [POSTAdd Workspace Member](/en/api/admin-api/workspace_members/create-workspace-member)
 * [POSTUpdate Workspace Member](/en/api/admin-api/workspace_members/update-workspace-member)
 * [DELDelete Workspace Member](/en/api/admin-api/workspace_members/delete-workspace-member)
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
curl "https://api.anthropic.com/v1/organizations/workspaces/wrkspc_01JwQvzr7rXLA5AGx3HKfFUJ/members/user_01WCz1FkmYMm4gnmykNKUu3Q" \
 --header "anthropic-version: 2023-06-01" \
 --header "content-type: application/json" \
 --header "x-api-key: $ANTHROPIC_ADMIN_KEY"
```
200
4XX
Copy
```
{
 "type": "workspace_member",
 "user_id": "user_01WCz1FkmYMm4gnmykNKUu3Q",
 "workspace_id": "wrkspc_01JwQvzr7rXLA5AGx3HKfFUJ",
 "workspace_role": "workspace_user"
}
```
GET
/
v1
/
organizations
/
workspaces
/
{workspace_id}
/
members
/
{user_id}
cURL
cURL
Copy
```
curl "https://api.anthropic.com/v1/organizations/workspaces/wrkspc_01JwQvzr7rXLA5AGx3HKfFUJ/members/user_01WCz1FkmYMm4gnmykNKUu3Q" \
 --header "anthropic-version: 2023-06-01" \
 --header "content-type: application/json" \
 --header "x-api-key: $ANTHROPIC_ADMIN_KEY"
```
200
4XX
Copy
```
{
 "type": "workspace_member",
 "user_id": "user_01WCz1FkmYMm4gnmykNKUu3Q",
 "workspace_id": "wrkspc_01JwQvzr7rXLA5AGx3HKfFUJ",
 "workspace_role": "workspace_user"
}
```
**The Admin API is unavailable for individual accounts.** To collaborate with teammates and add members, set up your organization in **Console → Settings → Organization**.
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
[​](#parameter-user-id)
user_id
string
required
ID of the User.
[​](#parameter-workspace-id)
workspace_id
string
required
ID of the Workspace.
#### Response
200
application/json
Successful Response
[​](#response-type)
type
enum<string>
default:workspace_member
required
Object type.
For Workspace Members, this is always `"workspace_member"`.
Available options: Title | Const 
---|--- 
Type | `workspace_member` 
[​](#response-user-id)
user_id
string
required
ID of the User.
Examples:
`"user_01WCz1FkmYMm4gnmykNKUu3Q"`
[​](#response-workspace-id)
workspace_id
string
required
ID of the Workspace.
Examples:
`"wrkspc_01JwQvzr7rXLA5AGx3HKfFUJ"`
[​](#response-workspace-role)
workspace_role
enum<string>
required
Role of the Workspace Member.
Available options:
`workspace_user`,
`workspace_developer`,
`workspace_admin`,
`workspace_billing`
Was this page helpful?
YesNo
[Archive Workspace](/en/api/admin-api/workspaces/archive-workspace)[List Workspace Members](/en/api/admin-api/workspace_members/list-workspace-members)
Assistant
Responses are generated using AI and may contain mistakes.