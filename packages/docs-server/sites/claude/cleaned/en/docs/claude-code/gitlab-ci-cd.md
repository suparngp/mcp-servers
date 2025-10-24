Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Build with Claude Code
Claude Code GitLab CI/CD
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
 * [Why use Claude Code with GitLab?](#why-use-claude-code-with-gitlab%3F)
 * [How it works](#how-it-works)
 * [What can Claude do?](#what-can-claude-do%3F)
 * [Setup](#setup)
 * [Quick setup](#quick-setup)
 * [Manual setup (recommended for production)](#manual-setup-recommended-for-production)
 * [Example use cases](#example-use-cases)
 * [Turn issues into MRs](#turn-issues-into-mrs)
 * [Get implementation help](#get-implementation-help)
 * [Fix bugs quickly](#fix-bugs-quickly)
 * [Using with AWS Bedrock & Google Vertex AI](#using-with-aws-bedrock-%26-google-vertex-ai)
 * [Configuration examples](#configuration-examples)
 * [Basic .gitlab-ci.yml (Claude API)](#basic-gitlab-ci-yml-claude-api)
 * [AWS Bedrock job example (OIDC)](#aws-bedrock-job-example-oidc)
 * [Google Vertex AI job example (Workload Identity Federation)](#google-vertex-ai-job-example-workload-identity-federation)
 * [Best practices](#best-practices)
 * [CLAUDE.md configuration](#claude-md-configuration)
 * [Security considerations](#security-considerations)
 * [Optimizing performance](#optimizing-performance)
 * [CI costs](#ci-costs)
 * [Security and governance](#security-and-governance)
 * [Troubleshooting](#troubleshooting)
 * [Claude not responding to @claude commands](#claude-not-responding-to-%40claude-commands)
 * [Job can’t write comments or open MRs](#job-can%E2%80%99t-write-comments-or-open-mrs)
 * [Authentication errors](#authentication-errors)
 * [Advanced configuration](#advanced-configuration)
 * [Common parameters and variables](#common-parameters-and-variables)
 * [Customizing Claude’s behavior](#customizing-claude%E2%80%99s-behavior)
Claude Code for GitLab CI/CD is currently in beta. Features and functionality may evolve as we refine the experience.This integration is maintained by GitLab. For support, see the following [GitLab issue](https://gitlab.com/gitlab-org/gitlab/-/issues/573776).
This integration is built on top of the [Claude Code CLI and SDK](/en/docs/claude-code/sdk), enabling programmatic use of Claude in your CI/CD jobs and custom automation workflows.
## 
[​](#why-use-claude-code-with-gitlab%3F)
Why use Claude Code with GitLab?
 * **Instant MR creation** : Describe what you need, and Claude proposes a complete MR with changes and explanation
 * **Automated implementation** : Turn issues into working code with a single command or mention
 * **Project-aware** : Claude follows your `CLAUDE.md` guidelines and existing code patterns
 * **Simple setup** : Add one job to `.gitlab-ci.yml` and a masked CI/CD variable
 * **Enterprise-ready** : Choose Claude API, AWS Bedrock, or Google Vertex AI to meet data residency and procurement needs
 * **Secure by default** : Runs in your GitLab runners with your branch protection and approvals
## 
[​](#how-it-works)
How it works
Claude Code uses GitLab CI/CD to run AI tasks in isolated jobs and commit results back via MRs:
 1. **Event-driven orchestration** : GitLab listens for your chosen triggers (for example, a comment that mentions `@claude` in an issue, MR, or review thread). The job collects context from the thread and repository, builds prompts from that input, and runs Claude Code.
 2. **Provider abstraction** : Use the provider that fits your environment:
 * Claude API (SaaS)
 * AWS Bedrock (IAM-based access, cross-region options)
 * Google Vertex AI (GCP-native, Workload Identity Federation)
 3. **Sandboxed execution** : Each interaction runs in a container with strict network and filesystem rules. Claude Code enforces workspace-scoped permissions to constrain writes. Every change flows through an MR so reviewers see the diff and approvals still apply.
Pick regional endpoints to reduce latency and meet data-sovereignty requirements while using existing cloud agreements.
## 
[​](#what-can-claude-do%3F)
What can Claude do?
Claude Code enables powerful CI/CD workflows that transform how you work with code:
 * Create and update MRs from issue descriptions or comments
 * Analyze performance regressions and propose optimizations
 * Implement features directly in a branch, then open an MR
 * Fix bugs and regressions identified by tests or comments
 * Respond to follow-up comments to iterate on requested changes
## 
[​](#setup)
Setup
### 
[​](#quick-setup)
Quick setup
The fastest way to get started is to add a minimal job to your `.gitlab-ci.yml` and set your API key as a masked variable.
 1. **Add a masked CI/CD variable**
 * Go to **Settings** → **CI/CD** → **Variables**
 * Add `ANTHROPIC_API_KEY` (masked, protected as needed)
 2. **Add a Claude job to`.gitlab-ci.yml`**
Copy
```
stages:
 - ai
claude:
 stage: ai
 image: node:24-alpine3.21
 # Adjust rules to fit how you want to trigger the job:
 # - manual runs
 # - merge request events
 # - web/API triggers when a comment contains '@claude'
 rules:
 - if: '$CI_PIPELINE_SOURCE == "web"'
 - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
 variables:
 GIT_STRATEGY: fetch
 before_script:
 - apk update
 - apk add --no-cache git curl bash
 - npm install -g @anthropic-ai/claude-code
 script:
 # Optional: start a GitLab MCP server if your setup provides one
 - /bin/gitlab-mcp-server || true
 # Use AI_FLOW_* variables when invoking via web/API triggers with context payloads
 - echo "$AI_FLOW_INPUT for $AI_FLOW_CONTEXT on $AI_FLOW_EVENT"
 - >
 claude
 -p "${AI_FLOW_INPUT:-'Review this MR and implement the requested changes'}"
 --permission-mode acceptEdits
 --allowedTools "Bash(*) Read(*) Edit(*) Write(*) mcp__gitlab"
 --debug
```
After adding the job and your `ANTHROPIC_API_KEY` variable, test by running the job manually from **CI/CD** → **Pipelines** , or trigger it from an MR to let Claude propose updates in a branch and open an MR if needed.
To run on AWS Bedrock or Google Vertex AI instead of the Claude API, see the [Using with AWS Bedrock & Google Vertex AI](#using-with-aws-bedrock--google-vertex-ai) section below for authentication and environment setup.
### 
[​](#manual-setup-recommended-for-production)
Manual setup (recommended for production)
If you prefer a more controlled setup or need enterprise providers:
 1. **Configure provider access** :
 * **Claude API** : Create and store `ANTHROPIC_API_KEY` as a masked CI/CD variable
 * **AWS Bedrock** : **Configure GitLab** → **AWS OIDC** and create an IAM role for Bedrock
 * **Google Vertex AI** : **Configure Workload Identity Federation for GitLab** → **GCP**
 2. **Add project credentials for GitLab API operations** :
 * Use `CI_JOB_TOKEN` by default, or create a Project Access Token with `api` scope
 * Store as `GITLAB_ACCESS_TOKEN` (masked) if using a PAT
 3. **Add the Claude job to`.gitlab-ci.yml`** (see examples below)
 4. **(Optional) Enable mention-driven triggers** :
 * Add a project webhook for “Comments (notes)” to your event listener (if you use one)
 * Have the listener call the pipeline trigger API with variables like `AI_FLOW_INPUT` and `AI_FLOW_CONTEXT` when a comment contains `@claude`
## 
[​](#example-use-cases)
Example use cases
### 
[​](#turn-issues-into-mrs)
Turn issues into MRs
In an issue comment:
Copy
```
@claude implement this feature based on the issue description
```
Claude analyzes the issue and codebase, writes changes in a branch, and opens an MR for review.
### 
[​](#get-implementation-help)
Get implementation help
In an MR discussion:
Copy
```
@claude suggest a concrete approach to cache the results of this API call
```
Claude proposes changes, adds code with appropriate caching, and updates the MR.
### 
[​](#fix-bugs-quickly)
Fix bugs quickly
In an issue or MR comment:
Copy
```
@claude fix the TypeError in the user dashboard component
```
Claude locates the bug, implements a fix, and updates the branch or opens a new MR.
## 
[​](#using-with-aws-bedrock-%26-google-vertex-ai)
Using with AWS Bedrock & Google Vertex AI
For enterprise environments, you can run Claude Code entirely on your cloud infrastructure with the same developer experience.
 * AWS Bedrock
 * Google Vertex AI
### 
[​](#prerequisites)
Prerequisites
Before setting up Claude Code with AWS Bedrock, you need:
 1. An AWS account with Amazon Bedrock access to the desired Claude models
 2. GitLab configured as an OIDC identity provider in AWS IAM
 3. An IAM role with Bedrock permissions and a trust policy restricted to your GitLab project/refs
 4. GitLab CI/CD variables for role assumption:
 * `AWS_ROLE_TO_ASSUME` (role ARN)
 * `AWS_REGION` (Bedrock region)
### 
[​](#setup-instructions)
Setup instructions
Configure AWS to allow GitLab CI jobs to assume an IAM role via OIDC (no static keys).**Required setup:**
 1. Enable Amazon Bedrock and request access to your target Claude models
 2. Create an IAM OIDC provider for GitLab if not already present
 3. Create an IAM role trusted by the GitLab OIDC provider, restricted to your project and protected refs
 4. Attach least-privilege permissions for Bedrock invoke APIs
**Required values to store in CI/CD variables:**
 * `AWS_ROLE_TO_ASSUME`
 * `AWS_REGION`
Add variables in Settings → CI/CD → Variables:
Copy
```
# For AWS Bedrock:
- AWS_ROLE_TO_ASSUME
- AWS_REGION
```
Use the AWS Bedrock job example above to exchange the GitLab job token for temporary AWS credentials at runtime.
## 
[​](#configuration-examples)
Configuration examples
Below are ready-to-use snippets you can adapt to your pipeline.
### 
[​](#basic-gitlab-ci-yml-claude-api)
Basic .gitlab-ci.yml (Claude API)
Copy
```
stages:
 - ai
claude:
 stage: ai
 image: node:24-alpine3.21
 rules:
 - if: '$CI_PIPELINE_SOURCE == "web"'
 - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
 variables:
 GIT_STRATEGY: fetch
 before_script:
 - apk update
 - apk add --no-cache git curl bash
 - npm install -g @anthropic-ai/claude-code
 script:
 - /bin/gitlab-mcp-server || true
 - >
 claude
 -p "${AI_FLOW_INPUT:-'Summarize recent changes and suggest improvements'}"
 --permission-mode acceptEdits
 --allowedTools "Bash(*) Read(*) Edit(*) Write(*) mcp__gitlab"
 --debug
 # Claude Code will use ANTHROPIC_API_KEY from CI/CD variables
```
### 
[​](#aws-bedrock-job-example-oidc)
AWS Bedrock job example (OIDC)
**Prerequisites:**
 * Amazon Bedrock enabled with access to your chosen Claude model(s)
 * GitLab OIDC configured in AWS with a role that trusts your GitLab project and refs
 * IAM role with Bedrock permissions (least privilege recommended)
**Required CI/CD variables:**
 * `AWS_ROLE_TO_ASSUME`: ARN of the IAM role for Bedrock access
 * `AWS_REGION`: Bedrock region (for example, `us-west-2`)
Copy
```
claude-bedrock:
 stage: ai
 image: node:24-alpine3.21
 rules:
 - if: '$CI_PIPELINE_SOURCE == "web"'
 before_script:
 - apk add --no-cache bash curl jq git python3 py3-pip
 - pip install --no-cache-dir awscli
 - npm install -g @anthropic-ai/claude-code
 # Exchange GitLab OIDC token for AWS credentials
 - export AWS_WEB_IDENTITY_TOKEN_FILE="${CI_JOB_JWT_FILE:-/tmp/oidc_token}"
 - if [ -n "${CI_JOB_JWT_V2}" ]; then printf "%s" "$CI_JOB_JWT_V2" > "$AWS_WEB_IDENTITY_TOKEN_FILE"; fi
 - >
 aws sts assume-role-with-web-identity
 --role-arn "$AWS_ROLE_TO_ASSUME"
 --role-session-name "gitlab-claude-$(date +%s)"
 --web-identity-token "file://$AWS_WEB_IDENTITY_TOKEN_FILE"
 --duration-seconds 3600 > /tmp/aws_creds.json
 - export AWS_ACCESS_KEY_ID="$(jq -r .Credentials.AccessKeyId /tmp/aws_creds.json)"
 - export AWS_SECRET_ACCESS_KEY="$(jq -r .Credentials.SecretAccessKey /tmp/aws_creds.json)"
 - export AWS_SESSION_TOKEN="$(jq -r .Credentials.SessionToken /tmp/aws_creds.json)"
 script:
 - /bin/gitlab-mcp-server || true
 - >
 claude
 -p "${AI_FLOW_INPUT:-'Implement the requested changes and open an MR'}"
 --permission-mode acceptEdits
 --allowedTools "Bash(*) Read(*) Edit(*) Write(*) mcp__gitlab"
 --debug
 variables:
 AWS_REGION: "us-west-2"
```
Model IDs for Bedrock include region-specific prefixes and version suffixes (for example, `us.anthropic.claude-3-7-sonnet-20250219-v1:0`). Pass the desired model via your job configuration or prompt if your workflow supports it.
### 
[​](#google-vertex-ai-job-example-workload-identity-federation)
Google Vertex AI job example (Workload Identity Federation)
**Prerequisites:**
 * Vertex AI API enabled in your GCP project
 * Workload Identity Federation configured to trust GitLab OIDC
 * A service account with Vertex AI permissions
**Required CI/CD variables:**
 * `GCP_WORKLOAD_IDENTITY_PROVIDER`: Full provider resource name
 * `GCP_SERVICE_ACCOUNT`: Service account email
 * `CLOUD_ML_REGION`: Vertex region (for example, `us-east5`)
Copy
```
claude-vertex:
 stage: ai
 image: gcr.io/google.com/cloudsdktool/google-cloud-cli:slim
 rules:
 - if: '$CI_PIPELINE_SOURCE == "web"'
 before_script:
 - apt-get update && apt-get install -y git nodejs npm && apt-get clean
 - npm install -g @anthropic-ai/claude-code
 # Authenticate to Google Cloud via WIF (no downloaded keys)
 - >
 gcloud auth login --cred-file=<(cat <<EOF
 {
 "type": "external_account",
 "audience": "${GCP_WORKLOAD_IDENTITY_PROVIDER}",
 "subject_token_type": "urn:ietf:params:oauth:token-type:jwt",
 "service_account_impersonation_url": "https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${GCP_SERVICE_ACCOUNT}:generateAccessToken",
 "token_url": "https://sts.googleapis.com/v1/token"
 }
 EOF
 )
 - gcloud config set project "$(gcloud projects list --format='value(projectId)' --filter="name:${CI_PROJECT_NAMESPACE}" | head -n1)" || true
 script:
 - /bin/gitlab-mcp-server || true
 - >
 CLOUD_ML_REGION="${CLOUD_ML_REGION:-us-east5}"
 claude
 -p "${AI_FLOW_INPUT:-'Review and update code as requested'}"
 --permission-mode acceptEdits
 --allowedTools "Bash(*) Read(*) Edit(*) Write(*) mcp__gitlab"
 --debug
 variables:
 CLOUD_ML_REGION: "us-east5"
```
With Workload Identity Federation, you do not need to store service account keys. Use repository-specific trust conditions and least-privilege service accounts.
## 
[​](#best-practices)
Best practices
### 
[​](#claude-md-configuration)
CLAUDE.md configuration
Create a `CLAUDE.md` file at the repository root to define coding standards, review criteria, and project-specific rules. Claude reads this file during runs and follows your conventions when proposing changes.
### 
[​](#security-considerations)
Security considerations
Never commit API keys or cloud credentials to your repository! Always use GitLab CI/CD variables:
 * Add `ANTHROPIC_API_KEY` as a masked variable (and protect it if needed)
 * Use provider-specific OIDC where possible (no long-lived keys)
 * Limit job permissions and network egress
 * Review Claude’s MRs like any other contributor
### 
[​](#optimizing-performance)
Optimizing performance
 * Keep `CLAUDE.md` focused and concise
 * Provide clear issue/MR descriptions to reduce iterations
 * Configure sensible job timeouts to avoid runaway runs
 * Cache npm and package installs in runners where possible
### 
[​](#ci-costs)
CI costs
When using Claude Code with GitLab CI/CD, be aware of associated costs:
 * **GitLab Runner time** :
 * Claude runs on your GitLab runners and consumes compute minutes
 * See your GitLab plan’s runner billing for details
 * **API costs** :
 * Each Claude interaction consumes tokens based on prompt and response size
 * Token usage varies by task complexity and codebase size
 * See [Anthropic pricing](/en/docs/about-claude/pricing) for details
 * **Cost optimization tips** :
 * Use specific `@claude` commands to reduce unnecessary turns
 * Set appropriate `max_turns` and job timeout values
 * Limit concurrency to control parallel runs
## 
[​](#security-and-governance)
Security and governance
 * Each job runs in an isolated container with restricted network access
 * Claude’s changes flow through MRs so reviewers see every diff
 * Branch protection and approval rules apply to AI-generated code
 * Claude Code uses workspace-scoped permissions to constrain writes
 * Costs remain under your control because you bring your own provider credentials
## 
[​](#troubleshooting)
Troubleshooting
### 
[​](#claude-not-responding-to-%40claude-commands)
Claude not responding to @claude commands
 * Verify your pipeline is being triggered (manually, MR event, or via a note event listener/webhook)
 * Ensure CI/CD variables (`ANTHROPIC_API_KEY` or cloud provider settings) are present and unmasked
 * Check that the comment contains `@claude` (not `/claude`) and that your mention trigger is configured
### 
[​](#job-can%E2%80%99t-write-comments-or-open-mrs)
Job can’t write comments or open MRs
 * Ensure `CI_JOB_TOKEN` has sufficient permissions for the project, or use a Project Access Token with `api` scope
 * Check the `mcp__gitlab` tool is enabled in `--allowedTools`
 * Confirm the job runs in the context of the MR or has enough context via `AI_FLOW_*` variables
### 
[​](#authentication-errors)
Authentication errors
 * **For Claude API** : Confirm `ANTHROPIC_API_KEY` is valid and unexpired
 * **For Bedrock/Vertex** : Verify OIDC/WIF configuration, role impersonation, and secret names; confirm region and model availability
## 
[​](#advanced-configuration)
Advanced configuration
### 
[​](#common-parameters-and-variables)
Common parameters and variables
Claude Code supports these commonly used inputs:
 * `prompt` / `prompt_file`: Provide instructions inline (`-p`) or via a file
 * `max_turns`: Limit the number of back-and-forth iterations
 * `timeout_minutes`: Limit total execution time
 * `ANTHROPIC_API_KEY`: Required for the Claude API (not used for Bedrock/Vertex)
 * Provider-specific environment: `AWS_REGION`, project/region vars for Vertex
Exact flags and parameters may vary by version of `@anthropic-ai/claude-code`. Run `claude --help` in your job to see supported options.
### 
[​](#customizing-claude%E2%80%99s-behavior)
Customizing Claude’s behavior
You can guide Claude in two primary ways:
 1. **CLAUDE.md** : Define coding standards, security requirements, and project conventions. Claude reads this during runs and follows your rules.
 2. **Custom prompts** : Pass task-specific instructions via `prompt`/`prompt_file` in the job. Use different prompts for different jobs (for example, review, implement, refactor).
Was this page helpful?
YesNo
[GitHub Actions](/en/docs/claude-code/github-actions)[Model Context Protocol (MCP)](/en/docs/claude-code/mcp)
Assistant
Responses are generated using AI and may contain mistakes.