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
Single Sign-On (SSO) Setup
On this page
 * [Single Sign-On (SSO) with SAML](#single-sign-on-sso-with-saml)
 * [Supported Identity Providers](#supported-identity-providers)
 * [How Setup Works](#how-setup-works)
 * [Step 1: Your IT Team Shares IdP Configuration](#step-1%3A-your-it-team-shares-idp-configuration)
 * [Step 2: Browserbase Provides Service Provider Details](#step-2%3A-browserbase-provides-service-provider-details)
 * [Step 3: Your IT Team Configures the SAML Application](#step-3%3A-your-it-team-configures-the-saml-application)
 * [Step 4: Joint Testing](#step-4%3A-joint-testing)
 * [Step 5: Browserbase Enables SSO](#step-5%3A-browserbase-enables-sso)
 * [Required Attributes](#required-attributes)
 * [Testing](#testing)
 * [Next Steps](#next-steps)
# 
[​](#single-sign-on-sso-with-saml)
Single Sign-On (SSO) with SAML
Browserbase supports **SAML 2.0-based Single Sign-On (SSO)** so your team can log in with your corporate identity provider (IdP). 
This guide walks you through the setup process.
SSO is available only to Enterprise Plans. Please [get in touch](https://www.browserbase.com/contact) with our team to enable SSO on your Browserbase account.
* * *
## 
[​](#supported-identity-providers)
Supported Identity Providers
Any **SAML 2.0-compliant IdP** is supported, including:
 * Okta Workforce
 * Microsoft Entra ID (formerly Azure AD)
 * Google Workspace (SAML)
 * Custom SAML providers
* * *
## 
[​](#how-setup-works)
How Setup Works
SSO setup involves coordination between your IT team and Browserbase support. Here’s the process: **Example:** Acme Corp wants to enable Okta SSO for their Browserbase organization.
### 
[​](#step-1%3A-your-it-team-shares-idp-configuration)
Step 1: Your IT Team Shares IdP Configuration
Your IT administrator sends the following details from your identity provider to support@browserbase.com:
 * **Sign-on URL (SSO URL)** - Where Browserbase redirects users for authentication
 * **Entity ID / Issuer** - Your IdP’s unique identifier
 * **X.509 Signing Certificate** - Used to verify SAML assertions
### 
[​](#step-2%3A-browserbase-provides-service-provider-details)
Step 2: Browserbase Provides Service Provider Details
The Browserbase team responds with configuration values your IT team needs:
 * **Assertion Consumer Service (ACS) URL** - Where your IdP sends authentication responses
 * **Entity ID (Audience URI)** - Browserbase’s unique identifier
 * **Metadata URL** - Complete SAML configuration (preferred method)
### 
[​](#step-3%3A-your-it-team-configures-the-saml-application)
Step 3: Your IT Team Configures the SAML Application
Your administrator creates a new SAML application in your IdP (e.g., Okta, Azure AD) using the Browserbase SP details.
### 
[​](#step-4%3A-joint-testing)
Step 4: Joint Testing
Both teams coordinate to test the login flow and verify that user attributes are mapped correctly.
### 
[​](#step-5%3A-browserbase-enables-sso)
Step 5: Browserbase Enables SSO
Once testing is successful, the Browserbase team enables SSO for your organization.
* * *
## 
[​](#required-attributes)
Required Attributes
Browserbase requires the following attributes in the SAML assertion:
 * **User ID** – A stable, unique identifier for the user (e.g., Okta `user.id`)
 * **Email Address** – The user’s email (e.g., Okta `user.email`)
 * **First Name** – The user’s given name (e.g., Okta `user.firstName`)
 * **Last Name** – The user’s surname (e.g., Okta `user.lastName`)
Your IdP may expose these as `NameID`, attribute statements, or claims. Please ensure the values are passed consistently to Browserbase.
* * *
## 
[​](#testing)
Testing
 * **SP-initiated login** (recommended) 
Start from the Browserbase login page → redirected to your IdP → redirected back after successful authentication.
* * *
## 
[​](#next-steps)
Next Steps
 1. Collect your IdP configuration values.
 2. Share them with Browserbase at support@browserbase.com.
 3. Our team will reply with the Browserbase SP details.
 4. Together we’ll test and finalize the integration.
* * *
Once complete, your users can securely log in to Browserbase with SSO.
Was this page helpful?
YesNo
[Handling Authentication](/guides/authentication)[Enterprise Security](/guides/security)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.