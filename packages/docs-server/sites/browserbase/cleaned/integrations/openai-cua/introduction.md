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
 * [Introduction](/integrations/openai-cua/introduction)
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
OpenAI CUA
OpenAI Computer Use Agent
On this page
 * [Overview](#overview)
 * [Prerequisites](#prerequisites)
 * [Basic Integration](#basic-integration)
 * [Customizing the CUA Agent](#customizing-the-cua-agent)
 * [Related Resources](#related-resources)
# 
[​](#overview)
Overview
This guide walks you through integrating OpenAI’s Computer Use Agent (CUA) with Browserbase for seamless cloud-based browser automation. CUA is a cutting-edge AI model that can see the screen, understand context, and take actions within a browser—enabling advanced automation and interaction with web applications. By pairing CUA with Browserbase’s scalable remote browser infrastructure, you can run AI-powered automation effortlessly in the cloud. Try out the Computer Use Agent now: [cua.browserbase.com](https://cua.browserbase.com/)
## 
[​](#prerequisites)
Prerequisites
 * OpenAI API key with Computer Use Agent access
 * Browserbase account and API key
 * Python 3.8+
## 
[​](#basic-integration)
Basic Integration
This basic setup will get you up and running with a CUA agent using Browserbase as the underlying browser automation platform.
1
Clone the repository
Copy
Ask AI
```
git clone https://github.com/openai/openai-cua-sample-app.git
```
2
Install the required packages
Copy
Ask AI
```
pip install -r "requirements.txt"
```
3
Set the environment variables
Copy
Ask AI
```
BROWSERBASE_PROJECT_ID=YOUR_PROJECT_ID
BROWSERBASE_API_KEY=YOUR_API_KEY
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
OPENAI_ORG=YOUR_OPENAI_ORG
```
4
Run the agent
Update the prompt in your cli to change the behavior of the agent
Copy
Ask AI
```
python cli.py --computer browserbase --input "go to hackernews, tell me the top news"
```
# 
[​](#customizing-the-cua-agent)
Customizing the CUA Agent
The CUA agent can be customized by updating the flags in the CLI:
 * `--input`: The initial input to the agent (optional: the CLI will prompt you for input if not provided)
 * `--debug`: Enable debug mode.
 * `--show`: Show images (screenshots) during the execution.
 * `--start-url`: Start the browsing session with a specific URL (only for browser environments). By default, the CLI will start the browsing session with `https://bing.com`.
## 
[​](#related-resources)
Related Resources
## [Browserbase Documentation Explore the full Browserbase documentation ](https://docs.browserbase.com)## [OpenAI API Documentation Learn more about OpenAI’s APIs ](https://platform.openai.com/docs)## [Example Projects on GitHub Find the sample project for this integration ](https://github.com/openai/openai-cua-sample-app.git)
Was this page helpful?
YesNo
[Quickstart](/integrations/mongo-db/quickstart)[Introduction](/integrations/portia/introduction)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.