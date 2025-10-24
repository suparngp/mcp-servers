Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
SDKs
Client SDKs
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
 * [Python](#python)
 * [TypeScript](#typescript)
 * [Java](#java)
 * [Go](#go)
 * [C#](#c%23)
 * [Ruby](#ruby)
 * [PHP](#php)
 * [Beta namespace in client SDKs](#beta-namespace-in-client-sdks)
> Additional configuration is needed to use Anthropic’s Client SDKs through a partner platform. If you are using Amazon Bedrock, see [this guide](/en/api/claude-on-amazon-bedrock); if you are using Google Cloud Vertex AI, see [this guide](/en/api/claude-on-vertex-ai).
## 
[​](#python)
Python
[Python library GitHub repo](https://github.com/anthropics/anthropic-sdk-python) Example:
Python
Copy
```
import anthropic
client = anthropic.Anthropic(
 # defaults to os.environ.get("ANTHROPIC_API_KEY")
 api_key="my_api_key",
)
message = client.messages.create(
 model="claude-sonnet-4-5",
 max_tokens=1024,
 messages=[
 {"role": "user", "content": "Hello, Claude"}
 ]
)
print(message.content)
```
Accepted `model` strings:
Copy
```
# Claude 4 Models
"claude-opus-4-1-20250805"
"claude-opus-4-1" # alias
"claude-opus-4-20250514"
"claude-opus-4-0" # alias
"claude-sonnet-4-5-20250929"
"claude-sonnet-4-5" # alias
"claude-sonnet-4-20250514"
"claude-sonnet-4-0" # alias
"claude-haiku-4-5-20251001"
"claude-haiku-4-5" # alias
# Claude 3.7 Models
"claude-3-7-sonnet-20250219"
"claude-3-7-sonnet-latest" # alias
# Claude 3.5 Models
"claude-3-5-haiku-20241022"
"claude-3-5-haiku-latest" # alias
"claude-3-5-sonnet-20241022" # deprecated
"claude-3-5-sonnet-latest" # alias
"claude-3-5-sonnet-20240620" # deprecated, previous version
# Claude 3 Models
"claude-3-opus-20240229" # deprecated
"claude-3-opus-latest" # alias
"claude-3-haiku-20240307"
```
* * *
## 
[​](#typescript)
TypeScript
[TypeScript library GitHub repo](https://github.com/anthropics/anthropic-sdk-typescript)
While this library is in TypeScript, it can also be used in JavaScript libraries.
Example:
TypeScript
Copy
```
import Anthropic from '@anthropic-ai/sdk';
const anthropic = new Anthropic({
 apiKey: 'my_api_key', // defaults to process.env["ANTHROPIC_API_KEY"]
});
const msg = await anthropic.messages.create({
 model: "claude-sonnet-4-5",
 max_tokens: 1024,
 messages: [{ role: "user", content: "Hello, Claude" }],
});
console.log(msg);
```
Accepted `model` strings:
Copy
```
// Claude 4 Models
"claude-opus-4-1-20250805"
"claude-opus-4-1" // alias
"claude-opus-4-20250514"
"claude-opus-4-0" // alias
"claude-sonnet-4-5-20250929"
"claude-sonnet-4-5" // alias
"claude-sonnet-4-20250514"
"claude-sonnet-4-0" // alias
"claude-haiku-4-5-20251001"
"claude-haiku-4-5" // alias
// Claude 3.7 Models
"claude-3-7-sonnet-20250219"
"claude-3-7-sonnet-latest" // alias
// Claude 3.5 Models
"claude-3-5-haiku-20241022"
"claude-3-5-haiku-latest" // alias
"claude-3-5-sonnet-20241022" // deprecated
"claude-3-5-sonnet-latest" // alias
"claude-3-5-sonnet-20240620" // deprecated, previous version
// Claude 3 Models
"claude-3-opus-20240229" // deprecated
"claude-3-opus-latest" // alias
"claude-3-haiku-20240307"
```
* * *
## 
[​](#java)
Java
[Java library GitHub repo](https://github.com/anthropics/anthropic-sdk-java) Example:
Java
Copy
```
import com.anthropic.models.Message;
import com.anthropic.models.MessageCreateParams;
import com.anthropic.models.Model;
MessageCreateParams params = MessageCreateParams.builder()
 .maxTokens(1024L)
 .addUserMessage("Hello, Claude")
 .model(Model.CLAUDE_SONNET_4_0)
 .build();
Message message = client.messages().create(params);
```
`model` enum values:
Copy
```
// Claude 4 Models
Model.CLAUDE_OPUS_4_1
Model.CLAUDE_OPUS_4_1_20250805
Model.CLAUDE_OPUS_4_0
Model.CLAUDE_OPUS_4_20250514
Model.CLAUDE_SONNET_4_5_20250929
Model.CLAUDE_SONNET_4_5
Model.CLAUDE_SONNET_4_20250514
Model.CLAUDE_SONNET_4_0
Model.CLAUDE_HAIKU_4_5_20251001
Model.CLAUDE_HAIKU_4_5
// Claude 3.7 Models
Model.CLAUDE_3_7_SONNET_LATEST
Model.CLAUDE_3_7_SONNET_20250219
// Claude 3.5 Models
Model.CLAUDE_3_5_HAIKU_LATEST
Model.CLAUDE_3_5_HAIKU_20241022
Model.CLAUDE_3_5_SONNET_LATEST
Model.CLAUDE_3_5_SONNET_20241022 // deprecated
Model.CLAUDE_3_5_SONNET_20240620 // deprecated
// Claude 3 Models
Model.CLAUDE_3_OPUS_LATEST
Model.CLAUDE_3_OPUS_20240229 // deprecated
Model.CLAUDE_3_HAIKU_20240307
```
* * *
## 
[​](#go)
Go
[Go library GitHub repo](https://github.com/anthropics/anthropic-sdk-go) Example:
Go
Copy
```
package main
import (
 "context"
 "fmt"
 "github.com/anthropics/anthropic-sdk-go/option"
 "github.com/anthropics/anthropic-sdk-go"
)
func main() {
 client := anthropic.NewClient(
 option.WithAPIKey("my-anthropic-api-key"),
 )
 message, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
 Model: anthropic.ModelClaudeSonnet4_0,
 MaxTokens: 1024,
 Messages: []anthropic.MessageParam{
 anthropic.NewUserMessage(anthropic.NewTextBlock("What is a quaternion?")),
 },
 })
 if err != nil {
 fmt.Printf("Error creating message: %v\n", err)
 return
 }
 fmt.Printf("%+v\n", message.Content)
}
```
`Model` constants:
Copy
```
// Claude 4 Models
anthropic.ModelClaudeOpus4_1
anthropic.ModelClaudeOpus4_1_20250805
anthropic.ModelClaudeOpus4_0
anthropic.ModelClaudeOpus4_20250514
anthropic.ModelClaudeSonnet4_5_20250929
anthropic.ModelClaudeSonnet4_5
anthropic.ModelClaudeSonnet4_20250514
anthropic.ModelClaudeSonnet4_0
anthropic.ModelClaudeHaiku4_5_20251001
anthropic.ModelClaudeHaiku4_5
// Claude 3.7 Models
anthropic.ModelClaude3_7SonnetLatest
anthropic.ModelClaude3_7Sonnet20250219
// Claude 3.5 Models
anthropic.ModelClaude3_5HaikuLatest
anthropic.ModelClaude3_5Haiku20241022
anthropic.ModelClaude3_5SonnetLatest
anthropic.ModelClaude3_5Sonnet20241022 // deprecated
anthropic.ModelClaude_3_5_Sonnet_20240620 // deprecated
// Claude 3 Models
anthropic.ModelClaude3OpusLatest
anthropic.ModelClaude_3_Opus_20240229 // deprecated
anthropic.ModelClaude_3_Haiku_20240307
```
* * *
## 
[​](#c%23)
C#
[C# library GitHub repo](https://github.com/anthropics/anthropic-sdk-csharp)
The C# SDK is currently in beta.
Example:
C#
Copy
```
using System;
using Anthropic;
using Anthropic.Models.Messages;
using Anthropic.Models.Messages.MessageParamProperties;
// Uses ANTHROPIC_API_KEY environment variable by default
AnthropicClient client = new();
MessageCreateParams parameters = new()
{
 MaxTokens = 1024,
 Messages =
 [
 new()
 {
 Role = Role.User,
 Content = "Hello, Claude",
 },
 ],
 Model = Model.ClaudeSonnet4_0,
};
var message = await client.Messages.Create(parameters);
Console.WriteLine(message);
```
`Model` values:
Copy
```
// Claude 4 Models
Model.ClaudeOpus4_1_20250805
Model.ClaudeOpus4_0 // alias
Model.ClaudeOpus4_20250514
Model.Claude4Opus20250514 // alias
Model.ClaudeSonnet4_5_20250929
Model.ClaudeSonnet4_5 // alias
Model.ClaudeSonnet4_20250514
Model.ClaudeSonnet4_0 // alias
Model.Claude4Sonnet20250514 // alias
Model.ClaudeHaiku4_5_20251001
Model.ClaudeHaiku4_5 // alias
// Claude 3.7 Models
Model.Claude3_7SonnetLatest // alias
Model.Claude3_7Sonnet20250219
// Claude 3.5 Models
Model.Claude3_5HaikuLatest // alias
Model.Claude3_5Haiku20241022
Model.Claude3_5SonnetLatest // alias
Model.Claude3_5Sonnet20241022 // deprecated
Model.Claude_3_5_Sonnet_20240620 // deprecated
// Claude 3 Models
Model.Claude3OpusLatest // alias
Model.Claude_3_Opus_20240229 // deprecated
Model.Claude_3_Haiku_20240307
```
* * *
## 
[​](#ruby)
Ruby
[Ruby library GitHub repo](https://github.com/anthropics/anthropic-sdk-ruby) Example:
ruby
Copy
```
require "bundler/setup"
require "anthropic"
anthropic = Anthropic::Client.new(
 api_key: "my_api_key" # defaults to ENV["ANTHROPIC_API_KEY"]
)
message =
 anthropic.messages.create(
 max_tokens: 1024,
 messages: [{
 role: "user",
 content: "Hello, Claude"
 }],
 model: "claude-sonnet-4-5"
 )
puts(message.content)
```
Accepted `model` strings:
Copy
```
# Claude 4 Models
:"claude-opus-4-1-20250805"
:"claude-opus-4-1" # alias
:"claude-opus-4-20250514"
:"claude-opus-4-0" # alias
:"claude-sonnet-4-5-20250929"
:"claude-sonnet-4-5" # alias
:"claude-sonnet-4-20250514"
:"claude-sonnet-4-0" # alias
:"claude-haiku-4-5-20251001"
:"claude-haiku-4-5" # alias
# Claude 3.7 Models
:"claude-3-7-sonnet-20250219"
:"claude-3-7-sonnet-latest" # alias
# Claude 3.5 Models
:"claude-3-5-haiku-20241022"
:"claude-3-5-haiku-latest" # alias
:"claude-3-5-sonnet-20241022" # deprecated
:"claude-3-5-sonnet-latest" # alias
:"claude-3-5-sonnet-20240620" # deprecated, previous version
# Claude 3 Models
:"claude-3-opus-20240229" # deprecated
:"claude-3-opus-latest" # alias
:"claude-3-haiku-20240307"
```
* * *
## 
[​](#php)
PHP
[PHP library GitHub repo](https://github.com/anthropics/anthropic-sdk-php)
The PHP SDK is currently in beta.
Example:
PHP
Copy
```
<?php
use Anthropic\Client;
use Anthropic\Messages\MessageParam;
$client = new Client(
 apiKey: getenv("ANTHROPIC_API_KEY") ?: "my-anthropic-api-key"
);
$message = $client->messages->create(
 maxTokens: 1024,
 messages: [MessageParam::with(role: "user", content: "Hello, Claude")],
 model: "claude-sonnet-4-5",
);
var_dump($message->content);
```
Accepted `model` strings:
Copy
```
// Claude 4 Models
"claude-opus-4-1-20250805"
"claude-opus-4-1" // alias
"claude-opus-4-20250514"
"claude-opus-4-0" // alias
"claude-sonnet-4-5-20250929"
"claude-sonnet-4-5" // alias
"claude-sonnet-4-20250514"
"claude-sonnet-4-0" // alias
"claude-haiku-4-5-20251001"
"claude-haiku-4-5" // alias
// Claude 3.7 Models
"claude-3-7-sonnet-20250219"
"claude-3-7-sonnet-latest" // alias
// Claude 3.5 Models
"claude-3-5-haiku-20241022"
"claude-3-5-haiku-latest" // alias
"claude-3-5-sonnet-20241022" // deprecated
"claude-3-5-sonnet-latest" // alias
"claude-3-5-sonnet-20240620" // deprecated, previous version
// Claude 3 Models
"claude-3-opus-20240229" // deprecated
"claude-3-opus-latest" // alias
"claude-3-haiku-20240307"
```
`Model` constants:
Copy
```
// Claude 4 Models
Model::CLAUDE_OPUS_4_1_20250805
Model::CLAUDE_OPUS_4_0 // alias
Model::CLAUDE_OPUS_4_20250514
Model::CLAUDE_SONNET_4_5_20250929
Model::CLAUDE_SONNET_4_5 // alias
Model::CLAUDE_SONNET_4_20250514
Model::CLAUDE_SONNET_4_0 // alias
Model::CLAUDE_HAIKU_4_5_20251001
Model::CLAUDE_HAIKU_4_5 // alias
// Claude 3.7 Models
Model::CLAUDE_3_7_SONNET_LATEST // alias
Model::CLAUDE_3_7_SONNET_20250219
// Claude 3.5 Models
Model::CLAUDE_3_5_HAIKU_LATEST // alias
Model::CLAUDE_3_5_HAIKU_20241022
Model::CLAUDE_3_5_SONNET_LATEST // alias
Model::CLAUDE_3_5_SONNET_20241022 // deprecated
Model::CLAUDE_3_5_SONNET_20240620 // deprecated, previous version
// Claude 3 Models
Model::CLAUDE_3_OPUS_LATEST // alias
Model::CLAUDE_3_OPUS_20240229 // deprecated
Model::CLAUDE_3_HAIKU_20240307
```
* * *
## 
[​](#beta-namespace-in-client-sdks)
Beta namespace in client SDKs
Every SDK has a `beta` namespace that is available. This is used for new features Anthropic releases in a beta version. Use this in conjunction with [beta headers](/en/api/beta-headers) to use these features.
Python
TypeScript
Java
Go
Ruby
PHP
C#
Copy
```
import anthropic
client = anthropic.Anthropic(
 # defaults to os.environ.get("ANTHROPIC_API_KEY")
 api_key="my_api_key",
)
message = client.beta.messages.create(
 model="claude-sonnet-4-5",
 max_tokens=1024,
 messages=[
 {"role": "user", "content": "Hello, Claude"}
 ],
 betas=["beta-feature-name"]
)
print(message.content)
```
Was this page helpful?
YesNo
[Migrating from Text Completions](/en/api/migrating-from-text-completions-to-messages)[OpenAI SDK compatibility](/en/api/openai-sdk)
Assistant
Responses are generated using AI and may contain mistakes.