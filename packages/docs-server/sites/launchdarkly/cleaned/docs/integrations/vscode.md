`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Integrations](/docs/integrations)
 * [Collaboration tools](/docs/integrations/collaboration)
 * [Data Export](/docs/integrations/data-export)
 * [Edge tools](/docs/integrations/edge)
 * [Environments as a service](/docs/integrations/eaas)
 * [Experimentation and metric integrations](/docs/integrations/experimentation)
 * [IDE connectors](/docs/integrations/ide)
 * [Internal developer platforms](/docs/integrations/idp)
 * [Observability tools](/docs/integrations/observability)
 * [Segments integrations](/docs/integrations/segments)
 * [Workflow management tools](/docs/integrations/workflow)
 * [More integrations](/docs/integrations/more)
 * [Managing integrations](/docs/integrations/managing)
 * [Using the LaunchDarkly integration framework](/docs/integrations/building-integrations)
 * [Building partner integrations](/docs/integrations/partner-integrations)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Prerequisites](#prerequisites)
 * [Set up the VSCode extension](#set-up-the-vscode-extension)
 * [Create a role and add it to an API access token](#create-a-role-and-add-it-to-an-api-access-token)
 * [Add the Writer role to your personal access token](#add-the-writer-role-to-your-personal-access-token)
 * [Configure the VSCode extension](#configure-the-vscode-extension)
 * [LaunchDarkly extension for GitHub Copilot](#launchdarkly-extension-for-github-copilot)
 * [Flag Actions command](#flag-actions-command)
 * [Dashboard Shortcuts command](#dashboard-shortcuts-command)
 * [Code references in the VSCode extension](#code-references-in-the-vscode-extension)
 * [Quick targeting in the VSCode extension](#quick-targeting-in-the-vscode-extension)
 * [Targets](#targets)
 * [Rules](#rules)
 * [Telemetry](#telemetry)
## Overview
This topic explains how to use the LaunchDarkly VSCode extension to interact with feature flags from within Visual Studio Code (VSCode).
With the extension, you have the ability to:
 * Use a set of `@LaunchDarkly` commands in GitHub Copilot to interact with your flags
 * Display a tooltip with feature flag details when you hover over a feature flag key in your source code
 * Autocomplete feature flag keys
 * Open feature flags in LaunchDarkly (default keybinding: `ctrl+alt+g`/`⌘+alt+g`)
 * View a list of feature flags and their settings in the Explorer view
 * Flag actions: Toggle flags on or off, add flag targeting rules, update a flag’s state, set default on and default off variations, and more
 * Enable codelens for flags in your source code
 * Click links to go directly into the LaunchDarkly UI
![LaunchDarkly flag actions](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/614814d778b8a916044db9bad8d8957c94475c4c875d9b7be44e8f53715f2d1e/assets/images/__third_party/vscode-flag-actions.png)
LaunchDarkly flag actions
![The LaunchDarkly VSCode extension](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/8ce09acab3c11fc76c146adcb6e378f87d85a171db023e02a702e56e7dca029a/assets/images/__third_party/vscode-overview-hover.png)
The LaunchDarkly VSCode extension
![Extension overview](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/6e52f275490a50602e8501c6595cfe8b124a09e976f90494a4e33d6fd5558ba6/assets/images/__third_party/vscode-overview.png)
Extension overview
![Treeview right click options](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/5dde00fc98bec96f0669cfa1cb479410bab333b1dc287781ab2ce07368308729/assets/images/__third_party/vscode-treeview-right-click.png)
Treeview right click options
## Prerequisites
To complete this procedure, you must have the following prerequisites:
 * The VSCode extension from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=LaunchDarklyOfficial.launchdarkly).
 * A personal API access token. To learn more, read [API access tokens](/docs/home/account/api).
## Set up the VSCode extension
To set up the VSCode extension, you must complete the following steps:
 1. Give your API access token the required permissions:
 * You can [create a role with appropriate permissions, then add the role to a personal access token](/docs/integrations/vscode#create-a-role-and-add-it-to-an-api-access-token), or
 * you can [add the Writer base role to your personal access token](/docs/integrations/vscode#add-the-writer-role-to-your-personal-access-token).
 1. [Configure the VSCode extension](/docs/integrations/vscode#set-up-the-vscode-extension) with the API access token.
### Create a role and add it to an API access token
To give your API access token the required permissions, one option is to create a custom role and add that role to the API access token.
###### Expand Create a role and add it to an API access token
##### Creating your own roles is available to customers on select plans
Creating your own roles is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
To configure the VSCode extension, you must have an access token that targets version `20210729` or later of the LaunchDarkly REST API.
The following role allows Reader access to all projects and Writer access to the minimal set of fields the extension is able to update.
To create a role for the API access token:
 1. Click the **gear** icon in the left sidenav to view Organization settings. The General settings page appears.
 2. Click **Roles**.
 3. Click **New role**. The “New role” page appears.
 4. Enter a human-readable **Name** for the role.
 5. Enter a **Key** for the role.
 6. (Optional) Enter a **Description** to explain what the role does.
 7. In the “Edit policy” panel, click **View JSON** to open the advanced editor.
 8. Enter this policy in the “Editor” field:
Example policy
```
1
| [
---|--- 
2
| {
3
| "effect": "allow",
4
| "actions": ["viewProject"],
5
| "resources": ["proj/*"]
6
| },
7
| {
8
| "effect": "allow",
9
| "actions": ["updateOn", "updateFallthrough", "updateOffVariation", "createFlag", "updateTargets", "updateRules"],
10
| "resources": ["proj/*:env/*:flag/*"]
11
| }
12
| ]
```
 9. Click **Create role**.
### Add the Writer role to your personal access token
To give your API access token the required permissions, another option is to add the Writer base role to your access token.
###### Expand Add the Writer role to your personal access token
To configure the VSCode extension, you must have an access token that targets version `20210729` or later of the LaunchDarkly REST API.
To add the Writer base role to a personal access token:
 1. Click the **gear** icon in the left sidenav to view Organization settings. The General settings page appears.
 2. Click **Authorization**.
 3. Find the personal access token you want to add permissions to and select “Edit token” from its **overflow menu**. The “Edit” dialog appears.
 4. In the **Role** menu, select “Writer.”
 5. Click **Save token**.
Your personal token now has the Writer base role.
## Configure the VSCode extension
After you install the LaunchDarkly extension, VSCode prompts you to sign in to your LaunchDarkly account:
 1. Select the LaunchDarkly instance. Most members should select `Commercial`, but FedRAMP members should select `Federal`.
 2. Provide an **access token** for your LaunchDarkly account. This access token must have sufficient permission as described above.
After you complete step 2, continue configuring the extension. If the configuration menu does not appear, run the command: `LaunchDarkly: Configure settings`.
 1. Select your corresponding **LaunchDarkly project**.
 2. Select your corresponding **LaunchDarkly environment**.
 3. Select whether you want the extension to work with all VSCode workspaces or just the current workspace.
You can reconfigure the extension at any time by running the “LaunchDarkly: Configure settings” command from the command palette (`ctrl+shift+p`/`⌘+shift+p`).
## LaunchDarkly extension for GitHub Copilot
If you use GitHub Copilot and install the LaunchDarkly VSCode extension, you can use a set of `@LaunchDarkly` commands in GitHub Copilot to interact with your flags.
To enable `@LaunchDarkly` commands in GitHub Copilot, confirm that you are using the latest version of VSCode and that you are using the GitHub Copilot Chat extension for VSCode.
In your GitHub Copilot prompt, you can use the following `@LaunchDarkly` commands:
Command | Definition | Example 
---|---|--- 
`@LaunchDarkly /createFlag` | GitHub Copilot creates a LaunchDarkly feature flag based on your prompt | `@LaunchDarkly /createFlag I need a new feature flag for the account-migration project` 
`@LaunchDarkly /explain` | GitHub Copilot asks you to select a flag, and then provides a summary of the flag, its variations, and its [release pipeline](/docs/home/releases/release-pipelines) status. If the flag is ready for cleanup, the summary will mention that, and the **Problems** tab will include a message that the flag is ready for cleanup. | `@LaunchDarkly /explain` 
`@LaunchDarkly /cleanup` | GitHub Copilot asks you to select a flag, and then determines whether or not the selected flag is ready for cleanup. It provides details on each criteria that must be met. To learn more about when a flag can be archived, read [Archiving flags](/docs/home/flags/archive). | `@LaunchDarkly /cleanup` 
## Flag Actions command
Use the `LaunchDarkly: Flag Actions` command to bring up a menu of options that you can choose from to interact with your feature flags.
## Dashboard Shortcuts command
Use the `LaunchDarkly: Dashboard Shortcuts` command to open a [list of your shortcuts](https://docs.launchdarkly.com/home/flags/list#save-shortcuts-to-filtered-flags-lists) for the configured project.
## Code references in the VSCode extension
The LaunchDarkly VSCode extension supports code references. If you use code references, configuring aliases makes the informational hover available wherever an alias appears in your code. Aliases appear under the flag entry in the Explorer view. To learn more, read [Find flag aliases](/docs/home/flags/code-references#find-flag-aliases).
Flag searches across the workspace also include flag references.
## Quick targeting in the VSCode extension
The LaunchDarkly VSCode extension supports quick targeting. This is useful if you use a consistent targeting context key or rule when coding with feature flags.
It will look for a yaml file, `rules.yaml`, located in the `.launchdarkly` subdirectory of your home directory. The full path is: `~/.launchdarkly/rules.yaml`.
Here’s an example:
Example Targeting YAML
```
1
| targets:
---|--- 
2
| - name: Target Me in Context
3
| values: context-key-123abc
4
| - name: Target Me in Account Context
5
| contextKind: account
6
| values: account-1234
7
| rules:
8
| - name: My Test Organization
9
| clauses:
10
| - contextKind: user
11
| attribute: organization
12
| op: in
13
| negate: false
14
| values:
15
| - org-1234
```
### Targets
You can define targets with the following attributes:
 * Name: A descriptive name for the target.
 * ContextKind (Optional): The kind of context for account-related targeting, for example, `account`. If not provided, defaults to `user`.
 * Values: An array of specific keys or identifiers for targeting.
### Rules
Rules are conditions set for targeting. Each rule has:
 * Name: A descriptive name for the rule.
 * Clauses: Conditions under which this rule applies. Each clause can specify:
 * ContextKind: The context kind, such as `user`, to which the clause applies.
 * Attribute: The specific attribute within the context to evaluate, such as `organization`.
 * Operation (op): Defines the operation to apply for the clause’s condition. Supported operations include: `in`, `endsWith`, `startsWith`, `matches`, `contains`, `lessThan`, `semVerEqual`, `semVerLessThan`, `semVerGreaterThan`, `before`, and `after`.
 * Negate: A boolean indicating if the condition should be inverted. If true, the rule applies when the condition is not met.
 * Values: An array of values to compare the attribute against based on the operation.
## Telemetry
LaunchDarkly collects information about your use of this extension in accordance with the [LaunchDarkly privacy policy](https://launchdarkly.com/policies/privacy/).
You can opt out at any time in the extension settings by navigating to `LaunchDarkly > Enable Telemetry` and unchecking the box. We also respect the [VSCode Telemetry setting](https://code.visualstudio.com/docs/configure/telemetry#_disable-telemetry-reporting).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs