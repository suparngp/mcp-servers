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
 * [About AI Configs](#about-ai-configs)
 * [Customize messages](#customize-messages)
 * [Syntax for customization](#syntax-for-customization)
 * [Customization is based on context](#customization-is-based-on-context)
 * [AI SDKs](#ai-sdks)
 * [.NET AI](#net-ai)
 * [Go AI](#go-ai)
 * [Node.js (server-side) AI](#nodejs-server-side-ai)
 * [Customize AI Configs in completion mode](#customize-ai-configs-in-completion-mode)
 * [Customize AI Configs in agent mode](#customize-ai-configs-in-agent-mode)
 * [Python AI](#python-ai)
 * [Customize AI Configs in completion mode](#customize-ai-configs-in-completion-mode-1)
 * [Customize AI Configs in agent mode](#customize-ai-configs-in-agent-mode-1)
 * [Ruby AI](#ruby-ai)
## Overview
This topic explains how to customize an AI Config. This feature is available for AI SDKs only.
LaunchDarkly’s AI SDKs are designed for use with LaunchDarkly’s AI Configs. They are currently in a pre-1.0 release and under active development.
## About AI Configs
The AI Config feature customizes an AI Config based on the [context](/docs/home/getting-started/vocabulary#context) that you provide. This means both the messages and the model evaluation in your generative AI application are specific to each end user, at runtime.
This feature requires an AI Config key, the context that encounters the AI Config in your application, a fallback value, and, optionally, additional variables used in the prompt template.
This feature returns the value of the customized AI Config variation to use for this context, based on the AI Config’s targeting rules. If your AI Config uses `completion` mode, this variation includes the model and customized messages for the context. If your AI Config uses `agent` mode, this variation includes the customized instructions for the context. In both cases, you can use the value of the AI Config variation in your AI model generation. You need to use this customization feature each time you generate content from your AI model.
## Customize messages
Customizing the AI Config means that LaunchDarkly substitutes context attributes and optional variables into the messages or instructions associated with the AI Config variation. If the variation has multiple messages, they are all customized and returned. If the variation cannot be retrieved, for example because the AI Config key does not exist, or because the SDK cannot connect to LaunchDarkly, then the SDK returns the fallback value.
### Syntax for customization
When you create a message or instruction in an AI Config variation, use the following syntax if you want to substitute context attributes or other variables:
 * Use two curly braces to indicate variables in your application code. For example:
 * Enter `This is an {{ example }}` in the message or instruction in your AI Config variation in the LaunchDarkly UI. The variable name (`example`) cannot have a period (`.`) in it.
 * In the SDK, pass a dictionary or key-value pair with `example` and your `example_value` to the customization call.
 * Use two curly braces, the `ldctx` prefix, and dot (`.`) notation to indicate [context attributes](/docs/home/flags/context-attributes). For example:
 * Enter `Describe the typical weather in {{ ldctx.city }}` if you’d like to replace `{{ ldctx.city }}` with the `city` attribute from each context that encounters this AI Config. The context attribute cannot have a period (`.`) in it.
 * If your context attribute has multiple fields within it, you can use `.` as a delimiter in your AI Config message. For instance, if the context has an “address” attribute that includes “city” and other fields, then you could use `{{ ldctx.address.city }}` in your message or instructions, and the value of the “city” field will be substituted when you customize the AI Config.
 * In the SDK, the context is required parameter. You do not need to pass any additional information to the customization call when you use `ldctx`.
### Customization is based on context
The customization feature adds a [context](/docs/home/getting-started/vocabulary#context) to the **Contexts** list, if a context with the same key does not already exist. However, each SDK customizes the AI Config based only on the object you provide. In other words, the SDK does not automatically use the attributes shown on the **Contexts** list, and attributes are not synchronized across SDK instances. You must provide all relevant attributes for each customization in order for variables in your prompt to be substituted correctly. To learn more, read [Context configuration](/docs/sdk/features/context-config).
## AI SDKs
This feature is available for all of the AI SDKs:
 * [.NET AI](/docs/sdk/features/ai-config#net-ai)
 * [Go AI](/docs/sdk/features/ai-config#go-ai)
 * [Node.js (server-side) AI](/docs/sdk/features/ai-config#nodejs-server-side-ai)
 * [Python AI](/docs/sdk/features/ai-config#python-ai)
 * [Ruby AI](/docs/sdk/features/ai-config#ruby-ai)
### .NET AI
###### Expand .NET AI SDK code sample
The `Config` function customizes the AI Config. Customization means that any variables you include in the prompt messages when you define the AI Config variation have their values set to the context attributes and variables you pass to `Config`. You need to call `Config` each time you generate content from your AI model.
The `Config` function takes the AI Config key, a `Context`, a [fallback value](/docs/home/getting-started/vocabulary#fallback-value), and optional additional variables to substitute into your prompt. It performs the evaluation, then returns the customized prompt and model along with a tracker instance for recording prompt metrics. You can pass the customized prompt directly to your AI.
The fallback value is the value of the AI Config variation that your application should use in the event of an error, for example, if the AI Config key is not valid, or if there is a problem connecting to LaunchDarkly. You can use `LdAiConfig.Disabled` as a fallback value, and then check for this during your application’s error-handling. Alternatively, you can create a custom `LdAiConfig` object using `LdAiConfig.New()`.
Here is an example of calling the `Config` method:
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
13
| 
14
| if (tracker.Config.Enabled == true) {
15
| 
16
| // Send a request to your AI provider, using the details from the customized Config
17
| 
18
| } else {
19
| 
20
| // Application path to take when the tracker.Config is disabled
21
| 
22
| }
```
After the function call, you can view the context that you provided to it on the **Contexts** list.
To learn more, read [`Config`](https://launchdarkly.github.io/dotnet-core/pkgs/sdk/server-ai/api/LaunchDarkly.Sdk.Server.Ai.LdAiClient.html#LaunchDarkly_Sdk_Server_Ai_LdAiClient_Config_System_String_LaunchDarkly_Sdk_Context_LaunchDarkly_Sdk_Server_Ai_Config_LdAiConfig_System_Collections_Generic_IReadOnlyDictionary_System_String_System_Object__).
### Go AI
###### Expand Go AI SDK code sample
The `Config` function customizes the AI Config. Customization means that any variables you include in the prompt messages when you define the AI Config variation have their values set to the context attributes and variables you pass to the `Config()` method.
The `Config()` function takes an AI Config key, a context, and a [fallback value](/docs/home/getting-started/vocabulary#fallback-value). It performs the evaluation, then returns a `Config` object with the customized messages and model, and a `Tracker` object to capture performance metrics. You can pass the customized messages directly to your AI.
The fallback value is the value of the AI Config variation that your application should use in the event of an error, for example, if the AI Config key is not valid, or if there is a problem connecting to LaunchDarkly. You can use an empty, disabled `Config` as a fallback value, by calling `ldai.Disabled()`, and then check for this during your application’s error handling. Alternatively, you can create a custom `Config` object using `NewConfig`.
Here is an example of calling the `Config()` method:
Go AI SDK
```
1
| fallbackValue := NewConfig().Build() // by default, the Config is disabled
---|--- 
2
| 
3
| cfg, tracker := aiClient.Config("ai-config-key-123abc", context, fallbackValue, map[string]interface{}{"exampleCustomVariable": "exampleCustomValue"})
4
| 
5
| if cfg.Enabled() {
6
| 
7
| // Send a request to your AI provider, using details from the customized cfg
8
| 
9
| } else {
10
| 
11
| // Application path to take when the cfg.config is disabled
12
| 
13
| }
```
After the function call, you can view the context that you provided to it on the **Contexts** list.
To learn more, read [`Config`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/ldai#Config).
### Node.js (server-side) AI
###### Expand Node.js (server-side) AI SDK code sample
The `config()`, `agent()`, and `agents()` functions customize the AI Config. Customization means that any variables you include in the prompt messages or instructions when you define the AI Config variation have their values set to the context attributes and variables you pass to in.
The details of customizing an AI Config depend on whether you are using AI Configs in a `completion` mode or an `agent` mode. You set the `mode` for a particular AI Config when you [create it](/docs/home/ai-configs/create) in the LaunchDarkly UI.
#### Customize AI Configs in completion mode
`completion` mode means that each variation in your AI Config includes a single set of roles and messages that you use to prompt your generative AI model.
In `completion` mode, use `config()` to customize the AI Config. The `config` function takes the AI Config key, a `Context`, a [fallback value](/docs/home/getting-started/vocabulary#fallback-value), and optional additional variables to substitute into your prompt. It performs the evaluation, then returns the customized prompt and model along with a tracker instance for recording prompt metrics. You can pass the customized prompt directly to your AI.
The fallback value is the value of the AI Config variation that your application should use in the event of an error, for example, if the AI Config key is not valid, or if there is a problem connecting to LaunchDarkly. You can use an empty JSON object as a fallback value, and then check for this during your application’s error-handling. Alternatively, you can construct a JSON object, for example with values from one of the AI Config variations you have created in the LaunchDarkly UI.
Here is an example of calling the `config()` method:
Customize an AI Config in completion mode
```
1
| const fallbackConfig = { enabled: false };
---|--- 
2
| 
3
| const aiConfig: LDAIConfig = aiClient.config(
4
| 'ai-config-key-123abc',
5
| context,
6
| fallbackConfig,
7
| { 'exampleCustomVariable': 'exampleCustomValue' },
8
| );
9
| 
10
| if (aiConfig.enabled) {
11
| // Send a request to your AI provider, using the details from the customized config
12
| } else {
13
| // Application path to take when the aiConfig is disabled
14
| }
```
After the function call, you can view the context that you provided to it on the **Contexts** list.
To learn more, read [`config`](https://launchdarkly.github.io/js-core/packages/sdk/server-ai/docs/interfaces/LDAIClient.html#config).
#### Customize AI Configs in agent mode
`agent` mode means that each variation in your AI Config includes a set of instructions, which enable multi-step workflows.
In `agent` mode, use `agent()` or `agents()` to customize the AI Config. The `agent()` function customizes a single AI Config agent, while the `agents()` function customizes an array of agent configurations.
Customization requires an AI Config key, fallback value, and optional variables to use in the customization, for each agent. Additionally, customization requires a context. Both functions perform the evaluation and then return the customized instructions for each AI Config, along with a tracker instance for recording metrics. If the function cannot perform the evaluation or LaunchDarkly is unreachable, it returns the fallback value. For example, you might use an empty, disabled `LDAIAgentConfig` as a fallback value, or a fully configured default. Either way, you should make sure to check for this case and handle it appropriately in your application.
Here’s how:
Customize an AI Config in agent mode
```
1
| const fallbackConfig = { enabled: false };
---|--- 
2
| 
3
| const agent: LDAIAgent = await aiClient.agent(
4
| 'ai-config-key-123abc',
5
| context,
6
| fallbackConfig,
7
| { 'exampleCustomVariable': 'exampleCustomValue' },
8
| );
```
To learn more, read [`agent`](https://launchdarkly.github.io/js-core/packages/sdk/server-ai/docs/interfaces/LDAIClient.html#agent) and [`agents`](https://launchdarkly.github.io/js-core/packages/sdk/server-ai/docs/interfaces/LDAIClient.html#agents).
### Python AI
###### Expand Python AI SDK code sample
The `config()`, `agent()`, and `agents()` functions customize the AI Config. Customization means that any variables you include in the messages or instructions when you define the AI Config variation have their values set to the context attributes and variables you pass in.
The details of customizing an AI Config depend on whether you are using AI Configs in a `completion` mode or an `agent` mode. You set the `mode` for a particular AI Config when you [create it](/docs/home/ai-configs/create) in the LaunchDarkly UI.
#### Customize AI Configs in completion mode
`completion` mode means that each variation in your AI Config includes a single set of roles and messages that you use to prompt your generative AI model.
In `completion` mode, use `config()` to customize the AI Config. The `config()` function takes an AI Config key, a context, and a fallback value. It performs the evaluation, then returns the customized messages and model along with a tracker instance for recording metrics.
The fallback value is the value of the AI Config variation that your application should use in the event of an error, for example, if the AI Config key is not valid, or if there is a problem connecting to LaunchDarkly. You can use an empty JSON object as a fallback value, and then check for this during your application’s error handling. Alternatively, you can construct a JSON object, for example with values from one of the AI Config variations you have created in the LaunchDarkly UI.
Here is an example of calling the `config()` method:
Customize an AI Config in completion mode
```
1
| key = 'ai-config-key-123abc'
---|--- 
2
| context = Context.builder('context-key-123abc') \
3
| .kind('user') \
4
| .set('name', 'Sandy') \
5
| .build()
6
| fallback_value = AIConfig(enabled=False)
7
| variables = { 'example_custom_variable': 'example_custom_value' }
8
| 
9
| config, tracker = aiclient.config(key, context, fallback_value, variables)
10
| 
11
| if config.enabled:
12
| # Send a request to your AI provider, using the details from the customized config
13
| else:
14
| # Application path to take when the config is disabled
```
After the function call, you can view the context that you provided to it on the **Contexts** list.
To learn more, read [`config`](https://launchdarkly-python-sdk-ai.readthedocs.io/en/latest/api-main.html#ldai.client.LDAIClient.config).
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
To learn more, read [`agent`](https://launchdarkly-python-sdk-ai.readthedocs.io/en/latest/api-main.html#ldai.client.LDAIClient.agent) and [`agents`](https://launchdarkly-python-sdk-ai.readthedocs.io/en/latest/api-main.html#ldai.client.LDAIClient.agents).
### Ruby AI
###### Expand Ruby AI SDK code sample
The `config` function customizes the AI Config. Customization means that any variables you include in the prompt messages when you define the AI Config variation have their values set to the context attributes and variables you pass to `config`. You need to call `config` each time you generate content from your AI model.
The `config` function takes the AI Config key, a `Context`, a [fallback value](/docs/home/getting-started/vocabulary#fallback-value), and optional additional variables to substitute into your prompt. It performs the evaluation, then returns the customized prompt and model along with a tracker instance for recording prompt metrics. You can pass the customized prompt directly to your AI.
The fallback value is the value of the AI Config variation that your application should use in the event of an error, for example, if the AI Config key is not valid, or if there is a problem connecting to LaunchDarkly. You can use an empty JSON object as a fallback value, and then check for this during your application’s error handling. Alternatively, you can construct a JSON object, for example with values from one of the AI Config variations you have created in the LaunchDarkly UI.
Here is an example of calling the `config` method:
Ruby AI SDK
```
1
| key = 'ai-config-key-123abc'
---|--- 
2
| context = LaunchDarkly::LDContext.create({ key: 'example-user-key', kind: 'user', name: 'Sandy' })
3
| fallback_value = LaunchDarkly::AI::AIConfig.new(enabled: false)
4
| variables = { 'example_custom_variable' => 'example_custom_value' }
5
| 
6
| ai_config = ai_client.config(key, context, fallback_value, variables)
7
| 
8
| if ai_config.enabled
9
| # Send a request to your AI provider, using the details from the customized config
10
| else
11
| # Application path to take when the ai_config is disabled
12
| end
```
After the function call, you can view the context that you provided to it on the **Contexts** list.
To learn more, read [`config`](https://launchdarkly.github.io/ruby-server-sdk-ai/LaunchDarkly/Server/AI/Client.html#config-instance_method).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs