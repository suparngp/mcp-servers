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
Contexts
On this page
 * [Overview](#overview)
 * [Why use Contexts?](#why-use-contexts%3F)
 * [Creating a Context](#creating-a-context)
 * [Initializing a Session with Context](#initializing-a-session-with-context)
 * [Common flow for login persistence](#common-flow-for-login-persistence)
 * [Why set persist: true?](#why-set-persist%3A-true%3F)
 * [When to enable persist: true](#when-to-enable-persist%3A-true)
 * [When to keep persist: false (rare use cases)](#when-to-keep-persist%3A-false-rare-use-cases)
 * [Deleting Contexts](#deleting-contexts)
## 
[​](#overview)
Overview
Contexts allow you to **persist user data across multiple browser sessions** , enabling smoother automation, authentication, and performance optimizations. By default, each Browserbase session starts with a fresh user data directory, meaning cookies, cache, and session storage are wiped between sessions. With Contexts, you can reuse stored data across sessions, making automation workflows faster, more reliable, and more efficient. Browser cookies are stored in the [user data directory](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/user_data_dir.md). **Contexts are configured by:**
 1. Creating a context via the [Contexts API](/reference/api/create-a-context)
 2. Passing the context ID into the [Create Sessions API](/reference/api/create-a-session)
### 
[​](#why-use-contexts%3F)
Why use Contexts?
 * **Reusing Cookies & Session Data**: Maintain login states across multiple sessions without needing to log in repeatedly.
 * **Preserving Authentication** : Store and reuse authentication tokens, reducing the need to re-enter credentials.
 * **Speeding Up Page Loads** : Cache assets, API responses, and other browser data to decrease load times.
Context data can include stored credentials and other sensitive browsing data. Because of this, contexts are uniquely encrypted at rest to ensure security.
## 
[​](#creating-a-context)
Creating a Context
To create a context, use the Create Context API. This will return a **unique context ID** , which you can pass into new sessions to persist data.
 * Node.js
 * Python
SDK
Copy
Ask AI
```
import { Browserbase } from "@browserbasehq/sdk";
async function createContext() {
 const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
 const context = await bb.contexts.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 });
 return context;
}
createContext()
 .then((context) => console.log("Context ID:", context.id))
 .catch((error) => console.error("Error:", error));
```
## 
[​](#initializing-a-session-with-context)
Initializing a Session with Context
After creating a context, you can use it in a new session to reuse cookies, authentication, and cached data. This allows you to create a returning user experience, reducing load times and eliminating the need to log in again.
After a session using a context with `persist: true`, there will be a brief delay before the updated context state is ready for use in a new session. We recommend temporarily pausing before reusing the same context to ensure all data is properly synchronized. You do not need to wait if you are reusing the same context with `persist: false`.
Here’s an example of how to use a context in a new session, **this example uses the context ID from the previous example**.
 * Node.js
 * Python
SDK
Copy
Ask AI
```
import { Browserbase } from "@browserbasehq/sdk";
const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
async function useContext(contextId: string) {
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 browserSettings: {
 context: {
 id: contextId,
 persist: true,
 },
 },
 });
 return session;
}
// Use the context ID from the previous example
const contextId = "<context-id>";
const session = useContext(contextId).then((session) => {
 console.log("Session URL: https://browserbase.com/sessions/" + session.id);
});
```
### 
[​](#common-flow-for-login-persistence)
Common flow for login persistence
A typical flow to persist a website login across Browserbase sessions would be as follows:
 1. **Create a context** (get a `contextId`).
 2. **Start a first Browserbase session** with that `contextId` and `persist: true`.
 3. **Log in** to a website inside this first session, either manually through our [live view feature](/features/session-live-view#getting-started) or programmatically.
 4. **End this session**.
 5. **Wait a few seconds** to ensure that the context is updated.
 6. **Start a second Browserbase session** (and future sessions) with the **same** `contextId` and visit the same website — you should now be signed in automatically without having to repeat the login process.
### 
[​](#why-set-persist%3A-true%3F)
Why set persist: true?
By default, a context loads saved data from previous sessions but does not update it. If you need to store new cookies, authentication tokens, or cached data, you must set persist: true when creating a session. The data will be saved when the session closes. This ensures that any changes made during the session—such as logging in, saving site preferences, or caching assets—are retained for future sessions instead of being lost when the session ends.
#### 
[​](#when-to-enable-persist%3A-true)
When to enable persist: true
Use persist: true if you want to save updates to your context for future use.
 * **Persisting Authentication** : Saves login credentials and session cookies, so you don’t need to log in again.
 * **Retaining User Preferences** : Stores UI settings, site preferences, and other local storage changes.
 * **Caching Data for Faster Loads** : Retains network cache to reduce redundant API calls and speed up automation.
 * **Minimizing Captcha & Bot Detection**: Preserves cookies and session history to help avoid frequent bot challenges.
#### 
[​](#when-to-keep-persist%3A-false-rare-use-cases)
When to keep persist: false (rare use cases)
Setting persist: false prevents changes from being saved to the context. This is not recommended in most cases, but it can be useful when:
 * **Read-only session** : If you need to access saved cookies or cache without modifying them.
 * **Prevent session state changes** : Avoids overwriting stored login tokens or user data.
## 
[​](#deleting-contexts)
Deleting Contexts
When you no longer need a context, you can delete it using the [Delete Context API](/reference/api/delete-a-context). Once deleted, a context cannot be used to create new sessions and any attempts to do so will fail. Here’s how to delete a context:
 1. Use the [Delete Context API](/reference/api/delete-a-context) with the context ID
 2. The API will return a 204 status code on success
 3. Any subsequent attempts to use this context ID will fail with a 404 error
Deleting a context is permanent and cannot be undone. Make sure you no longer need the context before deleting it.
 * Node.js
 * Python
API
Copy
Ask AI
```
import axios from "axios";
async function deleteContext(contextId: string) {
 try {
 const response = await axios.delete(
 `https://api.browserbase.com/v1/contexts/${contextId}`,
 {
 headers: {
 "X-BB-API-Key": process.env.BROWSERBASE_API_KEY,
 },
 },
 );
 console.log("Context deleted successfully:", response.status);
 } catch (error) {
 console.error("Error deleting context:", error.response.data);
 }
}
// Use the context ID from the previous examples
const contextId = "<context-id>";
deleteContext(contextId);
```
## [Handling Authentication Once you set up contexts, follow our authentication guide to easily log into websites. ](/guides/authentication)
Was this page helpful?
YesNo
[Screenshots & PDFs](/features/screenshots)[Browser Extensions](/features/browser-extensions)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.