Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Administration
Monitoring
[Welcome](/en/home)[Claude Developer Platform](/en/docs/intro)[Claude Code](/en/docs/claude-code/overview)[Model Context Protocol (MCP)](/en/docs/mcp)[API Reference](/en/api/messages)[Resources](/en/resources/overview)[Release Notes](/en/release-notes/overview)
##### Getting started
 * [Overview](/en/docs/claude-code/overview)
 * [Quickstart](/en/docs/claude-code/quickstart)
 * [Common workflows](/en/docs/claude-code/common-workflows)
 * [Claude Code on the web](/en/docs/claude-code/claude-code-on-the-web)
##### Build with Claude Code
 * [Subagents](/en/docs/claude-code/sub-agents)
 * [Plugins](/en/docs/claude-code/plugins)
 * [Agent Skills](/en/docs/claude-code/skills)
 * [Output styles](/en/docs/claude-code/output-styles)
 * [Hooks](/en/docs/claude-code/hooks-guide)
 * [Headless mode](/en/docs/claude-code/headless)
 * [GitHub Actions](/en/docs/claude-code/github-actions)
 * [GitLab CI/CD](/en/docs/claude-code/gitlab-ci-cd)
 * [Model Context Protocol (MCP)](/en/docs/claude-code/mcp)
 * [Troubleshooting](/en/docs/claude-code/troubleshooting)
##### Claude Agent SDK
 * [Migrate to Claude Agent SDK](/en/docs/claude-code/sdk/migration-guide)
##### Deployment
 * [Overview](/en/docs/claude-code/third-party-integrations)
 * [Amazon Bedrock](/en/docs/claude-code/amazon-bedrock)
 * [Google Vertex AI](/en/docs/claude-code/google-vertex-ai)
 * [Network configuration](/en/docs/claude-code/network-config)
 * [LLM gateway](/en/docs/claude-code/llm-gateway)
 * [Development containers](/en/docs/claude-code/devcontainer)
 * [Sandboxing](/en/docs/claude-code/sandboxing)
##### Administration
 * [Advanced installation](/en/docs/claude-code/setup)
 * [Identity and Access Management](/en/docs/claude-code/iam)
 * [Security](/en/docs/claude-code/security)
 * [Data usage](/en/docs/claude-code/data-usage)
 * [Monitoring](/en/docs/claude-code/monitoring-usage)
 * [Costs](/en/docs/claude-code/costs)
 * [Analytics](/en/docs/claude-code/analytics)
 * [Plugin marketplaces](/en/docs/claude-code/plugin-marketplaces)
##### Configuration
 * [Settings](/en/docs/claude-code/settings)
 * [Visual Studio Code](/en/docs/claude-code/vs-code)
 * [JetBrains IDEs](/en/docs/claude-code/jetbrains)
 * [Terminal configuration](/en/docs/claude-code/terminal-config)
 * [Model configuration](/en/docs/claude-code/model-config)
 * [Memory management](/en/docs/claude-code/memory)
 * [Status line configuration](/en/docs/claude-code/statusline)
##### Reference
 * [CLI reference](/en/docs/claude-code/cli-reference)
 * [Interactive mode](/en/docs/claude-code/interactive-mode)
 * [Slash commands](/en/docs/claude-code/slash-commands)
 * [Checkpointing](/en/docs/claude-code/checkpointing)
 * [Hooks reference](/en/docs/claude-code/hooks)
 * [Plugins reference](/en/docs/claude-code/plugins-reference)
##### Resources
 * [Legal and compliance](/en/docs/claude-code/legal-and-compliance)
On this page
 * [Quick Start](#quick-start)
 * [Administrator Configuration](#administrator-configuration)
 * [Configuration Details](#configuration-details)
 * [Common Configuration Variables](#common-configuration-variables)
 * [Metrics Cardinality Control](#metrics-cardinality-control)
 * [Dynamic Headers](#dynamic-headers)
 * [Settings Configuration](#settings-configuration)
 * [Script Requirements](#script-requirements)
 * [Important Limitations](#important-limitations)
 * [Multi-Team Organization Support](#multi-team-organization-support)
 * [Example Configurations](#example-configurations)
 * [Available Metrics and Events](#available-metrics-and-events)
 * [Standard Attributes](#standard-attributes)
 * [Metrics](#metrics)
 * [Metric Details](#metric-details)
 * [Session Counter](#session-counter)
 * [Lines of Code Counter](#lines-of-code-counter)
 * [Pull Request Counter](#pull-request-counter)
 * [Commit Counter](#commit-counter)
 * [Cost Counter](#cost-counter)
 * [Token Counter](#token-counter)
 * [Code Edit Tool Decision Counter](#code-edit-tool-decision-counter)
 * [Active Time Counter](#active-time-counter)
 * [Events](#events)
 * [User Prompt Event](#user-prompt-event)
 * [Tool Result Event](#tool-result-event)
 * [API Request Event](#api-request-event)
 * [API Error Event](#api-error-event)
 * [Tool Decision Event](#tool-decision-event)
 * [Interpreting Metrics and Events Data](#interpreting-metrics-and-events-data)
 * [Usage Monitoring](#usage-monitoring)
 * [Cost Monitoring](#cost-monitoring)
 * [Alerting and Segmentation](#alerting-and-segmentation)
 * [Event Analysis](#event-analysis)
 * [Backend Considerations](#backend-considerations)
 * [For Metrics:](#for-metrics%3A)
 * [For Events/Logs:](#for-events%2Flogs%3A)
 * [Service Information](#service-information)
 * [ROI Measurement Resources](#roi-measurement-resources)
 * [Security/Privacy Considerations](#security%2Fprivacy-considerations)
 * [Monitoring Claude Code on Amazon Bedrock](#monitoring-claude-code-on-amazon-bedrock)
Claude Code supports OpenTelemetry (OTel) metrics and events for monitoring and observability. All metrics are time series data exported via OpenTelemetry’s standard metrics protocol, and events are exported via OpenTelemetry’s logs/events protocol. It is the user’s responsibility to ensure their metrics and logs backends are properly configured and that the aggregation granularity meets their monitoring requirements.
OpenTelemetry support is currently in beta and details are subject to change.
## 
[​](#quick-start)
Quick Start
Configure OpenTelemetry using environment variables:
Copy
```
# 1. Enable telemetry
export CLAUDE_CODE_ENABLE_TELEMETRY=1
# 2. Choose exporters (both are optional - configure only what you need)
export OTEL_METRICS_EXPORTER=otlp # Options: otlp, prometheus, console
export OTEL_LOGS_EXPORTER=otlp # Options: otlp, console
# 3. Configure OTLP endpoint (for OTLP exporter)
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
# 4. Set authentication (if required)
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer your-token"
# 5. For debugging: reduce export intervals
export OTEL_METRIC_EXPORT_INTERVAL=10000 # 10 seconds (default: 60000ms)
export OTEL_LOGS_EXPORT_INTERVAL=5000 # 5 seconds (default: 5000ms)
# 6. Run Claude Code
claude
```
The default export intervals are 60 seconds for metrics and 5 seconds for logs. During setup, you may want to use shorter intervals for debugging purposes. Remember to reset these for production use.
For full configuration options, see the [OpenTelemetry specification](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/protocol/exporter.md#configuration-options).
## 
[​](#administrator-configuration)
Administrator Configuration
Administrators can configure OpenTelemetry settings for all users through the managed settings file. This allows for centralized control of telemetry settings across an organization. See the [settings precedence](/en/docs/claude-code/settings#settings-precedence) for more information about how settings are applied. The managed settings file is located at:
 * macOS: `/Library/Application Support/ClaudeCode/managed-settings.json`
 * Linux and WSL: `/etc/claude-code/managed-settings.json`
 * Windows: `C:\ProgramData\ClaudeCode\managed-settings.json`
Example managed settings configuration:
Copy
```
{
 "env": {
 "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
 "OTEL_METRICS_EXPORTER": "otlp",
 "OTEL_LOGS_EXPORTER": "otlp",
 "OTEL_EXPORTER_OTLP_PROTOCOL": "grpc",
 "OTEL_EXPORTER_OTLP_ENDPOINT": "http://collector.company.com:4317",
 "OTEL_EXPORTER_OTLP_HEADERS": "Authorization=Bearer company-token"
 }
}
```
Managed settings can be distributed via MDM (Mobile Device Management) or other device management solutions. Environment variables defined in the managed settings file have high precedence and cannot be overridden by users.
## 
[​](#configuration-details)
Configuration Details
### 
[​](#common-configuration-variables)
Common Configuration Variables
Environment Variable | Description | Example Values 
---|---|--- 
`CLAUDE_CODE_ENABLE_TELEMETRY` | Enables telemetry collection (required) | `1` 
`OTEL_METRICS_EXPORTER` | Metrics exporter type(s) (comma-separated) | `console`, `otlp`, `prometheus` 
`OTEL_LOGS_EXPORTER` | Logs/events exporter type(s) (comma-separated) | `console`, `otlp` 
`OTEL_EXPORTER_OTLP_PROTOCOL` | Protocol for OTLP exporter (all signals) | `grpc`, `http/json`, `http/protobuf` 
`OTEL_EXPORTER_OTLP_ENDPOINT` | OTLP collector endpoint (all signals) | `http://localhost:4317` 
`OTEL_EXPORTER_OTLP_METRICS_PROTOCOL` | Protocol for metrics (overrides general) | `grpc`, `http/json`, `http/protobuf` 
`OTEL_EXPORTER_OTLP_METRICS_ENDPOINT` | OTLP metrics endpoint (overrides general) | `http://localhost:4318/v1/metrics` 
`OTEL_EXPORTER_OTLP_LOGS_PROTOCOL` | Protocol for logs (overrides general) | `grpc`, `http/json`, `http/protobuf` 
`OTEL_EXPORTER_OTLP_LOGS_ENDPOINT` | OTLP logs endpoint (overrides general) | `http://localhost:4318/v1/logs` 
`OTEL_EXPORTER_OTLP_HEADERS` | Authentication headers for OTLP | `Authorization=Bearer token` 
`OTEL_EXPORTER_OTLP_METRICS_CLIENT_KEY` | Client key for mTLS authentication | Path to client key file 
`OTEL_EXPORTER_OTLP_METRICS_CLIENT_CERTIFICATE` | Client certificate for mTLS authentication | Path to client cert file 
`OTEL_METRIC_EXPORT_INTERVAL` | Export interval in milliseconds (default: 60000) | `5000`, `60000` 
`OTEL_LOGS_EXPORT_INTERVAL` | Logs export interval in milliseconds (default: 5000) | `1000`, `10000` 
`OTEL_LOG_USER_PROMPTS` | Enable logging of user prompt content (default: disabled) | `1` to enable 
### 
[​](#metrics-cardinality-control)
Metrics Cardinality Control
The following environment variables control which attributes are included in metrics to manage cardinality: Environment Variable | Description | Default Value | Example to Disable 
---|---|---|--- 
`OTEL_METRICS_INCLUDE_SESSION_ID` | Include session.id attribute in metrics | `true` | `false` 
`OTEL_METRICS_INCLUDE_VERSION` | Include app.version attribute in metrics | `false` | `true` 
`OTEL_METRICS_INCLUDE_ACCOUNT_UUID` | Include user.account_uuid attribute in metrics | `true` | `false` 
These variables help control the cardinality of metrics, which affects storage requirements and query performance in your metrics backend. Lower cardinality generally means better performance and lower storage costs but less granular data for analysis.
### 
[​](#dynamic-headers)
Dynamic Headers
For enterprise environments that require dynamic authentication, you can configure a script to generate headers dynamically:
#### 
[​](#settings-configuration)
Settings Configuration
Add to your `.claude/settings.json`:
Copy
```
{
 "otelHeadersHelper": "/bin/generate_opentelemetry_headers.sh"
}
```
#### 
[​](#script-requirements)
Script Requirements
The script must output valid JSON with string key-value pairs representing HTTP headers:
Copy
```
#!/bin/bash
# Example: Multiple headers
echo "{\"Authorization\": \"Bearer $(get-token.sh)\", \"X-API-Key\": \"$(get-api-key.sh)\"}"
```
#### 
[​](#important-limitations)
Important Limitations
**Headers are fetched only at startup, not during runtime.** This is due to OpenTelemetry exporter architecture limitations. For scenarios requiring frequent token refresh, use an OpenTelemetry Collector as a proxy that can refresh its own headers.
### 
[​](#multi-team-organization-support)
Multi-Team Organization Support
Organizations with multiple teams or departments can add custom attributes to distinguish between different groups using the `OTEL_RESOURCE_ATTRIBUTES` environment variable:
Copy
```
# Add custom attributes for team identification
export OTEL_RESOURCE_ATTRIBUTES="department=engineering,team.id=platform,cost_center=eng-123"
```
These custom attributes will be included in all metrics and events, allowing you to:
 * Filter metrics by team or department
 * Track costs per cost center
 * Create team-specific dashboards
 * Set up alerts for specific teams
**Important formatting requirements for OTEL_RESOURCE_ATTRIBUTES:** The `OTEL_RESOURCE_ATTRIBUTES` environment variable follows the [W3C Baggage specification](https://www.w3.org/TR/baggage/), which has strict formatting requirements:
 * **No spaces allowed** : Values cannot contain spaces. For example, `user.organizationName=My Company` is invalid
 * **Format** : Must be comma-separated key=value pairs: `key1=value1,key2=value2`
 * **Allowed characters** : Only US-ASCII characters excluding control characters, whitespace, double quotes, commas, semicolons, and backslashes
 * **Special characters** : Characters outside the allowed range must be percent-encoded
**Examples:**
Copy
```
# ❌ Invalid - contains spaces
export OTEL_RESOURCE_ATTRIBUTES="org.name=John's Organization"
# ✅ Valid - use underscores or camelCase instead
export OTEL_RESOURCE_ATTRIBUTES="org.name=Johns_Organization"
export OTEL_RESOURCE_ATTRIBUTES="org.name=JohnsOrganization"
# ✅ Valid - percent-encode special characters if needed
export OTEL_RESOURCE_ATTRIBUTES="org.name=John%27s%20Organization"
```
Note: Quoting the entire key=value pair (e.g., `"key=value with spaces"`) is not supported by the OpenTelemetry specification and will result in attributes being prefixed with quotes.
### 
[​](#example-configurations)
Example Configurations
Copy
```
# Console debugging (1-second intervals)
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=console
export OTEL_METRIC_EXPORT_INTERVAL=1000
# OTLP/gRPC
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
# Prometheus
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=prometheus
# Multiple exporters
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=console,otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/json
# Different endpoints/backends for metrics and logs
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=otlp
export OTEL_LOGS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_METRICS_PROTOCOL=http/protobuf
export OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://metrics.company.com:4318
export OTEL_EXPORTER_OTLP_LOGS_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_LOGS_ENDPOINT=http://logs.company.com:4317
# Metrics only (no events/logs)
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
# Events/logs only (no metrics)
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_LOGS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
```
## 
[​](#available-metrics-and-events)
Available Metrics and Events
### 
[​](#standard-attributes)
Standard Attributes
All metrics and events share these standard attributes: Attribute | Description | Controlled By 
---|---|--- 
`session.id` | Unique session identifier | `OTEL_METRICS_INCLUDE_SESSION_ID` (default: true) 
`app.version` | Current Claude Code version | `OTEL_METRICS_INCLUDE_VERSION` (default: false) 
`organization.id` | Organization UUID (when authenticated) | Always included when available 
`user.account_uuid` | Account UUID (when authenticated) | `OTEL_METRICS_INCLUDE_ACCOUNT_UUID` (default: true) 
`terminal.type` | Terminal type (e.g., `iTerm.app`, `vscode`, `cursor`, `tmux`) | Always included when detected 
### 
[​](#metrics)
Metrics
Claude Code exports the following metrics: Metric Name | Description | Unit 
---|---|--- 
`claude_code.session.count` | Count of CLI sessions started | count 
`claude_code.lines_of_code.count` | Count of lines of code modified | count 
`claude_code.pull_request.count` | Number of pull requests created | count 
`claude_code.commit.count` | Number of git commits created | count 
`claude_code.cost.usage` | Cost of the Claude Code session | USD 
`claude_code.token.usage` | Number of tokens used | tokens 
`claude_code.code_edit_tool.decision` | Count of code editing tool permission decisions | count 
`claude_code.active_time.total` | Total active time in seconds | s 
### 
[​](#metric-details)
Metric Details
#### 
[​](#session-counter)
Session Counter
Incremented at the start of each session. **Attributes** :
 * All [standard attributes](#standard-attributes)
#### 
[​](#lines-of-code-counter)
Lines of Code Counter
Incremented when code is added or removed. **Attributes** :
 * All [standard attributes](#standard-attributes)
 * `type`: (`"added"`, `"removed"`)
#### 
[​](#pull-request-counter)
Pull Request Counter
Incremented when creating pull requests via Claude Code. **Attributes** :
 * All [standard attributes](#standard-attributes)
#### 
[​](#commit-counter)
Commit Counter
Incremented when creating git commits via Claude Code. **Attributes** :
 * All [standard attributes](#standard-attributes)
#### 
[​](#cost-counter)
Cost Counter
Incremented after each API request. **Attributes** :
 * All [standard attributes](#standard-attributes)
 * `model`: Model identifier (e.g., “claude-3-5-sonnet-20241022”)
#### 
[​](#token-counter)
Token Counter
Incremented after each API request. **Attributes** :
 * All [standard attributes](#standard-attributes)
 * `type`: (`"input"`, `"output"`, `"cacheRead"`, `"cacheCreation"`)
 * `model`: Model identifier (e.g., “claude-3-5-sonnet-20241022”)
#### 
[​](#code-edit-tool-decision-counter)
Code Edit Tool Decision Counter
Incremented when user accepts or rejects Edit, Write, or NotebookEdit tool usage. **Attributes** :
 * All [standard attributes](#standard-attributes)
 * `tool`: Tool name (`"Edit"`, `"Write"`, `"NotebookEdit"`)
 * `decision`: User decision (`"accept"`, `"reject"`)
 * `language`: Programming language of the edited file (e.g., `"TypeScript"`, `"Python"`, `"JavaScript"`, `"Markdown"`). Returns `"unknown"` for unrecognized file extensions.
#### 
[​](#active-time-counter)
Active Time Counter
Tracks actual time spent actively using Claude Code (not idle time). This metric is incremented during user interactions such as typing prompts or receiving responses. **Attributes** :
 * All [standard attributes](#standard-attributes)
### 
[​](#events)
Events
Claude Code exports the following events via OpenTelemetry logs/events (when `OTEL_LOGS_EXPORTER` is configured):
#### 
[​](#user-prompt-event)
User Prompt Event
Logged when a user submits a prompt. **Event Name** : `claude_code.user_prompt` **Attributes** :
 * All [standard attributes](#standard-attributes)
 * `event.name`: `"user_prompt"`
 * `event.timestamp`: ISO 8601 timestamp
 * `prompt_length`: Length of the prompt
 * `prompt`: Prompt content (redacted by default, enable with `OTEL_LOG_USER_PROMPTS=1`)
#### 
[​](#tool-result-event)
Tool Result Event
Logged when a tool completes execution. **Event Name** : `claude_code.tool_result` **Attributes** :
 * All [standard attributes](#standard-attributes)
 * `event.name`: `"tool_result"`
 * `event.timestamp`: ISO 8601 timestamp
 * `tool_name`: Name of the tool
 * `success`: `"true"` or `"false"`
 * `duration_ms`: Execution time in milliseconds
 * `error`: Error message (if failed)
 * `decision`: Either `"accept"` or `"reject"`
 * `source`: Decision source - `"config"`, `"user_permanent"`, `"user_temporary"`, `"user_abort"`, or `"user_reject"`
 * `tool_parameters`: JSON string containing tool-specific parameters (when available)
 * For Bash tool: includes `bash_command`, `full_command`, `timeout`, `description`, `sandbox`
#### 
[​](#api-request-event)
API Request Event
Logged for each API request to Claude. **Event Name** : `claude_code.api_request` **Attributes** :
 * All [standard attributes](#standard-attributes)
 * `event.name`: `"api_request"`
 * `event.timestamp`: ISO 8601 timestamp
 * `model`: Model used (e.g., “claude-3-5-sonnet-20241022”)
 * `cost_usd`: Estimated cost in USD
 * `duration_ms`: Request duration in milliseconds
 * `input_tokens`: Number of input tokens
 * `output_tokens`: Number of output tokens
 * `cache_read_tokens`: Number of tokens read from cache
 * `cache_creation_tokens`: Number of tokens used for cache creation
#### 
[​](#api-error-event)
API Error Event
Logged when an API request to Claude fails. **Event Name** : `claude_code.api_error` **Attributes** :
 * All [standard attributes](#standard-attributes)
 * `event.name`: `"api_error"`
 * `event.timestamp`: ISO 8601 timestamp
 * `model`: Model used (e.g., “claude-3-5-sonnet-20241022”)
 * `error`: Error message
 * `status_code`: HTTP status code (if applicable)
 * `duration_ms`: Request duration in milliseconds
 * `attempt`: Attempt number (for retried requests)
#### 
[​](#tool-decision-event)
Tool Decision Event
Logged when a tool permission decision is made (accept/reject). **Event Name** : `claude_code.tool_decision` **Attributes** :
 * All [standard attributes](#standard-attributes)
 * `event.name`: `"tool_decision"`
 * `event.timestamp`: ISO 8601 timestamp
 * `tool_name`: Name of the tool (e.g., “Read”, “Edit”, “Write”, “NotebookEdit”, etc.)
 * `decision`: Either `"accept"` or `"reject"`
 * `source`: Decision source - `"config"`, `"user_permanent"`, `"user_temporary"`, `"user_abort"`, or `"user_reject"`
## 
[​](#interpreting-metrics-and-events-data)
Interpreting Metrics and Events Data
The metrics exported by Claude Code provide valuable insights into usage patterns and productivity. Here are some common visualizations and analyses you can create:
### 
[​](#usage-monitoring)
Usage Monitoring
Metric | Analysis Opportunity 
---|--- 
`claude_code.token.usage` | Break down by `type` (input/output), user, team, or model 
`claude_code.session.count` | Track adoption and engagement over time 
`claude_code.lines_of_code.count` | Measure productivity by tracking code additions/removals 
`claude_code.commit.count` & `claude_code.pull_request.count` | Understand impact on development workflows 
### 
[​](#cost-monitoring)
Cost Monitoring
The `claude_code.cost.usage` metric helps with:
 * Tracking usage trends across teams or individuals
 * Identifying high-usage sessions for optimization
Cost metrics are approximations. For official billing data, refer to your API provider (Claude Console, AWS Bedrock, or Google Cloud Vertex).
### 
[​](#alerting-and-segmentation)
Alerting and Segmentation
Common alerts to consider:
 * Cost spikes
 * Unusual token consumption
 * High session volume from specific users
All metrics can be segmented by `user.account_uuid`, `organization.id`, `session.id`, `model`, and `app.version`.
### 
[​](#event-analysis)
Event Analysis
The event data provides detailed insights into Claude Code interactions: **Tool Usage Patterns** : Analyze tool result events to identify:
 * Most frequently used tools
 * Tool success rates
 * Average tool execution times
 * Error patterns by tool type
**Performance Monitoring** : Track API request durations and tool execution times to identify performance bottlenecks.
## 
[​](#backend-considerations)
Backend Considerations
Your choice of metrics and logs backends will determine the types of analyses you can perform:
### 
[​](#for-metrics%3A)
For Metrics:
 * **Time series databases (e.g., Prometheus)** : Rate calculations, aggregated metrics
 * **Columnar stores (e.g., ClickHouse)** : Complex queries, unique user analysis
 * **Full-featured observability platforms (e.g., Honeycomb, Datadog)** : Advanced querying, visualization, alerting
### 
[​](#for-events%2Flogs%3A)
For Events/Logs:
 * **Log aggregation systems (e.g., Elasticsearch, Loki)** : Full-text search, log analysis
 * **Columnar stores (e.g., ClickHouse)** : Structured event analysis
 * **Full-featured observability platforms (e.g., Honeycomb, Datadog)** : Correlation between metrics and events
For organizations requiring Daily/Weekly/Monthly Active User (DAU/WAU/MAU) metrics, consider backends that support efficient unique value queries.
## 
[​](#service-information)
Service Information
All metrics and events are exported with the following resource attributes:
 * `service.name`: `claude-code`
 * `service.version`: Current Claude Code version
 * `os.type`: Operating system type (e.g., `linux`, `darwin`, `windows`)
 * `os.version`: Operating system version string
 * `host.arch`: Host architecture (e.g., `amd64`, `arm64`)
 * `wsl.version`: WSL version number (only present when running on Windows Subsystem for Linux)
 * Meter Name: `com.anthropic.claude_code`
## 
[​](#roi-measurement-resources)
ROI Measurement Resources
For a comprehensive guide on measuring return on investment for Claude Code, including telemetry setup, cost analysis, productivity metrics, and automated reporting, see the [Claude Code ROI Measurement Guide](https://github.com/anthropics/claude-code-monitoring-guide). This repository provides ready-to-use Docker Compose configurations, Prometheus and OpenTelemetry setups, and templates for generating productivity reports integrated with tools like Linear.
## 
[​](#security%2Fprivacy-considerations)
Security/Privacy Considerations
 * Telemetry is opt-in and requires explicit configuration
 * Sensitive information like API keys or file contents are never included in metrics or events
 * User prompt content is redacted by default - only prompt length is recorded. To enable user prompt logging, set `OTEL_LOG_USER_PROMPTS=1`
## 
[​](#monitoring-claude-code-on-amazon-bedrock)
Monitoring Claude Code on Amazon Bedrock
For detailed Claude Code usage monitoring guidance for Amazon Bedrock, see [Claude Code Monitoring Implementation (Bedrock)](https://github.com/aws-solutions-library-samples/guidance-for-claude-code-with-amazon-bedrock/blob/main/assets/docs/MONITORING.md).
Was this page helpful?
YesNo
[Data usage](/en/docs/claude-code/data-usage)[Costs](/en/docs/claude-code/costs)
Assistant
Responses are generated using AI and may contain mistakes.