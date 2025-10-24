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
Using VPNs in Browserbase
On this page
 * [How to Route Browserbase Through Your VPN](#how-to-route-browserbase-through-your-vpn)
 * [Custom Proxy Configuration](#custom-proxy-configuration)
 * [Key Requirements](#key-requirements)
 * [Troubleshooting](#troubleshooting)
Browserbase lets you run cloud browsers with the exact network identity you need. You should use this setup when you need to allowlist Browserbase traffic through your firewall or API gateway. By routing traffic through your own static proxy or VPN, you can:
 * Pass network traffic through allowlisted infrastructure
 * Control your browser’s IP address and location
 * Comply with internal security policies and firewalls
## 
[​](#how-to-route-browserbase-through-your-vpn)
How to Route Browserbase Through Your VPN
Browserbase sessions can route traffic through your own static HTTP/HTTPS proxy. This allows you to control the outbound IP. If your systems only allow traffic from trusted IPs, simply allowlist the IP of your proxy.
 1. Deploy a VPN or proxy server in your trusted network
 2. Allowlist that IP in your firewall, backend, or third-party system
 3. Pass the proxy config into your Browserbase session
 4. Browserbase routes browser traffic through your proxy
## 
[​](#custom-proxy-configuration)
Custom Proxy Configuration
 * Node.js
 * Python
create_session_with_proxy.js
Copy
Ask AI
```
import { Browserbase } from "@browserbasehq/sdk";
const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY! });
async function createSessionWithCustomProxies() {
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID!,
 proxies: [
 {
 "type": "external",
 "server": "http://...",
 "username": "user",
 "password": "pass",
 }
 ]
 });
 return session;
}
const session = await createSessionWithCustomProxies();
```
## 
[​](#key-requirements)
Key Requirements
 * Your proxy must support HTTP or HTTPS
 * It must be accessible from Browserbase (public IP or via tunnel)
 * You must allow traffic from Browserbase to your proxy (firewall, VPN config, etc.)
## 
[​](#troubleshooting)
Troubleshooting
If your session fails to connect:
 * Make sure your proxy server is publicly accessible or properly tunneled
 * Confirm the proxy IP is correctly allowlisted in your system
 * Check the proxy authentication credentials
 * Ensure you’re using HTTP or HTTPS (Socks5 proxies are not supported)
 * Try connecting to the proxy from a local machine to verify it works outside your network
## [Proxies Read more about using custom proxies and proxy configuration options. ](/features/proxies)## [Enterprise Security Learn how to use Browserbase to manage enterprise security and compliance. ](/guides/security)
Was this page helpful?
YesNo
[Manage Account](/guides/manage-account)[Get Started with Integrations](/integrations/get-started)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.