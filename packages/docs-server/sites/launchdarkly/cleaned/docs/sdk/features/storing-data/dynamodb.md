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
 * [Setup and permissions](#setup-and-permissions)
 * [How the SDKs store data in DynamoDB](#how-the-sdks-store-data-in-dynamodb)
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [Go](#go)
 * [Java](#java)
 * [Node.js (server-side)](#nodejs-server-side)
 * [PHP](#php)
 * [Python](#python)
 * [Ruby](#ruby)
## Overview
This topic explains how to use the SDK DynamoDB integration as a persistent feature store.
##### Data size limit in DynamoDB
DynamoDB does not support storing values greater than 400KB, including the size of the column metadata. Using DynamoDB as a persistent feature store will not work if the JSON representation of any feature flag or segment exceeds that size. To learn more, read the [AWS documentation on item size](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html#limits-items).
To view the JSON representations of all flags and segments, query `https://sdk.launchdarkly.com/sdk/latest-all[](https://sdk.launchdarkly.com/sdk/latest-all)`, or `https://sdk.launchdarkly.com/sdk/poll` if using [data saving mode](/docs/sdk/features/data-saving-mode), with your SDK key in the `Authorization` header.
Many of our server-side SDKs support DynamoDB. DynamoDB is a particularly useful solution if you are running code in AWS Lambda, because you can access it from Lambda without needing access to any VPC resource.
## Setup and permissions
In your application code, the only required parameter is the table name, although you can also specify any other options supported by AWS. By default, the DynamoDB driver expects to get your AWS credentials and region from environment variables or local configuration files, as described in the AWS SDK documentation.
The table must already exist before your application starts. It must have a partition key called `"namespace"`, and a sort key called `"key"`. The SDK does not create the table automatically because it would not know what values to use for other properties such as permissions and throughput.
DynamoDB imposes a limit of 400KB on the total size of any database item. In this implementation, each feature flag or segment is a single item, so the feature store is not able to persist any flag or segment whose JSON representation is larger than that limit.
For a process to read from the DynamoDB table, it needs the following permissions:
 * `GetItem`
 * `Query`
For a process to write to the DynamoDB table, it needs the following permissions:
 * `PutItem`
 * `UpdateItem`
 * `DeleteItem`
 * `BatchWriteItem`
 * `ConditionCheckItem`
In some situations your process may only need the read permissions. For example, if you use the Relay Proxy, then only the Relay Proxy will write data to the table. In this case, the Relay Proxy will likely use permissions from a different role.
## How the SDKs store data in DynamoDB
The DynamoDB integrations for all LaunchDarkly server-side SDKs use the same conventions, so that SDK instances and Relay Proxy instances sharing a single DynamoDB table can interoperate correctly.
The storage schema is as follows:
 * For each data item that the SDK can store, such as a feature flag, there is a single DynamoDB data item, with the following attributes:
 * `namespace`: a string value with a `KeyType` of `HASH` that denotes the type of data, such as `features` and `segments`. Or, if you have specified a prefix string, the `namespace` is set to `PREFIX:TYPE` where `PREFIX` is your configured prefix and `TYPE` is the type of data.
 * `key`: the unique key of the item, such as the flag key for a feature flag, with a `KeyType` of `RANGE`.
 * `version`: a number that the SDK uses to keep track of updates.
 * `item`: a serialized representation of the data item, in a format that is determined by the SDK.
 * An additional item with a `namespace` of `$inited` or `PREFIX:$inited` is created when the SDK has stored a full set of feature flag data. This allows a new SDK instance to check whether there is already a valid data set that was stored earlier.
 * If you have specified a prefix string, the SDK never adds, modifies, or removes any items in the DynamoDB table that do not have a `namespace` starting with `PREFIX:`, so it is safe to share a DynamoDB table that is also being used for other purposes.
## Server-side SDKs
In the following examples, the DynamoDB feature store is set to use a table called `"my-table"` and a cache TTL of 30 seconds. The DynamoDB feature store does support using a key prefix, as shown in the Redis examples, but it is uncommon for one DynamoDB table to be shared by multiple applications.
This feature is available in the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/storing-data/dynamodb#net-server-side)
 * [Go](/docs/sdk/features/storing-data/dynamodb#go)
 * [Java](/docs/sdk/features/storing-data/dynamodb#java)
 * [Node.js (server-side)](/docs/sdk/features/storing-data/dynamodb#nodejs-server-side)
 * [PHP](/docs/sdk/features/storing-data/dynamodb#php)
 * [Python](/docs/sdk/features/storing-data/dynamodb#python)
 * [Ruby](/docs/sdk/features/storing-data/dynamodb#ruby)
### .NET (server-side)
###### Expand .NET (server-side) code sample
If using the .NET SDK, you must install the additional package [`LaunchDarkly.ServerSdk.DynamoDB`](https://github.com/launchdarkly/dotnet-server-sdk-dynamodb).
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
| DynamoDB.DataStore("my-table")
7
| ).CacheSeconds(30)
8
| )
9
| .Build();
10
| var client = new LDClient(config);
```
To learn more, read [`dotnet-server-sdk-dynamodb`](https://github.com/launchdarkly/dotnet-server-sdk-dynamodb).
### Go
###### Expand Go code sample
The Go integration is in [`github.com/launchdarkly/go-server-sdk-dynamodb`](https://github.com/launchdarkly/go-server-sdk-dynamodb) for version 5.0.0 or higher of the SDK. In versions 4.5.1 and higher, but below 5.0.0, it is in the main SDK distribution as the subpackage `lddynamodb`.
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
| lddynamodb "github.com/launchdarkly/go-server-sdk-dynamodb"
7
| )
8
| 
9
| var config ld.Config
10
| config.DataStore = ldcomponents.PersistentDataStore(
11
| lddynamodb.DataStore("my-table"),
12
| ).CacheSeconds(30)
13
| client, _ := ld.MakeCustomClient(sdkKey, config, 5*time.Second)
```
To learn more, read [`go-server-sdk-dynamodb`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk-dynamodb).
### Java
###### Expand Java code sample
If using the Java SDK, you must install the additional package [`com.launchdarkly.launchdarkly-java-server-sdk-dynamodb-store`](https://github.com/launchdarkly/java-server-sdk-dynamodb). You must also add `software.amazon.awssdk.dynamodb` if your application does not already use the AWS SDK.
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
| DynamoDb.dataStore("my-table")
8
| ).cacheSeconds(30)
9
| )
10
| .build();
11
| LDClient client = new LDClient(sdkKey, config);
```
To learn more, read [`java-server-sdk-dynamodb`](https://github.com/launchdarkly/java-server-sdk-dynamodb).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
In version 8.0.0 and higher of the Node.js SDK, you must install the additional package [`@launchdarkly/node-server-sdk-dynamodb`](https://github.com/launchdarkly/js-core/tree/main/packages/store/node-server-sdk-dynamodb). If using version 7.x and lower of the Node.js SDK, you must install the additional package [`launchdarkly-node-server-sdk-dynamodb`](https://github.com/launchdarkly/node-server-sdk-dynamodb).
In version 5.0 and higher of the Node.js SDK DynamoDB integration, the [`AWS SDK for JavaScript v3`](https://github.com/aws/aws-sdk-js-v3) package is used for DynamoDB operations. As of the 2.0.0 release of that package, the `aws-sdk` package that it uses is _not_ automatically loaded as a transitive dependency. This saves space when running in AWS Lambda, where `aws-sdk` is built in. If you are not running in Lambda, you must separately install `aws-sdk`.
Node.js SDK v8.x (JavaScript)Node.js SDK v8.x (TypeScript)Node.js SDK v7.x and earlier (JavaScript)Node.js SDK v7.x and earlier (TypeScript)
```
1
| const ld = require('@launchdarkly/node-server-sdk');
---|--- 
2
| const { DynamoDBFeatureStore } = require('@launchdarkly/node-server-sdk-dynamodb');
3
| 
4
| const store = DynamoDBFeatureStore(
5
| 'my-table',
6
| { cacheTTL: 30 }
7
| );
8
| 
9
| const options = {
10
| featureStore: store
11
| };
12
| const client = ld.init('sdk-key-123abc', options);
```
### PHP
###### Expand PHP code sample
In version 4.0 and higher of the PHP SDK, you must add the package `launchdarkly/server-sdk-dynamodb` to your application’s Composer dependencies to use the DynamoDB integration.
In versions 3.x and earlier, the DynamoDB integration is built into the main SDK package, but you must add a package dependency for `aws/aws-sdk-php`.
To use the DynamoDB integration:
PHP
```
1
| $fr = LaunchDarkly\Integrations\DynamoDb::featureRequester([
---|--- 
2
| 'dynamodb_table' => 'my-table'
3
| ]);
4
| $client = new LaunchDarkly\LDClient("sdk-key-123abc", [
5
| 'feature_requester' => $fr
6
| ]);
```
To learn more, read [`php-server-sdk-dynamodb`](https://github.com/launchdarkly/php-server-sdk-dynamodb).
### Python
###### Expand Python code sample
The Python integration is part of the main SDK distribution as of version 6.7.0, but you must also install the package `boto3`.
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
| from ldclient.integrations import DynamoDB
5
| 
6
| store = DynamoDB.new_feature_store('my_table',
7
| caching=CacheConfig(expiration=30))
8
| 
9
| config = Config(feature_store=store)
10
| ldclient.set_config(config)
```
### Ruby
###### Expand Ruby code sample
The Ruby integration is part of the main SDK distribution as of version 5.1.1, but you must also install the gem `aws-sdk-dynamodb`.
Ruby
```
1
| require 'ldclient-rb'
---|--- 
2
| 
3
| store = LaunchDarkly::Integrations::DynamoDB.new_feature_store('my-table',
4
| { expiration: 30 })
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