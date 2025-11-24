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
This topic explains the changes in the PHP SDK 6.0 release and how to migrate to that version.
**Version 6.0 includes breaking changes**. It removes the deprecated `LDUser`. To learn more, read [Understanding what was removed](/docs/sdk/server-side/php/migration-5-to-6#understanding-what-was-removed).
The LaunchDarkly PHP SDK version 6.0 is compatible with PHP 8.1 and higher only. Previous versions of the PHP SDK were compatible with PHP 7.3. Additionally, if you use the Relay Proxy, you must update your Relay Proxy to version 8.0 before you update your SDK to version 6.0. To learn more, read the [Relay Proxy 8.0 release notes](https://github.com/launchdarkly/ld-relay/releases/tag/v8.0.0). To upgrade to the latest Relay Proxy version, visit [Relay Proxy releases](https://github.com/launchdarkly/ld-relay/releases) on GitHub.
Version 6.0 also introduces the ability to manage migrations or modernizations. You might use this functionality if you are optimizing queries, upgrading to new tech stacks, migrating from one database to another, or other similar technology changes.
You will need this functionality to use migration flags. A migration flag is a temporary flag used to migrate data or systems while keeping your application available and disruption free. To learn more, read [Migration flags](/docs/home/flags/migration).
Before you migrate to version 6.0, we recommend updating to the latest 5.x version. If you update to the latest 5.x version, deprecation warnings appear in areas of your code that need to be changed for 6.0, for example, any use of `LDUser`. You can update these areas at your own pace while still using 5.x, rather than migrating everything simultaneously. To learn more about updating to the latest 5.x version, visit the [SDK’s GitHub repository](https://github.com/launchdarkly/php-server-sdk).
## Understanding how to manage a migration
Depending on how you created your migration feature flag, your migration will have two, four, or six stages. At each stage, you will be reading data from the old system, the new system, or both. You will also be writing data to the old system, the new system, or both. At each stage, only one of these destinations is considered the authoritative source. In the LaunchDarkly SDK, you can determine which stage of the migration your application is currently in, execute the appropriate read and write methods, and then compare the results to check correctness and view any errors or changes in latency.
To manage your migration:
 * [Configure the migration](/docs/sdk/server-side/php/migration-5-to-6#configuring-the-migration)
 * [Call the read and write methods you defined](/docs/sdk/server-side/php/migration-5-to-6#reading-and-writing-during-the-migration)
### Configuring the migration
There are two categories of migration options that you can configure for each LaunchDarkly SDK:
 * Options for reading and writing data: You can define how to read from and write to both the old system and the new system. You can also define a method to check whether the two reads are a match, and whether the migration should execute serially or concurrently. To learn how these options apply to each migration stage, read [Use SDKs to manage a migration](/docs/sdk/features/migrations#use-sdks-to-manage-a-migration).
 * Options for tracking metrics: You can configure whether the SDK should track latency and errors, so that you can monitor the performance of your application during the migration.
Here’s how:
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
To learn more, read [Migration configuration](/docs/sdk/features/migration-config).
### Reading and writing during the migration
As your migration proceeds, use the SDK’s migrator to call the read and write methods you defined. The migrator determines the migration stage of the feature flag controlling the migration, and performs reads and writes to the old and new systems based on the migration stage.
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
To learn more, read [Migrations](/docs/sdk/features/migrations).
During the migration, you can check the consistency, errors, and latency as you manage your migration. This information is available in the “Migration insights” section of the flag’s **Targeting** tab. To learn more, read [Migration flags](/docs/home/flags/migration).
## Understanding what was removed
**Version 6.0 removes the deprecated`LDUser`**. Version 5 of the PHP SDK replaced users with contexts. Starting in version 6, the deprecated `LDUser` is removed.
Here’s how to construct a basic context, as compared with constructing a user:
PHP SDK v4.x, user with keyPHP SDK v5+, single context with key
```
1
| $user = (new LDUserBuilder("user-key-123abc"))->build();
---|--- 
```
And here’s how to evaluate a flag using a context:
PHP SDK, v5+
```
1
| $value = $client->variation("flag-key-123abc", $context, false);
---|--- 
```
To learn more about replacing users with contexts, read the [PHP SDK 4.x to 5.0 migration guide](/docs/sdk/server-side/php/migration-4-to-5) and [Best practices for upgrading users to contexts](/docs/guides/flags/upgrading-contexts).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs