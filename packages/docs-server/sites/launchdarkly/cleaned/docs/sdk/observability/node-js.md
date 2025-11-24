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
 * [Prerequisites and dependencies](#prerequisites-and-dependencies)
 * [Get started](#get-started)
 * [Install the plugin](#install-the-plugin)
 * [Initialize the client](#initialize-the-client)
 * [Configure the plugin options](#configure-the-plugin-options)
 * [Explore supported features](#explore-supported-features)
 * [Review observability data in LaunchDarkly](#review-observability-data-in-launchdarkly)
##### The LaunchDarkly observability features are available for early access
[Observability](/docs/home/observability) features in the LaunchDarkly UI are publicly available in early access.
The observability SDKs, implemented as plugins for LaunchDarkly server-side and client-side SDKs, are designed for use with the in-app observability features. They are currently in available in Early Access, and APIs are subject to change until a 1.x version is released.
If you are interested in participating in the Early Access Program for upcoming observability SDKs, [sign up here](https://launchdarkly.com/early-access/).
## Overview
This topic documents how to get started with the LaunchDarkly observability plugin for the Node.js (server-side) SDK.
The Node.js (server-side) SDK supports the **observability plugin** for error monitoring, logging, and tracing.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [Observability plugin API docs](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-node/) 
GitHub repository | [@launchdarkly/observability-node](https://github.com/launchdarkly/observability-sdk/tree/main/sdk/%40launchdarkly/observability-node) 
Sample application | [Example Express app](https://github.com/launchdarkly/observability-sdk/blob/main/e2e/node-plugin-express/README.md) 
Published module | [npm](https://www.npmjs.com/package/@launchdarkly/observability-node) 
##### For use in server-side applications only
The observability-node plugin is intended for use in multi-user Node.js server applications. If you want to set up LaunchDarkly in JavaScript in a browser environment, read the [JavaScript SDK reference](/docs/sdk/client-side/javascript) and [JavaScript SDK observability reference](/docs/sdk/observability/javascript).
To learn more about LaunchDarkly’s different SDK types, read [Choosing an SDK type](/docs/sdk/concepts/client-side-server-side).
## Prerequisites and dependencies
This reference guide assumes that you are somewhat familiar with the LaunchDarkly [Node.js (server-side) SDK](/docs/sdk/server-side/node-js).
The observability plugin is compatible with the [Node.js (server-side) SDK](/docs/sdk/server-side/node-js), version 9.10.0 and later.
## Get started
Follow these steps to get started:
 * [Install the plugin](/docs/sdk/observability/node-js#install-the-plugin)
 * [Initialize the Node.js (server-side) SDK client](/docs/sdk/observability/node-js#initialize-the-client)
 * [Configure the plugin options](/docs/sdk/observability/node-js#configure-the-plugin-options)
 * [Explore supported features](/docs/sdk/observability/node-js#explore-supported-features)
 * [Review observability data in LaunchDarkly](/docs/sdk/observability/node-js#review-observability-data-in-launchdarkly)
## Install the plugin
LaunchDarkly uses a plugin to the Node.js (server-side) SDK to provide observability.
The first step is to make both the SDK and the observability plugins available as dependencies.
Here’s how:
npm, Node.js SDK v9.10+yarn, Node.js SDK v9.10+
```
$
| npm install @launchdarkly/node-server-sdk
---|--- 
>
| npm install @launchdarkly/observability-node
```
Then, import the plugin into your code:
Import, Node.js SDK v9.10+
```
1
| import { init } from '@launchdarkly/node-server-sdk'
---|--- 
2
| import { Observability } from "@launchdarkly/observability-node";
```
## Initialize the client
Next, initialize the SDK and the plugin.
To initialize, you need your LaunchDarkly environment’s SDK key. This authorizes your application to connect to a particular environment within LaunchDarkly. To learn more, read [Initialize the client](/docs/sdk/server-side/node-js#initialize-the-client) in the Node.js (server-side) SDK reference guide.
Here’s how to initialize the SDK and plugin:
Initialize, Node.js SDK v9.10+
```
1
| const client = init(
---|--- 
2
| 'sdk-key-123abc',
3
| {
4
| plugins: [
5
| new Observability(),
6
| ],
7
| },
8
| )
```
## Configure the plugin options
You can configure options for the observability plugin when you initialize the SDK. The plugin constructor takes an optional object with the configuration details.
Here is an example:
Plugin options, Node.js SDK v9.10+
```
1
| const client = init(
---|--- 
2
| 'sdk-key-123abc',
3
| {
4
| plugins: [
5
| new Observability({
6
| serviceName: 'example-service',
7
| // we recommend setting serviceVersion to the latest deployed git SHA
8
| serviceVersion: 'example-sha',
9
| environment: 'production'
10
| }
11
| }),
12
| ],
13
| },
14
| )
```
For more information on plugin options, as well as how they interact with environment variables and existing OpenTelemetry configuration, read [Configuration for server-side observability](/docs/sdk/features/observability-config-server-side).
## Explore supported features
The observability plugins supports the following features. After the SDK and plugins are initialized, you can access these from within your application:
 * [Configuration for server-side observability](/docs/sdk/features/observability-config-server-side#nodejs-server-side)
 * [Errors](/docs/sdk/features/observability-errors#nodejs-server-side)
 * [Logs](/docs/sdk/features/observability-logs#nodejs-server-side)
 * [Metrics](/docs/sdk/features/observability-metrics#nodejs-server-side)
 * [Tracing](/docs/sdk/features/observability-traces#nodejs-server-side)
## Review observability data in LaunchDarkly
After you initialize the SDK and observability plugin, your application automatically starts sending observability data back to LaunchDarkly in the form of custom events. You can review this information in the LaunchDarkly user interface. To learn how, read [Observability](/docs/home/observability).
Specifically, the observability data includes events that LaunchDarkly uses to automatically create the following metrics:
 * User HTTP error rate (OpenTelemetry)
 * User HTTP 5XX response rate (OpenTelemetry)
 * User non-HTTP exception rate (OpenTelemetry)
 * Average, P95, and P99 request latency (OpenTelemetry)
To learn more, read [Metrics autogenerated from OpenTelemetry data](/docs/home/metrics/autogen-metrics#metrics-autogenerated-from-opentelemetry-data).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs