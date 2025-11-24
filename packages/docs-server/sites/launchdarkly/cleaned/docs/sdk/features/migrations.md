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
 * [Prerequisites](#prerequisites)
 * [Use SDKs to manage a migration](#use-sdks-to-manage-a-migration)
 * [Customize your migration](#customize-your-migration)
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [Customizing your migration](#customizing-your-migration)
 * [Go](#go)
 * [Customizing your migration](#customizing-your-migration-1)
 * [Java](#java)
 * [Customizing your migration](#customizing-your-migration-2)
 * [Node.js (server-side)](#nodejs-server-side)
 * [Customizing your migration](#customizing-your-migration-3)
 * [PHP](#php)
 * [Customizing your migration](#customizing-your-migration-4)
 * [Python](#python)
 * [Customizing your migration](#customizing-your-migration-5)
 * [Ruby](#ruby)
 * [Customizing your migration](#customizing-your-migration-6)
 * [Rust](#rust)
 * [Customizing your migration](#customizing-your-migration-7)
 * [Edge SDKs](#edge-sdks)
 * [Akamai](#akamai)
 * [Customizing your migration](#customizing-your-migration-8)
 * [Cloudflare](#cloudflare)
 * [Customizing your migration](#customizing-your-migration-9)
 * [Vercel](#vercel)
 * [Customizing your migration](#customizing-your-migration-10)
## Overview
This topic explains how to use LaunchDarkly SDKs to manage migrations or modernizations. You might use this feature if you are optimizing queries, upgrading to new tech stacks, migrating from one database to another, or other similar technology changes. This feature is available for server-side and edge SDKs only.
## Prerequisites
Before you configure your SDK to manage a migration, you must complete the following prerequisites:
 * Create a migration feature flag. This is a temporary flag used to migrate data or systems while keeping your application available and disruption free. Migration flags break up the switch from an old to a new implementation into a series of recommended stages where movement from one stage to the next is done in incremental steps.
 * Determine how many stages your migration will have. You can select from the following options as part of creating a migration feature flag:
 * Two stages: For migrations where you cannot run the new system and old system at the same time
 * Four stages: For migrations that can run both the new and old systems at the same time
 * Six stages: For migrations where you need to migrate `READS` and `WRITES` separately
To learn more, read [Migration flags](/docs/home/flags/migration).
## Use SDKs to manage a migration
Depending on how you created your migration feature flag, your migration will have two, four, or six stages. At each stage, you will be reading data from the old destination, the new destination, or both. You will also be writing data to the old destination, the new destination, or both. At each stage, only one of these destinations is considered the authoritative source. In the LaunchDarkly SDK, you can determine which stage of the migration your application is currently in, execute the appropriate read and write methods, and then compare the results to check correctness and view any errors or changes in latency.
The following table describes the stages and which destination is authoritative. Remember that not all migrations will use all stages.
Stage | Read from | Write to | Authoritative 
---|---|---|--- 
off | old | old | old 
dualwrite | old | old, new | old 
shadow | both | old, new | old 
live | both | new, old | new 
rampdown | new | new, old | new 
complete | new | new | new 
To manage your migration:
 1. Configure the migration. In your SDK configuration, define how to read from and write to the old and new systems, how to check whether two reads are a match, and whether to track errors and latency metrics. To learn more, read [Migration configuration](/docs/sdk/features/migration-config).
 2. Call the read and write methods you defined, using the SDK’s migrator. The migrator determines the migration stage of the feature flag controlling the migration, and performs reads and writes to the old and new systems based on the migration stage.
For details of how to perform each step, read [Server-side SDKs](/docs/sdk/features/migrations#server-side-sdks) or [Edge SDKs](/docs/sdk/features/migrations#edge-sdks), below.
During the migration, you can check the consistency, errors, and latency as you manage your migration. This information is available from the flag’s **Targeting** tab. To learn more, read [Migration flags](/docs/home/flags/migration).
### Customize your migration
Customizing your migration is rare. If you have additional metrics that you want to track, or if your migration or modernization involves reading and writing from the new and old systems in a different configuration than the two, four, or six -stage migrations provided, you can also use the SDK to customize your migration.
Here’s how:
 1. Configure the migration. In your SDK configuration, define how to read from and write to the old and new systems, how to check whether two reads are a match, and whether to track errors and latency metrics. To learn more, read [Migration configuration](/docs/sdk/features/migration-config).
 2. Use the `migrationVariation` method to evaluate your feature flag and determine the migration stage.
 3. Use your own logic to perform the appropriate migration operations for the stage. Record any metrics that you are interested in.
 4. When the migration operation is complete, call the `trackMigration` method to record your metrics.
For details of how to perform each step, read [Server-side SDKs](/docs/sdk/features/migrations#server-side-sdks) or [Edge SDKs](/docs/sdk/features/migrations#edge-sdks), below.
## Server-side SDKs
This feature is available in the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/migrations#net-server-side)
 * [Go](/docs/sdk/features/migrations#go)
 * [Java](/docs/sdk/features/migrations#java)
 * [Node.js (server-side)](/docs/sdk/features/migrations#nodejs-server-side)
 * [PHP](/docs/sdk/features/migrations#php)
 * [Python](/docs/sdk/features/migrations#python)
 * [Ruby](/docs/sdk/features/migrations#ruby)
 * [Rust](/docs/sdk/features/migrations#rust)
### .NET (server-side)
###### Expand .NET (server-side) code sample
To manage your migration, first you need to define how to read from and write to the old and new systems, how to check whether two reads are a match, and whether to track errors and latency metrics. To learn more, read [Migration configuration](/docs/sdk/features/migration-config#net-server-side).
Then, whenever you need to perform a read or write in the systems that you are modernizing or migrating, call `Read` or `Write`. The SDK evaluates the flag, determines which migration stage the flag is in, and performs the reads or writes in the [appropriate system](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration).
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
To learn more, read [`Read`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Migrations.IMigration-4.html#LaunchDarkly_Sdk_Server_Migrations_IMigration_4_Read_System_String_LaunchDarkly_Sdk_Context_LaunchDarkly_Sdk_Server_Migrations_MigrationStage_) and [`Write`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Migrations.IMigration-4.html#LaunchDarkly_Sdk_Server_Migrations_IMigration_4_Write_System_String_LaunchDarkly_Sdk_Context_LaunchDarkly_Sdk_Server_Migrations_MigrationStage_).
You can check for consistency, errors, or latency under “Migration insights” on the **Targeting** tab of your migration flag in the LaunchDarkly user interface. To learn more, read [Migration flags](/docs/home/flags/migration).
###### Expand Customizing your migration
#### Customizing your migration
Customizing your migration is rare. If you want to customize your migration, [configure your migration information](/docs/sdk/features/migration-config#net-server-side) as before.
Then, use the `MigrationVariation` method to evaluate your feature flag and determine its migration stage. This method returns the migration stage and a tracker that you can use to build the analytics event to send back to LaunchDarkly.
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
| var (stage, tracker) = client.MigrationVariation("migration-flag-key-123abc", context, MigrationStage.Off);
```
Next, perform the migration for the appropriate stage. At each stage, the migration may involve reading or writing from one or both systems. You must define the behavior for each stage. To learn more about how LaunchDarkly defines the stages, read [Use SDKs to manage a migration](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration), above.
The structure looks like this:
.NET SDK v8.0 (C#)
```
1
| // define the combination of reads and writes from the new and old systems
---|--- 
2
| // that should occur at each migration stage
3
| 
4
| switch (stage)
5
| {
6
| case MigrationStage.Off:
7
| case MigrationStage.DualWrite:
8
| case MigrationStage.Shadow:
9
| case MigrationStage.Live:
10
| case MigrationStage.RampDown:
11
| case MigrationStage.Complete:
12
| default:
13
| // throw an error
14
| }
```
Finally, when the migration operation is complete, call the `TrackMigration` method to record your metrics:
.NET SDK v8.0 (C#)
```
1
| client.TrackMigration(tracker);
---|--- 
```
To learn more, read [`IMigration`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Migrations.IMigration-4.html), [`MigrationVariation`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Migrations.IMigration-4.html#LaunchDarkly_Sdk_Server_Migrations_IMigration_4_Write_System_String_LaunchDarkly_Sdk_Context_LaunchDarkly_Sdk_Server_Migrations_MigrationStage_), and [`TrackMigration`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.LdClient.html#LaunchDarkly_Sdk_Server_LdClient_TrackMigration_LaunchDarkly_Sdk_Server_Migrations_MigrationOpTracker_).
### Go
###### Expand Go code sample
To manage your migration, first you need to define how to read from and write to the old and new systems, how to check whether two reads are a match, and whether to track errors and latency metrics. To learn more, read [Migration configuration](/docs/sdk/features/migration-config#go).
Then, whenever you need to perform a read or write in the systems that you are modernizing or migrating, call `Read` or `Write`. The SDK evaluates the flag, determines which migration stage the flag is in, and performs the reads or writes in the [appropriate system](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration).
Here’s how:
Go SDK v7.13.4+, using LDScopedClientGo SDK v7+, using LDClient
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
| // There is not an AllFlagsState method in the LDScopedClient.
8
| // If you are using scoped clients, pass in the scoped client's current context
9
| // LDScopedClient is in beta and may change without notice.
10
| 
11
| readResult := migrator.Read("migration-flag-key-123abc", scopedClient.CurrentContext(), defaultStage, nil)
12
| 
13
| writeResult := migrator.Write("migration-flag-key-123abc", scopedClient.CurrentContext(), defaultStage, nil)
```
To learn more, read [`Read`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#MigratorBuilder.Read) and [`Write`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#MigratorBuilder.Write).
You can check for consistency, errors, or latency under “Migration insights” on the **Targeting** tab of your migration flag in the LaunchDarkly user interface. To learn more, read [Migration flags](/docs/home/flags/migration).
###### Expand Customizing your migration
#### Customizing your migration
Customizing your migration is rare. If you want to customize your migration, [configure your migration information](/docs/sdk/features/migration-config#go) as before.
Then, use the `MigrationVariation` method to evaluate your feature flag and determine its migration stage. This method returns the migration stage, a tracker that you can use to build the analytics event to send back to LaunchDarkly, and an error.
Here’s how:
Go SDK v7.13.4+, using LDScopedClientGo SDK v7+, using LDClient
```
1
| context := ldcontext.New("context-key-123abc")
---|--- 
2
| scopedClient := ld.NewScopedClient(client, context)
3
| // LDScopedClient is in beta and may change without notice.
4
| 
5
| stage, tracker, err := scopedClient.MigrationVariation("migration-flag-key-123abc", ldmigration.Off)
```
Next, perform the migration for the appropriate stage. At each stage, the migration may involve reading or writing from one or both systems. You must define the behavior for each stage. To learn more about how LaunchDarkly defines the stages, read [Use SDKs to manage a migration](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration), above.
The structure looks like this:
Go SDK v7+
```
1
| // define the combination of reads and writes from the new and old systems
---|--- 
2
| // that should occur at each migration stage
3
| 
4
| switch stage {
5
| case ldmigration.Off:
6
| case ldmigration.DualWrite:
7
| case ldmigration.Shadow:
8
| case ldmigration.Live:
9
| case ldmigration.RampDown:
10
| case ldmigration.Complete:
11
| default: {
12
| // throw an error
13
| }
14
| }
```
Finally, when the migration operation is complete, call the `TrackMigrationOp` method to record your metrics:
Go SDK v7.13.4+, using LDScopedClientGo SDK v7+, using LDClient
```
1
| event, _ := tracker.Build();
---|--- 
2
| 
3
| err := scopedClient.TrackMigrationOp(*event);
4
| // LDScopedClient is in beta and may change without notice.
```
To learn more, read [`Migration`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#Migration) and [`TrackMigrationOp`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDScopedClient.TrackMigrationOp).
### Java
###### Expand Java code sample
To manage your migration, first you need to define how to read from and write to the old and new systems, how to check whether two reads are a match, and whether to track errors and latency metrics. To learn more, read [Migration configuration](/docs/sdk/features/migration-config#java).
Then, whenever you need to perform a read or write in the systems that you are modernizing or migrating, call `read` or `write`. The SDK evaluates the flag, determines which migration stage the flag is in, and performs the reads or writes in the [appropriate system](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration).
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
To learn more, read [`Migration`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/migrations/Migration.html).
You can check for consistency, errors, or latency under “Migration insights” on the **Targeting** tab of your migration flag in the LaunchDarkly user interface. To learn more, read [Migration flags](/docs/home/flags/migration).
###### Expand Customizing your migration
#### Customizing your migration
Customizing your migration is rare. If you want to customize your migration, [configure your migration information](/docs/sdk/features/migration-config#java) as before.
Then, use the `migrationVariation` method to evaluate your feature flag and determine its migration stage. This method returns the migration stage, a tracker that you can use to build the analytics event to send back to LaunchDarkly, and an error.
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
| MigrationVariation migrationVariation = client.migrationVariation("migration-flag-key-123abc", context, MigrationStage.OFF);
```
Next, perform the migration for the appropriate stage. At each stage, the migration may involve reading or writing from one or both systems. You must define the behavior for each stage. To learn more about how LaunchDarkly defines the stages, read [Use SDKs to manage a migration](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration), above.
The structure looks like this:
Java SDK v7.0
```
1
| // define the combination of reads and writes from the new and old systems
---|--- 
2
| // that should occur at each migration stage
3
| 
4
| switch (migrationVariation.getStage()) {
5
| case OFF:
6
| case DUAL_WRITE:
7
| case SHADOW:
8
| case LIVE:
9
| case RAMP_DOWN:
10
| case COMPLETE:
11
| default: {
12
| // throw an error
13
| }
14
| }
```
Finally, when the migration operation is complete, call the `trackMigration` method to record your metrics:
Java SDK v7.0
```
1
| MigrationOpTracker tracker = migrationVariation.getTracker();
---|--- 
2
| 
3
| client.trackMigration(tracker);
```
To learn more, read [`migrationVariation`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDClient.html#migrationVariation-java.lang.String-com.launchdarkly.sdk.LDContext-com.launchdarkly.sdk.server.MigrationStage-) and [`trackMigration`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDClient.html#trackMigration-com.launchdarkly.sdk.server.MigrationOpTracker-).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
To manage your migration, first you need to define how to read from and write to the old and new systems, how to check whether two reads are a match, and whether to track errors and latency metrics. To learn more, read [Migration configuration](/docs/sdk/features/migration-config#nodejs-server-side).
Then, whenever you need to perform a read or write in the systems that you are modernizing or migrating, call the `read` or `write` methods from the `LDMigration` interface. The SDK evaluates the flag, determines which migration stage the flag is in, and performs the reads or writes in the [appropriate system](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration).
Here’s how:
Node.js (server-side) SDK v9
```
1
| import { LDContext, LD MigrationState, createMigration } from '@launchdarkly/node-server-sdk';
---|--- 
2
| 
3
| const context: LDContext = {
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
| let defaultStage: LDMigrationStage = LDMigrationStage.Off;
12
| 
13
| const migration = createMigration(client, options);
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
To learn more, read [`LDMigration`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/LDMigration.html).
You can check for consistency, errors, or latency under “Migration insights” on the **Targeting** tab of your migration flag in the LaunchDarkly user interface. To learn more, read [Migration flags](/docs/home/flags/migration).
###### Expand Customizing your migration
#### Customizing your migration
Customizing your migration is rare. If you want to customize your migration, [configure your migration information](/docs/sdk/features/migration-config#nodejs-server-side) as before.
Then, use the `migrationVariation` method to evaluate your feature flag and determine its migration stage. This method returns a promise that is resolved with the result `LDMigrationVariation`. This result includes the migration stage and a tracker that you can use to build the analytics event to send back to LaunchDarkly.
Here’s how:
Node.js (server-side) SDK v9
```
1
| import { LDContext } from '@launchdarkly/node-server-sdk');
---|--- 
2
| 
3
| const context: LDContext = {
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
| const { value, tracker } = await client.migrationVariation(
10
| 'migration-flag-key-123abc',
11
| context,
12
| false
13
| );
```
Next, perform the migration for the appropriate stage. At each stage, the migration may involve reading or writing from one or both systems. You must define the behavior for each stage. To learn more about how LaunchDarkly defines the stages, read [Use SDKs to manage a migration](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration), above.
The structure looks like this:
Node.js (server-side) SDK v9
```
1
| // define the combination of reads and writes from the new and old systems
---|--- 
2
| // that should occur at each migration stage
3
| 
4
| switch (value) {
5
| case LDMigrationStage.Off: { },
6
| case LDMigrationStage.DualWrite: { },
7
| case LDMigrationStage.Shadow: { },
8
| case LDMigrationStage.Live: { },
9
| case LDMigrationStage.RampDown: { },
10
| case LDMigrationStage.Complete: { },
11
| default: {
12
| // throw an error
13
| }
14
| }
```
Finally, when the migration operation is complete, call the `trackMigration` method to record your metrics:
Node.js (server-side) SDK v9
```
1
| const event = tracker.createEvent();
---|--- 
2
| 
3
| if (event) {
4
| client.trackMigration(event);
5
| }
```
To learn more, read [`LDMigration`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/LDMigration.html). and [`LDMigrationOpEvent`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/LDMigrationOpEvent.html).
### PHP
###### Expand PHP code sample
To manage your migration, first you need to define how to read from and write to the old and new systems, how to check whether two reads are a match, and whether to track errors and latency metrics. To learn more, read [Migration configuration](/docs/sdk/features/migration-config#php).
Then, whenever you need to perform a read or write in the systems that you are modernizing or migrating, call the `read` or `write` methods from the `Migrator` interface. The SDK evaluates the flag, determines which migration stage the flag is in, and performs the reads or writes in the [appropriate system](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration).
Here’s how:
PHP SDK v6
```
1
| $context = LaunchDarkly\LDContext::builder("context-key-123abc")->build();
---|--- 
2
| 
3
| // this is the migration stage to use if the flag's migration stage
4
| // is not available from LaunchDarkly
5
| $defaultStage = Migrations\Stage::OFF;
6
| 
7
| $result = $builder->build();
8
| if (!$result->isSuccessful()) {
9
| throw new \Exception($result->error);
10
| }
11
| 
12
| $migrator = $result->value;
13
| 
14
| // if you need to pass additional information from the call site
15
| // to your read/write methods, use a mixed type payload
16
| $payload = ['index' => 'useful information'];
17
| 
18
| // when you need to perform a read in your application
19
| $migrator->read('migration-flag-key-123abc', $context, $defaultStage, $payload);
20
| 
21
| // when you need to perform a write in your application
22
| $migrator->write('migration-flag-key-123abc', $context, $defaultStage, $payload);
```
To learn more, read [`Migrator`](https://launchdarkly.github.io/php-server-sdk/classes/LaunchDarkly-Migrations-Migrator.html).
You can check for consistency, errors, or latency under “Migration insights” on the **Targeting** tab of your migration flag in the LaunchDarkly user interface. To learn more, read [Migration flags](/docs/home/flags/migration).
###### Expand Customizing your migration
#### Customizing your migration
Customizing your migration is rare. If you want to customize your migration, [configure your migration information](/docs/sdk/features/migration-config#php) as before.
Then, use the `migrationVariation` method to evaluate your feature flag and determine its migration stage. This method returns the migration stage and a tracker that you can use to build the analytics event to send back to LaunchDarkly.
Here’s how:
PHP SDK v6
```
1
| $context = LaunchDarkly\LDContext::builder("context-key-123abc")->build();
---|--- 
2
| 
3
| $result = $client->migrationVariation('migration-flag-key-123abc', $context, Migrations\Stage::OFF);
4
| 
5
| /** @var Migrations\Stage */
6
| $stage = $result['stage'];
7
| /** @var Migrations\OpTracker */
8
| $tracker = $result['tracker'];
```
Next, perform the migration for the appropriate stage. At each stage, the migration may involve reading or writing from one or both systems. You must define the behavior for each stage. To learn more about how LaunchDarkly defines the stages, read [Use SDKs to manage a migration](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration), above.
The structure looks like this:
PHP SDK v6
```
1
| // define the combination of reads and writes from the new and old systems
---|--- 
2
| // that should occur at each migration stage
3
| 
4
| switch ($stage) {
5
| case Migrations\Stage::OFF:
6
| case Migrations\Stage::DUALWRITE:
7
| case Migrations\Stage::SHADOW:
8
| case Migrations\Stage::LIVE:
9
| case Migrations\Stage::RAMPDOWN:
10
| case Migrations\Stage::COMPLETE:
11
| default:
12
| // throw an error
13
| }
```
Finally, when the migration operation is complete, call the `trackMigrationOperation` method to record your metrics:
PHP SDK v6
```
1
| $client->trackMigrationOperation($tracker);
---|--- 
```
To learn more, read [`Migrator`](https://launchdarkly.github.io/php-server-sdk/classes/LaunchDarkly-Migrations-Migrator.html) and [`trackMigrationOperation`](https://launchdarkly.github.io/php-server-sdk/classes/LaunchDarkly-LDClient.html#method_trackMigrationOperation).
### Python
###### Expand Python code sample
To manage your migration, first you need to define how to read from and write to the old and new systems, how to check whether two reads are a match, and whether to track errors and latency metrics. To learn more, read [Migration configuration](/docs/sdk/features/migration-config#python).
Then, whenever you need to perform a read or write in the systems that you are modernizing or migrating, call the `read` or `write` methods from the `Migrator` interface. The SDK evaluates the flag, determines which migration stage the flag is in, and performs the reads or writes in the [appropriate system](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration).
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
To learn more, read [`ldclient.migrations`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-extending.html#module-ldclient.migrations).
You can check for consistency, errors, or latency under “Migration insights” on the **Targeting** tab of your migration flag in the LaunchDarkly user interface. To learn more, read [Migration flags](/docs/home/flags/migration).
###### Expand Customizing your migration
#### Customizing your migration
Customizing your migration is rare. If you want to customize your migration, [configure your migration information](/docs/sdk/features/migration-config#python) as before.
Then, use the `migration_variation` method to evaluate your feature flag and determine its migration stage. This method returns the migration stage and a tracker that you can use to build the analytics event to send back to LaunchDarkly.
Here’s how:
Python SDK v9
```
1
| context = Context.builder("context-key-123abc").build()
---|--- 
2
| 
3
| stage, tracker = ldclient.get().migration_variation('migration-flag-key-123abc', context, Stage.OFF)
```
Next, perform the migration for the appropriate stage. At each stage, the migration may involve reading or writing from one or both systems. You must define the behavior for each stage. To learn more about how LaunchDarkly defines the stages, read [Use SDKs to manage a migration](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration), above.
The structure looks like this:
Python SDK v9
```
1
| # define the combination of reads and writes from the new and old systems
---|--- 
2
| # that should occur at each migration stage
3
| 
4
| if stage == Stage.OFF:
5
| elif stage == Stage.DUALWRITE:
6
| elif stage == Stage.SHADOW:
7
| elif stage == Stage.LIVE:
8
| elif stage == Stage.RAMPDOWN:
9
| elif stage == Stage.COMPLETE:
10
| else:
11
| # throw an error
```
Finally, when the migration operation is complete, call the `track_migration_op` method to record your metrics:
Python SDK v9
```
1
| ldclient.get().track_migration_op(tracker)
---|--- 
```
To learn more, read [`ldclient.migrations`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-extending.html#module-ldclient.migrations) and [`track_migration_op`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#ldclient.client.LDClient.track_migration_op).
### Ruby
###### Expand Ruby code sample
To manage your migration, first you need to define how to read from and write to the old and new systems, how to check whether two reads are a match, and whether to track errors and latency metrics. To learn more, read [Migration configuration](/docs/sdk/features/migration-config#ruby).
Then, whenever you need to perform a read or write in the systems that you are modernizing or migrating, call `read` or `write`. The SDK evaluates the flag, determines which migration stage the flag is in, and performs the reads or writes in the [appropriate system](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration).
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
To learn more, read [`read`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Interfaces/Migrations/Migrator.html#read-instance_method) and [`write`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Interfaces/Migrations/Migrator.html#write-instance_method).
You can check for consistency, errors, or latency under “Migration insights” on the **Targeting** tab of your migration flag in the LaunchDarkly user interface. To learn more, read [Migration flags](/docs/home/flags/migration).
###### Expand Customizing your migration
#### Customizing your migration
Customizing your migration is rare. If you want to customize your migration, [configure your migration information](/docs/sdk/features/migration-config#ruby) as before.
Then, use the `migration_variation` method to evaluate your feature flag and determine its migration stage. This method returns the migration stage and a tracker that you can use to build the analytics event to send back to LaunchDarkly.
Here’s how:
Ruby SDK v8.0
```
1
| context = LaunchDarkly::LDContext.create({key: "user-key-123abc", kind:"user"})
---|--- 
2
| 
3
| stage, tracker = client.migration_variation(
4
| "migration-flag-key-123abc",
5
| context,
6
| LaunchDarkly::Migrations::STAGE_OFF
7
| )
```
Next, perform the migration for the appropriate stage. At each stage, the migration may involve reading or writing from one or both systems. You must define the behavior for each stage. To learn more about how LaunchDarkly defines the stages, read [Use SDKs to manage a migration](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration), above.
The structure looks like this:
Ruby SDK v8.0
```
1
| # define the combination of reads and writes from the new and old systems
---|--- 
2
| # that should occur at each migration stage
3
| 
4
| case stage
5
| when LaunchDarkly::Migrations::STAGE_OFF
6
| when LaunchDarkly::Migrations::STAGE_DUALWRITE
7
| when LaunchDarkly::Migrations::STAGE_SHADOW
8
| when LaunchDarkly::Migrations::STAGE_LIVE
9
| when LaunchDarkly::Migrations::STAGE_RAMPDOWN
10
| when LaunchDarkly::Migrations::STAGE_COMPLETE
11
| else
12
| # throw an error
13
| end
```
Finally, when the migration operation is complete, call the `track_migration_op` method to record your metrics:
Ruby SDK v8.0
```
1
| client.track_migration_op(tracker);
---|--- 
```
To learn more, read [`Migrator`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Interfaces/Migrations/Migrator.html) and [`track_migration_op`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/LDClient.html#track_migration_op-instance_method).
### Rust
###### Expand Rust code sample
To manage your migration, first you need to define how to read from and write to the old and new systems, how to check whether two reads are a match, and whether to track errors and latency metrics. To learn more, read [Migration configuration](/docs/sdk/features/migration-config#rust).
Then, whenever you need to perform a read or write in the systems that you are modernizing or migrating, call `read` or `write`. The SDK evaluates the flag, determines which migration stage the flag is in, and performs the reads or writes in the [appropriate system](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration).
Here’s how:
Rust SDK v2.2
```
1
| let context = ContextBuilder::new("user-key-123abc")
---|--- 
2
| .kind("user")
3
| .build()
4
| .expect("Context failed to build");
5
| 
6
| // this is the migration stage to use if the flag's migration stage
7
| // is not available from LaunchDarkly
8
| let default_stage = Stage::Off;
9
| 
10
| let read_result = migrator
11
| .read(
12
| &context,
13
| "migration-flag-key-123abc".into(),
14
| default_stage,
15
| "example-payload".into(),
16
| )
17
| .await;
18
| 
19
| let write_result = migrator
20
| .write(
21
| &context,
22
| "migration-flag-key-123abc".into(),
23
| default_stage,
24
| "example-payload".into(),
25
| )
26
| .await;
```
To learn more, read [`read`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Migrator.html#method.read) and [`write`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Migrator.html#method.write).
You can check for consistency, errors, or latency under “Migration insights” on the **Targeting** tab of your migration flag in the LaunchDarkly user interface. To learn more, read [Migration flags](/docs/home/flags/migration).
###### Expand Customizing your migration
#### Customizing your migration
Customizing your migration is rare. If you want to customize your migration, [configure your migration information](/docs/sdk/features/migration-config#rust) as before.
Then, use the `migration_variation` method to evaluate your feature flag and determine its migration stage. This method returns the migration stage and a tracker that you can use to build the analytics event to send back to LaunchDarkly.
Here’s how:
Rust SDK v2.2
```
1
| let context = ContextBuilder::new("user-key-123abc")
---|--- 
2
| .kind("user")
3
| .build()
4
| .expect("Context failed to build");
5
| 
6
| let (stage, tracker) =
7
| client.migration_variation(&context, "migration-flag-key-123abc", Stage::Off);
```
Next, perform the migration for the appropriate stage. At each stage, the migration may involve reading or writing from one or both systems. You must define the behavior for each stage. To learn more about how LaunchDarkly defines the stages, read [Use SDKs to manage a migration](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration), above.
The structure looks like this:
Rust SDK v2.2
```
1
| // define the combination of reads and writes from the new and old systems
---|--- 
2
| // that should occur at each migration stage
3
| 
4
| match stage {
5
| Stage::Off => todo!(),
6
| Stage::DualWrite => todo!(),
7
| Stage::Live => todo!(),
8
| Stage::Shadow => todo!(),
9
| Stage::Rampdown => todo!(),
10
| Stage::Complete => todo!(),
11
| _ => todo!(),
12
| };
```
Finally, when the migration operation is complete, call the `track_migration_op` method to record your metrics:
Rust SDK v2.2
```
1
| client.track_migration_op(tracker);
---|--- 
```
To learn more, read [`Migrator`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Migrator.html) and [`track_migration_op`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.Client.html#method.track_migration_op).
## Edge SDKs
This feature is available in the following edge SDKs:
 * [Akamai](/docs/sdk/features/migrations#akamai)
 * [Cloudflare](/docs/sdk/features/migrations#cloudflare)
 * [Vercel](/docs/sdk/features/migrations#vercel)
### Akamai
###### Expand Akamai code sample
To manage your migration, first you need to define how to read from and write to the old and new systems, how to check whether two reads are a match, and whether to track errors and latency metrics. To learn more, read [Migration configuration](/docs/sdk/features/migration-config#akamai).
Then, whenever you need to perform a read or write in the systems that you are modernizing or migrating, call the `read` or `write` methods from the `LDMigration` interface. The SDK evaluates the flag, determines which migration stage the flag is in, and performs the reads or writes in the [appropriate system](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration).
Here’s how:
Akamai SDK v1.0.9+
```
1
| import {
---|--- 
2
| createMigration,
3
| LDContext,
4
| LDMigrationStage,
5
| } from '@launchdarkly/akamai-server-edgekv-sdk';
6
| 
7
| const context: LDContext = {
8
| kind: 'user',
9
| key: 'user-key-123abc',
10
| name: 'Sandy',
11
| };
12
| 
13
| // this is the migration stage to use if the flag's migration stage
14
| // is not available from LaunchDarkly
15
| let defaultStage: LDMigrationStage = LDMigrationStage.Off;
16
| 
17
| const migration = createMigration(client, options);
18
| 
19
| // when you need to perform a read in your application
20
| migration.read(
21
| 'migration-flag-key-123abc',
22
| context,
23
| defaultStage
24
| );
25
| 
26
| // when you need to perform a write in your application
27
| migration.write(
28
| 'migration-flag-key-123abc',
29
| context,
30
| defaultStage
31
| );
```
To learn more, read [`LDMigration`](https://launchdarkly.github.io/js-core/packages/sdk/akamai-edgekv/docs/interfaces/LDMigration.html).
###### Expand Customizing your migration
#### Customizing your migration
Customizing your migration is rare. If you want to customize your migration, [configure your migration information](/docs/sdk/features/migration-config#akamai) as before.
Then, use the `migrationVariation` method to evaluate your feature flag and determine its migration stage. This method returns a promise that is resolved with the result `LDMigrationVariation`. This result includes the migration stage. It also returns a tracker, which you can ignore. (The tracker is normally used to build an analytics event to send back to LaunchDarkly. However, the Akamai SDK does not support sending events, so there is no need to build one.)
Here’s how:
Akamai SDK v1.0.9+
```
1
| import {
---|--- 
2
| LDContext,
3
| } from '@launchdarkly/akamai-server-edgekv-sdk';
4
| 
5
| const context: LDContext = {
6
| kind: 'user',
7
| key: 'user-key-123abc',
8
| name: 'Sandy',
9
| };
10
| 
11
| const { value, tracker } = await client.migrationVariation(
12
| 'migration-flag-key-123abc',
13
| context,
14
| false
15
| );
```
Next, perform the migration for the appropriate stage. At each stage, the migration may involve reading or writing from one or both systems. You must define the behavior for each stage. To learn more about how LaunchDarkly defines the stages, read [Use SDKs to manage a migration](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration), above.
The structure looks like this:
Akamai SDK v1.0.9+
```
1
| import { LDMigrationStage } from '@launchdarkly/akamai-server-edgekv-sdk';
---|--- 
2
| 
3
| // define the combination of reads and writes from the new and old systems
4
| // that should occur at each migration stage
5
| 
6
| switch (value) {
7
| case LDMigrationStage.Off: { },
8
| case LDMigrationStage.DualWrite: { },
9
| case LDMigrationStage.Shadow: { },
10
| case LDMigrationStage.Live: { },
11
| case LDMigrationStage.RampDown: { },
12
| case LDMigrationStage.Complete: { },
13
| default: {
14
| // throw an error
15
| }
16
| }
```
To learn more, read [`LDMigration`](https://launchdarkly.github.io/js-core/packages/sdk/akamai-edgekv/docs/interfaces/LDMigration.html).
### Cloudflare
###### Expand Cloudflare code sample
To manage your migration, first you need to define how to read from and write to the old and new systems, how to check whether two reads are a match, and whether to track errors and latency metrics. To learn more, read [Migration configuration](/docs/sdk/features/migration-config#cloudflare).
Then, whenever you need to perform a read or write in the systems that you are modernizing or migrating, call the `read` or `write` methods from the `LDMigration` interface. The SDK evaluates the flag, determines which migration stage the flag is in, and performs the reads or writes in the [appropriate system](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration).
Here’s how:
Cloudflare SDK v2.2.2+
```
1
| import {
---|--- 
2
| createMigration,
3
| LDContext,
4
| LDMigrationStage,
5
| } from '@launchdarkly/cloudflare-server-sdk';
6
| 
7
| const context: LDContext = {
8
| kind: 'user',
9
| key: 'user-key-123abc',
10
| name: 'Sandy',
11
| };
12
| 
13
| // this is the migration stage to use if the flag's migration stage
14
| // is not available from LaunchDarkly
15
| let defaultStage: LDMigrationStage = LDMigrationStage.Off;
16
| 
17
| const migration = createMigration(client, options);
18
| 
19
| // when you need to perform a read in your application
20
| migration.read(
21
| 'migration-flag-key-123abc',
22
| context,
23
| defaultStage
24
| );
25
| 
26
| // when you need to perform a write in your application
27
| migration.write(
28
| 'migration-flag-key-123abc',
29
| context,
30
| defaultStage
31
| );
```
To learn more, read [`LDMigration`](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/interfaces/LDMigration.html).
You can check for consistency, errors, or latency under “Migration insights” on the **Targeting** tab of your migration flag in the LaunchDarkly user interface. To learn more, read [Migration flags](/docs/home/flags/migration).
###### Expand Customizing your migration
#### Customizing your migration
Customizing your migration is rare. If you want to customize your migration, [configure your migration information](/docs/sdk/features/migration-config#cloudflare) as before.
Then, use the `migrationVariation` method to evaluate your feature flag and determine its migration stage. This method returns a promise that is resolved with the result `LDMigrationVariation`. This result includes the migration stage and a tracker that you can use to build the analytics event to send back to LaunchDarkly.
Here’s how:
Cloudflare SDK v2.2.2+
```
1
| import {
---|--- 
2
| LDContext,
3
| } from '@launchdarkly/cloudflare-server-sdk'
4
| 
5
| const context: LDContext = {
6
| kind: 'user',
7
| key: 'user-key-123abc',
8
| name: 'Sandy',
9
| };
10
| 
11
| const { value, tracker } = await client.migrationVariation(
12
| 'migration-flag-key-123abc',
13
| context,
14
| false
15
| );
```
Next, perform the migration for the appropriate stage. At each stage, the migration may involve reading or writing from one or both systems. You must define the behavior for each stage. To learn more about how LaunchDarkly defines the stages, read [Use SDKs to manage a migration](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration), above.
The structure looks like this:
Cloudflare SDK v2.2.2+
```
1
| import { LDMigrationStage } from '@launchdarkly/cloudflare-server-sdk';
---|--- 
2
| 
3
| // define the combination of reads and writes from the new and old systems
4
| // that should occur at each migration stage
5
| 
6
| switch (value) {
7
| case LDMigrationStage.Off: { },
8
| case LDMigrationStage.DualWrite: { },
9
| case LDMigrationStage.Shadow: { },
10
| case LDMigrationStage.Live: { },
11
| case LDMigrationStage.RampDown: { },
12
| case LDMigrationStage.Complete: { },
13
| default: {
14
| // throw an error
15
| }
16
| }
```
Finally, when the migration operation is complete, call the `trackMigration` method to record your metrics:
Cloudflare SDK v2.2.2+
```
1
| import {
---|--- 
2
| LDClient,
3
| LDMigrationTracker,
4
| } from '@launchdarkly/cloudflare-server-sdk';
5
| 
6
| const event = tracker.createEvent();
7
| 
8
| if (event) {
9
| client.trackMigration(event);
10
| }
```
To learn more, read [`LDMigration`](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/interfaces/LDMigration.html) and [`LDMigrationOpEvent`](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/interfaces/LDMigrationOpEvent.html).
### Vercel
###### Expand Vercel code sample
To manage your migration, first you need to define how to read from and write to the old and new systems, how to check whether two reads are a match, and whether to track errors and latency metrics. To learn more, read [Migration configuration](/docs/sdk/features/migration-config#vercel).
Then, whenever you need to perform a read or write in the systems that you are modernizing or migrating, call the `read` or `write` methods from the `LDMigration` interface. The SDK evaluates the flag, determines which migration stage the flag is in, and performs the reads or writes in the [appropriate system](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration).
Here’s how:
Vercel SDK v1.1.6+
```
1
| import {
---|--- 
2
| createMigration,
3
| LDContext,
4
| LDMigrationStage,
5
| } from '@launchdarkly/vercel-server-sdk';
6
| 
7
| const context: LDContext = {
8
| kind: 'user',
9
| key: 'user-key-123abc',
10
| name: 'Sandy',
11
| };
12
| 
13
| // this is the migration stage to use if the flag's migration stage
14
| // is not available from LaunchDarkly
15
| let defaultStage: LDMigrationStage = LDMigrationStage.Off;
16
| 
17
| const migration = createMigration(client, options);
18
| 
19
| // when you need to perform a read in your application
20
| migration.read(
21
| 'migration-flag-key-123abc',
22
| context,
23
| defaultStage
24
| );
25
| 
26
| // when you need to perform a write in your application
27
| migration.write(
28
| 'migration-flag-key-123abc',
29
| context,
30
| defaultStage
31
| );
```
To learn more, read [`LDMigration`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/interfaces/LDMigration.html).
You can check for consistency, errors, or latency under “Migration insights” on the **Targeting** tab of your migration flag in the LaunchDarkly user interface. To learn more, read [Migration flags](/docs/home/flags/migration).
###### Expand Customizing your migration
#### Customizing your migration
Customizing your migration is rare. If you want to customize your migration, [configure your migration information](/docs/sdk/features/migration-config#vercel) as before.
Then, use the `migrationVariation` method to evaluate your feature flag and determine its migration stage. This method returns a promise that is resolved with the result `LDMigrationVariation`. This result includes the migration stage and a tracker that you can use to build the analytics event to send back to LaunchDarkly.
Here’s how:
Vercel SDK v1.1.6+
```
1
| import {
---|--- 
2
| LDContext,
3
| } from '@launchdarkly/vercel-server-sdk';
4
| 
5
| const context: LDContext = {
6
| kind: 'user',
7
| key: 'user-key-123abc',
8
| name: 'Sandy',
9
| };
10
| 
11
| const { value, tracker } = await client.migrationVariation(
12
| 'migration-flag-key-123abc',
13
| context,
14
| false
15
| );
```
Next, perform the migration for the appropriate stage. At each stage, the migration may involve reading or writing from one or both systems. You must define the behavior for each stage. To learn more about how LaunchDarkly defines the stages, read [Use SDKs to manage a migration](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration), above.
The structure looks like this:
Vercel SDK v1.1.6+
```
1
| import { LDMigrationStage } from '@launchdarkly/vercel-server-sdk';
---|--- 
2
| 
3
| // define the combination of reads and writes from the new and old systems
4
| // that should occur at each migration stage
5
| 
6
| switch (value) {
7
| case LDMigrationStage.Off: { },
8
| case LDMigrationStage.DualWrite: { },
9
| case LDMigrationStage.Shadow: { },
10
| case LDMigrationStage.Live: { },
11
| case LDMigrationStage.RampDown: { },
12
| case LDMigrationStage.Complete: { },
13
| default: {
14
| // throw an error
15
| }
16
| }
```
Finally, when the migration operation is complete, call the `trackMigration` method to record your metrics:
Vercel SDK v1.1.6+
```
1
| import {
---|--- 
2
| LDMigrationTracker,
3
| LDClient
4
| } from '@launchdarkly/vercel-server-sdk';
5
| 
6
| const event = tracker.createEvent();
7
| 
8
| if (event) {
9
| client.trackMigration(event);
10
| }
```
To learn more, read [`LDMigration`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/interfaces/LDMigration.html) and [`LDMigrationOpEvent`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/interfaces/LDMigrationOpEvent.html).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs