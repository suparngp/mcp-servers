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
 * [Identifying supported Go versions for the 5.0 SDK](#identifying-supported-go-versions-for-the-50-sdk)
 * [Using Go modules](#using-go-modules)
 * [Using updated package names](#using-updated-package-names)
 * [Understanding changes to SDK configuration](#understanding-changes-to-sdk-configuration)
 * [Understanding changes to data source methods](#understanding-changes-to-data-source-methods)
 * [Understanding changes to the data store](#understanding-changes-to-the-data-store)
 * [Understanding changes to events](#understanding-changes-to-events)
 * [Understanding changes to logging configuration](#understanding-changes-to-logging-configuration)
 * [Understanding changes to networking configuration](#understanding-changes-to-networking-configuration)
 * [Using the user builder](#using-the-user-builder)
 * [Using the Value type for JSON values](#using-the-value-type-for-json-values)
 * [Understanding changes to EvaluationDetail and EvaluationReason](#understanding-changes-to-evaluationdetail-and-evaluationreason)
 * [Understanding changes to AllFlagsState](#understanding-changes-to-allflagsstate)
 * [Understanding changes to add-on integration packages](#understanding-changes-to-add-on-integration-packages)
 * [Using the Relay Proxy](#using-the-relay-proxy)
 * [Implementing custom components](#implementing-custom-components)
 * [Understanding what was deprecated](#understanding-what-was-deprecated)
 * [Understanding new functionality](#understanding-new-functionality)
## Overview
This topic explains how to adapt code that currently uses a 4.x version of the [Go server-side SDK](/docs/sdk/server-side/go) to use version 5.0 or later.
Before you migrate to 5.0, update to the latest 4.x version. Some of the changes that are mandatory in 5.0 were originally added in a 4.x version and made optional.
If you update to the latest 4.x version, deprecation warnings appear in areas of your code that need to be changed for 5.0. You can update them at your own pace while still using 4.x, rather than migrating everything simultaneously.
To learn more about updating to the latest 4.x version, visit the [SDK’s GitHub repository](https://github.com/launchdarkly/go-server-sdk/releases).
## Identifying supported Go versions for the 5.0 SDK
The minimum Go version for LaunchDarkly SDK 5.0 is 1.14.
LaunchDarkly no longer supports lower Go versions, as stated in the [End of Life policy](https://launchdarkly.com/policies/end-of-life-policy/).
## Using Go modules
[Modules](https://github.com/golang/go/wiki/Modules) are supported in all modern versions of Go, and are now the standard way to write Go code. However, not all Go users use Go modules.
To support as many users as possible, we designed the 5.x SDK for use with or without modules. It has a `go.mod` file so it is recognized as a module, but if you use an older dependency management system like `dep` or `govendor`, the 5.x SDK will still work.
This is why we have continued to use the [`gopkg.in`](https://labix.org/gopkg.in) redirection service for the SDK’s import paths. Go modules with major versions greater than 1 must normally have an import path suffix like `/v5`, which would not work with `dep` and `govendor`. Paths that use `gopkg.in` are exempt from that rule.
##### Plan to migrate to Go modules
Starting with the next major version, 6.0.0, you will only be able to use the Go SDK from module-based code.
As described below, the SDK is now made up of multiple repositories. If you do not use modules and you have pinned your dependency versions, when you update the SDK to a new version you should also update any other `github.com/launchdarkly` or `gopkg.in/launchdarkly` dependencies that were previously pinned. This is not required if you use modules, because the SDK can specify its own preferred dependency versions.
## Using updated package names
The package structure of the SDK has changed. Some packages have been added in the main repository, and other packages are now in related repositories.
There were two reasons for this. First, the main package `go-server-sdk.v4` was cluttered with many things that are not necessary for normal usage of the SDK. Moving things out of this package produced a clearer basic API.
Second, there are some internal parts of the Go SDK code that are also used by other LaunchDarkly components, such as the [Relay Proxy](/docs/sdk/relay-proxy). The fact that those implementation details were visible within the main SDK package meant that they could not be changed in any backward-incompatible way without releasing a new major version of the SDK, even though application code was unlikely to be using them.
This was potentially confusing for developers, and required LaunchDarkly to maintain support for many obsolete types and methods.
The full package schema is now as follows:
 * [`gopkg.in/launchdarkly/go-sdk-server.v5`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5)
 * Main package: types that are specific to server-side SDK usage, such as [`Config`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5#Config), [`LDClient`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5#LDClient), and [`FeatureFlagsState`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5#FeatureFlagsState).
 * [`/interfaces`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5/interfaces): types like [`DataStore`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5/interfaces#DataStore) that are only used if you are writing a [custom component](/docs/sdk/server-side/go/migration-4-to-5#implementing-custom-components), as well as interfaces for advanced features like [`FlagTracker`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5/interfaces#FlagTracker).
 * [`/ldcomponents`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5/ldcomponents): configuration builders for specific areas of SDK functionality, such as configuring streaming options or logging options. To learn more, read [Understanding changes to SDK configuration](/docs/sdk/server-side/go/migration-4-to-5#understanding-changes-to-sdk-configuration).
 * [`gopkg.in/launchdarkly/go-sdk-common.v2`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2)
 * [`/ldlog`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/ldlog): the SDK’s logging abstraction (formerly in `go-server-sdk.v4/ldlog`).
 * [`/ldreason`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/ldreason): the [`EvaluationDetail`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/ldreason#EvaluationDetail) and [`EvaluationReason`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/ldreason#EvaluationReason) types (formerly in `go-server-sdk.v4`).
 * [`/lduser`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/lduser): [`User`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/lduser#User), [`UserBuilder`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/lduser#UserBuilder), and related methods (formerly in `go-server-sdk.v4`).
 * [`/ldvalue`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/ldvalue): the universal JSON value type [`Value`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/ldvalue#Value), and related types like [`OptionalString`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/ldvalue#OptionalString).
 * `gopkg.in/launchdarkly/go-sdk-events.v1`, `gopkg.in/launchdarkly/go-server-sdk-evaluation.v1`: these packages are not used directly by application code.
The `redis`, `ldconsul`, and `lddynamodb` packages are now in separate repositories. To learn more, read [Understanding changes to the data store](/docs/sdk/server-side/go/migration-4-to-5#understanding-changes-to-the-data-store).
## Understanding changes to SDK configuration
Previously, the [`Config`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5#Config) struct had fields for all of the SDK’s configuration options. An empty `Config{}` struct was not a valid configuration. Applications had to first copy from `ld.DefaultConfig` and then make any desired changes.
Now, most of the properties are grouped into areas of functionality, each of which has its own builder class that is only available if you are using that functionality. The `Config` struct has a much smaller number of fields, because most of its options are contained within one of the builders.
For example, if you use streaming mode, there are options you can set to control streaming mode, and if you use polling mode, you use a different builder that does not have the streaming options. Similarly, if you have disabled analytics events, the event-related options are not accessible.
`ld.DefaultConfig` no longer exists. An empty `Config{}` is now a valid configuration, with the same default behavior that was previously provided by `ld.DefaultConfig`.
The basic areas of functionality are “data source” (polling, streaming, or file data), “data store” (memory or database), events, logging, and networking.
### Understanding changes to data source methods
The data source is the mechanism that the SDK uses to receive feature flag updates. Typically this is a streaming connection, but you can also configure the SDK to use polling or other sources.
For each data source type, there is a factory method whose name ends in `DataSource`. These methods give you a builder object with methods for whatever options are appropriate. Store that object in [`Config.DataSource`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5#Config.DataSource).
Here is an example:
4.x syntax5.0 syntax
```
1
| import (
---|--- 
2
| ld "gopkg.in/launchdarkly/go-server-sdk.v4"
3
| )
4
| 
5
| config := ld.DefaultConfig
6
| 
7
| // 4.x model: setting custom options for streaming mode
8
| config.Stream = true
9
| config.StreamInitialReconnectDelay = 500*time.Millisecond
10
| 
11
| // 4.x model: specifying polling mode and setting custom polling options
12
| config.Stream = false
13
| config.PollInterval = 60*time.Second
```
Streaming mode is the default. Unlike the earlier model, it is no longer possible to construct a meaningless configuration such as “use streaming mode, but set the polling interval to 1 minute” or “disable events, but set the flush interval to 10 seconds.”
Another data source option is the file-based data source. To learn more, read the API documentation for `ldfiledata.DataSource()`.
### Understanding changes to the data store
As before, the default data store is a simple in-memory cache.
If you want to use a persistent datastore database integration, you must call a `DataStore` factory method for that integration. This gives you a builder object with whatever options are appropriate for that database. Next, pass the object to [`ldcomponents.PersistentDataStore()`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5/ldcomponents#PersistentDataStore), a wrapper that provides caching options that are not specific to any one database but are built into the SDK. Put this into [`Config.DataStore`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5#Config.DataStore).
In the 4.x API, the constructors for these integrations took a variable number of arguments representing the various options you could use. For example, `packagename.NewFeatureStore(packagename.OptionA(value), packagename.OptionB(value))`.
The 5.0 API uses a more concise builder pattern instead, with one builder method for each option. For example, `packagename.DataStore().OptionA(value).OptionB(value)`.
Also, the integrations for Redis, DynamoDB, and Consul are no longer bundled in the main SDK project. To learn more, read [Understanding changes to add-on integration packages](/docs/sdk/server-side/go/migration-4-to-5#understanding-changes-to-add-on-integration-packages).
To learn more, read [Persistent data stores](/docs/sdk/concepts/data-stores).
The following examples use the Redis integration:
4.x syntax5.0 syntax
```
1
| import (
---|--- 
2
| ld "gopkg.in/launchdarkly/go-server-sdk.v4"
3
| ldredis "gopkg.in/launchdarkly/go-server-sdk.v4/redis"
4
| )
5
| 
6
| config := ld.DefaultConfig
7
| 
8
| // 4.x model: use Redis, set custom Redis URI and key prefix, set cache TTL to 45 seconds
9
| config.FeatureStoreFactory = redis.NewRedisFeatureStoreWithDefaults(
10
| ldredis.URI("redis://my-redis-host"),
11
| ldredis.Prefix("my-key-prefix"),
12
| ldredis.CacheTTL(45*time.Second))
```
### Understanding changes to events
Analytics events are enabled by default. To customize their behavior, call [`ldcomponents.SendEvents()`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5/ldcomponents#SendEvents) to get a builder object with event-related options, and then put that object in [`Config.Events`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5#Config.Events).
To completely disable events, set [`Config.Events`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5#Config.Events) to [`ldcomponents.NoEvents()`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5/ldcomponents#NoEvents).
Here’s how:
4.x syntax5.0 syntax
```
1
| import (
---|--- 
2
| ld "gopkg.in/launchdarkly/go-server-sdk.v4"
3
| )
4
| 
5
| config := ld.DefaultConfig
6
| 
7
| // 4.x model: disabling events
8
| config.SendEvents = false
9
| 
10
| // 4.x model: customizing event behavior
11
| config.Capacity = 20000
12
| config.FlushInterval = 10*time.Second
13
| config.PrivateAttributeNames = []string{
14
| "email",
15
| "name",
16
| "myCustomAttribute",
17
| }
```
You can no longer construct a meaningless configuration like “disable events, but set the flush interval to 10 seconds.”
### Understanding changes to logging configuration
The SDK still uses the [`ldlog`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/ldlog) logging API, although that package is now in `gopkg.in/launchdarkly/go-sdk-common.v2` rather than `gopkg.in/launchdarkly/go-server-sdk.v4`.
However, for basic logging configuration, such as specifying the minimum log level or disabling logging, you no longer need to interact directly with the `ldlog.Loggers` type. Instead, there is a new [`Logging`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5#Config.Logging) property in `Config` which you can set to either [`ldcomponents.NoLogging()`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5/ldcomponents#NoLogging) or to a configuration builder that you get from [`ldcomponents.Logging()`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5/ldcomponents#Logging).
Here is an example:
4.x syntax5.0 syntax
```
1
| import (
---|--- 
2
| ld "gopkg.in/launchdarkly/go-server-sdk.v4"
3
| "gopkg.in/launchdarkly/go-server-sdk.v4/ldlog"
4
| )
5
| 
6
| config := ld.DefaultConfig
7
| 
8
| // 4.x model: disabling logging
9
| config.Loggers = ldlog.NewDisabledLoggers()
10
| 
11
| // 4.x model: setting log level to Warn
12
| config.Loggers.SetMinLevel(ldlog.Warn)
13
| 
14
| // 4.x model: specifying that evaluation errors should be logged
15
| config.LogEvaluationErrors = true
```
### Understanding changes to networking configuration
Options in this category affect how the SDK communicates with LaunchDarkly over HTTP/HTTPS, including connection timeout, proxy servers, and more. If you need to customize these, call [`ldcomponents.HTTPConfiguration()`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5/ldcomponents#HTTPConfiguration) to get a builder object, configure this builder, and then put that object in [`Config.HTTP`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5#Config.HTTP).
Here’s how:
4.x syntax5.0 syntax
```
1
| import (
---|--- 
2
| ld "gopkg.in/launchdarkly/go-server-sdk.v4"
3
| "gopkg.in/launchdarkly/go-server-sdk.v4/ldhttp"
4
| )
5
| 
6
| config := ld.DefaultConfig
7
| 
8
| // 4.x model: setting socket connection timeout
9
| config.Timeout = 3*time.Second
10
| 
11
| // 4.x model: specifying a secure HTTPS proxy with a custom CA certificate
12
| config.HTTPClientFactory = ld.NewHTTPClientFactory(
13
| ldhttp.ProxyOption(proxyURL),
14
| ldhttp.CACertOption("mycert.crt"),
15
| )
```
## Using the user builder
Before [Go SDK 4.16](https://github.com/launchdarkly/go-server-sdk/releases/tag/4.16.0), the way to define user properties was to set the fields of the `User` struct directly. Because the fields had pointer types, this was somewhat inconvenient. Also, the mutability of the `User` struct and the `Custom` map inside it could cause [concurrency problems](https://launchdarkly.com/blog/avoid-concurrency-pitfalls-with-the-launchdarkly-sdks/).
Version 4.16 added the `UserBuilder` type as a safer and more convenient way to define user properties. As of version 5.0, this is the only way, if you need to use the full set of properties. The `NewUser` and `NewAnonymousUser` constructors still exist for simple users. The `User` struct no longer has any exported fields and cannot be modified by application code after it is built. It now has getter methods like `GetName()` if you need to inspect existing property values.
The 5.0 [`User`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/lduser#User) and [`UserBuilder`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/lduser#UserBuilder) types, and the [`NewUser()`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/lduser#NewUser), [`NewAnonymousUser()`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/lduser#NewAnonymousUser), and [`NewUserBuilder()`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/lduser#NewUserBuilder) functions, are now in `gopkg.in/launchdarkly/go-sdk-common.v2/lduser` instead of `gopkg.in/launchdarkly/go-server-sdk.v4`.
Here is an example:
before 4.164.16+ syntax5.0 syntax
```
1
| import (
---|--- 
2
| ld "gopkg.in/launchdarkly/go-server-sdk.v4"
3
| )
4
| 
5
| // before 4.16: create a simple user with just a key
6
| user := ld.NewUser("key")
7
| 
8
| // before 4.16: set email and country
9
| user := ld.NewUser("key")
10
| email := "sandy@example.com"
11
| country := "us"
12
| user.Email = &email
13
| user.Country = &country
14
| 
15
| // before 4.16: set custom attribute "team" to "admin"
16
| user := ld.NewUser("key")
17
| custom := make(map[string]interface{})
18
| custom["team"] = "admin"
```
## Using the Value type for JSON values
Before [Go SDK 4.16](https://github.com/launchdarkly/go-server-sdk/releases/tag/4.16.0), if you wanted to describe a value that could be of any valid JSON type, you would use Go’s universal value type `interface{}`.
For example, `LDClient.JsonVariation()` returned that type, and also took a default value parameter of that type.
However, there were two problems with `interface{}`:
 1. It could represent any type at all, even ones that are not valid in a LaunchDarkly feature flag, and
 2. JSON arrays and objects were represented as slices and maps, which are mutable and can cause [concurrency problems](https://launchdarkly.com/blog/avoid-concurrency-pitfalls-with-the-launchdarkly-sdks/).
Version 4.16 added the immutable class `ldvalue.Value` as a replacement for `interface{}`, along with a `LDClient.JSONVariation()` method that uses `LDValue`, and `UserBuilder` methods for setting user attributes of any JSON type.
As of version 5.0, these are the only options. `interface{}` is no longer used in the public API.
The [`Value`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/ldvalue#Value) type for the 5.0 SDK is now in `gopkg.in/launchdarkly/go-sdk-common.v2/ldvalue` instead of `gopkg.in/launchdarkly/go-sdk-common.v1/ldvalue`.
Here is an example:
before 4.164.16+ syntax5.0 syntax
```
1
| import (
---|--- 
2
| ld "gopkg.in/launchdarkly/go-server-sdk.v4"
3
| )
4
| 
5
| // before 4.16: get a JSON flag variation whose default value is "default",
6
| // and check if the result is a string or a number
7
| result, _ := client.JsonVariation(flagKey, user, "default")
8
| if s, ok := result.(string); ok {
9
| DoSomethingWithString(s)
10
| } else if n, ok := result.(float64); ok {
11
| DoSomethingWithNumberAsInt(int(n))
12
| }
13
| 
14
| // before 4.16: set a user's custom attribute "teams" to an
15
| // array of ["admin", "foosball"]
16
| user := ld.NewUser("key")
17
| custom := make(map[string]interface{})
18
| custom["team"] = []interface{}{"admin", "foosball"}
```
## Understanding changes to EvaluationDetail and EvaluationReason
The [`EvaluationDetail`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/ldreason#EvaluationDetail) and [`EvaluationReason`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/ldreason#EvaluationReason) types were formerly in `gopkg.in/launchdarkly/go-server-sdk.v4` and are now in `gopkg.in/launchdarkly/go-sdk-common.v2/ldreason`.
We have modified them in two ways:
 1. `EvaluationReason` is now a struct rather than an interface. Instead of casting it to another type such as `EvaluationReasonRuleMatch` to get specific properties, it provides getter methods for those properties.
 2. The `VariationIndex` property of `EvaluationDetail` was previously a pointer of type `*int`, which would be `nil` if evaluation failed. This was unsafe due to mutability and the potential for nil pointer panics. It now uses the immutable type [`ldvalue.OptionalInt`](https://pkg.go.dev/gopkg.in/launchdarkly/go-sdk-common.v2/ldvalue#OptionalInt) instead, which allows an “undefined” value to be represented without using pointers.
Here is an example:
4.x syntax5.0 syntax
```
1
| import (
---|--- 
2
| ld "gopkg.in/launchdarkly/go-server-sdk.v4"
3
| )
4
| 
5
| value, detail, _ := client.BoolVariationDetail(flagKey, user, false)
6
| 
7
| // 4.x model: check if the variation index is 0
8
| if detail.VariationIndex != nil && *detail.VariationIndex == 0 {
9
| log.Printf("it is variation zero")
10
| }
11
| 
12
| // 4.x model: check if the reason is "prerequisite failed"
13
| if pf, ok := detail.Reason.(ld.EvaluationReasonPrerequisiteFailed); ok {
14
| log.Printf("the prerequisite %s failed", pf.PrerequisiteKey)
15
| }
```
## Understanding changes to AllFlagsState
The [`AllFlagsState`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5#LDClient.AllFlagsState) method of `LDClient`, which returns a snapshot of flag values and metadata, has been changed as follows:
 * The type that it returns was previously called `FeatureFlagsState` and was in the main SDK package. It is now called [`AllFlags`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5/interfaces/flagstate#AllFlags) and is in the new package `go-server-sdk.v5/interfaces/flagstate`. Moving it out of the main package helps to streamline the API, and also allows it to be referenced from the interfaces in the `interfaces` package without causing an import cycle.
 * The getter methods of `AllFlags` are slightly different than the methods of the earlier `FeatureFlagsState`, although most applications will not need to use these. There is also a [builder](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5/interfaces/flagstate#AllFlagsBuilder) for constructing instances of it in test code.
 * The optional parameters that can be used to change the behavior of `AllFlagsState` are now in the [`flagstate`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5/interfaces/flagstate) package, and have been renamed to `OptionClientSideOnly`, `OptionDetailsOnlyForTrackedFlags`, and `OptionWithReasons`.
## Understanding changes to add-on integration packages
The Consul, DynamoDB, and Redis integrations are no longer bundled in the main SDK project. Instead, they are maintained in separate repositories: [`github.com/launchdarkly/go-server-sdk-redis-redigo`](https://github.com/launchdarkly/go-server-sdk-redis-redigo), [`github.com/launchdarkly/go-server-sdk-dynamodb`](https://github.com/launchdarkly/go-server-sdk-dynamodb), and [`github.com/launchdarkly/ldconsul`](https://github.com/launchdarkly/go-server-sdk-consul).
The new import paths for those packages are the same as the repository locations: `github.com/launchdarkly/go-server-sdk-redis-redigo`, etc.
Also, the configuration syntax has changed. To learn more about configuration details, read [Understanding changes to the data store](/docs/sdk/server-side/go/migration-4-to-5#understanding-changes-to-the-data-store).
## Using the Relay Proxy
There are two ways you can configure the SDK to use the [Relay Proxy](/docs/sdk/relay-proxy).
You can use it in:
 * **proxy mode** , connecting to it via HTTP/HTTPS just as if it were the LaunchDarkly service.
 * **daemon mode** , receiving flag data only through a database.
The syntax for configuring these has changed in version 5.x.
4.x syntax5.0 syntax
```
1
| import (
---|--- 
2
| ld "gopkg.in/launchdarkly/go-server-sdk.v4"
3
| ldredis "gopkg.in/launchdarkly/go-server-sdk.v4/redis"
4
| )
5
| 
6
| config := ld.DefaultConfig
7
| relayURI := "http://my-relay-host:8000"
8
| 
9
| // 4.x model: proxy mode
10
| config.BaseURI = relayURI
11
| config.StreamURI = relayURI
12
| config.EventsURI = relayURI // if you want to proxy events
13
| 
14
| // 4.x model: daemon mode with a Redis database
15
| config.UseLdd = true
16
| config.FeatureStoreFactory = ldredis.NewRedisFeatureStoreWithDefaults(
17
| ldredis.URI("redis://my-redis-host"),
18
| ldredis.Prefix("my-key-prefix"))
```
## Implementing custom components
Most applications use either the default in-memory storage or one of the [database integrations](/docs/sdk/concepts/data-stores) provided by LaunchDarkly (Consul, DynamoDB, Redis), but the data store interface (formerly called “feature store”) has always been public so developers can write their own integrations.
Starting in Go SDK 5.0, this model has been changed to make it easier to implement database integrations. The basic concepts are the same. The SDK defines its own “data kinds,” such as feature flags and user segments. The data store must provide a way to add and update items of any of these kinds without knowing anything about their properties except the key and version.
The main changes are:
 * Caching is now handled by the SDK, not by the store implementation. Now you only need to implement the lower-level operations of adding or updating data.
 * The SDK serializes and deserializes the data, so the store operates only on strings.
 * Data structures have been simplified to avoid the use of maps.
The interface for “data source” components that receive feature flag data, either from LaunchDarkly or from some other source, such as a file, has also changed slightly to use the new data store model.
To learn more, read the API documentation for the [`interfaces.DataStore`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5/interfaces#DataStore), [`interfaces.PersistentDataStore`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5/interfaces#PersistentDataStore), and [`interfaces.DataSource`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5/interfaces#DataSource) interfaces. You may also want to review the SDK’s source code for one of the LaunchDarkly database integrations, such as the [`ldredis`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5/ldredis) package, to learn how it changed from the previous major version.
## Understanding what was deprecated
All types and methods that were marked as deprecated in the last 4.x release have been removed from the 5.0 release.
If you were using these with a recent version previously, you should already have received deprecation warnings at compile time, with suggestions about how to replace them.
## Understanding new functionality
The 5.0 release also includes new features as described in the release notes.
These include:
 * You can tell the SDK to notify you whenever a feature flag’s configuration has changed, using [`LDClient.GetFlagTracker()`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5#LDClient.GetFlagTracker).
 * You can monitor the status of the SDK’s connection to LaunchDarkly services with [`LDClient.GetDataSourceStatusProvider()`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5#LDClient.GetDataSourceStatusProvider).
 * You can monitor the status of a persistent data store (for instance, to get caching statistics, or to be notified if the store’s availability changes due to a database outage) with [`LDClient.GetDataStoreStatusProvider()`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5#LDClient.GetDataStoreStatusProvider).
 * You can disable analytics events temporarily for specific flag evaluation calls with [`LDClient.WithEventsDisabled()`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5#LDClient.WithEventsDisabled).
 * You can configure the SDK’s use of different logging levels depending on the duration of a service outage with [`LDConfig.Logging`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5#LDConfig.Logging) and [`ldcomponents.LoggingConfigurationBuilder`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5/ldcomponents#LoggingConfigurationBuilder).
 * For test code, you can use the new [`ldtestdata`](https://pkg.go.dev/gopkg.in/launchdarkly/go-server-sdk.v5/testhelpers/ldtestdata) package to set flag values or rules programmatically, as an alternative to using `ldfiledata`.
To learn more, read the API documentation for these classes and methods.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs