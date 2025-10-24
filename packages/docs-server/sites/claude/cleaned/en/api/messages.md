Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Messages
Messages
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
 * [POSTMessages](/en/api/messages)
 * [POSTCount Message tokens](/en/api/messages-count-tokens)
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
cURL
cURL
Copy
```
curl https://api.anthropic.com/v1/messages \
 --header "x-api-key: $ANTHROPIC_API_KEY" \
 --header "anthropic-version: 2023-06-01" \
 --header "content-type: application/json" \
 --data \
'{
 "model": "claude-sonnet-4-5-20250929",
 "max_tokens": 1024,
 "messages": [
 {"role": "user", "content": "Hello, world"}
 ]
}'
```
200
4XX
Copy
```
{
 "content": [
 {
 "citations": null,
 "text": "Hi! My name is Claude.",
 "type": "text"
 }
 ],
 "id": "msg_013Zva2CMHLNnXjNJJKqJ2EF",
 "model": "claude-sonnet-4-5-20250929",
 "role": "assistant",
 "stop_reason": "end_turn",
 "stop_sequence": null,
 "type": "message",
 "usage": {
 "input_tokens": 2095,
 "output_tokens": 503
 }
}
```
POST
/
v1
/
messages
cURL
cURL
Copy
```
curl https://api.anthropic.com/v1/messages \
 --header "x-api-key: $ANTHROPIC_API_KEY" \
 --header "anthropic-version: 2023-06-01" \
 --header "content-type: application/json" \
 --data \
'{
 "model": "claude-sonnet-4-5-20250929",
 "max_tokens": 1024,
 "messages": [
 {"role": "user", "content": "Hello, world"}
 ]
}'
```
200
4XX
Copy
```
{
 "content": [
 {
 "citations": null,
 "text": "Hi! My name is Claude.",
 "type": "text"
 }
 ],
 "id": "msg_013Zva2CMHLNnXjNJJKqJ2EF",
 "model": "claude-sonnet-4-5-20250929",
 "role": "assistant",
 "stop_reason": "end_turn",
 "stop_sequence": null,
 "type": "message",
 "usage": {
 "input_tokens": 2095,
 "output_tokens": 503
 }
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
#### Body
application/json
[​](#body-model)
model
string
required
The model that will complete your prompt.
See [models](https://docs.claude.com/en/docs/models-overview) for additional details and options.
Required string length: `1 - 256`
Examples:
`"claude-sonnet-4-5-20250929"`
[​](#body-messages)
messages
InputMessage · object[]
required
Input messages.
Our models are trained to operate on alternating `user` and `assistant` conversational turns. When creating a new `Message`, you specify the prior conversational turns with the `messages` parameter, and the model then generates the next `Message` in the conversation. Consecutive `user` or `assistant` turns in your request will be combined into a single turn.
Each input message must be an object with a `role` and `content`. You can specify a single `user`-role message, or you can include multiple `user` and `assistant` messages.
If the final message uses the `assistant` role, the response content will continue immediately from the content in that message. This can be used to constrain part of the model's response.
Example with a single `user` message:
```
[{"role": "user", "content": "Hello, Claude"}]
```
Example with multiple conversational turns:
```
[ 
 {"role": "user", "content": "Hello there."}, 
 {"role": "assistant", "content": "Hi, I'm Claude. How can I help you?"}, 
 {"role": "user", "content": "Can you explain LLMs in plain English?"}, 
]
```
Example with a partially-filled response from Claude:
```
[ 
 {"role": "user", "content": "What's the Greek name for Sun? (A) Sol (B) Helios (C) Sun"}, 
 {"role": "assistant", "content": "The best answer is ("}, 
]
```
Each input message `content` may be either a single `string` or an array of content blocks, where each block has a specific `type`. Using a `string` for `content` is shorthand for an array of one content block of type `"text"`. The following input messages are equivalent:
```
{"role": "user", "content": "Hello, Claude"}
```
```
{"role": "user", "content": [{"type": "text", "text": "Hello, Claude"}]}
```
See [input examples](https://docs.claude.com/en/api/messages-examples).
Note that if you want to include a [system prompt](https://docs.claude.com/en/docs/system-prompts), you can use the top-level `system` parameter — there is no `"system"` role for input messages in the Messages API.
There is a limit of 100,000 messages in a single request.
Show child attributes
[​](#body-max-tokens)
max_tokens
integer
required
The maximum number of tokens to generate before stopping.
Note that our models may stop _before_ reaching this maximum. This parameter only specifies the absolute maximum number of tokens to generate.
Different models have different maximum values for this parameter. See [models](https://docs.claude.com/en/docs/models-overview) for details.
Required range: `x >= 1`
Examples:
`1024`
[​](#body-container)
container
ContainerParams · object string | null
Container identifier for reuse across requests. Container parameters with skills to be loaded.
Show child attributes
[​](#body-context-management)
context_management
object | null
Context management configuration.
This allows you to control how Claude manages context across multiple requests, such as whether to clear function results or not.
Show child attributes
[​](#body-mcp-servers)
mcp_servers
RequestMCPServerURLDefinition · object[]
MCP servers to be utilized in this request
Maximum length: `20`
Show child attributes
[​](#body-metadata)
metadata
object
An object describing metadata about the request.
Show child attributes
[​](#body-service-tier)
service_tier
enum<string>
Determines whether to use priority capacity (if available) or standard capacity for this request.
Anthropic offers different levels of service for your API requests. See [service-tiers](https://docs.claude.com/en/api/service-tiers) for details.
Available options:
`auto`,
`standard_only`
[​](#body-stop-sequences)
stop_sequences
string[]
Custom text sequences that will cause the model to stop generating.
Our models will normally stop when they have naturally completed their turn, which will result in a response `stop_reason` of `"end_turn"`.
If you want the model to stop generating when it encounters custom strings of text, you can use the `stop_sequences` parameter. If the model encounters one of the custom sequences, the response `stop_reason` value will be `"stop_sequence"` and the response `stop_sequence` value will contain the matched stop sequence.
[​](#body-stream)
stream
boolean
Whether to incrementally stream the response using server-sent events.
See [streaming](https://docs.claude.com/en/api/messages-streaming) for details.
[​](#body-system)
system
string Text · object[]
System prompt.
A system prompt is a way of providing context and instructions to Claude, such as specifying a particular goal or role. See our [guide to system prompts](https://docs.claude.com/en/docs/system-prompts).
Examples:
```
[ 
 { 
 "text": "Today's date is 2024-06-01.", 
 "type": "text" 
 } 
]
```
`"Today's date is 2023-01-01."`
[​](#body-temperature)
temperature
number
Amount of randomness injected into the response.
Defaults to `1.0`. Ranges from `0.0` to `1.0`. Use `temperature` closer to `0.0` for analytical / multiple choice, and closer to `1.0` for creative and generative tasks.
Note that even with `temperature` of `0.0`, the results will not be fully deterministic.
Required range: `0 <= x <= 1`
Examples:
`1`
[​](#body-thinking)
thinking
object
Configuration for enabling Claude's extended thinking.
When enabled, responses include `thinking` content blocks showing Claude's thinking process before the final answer. Requires a minimum budget of 1,024 tokens and counts towards your `max_tokens` limit.
See [extended thinking](https://docs.claude.com/en/docs/build-with-claude/extended-thinking) for details.
 * Enabled
 * Disabled
Show child attributes
[​](#body-tool-choice)
tool_choice
object
How the model should use the provided tools. The model can use a specific tool, any available tool, decide by itself, or not use tools at all. The model will automatically decide whether to use tools.
 * Auto
 * Any
 * Tool
 * None
Show child attributes
[​](#body-tools)
tools
Tools · array
Definitions of tools that the model may use.
If you include `tools` in your API request, the model may return `tool_use` content blocks that represent the model's use of those tools. You can then run those tools using the tool input generated by the model and then optionally return results back to the model using `tool_result` content blocks.
There are two types of tools: **client tools** and **server tools**. The behavior described below applies to client tools. For [server tools](https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview#server-tools), see their individual documentation as each has its own behavior (e.g., the [web search tool](https://docs.claude.com/en/docs/agents-and-tools/tool-use/web-search-tool)).
Each tool definition includes:
 * `name`: Name of the tool.
 * `description`: Optional, but strongly-recommended description of the tool.
 * `input_schema`: [JSON schema](https://json-schema.org/draft/2020-12) for the tool `input` shape that the model will produce in `tool_use` output content blocks.
For example, if you defined `tools` as:
```
[ 
 { 
 "name": "get_stock_price", 
 "description": "Get the current stock price for a given ticker symbol.", 
 "input_schema": { 
 "type": "object", 
 "properties": { 
 "ticker": { 
 "type": "string", 
 "description": "The stock ticker symbol, e.g. AAPL for Apple Inc." 
 } 
 }, 
 "required": ["ticker"] 
 } 
 } 
]
```
And then asked the model "What's the S&P 500 at today?", the model might produce `tool_use` content blocks in the response like this:
```
[ 
 { 
 "type": "tool_use", 
 "id": "toolu_01D7FLrfh4GYq7yT1ULFeyMV", 
 "name": "get_stock_price", 
 "input": { "ticker": "^GSPC" } 
 } 
]
```
You might then run your `get_stock_price` tool with `{"ticker": "^GSPC"}` as an input, and return the following back to the model in a subsequent `user` message:
```
[ 
 { 
 "type": "tool_result", 
 "tool_use_id": "toolu_01D7FLrfh4GYq7yT1ULFeyMV", 
 "content": "259.75 USD" 
 } 
]
```
Tools can be used for workflows that include running client-side tools and functions, or more generally whenever you want the model to produce a particular JSON structure of output.
See our [guide](https://docs.claude.com/en/docs/tool-use) for more details.
 * Custom tool
 * Bash tool (2024-10-22)
 * Bash tool (2025-01-24)
 * Code execution tool (2025-05-22)
 * CodeExecutionTool_20250825
 * Computer use tool (2024-01-22)
 * MemoryTool_20250818
 * Computer use tool (2025-01-24)
 * Text editor tool (2024-10-22)
 * Text editor tool (2025-01-24)
 * Text editor tool (2025-04-29)
 * TextEditor_20250728
 * Web search tool (2025-03-05)
 * WebFetchTool_20250910
Show child attributes
Examples:
```
{ 
 "description": "Get the current weather in a given location", 
 "input_schema": { 
 "properties": { 
 "location": { 
 "description": "The city and state, e.g. San Francisco, CA", 
 "type": "string" 
 }, 
 "unit": { 
 "description": "Unit for the output - one of (celsius, fahrenheit)", 
 "type": "string" 
 } 
 }, 
 "required": ["location"], 
 "type": "object" 
 }, 
 "name": "get_weather" 
}
```
[​](#body-top-k)
top_k
integer
Only sample from the top K options for each subsequent token.
Used to remove "long tail" low probability responses. [Learn more technical details here](https://towardsdatascience.com/how-to-sample-from-language-models-682bceb97277).
Recommended for advanced use cases only. You usually only need to use `temperature`.
Required range: `x >= 0`
Examples:
`5`
[​](#body-top-p)
top_p
number
Use nucleus sampling.
In nucleus sampling, we compute the cumulative distribution over all the options for each subsequent token in decreasing probability order and cut it off once it reaches a particular probability specified by `top_p`. You should either alter `temperature` or `top_p`, but not both.
Recommended for advanced use cases only. You usually only need to use `temperature`.
Required range: `0 <= x <= 1`
Examples:
`0.7`
#### Response
200
application/json
Message object.
[​](#response-id)
id
string
required
Unique object identifier.
The format and length of IDs may change over time.
Examples:
`"msg_013Zva2CMHLNnXjNJJKqJ2EF"`
[​](#response-type)
type
enum<string>
default:message
required
Object type.
For Messages, this is always `"message"`.
Available options: Title | Const 
---|--- 
Type | `message` 
[​](#response-role)
role
enum<string>
default:assistant
required
Conversational role of the generated message.
This will always be `"assistant"`.
Available options: Title | Const 
---|--- 
Role | `assistant` 
[​](#response-content)
content
Content · array
required
Content generated by the model.
This is an array of content blocks, each of which has a `type` that determines its shape.
Example:
```
[{"type": "text", "text": "Hi, I'm Claude."}]
```
If the request input `messages` ended with an `assistant` turn, then the response `content` will continue directly from that last turn. You can use this to constrain the model's output.
For example, if the input `messages` were:
```
[ 
 {"role": "user", "content": "What's the Greek name for Sun? (A) Sol (B) Helios (C) Sun"}, 
 {"role": "assistant", "content": "The best answer is ("} 
]
```
Then the response `content` might be:
```
[{"type": "text", "text": "B)"}]
```
 * Text
 * Thinking
 * Redacted thinking
 * Tool use
 * Server tool use
 * Web search tool result
 * ResponseWebFetchToolResultBlock
 * Code execution tool result
 * ResponseBashCodeExecutionToolResultBlock
 * ResponseTextEditorCodeExecutionToolResultBlock
 * MCP tool use
 * MCP tool result
 * Container upload
Show child attributes
Examples:
```
[ 
 { 
 "citations": null, 
 "text": "Hi! My name is Claude.", 
 "type": "text" 
 } 
]
```
[​](#response-model)
model
string
required
The model that handled the request.
Required string length: `1 - 256`
Examples:
`"claude-sonnet-4-5-20250929"`
[​](#response-stop-reason)
stop_reason
enum<string> | null
required
The reason that we stopped.
This may be one the following values:
 * `"end_turn"`: the model reached a natural stopping point
 * `"max_tokens"`: we exceeded the requested `max_tokens` or the model's maximum
 * `"stop_sequence"`: one of your provided custom `stop_sequences` was generated
 * `"tool_use"`: the model invoked one or more tools
 * `"pause_turn"`: we paused a long-running turn. You may provide the response back as-is in a subsequent request to let the model continue.
 * `"refusal"`: when streaming classifiers intervene to handle potential policy violations
In non-streaming mode this value is always non-null. In streaming mode, it is null in the `message_start` event and non-null otherwise.
Available options:
`end_turn`,
`max_tokens`,
`stop_sequence`,
`tool_use`,
`pause_turn`,
`refusal`,
`model_context_window_exceeded`
[​](#response-stop-sequence)
stop_sequence
string | null
required
Which custom stop sequence was generated, if any.
This value will be a non-null string if one of your custom stop sequences was generated.
[​](#response-usage)
usage
object
required
Billing and rate-limit usage.
Anthropic's API bills and rate-limits by token counts, as tokens represent the underlying cost to our systems.
Under the hood, the API transforms requests into a format suitable for the model. The model's output then goes through a parsing stage before becoming an API response. As a result, the token counts in `usage` will not match one-to-one with the exact visible content of an API request or response.
For example, `output_tokens` will be non-zero, even for an empty string response from Claude.
Total input tokens in a request is the summation of `input_tokens`, `cache_creation_input_tokens`, and `cache_read_input_tokens`.
Show child attributes
[​](#response-context-management)
context_management
object | null
required
Context management response.
Information about context management strategies applied during the request.
Show child attributes
[​](#response-container)
container
object | null
required
Information about the container used in this request.
This will be non-null if a container tool (e.g. code execution) was used. Information about the container used in the request (for the code execution tool)
Show child attributes
Was this page helpful?
YesNo
[Beta headers](/en/api/beta-headers)[Count Message tokens](/en/api/messages-count-tokens)
Assistant
Responses are generated using AI and may contain mistakes.