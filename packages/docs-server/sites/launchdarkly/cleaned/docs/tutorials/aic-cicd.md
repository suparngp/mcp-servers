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
 * [What This Pipeline Does](#what-this-pipeline-does)
 * [How the Pipeline Works](#how-the-pipeline-works)
 * [Stage 1: Validation](#stage-1-validation)
 * [Stage 2: Quality Testing](#stage-2-quality-testing)
 * [Stage 3: Config Sync and Drift Detection](#stage-3-config-sync-and-drift-detection)
 * [Stage 4: Safe Deployment](#stage-4-safe-deployment)
 * [Integration with GitHub Actions](#integration-with-github-actions)
 * [What You Get](#what-you-get)
 * [Additional Details](#additional-details)
_Published November 10th, 2025_
![Portrait of Scarlett Attensil.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/3393fbd458add4f785b27d00b3e2f78f7c72d90959b8b6c10f2ced7c8192ab03/assets/images/authors/scarlettattensil.png)
by Scarlett Attensil
Your deployment shouldn’t fail because an AI config is misconfigured. And you shouldn’t wait until production rollout to discover your new prompt performs worse than the old one.
**This CI/CD pipeline is implemented via GitHub Actions to catch config issues before they break your deployment and test prompt changes against your golden dataset before you start a guarded release.**
**With LaunchDarkly AI Configs, you get:**
 * **Instant rollback via UI** (no redeploy needed)
 * **Real-time config updates** (change models, prompts, thresholds without code changes)
 * **Progressive rollout** with targeting rules and percentage-based deployment
Those controls manage safe deployment after merge. This CI/CD pipeline adds quality gates before merge, so you catch config errors and quality regressions in PRs instead of production.
**This is a conceptual guide.** For hands-on setup instructions to run this pipeline locally or add it to your project, see the [ld-aic-cicd repository](https://github.com/launchdarkly-labs/scarlett_ai_configs_ci_cd-) for installation, usage examples, and detailed documentation.
## What This Pipeline Does
**1. Validate AI Configs exist in LaunchDarkly**
You’ll see a table in your terminal showing which configs are properly set up:
```
┌─────────────────┬──────────┬───────────────┬───────────┬───────┐ 
--- 
│ Config Key │ Status │ Model │ Provider │ Tools │ 
├─────────────────┼──────────┼───────────────┼───────────┼───────┤ 
│ security-agent │ ✅ Valid │ claude-3-5-h… │ Anthropic │ 0 │ 
│ support-agent │ ✅ Valid │ gpt-4o │ OpenAI │ 2 │ 
└─────────────────┴──────────┴───────────────┴───────────┴───────┘ 
```
**2. Test AI response quality against your golden dataset**
You’ll see terminal output showing how each AI Config variation performs across different user contexts:
```
Judge Evaluation Results (Variation Comparison) 
--- 
┌──────────────────┬───────────┬─────────┬─────────────┐ 
│ Variation │ Avg Score │ Min/Max │ Avg Latency │ 
├──────────────────┼───────────┼─────────┼─────────────┤ 
│ premium-users │ 9.2/10 │ 8.5/9.8 │ 1200ms │ 
│ free-tier │ 8.8/10 │ 7.5/9.5 │ 950ms │ 
│ enterprise │ 9.5/10 │ 9.0/9.9 │ 1850ms │ 
└──────────────────┴───────────┴─────────┴─────────────┘ 
```
**3. Sync config defaults**
Keep your code’s fallback defaults in sync with production. A nightly job detects drift and creates a PR when configs change in LaunchDarkly.
![GitHub Sync Configs](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/140d427ec761047501e8b323e11f9784b730ffde46a7ec7261edf39228147982/assets/images/tutorials/aic-cicd/github_sync_configs.png)
Automated sync job creating a PR when production configs drift from code defaults
**4. Deploy safely with LaunchDarkly’s guardrails**
After merge, you’ll use dark launch (test with internal users first) and guarded rollouts (automatic quality monitoring) to gradually increase traffic. If quality degrades, LaunchDarkly alerts you or pauses the rollout.
## How the Pipeline Works
### Stage 1: Validation
The pipeline starts by verifying that your AI Configs actually exist in LaunchDarkly and are configured correctly. **This catches basic setup issues early** , before they reach your test environment or production.
Validation scans your codebase for AI Config references (like `ai_configs.*` or `ai_client.agent(key="security-agent")`), then checks LaunchDarkly to confirm:
 * **The config key exists** in your project
 * **It’s enabled** (not disabled or archived)
 * **Required fields are present** (`model`, `provider`, `instructions`)
 * **The configuration is well-formed**
**If validation fails, your CI/CD pipeline stops here.** This prevents deploying code that references missing or broken AI Configs.
### Stage 2: Quality Testing
The pipeline tests all AI Config variations across different user contexts (premium users, free-tier, enterprise, etc.) using an **[LLM-as-judge](https://arxiv.org/abs/2306.05685)**. This produces quality scores, latency metrics, and variation comparisons to see which config performs best for which user segment.
The testing stage evaluates responses against your quality thresholds: accuracy scores, error rates, and latency limits. **The pipeline blocks your PR if quality falls below thresholds.** Once tests pass, the pipeline moves to syncing defaults and preparing for deployment.
### Stage 3: Config Sync and Drift Detection
An important part of this pipeline is keeping your code’s default AI Config values in sync with what’s actually running in LaunchDarkly production. This serves two purposes:
 * **Runtime fallback when LaunchDarkly is unavailable**
 * **Drift detection when production configs change**
First, the pipeline generates a Python module (`configs/production_defaults.py`) that you commit to git. This becomes your source of truth for default values. Then, a nightly sync job checks for drift by comparing your code’s defaults against LaunchDarkly production. When someone changes an AI Config in production, the sync job detects the difference and creates a PR to update your code.
**Why this matters:** Your application imports these defaults as fallback behavior when LaunchDarkly is unavailable. Keeping them in sync with production means your fallback behavior matches production, not stale values from weeks ago. The drift detection also keeps your team aware of production changes.
### Stage 4: Safe Deployment
After tests pass and the PR merges, LaunchDarkly’s built-in safety controls manage the deployment through four phases: deploy at 0% rollout, dark launch with internal users, guarded rollout with guardrails, and instant rollback if needed.
**Deploy at 0% rollout**
Your code goes to production, but the new AI Config serves no traffic initially. Setting the rollout percentage to 0% in LaunchDarkly lets you verify deployment succeeded before exposing it to users.
**Dark launch with internal users**
LaunchDarkly targeting rules enable testing with real production traffic, starting with internal users and beta testers. For example, targeting rules like `user.email contains "@yourcompany.com"` or `user.segment = "beta_testers"` serve the new config only to specific groups. **This catches issues that only appear with actual user interactions.**
**Guarded rollout with guardrails**
Traffic increases gradually (0% - 1% - 10% - 50% - 100%) while [guardrail metrics](https://docs.launchdarkly.com/home/metrics/guardrail-metrics) monitor quality at each stage. Configure metrics for error rate, latency, and satisfaction in LaunchDarkly, and they’ll automatically track each rollout stage. **If quality degrades, LaunchDarkly alerts you or pauses the rollout.**
![Guarded Release Dashboard](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/337aad93e5caaaf6fb0ff6449619c8be42b82785c748b9d6f3e8582f745bd431/assets/images/tutorials/aic-cicd/guarded_release.png)
Guarded release with guardrail metrics monitoring quality during rollout
**Instant rollback**
If issues arise, **LaunchDarkly’s UI enables instant rollback without redeploying**. Turn off the flag, reduce percentage to 0%, or modify targeting rules. Changes take effect in seconds.
### Integration with GitHub Actions
This entire pipeline runs automatically in your GitHub repository via **GitHub Actions**. When you open a PR, GitHub Actions executes the validation and testing stages. The results appear directly in your PR checks.
![GitHub Actions Pipeline](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/b224e6f2d5a347729ab05ecef4a6ef384bb0fd9d984c5f65a673cb754bf98a01/assets/images/tutorials/aic-cicd/github_actions.png)
GitHub Actions workflow showing validation and testing steps with pass/fail status
Each PR displays:
 * **Validation results** (which configs were checked)
 * **Test results** (quality scores, latency, variation comparison)
 * **Pass/fail status** for each quality gate
The workflow uses repository secrets (`LD_API_KEY`, `LD_SDK_KEY`, etc.) to connect to LaunchDarkly and execute the checks.
## What You Get
This pipeline gives you the confidence to ship AI changes fast without sacrificing quality.
**Before this CI/CD pipeline:**
 * Manual review of AI outputs doesn’t scale.
 * Quality regressions slip into production.
 * No systematic way to test across user segments and variations.
 * Config changes go straight to prod without validation.
**With this CI/CD pipeline:**
 * **Automated quality gates** catch broken configs before merge.
 * **LLM-as-judge tests all variations** systematically (requires test data covering all config variations).
 * **Validation in PR checks** ensures configs exist and are well-formed.
 * **Drift detection** keeps your code defaults in sync with production.
Combined with LaunchDarkly’s AI Configs, instant rollback, progressive rollout, and guardrail metrics, you get the speed to iterate on AI features quickly with a safety net to catch issues before they reach customers.
**Ready to implement?** Visit the [ld-aic-cicd repository](https://github.com/launchdarkly-labs/scarlett_ai_configs_ci_cd-) to get started. The repository includes installation instructions, workflow templates, test data examples, and complete documentation.
## Additional Details
For detailed implementation guidance, see the [ld-aic-cicd repository](https://github.com/launchdarkly-labs/scarlett_ai_configs_ci_cd-) documentation covering:
 * **Choosing Evaluators:** Direct evaluator (unit testing for single configs) vs HTTP evaluator (integration testing for multi-agent systems). Custom evaluators for specialized AI architectures
 * **Test Data Format:** Creating golden datasets with evaluation criteria, context attributes, reference responses, and performance constraints
 * **Drift Detection:** Syncing production configs to code defaults, nightly drift detection workflows, and handling config changes
 * **Function Calling:** Tool support across OpenAI, Anthropic, and Gemini providers with schema validation
 * **Troubleshooting:** Common issues with configs, latency, judge variability, and rate limits
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs