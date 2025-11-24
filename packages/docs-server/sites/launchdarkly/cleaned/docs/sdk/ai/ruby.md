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
 * [Configure the context](#configure-the-context)
 * [Customize an AI Config](#customize-an-ai-config)
 * [Call provider, record metrics from AI model generation](#call-provider-record-metrics-from-ai-model-generation)
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the Ruby AI SDK, and links to reference information on all of the supported features.
The Ruby AI SDK is designed for use with LaunchDarkly’s AI Configs. It is currently in a pre-1.0 release and under active development. You can follow development or contribute on [GitHub](https://github.com/launchdarkly/ruby-server-sdk-ai).
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and sample applications:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/ruby-server-sdk-ai/) 
GitHub repository | [ruby-server-sdk-ai](https://github.com/launchdarkly/ruby-server-sdk-ai) 
Sample application | [Using Bedrock](https://github.com/launchdarkly/ruby-server-sdk-ai/tree/main/examples/chatbot/aws-bedrock), [Using OpenAI](https://github.com/launchdarkly/ruby-server-sdk-ai/tree/main/examples/chatbot/openai) 
Published module | [RubyGems](https://rubygems.org/gems/launchdarkly-server-sdk-ai) 
## Get started
LaunchDarkly AI SDKs interact with [AI Configs](/docs/home/getting-started/vocabulary#ai-config). AI Configs are the LaunchDarkly resources that manage model configurations and messages for your generative AI applications.
##### Try the Quickstart
This reference guide describes working specifically with the Ruby AI SDK. For a complete introduction to LaunchDarkly AI SDKs and how they interact with AI Configs, read [Quickstart for AI Configs](/docs/home/ai-configs/quickstart).
You can use the Ruby AI SDK to customize your AI Config based on the [context](/docs/home/getting-started/vocabulary#context) that you provide. This means both the messages and the model evaluation in your generative AI application are specific to each end user, at runtime. You can also use the AI SDKs to record metrics from your AI model generation, including duration and tokens.
Follow these instructions to start using the Ruby AI SDK in your application.
### Understand version compatibility
The LaunchDarkly Ruby AI SDK is compatible with Ruby 3.0 and higher.
### Install the SDK
First, install the AI SDK as a dependency in your application using your application’s dependency manager. If you want to depend on a specific version, refer to the [SDK releases page](https://github.com/launchdarkly/ruby-server-sdk-ai/releases) to identify the latest version.
Here’s how:
Shell
```
$
| gem install launchdarkly-server-sdk
---|--- 
>
| gem install launchdarkly-server-sdk-ai
```
Next, import the LaunchDarkly `LaunchDarkly::Server::AI::Client` into your application code:
Ruby
```
1
| require 'launchdarkly-server-sdk'
---|--- 
2
| require 'launchdarkly-server-sdk-ai'
```
### Initialize the client
After you install and import the AI SDK, create a single, shared instance of `LaunchDarkly::Server::AI::Client`. Specify your SDK key here to authorize your application to connect to a particular environment within LaunchDarkly.
##### The Ruby AI SDK uses an SDK key
The Ruby AI SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
Here’s how:
Ruby
```
1
| ld_client = LaunchDarkly::LDClient.new("sdk-key-123abc")
---|--- 
2
| ai_client = LaunchDarkly::AI::LDAIClient.new(ld_client)
```
### Configure the context
Next, configure the context that will use the AI Config, that is, the context that will encounter generated AI content in your application. The context attributes determine which variation of the AI Config LaunchDarkly serves to the end user, based on the targeting rules in your AI Config. If you are using template variables in the messages in your AI Config’s variations, the context attributes also fill in values for the template variables.
Here’s how:
Ruby AI SDK
```
1
| context = LaunchDarkly::LDContext.create({
---|--- 
2
| key: "user-key-123abc",
3
| kind: "user",
4
| firstName: "Sandy",
5
| lastName: "Smith",
6
| email: "sandy@example.com",
7
| groups: ["Google", "Microsoft"]
8
| })
```
### Customize an AI Config
Then, use `Config` to customize the AI Config. Customization means that any variables you include in the messages when you define the AI Config variation have their values set to the context attributes and variables you pass to `Config`. You need to call `Config` each time you generate content from your AI model.
The customization process within the AI SDK is similar to [evaluating flags](/docs/sdk/features) in one of LaunchDarkly’s client-side, server-side, or edge SDKs, in that the SDK completes the customization without a separate network call. The `Config` function takes an AI Config key, a context, and a fallback value. It performs the evaluation, then returns the customized messages and model along with a tracker instance for recording metrics. If it cannot perform the evaluation or LaunchDarkly is unreachable, it returns the fallback value. For example, you might use an empty, disabled `AIConfig` as a fallback value, or a fully configured default. Either way, you should make sure to check for this case and handle it appropriately in your application.
After you call `config`, you can pass the customized messages directly to your AI.
Here’s how:
Ruby AI SDK
```
1
| fallback_value = LaunchDarkly::AI::AIConfig.new(enabled: false)
---|--- 
2
| 
3
| ai_config = ai_client.config('ai-config-key-123abc', context, fallback_value, { 'example_custom_variable' => 'example_custom_value' })
```
To learn more, read [Customizing AI Configs](/docs/sdk/features/ai-config#ruby-ai).
### Call provider, record metrics from AI model generation
Finally, use one of the `track_[model]_metrics` functions to make a request to your generative AI provider and record metrics from your AI model generation. The Ruby AI SDK provides specific `track_[model]_metrics` functions using completions from common AI model families. Make sure to check whether the returned `config` is enabled, and handle the disabled case appropriately in your application.
Here’s how:
Using OpenAI modelUsing Bedrock modelBedrock helper function
```
1
| if ai_config.enabled
---|--- 
2
| # Pass in the result of the OpenAI operation.
3
| # When calling the OpenAI operation, use details from ai_config.
4
| # For instance, you can pass ai_config.model.name
5
| # and ai_config.messages to your specific OpenAI operation.
6
| #
7
| # CAUTION: If the call inside of track_openai_metrics throws an exception,
8
| # the SDK will re-throw that exception
9
| 
10
| completion = ai_config.tracker.track_openai_metrics(
11
| openai_client.chat.completions.create(
12
| model: ai_config.model.name,
13
| messages: ai_config.messages.map(&:to_h)
14
| )
15
| )
16
| else
17
| # Application path to take when the ai_config is disabled
18
| end
```
Alternatively, you can use the SDK’s other `track*` functions to record these metrics manually. You may need to do this if you are using a model for which the SDK does not provide a convenience `track_[model]_metrics` function. The `track_[model]_metrics` functions are expecting a response, so you may also need to do this if your application requires streaming.
Make sure to call `config` each time you generate content from your AI model:
Using OpenAI model, next request to providerUsing Bedrock model, next request to provider
```
1
| ai_config = ai_client.config('ai-config-key-123abc', context, fallback_value, { 'example_custom_variable' => 'example_custom_value' })
---|--- 
2
| 
3
| completion = ai_config.tracker.track_openai_metrics(...)
```
To learn more, read [Tracking AI metrics](/docs/sdk/features/ai-metrics#python-ai).
## Supported features
This SDK supports the following features:
 * [Anonymous contexts](/docs/sdk/features/anonymous#ruby-ai)
 * [Context configuration](/docs/sdk/features/context-config#ruby-ai)
 * [Customizing AI Configs](/docs/sdk/features/ai-config#ruby-ai)
 * [Private attributes](/docs/sdk/features/private-attributes#ruby-ai)
 * [Tracking AI metrics](/docs/sdk/features/ai-metrics#ruby-ai)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs