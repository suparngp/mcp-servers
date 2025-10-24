[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * [Getting Started](/university)
 * Developer Workflows
 * [Beginner](/university/developer-workflows/beginner)
 * [Power User](/university/developer-workflows/power-user)
 * [How To: Run 3 Agents in Parallel (Summarize Logs + Analyze PR + Modify UI)](/university/developer-workflows/power-user/how-to-run-3-agents-in-parallel-summarize-logs-+-analyze-pr-+-modify-ui)
 * [How To: Configure YOLO and Strategic Agent Profiles](/university/developer-workflows/power-user/how-to-configure-yolo-and-strategic-agent-profiles)
 * [How To: Sync Your Monorepos](/university/developer-workflows/power-user/how-to-sync-your-monorepos)
 * [How To: Review PRs Like A Senior Dev](/university/developer-workflows/power-user/how-to-review-prs-like-a-senior-dev)
 * [How To: Set Coding Best Practices](/university/developer-workflows/power-user/how-to-set-coding-best-practices)
 * [How To: Set Tech Stack Preferences with Rules](/university/developer-workflows/power-user/how-to-set-tech-stack-preferences-with-rules)
 * [How To: Set Coding Preferences with Rules](/university/developer-workflows/power-user/how-to-set-coding-preferences-with-rules)
 * [DevOps](/university/developer-workflows/devops)
 * [Backend](/university/developer-workflows/backend)
 * [Frontend / UI](/university/developer-workflows/frontend-ui)
 * [Testing & Security](/university/developer-workflows/testing-and-security)
 * End-To-End Builds
 * [Building a Real-time Chat App (Github MCP + Railway )](/university/end-to-end-builds/building-a-real-time-chat-app-github-mcp-+-railway)
 * [Building a Chrome Extension (D3.js + Javascript + HTML + CSS)](/university/end-to-end-builds/building-a-chrome-extension-d3.js-+-javascript-+-html-+-css)
 * MCP Servers
 * [Puppeteer MCP: Scraping Amazon Web Reviews ](/university/mcp-servers/puppeteer-mcp-scraping-amazon-web-reviews)
 * [Sentry MCP: Fix Sentry Error in Empower Website](/university/mcp-servers/sentry-mcp-fix-sentry-error-in-empower-website)
 * [Context7 MCP: Update Astro Project with Best Practices](/university/mcp-servers/context7-mcp-update-astro-project-with-best-practices)
 * [Figma Remote MCP: Create a Website from a Figma File from Scratch](/university/mcp-servers/figma-remote-mcp-create-a-website-from-a-figma-file-from-scratch)
 * [Linear MCP: Retrieve issue data](/university/mcp-servers/linear-mcp-retrieve-issue-data)
 * [Linear MCP: Updating Tickets with a Lean Build Approach](/university/mcp-servers/linear-mcp-updating-tickets-with-a-lean-build-approach)
 * [SQLite and Stripe MCP: Basic Queries You Can Make After Set Up](/university/mcp-servers/sqlite-and-stripe-mcp-basic-queries-you-can-make-after-set-up)
 * Terminal / Command Line Tips
 * [Improve Your Kubernetes Workflow (kubectl + helm)](/university/terminal-command-line-tips/improve-your-kubernetes-workflow-kubectl-+-helm)
[Powered by GitBook](https://www.gitbook.com/?utm_source=content&utm_medium=trademark&utm_campaign=c5dAwvMCRiTxUOdDicqy)
 * [Define the Project](#define-the-project)
 * [Configure the Strategic Agent](#configure-the-strategic-agent)
 * [Configure the YOLO Agent](#configure-the-yolo-agent)
 * [Compare Outcomes](#compare-outcomes)
Was this helpful?
This tutorial explains how **Agent Profiles** in Warp influence behavior, autonomy, and planning when coding with AI — demonstrated through the NFL Predictor app example.
1
### 
[](#define-the-project)
Define the Project
I want to create an app that scrapes **NFL data** from the past decade, processes stats like team scores and player performance, and predicts future wins.
The prompt specifies:
 * Data sources and constraints
 * Dependencies and CLI commands
 * Implementation details and deliverables
Copy```
Role & Goal
You are my AI coding copilot inside Warp. 
Create a production-ready Python project that ingests 2015–2025 NFL data to power future win projections. 
Specifically: acquire week-level player and team stats, acquire game schedules + final scores (to determine weekly winners), and assemble a clean analytics dataset I can build models on later. Prefer stable/public data sources over brittle HTML scraping. Where scraping is unavoidable, respect robots.txt, add rate-limiting, and make scraping pluggable/optional. 
Primary data sources:
nflverse/nflreadr static files for weekly player stats and schedules (CSV/Parquet over HTTPS). 
Tech constraints:
Python 3.11+, no notebooks in the main flow. 
Deterministic, idempotent pipelines. 
Strong typing (pydantic) + docstrings. 
Parquet as the storage format; small sample CSVs for quick checks. 
CLI via Typer (warp run … friendly). 
Logging (structlog), retry/backoff (tenacity), polite rate-limits. 
Zero secrets required for core pipeline. 
Deliverables:
A fully initialized repo with the scaffold above.
Implemented CLI + modules to download/ingest 2015–2025 data, compute/normalize fantasy PPR, produce winners by week, and write Parquet outputs. 
One sample run in the README showing commands and example output counts. 
If successful, run full 2015–2025. 
Print a summary table (by season: games, players, weeks) at the end.
```
2
### 
[](#configure-the-strategic-agent)
Configure the Strategic Agent
**Base Model:** GPT‑5 (for reasoning) **Planning Model:** Claude 4 Opus (for detailed breakdowns)
Action
Permission
Apply code diffs
Agent decides
Read files
Agent decides
Create plans
Always allow
Execute commands
Always ask
Behavior:
 * The agent starts by asking clarifying questions:
> “Do you want me to scrape both player stats and schedules or just one first?” “Where should raw data be stored — locally or in a database?”
 * It builds a **14-step plan** covering setup, dependencies, validation modules, and pipelines.
 * When the agent requests NFL schedule URLs, the chosen source returns 404 errors.
 * Execution halts — showing that the **Strategic** profile prioritizes verification over progress.
3
### 
[](#configure-the-yolo-agent)
Configure the YOLO Agent
**Permissions:**
Action
Permission
Apply diffs / read files
Always allow
Create plans
Never
Execute commands
Always allow
Behavior:
 * The YOLO agent skips detailed planning.
 * It produces a **10-step plan** that covers essentials only:
 * Initialize project
 * Build CLI
 * Ingest player data
 * Compute scores and transformations
 * Instead of using unstable schedule URLs, it focuses on reliable player endpoints — completing a functional data pipeline.
4
### 
[](#compare-outcomes)
Compare Outcomes
Aspect
Strategic Agent
YOLO Agent
Planning
Detailed (14 steps)
Minimal (10 steps)
Interaction
Clarifications required
Autonomous
Speed
Slower due to checks
Faster iteration
Output
Stalled on invalid URLs
Working player dataset + summary table
[PreviousHow To: Run 3 Agents in Parallel (Summarize Logs + Analyze PR + Modify UI)](/university/developer-workflows/power-user/how-to-run-3-agents-in-parallel-summarize-logs-+-analyze-pr-+-modify-ui)[NextHow To: Sync Your Monorepos](/university/developer-workflows/power-user/how-to-sync-your-monorepos)
Last updated 15 days ago
Was this helpful?