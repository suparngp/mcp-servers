Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Deployment
LLM gateway configuration
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
 * [LiteLLM configuration](#litellm-configuration)
 * [Prerequisites](#prerequisites)
 * [Basic LiteLLM setup](#basic-litellm-setup)
 * [Authentication methods](#authentication-methods)
 * [Unified endpoint (recommended)](#unified-endpoint-recommended)
 * [Provider-specific pass-through endpoints (alternative)](#provider-specific-pass-through-endpoints-alternative)
 * [Model selection](#model-selection)
 * [Additional resources](#additional-resources)
LLM gateways provide a centralized proxy layer between Claude Code and model providers, offering:
 * **Centralized authentication** - Single point for API key management
 * **Usage tracking** - Monitor usage across teams and projects
 * **Cost controls** - Implement budgets and rate limits
 * **Audit logging** - Track all model interactions for compliance
 * **Model routing** - Switch between providers without code changes
## 
[​](#litellm-configuration)
LiteLLM configuration
LiteLLM is a third-party proxy service. Anthropic doesn’t endorse, maintain, or audit LiteLLM’s security or functionality. This guide is provided for informational purposes and may become outdated. Use at your own discretion.
### 
[​](#prerequisites)
Prerequisites
 * Claude Code updated to the latest version
 * LiteLLM Proxy Server deployed and accessible
 * Access to Claude models through your chosen provider
### 
[​](#basic-litellm-setup)
Basic LiteLLM setup
**Configure Claude Code** :
#### 
[​](#authentication-methods)
Authentication methods
##### Static API key
Simplest method using a fixed API key:
Copy
```
# Set in environment
export ANTHROPIC_AUTH_TOKEN=sk-litellm-static-key
# Or in Claude Code settings
{
 "env": {
 "ANTHROPIC_AUTH_TOKEN": "sk-litellm-static-key"
 }
}
```
This value will be sent as the `Authorization` header.
##### Dynamic API key with helper
For rotating keys or per-user authentication:
 1. Create an API key helper script:
Copy
```
#!/bin/bash
# ~/bin/get-litellm-key.sh
# Example: Fetch key from vault
vault kv get -field=api_key secret/litellm/claude-code
# Example: Generate JWT token
jwt encode \
 --secret="${JWT_SECRET}" \
 --exp="+1h" \
 '{"user":"'${USER}'","team":"engineering"}'
```
 1. Configure Claude Code settings to use the helper:
Copy
```
{
 "apiKeyHelper": "~/bin/get-litellm-key.sh"
}
```
 1. Set token refresh interval:
Copy
```
# Refresh every hour (3600000 ms)
export CLAUDE_CODE_API_KEY_HELPER_TTL_MS=3600000
```
This value will be sent as `Authorization` and `X-Api-Key` headers. The `apiKeyHelper` has lower precedence than `ANTHROPIC_AUTH_TOKEN` or `ANTHROPIC_API_KEY`.
#### 
[​](#unified-endpoint-recommended)
Unified endpoint (recommended)
Using LiteLLM’s [Anthropic format endpoint](https://docs.litellm.ai/docs/anthropic_unified):
Copy
```
export ANTHROPIC_BASE_URL=https://litellm-server:4000
```
**Benefits of the unified endpoint over pass-through endpoints:**
 * Load balancing
 * Fallbacks
 * Consistent support for cost tracking and end-user tracking
#### 
[​](#provider-specific-pass-through-endpoints-alternative)
Provider-specific pass-through endpoints (alternative)
##### Claude API through LiteLLM
Using [pass-through endpoint](https://docs.litellm.ai/docs/pass_through/anthropic_completion):
Copy
```
export ANTHROPIC_BASE_URL=https://litellm-server:4000/anthropic
```
##### Amazon Bedrock through LiteLLM
Using [pass-through endpoint](https://docs.litellm.ai/docs/pass_through/bedrock):
Copy
```
export ANTHROPIC_BEDROCK_BASE_URL=https://litellm-server:4000/bedrock
export CLAUDE_CODE_SKIP_BEDROCK_AUTH=1
export CLAUDE_CODE_USE_BEDROCK=1
```
##### Google Vertex AI through LiteLLM
Using [pass-through endpoint](https://docs.litellm.ai/docs/pass_through/vertex_ai):
Copy
```
export ANTHROPIC_VERTEX_BASE_URL=https://litellm-server:4000/vertex_ai/v1
export ANTHROPIC_VERTEX_PROJECT_ID=your-gcp-project-id
export CLAUDE_CODE_SKIP_VERTEX_AUTH=1
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION=us-east5
```
### 
[​](#model-selection)
Model selection
By default, the models will use those specified in [Model configuration](/en/docs/claude-code/bedrock-vertex-proxies#model-configuration). If you have configured custom model names in LiteLLM, set the aforementioned environment variables to those custom names. For more detailed information, refer to the [LiteLLM documentation](https://docs.litellm.ai/).
## 
[​](#additional-resources)
Additional resources
 * [LiteLLM documentation](https://docs.litellm.ai/)
 * [Claude Code settings](/en/docs/claude-code/settings)
 * [Enterprise network configuration](/en/docs/claude-code/network-config)
 * [Third-party integrations overview](/en/docs/claude-code/third-party-integrations)
Was this page helpful?
YesNo
[Network configuration](/en/docs/claude-code/network-config)[Development containers](/en/docs/claude-code/devcontainer)
Assistant
Responses are generated using AI and may contain mistakes.