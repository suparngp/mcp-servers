Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Administration
Data usage
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
 * [Data policies](#data-policies)
 * [Data training policy](#data-training-policy)
 * [Development Partner Program](#development-partner-program)
 * [Feedback using the /bug command](#feedback-using-the-%2Fbug-command)
 * [Data retention](#data-retention)
 * [Data flow and dependencies](#data-flow-and-dependencies)
 * [Cloud execution](#cloud-execution)
 * [Telemetry services](#telemetry-services)
 * [Default behaviors by API provider](#default-behaviors-by-api-provider)
## 
[​](#data-policies)
Data policies
### 
[​](#data-training-policy)
Data training policy
**Consumer users (Free, Pro, and Max plans)** : Starting August 28, 2025, we’re giving you the choice to allow your data to be used to improve future Claude models. We will train new models using data from Free, Pro, and Max accounts when this setting is on (including when you use Claude Code from these accounts).
 * If you’re a current user, you can select your preference now and your selection will immediately go into effect. This setting will only apply to new or resumed chats and coding sessions on Claude. Previous chats with no additional activity will not be used for model training.
 * You have until October 8, 2025 to make your selection. If you’re a new user, you can pick your setting for model training during the signup process. You can change your selection at any time in your Privacy Settings.
**Commercial users** : (Team and Enterprise plans, API, 3rd-party platforms, and Claude Gov) maintain existing policies: Anthropic does not train generative models using code or prompts sent to Claude Code under commercial terms, unless the customer has chosen to provide their data to us for model improvement (e.g. [Developer Partner Program](https://support.claude.com/en/articles/11174108-about-the-development-partner-program)).
### 
[​](#development-partner-program)
Development Partner Program
If you explicitly opt in to methods to provide us with materials to train on, such as via the [Development Partner Program](https://support.claude.com/en/articles/11174108-about-the-development-partner-program), we may use those materials provided to train our models. An organization admin can expressly opt-in to the Development Partner Program for their organization. Note that this program is available only for Anthropic first-party API, and not for Bedrock or Vertex users.
### 
[​](#feedback-using-the-%2Fbug-command)
Feedback using the `/bug` command
If you choose to send us feedback about Claude Code using the `/bug` command, we may use your feedback to improve our products and services. Transcripts shared via `/bug` are retained for 5 years.
### 
[​](#data-retention)
Data retention
Anthropic retains Claude Code data based on your account type and preferences. **Consumer users (Free, Pro, and Max plans)** :
 * Users who allow data use for model improvement: 5-year retention period to support model development and safety improvements
 * Users who don’t allow data use for model improvement: 30-day retention period
 * Privacy settings can be changed at any time at [claude.ai/settings/data-privacy-controls](claude.ai/settings/data-privacy-controls).
**Commercial users (Team, Enterprise, and API)** :
 * Standard: 30-day retention period
 * Zero data retention: Available with appropriately configured API keys - Claude Code will not retain chat transcripts on servers
 * Local caching: Claude Code clients may store sessions locally for up to 30 days to enable session resumption (configurable)
Learn more about data retention practices in our [Privacy Center](https://privacy.anthropic.com/). For full details, please review our [Commercial Terms of Service](https://www.anthropic.com/legal/commercial-terms) (for Team, Enterprise, and API users) or [Consumer Terms](https://www.anthropic.com/legal/consumer-terms) (for Free, Pro, and Max users) and [Privacy Policy](https://www.anthropic.com/legal/privacy).
## 
[​](#data-flow-and-dependencies)
Data flow and dependencies
![Claude Code data flow diagram](https://mintcdn.com/anthropic-claude-docs/LF5WV0SNF6oudpT5/images/claude-code-data-flow.png?fit=max&auto=format&n=LF5WV0SNF6oudpT5&q=85&s=4b30069d702719e7bfb974eaaafab21c) Claude Code is installed from [NPM](https://www.npmjs.com/package/@anthropic-ai/claude-code). Claude Code runs locally. In order to interact with the LLM, Claude Code sends data over the network. This data includes all user prompts and model outputs. The data is encrypted in transit via TLS and is not encrypted at rest. Claude Code is compatible with most popular VPNs and LLM proxies. Claude Code is built on Anthropic’s APIs. For details regarding our API’s security controls, including our API logging procedures, please refer to compliance artifacts offered in the [Anthropic Trust Center](https://trust.anthropic.com).
### 
[​](#cloud-execution)
Cloud execution
The above data flow diagram and description applies to Claude Code CLI running locally on your machine. For cloud-based sessions using Claude Code on the web, see the section below.
When using [Claude Code on the web](/en/docs/claude-code/claude-code-on-the-web), sessions run in Anthropic-managed virtual machines instead of locally. In cloud environments:
 * **Code storage** : Your repository is cloned to an isolated VM and automatically deleted after session completion
 * **Credentials** : GitHub authentication is handled through a secure proxy; your GitHub credentials never enter the sandbox
 * **Network traffic** : All outbound traffic goes through a security proxy for audit logging and abuse prevention
 * **Data retention** : Code and session data are subject to the retention and usage policies for your account type
 * **Session data** : Prompts, code changes, and outputs follow the same data policies as local Claude Code usage
For security details about cloud execution, see [Security](/en/docs/claude-code/security#cloud-execution-security).
## 
[​](#telemetry-services)
Telemetry services
Claude Code connects from users’ machines to the Statsig service to log operational metrics such as latency, reliability, and usage patterns. This logging does not include any code or file paths. Data is encrypted in transit using TLS and at rest using 256-bit AES encryption. Read more in the [Statsig security documentation](https://www.statsig.com/trust/security). To opt out of Statsig telemetry, set the `DISABLE_TELEMETRY` environment variable. Claude Code connects from users’ machines to Sentry for operational error logging. The data is encrypted in transit using TLS and at rest using 256-bit AES encryption. Read more in the [Sentry security documentation](https://sentry.io/security/). To opt out of error logging, set the `DISABLE_ERROR_REPORTING` environment variable. When users run the `/bug` command, a copy of their full conversation history including code is sent to Anthropic. The data is encrypted in transit and at rest. Optionally, a Github issue is created in our public repository. To opt out of bug reporting, set the `DISABLE_BUG_COMMAND` environment variable.
## 
[​](#default-behaviors-by-api-provider)
Default behaviors by API provider
By default, we disable all non-essential traffic (including error reporting, telemetry, and bug reporting functionality) when using Bedrock or Vertex. You can also opt out of all of these at once by setting the `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` environment variable. Here are the full default behaviors: Service | Claude API | Vertex API | Bedrock API 
---|---|---|--- 
**Statsig (Metrics)** | Default on. 
`DISABLE_TELEMETRY=1` to disable. | Default off. 
`CLAUDE_CODE_USE_VERTEX` must be 1. | Default off. 
`CLAUDE_CODE_USE_BEDROCK` must be 1. 
**Sentry (Errors)** | Default on. 
`DISABLE_ERROR_REPORTING=1` to disable. | Default off. 
`CLAUDE_CODE_USE_VERTEX` must be 1. | Default off. 
`CLAUDE_CODE_USE_BEDROCK` must be 1. 
**Claude API (`/bug` reports)** | Default on. 
`DISABLE_BUG_COMMAND=1` to disable. | Default off. 
`CLAUDE_CODE_USE_VERTEX` must be 1. | Default off. 
`CLAUDE_CODE_USE_BEDROCK` must be 1. 
All environment variables can be checked into `settings.json` ([read more](/en/docs/claude-code/settings)).
Was this page helpful?
YesNo
[Security](/en/docs/claude-code/security)[Monitoring](/en/docs/claude-code/monitoring-usage)
Assistant
Responses are generated using AI and may contain mistakes.