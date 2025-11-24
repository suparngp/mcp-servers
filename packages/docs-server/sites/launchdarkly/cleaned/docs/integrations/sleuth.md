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
 * [Set up the Sleuth integration](#set-up-the-sleuth-integration)
 * [Configure the Sleuth integration](#configure-the-sleuth-integration)
 * [Remove the Sleuth integration](#remove-the-sleuth-integration)
 * [Getting Slack notifications from Sleuth](#getting-slack-notifications-from-sleuth)
##### The Sleuth integration is available to customers on select plans
The Sleuth integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to use the LaunchDarkly Sleuth integration.
##### The Sleuth integration is managed by Sleuth
The Sleuth integration was built by and is managed by Sleuth. For questions about the integration or for technical support, [contact Sleuth](https://www.sleuth.io/).
The LaunchDarkly Sleuth integration tracks feature flags as a source of change in your DevOps tools. Sleuth captures the full state of your LaunchDarkly feature flags at deployment time. This helps you keep track of the affected code deploys, what environment the change occurred in, who changed the flag, and flag descriptions and values before and after code deploys.
## Prerequisites
To connect Sleuth to LaunchDarkly, you must meet the following prerequisites:
 * You must have access to your LaunchDarkly credentials and
 * A LaunchDarkly account with a Writer, Admin, or Owner base role.
The integration is initiated from your Sleuth account. After you connect it, you do not need to take further action. There are no Sleuth settings or preferences to configure in LaunchDarkly.
##### Make sure your role in LaunchDarkly allows you to modify integrations
If you get a notification that the integration is connected, but cannot access deploy data in Sleuth, confirm that your LaunchDarkly role allows you to enable external apps. If you have a Reader base role, or have another role that restricts these permissions, the integration may not work.
## Set up the Sleuth integration
To connect the Sleuth integration with LaunchDarkly:
 1. Log into your [Sleuth Dashboard](https://app.sleuth.io/accounts/login/).
 2. In the left sidebar, click **Integrations**.
 3. Click **enable** in the LaunchDarkly section of the **Flags** tab.
 4. Click **Authorize**. This allows Sleuth to read and modify your LaunchDarkly data.
##### You must authorize Sleuth for the integration to work
If you click **Deny** , the integration cannot access your flag data.
![The LaunchDarkly authorization dialog.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/7074d9ab43b198b16e0674540d387dc9c912f0a3cb5d75203020f5e4d8e3ec75/assets/images/__third_party/sleuth-ld-integration-auth-dialog.png)
The LaunchDarkly authorization dialog.
 1. Confirm that the integration has connected LaunchDarkly and Sleuth when “LaunchDarkly enabled (Connected as user)” is displayed in the LaunchDarkly integration card.
![A successfully connected LaunchDarkly integration section in Sleuth.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/c569c4ddc8a926d04953a5bd5deadf06bc25bc27593f646591debdcbc2df80eb/assets/images/__third_party/sleuth-ld-integration-success-dialog_3.png)
A successfully connected LaunchDarkly integration section in Sleuth.
## Configure the Sleuth integration
Now that you’ve set up the Sleuth LaunchDarkly integration, you must configure Sleuth to know which feature flags it should track.
To select a LaunchDarkly project and environment to track:
 1. Navigate to the **Integrations** page in Sleuth and find the LaunchDarkly integration section in the **Flags** tab.
 2. Click **Add feature flags**.
![The LaunchDarkly integration section in Sleuth.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/c569c4ddc8a926d04953a5bd5deadf06bc25bc27593f646591debdcbc2df80eb/assets/images/__third_party/sleuth-ld-integration-success-dialog_3.png)
The LaunchDarkly integration section in Sleuth.
 1. Select the **Feature Flag Project** and **Environment** you want to track.
![The feature flag change source setup in Sleuth.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/c9e1f097a109d35e4cd20d863258400e2d5e4cea6663a934974bfc2156b3ce79/assets/images/__third_party/sleuth-ld-integration-config-dialog.png)
The feature flag change source setup in Sleuth.
 1. Give the integration a **Name**.
 2. Click **Create**.
After the connection is established, the Sleuth trend graph appears. This graph monitors how your feature flags impact your code over time.
![The Sleuth trend graph.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/771318c29345b087cbd329990ae17597df8071ae6b33a21f53a08928dfb4093c/assets/images/__third_party/sleuth-ld-integration-trendgraph.png)
The Sleuth trend graph.
##### Tracking multiple projects and environments
To track multiple LaunchDarkly projects and environments in Sleuth, create a new Sleuth project and attach each LaunchDarkly project or environment to Sleuth individually. You can create as many Sleuth projects as you need to track any number of feature flag project and environment combinations.
To learn more, read [Sleuth’s documentation](https://help.sleuth.io/projects#creating-a-project).
## Remove the Sleuth integration
To remove the Sleuth integration:
 1. Log in to your Sleuth account.
 2. In the left sidebar, click **Integrations**.
 3. Click **disable** in the LaunchDarkly section in the **Change Sources** tab.
 4. Confirm that the integration has been removed when **LaunchDarkly disabled - enable** is displayed in the LaunchDarkly integration card.
![Deleting the LaunchDarkly integration in Sleuth](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/832e0b71facc419fc199d5bf40a9c22be82f824d538eb1c1a33d39cbca0c76c1/assets/images/__third_party/sleuth-ld-integration-delete_2.png)
Deleting the LaunchDarkly integration in Sleuth
This removes the LaunchDarkly integration.
## Getting Slack notifications from Sleuth
With the Slack integration in Sleuth, you can notify your entire team, or just the commit author or PR initiator, of a code change. This includes feature flag changes.
To learn more, read [Sleuth’s documentation](https://help.sleuth.io/integrations-1/slack).
The Sleuth Slack integration works independently from the LaunchDarkly Slack integration. If you use both, you may receive notifications from both Sleuth and LaunchDarkly about flag activity.
To learn more about the LaunchDarkly Slack integration, read [Slack](/docs/integrations/slack).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs