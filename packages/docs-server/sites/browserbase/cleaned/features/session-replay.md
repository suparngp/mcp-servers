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
Session Replay
On this page
 * [Overview](#overview)
 * [Install the Browserbase SDK](#install-the-browserbase-sdk)
 * [Create your script to record a session and view the replay](#create-your-script-to-record-a-session-and-view-the-replay)
 * [Run the script](#run-the-script)
 * [Session Replay and Metrics](#session-replay-and-metrics)
 * [Timeline](#timeline)
 * [DOM](#dom)
 * [Console Logs](#console-logs)
 * [Network Events](#network-events)
 * [HAR Recording](#har-recording)
 * [Recording HAR Files](#recording-har-files)
 * [Analyzing HAR Files](#analyzing-har-files)
 * [Understanding HAR Data](#understanding-har-data)
 * [Session Logs](#session-logs)
 * [Session Recordings](#session-recordings)
 * [Retrieve Session Recordings](#retrieve-session-recordings)
 * [Integrating the Recording Player](#integrating-the-recording-player)
 * [Using the rrweb Player Component](#using-the-rrweb-player-component)
 * [Using an Iframe Container](#using-an-iframe-container)
 * [Working with Session Events](#working-with-session-events)
 * [Multitab Workflows](#multitab-workflows)
 * [Debugging Replays](#debugging-replays)
 * [rrweb vs video](#rrweb-vs-video)
 * [Debugging Options](#debugging-options)
## 
[​](#overview)
Overview
Session Replays are one of the most powerful features of Browserbase. It allows you to replay a Session to inspect the actions performed and network requests, page by page. To learn more about how Session Replays works, we’ll walk through a quickstart guide to understand how Session Replays can be involved in your development workflow. Let’s get started in viewing your first session replay immediately.
### 
[​](#install-the-browserbase-sdk)
Install the Browserbase SDK
 * Node.js
 * Python
npm
pnpm
yarn
Copy
Ask AI
```
npm install @browserbasehq/sdk tsx
```
### 
[​](#create-your-script-to-record-a-session-and-view-the-replay)
Create your script to record a session and view the replay
Use your ideal framework to connect to a Browserbase session, navigate to the page you want to record, and then close the session.
 * Node.js
 * Python
Playwright
Puppeteer
Selenium
Copy
Ask AI
```
import { chromium } from "playwright-core";
import Browserbase from "@browserbasehq/sdk";
if (!process.env.BROWSERBASE_API_KEY || !process.env.BROWSERBASE_PROJECT_ID) {
 throw new Error("Missing required environment variables");
}
const BROWSERBASE_PROJECT_ID = process.env.BROWSERBASE_PROJECT_ID;
const BROWSERBASE_API_KEY = process.env.BROWSERBASE_API_KEY;
const bb = new Browserbase({
 apiKey: BROWSERBASE_API_KEY,
});
(async () => {
 // Create a new session
 const session = await bb.sessions.create({
 projectId: BROWSERBASE_PROJECT_ID,
 });
 // Connect to the session
 const browser = await chromium.connectOverCDP(session.connectUrl);
 // Getting the default context to ensure the sessions are recorded.
 const defaultContext = browser.contexts()[0];
 const page = defaultContext?.pages()[0];
 // Navigate to the Browserbase docs and wait for 10 seconds
 await page.goto("https://docs.browserbase.com/introduction");
 await page.waitForTimeout(10000);
 await page.close();
 await browser.close();
 // Log the session replay URL
 console.log(
 `Session complete! View replay at https://browserbase.com/sessions/${session.id}`,
 );
})().catch((error) => console.error(error.message));
```
### 
[​](#run-the-script)
Run the script
 * Node.js
 * Python
Copy
Ask AI
```
npx tsx index.ts
```
You should see this output in your terminal:
Copy
Ask AI
```
Session complete! View replay at https://browserbase.com/sessions/${session.id}
```
## 
[​](#session-replay-and-metrics)
Session Replay and Metrics
A replay of each Session is featured in the Sessions page. This replay is a capture of the webpage, not a video, and can be inspected with your Chrome DevTools.
![](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/images/session-debugger/session.png?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=57b6dc11ebb6fbb8c3da403a9a456130)
Here are some key takeaways:
 * A high usage of memory or CPUs might result in longer runs and more billed minutes. Look at the logs or [open a Live Session URL](/reference/api/session-live-urls) to pinpoint the root issue.
 * In case of high [proxy](/features/stealth-mode) bandwidth usage, inspect the network requests using the Timeline described below.
Note that the replay length may not match the total session duration. This is because session timing starts when the browser begins running, while the replay recording only begins when the first page loads. The replay is a reconstruction of the DOM using [rrweb events](/features/session-replay#using-the-rrweb-player-component).
## 
[​](#timeline)
Timeline
The Timeline is simply a replay of the session that was ran. Like mentioned above, the replay is a reconstruction of the DOM using [rrweb events](/features/session-replay#retrieve-session-recordings).
![](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/images/session-debugger/timeline.png?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=50454c065dfeb2b91ffe5e02d4610dc5)
## 
[​](#dom)
DOM
The DOM tab shows a live representation of the webpage’s HTML structure during the session. You can inspect the Document Object Model [DOM](https://chromedevtools.github.io/devtools-protocol/tot/DOM/) to see the exact state of elements, their attributes, and how they’re nested within the page.
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/session-debugger/dom.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=bef3dabf59299985864a4318886865e3)
## 
[​](#console-logs)
Console Logs
Logs emitted by the [Web Console API](https://developer.mozilla.org/en-US/docs/Web/API/console) (ex: `console.log()`), making debugging remote Sessions as easy as using your browser
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/session-debugger/console.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=f2939354616758b1e380bd2b4121524d)
Some example of console logs:
 * `browser-solving-started`
 * `browser-solving-completed`
 * `browserbase-keeping-connection-alive`
 * `Starting recording`
You’ll also be able to see other logs as expected from a browser, like `[DOM] Updated style of [body]` or `[Network] Request finished loading: GET "https://example.com/style.css"`
## 
[​](#network-events)
Network Events
Network events ([`Network`](https://chromedevtools.github.io/devtools-protocol/tot/Network/)), describing in detail any network requests and responses performed during Session The Timeline also features logs emitted by the [Web Console API](https://developer.mozilla.org/en-US/docs/Web/API/console) (ex: `console.log()`), making debugging remote Sessions as easy as using your browser.
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/session-debugger/network.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=d77430e7e12b4c32e3a2eb79319f2db1)
Logs can also be retrieved using the [Sessions API](/reference/api/session-logs) for automated processing.
## 
[​](#har-recording)
HAR Recording
HAR (HTTP Archive) files capture detailed network activity during your browser sessions. You can record HAR files using Playwright’s tracing feature, which provides comprehensive network data that can be analyzed or replayed.
### 
[​](#recording-har-files)
Recording HAR Files
To record network activity as HAR data, use Playwright’s tracing functionality:
 * Node.js
 * Python
Playwright
Copy
Ask AI
```
import { chromium } from "playwright-core";
import Browserbase from "@browserbasehq/sdk";
const PROJECT_ID = process.env.BROWSERBASE_PROJECT_ID;
const API_KEY = process.env.BROWSERBASE_API_KEY;
const bb = new Browserbase({
 apiKey: API_KEY,
});
const session = await bb.sessions.create({
 projectId: PROJECT_ID,
});
console.log("Starting remote browser...");
const browser = await chromium.connectOverCDP(session.connectUrl);
const defaultContext = browser.contexts()[0];
const page = defaultContext.pages()[0];
// Start HAR recording using routeFromHAR
console.log("Starting HAR recording...");
const harFile = `recording-${Date.now()}.har`;
await defaultContext.routeFromHAR(harFile, {
 url: "**/*",
 update: true,
 updateContent: "embed",
 updateMode: "full"
});
// Also start tracing to capture network activity locally
await defaultContext.tracing.start({
 screenshots: true,
 snapshots: true,
 sources: true
});
await page.goto("https://news.ycombinator.com/", {
 waitUntil: "domcontentloaded",
});
// Navigate to additional pages to capture more network data
await page.click('a[href*="item"]');
await page.waitForLoadState("domcontentloaded");
await page.goBack();
await page.waitForLoadState("domcontentloaded");
// Stop tracing and save the trace file
const traceFile = `trace-${Date.now()}.zip`;
await defaultContext.tracing.stop({ path: traceFile });
console.log(`Trace file saved as: ${traceFile}`);
await page.close();
await browser.close();
console.log(`HAR file saved as: ${harFile}`);
console.log(`Session complete! View replay at https://browserbase.com/sessions/${session.id}`);
```
### 
[​](#analyzing-har-files)
Analyzing HAR Files
The trace file contains network activity that can be viewed and analyzed:
 1. **View in Playwright Trace Viewer** : Use `npx playwright show-trace trace-file.zip` to view the captured network activity
 2. **Extract Network Data** : The trace file contains detailed network requests, responses, and timing information
 3. **Replay Network Activity** : Use the HAR data to replay network interactions for testing and debugging
### 
[​](#understanding-har-data)
Understanding HAR Data
HAR files capture:
 * **Network Requests** : All HTTP requests made during the session
 * **Response Data** : Complete response bodies and headers
 * **Timing Information** : Detailed timing for each network operation
 * **Performance Metrics** : Network performance and loading times
When using Browserbase’s remote browsers, HAR files created with `routeFromHAR` are stored on the remote instance. Use tracing to capture network data locally for analysis.
## 
[​](#session-logs)
Session Logs
Session logs contain detailed information captured during a Browserbase session. This includes browser events, network requests, and other runtime data. These logs provide insights into what occurred during the session’s execution. To retrieve the logs of a session, you can use the [Sessions API](/reference/api/session-logs) or the `logs.list()` method in the Browserbase SDK.
 * Node.js
 * Python
Copy
Ask AI
```
// Get the session logs for the given session id
const logs = await bb.sessions.logs.list(session.id);
console.log(logs);
```
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/session-debugger/eventspages.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=9d00a8514d6c426f95ea97c62d6f5646)
These logs retrieved using the Browserbase SDK are the same as the ones featured in the Events tab of the Session Replay.
## 
[​](#session-recordings)
Session Recordings
Session recordings provide a representation of the session’s data, unique id, timestamp, and type of session. You can learn more about session recordings with events in the [rrweb documentation](https://github.com/rrweb-io/rrweb/blob/master/docs/recipes/dive-into-event.md).
### 
[​](#retrieve-session-recordings)
Retrieve Session Recordings
Let’s say you have a session ID and you want to retrieve the recordings for that session. You can do so by using the `recording.retrieve()` method in the Browserbase SDK.
 * Node.js
 * Python
Copy
Ask AI
```
// Get the session replay for the given session id
const replay = await bb.sessions.recording.retrieve(session.id);
console.log(replay);
```
### 
[​](#integrating-the-recording-player)
Integrating the Recording Player
Often times, you’ll want to integrate a recording player in your application. This is a simple process that can be done in a few steps. Since session recordings are a culmination of rrweb events captured during the session, you can integrate a recording player into your application to replay these events.
![](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/images/session-debugger/recordingplayer.png?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=c65b8b61bf52fb26e2ba3b726dd0064c)
### 
[​](#using-the-rrweb-player-component)
Using the rrweb Player Component
If using a frontend framework like Next.js, you can use the `rrwebPlayer` component for displaying the session replay in your application. You can create a reusable component that accepts session recording events as props and renders the rrweb player:
Copy
Ask AI
```
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";
// Initialize the player with your session recording
new rrwebPlayer({
 target: document.body,
 props: {
 events: recording.events,
 width: 1024,
 height: 576,
 },
});
```
### 
[​](#using-an-iframe-container)
Using an Iframe Container
For simpler integrations, you can embed the recording player in an iframe as well:
Copy
Ask AI
```
<iframe
 src="/replay/${sessionId}"
 width="100%"
 height="600px"
 frameborder="0"
 allow="fullscreen"
></iframe>
```
The iframe approach requires you to host a separate page that initializes the rrweb player. Make sure to handle proper session authentication and access control.
### 
[​](#working-with-session-events)
Working with Session Events
You can use the `events` prop to pass session recording events to the rrweb player:
Copy
Ask AI
```
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";
new rrwebPlayer({
 target: document.body,
 props: {
 events: recording.events,
 width: 1024, // Player width in pixels
 height: 576, // Player height in pixels
 skipInactive: true, // Skip inactive time periods
 showController: true, // Show playback controls
 autoPlay: false, // Start playing automatically
 },
});
```
The player emits events you can listen to, including ‘play’, ‘pause’, and ‘finish’ events that help you track the playback state:
Copy
Ask AI
```
const player = new rrwebPlayer({
 target: document.body,
 props: { events: recording.events },
});
player.addEventListener("play", () => console.log("Started"));
player.addEventListener("pause", () => console.log("Paused"));
player.addEventListener("finish", () => console.log("Finished"));
// Control playback
player.goto(5000); // Jump to 5 seconds
const currentTime = player.getCurrentTime();
```
Always be sure to destroy the player when it is no longer needed:
Copy
Ask AI
```
player.destroy();
```
## 
[​](#multitab-workflows)
Multitab Workflows
Our browser recording feature is only designed for single tab workflows. In multi-tab environments, replays are unreliable as recording events can collide.
For multi-tab recordings, we recommend capturing [screenshots](/features/screenshots) as you go, and stitching them together as a video or gif. Alternatively, we support multiple tab workflows with our [Live View](/features/session-live-view#multitab).
## 
[​](#debugging-replays)
Debugging Replays
### 
[​](#rrweb-vs-video)
rrweb vs video
Session Replays aren’t video files. Rather, we use a history of the DOM to rebuild your session - like hydrating a session at replay-time. This lightweight approach is how we’re able to offer session replays for free. However, this live rebuild has caveats:
 * Some dynamic or obfuscated content (like iframes) might look different in the replay than during the session
 * Skipping around the replay timeline might introduce glitches (we have playback speed controls to help)
 * If the replay checks the geolocation, it will show the current IP address, not the IP address used during the session
 * Multiple tabs aren’t supported
### 
[​](#debugging-options)
Debugging Options
If the session did not record properly, two options are:
 1. Run the session again
 2. Use our [Live View](/features/session-live-view) for real-time debugging
Other helpful points to keep in mind while debugging:
 * Recordings are available about 30 seconds after session close
 * Recordings are disabled on a few sites, like Opentable and the Salesforce family of sites
Questions or stuck? Contact us anytime at support@browserbase.com 🅱️
Was this page helpful?
YesNo
[Viewports](/features/viewports)[Session Inspector](/features/session-inspector)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.