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
 * [Build form variables](#build-form-variables)
## Overview
This topic explains how to use form variables to collect configuration data from members when they begin using your integration. Most integrations need to collect one or more pieces of configuration data that support the integration, such as API tokens or webhook endpoints.
## Build form variables
To support your configuration, you must describe a set of `formVariables` that define your configuration properties. The `formVariables` populate a form in the LaunchDarkly user interface (UI) that members complete to add your integration.
Here’s an example:
Example manifest
```
1
| "formVariables": [
---|--- 
2
| {
3
| "key": "name",
4
| "name": "Name",
5
| "type": "string"
6
| },
7
| {
8
| "key": "webhookUrl",
9
| "name": "Incoming webhook URL",
10
| "description": "Enter your Microsoft Teams [incoming webhook URL](https://example-documentation.com).",
11
| "defaultValue": "https://example.com/inbound_webhook",
12
| "type": "url",
13
| "isSecret": true
14
| }
15
| ]
```
Here’s how the `formVariables` entry above displays on the LaunchDarkly **Integrations** page:
![Example integration configuration panel in the LaunchDarkly UI](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/1aef3893864e92e0e7c77d41620817b32430e8e747d5da20f354ae0300b09418/assets/images/auto/integrations-form-variable.auto.png)
Example integration configuration panel in the LaunchDarkly UI
Form variables apply to the entire integration configuration. There are no capability-specific form variables.
Here are the form variables you need to supply:
 * `key`, `name`, `description`, and `type` are required.
 * `formVariables[].description` is used as a field label on the UI. You can use simple Markdown to link a word or phrase to an external URL.
 * Optionally, you can set `isSecret` or `isOptional` if necessary, or provide guidance with `placeholder` and `defaultValue`. If you provide a `defaultValue`, you must also set `isOptional` to `true` and vice versa.
Accepted form variable `type`s are `string`, `boolean`, `uri`, `enum`, and `dynamicEnum`.
To learn more, read the [manifest schema](https://github.com/launchdarkly/integration-framework/blob/main/manifest.schema.json).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs