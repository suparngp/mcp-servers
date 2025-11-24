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
 * [Prerequisites](#prerequisites)
 * [Implementation guidelines for LaunchDarkly SDKs](#implementation-guidelines-for-launchdarkly-sdks)
 * [Consider your SDK use case](#consider-your-sdk-use-case)
 * [Plan for a large initial payload from the streaming endpoint](#plan-for-a-large-initial-payload-from-the-streaming-endpoint)
 * [Ensure you have a reliable network connection for first-time initialization](#ensure-you-have-a-reliable-network-connection-for-first-time-initialization)
 * [Implement SDKs in a singleton pattern](#implement-sdks-in-a-singleton-pattern)
## Overview
This topic explains the prerequisites you must consider when you’re setting up a LaunchDarkly SDK for the first time.
## Prerequisites
Regardless of which SDK you use, everyone who integrates LaunchDarkly with their code must consider the following prerequisites. Making decisions about the items listed below will help you use feature flags in a way that makes sense for your use case, customers, security considerations, and existing network architecture.
Consider the following factors when you’re starting to integrate LaunchDarkly SDKs with your code:
 1. **Determine what kind of SDK you need to use.**
 * Depending on your use case, you may need a server-side, client-side, mobile, AI, or edge SDK.
 * Generally, you only need one SDK per application or service. You can use multiple SDKs if your product is comprised of applications or services written in multiple languages. Using an AI SDK requires initializing the associated server-side SDK.
 * You do not need multiple SDKs to support front-end and back-end behavior, but we support this configuration if it works best for you.
 * All of our SDKs are thread-safe, ensuring consistent behavior from an SDK when you use it in multiple threads.
 * To learn more about SDKs, read [Choosing an SDK type](/docs/sdk/concepts/client-side-server-side).
 2. **Identify the language you want to use**. In some cases, we support multiple SDKs for a language. To learn more, read [Available SDKs](/docs/sdk#available-sdks). We may also provide a sample application in your preferred language or framework, even if we don’t have a dedicated SDK. To learn more, read [Sample applications](/docs/sdk/concepts/sample-applications).
 3. **Confirm that your tech stack is compatible with the SDK you want to use**.
 * More information about each SDK’s dependencies is available in the documentation for the specific SDK, and in the SDK’s README in GitHub.
 * LaunchDarkly uses the [SLSA framework](https://slsa.dev/spec/v1.0/about) to help developers ensure the authenticity and build integrity of published SDK packages. More information is available in the SDK’s README in GitHub.
 4. (Optional) **Determine if you need to use the Relay Proxy.** To learn more, read [The Relay Proxy](/docs/sdk/relay-proxy).
##### Newer versions of LaunchDarkly SDKs replace users with contexts
A context is a generalized way of referring to the people, services, machines, or other resources that encounter feature flags in your product. Contexts replace another data object in LaunchDarkly: “users.”
Creating contexts and evaluating flags based on them is supported in the latest major versions of [most of our SDKs](/docs/sdk). For these SDKs, the code samples on this page include the two most recent versions.
## Implementation guidelines for LaunchDarkly SDKs
Here are some basic guidelines for implementing LaunchDarkly SDKs:
### Consider your SDK use case
The SDK types have different security considerations as well as some behavioral and architectural differences. They handle flag evaluations differently, utilize different kinds of SDK keys, and support different languages.
To learn more, read [Choosing an SDK type](/docs/sdk/concepts/client-side-server-side).
### Plan for a large initial payload from the streaming endpoint
The initial payload contains all the targeting rules for the environment associated with the provided SDK key. If you target a large number of individual contexts, have a very large number of flags, or have large numbers of extremely complicated rules, then this can increase the initial payload size. Configure any relevant timeout options to anticipate a large initial load. This helps prevent the SDK from timing out.
### Ensure you have a reliable network connection for first-time initialization
The SDK will time out if it cannot get a network connection to LaunchDarkly. Failure to connect is a recoverable error, so the SDK will keep trying to reconnect, but a timeout could happen in the middle of an attempt. If the SDK times out during a first-time initialization, it will serve the flag values you defined in your application code until it can connect to LaunchDarkly.
### Implement SDKs in a singleton pattern
Your SDK should only initialize once statically, and that instance should be the exclusive instance you use for a given LaunchDarkly project. When you create multiple SDK instances, previous instances may leak into memory and stay active beyond their useful lifespan.
When you have enough of these instances running, they can cause bottlenecks in the connection to the streaming endpoint.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs