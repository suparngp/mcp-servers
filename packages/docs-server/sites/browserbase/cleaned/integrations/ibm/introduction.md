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
Introduction
On this page
 * [Overview](#overview)
 * [Prerequisites](#prerequisites)
 * [Why Screenshots?](#why-screenshots%3F)
 * [Quickstart Guides](#quickstart-guides)
## 
[​](#overview)
Overview
By the end of this guide, you will be able to capture screenshots of current mortgage rates and analyze them using vision capabilities. You’ll learn how to:
 1. Capture real-time mortgage data using Browserbase’s headless browser automation.
 2. Analyze visual data with IBM [watsonx.ai](http://watsonx.ai)’s available vision language models to extract meaningful information.
This integration is useful for:
 * Accessing otherwise inaccessible data. Data can often be embedded within iframes, making it difficult to scrape with traditional methods
 * Automating financial data collection from websites without structured APIs.
 * Converting visual mortgage rate data into structured information.
 * Building financial monitoring tools that track rate changes over time.
## 
[​](#prerequisites)
Prerequisites
Before you start, make sure you have:
 * [IBM Watson Project ID & API key](https://cloud.ibm.com/catalog/services/watson-studio)
 * Access to IBM’s foundation models including vision capabilities
 * [Browserbase Project ID & API key](https://browserbase.com/settings/)
 * Python environment with required dependencies
**Note:** This guide is only available in Python
## 
[​](#why-screenshots%3F)
Why Screenshots?
Traditional web scraping methods often fail when dealing with:
 * Content embedded within iframes (like the Freddie Mac mortgage rates)
 * Data rendered by JavaScript after page load
 * Complex interactive visualizations
 * Protected or anti-scraping content
By using Browserbase to capture full screenshots of rendered pages and IBM [watsonx.ai](http://watsonx.ai) to interpret the visual content, you can extract information that would be otherwise inaccessible through HTML parsing or API calls.
## 
[​](#quickstart-guides)
Quickstart Guides
## [Follow the Guide Follow the **quickstart guide** to capture mortgage rates and analyze them with IBM Watson’s visual language models. ](/integrations/ibm/quickstart)## [Enterprise Explore enterprise solutions for large-scale financial data monitoring with **Browserbase and IBM Watson**. ](https://browserbase.com/contact)
Was this page helpful?
YesNo
⌘I
Assistant
Responses are generated using AI and may contain mistakes.