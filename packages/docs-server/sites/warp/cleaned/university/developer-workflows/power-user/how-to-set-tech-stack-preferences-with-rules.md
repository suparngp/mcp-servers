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
 * [Why It Matters](#why-it-matters)
Was this helpful?
Learn how to guide Warp’s AI to use your favorite tech stack when scaffolding new apps or generating code.
* * *
## 
[](#intro)
Intro
This tutorial walks you through teaching Warp’s AI your **preferred technologies** so it consistently uses the frameworks and stacks you care about.
By setting up tech stack Rules, you make sure every new project follows your conventions — whether you prefer **Astro** , **SvelteKit** , **Next.js** , or something else.
* * *
## 
[](#the-problem)
The Problem
When you ask AI to scaffold a new web app, it often defaults to **React** and **Express** , or other older stacks. This creates friction when your workflow is based on modern tools or opinionated frameworks.
Warp solves this by letting you **store your stack preferences** directly as Rules.
* * *
## 
[](#the-rule-setup)
The Rule Setup
Create a simple Rule that defines your favorite frameworks for each project type.
### 
[](#example-rule)
Example Rule
Copy```
Rule: Tech Stack Preferences
- Use Astro for websites.
- Use SvelteKit for desktop apps.
- Prefer Vite for build tooling.
- Avoid legacy stacks like Create React App or Express.
```
Once added, Warp’s AI automatically applies these defaults when generating new projects or updating existing ones.
Think of it like setting a default coding personality for your agent.
* * *
## 
[](#why-it-matters)
Why It Matters
Defining your stack preferences helps the AI:
 * Generate **consistent boilerplates**
 * Follow your **current tech standards**
 * Skip outdated or irrelevant dependencies
[PreviousHow To: Set Coding Best Practices](/university/developer-workflows/power-user/how-to-set-coding-best-practices)[NextHow To: Set Coding Preferences with Rules](/university/developer-workflows/power-user/how-to-set-coding-preferences-with-rules)
Last updated 15 days ago
Was this helpful?