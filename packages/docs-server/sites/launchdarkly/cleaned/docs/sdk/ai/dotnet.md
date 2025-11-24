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
 * [Configure the context](#configure-the-context)
 * [Customize an AI Config](#customize-an-ai-config)
 * [Call provider, record metrics from AI model generation](#call-provider-record-metrics-from-ai-model-generation)
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the .NET AI SDK, and links to reference information on all of the supported features.
The .NET AI SDK is designed for use with LaunchDarkly’s AI Configs. It is currently in a pre-1.0 release and under active development. You can follow development or contribute on [GitHub](https://github.com/launchdarkly/dotnet-core/tree/main/pkgs/sdk/server-ai).
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and sample applications:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/dotnet-core/pkgs/sdk/server-ai) 
GitHub repository | [server-ai](https://github.com/launchdarkly/dotnet-core/tree/main/pkgs/sdk/server-ai/) 
Sample application | 
Published module | [NuGet](https://www.nuget.org/packages/LaunchDarkly.ServerSdk.Ai/) 
##### For use in server-side applications only
This SDK is intended for use in multi-user .NET server applications. To learn more about LaunchDarkly’s different SDK types, read [Choosing an SDK type](/docs/sdk/concepts/client-side-server-side).
## Get started
LaunchDarkly AI SDKs interact with [AI Configs](/docs/home/getting-started/vocabulary#ai-config). AI Configs are the LaunchDarkly resources that manage model configurations and messages for your generative AI applications.
##### Try the Quickstart
This reference guide describes working specifically with the .NET AI SDK. For a complete introduction to LaunchDarkly AI SDKs and how they interact with AI Configs, read [Quickstart for AI Configs](/docs/home/ai-configs/quickstart).
You can use the .NET AI SDK to customize your AI Config based on the [context](/docs/home/getting-started/vocabulary#context) that you provide. This means both the messages and the model evaluation in your generative AI application are specific to each end user, at runtime. You can also use the AI SDKs to record metrics from your AI model generation, including duration and tokens.
Follow these instructions to start using the .NET AI SDK in your application.
### Install the SDK
First, install the AI SDK as a dependency in your application using your application’s dependency manager. If you want to depend on a specific version, refer to the [SDK releases page](https://github.com/launchdarkly/dotnet-core/releases?q=ai) to identify the latest version.
The .NET AI SDK is built on the [.NET (server-side) SDK](/docs/sdk/server-side/dotnet), so you’ll need to install that as well. The .NET AI SDK requires version 8 or higher of the .NET (server-side) SDK.
Here’s how:
Shell
```
$
| Install-Package LaunchDarkly.ServerSdk
---|--- 
>
| Install-Package LaunchDarkly.ServerSdk.Ai
```
Next, import the namespaces in your application code. The namespace is not the same as the package name:
.NET AI SDK
```
1
| using LaunchDarkly.Sdk.Server.Ai;
---|--- 
2
| using LaunchDarkly.Sdk.Server.Ai.Adapters;
3
| using LaunchDarkly.Sdk.Server.Ai.Config;
```
### Initialize the client
After you install and import the SDK, create a single, shared instance of `LdClient`. When the `LdClient` is initialized, use it to initialize the `LdAiClient`. The `LdAiClient` is how you interact with AI Configs. Specify the SDK key to authorize your application to connect to a particular environment within LaunchDarkly.
##### The .NET SDKs use an SDK key
The .NET AI and server-side SDKs use an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
Here’s how:
.NET AI SDK
```
1
| var baseClient = new LdClient(Configuration.Builder("sdk-key-123").StartWaitTime(TimeSpan.FromSeconds(5)).Build());
---|--- 
2
| var aiClient = new LdAiClient(new LdClientAdapter(baseClient));
```
### Configure the context
Next, configure the context that will use the AI Config, that is, the context that will encounter generated AI content in your application. The context attributes determine which variation of the AI Config LaunchDarkly serves to the end user, based on the targeting rules in your AI Config. If you are using template variables in the messages in your AI Config’s variations, the context attributes also fill in values for the template variables.
Here’s how:
.NET AI SDK
```
1
| LDContext context = Context.Builder("context-key-123abc")
---|--- 
2
| .Set("firstName", "Sandy")
3
| .Set("lastName", "Smith")
4
| .Set("email", "sandy@example.com")
5
| .Set("groups", LdValue.ArrayOf(LdValue.Of("Google"), LdValue.Of("Microsoft")))
6
| .Build();
```
### Customize an AI Config
Then, use `Config` to customize the AI Config. Customization means that any variables you include in the messages when you define the AI Config variation have their values set to the context attributes and variables you pass to `Config`. You need to call `Config` each time you generate content from your AI model.
The customization process within the AI SDK is similar to [evaluating flags](/docs/sdk/features) in one of LaunchDarkly’s client-side, server-side, or edge SDKs, in that the SDK completes the customization without a separate network call. The `Config` function takes an AI Config key, a context, and a fallback value. It performs the evaluation, then returns the customized messages and model along with a tracker for recording metrics. If it cannot perform the evaluation or LaunchDarkly is unreachable, it returns the fallback value. For example, you might use an empty, disabled `LdAiConfig` as a fallback value, or a fully configured default. Either way, you should make sure to check for this case and handle it appropriately in your application.
After you call `Config`, you can pass the customized messages directly to your AI.
Here’s how:
.NET AI SDK
```
1
| var fallbackConfig = LdAiConfig.New()
---|--- 
2
| .SetEnabled(false)
3
| .Build()
4
| 
5
| var tracker = aiClient.Config(
6
| "ai-config-key-123abc",
7
| context,
8
| fallbackConfig,
9
| new Dictionary<string, object> {
10
| { "exampleCustomVariable", "exampleCustomValue" }
11
| }
12
| );
```
To learn more, read [Customizing AI Configs](/docs/sdk/features/ai-config#net-ai).
### Call provider, record metrics from AI model generation
Finally, use the `TrackRequest` function to make a request to your generative AI provider and record metrics from your AI model generation. Make sure to check whether the returned `LdAiConfig` is enabled, and handle the disabled case appropriately in your application.
Here’s how:
.NET AI SDK, any model
```
1
| if (tracker.Config.Enabled == true) {
---|--- 
2
| 
3
| var response = tracker.TrackRequest(Task.Run(() =>
4
| {
5
| // Make request to a provider, which automatically tracks metrics in LaunchDarkly.
6
| // When sending the request to a provider, use details from tracker.Config.
7
| // For instance, you can pass tracker.Config.Model and tracker.Config.Messages.
8
| // Optionally, return response metadata, for example to do your own additional logging.
9
| //
10
| // CAUTION: If the call inside of Task.Run() throws an exception,
11
| // the SDK will re-throw that exception
12
| 
13
| return new Response
14
| {
15
| Usage = new Usage { Total = 1, Input = 1, Output = 1 }, /* Token usage data */
16
| Metrics = new Metrics { LatencyMs = 100 } /* Metrics data */
17
| };
18
| }
19
| ));
20
| 
21
| } else {
22
| 
23
| // Application path to take when the tracker.Config is disabled
24
| 
25
| }
```
If you would like to do any additional tracking, besides what LaunchDarkly provides, it is your responsibility to fill in the `Response` object with the data you want to track.
Make sure to call `Config` each time you generate content from your AI model:
.NET AI SDK, next request to provider
```
1
| var tracker = aiClient.Config(
---|--- 
2
| "ai-config-key-123abc",
3
| context,
4
| fallbackConfig,
5
| new Dictionary<string, object> {
6
| { "exampleCustomVariable", "exampleCustomValue" }
7
| }
8
| );
9
| 
10
| var response = tracker.TrackRequest(...)
```
To learn more, read [Tracking AI metrics](/docs/sdk/features/ai-metrics#net-ai).
## Supported features
This SDK supports the following features:
 * [Anonymous contexts](/docs/sdk/features/anonymous#net-ai)
 * [Context configuration](/docs/sdk/features/context-config#net-ai)
 * [Customizing AI Configs](/docs/sdk/features/ai-config#net-ai)
 * [Private attributes](/docs/sdk/features/private-attributes#net-ai)
 * [Tracking AI metrics](/docs/sdk/features/ai-metrics#net-ai)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs