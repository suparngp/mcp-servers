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
## Overview
This topic explains the changes in the Go SDK 7.0 release and how to migrate to that version.
**Version 7.0 has no breaking changes**. However, if you use the Relay Proxy, you must update your Relay Proxy to version 8.0 before you update your SDK to version 7.0. To learn more, read the [Relay Proxy 8.0 release notes](https://github.com/launchdarkly/ld-relay/releases/tag/v8.0.0). To upgrade to the latest Relay Proxy version, visit [Relay Proxy releases](https://github.com/launchdarkly/ld-relay/releases) on GitHub.
Version 7.0 introduces the ability to manage migrations or modernizations. You might use this functionality if you are optimizing queries, upgrading to new tech stacks, migrating from one database to another, or other similar technology changes.
You will need this functionality to use migration flags. A migration flag is a temporary flag used to migrate data or systems while keeping your application available and disruption free. To learn more, read [Migration flags](/docs/home/flags/migration).
Before you migrate to version 7.0, we recommend updating to the latest 6.x version. If you update to the latest 6.x version, deprecation warnings appear in areas of your code that need to be changed for 7.0. You can update these areas at your own pace while still using 6.x, rather than migrating everything simultaneously. To learn more about updating to the latest 6.x version, visit the [SDK’s GitHub repository](https://github.com/launchdarkly/go-server-sdk).
## Understanding how to manage a migration
Depending on how you created your migration feature flag, your migration will have two, four, or six stages. At each stage, you will be reading data from the old system, the new system, or both. You will also be writing data to the old system, the new system, or both. At each stage, only one of these destinations is considered the authoritative source. In the LaunchDarkly SDK, you can determine which stage of the migration your application is currently in, execute the appropriate read and write methods, and then compare the results to check correctness and view any errors or changes in latency.
To manage your migration:
 * [Configure the migration](/docs/sdk/server-side/go/migration-6-to-7#configuring-the-migration)
 * [Call the read and write methods you defined](/docs/sdk/server-side/go/migration-6-to-7#reading-and-writing-during-the-migration)
### Configuring the migration
There are two categories of migration options that you can configure for each LaunchDarkly SDK:
 * Options for reading and writing data: You can define how to read from and write to both the old system and the new system. You can also define a method to check whether the two reads are a match, and whether the migration should execute serially or concurrently. To learn how these options apply to each migration stage, read [Use SDKs to manage a migration](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration).
 * Options for tracking metrics: You can configure whether the SDK should track latency and errors, so that you can monitor the performance of your application during the migration.
Here’s how:
Go SDK v7.0
```
1
| client, _ := ld.MakeClient("sdk-key-123abc", 5*time.Second)
---|--- 
2
| 
3
| var comparison ld.MigrationComparisonFn
4
| comparison = func(interface{}, interface{}) bool {
5
| // compare the two read values
6
| return true
7
| }
8
| 
9
| migrator, err := ld.Migration(client).
10
| Read(
11
| func(interface{}) (interface{}, error) {
12
| return "old read", nil
13
| },
14
| func(interface{}) (interface{}, error) {
15
| return "new read", nil
16
| },
17
| &comparison,
18
| ).
19
| ReadExecutionOrder(ldmigration.Random).
20
| Write(
21
| func(interface{}) (interface{}, error) {
22
| return "old write result", nil
23
| },
24
| func(interface{}) (interface{}, error) {
25
| return "new write result", nil
26
| },
27
| ).
28
| TrackLatency(true).
29
| TrackErrors(true).
30
| Build()
```
To learn more, read [Migration configuration](/docs/sdk/features/migration-config).
### Reading and writing during the migration
As your migration proceeds, use the SDK’s migrator to call the read and write methods you defined. The migrator determines the migration stage of the feature flag controlling the migration, and performs reads and writes to the old and new systems based on the migration stage.
Here’s how:
Go SDK v7.0
```
1
| context := ldcontext.New("context-key-123abc")
---|--- 
2
| 
3
| // this is the migration stage to use if the flag's migration stage
4
| // is not available from LaunchDarkly
5
| defaultStage := ldmigration.Off
6
| 
7
| readResult := migrator.Read("migration-flag-key-123abc", context, defaultStage, nil)
8
| 
9
| writeResult := migrator.Write("migration-flag-key-123abc", context, defaultStage, nil)
```
To learn more, read [Migrations](/docs/sdk/features/migrations).
During the migration, you can check the consistency, errors, and latency as you manage your migration. This information is available in the “Migration insights” section of the flag’s **Targeting** tab. To learn more, read [Migration flags](/docs/home/flags/migration).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs