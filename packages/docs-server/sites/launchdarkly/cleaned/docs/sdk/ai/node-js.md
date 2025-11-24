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
 * [Customize AI Configs in completion mode](#customize-ai-configs-in-completion-mode)
 * [Customize AI Configs in agent mode](#customize-ai-configs-in-agent-mode)
 * [Create a client or model instance](#create-a-client-or-model-instance)
 * [Combine AI Config messages with user messages](#combine-ai-config-messages-with-user-messages)
 * [Call the provider and record AI metrics](#call-the-provider-and-record-ai-metrics)
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the Node.js (server-side) AI SDK, and links to reference information on all of the supported features. You can use either JavaScript or TypeScript when working with the Node.js (server-side) AI SDK.
The Node.js (server-side) AI SDK is designed for use with LaunchDarkly’s AI Configs. It is currently in a pre-1.0 release and under active development. You can follow development or contribute on [GitHub](https://github.com/launchdarkly/js-core/tree/main/packages/sdk/server-ai/).
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, sample applications, and provider-specific packages:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/js-core/packages/sdk/server-ai/docs/) 
GitHub repository | [node-server-sdk-ai](https://github.com/launchdarkly/js-core/tree/main/packages/sdk/server-ai/) 
Sample application | [Using Bedrock](https://github.com/launchdarkly/js-core/tree/main/packages/sdk/server-ai/examples/bedrock), [Using OpenAI](https://github.com/launchdarkly/js-core/tree/main/packages/sdk/server-ai/examples/openai) 
Published module | [npm](https://www.npmjs.com/package/@launchdarkly/server-sdk-ai) 
Provider-specific packages | [OpenAI](https://github.com/launchdarkly/js-core/tree/main/packages/ai-providers/server-ai-openai), [LangChain](https://github.com/launchdarkly/js-core/tree/main/packages/ai-providers/server-ai-langchain), [Vercel AI](https://github.com/launchdarkly/js-core/tree/main/packages/ai-providers/server-ai-vercel) 
##### For use in server-side applications only
This SDK is intended for use in multi-user Node.js server applications. To learn more about LaunchDarkly’s different SDK types, read [Choosing an SDK type](/docs/sdk/concepts/client-side-server-side).
## Get started
LaunchDarkly AI SDKs interact with [AI Configs](/docs/home/getting-started/vocabulary#ai-config). AI Configs are the LaunchDarkly resources that manage model configurations and messages for your generative AI applications.
##### Try the Quickstart
This reference guide describes working specifically with the Node.js (server-side) AI SDK. For a complete introduction to LaunchDarkly AI SDKs and how they interact with AI Configs, read [Quickstart for AI Configs](/docs/home/ai-configs/quickstart).
You can use the Node.js (server-side) AI SDK to customize your AI Config based on the [context](/docs/home/getting-started/vocabulary#context) that you provide. This means both the messages and the model evaluation in your generative AI application are specific to each end user, at runtime. You can also use the AI SDKs to record metrics from your AI model generation, including duration and tokens.
Follow these instructions to start using the Node.js (server-side) AI SDK in your application.
### Install the SDK
First, install the AI SDK as a dependency in your application using your application’s dependency manager. If you want to depend on a specific version, refer to the [SDK releases page](https://github.com/launchdarkly/js-core/releases?q=ai) to identify the latest version.
The Node.js (server-side) AI SDK is built on the [Node.js (server-side) SDK](/docs/sdk/server-side/node-js), so you’ll need to install that as well. Alternatively, you can install a server-side [edge SDK](/docs/sdk/edge) instead.
In addition, you can also use provider-specific AI SDK packages for better integration and improved version management with your preferred AI framework.
The following provider-specific packages are available:
 * [OpenAI](https://github.com/launchdarkly/js-core/tree/main/packages/ai-providers/server-ai-openai)
 * [LangChain](https://github.com/launchdarkly/js-core/tree/main/packages/ai-providers/server-ai-langchain)
 * [Vercel AI](https://github.com/launchdarkly/js-core/tree/main/packages/ai-providers/server-ai-vercel)
These packages require Node.js version 16 or higher.
##### Provider-specific packages are in early development
These provider-specific packages are currently in early development and are not recommended for production use. They may change without notice, including becoming backwards incompatible.
Here’s how:
Shell
```
$
| npm install @launchdarkly/node-server-sdk
---|--- 
>
| npm install @launchdarkly/server-sdk-ai
>
| # If you want to install a provider-specific package
>
| npm install @launchdarkly/server-sdk-ai-openai
>
| # or
>
| npm install @launchdarkly/server-sdk-ai-langchain
>
| # or
>
| npm install @launchdarkly/server-sdk-ai-vercel
```
Next, import `init`, `LDContext`, and `initAi` in your application code. If you are using TypeScript, you can optionally import the LaunchDarkly `LDAIClient` and `LDAIConfig`. These are implied, so are not strictly required.
Here’s how:
Node.js (server-side) AI SDK (TypeScript)Node.js (server-side) AI SDK (JavaScript)
```
1
| import { init, LDContext } from '@launchdarkly/node-server-sdk';
---|--- 
2
| import { initAi, LDAIClient, LDAIConfig } from '@launchdarkly/server-sdk-ai';
```
Here’s how to import a provider-specific package:
OpenAILangChainVercel AI
```
1
| import { OpenAIProvider } from '@launchdarkly/server-sdk-ai-openai';
---|--- 
2
| import { OpenAI } from 'openai';
```
### Initialize the client
After you install and import the SDK, create a single, shared instance of `LDClient`. When the `LDClient` is initialized, use it to initialize the `LDAIClient`. The `LDAIClient` is how you interact with AI Configs. Specify the SDK key to authorize your application to connect to a particular environment within LaunchDarkly.
##### The Node.js SDKs use an SDK key
Both the Node.js (server-side) AI SDK and the Node.js (server-side) SDK use an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
Here’s how:
Node.js (server-side) AI SDK (TypeScript)Node.js (server-side) AI SDK (JavaScript)
```
1
| const ldClient: LDClient = init('sdk-key-123abc');
---|--- 
2
| 
3
| try {
4
| await ldClient.waitForInitialization({ timeout: 10 });
5
| // initialization complete
6
| } catch (error) {
7
| // timeout or SDK failed to initialize
8
| }
9
| 
10
| const aiClient: LDAIClient = initAi(ldClient);
```
### Configure the context
Next, configure the context that will use the AI Config, that is, the context that will encounter generated AI content in your application. The context attributes determine which variation of the AI Config LaunchDarkly serves to the end user, based on the targeting rules in your AI Config. If you are using template variables in the messages in your AI Config’s variations, the context attributes also fill in values for the template variables.
Here’s how:
Node.js (server-side) AI SDK (TypeScript)Node.js (server-side) AI SDK (JavaScript)
```
1
| const context: LDContext = {
---|--- 
2
| kind: 'user',
3
| key: 'user-key-123abc',
4
| firstName: 'Sandy',
5
| lastName: 'Smith',
6
| email: 'sandy@example.com',
7
| groups: ['Google', 'Microsoft'],
8
| };
```
Now use this context to customize your AI Config.
### Customize an AI Config
The next step is to customize your AI Config. Customization means that any variables you include in the messages or instructions when you define the AI Config variation have their values set to the context attributes and variables you pass in.
The details of customizing an AI Config depend on whether you are using AI Configs in a `completion` mode or an `agent` mode. You set the `mode` for a particular AI Config when you [create it](/docs/home/ai-configs/create) in the LaunchDarkly UI.
#### Customize AI Configs in completion mode
`completion` mode means that each variation in your AI Config includes a single set of roles and messages that you use to prompt your generative AI model.
In `completion` mode, use `config()` to customize the AI Config. The `config()` function takes an AI Config key, a context, a fallback value, and optional variables to use in the customization. It performs the evaluation, then returns the customized messages and model along with a tracker instance for recording metrics. If it cannot perform the evaluation or LaunchDarkly is unreachable, it returns the fallback value. For example, you might use an empty, disabled `LDAIConfig` as a fallback value, or a fully configured default. Either way, you should make sure to check for this case and handle it appropriately in your application.
Here’s how:
Customize an AI Config in completion mode (TypeScript)Customize an AI Config in completion mode (JavaScript)
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
```
#### Customize AI Configs in agent mode
`agent` mode means that each variation in your AI Config includes a set of instructions, which enable multi-step workflows.
In `agent` mode, use `agent()` or `agents()` to customize the AI Config. The `agent()` function customizes a single AI Config agent, while the `agents()` function customizes an array of agent configurations.
Customization requires an AI Config key, fallback value, and optional variables to use in the customization, for each agent. Additionally, customization requires a context. Both functions perform the evaluation and then return the customized instructions for each AI Config, along with a tracker instance for recording metrics. If the function cannot perform the evaluation or LaunchDarkly is unreachable, it returns the fallback value. For example, you might use an empty, disabled `LDAIAgentConfig` as a fallback value, or a fully configured default. Either way, you should make sure to check for this case and handle it appropriately in your application.
Here’s how:
Customize an AI Config in agent mode (TypeScript)Customize an AI Config in agent mode (JavaScript)
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
To learn more, read [Customizing AI Configs](/docs/sdk/features/ai-config#nodejs-server-side-ai).
### Create a client or model instance
If you’re using a provider-specific package, you can create a client (OpenAI) or a model instance (LangChain and Vercel AI). Here’s how:
OpenAILangChainVercel AI
```
1
| const client = new OpenAI({
---|--- 
2
| apiKey: process.env.OPENAI_API_KEY,
3
| });
```
### Combine AI Config messages with user messages
With your model ready, you can now combine the LaunchDarkly-provided messages with user input. If you’re using a provider-specific package, you can combine an AI Config message with a user message. Here’s how:
OpenAILangChainVercel AI
```
1
| const configMessages = aiConfig.messages || [];
---|--- 
2
| const userMessage = { role: 'user', content: 'What is the capital of France?' };
3
| const allMessages = [...configMessages, userMessage];
```
### Call the provider and record AI metrics
Finally, using a provider-specific package, make a request to your generative AI provider and record metrics from your AI model generation.
Here’s how:
OpenAILangChainVercel AIAmazon Bedrock
```
1
| const response = await aiConfig.tracker.trackMetricsOf(
---|--- 
2
| (result) => OpenAIProvider.createAIMetrics(result),
3
| () => client.chat.completions.create({
4
| model: aiConfig.model?.name || 'gpt-4',
5
| messages: aiConfig.messages || [],
6
| temperature: (aiConfig.model?.parameters?.temperature as number) ?? 0.5,
7
| })
8
| );
9
| 
10
| console.log('AI Response:', response.choices[0].message.content);
```
To learn more, read [Tracking AI metrics](/docs/sdk/features/ai-metrics#nodejs-server-side-ai).
## Supported features
This SDK supports the following features:
 * [Anonymous contexts](/docs/sdk/features/anonymous#nodejs-server-side-ai)
 * [Context configuration](/docs/sdk/features/context-config#nodejs-server-side-ai)
 * [Customizing AI Configs](/docs/sdk/features/ai-config#nodejs-server-side-ai)
 * [Private attributes](/docs/sdk/features/private-attributes#nodejs-server-side-ai)
 * [Tracking AI metrics](/docs/sdk/features/ai-metrics#nodejs-server-side-ai)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs