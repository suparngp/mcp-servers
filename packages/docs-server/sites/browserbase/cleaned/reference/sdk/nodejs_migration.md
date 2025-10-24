[Skip to main content](#content-area)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
 * [Documentation](/introduction/what-is-browserbase)
 * [APIs and SDKs](/reference/introduction)
 * [Changelog](https://www.browserbase.com/changelog)
##### Overview
 * [Introduction](/reference/introduction)
##### SDKs
 * [Overview](/reference/sdk/overview)
 * [Node.js SDK](/reference/sdk/nodejs)
 * [Python SDK](/reference/sdk/python)
##### APIs
 * [Overview](/reference/api/overview)
 * Sessions API
 * Projects API
 * Contexts API
 * Extensions API
 * Support
 * [Dashboard](https://www.browserbase.com/overview)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
Search...
Navigation
Migration Guide
On this page
 * [Breaking Changes](#breaking-changes)
 * [Deleted Methods](#deleted-methods)
 * [Updates to Common Workflows](#updates-to-common-workflows)
 * [Create Session](#create-session)
 * [Get Connect URL](#get-connect-url)
 * [Complete Session](#complete-session)
 * [Reference for other methods](#reference-for-other-methods)
 * [List Sessions](#list-sessions)
 * [Get Session](#get-session)
 * [Get Session Recording](#get-session-recording)
 * [Get Session Downloads](#get-session-downloads)
 * [Get Debug Connection URLs](#get-debug-connection-urls)
 * [Get Session Logs](#get-session-logs)
The Browserbase v2 Node.js SDK has been rewritten from the ground up and ships with a ton of new features and better support that we can’t wait for you to try. This guide is designed to help you maximize your experience with v2. We hope this guide is useful to you; if you have any questions don’t hesitate to reach out to us at support@browserbase.com or by [creating a new issue](https://github.com/browserbase/sdk-node/issues/new). We’ve written out specific guidelines on how to migrate each v1 method to v2 below. v2 also adds one-to-one mappings for every API endpoint, so you can incorporate new Browserbase features in your codebase with much less lift.
## 
[​](#breaking-changes)
Breaking Changes
The v2 SDK is more flexible, easier to use, and has a more consistent API. It is also a lot more modular, meaning the majority of function calls have changed from `browserbase.$thing$Do()` to `browserbase.$thing.$do()`. For example:
Copy
Ask AI
```
// v1 SDK
await browserbase.listSessions();
// v2 SDK
await bb.sessions.list();
```
### 
[​](#deleted-methods)
Deleted Methods
`load`, `loadUrl`, and `screenshot` have been fully removed in the v2 SDK. You can use the following example instead that encapsulates the same functionality using Playwright:
Copy
Ask AI
```
import { chromium } from "playwright-core";
import { Browserbase } from "@browserbasehq/sdk";
const bb = new Browserbase({
 apiKey: process.env.BROWSERBASE_API_KEY!,
});
async function run() {
 // Create a session on Browserbase
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 });
 // Connect to the remote session
 const browser = await chromium.connectOverCDP(session.connectUrl);
 const context = browser.contexts()[0];
 const page = context.pages()[0];
 // Execute Playwright actions on the remote browser tab
 await page.goto("https://news.ycombinator.com/");
 const pageTitle = await page.title();
 if (pageTitle !== "Hacker News") {
 throw new Error(`Page title is not 'Hacker News', it is '${pageTitle}'`);
 }
 await page.screenshot({ path: "screenshot.png" });
 await page.close();
 await browser.close();
 console.log(
 `Done! View replay at https://browserbase.com/sessions/${session.id}`,
 );
}
run().catch(console.error);
```
## 
[​](#updates-to-common-workflows)
Updates to Common Workflows
### 
[​](#create-session)
Create Session
This is how you would create a session with the v1 SDK:
Copy
Ask AI
```
// v1 SDK
import { Browserbase, CreateSessionOptions } from "@browserbasehq/sdk";
const browserbase = new Browserbase({
 apiKey: BROWSERBASE_API_KEY,
 projectId: BROWSERBASE_PROJECT_ID,
});
const options: CreateSessionOptions = { extensionId: "123" };
await browserbase.createSession(options);
```
Now, you can create a session with the v2 SDK by calling the `create` method on `sessions`:
Copy
Ask AI
```
// v2 SDK
import { Browserbase } from "@browserbasehq/sdk";
const bb = new Browserbase({
 apiKey: BROWSERBASE_API_KEY,
});
const session = await bb.sessions.create({
 projectId: BROWSERBASE_PROJECT_ID,
});
```
For more complex types, you can use the [provided TypeScript types in the API reference](https://github.com/browserbase/sdk-node/blob/main/api.md):
Copy
Ask AI
```
// v2 SDK
import { Browserbase } from "@browserbasehq/sdk";
import { SessionCreateParams } from "@browserbasehq/sdk/resources";
const browserSettings: SessionCreateParams.BrowserSettings = {
 context: {
 id: contextId,
 persist: true,
 },
};
const session = await bb.sessions.create({
 projectId: BROWSERBASE_PROJECT_ID,
 extensionId: "some_extension_id",
 browserSettings,
});
```
### 
[​](#get-connect-url)
Get Connect URL
In the v1 SDK, you could run `browserbase.getConnectUrl()` to create a new session and retrieve its connect url, or `browserbase.getConnectUrl({ sessionId: someSession.id })` to retrieve the connect url for an existing session.
Copy
Ask AI
```
// v1 SDK
// To create a new session and connect to it
const connectUrl = await browserbase.getConnectUrl();
// To connect to an existing session
const connectUrl = await browserbase.getConnectUrl({
 sessionId: someSession.id,
});
```
In the v2 SDK, you can create a session and retrieve its connect url in a single call with `bb.sessions.create()`. Getting the connect url for an existing session is no longer supported.
Copy
Ask AI
```
// v2 SDK
const session = await bb.sessions.create({
 projectId: BROWSERBASE_PROJECT_ID,
});
const connectUrl = session.connectUrl;
```
### 
[​](#complete-session)
Complete Session
v1 allowed you to complete a session by calling `browserbase.completeSession()`:
Copy
Ask AI
```
// v1 SDK
await browserbase.completeSession({ sessionId: someSession.id });
```
In the v2 SDK, completing a session is done by updating its status to `REQUEST_RELEASE`:
Copy
Ask AI
```
// v2 SDK
await bb.sessions.update(sessionId, {
 status: "REQUEST_RELEASE",
 projectId: BROWSERBASE_PROJECT_ID!,
});
```
## 
[​](#reference-for-other-methods)
Reference for other methods
These methods have been rewritten for modularity and flexibility. As mentioned above, the pattern here is that the method has been renamed from `browserbase.$thing$Do()` to `bb.$thing.$do()`.
### 
[​](#list-sessions)
List Sessions
Copy
Ask AI
```
// v1 SDK
const sessions = await browserbase.listSessions();
```
Copy
Ask AI
```
// v2 SDK
const sessions = await bb.sessions.list();
```
### 
[​](#get-session)
Get Session
Copy
Ask AI
```
// v1 SDK
const session = await browserbase.getSession("some_session_id");
```
Copy
Ask AI
```
// v2 SDK
const session = await bb.sessions.retrieve("some_session_id");
```
### 
[​](#get-session-recording)
Get Session Recording
Copy
Ask AI
```
// v1 SDK
const recording = await browserbase.getSessionRecording(someSession.id);
```
Copy
Ask AI
```
// v2 SDK
const recording = await bb.sessions.recording.retrieve("some_session_id");
```
### 
[​](#get-session-downloads)
Get Session Downloads
**Note:** The parameter `retryInterval` is no longer supported. You can configure retries with the following syntax on initialization:
Copy
Ask AI
```
const bb = new Browserbase({
 apiKey: BROWSERBASE_API_KEY,
 maxRetries: 5,
});
```
Keep in mind, however, that this only affects the default retry behavior, which will only retry on 4xx/5xx errors. The remaining pattern still applies:
Copy
Ask AI
```
// v1 SDK
const downloads = await browserbase.getSessionDownloads(someSession.id);
```
Copy
Ask AI
```
// v2 SDK
const downloads = await bb.sessions.downloads.list("some_session_id");
```
### 
[​](#get-debug-connection-urls)
Get Debug Connection URLs
Copy
Ask AI
```
// v1 SDK
const debugUrls = await browserbase.getDebugConnectionUrls(someSession.id);
```
Copy
Ask AI
```
// v2 SDK
const debugUrls = await bb.sessions.debug("some_session_id");
```
### 
[​](#get-session-logs)
Get Session Logs
Copy
Ask AI
```
// v1 SDK
const logs = await browserbase.getSessionLogs(someSession.id);
```
Copy
Ask AI
```
// v2 SDK
const logs = await bb.sessions.logs.list("some_session_id");
```
Was this page helpful?
YesNo
⌘I
Assistant
Responses are generated using AI and may contain mistakes.