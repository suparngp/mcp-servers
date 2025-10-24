[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * [Getting Started](/university)
 * Developer Workflows
 * [Beginner](/university/developer-workflows/beginner)
 * [Power User](/university/developer-workflows/power-user)
 * [DevOps](/university/developer-workflows/devops)
 * [Backend](/university/developer-workflows/backend)
 * [How To: Write SQL Commands inside a Postgres REPL](/university/developer-workflows/backend/how-to-write-sql-commands-inside-a-postgres-repl)
 * [How To: Create Priority Matrix for Database Optimization](/university/developer-workflows/backend/how-to-create-priority-matrix-for-database-optimization)
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
 * [Open a Postgres REPL in Warp](#open-a-postgres-repl-in-warp)
 * [Invoke Warp’s AI Input](#invoke-warps-ai-input)
 * [Ask Warp in Natural Language](#ask-warp-in-natural-language)
 * [Observe How Warp Learns from Context](#observe-how-warp-learns-from-context)
 * [Apply the Same Workflow to Other REPLs](#apply-the-same-workflow-to-other-repls)
 * [Experiment and Iterate](#experiment-and-iterate)
 * [🏁 Key Takeaways](#key-takeaways)
Was this helpful?
This tutorial teaches you how to use **Warp’s AI input** to run natural-language prompts inside an interactive **Postgres REPL** , turning plain English into SQL commands. Although the example uses **PostgreSQL** , the same workflow applies to **Node.js** , **Python** , **MySQL** , and other interactive shells.
* * *
### 
[](#overview)
🧠 Overview
You’ll learn how to:
 * Start a Postgres REPL in Warp.
 * Use **Command + I** (or **Ctrl + I**) to open Warp’s AI input.
 * Speak or type natural-language requests and let Warp translate them into SQL.
 * Run the generated queries directly inside your REPL session.
1
### 
[](#open-a-postgres-repl-in-warp)
Open a Postgres REPL in Warp
Open Warp and connect to your Postgres database (or a test instance):
Copy```
psql -U postgres -d my_database
```
You’ll enter the interactive `psql` prompt, where you normally type SQL commands.
2
### 
[](#invoke-warps-ai-input)
Invoke Warp’s AI Input
Inside the running REPL, press:
Copy```
Command + I (macOS)
Ctrl + I (Windows/Linux)
```
This opens the **Generate Input** box.
You can **type or speak** in plain English — Warp will translate your request into valid SQL or shell syntax, depending on the REPL you’re in.
3
### 
[](#ask-warp-in-natural-language)
Ask Warp in Natural Language
Start with a simple request:
Copy```
Show me all tables.
```
Warp translates this to the Postgres command:
Copy```
\dt
```
Then try a more specific query, as shown in the video:
Copy```
Show me our users table and our teams table.
```
Warp generates:
Copy```
SELECT * FROM users;
SELECT * FROM teams;
```
You can run both within your REPL to display the tables.
4
### 
[](#observe-how-warp-learns-from-context)
Observe How Warp Learns from Context
As you continue issuing prompts, Warp’s AI agent **learns the structure of your database** by observing what’s printed in the REPL output.
This means you can ask progressively more complex questions, and Warp will tailor the SQL accordingly.
Copy```
Show me all of the users who have joined Warp in the last 90 days from public email accounts
(like Gmail, Yahoo, Hotmail) and are on teams of more than two people.
```
Warp generates a multi-clause SQL query such as:
Copy```
SELECT *
FROM users
WHERE email LIKE '%gmail.com%'
 OR email LIKE '%yahoo.com%'
 OR email LIKE '%hotmail.com%'
 AND joined_at > NOW() - INTERVAL '90 days'
 AND team_size > 2;
```
Running this query in `psql` filters users accordingly.
5
### 
[](#apply-the-same-workflow-to-other-repls)
Apply the Same Workflow to Other REPLs
This feature works **not just in Postgres** but also in:
 * Node.js
 * Python
 * MySQL
 * GDB (GNU Debugger)
For any of these environments:
 1. Launch the REPL inside Warp.
 2. Press **Command + I** to bring up AI input.
 3. Describe what you want in natural language.
 4. Warp translates it into the correct syntax for that environment.
Warp automatically detects the active REPL, so you don’t need to specify “SQL” or “Python” — it knows which language to generate.
6
### 
[](#experiment-and-iterate)
Experiment and Iterate
Try varying your natural-language prompts:
Copy```
List all databases.
```
Copy```
\l
```
Copy```
Count how many users signed up this month.
```
Copy```
SELECT COUNT(*) FROM users WHERE joined_at > date_trunc('month', NOW());
```
The more you experiment, the more context Warp gathers, improving its translations.
* * *
### 
[](#key-takeaways)
🏁 Key Takeaways
 * **Command + I** activates Warp’s AI input within any interactive shell.
 * Warp understands natural language and produces valid commands for the current REPL.
 * It **learns from context** — subsequent prompts become more accurate.
 * Works beyond Postgres: Node, Python, MySQL, and others.
 * A fast way to query or explore systems without memorizing syntax.
Next time you’re stuck remembering a command in Postgres or Python, hit **Command + I** and just ask Warp in plain English.
[PreviousBackend](/university/developer-workflows/backend)[NextHow To: Create Priority Matrix for Database Optimization](/university/developer-workflows/backend/how-to-create-priority-matrix-for-database-optimization)
Last updated 15 days ago
Was this helpful?