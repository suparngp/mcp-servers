`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Guides](/docs/guides)
 * [Account management](/docs/guides/account)
 * [AI Configs](/docs/guides/ai-configs)
 * [Experimentation](/docs/guides/experimentation)
 * [Feature flags](/docs/guides/flags)
 * [Infrastructure](/docs/guides/infrastructure)
 * [Integrations](/docs/guides/integrations)
 * [Metrics](/docs/guides/metrics)
 * [SDKs](/docs/guides/sdk)
 * [Statistical methodology](/docs/guides/statistical-methodology)
 * [REST API](/docs/guides/api)
 * [Teams and custom roles](/docs/guides/teams-roles)
 * [Additional resources](/docs/guides/additional-resources)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Prerequisites](#prerequisites)
 * [Preparing the C++ server-side SDK](#preparing-the-c-server-side-sdk)
 * [Ensuring correct initialization](#ensuring-correct-initialization)
## Overview
This guide explains how to use our [Lua server-side SDK](https://github.com/launchdarkly/lua-server-sdk) with [HAProxy](https://www.haproxy.org/). You can use HAProxy with LaunchDarkly to implement dynamic rate limiting, access controls, rollout, and many other features at the edge of your application architecture.
You can extend HAProxy with [Lua 5.3](https://www.lua.org/manual/5.3/), enabling complex control of [HAProxy functionality](http://www.arpalert.org/src/haproxy-lua-api/2.1/index.html). HAProxy has substantial [commercial adoption](https://www.haproxy.org/they-use-it.html).
Find a basic Dockerized app in the GitHub repository at [hello-haproxy](https://github.com/launchdarkly/hello-haproxy).
## Prerequisites
To complete this guide, you must have the following prerequisites:
 * Basic working knowledge of the LaunchDarkly [Lua server-side SDK](/docs/sdk/server-side/lua)
 * Basic working knowledge of the LaunchDarkly [C++ server-side SDK](/docs/sdk/server-side/c-c--)
The C++ server-side SDK is required because the Lua server-side SDK is implemented as a wrapper around the C++ server-side SDK.
## Preparing the C++ server-side SDK
Make the binary of the C++ server-side SDK accessible to the dynamic linker. The most convenient way to do this is to install the binary system-wide at `/usr/lib/libldserverapi.so`.
## Ensuring correct initialization
The most important part of effective SDK usage is managing the lifetime of clients correctly. When HAProxy utilizes process-based concurrency, multiple clients initiate. If you accidentally initiate a client per request, the application is substantially slower because the SDK has to download a fresh ruleset from LaunchDarkly.
For ideal operations, initialize each HAProxy worker process exactly once. You can do this with the `lua-load` directive under `global`. This directive executes a script when a process is freshly spawned. Client initialization should reside in this script. In the example below, this file is called `shared.lua`.
Here is an example of initialization logic:
Lua SDK v2Lua SDK v1.x
```
1
| local ld = require("launchdarkly_server_sdk")
---|--- 
2
| local os = require("os")
3
| 
4
| return ld.clientInit(os.getenv(sdk_key), 1000, config)
```
Later we can use the result of this initialization process in other services:
Lua SDK v2Lua SDK v1.x
```
1
| core.register_service("launchdarkly", "http", function(applet)
---|--- 
2
| applet:start_response()
3
| 
4
| local context = ld.makeContext({
5
| user = {
6
| key = "abc"
7
| }
8
| })
9
| 
10
| if client:boolVariation(context, os.getenv(flag_key), false) then
11
| applet:send("<p>feature launched</p>")
12
| else
13
| applet:send("<p>feature not launched</p>")
14
| end
15
| end)
```
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs