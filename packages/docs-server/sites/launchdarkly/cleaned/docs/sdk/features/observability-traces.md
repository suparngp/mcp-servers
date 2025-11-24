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
 * [iOS](#ios)
 * [Android](#android)
 * [JavaScript](#javascript)
 * [React Native](#react-native)
 * [React Web](#react-web)
 * [Vue](#vue)
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [Go](#go)
 * [Node.js (server-side)](#nodejs-server-side)
 * [Python](#python)
## Overview
This topic explains how to record traces through the SDK observability plugin.
You can view all traces sent to LaunchDarkly under **Traces** in the LaunchDarkly user interface. To learn more, read [Traces](/docs/home/observability/traces).
Details about each SDK’s configuration are available in the SDK-specific sections below:
 * [Client-side SDKs](/docs/sdk/features/observability-traces#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/observability-traces#server-side-sdks)
## Client-side SDKs
This feature is available in the observability plugin for the following client-side SDKs:
 * [iOS](/docs/sdk/features/observability-traces#ios)
 * [Android](/docs/sdk/features/observability-traces#android)
 * [JavaScript](/docs/sdk/features/observability-traces#javascript)
 * [React Native](/docs/sdk/features/observability-traces#react-native)
 * [React Web](/docs/sdk/features/observability-traces#react-web)
 * [Vue](/docs/sdk/features/observability-traces#vue)
### iOS
###### Expand iOS code sample
To build and start a new span:
Start a new span
```
1
| let span = LDObserve.shared.startSpan(name: "exampleSpan", attributes: attributes)
---|--- 
2
| // This span ends when you call span.end()
3
| span.end()
```
The attributes argument should include the details to record with the span. To construct it, use `Attributes` from the [`@opentelemetry/api`](https://opentelemetry.io/docs/specs/semconv/general/attributes/).
### Android
###### Expand Android code sample
To start a new span:
Start a new span
```
1
| LDObserve.startSpan("exampleSpan", attributes)
---|--- 
```
The attributes argument should include the details to record with the span. To construct it, use `Attributes` from the [`@opentelemetry/api`](https://opentelemetry.io/docs/specs/semconv/general/attributes/).
### JavaScript
###### Expand JavaScript code sample
The observability plugin provides two options for starting new spans:
 * `startSpan()` ends the span automatically after the callback function completes, whether it returns normally or throws an error
 * `startManualSpan()` ends the span when you call `span.end()`
To start a new span:
Automatic spanManual span
```
1
| // This span ends automatically after the callback completes
---|--- 
2
| LDObserve.startSpan('fetchData', (span) => {
3
| // Your code here
4
| });
```
To learn more, read [`startSpan`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_observe.Observe.html#startspan) and [`startManualSpan`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_observe.Observe.html#startmanualspan).
### React Native
###### Expand React Native code sample
The observability plugin provides a few options for starting new spans:
 * [`startSpan()`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-react-native/interfaces/Observe.html#startspan) starts a new span without making it active
 * [`startActiveSpan()`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-react-native/interfaces/Observe.html#startactivespan) starts a new span, makes it active, and runs a callback function within its context
 * [`startWithHeaders()`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-react-native/interfaces/Observe.html#startwithheaders) starts a new span with header context
Here’s an example:
Start an active span and run a callback
```
1
| // This span ends automatically after the callback completes
---|--- 
2
| LDObserve.startActiveSpan('exampleSpan', (span) => {
3
| // Your callback function here
4
| });
```
To learn more, read [`Observe`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-react-native/interfaces/Observe.html).
### React Web
To start new spans with the React Web SDK, follow the example for [JavaScript](/docs/sdk/features/observability-traces#javascript).
### Vue
To start new spans with the React Web SDK, follow the example for [JavaScript](/docs/sdk/features/observability-traces#javascript).
## Server-side SDKs
This feature is available in the observability plugin for the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/observability-traces#net-server-side)
 * [Go](/docs/sdk/features/observability-traces#go)
 * [Node.js (server-side)](/docs/sdk/features/observability-traces#nodejs-server-side)
 * [Python](/docs/sdk/features/observability-traces#python)
### .NET (server-side)
###### Expand .NET (server-side) code sample
To start new spans within the observability plugin for .NET (server-side) SDK, use `StartActivity`. By default, it records any exceptions as error events on the span, and sets the span’s status appropriately.
Here’s how:
Example: Starting a span
```
1
| using (var activity = Observe.StartActivity("example-span", ActivityKind.Internal,
---|--- 
2
| new Dictionary<string, object> { { "example-attribute", "example-value" } }))
3
| {
4
| activity.SetTag("added-attribute", "added-attribute-value");
5
| return "Hello world!";
6
| }
```
This method requires the `Name` of the span. Optionally, you can pass in `attributes` and specify whether to record an exception or set the span’s status if there is an exception. To construct the attributes argument, use `Attributes` from the [`@opentelemetry/api`](https://opentelemetry.io/docs/specs/semconv/general/attributes/).
To learn more, read [`StartActivity`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-dotnet/api/LaunchDarkly.Observability.Observe.html#LaunchDarkly_Observability_Observe_StartActivity_System_String_System_Diagnostics_ActivityKind_System_Collections_Generic_IDictionary_System_String_System_Object__).
### Go
###### Expand Go code sample
To start new spans with in the observability plugin for the Go SDK, use `StartSpan()`. By default, this records any exceptions as error events on the span and sets the span’s status appropriately.
Here’s how:
Example: Working with a span
```
1
| _, span := ldobserve.StartSpan(ctx, "example-span", []trace.SpanStartOption{})
---|--- 
2
| span.SetAttributes(attribute.String("example-attribute", "example-value"))
3
| span.End()
```
The `StartSpan` method requires a Go `context.Context`, the `name` of the span, and an array of the [OpenTelemetry options for starting a span](https://pkg.go.dev/go.opentelemetry.io/otel/trace#SpanStartOption). You can optionally pass an array of [attributes from the OpenTelemetry specification](https://pkg.go.dev/go.opentelemetry.io/otel/log#KeyValue).
To learn more, read [`StartSpan`](https://pkg.go.dev/github.com/launchdarkly/observability-sdk/go#StartSpan).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
The Node.js (server-side) SDK’s observability plugin uses the [OpenTelemetry Tracing API](https://opentelemetry.io/docs/specs/otel/trace/api/) to work with spans.
Additionally, it provides the following functions for working with spans:
 * `setAttributes()` sets attributes on the active span
 * `startWithHeaders()` starts a span with information from the request headers
 * `runWithHeaders()` runs a callback with information from the request headers and returns the result
Here’s an example:
Example: Starting and running a span
```
1
| app.get("/start-span-example", (req: Request, res: Response) => {
---|--- 
2
| const {span} = LDObserve.startWithHeaders('example-span-a', req.headers);
3
| 
4
| LDObserve.setAttributes({
5
| "example-attribute": "example-value",
6
| });
7
| 
8
| res.send("Hello World");
9
| span.end();
10
| });
11
| 
12
| app.get("/run-span-example", async (req: Request, res: Response) => {
13
| await LDObserve.runWithHeaders('example-span-b', req.headers, (span) => {
14
| LDObserve.setAttributes({
15
| "example-attribute": "example-value",
16
| });
17
| 
18
| res.send("Hello World");
19
| });
20
| });
```
To learn more, read [`Observe`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-node/interfaces/Observe.html).
### Python
###### Expand Python code sample
To start new spans with in the observability plugin for Python SDK, use `start_span`. This method is a context manager for creating a new span. By default, it records any exceptions as error events on the span, sets the span’s status appropriately. Exiting the context manager calls the span’s `end` method.
Here’s how:
Example: Starting a span
```
1
| with observe.start_span("manual-span", attributes={"custom": "value"}) as span:
---|--- 
2
| span.set_attribute("my-attribute", "my-value")
3
| # Any user defined code I want to capture.
```
This method requires the `name` of the span. Optionally, you can pass in `attributes` and specify whether to record an exception or set the span’s status if there is an exception. To construct the attributes argument, use `Attributes` from the [`@opentelemetry/api`](https://opentelemetry.io/docs/specs/semconv/general/attributes/).
To learn more, read [`start_span`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-python/ldobserve/observe.html#start_span).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs