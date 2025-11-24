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
 * [What You’ll Learn in 5 Minutes (or Build in 30)](#what-youll-learn-in-5-minutes-or-build-in-30)
 * [The Problem](#the-problem)
 * [The Solution: Real Experiments, Real Answers](#the-solution-real-experiments-real-answers)
 * [Quick Start Options](#quick-start-options)
 * [Option 1: Just Want the Concepts? (5 min read)](#option-1-just-want-the-concepts-5-min-read)
 * [Option 2: Full Hands-On Tutorial (30 min)](#option-2-full-hands-on-tutorial-30-min)
 * [How the Experiments Work](#how-the-experiments-work)
 * [Understanding Your Two Experiments](#understanding-your-two-experiments)
 * [Experiment 1: Security Agent Analysis](#experiment-1-security-agent-analysis)
 * [Experiment 2: Premium Model Value Analysis](#experiment-2-premium-model-value-analysis)
 * [Setting Up Metrics and Experiments](#setting-up-metrics-and-experiments)
 * [Step 1: Configure Metrics (5 minutes)](#step-1-configure-metrics-5-minutes)
 * [Quick Metric Setup](#quick-metric-setup)
 * [Step 2: Create Experiment Variations](#step-2-create-experiment-variations)
 * [Step 3: Configure Security Agent Experiment](#step-3-configure-security-agent-experiment)
 * [Experiment Design](#experiment-design)
 * [Hypothesis and Metrics](#hypothesis-and-metrics)
 * [Audience Targeting](#audience-targeting)
 * [Audience Allocation](#audience-allocation)
 * [Statistical Approach and Success Criteria](#statistical-approach-and-success-criteria)
 * [Step 4: Configure Premium Model Experiment](#step-4-configure-premium-model-experiment)
 * [Experiment Design](#experiment-design-1)
 * [Hypothesis and Metrics](#hypothesis-and-metrics-1)
 * [Audience Targeting](#audience-targeting-1)
 * [Audience Allocation](#audience-allocation-1)
 * [Statistical Approach and Success Criteria](#statistical-approach-and-success-criteria-1)
 * [Understanding Your Experimental Design](#understanding-your-experimental-design)
 * [Generating Experiment Data](#generating-experiment-data)
 * [Step 5: Run Traffic Generator](#step-5-run-traffic-generator)
 * [Concurrent Traffic Generator (Recommended for large datasets)](#concurrent-traffic-generator-recommended-for-large-datasets)
 * [Sequential Traffic Generator (Simple, one-at-a-time)](#sequential-traffic-generator-simple-one-at-a-time)
 * [Interpreting Your Results (After Data Collection)](#interpreting-your-results-after-data-collection)
 * [1. Security Agent Analysis: Does enhanced security improve safety without significantly impacting positive feedback rates?](#1-security-agent-analysis-does-enhanced-security-improve-safety-without-significantly-impacting-positive-feedback-rates)
 * [✅ VERDICT: Deploy Strict Security: Enhanced Privacy is Worth the Modest Cost](#-verdict-deploy-strict-security-enhanced-privacy-is-worth-the-modest-cost)
 * [2. Premium Model Value Analysis: Does Claude Opus 4 justify its premium cost with superior positive feedback rates?](#2-premium-model-value-analysis-does-claude-opus-4-justify-its-premium-cost-with-superior-positive-feedback-rates)
 * [🔴 VERDICT: Reject Claude Opus 4](#-verdict-reject-claude-opus-4)
 * [Key Insights from Real Experiment Data](#key-insights-from-real-experiment-data)
 * [Experimental Limitations & Mitigations](#experimental-limitations--mitigations)
 * [Common Mistakes You Just Avoided](#common-mistakes-you-just-avoided)
 * [What You’ve Accomplished](#what-youve-accomplished)
 * [Troubleshooting](#troubleshooting)
 * [Long Response Times (>20 minutes)](#long-response-times-20-minutes)
 * [Cost Metrics Not Appearing](#cost-metrics-not-appearing)
 * [Beyond This Tutorial: Advanced AI Experimentation Patterns](#beyond-this-tutorial-advanced-ai-experimentation-patterns)
 * [Other AI experimentation types you can run in LaunchDarkly](#other-ai-experimentation-types-you-can-run-in-launchdarkly)
 * [Experiments you can run entirely in AI Configs (no app redeploy)](#experiments-you-can-run-entirely-in-ai-configs-no-app-redeploy)
 * [Patterns that usually need feature flags and/or custom instrumentation](#patterns-that-usually-need-feature-flags-andor-custom-instrumentation)
 * [Targeting & segmentation ideas (works across all the above)](#targeting--segmentation-ideas-works-across-all-the-above)
 * [From Chaos to Clarity](#from-chaos-to-clarity)
 * [Resources](#resources)
_Published October 9th, 2025_
![Portrait of Scarlett Attensil.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/3393fbd458add4f785b27d00b3e2f78f7c72d90959b8b6c10f2ced7c8192ab03/assets/images/authors/scarlettattensil.png)
by Scarlett Attensil
## What You’ll Learn in 5 Minutes (or Build in 30)
> **Key Findings from Our Experiments:**
> * **Unexpected discovery** : Free Mistral model is not only $0 but also significantly faster than Claude Haiku
> * **Cost paradox revealed** : “Free” security agent increased total system costs by forcing downstream agents to compensate
> * **Premium model failure** : Claude Opus 4 performed 64% worse than GPT-4o despite costing 33% more
> * **Sample size reality** : High-variance metrics (cost, feedback) require 5-10x more data than low-variance ones (latency)
> 
## The Problem
Your CEO asks: **“Is the new expensive AI model worth it?”**
Your finance team wonders: **“Does the enhanced privacy justify the cost?”**
Without experiments, you’re guessing. This tutorial shows you how to **measure the truth** and sometimes discover unanticipated gains.
## The Solution: Real Experiments, Real Answers
In 30 minutes, you’ll run actual A/B tests that reveal:
**Will aggressive PII redaction hurt user satisfaction?**
**Is Claude Opus 4 worth 33% more than GPT-4o?**
_Part 3 of 3 of the series:**Chaos to Clarity: Defensible AI Systems That Deliver on Your Goals**_
## Quick Start Options
### **Option 1: Just Want the Concepts?** (5 min read)
Skip to [Understanding the Experiments](/docs/tutorials/ai-experiments-roi#understanding-your-two-experiments) to learn the methodology without running code.
### **Option 2: Full Hands-On Tutorial** (30 min)
Follow the complete guide to run your own experiments.
**Prerequisites for Hands-On Tutorial**
**Required from Previous Parts:**
 * Active LaunchDarkly project completed from [Part 1](/docs/tutorials/agents-langgraph) & [Part 2](/docs/tutorials/multi-agent-mcp-targeting)
 * API keys: Anthropic, OpenAI, LaunchDarkly. [Sign up for a free account here](http://app.launchdarkly.com/signup) and then [follow these instructions to get your API access token](/docs/home/account/api-create).
**Investment:**
 * Time: ~30 minutes
 * Cost: $25-35 default ($5-10 with `--queries 50`)
**Reduce Experiment Costs**
The default walk-through uses Claude Opus 4 (premium model) for testing. To reduce costs while still learning the experimentation patterns, you can modify `bootstrap/tutorial_3_experiment_variations.py` in your cloned repository to test with the free Mistral model instead:
In the `create_premium_model_variations` function, change:
```
1
| # Original (expensive):
---|--- 
2
| "model": {
3
| "name": "claude-opus-4-20250514",
4
| "provider": "anthropic"
5
| }
6
| 
7
| # Change to (free Mistral):
8
| "model": {
9
| "name": "mistral-small-latest",
10
| "provider": "mistral"
11
| }
```
This reduces the experiment cost by about $20 (you’ll still have costs from the control group using GPT-4o and other agents in the system).
## How the Experiments Work
**The Setup** : Your AI system will automatically test variations on simulated users, collecting real performance data that flows directly to LaunchDarkly for statistical analysis.
**The Process** :
 1. **Traffic simulation** generates queries from your actual knowledge base
 2. **Each user** gets randomly assigned to experiment variations
 3. **AI responses** are evaluated for quality and tracked for cost/speed
 4. **LaunchDarkly** calculates statistical significance automatically
**Note** : The two experiments can run independently. Each user can participate in both, but the results are analyzed separately.
**Experiment Methodology** : Our supervisor agent routes PII queries to the security agent (then to support), while clean queries go directly to support. LaunchDarkly tracks metrics **at the user level across all agents** , revealing system-wide effects.
## Understanding Your Two Experiments
### **Experiment 1: Security Agent Analysis**
**Question** : Does Strict Security (free Mistral model with aggressive PII redaction) improve performance without harming user experience or significantly increasing system costs?
**Variations** (50% each):
 * **Control** : Basic Security (Claude Haiku, moderate PII redaction)
 * **Treatment** : Strict Security (Mistral free, aggressive PII redaction)
**Success Criteria** :
 1. Positive feedback rate: stable or improving (not significantly worse)
 2. Cost increase: ≤15% with ≥75% confidence
 3. Latency increase: ≤3 seconds (don’t significantly slow down)
 4. Enhanced privacy protection delivered
### **Experiment 2: Premium Model Value Analysis**
**Question** : Does Claude Opus 4 justify its premium cost vs GPT-4o?
**Variations** (50% each):
 * **Control** : GPT-4o with full tools (current version)
 * **Treatment** : Claude Opus 4 with identical tools
**Success Criteria (must meet 90% threshold)** :
 * ≥15% positive feedback rate improvement by Claude Opus 4
 * Cost-value ratio ≥ 0.25 (positive feedback rate gain % ÷ cost increase %)
## Setting Up Metrics and Experiments
### **Step 1: Configure Metrics (5 minutes)**
#### **Quick Metric Setup**
Navigate to **Metrics** in LaunchDarkly and [create three custom metrics](/docs/home/metrics/create-metrics):
Metric Name | Event Key | Type | What It Measures 
---|---|---|--- 
**p95_total_user_latency** | $ld:ai:duration:total | P95 | Response speed 
**average_total_user_tokens** | $ld:ai:tokens:total | Average | Token usage 
**ai_cost_per_request** | ai_cost_per_request | Average | Dollar cost 
**Positive Feedback** | Built-in | Rate | Positive feedback rate 
**Negative Feedback** | Built-in | Rate | User complaints 
**See detailed setup for P95 Latency**
 1. Event key: `$ld:ai:duration:total`
 2. Type: Value/Size → Numeric, Aggregation: Sum
 3. Definition: P95, value, user, sum, “lower is better”
 4. Unit: `ms`, Name: `p95_total_user_latency`
![P95 Setup](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/659cb1b7e86b0a4eda83b744674d3c5131ccea29bf208edcfe30ab08f4b01380/assets/images/tutorials/ai-experiments-roi/user_duration.png)
P95 Setup configuration. **View other metric configurations**
 * **Tokens** : Event key `$ld:ai:tokens:total`, Name: `average_total_user_tokens`, Average aggregation
 * **Cost** : Event key `ai_cost_per_request`, Name: `ai_cost_per_request`, Average in dollars
![Tokens](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/3b9a04b326e66baf01591dcb72f24555aa6ca3f307c4031bf6f3f5d2bf2d6747/assets/images/tutorials/ai-experiments-roi/tokens.png)
Tokens configuration.
![Cost](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/491d93f68d6f9d16d1dc7aa2150a51ad78df02bf742909dfde3ff8185cb2a2ab/assets/images/tutorials/ai-experiments-roi/cost.png)
Cost configuration.
The cost tracking is implemented in `utils/cost_calculator.py`, which calculates actual dollar costs using the formula `(input_tokens × input_price + output_tokens × output_price) / 1M`. The system has pre-configured pricing for each model (as of October 2025): GPT-4o at $2.50/$10 per million tokens, Claude Opus 4 at $15/$75, and Claude Sonnet at $3/$15. When a request completes, the cost is immediately calculated and sent to LaunchDarkly as a custom event, enabling direct cost-per-user analysis in your experiments.
### **Step 2: Create Experiment Variations**
Create the experiment variations using the bootstrap script:
```
$
| uv run python bootstrap/tutorial_3_experiment_variations.py
---|--- 
```
This creates the `claude-opus-treatment` variation for the Premium Model Value experiment. To verify the script worked correctly, navigate to your **support-model-config** feature flag in LaunchDarkly - you should now see the `claude-opus-treatment` variation alongside your existing variations. The Security Agent Analysis experiment will use your existing baseline and enhanced variations. Both experiments use the existing `other-paid` configuration as their control group.
### **Step 3: Configure Security Agent Experiment**
Click for details
Navigate to **AI Configs → security-agent**. In the right navigation menu, click the plus (+) sign next to **Experiments** to create a new experiment
#### **Experiment Design**
**Experiment type:**
 * Keep `Feature change` selected (default)
**Name:** `Security Level`
#### **Hypothesis and Metrics**
**Hypothesis:** `Enhanced security improves safety compliance without significantly harming positive feedback rates`
**Randomize by:** `user`
**Metrics:** Click “Select metrics or metric groups” and add:
 1. `Positive feedback rate` → Select first to set as **Primary**
 2. `Negative feedback rate`
 3. `p95_total_user_latency`
 4. `ai_cost_per_request`
#### **Audience Targeting**
**Flag or AI Config**
 * Click the dropdown and select **security-agent**
**Targeting rule:**
 * Click the dropdown and select **Rule 4**
 * This will configure: `If Context` → `is in Segment` → `Other Paid`
#### **Audience Allocation**
**Variations served outside of this experiment:**
 * `Basic Security`
**Sample size:** Set to `100%` of users in this experiment
**Variations split:** Click “Edit” and configure:
Note: Before setting these percentages, scroll down to the **Control** field below and set `Basic Security` as the control variation first, otherwise you won’t be able to allocate 50% traffic to it.
 * `pii-detector`: `0%`
 * `Basic Security`: `50%`
 * `Strict Security`: `50%`
**Control:**
 * `Basic Security`
#### **Statistical Approach and Success Criteria**
**Statistical approach:** `Bayesian` **Threshold:** `90%`
Click **“Save”** Click **“Start experiment”** to launch.
**Note** : You may see a “Health warning” indicator after starting the experiment. This is normal and expected when no variations have been exposed yet. The warning will clear once your experiment starts receiving traffic and data begins flowing.
![Security Agent Experiment Configuration](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/72a4636b92189f6c48250717e0550cefc8944cc11415be51be92fa24ebfdb3b1/assets/images/tutorials/ai-experiments-roi/security_level.png)
Security Agent Experiment Configuration. 
### **Step 4: Configure Premium Model Experiment**
Click for details
Navigate to **AI Configs → support-agent**. In the right navigation menu, click the plus (+) sign next to **Experiments** to create a new experiment
#### **Experiment Design**
**Experiment type:**
 * Keep `Feature change` selected (default)
**Name:** `Premium Model Value Analysis`
#### **Hypothesis and Metrics**
**Hypothesis:** `Claude Opus 4 justifies premium cost with superior positive feedback rate`
**Randomize by:** `user`
**Metrics:** Click “Select metrics or metric groups” and add:
 1. `Positive feedback rate` → Select first to set as **Primary**
 2. `Negative feedback rate`
 3. `p95_total_user_latency`
 4. `average_total_user_tokens`
 5. `ai_cost_per_request`
#### **Audience Targeting**
**Flag or AI Config**
 * Click the dropdown and select **support-agent**
**Targeting rule:**
 * Click the dropdown and select **Rule 4**
 * This will configure: `If Context` → `is in Segment` → `Other Paid`
#### **Audience Allocation**
**Variations served outside of this experiment:**
 * `other-paid`
**Sample size:** Set to `100%` of users in this experiment
**Variations split:** Click “Edit” and configure:
Note: Before setting these percentages, scroll down to the **Control** field below and set `other-paid` as the control variation first, otherwise you won’t be able to allocate 50% traffic to it.
 * `rag-search-enhanced`: `0%`
 * `eu-free`: `0%`
 * `eu-paid`: `0%`
 * `other-free`: `0%`
 * `other-paid`: `50%`
 * `international-standard`: `0%`
 * `claude-opus-treatment`: `50%`
**Control:**
 * `other-paid`
#### **Statistical Approach and Success Criteria**
**Statistical approach:** `Bayesian` **Threshold:** `90%`
Click **“Save”** Click **“Start experiment”** to launch.
**Note** : You may see a “Health warning” indicator after starting the experiment. This is normal and expected when no variations have been exposed yet. The warning will clear once your experiment starts receiving traffic and data begins flowing.
![Premium Model Value Analysis Experiment Configuration](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/81b44cdbaffdfb14aed762b3a1ade48a45f64f64279c77dc11d5be9f02e28e97/assets/images/tutorials/ai-experiments-roi/premium_model.png)
Premium Model Value Analysis Experiment Configuration. 
## Understanding Your Experimental Design
**If Two Independent Experiments Running Concurrently:**
Since these are the **same users** , each user experiences:
 * One security variation (`Basic Security` or `Strict Security`)
 * One model variation (`Claude Opus 4 Treatment` OR `Other Paid (GPT-4o)`)
Random assignment ensures balance: ~50 users get each combination naturally.
## Generating Experiment Data
### **Step 5: Run Traffic Generator**
Start your backend and generate realistic experiment data. Choose between sequential or concurrent traffic generation:
#### **Concurrent Traffic Generator (Recommended for large datasets)**
For faster experiment data generation with parallel requests:
```
$
| # Start backend API
---|--- 
>
| uv run uvicorn api.main:app --reload --port 8000
>
| 
>
| # Generate experiment data with 10 concurrent requests (separate terminal)
>
| uv run python -u tools/concurrent_traffic_generator.py --queries 200 --concurrency 10
```
**Configuration** :
 * **200 queries** by default (edit script to adjust)
 * **10 concurrent requests** running in parallel
 * **2000-second timeout** (33 minutes) per request to handle MCP tool rate limits
Note: runtime depends largely on if you retain MCP tool enablement as these take much longer to complete.
For smaller test runs or debugging
#### **Sequential Traffic Generator (Simple, one-at-a-time)**
```
$
| # Start backend API
---|--- 
>
| uv run uvicorn api.main:app --reload --port 8000
>
| 
>
| # Generate experiment data sequentially (separate terminal)
>
| uv run python tools/traffic_generator.py --queries 50 --delay 2
```
**What Happens During Simulation:**
 1. **Knowledge extraction** Claude analyzes your docs and identifies 20+ realistic topics
 2. **Query generation** Each test randomly selects from these topics for diversity
 3. **AI-powered evaluation** Claude judges responses as thumbs_up/thumbs_down/neutral
 4. **Automatic tracking** All metrics flow to LaunchDarkly in real-time
**Generation Output** :
```
📚 Analyzing knowledge base... 
--- 
✅ Generated 23 topics 
⚡ Sending 200 requests with 10 concurrent workers... 
✅ [1/200] Success (23.4s) - other_paid: What is reinforcement learning?... 
✅ [2/200] Success (45.2s) - other_paid: How does Q-learning work?... 
⏱️ [15/200] Timeout (>2000s) - other_paid: Complex research query... 
 ↑ This is normal - MCP rate limits 
✅ [200/200] Success (387.1s) - other_paid: Explain temporal difference... 
====================================================================== 
✅ COMPLETE 
====================================================================== 
Total time: 45.3 minutes (2718s) 
Successful: 195/200 (97.5%) 
Failed: 5/200 (2.5%) 
Average: 13.6s per query (with concurrency) 
```
**Performance Notes** :
 * Most queries complete in 10-60 seconds
 * Queries using `semantic_scholar` MCP tool may take 5-20 minutes due to API rate limits
 * Concurrent execution handles slow requests gracefully by continuing with others
 * Failed/timeout requests (less than 5% typically) don’t affect experiment validity
**Monitor Results** : Refresh your LaunchDarkly experiment “Results” tabs to see data flowing in. Cost metrics appear as custom events alongside feedback and token metrics.
## Interpreting Your Results (After Data Collection)
Once your experiments have collected data from ~100 users per variation, you’ll see results in the LaunchDarkly UI. Here’s how to interpret them:
### **1. Security Agent Analysis: Does enhanced security improve safety without significantly impacting positive feedback rates?**
**Reality Check** : Not all metrics reach significance at the same rate. In our security experiment we ran over 2,000 more users than the model experiment, turning off the MCP tools and using `--pii-percentage 100` to maximize pii detection:
 * **Latency** : 87% confidence (nearly significant, clear 36% improvement)
 * **Cost** : 21% confidence (high variance, needs 5-10x more data)
 * **Feedback** : 58% confidence (sparse signal, needs 5-10x more data)
This is normal! Low-variance metrics (latency, tokens) prove out quickly. High-variance metrics (cost, feedback) need massive samples. **You may not be able to wait for every metric to hit 90%**. Use strong signals on some metrics plus directional insights on others.
> ## ✅ VERDICT: Deploy Strict Security: Enhanced Privacy is Worth the Modest Cost
The results tell a compelling story: **Latency (p95)** is approaching significance with **87% confidence** that Strict Security is faster, a win we didn’t anticipate. **Cost per request** shows **79% confidence** that Basic Security costs less (or conversely, 21% confidence that Strict costs more), also approaching significance. Meanwhile, **positive feedback rate** remains inconclusive with only **58% confidence** that Strict Security performs better, indicating we need more data to draw conclusions about user satisfaction.
**The Hidden Cost Paradox:**
Strict Security uses **FREE Mistral** for PII detection, yet **increases total system cost by 14.6%**.
```
Basic Security (Claude Haiku): 
--- 
- Supervisor: gpt-4o-mini ~\$0.0001 
- Security: claude-haiku ~\$0.0003 
- Support: gpt-4o ~\$0.0242 
Total: \$0.0246 
Strict Security (Mistral): 
- Supervisor: gpt-4o-mini ~\$0.0001 
- Security: mistral \$0.0000 (FREE!) 
- Support: gpt-4o ~\$0.0280 (+15.7%) 
Total: \$0.0281 (+14.6%) 
```
**Why does the support agent cost more?** More aggressive PII redaction removes context, forcing the support agent to generate longer, more detailed responses to compensate for the missing information. This demonstrates why **system-level experiments** matter. Optimizing one agent can inadvertently increase costs downstream.
**Decision Logic:**
```
IF latency increase ≤ 3s 
--- 
 AND cost increase ≤ 15% AND confidence ≥ 75% 
 AND positive_feedback_rate stable or improving 
 AND enhanced_privacy_protection = true 
THEN deploy_strict_security() 
ELSE need_more_data() 
```
**Bottom line:** Deploy Strict Security. We expected latency to stay within 3 seconds of baseline, but discovered a **36% improvement** instead (87% confidence). Mistral is significantly faster than Claude Haiku. Combined with enhanced privacy protection, this more than justifies the modest 14.5% cost increase (79% confidence).
**Read across:** At scale, paying ~$0.004 more per request for significantly better privacy compliance _and_ faster responses is a clear win for EU users and privacy-conscious segments.
**The Data That Proves It:**
![Security Level Experiment Results](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/174141cafb961906ade366859be86e4a34741008fe3f855449d59bed0de24347/assets/images/tutorials/ai-experiments-roi/security_results.png)
Security Level Experiment Results. 
### **2. Premium Model Value Analysis: Does Claude Opus 4 justify its premium cost with superior positive feedback rates?**
> ## 🔴 VERDICT: Reject Claude Opus 4
The experiment delivered a decisive verdict: **Positive feedback rate** showed a significant failure with **99.5% confidence** that GPT-4o is superior. **Cost per request** is approaching significance with **76% confidence** that Claude Opus is **33% more expensive** , while **latency (p95)** reached significance with **91% confidence** that Claude Opus is **81% slower**. The **cost-to-value ratio** tells the whole story: **-1.9x** , meaning we’re paying 33% more for 64% worse performance: a clear case of premium pricing without premium results.
**Decision Logic:**
```
IF positive_feedback_rate increase ≥ 15% 
--- 
 AND probability_to_beat for positive_feedback_rate ≥ 90% 
 AND probability_to_beat for cost ≥ 90% 
 AND cost-value ratio increase ≥ .25 
THEN deploy_claude_opus_4() 
ELSE keep_current_model() 
```
**Bottom line:** Premium price delivered worse results on every metric. Experiment was stopped when positive feedback rate reached significance.
**Read across:** GPT-4o dominates on performance and speed and most likely also on cost.
**The Numbers Don’t Lie:**
![Premium Model Value Analysis Results](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/38ca7064112366d356f1f7a8d739dd15e1522f63c007306f6e75b73197859c94/assets/images/tutorials/ai-experiments-roi/premium_results.png)
Premium Model Value Analysis Results. 
### **Key Insights from Real Experiment Data**
 1. Low-variance metrics (latency, tokens) reach significance quickly (~1,000 samples). High-variance metrics (cost, feedback) may need 5,000-10,000+ samples. This isn’t a flaw in your experiment but the reality of statistical power. Don’t chase 90% confidence on every metric; focus on directional insights for high-variance metrics and statistical proof for low-variance ones.
 2. Using a free Mistral model for security reduced that agent’s cost to $0, yet **increased total system cost by 14.5%** because downstream agents had to work harder with reduced context. However, the experiment also revealed an **unexpected 36% latency improvement**. Mistral is not just free but significantly faster. LaunchDarkly’s user-level tracking captured both effects, enabling an informed decision: enhanced privacy + faster responses for ~$0.004 more per request is a worthwhile tradeoff.
 3. At 87% confidence for latency (vs 90% target), the 36% improvement is clear enough for decision-making. Perfect statistical significance is ideal, but 85-89% confidence combined with other positive signals (stable feedback, acceptable cost) can justify deployment when the effect size is large.
## Experimental Limitations & Mitigations
**Model-as-Judge Evaluation**
We use Claude to evaluate response quality rather than real users, which represents a limitation of this experimental setup. However, research shows that model-as-judge approaches correlate well with human preferences, as documented in [Anthropic’s Constitutional AI paper](https://arxiv.org/abs/2212.08073).
**Independent Experiments**
While random assignment naturally balances security versions across model versions, preventing systematic bias, you cannot analyze interaction effects between security and model choices. If interaction effects are important to your use case, consider running a proper [factorial experiment design](https://en.wikipedia.org/wiki/Factorial_experiment).
**Statistical Confidence** LaunchDarkly uses **[Bayesian statistics](/docs/home/experimentation/bayesian)** to calculate confidence, where 90% confidence means there’s a 90% probability the true effect is positive. This is NOT the same as p-value < 0.10 from [frequentist tests](https://en.wikipedia.org/wiki/Frequentist_inference). We set the threshold at 90% (rather than 95%) to balance false positives versus false negatives, though for mission-critical features you should consider raising the confidence threshold to 95%.
## Common Mistakes You Just Avoided
❌ **“Let’s run the experiment for a week and see”**
✅ **We defined success criteria upfront** (≥15% improvement threshold)
❌ **“We need 90% confidence on every metric to ship”**
✅ **We used 87% confidence + directional signals** (36% latency win was decision-worthy)
❌ **“Let’s run experiments until all metrics reach significance”**
✅ **We understood variance** (cost/feedback need 5-10x more data than latency)
❌ **“Agent-level metrics show the full picture”**
✅ **We tracked user-level workflows** (revealed downstream cost increases)
## What You’ve Accomplished
You’ve built a **data-driven optimization engine** with statistical rigor through falsifiable hypotheses and clear success criteria. Your predefined success criteria ensure clear decisions and prevent post-hoc rationalization. Every feature investment now has quantified business impact for ROI justification, and you have a framework for continuous optimization through ongoing measurable experimentation.
## Troubleshooting
### **Long Response Times ( >20 minutes)**
If you see requests taking exceptionally long, the root cause is likely the `semantic_scholar` MCP tool hitting API rate limits, which causes 30-second retry delays. Queries using this tool may take 5-20 minutes to complete. The 2000-second timeout handles this gracefully, but if you need faster responses (60-120 seconds typical), consider removing `semantic_scholar` from tool configurations. You can verify this issue by checking logs for `HTTP/1.1 429` errors indicating rate limiting.
### **Cost Metrics Not Appearing**
If `ai_cost_per_request` events aren’t showing in LaunchDarkly, first verify that `utils/cost_calculator.py` has pricing configured for your models. Cost is only tracked when requests complete successfully (not on timeout or error). The system flushes cost events to LaunchDarkly immediately after each request completion. To debug, look for `COST CALCULATED:` and `COST TRACKING (async):` messages in your API logs.
## Beyond This Tutorial: Advanced AI Experimentation Patterns
### **Other AI experimentation types you can run in LaunchDarkly**
_Context from earlier:_ you ran two experiments:
 * **Security‑agent test** : a **bundle change** (both prompt/instructions **and** model changed).
 * **Premium‑model test** : a **model‑only** change.
AI Configs come in two modes: **prompt‑based** (single‑step completions) and **agent‑based** (multi‑step workflows with tools). Below are additional patterns to explore.
* * *
#### Experiments you can run **entirely in AI Configs** (no app redeploy)
 * **Prompt & template experiments (prompt‑based or agent instructions)** Duplicate a variation and iterate on system/assistant messages or agent instructions to measure adherence to schema, tone, or qualitative satisfaction. Use LaunchDarkly Experimentation to tie those variations to product metrics.
 * **Model‑parameter experiments** In a single model, vary parameters like `temperature` or `max_tokens`, and (optionally) add **custom parameters** you define (for example, an internal `max_tool_calls` or decoding setting) directly on the variation.
 * **Tool‑bundle experiments (agent mode or tool‑enabled completions)** Attach/detach reusable tools from the **Tools Library** to compare stacks (e.g., `search_v2`, a reranker, or MCP‑exposed research tools) across segments. Keep one variable at a time when possible
 * **Cost/latency trade‑offs** Compare “slim” vs “premium” stacks by segment. Track tokens, time‑to‑first‑token, duration, and satisfaction to decide where higher spend is warranted.
> **Practical notes**
> * Use **Experimentation** for behavior impact (clicks, task success); use the **Monitoring** tab for LLM‑level metrics (tokens, latency, errors, satisfaction).
> * You **can’t** run a guarded rollout and an experiment on the same flag at the same time. Pick one: guarded rollout for risk‑managed releases, experiment for causal measurement.
> 
* * *
#### Patterns that **usually need feature flags and/or custom instrumentation**
 * **Fine‑grained RAG tuning** k‑values, similarity thresholds, chunking, reranker swaps, and cache policy are typically coded inside your retrieval layer. Expose these as flags or AI Config custom parameters if you want to A/B them.
 * **Tool‑routing guardrails** Fallback flows (e.g., retry with a different tool/model on error), escalation rules, or heuristics need logic in your agent/orchestrator. Gate those behaviors behind flags and measure with custom metrics.
 * **Safety guardrail calibration** Moderation thresholds, red‑team prompts, and PII sensitivity levers belong in a dedicated safety service or the agent wrapper. Wire them to flags so you can raise/lower sensitivity by segment (e.g., enterprise vs free).
 * **Session budget enforcement** Monitoring will show token costs and usage, but enforcing per‑session or per‑org budgets (denylist, degrade model, or stop‑tooling) requires application logic. Wrap policies in flags before you experiment.
* * *
#### Targeting & segmentation ideas (works across all the above)
 * Route by **plan/tier** , **geo** , **device** , or **org** using AI Config targeting rules and percentage rollouts.
 * Keep variations narrow (one change per experiment) to avoid confounding; reserve “bundle” tests for tool‑stack bake‑offs.
**Advanced Practices:** Require statistical evidence before shipping configuration changes. Pair each variation with clear success metrics, then A/B test prompt or tool adjustments and use confidence intervals to confirm improvements. When you introduce the new code paths above, protect them behind feature flags so you can run sequential tests, [multi-armed bandits](/docs/home/multi-armed-bandits) for faster convergence, or change your [experiment design](/docs/guides/experimentation/designing-experiments) to understand how prompts, tools, and safety levers interact.
## From Chaos to Clarity
Across this three-part series, you’ve transformed from hardcoded AI configurations to a scientifically rigorous, data-driven optimization engine. **[Part 1](/docs/tutorials/agents-langgraph)** established your foundation with a dynamic multi-agent [LangGraph](https://langchain-ai.github.io/langgraph/) system controlled by [LaunchDarkly AI Configs](/docs/guides/ai-configs), eliminating the need for code deployments when adjusting AI behavior. **[Part 2](/docs/tutorials/multi-agent-mcp-targeting)** added sophisticated targeting with geographic privacy rules, user segmentation by plan tiers, and [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) tool integration for real academic research capabilities. This tutorial, **Part 3** completed your journey with statistical experimentation that proves ROI and guides optimization decisions with mathematical confidence rather than intuition.
You now possess a defensible AI system that adapts to changing requirements, scales across user segments, and continuously improves through measured experimentation. Your stakeholders receive concrete evidence for AI investments, your engineering team deploys features with statistical backing, and your users benefit from optimized experiences driven by real data rather than assumptions. The chaos of ad-hoc AI development has given way to clarity through systematic, scientific product development.
## Resources
 * **[LaunchDarkly Experimentation Docs](/docs/home/experimentation)** - Deep dive into statistical methods
* * *
**Remember:** Every AI decision backed by data is a risk avoided and a lesson learned. Start small, measure everything, ship with confidence.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs