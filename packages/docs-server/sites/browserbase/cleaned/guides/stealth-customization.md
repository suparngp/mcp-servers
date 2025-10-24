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
Advanced Stealth Customization
On this page
 * [Customization Options](#customization-options)
 * [Operating System Configuration](#operating-system-configuration)
 * [OS Default Viewports](#os-default-viewports)
 * [Custom Viewport Configuration](#custom-viewport-configuration)
 * [Supported Viewport Combinations](#supported-viewport-combinations)
 * [Error Handling & Validation](#error-handling-%26-validation)
 * [Best Practices](#best-practices)
 * [Operating System Selection](#operating-system-selection)
 * [Viewport Configuration](#viewport-configuration)
 * [Maximizing Success Rate](#maximizing-success-rate)
 * [Implementation Tips](#implementation-tips)
Browserbase’s Advanced Stealth Mode is a real browser and has **real browser fingerprints** that provide significantly higher success rates than randomly generated configurations. This guide shows you how to customize OS and viewport settings for optimal results.
## 
[​](#customization-options)
Customization Options
Advanced Stealth Mode offers three configuration options:
 1. **Default** : Windows OS with 2560x1440 viewport
 * For general automation use
 2. **OS Only** : Choose your OS (Linux, Windows, Mac)
 * Viewport size automatically optimized
 3. **OS and Viewport** : Specify both OS and viewport
 * For exact fingerprint control
## 
[​](#operating-system-configuration)
Operating System Configuration
Specify the operating system and let Browserbase automatically optimize the viewport settings for that OS.
 * Node.js
 * Python
SDK
Copy
Ask AI
```
import Browserbase from "@browserbasehq/sdk";
const bb = new Browserbase({apiKey: process.env.BROWSERBASE_API_KEY!});
const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 browserSettings: {
 advancedStealth: true,
 os: "mac", // Auto-defaults to 2560x1440
 },
 proxies: true,
});
```
When using [contexts](/features/contexts), changing the os or viewport could reduce the success rate of your automation.
### 
[​](#os-default-viewports)
OS Default Viewports
When you specify only the Operating System, these are the automatic viewport defaults: OS | Default Viewport | Use Case 
---|---|--- 
`linux` | 2560x1440 | High-res desktop automation 
`windows` | 2560x1440 | Windows-specific testing 
`mac` | 2560x1440 | macOS automation 
`mobile` | 696x384 | Mobile app testing 
`tablet` | 800x1112 | Tablet responsive testing 
## 
[​](#custom-viewport-configuration)
Custom Viewport Configuration
For precise control, specify both OS and viewport dimensions:
 * Node.js
 * Python
Copy
Ask AI
```
const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 browserSettings: {
 advancedStealth: true,
 os: "windows",
 viewport: { 
 width: 1920, 
 height: 1080,
 },
 },
 proxies: true,
});
```
### 
[​](#supported-viewport-combinations)
Supported Viewport Combinations
macOS Viewports
 * `1728x1117` - MacBook Air 13”
 * `1800x1169` - MacBook Pro 13”
 * `2560x1440` - MacBook Pro 16”
 * `3840x1080` - Ultra-wide display
Windows Viewports
 * `1920x1080` - Full HD
 * `2560x1440` - 2K display
Linux Viewports
 * `1920x1080` - Full HD
 * `2560x1440` - 2K display
Mobile & Tablet
 * `696x384` - Mobile devices
 * `800x1112` - Tablet devices
## 
[​](#error-handling-%26-validation)
Error Handling & Validation
Scenario | Result | Details 
---|---|--- 
`advancedStealth: false` + OS | Error | Cannot use OS without Advanced Stealth 
Invalid OS value | Error | `os: "android"` (not supported) 
Invalid OS/viewport combo | Error | `mac` + `1920x1080` 
No OS specified | Windows default | Falls back to Windows + 2560x1440 
## 
[​](#best-practices)
Best Practices
### 
[​](#operating-system-selection)
Operating System Selection
 * **Match Target Environment** : Choose an OS that aligns with your use case. For example, use `windows` when automating Windows-specific sites or testing Windows-only features.
 * **Default OS Settings** : For general automation, specify only the `os` parameter and let the system select optimal viewport defaults. This simplifies configuration while maintaining high success rates.
### 
[​](#viewport-configuration)
Viewport Configuration
 * **Precise Dimensions** : When pixel-perfect matching is required (e.g., UI testing), configure both `os` and `viewport` using the supported combinations listed above.
 * **Mobile & Tablet Testing**: Use `mobile` or `tablet` OS values with their corresponding viewports for testing responsive designs and mobile-specific features.
### 
[​](#maximizing-success-rate)
Maximizing Success Rate
 * **Maintain Profile Integrity** : Avoid modifying viewport dimensions or user agent strings through automation frameworks like Playwright. Our pre-made fingerprints are carefully crafted to work together as complete profiles.
 * **Enable Proxies** : Always pair Advanced Stealth Mode with our [proxy infrastructure](/features/proxies) for optimal bot detection avoidance. The combination provides the highest success rates.
### 
[​](#implementation-tips)
Implementation Tips
 * **Validate Configurations** : Implement proper error handling for invalid OS/viewport combinations to ensure graceful fallbacks in your automation scripts.
 * **Monitor Success** : Track your automation success rates and adjust OS/viewport combinations if you notice decreased performance on specific sites.
This feature is currently in beta; if you have any feedback, please reach out to support@browserbase.com.
Was this page helpful?
YesNo
⌘I
Assistant
Responses are generated using AI and may contain mistakes.