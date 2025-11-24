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
 * [Shut down the LaunchDarkly client](#shut-down-the-launchdarkly-client)
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
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [C++ (server-side)](#c-server-side)
 * [Erlang](#erlang)
 * [Go](#go)
 * [Haskell](#haskell)
 * [Java](#java)
 * [Node.js (server-side)](#nodejs-server-side)
 * [Python](#python)
 * [Ruby](#ruby)
 * [Rust](#rust)
 * [Edge SDKs](#edge-sdks)
 * [Cloudflare](#cloudflare)
 * [Fastly](#fastly)
 * [Vercel](#vercel)
## Overview
This topic explains how to safely shut down different LaunchDarkly SDKs. This feature is available for client-side, server-side, and edge SDKs.
## Shut down the LaunchDarkly client
LaunchDarkly SDKs provide language-specific methods to shut down their instances safely.
In most applications, you do not have to manually shut down an SDK. LaunchDarkly SDKs automatically flush pending analytics events to LaunchDarkly at regular intervals.
However, when your application is about to terminate, you should shut down the LaunchDarkly client. For most SDKs, this ensures that the client releases any resources it is using, and that it delivers any pending analytics to LaunchDarkly. If your application terminates without this shutdown step, flag evaluations and contexts or users may not appear on the **Contexts** list, because they are derived from analytics events. To learn more, read [Analytics events](/docs/sdk/concepts/events).
Do not attempt to evaluate flags or otherwise use the LaunchDarkly client after it has shut down, as doing so may result in undefined behavior. Shut down the client at a point in your application’s lifecycle where the client is no longer needed.
Details about each SDK’s configuration are available in the SDK-specific sections below.
 * [Client-side SDKs](/docs/sdk/features/shutdown#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/shutdown#server-side-sdks)
 * [Edge SDKs](/docs/sdk/features/shutdown#edge-sdks)
## Client-side SDKs
This feature is available in the following client-side SDKs:
 * [.NET (client-side)](/docs/sdk/features/shutdown#net-client-side)
 * [Android](/docs/sdk/features/shutdown#android)
 * [C++ (client-side)](/docs/sdk/features/shutdown#c-client-side)
 * [Electron](/docs/sdk/features/shutdown#electron)
 * [Flutter](/docs/sdk/features/shutdown#flutter)
 * [iOS](/docs/sdk/features/shutdown#ios)
 * [JavaScript](/docs/sdk/features/shutdown#javascript)
 * [Node.js (client-side)](/docs/sdk/features/shutdown#nodejs-client-side)
 * [React Native](/docs/sdk/features/shutdown#react-native)
### .NET (client-side)
###### Expand .NET (client-side) code sample
To shut down:
C#
```
1
| client.Dispose();
---|--- 
```
### Android
###### Expand Android code sample
To shut down:
JavaKotlin
```
1
| client.close();
---|--- 
```
### C++ (client-side)
###### Expand C++ (client-side) code sample
In the C++ SDK v3.0, the client will be automatically closed.
If you are using the C binding, you must specifically close the client. The operation blocks until all resources are free.
To shut down:
C++ SDK v3.0 (C binding)C SDK v2.x (native)C SDK v2.x (C++ binding)
```
1
| LDClientSDK_Free(client);
---|--- 
```
### Electron
###### Expand Electron code sample
To shut down:
JavaScript
```
1
| await client.close();
---|--- 
```
### Flutter
###### Expand Flutter code sample
To shut down:
Dart
```
1
| await client.close();
---|--- 
```
To learn more, read [`close`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDClient/close.html).
### iOS
###### Expand iOS code sample
To shut down:
SwiftObjective-C
```
1
| client.close()
---|--- 
```
### JavaScript
###### Expand JavaScript code sample
To shut down:
JavaScript
```
1
| await client.close();
---|--- 
```
### Node.js (client-side)
###### Expand Node.js (client-side) code sample
To shut down:
JavaScript
```
1
| await client.close();
---|--- 
```
### React Native
###### Expand React Native code sample
Calling `close` flushes all queued events and shuts all open network connections.
To shut down:
React Native SDK, v10
```
1
| await client.close();
---|--- 
```
To learn more, read [`close`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/classes/LDClientImpl.html#close).
## Server-side SDKs
This feature is available in the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/shutdown#net-server-side)
 * [C++ (server-side)](/docs/sdk/features/shutdown#c-server-side)
 * [Erlang](/docs/sdk/features/shutdown#erlang)
 * [Go](/docs/sdk/features/shutdown#go)
 * [Haskell](/docs/sdk/features/shutdown#haskell)
 * [Java](/docs/sdk/features/shutdown#java)
 * [Node.js (server-side)](/docs/sdk/features/shutdown#nodejs-server-side)
 * [Python](/docs/sdk/features/shutdown#python)
 * [Ruby](/docs/sdk/features/shutdown#ruby)
 * [Rust](/docs/sdk/features/shutdown#rust)
### .NET (server-side)
###### Expand .NET (server-side) code sample
[`Dispose`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.LdClient.html#LaunchDarkly_Sdk_Server_LdClient_Dispose_) safely shuts down the client instance.
To shut down:
C#
```
1
| client.Dispose();
---|--- 
```
### C++ (server-side)
###### Expand C++ (server-side) code sample
In the C++ SDK v3.0, the SDK will be automatically closed.
If you are using the C binding, you must specifically close the client. The operation blocks until all resources are free.
To shut down:
C++ SDK v3.0 (C binding)C SDK v2.x (native)
```
1
| LDServerSDK_Free(client);
---|--- 
```
### Erlang
###### Expand Erlang code sample
`stop_instance()`, `stop_instance(Tag)`, and `stop_all_instances()` all safely shut down client instances and release the resources associated with them.
To shut down:
Erlang
```
1
| ldclient:stop_all_instances()
---|--- 
2
| 
3
| % Stops the default instance
4
| ldclient:stop_instance()
5
| 
6
| % Stops a named instance
7
| ldclient:stop_instance(my_instance)
```
### Go
###### Expand Go code sample
When your application is about to terminate, shut down the `LDClient` with [`Close()`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5#LDClient.Close).
To shut down:
Go
```
1
| client.Close()
---|--- 
```
### Haskell
###### Expand Haskell code sample
To shut down:
Haskell
```
1
| close client
---|--- 
```
### Java
###### Expand Java code sample
[`Close`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDClient.html#close--) safely shuts down the client instance and releases all resources associated with the client.
To shut down:
Java
```
1
| client.close();
---|--- 
```
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
Unlike other LaunchDarkly SDKs, the Node.js (server-side) SDK does not automatically send pending analytics events to LaunchDarkly when it shuts down. To send analytics events, you first need to call [flush](/docs/sdk/features/flush#nodejs-server-side).
To shut down:
JavaScript
```
1
| client.close();
---|--- 
```
### Python
###### Expand Python code sample
To shut down:
Python
```
1
| ldclient.get().close()
---|--- 
```
### Ruby
###### Expand Ruby code sample
Shutting down frees the resources the worker threads were using and provides an explicit signal for the Ruby SDK to send the remaining event data back to LaunchDarkly.
To shut down:
Ruby
```
1
| client.close
---|--- 
```
### Rust
###### Expand Rust code sample
To shut down:
Rust
```
1
| client.close();
---|--- 
```
## Edge SDKs
This feature is available in the following edge SDKs:
 * [Cloudflare](/docs/sdk/features/shutdown#cloudflare)
 * [Fastly](/docs/sdk/features/shutdown#fastly)
 * [Vercel](/docs/sdk/features/shutdown#vercel)
### Cloudflare
###### Expand Cloudflare code sample
[`close`](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/classes/LDClient.html#close) safely shuts down the client instance:
TypeScript
```
1
| client.close();
---|--- 
```
### Fastly
###### Expand Fastly code sample
[`close`](https://launchdarkly.github.io/js-core/packages/sdk/fastly/docs/classes/LDClient.html#close) safely shuts down the client instance:
TypeScript
```
1
| client.close();
---|--- 
```
Typically, you do not need to call this method, because the client will close safely when the worker exists. However, you must [flush](/docs/sdk/features/flush#fastly) events before your worker exits to ensure that they are sent back to LaunchDarkly.
### Vercel
###### Expand Vercel code sample
[`close`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/classes/LDClient.html#close) safely shuts down the client instance:
TypeScript
```
1
| client.close();
---|--- 
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs