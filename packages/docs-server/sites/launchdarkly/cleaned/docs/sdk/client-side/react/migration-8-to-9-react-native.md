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
 * [Understanding dependency changes](#understanding-dependency-changes)
## Overview
This topic explains the changes in the React Native SDK version 9.0 release and how to migrate to that version.
## Understanding dependency changes
**Version 9.0 includes breaking changes in dependencies**. In version 9.0, there are no changes to the React Native SDK API or functionality. However, version 9.0 does include the following changes to dependencies:
 * Version 9.0 of the SDK only includes support for React Native 0.73.
 * Version 9.0 of the SDK removes Java 11 support.
 * Version 9.0 of the SDK requires Java 17, in order to support React Native 0.73.
If your application depends directly on Java 11, or if you have other dependencies that use Java 11, then you must upgrade to a newer Java version in order to upgrade to version 9.0 of the React Native SDK.
To learn more about the changes in React Native 0.73, read the [React Native 0.73 release documentation](https://reactnative.dev/blog/2023/12/06/0.73-debugging-improvements-stable-symlinks#other-breaking-changes).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs