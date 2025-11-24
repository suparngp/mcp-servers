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
 * [Customize the SDK](#customize-the-sdk)
 * [Client-side SDKs](#client-side-sdks)
 * [.NET (client-side)](#net-client-side)
 * [Android](#android)
 * [C++ (client-side)](#c-client-side)
 * [Electron](#electron)
 * [Flutter](#flutter)
 * [iOS](#ios)
 * [JavaScript](#javascript)
 * [Node.js (client-side)](#nodejs-client-side)
 * [React Native](#react-native)
 * [Roku](#roku)
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [Apex](#apex)
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
 * [Edge SDKs](#edge-sdks)
 * [Akamai](#akamai)
 * [Cloudflare](#cloudflare)
 * [Fastly](#fastly)
 * [Vercel](#vercel)
## Overview
This topic explains how to configure various LaunchDarkly SDKs. It gives code samples for each SDK that include different configuration examples. This feature is available for client-side, server-side, and edge SDKs.
## Customize the SDK
You can use the configuration feature to configure certain aspects of your SDK, including flush intervals, timeout periods, and client connect parameters.
You can disable the publication of events for testing purposes. We strongly recommend against disabling events for any other reason because many features depend on regularly receiving analytics events, including targeting rules, flag statuses, and the **Contexts** or **Users** lists. To learn more, read [Analytics events](/docs/sdk/concepts/events).
Details about each SDK’s configuration are available in the SDK-specific sections below:
 * [Client-side SDKs](/docs/sdk/features/config#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/config#server-side-sdks)
 * [Edge SDKs](/docs/sdk/features/config#edge-sdks)
## Client-side SDKs
This feature is available in the following client-side SDKs:
 * [.NET (client-side)](/docs/sdk/features/config#net-client-side)
 * [Android](/docs/sdk/features/config#android)
 * [C++ (client-side)](/docs/sdk/features/config#c-client-side)
 * [Electron](/docs/sdk/features/config#electron)
 * [Flutter](/docs/sdk/features/config#flutter)
 * [iOS](/docs/sdk/features/config#ios)
 * [JavaScript](/docs/sdk/features/config#javascript)
 * [Node.js (client-side)](/docs/sdk/features/config#nodejs-client-side)
 * [React Native](/docs/sdk/features/config#react-native)
 * [Roku](/docs/sdk/features/config#roku)
### .NET (client-side)
###### Expand .NET (client-side) code sample
##### The .NET (client-side) SDK uses a mobile key
The .NET (client-side) SDK uses a mobile key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to create a custom configuration object to pass custom parameters to the client. With it, we’ve configured the event queue flush frequency.
You can configure `Configuration.Builder`:
.NET SDK v4.0 (C#).NET SDK v3.0 (C#)
```
1
| var config = Configuration
---|--- 
2
| .Builder("mobile-key-123abc", ConfigurationBuilder.AutoEnvAttributes.Enabled)
3
| .Events(Components.SendEvents().FlushInterval(TimeSpan.FromSeconds(2)))
4
| .Build();
5
| LdClient client = LdClient.Init(config, context);
```
To learn more about the specific configuration options available in this SDK, read [`Configuration`](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.Client.Configuration.html).
### Android
###### Expand Android code sample
##### The Android SDK uses a mobile key
The Android SDK uses a mobile key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
In the Android SDK, most of the configuration properties are grouped into areas of functionality, each of which has its own builder class that is only available if you are using that functionality. The basic areas of functionality are [data source](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDConfig.Builder.html#dataSource\(com.launchdarkly.sdk.android.subsystems.ComponentConfigurer\)), [events](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDConfig.Builder.html#events\(com.launchdarkly.sdk.android.subsystems.ComponentConfigurer\)), [networking](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDConfig.Builder.html#http\(com.launchdarkly.sdk.android.subsystems.ComponentConfigurer\)), and [service URIs](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDConfig.Builder.html#serviceEndpoints\(com.launchdarkly.sdk.android.integrations.ServiceEndpointsBuilder\)).
This code sample shows you how to configure the client connect and flush interval parameters:
JavaKotlin
```
1
| LDConfig ldConfig = new LDConfig.Builder(AutoEnvAttributes.Enabled)
---|--- 
2
| .mobileKey("mobile-key-123abc")
3
| .http(
4
| Components.httpConfiguration()
5
| .connectTimeoutMillis(5000)
6
| )
7
| .events(
8
| Components.sendEvents()
9
| .flushIntervalMillis(5000)
10
| )
11
| .build();
```
To learn more about the specific configuration options available in this SDK, read [`LDConfig.Builder`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDConfig.Builder.html).
### C++ (client-side)
###### Expand C++ (client-side) code sample
##### The C++ (client-side) SDK uses a mobile key
The C++ (client-side) SDK uses a mobile key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to configure the event queue capacity and flush interval parameters:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x (native)
```
1
| auto config_builder = client_side::ConfigBuilder("mobile-key-123abc");
---|--- 
2
| config_builder.Events()
3
| .Capacity(1000)
4
| .FlushInterval(std::chrono::seconds(30));
5
| auto config = config_builder.Build();
6
| if (!config) {
7
| /* an error occurred, config is not valid */
8
| }
```
To learn more about the specific configuration options available in this SDK, read [`ConfigBuilder`](https://launchdarkly.github.io/cpp-sdks/libs/client-sdk/docs/html/classlaunchdarkly_1_1config_1_1shared_1_1builders_1_1ConfigBuilder.html). To learn more about the event queue capacity and flush interval parameters specifically, read [`EventsBuilder`](https://launchdarkly.github.io/cpp-sdks/libs/client-sdk/docs/html/classlaunchdarkly_1_1config_1_1shared_1_1builders_1_1EventsBuilder.html).
### Electron
###### Expand Electron code sample
##### Electron SDK credentials
The Electron SDK requires a client-side ID. Client-side IDs are specific to each project and environment. They are not secret, and you can include them in client-side code. Do not embed a server-side SDK key in a client-side application. You can find client-side IDs and project keys in **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
If you connect the Electron SDK to the `ldcli` dev-server for local testing, use your **project key** instead of a client-side ID. Set all service endpoints to `http://localhost:8765`. If you use a client-side ID, the SDK connects to LaunchDarkly rather than the dev-server, which can produce CORS errors (especially from the renderer process).
This code sample shows you how to create a custom configuration object to pass custom parameters to the client:
JavaScriptTypeScript
```
1
| const options = {
---|--- 
2
| allAttributesPrivate: true
3
| };
4
| const client = LDElectron.initializeInMain('client-side-id-123abc', user, options);
```
To learn more about the specific configuration options available in this SDK, read [`LDOptions`](https://launchdarkly.github.io/electron-client-sdk/interfaces/_launchdarkly_electron_client_sdk_.ldoptions.html).
### Flutter
###### Expand Flutter code sample
##### Flutter SDK credentials
The Flutter SDK v4 uses either a **mobile key** or a **client-side ID** , depending on your target platform. For Windows, macOS, Linux, Android, or iOS, use a mobile key. For **web builds** , use a client-side ID.
You can find client-side IDs, mobile keys, and project keys in **Project settings** on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
If you connect a **Flutter web** app to the `ldcli` dev-server for local testing, use your **project key** instead of a client-side ID, and set all service endpoints to `http://localhost:8765`. If you use a mobile key or client-side ID, the app connects to LaunchDarkly rather than the dev-server, which can result in CORS errors.
The Flutter SDK version 4 uses either a mobile key or a client-side ID, depending on the platform that you build for. You can set these in the `LAUNCHDARKLY_MOBILE_KEY` and `LAUNCHDARKLY_CLIENT_SIDE_ID` environment variables, and then use the `CredentialSource` helper to select your credential and provide it to your configuration. `CredentialSource` expects one of the two environment variables to be set, but not both.
This code sample shows you how to configure the credential, automatic environment attributes, and evaluation reasons options:
Flutter SDK v4Flutter SDK v3.xFlutter SDK v2.x
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
| evaluationReasons: true
6
| ),
7
| );
```
The credential and automatic environment attributes configuration options are required. All other configuration options are optional and use default values if not set.
To learn more about the specific configuration options available in this SDK, read [`LDConfig`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDConfig-class.html).
### iOS
###### Expand iOS code sample
##### The iOS SDK uses a mobile key
The iOS SDK uses a mobile key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to configure the client connection timeout and event flush interval parameters:
SwiftObjective-C
```
1
| var ldConfig = LDConfig(mobileKey: "mobile-key-123abc", autoEnvAttributes: .enabled)
---|--- 
2
| ldConfig.connectionTimeout = 10.0
3
| ldConfig.eventFlushInterval = 30.0
```
To learn more about the specific configuration options available in this SDK, read [`LDConfig`](https://launchdarkly.github.io/ios-client-sdk/Structs/LDConfig.html).
### JavaScript
###### Expand JavaScript code sample
##### JavaScript SDK credentials
The JavaScript SDK requires a client-side ID. Client-side IDs are specific to each project and environment. They are not secret, and you can include them in client-side code. Do not embed a server-side SDK key in a client-side application. You can find client-side IDs and project keys in **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
If you connect the JavaScript SDK to the `ldcli` dev-server for local testing, use your project key instead of a client-side ID. Set all service endpoints to `http://localhost:8765`. If you use a client-side ID, the SDK connects to LaunchDarkly rather than the dev-server, which can result in CORS errors.
This code sample shows you how to create a custom configuration object to pass custom parameters to the client:
JavaScript SDK v3.xJavaScript SDK v3.x (TypeScript)
```
1
| const options = { allAttributesPrivate: true };
---|--- 
2
| const client = LDClient.initialize('client-side-id-123abc', context, options);
3
| 
4
| try {
5
| await client.waitForInitialization(5);
6
| proceedWithSuccessfullyInitializedClient();
7
| } catch(err) {
8
| // Client failed to initialize or timed out
9
| // variation() calls return fallback values until initialization completes
10
| }
```
To learn more about the specific configuration options available in this SDK, read [`LDOptions`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html).
### Node.js (client-side)
###### Expand Node.js (client-side) code sample
##### Node.js (client-side) SDK credentials
The Node.js (client-side) SDK requires a client-side ID. Client-side IDs are specific to each project and environment. They are not secret, and you can include them in client-side code. Do not embed a server-side SDK key in a client-side application. You can find client-side IDs and project keys in **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
If you connect the Node.js (client-side) SDK to the `ldcli` dev-server for local testing, use your **project key** instead of a client-side ID. Set all service endpoints to `http://localhost:8765`. If you use a client-side ID, the SDK connects to LaunchDarkly rather than the dev-server, which can result in CORS errors.
This code sample shows you how to create a custom configuration object to pass custom parameters to the client:
Node.js SDK v3.0 (JavaScript)Node.js SDK v3.0 (TypeScript)
```
1
| const options = {
---|--- 
2
| flushInterval: 10000, // milliseconds
3
| allAttributesPrivate: true
4
| };
5
| 
6
| const client = LDClient.initialize('client-side-id-123abc', context, options);
7
| try {
8
| await client.waitForInitialization(5);
9
| // initialization succeeded, flag values are now available
10
| } catch (err) {
11
| // initialization failed or did not complete before timeout
12
| }
```
To learn more about the specific configuration options available in this SDK, read [`LDOptions`](https://launchdarkly.github.io/node-client-sdk/interfaces/LDOptions.html).
### React Native
###### Expand React Native code sample
##### The React Native SDK uses a mobile key
The React Native SDK uses a mobile key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to create a configuration object to pass configuration parameters to the client.
The configuration object can include a variety of options. In version 10 of the SDK, all properties are optional.
In versions 9 and earlier, `mobileKey` was a required property, but all other properties were optional. Additionally, in versions 9 and earlier we recommend setting a timeout parameter when you call `configure`. If the client receives flag values before the timeout, the returned promise will resolve. Otherwise, it will be rejected.
##### Always include a timeout parameter in v9 and earlier when calling configure
In versions 9 and earlier, do not configure your SDK to initialize without a timeout parameter. Doing so will cause your app never to load if there is a connectivity problem. We recommend setting a timeout for no more than 1-5 seconds. To learn more, read [React Native SDK reference](/docs/sdk/client-side/react/react-native).
Here is an example:
React Native SDK v10
```
1
| import { type LDOptions } from '@launchdarkly/react-native-client-sdk';
---|--- 
2
| 
3
| const options = {
4
| withReasons: true,
5
| };
6
| 
7
| const client = new ReactNativeLDClient('mobile-key-123abc', AutoEnvAttributes.Enabled, options);
```
To learn more about the specific configuration options available in this SDK, read [`LDOptions`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/interfaces/LDOptions.html).
### Roku
###### Expand Roku code sample
##### The Roku SDK uses a mobile key
The Roku SDK uses a mobile key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to create a configuration object:
BrightScript
```
1
| ' for a legacy Roku application
---|--- 
2
| config = LaunchDarklyConfig("mobile-key-123abc")
3
| 
4
| ' for a SceneGraph Roku Application
5
| config = LaunchDarklyConfig("mobile-key-123abc", CLIENT_SCENEGRAPH_NODE)
```
We support the following configuration options for both SceneGraph and non-SceneGraph usage:
BrightScript
```
1
| config.setAppURI(String)
---|--- 
2
| 
3
| config.setEventsURI(String)
4
| 
5
| config.setStreamURI(String)
6
| 
7
| 
8
| config.setPollingIntervalSeconds(Integer)
9
| 
10
| config.setOffline(Boolean)
11
| 
12
| 
13
| config.addPrivateAttribute(String)
14
| 
15
| config.setAllAttributesPrivate(Boolean)
16
| 
17
| 
18
| config.setEventsCapacity(Integer)
19
| 
20
| config.setEventsFlushIntervalSeconds(Integer)
21
| 
22
| 
23
| config.setLogger(Object)
24
| 
25
| config.setLoggerNode(Dynamic)
26
| 
27
| config.setStoreBackend(Object)
28
| 
29
| config.setStoreBackendNode(Dynamic)
30
| 
31
| 
32
| config.setStreaming(Boolean)
33
| 
34
| config.setLogLevel(Integer)
35
| 
36
| 
37
| config.setUseEvaluationReasons(Boolean)
38
| 
39
| config.setApplicationInfoValue(String, String)
```
## Server-side SDKs
This feature is available for the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/config#net-server-side)
 * [Apex](/docs/sdk/features/config#apex)
 * [C++ (server-side)](/docs/sdk/features/config#c-server-side)
 * [Erlang](/docs/sdk/features/config#erlang)
 * [Go](/docs/sdk/features/config#go)
 * [Haskell](/docs/sdk/features/config#haskell)
 * [Java](/docs/sdk/features/config#java)
 * [Lua](/docs/sdk/features/config#lua)
 * [Node.js (server-side)](/docs/sdk/features/config#nodejs-server-side)
 * [PHP](/docs/sdk/features/config#php)
 * [Python](/docs/sdk/features/config#python)
 * [Ruby](/docs/sdk/features/config#ruby)
 * [Rust](/docs/sdk/features/config#rust)
### .NET (server-side)
###### Expand .NET (server-side) code sample
##### The .NET (server-side) SDK uses an SDK key
The .NET (server-side) SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to pass custom parameters to the client by creating a custom configuration object:
C#
```
1
| var config = Configuration.Builder("sdk-key-123abc")
---|--- 
2
| .Events(
3
| Components.SendEvents().FlushInterval(TimeSpan.FromSeconds(2))
4
| )
5
| .StartWaitTime(TimeSpan.FromSeconds(5))
6
| .Build();
7
| var client = new LdClient(config);
```
To learn more about the specific configuration that are available in this SDK, read [`ConfigurationBuilder`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.ConfigurationBuilder.html).
### Apex
###### Expand Apex code sample
This code sample shows you how to configure the client to redact all user attributes in events:
Apex
```
1
| LDConfig config = new LDConfig.Builder()
---|--- 
2
| .setAllAttributesPrivate(true)
3
| .build();
```
To learn more about the specific configuration options available for this SDK, read [`LDConfig.Builder`](https://github.com/launchdarkly/apex-server-sdk/blob/master/doc.md#class-ldconfigbuilder).
### C++ (server-side)
###### Expand C++ (server-side) code sample
##### The C++ (server-side) SDK uses an SDK key
The C++ (server-side) SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to configure the event queue capacity and flush interval parameters:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x (native)
```
1
| auto config_builder = server_side::ConfigBuilder("sdk-key-123abc");
---|--- 
2
| config_builder.Events()
3
| .Capacity(1000)
4
| .FlushInterval(std::chrono::seconds(30));
5
| auto config = config_builder.Build();
6
| if (!config) {
7
| /* an error occurred, config is not valid */
8
| }
```
To learn more about the specific configuration options available for this SDK, read [`ConfigBuilder`](https://launchdarkly.github.io/cpp-sdks/libs/server-sdk/docs/html/classlaunchdarkly_1_1config_1_1shared_1_1builders_1_1ConfigBuilder.html). To learn more about the event queue capacity and flush interval parameters specifically, read [`EventsBuilder`](https://launchdarkly.github.io/cpp-sdks/libs/server-sdk/docs/html/classlaunchdarkly_1_1config_1_1shared_1_1builders_1_1EventsBuilder.html).
### Erlang
###### Expand Erlang code sample
##### The Erlang SDK uses an SDK key
The Erlang SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to pass custom parameters when the client starts with the `Options` map parameter. The code in this example turns off streaming, so the SDK connects to LaunchDarkly through polling.
To pass custom parameters:
Erlang
```
1
| % Specify options
---|--- 
2
| ldclient:start_instance("sdk-key-123abc", #{stream => false})
3
| 
4
| % With a custom instance name
5
| ldclient:start_instance("sdk-key-123abc", your_instance, #{stream => false})
```
To learn more about the specific configuration options available for this SDK, read [`ldclient_config`](https://hexdocs.pm/launchdarkly_server_sdk/ldclient_config.html).
### Go
###### Expand Go code sample
##### The Go SDK uses an SDK key
The Go SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to pass custom parameters to the client by creating a custom configuration object. The code in this sample configures the event flush interval parameter.
To pass custom parameters:
Go SDK v6.0
```
1
| import (
---|--- 
2
| "time"
3
| 
4
| ld "github.com/launchdarkly/go-server-sdk/v6"
5
| "github.com/launchdarkly/go-server-sdk/v6/ldcomponents"
6
| )
7
| 
8
| var config ld.Config
9
| 
10
| config.Events = ldcomponents.SendEvents().FlushInterval(10*time.Second)
11
| 
12
| client, _ := ld.MakeCustomClient("sdk-key-123abc", config, 5*time.Second)
```
To learn more about the specific configuration options available for this SDK, read [`Config`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#Config).
### Haskell
###### Expand Haskell code sample
##### The Haskell SDK uses an SDK key
The Haskell SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to pass custom parameters to the client by creating a custom configuration object. This example configures the event queue capacity and flush interval parameters.
To pass custom parameters:
Haskell
```
1
| {-# LANGUAGE OverloadedStrings #-}
---|--- 
2
| 
3
| import LaunchDarkly.Server.Config
4
| 
5
| import Data.Function ((&))
6
| 
7
| config :: Config
8
| config = (makeConfig "sdk-key-123abc")
9
| & configSetEventsCapacity 1000
10
| & configSetFlushIntervalSeconds 30
```
To learn more about the specific configuration properties that are available in this SDK, read [`Config`](https://launchdarkly.github.io/haskell-server-sdk/LaunchDarkly-Server-Config.html).
### Java
###### Expand Java code sample
##### The Java SDK uses an SDK key
The Java SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to pass custom parameters to the client by creating a custom configuration object.
In this example, we’ve configured two properties for HTTP (the connect and socket timeouts), and one property for analytics events (the event flush interval).
To pass custom parameters:
Java
```
1
| LDConfig config = new LDConfig.Builder()
---|--- 
2
| .http(
3
| Components.httpConfiguration()
4
| .connectTimeout(Duration.ofSeconds(3))
5
| .socketTimeout(Duration.ofSeconds(3))
6
| )
7
| .events(
8
| Components.sendEvents()
9
| .flushInterval(Duration.ofSeconds(10))
10
| )
11
| .build();
12
| LDClient client = new LDClient("sdk-key-123abc", config);
```
To learn more about the specific configuration properties that are available in this SDK, read [`LDConfig.Builder`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDConfig.Builder.html).
### Lua
###### Expand Lua code sample
##### The Lua SDK uses an SDK key
The Lua SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to pass custom parameters to the client by creating a custom configuration object.
Finish setting up your configuration client before you call `LDClientInit`
You must finish setting up your configuration object before you call `clientInit`. If you initialize the client before configuration is complete, the SDK will not use anything you provide after initialization.
Here, we’ve configured the event queue capacity and flush interval parameters:
Lua SDK v2Lua SDK v1.x
```
1
| local config = {
---|--- 
2
| events = {
3
| capacity = 1000,
4
| flushIntervalMilliseconds = 30000
5
| }
6
| }
7
| 
8
| -- This blocks for 1 second to initialize
9
| local client = ld.clientInit("sdk-key-123abc", 1000, config)
```
To learn more about the specific configuration properties that are available in this SDK, read [`clientInit`](https://launchdarkly.github.io/lua-server-sdk/modules/launchdarkly-server-sdk.html#clientInit).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
##### The Node.js (server-side) SDK uses an SDK key
The Node.js (server-side) SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to pass custom parameters to the client by creating a custom configuration object:
Node.js SDK v8.x (TypeScript)Node.js SDK v7.x (JavaScript)Node.js SDK v7.x (TypeScript)
```
1
| import * as ld from '@launchdarkly/node-server-sdk';
---|--- 
2
| 
3
| const options: ld.LDOptions = {
4
| timeout: 3,
5
| };
6
| const client = ld.init('sdk-key-123abc', options);
```
To learn more about the specific configuration options available in this SDK, read [`LDOptions`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/LDOptions.html).
### PHP
###### Expand PHP code sample
##### The PHP SDK uses an SDK key
The PHP SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample uses the `cache` option, which passes as an array to the client constructor. There are a few additional options you can set in this array.
We’ve set the client connect timeout to three seconds in addition to providing a custom cache storage provider.
##### Sending events in PHP
The LaunchDarkly SDK sends data back to our server to record events from track and variation calls. On our other platforms, this data is sent asynchronously, so that it adds no latency to serving web pages. PHP’s shared-nothing architecture makes this difficult.
By default, LaunchDarkly forks an external process that executes `curl` to send this data. In practice, we’ve found that this is the most reliable way to send data without introducing latency to page load times. If your server does not have `curl` installed, or has other restrictions that make it impossible to invoke `curl` as an external process, you may need to implement a custom `EventProcessor` to send events to LaunchDarkly.
Here is an example:
PHP
```
1
| $client = new LaunchDarkly\LDClient("sdk-key-123abc", ["cache" => $cacheStorage, "connect_timeout" => 3]);
---|--- 
```
To learn more about the specific configuration options available in this SDK, read the SDK API documentation for the [`LDClient` constructor](http://launchdarkly.github.io/php-server-sdk/classes/LaunchDarkly-LDClient.html#method___construct).
### Python
###### Expand Python code sample
##### The Python SDK uses an SDK key
The Python SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to pass custom parameters to the client by creating a custom configuration object:
Python
```
1
| config = Config(sdk_key='sdk-key-123abc', http=HTTPConfig(connect_timeout=5))
---|--- 
2
| ldclient.set_config(config)
```
To learn more about the specific configuration options available in this SDK, read [`ldclient.config`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#module-ldclient.config).
### Ruby
###### Expand Ruby code sample
##### The Ruby SDK uses an SDK key
The Ruby SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to configure the behavior of the client by creating a custom configuration object.
The client constructor takes a configuration object as an optional parameter. In this example, we’ve set the connection timeout to LaunchDarkly to one second, and the read timeout to two seconds.
To create a custom configuration object:
Ruby
```
1
| config = LaunchDarkly::Config.new({connect_timeout: 1, read_timeout: 2})
---|--- 
2
| client = LaunchDarkly::LDClient.new("sdk-key-123abc", config)
```
To learn more about the specific configuration options available in this SDK, read [`Config`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Config).
### Rust
###### Expand Rust code sample
##### The Rust SDK uses an SDK key
The Rust SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to pass custom parameters to the client by creating a custom configuration object:
Rust
```
1
| let config = ConfigBuilder::new("sdk-key-123abc")
---|--- 
2
| .offline(true)
3
| .build();
4
| let client = Client::build(config).unwrap();
```
To learn more about the specific configuration options available in this SDK, read [`Config`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Config.html).
## Edge SDKs
This feature is available in the following edge SDKs:
 * [Akamai](/docs/sdk/features/config#akamai)
 * [Cloudflare](/docs/sdk/features/config#cloudflare)
 * [Fastly](/docs/sdk/features/config#fastly)
 * [Vercel](/docs/sdk/features/config#vercel)
### Akamai
###### Expand Akamai code sample
##### Akamai SDK credentials
The Akamai SDK requires a client-side ID. Client-side IDs are specific to each project and environment. They are not secret, and you can include them in edge code. Do not embed a server-side SDK key in an edge application.
You can find client-side IDs in **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to pass custom parameters to the client by creating a custom configuration object.
Akamai SDKAkamai SDK, if using your own feature store
```
1
| import { init, LDOptions, BasicLogger } from '@launchdarkly/akamai-server-edgekv-sdk';
---|--- 
2
| 
3
| const options: LDOptions = {
4
| logger: BasicLogger.get(),
5
| cacheTtlMs: 200,
6
| };
7
| 
8
| const ldClient = init({
9
| sdkKey: 'client-side-id-123abc',
10
| namespace: 'your-edgekv-namespace',
11
| group: 'your-edgekv-group-id',
12
| options: options,
13
| });
```
To learn more about the specific configuration options available in this SDK, read [`LDOptions`](https://launchdarkly.github.io/js-core/packages/sdk/akamai-edgekv/docs/types/LDOptions.html). For additional discussion of the `cacheTtlMs` option, read [Understand resource limits and caching options](/docs/sdk/edge/akamai#understand-resource-limits-and-caching-options).
### Cloudflare
###### Expand Cloudflare code sample
##### Cloudflare SDK credentials
The Cloudflare SDK requires a client-side ID. Client-side IDs are specific to each project and environment. They are not secret, and you can include them in edge code. Do not embed a server-side SDK key in an edge application.
You can find client-side IDs in **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to pass custom parameters to the client by creating a custom configuration object.
Versions 1 and 2 of the Cloudflare SDK only support the logger configuration option. Versions 2.3.0 and later also support an events configuration option.
Cloudflare SDK v2.3.0+ (TypeScript)Cloudflare SDK v2.2 and earlier (TypeScript)
```
1
| import { BasicLogger, init, LDOptions } from '@launchdarkly/cloudflare-server-sdk';
---|--- 
2
| 
3
| const options: LDOptions = {
4
| logger: new BasicLogger({ destination: console.log }),
5
| sendEvents: true, // default is false
6
| };
7
| 
8
| client = init('client-side-id-123abc', env.LD_KV, options);
```
To learn more about the specific configuration options available in this SDK, read the [SDK’s API docs](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/types/LDOptions.html).
### Fastly
###### Expand Fastly code sample
##### Fastly SDK credentials
The Fastly SDK requires a client-side ID. Client-side IDs are specific to each project and environment. They are not secret, and you can include them in edge code. Do not embed a server-side SDK key in an edge application.
You can find client-side IDs in **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to pass custom parameters to the client by creating a custom configuration object.
TypeScript
```
1
| import { KVStore } from 'fastly:kv-store';
---|--- 
2
| import { init, LDOptions } from '@launchdarkly/fastly-server-sdk';
3
| 
4
| const KV_STORE_NAME = 'launchdarkly';
5
| const EVENTS_BACKEND_NAME = 'launchdarkly';
6
| const store = new KVStore(KV_STORE_NAME);
7
| 
8
| async function handleRequest(event: FetchEvent) {
9
| const ldClient = init('client-side-id-123abc', store, {
10
| eventsBackendName: EVENTS_BACKEND_NAME,
11
| });
12
| 
13
| await ldClient.waitForInitialization();
14
| 
15
| ...
16
| }
```
To learn more about the specific configuration options available in this SDK, read [`FastlySDKOptions`](https://launchdarkly.github.io/js-core/packages/sdk/fastly/docs/types/FastlySDKOptions.html).
### Vercel
###### Expand Vercel code sample
##### Vercel SDK credentials
The Vercel SDK requires a client-side ID. Client-side IDs are specific to each project and environment. They are not secret, and you can include them in edge code. Do not embed a server-side SDK key in an edge application.
You can find client-side IDs in **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This code sample shows you how to pass custom parameters to the client by creating a custom configuration object.
Version 1 of the Vercel SDK only supports the logger configuration option. Versions 1.2.0 and later also support an events configuration option.
Vercel SDK v1.2.0+Vercel SDK v1.0
```
1
| import { createClient } from '@vercel/edge-config';
---|--- 
2
| import { BasicLogger, init, LDOptions } from '@launchdarkly/vercel-server-sdk';
3
| 
4
| const edgeConfigClient = createClient(process.env.EDGE_CONFIG);
5
| 
6
| const options: LDOptions = {
7
| logger: new BasicLogger({ destination: console.log }),
8
| sendEvents: true, // default is false
9
| };
10
| 
11
| client = init('client-side-id-123abc', edgeConfigClient, options);
```
To learn more about the specific configuration options available in this SDK, read [`LDOptions`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/types/LDOptions.html).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs