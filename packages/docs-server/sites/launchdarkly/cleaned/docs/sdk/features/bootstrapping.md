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
 * [About the bootstrapping feature](#about-the-bootstrapping-feature)
 * [Bootstrapping using local storage](#bootstrapping-using-local-storage)
 * [Bootstrapping using server-rendered content](#bootstrapping-using-server-rendered-content)
 * [Client-side SDKs](#client-side-sdks)
 * [Electron](#electron)
 * [JavaScript](#javascript)
 * [Node.js (client-side)](#nodejs-client-side)
 * [React Web](#react-web)
## Overview
This topic explains how the bootstrapping feature works in the LaunchDarkly SDKs that support it.
## About the bootstrapping feature
The bootstrapping feature lets you decrease startup times for client-side SDKs by providing them with an initial set of flag values that are immediately available during client initialization. The SDK serves these values to the end user before it has established a connection to LaunchDarkly so there is no inconsistency in the flag variations they receive.
There are two methods of bootstrapping the client:
 * Bootstrapping using local storage
 * Bootstrapping using server-rendered content
Each method has its advantages and drawbacks, explained below.
## Bootstrapping using local storage
The following applies to bootstrapping with SDKs that run in a browser, including the JavaScript SDK and the React Web SDK. To learn how to bootstrap using other client-side SDKs, read [Electron](/docs/sdk/features/bootstrapping#electron) and [Node.js (client-side)](/docs/sdk/features/bootstrapping#nodejs-client-side).
If you are using the JavaScript or React Web SDK, the client stores the latest flag settings in the browser’s local storage. The very first time the SDK is initialized, it connects to LaunchDarkly. After that, the client can initialize itself using the values in local storage. This avoids any potential additional delay from fetching the flags from the LaunchDarkly servers. The client still initializes and connects to LaunchDarkly’s service to fetch the most recent flag values, but is no longer dependent on those values to reach its `ready` state.
The local storage cache updates when new values arrive. On subsequent page loads, the client fetches the most recently cached flag values from local storage and emits the `ready` event immediately.
Bootstrapping using local storage has some benefits:
 * It is easy to set up, and requires little maintenance.
 * It is useful when you can’t dynamically add bootstrapping data to the page.
Bootstrapping using local storage also has some downsides:
 * The first time the customer visits your site, local storage is empty. This means the customer receives the site’s default behavior, as specified in the [fallback values](/docs/home/getting-started/vocabulary#fallback-value) you provide, before the values from feature flags load. Only after the customer’s second visit does the page use the values in local storage. It’s important to choose effective fallback values to limit rendering delays.
 * If there is a long time between page visits, the values stored in local storage may be out of date.
 * Some customers have privacy settings that block sites from using their browser’s local storage.
 * Flag changes that happen while the customer is on the page automatically update the local storage cache, keeping it in sync with the server. However, if the customer is not on the page when the flag change happens, the flag value in local storage may go out of sync with the server. The next time this customer visits that page, they could experience a flicker because of the client using the previous flag value from local storage.
For an example of bootstrapping from local storage on a static site, read [Bootstrap using local storage](/docs/guides/flags/static-sites#bootstrap-using-local-storage).
## Bootstrapping using server-rendered content
In this method, the server sends to the browser an HTML page containing the JavaScript and the feature flags your site needs during the initial render. Your site then bootstraps the LaunchDarkly client with those flags. Feature flags are ready immediately, and clients always receive the latest feature flag values.
Bootstrapping using server-rendered content requires more setup than bootstrapping from local storage, but provides more benefits.
The benefits of bootstrapping using server-rendered content include:
 * It provides values the first time a customer visits a page.
 * Bootstrapped values will not become out of date if there is a lag between page visits.
 * It does not rely on a customer’s privacy settings to function.
The downside to bootstrapping using server-rendered content is that it requires significantly more set up work than bootstrapping from local storage.
For a demonstration of bootstrapping from the server, visit our [hello-bootstrap GitHub repository](https://github.com/launchdarkly/hello-bootstrap).
All of the server-side SDKs have a function, named some variation of `allFlagsState`, to evaluate flags on behalf of a specified user or context. We recommend populating the initial set of bootstrap values with a JSON object containing flag metadata derived from calling the server-side SDK’s all flags method.
If your back end passes values to your front end on page load, you can call your server-side SDK’s all flags function on page load and pass the results as a parameter to your front-end initialization code. To learn more, read [Getting all flags](/docs/sdk/features/all-flags).
You can also use LaunchDarkly’s edge SDKs to access flag values without processing delays. To learn more, read [Edge SDKs](/docs/sdk/edge). For an example, read [Using LaunchDarkly with Cloudflare Workers](/docs/guides/infrastructure/cloudflare-workers).
##### Newer versions of LaunchDarkly SDKs replace users with contexts
A context is a generalized way of referring to the people, services, machines, or other resources that encounter feature flags in your product. Contexts replace another data object in LaunchDarkly: “users.”
Creating contexts and evaluating flags based on them is supported in the latest major versions of [most of our SDKs](/docs/sdk). For these SDKs, the code samples on this page include the two most recent versions.
## Client-side SDKs
This feature is available in the following client-side SDKs:
 * [Electron](/docs/sdk/features/bootstrapping#electron)
 * [JavaScript](/docs/sdk/features/bootstrapping#javascript)
 * [Node.js (client-side)](/docs/sdk/features/bootstrapping#nodejs-client-side)
 * [React Web](/docs/sdk/features/bootstrapping#react-web)
### Electron
###### Expand Electron code sample
You can use bootstrapping on the Electron SDK with values provided by LaunchDarkly-enabled code on the backend.
You can use it to set the feature flags to any values you want:
JavaScriptTypeScript
```
1
| const client = LaunchDarkly.initialize(
---|--- 
2
| 'client-side-id-123abc',
3
| user,
4
| {
5
| bootstrap: {
6
| flagKey1: flagValue1,
7
| flagKey2: flagValue2
8
| }
9
| }
10
| );
```
If you set `bootstrap` to the string `"localStorage"`, the client tries to get flag values from persistent storage, using a unique key that is based on the user properties.
In Electron, persistent storage consists of files in the [`userData`](https://electronjs.org/docs/latest) directory. If the client finds flag values stored for this user, it uses them and starts up immediately in a ready state, but also makes a background request to LaunchDarkly to get the latest values and stores them as soon as it receives them.
Here’s how to use this mode:
JavaScriptTypeScript
```
1
| const client = LaunchDarkly.initializeInMain(
---|--- 
2
| 'client-side-id-123abc',
3
| user,
4
| {
5
| bootstrap: 'localStorage'
6
| }
7
| );
```
### JavaScript
###### Expand JavaScript code sample
To bootstrap flags in the JavaScript SDK, we recommend populating the initial set of bootstrap values with a JSON object containing flag metadata derived from calling the [server-side SDK’s all flags method](/docs/sdk/features/all-flags#server-side-sdks).
Here is an example, which assumes you pass the flags on page load:
JavaScript SDK v3.xJavaScript SDK v3.x (TypeScript)
```
1
| // bootstrapData is the result of your server-side SDK call to get all flags
---|--- 
2
| const flags = JSON.parse(bootstrapData)
3
| const options = { bootstrap: flags }
4
| 
5
| function onPageLoad(flags) {
6
| ...
7
| 
8
| const client = LDClient.initialize(
9
| 'client-side-id-123abc',
10
| context,
11
| options
12
| );
13
| 
14
| ...
15
| }
```
If you can invoke your backend dynamically, such as in Ruby with a template directory, you can inline the function invocation and request that the SDK return only the client-side flags.
Here is an example of how to bootstrap flags into the JavaScript client, if you acquire the flags from a Ruby template directive:
JavaScript
```
1
| const ldclient = LDClient.initialize(
---|--- 
2
| 'client-side-id-123abc',
3
| context,
4
| options = {
5
| // Load values from a Ruby template directive
6
| bootstrap: <%= client.all_flags_state(user, {client_side_only: true}).to_json %>
7
| }
8
| );
9
| 
10
| try {
11
| await client.waitForInitialization(5);
12
| proceedWithSuccessfullyInitializedClient();
13
| } catch(err) {
14
| // Client failed to initialized or timed out
15
| // variation() calls return fallback values until initialization completes
16
| }
```
Alternatively, you can bootstrap feature flags from local storage:
JavaScriptTypeScript
```
1
| const options = { bootstrap: 'localStorage' }
---|--- 
2
| 
3
| const client = LDClient.initialize('client-side-id-123abc', context, options);
4
| 
5
| try {
6
| await client.waitForInitialization(5);
7
| proceedWithSuccessfullyInitializedClient();
8
| } catch(err) {
9
| // Client failed to initialized or timed out
10
| // variation() calls return fallback values until initialization completes
11
| }
```
When the client uses local storage, it stores the latest flag settings there. On page load, it uses the previous settings and emits the ‘ready’ event immediately. This means that on page load, the end user may receive cached flag values until the next page load.
You can still subscribe to flag changes if you use local storage.
### Node.js (client-side)
###### Expand Node.js (client-side) code sample
You can use bootstrapping on the Node.js (client-side) SDK with values provided by LaunchDarkly-enabled code on the backend. You can populate the initial set of bootstrap values with a JSON object containing flag metadata derived from calling the [server-side SDK’s all flags method](/docs/sdk/features/all-flags#server-side-sdks).
You can use it to set the feature flags to any values you want:
Node.js (client-side) SDK, v3 (JavaScript)Node.js (client-side) SDK, v3 (TypeScript)
```
1
| // bootstrapData is the result of your server-side SDK call to get all flags
---|--- 
2
| const flags = JSON.parse(bootstrapData)
3
| 
4
| function onPageLoad(flags) {
5
| ...
6
| 
7
| const client = LDClient.initialize(
8
| 'client-side-id-123abc',
9
| context,
10
| options = {
11
| bootstrap: flags
12
| }
13
| );
14
| 
15
| ...
16
| }
```
A more useful mode in a client-side Node application is to bootstrap from locally cached values. In this mode, if no values have been cached yet, the SDK obtains flags from LaunchDarkly and then caches them in persistent storage. The next time you start, the cached flags are immediately available, and the SDK also contacts LaunchDarkly in the background to obtain updated values.
To activate this mode, use the special string `"localStorage"`:
JavaScriptTypeScript
```
1
| const client = LDClient.initialize(
---|--- 
2
| 'client-side-id-123abc',
3
| context,
4
| {
5
| bootstrap: 'localStorage'
6
| }
7
| );
```
### React Web
###### Expand React code sample
You can bootstrap flags into the React Web SDK the same way you bootstrap flags into the JavaScript SDK: by setting [`bootstrap`](https://launchdarkly.github.io/react-client-sdk/interfaces/LDOptions.html#bootstrap) in the [`options`](https://launchdarkly.github.io/react-client-sdk/interfaces/LDOptions.html) included when you initialize the [`LDClient`](https://launchdarkly.github.io/react-client-sdk/interfaces/LDClient.html). To learn how, read [JavaScript](/docs/sdk/features/bootstrapping#javascript), above.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs