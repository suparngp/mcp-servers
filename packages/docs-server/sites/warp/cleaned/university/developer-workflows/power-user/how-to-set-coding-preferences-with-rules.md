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
 * [The Problem](#the-problem)
 * [The Rule Setup](#the-rule-setup)
 * [Supported Use Cases](#supported-use-cases)
Was this helpful?
Learn how to use Warp’s Rules feature to define your personal environment and tool preferences for every coding session.
This tutorial teaches you how to customize your development setup using **Warp’s Rules** — ensuring the AI agent always works in your preferred environment. Instead of constantly reminding it which package manager or environment to use, you can **store those preferences as persistent Rules** that apply automatically across projects.
1
### 
[](#the-problem)
The Problem
When using AI tools to write or modify code, they often default to outdated or undesired tools. For example, many agents still use **npm** instead of **pnpm** — or **pip** instead of **miniconda**.
Warp fixes this by letting you define your preferences once, and then applying them automatically whenever your agent runs commands.
2
### 
[](#the-rule-setup)
The Rule Setup
You can set Rules for how you want the AI to handle environments, dependencies, and commands.
**Example Rule**
Example Rule
Copy```
Rule: Environment Preferences
- Always use pnpm for Node.js projects unless the project already uses npm.
- Default to miniconda for Python environments.
- Use the Tauri CLI when building desktop apps.
```
This ensures the agent automatically chooses the right package manager or environment — no extra prompts required.
3
### 
[](#supported-use-cases)
Supported Use Cases
You can apply Rules to:
 * Package managers (e.g., npm → pnpm)
 * Environment tools (e.g., virtualenv → miniconda)
 * Framework defaults (e.g., Next.js over React)
 * CLI utilities or custom build tools
[PreviousHow To: Set Tech Stack Preferences with Rules](/university/developer-workflows/power-user/how-to-set-tech-stack-preferences-with-rules)[NextDevOps](/university/developer-workflows/devops)
Last updated 15 days ago
Was this helpful?