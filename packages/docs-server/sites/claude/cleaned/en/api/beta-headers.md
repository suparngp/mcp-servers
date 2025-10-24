Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Using the APIs
Beta headers
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
On this page
 * [How to use beta headers](#how-to-use-beta-headers)
 * [Multiple beta features](#multiple-beta-features)
 * [Version naming conventions](#version-naming-conventions)
 * [Error handling](#error-handling)
 * [Getting help](#getting-help)
Beta headers allow you to access experimental features and new model capabilities before they become part of the standard API. These features are subject to change and may be modified or removed in future releases.
Beta headers are often used in conjunction with the [beta namespace in the client SDKs](/en/api/client-sdks#beta-namespace-in-client-sdks)
## 
[​](#how-to-use-beta-headers)
How to use beta headers
To access beta features, include the `anthropic-beta` header in your API requests:
Copy
```
POST /v1/messages
Content-Type: application/json
X-API-Key: YOUR_API_KEY
anthropic-beta: BETA_FEATURE_NAME
```
When using the SDK, you can specify beta headers in the request options:
Python
TypeScript
cURL
Copy
```
from anthropic import Anthropic
client = Anthropic()
response = client.beta.messages.create(
 model="claude-sonnet-4-5",
 max_tokens=1024,
 messages=[
 {"role": "user", "content": "Hello, Claude"}
 ],
 betas=["beta-feature-name"]
)
```
Beta features are experimental and may:
 * Have breaking changes without notice
 * Be deprecated or removed
 * Have different rate limits or pricing
 * Not be available in all regions
### 
[​](#multiple-beta-features)
Multiple beta features
To use multiple beta features in a single request, include all feature names in the header separated by commas:
Copy
```
anthropic-beta: feature1,feature2,feature3
```
### 
[​](#version-naming-conventions)
Version naming conventions
Beta feature names typically follow the pattern: `feature-name-YYYY-MM-DD`, where the date indicates when the beta version was released. Always use the exact beta feature name as documented.
## 
[​](#error-handling)
Error handling
If you use an invalid or unavailable beta header, you’ll receive an error response:
Copy
```
{
 "type": "error",
 "error": {
 "type": "invalid_request_error",
 "message": "Unsupported beta header: invalid-beta-name"
 }
}
```
## 
[​](#getting-help)
Getting help
For questions about beta features:
 1. Check the documentation for the specific feature
 2. Review the [API changelog](/en/api/versioning) for updates
 3. Contact support for assistance with production usage
Remember that beta features are provided “as-is” and may not have the same SLA guarantees as stable API features.
Was this page helpful?
YesNo
[Handling stop reasons](/en/api/handling-stop-reasons)[Messages](/en/api/messages)
Assistant
Responses are generated using AI and may contain mistakes.