[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * * [Quickstart Guided](/)
 * [Migrate to Warp](/getting-started/migrate-to-warp)
 * [Supported Shells](/getting-started/supported-shells)
 * [Keyboard Shortcuts](/getting-started/keyboard-shortcuts)
 * [Changelog](/getting-started/changelog)
 * * [Agents Overview](/agents/agents-overview)
 * [Using Agents](/agents/using-agents)
 * [Slash Commands](/agents/slash-commands)
 * [Active AI](/agents/active-ai)
 * [Generate](/agents/generate)
 * [Voice](/agents/voice)
 * [AI FAQs](/agents/ai-faqs)
 * * [Code Overview](/code/code-overview)
 * [Code Editor](/code/code-editor)
 * [Codebase Context](/code/codebase-context)
 * [Code Review](/code/code-review)
 * [Code Diffs in Agent Conversations](/code/reviewing-code)
 * * [Universal Input](/terminal/universal-input)
 * [Appearance](/terminal/appearance)
 * [Blocks](/terminal/blocks)
 * [Modern Text Editing](/terminal/editor)
 * [Command Entry](/terminal/entry)
 * [Command Completions](/terminal/command-completions)
 * [Command Palette](/terminal/command-palette)
 * [Session Management](/terminal/sessions)
 * [Window Management](/terminal/windows)
 * [Warpify](/terminal/warpify)
 * [More Features](/terminal/more-features)
 * [Comparisons](/terminal/comparisons)
 * [Integrations](/terminal/integrations-and-plugins)
 * * [Warp Drive](/knowledge-and-collaboration/warp-drive)
 * [Model Context Protocol (MCP)](/knowledge-and-collaboration/mcp)
 * [Rules](/knowledge-and-collaboration/rules)
 * [Teams](/knowledge-and-collaboration/teams)
 * [Admin Panel](/knowledge-and-collaboration/admin-panel)
 * [Session Sharing](/knowledge-and-collaboration/session-sharing)
 * * [Warp CLI](/developers/cli)
 * * [Privacy](/privacy/privacy)
 * [Secret Redaction](/privacy/secret-redaction)
 * [Network Log](/privacy/network-log)
 * * [Refer a Friend & Earn Rewards](/community/refer-a-friend)
 * [Warp Preview & Alpha Program](/community/warp-preview-and-alpha-program)
 * * [Sending Feedback & Logs](/support-and-billing/sending-us-feedback)
 * [Plans & Pricing](/support-and-billing/plans-and-pricing)
 * [Updating Warp](/support-and-billing/updating-warp)
 * [Using Warp Offline](/support-and-billing/using-warp-offline)
 * [Logging Out & Uninstalling](/support-and-billing/uninstalling-warp)
 * [Known Issues](/support-and-billing/known-issues)
 * [Troubleshooting Login](/support-and-billing/troubleshooting-login-issues)
 * [Open Source Licenses](/support-and-billing/licenses)
[Powered by GitBook](https://www.gitbook.com/?utm_source=content&utm_medium=trademark&utm_campaign=-MbqIgTw17KQvq_DQuRr)
 * [Can't sign up for or log into Warp](#cant-sign-up-for-or-log-into-warp)
 * [All browsers](#all-browsers)
 * [Safari](#safari)
 * [Proxies](#proxies)
 * [SSO login](#sso-login)
 * [Can't open Warp from SSO](#cant-open-warp-from-sso)
 * [I logged in with another method before and now can't use SSO](#i-logged-in-with-another-method-before-and-now-cant-use-sso)
 * [How to get an Auth token to login](#how-to-get-an-auth-token-to-login)
 * [Get help with login issues](#get-help-with-login-issues)
Was this helpful?
## 
[](#cant-sign-up-for-or-log-into-warp)
Can't sign up for or log into Warp
Clicking it should open a signup or login pop-up. If clicking the button opens a blank pop-up window, try using a proxy. Your ISP or Firewall may be blocking the app's call to `*.googleapis.com`.
In some older Ruby development environments, `.dev` domains do not resolve properly and you may need to delete the `/etc/resolver/dev`, see more [here](https://superuser.com/questions/1374892/dev-domains-dont-resolve).
## 
[](#all-browsers)
All browsers
This error could occur if you installed an ad blocker or have stale browser cookies, including our Firebase auth pop-up. **To fix it:**
 1. Disable your ad blocker for `app.warp.dev`
 2. Clear any cookies and cache, or open a incognito / private browser window
 3. Try <http://app.warp.dev/login> again
### 
[](#safari)
Safari
You are on Safari and you might notice in your console that you get the following messages:
 1. `Unable to access localStorage`
 2. And every time you click the "Sign Up" button, you get `Unhandled Promise Rejection: Error: This operation is not supported in the environment the application is running on. "location.protocol" must be http, https, or chrome-extension and web storage must be enabled.`
This error occurs likely because you are blocking all cookies in Safari's security settings, but Firebase Auth requires the cookie to record whether the user is logged in. **To fix it:**
 1. Go to Safari Preferences > Privacy
 2. Uncheck the "Block all cookies" checkbox
## 
[](#proxies)
Proxies
When behind a proxy, a possible workaround is to disable QUIC in the browser. It will then fall back to TCP and likely allow login.
 * In Chrome, or Chromium-based browsers like Edge, Opera, and Arc, type `chrome://flags` into the address bar.
 1. In the search bar on the flags page, type `Experimental QUIC protocol`.
 2. Locate the "Experimental QUIC protocol" flag and click on the drop-down menu next to it.
 3. Select "Disabled" from the options.
 4. Relaunch Chrome for the changes to take effect.
 * In Firefox, type `about:config` into the address bar.
 1. You will see a warning message. Click on the "Accept the Risk and Continue" button.
 2. In the search bar, type `network.http.http3.enable`.
 3. Double-click on the `network.http.http3.enable` preference to set its value to `false`. This will disable QUIC in Firefox.
 4. Restart Firefox for the changes to take effect.
 * In Safari, Unfortunately, there is no built-in option to disable QUIC in Safari. Safari uses QUIC as its default transport protocol and does not provide a user-accessible setting to disable it.
## 
[](#sso-login)
SSO login
### 
[](#cant-open-warp-from-sso)
Can't open Warp from SSO
Directly launching Warp from Okta or other SSO providers' pages isn’t supported. This is due to a limitation with Warp authentication APIs. Instead, do the following:
 1. Go to [app.warp.dev/login](http://app.warp.dev/login)
 2. Choose “Continue with SSO”
 3. Login with your normal SSO credentials
### 
[](#i-logged-in-with-another-method-before-and-now-cant-use-sso)
I logged in with another method before and now can't use SSO
In cases where you logged in with another method, please do the following to fix SSO login:
 1. Go to [app.warp.dev/login](http://app.warp.dev/login)
 2. Login with the original method that you used to create your Warp account (email, Google, Github).
 3. Once logged in, go to [app.warp.dev/link_sso](https://app.warp.dev/link_sso)
 4. This should link your login to SSO. You can now proceed to login with "Continue with SSO".
## 
[](#how-to-get-an-auth-token-to-login)
How to get an Auth token to login
If the browser does not open from Warp directly when you click "Sign up" or "Sign in". Please go to the [Signup ](https://app.warp.dev/signup)page to create an account or [Login](https://app.warp.dev/login) page if you already have one, then copy the auth token from the "here" link on the logged_in page and paste it into Warp.
If nothing happens when you click "Take me to Warp" on the logged-in page. If this happens to you, copy the "here" link on the web logged-in page (https://app.warp.dev/logged_in) to copy the authentication token, then paste it into the app as shown below.
the On Linux, the default copy-and-paste [Keyboard shortcuts](/getting-started/keyboard-shortcuts) are `CTRL-SHIFT-C` and `CTRL-SHIFT-V` respectively. On Linux and WSL you should install and set your default `$BROWSER` to `brave-browser` to workaround any copy-paste issues. Please see the workaround guide below.
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-7ffe106c39bee67b4de47eddcf0f27d4093bfb0d%252Fauth-token-demo.gif%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=3c9821d9&sv=2)
Authentication Token Linux
![](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-274f6892c157adc07e85a64f2d9ca0d2cd58577c%252Fauth-token-flow.png%3Falt%3Dmedia%26token%3Deb46d29b-2e8c-49d3-89b7-91b028615b99&width=768&dpr=4&quality=100&sign=484cbb50&sv=2)
Authentication Token Mac
If "Take me to Warp" is still not working it may be due to a [proxy issue](/support-and-billing/troubleshooting-login-issues#proxies), please see this article for more information on a workaround [here](https://embiid.blog/post/WARP-does-not-work-after-submitting-an-invite-code/).
## 
[](#get-help-with-login-issues)
Get help with login issues
If Sign Up or Login does not work after trying the steps above, fill out [this Typeform](https://warpdotdev.typeform.com/to/UnZu0akR?question=sign_up?utm_source=docs) and our team will reach out to you.
[PreviousKnown Issues](/support-and-billing/known-issues)[NextOpen Source Licenses](/support-and-billing/licenses)
Last updated 1 month ago
Was this helpful?