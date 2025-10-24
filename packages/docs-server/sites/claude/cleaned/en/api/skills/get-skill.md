Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Skill Management
Get Skill
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
curl "https://api.anthropic.com/v1/skills/skill_01AbCdEfGhIjKlMnOpQrStUv" \
 -H "x-api-key: $ANTHROPIC_API_KEY" \
 -H "anthropic-version: 2023-06-01" \
 -H "anthropic-beta: skills-2025-10-02"
```
200
4XX
Copy
```
{
 "created_at": "2024-10-30T23:58:27.427722Z",
 "display_title": "My Custom Skill",
 "id": "skill_01JAbcdefghijklmnopqrstuvw",
 "latest_version": "1759178010641129",
 "source": "custom",
 "type": "skill",
 "updated_at": "2024-10-30T23:58:27.427722Z"
}
```
GET
/
v1
/
skills
/
{skill_id}
cURL
cURL
Copy
```
curl "https://api.anthropic.com/v1/skills/skill_01AbCdEfGhIjKlMnOpQrStUv" \
 -H "x-api-key: $ANTHROPIC_API_KEY" \
 -H "anthropic-version: 2023-06-01" \
 -H "anthropic-beta: skills-2025-10-02"
```
200
4XX
Copy
```
{
 "created_at": "2024-10-30T23:58:27.427722Z",
 "display_title": "My Custom Skill",
 "id": "skill_01JAbcdefghijklmnopqrstuvw",
 "latest_version": "1759178010641129",
 "source": "custom",
 "type": "skill",
 "updated_at": "2024-10-30T23:58:27.427722Z"
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
[​](#parameter-skill-id)
skill_id
string
required
Unique identifier for the skill.
The format and length of IDs may change over time.
#### Response
200
application/json
Successful Response
[​](#response-created-at)
created_at
string
required
ISO 8601 timestamp of when the skill was created.
Examples:
`"2024-10-30T23:58:27.427722Z"`
[​](#response-display-title)
display_title
string | null
required
Display title for the skill.
This is a human-readable label that is not included in the prompt sent to the model.
Examples:
`"My Custom Skill"`
[​](#response-id)
id
string
required
Unique identifier for the skill.
The format and length of IDs may change over time.
Examples:
`"skill_01JAbcdefghijklmnopqrstuvw"`
[​](#response-latest-version)
latest_version
string | null
required
The latest version identifier for the skill.
This represents the most recent version of the skill that has been created.
Examples:
`"1759178010641129"`
[​](#response-source)
source
string
required
Source of the skill.
This may be one of the following values:
 * `"custom"`: the skill was created by a user
 * `"anthropic"`: the skill was created by Anthropic
Examples:
`"custom"`
[​](#response-type)
type
string
default:skill
required
Object type.
For Skills, this is always `"skill"`.
[​](#response-updated-at)
updated_at
string
required
ISO 8601 timestamp of when the skill was last updated.
Examples:
`"2024-10-30T23:58:27.427722Z"`
Was this page helpful?
YesNo
[List Skills](/en/api/skills/list-skills)[Delete Skill](/en/api/skills/delete-skill)
Assistant
Responses are generated using AI and may contain mistakes.