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
 * [Why use this instead of the Node.js SDK?](#why-use-this-instead-of-the-nodejs-sdk)
 * [Server-side Node.js SDK compatibility](#server-side-nodejs-sdk-compatibility)
 * [Get started](#get-started)
 * [Install the SDK](#install-the-sdk)
 * [Initialize the client](#initialize-the-client)
 * [Evaluate a flag](#evaluate-a-flag)
 * [Shut down the client](#shut-down-the-client)
 * [Troubleshooting](#troubleshooting)
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the LaunchDarkly SDK for the [Electron](https://electronjs.org/) desktop application framework, and links to reference information on all of the supported features. This is a variant of the [client-side JavaScript SDK](/docs/sdk/client-side/javascript) with additional functionality for Electron.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/electron-client-sdk/) 
GitHub repository | [electron-client-sdk](https://github.com/launchdarkly/electron-client-sdk) 
Sample application | [Electron](https://github.com/launchdarkly/hello-electron) 
Published module | [npm](https://www.npmjs.com/package/launchdarkly-electron-client-sdk) 
## Why use this instead of the Node.js SDK?
Because Electron is based on Node.js, it is possible to run the [LaunchDarkly server-side Node.js SDK](/docs/sdk/server-side/node-js) in it. However, we strongly discourage this because the server-side Node.js SDK is not meant for applications that are distributed to users. There are several reasons why this distinction matters:
 * The server-side SDKs include an SDK key that can download the entire definition, including rollout rules and individual user targets, of all of your feature flags. If you embed this SDK key in an application, any user who looks inside the application can then access all of your feature flag definitions, which may include sensitive data such as other users’ email addresses. The client-side and mobile SDKs use different credentials that do not allow this.
 * The server-side SDKs download your entire flag data using this key, because they have to be able to evaluate flags quickly for any user. This can be a large amount of data. The client-side and mobile SDKs, which normally evaluate flags for just one user at a time, use a much more efficient protocol where they request only the active variation for each flag for that specific user.
LaunchDarkly also provides a [client-side Node.js SDK](/docs/sdk/client-side/node-js). However, we still recommend the Electron SDK if you are working in Electron. The Electron SDK includes features that are specific to Electron, such as the ability to access main-process flags from the front end as described below.
### Server-side Node.js SDK compatibility
For developers who were using the server-side Node.js in Electron before the Electron SDK was available, there are differences between the APIs that can be inconvenient. For instance, in the server-side Node.js SDK, `variation()` is an asynchronous call that takes a callback, whereas in the client-side SDKs it is synchronous.
To make this transition easier, the LaunchDarkly Electron SDK provides an optional wrapper that emulates the Node.js SDK. When you create the main-process client, after you call `initializeInMain`, pass the client object to `createNodeSdkAdapter`. The resulting object uses the Node-style API.
Here’s how to create the wrapper:
JavaScript
```
1
| const realClient = LDElectron.initializeInMain('client-side-id-123abc', user, options)
---|--- 
2
| 
3
| const wrappedClient = LDElectron.createNodeSdkAdapter(realClient)
4
| 
5
| wrappedClient.waitForInitialization().then(function () {
6
| wrappedClient.variation(flagKey, user, defaultValue, function (err, result) {
7
| console.log('flag value is ' + result)
8
| })
9
| })
```
The underlying implementation is still the client-side SDK, which has a single-current-user model. Therefore, when you call `client.variation(flagKey, user, defaultValue)` it is really calling `client.identify(user)` first, obtaining flag values for that user, and then evaluating the flag. This performs poorly if you attempt to evaluate flags for a variety of different users in rapid succession.
##### Set the current user in the main process
If you are using the normal pattern of configuring your LaunchDarkly client in the main process, and then using `initializeInRenderer()` to get a mirror of the client in a renderer process, the client instance in the renderer process will not allow you to call `identify()` to change the current user. You can only set the current user in the main process.
## Get started
After you complete the [Get started](/docs/home/getting-started) process, follow these instructions to start using the LaunchDarkly SDK in your Electron code:
 * [Install the SDK](/docs/sdk/client-side/electron#install-the-sdk)
 * [Initialize the client](/docs/sdk/client-side/electron#initialize-the-client)
 * [Evaluate a flag](/docs/sdk/client-side/electron#evaluate-a-flag)
### Install the SDK
You can install the SDK into your Electron project using `npm`:
Installing with npm
```
$
| npm install launchdarkly-electron-client-sdk
---|--- 
>
| 
>
| # In earlier versions, the package name was ldclient-electron
```
### Initialize the client
Every Electron application consists of a _main process_ , which is similar to a Node.js application, and some number of _renderer processes_ , each of which is a Chromium web browser with its own window. These processes have their own independent JavaScript engines and data spaces, although there are ways to communicate between them.
We designed the LaunchDarkly Electron SDK to use LaunchDarkly feature flags from within any of these processes. In the normal use case, there is an SDK client running in the main process and the renderer processes can then create client instances that are in effect mirrors of the main one.
To set up the main process client, you need the client-side ID for your LaunchDarkly environment, an object containing user properties, and optional configuration properties. You can change the user later if needed. The client-side ID authorizes your application to connect to a particular environment within LaunchDarkly.
##### Electron SDK credentials
The Electron SDK requires a client-side ID. Client-side IDs are specific to each project and environment. They are not secret, and you can include them in client-side code. Do not embed a server-side SDK key in a client-side application.
You can find client-side IDs in **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
To initialize the client:
JavaScriptTypeScript
```
1
| const LDElectron = require('launchdarkly-electron-client-sdk')
---|--- 
2
| 
3
| // You'll need this user later, but you can ignore it for now.
4
| const user = { key: 'example' }
5
| const options = {}
6
| const client = LDElectron.initializeInMain('client-side-id-123abc', user, options)
```
To learn more about the specific configuration options available in this SDK, read [`LDOptions`](https://launchdarkly.github.io/electron-client-sdk/interfaces/_launchdarkly_electron_client_sdk_.ldoptions.html).
##### Instantiate a single instance
It’s important to use `initializeInMain()` to instantiate a single instance. The client instance maintains internal state that allows LaunchDarkly to serve feature flags without making any remote requests. Do not instantiate a new client with every request.
To create a client object that uses the same feature flag data in a renderer process, use this:
JavaScriptTypeScript
```
1
| const LDElectron = require('launchdarkly-electron-client-sdk')
---|--- 
2
| 
3
| const client = LDElectron.initializeInRenderer()
```
This gives you an object with the same interface so you can do things like evaluate feature flags, listen for flag change events, and so on in the same way for both the main process and the renderer process. However, only the main-process client is actually communicating with LaunchDarkly. The renderer-process clients are delegating to the main-process client. This means that the overhead per application window is minimal, although you should retain a single client instance per window, rather than creating them ad-hoc when you need to evaluate a flag.
The SDK initializes both types of client asynchronously, so if you want to determine when the client is ready to evaluate feature flags, use the `ready` event or `waitForInitialization()`:
JavaScript
```
1
| // Using an event listener:
---|--- 
2
| client.on('ready', function () {
3
| // Now we can evaluate some feature flags
4
| })
5
| 
6
| // Or, using a Promise:
7
| client.waitForInitialization().then(function () {
8
| // Now we can evaluate some feature flags
9
| })
```
If you try to evaluate feature flags before the client is ready, it will behave as it would if no flags existed. For example,`variation` will return the fallback value.
### Evaluate a flag
After you create the client, you can use it to check which variation a particular user will receive for a feature flag.
Here’s how:
JavaScriptTypeScript
```
1
| const flagValue = client.variation('flag-key-123abc', false);
---|--- 
2
| 
3
| // proceed based on flag value, for example:
4
| 
5
| if (flagValue) {
6
| // feature flag targeting is on
7
| } else {
8
| // feature flag targeting is off
9
| }
```
##### Making feature flags available to this SDK
You must make feature flags available to client-side SDKs before the SDK can evaluate those flags. If an SDK tries to evaluate a feature flag that is not available, the user will receive the fallback value for that flag.
To make a flag available to this SDK, check the **SDKs using Client-side ID** checkbox during flag creation, or toggle on the option in the flag’s right sidebar. To make all of a project’s flags available to this SDK by default, check the **SDKs using Client-side ID** checkbox on your project’s [Flag settings page](/docs/home/account/edit-project).
## Shut down the client
Shut down the client when your application terminates. To learn more, read [Shutting down](/docs/sdk/features/shutdown#electron).
## Troubleshooting
If your application logs show the error `LaunchDarklyFlagFetchError: network error`, it may indicate a problem with network connectivity between your SDK and LaunchDarkly.
For steps to resolve this issue, read the LaunchDarkly Knowledge Base article [Error “LaunchDarklyFlagFetchError: network error”](https://support.launchdarkly.com/hc/en-us/articles/12998125691419-Error-LaunchDarklyFlagFetchError-network-error).
## Supported features
This SDK supports the following features:
 * [Aliasing users](/docs/sdk/features/aliasing-users#electron)
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#electron)
 * [Bootstrapping](/docs/sdk/features/bootstrapping#electron)
 * [Configuration](/docs/sdk/features/config#electron)
 * [Context configuration](/docs/sdk/features/context-config#electron)
 * [Evaluating flags](/docs/sdk/features/evaluating#electron)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#electron)
 * [Getting all flags](/docs/sdk/features/all-flags#electron)
 * [Identifying and changing contexts](/docs/sdk/features/identify#electron)
 * [Logging configuration](/docs/sdk/features/logging#electron)
 * [Monitoring SDK status](/docs/sdk/features/monitoring#electron)
 * [Private attributes](/docs/sdk/features/private-attributes#electron)
 * [Relay Proxy configuration, using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode#electron)
 * [Secure mode](/docs/sdk/features/secure-mode#configure-secure-mode-in-javascript-based-sdks)
 * [Sending custom events](/docs/sdk/features/events#electron)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#electron)
 * [Shutting down](/docs/sdk/features/shutdown#electron)
 * [Subscribing to flag changes](/docs/sdk/features/flag-changes#electron)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs