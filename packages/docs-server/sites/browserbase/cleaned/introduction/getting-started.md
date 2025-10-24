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
On this page
 * [Creating Your Account](#creating-your-account)
 * [Overview Dashboard](#overview-dashboard)
 * [Using the Playground](#using-the-playground)
 * [Session Inspector](#session-inspector)
 * [Sessions List](#sessions-list)
 * [Next Steps](#next-steps)
 * [New to Code? Start with Director](#new-to-code%3F-start-with-director)
In this guide, we’ll cover the basics of using Browserbase. By the end, you’ll run your first browser session and have a basic understanding of how to use Browserbase.
## 
[​](#creating-your-account)
Creating Your Account
First, you need to [sign up for a Browserbase account](https://www.browserbase.com/sign-up). The free plan includes:
 * One browser session running at a time
 * 60 minutes of browser time per month
## 
[​](#overview-dashboard)
Overview Dashboard
The Overview Dashboard is the first page you’ll see when you log in to Browserbase and click into a project. It gives you a quick overview of your browser sessions, usage, and status for that project.
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/getting-started/overview.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=6f92564f152fdbd518557dbb97d66471)
On the [overview page](https://www.browserbase.com/overview), you’ll find:
 * **Your project ID and API key are on the right side**
 * List of currently running and recently completed sessions
 * Historical usage statistics
 * Performance metrics
 * Current system status
## 
[​](#using-the-playground)
Using the Playground
Next, you’ll go to the [Playground](https://www.browserbase.com/playground), which provides a quick way to try Browserbase directly in your browser. It’s a great way to get started and see how Browserbase works.
 1. Navigate to the [Playground](https://www.browserbase.com/playground)
 2. Command + Click on one of the templates in the code editor
 3. Click the “Run” button to start a browser session, this will start a new browser session and run the code in the editor.
 4. Watch the session via the [Live View](/features/session-live-view) on the right and interact with the browser.
 5. Once the session is complete, click the “Stop” button to shut down the browser.
After completing a session in the Playground, click the “View Session” button to open the Session Inspector.
## 
[​](#session-inspector)
Session Inspector
You can use the [Session Inspector](/features/session-inspector) to watch sessions in real-time, view replays, or inspect the session logs.
## 
[​](#sessions-list)
Sessions List
You can always find a list of your sessions in the [Sessions](https://www.browserbase.com/sessions) tab. From there, you can access the Session Inspector for any session.
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/getting-started/sessions.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=362acb60de4202fb96e0d47414d30448)
If you know your session ID, you can also access the Session Inspector by navigating to `https://www.browserbase.com/sessions/[session-id]`.
## 
[​](#next-steps)
Next Steps
Running your first session in the Playground is a great way to get started. However, you’ll likely want to integrate Browserbase into your own codebase. The first step is to select a browser automation framework you’ll want to use to control the browser. Browserbase supports all popular frameworks. As well as many [integrations](/integrations) with popular tools. Choose the framework that best matches your needs and follow the framework-specific quick start guide to get a Browserbase project setup in your local development environment.
If you’re not sure which framework to use, [Stagehand](/introduction/stagehand) is recommended as it’s built and maintained by the Browserbase team.
## [Stagehand **Recommended for AI-Native Workflows**
 * Javascript and Python support
 * Self-healing page automations
 * LLM-powered browser control
 * AI-first architecture
](/introduction/stagehand)## [Playwright **Recommended for Traditional Automation**
 * Javascript, Python, Java, and C# support
 * Static workflow definitions
 * Robust testing capabilities
 * Extensive API support
](/introduction/playwright)## [Puppeteer **Recommended for Puppeteer Users**
 * Javascript support
 * Static workflow definitions
 * Robust testing capabilities
 * Extensive API support
](/introduction/puppeteer)## [Selenium **Recommended for Selenium Users**
 * JS, Python, Java, C#, and Ruby support
 * Static workflow definitions
 * Robust testing capabilities
 * Extensive API support
](/introduction/selenium)
## 
[​](#new-to-code%3F-start-with-director)
New to Code? Start with Director
## [Writing browser automation scripts can be tricky if you're just starting out. That's why we built Director. 
Director is the application to turn ideas into workflows. It allows you to use plain English to describe a task you want to automate. It performs the task for you and generates the corresponding code, giving you a ready-to-use script without having to write all the code from scratch. 
If you have minimal coding experience or simply want to create a working script as quickly as possible, we recommend starting with [Director](https://director.ai/). ](https://director.ai/)
Was this page helpful?
YesNo
[What is a headless browser?](/introduction/what-is-headless-browser)[Stagehand](/introduction/stagehand)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.