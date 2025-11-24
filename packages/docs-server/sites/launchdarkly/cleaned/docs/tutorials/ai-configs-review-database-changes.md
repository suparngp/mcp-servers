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
 * [What are AI Configs?](#what-are-ai-configs)
 * [🧠 What the AI Reviewer Checks](#-what-the-ai-reviewer-checks)
 * [🛠 Step 1: Collect the Right Data](#-step-1-collect-the-right-data)
 * [📦 sql-proxy container](#-sql-proxy-container)
 * [🏗 Dumping the Schema](#-dumping-the-schema)
 * [📊 Step 2: Compare Against Main](#-step-2-compare-against-main)
 * [🤖 Step 3: Run the AI Review](#-step-3-run-the-ai-review)
 * [🧠 Step 4: Add Context That Only You Know](#-step-4-add-context-that-only-you-know)
 * [🚀 Why This Matters](#-why-this-matters)
 * [🏁 Final Thoughts](#-final-thoughts)
_Published August 20th, 2025_
![Portrait of Kevin Kruger.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/898d9f1014339a3517926e26ffc79b59afe5b214d094f6e34070dc0260d72528/assets/images/authors/kevin-kruger.png)
by Kevin Kruger
## Overview
At LaunchDarkly, we’re constantly pushing the boundaries of what it means to move fast without breaking things. We ship frequently, serve **quadrillions of events per day** , and operate with **zero tolerance for downtime**. To keep pace, we need systems that help us ship confidently—even when change is happening at a rapid, “vibe coding” pace.
But what happens when that rapid change reaches your database?
From an SRE’s perspective, the database is sacred. It’s the source of truth—and one of the riskiest areas to touch without deep context. Even if your code is reviewed in a pull request:
 * Does the reviewer understand the query access patterns?
 * Could this schema change hurt index performance?
 * Is the change touching critical production tables?
 * Will the new model scale with usage?
With LaunchDarkly AI Configs, we finally have a way to automate this kind of insight — _reviewing database changes before they become production issues_.
## Prerequisites
To follow along, you’ll need:
 * A LaunchDarkly account with [AI Configs](/docs/home/ai-configs/quickstart) enabled. [Sign up for free here.](https://app.launchdarkly.com/signup).
 * Access to a database system. These code samples are written to be compatible with a database using the PostgreSQL wire protocol. However, you could adapt them to suit other flavors of databases.
 * Basic familiarity with SQL and database schema management
 * A development environment where you can test database changes
## What are AI Configs?
LaunchDarkly [AI Configs](/docs/home/ai-configs) allow you to customize, test, and roll out new large language models (LLMs) within your generative AI applications.
## 🧠 What the AI Reviewer Checks
Our system uses LaunchDarkly’s internal AI Configs to analyze your schema and query changes directly from a CI build. It checks for:
 * Are the **queries** optimized for access patterns?
 * Are the right indexes in place?
 * Are we modifying high-risk tables?
 * Will the schema scale and evolve over time?
This isn’t just a linter. It’s an AI-powered reviewer trained on your environment.
If you want to skip right to reading the code, [a complete example can be found here](https://github.com/launchdarkly-labs/lddbai/blob/main/.github/workflows/test.yml).
## 🛠 Step 1: Collect the Right Data
The AI needs a complete snapshot of your system to make a meaningful review:
 * Full schema (full-schema.json)
 * Schema diff (schema-diff.json)
 * Full set of SQL queries (sql-queries.json)
 * Query diff (queries-diff.json)
### 📦 sql-proxy container
To evaluate database changes, we need to observe real SQL queries your application runs during CI.
We do this by inserting a lightweight PostgreSQL proxy between your app and the database. It logs and deduplicates queries, then exposes them via an API for analysis.
Here’s the setup in Docker Compose / GitHub Action Service Container:
```
1
| services:
---|--- 
2
| postgres:
3
| image: postgres
4
| env:
5
| POSTGRES_PASSWORD: postgres
6
| ports:
7
| - 5432:5432
8
| 
9
| proxy:
10
| image: ghcr.io/${{ github.repository_owner }}/sql-proxy:latest
11
| env:
12
| LISTEN_PORT: 5433
13
| BACKEND_HOST: postgres
14
| BACKEND_PORT: 5432
15
| API_PORT: 8080
16
| DB_CONNECTION_STRING: host=postgres port=5432 user=postgres password=postgres sslmode=disable
17
| ports:
18
| - 5433:5433
19
| - 8080:8080
```
​ Every query is deduplicated and exposed via: `GET http://localhost:8080/queries`
Connecting to the database via 5433 will now pass the queries through the proxy.
### 🏗 Dumping the Schema
To give the AI full context, we also need a snapshot of the database schema—including table definitions, columns, indexes, and relationships.
This can be triggered early in the CI pipeline to run in parallel with your other steps:
```
1
| - name: Migrate Database
---|--- 
2
| run: |
3
| cd schema_test
4
| go run .
5
| 
6
| - name: Start Schema Dump
7
| run: |
8
| curl -X POST http://localhost:8080/schema_dump
```
⏱️ **Note** : For large schemas, this can take a minute or two. Triggering it early(but after the migrations) avoids blocking downstream jobs.
## 📊 Step 2: Compare Against Main
After your tests or migrations run through the proxy, it now holds:
 * The **full set of SQL queries** the app executed
 * The **current state of the database schema**
With this data captured, you can run a GitHub Action that:
 * Calls the proxy’s API to fetch the captured data
 * Downloads artifacts from the main branch (last known good state)
 * Note: it needs to run on the main branch at least once to have generated a proper artifact for comparison
 * Compares current vs. main to generate:
 * `schema-diff.json`
 * `queries-diff.json`
Here’s what that looks like in CI:
```
1
| - name: Get SQL Data
---|--- 
2
| uses: droptableifexists/recon@main
3
| id: get-sql-data
4
| with:
5
| SQL_PROXY_API_ADDRESS: localhost:8080
6
| GITHUB_REPOSITORY: ${{ github.repository }}
7
| GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
## 🤖 Step 3: Run the AI Review
After you have the four key files, you pass them into the AI Config system.
Save input to a file:
```
1
| - name: Save SQL data to file
---|--- 
2
| run: |
3
| cat << EOF > analysis_input.json
4
| {
5
| "sql_queries": ${{ toJSON(steps.get-sql-data.outputs.sql-queries) }},
6
| "queries_diff": ${{ toJSON(steps.get-sql-data.outputs.queries-diff) }},
7
| "schema": ${{ toJSON(steps.get-sql-data.outputs.schema) }},
8
| "schema_diff": ${{ toJSON(steps.get-sql-data.outputs.schema-diff) }}
9
| }
10
| EOF
```
Run the DB analysis tool:
```
1
| - name: Run Database Analysis
---|--- 
2
| uses: launchdarkly-labs/lddbai@main
3
| with:
4
| message: "Analyzing database changes..."
5
| input_file: analysis_input.json
6
| openai_api_key: ${{ secrets.OPENAI_API_KEY }}
7
| launchdarkly_sdk_key: ${{ secrets.LAUNCHDARKLY_SDK_KEY }}
8
| github_token: ${{ secrets.GITHUB_TOKEN }}
9
| pull_request_number: ${{ github.event.pull_request.number }}
```
Under the hood, here’s what the code looks like:
```
1
| def get_ai_config(payload: dict) -> tuple[AIConfig, LDAIConfigTracker]:
---|--- 
2
| aiclient = Deps().get_launchdarkly_ai()
3
| context = Context.builder('cockroachdb').kind('database').name('cockroachdb').build()
4
| fallback_value = AIConfig(
5
| enabled=True,
6
| model=ModelConfig(name="gpt-4o-mini", parameters={"temperature": 0.8}),
7
| messages=[LDMessage(role="system", content="")],
8
| provider=ProviderConfig(name="my-default-provider"),
9
| )
10
| return aiclient.config('evaluate-database-changes', context, fallback_value, {
11
| 'schema': payload.get('schema', []),
12
| 'schema_diff': payload.get('schema_diff', []),
13
| 'sql_queries': payload.get('sql_queries', []),
14
| 'queries_diff': payload.get('queries_diff', [])
15
| })
```
And to get the AI’s recommendation:
```
1
| def get_ai_recommendation(payload: dict) -> str:
---|--- 
2
| config, tracker = get_ai_config(payload)
3
| messages = [] if config.messages is None else config.messages
4
| response = tracker.track_openai_metrics(
5
| lambda: client.chat.completions.create(
6
| model=config.model.name,
7
| messages=[message.to_dict() for message in messages],
8
| )
9
| )
10
| Deps().get_launchdarkly().flush()
11
| return response.choices[0].message.content
```
## 🧠 Step 4: Add Context That Only You Know
Once the model has your queries and schema, you can make it smarter by adding business context:
 * Database engine and version 🧱
 * Critical tables to tread carefully around 🚨
 * Average query volume and server specs 📈
 * Team-specific data modeling principles 📐
 * History of past incidents or patterns 📜
This context transforms the AI from a generic reviewer into a tailored risk advisor for your system.
![Screenshot showing the LaunchDarkly UI for creating an AI Config to manage database changes.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/d65d677d9b92b4c7898a268fc1c51f0e6a3da73704f0dbba760921feb7554d3e/assets/images/tutorials/ai-configs-review-database-changes/ai-config-database.png)
Screenshot showing the LaunchDarkly UI for creating an AI Config to manage database changes.
## 🚀 Why This Matters
With AI Configs, you can:
 * Catch performance and scaling issues before they hit production
 * Share SRE intuition across your whole engineering team
 * Shorten feedback loops without blocking deploys
 * Scale database expertise without bottlenecks
You’re no longer at the mercy of “who reviewed the PR.” Every change gets a consistent, context-aware review.
## 🏁 Final Thoughts
Database changes don’t have to be scary anymore.
By plugging into LaunchDarkly AI Configs, you can automate reviews, enforce data modeling best practices, and de-risk your deploys—without slowing anyone down. To get started, [sign up for a free trial today](/docs/tutorials/aiproduct@launchdarkly.com) or email us at `aiproduct@launchdarkly.com` if you have questions.
So yeah, go ahead. Vibe out. Ship confidently. And let the AI handle the hard stuff.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs