Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Agent SDK
Agent SDK reference - TypeScript
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
 * [Migrate to Claude Agent SDK](/en/docs/claude-code/sdk/migration-guide)
 * [Overview](/en/api/agent-sdk/overview)
 * [TypeScript SDK](/en/api/agent-sdk/typescript)
 * [Python SDK](/en/api/agent-sdk/python)
 * Guides
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
 * [Installation](#installation)
 * [Functions](#functions)
 * [query()](#query)
 * [Parameters](#parameters)
 * [Returns](#returns)
 * [tool()](#tool)
 * [Parameters](#parameters-2)
 * [createSdkMcpServer()](#createsdkmcpserver)
 * [Parameters](#parameters-3)
 * [Types](#types)
 * [Options](#options)
 * [Query](#query-2)
 * [Methods](#methods)
 * [AgentDefinition](#agentdefinition)
 * [SettingSource](#settingsource)
 * [Default behavior](#default-behavior)
 * [Why use settingSources?](#why-use-settingsources%3F)
 * [Settings precedence](#settings-precedence)
 * [PermissionMode](#permissionmode)
 * [CanUseTool](#canusetool)
 * [PermissionResult](#permissionresult)
 * [McpServerConfig](#mcpserverconfig)
 * [McpStdioServerConfig](#mcpstdioserverconfig)
 * [McpSSEServerConfig](#mcpsseserverconfig)
 * [McpHttpServerConfig](#mcphttpserverconfig)
 * [McpSdkServerConfigWithInstance](#mcpsdkserverconfigwithinstance)
 * [Message Types](#message-types)
 * [SDKMessage](#sdkmessage)
 * [SDKAssistantMessage](#sdkassistantmessage)
 * [SDKUserMessage](#sdkusermessage)
 * [SDKUserMessageReplay](#sdkusermessagereplay)
 * [SDKResultMessage](#sdkresultmessage)
 * [SDKSystemMessage](#sdksystemmessage)
 * [SDKPartialAssistantMessage](#sdkpartialassistantmessage)
 * [SDKCompactBoundaryMessage](#sdkcompactboundarymessage)
 * [SDKPermissionDenial](#sdkpermissiondenial)
 * [Hook Types](#hook-types)
 * [HookEvent](#hookevent)
 * [HookCallback](#hookcallback)
 * [HookCallbackMatcher](#hookcallbackmatcher)
 * [HookInput](#hookinput)
 * [BaseHookInput](#basehookinput)
 * [PreToolUseHookInput](#pretoolusehookinput)
 * [PostToolUseHookInput](#posttoolusehookinput)
 * [NotificationHookInput](#notificationhookinput)
 * [UserPromptSubmitHookInput](#userpromptsubmithookinput)
 * [SessionStartHookInput](#sessionstarthookinput)
 * [SessionEndHookInput](#sessionendhookinput)
 * [StopHookInput](#stophookinput)
 * [SubagentStopHookInput](#subagentstophookinput)
 * [PreCompactHookInput](#precompacthookinput)
 * [HookJSONOutput](#hookjsonoutput)
 * [AsyncHookJSONOutput](#asynchookjsonoutput)
 * [SyncHookJSONOutput](#synchookjsonoutput)
 * [Tool Input Types](#tool-input-types)
 * [ToolInput](#toolinput)
 * [Task](#task)
 * [Bash](#bash)
 * [BashOutput](#bashoutput)
 * [Edit](#edit)
 * [Read](#read)
 * [Write](#write)
 * [Glob](#glob)
 * [Grep](#grep)
 * [KillBash](#killbash)
 * [NotebookEdit](#notebookedit)
 * [WebFetch](#webfetch)
 * [WebSearch](#websearch)
 * [TodoWrite](#todowrite)
 * [ExitPlanMode](#exitplanmode)
 * [ListMcpResources](#listmcpresources)
 * [ReadMcpResource](#readmcpresource)
 * [Tool Output Types](#tool-output-types)
 * [ToolOutput](#tooloutput)
 * [Task](#task-2)
 * [Bash](#bash-2)
 * [BashOutput](#bashoutput-2)
 * [Edit](#edit-2)
 * [Read](#read-2)
 * [Write](#write-2)
 * [Glob](#glob-2)
 * [Grep](#grep-2)
 * [KillBash](#killbash-2)
 * [NotebookEdit](#notebookedit-2)
 * [WebFetch](#webfetch-2)
 * [WebSearch](#websearch-2)
 * [TodoWrite](#todowrite-2)
 * [ExitPlanMode](#exitplanmode-2)
 * [ListMcpResources](#listmcpresources-2)
 * [ReadMcpResource](#readmcpresource-2)
 * [Permission Types](#permission-types)
 * [PermissionUpdate](#permissionupdate)
 * [PermissionBehavior](#permissionbehavior)
 * [PermissionUpdateDestination](#permissionupdatedestination)
 * [PermissionRuleValue](#permissionrulevalue)
 * [Other Types](#other-types)
 * [ApiKeySource](#apikeysource)
 * [ConfigScope](#configscope)
 * [NonNullableUsage](#nonnullableusage)
 * [Usage](#usage)
 * [CallToolResult](#calltoolresult)
 * [AbortError](#aborterror)
 * [See also](#see-also)
## 
[​](#installation)
Installation
Copy
```
npm install @anthropic-ai/claude-agent-sdk
```
## 
[​](#functions)
Functions
### 
[​](#query)
`query()`
The primary function for interacting with Claude Code. Creates an async generator that streams messages as they arrive.
Copy
```
function query({
 prompt,
 options
}: {
 prompt: string | AsyncIterable<SDKUserMessage>;
 options?: Options;
}): Query
```
#### 
[​](#parameters)
Parameters
Parameter | Type | Description 
---|---|--- 
`prompt` | `string | AsyncIterable<`[`SDKUserMessage`](#sdkusermessage)`>` | The input prompt as a string or async iterable for streaming mode 
`options` | [`Options`](#options) | Optional configuration object (see Options type below) 
#### 
[​](#returns)
Returns
Returns a [`Query`](#query-1) object that extends `AsyncGenerator<`[`SDKMessage`](#sdkmessage)`, void>` with additional methods.
### 
[​](#tool)
`tool()`
Creates a type-safe MCP tool definition for use with SDK MCP servers.
Copy
```
function tool<Schema extends ZodRawShape>(
 name: string,
 description: string,
 inputSchema: Schema,
 handler: (args: z.infer<ZodObject<Schema>>, extra: unknown) => Promise<CallToolResult>
): SdkMcpToolDefinition<Schema>
```
#### 
[​](#parameters-2)
Parameters
Parameter | Type | Description 
---|---|--- 
`name` | `string` | The name of the tool 
`description` | `string` | A description of what the tool does 
`inputSchema` | `Schema extends ZodRawShape` | Zod schema defining the tool’s input parameters 
`handler` | `(args, extra) => Promise<`[`CallToolResult`](#calltoolresult)`>` | Async function that executes the tool logic 
### 
[​](#createsdkmcpserver)
`createSdkMcpServer()`
Creates an MCP server instance that runs in the same process as your application.
Copy
```
function createSdkMcpServer(options: {
 name: string;
 version?: string;
 tools?: Array<SdkMcpToolDefinition<any>>;
}): McpSdkServerConfigWithInstance
```
#### 
[​](#parameters-3)
Parameters
Parameter | Type | Description 
---|---|--- 
`options.name` | `string` | The name of the MCP server 
`options.version` | `string` | Optional version string 
`options.tools` | `Array<SdkMcpToolDefinition>` | Array of tool definitions created with [`tool()`](#tool) 
## 
[​](#types)
Types
### 
[​](#options)
`Options`
Configuration object for the `query()` function. Property | Type | Default | Description 
---|---|---|--- 
`abortController` | `AbortController` | `new AbortController()` | Controller for cancelling operations 
`additionalDirectories` | `string[]` | `[]` | Additional directories Claude can access 
`agents` | `Record<string, [`AgentDefinition`](#agentdefinition)>` | `undefined` | Programmatically define subagents 
`allowedTools` | `string[]` | All tools | List of allowed tool names 
`canUseTool` | [`CanUseTool`](#canusetool) | `undefined` | Custom permission function for tool usage 
`continue` | `boolean` | `false` | Continue the most recent conversation 
`cwd` | `string` | `process.cwd()` | Current working directory 
`disallowedTools` | `string[]` | `[]` | List of disallowed tool names 
`env` | `Dict<string>` | `process.env` | Environment variables 
`executable` | `'bun' | 'deno' | 'node'` | Auto-detected | JavaScript runtime to use 
`executableArgs` | `string[]` | `[]` | Arguments to pass to the executable 
`extraArgs` | `Record<string, string | null>` | `{}` | Additional arguments 
`fallbackModel` | `string` | `undefined` | Model to use if primary fails 
`forkSession` | `boolean` | `false` | When resuming with `resume`, fork to a new session ID instead of continuing the original session 
`hooks` | `Partial<Record<`[`HookEvent`](#hookevent)`, `[`HookCallbackMatcher`](#hookcallbackmatcher)`[]>>` | `{}` | Hook callbacks for events 
`includePartialMessages` | `boolean` | `false` | Include partial message events 
`maxThinkingTokens` | `number` | `undefined` | Maximum tokens for thinking process 
`maxTurns` | `number` | `undefined` | Maximum conversation turns 
`mcpServers` | `Record<string, [`McpServerConfig`](#mcpserverconfig)>` | `{}` | MCP server configurations 
`model` | `string` | Default from CLI | Claude model to use 
`pathToClaudeCodeExecutable` | `string` | Auto-detected | Path to Claude Code executable 
`permissionMode` | [`PermissionMode`](#permissionmode) | `'default'` | Permission mode for the session 
`permissionPromptToolName` | `string` | `undefined` | MCP tool name for permission prompts 
`resume` | `string` | `undefined` | Session ID to resume 
`settingSources` | [`SettingSource`](#settingsource)`[]` | `[]` (no settings) | Control which filesystem settings to load. When omitted, no settings are loaded. **Note:** Must include `'project'` to load CLAUDE.md files 
`stderr` | `(data: string) => void` | `undefined` | Callback for stderr output 
`strictMcpConfig` | `boolean` | `false` | Enforce strict MCP validation 
`systemPrompt` | `string | { type: 'preset'; preset: 'claude_code'; append?: string }` | `undefined` (empty prompt) | System prompt configuration. Pass a string for custom prompt, or `{ type: 'preset', preset: 'claude_code' }` to use Claude Code’s system prompt. When using the preset object form, add `append` to extend the system prompt with additional instructions 
### 
[​](#query-2)
`Query`
Interface returned by the `query()` function.
Copy
```
interface Query extends AsyncGenerator<SDKMessage, void> {
 interrupt(): Promise<void>;
 setPermissionMode(mode: PermissionMode): Promise<void>;
}
```
#### 
[​](#methods)
Methods
Method | Description 
---|--- 
`interrupt()` | Interrupts the query (only available in streaming input mode) 
`setPermissionMode()` | Changes the permission mode (only available in streaming input mode) 
### 
[​](#agentdefinition)
`AgentDefinition`
Configuration for a subagent defined programmatically.
Copy
```
type AgentDefinition = {
 description: string;
 tools?: string[];
 prompt: string;
 model?: 'sonnet' | 'opus' | 'haiku' | 'inherit';
}
```
Field | Required | Description 
---|---|--- 
`description` | Yes | Natural language description of when to use this agent 
`tools` | No | Array of allowed tool names. If omitted, inherits all tools 
`prompt` | Yes | The agent’s system prompt 
`model` | No | Model override for this agent. If omitted, uses the main model 
### 
[​](#settingsource)
`SettingSource`
Controls which filesystem-based configuration sources the SDK loads settings from.
Copy
```
type SettingSource = 'user' | 'project' | 'local';
```
Value | Description | Location 
---|---|--- 
`'user'` | Global user settings | `~/.claude/settings.json` 
`'project'` | Shared project settings (version controlled) | `.claude/settings.json` 
`'local'` | Local project settings (gitignored) | `.claude/settings.local.json` 
#### 
[​](#default-behavior)
Default behavior
When `settingSources` is **omitted** or **undefined** , the SDK does **not** load any filesystem settings. This provides isolation for SDK applications.
#### 
[​](#why-use-settingsources%3F)
Why use settingSources?
**Load all filesystem settings (legacy behavior):**
Copy
```
// Load all settings like SDK v0.0.x did
const result = query({
 prompt: "Analyze this code",
 options: {
 settingSources: ['user', 'project', 'local'] // Load all settings
 }
});
```
**Load only specific setting sources:**
Copy
```
// Load only project settings, ignore user and local
const result = query({
 prompt: "Run CI checks",
 options: {
 settingSources: ['project'] // Only .claude/settings.json
 }
});
```
**Testing and CI environments:**
Copy
```
// Ensure consistent behavior in CI by excluding local settings
const result = query({
 prompt: "Run tests",
 options: {
 settingSources: ['project'], // Only team-shared settings
 permissionMode: 'bypassPermissions'
 }
});
```
**SDK-only applications:**
Copy
```
// Define everything programmatically (default behavior)
// No filesystem dependencies - settingSources defaults to []
const result = query({
 prompt: "Review this PR",
 options: {
 // settingSources: [] is the default, no need to specify
 agents: { /* ... */ },
 mcpServers: { /* ... */ },
 allowedTools: ['Read', 'Grep', 'Glob']
 }
});
```
**Loading CLAUDE.md project instructions:**
Copy
```
// Load project settings to include CLAUDE.md files
const result = query({
 prompt: "Add a new feature following project conventions",
 options: {
 systemPrompt: {
 type: 'preset',
 preset: 'claude_code' // Required to use CLAUDE.md
 },
 settingSources: ['project'], // Loads CLAUDE.md from project directory
 allowedTools: ['Read', 'Write', 'Edit']
 }
});
```
#### 
[​](#settings-precedence)
Settings precedence
When multiple sources are loaded, settings are merged with this precedence (highest to lowest):
 1. Local settings (`.claude/settings.local.json`)
 2. Project settings (`.claude/settings.json`)
 3. User settings (`~/.claude/settings.json`)
Programmatic options (like `agents`, `allowedTools`) always override filesystem settings.
### 
[​](#permissionmode)
`PermissionMode`
Copy
```
type PermissionMode =
 | 'default' // Standard permission behavior
 | 'acceptEdits' // Auto-accept file edits
 | 'bypassPermissions' // Bypass all permission checks
 | 'plan' // Planning mode - no execution
```
### 
[​](#canusetool)
`CanUseTool`
Custom permission function type for controlling tool usage.
Copy
```
type CanUseTool = (
 toolName: string,
 input: ToolInput,
 options: {
 signal: AbortSignal;
 suggestions?: PermissionUpdate[];
 }
) => Promise<PermissionResult>;
```
### 
[​](#permissionresult)
`PermissionResult`
Result of a permission check.
Copy
```
type PermissionResult =
 | {
 behavior: 'allow';
 updatedInput: ToolInput;
 updatedPermissions?: PermissionUpdate[];
 }
 | {
 behavior: 'deny';
 message: string;
 interrupt?: boolean;
 }
```
### 
[​](#mcpserverconfig)
`McpServerConfig`
Configuration for MCP servers.
Copy
```
type McpServerConfig =
 | McpStdioServerConfig
 | McpSSEServerConfig
 | McpHttpServerConfig
 | McpSdkServerConfigWithInstance;
```
#### 
[​](#mcpstdioserverconfig)
`McpStdioServerConfig`
Copy
```
type McpStdioServerConfig = {
 type?: 'stdio';
 command: string;
 args?: string[];
 env?: Record<string, string>;
}
```
#### 
[​](#mcpsseserverconfig)
`McpSSEServerConfig`
Copy
```
type McpSSEServerConfig = {
 type: 'sse';
 url: string;
 headers?: Record<string, string>;
}
```
#### 
[​](#mcphttpserverconfig)
`McpHttpServerConfig`
Copy
```
type McpHttpServerConfig = {
 type: 'http';
 url: string;
 headers?: Record<string, string>;
}
```
#### 
[​](#mcpsdkserverconfigwithinstance)
`McpSdkServerConfigWithInstance`
Copy
```
type McpSdkServerConfigWithInstance = {
 type: 'sdk';
 name: string;
 instance: McpServer;
}
```
## 
[​](#message-types)
Message Types
### 
[​](#sdkmessage)
`SDKMessage`
Union type of all possible messages returned by the query.
Copy
```
type SDKMessage =
 | SDKAssistantMessage
 | SDKUserMessage
 | SDKUserMessageReplay
 | SDKResultMessage
 | SDKSystemMessage
 | SDKPartialAssistantMessage
 | SDKCompactBoundaryMessage;
```
### 
[​](#sdkassistantmessage)
`SDKAssistantMessage`
Assistant response message.
Copy
```
type SDKAssistantMessage = {
 type: 'assistant';
 uuid: UUID;
 session_id: string;
 message: APIAssistantMessage; // From Anthropic SDK
 parent_tool_use_id: string | null;
}
```
### 
[​](#sdkusermessage)
`SDKUserMessage`
User input message.
Copy
```
type SDKUserMessage = {
 type: 'user';
 uuid?: UUID;
 session_id: string;
 message: APIUserMessage; // From Anthropic SDK
 parent_tool_use_id: string | null;
}
```
### 
[​](#sdkusermessagereplay)
`SDKUserMessageReplay`
Replayed user message with required UUID.
Copy
```
type SDKUserMessageReplay = {
 type: 'user';
 uuid: UUID;
 session_id: string;
 message: APIUserMessage;
 parent_tool_use_id: string | null;
}
```
### 
[​](#sdkresultmessage)
`SDKResultMessage`
Final result message.
Copy
```
type SDKResultMessage =
 | {
 type: 'result';
 subtype: 'success';
 uuid: UUID;
 session_id: string;
 duration_ms: number;
 duration_api_ms: number;
 is_error: boolean;
 num_turns: number;
 result: string;
 total_cost_usd: number;
 usage: NonNullableUsage;
 permission_denials: SDKPermissionDenial[];
 }
 | {
 type: 'result';
 subtype: 'error_max_turns' | 'error_during_execution';
 uuid: UUID;
 session_id: string;
 duration_ms: number;
 duration_api_ms: number;
 is_error: boolean;
 num_turns: number;
 total_cost_usd: number;
 usage: NonNullableUsage;
 permission_denials: SDKPermissionDenial[];
 }
```
### 
[​](#sdksystemmessage)
`SDKSystemMessage`
System initialization message.
Copy
```
type SDKSystemMessage = {
 type: 'system';
 subtype: 'init';
 uuid: UUID;
 session_id: string;
 apiKeySource: ApiKeySource;
 cwd: string;
 tools: string[];
 mcp_servers: {
 name: string;
 status: string;
 }[];
 model: string;
 permissionMode: PermissionMode;
 slash_commands: string[];
 output_style: string;
}
```
### 
[​](#sdkpartialassistantmessage)
`SDKPartialAssistantMessage`
Streaming partial message (only when `includePartialMessages` is true).
Copy
```
type SDKPartialAssistantMessage = {
 type: 'stream_event';
 event: RawMessageStreamEvent; // From Anthropic SDK
 parent_tool_use_id: string | null;
 uuid: UUID;
 session_id: string;
}
```
### 
[​](#sdkcompactboundarymessage)
`SDKCompactBoundaryMessage`
Message indicating a conversation compaction boundary.
Copy
```
type SDKCompactBoundaryMessage = {
 type: 'system';
 subtype: 'compact_boundary';
 uuid: UUID;
 session_id: string;
 compact_metadata: {
 trigger: 'manual' | 'auto';
 pre_tokens: number;
 };
}
```
### 
[​](#sdkpermissiondenial)
`SDKPermissionDenial`
Information about a denied tool use.
Copy
```
type SDKPermissionDenial = {
 tool_name: string;
 tool_use_id: string;
 tool_input: ToolInput;
}
```
## 
[​](#hook-types)
Hook Types
### 
[​](#hookevent)
`HookEvent`
Available hook events.
Copy
```
type HookEvent =
 | 'PreToolUse'
 | 'PostToolUse'
 | 'Notification'
 | 'UserPromptSubmit'
 | 'SessionStart'
 | 'SessionEnd'
 | 'Stop'
 | 'SubagentStop'
 | 'PreCompact';
```
### 
[​](#hookcallback)
`HookCallback`
Hook callback function type.
Copy
```
type HookCallback = (
 input: HookInput, // Union of all hook input types
 toolUseID: string | undefined,
 options: { signal: AbortSignal }
) => Promise<HookJSONOutput>;
```
### 
[​](#hookcallbackmatcher)
`HookCallbackMatcher`
Hook configuration with optional matcher.
Copy
```
interface HookCallbackMatcher {
 matcher?: string;
 hooks: HookCallback[];
}
```
### 
[​](#hookinput)
`HookInput`
Union type of all hook input types.
Copy
```
type HookInput =
 | PreToolUseHookInput
 | PostToolUseHookInput
 | NotificationHookInput
 | UserPromptSubmitHookInput
 | SessionStartHookInput
 | SessionEndHookInput
 | StopHookInput
 | SubagentStopHookInput
 | PreCompactHookInput;
```
### 
[​](#basehookinput)
`BaseHookInput`
Base interface that all hook input types extend.
Copy
```
type BaseHookInput = {
 session_id: string;
 transcript_path: string;
 cwd: string;
 permission_mode?: string;
}
```
#### 
[​](#pretoolusehookinput)
`PreToolUseHookInput`
Copy
```
type PreToolUseHookInput = BaseHookInput & {
 hook_event_name: 'PreToolUse';
 tool_name: string;
 tool_input: ToolInput;
}
```
#### 
[​](#posttoolusehookinput)
`PostToolUseHookInput`
Copy
```
type PostToolUseHookInput = BaseHookInput & {
 hook_event_name: 'PostToolUse';
 tool_name: string;
 tool_input: ToolInput;
 tool_response: ToolOutput;
}
```
#### 
[​](#notificationhookinput)
`NotificationHookInput`
Copy
```
type NotificationHookInput = BaseHookInput & {
 hook_event_name: 'Notification';
 message: string;
 title?: string;
}
```
#### 
[​](#userpromptsubmithookinput)
`UserPromptSubmitHookInput`
Copy
```
type UserPromptSubmitHookInput = BaseHookInput & {
 hook_event_name: 'UserPromptSubmit';
 prompt: string;
}
```
#### 
[​](#sessionstarthookinput)
`SessionStartHookInput`
Copy
```
type SessionStartHookInput = BaseHookInput & {
 hook_event_name: 'SessionStart';
 source: 'startup' | 'resume' | 'clear' | 'compact';
}
```
#### 
[​](#sessionendhookinput)
`SessionEndHookInput`
Copy
```
type SessionEndHookInput = BaseHookInput & {
 hook_event_name: 'SessionEnd';
 reason: 'clear' | 'logout' | 'prompt_input_exit' | 'other';
}
```
#### 
[​](#stophookinput)
`StopHookInput`
Copy
```
type StopHookInput = BaseHookInput & {
 hook_event_name: 'Stop';
 stop_hook_active: boolean;
}
```
#### 
[​](#subagentstophookinput)
`SubagentStopHookInput`
Copy
```
type SubagentStopHookInput = BaseHookInput & {
 hook_event_name: 'SubagentStop';
 stop_hook_active: boolean;
}
```
#### 
[​](#precompacthookinput)
`PreCompactHookInput`
Copy
```
type PreCompactHookInput = BaseHookInput & {
 hook_event_name: 'PreCompact';
 trigger: 'manual' | 'auto';
 custom_instructions: string | null;
}
```
### 
[​](#hookjsonoutput)
`HookJSONOutput`
Hook return value.
Copy
```
type HookJSONOutput = AsyncHookJSONOutput | SyncHookJSONOutput;
```
#### 
[​](#asynchookjsonoutput)
`AsyncHookJSONOutput`
Copy
```
type AsyncHookJSONOutput = {
 async: true;
 asyncTimeout?: number;
}
```
#### 
[​](#synchookjsonoutput)
`SyncHookJSONOutput`
Copy
```
type SyncHookJSONOutput = {
 continue?: boolean;
 suppressOutput?: boolean;
 stopReason?: string;
 decision?: 'approve' | 'block';
 systemMessage?: string;
 reason?: string;
 hookSpecificOutput?:
 | {
 hookEventName: 'PreToolUse';
 permissionDecision?: 'allow' | 'deny' | 'ask';
 permissionDecisionReason?: string;
 }
 | {
 hookEventName: 'UserPromptSubmit';
 additionalContext?: string;
 }
 | {
 hookEventName: 'SessionStart';
 additionalContext?: string;
 }
 | {
 hookEventName: 'PostToolUse';
 additionalContext?: string;
 };
}
```
## 
[​](#tool-input-types)
Tool Input Types
Documentation of input schemas for all built-in Claude Code tools. These types are exported from `@anthropic-ai/claude-agent-sdk` and can be used for type-safe tool interactions.
### 
[​](#toolinput)
`ToolInput`
**Note:** This is a documentation-only type for clarity. It represents the union of all tool input types.
Copy
```
type ToolInput =
 | AgentInput
 | BashInput
 | BashOutputInput
 | FileEditInput
 | FileReadInput
 | FileWriteInput
 | GlobInput
 | GrepInput
 | KillShellInput
 | NotebookEditInput
 | WebFetchInput
 | WebSearchInput
 | TodoWriteInput
 | ExitPlanModeInput
 | ListMcpResourcesInput
 | ReadMcpResourceInput;
```
### 
[​](#task)
Task
**Tool name:** `Task`
Copy
```
interface AgentInput {
 /**
 * A short (3-5 word) description of the task
 */
 description: string;
 /**
 * The task for the agent to perform
 */
 prompt: string;
 /**
 * The type of specialized agent to use for this task
 */
 subagent_type: string;
}
```
Launches a new agent to handle complex, multi-step tasks autonomously.
### 
[​](#bash)
Bash
**Tool name:** `Bash`
Copy
```
interface BashInput {
 /**
 * The command to execute
 */
 command: string;
 /**
 * Optional timeout in milliseconds (max 600000)
 */
 timeout?: number;
 /**
 * Clear, concise description of what this command does in 5-10 words
 */
 description?: string;
 /**
 * Set to true to run this command in the background
 */
 run_in_background?: boolean;
}
```
Executes bash commands in a persistent shell session with optional timeout and background execution.
### 
[​](#bashoutput)
BashOutput
**Tool name:** `BashOutput`
Copy
```
interface BashOutputInput {
 /**
 * The ID of the background shell to retrieve output from
 */
 bash_id: string;
 /**
 * Optional regex to filter output lines
 */
 filter?: string;
}
```
Retrieves output from a running or completed background bash shell.
### 
[​](#edit)
Edit
**Tool name:** `Edit`
Copy
```
interface FileEditInput {
 /**
 * The absolute path to the file to modify
 */
 file_path: string;
 /**
 * The text to replace
 */
 old_string: string;
 /**
 * The text to replace it with (must be different from old_string)
 */
 new_string: string;
 /**
 * Replace all occurrences of old_string (default false)
 */
 replace_all?: boolean;
}
```
Performs exact string replacements in files.
### 
[​](#read)
Read
**Tool name:** `Read`
Copy
```
interface FileReadInput {
 /**
 * The absolute path to the file to read
 */
 file_path: string;
 /**
 * The line number to start reading from
 */
 offset?: number;
 /**
 * The number of lines to read
 */
 limit?: number;
}
```
Reads files from the local filesystem, including text, images, PDFs, and Jupyter notebooks.
### 
[​](#write)
Write
**Tool name:** `Write`
Copy
```
interface FileWriteInput {
 /**
 * The absolute path to the file to write
 */
 file_path: string;
 /**
 * The content to write to the file
 */
 content: string;
}
```
Writes a file to the local filesystem, overwriting if it exists.
### 
[​](#glob)
Glob
**Tool name:** `Glob`
Copy
```
interface GlobInput {
 /**
 * The glob pattern to match files against
 */
 pattern: string;
 /**
 * The directory to search in (defaults to cwd)
 */
 path?: string;
}
```
Fast file pattern matching that works with any codebase size.
### 
[​](#grep)
Grep
**Tool name:** `Grep`
Copy
```
interface GrepInput {
 /**
 * The regular expression pattern to search for
 */
 pattern: string;
 /**
 * File or directory to search in (defaults to cwd)
 */
 path?: string;
 /**
 * Glob pattern to filter files (e.g. "*.js")
 */
 glob?: string;
 /**
 * File type to search (e.g. "js", "py", "rust")
 */
 type?: string;
 /**
 * Output mode: "content", "files_with_matches", or "count"
 */
 output_mode?: 'content' | 'files_with_matches' | 'count';
 /**
 * Case insensitive search
 */
 '-i'?: boolean;
 /**
 * Show line numbers (for content mode)
 */
 '-n'?: boolean;
 /**
 * Lines to show before each match
 */
 '-B'?: number;
 /**
 * Lines to show after each match
 */
 '-A'?: number;
 /**
 * Lines to show before and after each match
 */
 '-C'?: number;
 /**
 * Limit output to first N lines/entries
 */
 head_limit?: number;
 /**
 * Enable multiline mode
 */
 multiline?: boolean;
}
```
Powerful search tool built on ripgrep with regex support.
### 
[​](#killbash)
KillBash
**Tool name:** `KillBash`
Copy
```
interface KillShellInput {
 /**
 * The ID of the background shell to kill
 */
 shell_id: string;
}
```
Kills a running background bash shell by its ID.
### 
[​](#notebookedit)
NotebookEdit
**Tool name:** `NotebookEdit`
Copy
```
interface NotebookEditInput {
 /**
 * The absolute path to the Jupyter notebook file
 */
 notebook_path: string;
 /**
 * The ID of the cell to edit
 */
 cell_id?: string;
 /**
 * The new source for the cell
 */
 new_source: string;
 /**
 * The type of the cell (code or markdown)
 */
 cell_type?: 'code' | 'markdown';
 /**
 * The type of edit (replace, insert, delete)
 */
 edit_mode?: 'replace' | 'insert' | 'delete';
}
```
Edits cells in Jupyter notebook files.
### 
[​](#webfetch)
WebFetch
**Tool name:** `WebFetch`
Copy
```
interface WebFetchInput {
 /**
 * The URL to fetch content from
 */
 url: string;
 /**
 * The prompt to run on the fetched content
 */
 prompt: string;
}
```
Fetches content from a URL and processes it with an AI model.
### 
[​](#websearch)
WebSearch
**Tool name:** `WebSearch`
Copy
```
interface WebSearchInput {
 /**
 * The search query to use
 */
 query: string;
 /**
 * Only include results from these domains
 */
 allowed_domains?: string[];
 /**
 * Never include results from these domains
 */
 blocked_domains?: string[];
}
```
Searches the web and returns formatted results.
### 
[​](#todowrite)
TodoWrite
**Tool name:** `TodoWrite`
Copy
```
interface TodoWriteInput {
 /**
 * The updated todo list
 */
 todos: Array<{
 /**
 * The task description
 */
 content: string;
 /**
 * The task status
 */
 status: 'pending' | 'in_progress' | 'completed';
 /**
 * Active form of the task description
 */
 activeForm: string;
 }>;
}
```
Creates and manages a structured task list for tracking progress.
### 
[​](#exitplanmode)
ExitPlanMode
**Tool name:** `ExitPlanMode`
Copy
```
interface ExitPlanModeInput {
 /**
 * The plan to run by the user for approval
 */
 plan: string;
}
```
Exits planning mode and prompts the user to approve the plan.
### 
[​](#listmcpresources)
ListMcpResources
**Tool name:** `ListMcpResources`
Copy
```
interface ListMcpResourcesInput {
 /**
 * Optional server name to filter resources by
 */
 server?: string;
}
```
Lists available MCP resources from connected servers.
### 
[​](#readmcpresource)
ReadMcpResource
**Tool name:** `ReadMcpResource`
Copy
```
interface ReadMcpResourceInput {
 /**
 * The MCP server name
 */
 server: string;
 /**
 * The resource URI to read
 */
 uri: string;
}
```
Reads a specific MCP resource from a server.
## 
[​](#tool-output-types)
Tool Output Types
Documentation of output schemas for all built-in Claude Code tools. These types represent the actual response data returned by each tool.
### 
[​](#tooloutput)
`ToolOutput`
**Note:** This is a documentation-only type for clarity. It represents the union of all tool output types.
Copy
```
type ToolOutput =
 | TaskOutput
 | BashOutput
 | BashOutputToolOutput
 | EditOutput
 | ReadOutput
 | WriteOutput
 | GlobOutput
 | GrepOutput
 | KillBashOutput
 | NotebookEditOutput
 | WebFetchOutput
 | WebSearchOutput
 | TodoWriteOutput
 | ExitPlanModeOutput
 | ListMcpResourcesOutput
 | ReadMcpResourceOutput;
```
### 
[​](#task-2)
Task
**Tool name:** `Task`
Copy
```
interface TaskOutput {
 /**
 * Final result message from the subagent
 */
 result: string;
 /**
 * Token usage statistics
 */
 usage?: {
 input_tokens: number;
 output_tokens: number;
 cache_creation_input_tokens?: number;
 cache_read_input_tokens?: number;
 };
 /**
 * Total cost in USD
 */
 total_cost_usd?: number;
 /**
 * Execution duration in milliseconds
 */
 duration_ms?: number;
}
```
Returns the final result from the subagent after completing the delegated task.
### 
[​](#bash-2)
Bash
**Tool name:** `Bash`
Copy
```
interface BashOutput {
 /**
 * Combined stdout and stderr output
 */
 output: string;
 /**
 * Exit code of the command
 */
 exitCode: number;
 /**
 * Whether the command was killed due to timeout
 */
 killed?: boolean;
 /**
 * Shell ID for background processes
 */
 shellId?: string;
}
```
Returns command output with exit status. Background commands return immediately with a shellId.
### 
[​](#bashoutput-2)
BashOutput
**Tool name:** `BashOutput`
Copy
```
interface BashOutputToolOutput {
 /**
 * New output since last check
 */
 output: string;
 /**
 * Current shell status
 */
 status: 'running' | 'completed' | 'failed';
 /**
 * Exit code (when completed)
 */
 exitCode?: number;
}
```
Returns incremental output from background shells.
### 
[​](#edit-2)
Edit
**Tool name:** `Edit`
Copy
```
interface EditOutput {
 /**
 * Confirmation message
 */
 message: string;
 /**
 * Number of replacements made
 */
 replacements: number;
 /**
 * File path that was edited
 */
 file_path: string;
}
```
Returns confirmation of successful edits with replacement count.
### 
[​](#read-2)
Read
**Tool name:** `Read`
Copy
```
type ReadOutput =
 | TextFileOutput
 | ImageFileOutput
 | PDFFileOutput
 | NotebookFileOutput;
interface TextFileOutput {
 /**
 * File contents with line numbers
 */
 content: string;
 /**
 * Total number of lines in file
 */
 total_lines: number;
 /**
 * Lines actually returned
 */
 lines_returned: number;
}
interface ImageFileOutput {
 /**
 * Base64 encoded image data
 */
 image: string;
 /**
 * Image MIME type
 */
 mime_type: string;
 /**
 * File size in bytes
 */
 file_size: number;
}
interface PDFFileOutput {
 /**
 * Array of page contents
 */
 pages: Array<{
 page_number: number;
 text?: string;
 images?: Array<{
 image: string;
 mime_type: string;
 }>;
 }>;
 /**
 * Total number of pages
 */
 total_pages: number;
}
interface NotebookFileOutput {
 /**
 * Jupyter notebook cells
 */
 cells: Array<{
 cell_type: 'code' | 'markdown';
 source: string;
 outputs?: any[];
 execution_count?: number;
 }>;
 /**
 * Notebook metadata
 */
 metadata?: Record<string, any>;
}
```
Returns file contents in format appropriate to file type.
### 
[​](#write-2)
Write
**Tool name:** `Write`
Copy
```
interface WriteOutput {
 /**
 * Success message
 */
 message: string;
 /**
 * Number of bytes written
 */
 bytes_written: number;
 /**
 * File path that was written
 */
 file_path: string;
}
```
Returns confirmation after successfully writing the file.
### 
[​](#glob-2)
Glob
**Tool name:** `Glob`
Copy
```
interface GlobOutput {
 /**
 * Array of matching file paths
 */
 matches: string[];
 /**
 * Number of matches found
 */
 count: number;
 /**
 * Search directory used
 */
 search_path: string;
}
```
Returns file paths matching the glob pattern, sorted by modification time.
### 
[​](#grep-2)
Grep
**Tool name:** `Grep`
Copy
```
type GrepOutput =
 | GrepContentOutput
 | GrepFilesOutput
 | GrepCountOutput;
interface GrepContentOutput {
 /**
 * Matching lines with context
 */
 matches: Array<{
 file: string;
 line_number?: number;
 line: string;
 before_context?: string[];
 after_context?: string[];
 }>;
 /**
 * Total number of matches
 */
 total_matches: number;
}
interface GrepFilesOutput {
 /**
 * Files containing matches
 */
 files: string[];
 /**
 * Number of files with matches
 */
 count: number;
}
interface GrepCountOutput {
 /**
 * Match counts per file
 */
 counts: Array<{
 file: string;
 count: number;
 }>;
 /**
 * Total matches across all files
 */
 total: number;
}
```
Returns search results in the format specified by output_mode.
### 
[​](#killbash-2)
KillBash
**Tool name:** `KillBash`
Copy
```
interface KillBashOutput {
 /**
 * Success message
 */
 message: string;
 /**
 * ID of the killed shell
 */
 shell_id: string;
}
```
Returns confirmation after terminating the background shell.
### 
[​](#notebookedit-2)
NotebookEdit
**Tool name:** `NotebookEdit`
Copy
```
interface NotebookEditOutput {
 /**
 * Success message
 */
 message: string;
 /**
 * Type of edit performed
 */
 edit_type: 'replaced' | 'inserted' | 'deleted';
 /**
 * Cell ID that was affected
 */
 cell_id?: string;
 /**
 * Total cells in notebook after edit
 */
 total_cells: number;
}
```
Returns confirmation after modifying the Jupyter notebook.
### 
[​](#webfetch-2)
WebFetch
**Tool name:** `WebFetch`
Copy
```
interface WebFetchOutput {
 /**
 * AI model's response to the prompt
 */
 response: string;
 /**
 * URL that was fetched
 */
 url: string;
 /**
 * Final URL after redirects
 */
 final_url?: string;
 /**
 * HTTP status code
 */
 status_code?: number;
}
```
Returns the AI’s analysis of the fetched web content.
### 
[​](#websearch-2)
WebSearch
**Tool name:** `WebSearch`
Copy
```
interface WebSearchOutput {
 /**
 * Search results
 */
 results: Array<{
 title: string;
 url: string;
 snippet: string;
 /**
 * Additional metadata if available
 */
 metadata?: Record<string, any>;
 }>;
 /**
 * Total number of results
 */
 total_results: number;
 /**
 * The query that was searched
 */
 query: string;
}
```
Returns formatted search results from the web.
### 
[​](#todowrite-2)
TodoWrite
**Tool name:** `TodoWrite`
Copy
```
interface TodoWriteOutput {
 /**
 * Success message
 */
 message: string;
 /**
 * Current todo statistics
 */
 stats: {
 total: number;
 pending: number;
 in_progress: number;
 completed: number;
 };
}
```
Returns confirmation with current task statistics.
### 
[​](#exitplanmode-2)
ExitPlanMode
**Tool name:** `ExitPlanMode`
Copy
```
interface ExitPlanModeOutput {
 /**
 * Confirmation message
 */
 message: string;
 /**
 * Whether user approved the plan
 */
 approved?: boolean;
}
```
Returns confirmation after exiting plan mode.
### 
[​](#listmcpresources-2)
ListMcpResources
**Tool name:** `ListMcpResources`
Copy
```
interface ListMcpResourcesOutput {
 /**
 * Available resources
 */
 resources: Array<{
 uri: string;
 name: string;
 description?: string;
 mimeType?: string;
 server: string;
 }>;
 /**
 * Total number of resources
 */
 total: number;
}
```
Returns list of available MCP resources.
### 
[​](#readmcpresource-2)
ReadMcpResource
**Tool name:** `ReadMcpResource`
Copy
```
interface ReadMcpResourceOutput {
 /**
 * Resource contents
 */
 contents: Array<{
 uri: string;
 mimeType?: string;
 text?: string;
 blob?: string;
 }>;
 /**
 * Server that provided the resource
 */
 server: string;
}
```
Returns the contents of the requested MCP resource.
## 
[​](#permission-types)
Permission Types
### 
[​](#permissionupdate)
`PermissionUpdate`
Operations for updating permissions.
Copy
```
type PermissionUpdate =
 | {
 type: 'addRules';
 rules: PermissionRuleValue[];
 behavior: PermissionBehavior;
 destination: PermissionUpdateDestination;
 }
 | {
 type: 'replaceRules';
 rules: PermissionRuleValue[];
 behavior: PermissionBehavior;
 destination: PermissionUpdateDestination;
 }
 | {
 type: 'removeRules';
 rules: PermissionRuleValue[];
 behavior: PermissionBehavior;
 destination: PermissionUpdateDestination;
 }
 | {
 type: 'setMode';
 mode: PermissionMode;
 destination: PermissionUpdateDestination;
 }
 | {
 type: 'addDirectories';
 directories: string[];
 destination: PermissionUpdateDestination;
 }
 | {
 type: 'removeDirectories';
 directories: string[];
 destination: PermissionUpdateDestination;
 }
```
### 
[​](#permissionbehavior)
`PermissionBehavior`
Copy
```
type PermissionBehavior = 'allow' | 'deny' | 'ask';
```
### 
[​](#permissionupdatedestination)
`PermissionUpdateDestination`
Copy
```
type PermissionUpdateDestination =
 | 'userSettings' // Global user settings
 | 'projectSettings' // Per-directory project settings
 | 'localSettings' // Gitignored local settings
 | 'session' // Current session only
```
### 
[​](#permissionrulevalue)
`PermissionRuleValue`
Copy
```
type PermissionRuleValue = {
 toolName: string;
 ruleContent?: string;
}
```
## 
[​](#other-types)
Other Types
### 
[​](#apikeysource)
`ApiKeySource`
Copy
```
type ApiKeySource = 'user' | 'project' | 'org' | 'temporary';
```
### 
[​](#configscope)
`ConfigScope`
Copy
```
type ConfigScope = 'local' | 'user' | 'project';
```
### 
[​](#nonnullableusage)
`NonNullableUsage`
A version of [`Usage`](#usage) with all nullable fields made non-nullable.
Copy
```
type NonNullableUsage = {
 [K in keyof Usage]: NonNullable<Usage[K]>;
}
```
### 
[​](#usage)
`Usage`
Token usage statistics (from `@anthropic-ai/sdk`).
Copy
```
type Usage = {
 input_tokens: number | null;
 output_tokens: number | null;
 cache_creation_input_tokens?: number | null;
 cache_read_input_tokens?: number | null;
}
```
### 
[​](#calltoolresult)
`CallToolResult`
MCP tool result type (from `@modelcontextprotocol/sdk/types.js`).
Copy
```
type CallToolResult = {
 content: Array<{
 type: 'text' | 'image' | 'resource';
 // Additional fields vary by type
 }>;
 isError?: boolean;
}
```
### 
[​](#aborterror)
`AbortError`
Custom error class for abort operations.
Copy
```
class AbortError extends Error {}
```
## 
[​](#see-also)
See also
 * [SDK overview](/en/api/agent-sdk/overview) - General SDK concepts
 * [Python SDK reference](/en/api/agent-sdk/python) - Python SDK documentation
 * [CLI reference](/en/docs/claude-code/cli-reference) - Command-line interface
 * [Common workflows](/en/docs/claude-code/common-workflows) - Step-by-step guides
Was this page helpful?
YesNo
[Overview](/en/api/agent-sdk/overview)[Python SDK](/en/api/agent-sdk/python)
Assistant
Responses are generated using AI and may contain mistakes.