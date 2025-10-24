Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Reference
CLI reference
[Welcome](/en/home)[Claude Developer Platform](/en/docs/intro)[Claude Code](/en/docs/claude-code/overview)[Model Context Protocol (MCP)](/en/docs/mcp)[API Reference](/en/api/messages)[Resources](/en/resources/overview)[Release Notes](/en/release-notes/overview)
##### Getting started
 * [Overview](/en/docs/claude-code/overview)
 * [Quickstart](/en/docs/claude-code/quickstart)
 * [Common workflows](/en/docs/claude-code/common-workflows)
 * [Claude Code on the web](/en/docs/claude-code/claude-code-on-the-web)
##### Build with Claude Code
 * [Subagents](/en/docs/claude-code/sub-agents)
 * [Plugins](/en/docs/claude-code/plugins)
 * [Agent Skills](/en/docs/claude-code/skills)
 * [Output styles](/en/docs/claude-code/output-styles)
 * [Hooks](/en/docs/claude-code/hooks-guide)
 * [Headless mode](/en/docs/claude-code/headless)
 * [GitHub Actions](/en/docs/claude-code/github-actions)
 * [GitLab CI/CD](/en/docs/claude-code/gitlab-ci-cd)
 * [Model Context Protocol (MCP)](/en/docs/claude-code/mcp)
 * [Troubleshooting](/en/docs/claude-code/troubleshooting)
##### Claude Agent SDK
 * [Migrate to Claude Agent SDK](/en/docs/claude-code/sdk/migration-guide)
##### Deployment
 * [Overview](/en/docs/claude-code/third-party-integrations)
 * [Amazon Bedrock](/en/docs/claude-code/amazon-bedrock)
 * [Google Vertex AI](/en/docs/claude-code/google-vertex-ai)
 * [Network configuration](/en/docs/claude-code/network-config)
 * [LLM gateway](/en/docs/claude-code/llm-gateway)
 * [Development containers](/en/docs/claude-code/devcontainer)
 * [Sandboxing](/en/docs/claude-code/sandboxing)
##### Administration
 * [Advanced installation](/en/docs/claude-code/setup)
 * [Identity and Access Management](/en/docs/claude-code/iam)
 * [Security](/en/docs/claude-code/security)
 * [Data usage](/en/docs/claude-code/data-usage)
 * [Monitoring](/en/docs/claude-code/monitoring-usage)
 * [Costs](/en/docs/claude-code/costs)
 * [Analytics](/en/docs/claude-code/analytics)
 * [Plugin marketplaces](/en/docs/claude-code/plugin-marketplaces)
##### Configuration
 * [Settings](/en/docs/claude-code/settings)
 * [Visual Studio Code](/en/docs/claude-code/vs-code)
 * [JetBrains IDEs](/en/docs/claude-code/jetbrains)
 * [Terminal configuration](/en/docs/claude-code/terminal-config)
 * [Model configuration](/en/docs/claude-code/model-config)
 * [Memory management](/en/docs/claude-code/memory)
 * [Status line configuration](/en/docs/claude-code/statusline)
##### Reference
 * [CLI reference](/en/docs/claude-code/cli-reference)
 * [Interactive mode](/en/docs/claude-code/interactive-mode)
 * [Slash commands](/en/docs/claude-code/slash-commands)
 * [Checkpointing](/en/docs/claude-code/checkpointing)
 * [Hooks reference](/en/docs/claude-code/hooks)
 * [Plugins reference](/en/docs/claude-code/plugins-reference)
##### Resources
 * [Legal and compliance](/en/docs/claude-code/legal-and-compliance)
On this page
 * [CLI commands](#cli-commands)
 * [CLI flags](#cli-flags)
 * [Agents flag format](#agents-flag-format)
 * [See also](#see-also)
## 
[​](#cli-commands)
CLI commands
Command | Description | Example 
---|---|--- 
`claude` | Start interactive REPL | `claude` 
`claude "query"` | Start REPL with initial prompt | `claude "explain this project"` 
`claude -p "query"` | Query via SDK, then exit | `claude -p "explain this function"` 
`cat file | claude -p "query"` | Process piped content | `cat logs.txt | claude -p "explain"` 
`claude -c` | Continue most recent conversation | `claude -c` 
`claude -c -p "query"` | Continue via SDK | `claude -c -p "Check for type errors"` 
`claude -r "<session-id>" "query"` | Resume session by ID | `claude -r "abc123" "Finish this PR"` 
`claude update` | Update to latest version | `claude update` 
`claude mcp` | Configure Model Context Protocol (MCP) servers | See the [Claude Code MCP documentation](/en/docs/claude-code/mcp). 
## 
[​](#cli-flags)
CLI flags
Customize Claude Code’s behavior with these command-line flags: Flag | Description | Example 
---|---|--- 
`--add-dir` | Add additional working directories for Claude to access (validates each path exists as a directory) | `claude --add-dir ../apps ../lib` 
`--agents` | Define custom [subagents](/en/docs/claude-code/sub-agents) dynamically via JSON (see below for format) | `claude --agents '{"reviewer":{"description":"Reviews code","prompt":"You are a code reviewer"}}'` 
`--allowedTools` | A list of tools that should be allowed without prompting the user for permission, in addition to [settings.json files](/en/docs/claude-code/settings) | `"Bash(git log:*)" "Bash(git diff:*)" "Read"` 
`--disallowedTools` | A list of tools that should be disallowed without prompting the user for permission, in addition to [settings.json files](/en/docs/claude-code/settings) | `"Bash(git log:*)" "Bash(git diff:*)" "Edit"` 
`--print`, `-p` | Print response without interactive mode (see [SDK documentation](/en/docs/claude-code/sdk) for programmatic usage details) | `claude -p "query"` 
`--append-system-prompt` | Append to system prompt (only with `--print`) | `claude --append-system-prompt "Custom instruction"` 
`--output-format` | Specify output format for print mode (options: `text`, `json`, `stream-json`) | `claude -p "query" --output-format json` 
`--input-format` | Specify input format for print mode (options: `text`, `stream-json`) | `claude -p --output-format json --input-format stream-json` 
`--include-partial-messages` | Include partial streaming events in output (requires `--print` and `--output-format=stream-json`) | `claude -p --output-format stream-json --include-partial-messages "query"` 
`--verbose` | Enable verbose logging, shows full turn-by-turn output (helpful for debugging in both print and interactive modes) | `claude --verbose` 
`--max-turns` | Limit the number of agentic turns in non-interactive mode | `claude -p --max-turns 3 "query"` 
`--model` | Sets the model for the current session with an alias for the latest model (`sonnet` or `opus`) or a model’s full name | `claude --model claude-sonnet-4-5-20250929` 
`--permission-mode` | Begin in a specified [permission mode](iam#permission-modes) | `claude --permission-mode plan` 
`--permission-prompt-tool` | Specify an MCP tool to handle permission prompts in non-interactive mode | `claude -p --permission-prompt-tool mcp_auth_tool "query"` 
`--resume` | Resume a specific session by ID, or by choosing in interactive mode | `claude --resume abc123 "query"` 
`--continue` | Load the most recent conversation in the current directory | `claude --continue` 
`--dangerously-skip-permissions` | Skip permission prompts (use with caution) | `claude --dangerously-skip-permissions` 
The `--output-format json` flag is particularly useful for scripting and automation, allowing you to parse Claude’s responses programmatically.
### 
[​](#agents-flag-format)
Agents flag format
The `--agents` flag accepts a JSON object that defines one or more custom subagents. Each subagent requires a unique name (as the key) and a definition object with the following fields: Field | Required | Description 
---|---|--- 
`description` | Yes | Natural language description of when the subagent should be invoked 
`prompt` | Yes | The system prompt that guides the subagent’s behavior 
`tools` | No | Array of specific tools the subagent can use (e.g., `["Read", "Edit", "Bash"]`). If omitted, inherits all tools 
`model` | No | Model alias to use: `sonnet`, `opus`, or `haiku`. If omitted, uses the default subagent model 
Example:
Copy
```
claude --agents '{
 "code-reviewer": {
 "description": "Expert code reviewer. Use proactively after code changes.",
 "prompt": "You are a senior code reviewer. Focus on code quality, security, and best practices.",
 "tools": ["Read", "Grep", "Glob", "Bash"],
 "model": "sonnet"
 },
 "debugger": {
 "description": "Debugging specialist for errors and test failures.",
 "prompt": "You are an expert debugger. Analyze errors, identify root causes, and provide fixes."
 }
}'
```
For more details on creating and using subagents, see the [subagents documentation](/en/docs/claude-code/sub-agents). For detailed information about print mode (`-p`) including output formats, streaming, verbose logging, and programmatic usage, see the [SDK documentation](/en/docs/claude-code/sdk).
## 
[​](#see-also)
See also
 * [Interactive mode](/en/docs/claude-code/interactive-mode) - Shortcuts, input modes, and interactive features
 * [Slash commands](/en/docs/claude-code/slash-commands) - Interactive session commands
 * [Quickstart guide](/en/docs/claude-code/quickstart) - Getting started with Claude Code
 * [Common workflows](/en/docs/claude-code/common-workflows) - Advanced workflows and patterns
 * [Settings](/en/docs/claude-code/settings) - Configuration options
 * [SDK documentation](/en/docs/claude-code/sdk) - Programmatic usage and integrations
Was this page helpful?
YesNo
[Status line configuration](/en/docs/claude-code/statusline)[Interactive mode](/en/docs/claude-code/interactive-mode)
Assistant
Responses are generated using AI and may contain mistakes.