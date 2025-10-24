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
 * [🧠 Overview](#overview)
 * [Launch Agents in Parallel](#launch-agents-in-parallel)
 * [Monitor All Agents](#monitor-all-agents)
 * [Review Results](#review-results)
 * [Why This Matters](#why-this-matters)
Was this helpful?
This educational module demonstrates Warp’s multi‑threading features — running coding, debugging, and analysis tasks simultaneously in multiple agent tabs.
* * *
### 
[](#overview)
🧠 Overview
Warp allows you to launch several agents at once, each focused on a separate task. In the demo, we run three parallel workflows:
 * Modify UI behavior
 * Analyze team code reviews
 * Summarize logs from production
1
### 
[](#launch-agents-in-parallel)
Launch Agents in Parallel
Each agent runs in its own tab.
UI Fix
Code Review Check
Log Analysis
Remove the background and border from unfocused input panes.
Copy```
I'd like to make a coding change. Please create a new branch to do this.
What i want to do is for the Universal Developer Input, remove the border and background if it's being rendered in the same pane that is not focused. Please look at the reference file and at the attached screenshot. In the screenshot, you'll see what it looks like right now - there are two equally prominent input areas, even though one is focused and one is not. What I want to do is make the non-focused one not have a border and not have a background. 
Please check out this linear issue for more information. Also, give me a plan before you make any changes.
```
Analyze how many pull requests a team member has assigned.
Copy```
Use the Github CLI tool to summarize all open PRs for review that are assigned to user. I'd like to see who is the author of the PR, when was it opened, how long has it been open for, which repo is it in, are there open an dunaddressed commens on it, and is it ready for review?
```
Summarize Cloud Run logs by error severity.
Copy```
Use the gcloud tool to list all my open projects. Once you've done that, let me select a project. Once I've selected a project, we will want to see all the Cloud Run instances that are available. Then once I've picked a Cloud Run instance, I'd like to get a sumary of the last 2000 logs from that Cloud Run instance to see the history histogram of different types of logging on info, warning, and error levels.
```
2
### 
[](#monitor-all-agents)
Monitor All Agents
The **task pane** in Warp shows all running agents. You can view plans, progress, and results live without interrupting other tasks.
3
### 
[](#review-results)
Review Results
 * **Coding Agent:** Implements UI fixes accurately.
 * **Code Review Agent:** Reports 26 open PRs (identifies bottlenecks).
 * **Log Agent:** Analyzes 1,000 log entries, categorizing errors and flagging Gemini API issues.
4
### 
[](#why-this-matters)
Why This Matters
Warp multi‑agent execution allows you to:
 * Run multiple tasks without context switching.
 * Keep coding, debugging, and ops visible simultaneously.
 * Use AI assistants collaboratively for faster iteration.
Multi‑agent workflows let you debug, code, and analyze in parallel — boosting throughput without leaving the terminal.
[PreviousPower User](/university/developer-workflows/power-user)[NextHow To: Configure YOLO and Strategic Agent Profiles](/university/developer-workflows/power-user/how-to-configure-yolo-and-strategic-agent-profiles)
Last updated 15 days ago
Was this helpful?