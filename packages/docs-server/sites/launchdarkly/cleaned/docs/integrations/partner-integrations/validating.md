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
 * [Validate your integration](#validate-your-integration)
## Overview
This topic provides an overview of LaunchDarkly’s integration validation server. This is a tool that lets LaunchDarkly partners test some of their integration capabilities with LaunchDarkly. The server provides an environment for this validation.
## Validate your integration
As a partner, you can validate your integration after your [integration manifest](/docs/integrations/partner-integrations/manifest) exists.
The integration framework provides a validation server that you can run locally. If you need access to the server externally, you can use a local proxy, such as ngrok, to expose it to traffic.
Here’s how to test your integration:
 1. Follow the [Getting started](https://github.com/launchdarkly/integration-framework/blob/main/server/README.md#getting-started) section of the validation server README in the [Integration framework GitHub repository](https://github.com/launchdarkly/integration-framework/).
 2. After your server is running, follow the examples in the [Usage](https://github.com/launchdarkly/integration-framework/blob/main/server/README.md#usage) section of the validation server README. The `:integrationKey` in the endpoints is the name of the directory that you are adding to the `integration-framework` repository under `integrations/`.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs