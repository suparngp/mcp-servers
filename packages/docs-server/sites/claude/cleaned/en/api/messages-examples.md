Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Examples
Messages examples
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
 * [Basic request and response](#basic-request-and-response)
 * [Multiple conversational turns](#multiple-conversational-turns)
 * [Putting words in Claude’s mouth](#putting-words-in-claude%E2%80%99s-mouth)
 * [Vision](#vision)
 * [Tool use, JSON mode, and computer use](#tool-use%2C-json-mode%2C-and-computer-use)
See the [API reference](/en/api/messages) for full documentation on available parameters.
## 
[​](#basic-request-and-response)
Basic request and response
Shell
Python
TypeScript
Copy
```
#!/bin/sh
curl https://api.anthropic.com/v1/messages \
 --header "x-api-key: $ANTHROPIC_API_KEY" \
 --header "anthropic-version: 2023-06-01" \
 --header "content-type: application/json" \
 --data \
'{
 "model": "claude-sonnet-4-5",
 "max_tokens": 1024,
 "messages": [
 {"role": "user", "content": "Hello, Claude"}
 ]
}'
```
JSON
Copy
```
{
 "id": "msg_01XFDUDYJgAACzvnptvVoYEL",
 "type": "message",
 "role": "assistant",
 "content": [
 {
 "type": "text",
 "text": "Hello!"
 }
 ],
 "model": "claude-sonnet-4-5",
 "stop_reason": "end_turn",
 "stop_sequence": null,
 "usage": {
 "input_tokens": 12,
 "output_tokens": 6
 }
}
```
## 
[​](#multiple-conversational-turns)
Multiple conversational turns
The Messages API is stateless, which means that you always send the full conversational history to the API. You can use this pattern to build up a conversation over time. Earlier conversational turns don’t necessarily need to actually originate from Claude — you can use synthetic `assistant` messages.
Shell
Python
TypeScript
Copy
```
#!/bin/sh
curl https://api.anthropic.com/v1/messages \
 --header "x-api-key: $ANTHROPIC_API_KEY" \
 --header "anthropic-version: 2023-06-01" \
 --header "content-type: application/json" \
 --data \
'{
 "model": "claude-sonnet-4-5",
 "max_tokens": 1024,
 "messages": [
 {"role": "user", "content": "Hello, Claude"},
 {"role": "assistant", "content": "Hello!"},
 {"role": "user", "content": "Can you describe LLMs to me?"}
 ]
}'
```
JSON
Copy
```
{
 "id": "msg_018gCsTGsXkYJVqYPxTgDHBU",
 "type": "message",
 "role": "assistant",
 "content": [
 {
 "type": "text",
 "text": "Sure, I'd be happy to provide..."
 }
 ],
 "stop_reason": "end_turn",
 "stop_sequence": null,
 "usage": {
 "input_tokens": 30,
 "output_tokens": 309
 }
}
```
## 
[​](#putting-words-in-claude%E2%80%99s-mouth)
Putting words in Claude’s mouth
You can pre-fill part of Claude’s response in the last position of the input messages list. This can be used to shape Claude’s response. The example below uses `"max_tokens": 1` to get a single multiple choice answer from Claude.
Shell
Python
TypeScript
Copy
```
#!/bin/sh
curl https://api.anthropic.com/v1/messages \
 --header "x-api-key: $ANTHROPIC_API_KEY" \
 --header "anthropic-version: 2023-06-01" \
 --header "content-type: application/json" \
 --data \
'{
 "model": "claude-sonnet-4-5",
 "max_tokens": 1,
 "messages": [
 {"role": "user", "content": "What is latin for Ant? (A) Apoidea, (B) Rhopalocera, (C) Formicidae"},
 {"role": "assistant", "content": "The answer is ("}
 ]
}'
```
JSON
Copy
```
{
 "id": "msg_01Q8Faay6S7QPTvEUUQARt7h",
 "type": "message",
 "role": "assistant",
 "content": [
 {
 "type": "text",
 "text": "C"
 }
 ],
 "model": "claude-sonnet-4-5",
 "stop_reason": "max_tokens",
 "stop_sequence": null,
 "usage": {
 "input_tokens": 42,
 "output_tokens": 1
 }
}
```
## 
[​](#vision)
Vision
Claude can read both text and images in requests. We support both `base64` and `url` source types for images, and the `image/jpeg`, `image/png`, `image/gif`, and `image/webp` media types. See our [vision guide](/en/docs/build-with-claude/vision) for more details.
Shell
Python
TypeScript
Copy
```
#!/bin/sh
# Option 1: Base64-encoded image
IMAGE_URL="https://upload.wikimedia.org/wikipedia/commons/a/a7/Camponotus_flavomarginatus_ant.jpg"
IMAGE_MEDIA_TYPE="image/jpeg"
IMAGE_BASE64=$(curl "$IMAGE_URL" | base64)
curl https://api.anthropic.com/v1/messages \
 --header "x-api-key: $ANTHROPIC_API_KEY" \
 --header "anthropic-version: 2023-06-01" \
 --header "content-type: application/json" \
 --data \
'{
 "model": "claude-sonnet-4-5",
 "max_tokens": 1024,
 "messages": [
 {"role": "user", "content": [
 {"type": "image", "source": {
 "type": "base64",
 "media_type": "'$IMAGE_MEDIA_TYPE'",
 "data": "'$IMAGE_BASE64'"
 }},
 {"type": "text", "text": "What is in the above image?"}
 ]}
 ]
}'
# Option 2: URL-referenced image
curl https://api.anthropic.com/v1/messages \
 --header "x-api-key: $ANTHROPIC_API_KEY" \
 --header "anthropic-version: 2023-06-01" \
 --header "content-type: application/json" \
 --data \
'{
 "model": "claude-sonnet-4-5",
 "max_tokens": 1024,
 "messages": [
 {"role": "user", "content": [
 {"type": "image", "source": {
 "type": "url",
 "url": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Camponotus_flavomarginatus_ant.jpg"
 }},
 {"type": "text", "text": "What is in the above image?"}
 ]}
 ]
}'
```
JSON
Copy
```
{
 "id": "msg_01EcyWo6m4hyW8KHs2y2pei5",
 "type": "message",
 "role": "assistant",
 "content": [
 {
 "type": "text",
 "text": "This image shows an ant, specifically a close-up view of an ant. The ant is shown in detail, with its distinct head, antennae, and legs clearly visible. The image is focused on capturing the intricate details and features of the ant, likely taken with a macro lens to get an extreme close-up perspective."
 }
 ],
 "model": "claude-sonnet-4-5",
 "stop_reason": "end_turn",
 "stop_sequence": null,
 "usage": {
 "input_tokens": 1551,
 "output_tokens": 71
 }
}
```
## 
[​](#tool-use%2C-json-mode%2C-and-computer-use)
Tool use, JSON mode, and computer use
See our [guide](/en/docs/agents-and-tools/tool-use/overview) for examples for how to use tools with the Messages API. See our [computer use guide](/en/docs/agents-and-tools/tool-use/computer-use-tool) for examples of how to control desktop computer environments with the Messages API.
Was this page helpful?
YesNo
[Todo Lists](/en/api/agent-sdk/todo-tracking)[Message Batches examples](/en/api/messages-batch-examples)
Assistant
Responses are generated using AI and may contain mistakes.