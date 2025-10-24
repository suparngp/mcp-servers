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
 * [Introduction](/integrations/trigger/introduction)
 * [Quickstart](/integrations/trigger/quickstart)
 * Val Town
 * Vercel
 * Support
 * [Dashboard](https://www.browserbase.com/overview)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
Search...
Navigation
Trigger
Quickstart
On this page
 * [1. Scaffold a fresh project](#1-scaffold-a-fresh-project)
 * [2. Create trigger.config.ts](#2-create-trigger-config-ts)
 * [3. Configure .env.local](#3-configure-env-local)
 * [4. Add your first task src/trigger/puppeteer-log-title.ts](#4-add-your-first-task-src%2Ftrigger%2Fpuppeteer-log-title-ts)
 * [5. Wire up a minimal server (Next.js, Express, or Bun)](#5-wire-up-a-minimal-server-next-js%2C-express%2C-or-bun)
 * [6. Run locally](#6-run-locally)
 * [7. Fire the task](#7-fire-the-task)
 * [8. Deploy](#8-deploy)
> Prerequisites: Node 18+, PNPM/NPM/Yarn, a **Trigger.dev** account, and a **Browserbase** API key.
## 
[​](#1-scaffold-a-fresh-project)
1. Scaffold a fresh project
Copy
Ask AI
```
mkdir my-trigger-project && cd $_
npm init -y # or pnpm init / yarn init
```
Add required packages:
Copy
Ask AI
```
npm install @trigger.dev/sdk @trigger.dev/build puppeteer puppeteer-core
```
If you want TypeScript (recommended):
Copy
Ask AI
```
npm install -D typescript ts-node @types/node
npx tsc --init
```
## 
[​](#2-create-trigger-config-ts)
2. Create `trigger.config.ts`
trigger.config.ts
Copy
Ask AI
```
import { defineConfig, aptGet, puppeteer } from "@trigger.dev/build";
export default defineConfig({
 project: "your_project_id", // grab from the Trigger dashboard
 logLevel: "log",
 build: {
 extensions: [aptGet({ packages: ["mupdf-tools", "curl"] }), puppeteer()],
 },
});
```
This installs MuPDF + Chrome in the build container so your tasks can run `mutool` and Puppeteer.
## 
[​](#3-configure-env-local)
3. Configure `.env.local`
Copy
Ask AI
```
cp .env.example .env.local && $EDITOR .env.local
```
Fill in:
Copy
Ask AI
```
TRIGGER_SECRET_KEY=tr_dev_***
BROWSERBASE_API_KEY=bb_***
BROWSERBASE_PROJECT_ID=proj_***
S3_ENDPOINT=https://<account>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
S3_BUCKET=my-bucket
```
## 
[​](#4-add-your-first-task-src%2Ftrigger%2Fpuppeteer-log-title-ts)
4. Add your first task `src/trigger/puppeteer-log-title.ts`
src/trigger/puppeteer-log-title.ts
Copy
Ask AI
```
import { task } from "@trigger.dev/sdk";
import puppeteer from "puppeteer";
export const logTitle = task({
 id: "browserbase-title",
 run: async () => {
 const browser = await puppeteer.connect({
 browserWSEndpoint: `wss://connect.browserbase.com?apiKey=${process.env.BROWSERBASE_API_KEY}`,
 });
 const page = await browser.newPage();
 await page.goto("https://example.com");
 const title = await page.title();
 console.log({ title });
 await browser.close();
 },
});
```
> You can export multiple tasks from this file or additional files in `src/trigger/`—Trigger.dev will pick them up automatically.
## 
[​](#5-wire-up-a-minimal-server-next-js%2C-express%2C-or-bun)
5. Wire up a minimal server (Next.js, Express, or Bun)
If you’re using **Next.js App Router** , create `app/api/route.ts` similar to the example in this repo. For a bare-bones Express server:
server.ts
Copy
Ask AI
```
import express from "express";
import { TriggerClient } from "@trigger.dev/sdk";
import { createMiddleware } from "@trigger.dev/express";
const client = new TriggerClient({
 id: "browserbase-quickstart",
 apiKey: process.env.TRIGGER_SECRET_KEY!,
});
const app = express();
app.use(createMiddleware(client)); // mounts /api/trigger
app.listen(3000, () => console.log("Listening on :3000"));
```
Add a script to `package.json`:
Copy
Ask AI
```
{
 "scripts": {
 "dev": "ts-node server.ts"
 }
}
```
## 
[​](#6-run-locally)
6. Run locally
Copy
Ask AI
```
pnpm dev
```
Trigger opens a local tunnel so its cloud can call your tasks. You should see the task register in the dashboard.
## 
[​](#7-fire-the-task)
7. Fire the task
Copy
Ask AI
```
curl -X POST http://localhost:3000/api/trigger -d '{"id":"browserbase-title"}'
```
Check **Runs → browserbase-title** in the dashboard; you’ll see the title printed and screenshots in Browserbase.
## 
[​](#8-deploy)
8. Deploy
Copy
Ask AI
```
npx trigger.dev@latest deploy
```
That’s it—your background browser automation now scales automatically in production.
* * *
Need something more advanced? Check out:
 * **`pdf-to-image.tsx`**– converts multi-page PDFs to PNG and uploads to Cloudflare R2.
 * **`summarize-hn.tsx`**– scrapes Hacker News, feeds articles to OpenAI, emails a summary.
Happy triggering! 🎯
Was this page helpful?
YesNo
[Introduction](/integrations/trigger/introduction)[Introduction](/integrations/val-town/introduction)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.