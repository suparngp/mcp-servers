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
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the Lua SDK, and links to reference information on all of the supported features. We also provide documentation for running the SDK in [NGINX](/docs/guides/sdk/nginx) and [HAProxy](/docs/guides/sdk/haproxy).
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and sample applications:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/lua-server-sdk/modules/launchdarkly-server-sdk.html) 
GitHub repository | [lua-server-sdk](https://github.com/launchdarkly/lua-server-sdk) 
Sample applications | [Lua](https://github.com/launchdarkly/hello-lua-server) 
[Lua with HAProxy](https://github.com/launchdarkly/hello-haproxy) 
[Lua with OpenResty NGINX](https://github.com/launchdarkly/hello-nginx) 
Published module | [LuaRocks](https://luarocks.org/modules/launchdarkly) 
## Get started
After you complete the [Getting Started](/docs/home/getting-started) process, follow these steps to get started using the LaunchDarkly SDK in your Lua application.
The Lua server-side SDK is implemented using a foreign function interface that calls the C++ server-side SDK. You need to install the C++ server-side SDK dynamic library somewhere accessible by the linker.
To learn more, read [C++ SDK reference (server-side)](/docs/sdk/server-side/c-c--).
### Install the SDK
First, include the library:
Lua
```
1
| local ld = require("launchdarkly_server_sdk")
---|--- 
```
##### The Lua SDK uses an SDK key
The Lua SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
### Initialize the client
After you install and import the SDK, create a single, shared instance of `LDClient`. Specify your SDK key here to authorize your application to connect to a particular environment within LaunchDarkly.
##### LDClient must be a singleton
It’s important to make `LDClient` a singleton for each LaunchDarkly project. The client instance maintains internal state that allows LaunchDarkly to serve feature flags without making any remote requests. Do not instantiate a new client with every request.
If you have multiple LaunchDarkly projects, you can create one `LDClient` for each. In this situation, the clients operate independently. For example, they do not share a single connection to LaunchDarkly.
Calling `clientInit` initiates a remote call to the LaunchDarkly service to fetch feature flags. This call blocks up for the time that you provide in milliseconds. If you request a feature flag before the client completes initialization, you will receive the default flag value.
Here is an example:
Lua
```
1
| -- This will block for 1 second
---|--- 
2
| local client = ld.clientInit("sdk-key-123abc", 1000, config)
```
To learn more about the specific configuration properties that are available in this SDK, read [`clientInit`](https://launchdarkly.github.io/lua-server-sdk/modules/launchdarkly-server-sdk.html#clientInit).
### Evaluate a context
You can use `client` to check which variation a particular context will receive for a given feature flag.
Here’s how:
Lua SDK v1.xLua SDK v1.x
```
1
| if client:boolVariation(context, "flag-key-123abc", false) then
---|--- 
2
| print "feature is enabled"
3
| else
4
| print "feature is disabled"
5
| end
```
## Supported features
This SDK supports the following features:
 * [Aliasing users](/docs/sdk/features/aliasing-users#lua)
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#lua)
 * [Configuration](/docs/sdk/features/config#lua), including
 * [Application metadata configuration](/docs/sdk/features/app-config#lua)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#lua)
 * [Context configuration](/docs/sdk/features/context-config#lua)
 * [Evaluating flags](/docs/sdk/features/evaluating#lua)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#lua)
 * [Flushing events](/docs/sdk/features/flush#lua)
 * [Getting all flags](/docs/sdk/features/all-flags#lua)
 * [Identifying and changing contexts](/docs/sdk/features/identify#lua)
 * [Logging](/docs/sdk/features/logging#lua)
 * [Offline](/docs/sdk/features/offline-mode#lua)
 * [Private attributes](/docs/sdk/features/private-attributes#lua)
 * [Relay Proxy configuration](/docs/sdk/features/relay-proxy-configuration)
 * [Using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode#lua)
 * [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#lua)
 * [Sending custom events](/docs/sdk/features/events#lua)
 * [Storing data](/docs/sdk/features/storing-data#lua)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs