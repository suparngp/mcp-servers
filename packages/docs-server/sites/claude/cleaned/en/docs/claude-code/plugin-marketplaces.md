[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Administration
Plugin marketplaces
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
 * [Overview](#overview)
 * [Prerequisites](#prerequisites)
 * [Add and use marketplaces](#add-and-use-marketplaces)
 * [Add GitHub marketplaces](#add-github-marketplaces)
 * [Add Git repositories](#add-git-repositories)
 * [Add local marketplaces for development](#add-local-marketplaces-for-development)
 * [Install plugins from marketplaces](#install-plugins-from-marketplaces)
 * [Verify marketplace installation](#verify-marketplace-installation)
 * [Configure team marketplaces](#configure-team-marketplaces)
 * [Create your own marketplace](#create-your-own-marketplace)
 * [Prerequisites for marketplace creation](#prerequisites-for-marketplace-creation)
 * [Create the marketplace file](#create-the-marketplace-file)
 * [Marketplace schema](#marketplace-schema)
 * [Required fields](#required-fields)
 * [Optional metadata](#optional-metadata)
 * [Plugin entries](#plugin-entries)
 * [Optional plugin fields](#optional-plugin-fields)
 * [Plugin sources](#plugin-sources)
 * [Relative paths](#relative-paths)
 * [GitHub repositories](#github-repositories)
 * [Git repositories](#git-repositories)
 * [Advanced plugin entries](#advanced-plugin-entries)
 * [Host and distribute marketplaces](#host-and-distribute-marketplaces)
 * [Host on GitHub (recommended)](#host-on-github-recommended)
 * [Host on other git services](#host-on-other-git-services)
 * [Use local marketplaces for development](#use-local-marketplaces-for-development)
 * [Manage marketplace operations](#manage-marketplace-operations)
 * [List known marketplaces](#list-known-marketplaces)
 * [Update marketplace metadata](#update-marketplace-metadata)
 * [Remove a marketplace](#remove-a-marketplace)
 * [Troubleshooting marketplaces](#troubleshooting-marketplaces)
 * [Common marketplace issues](#common-marketplace-issues)
 * [Marketplace not loading](#marketplace-not-loading)
 * [Plugin installation failures](#plugin-installation-failures)
 * [Validation and testing](#validation-and-testing)
 * [Next steps](#next-steps)
 * [For marketplace users](#for-marketplace-users)
 * [For marketplace creators](#for-marketplace-creators)
 * [For organizations](#for-organizations)
 * [See also](#see-also)
Plugin marketplaces are catalogs of available plugins that make it easy to discover, install, and manage Claude Code extensions. This guide shows you how to use existing marketplaces and create your own for team distribution.
## 
[​](#overview)
Overview
A marketplace is a JSON file that lists available plugins and describes where to find them. Marketplaces provide:
 * **Centralized discovery** : Browse plugins from multiple sources in one place
 * **Version management** : Track and update plugin versions automatically
 * **Team distribution** : Share required plugins across your organization
 * **Flexible sources** : Support for git repositories, GitHub repos, local paths, and package managers
### 
[​](#prerequisites)
Prerequisites
 * Claude Code installed and running
 * Basic familiarity with JSON file format
 * For creating marketplaces: Git repository or local development environment
## 
[​](#add-and-use-marketplaces)
Add and use marketplaces
Add marketplaces using the `/plugin marketplace` commands to access plugins from different sources:
### 
[​](#add-github-marketplaces)
Add GitHub marketplaces
Add a GitHub repository containing .claude-plugin/marketplace.json
Copy
```
/plugin marketplace add owner/repo
```
### 
[​](#add-git-repositories)
Add Git repositories
Add any git repository
Copy
```
/plugin marketplace add https://gitlab.com/company/plugins.git
```
### 
[​](#add-local-marketplaces-for-development)
Add local marketplaces for development
Add local directory containing .claude-plugin/marketplace.json
Copy
```
/plugin marketplace add ./my-marketplace
```
Add direct path to marketplace.json file
Copy
```
/plugin marketplace add ./path/to/marketplace.json
```
Add remote marketplace.json via URL
Copy
```
/plugin marketplace add https://url.of/marketplace.json
```
### 
[​](#install-plugins-from-marketplaces)
Install plugins from marketplaces
Once you’ve added marketplaces, install plugins directly:
Install from any known marketplace
Copy
```
/plugin install plugin-name@marketplace-name
```
Browse available plugins interactively
Copy
```
/plugin
```
### 
[​](#verify-marketplace-installation)
Verify marketplace installation
After adding a marketplace:
 1. **List marketplaces** : Run `/plugin marketplace list` to confirm it’s added
 2. **Browse plugins** : Use `/plugin` to see available plugins from your marketplace
 3. **Test installation** : Try installing a plugin to verify the marketplace works correctly
## 
[​](#configure-team-marketplaces)
Configure team marketplaces
Set up automatic marketplace installation for team projects by specifying required marketplaces in `.claude/settings.json`:
Copy
```
{
 "extraKnownMarketplaces": {
 "team-tools": {
 "source": {
 "source": "github",
 "repo": "your-org/claude-plugins"
 }
 },
 "project-specific": {
 "source": {
 "source": "git",
 "url": "https://git.company.com/project-plugins.git"
 }
 }
 }
}
```
When team members trust the repository folder, Claude Code automatically installs these marketplaces and any plugins specified in the `enabledPlugins` field.
* * *
## 
[​](#create-your-own-marketplace)
Create your own marketplace
Build and distribute custom plugin collections for your team or community.
### 
[​](#prerequisites-for-marketplace-creation)
Prerequisites for marketplace creation
 * Git repository (GitHub, GitLab, or other git hosting)
 * Understanding of JSON file format
 * One or more plugins to distribute
### 
[​](#create-the-marketplace-file)
Create the marketplace file
Create `.claude-plugin/marketplace.json` in your repository root:
Copy
```
{
 "name": "company-tools",
 "owner": {
 "name": "DevTools Team",
 "email": "[email protected][](/cdn-cgi/l/email-protection)"
 },
 "plugins": [
 {
 "name": "code-formatter",
 "source": "./plugins/formatter",
 "description": "Automatic code formatting on save",
 "version": "2.1.0",
 "author": {
 "name": "DevTools Team"
 }
 },
 {
 "name": "deployment-tools",
 "source": {
 "source": "github",
 "repo": "company/deploy-plugin"
 },
 "description": "Deployment automation tools"
 }
 ]
}
```
### 
[​](#marketplace-schema)
Marketplace schema
#### 
[​](#required-fields)
Required fields
Field | Type | Description 
---|---|--- 
`name` | string | Marketplace identifier (kebab-case, no spaces) 
`owner` | object | Marketplace maintainer information 
`plugins` | array | List of available plugins 
#### 
[​](#optional-metadata)
Optional metadata
Field | Type | Description 
---|---|--- 
`metadata.description` | string | Brief marketplace description 
`metadata.version` | string | Marketplace version 
`metadata.pluginRoot` | string | Base path for relative plugin sources 
### 
[​](#plugin-entries)
Plugin entries
Plugin entries are based on the _plugin manifest schema_ (with all fields made optional) plus marketplace-specific fields (`source`, `category`, `tags`, `strict`), with `name` being required.
**Required fields:** Field | Type | Description 
---|---|--- 
`name` | string | Plugin identifier (kebab-case, no spaces) 
`source` | string|object | Where to fetch the plugin from 
#### 
[​](#optional-plugin-fields)
Optional plugin fields
**Standard metadata fields:** Field | Type | Description 
---|---|--- 
`description` | string | Brief plugin description 
`version` | string | Plugin version 
`author` | object | Plugin author information 
`homepage` | string | Plugin homepage or documentation URL 
`repository` | string | Source code repository URL 
`license` | string | SPDX license identifier (e.g., MIT, Apache-2.0) 
`keywords` | array | Tags for plugin discovery and categorization 
`category` | string | Plugin category for organization 
`tags` | array | Tags for searchability 
`strict` | boolean | Require plugin.json in plugin folder (default: true) 1 
**Component configuration fields:** Field | Type | Description 
---|---|--- 
`commands` | string|array | Custom paths to command files or directories 
`agents` | string|array | Custom paths to agent files 
`hooks` | string|object | Custom hooks configuration or path to hooks file 
`mcpServers` | string|object | MCP server configurations or path to MCP config 
_1 - When`strict: true` (default), the plugin must include a `plugin.json` manifest file, and marketplace fields supplement those values. When `strict: false`, the plugin.json is optional. If it’s missing, the marketplace entry serves as the complete plugin manifest._
### 
[​](#plugin-sources)
Plugin sources
#### 
[​](#relative-paths)
Relative paths
For plugins in the same repository:
Copy
```
{
 "name": "my-plugin",
 "source": "./plugins/my-plugin"
}
```
#### 
[​](#github-repositories)
GitHub repositories
Copy
```
{
 "name": "github-plugin",
 "source": {
 "source": "github",
 "repo": "owner/plugin-repo"
 }
}
```
#### 
[​](#git-repositories)
Git repositories
Copy
```
{
 "name": "git-plugin",
 "source": {
 "source": "url",
 "url": "https://gitlab.com/team/plugin.git"
 }
}
```
#### 
[​](#advanced-plugin-entries)
Advanced plugin entries
Plugin entries can override default component locations and provide additional metadata. Note that `${CLAUDE_PLUGIN_ROOT}` is an environment variable that resolves to the plugin’s installation directory (for details see [Environment variables](/en/docs/claude-code/plugins-reference#environment-variables)):
Copy
```
{
 "name": "enterprise-tools",
 "source": {
 "source": "github",
 "repo": "company/enterprise-plugin"
 },
 "description": "Enterprise workflow automation tools",
 "version": "2.1.0",
 "author": {
 "name": "Enterprise Team",
 "email": "[email protected][](/cdn-cgi/l/email-protection)"
 },
 "homepage": "https://docs.company.com/plugins/enterprise-tools",
 "repository": "https://github.com/company/enterprise-plugin",
 "license": "MIT",
 "keywords": ["enterprise", "workflow", "automation"],
 "category": "productivity",
 "commands": [
 "./commands/core/",
 "./commands/enterprise/",
 "./commands/experimental/preview.md"
 ],
 "agents": [
 "./agents/security-reviewer.md",
 "./agents/compliance-checker.md"
 ],
 "hooks": {
 "PostToolUse": [
 {
 "matcher": "Write|Edit",
 "hooks": [{"type": "command", "command": "${CLAUDE_PLUGIN_ROOT}/scripts/validate.sh"}]
 }
 ]
 },
 "mcpServers": {
 "enterprise-db": {
 "command": "${CLAUDE_PLUGIN_ROOT}/servers/db-server",
 "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"]
 }
 },
 "strict": false
}
```
**Schema relationship** : Plugin entries use the plugin manifest schema with all fields made optional, plus marketplace-specific fields (`source`, `strict`, `category`, `tags`). This means any field valid in a `plugin.json` file can also be used in a marketplace entry. When `strict: false`, the marketplace entry serves as the complete plugin manifest if no `plugin.json` exists. When `strict: true` (default), marketplace fields supplement the plugin’s own manifest file.
* * *
## 
[​](#host-and-distribute-marketplaces)
Host and distribute marketplaces
Choose the best hosting strategy for your plugin distribution needs.
### 
[​](#host-on-github-recommended)
Host on GitHub (recommended)
GitHub provides the easiest distribution method:
 1. **Create a repository** : Set up a new repository for your marketplace
 2. **Add marketplace file** : Create `.claude-plugin/marketplace.json` with your plugin definitions
 3. **Share with teams** : Team members add with `/plugin marketplace add owner/repo`
**Benefits** : Built-in version control, issue tracking, and team collaboration features.
### 
[​](#host-on-other-git-services)
Host on other git services
Any git hosting service works for marketplace distribution, using a URL to an arbitrary git repository. For example, using GitLab:
Copy
```
/plugin marketplace add https://gitlab.com/company/plugins.git
```
### 
[​](#use-local-marketplaces-for-development)
Use local marketplaces for development
Test your marketplace locally before distribution:
Add local marketplace for testing
Copy
```
/plugin marketplace add ./my-local-marketplace
```
Test plugin installation
Copy
```
/plugin install test-plugin@my-local-marketplace
```
## 
[​](#manage-marketplace-operations)
Manage marketplace operations
### 
[​](#list-known-marketplaces)
List known marketplaces
List all configured marketplaces
Copy
```
/plugin marketplace list
```
Shows all configured marketplaces with their sources and status.
### 
[​](#update-marketplace-metadata)
Update marketplace metadata
Refresh marketplace metadata
Copy
```
/plugin marketplace update marketplace-name
```
Refreshes plugin listings and metadata from the marketplace source.
### 
[​](#remove-a-marketplace)
Remove a marketplace
Remove a marketplace
Copy
```
/plugin marketplace remove marketplace-name
```
Removes the marketplace from your configuration.
Removing a marketplace will uninstall any plugins you installed from it.
* * *
## 
[​](#troubleshooting-marketplaces)
Troubleshooting marketplaces
### 
[​](#common-marketplace-issues)
Common marketplace issues
#### 
[​](#marketplace-not-loading)
Marketplace not loading
**Symptoms** : Can’t add marketplace or see plugins from it **Solutions** :
 * Verify the marketplace URL is accessible
 * Check that `.claude-plugin/marketplace.json` exists at the specified path
 * Ensure JSON syntax is valid using `claude plugin validate`
 * For private repositories, confirm you have access permissions
#### 
[​](#plugin-installation-failures)
Plugin installation failures
**Symptoms** : Marketplace appears but plugin installation fails **Solutions** :
 * Verify plugin source URLs are accessible
 * Check that plugin directories contain required files
 * For GitHub sources, ensure repositories are public or you have access
 * Test plugin sources manually by cloning/downloading
### 
[​](#validation-and-testing)
Validation and testing
Test your marketplace before sharing:
Validate marketplace JSON syntax
Copy
```
claude plugin validate .
```
Add marketplace for testing
Copy
```
/plugin marketplace add ./path/to/marketplace
```
Install test plugin
Copy
```
/plugin install test-plugin@marketplace-name
```
For complete plugin testing workflows, see [Test your plugins locally](/en/docs/claude-code/plugins#test-your-plugins-locally). For technical troubleshooting, see [Plugins reference](/en/docs/claude-code/plugins-reference).
* * *
## 
[​](#next-steps)
Next steps
### 
[​](#for-marketplace-users)
For marketplace users
 * **Discover community marketplaces** : Search GitHub for Claude Code plugin collections
 * **Contribute feedback** : Report issues and suggest improvements to marketplace maintainers
 * **Share useful marketplaces** : Help your team discover valuable plugin collections
### 
[​](#for-marketplace-creators)
For marketplace creators
 * **Build plugin collections** : Create themed marketplace around specific use cases
 * **Establish versioning** : Implement clear versioning and update policies
 * **Community engagement** : Gather feedback and maintain active marketplace communities
 * **Documentation** : Provide clear README files explaining your marketplace contents
### 
[​](#for-organizations)
For organizations
 * **Private marketplaces** : Set up internal marketplaces for proprietary tools
 * **Governance policies** : Establish guidelines for plugin approval and security review
 * **Training resources** : Help teams discover and adopt useful plugins effectively
## 
[​](#see-also)
See also
 * [Plugins](/en/docs/claude-code/plugins) - Installing and using plugins
 * [Plugins reference](/en/docs/claude-code/plugins-reference) - Complete technical specifications and schemas
 * [Plugin development](/en/docs/claude-code/plugins#develop-more-complex-plugins) - Creating your own plugins
 * [Settings](/en/docs/claude-code/settings#plugin-configuration) - Plugin configuration options
Was this page helpful?
YesNo
[Analytics](/en/docs/claude-code/analytics)[Settings](/en/docs/claude-code/settings)
Assistant
Responses are generated using AI and may contain mistakes.