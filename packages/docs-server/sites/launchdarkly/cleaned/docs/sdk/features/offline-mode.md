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
 * [Fallback values and client-side SDKs](#fallback-values-and-client-side-sdks)
 * [Client-side SDKs](#client-side-sdks)
 * [.NET (client-side)](#net-client-side)
 * [Android](#android)
 * [C++ (client-side)](#c-client-side)
 * [Flutter](#flutter)
 * [iOS](#ios)
 * [React Native](#react-native)
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [C++ (server-side)](#c-server-side)
 * [Erlang](#erlang)
 * [Go](#go)
 * [Haskell](#haskell)
 * [Java](#java)
 * [Lua](#lua)
 * [Node.js (server-side)](#nodejs-server-side)
 * [PHP](#php)
 * [Python](#python)
 * [Ruby](#ruby)
 * [Rust](#rust)
## Overview
This topic explains how to set an SDK to offline mode. Offline mode closes an SDK’s connection to LaunchDarkly and switches to a feature flag’s last known values.
### Fallback values and client-side SDKs
For client-side SDKs, if LaunchDarkly is unreachable or if an end user’s device is not connected to a network, such as when the device is in airplane mode, the SDK uses the latest stored flag variation values in memory. If there are no previously stored variation values, the SDK uses the fallback values that you define in your code.
In some situations, you might want to avoid remote calls to LaunchDarkly and use fallback values for your feature flags. For example, if your software is both cloud-hosted and distributed to customers to run on-premises, it might make sense to use fallback values when running on-premises. You can do this by setting offline mode in the client’s config object. When the client is in offline mode, it makes no network requests, so it is suitable for unit-testing.
Details about each SDK’s configuration are available in the SDK-specific sections below.
 * [Client-side SDKs](/docs/sdk/features/offline-mode#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/offline-mode#server-side-sdks)
## Client-side SDKs
This feature is available in the following client-side SDKs:
 * [.NET (client-side)](/docs/sdk/features/offline-mode#net-client-side)
 * [Android](/docs/sdk/features/offline-mode#android)
 * [C++ (client-side)](/docs/sdk/features/offline-mode#c-client-side)
 * [Flutter](/docs/sdk/features/offline-mode#flutter)
 * [iOS](/docs/sdk/features/offline-mode#ios)
 * [React Native](/docs/sdk/features/offline-mode#react-native)
### .NET (client-side)
###### Expand .NET (client-side) code sample
In some situations, you might want to stop making remote calls to LaunchDarkly and rely on locally cached flag values for future evaluations.
Here’s how:
C#
```
1
| var config = Configuration
---|--- 
2
| .Builder("mobile-key-123abc", ConfigurationBuilder.AutoEnvAttributes.Enabled)
3
| .Offline(true)
4
| .Build();
5
| LdClient client = LdClient.Init(config);
```
### Android
###### Expand Android code sample
In some situations, you might want to stop making remote calls to LaunchDarkly and rely on locally cached flag values for future evaluations.
Here’s how:
Android SDK v5.x (Java)Android SDK v5.x (Kotlin)Android SDK v4.x (Java)Android SDK v4.x (Kotlin)
```
1
| LDConfig ldConfig = new LDConfig.Builder(AutoEnvAttributes.Enabled)
---|--- 
2
| .mobileKey("mobile-key-123abc")
3
| .setOffline(true)
4
| .build();
5
| 
6
| LDClient client = LDClient.init(this.getApplication(), ldConfig, context);
7
| 
8
| // Or to switch an already-instantiated client to offline mode:
9
| client.setOffline();
```
### C++ (client-side)
###### Expand C++ (client-side) code sample
In some situations, you might want to stop making remote calls to LaunchDarkly. You can set the SDK offline, and no data will come into or out of the SDK. All flags will return the fallback values defined in your code.
Here’s how:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)
```
1
| config_builder.Offline(true);
---|--- 
```
### Flutter
###### Expand Flutter code sample
In some situations, you might want to stop making remote calls to LaunchDarkly and rely on locally cached flag values for future evaluations.
Here’s how:
Flutter SDK v4Flutter SDK v3.xFlutter SDK v2.xFlutter SDK v1.x
```
1
| final config = LDConfig(
---|--- 
2
| CredentialSource.fromEnvironment(),
3
| AutoEnvAttributes.enabled,
4
| dataSourceConfig: DataSourceConfig(
5
| initialConnectionMode: ConnectionMode.streaming // or .polling, or .offline
6
| ),
7
| );
8
| 
9
| await client.start(config, context);
10
| 
11
| // To switch an already-instantiated client to offline mode:
12
| client.offline = true;
13
| 
14
| // To switch it back:
15
| client.offline = false;
```
To learn more, read [`offline`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDClient/offline.html).
### iOS
###### Expand iOS code sample
In some situations, you might want to stop making remote calls to LaunchDarkly and rely on locally cached flag values for future evaluations.
The SDK protects itself from multiple rapid calls to `setOnline(true)` by enforcing an increasing delay (called _throttling_) each time `setOnline(true)` is called within a short time. The first time, the call proceeds normally. For each subsequent call, the delay is enforced, and if waiting, increased to a maximum delay. When the delay has elapsed, the `setOnline(true)` proceeds, assuming that the client app has not called `setOnline(false)` during the delay. Therefore, a call to `setOnline(true)` may not immediately result in the LDClient going online.
Client app developers should consider this situation abnormal, and take steps to prevent the client app from making multiple rapid `setOnline(true)` calls. Calls to `setOnline(false)` are not throttled. Calls to `start(config: context: completion:)`, and setting the `config` or `context` can also call `setOnline(true)` under certain conditions. After the delay, the SDK resets and the client app can make a subsequent call to `setOnline(true)` without being throttled.
Client apps can set a completion closure called when the setOnline call completes. For unthrottled `setOnline(true)` and all `setOnline(false)` calls, the SDK calls the closure immediately on completion of this method. For throttled `setOnline(true)` calls, the SDK calls the closure after the throttling delay at the completion of the `setOnline` method.
The SDK does not go online if the client has not been started, or the `mobileKey` is empty. For macOS, the SDK does not go online in the background unless `enableBackgroundUpdates` is true.
Use `isOnline` to get the online/offline state.
Here is an example:
SwiftObjective-C
```
1
| LDClient.get()!.setOnline(false)
---|--- 
2
| LDClient.get()!.setOnline(true) {
3
| // Client is online
4
| }
5
| let connectionStatus = LDClient.get()!.isOnline
```
### React Native
###### Expand React Native code sample
In some situations, you might want to stop making remote calls to LaunchDarkly and rely on locally cached flag values for future evaluations.
Use `setConnectionMode` to do this. The following connection modes are supported:
 * `offline`. In this connection mode, the SDK stops receiving updates and stops sending analytic and diagnostic events.
 * `streaming`. In this connection mode, the SDK uses a streaming connection to receive updates from LaunchDarkly. This is the default.
Here’s how:
React Native SDK, v10
```
1
| await client.setConnectionMode('offline');
---|--- 
2
| 
3
| await client.setConnectionMode('streaming');
```
To learn more, read [`setConnectionMode`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/classes/LDClientImpl.html#setConnectionMode).
## Server-side SDKs
This feature is available in the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/offline-mode#net-server-side)
 * [C++ (server-side)](/docs/sdk/features/offline-mode#c-server-side)
 * [Erlang](/docs/sdk/features/offline-mode#erlang)
 * [Go](/docs/sdk/features/offline-mode#go)
 * [Haskell](/docs/sdk/features/offline-mode#haskell)
 * [Java](/docs/sdk/features/offline-mode#java)
 * [Lua](/docs/sdk/features/offline-mode#lua)
 * [Node.js (server-side)](/docs/sdk/features/offline-mode#nodejs-server-side)
 * [PHP](/docs/sdk/features/offline-mode#php)
 * [Python](/docs/sdk/features/offline-mode#python)
 * [Ruby](/docs/sdk/features/offline-mode#ruby)
 * [Rust](/docs/sdk/features/offline-mode#rust)
### .NET (server-side)
###### Expand .NET (server-side) code sample
In some situations, you might want to stop making remote calls to LaunchDarkly and rely on locally cached flag values for future evaluations.
Here’s how:
C#
```
1
| var config = Configuration.Builder("sdk-key-123abc")
---|--- 
2
| .Offline(true)
3
| .Build();
4
| LdClient client = new LdClient(config);
```
### C++ (server-side)
###### Expand C++ (server-side) code sample
In some situations, you might want to stop making remote calls to LaunchDarkly. You can set the SDK offline, and no data will come into or out of the SDK. All flags will return the fallback values defined in your code.
Offline mode in the C++ server-side SDK is a shorthand for manually disabling events (`config_builder.Events().Disable()`) and the SDK’s Data System (`config_builder.DataSystem().Disable()`).
Here’s how:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2 (native)
```
1
| config_builder.Offline(true);
---|--- 
```
### Erlang
###### Expand Erlang code sample
In some situations, you might want to stop making remote calls to LaunchDarkly and rely on locally cached flag values for future evaluations.
Here’s how:
Erlang
```
1
| ldclient:start_instance("sdk-key-123abc", #{offline => true})
---|--- 
```
### Go
###### Expand Go code sample
In some situations, you might want to stop making remote calls to LaunchDarkly and rely on locally cached flag values for future evaluations.
Here’s how:
Go SDK v7.13.4+, using LDScopedClientGo SDK v6.x+, using LDClient
```
1
| var config ld.Config
---|--- 
2
| config.Offline = true
3
| 
4
| client, _ := ld.MakeCustomClient("sdk-key-123abc", config, 5*time.Second)
5
| scopedClient := ld.NewScopedClient(client, context)
6
| // LDScopedClient is in beta and may change without notice.
7
| 
8
| scopedClient.BoolVariation("flag-key-123abc", false) // will always return the default value (false)
```
##### Offline mode is not available in Relay Proxy v9.0.0-alpha
If you are using the Go SDK in [data saving mode](/docs/sdk/features/data-saving-mode), you need to run Relay Proxy v9.0.0-alpha or later. However, offline mode is not available in this version of the Relay Proxy.
### Haskell
###### Expand Haskell code sample
In some situations, you might want to stop making remote calls to LaunchDarkly and rely on locally cached flag values for future evaluations.
Here’s how:
Haskell
```
1
| config' = configSetOffline True config
---|--- 
```
### Java
###### Expand Java code sample
In some situations, you might want to stop making remote calls to LaunchDarkly and rely on locally cached flag values for future evaluations.
Here’s how:
Java SDK v6.0
```
1
| LDConfig config = new LDConfig.Builder()
---|--- 
2
| .offline(true)
3
| .build();
4
| LDClient client = new LDClient("sdk-key-123abc", config);
5
| client.boolVariation("flag-key-123abc", context, false)
6
| 
7
| // This call to client.boolVariation always
8
| // returns the default value (false)
```
### Lua
###### Expand Lua code sample
In some situations, you might want to stop making remote calls to LaunchDarkly. You can set the SDK offline, and no data will come into or out of the SDK. All flags will return the fallback values defined in your code.
Here’s how:
Lua SDK v2
```
1
| local config = {
---|--- 
2
| offline = true
3
| }
```
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
In some situations, you might want to stop making remote calls to LaunchDarkly and rely on locally cached flag values for future evaluations.
Here’s how:
Node.js SDK v8.x (TypeScript)Node.js SDK v7.x (JavaScript)Node.js SDK v7.x (TypeScript)
```
1
| import { LDOptions, init } from '@launchdarkly/node-server-sdk';
---|--- 
2
| 
3
| const options: LDOptions = { offline: true };
4
| const client = init('sdk-key-123abc', options);
5
| client.variation('any.feature.flag', context, false, cb); // cb will always be invoked with the default value (false)
```
The default value you set in the variation method is returned in offline mode. This does not refer to the default rule set in your flag configuration.
##### Offline mode is not available in Relay Proxy v9.0.0-alpha
If you are using the Node.js (server-side) SDK in [data saving mode](/docs/sdk/features/data-saving-mode), you need to run Relay Proxy v9.0.0-alpha or later. However, offline mode is not available in this version of the Relay Proxy.
### PHP
###### Expand PHP code sample
In some situations, you might want to stop making remote calls to LaunchDarkly and rely on locally cached flag values for future evaluations.
Here’s how:
PHP SDK v5.0
```
1
| $client = new LaunchDarkly\LDClient("sdk-key-123abc", ["offline" => true]);
---|--- 
2
| $client->variation("any.feature.flag", $context, false); // will always return the default value (false)
```
### Python
###### Expand Python code sample
In some situations, you might want to stop making remote calls to LaunchDarkly and rely on locally cached flag values for future evaluations.
Here’s how:
Python SDK v8.0
```
1
| # Initialization:
---|--- 
2
| ldclient.set_config(Config("sdk-key-123abc", offline=True))
3
| ldclient.get().variation("any.feature.flag", context, False) # will always return the default value (false)
```
##### Offline mode is not available in Relay Proxy v9.0.0-alpha
If you are using the Python SDK in [data saving mode](/docs/sdk/features/data-saving-mode), you need to run Relay Proxy v9.0.0-alpha or later. However, offline mode is not available in this version of the Relay Proxy.
### Ruby
###### Expand Ruby code sample
In some situations, you might want to stop making remote calls to LaunchDarkly and rely on locally cached flag values for future evaluations.
Here’s how:
Ruby SDK v7.0
```
1
| config = LaunchDarkly::Config.new({offline: true})
---|--- 
2
| client = LaunchDarkly::LDClient.new("sdk-key-123abc", config)
3
| client.variation("any.feature.flag", context, false) # will always return the default value (false)
```
### Rust
###### Expand Rust code sample
In some situations, you might want to stop making remote calls to LaunchDarkly and rely on locally cached flag values for future evaluations.
Here’s how:
Rust SDK v1
```
1
| let config = ConfigBuilder::new("sdk-key-123abc").offline(true).build();
---|--- 
2
| let ld_client = Client::build(config).unwrap();
3
| ld_client.bool_variation(&context, "flag-key-123abc", false); // will always return the default value (false)
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs