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
 * [Tracking events](#tracking-events)
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
 * [Cloudflare](#cloudflare)
 * [Fastly](#fastly)
 * [Vercel](#vercel)
## Overview
This topic explains how to send `custom` events using the track feature in each SDK. The track feature is available in server-side, client-side, and most edge SDKs.
## Tracking events
The track feature lets you record actions your customers take in your application as events. Events are specific to one LaunchDarkly environment and use an event key. You can send these events to LaunchDarkly metrics for use in experiments and guarded rollouts. To learn more, read [Metrics](/docs/home/metrics).
##### Event keys and metric keys are different
Sending custom events to LaunchDarkly requires a unique **event key**. You can set the event key to anything you want. Adding this event key to your codebase lets your SDK track actions customers take in your app as events.
LaunchDarkly also automatically generates a **metric key** when you create a metric. You only use the metric key to identify the metric in API calls. To learn more, read [Creating and managing metrics](/docs/home/metrics/create-metrics).
This is an example of a custom conversion binary metric with an event key of `conversions-to-paid-accounts`:
![A custom conversion binary metric.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/8c805044f3dac9355946759fbd8fe450d68037223110242aef14da96d59ebbeb/assets/images/auto/experiment-example-trial-metric.auto.png)
A custom conversion binary metric.
Evaluating flags, either with `variation()` or with `allFlags()`, produces analytics events which you can observe on your LaunchDarkly **Live events** page. The initial context you specify in the client constructor, as well as any context you specify with `identify()`, produces an analytics event which is how LaunchDarkly receives your context data. To learn more, read [Live events](/docs/home/releases/live-events).
To learn more about the different kinds of events SDKs send to LaunchDarkly, read [Analytics events](/docs/sdk/concepts/events). To learn how to view a list of all of the metric events your SDKs are sending to LaunchDarkly, read [Viewing incoming events](/docs/home/metrics/view-incoming-events).
Details about each SDK’s configuration are available in the SDK-specific sections below.
 * [Client-side SDKs](/docs/sdk/features/events#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/events#server-side-sdks)
 * [Edge SDKs](/docs/sdk/features/events#edge-sdks)
## Client-side SDKs
This feature is available in the following client-side SDKs:
 * [.NET (client-side)](/docs/sdk/features/events#net-client-side)
 * [Android](/docs/sdk/features/events#android)
 * [C++ (client-side)](/docs/sdk/features/events#c-client-side)
 * [Electron](/docs/sdk/features/events#electron)
 * [Flutter](/docs/sdk/features/events#flutter)
 * [iOS](/docs/sdk/features/events#ios)
 * [JavaScript](/docs/sdk/features/events#javascript)
 * [Node.js (client-side)](/docs/sdk/features/events#nodejs-client-side)
 * [React Native](/docs/sdk/features/events#react-native)
 * [Roku](/docs/sdk/features/events#roku)
### .NET (client-side)
###### Expand .NET (client-side) code sample
The `Track` method lets you record `custom` events end users take in your application using an event key.
Here’s how:
C#
```
1
| client.Track("example-event-key");
---|--- 
```
You can also attach custom data to your event by passing an extra parameter to `Track`, using the `LdValue` class to represent any value that can be encoded in JSON. To learn how, read [`LdClient.Track`](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.Client.LdClient.html#LaunchDarkly_Sdk_Client_LdClient_Track_System_String_LaunchDarkly_Sdk_LdValue_).
### Android
###### Expand Android code sample
The `track` method lets you record `custom` events end users take in your application using an event key. You can also attach custom JSON data to your event by passing an extra `JsonElement` parameter to `track`.
Here’s how:
JavaKotlin
```
1
| client.track("example-event-key");
---|--- 
```
To learn more, read [`track`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDClientInterface.html#track\(java.lang.String\)).
You can also attach custom data to your event by calling [`trackData`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDClientInterface.html#trackData\(java.lang.String,com.launchdarkly.sdk.LDValue\)) or [`trackMetric`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/LDClientInterface.html#trackMetric\(java.lang.String,com.launchdarkly.sdk.LDValue,double\)).
### C++ (client-side)
###### Expand C++ (client-side) code sample
The `Track` method lets you record `custom` events end users take in your application using an event key.
Here’s how:
C++ SDK v3.0 (native)C SDK v2.x
```
1
| client.Track("example-event-key");
---|--- 
```
To learn more, read [`Track`](https://launchdarkly.github.io/cpp-sdks/libs/client-sdk/docs/html/classlaunchdarkly_1_1client__side_1_1Client.html#a7c4ec4ae3cb04cb4fac27335834f3257).
### Electron
###### Expand Electron code sample
The `track` function lets you record `custom` events in your application with LaunchDarkly using an event key.
Here’s how:
JavaScript
```
1
| client.track('example-event-key', { customProperty: someValue });
---|--- 
```
### Flutter
###### Expand Flutter code sample
The `track` method lets you record `custom` events end users take in your application using an event key. You can also attach custom data to your event by passing an extra `LDValue` parameter or `num` parameter to `track`.
Here’s how:
Flutter SDK v4Flutter SDK v3.x
```
1
| client.track('example-event-key', data: LDValue.objectBuilder().addBool("clicked-button", true).build());
---|--- 
```
To learn more, read [`track`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDClient/track.html).
### iOS
###### Expand iOS code sample
The `track` method lets you record `custom` events end users take in your application using an event key.
In the iOS SDK, `track` is a `custom` event added to the LDClient event store. A client app can set a tracking event to allow client customized data analysis. After an app has called `track`, the app cannot remove the event from the event store. LDClient periodically transmits events to LaunchDarkly based on the frequency set in `LDConfig.eventFlushInterval`. The LDClient must be started and online.
After the SDK’s event store is full, the SDK discards new events until the event store is cleared when it reports events to LaunchDarkly. Configure the size of the event store using `LDConfig.eventCapacity`. The first parameter, `key`, is the key for the event. The SDK does nothing with the key, which can be any string the client app sends. The second parameter, `data`, is the data for the event. The `data` parameter is optional. The SDK does nothing with the data, which can be any valid JSON item as an `LDValue` instance.
Optionally, you can add a `metricValue` parameter of type `Double` to `track` in Swift or as a required parameter to the overloaded `track` method in Objective-C.
SwiftObjective-C
```
1
| let data: LDValue = ["some-custom-key": "some-custom-value", "another-custom-key": 7]
---|--- 
2
| try LDClient.get()!.track(key: "example-event-key", data: data)
```
To learn more, read the generated API documentation for [Swift](https://launchdarkly.github.io/ios-client-sdk/Classes/LDClient.html#/Events) or [Objective-C](https://launchdarkly.github.io/ios-client-sdk/Classes/ObjcLDClient.html#/Events).
### JavaScript
###### Expand JavaScript code sample
The `track` method lets you record `custom` events end users take in your application using an event key.
To call `track`:
JavaScript
```
1
| client.track('example-event-key', { customProperty: someValue });
---|--- 
```
The second argument is optional. It assists with observational analytics for metrics or for Data Export destinations:
 * If you define clicked or tapped conversion or page viewed conversion metrics in LaunchDarkly, the SDK sends them automatically after you have initialized the client. You do not have to do anything else with the client to send click or page view events. The SDK will generate `page view` events correctly regardless of how the URL is changed, such as by the HTML5 history API or by changing the URL hash fragment. To learn more about metrics, read [Metrics](/docs/home/metrics).
 * With Data Export, the second argument gives additional information without saving the data to the LaunchDarkly context. To learn more about Data export, read [Data Export](/docs/integrations/data-export).
To learn how to attach custom data to your event with optional parameters, read [`track`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDClient.html#track).
If you are using the [LaunchDarkly observability SDKs](/docs/sdk/observability), calling `track()` also automatically indexes your sessions so that you can [search for sessions](/docs/home/observability/session-replay) where the end user has completed an action.
##### Single-page apps
The SDK automatically handles URL changes made by the HTML5 history API or by changing the URL hash fragment, and will trigger `click` and `page view` events correctly.
##### Do Not Track and ad blocking software
The JavaScript-based SDKs respect the [Do Not Track events](https://www.eff.org/issues/do-not-track) header. If an end user has Do Not Track enabled in their browser, the SDK does not send analytics events for flag evaluations or metrics to `events.launchdarkly.com`. To learn more, read [Browser privacy settings block analytic events to LaunchDarkly](https://support.launchdarkly.com/hc/en-us/articles/13689033183771-Browser-privacy-settings-block-analytic-events-to-LaunchDarkly). In addition, ad blocking software may block analytics events from being sent. This does not impact feature flag evaluations. To learn more about the events SDKs send to LaunchDarkly, read [Analytics events](/docs/sdk/concepts/events).
### Node.js (client-side)
###### Expand Node.js (client-side) code sample
The `track` method lets you record `custom` events end users take in your application using an event key.
Here’s an example:
JavaScript
```
1
| client.track('example-event-key1');
---|--- 
2
| 
3
| client.track('example-event-key2', { someData: 2 });
```
To learn how to attach custom data to your event with optional parameters, read [`track`](https://launchdarkly.github.io/node-client-sdk/interfaces/LDClient.html#track).
### React Native
###### Expand React Native code sample
The `track` method lets you record `custom` events end users take in your application using an event key. You can also attach custom JSON data to your event by passing an extra parameter to `track`.
##### Availability
This parameter is available in v2.1.0 and later.
Optionally, you can add a `metricValue` parameter to the `track` method if you are using the latest version of Experimentation.
Here’s how:
JavaScript
```
1
| client.track('example-event-key1', false);
---|--- 
2
| client.track('example-event-key2', { someData: 'value' });
```
To learn how to attach custom data to your event with optional parameters, read [`track`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/classes/LDClientImpl.html#track).
### Roku
###### Expand Roku code sample
The `track` method lets you record `custom` events end users take in your application using an event key.
Here’s how:
BrightScript
```
1
| ' without optional data
---|--- 
2
| launchDarkly.track("example-event-key")
3
| 
4
| ' with optional data
5
| launchDarkly.track("example-event-key", {"customField": 123})
6
| 
7
| ' with optional numeric metric
8
| launchDarkly.track("example-event-key", invalid, 52.3)
```
## Server-side SDKs
This feature is available in the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/events#net-server-side)
 * [Apex](/docs/sdk/features/events#apex)
 * [C++ (server-side)](/docs/sdk/features/events#c-server-side)
 * [Erlang](/docs/sdk/features/events#erlang)
 * [Go](/docs/sdk/features/events#go)
 * [Haskell](/docs/sdk/features/events#haskell)
 * [Java](/docs/sdk/features/events#java)
 * [Lua](/docs/sdk/features/events#lua)
 * [Node.js (server-side)](/docs/sdk/features/events#nodejs-server-side)
 * [PHP](/docs/sdk/features/events#php)
 * [Python](/docs/sdk/features/events#python)
 * [Ruby](/docs/sdk/features/events#ruby)
 * [Rust](/docs/sdk/features/events#rust)
### .NET (server-side)
###### Expand .NET (server-side) code sample
The [`Track`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.LdClient.html#LaunchDarkly_Sdk_Server_LdClient_Track_) method lets you record `custom` events end users take in your application using an event key.
Here’s an example:
.NET SDK v7.0 (C#)
```
1
| client.Track("example-event-key", context);
---|--- 
```
You can also attach custom data to your event by passing an extra parameter to `Track`. To do this, use the [`LdValue`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.LdValue.html) type, which can contain any kind of data supported by JSON. You can also pass another parameter for a custom metric value.
### Apex
###### Expand Apex code sample
The `track` method lets you record actions your users take in your you do application. You can also attach custom JSON data to your event by passing an `LDValue` parameter to `track`, or a custom metric value by passing a `Double` parameter.
Here’s how:
Apex
```
1
| client.track(user, 'example-event-key', 52.3, LDValue.of('my value'));
---|--- 
```
To learn how to attach custom data to your event with extra parameters, read [Other methods](https://github.com/launchdarkly/apex-server-sdk/blob/master/doc.md#other-methods-1).
### C++ (server-side)
###### Expand C++ (server-side) code sample
The `Track` method lets you record `custom` events end users take in your application using an event key. Optionally, you can include additional data associated with the event.
Here’s how:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x (native)
```
1
| /* track the event */
---|--- 
2
| client.Track(context, "example-event-key");
3
| 
4
| /* track the event and associate data with it */
5
| client.Track(context, "example-event-key", 42)
```
To learn more, read `Track()` in [`Client`](https://launchdarkly.github.io/cpp-sdks/libs/server-sdk/docs/html/classlaunchdarkly_1_1server__side_1_1Client.html).
### Erlang
###### Expand Erlang code sample
The `track` method lets you record `custom` events end users take in your application using an event key.
Here’s how:
Erlang SDK v2.0+Erlang SDK v1.x
```
ldclient:track(<<"example-event-key">>, #{key => <<"context-key-123abc">>}, #{data => <<"example">>}) 
--- 
```
To learn more, read [`track`](https://hexdocs.pm/launchdarkly_server_sdk/ldclient.html#track-3).
You can also attach a JSON object containing arbitrary data to your event, or a custom metric value. To learn how, read [`track_metric`](https://hexdocs.pm/launchdarkly_server_sdk/ldclient.html#track_metric-4).
### Go
###### Expand Go code sample
The `Track` method lets you record `custom` events end users take in your application using an event key.
In this example, we use [`TrackEvent`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDScopedClient.TrackEvent) to send an event with the key `example-event-key`.
Here’s how:
Go SDK v7.13.4+, using LDScopedClientGo SDK v6+, using LDClient
```
1
| scopedClient.TrackEvent("example-event-key")
---|--- 
2
| // LDScopedClient is in beta and may change without notice.
```
You can also attach custom data to your event by calling [`TrackData`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDScopedClient.TrackData), which takes an extra parameter. Or, if you are using experimentation, you can specify a numeric metric with [`TrackMetric`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDScopedClient.TrackMetric).
### Haskell
###### Expand Haskell code sample
The `track` method lets you record `custom` events end users take in your application using an event key.
Here’s how:
Haskell SDK v4.0Haskell SDK v3.x
```
1
| track client context "example-event-key" Nothing Nothing
---|--- 
```
You can also attach a JSON object containing arbitrary data to your event, or a custom metric value. To learn how, read [`track`](https://launchdarkly.github.io/haskell-server-sdk/src/LaunchDarkly.Server.Client.html#track).
### Java
###### Expand Java code sample
The [`track`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDClient.html#track-java.lang.String-com.launchdarkly.sdk.LDContext-) method lets you record `custom` events end users take in your application using an event key.
Here’s how:
Java SDK v6.0
```
1
| client.track("example-event-key", context);
---|--- 
```
You can also attach custom JSON data to your event with an alternate version of `track`, [`trackData`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDClient.html#trackData-java.lang.String-com.launchdarkly.sdk.LDContext-com.launchdarkly.sdk.LDValue-). You can set the data to any value that can be represented in JSON. To learn more, read [`LDValue`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/LDValue.html).
If you are using [Experimentation](/docs/home/experimentation), you can specify a numeric metric with [`trackMetric`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDClient.html#trackMetric-java.lang.String-com.launchdarkly.sdk.LDContext-com.launchdarkly.sdk.LDValue-double-).
### Lua
###### Expand Lua code sample
The `track` method lets you record `custom` events end users take in your application using an event key. Optionally, you can include additional data associated with the event.
Here’s how:
Lua SDK v2Lua SDK v1.x
```
1
| client:track("example-event-key", context);
---|--- 
```
You can also attach an object containing arbitrary data to your event. To learn how, read [`track`](https://launchdarkly.github.io/lua-server-sdk/modules/launchdarkly-server-sdk.html#track).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
The `track` method lets you record `custom` events end users take in your application using an event key.
Here’s how:
Node.js SDK v7.x and later
```
1
| client.track('example-event-key', context);
---|--- 
```
You can also attach custom data to your event with optional parameters. To learn how, read [track](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/LDClient.html#track).
### PHP
###### Expand PHP code sample
The `track` method lets you record `custom` events end users take in your application using an event key.
Here’s how:
PHP SDK v5.0
```
1
| $client->track("example-event-key", $context);
---|--- 
```
You can also attach custom data, including anything that can be marshaled to JSON, to your event by passing an extra parameter to `track`. To learn how, read [`track()`](https://launchdarkly.github.io/php-server-sdk/classes/LaunchDarkly-LDClient.html#method_track).
### Python
###### Expand Python code sample
The `track` method lets you record actions end users take on your site. This lets you record events that take place on your server.
Here’s how:
Python SDK v8.0
```
1
| ldclient.get().track("example-event-key", context)
---|--- 
```
You can also attach custom data to your event with optional parameters. To learn how, read [`track`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#ldclient.client.LDClient.track).
### Ruby
###### Expand Ruby code sample
The `track` method lets you record `custom` events end users take in your application using an event key.
Here’s how:
Ruby SDK v7.0
```
1
| client.track("example-event-key", context)
---|--- 
```
You can also attach an extra hash containing arbitrary data to your event. To learn how, read [`track`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/LDClient.html#track-instance_method).
### Rust
###### Expand Rust code sample
The `track` method lets you record `custom` events end users take in your application using an event key.
In this example, we use [`track_event`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Client.html#method.track_event) to send an event with the key `example-event-key`.
Here’s how:
Rust SDK v1
```
1
| client.track_event(context, "example-event-key");
---|--- 
```
You can also attach custom data to your event by calling [`track_data`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Client.html#method.track_data), which takes an extra parameter. Or, if you are using experimentation, you can specify a numeric metric with [`track_metric`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Client.html#method.track_metric).
## Edge SDKs
All edge SDKs can be used with one of the LaunchDarkly client-side SDKs as follows:
 * The edge SDK gets all flags at the edge for a given context, and bootstraps them onto a cached payload
 * The client-side SDK initializes the bootstrapped payload
 * The client-side SDK evaluates the flags and sends events back to LaunchDarkly
Most edge SDKs support sending events directly. The [Akamai SDK](/docs/sdk/edge/akamai) does not. If you configure the edge SDK to send events, then using a client-side SDK is not necessary. This enables [Experimentation](/docs/home/experimentation) and [metrics](/docs/home/metrics) use cases if you are using the edge SDK in conjunction with a server-side SDK. To learn more, read [Experimentation and metric events](/docs/home/experimentation/events).
You need to configure the edge SDK to enable sending events. To learn more, read [Configuration](/docs/sdk/features/config#edge-sdks).
This feature is available in the following edge SDKs:
 * [Cloudflare](/docs/sdk/features/events#cloudflare)
 * [Fastly](/docs/sdk/features/events#fastly)
 * [Vercel](/docs/sdk/features/events#vercel)
### Cloudflare
###### Expand Cloudflare code sample
Sending events is available in Cloudflare SDK version 2.3.0 and later. You must explicitly enable sending events in your [configuration](/docs/sdk/features/config#cloudflare).
The `track` method lets you record `custom` events end users take in your application using an event key.
Here’s how:
Cloudflare SDK v2.3.0+ (TypeScript)
```
1
| client.track('example-event-key', context);
---|--- 
```
You can also attach custom data to your event with optional parameters.
Here’s how:
Cloudflare SDK v2.3.0+ (TypeScript)
```
1
| const exampleData = { customProperty: 'someValue' };
---|--- 
2
| const metricValue = 10;
3
| 
4
| client.track('example-event-key', context, exampleData, metricValue);
```
When you are working with an edge SDK, you must also call `flush` after sending any events:
Cloudflare SDK v2.3.0+ (TypeScript)
```
1
| executionContext.waitUntil(
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
To learn more, read [Flushing events](/docs/sdk/features/flush#cloudflare).
### Fastly
###### Expand Fastly code sample
Sending events from the Fastly SDK is enabled by default. You can change this in the SDK [configuration](/docs/sdk/features/config#fastly).
The `track` method lets you record `custom` events end users take in your application using an event key.
Here’s how:
TypeScript
```
1
| client.track('example-event-key', context);
---|--- 
```
You can also attach custom data to your event with optional parameters.
Here’s how:
TypeScript
```
1
| const exampleData = { customProperty: 'someValue' };
---|--- 
2
| const metricValue = 10;
3
| 
4
| client.track('example-event-key', context, exampleData, metricValue);
```
To learn more, read [`track`](https://launchdarkly.github.io/js-core/packages/sdk/fastly/docs/classes/LDClient.html#track).
When you are working with an edge SDK, you must also flush the events before your worker exits to ensure that they are sent back to LaunchDarkly. If you call `flush` inside the `waitUntil` method, then flushing events will not impact the handler’s response time. To learn more, read the [Fastly Compute documentation on `waitUntil`](https://js-compute-reference-docs.edgecompute.app/docs/globals/FetchEvent/prototype/waitUntil).
Here’s how:
TypeScript
```
1
| async function handleRequest(event: FetchEvent) {
---|--- 
2
| ...
3
| 
4
| event.waitUntil(
5
| client.flush((err, res) => {
6
| console.log(`flushed events result: ${res}, error: ${err}`);
7
| }),
8
| );
9
| 
10
| ...
11
| }
```
To learn more, read [Flushing events](/docs/sdk/features/flush#fastly).
### Vercel
###### Expand Vercel code sample
Sending events is available in Vercel SDK version 1.2.0 and later. You must explicitly enable sending events in your [configuration](/docs/sdk/features/config#vercel).
The `track` method lets you record `custom` events end users take in your application using an event key.
Here’s how:
Vercel SDK v1.2.0+ (TypeScript)
```
1
| client.track('example-event-key', context);
---|--- 
```
You can also attach custom data to your event with optional parameters.
Here’s how:
Vercel SDK v1.2.0+ (TypeScript)
```
1
| const exampleData = { customProperty: 'someValue' };
---|--- 
2
| const metricValue = 10;
3
| 
4
| client.track('example-event-key', context, exampleData, metricValue);
```
When you are working with an edge SDK, you must also flush the events before your worker exits to ensure that they are sent back to LaunchDarkly. If you call `flush` inside the `waitUntil` method, then flushing events will not impact the handler’s response time. To learn more, read the [Vercel documentation on `waitUntil`](https://vercel.com/docs/functions/edge-functions/edge-functions-api#waituntil).
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
To learn more, read [Flushing events](/docs/sdk/features/flush#vercel).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs