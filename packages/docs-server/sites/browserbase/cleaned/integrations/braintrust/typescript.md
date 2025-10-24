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
 * [Introduction](/integrations/braintrust/introduction)
 * [Quickstart](/integrations/braintrust/typescript)
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
Braintrust
Add web browsing capabilities to Braintrust
 * API
 * SDK
1
### Get your Browserbase API Key
Go over the [Dashboard’s Settings tab](https://www.browserbase.com/settings):
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/quickstart/api-key.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=b9a4d1261a99b7160d615f1d2ee7a6c9)
Then copy your API Key directly from the input and set the `BROWSERBASE_API_KEY` and `BROWSERBASE_PROJECT_ID` environment variables.
2
### Create a Braintrust Organization
Create a new [Braintrust organization](https://docs.braintrust.dev/getting-started/creating-a-project) if you haven’t already.
3
### Install Braintrust, Zod, and Playwright
In addition to Braintrust and Browserbase SDK, we’ll also use [Zod](https://zod.dev/) for parameter validation.
Copy
Ask AI
```
 npm install zod braintrust playwright-core
```
4
### Set organization-wide variables in Braintrust
We’ll set the `BROWSERBASE_API_KEY` environment variable in Braintrust. This will allow us to use the Browserbase SDK to fetch page content.In addition to setting the `BROWSERBASE_API_KEY` environment variable, we’ll also need to upload your AI API keys to Braintrust.Braintrust supports a variety of AI providers, so you can select the one that best fits your needs. You can set the AI provider in the Braintrust Settings page.
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/integrations/braintrust/envvars.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=cc916fc2d66f1ebb803b9d73d4421040)
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/integrations/braintrust/aiproviders.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=172181b5f3a8660b5a3443b388328930)
5
### Update your Braintrust project to use Browserbase
Running your existing code in Braintrust works well with Browserbase as a tool.Tools can be created through code. Let’s define a load function that fetches and returns the page content from a given URL.Here’s an example of how to modify your existing code to use Browserbase as a tool in Braintrust:
browserbase.ts
Copy
Ask AI
```
import * as braintrust from "braintrust";
import { z } from "zod";
import { chromium } from "playwright-core";
// Create a session with Browserbase
async function createSession() {
 const response = await fetch(`https://api.browserbase.com/v1/sessions`, {
 method: "POST",
 headers: {
 "x-bb-api-key": `${process.env.BROWSERBASE_API_KEY}`,
 "Content-Type": "application/json",
 },
 body: JSON.stringify({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 proxies: true,
 }),
 });
 const json = await response.json();
 return json;
}
// Load page from the internet
async function loadPage({ url }: { url: string }) {
 const { id } = await createSession();
 const browser = await chromium.connectOverCDP(
 `wss://connect.browserbase.com?apiKey=${process.env.BROWSERBASE_API_KEY}&sessionId=${id}`,
 );
 const defaultContext = browser.contexts()[0];
 const page = defaultContext.pages()[0];
 await page.goto(url);
 const readable: { title?: string; textContent?: string } =
 await page.evaluate(`
 import('https://cdn.skypack.dev/@mozilla/readability').then(readability => {
 return new readability.Readability(document).parse()
 })`);
 const text = `${readable.title}\n${readable.textContent}`;
 return { page: text };
}
// Create a new project and tool in Braintrust
const project = braintrust.projects.create({ name: "Browserbase API Tool" });
project.tools.create({
 handler: loadPage,
 parameters: z.object({
 url: z.string(),
 }),
 returns: z.object({
 page: z.string(),
 }),
 name: "Load page",
 slug: "load-page",
 description: "Load a page from the internet",
 ifExists: "replace",
});
```
Make sure you set your environment variables `BRAINTRUST_API_KEY`, `BROWSERBASE_API_KEY`, `BROWSERBASE_PROJECT_ID` locally before proceeding.
6
### Push the function to Braintrust
Now, we’ll use the Braintrust CLI to push the function to Braintrust. This will deploy the function to Braintrust and make it available to use in your project.Once the command completes, you should see the function listed in the Library’s “Tools” tab. You can now input a URL and use the “Load page” tool to fetch the page content.
Copy
Ask AI
```
npx braintrust push browserbase.ts
```
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/integrations/braintrust/tool-library.gif?s=3f0b3e8537e17b385bb3bce347066215)
You’ve successfully integrated Browserbase with Braintrust! You can use tools to create simple and composable agents that perform tasks like web-scraping, retrieval augmented generation (RAG), API execution, and much more. Learn more about prompting and tool calling in [Braintrust Docs](https://www.braintrust.dev/docs/guides/prompts).
Was this page helpful?
YesNo
[Introduction](/integrations/braintrust/introduction)[Introduction](/integrations/browseruse/introduction)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.