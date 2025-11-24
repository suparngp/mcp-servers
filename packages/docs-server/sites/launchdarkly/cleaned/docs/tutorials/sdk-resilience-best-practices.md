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
 * [Core goals](#core-goals)
 * [Questions to consider](#questions-to-consider)
 * [Don’t block your application while waiting for your SDK to initialize](#dont-block-your-application-while-waiting-for-your-sdk-to-initialize)
 * [Implement and regularly review working defaults in code](#implement-and-regularly-review-working-defaults-in-code)
 * [Bootstrap last-known values to client-side SDKs](#bootstrap-last-known-values-to-client-side-sdks)
 * [Use no-deploy methods to change configuration](#use-no-deploy-methods-to-change-configuration)
 * [Use Relay Proxy and persistent data stores for server-side SDKs](#use-relay-proxy-and-persistent-data-stores-for-server-side-sdks)
 * [Load balance SDK connections between LaunchDarkly and your Relay Proxies](#load-balance-sdk-connections-between-launchdarkly-and-your-relay-proxies)
 * [Stand up a dedicated event pipeline to prevent event loss](#stand-up-a-dedicated-event-pipeline-to-prevent-event-loss)
 * [Conclusion](#conclusion)
 * [Footnotes](#footnotes)
_Published Oct 27th, 2025_
![Portrait of Dan Berkowitz.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/662e4d0915869382eef4cbbae3fa8136a348043e33630316d04a4fa79c1897b2/assets/images/authors/dan-berkowitz.jpeg)
by Dan Berkowitz
The internet is a massive distributed system that is only growing in complexity. Software engineers are under more pressure than ever to ship new features quickly. Speed is important, but so is reliability. Even well-architected systems can rely on external dependencies, and those dependencies can sometimes be unpredictable. Using a few deliberate patterns, you can build applications that stay resilient and responsive when parts of your system experience issues. Let’s talk about how.
In this tutorial, we’ll walk through best practices for building resilient applications with LaunchDarkly’s SDKs. We’ll primarily be using examples from the [React SDK](/docs/sdk/client-side/react/react-web), but the patterns are broadly applicable to other SDKs as well.
## Core goals
When it comes to building applications that are always available in any situation, there are four guiding principles to consider:
 1. Never block on initialization
 2. Be tolerant of stale or default values
 3. Fall back gracefully
 4. Don’t go off the beaten path
`variation()` or `allFlags()` are used, substitute in the matching method for your specific SDK.
## Questions to consider
Your answers to the following questions can help clarify whether to implement the below recommendations:
 * Is this currently implemented?
 * Would this have helped your application(s) during a recent downtime?
 * What will it take to implement this in your application(s)?
 * What obstacles exist to implementing this?
## Don’t block your application while waiting for your SDK to initialize
There are legitimate reasons to temporarily block initialization[1](/docs/tutorials/sdk-resilience-best-practices#footnote1 "Initialization means that the SDK has connected to the service and is ready to evaluate flags.") for specific use cases, for instance when preventing/reducing flicker while running experiments. This ensures that users are not exposed to multiple test variants while loading your application. As a rule, LaunchDarkly recommends that your application should never be blocked or killed if initialization is unsuccessful.
If a flag evaluation method (e.g. `variation()`) is called before initialization completes or initialization fails, LaunchDarkly will use the default flag values that you have supplied.
**Considerations**
 * For the React Web SDK, consider the tradeoffs of using `withLDProvider` versus `asyncWithLDProvider` to initialize your client[2](/docs/tutorials/sdk-resilience-best-practices#footnote2 "asyncWithLDProvider will block rendering your application until after initialization is complete, while withLDProvider will render the application prior to initializing. More detailed information available here in the React Web SDK documentation.")
 * Set initialization timeouts, after which your application should proceed regardless of success. Recommended values are 100–500ms for client-side SDKs and 1–5s for server-side SDKs.
 * For the React Web SDK, [set your initialization timeout in your ProviderConfig](https://launchdarkly.github.io/react-client-sdk/interfaces/ProviderConfig.html#timeout) (which will pass the value to the Javascript SDK’s waitForInitialization method under the hood). For other Javascript-based SDKs, use [the built-in waitForInitialization method](https://launchdarkly.github.io/js-client-sdk/interfaces/LDClient.html#waitForInitialization) with a timeout provided. Here is an example code snippet for the React Web SDK:
React SDK initialization with timeout
```
1
| import { createRoot } from 'react-dom/client';
---|--- 
2
| import { withLDProvider } from 'launchdarkly-react-client-sdk';
3
| import App from './App';
4
| const LDApp = withLDProvider({
5
| clientSideID: 'client-side-id-123abc',
6
| context: { kind: 'user', key: 'user-key-123abc' },
7
| timeout: 3,
8
| })(App);
9
| createRoot(document.getElementById('root')!).render(<LDApp />);
```
 * For a server-side SDK example, here is how to set a timeout using the Node SDK’s `waitForInitialization` method:
Node.js SDK initialization with timeout
```
1
| import { init } from '@launchdarkly/node-server-sdk';
---|--- 
2
| const client = init('sdk-key-123abc');
3
| async function start() {
4
| try {
5
| await client.waitForInitialization({ timeoutSeconds: 3 });
6
| } catch (err) {
7
| // SDK will continue retrying to initialize in the background on timeout
8
| console.error('LaunchDarkly initialization failed or timed out:', err);
9
| }
10
| }
11
| await start();
12
| 
13
| // evaluation stuff here
```
## Implement and regularly review working defaults in code
Teams are often concerned that letting users access their application with default flag values[3](/docs/tutorials/sdk-resilience-best-practices#footnote3 "This suggestion specifically applies to default values defined in your code that are served whenever the SDK cannot return a valid evaluated variant. Default values can also refer to default values defined in the LaunchDarkly UI that are served when a flag is either `On` or `Off`, which is not covered by this suggestion.") will create issues. LaunchDarkly recommends intentionally setting default flag values that won’t create issues, regularly reviewing your coded default values to keep them current with your rollouts, and regularly cleaning up flags to remove outdated flags with outdated defaults.
As a rule of thumb, consider setting your default values to stable behavior matching your application’s current working state. Essentially, values that keep things running. For high-security or compliance-related areas, defaulting instead to more restrictive behavior is a good practice.
**Considerations**
 * When using our `variation()` methods, always pass a default (e.g. `variation(flagKey, defaultValue)`) and treat this as authoritative when the SDK isn’t ready.
 * When using `allFlags()` or `useFlags()` and no bootstrapping is available, use a canonical defaults map that can be overwritten by returned values.
 * Whenever you make a change to a flag’s rollout, review its default value and consider whether it should be updated.
 * Periodically test the default values for permanent flags to ensure that they still deliver working experiences.
 * Run [regular Flag Cleanup Days](/docs/guides/flags/technical-debt#schedule-regular-flag-reviews) or otherwise allocate some portion of time for team members to review and remove old flags.
 * [Reducing overall flag debt](/docs/guides/flags/technical-debt#methods-for-reducing-flag-debt-in-launchdarkly) can reduce the risk presented by any outdated default values.
## Bootstrap last-known values to client-side SDKs
LaunchDarkly’s client-side SDKs are able to initialize using flag values that have been provided externally. The source of these values is controlled by the [bootstrap](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html#bootstrap) configuration option. There are two built-in sources that can be used to bootstrap these last-known values:
 1. A [JSON object](/docs/sdk/features/bootstrapping#javascript) provided by a server-side SDK
 2. The browser client’s `localStorage` object
Once the client-side SDK has been bootstrapped with these initial values, it will attempt to connect to LaunchDarkly to pull updated values. If it is unable to connect, it will continue to use these bootstrapped values until it connects successfully.
**Considerations**
 * Decide whether to bootstrap your client-side SDKs from localStorage or from last-known values provided by the server-side SDKs.
 * [If bootstrapping from server-side SDKs](/docs/sdk/features/bootstrapping#bootstrapping-using-server-rendered-content), you can share the JSON object with the client-side SDKs either via JSON embedded in your HTML (e.g. `window.__LD_FLAGS__ = { ... }`) or via an endpoint that returns the JSON.
 * Ensure that your server-side SDK is configured with `clientSideOnly` = `true`, which ensures that only your client-side-available flags are returned (preventing potentially sensitive server-side flags from being exposed).
 * Bootstrapping from the server requires that the server-side SDKs and client-side SDKs both have the same context values available to them.
 * For further exploration, [hello-bootstrap](https://github.com/launchdarkly/hello-bootstrap) is an example application we provide that uses our Node server-side SDK to bootstrap.
 * [If bootstrapping from localStorage](/docs/sdk/features/bootstrapping#bootstrapping-using-local-storage), configure the bootstrap option to `localStorage` and let the SDK handle everything for you. In client-side Javascript-based SDK releases that are version 4.x.x or greater, this will be the default behavior.
## Use no-deploy methods to change configuration
In cases where some part of the LaunchDarkly network is unreachable, but other parts are still reachable (e.g. the streaming endpoints are down, while the polling endpoints are up), we recommend having a quick, low-overhead method in place to control your SDK’s configuration without needing to do a full deploy that runs through your full CI/CD pipeline.
The default behavior requires you to edit the configuration in your code, re-deploy that code, and restart your SDK to make the change effective. But, it’s not always feasible to make a deploy. Instead, we recommend mapping environment variables to SDK options and then using those environment variables as authoritative values to populate your SDK’s configuration. This way you can easily re-configure your SDK to in the face of external circumstances without needing to do a full deploy.
**Considerations**
 * Use environment variables that are mapped to key SDK configuration options. For example, make a variable called `LD_MODE` with values `streaming`, `polling`, and `offline`. Map this to the configuration options in your SDK. You could also map other options, like polling interval, events send status, Relay Proxy URL, etc.
 * The LaunchDarkly SDKs only apply their configuration at initialization, so any changes will still require a restart of the SDK instance. When restarting, you will lose last-known values that the SDK has cached in memory. We recommend pairing this method with Relay Proxy, persistent data store, an infinite cache TTL, and a dual-instance pattern (see below). Then, hot-swap from the SDK instance with the old config to the SDK instance with the new config.
 * This method does not solve for LaunchDarkly being fully unreachable. It only solves for cases where switching your SDK configuration options will prevent you from going down or serving stale values.
## Use Relay Proxy and persistent data stores for server-side SDKs
__**only**__ be used in conjunction with Relay Proxy and an infinite cache TTL. If persistent data stores are used standalone, this can actually decrease resiliency.
The [Relay Proxy](/docs/sdk/relay-proxy) is a lightweight service that can proxy all of your server-side SDK connections into a single long-lived connection to LaunchDarkly. Additionally, it can serve last-known flag values to the server-side SDKs without needing to connect to LaunchDarkly. Just point your server-side SDKs at your Relay Proxy. When paired with [a persistent data store](/docs/sdk/concepts/data-stores) (a durable database storing last-known flag values outside of cache), this combination creates cold-start resilience when cached values are lost, even if LaunchDarkly is temporarily unreachable.
**Considerations**
 * The Relay Proxy will become a **critical node** in your infrastructure. Run multiple Relay Proxies behind a load balancer for best availability. LaunchDarkly recommends a **minimum** of 3 Relay Proxy instances across 2 Availability Zones.
 * Configure a database to keep your last-known flag values written to disk. Most of the server-side SDKs support using Redis, DynamoDB, and Consul.
 * Regularly snapshot your persistent data store to ensure that you have the ability to spin up new instances in new zones if your instance is unreachable or becomes corrupt.
 * Configure your Relay Proxy’s cache TTL to be infinite (which can be done by setting it to a negative integer). This is especially useful in cases where your persistent data store becomes temporarily unavailable. An infinite TTL will allow the Relay to continue serving flags to SDK clients, while updating the cache if it receives any flag updates from LaunchDarkly. When the persistent data store becomes available again, the Relay Proxy will write the cache contents back to the database. Avoid restarting the Relay Proxy while your data store is unavailable, as the Relay Proxy will only read from the database upon service startup.
 * Specifically, for Redis, DynamoDB, or Consul, you can set the cache TTL to infinite using either the `localTtl` key in your `ld-relay.conf` or by passing in the `CACHE_TTL` environment variable when starting the Relay Proxy with `--from-env`. More information is available within [ld-relay/docs/persistent-storage.md](https://github.com/launchdarkly/ld-relay/blob/1f37eac501b1ca9994b3ca26a6128b70365035de/docs/persistent-storage.md).
 * Ensure that the Relay Proxy’s initialization timeout is configured appropriately. The default is 10 seconds, and in most cases, usually does not need to be changed. The Relay Proxy will refuse incoming connections from SDKs until the Relay has either successfully initialized, or in the case of an outage, the `initTimeout` duration has passed. For more information, read [initTimeout in ld-relay/docs/configuration.md](https://github.com/launchdarkly/ld-relay/blob/1f37eac501b1ca9994b3ca26a6128b70365035de/docs/configuration.md#file-section-redis).
 * Ensure that `ignoreConnectionErrors` is set to `true`. If it is set to `false`, the Relay Proxy will not start once the timeout passes if LaunchDarkly is unreachable.
 * Configure the Relay Proxy to run in _Proxy Mode_ , which ensures that only the Relay Proxy can read and write from your persistent data store. (In _Daemon Mode_ , which is not recommend for this guide, the server-side SDKs can read directly from the data store, which can create issues).
![Two diagrams. Proxy mode has the Relay Proxy sitting between client or server SDKs and the Flag Delivery Network, and the Relay Proxy also points to a persistent data store. In Dameon Mode, the setup is the same except the Data Store sits between the Relay Proxy and server SDKs.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/6e1b2f06d5bc99f4a89f16c33d3374c5b747ec5c3a6d8c018df748c908a2dc56/assets/images/tutorials/sdk-resilience-best-practices/relay-proxy-setup.png)
Relay Proxy setup: visualizing Proxy Mode and Daemon Mode.
 * In our suggested topology, the Relay Proxy would connect to LaunchDarkly, retrieve values, and write them to the persistent data store. Then, the server-side SDKs would point at the Relay Proxy to get the rules and run evaluations. Your client-side SDKs would then be able to get bootstrapped from the server-side SDKs.
 * We recommend _against_ configuring your client-side SDKs to connect directly to the Relay Proxy. Instead, prefer bootstrapping them from server-side SDKs.
 * More information on the Relay proxy and persistent data stores can be found in our docs:
 * [Implementing the Relay Proxy](/docs/sdk/relay-proxy/implementing)
 * [Configuring SDKs for the Relay Proxy](/docs/sdk/relay-proxy/sdk-config#using-a-persistent-store)
 * [Persistent data stores](/docs/sdk/concepts/data-stores)
## Load balance SDK connections between LaunchDarkly and your Relay Proxies
In the event that LaunchDarkly becomes unreachable, you don’t want to scramble to make untested configuration changes and deploys that may not solve your problems. LaunchDarkly recommends that you keep your Relay Proxies hot and actively receiving some small proportion of your server-side SDK traffic at all times, so that you can be ready to scale up for burst traffic at any time.
**Considerations**
 * Use an owned hostname as the endpoint for your server-side SDKs. Run an L7 load balancer behind this hostname to allow you to dynamically allocate traffic between LaunchDarkly’s Flag Delivery Network and your Relay Proxy instances.
 * Balance the majority of your connections to LaunchDarkly at high priority, while maintaining some active connections to your Relay Proxy instances at low priority to keep them hot and ensure they are working.
 * Configure regular health checks and circuit breakers to automatically re-allocate traffic as needed between the two.
 * Ensure your Relay Proxy instances are autosized to be able to handle large increases in traffic if LaunchDarkly ever becomes unreachable. At a minimum, expect:
 * **Outgoing connections to LaunchDarkly**
 * 1 long-lived HTTPS SSE connection to LaunchDarkly’s streaming endpoint per configured environment
 * _(if automatic configuration is enabled)_ 1 long-lived HTTPS SSE connection to the AutoConfiguration endpoint
 * **Incoming connections**
 * 1 incoming long-lived HTTPS SSE connection per connected server-side SDK instance 
 * _(if forwarding events)_ Approximately 1 incoming HTTPS request every 2 seconds per connected SDK (may vary based on the Relay Proxy’s configured flush interval and event capacity settings in the SDK) 
 * _(if forwarding events)_ Approximately 1 outgoing HTTPS request every 2 seconds per configured environment (may vary based on the Relay Proxy’s configured flush interval and event capacity) 
 * Avoid caching flags in the load balancer as values are usually context-specific.
## Stand up a dedicated event pipeline to prevent event loss
In many cases, analytics event loss is not critical as long as flags are delivering the correct values. However, when moving beyond general flag evaluation into more data-driven use cases, like experimentation or guarded releases, dropped events can be big headaches that can cause untrustworthy results and lead to restarted experiments. While the Relay Proxy can queue incoming events from the SDKs and batch send them to LaunchDarkly, this capability is not designed for extended network interruptions. It is meant to pool events from many connections and send them to LaunchDarkly over a single connection.
Instead, LaunchDarkly recommends standing up a dedicated events pipeline to handle ingestion, storing, and replaying of events. This would become the events endpoint for your SDKs and live between them and LaunchDarkly.
**Considerations**
 * We do not have detailed recommendations in this area at the moment.
 * Some options are [Vector](https://github.com/vectordotdev/vector), [Fluentbit](https://github.com/fluent/fluent-bit), or [Kafka](https://kafka.apache.org/) (in order from lightest to heaviest).
## Conclusion
Thanks for following along on this journey toward building resilient applications with LaunchDarkly’s SDKs. If you have any questions, join our [Discord](https://discord.com/invite/launchdarklycommunity).
These practices help ensure consistent flag delivery and reliable behavior, even when parts of your system experience issues.
* * *
## Footnotes
 1. Initialization means that the SDK has connected to the service and is ready to evaluate flags. [↩︎](/docs/tutorials/sdk-resilience-best-practices#footnote1-back)
 2. `asyncWithLDProvider` will block rendering your application until after initialization is complete, while `withLDProvider` will render the application prior to initializing. [↩︎](/docs/tutorials/sdk-resilience-best-practices#footnote2-back)
 3. This suggestion specifically applies to default values defined in your code that are served whenever the SDK cannot return a valid evaluated variant. Default values can also refer to default values defined in the LaunchDarkly UI that are served when a flag is either `On` or `Off`, which is not covered by this suggestion. [↩︎](/docs/tutorials/sdk-resilience-best-practices#footnote3-back)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs