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
Use Cases
Web Scraping
On this page
 * [Overview](#overview)
 * [Scraping a website](#scraping-a-website)
 * [Code Example](#code-example)
 * [Example output](#example-output)
 * [Best Practices for Web Scraping](#best-practices-for-web-scraping)
 * [Ethical Scraping](#ethical-scraping)
 * [Performance Optimization](#performance-optimization)
 * [Stealth and Anti-Bot Avoidance](#stealth-and-anti-bot-avoidance)
 * [Next Steps](#next-steps)
## 
[​](#overview)
Overview
Web scraping lets you extract structured data from websites. Browserbase provides a reliable browser infrastructure that helps you build scrapers that can:
 * Scale without infrastructure management
 * Maintain consistent performance
 * Avoid bot detection and CAPTCHAs with Browserbase’s [stealth mode](/features/stealth-mode)
 * Provide debugging and monitoring tools with [session replays](/features/session-replay) and [live views](/features/session-live-view)
This guide will help you get started with web scraping on Browserbase and highlight best practices.
## 
[​](#scraping-a-website)
Scraping a website
Using a sample website, we’ll scrape the title, price, and some other details of books from the website. ## [Follow Along: Web Scraping Example Step-by-step code for web scraping ](https://github.com/browserbase/example-web-scraping.git)
### 
[​](#code-example)
Code Example
 * Node.js
 * Python
Stagehand
Playwright
Copy
Ask AI
```
import { Stagehand } from "@browserbasehq/stagehand";
import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();
const stagehand = new Stagehand({
 env: "BROWSERBASE",
 verbose: 0,
});
async function scrapeBooks() {
 await stagehand.init();
 const page = stagehand.page;
 await page.goto("https://books.toscrape.com/");
 const scrape = await page.extract({
 instruction: "Extract the books from the page",
 schema: z.object({
 books: z.array(z.object({
 title: z.string(),
 price: z.string(),
 image: z.string(),
 inStock: z.string(),
 link: z.string(),
 }))
 }),
 });
 console.log(scrape.books);
 await stagehand.close();
 return books;
}
const books = scrapeBooks().catch(console.error);
```
### 
[​](#example-output)
Example output
Copy
Ask AI
```
[
 {
 title: 'A Light in the Attic',
 price: '£51.77',
 image: 'https://books.toscrape.com/media/cache/2c/da/2cdad67c44b002e7ead0cc35693c0e8b.jpg',
 inStock: 'In stock',
 link: 'catalogue/a-light-in-the-attic_1000/index.html'
 },
 ...
]
```
## 
[​](#best-practices-for-web-scraping)
Best Practices for Web Scraping
Follow these best practices to build reliable, efficient, and ethical web scrapers with Browserbase.
### 
[​](#ethical-scraping)
Ethical Scraping
 * **Respect robots.txt** : Check the website’s robots.txt file for crawling guidelines
 * **Rate limiting** : Implement reasonable delays between requests (2-5 seconds)
 * **Terms of Service** : Review the website’s terms of service before scraping
 * **Data usage** : Only collect and use data in accordance with the website’s policies
### 
[​](#performance-optimization)
Performance Optimization
 * **Batch processing** : Process multiple pages in batches with [concurrent sessions](/guides/concurrency-rate-limits)
 * **Selective scraping** : Only extract the data you need
 * **Resource management** : Close browser sessions promptly after use
 * **Connection reuse** : [Reuse browsers](/guides/long-running-sessions#using-keep-alive) for sequential scraping tasks
### 
[​](#stealth-and-anti-bot-avoidance)
Stealth and Anti-Bot Avoidance
 * **Enable Browserbase Advanced Stealth mode** : Helps avoid bot detection
 * **Randomize behavior** : Add variable delays between actions
 * **Use proxies** : Rotate IPs to distribute requests
 * **Mimic human interaction** : Add realistic mouse movements and delays
 * **Handle CAPTCHAs** : Enable Browserbase’s automatic CAPTCHA solving
## 
[​](#next-steps)
Next Steps
Now that you understand the basics of web scraping with Browserbase, here are some features to explore next:
## [Stealth Mode Configure fingerprinting and CAPTCHA solving ](/features/stealth-mode)## [Browser Contexts Persist cookies and session data ](/features/contexts)## [Proxies Configure IP rotation and geolocation ](/features/proxies)
Was this page helpful?
YesNo
[Form Submissions](/use-cases/automating-form-submissions)[Automated Tests](/use-cases/building-automated-tests)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.