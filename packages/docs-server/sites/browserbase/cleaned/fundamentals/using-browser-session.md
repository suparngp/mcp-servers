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
Fundamentals
Using a Browser Session
On this page
 * [Connecting to a Session](#connecting-to-a-session)
 * [Connection Best Practices](#connection-best-practices)
 * [Controlling the Browser](#controlling-the-browser)
 * [Browserbase Features](#browserbase-features)
 * [Live View](#live-view)
 * [Session Inspector](#session-inspector)
 * [Embedded View](#embedded-view)
 * [Ending Your Session](#ending-your-session)
## 
[​](#connecting-to-a-session)
Connecting to a Session
Once you [create a session](/fundamentals/create-browser-session), you’ll receive a connection URL that you can use with your preferred automation framework. Here’s how to connect using our supported frameworks:
 * Node.js
 * Python
Stagehand
Playwright
Puppeteer
Selenium
Copy
Ask AI
```
import { Browserbase } from "@browserbasehq/sdk";
const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
// Create a session
const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID
});
// Connect and automate
const browser = await bb.connect(session.id);
```
### 
[​](#connection-best-practices)
Connection Best Practices
 1. **Connection Timeout** - You have 5 minutes to connect to a newly created session before it terminates. To prevent timeouts:
 * Connect promptly after creation
 * Enable [keep alive](/guides/long-running-sessions) for sessions that need to persist
 * Use the connection URL immediately after receiving it
 2. **Use Default Context** - Always use the default context and page when possible to ensure proper functionality of stealth features:
 * Node.js
 * Python
Stagehand
Playwright
Puppeteer
Selenium
Copy
Ask AI
```
const page = await browser.newPage(); // Uses default context automatically
```
## 
[​](#controlling-the-browser)
Controlling the Browser
Once connected, use your preferred framework’s APIs to control the browser. Each framework has its own methods for navigation, interaction, and automation.
## [Stagehand Build reliable browser automation with AI-powered element selection and self-healing scripts ](https://docs.stagehand.dev/)## [Playwright Create fast, reliable end-to-end tests with built-in auto-waiting and mobile emulation ](https://playwright.dev/)## [Puppeteer Headless Chrome automation with a lightweight API and strong DevTools integration ](https://pptr.dev/)## [Selenium Industry-standard testing framework supporting all major browsers and programming languages ](https://www.selenium.dev)
### 
[​](#browserbase-features)
Browserbase Features
When running browsers in the cloud, certain operations require special handling through our APIs:
## [File Downloads Securely retrieve files from your cloud browser session ](/features/downloads)## [Screenshots Capture high-quality browser screenshots with custom settings ](/features/screenshots)## [PDF Generation Create PDFs with advanced formatting options ](/features/screenshots#pdfs)## [File Upload Transfer files directly to your browser session ](/features/uploads)
### 
[​](#live-view)
Live View
The Live View feature gives you real-time visibility into your browser sessions through two powerful interfaces:
#### 
[​](#session-inspector)
Session Inspector
The [Session Inspector](/features/session-inspector) provides real-time debugging capabilities:
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/getting-started/live_inspector.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=4f91e77cd6749399ad9723c7f63fd77c)
Monitor your session’s activity with:
 * Live browser state and interactions
 * Real-time network requests and responses
 * Console output and error tracking
 * Performance metrics and resource usage
 * Session recording and replay
#### 
[​](#embedded-view)
Embedded View
Integrate the [Live View](/features/session-live-view) directly into your application to show your users their automated browser sessions in real-time. The Live View enables remote control over the browser, unlocking human-in-the-loop possibilities to handle authentication, captcha, or unexpected errors.
## 
[​](#ending-your-session)
Ending Your Session
While Browserbase automatically handles session termination when you disconnect, understanding how sessions end is important. For more details about session termination, timeouts, and best practices for managing session lifecycle, see [Manage a Browser Session](/fundamentals/manage-browser-session).
Was this page helpful?
YesNo
[Create a Browser Session](/fundamentals/create-browser-session)[Manage a Browser Session](/fundamentals/manage-browser-session)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.