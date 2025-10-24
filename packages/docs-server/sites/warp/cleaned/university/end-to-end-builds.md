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
 * [Setup & Installation](#setup-and-installation)
 * [Generate an App Idea](#generate-an-app-idea)
 * [Create a Development Plan](#create-a-development-plan)
 * [Allow Autonomous Execution](#allow-autonomous-execution)
 * [Running the App](#running-the-app)
 * [Adding New Features](#adding-new-features)
 * [Preparing for Deployment](#preparing-for-deployment)
 * [Deploying via Railway](#deploying-via-railway)
 * [Appendix](#appendix)
Was this helpful?
In this tutorial, we’ll follow along with Tech With Tim’s _Advanced Vibe Coding Tutorial w/ Warp_ video. You’ll learn how to use **Warp** , the _agentic development environment_ , to build and deploy a fullstack AI-driven app from scratch — including setup, debugging, and deployment using **GitHub MCP servers**.
Advanced Vibe Coding Tutorial w/ Warp (Build & Deploy Apps)
### 
[](#overview)
Overview
This video shows how to go from **idea → working web app → production deployment** , all inside Warp. The project: a **real-time chat application** built with **Python (FastAPI)** and a **JavaScript frontend** , deployed through **Railway** , and integrated with **GitHub** via **MCP (Model Context Protocol)**.
1
### 
[](#setup-and-installation)
Setup & Installation
Warp is free for Mac, Linux, and Windows. Download it from [https://warp.dev](https://warp.dev/) and sign in with an account.
Once you open Warp, you’ll see three core modes:
 * **Auto Mode** – Detects whether you’re typing a command or an AI prompt
 * **Terminal Mode** – For standard shell commands only (`ls`, `pwd`, etc.)
 * **Agent Mode** – For conversational AI prompts (`build me an app`, `add feature X`, etc.)
You can switch modes using the top-bar buttons.
Pro tip: Enable voice input for natural prompting or attach screenshots when debugging UI issues.
2
### 
[](#generate-an-app-idea)
Generate an App Idea
Warp supports _planning models_ , where the AI generates a detailed roadmap before coding.
Copy```
I would like to make something of simple to medium complexity that I could finish in about 30 minutes. I want this to be web based. I want to have some kind of interface and some kind of backend. Can you give me a fun idea that's not going to be too complicated to build out and to eventually deploy?
```
The AI suggested several projects, like a personal mood tracker, quick poll creator, recipe randomizer, and more. Chosen idea we went with: **a real-time chat application**.
3
### 
[](#create-a-development-plan)
Create a Development Plan
Prompt:
Copy```
I like idea one. Can you come up with a detailed plan on how to build this?
```
Warp’s agent generated a plan for:
 * A **frontend** (UI for chat rooms and messages)
 * A **backend** (FastAPI server for real-time communication)
 * Database integration and planned deployment steps
You can refine or expand the plan interactively by prompting:
Copy```
Make this more detailed.
```
And get back something like this:
Copy```
Here's your development roadmap:
🏗️ Architecture Decisions
Frontend Options:
• React + Socket.IO Client (recommended for rich UI)
• Vue.js + Socket.IO Client 
• Vanilla JS + WebSockets (simpler but limited)
Backend Options:
• Node.js + Socket.IO + Express (most popular for real-time)
• Python + Flask-SocketIO
• Go + Gorilla WebSocket
Database:
• MongoDB (flexible for chat messages)
• PostgreSQL (structured data with JSON fields)
• Redis (for session management and caching)
🚀 Recommended Tech Stack
📋 Core Features to Implement
1. Real-time messaging (Socket.IO)
2. User authentication (JWT)
3. Multiple chat rooms
4. Online user presence
5. Message history
6. Typing indicators
7. File/image sharing (optional)
🛠️ Development Steps
1. Create project in ~/Documents/Coding_Projects/realtime-chat
2. Set up Node.js backend with Socket.IO
3. Create React frontend with real-time connection
4. Implement user auth and room management
5. Add message persistence and history
6. Style UI and add advanced features
```
At any point, you can go into the plan and start directly modifying it. And when you're ready, you can tell Warp to:
Copy```
Please execute this plan.
```
4
### 
[](#allow-autonomous-execution)
Allow Autonomous Execution
Once Warp starts executing, you can let Warp run commands automatically:
 1. Go to **Settings → AI → Agents**
 2. Change **“Always Ask”** → **“Always Allow”**
 3. Ensure restricted commands (e.g., `rm -rf`) remain blocked
This enables autonomous execution for safe, fast iteration. Warp will run shell commands, create directories, initialize files, and write code.
5
### 
[](#running-the-app)
Running the App
First, you can click into any file, like `main.py` to edit it directly in Warp. Warp displays your file directly in the app for easy editing, similar to any regular IDE experience. 
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2121742425-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fc5dAwvMCRiTxUOdDicqy%252Fuploads%252FnQw71dhRDs7V9cbPK6gj%252FScreenshot%25202025-10-07%2520at%252010.44.14%25E2%2580%25AFAM.png%3Falt%3Dmedia%26token%3Ddcece1e6-ad69-4581-9b30-0021bd955fbe&width=768&dpr=4&quality=100&sign=5528a125&sv=2)
You can also ask Warp to run the app and test locally:
Copy```
Can you run this app for me so I can test it? Tell me how to view it.
```
It's possible (like in the video) for an error to occur (e.g., Internal Server Error). If that happens, y you can simply debug conversationally:
Copy```
I’m getting an internal server error. Can you fix this?
```
And Warp can fix the issue and rerun the app automatically.
6
### 
[](#adding-new-features)
Adding New Features
To enhance the app, request features conversationally:
Copy```
Can you add emoji reactions to the messages?
```
Warp will modify frontend and backend code, updating WebSocket logic for real-time reactions. After testing, multiple users can now react to messages in the chat interface.
7
### 
[](#preparing-for-deployment)
Preparing for Deployment
Warp integrates directly with version control and cloud deployers via **MCP servers**.
Connect GitHub MCP:
 1. Go to **Settings → AI → MCP Servers → Add**
 2. Add a JSON block for GitHub MCP:
Copy```
{
 "github": {
 "command": "docker",
 "args": [
 "run",
 "-i",
 "--rm",
 "-e",
 "GITHUB_PERSONAL_ACCESS_TOKEN",
 "ghcr.io/github/github-mcp-server"
 ],
 "env": {
 "GITHUB_PERSONAL_ACCESS_TOKEN": "${<INSERT_YOURS_HERE>}"
 }
 }
}
```
 1. Generate a GitHub personal access token (Settings → Developer Settings → Tokens)
 * Enable scopes for: `repo`, `workflow`, `secrets`, `pull_request`, and `environments`.
Save and restart Warp.
Then tell the agent:
Copy```
Can you make a new remote repo for me and upload my code?
```
Warp uses Git commands automatically:
Copy```
git init
git add .
git commit -m "Initial commit"
git remote add origin ...
git push
```
8
### 
[](#deploying-via-railway)
Deploying via Railway
Prompt:
Copy```
I have a FastAPI application built with Python. I want to deploy this. It just has an integrated frontend with JavaScript, HTML, and CSS. What’s the easiest way to do that? Can you assist me?
```
Warp recommends **Railway** and walks through:
 * Creating a Railway account
 * Connecting your GitHub repo
 * Deploying directly from GitHub
 * Generating a public domain
Once deployed, test it in your browser — you’ll see your live chat app with emoji reactions working in real time.
### 
[](#appendix)
Appendix
 * [Github MCP Server](https://github.com/github/github-mcp-server)
 * [Docker Desktop download](https://www.docker.com/products/docker-desktop/)
 * [Railway](https://railway.com/)
[PreviousHow To: Prevent Secrets from Leaking](/university/developer-workflows/testing-and-security/how-to-prevent-secrets-from-leaking)[NextBuilding a Chrome Extension (D3.js + Javascript + HTML + CSS)](/university/end-to-end-builds/building-a-chrome-extension-d3.js-+-javascript-+-html-+-css)
Last updated 15 days ago
Was this helpful?