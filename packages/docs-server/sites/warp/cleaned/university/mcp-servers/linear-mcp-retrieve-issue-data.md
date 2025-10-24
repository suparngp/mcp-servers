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
 * [1. Adding the Linear MCP Serve](#id-1.-adding-the-linear-mcp-serve)
 * [2. Testing the Connection](#id-2.-testing-the-connection)
Was this helpful?
Learn how to connect the Linear MCP server in Warp so your AI agent can access live data — like issues, tickets, and user assignments — directly from your Linear workspace.
* * *
#### 
[](#overview)
Overview
This tutorial covers how to:
 * Add and configure a Linear MCP server in Warp
 * Use MCP to query and retrieve issue data
### 
[](#id-1.-adding-the-linear-mcp-serve)
1. Adding the Linear MCP Serve
#### 
[](#add-a-new-server-in-warp)
Add a new server in Warp
 * In Warp, open Warp Drive → Personal → MCP Servers. Alternatively, press `⌘P` and type **MCP servers** to open the palette.
 * Click **Add New Server**.
 * Paste in this JSON
Copy```
{
 "linear": {
 "command": "npx",
 "args": ["-y", "mcp-remote", "https://mcp.linear.app/sse"],
 "env": {},
 "working_directory": null
 } 
}
```
 * Click Save.
 * Warp will immediately start the server. 
 * You should now see Linear MCP listed as Running.
* * *
### 
[](#id-2.-testing-the-connection)
2. Testing the Connection
After saving, retry your earlier query:
Copy```
Show me all Linear tasks assigned to me.
```
Warp’s agent will now call the Linear MCP server to fetch your data. You can click inside the response panel to inspect the **raw API response** — ideal for debugging or understanding what’s being fetched.
If the server can’t find your user, it may be due to your Linear login address. Try querying a teammate to confirm the connection:
Copy```
Show tasks assigned to [teammate name].
```
Once verified, the agent can display a full list of tasks.
[PreviousFigma Remote MCP: Create a Website from a Figma File from Scratch](/university/mcp-servers/figma-remote-mcp-create-a-website-from-a-figma-file-from-scratch)[NextLinear MCP: Updating Tickets with a Lean Build Approach](/university/mcp-servers/linear-mcp-updating-tickets-with-a-lean-build-approach)
Last updated 15 days ago
Was this helpful?