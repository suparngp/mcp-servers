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
 * [Introduction](/integrations/agno/introduction)
 * [Quickstart](/integrations/agno/quickstart)
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
Agno
Agno Integration
On this page
 * [Key Use Cases](#key-use-cases)
 * [How It Works](#how-it-works)
 * [Key Concepts](#key-concepts)
 * [Sessions](#sessions)
 * [Connect URLs](#connect-urls)
 * [Core Functions](#core-functions)
 * [Technical Capabilities](#technical-capabilities)
 * [Best Practices](#best-practices)
 * [Common Integration Patterns](#common-integration-patterns)
 * [Agent-Based Architecture](#agent-based-architecture)
 * [Workflow Automation](#workflow-automation)
BrowserbaseTools from Agno enable an Agent to automate browser interactions using Browserbase, a headless browser service.
## 
[​](#key-use-cases)
Key Use Cases
 * **E-commerce** : Product prices, inventory, reviews
 * **Social Media** : Brand monitoring, engagement metrics
 * **News & Content**: Article aggregation, trend monitoring
 * **Financial Data** : Stock prices, market analysis
 * **Research** : Academic papers, government records
## 
[​](#how-it-works)
How It Works
Copy
Ask AI
```
Your App → Browserbase API → Cloud Browser → Target Website → Data Back
```
**BrowserbaseTools** provides:
 * Simple function calls for complex browser operations
 * Automatic session management
 * Intelligent error handling and retries
 * Both sync and async operations
## 
[​](#key-concepts)
Key Concepts
### 
[​](#sessions)
Sessions
A browser instance with its own state (cookies, history, storage)
### 
[​](#connect-urls)
Connect URLs
Resume existing sessions or debug live browser instances
### 
[​](#core-functions)
Core Functions
 * `navigate_to`: Go to any URL
 * `get_page_content`: Extract HTML content
 * `screenshot`: Capture page visuals
 * `close_session`: End browser session
## 
[​](#technical-capabilities)
Technical Capabilities
**JavaScript Execution** : Handle SPAs, AJAX, dynamic content 
**Visual Analysis** : Screenshots, layout detection, visual regression 
**Advanced Interactions** : Mouse, keyboard, forms, multi-step workflows 
**Smart Operations** : Wait for content, handle pagination, retry logic
## 
[​](#best-practices)
Best Practices
**Performance** : Disable images when unneeded, use parallel sessions 
**Ethics** : Respect robots.txt, implement rate limiting 
**Error Handling** : Retry logic, session recovery, comprehensive logging 
**Security** : Secure API keys, validate data, use HTTPS
## 
[​](#common-integration-patterns)
Common Integration Patterns
### 
[​](#agent-based-architecture)
Agent-Based Architecture
BrowserbaseTools + AI agents enable:
 * Natural language scraping commands
 * Intelligent adaptation to page changes
 * Automatic error recovery
 * Context-aware data extraction
### 
[​](#workflow-automation)
Workflow Automation
 * **Data Processing** : Direct integration with pandas/NumPy
 * **Storage** : Connect to databases and cloud storage
 * **Notifications** : Email, Slack, webhook alerts
 * **Scheduling** : Automated execution with cron/cloud schedulers
* * *
Was this page helpful?
YesNo
[Stagehand Quickstart](/integrations/agentkit/stagehand)[Quickstart](/integrations/agno/quickstart)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.