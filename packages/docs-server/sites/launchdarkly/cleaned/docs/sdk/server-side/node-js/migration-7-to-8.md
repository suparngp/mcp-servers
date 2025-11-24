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
 * [Introducing @launchdarkly/node-server-sdk](#introducing-launchdarklynode-server-sdk)
 * [Identifying Node.js versions for the 8.0 SDK](#identifying-nodejs-versions-for-the-80-sdk)
 * [Understanding changes to configuration options](#understanding-changes-to-configuration-options)
 * [Understanding changes to the Redis integration](#understanding-changes-to-the-redis-integration)
 * [Understanding changes to the DynamoDB integration](#understanding-changes-to-the-dynamodb-integration)
 * [Understanding changes to the TestData integration](#understanding-changes-to-the-testdata-integration)
 * [Understanding changes to the FileData integration](#understanding-changes-to-the-filedata-integration)
## Overview
This topic summarizes changes and explains how to adapt code that uses a 7.x version of the [Node.js (server-side) SDK](/docs/sdk/server-side/node-js) to use version 8.0 or later.
**Version 8.0 includes several breaking changes**.
Before you migrate to version 8.0, update to the latest 7.x version. Some of the changes that are mandatory in 8.0 were originally added in a 7.x version and made optional.
## Introducing `@launchdarkly/node-server-sdk`
In version 8.0, we’ve introduced `@launchdarkly/node-server-sdk` as a replacement for `launchdarkly-node-server-sdk`.
In this new package, the Node.js (server-side) SDK:
 * has been re-written in Typescript.
 * has been moved to a new [repository](https://github.com/launchdarkly/js-core/tree/main/packages/sdk/server-node) in GitHub.
 * has a new [package name](https://www.npmjs.com/package/@launchdarkly/node-server-sdk).
Most of the API has remained compatible with version 7.x.
## Identifying Node.js versions for the 8.0 SDK
The 8.0 version of the SDK is compatible with Node.js versions 14 and higher. LaunchDarkly no longer supports older Node.js versions, as is documented in the [End of Life policy](https://launchdarkly.com/policies/end-of-life-policy/).
LaunchDarkly also no longer supports some Node.js versions above 14 that are not long-term-support versions and have reached their end of life. To learn more, read the [Node.js releases page](https://github.com/nodejs/release#release-schedule).
## Understanding changes to configuration options
The `userKeysCapacity` and `userKeysFlushInterval` were deprecated in 7.x and removed in 8.0. Use `contextKeysCapacity` and `contextKeysFlushInterval` instead.
The `proxyHost`, `proxyPort`, and `proxyAuth` options were removed in 8.0. Use `proxyOptions` instead.
Here’s how:
Node.js SDK v8.xNode.js SDK v7.x
```
1
| import * as ld from '@launchdarkly/node-server-sdk';
---|--- 
2
| 
3
| const options: ld.LDOptions = {
4
| proxyOptions: {
5
| host: 'your-proxy-host',
6
| port: 8080,
7
| scheme: 'https',
8
| auth: 'username:password'
9
| }
10
| };
```
To learn more, read [Web proxy configuration](/docs/sdk/features/web-proxy#nodejs-server-side).
## Understanding changes to the Redis integration
The Redis integration package has a new [repository](https://github.com/launchdarkly/js-core/tree/main/packages/store/node-server-sdk-redis) and [package](https://www.npmjs.com/package/@launchdarkly/node-server-sdk-redis).
Node.js (server-side) SDK 8.0 does not work with the 2.x or earlier version of the integration. It requires `@launchdarkly/node-server-sdk-redis` version 3.0 or higher.
In version 3.0 and higher of the Node.js SDK Redis integration, the [`ioredis`](https://github.com/redis/ioredis) package is used for Redis operations.
In version 3.0 the `redisOpts` setting of `LDRedisOptions` is the `RedisOptions` type from `ioredis`. If you were using this option, then be sure to migrate your `redis` settings to `ioredis` settings.
In version 3.0 the `client` setting of `LDRedisOptions` is the `Redis` type from `ioredis`. If you were using this option, then be sure to create an `ioredis` client instead of a `redis` client.
Basic configuration of the Redis integration:
v8.0+ (JavaScript)v8.0+ (TypeScript)v7.x (JavaScript)v7.x (TypeScript)
```
1
| const ld = require('@launchdarkly/node-server-sdk');
---|--- 
2
| const RedisFeatureStore = require('@launchdarkly/node-server-sdk-redis');
3
| 
4
| const store = RedisFeatureStore({
5
| redisOpts: { host: 'redis-host', port: 6379 },
6
| prefix: 'your-key-prefix',
7
| cacheTTL: 30,
8
| });
9
| 
10
| const options = {
11
| featureStore: store
12
| };
13
| const client = ld.init(sdkKey, options);
```
## Understanding changes to the DynamoDB integration
The DynamoDB integration package has a new [repository](https://github.com/launchdarkly/js-core/tree/main/packages/store/node-server-sdk-dynamodb) and [package](https://www.npmjs.com/package/@launchdarkly/node-server-sdk-dynamodb).
Node.js (server-side) SDK 8.0 does not work with the 4.x or earlier version of the integration. It requires `@launchdarkly/node-server-sdk-dynamodb` version 5.0 or higher.
In version 5.0 and higher of the Node.js SDK DynamoDB integration, the [`AWS SDK for JavaScript v3`](https://github.com/aws/aws-sdk-js-v3) package is used for DynamoDB operations.
In version 5.0 the `clientOptions` setting of `LDDynamoDBOptions` is the `DynamoDBClientConfig` from `@aws-sdk/client-dynamodb`. If you were using this options, then be sure to migrate your settings to those used in the AWS SDK for JavaScript v3.
In version 5.0 the `dynamoDBClient` setting of `LDDynamoDBOptions` is the `DynamoDBClient` from `@aws-sdk/client-dynamodb`. If you were using this options, then be sure to migrate your client the version from the AWS SDK for JavaScript v3.
Basic configuration of the DynamoDB integration:
v8.0+ (JavaScript)v8.0+ (TypeScript)v7.x (JavaScript)v7.x (TypeScript)
```
1
| const ld = require('@launchdarkly/node-server-sdk');
---|--- 
2
| const { DynamoDBFeatureStore } = require('@launchdarkly/node-server-sdk-dynamodb');
3
| 
4
| const store = DynamoDBFeatureStore(
5
| 'your-table',
6
| { cacheTTL: 30 }
7
| );
8
| 
9
| const options = {
10
| featureStore: store
11
| };
12
| const client = ld.init('sdk-key-123abc', options);
```
## Understanding changes to the TestData integration
In v8.0 the API for TestData has changed:
 * TestData is now a class, and you must construct it using `new`.
 * There is a new method, `getFactory`, to get the updated processor factory.
Here’s how:
v8.0+ (JavaScript)v7.x (JavaScript)
```
1
| import { init } from '@launchdarkly/node-server-sdk';
---|--- 
2
| import { TestData } from '@launchdarkly/node-server-sdk/integrations';
3
| 
4
| const td = new TestData();
5
| testData.update(td.flag('flag-key-123abc').booleanFlag().variationForAll(true));
6
| const client = init('sdk-key-123abc', { updateProcessor: td.getFactory() });
7
| 
8
| // flags can be updated at any time:
9
| td.update(td.flag('flag-key-456def')
10
| .variationForUser('user-key-123abc', true)
11
| .fallthroughVariation(false));
```
## Understanding changes to the FileData integration
In v8.0 the API for FileDataSource API has changed:
 * FileDataSourceFactory is now a class, and you must construct it using `new`.
 * There is a new method, `getFactory`, to get the updated processor factory.
Here’s how:
v8.0+ (JavaScript)v8.0+ (TypeScript)v7.x (JavaScript)v7.x (TypeScript)
```
1
| const ld = require('@launchdarkly/node-server-sdk');
---|--- 
2
| const { FileDataSourceFactory } = require('@launchdarkly/node-server-sdk/integrations');
3
| 
4
| const fileData = new FileDataSourceFactory({
5
| paths: [ 'file1.json', 'file2.json' ]
6
| });
7
| 
8
| const options = {
9
| updateProcessor: fileData.getFactory()
10
| };
11
| 
12
| const client = ld.init('sdk-key-123abc', options);
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs