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
Features
Metadata
On this page
 * [Overview](#overview)
 * [Creating a Session with Metadata](#creating-a-session-with-metadata)
 * [Querying Sessions by Session Metadata](#querying-sessions-by-session-metadata)
## 
[​](#overview)
Overview
As your number of sessions grows, attaching metadata helps to organize your sessions based on your application’s specific needs. Our [List Sessions](/reference/api/list-sessions) endpoint supports filtering sessions by status, which is helpful but not highly configurable. Session metadata allows you to attach arbitrary JSON data to sessions, which then gives you additional flexibility when querying sessions.
### 
[​](#creating-a-session-with-metadata)
Creating a Session with Metadata
Metadata is attached to a session when hitting our [Create Session](/reference/api/create-a-session) endpoint. This metadata can be any JSON-serializable object. This metadata is attached to the stored session object and can be queried against using the [List Sessions](/reference/api/list-sessions) endpoint. Below is an example for attaching an order status to a created session. This will attach the object `{"order": {"status": "shipped"}}` to the created session.
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
 key: "value",
 key2: {
 key2A: "value2A",
 key2B: "value2B",
 },
 },
 });
 return session;
}
const session = await createSessionWithMetadata();
console.log("Session URL: https://browserbase.com/sessions/" + session.id);
```
The size of the stored JSON object is limited to 512 characters. We measure this by converting your object into a JSON string (think `JSON.stringify`) and measuring the length of the resulting string.
### 
[​](#querying-sessions-by-session-metadata)
Querying Sessions by Session Metadata
Querying using session metadata is done via the `q` query parameter on the [List Sessions](/reference/api/list-sessions) endpoint. Let’s use the example object `{"order": {"status": "shipped"}}` from the previous section. To query for all sessions with an order of status `"shipped"`, you can use the following query:
Copy
Ask AI
```
user_metadata['order']['status']:'shipped'
```
This query contains the following components:
 * `user_metadata` is known as the “base” of the query. Currently we only support the `user_metadata` base, although we’re working to support more querying bases in the future. Stay tuned!
 * `['order']['path']` is known as the “path” of the query. The path is used to drill into nested fields in the stored metadata object. In this case, we’re looking for an object with keys in the shape `{ "order": { "status" }}`.
 * `'shipped'` is known as the “value” of the query. This is separated from the base and the path of the query with a `:` character. The “value” field of the query is used to check strict equality of the value specified by the “path” of the query. In our case, we’re looking for an object with the exact shape `{ "order": { "status": "shipped" }}`.
Note that we need to URL encode the query string to ensure that it’s properly parsed by the API.
 * `%5B` is the URL encoded version of `[`
 * `%5D` is the URL encoded version of `]`
 * `%3A` is the URL encoded version of `:`
In JavaScript, you can use `encodeURIComponent("user_metadata['order']['status']:'shipped'")` to encode the query string.
Below is an example of how to use this query.
 * Node.js
 * Python
SDK
Copy
Ask AI
```
import Browserbase from "@browserbasehq/sdk";
const bb = new Browserbase({ apiKey: process.env["BROWSERBASE_API_KEY"]! });
async function listSessionsWithMetadata(query: string) {
 const sessions = await bb.sessions.list({
 q: query,
 });
 return sessions;
}
const query = "user_metadata['key']:'value'";
const sessions = await listSessionsWithMetadata(query);
console.log(sessions);
```
This will return a list of all sessions with attached metadata in the form `{"order": {"status": "shipped"}}`. If the query doesn’t match any sessions, the API will respond with an empty list `[]`.
Currently we only support querying by fields (no arrays) and checking value equality of string (no numbers or booleans). A quick workaround for this is to convert numbers and booleans into strings and query normally.
Was this page helpful?
YesNo
[Browser Extensions](/features/browser-extensions)[Form Submissions](/use-cases/automating-form-submissions)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.