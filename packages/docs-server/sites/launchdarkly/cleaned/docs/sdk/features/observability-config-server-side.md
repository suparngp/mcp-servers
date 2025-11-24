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
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [Go](#go)
 * [Node.js (server-side)](#nodejs-server-side)
 * [Environment variables](#environment-variables)
 * [OpenTelemetry configuration options](#opentelemetry-configuration-options)
 * [Plugin configuration options](#plugin-configuration-options)
 * [Python](#python)
## Overview
This topic explains how to configure the observability plugin for server-side SDKs.
The observability plugin collects and sends observability data to LaunchDarkly, so you can review error monitoring, logs, traces, and more from within the LaunchDarkly UI.
To get started with the observability plugin, read the observability reference guide for your SDK. Use the docs site navigation on the left, or find your SDK under [Observability SDKs](/docs/sdk/observability#observability-sdks).
Details about each SDK’s configuration are available in the SDK-specific sections below:
 * [Server-side SDKs](/docs/sdk/features/observability-config-server-side#server-side-sdks)
## Server-side SDKs
This feature is available in the observability plugin for the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/observability-config-server-side#net-server-side)
 * [Go](/docs/sdk/features/observability-config-server-side#go)
 * [Node.js (server-side)](/docs/sdk/features/observability-config-server-side#nodejs-server-side)
 * [Python](/docs/sdk/features/observability-config-server-side#python)
### .NET (server-side)
###### Expand .NET (server-side) code sample
You can configure the observability plugin for the .NET (server-side) SDK through a mix of environment variables, OpenTelemetry configuration options, and plugin configuration options.
Use the `ObservabilityPlugin.ObservabilityPluginBuilder` to set the options. In many cases, you can use an OpenTelemetry-specific environment variable instead, if you prefer. For example, if you want to set a custom OTLP endpoint, you can either set `OtlpEndpoint` in your `ObservabilityPlugin.ObservabilityPluginBuilder`, or you can set the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable.
Here’s how:
Plugin configuration with ASP.Net CorePlugin configuration with ASP.Net .Net Framework
```
1
| var builder = WebApplication.CreateBuilder(args);
---|--- 
2
| 
3
| var config = Configuration.Builder("sdk-key-123abc")
4
| .Plugins(new PluginConfigurationBuilder()
5
| .Add(ObservabilityPlugin.Builder(builder.Services)
6
| .WithServiceName("example-service")
7
| // we recommend setting service version to the latest deployed git SHA
8
| .WithServiceVersion("example-sha")
9
| .Build())).Build();
10
| 
11
| // Building the LdClient with the Observability plugin. This line will add services to the web application.
12
| var client = new LdClient(config);
13
| 
14
| // Client must be built before your web application.
15
| var app = builder.Build();
```
For a complete list of configuration options, read [`ObservabilityPlugin.ObservabilityPluginBuilder`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-dotnet/api/LaunchDarkly.Observability.ObservabilityPlugin.ObservabilityPluginBuilder.html).
### Go
###### Expand Go code sample
You can configure the observability plugin for the Go SDK through the plugin’s options.
Use the functions in the [`Option`](https://pkg.go.dev/github.com/launchdarkly/observability-sdk/go#Option) type to set the options.
Here’s how:
Plugin configuration options
```
1
| client, _ := ld.MakeCustomClient("sdk-key-123abc",
---|--- 
2
| ld.Config{
3
| Plugins: []ldplugins.Plugin{
4
| ldobserve.NewObservabilityPlugin(
5
| ldobserve.WithServiceName("example-service"),
6
| // we recommend setting service version to the latest deployed git SHA
7
| ldobserve.WithServiceVersion("example-sha"),
8
| ldobserve.WithEnvironment("production")
9
| ),
10
| },
11
| }, 5*time.Second)
```
For a complete list of configuration options, read [`Option`](https://pkg.go.dev/github.com/launchdarkly/observability-sdk/go#Option).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
You can configure the observability plugin for the Node.js (server-side) SDK through a mix of environment variables, OpenTelemetry configuration options, and plugin configuration options.
#### Environment variables
The environment variables specify where to enable instrumentation:
 * `LAUNCHDARKLY_OTEL_NODE_ENABLE_FILESYSTEM_INSTRUMENTATION` enables file system instrumentation. It defaults to `false`.
 * `LAUNCHDARKLY_OTEL_NODE_ENABLE_OUTGOING_HTTP_INSTRUMENTATION` enables outgoing HTTP instrumentation. It defaults to `true`. It only affects outgoing HTTP requests instrumented by `@opentelemetry/instrumentation-http`.
#### OpenTelemetry configuration options
If you are already using [OpenTelemetry configuration options for Node](https://opentelemetry.io/docs/zero-code/js/configuration/) in your application, you can continue to use them.
When you use the observability plugin, the `@opentelemetry/instrumentation-fs` instrumentation behaves as follows:
 * The instrumentation will only be enabled if `LAUNCHDARKLY_OTEL_NODE_ENABLE_FILESYSTEM_INSTRUMENTATION` is `true`.
 * The instruction is unaffected by the `OTEL_NODE_ENABLED_INSTRUMENTATIONS` and `OTEL_NODE_DISABLED_INSTRUMENTATIONS` OpenTelemetry environment variables.
#### Plugin configuration options
To specify the observability plugin configuration options, use the `NodeOptions` interface to set the options.
Here’s how:
Plugin configuration options
```
1
| const client = init(
---|--- 
2
| 'sdk-key-123abc',
3
| {
4
| plugins: [
5
| new Observability({
6
| serviceName: 'example-service',
7
| // we recommend setting serviceVersion to the latest deployed git SHA
8
| serviceVersion: 'example-sha',
9
| environment: 'production'
10
| })
11
| ]
12
| }
13
| )
```
For a complete list of configuration options, read [`NodeOptions`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-node/interfaces/NodeOptions.html).
### Python
###### Expand Python code sample
You can configure the observability plugin for the Python SDK through a mix of environment variables, OpenTelemetry configuration options, and plugin configuration options.
Use the `ObservabilityConfig` class to set the options. In many cases, you can use an OpenTelemetry-specific environment variable instead, if you prefer. For example, if you want to set a custom OTLP endpoint, you can either set `otlp_endpoint` in your `ObservabilityConfig`, or you can set the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable.
Here’s how:
Plugin configuration options
```
1
| observability_config = ObservabilityConfig(
---|--- 
2
| # alternatively, set the OTEL_SERVICE_NAME environment variable
3
| service_name = "example-service",
4
| # we recommend setting service_version to the latest deployed git SHA
5
| service_version = "example-sha",
6
| environment = "production"
7
| )
8
| 
9
| plugin = ObservabilityPlugin(observability_config)
```
For a complete list of configuration options, read [`ObservabilityConfig`](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-python/ldobserve.html#ObservabilityConfig).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs