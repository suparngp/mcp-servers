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
Improving Performance
On this page
 * [Overview](#overview)
 * [Architectural Performance Patterns](#architectural-performance-patterns)
 * [Decrease round trip time (RTT) by running browsers in your region.](#decrease-round-trip-time-rtt-by-running-browsers-in-your-region)
 * [Implement parallel processing.](#implement-parallel-processing)
 * [Parallelize session creation with app initialization.](#parallelize-session-creation-with-app-initialization)
 * [Choose the right runtime environment.](#choose-the-right-runtime-environment)
 * [Follow your framework’s best practices.](#follow-your-framework%E2%80%99s-best-practices)
 * [Browser Session Configuration & Optimizations](#browser-session-configuration-%26-optimizations)
 * [Avoid using multi tab browser sessions.](#avoid-using-multi-tab-browser-sessions)
 * [Disable CSS, images, JavaScript, and other unwanted assets.](#disable-css%2C-images%2C-javascript%2C-and-other-unwanted-assets)
 * [Optimize page loading with waitUntil option](#optimize-page-loading-with-waituntil-option)
 * [Variable-Sized Browsers (Beta)](#variable-sized-browsers-beta)
## 
[​](#overview)
Overview
There are lots of best practices for optimizing performance. You’ll see these ideas throughout the docs when relevant, but they’re combined here in summary. The optimizations fall into two sections:
 1. **Architecture & Implementation optimizations**
 2. **Browser Session configuration & optimizations**
## 
[​](#architectural-performance-patterns)
Architectural Performance Patterns
### 
[​](#decrease-round-trip-time-rtt-by-running-browsers-in-your-region)
Decrease round trip time (RTT) by running browsers in your region.
When prototyping locally, the round trip latency of the request minus execution time (the round trip time) is much shorter than when hosted. This is especially true when factoring in nonlocal capabilities like captcha solving or proxies. Also, keep in mind that each interaction with the page, even ones that seem atomic, can result in several underlying CDP commands, increasing the RTT. Using browser sessions geographically close to where you deploy your code reduces round trip time. Region localizing may produce an 8-9x gain in performance without code changes.
To learn more about running region-localized sessions, check out our [multi-region guide](/guides/multi-region).
### 
[​](#implement-parallel-processing)
Implement parallel processing.
When using Browserbase to run jobs, increase speeds by parallelizing your job processing. If you process the work concurrently, tasks can run in parallel, completing faster. Both Node.js and Python have support for parallel processing. Here’s a Python example to illustrate:
Python
Copy
Ask AI
```
# SLOWER -- processes elements sequentially
# for an_html_element in html_elements:
# await get_element_text(an_html_element)
# FASTER -- processes elements in parallel
await asyncio.gather(
 *(get_element_text(an_html_element) for an_html_element
 in html_elements)
)
```
### 
[​](#parallelize-session-creation-with-app-initialization)
Parallelize session creation with app initialization.
Similarly, if your app has setup steps to do prior to processing work, you can parallelize session creation with that work. During initialization, use the [Sessions API](/reference/api/create-a-session). This effectively eliminates some or all of the perceived clock time for creating the new session.
### 
[​](#choose-the-right-runtime-environment)
Choose the right runtime environment.
Try comparing performance across implementation languages & runtimes. You may discover through testing your app that Node.js outperforms Python in raw speed for I/O bound requests, whereas Python may be a better choice for CPU-bound tasks.
### 
[​](#follow-your-framework%E2%80%99s-best-practices)
Follow your framework’s best practices.
## [Stagehand](https://docs.stagehand.dev/get_started/best_practices)## [Playwright](https://playwright.dev/docs/intro)## [Puppeteer](https://www.bannerbear.com/blog/6-pro-tips-for-optimizing-web-automation-using-puppeteer/)## [Selenium](https://www.selenium.dev/documentation/test_practices/encouraged/)
## 
[​](#browser-session-configuration-%26-optimizations)
Browser Session Configuration & Optimizations
### 
[​](#avoid-using-multi-tab-browser-sessions)
Avoid using multi tab browser sessions.
We support browser sessions with multiple tabs, but depending on the workload, you will likely begin to notice worse performance with more tabs. We don’t recommend this approach. You’ll get better performance by using multiple single tab browser sessions instead.
### 
[​](#disable-css%2C-images%2C-javascript%2C-and-other-unwanted-assets)
Disable CSS, images, JavaScript, and other unwanted assets.
If you don’t need it, don’t request it. Optimizing this should speed up your page downloads. Here’s a Playwright example in JavaScript showing how to intercept the request to block image, CSS, and JavaScript requests:
Node.js
Copy
Ask AI
```
// Enable request interception
await page.route('**/*', route => {
 if (
 route.request().resourceType() === 'image' ||
 route.request().resourceType() === 'stylesheet' ||
 route.request().resourceType() === 'script'
 ) {
 route.abort();
 } else {
 route.continue();
 }
});
```
### 
[​](#optimize-page-loading-with-waituntil-option)
Optimize page loading with `waitUntil` option
You can optimize page loading by configuring the `waitUntil` option when navigating to a page. Using the `domcontentloaded` event instead of the default `load` setting can significantly improve load speed:
Node.js
Copy
Ask AI
```
await page.goto("https://example.com", { waitUntil: "domcontentloaded" });
```
This instructs the browser to mark the page as “loaded” once the initial HTML document is fully parsed, without waiting for external resources like stylesheets, images, and frames. This approach can significantly reduce perceived load times, particularly for content-heavy pages.
## 
[​](#variable-sized-browsers-beta)
Variable-Sized Browsers (Beta)
Variable-Sized Browsers can unlock improvements for your workflows—but should be used after trying core optimizations like region selection, blocking resources, and fine tuned optimizations. Once you’ve refined those, upgrading the browser size is a powerful next step. You can now choose the processing power behind each browser with Variable-Sized Browsers:
 * `small` - Default option for most workflows
 * `medium` - Great for faster page execution or moderate compute loads
 * `large` - Ideal for resource-intensive sites or heavy scripts
This feature is currently in waitlist-only beta. Join the waitlist [here](https://www.browserbase.com/website/contact?source=waitlist).
Was this page helpful?
YesNo
[Automated Tests](/use-cases/building-automated-tests)[Optimizing Cost](/guides/cost-optimization)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.