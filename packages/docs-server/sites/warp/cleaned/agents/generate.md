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
 * [What is Generate?](#what-is-generate)
 * [Ways to Generate with AI](#ways-to-generate-with-ai)
 * [Generate commands as command line input](#generate-commands-as-command-line-input)
 * [Generate text and contextual suggestions in interactive CLIs](#generate-text-and-contextual-suggestions-in-interactive-clis)
Was this helpful?
## 
[](#what-is-generate)
What is Generate?
Generate helps turn natural language queries into precise commands as terminal input or contextual suggestions inside interactive commands and programs, whether you're using psql, gdb, git, mysql, or any other CLI tool.
Generate is backed by Large Language Models from API providers like OpenAI and Anthropic, and are completely opt-in.
Currently, you need to be online to use this feature. If this feature doesn't work, your ISP or firewall may be blocking the calls to `app.warp.dev`
## 
[](#ways-to-generate-with-ai)
Ways to Generate with AI
### 
[](#generate-commands-as-command-line-input)
Generate commands as command line input
Type `#` on the command line input to generate command suggestions.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-7b0133ba50eb0441f47f6a75516f9779ec294e95%252FScreenshot%25202024-06-15%2520at%25205.05.29%25E2%2580%25AFPM.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=f70f3775&sv=2)
Typing '#' on the command line opens the suggestions interface
Generating commands as command line input demo
 1. Press `CTRL-`` or type `#` into the text input editor to search using natural language.
 2. Type in the input box what you'd like to do. For example, "replace a string in a file."
 3. Results are generated in real-time, and you can keep the current prompt or modify the prompt to generate new commands.
 4. When you've found the command you want to execute, it can be run or saved as a Workflow onto Warp Drive to easily recall it in the future.
### 
[](#generate-text-and-contextual-suggestions-in-interactive-clis)
Generate text and contextual suggestions in interactive CLIs
In interactive CLI applications, you can generate input using natural language.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-871566298096cf5d5a414d6447ee934ad9a5f288%252Fgenerate-psql.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=dc11bfc1&sv=2)
Generate a SQL query
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-338c694a332b866a25c1bde9795ac0bb733a0260%252Fgenerate-vim.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=d818542e&sv=2)
Generate Vim input
macOS
Windows
Linux
 1. Inside a long-running, interactive command, press `CMD-I` when you see the hint text appear.
 2. Type what you would like to generate in the input box. For example, "show me all tables in my Postgres database" or in Vim, "generate a recursive Fibonacci function and save it to the file."
 3. Results are generated in real time using the [LLM of your choice](/agents/generate#supported-interactive-cli-models).
 4. To refine or follow up on your query, press `CMD-Y`. You can then either edit your last message by pressing `UP ↑` or add a follow-up by typing in new text.
 5. When you've found the text you want to add or execute, press `Enter` or click the Accept button.
 1. Inside a long-running, interactive command, press `CTRL-SHIFT-I` when you see the hint text appear.
 2. Type what you would like to generate in the input box. For example, "show me all tables in my Postgres database" or in Vim, "generate a recursive Fibonacci function and save it to the file."
 3. Results are generated in real time using the [LLM of your choice](/agents/generate#supported-interactive-cli-models)
 4. To refine or follow up on your query, press `CTRL-SHIFT-Y`. You can then either edit your last message by pressing `UP ↑` or add a follow-up by typing in new text.
 5. When you've found the text you want to add or execute, press `Enter` or click the Accept button.
 1. Inside a long-running, interactive command, press `CTRL-SHIFT-I` when you see the hint text appear.
 2. Type what you would like to generate in the input box. For example, "show me all tables in my Postgres database" or in Vim, "generate a recursive Fibonacci function and save it to the file."
 3. Results are generated in real time using the [LLM of your choice](/agents/generate#supported-interactive-cli-models)
 4. To refine or follow up on your query, press `CTRL-SHIFT-Y`. You can then either edit your last message by pressing `UP ↑` or add a follow-up by typing in new text.
 5. When you've found the text you want to add or execute, press `Enter` or click the Accept button.
A couple of other examples of interactive CLIs where you can invoke Generate:
 * **Database REPL** (e.g. `psql`, `mysql`, `sqlite`): Generate SQL queries such as "create a table to store user data" or "show me all the rows in orders for the last month"
 * **Text editors** (e.g. `vim`, `nano`): Quickly generate text such as a markdown header, a code block comment, or a boilerplate CSS class.
 * **Python REPL** (e.g. `ipython`, `python`): Quickly generate Python snippets such as "create a simple plot of x" or "write a unit test for this function"
 * **Debugger tools** (e.g. `gdb`, `lldb`): Get commands for setting breakpoints or inspecting memory
 * **Version control** (e.g. `git rebase -i`): Speed up complex git commands by describing your goal such as "interactively rebase master onto feature-branch"
 * **Cloud provider shells** (e.g. `gcloud`, `aws cli`): faster setup or resource management such as "create a new Kubernetes cluster" or "provision a new RDS instance"
If you experience any issues with Generate, please visit known issues for [troubleshooting steps](/support-and-billing/known-issues#online-features-dont-work).
[PreviousActive AI](/agents/active-ai)[NextVoice](/agents/voice)
Last updated 4 months ago
Was this helpful?