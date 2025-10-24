Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Usage and Cost
Get Claude Code Usage Report
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
curl "https://api.anthropic.com/v1/organizations/usage_report/claude_code\
?starting_at=2025-08-08\
&limit=20" \
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
 "actor": {
 "email_address": "[email protected][](/cdn-cgi/l/email-protection)",
 "type": "user_actor"
 },
 "core_metrics": {
 "commits_by_claude_code": 8,
 "lines_of_code": {
 "added": 342,
 "removed": 128
 },
 "num_sessions": 15,
 "pull_requests_by_claude_code": 2
 },
 "customer_type": "api",
 "date": "2025-08-08T00:00:00Z",
 "model_breakdown": [
 {
 "estimated_cost": {
 "amount": 186,
 "currency": "USD"
 },
 "model": "claude-sonnet-4-20250514",
 "tokens": {
 "cache_creation": 2340,
 "cache_read": 8790,
 "input": 45230,
 "output": 12450
 }
 },
 {
 "estimated_cost": {
 "amount": 42,
 "currency": "USD"
 },
 "model": "claude-3-5-haiku-20241022",
 "tokens": {
 "cache_creation": 890,
 "cache_read": 3420,
 "input": 23100,
 "output": 5680
 }
 }
 ],
 "organization_id": "12345678-1234-5678-1234-567812345678",
 "subscription_type": "enterprise",
 "terminal_type": "iTerm.app",
 "tool_actions": {
 "edit_tool": {
 "accepted": 25,
 "rejected": 3
 },
 "multi_edit_tool": {
 "accepted": 12,
 "rejected": 1
 },
 "notebook_edit_tool": {
 "accepted": 5,
 "rejected": 2
 },
 "write_tool": {
 "accepted": 8,
 "rejected": 0
 }
 }
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
claude_code
cURL
cURL
Copy
```
curl "https://api.anthropic.com/v1/organizations/usage_report/claude_code\
?starting_at=2025-08-08\
&limit=20" \
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
 "actor": {
 "email_address": "[email protected][](/cdn-cgi/l/email-protection)",
 "type": "user_actor"
 },
 "core_metrics": {
 "commits_by_claude_code": 8,
 "lines_of_code": {
 "added": 342,
 "removed": 128
 },
 "num_sessions": 15,
 "pull_requests_by_claude_code": 2
 },
 "customer_type": "api",
 "date": "2025-08-08T00:00:00Z",
 "model_breakdown": [
 {
 "estimated_cost": {
 "amount": 186,
 "currency": "USD"
 },
 "model": "claude-sonnet-4-20250514",
 "tokens": {
 "cache_creation": 2340,
 "cache_read": 8790,
 "input": 45230,
 "output": 12450
 }
 },
 {
 "estimated_cost": {
 "amount": 42,
 "currency": "USD"
 },
 "model": "claude-3-5-haiku-20241022",
 "tokens": {
 "cache_creation": 890,
 "cache_read": 3420,
 "input": 23100,
 "output": 5680
 }
 }
 ],
 "organization_id": "12345678-1234-5678-1234-567812345678",
 "subscription_type": "enterprise",
 "terminal_type": "iTerm.app",
 "tool_actions": {
 "edit_tool": {
 "accepted": 25,
 "rejected": 3
 },
 "multi_edit_tool": {
 "accepted": 12,
 "rejected": 1
 },
 "notebook_edit_tool": {
 "accepted": 5,
 "rejected": 2
 },
 "write_tool": {
 "accepted": 8,
 "rejected": 0
 }
 }
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
[​](#parameter-starting-at)
starting_at
string
required
UTC date in YYYY-MM-DD format. Returns metrics for this single day only.
[​](#parameter-limit)
limit
integer
default:20
Number of records per page (default: 20, max: 1000).
Required range: `1 <= x <= 1000`
[​](#parameter-page)
page
string | null
Opaque cursor token from previous response's `next_page` field.
#### Response
200
application/json
Successful Response
[​](#response-data)
data
ClaudeCodeUsageReportItem · object[]
required
List of Claude Code usage records for the requested date.
Show child attributes
[​](#response-has-more)
has_more
boolean
required
True if there are more records available beyond the current page.
[​](#response-next-page)
next_page
string | null
required
Opaque cursor token for fetching the next page of results, or null if no more pages are available.
Examples:
`"page_MjAyNS0wNS0xNFQwMDowMDowMFo="`
`null`
Was this page helpful?
YesNo
[Get Cost Report](/en/api/admin-api/usage-cost/get-cost-report)[Generate a prompt](/en/api/prompt-tools-generate)
Assistant
Responses are generated using AI and may contain mistakes.