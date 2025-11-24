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
 * [Set up the Datadog integration](#set-up-the-datadog-integration)
 * [Filter the events you send to Datadog](#filter-the-events-you-send-to-datadog)
 * [Disable the Datadog integration](#disable-the-datadog-integration)
##### The Datadog events integration is available to customers on select plans
The Datadog events integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to configure and use the LaunchDarkly Datadog events integration.
The Datadog integration lets you set up [Datadog Events](https://docs.datadoghq.com/api/?lang=bash#events) to receive any activity from LaunchDarkly. When something changes, such as a feature flag updates or a new account member is added to LaunchDarkly, LaunchDarkly sends an event to Datadog. Use this integration to correlate and understand how changes to your features in LaunchDarkly impact your app and infrastructure metrics.
## Prerequisites
To connect Datadog to LaunchDarkly, you need an API Key from Datadog.
To generate an API Key:
 1. In Datadog, visit the [API keys page](https://app.datadoghq.com/organization-settings/api-keys).
 2. Click **New Key**. The “New API Key” modal appears. in the “API Keys” section.
 3. Give your API Key a human-readable name and click **Create Key**.
![The Datadog "New API Key" modal configured with a sample name.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/2d52ea0e0ecae4b3f224e8eaa338c565d95b21903ec450b26e94e07701d5e5b2/assets/images/__third_party/datadog-new-api-key.png)
The Datadog "New API Key" modal configured with a sample name.
 1. Click **Copy Key** to copy the API Key to your clipboard. You will need it to set up the Datadog integration in LaunchDarkly.
## Set up the Datadog integration
After you create an API Key in Datadog, you can set up the integration in LaunchDarkly.
To set up the Datadog integration:
 1. Click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Integrations** and find “Datadog.”
 3. Click **Add integration**. The “Create Datadog configuration” panel appears.
 4. (Optional) Give your integration a human-readable **Name**.
 5. Enter the Datadog API Key into the **Datadog API key** field. You created this API Key in the [Prerequisites](/docs/integrations/datadog/events#prerequisites) section.
 6. (Optional) Select your Datadog host URL. [Start a Support ticket](https://support.launchdarkly.com/hc/en-us/requests/new) for assistance if you have a private Datadog instance.
 7. (Optional) Check the **Hide member details** checkbox to exclude member names and emails from the events you send to Datadog.
##### Member details will not be surfaced
When **Hide member details** is checked, member-specific events will not be sent to Datadog.
 1. (Optional) Configure a custom policy to control which events LaunchDarkly sends to Datadog. To learn more, read [Filter the events you send to Datadog](/docs/integrations/datadog/events#filter-the-events-you-send-to-datadog).
 2. After reading the Integration Terms and Conditions, check the **I have read and agree to the Integration Terms and Conditions** checkbox.
 3. Click **Save configuration**.
The new integration appears on the Integrations page. It is switched **On** by default. Events from LaunchDarkly now appear in your Datadog dashboard.
##### Events may not appear immediately
It may take time for changes made in LaunchDarkly to propagate and appear in the Datadog events dashboard depending on Datadog’s polling intervals.
To learn how to confirm that you are using the correct Datadog API key, read the [related article in the LaunchDarkly Customer Knowledge Base](https://support.launchdarkly.com/hc/en-us/articles/15852343397019-Datadog-Error-403-Forbidden).
## Filter the events you send to Datadog
By default, LaunchDarkly sends events to Datadog for changes made to any project, environment, feature flag, and more. If you have a more limited use case for using the integration, or you wish to restrict which data you send to Datadog, you can filter which events LaunchDarkly sends.
To filter events, write a policy using the same syntax as the [role policy builder](/docs/home/account/roles/role-create#create-policies-for-roles) to filter the events sent to Datadog.
For more information about writing policies, read [Using policies](/docs/home/account/roles/role-policies).
For example, if you only want to receive an event when a change is made to one of the feature flags in your testing environment, you can add the following policy to your events stream:
Example Datadog policy
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
| "resources": ["proj/*:env/your-test-environment:flag/*"]
6
| }
7
| ]
```
To add a custom filter:
 1. Navigate to the **Integrations** page and find the integration you wish to modify.
 2. Click **Edit integration configuration**. The “Edit Datadog configuration” panel appears.
![The configuration overflow menu with the "Edit integration configuration" option called out.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/c3f67fc477a1853420126287499e3616d81fee97b626f370c0660f239fd3c09b/assets/images/auto/manage-integrations-edit-integration-callout.auto.png)
The configuration overflow menu with the "Edit integration configuration" option called out.
 1. Click **Advanced editor**. The Advanced editor appears.
 2. Enter your custom policy.
![The "Edit Datadog configuration" panel with the Advanced editor open and a policy inside it.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/80282024161b74f339a48a2aead260f9547830d6830c5f52595b174c0319bee3/assets/images/auto/datadog-custom-policy.auto.png)
The "Edit Datadog configuration" panel with the Advanced editor open and a policy inside it.
 1. Click **Save configuration**.
 2. Verify that LaunchDarkly is sending a customized set of events by viewing the events in your Datadog dashboard.
## Disable the Datadog integration
If you wish to disable the Datadog integration, there are two methods to do so:
 * **Disable the integration** to pause the flow of events to Datadog, but leaves the connection between Datadog and LaunchDarkly intact.
 * **Delete the integration** to cease all event export and break the connection between Datadog and LaunchDarkly.
To temporarily disable the Datadog integration:
 1. Navigate to the Integrations page.
 2. Find the Datadog integration you wish to disable.
 3. Click the **Edit integration configuration** button. The “Edit Datadog configuration” panel appears.
 4. Toggle to turn the integration **Off**.
To permanently delete the Datadog integration:
 1. Navigate to the Integrations page.
 2. Find the integration you wish to modify and click **Edit integration configuration**. The “Edit Datadog configuration” panel appears.
 3. Click **Delete** in the “Delete configuration” section. A confirmation dialog appears.
 4. Click **Delete** to confirm.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs