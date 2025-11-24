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
 * [Roku](#roku)
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
Each SDK connects to several LaunchDarkly web services. These include services for getting feature flag data via streaming or polling, and a service for storing analytics events. By default, the SDK connects directly to LaunchDarkly for these services.
If you are using the Relay Proxy, you must configure the SDK so that it connects to the Relay Proxy for these services instead.
If you use the Relay Proxy in **proxy** mode, you must know the base uniform resource identifier (URI) of your Relay Proxy instance. This is an `http` or `https` address with the hostname and port where you have deployed the Relay Proxy. In all of the code examples below, the Relay Proxy’s base URI is `https://your-relay-proxy.com:8030`, which is its default port.
Different SDKs have different ways of configuring the SDK. In some SDKs, you must set the base URI of each service to the Relay Proxy’s base URI, using a separate configuration property for each service but setting each one to the same value. In other SDKs, you can set the base URI for all services with a single configuration property.
The examples below show how to configure the SDK for each service. In most SDKs, you then need to pass the configuration in as a parameter when you initialize the client. To learn more, read [Configuration](/docs/sdk/features/config).
The following examples also include configuring the events service. To learn more, read [Deciding how to handle analytics events](/docs/sdk/features/relay-proxy-configuration#deciding-how-to-handle-analytics-events).
Details about each SDK’s configuration are available in the SDK-specific sections below:
 * [Client-side SDKs](/docs/sdk/features/relay-proxy-configuration/proxy-mode#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/relay-proxy-configuration/proxy-mode#server-side-sdks)
## Client-side SDKs
This feature is available in the following client-side SDKs:
 * [.NET (client-side)](/docs/sdk/features/relay-proxy-configuration/proxy-mode#net-client-side)
 * [Android](/docs/sdk/features/relay-proxy-configuration/proxy-mode#android)
 * [C++ (client-side)](/docs/sdk/features/relay-proxy-configuration/proxy-mode#c-client-side)
 * [Electron](/docs/sdk/features/relay-proxy-configuration/proxy-mode#electron)
 * [Flutter](/docs/sdk/features/relay-proxy-configuration/proxy-mode#flutter)
 * [iOS](/docs/sdk/features/relay-proxy-configuration/proxy-mode#ios)
 * [JavaScript](/docs/sdk/features/relay-proxy-configuration/proxy-mode#javascript)
 * [Node.js (client-side)](/docs/sdk/features/relay-proxy-configuration/proxy-mode#nodejs-client-side)
 * [React Native](/docs/sdk/features/relay-proxy-configuration/proxy-mode#react-native)
 * [React Web](/docs/sdk/features/relay-proxy-configuration/proxy-mode#javascript) The React Web SDK relies on the JavaScript SDK for these configuration options.
 * [Roku](/docs/sdk/features/relay-proxy-configuration/proxy-mode#roku)
### .NET (client-side)
###### Expand .NET (client-side) code sample
To connect the SDK to the Relay Proxy, use the `ServiceEndpoints` builder method and `Components.ServiceEndpoints().RelayProxy` to specify the base URI of your Relay Proxy:
C#
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
To connect the SDK to the Relay Proxy, use the `streamUri`, `pollUri`, and `eventsUri` builder methods to specify the base URI of your Relay Proxy:
JavaKotlin
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
###### Expand C++ code sample
To connect the SDK to the Relay Proxy, use `RelayProxyBaseURL` to set the base URI of your Relay Proxy:
C++ SDK v3 (native)
```
1
| auto config_builder = client_side::ConfigBuilder("mobile-key-123abc");
---|--- 
2
| config_builder.ServiceEndpoints().RelayProxyBaseURL("https://your-relay-proxy.com:8030");
3
| auto config = config_builder.Build();
```
To learn more, read [`ServiceEndpoints`](https://launchdarkly.github.io/cpp-sdks/libs/client-sdk/docs/html/classlaunchdarkly_1_1config_1_1shared_1_1built_1_1ServiceEndpoints.html).
### Electron
###### Expand Electron code sample
To connect the SDK to the Relay Proxy, set the `streamUrl`, `baseUrl`, and `eventsUrl` options to the base URI of your Relay Proxy:
JavaScriptTypeScript
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
### Flutter
###### Expand Flutter code sample
To connect the SDK to the Relay Proxy, use the `ServiceEndpoints` configuration option to specify the base URI of your Relay Proxy:
Flutter SDK v4Flutter SDK v3.x
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
To connect the SDK to the Relay Proxy, set the `streamUrl`, `baseUrl`, and `eventsUrl` properties to the base URI of your Relay Proxy:
SwiftObjective-C
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
To connect the SDK to the Relay Proxy, set the `streamUrl`, `baseUrl`, and `eventsUrl` properties to the base URI of your Relay Proxy:
JavaScriptTypeScript
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
### Node.js (client-side)
###### Expand Node.js (client-side) code sample
To connect the SDK to the Relay Proxy, set the `streamUrl`, `baseUrl`, and `eventsUrl` properties to the base URI of your Relay Proxy:
JavaScriptTypeScript
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
### React Native
###### Expand React Native code sample
To connect the SDK to the Relay Proxy, set the `streamUri`, `baseUri`, and `eventsUri` properties to the base URI of your Relay Proxy:
React Native SDK v10
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
### Roku
###### Expand Roku code sample
##### The Relay Proxy only works with the Roku SDK in polling mode
The Relay Proxy works when the Roku SDK is in polling mode only. You cannot use the Relay Proxy if the Roku SDK is in streaming mode.
To connect the SDK to the Relay Proxy, use the `setStreamURI`, `setAppURI`, and `setEventsURI` methods to specify the base URI of your Relay Proxy:
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
 * [.NET (server-side)](/docs/sdk/features/relay-proxy-configuration/proxy-mode#net-server-side)
 * [C++ (server-side)](/docs/sdk/features/relay-proxy-configuration/proxy-mode#c-server-side)
 * [Erlang](/docs/sdk/features/relay-proxy-configuration/proxy-mode#erlang)
 * [Go](/docs/sdk/features/relay-proxy-configuration/proxy-mode#go)
 * [Haskell](/docs/sdk/features/relay-proxy-configuration/proxy-mode#haskell)
 * [Java](/docs/sdk/features/relay-proxy-configuration/proxy-mode#java)
 * [Lua](/docs/sdk/features/relay-proxy-configuration/proxy-mode#lua)
 * [Node.js (server-side)](/docs/sdk/features/relay-proxy-configuration/proxy-mode#nodejs-server-side)
 * [PHP](/docs/sdk/features/relay-proxy-configuration/proxy-mode#php)
 * [Python](/docs/sdk/features/relay-proxy-configuration/proxy-mode#python)
 * [Ruby](/docs/sdk/features/relay-proxy-configuration/proxy-mode#ruby)
 * [Rust](/docs/sdk/features/relay-proxy-configuration/proxy-mode#rust)
### .NET (server-side)
###### Expand .NET (server-side) code sample
To connect the SDK to the Relay Proxy, use the `ServiceEndpoints` builder method and `Components.ServiceEndpoints().RelayProxy` to specify the base URI of your Relay Proxy:
.NET SDK v6.3 and later (C#)
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
### C++ (server-side)
###### Expand C++ (server-side) code sample
To connect the SDK to the Relay Proxy, use `RelayProxyBaseURL` to set the base URI of your Relay Proxy:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x (native)
```
1
| auto config_builder = server_side::ConfigBuilder("sdk-key-123abc");
---|--- 
2
| config_builder.ServiceEndpoints().RelayProxyBaseURL("https://your-relay-proxy.com:8030");
3
| auto config = config_builder.Build();
4
| if (!config) {
5
| /* an error occurred, config is not valid */
6
| }
```
To learn more, read `ServiceEndpoints()` in [`ConfigBuilder`](https://launchdarkly.github.io/cpp-sdks/libs/server-sdk/docs/html/classlaunchdarkly_1_1config_1_1shared_1_1builders_1_1ConfigBuilder.html).
### Erlang
###### Expand Erlang code sample
To connect the SDK to the Relay Proxy, set the `stream_uri`, `base_uri`, and `events_uri` properties to the base URI of your Relay Proxy:
Erlang
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
To connect the SDK to the Relay Proxy, use the `Config.ServiceEndpoints` property and `ldcomponents.RelayProxyEndpoints()` to specify the base URI of your Relay Proxy:
Go
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
To connect the SDK to the Relay Proxy, use `configSetStreamURI`, `configSetBaseURI`, and `configSetEventsURI` to specify the base URI of your Relay Proxy:
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
To connect the SDK to the Relay Proxy, use the `serviceEndpoints` builder method and `Components.serviceEndpoints().relayProxy` to specify the base URI of your Relay Proxy:
Java SDK v5.9 and later
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
To connect the SDK to the Relay Proxy, use the `serviceEndpoints` property to specify the base URLs:
Lua SDK v2Lua SDK v1.x
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
To connect the SDK to the Relay Proxy, set the `streamUri`, `baseUri`, and `eventsUri` properties to the base URI of your Relay Proxy:
Node.js SDK v8.x (TypeScript)Node.js SDK v7.x (JavaScript)Node.js SDK v7.x (TypeScript)
```
1
| import * as ld from '@launchdarkly/node-server-sdk';
---|--- 
2
| 
3
| const options ld.LDOptions = {
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
To connect the SDK to the Relay Proxy, set the `base_uri` and `events_uri` properties to the base URI of your Relay Proxy:
PHP
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
To connect the SDK to the Relay Proxy, set the `stream_uri`, `base_uri`, and `events_uri` properties to the base URI of your Relay Proxy:
Python
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
To connect the SDK to the Relay Proxy, set the service endpoints to the base URI of your Relay Proxy:
Ruby
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
To connect the SDK to the Relay Proxy, use the `ConfigBuilder` and `ServiceEndpointsBuilder` to specify the base URI of your Relay Proxy:
Rust
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