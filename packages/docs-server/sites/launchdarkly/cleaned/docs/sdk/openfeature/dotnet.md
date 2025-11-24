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
 * [Version compatibility](#version-compatibility)
 * [Install the provider](#install-the-provider)
 * [Initialize the provider](#initialize-the-provider)
 * [Construct a context](#construct-a-context)
 * [Evaluate a context](#evaluate-a-context)
 * [Access the LaunchDarkly client](#access-the-launchdarkly-client)
## Overview
This topic documents how to get started with the LaunchDarkly OpenFeature provider for the .NET (server-side) SDK.
##### Provider quick links
LaunchDarkly’s OpenFeature providers are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
OpenFeature Provider API documentation | [Provider API docs](https://launchdarkly.github.io/openfeature-dotnet-server/) 
GitHub repository | [openfeature-dotnet-server](https://github.com/launchdarkly/openfeature-dotnet-server) 
Sample application | [Sample OpenFeature .NET provider application](https://github.com/launchdarkly/hello-openfeature-dotnet-server) 
Published module | [NuGet](https://www.nuget.org/packages/LaunchDarkly.OpenFeature.ServerProvider) 
## Get started
The LaunchDarkly OpenFeature provider for the .NET (server-side) SDK is intended for use in multi-user systems such as web servers and application. It is not intended for use in desktop and embedded systems applications.
Follow these instructions to start using the LaunchDarkly OpenFeature provider for the .NET (server-side) SDK in your application.
### Version compatibility
The LaunchDarkly OpenFeature provider for the .NET (server-side) SDK is compatible with the [OpenFeature .NET SDK v2.0](https://openfeature.dev/docs/reference/technologies/server/dotnet).
The provider is compatible with .NET 6.0+, .NET Framework 4.7.1+, and .NET Standard 2.0+.
## Install the provider
First, add the LaunchDarkly and OpenFeature packages:
Shell
```
$
| dotnet add package LaunchDarkly.ServerSdk
---|--- 
>
| dotnet add package LaunchDarkly.OpenFeature.ServerProvider
>
| dotnet add package OpenFeature
```
Next, import the OpenFeature and LaunchDarkly namespaces in your application code:
LaunchDarkly .NET (server-side) provider
```
1
| using LaunchDarkly.OpenFeature.ServerProvider;
---|--- 
2
| using LaunchDarkly.Sdk.Server;
```
## Initialize the provider
After you install and import the provider, create a single, shared instance of [`Provider`](https://launchdarkly.github.io/openfeature-dotnet-server/api/LaunchDarkly.OpenFeature.ServerProvider.Provider.html#LaunchDarkly_OpenFeature_ServerProvider_Provider__ctor_LaunchDarkly_Sdk_Server_Configuration_). Specify your SDK key here to authorize your application to connect to a particular environment within LaunchDarkly.
Here’s how:
C#
```
1
| var config = Configuration.Builder("sdk-key-123abc")
---|--- 
2
| .StartWaitTime(TimeSpan.FromSeconds(10))
3
| .Build();
4
| 
5
| var provider = new Provider(config);
6
| 
7
| await OpenFeature.Api.Instance.SetProviderAsync(provider);
8
| 
9
| var client = OpenFeature.Api.Instance.GetClient();
```
The configuration options are from the LaunchDarkly .NET (server-side) SDK. To learn more about the configuration options available, read [Configuration](/docs/sdk/features/config#net-server-side).
##### The .NET provider uses an SDK key
The LaunchDarkly .NET (server-side) provider uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
## Construct a context
A [context](/docs/home/getting-started/vocabulary#context) is a generalized way of referring to the people, services, machines, or other resources that encounter feature flags in your product. The OpenFeature specification calls these [evaluation contexts](https://openfeature.dev/docs/reference/concepts/evaluation-context).
In the LaunchDarkly provider, contexts:
 * always have a particular [context kind](/docs/home/getting-started/vocabulary#context-kind). If you do not specify a kind, the provider treats the context as having a “user” kind. To specify a different kind, including a multi-context, you must include a `kind` attribute.
 * must have a targeting key. This is optional in the OpenFeature specification, but LaunchDarkly requires a key for evaluation. You can specify this using `targetingKey`, as in the OpenFeature specification, or `key`, which is the typical LaunchDarkly identifier for the targeting key.
Here are examples of a context:
Example user contextExample organization context
```
1
| var context = EvaluationContext.Builder()
---|--- 
2
| .Set("targetingKey", "user-key-123abc") // Could also use "key" instead of "targetingKey".
3
| .Build();
```
For additional examples, read [OpenFeature specific considerations](https://github.com/launchdarkly/openfeature-dotnet-server?tab=readme-ov-file#openfeature-specific-considerations) in the provider GitHub repository.
## Evaluate a context
To evaluate feature flags for a context, use the OpenFeature [Evaluation API](https://openfeature.dev/docs/reference/concepts/evaluation-api). For example:
Evaluate a context
```
1
| var flagValue = await client.GetBooleanValue("flag-key-123abc", false, context);
---|--- 
```
## Access the LaunchDarkly client
You may need access to the `LdClient` from within the [LaunchDarkly .NET (server-side) SDK](/docs/sdk/server-side/dotnet) if you are working on use cases not supported by OpenFeature, such as [migration flags](/docs/sdk/features/migrations) or [sending custom events](/docs/sdk/features/events).
To access the `LdClient`, use `GetClient()`:
C#
```
1
| var ldClient = provider.GetClient()
---|--- 
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs