[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * [Getting Started](/university)
 * Developer Workflows
 * [Beginner](/university/developer-workflows/beginner)
 * [Power User](/university/developer-workflows/power-user)
 * [DevOps](/university/developer-workflows/devops)
 * [Backend](/university/developer-workflows/backend)
 * [Frontend / UI](/university/developer-workflows/frontend-ui)
 * [How To: Replace A UI Element in Warp (Rust Codebase)](/university/developer-workflows/frontend-ui/how-to-replace-a-ui-element-in-warp-rust-codebase)
 * [How To: Actually Code UI That Matches Your Mockup (React + Tailwind)](/university/developer-workflows/frontend-ui/how-to-actually-code-ui-that-matches-your-mockup-react-+-tailwind)
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
 * [Define the Task](#define-the-task)
 * [Review the Plan](#review-the-plan)
 * [View AI Diffs in Real Time](#view-ai-diffs-in-real-time)
 * [Compilation and Fixes](#compilation-and-fixes)
 * [Testing the Change](#testing-the-change)
 * [Recap](#recap)
Was this helpful?
Learn how to use Warp’s AI coding features to make live code changes — in this example, replacing an icon throughout Warp’s massive Rust codebase using an agentic workflow.
This demo showcases Warp’s ability to safely make intelligent code changes within a multi-million-line codebase by providing structured prompts, reviewing diffs in real time, and letting the agent compile and self-correct.
1
### 
[](#define-the-task)
Define the Task
The goal here is to replace all instances of the **sparkle icon** with the new **agent icon** , especially within the history menu.
Open your project in Warp and start by prompting the agent directly (either by typing or speaking):
Copy```
Please create a new branch for me according to the format in the attached Linear URL.
I’ve attached screenshots of what the agent mode and sparkle icons look like.
I would like you to understand those icons, search for their use in the code,
and wherever we’re using sparkles, replace them with the agent mode icon.
Specifically, make sure this happens in the history menu.
Please give me a plan before making any coding changes.
```
Attach any relevant Linear issue links or screenshots to help the agent identify assets accurately.
2
### 
[](#review-the-plan)
Review the Plan
Warp’s agent parses your request and generates a plan for code edits. It identifies files and functions where the sparkle icon is used.
If the plan looks correct, approve it to proceed.
Follow-up prompt example:
Copy```
Yes, proceed — and please rename the function from renderAISparklesIcon
to something like renderAgentModeIcon.
```
Warp automatically updates function names, asset references, and component usage.
3
### 
[](#view-ai-diffs-in-real-time)
View AI Diffs in Real Time
Warp lets you view live diffs as the agent edits your files.
 * Diffs show changes to both render logic and function naming.
 * You can choose to auto-accept or manually review diffs.
 * These settings can be adjusted under AI Settings → Apply Changes Automatically.
Note: The demo runs with “auto-accept” enabled, allowing Warp to apply diffs as soon as they’re validated.
4
### 
[](#compilation-and-fixes)
Compilation and Fixes
After editing, Warp’s agent runs:
Copy```
cargocheck
```
to verify compilation.
If compilation fails (e.g., missing imports), the agent automatically corrects and retries — mimicking a human debugging process.
5
### 
[](#testing-the-change)
Testing the Change
Once compiled:
 * Run your project locally to confirm visual changes.
 * Check that the agent icon now replaces the sparkle icon in all targeted locations.
6
### 
[](#recap)
Recap
Warp’s agent completed the full flow:
 1. Understood a Linear ticket and visual context
 2. Created a new branch
 3. Planned and executed the icon replacement
 4. Auto-fixed compile issues
 5. Verified the final result in-app
[PreviousFrontend / UI](/university/developer-workflows/frontend-ui)[NextHow To: Actually Code UI That Matches Your Mockup (React + Tailwind)](/university/developer-workflows/frontend-ui/how-to-actually-code-ui-that-matches-your-mockup-react-+-tailwind)
Last updated 15 days ago
Was this helpful?