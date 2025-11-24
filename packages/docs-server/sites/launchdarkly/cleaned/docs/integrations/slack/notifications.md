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
 * [Subscribe to notifications](#subscribe-to-notifications)
 * [Subscribe using the modal](#subscribe-using-the-modal)
 * [Subscribe using the command](#subscribe-using-the-command)
 * [Subscribe with keyword arguments](#subscribe-with-keyword-arguments)
 * [Subscribe with positional arguments](#subscribe-with-positional-arguments)
 * [Manage subscriptions](#manage-subscriptions)
 * [Notification information](#notification-information)
 * [Receive approval request notifications](#receive-approval-request-notifications)
## Overview
This topic explains how to subscribe to notifications in Slack channels. You can receive notifications when resources are created, updated, deleted, or are ready for removal.
It can be useful to let an entire channel know when a flag changes or is ready to remove. You can receive notifications when someone toggles a flag’s targeting on or off, when someone creates new resources in a certain environment, and when flags are ready for removal from your codebase.
## Subscribe to notifications
You can subscribe to updates for [flags](/docs/home/flags/create), [metrics](/docs/home/metrics), [projects](/docs/home/account/project), or [environments](/docs/home/account/environment). When someone updates a resource or when an [alert](/docs/home/observability/alerts) is triggered, either directly in LaunchDarkly or through the Slack app, LaunchDarkly sends a notification to all channels subscribed to updates for that resource. Subscriptions must have a project, and can optionally include parameters like a specific environment, flag name, status, or tag that will filter the notifications you receive.
There are two ways to create a subscription to flag notifications: the Slack modal workflow or the `/launchdarkly subscribe` command. Subscriptions created through the modal must specify a project and environment.
### Subscribe using the modal
To subscribe using the modal:
 1. Open the Slack channel you want notifications in.
 * After you [set up the Slack app](/docs/integrations/slack/setting-up), you can subscribe to notifications in any public Slack channel.
 * If you want notifications in a private Slack channel, you must add the Slack app to the channel explicitly. Click the **Integrations** tab in the private channel. Then select **Add app**.
 1. Type `/launchdarkly subscribe` in your Slack client’s text bar and press **Enter**. The “Create subscription” dialog appears.
![The create subscription dialog.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a04ca14c3bd9e788188258446f4311ea02e7ec7afefb4120b852b09a9b7e58a5/assets/images/__third_party/slack-project-select-modal.png)
The create subscription dialog.
 1. Select the project and environment you’d like to receive notifications for.
 2. (Optional) You can further refine your subscription defining specific flag, status, action, or tag. You can use `*` as a wildcard in your flag key. You’ll only receive updates for flags that match these parameters.
![The modal to select subscription parameters.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/dd42337a9d5775524be898663708a7b0d3096fc421e20b5ce0b356d2c3dfb2f9/assets/images/__third_party/slack-subscription-parameter-select-modal.png)
The modal to select subscription parameters.
 1. Click **Preview** to view the list of flags that your parameters include.
 2. Click **Create subscription** to subscribe the channel to flag notifications. A confirmation message appears in the channel after you close the dialog.
### Subscribe using the command
There are two ways to subscribe to updates using the command: with keyword arguments (recommended), or with positional arguments. To view more information and examples of the subscribe command, run `/launchdarkly help subscribe` in a channel that the LaunchDarkly bot is in.
#### Subscribe with keyword arguments
You can use keyword arguments to create a subscription with any combination of parameters. At least one parameter is required.
Here’s how:
 1. Open the Slack channel you want notifications in.
 * After you [set up the Slack app](/docs/integrations/slack/setting-up), you can subscribe to notifications in any public Slack channel.
 * If you want notifications in a private Slack channel, you must add the Slack app to the channel explicitly. Click the **Integrations** tab in the private channel. Then select **Add app**.
 1. Run `/launchdarkly subscribe` and pass in any combination of the following arguments:
 * `-p` or `--project=`
 * `-e` or `--environment=`
 * `-f` or `--flag_key=`
 * `-s` or `--status=`
 * `-a` or `--action=`
 * `-t` or `--tag=`
 2. Press **Enter**.
For example, the following command creates a subscription for all flags in the `qa` environment of the `chatbot` project, with status `active` and tag `production`:
Example subscription with keyword arguments
```
$
| /launchdarkly subscribe -p chatbot -e qa -s active -t production
---|--- 
```
### Subscribe with positional arguments
You can use positional arguments to create a subscription for a single flag. You must provide all three arguments.
Here’s how:
 1. Open the Slack channel you want notifications in.
 * After you [set up the Slack app](/docs/integrations/slack/setting-up), you can subscribe to notifications in any public Slack channel.
 * If you want notifications in a private Slack channel, you must add the Slack app to the channel explicitly. Click the **Integrations** tab in the private channel. Then select **Add app**.
 1. Run `/launchdarkly subscribe` and provide in order the project, environment, and flag key of the flag you would like to subscribe to.
 2. Press **Enter**.
For example, the following command creates a subscription for the `chat-response` flag in the `qa` environment of the `chatbot` project:
Example subscription with positional arguments
```
$
| /launchdarkly subscribe chatbot qa chat-response
---|--- 
```
## Manage subscriptions
You can view and remove subscriptions in a Slack channel using the `/launchdarkly list` command:
 1. Open the Slack channel where you would like to remove notifications.
 2. Type `/launchdarkly list` and press **Enter**. A list of subscriptions for the channel appears.
 3. Locate the subscription you wish to remove from the channel.
 4. Click **Remove**.
![The output of the /launchdarkly list command.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/eacd313bb1f4c2b75f686a4b0ff4a06383ad40b4815a9a881d3cb639a837e598/assets/images/__third_party/slack-manage-subscriptions.png)
The output of the `/launchdarkly list` command.
## Notification information
Flag notifications include the following information:
 * The name of the person who made the change
 * The name of the flag
 * The environment, project, and key of the flag
 * A comment about the change, if applicable
To display additional information about the flag change, click **View details**.
The table below explains the different subscription parameters:
Subscription parameters | Required | Description 
---|---|--- 
Project | Required | All subscriptions must include a project and environment to get flag notifications for. 
Environment | Optional, but required in modal creation | All subscriptions must include a project and environment to get flag notifications for. 
Flag key | Optional | A flag key to get notifications for, which can begin or end with a wildcard * to include all matching flag keys. 
Status | Optional | Filter by flag status. Available statuses are:
 * Any
 * Active
 * Inactive
 * Archived
 * Launched
 * New
To learn more, read [Flag statuses and lifecycle stages](/docs/home/flags/flag-status). 
Action | Optional | Filter by action. Available actions are:
 * Any
 * Created
 * Updated
 * Deleted
 * Ready for removal
 * New
Flag tag | Optional | Filter by a list of all flag tags. Does not include other types of tags, such as segment tags. 
## Receive approval request notifications
##### Approvals is available to customers on select plans
Approvals are only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
Requiring approvals by environment is available only to customers on an Enterprise plan. To learn more, read [Configuring approvals for an environment](/docs/home/releases/approval-config).
If your organization uses release management tools and the Slack app, you receive a direct message in Slack when someone requests an approval from you, or when an approval request you made is approved, denied, or receives a comment.
You cannot interact with an approval from these notifications. They are indicators that you should log into LaunchDarkly and review your approval requests.
To learn more about approval requests, read [Approvals](/docs/home/releases/approvals).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs