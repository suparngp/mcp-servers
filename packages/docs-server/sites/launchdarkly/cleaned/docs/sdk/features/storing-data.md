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
 * [Using external databases as persistent feature stores](#using-external-databases-as-persistent-feature-stores)
 * [Using a persistent feature store while still connecting to LaunchDarkly](#using-a-persistent-feature-store-while-still-connecting-to-launchdarkly)
 * [Using a persistent feature store without connecting to LaunchDarkly](#using-a-persistent-feature-store-without-connecting-to-launchdarkly)
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
This topic explains which external databases each server-side SDK can use to store flag data.
By default, all our SDKs work with an in-memory feature store. This feature store requires no additional configuration. However, data in in-memory feature stores are not persistent. This means when you restart your application, your SDK reloads the entire store’s contents.
Persistent feature stores solve this problem by persisting their data so that they can be used across application restarts.
## Using external databases as persistent feature stores
By default, LaunchDarkly’s server-side SDKs connect to LaunchDarkly and receive feature flag data, store the flags in local memory, and update them when prompted to by LaunchDarkly. This collection of last known flag data is cached in the “feature store” or “data store”, and cached values have no expiration or time-to-live (TTL) value.
To learn more, read [Persistent data stores](/docs/sdk/concepts/data-stores).
Alternatively, you can configure an external database to act as a feature store. The SDKs in this topic can use one or more of these three caching options to hold their flag data:
 * [Consul](/docs/sdk/features/storing-data/consul)
 * [DynamoDB](/docs/sdk/features/storing-data/dynamodb)
 * [Redis](/docs/sdk/features/storing-data/redis)
Whichever database you use, there are two ways to use it:
 * Exactly like the default configuration, except substituting a [database for the in-memory store while connecting to LaunchDarkly](/docs/sdk/features/storing-data#using-a-persistent-feature-store-while-still-connecting-to-launchdarkly), or
 * Using [_only_ the database as a source of flag data, without connecting to LaunchDarkly](/docs/sdk/features/storing-data#using-a-persistent-feature-store-without-connecting-to-launchdarkly).
In both configurations, you can control when the SDK checks the database, as opposed to in-memory caching, using the cache time-to-live (TTL) configuration option for your SDK.
There is a tradeoff here that will be different for each customer. Most customers find that it’s generally unacceptable from a performance standpoint to read from the database on every flag evaluation. If you prefer faster evaluations and can accept some stale data, you can have the SDK check the in-memory caching more frequently. If you prefer fresher data and can accept slower evaluations, you can have the SDK check the database more frequently.
As long as the cache is fresh, evaluations will use the cache, even if the external database is unavailable. After the cache expires, the SDK attempts to re-read from the database. If the database is unavailable, the SDK returns flag fallback values.
### Using a persistent feature store while still connecting to LaunchDarkly
In this configuration, the SDK receives feature flag data from LaunchDarkly and puts it in the feature store. The only difference is that the store is in a database.
When flags are evaluated, the SDK checks the database to get the latest flag state, usually with some form of in-memory caching. If you have a persistent feature store that has already been populated, the SDK can still evaluate flags using the last known flag state from the store until newer data is available from LaunchDarkly.
To set up this configuration, most people create some kind of object for the specific type of database and put it in the client configuration’s feature store property. In PHP, this property is called the “feature requester.”
If there are multiple instances of your application configured to store data in the same database, those multiple instances may overwrite each other’s data. This is not a problem because each instance receives feature flags from LaunchDarkly, so the copy of the data should be identical. However, it is inefficient. Instead, you may want to use a persistent feature store without connecting to LaunchDarkly, as described below.
### Using a persistent feature store without connecting to LaunchDarkly
This is similar to the previous configuration: When flags are evaluated, the SDK checks the database to get the latest flag state, usually with some form of in-memory caching. However, in this configuration the SDK does not connect to LaunchDarkly at all. Instead, it relies on some other process which _does_ have a LaunchDarkly connection to write the latest flag data to the database, where the SDK will then read it.
The other process could be the Relay Proxy in offline or daemon mode, or any other application that creates an SDK client with the same persistent store. To learn more about the Relay Proxy, read [The Relay Proxy](/docs/sdk/relay-proxy).
The Relay Proxy is also known as the LaunchDarkly Daemon, so some versions of the SDKs refer to this mode as “LDD mode.” Creating the client is the same as above in terms of specifying the persistent store, but you must also add an option to make the SDK _not_ connect to LaunchDarkly.
## Server-side SDKs
This feature is available in the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/storing-data#net-server-side)
 * [C++ (server-side)](/docs/sdk/features/storing-data#c-server-side)
 * [Erlang](/docs/sdk/features/storing-data#erlang)
 * [Go](/docs/sdk/features/storing-data#go)
 * [Haskell](/docs/sdk/features/storing-data#haskell)
 * [Java](/docs/sdk/features/storing-data#java)
 * [Lua](/docs/sdk/features/storing-data#lua)
 * [Node.js (server-side)](/docs/sdk/features/storing-data#nodejs-server-side)
 * [PHP](/docs/sdk/features/storing-data#php)
 * [Python](/docs/sdk/features/storing-data#python)
 * [Ruby](/docs/sdk/features/storing-data#ruby)
### .NET (server-side)
###### Expand .NET (server-side) code sample
The .NET SDK can use [Consul](/docs/sdk/features/storing-data/consul#net-server-side), [DynamoDB](/docs/sdk/features/storing-data/dynamodb#net-server-side), or [Redis](/docs/sdk/features/storing-data/redis#net-server-side) to hold flag data.
To use a persistent feature store while connecting to LaunchDarkly:
C#
```
1
| using LaunchDarkly.Sdk.Server;
---|--- 
2
| using LaunchDarkly.Sdk.Server.Integrations;
3
| 
4
| var config = Configuration.Builder(sdkKey)
5
| .DataStore(
6
| Components.PersistentDataStore(
7
| SomeDatabaseName.DataStore()
8
| )
9
| )
10
| .Build();
```
To learn more, read [`ConfigurationBuilder.DataStore`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.ConfigurationBuilder.html#DataStore).
To use a persistent feature store without connecting to LaunchDarkly, use the `DataStore` builder method as above, and then use [`Components.ExternalUpdatesOnly`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Components.html#LaunchDarkly_Sdk_Server_Components_ExternalUpdatesOnly) to configure daemon mode. To learn more, read [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#net-server-side).
### C++ (server-side)
###### Expand C++ (server-side) code sample
The C++ SDK can use [Redis](/docs/sdk/features/storing-data/redis#c-server-side) to hold flag data.
In the C++ SDK v3.0, you cannot use a persistent feature store while connecting to LaunchDarkly.
To use a persistent feature store without having the SDK connect to LaunchDarkly, use the `LazyLoadBuilder`. The SDK reads flag data from the persistent store lazily, in the background.
Here’s how:
C++ SDK v3.0 (native)
```
1
| using LazyLoad = server_side::config::builders::LazyLoadBuilder;
---|--- 
2
| 
3
| auto config_builder = server_side::ConfigBuilder(sdk_key);
4
| 
5
| auto some_source = YourDatabaseIntegration();
6
| 
7
| config_builder.DataSystem().Method(
8
| LazyLoad().Source(some_source)
9
| );
10
| 
11
| auto config = config_builder.Build();
12
| if (!config) {
13
| /* an error occurred, config is not valid */
14
| }
```
To learn more, read [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#c-server-side) and [`LazyLoadBuilder`](https://launchdarkly.github.io/cpp-sdks/libs/server-sdk/docs/html/structlaunchdarkly_1_1server__side_1_1config_1_1builders_1_1LazyLoadBuilder.html).
### Erlang
###### Expand Erlang code sample
The Erlang SDK can use [Redis](/docs/sdk/features/storing-data/redis#erlang) to hold flag data.
To use a persistent feature store while connecting to LaunchDarkly:
Erlang
```
1
| LdOptions = #{
---|--- 
2
| feature_store => your_feature_store
3
| },
4
| ldclient:start_instance("sdk-key-123abc", LdOptions).
```
To use a persistent feature store without connecting to LaunchDarkly, set the `feature_store` property as above, and then set the `use_ldd` option to configure daemon mode. To learn more, read [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#erlang).
### Go
###### Expand Go code sample
The Go SDK can use [Consul](/docs/sdk/features/storing-data/consul#go), [DynamoDB](/docs/sdk/features/storing-data/dynamodb#go), or [Redis](/docs/sdk/features/storing-data/redis#go) to hold flag data.
To use a persistent feature store while connecting to LaunchDarkly:
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
| examplepackage "github.com/launchdarkly/go-server-sdk-some-example-database"
7
| )
8
| 
9
| var config ld.Config
10
| config.DataStore = ldcomponents.PersistentDataStore(
11
| examplepackage.DataStore().SomeStoreOptions(),
12
| )
13
| client, _ := ld.MakeCustomClient(sdkKey, config, 5*time.Second)
```
To learn more, read [`PersistentDataStore`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7/ldcomponents#PersistentDataStore).
To use a persistent feature store without connecting to LaunchDarkly, use `PersistentDataStore()` as above, and then use [`ExternalUpdatesOnly()`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7/ldcomponents#ExternalUpdatesOnly) to configure daemon mode. To learn more, read [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#go).
### Haskell
###### Expand Haskell code sample
The Haskell SDK can use [Redis](/docs/sdk/features/storing-data/redis#haskell) to hold flag data.
To use a persistent feature store while connecting to LaunchDarkly:
Haskell
```
1
| import LaunchDarkly.Server
---|--- 
2
| 
3
| main = do
4
| backend <- makeYourBackendInterface
5
| 
6
| let config = configSetStoreBackend backend $ makeConfig "sdk-key-123abc"
7
| 
8
| client <- makeClient config
```
To use a persistent feature store without connecting to LaunchDarkly, use `configSetStoreBackend` as above, and then use `configSetUseLdd` to configure daemon mode. To learn more, read [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#haskell).
### Java
###### Expand Java code sample
The Java SDK can use [Consul](/docs/sdk/features/storing-data/consul#java), [DynamoDB](/docs/sdk/features/storing-data/dynamodb#java), or [Redis](/docs/sdk/features/storing-data/redis#java) to hold flag data.
To use a persistent feature store while connecting to LaunchDarkly:
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
| SomeDatabaseName.dataStore(storeOptions)
8
| )
9
| )
10
| .build();
11
| LDClient client = new LDClient(sdkKey, config);
```
To learn more, read [`Components.persistentDataStore`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/Components.html#persistentDataStore-com.launchdarkly.sdk.server.subsystems.ComponentConfigurer-).
To use a persistent feature store without connecting to LaunchDarkly, use `persistentDataStore` as above, and then use [`externalUpdatesOnly`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/Components.html#externalUpdatesOnly--) to configure daemon mode. To learn more, read [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#java).
### Lua
###### Expand Lua code sample
The Lua SDK can use [Redis](/docs/sdk/features/storing-data/redis#lua) to hold flag data. The module `launchdarkly_server_sdk_redis` caches the feature flag data.
In the Lua SDK v2, you cannot use a persistent feature store while connecting to LaunchDarkly.
To use a persistent feature store without having the SDK connect to LaunchDarkly, specify a `lazyLoad` data source. The SDK reads flag data from the persistent store lazily, in the background.
Here’s how:
Lua SDK v2
```
1
| local config = {
---|--- 
2
| dataSystem = {
3
| lazyLoad = {
4
| source = makeYourSource()
5
| }
6
| }
7
| }
```
In the Lua SDK v1, you can use a feature store while connecting to LaunchDarkly.
###### Expand Lua code sample for older versions
To use a persistent feature store while connecting to LaunchDarkly:
Lua SDK v1.x
```
1
| local l = require("launchdarkly_server_sdk")
---|--- 
2
| 
3
| local backend = makeYourBackendInterface()
4
| 
5
| local c = l.clientInit({
6
| key = "sdk-key-123abc",
7
| featureStoreBackend = backend
8
| )}
```
To learn more, read [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#lua).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
The Node.js SDK can use [Consul](/docs/sdk/features/storing-data/consul#nodejs-server-side), [DynamoDB](/docs/sdk/features/storing-data/dynamodb#nodejs-server-side), or [Redis](/docs/sdk/features/storing-data/redis#nodejs-server-side) to hold flag data.
To use a persistent feature store while connecting to LaunchDarkly:
Node.js SDK v8.x (JavaScript)Node.js SDK v8.x (TypeScript)Node.js SDK v7.x (JavaScript)Node.js SDK v7.x (TypeScript)
```
1
| import { init } from '@launchdarkly/node-server-sdk';
---|--- 
2
| 
3
| const store = SomeKindOfFeatureStore(storeOptions);
4
| const options = {
5
| featureStore: store
6
| };
7
| const client = init('sdk-key-123abc', options);
```
To use a persistent feature store without connecting to LaunchDarkly, set the `featureStore` property as above, and then set the `useLdd` property to configure daemon mode. To learn more, read [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#nodejs-server-side).
### PHP
###### Expand PHP code sample
The PHP SDK can use [Consul](/docs/sdk/features/storing-data/consul), [DynamoDB](/docs/sdk/features/storing-data/dynamodb), or [Redis](/docs/sdk/features/storing-data/redis) to get flag data.
Unlike other server-side SDKs, the PHP SDK cannot connect to LaunchDarkly while using a database as a backing store. It can only read from a database that has been populated by the [Relay Proxy](/docs/sdk/relay-proxy), or by another application that uses a server-side LaunchDarkly SDK. To learn more, read [Using daemon mode](/docs/sdk/relay-proxy/sdk-config#using-daemon-mode).
Another difference from other SDKs is that the PHP SDK does not have an in-memory cache for database queries. This is because in PHP, the entire in-memory application state is normally discarded after each request. Therefore, code examples for PHP do not include a cache TTL parameter.
To read from a persistent feature store without connecting to LaunchDarkly:
PHP
```
1
| $client = new LaunchDarkly\LDClient("sdk-key-123abc", [
---|--- 
2
| 'feature_requester' => LaunchDarkly\Integrations\NameOfDatabase::featureRequester()
3
| ]);
```
Prior to version 4.0, the database integrations were included in the main PHP SDK package. Starting in version 4.0, they are in separate packages.
### Python
###### Expand Python code sample
The Python SDK can use [Consul](/docs/sdk/features/storing-data/consul), [DynamoDB](/docs/sdk/features/storing-data/dynamodb), or [Redis](/docs/sdk/features/storing-data/redis) to hold flag data.
To use a persistent feature store while connecting to LaunchDarkly:
Python
```
1
| import ldclient
---|--- 
2
| from ldclient.config import Config
3
| 
4
| store = SomeKindOfFeatureStore(store_options)
5
| config = Config(feature_store=store)
6
| ldclient.set_config(config)
```
To use a persistent feature store without connecting to LaunchDarkly, set the `feature_store` property as above, and then set the `use_ldd` property to configure daemon mode. To learn more, read [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#python).
### Ruby
###### Expand Ruby code sample
The Ruby SDK can use [Consul](/docs/sdk/features/storing-data/consul), [DynamoDB](/docs/sdk/features/storing-data/dynamodb), or [Redis](/docs/sdk/features/storing-data/redis) to hold flag data.
These adapters are implemented in the `LaunchDarkly::Integrations::Redis`, `LaunchDarkly::Integrations::DynamoDB`, and `LaunchDarkly::Integrations::Consul` modules. To use them, call the `new_feature_store` method in the module, and put the returned object in the `feature_store` property of your client configuration.
To use a persistent feature store while connecting to LaunchDarkly:
Ruby
```
1
| require 'ldclient-rb'
---|--- 
2
| 
3
| store = SomeKindOfFeatureStore.new(storeOptions)
4
| config = LaunchDarkly::Config.new(
5
| feature_store: store
6
| )
7
| client = LaunchDarkly::Client.new(sdk_key, config)
```
To use a persistent feature store without connecting to LaunchDarkly, set the `feature_store` property as above, and then set the `use_ldd` property to configure daemon mode. To learn more, read [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#ruby).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs