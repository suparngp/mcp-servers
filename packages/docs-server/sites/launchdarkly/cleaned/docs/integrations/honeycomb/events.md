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
 * [Create a Honeycomb API key](#create-a-honeycomb-api-key)
 * [Add the Honeycomb integration](#add-the-honeycomb-integration)
 * [Configure integration policies](#configure-integration-policies)
##### The Honeycomb events integration is available to customers on select plans
The Honeycomb events integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to use the LaunchDarkly Honeycomb events integration.
The LaunchDarkly Honeycomb integration helps you diagnose problems by sending flag events to Honeycomb. Honeycomb displays those events alongside performance graphs so you can correlate feature rollouts with changes in operational health.
![A Honeycomb events graph showing LaunchDarkly flag change events, with a flag event called out.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/ea220499e694815f8f54fbf75c000936531071b3b4de9d1f327982d79cd159dc/assets/images/__third_party/honeycomb-query.png)
A Honeycomb events graph showing LaunchDarkly flag change events, with a flag event called out.
##### The integration only sends flag actions to Honeycomb
Only flag action events appear in Honeycomb after you configure the integration. Other event kinds do not appear. To learn more, read [Feature flag actions](/docs/home/account/roles/role-actions#feature-flag-actions).
To send flag change events to Honeycomb:
 1. [Create a Honeycomb API key](/docs/integrations/honeycomb/events#create-a-honeycomb-api-key).
 2. [Add the Honeycomb integration in LaunchDarkly](/docs/integrations/honeycomb/events#add-the-honeycomb-integration).
 3. (Optional) [Configure the integration’s policy](/docs/integrations/honeycomb/events#configure-integration-policies) to allow or restrict specific projects and environments.
## Prerequisites
To use the LaunchDarkly Honeycomb integration successfully, you must meet the following prerequisites:
 * You must have an API key from your Honeycomb account. To learn more, read [Create a Honeycomb API key](/docs/integrations/honeycomb/events#create-a-honeycomb-api-key).
## Create a Honeycomb API key
The Honeycomb API key authenticates the LaunchDarkly integration so it can submit events to your Honeycomb account. The LaunchDarkly integration uses Honeycomb’s Marker API.
To learn more about Honeycomb’s Marker API, read [Honeycomb’s documentation](https://api-docs.honeycomb.io/api/markers).
When you create the API key, confirm that the key has access to create “markers.” This is the only access scope the LaunchDarkly integration needs.
## Add the Honeycomb integration
Here’s how to add the Honeycomb integration:
 1. Click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Integrations** and find “Honeycomb.”
 3. Click **Add integration**. The “Create Honeycomb configuration” panel appears.
 4. (Optional) Type a human-readable **Name**.
 5. Enter the **Honeycomb dataset name** you would like flag markers to be associated with.
 6. Paste in your **Honeycomb API key**.
 7. (Optional) Configure a custom policy to control which flag information LaunchDarkly sends to Honeycomb. To learn more, read [Configure integration policies](/docs/integrations/honeycomb/events#configure-integration-policies).
 8. After reading the Integration Terms and Conditions, check the **I have read and agree to the Integration Terms and Conditions** checkbox.
 9. Click **Save configuration**.
### Configure integration policies
The “Edit policy” field in the integration configuration panel lets you control which events LaunchDarkly sends to Honeycomb.
The default policy allows production environments across all projects to send events. To update the policy, use the policy builder or by click **View JSON** and edit the policy statements directly.
Here’s the `resources` specifier from the default policy:
Production environments across all projects
```
proj/*:env/production:flag/* 
--- 
```
To learn more, read [Using resources](/docs/home/account/roles/role-resources).
You can use the policy editor to restrict the integration to:
 * a specific set of LaunchDarkly projects/environments
 * a specific set of flags
 * a specific set of actions
For example, to restrict the policy to a single project called `cool-app`, set the policy configuration’s `resources` field to the following resource specifier:
Restrict to a single project
```
proj/cool-app:env/production:flag/* 
--- 
```
The policy above makes the integration only send flag events from the `cool-app` project’s Production environment to Honeycomb.
If you need to restrict or allow a more complex set of resources than you can specify in a single policy, you can add multiple Honeycomb integrations and configure each one to a specific task. Each integration can have its own separate policy configuration.
To learn more about using the policy editor, read [Using policies](/docs/home/account/roles/role-policies).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs