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
SDKs
Node.js SDK
On this page
 * [Installation](#installation)
 * [Basic usage](#basic-usage)
If you are working with Node.js, the official `@browserbasehq/sdk` package is the easiest way to connect and act upon headless browsers running on Browserbase.
## 
[​](#installation)
Installation
npm
pnpm
yarn
Copy
Ask AI
```
npm install -S @browserbasehq/sdk
```
## 
[​](#basic-usage)
Basic usage
Here is an example using the Browserbase Node.js SDK to create and connect to a session using Playwright:
Copy
Ask AI
```
import { chromium } from "playwright-core";
import Browserbase from "@browserbasehq/sdk";
const bb = new Browserbase({
 apiKey: process.env.BROWSERBASE_API_KEY as string,
});
(async () => {
 // Create a new session
 const session = await bb.sessions.create({
 projectId: process.env.BROWSERBASE_PROJECT_ID as string,
 });
 // Connect to the session
 const browser = await chromium.connectOverCDP(session.connectUrl);
 // Getting the default context to ensure the sessions are recorded.
 const defaultContext = browser.contexts()[0];
 const page = defaultContext?.pages()[0];
 await page?.goto("https://browserbase.com/");
 await page?.close();
 await browser.close();
 console.log(
 `Session complete! View replay at https://browserbase.com/sessions/${session.id}`,
 );
})().catch((error) => console.error(error.message));
```
## [Examples Quickstart examples using captcha solving, proxies, extensions, and more ](https://github.com/browserbase/sdk-node/tree/main/examples)## [Migration Guide Guide for migrating from old versions of the Node.js SDK ](/reference/sdk/nodejs_migration)## [NPM Package View the package on NPM ](https://www.npmjs.com/package/@browserbasehq/sdk)## [SDK Reference View the complete SDK reference documentation ](https://github.com/browserbase/sdk-node/blob/main/api.md)
Was this page helpful?
YesNo
[Overview](/reference/sdk/overview)[Python SDK](/reference/sdk/python)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.