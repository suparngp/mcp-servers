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
 * [Introduction](/integrations/agno/introduction)
 * [Quickstart](/integrations/agno/quickstart)
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
Agno
Add web browsing capabilities to Agno
On this page
 * [Setup](#setup)
 * [Basic Example](#basic-example)
 * [Essential Functions](#essential-functions)
Get up and running with web scraping in under 5 minutes.
## 
[​](#setup)
Setup
**Install packages:**
Copy
Ask AI
```
pip install browserbase playwright agno
```
**Set environment variables:**
Copy
Ask AI
```
export BROWSERBASE_API_KEY=your_api_key_here
export BROWSERBASE_PROJECT_ID=your_project_id_here
```
To get env variables, go over the [Dashboard’s Settings tab](https://www.browserbase.com/settings):
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/quickstart/api-key.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=b9a4d1261a99b7160d615f1d2ee7a6c9)
Then copy your API Key directly from the input and set the `BROWSERBASE_API_KEY` and `BROWSERBASE_PROJECT_ID`environment variable.
## 
[​](#basic-example)
Basic Example
Copy
Ask AI
```
from agno.agent import Agent
from agno.tools.browserbase import BrowserbaseTools
# Create scraping agent 
agent = Agent(
 name="Web Scraper",
 tools=[BrowserbaseTools()],
 instructions=[
 "Extract content clearly and format nicely",
 "Always close sessions when done"
 ],
 markdown=True,
)
# Scrape quotes
response = agent.run("""
 Go to https://quotes.toscrape.com and:
 1. Get the first 3 quotes with authors
 2. Navigate to page 2 
 3. Get 2 more quotes from page 2
""")
print(response.content)
```
## 
[​](#essential-functions)
Essential Functions
Function | Purpose | Usage 
---|---|--- 
`navigate_to` | Go to URL | ”Navigate to <https://example.com>” 
`get_page_content` | Extract HTML | ”Get the page content” 
`screenshot` | Take screenshot | ”Take screenshot, save as ‘page.png‘“ 
`close_session` | End session | ”Close the current session” 
Was this page helpful?
YesNo
[Introduction](/integrations/agno/introduction)[Introduction](/integrations/braintrust/introduction)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.