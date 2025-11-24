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
The observability plugin automatically sends logs to LaunchDarkly. You can also use `recordLog` to manually create and send a log record.
You can view all logs sent to LaunchDarkly under **Logs** in the LaunchDarkly user interface. To learn more, read [Logs](/docs/home/observability/logs).
Details about each SDK’s configuration are available in the SDK-specific sections below:
 * [Client-side SDKs](/docs/sdk/features/observability-logs#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/observability-logs#server-side-sdks)
## Client-side SDKs
This feature is available in the observability plugin for the following client-side SDKs:
 * [iOS](/docs/sdk/features/observability-logs#ios)
 * [Android](/docs/sdk/features/observability-logs#android)
 * [JavaScript](/docs/sdk/features/observability-logs#javascript)
 * [React Native](/docs/sdk/features/observability-logs#react-native)
 * [React Web](/docs/sdk/features/observability-logs#react-web)
 * [Vue](/docs/sdk/features/observability-logs#vue)
### iOS
###### Expand iOS code sample
You can use `recordLog` to manually send a custom error:
Record log
```
1
| LDObserve.shared.recordLog(message: message, severity: .info, attributes: attributes)
---|--- 
```
To learn more, read [`recordLog`](https://github.com/launchdarkly/swift-launchdarkly-observability/blob/b792a5c153ea55b0bfd308af35cbd1e8203b30d8/Sources/ApplicationServices/ObservabilityService.swift#L40).
### Android
###### Expand Android code sample
Use `recordLog` to manually create and send a log record:
Record log
```
1
| LDObserve.recordLog("Example log message", Severity.DEBUG, attributes)
---|--- 
```
The attributes argument is optional. To construct it, use `Attributes` from the [`@opentelemetry/api`](https://opentelemetry.io/docs/specs/semconv/general/attributes/).
### JavaScript
###### Expand JavaScript code sample
Use `recordLog` to manually create and send a log record:
Record log
```
1
| LDObserve.recordLog('Example log message', Severity.DEBUG);
---|--- 
```
To learn more, read [`recordLog`](https://launchdarkly.github.io/observability-sdk/packages/@launchdarkly/observability/interfaces/api_observe.Observe.html#recordlog).
### React Native
###### Expand React Native code sample
Use `recordLog` to manually create and send a log record:
Record log
```
1
| LDObserve.recordLog('Example log message', Severity.DEBUG, attributes);
---|--- 
```
The attributes argument is optional. To construct it, use `Attributes` from the [`@opentelemetry/api`](https://opentelemetry.io/docs/specs/semconv/general/attributes/). To learn more, read [`recordLog`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-react-native/interfaces/Observe.html#recordlog).
### React Web
To send a log record with the React Web SDK, follow the example for [JavaScript](/docs/sdk/features/observability-logs#javascript).
### Vue
To send a log record with the Vue SDK, follow the example for [JavaScript](/docs/sdk/features/observability-logs#javascript).
## Server-side SDKs
This feature is available in the observability plugin for the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/observability-logs#net-server-side)
 * [Go](/docs/sdk/features/observability-logs#go)
 * [Node.js (server-side)](/docs/sdk/features/observability-logs#nodejs-server-side)
 * [Python](/docs/sdk/features/observability-logs#python)
### .NET (server-side)
###### Expand .NET (server-side) code sample
Use `RecordLog` to manually create and send a log record.
Here’s how:
Record log
```
1
| Observe.RecordLog(message, loglevel, attributes)
---|--- 
```
You can optionally pass an array of `attributes`, which may include any attributes. We recommend using [attributes from the OpenTelemetry specification](https://opentelemetry.io/docs/specs/semconv/general/attributes/). To learn more, read [`RecordLog`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-dotnet/api/LaunchDarkly.Observability.Observe.html#LaunchDarkly_Observability_Observe_RecordLog_System_String_Microsoft_Extensions_Logging_LogLevel_System_Collections_Generic_IDictionary_System_String_System_Object__).
### Go
###### Expand Go code sample
Use `RecordLog` to manually create and record a log record. The log is recorded with LaunchDarkly, but is not sent to other log handlers.
Here’s how:
Record log
```
1
| ldobserve.RecordLog(ctx, LogRecord)
---|--- 
```
The Go `context.Context` and log record should be specific to this request. You can optionally pass an array of [attributes from the OpenTelemetry specification](https://pkg.go.dev/go.opentelemetry.io/otel/log#KeyValue). To learn more, read [`RecordLog`](https://pkg.go.dev/github.com/launchdarkly/observability-sdk/go#RecordLog).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
Use `recordLog` to manually create and send a log record.
Here’s how:
Record log
```
1
| LDObserve.recordLog(
---|--- 
2
| message,
3
| level,
4
| secureSessionId,
5
| requestId,
6
| metadata
7
| });
```
The `recordLog` method automatically provides context propagation, so you can leave the `secureSessionId` and `requestId` undefined. Alternatively, you have the option to set their values, to assist with the context propagation. You can parse values for `secureSessionId` and `requestId` from the incoming request using [`LDObserve.parseHeaders()`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-node/interfaces/Observe.html#parseheaders).
### Python
###### Expand Python code sample
Use `record_log` to manually create and send a log record. The log is recorded with LaunchDarkly, but is not sent to other log handlers.
Here’s how:
Record log
```
1
| observe.record_log("log message", logging.INFO)
---|--- 
```
The message to record and log level should be specific to this request. You can optionally pass an array of additional `Attributes`, which may include any [attributes from the OpenTelemetry specification](https://opentelemetry.io/docs/specs/semconv/general/attributes/). To learn more, read [`record_log`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-python/ldobserve/observe.html#record_log).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs