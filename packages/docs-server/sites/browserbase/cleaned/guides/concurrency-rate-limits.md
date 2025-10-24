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
Concurrency & Rate Limits
On this page
 * [Key Limits](#key-limits)
 * [Limits by Plan](#limits-by-plan)
 * [Limits and Concurrency per Project](#limits-and-concurrency-per-project)
 * [Adjust Concurrency](#adjust-concurrency)
 * [Reaching Limits: 429s](#reaching-limits%3A-429s)
 * [Avoiding Rate Limits](#avoiding-rate-limits)
## 
[​](#key-limits)
Key Limits
Browser automation becomes powerful when you can run multiple browser sessions simultaneously. Whether you’re scraping data at scale, running parallel tests, or serving multiple users, understanding concurrency and rate limits is critical. To ensure system stability and fair resource allocation, two key limits apply:
 * **Max Concurrent Browsers** : The maximum number of browser sessions that you can run at the same time
 * **Session Creation Limit** : The maximum number of new browser sessions you can create within any 60-second period
If either limit is reached, your request will receive a 429 (too many requests) error.
**One Minute Minimum:** each browser session requires dedicated resources and has a minimum runtime of one minute, even if closed before.
## 
[​](#limits-by-plan)
Limits by Plan
These limits depends on your plan:
Plan | Free | Developer | Startup | Scale 
---|---|---|---|--- 
Max Concurrent Browsers | 1 | 25 | 100 | 250+ 
Session Creation Limit per minute | 5 | 25 | 50 | 150+ 
## 
[​](#limits-and-concurrency-per-project)
Limits and Concurrency per Project
Concurrency is assigned to the Organization level - so if you’re on the Developer plan, you have 25 total concurrent browsers allotted to your Organization, to be distributed to your projects as you see fit. With one project, all concurrent browsers simply go to that one project. When you create a second project, 1 concurrent browser is automatically added to your second project (since you need at least one browser per project). This subtracts from your first project. If you have two projects, here’s how the concurrency will assign by default:
 * **Developer plan** : Project 1 (24 browsers) + Project 2 (1 browser)
 * **Startup plan** : Project 1 (99 browsers) + Project 2 (1 browser)
 * **Scale plan** : Fully custom
### 
[​](#adjust-concurrency)
Adjust Concurrency
You can adjust the concurrency for your projects in the dashboard. Go to your organization page, then click on the triple dots next to the project you want to adjust and select “Update concurrency”. Then you can adjust the concurrency for each project.
## 
[​](#reaching-limits%3A-429s)
Reaching Limits: 429s
When reaching the session concurrency limit of your plan, any subsequent request to create a new session will return an HTTP `429 Too Many Requests` error. That means the request was effectively dropped. For example, if you have a Developer plan (with a limit of 25 concurrent sessions) you can create up to 25 sessions in a 60 second window. If you try to create a 26th session within that window, it will be rate limited and return an HTTP 429 error. To check the status of your rate limit, you can look at the headers of the response:
 * `x-ratelimit-limit` - How many requests you can make.
 * `x-ratelimit-remaining` - How many requests remain in the time window.
 * `x-ratelimit-reset` - How many seconds must pass before the rate limit resets.
 * `retry-after` - If the max has been reached, this is the number of seconds you must wait before you can make another request. This is documented [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After).
Copy
Ask AI
```
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
x-ratelimit-limit: 25
x-ratelimit-remaining: 0
x-ratelimit-reset: 45
retry-after: 45
```
## 
[​](#avoiding-rate-limits)
Avoiding Rate Limits
To avoid rate limits, you can either run fewer concurrent sessions or close sessions explicitly - as opposed to letting them time out.
For production systems, consider implementing retry logic that respects these headers, using exponential backoff and circuit breakers to handle high concurrency.
If you need more concurrency, you can upgrade to a plan that allows for a higher limits. See [Plans & Pricing](/guides/plans-and-pricing) for more details. Or reach out to us at support@browserbase.com with any questions.
Was this page helpful?
YesNo
[Plans and Pricing](/guides/plans-and-pricing)[Handling Authentication](/guides/authentication)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.