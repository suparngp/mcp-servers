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
 * [Introduction](/integrations/agentkit/introduction)
 * [Quickstart](/integrations/agentkit/quickstart)
 * [Stagehand Quickstart](/integrations/agentkit/stagehand)
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
AgentKit
Reddit Search Agent
On this page
 * [1. Install AgentKit](#1-install-agentkit)
 * [2. Setup an AgentKit Network with an Agent](#2-setup-an-agentkit-network-with-an-agent)
 * [3. Create a Browserbase Tool](#3-create-a-browserbase-tool)
 * [4. Put it all together](#4-put-it-all-together)
 * [Next Steps](#next-steps)
### 
[​](#1-install-agentkit)
1. Install AgentKit
Within an existing project, install AgentKit, Browserbase, and Playwright core:
 * npm
 * pnpm
 * yarn
Copy
Ask AI
```
npm install @inngest/agent-kit @browserbasehq/sdk playwright-core
```
Don’t have an existing project? Create a new one with your preferred package manager before continuing.
### 
[​](#2-setup-an-agentkit-network-with-an-agent)
2. Setup an AgentKit Network with an Agent
Create an Agent and its associated Network, for example a Reddit Search Agent:
Copy
Ask AI
```
import {
 anthropic,
 createAgent,
 createNetwork,
} from "@inngest/agent-kit";
const searchAgent = createAgent({
 name: "reddit_searcher",
 description: "An agent that searches Reddit for relevant information",
 system:
 "You are a helpful assistant that searches Reddit for relevant information.",
});
// Create the network
const redditSearchNetwork = createNetwork({
 name: "reddit_search_network",
 description: "A network that searches Reddit using Browserbase",
 agents: [searchAgent],
 maxIter: 2,
 defaultModel: anthropic({
 model: "claude-3-5-sonnet-latest",
 max_tokens: 4096,
 }),
});
```
### 
[​](#3-create-a-browserbase-tool)
3. Create a Browserbase Tool
Configure the Browserbase SDK and create a tool that can search Reddit:
Copy
Ask AI
```
import {
 anthropic,
 createAgent,
 createNetwork,
 createTool,
} from "@inngest/agent-kit";
import { z } from "zod";
import { chromium } from "playwright-core";
import Browserbase from "@browserbasehq/sdk";
const bb = new Browserbase({
 apiKey: process.env.BROWSERBASE_API_KEY as string,
});
// Create a tool to search Reddit using Browserbase
const searchReddit = createTool({
 name: "search_reddit",
 description: "Search Reddit posts and comments",
 parameters: z.object({
 query: z.string().describe("The search query for Reddit"),
 }),
 handler: async ({ query }, { step }) => {
 return await step?.run("search-on-reddit", async () => {
 // Create a new session
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID as string,
 });
 // Connect to the session
 const browser = await chromium.connectOverCDP(session.connectUrl);
 try {
 const page = await browser.newPage();
 // Construct the search URL
 const searchUrl = `https://search-new.pullpush.io/?type=submission&q=${query}`;
 console.log(searchUrl);
 await page.goto(searchUrl);
 // Wait for results to load
 await page.waitForSelector("div.results", { timeout: 10000 });
 // Extract search results
 const results = await page.evaluate(() => {
 const posts = document.querySelectorAll("div.results div:has(h1)");
 return Array.from(posts).map((post) => ({
 title: post.querySelector("h1")?.textContent?.trim(),
 content: post.querySelector("div")?.textContent?.trim(),
 }));
 });
 console.log("results", JSON.stringify(results, null, 2));
 return results.slice(0, 5); // Return top 5 results
 } finally {
 await browser.close();
 }
 });
 },
});
```
Configure your `BROWSERBASE_API_KEY` and `BROWSERBASE_PROJECT_ID` in the `.env` file. You can find your API key and project ID from the Browserbase dashboard.
We recommend building tools using Browserbase with Inngest’s `step.run()` function. This ensures that the tool will only run once across multiple runs. More information about using `step.run()` can be found in the [Multi steps tools page](https://docs.agentkit.ai/tools/multi-step-tools).
### 
[​](#4-put-it-all-together)
4. Put it all together
Complete example of a Reddit search agent using Browserbase:
Copy
Ask AI
```
// Add the tool to the agent
searchAgent.tools.push(searchReddit);
// Run the agent with a query
const executor = redditSearchNetwork.createExecutor();
// Execute the network with a query
const execution = await executor.execute({
 input: "Find discussions about climate change solutions",
});
console.log(execution.output);
```
For a complete working example, check out the [Reddit Search Agent using Browserbase example](https://github.com/inngest/agentkit/tree/main/examples/reddit-search-agent-browserbase).
## 
[​](#next-steps)
Next Steps
With this foundation, you can build more advanced web browsing agents:
 * Create agents that can perform complex workflows across multiple websites
 * Build data collection agents that gather information from various sources
 * Develop automation agents that interact with web applications
 * Create testing agents that validate web application functionality
For more examples and documentation, visit:
 * [AgentKit Documentation](https://docs.agentkit.ai/)
 * [Browserbase Documentation](https://docs.browserbase.com/)
 * [Stagehand Documentation](https://docs.stagehand.dev/)
Was this page helpful?
YesNo
[Introduction](/integrations/agentkit/introduction)[Stagehand Quickstart](/integrations/agentkit/stagehand)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.