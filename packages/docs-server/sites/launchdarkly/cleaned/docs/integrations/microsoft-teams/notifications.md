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
 * [Subscribe to flag notifications](#subscribe-to-flag-notifications)
 * [Create a subscription in Microsoft Teams](#create-a-subscription-in-microsoft-teams)
 * [Subscribe with keyword arguments](#subscribe-with-keyword-arguments)
 * [Subscribe with positional arguments](#subscribe-with-positional-arguments)
 * [Manage subscriptions](#manage-subscriptions)
 * [View flag change notifications in Microsoft Teams](#view-flag-change-notifications-in-microsoft-teams)
## Overview
This topic explains how to receive notifications in Microsoft Teams when someone changes a feature flag that you have subscribed to notifications for.
To use this feature, you must have installed and configured the LaunchDarkly Microsoft Teams app. To learn more, read [Setting up the Microsoft Teams app](/docs/integrations/microsoft-teams/setting-up).
## Subscribe to flag notifications
You can subscribe to updates for flags, segments, metrics, projects, or environments. When someone updates a resource LaunchDarkly sends a notification of the change to all channels subscribed to updates for that resource.
There are two ways to subscribe to flag notifications:
 * Follow a specific flag in LaunchDarkly. To learn more, read [Follow flags](/docs/home/flags/list#follow-flags).
 * Create a subscription in Microsoft Teams.
### Create a subscription in Microsoft Teams
You can create a subscription using the `subscribe` command with keyword arguments, or using the `subscribe` command with positional arguments. We recommend using keyword arguments. To view more information and examples of the subscribe command, run `@launchdarkly help subscribe` in a channel or direct message that the LaunchDarkly bot is in.
#### Subscribe with keyword arguments
You can use keyword arguments to create a subscription with any combination of parameters. At least one parameter is required.
Here’s how:
 1. Open the Microsoft Teams channel you want notifications in.
 2. Run `@launchdarkly subscribe` and pass in any combination of the following arguments:
 * `-p` or `--project=`
 * `-e` or `--environment=`
 * `-f` or `--flag_key=`
 * `-s` or `--status=`
 * `-a` or `--action=`
 * `-t` or `--tag=`
 3. Press **Enter**.
For example, the following command creates a subscription for all flags in the `qa` environment of the `chatbot` project, with status `active` and tag `production`:
Example subscription with keyword arguments
```
$
| @launchdarkly subscribe -p chatbot -e qa -s active -t production
---|--- 
```
### Subscribe with positional arguments
You can use positional arguments to create a subscription for a single flag. You must provide all three arguments.
Here’s how:
 1. Open the Microsoft Teams channel you want notifications in.
 2. Run `@launchdarkly subscribe` and provide in order the project, environment, and flag key of the flag you would like to subscribe to.
 3. Press **Enter**.
For example, the following command creates a subscription for the `chat-response` flag in the `qa` environment of the `chatbot` project:
Example subscription with positional arguments
```
$
| @launchdarkly subscribe chatbot qa chat-response
---|--- 
```
## Manage subscriptions
You can view and remove subscriptions in a Teams channel using the `@launchdarkly list` command:
 1. Open the Teams channel where you would like to remove notifications.
 2. Type `@launchdarkly list` and press **Enter**. A list of subscriptions for the channel appears.
 3. Locate the subscription you wish to remove from the channel.
 4. Click **Delete**.
## View flag change notifications in Microsoft Teams
Flag change notifications appear in the Microsoft Teams app.
Here’s how to view them:
 1. In Microsoft Teams, open a chat window with LaunchDarkly.
![A flag notification message in Microsoft Teams.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/135c170973bbd4dde6b95e8f4730743c680ed6fe17ec4040fbc68dd56999c1ee/assets/images/__third_party/teams-ld-flag-notification.png)
A flag notification message in Microsoft Teams.
 * Click the flag name after “Feature flag:” to open the flag in LaunchDarkly.
 * Click **View flag details** to view more information about the flag.
 * Click **Unfollow changes** to stop receiving notifications for the flag. This will also unfollow the flag in LaunchDarkly.
![The flag details screen in Microsoft Teams.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/1261aa5cc0cd774fdb774c85e0f5a58bc902d987912e3bcb860ef2fa441463cb/assets/images/__third_party/teams-ld-flag-details.png)
The flag details screen in Microsoft Teams.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs