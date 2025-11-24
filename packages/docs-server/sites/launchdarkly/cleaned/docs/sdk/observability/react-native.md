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
This topic documents how to get started with the LaunchDarkly observability plugin for the React Native SDK.
The React Native SDK supports the **observability plugin** for error monitoring, logging, and tracing.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [Observability plugin API docs](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-react-native/) 
GitHub repository | [@launchdarkly/observability-react-native](https://github.com/launchdarkly/observability-sdk/tree/main/sdk/%40launchdarkly/observability-react-native) 
Published module | [npm](https://www.npmjs.com/package/@launchdarkly/observability-react-native) 
## Prerequisites and dependencies
This reference guide assumes that you are somewhat familiar with the LaunchDarkly [React Native SDK](/docs/sdk/client-side/react/react-native).
The observability plugin is compatible with the [React Native SDK](/docs/sdk/client-side/react/react-web), version 10.10.0 and later.
The React Native SDK version 10.x is compatible with Expo. Only iOS and Android platforms are supported. Web is not supported. The React Native SDK v10.x is compatible with React Native 0.72, 0.73, 0.74, 0.76, and with Expo 51, Expo 52. Not all React Native and Expo versions have been tested with the observability plugin, as it is still in Early Access.
## Get started
Follow these steps to get started:
 * [Install the plugin](/docs/sdk/observability/react-native#install-the-plugin)
 * [Initialize the React Native SDK client](/docs/sdk/observability/react-native#initialize-the-client)
 * [Configure the plugin options](/docs/sdk/observability/react-native#configure-the-plugin-options)
 * [Explore supported features](/docs/sdk/observability/react-native#explore-supported-features)
 * [Review observability data in LaunchDarkly](/docs/sdk/observability/react-native#review-observability-data-in-launchdarkly)
## Install the plugin
LaunchDarkly uses a plugin to the React Native SDK to provide observability.
The first step is to make both the SDK and the observability plugin available as dependencies.
Here’s how:
npm, React Native SDK v10.10+yarn, React Native SDK v10.10+
```
$
| npm install @launchdarkly/react-native-client-sdk
---|--- 
>
| npm install @launchdarkly/observability-react-native
```
Then, import the plugin into your code:
Import, React Native SDK v10.10+
```
1
| import { ReactNativeLDClient } from '@launchdarkly/react-native-client-sdk';
---|--- 
2
| import { Observability, LDObserve } from '@launchdarkly/observability-react-native';
```
## Initialize the client
Next, initialize the SDK and the plugin.
To initialize, you need your LaunchDarkly environment’s mobile key. This authorizes your application to connect to a particular environment within LaunchDarkly. To learn more, read [Initialize the client and identify a context](/docs/sdk/client-side/react/react-native#initialize-the-client-and-identify-a-context) in the React Native SDK reference guide.
##### React Native observability SDK credentials
The React Native observability SDK uses a mobile key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
Mobile keys are not secret and you can expose them in your client-side code without risk. However, never embed a server-side SDK key into a client-side application.
Here’s how to initialize the SDK and plugin:
Initialize, React Native SDK v10.10+
```
1
| const client = new ReactNativeLDClient(
---|--- 
2
| 'mobile-key-123abc',
3
| AutoEnvAttributes.Enabled,
4
| {
5
| plugins: [
6
| new Observability()
7
| ],
8
| }
9
| );
```
## Configure the plugin options
You can configure options for the observability plugin when you initialize the SDK. The plugin constructor takes an optional object with the configuration details.
Here is an example:
Plugin options, React Native SDK v10.10+
```
1
| const client = new ReactNativeLDClient(
---|--- 
2
| 'mobile-key-123abc',
3
| AutoEnvAttributes.Enabled,
4
| {
5
| plugins: [
6
| new Observability({
7
| serviceName: 'example-service',
8
| // we recommend setting service_version to the latest deployed git SHA
9
| serviceVersion: 'example-sha'
10
| })
11
| ],
12
| }
13
| );
```
For more information on plugin options, read [Configuration for client-side observability](/docs/sdk/features/observability-config-client-side).
## Explore supported features
The observability plugins supports the following features. After the SDK and plugins are initialized, you can access these from within your application:
 * [Configuration for client-side observability](/docs/sdk/features/observability-config-client-side)
 * [Errors](/docs/sdk/features/observability-errors#react-native)
 * [Logs](/docs/sdk/features/observability-logs#react-native)
 * [Metrics](/docs/sdk/features/observability-metrics#react-native)
 * [Tracing](/docs/sdk/features/observability-traces#react-native)
## Review observability data in LaunchDarkly
After you initialize the SDK and observability plugin, your application automatically starts sending observability data back to LaunchDarkly, including errors and logs. You can review this information in the LaunchDarkly user interface. To learn how, read [Observability](/docs/home/observability).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs