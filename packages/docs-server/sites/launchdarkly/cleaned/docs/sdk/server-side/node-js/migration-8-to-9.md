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
 * [Understanding how to manage a migration](#understanding-how-to-manage-a-migration)
 * [Configuring the migration](#configuring-the-migration)
 * [Reading and writing during the migration](#reading-and-writing-during-the-migration)
 * [Understanding changes to variation methods](#understanding-changes-to-variation-methods)
 * [Understanding what was removed](#understanding-what-was-removed)
## Overview
This topic explains the changes in the Node.js (server-side) SDK 9.0 release and how to migrate to that version.
**Version 9.0 includes breaking changes**. It removes the deprecated `LDUser`. To learn more, read [Understanding what was removed](/docs/sdk/server-side/node-js/migration-8-to-9#understanding-what-was-removed). Additionally, if you use the Relay Proxy, you must update your Relay Proxy to version 8.0 before you update your SDK to version 9.0. To learn more, read the [Relay Proxy 8.0 release notes](https://github.com/launchdarkly/ld-relay/releases/tag/v8.0.0). To upgrade to the latest Relay Proxy version, visit [Relay Proxy releases](https://github.com/launchdarkly/ld-relay/releases) on GitHub.
Version 9.0 also introduces the ability to manage migrations or modernizations. You might use this functionality if you are optimizing queries, upgrading to new tech stacks, migrating from one database to another, or other similar technology changes.
You will need this functionality to use migration flags. A migration flag is a temporary flag used to migrate data or systems while keeping your application available and disruption free. To learn more, read [Migration flags](/docs/home/flags/migration).
Finally, version 9.0 includes type safe `variation` methods for use with TypeScript.
Before you migrate to version 9.0, we recommend updating to the latest 8.x version. If you update to the latest 8.x version, deprecation warnings appear in areas of your code that need to be changed for 9.0, for example, any use of `LDUser`. You can update these areas at your own pace while still using 8.x, rather than migrating everything simultaneously. To learn more about updating to the latest 8.x version, visit the [SDK’s GitHub repository](https://github.com/launchdarkly/js-core/tree/main/packages/sdk/server-node).
## Understanding how to manage a migration
Depending on how you created your migration feature flag, your migration will have two, four, or six stages. At each stage, you will be reading data from the old system, the new system, or both. You will also be writing data to the old system, the new system, or both. At each stage, only one of these destinations is considered the authoritative source. In the LaunchDarkly SDK, you can determine which stage of the migration your application is currently in, execute the appropriate read and write methods, and then compare the results to check correctness and view any errors or changes in latency.
To manage your migration:
 * [Configure the migration](/docs/sdk/server-side/node-js/migration-8-to-9#configuring-the-migration)
 * [Call the read and write methods you defined](/docs/sdk/server-side/node-js/migration-8-to-9#reading-and-writing-during-the-migration)
### Configuring the migration
There are two categories of migration options that you can configure for each LaunchDarkly SDK:
 * Options for reading and writing data: You can define how to read from and write to both the old system and the new system. You can also define a method to check whether the two reads are a match, and whether the migration should execute serially or concurrently. To learn how these options apply to each migration stage, read [Use SDKs to manage a migration](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration).
 * Options for tracking metrics: You can configure whether the SDK should track latency and errors, so that you can monitor the performance of your application during the migration.
Each of the `readOld`, `readNew`, `writeOld`, and `writeNew` functions accept an optional argument, which is typically used to define what to read or write. They should return `LDMigrationSuccess` or `LDMigrationError`, or can throw an exception. The code sample below uses a mix to illustrate these possibilities.
Here’s how to configure each of these options:
Node.js SDK v9.0
```
1
| import * as ld from '@launchdarkly/node-server-sdk';
---|--- 
2
| const options: ld.LDMigrationOptions = {
3
| readNew: async(key?: string) => {
4
| console.log("Reading from new: ", key);
5
| return LDMigrationSuccess(true);
6
| },
7
| readOld: async(key?: string) => {
8
| console.log("Reading from old: ", key);
9
| return LDMigrationSuccess(true);
10
| },
11
| writeNew: async(params?: {key: string, value: string}) => {
12
| console.log("Writing to new: ", params);
13
| // if failure
14
| return LDMigrationError(new Error('example error'));
15
| },
16
| writeOld: async(params?: {key: string, value: string}) => {
17
| console.log("Writing to old: ", params);
18
| // if failure
19
| return LDMigrationError(new Error('example error'));
20
| },
21
| 
22
| check: (old, new) => {
23
| // Define your consistency check for read operations
24
| // and return a boolean. Depending on your migration,
25
| // this may be as simple as 'return a === b;'
26
| },
27
| 
28
| execution: new LDConcurrentExecution(),
29
| // or new LDSerialExecution(LDExecutionOrdering.Random),
30
| // or new LDSerialExecution(LDExecutionOrdering.Fixed),
31
| 
32
| latencyTracking: true, // defaults to true
33
| errorTracking: true, // defaults to true
34
| }
35
| 
36
| const client = ld.init('sdk-key-123abc');
37
| const migration = ld.createMigration(client, options);
```
To learn more, read [Migration configuration](/docs/sdk/features/migration-config).
### Reading and writing during the migration
As your migration proceeds, use the SDK’s migrator to call the read and write methods you defined. The migrator determines the migration stage of the feature flag controlling the migration, and performs reads and writes to the old and new systems based on the migration stage.
Here’s how:
Node.js (server-side) SDK v9
```
1
| const ld = require('@launchdarkly/node-server-sdk');
---|--- 
2
| 
3
| const context: ld.LDContext = {
4
| kind: 'user',
5
| key: 'user-key-123abc',
6
| name: 'Sandy',
7
| };
8
| 
9
| // this is the migration stage to use if the flag's migration stage
10
| // is not available from LaunchDarkly
11
| let defaultStage: ld.LDMigrationStage = LDMigrationStage.Off;
12
| 
13
| const migration = ld.createMigration(client, options);
14
| 
15
| // when you need to perform a read in your application
16
| migration.read(
17
| 'migration-flag-key-123abc',
18
| context,
19
| defaultStage
20
| );
21
| 
22
| // when you need to perform a write in your application
23
| migration.write(
24
| 'migration-flag-key-123abc',
25
| context,
26
| defaultStage
27
| );
```
To learn more, read [Migrations](/docs/sdk/features/migrations).
During the migration, you can check the consistency, errors, and latency as you manage your migration. This information is available in the “Migration insights” section of the flag’s **Targeting** tab. To learn more, read [Migration flags](/docs/home/flags/migration).
## Understanding changes to variation methods
Version 9.0 now includes type safe `variation` methods for use with TypeScript.
## Understanding what was removed
**Version 9.0 removes the deprecated`LDUser`**. Version 7 of the Node.js (server-side) SDK replaced users with contexts. Starting in version 9, the deprecated `LDUser` is removed.
Here’s how to construct a basic context, as compared with constructing a user:
Node.js SDK v6.x, user with keyNode.js SDK v7+, context with key (JavaScript)Node.js SDK v7+, context with key (TypeScript)
```
1
| const user = {
---|--- 
2
| key: 'user-key-123abc'
3
| };
```
And here’s how to evaluate a flag using a context:
Node.js SDK v7+
```
1
| client.variation('flag-key-123abc', context, false,
---|--- 
2
| (err, value) => {
3
| // check value and proceed accordingly
4
| });
```
To learn more about replacing users with contexts, read the [Node.js (server-side) SDK 6.x to 7.0 migration guide](/docs/sdk/server-side/node-js/migration-6-to-7) and [Best practices for upgrading users to contexts](/docs/guides/flags/upgrading-contexts).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs