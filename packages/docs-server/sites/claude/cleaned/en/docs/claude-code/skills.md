[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Build with Claude Code
Agent Skills
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
 * [Prerequisites](#prerequisites)
 * [What are Agent Skills?](#what-are-agent-skills%3F)
 * [Create a Skill](#create-a-skill)
 * [Personal Skills](#personal-skills)
 * [Project Skills](#project-skills)
 * [Plugin Skills](#plugin-skills)
 * [Write SKILL.md](#write-skill-md)
 * [Add supporting files](#add-supporting-files)
 * [Restrict tool access with allowed-tools](#restrict-tool-access-with-allowed-tools)
 * [View available Skills](#view-available-skills)
 * [Test a Skill](#test-a-skill)
 * [Debug a Skill](#debug-a-skill)
 * [Make description specific](#make-description-specific)
 * [Verify file path](#verify-file-path)
 * [Check YAML syntax](#check-yaml-syntax)
 * [View errors](#view-errors)
 * [Share Skills with your team](#share-skills-with-your-team)
 * [Step 1: Add Skill to your project](#step-1%3A-add-skill-to-your-project)
 * [Step 2: Commit to git](#step-2%3A-commit-to-git)
 * [Step 3: Team members get Skills automatically](#step-3%3A-team-members-get-skills-automatically)
 * [Update a Skill](#update-a-skill)
 * [Remove a Skill](#remove-a-skill)
 * [Best practices](#best-practices)
 * [Keep Skills focused](#keep-skills-focused)
 * [Write clear descriptions](#write-clear-descriptions)
 * [Test with your team](#test-with-your-team)
 * [Document Skill versions](#document-skill-versions)
 * [Troubleshooting](#troubleshooting)
 * [Claude doesn’t use my Skill](#claude-doesn%E2%80%99t-use-my-skill)
 * [Skill has errors](#skill-has-errors)
 * [Multiple Skills conflict](#multiple-skills-conflict)
 * [Examples](#examples)
 * [Simple Skill (single file)](#simple-skill-single-file)
 * [Skill with tool permissions](#skill-with-tool-permissions)
 * [Multi-file Skill](#multi-file-skill)
 * [Next steps](#next-steps)
This guide shows you how to create, use, and manage Agent Skills in Claude Code. Skills are modular capabilities that extend Claude’s functionality through organized folders containing instructions, scripts, and resources.
## 
[​](#prerequisites)
Prerequisites
 * Claude Code version 1.0 or later
 * Basic familiarity with [Claude Code](/en/docs/claude-code/quickstart)
## 
[​](#what-are-agent-skills%3F)
What are Agent Skills?
Agent Skills package expertise into discoverable capabilities. Each Skill consists of a `SKILL.md` file with instructions that Claude reads when relevant, plus optional supporting files like scripts and templates. **How Skills are invoked** : Skills are **model-invoked** —Claude autonomously decides when to use them based on your request and the Skill’s description. This is different from slash commands, which are **user-invoked** (you explicitly type `/command` to trigger them). **Benefits** :
 * Extend Claude’s capabilities for your specific workflows
 * Share expertise across your team via git
 * Reduce repetitive prompting
 * Compose multiple Skills for complex tasks
Learn more in the [Agent Skills overview](/en/docs/agents-and-tools/agent-skills/overview).
For a deep dive into the architecture and real-world applications of Agent Skills, read our engineering blog: [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills).
## 
[​](#create-a-skill)
Create a Skill
Skills are stored as directories containing a `SKILL.md` file.
### 
[​](#personal-skills)
Personal Skills
Personal Skills are available across all your projects. Store them in `~/.claude/skills/`:
Copy
```
mkdir -p ~/.claude/skills/my-skill-name
```
**Use personal Skills for** :
 * Your individual workflows and preferences
 * Experimental Skills you’re developing
 * Personal productivity tools
### 
[​](#project-skills)
Project Skills
Project Skills are shared with your team. Store them in `.claude/skills/` within your project:
Copy
```
mkdir -p .claude/skills/my-skill-name
```
**Use project Skills for** :
 * Team workflows and conventions
 * Project-specific expertise
 * Shared utilities and scripts
Project Skills are checked into git and automatically available to team members.
### 
[​](#plugin-skills)
Plugin Skills
Skills can also come from [Claude Code plugins](/en/docs/claude-code/plugins). Plugins may bundle Skills that are automatically available when the plugin is installed. These Skills work the same way as personal and project Skills.
## 
[​](#write-skill-md)
Write SKILL.md
Create a `SKILL.md` file with YAML frontmatter and Markdown content:
Copy
```
---
name: your-skill-name
description: Brief description of what this Skill does and when to use it
---
# Your Skill Name
## Instructions
Provide clear, step-by-step guidance for Claude.
## Examples
Show concrete examples of using this Skill.
```
**Field requirements** :
 * `name`: Must use lowercase letters, numbers, and hyphens only (max 64 characters)
 * `description`: Brief description of what the Skill does and when to use it (max 1024 characters)
The `description` field is critical for Claude to discover when to use your Skill. It should include both what the Skill does and when Claude should use it. See the [best practices guide](/en/docs/agents-and-tools/agent-skills/best-practices) for complete authoring guidance including validation rules.
## 
[​](#add-supporting-files)
Add supporting files
Create additional files alongside SKILL.md:
Copy
```
my-skill/
├── SKILL.md (required)
├── reference.md (optional documentation)
├── examples.md (optional examples)
├── scripts/
│ └── helper.py (optional utility)
└── templates/
 └── template.txt (optional template)
```
Reference these files from SKILL.md:
Copy
```
For advanced usage, see [reference.md](reference.md).
Run the helper script:
```bash
python scripts/helper.py input.txt
```
```
Claude reads these files only when needed, using progressive disclosure to manage context efficiently.
## 
[​](#restrict-tool-access-with-allowed-tools)
Restrict tool access with allowed-tools
Use the `allowed-tools` frontmatter field to limit which tools Claude can use when a Skill is active:
Copy
```
---
name: safe-file-reader
description: Read files without making changes. Use when you need read-only file access.
allowed-tools: Read, Grep, Glob
---
# Safe File Reader
This Skill provides read-only file access.
## Instructions
1. Use Read to view file contents
2. Use Grep to search within files
3. Use Glob to find files by pattern
```
When this Skill is active, Claude can only use the specified tools (Read, Grep, Glob) without needing to ask for permission. This is useful for:
 * Read-only Skills that shouldn’t modify files
 * Skills with limited scope (e.g., only data analysis, no file writing)
 * Security-sensitive workflows where you want to restrict capabilities
If `allowed-tools` is not specified, Claude will ask for permission to use tools as normal, following the standard permission model.
`allowed-tools` is only supported for Skills in Claude Code.
## 
[​](#view-available-skills)
View available Skills
Skills are automatically discovered by Claude from three sources:
 * Personal Skills: `~/.claude/skills/`
 * Project Skills: `.claude/skills/`
 * Plugin Skills: bundled with installed plugins
**To view all available Skills** , ask Claude directly:
Copy
```
What Skills are available?
```
or
Copy
```
List all available Skills
```
This will show all Skills from all sources, including plugin Skills. **To inspect a specific Skill** , you can also check the filesystem:
Copy
```
# List personal Skills
ls ~/.claude/skills/
# List project Skills (if in a project directory)
ls .claude/skills/
# View a specific Skill's content
cat ~/.claude/skills/my-skill/SKILL.md
```
## 
[​](#test-a-skill)
Test a Skill
After creating a Skill, test it by asking questions that match your description. **Example** : If your description mentions “PDF files”:
Copy
```
Can you help me extract text from this PDF?
```
Claude autonomously decides to use your Skill if it matches the request—you don’t need to explicitly invoke it. The Skill activates automatically based on the context of your question.
## 
[​](#debug-a-skill)
Debug a Skill
If Claude doesn’t use your Skill, check these common issues:
### 
[​](#make-description-specific)
Make description specific
**Too vague** :
Copy
```
description: Helps with documents
```
**Specific** :
Copy
```
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
```
Include both what the Skill does and when to use it in the description.
### 
[​](#verify-file-path)
Verify file path
**Personal Skills** : `~/.claude/skills/skill-name/SKILL.md` **Project Skills** : `.claude/skills/skill-name/SKILL.md` Check the file exists:
Copy
```
# Personal
ls ~/.claude/skills/my-skill/SKILL.md
# Project
ls .claude/skills/my-skill/SKILL.md
```
### 
[​](#check-yaml-syntax)
Check YAML syntax
Invalid YAML prevents the Skill from loading. Verify the frontmatter:
Copy
```
cat SKILL.md | head -n 10
```
Ensure:
 * Opening `---` on line 1
 * Closing `---` before Markdown content
 * Valid YAML syntax (no tabs, correct indentation)
### 
[​](#view-errors)
View errors
Run Claude Code with debug mode to see Skill loading errors:
Copy
```
claude --debug
```
## 
[​](#share-skills-with-your-team)
Share Skills with your team
**Recommended approach** : Distribute Skills through [plugins](/en/docs/claude-code/plugins). To share Skills via plugin:
 1. Create a plugin with Skills in the `skills/` directory
 2. Add the plugin to a marketplace
 3. Team members install the plugin
For complete instructions, see [Add Skills to your plugin](/en/docs/claude-code/plugins#add-skills-to-your-plugin). You can also share Skills directly through project repositories:
### 
[​](#step-1%3A-add-skill-to-your-project)
Step 1: Add Skill to your project
Create a project Skill:
Copy
```
mkdir -p .claude/skills/team-skill
# Create SKILL.md
```
### 
[​](#step-2%3A-commit-to-git)
Step 2: Commit to git
Copy
```
git add .claude/skills/
git commit -m "Add team Skill for PDF processing"
git push
```
### 
[​](#step-3%3A-team-members-get-skills-automatically)
Step 3: Team members get Skills automatically
When team members pull the latest changes, Skills are immediately available:
Copy
```
git pull
claude # Skills are now available
```
## 
[​](#update-a-skill)
Update a Skill
Edit SKILL.md directly:
Copy
```
# Personal Skill
code ~/.claude/skills/my-skill/SKILL.md
# Project Skill
code .claude/skills/my-skill/SKILL.md
```
Changes take effect the next time you start Claude Code. If Claude Code is already running, restart it to load the updates.
## 
[​](#remove-a-skill)
Remove a Skill
Delete the Skill directory:
Copy
```
# Personal
rm -rf ~/.claude/skills/my-skill
# Project
rm -rf .claude/skills/my-skill
git commit -m "Remove unused Skill"
```
## 
[​](#best-practices)
Best practices
### 
[​](#keep-skills-focused)
Keep Skills focused
One Skill should address one capability: **Focused** :
 * “PDF form filling”
 * “Excel data analysis”
 * “Git commit messages”
**Too broad** :
 * “Document processing” (split into separate Skills)
 * “Data tools” (split by data type or operation)
### 
[​](#write-clear-descriptions)
Write clear descriptions
Help Claude discover when to use Skills by including specific triggers in your description: **Clear** :
Copy
```
description: Analyze Excel spreadsheets, create pivot tables, and generate charts. Use when working with Excel files, spreadsheets, or analyzing tabular data in .xlsx format.
```
**Vague** :
Copy
```
description: For files
```
### 
[​](#test-with-your-team)
Test with your team
Have teammates use Skills and provide feedback:
 * Does the Skill activate when expected?
 * Are the instructions clear?
 * Are there missing examples or edge cases?
### 
[​](#document-skill-versions)
Document Skill versions
You can document Skill versions in your SKILL.md content to track changes over time. Add a version history section:
Copy
```
# My Skill
## Version History
- v2.0.0 (2025-10-01): Breaking changes to API
- v1.1.0 (2025-09-15): Added new features
- v1.0.0 (2025-09-01): Initial release
```
This helps team members understand what changed between versions.
## 
[​](#troubleshooting)
Troubleshooting
### 
[​](#claude-doesn%E2%80%99t-use-my-skill)
Claude doesn’t use my Skill
**Symptom** : You ask a relevant question but Claude doesn’t use your Skill. **Check** : Is the description specific enough? Vague descriptions make discovery difficult. Include both what the Skill does and when to use it, with key terms users would mention. **Too generic** :
Copy
```
description: Helps with data
```
**Specific** :
Copy
```
description: Analyze Excel spreadsheets, generate pivot tables, create charts. Use when working with Excel files, spreadsheets, or .xlsx files.
```
**Check** : Is the YAML valid? Run validation to check for syntax errors:
Copy
```
# View frontmatter
cat .claude/skills/my-skill/SKILL.md | head -n 15
# Check for common issues
# - Missing opening or closing ---
# - Tabs instead of spaces
# - Unquoted strings with special characters
```
**Check** : Is the Skill in the correct location?
Copy
```
# Personal Skills
ls ~/.claude/skills/*/SKILL.md
# Project Skills
ls .claude/skills/*/SKILL.md
```
### 
[​](#skill-has-errors)
Skill has errors
**Symptom** : The Skill loads but doesn’t work correctly. **Check** : Are dependencies available? Claude will automatically install required dependencies (or ask for permission to install them) when it needs them. **Check** : Do scripts have execute permissions?
Copy
```
chmod +x .claude/skills/my-skill/scripts/*.py
```
**Check** : Are file paths correct? Use forward slashes (Unix style) in all paths: **Correct** : `scripts/helper.py` **Wrong** : `scripts\helper.py` (Windows style)
### 
[​](#multiple-skills-conflict)
Multiple Skills conflict
**Symptom** : Claude uses the wrong Skill or seems confused between similar Skills. **Be specific in descriptions** : Help Claude choose the right Skill by using distinct trigger terms in your descriptions. Instead of:
Copy
```
# Skill 1
description: For data analysis
# Skill 2
description: For analyzing data
```
Use:
Copy
```
# Skill 1
description: Analyze sales data in Excel files and CRM exports. Use for sales reports, pipeline analysis, and revenue tracking.
# Skill 2
description: Analyze log files and system metrics data. Use for performance monitoring, debugging, and system diagnostics.
```
## 
[​](#examples)
Examples
### 
[​](#simple-skill-single-file)
Simple Skill (single file)
Copy
```
commit-helper/
└── SKILL.md
```
Copy
```
---
name: generating-commit-messages
description: Generates clear commit messages from git diffs. Use when writing commit messages or reviewing staged changes.
---
# Generating Commit Messages
## Instructions
1. Run `git diff --staged` to see changes
2. I'll suggest a commit message with:
 - Summary under 50 characters
 - Detailed description
 - Affected components
## Best practices
- Use present tense
- Explain what and why, not how
```
### 
[​](#skill-with-tool-permissions)
Skill with tool permissions
Copy
```
code-reviewer/
└── SKILL.md
```
Copy
```
---
name: code-reviewer
description: Review code for best practices and potential issues. Use when reviewing code, checking PRs, or analyzing code quality.
allowed-tools: Read, Grep, Glob
---
# Code Reviewer
## Review checklist
1. Code organization and structure
2. Error handling
3. Performance considerations
4. Security concerns
5. Test coverage
## Instructions
1. Read the target files using Read tool
2. Search for patterns using Grep
3. Find related files using Glob
4. Provide detailed feedback on code quality
```
### 
[​](#multi-file-skill)
Multi-file Skill
Copy
```
pdf-processing/
├── SKILL.md
├── FORMS.md
├── REFERENCE.md
└── scripts/
 ├── fill_form.py
 └── validate.py
```
**SKILL.md** :
Copy
```
---
name: pdf-processing
description: Extract text, fill forms, merge PDFs. Use when working with PDF files, forms, or document extraction. Requires pypdf and pdfplumber packages.
---
# PDF Processing
## Quick start
Extract text:
```python
import pdfplumber
with pdfplumber.open("doc.pdf") as pdf:
 text = pdf.pages[0].extract_text()
```
For form filling, see [FORMS.md](FORMS.md).
For detailed API reference, see [REFERENCE.md](REFERENCE.md).
## Requirements
Packages must be installed in your environment:
```bash
pip install pypdf pdfplumber
```
```
List required packages in the description. Packages must be installed in your environment before Claude can use them.
Claude loads additional files only when needed.
## 
[​](#next-steps)
Next steps
## [Authoring best practices Write Skills that Claude can use effectively ](/en/docs/agents-and-tools/agent-skills/best-practices)## [Agent Skills overview Learn how Skills work across Claude products ](/en/docs/agents-and-tools/agent-skills/overview)## [Get started with Agent Skills Create your first Skill ](/en/docs/agents-and-tools/agent-skills/quickstart)
Was this page helpful?
YesNo
[Plugins](/en/docs/claude-code/plugins)[Output styles](/en/docs/claude-code/output-styles)
Assistant
Responses are generated using AI and may contain mistakes.