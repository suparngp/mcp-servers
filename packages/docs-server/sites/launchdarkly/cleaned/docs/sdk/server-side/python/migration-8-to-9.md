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
This topic explains the changes in the Python SDK 9.0 release and how to migrate to that version.
**Version 9.0 includes breaking changes**. It is no longer possible to create a user; you can only create contexts. To learn more, read [Understanding what was removed](/docs/sdk/server-side/python/migration-8-to-9#understanding-what-was-removed). Additionally, if you use the Relay Proxy, you must update your Relay Proxy to version 8.0 before you update your SDK to version 9.0. To learn more, read the [Relay Proxy 8.0 release notes](https://github.com/launchdarkly/ld-relay/releases/tag/v8.0.0). To upgrade to the latest Relay Proxy version, visit [Relay Proxy releases](https://github.com/launchdarkly/ld-relay/releases) on GitHub.
The Python SDK version 9.0 now only supports Python version 3.8.0 and higher. Previous Python SDKs included support for Python 3.7.
Version 9.0 also introduces the ability to manage migrations or modernizations. You might use this functionality if you are optimizing queries, upgrading to new tech stacks, migrating from one database to another, or other similar technology changes.
You will need this functionality to use migration flags. A migration flag is a temporary flag used to migrate data or systems while keeping your application available and disruption free. To learn more, read [Migration flags](/docs/home/flags/migration).
Before you migrate to version 9.0, we recommend updating to the latest 8.x version. If you update to the latest 8.x version, deprecation warnings appear in areas of your code that need to be changed for 9.0, for example, any use of `LDUser`. You can update these areas at your own pace while still using 8.x, rather than migrating everything simultaneously. To learn more about updating to the latest 8.x version, visit the [SDK’s GitHub repository](https://github.com/launchdarkly/python-server-sdk).
## Understanding how to manage a migration
Depending on how you created your migration feature flag, your migration will have two, four, or six stages. At each stage, you will be reading data from the old system, the new system, or both. You will also be writing data to the old system, the new system, or both. At each stage, only one of these destinations is considered the authoritative source. In the LaunchDarkly SDK, you can determine which stage of the migration your application is currently in, execute the appropriate read and write methods, and then compare the results to check correctness and view any errors or changes in latency.
To manage your migration:
 * [Configure the migration](/docs/sdk/server-side/python/migration-8-to-9#configuring-the-migration)
 * [Call the read and write methods you defined](/docs/sdk/server-side/python/migration-8-to-9#reading-and-writing-during-the-migration)
### Configuring the migration
There are two categories of migration options that you can configure for each LaunchDarkly SDK:
 * Options for reading and writing data: You can define how to read from and write to both the old system and the new system. You can also define a method to check whether the two reads are a match, and whether the migration should execute serially or concurrently. To learn how these options apply to each migration stage, read [Use SDKs to manage a migration](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration).
 * Options for tracking metrics: You can configure whether the SDK should track latency and errors, so that you can monitor the performance of your application during the migration.
Here’s how:
Python SDK v9
```
1
| from ldclient import Result, MigratorBuilder, ExecutionOrder
---|--- 
2
| 
3
| builder = MigratorBuilder(ldclient.get())
4
| 
5
| builder.read(lambda _: Result.success("read old"), lambda _: Result.success("read new"), lambda lhs, rhs: lhs == rhs)
6
| builder.write(lambda _: Result.success("write old"), lambda _: Result.success("write new"))
7
| 
8
| builder.read_execution_order(ExecutionOrder.PARALLEL)
9
| # could also use ExecutionOrder.SERIAL, ExecutionOrder.RANDOM
10
| 
11
| builder.track_latency(True) # defaults to True
12
| builder.track_errors(True) # defaults to True
13
| 
14
| result = builder.build()
```
To learn more, read [Migration configuration](/docs/sdk/features/migration-config).
### Reading and writing during the migration
As your migration proceeds, use the SDK’s migrator to call the read and write methods you defined. The migrator determines the migration stage of the feature flag controlling the migration, and performs reads and writes to the old and new systems based on the migration stage.
Here’s how:
Python SDK v9
```
1
| from ldclient import Context
---|--- 
2
| from ldclient.migrations import Stage
3
| 
4
| context = Context.builder("context-key-123abc").build()
5
| 
6
| 
7
| # this is the migration stage to use if the flag's migration stage
8
| # is not available from LaunchDarkly
9
| default_stage = Stage.OFF
10
| 
11
| migrator = builder.build()
12
| 
13
| # when you need to perform a read in your application
14
| migrator.read(
15
| 'migration-flag-key-123abc',
16
| context,
17
| default_stage
18
| )
19
| 
20
| # when you need to perform a write in your application
21
| migrator.write(
22
| 'migration-flag-key-123abc',
23
| context,
24
| default_stage
25
| )
```
To learn more, read [Migrations](/docs/sdk/features/migrations).
During the migration, you can check the consistency, errors, and latency as you manage your migration. This information is available in the “Migration insights” section of the flag’s **Targeting** tab. To learn more, read [Migration flags](/docs/home/flags/migration).
## Understanding what was removed
**Version 9.0 removes the ability to create users**. Version 8 of the Python SDK replaced users with contexts. Starting in version 9, you can only create contexts.
Additionally, in version 8 of the Python SDK, some `Context` methods took either a `Context` or a `dict`. In version 9, these methods only accept a `Context`.
Here’s how to construct a basic context, as compared with constructing a user:
Python SDK v7.x, user with keyPython SDK v8+, context with key
```
1
| user = {"key": "user-key-123abc"}
---|--- 
```
And here’s how to evaluate a flag using a context:
Python SDK v8+
```
1
| flag_value = client.variation("flag-key-123abc", context, False)
---|--- 
```
To learn more about replacing users with contexts, read the [Python SDK 7.x to 8.0 migration guide](/docs/sdk/server-side/python/migration-7-to-8) and [Best practices for upgrading users to contexts](/docs/guides/flags/upgrading-contexts).
For a complete list of removed and deprecated options, read the [9.0.0 Release Notes](https://github.com/launchdarkly/python-server-sdk/releases/tag/9.0.0).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs