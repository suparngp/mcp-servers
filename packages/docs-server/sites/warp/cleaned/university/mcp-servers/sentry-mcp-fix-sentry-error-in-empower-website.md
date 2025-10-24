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
 * [Overview](#overview)
 * [Set Up the Sentry MCP Server](#set-up-the-sentry-mcp-server)
 * [Run Your App and Trigger an Error](#run-your-app-and-trigger-an-error)
 * [Capture the Error in Sentry](#capture-the-error-in-sentry)
 * [Diagnose the Error Using Warp](#diagnose-the-error-using-warp)
 * [Apply the Generated Fix](#apply-the-generated-fix)
 * [Integrate Into Your Workflow](#integrate-into-your-workflow)
Was this helpful?
This tutorial is based solely on the provided transcript. It teaches how to use the **Sentry MCP Server** within Warp to fetch live error data from Sentry, analyze stack traces, and automatically generate fixes for issues in your codebase.
### 
[](#overview)
Overview
The **Sentry MCP server** gives Warp’s AI agents access to authenticated Sentry error data. This enables detailed diagnostics and automated fixes that would otherwise be impossible using AI alone.
You’ll learn how to:
 * Connect the Sentry MCP server inside Warp.
 * Trigger live error retrieval from Sentry.
 * Diagnose code issues and generate patches automatically.
 * Integrate Sentry debugging into your daily development loop.
1
### 
[](#set-up-the-sentry-mcp-server)
Set Up the Sentry MCP Server
Open the MCP panel in Warp:
 * Mac: Cmd + Shift + P
 * Windows/Linux: Ctrl + Shift + P Search for “MCP” and select the **MCP Panel**.
Click **Add** , then paste your configuration:
sentry-mcp-config.json
Copy```
{
 "sentry": {
 "command": "npx",
 "args": [
 "-y",
 "mcp-remote@latest",
 "https://mcp.sentry.dev/mcp"
 ],
 "env": {},
 "working_directory": null
 }
}
```
Save the configuration and ensure it appears in the MCP panel.
2
### 
[](#run-your-app-and-trigger-an-error)
Run Your App and Trigger an Error
We're using the [**Empower Plant** repository](https://github.com/sentry-demos/empower) — Sentry’s official demo project. This fake e-commerce app includes a React frontend and multiple backends, each containing intentional bugs for testing.
Run the app locally:
Copy```
npm install
npm start
```
Open the site in your browser and trigger a few known errors.
3
### 
[](#capture-the-error-in-sentry)
Capture the Error in Sentry
 1. Go to your **Sentry Dashboard**.
 2. Locate the triggered issue (for example, a `TypeError`).
 3. Copy the issue’s URL from the Sentry interface.
Example:
Copy```
https://sentry.io/organizations/demo/issues/12345/
```
4
### 
[](#diagnose-the-error-using-warp)
Diagnose the Error Using Warp
Back in Warp, prompt the AI agent to fetch and analyze the issue:
Copy```
Diagnose this Sentry error and show where it’s coming from in my code.
Create a fix.
```
The Sentry MCP calls `getIssueDetails`, fetching the stack trace and error metadata directly from Sentry. Warp then scans your local codebase, cross-references the error location, and identifies the root cause.
From this example:
> The issue was caused by calling `.toUpperCase()` on an array instead of a string.
Warp’s agent automatically writes a fix — changing the code to handle the array properly.
5
### 
[](#apply-the-generated-fix)
Apply the Generated Fix
Warp produces a suggested code change inline. Review the diff and apply it automatically with one click.
6
### 
[](#integrate-into-your-workflow)
Integrate Into Your Workflow
Use Sentry MCP whenever you encounter production or staging errors. Warp can pull the latest issues, analyze them, and suggest patches.
Ideal for:
 * Debugging live production errors.
 * Triaging complex stack traces.
 * Creating immediate hot-fixes without switching tools.
With Sentry MCP, Warp becomes a live debugging console — connecting your code editor, terminal, and Sentry into a single intelligent feedback loop.
[PreviousPuppeteer MCP: Scraping Amazon Web Reviews ](/university/mcp-servers/puppeteer-mcp-scraping-amazon-web-reviews)[NextContext7 MCP: Update Astro Project with Best Practices](/university/mcp-servers/context7-mcp-update-astro-project-with-best-practices)
Last updated 15 days ago
Was this helpful?