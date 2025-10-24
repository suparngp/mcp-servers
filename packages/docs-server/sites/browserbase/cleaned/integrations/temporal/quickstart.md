[Skip to main content](#content-area)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
 * [Documentation](/introduction/what-is-browserbase)
 * [APIs and SDKs](/reference/introduction)
 * [Changelog](https://www.browserbase.com/changelog)
##### Introduction
 * [What is Browserbase?](/introduction/what-is-browserbase)
 * [What is a headless browser?](/introduction/what-is-headless-browser)
 * [Getting started](/introduction/getting-started)
 * [Stagehand](/introduction/stagehand)
 * [Playwright](/introduction/playwright)
 * [Puppeteer](/introduction/puppeteer)
 * [Selenium](/introduction/selenium)
##### Fundamentals
 * [Create a Browser Session](/fundamentals/create-browser-session)
 * [Using a Browser Session](/fundamentals/using-browser-session)
 * [Manage a Browser Session](/fundamentals/manage-browser-session)
##### Features
 * [Stealth Mode](/features/stealth-mode)
 * [Proxies](/features/proxies)
 * [Live View](/features/session-live-view)
 * [Viewports](/features/viewports)
 * [Session Replay](/features/session-replay)
 * [Session Inspector](/features/session-inspector)
 * [Downloads](/features/downloads)
 * [Uploads](/features/uploads)
 * [Screenshots & PDFs](/features/screenshots)
 * [Contexts](/features/contexts)
 * [Browser Extensions](/features/browser-extensions)
 * [Metadata](/features/session-metadata)
##### Use Cases
 * [Form Submissions](/use-cases/automating-form-submissions)
 * [Web Scraping](/use-cases/scraping-website)
 * [Automated Tests](/use-cases/building-automated-tests)
##### Guides
 * [Improving Performance](/guides/speed-optimization)
 * [Optimizing Cost](/guides/cost-optimization)
 * [Long Running Sessions](/guides/long-running-sessions)
 * [Browser Regions](/guides/multi-region)
 * [Measuring Usage](/guides/measuring-usage)
 * [Using Session Metadata](/guides/using-session-metadata)
 * [Plans and Pricing](/guides/plans-and-pricing)
 * [Concurrency & Rate Limits](/guides/concurrency-rate-limits)
 * [Handling Authentication](/guides/authentication)
 * [Single Sign-On (SSO)](/guides/sso-setup)
 * [Enterprise Security](/guides/security)
 * [Manage Account](/guides/manage-account)
 * [Allowlisted VPN Routing](/guides/vpn)
##### Integrations
 * [Get Started with Integrations](/integrations/get-started)
 * 1Password
 * AgentKit
 * Agno
 * Braintrust
 * Browser Use
 * CrewAI
 * Langchain
 * Mastra
 * MCP Server
 * MongoDB
 * OpenAI CUA
 * Portia AI
 * Stripe
 * Temporal
 * [Introduction](/integrations/temporal/introduction)
 * [Quickstart](/integrations/temporal/quickstart)
 * Trigger
 * Val Town
 * Vercel
 * Support
 * [Dashboard](https://www.browserbase.com/overview)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
Search...
Navigation
Temporal
Quickstart
On this page
 * [Before You Start](#before-you-start)
 * [Step 1: Project Setup](#step-1%3A-project-setup)
 * [Clone and Install](#clone-and-install)
 * [Step 2: Configuration](#step-2%3A-configuration)
 * [Environment Variables](#environment-variables)
 * [Step 3: Start Temporal Server](#step-3%3A-start-temporal-server)
 * [Launch Development Server](#launch-development-server)
 * [Step 4: Run Your First Workflow](#step-4%3A-run-your-first-workflow)
 * [Start the Worker Process](#start-the-worker-process)
 * [Execute a Search Workflow](#execute-a-search-workflow)
 * [Monitoring and Debugging](#monitoring-and-debugging)
 * [Using Temporal Web UI](#using-temporal-web-ui)
 * [Testing Resilience](#testing-resilience)
 * [Troubleshooting Guide](#troubleshooting-guide)
 * [What’s Next?](#what%E2%80%99s-next%3F)
## What You'll Build
A production-ready browser automation system that can handle failures gracefully using Temporal’s workflow orchestration and Browserbase’s cloud browsers.
## 
[​](#before-you-start)
Before You Start
Ensure you have these requirements ready:
## [Node.js 18+ Required runtime environment ](https://nodejs.org/)## [Temporal CLI Install: `brew install temporal` ](https://docs.temporal.io/cli)## [API Access Browserbase API key and project ID ](https://www.browserbase.com/overview)
**Required** : The Temporal CLI must be installed and available in your PATH before proceeding.
## 
[​](#step-1%3A-project-setup)
Step 1: Project Setup
### 
[​](#clone-and-install)
Clone and Install
Copy
Ask AI
```
# Clone the integration template
npx degit browserbase/integrations/examples/integrations/temporal browserbase-temporal
cd browserbase-temporal
# Install all dependencies
npm install
# Install browser binaries
npx playwright install
```
What gets installed?
**Core Temporal packages:**
 * `@temporalio/worker` - Workflow execution engine
 * `@temporalio/workflow` - Workflow definitions
 * `@temporalio/activity` - Activity implementations
**Browser automation:**
 * `@browserbasehq/stagehand` - AI-powered browser control
 * `playwright` - Browser automation engine
**AI integration:**
 * `@anthropic-ai/sdk` - Claude API client
 * `zod` - Schema validation
## 
[​](#step-2%3A-configuration)
Step 2: Configuration
### 
[​](#environment-variables)
Environment Variables
Create your `.env` file with the required API keys:
Copy
Ask AI
```
# Browserbase Configuration (Required)
BROWSERBASE_API_KEY=your_browserbase_api_key_here
BROWSERBASE_PROJECT_ID=your_browserbase_project_id_here
# AI Provider (Required)
OPENAI_API_KEY=your_openai_api_key_here
# Temporal Configuration (Optional)
TEMPORAL_ADDRESS=localhost:7233
TEMPORAL_NAMESPACE=default
# Worker Configuration (Optional)
MAX_CONCURRENT_ACTIVITIES=2
TASK_QUEUE=browser-automation
```
## 
[​](#step-3%3A-start-temporal-server)
Step 3: Start Temporal Server
### 
[​](#launch-development-server)
Launch Development Server
Copy
Ask AI
```
temporal server start-dev
```
**Keep this terminal open** - The Temporal server must run continuously during development.
## 
[​](#step-4%3A-run-your-first-workflow)
Step 4: Run Your First Workflow
### 
[​](#start-the-worker-process)
Start the Worker Process
In a **new terminal** (keep Temporal server running):
Copy
Ask AI
```
npm run worker
```
**Expected output:**
Copy
Ask AI
```
Polling for tasks on queue: browser-automation
Worker ready with activities: initializeBrowser, navigateToSearchPage, executeSearch, extractSearchResults, cleanupBrowser, formatResults
```
### 
[​](#execute-a-search-workflow)
Execute a Search Workflow
In a **third terminal** , run the demo:
Copy
Ask AI
```
# Basic search
npm run demo
# Custom search query
npm run demo "Temporal workflow patterns"
```
**What happens:**
 1. Creates a new workflow execution
 2. Provides monitoring URL for real-time tracking
 3. Executes browser automation with automatic retries
 4. Returns structured search results
## 
[​](#monitoring-and-debugging)
Monitoring and Debugging
### 
[​](#using-temporal-web-ui)
Using Temporal Web UI
1
Access Workflow Details
Click the monitoring URL provided when starting a workflow:
Copy
Ask AI
```
http://localhost:8233/namespaces/default/workflows/resilience-test-1640995200000
```
2
Inspect Execution Timeline
The Web UI shows:
 * **Visual timeline** of activity execution
 * **Event history** with detailed logs
 * **Input/output data** for each activity
 * **Retry attempts** and failure reasons
### 
[​](#testing-resilience)
Testing Resilience
The integration includes built-in failure simulation for testing:
Network Failure Simulation
Testing Multiple Scenarios
Copy
Ask AI
```
// Each activity has 15% chance of network failure
function simulateNetworkDisconnect(stage: string): void {
 if (Math.random() < 0.15) {
 const failures = [
 'ECONNRESET: Connection reset by peer',
 'ETIMEDOUT: Connection timed out', 
 'ENOTFOUND: DNS lookup failed',
 'ECONNREFUSED: Connection refused'
 ];
 throw new Error(`Network failure during ${stage}: ${failures[Math.floor(Math.random() * failures.length)]}`);
 }
}
```
## 
[​](#troubleshooting-guide)
Troubleshooting Guide
Temporal Server Connection Failed
**Error** : `Error: 14 UNAVAILABLE: failed to connect to all addresses`**Root Cause** : Temporal server not running or port conflicts**Solutions** :
 1. Start Temporal server: `temporal server start-dev`
 2. Check port 7233 is available: `lsof -i :7233`
 3. Kill conflicting processes if needed
 4. Restart the server completely
Worker Failed to Start
**Error** : `Worker failed to start` or connection timeouts**Root Cause** : Worker cannot connect to Temporal server**Solutions** :
 1. Ensure Temporal server started successfully first
 2. Verify task queue name: `browser-automation`
 3. Check network connectivity to localhost:7233
 4. Restart worker after server is stable
Browser Session Creation Failed
**Error** : `Failed to initialize browser` or Browserbase errors**Root Cause** : Invalid API credentials or quota limits**Solutions** :
 1. Verify API key and project ID in `.env`
 2. Check Browserbase account credits/quota
 3. Test API credentials with `curl` request
 4. Try a different Browserbase project
AI Extraction Returns Null
**Error** : `Extraction returned null values` or validation failures**Root Cause** : AI API issues or rate limiting**Solutions** :
 1. Verify Anthropic API key validity
 2. Check API rate limits and credits
 3. Simplify extraction instructions
 4. Consider switching to OpenAI as fallback
Workflow Appears Stuck
**Error** : Workflows hang or don’t progress**Root Cause** : Worker issues or activity timeouts**Solutions** :
 1. Check worker is processing tasks (`npm run worker`)
 2. Inspect workflow state in Web UI
 3. Look for timeout errors in activity logs
 4. Increase timeout values if needed
 5. Restart worker if necessary
## 
[​](#what%E2%80%99s-next%3F)
What’s Next?
Now that you have a working Temporal + Browserbase integration:
## [Build Custom Workflows Create your own workflows for specific automation tasks ](https://docs.temporal.io/docs/workflows)## [Production Deployment Deploy to Temporal Cloud for production workloads ](https://docs.temporal.io/docs/production-deployment)## [Advanced Patterns Explore child workflows, signals, and queries ](https://docs.temporal.io/child-workflows)## [Monitoring & Alerting Set up production monitoring and alerting ](https://docs.temporal.io/cloud/high-availability/monitor#observe)
* * *
**Need help?** Join the [Temporal Community](https://temporal.io/community) and [Stagehand Slack](https://stagehand.dev/slack) for support and discussions.
Was this page helpful?
YesNo
[Introduction](/integrations/temporal/introduction)[Introduction](/integrations/trigger/introduction)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.