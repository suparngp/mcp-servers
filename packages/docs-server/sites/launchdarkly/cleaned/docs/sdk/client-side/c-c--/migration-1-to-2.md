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
 * [Build system changes](#build-system-changes)
 * [Header and typedef changes](#header-and-typedef-changes)
 * [Logging changes](#logging-changes)
 * [JSON representation changes](#json-representation-changes)
## Overview
This topic explains how to adapt code that currently uses a 1.x version of the [C/C++ client-side SDK](/docs/sdk/client-side/c-c--) to use version 2.0.
To learn more about updating to the latest 2.x version, visit the [SDK’s GitHub repository](https://github.com/launchdarkly/c-client-sdk/releases).
## Build system changes
The C/C++ client-side SDK previously used `make` on POSIX, and `nmake` on Windows. We have transitioned to the cross platform `cmake` build system, similar to the C/C++ server-side SDK.
We recommend that you use the prebuilt releases if they exist for your platform available on the [GitHub releases page](https://github.com/launchdarkly/c-client-sdk/releases).
You can produce a simple build on Linux or OSX by using the following command:
1.x syntax2.0 syntax
```
$
| make
---|--- 
```
For more advanced `cmake` usage, or if you use another platform, read this [cmake guide](http://preshing.com/20170511/how-to-build-a-cmake-based-project). The SDK is exported as the `ldclientapi` target.
You should not consider the repository organization of source files stable. If you want to build your own artifacts and use them outside of a cmake project, `cmake install` to your directory of choice which will copy the required headers and binary.
## Header and typedef changes
In version 1.x, the SDK required you to import `uthash.h`, and `ldapi.h`. Now, similarly to the C/C++ server-side SDK, you should import the SDK with the following command:
1.x syntax2.0 syntax
```
1
| #include "ldapi.h"
---|--- 
2
| #include "uthash.h"
```
The types `LDClient`, `LDConfig`, and `LDUser` are no longer typedefs. They require the `struct` prefix:
1.x syntax2.0 syntax
```
1
| LDClient *client;
---|--- 
2
| LDUser *user;
3
| LDConfig *config;
```
In version 1.x of the SDK, when you compiled it with C++, `LDClient` was defined as a class instead of a C struct. We removed this system in version 2.0, and now `LDClient` is always a C style struct.
If you prefer a C++ interface, we added a dedicated `LDClientCPP` class that shares substantially the same API as you would have used with the 1.x C++ `LDClient`.
The entry point for the C++ interface is `launchdarkly/api.hpp` and you must link with the `ldclientapicpp` target instead of `ldclientapi`. As is standard, you can use the standard C interface in a C++ project.
## Logging changes
We have removed the logging interface from the 1.x versions, which was specific to the client-side SDK. C/C++ client- and server-side SDKs now use the same interface.
For example, to configure the SDK to use the default included logger:
1.x syntax2.0 syntax
```
1
| LDSetLogFunction(LD_LOG_INFO, yourLogger);
---|--- 
```
## JSON representation changes
The C/C++ client-side SDK 1.x used a JSON representation utilizing the `uthash.h` library. We removed this old representation completely and now use the C/C++ server-side SDK JSON interface instead. Every function relating to `LDNode` has been modified to utilize `struct LDJSON` instead. This includes `LDJSONVariation` and custom user attributes.
For example, to create a basic array, use:
1.x syntax2.0 syntax
```
1
| LDNode *names;
---|--- 
2
| 
3
| names = LDNodeCreateArray();
4
| 
5
| LDNodeAppendString(&names, "alice");
6
| LDNodeAppendString(&names, "bob");
7
| 
8
| LDNodeFree(names);
```
For complete documentation on manipulating JSON, read our [API docs on GitHub](https://launchdarkly.github.io/c-client-sdk/json_8h.html).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs