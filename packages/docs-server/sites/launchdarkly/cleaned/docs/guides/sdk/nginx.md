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
 * [Preparing the Lua server-side SDK](#preparing-the-lua-server-side-sdk)
 * [Preparing the C++ server-side SDK](#preparing-the-c-server-side-sdk)
 * [Ensuring correct initialization](#ensuring-correct-initialization)
 * [Example: Feature flagged reverse proxy](#example-feature-flagged-reverse-proxy)
## Overview
This guide explains how to use our [Lua server-side SDK](https://github.com/launchdarkly/lua-server-sdk) with the [NGINX OpenResty framework](https://openresty.org/).
OpenResty extends NGINX with [LuaJIT](https://luajit.org/), enabling complex control of [NGINX functionality](https://openresty-reference.readthedocs.io/en/latest/Lua_Nginx_API/). The OpenResty framework has substantial [commercial adoption](https://openresty.com/en/#mosaic-section).
Find a basic Dockerized app in the GitHub repository at [hello-nginx](https://github.com/launchdarkly/hello-nginx).
## Prerequisites
To complete this guide, you must have the following prerequisites:
 * Basic working knowledge of the LaunchDarkly [Lua server-side SDK](/docs/sdk/server-side/lua)
 * Basic working knowledge of the LaunchDarkly [C++ server-side SDK](/docs/sdk/server-side/c-c--)
The C++ server-side SDK is required because the Lua server-side SDK is implemented as a wrapper around the C++ server-side SDK.
## Preparing the Lua server-side SDK
Make the source of the Lua SDK accessible to OpenRESTY. You can control imports with the `lua_package_path` directive.
For example:
NGINX
```
1
| http {
---|--- 
2
| lua_package_path ";;/usr/local/openresty/nginx/scripts/?.lua;";
3
| ...
4
| }
```
## Preparing the C++ server-side SDK
Make the source of the C++ server-side SDK accessible to the dynamic linker. The most convenient way to do this is to install the binary system-wide at `/usr/lib/libldserverapi.so`.
##### Configuring OpenSSL with OpenResty
OpenResty handles OpenSSL in specific ways. You may need to build the SDK from scratch instead of using our release artifacts in order to make OpenSSL work correctly.
## Ensuring correct initialization
The most important part of effective SDK usage is managing the lifetime of clients correctly. Because NGINX utilizes process-based concurrency, multiple clients initiate. If you accidentally initiate a client per request the application will be substantially slower, as the SDK has to download a fresh ruleset from LaunchDarkly.
Initialize each NGINX worker process exactly once for ideal operations. You can do this with the `init_worker_by_lua_file` directive. This directive executes a script when a process is freshly spawned. Client initialization should reside in this script. In the example below, this file is called `shared.lua`.
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
Later we can use the result of this initialization process in other directives.
Lua SDK v2Lua SDK v1.x
```
1
| local ld = require("launchdarkly_server_sdk")
---|--- 
2
| local client = require("shared")
3
| local os = require("os")
4
| 
5
| local context = ld.makeContext({
6
| user = {
7
| key = "abc"
8
| }
9
| })
10
| 
11
| if client:boolVariation(context, "flag-key-123abc", false) then
12
| ngx.say("<p>feature launched</p>")
13
| else
14
| ngx.say("<p>feature not launched</p>")
15
| end
```
## Example: Feature flagged reverse proxy
This [reverse proxy](https://en.wikipedia.org/wiki/Reverse_proxy) example demonstrates more complex interaction between multiple NGINX directives. You can use a reverse proxy to route traffic to multiple applications.
The example follows:
NGINX, with Lua SDK v2NGINX, with Lua SDK v1.x
```
1
| location / {
---|--- 
2
| set $proxy_host "";
3
| 
4
| rewrite_by_lua_block {
5
| local ld = require("launchdarkly_server_sdk")
6
| local client = require("shared")
7
| 
8
| local context = ld.makeContext({
9
| user = {
10
| key = "abc"
11
| }
12
| })
13
| 
14
| ngx.var.proxy_host = client:stringVariation(context, "flag-key-123abc", "10.0.0.0")
15
| }
16
| 
17
| proxy_pass https://$proxy_host$uri;
18
| proxy_set_header Host $proxy_host;
19
| proxy_set_header X-Forwarded-For $remote_addr;
20
| }
```
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs