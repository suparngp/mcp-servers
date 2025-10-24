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
 * [Introduction](/integrations/mastra/introduction)
 * [Quickstart](/integrations/mastra/quickstart)
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
Mastra
Mastra Integration
On this page
 * [Core Components](#core-components)
 * [Web Agent](#web-agent)
 * [Stagehand Tools](#stagehand-tools)
 * [Session Manager](#session-manager)
 * [Use Cases](#use-cases)
 * [Architecture Flow](#architecture-flow)
 * [Get Started](#get-started)
Mastra is a TypeScript framework for building AI agents, applications, and workflows. It provides a unified interface for integrating various AI models, tools, and data sources into sophisticated automation systems. The Mastra integration with Stagehand enables AI agents to seamlessly interact with web pages through Browserbase’s browser automation platform. This powerful combination allows you to build intelligent agents that can navigate websites, extract data, and perform complex web interactions with natural language instructions. Key capabilities include:
 1. **Natural Language Web Automation** : Direct AI agents to perform web actions using simple instructions like “click the sign in button” or “extract all product prices”
 2. **Intelligent Element Detection** : AI-powered element observation that can identify and locate page elements based on context and purpose
 3. **Structured Data Extraction** : Extract specific information from web pages with custom schemas and validation
 4. **Session Management** : Automatic browser session handling with smart reconnection and timeout management
## 
[​](#core-components)
Core Components
### 
[​](#web-agent)
Web Agent
An AI-powered agent using OpenAI’s GPT-4 that provides a natural language interface to web automation. The agent can understand complex instructions and break them down into appropriate tool calls.
### 
[​](#stagehand-tools)
Stagehand Tools
Three specialized tools that provide comprehensive web automation capabilities:
 * **`stagehandActTool`**: Performs actions on web pages (clicking, typing, navigation)
 * **`stagehandObserveTool`**: Identifies and locates elements on web pages for planning actions
 * **`stagehandExtractTool`**: Extracts structured data from web pages with custom schemas
### 
[​](#session-manager)
Session Manager
Handles browser session initialization, automatic timeouts, error recovery, and reconnection logic to ensure reliable web automation.
## 
[​](#use-cases)
Use Cases
The Mastra + Stagehand integration is perfect for:
 * **Web Scraping** : Extract data from multiple pages with AI-guided navigation
 * **Automated Testing** : Create intelligent test scenarios that adapt to UI changes
 * **Lead Generation** : Gather contact information and company data from websites
 * **Market Research** : Monitor competitor pricing, product listings, and content
 * **Form Automation** : Fill out and submit forms across different websites
 * **Content Management** : Update content across multiple platforms automatically
## 
[​](#architecture-flow)
Architecture Flow
Copy
Ask AI
```
User Query → Mastra Agent → Stagehand Tools → Browser Session → Web Page → Extracted Data → Agent Response
```
The integration leverages Mastra’s agent orchestration with Stagehand’s browser automation to create a seamless web interaction experience powered by AI.
## 
[​](#get-started)
Get Started
## [Quickstart Guide Set up Mastra with Stagehand integration and build your first web automation agent. ](/integrations/mastra/quickstart)
Was this page helpful?
YesNo
[Python](/integrations/langchain/python)[Quickstart](/integrations/mastra/quickstart)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.