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
Browserbase MCP Server
On this page
 * [Overview](#overview)
 * [Key Features](#key-features)
 * [Core Benefits](#core-benefits)
 * [Use Cases](#use-cases)
 * [Session Management](#session-management)
 * [Getting Started](#getting-started)
 * [Further Reading](#further-reading)
## 
[​](#overview)
Overview
The Browserbase MCP Server brings powerful browser automation capabilities to Claude through the Model Context Protocol (MCP). Built on top of [Stagehand](https://docs.stagehand.dev/), this integration provides AI-powered web automation using natural language commands.
This server enables Claude to control browsers, navigate websites, interact with web elements, and extract data—all through simple conversational commands.
## 
[​](#key-features)
Key Features
## Natural Language Automation
Control browsers using plain English commands like “click the login button” or “fill out the contact form”
## Web Interaction
Navigate, click, and fill forms with ease
## Data Extraction
Extract structured data from any website automatically
## Multi-Session Management
Run multiple browser sessions simultaneously for complex workflows
## Screenshot Capture
Capture and analyze webpage screenshots programmatically
## Cookie Management
Handle authentication and session persistence across interactions
## 
[​](#core-benefits)
Core Benefits
 * Ease of Use
 * Powerful Capabilities
 * Enterprise Ready
## Intuitive Commands
No need to learn complex selectors or automation syntax. Simply describe what you want to do in natural language.
## Quick Setup
Get started in minutes with our NPM package or our remote hosted URL.
## Smart Automation
Stagehand’s AI understands web page context and can adapt to different layouts and designs.
## 
[​](#use-cases)
Use Cases
 * Web Scraping & Data Collection
 * Testing
 * Workflow Automation
## E-commerce Monitoring
Track product prices, availability, and competitor information
## Market Research
Gather data from multiple sources for analysis and reporting
## Content Aggregation
Collect articles, posts, and media from various websites
## Lead Generation
Extract contact information and business data from directories
## 
[​](#session-management)
Session Management
The Browserbase MCP Server supports both single and multi-session architectures to accommodate different automation needs.
 * Single Session Mode
 * Multi-Session Mode
**Traditional Approach**
 * One active browser session at a time
 * Simpler for basic automation tasks
 * Automatic session lifecycle management
 * Ideal for sequential workflows
## 
[​](#getting-started)
Getting Started
1
Install the MCP Server
Choose from NPM installation, remote hosted URL, or local development based on your needs.
2
Configure Authentication
Set up your Browserbase API credentials in the MCP configuration. Get your API keys from the [Browserbase Dashboard](https://www.browserbase.com/overview).
3
Start Automating
Begin using natural language commands to control browsers through Claude.
Ready to get started? Check out our [Setup Guide](/integrations/mcp/setup) for detailed installation instructions.
## 
[​](#further-reading)
Further Reading
## [Setup Guide Get started with installation and configuration ](/integrations/mcp/setup)## [Available Tools Explore all available automation tools ](/integrations/mcp/tools)## [Configuration Options Customize your browser automation setup ](/integrations/mcp/configuration)
Was this page helpful?
YesNo
[Quickstart](/integrations/mastra/quickstart)[Setup](/integrations/mcp/setup)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.