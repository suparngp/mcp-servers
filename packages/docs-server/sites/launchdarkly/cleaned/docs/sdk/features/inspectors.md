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
 * [Inspector types](#inspector-types)
 * [JavaScript](#javascript)
 * [React Native](#react-native)
 * [React Web](#react-web)
## Overview
This topic explains how to configure inspectors for client-side JavaScript LaunchDarkly SDKs.
## Inspector types
There are different types of inspectors you can provide when configuring the JavaScript SDK. They are intended for monitoring, analytics, or debugging purposes. The application should not use these interfaces to access flags for the purpose of controlling application flow.
These are the inspector types:
 * [Flag Used](https://launchdarkly.github.io/js-sdk-common/interfaces/LDInspectionFlagUsedHandler.html)
 * [Flag Details Changed](https://launchdarkly.github.io/js-sdk-common/interfaces/LDInspectionFlagDetailsChangedHandler.html)
 * [Flag Detail Changed](https://launchdarkly.github.io/js-sdk-common/interfaces/LDInspectionFlagDetailChangedHandler.html)
Details about each SDK’s configuration are available in the SDK-specific sections below:
 * [JavaScript](/docs/sdk/features/inspectors#javascript)
 * [React Native](/docs/sdk/features/inspectors#javascript): The React Native SDK relies on the JavaScript SDK for user-related functionality.
 * [React Web](/docs/sdk/features/inspectors#javascript): The React Web SDK relies on the JavaScript SDK for user-related functionality.
### JavaScript
###### Expand JavaScript code sample
The inspector `type` defines when in the SDK lifecycle it calls the `method` callback, and with what arguments.
To configure a `Flag Used` inspector, set type to `flag-used` and pass in a method that matches the expected signature:
JavaScript
```
1
| const client = LDClient.initialize(
---|--- 
2
| 'client-side-id-123abc',
3
| context,
4
| options: {
5
| inspectors: [
6
| {
7
| type: 'flag-used',
8
| name: 'example-flag-used',
9
| method: (flagKey, flagDetail) => {
10
| console.log(flagKey)
11
| console.log(flagDetail)
12
| }
13
| }
14
| ]
15
| }
16
| );
17
| 
18
| try {
19
| await client.waitForInitialization(5);
20
| proceedWithSuccessfullyInitializedClient();
21
| } catch(err) {
22
| // Client failed to initialized or timed out
23
| // variation() calls return fallback values until initialization completes
24
| }
```
### React Native
Inspector-related functionality provided by the [JavaScript SDK](/docs/sdk/features/inspectors#javascript) is available but deprecated in version 10 of the React Native SDK. We recommend that you use [hooks](/docs/sdk/features/hooks#react-native) instead.
### React Web
All inspector-related functionality provided by the [JavaScript SDK](/docs/sdk/features/inspectors#javascript) is also available in the React Web SDK.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs