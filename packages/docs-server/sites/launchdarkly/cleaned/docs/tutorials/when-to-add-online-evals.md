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
 * [The quick decision framework](#the-quick-decision-framework)
 * [Online evals vs. LLM observability](#online-evals-vs-llm-observability)
 * [LLM observability: your security camera](#llm-observability-your-security-camera)
 * [Online evals: your security guard](#online-evals-your-security-guard)
 * [How online evals actually work](#how-online-evals-actually-work)
 * [Real problems online evals solve](#real-problems-online-evals-solve)
 * [Example implementation path](#example-implementation-path)
 * [The bottom line](#the-bottom-line)
 * [Next steps](#next-steps)
_Published November 13th, 2025_
![Portrait of Scarlett Attensil.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/3393fbd458add4f785b27d00b3e2f78f7c72d90959b8b6c10f2ced7c8192ab03/assets/images/authors/scarlettattensil.png)
by Scarlett Attensil
## The quick decision framework
##### Online evals are in closed beta
Online evals for AI Configs is currently in closed beta. Judges must be installed in your project before they can be attached to AI Config variations.
Online evals provide real-time quality monitoring for LLM applications. Using LLM-as-a-judge methodology, they run automated quality checks on a configurable percentage of your production traffic, producing structured scores and pass/fail judgments you can act on programmatically. LaunchDarkly includes three built-in judges: **accuracy** , **relevance** , and **toxicity**.
**Skip online evals if:**
 * Your checks are purely deterministic (schema validation, compile tests)
 * You have low volume and can manually review outputs in observability dashboards
 * You’re primarily debugging execution problems
**Add online evals when:**
 * You need quantified quality scores to trigger automated actions (rollback, rerouting, alerts)
 * Manual quality review doesn’t scale to your traffic volume
 * You’re measuring multiple quality dimensions (accuracy, relevance, toxicity)
 * You want statistical quality trends across segments for AI governance and compliance
 * You need to monitor token usage and cost alongside quality metrics
 * You’re running A/B tests or guarded releases and need automated quality gates
Most teams add them within 2-3 sprints when manual quality review becomes the bottleneck. Configurable sampling rates let you balance evaluation coverage with cost and latency.
## Online evals vs. LLM observability
**LLM observability shows you what happened. Online evals automatically assess quality and trigger actions based on those assessments.**
### LLM observability: your security camera
LLM observability shows you everything that happened through distributed tracing: full conversations, tool calls, token usage, latency breakdowns, and cost attribution. Perfect for debugging and understanding what went wrong. But when you’re handling 10,000 conversations daily, manually reviewing them for quality patterns doesn’t scale.
### Online evals: your security guard
Automatically scores every sampled request using LLM-as-a-judge methodology across your quality rubric (accuracy, relevance, toxicity) and takes action. Instead of exporting conversations to spreadsheets for manual review, you get real-time quality monitoring with drift detection that triggers alerts, rollbacks, or rerouting.
**The 3 AM difference**
Without evals: “Let’s meet tomorrow to review samples and decide if we should rollback.”
With evals: “Quality dropped below threshold, automatic rollback triggered, here’s what failed…”
## How online evals actually work
LaunchDarkly’s online evals use LLM-as-a-judge methodology with three built-in judges you can configure directly in the dashboard. No code changes required.
**Getting started:**
 1. Install judges from the AI Configs menu
 2. Attach judges to AI Config variations
 3. Configure sampling rates (balance coverage with cost/latency)
 4. Evaluation metrics are automatically emitted as custom events
 5. Metrics are automatically available for A/B tests and guarded releases
**What you get from each built-in judge:**
**Accuracy judge:**
```
1
| {
---|--- 
2
| "score": 0.85,
3
| "reasoning": "Response correctly answered the question but missed one edge case regarding error handling"
4
| }
```
**Relevance judge:**
```
1
| {
---|--- 
2
| "score": 0.92,
3
| "reasoning": "Response directly addressed the user's query with appropriate context and examples"
4
| }
```
**Toxicity judge:**
```
1
| {
---|--- 
2
| "score": 0.0,
3
| "reasoning": "Content is professional and appropriate with no toxic language detected"
4
| }
```
Each judge returns a score from 0.0 to 1.0 plus reasoning that explains the assessment. LaunchDarkly’s built-in judges (accuracy, relevance, toxicity) have fixed evaluation criteria and are configured only by selecting the provider and model.
**Configuration:** Install judges from the AI Configs menu in your LaunchDarkly dashboard. They appear as pre-configured AI configs (AI Judge - Accuracy, AI Judge - Toxicity, AI Judge - Relevance). When configuring your AI Config variations in completion mode, select which judges to attach with your desired sampling rate. Use different judge combinations for different environments to match your quality requirements and cost constraints.
## Real problems online evals solve
**Scale for production applications:** Your SQL generator handles 50,000 queries daily. LLM observability shows you every query through distributed tracing. Online evals tell you the proportion that are semantically wrong, automatically, with hallucination detection built in.
**Multi-dimensional quality monitoring:** Customer service AI applications aren’t just “did it respond?” It’s accuracy, relevance, toxicity, compliance, and appropriateness. Online evals score all dimensions simultaneously, each with its own threshold and reasoning.
**RAG pipeline validation:** Your retrieval-augmented generation system needs continuous monitoring of both retrieval quality and generation accuracy. Online evals can assess whether retrieved context is relevant and whether the response accurately uses that context, preventing hallucinations and ensuring factual grounding.
**Cost and performance optimization:** Monitor token usage alongside quality metrics. If certain queries consume 10x more tokens than others, online evals help identify these patterns so you can optimize prompts or routing logic to reduce costs without sacrificing quality.
**Actionable metrics for AI governance:** Transform 10,000 responses from data to decisions with evaluator-driven quality gates:
 * Accuracy trending below 0.8? Automated alerts to the team
 * Toxicity above 0.2? Immediate review and potential rollback
 * Relevance dropping for specific user segments? Targeted configuration updates
 * Metrics automatically feed A/B tests and guarded releases for continuous improvement
## Example implementation path
**Week 1-2: Define quality dimensions and install judges.** Use LLM observability alone first. Manually review samples to understand your system. Define your quality dimensions: accuracy, relevance, toxicity, or other criteria specific to your application. Install the built-in judges from the AI Configs menu in LaunchDarkly.
**Week 3-4: Attach judges with sampling.** Attach judges to AI Config variations in LaunchDarkly. Start with one or two key judges (accuracy and relevance are good defaults). Configure sampling rates between 10-20% of traffic to balance coverage with cost and latency. Compare automated scores with human judgment to validate the judges work for your use case.
**Week 5+: Operationalize with quality gates.** Add more evaluation dimensions as you learn. Connect scores to automated actions and evaluator-driven quality gates: when accuracy drops below 0.7, trigger alerts; when toxicity exceeds 0.2, investigate immediately. Leverage the custom events and metrics for A/B testing and guarded releases to continuously improve your application’s performance.
## The bottom line
You don’t need online evals on day one. Start with LLM observability to understand your AI system through distributed tracing. Add evaluations when you hear yourself saying “we need to review more conversations” or “how do we know if quality is degrading?”
LaunchDarkly’s three built-in judges (accuracy, relevance, toxicity) provide LLM-as-a-judge evaluation that you can attach to any AI Config variation in **completion mode** with configurable sampling rates. Note that online evals currently only work with completion mode AI Configs. Agent-based configs are not yet supported. Evaluation metrics are automatically emitted as custom events and feed directly into A/B tests and guarded releases, enabling continuous AI governance and quality improvement without code changes. Start simple with one judge, learn what matters for your application, and expand from there.
**LLM observability is your security camera. Online evals are your security guard.**
## Next steps
Ready to get started? [Sign up for a free LaunchDarkly account](https://launchdarkly.com/start-trial/) if you haven’t already.
**Build a complete quality pipeline:**
 * [AI Config CI/CD Pipeline](/docs/tutorials/aic-cicd) - Add automated quality gates and LLM-as-a-judge testing to your deployment process
 * Combine offline evaluation (in CI/CD) with online evals (in production) for comprehensive quality coverage
**Learn more about AI Configs:**
 * [AI Config documentation](https://docs.launchdarkly.com/home/ai-configs) - Understand how AI Configs enable real-time LLM configuration
 * [Online evals documentation](https://docs.launchdarkly.com/home/ai-configs/online-evaluations) - Deep dive into judge installation and configuration
 * [Guardrail metrics](https://docs.launchdarkly.com/home/metrics/guardrail-metrics) - Monitor quality during A/B tests and guarded releases
**See it in action:**
 * [Check LLM observability in the LaunchDarkly dashboard](/docs/home/observability/llm-observability) to track your AI application performance with distributed tracing
**Industry standards:** LaunchDarkly’s approach aligns with emerging AI observability standards, including OpenTelemetry’s semantic conventions for AI monitoring, ensuring your evaluation infrastructure integrates with the broader observability ecosystem.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs