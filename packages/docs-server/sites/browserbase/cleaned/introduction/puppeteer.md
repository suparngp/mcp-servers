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
Start your first Session with Puppeteer
On this page
 * [Start building](#start-building)
## [Get started with a Puppeteer Node.js template Clone this GitHub repo to start using Browserbase with Puppeteer. ](https://github.com/browserbase/quickstart-puppeteer-js)
1
Get your API Key
Your API key and Project ID are displayed in the [Overview Dashboard](https://www.browserbase.com/overview):
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/quickstart/api-key.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=b9a4d1261a99b7160d615f1d2ee7a6c9)
Then copy your API Key directly from the input and update your `.env` by adding the `BROWSERBASE_API_KEY` entryAlternatively, you can temporarily set the environment variable for a single bash command by prefixing it with `BROWSERBASE_API_KEY=<your_api_key>` in your terminal.
2
Install dependencies
Node.js
Copy
Ask AI
```
npm i puppeteer-core @browserbasehq/sdk
```
3
Update your code or clone a template
Running your existing code with Browserbase only requires a few line changes:
Node.js
Copy
Ask AI
```
import puppeteer from "puppeteer-core";
import Browserbase from "@browserbasehq/sdk";
const BROWSERBASE_API_KEY = process.env["BROWSERBASE_API_KEY"]!;
const BROWSERBASE_PROJECT_ID = process.env["BROWSERBASE_PROJECT_ID"]!;
const bb = new Browserbase({
 apiKey: BROWSERBASE_API_KEY,
});
(async () => {
 // Create a new session
 const session = await bb.sessions.create({
 projectId: BROWSERBASE_PROJECT_ID,
 });
 // Connect to the session
 const browser = await puppeteer.connect({
 browserWSEndpoint: session.connectUrl
 });
 const pages = await browser.pages();
 const page = pages[0];
 await page.goto("https://news.ycombinator.com");
 await page.close();
 await browser.close();
 console.log(`Session complete! View replay at https://browserbase.com/sessions/${session.id}`);
})().catch((error) => console.error(error.message));
```
Be sure to set your `BROWSERBASE_API_KEY` and `BROWSERBASE_PROJECT_ID` environment variables to the values you copied from the Dashboard.
## [Get started with a Puppeteer Node.js template Clone this GitHub repo to get started with Puppeteer ](https://github.com/browserbase/quickstart-puppeteer-js)
4
Inspect the completed Session
You can find all the recent sessions on the Overview Dashboard, along with essential metrics:
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/quickstart/dashboard.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=2cec5885604d820cc307539e258e6fa6)
Select your Session to inspect it with the [Session Inspector](/features/session-inspector).
## 
[​](#start-building)
Start building
## [Using Browser Sessions Learn how to connect to and interact with browser sessions effectively. ](/fundamentals/using-browser-session)## [Managing Sessions Understand how to properly end sessions and manage their lifecycle. ](/fundamentals/manage-browser-session)
Was this page helpful?
YesNo
[Playwright](/introduction/playwright)[Selenium](/introduction/selenium)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.