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
 * [Onboard with LaunchDarkly](#onboard-with-launchdarkly)
 * [Audience Reach](#audience-reach)
 * [Plan your integration](#plan-your-integration)
 * [Connect your platform to LaunchDarkly](#connect-your-platform-to-launchdarkly)
 * [Authenticate using an OAuth application](#authenticate-using-an-oauth-application)
 * [Authenticate using API access tokens](#authenticate-using-api-access-tokens)
 * [Choose an integration option](#choose-an-integration-option)
 * [Use the API](#use-the-api)
 * [Use the integration framework](#use-the-integration-framework)
 * [About integration capabilities](#about-integration-capabilities)
 * [Related content](#related-content)
##### Partner integrations are available to customers on select plans
Partner integrations are only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to build a LaunchDarkly integration as part of our partner program. You can join our Technology Partner Program to make your integrations publicly available.
## Onboard with LaunchDarkly
Our Technology Partner Program empowers technology partners to build, launch, and go-to-market with LaunchDarkly. Benefits include partnership support, early product access, and joint marketing opportunities, among others.
To get started, visit our [Partners page](https://launchdarkly.com/partner-program/).
## Audience Reach
We list partner integrations in the following locations:
 * [The Integrations page of the LaunchDarkly application](https://app.launchdarkly.com/settings/integrations)
 * [The LaunchDarkly website](https://launchdarkly.com/integrations)
 * [Our Integrations documentation](/docs/integrations) for configuration and implementation documentation
You can also list your integration on your own websites and platforms.
## Plan your integration
After you have completed the partner agreement, you can begin planning your integration.
As you plan, you may want to consider the following questions:
 * What value will your integration provide to your integration’s users?
 * How will you measure your integration’s success?
 * What is your plan your ongoing support of the integration?
 * How will you document the integration?
## Connect your platform to LaunchDarkly
Next, decide how to connect your integration to LaunchDarkly. You can allow members to authenticate using an OAuth application or using API access tokens.
### Authenticate using an OAuth application
LaunchDarkly must verify OAuth applications before customers can use them. OAuth also lets you limit the connection of your integrated app to individual members. To learn how, read [OAuth applications](/docs/home/infrastructure/oauth).
### Authenticate using API access tokens
We provide two types of API access tokens:
 * [Personal access tokens](/docs/home/account/api#personal-tokens)
 * [Service tokens](/docs/home/account/api)
If you use API access tokens for authentication, we recommend using roles to limit the amount of access to LaunchDarkly those tokens have. If you don’t use roles to limit API token access, your members will be able to edit everything in your LaunchDarkly account, which can be a security risk.
##### API access tokens and the principle of least privilege
As a best practice, we recommend giving your tokens the smallest scope required for your integration. For example, if your integration is not designed to modify your Production environment, use a role or inline policy to restrict access appropriately.
To learn how to use roles to limit access for an API tokens, read [Scope personal API access tokens](/docs/home/account/api#scope-personal-api-access-tokens).
We also recommend storing your API access tokens securely.
## Choose an integration option
If your integration is only interacting with LaunchDarkly resources, you may be able to build it entirely using the REST API. If you require a more complex integration, such as one with triggers or flag links, use the integration framework.
We require an integration framework update for any published integration. LaunchDarkly uses the `manifest.json` and associated image resources to surface your integration to end users.
### Use the API
LaunchDarkly is built using an open REST API. Your integration can interact with LaunchDarkly in many of the same ways that you can through the user interface (UI). To learn how, read our [API documentation](/docs/api).
### Use the integration framework
LaunchDarkly’s integration framework lets you build deeper integrations between LaunchDarkly and a third-party service.
A number of capabilities exist to provide integrations in both directions, such as sending partner-defined webhooks to third-party services or surfacing external feature flag-related links in the LaunchDarkly UI.
These capabilities are further outlined in the section below.
## About integration capabilities
Your integration’s capabilities are how it interacts with LaunchDarkly.
LaunchDarkly supports the following integration capabilities:
 * [Approvals](/docs/integrations/partner-integrations/approvals)
 * [Change history events hook](/docs/integrations/partner-integrations/audit-log)
 * [Endpoints](/docs/integrations/partner-integrations/endpoints)
 * [Feature stores](/docs/integrations/partner-integrations/feature-stores)
 * [Flag links](/docs/integrations/partner-integrations/flag-links)
 * [Reserved custom properties](/docs/integrations/partner-integrations/custom-properties)
 * [Synced segments](/docs/integrations/partner-integrations/synced-segments)
 * [Triggers](/docs/integrations/partner-integrations/triggers)
## Related content
Here are the topics in this category:
 * [Getting started](/docs/integrations/partner-integrations/getting-started)
 * [Defining an integration manifest](/docs/integrations/partner-integrations/manifest)
 * [Registering a LaunchDarkly OAuth client](/docs/integrations/partner-integrations/oauth-client-registration)
 * [Using form variables](/docs/integrations/partner-integrations/form-variables)
 * [Using integration framework capabilities](/docs/integrations/partner-integrations/capabilities)
 * [Validating an integration](/docs/integrations/partner-integrations/validating)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs