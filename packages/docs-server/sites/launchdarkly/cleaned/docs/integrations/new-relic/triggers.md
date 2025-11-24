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
 * [Connect a flag trigger to New Relic One](#connect-a-flag-trigger-to-new-relic-one)
 * [Set up a JSON template in New Relic One](#set-up-a-json-template-in-new-relic-one)
 * [Connect the webhook to a New Relic One policy](#connect-the-webhook-to-a-new-relic-one-policy)
 * [Test the trigger configuration](#test-the-trigger-configuration)
##### Flag triggers are available to customers on select plans
Flag triggers are only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to use LaunchDarkly’s trigger feature with New Relic One. For example, you can create a policy in New Relic One that uses a LaunchDarkly trigger to toggle a flag’s targeting on or off if a performance metric drops below a certain threshold.
## Prerequisites
In order to complete this topic, you must meet the following prerequisites:
 * You must have a feature flag with a trigger. To learn more about creating triggers, read [Creating flag triggers](/docs/home/releases/triggers-create).
 * You must have access to the trigger’s URL, which you copied and saved during the trigger creation process. To learn more, read [Flag trigger security](/docs/home/releases/triggers#flag-trigger-security).
 * You must have an existing [New Relic One](https://one.newrelic.com/) account.
## Connect a flag trigger to New Relic One
Connecting a LaunchDarkly trigger to New Relic One takes two steps.
You must:
 1. Create a webhook-type notification channel in New Relic One with your trigger URL, and
 2. Connect that webhook to a New Relic One policy.
### Set up a JSON template in New Relic One
First you must configure a JSON template to use the LaunchDarkly trigger.
To configure the template:
 1. Log in to New Relic One.
 2. Navigate to “Alerts & AI” and find the “Notification Channels” section in the sidebar.
 3. In the “Notification Channels” section, click **+ New Notification Channel**.
 4. Select **Webhook** as the channel type.
 5. Paste the LaunchDarkly trigger URL into the “Base URL” field.
 6. Click **Create Channel**.
### Connect the webhook to a New Relic One policy
After you create the webhook notification channel in New Relic One, you must connect it to a policy in order for the LaunchDarkly trigger to perform actions on the flag.
 1. Under “Alerts & AI,” navigate to “Policies.”
 2. Select the policy you wish to connect to the trigger.
 3. On the policy’s “Notification channels” tab, add your newly-created webhook channel.
## Test the trigger configuration
After you create a trigger in New Relic One, you can verify that it has connected to LaunchDarkly correctly.
To test the trigger:
 1. Navigate to the configuration for the webhook notification channel you set up in New Relic One.
 2. Click **Send a test notification** at the bottom of the page. A popup with a response code appears.
 3. Navigate back to the flag’s [environment-specific settings](/docs/home/flags/flag-settings) page in LaunchDarkly.
 4. Click on the **overflow menu** on your LaunchDarkly trigger to confirm that the execution count has incremented. Sending a test notification does not trigger the flag action, so don’t worry that you might toggle a flag by testing the configuration.
When the conditions of your policy are met, your flag changes will now be performed.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs