[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * [Getting Started](/university)
 * Developer Workflows
 * [Beginner](/university/developer-workflows/beginner)
 * [Power User](/university/developer-workflows/power-user)
 * [DevOps](/university/developer-workflows/devops)
 * [How to: Analyze Cloud Run Logs (gcloud)](/university/developer-workflows/devops/how-to-analyze-cloud-run-logs-gcloud)
 * [How To: Create a Production Ready Docker Setup](/university/developer-workflows/devops/how-to-create-a-production-ready-docker-setup)
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
 * [Setting the Context](#setting-the-context)
 * [Warp’s Agent in Action](#warps-agent-in-action)
 * [Automated Analysis](#automated-analysis)
 * [Reviewing Results](#reviewing-results)
Was this helpful?
Learn how to use Warp to retrieve, organize, and analyze production logs from your cloud servers — all with natural language prompts.
1
### 
[](#setting-the-context)
Setting the Context
Open Warp and enable **voice input** (optional) for hands-free prompting.
Voice input is optional — only enable it if you prefer hands-free prompting.
**Prompt**
Copy```
Use the warp-server-staging gcloud project and pull logs
for the last 10 minutes from the warp-server Cloud Run instance.
Organize them by info, warning, and error levels.
Create a histogram across message types,
and highlight the most concerning errors to investigate.
```
2
### 
[](#warps-agent-in-action)
Warp’s Agent in Action
After you hit Enter:
 * Warp detects the command as an **Agent Mode** request.
 * It gathers project context (`warp-server-staging`).
 * Executes the necessary `gcloud` logging queries automatically.
 * Writes retrieved data to a temporary file for processing.
3
### 
[](#automated-analysis)
Automated Analysis
Warp’s agent generates a **Python script** on the fly to:
 * Parse logs
 * Count messages by severity
 * Output summary metrics
Example output:
Copy```
1,000 log entries total
980 info
11 warning
9 errors
```
You can view or fast-forward execution, or stop the process at any point.
4
### 
[](#reviewing-results)
Reviewing Results
Warp outputs a readable histogram and highlights anomalies. For example:
> “Gemini AI error messages detected — worth reviewing.”
You can expand each log group interactively or inspect the temporary Python code for debugging.
[PreviousDevOps](/university/developer-workflows/devops)[NextHow To: Create a Production Ready Docker Setup](/university/developer-workflows/devops/how-to-create-a-production-ready-docker-setup)
Last updated 15 days ago
Was this helpful?