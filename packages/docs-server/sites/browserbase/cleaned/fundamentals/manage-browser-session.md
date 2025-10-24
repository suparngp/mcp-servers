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
Manage a Browser Session
On this page
 * [Session Termination](#session-termination)
 * [Session Timeout Settings](#session-timeout-settings)
 * [Debugging Completed Sessions](#debugging-completed-sessions)
 * [Measuring Usage](#measuring-usage)
While Browserbase automatically handles session termination when you disconnect, understanding how sessions end helps you debug failed runs, manage long-running sessions, optimize resource usage, and investigate timeouts or errors.
## 
[​](#session-termination)
Session Termination
Browser sessions can end in these ways:
 1. **Automatic Timeout** Sessions have a default timeout configured at the project level, which can be customized when creating a session. For longer-running tasks, enable [keep alive](/guides/long-running-sessions).
 2. **Manual Termination** You can end sessions explicitly by closing the browser programmatically (`browser.close()` or `driver.quit()`), using the Sessions API, or releasing keep-alive sessions when no longer needed.
 3. **Unhandled Errors** Unhandled errors in your automation code can cause your script to disconnect from the browser, ending the session prematurely. Common scenarios include network interruptions, uncaught exceptions, or exceeded resource limits. To prevent premature termination, make sure to implement proper error handling and cleanup in your code.
## 
[​](#session-timeout-settings)
Session Timeout Settings
Configure timeouts at two levels: **Project Level** Set the default timeout for all sessions in your [project settings](https://browserbase.com/settings). This acts as the fallback when no session-specific timeout is set. **Session Level** Override the project timeout for specific sessions when [creating them](/fundamentals/create-browser-session#configuration-options). This gives you fine-grained control over individual session durations.
## 
[​](#debugging-completed-sessions)
Debugging Completed Sessions
The [Session Inspector](/features/session-inspector) is your primary tool for analyzing completed sessions. It provides comprehensive debugging capabilities:
## [Session Replay Record and replay browser activity to understand what happened ](/features/session-replay)## [Network Monitor Inspect HTTP traffic, responses, and timing ](/features/session-inspector#network)## [Console & Logs Review JavaScript output and debug messages ](/features/session-inspector#console)## [Performance Track CPU, memory usage, and other metrics ](/features/session-inspector#performance)
## 
[​](#measuring-usage)
Measuring Usage
Track and analyze your browser session usage through multiple interfaces: **Dashboard** Your central hub at [browserbase.com/overview](https://browserbase.com/overview) shows total browser minutes, active sessions, usage trends, and billing information. **Sessions List** Browse your session history at [browserbase.com/sessions](https://browserbase.com/sessions) to view duration, status, and resource consumption for individual sessions. For programmatic access to these metrics, see the [Measuring Usage Guide](/guides/measuring-usage).
Was this page helpful?
YesNo
[Using a Browser Session](/fundamentals/using-browser-session)[Stealth Mode](/features/stealth-mode)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.