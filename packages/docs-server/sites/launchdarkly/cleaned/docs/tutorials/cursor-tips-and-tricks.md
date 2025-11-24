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
 * [Tip #1: Add developer documentation as a data source](#tip-1-add-developer-documentation-as-a-data-source)
 * [Tip #2: Use MCP to interact with APIs in plain English](#tip-2-use-mcp-to-interact-with-apis-in-plain-english)
 * [Tip #3: Use Cursor rules as system-level context](#tip-3-use-cursor-rules-as-system-level-context)
 * [Using Cursor rules for personalization](#using-cursor-rules-for-personalization)
 * [Tip #4: Pick the model that’s best for your use case](#tip-4-pick-the-model-thats-best-for-your-use-case)
 * [Conclusion](#conclusion)
_Published June 10th, 2025_
![Portrait of Tilde Thurium.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/76588f82673e369503c4e8f33cb7280539b2251c25bb4cff7dec2047757115fa/assets/images/authors/tilde-thurium.png)
by Tilde Thurium
## Overview
[Cursor](https://www.cursor.com/), an AI code editor, is the fastest growing developer tool of all time, as of June 2025.
Cursor works pretty well out of the box, but there’s a lot you can do to make it even better. In this post we’ll cover four tips to make your Cursor agent more accurate, personalized, and better integrated with other developer tools.
If you haven’t installed Cursor, [follow the installation instructions here](https://www.cursor.com/downloads).
## Tip #1: Add developer documentation as a data source
The more _context_ an AI agent has, the better its suggestions will be. Generative model training data can be frozen months or years before the models are released to the public. This lag makes it hard for models to generate up-to-date code reflecting the latest changes to software libraries. Fortunately, you can add documentation to Cursor to enhance the coding agent’s abilities and reduce hallucination.
If you add a root documentation link to Cursor, it will index the content of those docs, including child links. When you make queries to the AI agent, the AI agent will determine if those docs are relevant, using vector similarity search. Relevant docs will be used to generate a higher quality response to your query.
Cursor comes with [documentation for many popular libraries already indexed](https://docs.cursor.com/en/context/@-symbols/@-docs). You can add documentation about specific libraries, tools, and SDKs you use in your codebase.
For example, I’ll show you how to add the [LaunchDarkly docs](/docs/home). In Cursor, go to **Settings** > **Cursor Settings** > **Indexing & Docs**. Click **Add Doc.**
![Screenshot showing how to add new documentation to Cursor.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/d9d3b44f678401ea9d8f9d3f2d7bd51e79ae01b6096a2c54f567f3efb55ebc93/assets/images/tutorials/cursor-tips-and-tricks/cursor-tips-indexing-docs-config.png)
The Add Doc button in the Indexing & Docs section of the Cursor settings page.
In the following dialog box, paste in the URL of the docs you’d like to add:
![Screenshot showing the modal form for adding a specific documentation URL to Cursor.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/6f030d470a21937a0172ee9b436f4260357ed049ea78ab098ca943dda8096d77/assets/images/tutorials/cursor-tips-and-tricks/cursor-tips-add-docs-url-modal.png)
The add docs form.
Click _Add Docs_.
For better or for worse, software is never complete; thus, documentation is always in flux too. Cursor periodically reindexes any docs you have added. You can manually reindex by clicking the **curved arrow icon** in **Settings** > **Cursor Settings** > **Indexing & Docs**. You can also remove docs that are no longer relevant by clicking the **trash icon**.
![Screenshot demonstrating where to update or delete existing documentation that Cursor has already indexed.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/b2a4ee2c0e76ef2fcc55ea330c143c5d85818bad2abaf17beba60f6d320223e3/assets/images/tutorials/cursor-tips-and-tricks/cursor-tips-existing-docs.png)
Existing documentation that Cursor has indexed.
## Tip #2: Use MCP to interact with APIs in plain English
_Model-context protocol[(MCP)](https://modelcontextprotocol.io/introduction)_ is an open protocol that lets you interact with APIs using natural language.
For example, [the LaunchDarkly MCP server](/docs/tutorials/mcp-server-feature-flags) lets you manage LaunchDarkly feature flags and AI Configs from within your IDE, in plain English.
Warning: You can currently only have 40 tools (or functions) installed at the same time, across all the MCP servers that are currently running. This limitation exists because while [LLM context windows](https://docs.cursor.com/guides/working-with-context) are expanding, they aren’t boundless. Adding and removing MCP servers doesn’t take too long, so you can tinker with what servers are installed locally depending on the needs of your current engineering project. Developers are racing to build middleware layer that solves this problem, so it’s likely this pain point is temporary.
How can you discover what MCP servers might be the most useful to you? MCP server registries are [multiplying almost as fast as MCP servers](https://mastra.ai/blog/mcp-registry-registry). However, the most complete registry lives on [the official _modelcontextprotocol_ GitHub organization](https://github.com/modelcontextprotocol/servers).
## Tip #3: Use Cursor rules as system-level context
[Cursor rules](https://docs.cursor.com/context/rules) allow you to provide additional instruction to the coding agent. They are handy for specifying domain-specific knowledge.
The rules are flexible enough that you can indicate when you want them to be attached to a query. The options are:
 * **Always** : Be careful with this one, it can take up valuable context tokens for things that don’t need to be included in every request.
 * **Auto Attached** : You can instruct Cursor to auto-attach the rule when editing files matching a specific `*.extension`.
 * **Agent Requested** : Describe the kinds of tasks the rule is helpful for, and the Cursor Agent will decide if the rule should be applied.
 * **Manually** : You can manually add the rules to the context in your chat window with the AI agent.
Rules are written in Markdown. If you want to see an example of what they looks like in practice, [this repository contains recommended Cursor rules for LaunchDarkly development](https://github.com/launchdarkly-labs/cursor-rules).
You can share project-level rules with other developers on your team by committing them to a settings directory in a shared repository.
### Using Cursor rules for personalization
In addition to project-level rules, Cursor also supports user-level rules which can be useful for personalizing your experience. Perhaps you find the AI agent’s egregious overuse of exclamation points to be a bit much. You can add a Cursor rule to tone down the enthusiasm to a more manageable level.
```
When responding to queries, use a dry, matter-of-fact tone. 
--- 
```
On the more unhinged end of the spectrum, you can try ramping up the absurdity:
```
Provide all code feedback in the form of a roast. 
--- 
```
## Tip #4: Pick the model that’s best for your use case
Engineering is fundamentally about making tradeoffs. Model selection requires balancing quality, latency, and cost to suit your use case.
If you have an easier task to do, consider using a lighter-weight model. I find that [Claude 3.5 Sonnet](https://www.anthropic.com/news/claude-3-5-sonnet) meets my everyday coding needs. Reasoning models with larger context windows such as [OpenAI’s o3](https://platform.openai.com/docs/models/o3-pro) are more expensive, so consider saving those for gnarlier problems.
You can change your model in **Settings** > **Cursor Settings** > **Models**. Usage details currently live in **Settings** > **Cursor Settings** > **General** **Manage Account**.
New models are released daily. Keeping up to date is a struggle. For [the latest info on model availability, see Cursor’s documentation](https://docs.cursor.com/models).
## Conclusion
To get the most out of your Cursor experience:
 * Add technical documentation as a data source for the Cursor agent.
 * Add Cursor rules to provide system-level guidance on domain specific knowledge, or personalization.
 * Install MCP servers locally to make interacting with your most-used APIs a breeze.
 * Consider what size model best fits your use case.
Thanks for following along! If you have any questions, or you want to tell me about your favorite MCP servers, you can reach me via email (tthurium@launchdarkly.com), [Bluesky](https://bsky.app/profile/annthurium.bsky.social), [Discord](https://discord.com/invite/launchdarklycommunity), or [LinkedIn](https://www.linkedin.com/in/annthurium/).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs