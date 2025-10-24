Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Administration
Security
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
 * [How we approach security](#how-we-approach-security)
 * [Security foundation](#security-foundation)
 * [Permission-based architecture](#permission-based-architecture)
 * [Built-in protections](#built-in-protections)
 * [User responsibility](#user-responsibility)
 * [Protect against prompt injection](#protect-against-prompt-injection)
 * [Core protections](#core-protections)
 * [Privacy safeguards](#privacy-safeguards)
 * [Additional safeguards](#additional-safeguards)
 * [MCP security](#mcp-security)
 * [IDE security](#ide-security)
 * [Cloud execution security](#cloud-execution-security)
 * [Security best practices](#security-best-practices)
 * [Working with sensitive code](#working-with-sensitive-code)
 * [Team security](#team-security)
 * [Reporting security issues](#reporting-security-issues)
 * [Related resources](#related-resources)
## 
[​](#how-we-approach-security)
How we approach security
### 
[​](#security-foundation)
Security foundation
Your code’s security is paramount. Claude Code is built with security at its core, developed according to Anthropic’s comprehensive security program. Learn more and access resources (SOC 2 Type 2 report, ISO 27001 certificate, etc.) at [Anthropic Trust Center](https://trust.anthropic.com).
### 
[​](#permission-based-architecture)
Permission-based architecture
Claude Code uses strict read-only permissions by default. When additional actions are needed (editing files, running tests, executing commands), Claude Code requests explicit permission. Users control whether to approve actions once or allow them automatically. We designed Claude Code to be transparent and secure. For example, we require approval for bash commands before executing them, giving you direct control. This approach enables users and organizations to configure permissions directly. For detailed permission configuration, see [Identity and Access Management](/en/docs/claude-code/iam).
### 
[​](#built-in-protections)
Built-in protections
To mitigate risks in agentic systems:
 * **Sandboxed bash tool** : [Sandbox](/en/docs/claude-code/sandboxing) bash commands with filesystem and network isolation, reducing permission prompts while maintaining security. Enable with `/sandbox` to define boundaries where Claude Code can work autonomously
 * **Write access restriction** : Claude Code can only write to the folder where it was started and its subfolders—it cannot modify files in parent directories without explicit permission. While Claude Code can read files outside the working directory (useful for accessing system libraries and dependencies), write operations are strictly confined to the project scope, creating a clear security boundary
 * **Prompt fatigue mitigation** : Support for allowlisting frequently used safe commands per-user, per-codebase, or per-organization
 * **Accept Edits mode** : Batch accept multiple edits while maintaining permission prompts for commands with side effects
### 
[​](#user-responsibility)
User responsibility
Claude Code only has the permissions you grant it. You’re responsible for reviewing proposed code and commands for safety before approval.
## 
[​](#protect-against-prompt-injection)
Protect against prompt injection
Prompt injection is a technique where an attacker attempts to override or manipulate an AI assistant’s instructions by inserting malicious text. Claude Code includes several safeguards against these attacks:
### 
[​](#core-protections)
Core protections
 * **Permission system** : Sensitive operations require explicit approval
 * **Context-aware analysis** : Detects potentially harmful instructions by analyzing the full request
 * **Input sanitization** : Prevents command injection by processing user inputs
 * **Command blocklist** : Blocks risky commands that fetch arbitrary content from the web like `curl` and `wget` by default. When explicitly allowed, be aware of [permission pattern limitations](/en/docs/claude-code/iam#tool-specific-permission-rules)
### 
[​](#privacy-safeguards)
Privacy safeguards
We have implemented several safeguards to protect your data, including:
 * Limited retention periods for sensitive information (see the [Privacy Center](https://privacy.anthropic.com/en/articles/10023548-how-long-do-you-store-my-data) to learn more)
 * Restricted access to user session data
 * User control over data training preferences. Consumer users can change their [privacy settings](https://claude.ai/settings/privacy) at any time.
For full details, please review our [Commercial Terms of Service](https://www.anthropic.com/legal/commercial-terms) (for Team, Enterprise, and API users) or [Consumer Terms](https://www.anthropic.com/legal/consumer-terms) (for Free, Pro, and Max users) and [Privacy Policy](https://www.anthropic.com/legal/privacy).
### 
[​](#additional-safeguards)
Additional safeguards
 * **Network request approval** : Tools that make network requests require user approval by default
 * **Isolated context windows** : Web fetch uses a separate context window to avoid injecting potentially malicious prompts
 * **Trust verification** : First-time codebase runs and new MCP servers require trust verification
 * Note: Trust verification is disabled when running non-interactively with the `-p` flag
 * **Command injection detection** : Suspicious bash commands require manual approval even if previously allowlisted
 * **Fail-closed matching** : Unmatched commands default to requiring manual approval
 * **Natural language descriptions** : Complex bash commands include explanations for user understanding
 * **Secure credential storage** : API keys and tokens are encrypted. See [Credential Management](/en/docs/claude-code/iam#credential-management)
**Windows WebDAV security risk** : We recommend against enabling WebDAV when running Claude Code on Windows. [WebDAV has been deprecated by Microsoft](https://learn.microsoft.com/en-us/windows/whats-new/deprecated-features#:~:text=The%20Webclient%20\(WebDAV\)%20service%20is%20deprecated) due to security risks. Enabling WebDAV may allow Claude Code to trigger network requests to remote hosts, bypassing the permission system.
**Best practices for working with untrusted content** :
 1. Review suggested commands before approval
 2. Avoid piping untrusted content directly to Claude
 3. Verify proposed changes to critical files
 4. Use virtual machines (VMs) to run scripts and make tool calls, especially when interacting with external web services
 5. Report suspicious behavior with `/bug`
While these protections significantly reduce risk, no system is completely immune to all attacks. Always maintain good security practices when working with any AI tool.
## 
[​](#mcp-security)
MCP security
Claude Code allows users to configure Model Context Protocol (MCP) servers. The list of allowed MCP servers is configured in your source code, as part of Claude Code settings engineers check into source control. We encourage either writing your own MCP servers or using MCP servers from providers that you trust. You are able to configure Claude Code permissions for MCP servers. Anthropic does not manage or audit any MCP servers.
## 
[​](#ide-security)
IDE security
See [here](/en/docs/claude-code/ide-integrations#security) for more information on the security of running Claude Code in an IDE.
## 
[​](#cloud-execution-security)
Cloud execution security
When using [Claude Code on the web](/en/docs/claude-code/claude-code-on-the-web), additional security controls are in place:
 * **Isolated virtual machines** : Each cloud session runs in an isolated, Anthropic-managed VM
 * **Network access controls** : Network access is limited by default and can be configured to be disabled or allow only specific domains
 * **Credential protection** : Authentication is handled through a secure proxy that uses a scoped credential inside the sandbox, which is then translated to your actual GitHub authentication token
 * **Branch restrictions** : Git push operations are restricted to the current working branch
 * **Audit logging** : All operations in cloud environments are logged for compliance and audit purposes
 * **Automatic cleanup** : Cloud environments are automatically terminated after session completion
For more details on cloud execution, see [Claude Code on the web](/en/docs/claude-code/claude-code-on-the-web).
## 
[​](#security-best-practices)
Security best practices
### 
[​](#working-with-sensitive-code)
Working with sensitive code
 * Review all suggested changes before approval
 * Use project-specific permission settings for sensitive repositories
 * Consider using [devcontainers](/en/docs/claude-code/devcontainer) for additional isolation
 * Regularly audit your permission settings with `/permissions`
### 
[​](#team-security)
Team security
 * Use [enterprise managed policies](/en/docs/claude-code/iam#enterprise-managed-policy-settings) to enforce organizational standards
 * Share approved permission configurations through version control
 * Train team members on security best practices
 * Monitor Claude Code usage through [OpenTelemetry metrics](/en/docs/claude-code/monitoring-usage)
### 
[​](#reporting-security-issues)
Reporting security issues
If you discover a security vulnerability in Claude Code:
 1. Do not disclose it publicly
 2. Report it through our [HackerOne program](https://hackerone.com/anthropic-vdp/reports/new?type=team&report_type=vulnerability)
 3. Include detailed reproduction steps
 4. Allow time for us to address the issue before public disclosure
## 
[​](#related-resources)
Related resources
 * [Sandboxing](/en/docs/claude-code/sandboxing) - Filesystem and network isolation for bash commands
 * [Identity and Access Management](/en/docs/claude-code/iam) - Configure permissions and access controls
 * [Monitoring usage](/en/docs/claude-code/monitoring-usage) - Track and audit Claude Code activity
 * [Development containers](/en/docs/claude-code/devcontainer) - Secure, isolated environments
 * [Anthropic Trust Center](https://trust.anthropic.com) - Security certifications and compliance
Was this page helpful?
YesNo
[Identity and Access Management](/en/docs/claude-code/iam)[Data usage](/en/docs/claude-code/data-usage)
Assistant
Responses are generated using AI and may contain mistakes.