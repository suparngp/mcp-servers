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
 * [Option 1: Use Event Orchestration routing rules (recommended)](#option-1-use-event-orchestration-routing-rules-recommended)
 * [Option 2: Add the LaunchDarkly integration to a PagerDuty service](#option-2-add-the-launchdarkly-integration-to-a-pagerduty-service)
 * [Configure the PagerDuty integration in LaunchDarkly](#configure-the-pagerduty-integration-in-launchdarkly)
##### The PagerDuty for guarded rollouts integration is available to customers on select plans
PagerDuty for guarded rollouts is available to customers on a Guardian plan. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to use the LaunchDarkly PagerDuty integration for [guarded rollouts](/docs/home/releases/guarded-rollouts).
You can use guarded rollouts to notify you or automatically roll back changes that have a negative effect on your app’s performance. The PagerDuty integration for guarded rollouts lets you send alerts to PagerDuty when LaunchDarkly detects a regression, and resolve incidents when a rollout is rolled back.
There are two ways to route alerts to the correct service in PagerDuty: by using PagerDuty’s Event Orchestration, or by adding the integration directly to the service.
### Option 1: Use Event Orchestration routing rules (recommended)
We recommend using Event Orchestration routing rules. This option lets you:
 * Route to different services based on alert content (works with any PagerDuty license level)
 * Use one configuration on the PagerDuty side for multiple LaunchDarkly projects
 * Assign different severity based on content (requires PagerDuty AIOps)
 * Change severity based on other factors inside of your PagerDuty environment (requires PagerDuty AIOps)
 * Use dynamic routing based on content (requires PagerDuty AIOps)
To learn more, read [PagerDuty’s documentation on Event Orchestration and how to set it up](https://support.pagerduty.com/main/docs/event-orchestration#step-1-create-an-orchestration).
After you set up Event Orchestration to route events to your PagerDuty services, you can copy the integration key from the Integrations section of this Event Orchestration. You need this integration key to configure the integration in LaunchDarkly.
### Option 2: Add the LaunchDarkly integration to a PagerDuty service
In PagerDuty, add the LaunchDarkly integration to a PagerDuty service by following the instructions at [Add integrations to an existing service](https://support.pagerduty.com/main/docs/services-and-integrations#add-integrations-to-an-existing-service). After you have added the integration, copy the Integration key to use in the next step.
You need to add the LaunchDarkly integration to a PagerDuty service only once, even if you are configuring multiple integrations to target that service in LaunchDarkly.
## Configure the PagerDuty integration in LaunchDarkly
To set up the integration, you must first obtain an Integration Key from PagerDuty, then configure the integration in LaunchDarkly.
To configure the PagerDuty for guarded rollouts integration in LaunchDarkly:
 1. Click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Integrations** and “PagerDuty - Guardian Edition.”
 3. Click **Add integration**. The “Create PagerDuty configuration” panel appears.
 4. Give the integration a human-readable **Name**.
 5. Add the **PagerDuty integration key** you copied from the previous step.
 6. (Optional) If you want to send events to PagerDuty from a specific environment only, select an environment in the **Project and environment filters** menu.
 7. Select event types in the **Events filter** to send to PagerDuty:
 * **Measured rollout regression detected** : PagerDuty alerts you when a regression is detected on a rollout.
 * **Measured rollout reverted** : PagerDuty resolves any related incidents when a rollout is manually or automatically rolled back.
 1. Select a PagerDuty **Severity** level for the LaunchDarkly events you receive in PagerDuty. To learn more, read [Dynamic Notifications](https://support.pagerduty.com/main/docs/dynamic-notifications).
 2. After reading the Terms and Conditions, check the **I have read and agree to the Integration Terms and Conditions** checkbox.
 3. Click **Save configuration**.
Your PagerDuty instance now receives events from LaunchDarkly.
Alert events will include the `projKey`, `envKey`, `flagKey`, and `tags` for the flag, which can be used to correctly route alerts. Here’s an example payload for an alert sent to PagerDuty from LaunchDarkly:
Example payload for an alert sent to PagerDuty
```
1
| {
---|--- 
2
| "client": null,
3
| "client_url": null,
4
| "contexts": [
5
| {
6
| "href": "https://app.launchdarkly.com/default/test/features/pagerduty-test-flag#defaultrule",
7
| "text": "Go to LaunchDarkly",
8
| "type": "link"
9
| }
10
| ],
11
| "description": "Regression detected for measured rollout on flag PagerDuty Test Flag",
12
| "event_type": "trigger",
13
| "incident_key": "default:test:pagerduty-test-flag",
14
| "service_key": "123456789",
15
| "details": {
16
| "envKey": "test",
17
| "flagKey": "pagerduty-test-flag",
18
| "projKey": "default",
19
| "tags": [
20
| "test",
21
| "pagerduty"
22
| ]
23
| }
24
| }
```
You must configure a separate PagerDuty integration in LaunchDarkly for each LaunchDarkly environment you want to send events to PagerDuty from.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs