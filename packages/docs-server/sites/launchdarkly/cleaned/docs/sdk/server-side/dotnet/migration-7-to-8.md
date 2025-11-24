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
 * [Understanding application metadata](#understanding-application-metadata)
 * [Understanding what was removed](#understanding-what-was-removed)
## Overview
This topic explains the changes in the .NET (server-side) SDK 8.0 release and how to migrate to that version.
**Version 8.0 includes breaking changes**. It removes the deprecated `LDUser`. To learn more, read [Understanding what was removed](/docs/sdk/server-side/dotnet/migration-7-to-8#understanding-what-was-removed). Additionally, if you use the Relay Proxy, you must update your Relay Proxy to version 8.0 before you update your SDK to version 8.0. To learn more, read the [Relay Proxy 8.0 release notes](https://github.com/launchdarkly/ld-relay/releases/tag/v8.0.0). To upgrade to the latest Relay Proxy version, visit [Relay Proxy releases](https://github.com/launchdarkly/ld-relay/releases) on GitHub.
Version 8.0 of the SDK introduces the ability to manage migrations or modernizations. You might use this functionality if you are optimizing queries, upgrading to new tech stacks, migrating from one database to another, or other similar technology changes.
You will need this functionality to use migration flags. A migration flag is a temporary flag used to migrate data or systems while keeping your application available and disruption free. To learn more, read [Migration flags](/docs/home/flags/migration).
Version 8.0 of the SDK also introduces the ability to configure the SDK to send application metadata to LaunchDarkly.
Before you migrate to version 8.0, we recommend updating to the latest 7.x version. If you update to the latest 7.x version, deprecation warnings appear in areas of your code that need to be changed for 8.0, for example, any use of `LDUser`. You can update these areas at your own pace while still using 7.x, rather than migrating everything simultaneously. To learn more about updating to the latest 7.x version, visit the [SDK’s GitHub repository](https://github.com/launchdarkly/dotnet-server-sdk).
## Understanding how to manage a migration
Depending on how you created your migration feature flag, your migration will have two, four, or six stages. At each stage, you will be reading data from the old system, the new system, or both. You will also be writing data to the old system, the new system, or both. At each stage, only one of these destinations is considered the authoritative source. In the LaunchDarkly SDK, you can determine which stage of the migration your application is currently in, execute the appropriate read and write methods, and then compare the results to check correctness and view any errors or changes in latency.
To manage your migration:
 * [Configure the migration](/docs/sdk/server-side/dotnet/migration-7-to-8#configuring-the-migration)
 * [Call the read and write methods you defined](/docs/sdk/server-side/dotnet/migration-7-to-8#reading-and-writing-during-the-migration)
### Configuring the migration
There are two categories of migration options that you can configure for each LaunchDarkly SDK:
 * Options for reading and writing data: You can define how to read from and write to both the old system and the new system. You can also define a method to check whether the two reads are a match, and whether the migration should execute serially or concurrently. To learn how these options apply to each migration stage, read [Use SDKs to manage a migration](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration).
 * Options for tracking metrics: You can configure whether the SDK should track latency and errors, so that you can monitor the performance of your application during the migration.
Here’s how:
.NET SDK v8.0 (C#)
```
1
| // define how to compare the two read values
---|--- 
2
| bool Checker(string a, string b) => a.Equals(b);
3
| 
4
| var migration = new MigrationBuilder<string, string, string, string>(_client)
5
| .Read(
6
| (payload) => MigrationMethod.Success("read old"),
7
| (payload) => MigrationMethod.Success("read new"),
8
| Checker)
9
| .Write(
10
| (payload) => MigrationMethod.Success("write old"),
11
| (payload) => MigrationMethod.Success("write new"))
12
| .ReadExecution(MigrationExecution.Parallel()) // or MigrationExecution.Serial(MigrationSerialOrder.Fixed)
13
| .TrackErrors(true) // true by default
14
| .TrackLatency(true) // true by default
15
| .Build();
```
To learn more, read [Migration configuration](/docs/sdk/features/migration-config).
### Reading and writing during the migration
As your migration proceeds, use the SDK’s migrator to call the read and write methods you defined. The migrator determines the migration stage of the feature flag controlling the migration, and performs reads and writes to the old and new systems based on the migration stage.
Here’s how:
.NET SDK v8.0 (C#)
```
1
| LDContext context = Context.Builder("context-key-123abc")
---|--- 
2
| .Build();
3
| 
4
| // this is the migration stage to use if the flag's migration stage
5
| // is not available from LaunchDarkly
6
| var defaultStage = MigrationStage.Off;
7
| 
8
| var readResult = migration.Read("migration-flag-key-123abc", context, defaultStage, payload);
9
| 
10
| var writeResult = migration.Write("migration-flag-key-123abc", context, defaultStage, payload);
```
To learn more, read [Migrations](/docs/sdk/features/migrations).
During the migration, you can check the consistency, errors, and latency as you manage your migration. This information is available in the “Migration insights” section of the flag’s **Targeting** tab. To learn more, read [Migration flags](/docs/home/flags/migration).
## Understanding application metadata
Version 8.0 introduces the ability to configure the .NET (server-side) SDK to send application metadata to LaunchDarkly. The SDK now supports configuration options for specifying application information, including application identifier and version. When you configure these options, the SDK automatically sends this application information to LaunchDarkly.
In the LaunchDarkly user interface (UI), the application information appears in the “From source” field on Context details pages. To learn more, read [The context details page](/docs/home/flags/context-details).
You can set these values when you configure the SDK. All connections to LaunchDarkly from a client will send the same value to LaunchDarkly, whether the connection is through streaming, polling, or events. You cannot change the value after you configure the client.
Here’s how:
.NET SDK v8 (C#)
```
1
| var config = Configuration.Builder("sdk-key-123abc")
---|--- 
2
| .ApplicationInfo(Components.ApplicationInfo()
3
| .ApplicationID("authentication-service")
4
| .ApplicationName("Authentication-Service")
5
| .ApplicationVersion("1.0.0")
6
| .ApplicationVersionName("v1")
7
| )
8
| .Build();
9
| 
10
| var client = new LdClient(config);
```
To learn more, read [Application metadata configuration](/docs/sdk/features/app-config).
## Understanding what was removed
**Version 8.0 removes the deprecated`LDUser`**. Version 7 of the .NET (server-side) SDK replaced users with contexts. Starting in version 8, the deprecated `LDUser` is removed.
Here’s how to construct a basic context, as compared with constructing a user:
.NET SDK v6.x, user with key.NET SDK v7+, context with key
```
1
| var user1 = User.WithKey("user-key-123abc");
---|--- 
```
And here’s how to evaluate a flag using a context:
.NET SDK v7+
```
1
| var value = client.BoolVariation("flag-key-123abc", context, false);
---|--- 
```
To learn more about replacing users with contexts, read the [.NET (server-side) SDK 6.x to 7.0 migration guide](/docs/sdk/server-side/dotnet/migration-6-to-7) and [Best practices for upgrading users to contexts](/docs/guides/flags/upgrading-contexts).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs