[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Deployment
Enterprise deployment overview
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
 * [Provider comparison](#provider-comparison)
 * [Cloud providers](#cloud-providers)
 * [Corporate infrastructure](#corporate-infrastructure)
 * [Configuration overview](#configuration-overview)
 * [Using Bedrock with corporate proxy](#using-bedrock-with-corporate-proxy)
 * [Using Bedrock with LLM Gateway](#using-bedrock-with-llm-gateway)
 * [Using Vertex AI with corporate proxy](#using-vertex-ai-with-corporate-proxy)
 * [Using Vertex AI with LLM Gateway](#using-vertex-ai-with-llm-gateway)
 * [Authentication configuration](#authentication-configuration)
 * [Choosing the right deployment configuration](#choosing-the-right-deployment-configuration)
 * [Direct provider access](#direct-provider-access)
 * [Corporate proxy](#corporate-proxy)
 * [LLM Gateway](#llm-gateway)
 * [Debugging](#debugging)
 * [Best practices for organizations](#best-practices-for-organizations)
 * [1. Invest in documentation and memory](#1-invest-in-documentation-and-memory)
 * [2. Simplify deployment](#2-simplify-deployment)
 * [3. Start with guided usage](#3-start-with-guided-usage)
 * [4. Configure security policies](#4-configure-security-policies)
 * [5. Leverage MCP for integrations](#5-leverage-mcp-for-integrations)
 * [Next steps](#next-steps)
This page provides an overview of available deployment options and helps you choose the right configuration for your organization.
## 
[​](#provider-comparison)
Provider comparison
Feature | Anthropic | Amazon Bedrock | Google Vertex AI 
---|---|---|--- 
Regions | Supported [countries](https://www.anthropic.com/supported-countries) | Multiple AWS [regions](https://docs.aws.amazon.com/bedrock/latest/userguide/models-regions.html) | Multiple GCP [regions](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations) 
Prompt caching | Enabled by default | Enabled by default | Enabled by default 
Authentication | API key | AWS credentials (IAM) | GCP credentials (OAuth/Service Account) 
Cost tracking | Dashboard | AWS Cost Explorer | GCP Billing 
Enterprise features | Teams, usage monitoring | IAM policies, CloudTrail | IAM roles, Cloud Audit Logs 
## 
[​](#cloud-providers)
Cloud providers
## [Amazon Bedrock Use Claude models through AWS infrastructure with IAM-based authentication and AWS-native monitoring ](/en/docs/claude-code/amazon-bedrock)## [Google Vertex AI Access Claude models via Google Cloud Platform with enterprise-grade security and compliance ](/en/docs/claude-code/google-vertex-ai)
## 
[​](#corporate-infrastructure)
Corporate infrastructure
## [Enterprise Network Configure Claude Code to work with your organization’s proxy servers and SSL/TLS requirements ](/en/docs/claude-code/network-config)## [LLM Gateway Deploy centralized model access with usage tracking, budgeting, and audit logging ](/en/docs/claude-code/llm-gateway)
## 
[​](#configuration-overview)
Configuration overview
Claude Code supports flexible configuration options that allow you to combine different providers and infrastructure:
Understand the difference between:
 * **Corporate proxy** : An HTTP/HTTPS proxy for routing traffic (set via `HTTPS_PROXY` or `HTTP_PROXY`)
 * **LLM Gateway** : A service that handles authentication and provides provider-compatible endpoints (set via `ANTHROPIC_BASE_URL`, `ANTHROPIC_BEDROCK_BASE_URL`, or `ANTHROPIC_VERTEX_BASE_URL`)
Both configurations can be used in tandem.
### 
[​](#using-bedrock-with-corporate-proxy)
Using Bedrock with corporate proxy
Route Bedrock traffic through a corporate HTTP/HTTPS proxy:
Copy
```
# Enable Bedrock
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1
# Configure corporate proxy
export HTTPS_PROXY='https://proxy.example.com:8080'
```
### 
[​](#using-bedrock-with-llm-gateway)
Using Bedrock with LLM Gateway
Use a gateway service that provides Bedrock-compatible endpoints:
Copy
```
# Enable Bedrock
export CLAUDE_CODE_USE_BEDROCK=1
# Configure LLM gateway
export ANTHROPIC_BEDROCK_BASE_URL='https://your-llm-gateway.com/bedrock'
export CLAUDE_CODE_SKIP_BEDROCK_AUTH=1 # If gateway handles AWS auth
```
### 
[​](#using-vertex-ai-with-corporate-proxy)
Using Vertex AI with corporate proxy
Route Vertex AI traffic through a corporate HTTP/HTTPS proxy:
Copy
```
# Enable Vertex
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION=us-east5
export ANTHROPIC_VERTEX_PROJECT_ID=your-project-id
# Configure corporate proxy
export HTTPS_PROXY='https://proxy.example.com:8080'
```
### 
[​](#using-vertex-ai-with-llm-gateway)
Using Vertex AI with LLM Gateway
Combine Google Vertex AI models with an LLM gateway for centralized management:
Copy
```
# Enable Vertex
export CLAUDE_CODE_USE_VERTEX=1
# Configure LLM gateway
export ANTHROPIC_VERTEX_BASE_URL='https://your-llm-gateway.com/vertex'
export CLAUDE_CODE_SKIP_VERTEX_AUTH=1 # If gateway handles GCP auth
```
### 
[​](#authentication-configuration)
Authentication configuration
Claude Code uses the `ANTHROPIC_AUTH_TOKEN` for the `Authorization` header when needed. The `SKIP_AUTH` flags (`CLAUDE_CODE_SKIP_BEDROCK_AUTH`, `CLAUDE_CODE_SKIP_VERTEX_AUTH`) are used in LLM gateway scenarios where the gateway handles provider authentication.
## 
[​](#choosing-the-right-deployment-configuration)
Choosing the right deployment configuration
Consider these factors when selecting your deployment approach:
### 
[​](#direct-provider-access)
Direct provider access
Best for organizations that:
 * Want the simplest setup
 * Have existing AWS or GCP infrastructure
 * Need provider-native monitoring and compliance
### 
[​](#corporate-proxy)
Corporate proxy
Best for organizations that:
 * Have existing corporate proxy requirements
 * Need traffic monitoring and compliance
 * Must route all traffic through specific network paths
### 
[​](#llm-gateway)
LLM Gateway
Best for organizations that:
 * Need usage tracking across teams
 * Want to dynamically switch between models
 * Require custom rate limiting or budgets
 * Need centralized authentication management
## 
[​](#debugging)
Debugging
When debugging your deployment:
 * Use the `claude /status` [slash command](/en/docs/claude-code/slash-commands). This command provides observability into any applied authentication, proxy, and URL settings.
 * Set environment variable `export ANTHROPIC_LOG=debug` to log requests.
## 
[​](#best-practices-for-organizations)
Best practices for organizations
### 
[​](#1-invest-in-documentation-and-memory)
1. Invest in documentation and memory
We strongly recommend investing in documentation so that Claude Code understands your codebase. Organizations can deploy CLAUDE.md files at multiple levels:
 * **Organization-wide** : Deploy to system directories like `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS) for company-wide standards
 * **Repository-level** : Create `CLAUDE.md` files in repository roots containing project architecture, build commands, and contribution guidelines. Check these into source control so all users benefit [Learn more](/en/docs/claude-code/memory).
### 
[​](#2-simplify-deployment)
2. Simplify deployment
If you have a custom development environment, we find that creating a “one click” way to install Claude Code is key to growing adoption across an organization.
### 
[​](#3-start-with-guided-usage)
3. Start with guided usage
Encourage new users to try Claude Code for codebase Q&A, or on smaller bug fixes or feature requests. Ask Claude Code to make a plan. Check Claude’s suggestions and give feedback if it’s off-track. Over time, as users understand this new paradigm better, then they’ll be more effective at letting Claude Code run more agentically.
### 
[​](#4-configure-security-policies)
4. Configure security policies
Security teams can configure managed permissions for what Claude Code is and is not allowed to do, which cannot be overwritten by local configuration. [Learn more](/en/docs/claude-code/security).
### 
[​](#5-leverage-mcp-for-integrations)
5. Leverage MCP for integrations
MCP is a great way to give Claude Code more information, such as connecting to ticket management systems or error logs. We recommend that one central team configures MCP servers and checks a `.mcp.json` configuration into the codebase so that all users benefit. [Learn more](/en/docs/claude-code/mcp). At Anthropic, we trust Claude Code to power development across every Anthropic codebase. We hope you enjoy using Claude Code as much as we do!
## 
[​](#next-steps)
Next steps
 * [Set up Amazon Bedrock](/en/docs/claude-code/amazon-bedrock) for AWS-native deployment
 * [Configure Google Vertex AI](/en/docs/claude-code/google-vertex-ai) for GCP deployment
 * [Configure Enterprise Network](/en/docs/claude-code/network-config) for network requirements
 * [Deploy LLM Gateway](/en/docs/claude-code/llm-gateway) for enterprise management
 * [Settings](/en/docs/claude-code/settings) for configuration options and environment variables
Was this page helpful?
YesNo
[Migrate to Claude Agent SDK](/en/docs/claude-code/sdk/migration-guide)[Amazon Bedrock](/en/docs/claude-code/amazon-bedrock)
Assistant
Responses are generated using AI and may contain mistakes.