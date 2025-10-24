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
 * [Introduction](/integrations/langchain/introduction)
 * [Python](/integrations/langchain/python)
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
Langchain
Langchain Integration
On this page
 * [Introduction](#introduction)
 * [Add Browserbase to your Langchain application](#add-browserbase-to-your-langchain-application)
## 
[​](#introduction)
Introduction
[Langchain](https://www.langchain.com/) is a Python framework to build applications on top of large-language models (OpenAI, Llama, Gemini). Building on top of LLMs comes with many challenges:
 * Gathering and preparing the data (context) and providing memory to models
 * Orchestrating tasks to match LLM API requirements (ex, rate limiting, chunking)
 * Parse the different LLM result format
Langchain comes with a set of high-level concepts and tools to cope with those challenges:
 * [Retrieval modules](https://js.langchain.com/v0.1/docs/modules/data_connection/retrievers/) such as [Document Loaders](https://js.langchain.com/docs/modules/data_connection/document_loaders/) or [Text splitter](https://js.langchain.com/docs/modules/data_connection/document_transformers/) help with gathering and preparing the data provided to the models
 * [Model I/O](https://js.langchain.com/docs/modules/model_io/) is a set of tools that help to normalize the APIs across multiple models (_ex: Prompt Templates_)
 * [Agents](https://js.langchain.com/docs/modules/agents/) and Tools help to build reasoning (_ex: how to answer based on provided context, what actions to take_)
 * [Chains](https://js.langchain.com/docs/modules/chains/) help in orchestrating all the above
![](https://mintcdn.com/browserbase/m1Ny8qOvNHvtrY7y/images/guides/langchain.png?fit=max&auto=format&n=m1Ny8qOvNHvtrY7y&q=85&s=9f6c2c14e3cc44626a3e1c991775ec46)
Browserbase provides a `Document Loader` to enable your Langchain application to browse the web to:
 * Extract text or raw HTML, including from web pages using JavaScript or dynamically rendered text
 * Load images via screenshots
## 
[​](#add-browserbase-to-your-langchain-application)
Add Browserbase to your Langchain application
To get started, proceed to the [Python](/integrations/langchain/python) guide to learn more about using Browserbase with Langchain.
## [Browserbase for Langchain (Python) Add Browserbase `Document Loader` to your Langchain Python application ](/integrations/langchain/python)
Was this page helpful?
YesNo
[Tutorial: Build a Flight Booker](/integrations/crew-ai/build-a-flight-booker)[Python](/integrations/langchain/python)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.