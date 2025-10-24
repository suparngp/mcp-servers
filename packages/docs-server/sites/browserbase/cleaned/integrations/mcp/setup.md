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
 * [Introduction](/integrations/mcp/introduction)
 * [Setup](/integrations/mcp/setup)
 * [Tools](/integrations/mcp/tools)
 * [Configuration](/integrations/mcp/configuration)
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
MCP Server
Browserbase MCP Server Setup
On this page
 * [Quick Installation](#quick-installation)
 * [Prerequisites](#prerequisites)
 * [Installation Methods](#installation-methods)
 * [Verify Installation](#verify-installation)
 * [Further Reading](#further-reading)
## 
[​](#quick-installation)
Quick Installation
## [Install with Cursor One-click installation directly in Cursor with pre-configured settings ](cursor://anysphere.cursor-deeplink/mcp/install?name=browserbase&config=eyJjb21tYW5kIjoibnB4IEBicm93c2VyYmFzZWhxL21jcCIsImVudiI6eyJCUk9XU0VSQkFTRV9BUElfS0VZIjoiIiwiQlJPV1NFUkJBU0VfUFJPSkVDVF9JRCI6IiIsIkdFTUlOSV9BUElfS0VZIjoiIn19) We support multiple transport methods for our MCP server: STDIO and SHTTP. We recommend using SHTTP with our remote hosted URL to take advantage of the server at full capacity.
## 
[​](#prerequisites)
Prerequisites
1
Get your Browserbase credentials
Get your Browserbase API key and project ID from the [Browserbase Dashboard](https://www.browserbase.com/overview).
![Browserbase API Key and Project ID settings](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/quickstart/api-key.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=b9a4d1261a99b7160d615f1d2ee7a6c9)
Then copy your API Key and Project ID directly from the input.
## 
[​](#installation-methods)
Installation Methods
 * Remote URL (SHTTP)
 * NPM Package (STDIO)
 * Local Development
Go to [smithery.ai](https://smithery.ai/server/@browserbasehq/mcp-browserbase) and enter your API keys and configuration to get a remote hosted URL.![Smithery](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/mcp/smithery.jpg?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=145dab49fc1f74986a6e26b36219fd4c)
Smithery
Copy
Ask AI
```
{
 "mcpServers": {
 "browserbase": {
 "url": "your-smithery-url.com"
 }
 }
}
```
When using our remote hosted server, we provide the LLM costs for Gemini, the [best performing model](https://www.stagehand.dev/evals) in [Stagehand](https://www.stagehand.dev).
## 
[​](#verify-installation)
Verify Installation
1
Restart your Claude Client
Restart/refresh your Claude Client app and you should see the tools available by clicking the 🔨 icon.
2
Test the integration
Get started using our MCP Server by asking Claude to navigate to any page and see your Browserbase Browser in action on the [dashboard](https://www.browserbase.com/sessions).
Try asking Claude: “Navigate to google.com and take a screenshot”
## 
[​](#further-reading)
Further Reading
## [Model Context Protocol (MCP) Docs Learn more about the MCP protocol ](https://modelcontextprotocol.io/introduction)## [Browserbase Documentation Explore Browserbase features and capabilities ](https://docs.browserbase.com) Support Get help from our support team
Was this page helpful?
YesNo
[Introduction](/integrations/mcp/introduction)[Tools](/integrations/mcp/tools)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.