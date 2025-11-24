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
 * [Configure a LaunchDarkly environment to use the custom approvals integration configuration](#configure-a-launchdarkly-environment-to-use-the-custom-approvals-integration-configuration)
## Overview
This topic describes how to configure LaunchDarkly environments to use a custom approvals integration configuration for flag changes. This is the final step required in configuring a [custom approvals integration](/docs/integrations/custom-approvals).
## Configure a LaunchDarkly environment to use the custom approvals integration configuration
By default, LaunchDarkly’s flag approvals request feature only creates approval requests in LaunchDarkly. You can change this behavior so that LaunchDarkly creates flag change requests in your approvals application.
Before you complete this configuration, you must [create your own approval application](/docs/integrations/custom-approvals/custom-app) and [add a custom approvals integration configuration](/docs/integrations/custom-approvals/add-integration-config).
Then, to create change requests in your approvals application, you must update your chosen LaunchDarkly environment’s flag approval settings to reference your custom approvals integration configuration.
Here’s how:
 1. Click the project dropdown. The project menu appears:
![The project menu.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/e7170a6ea679fd8c8210aa3660093eb18394effdc9571d713b907cbce33e24c0/assets/images/auto/project-menu-dropdown.auto.png)
The project menu.
 1. Select **Project settings**. The list of project settings appears.
 2. Click **Approval settings**.
 3. In the “Flag approvals” section, select an environment.
 4. Click **Edit approval setting**. The “Approval settings for [environment]” dialog appears.
 5. Change the **Approval system** from “LaunchDarkly” to your custom approvals integration configuration.
 6. (Optional) Select the **Require approvals for this environment** checkbox to require approval for flag targeting changes in this environment. If you select this, then you must also choose:
 * **All flags** : Select to require approval for all flag targeting changes.
 * **Flags matching the following tags** : Select to require approval only for flag targeting changes on flags with the listed tags. While tags are global across environments, this setting applies only to flags in the current environment.
 * **Allow deleting scheduled changes without approval** : Select to allow scheduled changes for a flag to be deleted without approval in this environment.
 7. Choose whether to **Automatically apply flag changes in LaunchDarkly when associated external change requests are approved**.
 8. Click **Save changes**.
After you have configured your chosen LaunchDarkly environments to use the custom approvals integration, members of your organization in LaunchDarkly can request approval for flag changes within LaunchDarkly. Requests will then be sent to your approvals application whenever the state of the approval request changes in LaunchDarkly.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs