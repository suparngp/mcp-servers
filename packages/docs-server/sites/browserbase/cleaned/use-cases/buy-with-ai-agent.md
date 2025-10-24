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
 * Support
 * [Dashboard](https://www.browserbase.com/overview)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
Search...
Navigation
Buying with an AI Agent
On this page
 * [Overview](#overview)
 * [Building Your AI Buying Agent](#building-your-ai-buying-agent)
 * [Extending Your AI Buying Agent](#extending-your-ai-buying-agent)
 * [Price Monitoring](#price-monitoring)
 * [Comparison Shopping](#comparison-shopping)
 * [Buying with Approval](#buying-with-approval)
 * [Best Practices](#best-practices)
 * [Example Use Cases](#example-use-cases)
## 
[​](#overview)
Overview
AI purchasing agents combine natural language processing with browser automation to handle complex buying tasks. This guide shows you how to build an agent that can search for products, compare options, and complete checkout processes.
## 
[​](#building-your-ai-buying-agent)
Building Your AI Buying Agent
1
Define the agent's workflow
Break down your buying process into logical steps. A typical workflow includes:
 1. **Search and discovery** - Finding products based on criteria
 2. **Comparison and selection** - Evaluating options and choosing the best match
 3. **Checkout process** - Adding to cart and completing purchase
Here’s a basic agent structure:
 * Node.js
 * Python
Playwright
Copy
Ask AI
```
import { Browserbase } from "@browserbasehq/sdk";
import { Stagehand } from "@browserbasehq/stagehand";
import dotenv from "dotenv";
dotenv.config();
async function createBuyingAgent(productDescription, budget, preferences) {
 // Create a Browserbase session
 const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY });
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID,
 });
 console.log(`Session URL: https://browserbase.com/sessions/${session.id}`);
 // Initialize Stagehand for AI-powered automation
 const browser = await bb.connect(session.id);
 const stagehand = new Stagehand({
 browser,
 // Optional OpenAI configuration for enhanced capabilities
 llm: {
 provider: "openai",
 apiKey: process.env.OPENAI_API_KEY,
 model: "gpt-4", 
 },
 });
 // Return the configured agent ready to execute buying tasks
 return {
 browser,
 stagehand,
 // Additional agent methods will be defined below
 };
}
```
2
Implement product search
The first task for your buying agent is finding products that match the user’s criteria.
 * Node.js
 * Python
Copy
Ask AI
```
async function searchForProducts(agent, productDescription) {
 const { stagehand } = agent;
 const page = await stagehand.newPage();
 // Navigate to an e-commerce site
 await page.goto("https://www.amazon.com");
 // Use AI to search for the product
 await page.act({
 instruction: `Search for ${productDescription}`,
 });
 // Extract product information using AI understanding
 const searchResults = await page.extract({
 instruction: "Extract the top 5 product results with their names, prices, and ratings",
 schema: {
 products: [{
 name: "string",
 price: "string",
 rating: "string",
 url: "string"
 }]
 }
 });
 return searchResults.products;
}
// Add this method to your agent
agent.searchForProducts = (productDescription) =>
 searchForProducts(agent, productDescription);
```
3
Add product evaluation and selection
Once you have a list of products, your agent needs to evaluate them against user preferences.
 * Node.js
 * Python
Copy
Ask AI
```
async function selectBestProduct(agent, products, budget, preferences) {
 // Convert budget to a number
 const budgetValue = parseFloat(budget.replace(/[^0-9.]/g, ''));
 // Filter products within budget
 const affordableProducts = products.filter(product => {
 const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));
 return price <= budgetValue;
 });
 if (affordableProducts.length === 0) {
 console.log("No products found within budget");
 return null;
 }
 // Use the agent's AI to evaluate products based on preferences
 const { stagehand } = agent;
 const page = await stagehand.newPage();
 // Present the filtered products to the AI for evaluation
 const recommendation = await stagehand.think({
 instruction: `Evaluate these products based on the user preferences: ${preferences}. 
 Consider factors like ratings, features mentioned in the product name, and price.
 Return the index of the best product.`,
 context: { affordableProducts }
 });
 // Return the best product
 return affordableProducts[recommendation.bestProductIndex];
}
// Add this method to your agent
agent.selectBestProduct = (products, budget, preferences) =>
 selectBestProduct(agent, products, budget, preferences);
```
4
Implement the checkout process
Once a product is selected, your agent needs to add it to the cart and complete the purchase.
 * Node.js
 * Python
Copy
Ask AI
```
async function completePurchase(agent, productUrl, paymentInfo) {
 const { stagehand } = agent;
 const page = await stagehand.newPage();
 // Navigate to the product page
 await page.goto(productUrl);
 // Add to cart
 await page.act({
 instruction: "Add this product to the cart"
 });
 // Proceed to checkout
 await page.act({
 instruction: "Proceed to checkout"
 });
 // Fill in shipping information
 await page.act({
 instruction: `Fill in the shipping form with these details: 
 Name: ${paymentInfo.name},
 Address: ${paymentInfo.address},
 City: ${paymentInfo.city},
 State: ${paymentInfo.state},
 Zip: ${paymentInfo.zip},
 Phone: ${paymentInfo.phone}`
 });
 // Fill in payment information
 await page.act({
 instruction: `Fill in the payment form with these details:
 Card Number: ${paymentInfo.cardNumber},
 Expiration: ${paymentInfo.expiration},
 CVC: ${paymentInfo.cvc}`
 });
 // Review order before final submission
 const orderSummary = await page.extract({
 instruction: "Extract the order summary including total price",
 schema: {
 items: [{
 name: "string",
 price: "string"
 }],
 subtotal: "string",
 tax: "string",
 shipping: "string",
 total: "string"
 }
 });
 // Return the order summary for confirmation
 return orderSummary;
 // For a real implementation, you would add:
 // await page.act({ instruction: "Place the order" });
}
// Add this method to your agent
agent.completePurchase = (productUrl, paymentInfo) =>
 completePurchase(agent, productUrl, paymentInfo);
```
5
Put it all together
Now you can create a complete buying workflow by combining all the agent functions.
 * Node.js
 * Python
Copy
Ask AI
```
async function runBuyingProcess() {
 // User inputs
 const productDescription = "wireless noise-cancelling headphones";
 const budget = "$300";
 const preferences = "Prefer longer battery life and comfortable fit for extended use";
 const paymentInfo = {
 name: "John Doe",
 address: "123 Main St",
 city: "San Francisco",
 state: "CA",
 zip: "94105",
 phone: "555-123-4567",
 cardNumber: "4111111111111111", // Test card number
 expiration: "12/28",
 cvc: "123"
 };
 // Create the buying agent
 const agent = await createBuyingAgent(productDescription, budget, preferences);
 try {
 // Search for products
 console.log(`Searching for: ${productDescription}`);
 const products = await agent.searchForProducts(productDescription);
 console.log(`Found ${products.length} products`);
 // Select the best product
 console.log("Selecting the best product based on preferences...");
 const selectedProduct = await agent.selectBestProduct(products, budget, preferences);
 if (!selectedProduct) {
 console.log("Could not find a suitable product within budget");
 return;
 }
 console.log(`Selected product: ${selectedProduct.name} - ${selectedProduct.price}`);
 // Complete purchase
 console.log("Proceeding to checkout...");
 const orderSummary = await agent.completePurchase(selectedProduct.url, paymentInfo);
 console.log("Order summary:", orderSummary);
 console.log("Purchase workflow completed successfully");
 } catch (error) {
 console.error("Error in buying process:", error);
 } finally {
 // Clean up
 await agent.browser.close();
 }
}
runBuyingProcess();
```
## 
[​](#extending-your-ai-buying-agent)
Extending Your AI Buying Agent
Once you’ve built your basic buying agent, you can extend it with these advanced capabilities:
### 
[​](#price-monitoring)
Price Monitoring
Add scheduling to check prices periodically and make purchases when they drop below a certain threshold:
Copy
Ask AI
```
async function monitorPrice(agent, productUrl, targetPrice) {
 const { stagehand } = agent;
 const page = await stagehand.newPage();
 await page.goto(productUrl);
 const currentPrice = await page.extract({
 instruction: "Extract the current price of this product",
 schema: { price: "string" }
 });
 const priceValue = parseFloat(currentPrice.price.replace(/[^0-9.]/g, ''));
 const targetValue = parseFloat(targetPrice.replace(/[^0-9.]/g, ''));
 return {
 currentPrice: priceValue,
 targetPrice: targetValue,
 isBelow: priceValue <= targetValue
 };
}
```
### 
[​](#comparison-shopping)
Comparison Shopping
Enhance your agent to compare products across multiple retailers:
Copy
Ask AI
```
async function compareAcrossRetailers(agent, productName) {
 const retailers = ["amazon.com", "bestbuy.com", "walmart.com"];
 const results = [];
 for (const retailer of retailers) {
 // Search on each retailer
 // Add results to comparison list
 }
 // Return the best deal across all retailers
}
```
### 
[​](#buying-with-approval)
Buying with Approval
For higher-priced items, add a human approval step before completing purchase:
Copy
Ask AI
```
async function buyWithApproval(agent, productUrl, paymentInfo) {
 // Search and select product
 // Present final order to user for approval
 // Proceed with purchase only after confirmation
}
```
## 
[​](#best-practices)
Best Practices
 * **Test thoroughly** : Always test your agent with test cards on non-production environments
 * **Handle errors gracefully** : Implement robust error handling for site changes and unexpected scenarios
 * **Add verification steps** : Verify successful transactions by checking for order confirmations
 * **Build in protections** : Add budget limits and safety checks to prevent unwanted purchases
 * **Respect website terms** : Ensure your bots comply with each website’s terms of service
 * **Manage cookies and sessions** : Properly handle authentication and session state
 * **Add logging** : Implement detailed logging for monitoring and debugging
## 
[​](#example-use-cases)
Example Use Cases
 * **Supply reordering** : Automate procurement of regular office or manufacturing supplies
 * **Limited product drops** : Purchase limited-edition products as soon as they become available
 * **Price-based purchasing** : Buy products when they fall below a specified price threshold
 * **Gift purchasing** : Automate buying gifts for clients, employees, or personal occasions
 * **Subscription management** : Monitor and manage recurring subscriptions across services
Was this page helpful?
YesNo
⌘I
Assistant
Responses are generated using AI and may contain mistakes.