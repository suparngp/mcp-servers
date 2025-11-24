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
 * [What is MCP?](#what-is-mcp)
 * [Creating a LaunchDarkly API access token](#creating-a-launchdarkly-api-access-token)
 * [Installing the MCP server](#installing-the-mcp-server)
 * [Creating a feature flag with MCP](#creating-a-feature-flag-with-mcp)
 * [Enabling a feature flag](#enabling-a-feature-flag)
 * [Adding a flag targeting rule](#adding-a-flag-targeting-rule)
 * [Evaluating a feature flag](#evaluating-a-feature-flag)
 * [Additional feature flag MCP prompts](#additional-feature-flag-mcp-prompts)
 * [Conclusion](#conclusion)
_Published May 28th, 2025_
![Portrait of Tilde Thurium.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/76588f82673e369503c4e8f33cb7280539b2251c25bb4cff7dec2047757115fa/assets/images/authors/tilde-thurium.png)
by Tilde Thurium
## Overview
You can now create, evaluate, and modify flags from within your IDE or AI client using natural language with LaunchDarkly’s new MCP server. Follow along with this tutorial for step by step instructions.
This MCP server is currently in beta. For the most up to date instructions, read [LaunchDarkly MCP server](/docs/home/getting-started/mcp) in the product documentation.
## Prerequisites
In order to complete this tutorial, you must have the following prerequisites:
 * A LaunchDarkly account — [sign up for a free one here](https://app.launchdarkly.com/signup).
 * [The Cursor IDE](https://www.cursor.com/) installed on your local machine. Although this tutorial is Cursor-focused, our MCP server also works with any AI client that supports MCP, such as [Windsurf](https://windsurf.com/editor) or even [Raycast](https://www.raycast.com/).
 * A JavaScript runtime on your local machine that supports ECMAScript 2020 or newer. Functionally, this means [Node.js](https://github.com/nodejs) v18 or v20, Bun v1 or newer, or Deno 1.39 and above.
## What is MCP?
_Model-context protocol[(MCP)](https://modelcontextprotocol.io/introduction)_, is an open protocol that lets you interact with APIs using natural language.
LaunchDarkly’s MCP server is powered by [Speakeasy](https://www.speakeasy.com/), a developer tool for generating SDKs, documentation, and agent tools.
## Creating a LaunchDarkly API access token
To use the LaunchDarkly MCP server, you’ll need to create a LaunchDarkly API access token with appropriately scoped permissions.
Go to the [the LaunchDarkly Authorization page](https://app.launchdarkly.com/settings/authorization). (If you’re an EU or Federal user, that link won’t work – instead, navigate to **Organization settings** > **Authorization** in the left nav menu.) Click **Create token**. Give the token a memorable name, such as “Tilde’s MCP server.” The Role should be Writer. Leave the service token box unchecked. The MCP server will be running on your local machine, so a personal API token is a better fit. Also, leave the API version set to the most recent version (currently `20240415`).
![Dialog box showing how to create an API access token in the LaunchDarkly UI.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/47e2d01abdc4fe16a3478659fe2e59f7c809622cbf0e4dbbb677fb668e87acce/assets/images/tutorials/mcp-server-feature-flags/mcp-create-api-key.png)
How to create an API access token in the LaunchDarkly app UI.
After you create your API token, copy it to your clipboard. You’ll need it for the next step. After you leave the page the token will be hidden, so don’t lose it.
If you’d rather customize your permissions in a more granular fashion, you can use the Role builder. [Read about custom roles](/docs/home/account/roles/role-concepts) or [see these example policies](/docs/home/account/roles/example-roles) in the docs.
## Installing the MCP server
In Cursor, go to **Settings** > **Cursor Settings** > **Tools & Integrations** > **MCP Tools** > **New MCP server.**
Copy the example configuration, using your API token instead of the dummy key in this example.
```
1
| {
---|--- 
2
| "mcpServers": {
3
| "LaunchDarkly": {
4
| "command": "npx",
5
| "args": [
6
| "-y", "--package", "@launchdarkly/mcp-server", "--", "mcp", "start",
7
| "--api-key", "api-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
8
| ]
9
| }
10
| }
11
| }
```
If you’re using LaunchDarkly’s Federal or EU instances, you’ll need to point your server at a different host by adding a `server-url` argument like so. Replace `<host>` with [your host URL](https://www.npmjs.com/package/@launchdarkly/mcp-server#available-environments).
```
1
| {
---|--- 
2
| "mcpServers": {
3
| "LaunchDarkly": {
4
| "command": "npx",
5
| "args": [
6
| "-y", "--package", "@launchdarkly/mcp-server", "--", "mcp", "start",
7
| "--api-key", "api-xxxxxxx",
8
| "--server-url", "<host>"
9
| ]
10
| }
11
| }
12
| }
```
## Creating a feature flag with MCP
Toggle Cursor’s AI pane. Try asking the agent to create a flag using the following prompt:
Prompt:
_create a feature flag to gate my awesome new feature_
Model responses are non-deterministic, so your response may not exactly match the following, but it should be something like this:
Response:
_To create a feature flag for your awesome new feature, I’ll need to know which LaunchDarkly project you want to add the flag to. Could you please provide the project key (the unique identifier for your LaunchDarkly project)? If you have a preferred flag key or description, let me know as well, or I can generate them for you!_
Oops, we forgot to specify which LaunchDarkly project we wanted to use. Luckily the agent retains context between queries, and knows how to ask us for the info it needs. The MCP protocol is forgiving and you don’t have to get prompts perfect on the first try.
My example LaunchDarkly project is named [_raccoon-api-facts_](https://launchdarkly.com/blog/upgrade-api-safely-progressive-rollouts-expressjs/). 🦝 Don’t judge me. Input your own project name in the AI chat pane and hit Enter. Although these flag and project names are technically called _keys_ when referenced in code, the LaunchDarkly MCP server can understand what we are asking for without that level of specificity. Hooray for natural language interfaces.
Click **Run tool** in your AI pane in Cursor to finish creating the flag. You’ll need to do this every time the AI agent attempts to interact with the LaunchDarkly API. MCP servers require explicit approval before calling external APIs as a security measure.
![Screenshot of the Run tool button in the AI chat pane of the Cursor IDE.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/31779ba32f5942982902a572f9b9c96b1e509e0c52e3da7c8618a47bbf3046ee/assets/images/tutorials/mcp-server-feature-flags/mcp-tool-call-button.png)
The Run tool button.
Next, roll over to the [LaunchDarkly UI](https://app.launchdarkly.com/). You should see the _awesome-new-feature_ flag in your list. If it’s not there, double-check that you’re in the correct project.
![Screenshot of a list of feature flags in the LaunchDarkly user interface. The top flag is called Awesome New Feature.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/d7d11af355b22f7b1b9d8b60bab82412890c11fb7e816216fcb5cafb2385662d/assets/images/tutorials/mcp-server-feature-flags/mcp-new-flag-overview.png)
The flags list.
Back in Cursor, if you click on **called MCP tool** you can see the details of the request the MCP server sent to the LaunchDarkly API:
![Screenshot of request parameters used to call the LaunchDarkly flag creation API within the Cursor IDE, via MCP.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/40e5c5a29182d4b590bf50c9376e11cac7ec7bea4bf93caa469630c1d39a0b71/assets/images/tutorials/mcp-server-feature-flags/mcp-flag-create-request-detail.png)
Request parameters for the create flag API call.
## Enabling a feature flag
Ask the AI agent to check the value of the flag:
Prompt:
_what is the value of the awesome-new-feature flag?_
Your response should be something like this:
Response:
_The value of the awesome-new-feature flag is currently set to off (false) by default in both the production and test environments. If you want to enable it or check its value for a specific user or context, let me know!_
This matches what we see in the LaunchDarkly UI:
![Screenshot of flag configuration in the LaunchDarkly UI. The flag is Off, serving false to all users in the Test environment.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/8a727ef49a7cef9297f42c0f3210ae15a14e4c06bb0a88f32a8fe0dae98192e6/assets/images/tutorials/mcp-server-feature-flags/mcp-flag-config-test-off.png)
Flag configuration for Awesome New Feature .
Let’s try to turn the flag on and see what happens!
Prompt:
_Turn the awesome new feature flag ON, serving True to all users._
Don’t forget to click **Run tool** after submitting your prompt to the agent.
Response:
_The awesome-new-feature flag is now turned ON in both the production and test environments! Your awesome new feature is now enabled for all users in these environments._ 
_If you want to target specific users, add rules, or need to verify the flag’s status, just let me know!_
You may need to reload the LaunchDarkly UI in your browser to see the updated flag state:
![Screenshot of flag configuration in the LaunchDarkly UI. The flag is On, serving true to all users in the Test environment.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/d87db477545da17943d1021c26e78134718a1cf80ea22fd39506a10a354a94ef/assets/images/tutorials/mcp-server-feature-flags/mcp-flag-config-test-on.png)
Updated configuration for the Awesome New Feature flag in the Test environment.
![Screenshot of flag configuration in the LaunchDarkly UI. The flag is On, serving true to all users in the Production environment.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/c01a406b13de49c92f56f3f1d31325962ebcb3ac1cc94e49ab704b7d611d10a5/assets/images/tutorials/mcp-server-feature-flags/mcp-flag-config-prod-on.png)
Updated configuration for the Awesome New Feature flag in the Production environment.
## Adding a flag targeting rule
What if we ask the AI agent to do something a little more complicated? Let’s [create a targeting rule](/docs/home/flags/target-rules) so that the flag is serving true for users whose email addresses end in launchdarkly.com. This could be useful if we wanted to roll out our awesome new feature to internal users first, to test for bugs.
Prompt:
_For the awesome new feature flag, update the targeting rules so the flag is only enabled and serving true for users who have email addresses ending with`launchdarkly.com`. Everyone else should get the false variation._
Response:
_The awesome-new-feature flag is now enabled only for users whose email addresses end with`launchdarkly.com` in both production and test environments. For all other users, the flag will be off._ 
_If you need to further adjust the targeting or want to verify the setup, let me know!_
Checking the AI agent’s work in the LaunchDarkly UI, it looks like the targeting updates were successful:
![Screenshot of flag configuration in the LaunchDarkly UI. The flag is On, serving true to users whose email addresses end in launchdarkly.com and false to everyone else.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/2ac19f3081f175d582160502d5906ee8fab00730d6c4e1855a1f469c41d4ce9b/assets/images/tutorials/mcp-server-feature-flags/mcp-updated-flag-config.png)
Updated configuration for the Awesome New Feature flag, including a targeting rule.
## Evaluating a feature flag
Now that our targeting rule is set up, let’s try evaluating our awesome feature flag using a few different contexts.
Prompt:
_Evaluate the awesome new feature flag using the following context: {“name”: “tilde”, “email”: “`tthurium@launchdarkly.com` ”}_
Response:
_To evaluate the awesome-new-feature flag for the context:_ {“name”: “tilde”, “email”: “`tthurium@launchdarkly.com`”}*
 * _The flag is ON, but only enabled for users whose email ends with`@launchdarkly.com`._
 * _The provided email`tthurium@launchdarkly.com` matches this rule._
_Result: The awesome-new-feature flag will be enabled (true) for this user._ 
_If you want to see the raw evaluation or check for a different context, let me know!_
Great. What about evaluating a context that should be false?
Prompt:
_evaluate the awesome new feature flag using the following context: {“name”: “tilde”, “email”: “`tthurium@foo.com` ”}_
Response:
_For the context {“name”: “tilde”, “email”: “`tthurium@foo.com` ”}:_
 * _The awesome-new-feature flag is ON, but only enabled for users whose email ends with “`@launchdarkly.com` ”._
 * _The email`tthurium@foo.com` does not match this rule._
_Result: The awesome-new-feature flag will be disabled (false) for this user. If you want to check for another context or need the raw evaluation details, let me know!_
You can even pass in the context in natural language rather than JSON.
Prompt:
_Evaluate the value of Awesome New Feature flag with a context where the user has an email address`foo@bar.com`_
Response:
Given the current targeting rules for the “Awesome New Feature” flag:
 * _The only users who receive the true variation are those whose email ends with`launchdarkly.com`._
 * _All other users receive the false variation._ _For a user with the email address`foo@bar.com` , the flag will evaluate to false in both the Production and Test environments._
Note that the LaunchDarkly API doesn’t have an endpoint for evaluating feature flags. For that, you’d need to use one of [LaunchDarkly’s SDKs](https://launchdarkly.com/docs/sdk). When you evaluate a feature flag via MCP, the AI model is running the evaluation logic. Cool!
## Additional feature flag MCP prompts
Most flag-related actions you can do with the LaunchDarkly REST API can now be done from the comfort of your editor. Here are some examples of additional prompts that you may find useful. Replace the placeholders with the names/keys of your actual flags and projects.
Task | Prompt 
---|--- 
Disabling a feature flag | Turn the $FEATURE_FLAG_KEY flag off. 
Updating a feature flag description | Update the $FEATURE_FLAG_KEY flag description: “When enabled, show the updated UI for my awesome new feature.” 
Listing all feature flags in a project | Show me all the feature flags in the $PROJECT_KEY project. 
Getting a feature flag’s details | Tell me about my $FEATURE_FLAG_KEY feature flag. 
Adding individual targets | Add a new targeting rule for the $FEATURE_FLAG_KEY feature flag so that the user `tthurium@launchdarkly.com` receives the true variation. 
Copying a feature flag | Create a new feature flag that copies the configuration of the $FEATURE_FLAG_KEY flag, but add V2 to the flag key. 
Archiving a feature flag | Archive the feature flag $FEATURE_FLAG_KEY. 
Deleting a feature flag. (Be careful with this one — the action can’t be undone!) | Delete the feature flag $FEATURE_FLAG_KEY. 
## Conclusion
In this tutorial you learned how to create and manage feature flags from within your IDE, using the magic of MCP. This can save you time, as well as the mental energy of context switching, which will ultimately help you ship more quickly.
Stay tuned for updates. We’re actively working on adding more functionality to our MCP server.
If you enjoyed this tutorial, here’s some related reading:
 * [A list of awesome MCP servers](https://mcpservers.org/)
 * [Getting started with the LaunchDarkly REST API](https://launchdarkly.com/docs/guides/api/rest-api)
 * [Customizing user experiences using FastAPI and LaunchDarkly segment targeting](https://launchdarkly.com/blog/tutorial-fastapi-targeting-segment/)
Thanks for following along! If you have any questions, or you want to tell me about the cool stuff you’re building, you can reach me via email (tthurium@launchdarkly.com), [Bluesky](https://bsky.app/profile/annthurium.bsky.social), [Discord](https://discord.com/invite/launchdarklycommunity), or [LinkedIn](https://www.linkedin.com/in/annthurium/).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs