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
Browserbase MCP Server Tools
On this page
 * [Overview](#overview)
 * [Core Browser Automation Tools](#core-browser-automation-tools)
 * [Single Session Management](#single-session-management)
 * [Multi-Session Management](#multi-session-management)
 * [Session Lifecycle Management](#session-lifecycle-management)
 * [Session-Specific Automation Tools](#session-specific-automation-tools)
 * [Multi-Session Use Cases](#multi-session-use-cases)
 * [Resources](#resources)
 * [Further Reading](#further-reading)
## 
[​](#overview)
Overview
The Browserbase MCP server provides comprehensive tools for browser automation and session management. These tools allow you to perform actions like navigating pages, capturing screenshots, manipulating cookies, and managing multiple browser sessions simultaneously.
## 
[​](#core-browser-automation-tools)
Core Browser Automation Tools
These are the primary tools for modern web automation using natural language commands.
browserbase_stagehand_navigate
Navigate to any URL in the browser
[​](#param-url)
url
string
required
The URL to navigate to
browserbase_stagehand_act
Perform an action on the web page using natural language
[​](#param-action)
action
string
required
The action to perform (e.g., “click the login button”, “fill form field”)
browserbase_stagehand_extract
Extract all text content from the current page (filters out CSS and JavaScript)
No input parameters required
[​](#param-instruction)
instruction
string
Extracted text content from the current page
browserbase_stagehand_observe
Observe and find actionable elements on the web page
[​](#param-instruction-1)
instruction
string
required
Specific instruction for observation (e.g., “find the login button”, “locate search form”)
browserbase_screenshot
Capture a PNG screenshot of the current page
No input parameters required
[​](#param-image)
image
string
Base-64 encoded PNG data
browserbase_stagehand_get_url
Get the current URL of the browser page
No input parameters required
[​](#param-url-1)
url
string
Complete URL including protocol, domain, path, and any query parameters or fragments
browserbase_stagehand_get_all_urls
Get current URLs of all active browser sessions
No input parameters required
[​](#param-session-urls)
sessionUrls
object
Mapping of session IDs to their current URLs in JSON format
## 
[​](#single-session-management)
Single Session Management
Traditional approach with one active browser session. Simpler for basic automation tasks and automatically manages the active session.
browserbase_session_create
Create or reuse a cloud browser session using Browserbase with fully initialized Stagehand
[​](#param-session-id)
sessionId
string
Optional session ID to use/reuse. If not provided, creates new session
browserbase_session_close
Close the current Browserbase session, disconnect the browser, and cleanup Stagehand instance
No input parameters required
## 
[​](#multi-session-management)
Multi-Session Management
Advanced approach with multiple parallel browser sessions for complex automation workflows. Each session maintains independent state, cookies, and browser context.
### 
[​](#session-lifecycle-management)
Session Lifecycle Management
multi_browserbase_stagehand_session_create
Create a new independent Stagehand browser session with full web automation capabilities
[​](#param-name)
name
string
Human-readable name for tracking (e.g., ‘login-flow’, ‘data-scraping’)
multi_browserbase_stagehand_session_list
List all currently active Stagehand browser sessions with detailed metadata
No input parameters required
multi_browserbase_stagehand_session_close
Close and clean up a specific Stagehand browser session
[​](#param-session-id-1)
sessionId
string
required
Exact session ID to close (cannot be undone)
### 
[​](#session-specific-automation-tools)
Session-Specific Automation Tools
All core browser automation tools are available with session-specific variants:
multi_browserbase_stagehand_navigate_session
Navigate to a URL in a specific browser session
[​](#param-session-id-2)
sessionId
string
required
The session ID to use
[​](#param-url-2)
url
string
required
The URL to navigate to
multi_browserbase_stagehand_act_session
Perform an action in a specific browser session using natural language
[​](#param-session-id-3)
sessionId
string
required
The session ID to use
[​](#param-action-1)
action
string
required
The action to perform
multi_browserbase_stagehand_extract_session
Extract structured information from a specific browser session
[​](#param-session-id-4)
sessionId
string
required
The session ID to use
[​](#param-instruction-2)
instruction
string
required
What to extract from the page
multi_browserbase_stagehand_observe_session
Observe and find actionable elements in a specific browser session
[​](#param-session-id-5)
sessionId
string
required
The session ID to use
[​](#param-instruction-3)
instruction
string
required
What to observe (e.g., “find the login button”)
[​](#param-return-action)
returnAction
boolean
Whether to return the action to perform
multi_browserbase_stagehand_get_url_session
Get the current URL of a specific browser session
[​](#param-session-id-6)
sessionId
string
required
The session ID to use
[​](#param-url-3)
url
string
Complete URL including protocol, domain, path, and any query parameters or fragments
### 
[​](#multi-session-use-cases)
Multi-Session Use Cases
## Parallel Data Collection
Run multiple scraping sessions simultaneously across different websites
## A/B Testing
Compare user flows across different browser sessions with varying configurations
## Cross-Site Operations
Perform coordinated actions across multiple websites or applications
## Backup Sessions
Keep fallback sessions ready in case primary sessions encounter issues
## 
[​](#resources)
Resources
## Screenshot Resources
The server provides access to screenshot resources with URI-based access.example:
Copy
Ask AI
```
screenshot://screenshot-name-of-the-screenshot
```
## 
[​](#further-reading)
Further Reading
## [Model Context Protocol (MCP) Docs Learn more about the MCP protocol ](https://modelcontextprotocol.io/introduction)## [Stagehand Documentation Explore Stagehand’s AI-powered browser automation ](https://docs.stagehand.dev/) Support Get help from our support team
Was this page helpful?
YesNo
[Setup](/integrations/mcp/setup)[Configuration](/integrations/mcp/configuration)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.