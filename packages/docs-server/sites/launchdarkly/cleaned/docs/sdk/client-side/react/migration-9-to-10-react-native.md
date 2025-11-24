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
 * [Understanding changes to client initialization](#understanding-changes-to-client-initialization)
 * [Understanding changes to the client](#understanding-changes-to-the-client)
 * [Understanding changes to configuration options](#understanding-changes-to-configuration-options)
 * [Understanding changes to contexts](#understanding-changes-to-contexts)
## Overview
This topic explains the changes in the React Native SDK version 10 release and how to migrate to that version.
**Version 10.0 includes the following breaking changes** :
 * Version 10 of the React Native SDK has been rewritten in pure JavaScript and is compatible with Expo 49 and 50. It is compatible with React Native 0.72 and 0.73.
 * The `LDClient` has been renamed `ReactNativeLDClient`, and several of the methods have changed. To learn more, read [Understanding changes to client initialization](/docs/sdk/client-side/react/migration-9-to-10-react-native#understanding-changes-to-client-initialization) and [Understanding changes to the client](/docs/sdk/client-side/react/migration-9-to-10-react-native#understanding-changes-to-the-client), below.
 * The `LDConfig` configuration object has been renamed to `LDOptions`, and several of the configuration options have changed. To learn more, read [Understanding changes to configuration options](/docs/sdk/client-side/react/migration-9-to-10-react-native#understanding-changes-to-configuration-options), below.
 * The `LDContext` has been updated: anonymous contexts now require a context key, which should be set to an empty string. To learn more, read [Understanding changes to contexts](/docs/sdk/client-side/react/migration-9-to-10-react-native#understanding-changes-to-contexts), below.
## Understanding changes to client initialization
There are several breaking changes to the client initialization.
Version 10 of the SDK provides a new `ReactNativeLDClient` class, which you can instantiate and pass to `LDProvider`.
When you instantiate the `ReactNativeLDClient` class, you must pass in your mobile key and indicate whether to collect [environment attributes](/docs/sdk/features/environment-attributes#react-native). These are no longer set as part of the configuration.
`LDProvider` uses the React context API to store and pass data to child components through hooks. It requires the client.
In version 10 of the SDK, you do not specify a context when you initialize the client. Instead, you must provide the context in an `identify()` call, for example on application mount. End users will receive fallback values until you specify a context by calling `identify()`.
The following example shows the simplest way to create a shared instance of `ReactNativeLDClient`, and identify a context:
Client initialization in React Native SDK v10Client initialization in React Native SDK v9
```
1
| const client = new ReactNativeLDClient('mobile-key-123abc', AutoEnvAttributes.Enabled, options);
---|--- 
2
| 
3
| const context = { kind: 'user', key: 'user-key-123abc' }
4
| 
5
| const App = () => {
6
| 
7
| // call identify on App mount or later in some other component
8
| useEffect(() => {
9
| client.identify(context).catch((e: any) => console.log(e));
10
| }, []);
11
| 
12
| return (
13
| <LDProvider client={client}>
14
| {/* your application code here */}
15
| <YourComponent />
16
| </LDProvider>
17
| );
18
| };
19
| 
20
| export default App;
```
The `identify()` method returns a promise that can be awaited:
Waiting for identify() from cache or networkWaiting for identify() from network
```
1
| // This example waits for the context to be identified,
---|--- 
2
| // either resolved from cache or the network
3
| await client.identify(context);
```
To learn more, read [Get started](/docs/sdk/client-side/react/react-native#get-started) in the [React Native SDK reference](/docs/sdk/client-side/react/react-native).
## Understanding changes to the client
There are several breaking changes to the client.
In version 10.0 of the SDK, the `LDClient` has been renamed `ReactNativeLDClient`. The following `ReactNativeLDClient` methods have changed:
 * The `allFlags` method now no longer accepts any arguments and returns `LDFlagSet` directly, rather than returning a promise. If flags cannot be evaluated it returns an empty object. To learn more, read [Getting all flags](/docs/sdk/features/all-flags#react-native).
 * The `*Variation` methods now return the flag value directly, rather than returning a promise. Additionally, there are now corresponding hooks for each of the `*Variation` methods. For example, you can use the hook `useBoolVariation()` instead of `client.boolVariation()`. To learn more, read [Evaluating flags](/docs/sdk/features/evaluating#react-native).
 * The `*VariationDetail` methods now return evaluation details directly, rather than returning a promise. Additionally, there are now corresponding hooks for each of the `*Variation` methods. For example, you can use the hook `useBoolVariationDetail()` instead of `client.boolVariationDetail()`. To learn more, read [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#react-native).
 * The `flush` method now returns a promise that resolves to an object containing an error, if there is one, and a boolean result. To learn more, read [Flushing events](/docs/sdk/features/flush#react-native).
 * The `getConnectionMode` method signature has changed. It returns `ConnectionMode` directly, rather than returning a promise. To learn more, read [`getConnectionMode`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/classes/LDClientImpl.html#getConnectionMode).
The following new client methods have been added:
 * The `getContext` method has been added. It returns the current context if `identify` has been called. To learn more, read [`getContext`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/classes/LDClientImpl.html#getContext).
 * The `on` and `off` methods, used for registering and unregistering event listeners, have been added. The `on` method supports the following event names: `error`, `change`. To learn more, read [Subscribing to flag changes](/docs/sdk/features/flag-changes#react-native).
 * The `setConnectionMode` method has been added. It sets the SDK connection mode. To learn more, read [`setConnectionMode`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/classes/LDClientImpl.html#setConnectionMode).
 * The `variation` and `variationDetail` methods have been added. These are untyped methods you can use to determine the variation of a feature flag. However, we recommend using strongly typed variation methods which perform type checks and handle type errors. To learn more, read [Evaluating flags](/docs/sdk/features/evaluating#react-native) and [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#react-native).
The following client methods have been removed:
 * `configure`: Instead, use the `ReactNativeLDClient` constructor to create a new client instance. Then call `identify`.
 * `getLastFailedConnection`
 * `getLastFailure`
 * `getLastSuccessfulConnection`
 * `getVersion`
 * `isInitialized`
 * `isOffline`
 * `registerAllFlagsListener`
 * `registerCurrentConnectionModeListener`
 * `registerFeatureFlagListener`
 * `setOffline`
 * `setOnline`
 * `unregisterAllFlagsListener`
 * `unregisterCurrentConnectionModeListener`
 * `unregisterFeatureFlagListener`
To learn more, read the [release notes in GitHub](https://github.com/launchdarkly/js-core/releases/tag/react-native-client-sdk-v10.0.0).
## Understanding changes to configuration options
There are several breaking changes to the configuration options.
In version 10.0 of the SDK, the following configuration options have changed:
 * The `LDConfig` object is now called `LDOptions`. To learn more, read [Configuration](/docs/sdk/features/config#react-native).
 * The `application` option is now called `applicationInfo`. If you have enabled the collection of [environment attributes](/docs/sdk/features/environment-attributes#react-native), the `ld_application` context will only be returned if you set `applicationInfo`. To learn more, read [Application metadata configuration](/docs/sdk/features/app-config#react-native).
 * The `debugMode` option is now called `debug`.
 * The `diagnosticRecordingInterval` is now specified in seconds, not milliseconds.
 * The `evaluationReasons` option is now called `withReasons`. To learn more, read [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#react-native).
 * The `eventsCapacity` is now called `capacity`.
 * The `flushInterval` is now specified in seconds, not milliseconds and defaults to 2 seconds.
 * The `streamUrl`, `pollUrl`, and `eventsUrl` configuration options are now called `streamUri`, `baseUri`, and `eventsUri`, respectively. To learn more, read [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#react-native).
In version 10.0 of the SDK, the following configuration options have been added:
 * `initialConnectionMode`: Sets the mode to use for connections when the SDK is initialized. To learn more, read [`initialConnectionMode`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/interfaces/LDOptions.html#initialConnectionMode).
 * `logger`: This is an object that will perform logging for the client. In the default configuration, the SDK sends output to the console, with a default log level of `info`. To learn more, read [Logging](/docs/sdk/features/logging#react-native).
 * `sendEvents`: Whether to send analytics events back to LaunchDarkly. By default, this is true.
 * `streamInitialReconnectDelay`: Sets the initial reconnect delay for the streaming connection, in seconds. The default value is 1. To learn more, read [`streamInitialReconnectDelay`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/interfaces/LDOptions.html#streamInitialReconnectDelay).
In version 10.0 of the SDK, the following configuration options have been removed:
 * `backgroundPollingInterval`
 * `connectionTimeout`
 * `disableBackgroundUpdating`
 * `enableAutoEnvAttributes`: Specify this as the second argument when constructing the client.
 * `maxCachedContexts`
 * `mobileKey`: In version 10, you pass the mobile key in during client initialization. You can no longer set it as a configuration option. To learn more, read [Understanding changes to client initialization](/docs/sdk/client-side/react/migration-9-to-10-react-native#understanding-changes-to-client-initialization), above.
 * `offline`: Use `setConnectionMode`.
 * `pollingInterval`
 * `pollUrl`
 * `secondaryMobileKeys`
 * `stream`
 * `useReport`
To learn more, read the [release notes in GitHub](https://github.com/launchdarkly/js-core/releases/tag/react-native-client-sdk-v10.0.0).
## Understanding changes to contexts
In version 10 of the SDK, you must include the `key` attribute when building the context.
If the context is anonymous, you should set the `key` to an empty string. The SDK will automatically set the key to a LaunchDarkly-specific, device-unique string that is consistent between app restarts and device reboots.
The SDK gives a usage error if you omit the `key` attribute. It also gives a usage error if you set the key to an empty string and do not mark the context as anonymous.
Here’s how:
React Native SDK v10
```
1
| // This device context is anonymous
---|--- 
2
| const deviceContext = {
3
| // The key attribute is required and should be empty
4
| // The SDK will automatically generate a unique, stable key
5
| key: '',
6
| kind: 'device',
7
| deviceId: '12345',
8
| anonymous: true
9
| }
```
In versions 7 through 9 of the SDK, you could omit the context key when building an anonymous context, and the client would automatically set it to a LaunchDarkly-specific, device-unique string that is consistent between app restarts and device reboots.
To learn more, read [Anonymous contexts and users](/docs/sdk/features/anonymous#react-native).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs