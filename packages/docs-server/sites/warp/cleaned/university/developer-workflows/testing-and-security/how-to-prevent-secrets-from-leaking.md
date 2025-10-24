[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * [Getting Started](/university)
 * Developer Workflows
 * [Beginner](/university/developer-workflows/beginner)
 * [Power User](/university/developer-workflows/power-user)
 * [DevOps](/university/developer-workflows/devops)
 * [Backend](/university/developer-workflows/backend)
 * [Frontend / UI](/university/developer-workflows/frontend-ui)
 * [Testing & Security](/university/developer-workflows/testing-and-security)
 * [How to: Generate Unit and Security Tests to Debug Faster](/university/developer-workflows/testing-and-security/how-to-generate-unit-and-security-tests-to-debug-faster)
 * [How To: Prevent Secrets from Leaking](/university/developer-workflows/testing-and-security/how-to-prevent-secrets-from-leaking)
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
 * [Benefits](#benefits)
Was this helpful?
Learn how to safeguard credentials and sensitive data using Warp’s secret-reduction and Rule system.
This tutorial shows how to use Warp’s **Rules** to prevent AI agents or collaborators from exposing sensitive information while coding or sharing output. Whether you’re pair-programming, streaming, or reviewing code, Warp can automatically redact secrets before they’re ever seen by an agent.
1
### 
[](#the-problem)
The Problem
AI assistants often echo API keys, tokens, or credentials in generated code blocks. When collaborating or screen-sharing, that can expose secrets publicly.
2
### 
[](#the-rule-setup)
The Rule Setup
Define a simple Rule in Warp that instructs the agent to **never display secrets** in outputs or commands.
Example Rule
Copy```
Rule: Protect Secrets
Behavior:
- Never include or reveal secrets when generating code or commands.
- Automatically redact sensitive strings before showing output.
```
Enable Warp’s built-in Secret Reduction:
Settings → AI → Enable Secret Reduction
This automatically masks sensitive values before the agent or output logs can access them.
3
### 
[](#benefits)
Benefits
 * Protects API keys and credentials from exposure
 * Keeps live streams and demos safe
 * Works seamlessly with pair-programming or AI debugging
[PreviousHow to: Generate Unit and Security Tests to Debug Faster](/university/developer-workflows/testing-and-security/how-to-generate-unit-and-security-tests-to-debug-faster)[NextBuilding a Real-time Chat App (Github MCP + Railway )](/university/end-to-end-builds/building-a-real-time-chat-app-github-mcp-+-railway)
Last updated 15 days ago
Was this helpful?