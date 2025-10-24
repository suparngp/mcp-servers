Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Deployment
Development containers
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
 * [Key features](#key-features)
 * [Getting started in 4 steps](#getting-started-in-4-steps)
 * [Configuration breakdown](#configuration-breakdown)
 * [Security features](#security-features)
 * [Customization options](#customization-options)
 * [Example use cases](#example-use-cases)
 * [Secure client work](#secure-client-work)
 * [Team onboarding](#team-onboarding)
 * [Consistent CI/CD environments](#consistent-ci%2Fcd-environments)
 * [Related resources](#related-resources)
The reference [devcontainer setup](https://github.com/anthropics/claude-code/tree/main/.devcontainer) and associated [Dockerfile](https://github.com/anthropics/claude-code/blob/main/.devcontainer/Dockerfile) offer a preconfigured development container that you can use as is, or customize for your needs. This devcontainer works with the Visual Studio Code [Dev Containers extension](https://code.visualstudio.com/docs/devcontainers/containers) and similar tools. The container’s enhanced security measures (isolation and firewall rules) allow you to run `claude --dangerously-skip-permissions` to bypass permission prompts for unattended operation.
While the devcontainer provides substantial protections, no system is completely immune to all attacks. When executed with `--dangerously-skip-permissions`, devcontainers do not prevent a malicious project from exfiltrating anything accessible in the devcontainer including Claude Code credentials. We recommend only using devcontainers when developing with trusted repositories. Always maintain good security practices and monitor Claude’s activities.
## 
[​](#key-features)
Key features
 * **Production-ready Node.js** : Built on Node.js 20 with essential development dependencies
 * **Security by design** : Custom firewall restricting network access to only necessary services
 * **Developer-friendly tools** : Includes git, ZSH with productivity enhancements, fzf, and more
 * **Seamless VS Code integration** : Pre-configured extensions and optimized settings
 * **Session persistence** : Preserves command history and configurations between container restarts
 * **Works everywhere** : Compatible with macOS, Windows, and Linux development environments
## 
[​](#getting-started-in-4-steps)
Getting started in 4 steps
 1. Install VS Code and the Remote - Containers extension
 2. Clone the [Claude Code reference implementation](https://github.com/anthropics/claude-code/tree/main/.devcontainer) repository
 3. Open the repository in VS Code
 4. When prompted, click “Reopen in Container” (or use Command Palette: Cmd+Shift+P → “Remote-Containers: Reopen in Container”)
## 
[​](#configuration-breakdown)
Configuration breakdown
The devcontainer setup consists of three primary components:
 * [**devcontainer.json**](https://github.com/anthropics/claude-code/blob/main/.devcontainer/devcontainer.json): Controls container settings, extensions, and volume mounts
 * [**Dockerfile**](https://github.com/anthropics/claude-code/blob/main/.devcontainer/Dockerfile): Defines the container image and installed tools
 * [**init-firewall.sh**](https://github.com/anthropics/claude-code/blob/main/.devcontainer/init-firewall.sh): Establishes network security rules
## 
[​](#security-features)
Security features
The container implements a multi-layered security approach with its firewall configuration:
 * **Precise access control** : Restricts outbound connections to whitelisted domains only (npm registry, GitHub, Claude API, etc.)
 * **Allowed outbound connections** : The firewall permits outbound DNS and SSH connections
 * **Default-deny policy** : Blocks all other external network access
 * **Startup verification** : Validates firewall rules when the container initializes
 * **Isolation** : Creates a secure development environment separated from your main system
## 
[​](#customization-options)
Customization options
The devcontainer configuration is designed to be adaptable to your needs:
 * Add or remove VS Code extensions based on your workflow
 * Modify resource allocations for different hardware environments
 * Adjust network access permissions
 * Customize shell configurations and developer tooling
## 
[​](#example-use-cases)
Example use cases
### 
[​](#secure-client-work)
Secure client work
Use devcontainers to isolate different client projects, ensuring code and credentials never mix between environments.
### 
[​](#team-onboarding)
Team onboarding
New team members can get a fully configured development environment in minutes, with all necessary tools and settings pre-installed.
### 
[​](#consistent-ci%2Fcd-environments)
Consistent CI/CD environments
Mirror your devcontainer configuration in CI/CD pipelines to ensure development and production environments match.
## 
[​](#related-resources)
Related resources
 * [VS Code devcontainers documentation](https://code.visualstudio.com/docs/devcontainers/containers)
 * [Claude Code security best practices](/en/docs/claude-code/security)
 * [Enterprise network configuration](/en/docs/claude-code/network-config)
Was this page helpful?
YesNo
[LLM gateway](/en/docs/claude-code/llm-gateway)[Sandboxing](/en/docs/claude-code/sandboxing)
Assistant
Responses are generated using AI and may contain mistakes.