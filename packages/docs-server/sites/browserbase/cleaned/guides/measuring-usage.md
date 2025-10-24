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
Guides
Measuring Usage
On this page
 * [Overview](#overview)
 * [Browserbase Dashboard](#browserbase-dashboard)
 * [Features](#features)
 * [Metrics](#metrics)
 * [Using the Project Usage API](#using-the-project-usage-api)
 * [Segmenting Usage with Metadata](#segmenting-usage-with-metadata)
 * [Create a session with metadata](#create-a-session-with-metadata)
 * [Query the session usage data with the metadata](#query-the-session-usage-data-with-the-metadata)
## 
[​](#overview)
Overview
Understanding your proxy and session usage is essential for optimizing costs, managing quotas, and ensuring efficient automation. Browserbase provides multiple ways to track and analyze usage, including a dashboard overview, the Project Usage API, and session metadata for granular insights.
## 
[​](#browserbase-dashboard)
Browserbase Dashboard
The Browserbase Analytics Dashboard provides a real-time view of your session activity, browser usage, and proxy data consumption. It helps you monitor performance, track trends, and optimize automation workflows at a glance.
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/guides/browserbase_dashboard.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=dd1a76c41ee99288029ec25fb1f2b229)
View your usage in the [Browserbase Dashboard](https://www.browserbase.com/overview).
#### 
[​](#features)
Features
 * **Customizable Time Range:** View data for the last 24 hours, 7 days, 30 days, or your billing cycle to analyze trends over different periods.
 * **Real-Time Refresh:** Update your analytics with the latest data instantly.
 * **Detailed Metrics on Hover:** Hover over charts to see precise session, proxy, and usage details.
#### 
[​](#metrics)
Metrics
 * **Total Sessions & Browser Minutes:** Track session volume and total runtime.
 * **Avg. Session Duration & Proxy Data:** Monitor efficiency and bandwidth usage.
 * **Session Status Breakdown:** Identify errors, timeouts, and completion rates.
## 
[​](#using-the-project-usage-api)
Using the Project Usage API
For programmatic tracking, the Project Usage API allows you to retrieve detailed usage data through an API request. This is useful for:
 * Automating usage reports to monitor trends over time.
 * Setting up alerts when usage approaches a predefined limit.
 * Integrating with external billing or monitoring tools for cost control.
To access the [Project Usage API](/reference/api/get-project-usage), you can use the following endpoint:
 * Node.js
 * Python
API
Copy
Ask AI
```
import axios from "axios";
async function getProjectUsage() {
 const response = await axios.get(
 `https://api.browserbase.com/v1/projects/${process.env.BROWSERBASE_PROJECT_ID}/usage`,
 {
 headers: {
 "X-BB-API-Key": process.env.BROWSERBASE_API_KEY
 }
 }
 );
 return response.data;
}
getProjectUsage()
 .then(console.log)
 .catch(console.error);
```
## 
[​](#segmenting-usage-with-metadata)
Segmenting Usage with Metadata
To segment usage by metadata, you can add metadata to your sessions. This metadata is stored in the session metadata field and can be used to segment usage in the Browserbase Dashboard. Find more information in the [Session Metadata](/features/session-metadata) documentation.
 1. Create a session with metadata
 2. Query the session usage data with the metadata
### 
[​](#create-a-session-with-metadata)
Create a session with metadata
Session metadata allows you to tag and categorize sessions for better tracking, segmentation, and analysis. By adding metadata, you can:
 * Filter and analyze usage by project, client, or workflow.
 * Track performance and debugging data across different runs.
 * Segment sessions based on region, proxy settings, or automation type.
To create a session with metadata, include a userMetadata object when making a session request. This metadata can later be retrieved, filtered, and used for insights and optimizations. Example Use Cases:
 * Labeling sessions by client (“client”: “enterprise_customer_xyz”)
 * Tagging workflow type (“task”: “checkout_automation”)
 * Storing region or proxy details (“region”: “us-west”)
 * Debugging with test IDs (“test_id”: “A/B-variant-3”)
 * Node.js
 * Python
SDK
Copy
Ask AI
```
import Browserbase from "@browserbasehq/sdk";
const bb = new Browserbase({ apiKey: process.env["BROWSERBASE_API_KEY"]! });
async function createSessionWithMetadata() {
 const session = await bb.sessions.create({
 projectId: process.env["BROWSERBASE_PROJECT_ID"]!,
 userMetadata: {
 "key": "value",
 "key2": {
 "key2A": "value2A",
 "key2B": "value2B"
 }
 },
 });
 return session;
}
const session = await createSessionWithMetadata();
console.log("Session URL: https://browserbase.com/sessions/" + session.id);
```
### 
[​](#query-the-session-usage-data-with-the-metadata)
Query the session usage data with the metadata
You can filter and analyze session usage by querying sessions based on their metadata. This allows you to track specific workflows, clients, or regions to gain insights into usage patterns, optimize automation, and manage costs effectively. By using metadata filters, you can:
 * Retrieve sessions by client, project, or task type to analyze usage trends.
 * Segment usage based on region, proxy settings, or session status.
 * Identify high-bandwidth sessions by tagging and filtering resource-heavy processes.
To query session data, use the q parameter in the API request with a metadata filter expression. This enables you to retrieve sessions that match specific criteria, such as completed sessions for a particular client or region. It is very important to format the query correctly. The formatting of the query is as follows:
Copy
Ask AI
```
query = "user_metadata['key']:'value'"
```
Note that we need to URL encode the query string to ensure that it’s properly parsed by the API.
 * `%5B` is the URL encoded version of `[`
 * `%5D` is the URL encoded version of `]`
 * `%3A` is the URL encoded version of `:`
In JavaScript, you can use `encodeURIComponent("user_metadata['order']['status']:'shipped'")` to encode the query string.
 * Node.js
 * Python
API
Copy
Ask AI
```
import Browserbase from "@browserbasehq/sdk";
const bb = new Browserbase({apiKey: process.env["BROWSERBASE_API_KEY"]!});
async function listSessionsWithMetadata(query: string) {
 const sessions = await bb.sessions.list({
 q: query
 });
 return sessions;
}
const query = "user_metadata['client']:'enterprise_customer_xyz'";
const sessions = await listSessionsWithMetadata(query);
console.log(sessions);
```
Was this page helpful?
YesNo
[Browser Regions](/guides/multi-region)[Using Session Metadata](/guides/using-session-metadata)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.