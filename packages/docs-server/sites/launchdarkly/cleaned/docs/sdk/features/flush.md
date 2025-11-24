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
 * [About the flush feature](#about-the-flush-feature)
 * [Client-side SDKs](#client-side-sdks)
 * [.NET (client-side)](#net-client-side)
 * [Android](#android)
 * [C++ (client-side)](#c-client-side)
 * [Flutter](#flutter)
 * [iOS](#ios)
 * [JavaScript](#javascript)
 * [Node.js (client-side)](#nodejs-client-side)
 * [React Native](#react-native)
 * [Roku](#roku)
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [C++ (server-side)](#c-server-side)
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
 * [Cloudflare](#cloudflare)
 * [Fastly](#fastly)
 * [Vercel](#vercel)
## Overview
This topic explains how to use the flush feature. The flush feature is available in server-side, client-side, and edge SDKs.
Server-side, client-side, and edge SDKs automatically flush pending analytics events to LaunchDarkly at regular intervals. This prevents the SDK from having to send constant network requests. The time between intervals varies by SDK, and is configurable. To learn how to configure your SDK’s flush interval, read [Configuration](/docs/sdk/features/config).
You can manually call flush to send events immediately without waiting for the next interval. Most customers do not need to use the flush feature because SDKs automatically flush their pending analytics events on a periodic frequency. However, it can be useful if you are using the SDK in a short-lived serverless process or a test application, rather than in a long-running application. To learn more, read [Analytics events](/docs/sdk/concepts/events).
## About the flush feature
The flush feature tells the client to send all of an SDK’s pending analytics events to LaunchDarkly as soon as possible.
All SDKs support asynchronous flushing, which tells the SDK to start delivering events, but returns control to the application before delivery is complete. Some SDKs also support synchronous flushing, which tells the SDK to deliver the events and not return control until delivery is complete.
Details about each SDK’s configuration are available in the SDK-specific sections below.
 * [Client-side SDKs](/docs/sdk/features/flush#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/flush#server-side-sdks)
 * [Edge SDKs](/docs/sdk/features/flush#edge-sdks)
## Client-side SDKs
This feature is available in the following client-side SDKs:
 * [.NET (client-side)](/docs/sdk/features/flush#net-client-side)
 * [Android](/docs/sdk/features/flush#android)
 * [C++ (client-side)](/docs/sdk/features/flush#c-client-side)
 * [Flutter](/docs/sdk/features/flush#flutter)
 * [iOS](/docs/sdk/features/flush#ios)
 * [JavaScript](/docs/sdk/features/flush#javascript)
 * [Node.js (client-side)](/docs/sdk/features/flush#nodejs-client-side)
 * [React Native](/docs/sdk/features/flush#react-native)
 * [Roku](/docs/sdk/features/flush#roku)
### .NET (client-side)
###### Expand .NET (client-side) code sample
Internally, the client-side .NET SDK keeps an event buffer for `Track` and `Identify` calls. These are flushed periodically in a background thread. If you test the SDK in a REPL, you may want to manually call `Flush` to process events immediately.
The flush interval is configurable. If you need to change the interval, you can do so with the `Configuration` class.
To call `flush`:
C#
```
1
| client.Flush();
---|--- 
```
### Android
###### Expand Android code sample
The Android SDK keeps an internal event buffer for analytics calls. These are flushed periodically in a background thread. You can configure the flush interval if needed.
In some situations, such as when you’re testing the SDK in a simulator, you may want to manually call `flush` to request any queued events to be sent immediately. This call is non-blocking, so it returns before the events are sent.
Here’s how:
JavaKotlin
```
1
| client.flush();
---|--- 
```
The flush interval is configurable.
### C++ (client-side)
###### Expand C++ (client-side) code sample
The LaunchDarkly SDK keeps an internal event buffer for analytics events. These are flushed periodically in a background thread. In some situations, for example if you’re testing the SDK in a simulator, you may want to manually call flush to process events immediately.
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x
```
1
| client.FlushAsync();
---|--- 
```
You can also examine the result to determine if the flush succeeded. Here’s how:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)
```
1
| auto flush_result = client.FlushAsync(context);
---|--- 
2
| auto status = flush_result.wait_for(maxwait);
3
| 
4
| if (status == std::future_status::ready) {
5
| /* The client's attempt to flush succeeded or failed in the specified amount of time. */
6
| if (flush_result.get()) {
7
| /* Flush succeeded */
8
| } else {
9
| /* Flush failed */
10
| }
11
| } else {
12
| /* The specified timeout was reached, but the client is still attempting to flush. */
13
| }
```
The flush interval is configurable. If you need to change the interval, you can do so using the configuration. To learn more, read [`FlushAsync`](https://launchdarkly.github.io/cpp-sdks/libs/client-sdk/docs/html/classlaunchdarkly_1_1client__side_1_1Client.html#ad19e6199bff8c0c0caa94e28f44ded3f) and [`FlushInterval`](https://launchdarkly.github.io/cpp-sdks/libs/client-sdk/docs/html/classlaunchdarkly_1_1config_1_1shared_1_1builders_1_1EventsBuilder.html#a999ee341dcf36b412e14ec5c923cceff).
### Flutter
###### Expand Flutter code sample
Internally, the Flutter SDK keeps an event buffer for `track` calls. These are flushed periodically in a background thread. You can configure the flush interval if needed.
In some situations, such as when you’re testing the SDK in a simulator, you may want to manually call `flush` to request any queued events to be sent immediately. This call is non-blocking, so it returns before the events are sent.
To call `flush`:
Dart
```
1
| await client.flush();
---|--- 
```
To learn more, read [`flush`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDClient/flush.html).
### iOS
###### Expand iOS code sample
Internally, the iOS SDK keeps an event buffer for `track` calls. These are flushed periodically in a background thread. You can configure the flush interval if needed.
In some situations, such as when you’re testing the SDK in a simulator, you may want to manually call `flush` to request any queued events to be sent immediately. This call is non-blocking, so it returns before the events are sent.
To call `flush`:
SwiftObjective-C
```
1
| LDClient.get()!.flush()
---|--- 
```
### JavaScript
###### Expand JavaScript code sample
Internally, the JavaScript SDK keeps an event buffer for `track` calls. These are flushed periodically in a background thread. You can configure the flush interval if needed.
In some situations, such as when you’re testing the SDK in a simulator, you may want to manually call `flush` to request any queued events to be sent immediately. This call is non-blocking, so it returns before the events are sent.
This method is asynchronous. You can pass a callback or wait for the returned `Promise` to determine when all events have been flushed.
To call `flush`:
JavaScript
```
1
| client.flush();
---|--- 
```
### Node.js (client-side)
###### Expand Node.js (client-side) code sample
Internally, the LaunchDarkly SDK keeps an analytics event buffer. These events are flushed periodically. In some situations, you may want to manually call `flush` to process events immediately.
This method is asynchronous. You can pass a callback or wait for the returned `Promise` to determine when all events have been flushed.
To call `flush`:
JavaScript
```
1
| client.flush();
---|--- 
2
| 
3
| // or, with a callback:
4
| client.flush(() => {
5
| console.log('flush complete');
6
| });
7
| 
8
| // or, with a Promise:
9
| client.flush().then(() => {
10
| console.log('flush complete');
11
| });
```
### React Native
###### Expand React Native code sample
Internally, the React Native SDK keeps an event buffer for `track` calls. These are flushed periodically in a background thread. You can configure the flush interval if needed.
In some situations, such as when you’re testing the SDK in a simulator, you may want to manually call `flush` to request any queued events to be sent immediately.
To call `flush`:
React Native SDK, v10
```
1
| const { result, error } = await client.flush();
---|--- 
```
`flush` is asynchronous and can be awaited. It returns a promise that resolves to an object containing an error, if there is one, and a boolean result.
To learn more, read [`flush`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/classes/LDClientImpl.html#flush).
### Roku
###### Expand Roku code sample
Internally, the Roku SDK keeps an event buffer for `track` calls. These are flushed periodically in a background thread. You can configure the flush interval if needed.
In some situations, such as when you’re testing the SDK in a simulator, you may want to manually call `flush` to request any queued events to be sent immediately. This call is non-blocking, so it returns before the events are sent.
To call `flush`:
BrightScript
```
1
| launchDarkly.flush()
---|--- 
```
## Server-side SDKs
This feature is available in the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/flush#net-server-side)
 * [C++ (server-side)](/docs/sdk/features/flush#c-server-side)
 * [Go](/docs/sdk/features/flush#go)
 * [Haskell](/docs/sdk/features/flush#haskell)
 * [Java](/docs/sdk/features/flush#java)
 * [Lua](/docs/sdk/features/flush#lua)
 * [Node.js (server-side)](/docs/sdk/features/flush#nodejs-server-side)
 * [PHP](/docs/sdk/features/flush#php)
 * [Python](/docs/sdk/features/flush#python)
 * [Ruby](/docs/sdk/features/flush#ruby)
 * [Rust](/docs/sdk/features/flush#rust)
### .NET (server-side)
###### Expand .NET (server-side) code sample
The .NET (server-side) SDK supports asynchronous flushing with the [`Flush`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.LdClient.html#LaunchDarkly_Sdk_Server_LdClient_Flush_) method.
To call `flush`:
C#
```
1
| client.Flush();
---|--- 
```
Starting in version 7.0.0, the SDK also supports synchronous flushing with the [`FlushAndWait`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.LdClient.html#LaunchDarkly_Sdk_Server_LdClient_FlushAndWait_System_TimeSpan_) method. In this example, the `TimeSpan.FromSeconds(2)` value means that the application is willing to wait no more than two seconds for event delivery.
C#
```
1
| client.FlushAndWait(TimeSpan.FromSeconds(2));
---|--- 
```
The flush interval is configurable. If you need to change the interval, you can do so with the `Configuration` class.
Here’s how:
C#
```
1
| var config = Configuration.Builder("sdk-key-123abc")
---|--- 
2
| .Events(
3
| Components.SendEvents().FlushInterval(TimeSpan.FromSeconds(10))
4
| )
5
| .Build();
6
| var client = new LdClient(config);
```
### C++ (server-side)
###### Expand C++ (server-side) code sample
The LaunchDarkly SDK keeps an internal event buffer for analytics events. These are flushed periodically in a background thread. If you test the SDK in a simulator, you may want to manually call flush to process events immediately.
This function will not block, but instead initiate a flush operation in the background. The flush interval is configurable. If you need to change the interval, you can do so with the configuration.
Here’s how:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x (native)
```
1
| client.FlushAsync();
---|--- 
```
The flush interval is configurable. If you need to change the interval, you can do so using the configuration. To learn more, read about `FlushAsync()` in [`Client`](https://launchdarkly.github.io/cpp-sdks/libs/server-sdk/docs/html/classlaunchdarkly_1_1server__side_1_1Client.html) and about `FlushInterval()` in [`EventsBuilder`](https://launchdarkly.github.io/cpp-sdks/libs/server-sdk/docs/html/classlaunchdarkly_1_1config_1_1shared_1_1builders_1_1EventsBuilder.html).
### Go
###### Expand Go code sample
The Go SDK supports asynchronous flushing with the [`Flush`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDClient.Flush) method.
Go
```
1
| client.Flush();
---|--- 
```
Starting in version 6.0.0, the SDK also supports synchronous flushing with the [`FlushAndWait`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDClient.FlushAndWait) method. In this example, the `time.Second*2` value means that the application is willing to wait no more than two seconds for event delivery.
Go
```
1
| client.FlushAndWait(time.Second*2);
---|--- 
```
The interval for automatic event flushing is configurable. If you need to change the interval, you can do so by making a custom client configuration. Here’s how:
Go
```
1
| config := ld.Config{
---|--- 
2
| Events: ldcomponents.SendEvents().FlushInterval(time.Second*10),
3
| }
```
### Haskell
###### Expand Haskell code sample
The LaunchDarkly SDK keeps an internal event buffer for analytics events. These events are flushed periodically in a background thread. If you test the SDK in a simulator, you may want to manually call flush to process events immediately.
This function will not block, but instead initiate a flush operation in the background. The flush interval is configurable. If you need to change the interval, you can do so with the configuration.
Here’s how:
Haskell
```
1
| flushEvents client
---|--- 
```
### Java
###### Expand Java code sample
Internally, the LaunchDarkly SDK keeps an event buffer for `track` and `identify` calls. These are flushed periodically in a background thread. If you test the SDK in a REPL, you may want to manually call [`flush`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDClient.html#flush--) to process events immediately.
Here’s how:
Java
```
1
| client.flush();
---|--- 
```
The flush interval is configurable. If you need to change the interval, you can do so with [`LDConfig.Builder`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDConfig.Builder.html) and [`Components.sendEvents()`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/Components.html#sendEvents--).
### Lua
###### Expand Lua code sample
The LaunchDarkly SDK keeps an internal event buffer for analytics events. These are flushed periodically in a background thread. If you test the SDK in a simulator, you may want to manually call flush to process events immediately.
This function will not block, but instead initiate a flush operation in the background. The flush interval is configurable. If you need to change the interval, you can do so with the configuration.
Here’s how:
Lua
```
1
| client:flush()
---|--- 
```
To learn more, read [`flush`](https://launchdarkly.github.io/lua-server-sdk/modules/launchdarkly-server-sdk.html#flush).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
Internally, the LaunchDarkly SDK keeps an event buffer for `track` and `identify` calls. These are flushed periodically in a background thread. If you test the SDK in a REPL, you may want to manually call `flush` to process events immediately.
The flush interval is configurable. If you need to change the interval, you can do so when configuring your client instance.
Here’s how:
JavaScript
```
1
| client.flush();
---|--- 
```
### PHP
###### Expand PHP code sample
Internally, the LaunchDarkly SDK keeps an event buffer for `variation`, `track`, and `identify` calls. These are automatically flushed when the LDClient is destroyed. PHP’s shared-nothing architecture means manual invocation of this method is typically not needed. Developers may do so if they wish to flush events prior to teardown.
Here’s how:
PHP
```
1
| ldclient->flush();
---|--- 
```
### Python
###### Expand Python code sample
Internally, the LaunchDarkly SDK keeps an event buffer for `variation`, `track`, and `identify` calls. These are flushed periodically in a background thread. If you test the SDK in a REPL, you may want to manually call `flush` to process events immediately. Otherwise, Python may close before flushing the event buffer and your user changes and tracks will be lost.
The flush interval is configurable. If you need to change the interval, you can do so when you configure your client instance.
Here’s how:
Python
```
1
| ldclient.get().flush()
---|--- 
```
### Ruby
###### Expand Ruby code sample
Internally, the LaunchDarkly SDK keeps an event buffer for `track` and `identify` calls. These are flushed periodically in a background thread. If you test the SDK in a REPL, you may want to manually call `flush` to process events immediately.
The flush interval is configurable. If you need to change the interval, you can do so when you configure your client instance.
Here’s how:
Ruby
```
1
| client.flush
---|--- 
```
### Rust
###### Expand Rust code sample
Internally, the LaunchDarkly SDK keeps an event buffer for the analytics events that are produced by calling the `variation` or `variation_detail` methods, the `track` methods, or `identify`. These are flushed periodically in a background thread. In some situations, you may want to manually call [`flush`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Client.html#method.flush) to process events immediately.
The flush interval is configurable. If you need to change the interval, you can do so by making a custom client configuration.
Here’s how:
Rust
```
1
| let result = client.flush();
---|--- 
```
## Edge SDKs
Most edge SDKs support sending events directly. The [Akamai SDK](/docs/sdk/edge/akamai) does not.
When you [configure an edge SDK to send events](/docs/sdk/features/config#edge-sdks), you must also flush those events to ensure that they are sent back to LaunchDarkly.
This feature is available in the following edge SDKs:
 * [Cloudflare](/docs/sdk/features/flush#cloudflare)
 * [Fastly](/docs/sdk/features/flush#fastly)
 * [Vercel](/docs/sdk/features/flush#vercel)
### Cloudflare
###### Expand Cloudflare code sample
Flushing events is available in Cloudflare SDK version 2.3.0 and later.
If you send [events](/docs/sdk/features/events#cloudflare), you must also flush those events before your worker exits to ensure that they are sent back to LaunchDarkly.
If you call `flush` inside the `waitUntil` method, then flushing events will not impact the handler’s response time. To learn more, read the [Cloudflare documentation on `waitUntil`](https://developers.cloudflare.com/workers/runtime-apis/fetch-event/#waituntil).
Here’s how:
Cloudflare SDK v2.3.0+ (TypeScript)
```
1
| // executionContext is the Cloudflare worker handler context
---|--- 
2
| // https://github.com/cloudflare/workers-types/blob/master/index.d.ts#L567
3
| executionContext.waitUntil(
4
| client.flush((err, res) => {
5
| console.log(`flushed events result: ${res}, error: ${err}`);
6
| }),
7
| );
```
If you do not call `flush`, the events will not be sent to LaunchDarkly servers, due to the ephemeral nature of edge workers.
### Fastly
###### Expand Fastly code sample
If you send [events](/docs/sdk/features/events#fastly), you must also flush those events before your worker exits to ensure that they are sent back to LaunchDarkly.
If you call `flush` inside the `waitUntil` method, then flushing events will not impact the handler’s response time. To learn more, read the [Fastly Compute documentation on `waitUntil`](https://js-compute-reference-docs.edgecompute.app/docs/globals/FetchEvent/prototype/waitUntil).
Here’s how:
TypeScript
```
1
| async function handleRequest(event: FetchEvent) {
---|--- 
2
| 
3
| ...
4
| 
5
| event.waitUntil(
6
| client.flush((err, res) => {
7
| console.log(`flushed events result: ${res}, error: ${err}`);
8
| }),
9
| );
10
| 
11
| ...
12
| }
```
If you do not call `flush`, the events will not be sent to LaunchDarkly servers, due to the ephemeral nature of edge workers.
To learn more, read [`flush`](https://launchdarkly.github.io/js-core/packages/sdk/fastly/docs/classes/LDClient.html#flush).
### Vercel
###### Expand Vercel code sample
Flushing events is available in Vercel SDK v1.2.0 and later.
If you send [events](/docs/sdk/features/events#vercel), you must also flush those events before your worker exits to ensure that they are sent back to LaunchDarkly.
If you call `flush` inside the `waitUntil` method, then flushing events will not impact the handler’s response time. To learn more, read the [Vercel documentation on `waitUntil`](https://vercel.com/docs/functions/edge-functions/edge-functions-api#waituntil).
Here’s how:
Vercel SDK v1.2.0+ (TypeScript)
```
1
| context.waitUntil(
---|--- 
2
| client.flush((err, res) => {
3
| console.log(`flushed events result: ${res}, error: ${err}`);
4
| }),
5
| );
```
If you do not call `flush`, the events will not be sent to LaunchDarkly servers, due to the ephemeral nature of edge workers.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs