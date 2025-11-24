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
 * [Step 4: Enable targeting in LaunchDarkly](#step-4-enable-targeting-in-launchdarkly)
 * [Step 5: Integrate the AI Config into your application](#step-5-integrate-the-ai-config-into-your-application)
 * [Set up the OpenAI client](#set-up-the-openai-client)
 * [Set up application data](#set-up-application-data)
 * [Add your completion](#add-your-completion)
 * [Plugging it in](#plugging-it-in)
 * [Step 6: Update configurations dynamically](#step-6-update-configurations-dynamically)
 * [Bonus: Track LLM metrics](#bonus-track-llm-metrics)
 * [Tracking success](#tracking-success)
 * [Conclusion](#conclusion)
## Overview
This guide shows how to manage AI model configuration and prompts for an OpenAI-powered application in a runtime environment. It uses the LaunchDarkly [Node.js (server-side) AI SDK](/docs/sdk/ai/node-js) and [AI Configs](/docs/home/ai-configs) to dynamically customize your application.
Using AI Configs to customize your application means you can:
 * manage your model configuration and prompts outside of your application code
 * enable non-engineers to iterate on prompt and model configurations
 * apply updates to prompts and configurations without redeploying your application
This guide steps you through the process of working in your application and in LaunchDarkly to customize your application.
If you’re already familiar with setting up AI Configs in the LaunchDarkly UI and want to skip straight to the sample code, you can [find it on GitHub](https://github.com/launchdarkly-labs/aiconfig-nodejs-docs-example).
##### Additional resources for AI Configs
If you’re not familiar with AI Configs and would like additional explanation, you can start with the [Quickstart for AI Configs](/docs/home/ai-configs/quickstart) and come back to this guide when you’re ready for a more realistic example.
You can find reference guides for each of the AI SDKs at [AI SDKs](/docs/sdk/ai).
## Prerequisites
To complete this guide, you must have the following prerequisites:
 * a LaunchDarkly account, including
 * a LaunchDarkly [SDK key](/docs/home/account/environment/keys#sdk-credentials) for your environment.
 * a role that allows [AI Config actions](/docs/home/account/roles/role-actions#ai-config-actions). The LaunchDarkly Project Admin, Maintainer, and Developer project roles, as well as the Admin and Owner base roles, all include this ability.
 * a Node.js (server-side) application. This guide provides sample code in TypeScript. You can omit the types if you are using JavaScript.
 * an OpenAI API key. The LaunchDarkly AI SDKs provide specific functions for completions for several common AI model families, and an option to record this information yourself. This guide uses OpenAI.
## Example scenario
In this example, you manage a product recommendation system for an e-commerce platform. Using the LaunchDarkly Node.js (server-side) AI SDK, you’ll configure AI prompts to provide personalized product suggestions based on your customers’ preferences. You’ll also track metrics, such as the number of output tokens used by your generative AI application.
## Step 1: Prepare your development environment
First, install the required SDKs:
npmyarn
```
$
| npm install @launchdarkly/node-server-sdk @launchdarkly/server-sdk-ai
---|--- 
```
Then, set up credentials in your environment:
Set up environment variables for your credentials
```
$
| export OPENAI_API_KEY=your_openai_api_key
---|--- 
>
| export LAUNCHDARKLY_SDK_KEY=your_launchdarkly_sdk_key
```
If you are starting from scratch, you can use the Node [dotenv](https://www.dotenv.org/) package in conjunction with a `.env` file to load your API keys.
## Step 2: Initialize LaunchDarkly SDK clients
Inside of your project, create a shared utility for initializing the LaunchDarkly SDK and its AI client.
Create a [`config/launchDarkly.ts`](https://github.com/launchdarkly-labs/aiconfig-nodejs-docs-example/blob/main/src/config/launchdarkly.ts) file:
config/launchdarkly.ts
```
1
| import { init, LDClient } from "@launchdarkly/node-server-sdk";
---|--- 
2
| import { initAi, LDAIClient } from "@launchdarkly/server-sdk-ai";
3
| 
4
| const LD_SDK_KEY = process.env.LAUNCHDARKLY_SDK_KEY;
5
| 
6
| const ldClient: LDClient = init(LD_SDK_KEY as string);
7
| 
8
| const aiClient: LDAIClient = initAi(ldClient);
9
| // Initialize and return the LaunchDarkly client
10
| export const getLaunchDarklyClients = async () => {
11
| try {
12
| await ldClient.waitForInitialization({ timeout: 10 });
13
| } catch (err) {
14
| // log your error
15
| }
16
| return { ldClient, aiClient };
17
| };
```
## Step 3: Set up AI Configs in LaunchDarkly
Next, create an AI Config in the LaunchDarkly UI. AI Configs are the LaunchDarkly resources that manage model configurations and messages for your generative AI applications.
To create an AI Config:
 1. In LaunchDarkly, click **Create** and choose **AI Config**.
 2. In the “Create AI Config” dialog, give your AI Config a human-readable **Name** , for example, “chat-helper-v1” or “shopping assistant.”
 3. Click **Create**.
Then, configure the model and prompt by creating a variation. Every AI Config has one or more variations, each of which includes your AI messages and model configuration.
Here’s how:
 1. In the create panel in the **Variations** tab, replace “Untitled variation” with a variation **Name**. You’ll use this to refer to the variation when you set up targeting rules, below.
 2. Click **Select a model** and select a supported OpenAI model, for example, gpt-4o.
 3. Optionally, adjust the model parameters: click **Parameters** to view and update model parameters. In the dialog, adjust the model parameters as needed. The **Base value** of each parameter is from the model settings. You can choose different values for this variation if you prefer.
Next, add system, user, or assistant messages to define your prompt. In this example, you’ll augment the prompt with saved user preferences.
Start with the **system** message:
System message
```
You are an e-commerce shopping assistant. You help users find products that match their preferences. 
--- 
```
Now, add an assistant message that pre-loads the model with the user’s preferences and provides some instructions about the input format, response format, and context:
Assistant message
```
Products are listed in the following format: [Product Name, Product ID, Product Type, {Preference tags}] 
--- 
The user's preferences are {{preferences}} 
The products available for purchase are: {{productsAvailable}} 
Return the matched products as a list in the following format: 
- [productName, productId] 
- [productName, productId] 
Address the response to {{ldctx.name}} 
```
The double curly braces in the prompts allow you to augment the messages with customized data at runtime. To learn more, read [Syntax for customization](/docs/sdk/features/ai-config#syntax-for-customization).
Within the UI, the variation will look like the following:
![The completed variation for your AI Config.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/8ac99bd6f455e7f8276ff574c66871f29f00aa4cf06266786eb53e71d7f097fd/assets/images/__toPlaywright_newIA/guide-ai-config-model-config-initial-variation.png)
The completed variation for your AI Config.
Click **Save changes** at the bottom of the page to save the configuration.
## Step 4: Enable targeting in LaunchDarkly
[Targeting](/docs/home/getting-started/vocabulary#target) is how you specify that specific end users working in your application will receive specific variations that you’ve created in your AI Config.
To set up targeting, click the **Targeting** tab. Targeting for AI Configs is on by default. Set the default targeting rule to serve the “Shopping preference assistant” variation you just created for your test environment.
To specify the AI Config variation to use by default when the AI Config is toggled on:
 1. Select the **Targeting** tab for your AI Config.
 2. In the “Default rule” section, click **Edit**.
 3. Configure the default rule to serve the shopping preference assistant variation.
 4. Click **Review and save**. In the confirmation dialog, click **Save changes**.
By default, this AI Config will now serve the variation shopping preference assistant variation:
![The default rule in your AI Config.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/8f856005a0407272fdcbb676d94a6c75e89ae8e65feb21a56f86001a3d4586ce/assets/images/__toPlaywright_newIA/guide-ai-config-model-config-default-rule-new.png)
The default rule in your AI Config.
## Step 5: Integrate the AI Config into your application
To integrate the LaunchDarkly AI Config into your application, you’ll need to set up your OpenAI client, set up your application data, add your completion code, and finally put it all together.
### Set up the OpenAI client
Next, set up your OpenAI client. Following a similar pattern as above, create a [`config/openAi.ts`](https://github.com/launchdarkly-labs/aiconfig-nodejs-docs-example/blob/main/src/config/openAI.ts) file to initialize the OpenAI client:
config/openAI.ts
```
1
| import { OpenAI } from "openai";
---|--- 
2
| 
3
| let openaiClient: OpenAI;
4
| 
5
| export const getOpenAI = () => {
6
| if(!openaiClient) {
7
| openaiClient = new OpenAI();
8
| }
9
| return openaiClient;
10
| }
```
### Set up application data
Then, set up the data for your application. Normally, the product data that your application retrieves would come from a database. For this example, create a [`data/products.ts`](https://github.com/launchdarkly-labs/aiconfig-nodejs-docs-example/blob/main/src/data/products.ts) file to serve mock data:
data/products.ts
```
1
| import { productsAvailable } from "./mockProducts";
---|--- 
2
| 
3
| export type Product = {
4
| name: string;
5
| productId: string;
6
| description: string;
7
| price: number;
8
| type: "shoes" | "clothing" | "accessories";
9
| preferenceTags: string[];
10
| }
11
| 
12
| export const getProducts = () => {
13
| return {
14
| productsAvailable,
15
| }
16
| }
17
| 
18
| // format is [Product Name, Product ID, Product Type, {Preference tags}]
19
| export const formatProductForCompletion = (product: Product) => {
20
| return `[${product.name}, ${product.productId}, ${product.type}, ${product.preferenceTags.join(", ")}]`
21
| }
```
Additionally, add the following [`data/mockProducts.ts`](https://github.com/launchdarkly-labs/aiconfig-nodejs-docs-example/blob/main/src/data/mockProducts.ts) file in the same folder:
data/mockProducts.ts (partial)
```
1
| import { Product} from "./products"
---|--- 
2
| 
3
| export const productsAvailable: Product[] = [
4
| {
5
| name: "AeroGlide Elite Runner 3.0",
6
| productId: "1",
7
| description: "Versatile running shoes with responsive cushioning",
8
| type: "shoes",
9
| price: 120,
10
| preferenceTags: ["athletic", "running", "comfort"]
11
| },
12
| // complete list of products available in linked file
13
| ]
```
The data contains the name, price, type, preference tags to match to a customer’s preferences, a description, and a product ID. This should give the AI model ample data to match to a customer’s query.
### Add your completion
Next, add the AI Config and completion code into your application. Create a [`completions/shoppingAssistant.ts`](https://github.com/launchdarkly-labs/aiconfig-nodejs-docs-example/blob/main/src/completions/shoppingAssistant.ts) file:
completions/shoppingAssistant.ts
```
1
| import { LDContext } from "@launchdarkly/node-server-sdk";
---|--- 
2
| import { getLaunchDarklyClients } from "../config/launchdarkly";
3
| import { getOpenAI } from "../config/openAI";
4
| import { formatProductForCompletion, getProducts } from "../data/products";
5
| import { LDFeedbackKind } from "@launchdarkly/server-sdk-ai";
6
| 
7
| export const completeShoppingAssistant = async (userName: string, userMessage: string, userPreferences: string[]) => {
8
| const openaiClient = getOpenAI();
9
| 
10
| const { productsAvailable } = await getProducts();
11
| 
12
| const { aiClient } = await getLaunchDarklyClients();
13
| // Create the user context for this request
14
| const ctx: LDContext = {
15
| // The context key should be unique to this end user
16
| // You can use any generated value
17
| key: "example-user-key",
18
| kind: "user",
19
| name: userName,
20
| };
21
| 
22
| // Retrieve the AI Configuration for this context
23
| const aiConfig = await aiClient.config(
24
| // The AI Config key, which you can copy from the sidebar in the LaunchDarkly UI
25
| "chat-helper-v1",
26
| // The context for this request
27
| ctx,
28
| // A fallback configuration
29
| // For this example, skip execution if the AI Config is disabled
30
| {},
31
| // The parameters for this AI Config
32
| // These will replace the {{}} placeholders in the LaunchDarkly UI
33
| {
34
| preferences: userPreferences,
35
| // Fetch our mock product data and format it for the completion matching the format we provided to the model
36
| productsAvailable: productsAvailable.map(product => formatProductForCompletion(product)),
37
| }
38
| );
39
| 
40
| // If the AI Config is disabled, make sure to handle that appropriately
41
| if (!aiConfig.enabled) {
42
| // Application path to take when the aiConfig is disabled
43
| // For example, you could show a message that the shopping assistant
44
| // is not available and customers should try again later
45
| console.log("AI Config is disabled");
46
| }
47
| 
48
| // Track the completion and return the result
49
| const completion = await aiConfig.tracker.trackOpenAIMetrics(async () => await openaiClient.chat.completions.create({
50
| model: aiConfig.model!.name as string,
51
| messages: [
52
| // Add the system and assistant messages from the AI Config, as well as the user message
53
| ...aiConfig.messages!,
54
| { role: "user", content: userMessage }
55
| ],
56
| }))
57
| 
58
| return `<pre>${completion.choices[0].message.content}</pre>`;
59
| };
```
Notice that you need to wrap the completion call in one of the provided methods from the LaunchDarkly SDK (`trackOpenAIMetrics`). This enables you to monitor the performance of your application, below.
### Plugging it in
Now that you’ve set up the AI Config and completion, you need to plug this into your app somewhere where you can get a response.
Here’s an example:
index.ts (excerpt)
```
1
| await completeShoppingAssistant("Sandy", "I'm looking for a fitness tracker", ["premium"])
---|--- 
```
With these parameters, run your application and you should get a response that looks like this:
Example response
```
Hi Sandy! Based on your preference for premium products, here are the fitness trackers that match your request: - [RaceTracker Pro GPS Elite, 16] 
--- 
```
You can play around with the preferences or the query passed in to see different results.
At this point, when you run your application, you receive a response from the model that has relevant results to customized to the input, but the formatting isn’t customer-facing. If you were storing your prompts in code, this would require a code change to format differently. However, because you have it in an AI Config, you can update the formatting without having to touch the code or redeploy the application.
## Step 6: Update configurations dynamically
Next, let’s adjust the formatting. You can do this without changing application code, or even requiring developer involvement. If any member of your team wants to edit the prompt, adjust the formatting or tone, or make any changes, they can do that directly from the LaunchDarkly UI.
In the LaunchDarkly UI, navigate to the **Variations** tab of the AI Config you created earlier. You’ll edit the existing variation to reflect the formatting you’d prefer for the output. You’ll also update the system messaging to be a bit more friendly and less academic.
First, edit the existing variation and adjust the system message to the following:
Updated system message
```
You are an e-commerce shopping assistant. You help users find products that match their preferences. Your tone should be friendly and warm, as if you're a friend shopping with the person purchasing the items. 
--- 
```
Next, adjust the formatting on the assistant response format message to be more customer-facing, provide the result in more nicely-formatted Markdown, and provide a link to the product in the catalog:
Updated assistant message
```
Products are listed in the following format: [Product Name, Product ID, Product Type, {Preference tags}] 
--- 
The user's preferences are {{preferences}} 
The products available for purchase are: {{productsAvailable}} 
Return the matched products as a list in the following format with each product on a new line: 
##[productName](https://my-store-url/product/{productId})\n 
productDescription\n\n 
##[productName](https://my-store-url/product/{productId})\n 
productDescription\n\n 
Address your response to {{ldctx.name}} 
```
With these parameters, run your application again:
index.ts (excerpt)
```
1
| await completeShoppingAssistant("Sandy", "I'm looking for some running shoes", ["athletic", "casual", "running"])
---|--- 
```
and you should get a response that looks like this:
Example response
```
Hey Sandy! Let's find the perfect running shoes for you. Based on your preferences, here are some options I think you'll love: 
--- 
##[AeroGlide Elite Runner 3.0](https://my-store-url/product/1) 
These shoes are designed for athletic performance and running. They offer incredible comfort, making them a great choice for your runs. Perfect for keeping a steady pace while feeling great on your feet! 
##[PowerBoost Pro Runner X22](https://my-store-url/product/5) 
These premium running shoes elevate your run with their top-notch design and superior performance. Ideal for serious runners who want that extra boost on the track! 
##[CloudStep Comfort Runner](https://my-store-url/product/9) 
Focused on comfort, these running shoes are neutral yet supportive, ensuring you have a smooth, enjoyable run every time. They're perfect for everyday runs and long distances alike. 
##[UltraGlide Distance Elite](https://my-store-url/product/12) 
For those long-distance runs, these premium shoes offer unbeatable performance. They're a great choice if you're looking to cover miles with ease and efficiency. 
I hope one of these pairs catches your eye! Let me know if you need more information or help deciding. Happy running! 
```
The output now contains a friendlier message, links to the products, and provides the descriptions in Markdown format. As long as you’re providing the data in the completion input context, you can update this output to contain any of the input parameters without the need for code changes.
## Bonus: Track LLM metrics
When you set up the OpenAI completion call, you wrapped it in a function called `trackOpenAIMetrics`. This function automatically captures metrics pertaining to the LLM calls for OpenAI:
completions/shoppingAssistant.ts (excerpt)
```
1
| const completion = await aiConfig.tracker.trackOpenAIMetrics(async () => await openaiClient.chat.completions.create({
---|--- 
2
| model: aiConfig.model!.name as string,
3
| messages: [
4
| // Add the system and assistant messages from the AI Config, as well as the user message
5
| ...aiConfig.messages!,
6
| { role: "user", content: userMessage }
7
| ],
8
| }))
```
After you’ve run your completion a few times, check the **Monitoring** tab for your AI Config in the LaunchDarkly UI. The **Monitoring** tab displays metrics that are automatically tracked, including:
 * Generation count
 * Input tokens used
 * Output tokens used
In combination with LaunchDarkly’s targeting rules, you can duplicate the prompts with different models and messages to see the differences in their generation patterns.
### Tracking success
You can also use the LaunchDarkly AI client to keep a running total of positive and negative sentiment about the prompt generation.
If you have a process that validates your prompts at runtime, you can use the following:
Track feedback
```
1
| aiConfig.tracker.trackFeedback({ kind: LDFeedbackKind.Positive | LDFeedbackKind.Negative })
---|--- 
```
If you wait for customer interaction to capture whether the result was a positive or negative generation, you can instead call the SDK function asynchronously, by providing the same context to the configuration and tracking it:
Track feedback, asynchronously
```
1
| const aiConfig = await aiClient.config("chat-helper-v1", ctx, {})
---|--- 
2
| aiConfig.tracker.trackFeedback({ kind: LDFeedbackKind.Positive })
```
## Conclusion
In this guide, you reviewed how to manage AI model configuration and prompts for an OpenAI-powered application, and how to dynamically customize your application.
Using AI Configs with the LaunchDarkly AI SDKs means you can:
 * modify AI prompts and model parameters directly in LaunchDarkly
 * empower non-engineers to refine AI behavior without code changes
 * gain insights into model performance and token consumption
To learn more, read [AI Configs](/docs/home/ai-configs) and [AI SDKs](/docs/sdk/ai).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs