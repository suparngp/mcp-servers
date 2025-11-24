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
 * [Browser support](#browser-support)
 * [Get started](#get-started)
 * [Install the SDK](#install-the-sdk)
 * [Make the SDK available with a script tag](#make-the-sdk-available-with-a-script-tag)
 * [Initialize the client](#initialize-the-client)
 * [Determine when the client is ready](#determine-when-the-client-is-ready)
 * [Use events to determine when the client is ready](#use-events-to-determine-when-the-client-is-ready)
 * [Use promises to determine when the client is ready](#use-promises-to-determine-when-the-client-is-ready)
 * [Subscribe to flag changes](#subscribe-to-flag-changes)
 * [Shut down the client](#shut-down-the-client)
 * [Troubleshooting](#troubleshooting)
 * [Network error](#network-error)
 * [CORS errors in local development](#cors-errors-in-local-development)
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the client-side JavaScript SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/js-client-sdk/) 
GitHub repository | [js-client-sdk](https://github.com/launchdarkly/js-client-sdk) 
Sample application | [JavaScript](https://github.com/launchdarkly/hello-js) 
Published module | [npm](https://www.npmjs.com/package/launchdarkly-js-client-sdk) 
##### For use in mobile, desktop, and embedded client applications only
This SDK is intended for use in single-user mobile, desktop, and embedded applications. It is intended for client-side (browser) feature flags only. If you have a Node.js application and want to set up LaunchDarkly on the server-side, read the [server-side Node.js SDK reference](/docs/sdk/server-side/node-js).
To learn more about LaunchDarkly’s different SDK types, read [Choosing an SDK type](/docs/sdk/concepts/client-side-server-side).
##### Do you need information about Svelte, Angular, or other frameworks?
LaunchDarkly does not offer SDKs for all languages or frameworks. If you’re searching for information about using Svelte, Preact, or Angular with LaunchDarkly, you may be able to use the JavaScript SDK instead.
To request support for a specific language or framework, [start a Support ticket](https://support.launchdarkly.com/hc/en-us/requests/new).
This SDK does two things:
 * Makes feature flags available to your client-side (front-end) JavaScript code.
 * Sends `click`, `page view`, and `custom` events from your front-end for A/B tests and analytics.
## Browser support
The LaunchDarkly client-side JavaScript SDK can be used in all major browsers. However, not all browsers have built-in support for the standard APIs that it uses. Those APIs are Promise, EventSource, and querySelectorAll. The SDK always requires Promise, but the other two are optional depending on which SDK features you use.
The standard solution for ensuring that you will get the same functionality even in browsers that do not have native support for these features is to use [polyfills](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill). For a detailed description, and links to information about which browsers may require this, read [JS SDK requirements and polyfills](/docs/sdk/client-side/javascript/requirements-polyfills).
Additionally, the JavaScript SDK versions 3.0.0 and 3.1.0 use optional chaining. If you encounter an error related to optional chaining during transpiling, bundling, or running tests, updating to version 3.1.1 should resolve the error.
##### Do Not Track and ad blocking software
The JavaScript SDK respects the [Do Not Track events](https://www.eff.org/issues/do-not-track) header. If an end user has Do Not Track enabled in their browser, the SDK does not send analytics events for flag evaluations or metrics to `events.launchdarkly.com`. To learn more, read [Browser privacy settings block analytic events to LaunchDarkly](https://support.launchdarkly.com/hc/en-us/articles/13689033183771-Browser-privacy-settings-block-analytic-events-to-LaunchDarkly). In addition, ad-blocking software may block analytics events from being sent. This does not impact feature flag evaluations. To learn more about the events SDKs send to LaunchDarkly, read [Analytics events](/docs/sdk/concepts/events).
## Get started
After you complete the [Get started](/docs/home/getting-started) process, follow these instructions to start using the LaunchDarkly JavaScript SDK in your JavaScript code:
 * [Install the SDK](/docs/sdk/client-side/javascript#install-the-sdk)
 * [Initialize the client](/docs/sdk/client-side/javascript#initialize-the-client)
 * [Determine when the client is ready](/docs/sdk/client-side/javascript#determine-when-the-client-is-ready), using an event or promise
 * [Subscribe to flag changes](/docs/sdk/client-side/javascript#subscribe-to-flag-changes)
 * [Shut down the client](/docs/sdk/client-side/javascript#shut-down-the-client) when your application terminates
### Install the SDK
The first step is to make the JavaScript SDK available as a dependency.
We recommend making the LaunchDarkly [observability plugins](/docs/sdk/observability) available as well. These plugins collect and send observability data to LaunchDarkly, including [metrics autogenerated from observability events](/docs/home/metrics/autogen-metrics#metrics-autogenerated-from-observability-events). This means you can review session replay, error monitoring, logs, and traces from within the LaunchDarkly UI. They require the JavaScript SDK version 3.7 or later.
In most cases, making the JavaScript SDK available to your application or site requires running one of the following in your project:
npmyarn
```
$
| npm install launchdarkly-js-client-sdk
---|--- 
>
| 
>
| # optional observability plugins
>
| npm install @launchdarkly/observability
>
| npm install @launchdarkly/session-replay
```
If you are using a package manager and combining dependencies with your code using a tool such as Webpack, there are various ways to import the JavaScript SDK into your code.
Depending on your build system and language, you can import the SDK using CommonJS (`require`), ES modules (`import`), or TypeScript (`import` with type support):
JavaScript and TypeScript
```
1
| // Using CommonJS (for Node.js environments without ES modules)
---|--- 
2
| const LDClient = require('launchdarkly-js-client-sdk');
3
| 
4
| // Using ES2015 modules (modern JavaScript environments and most bundlers)
5
| import LDClient from 'launchdarkly-js-client-sdk';
6
| 
7
| // Using TypeScript (same as ES modules, with type support)
8
| import LDClient from 'launchdarkly-js-client-sdk';
```
In earlier versions of the SDK, the package was named `ldclient-js` instead of `launchdarkly-js-client-sdk`.
A less common method to make the JavaScript SDK available is with a `script` tag.
###### Expand Make the SDK available with a script tag
#### Make the SDK available with a script tag
To load the JavaScript SDK as a script tag, include one of the following in the `<head>` tag of your site on any pages where you need feature flags or want to track metrics for Experimentation.
##### Do not use script tags from unpkg or jsDelivr in production
The `script` tag in the self-hosted example below references a script which is deployed alongside other JavaScript resources in your application. We recommend that you use this method in production.
Do not use script tags with sources from unpkg and jsDelivr in production environments. These introduce a critical dependency on a third-party service. The unpkg and jsDelivr scripts are intended to be used only for ease of development and getting started.
In production environments, we strongly recommend that you self-host the JavaScript SDK alongside your other JavaScript resources.
If you are working in a development environment, you can load the SDK from unpkg or jsDelivr using the example code below. Replace the `<EXAMPLE-VERSION>` with your desired version. To learn more, read [Releases](https://github.com/launchdarkly/js-client-sdk/releases) in the [JavaScript SDK GitHub repository](https://github.com/launchdarkly/js-client-sdk). We recommend pinning to an exact SDK version if you are using a third-party hosting service.
Here is an example of code to include in the `<head>` tag of your site:
Loading from a self-hosted scriptLoading from unpkgLoading from jsDelivr
```
1
| <!-- recommended for production environments -->
---|--- 
2
| <script src="path/to/ldclient.min.js"></script>
```
### Initialize the client
To create a client instance, you need your LaunchDarkly environment’s client-side ID and the context for which you want to evaluate flags. This authorizes your application to connect to a particular environment within LaunchDarkly.
##### JavaScript SDK credentials
The JavaScript SDK requires a client-side ID. Client-side IDs are specific to each project and environment. They are not secret, and you can include them in client-side code. Do not embed a server-side SDK key in a client-side application.
You can find client-side IDs and project keys in **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
If you connect the JavaScript SDK to the `ldcli` dev-server for local testing, use your project key instead of a client-side ID. Set all service endpoints to `http://localhost:8765`. If you use a client-side ID, the SDK connects to LaunchDarkly instead of the dev-server, which can result in CORS errors.
We recommend that you templatize your client-side ID so that you can use the same initialization code when you switch between development, QA, and production environments.
Feature flag targeting and rollouts are determined by the end user viewing the page. You must pass a context, which describes this end user, to the SDK during initialization before you can request any feature flags. If you fail to pass a valid context to the SDK during initialization, you will receive a 400 error.
To initialize the client, first create an instance. The client begins attempting to connect to LaunchDarkly as soon as it is created.
Initializing the client makes a remote request to LaunchDarkly. Depending on your network conditions, it may take a couple hundred milliseconds before the SDK emits the ready event.
If you [evaluate flags](/docs/sdk/features/evaluating) before the client has finished connecting to LaunchDarkly, the evaluation returns the fallback values. This may be acceptable depending on how reactive your application is and what you are using flags for in your application.
If you require feature flag values before rendering the page, we recommend using one of the following options:
 * Bootstrap the client by providing an initial set of flag values that are immediately available during client initialization. If you bootstrap the client, it will emit the ready event immediately. To learn more, read [Bootstrapping](/docs/sdk/features/bootstrapping#javascript). To learn about best practices when using other default flag value methods, read [Eliminating flicker when using default flag values](/docs/sdk/client-side/javascript/default-values).
 * Use `waitForInitialization()` to determine when the client has finished connecting to LaunchDarkly. This method takes a timeout, which we recommend setting to five seconds or fewer. It can also return an error, which you must handle in your application. To learn more, read [Determine when the client is ready](/docs/sdk/client-side/javascript#determine-when-the-client-is-ready), below.
Here’s how to initialize the client and verify it has finished connecting to LaunchDarkly:
JavaScript SDK v3.7+TypeScript SDK v3.7+
```
1
| import * as LDClient from 'launchdarkly-js-client-sdk';
---|--- 
2
| import { Observability } from '@launchdarkly/observability';
3
| import { SessionReplay } from '@launchdarkly/session-replay';
4
| 
5
| const context = {
6
| kind: 'user',
7
| key: 'context-key-123abc'
8
| };
9
| 
10
| const client = LDClient.initialize('client-side-id-123abc', context, {
11
| plugins: [
12
| new Observability(),
13
| new SessionReplay()
14
| ]
15
| });
16
| 
17
| try {
18
| await client.waitForInitialization(5);
19
| // initialization succeeded, flag values are now available
20
| handleInitializedClient(client);
21
| } catch (err) {
22
| // initialization failed or did not complete before timeout
23
| }
24
| 
25
| // Example user-defined function
26
| function handleInitializedClient(client) {
27
| // Add your app logic here
28
| console.log("LaunchDarkly client initialized successfully");
29
| }
```
##### handleInitializedClient is not provided by the SDK
`handleInitializedClient` is not provided by the SDK. It represents your application logic that should run once the LaunchDarkly client is initialized.
To learn more about additional options for initializing the client, read [Determine when the client is ready](/docs/sdk/client-side/javascript#determine-when-the-client-is-ready), below.
When you initialize the client, you can optionally provide configuration options. To learn how, read [Configuration](/docs/sdk/features/config#javascript). To learn more about the specific configuration options available in this SDK, read [`LDOptions`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html).
We recommend making the LaunchDarkly [observability plugins](/docs/sdk/observability) available as well, as shown in the configuration options above.
##### LDClient must be a singleton
It’s important to make `LDClient` a singleton for each LaunchDarkly project. The client instance maintains internal state that allows LaunchDarkly to serve feature flags without making any remote requests. Do not instantiate a new client with every request.
If you have multiple LaunchDarkly projects, you can create one `LDClient` for each. In this situation, the clients operate independently. For example, they do not share a single connection to LaunchDarkly.
### Determine when the client is ready
The client begins attempting to connect to LaunchDarkly as soon as it is created. Then, you must check that it is ready to use. If you do not confirm this, your application may wait indefinitely if LaunchDarkly is unavailable.
To find out when the client is ready, you can use one of two mechanisms:
 * events
 * promises
###### Expand Use events to determine when the client is ready
#### Use events to determine when the client is ready
The client object can emit JavaScript events. It emits a `ready` event when it receives initial flag values from LaunchDarkly. You can listen for this event to determine when the client is ready to evaluate flags.
Here’s how:
JavaScriptTypeScript
```
1
| client.on('ready', () => {
---|--- 
2
| // initialization succeeded, flag values are now available
3
| const flagValue = client.variation('flag-key-123abc', false);
4
| // etc.
5
| });
```
The client emits the `ready` event only once, when it finishes initializing. If you receive an error message about the `ldclient.on('ready')` callback not firing, this means that the SDK began listening for the `ready` event too late, after the client already emitted it. To fix this, move the `ready` listener to immediately after you call `initialize`, or use a promise instead. To learn more, read [Error “ldclient.on(‘ready’)” not firing](https://support.launchdarkly.com/hc/en-us/articles/13688474507035-Error-ldclient-on-ready-not-firing).
###### Expand Use promises to determine when the client is ready
#### Use promises to determine when the client is ready
You can use the `waitForInitialization()` method to determine when the client is ready. This method rejects the promise if initialization fails. The `waitForInitialization()` method takes a timeout, which we recommend setting to five seconds or fewer. If you use a large timeout and await it, then any network delays will cause your application to wait a long time before continuing execution. The `waitForInitialization()` method can also return an error, which you must handle in your application.
Here are some examples:
JavaScript (v3.7+)TypeScript (v3.7+)
```
1
| import * as LDClient from 'launchdarkly-js-client-sdk';
---|--- 
2
| import { Observability } from '@launchdarkly/observability';
3
| import { SessionReplay } from '@launchdarkly/session-replay';
4
| 
5
| const context = {
6
| kind: 'user',
7
| key: 'context-key-123abc'
8
| };
9
| 
10
| const client = LDClient.initialize('client-side-id-123abc', context, {
11
| plugins: [
12
| new Observability(),
13
| new SessionReplay()
14
| ]
15
| });
16
| 
17
| try {
18
| await client.waitForInitialization(5);
19
| // initialization succeeded, flag values are now available
20
| handleInitializedClient(client);
21
| } catch (err) {
22
| // initialization failed or did not complete before timeout
23
| }
24
| 
25
| // Example user-defined function
26
| function handleInitializedClient(client) {
27
| // Replace this with your application's logic
28
| const flagValue = client.variation('flag-key-123abc', false);
29
| console.log("LaunchDarkly client initialized successfully", flagValue);
30
| }
```
The SDK only decides initialization has failed if it receives an error response indicating that the client-side ID is invalid. If it has trouble connecting to LaunchDarkly, it will keep retrying until it succeeds. To learn more, read [`waitForInitialization`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDClient.html#waitForInitialization).
##### Always include a timeout parameter
Do not configure your SDK to initialize without a timeout parameter. Doing so will cause your app never to load if there is a connectivity problem. We recommend setting a timeout for no more than 1-5 seconds.
##### handleInitializedClient is not provided by the SDK
handleInitializedClient is not provided by the SDK. In all examples, it represents your application logic that should run once the LaunchDarkly client is initialized.
## Subscribe to flag changes
The SDK does not subscribe to streaming real-time updates automatically when you initialize it.
In some cases, streaming may not be necessary. For example, if you reload your entire application on each update, you will get all the flag values again when the client is re-initialized. If this is your use case, you should leave the `streaming` value undefined, which is the default.
In other cases, streaming may be required. Subscribing to streaming is the only way to receive real-time updates. If you determine that streaming is necessary for your application, there are two ways to subscribe to streaming:
 * Explicitly subscribe to streaming: If you set the `streaming` configuration option to `true`, the client will always attempt to maintain a streaming connection.
 * Register a change listener: If you subscribe to `change` or `change:flag-key` events, the client will open a streaming connection. It will close this streaming connection when you unsubscribe from the event, for example by calling `.off('change:flag-key')`. Because opening and closing streaming connections can be expensive, you should explicitly enable streaming if your application frequently starts and stops listening to changes.
If you do enable streaming through either of these methods, you will also need `EventSource`. If you also enable the SDK’s [`useReport` configuration option](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html#useReport), you will need LaunchDarkly’s `EventSource` polyfill. To learn more, read [EventSource](/docs/sdk/client-side/javascript/requirements-polyfills#eventsource).
To learn more, read [`streaming`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html#streaming).
##### Making feature flags available to this SDK
You must make feature flags available to client-side SDKs before the SDK can evaluate those flags. If an SDK tries to evaluate a feature flag that is not available, the end user will receive the fallback value for that flag.
To make a flag available to this SDK, check the **SDKs using Client-side ID** checkbox during flag creation, or toggle on the option in the flag’s right sidebar. To make all of a project’s flags available to this SDK by default, check the **SDKs using Client-side ID** checkbox on your project’s [Flag settings page](/docs/home/account/edit-project).
## Shut down the client
Shut down the client when your application terminates. To learn more, read [Shutting down](/docs/sdk/features/shutdown#javascript).
## Troubleshooting
This section describes common issues you might encounter when using the JavaScript SDK and how to resolve them.
### Network error
If your application logs show the error `LaunchDarklyFlagFetchError: network error`, there may be a problem with network connectivity between your SDK and LaunchDarkly.
For steps to resolve this issue, read the LaunchDarkly Knowledge Base article [Error “LaunchDarklyFlagFetchError: network error”](https://support.launchdarkly.com/hc/en-us/articles/12998125691419-Error-LaunchDarklyFlagFetchError-network-error).
### CORS errors in local development
If you see CORS errors in the browser while using the ldcli dev-server, check your SDK configuration. The JavaScript SDK must use your project key as the credential and all service endpoints must point to `http://localhost:8765`.
If you use a client-side ID instead of the project key, the SDK connects to LaunchDarkly rather than the dev-server. This prevents the SDK from retrieving local flag values and can produce CORS errors.
## Supported features
This SDK supports the following features:
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#javascript)
 * [Bootstrapping](/docs/sdk/features/bootstrapping#javascript)
 * [Configuration](/docs/sdk/features/config#javascript), including
 * [Application metadata configuration](/docs/sdk/features/app-config#javascript)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#javascript)
 * [Context configuration](/docs/sdk/features/context-config#javascript)
 * [Evaluating flags](/docs/sdk/features/evaluating#javascript)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#javascript)
 * [Flushing events](/docs/sdk/features/flush#javascript)
 * [Getting all flags](/docs/sdk/features/all-flags#javascript)
 * [Hooks](/docs/sdk/features/hooks#javascript)
 * [Identifying and changing contexts](/docs/sdk/features/identify#javascript)
 * [Inspectors](/docs/sdk/features/inspectors#javascript)
 * [Logging](/docs/sdk/features/logging#javascript)
 * [Observability](/docs/sdk/observability/javascript)
 * [OpenTelemetry in client-side SDKs](/docs/sdk/features/opentelemetry-client-side)
 * [Private attributes](/docs/sdk/features/private-attributes#javascript)
 * [Relay Proxy configuration, using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode#javascript)
 * [Secure mode](/docs/sdk/features/secure-mode#configure-secure-mode-in-javascript-based-sdks)
 * [Sending custom events](/docs/sdk/features/events#javascript)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#javascript)
 * [Shutting down](/docs/sdk/features/shutdown#javascript)
 * [Subscribing to flag changes](/docs/sdk/features/flag-changes#javascript)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs