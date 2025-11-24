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
 * [Get started](#get-started)
 * [Install the SDK](#install-the-sdk)
 * [Initialize the client](#initialize-the-client)
 * [Evaluate a context](#evaluate-a-context)
 * [Transport Layer Security (TLS) and other networking issues](#transport-layer-security-tls-and-other-networking-issues)
 * [Shut down the client](#shut-down-the-client)
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the server-side .NET SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/dotnet-server-sdk/) 
GitHub repository | [.NET (server-side) SDK](https://github.com/launchdarkly/dotnet-core/tree/main/pkgs/sdk/server) 
Sample application | [.NET (server-side)](https://github.com/launchdarkly/hello-dotnet-server) 
[OpenFeature .NET (server-side)](https://github.com/launchdarkly/hello-openfeature-dotnet-server) 
Published module | [NuGet](https://www.nuget.org/packages/LaunchDarkly.ServerSdk/) 
##### For use in server-side applications only
This SDK is intended for use in multi-user .NET server applications. If you have a .NET application and want to set up LaunchDarkly in a mobile, desktop, or embedded application, read the [client-side .NET SDK reference](/docs/sdk/client-side/dotnet).
To learn more about LaunchDarkly’s different SDK types, read [Choosing an SDK type](/docs/sdk/concepts/client-side-server-side).
## Get started
##### SDK version compatibility
The LaunchDarkly .NET SDK, version 8.9 and higher, is compatible with .NET 8.
The LaunchDarkly .NET SDK, version 7.0 and higher, is compatible with .NET 6.0+, .NET Framework 4.6.2+, .NET Standard 2.0+, and .NET Core 3.1.
Prior to version 7.0, the LaunchDarkly .NET SDK also supported .NET 5.0, .NET Framework 4.5.2 and .NET Framework 4.6.1, and .NET Core 2.1.
After you complete the [Getting Started process](/docs/home/getting-started), follow these instructions to start using the LaunchDarkly SDK in your .NET application.
### Install the SDK
First, install the LaunchDarkly SDK as a dependency in your application using your application’s dependency manager.
We recommend making the LaunchDarkly [observability plugin](/docs/sdk/observability) available as well. This plugin collects and sends observability data to LaunchDarkly. This means you can review error monitoring and logs from within the LaunchDarkly UI. It requires the .NET (server-side) SDK version 8.10 or later.
Here’s how:
Shell
```
$
| Install-Package LaunchDarkly.ServerSdk
---|--- 
>
| dotnet add package LaunchDarkly.Observability
```
Next, import the LaunchDarkly SDK’s namespaces in your application code. The namespace is not the same as the package name:
.NET SDK v6.x and later (C#)
```
1
| using LaunchDarkly.Sdk;
---|--- 
2
| using LaunchDarkly.Sdk.Server;
3
| using LaunchDarkly.Observability;
4
| 
5
| 
6
| // LaunchDarkly.Sdk defines general types like Context, which are also used in the client-side .NET SDK.
7
| // LaunchDarkly.Sdk.Server defines the LdClient and Configuration types for the server-side .NET SDK.
8
| // LaunchDarkly.Observability defines the optional observability,
9
| // which requires .NET (server-side) SDK version 8.10 or later.
```
##### The .NET (server-side) SDK uses an SDK key
The .NET (server-side) SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
### Initialize the client
After you install and import the SDK, create a single, shared instance of [`LdClient`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.LdClient.html). Specify your SDK key in the configuration to authorize your application to connect to a particular environment within LaunchDarkly.
To create a single instance:
C#C# 1
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
When you initialize the client, you can optionally provide configuration options. To learn more, read [Configuration](/docs/sdk/features/config#net-server-side). To learn more about the specific configuration that are available in this SDK, read [`ConfigurationBuilder`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.ConfigurationBuilder.html).
##### LdClient should be a singleton
In the standard use case where there is only one SDK key, it’s important to make the `LdClient` a singleton for each LaunchDarkly project. The client instance maintains internal state that allows LaunchDarkly to serve feature flags without making any remote requests. Do not instantiate a new client with every request.
If you need to use more than one SDK key, the SDK allows you to create more than one `LdClient` instance. This is an uncommon requirement, but one the SDK supports.
If you have multiple LaunchDarkly projects, you can create one `LDClient` for each. In this situation, the clients operate independently. For example, they do not share a single connection to LaunchDarkly.
### Evaluate a context
You can use `client` to check which variation a particular context will receive for a given feature flag. To learn more, read [Evaluating flags](/docs/sdk/features/evaluating) and [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons). For more information about how contexts are specified, read [Context configuration](/docs/sdk/features/context-config).
In the v7 example, the context key is the string “context-key-123abc”. In the v6 example, the user key is the string “user-key-123abc”:
.NET SDK v7.0+ (C#).NET SDK v6.x (C#)
```
1
| var context = Context.Builder("context-key-123abc")
---|--- 
2
| .Name("Sandy")
3
| .Build();
4
| 
5
| var flagValue = client.BoolVariation("flag-key-123abc", context, false);
6
| 
7
| if (flagValue) {
8
| // application code to show the feature
9
| }
10
| else {
11
| // the code to run if the feature is off
12
| }
```
Contexts have a context kind of “user” by default. To specify a different kind, use the `Kind` method:
.NET SDK v7.0+ (C#)
```
1
| var context = Context.Builder("context-key-123abc")
---|--- 
2
| .Kind("device")
3
| .Name("Android")
4
| .Build();
```
To learn more, read [Context kinds](/docs/home/flags/context-kinds).
## Transport Layer Security (TLS) and other networking issues
LaunchDarkly is deprecating support for TLS versions 1.0 and 1.1. .NET applications running on older operating systems are prone to use these older, less secure versions of TLS. It is possible to increase your application’s security using AppContext switches.
To learn more, [read Microsoft’s documentation](https://learn.microsoft.com/en-us/dotnet/framework/network-programming/tls#configuring-security-via-appcontext-switches-for-net-framework-46-or-later-versions).
If you cannot update your application platform’s configurations to support TLS version 1.2, you can update your application’s SDK configuration to use new LaunchDarkly endpoints that support TLS versions 1.0 and later. Here is an example:
.NET SDK 6.x and 7.x syntax (C#).NET SDK 6.x and 7.x syntax (C#), federal instance
```
1
| // Use `stream-tls10.launchdarkly.com` and `events-tls10.launchdarkly.com` TLSv1 endpoints
---|--- 
2
| var config = Configuration.Builder("sdk-key-123abc")
3
| .ServiceEndpoints(
4
| Components.ServiceEndpoints()
5
| .Streaming("https://stream-tls10.launchdarkly.com")
6
| .Events("https://events-tls10.launchdarkly.com"))
7
| .Build();
```
##### Potential network connectivity issues caused by DNS caching
LaunchDarkly servers operate in a load-balancing framework which may cause their IP addresses to change. This could result in the SDK failing to connect to LaunchDarkly if an old IP address is still in your system’s DNS cache. In .NET, the DNS cache retains IP addresses for two minutes by default. If you notice intermittent connection failures that always resolve in two minutes, you may want to change this setting to a lower value as described in [Microsoft’s documentation](https://learn.microsoft.com/en-us/dotnet/api/system.NET.servicepointmanager.dnsrefreshtimeout?view=netframework-4.7.2).
## Shut down the client
Shut down the client when your application terminates. To learn more, read [Shutting down](/docs/sdk/features/shutdown#net-server-side).
## Supported features
This SDK supports the following features:
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#net-server-side)
 * [Big segments](/docs/sdk/features/big-segments#net-server-side)
 * [Configuration](/docs/sdk/features/config#net-server-side), including
 * [Application metadata configuration](/docs/sdk/features/app-config#net-server-side)
 * [Migration configuration](/docs/sdk/features/migration-config#net-server-side)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#net-server-side)
 * [Context configuration](/docs/sdk/features/context-config#net-server-side)
 * [Evaluating flags](/docs/sdk/features/evaluating#net-server-side)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#net-server-side)
 * [Flushing events](/docs/sdk/features/flush#net-server-side)
 * [Getting all flags](/docs/sdk/features/all-flags#net-server-side)
 * [Hooks](/docs/sdk/features/hooks#net-server-side)
 * [Identifying and changing contexts](/docs/sdk/features/identify#net-server-side)
 * [Logging configuration](/docs/sdk/features/logging#net-server-side)
 * [Migrations](/docs/sdk/features/migrations#net-server-side)
 * [Monitoring SDK status](/docs/sdk/features/monitoring#net-server-side)
 * [Observability](/docs/sdk/observability/dotnet)
 * [Offline mode](/docs/sdk/features/offline-mode#net-server-side)
 * [OpenTelemetry](/docs/sdk/features/opentelemetry-server-side#net-server-side)
 * [Private attributes](/docs/sdk/features/private-attributes#net-server-side)
 * [Reading flags from a file](/docs/sdk/features/flags-from-files#net-server-side)
 * [Relay Proxy configuration](/docs/sdk/features/relay-proxy-configuration)
 * [Using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode#net-server-side)
 * [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#net-server-side)
 * [Secure mode](/docs/sdk/features/secure-mode#net-server-side)
 * [Sending custom events](/docs/sdk/features/events#net-server-side)
 * [Shutting down](/docs/sdk/features/shutdown#net-server-side)
 * [Storing data](/docs/sdk/features/storing-data#net-server-side)
 * [Subscribing to flag changes](/docs/sdk/features/flag-changes#net-server-side)
 * [Test data sources](/docs/sdk/features/test-data-sources#net-server-side)
 * [Web proxy configuration](/docs/sdk/features/web-proxy#net-server-side)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs