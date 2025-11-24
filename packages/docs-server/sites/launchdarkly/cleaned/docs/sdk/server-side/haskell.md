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
 * [Evaluate a context](#evaluate-a-context)
 * [Shut down the client](#shut-down-the-client)
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the Haskell SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/haskell-server-sdk/) 
GitHub repository | [haskell-server-sdk](https://github.com/launchdarkly/haskell-server-sdk) 
Sample application | [Haskell](https://github.com/launchdarkly/hello-haskell-server) 
Published module | [Hackage](https://hackage.haskell.org/package/launchdarkly-server-sdk) 
## Get started
Follow the steps below to get started using the LaunchDarkly SDK in your Haskell application.
### Install the SDK
The root module of the SDK `LaunchDarkly.Server` re-exports the entire project.
Here is an example:
Haskell
```
1
| import LaunchDarkly.Server
---|--- 
```
##### The Haskell SDK uses an SDK key
The Haskell SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
### Initialize the client
After you import and install the SDK, create a single shared instance of `Client`. Specify your SDK key to authorize your application to connect to a particular environment within LaunchDarkly.
Here’s how:
Haskell
```
1
| client :: IO Client
---|--- 
2
| client = makeClient $ makeConfig "sdk-key-123abc"
```
To learn more about the specific configuration properties that are available in this SDK, read [`Config`](https://launchdarkly.github.io/haskell-server-sdk/LaunchDarkly-Server-Config.html).
##### Client must be a singleton
It’s important to make `Client` a singleton for each LaunchDarkly project. The client instance maintains an internal state that allows LaunchDarkly to serve feature flags without making any remote requests. Do not instantiate a new client with every request.
If you have multiple LaunchDarkly projects, you can create one `LDClient` for each. In this situation, the clients operate independently. For example, they do not share a single connection to LaunchDarkly.
### Evaluate a context
You can use `client` to check which variation a particular context will receive for a given feature flag. To learn more, read [Evaluating flags](/docs/sdk/features/evaluating) and [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons). For more information about how contexts are specified, read [Context configuration](/docs/sdk/features/context-config).
Here’s how:
Haskell SDK v4.0Haskell SDK v3.x
```
1
| boolVariation client "flag-key-123abc" (makeContext "context-key-123abc" "context-kind") False
---|--- 
```
## Shut down the client
Shut down the client when your application terminates. To learn more, read [Shutting down](/docs/sdk/features/shutdown#haskell).
## Supported features
This SDK supports the following features:
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#haskell)
 * [Configuration](/docs/sdk/features/config#haskell), including
 * [Application metadata configuration](/docs/sdk/features/app-config#haskell)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#haskell)
 * [Context configuration](/docs/sdk/features/context-config#haskell)
 * [Evaluating flags](/docs/sdk/features/evaluating#haskell)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#haskell)
 * [Flushing events](/docs/sdk/features/flush#haskell)
 * [Getting all flags](/docs/sdk/features/all-flags#haskell)
 * [Identifying and changing contexts](/docs/sdk/features/identify#haskell)
 * [Offline mode](/docs/sdk/features/offline-mode#haskell)
 * [Private attributes](/docs/sdk/features/private-attributes#haskell)
 * [Reading flags from a file](/docs/sdk/features/flags-from-files#haskell)
 * [Relay Proxy configuration](/docs/sdk/features/relay-proxy-configuration)
 * [Using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode#haskell)
 * [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#haskell)
 * [Secure mode](/docs/sdk/features/secure-mode#haskell)
 * [Sending custom events](/docs/sdk/features/events#haskell)
 * [Shutting down](/docs/sdk/features/shutdown#haskell)
 * [Storing data](/docs/sdk/features/storing-data#haskell)
 * [Test data sources](/docs/sdk/features/test-data-sources#haskell)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs