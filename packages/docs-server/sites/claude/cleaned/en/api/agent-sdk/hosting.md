Agent Skills are now available! [Learn more about extending Claude's capabilities with Agent Skills](/en/docs/agents-and-tools/agent-skills/overview).
[Claude Docs home page![light logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/light.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=c877c45432515ee69194cb19e9f983a2)![dark logo](https://mintcdn.com/anthropic-claude-docs/DcI2Ybid7ZEnFaf0/logo/dark.svg?fit=max&auto=format&n=DcI2Ybid7ZEnFaf0&q=85&s=f5bb877be0cb3cba86cf6d7c88185216)](/)
![US](https://d3gk2c5xim1je2.cloudfront.net/flags/US.svg)
English
Search...
⌘K
Search...
Navigation
Guides
Hosting the Agent SDK
[Welcome](/en/home)[Claude Developer Platform](/en/docs/intro)[Claude Code](/en/docs/claude-code/overview)[Model Context Protocol (MCP)](/en/docs/mcp)[API Reference](/en/api/messages)[Resources](/en/resources/overview)[Release Notes](/en/release-notes/overview)
* [](/en/docs/intro)
* [](/en/api/overview)
##### Using the APIs
 * [Overview](/en/api/overview)
 * [Rate limits](/en/api/rate-limits)
 * [Service tiers](/en/api/service-tiers)
 * [Errors](/en/api/errors)
 * [Handling stop reasons](/en/api/handling-stop-reasons)
 * [Beta headers](/en/api/beta-headers)
##### API reference
 * Messages
 * Models
 * Message Batches
 * Files
 * Skills
 * Admin API
 * Experimental APIs
 * Text Completions (Legacy)
##### SDKs
 * [Client SDKs](/en/api/client-sdks)
 * [OpenAI SDK compatibility](/en/api/openai-sdk)
 * Agent SDK
 * [Migrate to Claude Agent SDK](/en/docs/claude-code/sdk/migration-guide)
 * [Overview](/en/api/agent-sdk/overview)
 * [TypeScript SDK](/en/api/agent-sdk/typescript)
 * [Python SDK](/en/api/agent-sdk/python)
 * Guides
 * [Streaming Input](/en/api/agent-sdk/streaming-vs-single-mode)
 * [Handling Permissions](/en/api/agent-sdk/permissions)
 * [Session Management](/en/api/agent-sdk/sessions)
 * [Hosting the Agent SDK](/en/api/agent-sdk/hosting)
 * [Modifying system prompts](/en/api/agent-sdk/modifying-system-prompts)
 * [MCP in the SDK](/en/api/agent-sdk/mcp)
 * [Custom Tools](/en/api/agent-sdk/custom-tools)
 * [Subagents in the SDK](/en/api/agent-sdk/subagents)
 * [Slash Commands in the SDK](/en/api/agent-sdk/slash-commands)
 * [Tracking Costs and Usage](/en/api/agent-sdk/cost-tracking)
 * [Todo Lists](/en/api/agent-sdk/todo-tracking)
##### Examples
 * [Messages examples](/en/api/messages-examples)
 * [Message Batches examples](/en/api/messages-batch-examples)
##### 3rd-party APIs
 * [Amazon Bedrock API](/en/api/claude-on-amazon-bedrock)
 * [Vertex AI API](/en/api/claude-on-vertex-ai)
##### Using the Admin API
 * [Admin API overview](/en/api/administration-api)
 * [Usage and Cost API](/en/api/usage-cost-api)
 * [Claude Code Analytics API](/en/api/claude-code-analytics-api)
##### Support & configuration
 * [Versions](/en/api/versioning)
 * [IP addresses](/en/api/ip-addresses)
 * [Supported regions](/en/api/supported-regions)
 * [Getting help](/en/api/getting-help)
On this page
 * [Hosting Requirements](#hosting-requirements)
 * [Container-Based Sandboxing](#container-based-sandboxing)
 * [System Requirements](#system-requirements)
 * [Understanding the SDK Architecture](#understanding-the-sdk-architecture)
 * [Sandbox Provider Options](#sandbox-provider-options)
 * [Production Deployment Patterns](#production-deployment-patterns)
 * [Pattern 1: Ephemeral Sessions](#pattern-1%3A-ephemeral-sessions)
 * [Pattern 2: Long-Running Sessions](#pattern-2%3A-long-running-sessions)
 * [Pattern 3: Hybrid Sessions](#pattern-3%3A-hybrid-sessions)
 * [Pattern 4: Single Containers](#pattern-4%3A-single-containers)
 * [FAQ](#faq)
 * [How do I communicate with my sandboxes?](#how-do-i-communicate-with-my-sandboxes%3F)
 * [What is the cost of hosting a container?](#what-is-the-cost-of-hosting-a-container%3F)
 * [When should I shut down idle containers vs. keeping them warm?](#when-should-i-shut-down-idle-containers-vs-keeping-them-warm%3F)
 * [How often should I update the Claude Code CLI?](#how-often-should-i-update-the-claude-code-cli%3F)
 * [How do I monitor container health and agent performance?](#how-do-i-monitor-container-health-and-agent-performance%3F)
 * [How long can an agent session run before timing out?](#how-long-can-an-agent-session-run-before-timing-out%3F)
 * [Next Steps](#next-steps)
The Claude Agent SDK differs from traditional stateless LLM APIs in that it maintains conversational state and executes commands in a persistent environment. This guide covers the architecture, hosting considerations, and best practices for deploying SDK-based agents in production.
## 
[​](#hosting-requirements)
Hosting Requirements
### 
[​](#container-based-sandboxing)
Container-Based Sandboxing
For security and isolation, the SDK should run inside a **sandboxed container environment**. This provides:
 * **Process isolation** - Separate execution environment per session
 * **Resource limits** - CPU, memory, and storage constraints
 * **Network control** - Restrict outbound connections
 * **Ephemeral filesystems** - Clean state for each session
### 
[​](#system-requirements)
System Requirements
Each SDK instance requires:
 * **Runtime dependencies**
 * Python 3.10+ (for Python SDK) or Node.js 18+ (for TypeScript SDK)
 * Node.js (required by Claude Code CLI)
 * Claude Code CLI: `npm install -g @anthropic-ai/claude-code`
 * **Resource allocation**
 * Recommended: 1GiB RAM, 5GiB of disk, and 1 CPU (vary this based on your task as needed)
 * **Network access**
 * Outbound HTTPS to `api.anthropic.com`
 * Optional: Access to MCP servers or external tools
## 
[​](#understanding-the-sdk-architecture)
Understanding the SDK Architecture
Unlike stateless API calls, the Claude Agent SDK operates as a **long-running process** that:
 * **Executes commands** in a persistent shell environment
 * **Manages file operations** within a working directory
 * **Handles tool execution** with context from previous interactions
## 
[​](#sandbox-provider-options)
Sandbox Provider Options
Several providers specialize in secure container environments for AI code execution:
 * **[AWS Sandboxes](https://aws.amazon.com/solutions/implementations/innovation-sandbox-on-aws/)**
 * **[Cloudflare Sandboxes](https://github.com/cloudflare/sandbox-sdk)**
 * **[Modal Sandboxes](https://modal.com/docs/guide/sandbox)**
 * **[Daytona](https://www.daytona.io/)**
 * **[E2B](https://e2b.dev/)**
 * **[Fly Machines](https://fly.io/docs/machines/)**
 * **[Vercel Sandbox](https://vercel.com/docs/functions/sandbox)**
## 
[​](#production-deployment-patterns)
Production Deployment Patterns
### 
[​](#pattern-1%3A-ephemeral-sessions)
Pattern 1: Ephemeral Sessions
Create a new container for each user task, then destroy it when complete. Best for one-off tasks, the user may still interact with the AI while the task is completing, but once completed the container is destroyed. **Examples:**
 * Bug Investigation & Fix: Debug and resolve a specific issue with relevant context
 * Invoice Processing: Extract and structure data from receipts/invoices for accounting systems
 * Translation Tasks: Translate documents or content batches between languages
 * Image/Video Processing: Apply transformations, optimizations, or extract metadata from media files
### 
[​](#pattern-2%3A-long-running-sessions)
Pattern 2: Long-Running Sessions
Maintain persistent container instances for long running tasks. Often times running _multiple_ Claude Agent processes inside of the container based on demand. Best for proactive agents that take action without the users input, agents that serve content or agents that process high amounts of messages. **Examples:**
 * Email Agent: Monitors incoming emails and autonomously triages, responds, or takes actions based on content
 * Site Builder: Hosts custom websites per user with live editing capabilities served through container ports
 * High-Frequency Chat Bots: Handles continuous message streams from platforms like Slack where rapid response times are critical
### 
[​](#pattern-3%3A-hybrid-sessions)
Pattern 3: Hybrid Sessions
Ephemeral containers that are hydrated with history and state, possibly from a database or from the SDK’s session resumption features. Best for containers with intermittent interaction from the user that kicks off work and spins down when the work is completed but can be continued. **Examples:**
 * Personal Project Manager: Helps manage ongoing projects with intermittent check-ins, maintains context of tasks, decisions, and progress
 * Deep Research: Conducts multi-hour research tasks, saves findings and resumes investigation when user returns
 * Customer Support Agent: Handles support tickets that span multiple interactions, loads ticket history and customer context
### 
[​](#pattern-4%3A-single-containers)
Pattern 4: Single Containers
Run multiple Claude Agent SDK processes in one global container. Best for agents that must collaborate closely together. This is likely the least popular pattern because you will have to prevent agents from overwriting each other. **Examples:**
 * **Simulations** : Agents that interact with each other in simulations such as video games.
# 
[​](#faq)
FAQ
### 
[​](#how-do-i-communicate-with-my-sandboxes%3F)
How do I communicate with my sandboxes?
When hosting in containers, expose ports to communicate with your SDK instances. Your application can expose HTTP/WebSocket endpoints for external clients while the SDK runs internally within the container.
### 
[​](#what-is-the-cost-of-hosting-a-container%3F)
What is the cost of hosting a container?
We have found that the dominant cost of serving agents is the tokens, containers vary based on what you provision but a minimum cost is roughly 5 cents per hour running.
### 
[​](#when-should-i-shut-down-idle-containers-vs-keeping-them-warm%3F)
When should I shut down idle containers vs. keeping them warm?
This is likely provider dependent, different sandbox providers will let you set different criteria for idle timeouts after which a sandbox might spin down. You will want to tune this timeout based on how frequent you think user response might be.
### 
[​](#how-often-should-i-update-the-claude-code-cli%3F)
How often should I update the Claude Code CLI?
The Claude Code CLI is versioned with semver, so any breaking changes will be versioned.
### 
[​](#how-do-i-monitor-container-health-and-agent-performance%3F)
How do I monitor container health and agent performance?
Since containers are just servers the same logging infrastructure you use for the backend will work for containers.
### 
[​](#how-long-can-an-agent-session-run-before-timing-out%3F)
How long can an agent session run before timing out?
An agent session will not timeout, but we recommend setting a ‘maxTurns’ property to prevent Claude from getting stuck in a loop.
## 
[​](#next-steps)
Next Steps
 * [Sessions Guide](/en/api/agent-sdk/sessions) - Learn about session management
 * [Permissions](/en/api/agent-sdk/permissions) - Configure tool permissions
 * [Cost Tracking](/en/api/agent-sdk/cost-tracking) - Monitor API usage
 * [MCP Integration](/en/api/agent-sdk/mcp) - Extend with custom tools
Was this page helpful?
YesNo
[Session Management](/en/api/agent-sdk/sessions)[Modifying system prompts](/en/api/agent-sdk/modifying-system-prompts)
Assistant
Responses are generated using AI and may contain mistakes.