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
 * [Introduction](/integrations/mongo-db/introduction)
 * [Quickstart](/integrations/mongo-db/quickstart)
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
MongoDB
Quickstart
On this page
 * [Before You Start](#before-you-start)
 * [Step 1: Project Setup](#step-1%3A-project-setup)
 * [Clone and Install](#clone-and-install)
 * [Step 2: Start MongoDB](#step-2%3A-start-mongodb)
 * [Step 3: Configuration](#step-3%3A-configuration)
 * [Environment Variables](#environment-variables)
 * [Step 4: Configure Stagehand](#step-4%3A-configure-stagehand)
 * [Step 5: Run Your First Scrape](#step-5%3A-run-your-first-scrape)
 * [Execute the Scraper](#execute-the-scraper)
 * [Customization Options](#customization-options)
 * [Extend Data Schema](#extend-data-schema)
 * [Custom Extraction Instructions](#custom-extraction-instructions)
 * [What’s Next?](#what%E2%80%99s-next%3F)
## What You'll Build
An AI-powered web scraper that extracts product data from e-commerce sites and stores it in MongoDB with automatic schema validation and data analysis.
## 
[​](#before-you-start)
Before You Start
Ensure you have these requirements ready:
## [Node.js 16+ Required runtime environment ](https://nodejs.org/)## [MongoDB Local install or MongoDB Atlas ](https://www.mongodb.com/atlas)## [API Access Browserbase API key and project ID ](https://www.browserbase.com/overview)
## 
[​](#step-1%3A-project-setup)
Step 1: Project Setup
### 
[​](#clone-and-install)
Clone and Install
Copy
Ask AI
```
# Clone the integration template
npx degit browserbase/integrations/examples/integrations/mongodb/typescript browserbase-mongodb
cd browserbase-mongodb
# Install all dependencies
npm install
# Install browser binaries
npx playwright install
```
What gets installed?
**Core packages:**
 * `@browserbasehq/stagehand` - AI-powered web scraping
 * `mongodb` - MongoDB driver for data storage
 * `zod` - Schema validation for type safety
**Utilities:**
 * `chalk` & `boxen` - Terminal styling and output formatting
 * `playwright` - Browser automation engine
## 
[​](#step-2%3A-start-mongodb)
Step 2: Start MongoDB
**Required** : MongoDB must be running on your system before proceeding. Start it with `mongod` if installed locally, or ensure your MongoDB Atlas connection is ready.
If using local MongoDB, ensure it’s running:
Copy
Ask AI
```
# Start MongoDB (if installed locally)
mongod
```
**MongoDB Atlas users** can skip this step as the database is already hosted in the cloud.
## 
[​](#step-3%3A-configuration)
Step 3: Configuration
### 
[​](#environment-variables)
Environment Variables
Create your `.env` file with the required configuration:
Local MongoDB
MongoDB Atlas
Copy
Ask AI
```
# Browserbase Configuration (Recommended)
BROWSERBASE_API_KEY=your_browserbase_api_key
BROWSERBASE_PROJECT_ID=your_project_id
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017
DB_NAME=scraper_db
# Stagehand Configuration
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```
## 
[​](#step-4%3A-configure-stagehand)
Step 4: Configure Stagehand
The integration is configured to use Browserbase cloud browsers:
stagehand.config.ts
Copy
Ask AI
```
const StagehandConfig: ConstructorParams = {
 verbose: 1,
 domSettleTimeoutMs: 30_000,
 // LLM Configuration 
 modelName: "claude-3-7-sonnet-20250219",
 modelClientOptions: {
 apiKey: process.env.ANTHROPIC_API_KEY,
 },
 // Run in Browserbase cloud (Recommended)
 env: "BROWSERBASE",
 apiKey: process.env.BROWSERBASE_API_KEY,
 projectId: process.env.BROWSERBASE_PROJECT_ID,
 browserbaseSessionCreateParams: {
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 browserSettings: {
 blockAds: true,
 viewport: { width: 1024, height: 768 },
 },
 },
};
```
## 
[​](#step-5%3A-run-your-first-scrape)
Step 5: Run Your First Scrape
**What happens when you run the scraper:**
 1. Connects to MongoDB and creates necessary collections
 2. Navigates to Amazon laptop category
 3. Scrapes product listings with AI-powered extraction
 4. Extracts detailed information for the first 3 products
 5. Stores all data in MongoDB with schema validation
 6. Runs analysis queries and displays results
### 
[​](#execute-the-scraper)
Execute the Scraper
Copy
Ask AI
```
npm start
```
## 
[​](#customization-options)
Customization Options
### 
[​](#extend-data-schema)
Extend Data Schema
Add custom fields to capture more product information:
Copy
Ask AI
```
const ProductSchema = z.object({
 // Existing fields...
 title: z.string(),
 price: z.string().optional(),
 rating: z.string().optional(),
 // Add your custom fields
 brand: z.string().optional(),
 availability: z.string().optional(),
 shippingInfo: z.string().optional(),
 specifications: z.array(z.string()).optional(),
 customerReviews: z.number().optional(),
});
```
### 
[​](#custom-extraction-instructions)
Custom Extraction Instructions
Modify the AI extraction to capture specific data:
Copy
Ask AI
```
const data = await page.extract({
 instruction: `
 Extract comprehensive product information including:
 - Brand and model details
 - Detailed specifications
 - Availability and shipping information
 - Customer ratings and review counts
 `,
 schema: ProductSchema,
});
```
## 
[​](#what%E2%80%99s-next%3F)
What’s Next?
Now that you have a working MongoDB + Stagehand integration:
## [Scale Your Scraping Learn how to scale your scraping operations across multiple sites and handle larger datasets. ](https://www.mongodb.com/docs/atlas/getting-started/)## [Deploy to Production Deploy your scraping pipeline to production with Browserbase. ](https://www.browserbase.com/overview)
* * *
**Need help?** Join the [Stagehand Slack community](https://stagehand.dev/slack) for support and to share your scraping projects!
Was this page helpful?
YesNo
[Introduction](/integrations/mongo-db/introduction)[Introduction](/integrations/openai-cua/introduction)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.