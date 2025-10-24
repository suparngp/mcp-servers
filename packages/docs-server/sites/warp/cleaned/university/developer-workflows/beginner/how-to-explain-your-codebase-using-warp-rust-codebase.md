[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * [Getting Started](/university)
 * Developer Workflows
 * [Beginner](/university/developer-workflows/beginner)
 * [How to: Explain Your Codebase Using Warp (Rust Codebase)](/university/developer-workflows/beginner/how-to-explain-your-codebase-using-warp-rust-codebase)
 * [How To: Create Project Rules for an Existing Project (Astro + Typescript + Tailwind)](/university/developer-workflows/beginner/how-to-create-project-rules-for-an-existing-project-astro-+-typescript-+-tailwind)
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
 * [Prompt](#prompt)
 * [How Warp’s Agent Searches](#how-warps-agent-searches)
 * [Generated Explanation](#generated-explanation)
Was this helpful?
Learn how to use Warp’s AI agent to explore and understand large, unfamiliar codebases — using semantic and symbol-level search.
* * *
## 
[](#overview)
Overview
This walkthrough shows:
 * How Warp explains unknown sections of code
 * How it combines semantic and keyword searches
 * How to use these insights to modify UI components
* * *
1
### 
[](#prompt)
Prompt
prompt.txt
Copy```
Please explain how the agent popup code is structured,
where it lives in the codebase,
and how it is rendered and called.
I want to understand the full data flow and structure
so I can add a new agent button to it.
```
2
### 
[](#how-warps-agent-searches)
How Warp’s Agent Searches
Warp begins by using **semantic (vectorized) search** to locate relevant files. Once it finds probable matches (e.g., `agent_management_popup.rs`), it switches to **symbolic search** (`grep` and direct code reads).
Warp intelligently reads large files (splitting them into smaller chunks) to extract relevant definitions and render logic.
3
### 
[](#generated-explanation)
Generated Explanation
Warp returns a full breakdown:
 * File paths where the popup is defined
 * How it’s rendered within the workspace
 * Which actions and UI components trigger it
 * A step-by-step view of data flow through the popup component
[PreviousBeginner](/university/developer-workflows/beginner)[NextHow To: Create Project Rules for an Existing Project (Astro + Typescript + Tailwind)](/university/developer-workflows/beginner/how-to-create-project-rules-for-an-existing-project-astro-+-typescript-+-tailwind)
Last updated 15 days ago
Was this helpful?