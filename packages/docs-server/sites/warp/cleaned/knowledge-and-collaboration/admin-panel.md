[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * * [Quickstart Guided](/)
 * [Migrate to Warp](/getting-started/migrate-to-warp)
 * [Supported Shells](/getting-started/supported-shells)
 * [Keyboard Shortcuts](/getting-started/keyboard-shortcuts)
 * [Changelog](/getting-started/changelog)
 * * [Agents Overview](/agents/agents-overview)
 * [Using Agents](/agents/using-agents)
 * [Slash Commands](/agents/slash-commands)
 * [Active AI](/agents/active-ai)
 * [Generate](/agents/generate)
 * [Voice](/agents/voice)
 * [AI FAQs](/agents/ai-faqs)
 * * [Code Overview](/code/code-overview)
 * [Code Editor](/code/code-editor)
 * [Codebase Context](/code/codebase-context)
 * [Code Review](/code/code-review)
 * [Code Diffs in Agent Conversations](/code/reviewing-code)
 * * [Universal Input](/terminal/universal-input)
 * [Appearance](/terminal/appearance)
 * [Blocks](/terminal/blocks)
 * [Modern Text Editing](/terminal/editor)
 * [Command Entry](/terminal/entry)
 * [Command Completions](/terminal/command-completions)
 * [Command Palette](/terminal/command-palette)
 * [Session Management](/terminal/sessions)
 * [Window Management](/terminal/windows)
 * [Warpify](/terminal/warpify)
 * [More Features](/terminal/more-features)
 * [Comparisons](/terminal/comparisons)
 * [Integrations](/terminal/integrations-and-plugins)
 * * [Warp Drive](/knowledge-and-collaboration/warp-drive)
 * [Model Context Protocol (MCP)](/knowledge-and-collaboration/mcp)
 * [Rules](/knowledge-and-collaboration/rules)
 * [Teams](/knowledge-and-collaboration/teams)
 * [Admin Panel](/knowledge-and-collaboration/admin-panel)
 * [Session Sharing](/knowledge-and-collaboration/session-sharing)
 * * [Warp CLI](/developers/cli)
 * * [Privacy](/privacy/privacy)
 * [Secret Redaction](/privacy/secret-redaction)
 * [Network Log](/privacy/network-log)
 * * [Refer a Friend & Earn Rewards](/community/refer-a-friend)
 * [Warp Preview & Alpha Program](/community/warp-preview-and-alpha-program)
 * * [Sending Feedback & Logs](/support-and-billing/sending-us-feedback)
 * [Plans & Pricing](/support-and-billing/plans-and-pricing)
 * [Updating Warp](/support-and-billing/updating-warp)
 * [Using Warp Offline](/support-and-billing/using-warp-offline)
 * [Logging Out & Uninstalling](/support-and-billing/uninstalling-warp)
 * [Known Issues](/support-and-billing/known-issues)
 * [Troubleshooting Login](/support-and-billing/troubleshooting-login-issues)
 * [Open Source Licenses](/support-and-billing/licenses)
[Powered by GitBook](https://www.gitbook.com/?utm_source=content&utm_medium=trademark&utm_campaign=-MbqIgTw17KQvq_DQuRr)
 * [What is the Admin Panel?](#what-is-the-admin-panel)
 * [Accessing the Admin Panel](#accessing-the-admin-panel)
 * [How Settings Enforcement Works](#how-settings-enforcement-works)
 * [Toggleable vs. Fixed Settings](#toggleable-vs.-fixed-settings)
 * [Setting Inheritance](#setting-inheritance)
 * [User Experience](#user-experience)
 * [Plan Limitations](#plan-limitations)
 * [Admin Panel Sections](#admin-panel-sections)
 * [AI Settings](#ai-settings)
 * [Privacy Settings](#privacy-settings)
 * [Code Settings](#code-settings)
 * [Billing Settings](#billing-settings)
 * [Sharing Settings](#sharing-settings)
Was this helpful?
## 
[](#what-is-the-admin-panel)
What is the Admin Panel?
The [Admin Panel](https://app.warp.dev/admin/) provides team administrators with centralized control over organization-wide settings in Warp. It allows you to manage workspace settings that are enforced across all members of your team.
Admin Panel access is restricted to team administrators. Right now, only the creator of a team is the designated admin. If your admin has setup styles that override user preferences, you will not be able to control them inside of Warp, and you'll see a note that your admin has configured this setting.
**Key features:**
 * **AI Settings** - Control agent autonomy, permissions, and allowlists across your team
 * **Privacy Controls** - Configure data collection and enterprise secret redaction
 * **Billing Management** - Set spending limits and manage usage-based pricing
 * **Code Settings** - Control codebase indexing and context features
 * **Sharing Policies** - Manage link sharing and collaboration permissions
## 
[](#accessing-the-admin-panel)
Accessing the Admin Panel
Team administrators can access the Admin Panel directly at https://app.warp.dev/admin/
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-9a756ef788dd10c9af6ed67bc3088dac9de07629%252Fadmin-panel-overview.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=cf17b1b8&sv=2)
Admin Panel main interface with sections for AI, privacy, billing, code, and sharing settings
## 
[](#how-settings-enforcement-works)
How Settings Enforcement Works
The Admin Panel uses a tier-based policy system to determine which settings administrators can control:
### 
[](#toggleable-vs.-fixed-settings)
Toggleable vs. Fixed Settings
**Toggleable settings** can be modified by team administrators. These appear as dropdown menus with options like:
 * Enabled/Disabled for boolean settings
 * Specific autonomy levels for AI settings
 * Respect User Setting to allow individual control
**Fixed settings** are determined by your billing tier and cannot be changed. These appear with a message: "Configuring this setting is not available on your plan."
### 
[](#setting-inheritance)
Setting Inheritance
When administrators configure organization-wide settings:
 1. **Organization enforced** - Setting applies to all team members regardless of individual preferences
 2. **Respect user setting** - Allows individual team members to control the setting themselves
 3. **Tier restricted** - Setting is locked to default values based on billing plan
### 
[](#user-experience)
User Experience
Any changes made in the Admin Panel can take effect immediately for all team members. Consider testing settings in Warp before applying organization-wide policies.
When organization settings override individual preferences:
 * Users see their personal settings grayed out
 * A message indicates "your organization has configured this setting"
 * Users cannot modify settings that are organizationally enforced
## 
[](#plan-limitations)
Plan Limitations
The features available in the Admin Panel vary by billing tier:
**Free Tier**
 * Most settings are fixed and non-toggleable
 * Limited codebase context and sharing features
**Business Plans**
 * Most settings become toggleable by administrators
 * Enhanced AI autonomy control
 * Advanced sharing and privacy features
**Enterprise Plans**
 * Full admin control over all settings
 * Enterprise secret redaction
 * Custom LLM integration
 * Advanced compliance features
For complete details about what's included in each plan, visit [warp.dev/pricing](https://www.warp.dev/pricing).
## 
[](#admin-panel-sections)
Admin Panel Sections
The Admin Panel is organized into five main sections, each focused on a specific area of team management:
### 
[](#ai-settings)
AI Settings
Configure how Agents behave across your organization, including autonomy levels and command permissions.
#### 
[](#general-ai-settings)
General AI Settings
**AI in Remote Sessions** Controls whether AI features are available during SSH sessions and remote connections. Enterprise plans can toggle this setting, while Free tier teams have it enabled by default.
**Prompt Summarization Caching** When conversations become long enough to require summarization, this setting allows the summary to be cached temporarily by the LLM provider to improve performance.
#### 
[](#autonomy-settings)
Autonomy Settings
Configure how much independence Agents have when performing different actions:
**Apply Code Diffs**
 * Agent Decides - Agent acts autonomously when confident, asks for approval when uncertain
 * Always Ask - Require explicit approval before applying any code changes
 * Always Allow - Apply code diffs without confirmation
 * Respect User Setting - Allow individual users to control this setting
**Create Plans** Controls whether Agents can create structured task plans without user approval.
**Execute Commands** Manages Agent's ability to run terminal commands autonomously.
**Read Files** Controls Agent access to reading files in the codebase.
#### 
[](#directory-and-command-control)
Directory and Command Control
**Directory Allowlist** Specify directories where Agents can read files without restriction. Use paths like `~/git/repo1` to grant access to specific project folders.
**Command Allowlist** Regular expressions matching commands that Agent Mode can execute without asking permission. Common examples:
 * `grep .*` - Text search commands
 * `ls(\\s.*)?` - Directory listing
 * `which .*` - Finding executable locations
**Command Denylist** Regular expressions for commands that always require explicit user approval, even if they would normally be allowed. Examples:
 * `rm -rf.*` - Recursive file deletion
 * `sudo.*` - Administrative commands
 * `curl.*` - Network requests
Command denylist rules take precedence over allowlist rules and agent autonomy settings. If a command matches the denylist, user permission will always be required.
### 
[](#privacy-settings)
Privacy Settings
Manage data collection and security policies for your organization.
**UGC Data Collection** Controls how Warp collects and uses user-generated content to improve the service:
 * Disabled - No UGC data collection
 * Enabled - Allow data collection for service improvement
 * Respect User Setting - Let individual users decide
**Enterprise Secret Redaction** When enabled, applies regex patterns to prevent secrets from being sent to Warp servers or LLM providers. This feature is available on Enterprise plans and includes:
 * Automatic detection of common secret patterns
 * Custom regex patterns for organization-specific secrets
 * Unconditional application across all team members
### 
[](#code-settings)
Code Settings
Control codebase indexing and AI code features for your team.
**Codebase Context** Determines whether Warp indexes your team's Git repositories to provide context for AI features:
 * Disabled - No codebase indexing
 * Enabled - Index codebases for improved AI responses
 * Respect User Setting - Allow individual control
Higher tier plans support more indexed repositories and larger file limits per codebase.
### 
[](#billing-settings)
Billing Settings
Configure billing preferences and spending controls.
**Usage Based Pricing** Enable pay-as-you-go billing for AI credits beyond your plan's included quota. When enabled, you can set:
**Monthly Spending Limit** Set a maximum monthly overage spending limit to control costs. The system displays current overage usage including:
 * Total overage credits used
 * Current month's overage costs
### 
[](#sharing-settings)
Sharing Settings
Control how team members can share Warp Drive objects and collaborate.
**Direct Link Sharing** Allow team members to share Notebooks, Workflows, and other objects via direct links.
**Anyone with Link Sharing** Enable public access to shared objects - anyone with the link can view the content without being a team member.
[PreviousTeams](/knowledge-and-collaboration/teams)[NextSession Sharing](/knowledge-and-collaboration/session-sharing)
Last updated 15 days ago
Was this helpful?