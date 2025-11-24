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
 * [TL;DR](#tldr)
 * [The fragmented AI landscape](#the-fragmented-ai-landscape)
 * [LaunchDarkly’s approach: provider-agnostic input schemas](#launchdarklys-approach-provider-agnostic-input-schemas)
 * [Prompt-based mode: messages-based](#prompt-based-mode-messages-based)
 * [Agent mode: goal/instructions-based](#agent-mode-goalinstructions-based)
 * [Quick comparison](#quick-comparison)
 * [How providers handle “completion vs agent”](#how-providers-handle-completion-vs-agent)
 * [Common misconceptions](#common-misconceptions)
 * [Why LaunchDarkly’s abstraction matters](#why-launchdarklys-abstraction-matters)
 * [Switching providers without code changes](#switching-providers-without-code-changes)
 * [Security and risk management](#security-and-risk-management)
 * [Advanced: Provider-specific packages (JavaScript/TypeScript)](#advanced-provider-specific-packages-javascripttypescript)
 * [Start building with LaunchDarkly AI configs](#start-building-with-launchdarkly-ai-configs)
 * [Further reading](#further-reading)
_Published November 20th, 2025_
![Portrait of Scarlett Attensil.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/3393fbd458add4f785b27d00b3e2f78f7c72d90959b8b6c10f2ced7c8192ab03/assets/images/authors/scarlettattensil.png)
by Scarlett Attensil
The broader tech industry can’t agree on what the term “agents” even means. [Anthropic defines agents](https://www.anthropic.com/research/building-effective-agents) as systems where “LLMs dynamically direct their own processes,” while Vercel’s AI SDK enables [multi-step agent loops with tools](https://sdk.vercel.ai/docs/concepts/tools), and [OpenAI provides an Agents SDK](https://platform.openai.com/docs/guides/agents-sdk) with built-in orchestration. So when you’re creating an AI Config in LaunchDarkly and see “prompt-based mode” vs. “agent mode,” you might reasonably expect this choice to determine whether you get automatic tool execution loops, server-side state management, or some other fundamental capability difference.
But LaunchDarkly’s distinction is different and more practical. Understanding it will save you from confusion and help you ship AI features faster.
## TL;DR
LaunchDarkly’s “prompt-based vs. agent” choice is about **input schemas and framework compatibility** , not execution automation. **Prompt-based mode** returns a messages array (perfect for chat UIs), while **agent mode** returns an instructions string (optimized for LangGraph/CrewAI frameworks). Both provide the same core benefits: provider abstraction, A/B testing, metrics tracking, and the ability to change AI behavior without deploying code.
**Ready to start?** [Sign up for a free trial](http://app.launchdarkly.com/signup) → [create your first AI Config](/docs/home/ai-configs/create) → Choose your mode → Configure and ship.
## The fragmented AI landscape
LaunchDarkly supports 20+ AI providers: OpenAI, Anthropic, Gemini, Azure, Bedrock, Cohere, Mistral, DeepSeek, Perplexity, and more. Each has their own interpretation of “completions” vs “agents,” creating a chaotic ecosystem with different API endpoints, execution behaviors, state management approaches, and capability limitations. This fragmentation makes it difficult to switch providers or even understand what capabilities you’re getting. That’s where LaunchDarkly’s abstraction layer comes in.
## LaunchDarkly’s approach: provider-agnostic input schemas
LaunchDarkly’s AI Configs are a **configuration layer** that abstracts provider differences. When you choose prompt-based mode or agent mode, you’re selecting an **input schema** (messages array vs. instructions string), not execution behavior. LaunchDarkly provides the configuration; you handle orchestration with your own code or frameworks like LangGraph. This gives you provider abstraction, A/B testing, metrics tracking, and online evals (prompt-based mode only) without locking you into any specific provider’s execution model.
![AI Config Mode Selection](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/198963d1a9ef4093617d2d0d1312243a8ba2586f640c46eba4521935c8a3d0ff/assets/images/tutorials/agent-vs-completion/ai-config-create.png)
Creating an AI Config: choosing between prompt-based (completion) and agent-based modes. 
### Prompt-based mode: messages-based
Prompt-based mode uses a **messages array** format with system/user/assistant roles (some providers like OpenAI also support a “developer” role for more granular control). This is the traditional chat format that works across all AI providers.
**UI Input** : “Messages” section with role-based messages
**SDK Method** : `aiclient.config()`
**Returns** : Customized prompt + model configuration
**Documentation** : [AI Config docs](/docs/sdk/features/ai-config)
```
1
| # Retrieve prompt-based AI config
---|--- 
2
| config = aiclient.config(
3
| key="customer-support",
4
| context=context,
5
| default_value=default_config
6
| )
7
| 
8
| # What you get back: messages array
9
| print(config.messages)
10
| # [
11
| # {
12
| # "role": "system",
13
| # "content": "You are a helpful customer support agent for Acme Corp."
14
| # },
15
| # {
16
| # "role": "user",
17
| # "content": "How can I reset my password?"
18
| # }
19
| # ]
20
| 
21
| # Use with provider SDKs that expect message arrays
22
| response = openai.chat.completions.create(
23
| model=config.model.name,
24
| messages=config.messages # Standard message format
25
| )
```
**When to use prompt-based mode:**
 1. **You’re building chat-style interactions** : Traditional message-based conversations where you construct system/user/assistant messages
 2. **You need online evals** : LaunchDarkly’s model-agnostic online evals are currently only available in prompt-based mode
 3. **You want granular control of workflows** : Discrete steps that need to be accomplished in a specific order, or multi-step asynchronous processes where each step executes independently
 4. **One-off evaluations** : Issue individual evaluations of your prompts and completions (not online evals)
 5. **Simple processing tasks** : Summarization, name suggestions, or other non-context-exceeding data processing
![Prompt-Based Mode Messages UI](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/8ac99bd6f455e7f8276ff574c66871f29f00aa4cf06266786eb53e71d7f097fd/assets/images/tutorials/agent-vs-completion/completion-mode-messages.png)
Prompt-based mode variation showing the Messages section with role-based prompts. 
### Agent mode: goal/instructions-based
Agent mode uses a **single instructions string** format that describes the agent’s goal or task. This format is optimized for agent orchestration frameworks that expect high-level objectives rather than conversational messages.
**UI Input** : “Goal or task” field with instructions
**SDK Method** : `aiclient.agent()`
**Returns** : Customized instructions + model configuration
**Examples** : [hello-python-ai examples](https://github.com/launchdarkly/hello-python-ai/blob/main/examples)
```
1
| # Retrieve agent-based AI config
---|--- 
2
| agent_config = aiclient.agent(
3
| key="research-assistant",
4
| context=context,
5
| default_value=default_config
6
| )
7
| 
8
| # What you get back: instructions string
9
| print(agent_config.instructions)
10
| # "You are a research assistant. Your goal is to gather comprehensive
11
| # information on the requested topic using available search tools.
12
| # Search multiple sources, synthesize findings, and provide a detailed
13
| # summary with citations."
14
| 
15
| # Use with agent frameworks that expect instructions
16
| from langgraph.prebuilt import create_react_agent
17
| from langchain_openai import init_chat_model
18
| 
19
| llm = init_chat_model(
20
| model=agent_config.model.name,
21
| model_provider=agent_config.provider.name
22
| )
23
| 
24
| agent = create_react_agent(
25
| llm,
26
| tools=[search_tool, citation_tool],
27
| prompt=agent_config.instructions # Goal/task instructions
28
| )
29
| 
30
| # Execute and track
31
| response = agent.invoke({"messages": [{"role": "user", "content": "..."}]})
```
**When to use agent mode:**
 1. **You’re using agent frameworks** : LangGraph, LangChain, CrewAI, AutoGen, or LlamaIndex Workflows expect goal/instruction-based inputs
 2. **Goal-oriented tasks** : “Research X and create Y” rather than conversational message exchange
 3. **Tool-driven workflows** : While both modes support tools, agent mode’s format is optimized for frameworks that orchestrate tool usage
 4. **Open-ended exploration** : The output is open-ended and you don’t know the actual answer you’re trying to get to
 5. **Data as an application** : You want to treat your data as an application to feed in arbitrary data and ask questions about it
 6. **Provider agent endpoints** : LaunchDarkly may route to provider-specific agent APIs when available (note: not all models support agent mode; check your model’s capabilities)
**See example:** [Build a LangGraph Multi-Agent System with LaunchDarkly](/docs/tutorials/agents-langgraph)
## Quick comparison
Feature | Prompt-Based Mode | Agent Mode 
---|---|--- 
Input format | Messages (system/user/assistant) | Goal/task + instructions 
Tools support | ✅ Yes | ✅ Yes 
SDK method | `config()` | `agent()` 
Automatic execution loop | ❌ No (you orchestrate) | ❌ No (you orchestrate) 
Online evals | ✅ Available | ❌ Not yet available 
Best for | Chat-style prompting, single completions | Agent frameworks, goal-oriented tasks 
Provider endpoint | Standard endpoint | May use provider-specific agent endpoint if available 
Model support | All models | Most models (check model card for “Agent mode” capability) 
**Model compatibility** : Not all models support agent mode. When selecting a model in LaunchDarkly, check the model card for “Agent mode” capability. Models like GPT-4.1, GPT-5 mini, Claude Haiku 4.5, Claude Sonnet 4.5, Claude Sonnet 4, Grok Code Fast 1, and Raptor mini support agent mode, while models focused on reasoning (like GPT-5, Claude Opus 4.1) may only support prompt-based mode.
## How providers handle “completion vs agent”
To understand why LaunchDarkly’s abstraction is valuable, let’s look at how major AI providers handle the distinction between basic completions and advanced agent capabilities. The table below shows how different providers implement “advanced” modes; generally these are ADDITIVE, including all basic capabilities plus extras. For example, OpenAI’s Responses API includes all Chat Completions features plus additional capabilities.
Provider | ”Basic” Mode | ”Advanced” Mode | Key Difference | Link 
---|---|---|---|--- 
**OpenAI** | Chat Completions API | Responses API | Responses adds built-in tools (web_search, file_search, computer_use, code_interpreter, remote MCP), server-side conversation state with stored IDs, and improved streaming. Chat Completions remains supported. | [Docs](https://platform.openai.com/docs/guides/responses-vs-chat-completions) 
**Anthropic** | Tool Use (client tools) | Tool Use (client + server tools) | Server tools (web_search, web_fetch) execute on Anthropic’s servers. You can use both client and server tools together | [Docs](https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview) 
**Google Gemini** | Manual function calling | Automatic function calling (Python SDK) | Python SDK auto-converts functions to schemas, runs the execution loop, and supports compositional multi-step calls. Manual mode: full control, all platforms | [Docs](https://ai.google.dev/gemini-api/docs/function-calling) 
**Vercel AI SDK** | `generateText()` | `generateText()` with multi-step loop | Multi-step agent loops with tools; SDK continues until complete; `maxSteps` provides loop control to limit steps | [Docs](https://sdk.vercel.ai/docs/concepts/tools) 
**Azure OpenAI** | Assistants API (deprecated) | AI Agent Services | Enterprise agent runtime with threads, tool orchestration, safety, identity, networking, and observability; includes Responses API and Computer-Using Agent in Azure | [Docs](https://azure.microsoft.com/en-us/blog/announcing-the-responses-api-and-computer-using-agent-in-azure-ai-foundry/) 
**AWS Bedrock (Nova)** | Converse API (tool use) | Bedrock Agents | Agents: managed service with automatic orchestration + state management + multi-agent collaboration. Converse: manual tool orchestration, full control | [Docs](https://docs.aws.amazon.com/nova/latest/userguide/agents-use-nova.html) 
**Cohere** | Standard chat | Command A | Command A: enhanced multi-step tool use, REACT agents, ~150% higher throughput | [Docs](https://docs.cohere.com/docs/command-a) 
This fragmentation across providers is exactly why LaunchDarkly’s approach matters: you configure once (messages vs. goals), and LaunchDarkly handles the provider-specific translation. Want to switch from OpenAI to Anthropic? Just change the provider in your AI Config. Your application code stays the same.
**Note on OpenAI’s ecosystem (Nov 2025)** : The [Agents SDK](https://platform.openai.com/docs/guides/agents-sdk) is OpenAI’s production-ready orchestration framework. It uses the Responses API by default, and via a built-in LiteLLM adapter it can run against other providers with an OpenAI-compatible shape. Chat Completions is still supported, but OpenAI recommends Responses for new work. The [Assistants API is deprecated](https://platform.openai.com/docs/assistants/whats-new) and scheduled to shut down on August 26, 2026.
## Common misconceptions
Now that you understand the modes and how they differ from provider-specific implementations, let’s clear up some common points of confusion:
**❌ “Agent mode provides automatic execution”** No. Both modes require you to orchestrate. Agent mode just provides a different input schema.
**❌ “Agent mode is for complex tasks, prompt-based mode is for simple ones”** Not quite. It’s about input format and framework compatibility, not task complexity.
**❌ “I can only use tools in agent mode”** False. Both modes support tools. The difference is how you specify your task (messages vs. goal).
**❌ “LaunchDarkly is an agent framework like LangGraph”** No. LaunchDarkly is configuration management for AI. Use it WITH frameworks like LangGraph, not instead of them.
## Why LaunchDarkly’s abstraction matters
Now that you’ve seen how fragmented the provider landscape is, let’s explore the practical value of LaunchDarkly’s abstraction layer.
### Switching providers without code changes
**Without LaunchDarkly:**
```
1
| # Hardcoded provider and prompts in your application
---|--- 
2
| openai_client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
3
| response = openai_client.chat.completions.create(
4
| model="gpt-4", # Want to switch to Claude? Need to deploy new code
5
| messages=[
6
| {"role": "system", "content": "You are helpful"}, # Want to A/B test prompts? Deploy again
7
| {"role": "user", "content": "Hello"}
8
| ]
9
| )
10
| 
11
| # To switch providers, you need to:
12
| # 1. Write new code for different provider API
13
| # 2. Deploy to production
14
| # 3. Hope nothing breaks
```
**With LaunchDarkly:**
```
1
| # Get config from LaunchDarkly
---|--- 
2
| config = aiclient.config(key="my-ai-config", context=context)
3
| 
4
| # You still write provider-specific code, but only once
5
| if config.provider.name == "openai":
6
| client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
7
| response = client.chat.completions.create(
8
| model=config.model.name, # Comes from LaunchDarkly
9
| messages=config.messages, # Normalized schema across providers
10
| temperature=config.model.parameters.get('temperature')
11
| )
12
| elif config.provider.name == "bedrock":
13
| client = boto3.client('bedrock-runtime', region_name='us-east-1')
14
| response = client.converse(
15
| modelId=config.model.name, # Comes from LaunchDarkly
16
| messages=_convert_to_bedrock_format(config.messages), # LaunchDarkly normalizes, you convert
17
| inferenceConfig={'temperature': config.model.parameters.get('temperature')}
18
| )
19
| 
20
| # Now you can switch providers via LaunchDarkly UI without deployment
21
| # Change prompts, A/B test models, roll out gradually - all via configuration
```
**The real value:** Once your code is set up to handle different providers, you can switch between them, change prompts, A/B test models, and roll out changes gradually - all through the LaunchDarkly UI without deploying code. You write the provider handlers once; you manage AI behavior forever.
### Security and risk management
AI agents can be powerful and potentially risky. With LaunchDarkly AI Configs, you can:
 * **Instantly disable problematic models or tools** without deploying code
 * **Gradually roll out new agent capabilities** to a small percentage of users first
 * **Quickly roll back** if an agent behaves unexpectedly
 * **Control access by user tier** (limit powerful tools to trusted users)
 * **Target specific individuals in production** to test experimental AI behavior in real environments without affecting other users
When you’re not directly coupled to provider APIs, responding to security issues becomes a configuration change instead of an emergency deployment.
## Advanced: Provider-specific packages (JavaScript/TypeScript)
For JavaScript/TypeScript developers looking to reduce boilerplate even further, LaunchDarkly offers optional provider-specific packages. These work with **both prompt-based and agent modes** and are purely additive - you don’t need them to use LaunchDarkly AI Configs effectively.
**Available packages:**
 * [`@launchdarkly/server-sdk-ai-openai`](/docs/sdk/ai/node-js) - OpenAI provider
 * [`@launchdarkly/server-sdk-ai-langchain`](/docs/sdk/ai/node-js) - LangChain provider (works with both LangChain and LangGraph)
 * [`@launchdarkly/server-sdk-ai-vercel`](/docs/sdk/ai/node-js) - Vercel AI SDK provider
**What they provide:**
 * **Model creation helpers** : One-line functions like `createLangChainModel(aiConfig)` that return fully-configured model instances
 * **Automatic metrics tracking** : Integrated metrics collection
 * **Format conversion utilities** : Helper functions to translate between schemas
**Example with LangGraph:**
```
1
| // Get agent config from LaunchDarkly
---|--- 
2
| const agentConfig = await ldClient.aiAgent('research-assistant', context);
3
| 
4
| // Create LangChain model - config already applied
5
| const model = await LangChainProvider.createLangChainModel(agentConfig);
6
| 
7
| // Use with LangGraph
8
| const agent = createReactAgent(model, tools, agentConfig.instructions);
9
| const response = await agent.invoke({ messages: [{ role: "user", content: "Research X" }] });
```
**Production readiness:** These packages are in **early development** and not recommended for production. They may change without notice.
**Python approach:** The Python SDK takes a different path with built-in convenience methods like `track_openai_metrics()` in the single `launchdarkly-server-sdk-ai` package. See [Python AI SDK reference](/docs/sdk/ai/python).
## Start building with LaunchDarkly AI configs
You now understand how LaunchDarkly’s prompt-based and agent modes provide provider-agnostic configuration for your AI applications. Whether you’re building chat interfaces or complex multi-agent systems, LaunchDarkly gives you the flexibility to experiment, iterate, and ship AI features without the complexity of managing multiple provider APIs.
**Choosing your mode:**
**Start with prompt-based mode if:**
 * You’re building a chat interface or conversational UI
 * You need online evaluations for quality monitoring
 * You want precise control over multi-step workflows
 * You’re uncertain which mode fits your use case (it’s the more flexible starting point)
**Choose agent mode if:**
 * You’re integrating with LangGraph, LangChain, CrewAI, or similar frameworks
 * Your task is goal-oriented rather than conversational (“Research X and create Y”)
 * You’re feeding arbitrary data and asking open-ended questions about it
**Remember:** Both modes give you the same core benefits: provider abstraction, A/B testing, and runtime configuration changes. The choice is about input format, not capabilities.
**Get started:**
 1. [Sign up for a free LaunchDarkly account](https://app.launchdarkly.com/signup)
 2. [Create your first AI Config](/docs/home/ai-configs/create): Takes less than 5 minutes
 3. [Explore example implementations](https://github.com/launchdarkly/hello-python-ai/blob/main/examples): Learn from working code
 4. Start with prompt-based mode unless you’re specifically using an agent framework
## Further reading
**LaunchDarkly resources:**
 * [AI config quickstart guide](/docs/home/ai-configs/quickstart)
 * [Online evaluations in AI configs](/docs/home/ai-configs/online-evaluations)
 * [Python AI SDK reference](/docs/sdk/ai/python)
**Provider documentation:**
 * [Anthropic Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)
 * [Google Gemini Function Calling](https://ai.google.dev/gemini-api/docs/function-calling)
 * [OpenAI Responses API vs Chat Completions](https://platform.openai.com/docs/guides/responses-vs-chat-completions)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs