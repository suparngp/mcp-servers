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
Screenshots and PDFs
On this page
 * [Screenshots](#screenshots)
 * [Save a screenshot locally](#save-a-screenshot-locally)
 * [Why use CDP for screenshots?](#why-use-cdp-for-screenshots%3F)
 * [PDFs](#pdfs)
 * [Generate a PDF locally](#generate-a-pdf-locally)
 * [Download a PDF from a URL](#download-a-pdf-from-a-url)
 * [View a PDF in browser](#view-a-pdf-in-browser)
## 
[​](#screenshots)
Screenshots
Browserbase enables screen view and full-screen screenshots using your desired browser automation framework. For optimal performance, we recommend using CDP (Chrome DevTools Protocol) sessions to capture screenshots, as this method is significantly faster than standard approaches.
### 
[​](#save-a-screenshot-locally)
Save a screenshot locally
First, [create a browser session](/fundamentals/create-browser-session) and [connect to it](/fundamentals/using-browser-session) using your preferred framework. Then you can take a screenshot using CDP sessions for the best performance:
 * Node.js
 * Python
Playwright
Puppeteer
Copy
Ask AI
```
import { writeFileSync } from "fs";
import { chromium } from "playwright-core";
import { Browserbase } from "@browserbasehq/sdk";
(async () => {
 console.log("Starting remote browser...");
 const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY });
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID,
 });
 const browser = await chromium.connectOverCDP(session.connectUrl);
 const defaultContext = browser.contexts()[0];
 const page = defaultContext.pages()[0];
 await page.goto("https://news.ycombinator.com");
 console.log("Taking a screenshot using CDP...");
 // Create a CDP session for faster screenshots
 const client = await defaultContext.newCDPSession(page);
 // Capture the screenshot using CDP
 const { data } = await client.send("Page.captureScreenshot", {
 format: "jpeg",
 quality: 80,
 fullpage: true,
 });
 // Convert base64 to buffer and save
 const buffer = Buffer.from(data, "base64");
 writeFileSync("screenshot.jpeg", buffer);
 console.log("Shutting down...");
 await page.close();
 await browser.close();
})().catch((error) => {
 console.error(error);
});
```
### 
[​](#why-use-cdp-for-screenshots%3F)
Why use CDP for screenshots?
Using CDP (Chrome DevTools Protocol) for taking screenshots offers several advantages:
 1. **Performance** : CDP screenshots are significantly faster than traditional methods
 2. **Memory Efficiency** : Uses less memory as it directly communicates with the browser’s debugging protocol
 3. **Quality Control** : Provides more control over image quality and format settings
 4. **Reliability** : More stable for full-page screenshots of complex web applications
For most use cases, we recommend using the CDP approach shown above rather than the standard screenshot methods.
## 
[​](#pdfs)
PDFs
You can work with PDFs in a few ways:
 1. **Generate PDFs** : Create PDFs from web pages using Playwright’s `page.pdf()` method ([shown below](/features/screenshots#generate-a-pdf-locally))
 2. **Download PDFs** : When a URL of a PDF is opened in the browser, the browser’s default behavior is to automatically download and store the PDF file in Browserbase’s cloud storage. See the [Downloads documentation](/features/downloads) for information on how to retrieve downloaded PDFs.
 3. **View PDFs in browser** : If you’d like to view a PDF directly in the browser tab rather than download the PDF automatically, you can do so by turning on the `enablePdfViewer` property in your browser settings ([shown below](/features/screenshots#view-a-pdf-in-browser)).
### 
[​](#generate-a-pdf-locally)
Generate a PDF locally
After [creating and connecting to a session](/fundamentals/using-browser-session), here’s how to generate a PDF from a web page using Playwright:
 * Node.js
Playwright
Copy
Ask AI
```
import { chromium } from "playwright-core";
import { Browserbase } from "@browserbasehq/sdk";
(async () => {
 console.log("Starting remote browser...");
 const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY });
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID,
 });
 const browser = await chromium.connectOverCDP(session.connectUrl);
 const defaultContext = browser.contexts()[0];
 const page = defaultContext.pages()[0];
 await page.goto("https://news.ycombinator.com");
 console.log("Generating PDF...");
 await page.pdf({
 path: "webpage.pdf",
 format: "A4",
 });
 console.log("Shutting down...");
 await page.close();
 await browser.close();
})().catch((error) => {
 console.error(error);
});
```
### 
[​](#download-a-pdf-from-a-url)
Download a PDF from a URL
When you navigate to a PDF URL, Browserbase automatically downloads the PDF file and cancels the navigation. The downloaded PDF is stored in Browserbase’s cloud storage for later retrieval.
 * Node.js
 * Python
Playwright
Puppeteer
Copy
Ask AI
```
import { chromium } from "playwright-core";
import { Browserbase } from "@browserbasehq/sdk";
(async () => {
 console.log("Starting remote browser...");
 const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY });
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID,
 });
 const browser = await chromium.connectOverCDP(session.connectUrl);
 const defaultContext = browser.contexts()[0];
 const page = defaultContext.pages()[0];
 // Configure download behavior
 const client = await defaultContext.newCDPSession(page);
 await client.send("Browser.setDownloadBehavior", {
 behavior: "allow",
 downloadPath: "downloads",
 eventsEnabled: true,
 });
 // Navigate to PDF and trigger download
 console.log("Attempting to download PDF...");
 const [download] = await Promise.all([
 page.waitForEvent("download"),
 page.goto("https://constitutioncenter.org/media/files/constitution.pdf").catch(() => {
 console.log("Navigation cancelled due to download (expected behavior)");
 })
 ]);
 let downloadError = await download.failure();
 if (downloadError !== null) {
 console.log("Error happened on download:", downloadError);
 throw new Error(downloadError);
 }
 console.log("PDF download completed successfully");
 console.log("Shutting down...");
 await page.close();
 await browser.close();
})().catch((error) => {
 console.error(error);
});
```
After the PDF is downloaded, you can retrieve it from Browserbase’s cloud storage. See the [Downloads documentation](/features/downloads) for information on how to access your downloaded files.
### 
[​](#view-a-pdf-in-browser)
View a PDF in browser
To view a PDF in the browser tab instead of automatically downloading it, you can set the `enablePdfViewer` property to true as follows:
 * Node.js
 * Python
SDK
Copy
Ask AI
```
const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY });
const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID,
 browserSettings: {
 enablePdfViewer: true,
 }
});
```
Was this page helpful?
YesNo
[Uploads](/features/uploads)[Contexts](/features/contexts)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.