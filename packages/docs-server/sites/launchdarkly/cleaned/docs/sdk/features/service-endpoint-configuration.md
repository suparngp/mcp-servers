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
 * [.NET (client-side)](#net-client-side)
 * [Android](#android)
 * [C++ (client-side)](#c-client-side)
 * [Electron](#electron)
 * [Flutter](#flutter)
 * [iOS](#ios)
 * [JavaScript](#javascript)
 * [Node.js (client-side)](#nodejs-client-side)
 * [React Native](#react-native)
 * [React Web](#react-web)
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
## Overview
This topic explains how to configure LaunchDarkly SDKs to connect to alternate service endpoints.
Each SDK connects to several LaunchDarkly web services. These include services for getting feature flag data using streaming or polling, and a service for storing analytics events. Optionally, you can configure LaunchDarkly to connect to alternate service endpoints.
Most customers do not need to configure service endpoints. You may need to configure service endpoints in the following situations:
 * You are working with the LaunchDarkly federal instance. If you are using the [federal instance of LaunchDarkly](/docs/home/infrastructure/federal), you must configure the SDK so that it connects to the federal instance for these services instead.
 * You are working with the LaunchDarkly European Union (EU) instance. If you are using the EU instance of LaunchDarkly, you must configure the SDK so that it connects to the federal instance for these services instead. To learn which URLs to use instead, read the [EU instance documentation](/docs/home/infrastructure/eu).
 * You are using the Relay Proxy in proxy mode. To learn more, read [Using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode).
 * You are using the [LaunchDarkly CLI](/docs/home/getting-started/ldcli) to run a local `dev-server` for testing, and you want to access local flag values from there. To learn more, read [Using the LaunchDarkly CLI for local testing](/docs/guides/flags/ldcli-dev-server).
The examples below show how to configure the SDK for each service. In most SDKs, you then need to pass the configuration in as a parameter when you initialize the client. To learn more, read [Configuration](/docs/sdk/features/config).
Details about each SDK’s configuration are available in the SDK-specific sections below:
 * [Client-side SDKs](/docs/sdk/features/service-endpoint-configuration#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/service-endpoint-configuration#server-side-sdks)
## Client-side SDKs
This feature is available in the following client-side SDKs:
 * [.NET (client-side)](/docs/sdk/features/service-endpoint-configuration#net-client-side)
 * [Android](/docs/sdk/features/service-endpoint-configuration#android)
 * [C++ (client-side)](/docs/sdk/features/service-endpoint-configuration#c-client-side)
 * [Electron](/docs/sdk/features/service-endpoint-configuration#electron)
 * [Flutter](/docs/sdk/features/service-endpoint-configuration#flutter)
 * [iOS](/docs/sdk/features/service-endpoint-configuration#ios)
 * [JavaScript](/docs/sdk/features/service-endpoint-configuration#javascript)
 * [Node.js (client-side)](/docs/sdk/features/service-endpoint-configuration#nodejs-client-side)
 * [React Native](/docs/sdk/features/service-endpoint-configuration#react-native)
 * [React Web](/docs/sdk/features/service-endpoint-configuration#react-web)
 * [Roku](/docs/sdk/features/service-endpoint-configuration#roku)
### .NET (client-side)
###### Expand .NET (client-side) code sample
To configure an alternate service endpoint for the SDK, use the `ServiceEndpoints` builder method to specify the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
C#, connecting to Relay ProxyC#, connecting to federal instanceC#, connecting to EU instance
```
1
| var config = Configuration
---|--- 
2
| .Builder("mobile-key-123abc", ConfigurationBuilder.AutoEnvAttributes.Enabled)
3
| .ServiceEndpoints(Components.ServiceEndpoints()
4
| .RelayProxy("https://your-relay-proxy.com:8030"))
5
| .Build();
```
### Android
###### Expand Android code sample
To configure an alternate service endpoint for the SDK, use the `streamUri`, `pollUri`, and `eventsUri` builder methods to specify the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
Java, connecting to Relay ProxyJava, connecting to federal instanceJava, connecting to EU instanceKotlin, connecting to Relay ProxyKotlin, connecting to federal instanceKotlin, connecting to EU instance
```
1
| LDConfig ldConfig = new LDConfig.Builder(AutoEnvAttributes.Enabled)
---|--- 
2
| .mobileKey("mobile-key-123abc")
3
| .serviceEndpoints(
4
| Components.serviceEndpoints()
5
| .relayProxy("https://your-relay-proxy.com:8030")
6
| )
7
| .build();
```
### C++ (client-side)
###### Expand C++ (client-side) code sample
To configure an alternate service endpoint for the SDK, use `StreamingBaseUrl`, `PollingBaseUrl`, and `EventsBaseUrl` to specify the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
C++ SDK v3.0 (native), connecting to Relay ProxyC++ SDK v3.0 (C binding), connecting to Relay ProxyC++ SDK v3.0 (native), connecting to federal instanceC++ SDK v3.0 (C binding), connecting to federal instanceC++ SDK v3.0 (native), connecting to EU instanceC++ SDK v3.0 (C binding), connecting to EU instance
```
1
| auto config_builder = client_side::ConfigBuilder("mobile-key-123abc");
---|--- 
2
| config_builder.ServiceEndpoints()
3
| .StreamingBaseUrl("https://your-relay-proxy.com:8030")
4
| .PollingBaseUrl("https://your-relay-proxy.com:8030")
5
| .EventsBaseUrl("https://your-relay-proxy.com:8030")
6
| auto config = config_builder.Build();
```
To learn more, read [`ServiceEndpoints`](https://launchdarkly.github.io/cpp-sdks/libs/client-sdk/docs/html/classlaunchdarkly_1_1config_1_1shared_1_1builders_1_1ConfigBuilder.html#ae28867ba563432a91f355d04f45daec2).
### Electron
###### Expand Electron code sample
To configure an alternate service endpoint for the SDK, use the `streamUrl`, `baseUrl`, and `eventsUrl` options to specify the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
JavaScript, connecting to Relay ProxyTypeScript, connecting to Relay ProxyJavaScript, connecting to federal instanceTypeScript, connecting to federal instanceJavaScript, connecting to EU instanceTypeScript, connecting to federal instance
```
1
| const options = {
---|--- 
2
| streamUrl: 'https://your-relay-proxy.com:8030',
3
| baseUrl: 'https://your-relay-proxy.com:8030',
4
| eventsUrl: 'https://your-relay-proxy.com:8030'
5
| };
```
The Electron SDK uses the `baseUrl` for the initial connection and subsequent `identify` calls.
If you have enabled [streaming](https://launchdarkly.github.io/electron-client-sdk/interfaces/_launchdarkly_electron_client_sdk_.ldoptions.html#streaming), the SDK uses the `streamUrl` for subsequent connections. If you have enabled [`useReport`](https://launchdarkly.github.io/electron-client-sdk/interfaces/_launchdarkly_electron_client_sdk_.ldoptions.html#usereport), these subsequent requests will use the `REPORT` HTTP request method. These REPORT requests are streaming requests only if you have installed the [LaunchDarkly EventSource polyfill](https://github.com/launchdarkly/js-eventsource) to provide streaming support. Otherwise, these requests will be standard `REPORT` http requests. To learn more, read [EventSource](/docs/sdk/client-side/javascript/requirements-polyfills#eventsource) under [Requirements and polyfills](/docs/sdk/client-side/javascript/requirements-polyfills).
### Flutter
###### Expand Flutter code sample
To configure an alternate service endpoint for the SDK, use the `ServiceEndpoints` configuration option to specify the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
Flutter SDK v4, connecting to Relay ProxyFlutter SDK v4, connecting to federal instanceFlutter SDK v4, connecting to EU instanceFlutter SDK v3, connecting to Relay ProxyFlutter SDK v3, connecting to federal instanceFlutter SDK v3, connecting to EU instance
```
1
| final config = LDConfig(
---|--- 
2
| CredentialSource.fromEnvironment(),
3
| autoEnvAttributes.enabled,
4
| serviceEndpoints: ServiceEndpoints.relayProxy('https://your-relay-proxy.com:8030')
5
| );
```
To learn more, read [`serviceEndpoints`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDConfig/serviceEndpoints.html).
### iOS
###### Expand iOS code sample
To configure an alternate service endpoint for the SDK, use the `streamUrl`, `baseUrl`, and `eventsUrl` properties to specify the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
Swift, connecting to Relay ProxyObjective-C, connecting to Relay ProxySwift, connecting to federal instanceObjective-C, connecting to federal instanceSwift, connecting to EU instanceObjective-C, connecting to EU instance
```
1
| var ldConfig = LDConfig(mobileKey: "mobile-key-123abc", autoEnvAttributes: .enabled)
---|--- 
2
| ldConfig.streamUrl = URL(string: "https://your-relay-proxy.com:8030")
3
| ldConfig.baseUrl = URL(string: "https://your-relay-proxy.com:8030")
4
| ldConfig.eventsUrl = URL(string: "https://your-relay-proxy.com:8030")
```
##### Relay Proxy compatibility with event payload compression
If you are using LaunchDarkly iOS SDK version 9.9 or greater and you choose to enable compression of event payloads, you **must** upgrade Relay Proxy to version 8.9 or greater. To learn more, read [`enableCompression`](https://launchdarkly.github.io/ios-client-sdk/Structs/LDConfig.html#/s:12LaunchDarkly8LDConfigV17enableCompressionSbvp) and [Configuring an SDK to use the Relay Proxy](/docs/sdk/features/relay-proxy-configuration#configuring-an-sdk-to-use-the-relay-proxy).
### JavaScript
###### Expand JavaScript code sample
To configure an alternate service endpoint for the SDK, use the `streamUrl`, `baseUrl`, and `eventsUrl` properties to specify the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
JavaScript, connecting to Relay ProxyTypeScript, connecting to Relay ProxyJavaScript, connecting to federal instanceTypeScript, connecting to federal instanceJavaScript, connecting to EU instanceTypeScript, connecting to EU instance
```
1
| const options = {
---|--- 
2
| streamUrl: 'https://your-relay-proxy.com:8030',
3
| baseUrl: 'https://your-relay-proxy.com:8030',
4
| eventsUrl: 'https://your-relay-proxy.com:8030'
5
| };
```
The JavaScript SDK uses the `baseUrl` for the initial connection and subsequent `identify` calls.
If you have enabled [streaming](/docs/sdk/client-side/javascript#subscribe-to-flag-changes), the SDK uses the `streamUrl` for subsequent connections. If you have enabled [`useReport`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html#useReport), these subsequent requests will use the `REPORT` HTTP request method. These REPORT requests are streaming requests only if you have installed the [LaunchDarkly EventSource polyfill](https://github.com/launchdarkly/js-eventsource) to provide streaming support. Otherwise, these requests will be standard `REPORT` http requests. To learn more, read [EventSource](/docs/sdk/client-side/javascript/requirements-polyfills#eventsource) under [Requirements and polyfills](/docs/sdk/client-side/javascript/requirements-polyfills).
### Node.js (client-side)
###### Expand Node.js (client-side) code sample
To configure an alternate service endpoint for the SDK, use the `streamUrl`, `baseUrl`, and `eventsUrl` properties to set the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
JavaScript, connecting to Relay ProxyTypeScript, connecting to Relay ProxyJavaScript, connecting to federal instanceTypeScript, connecting to federal instanceJavaScript, connecting to EU instanceTypeScript, connecting to EU instance
```
1
| const options = {
---|--- 
2
| streamUrl: 'https://your-relay-proxy.com:8030',
3
| baseUrl: 'https://your-relay-proxy.com:8030',
4
| eventsUrl: 'https://your-relay-proxy.com:8030'
5
| };
```
The Node.js (client-side) SDK uses the `baseUrl` for the initial connection and subsequent `identify` calls.
If you have enabled [streaming](/docs/sdk/client-side/node-js#subscribe-to-flag-changes), the SDK uses the `streamUrl` for subsequent connections. If you have enabled [`useReport`](https://launchdarkly.github.io/node-client-sdk/interfaces/LDOptions.html#useReport), these subsequent requests will use the `REPORT` HTTP request method. These REPORT requests are streaming requests only if you have installed the [LaunchDarkly EventSource polyfill](https://github.com/launchdarkly/js-eventsource) to provide streaming support. Otherwise, these requests will be standard `REPORT` http requests. To learn more, read [EventSource](/docs/sdk/client-side/javascript/requirements-polyfills#eventsource) under [Requirements and polyfills](/docs/sdk/client-side/javascript/requirements-polyfills).
### React Native
###### Expand React Native code sample
To configure an alternate service endpoint for the SDK, use the `streamUri`, `baseUri`, and `eventsUri` properties to set the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
React Native SDK v10, connecting to Relay ProxyReact Native SDK v10, connecting to federal instanceReact Native SDK v10, connecting to EU instance
```
1
| import { LDOptions } from '@launchdarkly/react-native-client-sdk'
---|--- 
2
| 
3
| let options: LDOptions = {
4
| streamUri: 'https://your-relay-proxy.com:8030',
5
| baseUri: 'https://your-relay-proxy.com:8030',
6
| eventsUri: 'https://your-relay-proxy.com:8030',
7
| };
```
In version 6.x and earlier, the config properties were named `streamUri`, `pollUri`, and `eventsUri`. They were renamed to `streamUrl`, `pollUrl`, and `eventsUrl` in version 7.0. In version 10.0, they are named `streamUri`, `baseUri`, and `eventsUri`. To learn more, read [`LDOptions`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/index.html#LDOptions).
### React Web
###### Expand React Web code sample
To configure an alternate service endpoint for the SDK, use the `streamUrl`, `baseUrl`, and `eventsUrl` options to specify the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
JavaScript, connecting to Relay ProxyJavaScript, connecting to federal instanceJavaScript, connecting to EU instance
```
1
| const options = {
---|--- 
2
| baseUrl: 'https://your-relay-proxy.com:8030',
3
| streamUrl: 'https://your-relay-proxy.com:8030',
4
| eventsUrl: 'https://your-relay-proxy.com:8030'
5
| };
```
The React Web SDK uses the `baseUrl` for the initial connection and subsequent `identify` calls.
If you have enabled [streaming](/docs/sdk/client-side/react/react-web#subscribe-to-flag-changes), the SDK uses the `streamUrl` for subsequent connections. If you have enabled [`useReport`](https://launchdarkly.github.io/node-client-sdk/interfaces/LDOptions.html#useReport), these subsequent requests will use the `REPORT` HTTP request method. These REPORT requests are streaming requests only if you have installed the [LaunchDarkly EventSource polyfill](https://github.com/launchdarkly/js-eventsource) to provide streaming support. Otherwise, these requests will be standard `REPORT` http requests. To learn more, read [EventSource](/docs/sdk/client-side/javascript/requirements-polyfills#eventsource) under [Requirements and polyfills](/docs/sdk/client-side/javascript/requirements-polyfills).
To learn more, read [Configuration options](/docs/sdk/client-side/react/react-web#configuration-options) in the [React Web SDK reference](/docs/sdk/client-side/react/react-web).
### Roku
###### Expand Roku code sample
To configure an alternate service endpoint for the SDK, use the `setStreamURI`, `setAppURI`, and `setEventsURI` methods to specify the base URIs:
BrightScript, connecting to Relay Proxy
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
6
| 
7
| config.setStreamURI("https://your-relay-proxy.com:8030")
8
| config.setAppURI("https://your-relay-proxy.com:8030")
9
| config.setEventsURI("https://your-relay-proxy.com:8030")
```
## Server-side SDKs
This feature is available for the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/service-endpoint-configuration#net-server-side)
 * [Apex](/docs/sdk/features/service-endpoint-configuration#apex)
 * [C++ (server-side)](/docs/sdk/features/service-endpoint-configuration#c-server-side)
 * [Erlang](/docs/sdk/features/service-endpoint-configuration#erlang)
 * [Go](/docs/sdk/features/service-endpoint-configuration#go)
 * [Haskell](/docs/sdk/features/service-endpoint-configuration#haskell)
 * [Java](/docs/sdk/features/service-endpoint-configuration#java)
 * [Lua](/docs/sdk/features/service-endpoint-configuration#lua)
 * [Node.js (server-side)](/docs/sdk/features/service-endpoint-configuration#nodejs-server-side)
 * [PHP](/docs/sdk/features/service-endpoint-configuration#php)
 * [Python](/docs/sdk/features/service-endpoint-configuration#python)
 * [Ruby](/docs/sdk/features/service-endpoint-configuration#ruby)
 * [Rust](/docs/sdk/features/service-endpoint-configuration#rust)
### .NET (server-side)
###### Expand .NET (server-side) code sample
To configure an alternate service endpoint for the SDK, use the `ServiceEndpoints` builder method to specify the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
C#, connecting to Relay ProxyC#, connecting to federal instanceC#, connecting to EU instance
```
1
| var config = Configuration.Builder("sdk-key-123abc")
---|--- 
2
| .ServiceEndpoints(Components.ServiceEndpoints()
3
| .RelayProxy("https://your-relay-proxy.com:8030"))
4
| .Build();
```
### Apex
###### Expand Apex code sample
First, set up the Apex bridge. If you are a federal customer, make sure you run the Apex bridge within your own FedRAMP-compliant environment. To learn more, read [Use the LaunchDarkly Salesforce bridge](/docs/sdk/server-side/apex#use-the-launchdarkly-salesforce-bridge).
To configure an alternate service endpoint for the SDK, export the alternate URIs before you build the bridge:
Console, connecting to federal instanceConsole, connecting to EU instance
```
$
| cd bridge && go build .
---|--- 
>
| 
>
| # other required export statements...
>
| 
>
| export LD_BASE_URI='https://sdk.launchdarkly.us'
>
| export LD_EVENTS_URL='https://events.launchdarkly.us'
>
| 
>
| ./bridge
```
### C++ (server-side)
###### Expand C++ (server-side) code sample
To configure an alternate service endpoint for the SDK, use `StreamingBaseUrl`, `PollingBaseUrl`, and `EventsBaseUrl` to specify the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
C++ SDK v3.0 (native), connecting to Relay ProxyC++ SDK v3.0 (C binding), connecting to Relay ProxyC SDK v2.x (native), connecting to Relay ProxyC++ SDK v3.0 (native), connecting to federal instanceC++ SDK v3.0 (C binding), connecting to federal instanceC SDK v2.x (native), connecting to federal instanceC++ SDK v3.0 (native), connecting to EU instanceC++ SDK v3.0 (C binding), connecting to EU instanceC SDK v2.x (native), connecting to EU instance
```
1
| auto config_builder = server_side::ConfigBuilder("sdk-key-123abc");
---|--- 
2
| config_builder.ServiceEndpoints()
3
| .RelayProxyBaseUrl("https://your-relay-proxy.com:8030");
4
| auto config = config_builder.Build();
5
| if (!config) {
6
| /* an error occurred, config is not valid */
7
| }
```
To learn more, read `ServiceEndpoints()` in [`ConfigBuilder`](https://launchdarkly.github.io/cpp-sdks/libs/server-sdk/docs/html/classlaunchdarkly_1_1config_1_1shared_1_1builders_1_1ConfigBuilder.html).
### Erlang
###### Expand Erlang code sample
To configure an alternate service endpoint for the SDK, use the `stream_uri`, `base_uri`, and `events_uri` properties to set the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
Erlang, connecting to Relay ProxyErlang, connecting to federal instanceErlang, connecting to EU instance
```
1
| ldclient:start_instance("sdk-key-123abc", #{
---|--- 
2
| stream_uri => "https://your-relay-proxy.com:8030",
3
| base_uri => "https://your-relay-proxy.com:8030",
4
| events_uri => "https://your-relay-proxy.com:8030"
5
| })
```
### Go
###### Expand Go code sample
To configure an alternate service endpoint for the SDK, use the `Config.ServiceEndpoints` property and `interfaces.ServiceEndpoints()` to specify the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
Go, connecting to Relay ProxyGo, connecting to federal instanceGo, connecting to EU instance
```
1
| // To use the Replay Proxy in proxy mode for both streaming and events:
---|--- 
2
| 
3
| config := ld.Config{
4
| ServiceEndpoints: ldcomponents.RelayProxyEndpoints(
5
| "https://your-relay-proxy.com:8030"),
6
| }
7
| 
8
| // Alternatively, to use the Relay Proxy in proxy mode for streaming,
9
| // but send events directly to LaunchDarkly, use:
10
| config := ld.Config{
11
| ServiceEndpoints: ldcomponents.RelayProxyEndpointsWithoutEvents(
12
| "https://your-relay-proxy.com:8030"),
13
| }
```
##### Relay Proxy compatibility with event payload compression
If you are using LaunchDarkly Go SDK version 7.6 or greater and you choose to enable compression of event payloads, you **must** upgrade Relay Proxy to version 8.9 or greater. To learn more, read [`EnableGzip`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7/ldcomponents#EventProcessorBuilder.EnableGzip) and [Configuring an SDK to use the Relay Proxy](/docs/sdk/features/relay-proxy-configuration#configuring-an-sdk-to-use-the-relay-proxy).
### Haskell
###### Expand Haskell code sample
To configure an alternate service endpoint for the SDK, use `configSetStreamURI`, `configSetBaseURI`, and `configSetEventsURI` to specify the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
Haskell, connecting to Relay ProxyHaskell, connecting to federal instanceHaskell, connecting to EU instance
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
| & configSetStreamURI "https://your-relay-proxy.com:8030"
10
| & configSetBaseURI "https://your-relay-proxy.com:8030"
11
| & configSetEventsURI "https://your-relay-proxy.com:8030"
```
##### Relay Proxy compatibility with event payload compression
If you are using LaunchDarkly Haskell SDK version 4.4 or greater and you choose to enable compression of event payloads, you **must** upgrade Relay Proxy to version 8.9 or greater. To learn more, read [`configSetCompressEvents`](https://launchdarkly.github.io/haskell-server-sdk/LaunchDarkly-Server-Config.html#v:configSetCompressEvents) and [Configuring an SDK to use the Relay Proxy](/docs/sdk/features/relay-proxy-configuration#configuring-an-sdk-to-use-the-relay-proxy).
### Java
###### Expand Java code sample
To configure an alternate service endpoint for the SDK, use the `serviceEndpoints` builder method to specify the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
Java, connecting to Relay ProxyJava, connecting to federal instanceJava, connecting to EU instance
```
1
| LDConfig config = new LDConfig.Builder()
---|--- 
2
| .serviceEndpoints(Components.serviceEndpoints()
3
| .relayProxy("https://your-relay-proxy.com:8030"))
4
| .build();
```
### Lua
###### Expand Lua code sample
To configure an alternate service endpoint for the SDK, use the `serviceEndpoints` property to specify the base URLs. Here are some examples for common base URLs that you might use instead of the defaults:
Lua, connecting to Relay Proxy, v2Lua, connecting to Relay Proxy, v1.xLua, connecting to federal instance, v2Lua, connecting to federal instance, v1.xLua, connecting to EU instance, v2Lua, connecting to EU instance, v1.x
```
1
| local config = {
---|--- 
2
| serviceEndpoints = {
3
| streamingBaseURL = "https://your-relay-proxy.com:8030",
4
| pollingBaseURL = "https://your-relay-proxy.com:8030",
5
| eventsBaseURL = "https://your-relay-proxy.com:8030"
6
| }
7
| }
```
To learn more about the configuration options, read [`clientInit`](https://launchdarkly.github.io/lua-server-sdk/modules/launchdarkly-server-sdk.html#clientInit).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
To configure an alternate service endpoint for the SDK, use the `streamUri`, `baseUri`, and `eventsUri` properties to specify the base URIs.
Here are some examples for common base URIs that you might use instead of the defaults:
Node.js SDK v8.x (TypeScript), connecting to Relay ProxyNode.js SDK v8.x (TypeScript), connecting to federal instanceNode.js SDK v8.x (TypeScript), connecting to EU instance
```
1
| import { LDOptions } from '@launchdarkly/node-server-sdk';
---|--- 
2
| 
3
| const options: LDOptions = {
4
| streamUri: 'https://your-relay-proxy.com:8030',
5
| baseUri: 'https://your-relay-proxy.com:8030',
6
| eventsUri: 'https://your-relay-proxy.com:8030',
7
| };
```
##### Relay Proxy compatibility with event payload compression
If you are using LaunchDarkly Node.js (server-side) SDK version 9.8 or greater and you choose to enable compression of event payloads, you **must** upgrade Relay Proxy to version 8.9 or greater. To learn more, read [`enableEventCompression`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/LDOptions.html#enableEventCompression) and [Configuring an SDK to use the Relay Proxy](/docs/sdk/features/relay-proxy-configuration#configuring-an-sdk-to-use-the-relay-proxy).
### PHP
###### Expand PHP code sample
To configure an alternate service endpoint for the SDK, use the `base_uri` and `events_uri` properties to specify the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
PHP, connecting to Relay ProxyPHP, connecting to federal instancePHP, connecting to EU instance
```
1
| $client = new LaunchDarkly\LDClient("sdk-key-123abc",
---|--- 
2
| [ "base_uri" => "https://your-relay-proxy.com:8030",
3
| "events_uri" => "https://your-relay-proxy.com:8030" ]);
```
There is not a streaming service for the PHP SDK.
### Python
###### Expand Python code sample
To configure an alternate service endpoint for the SDK, use the `stream_uri`, `base_uri`, and `events_uri` properties to specify the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
Python, connecting to Relay ProxyPython, connecting to federal instancePython, connecting to EU instance
```
1
| config = Config(sdk_key='sdk-key-123abc',
---|--- 
2
| stream_uri="https://your-relay-proxy.com:8030",
3
| base_uri="https://your-relay-proxy.com:8030",
4
| events_uri="https://your-relay-proxy.com:8030")
```
##### Relay Proxy compatibility with event payload compression
If you are using LaunchDarkly Python SDK version 9.5 or greater and you choose to enable compression of event payloads, you **must** upgrade Relay Proxy to version 8.9 or greater. To learn more, set [`enable_event_compression`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#ldclient.config.Config.enable_event_compression) in the [`ldclient.config` module](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#module-ldclient.config) and read [Configuring an SDK to use the Relay Proxy](/docs/sdk/features/relay-proxy-configuration#configuring-an-sdk-to-use-the-relay-proxy).
### Ruby
###### Expand Ruby code sample
To configure an alternate service endpoint for the SDK, use the `stream_uri`, `base_uri`, and `events_uri` properties to specify the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
Ruby, connecting to Relay ProxyRuby, connecting to federal instanceRuby, connecting to EU instance
```
1
| config = LaunchDarkly::Config.new(
---|--- 
2
| stream_uri: "https://your-relay-proxy.com:8030",
3
| base_uri: "https://your-relay-proxy.com:8030",
4
| events_uri: "https://your-relay-proxy.com:8030")
```
##### Relay Proxy compatibility with event payload compression
If you are using LaunchDarkly Ruby SDK version 8.7 or greater and you choose to enable compression of event payloads, you **must** upgrade Relay Proxy to version 8.9 or greater. To learn more, read [`compress_events`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Config.html#compress_events-instance_method) and [Configuring an SDK to use the Relay Proxy](/docs/sdk/features/relay-proxy-configuration#configuring-an-sdk-to-use-the-relay-proxy).
### Rust
###### Expand Rust code sample
To configure an alternate service endpoint for the SDK, use the `ConfigBuilder` and `ServiceEndpointsBuilder` to specify the base URIs. Here are some examples for common base URIs that you might use instead of the defaults:
Rust, connecting to Relay ProxyRust, connecting to federal instanceRust, connecting to EU instance
```
1
| let config = ConfigBuilder::new("sdk-key-123abc")
---|--- 
2
| .service_endpoints(
3
| ServiceEndpointsBuilder::new().relay_proxy("https://your-relay-proxy.com:8030"),
4
| )
5
| .build();
```
##### Relay Proxy compatibility with event payload compression
If you are using LaunchDarkly Rust SDK version 2.4 or greater and you choose to enable compression of event payloads, you **must** upgrade Relay Proxy to version 8.9 or greater. To learn more, read [`compress_events`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.EventProcessorBuilder.html#method.compress_events) and [Configuring an SDK to use the Relay Proxy](/docs/sdk/features/relay-proxy-configuration#configuring-an-sdk-to-use-the-relay-proxy).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs