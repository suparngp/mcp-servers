`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [SDKs](/docs/sdk)
 * [SDK concepts](/docs/sdk/concepts)
 * [SDK features](/docs/sdk/features)
 * [Client-side SDKs](/docs/sdk/client-side)
 * [Server-side SDKs](/docs/sdk/server-side)
 * [AI SDKs](/docs/sdk/ai)
 * [Edge SDKs](/docs/sdk/edge)
 * [OpenFeature providers](/docs/sdk/openfeature)
 * [Observability SDKs](/docs/sdk/observability)
 * [Relay Proxy](/docs/sdk/relay-proxy)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [About the different types of SDKs](#about-the-different-types-of-sdks)
 * [About mobile SDKs](#about-mobile-sdks)
 * [Functional differences between SDKs](#functional-differences-between-sdks)
 * [Persistent feature store integrations](#persistent-feature-store-integrations)
 * [Multi-environment support](#multi-environment-support)
 * [Receiving updates from LaunchDarkly](#receiving-updates-from-launchdarkly)
 * [Security and privacy](#security-and-privacy)
 * [Client-side SDKs](#client-side-sdks)
 * [Server-side SDKs](#server-side-sdks)
 * [Edge SDKs](#edge-sdks)
 * [Privacy considerations](#privacy-considerations)
 * [Flag evaluations](#flag-evaluations)
 * [Client-side SDKs](#client-side-sdks-1)
 * [Server-side SDKs](#server-side-sdks-1)
 * [Edge SDKs](#edge-sdks-1)
 * [AI SDKs](#ai-sdks)
 * [Flag evaluation comparison](#flag-evaluation-comparison)
 * [Anonymous contexts](#anonymous-contexts)
 * [Private attributes](#private-attributes)
 * [Keys](#keys)
 * [SDK key](#sdk-key)
 * [Mobile key](#mobile-key)
 * [Client-side ID](#client-side-id)
 * [Language support](#language-support)
## Overview
This topic explains the differences between LaunchDarkly’s client-side, server-side, edge, AI, and observability SDKs, as well as its OpenFeature providers. It helps you determine which type of SDK to use.
The SDK types have different security considerations as well as some behavioral and architectural differences. They handle evaluations differently, use different kinds of SDK keys, and support different languages.
## About the different types of SDKs
It is important to understand the types of SDKs we support. The different types of SDKs impact critical implementation details and use cases.
The table below summarizes the differences between these categories:
SDK Type | These SDKs: | To use these SDKs: 
---|---|--- 
[Client-side](/docs/sdk/client-side) | 
 * are designed for single-user desktop, mobile, and embedded applications.
 * are intended to be used in a potentially less secure environment, such as a personal computer or mobile device.
 * include mobile SDKs.
 * use client-side ID or mobile keys for authorization.
| Install the SDK and initialize the client. 
[Server-side](/docs/sdk/server-side) | 
 * are designed for multi-user systems.
 * are intended to be used in a trusted environment, such as inside a corporate network or on a web server.
 * use SDK keys for authorization.
| Install the SDK and initialize the client. 
[Edge](/docs/sdk/edge) | 
 * are designed for edge layers in content delivery networks (CDNs). LaunchDarkly supports [Akamai](/docs/sdk/edge/akamai), [Cloudflare](/docs/sdk/edge/cloudflare), [Fastly](/docs/sdk/edge/fastly), and [Vercel](/docs/sdk/edge/vercel).
 * are intended to be used together with a matching [CDN integration](/docs/integrations). The CDN integration allows LaunchDarkly to write to your edge database. Then, you can use the edge SDK to read from that database to provide flag evaluations. This eliminates the need to make a remote call to LaunchDarkly.
 * use client-side IDs to associate LaunchDarkly environments with CDN integrations.
| In the LaunchDarkly UI, configure an [integration](/docs/integrations/edge) to enable flag evaluation within your edge provider’s store. In your application, install the SDK and initialize the client. 
The [Akamai SDK](/docs/sdk/edge/akamai) is designed to be used in conjunction with one of the client-side SDKs. The other edge SDKs do not require this. 
[AI](/docs/sdk/ai) | 
 * are designed for multi-user systems.
 * are intended to be used in a trusted environment, such as inside a corporate network or on a web server.
 * use SDK keys for authorization.
| Install the underlying server-side SDK and initialize the base client. Then install the AI SDK and initialize the AI client. 
For example, if you’re using the [.NET AI SDK](/docs/sdk/ai/dotnet), first install the [.NET (server-side) SDK](/docs/sdk/server-side/dotnet). 
[OpenFeature providers](/docs/sdk/openfeature) | 
 * are designed for multi-user systems.
 * are intended to be used in a trusted environment, such as inside a corporate network or on a web server.
 * use SDK keys for authorization.
| Install LaunchDarkly’s OpenFeature provider for your language and initialize the provider. The provider follows the OpenFeature specification for performing flag evaluations. 
The provider also allows access to the LaunchDarkly client in the underlying SDK. For example, if you use the [OpenFeature provider for Java](/docs/sdk/openfeature/java), you can also access the `LDClient` from within the [LaunchDarkly Java SDK](/docs/sdk/server-side/java). 
[Observability SDKs](/docs/sdk/observability) | 
 * are implemented as plugins for LaunchDarkly server-side and client-side SDKs.
 * are designed for use in conjunction with the JavaScript client-side SDK.
 * collect and send observability data to LaunchDarkly, so you can review error monitoring, session replay, and more from within the LaunchDarkly UI.
| Install a client-side or server-side SDK that [supports observability SDKs](/docs/sdk/observability#observability-sdks). These are implemented as plugins. 
Separately, install one or more of the observability plugins. 
Initialize the SDK client, and initialize the observability plugins as part of the `plugins` array in the SDK client options. 
### About mobile SDKs
We categorize SDKs designed for mobile devices as client-side SDKs because, like our client-side SDKs, most mobile applications have a single-user context. This includes our client-side .NET, Android, client-side C++, iOS, Flutter, React Native, and Roku SDKs. Each of these SDKs also has some mobile-specific functionality.
Here are some of the ways that mobile SDKs are different than other client-side SDKs:
 * Mobile SDKs support [multiple environments](/docs/sdk/concepts/client-side-server-side#multi-environment-support).
 * Mobile SDKs [receive updates from LaunchDarkly](/docs/sdk/concepts/client-side-server-side#receiving-updates-from-launchdarkly) differently.
## Functional differences between SDKs
LaunchDarkly attempts to keep all SDKs at feature parity with each other. Even so, slight feature differences exist between server-side, client-side, mobile, and edge SDKs.
AI SDKs provide functionality to [customize an AI Config](/docs/sdk/features/ai-config), but do not evaluate feature flags directly. Using an AI SDK requires initializing the associated server-side SDK.
### Persistent feature store integrations
By default, our SDKs store transmitted data in in-memory caches, and cached values have no expiration or time-to-live (TTL) value. If you don’t want to use an in-memory cache, we provide integrations for server-side SDKs to store data in persistent data stores like Redis or DynamoDB instead.
Client-side and mobile SDKs may have platform-specific storage mechanisms and can alternatively use our Relay Proxy.
To learn more, read [Persistent data stores](/docs/sdk/concepts/data-stores).
### Multi-environment support
We designed our SDKs to work with one LaunchDarkly environment at a time. However, mobile application developers might want their applications to be able to access flags on multiple LaunchDarkly environments. We designed the mobile SDKs to support behavior across multiple environments.
For example, if your LaunchDarkly account is set up to have different “Android,” “iOS,” and “Core” environments or projects, you can use the multi-environment SDK feature to access flags in multiple places.
### Receiving updates from LaunchDarkly
**Server-side SDKs** open a streaming connection to LaunchDarkly. The initial payload from the streaming connection contains the variations a context instance receives. Subsequently, server-side SDKs receive flag configuration changes over the stream. By default, server-side SDKs maintain this streaming connection and receive updated flag values when you change a flag. To increase connection resiliency for server-side SDKs, multiple options are available. They are:
 * use a [persistent feature store](/docs/sdk/concepts/data-stores),
 * use the [Relay Proxy](/docs/sdk/relay-proxy), or
 * use [daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode).
Server-side SDKs in [data saving mode](/docs/sdk/features/data-saving-mode) initially open a polling connection to LaunchDarkly, which is used only for the initial payload. Subsequently, server-side SDKs in data saving mode open a streaming connection and receive realtime flag configuration changes over the stream. These configuration changes include only the difference between the server-side SDK’s stored configuration and the latest configuration in LaunchDarkly. This can significantly improve performance.
**JavaScript-based client-side SDKs** open an initial connection to LaunchDarkly using LaunchDarkly’s polling endpoint. Then, these SDKs may open a streaming connection. Client-side SDKs receive flag value changes for a specific context.
Some of the JavaScript-based client-side SDKs, such as the React Web SDK, open a streaming connection by default. Others, such as the JavaScript SDK, do not explicitly set a default behavior. Instead, the JavaScript SDK opens a streaming connection when you register a change listener, and closes that streaming connection when you unregister the change listener. You can also explicitly configure the JavaScript SDK to maintain a streaming connection. Because opening and closing streaming connections can be expensive, you should explicitly enable streaming if your application frequently starts and stops listening to changes.
SDKs may periodically drop streaming connections. When the SDK loses connectivity to LaunchDarkly, it continues to try to reestablish a streaming connection until it succeeds. If you anticipate a poor connection, you can evaluate flags server-side and bootstrap your JavaScript-based SDKs with those values. This ensures end users receive the flag variations you intend even if there is no connection to LaunchDarkly. To learn more, read [Bootstrapping](/docs/sdk/features/bootstrapping).
**Mobile SDKs** monitor the connection state to LaunchDarkly and use different connection types depending on whether the mobile app is in the foreground or in the background. This design better accommodates mobile applications, which are more likely than web or desktop software to lose their network connection.
###### Expand details on how mobile connections work
Here’s how mobile connections work:
 * When the app is foregrounded, the SDK opens a streaming connection to LaunchDarkly.
 * The initial payload from the streaming connection contains the variations a context instance receives.
 * The streaming connection stays open as long as your app is in the foreground and is connected to the internet.
 * The streaming connection idles unless there are updates. This requires minimal data and battery power to maintain.
 * The SDK actively monitors network availability. They avoid requests when the network is unavailable, and reconnect when the network becomes available again.
 * When the app is backgrounded, the stream connection terminates and the SDK uses polling instead.
 * The SDK polls for flag updates every hour to stay in sync. This strategy has higher latency, but optimizes battery and data usage.
 * The SDK checks for network connectivity at the current polling interval, only making the request if the check succeeds. When it reconnects, it automatically syncs its local cache with LaunchDarkly.
##### The iOS SDK does not support background fetch
Unlike other mobile SDKs, the iOS SDK does not fetch flag values from the background. To learn more, read [Background fetch](/docs/sdk/client-side/ios#background-fetch).
 * When the app is foregrounded again, the SDK reconnects to the stream which sends the latest flag values.
 * If the app closes and reopens without a connection to LaunchDarkly, the flag values cached in local storage are still available.
Whether streaming or polling, the SDK monitors the device’s network connectivity state and does not send network requests when the device is offline.
This configuration means that you get near real-time updates for your feature flag values when the app is in the foreground, and maximum device and SDK efficiency when backgrounded. You can configure these settings if needed.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Configure your SDK: [Configuration](/docs/sdk/features/config)
##### Streaming mode is not available on watchOS
WatchOS always operates in polling mode, as streaming mode is not available.
## Security and privacy
The client-side, server-side, and edge SDKs have different security considerations.
### Client-side SDKs
Client-side SDKs typically run on customers’ own devices. They can be compromised by end users who unpack a mobile app to examine the SDK bytecode or use their browser’s developer tools to inspect internal site data. As a result, you should never use a server-side SDK key in a client-side or mobile application.
Flag rules may include context identifiers or other personally identifiable information (PII) that you might not want to transmit to client-side applications. Consequently, client-side SDKs depend on LaunchDarkly’s servers to safely store flag rules. To learn more, read [Evaluation reasons](/docs/sdk/concepts/evaluation-reasons).
### Server-side SDKs
Server-side SDKs operate within server-architected applications running on your own infrastructure or trusted cloud-based infrastructure. Neither of these locations is directly accessible by end users. Because of the limited access to server-based applications, server-side SDKs can safely receive flag data and rulesets without needing to obscure or filter out sensitive data.
OpenFeature providers and AI SDKs similarly operate within server-architected applications running on your own infrastructure or trusted cloud-based infrastructure.
### Edge SDKs
Edge SDKs typically run in the edge layer of your CDN. This location is not directly accessible by end users. Because of the limited access to CDNs, edge SDKs can safely receive flag data and rulesets without needing to obscure or filter out sensitive data. They receive this data through an [integration](/docs/integrations/edge).
### Privacy considerations
Server-side SDKs store information on flag rules and segments. Client-side SDKs store the flag evaluation results.
LaunchDarkly SDKs do not store cookies.
When you construct a [context](/docs/home/getting-started/vocabulary#context) in your application, you could choose to add personally identifiable information (PII) or cookie data as a custom attribute in the context. This data would then be sent to LaunchDarkly as part of a [flag evaluation](/docs/sdk/features/evaluating). To avoid sending this data, you can mark the relevant attributes as [private](/docs/sdk/concepts/client-side-server-side#private-attributes). To learn more, read [Minimizing LaunchDarkly’s access to end user data](/docs/guides/account/user-data).
For additional information on privacy as it relates to session replay, read [Privacy](/docs/sdk/features/session-replay-config#privacy) in the [session replay configuration topic](/docs/sdk/features/session-replay-config).
## Flag evaluations
The different types of SDKs evaluate feature flags differently. The different evaluation behavior supports data security and efficient data utilization.
### Client-side SDKs
Client-side SDKs are configured to operate for a single end user at a time, although the end user may be represented by one or more contexts. For example, your application may be using both attributes pertaining to the user, such as name and email, and attributes pertaining to their environment, such as device model and operating system.
When a flag evaluation is requested, client-side SDKs delegate the flag evaluation to LaunchDarkly on behalf of a specific evaluation context, which comprises one or more contexts. LaunchDarkly’s services are responsible for evaluating flag rules for the evaluation context, including evaluating any prerequisite flags. LaunchDarkly notifies the SDK of the evaluation results, through either the SDK’s streaming or polling connections. Then the SDK stores these results for quick lookup.
For security reasons, client-side SDKs cannot download and store an entire ruleset. Client-side SDKs typically run on customers’ own devices, so they are vulnerable to having end users investigate SDK content by unpacking the SDK on a mobile device or inspecting its behavior in a browser. Instead of storing potentially sensitive data, the client-side SDKs confirm and update flag rules by communicating with LaunchDarkly servers through streaming connections or with REST API requests.
This approach is also beneficial from a data management perspective. Client-side SDKs’ bandwidth requirements are lower than server-side SDKs’ requirements because LaunchDarkly sends client-side SDKs less data.
### Server-side SDKs
Server-side SDKs receive the complete ruleset associated with an SDK key when they initialize a connection to LaunchDarkly’s servers. LaunchDarkly continuously updates the SDK’s cached flag ruleset whenever flag rules change on LaunchDarkly, using this persistent connection.
When your application requests flag evaluation, server-side SDKs evaluate feature flags using their cached ruleset, and determine the flag variation for a given evaluation context. To do this, they execute an in-process flag evaluation algorithm and return the resulting value.
Server-side SDKs can evaluate flags because these SDKs know your complete flag ruleset. These SDKs can determine contexts’ flag variations without having to make requests to LaunchDarkly’s servers for every evaluated flag.
You can think of each flag evaluation as a pure function, where LaunchDarkly uses the provided evaluation context along with the complete ruleset to check if a specific context should be included in an evaluation or not. It is important to note that LaunchDarkly passes along _rule data_ , not context data. If a context does not have the correct attributes locally, then it will not be evaluated by the rules that are cached by the SDK.
### Edge SDKs
Edge SDKs must be used in conjunction with an edge provider-specific integration:
 * You can only use the [Akamai SDK](/docs/sdk/edge/akamai) if you are also using the [Akamai integration](/docs/integrations/akamai).
 * You can only use the [Cloudflare SDK](/docs/sdk/edge/cloudflare) if you are also using the [Cloudflare integration](/docs/integrations/cloudflare).
 * You can only use the [Vercel SDK](/docs/sdk/edge/vercel) if you are also using the [Vercel integration](/docs/integrations/vercel).
The integration writes the latest flag data from the configured environment directly to the edge provider store. It continuously updates the edge provider’s cached flag ruleset whenever flag rules change on LaunchDarkly.
Because of this integration, edge SDKs can evaluate flags within the edge provider. The edge SDKs do not have to make requests to LaunchDarkly for every evaluated flag. Instead, these SDKs check with the edge provider store to determine which variation a particular context will receive for a given feature flag.
### AI SDKs
AI SDKs customize [AI Configs](/docs/home/getting-started/vocabulary#ai-config) based on an evaluation context. The result of an AI Config customization is the customized AI Config variation value, including the model and customized messages for the context.
AI SDKs follow roughly the same algorithm when customizing AI Configs as [server-side SDKs](/docs/sdk/concepts/client-side-server-side#server-side-sdks) do when evaluating flags. The customization call is treated as an evaluation, but the evaluation reason is not returned.
### Flag evaluation comparison
The client-side SDKs require context information in order to initialize the client. The server-side and edge SDKs require the context only when the SDK evaluates a flag.
Here is an example of the differences in flag evaluation between SDKs:
Client-sideServer-sideEdge
```
1
| // JavaScript pseudocode
---|--- 
2
| 
3
| var context = { kind: 'user', key: 'context-key-123abc' }
4
| 
5
| var ldclient = LDClient.initialize('client-side-id-123abc', context)
6
| 
7
| var flagValue = ldclient.variation('flag-key-123abc', false)
```
The client-side flag data does not include sensitive data, so no personally identifiable information (PII) is exposed on the client side if the code is unpacked or inspected. Additionally, bandwidth requirements are lower for the client-side SDKs, because LaunchDarkly sends less data to client-side SDKs. Most edge SDKs send events, however, the [Akamai SDK](/docs/sdk/edge/akamai) cannot send events.
Here is an example of the differences in flag data received by the different SDKs:
Client-sideServer-side
```
1
| {
---|--- 
2
| "show-widgets": {
3
| "version": 97,
4
| "flagVersion": 4,
5
| "value": false,
6
| "variation": 1,
7
| "trackEvents": false,
8
| "prerequisites": ["flag-1", "flag-2"] // only present if there are prerequisites
9
| }
10
| }
```
### Anonymous contexts
Whichever type of SDK you use, you can always designate a particular context as “anonymous.” Anonymous contexts work just like other contexts, except that they don’t appear on your **Contexts** list in the LaunchDarkly UI. You might use an anonymous context if you don’t yet have much information about the end user, for example, if they have not yet logged in to your application.
In client-side SDKs, typically each instance of a client-side SDK is being used by one end user at a time, in a browser or on a mobile device. The SDK can persist the context key, for example in local storage on the browser, and the context key for the anonymous context will remain stable. In most client-side SDKs, you can configure the SDK to automatically generate the context key for an anonymous context.
In server-side SDKs, the SDK instance is used by many end users at once. Your application determines which context is evaluating feature flags. Therefore, the SDK does not generate context keys for anonymous contexts. Your application code determines which context key to use for each context and passes the appropriate context into the flag evaluation call.
## Private attributes
You may not want to send all of the context attributes that you are recording back to LaunchDarkly. The security or data protection requirements of your organization may require you to limit what customer data is transmitted from your service to a third-party platform like LaunchDarkly.
You can use private attributes with client-side, server-side, AI, and edge SDKs. All LaunchDarkly SDKs have configuration options to set all or specified context attributes as private attributes.
There are two scopes for which you can mark attributes as private:
 * Across all contexts of any context kind. You might use this if you want an “email” attribute to be private whether it occurs in a user context, an organization context, or something else.
 * Within a particular context or context kind. You might use this if you want an “email” attribute to be private in a user context, but not in an organization context.
Depending on the type of SDK you use, LaunchDarkly does not receive or store the information in private attributes:
 * If you are using a server-side SDK, the SDK will not send the private attribute back to LaunchDarkly.
 * If you are using an AI SDK, the SDK will not send the private attribute back to LaunchDarkly. However, if you are using any private attributes in your [customized messages](/docs/sdk/features/ai-config#customize-messages), the result of your customization call may include messages that contain the values of the private attributes. The “private” designation is only between your application and LaunchDarkly. LaunchDarkly does not have guardrails that prevent you from sending personally identifiable information (PII) from LaunchDarkly to a third party, such as an AI model.
 * If you are using a client-side SDK, the SDK will send the private attribute back to LaunchDarkly for evaluation. However, the SDK won’t send the attribute to LaunchDarkly in events data, LaunchDarkly won’t store the private attribute, and the private attribute will not appear on the **Contexts** list or on the detail page for the context.
 * If you are using an edge SDK, the SDK will not send the private attribute back to LaunchDarkly. The [Akamai SDK](/docs/sdk/edge/akamai) cannot send events, so private attributes are not applicable.
Note that the context `key` attribute can never be private.
To learn more, read [Using private context attributes](/docs/home/flags/private-context-attributes).
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Configure your SDK: [Private attributes](/docs/sdk/features/private-attributes)
## Keys
Before embedding an SDK key into your application’s LaunchDarkly configuration, you must identify which category of SDK you’re using so that you can select the appropriate type of SDK key.
The **Environments** list for a project displays three keys for each environment:
 * SDK key
 * mobile key
 * client-side ID
Each of these keys grants different access levels to LaunchDarkly’s SDKs.
LaunchDarkly enforces that each of the SDK types use the appropriate key as described below. Requests made with one of the other two keys will be rejected. To identify which keys are used by each SDK, read [Language support](/docs/sdk/concepts/client-side-server-side#language-support).
To find and copy your LaunchDarkly SDK key, mobile key, or client-side ID:
 1. Click the project dropdown. The project menu appears:
![The project menu.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/e7170a6ea679fd8c8210aa3660093eb18394effdc9571d713b907cbce33e24c0/assets/images/auto/project-menu-dropdown.auto.png)
The project menu.
 1. Select **Project settings**.
 2. Select **Environments**. The **Environments** list appears.
 3. Click the **overflow menu** for the environment you want to copy the key for.
 4. Click **SDK key** , **Mobile key** , or **Client-side key** to copy the key to your clipboard.
### SDK key
Configure server-side SDKs and AI SDKs to use the SDK key. This key grants the SDKs read-only access to all flag data associated with the provided key’s environment. With this key, server-side and AI SDKs can download the entire flag ruleset for all flags in the environment.
The SDK key should be kept a secret. If an SDK key is exposed, or if your organization’s security policy requires you to rotate credentials on a regular basis, you can reset an SDK key from the Environments list. To learn how, read [Reset SDK credentials](/docs/home/account/environment/keys#reset-sdk-credentials).
SDK keys always start with the prefix `sdk-`.
### Mobile key
##### Making flags available to mobile SDKs
Use the “Advanced controls” section of a flag’s right sidebar to make flags available to mobile SDKs. LaunchDarkly accounts created after October 21, 2025 have this toggled on by default.
Configure mobile SDKs, and other non-JavaScript client-side SDKs, to use the mobile key. The mobile key grants these SDKs access to evaluate any flag that is associated with the key’s environment, and that you have toggled on the flag’s “Available on mobile SDKs” option.
Because you must manually connect flags to a client-side SDK, you can restrict which flags are accessible by the client-side ID.
The mobile key does not need to be kept a secret. However, if you wish to reset a mobile key, you can do so from the Environments list. To learn how, read [Reset SDK credentials](/docs/home/account/environment/keys#reset-sdk-credentials).
Mobile keys always start with the prefix `mob-`.
### Client-side ID
##### Making flags available to client-side SDKs
Use the “Advanced controls” section of a flag’s right sidebar to make flags available to mobile SDKs. LaunchDarkly accounts created after October 21, 2025 have this toggled on by default.
Configure JavaScript-based client-side SDKs to use the client-side ID. Configure edge SDKs to use the client-side ID to connect to the edge database for your CDN.
The client-side ID grants these SDKs access to evaluate any flags that are associated with the key’s environment, and that you have enabled for client-side SDK availability by toggling on the flag’s “Available on client-side SDKs” toggle. Because you must manually connect flags to a client-side SDK, you can restrict which flags are accessible by the client-side ID.
Unlike a mobile key, the client-side ID for an environment never changes. The client-side ID does not need to be kept a secret.
Client-side IDs are alphanumeric, and do not contain dashes.
## Language support
We offer SDKs for many languages and technologies. Some languages have multiple kinds of SDKs available.
If the language or framework you use is not listed here, we may provide a [sample application](/docs/sdk/concepts/sample-applications) to help you get started. Sample applications demonstrate that an SDK is compatible with a particular language or framework. However, LaunchDarkly only provides full support for those languages or frameworks that have a dedicated SDK.
Explore the following SDK reference guides for specific details about how to use LaunchDarkly with your tech stack:
SDK name | SDK type | Identifier 
---|---|--- 
[.NET (client-side)](/docs/sdk/client-side/dotnet) | Client-side (mobile) | Mobile key 
[.NET (server-side)](/docs/sdk/server-side/dotnet) | Server-side | SDK Key 
[.NET AI](/docs/sdk/ai/dotnet) | AI | SDK Key 
[Akamai](/docs/sdk/edge/akamai) | Edge | Client-side ID 
[Android](/docs/sdk/client-side/android) | Client-side (mobile) | Mobile key 
[Apex](/docs/sdk/server-side/apex) | Server-side | SDK Key 
[C++ (client-side)](/docs/sdk/client-side/c-c--) | Client-side | Mobile key 
[C++ (server-side)](/docs/sdk/server-side/c-c--) | Server-side | SDK Key 
[Cloudflare](/docs/sdk/edge/cloudflare) | Edge | Client-side ID 
[Electron](/docs/sdk/client-side/electron) | Client-side | Client-side ID 
[Erlang](/docs/sdk/server-side/erlang) | Server-side | SDK Key 
[Flutter](/docs/sdk/client-side/flutter) | Client-side | Mobile key for desktop and mobile apps 
Client-side ID for web 
[Go](/docs/sdk/server-side/go) | Server-side | SDK Key 
[Go AI](/docs/sdk/ai/go) | AI | SDK Key 
[Haskell](/docs/sdk/server-side/haskell) | Server-side | SDK Key 
[iOS](/docs/sdk/client-side/ios) | Client-side (mobile) | Mobile key 
[Java](/docs/sdk/server-side/java) | Server-side | SDK Key 
[JavaScript](/docs/sdk/client-side/javascript) | Client-side | Client-side ID 
[Lua](/docs/sdk/server-side/lua) | Server-side | SDK Key 
[Node.js (client-side)](/docs/sdk/client-side/node-js) | Client-side | Client-side ID 
[Node.js (server-side)](/docs/sdk/server-side/node-js) | Server-side | SDK Key 
[Node.js (server-side) AI](/docs/sdk/ai/node-js) | AI | SDK Key 
[PHP](/docs/sdk/server-side/php) | Server-side | SDK Key 
[Python AI](/docs/sdk/ai/python) | AI | SDK Key 
[Python (server-side)](/docs/sdk/server-side/python) | Server-side | SDK Key 
[React Web](/docs/sdk/client-side/react/react-web) | Client-side | Client-side ID 
[React Native](/docs/sdk/client-side/react/react-native) | Client-side (mobile) | Mobile key 
[Roku](/docs/sdk/client-side/roku) | Client-side | Mobile key 
[Ruby](/docs/sdk/server-side/ruby) | Server-side | SDK Key 
[Rust](/docs/sdk/server-side/rust) | Server-side | SDK Key 
[Vercel](/docs/sdk/edge/vercel) | Edge | Client-side ID 
[Vue](/docs/sdk/client-side/vue) | Client-side | Client-side ID 
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs