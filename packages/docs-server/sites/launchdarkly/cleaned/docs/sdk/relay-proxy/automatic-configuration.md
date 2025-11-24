`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [SDKs](/docs/sdk)
 * [SDK concepts](/docs/sdk/concepts)
 * [SDK features](/docs/sdk/features)
 * [Client-side SDKs](/docs/sdk/client-side)
 * [Server-side SDKs](/docs/sdk/server-side)
 * [AI SDKs](/docs/sdk/ai)
 * [Edge SDKs](/docs/sdk/edge)
 * [OpenFeature providers](/docs/sdk/openfeature)
 * [Observability SDKs](/docs/sdk/observability)
 * [Relay Proxy](/docs/sdk/relay-proxy)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Benefits of automatic configuration](#benefits-of-automatic-configuration)
 * [Enable automatic configuration](#enable-automatic-configuration)
 * [Write an inline policy](#write-an-inline-policy)
 * [Use the policy builder](#use-the-policy-builder)
 * [Use the advanced editor](#use-the-advanced-editor)
 * [Example access policies](#example-access-policies)
 * [Production environment in all projects](#production-environment-in-all-projects)
 * [Production environment in one project](#production-environment-in-one-project)
 * [All environments in certain projects](#all-environments-in-certain-projects)
 * [Production environments in tagged projects](#production-environments-in-tagged-projects)
 * [All non-production environments in any projects not tagged “federal”](#all-non-production-environments-in-any-projects-not-tagged-federal)
 * [Write a custom role with access to the Relay Proxy](#write-a-custom-role-with-access-to-the-relay-proxy)
## Overview
This topic explains how to set up the Relay Proxy’s automatic configuration feature.
##### Relay Proxy automatic configuration is available to customers on select plans
Relay Proxy automatic configuration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
With automatic configuration, the Relay Proxy automatically detects and supports new connections to updated or new environments whenever changes occur that impact LaunchDarkly SDK keys, mobile keys, or client-side IDs.
## Benefits of automatic configuration
In a standard Relay Proxy, without automatic configuration, whenever you add or make changes to environments and projects in LaunchDarkly, you must manually update configuration files and restart the Relay Proxy to reflect the changes.
With automatic configuration enabled, you no longer need to manually update the Relay Proxy’s configuration files after you make configuration changes, nor do you need to restart the Relay Proxy for changes to take effect.
Additionally, you can use a page in the LaunchDarkly user interface (UI) to configure your Relay Proxy with the automatic configuration feature. A standard Relay Proxy requires all environments to be defined individually, and you cannot configure it through the LaunchDarkly UI.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/openapi-logo.svg)
You can also use the REST API: [Relay Proxy configurations](/docs/api/relay-proxy-configurations)
If you enable automatic configuration, your Relay Proxy automatically detects and reacts to server-sent events including the following:
 * SDK key rotation
 * Mobile key rotation
 * Environment state changes, such as new environment creation, name and tag updates, and environment deletion
 * Project state changes, such as new project creation, name and tag updates, and project deletion
This prevents you from needing to restart your Relay Proxy instances and potentially cause downtime while applying changes. These changes have no impact on your Relay Proxy’s performance.
With automatic configuration enabled, you only need to restart the Relay Proxy to upgrade it.
## Enable automatic configuration
To enable automatic configuration, you must have a role that allows the `createRelayAutoConfiguration` action. The LaunchDarkly Admin and Architect organization roles, as well as the Admin and Owner base roles, include this ability. To learn more, read [Relay Proxy configuration actions](/docs/home/account/roles/role-actions#relay-proxy-configuration-actions).
Enabling automatic configuration is a two-step process. These steps appear in detail below.
You must:
 1. Create a Relay Proxy configuration on the [**Relay Proxy** page](https://app.launchdarkly.com/settings/relay) under Organization settings and save its unique key.
 2. Configure your Relay Proxy instance to use the unique key from the prior step. You may do so either as a property in your Relay Proxy configuration file or as an environment variable.
##### Save the Relay Proxy's unique key
When you create a new Relay Proxy configuration, LaunchDarkly assigns a unique key to it. You must save the key immediately after you create the Relay Proxy configuration, because the key is only viewable on creation.
Here’s how to create a Relay Proxy configuration in the LaunchDarkly UI:
 1. Click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Relay proxy**. The “Relay Proxy” page opens.
 3. Click **Create configuration**. The “Create a Relay Proxy configuration” panel appears.
 4. Give the Relay Proxy a human-readable **Name**.
 5. Choose a **Rule** from the menu. This rule determines what content the Relay Proxy receives.
 * “All projects and environments” sends changes about all projects and environments to the Relay Proxy.
 * “Inline policy” allows you to specify which projects and environments you can track events for. To learn more, read [Write an inline policy](/docs/sdk/relay-proxy/automatic-configuration#write-an-inline-policy).
 1. Click **Save configuration**. The Relay Proxy appears on the **Relay Proxy** page with its key visible.
 2. Copy and save the key somewhere secure:
![The "Relay proxy" page with a newly created Relay Proxy configuration. The key is displayed.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/bbb0f7c99d8235b4a9059412739d73fa953abb079d5db00a3d2843b74ae10ccc/assets/images/auto/relay-proxy-key-displayed.auto.png)
The "Relay proxy" page with a newly created Relay Proxy configuration. The key is displayed.
Next you must specify the key in a Relay Proxy configuration file so it includes the configuration you created. Here’s how:
 1. Configure your Relay Proxy to use your new key.
 * If you configured the Relay Proxy with a configuration file, specify the Relay Proxy key in an `AutoConfig` section as the `key` property.
 * If you configured the Relay Proxy with environment variables, specify the Relay Proxy key with the `AUTO_CONFIG_KEY` environment variable. Here’s how:
Configuration fileEnvironment variables
```
$
| [AutoConfig]
---|--- 
>
| key = "rel-EXAMPLE-RELAY-PROXY-CONFIGURATION-KEY"
```
 1. Start the Relay Proxy.
From now on, the Relay Proxy will respond automatically to the project and environment state changes you specified.
## Write an inline policy
You can use an inline policy to specify precise instructions on what environments and projects the Relay Proxy should include or exclude. An inline policy is similar to a [role](/docs/home/account/roles), but is created as part of the Relay Proxy configuration.
There are two ways to write an inline policy:
 * Using the policy builder
 * Using the advanced editor
Each of these methods is described below.
###### Expand Using the policy builder
### Use the policy builder
You can create most policies using the policy builder.
To use the policy builder from the “Create a Relay Proxy configuration” panel:
 1. Choose “inline policy” from the **Rule** menu.
 2. Click **+ Add statement**.
 3. Use the **Scope** menu to specify the resources this policy affects.
 * Select the resource type.
 * In the **Select an operation** menu, select whether the scope of the statement should be all resources of this type, all resources except for a select few, or only a select few.
 * If necessary, choose these select few from the **Select [resources]** menu.
 1. Use the **Actions** menu to specify whether to allow or deny actions on these resources.
 2. Click **Save configuration**.
This example gives the Relay Proxy access to all environments within the `default` project:
![The policy builder.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/070b2246f88fd774b53527642da28f5621d45b3a66876776576e50dba181348f/assets/images/__toPlaywright_newIA/relay-proxy-policy-builder.png)
The policy builder.
To learn more about using the policy builder, read [Create policies for roles](/docs/home/account/roles/role-create#create-policies-for-roles).
###### Expand Using the advanced editor
### Use the advanced editor
To write more complicated policies you can use the advanced editor. To learn how to write advanced policies, read [About policies](/docs/home/account/roles/role-policies#about-policies).
To use the advanced editor from the “Create a Relay Proxy configuration” panel:
 1. Choose “inline policy” from the **Rule** menu.
 2. Click **View JSON**. The advanced editor window appears.
 3. Enter your policy.
 4. Click **Save configuration**.
![The advanced policy editor.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/057e326c18465ea4b598b93446364aacc8e30f7fc623109b15f74405c886465e/assets/images/auto/relay-proxy-advanced-editor.auto.png)
The advanced policy editor.
### Example access policies
You can limit the environments to include in an automatic Relay Proxy configuration. Expand each section below to view custom role policy examples.
###### Expand Production environment in all projects
### Production environment in all projects
Use this policy to give the Relay Proxy access to the production environment in all projects:
All production environments
```
1
| [
---|--- 
2
| {
3
| "actions": ["*" ],
4
| "effect": "allow",
5
| "resources": ["proj/*:env/production" ]
6
| }
7
| ]
```
###### Expand Production environment in one project
### Production environment in one project
Use this policy to give the Relay Proxy access to the production environment in the “Mobile” project:
Production environment in one project
```
1
| [
---|--- 
2
| {
3
| "actions": ["*"],
4
| "effect": "allow",
5
| "resources": ["proj/mobile:env/production" ]
6
| }
7
| ]
```
###### Expand All environments in certain projects
### All environments in certain projects
Use this policy to give the Relay Proxy access to all environments in projects starting with “Mobile-”:
All environments in Mobile- projects
```
1
| [
---|--- 
2
| {
3
| "actions": ["*"],
4
| "effect": "allow",
5
| "resources": ["proj/mobile-*:env/*" ]
6
| }
7
| ]
```
###### Expand Production environments in tagged projects
### Production environments in tagged projects
Use this policy to give the Relay Proxy access production environments in projects tagged with “mobile”:
Production environments in tagged projects
```
1
| [
---|--- 
2
| {
3
| "actions": ["*"],
4
| "effect": "allow",
5
| "resources": ["proj/*;mobile:env/production" ]
6
| }
7
| ]
```
###### Expand All non-production environments in any projects not tagged federal
### All non-production environments in any projects not tagged “federal”
Use this policy to give the Relay Proxy access to non-production environments in projects not tagged with “federal”:
Non-production environments not tagged
```
1
| [
---|--- 
2
| {
3
| "actions": ["*" ],
4
| "effect": "allow",
5
| "resources": ["proj/*:env/*"]
6
| },
7
| {
8
| "actions": ["*"],
9
| "effect": "deny",
10
| "resources": [
11
| "proj/*:env/production",
12
| "proj/*;federal:env/*"
13
| ]
14
| }
15
| ]
```
## Write a custom role with access to the Relay Proxy
You can give members access to the Relay Proxy using the `relay-proxy-config` resource in a custom role policy. To learn more about Relay Proxy resource actions, read [Relay Proxy configuration actions](/docs/home/account/roles/role-actions#relay-proxy-configuration-actions).
You can copy and paste this custom role policy into the advanced editor to grant access to all Relay Proxy actions:
Relay Proxy access
```
1
| [
---|--- 
2
| {
3
| "effect": "allow",
4
| "actions": ["*"],
5
| "resources": ["relay-proxy-config"]
6
| }
7
| ]
```
To learn more about creating roles, read [Roles](/docs/home/account/roles).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs