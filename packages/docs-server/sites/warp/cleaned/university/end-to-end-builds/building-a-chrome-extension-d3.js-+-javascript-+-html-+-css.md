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
 * [Set up your environment and create a new Chrome Extension project](#set-up-your-environment-and-create-a-new-chrome-extension-project)
 * [Test the initial D3.js rendering](#test-the-initial-d3.js-rendering)
 * [Version control and GitHub setup](#version-control-and-github-setup)
 * [Add a local test page and dynamic data](#add-a-local-test-page-and-dynamic-data)
 * [Coordinate multiple agents in parallel](#coordinate-multiple-agents-in-parallel)
 * [Refine styles and interactions](#refine-styles-and-interactions)
 * [Add an API key setup screen](#add-an-api-key-setup-screen)
 * [Publish to the Chrome Web Store](#publish-to-the-chrome-web-store)
 * [Summary](#summary)
Was this helpful?
This educational module teaches you step-by-step how to replicate the process shown in the video — building a **Sankey diagram Chrome extension** using **D3.js** , debugging, coordinating **multiple AI agents** , and deploying to the **Chrome Web Store**.
1
### 
[](#set-up-your-environment-and-create-a-new-chrome-extension-project)
Set up your environment and create a new Chrome Extension project
Our goal: build a Chrome extension called **“Sankey Stone”** that visualizes flows using **D3.js**.
Files created during setup
 * `manifest.json`
 * `popup.html`
 * `popup.css`
 * `popup.js`
 * Icon images (`icon16.png`, `icon32.png`, `icon48.png`, etc.)
Enable Developer Mode in Chrome and load the project:
chrome://extensions → Developer Mode → Load unpacked → Select your project folder
If you see errors like “Failed to load extension” or “Could not load icon 16.png,” double‑check your manifest paths and icon filenames. The transcript explicitly shows these initial debugging steps.
2
### 
[](#test-the-initial-d3.js-rendering)
Test the initial D3.js rendering
After fixing missing icons, the extension loads but initially shows only “Loading diagram.” Debug this by taking a screenshot and feeding it to an AI agent for context by asking:
Copy```
It says loading diagram — why isn’t the chart appearing?
```
An agent reviews the error and regenerates the `popup.js` so the Sankey chart appears using **D3.js**.
Result: a working, interactive diagram rendered inside the extension popup.
3
### 
[](#version-control-and-github-setup)
Version control and GitHub setup
Initialize a Git repository and commit:
Copy```
gitinit
gitadd.
gitcommit-m"Initial Sankey Stone extension"
```
The developer asks the agent to create a GitHub repo and push the code. The agent handles authentication, creates the remote repo, and pushes all files automatically.
4
### 
[](#add-a-local-test-page-and-dynamic-data)
Add a local test page and dynamic data
Launch a simple local web server with a test page that outputs traffic flow data. The extension reads this data and updates the Sankey diagram dynamically.
Transcript example prompt:
Copy```
Update the test data page so that it generates random labels and different contexts when I hit the regenerate button.
```
The agent edits the test page so that clicking the **Regenerate Test Page** button updates the diagram in real time.
5
### 
[](#coordinate-multiple-agents-in-parallel)
Coordinate multiple agents in parallel
The video demonstrates running **multiple agents** in parallel. Each agent receives a different task:
Agent
Task
#1
`Update the test data page to randomize labels and values`
#2
`Change the refresh page button to regenerate the chart in a different style`
#3
`Generate a useful README file for the project`
You can approve actions automatically by enabling **Auto‑approve all agent actions** so background updates run without manual confirmation.
Running multiple agents in parallel mirrors having a small team: one agent focuses on data generation, another on UI changes, and a third on documentation.
6
### 
[](#refine-styles-and-interactions)
Refine styles and interactions
After the data layer works, now you can iterate on appearance:
Copy```
Apply new color themes and improve the layout.
```
Changes applied:
 * Support for multiple color themes and improved node layout.
 * Hovering over links highlights connected nodes.
 * Users can drag nodes to rearrange the layout.
 * Added a “Switch Style” button to cycle between themes.
To support exporting diagrams, you can ask:
Copy```
Add a button to download this image as a PNG.
```
The Warp agent writes the JS logic for PNG export and verifies that clicking the button saves a screenshot of the diagram.
7
### 
[](#add-an-api-key-setup-screen)
Add an API key setup screen
Create a settings page where users can store API keys:
Copy```
Add a settings page to enter the Anthropic API key and test it.
```
 * The page allows testing the key to ensure it works.
 * API keys are stored locally in the browser, not sent to a server.
8
### 
[](#publish-to-the-chrome-web-store)
Publish to the Chrome Web Store
Package and submit the extension:
Copy```
zip-rsankey_stone.zip*
```
Upload the ZIP file to <https://chrome.google.com/webstore/devconsole> and follow the prompts. 
The review may take a few weeks.
* * *
### 
[](#summary)
Summary
By following these transcript‑based steps, you can recreate the same workflow:
 * Scaffold a Chrome extension with D3.js.
 * Debug manifest and icon issues.
 * Use agents to generate and refine code.
 * Introduce multi‑agent parallel tasks for UI, data, and docs.
 * Add interactivity, themes, and export options.
 * Create an API key setup screen.
 * Package and publish to the Chrome Web Store.
You can follow this same pattern with your own idea: start small, scaffold with AI prompts, iterate using parallel agents, and deploy to production all from within Warp.
[PreviousBuilding a Real-time Chat App (Github MCP + Railway )](/university/end-to-end-builds/building-a-real-time-chat-app-github-mcp-+-railway)[NextPuppeteer MCP: Scraping Amazon Web Reviews ](/university/mcp-servers/puppeteer-mcp-scraping-amazon-web-reviews)
Last updated 15 days ago
Was this helpful?