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
 * [Connect a flag trigger to Datadog](#connect-a-flag-trigger-to-datadog)
 * [Set up a JSON template in Datadog](#set-up-a-json-template-in-datadog)
 * [Connect the webhook to a Datadog event](#connect-the-webhook-to-a-datadog-event)
 * [Test the trigger configuration](#test-the-trigger-configuration)
 * [Grant minimal API access for custom roles](#grant-minimal-api-access-for-custom-roles)
 * [Example custom role policies](#example-custom-role-policies)
##### Flag triggers are available to customers on select plans
Flag triggers are only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to use LaunchDarkly’s trigger feature with Datadog. For example, you can create an alert in Datadog that toggles a flag’s targeting on or off if a performance metric drops below a certain threshold.
We recommend using flag triggers for Datadog alerts only, not recovery alerts. If you connect a trigger to recovery alerts, the trigger activates on recovery as well as on alert.
To learn more about configuring your webhook without recovery alerts, read [Connect the webhook to a Datadog event](/docs/integrations/datadog/triggers#connect-the-webhook-to-a-datadog-event).
## Prerequisites
In order to complete this topic, you must meet the following prerequisites.
 * You must have a feature flag with a trigger. To learn more about creating triggers, read [Creating flag triggers](/docs/home/releases/triggers-create).
 * You must have access to the trigger’s URL, which you copied and saved during the trigger creation process. To learn more, read [Flag trigger security](/docs/home/releases/triggers#flag-trigger-security).
 * You must have an existing [Datadog](https://www.datadoghq.com/) account.
## Connect a flag trigger to Datadog
Connecting a LaunchDarkly trigger to Datadog takes two steps.
You must:
 1. Create a webhook in Datadog that includes a custom JSON template with your trigger URL, and
 2. Connect that webhook to a Datadog alert.
### Set up a JSON template in Datadog
First you must configure a JSON template to use the LaunchDarkly trigger.
To configure the template:
 1. Log in to Datadog.
 2. Navigate to **Integrations** and search for the **Webhooks** section.
 3. Create a new webhook based on the **Installation** instructions and paste the LaunchDarkly trigger URL into the URL field.
 4. Copy this Datadog payload into the configuration field in Datadog:
JSON
```
1
| {
---|--- 
2
| "title": "$EVENT_TITLE",
3
| "url": "$LINK"
4
| }
```
##### You must customize the payload to view trigger details in LaunchDarkly
The only payload keys LaunchDarkly processes are `title` and `url`. Any other fields you put in the payload do not appear in LaunchDarkly.
If you use a different JSON template than the one provided above, you must include the `title` and `url` fields or the trigger will not save useful data about the event in the flag’s change history. The `url` is the URl of your Datadog event.
 1. Click **Save**.
### Connect the webhook to a Datadog event
After you create the webhook in Datadog, you must connect it to an event in order for the LaunchDarkly trigger to perform actions on the flag.
 1. Navigate to **Monitors**.
 2. Choose the **Alert** you wish to connect to the trigger and add the webhook you created earlier to that alert.
If you don’t want Datadog to trigger when the alert recovers, wrap the webhook in the following template expression:
Expression
```
1
| `{{#is_alert}} @webhook-<YOUR_WEBHOOK_NAME> {{/is_alert}}`
---|--- 
```
 3. Click **Save.**
 4. In the Datadog metric alert you want to activate the flag trigger, add `@webhook-<YOUR_WEBHOOK_NAME>`.
## Test the trigger configuration
After you create a trigger in Datadog, you can verify that it has connected to LaunchDarkly correctly.
To test the trigger:
 1. Navigate to Datadog and find the metric alert to which you added the webhook.
 2. Click **Test Notifications** at the bottom of the page.
 3. Select any single notification and click **Run Test**. This sends a test event to LaunchDarkly.
 4. Navigate back to the flag’s [environment-specific settings](/docs/home/flags/flag-settings) page in LaunchDarkly.
 5. Click the **overflow menu** on your LaunchDarkly trigger to confirm that the execution count has incremented. Sending a test notification does not trigger the flag action, so don’t worry that you might toggle a flag by testing the configuration.
Your configuration details may vary based on your requirements.
To learn more about how Datadog handles webhooks, read [Datadog’s documentation](https://docs.datadoghq.com/integrations/webhooks/).
## Grant minimal API access for custom roles
To improve security and limit access, assign a role that grants only the permissions required by the Datadog App Builder integration. This integration only needs to toggle a feature flag’s targeting. To achieve this, the role must allow the [`updateOn` action](/docs/home/account/roles/role-actions#feature-flag-actions).
The `updateOn` action grants the App Builder integration permission to toggle the state of your feature flags to `on` or `off` when a trigger fires.
### Example custom role policies
Here are some example custom role policies:
 * A policy that permits the integration to perform only the `updateOn` action on the specified resource:
Allow updateOn on a specified resource
```
1
| [
---|--- 
2
| {
3
| "effect": "allow",
4
| "actions": ["updateOn"],
5
| "resources": ["proj/PROJECT-KEY:env/ENVIRONMENT-KEY:flag/FLAG-KEY"]
6
| }
7
| ]
```
 * A policy that permits the integration to perform only the `updateOn` action on all flags in a specific environment:
Allow updateOn on all flags in a specified resource
```
1
| [
---|--- 
2
| {
3
| "effect": "allow",
4
| "actions": ["updateOn"],
5
| "resources": ["proj/PROJECT-KEY:env/ENVIRONMENT-KEY:flag/*"]
6
| }
7
| ]
```
To learn more about creating and managing roles, read [Roles](/docs/home/account/roles).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs