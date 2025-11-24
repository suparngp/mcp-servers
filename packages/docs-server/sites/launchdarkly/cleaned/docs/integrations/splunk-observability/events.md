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
 * [Configure the Splunk Observability Cloud integration](#configure-the-splunk-observability-cloud-integration)
 * [Advanced configuration](#advanced-configuration)
 * [Use the integration](#use-the-integration)
##### The Splunk Observability Cloud events integration is available to customers on select plans
The Splunk Observability Cloud events integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
##### Splunk Observability Cloud was formerly SignalFx
Splunk Observability Cloud used to be called SignalFx. Some features of Splunk Observability Cloud, such as API endpoints, still reference SignalFx.
## Overview
This topic explains how to use the LaunchDarkly Splunk Observability Cloud integration.
Splunk Observability Cloud can detect and alert engineers when their applications are trending in an unstable direction. In doing so, these engineers will likely want to identify what changed and caused the application to become unstable. One potential cause could be the toggling of a feature flag. The LaunchDarkly Splunk Observability Cloud integration works to streamline this use case by exposing flag change data to Splunk Observability Cloud.
With clear data markers representing feature flag changes, Splunk Observability Cloud users can more easily correlate their feature flag rollouts with changes in operational health.
## Prerequisites
To configure the Splunk Observability Cloud integration to send LaunchDarkly data to Splunk Observability Cloud, you must have the following prerequisites:
 * **Splunk Observability Cloud access token** : This token authenticates your LaunchDarkly account to send data to your Splunk Observability Cloud account. To learn more about about working with Splunk Observability Cloud access tokens, read [Splunk’s documentation](https://help.splunk.com/en/splunk-observability-cloud/administer/authentication-and-security/authentication-tokens/api-access-tokens).
 * **Splunk Observability Cloud realm** : The realm identifies the self-contained deployment of Splunk Observability Cloud that hosts your organization. Find the name of your organization’s realm on your Splunk Observability Cloud profile page.
## Configure the Splunk Observability Cloud integration
Here’s how to configure the Splunk Observability Cloud integration:
 1. Click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Integrations** and find “Splunk Observability Cloud.”
 3. Click **Add integration**. The “Create Splunk Observability Cloud configuration” panel appears.
 4. (Optional) Enter a human-readable **Name**.
 5. Paste in your **Splunk Observability Cloud access token**.
 6. Paste in your **Splunk Observability Cloud realm**.
 7. (Optional) Configure a custom policy to control which flag information LaunchDarkly sends to Splunk Observability Cloud. To learn more about this option, read [Advanced configuration](/docs/integrations/splunk-observability/events#advanced-configuration).
 8. After reading the Integration Terms and Conditions, check the **I have read and agree to the Integration Terms and Conditions** checkbox.
 9. Click **Save configuration**.
When you configure the integration correctly, LaunchDarkly sends flag change data to Splunk Observability Cloud.
## Advanced configuration
The “Policy” configuration field allows you to control which kinds of LaunchDarkly events are sent to Splunk Observability Cloud. The default policy value restricts it to flag changes in production environments:
Policy example
```
proj/*:env/production:flag/* 
--- 
```
Reasons to override the default policy include wanting to restrict the integration to:
 * a specific combination of LaunchDarkly projects/environments
 * a specific action (or set of actions)
For example, setting the policy configuration to the following will restrict LaunchDarkly such that only changes from the `web-app` project’s production environment are sent to Splunk Observability Cloud:
Policy example
```
proj/web-app:env/production:flag/* 
--- 
```
To learn more, read [Using policies](/docs/home/account/roles/role-policies).
## Use the integration
After you configure the integration, Splunk Observability Cloud charts are annotated with LaunchDarkly flag changes.
To learn more, read [Splunk Observability Cloud’s documentation](https://docs.splunk.com/Observability/data-visualization/charts/charts.html).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs