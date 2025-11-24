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
This topic explains the changes in the Ruby SDK 8.0 release and how to migrate to that version.
**Version 8.0 includes breaking changes**. It is no longer possible to create a user; you can only create contexts. To learn more, read [Understanding what was removed](/docs/sdk/server-side/ruby/migration-7-to-8#understanding-what-was-removed). Additionally, if you use the Relay Proxy, you must update your Relay Proxy to version 8.0 before you update your SDK to version 8.0. To learn more, read the [Relay Proxy 8.0 release notes](https://github.com/launchdarkly/ld-relay/releases/tag/v8.0.0). To upgrade to the latest Relay Proxy version, visit [Relay Proxy releases](https://github.com/launchdarkly/ld-relay/releases) on GitHub.
Version 8.0 of the SDK also introduces the ability to manage migrations or modernizations. You might use this functionality if you are optimizing queries, upgrading to new tech stacks, migrating from one database to another, or other similar technology changes.
You will need this functionality to use migration flags. A migration flag is a temporary flag used to migrate data or systems while keeping your application available and disruption free. To learn more, read [Migration flags](/docs/home/flags/migration).
Before you migrate to version 8.0, we recommend updating to the latest 7.x version. If you update to the latest 7.x version, deprecation warnings appear in areas of your code that need to be changed for 8.0, for example, any use of `LDUser`. You can update these areas at your own pace while still using 7.x, rather than migrating everything simultaneously. To learn more about updating to the latest 7.x version, visit the [SDK’s GitHub repository](https://github.com/launchdarkly/ruby-server-sdk).
## Understanding how to manage a migration
Depending on how you created your migration feature flag, your migration will have two, four, or six stages. At each stage, you will be reading data from the old system, the new system, or both. You will also be writing data to the old system, the new system, or both. At each stage, only one of these destinations is considered the authoritative source. In the LaunchDarkly SDK, you can determine which stage of the migration your application is currently in, execute the appropriate read and write methods, and then compare the results to check correctness and view any errors or changes in latency.
To manage your migration:
 * [Configure the migration](/docs/sdk/server-side/ruby/migration-7-to-8#configuring-the-migration)
 * [Call the read and write methods you defined](/docs/sdk/server-side/ruby/migration-7-to-8#reading-and-writing-during-the-migration)
### Configuring the migration
There are two categories of migration options that you can configure for each LaunchDarkly SDK:
 * Options for reading and writing data: You can define how to read from and write to both the old system and the new system. You can also define a method to check whether the two reads are a match, and whether the migration should execute in serial or in parallel. To learn how these options apply to each migration stage, read [Use SDKs to manage a migration](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration).
 * Options for tracking metrics: You can configure whether the SDK should track latency and errors, so that you can monitor the performance of your application during the migration.
Here’s how:
Ruby SDK v8.0
```
1
| builder = LaunchDarkly::Migrations::MigratorBuilder.new(@client)
---|--- 
2
| builder.read(
3
| ->(_payload) { LaunchDarkly::Result.success('old value') },
4
| ->(_payload) { LaunchDarkly::Result.success('new value') },
5
| ->(lhs, rhs) { lhs == rhs }
6
| )
7
| builder.write(
8
| ->(_payload) { LaunchDarkly::Result.success('old value') },
9
| ->(_payload) { LaunchDarkly::Result.success('new value') }
10
| )
11
| builder.read_execution_order(builder.EXECUTION_PARALLEL) # or .EXECUTION_SERIAL, or .EXECUTION_RANDOM
12
| builder.track_latency(true) # defaults to true
13
| builder.track_errors(true) # defaults to true
14
| migrator = builder.build
```
To learn more, read [Migration configuration](/docs/sdk/features/migration-config).
### Reading and writing during the migration
As your migration proceeds, use the SDK’s migrator to call the read and write methods you defined. The migrator determines the migration stage of the feature flag controlling the migration, and performs reads and writes to the old and new systems based on the migration stage.
Here’s how:
Ruby SDK v8.0
```
1
| context = LaunchDarkly::LDContext.create({key: "user-key-123abc", kind:"user"})
---|--- 
2
| 
3
| # this is the migration stage to use if the flag's migration stage
4
| # is not available from LaunchDarkly
5
| default_stage = LaunchDarkly::Migrations::STAGE_OFF
6
| 
7
| read_result = migrator.read("migration-flag-key-123abc", context, default_stage, payload)
8
| 
9
| write_result = migrator.write("migration-flag-key-123abc", context, default_stage, payload)
```
To learn more, read [Migrations](/docs/sdk/features/migrations).
During the migration, you can check the consistency, errors, and latency as you manage your migration. This information is available in the “Migration insights” section of the flag’s **Targeting** tab. To learn more, read [Migration flags](/docs/home/flags/migration).
## Understanding what was removed
**Version 8.0 removes the ability to create users**. Version 7 of the Ruby SDK replaced users with contexts. Starting in version 8, you can only create contexts.
Here’s how to construct a basic context, as compared with constructing a user:
Ruby SDK v6.x, user with keyRuby SDK v7+, context with key
```
1
| user = {key: "user-key-123abc"}
---|--- 
```
And here’s how to evaluate a flag using a context:
Ruby SDK v7+
```
1
| value = client.variation("flag-key-123abc", context, false)
---|--- 
```
To learn more about replacing users with contexts, read the [Ruby SDK 6.x to 7.0 migration guide](/docs/sdk/server-side/ruby/migration-6-to-7) and [Best practices for upgrading users to contexts](/docs/guides/flags/upgrading-contexts).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs