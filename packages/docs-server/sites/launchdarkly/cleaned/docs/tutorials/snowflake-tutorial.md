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
 * [Authenticate with Snowflake](#authenticate-with-snowflake)
 * [Set up an AI Config](#set-up-an-ai-config)
 * [Set up the server](#set-up-the-server)
 * [Set up an ExpressJS application](#set-up-an-expressjs-application)
 * [Basic setup](#basic-setup)
 * [.env](#env)
 * [package.json](#packagejson)
 * [index.ts](#indexts)
 * [index.html](#indexhtml)
 * [Make our completion calls](#make-our-completion-calls)
 * [Run the app](#run-the-app)
 * [Make runtime changes](#make-runtime-changes)
 * [Setting up monitoring](#setting-up-monitoring)
 * [Wrapping up](#wrapping-up)
_Published August 21st, 2025_
![portrait of Andrew Klatzke.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/c1b914e6aa3057309e7dc2849f92ffa57250fac582bd3bfffa2025bd6d565015/assets/images/authors/andrew-klatzke.png)
by Andrew Klatzke
## Overview
This tutorial walks through an integration between the Snowflake Cortex Completion API and [LaunchDarkly’s AI SDKs](https://launchdarkly.com/docs/sdk/ai#ai-sdks). We’ll be using a Snowflake Personal Access Token to query the Cortex API and receive completion responses.
Leveraging Snowflake’s gateway approach to completions alongside LaunchDarkly’s ability to make runtime changes to AI Configs, you can update the models, prompts, and parameters that you’re using in the Snowflake endpoints in real-time.
This tutorial is presented in TypeScript, but since we’re using Snowflake’s REST API it’s universal to any language in which you can access Snowflake. Snowflake additionally has a Python package that can be used to access their AI and ML functions.
## Authenticate with Snowflake
If you are new to Snowflake, there is some setup you’ll need to do to get an application running, like setting up a user that is able to access the API.
Head into your Snowflake instance and follow the guide provided by Snowflake for [authenticating against the REST API](https://docs.snowflake.com/en/developer-guide/snowflake-rest-api/authentication), and the guide for [authenticating against the Cortex REST API](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-rest-api#setting-up-authentication).
Pay attention to:
 * It’s recommended to create a new user to access the API so that its permissions, privileges and access can be limited to the necessary scope
 * Make sure to grant the role of the user you’re authenticating as a `SNOWFLAKE.CORTEX_USER` database role if it’s not already present
 * If you are using a [Personal Access Token](https://docs.snowflake.com/en/developer-guide/snowflake-rest-api/authentication#label-sfrest-authenticating-pat), make sure to apply a [Network Policy](https://docs.snowflake.com/en/user-guide/network-policies) that allow-lists the IP you’ll be accessing from
**Admin Privileges Required for Network Policies**
You need admin privileges to create Network Policies for Personal Access Token authentication. If you don’t have admin access:
 * Create a fresh Snowflake trial account (where you’ll have admin access)
 * Or contact your Snowflake administrator for help with authentication setup
 * Enterprise/work accounts typically don’t grant these privileges to regular users
 * Capture your account identifier, which can be found by accessing the lower-left button on the UI that contains your name and account role.
 * Click your name
 * Hover over your active account
 * In the popover menu, select “View account details”
 * Copy the field labeled “Account/Server URL”
## Set up an AI Config
Before we write any code, we’ll go into LaunchDarkly and create an AI Config to be used in the integration.
Navigate to your LaunchDarkly instance and follow these steps:
 1. Navigate to “AI Configs” and click “Create AI Config” on the top-right side
![Create an AI Config](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/55c47083a295d78e04032e94cd87bad86cfebb32eec4fb1117af9c54da67917c/assets/images/tutorials/snowflake-tutorial/create-ai-config.png)
Create an AI Config
 1. Give your Config a name, and then select “Cortex” from the provider dropdown.
![Select Cortex](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/05a4f18e814b1751004cd7c1def5fd3497b587f1fa2c5248c870facf0d38a076/assets/images/tutorials/snowflake-tutorial/select-cortex.png)
Select Cortex
 1. Now that Cortex is selected, the model dropdown will be filtered to the available models. For this first variation, we’ll select `claude-3-5-sonnet`
Make sure that the region you’re accessing from has support for the model you select. You can view model availability on [this page](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-rest-api#model-availability).
![Select Claude](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/4e0a9207ef60062bca6bc31978a270ae2b679b50b1fa36e15891112f133b581a/assets/images/tutorials/snowflake-tutorial/select-claude.png)
Select Claude
 1. Add your messages for the completion. We’ll add a single system message, as well as a template for where the user message will go:
![Add messages](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/ca7e6ca18a627c2befea2faa879ac5ec1f2ec7c3a32820921bf7efcbc013a81a/assets/images/tutorials/snowflake-tutorial/add-messages.png)
Add messages
`{{variables}}` signify a variable that will be replaced at the time you retrieve your config. This is how you provide dynamic content to your Configs such as contextual user information
 1. Click “Review and save”. You’ll be given a chance to review your changes before committing them.
![Review and save](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/d2f14ce577cbc9bf6842a46c2b517c213a799f2a227c57dad2b8a36e8dc9b1ad/assets/images/tutorials/snowflake-tutorial/review-and-save.png)
Review and save
 1. Your AI Config is now saved so it’s time to serve our new variation to our users. Click the “Targeting” tab on the top of the AI Config:
![Targeting tab](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/88bb6f7fe7c7d0fe1defb0ba7a3aaafd812c1c867ebff3587a0260dc5eb1e875/assets/images/tutorials/snowflake-tutorial/targeting-tab.png)
Targeting tab
 1. By default your Config will be serving the `disabled` variation which is used to signal that a Config is turned off. We’ll revisit this aspect later in the code.
![Default disabled](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/3380d098bae52423f8bb4310c7c76eb29f19ee1a8b303150f85456e1b3a39a58/assets/images/tutorials/snowflake-tutorial/default-disabled.png)
Default disabled
 1. Click “Edit” on the default rule and select your variation from the dropdown, click “Review and save”, and then confirm the changes:
![Select variation](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/bb18b550ee69462956858096acd66a18c05733bd9e1a69271a4895c45945060c/assets/images/tutorials/snowflake-tutorial/select-variation.png)
Select variation
You’ve now targeted a variation which can be served in the SDK. We’ll come back to this later once we’ve got some code set up. For now, just copy the key in your sidebar for later:
![Copy key](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/0fec43e88c5759899c263530a69143979ff860a878937147dcd57d8d894d7290/assets/images/tutorials/snowflake-tutorial/copy-key.png)
Copy key
## Set up the server
Next, we’ll set up our sample application so that we can see LaunchDarkly AI Configs and the Snowflake REST API interacting in real-time. This section assumes some knowledge with TypeScript and the NodeJS ecosystem, but can be accomplished in any language with [AI SDK support](https://launchdarkly.com/docs/sdk/ai#ai-sdks).
For the following sections, these are instructions to set it up as a new application. If you’re not concerned about which piece does what or having a clean slate, you can also just clone this repository and run `npm install` and then `npm run start` after filling out the `.env` section.
### Set up an ExpressJS application
Follow the [ExpressJS installation guide](https://expressjs.com/en/starter/installing.html) to set up a new project leveraging Express.
#### Basic setup
Let’s create some of the structure we’ll need for the app:
```
$
| mkdir app views
---|--- 
>
| touch index.ts package.json views/index.html app/launchdarklyClient.ts app/completions.ts
>
| cp .env.example .env
```
#### `.env`
The last command created a `.env` file that we’ll use to register our secrets so they can be securely loaded by the application.
Within this file, fill out the following values:
```
$
| SNOWFLAKE_ACCOUNT_IDENTIFIER=<Snowflake account identifier>.snowflakecomputing.com
---|--- 
>
| SNOWFLAKE_PAT=<Snowflake Personal Access Token>
>
| 
>
| LAUNCHDARKLY_SDK_KEY=<LaunchDarkly SDK key>
>
| LAUNCHDARKLY_AI_CONFIG_KEY=<LaunchDarkly AI Config key>
>
| PORT=3000
```
The Snowflake account identifier and Personal Access Token should be available from following the authentication instructions for Snowflake.
If you do not know how to get your LaunchDarkly SDK key, you can follow [this guide](https://launchdarkly.com/docs/sdk/concepts/getting-started).
#### `package.json`
Grab the contents of the `package.json` file from the repository and replace your local `package.json` file.
Now run `npm install` to install our dependencies. Once that finishes, run `typescript --init` from the project folder to create a `tsconfig.json` file. You’ll need the dependencies in here to process TypeScript files and run your local application.
The dependencies in this file do the following:
 * Add TypeScript support to ExpressJS (`@types/express`, `typescript`)
 * Add utilities to run the application (`nodemon`, `ts-node`, `dotenv`)
 * Initialize the LaunchDarkly SDKs (`@launchdarkly/node-server-sdk`, `@launchdarkly/server-sdk-ai`)
We are using default TypeScript settings. Feel free to edit these to match your project’s needs.
#### `index.ts`
The `index.ts` file is responsible for initializing the application. We’ll be including two routes; one to render an HTML page and one to respond to the completion.
Grab the `index.ts` file from the repo and replace this content. The file has comments explaining the functionality.
#### `index.html`
Replace the `index.html` file in `views/index.html` with the same content from the repository, or use it as a guideline to build your own interface for the chat. This file is also commented, but outside of the HTML structure, you’ll want to pay attention to the `<script>` at the bottom of the page which handles making the API call.
### Make our completion calls
Now that we have an application, we can start wiring up LaunchDarkly to the Snowflake API.
We’ll set up the LaunchDarkly clients in `app/launchdarklyClient.ts`:
```
1
| import { LDClient, init } from "@launchdarkly/node-server-sdk";
---|--- 
2
| import { LDAIClient, initAi } from "@launchdarkly/server-sdk-ai";
3
| 
4
| let ldClient: LDClient;
5
| function getSDKClient() {
6
| if (!ldClient) {
7
| ldClient = init(process.env.LAUNCHDARKLY_SDK_KEY!);
8
| }
9
| 
10
| return ldClient;
11
| }
12
| 
13
| let aiClient: LDAIClient;
14
| function getAIClient() {
15
| if (!aiClient) {
16
| aiClient = initAi(getSDKClient());
17
| }
18
| return aiClient;
19
| }
20
| 
21
| // Initialize and return the LaunchDarkly client
22
| export async function getLaunchDarklyClients() {
23
| const ldClient = getSDKClient();
24
| const aiClient = getAIClient();
25
| 
26
| try {
27
| await ldClient.waitForInitialization({ timeout: 10 });
28
| } catch (err) {
29
| // log your error.
30
| }
31
| 
32
| return { ldClient, aiClient };
33
| }
34
| 
35
| export async function closeLaunchDarklyClients() {
36
| await ldClient.flush();
37
| ldClient.close();
38
| }
```
The LaunchDarkly AI SDK allows you to use the features of AI Configs within the LaunchDarkly SDK.
Within `app/completions.ts` let’s go ahead and set up the Snowflake call:
```
1
| import { getLaunchDarklyClients } from './launchdarklyClient';
---|--- 
2
| // Base URL
3
| const SNOWFLAKE_BASE_URL = `https://${process.env.SNOWFLAKE_ACCOUNT_IDENTIFIER}`
4
| // Completion endpoint
5
| const SNOWFLAKE_COMPLETE_URL = `${SNOWFLAKE_BASE_URL}/api/v2/cortex/inference:complete`
6
| 
7
| const snowflakeCompletionClient = async (body: Record<string, any>) => {
8
| const headers = {
9
| 'Content-Type': 'application/json',
10
| // Includes the authorization token on the request
11
| 'Authorization': `Bearer ${process.env.SNOWFLAKE_PAT}`,
12
| 'Accept': 'application/json'
13
| }
14
| // Run a fetch on the Snowflake completion URL
15
| return fetch(SNOWFLAKE_COMPLETE_URL, {
16
| method: 'POST', 
17
| headers,
18
| // We are not going to stream our responses, so pass `stream:false` to all instances of this invocation
19
| body: JSON.stringify({...body, stream: false}),
20
| })
21
| }
22
| 
23
| export async function runSnowflakeCompletion(userInput: string) {
24
| // Retrieve the AI Client from LaunchDarkly
25
| const { aiClient } = await getLaunchDarklyClients();
26
| // Set up the user's context; this can be used to control which variations the users receive. You can target against any attribute passed in this context.
27
| const userContext = {
28
| type: 'user',
29
| name: 'John Doe',
30
| key: `user-${Math.random().toString(36).substring(2, 15)}`
31
| }
32
| // Retrieve the AI Config from the LD SDK
33
| const config = await aiClient.config(
34
| // This is the key of our config
35
| process.env.LAUNCHDARKLY_AI_CONFIG_KEY!, 
36
| // Context
37
| userContext, 
38
| // Defaults - can be left empty unless you want to provide
39
| // default values if the AI Config is not found.
40
| {}, 
41
| // These variables are automatically interpolated into the 
42
| // messages returned from the SDK. Here, we're providing the
43
| // user's actual query, but this can be used for other runtime data augmentation purposes
44
| { userInput }
45
| )
46
| // Check that the config is enabled and conforms to the shape we would expect.
47
| // Some calls may omit things like the `messages` array when just changing models.
48
| if(!config.enabled || !config.model || !config.messages) {
49
| throw new Error("Malformed config")
50
| }
51
| // Make the call to the Snowflake API
52
| const run = await snowflakeCompletionClient({
53
| // The model name is provided dynamically, which means we
54
| // can change this at runtime with AI Configs!
55
| model: config.model.name,
56
| messages: config.messages,
57
| })
58
| 
59
| const result = await run.json();
60
| // Extract the top choice of message and return it to the client
61
| const response = result.choices?.[0]?.message.content ?? "No response from Snowflake"
62
| 
63
| return { response, model: config.model.name };
64
| }
```
### Run the app
Navigate to your root directory and run `npm run start` to start the application.
When you navigate to `localhost:3000` (or whichever port you changed it to) you should see a simple screen that looks like this:
![Landing page](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/14859d274734a4378666452c4be47afe4347fb03cb9e794483b817ab5c98c92b/assets/images/tutorials/snowflake-tutorial/landing-screen.png)
Landing page
Enter a query into the textarea, such as “How do I create a user in Snowflake?” and after a few moments a response will be generated:
![Landing page with completion](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/40b093e25e6debcfd706ce21b5ff7508404b4fe774d16d5c7df9ce6faca04154/assets/images/tutorials/snowflake-tutorial/landing-page-complete.png)
Landing page with completion
We can see in the response that it lists the model we’re using to generate the completion.
## Make runtime changes
Now that we have a completion endpoint set up, let’s create a new variation and change the model at runtime. You can minimize your code editor for now; we’ll only need to make changes in the LaunchDarkly UI!
 1. Navigate back to your AI Config in the LaunchDarkly UI
 2. Click “Add another variation” and then repeat the steps from earlier, but this time select a different model. We’ll use `llama3.1-8b` and edit the system message slightly for tone:
![Adding a second variation](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/90ff13c4f12f5e225376082d5d55d0bd29ecb67e63167c0a2a57e5cce4fbf208/assets/images/tutorials/snowflake-tutorial/second-variation.png)
Adding a second variation
 1. Click save and head back over to targeting
 2. On the targeting page, edit the default rule and select the new variation you created:
![Second variation selection](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/5bd5c947cc8fb58a1f30d55a4c1b77b0271f9a27f99f11e75f231cdfc94e55c3/assets/images/tutorials/snowflake-tutorial/llama-variation.png)
Second variation selection
 1. Click save and confirm the changes
Now, let’s head back over to our app on the `localhost` URL. Without refreshing the page or restarting the server, go ahead and re-submit the request.
Our output was now generated by our `llama3.1-8b` model rather than the Sonnet model we were leveraging earlier:
![Llama output](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/6a54d5c7b8d930342cc3861483ee27509d9e3d979494095c23b5d07c7f733b12/assets/images/tutorials/snowflake-tutorial/llama-output.png)
Llama output
And that’s it! We’ve now made a runtime model change on an active AI Config.
We didn’t have to change any code to change the model, and there’s more we can tweak such as the model’s parameters and messages. We can add messages and have them automatically inserted at runtime, test different models on different customers, and tweak parameters in a live system to see how the models respond in real-world conditions.
The last point we’ll touch on is how we can optionally capture data about our AI Config invocations and send those over to LaunchDarkly.
### Setting up monitoring
To set up monitoring, we need to extract the `tracker` object from our AI Config and call some `track` methods that will communicate the metrics to LaunchDarkly.
Let’s update the `app/completions.ts` file to include tracking:
```
1
| import { LDAIConfigTracker } from '@launchdarkly/server-sdk-ai';
---|--- 
2
| import { getLaunchDarklyClients } from './launchdarklyClient';
3
| // Base URL
4
| const SNOWFLAKE_BASE_URL = `https://${process.env.SNOWFLAKE_ACCOUNT_IDENTIFIER}`
5
| // Completion endpoint
6
| const SNOWFLAKE_COMPLETE_URL = `${SNOWFLAKE_BASE_URL}/api/v2/cortex/inference:complete`
7
| 
8
| const snowflakeCompletionClient = async (body: Record<string, any>) => {
9
| const headers = {
10
| 'Content-Type': 'application/json',
11
| // Includes the authorization token on the request
12
| 'Authorization': `Bearer ${process.env.SNOWFLAKE_PAT}`,
13
| 'Accept': 'application/json'
14
| }
15
| // Run a fetch on the Snowflake completion URL
16
| return fetch(SNOWFLAKE_COMPLETE_URL, {
17
| method: 'POST', 
18
| headers,
19
| // We are not going to stream our responses, so pass `stream:false` to all instances of this invocation
20
| body: JSON.stringify({...body, stream: false}),
21
| })
22
| }
23
| 
24
| export async function runSnowflakeCompletion(userInput: string) {
25
| // Retrieve the AI Client from LaunchDarkly
26
| const { aiClient } = await getLaunchDarklyClients();
27
| // Set up the user's context; this can be used to control which variations the users receive. You can target against any attribute passed in this context.
28
| const userContext = {
29
| type: 'user',
30
| name: 'John Doe',
31
| key: `user-${Math.random().toString(36).substring(2, 15)}`
32
| }
33
| // Retrieve the AI Config from the LD SDK
34
| const config = await aiClient.config(
35
| // This is the key of our config
36
| process.env.LAUNCHDARKLY_AI_CONFIG_KEY!, 
37
| // Context
38
| userContext, 
39
| // Defaults - can be left empty unless you want to provide
40
| // default values if the AI Config is not found.
41
| {}, 
42
| // These variables are automatically interpolated into the 
43
| // messages returned from the SDK. Here, we're providing the
44
| // user's actual query, but this can be used for other runtime data augmentation purposes
45
| { userInput }
46
| )
47
| // Extract the tracker from the AI Config
48
| const { tracker } = config;
49
| // Check that the config is enabled and conforms to the shape we would expect.
50
| // Some calls may omit things like the `messages` array when just changing models.
51
| if(!config.enabled || !config.model || !config.messages) {
52
| // Track an error if the config is not enabled or does not conform to the shape we would expect.
53
| tracker.trackError();
54
| throw new Error("Malformed config")
55
| }
56
| try {
57
| const durationStart = Date.now();
58
| 
59
| // Make the call to the Snowflake API
60
| const run = await snowflakeCompletionClient({
61
| // The model name is provided dynamically, which means we
62
| /// can change this at runtime with AI Configs!
63
| model: config.model.name,
64
| messages: config.messages,
65
| })
66
| 
67
| const durationEnd = Date.now();
68
| 
69
| const result = await run.json();
70
| // Track a successful completion
71
| tracker.trackSuccess();
72
| // Track the duration of the completion
73
| tracker.trackDuration(durationEnd - durationStart);
74
| // Track the tokens used in the completion
75
| if (result.usage) {
76
| tracker.trackTokens({
77
| total: result.usage.total_tokens,
78
| input: result.usage.prompt_tokens,
79
| output: result.usage.completion_tokens,
80
| });
81
| }
82
| 
83
| // Extract the top choice of message and return it to the client
84
| const response = result.choices?.[0]?.message.content ?? "No response from Snowflake"
85
| 
86
| return { response, model: config.model.name };
87
| } catch(error) {
88
| // An error occurred while making the completion call
89
| tracker.trackError();
90
| throw error;
91
| }
92
| 
93
| }
```
We now capture a duration by setting a timer before and after the call, and use the `usage` parameter returned from Snowflake to capture the token usage. These metrics will appear in your dashboard for your AI Config under the “Monitoring” tab:
![Monitoring](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/4eb624883c99d39e05f17e3b97b159f987ddea2ba878b4a703e7061d3f1458d3/assets/images/tutorials/snowflake-tutorial/monitoring.png)
Monitoring
You’ll receive additional information on this page about when different variations released and when changes were made to the configs so that you can keep track of what changes have what impact on your completions.
### Wrapping up
This is a simple example but demonstrates how you can use the power of Snowflake’s Cortex completion gateway in conjunction with AI Configs. Together, they allow you to tweak models in real-time by selecting any models available in your region and having them update seamlessly without requiring any code changes.
Additionally, with the power of [LaunchDarkly’s targeting](https://launchdarkly.com/blog/beginners-guide-to-targeting-with-feature-flags/) you can serve different models and prompts to different users, and even [run experiments](https://launchdarkly.com/blog/introducing-ai-experiments-and-ai-versioning/) against your AI Configs to see which model and prompts best fit your features.
To get started with AI Configs, [sign up for a free trial](https://app.launchdarkly.com/signup). You can also contact us at `aiproduct@launchdarkly.com` with any questions.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs