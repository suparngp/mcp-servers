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
 * [🧠 Overview](#overview)
 * [Add the Context7 Server](#add-the-context7-server)
 * [Run the Update Prompt](#run-the-update-prompt)
 * [Review the Automatic Code Changes](#review-the-automatic-code-changes)
 * [Best Use Cases](#best-use-cases)
Was this helpful?
This tutorial shows how the **Context7 MCP Server** gives Warp agents real‑time access to documentation for upgrading frameworks and codebases automatically.
* * *
## 
[](#overview)
🧠 Overview
The **Context7 MCP Server** lets Warp fetch live documentation from across the web. In the example, the agent updates an older **Astro** project to align with the latest version (Astro 5).
* * *
1
### 
[](#add-the-context7-server)
Add the Context7 Server
 * Open Warp’s **MCP Panel** via the Command Palette.
 * Add the **Context7 JSON config** and click **Save**.
Copy```
{
 "Context7": {
 "command": "npx",
 "args": [
 "-y",
 "@upstash/context7-mcp"
 ],
 "env": {},
 "working_directory": null
 }
}
```
 * This enables the endpoint `getLibraryDocs`, which retrieves live documentation directly from the official sources.
2
### 
[](#run-the-update-prompt)
Run the Update Prompt
The developer issues this prompt:
prompt.txt
Copy```
Create a new git branch called update and in that branch update this Astro project to follow all the latest best practices based on all Astro and developer documentation.
```
3
### 
[](#review-the-automatic-code-changes)
Review the Automatic Code Changes
The transcript shows that Warp automatically:
 * Updates Tailwind import syntax
 * Improves TypeScript configuration
 * Optimizes build settings
 * Enhances accessibility rules
These edits happen across multiple files — without manually searching docs or changelogs.
4
### 
[](#best-use-cases)
Best Use Cases
 * Migrating old Astro, React, or Vue projects
 * Refreshing codebases to reflect recent standards
 * Saving time otherwise spent reading version notes
Context7 MCP automates documentation lookups — letting Warp update your project intelligently based on live references.
[PreviousSentry MCP: Fix Sentry Error in Empower Website](/university/mcp-servers/sentry-mcp-fix-sentry-error-in-empower-website)[NextFigma Remote MCP: Create a Website from a Figma File from Scratch](/university/mcp-servers/figma-remote-mcp-create-a-website-from-a-figma-file-from-scratch)
Last updated 15 days ago
Was this helpful?