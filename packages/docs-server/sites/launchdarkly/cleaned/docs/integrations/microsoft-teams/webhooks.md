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
 * [Set up a workflow in Microsoft Teams](#set-up-a-workflow-in-microsoft-teams)
 * [Configure LaunchDarkly to work with Teams](#configure-launchdarkly-to-work-with-teams)
## Overview
This topic explains how to use the LaunchDarkly Microsoft Teams incoming webhooks integration.
The Microsoft Teams incoming webhooks integration sends you alerts when the LaunchDarkly resources you care about, such as feature flags, projects, and account members, change. This notification appears in your Teams space.
## Set up a workflow in Microsoft Teams
To add LaunchDarkly to a Teams workspace, you must configure an incoming webhook by setting up a workflow within Microsoft Teams. Then, add the webhook URL to LaunchDarkly.
 1. Log into Microsoft Teams.
 2. Select **More options** next to the channel or chat you want to create a workflow for, and then select **Workflows**.
 3. Configure an incoming webhook and create a webhook URL. To learn how, follow the instructions in [Microsoft’s documentation](https://support.microsoft.com/en-gb/office/post-a-workflow-when-a-webhook-request-is-received-in-microsoft-teams-8ae491c7-0394-4861-ba59-055e33f75498).
 4. Copy the provided webhook URL to your clipboard and click **Save**.
##### Webhooks configured with Connectors will continue to function
Previously you could configure an incoming webhook by setting up Connectors within Microsoft Teams. Microsoft is deprecating Connectors in favor of workflows, and you can no longer create new Connectors within Microsoft Teams. However, webhooks that you previously created with Connectors will continue to work through December 2025. To learn more, read Microsoft’s documentation on [Retirement of Office 365 connectors within Microsoft Teams](https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/).
## Configure LaunchDarkly to work with Teams
To configure LaunchDarkly to connect with the Microsoft Teams webhook:
 1. In LaunchDarkly, click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Integrations** and find “Microsoft Teams”.
 3. Click **Add integration**. The “Create Microsoft Teams configuration” panel appears.
 4. Paste your **Incoming webhook URL** into the field.
 5. Set any filters for sending notifications to Teams by configuring a policy. LaunchDarkly sends all flag change events in the production environment to Teams by default. To learn more about creating a policy, read [Example roles and policies](/docs/home/account/roles/example-roles).
 6. Save your configuration.
You are now notified in your Teams workspace when someone updates a flag.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs