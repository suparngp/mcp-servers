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
 * [About test data sources](#about-test-data-sources)
 * [Client-side SDKs](#client-side-sdks)
 * [.NET (client-side)](#net-client-side)
 * [Android](#android)
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [C++ (server-side)](#c-server-side)
 * [Erlang](#erlang)
 * [Go](#go)
 * [Haskell](#haskell)
 * [Java](#java)
 * [Node.js (server-side)](#nodejs-server-side)
 * [PHP](#php)
 * [Python](#python)
 * [Ruby](#ruby)
## Overview
This topic explains how to use the test data source feature for more control over your LaunchDarkly SDKs during testing.
##### Newer versions of LaunchDarkly SDKs replace users with contexts
A context is a generalized way of referring to the people, services, machines, or other resources that encounter feature flags in your product. Contexts replace another data object in LaunchDarkly: “users.” To learn more, read [Contexts](/docs/home/flags/contexts).
Creating contexts and evaluating flags based on them is supported in the latest major versions of [most of our SDKs](/docs/sdk). For these SDKs, the code samples on this page include the two most recent versions.
## About test data sources
LaunchDarkly SDKs must have a data source when they initialize. Usually, this data source is connected to LaunchDarkly. However, when you write unit tests, using a test data source can give you more control over your SDK.
LaunchDarkly supports a test data source for some SDKs. The test data source allows you to mock the behavior of a LaunchDarkly SDK so it has predictable behavior when evaluating flags.
##### Use the test data source for testing only
The test data source is intended strictly for testing purposes. It cannot be used in production.
You can set a flag’s initial state by calling the data source’s `update` method before or after starting the client. When you start the client, it acts as if it has connected to LaunchDarkly and received all of the test data that you have configured. Subsequent calls to `update` behave as if LaunchDarkly sent an update over a streaming connection.
You can modify targeting rules at any time, including when the SDK is already in use. This allows you to simulate a situation where a feature flag changes values. When you set a flag’s state in the test data source, you can either set it to return a single variation for all contexts or users, or set up more complicated behavior similar to the ways you can configure a flag in the **Flags** list. This can be useful in testing application code that expects flags to be different for different contexts or users.
Details about each SDK’s configuration are available in the SDK-specific sections below.
## Client-side SDKs
This feature is available in the following client-side SDKs:
 * [.NET (client-side)](/docs/sdk/features/test-data-sources#net-client-side)
 * [Android](/docs/sdk/features/test-data-sources#android)
### .NET (client-side)
###### Expand .NET (client-side) code sample
To configure the SDK to use a test data source:
.NET SDK v4.0 (C#).NET SDK v3.0 (C#)
```
1
| using LaunchDarkly.Sdk.Client.Integrations;
---|--- 
2
| 
3
| var td = TestData.DataSource();
4
| // You can set any initial flag states here with td.Update
5
| 
6
| var config = Configuration
7
| .Builder("mobile-key-123abc", ConfigurationBuilder.AutoEnvAttributes.Enabled)
8
| .DataSource(td)
9
| .Build();
10
| var client = LdClient.Init(config, context, startWaitTime);
```
To set a flag to a specific value:
C#
```
1
| td.Update(td.Flag("flag-key-123abc").Variation(false));
---|--- 
```
There are other ways you can configure flag behavior using a test data source. Here is an example:
.NET SDK v3.0 (C#)
```
1
| // This flag is true for the context key "context-key-123abc" and false for everyone else
---|--- 
2
| td.Update(td.Flag("flag-key-456def")
3
| .Variation(false)
4
| .VariationForKey(ContextKind.Of("user"), "context-key-123abc", true));
5
| 
6
| // This flag returns the string variation "green" for contexts where the custom
7
| // attribute "admin" has a value of true, and "red" for all other contexts.
8
| td.Update(td.Flag("flag-key-789ghi")
9
| .Variations(LdValue.Of("red"), LdValue.Of("green"))
10
| .VariationFunc(context =>
11
| context.GetValue("admin").AsBool ? 1 : 0));
```
To learn more, read [TestData](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.Client.Integrations.TestData.html).
### Android
###### Expand Android code sample
This feature is available in versions 4.0 and higher of the Android SDK.
To configure the SDK to use a test data source:
Java
```
1
| using com.launchdarkly.sdk.*;
---|--- 
2
| using com.launchdarkly.sdk.server.*;
3
| using com.launchdarkly.sdk.server.integrations.*;
4
| 
5
| TestData td = TestData.dataSource();
6
| // You can set any initial flag states here with td.update
7
| 
8
| LDConfig config = new LDConfig.Builder(AutoEnvAttributes.Enabled)
9
| .mobileKey("mobile-key-123abc")
10
| .dataSource(td)
11
| .build();
12
| LDClient client = LDClient.init(this.getApplication(), ldConfig, context, secondsToBlock);
```
To set a flag to a specific value:
Java
```
1
| td.update(td.flag("flag-key-123abc").variation(false));
---|--- 
```
There are other ways you can configure flag behavior using a test data source. Here is an example:
Java
```
1
| // This flag is true for the context with the key "context-key-123abc" and kind of "organization",
---|--- 
2
| // and false for everyone else
3
| td.update(td.flag("flag-key-123abc")
4
| .variation(false)
5
| .variationForKey(ContextKind.of("organization"), "context-key-123abc", true));
6
| 
7
| // This flag returns the string variation "green" for contexts who have the custom
8
| // attribute "admin" with a value of true, and "red" for everyone else.
9
| td.update(td.flag("flag-key-123abc")
10
| .variations(LDValue.of("red"), LDValue.of("green"))
11
| .variationFunc(context ->
12
| context.getValue("admin").booleanValue() ? 1 : 0));
```
To learn more, read [`TestData`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/integrations/TestData.html).
## Server-side SDKs
This feature is available in the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/test-data-sources#net-server-side)
 * [C++ (server-side)](/docs/sdk/features/test-data-sources#c-server-side)
 * [Erlang](/docs/sdk/features/test-data-sources#erlang)
 * [Go](/docs/sdk/features/test-data-sources#go)
 * [Haskell](/docs/sdk/features/test-data-sources#haskell)
 * [Java](/docs/sdk/features/test-data-sources#java)
 * [Node.js (server-side)](/docs/sdk/features/test-data-sources#nodejs-server-side)
 * [PHP](/docs/sdk/features/test-data-sources#php)
 * [Python](/docs/sdk/features/test-data-sources#python)
 * [Ruby](/docs/sdk/features/test-data-sources#ruby)
### .NET (server-side)
###### Expand .NET (server-side) code sample
To configure the SDK to use a test data source:
C#
```
1
| using LaunchDarkly.Sdk.Server.Integrations;
---|--- 
2
| 
3
| var td = TestData.DataSource();
4
| // You can set any initial flag states here with td.Update
5
| 
6
| var config = Configuration.Builder("sdk-key-123abc")
7
| .DataSource(td)
8
| .Build();
9
| var client = new LdClient(config);
```
To set a flag to a specific value:
.NET SDK v7.0 (C#)
```
1
| td.Update(td.Flag("flag-key-123abc").VariationForAll(false));
---|--- 
```
There are other ways you can configure flag behavior using a test data source. Here is an example:
.NET SDK v7.0 (C#)
```
1
| // This flag is true for the context with the key "context-key-123abc" and kind of "organization",
---|--- 
2
| // and false for everyone else
3
| td.Update(td.Flag("flag-key-456def")
4
| .VariationForKey(ContextKind.Of("organization"), "context-key-123abc", true)
5
| .FallthroughVariation(false));
6
| 
7
| // This flag returns the string variation "green" for contexts that have the
8
| // attribute "admin" with a value of true, and "red" for everyone else.
9
| td.Update(td.Flag("flag-key-789ghi")
10
| .Variations(LdValue.Of("red"), LdValue.Of("green"))
11
| .FallthroughVariation(0)
12
| .IfMatch("admin", LdValue.Of(true))
13
| .ThenReturn(1));
```
To learn more, read [`TestData`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Integrations.TestData.html).
### C++ (server-side)
###### Expand C++ (server-side) code sample
This feature is only available in v2.x of the C++ (server-side) SDK.
To configure the SDK to use a test data source:
C SDK v2.x (native)
```
1
| #include <launchdarkly/integrations/test_data.h>
---|--- 
2
| 
3
| struct LDTestData *td = LDTestDataInit();
4
| 
5
| LDConfigSetDataSource(config, LDTestDataCreateDataSource(td));
6
| 
7
| // Call LDClientInit with config as usual.
```
Once you are finished using the client, ensure the test data source is freed:
C SDK v2.x (native)
```
1
| // After LDClientClose:
---|--- 
2
| LDTestDataFree(td)
```
To set a flag to a specific value:
C SDK v2.x (native)
```
1
| struct LDFlagBuilder *flag = LDTestDataFlag(td, "flag-key-123abc");
---|--- 
2
| LDFlagBuilderVariationForAllUsersBoolean(flag, LDBooleanTrue);
3
| LDTestDataUpdate(td, flag);
```
There are other ways you can configure flag behavior using a test data source. Here is an example:
C SDK v2.x (native)
```
1
| // This flag is true for the user key "user-key-123abc"
---|--- 
2
| // and false for everyone else.
3
| struct LDFlagBuilder *flag2 = LDTestDataFlag(td, "flag-key-456def");
4
| LDFlagBuilderVariationForUserBoolean(flag2, "user-key-123abc", LDBooleanTrue);
5
| LDFlagBuilderFallthroughVariationBoolean(flag2, LDBooleanFalse);
6
| LDTestDataUpdate(td, flag2);
7
| 
8
| 
9
| // This flag returns the string variation "green" for
10
| // users who have the custom attribute "admin" with a
11
| // value of true, and "red" for everyone else.
12
| 
13
| struct LDJSON *variations = LDNewArray();
14
| LDArrayPush(variations, LDNewText("red"));
15
| LDArrayPush(variations, LDNewText("green"));
16
| 
17
| struct LDFlagBuilder *flag3 = LDTestDataFlag(td, "flag-key-789ghi");
18
| LDFlagBuilderVariations(flag3, variations);
19
| LDFlagBuilderFallthroughVariation(flag3, 0);
20
| 
21
| struct LDFlagRuleBuilder *rule = LDFlagBuilderIfMatch(flag3, "admin", LDNewBool(LDBooleanTrue));
22
| LDFlagRuleBuilderThenReturn(rule, 1);
23
| 
24
| LDTestDataUpdate(td, flag3);
```
### Erlang
###### Expand Erlang code sample
To configure the SDK to use a test data source:
Erlang
```
1
| Options = #{
---|--- 
2
| datasource => testdata,
3
| send_events => false,
4
| feature_store => ldclient_storage_map
5
| },
6
| ldclient:start_instance(SdkKey, Options),
```
To set a flag to a specific value:
Erlang SDK v2.0+Erlang SDK v1.x
```
1
| {ok, Flag} = ldclient_testdata:flag("flag-key-123abc"),
---|--- 
2
| ldclient_testdata:update(ldclient_flagbuilder:variation_for_all(true, Flag)),
```
There are other ways you can configure flag behavior using a test data source. Here is an example:
Erlang SDK v2.0+Erlang SDK v1.x
```
1
| %% This flag is true for the context key "user-key-123abc" and false for everyone else
---|--- 
2
| {ok, Flag2} = ldclient_testdata:flag("flag-key-456def"),
3
| UpdatedFlag2 = ldclient_flagbuilder:fallthrough_variation(false,
4
| ldclient_flagbuilder:variation_for_context(true, <<"user">>, <<"user-key-123abc">>, Flag2)
5
| ),
6
| 
7
| %% This flag returns the string variation "green" for contexts that have the custom
8
| %% attribute "admin" with a value of true, and "red" for everyone else.
9
| {ok, Flag} = ldclient_testdata:flag("flag-key-789ghi"),
10
| UpdatedFlag = ldclient_flagbuilder:fallthrough_variation(0,
11
| ldclient_flagbuilder:then_return(1,
12
| ldclient_flagbuilder:if_match(<<"user">>, <<"admin">>, [true],
13
| ldclient_flagbuilder:variations([<<"red">>, <<"green">>], Flag)))),
14
| ldclient_testdata:update(UpdatedFlag),
```
### Go
###### Expand Go code sample
To configure the SDK to use a test data source:
Go SDK v6.0
```
1
| import (
---|--- 
2
| ld "github.com/launchdarkly/go-server-sdk/v6"
3
| "github.com/launchdarkly/go-server-sdk/v6/testhelpers/ldtestdata"
4
| "github.com/launchdarkly/go-sdk-common/v3/ldcontext"
5
| "github.com/launchdarkly/go-sdk-common/v3/ldvalue"
6
| )
7
| 
8
| td := ldtestdata.DataSource()
9
| // You can set any initial flag states here with td.Update
10
| 
11
| config := ld.Config{
12
| DataSource: td,
13
| }
14
| client, _ := ld.MakeCustomClient("sdk-key-123abc", config, 0)
```
To set a flag to a specific value:
Go SDK v6.0
```
1
| td.Update(td.Flag("flag-key-123abc").VariationForAll(false))
---|--- 
```
There are other ways you can configure flag behavior using a test data source. Here is an example:
Go SDK v6.0
```
1
| // This flag is true for the context with the key "context-key-123abc" and kind of "organization",
---|--- 
2
| // and false for everyone else
3
| td.Update(td.Flag("flag-key-456def").
4
| VariationForKey("organization", "context-key-123abc", true).
5
| FallthroughVariation(false));
6
| 
7
| 
8
| // This flag returns the string variation "green" for contexts that have the
9
| // attribute "admin" with a value of true, and "red" for everyone else.
10
| td.Update(td.Flag("flag-key-789ghi").
11
| Variations(ldvalue.String("red"), ldvalue.String("green")).
12
| FallthroughVariationIndex(0).
13
| IfMatch(ldcontext.GetValue("admin"), ldvalue.Bool(true)).
14
| ThenReturnIndex(1));
```
To learn more, read [`ldtestdata`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7/testhelpers/ldtestdata).
### Haskell
###### Expand Haskell code sample
To configure the SDK to use a test data source:
Haskell
```
1
| import qualified LaunchDarkly.Server.Integrations.TestData as TestData
---|--- 
2
| 
3
| td <- TestData.newTestData
4
| let config = LD.configSetDataSourceFactory (Just $ TestData.dataSourceFactory td) $ LD.makeConfig "sdk-key-123abc"
5
| client <- LD.makeClient config
```
To set a flag to a specific value:
Haskell SDK v4.0Haskell SDK v3.x
```
1
| TestData.update td =<< ( TestData.flag td "flag-key-123abc"
---|--- 
2
| <&> TestData.booleanFlag
3
| <&> TestData.variationForAll True
4
| )
```
There are other ways you can configure flag behavior using a test data source. Here is an example:
Haskell SDK v4.0Haskell SDK v3.x
```
1
| -- This flag is true for the context with kind "context-kind" and key "context-key-123abc", and false for everyone else
---|--- 
2
| TestData.update td =<< ( TestData.flag td "flag-key-456def"
3
| <&> TestData.booleanFlag
4
| <&> TestData.variationForKey "context-kind" "context-key-123abc" (0 :: TestData.VariationIndex)
5
| <&> TestData.fallthroughVariation (1 :: TestData.VariationIndex)
6
| )
7
| 
8
| -- This flag returns the string variation "green" for contexts with kind "context-kind"
9
| -- that have the custom attribute "admin" with a value of true, and "red" for everyone else.
10
| TestData.update td =<< ( TestData.flag td "flag-key-456def"
11
| <&> TestData.variations [toJSON "red", toJSON "green"]
12
| <&> TestData.ifMatchContext "context-kind" "admin" [Aeson.Bool True]
13
| <&> TestData.thenReturn (1 :: TestData.VariationIndex)
14
| <&> TestData.fallthroughVariation (0 :: TestData.VariationIndex))
15
| )
```
### Java
###### Expand Java code sample
To configure the SDK to use a test data source:
Java
```
1
| import com.launchdarkly.sdk.*;
---|--- 
2
| import com.launchdarkly.sdk.server.*;
3
| import com.launchdarkly.sdk.server.integrations.*;
4
| 
5
| TestData td = TestData.dataSource();
6
| // You can set any initial flag states here with td.update
7
| 
8
| LDConfig config = new LDConfig.Builder()
9
| .dataSource(td)
10
| .build();
11
| LDClient client = new LDClient(sdkKey, config);
```
To set a flag to a specific value:
Java SDK v6.0
```
1
| td.update(td.flag("flag-key-123abc").variationForAll(false));
---|--- 
```
There are other ways you can configure flag behavior using a test data source. Here is an example:
Java SDK v6.0
```
1
| // This flag is true for the context with the key "context-key-123abc" and kind of "organization",
---|--- 
2
| // and false for everyone else
3
| td.update(td.flag("flag-key-123abc")
4
| .variationForKey(ContextKind.of("organization"), "context-key-123abc", true)
5
| .fallthroughVariation(false));
6
| 
7
| // This flag returns the string variation "green" for contexts who have the custom
8
| // attribute "admin" with a value of true, and "red" for everyone else.
9
| td.update(td.flag("flag-key-123abc")
10
| .variations(LDValue.of("red"), LDValue.of("green"))
11
| .fallthroughVariation(0)
12
| .ifMatch(ContextAttribute.forName("admin"), LDValue.of(true))
13
| .thenReturn(1));
```
To learn more, read [`TestData`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/integrations/TestData.html).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
To configure the SDK to use a test data source:
Node.js SDK v8.x (JavaScript)Node.js SDK v7.x and earlier (JavaScript)
```
1
| const { TestData } = require('@launchdarkly/node-server-sdk/integrations');
---|--- 
2
| 
3
| const td = new TestData();
4
| testData.update(td.flag('flag-key-123abc').booleanFlag().variationForAll(true));
5
| const client = new LDClient('sdk-key-123abc', { updateProcessor: td.getFactory() });
6
| 
7
| // flags can be updated at any time:
8
| td.update(td.flag('flag-key-456def')
9
| .variationForUser('user-key-123abc', true)
10
| .fallthroughVariation(false));
```
To learn more, read [`TestData`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/classes/integrations.TestData.html).
### PHP
###### Expand PHP code sample
To configure the SDK to use a test data source:
PHP
```
1
| require 'vendor/autoload.php';
---|--- 
2
| 
3
| $td = new LaunchDarkly\Integrations\TestData();
4
| // You can set any initial flag states here with td.update
5
| 
6
| $client = new LaunchDarkly\LDClient($sdkKey, ['feature_requester' => $td]);
```
To set a flag to a specific value:
PHP SDK v5.0
```
1
| $td->update($td->flag("flag-key-123abc")->variationForAll(false));
---|--- 
```
There are other ways you can configure flag behavior using a test data source. Here is an example:
PHP SDK v5.0
```
1
| // This flag is true for the context with the key "context-key-123abc" and kind of "organization",
---|--- 
2
| // and false for everyone else
3
| $td->update(
4
| $td->flag("flag-key-123abc")
5
| ->variationForKey("organization", "context-key-123abc", true)
6
| ->fallthroughVariation(false)
7
| );
8
| 
9
| // This flag returns the string variation "green" for contexts that have the custom
10
| // attribute "admin" with a value of true, and "red" for everyone else.
11
| $td->update(
12
| $td->flag("flag-key-123abc")
13
| ->variations("red", "green")
14
| ->fallthroughVariation(0)
15
| ->ifMatch("admin", true)
16
| ->thenReturn(1)
17
| );
```
To learn more, read [`TestData`](https://launchdarkly.github.io/php-server-sdk/classes/LaunchDarkly-Integrations-TestData.html).
### Python
###### Expand Python code sample
To configure the SDK to use a test data source:
Python
```
1
| from ldclient.integrations.test_data import TestData
---|--- 
2
| from ldclient import LDClient, Config
3
| 
4
| td = TestData.data_source()
5
| # You can set any initial flag states here with td.update
6
| client = LDClient(config=Config(sdk_key, update_processor_class = td))
```
To set a flag to a specific value:
Python SDK v8.0
```
1
| td.update(td.flag("flag-key-123abc").variation_for_all(True))
---|--- 
```
There are other ways you can configure flag behavior using a test data source. Here is an example:
Python SDK v8.0
```
1
| # This flag is true for the context with the key "context-key-123abc" and kind
---|--- 
2
| # of "organization", and false for everyone else.
3
| 
4
| td.update(
5
| td.flag("flag-key-456def") \
6
| .variation_for_key("organization", "context-key-123abc", True) \
7
| .fallthrough_variation(False)
8
| )
9
| 
10
| # This flag returns the string variation "green" for contexts of the kind "user"
11
| # who have the custom attribute "admin" with a value of true, and "red" for
12
| # everyone else.
13
| td.update(
14
| td.flag("flag-key-789ghi") \
15
| .variations("red", "green")
16
| .fallthrough_variation(0)
17
| .if_match_context("user", "admin", True)
18
| .then_return(1)
19
| )
```
To learn more, read [`TestData`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-testing.html#ldclient-integrations-test-data-module).
### Ruby
###### Expand Ruby code sample
To configure the SDK to use a test data source:
Ruby
```
1
| require 'ldclient-rb'
---|--- 
2
| 
3
| td = LaunchDarkly::Integrations::TestData.data_source
4
| # You can set any initial flag states here with td.update
5
| 
6
| config = LaunchDarkly::Config.new(data_source = td)
7
| client = LaunchDarkly::LDClient.new(sdk_key, config)
```
To set a flag to a specific value:
Ruby SDK v7.0
```
1
| td.update(td.flag("flag-key-123abc").variation_for_all(false))
---|--- 
```
There are other ways you can configure flag behavior using a test data source. Here is an example:
Ruby SDK v7.0
```
1
| # This flag is true for the context key "context-key-123abc" and false for everyone else
---|--- 
2
| td.update(td.flag("flag-key-456def").
3
| variation_for_user("context-key-123abc", true).
4
| fallthrough_variation(false))
5
| 
6
| # This flag returns the string variation "green" for contexts who have the custom
7
| # attribute "admin" with a value of true, and "red" for everyone else.
8
| td.update(td.flag("flag-key-789ghi").
9
| variations("red", "green").
10
| fallthrough_variation(0).
11
| if_match_context("user", "admin", true).then_return(1))
```
To learn more, read [`TestData`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Integrations/TestData.html).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs