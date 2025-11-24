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
This topic documents how to get started with the Go AI SDK, and links to reference information on all of the supported features.
The Go AI SDK is designed for use with LaunchDarkly’s AI Configs. It is currently in a pre-1.0 release and under active development. You can follow development or contribute on [GitHub](https://github.com/launchdarkly/go-server-sdk/tree/v7/ldai).
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and sample applications:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/ldai) 
GitHub repository | [ldai](https://github.com/launchdarkly/go-server-sdk/tree/v7/ldai/) 
Sample application | 
Published module | [pkg.go.dev](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/ldai) 
## Get started
LaunchDarkly AI SDKs interact with [AI Configs](/docs/home/getting-started/vocabulary#ai-config). AI Configs are the LaunchDarkly resources that manage model configurations and messages for your generative AI applications.
##### Try the Quickstart
This reference guide describes working specifically with the Go AI SDK. For a complete introduction to LaunchDarkly AI SDKs and how they interact with AI Configs, read [Quickstart for AI Configs](/docs/home/ai-configs/quickstart).
You can use the Go AI SDK to customize your AI Config based on the [context](/docs/home/getting-started/vocabulary#context) that you provide. This means both the messages and the model evaluation in your generative AI application are specific to each end user, at runtime. You can also use the AI SDKs to record metrics from your AI model generation, including duration and tokens.
Follow these instructions to start using the Go AI SDK in your application.
### Install the SDK
First, install the AI SDK as a dependency in your application. How you do this depends on what dependency management system you are using:
 * If you are using the standard [Go modules](https://github.com/golang/go/wiki/Modules) system, import the SDK packages in your code and `go build` will automatically download them. The SDK and its dependencies are modules.
 * Otherwise, use the `go get` command and specify the SDK version, such as `go get github.com/launchdarkly/go-server-sdk/ldai`.
The Go AI SDK is built on the [Go SDK](/docs/sdk/server-side/go), so you’ll need to install that as well.
Here’s how:
Go AI SDK
```
1
| import (
---|--- 
2
| ld "github.com/launchdarkly/go-server-sdk/v7"
3
| "github.com/launchdarkly/go-server-sdk/ldai"
4
| )
```
### Initialize the client
After you install and import the SDK, create a single, shared instance of `LDClient`. Then, use it to initialize the `LDAIClient`. The `LDAIClient` is how you interact with AI Configs. Specify the SDK key to authorize your application to connect to a particular environment within LaunchDarkly.
##### The Go SDK uses an SDK key
The Go SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
Here’s how:
Go AI SDK
```
1
| client, _ = ld.MakeClient("sdk-key-123abc", 5*time.Second)
---|--- 
2
| 
3
| aiClient, err := ldai.NewClient(client)
4
| 
5
| if err != nil {
6
| // Client couldn't be created
7
| }
```
This example assumes you’ve imported the LaunchDarkly SDK package as `ld`, as shown above.
##### Best practices for error handling
The second return type in these code samples ( `_` ) represents an error in case the LaunchDarkly client does not initialize. Consider naming the return value and using it with proper error handling.
### Configure the context
Next, configure the context that will use the AI Config, that is, the context that will encounter generated AI content in your application. The context attributes determine which variation of the AI Config LaunchDarkly serves to the end user, based on the targeting rules in your AI Config. If you are using template variables in the messages in your AI Config’s variations, the context attributes also fill in values for the template variables.
Here’s how:
Go AI SDK
```
1
| context := ldcontext.NewBuilder("context-key-123abc").
---|--- 
2
| Kind("user").
3
| Name("Sandy Smith").
4
| SetString("email", "sandy@example.com").
5
| SetValue("groups", ldvalue.ArrayOf(
6
| ldvalue.String("Google"), ldvalue.String("Microsoft"))).
7
| Build()
```
### Customize an AI Config
Then, use `Config()` to customize the AI Config. Customization means that any variables you include in the messages when you define the AI Config variation have their values set to the context attributes and variables you pass to the `Config()` method.
The customization process within the AI SDK is similar to [evaluating flags](/docs/sdk/features) in one of LaunchDarkly’s client-side, server-side, or edge SDKs, in that the SDK completes the customization without a separate network call. The `Config()` function takes an AI Config key, a context, and a fallback value. It performs the evaluation, then returns a `Config` object with the customized messages and model, and a `Tracker` object to capture performance metrics. If it cannot perform the evaluation or LaunchDarkly is unreachable, it returns the fallback value. For example, you might use an empty, disabled `Config` as a fallback value, or a fully configured default. Either way, you should make sure to check for this case and handle it appropriately in your application.
After you call `Config()`, you can pass the customized messages directly to your AI.
Here’s how:
Go AI SDK
```
1
| fallbackValue := NewConfig().Build() // by default, the Config is disabled
---|--- 
2
| 
3
| cfg, tracker := aiClient.Config("ai-config-key-123abc", context, fallbackValue, map[string]interface{}{"exampleCustomVariable": "exampleCustomValue"})
```
To learn more, read [Customizing AI Configs](/docs/sdk/features/ai-config#go-ai).
### Call provider, record metrics from AI model generation
Finally, use the `TrackRequest` function to make a request to your generative AI provider and record metrics from your AI model generation. Make sure to check whether the returned `cfg` is enabled, and handle the disabled case appropriately in your application.
Here’s how:
Go AI SDK, any model
```
1
| if cfg.Enabled() {
---|--- 
2
| 
3
| response, err := tracker.TrackRequest(func(config *Config) (ProviderResponse, error) {
4
| 
5
| // Make request to a provider, which automatically tracks metrics in LaunchDarkly.
6
| // When sending the request to a provider, use details from config.
7
| // For instance, you can pass a model parameter (config.ModelParam) or messages (config.Messages).
8
| // Optionally, return response metadata, for example to do your own additional logging.
9
| 
10
| return ProviderResponse{
11
| Usage: TokenUsage{
12
| Total: 1, // Token usage data
13
| },
14
| Metrics: Metrics{
15
| Latency: 10 * time.Millisecond // Metrics data
16
| },
17
| }, nil
18
| })
19
| 
20
| } else {
21
| 
22
| // Application path to take when the cfg.config is disabled
23
| 
24
| }
```
Alternatively, you can use the SDK’s other `Track*` functions to record these metrics manually. The `TrackMetric` function is expecting a response, so you may need to do this if your application requires streaming.
To learn more, read [Tracking AI metrics](/docs/sdk/features/ai-metrics#go-ai).
## Supported features
This SDK supports the following features:
 * [Anonymous contexts](/docs/sdk/features/anonymous#go-ai)
 * [Context configuration](/docs/sdk/features/context-config#go-ai)
 * [Customizing AI Configs](/docs/sdk/features/ai-config#go-ai)
 * [Private attributes](/docs/sdk/features/private-attributes#go-ai)
 * [Tracking AI metrics](/docs/sdk/features/ai-metrics#go-ai)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs