Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Build with Claude Code
Plugins
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
 * [Quickstart](#quickstart)
 * [Prerequisites](#prerequisites)
 * [Create your first plugin](#create-your-first-plugin)
 * [Plugin structure overview](#plugin-structure-overview)
 * [Install and manage plugins](#install-and-manage-plugins)
 * [Prerequisites](#prerequisites-2)
 * [Add marketplaces](#add-marketplaces)
 * [Install plugins](#install-plugins)
 * [Via interactive menu (recommended for discovery)](#via-interactive-menu-recommended-for-discovery)
 * [Via direct commands (for quick installation)](#via-direct-commands-for-quick-installation)
 * [Verify installation](#verify-installation)
 * [Set up team plugin workflows](#set-up-team-plugin-workflows)
 * [Develop more complex plugins](#develop-more-complex-plugins)
 * [Add Skills to your plugin](#add-skills-to-your-plugin)
 * [Organize complex plugins](#organize-complex-plugins)
 * [Test your plugins locally](#test-your-plugins-locally)
 * [Debug plugin issues](#debug-plugin-issues)
 * [Share your plugins](#share-your-plugins)
 * [Next steps](#next-steps)
 * [For plugin users](#for-plugin-users)
 * [For plugin developers](#for-plugin-developers)
 * [For team leads and administrators](#for-team-leads-and-administrators)
 * [See also](#see-also)
For complete technical specifications and schemas, see [Plugins reference](/en/docs/claude-code/plugins-reference). For marketplace management, see [Plugin marketplaces](/en/docs/claude-code/plugin-marketplaces).
Plugins let you extend Claude Code with custom functionality that can be shared across projects and teams. Install plugins from [marketplaces](/en/docs/claude-code/plugin-marketplaces) to add pre-built commands, agents, hooks, Skills, and MCP servers, or create your own to automate your workflows.
## 
[​](#quickstart)
Quickstart
Let’s create a simple greeting plugin to get you familiar with the plugin system. We’ll build a working plugin that adds a custom command, test it locally, and understand the core concepts.
### 
[​](#prerequisites)
Prerequisites
 * Claude Code installed on your machine
 * Basic familiarity with command-line tools
### 
[​](#create-your-first-plugin)
Create your first plugin
1
Create the marketplace structure
Copy
```
mkdir test-marketplace
cd test-marketplace
```
2
Create the plugin directory
Copy
```
mkdir my-first-plugin
cd my-first-plugin
```
3
Create the plugin manifest
Create .claude-plugin/plugin.json
Copy
```
mkdir .claude-plugin
cat > .claude-plugin/plugin.json << 'EOF'
{
"name": "my-first-plugin",
"description": "A simple greeting plugin to learn the basics",
"version": "1.0.0",
"author": {
"name": "Your Name"
}
}
EOF
```
4
Add a custom command
Create commands/hello.md
Copy
```
mkdir commands
cat > commands/hello.md << 'EOF'
---
description: Greet the user with a personalized message
---
# Hello Command
Greet the user warmly and ask how you can help them today. Make the greeting personal and encouraging.
EOF
```
5
Create the marketplace manifest
Create marketplace.json
Copy
```
cd ..
mkdir .claude-plugin
cat > .claude-plugin/marketplace.json << 'EOF'
{
"name": "test-marketplace",
"owner": {
"name": "Test User"
},
"plugins": [
{
 "name": "my-first-plugin",
 "source": "./my-first-plugin",
 "description": "My first test plugin"
}
]
}
EOF
```
6
Install and test your plugin
Start Claude Code from parent directory
Copy
```
cd ..
claude
```
Add the test marketplace
Copy
```
/plugin marketplace add ./test-marketplace
```
Install your plugin
Copy
```
/plugin install my-first-plugin@test-marketplace
```
Select “Install now”. You’ll then need to restart Claude Code in order to use the new plugin.
Try your new command
Copy
```
/hello
```
You’ll see Claude use your greeting command! Check `/help` to see your new command listed.
You’ve successfully created and tested a plugin with these key components:
 * **Plugin manifest** (`.claude-plugin/plugin.json`) - Describes your plugin’s metadata
 * **Commands directory** (`commands/`) - Contains your custom slash commands
 * **Test marketplace** - Allows you to test your plugin locally
### 
[​](#plugin-structure-overview)
Plugin structure overview
Your plugin follows this basic structure:
Copy
```
my-first-plugin/
├── .claude-plugin/
│ └── plugin.json # Plugin metadata
├── commands/ # Custom slash commands (optional)
│ └── hello.md
├── agents/ # Custom agents (optional)
│ └── helper.md
├── skills/ # Agent Skills (optional)
│ └── my-skill/
│ └── SKILL.md
└── hooks/ # Event handlers (optional)
 └── hooks.json
```
**Additional components you can add:**
 * **Commands** : Create markdown files in `commands/` directory
 * **Agents** : Create agent definitions in `agents/` directory
 * **Skills** : Create `SKILL.md` files in `skills/` directory
 * **Hooks** : Create `hooks/hooks.json` for event handling
 * **MCP servers** : Create `.mcp.json` for external tool integration
**Next steps** : Ready to add more features? Jump to [Develop more complex plugins](#develop-more-complex-plugins) to add agents, hooks, and MCP servers. For complete technical specifications of all plugin components, see [Plugins reference](/en/docs/claude-code/plugins-reference).
* * *
## 
[​](#install-and-manage-plugins)
Install and manage plugins
Learn how to discover, install, and manage plugins to extend your Claude Code capabilities.
### 
[​](#prerequisites-2)
Prerequisites
 * Claude Code installed and running
 * Basic familiarity with command-line interfaces
### 
[​](#add-marketplaces)
Add marketplaces
Marketplaces are catalogs of available plugins. Add them to discover and install plugins:
Add a marketplace
Copy
```
/plugin marketplace add your-org/claude-plugins
```
Browse available plugins
Copy
```
/plugin
```
For detailed marketplace management including Git repositories, local development, and team distribution, see [Plugin marketplaces](/en/docs/claude-code/plugin-marketplaces).
### 
[​](#install-plugins)
Install plugins
#### 
[​](#via-interactive-menu-recommended-for-discovery)
Via interactive menu (recommended for discovery)
Open the plugin management interface
Copy
```
/plugin
```
Select “Browse Plugins” to see available options with descriptions, features, and installation options.
#### 
[​](#via-direct-commands-for-quick-installation)
Via direct commands (for quick installation)
Install a specific plugin
Copy
```
/plugin install formatter@your-org
```
Enable a disabled plugin
Copy
```
/plugin enable plugin-name@marketplace-name
```
Disable without uninstalling
Copy
```
/plugin disable plugin-name@marketplace-name
```
Completely remove a plugin
Copy
```
/plugin uninstall plugin-name@marketplace-name
```
### 
[​](#verify-installation)
Verify installation
After installing a plugin:
 1. **Check available commands** : Run `/help` to see new commands
 2. **Test plugin features** : Try the plugin’s commands and features
 3. **Review plugin details** : Use `/plugin` → “Manage Plugins” to see what the plugin provides
## 
[​](#set-up-team-plugin-workflows)
Set up team plugin workflows
Configure plugins at the repository level to ensure consistent tooling across your team. When team members trust your repository folder, Claude Code automatically installs specified marketplaces and plugins. **To set up team plugins:**
 1. Add marketplace and plugin configuration to your repository’s `.claude/settings.json`
 2. Team members trust the repository folder
 3. Plugins install automatically for all team members
For complete instructions including configuration examples, marketplace setup, and rollout best practices, see [Configure team marketplaces](/en/docs/claude-code/plugin-marketplaces#how-to-configure-team-marketplaces).
* * *
## 
[​](#develop-more-complex-plugins)
Develop more complex plugins
Once you’re comfortable with basic plugins, you can create more sophisticated extensions.
### 
[​](#add-skills-to-your-plugin)
Add Skills to your plugin
Plugins can include [Agent Skills](/en/docs/claude-code/skills) to extend Claude’s capabilities. Skills are model-invoked—Claude autonomously uses them based on the task context. To add Skills to your plugin, create a `skills/` directory at your plugin root and add Skill folders with `SKILL.md` files. Plugin Skills are automatically available when the plugin is installed. For complete Skill authoring guidance, see [Agent Skills](/en/docs/claude-code/skills).
### 
[​](#organize-complex-plugins)
Organize complex plugins
For plugins with many components, organize your directory structure by functionality. For complete directory layouts and organization patterns, see [Plugin directory structure](/en/docs/claude-code/plugins-reference#plugin-directory-structure).
### 
[​](#test-your-plugins-locally)
Test your plugins locally
When developing plugins, use a local marketplace to test changes iteratively. This workflow builds on the quickstart pattern and works for plugins of any complexity.
1
Set up your development structure
Organize your plugin and marketplace for testing:
Create directory structure
Copy
```
mkdir dev-marketplace
cd dev-marketplace
mkdir my-plugin
```
This creates:
Copy
```
dev-marketplace/
├── .claude-plugin/marketplace.json (you'll create this)
└── my-plugin/ (your plugin under development)
 ├── .claude-plugin/plugin.json
 ├── commands/
 ├── agents/
 └── hooks/
```
2
Create the marketplace manifest
Create marketplace.json
Copy
```
mkdir .claude-plugin
cat > .claude-plugin/marketplace.json << 'EOF'
{
"name": "dev-marketplace",
"owner": {
"name": "Developer"
},
"plugins": [
{
 "name": "my-plugin",
 "source": "./my-plugin",
 "description": "Plugin under development"
}
]
}
EOF
```
3
Install and test
Start Claude Code from parent directory
Copy
```
cd ..
claude
```
Add your development marketplace
Copy
```
/plugin marketplace add ./dev-marketplace
```
Install your plugin
Copy
```
/plugin install my-plugin@dev-marketplace
```
Test your plugin components:
 * Try your commands with `/command-name`
 * Check that agents appear in `/agents`
 * Verify hooks work as expected
4
Iterate on your plugin
After making changes to your plugin code:
Uninstall the current version
Copy
```
/plugin uninstall my-plugin@dev-marketplace
```
Reinstall to test changes
Copy
```
/plugin install my-plugin@dev-marketplace
```
Repeat this cycle as you develop and refine your plugin.
**For multiple plugins** : Organize plugins in subdirectories like `./plugins/plugin-name` and update your marketplace.json accordingly. See [Plugin sources](/en/docs/claude-code/plugin-marketplaces#plugin-sources) for organization patterns.
### 
[​](#debug-plugin-issues)
Debug plugin issues
If your plugin isn’t working as expected:
 1. **Check the structure** : Ensure your directories are at the plugin root, not inside `.claude-plugin/`
 2. **Test components individually** : Check each command, agent, and hook separately
 3. **Use validation and debugging tools** : See [Debugging and development tools](/en/docs/claude-code/plugins-reference#debugging-and-development-tools) for CLI commands and troubleshooting techniques
### 
[​](#share-your-plugins)
Share your plugins
When your plugin is ready to share:
 1. **Add documentation** : Include a README.md with installation and usage instructions
 2. **Version your plugin** : Use semantic versioning in your `plugin.json`
 3. **Create or use a marketplace** : Distribute through plugin marketplaces for easy installation
 4. **Test with others** : Have team members test the plugin before wider distribution
For complete technical specifications, debugging techniques, and distribution strategies, see [Plugins reference](/en/docs/claude-code/plugins-reference).
* * *
## 
[​](#next-steps)
Next steps
Now that you understand Claude Code’s plugin system, here are suggested paths for different goals:
### 
[​](#for-plugin-users)
For plugin users
 * **Discover plugins** : Browse community marketplaces for useful tools
 * **Team adoption** : Set up repository-level plugins for your projects
 * **Marketplace management** : Learn to manage multiple plugin sources
 * **Advanced usage** : Explore plugin combinations and workflows
### 
[​](#for-plugin-developers)
For plugin developers
 * **Create your first marketplace** : [Plugin marketplaces guide](/en/docs/claude-code/plugin-marketplaces)
 * **Advanced components** : Dive deeper into specific plugin components:
 * [Slash commands](/en/docs/claude-code/slash-commands) - Command development details
 * [Subagents](/en/docs/claude-code/sub-agents) - Agent configuration and capabilities
 * [Agent Skills](/en/docs/claude-code/skills) - Extend Claude’s capabilities
 * [Hooks](/en/docs/claude-code/hooks) - Event handling and automation
 * [MCP](/en/docs/claude-code/mcp) - External tool integration
 * **Distribution strategies** : Package and share your plugins effectively
 * **Community contribution** : Consider contributing to community plugin collections
### 
[​](#for-team-leads-and-administrators)
For team leads and administrators
 * **Repository configuration** : Set up automatic plugin installation for team projects
 * **Plugin governance** : Establish guidelines for plugin approval and security review
 * **Marketplace maintenance** : Create and maintain organization-specific plugin catalogs
 * **Training and documentation** : Help team members adopt plugin workflows effectively
## 
[​](#see-also)
See also
 * [Plugin marketplaces](/en/docs/claude-code/plugin-marketplaces) - Creating and managing plugin catalogs
 * [Slash commands](/en/docs/claude-code/slash-commands) - Understanding custom commands
 * [Subagents](/en/docs/claude-code/sub-agents) - Creating and using specialized agents
 * [Agent Skills](/en/docs/claude-code/skills) - Extend Claude’s capabilities
 * [Hooks](/en/docs/claude-code/hooks) - Automating workflows with event handlers
 * [MCP](/en/docs/claude-code/mcp) - Connecting to external tools and services
 * [Settings](/en/docs/claude-code/settings) - Configuration options for plugins
Was this page helpful?
YesNo
[Subagents](/en/docs/claude-code/sub-agents)[Agent Skills](/en/docs/claude-code/skills)
Assistant
Responses are generated using AI and may contain mistakes.