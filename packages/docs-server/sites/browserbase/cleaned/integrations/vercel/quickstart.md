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
Configure Browserbase for Vercel AI
 * API
1
### Get your API Key
Go over the [Dashboard’s Settings tab](https://www.browserbase.com/settings):
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/quickstart/api-key.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=b9a4d1261a99b7160d615f1d2ee7a6c9)
Then, copy your API key and project ID directly from the input and set the `BROWSERBASE_API_KEY` and `BROWSERBASE_PROJECT_ID` environment variables.
2
### Install the Vercel AI, Anthropic, Jsdom, Playwright, and Readability
We use Playwright to navigate the web and extract content, Jsdom to parse the HTML, and Readability to extract the text.As for the Vercel AI SDK and Anthropic, we use them to generate the prompts and handle the responses.
Copy
Ask AI
```
 npm i playwright ai jsdom @ai-sdk/anthropic @mozilla/readability
```
3
### Create the Session
The session is created to allow the browser to connect to the Browserbase API.We’ll use the session ID to create a connection to the browser and extract the content from the page.
Copy
Ask AI
```
async function createSession() {
 const response = await fetch(`https://api.browserbase.com/v1/sessions`, {
 method: "POST",
 headers: {
 "x-bb-api-key": process.env.BROWSERBASE_API_KEY,
 "Content-Type": "application/json",
 },
 body: JSON.stringify({ projectId: process.env.BROWSERBASE_PROJECT_ID }),
 });
 const { id } = await response.json();
 return id;
}
```
4
### Create a function to receive and summarize the page content
In this step, we’ll create a function to receive and summarize the page content. Based off a user’s message, we’ll create a search query and extract the content from the page.We’ll use Jsdom to parse the HTML and Readability to extract the text.
Copy
Ask AI
```
async function getPageInfo(message: string) {
 const sessionId = await createSession();
 const wsUrl = `wss://connect.browserbase.com?apiKey=${process.env.BROWSERBASE_API_KEY}&sessionId=${sessionId}`;
 const browser = await chromium.connectOverCDP(wsUrl);
 const page = browser.contexts()[0].pages()[0];
 const searchQuery = encodeURIComponent(`${message}?`);
 await page.goto(`https://www.google.com/search?q=${searchQuery}`);
 const content = await page.content();
 const dom = new JSDOM(content);
 const article = new Readability(dom.window.document).parse();
 await browser.close();
 return article?.textContent || '';
}
```
5
### Create the GET request to generate the summary
Next.js provides [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) that can be used to direct incoming requests to the appropriate server components.Below is an example of a route handler in the App Router, which processes the `GET` method using the Browserbase API and returns the text content of the page:
Copy
Ask AI
```
export async function GET(request: Request) {
 const userMessage = "What is the weather in San Francisco?";
 const info = await getPageInfo(userMessage);
 const response = await generateText({
 model: anthropic("claude-3-5-sonnet-20241022"),
 messages: convertToCoreMessages([
 { role: "system", content: "You are a helpful assistant" },
 { role: "user", content: `Info: ${info}\n\nQuestion: ${userMessage}` }
 ]),
 });
 return new Response(JSON.stringify({ content: response.text }), {
 status: 200,
 headers: { 'Content-Type': 'application/json' },
 });
}
```
Be sure to store the `ANTHROPIC_API_KEY` environment variable in your `.env` file.
Congratulations! You’ve successfully created a `GET` request to generate the summary of the page content using the Browserbase API and Vercel AI SDK.In addition to learning how to use the Browserbase API with Vercel AI SDK, we’ve attached a [Browserbase x Nextjs](https://github.com/browserbase/quickstart-nextjs) template to get you started.
## [Browserbase x Nextjs Template Browserbase X Nextjs Template ](https://github.com/browserbase/quickstart-nextjs)
Was this page helpful?
YesNo
[Introduction](/integrations/vercel/introduction)[BrowseGPT](/integrations/vercel/browsegpt)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.