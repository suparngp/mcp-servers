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
Live View
On this page
 * [Uses](#uses)
 * [Getting Started](#getting-started)
 * [Disconnect Message](#disconnect-message)
 * [Multitab](#multitab)
 * [Embed](#embed)
 * [Mobile](#mobile)
 * [Styling](#styling)
 * [Browser with Borders](#browser-with-borders)
 * [Hide the Navbar](#hide-the-navbar)
 * [Hide the Scrollbar](#hide-the-scrollbar)
 * [Common Errors & Issues](#common-errors-%26-issues)
On any running browser session - watch, click, type, and scroll in real-time.
* * *
## 
[​](#uses)
Uses
While Browserbase helps with [anti-bot mechanisms](/features/stealth-mode), scraping, and [reliable file downloads](/features/downloads) among other features, some scenarios remain challenging to fully automate for technical or data-privacy reasons. Live Views can be useful for:
 * Debugging and observability - watch everything happening live, or share with users or coworkers
 * Human in the loop - instantly take control or provide input
 * handle iframes - loaded content might be external or could change without notice, potentially leading to error conditions without human intervention
 * delegate credentials - give control to the end user
 * Embedding - use within an application (both desktop and mobile)
* * *
## 
[​](#getting-started)
Getting Started
Need help getting started? Check out our [Create a Browser Session](/fundamentals/create-browser-session) and [Using Browser Sessions](/fundamentals/using-browser-session) guides.
Also checkout our [Live Views API endpoint](/reference/api/session-live-urls).
Node.js
Python
Copy
Ask AI
```
const liveViewLinks = await bb.sessions.debug(session.id);
const liveViewLink = liveViewLinks.debuggerFullscreenUrl;
console.log(`🔍 Live View Link: ${liveViewLink}`);
```
### 
[​](#disconnect-message)
Disconnect Message
When the browser session ends, the live view will show this message:
![Live View Disconnect Message](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/live-view/disconnect.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=c5426f0ee027ad6664f8824183022ccf)
* * *
## 
[​](#multitab)
Multitab
Each tab has a unique live view url. The `pages` property contains all live view urls. We recommend listening to the [Playwright new tab event](https://playwright.dev/docs/pages#handling-new-pages) (or equivalent in other libraries) to trigger a request to get new live view urls when needed.
Node.js
Python
Copy
Ask AI
```
// Open a new tab and navigate to google
const newTab = await defaultContext.newPage();
newTab.goto("https://www.google.com");
// Get the live view links after the new tab is opened - then access the second tab
const liveViewLinks = await bb.sessions.debug(session.id);
const allTabs = liveViewLinks.pages;
const secondTabLiveViewLink = allTabs[1].debuggerFullscreenUrl;
console.log(`🔍 Second Tab Live View Link: ${secondTabLiveViewLink}`);
```
* * *
## 
[​](#embed)
Embed
In the frontend of your application, add the live view link to an iframe to embed it.
Read-only
Read/Write
Copy
Ask AI
```
<iframe
 src="{liveViewLink}"
 sandbox="allow-same-origin allow-scripts"
 allow="clipboard-read; clipboard-write"
 style="pointer-events: none;"
/>
```
### 
[​](#mobile)
Mobile
Show a mobile live view by setting a session’s [viewport and fingerprint parameters](/reference/api/create-a-session#body-browser-settings-viewport). For a complete list of supported viewports, see [here](/features/stealth-mode#supported-viewport-sizes).
Node.js
Python
Copy
Ask AI
```
// mobile fingerprint with standard android mobile dimensions
browserSettings: {
 fingerprint: {
 devices: ["mobile"],
 locales: ["en-US"],
 operatingSystems: ["android"],
 },
 viewport: { 
 width: 360,
 height: 800,
 },
},
// ...other session configuration options
```
To display a keyboard with a mobile live view, use libraries like [react-simple-keyboard](https://www.npmjs.com/package/react-simple-keyboard).
Mobile keyboards are not officially supported.
* * *
## 
[​](#styling)
Styling
### 
[​](#browser-with-borders)
Browser with Borders
Mimic a real browser with borders.
![Session Live View with Borders](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/live-view/with-border.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=5eb36d6662b9c3424f95ba6079e4eecc)
Node.js
Python
Copy
Ask AI
```
const liveViewLinks = await bb.sessions.debug(session.id);
const liveViewLink = liveViewLinks.debuggerUrl;
console.log(`🔍 Live View Link - with borders: ${liveViewLink}`);
```
### 
[​](#hide-the-navbar)
Hide the Navbar
The live view includes a navbar at the top, for additional context and navigation control. To maximize the visible area, or for integrating with a UI that already provides context, you can hide the navbar.
Node.js
Python
Copy
Ask AI
```
const hiddenNavbarUrl = `${liveViewLink}&navbar=false`;
```
### 
[​](#hide-the-scrollbar)
Hide the Scrollbar
 * JavaScript
 * Python
Playwright/Puppeteer
Selenium
Copy
Ask AI
```
// Navigate to the page
await page.goto("https://news.ycombinator.com/");
// Hide the scrollbar
await page.evaluate(() => {
 const style = document.createElement("style");
 style.textContent = `::-webkit-scrollbar { display: none; }`;
 document.head.appendChild(style);
});
```
* * *
## 
[​](#common-errors-%26-issues)
Common Errors & Issues
 1. **Blank or Empty Window** We may be on another tab. Check if there are multiple tabs open either via [the web session inspector](/features/session-inspector) or [the pages list](#multitab).
 2. **Lag** Check out our [performance guide](/guides/speed-optimization).
 3. **Looks Off** Often bugs from a rendering headless browser - some bugs may be amenable to directly adjusting css styling, for example through `page.evaluate()`.
 4. **Lost Connection** If the live view loses its connection to the browser, the iframe will post a message to the window warning you of the new state.
JavaScript
Copy
Ask AI
```
window.addEventListener("message", function (event) {
 if (event.data === "browserbase-disconnected") {
 console.log("Message received from iframe:", event.data);
 // Handle the disconnection logic / new state
 }
});
```
Was this page helpful?
YesNo
[Proxies](/features/proxies)[Viewports](/features/viewports)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.