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
Browserbase MCP Server Configuration
Cookies must be in [Playwright Cookie format](https://playwright.dev/docs/api/class-browsercontext#browser-context-cookies).
Cookies must be in [Playwright Cookie format](https://playwright.dev/docs/api/class-browsercontext#browser-context-cookies).
## 
[​](#configuration-overview)
Configuration Overview
The Browserbase MCP server supports extensive configuration options through command-line flags and environment variables. Configure browser behavior, proxy settings, stealth modes, model selection, and more to customize your browser automation workflows.
Command-line flags are only available when running the server locally (`npx @browserbasehq/mcp-server-browserbase` with flags or local development setup).
## 
[​](#environment-variables)
Environment Variables
Configure the essential Browserbase credentials and optional debugging settings:
## BROWSERBASE_API_KEY
Your Browserbase API key for authentication
## BROWSERBASE_PROJECT_ID
Your Browserbase project ID
## 
[​](#command-line-flags)
Command-Line Flags
### 
[​](#available-flags)
Available Flags
Flag | Description 
---|--- 
`--proxies` | Enable Browserbase proxies for the session 
`--advancedStealth` | Enable Browserbase Advanced Stealth (Scale Plan only) 
`--keepAlive` | Enable Browserbase Keep Alive Session 
`--contextId <contextId>` | Specify a Browserbase Context ID to use 
`--persist [boolean]` | Whether to persist the Browserbase context (default: true) 
`--port <port>` | Port to listen on for HTTP/SHTTP transport 
`--host <host>` | Host to bind server to (default: localhost, use 0.0.0.0 for all interfaces) 
`--cookies [json]` | JSON array of cookies to inject into the browser 
`--browserWidth <width>` | Browser viewport width (default: 1024) 
`--browserHeight <height>` | Browser viewport height (default: 768) 
`--modelName <model>` | The model to use for Stagehand (default: gemini-2.0-flash) 
`--modelApiKey <key>` | API key for the custom model provider (required when using custom models) 
`--experimental` | Enable experimental features (default: false) 
## 
[​](#configuration-examples)
Configuration Examples
### 
[​](#basic-configuration)
Basic Configuration
 * Remote URL (SHTTP)
 * NPM Package
 * Local STDIO
 * Local SHTTP
Direct SHTTP
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
### 
[​](#advanced-features)
Advanced Features
 * Proxies
 * Advanced Stealth
 * Contexts
Enable Browserbase proxies for IP rotation and geo-location testing.
Copy
Ask AI
```
{
 "mcpServers": {
 "browserbase": {
 "command": "npx",
 "args": ["@browserbasehq/mcp-server-browserbase", "--proxies"],
 "env": {
 "BROWSERBASE_API_KEY": "your_api_key",
 "BROWSERBASE_PROJECT_ID": "your_project_id",
 "GEMINI_API_KEY": "your_gemini_api_key"
 }
 }
 }
}
```
### 
[​](#browser-customization)
Browser Customization
 * Viewport Sizing
 * Cookie Injection
Customize browser window dimensions. Default is 1024x768. Recommended aspect ratios: 16:9.
Copy
Ask AI
```
{
 "mcpServers": {
 "browserbase": {
 "command": "npx",
 "args": [
 "@browserbasehq/mcp-server-browserbase",
 "--browserWidth", "1920",
 "--browserHeight", "1080"
 ],
 "env": {
 "BROWSERBASE_API_KEY": "your_api_key",
 "BROWSERBASE_PROJECT_ID": "your_project_id",
 "GEMINI_API_KEY": "your_gemini_api_key"
 }
 }
 }
}
```
**Common Resolutions:**
 * Desktop: 1920x1080, 1280x720, 1024x768
 * Mobile: 375x667 (iPhone), 360x640 (Android)
 * Tablet: 768x1024 (iPad)
## 
[​](#model-configuration)
Model Configuration
Configure AI models for enhanced browser automation. Stagehand defaults to Google’s Gemini 2.0 Flash but supports multiple providers.
When using any custom model (non-default), you must provide your own API key for that model provider using the `--modelApiKey` flag.
 * Available Models
 * Configuration Examples
**Google Gemini** (Default)
 * `google/gemini-2.0-flash` (default)
 * `google/gemini-1.5-pro`
 * `google/gemini-1.5-flash`
**OpenAI**
 * `openai/gpt-4o`
 * `openai/gpt-4o-mini`
 * `openai/o1-mini`
 * `openai/o1-preview`
 * `openai/o3-mini`
**Anthropic Claude**
 * `anthropic/claude-3-5-sonnet-latest`
 * `anthropic/claude-3-7-sonnet-latest`
[View full list of supported models](https://docs.stagehand.dev/configuration/models#supported-providers)
## 
[​](#development-configuration)
Development Configuration
 * Debug Mode
 * Custom Host/Port
Enable detailed logging for troubleshooting and development.
Copy
Ask AI
```
{
 "mcpServers": {
 "browserbase": {
 "command": "npx",
 "args": ["@browserbasehq/mcp-server-browserbase"],
 "env": {
 "BROWSERBASE_API_KEY": "your_api_key",
 "BROWSERBASE_PROJECT_ID": "your_project_id",
 "GEMINI_API_KEY": "your_gemini_api_key",
 "DEBUG": "true"
 }
 }
 }
}
```
## 
[​](#best-practices)
Best Practices
Performance - How can I optimize browser automation performance?
 * Use appropriate viewport sizes for your use case
 * Enable proxies only when needed for geo-location
 * Choose efficient models (Gemini Flash for speed, GPT-4o for accuracy)
 * Reuse contexts for authentication persistence
Security - What security measures should I implement?
 * Store API keys securely in environment variables
 * Use Advanced Stealth for sensitive operations
 * Implement proper session management
 * Rotate cookies and contexts regularly
Development - What are the recommended development practices?
 * Enable debug mode during development
 * Use context persistence for faster iteration
 * Test with different viewport sizes
 * Monitor session usage and quotas
Production - How should I configure for production environments?
 * Use NPM installation for reliability
 * Configure appropriate timeouts
 * Implement error handling and retries
 * Monitor performance and resource usage
## 
[​](#further-reading)
Further Reading
## [Browserbase Documentation Complete platform documentation ](https://docs.browserbase.com)## [Stagehand Docs AI-powered browser automation ](https://docs.stagehand.dev/) Support Get help from our team
Was this page helpful?
YesNo
[Tools](/integrations/mcp/tools)[Introduction](/integrations/mongo-db/introduction)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.