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
 * [About reserved custom properties](#about-reserved-custom-properties)
## Overview
This topic explains how to use the reserved custom properties integration framework capability.
## About reserved custom properties
Custom properties let you store data in LaunchDarkly alongside a feature flag. For example, you can use custom properties to indicate flag-level associations with data on your service. If you don’t have any flag-level associations or configurations, you don’t need to use this capability.
To learn more, read [Custom properties](/docs/home/infrastructure/custom-properties).
By default, members must specify a custom property name and key when they attach the custom property value to a feature flag. This step introduces the possibility of user error. To prevent this, developers can “reserve” a custom property for their integration, which makes it much easier for members to correctly add the property’s value to feature flags.
`reservedCustomProperties` require a `name` and `key`. Adding a `description` is optional.
After a member configures your integration, the custom property appears in the dropdown in the flag’s right sidebar.
For example, the [Datadog integration](https://github.com/launchdarkly/integration-framework/blob/main/integrations/datadog/manifest.json) uses the following `reservedCustomProperties`:
The reservedCustomProperties capability
```
1
| "reservedCustomProperties": [
---|--- 
2
| {
3
| "name": "Datadog tags",
4
| "description": "Tags are a way of adding additional dimension...",
5
| "key": "datadog"
6
| }
7
| ]
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs