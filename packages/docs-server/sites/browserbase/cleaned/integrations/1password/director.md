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
 * [Introduction](/integrations/1password/introduction)
 * [Quickstart](/integrations/1password/quickstart)
 * [Director](/integrations/1password/director)
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
1Password
Setup 1Password Nightly Autofill for Director
On this page
 * [Prerequisites](#prerequisites)
 * [Admin Setup (One-Time)](#admin-setup-one-time)
 * [Enable Agentic Autofill](#enable-agentic-autofill)
 * [User Setup](#user-setup)
 * [1. Install 1Password Desktop App](#1-install-1password-desktop-app)
 * [2. Switch to the Nightly Channel](#2-switch-to-the-nightly-channel)
 * [3. Add Login Credentials for Testing](#3-add-login-credentials-for-testing)
 * [4. Install 1Password Nightly Browser Extension](#4-install-1password-nightly-browser-extension)
 * [5. Connect Director with 1Password](#5-connect-director-with-1password)
 * [6. Try it Out](#6-try-it-out)
 * [Troubleshooting](#troubleshooting)
 * [Next Steps](#next-steps)
This setup enables **Agentic Autofill** , a Nightly feature that allows AI agents like Director to securely request and use credentials from your 1Password vault.
## 
[​](#prerequisites)
Prerequisites
Before you begin, make sure you have:
 * [A Browserbase account](https://www.browserbase.com/sign-up)
 * [A 1Password account](https://start.1password.com/)
This guide uses **1Password Nightly** , a pre-release channel with experimental features. It’s recommended for testing and development only.
* * *
## 
[​](#admin-setup-one-time)
Admin Setup (One-Time)
You need **admin access** to your 1Password account to enable Agentic Autofill policies.
This is a one-time setup per 1Password account/workspace. Once enabled, all members can use Agentic Autofill.
### 
[​](#enable-agentic-autofill)
Enable Agentic Autofill
Sign in to [1Password.com](https://1password.com) and go to **Policies** in the left sidebar:
Navigate to Policies in 1Password web interface
![Navigate to Policies in 1Password web interface](https://mintcdn.com/browserbase/-YGePiQOw9pz8e4z/integrations/1password/admin-1.png?fit=max&auto=format&n=-YGePiQOw9pz8e4z&q=85&s=72ff8f0ac63594927dd38dfed179fa17)
Click **Sharing and permissions** then **Manage policies** :
Access Sharing and permissions policies
![Access Sharing and permissions policies](https://mintcdn.com/browserbase/-YGePiQOw9pz8e4z/integrations/1password/admin-2.png?fit=max&auto=format&n=-YGePiQOw9pz8e4z&q=85&s=fe0efb3edcc36baae244a3144d77b80d)
Scroll to the bottom and enable **Agentic permissions** to turn on Agentic Autofill:
Enable Agentic permissions in 1Password policies
![Enable Agentic permissions in 1Password policies](https://mintcdn.com/browserbase/-YGePiQOw9pz8e4z/integrations/1password/admin-3.png?fit=max&auto=format&n=-YGePiQOw9pz8e4z&q=85&s=9dc7fa088b70bfa354331cd68007db1b)
**Important:** Scroll to the very bottom and click **Save**.
* * *
## 
[​](#user-setup)
User Setup
### 
[​](#1-install-1password-desktop-app)
1. Install 1Password Desktop App
Download and install the latest 1Password desktop application. Visit the [1Password download page](https://1password.com/downloads/) and download the latest version. If you have 1Password installed via Kandji or another management system:
 1. Open **Finder**
 2. Navigate to **Applications**
 3. Right-click **1Password** and choose **Move to Trash**
If 1Password is still running in the macOS menu bar after closing, right-click the menu bar icon and select **Quit**.
Then install the new version:
 1. In your **Downloads** folder, locate **1Password.zip**
 2. Double-click to unzip and reveal “1Password Installer”
 3. Open the installer and follow the prompts
* * *
### 
[​](#2-switch-to-the-nightly-channel)
2. Switch to the Nightly Channel
When 1Password opens, your existing Browserbase account should appear automatically. In the upper-left of the app, click your **account name** and then click **Settings** at the bottom of the menu. Find the **Release channel** dropdown and change it to **Nightly** :
1Password settings showing release channel option
![1Password settings showing release channel option](https://mintcdn.com/browserbase/-YGePiQOw9pz8e4z/integrations/1password/app-nightly-1.png?fit=max&auto=format&n=-YGePiQOw9pz8e4z&q=85&s=e390b38d03ca185c3f481eb5ef6999bb)
Click **Check for updates** in the About section:
Check for updates in 1Password About section
![Check for updates in 1Password About section](https://mintcdn.com/browserbase/-YGePiQOw9pz8e4z/integrations/1password/app-nightly-2.png?fit=max&auto=format&n=-YGePiQOw9pz8e4z&q=85&s=71e3f0cfe58397b625c89ffb56b4e98c)
Download and restart when prompted:
Download 1Password Nightly update
![Download 1Password Nightly update](https://mintcdn.com/browserbase/-YGePiQOw9pz8e4z/integrations/1password/app-nightly-3.png?fit=max&auto=format&n=-YGePiQOw9pz8e4z&q=85&s=25e78d747c0976f2965021f96589eea1)
1Password Nightly successfully installed
![1Password Nightly successfully installed](https://mintcdn.com/browserbase/-YGePiQOw9pz8e4z/integrations/1password/app-nightly-4.png?fit=max&auto=format&n=-YGePiQOw9pz8e4z&q=85&s=5d86a7ad357b1871639356db1c10eff1)
If the app still shows the stable channel after restarting, re-open Settings and confirm **Nightly** is selected, then check for updates again.
* * *
### 
[​](#3-add-login-credentials-for-testing)
3. Add Login Credentials for Testing
Let’s add test credentials for saucedemo.com as an example. Click the **+ New Item** button in the upper-right and choose **Login** :
Create new login item in 1Password
![Create new login item in 1Password](https://mintcdn.com/browserbase/-YGePiQOw9pz8e4z/integrations/1password/credentials-1.png?fit=max&auto=format&n=-YGePiQOw9pz8e4z&q=85&s=0a11ad05a09a568ec81b3bba4f7424d9)
Enter the following details:
 * **Username** : `standard_user`
 * **Password** : `secret_sauce`
 * **Website** : `saucedemo.com`
Fill in login credentials
![Fill in login credentials](https://mintcdn.com/browserbase/-YGePiQOw9pz8e4z/integrations/1password/credentials-2.png?fit=max&auto=format&n=-YGePiQOw9pz8e4z&q=85&s=55fab5631a43f357e96a6f3e1caa7da5)
Click **Save** :
Save the login item
![Save the login item](https://mintcdn.com/browserbase/-YGePiQOw9pz8e4z/integrations/1password/credentials-3.png?fit=max&auto=format&n=-YGePiQOw9pz8e4z&q=85&s=055fcaebca1f7b910e3d5ca459fc47da)
You can add any website credentials you want to use with [Director](https://director.ai). This example uses saucedemo.com for testing.
* * *
### 
[​](#4-install-1password-nightly-browser-extension)
4. Install 1Password Nightly Browser Extension
Visit the [Chrome Web Store](https://chromewebstore.google.com/detail/1password-nightly-%E2%80%93-passw/gejiddohjgogedgjnonbofjigllpkmbf?hl=en) and click **Add to Chrome** to install the **1Password Nightly** extension. Follow the prompts to complete the installation.
* * *
### 
[​](#5-connect-director-with-1password)
5. Connect Director with 1Password
Go to [Director.ai](https://director.ai) and sign in with your **Browserbase account** in the upper-right:
Director AI homepage
![Director AI homepage](https://mintcdn.com/browserbase/-YGePiQOw9pz8e4z/integrations/1password/demo-1.png?fit=max&auto=format&n=-YGePiQOw9pz8e4z&q=85&s=f83501a2db1f1464b25fb4c4813f9f0e)
Click “Connect with 1Password”:
Click the Connect with 1Password button
![Click the Conect with 1Password button](https://mintcdn.com/browserbase/-YGePiQOw9pz8e4z/integrations/1password/demo-2.png?fit=max&auto=format&n=-YGePiQOw9pz8e4z&q=85&s=dd269db9e3d5db8052f533ebe7e17675)
Follow the prompt to **Login with 1Password**. You should return to director.ai with the integration enabled:
1Password integration enabled in Director
![1Password integration enabled in Director](https://mintcdn.com/browserbase/-YGePiQOw9pz8e4z/integrations/1password/demo-4.png?fit=max&auto=format&n=-YGePiQOw9pz8e4z&q=85&s=e249487263181e762fc0bb51ebcfb909)
* * *
### 
[​](#6-try-it-out)
6. Try it Out
In the Director prompt, type:
Copy
Ask AI
```
Navigate to saucedemo.com and login with 1Password
```
Wait for Director to navigate to the site (~10 seconds). Director will click **Login with 1Password** :
Director navigates to saucedemo.com
![Director navigates to saucedemo.com](https://mintcdn.com/browserbase/-YGePiQOw9pz8e4z/integrations/1password/demo-6.png?fit=max&auto=format&n=-YGePiQOw9pz8e4z&q=85&s=cfcd2a9ee7a8769e7d424178f4241424)
You should see a credential selection prompt:
1Password autofill prompt in Director
![1Password autofill prompt in Director](https://mintcdn.com/browserbase/lUkHCCQ3HJMpCnfp/integrations/1password/1pass_login.png?fit=max&auto=format&n=lUkHCCQ3HJMpCnfp&q=85&s=737c6e8bbc9228c1f653ab23ae66df35)
Select your **saucedemo.com** credentials from the prompt. Director will automatically fill in the username and password, and the login should complete successfully:
Successfully logged in with 1Password
![Successfully logged in with 1Password](https://mintcdn.com/browserbase/-YGePiQOw9pz8e4z/integrations/1password/demo-7.png?fit=max&auto=format&n=-YGePiQOw9pz8e4z&q=85&s=c6a7d81bb83175f32772f6b941f4cd61)
* * *
## 
[​](#troubleshooting)
Troubleshooting
Extension Fails to Load
 * Verify you installed the **1Password Nightly** extension (not the stable version)
 * Ensure the extension is enabled in Chrome at `chrome://extensions`
Integration Not Showing in Director
 * Confirm you’re signed in to Director with your Browserbase account
 * Refresh the Director page and try enabling the integration again
![1Password Nightly successfully installed](https://mintcdn.com/browserbase/-YGePiQOw9pz8e4z/integrations/1password/app-nightly-4.png?fit=max&auto=format&n=-YGePiQOw9pz8e4z&q=85&s=5d86a7ad357b1871639356db1c10eff1)
Credentials Not Appearing
 * Verify the login item exists in your 1Password vault
 * Ensure the website field matches the site you’re trying to access
 * Check that Agentic permissions are enabled in your account policies
App Still Shows Stable Channel
 * Re-open 1Password Settings
 * Confirm **Nightly** is selected in the Release channel dropdown
 * Manually check for updates again
* * *
## 
[​](#next-steps)
Next Steps
## [1Password SDK Integration Learn how to programmatically access 1Password credentials using the SDK ](/integrations/1password/quickstart)## [Contexts Use contexts to maintain authenticated sessions across workflows ](/features/contexts)
Was this page helpful?
YesNo
[Quickstart](/integrations/1password/quickstart)[Introduction](/integrations/agentkit/introduction)
⌘I
Assistant
Responses are generated using AI and may contain mistakes.