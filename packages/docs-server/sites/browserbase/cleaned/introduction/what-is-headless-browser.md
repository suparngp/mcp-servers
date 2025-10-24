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
What is a headless browser?
On this page
 * [Overview](#overview)
 * [How does it work?](#how-does-it-work%3F)
 * [Why would I use a headless browser?](#why-would-i-use-a-headless-browser%3F)
 * [Browser automation frameworks](#browser-automation-frameworks)
 * [Using headless browsers](#using-headless-browsers)
# 
[​](#overview)
Overview
A headless browser is a web browser controlled by code that uses software like humans do - visiting sites, clicking buttons, and submitting forms, all automatically. It’s functionally identical to the web browser you use on your machine, but can run on a server. It’s “headless” because there’s no graphical user interface (GUI), but it still loads and interacts with pages exactly like a regular web browser does.
## 
[​](#how-does-it-work%3F)
How does it work?
If there’s no GUI, how does code control a headless browser? The answer lies in browser protocols - standardized ways for code to communicate with and control browsers. The most widely used is the Chrome DevTools Protocol (CDP), which provides low-level control over browser operations. These protocols are low-level, meaning they provide a lot of control over the browser, but they are also complex and difficult to work with. It’s like building software using machine code. That’s why developers typically use browser automation frameworks - tools that provide simple, abstracted interfaces for controlling browsers.
## 
[​](#why-would-i-use-a-headless-browser%3F)
Why would I use a headless browser?
The real power of code is that it does work for people. Traditionally, that means connecting many APIs together, processing data, and presenting it in a beautiful interface. Code uses other code to get things done. Over the last decade, software has undergone a massive shift from desktop to web applications. People now complete their work, handle their finances, and run their businesses through web browsers. As more of our daily tasks move online, the desire to automate web-based workflows becomes increasingly crucial. But what if you want to automate something that doesn’t expose an API? What if you need to interact with an application that hasn’t been built to be used by code? Simply fetching HTML data from the website often isn’t enough. Modern websites use JavaScript to load data on the client side and control interactive elements - if you only retrieve the HTML, you miss crucial parts of how the application actually works. Instead, what if you could use software the same way people do? Going to the website, clicking buttons, submitting forms, and performing all the actions a person would do. But instead of being controlled by a human, it’s controlled by code. This is the power of a headless browser.
# 
[​](#browser-automation-frameworks)
Browser automation frameworks
Browser automation frameworks make it easy to write code that controls browsers. They handle the complexity of protocol communication and provide familiar programming interfaces. Here are the most popular options: [Playwright](https://playwright.dev/)
 * Created by Microsoft
 * Modern, promise-based API
 * Originally focused on testing web applications
[Stagehand](https://stagehand.dev/)
 * Created by Browserbase
 * A superset of Playwright, with AI features for self-healing automations
 * Specialized for browser automation
[Puppeteer](https://pptr.dev/)
 * Developed by Google’s Chrome team
 * Deep integration with CDP
 * Excellent for PDF generation and screenshots
[Selenium](https://www.selenium.dev/)
 * Oldest automation framework
 * Uses WebDriver protocol - a legacy protocol for browser automation
 * Large ecosystem of tools and plugins
# 
[​](#using-headless-browsers)
Using headless browsers
Headless browsers unlock new possibilities for developers. By enabling code to interact with any website the same way people do, they allow you to build integrations without being limited by available APIs. Getting started with headless browsers is straightforward. With just a few lines of code, you can automate basic web interactions locally:
Copy
Ask AI
```
const { chromium } = require("playwright");
async function example() {
 const browser = await chromium.launch();
 const page = await browser.newPage();
 await page.goto("https://example.com");
 await page.click("#submit-button");
}
```
However, running headless browsers in production presents significant challenges. You need to:
 * Manage browser instances and resources
 * Handle concurrent sessions
 * Deal with browser crashes and cleanup
 * Scale infrastructure as demand grows
 * Monitor performance and reliability
This is where [Browserbase](https://www.browserbase.com) comes in. It provides a reliable, scalable infrastructure for running headless browsers in production, letting you focus on building your automation logic rather than managing browser infrastructure.
## [What is Browserbase? Learn more about Browserbase. ](/introduction/what-is-browserbase)## [Getting Started This simple, step-by-step tutorial will help you get started with Browserbase. Start your first cloud browser in no time. ](/introduction/getting-started)
Was this page helpful?
YesNo
[What is Browserbase?](/introduction/what-is-browserbase)[Getting started](/introduction/getting-started)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.