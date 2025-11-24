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
 * [What This Series Covers](#what-this-series-covers)
 * [What You’ll Build Today](#what-youll-build-today)
 * [Prerequisites](#prerequisites)
 * [Step 1: Clone and Configure (2 minutes)](#step-1-clone-and-configure-2-minutes)
 * [Step 2: Add Your Business Knowledge (2 minutes)](#step-2-add-your-business-knowledge-2-minutes)
 * [Step 3: Initialize Your Knowledge Base (2 minutes)](#step-3-initialize-your-knowledge-base-2-minutes)
 * [Step 4: Define Your Tools (3 minutes)](#step-4-define-your-tools-3-minutes)
 * [Create the RAG vector search tool:](#create-the-rag-vector-search-tool)
 * [Create the reranking tool:](#create-the-reranking-tool)
 * [Step 5: Create Your AI Agents in LaunchDarkly (5 minutes)](#step-5-create-your-ai-agents-in-launchdarkly-5-minutes)
 * [Create the Supervisor Agent](#create-the-supervisor-agent)
 * [Create the Security Agent](#create-the-security-agent)
 * [Create the Support Agent](#create-the-support-agent)
 * [Step 6: Launch Your System (2 minutes)](#step-6-launch-your-system-2-minutes)
 * [Step 7: Test Your Multi-Agent System (2 minutes)](#step-7-test-your-multi-agent-system-2-minutes)
 * [Step 8: Try New Features](#step-8-try-new-features)
 * [Feature 1: Switch Models Instantly](#feature-1-switch-models-instantly)
 * [Feature 2: Adjust Tool Usage](#feature-2-adjust-tool-usage)
 * [Feature 3: Change Agent Behavior](#feature-3-change-agent-behavior)
 * [Understanding What You Built](#understanding-what-you-built)
 * [What’s Next?](#whats-next)
 * [Try This Now](#try-this-now)
 * [Key Takeaways](#key-takeaways)
 * [Related Resources](#related-resources)
_Published September 8th, 2025_
![Portrait of Scarlett Attensil.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/3393fbd458add4f785b27d00b3e2f78f7c72d90959b8b6c10f2ced7c8192ab03/assets/images/authors/scarlettattensil.png)
by Scarlett Attensil
## Overview
Build a working multi-agent system with dynamic configuration in 20 minutes using LangGraph multi-agent workflows, RAG search, and LaunchDarkly AI Configs.
_Part 1 of 3 of the series:**Chaos to Clarity: Defensible AI Systems That Deliver on Your Goals**_
You’ve been there: your AI chatbot works great in testing, then production hits and GPT-4 costs spiral out of control. You switch to Claude, but now European users need different privacy rules. Every change means another deploy, more testing, and crossed fingers that nothing breaks.
The teams shipping faster? They control AI behavior dynamically instead of hardcoding everything.
This series shows you how to build **LangGraph multi-agent workflows** that get their intelligence from **RAG** search through your business documents. These workflows are enhanced with **MCP tools** for live external data and controlled through **LaunchDarkly AI Configs** —all without needing to deploy code changes.
## What This Series Covers
 * **Part 1** (this post): Build a working multi-agent system with dynamic configuration in 20 minutes
 * **Part 2** : Add advanced features like segment targeting, MCP tool integration, and cost optimization
 * **Part 3** : Run production A/B experiments to prove what actually works
By the end, you’ll have a system that measures its own performance and adapts based on user data instead of guesswork.
## What You’ll Build Today
In the next 20 minutes, you’ll have a LangGraph multi-agent system with:
 * **Supervisor Agent** : Orchestrates workflow between specialized agents
 * **Security Agent** : Detects PII and sensitive information
 * **Support Agent** : Answers questions using your business documents
 * **Dynamic Control** : Change models, tools, and behavior through LaunchDarkly without code changes
## Prerequisites
You’ll need:
 * **Python 3.9+** with `uv` package manager ([install uv](https://docs.astral.sh/uv/getting-started/installation/))
 * **LaunchDarkly account** ([sign up for free](https://app.launchdarkly.com/signup))
 * **OpenAI API key** (required for RAG architecture embeddings)
 * **Anthropic API key** (required for Claude models) or **OpenAI API key** (for GPT models)
## Step 1: Clone and Configure (2 minutes)
First, let’s get everything running locally. We’ll explain what each piece does as we build.
```
$
| # Get the code
---|--- 
>
| git clone https://github.com/launchdarkly-labs/devrel-agents-tutorial
>
| cd devrel-agents-tutorial
>
| 
>
| # Install dependencies (LangGraph, LaunchDarkly SDK, etc.)
>
| uv sync
>
| 
>
| # Configure your environment
>
| cp .env.example .env
```
First, you need to get your LaunchDarkly SDK key by creating a project:
 1. **Sign up for LaunchDarkly** at [app.launchdarkly.com](https://app.launchdarkly.com/) (free account). 
 2. **Find projects on the side bar:**
![Sidebar Projects](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/76e40f6749dc24895d564e45b730e0ca80e1b01661a739c04fed133df0c34b45/assets/images/tutorials/agents-langgraph/sidebar_projects_top_half.png)
Projects sidebar in the LaunchDarkly app UI.
 1. **Create a new project** called “multi-agent-chatbot”
🎯 **Use exact names for Part 2 compatibility** :
 * Project: `multi-agent-chatbot`
 * AI Configs: `supervisor-agent`, `security-agent`, `support-agent`
 * Tools: `search_v2`, `reranking`
 * Variations: `supervisor-basic`, `pii-detector`, `rag-search-enhanced`
![New Project](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/8c0646a0cf5e88713a2f9306022933804452756d44fbd7ce9250775424b1dffe/assets/images/tutorials/agents-langgraph/new_project_small.png)
Creating a new project in LaunchDarkly.
 1. **Get your SDK key** :
⚙️ (bottom of sidebar) → **Projects** → **multi-agent-chatbot** → ⚙️ (to the right)
→ **Environments** → **Production** → **SDK key**
this is your `LD_SDK_KEY`
![SDK Key](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/6ab2fbf5c4086ad8c78bd44330ade8ad67638be1a059ddf3a94dad2791544ed3/assets/images/tutorials/agents-langgraph/sdk_key_small.png)
Location of the SDK key in LaunchDarkly project settings.
Now edit `.env` with your keys:
```
$
| LD_SDK_KEY=your-launchdarkly-sdk-key # From step above
---|--- 
>
| OPENAI_API_KEY=your-openai-key # Required for RAG embeddings
>
| ANTHROPIC_API_KEY=your-anthropic-key # Required for Claude models
```
This sets up a **LangGraph** application that uses LaunchDarkly to control AI behavior. Think of it like swapping actors, directors, even props mid-performance without stopping the show. Do not check the `.env` into your source control. Keep those secrets safe!
## Step 2: Add Your Business Knowledge (2 minutes)
The system includes a sample reinforcement learning textbook. Replace it with your own documents for your specific domain.
```
$
| # Option A: Use the sample (AI/ML knowledge)
---|--- 
>
| # Already included: kb/SuttonBarto-IPRL-Book2ndEd.pdf
>
| 
>
| # Option B: Add your documents
>
| rm kb/*.pdf # Clear sample
>
| cp /path/to/your-docs/*.pdf kb/
```
Document types that work well:
 * **Legal** : Contracts, case law, compliance guidelines
 * **Healthcare** : Protocols, research papers, care guidelines
 * **SaaS** : API docs, user guides, troubleshooting manuals
 * **E-commerce** : Product catalogs, policies, FAQs
These documents will serve as the knowledge base for your RAG search, providing business-specific context to your agents.
## Step 3: Initialize Your Knowledge Base (2 minutes)
Turn your documents into searchable **RAG** knowledge:
```
$
| # Create vector embeddings for semantic search
---|--- 
>
| uv run python initialize_embeddings.py --force
```
This builds your **RAG** (Retrieval-Augmented Generation) foundation using **OpenAI’s** text-embedding model and FAISS vector database. **RAG** converts documents into vector embeddings that capture semantic meaning rather than just keywords, making search actually understand context.
## Step 4: Define Your Tools (3 minutes)
Define the search tools your agents will use.
In the LaunchDarkly app sidebar, click **Library** in the AI section. On the following screen, click the **Tools** tab, then **Create tool**.
![Library](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/f73a8b0a607883f248b94a14dffcd8cb3d6079c6e50a0fbee876e1863d014879/assets/images/tutorials/agents-langgraph/library_small.png)
AI Library section in the LaunchDarkly dashboard sidebar.
### Create the RAG vector search tool:
Note: we will be creating a simple search_v1 during part 3 when we learn about experimentation. Create a tool using the following configuration:
> **Key:**
> ```
> search_v2 
> --- 
> 
```
> **Description:**
> ```
> Semantic search using vector embeddings 
> --- 
> 
```
> **Schema:**
> ```
> 
1
| {
> ---|--- 
> 
2
| "properties": {
> 
3
| "query": {
> 
4
| "description": "Search query for semantic matching",
> 
5
| "type": "string"
> 
6
| },
> 
7
| "top_k": {
> 
8
| "description": "Number of results to return",
> 
9
| "type": "number"
> 
10
| }
> 
11
| },
> 
12
| "additionalProperties": false,
> 
13
| "required": [
> 
14
| "query"
> 
15
| ]
> 
16
| }
> 
> 
```
When you’re done, click **Save**.
### Create the reranking tool:
Back on the Tools section, click **Add tool** to create a new tool. Add the following properties:
> **Key:**
> ```
> reranking 
> --- 
> 
```
> **Description:**
> ```
> Reorders results by relevance using BM25 algorithm 
> --- 
> 
```
> **Schema:**
> ```
> 
1
| {
> ---|--- 
> 
2
| "properties": {
> 
3
| "query": {
> 
4
| "description": "Original query for scoring",
> 
5
| "type": "string"
> 
6
| },
> 
7
| "results": {
> 
8
| "description": "Results to rerank",
> 
9
| "type": "array"
> 
10
| }
> 
11
| },
> 
12
| "additionalProperties": false,
> 
13
| "required": [
> 
14
| "query",
> 
15
| "results"
> 
16
| ]
> 
17
| }
> 
> 
```
When you’re done, click **Save**. The `reranking` tool takes search results from `search_v2` and reorders them using the BM25 algorithm to improve relevance. This hybrid approach combines semantic search (vector embeddings) with lexical matching (keyword-based scoring), making it especially useful for technical terms, product names, and error codes where exact term matching matters more than conceptual similarity.
> **🔍 How Your RAG Architecture Works**
> Your **RAG** system works in two stages: `search_v2` performs semantic similarity search using FAISS by converting queries into the same vector space as your documents (via **OpenAI** embeddings), while `reranking` reorders results for maximum relevance. This **RAG** approach significantly outperforms keyword search by understanding context, so asking “My app is broken” can find troubleshooting guides that mention “application errors” or “system failures.”
## Step 5: Create Your AI Agents in LaunchDarkly (5 minutes)
Now that you’ve created the tools your agents will use, it’s time to configure the agents themselves. Each agent will have its own AI Config that defines its behavior, model selection, and specific instructions.
Create LaunchDarkly AI Configs to control your **LangGraph** multi-agent system dynamically. **LangGraph** is LangChain’s framework for building stateful, multi-**agent** applications that maintain conversation state across **agent** interactions. Your **LangGraph** architecture enables sophisticated workflows where **agents** collaborate and pass context between each other.
### Create the Supervisor Agent
 1. In the LaunchDarkly dashboard sidebar, navigate to **AI Configs** and click **Create AI Config**
 2. Select `🤖 Agent-based`
![Agent Based](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/003f7806d238f6bdcbce2d935a5de8675a74abfe3bdd2d34809a859dfd1b41af/assets/images/tutorials/agents-langgraph/agent-based_small.png)
Selecting the Agent-based configuration type.
 1. Name your AI Config `supervisor-agent`. This will be the key you reference in your code.
 2. Configure the following fields in the AI Config form:
> **variation:**
> ```
> supervisor-basic 
> --- 
> 
```
> **Model configuration:**
> ```
> Anthropic 
> --- 
> 
```
> ```
> claude-3-7-sonnet-latest 
> --- 
> 
```
> **Goal or task:**
> ```
> 
 You are an intelligent routing supervisor for a multi-agent system. Your primary job is to assess whether user input likely contains PII (personally identifiable information) to determine the most efficient processing route. 
> --- 
> 
 PII Assessment: 
> 
> 
 Analyze the user input and provide: 
> 
 - likely_contains_pii: boolean assessment 
> 
 - confidence: confidence score (0.0 to 1.0) 
> 
 - reasoning: clear explanation of your decision 
> 
 - recommended_route: either 'security_agent' or 'support_agent' 
> 
> 
 Route to SECURITY_AGENT** if the text likely contains: 
> 
 - Email addresses, phone numbers, addresses 
> 
 - Names (first/last names, usernames) 
> 
 - Financial information (credit cards, SSNs, account numbers) 
> 
 - Sensitive personal data 
> 
> 
 Route to SUPPORT_AGENT** if the text appears to be: 
> 
 - General questions without personal details 
> 
 - Technical queries 
> 
 - Search requests 
> 
 - Educational content requests 
> 
> 
 Analyze this user input and recommend the optimal route: 
> 
> 
```
Click **Review and save**. Now enable your AI Config by switching to the **Targeting** tab and editing the default rule to serve the variation you just created:
![Targeting Configuration](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/227ba311fe4643df513abc67f84ea3cedff870a47a8c0b8c33cf43d89cf58968/assets/images/tutorials/agents-langgraph/targeting.png)
Targeting tab showing the default rule configuration for AI agents.
Click **Edit** on the Default rule, change it to serve your `supervisor-basic` variation, and save with a note like “Enabling new agent config”. Then type “Production” to confirm. The supervisor **agent** demonstrates **LangGraph** orchestration by routing requests based on content analysis rather than rigid rules. **LangGraph** enables this **agent** to maintain conversation context and make intelligent routing decisions that adapt to user needs and LaunchDarkly AI Config parameters.
### Create the Security Agent
Similarly, create another AI Config called `security-agent`
> **variation:**
> ```
> pii-detector 
> --- 
> 
```
> **Model configuration:**
> ```
> Anthropic 
> --- 
> 
```
> ```
> claude-3-7-sonnet-latest 
> --- 
> 
```
> **Goal or task:**
> ```
> You are a privacy agent that REMOVES PII and formats the input for another process. Analyze the input text and identify any personally identifiable information including: Email addresses, Phone numbers, Social Security Numbers, Names (first, last, full names), Physical addresses, Credit card numbers, Driver's license numbers, Any other sensitive personal data. Respond with: detected: true if any PII was found, false otherwise,types: array of PII types found (e.g., ['email', 'name', 'phone']), redacted: the input text with PII replaced by [REDACTED], keeping the text readable and natural. Examples: Input: 'My email is john@company.com and I need help', Output: detected=true, types=['email'], redacted='My email is [REDACTED] and I need help'. Input: 'I need help with my account',Output: detected=false, types=[], redacted='I need help with my account'. Input: 'My name is Sarah Johnson and my phone is 555-1234', Output: detected=true, types=['name', 'phone'], redacted='My name is [REDACTED] and my phone is [REDACTED]'. Be thorough in your analysis and err on the side of caution when identifying potential PII. ``` 
> --- 
> 
```
This agent detects PII and provides detailed redaction information, showing exactly what sensitive data was found and how it would be handled for compliance and transparency.
**Remember to switch to the Targeting tab and enable this agent the same way we did for the supervisor - edit the default rule to serve your`pii-detector` variation and save it.**
### Create the Support Agent
Finally, create `support-agent`
> **variation:**
> ```
> rag-search-enhanced 
> --- 
> 
```
> **Model configuration:**
> ```
> Anthropic 
> --- 
> 
```
> ```
> claude-3-7-sonnet-latest 
> --- 
> 
```
> → **Add parameters** → **Click Custom parameters**
> ```
> 
1
| {"max_tool_calls":5}
> ---|--- 
> 
```
> Click **Attach tools**.
> select: **✅ reranking** **✅ search_v2**
> **Goal or task:**
> ```
> You are a helpful assistant that can search documentation and research papers. When search results are available, prioritize information from those results over your general knowledge to provide the most accurate and up-to-date responses. Use available tools to search the knowledge base and external research databases to answer questions accurately and comprehensively. 
> --- 
> 
```
This **agent** combines **LangGraph** workflow management with your **RAG** tools. **LangGraph** enables the **agent** to chain multiple tool calls together: first using **RAG** for document retrieval, then semantic reranking, all while maintaining conversation state and handling error recovery gracefully.
**Remember to switch to the Targeting tab and enable this agent the same way - edit the default rule to serve your`rag-search-enhanced` variation and save it.**
When you are done, you should have three enabled AI Config Agents as shown below.
![Agents](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/044c6278e5a7a3394364846b3b0b1328bff2cd51731b639cf5d5f6be1a06eba0/assets/images/tutorials/agents-langgraph/agents_small.png)
Overview of all three configured AI agents in LaunchDarkly.
## Step 6: Launch Your System (2 minutes)
Start the system:
```
$
| # Terminal 1: Start the backend
---|--- 
>
| uv run uvicorn api.main:app --reload --port 8000
```
```
$
| # Terminal 2: Launch the UI
---|--- 
>
| uv run streamlit run ui/chat_interface.py --server.port 8501
```
Open [http://localhost:8501](http://localhost:8501/) in your browser. You should see a clean chat interface.
> **Note:** If prompted for authentication, you can leave the email field blank and simply click “Continue” to proceed to the chat interface.
## Step 7: Test Your Multi-Agent System (2 minutes)
Test with these queries:
**Basic Knowledge Test:** “What is reinforcement learning?” (if using sample docs) Or ask about your specific domain: “What’s our refund policy?”
**PII Detection Test:** “My email is john.doe@example.com and I need help”
**Workflow Details** show:
 * Which agents are activated
 * What models and tools are being used
 * Text after redaction
![UI](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/2a4a5cb77b9f09edbb045733d133208ad2495695304eb89d6556064648aaa7f5/assets/images/tutorials/agents-langgraph/ui_small.png)
Chat interface showing the multi-agent workflow in action.
Watch LangGraph in action: the supervisor agent first routes to the security agent, which detects PII. It then passes control to the support agent, which uses your RAG system for document search. LangGraph maintains state across this multi-agent workflow so that context flows seamlessly between agents.
## Step 8: Try New Features
Experience the power of dynamic configuration by making real-time changes to your agents without touching any code:
### Feature 1: Switch Models Instantly
 1. Navigate to **AI Configs** in the LaunchDarkly sidebar
 2. Click on `support-agent`
 3. In the **Model configuration** section, change from:
 * **Current:** Anthropic → claude-3-7-sonnet-latest
 * **New:** OpenAI → gpt-4-turbo
 4. Click **Save changes**
 5. Return to your chat interface at [http://localhost:8501](http://localhost:8501/)
 6. Ask the same question again - you’ll see the response now comes from GPT-4
 7. **What you’ll notice:** Different response style, potentially different tool usage patterns, and the model name displayed in the workflow details
### Feature 2: Adjust Tool Usage
Limit how many times your agent can call tools in a single interaction:
 1. While still in the `support-agent` config
 2. Find the **Custom parameters** section
 3. Update the JSON from:
```
1
| {"max_tool_calls": 5}
---|--- 
```
To:
```
1
| {"max_tool_calls": 2}
---|--- 
```
 4. Click **Save changes**
 5. In your chat, ask a complex question that would normally trigger multiple searches
 6. **What you’ll notice:** The agent now makes at most 2 tool calls, forcing it to be more selective about its searches
### Feature 3: Change Agent Behavior
Transform your support agent into a research specialist:
 1. In the `support-agent` config, locate the **Goal or task** field
 2. Replace the existing instructions with:
```
You are a research specialist. Always search multiple times from different angles before answering. 
--- 
Prioritize accuracy over speed. For any question, perform at least 2 different searches with varied 
search terms to ensure comprehensive coverage. Cite your sources and explain your search strategy. 
```
 3. Click **Save changes**
 4. Test with a question like “What are the best practices for feature flags?”
 5. **What you’ll notice:** The agent now performs multiple searches, explains its search strategy, and provides more thorough, research-oriented responses
All changes take effect immediately - no deployment, no restart, no downtime. Your users experience the updates in real-time.
## Understanding What You Built
Your **LangGraph** multi-**agent** system with **RAG** includes:
**1. LangGraph Orchestration** The supervisor **agent** uses **LangGraph** state management to route requests intelligently based on content analysis.
**2. Privacy Protection** The supervisor **agent** uses **LangGraph** state management to route requests intelligently. This separation allows you to assign a trusted model to the security and supervisor agents and consider on a less-trusted model for the more expensive support agent at a reduced risk of PII exposure.
**3. RAG Knowledge System** The support **agent** combines **LangGraph** tool chaining with your **RAG** system for semantic document search and reranking.
**4. Runtime Control** LaunchDarkly controls both **LangGraph** behavior and **RAG** parameters without code changes.
## What’s Next?
Your multi-agent system is running with dynamic control and ready for optimization.
**In Part 2** , we’ll add:
 * Geographic-based privacy rules (strict for EU, standard for other)
 * MCP tools for external data
 * Business tier configurations (free, paid)
 * Cost optimization strategies
**In Part 3** , we’ll run A/B experiments to prove which configurations actually work best with real data.
## Try This Now
Experiment with:
 1. **Different Instructions** : Make agents more helpful, more cautious, or more thorough
 2. **Tool Combinations** : Add/remove tools to see impact on quality
 3. **Model Comparisons** : Try different models for different agents
 4. **Cost Limits** : Find the sweet spot between quality and cost
Every change is instant, measurable, and reversible.
## Key Takeaways
 * Multi-agent systems work best when each agent has a specific role
 * Dynamic configuration handles changing requirements better than hardcoding
 * LaunchDarkly AI Configs control and change AI behavior without requiring deployments
 * Start simple and add complexity as you learn what works
Ready for more? [Continue to Part 2: Smart AI Agent Targeting with MCP Tools →](/docs/tutorials/multi-agent-mcp-targeting)
## Related Resources
Explore the **[LaunchDarkly MCP Server](/docs/home/getting-started/mcp)** - enable AI agents to access feature flag configurations, user segments, and experimentation data directly through the Model Context Protocol.
* * *
_Questions? Issues? Reach out at`aiproduct@launchdarkly.com` or open an issue in the [GitHub repo](https://github.com/launchdarkly-labs/devrel-agents-tutorial/issues)._
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs