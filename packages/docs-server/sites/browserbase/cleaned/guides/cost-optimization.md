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
Optimizing Cost
On this page
 * [Session Management](#session-management)
 * [Reusing Sessions](#reusing-sessions)
 * [Proxy Optimization](#proxy-optimization)
 * [Selective Proxy Usage](#selective-proxy-usage)
 * [Image Loading Optimization](#image-loading-optimization)
 * [](#)
This guide outlines best practices to minimize infrastructure costs while maintaining performance.
## 
[​](#session-management)
Session Management
### 
[​](#reusing-sessions)
Reusing Sessions
To optimize your costs, consider reusing browser sessions since there is a one-minute minimum billing period for each session creation. For short tasks, reusing sessions helps avoid multiple minimum charges. For longer workflows, you can disconnect and reconnect to the same session as needed, maintaining efficiency while managing resource usage. To reuse a session:
 * Store the session ID from your initial session creation
 * Use the `sessionId` query parameter when connecting to specify the existing session
 * Continue using the same session for similar workloads
Learn more about [connecting to sessions here](/fundamentals/using-browser-session).
## 
[​](#proxy-optimization)
Proxy Optimization
Proxy usage can impacts costs. Implement these strategies to minimize proxy-related expenses:
### 
[​](#selective-proxy-usage)
Selective Proxy Usage
Proxies are a powerful tool if you need to access geo-restricted content, have load balancing requirements, or need anonymity, but if those aren’t necessary, avoiding proxies will save on costs. You can also implement domain-specific proxy routing. For more information, see [Proxy Configuration](/features/proxies#proxies-routing-rules).
### 
[​](#image-loading-optimization)
Image Loading Optimization
When using proxies, control image loading to reduce bandwidth costs. Ensure images are disabled for non-visual automation:
 * Node.js
 * Python
Playwright
Puppeteer
Copy
Ask AI
```
await page.route('**/*', (route, request) => {
 if (request.resourceType() === 'image') return route.abort();
 return route.continue();
});
await page.goto('https://example.com');
```
If you’re scaling up and looking for bulk usage discounts, reach out to hello@browserbase.com
## 
[​](#)
Was this page helpful?
YesNo
[Improving Performance](/guides/speed-optimization)[Long Running Sessions](/guides/long-running-sessions)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.