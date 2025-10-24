Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Configuration
Model configuration
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
 * [Available models](#available-models)
 * [Model aliases](#model-aliases)
 * [Setting your model](#setting-your-model)
 * [Special model behavior](#special-model-behavior)
 * [default model setting](#default-model-setting)
 * [opusplan model setting](#opusplan-model-setting)
 * [Extended context with [1m]](#extended-context-with-%5B1m%5D)
 * [Checking your current model](#checking-your-current-model)
 * [Environment variables](#environment-variables)
 * [Prompt caching configuration](#prompt-caching-configuration)
## 
[​](#available-models)
Available models
For the `model` setting in Claude Code, you can either configure:
 * A **model alias**
 * A full **[model name](/en/docs/about-claude/models/overview#model-names)**
 * For Bedrock, an ARN
### 
[​](#model-aliases)
Model aliases
Model aliases provide a convenient way to select model settings without remembering exact version numbers: Model alias | Behavior 
---|--- 
**`default`**| Recommended model setting, depending on your account type 
**`sonnet`**| Uses the latest Sonnet model (currently Sonnet 4.5) for daily coding tasks 
**`opus`**| Uses Opus model (currently Opus 4.1) for specialized complex reasoning tasks 
**`haiku`**| Uses the fast and efficient Haiku model for simple tasks 
**`sonnet[1m]`**| Uses Sonnet with a [1 million token context window](/en/docs/build-with-claude/context-windows#1m-token-context-window) window for long sessions 
**`opusplan`**| Special mode that uses `opus` during plan mode, then switches to `sonnet` for execution 
### 
[​](#setting-your-model)
Setting your model
You can configure your model in several ways, listed in order of priority:
 1. **During session** - Use `/model <alias|name>` to switch models mid-session
 2. **At startup** - Launch with `claude --model <alias|name>`
 3. **Environment variable** - Set `ANTHROPIC_MODEL=<alias|name>`
 4. **Settings** - Configure permanently in your settings file using the `model` field.
Example usage:
Copy
```
# Start with Opus
claude --model opus
# Switch to Sonnet during session
/model sonnet
```
Example settings file:
Copy
```
{
 "permissions": {
 ...
 },
 "model": "opus"
}
```
## 
[​](#special-model-behavior)
Special model behavior
### 
[​](#default-model-setting)
`default` model setting
The behavior of `default` depends on your account type. For certain Max users, Claude Code will automatically fall back to Sonnet if you hit a usage threshold with Opus.
### 
[​](#opusplan-model-setting)
`opusplan` model setting
The `opusplan` model alias provides an automated hybrid approach:
 * **In plan mode** - Uses `opus` for complex reasoning and architecture decisions
 * **In execution mode** - Automatically switches to `sonnet` for code generation and implementation
This gives you the best of both worlds: Opus’s superior reasoning for planning, and Sonnet’s efficiency for execution.
### 
[​](#extended-context-with-%5B1m%5D)
Extended context with [1m]
For Console/API users, the `[1m]` suffix can be added to full model names to enable a [1 million token context window](/en/docs/build-with-claude/context-windows#1m-token-context-window).
Copy
```
# Example of using a full model name with the [1m] suffix
/model anthropic.claude-sonnet-4-5-20250929-v1:0[1m]
```
Note: Extended context models have [different pricing](/en/docs/about-claude/pricing#long-context-pricing).
## 
[​](#checking-your-current-model)
Checking your current model
You can see which model you’re currently using in several ways:
 1. In [status line](/en/docs/claude-code/statusline) (if configured)
 2. In `/status`, which also displays your account information.
## 
[​](#environment-variables)
Environment variables
You can use the following environment variables, which must be full **model names** , to control the model names that the aliases map to. Env var | Description 
---|--- 
`ANTHROPIC_DEFAULT_OPUS_MODEL` | The model to use for `opus`, or for `opusplan` when Plan Mode is active. 
`ANTHROPIC_DEFAULT_SONNET_MODEL` | The model to use for `sonnet`, or for `opusplan` when Plan Mode is not active. 
`ANTHROPIC_DEFAULT_HAIKU_MODEL` | The model to use for `haiku`, or [background functionality](/en/docs/claude-code/costs#background-token-usage) 
`CLAUDE_CODE_SUBAGENT_MODEL` | The model to use for [subagents](/en/docs/claude-code/sub-agents) 
Note: `ANTHROPIC_SMALL_FAST_MODEL` is deprecated in favor of `ANTHROPIC_DEFAULT_HAIKU_MODEL`.
### 
[​](#prompt-caching-configuration)
Prompt caching configuration
Claude Code automatically uses [prompt caching](/en/docs/build-with-claude/prompt-caching) to optimize performance and reduce costs. You can disable prompt caching globally or for specific model tiers: Env var | Description 
---|--- 
`DISABLE_PROMPT_CACHING` | Set to `1` to disable prompt caching for all models (takes precedence over per-model settings) 
`DISABLE_PROMPT_CACHING_HAIKU` | Set to `1` to disable prompt caching for Haiku models only 
`DISABLE_PROMPT_CACHING_SONNET` | Set to `1` to disable prompt caching for Sonnet models only 
`DISABLE_PROMPT_CACHING_OPUS` | Set to `1` to disable prompt caching for Opus models only 
These environment variables give you fine-grained control over prompt caching behavior. The global `DISABLE_PROMPT_CACHING` setting takes precedence over the model-specific settings, allowing you to quickly disable all caching when needed. The per-model settings are useful for selective control, such as when debugging specific models or working with cloud providers that may have different caching implementations.
Was this page helpful?
YesNo
[Terminal configuration](/en/docs/claude-code/terminal-config)[Memory management](/en/docs/claude-code/memory)
Assistant
Responses are generated using AI and may contain mistakes.