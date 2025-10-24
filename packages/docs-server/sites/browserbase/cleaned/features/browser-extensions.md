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
Features
Browser Extensions
On this page
 * [Sample Extension](#sample-extension)
 * [Upload Your Extension](#upload-your-extension)
 * [Create a Session with Your Extension](#create-a-session-with-your-extension)
 * [Verify the Extension](#verify-the-extension)
For applications requiring enhanced functional capabilities, providing your own Chrome extension is a great option. With Browserbase, using extensions is easy.
## 
[​](#sample-extension)
Sample Extension
Here’s a simple example extension that modifies page titles. It consists of two files:
manifest.json
content-script.js
Copy
Ask AI
```
{
 "manifest_version": 3,
 "version": "1.0",
 "name": "My Test Extension",
 "description": "Test of a simple browser extension",
 "content_scripts": [
 {
 "matches": [
 "https://www.sfmoma.org/*"
 ],
 "js": [
 "content-script.js"
 ]
 }
 ]
}
```
You can download this sample extension [here](http://browser-tests-alpha.vercel.app/demo-extension.zip). The extension must be in a `.zip` file format with a `manifest.json` at the root. The file must be less than or equal to 100 MB.
## 
[​](#upload-your-extension)
Upload Your Extension
Once you have your extension files zipped up, you can upload it using our SDK:
 * Python
 * Node.js
Copy
Ask AI
```
from browserbase import Browserbase
bb = Browserbase(api_key="your-api-key")
# Upload the extension
with open("extension.zip", "rb") as f:
 extension = bb.extensions.create(f)
extension_id = extension.id
print(f"Extension uploaded with ID: {extension_id}")
```
## 
[​](#create-a-session-with-your-extension)
Create a Session with Your Extension
To use your extension, create a new session with the extension enabled:
 * Python
 * Node.js
Copy
Ask AI
```
from browserbase import Browserbase
bb = Browserbase(api_key="your-api-key")
# Create a session with the extension
session = bb.sessions.create(
 project_id="your-project-id",
 extension_id="your-extension-id"
)
print(f"Session created with ID: {session.id}")
```
Starting a new session with an extension can increase the session creation time. The browser must be restarted to load the extension, which itself has nonzero load time.
## 
[​](#verify-the-extension)
Verify the Extension
To verify your extension is working:
 1. Connect to your session using Playwright or Selenium
 2. Navigate to a page where your extension should be active
 3. Check for the expected modifications or behaviors
For the sample extension above, navigate to <https://www.sfmoma.org> and verify that the page title has been modified with the additional text.
Was this page helpful?
YesNo
[Contexts](/features/contexts)[Metadata](/features/session-metadata)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.