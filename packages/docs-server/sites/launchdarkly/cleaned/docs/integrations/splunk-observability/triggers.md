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
 * [Connect a flag trigger to Splunk Observability Cloud](#connect-a-flag-trigger-to-splunk-observability-cloud)
##### Flag triggers are available to customers on select plans
Flag triggers are only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
##### Splunk Observability Cloud was formerly SignalFx
Splunk Observability Cloud used to be called SignalFx. Some features of Splunk Observability Cloud, such as API endpoints, still reference SignalFx.
## Overview
This topic explains how to use LaunchDarkly’s trigger feature with Splunk Observability Cloud. For example, you can create an alert in Splunk Observability Cloud that toggles a flag’s targeting on or off if a performance metric drops below a certain threshold.
## Prerequisites
In order to complete this topic, you must meet the following prerequisites:
 * You must have a feature flag with a trigger. To learn more about creating triggers, read [Creating flag triggers](/docs/home/releases/triggers-create).
 * You must have access to the trigger’s URL. To learn more about accessing trigger URLs, read [Flag trigger security](/docs/home/releases/triggers#flag-trigger-security).
 * You must have an existing [Splunk Observability Cloud](https://docs.splunk.com/Observability/) account.
## Connect a flag trigger to Splunk Observability Cloud
Connecting a LaunchDarkly trigger to Splunk Observability Cloud requires three steps:
 1. Create a webhook in Splunk Observability Cloud with your trigger URL
 2. Create a webhook integration
 3. Add a webhook integration as a detector alert Recipient
To learn how to create and add a webhook, read [Send alert notifications to a webhook using Splunk Observability Cloud](https://docs.splunk.com/Observability/admin/notif-services/webhook.html#send-alert-notifications-to-a-webhook-using-splunk-observability-cloud).
To learn more about webhook integrations, read Splunk’s developer guide about [Webhook integrations](https://dev.splunk.com/observability/docs/integrations/#Webhook-integration).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs