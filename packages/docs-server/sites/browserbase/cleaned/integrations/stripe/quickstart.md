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
 * [Introduction](/integrations/stripe/introduction)
 * [Quickstart](/integrations/stripe/quickstart)
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
Stripe
Agentic Credit Card Automation
On this page
 * [Build an Agentic Credit Card Automation](#build-an-agentic-credit-card-automation)
 * [1. Set up your environment](#1-set-up-your-environment)
 * [2. Create a Stripe Cardholder](#2-create-a-stripe-cardholder)
 * [3. Create a Virtual Card](#3-create-a-virtual-card)
 * [4. Retrieve Virtual Card Details](#4-retrieve-virtual-card-details)
 * [5. Make a Purchase](#5-make-a-purchase)
 * [Next Steps](#next-steps)
 * [Best Practices](#best-practices)
Here are the steps:
 1. Set up your environment
 2. Create a Stripe Cardholder
 3. Create a Virtual Card with spending controls
 4. Retrieve Virtual Card Details
 5. Make a Purchase
## 
[​](#build-an-agentic-credit-card-automation)
Build an Agentic Credit Card Automation
### 
[​](#1-set-up-your-environment)
1. Set up your environment
Install the required dependencies and set up your API keys.
 * Node.js
 * Python
npm
yarn
pnpm
bun
Copy
Ask AI
```
npm install stripe @browserbasehq/sdk playwright-core dotenv
```
Create a .env file with your API keys (securely store keys for Stripe, Browserbase, and optional AI models for Stagehand):
 * Stripe [API key](https://dashboard.stripe.com/apikeys)
 * Browserbase [Project ID & API Key](https://browserbase.com/settings/)
 * (Optional) LLM API key for [Stagehand](https://www.stagehand.dev/)
.env
Copy
Ask AI
```
STRIPE_API_KEY=your_stripe_api_key
BROWSERBASE_PROJECT_ID=your_browserbase_project_id
BROWSERBASE_API_KEY=your_browserbase_api_key
ANTHROPIC_API_KEY=OPTIONAL_your_anthropic_api_key
OPENAI_API_KEY=OPTIONAL_your_openai_api_key
```
### 
[​](#2-create-a-stripe-cardholder)
2. Create a Stripe Cardholder
A cardholder must be created before issuing virtual cards. The cardholder will have a verified billing address and will be eligible to receive virtual cards.
 * Node.js
 * Python
create-cardholder.ts
Copy
Ask AI
```
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_API_KEY!);
async function createCardholder() {
 const cardholder = await stripe.issuing.cardholders.create({
 name: "Browserbase User",
 email: "hello@browserbase.com",
 phone_number: "+15555555555",
 status: 'active',
 type: 'individual',
 billing: {
 address: {
 line1: '123 Main Street',
 city: 'San Francisco',
 state: 'CA',
 country: 'US',
 postal_code: '94111',
 }
 },
 });
 console.log("Cardholder created:", cardholder.id);
 return cardholder;
}
const cardholder = createCardholder();
```
Save the cardholder ID from the console output for the next step.
### 
[​](#3-create-a-virtual-card)
3. Create a Virtual Card
Once you have a cardholder, you can create a virtual card under their name. This step generates a virtual card with a predefined spending limit. Stripe allows you to customize the card’s spending controls, including setting daily, monthly, or per-transaction limits. Find more information on spending controls in the [Stripe docs](https://docs.stripe.com/issuing/controls/spending-controls).
 * Node.js
 * Python
create-card.ts
Copy
Ask AI
```
async function createCard(cardholderId: string) {
 const card = await stripe.issuing.cards.create({
 cardholder: cardholderId,
 currency: 'usd',
 type: 'virtual',
 spending_controls: {
 allowed_categories: ['charitable_and_social_service_organizations_fundraising'],
 // Choose to block certain categories instead of allowing them
 // blocked_categories: ['automated_cash_disburse'],
 spending_limits: [{
 amount: 7500, // $75.00 measured in cents
 interval: 'daily', // all_time, daily, weekly, monthly, yearly, per_authorization
 }],
 },
 });
 console.log('Card created:', card.id);
 return card;
}
const cardholderId = "ic_INPUT_CARDHOLDER_ID_HERE" // replace with your cardholder id from the previous step
const virtual_card = createCard(cardholderId);
```
This function returns all the details needed to complete an online purchase.
### 
[​](#4-retrieve-virtual-card-details)
4. Retrieve Virtual Card Details
After creating a virtual card, you’ll need to retrieve its details (card number, expiration date, and CVC) to use it for transactions. The returned data can be used to automatically enter the card details when needed.
 * Node.js
 * Python
get-card.ts
Copy
Ask AI
```
export async function getCard(cardId: string) {
 const card = await stripe.issuing.cards.retrieve(
 cardId, {expand: ['number', 'cvc']});
 const cardInfo = {
 cardholder_firstName: card.cardholder.name.split(' ')[0],
 cardholder_lastName: card.cardholder.name.split(' ')[1],
 cardholder_email: card.cardholder.email,
 cardholder_phone: card.cardholder.phone_number,
 cardholder_address: card.cardholder.billing.address,
 card_number: card.number,
 expiration_month: card.exp_month,
 expiration_year: card.exp_year.toString().slice(-2), // 2028 -> 28
 cvc: card.cvc,
 brand: card.brand,
 currency: card.currency,
 };
 console.log('Card info:', cardInfo);
 return cardInfo;
}
const cardId = "ic_INPUT_CARD_ID_HERE"; // replace with your card id from the previous step
getCard(cardId);
```
### 
[​](#5-make-a-purchase)
5. Make a Purchase
In this step, you will automate filling in the credit card payment form. This example walks you through navigating to the Red Cross donation page, selecting a donation amount, and completing the payment process using the virtual card details retrieved earlier.
 * Node.js
 * Python
Stagehand
Playwright
Copy
Ask AI
```
import { Stagehand } from "@browserbasehq/stagehand";
import dotenv from "dotenv";
import { getCard } from "./get-card.js";
dotenv.config();
const stagehand = new Stagehand({
 env: "BROWSERBASE",
});
const cardId = "ic_INPUT_CARD_ID_HERE"; // replace with your card id from the previous step
async function main() {
 await stagehand.init();
 const page = stagehand.page;
 console.log(`Watching session: https://www.browserbase.com/sessions/${stagehand.browserbaseSessionID}`);
 const paymentInfo = await getCard(cardId);
 // Navigate to Red Cross donation page
 await page.goto('https://www.redcross.org/donate/donation.html/')
 const donationAmount = await page.observe({
 instruction: "Find the donation amounts, and click $75",
 returnAction: true,
 onlyVisible: false,
 });
 // Click the first donation amount
 await page.act(donationAmount[0])
 // Find the continue button and click it
 const continueButton = await page.observe({
 instruction: "Find the continue button and click it",
 returnAction: true,
 onlyVisible: false,
 });
 await page.act(continueButton[0])
 // Find the credit card button and click it
 const creditCardButton = await page.observe({
 instruction: "Find the credit card button and click it",
 returnAction: true,
 onlyVisible: false,
 });
 await page.act(creditCardButton[0])
 await page.act({action: "click the continue button"})
 const formValues = await page.observe({
 instruction: `Fill in the form with the following values: ${JSON.stringify(paymentInfo)}`,
 returnAction: true,
 onlyVisible: false,
 });
 console.log("formValues", formValues);
 // Fill in the form with the values
 for (const value of formValues) {
 await page.act(value);
 }
 await page.waitForTimeout(10000);
 // Click the submit button
 await page.act({action: "click the donate button"})
 await stagehand.close();
}
main().catch(console.error);
```
🎉 You made an online purchase with **Stripe** and **Browserbase**!
## 
[​](#next-steps)
Next Steps
With this foundation, you can build more advanced payment automation:
 * Create multiple virtual cards for different departments or spending categories
 * Integrate with expense management systems
 * Set up automated subscription payments
 * Build checkout automation for testing payment flows
## 
[​](#best-practices)
Best Practices
 * Track your transactions: Monitor card usage through the [Stripe Dashboard](https://dashboard.stripe.com/cards)
 * Handle errors gracefully: Implement robust error handling for form fields and payment rejections
 * Add verification steps: Verify successful transactions by checking for confirmation elements
 * Secure your credentials: Never expose API keys in client-side code
Was this page helpful?
YesNo
[Introduction](/integrations/stripe/introduction)[Introduction](/integrations/temporal/introduction)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.