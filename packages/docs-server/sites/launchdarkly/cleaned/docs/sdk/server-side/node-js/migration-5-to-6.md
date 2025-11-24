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
 * [Identifying Node.js versions for the 6.0 SDK](#identifying-nodejs-versions-for-the-60-sdk)
 * [Understanding changes to dependencies](#understanding-changes-to-dependencies)
 * [Understanding changes to the Redis integration](#understanding-changes-to-the-redis-integration)
 * [Understanding changes to logging](#understanding-changes-to-logging)
 * [Understanding changes to the file data source](#understanding-changes-to-the-file-data-source)
 * [Understanding what was deprecated](#understanding-what-was-deprecated)
## Overview
This topic explains how to adapt code that currently uses a 5.x version of the [Node.js server-side SDK](/docs/sdk/server-side/node-js) to use version 6.0 or later.
Before you migrate to 6.0, update to the latest 5.x version. To learn more about updating to the latest 5.x version, visit the [SDK’s GitHub repository](https://github.com/launchdarkly/node-server-sdk/releases).
## Identifying Node.js versions for the 6.0 SDK
The 6.0 version of the SDK is compatible with Node.js versions 12 and higher. LaunchDarkly no longer supports older Node.js versions, as is documented in the [End of Life policy](https://launchdarkly.com/policies/end-of-life-policy/).
LaunchDarkly also no longer supports some Node.js versions above 12 that are not long-term-support versions and have reached their end of life. To learn more, read the [Node.js releases page](https://github.com/nodejs/release#release-schedule).
## Understanding changes to dependencies
To reduce the size of the SDK code, some dependencies have been removed or made optional.
 * `redis`: The Redis integration is no longer included in the SDK package. It is now a separate package. To learn more, read [Understanding changes to the Redis integration](/docs/sdk/server-side/node-js/migration-5-to-6#understanding-changes-to-the-redis-integration).
 * `winston`: The SDK no longer uses the `winston` package by default. You can still use `winston`. To learn more, read [Understanding changes to logging](/docs/sdk/server-side/node-js/migration-5-to-6#understanding-changes-to-logging).
 * `yaml`: The SDK no longer uses the `yaml` package by default. This only affects [`FileDataSource`](https://launchdarkly.github.io/node-server-sdk/modules/_launchdarkly_node_server_sdk_.html#FileDataSource). To learn more, read [Understanding changes to the file data source](/docs/sdk/server-side/node-js/migration-5-to-6#understanding-changes-to-the-file-data-source).
## Understanding changes to the Redis integration
If you use the [Redis integration](/docs/sdk/features/storing-data/redis#nodejs-server-side), it has a different location for the 6.0 version of the SDK.
Instead of being bundled in the main SDK package, it is now in its own package: `launchdarkly-node-server-sdk-redis`.
Add this dependency to your project by editing `package.json`, or with this command:
Installing with npm
```
$
| npm install launchdarkly-node-server-sdk-redis
---|--- 
```
Then, in any JavaScript files where you were previously referring to `RedisFeatureStore`, change the reference as shown here:
5.x syntax6.0 syntax
```
1
| const LaunchDarkly = require('launchdarkly-node-server-sdk');
---|--- 
2
| 
3
| const store = LaunchDarkly.RedisFeatureStore();
```
## Understanding changes to logging
Previously, if you did not specify your own logger in the [`logger`](https://launchdarkly.github.io/node-server-sdk/interfaces/_launchdarkly_node_server_sdk_.LDOptions.html#logger) property, the SDK used [`winston`](https://www.npmjs.com/package/winston) to create a logger.
In versions 6.0 and higher of the SDK, if you do not specify your own logger, the SDK writes log output directly to the console. It uses the same format that it was previously using with `winston`, so you may not notice any difference.
If you want to use `winston`, you can still create a `winston` logger and put it in the SDK’s `logger` property. This works exactly the same as before. The only difference is that you must make sure `winston` exists as a dependency in your project, instead of the dependency being provided automatically by the SDK.
The SDK also has a new option to allow configuring a simple logger without using `winston`. To learn more, read [`basicLogger`](https://launchdarkly.github.io/node-server-sdk/modules/_launchdarkly_node_server_sdk_.html#basicLogger).
## Understanding changes to the file data source
The [`FileDataSource`](https://launchdarkly.github.io/node-server-sdk/modules/_launchdarkly_node_server_sdk_.html#FileDataSource) component allows you to load feature flag data from files. The file data can be either JSON or YAML.
In versions 6.0 and higher of the SDK, the [`yaml`](https://www.npmjs.com/package/yaml) package is no longer loaded by default. Without it, `FileDataSource` will only allow JSON files.
If you want to use YAML data files, add the `yaml` package as a dependency in your project. The SDK automatically detects that `yaml` is present, and enables YAML parsing in `FileDataSource`.
## Understanding what was deprecated
All types and methods that were marked as deprecated/obsolete in the last 5.x release have been removed from the 6.0 release. If you were using these with a recent version previously, you should already have received deprecation warnings at build time or runtime, with suggestions about their recommended replacements.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs