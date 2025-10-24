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
 * [Introduction](/integrations/stripe/introduction)
 * [Quickstart](/integrations/stripe/quickstart)
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
Stripe
Introduction
On this page
 * [Overview](#overview)
 * [Prerequisites](#prerequisites)
 * [Quickstart Guides](#quickstart-guides)
## 
[​](#overview)
Overview
By the end of this guide, your **Browserbase** agent will retrieve a virtual card from **Stripe** and make a donation to the Red Cross. You’ll learn how to:
 1. **Generate a virtual credit card** using the Stripe API with spending controls.
 2. Use Browserbase to **make purchases** with the virtual card.
This integration is useful for:
 * Creating a restricted credit card for your AI agent to use for online payments.
 * Retrieving card details from Stripe.
 * Automating the input of card details into a web form.
## 
[​](#prerequisites)
Prerequisites
Before you start, make sure you have:
 * [Stripe API key](https://dashboard.stripe.com/apikeys)
 * Stripe access to [create a virtual card](https://dashboard.stripe.com/issuing/cards)
 * [Browserbase Project ID & API key](https://browserbase.com/settings/)
 * _(Optional)_ LLM API key of your choice to use with [Stagehand](https://www.stagehand.dev/).
Next, let’s dive into **creating a virtual card with the Stripe API**.
## 
[​](#quickstart-guides)
Quickstart Guides
## [Node.js Learn how to create virtual cards, set spending controls, and automate payments using **Stripe, Playwright, and Browserbase** in Node.js. ](https://github.com/browserbase/integrations/tree/master/examples/integrations/stripe/node)## [Python Get started with **Stripe, Playwright, and Browserbase** in Python to generate virtual cards and automate online transactions. ](https://github.com/browserbase/integrations/tree/master/examples/integrations/stripe/python)## [Stagehand Use **Stagehand AI with Playwright** to automate credit card creation, transactions, and online payments with ease. ](https://github.com/browserbase/integrations/tree/master/examples/integrations/stripe/stagehand)
## [Follow the Guide Follow the quickstart guide to create a virtual card and make a purchase. ](/integrations/stripe/quickstart)
Was this page helpful?
YesNo
[Quickstart](/integrations/portia/quickstart)[Quickstart](/integrations/stripe/quickstart)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.