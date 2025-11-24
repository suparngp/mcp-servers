`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Tutorials](/docs/tutorials)
 * [When to use prompt-based vs agent mode in LaunchDarkly](/docs/tutorials/agent-vs-completion)
 * [When to Add Online Evals to Your AI Configs](/docs/tutorials/when-to-add-online-evals)
 * [Detecting User Frustration: Understanding Rage Clicks and Session Replay](/docs/tutorials/detecting-user-frustration-session-replay)
 * [AI Config CI/CD Pipeline: Automated Quality Gates and Safe Deployment](/docs/tutorials/aic-cicd)
 * [Resilient architecture patterns for LaunchDarkly's SDKs](/docs/tutorials/sdk-resilience-best-practices)
 * [Proving ROI with Data-Driven AI Agent Experiments](/docs/tutorials/ai-experiments-roi)
 * [A Deeper Look at LaunchDarkly Architecture: More than Feature Flags](/docs/tutorials/ld-arch-deep-dive)
 * [Add Observability to Your React Native App in 5 minutes](/docs/tutorials/react-native-observability)
 * [Smart AI Agent Targeting with MCP Tools](/docs/tutorials/multi-agent-mcp-targeting)
 * [Build a LangGraph Multi-Agent System in 20 Minutes with LaunchDarkly AI Configs](/docs/tutorials/agents-langgraph)
 * [Snowflake Cortex Completion API + LaunchDarkly SDK Integration](/docs/tutorials/snowflake-tutorial)
 * [Using AI Configs to review database changes](/docs/tutorials/ai-configs-review-database-changes)
 * [How to implement WebSockets and kill switches in a Python application](/docs/tutorials/python-flask-websockets-kill-switch-flags)
 * [4 hacks to turbocharge your Cursor productivity](/docs/tutorials/cursor-tips-and-tricks)
 * [Create a feature flag in your IDE in 5 minutes with LaunchDarkly's MCP server](/docs/tutorials/mcp-server-feature-flags)
 * [DeepSeek vs Qwen: local model showdown featuring LaunchDarkly AI Configs](/docs/tutorials/ollama-javascript)
 * [Video tutorials](/docs/tutorials/videos)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [What is a rage click?](#what-is-a-rage-click)
 * [Why rage clicks matter:](#why-rage-clicks-matter)
 * [The Anatomy of a rage click](#the-anatomy-of-a-rage-click)
 * [Beyond rage clicks: Other Frustration Signals](#beyond-rage-clicks-other-frustration-signals)
 * [Getting Started with LaunchDarkly session replay](#getting-started-with-launchdarkly-session-replay)
 * [HolisticSelf App](#holisticself-app)
 * [Implementation Architecture](#implementation-architecture)
 * [Configuring Rage Click Detection](#configuring-rage-click-detection)
 * [How it works:](#how-it-works)
 * [Viewing session replay Results](#viewing-session-replay-results)
 * [Advanced Search Queries](#advanced-search-queries)
 * [Troubleshooting](#troubleshooting)
 * [Privacy and Security Considerations](#privacy-and-security-considerations)
 * [Key Takeaways](#key-takeaways)
 * [What’s Next: From Detection to Action](#whats-next-from-detection-to-action)
_Published November 13, 2025_
![portrait of Alexis Roberson.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/ee16585472bee25f23f4782816ccbbd25044b846b5a0b2596cf1bfaac2f47664/assets/images/authors/alexis-roberson.png)
by Alexis Roberson
## Overview
Part 1 of 3: Rage Click Detection with LaunchDarkly
The holidays are around the corner and with it comes the expected uptick in traffic, and as traffic increases the need to preserve user experience becomes that much more imperative. You can ship out a new feature, everything seems to be going as planned, and then all of a sudden you start to see a spike in support tickets. The error logs aren’t helpful or show nothing and the metrics look fine.
So, what happened? Wouldn’t you like to literally put yourself in the user’s shoes by seeing exactly what happened in a user session? Enter session replay and more specifically rage clicks as a barometer for user experience.
In this three-part series, we’ll explore how LaunchDarkly’s session replay and observability features help you detect, diagnose, and fix user experience issues in real-time. Part 1 covers the fundamentals: what rage clicks are, how to detect them, and how to get started with session replay.
## What is a rage click?
A rage click occurs when a user rapidly clicks the same element multiple times in frustration, usually because the element appears clickable but isn’t responding as expected. It’s one of the strongest behavioral signals that something is wrong with your user experience.
### Why rage clicks matter:
 * **Silent failures** : Many bugs don’t throw errors or trigger alerts.
 * **Real user impact** : Unlike synthetic monitoring or load tests, rage clicks show you exactly what real users experienced in production conditions.
 * **Early warning system** : Rage click spikes often appear before users start filing support tickets or abandoning your app entirely.
 * **Actionable insights** : Unlike vague complaints like ‘the site is slow,’ rage clicks point to specific UI elements that need attention.
## The Anatomy of a rage click
Not every series of rapid clicks qualifies as rage clicks. LaunchDarkly uses three criteria to distinguish genuine frustration from normal user behavior:
![Image of The Anatomy of a Rage Click..](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/7ed4b623fb0e6898b3118bff883f5174304de123e04022a64559b8b5d5e28b04/assets/images/tutorials/detecting-user-frustration-session-replay/the_anatomy_of_a_rage_click.png)
The Anatomy of a Rage Click, which includes minimum clicks, click radius, and time window.
These defaults work well for most applications, but LaunchDarkly lets you adjust them based on your specific use case. We’ll cover customization later in this post.
## Beyond rage clicks: Other Frustration Signals
While rage clicks are the most obvious indicator of user frustration, LaunchDarkly’s session replay automatically captures several other behavioral patterns:
![Image of other frustration signals that can be used to measure user experience..](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/50cda04ead420f4fd2c6ed6dbee179a9a2359d4a19bbc14ecf1b0d42892c2ef2/assets/images/tutorials/detecting-user-frustration-session-replay/beyond_rage_clicks.png)
Other frustration signals that can be used to measure user experience.
Together, these signals paint a complete picture of user frustration, which gives you qualitative context that complements your quantitative metrics.
Let’s walk through implementing session replay in a complete application, from installation to viewing your first rage click detection.
## Getting Started with LaunchDarkly session replay
### HolisticSelf App
This health tracking app, written in Javascript, demonstrates LaunchDarkly session replay implementation for detecting user frustration through rage click monitoring.
Find all the code for this demo [here](https://github.com/arober39/HolisticSelfApp), with the LaunchDarkly integration instructions in this [.md file](https://github.com/arober39/HolisticSelfApp/blob/main/LAUNCHDARKLY_SETUP.md).
### Implementation Architecture
**File Structure** :
```
$
| src/
---|--- 
>
| ├── services/
>
| │ └── launchdarkly.js # LaunchDarkly initialization service
>
| ├── main.jsx # App entry point (initializes LaunchDarkly)
>
| └── App.jsx # Main React component
```
**Key Features** :
 * Automatic initialization on app load.
 * Anonymous user tracking (no login required).
 * Strict privacy mode for health data protection.
 * Network recording for API debugging.
 * Zero custom rage click code needed.
**Step 1: Install Dependencies** First, install the required LaunchDarkly packages:
```
$
| npm install launchdarkly-js-client-sdk @launchdarkly/observability @launchdarkly/session-replay
---|--- 
```
< Note: The observability plugin requires JavaScript SDK version 3.7.0 or later. >
**Step 2: Configure Environment Variables**. Create a .env file in your project root. You can get your client-side ID from LaunchDarkly: **Project Settings** > **Environments**.
```
$
| VITE_LAUNCHDARKLY_CLIENT_ID=your-client-side-id-here
---|--- 
```
![Image of Grabbing Client ID from UI.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/92b93a5c02b36e428605416bff7540466194bc4e58a108790c034504a00a7bc2/assets/images/tutorials/detecting-user-frustration-session-replay/grab_client_ID.png)
Grab Client ID from UI.
**Step 3: Initialize LaunchDarkly Client**. Create `src/services/launchdarkly.js`:
```
1
| // LaunchDarkly session replay and Observability Client Initialization
---|--- 
2
| // Based on: https://launchdarkly.com/docs/sdk/observability/javascript
3
| import { initialize } from 'launchdarkly-js-client-sdk';
4
| import Observability from '@launchdarkly/observability';
5
| import SessionReplay, { LDRecord } from '@launchdarkly/session-replay';
6
| 
7
| let ldClient = null;
8
| let isInitialized = false;
9
| 
10
| export async function initializeLaunchDarkly(
11
| clientSideId,
12
| user = null,
13
| options = {}
14
| ) {
15
| if (isInitialized) {
16
| console.warn('LaunchDarkly client already initialized');
17
| return ldClient;
18
| }
19
| 
20
| // Default to anonymous user if none provided
21
| const userContext = user || {
22
| kind: 'user',
23
| key: `anonymous-${Date.now()}`,
24
| anonymous: true,
25
| };
26
| 
27
| const {
28
| manualStart = false,
29
| privacySetting = 'default', // 'none', 'default', or 'strict'
30
| startSessionReplay = true,
31
| } = options;
32
| 
33
| try {
34
| // Initialize LaunchDarkly client with observability and session replay plugins
35
| // Reference: https://launchdarkly.com/docs/sdk/observability/javascript
36
| ldClient = initialize(clientSideId, userContext, {
37
| plugins: [
38
| new Observability({
39
| manualStart: manualStart,
40
| }),
41
| new SessionReplay({
42
| manualStart: manualStart,
43
| privacySetting: privacySetting, // Redacts PII based on setting
44
| }),
45
| ],
46
| });
47
| 
48
| // Wait for client to be ready
49
| await ldClient.waitForInitialization();
50
| 
51
| isInitialized = true;
52
| console.log('LaunchDarkly client initialized with observability and session replay');
53
| 
54
| // Start plugins if not using manual start
55
| if (!manualStart) {
56
| if (startSessionReplay) {
57
| // Start session replay recording
58
| // Note: Rage click detection is automatically handled by LaunchDarkly
59
| // Configure thresholds in Project Settings > Observability > Session settings
60
| // Reference: https://launchdarkly.com/docs/home/observability/settings
61
| LDRecord.start({
62
| forceNew: false, // Continue existing session if available
63
| silent: false, // Show console warnings
64
| });
65
| console.log('Session replay started');
66
| }
67
| }
68
| 
69
| return ldClient;
70
| } catch (error) {
71
| console.error('Failed to initialize LaunchDarkly:', error);
72
| throw error;
73
| }
74
| }
```
**Step 4: Implement the LaunchDarkly Client in Main**. Initialize LaunchDarkly in `src/main.jsx` for:
```
1
| import React from 'react';
---|--- 
2
| import ReactDOM from 'react-dom/client';
3
| import App from './App';
4
| import './styles.css';
5
| import { initializeLaunchDarkly } from './services/launchdarkly';
6
| 
7
| // Get LaunchDarkly client-side ID from environment variable
8
| const LAUNCHDARKLY_CLIENT_ID = import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID || '';
9
| 
10
| // Initialize LaunchDarkly before React renders
11
| // This ensures session replay starts as early as possible
12
| if (LAUNCHDARKLY_CLIENT_ID) {
13
| initializeLaunchDarkly(
14
| LAUNCHDARKLY_CLIENT_ID,
15
| null, // User context (null = anonymous user)
16
| {
17
| serviceName: 'my-health-app',
18
| privacySetting: 'strict', // Recommended for health apps
19
| enableNetworkRecording: true,
20
| }
21
| ).catch((error) => {
22
| console.error('Failed to initialize LaunchDarkly:', error);
23
| });
24
| } else {
25
| console.warn('LaunchDarkly client-side ID not configured. Set VITE_LAUNCHDARKLY_CLIENT_ID environment variable.');
26
| }
27
| 
28
| ReactDOM.createRoot(document.getElementById('root')).render(
29
| <React.StrictMode>
30
| <App />
31
| </React.StrictMode>
32
| );
```
Now that we have initialized our LaunchDarkly client and configured session replay at the start of the app, we can configure rage detection in the LaunchDarkly UI.
### Configuring Rage Click Detection
Rage click detection is configured in the LaunchDarkly UI, not in code. This makes it easy to adjust thresholds without redeploying.
**Access Settings** :
 1. Log in to LaunchDarkly.
 2. Navigate to **Project Settings** > **Observability** > **Session settings**.
 3. Find the **Rage clicks** section.
![Image of Enabling session replay in LaunchDarkly UI.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/e3d82e516f4375b5ad4ada0a9fde2a63e724823eea6b500b56aa2c006410979c/assets/images/tutorials/detecting-user-frustration-session-replay/EnableSessionReplayRageClicks_Screenshot.png)
Enable session replay in LaunchDarkly UI.
Adjust the rage click settings to reflect the user clicking 5+ times within 2 seconds in the same area:
 * Minimum clicks -> Set number of clicks required to trigger to 5 clicks.
 * Click radius -> Set the pixel radius for click proximity to 8 pixels.
 * Elapsed time -> Set the time window for detecting rage clicks to 2 seconds.
These settings apply to all sessions automatically and require no code changes needed.
#### How it works:
Session recording When the session replay plugin is initialized, LaunchDarkly automatically:
 * Records all DOM changes.
 * Captures every click with precise coordinates and timestamps.
 * Tracks scroll events, form inputs, and navigation.
 * Sends data to LaunchDarkly servers in the background.
Automatic detection LaunchDarkly’s backend analyzes recorded sessions:
 * Identifies rapid click patterns.
 * Applies your configured thresholds.
 * Marks sessions with has_rage_clicks=true attribute.
 * Associates rage clicks with specific elements and pages.
#### Viewing session replay Results
In order to test this integration, you can do the following:
 1. Create a test button that intentionally does nothing:
 2. Rapidly click the button 5+ times within 2 seconds in the same spot.
 3. Wait a few minutes for LaunchDarkly to process the session
 4. Check LaunchDarkly dashboard by navigating to **Monitor** > **Sessions** with the option to Filter by has_rage_clicks=true.
To start, your app should look something like this:
HolisticSelfAppDemo.
Preview of HolisticSelf App.
And when you navigate to Launchdarkly UI -> **Sessions** and you should be able to see the complete session replay.
Session replay without rage clicks Enabled.
Session replay of creating a new ailment card in HolisticSelf App.
In order to test the rage clicks integration, we can add a custom button by adding the following code to the `AilmentsListScreen.jsx` file within the header div.
```
1
| <h1>Health Tracker</h1>
---|--- 
2
| {/* Test button for rage click detection - click rapidly 5+ times within 2 seconds */}
3
| <button
4
| style={{
5
| marginTop: '10px',
6
| padding: '8px 16px',
7
| backgroundColor: '#ff4444',
8
| color: 'white',
9
| border: 'none',
10
| borderRadius: '4px',
11
| cursor: 'pointer',
12
| fontSize: '12px',
13
| }}
14
| onClick={(e) => {
15
| // Intentionally does nothing - for testing rage clicks
16
| e.preventDefault();
17
| console.log('Test button clicked (intentionally non-functional for rage click testing)');
18
| }}
19
| title="Test rage click detection: Click rapidly 5+ times within 2 seconds in the same spot"
20
| >
21
| 🧪 Test Rage Click (Click Rapidly)
22
| </button>
```
Now that you have your test button, you can try clicking it 5+ times within 2 seconds in the same spot as shown in the session below.
Newly created rage click button.
Testing the rage click integration in real time using a test button.
Finally, you should see your full session replay under the sessions tab.
Full session replay with appended snippet of TestRageClick button.
Session replay in LaunchDarkly UI showing rage clicks.
It’s important to note that all sessions for a specific app are appended in the session replay tab. So if a user is inactive and comes back to the same tab, the video will be longer. However, if the user starts a new tab or its been more than 4 hours a new video will be created for that session.
After enabling rage click, you can now:
 * Filter sessions by has_rage_clicks=true to find frustrated users.
 * Replay sessions to see exactly what caused frustration.
 * Identify specific UI elements that trigger rage clicks.
 * View correlated errors and network requests in the timeline.
 * Prioritize fixes based on real user frustration data.
### Advanced Search Queries
```
$
| # Basic: All sessions with rage clicks
---|--- 
>
| has_rage_clicks=true
>
| 
>
| # Filter by page URL
>
| has_rage_clicks=true AND visited-url contains "/checkout"
>
| 
>
| # Filter by specific HTML element clicked
>
| clickSelector="button.submit-order"
>
| 
>
| # Filter by button text
>
| clickTextContent contains "Place Order"
>
| 
>
| # Rage clicks with long session duration
>
| has_rage_clicks=true AND active_length > 120s
>
| 
>
| # Combine multiple conditions
>
| has_rage_clicks=true AND browser="Chrome" AND device_type="Desktop"
```
### Troubleshooting
Rage clicks Not detected
 * Verify rage click detection is enabled in **Project Settings** > **Observability** > **Session settings**.
 * Check that your click pattern meets the configured thresholds (default: 5 clicks within 8 pixels in 2 seconds).
 * Ensure the LaunchDarkly client initialized successfully (check browser console).
 * Wait a few minutes for LaunchDarkly to process sessions.
Session replay Not Working
 * Verify LaunchDarkly account has observability features enabled.
 * Check that both plugins are properly initialized.
 * Ensure Content Security Policy allows connections to LaunchDarkly.
 * Check browser console for initialization errors.
 * Verify the client-side ID is correct.
### Privacy and Security Considerations
Session replay is powerful, but it comes with important privacy responsibilities. LaunchDarkly provides several layers of protection to ensure you’re capturing useful debugging data without exposing sensitive user information.
Default Privacy Mode: Strict Protection By default, LaunchDarkly operates in strict privacy mode, which provides the safest option:
 * **All text inputs are obfuscated** : Form fields, text areas, and input boxes show as masked characters.
 * **PII regex matching** : Text matching patterns for emails, phone numbers, social security numbers, addresses, and credit cards are automatically masked.
 * **Images and media preserved** : Visual elements remain visible for UX debugging.
This means you can safely record sessions without worrying about capturing passwords, credit card numbers, or other sensitive data.
## Key Takeaways
Implementing rage click detection with LaunchDarkly session replay is a pretty straightforward process and involves installing the observability sdk with specific plugins. The real power comes from LaunchDarkly’s automatic detection and the ability to replay sessions with full context (errors, logs, network requests) to understand exactly what frustrated users.
By detecting rage clicks, we can:
 * Identify broken or confusing UI elements.
 * Understand user frustration patterns.
 * Prioritize fixes based on real user data.
 * Improve user experience proactively.
This was accomplished without any additional code changes. LaunchDarkly handled everything automatically, and you were able to adjust sensitivity through the dashboard.
### What’s Next: From Detection to Action
You now have the foundation for detecting user frustration with LaunchDarkly’s session replay. You can:
 * Automatically capture rage clicks, rage scrolls, and form abandons.
 * Search for sessions with specific frustration patterns.
 * Watch full session replays with correlated errors and logs.
But detection alone isn’t enough. The real magic comes from connecting these frustration signals directly to your feature releases, so you can catch issues during progressive rollouts and roll back instantly if something breaks.
In **Part 2, we’ll explore Guarded Releases** : how to automatically monitor rage clicks during feature rollouts, set up alerts for frustration spikes, and enable automated rollback when metrics exceed thresholds.
You’ll learn how to create a closed-loop system where user frustration signals trigger immediate action, which prevents small issues from becoming widespread problems.
Additional Resources:
 * [LaunchDarkly session replay Documentation](https://launchdarkly.com/docs/home/observability/session-replay)
 * [Observability SDK Reference](https://launchdarkly.com/docs/sdk/observability)
 * [Observability Settings](https://launchdarkly.com/docs/home/observability/settings)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs