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
 * [Get started](#get-started)
 * [Install the SDK](#install-the-sdk)
 * [Initialize the client](#initialize-the-client)
 * [Subscribe to flag changes](#subscribe-to-flag-changes)
 * [Shut down the client](#shut-down-the-client)
 * [Troubleshooting](#troubleshooting)
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the client-side Node.js SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/node-client-sdk/) 
GitHub repository | [node-client-sdk](https://github.com/launchdarkly/node-client-sdk) 
Sample application | [Node.js (client-side)](https://github.com/launchdarkly/hello-node-client) 
Published module | [npm](https://www.npmjs.com/package/launchdarkly-node-client-sdk) 
##### For use in mobile, desktop, and embedded client applications only
This SDK is intended for use in single-user mobile, desktop, and embedded applications. If you have a Node.js application and want to set up LaunchDarkly on the server-side, read the [server-side Node.js SDK reference](/docs/sdk/server-side/node-js). If you are using Electron, there is an [Electron SDK](/docs/sdk/client-side/electron) more specifically designed for that environment.
To learn more about LaunchDarkly’s different SDK types, read [Choosing an SDK type](/docs/sdk/concepts/client-side-server-side).
This SDK is closely related to the [browser JavaScript SDK](/docs/sdk/client-side/javascript) and has almost exactly the same API, but does not have any browser-specific functionality and adds several features specific to Node.
## Get started
After you complete the [Get started](/docs/home/getting-started) process, follow these instructions to start using the LaunchDarkly SDK in your Node.js code:
 * [Install the SDK](/docs/sdk/client-side/node-js#install-the-sdk)
 * [Initialize the client](/docs/sdk/client-side/node-js#initialize-the-client)
 * [Subscribe to flag changes](/docs/sdk/client-side/node-js#subscribe-to-flag-changes)
### Install the SDK
First, install the LaunchDarkly SDK as a dependency in your application using your application’s dependency manager.
Here’s how:
Installing with npmInstalling with yarn
```
$
| npm install launchdarkly-node-client-sdk
---|--- 
```
Next, import the LaunchDarkly client in your application code:
JavaScriptTypeScript
```
1
| const LaunchDarkly = require('launchdarkly-node-client-sdk');
---|--- 
```
### Initialize the client
After you install and import the SDK, create a single, shared instance of `LDClient`. To create a client instance, you need your environment’s client-side ID and the context for which you want to evaluate flags. This authorizes your application to connect to a particular environment within LaunchDarkly.
##### Node.js (client-side) SDK credentials
The Node.js (client-side) SDK requires a client-side ID. Client-side IDs are specific to each project and environment. They are not secret, and you can include them in client-side code. Do not embed a server-side SDK key in a client-side application.
You can find client-side IDs and project keys in **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
If you connect the Node.js (client-side) SDK to the `ldcli` dev-server for local testing, use your project key instead of a client-side ID. Set all service endpoints to `http://localhost:8765`. If you use a client-side ID, the SDK connects to LaunchDarkly rather than the dev-server, which can result in CORS errors.
Feature flag targeting and rollouts are determined by the active context, which describes the end user using your application. You must pass a context to the SDK during initialization before requesting any feature flags with `variation`. Failure to pass a valid context to the SDK during initialization will result in an error.
When you initialize the client, use the `waitForInitialization()` method to determine if the client successfully initializes. The `waitForInitialization()` method takes a timeout, which we recommend setting to five seconds or fewer. If you use a large timeout and await it, then any network delays will cause your application to wait a long time before continuing execution.
Here’s how to initialize the client:
Node.js SDK v3 (JavaScript)Node.js SDK v3 (TypeScript)
```
1
| // You'll need this context later, but you can ignore it for now.
---|--- 
2
| const context = {
3
| kind: 'user',
4
| key: 'user-key-123abc'
5
| };
6
| 
7
| const client = LaunchDarkly.initialize('client-side-id-123abc', context);
8
| try {
9
| await client.waitForInitialization(5);
10
| // initialization succeeded, flag values are now available
11
| } catch (err) {
12
| // initialization failed or did not complete before timeout
13
| }
```
As an alternative to the `waitForInitialization()` call, you can use event listeners instead. The client emits the event `"initialized"` to indicate success, and `"failed"` to indicate failure. The client also emits a `"ready"` event when it has finished starting up, regardless of whether it successfully connected to LaunchDarkly or encountered an error. In a production application, your calls to `client.variation` would normally not be inside of this event handler.
To use event listeners:
JavaScriptTypeScript
```
1
| client.on('initialized', () => {
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
When you initialize the client, you can optionally provide configuration options. To learn how, read [Configuration](/docs/sdk/features/config#nodejs-client-side). To learn more about the specific configuration options available in this SDK, read [`LDOptions`](https://launchdarkly.github.io/node-client-sdk/interfaces/LDOptions.html).
After you have initialized the client, you can safely call `variation` to access your feature flags.
##### LDClient must be a singleton
It’s important to make `LDClient` a singleton for each LaunchDarkly project. The client instance maintains internal state that allows LaunchDarkly to serve feature flags without making any remote requests. Do not instantiate a new client with every request.
If you have multiple LaunchDarkly projects, you can create one `LDClient` for each. In this situation, the clients operate independently. For example, they do not share a single connection to LaunchDarkly.
### Subscribe to flag changes
The SDK does not subscribe to streaming real-time updates automatically when you initialize it.
In some cases, streaming may not be necessary. For example, if you reload your entire application on each update, you will get all the flag values again when the client is re-initialized. If this is your use case, you should leave the `streaming` value undefined, which is the default.
In other cases, streaming may be required. Subscribing to streaming is the only way to receive real-time updates. If you determine that streaming is necessary for your application, there are two ways to subscribe to streaming:
 * Explicitly subscribe to streaming: If you set the `streaming` configuration option to `true`, the client will always attempt to maintain a streaming connection.
 * Register a change listener: If you specify an event handler with `client.on('change')` the client will open a streaming connection. It will close this streaming connection when you unsubscribe from the event, for example by calling `client.off('change')`. Because opening and closing streaming connections can be expensive, you should explicitly enable streaming if your application frequently starts and stops listening to changes.
##### Making feature flags available to this SDK
You must make feature flags available to client-side SDKs before the SDK can evaluate those flags. If an SDK tries to evaluate a feature flag that is not available, the context will receive the fallback value for that flag.
To make a flag available to this SDK, check the **SDKs using Client-side ID** checkbox during flag creation, or toggle on the option in the flag’s right sidebar. To make all of a project’s flags available to this SDK by default, check the **SDKs using Client-side ID** checkbox on your project’s [Flag settings page](/docs/home/account/edit-project).
## Shut down the client
Shut down the client when your application terminates. To learn more, read [Shutting down](/docs/sdk/features/shutdown#nodejs-client-side).
## Troubleshooting
If your application logs show the error `LaunchDarklyFlagFetchError: network error`, it may indicate a problem with network connectivity between your SDK and LaunchDarkly.
For steps to resolve this issue, read the LaunchDarkly Knowledge Base article [Error “LaunchDarklyFlagFetchError: network error”](https://support.launchdarkly.com/hc/en-us/articles/12998125691419-Error-LaunchDarklyFlagFetchError-network-error).
## Supported features
This SDK supports the following features:
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#nodejs-client-side)
 * [Bootstrapping](/docs/sdk/features/bootstrapping#nodejs-client-side)
 * [Configuration](/docs/sdk/features/config#nodejs-client-side), including
 * [Application metadata configuration](/docs/sdk/features/app-config#nodejs-client-side)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#nodejs-client-side)
 * [Context configuration](/docs/sdk/features/context-config#nodejs-client-side)
 * [Evaluating flags](/docs/sdk/features/evaluating#nodejs-client-side)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#nodejs-client-side)
 * [Flushing events](/docs/sdk/features/flush#nodejs-client-side)
 * [Getting all flags](/docs/sdk/features/all-flags#nodejs-client-side)
 * [Identifying and changing contexts](/docs/sdk/features/identify#nodejs-client-side)
 * [Logging configuration](/docs/sdk/features/logging#nodejs-client-side)
 * [Private attributes](/docs/sdk/features/private-attributes#nodejs-client-side)
 * [Relay Proxy configuration, using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode#nodejs-client-side)
 * [Secure mode](/docs/sdk/features/secure-mode#configure-secure-mode-in-javascript-based-sdks)
 * [Sending custom events](/docs/sdk/features/events#nodejs-client-side)
 * [Shutting down](/docs/sdk/features/shutdown#nodejs-client-side)
 * [Subscribing to flag changes](/docs/sdk/features/flag-changes#nodejs-client-side)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs