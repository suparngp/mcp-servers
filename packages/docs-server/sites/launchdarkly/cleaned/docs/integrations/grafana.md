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
 * [Create a Grafana service account and service account token](#create-a-grafana-service-account-and-service-account-token)
 * [Set up the Grafana integration](#set-up-the-grafana-integration)
 * [Filter the events you send to Grafana](#filter-the-events-you-send-to-grafana)
 * [Add LaunchDarkly annotations to Grafana dashboards](#add-launchdarkly-annotations-to-grafana-dashboards)
##### The Grafana integration is available to customers on select plans
The Grafana integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to use the LaunchDarkly Grafana integration. You can use the integration to send flag, environment, and project updates to Grafana as annotations to add context to your graphs.
![An example Grafana dashboard configured with LaunchDarkly feature flag change event annotations.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/f5c848b7037f17533501314d9019f3cd7aa8abcaaea39bbcf902c37c33a43fa1/assets/images/__third_party/grafana-dashboard-with-annotations.png)
An example Grafana dashboard configured with LaunchDarkly feature flag change event annotations.
## Prerequisites
To use the Grafana integration, you must have the following prerequisites:
 * A Grafana instance that is accessible to LaunchDarkly’s servers.
 * A Grafana [service account](https://grafana.com/docs/grafana/latest/administration/service-accounts/#service-accounts) with the “Annotation writer” role and a corresponding service account token.
### Create a Grafana service account and service account token
To create a Grafana service account, follow [Grafana’s service account creation instructions](https://grafana.com/docs/grafana/latest/administration/service-accounts/#to-create-a-service-account). Change the **Role** selection to “Annotation writer.”
For the display name, we recommend “LaunchDarkly integration” or similar.
Next, generate a service account token for the service account you just created following [Grafana’s service account token instructions](https://grafana.com/docs/grafana/latest/administration/service-accounts/#add-a-token-to-a-service-account-in-grafana).
## Set up the Grafana integration
After you create a service account token in Grafana, you can set up the integration in LaunchDarkly.
 1. Click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Integrations** and find “Grafana.”
 3. Click **Add integration**. The “Create Grafana configuration” panel appears.
 4. (Optional) Give your integration a human-readable **Name**.
 5. Enter your Grafana instance URL. Do not include a trailing `/`.
 6. Enter the Grafana **service account token**. You created this token in the [Prerequisites](/docs/integrations/grafana#prerequisites) section.
 7. (Optional) Configure a custom policy to control which events LaunchDarkly sends to Grafana. To learn more, read [Filter the events you send to Grafana](/docs/integrations/grafana#filter-the-events-you-send-to-grafana).
 8. After reading the Integration Terms and Conditions, check the **I have read and agree to the Integration Terms and Conditions** checkbox.
 9. Click **Save configuration**. The new integration appears on the **Integrations** page. It is switched **On** by default.
After you set up the Grafana integration, events from LaunchDarkly appear in your Grafana dashboard.
## Filter the events you send to Grafana
By default, LaunchDarkly sends events to Grafana for changes made to any feature flag, environment, or project. If you have a more limited use case for using the integration, or you wish to restrict which data you send to Grafana, you can filter which events LaunchDarkly sends.
To filter events, write a policy using the same syntax as the [role policy builder](/docs/home/account/roles/role-create#create-policies-for-roles) to filter the events sent to Grafana.
For more information about writing policies, read [Using policies](/docs/home/account/roles/role-policies).
For example, if you only want to receive an event when a change is made to one of the feature flags in your testing environment, you can add the following policy to your events stream:
Example Grafana policy
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
 1. Navigate to the **Integrations** page and find “Grafana.”
 2. Click the **overflow menu** next to the configuration you wish to modify, and select “Edit integration configuration.” The “Edit Grafana configuration” panel appears.
![The configuration overflow menu with the "Edit integration configuration" option called out.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/c3f67fc477a1853420126287499e3616d81fee97b626f370c0660f239fd3c09b/assets/images/auto/manage-integrations-edit-integration-callout.auto.png)
The configuration overflow menu with the "Edit integration configuration" option called out.
 1. In the “Policy” section, click **Advanced editor**. The Advanced editor appears.
 2. Enter your custom **policy**.
 3. Click **Save configuration**.
You can verify that LaunchDarkly is sending a customized set of events by viewing the events in your Grafana dashboard.
## Add LaunchDarkly annotations to Grafana dashboards
To add LaunchDarkly events as annotations in Grafana dashboards:
 1. Open the Grafana dashboard in edit mode.
 2. Click the Dashboard settings **gear** icon button located at the top of the page.
 3. Click **Annotations**.
 4. Click **New query**. The “New annotation” page appears.
 5. Enter a human readable name for the annotation, such as “LaunchDarkly feature flags.”
 6. In the **Data source** menu, select ”— Grafana —.”
 7. In the **Filter by** menu, select **Tags**.
![The Grafana "Add annotation" page.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/9b4318c69101b280eb59db731eeb125ec0e3f597bbd6987446a01c963aaeab2e/assets/images/__third_party/grafana-add-annotation.png)
The Grafana "Add annotation" page.
 1. The LaunchDarkly integration sends annotation events to Grafana with event-specific tags. You can use one or more of the following tags to filter the annotations that appear on your dashboard:
Tag | Description 
---|--- 
`launchdarkly` | This tag is added to all LaunchDarkly annotation events. 
`ld_tag:TAG` | The LaunchDarkly tag associated with the resource that changed. For example, if a feature flag has the tag `grafana` in LaunchDarky, all event annotations associated with that flag will be sent to Grafana with the tag `ld_tag:grafana`. 
`project_key:PROJECT_KEY` | The LaunchDarkly project key that is associated with the change event. 
`environment_key:ENVIRONMENT_KEY` | The LaunchDarkly environment key that is associated with the change event. 
`flag_key:FLAG_KEY` | The LaunchDarkly feature flag key that is associated with the change event. This tag is only applied to feature flag change events. 
`segment_key:SEGMENT_KEY` | The LaunchDarkly segment flag key that is associated with the change event. This tag is only applied to segment change events. 
`kind:RESOURCE_KIND` | The resource kind associated with the change event where `RESOURCE_KIND` is one of `flag`, `segment`, `project`, `environment`, or `member`. 
 1. Click **Apply**.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs