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
 * [Create a Slack incoming hook](#create-a-slack-incoming-hook)
 * [Add a policy filter](#add-a-policy-filter)
 * [Disable a Slack incoming webhook](#disable-a-slack-incoming-webhook)
## Overview
This topic explains how to use the Slack webhook integration to set up [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks) to receive any activities in LaunchDarkly. When you change something in LaunchDarkly, for example, when you update a feature flag, update a segment, or invite a new account member, LaunchDarkly sends an incoming webhook to Slack.
##### New Slack app is now available
LaunchDarkly has developed a [new Slack app](/docs/integrations/slack) which is more powerful and easier to use than the Slack webhooks integration.
The content below describes the older webhook-based integration.
## Create a Slack incoming hook
First, create an incoming hook in Slack. To do this:
 1. Navigate to the [Incoming Webhooks](https://my.slack.com/services/new/incoming-webhook/) page in Slack.
 2. Select a Slack channel.
 3. Click **Add Incoming WebHooks integration** :
![The Incoming Webhooks page.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/0a83b0a40413c03609b17781d1538372d5379a99e25c2a0a652aec8e4f453b25/assets/images/__third_party/slack-webhooks-add.png)
The Incoming Webhooks page.
 1. Copy and save the Webhook URL.
Then, set up the integration in LaunchDarkly. To do this:
 1. In LaunchDarkly, click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Integrations** and find the “Slack incoming webhooks” integration.
 3. Click **Add integration**.
 4. Enter a **Name** for the webhook.
 5. In the **URL** field, enter the webhook URL you saved from step 4 in the previous procedure.
 6. (Optional) Click **+ Add statement** to add a policy filter, or click **Advanced editor**.
 7. Click **Save incoming webhook**.
### Add a policy filter
LaunchDarkly sends all flag change events in the production environment to a webhook by default. To customize the events LaunchDarkly sends to your Slack channel, use the policy editor in the webhook creation panel. To learn more about creating a policy, read [Example roles and policies](/docs/home/account/roles/example-roles).
For example, if you want to receive an event only when a change is made to one of your production feature flags, you can add the following policy to the webhook integration:
Policy
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
| "resources": ["proj/*:env/production:flag/*"]
6
| }
7
| ]
```
## Disable a Slack incoming webhook
To temporarily disable a Slack incoming webhook:
 1. Navigate to the **Integrations** page and find “Slack incoming webhooks.”
 2. Click the **expand arrow** to display all of the configured webhooks.
![The expand arrow for an integration.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/d04c1f7f89e64fc2f3cc661950c6c8a4aa7cf3d5d9543b752b0b3ff96ebb93ab/assets/images/auto/manage-integrations-expand-arrow-callout.auto.png)
The expand arrow for an integration.
 1. Click the **pencil** icon next to the webhook you want to disable. The “Edit Slack incoming webhook” panel appears.
 2. Toggle the switch **Off**.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs