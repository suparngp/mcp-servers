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
Stealth Mode
On this page
 * [Overview](#overview)
 * [Browserbase Identity & Signed Agents](#browserbase-identity-%26-signed-agents)
 * [Basic Stealth Mode](#basic-stealth-mode)
 * [Advanced Stealth Mode](#advanced-stealth-mode)
 * [CAPTCHA Solving](#captcha-solving)
 * [CAPTCHA Solving Events](#captcha-solving-events)
 * [Custom CAPTCHA Solving](#custom-captcha-solving)
 * [Disabling CAPTCHA Solving](#disabling-captcha-solving)
 * [Best Practices for Reliable Automation](#best-practices-for-reliable-automation)
 * [Site Compliance & Ethical Automation](#site-compliance-%26-ethical-automation)
 * [Request Rate Management](#request-rate-management)
 * [CAPTCHA Challenges](#captcha-challenges)
## 
[​](#overview)
Overview
Morally “good” automations play a vital role in modern web development with automated browsers performing legitimate tasks like testing, scraping, and content aggregation. While anti-bot systems often block all automation by default, you can be a good citizen of the web by using tools that respect site resources and terms of service. Stealth Mode enables your automated browser sessions to mimic real user behavior across different sessions and IPs.
 * **Basic Stealth Mode** handles surface-level challenges like visual CAPTCHAs and generates random, realistic fingerprints and viewports for each session.
 * **Advanced Stealth Mode** mimics human-like environmental signals using a custom-built Chromium browser to avoid bot detection altogether.
This guide shows you how to use these features responsibly.
## 
[​](#browserbase-identity-%26-signed-agents)
Browserbase Identity & Signed Agents
Browserbase Identity enables official bypass of Cloudflare protection through cryptographic authentication. Unlike traditional automation that gets blocked, Browserbase Identity proves your sessions are legitimate user-authorized agents through our partnership in Cloudflare’s Signed Agents program. **Key Benefits:**
 * Bypass Cloudflare bot detection with official capacity
 * Significantly fewer CAPTCHA challenges
 * Reliable access to protected sites
 * Website owners can specifically allow Browserbase sessions
## [Get Access Request beta access to enable Browserbase Identity for your account. ](https://www.browserbase.com/contact-web-bot-auth)
Browserbase Identity is currently in beta and is only available for Scale plan customers.
## 
[​](#basic-stealth-mode)
Basic Stealth Mode
Basic Stealth Mode focuses on solving what you can see — like visual CAPTCHAs and browser fingerprint clues that are commonly used to detect bots. To make automation easier and more effective out-of-the-box, Browserbase automatically generates random browser fingerprints and viewports for each session. This avoids the need for manual configuration.
Browser fingerprint customization is no longer available for direct configuration to ensure better results and fewer detection issues. If you were previously using custom stealth configs, we’ve phased them out based on user feedback and performance metrics. Let us know if you have questions or need help transitioning.
## 
[​](#advanced-stealth-mode)
Advanced Stealth Mode
Advanced Stealth Mode is only available for Scale Plan customers. Reach out to hello@browserbase.com if you’re interested in learning more, trialing the feature, or upgrading.
While Basic Stealth Mode automatically detects and solves most CAPTCHAs, Advanced Stealth Mode reduces the chances of being flagged as a bot by using a custom version of the Chrome browser, built and maintained by the Browserbase Stealth Team.
 * Node.js
 * Python
SDK
Copy
Ask AI
```
import Browserbase from "@browserbasehq/sdk";
const bb = new Browserbase({apiKey: process.env.BROWSERBASE_API_KEY!});
async function createAdvStealthSession() {
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 browserSettings: {
 advancedStealth: true,
 },
 proxies: true,
 });
 return session;
}
const session = await createAdvStealthSession();
console.log(session);
```
## [Advanced Stealth Fingerprints Customize your Advanced Stealth sessions with specific operating systems and viewport configurations for enhanced authenticity. ](/guides/stealth-customization)
With Advanced Stealth Mode, we handle fingerprinting for you so any custom fingerprint configuration will have no effect.For more control over OS and viewport settings, use the configuration options above.
## 
[​](#captcha-solving)
CAPTCHA Solving
Many websites use CAPTCHAs to distinguish between automated and human interactions, which can interrupt automation workflows. Browserbase provides integrated CAPTCHA solving to handle these challenges automatically, allowing your sessions to continue without manual intervention. CAPTCHA solving is enabled by default for Basic Stealth Mode and Advanced Stealth Mode. **How CAPTCHA Solving Works**
 * When a CAPTCHA is detected, Browserbase attempts to solve it in the background.
 * Solving can take up to 30 seconds, depending on the CAPTCHA type and complexity.
 * It’s recommended to enable [proxies](/features/proxies) when using CAPTCHA solving for higher success rates.
 * For custom CAPTCHAs, you can provide custom selectors to guide the solution process.
If you’d like to disable captcha solving, you can set solveCaptchas to false in the browserSettings when [creating a session](/fundamentals/create-browser-session).
### 
[​](#captcha-solving-events)
CAPTCHA Solving Events
Browserbase will emit a console log when a CAPTCHA is detected and being solved. You can listen to these events to wait until solving is complete before continuing with your automation.
 * Node.js
 * Python
Playwright
Selenium
Copy
Ask AI
```
const recaptcha = await page.goto("https://www.google.com/recaptcha/api2/demo");
page.on("console", (msg) => {
 if (msg.text() == "browserbase-solving-started") {
 console.log("Captcha Solving In Progress");
 } else if (msg.text() == "browserbase-solving-finished") {
 console.log("Captcha Solving Completed");
 }
});
```
### 
[​](#custom-captcha-solving)
Custom CAPTCHA Solving
If you encounter a non-standard, or custom captcha provider, you need to specify the explicit selector for the captcha image and button itself. For this custom captcha provider, you’ll need to specify two CSS selectors:
1
The selector for the captcha image element
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/features/custom-captcha.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=28c7563f272fab14a2a4822500ada092)
2
Right-click on the captcha image and select 'Inspect' then pull the 'id' from the HTML source code of the image
Copy
Ask AI
```
<img class="LBD_CaptchaImage" id="c_turingtestpage_ctl00_maincontent_captcha1_CaptchaImage" src="/BotDetectCaptcha.ashx?get=image&amp;c=c_turingtestpage_ctl00_maincontent_captcha1&amp;t=759cbf332a684ae3abe16213fe76438c" alt="CAPTCHA">
```
The id in this example is `c_turingtestpage_ctl00_maincontent_captcha1_CaptchaImage`
3
The selector for the input field where the solution should be entered
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/features/captcha-input.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=84649199696e32f8f46a0f469655ff23)
4
Right-click on the input field and select 'Inspect' then pull the 'id' from the HTML source code of the input field
Copy
Ask AI
```
<input name="ctl00$MainContent$txtTuringText" type="text" value="Enter the characters shown above" maxlength="6" id="ctl00_MainContent_txtTuringText" class="swap_value field" initialvalue="Enter the characters shown above" title="Enter the characters shown above">
```
The id in this example is `ctl00_MainContent_txtTuringText`
5
Configure your browser settings with these selectors
Copy
Ask AI
```
browserSettings: {
 captchaImageSelector: "#c_turingtestpage_ctl00_maincontent_captcha1_CaptchaImage",
 captchaInputSelector: "#ctl00_MainContent_txtTuringText"
}
```
### 
[​](#disabling-captcha-solving)
Disabling CAPTCHA Solving
CAPTCHA solving typically takes between 5 and 30 seconds. If you’d like to disable captcha solving, you can set `solveCaptchas` to `false` in the `browserSettings` when creating a session.
 * Node.js
 * Python
SDK
Copy
Ask AI
```
import Browserbase from "@browserbasehq/sdk";
const bb = new Browserbase({apiKey: process.env.BROWSERBASE_API_KEY!});
async function createSessionWithoutCaptchaSolving() {
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 browserSettings: {
 solveCaptchas: false,
 },
 });
 return session;
}
const session = await createSessionWithoutCaptchaSolving();
console.log(session);
```
## 
[​](#best-practices-for-reliable-automation)
Best Practices for Reliable Automation
Follow these best practices to ensure stable, efficient, and responsible automation with Browserbase.
### 
[​](#site-compliance-%26-ethical-automation)
Site Compliance & Ethical Automation
Before automating a website:
 * Review the site’s **terms of service** to ensure compliance.
 * Check **robots.txt** for crawling guidelines when applicable.
 * Cache responses **to reduce unnecessary requests** and improve efficiency.
### 
[​](#request-rate-management)
Request Rate Management
To maintain stability and avoid detection:
 * Add **delays between requests** to mimic human behavior.
 * Implement **exponential backoff** when encountering errors.
 * Monitor request frequency and **adjust based on site response times**.
### 
[​](#captcha-challenges)
CAPTCHA Challenges
If you encounter CAPTCHAs:
 * Check that [proxies are enabled](/features/proxies).
 * Allow **up to 30 seconds** for CAPTCHA solving to complete.
 * For [custom CAPTCHAs](#custom-captcha-solving), double-check that your **selectors are correctly defined**.
By following these best practices and troubleshooting steps, you can improve automation reliability, minimize detection risks, and optimize performance with Browserbase. Need help? Contact support@browserbase.com
Was this page helpful?
YesNo
[Manage a Browser Session](/fundamentals/manage-browser-session)[Proxies](/features/proxies)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.