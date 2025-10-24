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
 * [Introduction](/integrations/trigger/introduction)
 * [Quickstart](/integrations/trigger/quickstart)
 * Val Town
 * Vercel
 * Support
 * [Dashboard](https://www.browserbase.com/overview)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
Search...
Navigation
Trigger
Introduction
On this page
 * [Overview](#overview)
 * [Why use them together?](#why-use-them-together%3F)
 * [What you can build](#what-you-can-build)
## 
[​](#overview)
Overview
By the end of this guide, your **Trigger.dev** agent will automate a background job that processes data and sends notifications. You’ll learn how to:
 1. **Set up a Trigger.dev workflow** to handle long-running tasks.
 2. Use Trigger.dev to **schedule and monitor** your background jobs.
> Background jobs meet cloud browsers
Trigger.dev is an **open-source background-jobs & AI infrastructure platform**. It lets you write long-running workflows in plain async/await code without worrying about queues, cron schedulers, retries, or observability. Think **BullMQ + Cron + Sentry + Kubernetes** , but rolled into one developer-first package and available as a hosted SaaS or self-hosted. Browserbase, on the other hand, gives you **disposable, headless Chrome instances over WebSockets** —perfect for scraping, screenshotting and PDF generation. When you combine the two you unlock **server-side browser automation that never times out** :
 * Spin up an isolated browser in Browserbase
 * Drive it with Puppeteer/Playwright from a Trigger task
 * Stream logs & status back to your UI in real-time via Trigger Realtime
 * Scale to thousands of concurrent browsers with zero infra work
## 
[​](#why-use-them-together%3F)
Why use them together?
Challenge | How the integration helps 
---|--- 
Functions on Vercel/Netlify time-out after 10–30 s | Trigger tasks have **no timeouts** , so long scrapes finish happily 
Queuing, retries, rate limits | Built-in `retry`, `concurrency`, and cron features 
Running Chrome on serverless | Browserbase hosts Chrome—no Lambda layers, no xvfb 
Observability | Every scrape is a **run** in Trigger with logs & replay 
## 
[​](#what-you-can-build)
What you can build
 * **PDF → PNG pipelines** (MuPDF via `aptGet` extension)
 * **High-volume scraping** with rotating proxies
 * **Automated report generation** (React-to-PDF, screenshots)
 * **AI agents** that browse sites, summarise content and send email
Looking for a concrete example? Jump to the Quickstart or browse the code here: [Repo](https://github.com/browserbase/integrations/tree/master/examples/integrations/trigger)
* * *
## [Follow the Guide Follow the quickstart guide to automate a background job. ](/integrations/trigger/quickstart)
Was this page helpful?
YesNo
[Quickstart](/integrations/temporal/quickstart)[Quickstart](/integrations/trigger/quickstart)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.