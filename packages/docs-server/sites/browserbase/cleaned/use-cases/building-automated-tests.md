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
Automated Tests
On this page
 * [Overview](#overview)
 * [Login Test Example](#login-test-example)
 * [Code Example](#code-example)
 * [Configuration Options](#configuration-options)
 * [Set up a Consistent Environment](#set-up-a-consistent-environment)
 * [Test from Different Locations](#test-from-different-locations)
 * [Complete Configuration Options](#complete-configuration-options)
 * [Best Practices](#best-practices)
 * [Record Sessions](#record-sessions)
 * [Use Metadata to Organize Tests](#use-metadata-to-organize-tests)
 * [Capture Screenshots](#capture-screenshots)
 * [Next Steps](#next-steps)
## 
[​](#overview)
Overview
Browserbase provides a consistent, isolated environment for running automated tests. This ensures:
 * Predictable test execution with fewer flaky tests
 * Built-in recording and debugging features
 * Ability to scale testing across concurrent sessions
 * Adjust browser settings to match your testing needs (viewport, geolocation, etc.)
## 
[​](#login-test-example)
Login Test Example
Let’s create a simple test to validate a login flow using Browserbase with different frameworks. ## [Follow Along: Web Scraping Example Step-by-step code for web scraping ](https://github.com/browserbase/example-web-scraping.git)
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
async function main() {
 dotenv.config();
 // initialize stagehand
 const stagehand = new Stagehand({
 env: "BROWSERBASE",
 });
 await stagehand.init();
 const page = stagehand.page;
 async function automatedLoginTest(inputs: any) {
 // Navigate to the form
 await page.goto("https://www.saucedemo.com/");
 await page.act(`Input Username: ${inputs.username}`);
 await page.act(`Input Password: ${inputs.password}`);
 await page.act("Click Login Button");
 // take a screenshot of the page
 await page.screenshot({ path: "login_screenshot.png" });
 // log the url
 return page.url();
 }
 const response = await automatedLoginTest({
 username: "standard_user",
 password: "secret_sauce",
 });
 console.log(response);
 // close the stagehand session
 await stagehand.close();
}
main().catch(console.error);
```
## 
[​](#configuration-options)
Configuration Options
### 
[​](#set-up-a-consistent-environment)
Set up a Consistent Environment
Test in a predictable environment with the same Chrome version every time.
 * Node.js
 * Python
SDK
Copy
Ask AI
```
// Create a standardized session
const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID,
 // Optional: Configure viewport size (desktop, mobile)
 browserSettings: {
 viewport: {
 width: 1280,
 height: 720
 }
 }
});
```
### 
[​](#test-from-different-locations)
Test from Different Locations
Test how your application behaves from different geographic locations:
 * Node.js
 * Python
SDK
Copy
Ask AI
```
// Create a session with proxy support
const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID,
 proxies: [
 {
 type: "browserbase",
 geolocation: {
 city: "New York",
 state: "NY",
 country: "US"
 }
 }
 ]
});
```
### 
[​](#complete-configuration-options)
Complete Configuration Options
Set the viewport, operating system, and [full list of configuration options](/reference/api/create-a-session) to customize your test environment.
## 
[​](#best-practices)
Best Practices
### 
[​](#record-sessions)
Record Sessions
Every test session is automatically recorded and available in the Browserbase dashboard. With [Session Replay](/features/session-replay), you can watch the exact test execution to debug failures efficiently.
 * Node.js
 * Python
Copy
Ask AI
```
console.log(`View session replay at https://browserbase.com/sessions/${session.id}`); 
```
**No extra setup required** —session recording happens automatically, allowing you to diagnose flaky tests and failures with ease.
### 
[​](#use-metadata-to-organize-tests)
Use Metadata to Organize Tests
Add metadata for easier organization:
 * Node.js
 * Python
SDK
Copy
Ask AI
```
const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID,
 userMetadata: {
 testName: "login_flow",
 suite: "authentication"
 }
});
```
### 
[​](#capture-screenshots)
Capture Screenshots
Capture screenshots at critical points for easier debugging.
 * Node.js
 * Python
Copy
Ask AI
```
// Take a screenshot
await page.screenshot({ path: "login_screenshot.png" });
```
## 
[​](#next-steps)
Next Steps
Now that you understand the basics of automated testing with Browserbase, here are some features to explore next:
## [Session Inspector Learn how to use the Session Inspector to debug test failures ](/features/session-inspector)## [Session Metadata Organize and query your test sessions effectively ](/features/session-metadata)## [Proxies Test your application from different geographic locations ](/features/proxies)## [Screenshot & PDFs Capture visual evidence during test execution ](/features/screenshots)
Was this page helpful?
YesNo
[Web Scraping](/use-cases/scraping-website)[Improving Performance](/guides/speed-optimization)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.