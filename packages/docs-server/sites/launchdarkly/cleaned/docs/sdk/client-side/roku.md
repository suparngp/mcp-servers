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
 * [Initialize an interface to SceneGraph](#initialize-an-interface-to-scenegraph)
 * [Evaluate a flag](#evaluate-a-flag)
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the client-side Roku SDK, and links to reference information on all of the supported features. The Roku SDK is written in BrightScript.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | None 
GitHub repository | [roku-client-sdk](https://github.com/launchdarkly/roku-client-sdk) 
Sample application | [Roku](https://github.com/launchdarkly/hello-roku) 
Published module | [available through GitHub releases](https://github.com/launchdarkly/roku-client-sdk/releases) 
## Get started
After you complete the [Get started](/docs/home/getting-started) process, follow these instructions to start using the LaunchDarkly SDK in your Roku Application:
 * [Install the SDK](/docs/sdk/client-side/roku#install-the-sdk)
 * [Initialize the client](/docs/sdk/client-side/roku#initialize-the-client)
 * (Optional) [Initialize an interface to SceneGraph](/docs/sdk/client-side/roku#initialize-an-interface-to-scenegraph)
 * [Evaluate a flag](/docs/sdk/client-side/roku#evaluate-a-flag)
### Install the SDK
We provide releases on [GitHub](https://github.com/launchdarkly/roku-client-sdk/releases). Download the latest release and extract the provided files into your source tree. You may need to rename the paths inside `LaunchDarklyTask.xml` depending on your project structure.
For SceneGraph usage, add a `LaunchDarklyTask` node to your scene.
### Initialize the client
To create a client instance, you need your environment’s mobile key and the context for which you want to evaluate flags. This authorizes your application to connect to a particular environment within LaunchDarkly.
##### Roku SDK credentials
The Roku SDK uses a mobile key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
Mobile keys are not secret and you can expose them in your client-side code without risk. However, never embed a server-side SDK key into a client-side application.
Here’s how to create the client:
Roku SDK v2.0 (BrightScript)Roku SDK v1.x (BrightScript)
```
1
| ' get a reference to the task
---|--- 
2
| launchDarklyNode = m.top.findNode("my-node-name")
3
| 
4
| ' create configuration
5
| config = LaunchDarklyConfig("mobile-key-123abc", launchDarklyNode)
6
| 
7
| ' create a context. You'll need this context later, but you can ignore it for now.
8
| context = LaunchDarklyCreateContext({"key": "user-key-123abc", "kind": "user"})
9
| 
10
| ' create message port
11
| messagePort = createObject("roMessagePort")
12
| 
13
| ' initialize the client
14
| LaunchDarklySGInit(config, context)
```
To learn more about the specific configuration options available in this SDK, read [Configuration](/docs/sdk/features/config#roku).
##### Use a single instance
It’s important to create a single client instance. The client instance maintains internal state that allows LaunchDarkly to serve feature flags without making any remote requests. Do not instantiate a new client with every request.
### Initialize an interface to SceneGraph
If you are working with SceneGraph, then for each SceneGraph component in which you want to use the Roku SDK, you need to initialize an interface to talk to the SceneGraph. This interface provides all the expected client functionality, such as evaluation.
Here’s how:
BrightScript
```
1
| ' create the scenegraph communication wrapper
---|--- 
2
| launchDarkly = LaunchDarklySG(launchDarklyNode)
```
### Evaluate a flag
After you initialize the client, you can use it to check which variation a particular context will receive for a feature flag.
Here’s how:
BrightScript
```
1
| ' use the client
---|--- 
2
| value = launchDarkly.boolVariation("flag-key-123abc", false)
```
If you are not using the SceneGraph, then you need to poll events to drive the client in your standard event loop:
BrightScript
```
1
| while (true)
---|--- 
2
| 
3
| ' do not wait forever or timers will break
4
| msg = wait(3000, messagePort)
5
| 
6
| 
7
| if launchDarkly.handleMessage(msg) then
8
| ' this message was for the client
9
| else
10
| ' handle non client messages
11
| end if
12
| end while
```
##### Making feature flags available to this SDK
You must make feature flags available to mobile SDKs before the SDK can evaluate those flags. If an SDK tries to evaluate a feature flag that is not available, the context will receive the fallback value for that flag.
To make a flag available to this SDK, check the **SDKs using Mobile key** checkbox during flag creation, or toggle on the option in the flag’s right sidebar. To make all of a project’s flags available to this SDK by default, check the **SDKs using Mobile key** checkbox on your project’s [Flag settings page](/docs/home/account/edit-project).
## Supported features
This SDK supports the following features:
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#roku)
 * [Configuration](/docs/sdk/features/config#roku), including
 * [Application metadata configuration](/docs/sdk/features/app-config#roku)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#roku)
 * [Context configuration](/docs/sdk/features/context-config#roku)
 * [Evaluating flags](/docs/sdk/features/evaluating#roku)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#roku)
 * [Flushing events](/docs/sdk/features/flush#roku)
 * [Getting all flags](/docs/sdk/features/all-flags#roku)
 * [Identifying and changing contexts](/docs/sdk/features/identify#roku)
 * [Logging configuration](/docs/sdk/features/logging#roku)
 * [Monitoring SDK status](/docs/sdk/features/monitoring#roku)
 * [Private attributes](/docs/sdk/features/private-attributes#roku)
 * [Relay Proxy configuration, using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode#roku)
 * [Sending custom events](/docs/sdk/features/events#roku)
 * [Subscribing to flag changes](/docs/sdk/features/flag-changes#roku)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs