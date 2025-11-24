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
 * [Viewing errors and sourcemaps](#viewing-errors-and-sourcemaps)
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
The observability plugin automatically sends errors to LaunchDarkly. You can also use `recordError` to manually send a custom error.
Details about each SDK’s configuration are available in the SDK-specific sections below:
 * [Client-side SDKs](/docs/sdk/features/observability-errors#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/observability-errors#server-side-sdks)
## Viewing errors and sourcemaps
You can view all errors sent to LaunchDarkly under **Errors** in the LaunchDarkly user interface. To learn more, read [Error monitoring](/docs/home/observability/errors).
If you are working with a client-side SDK and using the **Errors** page in LaunchDarkly to help debug an error, it’s helpful to have a stack trace from the original file in your codebase to help understand what is going wrong. To provide this, LaunchDarkly needs access to the sourcemaps from your codebase. You can send your sourcemaps to LaunchDarkly using the `ldcli sourcemaps upload` command in the LaunchDarkly CLI. To learn how, read [Use `ldcli` for uploading sourcemaps](/docs/home/getting-started/ldcli-commands#use-ldcli-for-uploading-sourcemaps).
## Client-side SDKs
This feature is available in the observability plugin for the following client-side SDKs:
 * [iOS](/docs/sdk/features/observability-errors#ios)
 * [Android](/docs/sdk/features/observability-errors#android)
 * [JavaScript](/docs/sdk/features/observability-errors#javascript)
 * [React Native](/docs/sdk/features/observability-errors#react-native)
 * [React Web](/docs/sdk/features/observability-errors#react-web)
 * [Vue](/docs/sdk/features/observability-errors#vue)
### iOS
###### Expand iOS code sample
You can use `recordError` to manually send a custom error:
Record error
```
1
| LDObserve.shared.recordLog(message: message, severity: .info, attributes: attributes)
---|--- 
```
To learn more, read [`recordError`](https://github.com/launchdarkly/swift-launchdarkly-observability/blob/b792a5c153ea55b0bfd308af35cbd1e8203b30d8/Sources/ApplicationServices/ObservabilityService.swift#L36).
### Android
###### Expand Android code sample
You can use `recordError` to manually send a custom error:
Record error
```
1
| LDObserve.recordError(error, attributes)
---|--- 
```
The attributes argument is optional. To construct it, use `Attributes` from the [`@opentelemetry/api`](https://opentelemetry.io/docs/specs/semconv/general/attributes/).
### JavaScript
###### Expand JavaScript code sample
You can use `recordError` to manually send a custom error:
Record error
```
1
| LDObserve.recordError(error, 'optional message', {
---|--- 
2
| component: 'ExampleComponent.tsx',
3
| });
```
The message and payload arguments are optional. To learn more, read [`recordError`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_observe.Observe.html#recorderror).
### React Native
###### Expand React Native code sample
You can use `recordError` to manually send a custom error:
Record error
```
1
| LDObserve.recordError(error, attributes, options);
---|--- 
```
The attributes and options arguments are optional. To construct them, use `Attributes` and `OtelSpan` from the [`@opentelemetry/api`](https://opentelemetry.io/docs/specs/semconv/general/attributes/). To learn more, read [`recordError`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-react-native/interfaces/Observe.html#recorderror).
### React Web
To send a custom error with the React Web SDK, follow the example for [JavaScript](/docs/sdk/features/observability-errors#javascript).
### Vue
To send a custom error with the React Web SDK, follow the example for [JavaScript](/docs/sdk/features/observability-errors#javascript).
## Server-side SDKs
This feature is available in the observability plugin for the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/observability-errors#net-server-side)
 * [Go](/docs/sdk/features/observability-errors#go)
 * [Node.js (server-side)](/docs/sdk/features/observability-errors#nodejs-server-side)
 * [Python](/docs/sdk/features/observability-errors#python)
### .NET (server-side)
###### Expand .NET (server-side) code sample
Use `RecordError` to manually send a custom error.
Here’s how:
Record error
```
1
| Observe.RecordException(exception, metadata)
---|--- 
```
You can optionally pass an array of `attributes`, which may include any attributes. We recommend using [attributes from the OpenTelemetry specification](https://opentelemetry.io/docs/specs/semconv/general/attributes/). To learn more, read [`RecordLog`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-dotnet/api/LaunchDarkly.Observability.Observe.html#LaunchDarkly_Observability_Observe_RecordLog_System_String_Microsoft_Extensions_Logging_LogLevel_System_Collections_Generic_IDictionary_System_String_System_Object__).
### Go
###### Expand Go code sample
Use `RecordError` to manually record an error in the current span.
Here’s how:
Record error
```
1
| ldobserve.RecordError(ctx, err)
---|--- 
```
This function takes a Go `context.Context` and the error. You can optionally pass an array of additional [attributes from the OpenTelemetry specification](https://pkg.go.dev/go.opentelemetry.io/otel/attribute#KeyValue). To learn more, read [`RecordError`](https://pkg.go.dev/github.com/launchdarkly/observability-sdk/go#RecordError).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
Use `recordError` to manually send a custom error.
Here’s how:
Record error
```
1
| LDObserve.recordError(
---|--- 
2
| error,
3
| secureSessionId,
4
| requestId,
5
| metadata,
6
| options
7
| });
```
The `recordError` method automatically provides trace context propagation, so you can leave the `secureSessionId` and `requestId` undefined. Alternatively, you have the option to set their values, to assist with the context propagation. You can parse values for `secureSessionId` and `requestId` from the incoming request using [`LDObserve.parseHeaders()`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-node/interfaces/Observe.html#parseheaders).
The optional `metadata` can include any [attributes from the OpenTelemetry specification](https://opentelemetry.io/docs/specs/semconv/general/attributes/). To learn more, read [`recordError`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-node/interfaces/Observe.html#recorderror).
### Python
###### Expand Python code sample
Use `record_exception` to manually send a custom error.
Here’s how:
Record exception
```
1
| try:
---|--- 
2
| # your application may raise an error
3
| except Exception as e:
4
| observe.record_exception(e)
```
Passing the `Exception` records the exception contents and stack trace. You can optionally pass an array of additional `Attributes`, which may include any [attributes from the OpenTelemetry specification](https://opentelemetry.io/docs/specs/semconv/general/attributes/). To learn more, read [`record_exception`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-python/ldobserve/observe.html#record_exception).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs