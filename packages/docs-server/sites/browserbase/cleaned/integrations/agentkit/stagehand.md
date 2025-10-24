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
Add Stagehand to Agentkit Tools
Stagehand comes with 4 primary APIs that can be directly used as tools:
 * `goto()`: navigate to a specific URL
 * `observe()`: observe the current page
 * `extract()`: extract data from the current page
 * `act()`: take action on the current page
These methods can be used as tools in AgentKit, enabling agents to browse the web autonomously. Below is an example of a simple search agent that uses Stagehand to search the web:
Copy
Ask AI
```
import { createAgent, createTool } from "@inngest/agent-kit";
import { z } from "zod";
import { getStagehand, stringToZodSchema } from "./utils.js";
const webSearchAgent = createAgent({
 name: "web_search_agent",
 description: "I am a web search agent.",
 system: `You are a web search agent.
 `,
 tools: [
 createTool({
 name: "navigate",
 description: "Navigate to a given URL",
 parameters: z.object({
 url: z.string().describe("the URL to navigate to"),
 }),
 handler: async ({ url }, { step, network }) => {
 return await step?.run("navigate", async () => {
 const stagehand = await getStagehand(
 network?.state.kv.get("browserbaseSessionID")!
 );
 await stagehand.page.goto(url);
 return `Navigated to ${url}.`;
 });
 },
 }),
 createTool({
 name: "extract",
 description: "Extract data from the page",
 parameters: z.object({
 instruction: z
 .string()
 .describe("Instructions for what data to extract from the page"),
 schema: z
 .string()
 .describe(
 "A string representing the properties and types of data to extract, for example: '{ name: string, age: number }'"
 ),
 }),
 handler: async ({ instruction, schema }, { step, network }) => {
 return await step?.run("extract", async () => {
 const stagehand = await getStagehand(
 network?.state.kv.get("browserbaseSessionID")!
 );
 const zodSchema = stringToZodSchema(schema);
 return await stagehand.page.extract({
 instruction,
 schema: zodSchema,
 });
 });
 },
 }),
 createTool({
 name: "act",
 description: "Perform an action on the page",
 parameters: z.object({
 action: z
 .string()
 .describe("The action to perform (e.g. 'click the login button')"),
 }),
 handler: async ({ action }, { step, network }) => {
 return await step?.run("act", async () => {
 const stagehand = await getStagehand(
 network?.state.kv.get("browserbaseSessionID")!
 );
 return await stagehand.page.act({ action });
 });
 },
 }),
 createTool({
 name: "observe",
 description: "Observe the page",
 parameters: z.object({
 instruction: z
 .string()
 .describe("Specific instruction for what to observe on the page"),
 }),
 handler: async ({ instruction }, { step, network }) => {
 return await step?.run("observe", async () => {
 const stagehand = await getStagehand(
 network?.state.kv.get("browserbaseSessionID")!
 );
 return await stagehand.page.observe({ instruction });
 });
 },
 }),
 ],
});
```
These 4 AgentKit tools using Stagehand enable the Web Search Agent to browse the web autonomously. The `getStagehand()` helper function is used to retrieve the persisted instance created for the network execution. For a complete example of a simple search agent using Stagehand, check out the [Simple Search Agent using Stagehand example](https://github.com/inngest/agent-kit/tree/main/examples/simple-search-stagehand).
Was this page helpful?
YesNo
[Quickstart](/integrations/agentkit/quickstart)[Introduction](/integrations/agno/introduction)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.