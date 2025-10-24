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
Using Session Metadata
On this page
 * [What is Session Metadata?](#what-is-session-metadata%3F)
 * [Why Use Session Metadata?](#why-use-session-metadata%3F)
 * [Technical Implementation](#technical-implementation)
 * [Structure and Limitations](#structure-and-limitations)
 * [Querying Your Metadata](#querying-your-metadata)
 * [Best Practices](#best-practices)
 * [Current Limitations and Workarounds](#current-limitations-and-workarounds)
## 
[​](#what-is-session-metadata%3F)
What is Session Metadata?
Session metadata is a customizable label for your browser sessions. While Browserbase already lets you filter sessions by their status, metadata takes this further by allowing you to attach your own JSON data to sessions. 
### 
[​](#why-use-session-metadata%3F)
Why Use Session Metadata?
Consider the use case where you’re running automated tests across multiple browser sessions. Without metadata, you might struggle to track which session belongs to which test run. With metadata, you can attach a “run ID” to each session and easily query them later. Similarly, you might want to track the status of downloads or associate sessions with specific projects or teams.
## 
[​](#technical-implementation)
Technical Implementation
### 
[​](#structure-and-limitations)
Structure and Limitations
Metadata in Browserbase follows a simple yet powerful structure:
 * Your JSON object must be under 512 characters
 * Data is organized in a nested structure using fields (no arrays supported yet)
 * Currently supports string values for comparison (numbers and booleans should be converted to strings)
 * Metadata persists throughout the entire session lifecycle - if you restart your session, your metadata stays intact
Here’s what a typical metadata structure looks like:
Copy
Ask AI
```
{
 "order": {
 "status": "shipped"
 }
}
```
Check out our [Session Metadata documentation](/features/session-metadata) for step-by-step examples.
### 
[​](#querying-your-metadata)
Querying Your Metadata
The query syntax follows a predictable pattern:
Copy
Ask AI
```
user_metadata['path']['to']['field']:'value'
```
For example, to find all sessions with shipped orders:
Copy
Ask AI
```
user_metadata['order']['status']:'shipped'
```
## 
[​](#best-practices)
Best Practices
As always, metadata is cleaner with descriptive & consistent naming and a shallow and intuitive structure.
### 
[​](#current-limitations-and-workarounds)
Current Limitations and Workarounds
While the current implementation is robust, there are some limitations:
 * Only field queries are supported (no array querying)
 * Only string equality checks are available
 * Only the `user_metadata` base is supported
**Pro tip:** Need to query numbers or booleans? Convert them to strings in your metadata:
Copy
Ask AI
```
{
 "priority": "5",
 "active": "true"
}
```
See the full documentation [here](https://docs.browserbase.com/features/session-metadata). 
Was this page helpful?
YesNo
[Measuring Usage](/guides/measuring-usage)[Plans and Pricing](/guides/plans-and-pricing)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.