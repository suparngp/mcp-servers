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
 * [Client-side SDKs](#client-side-sdks)
 * [Android](#android)
 * [iOS](#ios)
 * [React Native](#react-native)
## Overview
This topic explains how to support multiple environments in LaunchDarkly mobile SDKs.
## Client-side SDKs
Some LaunchDarkly client-side mobile SDKs support having multiple `LDClient` instances tied to separate mobile keys. This allows the SDK to evaluate flags from multiple environments. The SDK can evaluate flags from different environments whether they are all in the same LaunchDarkly project or different LaunchDarkly projects.
However, other LaunchDarkly client-side mobile SDKs, including Android, iOS, and React Native, do not support multiple `LDClient` instances. Instead, you can configure the one SDK instance to connect to multiple environments.
This feature is available in the following client-side SDKs:
 * [Android](/docs/sdk/features/multiple-environments#android)
 * [iOS](/docs/sdk/features/multiple-environments#ios)
 * [React Native](/docs/sdk/features/multiple-environments#react-native)
### Android
###### Expand Android code sample
All `LDClient` instances evaluate against the same `LDContext`. The mobile keys for additional environments are specified, along with identifying names, in a map passed to your `LDConfig` object.
Here’s how:
Android SDK v5.x (Java)Android SDK v5.x (Kotlin)Android SDK v4.x (Java)Android SDK v4.x (Kotlin)
```
1
| Map<String, String> otherKeys = new HashMap<String, String>();
---|--- 
2
| otherKeys.put("platform", "platform-mobile-key-456def");
3
| otherKeys.put("core", "core-mobile-key-789ghi");
4
| 
5
| LDConfig ldConfig = new LDConfig.Builder(AutoEnvAttributes.Enabled)
6
| .mobileKey("mobile-key-123abc")
7
| .secondaryMobileKeys(otherKeys)
8
| .build();
9
| 
10
| LDContext context = LDContext.builder("context-key-123abc")
11
| .set("email", "sandy@example.com")
12
| .build();
13
| 
14
| LDClient.init(this.getApplication(), ldConfig, context);
```
To access the secondary mobile key instances, use the `getForMobileKey` method on LDClient. This method takes the identifier name assigned to your environment key in the `secondaryMobileKeys` map and returns the associated LDClient instance. Track calls, listeners, and flag evaluation are all tied to the client instance they are evaluated against.
Here’s how:
JavaKotlin
```
1
| LDClient coreInstance = LDClient.getForMobileKey("core");
---|--- 
2
| // Variation determines whether or not a flag is enabled for a specific context
3
| coreInstance.boolVariation("core-flag", false);
4
| // allFlags produces a map of feature flag keys to their values
5
| coreInstance.allFlags();
6
| // track records actions end users take in your app
7
| coreInstance.track("metric-key-123abc", data);
```
As all the client instances use the same LDClient object, some calls affect all instances.
These methods include:
Android SDK v4.0+ (Java)Android SDK v4.0+ (Kotlin)
```
1
| LDClient coreInstance = LDClient.getForMobileKey("core");
---|--- 
2
| 
3
| // Calls affect all LDClient Instances
4
| coreInstance.identify(/*Context Object*/);
5
| coreInstance.flush();
6
| coreInstance.setOffline();
7
| coreInstance.setOnline();
8
| coreInstance.close();
```
To learn more, read [`LDClient`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDClient.html).
### iOS
###### Expand iOS code sample
All `LDClient` instances evaluate against the same `LDContext`. The mobile keys for additional environments are specified, along with identifying names, in a map passed to your `LDConfig` object.
iOS SDK v9.x (Swift)iOS SDK v9.x (Objective-C)iOS SDK v8.x (Swift)iOS SDK v8.x (Objective-C)
```
1
| let context = try LDContextBuilder(key: "context-key-123abc").build().get()
---|--- 
2
| var config = LDConfig(mobileKey: "mobile-key-123abc", autoEnvAttributes: .enabled)
3
| // The SDK throws error strings if you add duplicate keys or put the primary key or name in secondaryMobileKeys.
4
| try! config.setSecondaryMobileKeys(["platform": "platform-mobile-key-123abc", "core": "core-mobile-key-123abc"])
5
| LDClient.start(config: config, context: context)
```
To access the secondary mobile key instances, use the `LDClient.get` static method on LDClient. This method takes the identifier name assigned to your environment key in the `secondaryMobileKeys` map and returns the associated LDClient instance. Track calls, listeners, and flag evaluation are all tied to the client instance they are evaluated against.
Here’s how:
SwiftObjective-C
```
1
| let coreInstance = LDClient.get(environment: "core")
---|--- 
2
| // Variation determines whether or not a flag is enabled for a specific context
3
| let coreFlagValue = coreInstance?.boolVariation(forKey: "core-flag-key-123abc", defaultValue: false)
4
| // allFlags produces a map of feature flag keys to their values
5
| let allFlags: [String: LDValue]? = coreInstance?.allFlags
6
| // track records actions end users take in your app
7
| try coreInstance?.track(key: "track-example-event-key", data: data)
```
As all the client instances use the same `LDClient` object, some SDK functionality affects all instances.
These methods include:
SwiftObjective-C
```
1
| coreInstance.identify(/*Context Object*/)
---|--- 
2
| coreInstance.flush()
3
| coreInstance.setOnline(/*true or false*/)
4
| coreInstance.close()
```
To learn more, read [`LDClient`](https://launchdarkly.github.io/ios-client-sdk/Classes/LDClient.html).
### React Native
###### Expand React Native code sample
Starting with version 10 of the React Native SDK, if you need to support multiple environments in the same application, you can create multiple clients. We do not recommend using multiple environments within one application, because it quickly becomes complex and difficult to manage. If your setup requires it, here’s how:
React Native SDK, v10
```
1
| // not recommended: support multiple environments by creating multiple clients
---|--- 
2
| const client1 = new ReactNativeLDClient('mobile-key-123abc', AutoEnvAttributes.Enabled);
3
| const client2 = new ReactNativeLDClient('mobile-key-456def', AutoEnvAttributes.Enabled);
```
In previous versions of the React Native SDK, all `LDClient` instances evaluated against the same `LDContext`. The mobile keys for additional environments were specified, along with identifying names, in a map passed to your `LDConfig` object.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs