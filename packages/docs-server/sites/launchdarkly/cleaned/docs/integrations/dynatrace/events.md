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
 * [Create a Dynatrace API token](#create-a-dynatrace-api-token)
 * [Configure the Dynatrace integration](#configure-the-dynatrace-integration)
 * [Entity types](#entity-types)
 * [Configure integration policies](#configure-integration-policies)
 * [Associate flags with Dynatrace tags](#associate-flags-with-dynatrace-tags)
 * [Troubleshooting](#troubleshooting)
 * [Wait, then reload the Dynatrace page](#wait-then-reload-the-dynatrace-page)
 * [Verify that the Dynatrace entities have recently registered traffic or other agent-sourced data](#verify-that-the-dynatrace-entities-have-recently-registered-traffic-or-other-agent-sourced-data)
 * [Verify the custom properties of the flag that changed](#verify-the-custom-properties-of-the-flag-that-changed)
 * [Ensure that the integration is configured to use the correct entity type](#ensure-that-the-integration-is-configured-to-use-the-correct-entity-type)
##### The Dynatrace events integration is available to customers on select plans
The Dynatrace events integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to use the LaunchDarkly Dynatrace events integration. The LaunchDarkly Dynatrace events integration makes it easier to diagnose problems by sending flag change events to Dynatrace. Dynatrace can display those events alongside performance graphs, making it easier for Dynatrace users to correlate feature rollouts to changes in operational health.
![A Dynatrace events graph, showing LaunchDarkly flag change events.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/8babd3b64b81683926f03534d0c537cda0d15c0c89cc7c9ed67e4fa0734712bb/assets/images/__third_party/dynatrace-dashboard.png)
A Dynatrace events graph, showing LaunchDarkly flag change events.
The integration only sends `flag` actions to Dynatrace. To learn more, read [Feature flag actions](/docs/home/account/roles/role-actions#feature-flag-actions).
To send flag change events to Dynatrace:
 1. [Create a Dynatrace API token](/docs/integrations/dynatrace/events#create-a-dynatrace-api-token)
 2. [Configure the Dynatrace integration](/docs/integrations/dynatrace/events#configure-the-dynatrace-integration)
 3. (Optional) [Configure the integration’s policy to allow or restrict specific projects and environments](/docs/integrations/dynatrace/events#configure-integration-policies)
 4. [Associate flags with Dynatrace tags](/docs/integrations/dynatrace/events#associate-flags-with-dynatrace-tags)
## Prerequisites
To use the LaunchDarkly Dynatrace integration successfully, you must meet the following prerequisites:
 * You must know the URL of your Dynatrace service. Find it by loading your Dynatrace dashboard and looking at the URL in your browser’s address bar. For example: `https://csd50042.live.dynatrace.com`. Copy this URL and save it.
 * You must have an API token from your Dynatrace account. To learn more, read [Create a Dynatrace API token](/docs/integrations/dynatrace/events#create-a-dynatrace-api-token).
## Create a Dynatrace API token
The Dynatrace API token authenticates the LaunchDarkly integration so it can submit events to your Dynatrace account. To learn more about Dynatrace’s API tokens, read [Dynatrace’s documentation](https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-api/basics/dynatrace-api-authentication).
When you create the token, confirm that the “Access problem and event feed, metrics, and topology” option is enabled. This is the only access scope the LaunchDarkly integration needs.
## Configure the Dynatrace integration
Here’s how to add and configure the Dynatrace integration:
 1. Click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Integrations** and find “Dynatrace.”
 3. Click **Add integration**. The “Create Dynatrace configuration” panel appears.
 4. (Optional) Give your integration a human-readable **Name**.
 5. Enter your Dynatrace API token.
 6. Enter the URL of your Dynatrace service in the **Dynatrace URL** field. Do not include a slash at the end.
 7. Select the entity type of the Dynatrace entities you want to send LaunchDarkly events to. To learn more, read [Entity types](/docs/integrations/dynatrace/events#entity-types).
 8. (Optional) Specify a Dynatrace entity tag to be associated with all feature flag events sent from this integration. If you do not specify a tag, then you will need to specify a Dynatrace tag in custom properties setting of individual feature flags. To learn more, read [Associate flags with Dynatrace tags](/docs/integrations/dynatrace/events#associate-flags-with-dynatrace-tags)
 9. (Optional) Configure a custom policy to control which information LaunchDarkly sends to Dynatrace. To learn more, read [Configure integration policies](/docs/integrations/dynatrace/events#configure-integration-policies).
 10. After reading the Integration Terms and Conditions, check the **I have read and agree to the Integration Terms and Conditions** checkbox.
 11. Click **Save configuration**.
### Entity types
Dynatrace uses specific entity types for applications within it. For example, if Dynatrace is monitoring your software application and flag change events appear on that Dynatrace’s timeline, the application has an entity type such as `SERVICE`, `APPLICATION`, or `PROCESS_GROUP_INSTANCE`.
To find the application entity type, navigate to the Dynatrace page for the entity and examine the URL. It contains the entity type in capital letters. In this example, the entity type is `PROCESS_GROUP_INSTANCE`:
![A Dynatrace URL with the entity type called out.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/58a4a0d30de4bbf6c69e34dba4fe768b97ce1b2d33d4d39272e28a1137c546ca/assets/images/__third_party/dynatrace-url-app-type-callout.png)
A Dynatrace URL with the entity type called out.
### Configure integration policies
The “Policy” field lets you control which LaunchDarkly events are sent to Dynatrace. The Resource specifier in the default policy value allows Production environments across all projects to send events:
Production environments across all projects
```
proj/*:env/production:flag/* 
--- 
```
To learn more about the resource configuration fields, read [Using resources](/docs/home/account/roles/role-resources).
You may want to override the default policy for various reasons, including restricting how the integration receives and exports events. Using the policy editor, you can restrict the integration to:
 * a specific set of LaunchDarkly projects/environments
 * a specific set of flags
 * a specific set of actions
For example, to restrict the policy to a single project called `cool-app`, set the policy configuration’s Resource field to the following Resource specifier:
Access restricted to one project
```
proj/cool-app:env/production:flag/* 
--- 
```
The policy above makes it so that the only events the integrations sends to Dynatrace are flag events from the `cool-app` project’s Production environment.
If you need to restrict or allow a more complex set of resources than you can specify in a single policy, you might want to add multiple Dynatrace integrations and configure each one to a specific task. Each integration can have its own separate policy configuration.
To learn more about using the policy editor, read [Using policies](/docs/home/account/roles/role-policies).
## Associate flags with Dynatrace tags
If you do not specify a Dynatrace tag in the integration’s configuration, then the integration will only send events from flags that are explicitly associated with Dynatrace tags. In this case, it does **not** send events from every flag in your LaunchDarkly project.
The integration lets you view an application’s flag change events beside its performance graphs. This makes it easier to correlate problems with the flag changes that may have caused them.
For this to be most effective, attach a flag’s events to all the applications the flag affects, and _only_ those applications.
Associating flags with Dynatrace tags ensures that flag events are attached to the Dynatrace entities which are affected by those events. To learn more about Dynatrace tags, read [Dynatrace’s documentation](https://docs.dynatrace.com/docs/manage/tags-and-metadata/setup/how-to-define-tags).
To associate a flag with one or more applications using Dynatrace tags:
 1. **In Dynatrace:** Create a new tag and add it to each of the applications which depend on the flag. To learn more about creating tags, read [Dynatrace’s documentation](https://docs.dynatrace.com/docs/manage/tags-and-metadata/setup/how-to-define-tags).
![An application page in Dynatrace, with the "my-dynatrace-tag" added.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/2287b0969d2f0142ec36d0bc2ffc033b35ffc3b6898407562329c0e214c9b9f6/assets/images/__third_party/dynatrace-add-tag.png)
An application page in Dynatrace, with the "my-dynatrace-tag" added.
 1. **In LaunchDarkly:** Navigate to the **Flags** list and open the flag you wish to deprecate.
 2. Click the **three-dot** overflow menu in the right sidebar.
 3. Select **Add custom property**.
 4. In the **Type** menu, select “Dynatrace tags.”
 5. Enter the name of the tag you created in the **Values** field.
![The "Custom Properties" section of a flag page, shown with Dynatrace tags.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/db4259fcd62f19f44bbb615c2646196e7ce111c39eda59fb06494ac2105dd980/assets/images/auto/dynatrace-custom-properties-complete.auto.png)
The "Custom Properties" section of a flag page, shown with Dynatrace tags.
 1. Click **Save** to save the custom property.
Now events from your feature flags appear in Dynatrace.
## Troubleshooting
After you configure the LaunchDarkly integration, flag changes appear as events on the Dynatrace event timelines for your applications, or whatever entities you selected.
If an event doesn’t appear on Dynatrace after you’ve changed a flag, you can try the following techniques:
### Wait, then reload the Dynatrace page
Dynatrace can take up to three minutes to register inbound events.
In addition, the **Events** timeline on a Dynatrace page may be frozen to a particular time range, and won’t automatically update. Reload the page to update the timeline range.
### Verify that the Dynatrace entities have recently registered traffic or other agent-sourced data
Dynatrace’s API only provides access to entities, such as applications, which have recently registered data from Dynatrace Agents. Entities without recent data may be visible in the Dynatrace user interface, but may be unable to register flag changes or other kinds of events.
Verify that Dynatrace OneAgent is running and monitoring the entity, and that the entity is displaying recent traffic data on its Dynatrace page.
### Verify the custom properties of the flag that changed
The LaunchDarkly Dynatrace integration only sends change events for a flag if that flag has a tag association in its custom properties. To learn more, read [Associate flags with Dynatrace tags](/docs/integrations/dynatrace/events#associate-flags-with-dynatrace-tags).
### Ensure that the integration is configured to use the correct entity type
To learn more, read the step about Dynatrace entity types in [Configure the Dynatrace integration](/docs/integrations/dynatrace/events#configure-the-dynatrace-integration).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs