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
 * [Install the Datadog widget](#install-the-datadog-widget)
 * [Add the widget to a dashboard](#add-the-widget-to-a-dashboard)
##### This integration is deprecated
The Datadog UI extensions have been deprecated by Datadog as of March 31, 2025. You can recreate the functionality using the Datadog App Builder:
 1. From the App Builder in Datadog, choose **Start with Data**.
 2. Select “LaunchDarkly” and choose to continue.
 3. Select the LaunchDarkly actions that you want to include in your App.
## Overview
LaunchDarkly’s [Datadog dashboard widget](https://app.datadoghq.com/account/settings#integrations/launchdarkly) lets you pin feature flags to your Datadog dashboards to monitor and toggle flags from within Datadog. This allows you to manage feature releases in individual environments while monitoring your application performance, without needing to switch between applications.
You can use the widget to organize, monitor, and toggle your flags on and off. You can filter flags by attributes such as project, environment, or tags. Additionally, you can employ a [Datadog template variable](https://docs.datadoghq.com/dashboards/template_variables/) to ensure the contents update with the rest of your Datadog view.
![The "Save with comment" dialog for making flag changes within the Datadog dashboard widget.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/7adc7e8af6646df4dc1acce755c279abfa347ccd20b32f4fce22b223e537e58e/assets/images/__third_party/datadog-dashboard-widget.png)
The "Save with comment" dialog for making flag changes within the Datadog dashboard widget.
The Datadog dashboard widget uses the same permissions set for an account member’s Datadog and LaunchDarkly accounts. When using a shared dashboard, account members can view and edit flags based on their permissions within the LaunchDarkly app.
You cannot use the widget to toggle feature flags in environments that require approval. Instead, click on a flag name to open the flag’s **Targeting** tab within LaunchDarkly and toggle the flag from there.
The toggle is disabled when a flag is in an environment requiring approvals:
![Disabled toggles in the Datadog widget.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/fa75fef8cb7e0145f5cfa627258a050a6370a4a38feef06f98738a0f59382906/assets/images/__not_from_LD_app_UI/datadog-widget-approvals.png)
Disabled toggles in the Datadog widget.
## Install the Datadog widget
To install the Datadog widget:
 1. In Datadog, navigate to the Integrations page.
 2. Search for LaunchDarkly or go directly to the [LaunchDarkly listing](https://app.datadoghq.com/account/settings#integrations/launchdarkly).
 3. Click **Install**.
## Add the widget to a dashboard
To add the widget to your dashboard:
 1. In Datadog, navigate to an existing dashboard or create a new one.
 2. Click **Add Widgets**. The widget drawer appears.
 3. Search for **LaunchDarkly**.
 4. Click or drag the LaunchDarkly widget icon to your dashboard. The LaunchDarkly editor dialog appears.
 5. Click **Connect**. A new window appears prompting you to authorize Datadog.
 6. Click **Authorize**. You are returned to Datadog.
 7. Configure the following widget options in the **LaunchDarkly editor** :
 * **LaunchDarkly project** : The name of the LaunchDarkly project you wish to associate with the dashboard widget.
 * **LaunchDarkly environment** : The name of the LaunchDarkly environment you wish to associate with the dashboard widget.
 * **Environment template variable** (optional): A [Datadog template variable](https://docs.datadoghq.com/dashboards/template_variables/) that overrides the **LaunchDarkly environment** option.
 * **LaunchDarkly tag filter** : An optional `+` separated list of tags used to filter the feature flags displayed in the widget. If multiple tags are included, only flags that match all included tags will appear. If omitted, all of the project’s feature flags will appear.
 * **Sort** : The order the flags are displayed in the widget. Defaults to **Newest**.
 8. (Optional) Enter a widget a title.
![The LaunchDarkly editor configuration page in Datadog, configured with sample settings.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/5f5cce3834861fa8f251a5be22027341baa0f7466f99783ec753eaace6e6acd7/assets/images/__third_party/datadog-widget-configuration.png)
The LaunchDarkly editor configuration page in Datadog, configured with sample settings.
 1. Click **Save**.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs