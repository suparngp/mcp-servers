Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Usage and Cost
Get Usage Report for the Messages API
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
 * Usage and Cost
 * [GETGet Usage Report for the Messages API](/en/api/admin-api/usage-cost/get-messages-usage-report)
 * [GETGet Cost Report](/en/api/admin-api/usage-cost/get-cost-report)
 * [GETGet Claude Code Usage Report](/en/api/admin-api/claude-code/get-claude-code-usage-report)
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
curl "https://api.anthropic.com/v1/organizations/usage_report/messages\
?starting_at=2025-08-01T00:00:00Z\
&group_by[]=api_key_id\
&group_by[]=workspace_id\
&group_by[]=model\
&group_by[]=service_tier\
&group_by[]=context_window\
&limit=1" \
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
 "starting_at": "2025-08-01T00:00:00Z",
 "ending_at": "2025-08-02T00:00:00Z",
 "results": [
 {
 "uncached_input_tokens": 1500,
 "cache_creation": {
 "ephemeral_1h_input_tokens": 1000,
 "ephemeral_5m_input_tokens": 500
 },
 "cache_read_input_tokens": 200,
 "output_tokens": 500,
 "server_tool_use": {
 "web_search_requests": 10
 },
 "api_key_id": "apikey_01Rj2N8SVvo6BePZj99NhmiT",
 "workspace_id": "wrkspc_01JwQvzr7rXLA5AGx3HKfFUJ",
 "model": "claude-sonnet-4-20250514",
 "service_tier": "standard",
 "context_window": "0-200k"
 }
 ]
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
organizations
/
usage_report
/
messages
cURL
cURL
Copy
```
curl "https://api.anthropic.com/v1/organizations/usage_report/messages\
?starting_at=2025-08-01T00:00:00Z\
&group_by[]=api_key_id\
&group_by[]=workspace_id\
&group_by[]=model\
&group_by[]=service_tier\
&group_by[]=context_window\
&limit=1" \
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
 "starting_at": "2025-08-01T00:00:00Z",
 "ending_at": "2025-08-02T00:00:00Z",
 "results": [
 {
 "uncached_input_tokens": 1500,
 "cache_creation": {
 "ephemeral_1h_input_tokens": 1000,
 "ephemeral_5m_input_tokens": 500
 },
 "cache_read_input_tokens": 200,
 "output_tokens": 500,
 "server_tool_use": {
 "web_search_requests": 10
 },
 "api_key_id": "apikey_01Rj2N8SVvo6BePZj99NhmiT",
 "workspace_id": "wrkspc_01JwQvzr7rXLA5AGx3HKfFUJ",
 "model": "claude-sonnet-4-20250514",
 "service_tier": "standard",
 "context_window": "0-200k"
 }
 ]
 }
 ],
 "has_more": true,
 "next_page": "page_MjAyNS0wNS0xNFQwMDowMDowMFo="
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
#### Query Parameters
[​](#parameter-limit)
limit
integer
Maximum number of time buckets to return in the response.
The default and max limits depend on `bucket_width`: • `"1d"`: Default of 7 days, maximum of 31 days • `"1h"`: Default of 24 hours, maximum of 168 hours • `"1m"`: Default of 60 minutes, maximum of 1440 minutes
Examples:
`7`
[​](#parameter-page)
page
string<date-time> | null
Optionally set to the `next_page` token from the previous response.
Examples:
`"page_MjAyNS0wNS0xNFQwMDowMDowMFo="`
`null`
[​](#parameter-starting-at)
starting_at
string<date-time>
required
Time buckets that start on or after this RFC 3339 timestamp will be returned. Each time bucket will be snapped to the start of the minute/hour/day in UTC.
Examples:
`"2024-10-30T23:58:27.427722Z"`
[​](#parameter-ending-at)
ending_at
string<date-time> | null
Time buckets that end before this RFC 3339 timestamp will be returned.
Examples:
`"2024-10-30T23:58:27.427722Z"`
[​](#parameter-api-key-ids)
api_key_ids[]
string[] | null
Restrict usage returned to the specified API key ID(s).
Examples:
`"apikey_01Rj2N8SVvo6BePZj99NhmiT"`
[​](#parameter-workspace-ids)
workspace_ids[]
string[] | null
Restrict usage returned to the specified workspace ID(s).
Examples:
`"wrkspc_01JwQvzr7rXLA5AGx3HKfFUJ"`
[​](#parameter-models)
models[]
string[] | null
Restrict usage returned to the specified model(s).
Examples:
`"claude-sonnet-4-20250514"`
`"claude-3-5-haiku-20241022"`
[​](#parameter-service-tiers)
service_tiers[]
enum<string>[] | null
Restrict usage returned to the specified service tier(s).
Show child attributes
Examples:
`"standard"`
`"batch"`
`"priority"`
[​](#parameter-context-window)
context_window[]
enum<string>[] | null
Restrict usage returned to the specified context window(s).
Show child attributes
Examples:
`"0-200k"`
`"200k-1M"`
[​](#parameter-group-by)
group_by[]
enum<string>[] | null
Group by any subset of the available options.
Show child attributes
Examples:
`"api_key_id"`
`"workspace_id"`
`"model"`
`"service_tier"`
`"context_window"`
[​](#parameter-bucket-width)
bucket_width
enum<string>
Time granularity of the response data.
Available options:
`1d`,
`1m`,
`1h`
#### Response
200
application/json
Successful Response
[​](#response-data)
data
MessagesUsageReportTimeBucket · object[]
required
Show child attributes
[​](#response-has-more)
has_more
boolean
required
Indicates if there are more results.
[​](#response-next-page)
next_page
string<date-time> | null
required
Token to provide in as `page` in the subsequent request to retrieve the next page of data.
Examples:
`"page_MjAyNS0wNS0xNFQwMDowMDowMFo="`
`null`
Was this page helpful?
YesNo
[Update API Keys](/en/api/admin-api/apikeys/update-api-key)[Get Cost Report](/en/api/admin-api/usage-cost/get-cost-report)
Assistant
Responses are generated using AI and may contain mistakes.