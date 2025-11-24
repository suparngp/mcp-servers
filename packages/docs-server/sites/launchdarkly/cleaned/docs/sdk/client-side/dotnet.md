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
 * [Understand version compatibility](#understand-version-compatibility)
 * [Install the SDK](#install-the-sdk)
 * [Initialize the client](#initialize-the-client)
 * [Evaluate a flag](#evaluate-a-flag)
 * [Using the Relay Proxy](#using-the-relay-proxy)
 * [Shut down the client](#shut-down-the-client)
 * [Data collection](#data-collection)
 * [Supported features](#supported-features)
##### Recent major versions
**Version 5 of the .NET (client-side) SDK introduces support for .NET 7 and MAUI, and drops support for Xamarin**. Version 5.5 introduces support for .NET 8. To learn more about upgrading, read [.NET (client-side) SDK 4.x to 5.0 migration guide](/docs/sdk/client-side/dotnet/migration-4-to-5). **Version 4 of the .NET (client-side) SDK introduces optional automatic collection of environment attributes**. To learn more about upgrading, read [.NET (client-side) SDK 3.x to 4.0 migration guide](/docs/sdk/client-side/dotnet/migration-3-to-4).
## Overview
This topic documents how to get started with the client-side .NET SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and sample applications:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/dotnet-client-sdk/) 
GitHub repository | [.NET (client-side) SDK](https://github.com/launchdarkly/dotnet-core/tree/main/pkgs/sdk/client) 
Sample applications | [.NET (client-side)](https://github.com/launchdarkly/hello-dotnet-client) 
Published module | [NuGet](https://www.nuget.org/packages/LaunchDarkly.ClientSdk/) 
##### For use in mobile, desktop, and embedded client applications only
This SDK is intended for use in single-user mobile, desktop, and embedded applications. If you have a .NET application and want to set up LaunchDarkly on the server-side, read the [server-side .NET SDK reference](/docs/sdk/server-side/dotnet).
To learn more about LaunchDarkly’s different SDK types, read [Choosing an SDK type](/docs/sdk/concepts/client-side-server-side).
## Get started
After you complete the [Get started](/docs/home/getting-started) process, follow these instructions to start using the LaunchDarkly SDK in your application:
 * [Understand version compatibility](/docs/sdk/client-side/dotnet#understand-version-compatibility)
 * [Install the SDK](/docs/sdk/client-side/dotnet#install-the-sdk)
 * [Initialize the client](/docs/sdk/client-side/dotnet#initialize-the-client)
 * [Evaluate a flag](/docs/sdk/client-side/dotnet#evaluate-a-flag)
### Understand version compatibility
Starting with version 5, the .NET (client-side) SDK supports Microsoft’s .NET 7 and MAUI. Starting with version 5.5, the SDK supports Microsoft’s .NET 8.
The LaunchDarkly .NET (client-side) SDK is compatible with Android version 5.0 and higher and with iOS version 11.0 and higher. It is also compatible with any other platform that supports .NET Standard version 2.0 or higher, although the .NET Standard version lacks some mobile-specific features such as detecting network connectivity.
If you use Xamarin, you cannot use version 5 of the LaunchDarkly .NET (client-side) SDK. You must migrate to MAUI to continue using the LaunchDarkly SDK. To learn more about migrating, read Microsoft’s documentation on how to [Upgrade from Xamarin to .NET](https://learn.microsoft.com/en-us/dotnet/maui/migration/?view=net-maui-8.0).
### Install the SDK
To start using the client-side .NET SDK:
C#
```
1
| Install-Package LaunchDarkly.ClientSdk
---|--- 
```
Next, import the LaunchDarkly packages in your application code:
C#
```
1
| using LaunchDarkly.Sdk;
---|--- 
2
| using LaunchDarkly.Sdk.Client;
3
| 
4
| // LaunchDarkly.Sdk defines general types like Context, which are also used in the server-side .NET SDK.
5
| // LaunchDarkly.Sdk.Client defines the LdClient and Configuration types for the client-side .NET SDK.
```
### Initialize the client
After you install the dependency, initialize the LaunchDarkly client by creating a single, shared instance of `LdClient`. To create a client instance, you need your environment’s mobile key and the context for which you want to evaluate flags. This authorizes your application to connect to a particular environment within LaunchDarkly.
##### .NET (client-side) SDK credentials
The .NET (client-side) SDK uses a mobile key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
Mobile keys are not secret and you can expose them in your client-side code without risk. However, never embed a server-side SDK key into a client-side application.
We recommend calling the client initialization method with a timeout of 0-5 seconds. This means your application blocks for a short period of time, until the SDK retrieves the latest feature flags from LaunchDarkly. We recommend that you do not set the timeout parameter for more than five seconds.
Here’s how:
.NET SDK v4.0+ (C#).NET SDK v3.0 (C#)
```
1
| // You'll need this context later, but you can ignore it for now.
---|--- 
2
| var context = Context.New("context-key-123abc");
3
| var timeSpan = TimeSpan.FromSeconds(5);
4
| client = LdClient.Init("mobile-key-123abc", ConfigurationBuilder.AutoEnvAttributes.Enabled, context, timeSpan);
```
You can also initialize the SDK asynchronously. As with the `Init` method, we recommend that you do not set the timeout parameter for more than five seconds.
Older versions of the SDK allow you to initialize the SDK asynchronously without a timeout option. We do not recommend this because initializing without a timeout option will cause your app never to load if there is a connectivity problem.
To initialize asynchronously:
.NET SDK v5.2+ (C#).NET SDK v4.x, v5.0, v5.1 (C#).NET SDK v3.x (C#)
```
1
| // You'll need this context later, but you can ignore it for now.
---|--- 
2
| Context context = Context.New("context-key-123abc");
3
| var timeSpan = TimeSpan.FromSeconds(5);
4
| client = await LdClient.InitAsync("mobile-key-123abc", ConfigurationBuilder.AutoEnvAttributes.Enabled, context, timeSpan);
```
For a complete list of the specific `LdClient` configuration options available in this SDK, read [`Configuration`](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.Client.Configuration.html).
##### LdClient must be a singleton
It’s important to make `LdClient` a singleton for each LaunchDarkly project. The client instance maintains internal state that allows LaunchDarkly to serve feature flags without making any remote requests. Do not instantiate a new client with every request.
If you have multiple LaunchDarkly projects, you can create one `LDClient` for each. In this situation, the clients operate independently. For example, they do not share a single connection to LaunchDarkly.
##### Android requires AccessNetworkState permission
Android requires the `AccessNetworkState` permission and you must configure it in the Android project. To learn more about how to implement this requirement, read Microsoft’s [MAUI Connectivity documentation](https://learn.microsoft.com/en-us/dotnet/maui/platform-integration/communication/networking?view=net-maui-8.0&tabs=android).
### Evaluate a flag
After you create the `client`, you can use it to check which variation a particular context will receive for a given feature flag.
Here’s how:
C#
```
1
| bool showFeature = client.BoolVariation("flag-key-123abc", false);
---|--- 
2
| if (showFeature) {
3
| // Application code to show the feature
4
| }
5
| else {
6
| // The code to run if the feature is off
7
| }
```
##### Making feature flags available to this SDK
You must make feature flags available to mobile SDKs before the SDK can evaluate those flags. If an SDK tries to evaluate a feature flag that is not available, the context will receive the fallback value for that flag.
To make a flag available to this SDK, check the **SDKs using Mobile key** checkbox during flag creation, or toggle on the option in the flag’s right sidebar. To make all of a project’s flags available to this SDK by default, check the **SDKs using Mobile key** checkbox on your project’s [Flag settings page](/docs/home/account/edit-project).
## Using the Relay Proxy
You can configure the client-side .NET SDK to connect to the [Relay Proxy](https://github.com/launchdarkly/ld-relay) as follows:
C#
```
1
| var config = Configuration
---|--- 
2
| .Builder("mobile-key-123abc", AutoEnvAttributes.Enabled)
3
| .ServiceEndpoints(
4
| Components.ServiceEndpoints().RelayProxy("YOUR_RELAY_URI")
5
| )
6
| .Build();
7
| LdClient client = LdClient.Init(config);
```
## Shut down the client
Shut down the client when your application terminates. To learn more, read [Shutting down](/docs/sdk/features/shutdown#net-client-side).
## Data collection
To learn more about data collection within this SDK and implications on submissions to the Apple App Store, read the [Apple App Store data collection policy](/docs/sdk/concepts/apple-app-store).
## Supported features
This SDK supports the following features:
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#net-client-side)
 * [Automatic environment attributes](/docs/sdk/features/environment-attributes#net-client-side)
 * [Configuration](/docs/sdk/features/config#net-client-side), including
 * [Application metadata configuration](/docs/sdk/features/config#net-client-side)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#net-client-side)
 * [Context configuration](/docs/sdk/features/context-config#net-client-side)
 * [Evaluating flags](/docs/sdk/features/evaluating#net-client-side)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#net-client-side)
 * [Flushing events](/docs/sdk/features/flush#net-client-side)
 * [Getting all flags](/docs/sdk/features/all-flags#net-client-side)
 * [Identifying and changing contexts](/docs/sdk/features/identify#net-client-side)
 * [Logging configuration](/docs/sdk/features/logging#net-client-side)
 * [Monitoring SDK status](/docs/sdk/features/monitoring#net-client-side)
 * [Offline mode](/docs/sdk/features/offline-mode#net-client-side)
 * [Private attributes](/docs/sdk/features/private-attributes#net-client-side)
 * [Relay Proxy configuration, using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode#net-client-side)
 * [Sending custom events](/docs/sdk/features/events#net-client-side)
 * [Shutting down](/docs/sdk/features/shutdown#net-client-side)
 * [Subscribing to flag changes](/docs/sdk/features/flag-changes#net-client-side)
 * [Test data sources](/docs/sdk/features/test-data-sources#net-client-side)
 * [Web proxy configuration](/docs/sdk/features/web-proxy#net-client-side)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs