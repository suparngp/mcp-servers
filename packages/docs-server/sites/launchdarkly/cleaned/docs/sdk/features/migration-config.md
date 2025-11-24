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
 * [Migration configuration options](#migration-configuration-options)
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [Go](#go)
 * [Java](#java)
 * [Node.js (server-side)](#nodejs-server-side)
 * [PHP](#php)
 * [Python](#python)
 * [Ruby](#ruby)
 * [Rust](#rust)
 * [Edge SDKs](#edge-sdks)
 * [Akamai](#akamai)
 * [Cloudflare](#cloudflare)
 * [Vercel](#vercel)
## Overview
This topic explains how to configure LaunchDarkly SDKs to manage migrations or modernizations. You might use this feature if you are optimizing queries, upgrading to new tech stacks, migrating from one database to another, or other similar technology changes. This feature is available for server-side and edge SDKs only.
## Prerequisites
Before you configure your SDK to manage a migration, you must complete the following prerequisites:
 * Create a migration feature flag. This is a temporary flag used to migrate data or systems while keeping your application available and disruption free. Migration flags break up the switch from an old to a new implementation into a series of recommended stages where movement from one stage to the next is done in incremental steps.
 * Determine how many stages your migration will have. You can select from the following options as part of creating a migration feature flag:
 * Two stages: For migrations where you cannot run the new system and old system at the same time
 * Four stages: For migrations that can run both the new and old systems at the same time
 * Six stages: For migrations where you need to migrate `READS` and `WRITES` separately
To learn more, read [Migration flags](/docs/home/flags/migration).
## Migration configuration options
There are two categories of migration options that you can configure for each LaunchDarkly SDK:
 * Options for reading and writing data: You can define how to read from and write to both the old system and the new system. You can also define a method to check whether the two reads are a match, and whether the migration should execute serially or concurrently. To learn how these options apply to each migration stage, read [Use SDKs to manage a migration](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration).
 * Options for tracking metrics: You can configure whether the SDK should track latency and errors, so that you can monitor the performance of your application during the migration.
Details about each SDK’s configuration are available in the SDK-specific sections below:
 * [Server-side SDKs](/docs/sdk/features/migration-config#server-side-sdks)
 * [Edge SDKs](/docs/sdk/features/migration-config#edge-sdks)
## Server-side SDKs
This feature is available in the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/migration-config#net-server-side)
 * [Go](/docs/sdk/features/migration-config#go)
 * [Java](/docs/sdk/features/migration-config#java)
 * [Node.js (server-side)](/docs/sdk/features/migration-config#nodejs-server-side)
 * [PHP](/docs/sdk/features/migration-config#php)
 * [Python](/docs/sdk/features/migration-config#python)
 * [Ruby](/docs/sdk/features/migration-config#ruby)
 * [Rust](/docs/sdk/features/migration-config#rust)
### .NET (server-side)
###### Expand .NET (server-side) code sample
To define how to read from the old and new systems, define the `Read` function. You can also define how to check whether the two reads are a match, and whether the reads should take place concurrently or serially.
To define how to write to the old and new systems, define the `Write` function.
To configure the metrics for your migration, set the `TrackLatency` and `TrackErrors` options.
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
To learn more, read [`MigrationBuilder`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Migrations.MigrationBuilder-4.html).
### Go
###### Expand Go code sample
You can use the `Migration` configuration to define the options for your migration.
To define how to read from the old and new systems, define the `Read` function. You can also define how to check whether the two reads are a match, and whether the reads should take place concurrently or serially.
To define how to write to the old and new systems, define the `Write` function.
To configure the metrics for your migration, set the `TrackLatency` and `TrackErrors` options.
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
| migrator, _ := ld.Migration(client).
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
To learn more, read [`Migration`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#Migration).
### Java
###### Expand Java code sample
You can use the `MigrationBuilder` to define the options for your migration.
To define how to read from the old and new systems, define the `read` function, including how to check whether the two reads are a match. You can also define whether the reads should take place concurrently or serially.
To define how to write to the old and new systems, define the `write` function.
To configure the metrics for your migration, set the `trackLatency` and `trackErrors` options.
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
| .trackErrors(true);
16
| 
17
| Migration<String, String, String, String> migration = migrationBuilder.build();
```
To learn more, read [`MigrationBuilder`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/migrations/MigrationBuilder.html).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
To define how to read from the old and new systems, define the `readOld` and `readNew` functions. You can also define how to check whether the two reads are a match, and whether the reads should take place concurrently or serially.
To define how to write to the old and new systems, define the `writeOld` and `writeNew` functions.
Each of the `readOld`, `readNew`, `writeOld`, and `writeNew` functions accept an optional argument, which is typically used to define what to read or write. They should return `LDMigrationSuccess` or `LDMigrationError`, or can throw an exception. The code sample below uses a mix to illustrate these possibilities.
To configure the metrics for your migration, set the `latencyTracking` and `errorTracking` options.
Here’s how to configure each of these options:
Node.js SDK v9.0
```
1
| import { LDMigrationOptions, init, createMigration } from '@launchdarkly/node-server-sdk';
---|--- 
2
| const options: LDMigrationOptions = {
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
| const client = init('sdk-key-123abc');
37
| const migration = createMigration(client, options);
```
To learn more, read [`LDMigrationOptions`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/LDMigrationOptions.html).
### PHP
###### Expand PHP code sample
To define how to read from the old and new systems, call the `read` method. You can also define how to check whether the two reads are a match, and whether the reads should take place serially or in a randomized execution order.
To define how to write to the old and new systems, call the `write` method.
Each of the `read` and `write` method accept `new` and `old` methods for how to read from or write to both the new and old systems. These `new` and `old` methods accept an optional payload parameter, which is typically used to define what to read or write. They should return an `LaunchDarkly\Types\Result` instance.
To configure the metrics for your migration, set the `trackLatency` and `trackErrors` options.
Here’s how to configure each of these options:
PHP SDK v6
```
1
| use LaunchDarkly\Migrations;
---|--- 
2
| use LaunchDarkly\Types;
3
| 
4
| $builder = new Migrations\MigratorBuilder($client);
5
| 
6
| $builder->read(
7
| fn (?string $payload) => Types\Result::success("old read"),
8
| fn (?string $payload) => Types\Result::success("new read"),
9
| fn(string $old, string $new) => $old == $new,
10
| );
11
| 
12
| $builder->write(
13
| fn (?string $payload) => Types\Result::success("old write"),
14
| fn (?string $payload) => Types\Result::success("new write")
15
| );
16
| $builder->readExecutionOrder(Migrations\ExecutionOrder::SERIAL);
17
| // could also use ExecutionOrder::RANDOM
18
| 
19
| $builder->trackLatency(true); // defaults to true
20
| $builder->trackErrors(true); // defaults to true
21
| 
22
| $result = $builder->build();
```
To learn more, read [`MigratorBuilder`](https://launchdarkly.github.io/php-server-sdk/classes/LaunchDarkly-Migrations-MigratorBuilder.html).
### Python
###### Expand Python code sample
To define how to read from the old and new systems, call the `read` method. You can also define how to check whether the two reads are a match, and whether the reads should take place concurrently or serially.
To define how to write to the old and new systems, call the `write` method.
Each of the `read` and `write` method accept `new` and `old` methods for how to read from or write to both the new and old systems. These `new` and `old` methods accept an optional payload parameter, which is typically used to define what to read or write. They should return an `ldclient.Result` instance.
To configure the metrics for your migration, set the `track_latency` and `track_errors` options.
Here’s how to configure each of these options:
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
To learn more, read [`ldclient.migrations`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-extending.html#module-ldclient.migrations).
### Ruby
###### Expand Ruby code sample
To define how to read from the old and new systems, define the `read` function. You can also define how to check whether the two reads are a match, and whether the reads should take place in serial or in parallel.
To define how to write to the old and new systems, define the `write` function.
To configure the metrics for your migration, set the `track_latency` and `track_errors` options.
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
| 
8
| builder.write(
9
| ->(_payload) { LaunchDarkly::Result.success('old value') },
10
| ->(_payload) { LaunchDarkly::Result.success('new value') }
11
| )
12
| builder.read_execution_order(builder.EXECUTION_PARALLEL) # or .EXECUTION_SERIAL, or .EXECUTION_RANDOM
13
| builder.track_latency(true) # defaults to true
14
| builder.track_errors(true) # defaults to true
15
| migrator = builder.build
```
To learn more, read [`MigratorBuilder`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Migrations/MigratorBuilder.html).
### Rust
###### Expand Rust code sample
To define how to read from the old and new systems, define the `read` function. You can also define how to check whether the two reads are a match, and whether the reads should take place in serial or concurrently.
To define how to write to the old and new systems, define the `write` function.
To configure the metrics for your migration, set the `track_latency` and `track_errors` options.
Here’s how:
Rust SDK v2.2
```
1
| let client = Arc::new(client);
---|--- 
2
| let mut builder = MigratorBuilder::new(client.clone())
3
| .read(
4
| |_payload: &String| async move { Ok(()) }.boxed(),
5
| |_payload: &String| async move { Ok(()) }.boxed(),
6
| Some(|lhs, rhs| lhs == rhs),
7
| )
8
| .write(
9
| |_payload: &String| async move { Ok(()) }.boxed(),
10
| |_payload: &String| async move { Ok(()) }.boxed(),
11
| );
12
| 
13
| builder = builder
14
| .read_execution_order(ExecutionOrder::Concurrent) // Or ExecutionOrder::Serial or ExecutionOrder::Random
15
| .track_latency(true) // defaults to true
16
| .track_errors(true); // defaults to true
17
| 
18
| let migrator = builder.build().expect("build migrator");
```
To learn more, read [`MigratorBuilder`](https://docs.rs/launchdarkly-server-sdk/latest/launchdarkly_server_sdk/struct.MigratorBuilder.html).
## Edge SDKs
This feature is available in the following edge SDKs:
 * [Akamai](/docs/sdk/features/migration-config#akamai)
 * [Cloudflare](/docs/sdk/features/migration-config#cloudflare)
 * [Vercel](/docs/sdk/features/migration-config#vercel)
### Akamai
###### Expand Akamai code sample
To define how to read from the old and new systems, define the `readOld` and `readNew` functions. You can also define how to check whether the two reads are a match, and whether the reads should take place concurrently or serially.
To define how to write to the old and new systems, define the `writeOld` and `writeNew` functions.
Each of the `readOld`, `readNew`, `writeOld`, and `writeNew` functions accept an optional argument, which is typically used to define what to read or write. They should return `LDMigrationSuccess` or `LDMigrationError`, or can throw an exception. The code sample below uses a mix to illustrate these possibilities.
Although the migration options `latencyTracking` and `errorTracking` default to `true`, the Akamai SDK does not track metrics for migrations, because the Akamai SDK does not send events back to LaunchDarkly.
Here’s how to configure each of these options:
Akamai SDK v1.0.9+
```
1
| import {
---|--- 
2
| createMigration,
3
| init,
4
| LDConcurrentExecution,
5
| LDMigrationError,
6
| LDMigrationOptions,
7
| LDMigrationSuccess,
8
| } from '@launchdarkly/akamai-server-edgekv-sdk';
9
| 
10
| const options: LDMigrationOptions = {
11
| readNew: async(key?: string) => {
12
| console.log("Reading from new: ", key);
13
| return LDMigrationSuccess(true);
14
| },
15
| readOld: async(key?: string) => {
16
| console.log("Reading from new: ", key);
17
| return LDMigrationSuccess(true);
18
| },
19
| writeNew: async(params?: {key: string, value: string}) => {
20
| console.log("Writing to new: ", params);
21
| // if failure - can throw an exception
22
| throw new Error("example exception")
23
| },
24
| writeOld: async(params?: {key: string, value: string}) => {
25
| console.log("Writing to old: ", params);
26
| // if failure - can return the error
27
| return LDMigrationError(new Error('example error'));
28
| },
29
| 
30
| check: (old, new) => {
31
| // Define your consistency check for read operations
32
| // and return a boolean. Depending on your migration,
33
| // this may be as simple as 'return a === b;'
34
| },
35
| 
36
| execution: new LDConcurrentExecution(),
37
| // or new LDSerialExecution(LDExecutionOrdering.Random),
38
| // or new LDSerialExecution(LDExecutionOrdering.Fixed),
39
| 
40
| }
41
| 
42
| const client = init({
43
| sdkKey: 'client-side-id-123abc',
44
| namespace: 'your-edgekv-namespace',
45
| group: 'your-edgekv-group-id'
46
| });
47
| const migration = createMigration(client, options);
```
To learn more, read [`LDMigrationOptions`](https://launchdarkly.github.io/js-core/packages/sdk/akamai-edgekv/docs/interfaces/LDMigrationOptions.html).
### Cloudflare
###### Expand Cloudflare code sample
To define how to read from the old and new systems, define the `readOld` and `readNew` functions. You can also define how to check whether the two reads are a match, and whether the reads should take place concurrently or serially.
To define how to write to the old and new systems, define the `writeOld` and `writeNew` functions.
Each of the `readOld`, `readNew`, `writeOld`, and `writeNew` functions accept an optional argument, which is typically used to define what to read or write. They should return `LDMigrationSuccess` or `LDMigrationError`, or can throw an exception. The code sample below uses a mix to illustrate these possibilities.
To configure the metrics for your migration, set the `latencyTracking` and `errorTracking` options.
Here’s how to configure each of these options:
Cloudflare SDK v2.2.2+
```
1
| import {
---|--- 
2
| createMigration,
3
| init,
4
| LDConcurrentExecution,
5
| LDMigrationError,
6
| LDMigrationOptions,
7
| LDMigrationSuccess,
8
| } from '@launchdarkly/cloudflare-server-sdk';
9
| 
10
| const options: LDMigrationOptions = {
11
| readNew: async(key?: string) => {
12
| console.log("Reading from new: ", key);
13
| return LDMigrationSuccess(true);
14
| },
15
| readOld: async(key?: string) => {
16
| console.log("Reading from new: ", key);
17
| return LDMigrationSuccess(true);
18
| },
19
| writeNew: async(params?: {key: string, value: string}) => {
20
| console.log("Writing to new: ", params);
21
| // if failure - can throw an exception
22
| throw new Error('example exception')
23
| },
24
| writeOld: async(params?: {key: string, value: string}) => {
25
| console.log("Writing to old: ", params);
26
| // if failure - can return the failure
27
| return LDMigrationError(new Error('example error'));
28
| },
29
| 
30
| check: (old, new) => {
31
| // Define your consistency check for read operations
32
| // and return a boolean. Depending on your migration,
33
| // this may be as simple as 'return a === b;'
34
| },
35
| 
36
| execution: new LDConcurrentExecution(),
37
| // or new LDSerialExecution(LDExecutionOrdering.Random),
38
| // or new LDSerialExecution(LDExecutionOrdering.Fixed),
39
| 
40
| latencyTracking: true, // defaults to true
41
| errorTracking: true, // defaults to true
42
| }
43
| 
44
| const client = init('sdk-key-123abc', env.LD_KV, { sendEvents: true });
45
| const migration = createMigration(client, options);
```
To learn more, read [`LDMigrationOptions`](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/interfaces/LDMigrationOptions.html).
### Vercel
###### Expand Vercel code sample
To define how to read from the old and new systems, define the `readOld` and `readNew` functions. You can also define how to check whether the two reads are a match, and whether the reads should take place concurrently or serially.
To define how to write to the old and new systems, define the `writeOld` and `writeNew` functions.
Each of the `readOld`, `readNew`, `writeOld`, and `writeNew` functions accept an optional argument, which is typically used to define what to read or write. They should return `LDMigrationSuccess` or `LDMigrationError`, or can throw an exception. The code sample below uses a mix to illustrate these possibilities.
To configure the metrics for your migration, set the `latencyTracking` and `errorTracking` options.
Here’s how to configure each of these options:
Vercel SDK v1.1.6+
```
1
| import {
---|--- 
2
| createMigration,
3
| init,
4
| LDConcurrentExecution,
5
| LDMigrationError,
6
| LDMigrationOptions,
7
| LDMigrationSuccess,
8
| } from '@launchdarkly/vercel-server-sdk';
9
| 
10
| const options: LDMigrationOptions = {
11
| readNew: async(key?: string) => {
12
| console.log("Reading from new: ", key);
13
| return LDMigrationSuccess(true);
14
| },
15
| readOld: async(key?: string) => {
16
| console.log("Reading from new: ", key);
17
| return LDMigrationSuccess(true);
18
| },
19
| writeNew: async(params?: {key: string, value: string}) => {
20
| console.log("Writing to new: ", params);
21
| // if failure - can throw an exception
22
| throw new Error("example exception")
23
| },
24
| writeOld: async(params?: {key: string, value: string}) => {
25
| console.log("Writing to old: ", params);
26
| // if failure - can return the failure
27
| return LDMigrationError(new Error('example error'));
28
| },
29
| 
30
| check: (old, new) => {
31
| // Define your consistency check for read operations
32
| // and return a boolean. Depending on your migration,
33
| // this may be as simple as 'return a === b;'
34
| },
35
| 
36
| execution: new LDConcurrentExecution(),
37
| // or new LDSerialExecution(LDExecutionOrdering.Random),
38
| // or new LDSerialExecution(LDExecutionOrdering.Fixed),
39
| 
40
| latencyTracking: true, // defaults to true
41
| errorTracking: true, // defaults to true
42
| }
43
| 
44
| const client = init('<client-side-id-123abc>', edgeConfigClient, { sendEvents: true });
45
| const migration = createMigration(client, options);
```
To learn more, read [`LDMigrationOptions`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/interfaces/LDMigrationOptions.html).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs