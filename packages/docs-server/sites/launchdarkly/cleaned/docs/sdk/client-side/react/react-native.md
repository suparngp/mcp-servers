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
 * [Get started](#get-started)
 * [Understand version compatibility](#understand-version-compatibility)
 * [Install the SDK](#install-the-sdk)
 * [Initialize the client and identify a context](#initialize-the-client-and-identify-a-context)
 * [Background fetch](#background-fetch)
 * [Shut down the client](#shut-down-the-client)
 * [Data collection](#data-collection)
 * [Troubleshooting](#troubleshooting)
 * [Supported features](#supported-features)
##### Recent major versions
**Version 10 of the React Native SDK has been rewritten in pure TypeScript and is compatible with Expo**. Only iOS and Android platforms are supported. Web is not supported. Version 10 is a rewrite of the React Native SDK. It is based on the JavaScript SDK, and it replaces [launchdarkly-react-native-client-sdk](https://github.com/launchdarkly/react-native-client-sdk). To learn more about upgrading, read [React Native SDK 9.x to 10.0 migration guide](/docs/sdk/client-side/react/migration-9-to-10-react-native).
## Overview
This topic documents how to get started with the React Native SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and sample applications:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/) 
GitHub repository | [react-native](https://github.com/launchdarkly/js-core/tree/main/packages/sdk/react-native) 
Sample Expo application | [React Native](https://github.com/launchdarkly/js-core/tree/main/packages/sdk/react-native/example) 
Published module | [npm](https://www.npmjs.com/package/@launchdarkly/react-native-client-sdk) 
## Get started
After you complete the [Get started](/docs/home/getting-started) process, follow these instructions to start using the LaunchDarkly SDK in your React Native code:
 * [Understand version compatibility](/docs/sdk/client-side/react/react-native#understand-version-compatibility)
 * [Install the SDK](/docs/sdk/client-side/react/react-native#install-the-sdk)
 * [Initialize the client and identify a context](/docs/sdk/client-side/react/react-native#initialize-the-client-and-identify-a-context)
### Understand version compatibility
##### Expo usage
The LaunchDarkly React Native client-side SDK version 10.x is compatible with Expo. Only iOS and Android platforms are supported. Web is not supported.
Earlier versions of the LaunchDarkly React Native SDK are not compatible with the Expo managed workflow because they use native modules. Consider upgrading to the 10.x version of the LaunchDarkly SDK, or using the [bare workflow](https://docs.expo.dev/bare/overview/) instead.
The following table describes the LaunchDarkly React Native SDK version compatibility:
LaunchDarkly React Native SDK version | Compatible with 
---|--- 
10.x | React Native 0.72, 0.73, 0.74, 0.76; Expo 51, Expo 52 
9.x (EOL) | React Native 0.73 
8.x (EOL) | React Native 0.69 through 0.72 
7.x (EOL) | React Native 0.69 
6.x (EOL) | Xcode 12.2 or higher and React Native 0.64 
To learn more, read [Releases](https://github.com/launchdarkly/react-native-client-sdk/releases).
### Install the SDK
To install the SDK:
 1. Install the LaunchDarkly SDK as a dependency.
We recommend making the LaunchDarkly [observability plugin](/docs/sdk/observability) available as well. This plugin collects and sends observability data to LaunchDarkly. This means you can review error monitoring and logs from within the LaunchDarkly UI. It requires the React Native SDK version 10.10 or later.
Here’s how:
Installing, React Native SDK v10
```
$
| yarn add @launchdarkly/react-native-client-sdk
---|--- 
>
| 
>
| # optional observability plugin, requires React Native SDK v10.10+
>
| yarn add @launchdarkly/observability-react-native
```
 1. The LaunchDarkly React Native SDK version 10 uses [`@react-native-async-storage/async-storage`](https://github.com/react-native-async-storage/async-storage) for bootstrapping:
 * If you are using Expo, skip this step and continue to step 3.
 * If you are not using Expo, you must explicitly add `@react-native-async-storage/async-storage` as a dependency to your project.
Adding the async storage dependency
```
$
| yarn add @react-native-async-storage/async-storage
---|--- 
```
 1. Run `npx pod-install`.
 2. Next, import the SDK into your project:
React Native SDK v10
```
1
| import { LDProvider, ReactNativeLDClient } from '@launchdarkly/react-native-client-sdk';
---|--- 
2
| 
3
| // optional observability plugin, requires React Native SDK v10.10+
4
| import { Observability, LDObserve } from '@launchdarkly/observability-react-native';
```
##### React Native SDK credentials
The React Native SDK uses a mobile key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
Mobile keys are not secret and you can expose them in your client-side code without risk. However, never embed a server-side SDK key into a client-side application.
 1. After the SDK is imported, create a single, shared instance of `ReactNativeLDClient`. To create this, you need your environment’s mobile key. This authorizes your application to connect to a particular environment within LaunchDarkly.
 2. After you instantiate `ReactNativeLDClient`, pass it to `LDProvider`. `LDProvider` uses the React context API to store and pass data to child components through hooks. It requires the client.
### Initialize the client and identify a context
In version 10 of the SDK, you do not specify a context when you initialize the client. Instead, you must provide the context in an `identify()` call, for example on application mount. The `identify()` method returns a promise that can be awaited. End users will receive fallback values until you specify a context by calling `identify()`.
##### Always include a timeout parameter
Do not configure your SDK to initialize without a timeout parameter. Doing so will cause your app never to load if there is a connectivity problem. We recommend setting a timeout for no more than 1-5 seconds.
In v10, the `identify` timeout defaults to 5 seconds. In older versions, the `client.configure` takes a timeout parameter.
The following example shows the simplest way to create a shared instance of `ReactNativeLDClient`, and identify a context:
React Native SDK v10.x
```
1
| const options = {
---|--- 
2
| // optional observability plugin, requires React Native SDK v10.10+
3
| plugins: [ new Observability() ],
4
| // other options
5
| }
6
| 
7
| const client = new ReactNativeLDClient('mobile-key-123abc', AutoEnvAttributes.Enabled, options);
8
| 
9
| const context = { kind: 'user', key: 'user-key-123abc' }
10
| 
11
| const App = () => {
12
| // call identify on App mount or later in some other component
13
| useEffect(() => {
14
| client.identify(context).catch((e: any) => console.log(e));
15
| }, []);
16
| 
17
| return (
18
| <LDProvider client={client}>
19
| {/* your application code here */}
20
| <YourComponent />
21
| </LDProvider>
22
| );
23
| };
24
| 
25
| export default App;
```
To learn more about the specific configuration options available in this SDK, read [`LDOptions`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/interfaces/LDOptions.html).
##### ReactNativeLDClient should be a singleton
We recommend making `ReactNativeLDClient` a singleton for each LaunchDarkly project. The client instance maintains internal state that allows LaunchDarkly to serve feature flags without making any remote requests.
##### Making feature flags available to this SDK
You must make feature flags available to mobile SDKs before the SDK can evaluate those flags. If an SDK tries to evaluate a feature flag that is not available, LaunchDarkly serves the fallback value for that flag.
To make a flag available to this SDK, check the **SDKs using Mobile key** checkbox during flag creation, or toggle on the option in the flag’s right sidebar. To make all of a project’s flags available to this SDK by default, check the **SDKs using Mobile key** checkbox on your project’s [Flag settings page](/docs/home/account/edit-project).
## Background fetch
In version 10, the React Native SDK defaults to a `streaming` connection mode. In this mode, your application receives updates when it is in the foreground and does not when it is in the background. To learn more, read [Offline mode](/docs/sdk/features/offline-mode#react-native).
In previous versions, the SDK defaulted to the background fetch behavior for the platform it was running on.
## Shut down the client
Shut down the client when your application terminates. To learn more, read [Shutting down](/docs/sdk/features/shutdown#react-native).
## Data collection
To learn more about data collection within this SDK and implications on submissions to the Apple App Store, read [Apple App Store data collection policy](/docs/sdk/concepts/apple-app-store).
## Troubleshooting
If your application logs show the error `LaunchDarklyFlagFetchError: network error`, it may indicate a problem with network connectivity between your SDK and LaunchDarkly.
For steps to resolve this issue, read the LaunchDarkly Knowledge Base article [Error “LaunchDarklyFlagFetchError: network error”](https://support.launchdarkly.com/hc/en-us/articles/12998125691419-Error-LaunchDarklyFlagFetchError-network-error).
## Supported features
This SDK supports the following features:
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#react-native)
 * [Automatic environment attributes](/docs/sdk/features/environment-attributes#react-native)
 * [Configuration](/docs/sdk/features/config#react-native), including
 * [Application metadata configuration](/docs/sdk/features/app-config#react-native)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#react-native)
 * [Context configuration](/docs/sdk/features/context-config#react-native)
 * [Evaluating flags](/docs/sdk/features/evaluating#react-native)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#react-native)
 * [Flushing events](/docs/sdk/features/flush#react-native)
 * [Getting all flags](/docs/sdk/features/all-flags#react-native)
 * [Hooks](/docs/sdk/features/hooks#react-native)
 * [Identifying and changing contexts](/docs/sdk/features/identify#react-native)
 * [Logging](/docs/sdk/features/logging#react-native)
 * [Monitoring SDK status](/docs/sdk/features/monitoring#react-native)
 * [Multiple environments](/docs/sdk/features/multiple-environments#react-native)
 * [Observability](/docs/sdk/observability/react-native)
 * [Offline mode](/docs/sdk/features/offline-mode#react-native)
 * [OpenTelemetry in client-side SDKs](/docs/sdk/features/opentelemetry-client-side)
 * [Private attributes](/docs/sdk/features/private-attributes#react-native)
 * [Relay Proxy configuration, using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode#react-native)
 * [Sending custom events](/docs/sdk/features/events#react-native)
 * [Shutting down](/docs/sdk/features/shutdown#react-native)
 * [Subscribing to flag changes](/docs/sdk/features/flag-changes#react-native)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs