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
Handling Authentication
On this page
 * [Strategies for Handling Authentication](#strategies-for-handling-authentication)
 * [Create a Session with Contexts, Proxies, and Fingerprinting](#create-a-session-with-contexts%2C-proxies%2C-and-fingerprinting)
 * [Use the Session Live View to login](#use-the-session-live-view-to-login)
 * [Use the context ID to persist the authentication state across future sessions](#use-the-context-id-to-persist-the-authentication-state-across-future-sessions)
 * [2FA Challenges](#2fa-challenges)
 * [Disable 2FA or create an app password](#disable-2fa-or-create-an-app-password)
 * [Enable Remote Control of your Session](#enable-remote-control-of-your-session)
 * [Accessing an authentication flow with Stealth Mode](#accessing-an-authentication-flow-with-stealth-mode)
 * [Speed up your automation by reusing cookies](#speed-up-your-automation-by-reusing-cookies)
 * [Handling Passkeys](#handling-passkeys)
 * [Disable Passkeys in Your Session](#disable-passkeys-in-your-session)
 * [Alternative Authentication Methods](#alternative-authentication-methods)
Many websites require authentication before allowing access to protected content or actions. Browserbase provides flexible methods for handling authentication in automated sessions, ensuring seamless logins while maintaining security and efficiency. **Why Authentication Matters in Automation**
 * Ensures access to restricted content without manual intervention.
 * Reduces session expiration issues by persisting login states.
 * Prevents bot detection and account lockouts with stealth techniques.
## 
[​](#strategies-for-handling-authentication)
Strategies for Handling Authentication
Handling authentication in automation requires **maintaining session state, avoiding bot detection, and resolving challenges like CAPTCHAs or multi-factor authentication (MFA)**. Browserbase provides several strategies to help you authenticate reliably while ensuring security and efficiency.
 1. Create a session with context, proxies, and fingerprinting.
 2. Use the Session Live View to log into the website.
 3. Use the context ID to persist the authentication state across future sessions.
### 
[​](#create-a-session-with-contexts%2C-proxies%2C-and-fingerprinting)
Create a Session with Contexts, Proxies, and Fingerprinting
Ensure seamless authentication by persisting login sessions, avoiding detection, and preventing IP-based blocking.
 * [Apply Contexts](/features/contexts) → Store cookies, session tokens, and local storage to prevent repeated logins. Log in once, then reuse the saved authentication state.
 * [Enable Stealth Mode](/features/stealth-mode) → Adjust browser, OS, and screen settings to blend in with real users and bypass detection.
 * [Use Proxies](/features/proxies) → Rotate residential proxies and match IP locations to prevent tracking and login restrictions.
By combining contexts, stealth mode, and proxies, you can create secure, stable, and automated authentication workflows.
 * Node.js
 * Python
SDK
Copy
Ask AI
```
import { Browserbase } from "@browserbasehq/sdk";
async function createAuthSession(contextId: string) {
 const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 browserSettings: {
 context: {
 id: contextId,
 persist: true
 }
 },
 proxies: [{
 type: "browserbase",
 geolocation: {
 city: "New York",
 state: "NY",
 country: "US"
 }
 }]
 });
 console.log("Session URL: https://browserbase.com/sessions/" + session.id);
 return session;
}
// Use the context ID from your saved context
const contextId = "<context-id>";
const session = await createAuthSession(contextId);
console.log("Session URL: https://browserbase.com/sessions/" + session.id);
```
### 
[​](#use-the-session-live-view-to-login)
Use the Session Live View to login
For authentication workflows, the best practice is to **log in manually once using Session Live View** , then **persist the authentication state across future sessions using contexts**. This approach ensures secure, repeatable logins without needing manual input every time.
 1. Start a new session and retrieve the **Session Live View URL**.
 2. Open the Live View in your browser to **interact with the session in real time**.
 3. Once logged in, the session’s authentication data (cookies, session tokens) is stored.
 4. Save the session context id so future sessions can **reuse the authentication state without logging in again**.
## [Taking a Session's Remote Control with Session Live View Incorporate a human in the loop to complete the authentication process. ](/features/session-live-view)
### 
[​](#use-the-context-id-to-persist-the-authentication-state-across-future-sessions)
Use the context ID to persist the authentication state across future sessions
After logging in once, you can reuse the authentication state by storing it in a context. This allows future sessions to bypass the login process, maintaining access to authenticated pages without needing manual input. Now, any session using this context.id will start already logged in, eliminating the need to authenticate again. By persisting authentication with contexts, you can ensure seamless automation, reduce login failures, and improve session continuity.
# 
[​](#2fa-challenges)
2FA Challenges
Two-step verification (via authenticator apps or SMS) or magic links usually require human intervention in the loop. There are 2 main strategies to manage 2FA:
 1. Disable 2FA or create an app password
 2. Enable Remote Control of your Session
### 
[​](#disable-2fa-or-create-an-app-password)
Disable 2FA or create an app password
For an internal tool, try to turn off the [two-step verification](https://support.google.com/accounts/answer/1064203?hl=en&co=GENIE.Platform%3DDesktop). For an authentication flow requiring some level of security, [try to create an app password](https://support.google.com/accounts/answer/185833?hl=en).
### 
[​](#enable-remote-control-of-your-session)
Enable Remote Control of your Session
If a two-step verification mechanism cannot be bypassed or disabled, consider handing back control to the end user by leveraging the Session Live URLs. ## [Taking a Session's Remote Control with Session Live View Let your end users complete the two-step verification process as part of your automation. ](/features/session-live-view)
## 
[​](#accessing-an-authentication-flow-with-stealth-mode)
Accessing an authentication flow with Stealth Mode
Many authentication flows implement mechanisms to prevent web automation:
 * IP address restrictions
 * User agent filtering
 * Captchas
 * Rate limiting
When running your browser session, dealing with these impediments may require setting up IP rotations with proxies along with captcha solving and fingerprint generators. By automating with Browserbase, you get opt-in [proxies](/features/proxies#use-built-in-proxies), automatic, fully [configurable fingerprinting](/features/stealth-mode#fingerprint), and captcha solving—without any coding:
## 
[​](#speed-up-your-automation-by-reusing-cookies)
Speed up your automation by reusing cookies
Some websites or web apps rely on cookies-based Sessions, which can be easily retrieved and reused to speed up your automation. The code examples below showcase how to retrieve and set cookies to avoid having your automation go through the authentication flow at each run:
 * Node.js
 * Python
Playwright
Copy
Ask AI
```
import Browserbase from "@browserbasehq/sdk";
import { chromium } from "playwright-core";
import storage from "./storage.js";
async function authenticate(page, context) {
 const session = await storage.getSession();
 if (session) {
 await context.addCookies([session]);
 // try to access a protected page
 await page.goto("https://www.browserbase.com/overview");
 if (page.url === "https://www.browserbase.com/overview") {
 // no redirect -> we are authenticated, let's skip the authentication flow
 return;
 }
 }
 await page.goto("https://www.browserbase.com/sign-in");
 // ... sign-in ...
 // retrieve User Session Cookie
 const cookies = await context.cookies();
 const sessionCookie = cookies.find((c) => c.name === "session_id");
 await storage.storeSession(sessionCookie);
}
(async () => {
 const bb = new Browserbase({
 apiKey: process.env.BROWSERBASE_API_KEY
 });
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID,
 proxies: true
 });
 const browser = await chromium.connectOverCDP(session.connectUrl);
 // Getting the default context to ensure the sessions are recorded.
 const defaultContext = browser.contexts()[0];
 const page = defaultContext.pages()[0];
 await authenticate(page, defaultContext);
 // ... interact with page ...
 await page.close();
 await browser.close();
})().catch((error) => console.error(error.message));
```
# 
[​](#handling-passkeys)
Handling Passkeys
[Passkeys](https://www.w3.org/TR/webauthn-3/) are a modern authentication method that can present challenges for automation since they typically require user interaction. When automating sites that use passkeys, you’ll often want to disable or bypass them since the required user interactions aren’t supported in automated sessions.
### 
[​](#disable-passkeys-in-your-session)
Disable Passkeys in Your Session
To prevent passkey prompts from appearing and potentially blocking your automation, you can disable them using the Chrome DevTools Protocol (CDP). Here’s how to do it:
 * Node.js
 * Python
Copy
Ask AI
```
import { chromium } from "playwright-core";
import { Browserbase } from "@browserbasehq/sdk";
async function createSessionWithoutPasskeys() {
 const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!
 });
 console.log(`Session created, id: ${session.id}`);
 // Connect to the remote browser
 const browser = await chromium.connectOverCDP(session.connectUrl);
 const defaultContext = browser.contexts()[0];
 const page = defaultContext.pages()[0];
 // Create a CDP session and configure the virtual authenticator
 const client = await page.context().newCDPSession(page);
 await client.send('WebAuthn.enable');
 await client.send('WebAuthn.addVirtualAuthenticator', {
 options: {
 protocol: 'ctap2',
 transport: 'internal',
 hasResidentKey: true,
 hasUserVerification: true,
 isUserVerified: true,
 automaticPresenceSimulation: true,
 },
 });
 return page;
}
```
This code:
 1. Creates a new Browserbase session
 2. Connects to the browser using CDP
 3. Enables the WebAuthn API
 4. Adds a virtual authenticator that prevents real passkey prompts
By setting up this virtual authenticator, you prevent the browser from prompting for actual passkey authentication, allowing your automation to proceed with other authentication methods like username/password.
### 
[​](#alternative-authentication-methods)
Alternative Authentication Methods
When passkeys are enabled on a site, there’s usually an alternative authentication method available (like username/password). After disabling passkeys, look for these alternative methods:
 * “Sign in with password” links
 * “Other sign-in options” buttons
 * Username/password form toggles
Was this page helpful?
YesNo
[Concurrency & Rate Limits](/guides/concurrency-rate-limits)[Single Sign-On (SSO)](/guides/sso-setup)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.