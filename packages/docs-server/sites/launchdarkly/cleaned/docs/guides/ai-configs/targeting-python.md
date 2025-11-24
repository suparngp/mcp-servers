`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Guides](/docs/guides)
 * [Account management](/docs/guides/account)
 * [AI Configs](/docs/guides/ai-configs)
 * [Experimentation](/docs/guides/experimentation)
 * [Feature flags](/docs/guides/flags)
 * [Infrastructure](/docs/guides/infrastructure)
 * [Integrations](/docs/guides/integrations)
 * [Metrics](/docs/guides/metrics)
 * [SDKs](/docs/guides/sdk)
 * [Statistical methodology](/docs/guides/statistical-methodology)
 * [REST API](/docs/guides/api)
 * [Teams and custom roles](/docs/guides/teams-roles)
 * [Additional resources](/docs/guides/additional-resources)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Prerequisites](#prerequisites)
 * [Example scenario](#example-scenario)
 * [Step 1: Prepare your development environment](#step-1-prepare-your-development-environment)
 * [Step 2: Initialize LaunchDarkly SDK clients](#step-2-initialize-launchdarkly-sdk-clients)
 * [Step 3: Set up AI Configs in LaunchDarkly](#step-3-set-up-ai-configs-in-launchdarkly)
 * [Step 4: Set up targeting rules and enable AI Config](#step-4-set-up-targeting-rules-and-enable-ai-config)
 * [Step 5: Customize the AI Config](#step-5-customize-the-ai-config)
 * [Step 6: Monitor results](#step-6-monitor-results)
 * [Conclusion](#conclusion)
## Overview
This guide shows how to manage AI model usage by customer tier in an OpenAI-powered application. It uses the LaunchDarkly [Python AI SDK](/docs/sdk/ai/python) and [AI Configs](/docs/home/ai-configs) to dynamically adjust the model used based on customer details.
Using AI Configs and targeting to customize your applications means you can:
 * serve different models or messages to different customers, based on attributes of those customers. You can configure this targeting in LaunchDarkly, and update it without redeploying your application.
 * compare variations and determine which one performs better, based on satisfaction, cost, or other metrics.
This guide steps you through the process of working in your application and in LaunchDarkly to customize your application and its targeting.
##### Additional resources for AI Configs
If you’re not familiar with AI Configs and would like additional explanation, you can start with the [Quickstart for AI Configs](/docs/home/ai-configs/quickstart) and come back to this guide when you’re ready for a more realistic example.
You can find reference guides for each of the AI SDKs at [AI SDKs](/docs/sdk/ai).
## Prerequisites
To complete this guide, you must have the following prerequisites:
 * a LaunchDarkly account, including
 * a LaunchDarkly SDK key for your environment.
 * a role that allows [AI Config actions](/docs/home/account/roles/role-actions#ai-config-actions). The LaunchDarkly Project Admin, Maintainer, and Developer project roles, as well as the Admin and Owner base roles, all include this ability.
 * a Python development environment. The LaunchDarkly Python AI SDK is compatible with Python 3.8.0 and higher.
 * an OpenAI API key. The LaunchDarkly AI SDKs provide specific functions for completions for several common AI model families, and an option to record this information yourself. This guide uses OpenAI.
## Example scenario
In this example, you have an application that provides chat support. When creating your generated content, you want to use one AI model for the content you provide to the customers who are paying you, and a different AI model for the content you provide to the customers on your free tier. You also want to understand whether your paying customers are getting a better experience.
## Step 1: Prepare your development environment
First, install the Python AI SDK:
Shell
```
$
| pip install launchdarkly-server-sdk
---|--- 
>
| pip install launchdarkly-server-sdk-ai
```
Then, set up credentials in your environment. The example below uses `$Environment_SDK_KEY` and `$Environment_OPENAI_KEY` to refer to your LaunchDarkly SDK key and your OpenAI key, respectively.
You can find your SDK key from the **Environments** list for your LaunchDarkly project. To learn how, read [SDK credentials](/docs/home/account/environment/keys#sdk-credentials).
## Step 2: Initialize LaunchDarkly SDK clients
Next, import the LaunchDarkly `LDAIClient` into your application code and initialize it:
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
5
| 
6
| ldclient.set_config(Config('$Environment_SDK_KEY'))
7
| 
8
| if not ldclient.get().is_initialized():
9
| print('SDK failed to initialize')
10
| exit()
11
| 
12
| print('SDK successfully initialized')
13
| 
14
| aiclient = LDAIClient(ldclient.get())
```
## Step 3: Set up AI Configs in LaunchDarkly
Next, create an AI Config in the LaunchDarkly UI. AI Configs are the LaunchDarkly resources that manage model configurations and messages for your generative AI applications.
To create an AI Config:
 1. In LaunchDarkly, click **Create** and choose **AI Config**.
 2. In the “Create AI Config” dialog, give your AI Config a human-readable **Name** , for example, “Chat bot summarizer.”
 3. Click **Create**.
Then, create two variations. Every AI Config has one or more variations, each of which includes your AI messages and model configuration.
Here’s how:
 1. On the **Variations** tab of your newly created AI Config, replace “Untitled variation” with a variation **Name** in the create panel. You’ll use this name to refer to the variation when you set up targeting rules, below. For example, you can use “Premium chat support” for one variation and “Free chat support” for the other variation.
 2. Click **Select a model** and select a supported OpenAI model. For example, you can use “gpt-4o” for your premium variation and “gpt-4-turbo” for your free variation.
 3. Optionally, adjust the model parameters: click **Parameters** to view and update model parameters. In the dialog, adjust the model parameters as needed. The **Base value** of each parameter is from the model settings. You can choose different values for this variation if you prefer.
 4. Add system, user, or assistant messages to define your prompt. For this example, enter a **system** message for each variation:
Premium chat support, system messageFree chat support, system message
```
You are an expert AI assistant with comprehensive knowledge across multiple domains. Your responses should be detailed, thorough, and professional. You can: 
--- 
1. Provide in-depth technical explanations 
2. Offer multiple solution approaches when applicable 
3. Include relevant code examples and best practices 
4. Share industry insights and advanced tips 
5. Suggest optimizations and improvements 
6. Reference technical documentation and trusted sources 
Always maintain a professional yet friendly tone, and prioritize accuracy and completeness in your responses. 
If a question is unclear, ask for clarification to ensure you provide the most valuable assistance possible. 
```
 1. Click **Save changes** after you create each variation.
Here’s how the two variations should look after you’ve set them up:
![The "Premium chat support" variation.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/83239c9814651ed6305e637c82834a37b74dd6f306ed5d2c4159e393af2d3855/assets/images/__toPlaywright_newIA/guide-ai-config-targeting-premium-variation.png)
The "Premium chat support" variation.
![The "Free chat support" variation.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/75db87fd02e27d7dff2b6c1a3034fbffcc694ae129f8af59c10e2824056c0a95/assets/images/__toPlaywright_newIA/guide-ai-config-targeting-free-variation.png)
The "Free chat support" variation.
## Step 4: Set up targeting rules and enable AI Config
Next, set up targeting rules for your AI Config. These rules determine which of your customers receives which variation of your AI Config.
To specify the AI Config variation to use by default when the AI Config is toggled on:
 1. Select the **Targeting** tab for your AI Config.
 2. In the “Default rule” section, click **Edit**.
 3. Configure the default rule to serve the “Free chat support” variation.
 4. Click **Review and save**.
To specify a different AI Config variation to use for premium customers:
 1. Select the **Targeting** tab for your AI Config.
 2. Click the **+** button between existing rules, and select **Build a custom rule**.
 * If the AI Config is off and the rules are hidden, click **View targeting rules**.
 3. Optionally, enter a name for the rule.
 4. Leave the **Context kind** menu set to “user.”
 5. In the **Attribute** menu, type in `customer_type`. You’ll set this attribute in your code later.
 6. Leave the **Operator** menu set to “is one of.”
 7. In the **Values** menu, type in `premium`. You’ll set this value in your code later.
 8. From the **Select…** menu, choose the “Premium chat support” variation.
 9. Click **Review and save**.
By default, the AI Config is set to **On**. Click **Review and save**.
Here’s what the **Targeting** tab of your AI Config should look like:
![The "Targeting" tab of your AI Config.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/5ce4252b1de20f52da77d90927295fad551548453b9240ea1759588e2eecceac/assets/images/__toPlaywright_newIA/guide-ai-config-targeting-targeting-tab-new.png)
The "Targeting" tab of your AI Config.
## Step 5: Customize the AI Config
In your code, use the `config` function in the LaunchDarkly AI SDK to customize the AI Config. **You need to call`config` each time you generate content from your AI model**.
The `config` function returns the customized messages and model configuration along with a tracker instance for recording metrics. Customization is what happens when your application’s code sends the LaunchDarkly AI SDK information about a particular AI Config and the end user that has encountered it in your app, and the SDK sends back the value of the variation that the end user should receive.
To call the `config` function, you need to provide information about the end user who is working in your application. For example, you may have this information in a user profile within your app.
The `config` function returns the customized messages and model along with a tracker instance for recording metrics. You can pass the customized messages directly to your LLM using a chat completion call, `track_openai_metrics`.
Here’s how:
Example application
```
1
| #... Existing code from Step 2, above
---|--- 
2
| 
3
| # OpenAI API Key
4
| openai.api_key = "$Environment_OPENAI_KEY"
5
| 
6
| # The context describes the end user currently working in your application.
7
| # The targeting rules for your AI Config can use any context attributes.
8
| # This example checks 'customer_type' in one of the targeting rules.
9
| context = Context.builder('context-key-123abc') \
10
| .kind('user') \
11
| .set('name', 'Sandy') \
12
| .set('customer_type', 'premium') \
13
| .build()
14
| 
15
| aiclient = LDAIClient(ldclient.get())
16
| 
17
| # In case you cannot reach LaunchDarkly
18
| fallback_value = AIConfig(enabled=False)
19
| 
20
| # Get AI Config from LaunchDarkly
21
| def get_prompt_and_model():
22
| config, tracker = aiclient.config("chat-bot-summarizer", context, fallback_value)
23
| if config.enabled:
24
| return config, tracker
25
| else:
26
| # Application path to take when the config is disabled.
27
| # For example, you may want to display a message
28
| # that the chatbot is not available and customers should try again later.
29
| 
30
| # Perform a chat completion call
31
| def perform_chat():
32
| ai_config, tracker = get_prompt_and_model()
33
| 
34
| # Transform the prompt for OpenAI's format
35
| messages = [{"role": msg.role, "content": msg.content} for msg in ai_config.messages]
36
| 
37
| try:
38
| # Track metrics using the AI Client tracker
39
| completion = tracker.track_openai_metrics(
40
| lambda: openai.chat.completions.create(
41
| model=ai_config.model.name,
42
| messages=messages,
43
| )
44
| )
45
| 
46
| except Exception as e:
47
| print(f"Error during chat completion: {e}")
48
| 
49
| if __name__ == "__main__":
50
| perform_chat()
```
## Step 6: Monitor results
As customers encounter chat support in your application, LaunchDarkly monitors the performance of your AI Configs: the tracker returned by the `config` function automatically records various metrics. To view them, select the **Monitoring** tab for your AI Config in LaunchDarkly.
In this example, you can review the results to determine:
 * which support option provides higher satisfaction for customers
 * which support option uses more tokens
You could use this information to make a business decision about whether the performance differences are worth the cost differences of running each model for your different customer tiers.
To learn more, read [Monitor AI Configs](/docs/home/ai-configs/monitor).
## Conclusion
In this guide, you learned how to manage AI model usage by customer tier in an OpenAI-powered application, and how to review the performance of those models based on customer feedback and token usage.
For additional examples, read the other [AI Configs guides](/docs/guides/ai-configs) in this section. To learn more, read [AI Configs](/docs/home/ai-configs) and [AI SDKs](/docs/sdk/ai).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs