`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Tutorials](/docs/tutorials)
 * [When to use prompt-based vs agent mode in LaunchDarkly](/docs/tutorials/agent-vs-completion)
 * [When to Add Online Evals to Your AI Configs](/docs/tutorials/when-to-add-online-evals)
 * [Detecting User Frustration: Understanding Rage Clicks and Session Replay](/docs/tutorials/detecting-user-frustration-session-replay)
 * [AI Config CI/CD Pipeline: Automated Quality Gates and Safe Deployment](/docs/tutorials/aic-cicd)
 * [Resilient architecture patterns for LaunchDarkly's SDKs](/docs/tutorials/sdk-resilience-best-practices)
 * [Proving ROI with Data-Driven AI Agent Experiments](/docs/tutorials/ai-experiments-roi)
 * [A Deeper Look at LaunchDarkly Architecture: More than Feature Flags](/docs/tutorials/ld-arch-deep-dive)
 * [Add Observability to Your React Native App in 5 minutes](/docs/tutorials/react-native-observability)
 * [Smart AI Agent Targeting with MCP Tools](/docs/tutorials/multi-agent-mcp-targeting)
 * [Build a LangGraph Multi-Agent System in 20 Minutes with LaunchDarkly AI Configs](/docs/tutorials/agents-langgraph)
 * [Snowflake Cortex Completion API + LaunchDarkly SDK Integration](/docs/tutorials/snowflake-tutorial)
 * [Using AI Configs to review database changes](/docs/tutorials/ai-configs-review-database-changes)
 * [How to implement WebSockets and kill switches in a Python application](/docs/tutorials/python-flask-websockets-kill-switch-flags)
 * [4 hacks to turbocharge your Cursor productivity](/docs/tutorials/cursor-tips-and-tricks)
 * [Create a feature flag in your IDE in 5 minutes with LaunchDarkly's MCP server](/docs/tutorials/mcp-server-feature-flags)
 * [DeepSeek vs Qwen: local model showdown featuring LaunchDarkly AI Configs](/docs/tutorials/ollama-javascript)
 * [Video tutorials](/docs/tutorials/videos)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Prerequisites](#prerequisites)
 * [Locally running LLMs: why and how](#locally-running-llms-why-and-how)
 * [Choosing our models](#choosing-our-models)
 * [Installing and configuring Ollama](#installing-and-configuring-ollama)
 * [Connecting Ollama with a Node.js project](#connecting-ollama-with-a-nodejs-project)
 * [Adding a custom model to LaunchDarkly AI Configs](#adding-a-custom-model-to-launchdarkly-ai-configs)
 * [Connecting LaunchDarkly AI Configs to Ollama](#connecting-launchdarkly-ai-configs-to-ollama)
 * [Wrapping it up: bring your own model, track your own metrics, take the next steps](#wrapping-it-up-bring-your-own-model-track-your-own-metrics-take-the-next-steps)
_Published March 4th, 2024_
![portrait of Tilde Thurium.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/76588f82673e369503c4e8f33cb7280539b2251c25bb4cff7dec2047757115fa/assets/images/authors/tilde-thurium.png)
by Tilde Thurium
## Overview
LaunchDarkly’s [new AI Configs](https://launchdarkly.com/blog/launch-week-2024-introducing-ai-configs/) now support bringing your own model. This capability unlocks more flexibility than ever before for supporting fine-tuned models, or even running your own models on local hardware.
In this post, we’ll compare two open source models ([DeepSeek-R1](https://github.com/deepseek-ai/DeepSeek-R1) and [Alibaba’s Qwen](https://www.reuters.com/technology/artificial-intelligence/alibaba-releases-ai-model-it-claims-surpasses-deepseek-v3-2025-01-29/)) using Ollama and LaunchDarkly AI Configs.
## Prerequisites
 * A dev environment with Node.js, npm, and a terminal installed
 * A computer with [at least 16gb RAM](https://dev.to/askyt/deepseek-r1-ram-requirements-105a)
 * Ideally, a fast internet connection; otherwise downloading models might take a while.
## Locally running LLMs: why and how
Running LLMs on your own hardware has a few advantages over using cloud-provided models:
 * _Enhanced data privacy_. You are in control and can be confident you’re not leaking data to a model provider.
 * _Accessibility_. Locally running models work without an internet connection.
 * _Sustainability and reduced costs_. Local models take less power to run.
I was intimidated by the idea of running a model locally. Fortunately, tooling and models have come a long way! You don’t need super specialized knowledge, or particularly powerful hardware.
[Ollama](https://ollama.com/) is an awesome open-source tool we’ll be using to run large language models on local hardware.
## Choosing our models
Ultimately, which model to choose is an extremely complex question that depends on your use case, hardware, latency, and accuracy requirements.
Reasoning models are designed to provide more accurate answers to complex tasks such as coding or solving math problems. DeepSeek made a splash releasing their open source R1 reasoning model in January.
The open source DeepSeek models are distillations of the Qwen or Llama models. Distillation is training a smaller, more efficient model to mimic the behavior and knowledge of a larger, more complex model. Let’s pit the distilled version against the original here and see how they stack up.
In this post, we’ll use small versions of these models (deepseek-r1:1.5b and qwen:1.8b) to make this tutorial accessible and fast for those without access to advanced hardware. Feel free to try whatever models best suit your needs as you follow along.
## Installing and configuring Ollama
Head to the [Ollama download page](https://ollama.com/download). Follow the instructions for your operating system of choice.
To install our first model and start it running, type the following command in your terminal:
```
$
| ollama run deepseek-r1:1.5b
---|--- 
```
Let’s run a test query to ensure that Ollama can generate results. At the prompt, type a question:
```
$
| >>> "why is the sky blue?"
---|--- 
>
| 
>
| </think>
>
| 
>
| The color of the sky appears blue due to a
>
| combination of factors related to light
>
| refraction and reflection. Here's a
>
| step-by-step explanation:
>
| ...
```
To exit the Ollama prompt, use the `/bye` command.
Follow the same process to install _qwen:1.8b_ :
```
$
| ollama run qwen:1.8b
---|--- 
```
Although you have exited the terminal process, Ollama is still running in the background via a Docker image. That lets us run code that queries the models we’ve downloaded. Next we’ll create a Node.js project that connects with Ollama.
## Connecting Ollama with a Node.js project
Run the following commands to set up a new Node.js project:
```
$
| mkdir ollama-js-launchdarkly
---|--- 
>
| cd ollama-js-launchdarkly
>
| touch package.json
```
Open _package.json_ in your editor. Copy the following into _package.json_ and then save the file.
```
1
| {
---|--- 
2
| "name": "ollama-launchdarkly",
3
| "version": "1.0.0",
4
| "main": "index.js",
5
| "scripts": {
6
| "test": "echo \"Error: no test specified\" && exit 1"
7
| },
8
| "author": "Your name here",
9
| "license": "MIT",
10
| "type": "module",
11
| "description": "Example app connecting Ollama with LaunchDarkly AI Configs",
12
| "dependencies": {
13
| "@launchdarkly/node-server-sdk": "^9.7.4",
14
| "@launchdarkly/server-sdk-ai": "^0.9.1",
15
| "dotenv": "^16.4.7",
16
| "ollama": "^0.5.13"
17
| }
18
| }
```
Install dependencies:
```
$
| npm install
---|--- 
```
Create a new file named _testQuery.js_. Enter the following code:
```
1
| import ollama from "ollama";
---|--- 
2
| 
3
| const response = await ollama.chat({
4
| model: "deepseek-r1:1.5b",
5
| messages: [{ role: "user", content: "Why is the sky blue?" }],
6
| });
7
| console.log(response.message.content);
```
Run this script to verify that local inference is working.
```
$
| node testQuery.js
---|--- 
```
You should see terminal output that answers the question:
```
$
| <think>
---|--- 
>
| 
>
| </think>
>
| 
>
| The color of the sky, also known as atmospheric red or violet, is primarily due to a process called Rayleigh scattering.
>
| ...
```
## Adding a custom model to LaunchDarkly AI Configs
Head over to [the model configuration page on LaunchDarkly UI](https://app.launchdarkly.com/projects/default/settings/model-configs/). Click the **Add AI model config** button. Fill out the form using the following configuration:
 * Name: deepseek-r1:1.5b
 * Provider: DeepSeek
 * Model ID: deepseek-r1:1.5b
**Model ID** represents how you intend to refer to the model in your code. **Name** is how the model will show up in the LaunchDarkly UI. If you are using a model with one of those terribly long gobbledygook names like _llama-mama-10-gajillion-u234oiru32-preview-instrukt-latest_ , giving it a shorter, human readable **Name** might make your dashboard more legible. In this case, we’re sticking with _deepseek-r1:1.5b_ since it’s relatively short and clear. Click **Save**.
Click the **Add AI model config** button again to add the second model.
 * Name: qwen:1.8b
 * Provider: Custom (Qwen)
 * Model ID: qwen:1.8b
Click **Save**.
Next, we’ll create the AI Config variation representing the prompt and model combinations that we can swap out at runtime. Variations are editable and versioned, so it’s okay to make mistakes. Click the **Create** button, and select AI Config from the menu.
Enter “model-showdown” in the AI Config name field. Click **Create**. Configure the next page like so:
 * Name: deepseek-r1:1.5b
 * Model: deepseek-r1:1.5b
 * Role: User. ([DeepSeek reasoning models aren’t optimized for System prompts.](https://huggingface.co/deepseek-ai/DeepSeek-R1#usage-recommendations))
 * Message: Why is the sky blue?
**Save changes.** To use _qwen:1.8b_ , click **Add another variation**. _Variations_ record metrics separately. In order to measure how each model performs, we need one variation per model. To compare fairly between models, keep the prompt the same in both variations. When you’re done, **Save changes**.
 * Name: qwen:1.8b
 * Model: qwen:1.8b
 * Role: User
 * Message: Why is the sky blue?
![Variations of the models we are using, in the LaunchDarkly UI.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/03866cda3fb5bac8ff7e4862279e6fbca5ab2e927ec9f9a72e5ee8d1876d022e/assets/images/tutorials/ollama-javascript/ollama-variations.png)
Variations of the models we are using, in the LaunchDarkly UI.
On the **Targeting** tab, edit the default rule to serve the deepseek-r1:1.5b variation. Click the toggle to enable the AI Config. Click **Review and save**.
![How to target and serve AI Config variations in the LaunchDarkly UI.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/7fe7967e17513bb09963e4540a982425c165cacd808ce903dad22569b22610e3/assets/images/tutorials/ollama-javascript/ollama-targeting-tab.png)
How to target and serve AI Config variations in the LaunchDarkly UI.
If your LaunchDarkly permissions require it, enter a comment to explain these changes.
There’s one more configuration step. On the … dropdown next to the **Test** environment on the **Targeting tab** , select **SDK key** to copy your SDK key to the clipboard.
![How to copy your SDK key from a project in the LaunchDarkly UI.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/95488247f669db6f5a79dc88a0c01f2a7b7bc91d9bce70d5812324f6b69172d9/assets/images/tutorials/ollama-javascript/ollama-copy-sdk-key.png)
How to copy your SDK key from a project in the LaunchDarkly UI.
Create an _.env_ file at the root of your project. Paste the following line in, replacing “YOUR KEY HERE” with your actual key.
```
$
| LAUNCHDARKLY_SDK_KEY="YOUR KEY HERE"
---|--- 
```
Save the .env file.
## Connecting LaunchDarkly AI Configs to Ollama
Back in your Node project, create a new file named _generate.js_. Add the following lines of code:
```
1
| import ollama from "ollama";
---|--- 
2
| import "dotenv/config";
3
| import launchDarkly from "@launchdarkly/node-server-sdk";
4
| import launchDarklyAI from "@launchdarkly/server-sdk-ai";
5
| 
6
| 
7
| const LD_CONFIG_KEY = "model-showdown";
8
| const DEFAULT_CONFIG = {
9
| enabled: true,
10
| model: { name: "deepseek-r1:1.5b" },
11
| // double ??s so you know it fell back to the default value
12
| messages: [{ role: "user", content: "Why is the sky blue??" }],
13
| };
14
| 
15
| 
16
| // In a real app you'd fill in this example data
17
| const userContext = {
18
| kind: "user",
19
| name: "Mark",
20
| email: "mark.s@lumonindustries.work",
21
| key: "example-user-key",
22
| };
23
| 
24
| 
25
| const ldClient = launchDarkly.init(process.env.LAUNCHDARKLY_SDK_KEY);
26
| const ldAiClient = launchDarklyAI.initAi(ldClient);
27
| 
28
| 
29
| // Wait for LaunchDarkly client to initialize
30
| async function waitForLDClient() {
31
| return new Promise((resolve) => {
32
| ldClient.once("ready", () => {
33
| resolve();
34
| });
35
| });
36
| }
37
| 
38
| 
39
| function trackMetrics(tracker, response) {
40
| if (!response) return;
41
| 
42
| 
43
| tracker.trackSuccess();
44
| 
45
| 
46
| // ollama provides duration in nanoseconds but LaunchDarkly wants milliseconds
47
| const durationInMilliseconds = response.total_duration / 1_000_000;
48
| tracker.trackDuration(durationInMilliseconds);
49
| 
50
| 
51
| // Track token usage
52
| const tokens = {
53
| input: response.prompt_eval_count,
54
| output: response.eval_count,
55
| total: response.prompt_eval_count + response.eval_count,
56
| };
57
| tracker.trackTokens(tokens);
58
| }
59
| 
60
| 
61
| async function generate(options = {}) {
62
| /**
63
| * Generates text using a large language model.
64
| * @param {Object} options - Configuration options for the generation
65
| * @returns {Promise<string|null>} The generated text or null if an error occurs
66
| */
67
| await waitForLDClient();
68
| 
69
| 
70
| console.log("User context being evaluated:", userContext);
71
| 
72
| 
73
| const configValue = await ldAiClient.config(
74
| LD_CONFIG_KEY,
75
| userContext,
76
| DEFAULT_CONFIG,
77
| options
78
| );
79
| console.log("configValue: ", configValue);
80
| const { model, tracker, messages = [] } = configValue;
81
| 
82
| 
83
| try {
84
| const response = await ollama.chat({
85
| model: model.name,
86
| messages,
87
| });
88
| console.log(response);
89
| trackMetrics(tracker, response);
90
| return response;
91
| } catch (error) {
92
| tracker.trackError(error);
93
| console.error("Error generating AI response:", error);
94
| return null;
95
| }
96
| }
97
| generate();
```
Run this code using `node generate.js` in your terminal. Output should show the response comes from deepseek-r1:1.5b.
```
$
| info: [LaunchDarkly] Opened LaunchDarkly stream connection
---|--- 
>
| {
>
| model: 'deepseek-r1:1.5b',
>
| created_at: '2025-03-03T19:16:22.082877Z',
>
| message: {
>
| role: 'assistant',
>
| content: '<think>\n' +
>
| '\n' +
>
| '</think>\n' +
>
| '\n' +
>
| "The color of the sky, or its blue appearance, is primarily due to a phenomenon called Rayleigh scattering.
>
| ...
```
Cool! Let’s try the other model. Back in [the LaunchDarkly UI](https://app.launchdarkly.com/), edit your default rule for the _model-showdown_ AI Config to serve the `qwen:1.8b` model. **Save changes**.
![How to serve the Qwen variation with AI Configs, in the LaunchDarkly app UI.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/8d3f1e5f747c4532dc2c3841b96738ab3ce80b92bf134fb391b2fa137425a7a7/assets/images/tutorials/ollama-javascript/ollama-serve-qwen-variation.png)
How to serve the Qwen variation.
Rerun `generate.js` and you’ll see the response from `qwen:1.8b`:
```
$
| model: 'qwen:1.8b',
---|--- 
>
| created_at: '2025-03-03T20:04:19.16003Z',
>
| message: {
>
| role: 'assistant',
>
| content: 'The sky appears blue to us because of a phenomenon known as Rayleigh scattering. \n' +
>
| ...
```
Some other queries you can try to test reasoning models’ capabilities:
 * What is 456 plus 789?
 * What is the color most closely matching this HEX representation: #8002c6 ?
[Google maintains an awesome list of questions to evaluate reasoning models on GitHub](https://github.com/google/BIG-bench/blob/main/bigbench/benchmark_tasks/README.md). You’ll get the most applicable results if you stick to questions that are close to your use case.
When we call `trackMetrics` in our app, the data we send is visualized in the **Monitoring** tab on the LaunchDarkly app. Our code tracks input and output tokens, request duration, and how many times each model was called (generation count).
![The metrics you can see on the Monitoring tab for each AI Config variation.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/d04519e8e9401f9e74e26a4dc873a989c5a8eb3b83d9dd0a44d3f75592508898/assets/images/tutorials/ollama-javascript/ollama-monitoring-tab.png)
The metrics you can see on the Monitoring tab for each AI Config variation.
## Wrapping it up: bring your own model, track your own metrics, take the next steps
In this tutorial you’ve learned how to run large language models locally with Ollama and query the results from a Node.js application. Furthermore, you’ve created a custom model AI Config with LaunchDarkly that tracks metrics such as latency, token usage, and generation count.
There’s so much more we could do with AI Configs on top of this foundation.
One upgrade would be to add additional metrics. For example, you could [track output satisfaction and let users rate the quality of the response](https://launchdarkly.com/docs/sdk/features/ai-metrics). If you are using LLMs in production, [AI Configs even support running A/B tests and other kinds of experiments](https://launchdarkly.com/docs/home/experimentation/types#ai-config-experiments) to determine which variation performs the best for your use case using the power of statistics.
[AI Configs also have advanced targeting capabilities](https://launchdarkly.com/docs/home/ai-configs/target). For example, you could [use a more expensive model for potentially high-value customers with enterprise-y email addresses](https://launchdarkly.com/docs/guides/ai-configs/targeting-python). Or you could give users a more linguistically localized experience by serving them a model trained in the language specified in their [accept-lang header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language).
If you want to learn more about runtime model management, here’s some further reading:
 * [Compare AI Models in Python Flask Applications — Using LaunchDarkly AI Configs](https://launchdarkly.com/blog/ai-configs-python-flask-compare-models/)
 * [Upgrade OpenAI models in ExpressJS applications — using LaunchDarkly AI Configs](https://launchdarkly.com/blog/upgrade-openai-models-expressjs-ai-configs/)
Thanks so much for following along. [Hit me up on Bluesky](https://bsky.app/profile/annthurium.bsky.social) if you found this tutorial useful. You can also reach me via email (tthurium@launchdarkly.com), [Discord](https://discord.com/invite/launchdarklycommunity), or [LinkedIn](https://www.linkedin.com/in/annthurium/).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs