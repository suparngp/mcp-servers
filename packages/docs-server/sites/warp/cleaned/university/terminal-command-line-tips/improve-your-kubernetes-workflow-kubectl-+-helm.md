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
 * [AI Integration in the Terminal](#ai-integration-in-the-terminal)
 * [Building AI-Aided Context](#building-ai-aided-context)
 * [Active AI Suggestions](#active-ai-suggestions)
 * [Custom Workflows](#custom-workflows)
 * [Synchronized Panes and Tabs](#synchronized-panes-and-tabs)
 * [Modern Text Editing](#modern-text-editing)
Was this helpful?
Discover how Warp’s modern terminal features streamline Kubernetes workflows through AI assistance, automation, and intuitive design.
## 
[](#overview)
Overview
This guide covers 6 key Warp features that enhance Kubernetes productivity:
1
### 
[](#ai-integration-in-the-terminal)
AI Integration in the Terminal
Warp’s **Agent Mode** (`Cmd + I`) lets you run complex Kubernetes operations with plain-English prompts.
**Examples**
Copy```
When does my wildcard TLS certificate expire?
```
Warp auto-detects namespaces, runs `kubectl` commands, and outputs expiration details.
Copy```
Generate a command to identify all pods running as root across all namespaces.
```
Warp builds and runs the corresponding `kubectl` + `grep` query, returning a security report.
Ideal for on-the-fly debugging or compliance checks without leaving your terminal.
2
### 
[](#building-ai-aided-context)
Building AI-Aided Context
You can attach any command’s output as context for follow-up prompts. For instance, right-click log output → “Attach as Agent Context,” then run:
Copy```
I’m sending anonymous usage data in Traefik. How can I disable it?
```
Warp detects the Helm chart and outputs the required YAML config to disable stats reporting.
3
### 
[](#active-ai-suggestions)
Active AI Suggestions
Warp automatically suggests next actions. Examples of suggested actions:
 * After `kubectl describe pod` it might propose:
> “Check the logs of this pod.”
 * When running `sudo apt update` it detects available upgrades and offers:
> “Run sudo apt upgrade to update packages.”
4
### 
[](#custom-workflows)
Custom Workflows
Create reusable, parameterized commands for common operations like:
Example workflow
Copy```
helm upgrade <chart> --namespace <namespace> -f <values.yaml>
```
Accessible from the **Command Palette (**`**Cmd + P**`**)** , workflows make repetitive Kubernetes tasks fast and standardized.
5
### 
[](#synchronized-panes-and-tabs)
Synchronized Panes and Tabs
Link multiple terminal panes or tabs (e.g., master + worker nodes). When synchronization is active, running:
Copy```
sudo apt update
```
executes simultaneously across all linked sessions.
6
### 
[](#modern-text-editing)
Modern Text Editing
Warp supports **click-to-edit** for commands — no more arrow key gymnastics. Hovering shows inline **tooltips** explaining flags and subcommands (e.g., Helm, kubectl, etc.), with autocompletions for 400+ CLI tools.
[PreviousSQLite and Stripe MCP: Basic Queries You Can Make After Set Up](/university/mcp-servers/sqlite-and-stripe-mcp-basic-queries-you-can-make-after-set-up)
Last updated 15 days ago
Was this helpful?