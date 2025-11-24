`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [SDKs](/docs/sdk)
 * [SDK concepts](/docs/sdk/concepts)
 * [SDK features](/docs/sdk/features)
 * [Client-side SDKs](/docs/sdk/client-side)
 * [Server-side SDKs](/docs/sdk/server-side)
 * [AI SDKs](/docs/sdk/ai)
 * [Edge SDKs](/docs/sdk/edge)
 * [OpenFeature providers](/docs/sdk/openfeature)
 * [Observability SDKs](/docs/sdk/observability)
 * [Relay Proxy](/docs/sdk/relay-proxy)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [About the Relay Proxy](#about-the-relay-proxy)
## Overview
This topic explains what the Relay Proxy is and how to use it.
## About the Relay Proxy
The LaunchDarkly Relay Proxy is a small Go application that runs on your own infrastructure. It connects to the LaunchDarkly streaming API and proxies that connection to clients within your organization’s network.
Here is a diagram illustrating how LaunchDarkly SDKs work when you are not using the Relay Proxy:
![An illustration of how LaunchDarkly SDKs work in their default configuration.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/9de4957f8ab365e931dbb52e490433ef545a24895a48286719c08fcdf339dfe4/assets/images/__not_from_LD_app_UI/relay-proxy-diagram-default-config.png)
An illustration of how LaunchDarkly SDKs work in their default configuration.
The Relay Proxy lets multiple servers connect to a local stream instead of making a large number of outbound connections to LaunchDarkly’s streaming service (`stream.launchdarkly.com`). Each of your servers connects only to the Relay Proxy, and the Relay Proxy maintains the connection to LaunchDarkly. You can configure the Relay Proxy to carry multiple environment streams from multiple projects.
Here is a diagram illustrating how LaunchDarkly SDKs work when you are using the Relay Proxy:
![An illustration of how LaunchDarkly SDKs work with the Relay Proxy.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/d6dc9f2d61095e003fed5f7f40505d8043e2dcd09f8f084ad071f11d2931f7e6/assets/images/__not_from_LD_app_UI/relay-proxy-diagram-with-the-rp.png)
An illustration of how LaunchDarkly SDKs work with the Relay Proxy.
The Relay Proxy is an open-source project supported by LaunchDarkly. The full source is in a [GitHub repository](https://github.com/launchdarkly/ld-relay). There’s also a Docker image on [Docker Hub](https://hub.docker.com/r/launchdarkly/ld-relay).
If you are a customer on an Enterprise plan, [Relay Proxy Enterprise](/docs/sdk/relay-proxy/enterprise) has additional functionality available.
To help decide whether the Relay Proxy is appropriate for your configuration, read [Relay Proxy use cases](/docs/sdk/relay-proxy/use-cases). To learn how to implement the Relay Proxy, read [Implementing the Relay Proxy](/docs/sdk/relay-proxy/implementing).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs