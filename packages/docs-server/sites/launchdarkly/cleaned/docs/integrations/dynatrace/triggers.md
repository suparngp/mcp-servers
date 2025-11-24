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
 * [Connect a LaunchDarkly trigger to Dynatrace](#connect-a-launchdarkly-trigger-to-dynatrace)
 * [Create a custom alerting profile in Dynatrace](#create-a-custom-alerting-profile-in-dynatrace)
 * [Create a webhook in Dynatrace with a JSON template](#create-a-webhook-in-dynatrace-with-a-json-template)
##### Flag triggers are available to customers on select plans
Flag triggers are only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to use LaunchDarkly’s triggers feature with Dynatrace. For example, you can create an alert in Dynatrace that uses a LaunchDarkly trigger to toggle a flag’s targeting on or off when Dynatrace triggers a predefined or custom event.
We recommend specifying a custom Dynatrace alerting profile for your triggers. This ensures that the scope of events that send a webhook to your LaunchDarkly trigger is correct. To learn more about how to create custom alerting profiles, read [Dynatrace’s documentation on alerting profiles](https://docs.dynatrace.com/docs/analyze-explore-automate/notifications-and-alerting/alerting-profiles).
To learn more about how Dynatrace uses triggers, read [Dynatrace’s documentation on webhooks](https://docs.dynatrace.com/docs/analyze-explore-automate/notifications-and-alerting/problem-notifications/webhook-integration).
## Prerequisites
In order to complete this topic, you must meet the following prerequisites:
 * You must have a feature flag with a “Dynatrace” trigger type. To learn how to create one, read [Creating flag triggers](/docs/home/releases/triggers-create).
 * You must have access to the trigger’s URL. To learn more about accessing trigger URLs, read [Flag trigger security](/docs/home/releases/triggers#flag-trigger-security).
 * You must have an existing [Dynatrace](https://www.dynatrace.com/) account.
## Connect a LaunchDarkly trigger to Dynatrace
In order to configure a LaunchDarkly trigger in Dynatrace, you must perform two steps:
 1. Create an [alerting profile](https://docs.dynatrace.com/docs/analyze-explore-automate/notifications-and-alerting/alerting-profiles) in Dynatrace to determine what Dynatrace events you want associated with your trigger, and
 2. Create a webhook in Dynatrace that includes a custom JSON template that specifies your trigger URL and alerting profile.
### Create a custom alerting profile in Dynatrace
##### Create a custom alerting profile in Dynatrace to associate with your trigger
We strongly recommend that you use a custom alerting profile. Alerting profiles specify what Dynatrace event or set of events will invoke the webhook. In the absence of a user-specified alerting profile, Dynatrace’s default alerting profile sends a webhook to LaunchDarkly for all Dynatrace events.
To create a custom alerting profile:
 1. Log in to Dynatrace.
 2. Create a new alerting profile that filters for the specific events you want to be associated with your LaunchDarkly trigger. To learn more, read [Dynatrace’s Alerting profiles documentation](https://docs.dynatrace.com/docs/analyze-explore-automate/notifications-and-alerting/alerting-profiles).
 3. Give the alerting profile a human-readable **Name**.
 4. Click **Done** in the top right-hand corner of the page.
### Create a webhook in Dynatrace with a JSON template
To display event details associated with the invocation of a LaunchDarkly trigger, you must configure a JSON template when you set up the webhook in Dynatrace.
To configure the template:
 1. Create a new webhook in Dynatrace. To learn how, read [Dynatrace’s Webhook integration documentation](https://docs.dynatrace.com/docs/analyze-explore-automate/notifications-and-alerting/problem-notifications/webhook-integration).
 2. Paste the LaunchDarkly trigger URL into the **Webhook URL** field.
 3. Copy this payload into the **Custom payload** field in Dynatrace:
JSON
```
1
| {
---|--- 
2
| "title": "{ProblemTitle}",
3
| "url": "{ProblemURL}"
4
| }
```
##### You must customize the payload to render LaunchDarkly change histories correctly
LaunchDarkly uses the payload `title` and `url` fields to create the main body of trigger change history entries. If you use a different JSON template than the one provided above, you must include the `title` and `url` fields or the trigger will not save useful data about the event in the flag’s change history. The `url` is the URL of your Dynatrace event.
 1. Select your pre-configured alerting profile from the **Alerting profile** menu.
 2. Click **Send test notification**. If the integration was successful, a “Custom Integration test successful” message appears.
 3. Return to the LaunchDarkly flag’s Settings page and verify that the test notification has arrived. To do this, click on the trigger’s overflow menu confirm that the execution count has incremented.
 4. Return to Dynatrace and click **Save changes**.
Your new Dynatrace webhook now triggers flag changes based on the action you specified in LaunchDarkly.
For more granular problem detection and alerting, you may want to explore static thresholds in Dynatrace’s custom alerting settings. To learn more, read [Dynatrace’s Static thresholds documentation](https://docs.dynatrace.com/docs/discover-dynatrace/platform/davis-ai/anomaly-detection/concepts/static-thresholds).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs