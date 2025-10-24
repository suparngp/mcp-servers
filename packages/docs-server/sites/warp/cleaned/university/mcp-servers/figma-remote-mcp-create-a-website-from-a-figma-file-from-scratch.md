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
 * [What Is a Remote MCP Server?](#what-is-a-remote-mcp-server)
 * [Connect Figma MCP to Warp](#connect-figma-mcp-to-warp)
 * [What the Figma MCP Server Provides](#what-the-figma-mcp-server-provides)
 * [Generate a Website from a Figma File](#generate-a-website-from-a-figma-file)
 * [Iterating on Output](#iterating-on-output)
 * [Persistent Input Feature](#persistent-input-feature)
 * [Recap](#recap)
Was this helpful?
Learn how to connect Warp to Figma’s remote MCP server to generate code directly from your design files — complete with screenshots, metadata, and design system context.
* * *
## 
[](#overview)
Overview
This guide covers how to:
 * Connect Warp to the **remote Figma MCP server**
 * Log in securely using OAuth
 * Use the server to pull live context (components, variables, and assets) from your Figma designs
 * Generate front-end code based on your UI files
 * Iterate and refine output directly in Warp
* * *
1
### 
[](#what-is-a-remote-mcp-server)
What Is a Remote MCP Server?
A **remote MCP server** runs outside your local machine — Warp connects to it through a secure network call. This means you don’t have to manage processes, ports, or tokens manually. Warp handles setup, authentication, and communication for you.
2
### 
[](#connect-figma-mcp-to-warp)
Connect Figma MCP to Warp
 * Copy the Figma MCP configuration JSON
Copy```
{
 "Figma": {
 "url": "https://mcp.figma.com/mcp"
 }
}
```
 * In Warp, paste the JSON — Warp will automatically open an OAuth login window.
 * Log in once with your **Figma account** credentials.
You will need a Figma Dev account for this to work.
3
### 
[](#what-the-figma-mcp-server-provides)
What the Figma MCP Server Provides
Once connected, the server enables Warp’s AI to understand your design context by fetching:
Type
Description
`**get_screenshot**`
Helps the AI visualize layout and relationships between elements.
`**create_design_system_rules**`
Components, variables, and styles for consistent, reusable code.
`**get_code**`
Extracts code from your Figma design for direct use in projects.
`**get_metadata**`
Includes text, images, and layer names for more realistic mock data.
4
### 
[](#generate-a-website-from-a-figma-file)
Generate a Website from a Figma File
Basic flow:
 * Copy your **Figma file link** :
 * Right-click → _Copy / Paste As → Copy Link to Selection_
 * In Warp, paste a prompt to create a website based on that design.
Prompt:
Prompt
Copy```
Create a website from this Figma file: <LINK HERE>
Follow the design layout and use these guidelines:
- Match spacing and typography from the design
- Use Tailwind CSS and TypeScript
- Make components reusable
```
Warp uses the Figma MCP server to pull all necessary context and begin generating code diffs.
5
### 
[](#iterating-on-output)
Iterating on Output
 * In under five minutes, Warp generates a working site structure based on the Figma layout.
 * Missing assets (e.g., logos or images) are automatically referenced in an `assets/` folder.
 * Warp prompts you to add any missing files before continuing.
6
### 
[](#persistent-input-feature)
Persistent Input Feature
Warp’s **persistent input** allows mid-process updates. If you forget an image (e.g., the Misho logo), simply upload it and notify Warp:
Copy```
I’ve uploaded the Misho logo to the assets folder.
```
Warp will automatically detect and use it during the same generation session.
7
### 
[](#recap)
Recap
 * Warp now supports **remote MCP servers** for Figma (and others like GitHub, Sentry, and Linear).
 * OAuth login streamlines setup and removes manual token handling.
 * The Figma MCP integration enables rapid, context-aware code generation.
 * Persistent input and real-time iteration make design-to-code workflows seamless.
In under 20 minutes, you can go from Figma design to a functioning website — all powered by Warp’s AI coding environment.
[PreviousContext7 MCP: Update Astro Project with Best Practices](/university/mcp-servers/context7-mcp-update-astro-project-with-best-practices)[NextLinear MCP: Retrieve issue data](/university/mcp-servers/linear-mcp-retrieve-issue-data)
Last updated 15 days ago
Was this helpful?