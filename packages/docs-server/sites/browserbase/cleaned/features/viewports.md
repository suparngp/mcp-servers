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
Features
Viewports
On this page
 * [Overview](#overview)
 * [Supported Viewport Sizes](#supported-viewport-sizes)
 * [Desktop Viewports](#desktop-viewports)
 * [Mobile Viewports](#mobile-viewports)
 * [How to Set a Viewport in Your Session](#how-to-set-a-viewport-in-your-session)
## 
[​](#overview)
Overview
A viewport defines the visible area of a web page in a browser window. While setting a custom viewport is optional in Browserbase, it can be helpful for specific use cases — such as visual testing, screenshot generation, or automations that rely on precise layout behavior. By default, Browserbase generates realistic, randomized viewports to enhance stealth and reduce detection. However, if your automation requires a consistent viewport size (e.g., for comparing screenshots across sessions), you can select from a predefined set of supported dimensions.
## 
[​](#supported-viewport-sizes)
Supported Viewport Sizes
When creating a session, you can choose from the following **approved viewport dimensions**. These values are optimized for reliability and stealth, and are the only sizes currently supported.
### 
[​](#desktop-viewports)
Desktop Viewports
Width | Height | Device 
---|---|--- 
1920 | 1080 | Standard Full HD (Desktop) 
1366 | 768 | Widescreen Laptop 
1536 | 864 | High-Resolution Laptop 
1280 | 720 | Small Desktop Monitor 
1024 | 768 | Minimum Supported Desktop Viewport 
### 
[​](#mobile-viewports)
Mobile Viewports
Width | Height | Device 
---|---|--- 
414 | 896 | iPhone XR, iPhone 11 
390 | 844 | iPhone 12, iPhone 13, iPhone 14 
375 | 812 | iPhone X, iPhone XS 
360 | 800 | Standard Android Phone 
320 | 568 | iPhone SE, Small Devices 
**Only the viewports listed above are supported.** Custom dimensions outside these values are **not allowed** to ensure consistent performance, rendering accuracy, and anti-bot stealth effectiveness.
## 
[​](#how-to-set-a-viewport-in-your-session)
How to Set a Viewport in Your Session
Use the `viewport` and `fingerprint.screen` fields when creating a session to specify the desired width and height. Below are examples in both Node.js and Python SDKs.
 * Node.js
 * Python
SDK
Copy
Ask AI
```
import Browserbase from "@browserbasehq/sdk";
const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
async function createBasicStealthSession() {
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 browserSettings: {
 viewport: {
 width: 1920,
 height: 1080
 }
 },
 });
 console.log(`Session URL: https://browserbase.com/sessions/${session.id}`);
 return session;
}
const session = createBasicStealthSession();
```
Deprecation Warning: Fingerprint.screen is no longer supported and will be ignored. Please use viewport instead.
Custom viewports are a powerful feature when precision matters. For most use cases, Browserbase’s default viewport generation provides the best balance of stealth and reliability. Only configure a specific viewport if your use case requires it. For a full list of session options and configuration fields, check out the [API reference for creating a session](/reference/api/create-a-session).
Was this page helpful?
YesNo
[Live View](/features/session-live-view)[Session Replay](/features/session-replay)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.