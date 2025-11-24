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
 * [Connect a flag trigger to Honeycomb](#connect-a-flag-trigger-to-honeycomb)
 * [Create an integration in Honeycomb](#create-an-integration-in-honeycomb)
 * [Make a Honeycomb trigger and associate it with the integration](#make-a-honeycomb-trigger-and-associate-it-with-the-integration)
##### Flag triggers are available to customers on select plans
Flag triggers are only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to use LaunchDarkly’s triggers feature with Honeycomb. For example, you can create an alert in Honeycomb that uses a trigger to toggle a flag’s targeting on or off if a performance metric drops below a certain threshold.
To learn more about how Honeycomb uses triggers, read [Honeycomb’s documentation](https://docs.honeycomb.io/working-with-your-data/triggers/).
## Prerequisites
In order to complete this topic, you must meet the following prerequisites.
 * You must have a feature flag with a trigger. To learn more about creating triggers, read [Creating flag triggers](/docs/home/releases/triggers-create).
 * You must have access to the trigger’s URL, which you copied and saved during the trigger creation process. To learn more, read [Triggers](/docs/home/releases/triggers).
 * You must have an existing [Honeycomb](https://www.honeycomb.io/) account.
## Connect a flag trigger to Honeycomb
##### Honeycomb triggers and LaunchDarkly triggers are two different terms
Honeycomb uses similar nomenclature to LaunchDarkly when describing actions controlled by webhooks and third-party tools. However, a trigger in Honeycomb is not synonymous as a trigger in LaunchDarkly.
In this topic, we distinguish between the two triggers with the labels “Honeycomb trigger” and “LaunchDarkly trigger.”
To connect a LaunchDarkly trigger to your Honeycomb account, you must perform two actions:
 1. Create an integration in Honeycomb that includes your LaunchDarkly trigger, and
 2. Make a Honeycomb trigger based on configuration you specify that uses the LaunchDarkly trigger to perform flag actions.
Both actions are documented below.
### Create an integration in Honeycomb
 1. Log into Honeycomb.
 2. Click your username, and then click **Team settings**.
 3. Click into the **Integrations** tab.
 4. In the “Trigger Recipients” section, click **Add integration**.
 5. In the “Provider” section, choose “Webhook” as the type of integration you want to configure.
 6. Give your webhook a human-readable **Name**.
 7. Paste the LaunchDarkly trigger URL into the **Webhook URL** field.
 8. Enter any text into the **Shared secret** field.
 9. Click **Add.**
### Make a Honeycomb trigger and associate it with the integration
Now you must associate the integration you created with a Honeycomb trigger.
 1. Navigate to the query you want to connect to a LaunchDarkly trigger.
 2. Click the **overflow menu**.
 3. Choose “Make trigger.”
 4. Give your trigger a human-readable **Name**.
 5. Make any configuration you need until you get to the “Recipients” section.
 6. In the “Recipients” section, click **Add Recipient** and choose “Webhook — [Your webhook’s name]” from the menu.
 7. Verify your information and click **Add**.
 8. Click **Create trigger**.
Now alerts in your Honeycomb account will trigger feature flags in LaunchDarkly.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs