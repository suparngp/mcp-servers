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
 * [Introduction](/integrations/temporal/introduction)
 * [Quickstart](/integrations/temporal/quickstart)
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
Temporal
Introduction
On this page
 * [Overview](#overview)
 * [Why Temporal + Stagehand?](#why-temporal-%2B-stagehand%3F)
 * [The Problem with Traditional Browser Automation](#the-problem-with-traditional-browser-automation)
 * [The Temporal Solution](#the-temporal-solution)
 * [Use Cases](#use-cases)
 * [What You’ll Learn](#what-you%E2%80%99ll-learn)
 * [Next Steps](#next-steps)
## 
[​](#overview)
Overview
The **Temporal Integration** demonstrates how to build bulletproof browser automation using [Temporal’s](https://temporal.io/) durable execution platform combined with [Stagehand’s](https://docs.stagehand.dev/) AI-powered web scraping capabilities. This integration showcases industry best practices for handling browser automation failures with automatic retries, atomic activities, and idempotent operations that ensure reliable execution even when individual steps fail.
## Atomic Activities
Each task is a single, well-defined operation that can be independently retried
## Automatic Retries
Temporal handles failures with intelligent retry policies tailored to each activity
## Durable Execution
Workflows survive crashes, network failures, and infrastructure issues
## Observable
Complete visibility into workflow execution through Temporal’s Web UI
## 
[​](#why-temporal-%2B-stagehand%3F)
Why Temporal + Stagehand?
### 
[​](#the-problem-with-traditional-browser-automation)
The Problem with Traditional Browser Automation
Browser automation is inherently unreliable. Networks fail, pages change, elements don’t load, and browsers crash. Traditional approaches require complex error handling throughout your code, making it hard to maintain and debug.
### 
[​](#the-temporal-solution)
The Temporal Solution
Temporal abstracts away the complexity of failure handling:
 * **Automatic Retries** : Failed activities are automatically retried with configurable policies
 * **State Management** : Workflow state is preserved across failures and restarts
 * **Observability** : Complete execution history and real-time monitoring
 * **Scalability** : Distribute work across multiple workers automatically
## 
[​](#use-cases)
Use Cases
## Web Scraping Pipelines
Build reliable data extraction workflows that handle site changes and network issues
## E2E Testing
Create robust browser tests that retry failed steps instead of failing entire suites
## Monitoring & Alerting
Automate website monitoring with intelligent failure recovery
## Data Migration
Transfer data between systems with guaranteed completion despite failures
## 
[​](#what-you%E2%80%99ll-learn)
What You’ll Learn
By exploring this integration, you’ll master:
 * **Temporal Workflow Design** : How to structure durable, resilient workflows
 * **Activity Best Practices** : Writing atomic, idempotent operations
 * **Retry Strategy Design** : Configuring optimal retry policies for different scenarios
 * **Browser Session Management** : Handling browser lifecycle in distributed systems
 * **Error Recovery Patterns** : Building fault-tolerant automation systems
 * **Production Monitoring** : Using Temporal’s observability tools effectively
This integration serves as a template for any browser automation that needs to be production-ready and fault-tolerant.
## 
[​](#next-steps)
Next Steps
Ready to build bulletproof browser automation? Start with our Quickstart Guide to get the Temporal integration running locally.
## [Quickstart Guide Set up the Temporal integration in minutes ](/integrations/temporal/quickstart)## [Temporal Docs Learn more about Temporal workflows ](https://docs.temporal.io/)
Was this page helpful?
YesNo
[Quickstart](/integrations/stripe/quickstart)[Quickstart](/integrations/temporal/quickstart)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.