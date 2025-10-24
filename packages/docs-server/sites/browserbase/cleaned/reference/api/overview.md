[Skip to main content](#content-area)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
 * [Documentation](/introduction/what-is-browserbase)
 * [APIs and SDKs](/reference/introduction)
 * [Changelog](https://www.browserbase.com/changelog)
##### Overview
 * [Introduction](/reference/introduction)
##### SDKs
 * [Overview](/reference/sdk/overview)
 * [Node.js SDK](/reference/sdk/nodejs)
 * [Python SDK](/reference/sdk/python)
##### APIs
 * [Overview](/reference/api/overview)
 * Sessions API
 * Projects API
 * Contexts API
 * Extensions API
 * Support
 * [Dashboard](https://www.browserbase.com/overview)
[Browserbase Documentation home page![light logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/light.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=0f99c87492a4fb0e9bfc45075a78c64f)![dark logo](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/logo/dark.svg?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=645b212b9cbee8bebf84f318c2baaac0)](https://www.browserbase.com)
Search...
⌘K
Search...
Navigation
APIs
Overview
On this page
 * [Understanding Browser Sessions](#understanding-browser-sessions)
 * [API Reference](#api-reference)
## 
[​](#understanding-browser-sessions)
Understanding Browser Sessions
A browser session is the fundamental building block in Browserbase - it represents a single browser instance running in the cloud. Before diving into the APIs, we recommend familiarizing yourself with the core concepts:
## [Create a Browser Session Learn how to create and configure browser sessions ](/fundamentals/create-browser-session)## [Using Browser Sessions Connect and interact with browser sessions using your preferred framework ](/fundamentals/using-browser-session)## [Managing Sessions Understand session lifecycle and proper termination ](/fundamentals/manage-browser-session)## [Session Inspector Monitor and debug your browser sessions in real-time ](/features/session-inspector)
## 
[​](#api-reference)
API Reference
Once you understand the fundamentals, explore our APIs to get full control of your browser sessions:
## [Sessions API Create and manage browser sessions with full programmatic control. ](/reference/api/create-a-session)## [Projects API View project wide usage. ](/reference/api/get-project-usage)## [Contexts API Configure and reuse browser environments across multiple sessions. ](/reference/api/create-a-context)
**Authentication** All REST endpoints are authenticated using your [Browserbase API Key](/introduction/getting-started#overview-dashboard), configured as follows:
Node.js
Python
cURL
Copy
Ask AI
```
const response = await fetch(
 `https://api.browserbase.com/v1/sessions/${sessionId}`,
 {
 method: "GET",
 headers: {
 "x-bb-api-key": `${process.env.BROWSERBASE_API_KEY}`,
 },
 },
);
```
Was this page helpful?
YesNo
[Python SDK](/reference/sdk/python)[Create a Session](/reference/api/create-a-session)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.