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
 * [Install Sentry](#install-sentry)
 * [Configure the integration](#configure-the-integration)
 * [Set the event key](#set-the-event-key)
 * [Map environments](#map-environments)
 * [Create a LaunchDarkly metric](#create-a-launchdarkly-metric)
 * [Percentage of end users that experienced an error](#percentage-of-end-users-that-experienced-an-error)
 * [Average number of errors per request](#average-number-of-errors-per-request)
 * [Attach LaunchDarkly contexts to Sentry error events](#attach-launchdarkly-contexts-to-sentry-error-events)
 * [Using the integration](#using-the-integration)
##### The Sentry integration is available to customers on select plans
The Sentry integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to use the LaunchDarkly Sentry integration. Sentry is an application performance monitoring and error tracking tool. You can connect Sentry error events to LaunchDarkly to use with LaunchDarkly metrics.
![An installed Sentry integration.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/e2ee328814289f093957e4a9169c659400caa28d34fe5559e57b8edffab2f3f3/assets/images/__LD_UI_no_test/sentry-integration.png)
An installed Sentry integration.
The Sentry integration works with custom conversion binary and custom conversion count metrics. To learn more, read [Metrics](/docs/home/metrics).
To use the Sentry integration, you must complete the following steps:
 1. [Install Sentry](/docs/integrations/sentry#install-sentry)
 2. [Configure the integration](/docs/integrations/sentry#configure-the-integration)
 3. [Create a LaunchDarkly metric](/docs/integrations/sentry#create-a-launchdarkly-metric)
 4. [Attach LaunchDarkly contexts to Sentry error events](/docs/integrations/sentry#attach-launchdarkly-contexts-to-sentry-error-events)
## Install Sentry
To install the Sentry integration:
 1. Log in to LaunchDarkly.
 2. Navigate to the public integrations directory in Sentry’s application.
 3. Click **Install**.
You are redirected to the Sentry integration panel in LaunchDarkly.
## Configure the integration
There are two pieces of configuration required for the Sentry integration to work:
 * setting the event key, and
 * mapping the environments.
### Set the event key
Sentry uses the event key to aggregate events. We recommend using a **Metric event key** of `sentry-errors` or similar, but you can use any event key you like.
![The "Metric event key" section of the integration panel.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/79df0a2bdbce9373a62ec0c3c57d35923ec3bf6e350dd6174954d4c8c6e5e948/assets/images/__LD_UI_no_test/sentry-metric-event-key.png)
The "Metric event key" section of the integration panel.
A LaunchDarkly metric must exist with the designated event key for the integration to work in a given project. If there is not an existing custom metric with the chosen event key, create a custom metric with that event key. To learn how, read [Create a LaunchDarkly metric](/docs/integrations/sentry#create-a-launchdarkly-metric).
When you set a metric event key, a green check mark appears in the integration panel.
##### Event keys and metric keys are different
Sending custom events to LaunchDarkly requires a unique **event key**. You can set the event key to anything you want. Adding this event key to your codebase lets your SDK track actions customers take in your app as events. To learn more, read [Sending custom events](/docs/sdk/features/events).
LaunchDarkly also automatically generates a **metric key** when you create a metric. You only use the metric key to identify the metric in API calls. To learn more, read [Creating and managing metrics](/docs/home/metrics/create-metrics).
### Map environments
Events are specific to one LaunchDarkly environment. The Sentry integration requires you to map Sentry environments to LaunchDarkly environments. This lets you send Sentry errors to different LaunchDarkly environments. For example, you can send errors from your production Sentry environment to your production LaunchDarkly environment, and errors from your staging Sentry environment to your staging LaunchDarkly environment.
To map Sentry environments to LaunchDarkly environments:
 1. Navigate to the Integrations page in LaunchDarkly.
 2. Open the Sentry integration panel.
 3. In the “Environment mappings” section, choose a LaunchDarkly project and environment from the **Project - Environment** menu.
 4. Choose a Sentry project and environment from the **Sentry Project - Environment** menu.
 5. Click **Create**.
The sets of projects and environments are now mapped to each other.
![Sentry environment mappings.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/7a0d833a1f262e6d2edc407218d4189d536f24cd8ccc5aedb9d6431ad03b9853/assets/images/__third_party/sentry-environment-mappings.png)
Sentry environment mappings.
If an environment mapping is highlighted in red, it means that there is no metric for the event key in that LaunchDarkly project.
You can map any number of Sentry project environments to a LaunchDarkly environment. However, you cannot map multiple LaunchDarkly environments to a single Sentry environment.
## Create a LaunchDarkly metric
To create a LaunchDarkly metric, follow the procedure at [Custom conversion binary metrics](/docs/home/metrics/custom) or [Custom conversion count metrics](/docs/home/metrics/custom-count), depending on your needs.
Here are two example metrics we recommend.
### Percentage of end users that experienced an error
To track the percentage of end users that experienced an error, create a custom conversion binary metric by selecting the following options:
 * Event kind: **Custom**
 * Event key: `sentry-errors`
 * What do you want to measure?: **Occurrence**
With the metric definition options:
 * Percentage of **User** units that sent the event,
 * where **Lower is better**
Here is what the metric setup looks like:
![The metric creation dialog.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/970f860eabd84e6a74b1fc4f04cb908398c55131ba2b5b474bf1b5a3052efe1b/assets/images/auto/metric-sentry-user.auto.png)
The metric creation dialog.
### Average number of errors per request
To track the average number of errors per request, create a custom conversion count metric by selecting the following options:
 * Event kind: **Custom**
 * **Event key:** `sentry-errors`
 * What do you want to measure?: **Count**
With the metric definition options:
 * **Average** of event `count`
 * per **Request** ,
 * where **Lower is better**
Here is what the metric setup looks like:
![The metric creation dialog.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/d1bc22a2162f77fa37721447569a9b53627b0ef621f1709189959e621cfa706f/assets/images/auto/metric-sentry-request.auto.png)
The metric creation dialog.
After you create your metrics, return to the Sentry integration configuration panel and set the Sentry integration event key if you have not already done so.
## Attach LaunchDarkly contexts to Sentry error events
##### Sentry custom contexts are not the same as LaunchDarkly custom contexts
Sentry provides functionality called “custom contexts.” These are distinct from LaunchDarkly’s custom contexts. In this section, “custom contexts” refers to the Sentry functionality.
Sentry provides custom contexts which let you attach arbitrary data to a Sentry event. To use the Sentry integration, you must name the Sentry custom context `launchdarklyContext` and then attach LaunchDarkly contexts to error events. To learn how, read Sentry’s [Context docs](https://docs.sentry.io/platforms/go/guides/gin/enriching-events/context/).
You must name the Sentry custom context launchdarklyContext
In Sentry, you must name the Sentry custom context `launchdarklyContext`. If the Sentry custom context is not present or you have named it something else, LaunchDarkly will ignore the error event.
## Using the integration
After you create the environment mappings, set the metric event key, create metrics for your desired projects, and add LaunchDarkly contexts to the Sentry SDK, you can use the metric in LaunchDarkly the same way as any other metric. When you configure a metric to use Sentry errors, error events will flow from Sentry into that metric.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs