Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Text Completions (Legacy)
Migrating from Text Completions
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
 * [Migrating from Text Completions](/en/api/migrating-from-text-completions-to-messages)
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
 * [Inputs and outputs](#inputs-and-outputs)
 * [Putting words in Claude’s mouth](#putting-words-in-claude%E2%80%99s-mouth)
 * [System prompt](#system-prompt)
 * [Model names](#model-names)
 * [Stop reason](#stop-reason)
 * [Specifying max tokens](#specifying-max-tokens)
 * [Streaming format](#streaming-format)
The Text Completions API has been deprecated in favor of the Messages API.
When migrating from Text Completions to [Messages](/en/api/messages), consider the following changes.
### 
[​](#inputs-and-outputs)
Inputs and outputs
The largest change between Text Completions and the Messages is the way in which you specify model inputs and receive outputs from the model. With Text Completions, inputs are raw strings:
Python
Copy
```
prompt = "\n\nHuman: Hello there\n\nAssistant: Hi, I'm Claude. How can I help?\n\nHuman: Can you explain Glycolysis to me?\n\nAssistant:"
```
With Messages, you specify a list of input messages instead of a raw prompt:
Shorthand
Expanded
Copy
```
messages = [
 {"role": "user", "content": "Hello there."},
 {"role": "assistant", "content": "Hi, I'm Claude. How can I help?"},
 {"role": "user", "content": "Can you explain Glycolysis to me?"},
]
```
Each input message has a `role` and `content`.
**Role names** The Text Completions API expects alternating `\n\nHuman:` and `\n\nAssistant:` turns, but the Messages API expects `user` and `assistant` roles. You may see documentation referring to either “human” or “user” turns. These refer to the same role, and will be “user” going forward.
With Text Completions, the model’s generated text is returned in the `completion` values of the response:
Python
Copy
```
>>> response = anthropic.completions.create(...)
>>> response.completion
" Hi, I'm Claude"
```
With Messages, the response is the `content` value, which is a list of content blocks:
Python
Copy
```
>>> response = anthropic.messages.create(...)
>>> response.content
[{"type": "text", "text": "Hi, I'm Claude"}]
```
### 
[​](#putting-words-in-claude%E2%80%99s-mouth)
Putting words in Claude’s mouth
With Text Completions, you can pre-fill part of Claude’s response:
Python
Copy
```
prompt = "\n\nHuman: Hello\n\nAssistant: Hello, my name is"
```
With Messages, you can achieve the same result by making the last input message have the `assistant` role:
Python
Copy
```
messages = [
 {"role": "human", "content": "Hello"},
 {"role": "assistant", "content": "Hello, my name is"},
]
```
When doing so, response `content` will continue from the last input message `content`:
JSON
Copy
```
{
 "role": "assistant",
 "content": [{"type": "text", "text": " Claude. How can I assist you today?" }],
 ...
}
```
### 
[​](#system-prompt)
System prompt
With Text Completions, the [system prompt](/en/docs/build-with-claude/prompt-engineering/system-prompts) is specified by adding text before the first `\n\nHuman:` turn:
Python
Copy
```
prompt = "Today is January 1, 2024.\n\nHuman: Hello, Claude\n\nAssistant:"
```
With Messages, you specify the system prompt with the `system` parameter:
Python
Copy
```
anthropic.Anthropic().messages.create(
 model="claude-sonnet-4-5",
 max_tokens=1024,
 system="Today is January 1, 2024.", # <-- system prompt
 messages=[
 {"role": "user", "content": "Hello, Claude"}
 ]
)
```
### 
[​](#model-names)
Model names
The Messages API requires that you specify the full model version (e.g. `claude-sonnet-4-5-20250929`). We previously supported specifying only the major version number (e.g. `claude-2`), which resulted in automatic upgrades to minor versions. However, we no longer recommend this integration pattern, and Messages do not support it.
### 
[​](#stop-reason)
Stop reason
Text Completions always have a `stop_reason` of either:
 * `"stop_sequence"`: The model either ended its turn naturally, or one of your custom stop sequences was generated.
 * `"max_tokens"`: Either the model generated your specified `max_tokens` of content, or it reached its [absolute maximum](/en/docs/about-claude/models/overview#model-comparison-table).
Messages have a `stop_reason` of one of the following values:
 * `"end_turn"`: The conversational turn ended naturally.
 * `"stop_sequence"`: One of your specified custom stop sequences was generated.
 * `"max_tokens"`: (unchanged)
### 
[​](#specifying-max-tokens)
Specifying max tokens
 * Text Completions: `max_tokens_to_sample` parameter. No validation, but capped values per-model.
 * Messages: `max_tokens` parameter. If passing a value higher than the model supports, returns a validation error.
### 
[​](#streaming-format)
Streaming format
When using `"stream": true` in with Text Completions, the response included any of `completion`, `ping`, and `error` server-sent-events. Messages can contain multiple content blocks of varying types, and so its streaming format is somewhat more complex. See [Messages streaming](/en/docs/build-with-claude/streaming) for details.
Was this page helpful?
YesNo
[Templatize a prompt](/en/api/prompt-tools-templatize)[Client SDKs](/en/api/client-sdks)
Assistant
Responses are generated using AI and may contain mistakes.