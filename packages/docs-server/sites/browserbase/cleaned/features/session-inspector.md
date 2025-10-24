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
Session Inspector
On this page
 * [Session Replay and Metrics](#session-replay-and-metrics)
 * [Live Mode](#live-mode)
 * [Status Bar](#status-bar)
 * [Replay](#replay)
 * [Events and Pages](#events-and-pages)
 * [Stagehand 🤘](#stagehand-%F0%9F%A4%98)
 * [Logs](#logs)
 * [DOM View](#dom-view)
 * [Console logs](#console-logs)
 * [Network events](#network-events)
The Session Inspector is accessible from the Dashboard by clicking a Session item. This page provides all the tools to pinpoint possible problems like network issues, [anti-bot mechanisms](/features/stealth-mode), or asynchronous events resulting in mismatches of selectors.
## 
[​](#session-replay-and-metrics)
Session Replay and Metrics
A replay of each Session is featured in the Sessions page. This replay is a capture of the webpage, not a video, and can be inspected with your Chrome DevTools.
![](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/images/session-debugger/session.png?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=57b6dc11ebb6fbb8c3da403a9a456130)
Here are some key takeaways:
 * A high usage of memory or CPUs might result in longer runs and more billed minutes. Look at the logs or [open a Live Session URL](/reference/api/session-live-urls) to pinpoint the root issue.
 * In case of high [proxy](/features/stealth-mode) bandwidth usage, inspect the network requests using the Timeline described below.
Note that the replay length may not match the total session duration. This is because session timing starts when the browser begins running, while the replay recording only begins when the first page loads. The replay is a reconstruction of the DOM using [rrweb events](/features/session-replay#session-recordings).
### 
[​](#live-mode)
Live Mode
The Live Debug URL is a URL that can be used to inspect the Session in real-time. This allows for human-in-the-loop debugging, and can be used to debug the Session in real-time.
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/session-debugger/livedebugurl.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=8602305805d554e071b5e8e21c3438b8)
The `Copy Debug URL` button is available in the Session Inspector only when the a live Session is running.
![](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/images/session-debugger/runningstatus.png?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=88a5e5ba04ee5c04cffb57db91e64b93)
## 
[​](#status-bar)
Status Bar
The Status Bar at the top of the Session Inspector displays the status of the Session, and the reason for termination if it has been terminated.
![](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/images/session-debugger/status-bar.png?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=dcd20014ae4a9149e27a3d9656e352a8)
Here’s the information displayed in the Status Bar: Property | Description 
---|--- 
Session Id | The unique identifier of the Session 
Status | The status of the Session, and the reason for termination if it has been terminated 
Started | The date and time when the Session was started 
[Region](/guides/multi-region) | The region where the Session was run 
Duration | The length of the Session 
[Proxy Bandwidth](/features/stealth-mode) | The amount of data transferred through the proxy on the network tab (in MB) 
Settings | The settings used for the Session (e.g. `keepAlive` or `BrowserContext`) 
## 
[​](#replay)
Replay
The Replay view makes it easy to inspect the actions performed (ex: _select or click on an element_) and network requests, page by page:
![](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/images/session-debugger/replay.png?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=6a38cc188712948680b8523599dddbec)
The replay controls allow you to:
 * Adjust playback speed (0.5x, 1x, 2x, or 4x)
 * Navigate to specific points in the playback timeline
 * Pause and resume playback at any point
## 
[​](#events-and-pages)
Events and Pages
The Events view displays the events and pages that occurred during the Session.
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/session-debugger/eventspages.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=9d00a8514d6c426f95ea97c62d6f5646)
In the Events view, you’ll find:
 * A list of pages that were loaded during the Session
 * A list of current CDP events that occurred on each page (e.g. `Runtime.*`, `Page.*`, `Input.*`, and `Log.*` events)
 * A list of network requests and responses that occurred during the Session
## 
[​](#stagehand-%F0%9F%A4%98)
Stagehand 🤘
The Stagehand tab is an inspection tool for sessions created with [Stagehand](https://www.stagehand.dev/).
![](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/images/session-debugger/stagehandtab.jpeg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=2b4837d969c934c4342eebd7914ce40b)
To look deeper into each method call, you can click on a row to expand it.
![](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/images/session-debugger/stagehandrow.jpeg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0eefd278843ad7637181885551582990)
This view allows you to evaluate:
 * Token usage
 * Execution time
 * Extraction schemas
 * Execution results
On `extract` calls, you can utilize the schema language dropdown to select the format you want to view the schema in. By default, the schema is displayed in JSON. However, you have the option to view the schema in [Zod](https://zod.dev/) format. We’re working on adding more schema languages in the future.
![](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/images/session-debugger/stagehandextract.png?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=edcbbe882b7a7608f207ea947864c51d)
## 
[​](#logs)
Logs
The Logs tab features the raw [Chrome DevTools Protocol logs](https://chromedevtools.github.io/devtools-protocol/). The raw logs are rich, spanning over 2 main families of events:
### 
[​](#dom-view)
DOM View
([`DOM`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/)), describing in detail any actions and updates performed during Session
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/session-debugger/dom.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=bef3dabf59299985864a4318886865e3)
### 
[​](#console-logs)
Console logs
Logs emitted by the [Web Console API](https://developer.mozilla.org/en-US/docs/Web/API/console) (ex: `console.log()`), making debugging remote Sessions as easy as using your browser
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/session-debugger/console.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=f2939354616758b1e380bd2b4121524d)
Some example of console logs:
 * `browser-solving-started`
 * `browser-solving-completed`
 * `browserbase-keeping-connection-alive`
 * `Starting recording`
You’ll also be able to see other logs as expected from a browser, like `[DOM] Updated style of [body]` or `[Network] Request finished loading: GET "https://example.com/style.css"`
### 
[​](#network-events)
Network events
Network events ([`Network`](https://chromedevtools.github.io/devtools-protocol/tot/Network/)), describing in detail any network requests and responses performed during Session The Timeline also features logs emitted by the [Web Console API](https://developer.mozilla.org/en-US/docs/Web/API/console) (ex: `console.log()`), making debugging remote Sessions as easy as using your browser.
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/session-debugger/network.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=d77430e7e12b4c32e3a2eb79319f2db1)
Logs can also be retrieved using the [Sessions API](/reference/api/session-logs) for automated processing.
Was this page helpful?
YesNo
[Session Replay](/features/session-replay)[Downloads](/features/downloads)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.