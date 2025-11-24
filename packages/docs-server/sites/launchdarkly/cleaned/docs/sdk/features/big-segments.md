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
 * [Client-side SDKs](#client-side-sdks)
 * [Server-side SDKs](#server-side-sdks)
 * [How big segment caching works](#how-big-segment-caching-works)
 * [.NET (server-side)](#net-server-side)
 * [Go](#go)
 * [Java](#java)
 * [Node.js (server-side)](#nodejs-server-side)
 * [PHP](#php)
 * [Python](#python)
 * [Ruby](#ruby)
##### Big segments are available to customers on select plans
[Segments synced from external tools](/docs/home/flags/synced-segments) and [larger list-based segments](/docs/home/flags/segment-types#larger-list-based-segments) are the two kinds of big segment. Big segments are available to customers on only select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how the big segments feature works in the LaunchDarkly SDKs that support it.
Big segments are segments that are either [synced from external tools](/docs/home/flags/synced-segments) or [list-based segments](/docs/home/flags/segment-types#larger-list-based-segments) that can contain an arbitrarily large number of contexts of any one context kind.
You can use big segments with client-side or server-side SDKs.
## Client-side SDKs
If you are using client-side SDKs, no additional SDK configuration is required.
However, if you use the Relay Proxy with client-side SDKs, then the Relay Proxy must be configured to use persistent storage. To learn more, read [Configuring the Relay Proxy for segments](/docs/sdk/relay-proxy/sdk-config#configuring-the-relay-proxy-for-segments).
## Server-side SDKs
If you are using server-side SDKs, big segments require a persistent store within your infrastructure. LaunchDarkly keeps the persistent store up to date and consults it during flag evaluation.
You can use either Redis or DynamoDB as your persistent store when you work with segments. LaunchDarkly keeps the persistent store up to date using either a persistent store integration or the Relay Proxy. You must decide which you want to use. Then you must either configure a persistent store integration, or configure the Relay Proxy. To learn how, read [SDK and integration configuration for segments](/docs/home/flags/segment-config).
Whether you use a persistent store integration or the Relay Proxy, you must also configure your server-side SDK. Server-side SDK configuration for big segments is comprised of two parts:
 * **The specific database options to get the segment data** : These options include which database to use, and any other parameters supported by the SDK to configure that database. These are the same database options you specify when configuring server-side SDKs to use external databases as persistent feature stores, for example, key prefix or DynamoDB table name. However, note that if you are using a feature store for your SDK, you can use either the same or a different persistent store for your segments. To learn more about these database options, read [Storing data](/docs/sdk/features/storing-data).
##### Only certain types of database integrations support big segments
Only the Redis and DynamoDB integrations support big segments. If you use Redis, each Redis host needs enough RAM to load the full set of segments and flag configurations.
 * **The general options for the SDK’s big segments behavior** : The table below lists all the general options available. They are all optional and valid for all server-side SDKs and can be used for any supported database integration.
Config option | Description 
---|--- 
user or context cache size | The maximum number of contexts whose segment status the SDK can cache. The segment status includes all of the segments the context is a part of. A higher value means that the SDK queries the database for recently-referenced contexts’ segments statuses less often. If not specified, the default value is 1000. 
user or context cache time | The maximum length of time that the SDK caches the segments status. If you do not specify a value, the default is five seconds. 
status poll interval | The interval at which the SDK polls the persistent store to make sure it is available and to determine how long ago it was updated. If not specified, the default value is five seconds. 
stale after | The maximum length of time between updates of persistent store data before the SDK considers the data out of date. If you do not specify a value, the default is two minutes. 
In all the server-side SDK code examples below, the configuration is set as follows:
 * using a Redis server at `your-redis:6379`
 * with a key prefix of `client-side-id-123abc`
 * cache size: 2000
 * cache time: 30 seconds
##### Using a persistent store for segments requires a specific key prefix
If you are using a persistent store integration, the value of the key prefix for the persistent store must be the client-side ID of your environment.
Your environment’s client-side ID is available in the **Environments** list for your project. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This feature is available in the listed versions and later of the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/big-segments#net-server-side): 6.2.0
 * [Go](/docs/sdk/features/big-segments#go): 5.5.0
 * [Java](/docs/sdk/features/big-segments#java): 5.7.0
 * [Node.js (server-side)](/docs/sdk/features/big-segments#nodejs-server-side): 6.2.0
 * [PHP](/docs/sdk/features/big-segments#php): 6.4.0
 * [Python](/docs/sdk/features/big-segments#python): 7.3.0
 * [Ruby](/docs/sdk/features/big-segments#ruby): 6.3.0
##### Newer versions of LaunchDarkly SDKs replace users with contexts
A context is a generalized way of referring to the people, services, machines, or other resources that encounter feature flags in your product. Contexts replace another data object in LaunchDarkly: “users.”
Creating contexts and evaluating flags based on them is supported in the latest major versions of [most of our SDKs](/docs/sdk). For these SDKs, the code samples on this page include the two most recent versions.
## How big segment caching works
The SDK queries the Big Segment store once per unique context, not once globally. It then caches that context’s segment membership:
 * Cache duration: 5 seconds by default, configurable with `DefaultBigSegmentsContextCacheTime`
 * Cache size: Up to 1,000 contexts, managed with an LRU eviction policy and configurable with `DefaultBigSegmentsContextCacheSize`
When a cached result is used, the lookup typically takes only 1–10ms, excluding network latency—even for very large segments.
### .NET (server-side)
###### Expand .NET (server-side) code sample
Persistent store support for big segments is available in version 6.2.0 and later:
.NET SDK v7.0 (C#)
```
1
| using LaunchDarkly.Sdk.Server;
---|--- 
2
| using LaunchDarkly.Sdk.Server.Integrations;
3
| var config = Configuration.Builder("sdk-key-123abc")
4
| .BigSegments(
5
| Components.BigSegments(
6
| Redis.BigSegmentStore()
7
| .HostAndPort("your-redis", 6379)
8
| .Prefix("client-side-id-123abc")
9
| )
10
| .ContextCacheSize(2000)
11
| .CacheTime(TimeSpan.FromSeconds(30))
12
| )
13
| .Build();
14
| var client = new LDClient(config);
```
##### Big segment stores and feature stores are configured separately
Big segment stores are required if you want to use big segments with a server-side SDK. In the .NET (server-side) SDK, big segment stores are defined with a `*BigSegmentStore` function, for example `Redis.BigSegmentStore()`, and with the `BigSegments` options.
Feature stores are used if you want to cache flag data in an external database, rather than in local memory. In the .NET (server-side) SDK, feature stores are defined with a `*DataStore` function, and with the `DataStore` options. To learn more, read [Storing data](/docs/sdk/features/storing-data#net-server-side).
To learn more about the available configuration options, read [`BigSegmentsConfigurationBuilder`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Integrations.BigSegmentsConfigurationBuilder.html).
### Go
###### Expand Go code sample
Persistent store support for big segments is available in version 5.5.0 and later:
Go SDK v6.0
```
1
| import (
---|--- 
2
| "time"
3
| 
4
| ld "github.com/launchdarkly/go-server-sdk/v6"
5
| "github.com/launchdarkly/go-server-sdk/v6/ldcomponents"
6
| ldredis "github.com/launchdarkly/go-server-sdk-redis-redigo"
7
| )
8
| 
9
| var config ld.Config
10
| config.BigSegments = ldcomponents.BigSegments(
11
| ldredis.BigSegmentStore().
12
| HostAndPort("your-redis", 6379).
13
| Prefix("client-side-id-123abc"),
14
| ).
15
| ContextCacheSize(2000).
16
| ContextCacheTime(30*time.Second)
17
| client, _ := ld.MakeCustomClient(sdkKey, config, 5*time.Second)
```
##### Big segment stores and feature stores are configured separately
Big segment stores are required if you want to use big segments with a server-side SDK. In the Go SDK, big segment stores are defined with a `*BigSegmentStore` function, for example `ldredis.BigSegmentStore()`, and with the `BigSegments` options.
Feature stores are used if you want to cache flag data in an external database, rather than in local memory. In the Go SDK, feature stores are defined with a `*DataStore` function, and with the `DataStore` options. To learn more, read [Storing data](/docs/sdk/features/storing-data#go).
To learn more about the available configuration options, read [`BigSegmentsConfigurationBuilder`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7/ldcomponents#BigSegmentsConfigurationBuilder).
### Java
###### Expand Java code sample
Persistent store support for big segments is available in version 5.7.0 and later:
Java
```
1
| import com.launchdarkly.sdk.server.*;
---|--- 
2
| import com.launchdarkly.sdk.server.integrations.*;
3
| 
4
| import java.net.URI;
5
| import java.time.Duration;
6
| 
7
| LDConfig config = new LDConfig.Builder()
8
| .bigSegments(
9
| Components.bigSegments(
10
| Redis.bigSegmentStore()
11
| .uri(URI.create("redis://your-redis:6379"))
12
| .prefix("client-side-id-123abc")
13
| )
14
| .userCacheSize(2000)
15
| .userCacheTime(Duration.ofSeconds(30))
16
| )
17
| .build();
18
| LDClient client = new LDClient(sdkKey, config);
```
To use either the Redis integration, as shown above, or the DynamoDB integration in the Java SDK, you must also install additional packages. To learn more, read [Redis](/docs/sdk/features/storing-data/redis#java) and [DynamoDB](/docs/sdk/features/storing-data/dynamodb#java).
##### Big segment stores and feature stores are configured separately
Big segment stores are required if you want to use big segments with a server-side SDK. In the Java SDK, big segment stores are defined with a `*bigSegmentStore` function, for example `Redis.bigSegmentStore()`, and with the `bigSegments` options.
Feature stores are used if you want to cache flag data in an external database, rather than in local memory. In the Java SDK, feature stores are defined with a `*dataStore` function, and with the `dataStore` options. To learn more, read [Storing data](/docs/sdk/features/storing-data#java).
To learn more about the available configuration options, read [`BigSegmentsConfigurationBuilder`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/integrations/BigSegmentsConfigurationBuilder.html).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
Persistent store support for big segments is available in version 6.2.0 and later:
Node.js SDK v8.x (JavaScript)Node.js SDK v6.2.0 - v7.x (JavaScript)Node.js SDK v8.x (TypeScript)Node.js SDK v6.2.0 - v7.x (TypeScript)
```
1
| import { init } from '@launchdarkly/node-server-sdk');
---|--- 
2
| import { RedisBigSegmentStore } from '@launchdarkly/node-server-sdk-redis';
3
| 
4
| const store = RedisBigSegmentStore({
5
| redisOpts: {
6
| host: 'your-redis',
7
| port: 6379
8
| },
9
| prefix: 'client-side-id-123abc'
10
| });
11
| 
12
| const config = {
13
| bigSegments: {
14
| store: store,
15
| userCacheSize: 2000,
16
| userCacheTime: 30
17
| }
18
| };
19
| const client = init(sdkKey, config);
```
##### Big segment stores and feature stores are configured separately
Big segment stores are required if you want to use big segments with a server-side SDK. In the Node.js (server-side) SDK, big segment stores are defined with a `*BigSegmentStore` function, for example `RedisBigSegmentStore`, and with the `bigSegments` options.
Feature stores are used if you want to cache flag data in an external database, rather than in local memory. In the Node.js (server-side) SDK, feature stores are defined with a `*FeatureStore` function, and with the `featureStore` options. To learn more, read [Storing data](/docs/sdk/features/storing-data#nodejs-server-side).
To learn more about the available configuration options, read [`LDBigSegmentsOptions`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/LDBigSegmentsOptions.html).
### PHP
###### Expand PHP code sample
Persistent store support for big segments is available in version 6.4.0 and later:
PHP
```
1
| use LaunchDarkly\Types\BigSegmentsConfig;
---|--- 
2
| 
3
| $redisClient = new Predis\Client([]);
4
| $logger = new Psr\Log\NullLogger();
5
| $bigSegmentsStore = LaunchDarkly\Integrations\Redis::bigSegmentsStore($redisClient, $logger);
6
| $bigSegmentsConfig = new BigSegmentsConfig(store: $bigSegmentsStore);
7
| 
8
| $client = new LaunchDarkly\LDClient("sdk-key-123abc", ['big_segments' => $bigSegmentsConfig]);
```
The PHP SDK currently only supports a Redis integration. To use the Redis integration in the PHP SDK, you must also install additional packages. To learn more, read [Redis](/docs/sdk/features/storing-data/redis#php).
##### Big segment stores and feature stores are configured separately
Big segment stores are required if you want to use big segments with a server-side SDK. In the PHP SDK, big segment stores are accessed through the `BigSegmentsStore` interface, and set up with the `BigSegmentsConfig` options.
Feature stores are used if you want to cache flag data in an external database, rather than in local memory. In the PHP SDK, feature stores are defined with a `feature_requester` option. To learn more, read [Storing data](/docs/sdk/features/storing-data#php).
To learn more about the available configuration options, read [`BigSegmentsConfig`](https://launchdarkly.github.io/php-server-sdk/classes/LaunchDarkly-Types-BigSegmentsConfig.html).
### Python
###### Expand Python code sample
Persistent store support for big segments is available in version 7.3.0 and later:
Python
```
1
| import ldclient
---|--- 
2
| from ldclient.config import Config, BigSegmentsConfig
3
| from ldclient.integrations import Redis
4
| 
5
| store = Redis.new_big_segment_store(
6
| url='redis://your-redis:6379',
7
| prefix='client-side-id-123abc')
8
| 
9
| config = Config(sdk_key, big_segments=BigSegmentsConfig(store=store))
10
| ldclient.set_config(config)
11
| client = ldclient.get()
```
To use either the Redis integration, as shown above, or the DynamoDB integration in the Python SDK, you must also install additional packages. To learn more, read [Redis](/docs/sdk/features/storing-data/redis#python) and [DynamoDB](/docs/sdk/features/storing-data/dynamodb#python).
##### Big segment stores and feature stores are configured separately
Big segment stores are required if you want to use big segments with a server-side SDK. In the Python SDK, big segment stores are defined with a `*BigSegmentStore` function, for example `RedisBigSegmentStore()`, and with the `bigSegments` options.
Feature stores are used if you want to cache flag data in an external database, rather than in local memory. In the Python SDK, feature stores are defined with a `feature_store` option. To learn more, read [Storing data](/docs/sdk/features/storing-data#python).
To learn more about the available configuration options, read [`BigSegmentsConfig`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#ldclient.config.BigSegmentsConfig).
### Ruby
###### Expand Ruby code sample
Persistent store support for big segments is available in version 6.3.0 and later:
Ruby
```
1
| store = LaunchDarkly::Integrations::Redis.new_big_segment_store(
---|--- 
2
| redis_url: 'redis://your-redis:6379',
3
| prefix: 'client-side-id-123abc'
4
| )
5
| 
6
| config = LaunchDarkly::Config.new(
7
| big_segments: LaunchDarkly::BigSegmentsConfig.new(store: store)
8
| )
9
| 
10
| client = LaunchDarkly::LDClient.new(sdk_key, config)
```
To use either the Redis integration, as shown above, or the DynamoDB integration in the Ruby SDK, you must also install additional gems. To learn more, read [Redis](/docs/sdk/features/storing-data/redis#ruby) and [DynamoDB](/docs/sdk/features/storing-data/dynamodb#ruby).
##### Big segment stores and feature stores are configured separately
Big segment stores are required if you want to use big segments with a server-side SDK. In the Ruby SDK, big segment stores are defined with a `*new_big_segment_store` function, for example `Redis.new_big_segment_store()`, and with the `big_segments` options.
Feature stores are used if you want to cache flag data in an external database, rather than in local memory. In the Ruby SDK, feature stores are defined with a `*new_feature_store` function, and with the `feature_store` options. To learn more, read [Storing data](/docs/sdk/features/storing-data#ruby).
To learn more about the available configuration options, read [`BigSegmentsConfig`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/BigSegmentsConfig.html).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs