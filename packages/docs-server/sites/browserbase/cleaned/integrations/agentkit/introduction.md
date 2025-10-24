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
 * [Introduction](/integrations/agentkit/introduction)
 * [Quickstart](/integrations/agentkit/quickstart)
 * [Stagehand Quickstart](/integrations/agentkit/stagehand)
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
AgentKit
Using AgentKit with Browserbase
On this page
 * [Overview](#overview)
 * [There are two approaches to using Browserbase with AgentKit:](#there-are-two-approaches-to-using-browserbase-with-agentkit%3A)
 * [Prerequisites](#prerequisites)
 * [Quickstart Guides](#quickstart-guides)
## 
[​](#overview)
Overview
By the end of this guide, you’ll have an AI agent built with **AgentKit** that can browse the web using **Browserbase**. You’ll learn how to:
 1. **Create AgentKit tools** that leverage Browserbase’s managed headless browsers
 2. **Build autonomous web browsing agents** that can search, extract data, and interact with websites
 3. **Use Stagehand** , Browserbase’s AI-powered browser automation library, to create resilient web agents
This integration is useful for:
 * Building AI agents that can fetch real-time information from the web
 * Creating autonomous browsing capabilities within your agents
 * Developing resilient web scraping and interaction systems
 * Enabling your agents to perform complex web-based tasks
### 
[​](#there-are-two-approaches-to-using-browserbase-with-agentkit%3A)
There are two approaches to using Browserbase with AgentKit:
 1. **Create custom Browserbase tools** : Ideal for simple actions on webpages with manual browser control.
 2. **Use Stagehand library as tools** : Better for autonomous browsing and resilient web scraping.
## 
[​](#prerequisites)
Prerequisites
Before you start, make sure you have:
 * [AgentKit installed](https://docs.agentkit.ai/getting-started)
 * [Browserbase Project ID & API key](https://browserbase.com/settings/)
 * _(Optional)_ LLM API key of your choice to use with [Stagehand](https://www.stagehand.dev/)
Next, let’s dive into **building web browsing agents with AgentKit and Browserbase**.
## 
[​](#quickstart-guides)
Quickstart Guides
## [Autonomous Browsing with Stagehand Leverage Stagehand to build fully autonomous web browsing agents that can navigate, observe, extract data, and interact with websites. ](https://docs.browserbase.com/integrations/agentkit/stagehand)## [Reddit Search Example Explore a complete example of a Reddit search agent built with AgentKit and Browserbase. ](https://docs.browserbase.com/integrations/agentkit/quickstart)
Was this page helpful?
YesNo
[Director](/integrations/1password/director)[Quickstart](/integrations/agentkit/quickstart)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.