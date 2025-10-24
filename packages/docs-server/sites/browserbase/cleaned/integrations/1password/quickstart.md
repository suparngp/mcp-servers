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
 * [Introduction](/integrations/1password/introduction)
 * [Quickstart](/integrations/1password/quickstart)
 * [Director](/integrations/1password/director)
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
1Password
Use 1Password to Login with Browserbase
On this page
 * [1. Create Your 1Password Vault](#1-create-your-1password-vault)
 * [Create the Vault](#create-the-vault)
 * [Add Your Browserbase Credentials](#add-your-browserbase-credentials)
 * [2. Create a Service Account](#2-create-a-service-account)
 * [3. Install Dependencies](#3-install-dependencies)
 * [4. Configure Environment](#4-configure-environment)
 * [5. Implement Authentication](#5-implement-authentication)
 * [6. Run Your Script](#6-run-your-script)
 * [Next Steps](#next-steps)
This guide walks you through using the 1Password SDK with Stagehand and Playwright to securely authenticate on websites without hardcoding credentials.
This guide assumes you have a 1Password account and a Browserbase account. If you don’t, create a [1Password account](https://start.1password.com/) and [Browserbase account](https://www.browserbase.com/sign-up).
## 
[​](#1-create-your-1password-vault)
1. Create Your 1Password Vault
You’ll need to create a specific vault structure for this integration to work properly.
### 
[​](#create-the-vault)
Create the Vault
 * 1Password App
 * 1Password.com
 1. Open the 1Password app and sign in to your account
 2. Click the plus **+** button in the sidebar
 3. Name your vault: **`Browserbase Agent`**
 4. Optionally add a description like “Credentials for Browserbase automation”
 5. Click **Create**
### 
[​](#add-your-browserbase-credentials)
Add Your Browserbase Credentials
 1. In your new **`Browserbase Agent`**vault, click**New Item**
 2. Select **Login** as the item type
 3. Fill in the details:
 * **Title** : `Browserbase`
 * **Username** : Your Browserbase email address
 * **Password** : Your Browserbase password
 4. Click **Save**
Your vault structure should now be: `op://Browserbase Agent/Browserbase/username` and `op://Browserbase Agent/Browserbase/password`
## 
[​](#2-create-a-service-account)
2. Create a Service Account
You’ll need to create a Service Account to allow programmatic access to your vault.
You need admin access to your 1Password account to create a Service Account.
 1. Navigate to [1Password.com](https://1password.com) and sign in
 2. Go to the **Developer** tab in the sidebar
 3. Under **Service Accounts** , click **New Service Account**
 4. Name your Service Account: **`Browserbase Agent Account`**
 5. Select the vault you created in Step 1: **`Browserbase Agent`**
 6. Click **Create Account**
 7. **IMPORTANT:** Copy the Service Account token that appears
This Service Account token is sensitive and will only be shown once. Store it securely - you’ll need it for the `OP_SERVICE_ACCOUNT_TOKEN` environment variable.
## 
[​](#3-install-dependencies)
3. Install Dependencies
 * npm
 * pnpm
 * yarn
Copy
Ask AI
```
npm install @browserbasehq/stagehand @1password/sdk
```
## 
[​](#4-configure-environment)
4. Configure Environment
Create a `.env` file in your project root:
.env
Copy
Ask AI
```
BROWSERBASE_API_KEY=your_browserbase_api_key
BROWSERBASE_PROJECT_ID=your_browserbase_project_id
OPENAI_API_KEY=your_openai_api_key
OP_SERVICE_ACCOUNT_TOKEN=your_1password_service_account_token
```
## 
[​](#5-implement-authentication)
5. Implement Authentication
Create an `index.ts` file with the following code:
index.ts
Copy
Ask AI
```
import { z } from "zod";
import { createClient } from "@1password/sdk";
import { Stagehand } from "@browserbasehq/stagehand";
async function main() {
 // Initialize 1Password SDK client for secure credential retrieval
 const client = await createClient({
 auth: process.env.OP_SERVICE_ACCOUNT_TOKEN!,
 integrationName: "My Browserbase and 1Password Integration",
 integrationVersion: "v1.0.0",
 });
 // Initialize Stagehand with Browserbase environment
 const stagehand = new Stagehand({
 env: "BROWSERBASE",
 });
 await stagehand.init();
 // Retrieve credentials from 1Password vault
 const username = await client.secrets.resolve("op://Browserbase Agent/Browserbase/username");
 const password = await client.secrets.resolve("op://Browserbase Agent/Browserbase/password");
 // Navigate to Browserbase sign-in page
 const page = stagehand.page;
 await page.goto("https://www.browserbase.com/sign-in", { waitUntil: "domcontentloaded" });
 console.log('Navigated to Browserbase sign-in page')
 // Login process
 await page.act({
 action: "Type in the username: %username%",
 variables: {
 username: username,
 },
 });
 console.log('Typed in the username')
 await page.act('Click continue')
 console.log('Clicked continue')
 await page.act({
 action: "Type in the password: %password%",
 variables: {
 password: password,
 },
 });
 console.log('Typed in the password')
 await page.act('Click the sign in button')
 console.log('Clicked the sign in button')
 // Wait for the page to load
 await page.waitForLoadState('domcontentloaded')
 console.log('Page loaded')
 // Extract project information from the dashboard
 const { projectId } = await page.extract({
 instruction: "Extract the project ID of the Browserbase account",
 schema: z.object({
 projectId: z.string(),
 }),
 });
 const { totalSessions } = await page.extract({
 instruction: "Extract the total sessions for the period for the project",
 schema: z.object({
 totalSessions: z.number(),
 }),
 });
 console.log('For Project ID: ', projectId, ' the total sessions for the last 30 days is: ', totalSessions)
 // Close the stagehand session
 await stagehand.close();
}
main();
```
## 
[​](#6-run-your-script)
6. Run Your Script
Execute your script to see the 1Password integration in action:
 * npm
 * pnpm
 * yarn
Copy
Ask AI
```
npx tsx index.ts
```
## 
[​](#next-steps)
Next Steps
## [Contexts Learn more about using contexts to automate workflows across login-gated sites ](/features/contexts)## [Session Replay Learn more about using session replay to debug and optimize your workflows ](/features/session-replay)
Was this page helpful?
YesNo
[Introduction](/integrations/1password/introduction)[Director](/integrations/1password/director)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.