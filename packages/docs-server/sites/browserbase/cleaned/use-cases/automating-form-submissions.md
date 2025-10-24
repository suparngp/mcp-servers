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
Automating Form Submissions
On this page
 * [Overview](#overview)
 * [Implementation](#implementation)
 * [Google Form Submission](#google-form-submission)
 * [Code Example](#code-example)
 * [Best Practices](#best-practices)
 * [Add wait time between interactions](#add-wait-time-between-interactions)
 * [Implement Error Handling](#implement-error-handling)
 * [Verify Submissions](#verify-submissions)
 * [Next Steps](#next-steps)
## 
[​](#overview)
Overview
Automate form submissions to handle repetitive tasks like logins, registrations, and checkouts with greater speed and accuracy. Browserbase lets you interact with forms across websites while maintaining proper authentication. **Common Use Cases**
 * Login automation
 * Registration forms
 * Data Entry
 * Survey and application submissions
 * Order placement and checkout processes
## 
[​](#implementation)
Implementation
1
Create a session
Create a Browserbase session and [authenticate](/guides/authentication) if needed. Use [browser contexts](/features/contexts) to persist authentication across pages.
2
Navigate to the form
Go to the target page and wait for form elements to fully load before interacting with them.
3
Fill form fields
Identify and populate form elements (text inputs, dropdowns, radio buttons, checkboxes) with your data.
4
Submit and verify
Trigger the submit button and check for success messages or validation errors.
## 
[​](#google-form-submission)
Google Form Submission
To demonstrate how to automate form submissions using Browserbase, you can use a sample Google Form designed specifically for this tutorial: [Google Form](https://forms.gle/f4yNQqZKBFCbCr6j7) This form collects responses in various formats:
 * Text input
 * Radio button
 * Checkboxes
## [Follow Along: Form Fill Example Step-by-step code for automating form completion workflows ](https://github.com/browserbase/example-form-fill)
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
async function main() {
 const stagehand = new Stagehand({
 env: "BROWSERBASE",
 verbose: 0,
 });
 await stagehand.init();
 const page = stagehand.page;
 async function fillForm(inputs: any) {
 // Navigate to the form
 await page.goto("https://forms.gle/f4yNQqZKBFCbCr6j7");
 // You can use the observe method to find the selector with an act command to fill it in
 const superpowerSelector = await page.observe({
 instruction: `Find the superpower field: ${inputs.superpower}`,
 returnAction: true
 });
 console.log(superpowerSelector);
 await page.act(superpowerSelector[0]);
 // You can also explicitly specify the action to take
 await page.act({action: "Select the features used: " + inputs.features_used.join(", ")});
 await page.act({action: "Fill in the coolest_build field with the following value: " + inputs.coolest_build});
 await page.act({action: "Click the submit button"});
 await page.waitForTimeout(5000);
 // Extract to log the status of the form
 const status = await page.extract({instruction: "Extract the status of the form", schema: z.object({status: z.string()})});
 console.log(status);
 await stagehand.close();
 }
 const inputs = {
 "superpower": "Invisibility",
 "features_used": [
 "Stealth Mode",
 "Proxies",
 "Session Replay"
 ],
 "coolest_build": "A bot that automates form submissions across multiple sites.",
 }
 await fillForm(inputs);
}
main().catch(console.error);
```
This example form is for testing purposes - feel free to submit responses multiple times while experimenting.
## 
[​](#best-practices)
Best Practices
### 
[​](#add-wait-time-between-interactions)
Add wait time between interactions
Adding adequate waits between form interactions ensures the form has time to load and the elements are ready for interaction. This is especially important for forms that have a lot of content or require additional resources to load.
 * Node.js
 * Python
Copy
Ask AI
```
await page.waitForTimeout(1000);
```
### 
[​](#implement-error-handling)
Implement Error Handling
Implement error handling for missing elements or validation failures
 * Node.js
 * Python
Copy
Ask AI
```
try {
 await page.waitForTimeout(1000);
} catch (error) {
 console.error("Error waiting for timeout:", error);
}
```
### 
[​](#verify-submissions)
Verify Submissions
Verify submissions with confirmation messages or URL changes
 * Node.js
 * Python
Copy
Ask AI
```
await page.waitForSelector("text=Your response has been recorded.")
```
## 
[​](#next-steps)
Next Steps
Now that you understand how to automate form submissions using Browserbase, you can try it out for yourself.
## [Session Live View Learn how to watch test sessions in real time ](/features/session-live-view)## [Uploads Learn how to upload files with Browserbase ](/features/uploads)
Was this page helpful?
YesNo
[Metadata](/features/session-metadata)[Web Scraping](/use-cases/scraping-website)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.