Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Skill Management
List Skills
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
 * [Using Skills](/en/api/skills-guide)
 * Skill Management
 * [POSTCreate Skill](/en/api/skills/create-skill)
 * [GETList Skills](/en/api/skills/list-skills)
 * [GETGet Skill](/en/api/skills/get-skill)
 * [DELDelete Skill](/en/api/skills/delete-skill)
 * Skill Versions
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
curl "https://api.anthropic.com/v1/skills" \
 -H "x-api-key: $ANTHROPIC_API_KEY" \
 -H "anthropic-version: 2023-06-01" \
 -H "anthropic-beta: skills-2025-10-02"
```
200
4XX
Copy
```
{
 "data": [
 {
 "created_at": "2024-10-30T23:58:27.427722Z",
 "display_title": "My Custom Skill",
 "id": "skill_01JAbcdefghijklmnopqrstuvw",
 "latest_version": "1759178010641129",
 "source": "custom",
 "type": "skill",
 "updated_at": "2024-10-30T23:58:27.427722Z"
 }
 ],
 "has_more": true,
 "next_page": "page_MjAyNS0wNS0xNFQwMDowMDowMFo="
}
```
GET
/
v1
/
skills
cURL
cURL
Copy
```
curl "https://api.anthropic.com/v1/skills" \
 -H "x-api-key: $ANTHROPIC_API_KEY" \
 -H "anthropic-version: 2023-06-01" \
 -H "anthropic-beta: skills-2025-10-02"
```
200
4XX
Copy
```
{
 "data": [
 {
 "created_at": "2024-10-30T23:58:27.427722Z",
 "display_title": "My Custom Skill",
 "id": "skill_01JAbcdefghijklmnopqrstuvw",
 "latest_version": "1759178010641129",
 "source": "custom",
 "type": "skill",
 "updated_at": "2024-10-30T23:58:27.427722Z"
 }
 ],
 "has_more": true,
 "next_page": "page_MjAyNS0wNS0xNFQwMDowMDowMFo="
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
#### Query Parameters
[​](#parameter-page)
page
string | null
Pagination token for fetching a specific page of results.
Pass the value from a previous response's `next_page` field to get the next page of results.
[​](#parameter-limit)
limit
integer
default:20
Number of results to return per page.
Maximum value is 100. Defaults to 20.
[​](#parameter-source)
source
string | null
Filter skills by source.
If provided, only skills from the specified source will be returned:
 * `"custom"`: only return user-created skills
 * `"anthropic"`: only return Anthropic-created skills
#### Response
200
application/json
Successful Response
[​](#response-data)
data
Skill · object[]
required
List of skills.
Show child attributes
[​](#response-has-more)
has_more
boolean
required
Whether there are more results available.
If `true`, there are additional results that can be fetched using the `next_page` token.
[​](#response-next-page)
next_page
string | null
required
Token for fetching the next page of results.
If `null`, there are no more results available. Pass this value to the `page_token` parameter in the next request to get the next page.
Examples:
`"page_MjAyNS0wNS0xNFQwMDowMDowMFo="`
`null`
Was this page helpful?
YesNo
[Create Skill](/en/api/skills/create-skill)[Get Skill](/en/api/skills/get-skill)
Assistant
Responses are generated using AI and may contain mistakes.