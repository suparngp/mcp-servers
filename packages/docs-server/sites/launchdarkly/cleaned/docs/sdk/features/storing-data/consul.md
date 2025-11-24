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
 * [How the SDKs store data in Consul](#how-the-sdks-store-data-in-consul)
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [Go](#go)
 * [Java](#java)
 * [Node.js (server-side)](#nodejs-server-side)
 * [PHP](#php)
 * [Python](#python)
 * [Ruby](#ruby)
## Overview
This topic explains how to use the SDK Consul integration as a persistent feature store.
##### Data size limit in Consul
Consul does not support storing values greater than 512KB. Using Consul as a persistent feature store does not work if the JSON representation of any feature flag or segment exceeds that size. To learn more about these limitations, read [Consul’s documentation](https://www.consul.io/docs/troubleshoot/faq#q-what-is-the-per-key-value-size-limitation-for-consul-s-key-value-store).
To view the JSON representations of all flags and segments, query `https://sdk.launchdarkly.com/sdk/latest-all[](https://sdk.launchdarkly.com/sdk/latest-all)`, or `https://sdk.launchdarkly.com/sdk/poll` if using [data saving mode](/docs/sdk/features/data-saving-mode), with your SDK key in the `Authorization` header.
## How the SDKs store data in Consul
The Consul integrations for all LaunchDarkly server-side SDKs use the same conventions, so that SDK instances and Relay Proxy instances sharing a single Consul store can interoperate correctly.
The storage schema is as follows:
 * There is always a “prefix” string that provides a namespace for the overall data set. If you do not specify a prefix in your configuration, it is `launchdarkly`.
 * For each data item that the SDK can store, such as a feature flag, there is a Consul key-value pair where the key is `PREFIX/TYPE/KEY`. `PREFIX` is the configured prefix string. `TYPE` denotes the type of data such as `features` and `segments`. `KEY` is the unique key of the item. For example, a `KEY` could be the flag key for a feature flag. The value is a serialized representation of that item, in a format that is determined by the SDK.
 * An additional key, `PREFIX/$inited`, is created with an arbitrary value when the SDK stores a full set of feature flag data. This allows a new SDK instance to check whether there is already a valid data set that was stored earlier.
 * The SDK may use additional keys starting with the `PREFIX` string, so you should not assume that the `TYPE` values mentioned above and `$inited` are the only possible keys. But the SDK never adds, modifies, or removes any keys in Consul other than ones starting with the `PREFIX`, so it is safe to share a Consul instance that is also being used for other purposes.
## Server-side SDKs
In the following examples, the Consul feature store is set to use a host address of `my-consul:8100`, a prefix string of `"my-key-prefix"`, and a cache TTL of 30 seconds.
This feature is available in the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/storing-data/consul#net-server-side)
 * [Go](/docs/sdk/features/storing-data/consul#go)
 * [Java](/docs/sdk/features/storing-data/consul#java)
 * [Node.js (server-side)](/docs/sdk/features/storing-data/consul#nodejs-server-side)
 * [PHP](/docs/sdk/features/storing-data/consul#php)
 * [Python](/docs/sdk/features/storing-data/consul#python)
 * [Ruby](/docs/sdk/features/storing-data/consul#ruby)
### .NET (server-side)
###### Expand .NET (server-side) code sample
If using the .NET SDK, you must install the additional package [`LaunchDarkly.ServerSdk.Consul`](https://github.com/launchdarkly/dotnet-server-sdk-consul).
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
| Consul.DataStore().Address("http://my-consul:8100")
7
| ).CacheSeconds(30)
8
| )
9
| .Build();
10
| var client = new LDClient(config);
```
To learn more, read [`dotnet-server-sdk-consul`](https://github.com/launchdarkly/dotnet-server-sdk-consul).
### Go
###### Expand Go code sample
The Go integration is in [`github.com/launchdarkly/go-server-sdk-consul`](https://github.com/launchdarkly/go-server-sdk-consul) for version 5.0.0 or higher of the SDK. In versions 4.5.0 and higher, but below 5.0.0, it is in the main SDK distribution as the subpackage `ldconsul`.
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
| ldconsul "github.com/launchdarkly/go-server-sdk-consul"
7
| )
8
| 
9
| var config ld.Config
10
| config.DataStore = ldcomponents.PersistentDataStore(
11
| ldconsul.DataStore().
12
| Address("http://my-consul:8100").
13
| Prefix("my-key-prefix"),
14
| ).CacheSeconds(30)
15
| client, _ := ld.MakeCustomClient(sdkKey, config, 5*time.Second)
```
To learn more, read [`go-server-sdk-consul`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk-consul).
### Java
###### Expand Java code sample
If using the Java SDK, you must install the additional package [`com.launchdarkly.launchdarkly-java-server-sdk-consul-store`](https://github.com/launchdarkly/java-server-sdk-consul).
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
| Consul.dataStore().url(new URL("http://my-consul:8100"))
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
To learn more, read [`java-server-sdk-consul`](https://github.com/launchdarkly/java-server-sdk-consul).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
If using the Node.js SDK you must install the additional package [`launchdarkly-node-server-consul`](https://github.com/launchdarkly/node-server-sdk-consul).
##### SDK version compatibility
The Node.js (server-side) SDK v8.0 does not include Consul support. If you have questions or want to request this, [start a Support ticket](https://support.launchdarkly.com/hc/en-us/requests/new).
Node.js SDK v7.x (JavaScript)Node.js SDK v7.x (TypeScript)
```
1
| const ld = require('launchdarkly-node-server-sdk');
---|--- 
2
| const ConsulFeatureStore = require('launchdarkly-node-server-sdk-consul');
3
| 
4
| const store = ConsulFeatureStore({
5
| consulOptions: {
6
| host: 'your-consul',
7
| port: 8100
8
| },
9
| prefix: 'your-key-prefix',
10
| cacheTTL: 30
11
| });
12
| 
13
| const options = {
14
| featureStore: store
15
| };
16
| const client = ld.init('sdk-key-123abc', options);
```
### PHP
###### Expand PHP code sample
In version 4.0 and higher of the PHP SDK, you must add the package `launchdarkly/server-sdk-consul` to your application’s Composer dependencies to use the Consul integration.
In versions 3.x and earlier, the Consul integration is built into the main SDK package, but you must add a package dependency for `aws/sensiolabs/consul-php-sdk`.
To use the Consul integration:
PHP
```
1
| $fr = LaunchDarkly\Integrations\Consul::featureRequester([
---|--- 
2
| 'consul_uri' => 'http://my-consul:8100',
3
| 'consul_prefix' => 'my-key-prefix'
4
| ]);
5
| $client = new LaunchDarkly\LDClient("sdk-key-123abc", [
6
| 'feature_requester' => $fr
7
| ]);
```
To learn more, read [`php-server-sdk-consul`](https://github.com/launchdarkly/php-server-sdk-consul).
### Python
###### Expand Python code sample
The Python integration is part of the main SDK distribution as of version 6.8.1, but you must also install the package `python-consul`. Python 3.3 and 3.4 are not supported.
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
| from ldclient.integrations import Consul
5
| 
6
| store = Consul.new_feature_store(host='my-consul', port=8100,
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
The Ruby integration is part of the main SDK distribution as of version 5.1.1, but you must also install the gem `diplomat`.
Ruby
```
1
| require 'ldclient-rb'
---|--- 
2
| 
3
| store = LaunchDarkly::Integrations::Consul.new_feature_store(
4
| { url: 'http://my-consul:8100', prefix: 'my-key-prefix', expiration: 30 })
5
| 
6
| config = LaunchDarkly::Config.new(
7
| feature_store: store
8
| )
9
| client = LaunchDarkly::Client.new(sdk_key, config)
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs