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
Downloads
On this page
 * [Triggering Downloads](#triggering-downloads)
 * [Retrieving Downloaded Files](#retrieving-downloaded-files)
Unlike screenshots which are saved locally, files downloaded during browser automation are stored in Browserbase’s cloud storage. These files must be retrieved using our API. A typical use case for headless browsers is downloading files from web pages. Our browsers are configured to sync any file you download to our storage infrastructure. We add a Unix timestamp onto the end of the file name to avoid naming conflicts when downloading multiple files (e.g., `sample.pdf` will become `sample-1719265797164.pdf`).
## 
[​](#triggering-downloads)
Triggering Downloads
First, trigger a download in your browser automation:
 1. [Create a browser session](/fundamentals/create-browser-session) and get the session ID
 2. [Connect to the session](/fundamentals/using-browser-session) using your preferred framework
 3. Configure your library’s downloads location
 4. Perform the download action in your automation script
 * Node.js
 * Python
Playwright
Puppeteer
Selenium
Copy
Ask AI
```
import { chromium } from "playwright-core";
import { Browserbase } from "@browserbasehq/sdk";
(async () => {
 const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 });
 const browser = await chromium.connectOverCDP(session.connectUrl);
 const defaultContext = browser.contexts()[0];
 const page = defaultContext.pages()[0];
 // Required to avoid playwright overriding location
 const client = await defaultContext.newCDPSession(page);
 await client.send("Browser.setDownloadBehavior", {
 behavior: "allow",
 downloadPath: "downloads",
 eventsEnabled: true,
 });
 await page.goto("https://browser-tests-alpha.vercel.app/api/download-test");
 const [download] = await Promise.all([
 page.waitForEvent("download"),
 page.locator("#download").click(),
 ]);
 let downloadError = await download.failure();
 if (downloadError !== null) {
 console.log("Error happened on download:", downloadError);
 throw new Error(downloadError);
 }
 // Store the session ID to retrieve downloads later
 console.log("Download completed. Session ID:", session.id);
 await page.close();
 await browser.close();
})().catch((error) => console.error(error.message));
```
Note: if you open the URL of a PDF in a browser session, this will also automatically trigger a file download to Browserbase’s cloud storage, where it can be retrieved. If you’d prefer to view the PDF rather than download it, you can configure this in your browser settings as shown [here](/features/screenshots#view-a-pdf-in-browser).
## 
[​](#retrieving-downloaded-files)
Retrieving Downloaded Files
After triggering downloads in your browser session, you can retrieve them using the [Session Downloads API](/reference/api/session-downloads). The files are returned as a ZIP archive.
We sync the files in real-time; the size of your downloads might affect their immediate availability through the `/downloads` endpoint. The code below includes retry logic to handle this case.
 * Node.js
 * Python
Node
Copy
Ask AI
```
import { writeFileSync } from "node:fs";
import { Browserbase } from "@browserbasehq/sdk";
async function saveDownloadsOnDisk(sessionId: string, retryForSeconds: number) {
 return new Promise<void>((resolve, reject) => {
 let pooler: any;
 const timeout = setTimeout(() => {
 if (pooler) {
 clearInterval(pooler);
 }
 }, retryForSeconds);
 async function fetchDownloads() {
 try {
 const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
 const response = await bb.sessions.downloads.list(sessionId);
 const downloadBuffer = await response.arrayBuffer();
 if (downloadBuffer.byteLength > 0) {
 writeFileSync("downloads.zip", Buffer.from(downloadBuffer));
 clearInterval(pooler);
 clearTimeout(timeout);
 resolve();
 }
 } catch (e) {
 clearInterval(pooler);
 clearTimeout(timeout);
 reject(e);
 }
 }
 pooler = setInterval(fetchDownloads, 2000);
 });
}
(async () => {
 // Use the session ID from your browser automation to retrieve downloads
 const sessionId = "your-session-id";
 await saveDownloadsOnDisk(sessionId, 20000); // wait up to 20s
 console.log("Downloaded files are in downloads.zip");
})().catch(error => {
 console.error('Download failed:', error);
});
```
## [Session Downloads API Learn more about the available params and response fields ](/reference/api/session-downloads)
Was this page helpful?
YesNo
[Session Inspector](/features/session-inspector)[Uploads](/features/uploads)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.