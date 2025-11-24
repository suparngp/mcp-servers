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
 * [Identifying supported React versions and dependencies for the v3 SDK](#identifying-supported-react-versions-and-dependencies-for-the-v3-sdk)
 * [Understanding changes to provider configuration](#understanding-changes-to-provider-configuration)
 * [Using this migration guide](#using-this-migration-guide)
## Overview
This topic explains the changes in the React Web SDK 3.0 release and how to adapt code that uses a 2.28 version of the [React Web SDK](/docs/sdk/client-side/react/react-web) to use version 3 or later.
**Version 3 includes several breaking changes**. Additionally, if you use the Relay Proxy, you must update your Relay Proxy to version 7.0 before you update your SDK to version 3. To learn more, read the [Relay Proxy 7.0 release notes](https://github.com/launchdarkly/ld-relay/releases/tag/v7.0.0). To upgrade to the latest Relay Proxy version, visit [Relay Proxy releases](https://github.com/launchdarkly/ld-relay/releases) on GitHub.
Before you migrate to version 3, update to the latest 2.28 version. Some of the changes that are mandatory in 3 were originally added in a 2.28 version and made optional.
If you update to the latest 2.28 version, deprecation warnings appear in areas of your code that need to be changed for 3. You can update them at your own pace while still using 2.28, rather than migrating everything simultaneously. To learn more about updating to the latest 2.28 version, visit the [SDK’s GitHub repository](https://github.com/launchdarkly/react-client-sdk).
## Identifying supported React versions and dependencies for the v3 SDK
The minimum React version for the LaunchDarkly React Web v3 SDK is 16.3.3. If you want to use hooks, the minimum version is 16.8. LaunchDarkly no longer supports earlier React Web SDK versions, as stated in the [End of Life policy](https://launchdarkly.com/policies/end-of-life-policy/).
The React Web SDK version 3.0.0 uses optional chaining. If you encounter an error related to optional chaining during transpiling, bundling, or running tests, updating to version 3.0.2 should resolve the error.
## Understanding changes to provider configuration
Version 3 of this SDK lets you use contexts. When you migrate from version 2.x, replace the `user` provider configuration option with `context`. If you do not replace it, version 3 of the React Web SDK will look for the `user` configuration option as a fallback. This fallback may be removed in a future major release.
Here’s how with `asyncWithLDProvider`:
2.x syntax, user with key3.0 syntax, context with key
```
1
| const user = {
---|--- 
2
| key: "user-key-123abc",
3
| }
4
| 
5
| const LDProvider = await asyncWithLDProvider({
6
| clientSideID: "client-side-id-123abc",
7
| user: user,
8
| })
```
Here’s how with `withLDProvider`:
2.x syntax, user with key3.0 syntax, context with key
```
1
| const user = {
---|--- 
2
| key: "user-key-123abc",
3
| }
4
| 
5
| export default withLDProvider({
6
| clientSideID: "client-side-id-123abc",
7
| user: user,
8
| })(App)
```
If you use the jest-launchdarkly-mock package, update it to version 2.0.
To learn more, read the [unit tests migration guide](/docs/guides/sdk/unit-tests#migrating-from-users-to-contexts).
## Using this migration guide
The React Web client-side SDK is a wrapper of LaunchDarkly’s [JavaScript SDK](/docs/sdk/client-side/javascript). The updates necessary to migrate to version 3 of the JavaScript SDK are available in the [JavaScript SDK migration guide](/docs/sdk/client-side/javascript/migration-2-to-3).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs