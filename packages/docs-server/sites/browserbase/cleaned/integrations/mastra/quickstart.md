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
 * [Introduction](/integrations/mastra/introduction)
 * [Quickstart](/integrations/mastra/quickstart)
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
Mastra
Mastra Agent Quickstart
On this page
 * [How It Works](#how-it-works)
 * [Try these Commands](#try-these-commands)
 * [Next Steps](#next-steps)
1
Get your Browserbase API Key
Go over the [Dashboard’s Settings tab](https://www.browserbase.com/settings):
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/quickstart/api-key.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=b9a4d1261a99b7160d615f1d2ee7a6c9)
Then copy your API Key directly from the input and set the `BROWSERBASE_API_KEY` and `BROWSERBASE_PROJECT_ID` environment variables.
2
Get your OpenAI API Key
Create an OpenAI account and get your API key from the [OpenAI platform](https://platform.openai.com/api-keys).Set the environment variable:
Copy
Ask AI
```
export OPENAI_API_KEY=your_openai_api_key
```
3
Create a new project
Initialize a new Node.js project:
Copy
Ask AI
```
mkdir mastra-web-agent
cd mastra-web-agent
npm init -y
```
4
Install dependencies
Install the required packages:
Copy
Ask AI
```
npm install @mastra/core @mastra/memory mastra @ai-sdk/openai @browserbasehq/stagehand zod
npm install -D @types/node tsx typescript
```
5
Create the Stagehand tools
Create `src/mastra/tools/index.ts` with the web automation tools:
src/mastra/tools/index.ts
Copy
Ask AI
```
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { Stagehand } from "@browserbasehq/stagehand";
export const stagehandActTool = createTool({
 id: 'web-act',
 description: 'Take an action on a webpage using Stagehand',
 inputSchema: z.object({
 url: z.string().optional().describe('URL to navigate to (optional if already on a page)'),
 action: z.string().describe('Action to perform (e.g., "click sign in button", "type hello in search field")'),
 }),
 outputSchema: z.object({
 success: z.boolean(),
 message: z.string(),
 }),
 execute: async ({ context }) => {
 const stagehand = await sessionManager.ensureStagehand();
 const page = stagehand.page;
 try {
 if (context.url) {
 await page.goto(context.url);
 }
 if (context.action) {
 await page.act(context.action);
 }
 return { 
 success: true, 
 message: `Successfully performed: ${context.action}`
 };
 } catch (error: any) {
 throw new Error(`Stagehand action failed: ${error.message}`);
 }
 },
});
export const stagehandObserveTool = createTool({
 id: 'web-observe',
 description: 'Observe elements on a webpage using Stagehand to plan actions',
 inputSchema: z.object({
 url: z.string().optional().describe('URL to navigate to (optional if already on a page)'),
 instruction: z.string().describe('What to observe (e.g., "find the sign in button")'),
 }),
 outputSchema: z.array(z.any()).describe('Array of observable actions'),
 execute: async ({ context }) => {
 const stagehand = await sessionManager.ensureStagehand();
 const page = stagehand.page;
 try {
 if (context.url) {
 await page.goto(context.url);
 }
 return await page.observe(context.instruction);
 } catch (error: any) {
 throw new Error(`Stagehand observation failed: ${error.message}`);
 }
 },
});
export const stagehandExtractTool = createTool({
 id: 'web-extract',
 description: 'Extract data from a webpage using Stagehand',
 inputSchema: z.object({
 url: z.string().optional().describe('URL to navigate to (optional if already on a page)'),
 instruction: z.string().describe('What to extract (e.g., "extract all product prices")'),
 schema: z.record(z.any()).optional().describe('Zod schema definition for data extraction'),
 }),
 outputSchema: z.any().describe('Extracted data according to schema'),
 execute: async ({ context }) => {
 const stagehand = await sessionManager.ensureStagehand();
 const page = stagehand.page;
 try {
 if (context.url) {
 await page.goto(context.url);
 }
 const defaultSchema = {
 content: z.string()
 };
 return await page.extract({
 instruction: context.instruction,
 schema: z.object(context.schema || defaultSchema)
 });
 } catch (error: any) {
 throw new Error(`Stagehand extraction failed: ${error.message}`);
 }
 },
});
```
6
Create the web agent
Create `src/mastra/agents/index.ts`:
src/mastra/agents/index.ts
Copy
Ask AI
```
import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { stagehandActTool, stagehandObserveTool, stagehandExtractTool } from '../tools';
import { Memory } from '@mastra/memory';
const memory = new Memory();
export const webAgent = new Agent({
 name: 'Web Assistant',
 instructions: `
 You are a helpful web assistant that can navigate websites and extract information.
 Use the stagehandActTool to perform actions on webpages.
 Use the stagehandObserveTool to find elements on webpages.
 Use the stagehandExtractTool to extract data from webpages.
 `,
 model: openai('gpt-4o'),
 tools: { stagehandActTool, stagehandObserveTool, stagehandExtractTool },
 memory: memory
});
```
7
Initialize Mastra
Create `src/mastra/index.ts`:
src/mastra/index.ts
Copy
Ask AI
```
import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { webAgent } from './agents';
export const mastra = new Mastra({
 agents: { webAgent },
 logger: createLogger({
 name: 'Mastra',
 level: 'info',
 }),
});
```
8
Configure Environment
Create a `.env` file in the project root:
.env
Copy
Ask AI
```
BROWSERBASE_API_KEY=your_browserbase_api_key
BROWSERBASE_PROJECT_ID=your_browserbase_project_id
OPENAI_API_KEY=your_openai_api_key
```
9
Start the Agent
Add to your `package.json`:
package.json
Copy
Ask AI
```
{
 "scripts": {
 "dev": "mastra dev"
 }
}
```
Run the development server:
Copy
Ask AI
```
npm run dev
```
This starts the Mastra interface where you can interact with your web automation agent.
## 
[​](#how-it-works)
How It Works
The integration provides three main tools for your AI agent:
 * **Act** : Perform actions like clicking buttons or filling forms
 * **Observe** : Find and identify elements on web pages
 * **Extract** : Pull structured data from websites
## 
[​](#try-these-commands)
Try these Commands
Once your agent is running, try these natural language instructions:
Copy
Ask AI
```
"Go to example.com and find the contact button"
```
Copy
Ask AI
```
"Navigate to a news website and extract the main headlines"
```
Copy
Ask AI
```
"Search for 'AI automation' on Google"
```
Copy
Ask AI
```
"Extract product prices from an e-commerce site"
```
The agent will automatically choose the right tools and execute the web automation tasks. ## [Example Agent on GitHub Find the sample project for this integration ](https://github.com/browserbase/integrations/tree/master/examples/integrations/mastra)
## 
[​](#next-steps)
Next Steps
 * **Custom Instructions** : Modify the agent’s behavior in `src/mastra/agents/index.ts`
 * **Add Tools** : Create additional tools for specific automation needs
 * **Production Setup** : Add proper error handling and logging for production use
You now have a fully functional AI agent that can automate web tasks through natural language! Learn more about advanced features in the [Mastra documentation](https://mastra.ai/docs).
Was this page helpful?
YesNo
[Introduction](/integrations/mastra/introduction)[Introduction](/integrations/mcp/introduction)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.