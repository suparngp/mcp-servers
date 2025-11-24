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
 * [Configure the integration](#configure-the-integration)
 * [Advanced configuration](#advanced-configuration)
 * [Use the integration](#use-the-integration)
##### The Mezmo integration is available to customers on select plans
The Mezmo integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to use the LaunchDarkly Mezmo integration (formerly LogDNA). [Mezmo](https://www.mezmo.com/) is a log management and analysis tool. Mezmo can provide insights into a service’s activity. It aggregates application logs, system logs, and more into a common platform so engineers can view all of their services’ activity in a single place.
The LaunchDarkly Mezmo integration sends and aggregates LaunchDarkly change history events in Mezmo.
With LaunchDarkly activity logs grouped in among your Mezmo service logs, you can more easily correlate feature flag rollouts with changes in logged behavior.
## Prerequisites
To configure the Mezmo integration, you must have a **Mezmo ingestion key**. Generate an integration key from your [Mezmo organization](https://app.mezmo.com/account/signin).
## Configure the integration
Here’s how to configure the Mezmo integration:
 1. Click the **gear** icon in the left sidenav to view Organization settings.
 2. Click **Integrations** and find “LogDNA.”
 3. Click **Add integration**. The “Create LogDNA configuration” panel appears.
 4. (Optional) Enter a human-readable **Name**.
 5. Paste in your Mezmo **ingestion key**.
 6. Specify the **Log level** with which LaunchDarkly messages should be posted. The default value is `INFO`.
 7. (Optional) Configure a custom policy to control which information LaunchDarkly sends to Mezmo. To learn more, read [Advanced configuration](/docs/integrations/mezmo#advanced-configuration).
 8. Click **Save configuration**.
When you configure the integration correctly, LaunchDarkly sends change data to Mezmo.
By default, this data is limited to _flag_ activity only. You can expand it to other kinds of data, such as project and environment changes.
## Advanced configuration
The “Policy” configuration field lets you control which kinds of events LaunchDarkly sends to Mezmo.
The default policy value restricts it to flag changes in production environments:
Policy example
```
proj/*:env/production:flag/* 
--- 
```
You can override the default policy to restrict exported events to:
 * a specific combination of LaunchDarkly projects/environments
 * a specific action (or set of actions)
 * a specific kind (or kinds) of entities
For example, the example policy below restricts the integration so LaunchDarkly only sends changes from the `web-app` project’s production environment to Mezmo:
Policy example
```
proj/web-app:env/production:flag/* 
--- 
```
To learn more about policies, read [Using policies](/docs/home/account/roles/role-policies).
## Use the integration
After you configure the integration, LaunchDarkly events appear in Mezmo log statements similar to log statements from other sources. Data from LaunchDarkly is identified with the `launchdarkly` source. Additionally, they are marked with `env` and `app` values corresponding to the appropriate LaunchDarkly environment and project keys, respectively.
You can include LaunchDarkly events in your view by selecting the `launchdarkly` source from the selector at the top of the Mezmo page. Expand any of these log statements for more details.
LaunchDarkly events also include metadata by which you can filter.
For example, to only view log statements corresponding to the `demo-flag` flag, search for the query string `meta.flag_key:demo-flag`.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs