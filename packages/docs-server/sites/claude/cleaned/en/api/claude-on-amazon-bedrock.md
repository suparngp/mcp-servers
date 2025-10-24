Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
3rd-party APIs
Amazon Bedrock API
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
 * [Install and configure the AWS CLI](#install-and-configure-the-aws-cli)
 * [Install an SDK for accessing Bedrock](#install-an-sdk-for-accessing-bedrock)
 * [Accessing Bedrock](#accessing-bedrock)
 * [Subscribe to Anthropic models](#subscribe-to-anthropic-models)
 * [API model IDs](#api-model-ids)
 * [List available models](#list-available-models)
 * [Making requests](#making-requests)
 * [Activity logging](#activity-logging)
 * [Feature support](#feature-support)
 * [PDF Support on Bedrock](#pdf-support-on-bedrock)
 * [1M token context window](#1m-token-context-window)
 * [Global vs regional endpoints](#global-vs-regional-endpoints)
 * [When to use each option](#when-to-use-each-option)
 * [Implementation](#implementation)
 * [Additional resources](#additional-resources)
Calling Claude through Bedrock slightly differs from how you would call Claude when using Anthropic’s client SDK’s. This guide will walk you through the process of completing an API call to Claude on Bedrock in either Python or TypeScript. Note that this guide assumes you have already signed up for an [AWS account](https://portal.aws.amazon.com/billing/signup) and configured programmatic access.
## 
[​](#install-and-configure-the-aws-cli)
Install and configure the AWS CLI
 1. [Install a version of the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) at or newer than version `2.13.23`
 2. Configure your AWS credentials using the AWS configure command (see [Configure the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)) or find your credentials by navigating to “Command line or programmatic access” within your AWS dashboard and following the directions in the popup modal.
 3. Verify that your credentials are working:
Shell
Copy
```
aws sts get-caller-identity
```
## 
[​](#install-an-sdk-for-accessing-bedrock)
Install an SDK for accessing Bedrock
Anthropic’s [client SDKs](/en/api/client-sdks) support Bedrock. You can also use an AWS SDK like `boto3` directly.
Python
TypeScript
Boto3 (Python)
Copy
```
pip install -U "anthropic[bedrock]"
```
## 
[​](#accessing-bedrock)
Accessing Bedrock
### 
[​](#subscribe-to-anthropic-models)
Subscribe to Anthropic models
Go to the [AWS Console > Bedrock > Model Access](https://console.aws.amazon.com/bedrock/home?region=us-west-2#/modelaccess) and request access to Anthropic models. Note that Anthropic model availability varies by region. See [AWS documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/models-regions.html) for latest information.
#### 
[​](#api-model-ids)
API model IDs
Model | Base Bedrock model ID | `global` | `us` | `eu` | `jp` | `apac` 
---|---|---|---|---|---|--- 
Claude Sonnet 4.5 | anthropic.claude-sonnet-4-5-20250929-v1:0Copied! | Yes | Yes | Yes | Yes | No 
Claude Sonnet 4 | anthropic.claude-sonnet-4-20250514-v1:0Copied! | Yes | Yes | Yes | No | Yes 
Claude Sonnet 3.7 | anthropic.claude-3-7-sonnet-20250219-v1:0Copied! | No | Yes | Yes | No | Yes 
Claude Sonnet 3.5 ⚠️ | anthropic.claude-3-5-sonnet-20241022-v2:0Copied! | No | Yes | No | No | Yes 
Claude Opus 4.1 | anthropic.claude-opus-4-1-20250805-v1:0Copied! | No | Yes | No | No | No 
Claude Opus 4 | anthropic.claude-opus-4-20250514-v1:0Copied! | No | Yes | No | No | No 
Claude Opus 3 ⚠️ | anthropic.claude-3-opus-20240229-v1:0Copied! | No | Yes | No | No | No 
Claude Haiku 4.5 | anthropic.claude-haiku-4-5-20251001-v1:0Copied! | Yes | Yes | Yes | No | No 
Claude Haiku 3.5 | anthropic.claude-3-5-haiku-20241022-v1:0Copied! | No | Yes | No | No | No 
Claude Haiku 3 | anthropic.claude-3-haiku-20240307-v1:0Copied! | No | Yes | Yes | No | Yes 
For more information about regional vs global model IDs, see the [Global vs regional endpoints](#global-vs-regional-endpoints) section below.
### 
[​](#list-available-models)
List available models
The following examples show how to print a list of all the Claude models available through Bedrock:
AWS CLI
Boto3 (Python)
Copy
```
aws bedrock list-foundation-models --region=us-west-2 --by-provider anthropic --query "modelSummaries[*].modelId"
```
### 
[​](#making-requests)
Making requests
The following examples show how to generate text from Claude on Bedrock:
Python
TypeScript
Boto3 (Python)
Copy
```
from anthropic import AnthropicBedrock
client = AnthropicBedrock(
 # Authenticate by either providing the keys below or use the default AWS credential providers, such as
 # using ~/.aws/credentials or the "AWS_SECRET_ACCESS_KEY" and "AWS_ACCESS_KEY_ID" environment variables.
 aws_access_key="<access key>",
 aws_secret_key="<secret key>",
 # Temporary credentials can be used with aws_session_token.
 # Read more at https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html.
 aws_session_token="<session_token>",
 # aws_region changes the aws region to which the request is made. By default, we read AWS_REGION,
 # and if that's not present, we default to us-east-1. Note that we do not read ~/.aws/config for the region.
 aws_region="us-west-2",
)
message = client.messages.create(
 model="global.anthropic.claude-sonnet-4-5-20250929-v1:0",
 max_tokens=256,
 messages=[{"role": "user", "content": "Hello, world"}]
)
print(message.content)
```
See our [client SDKs](/en/api/client-sdks) for more details, and the official Bedrock docs [here](https://docs.aws.amazon.com/bedrock/).
## 
[​](#activity-logging)
Activity logging
Bedrock provides an [invocation logging service](https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html) that allows customers to log the prompts and completions associated with your usage. Anthropic recommends that you log your activity on at least a 30-day rolling basis in order to understand your activity and investigate any potential misuse.
Turning on this service does not give AWS or Anthropic any access to your content.
## 
[​](#feature-support)
Feature support
You can find all the features currently supported on Bedrock [here](/en/docs/build-with-claude/overview).
### 
[​](#pdf-support-on-bedrock)
PDF Support on Bedrock
PDF support is available on Amazon Bedrock through both the Converse API and InvokeModel API. For detailed information about PDF processing capabilities and limitations, see the [PDF support documentation](/en/docs/build-with-claude/pdf-support#amazon-bedrock-pdf-support). **Important considerations for Converse API users:**
 * Visual PDF analysis (charts, images, layouts) requires citations to be enabled
 * Without citations, only basic text extraction is available
 * For full control without forced citations, use the InvokeModel API
For more details on the two document processing modes and their limitations, refer to the [PDF support guide](/en/docs/build-with-claude/pdf-support#amazon-bedrock-pdf-support).
### 
[​](#1m-token-context-window)
1M token context window
Claude Sonnet 4 and 4.5 support the [1M token context window](/en/docs/build-with-claude/context-windows#1m-token-context-window) on Amazon Bedrock.
The 1M token context window is currently in beta. To use the extended context window, include the `context-1m-2025-08-07` beta header in your [Bedrock API requests](https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-anthropic-claude-messages-request-response.html).
## 
[​](#global-vs-regional-endpoints)
Global vs regional endpoints
Starting with **Claude Sonnet 4.5 and all future models** , Amazon Bedrock offers two endpoint types:
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
**Regional endpoints (CRIS):**
 * Route traffic through specific geographic regions
 * Required for data residency and compliance requirements
 * Available for US, EU, Japan, and Australia
 * 10% pricing premium reflects infrastructure costs for dedicated regional capacity
### 
[​](#implementation)
Implementation
**Using global endpoints (default for Sonnet 4.5 and 4):** The model IDs for Claude Sonnet 4.5 and 4 already include the `global.` prefix:
Python
TypeScript
Copy
```
from anthropic import AnthropicBedrock
client = AnthropicBedrock(aws_region="us-west-2")
message = client.messages.create(
 model="global.anthropic.claude-sonnet-4-5-20250929-v1:0",
 max_tokens=256,
 messages=[{"role": "user", "content": "Hello, world"}]
)
```
**Using regional endpoints (CRIS):** To use regional endpoints, remove the `global.` prefix from the model ID:
Python
TypeScript
Copy
```
from anthropic import AnthropicBedrock
client = AnthropicBedrock(aws_region="us-west-2")
# Using US regional endpoint (CRIS)
message = client.messages.create(
 model="anthropic.claude-sonnet-4-5-20250929-v1:0", # No global. prefix
 max_tokens=256,
 messages=[{"role": "user", "content": "Hello, world"}]
)
```
### 
[​](#additional-resources)
Additional resources
 * **AWS Bedrock pricing:** [aws.amazon.com/bedrock/pricing](https://aws.amazon.com/bedrock/pricing/)
 * **AWS pricing documentation:** [Bedrock pricing guide](https://docs.aws.amazon.com/bedrock/latest/userguide/bedrock-pricing.html)
 * **AWS blog post:** [Introducing Claude Sonnet 4.5 in Amazon Bedrock](https://aws.amazon.com/blogs/aws/introducing-claude-sonnet-4-5-in-amazon-bedrock-anthropics-most-intelligent-model-best-for-coding-and-complex-agents/)
 * **Anthropic pricing details:** [Pricing documentation](/en/docs/about-claude/pricing#third-party-platform-pricing)
Was this page helpful?
YesNo
[Message Batches examples](/en/api/messages-batch-examples)[Vertex AI API](/en/api/claude-on-vertex-ai)
Assistant
Responses are generated using AI and may contain mistakes.