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
 * [Introduction](/integrations/vercel/introduction)
 * [Quickstart](/integrations/vercel/quickstart)
 * [BrowseGPT](/integrations/vercel/browsegpt)
 * [Using Puppeteer](/integrations/vercel/puppeteer)
 * Support
 * [Dashboard](https://www.browserbase.com/overview)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
Search...
Navigation
Vercel
Deploying Puppeteer on Vercel
On this page
 * [Introduction](#introduction)
 * [Prerequistites](#prerequistites)
 * [Step 1: Setting up your project](#step-1%3A-setting-up-your-project)
 * [Install packages](#install-packages)
 * [Managing API Keys](#managing-api-keys)
 * [Step 2: Using Next.js Route Handlers](#step-2%3A-using-next-js-route-handlers)
 * [HTML](#html)
 * [Screenshots](#screenshots)
 * [Form Inputs](#form-inputs)
 * [Testing the API Endpoints](#testing-the-api-endpoints)
 * [Step 3: Deploying to Vercel](#step-3%3A-deploying-to-vercel)
 * [Deploying with fluid compute](#deploying-with-fluid-compute)
 * [Why Fluid Compute for Browser Automations](#why-fluid-compute-for-browser-automations)
 * [How to Enable Fluid Compute](#how-to-enable-fluid-compute)
 * [Conclusion](#conclusion)
## 
[​](#introduction)
Introduction
This guide will walk you through how to build a fully functional backend that can convert any website into HTML, take screenshots, and fill out forms using Puppeteer, Vercel, and Browserbase. To run these at scale, we’ll also use [**headless browsers**](https://docs.browserbase.com/introduction/what-is-headless-browser) (browsers without a user interface), which are often used for scaling web automations, testing, and data collection.
## 
[​](#prerequistites)
Prerequistites
[**Vercel**](https://vercel.com): A developer infrastructure platform that provides a variety of features that you can build, deploy, and scale. In addition, Vercel owns & maintains one of the most popular frontend frameworks, Next.js, that allows your to building applications completely out-of-box without additional configuration. [**Browserbase**](https://browserbase.com): A headless browser infrastructure platform that provides ready-to-use browsers out of the box. This includes observability, proxies, stealth mode, and additional debugging tools for your automation scripts. Browsers are essential for interacting with the web, and Browserbase simplifies this process by managing multiple browser sessions and providing debugging capabilities from the start. [**Puppeteer**](https://pptr.dev/): A Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run a full version of Chrome or Chromium.
## 
[​](#step-1%3A-setting-up-your-project)
Step 1: Setting up your project
First, you’ll need to create a Browserbase account. You can sign up for a free account [here](https://www.browserbase.com/sign-up). You’ll also need a Vercel account, of which you can sign up for a free account [here](https://vercel.com/signup). Now, let’s create a Next.js app through the CLI. We’ll name this project `vercel-automation`
Copy
Ask AI
```
npx create-next-app@latest vercel-automation
```
### 
[​](#install-packages)
Install packages
To begin using headless browsers, we’ll use Browserbase’s NodeJS SDK and [Stagehand](https://stagehand.dev) AI SDK. In addition, we’ll use [Zod](https://zod.dev/) for data validation and [Prettier](https://prettier.io/) to format our code, ensuring we return clean, structured outputs.
Copy
Ask AI
```
npm install @browserbasehq/sdk @browserbasehq/stagehand prettier zod
```
### 
[​](#managing-api-keys)
Managing API Keys
Be sure to add environment variables for this project. You’ll need a Browserbase API key and Project ID. You can get these from the Browserbase Settings.
Copy
Ask AI
```
BROWSERBASE_API_KEY=
BROWSERBASE_PROJECT_ID=
```
## 
[​](#step-2%3A-using-next-js-route-handlers)
Step 2: Using Next.js Route Handlers
Next.js Route Handlers allow us to create custom API endpoints that process HTTP requests and return web content through our APIs, directly within your application.
 * Next.js provides helper classes `NextRequest` and `NextResponse` to simplify working with native [Request](https://developer.mozilla.org/docs/Web/API/Request)/[Response](https://developer.mozilla.org/docs/Web/API/Response) APIs.
 * Route Handlers are exclusively available within the `app` directory.
In this project, we’ll create three route handlers, each a different web automation task. The route handlers will use Browserbase to utilize headless browser infrastructure for HTML content collection, screenshot captures, and form submissions. Let’s ensure we have the following directory structure:
Copy
Ask AI
```
vercel-automation/
├── app/
│ ├── api/
│ │ ├── html/
│ │ │ └── route.ts
│ │ ├── screenshot/
│ │ │ └── route.ts
│ │ └── form/
│ │ └── route.ts
```
### 
[​](#html)
HTML
Let’s create our first Route Handler for retrieving HTML. Create an `html` directory in our `app/api` folder. To create an endpoint, we’ll add a `route.ts` file that will handle the API requests. We’ll use the `GET` method to retrieve HTML content from a specified URL. Here’s the code for our first route handler:
Puppeteer
Copy
Ask AI
```
// app/api/html/route.ts
import { NextResponse } from "next/server";
import Browserbase from "@browserbasehq/sdk";
import puppeteer from "puppeteer-core";
import prettier from "prettier";
import htmlParser from "prettier/parser-html";
export async function GET(req: Request) {
 try {
 // Extract URL from request query parameters
 const url = new URL(req.url).searchParams.get("url");
 if (!url) {
 return NextResponse.json({ error: "URL is required" }, { status: 400 });
 }
 // Initialize Browserbase with API key
 const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
 // Create a new browser session with specified viewport
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 browserSettings: {
 viewport: { width: 1920, height: 1080 },
 },
 });
 // Connect to browser instance using Puppeteer
 const browser = await puppeteer.connect({
 browserWSEndpoint: session.connectUrl,
 });
 // Navigate to URL and capture HTML
 const page = await browser.newPage();
 await page.goto(url, { waitUntil: "domcontentloaded" });
 const html = await page.evaluate(
 () => document.querySelector("*")?.outerHTML
 );
 // Format the HTML
 const formattedHtml = await prettier.format(html || "", {
 parser: "html",
 plugins: [htmlParser],
 });
 await browser.close();
 // Return the HTML
 return NextResponse.json({ html: formattedHtml });
 } catch (error) {
 console.error("HTML generation error:", error);
 return NextResponse.json({
 error: "Failed to generate HTML",
 details: error instanceof Error ? error.message : String(error),
 }, { status: 500 });
 }
}
```
### 
[​](#screenshots)
Screenshots
For our second Route Handler, we will create a new browser session with a specified viewport, navigate to the URL, and screenshot the screen. You can create `screenshot/route.ts` and utilize the following code to enable screenshot abilities.
Puppeteer
Copy
Ask AI
```
// app/api/screenshot/route.ts
import { NextResponse } from "next/server";
import Browserbase from "@browserbasehq/sdk";
import puppeteer from "puppeteer-core";
export async function GET(req: Request) {
 try {
 // Extract URL from request query parameters
 const url = new URL(req.url).searchParams.get("url");
 if (!url) {
 return NextResponse.json({ error: "URL is required" }, { status: 400 });
 }
 // Initialize Browserbase with API key
 const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
 // Create a new browser session with specified viewport
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 browserSettings: {
 viewport: { width: 1920, height: 1080 },
 },
 });
 // Connect to browser instance using Puppeteer
 const browser = await puppeteer.connect({
 browserWSEndpoint: session.connectUrl,
 });
 // Navigate to URL and capture screenshot
 const page = await browser.newPage();
 await page.goto(url, { waitUntil: "domcontentloaded" });
 const screenshot = await page.screenshot();
 await browser.close();
 // Set appropriate headers for image response
 const headers = new Headers();
 headers.set("Content-Type", "image/png");
 headers.set("Content-Length", screenshot.byteLength.toString());
 // Return screenshot as binary response
 return new NextResponse(screenshot, { status: 200, headers });
 } catch (error) {
 console.error("Screenshot generation error:", error);
 return NextResponse.json(
 {
 error: "Failed to generate screenshot",
 details: error instanceof Error ? error.message : String(error),
 },
 { status: 500 }
 );
 }
}
```
### 
[​](#form-inputs)
Form Inputs
Often times, using Puppeteer can be a bit cumbersome. For our Form API route handler, we’ve implemented web automation using [Stagehand](https://stagehand.dev), an AI SDK. [Stagehand](https://stagehand.dev) simplifies complex browser interactions by allowing us to use plain English for web automation. Stagehand consists of three main functions; `Act`, `Extract`, and `Observe`. In this example, we’ve initialized Stagehand with our Browserbase credentials and an LLM model to efficiently fill out a sample form, rather needing to write a more complex Puppeteer script. Below is the same web automation task, comparing the Puppeteer implementation and Stagehand implementation.
If you’re using Stagehand, you’ll need to set up an LLM provider. Be sure to include the environment variable for your LLM provider in your `.env` file.
Puppeteer
Stagehand
Copy
Ask AI
```
// app/api/form/route.ts
import { NextResponse } from "next/server";
import Browserbase from "@browserbasehq/sdk";
import puppeteer from "puppeteer-core";
export async function GET(req: Request) {
 try {
 // Create Browserbase session
 const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 browserSettings: { viewport: { width: 1920, height: 1080 } },
 });
 // Connect with Puppeteer
 const browser = await puppeteer.connect({
 browserWSEndpoint: session.connectUrl,
 });
 const page = await browser.newPage();
 // Navigate to the form
 await page.goto(
 "https://docs.google.com/forms/d/e/1FAIpQLSdIbWu5keJxnIp4ZGmnGZNlkEd7cYnz_jBRtkE-8xLOoDo5Mw/viewform"
 );
 await page.waitForSelector("form", { timeout: 10000 });
 // Select "Invisibility" radio button
 await page.evaluate(() => {
 const radio = Array.from(
 document.querySelectorAll('[role="radio"]')
 ).find((el) => el.getAttribute("aria-label") === "Invisibility");
 if (radio) (radio as HTMLElement).click();
 });
 // Select checkboxes for features
 const features = ["Stealth Mode", "Proxies", "Session Replay"];
 for (const feature of features) {
 await page.evaluate((featureName) => {
 const checkbox = Array.from(
 document.querySelectorAll('[role="checkbox"]')
 ).find((el) => el.getAttribute("aria-label") === featureName);
 if (checkbox) (checkbox as HTMLElement).click();
 }, feature);
 await new Promise((resolve) => setTimeout(resolve, 300));
 }
 // Fill the text field
 const coolestBuild =
 "A bot that automates form submissions across multiple sites.";
 await page.evaluate((text) => {
 // Find the first visible text input
 const input = document.querySelector("input.whsOnd.zHQkBf");
 if (input) {
 (input as HTMLInputElement).value = text;
 input.dispatchEvent(new Event("input", { bubbles: true }));
 input.dispatchEvent(new Event("change", { bubbles: true }));
 }
 }, coolestBuild);
 // Submit the form
 await new Promise((resolve) => setTimeout(resolve, 300));
 await page.evaluate(() => {
 const submitButton = Array.from(
 document.querySelectorAll('[role="button"]')
 ).find((el) => el.getAttribute("aria-label") === "Submit");
 if (submitButton) (submitButton as HTMLElement).click();
 });
 // Wait for submission and close browser
 await new Promise((resolve) => setTimeout(resolve, 5000));
 await browser.close();
 // Return success response
 return NextResponse.json({
 success: true,
 sessionUrl: `https://browserbase.com/sessions/${session.id}`,
 });
 } catch (error) {
 console.error("Form submission error:", error);
 return NextResponse.json(
 {
 success: false,
 error: error instanceof Error ? error.message : String(error),
 },
 { status: 500 }
 );
 }
}
```
### 
[​](#testing-the-api-endpoints)
Testing the API Endpoints
Now that we’ve implemented our three route handlers in the Next.js app, let’s test the API endpoints.
 1. Start the development server:
Copy
Ask AI
```
npm run dev
```
 2. Access the API at the base URL: `http://localhost:3000/api`
 3. Test each endpoint by navigating to:
 * `http://localhost:3000/api/html`
 * `http://localhost:3000/api/screenshot`
 * `http://localhost:3000/api/form`
Each endpoint should return a `200` status code when working correctly.
## 
[​](#step-3%3A-deploying-to-vercel)
Step 3: Deploying to Vercel
Finally, after testing our API endpoints locally, we can deploy to Vercel:
 1. Sign in to [Vercel](https://vercel.com)
 2. Click **“Add New…”** → **“Project”**
 3. Connect and select your repository
 4. Add any environment variables
 5. Click **“Deploy”**
 6. Once complete, you’ll get a deployment URL
### 
[​](#deploying-with-fluid-compute)
Deploying with fluid compute
![Fluid Compute](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/integrations/vercel/fluid.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=cbd390d749d877b1f71cdc172ed72b95)
[Fluid compute](https://vercel.com/fluid) is a new infrastructure model from Vercel that balances the benefits of dedicated servers and serverless computing. These mini-servers start up only when needed, grow instantly as traffic increases, use what’s already running before adding more compute. **You only pay for what you actually use**. Fluid compute also handles advanced tasks, cuts costs, runs close to your data, requires no setup, and works with standard Node.js and Python. To learn more, you can read more about it in the [announcement](https://vercel.com/blog/introducing-fluid-compute) and [documentation](https://vercel.com/docs/functions/fluid-compute).
### 
[​](#why-fluid-compute-for-browser-automations)
Why Fluid Compute for Browser Automations
For your route handlers connecting to Browserbase’s headless browser infrastructure, fluid compute offers some benefits:
 * **Performance optimization** - Route handlers that orchestrate complex browser automations remain responsive under load, with warm mini-servers eliminating cold start delays when initiating browser sessions
 * **Optimized concurrency** - Multiple function invocations share a single instance, allowing concurrent processing while some requests wait for Browserbase responses, eliminating idle resource waste
 * **Extended, efficient runtimes** - Complex automation workflows that would timeout in standard serverless functions complete successfully, while you only pay when your route handlers are processing requests
Although Vercel doesn’t handle the browser sessions directly (Browserbase does), Fluid compute’s makes browser automation projects significantly more reliable, cost-effective, and performant at scale for AI applications.
### 
[​](#how-to-enable-fluid-compute)
How to Enable Fluid Compute
 1. Go to your project settings in Vercel
 2. Select **Functions** from the left navigation menu
 3. Toggle the **Fluid compute** button to enable it
 4. Click **Save**
 5. Redeploy your project
You will see a higher New Function Duration and New Function Max Duration as a result Fluid compute is able to show how much storage and computing resources you’ve saved by optimizing resource usage across requests.
![Comparison](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/integrations/vercel/comparison.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=7320f5d22ba86deaa0c69c659157eb0c)
As you grow in traffic, multiple requests begin to add up. You can monitor these savings in the [Observability tab](https://vercel.com/docs/observability), which displays metrics on function performance, resource utilization, and cost efficiency. This data helps you quantify the benefits of Fluid compute as your application scales, potentially reducing your compute costs by up to 85% compared to traditional serverless approaches.
## 
[​](#conclusion)
Conclusion
Congratulations! Now you have a fully functional web application that can convert any website into HTML, take screenshots, and fill out forms using Puppeteer and Browserbase. This project demonstrates how to leverage Vercel’s serverless functions, Next.js route handlers, Fluid Compute, Stagehand, and Browserbase headless browsers to create a practical web application. Feel free to check out the [completed code on GitHub](https://github.com/browserbase/integrations/tree/master/examples/integrations/vercel/vercel-puppeteer).
Was this page helpful?
YesNo
[BrowseGPT](/integrations/vercel/browsegpt)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.