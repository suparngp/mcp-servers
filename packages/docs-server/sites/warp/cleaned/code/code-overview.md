[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * * [Quickstart Guided](/)
 * [Migrate to Warp](/getting-started/migrate-to-warp)
 * [Supported Shells](/getting-started/supported-shells)
 * [Keyboard Shortcuts](/getting-started/keyboard-shortcuts)
 * [Changelog](/getting-started/changelog)
 * * [Agents Overview](/agents/agents-overview)
 * [Using Agents](/agents/using-agents)
 * [Slash Commands](/agents/slash-commands)
 * [Active AI](/agents/active-ai)
 * [Generate](/agents/generate)
 * [Voice](/agents/voice)
 * [AI FAQs](/agents/ai-faqs)
 * * [Code Overview](/code/code-overview)
 * [Code Editor](/code/code-editor)
 * [Codebase Context](/code/codebase-context)
 * [Code Review](/code/code-review)
 * [Code Diffs in Agent Conversations](/code/reviewing-code)
 * * [Universal Input](/terminal/universal-input)
 * [Appearance](/terminal/appearance)
 * [Blocks](/terminal/blocks)
 * [Modern Text Editing](/terminal/editor)
 * [Command Entry](/terminal/entry)
 * [Command Completions](/terminal/command-completions)
 * [Command Palette](/terminal/command-palette)
 * [Session Management](/terminal/sessions)
 * [Window Management](/terminal/windows)
 * [Warpify](/terminal/warpify)
 * [More Features](/terminal/more-features)
 * [Comparisons](/terminal/comparisons)
 * [Integrations](/terminal/integrations-and-plugins)
 * * [Warp Drive](/knowledge-and-collaboration/warp-drive)
 * [Model Context Protocol (MCP)](/knowledge-and-collaboration/mcp)
 * [Rules](/knowledge-and-collaboration/rules)
 * [Teams](/knowledge-and-collaboration/teams)
 * [Admin Panel](/knowledge-and-collaboration/admin-panel)
 * [Session Sharing](/knowledge-and-collaboration/session-sharing)
 * * [Warp CLI](/developers/cli)
 * * [Privacy](/privacy/privacy)
 * [Secret Redaction](/privacy/secret-redaction)
 * [Network Log](/privacy/network-log)
 * * [Refer a Friend & Earn Rewards](/community/refer-a-friend)
 * [Warp Preview & Alpha Program](/community/warp-preview-and-alpha-program)
 * * [Sending Feedback & Logs](/support-and-billing/sending-us-feedback)
 * [Plans & Pricing](/support-and-billing/plans-and-pricing)
 * [Updating Warp](/support-and-billing/updating-warp)
 * [Using Warp Offline](/support-and-billing/using-warp-offline)
 * [Logging Out & Uninstalling](/support-and-billing/uninstalling-warp)
 * [Known Issues](/support-and-billing/known-issues)
 * [Troubleshooting Login](/support-and-billing/troubleshooting-login-issues)
 * [Open Source Licenses](/support-and-billing/licenses)
[Powered by GitBook](https://www.gitbook.com/?utm_source=content&utm_medium=trademark&utm_campaign=-MbqIgTw17KQvq_DQuRr)
 * [From Prompt to Production](#from-prompt-to-production)
 * [Coding Agent](#coding-agent)
 * [How It Works](#how-it-works)
 * [Examples of Coding Capabilities](#examples-of-coding-capabilities)
 * [Getting Started With Coding in Warp](#getting-started-with-coding-in-warp)
 * [Learn More About Code Features:](#learn-more-about-code-features)
Was this helpful?
## 
[](#from-prompt-to-production)
From Prompt to Production
Warp Code is a suite of features designed to help you take agent-generated code from the initial prompt and project setup all the way to deployment and production. It is powered by Warp’s dedicated coding agent, which consistently ranks among the top results on [SWE-bench Verified](https://www.swebench.com/#verified) and [Terminal-Bench](https://www.tbench.ai/leaderboard).
In addition to Warp’s modern, [native code editor](/code/code-editor), it includes:
 * [Codebase Context](/code/codebase-context) for accurate, context-aware agent responses
 * [Project Rules](/knowledge-and-collaboration/rules) and Commands to tailor agent behavior per repository
 * A dedicated [Code Review](/code/code-review) experience for reviewing and editing diffs
 * [Zero-state and setup flows](/code/code-overview#getting-started-with-coding-in-warp) to quickly start a new project or initialize an existing one
### 
[](#coding-agent)
Coding Agent
Warp’s coding agent is designed to help you generate, edit, and manage code directly in the Agentic Development Environment. It detects opportunities to apply code diffs and surfaces them inline, allowing you to review and apply changes without switching to an external IDE. When you need to make manual edits, you can open Warp’s native code editor.
### 
[](#how-it-works)
How It Works
 * **Prompt-driven coding** : You write natural language prompts such as _“Add a retry mechanism to this API call”_ or _“Fix the failing unit test in auth.test.ts.”_
 * **Inline code diffs** : When the agent proposes changes, it shows them as diffs you can inspect, modify, or reject.
 * **Agent steering** : You can refine prompts, interrupt and retry, or attach context (such as a file, diff, or selection) to guide the agent toward better results.
Warps coding agent only work on local repositories. The agent can make changes on remote or docker repositories, but fallback to using terminal commands (i.e. `sed`, `grep` ) to make the changes.
### 
[](#examples-of-coding-capabilities)
Examples of Coding Capabilities
Code responds to prompts related to code generation, editing, and analysis. Here are some examples:
 * **Code creation**
 * “Write a function in JavaScript to debounce an input”
 * “Generate a Python class for managing user sessions with Redis.”
 * **Error-driven fixes**
 * “Fix the TypeScript error shown in the last build output.”
 * “Resolve this merge conflict by keeping backend changes and updating tests accordingly.”
 * **Refactoring**
 * “Update all instances of var to let in this file.”
 * “Extract the database logic from app.js into a new db.js module and update imports.”
 * **Multi-file and repo-wide changes**
 * “Add headers to all .py files in this directory.”
 * “Replace requests with httpx across the codebase, updating imports and error handling.”
 * **Complex workflows** (examples shown below — in practice, prompts should include more detail for best results)
 * “Implement OAuth2 authentication, update affected routes, and add tests.”
 * “Identify functions without test coverage and create Jest test files for them.”
 * “Optimize slow SQL queries in queries.sql and regenerate migrations.”
How to kick off a coding taskHow to interpret & edit Warp’s coding output
## 
[](#getting-started-with-coding-in-warp)
Getting Started With Coding in Warp
Warp provides multiple entry points to begin coding with agents, whether you are starting a new project, opening an existing one, or cloning from GitHub. Each new tab shows a **zero state** that lets you choose how to proceed.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252FtTvi9JFZHIsvlLMFvt0q%252Fimage.png%3Falt%3Dmedia%26token%3Df3a1e6a0-a3b9-40a0-a5fe-06459074baaa&width=768&dpr=4&quality=100&sign=767a426c&sv=2)
Zero-state tab with 3 starting points for agentic coding in Warp.
#### 
[](#id-1.-starting-a-new-project)
1. Starting a New Project
To begin a new project, select `Create a New Project` from the tab. You can start directly with a prompt (Warp will suggest ideas) or configure the project manually. Warp sets up the repository with a `WARP.md` file containing [project rules](/knowledge-and-collaboration/rules#project-rules) and enables [codebase indexing](/code/codebase-context) to provide the agent with full context.
#### 
[](#id-2.-open-an-existing-repo)
2. Open an Existing Repo
Select `Open Repository` to use your computer’s file picker. If you choose a Git repository, Warp automatically changes into the directory and runs the `/init` setup command (a built-in “[slash command](/agents/slash-commands)”) if the repo has not already been initialized. Warp will detect the repository, index the codebase, and prepare it for coding.
 * For non-Git folders, Warp simply changes into the directory without initialization.
 * If you have an existing project that is not yet initialized, you can run `/init` manually to bootstrap it with a version-controlled `WARP.md` file. 
 * This view also shows a list of your three most recently used repositories and AI conversations for quick access, as well as a list of recent directories (which behave like running `cd`).
#### 
[](#id-3.-clone-a-repo)
3. Clone a Repo
Select `Clone Repository` to paste in a repo link or clone directly from GitHub. Warp places you in the cloned folder and automatically runs the `/init` flow to set up project rules and indexing.
## 
[](#learn-more-about-code-features)
Learn More About Code Features:
 * [Code Editor](/code/code-editor) - Warp’s built-in code editor lets you make quick, in-context edits with essentials like syntax highlighting, tabs, find and replace, Vim keybindings, and a file tree.
 * [Codebase Context](/code/codebase-context) - Warp indexes your Git-tracked codebase to help Agents understand your code and generate accurate, context-aware responses. No code is stored on Warp servers.
 * [Code Review](/code/code-review) - review, edit, and manage Git diffs in real time, with options to attach, revert, or open files directly.
 * [Code Diffs in Agent Conversations](/code/reviewing-code) - Learn how to review, refine, and apply code changes generated by Warp’s agents using the built-in visual diff editor.
[PreviousAI FAQs](/agents/ai-faqs)[NextCode Editor](/code/code-editor)
Last updated 1 month ago
Was this helpful?