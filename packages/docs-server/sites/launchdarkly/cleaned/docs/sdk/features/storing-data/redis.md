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
 * [How the SDKs store data in Redis](#how-the-sdks-store-data-in-redis)
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [C++ (server-side)](#c-server-side)
 * [Erlang](#erlang)
 * [Go](#go)
 * [Haskell](#haskell)
 * [Java](#java)
 * [Lua](#lua)
 * [Node.js (server-side)](#nodejs-server-side)
 * [PHP](#php)
 * [Python](#python)
 * [Ruby](#ruby)
## Overview
This topic explains how to use the SDK Redis integration as a persistent feature store.
Many of our server-side SDKs support Redis. The available options are slightly different in each language, but you can always specify the following:
 * The Redis host address, which defaults to `localhost:6379`
 * A prefix string to add to all keys used by the store, to avoid collisions in case the database is also being used for some other purpose
 * The length of time that recently read or updated data should be cached in memory
##### Supported Redis configurations
The LaunchDarkly SDKs use third-party open-source libraries to connect to Redis. Not all of these have the same level of support for advanced Redis configurations. Specifically, most of the SDKs and the [Relay Proxy](/docs/sdk/relay-proxy) do not support connecting to a Redis cluster or using Redis Sentinel for service discovery.
To learn more, read the documentation for the individual SDKs below, or their Redis integration add-on libraries for SDKs that do not have this integration built in.
## How the SDKs store data in Redis
The Redis integrations for all LaunchDarkly server-side SDKs use the same conventions, so that SDK instances and Relay Proxy instances sharing a single Redis store can interoperate correctly.
The storage schema is as follows:
 * There is always a “prefix” string that provides a namespace for the overall data set. If you do not specify a prefix in your configuration, it is `launchdarkly`. If you are using a persistent store integration, it must be the client-side ID for the environment.
 * For each type of data that the SDK can store, there is a hash whose key is `PREFIX:TYPE`. `PREFIX` is the configured prefix string. `TYPE` denotes the type of data such as `features` and `segments`.
 * Within each hash, there is one field per data item. For instance, the hash `PREFIX:features` has one field per feature flag. The field name is the unique key of the item, such as the flag key for a feature flag, and the value is a serialized representation of that item, in a format that is determined by the SDK.
 * An additional key, `PREFIX:$inited`, is created with an arbitrary value when the SDK stores a full set of feature flag data. This allows a new SDK instance to check whether there is already a valid data set that was stored earlier.
 * The SDK may use additional keys starting with the `PREFIX` string, so you should not assume that the `TYPE` values mentioned above and `$inited` are the only possible keys. The SDK never adds, modifies, or removes any keys in Redis other than ones starting with the `PREFIX`, so it is safe to share a Redis instance that is also being used for other purposes.
## Server-side SDKs
In the following examples, the Redis feature store is set to use a host address of `my-redis:6379`, a prefix string of `"my-key-prefix"`, and a cache TTL of 15 or 30 seconds, depending on the SDK.
##### Using a persistent store for segments requires a specific key prefix
If you are using a persistent store integration, the value of the key prefix for the persistent store must be the client-side ID of your environment.
Your environment’s client-side ID is available in the **Environments** list for your project. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
This feature is available in the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/storing-data/redis#net-server-side)
 * [C++ (server-side)](/docs/sdk/features/storing-data/redis#c-server-side)
 * [Erlang](/docs/sdk/features/storing-data/redis#erlang)
 * [Go](/docs/sdk/features/storing-data/redis#go)
 * [Haskell](/docs/sdk/features/storing-data/redis#haskell)
 * [Java](/docs/sdk/features/storing-data/redis#java)
 * [Lua](/docs/sdk/features/storing-data/redis#lua)
 * [Node.js (server-side)](/docs/sdk/features/storing-data/redis#nodejs-server-side)
 * [PHP](/docs/sdk/features/storing-data/redis#php)
 * [Python](/docs/sdk/features/storing-data/redis#python)
 * [Ruby](/docs/sdk/features/storing-data/redis#ruby)
### .NET (server-side)
###### Expand .NET (server-side) code sample
To use Redis with the .NET SDK you must install an additional package named [`LaunchDarkly.ServerSdk.Redis`](https://github.com/launchdarkly/dotnet-server-sdk-redis).
C#
```
1
| using LaunchDarkly.Sdk.Server;
---|--- 
2
| using LaunchDarkly.Sdk.Server.Integrations;
3
| var config = Configuration.Builder(sdkKey)
4
| .DataStore(
5
| Components.PersistentDataStore(
6
| Redis.DataStore()
7
| .HostAndPort("my-redis", 6379)
8
| .Prefix("my-key-prefix")
9
| ).CacheSeconds(30)
10
| )
11
| .Build();
12
| var client = new LDClient(config);
```
To learn more, read [`dotnet-server-sdk-redis`](https://github.com/launchdarkly/dotnet-server-sdk-redis).
### C++ (server-side)
###### Expand C++ (server-side) code sample
The C++ integration is part of the main SDK distribution, but is disabled by default in order to avoid bringing in unnecessary dependencies ([`redis++`](https://github.com/sewenew/redis-plus-plus), a wrapper for [`hiredis`](https://github.com/redis/hiredis)).
To ensure the integration header and library are available for your build, set the CMake option `LD_BUILD_REDIS_SUPPORT=ON`.
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x (native)
```
1
| // Make sure to include the redis source's header.
---|--- 
2
| #include <launchdarkly/server_side/integrations/redis/redis_source.hpp>
3
| 
4
| using namespace launchdarkly::server_side;
5
| 
6
| using LazyLoad = config::builders::LazyLoadBuilder;
7
| 
8
| ConfigBuilder config_builder(sdk_key);
9
| 
10
| auto redis_source = integrations::RedisDataSource::Create("redis://localhost:6379", "my-key-prefix");
11
| 
12
| if (!redis_source) {
13
| /* redis config is invalid, cannot proceed */
14
| }
15
| 
16
| config_builder.DataSystem().Method(
17
| LazyLoad().Source(*redis_source).CacheRefresh(std::chrono::seconds(15))
18
| );
19
| 
20
| auto config = config_builder.Build();
21
| if (!config) {
22
| /* an error occurred, config is not valid */
23
| }
```
### Erlang
The Erlang integration is part of the main SDK distribution.
###### Expand Erlang code sample
ErlangErlang with TLS
```
1
| LdOptions = #{
---|--- 
2
| redis_host => "redis",
3
| redis_port => "6379",
4
| redis_prefix => "default",
5
| feature_store => ldclient_storage_redis,
6
| cache_ttl => 15
7
| },
8
| ldclient:start_instance("sdk-key-123abc", LdOptions).
```
### Go
###### Expand Go code sample
The Go integration is in [`github.com/launchdarkly/go-server-sdk-redis-redigo`](https://github.com/launchdarkly/go-server-sdk-redis-redigo) for 5.0.0 or higher of the SDK. In earlier SDK versions, it is in the main SDK distribution as the subpackage `redis`.
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
| config.DataStore = ldcomponents.PersistentDataStore(
11
| ldredis.DataStore().
12
| HostAndPort("my-redis", 6379).
13
| Prefix("my-key-prefix"),
14
| ).CacheSeconds(30)
15
| client, _ := ld.MakeCustomClient(sdkKey, config, 5*time.Second)
```
To learn more, read [`go-server-sdk-redis-redigo`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk-redis-redigo).
### Haskell
###### Expand Haskell code sample
To use Redis with the Haskell SDK, you must install an additional package.
If you are working with version 4.0 of the Haskell SDK, use [`launchdarkly-server-sdk-redis-hedis`](https://hackage.haskell.org/package/launchdarkly-server-sdk-redis-hedis), which is in a separate repository. It is compatible with version 4.0 and higher of the Haskell SDK.
If you are working with versions 3.x and earlier, use [`launchdarkly-server-sdk-redis`](https://github.com/launchdarkly/haskell-server-sdk/tree/3.x/stores/launchdarkly-server-sdk-redis).
Haskell
```
1
| import qualified Database.Redis as R
---|--- 
2
| import LaunchDarkly.Server
3
| import LaunchDarkly.Server.Store.Redis
4
| 
5
| main = do
6
| con <- R.checkedConnect R.defaultConnectInfo { R.connectHost = "my-redis:6379" }
7
| backend <- makeRedisStore $ redisConfigSetNamespace "my-key-prefix" $ makeRedisStoreConfig con
8
| 
9
| let config = configSetStoreBackend backend $ makeConfig "sdk-key-123abc"
10
| 
11
| client <- makeClient config
```
### Java
###### Expand Java code sample
You must install the additional package [`com.launchdarkly.launchdarkly-java-server-sdk-redis-store`](https://github.com/launchdarkly/java-server-sdk-redis).
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
| LDConfig config = new LDConfig.Builder()
5
| .dataStore(
6
| Components.persistentDataStore(
7
| Redis.dataStore().uri(URI.create("redis://my-redis:6379"))
8
| .prefix("my-key-prefix")
9
| ).cacheSeconds(30)
10
| )
11
| .build();
12
| LDClient client = new LDClient(sdkKey, config);
```
To learn more, read [`java-server-sdk-redis`](https://github.com/launchdarkly/java-server-sdk-redis).
### Lua
###### Expand Lua code sample
When you use Redis for storing data, you also need to include `launchdarkly_server_sdk_redis`:
Lua SDK v2Lua SDK v1.x
```
1
| local l = require("launchdarkly_server_sdk")
---|--- 
2
| local r = require("launchdarkly_server_sdk_redis")
3
| 
4
| local redis = r.makeRedisSource("redis://localhost:6379", "your-key-prefix")
5
| local config = {
6
| dataSystem = {
7
| lazyLoad = {
8
| source = redis
9
| }
10
| }
11
| }
12
| 
13
| local c = l.clientInit("sdk-key-123abc", 1000, config)
```
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
In version 8.0.0 and higher of the Node.js SDK, you must install the additional package [`@launchdarkly/node-server-sdk-redis`](https://github.com/launchdarkly/js-core/tree/main/packages/store/node-server-sdk-redis). In versions 6.0.0-7.x of the Node.js SDK, you must install the additional package [`launchdarkly-node-server-sdk-redis`](https://github.com/launchdarkly/node-server-sdk-redis).
In version 3.0 and higher of the Node.js SDK Redis integration, the [`ioredis`](https://github.com/redis/ioredis) package is used for Redis operations. In versions 2.x of the Node.js SDK Redis integration, the [`redis`](https://github.com/redis/node-redis) package is used for Redis operations.
Node.js SDK v8.x (JavaScript)Node.js SDK v8.x (TypeScript)Node.js SDK v7.x and earlier (JavaScript)Node.js SDK v7.x and earlier (TypeScript)
```
1
| const ld = require('@launchdarkly/node-server-sdk');
---|--- 
2
| const RedisFeatureStore = require('@launchdarkly/node-server-sdk-redis');
3
| 
4
| const store = RedisFeatureStore({
5
| redisOpts: { host: 'redis-host', port: 6379 },
6
| prefix: 'your-key-prefix',
7
| cacheTTL: 30,
8
| });
9
| 
10
| const options = {
11
| featureStore: store
12
| };
13
| const client = ld.init(sdkKey, options);
```
### PHP
###### Expand PHP code sample
There are two Redis integrations for the PHP SDK. One uses the [Predis](https://github.com/predis/predis) package, which can be used in any PHP environment. The other uses the more efficient [`phpredis`](https://github.com/phpredis/phpredis) extension, which must be installed in PHP itself. Both of these integrations are in v2, which is compatible with the PHP SDK v6.4 and later.
In version 4.0 and higher of the PHP SDK, you must add a package to your application’s Composer dependencies to use one of these two integrations:
 * For the Predis integration, add `launchdarkly/server-sdk-redis-predis`.
 * For the `phpredis` integration, add `launchdarkly/server-sdk-redis-phpredis`.
To use the Predis integration:
PHP SDK v6.4+PHP SDK v6.3 and earlier
```
1
| $redisClient = new Predis\Client([
---|--- 
2
| 'host' => 'my-redis',
3
| 'port' => 6379
4
| ]);
5
| 
6
| $fr = LaunchDarkly\Integrations\Redis::featureRequester($redisClient, ['prefix' => 'my-key-prefix']);
7
| $client = new LaunchDarkly\LDClient("sdk-key-123abc", [
8
| 'feature_requester' => $fr
9
| ]);
```
To use the `phpredis` integration:
PHP
```
1
| $fr = LaunchDarkly\Integrations\PHPRedis::featureRequester([
---|--- 
2
| 'redis_host' => 'my-redis',
3
| 'redis_port' => 6379,
4
| 'redis_prefix' => 'my-key-prefix'
5
| ]);
6
| $client = new LaunchDarkly\LDClient("sdk-key-123abc", [
7
| 'feature_requester' => $fr
8
| ]);
```
To learn more, read [`php-server-sdk-redis-predis`](https://github.com/launchdarkly/php-server-sdk-redis-predis) or [`php-server-sdk-redis-phpredis`](https://github.com/launchdarkly/php-server-sdk-redis-phpredis).
### Python
###### Expand Python code sample
The Python integration is part of the main SDK distribution, but you must also install the package `redis`.
Python
```
1
| import ldclient
---|--- 
2
| from ldclient.config import Config
3
| from ldclient.feature_store import CacheConfig
4
| from ldclient.integrations import Redis
5
| 
6
| store = Redis.new_feature_store(url='redis://my-redis:6379',
7
| prefix='my-key-prefix', caching=CacheConfig(expiration=30))
8
| 
9
| config = Config(feature_store=store)
10
| ldclient.set_config(config)
```
### Ruby
###### Expand Ruby code sample
The Ruby integration is part of the main SDK distribution, but you must also install the gems `redis` and `connection_pool`.
Ruby
```
1
| require 'ldclient-rb'
---|--- 
2
| 
3
| store = LaunchDarkly::Integrations::Redis.new_feature_store(
4
| redis_url: 'redis://my-redis:6379',
5
| prefix: 'my-key-prefix',
6
| expiration: 30
7
| )
8
| 
9
| config = LaunchDarkly::Config.new(
10
| feature_store: store
11
| )
12
| client = LaunchDarkly::Client.new(sdk_key, config)
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs