Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Administration
Analytics
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
 * [Access analytics](#access-analytics)
 * [Required roles](#required-roles)
 * [Available metrics](#available-metrics)
 * [Lines of code accepted](#lines-of-code-accepted)
 * [Suggestion accept rate](#suggestion-accept-rate)
 * [Activity](#activity)
 * [Spend](#spend)
 * [Team insights](#team-insights)
 * [Using analytics effectively](#using-analytics-effectively)
 * [Monitor adoption](#monitor-adoption)
 * [Measure productivity](#measure-productivity)
 * [Related resources](#related-resources)
Claude Code provides an analytics dashboard that helps organizations understand developer usage patterns, track productivity metrics, and optimize their Claude Code adoption.
Analytics are currently available only for organizations using Claude Code with the Claude API through the Claude Console.
## 
[​](#access-analytics)
Access analytics
Navigate to the analytics dashboard at [console.anthropic.com/claude-code](https://console.anthropic.com/claude-code).
### 
[​](#required-roles)
Required roles
 * **Primary Owner**
 * **Owner**
 * **Billing**
 * **Admin**
 * **Developer**
Users with **User** , **Claude Code User** or **Membership Admin** roles cannot access analytics.
## 
[​](#available-metrics)
Available metrics
### 
[​](#lines-of-code-accepted)
Lines of code accepted
Total lines of code written by Claude Code that users have accepted in their sessions.
 * Excludes rejected code suggestions
 * Doesn’t track subsequent deletions
### 
[​](#suggestion-accept-rate)
Suggestion accept rate
Percentage of times users accept code editing tool usage, including:
 * Edit
 * Write
 * NotebookEdit
### 
[​](#activity)
Activity
**users** : Number of active users in a given day (number on left Y-axis) **sessions** : Number of active sessions in a given day (number on right Y-axis)
### 
[​](#spend)
Spend
**users** : Number of active users in a given day (number on left Y-axis) **spend** : Total dollars spent in a given day (number on right Y-axis)
### 
[​](#team-insights)
Team insights
**Members** : All users who have authenticated to Claude Code
 * API key users are displayed by **API key identifier**
 * OAuth users are displayed by **email address**
**Spend this month:** Per-user total spend for the current month. **Lines this month:** Per-user total of accepted code lines for the current month.
## 
[​](#using-analytics-effectively)
Using analytics effectively
### 
[​](#monitor-adoption)
Monitor adoption
Track team member status to identify:
 * Active users who can share best practices
 * Overall adoption trends across your organization
### 
[​](#measure-productivity)
Measure productivity
Tool acceptance rates and code metrics help you:
 * Understand developer satisfaction with Claude Code suggestions
 * Track code generation effectiveness
 * Identify opportunities for training or process improvements
## 
[​](#related-resources)
Related resources
 * [Monitoring usage with OpenTelemetry](/en/docs/claude-code/monitoring-usage) for custom metrics and alerting
 * [Identity and access management](/en/docs/claude-code/iam) for role configuration
Was this page helpful?
YesNo
[Costs](/en/docs/claude-code/costs)[Plugin marketplaces](/en/docs/claude-code/plugin-marketplaces)
Assistant
Responses are generated using AI and may contain mistakes.