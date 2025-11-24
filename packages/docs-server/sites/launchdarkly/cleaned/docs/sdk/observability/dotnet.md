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
 * [Prerequisites and dependencies](#prerequisites-and-dependencies)
 * [Get started](#get-started)
 * [Install the plugin](#install-the-plugin)
 * [Initialize the client](#initialize-the-client)
 * [Configure the plugin options](#configure-the-plugin-options)
 * [Explore supported features](#explore-supported-features)
 * [Review observability data in LaunchDarkly](#review-observability-data-in-launchdarkly)
##### The LaunchDarkly observability features are available for early access
[Observability](/docs/home/observability) features in the LaunchDarkly UI are publicly available in early access.
The observability SDKs, implemented as plugins for LaunchDarkly server-side and client-side SDKs, are designed for use with the in-app observability features. They are currently available in Early Access, and APIs are subject to change until a 1.x version is released.
If you are interested in participating in the Early Access Program for upcoming observability SDKs, [sign up here](https://launchdarkly.com/early-access/).
## Overview
This topic documents how to get started with the LaunchDarkly observability plugin for the .NET (server-side) SDK.
The .NET (server-side) SDK supports the **observability plugin** for error monitoring, logging, and tracing.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [Observability plugin API docs](https://launchdarkly.github.io/observability-sdk/sdk/@launchdarkly/observability-dotnet) 
GitHub repository | [@launchdarkly/observability-dotnet](https://github.com/launchdarkly/observability-sdk/tree/main/sdk/%40launchdarkly/observability-dotnet) 
Published module | [NuGet](https://www.nuget.org/packages/LaunchDarkly.Observability/) 
## Prerequisites and dependencies
This reference guide assumes that you are somewhat familiar with the LaunchDarkly [.NET (server-side) SDK](/docs/sdk/server-side/dotnet).
The observability plugin is compatible with the [.NET (server-side) SDK](/docs/sdk/server-side/dotnet), version 8.10 and later.
This plugin is designed for use with ASP.Net Core or ASP.Net:
 * When using .NET or netstandard2.0, the plugin works with ASP.Net Core
 * When using .NET Framework, the plugin works with ASP.Net
## Get started
Follow these steps to get started:
 * [Install the plugin](/docs/sdk/observability/dotnet#install-the-plugin)
 * [Initialize the .NET (server-side) SDK client](/docs/sdk/observability/dotnet#initialize-the-client)
 * [Configure the plugin options](/docs/sdk/observability/dotnet#configure-the-plugin-options)
 * [Explore supported features](/docs/sdk/observability/dotnet#explore-supported-features)
 * [Review observability data in LaunchDarkly](/docs/sdk/observability/dotnet#review-observability-data-in-launchdarkly)
## Install the plugin
LaunchDarkly uses a plugin to the .NET (server-side) SDK to provide observability.
The first step is to make both the SDK and the observability plugin available as dependencies.
Here’s how:
Installation
```
$
| dotnet add package LaunchDarkly.ServerSdk
---|--- 
>
| dotnet add package LaunchDarkly.Observability
```
Then, import the LaunchDarkly SDK’s namespaces in your application code. The namespace is not the same as the package name:
.NET SDK v8.10+
```
1
| using LaunchDarkly.Sdk;
---|--- 
2
| using LaunchDarkly.Sdk.Server;
3
| using LaunchDarkly.Observability;
```
## Initialize the client
Next, initialize the SDK and the plugin.
To initialize, you need your LaunchDarkly environment’s SDK key. This authorizes your application to connect to a particular environment within LaunchDarkly. To learn more, read [Initialize the client](/docs/sdk/server-side/dotnet#initialize-the-client) in the .NET (server-side) SDK reference guide.
Here’s how to initialize the SDK and plugin:
Initialize, .NET SDK v8.10+ with ASP.Net CoreInitialize, .NET SDK v8.10+ .Net Framework and ASP.Net
```
1
| var builder = WebApplication.CreateBuilder(args);
---|--- 
2
| 
3
| var config = Configuration.Builder("sdk-key-123abc")
4
| .StartWaitTime(TimeSpan.FromSeconds(5))
5
| .Plugins(new PluginConfigurationBuilder()
6
| .Add(ObservabilityPlugin.Builder(builder.Services)
7
| .WithServiceName("your-service-name")
8
| .WithServiceVersion("example-sha")
9
| .Build()
10
| )
11
| ).Build();
12
| 
13
| var client = new LdClient(config);
14
| 
15
| // Client must be constructed before the web application.
16
| var app = builder.Build();
```
## Configure the plugin options
You can configure options for the observability plugin when you initialize the SDK. The plugin constructor takes an optional object with the configuration details.
Here is an example:
Plugin options, .NET SDK v8.10+
```
1
| var plugin = ObservabilityPlugin.Builder()
---|--- 
2
| .WithServiceName("example-service")
3
| .WithServiceVersion("example-sha")
4
| .WithEnvironment("production")
5
| .Build("sdk-key-123abc");
```
For more information on plugin options, as well as how they interact with environment variables and existing OpenTelemetry configuration, read [Configuration for server-side observability](/docs/sdk/features/observability-config-server-side).
## Explore supported features
The observability plugins supports the following features. After the SDK and plugins are initialized, you can access these from within your application:
 * [Configuration for server-side observability](/docs/sdk/features/observability-config-server-side#net-server-side)
 * [Errors](/docs/sdk/features/observability-errors#net-server-side)
 * [Logs](/docs/sdk/features/observability-logs#net-server-side)
 * [Metrics](/docs/sdk/features/observability-metrics#net-server-side)
 * [Tracing](/docs/sdk/features/observability-traces#net-server-side)
## Review observability data in LaunchDarkly
After you initialize the SDK and observability plugin, your application automatically starts sending observability data back to LaunchDarkly in the form of custom events. You can review this information in the LaunchDarkly user interface. To learn how, read [Observability](/docs/home/observability) and [Metrics autogenerated from OpenTelemetry data](/docs/home/metrics/autogen-metrics#metrics-autogenerated-from-opentelemetry-data).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs