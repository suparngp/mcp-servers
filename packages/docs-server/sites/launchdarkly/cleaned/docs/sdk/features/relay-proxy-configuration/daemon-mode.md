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
 * [Rust](#rust)
## Overview
Each SDK connects to several LaunchDarkly web services. These include services for getting feature flag data via streaming or polling, and a service for storing analytics events. By default, the SDK connects directly to LaunchDarkly for these services.
If you are using the Relay Proxy, you must configure the SDK so that it connects to the Relay Proxy for these services instead.
To use the Relay Proxy in **daemon** mode, you must first configure your server-side SDK to use a persistent data store. The SDK and the Relay Proxy must use the same data store. To configure your SDK to use a persistent data store, read [Storing Data](/docs/sdk/features/storing-data).
Then, you must configure your SDK to use daemon mode, as shown in the following examples. When you use the Relay Proxy in daemon mode, the SDK must not connect to any service for flag data.
##### Different SDKs have different names for daemon mode
When you configure the SDK so that it connects to the Relay Proxy, rather than to LaunchDarkly, for getting feature feature flag data, this mode has different names in different SDKs and SDK versions.
Some versions of the SDKs refer to this as using “external updates only.” Other versions of the SDKs refer to this as “LDD mode,” because the Relay Proxy was previously known as the LaunchDarkly Daemon. Some SDKs, such as the C++ (server-side) SDK, refer to this mode as “lazy load,” because flag data is loaded from the persistent store lazily, on demand as the SDK requests it. In most SDKs, you then need to pass the configuration in as a parameter when you initialize the client. To learn more, read [Configuration](/docs/sdk/features/config).
This feature is not available for client-side SDKs because in daemon mode, the SDK connects directly to the Relay Proxy’s data store. This is not a supported behavior for client-side SDKs.
## Server-side SDKs
This feature is available for the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/relay-proxy-configuration/daemon-mode#net-server-side)
 * [C++ (server-side)](/docs/sdk/features/relay-proxy-configuration/daemon-mode#c-server-side)
 * [Erlang](/docs/sdk/features/relay-proxy-configuration/daemon-mode#erlang)
 * [Go](/docs/sdk/features/relay-proxy-configuration/daemon-mode#go)
 * [Haskell](/docs/sdk/features/relay-proxy-configuration/daemon-mode#haskell)
 * [Java](/docs/sdk/features/relay-proxy-configuration/daemon-mode#java)
 * [Lua](/docs/sdk/features/relay-proxy-configuration/daemon-mode#lua)
 * [Node.js (server-side)](/docs/sdk/features/relay-proxy-configuration/daemon-mode#nodejs-server-side)
 * [PHP](/docs/sdk/features/relay-proxy-configuration/daemon-mode#php)
 * [Python](/docs/sdk/features/relay-proxy-configuration/daemon-mode#python)
 * [Ruby](/docs/sdk/features/relay-proxy-configuration/daemon-mode#ruby)
 * [Rust](/docs/sdk/features/relay-proxy-configuration/daemon-mode#rust)
### .NET (server-side)
###### Expand .NET (server-side) code sample
Use the `DataStore` builder method to set a persistent feature store. Then, use the `DataSource` builder method and `Components.ExternalUpdatesOnly` to configure daemon mode:
C#
```
1
| var config = Configuration.Builder("sdk-key-123abc")
---|--- 
2
| .DataStore(
3
| Components.PersistentDataStore(
4
| SomeDatabaseName.DataStore()
5
| )
6
| )
7
| .DataSource(Components.ExternalUpdatesOnly)
8
| .Build();
```
### C++ (server-side)
###### Expand C++ (server-side) code sample
Use `LazyLoadBuilder` to set a persistent feature store:
C++ SDK v3.0 (native)C SDK v2.x (native)
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
### Erlang
###### Expand Erlang code sample
Set the `feature_store` property to use a persistent data store. Then set the `use_ldd` property to configure daemon mode:
Erlang
```
1
| ldclient:start_instance("sdk-key-123abc", #{
---|--- 
2
| use_ldd => true,
3
| feature_store => your_feature_store
4
| })
```
### Go
###### Expand Go code sample
Use `PersistentDataStore()` to set the persistent data store. Then, use `ExternalUpdatesOnly()` to configure daemon mode:
Go
```
1
| config := ld.Config{
---|--- 
2
| DataStore: ldcomponents.PersistentDataStore(
3
| examplepackage.DataStore().SomeStoreOptions(),
4
| ),
5
| DataSource: ldcomponents.ExternalUpdatesOnly(),
6
| }
```
### Haskell
###### Expand Haskell code sample
Use `configSetStoreBackend` to set the persistent data store. Then, use `configSetUseLdd` to configure daemon mode:
Haskell
```
1
| {-# LANGUAGE OverloadedStrings #-}
---|--- 
2
| 
3
| import LaunchDarkly.Server.Config
4
| 
5
| import Data.Function ((&))
6
| 
7
| config :: Config
8
| config = (makeConfig "sdk-key-123abc")
9
| & configSetUseLdd true
10
| & configSetStoreBackend backend
```
### Java
###### Expand Java code sample
Set the `dataStore` property to `persistentDataStore()` to use the persistent data store. Then, set the `dataSource` property to `externalUpdatesOnly()` to configure daemon mode:
Java
```
1
| LDConfig config = new LDConfig.Builder()
---|--- 
2
| .dataStore(
3
| Components.persistentDataStore(
4
| SomeDatabaseName.DataStore(storeOptions)
5
| )
6
| )
7
| .dataSource(Components.externalUpdatesOnly())
8
| .build();
```
### Lua
###### Expand Lua code sample
Specify a `lazyLoad` data source to set a persistent feature store:
Lua SDK v2Lua SDK v1.x
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
To learn more about the configuration options, read [`clientInit`](https://launchdarkly.github.io/lua-server-sdk/modules/launchdarkly-server-sdk.html#clientInit).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
Set the `featureStore` property to use a persistent feature store. Then, set the `useLdd` property to configure daemon mode:
Node.js SDK v8.x (TypeScript)Node.js SDK v7.x (JavaScript)Node.js SDK v7.x (TypeScript)
```
1
| import * as ld from '@launchdarkly/node-server-sdk';
---|--- 
2
| 
3
| const store = SomeKindOfFeatureStore(storeOptions);
4
| 
5
| const options: ld.LDOptions = {
6
| featureStore: store,
7
| useLdd: true,
8
| };
```
### PHP
###### Expand PHP code sample
Set the `feature_requester` property to use a persistent data store and daemon mode:
PHP
```
1
| $client = new LaunchDarkly\LDClient("sdk-key-123abc",
---|--- 
2
| [ 'feature_requester' => LaunchDarkly\Integrations\NameOfDatabase::featureRequester() ]);
```
### Python
###### Expand Python code sample
Set the `feature_store` property to use a persistent data store. Then, set the `use_ldd` property to configure daemon mode:
Python
```
1
| store = SomeKindOfFeatureStore(store_options)
---|--- 
2
| 
3
| config = Config(
4
| feature_store=store,
5
| use_ldd=True)
```
### Ruby
###### Expand Ruby code sample
Set the `feature_store` property to use a persistent feature store. Then, set the `use_ldd` property to configure daemon mode:
Ruby
```
1
| store = SomeKindOfFeatureStore.new(storeOptions)
---|--- 
2
| 
3
| config = LaunchDarkly::Config.new(
4
| feature_store: store,
5
| use_ldd: true
6
| )
```
### Rust
###### Expand Rust code sample
Using the `PersistentDataStoreBuilder`, provide a persistent store factory.
Enable daemon mode by calling `daemon_mode(true)` on the `ConfigBuilder`:
Rust
```
1
| use launchdarkly_server_sdk::{ConfigBuilder, PersistentDataStoreBuilder};
---|--- 
2
| 
3
| 
4
| let persistent_store_factory = SomeKindOfFeatureStore.new(storeOptions)
5
| let persistent_data_store_builder = PersistentDataStoreBuilder::new(Arc::new(persistent_store_factory));
6
| 
7
| let config = ConfigBuilder::new("sdk-key")
8
| .daemon_mode(true)
9
| .data_store(&builder)
10
| .build()
11
| .expect("config should build");
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs