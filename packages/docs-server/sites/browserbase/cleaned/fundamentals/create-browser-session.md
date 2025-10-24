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
Create a Browser Session
On this page
 * [Overview](#overview)
 * [Creating a Session](#creating-a-session)
 * [Configuration Options](#configuration-options)
 * [Basic Settings](#basic-settings)
 * [Advanced Features](#advanced-features)
 * [Next Steps](#next-steps)
## 
[​](#overview)
Overview
A browser session represents a single browser instance running in the cloud. It’s the fundamental building block of Browserbase, providing an isolated environment for your web automation tasks.
## 
[​](#creating-a-session)
Creating a Session
Browser sessions are created through the [Sessions API](/reference/api/create-a-session), which gives you full control over configuration and features. After creation, you’ll receive a connection URL to use with your preferred automation framework.
The create session API is rate limited based on your plan’s concurrent session limits. See [Concurrency & Rate Limits](/guides/concurrency-rate-limits) for details on limits and best practices for handling them.
 * Node.js
 * Python
 * cURL
Copy
Ask AI
```
import { Browserbase } from "@browserbasehq/sdk";
const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 // Add configuration options here
});
```
## 
[​](#configuration-options)
Configuration Options
When creating a session, you can configure various settings. For complete API details, see:
 * [Create Session API Reference](/reference/api/create-a-session)
 * [Node.js SDK Reference](/reference/sdk/nodejs)
 * [Python SDK Reference](/reference/sdk/python)
### 
[​](#basic-settings)
Basic Settings
 * **Region** - Decrease latency by choosing where your browser runs using one of our [browser regions](/guides/multi-region)
 * **Viewport** - Set custom screen dimensions for your browser window. Otherwise, the default viewport varies per session
 * **Keep Alive** - Enable [longer-running sessions](/guides/long-running-sessions) that run even after disconnection
 * **Recording** - Enable/disable [session recording](/features/session-replay) (enabled by default)
 * **Logging** - Enable/disable session logging for debugging (enabled by default)
### 
[​](#advanced-features)
Advanced Features
 * **[Stealth Mode](/features/stealth-mode)** - Configure anti-bot mitigations:
 * Automatic basic fingerprinting (devices, locales, operating systems)
 * Advanced stealth mode (Scale plan only)
 * [Proxy settings](/features/proxies)
 * Captcha solving (enabled by default)
 * **[Extensions](/features/browser-extensions)** - Load custom browser extensions to enhance functionality
 * **[Browser Context](/features/contexts)** - Configure isolated browsing contexts for session persistence
 * **[User Metadata](/features/session-metadata)** - Attach custom data for session organization and filtering
## 
[​](#next-steps)
Next Steps
Once you’ve created a session, you can:
 1. Connect to it using your preferred automation framework - see [Using a Browser Session](/fundamentals/using-browser-session)
 2. Monitor it through the [Session Inspector](/features/session-inspector)
 3. End it manually or let it timeout - see [Manage a Browser Session](/fundamentals/manage-browser-session)
Was this page helpful?
YesNo
[Selenium](/introduction/selenium)[Using a Browser Session](/fundamentals/using-browser-session)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.