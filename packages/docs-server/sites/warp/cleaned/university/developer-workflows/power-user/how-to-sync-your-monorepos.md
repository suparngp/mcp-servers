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
 * [Intro](#intro)
 * [The Problem](#the-problem)
 * [The Rule Setup](#the-rule-setup)
 * [Example Rule](#example-rule)
 * [When the schema updates — update server types](#when-the-schema-updates-update-server-types)
 * [When the schema updates — update client types](#when-the-schema-updates-update-client-types)
Was this helpful?
Learn how to use Warp’s Rules system to connect interrelated repositories and automate type updates across your stack.
* * *
## 
[](#intro)
Intro
This tutorial teaches you how to define **global Rules** in Warp so your coding agent understands how your projects relate to one another.
By linking monorepos (e.g., server, client, and shared API schemas), Warp automatically updates types and schemas across repos when you make a change in one place.
Although this example uses Warp’s internal repos, the same workflow applies to any multi-repo setup.
* * *
## 
[](#the-problem)
The Problem
When projects are split into multiple repos — like backend, client, and shared schema — developers often forget to synchronize type changes manually.
That’s error-prone and time-consuming. Warp solves this by teaching your **agent** the relationships between your repos through a global Rule.
* * *
## 
[](#the-rule-setup)
The Rule Setup
Describe each repository and its connection to the others.
### 
[](#example-rule)
Example Rule
Copy```
We have three inter-related projects in ~/Repos:
warp-internal (client-side application)
warp-server (server application)
warp-proto-apis (shared API schemas for each)
When you update the schema types, push to git and update the installed types in the server and client by the commit hash.
```
Once defined, Warp automatically follows these instructions when a schema file is changed.
1
### 
[](#when-the-schema-updates-update-server-types)
When the schema updates — update server types
`cd` into the server repository and run the appropriate commands to regenerate/update server-side types based on the changed schema.
2
### 
[](#when-the-schema-updates-update-client-types)
When the schema updates — update client types
`cd` into the client repository and run the appropriate commands to regenerate/update client-side types so the client stays in sync with the schema changes.
* * *
Benefits
 * Keeps your **schema, server, and client** perfectly in sync
 * Reduces merge conflicts and version drift
 * Saves manual steps when committing or deploying
[PreviousHow To: Configure YOLO and Strategic Agent Profiles](/university/developer-workflows/power-user/how-to-configure-yolo-and-strategic-agent-profiles)[NextHow To: Review PRs Like A Senior Dev](/university/developer-workflows/power-user/how-to-review-prs-like-a-senior-dev)
Last updated 15 days ago
Was this helpful?