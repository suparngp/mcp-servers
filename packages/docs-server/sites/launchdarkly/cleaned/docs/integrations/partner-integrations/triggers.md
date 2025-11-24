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
 * [About triggers](#about-triggers)
## Overview
This topic explains how to use the triggers integration framework capability.
## About triggers
##### Flag triggers are available to customers on select plans
Flag triggers are only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
Flag triggers let you turn flags on or off remotely from a third-party application. To learn more about the feature, read [Flag triggers](/docs/home/releases/triggers).
You can use the `trigger` capability to generate a unique webhook URL that your service can request to generate a user-defined flag change in LaunchDarkly. By default, the trigger URL contains a globally unique path parameter to provide security in the form of an unguessable URL. To learn more, read [Google’s Unguessable URLs](https://www.schneier.com/blog/archives/2015/07/googles_unguess.html).
The required `documentation` field must be a link to documentation outlining how webhooks should be configured in your service.
If the integration offers the option to send test events or webhook requests, the optional `testEventNameRegexp` field lets you to specify regex to match the expected `eventName` value. This tells the integration framework not to make any real flag or resource changes associated with matching events.
If your webhooks’ request bodies are non-empty, you can specify the optional `parser` object with one or more of `eventName`, `value`, and `url`. The provided values will flow through LaunchDarkly into the resulting change history messages when your service invokes a trigger in LaunchDarkly.
Here is an example `trigger` capability:
Trigger capability
```
1
| "trigger": {
---|--- 
2
| "documentation": "https://example.com/configuring-webhooks",
3
| "parser": {
4
| "eventName": "/event",
5
| "value": "/value",
6
| "url": "/links/self/href"
7
| },
8
| }
```
If an integration only has the trigger capability, the word “trigger” will be added to its name in the LaunchDarkly user interface (UI). For this reason, do not include the word “trigger” in the manifest name. For an example, read the [generic-trigger manifest](https://github.com/launchdarkly/integration-framework/blob/main/integrations/generic-trigger/manifest.json).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs