[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * [Getting Started](/university)
 * Developer Workflows
 * [Beginner](/university/developer-workflows/beginner)
 * [Power User](/university/developer-workflows/power-user)
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
 * [Enabling MCP in Warp](#enabling-mcp-in-warp)
 * [Querying Stripe](#querying-stripe)
 * [Querying SQLite](#querying-sqlite)
 * [Why This Matters](#why-this-matters)
Was this helpful?
This tutorial teaches you how to use **MCP servers** to connect Warp to **Stripe** and **SQLite** , showing how AI transforms the command line into a connected, conversational workspace.
1
### 
[](#enabling-mcp-in-warp)
Enabling MCP in Warp
Warp now supports configuring any MCP server directly from the terminal.
To set it up:
 * Open **Settings → AI → MCP Servers** in Warp.
 * Click **Add Server** , and choose from a list of available MCP configurations.
 * Once added, Warp automatically connects and authorizes the agent to use those tools.
In this demo, two MCP servers were enabled:
 * **SQLite Server** – for running local database queries
 * **Stripe Server** – for retrieving and analyzing payment data
2
### 
[](#querying-stripe)
Querying Stripe
Once configured, you can issue conversational prompts to the terminal — no manual API calls required.
Example — Querying Stripe
Copy```
How many customers do I have in Stripe?
```
Warp connects to the Stripe MCP server, confirms the action, and returns:
> “You have 3 customers.”
You can continue naturally:
Copy```
List the payments made by the first customer.
```
The agent retrieves seven payment intents — one successful, six canceled — all live from your Stripe test account.
Note: MCP’s confirmation prompts can be disabled once you trust a given server or agent.
3
### 
[](#querying-sqlite)
Querying SQLite
The same workflow applies to databases.
Example — Querying SQLite
Copy```
What SQL tables do I have access to?
```
Warp lists all available tables from the local SQLite database.
Copy```
Break down female penguins by island.
```
Warp translates this into a structured SQL query and executes it, returning:
> “Bisco Island — 51 female penguins; Dream Island — ...”
Follow-up prompts work contextually:
Copy```
Do the same with male penguins.
```
Warp runs the updated SQL query and displays results inline.
4
### 
[](#why-this-matters)
Why This Matters
This demo highlights how Warp’s AI and MCP support combine to make your terminal:
 * **Connected** — Access cloud APIs, local data, or enterprise tools instantly.
 * **Conversational** — Run natural language prompts for structured data retrieval.
5
“Even two years ago, no one could’ve imagined a terminal capable of this. Warp has officially redefined what a terminal can be.” — Santiago
[PreviousLinear MCP: Updating Tickets with a Lean Build Approach](/university/mcp-servers/linear-mcp-updating-tickets-with-a-lean-build-approach)[NextImprove Your Kubernetes Workflow (kubectl + helm)](/university/terminal-command-line-tips/improve-your-kubernetes-workflow-kubectl-+-helm)
Last updated 15 days ago
Was this helpful?