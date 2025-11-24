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
 * [Relay Proxy implementation](#relay-proxy-implementation)
## Overview
This topic explains how to implement the Relay Proxy.
Before you begin, decide whether the Relay Proxy is appropriate for your configuration by reading [Relay Proxy use cases](/docs/sdk/relay-proxy/use-cases).
If you are a customer on an Enterprise plan, [Relay Proxy Enterprise](/docs/sdk/relay-proxy/enterprise) has additional functionality available.
## Relay Proxy implementation
Before you implement the Relay Proxy, read the [Relay Proxy guidelines](/docs/sdk/relay-proxy/guidelines).
Here is the process for implementing the Relay Proxy:
 1. Decide whether to configure your SDKs for [proxy mode or daemon mode](/docs/sdk/relay-proxy/sdk-config#configuring-sdks-to-use-different-modes).
 2. Plan your Relay Proxy architecture, including:
 * [Whether you must use a persistent store](/docs/sdk/relay-proxy/sdk-config#using-a-persistent-store), which is required for some kinds of segments if you are using server-side SDKs.
 * What servers to use.
 * How to manage load balancing.
 3. [Configure the Relay Proxy](/docs/sdk/relay-proxy/deploying#configuring-the-relay-proxy).
 * (Optional) [Configure the Relay Proxy for segments](/docs/sdk/relay-proxy/sdk-config#configuring-the-relay-proxy-for-segments), if applicable.
 * (Optional) If you’re using Relay Proxy Enterprise, set up [automatic configuration](/docs/sdk/relay-proxy/automatic-configuration) or configure [offline mode](/docs/sdk/relay-proxy/offline).
 4. [Deploy the Relay Proxy](/docs/sdk/relay-proxy/deploying#deploying-the-relay-proxy).
 5. [Configure your SDKs to use the Relay Proxy](/docs/sdk/relay-proxy/sdk-config).
 6. [Plan for scaling](/docs/sdk/relay-proxy/guidelines#scaling-guidelines).
 7. [Monitor the Relay Proxy’s performance](/docs/sdk/relay-proxy/monitoring) over time.
Read the topics in this category to learn how to complete these steps.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs