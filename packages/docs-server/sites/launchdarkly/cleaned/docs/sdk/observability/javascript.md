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
 * [Install the plugins](#install-the-plugins)
 * [Initialize the client](#initialize-the-client)
 * [Initialize SDK client and plugins together](#initialize-sdk-client-and-plugins-together)
 * [Initialize the plugins after the SDK client](#initialize-the-plugins-after-the-sdk-client)
 * [Configure the plugin options](#configure-the-plugin-options)
 * [Set Context-Security-Policy (CSP)](#set-context-security-policy-csp)
 * [Explore supported features](#explore-supported-features)
 * [Review observability data in LaunchDarkly](#review-observability-data-in-launchdarkly)
##### The LaunchDarkly observability features are available for early access
[Observability](/docs/home/observability) features in the LaunchDarkly UI are publicly available in early access.
The observability SDKs, implemented as plugins for LaunchDarkly server-side and client-side SDKs, are designed for use with the in-app observability features. They are currently in available in Early Access, and APIs are subject to change until a 1.x version is released.
If you are interested in participating in the Early Access Program for upcoming observability SDKs, [sign up here](https://launchdarkly.com/early-access/).
## Overview
This topic documents how to get started with the LaunchDarkly observability plugins for the client-side JavaScript SDK.
The JavaScript SDK supports the following observability plugins:
 * An **Observability plugin** for error monitoring, logging, and tracing.
 * A **Session replay plugin** that provides a way to record and replay end-user sessions from your application.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [Observability plugin API docs](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_observe.Observe.html) 
[Session replay API docs](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_record.Record.html) 
GitHub repository | [@launchdarkly/observability](https://github.com/launchdarkly/observability-sdk/tree/main/sdk/%40launchdarkly/observability) 
Published module | [npm](https://www.npmjs.com/package/@launchdarkly/observability) 
##### For use in client applications only
These observability and session replay plugins are for the LaunchDarkly client-side JavaScript-based SDKs.
To learn more about LaunchDarkly’s different SDK types, read [Choosing an SDK type](/docs/sdk/concepts/client-side-server-side).
##### The observability plugin replaces the JavaScript telemetry integration
We strongly recommend that any customers who are using LaunchDarkly’s [browser-telemetry](https://github.com/launchdarkly/js-core/tree/main/packages/telemetry/browser-telemetry/) integration now use this observability plugin instead.
As we develop additional telemetry-related functionality, we will only be adding it to this observability plugin.
## Prerequisites and dependencies
This reference guide assumes that you are somewhat familiar with the LaunchDarkly [JavaScript SDK](/docs/sdk/client-side/javascript).
The observability plugin is compatible with the [JavaScript SDK](/docs/sdk/client-side/javascript), version 3.7.0 and later.
##### Do you need information about Angular, Remix, Svelte, or other frameworks?
LaunchDarkly does not offer SDKs for all languages or frameworks. If you’re using another framework, such as Angular, Remix, or Svelte, you may be able to use the JavaScript SDK instead. Install the observability plugins and initialize them when you initialize the client for the JavaScript SDK.
To request support for a specific language or framework, [start a Support ticket](https://support.launchdarkly.com/hc/en-us/requests/new).
## Get started
Follow these steps to get started:
 * [Install the plugins](/docs/sdk/observability/javascript#install-the-plugins)
 * [Initialize the JavaScript SDK client](/docs/sdk/observability/javascript#initialize-the-client)
 * [Configure the plugin options](/docs/sdk/observability/javascript#configure-the-plugin-options)
 * [Explore supported features](/docs/sdk/observability/javascript#explore-supported-features)
 * [Review observability data in LaunchDarkly](/docs/sdk/observability/javascript#review-observability-data-in-launchdarkly)
## Install the plugins
LaunchDarkly uses plugins to the JavaScript SDK to provide observability. Most customers use both the observability and session replay plugins. However, there is no dependency between them, and you can use only one or the other if you like.
The first step is to make both the SDK and the observability plugins available as dependencies.
Here’s how:
npm, JS SDK v3.7+yarn, JS SDK v3.7+
```
$
| npm install launchdarkly-js-client-sdk
---|--- 
>
| npm install @launchdarkly/observability
>
| npm install @launchdarkly/session-replay
```
Then, import the plugin into your code:
Import, JS SDK v3.7+
```
1
| import { initialize } from "launchdarkly-js-client-sdk";
---|--- 
2
| import Observability, { LDObserve } from "@launchdarkly/observability";
3
| import SessionReplay, { LDRecord } from "@launchdarkly/session-replay";
```
## Initialize the client
Next, initialize the SDK and the plugins.
To initialize, you need your LaunchDarkly environment’s client-side ID and, in some versions, the context for which you want to evaluate flags. This authorizes your application to connect to a particular environment within LaunchDarkly. To learn more, read [Initialize the client](/docs/sdk/client-side/javascript#initialize-the-client) in the JavaScript SDK reference guide.
##### JavaScript observability SDK credentials
The JavaScript observability SDK requires a client-side ID. Client-side IDs are specific to each project and environment. They are not secret, and you can include them in client-side code. Do not embed a server-side SDK key in a client-side application.
You can find client-side IDs and project keys in **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
You can initialize the observability plugins either at the same time you initialize the SDK, or afterwards.
### Initialize SDK client and plugins together
Here’s how to initialize the SDK and plugins:
Initialize, JS SDK v3.7+
```
1
| // You'll need this context later, but you can ignore it for now.
---|--- 
2
| const context = {
3
| kind: 'user',
4
| key: 'context-key-123abc'
5
| };
6
| 
7
| const client = initialize('client-side-id-123abc', context, {
8
| plugins: [ new Observability(), new SessionReplay() ]
9
| });
```
### Initialize the plugins after the SDK client
You can initialize the observability and session replay plugins manually, after the SDK client is initialized.
This approach supports feature-flagged rollouts or dynamic initialization after end user consent. Both plugins use a `manualStart` option combined with `.start()` calls.
First, configure the plugins with `manualStart: true`:
Manual start configuration, JS SDK v3.7+
```
1
| // You'll need this context later, but you can ignore it for now.
---|--- 
2
| const context = {
3
| kind: 'user',
4
| key: 'context-key-123abc'
5
| };
6
| 
7
| const client = initialize('client-side-id-123abc', context, {
8
| plugins: [
9
| new Observability({ manualStart: true }),
10
| new SessionReplay({ manualStart: true })
11
| ]
12
| });
```
Then, start the plugins when appropriate, such as after receiving end user consent or when a feature flag enables observability.
Here’s an example starting the observability plugin:
Start observability pluginStart observability with feature flagStart observability after end user action
```
1
| // Start observability after user consent or feature flag check
---|--- 
2
| if (userConsentReceived || featureFlagEnabled) {
3
| LDObserve.start();
4
| }
```
Here’s an example with the session replay plugin:
Start recordingStop recording
```
1
| LDRecord.start({
---|--- 
2
| forceNew: true, //start a new recording session
3
| silent: false // if true, console.warn messages created in this method are skipped
4
| });
```
This approach allows you to:
 * Feature-flag the rollout of observability to a subset of end users
 * Wait for end user consent before starting data collection
 * Dynamically enable observability based on runtime conditions
 * Maintain compliance with privacy regulations
## Configure the plugin options
You can configure options for the observability plugins when you initialize the SDK. The plugin constructors take an optional object with the configuration details.
Here is an example:
Plugin options, JS SDK v3.7+
```
1
| // You'll need this context later, but you can ignore it for now.
---|--- 
2
| const context = {
3
| kind: 'user',
4
| key: 'context-key-123abc'
5
| };
6
| 
7
| const client = initialize('client-side-id-123abc', context, {
8
| plugins: [
9
| new Observability({
10
| tracingOrigins: true, // attribute frontend requests to backend domains
11
| networkRecording: {
12
| enabled: true,
13
| recordHeadersAndBody: true
14
| }
15
| }),
16
| new SessionReplay({
17
| privacySetting: 'none',
18
| // or 'default' to redact text matching common regex for PII
19
| // or 'strict' to redact all text and images
20
| })
21
| ]
22
| });
```
For more information on plugin options, read [Configuration for client-side observability](/docs/sdk/features/observability-config-client-side) and [Configuration for session replay](/docs/sdk/features/session-replay-config).
## Set Context-Security-Policy (CSP)
If your application runs in an environment that enforces content security policies, you must set the `Content-Security-Policy` (CSP) in your application to tell the browser how your page can interact with third-party scripts.
Here are the policies you need to set to use the observability plugin:
 * `connect-src: https://pub.observability.app.launchdarkly.com https://otel.observability.app.launchdarkly.com`: This policy allows connecting with LaunchDarkly servers to send recorded observability data.
 * `worker-src: data: blob:`: This policy allows creating an inlined web worker initialized by the `npm` package for this plugin.
Your CSP definition may look something like this:
Example CSP definition
```
1
| <meta
---|--- 
2
| http-equiv="Content-Security-Policy"
3
| content="connect-src: https://pub.observability.app.launchdarkly.com https://otel.observability.app.launchdarkly.com; worker-src data: blob:;"
4
| />
```
Alternatively, you can set the CSP in the HTML document response header `Content-Security-Policy`. Check your initial app HTML document load for the header to make sure you are setting it to the desired value.
## Explore supported features
The observability plugins supports the following features. After the SDK and plugins are initialized, you can access these from within your application:
 * [Configuration for client-side observability](/docs/sdk/features/observability-config-client-side)
 * [Configuration for session replay](/docs/sdk/features/session-replay-config#javascript)
 * [Errors](/docs/sdk/features/observability-errors#javascript)
 * [Logs](/docs/sdk/features/observability-logs#javascript)
 * [Metrics](/docs/sdk/features/observability-metrics#javascript)
 * [Tracing](/docs/sdk/features/observability-traces#javascript)
## Review observability data in LaunchDarkly
After you initialize the SDK and observability plugins, your application automatically starts sending observability data back to LaunchDarkly in the form of custom events. You can review this information in the LaunchDarkly user interface. To learn how, read [Observability](/docs/home/observability).
Specifically, the observability data includes events that LaunchDarkly uses to automatically create the following metrics:
 * Average, P95, and P99 Cumulative Layout Shift (CLS) per context (LaunchDarkly)
 * Average, P95, and P99 Document Load Latency per context (LaunchDarkly)
 * Percentage of users with errors (LaunchDarkly)
 * Average, P95, and P99 First Contentful Paint (FCP) per context (LaunchDarkly)
 * Average, P95, and P99 First Input Delay (FID) per context (LaunchDarkly)
 * Average, P95, and P99 Interaction to Next Paint (INP) per context (LaunchDarkly)
 * Average, P95, and P99 Largest Contentful Paint (LCP) (LaunchDarkly)
 * Average, P95, and P99 Time to First Byte (TTFB) per context (LaunchDarkly)
To learn more, read [Metrics autogenerated from observability events](/docs/home/metrics/autogen-metrics#metrics-autogenerated-from-observability-events).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs