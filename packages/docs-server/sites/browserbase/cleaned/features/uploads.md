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
Uploads
On this page
 * [Playwright](#playwright)
 * [Direct Upload](#direct-upload)
 * [Large Files Upload](#large-files-upload)
You can easily upload files to websites using Playwright, Puppeteer, or Selenium. The approach varies depending on your framework:
## 
[​](#playwright)
Playwright
### 
[​](#direct-upload)
Direct Upload
For Playwright, you can upload files directly from your local path. After [creating and connecting to a session](/fundamentals/using-browser-session), follow these steps:
 1. Make sure your file is available where you’re running your Playwright code
 2. Use the `setInputFiles` method to upload the file
 3. The file path should be relative to your current working directory
 * Node.js
 * Python
Playwright
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
 await page.goto("https://browser-tests-alpha.vercel.app/api/upload-test");
 const fileInput = page.locator("#fileUpload");
 // logo.png is available relative to the current working directory
 await fileInput.setInputFiles("logo.png");
})().catch((error) => console.error(error));
```
### 
[​](#large-files-upload)
Large Files Upload
For larger files, you can use the [Session Uploads API](/reference/api/create-session-uploads). Follow this example:
 * Node.js
 * Python
Playwright
Copy
Ask AI
```
// ⭐️⭐️⭐️ IMPORTANT: Set your file name below
const fileName = "YOUR_FILE_NAME.EXAMPLE";
// ⭐️⭐️⭐️
import { chromium } from "playwright-core";
import { Browserbase } from "@browserbasehq/sdk";
import * as fs from "fs";
const apiKey = process.env.BROWSERBASE_API_KEY!;
const projectId = process.env.BROWSERBASE_PROJECT_ID!;
async function upload() {
 // 1. Initialize Browserbase Client
 console.log("✨ Initializing Browserbase client");
 const bb = new Browserbase({ apiKey });
 // 2. Create Browser Session
 console.log("🚀 Creating new browser session");
 const session = await bb.sessions.create({ projectId });
 // 3. Upload file via the Uploads API
 console.log("⬆️ Uploading file");
 try {
 const fileStream = fs.createReadStream(fileName);
 const result = await bb.sessions.uploads.create(session.id, {
 file: fileStream,
 });
 console.log(`✅ Upload successful: ${JSON.stringify(result)}`);
 } catch (error) {
 console.error(`❌ Upload failed... exiting: ${error}`);
 return;
 }
 // 4. Connect to the Session
 console.log("🔗 Connecting to browser session");
 const browser = await chromium.connectOverCDP(session.connectUrl);
 const defaultContext = browser.contexts()[0];
 const page = defaultContext.pages()[0];
 // 5. Get Live View link for remote debugging
 const liveViews = await bb.sessions.debug(session.id);
 console.log("🔍 Live View link:", liveViews.debuggerUrl);
 // 6. Use the Browser
 console.log("🌐 Navigating to page: upload-test");
 await page.goto("https://browser-tests-alpha.vercel.app/api/upload-test", {
 waitUntil: "domcontentloaded",
 });
 // Set up CDP client for additional controls
 const cdpSession = await defaultContext.newCDPSession(page);
 const root = await cdpSession.send("DOM.getDocument");
 // Then find our input element
 const inputNode = await cdpSession.send("DOM.querySelector", {
 nodeId: root.root.nodeId,
 selector: "#fileUpload",
 });
 // Use DOM.setFileInputFiles CDP command
 const remoteFilePath = `/tmp/.uploads/${fileName}`;
 await cdpSession.send("DOM.setFileInputFiles", {
 files: [remoteFilePath],
 nodeId: inputNode.nodeId,
 });
 console.log("⌛ Waiting for 60 seconds: allow time for 1) file upload and 2) to see the file upload...");
 await new Promise((resolve) => setTimeout(resolve, 60000));
 // 7. Cleanup
 console.log("👋 Closing browser session");
 await page.close();
 await browser.close();
 // 8. Session Recording Link
 console.log("\n" + "─".repeat(60));
 console.log(`
🎥 Your session dashboard is ready
 https://www.browserbase.com/sessions/${session.id}`);
}
// Execute the main function
upload().catch((error) => console.error(error));
```
## [Session Uploads API Learn more about the available params and response fields ](/reference/api/create-session-uploads)
Was this page helpful?
YesNo
[Downloads](/features/downloads)[Screenshots & PDFs](/features/screenshots)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.