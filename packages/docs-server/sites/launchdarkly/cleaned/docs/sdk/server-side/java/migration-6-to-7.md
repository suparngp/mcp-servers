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
 * [Understanding what was removed](#understanding-what-was-removed)
## Overview
This topic explains the changes in the Java SDK 7.0 release and how to migrate to that version.
**Version 7.0 includes breaking changes**. It removes the deprecated `LDUser`. To learn more, read [Understanding what was removed](/docs/sdk/server-side/java/migration-6-to-7#understanding-what-was-removed). Additionally, if you use the Relay Proxy, you must update your Relay Proxy to version 8.0 before you update your SDK to version 7.0. To learn more, read the [Relay Proxy 8.0 release notes](https://github.com/launchdarkly/ld-relay/releases/tag/v8.0.0). To upgrade to the latest Relay Proxy version, visit [Relay Proxy releases](https://github.com/launchdarkly/ld-relay/releases) on GitHub.
Version 7.0 also introduces the ability to manage migrations or modernizations. You might use this functionality if you are optimizing queries, upgrading to new tech stacks, migrating from one database to another, or other similar technology changes.
You will need this functionality to use migration flags. A migration flag is a temporary flag used to migrate data or systems while keeping your application available and disruption free. To learn more, read [Migration flags](/docs/home/flags/migration).
Before you migrate to version 7.0, we recommend updating to the latest 6.x version. If you update to the latest 6.x version, deprecation warnings appear in areas of your code that need to be changed for 7.0, for example, any use of `LDUser`. You can update these areas at your own pace while still using 6.x, rather than migrating everything simultaneously. To learn more about updating to the latest 6.x version, visit the [SDK’s GitHub repository](https://github.com/launchdarkly/java-server-sdk).
## Understanding how to manage a migration
Depending on how you created your migration feature flag, your migration will have two, four, or six stages. At each stage, you will be reading data from the old system, the new system, or both. You will also be writing data to the old system, the new system, or both. At each stage, only one of these destinations is considered the authoritative source. In the LaunchDarkly SDK, you can determine which stage of the migration your application is currently in, execute the appropriate read and write methods, and then compare the results to check correctness and view any errors or changes in latency.
To manage your migration:
 * [Configure the migration](/docs/sdk/server-side/java/migration-6-to-7#configuring-the-migration)
 * [Call the read and write methods you defined](/docs/sdk/server-side/java/migration-6-to-7#reading-and-writing-during-the-migration)
### Configuring the migration
There are two categories of migration options that you can configure for each LaunchDarkly SDK:
 * Options for reading and writing data: You can define how to read from and write to both the old system and the new system. You can also define a method to check whether the two reads are a match, and whether the migration should execute serially or concurrently. To learn how these options apply to each migration stage, read [Use SDKs to manage a migration](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration).
 * Options for tracking metrics: You can configure whether the SDK should track latency and errors, so that you can monitor the performance of your application during the migration.
Here’s how:
Java SDK v7.0
```
1
| LDClient client = new LDClient("sdk-key-123abc");
---|--- 
2
| 
3
| MigrationBuilder<String, String, String, String> migrationBuilder = new MigrationBuilder<>(client)
4
| .read(
5
| (payload) -> MigrationMethodResult.Success("read old"),
6
| (payload) -> MigrationMethodResult.Success("read new"),
7
| (a, b) -> a.equals(b)
8
| )
9
| .readExecution(MigrationExecution.Serial(MigrationSerialOrder.RANDOM)) // default is .Parallel
10
| .write(
11
| (payload) -> MigrationMethodResult.Success("write old"),
12
| (payload) -> MigrationMethodResult.Success("write new")
13
| )
14
| .trackLatency(true)
15
| .trackErrors(true)
16
| .build();
17
| 
18
| Migration<String, String, String, String> migration = migrationBuilder.build();
```
To learn more, read [Migration configuration](/docs/sdk/features/migration-config).
### Reading and writing during the migration
As your migration proceeds, use the SDK’s migrator to call the read and write methods you defined. The migrator determines the migration stage of the feature flag controlling the migration, and performs reads and writes to the old and new systems based on the migration stage.
Here’s how:
Java SDK v7.0
```
1
| LDContext context = LDContext.builder("context-key-123abc")
---|--- 
2
| .build();
3
| 
4
| // this is the migration stage to use if the flag's migration stage
5
| // is not available from LaunchDarkly
6
| MigrationStage defaultStage = MigrationStage.OFF;
7
| 
8
| Migration.MigrationResult<String> readResult = migration.read("migration-flag-key-123abc", context, defaultStage);
9
| 
10
| Migration.MigrationWriteResult<String> writeResult = migration.write("migration-flag-key-123abc", context, defaultStage);
```
To learn more, read [Migrations](/docs/sdk/features/migrations).
During the migration, you can check the consistency, errors, and latency as you manage your migration. This information is available in the “Migration insights” section of the flag’s **Targeting** tab. To learn more, read [Migration flags](/docs/home/flags/migration).
## Understanding what was removed
**Version 7.0 removes the deprecated`LDUser`**. Version 6 of the Java SDK replaced users with contexts. Starting in version 7, the deprecated `LDUser` is removed.
Here’s how to construct a basic context, as compared with constructing a user:
Java SDK v5.x, user with keyJava SDK v6+, context with key
```
1
| LDUser user = new LDUser("user-key-123abc");
---|--- 
```
And here’s how to evaluate a flag using a context:
Java SDK v6+
```
1
| boolean value = client.boolVariation("flag-key-123abc", context, false);
---|--- 
```
To learn more about replacing users with contexts, read the [Java SDK 5.x to 6.0 migration guide](/docs/sdk/server-side/java/migration-5-to-6) and [Best practices for upgrading users to contexts](/docs/guides/flags/upgrading-contexts).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs