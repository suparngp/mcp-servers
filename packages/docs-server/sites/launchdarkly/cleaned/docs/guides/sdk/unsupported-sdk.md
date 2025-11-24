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
 * [Using the Relay Proxy and polling against it](#using-the-relay-proxy-and-polling-against-it)
 * [Understanding the Relay Proxy option](#understanding-the-relay-proxy-option)
 * [Implementing the Relay Proxy option](#implementing-the-relay-proxy-option)
 * [Evaluating the Relay Proxy option](#evaluating-the-relay-proxy-option)
 * [Writing your own SDK wrapper](#writing-your-own-sdk-wrapper)
 * [Writing your own SDK](#writing-your-own-sdk)
 * [Requesting support for a tech stack](#requesting-support-for-a-tech-stack)
 * [Conclusion](#conclusion)
## Overview
This guide explains your options for working with LaunchDarkly without a supported SDK for your tech stack.
LaunchDarkly supports a variety of SDKs for client-side and server-side development. To review the complete list, read [Available SDKs](/docs/sdk#available-sdks). If the tech stack your organization uses is not in this list, you have several options.
Your options include:
 * [Using the Relay Proxy and polling against it](/docs/guides/sdk/unsupported-sdk#using-the-relay-proxy-and-polling-against-it)
 * [Writing your own SDK wrapper](/docs/guides/sdk/unsupported-sdk#writing-your-own-sdk-wrapper)
 * [Writing your own SDK](/docs/guides/sdk/unsupported-sdk#writing-your-own-sdk)
 * [Requesting support for your tech stack](/docs/guides/sdk/unsupported-sdk#requesting-support-for-a-tech-stack)
This guide describes each option, why you might use it, how to employ it, and some of its advantages and disadvantages.
## Prerequisites
To complete this guide, you must have the following prerequisites:
 * A tech stack that is not compatible with our [available SDKs](/docs/sdk#available-sdks). If we have an SDK for your language or platform, you should use that instead of any of the strategies described in this guide.
##### A note about supported SDKs
In some cases, a [supported SDK](/docs/sdk#available-sdks) exists for your technology, but isn’t specifically built for your technology. For example, we have a [JavaScript SDK](/docs/sdk/client-side/javascript) and SDKs for a few common JavaScript frameworks. But we don’t have specific SDKs for every JavaScript framework.
If you are using a framework for which we don’t yet have a specific SDK, then using the existing supported SDK for your underlying technology should be the first option you consider.
 * An understanding of the differences between server-side, client-side, and edge SDKs. The SDK types have different security considerations as well as some behavioral and architectural differences. To learn more, read [Choosing an SDK type](/docs/sdk/concepts/client-side-server-side).
 * Familiarity with making REST requests. Several of the options expose SDK functionality through REST endpoints. If you choose one of these options, you should be comfortable making REST requests from within your application.
 * A basic understanding of the Relay Proxy, and why it might or might not be a good fit for your organization. One of the options involves polling against the Relay Proxy. If you are interested in this option, you should evaluate whether using the Relay Proxy makes sense for you. To learn more, read [The Relay Proxy](/docs/sdk/relay-proxy).
## Using the Relay Proxy and polling against it
If your tech stack is not compatible with our available SDKs, one option is to use the Relay Proxy and poll against it.
### Understanding the Relay Proxy option
The Relay Proxy is a small Go application that connects to the LaunchDarkly streaming API and proxies that connection to clients within an organization’s network. It lets multiple servers connect to a local stream instead of making a large number of outbound connections to LaunchDarkly’s streaming service. Adding the Relay Proxy to your LaunchDarkly configuration introduces architectural complexity, so it’s not for every organization.
If you want to evaluate feature flags without an SDK, the Relay Proxy provides endpoints for evaluating all feature flags for a given context, and you can use these instead.
The Relay Proxy endpoints for evaluating feature flags for a given context are equivalent to the polling endpoints for client-side or mobile SDKs, but can be used whether you are looking for a server-side or client-side SDK.
The endpoints require a base64-encoded context in the request endpoint in order to return feature flag names and the resulting variants for that context. The endpoints use the SDK key as a credential. Remember that the SDK key should be kept secret. To learn more, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
### Implementing the Relay Proxy option
If you choose this option, the first step is to set up the Relay Proxy. To learn how, read [Using the Relay Proxy](/docs/sdk/relay-proxy/sdk-config).
To evaluate all flag values for a given context, you have two options:
 * You can make a GET request to your Relay Proxy at the `/sdk/evalx/contexts/{contextBase64}` endpoint, where `{contextBase64}` is the base64-encoded JSON object for the evaluation context.
 * You can make a REPORT request to your Relay Proxy at the `/sdk/evalx/context` endpoint, and include the evaluation context JSON object in the request body.
In both cases, you must pass an `Authorization` header with your SDK key as part of the request. For the REPORT request, you also need a `Content-Type` header. You might choose to use a REPORT request over a GET request so that the evaluation context is in the request body, where it is less likely that it will be accessible to monitoring and logging tools.
Here’s how:
GET request, Relay Proxy v7.0+REPORT request, Relay Proxy v7.0+
```
$
| curl -X GET https://your-relay-proxy.com:8030/sdk/evalx/contexts/base64Encoding \
---|--- 
>
| -H "Authorization: sdk-key-123abc"
```
In the example,
 * `https://your-relay-proxy.com:8030` is the local URI and port for your Relay Proxy. Depending on your configuration, your address may be different.
 * `base64Encoding` should be replaced with the base64-encoded JSON object for the evaluation context, for example, the encoding for `{"kind": "user", "key": "context-key-123abc", "name": "Sandy"}`.
To learn more, read [Special flag evaluation endpoints](https://github.com/launchdarkly/ld-relay/blob/v8/docs/endpoints.md#special-flag-evaluation-endpoints) in the [Relay Proxy GitHub documentation](https://github.com/launchdarkly/ld-relay/blob/v8/README.md).
### Evaluating the Relay Proxy option
Using the Relay Proxy and polling against its endpoints is our recommended choice for production use if there is not an officially supported SDK for your technology. Using the provided endpoints means you don’t have to write your own SDK or SDK wrapper, which can save significant time and resources both for startup and for maintenance.
However, using the Relay Proxy comes with its own benefits and drawbacks. If you are not already using the Relay Proxy, then setting up and configuring the Relay Proxy just so you can poll against it means additional infrastructure to maintain as part of your application. To learn more, read [Relay Proxy use cases](/docs/sdk/relay-proxy/use-cases). Additionally, polling against the Relay Proxy will result in much more traffic to your Relay Proxy than there would be with typical usage through one of our supported SDKs. To learn more, read [Scaling guidelines](/docs/sdk/relay-proxy/guidelines#scaling-guidelines).
## Writing your own SDK wrapper
##### This option is unsupported
LaunchDarkly does not provide support for this option. We do provide some resources and guidance, described below.
You should consider carefully whether using an unsupported option is appropriate for your organization.
An SDK wrapper facilitates interactions between your codebase and the corresponding LaunchDarkly SDK. SDK wrappers can simplify your workflow by making an SDK easier to use or more accessible to your codebase. To learn more about SDK wrappers, read [Use cases for SDK wrappers](/docs/guides/sdk/sdk-wrappers).
If LaunchDarkly does not support an SDK for your tech stack, you can write your own SDK wrapper. You might choose this option if there is an interoperability layer between your preferred language and one of our supported languages. You can write a wrapper around the supported SDK using your preferred language.
This is a common pattern, and one that we at LaunchDarkly have used ourselves, for both client-side and server-side SDKs. For example, prior to the release of version 10, older versions of our [React Native SDK](/docs/sdk/client-side/react/react-native) were implemented as a wrapper around our [Android SDK](/docs/sdk/client-side/android) and [iOS SDK](/docs/sdk/client-side/ios). Our [Lua SDK](/docs/sdk/server-side/lua) is implemented as a thin Lua wrapper on top of our [server-side C++ SDK](/docs/sdk/server-side/c-c--).
One benefit of writing your own SDK wrapper is that writing a wrapper is likely to be simpler and faster than [writing your own SDK](/docs/guides/sdk/unsupported-sdk#writing-your-own-sdk) because your wrapper will delegate to the underlying SDK for most functionality. And while your wrapper won’t be officially supported, the underlying SDK is.
## Writing your own SDK
##### This option is unsupported
LaunchDarkly does not provide support for this option. We do provide some resources and guidance, described below.
You should consider carefully whether using an unsupported option is appropriate for your organization.
If LaunchDarkly does not support your preferred language, you can also choose to write your own SDK for it. This might be the right option for you if don’t want to use the Relay Proxy and there is not an interoperability layer between your preferred language and one of our supported languages.
We provide guidance on writing your own SDK in the [Contributor’s guide](/docs/sdk/concepts/contributors-guide). This document includes implementation details on the main components to a LaunchDarkly SDK implementation, including receiving feature flag updates, evaluating feature flags, and recording analytics events. It also covers some best practices and reviews a few common mistakes we’ve observed. Additionally, all of our existing SDKs are open source, so you can choose one as a reference implementation for your own work.
One benefit of writing your own SDK is that it’s entirely under your control. It’s also likely the fastest option if your tech stack is particularly unique. However, you do have to build and maintain it yourself, and there may be a bit of a learning curve to get started.
## Requesting support for a tech stack
If you don’t have interest in or capacity for writing your own SDK or wrapper, or using the Relay Proxy, then you can request support for a new SDK directly from LaunchDarkly.
To request support for a new SDK, start a Support ticket or contact your LaunchDarkly account representative.
Depending on overall interest for your requested technology, we may decide to write a new SDK. We may also write a wrapper, if there is a reliable interoperability layer between your language and one of our supported languages.
Making a request is easy, and is one way that LaunchDarkly engineering and product managers stay informed about what technologies our customers are most interested in. However, making a request does not guarantee that we’ll create a new SDK for your preferred language, or that we’ll create it as quickly as you might prefer.
## Conclusion
In this guide, you learned about several options for working with LaunchDarkly without a supported SDK for your tech stack, including why you might choose each option, and some of the advantages and disadvantages of each.
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs