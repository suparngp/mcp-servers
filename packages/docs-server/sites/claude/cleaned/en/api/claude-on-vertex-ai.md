Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
3rd-party APIs
Vertex AI API
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
 * [Install an SDK for accessing Vertex AI](#install-an-sdk-for-accessing-vertex-ai)
 * [Accessing Vertex AI](#accessing-vertex-ai)
 * [Model Availability](#model-availability)
 * [API model IDs](#api-model-ids)
 * [Making requests](#making-requests)
 * [Activity logging](#activity-logging)
 * [Feature support](#feature-support)
 * [Global vs regional endpoints](#global-vs-regional-endpoints)
 * [When to use each option](#when-to-use-each-option)
 * [Implementation](#implementation)
 * [Additional resources](#additional-resources)
The Vertex API for accessing Claude is nearly-identical to the [Messages API](/en/api/messages) and supports all of the same options, with two key differences:
 * In Vertex, `model` is not passed in the request body. Instead, it is specified in the Google Cloud endpoint URL.
 * In Vertex, `anthropic_version` is passed in the request body (rather than as a header), and must be set to the value `vertex-2023-10-16`.
Vertex is also supported by Anthropic’s official [client SDKs](/en/api/client-sdks). This guide will walk you through the process of making a request to Claude on Vertex AI in either Python or TypeScript. Note that this guide assumes you have already have a GCP project that is able to use Vertex AI. See [using the Claude 3 models from Anthropic](https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-claude) for more information on the setup required, as well as a full walkthrough.
## 
[​](#install-an-sdk-for-accessing-vertex-ai)
Install an SDK for accessing Vertex AI
First, install Anthropic’s [client SDK](/en/api/client-sdks) for your language of choice.
Python
TypeScript
Copy
```
pip install -U google-cloud-aiplatform "anthropic[vertex]"
```
## 
[​](#accessing-vertex-ai)
Accessing Vertex AI
### 
[​](#model-availability)
Model Availability
Note that Anthropic model availability varies by region. Search for “Claude” in the [Vertex AI Model Garden](https://cloud.google.com/model-garden) or go to [Use Claude 3](https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-claude) for the latest information.
#### 
[​](#api-model-ids)
API model IDs
Model | Vertex AI API model ID 
---|--- 
Claude Sonnet 4.5 | claude-sonnet-4-5@20250929Copied! 
Claude Sonnet 4 | claude-sonnet-4@20250514Copied! 
Claude Sonnet 3.7 | claude-3-7-sonnet@20250219Copied! 
Claude Sonnet 3.5 ⚠️ | claude-3-5-sonnet-v2@20241022Copied! 
Claude Opus 4.1 | claude-opus-4-1@20250805Copied! 
Claude Opus 4 | claude-opus-4@20250514Copied! 
Claude Opus 3 ⚠️ | claude-3-opus@20240229Copied! 
Claude Haiku 4.5 | claude-haiku-4-5@20251001Copied! 
Claude Haiku 3.5 | claude-3-5-haiku@20241022Copied! 
Claude Haiku 3 | claude-3-haiku@20240307Copied! 
### 
[​](#making-requests)
Making requests
Before running requests you may need to run `gcloud auth application-default login` to authenticate with GCP. The following examples shows how to generate text from Claude on Vertex AI:
Python
TypeScript
Shell
Copy
```
from anthropic import AnthropicVertex
project_id = "MY_PROJECT_ID"
region = "global"
client = AnthropicVertex(project_id=project_id, region=region)
message = client.messages.create(
 model="claude-sonnet-4-5@20250929",
 max_tokens=100,
 messages=[
 {
 "role": "user",
 "content": "Hey Claude!",
 }
 ],
)
print(message)
```
See our [client SDKs](/en/api/client-sdks) and the official [Vertex AI docs](https://cloud.google.com/vertex-ai/docs) for more details.
## 
[​](#activity-logging)
Activity logging
Vertex provides a [request-response logging service](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/request-response-logging) that allows customers to log the prompts and completions associated with your usage. Anthropic recommends that you log your activity on at least a 30-day rolling basis in order to understand your activity and investigate any potential misuse.
Turning on this service does not give Google or Anthropic any access to your content.
## 
[​](#feature-support)
Feature support
You can find all the features currently supported on Vertex [here](/en/docs/build-with-claude/overview).
## 
[​](#global-vs-regional-endpoints)
Global vs regional endpoints
Starting with **Claude Sonnet 4.5 and all future models** , Google Vertex AI offers two endpoint types:
 * **Global endpoints** : Dynamic routing for maximum availability
 * **Regional endpoints** : Guaranteed data routing through specific geographic regions
Regional endpoints include a 10% pricing premium over global endpoints.
This applies to Claude Sonnet 4.5 and future models only. Older models (Claude Sonnet 4, Opus 4, and earlier) maintain their existing pricing structures.
### 
[​](#when-to-use-each-option)
When to use each option
**Global endpoints (recommended):**
 * Provide maximum availability and uptime
 * Dynamically route requests to regions with available capacity
 * No pricing premium
 * Best for applications where data residency is flexible
 * Only supports pay-as-you-go traffic (provisioned throughput requires regional endpoints)
**Regional endpoints:**
 * Route traffic through specific geographic regions
 * Required for data residency and compliance requirements
 * Support both pay-as-you-go and provisioned throughput
 * 10% pricing premium reflects infrastructure costs for dedicated regional capacity
### 
[​](#implementation)
Implementation
**Using global endpoints (recommended):** Set the `region` parameter to `"global"` when initializing the client:
Python
TypeScript
Copy
```
from anthropic import AnthropicVertex
project_id = "MY_PROJECT_ID"
region = "global"
client = AnthropicVertex(project_id=project_id, region=region)
message = client.messages.create(
 model="claude-sonnet-4-5@20250929",
 max_tokens=100,
 messages=[
 {
 "role": "user",
 "content": "Hey Claude!",
 }
 ],
)
print(message)
```
**Using regional endpoints:** Specify a specific region like `"us-east1"` or `"europe-west1"`:
Python
TypeScript
Copy
```
from anthropic import AnthropicVertex
project_id = "MY_PROJECT_ID"
region = "us-east1" # Specify a specific region
client = AnthropicVertex(project_id=project_id, region=region)
message = client.messages.create(
 model="claude-sonnet-4-5@20250929",
 max_tokens=100,
 messages=[
 {
 "role": "user",
 "content": "Hey Claude!",
 }
 ],
)
print(message)
```
### 
[​](#additional-resources)
Additional resources
 * **Google Vertex AI pricing:** [cloud.google.com/vertex-ai/generative-ai/pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing)
 * **Claude models documentation:** [Claude on Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/claude)
 * **Google blog post:** [Global endpoint for Claude models](https://cloud.google.com/blog/products/ai-machine-learning/global-endpoint-for-claude-models-generally-available-on-vertex-ai)
 * **Anthropic pricing details:** [Pricing documentation](/en/docs/about-claude/pricing#third-party-platform-pricing)
Was this page helpful?
YesNo
[Amazon Bedrock API](/en/api/claude-on-amazon-bedrock)[Admin API overview](/en/api/administration-api)
Assistant
Responses are generated using AI and may contain mistakes.