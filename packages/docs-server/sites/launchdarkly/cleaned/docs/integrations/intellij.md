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
 * [Set up the IntelliJ IDEA plugin](#set-up-the-intellij-idea-plugin)
 * [Give your API access token the required permissions](#give-your-api-access-token-the-required-permissions)
 * [Create a role and add it to an API access token](#create-a-role-and-add-it-to-an-api-access-token)
 * [Add the Writer role to your personal access token](#add-the-writer-role-to-your-personal-access-token)
 * [Configure the LaunchDarkly extension in IntelliJ IDEA](#configure-the-launchdarkly-extension-in-intellij-idea)
 * [Code references in the IntelliJ IDEA plugin](#code-references-in-the-intellij-idea-plugin)
## Overview
This topic explains how to configure the LaunchDarkly IntelliJ IDEA plugin and use it to interact with feature flags from within IntelliJ integrated development environments (IDEs).
Use this plugin with your favorite compatible products from JetBrains including IntelliJ IDEA, PyCharm, WebStorm, GoLand, and many others. A full compatibility list is available on the [JetBrains Marketplace’s plugin listing](https://plugins.jetbrains.com/plugin/15159-launchdarkly).
With the extension, you can:
 * Autocomplete feature flag keys
 * View a tooltip with feature flag details when you hover over a flag key in your source code
 * Open to specific feature flags in LaunchDarkly from your code editor
 * View a list of feature flags and their settings in the LaunchDarkly tool window
 * Update a flag’s state, fallback value, and default off variation
## Prerequisites
To complete this procedure, you must have the following prerequisites:
 * The IntelliJ IDEA plugin from the [JetBrains Marketplace](https://plugins.jetbrains.com/plugin/15159-launchdarkly/versions). The version must be compatible with your IDE.
 * A personal access token. To learn more, read [API access tokens](/docs/home/account/api).
## Set up the IntelliJ IDEA plugin
To set up the IntelliJ IDEA plugin, you must complete the following steps:
 1. Give your API access token the required permissions:
 * You can [create a role with appropriate permissions, then add the role to a personal access token](/docs/integrations/intellij#create-a-role-and-add-it-to-an-api-access-token), or
 * you can [add the Writer base role to your personal access token](/docs/integrations/intellij#add-the-writer-role-to-your-personal-access-token).
 1. [Configure the LaunchDarkly extension in IntelliJ IDEA](/docs/integrations/intellij#set-up-the-intellij-idea-plugin) with the API access token.
## Give your API access token the required permissions
You can create a role with appropriate permissions then add the role to a personal, or you can add the Writer base role to your personal access token.
### Create a role and add it to an API access token
###### Expand Create a role and add it to an API access token
##### Creating your own roles is available to customers on select plans
Creating your own roles is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
The following example policy allows read access to all projects and write access to the minimal set of fields the plugin is able to update.
To create a role for the API access token:
 1. Click the **gear** icon in the left sidenav to view Organization settings. The General settings page appears.
 2. Click **Roles**.
 3. Click **New role**. The “New role” page appears.
 4. Enter a human-readable **Name** for the role.
 5. Enter a **Key** for the role.
 6. (Optional) Enter a **Description** to explain what the role does.
 7. In the “Edit policy” panel, click **View JSON** to open the advanced editor.
 8. Enter this policy in the “Editor” field:
Read access to all and write access to some projects
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
| "actions": ["updateOn", "updateFallthrough", "updateOffVariation"],
10
| "resources": ["proj/*:env/*:flag/*"]
11
| }
12
| ]
```
 9. Click **Create role**.
### Add the Writer role to your personal access token
###### Expand Add the Writer role to your personal access token
To toggle flags from your IDE, you must generate the access token with a Writer base role. A Reader base role is sufficient for updating flag information.
To add the Writer base role to a personal access token:
 1. Click the **gear** icon in the left sidenav to view Organization settings. The General settings page appears.
 2. Click **Authorization**.
 3. Find the personal access token you want to add permissions to and select “Edit token” from its **overflow menu**. The “Edit” dialog appears.
 4. In the **Role** menu, select “Writer.”
 5. Click **Save token**.
Your personal token now has the Writer base role.
## Configure the LaunchDarkly extension in IntelliJ IDEA
With your access token, you can finish configuring the LaunchDarkly extension in the “LaunchDarkly” menu option in the IntelliJ IDEA “Preferences” dialog.
You will need to grant IntelliJ IDEA access to system’s default credential store. This is to securely store your access token with [IntelliJ’s Credential Store API](https://plugins.jetbrains.com/docs/intellij/persisting-sensitive-data.html). You can then provide your access token and select the project and environment associated with your IntelliJ project.
![The IntelliJ IDEA "Preferences" dialog.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/d788f9537eeedc48030f92aa618dada1d4d0c529283563e9e92f0af776b82bef/assets/images/__third_party/intellij-configuration.png)
The IntelliJ IDEA "Preferences" dialog.
## Code references in the IntelliJ IDEA plugin
The LaunchDarkly IntelliJ IDEA plugin supports code references. Configuring aliases for projects with code references makes the hover card available wherever that alias is used. To learn more, read [Find flag aliases](/docs/home/flags/code-references#find-flag-aliases).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs