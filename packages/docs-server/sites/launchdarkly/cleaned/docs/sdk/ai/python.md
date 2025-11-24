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
 * [Customize AI Configs in completion mode](#customize-ai-configs-in-completion-mode)
 * [Customize AI Configs in agent mode](#customize-ai-configs-in-agent-mode)
 * [Call provider, record metrics from AI model generation](#call-provider-record-metrics-from-ai-model-generation)
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the Python AI SDK, and links to reference information on all of the supported features.
The Python AI SDK is designed for use with LaunchDarkly’s AI Configs. It is currently in a pre-1.0 release and under active development. You can follow development or contribute on [GitHub](https://github.com/launchdarkly/python-server-sdk-ai).
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and sample applications:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly-python-sdk-ai.readthedocs.io/) 
GitHub repository | [python-server-sdk-ai](https://github.com/launchdarkly/python-server-sdk-ai) 
Sample application | [Using Bedrock](https://github.com/launchdarkly/hello-python-ai/blob/main/examples/bedrock_example.py), [Using OpenAI](https://github.com/launchdarkly/hello-python-ai/blob/main/examples/openai_example.py) 
Published module | [PyPI](https://pypi.org/project/launchdarkly-server-sdk-ai/) 
## Get started
LaunchDarkly AI SDKs interact with [AI Configs](/docs/home/getting-started/vocabulary#ai-config). AI Configs are the LaunchDarkly resources that manage model configurations and messages for your generative AI applications.
##### Try the Quickstart
This reference guide describes working specifically with the Python AI SDK. For a complete introduction to LaunchDarkly AI SDKs and how they interact with AI Configs, read [Quickstart for AI Configs](/docs/home/ai-configs/quickstart).
You can use the Python AI SDK to customize your AI Config based on the [context](/docs/home/getting-started/vocabulary#context) that you provide. This means both the messages and the model evaluation in your generative AI application are specific to each end user, at runtime. You can also use the AI SDKs to record metrics from your AI model generation, including duration and tokens.
Follow these instructions to start using the Python AI SDK in your Python application.
### Understand version compatibility
The LaunchDarkly Python AI SDK is compatible with Python 3.8.0 and higher.
### Install the SDK
First, install the AI SDK as a dependency in your application using your application’s dependency manager. If you want to depend on a specific version, refer to the [SDK releases page](https://github.com/launchdarkly/python-server-sdk-ai/releases) to identify the latest version.
Here’s how:
Shell
```
$
| pip install launchdarkly-server-sdk
---|--- 
>
| pip install launchdarkly-server-sdk-ai
```
Next, import the LaunchDarkly `LDAIClient` into your application code:
Python
```
1
| import ldclient
---|--- 
2
| from ldclient import Context
3
| from ldclient.config import Config
4
| from ldai.client import LDAIClient, AIConfig, ModelConfig, LDMessage, ProviderConfig
```
### Initialize the client
After you install and import the AI SDK, create a single, shared instance of `LDAIClient`. Specify your SDK key here to authorize your application to connect to a particular environment within LaunchDarkly.
##### The Python AI SDK uses an SDK key
The Python AI SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
Here’s how:
Python
```
1
| ldclient.set_config(Config("sdk-key-123abc"))
---|--- 
2
| aiclient = LDAIClient(ldclient.get())
```
### Configure the context
Next, configure the context that will use the AI Config, that is, the context that will encounter generated AI content in your application. The context attributes determine which variation of the AI Config LaunchDarkly serves to the end user, based on the targeting rules in your AI Config. If you are using template variables in the messages in your AI Config’s variations, the context attributes also fill in values for the template variables.
Here’s how:
Python AI SDK
```
1
| context = Context.builder("context-key-123abc") \
---|--- 
2
| .set("firstName", "Sandy") \
3
| .set("lastName", "Smith") \
4
| .set("email", "sandy@example.com") \
5
| .set("groups", ["Google", "Microsoft"]) \
6
| .build()
```
### Customize an AI Config
The next step is to customize your AI Config. Customization means that any variables you include in the messages or instructions when you define the AI Config variation have their values set to the context attributes and variables you pass in.
The details of customizing an AI Config depend on whether you are using AI Configs in a `completion` mode or an `agent` mode. You set the `mode` for a particular AI Config when you [create it](/docs/home/ai-configs/create) in the LaunchDarkly UI.
#### Customize AI Configs in completion mode
`completion` mode means that each variation in your AI Config includes a single set of roles and messages that you use to prompt your generative AI model.
In `completion` mode, use `config()` to customize the AI Config. The `config()` function takes an AI Config key, a context, and a fallback value. It performs the evaluation, then returns the customized messages and model along with a tracker instance for recording metrics. If it cannot perform the evaluation or LaunchDarkly is unreachable, it returns the fallback value. For example, you might use an empty, disabled `AIConfig` as a fallback value, or a fully configured default. Either way, you should make sure to check for this case and handle it appropriately in your application.
Here’s how:
Customize an AI Config in completion mode
```
1
| fallback_value = AIConfig(enabled=False)
---|--- 
2
| 
3
| config, tracker = aiclient.config('ai-config-key-123abc', context, fallback_value, { 'example_custom_variable': 'example_custom_value'})
```
#### Customize AI Configs in agent mode
`agent` mode means that each variation in your AI Config includes a set of instructions, which enable multi-step workflows.
In `agent` mode, use `agent()` or `agents()` to customize the AI Config. The `agent()` function customizes a single AI Config agent, while the `agents()` function customizes a list of them.
Both functions take an `LDAIAgentConfig` parameter, which requires an AI Config key and a fallback value, as well as a context. They perform the evaluation, then return the customized instructions for each AI Config along with a tracker instance for recording metrics. If the function cannot perform the evaluation or LaunchDarkly is unreachable, it returns the fallback value. For example, you might use an empty, disabled `LDAIAgentConfig` as a fallback value, or a fully configured default. Either way, you should make sure to check for this case and handle it appropriately in your application.
Here’s how:
Customize an AI Config in agent mode
```
1
| agent_config = LDAIAgentConfig(
---|--- 
2
| key='ai-config-key-123abc',
3
| default_value=LDAIAgentDefaults(
4
| enabled=False
5
| ),
6
| variables={ 'example_custom_variable': 'example_custom_value'}
7
| )
8
| 
9
| agent = aiclient.agent(agent_config, context)
```
To learn more, read [Customizing AI Configs](/docs/sdk/features/ai-config#python-ai).
### Call provider, record metrics from AI model generation
Finally, make a request to your generative AI provider and record metrics from your AI model generation.
If your AI Config uses `completion` mode, use one of the `track_[model]_metrics` functions to make a request to your generative AI provider and record metrics from your AI model generation. The Python AI SDK provides specific `track_[model]_metrics` functions using completions from common AI model families. Make sure to check whether the returned `config` is enabled, and handle the disabled case appropriately in your application.
If your AI Config uses `agent` mode, you can access the `instructions` returned from the customized AI Config to send to your AI model. Use the `tracker` returned as part of the `agent()` or `agents()` functions to record metrics.
Here’s how:
Using OpenAI model, completion modeUsing Bedrock model, completion modeAccessing instructions and recording metrics, agent mode
```
1
| if config.enabled:
---|--- 
2
| # Pass in the result of the OpenAI operation.
3
| # When calling the OpenAI operation, use details from config.
4
| # For instance, you can pass config.model.name
5
| # and config.messages[0].content to your specific OpenAI operation.
6
| #
7
| # CAUTION: If the call inside of track_openai_metrics throws an exception,
8
| # the SDK will re-throw that exception
9
| 
10
| messages = [] if config.messages is None else config.messages
11
| completion = tracker.track_openai_metrics(
12
| lambda:
13
| openai_client.chat.completions.create(
14
| model=config.model.name,
15
| messages=[message.to_dict() for message in messages],
16
| )
17
| )
18
| else:
19
| # Application path to take when the config is disabled
```
Alternatively, you can use the SDK’s other `track*` functions to record these metrics manually. You may need to do this if you are using a model for which the SDK does not provide a convenience `track_[model]_metrics` function. The `track_[model]_metrics` functions are expecting a response, so you may also need to do this if your application requires streaming.
In `completion` mode, make sure to call `config()` each time you generate content from your AI model:
Using OpenAI model, next request to providerUsing Bedrock model, next request to provider
```
1
| config, tracker = aiclient.config('ai-config-key-123abc', context, fallback_value, { 'example_custom_variable': 'example_custom_value'})
---|--- 
2
| 
3
| completion = tracker.track_openai_metrics(...)
```
To learn more, read [Tracking AI metrics](/docs/sdk/features/ai-metrics#python-ai).
## Supported features
This SDK supports the following features:
 * [Anonymous contexts](/docs/sdk/features/anonymous#python-ai)
 * [Context configuration](/docs/sdk/features/context-config#python-ai)
 * [Customizing AI Configs](/docs/sdk/features/ai-config#python-ai)
 * [Private attributes](/docs/sdk/features/private-attributes#python-ai)
 * [Tracking AI metrics](/docs/sdk/features/ai-metrics#python-ai)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs