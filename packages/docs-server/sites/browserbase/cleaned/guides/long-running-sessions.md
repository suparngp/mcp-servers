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
Long Running Sessions
On this page
 * [How are sessions terminated?](#how-are-sessions-terminated%3F)
 * [Why keep sessions alive?](#why-keep-sessions-alive%3F)
 * [Keep Alive Sessions](#keep-alive-sessions)
 * [Create a Keep Alive Session](#create-a-keep-alive-session)
 * [Stop a Keep Alive Session](#stop-a-keep-alive-session)
 * [Session Timeouts](#session-timeouts)
 * [Custom session timeout](#custom-session-timeout)
 * [Related Guides](#related-guides)
## 
[​](#how-are-sessions-terminated%3F)
How are sessions terminated?
By default, Browserbase sessions automatically terminate in two scenarios:
 1. When a developer disconnects from the session
 2. When the session reaches its default timeout period
This behavior is designed to optimize session management and resource utilization. However, in certain scenarios, you may need to maintain a session for an extended period. We introduced session keep alive and custom timeout to address this need. Property | Description 
---|--- 
**Keep Alive** | Allowing you to reconnect to the same session after a disconnect 
**Custom Timeout** | Extending the lifetime of a session beyond its default timeout period 
Session keep alive is only available on paid plans.
## 
[​](#why-keep-sessions-alive%3F)
Why keep sessions alive?
Custom timeouts and session keep alive supports a broad spectrum of use cases. Key benefits include:
 * Avoid interrupting long-running tasks and workflows.
 * Connect, disconnect, and reconnect to the same session.
 * Keep working with a session without worrying about it timing out.
 * Reusing existing sessions is more performant than creating new ones.
## 
[​](#keep-alive-sessions)
Keep Alive Sessions
The `keepAlive` feature allows you to keep sessions alive across disconnects, permitting you to continue using it as long as needed.
### 
[​](#create-a-keep-alive-session)
Create a Keep Alive Session
Setting `keepAlive` to `true` will keep the session available for later use. You can reconnect to the keep alive session using the same connection URL as the original session. Let’s walk through an example of how to keep a session alive:
 * Node.js
 * Python
SDK
Copy
Ask AI
```
const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 keepAlive: true,
});
```
Next time we run the script, we’ll be able to reconnect to the same session after a disconnect. This enables us to reuse the same session for multiple runs.
### 
[​](#stop-a-keep-alive-session)
Stop a Keep Alive Session
In order to stop the session, use the Browserbase API or the SDK as shown here:
 * Node.js
 * Python
SDK
API
Copy
Ask AI
```
import Browserbase from "browserbase";
const BROWSERBASE_API_KEY = process.env.BROWSERBASE_API_KEY!;
const BROWSERBASE_PROJECT_ID = process.env.BROWSERBASE_PROJECT_ID!;
const bb = new Browserbase({
 apiKey: BROWSERBASE_API_KEY,
});
// Create a session with keep alive set.
// Then, end it by closing it.
(async () => {
 const session = await bb.sessions.create({
 keepAlive: true,
 projectId: BROWSERBASE_PROJECT_ID,
 });
 await bb.sessions.update(session.id, {
 status: "REQUEST_RELEASE",
 projectId: BROWSERBASE_PROJECT_ID,
 });
})();
```
We recommend that you stop your keep alive sessions explicitly when no longer needed. They will time out eventually, but you may be charged for the unneeded browser minutes used.
## 
[​](#session-timeouts)
Session Timeouts
After the script is past the default timeout, we’ll see a `TimeoutError`: `Timeout _____ms exceeded` Browserbase has a project wide settings for session timeout. We can change to session timeout project wide to a different value in the toggle.
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/long-running-sessions/defaulttimeout.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=d3961ec954c993aa99735ca3bf0e472d)
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/long-running-sessions/toggle.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=be3ed147f0ea4bfa4b48f901aeb0a500)
### 
[​](#custom-session-timeout)
Custom session timeout
We can also set a custom timeout for a created session through code. If you’d like to set a custom timeout that isn’t shown in the toggle, you can set a custom timeout in the `createSession` function. To set a custom timeout for your session, specify the `timeout` option in the API request body or with the SDK.
 * Node.js
 * Python
SDK
API
Copy
Ask AI
```
import Browserbase from "browserbase";
const BROWSERBASE_API_KEY = process.env.BROWSERBASE_API_KEY!;
const BROWSERBASE_PROJECT_ID = process.env.BROWSERBASE_PROJECT_ID!;
const bb = new Browserbase({
 apiKey: BROWSERBASE_API_KEY,
});
// Creates a session with a timeout of 3600 seconds
(async () => {
 const session = await bb.sessions.create({
 timeout: 3600,
 });
})();
```
Here the timeout has been set to 3600 seconds (1 hour), overriding the default. That means that unless explicitly closed beforehand, the session will continue running for an hour before terminating. At disconnect, it will end. Setting a custom timeout won’t keep the session alive after disconnecting. To allow reconnecting to a session after disconnecting, it needs to be configured for keep alive.
The maximum duration of a session is 6 hours. Once a session times out, it can no longer be used.
## 
[​](#related-guides)
Related Guides
## [Creating a Session Learn how to create a session with Browserbase ](/fundamentals/create-browser-session)## [Browser Contexts Persist cookies and session data across multiple sessions ](/features/contexts)## [Session Inspector Watch your session in real time and debug issues after the session has ended ](/features/session-inspector)
Was this page helpful?
YesNo
[Optimizing Cost](/guides/cost-optimization)[Browser Regions](/guides/multi-region)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.