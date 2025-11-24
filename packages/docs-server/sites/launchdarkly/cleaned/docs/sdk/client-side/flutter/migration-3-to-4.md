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
 * [Understanding changes to initialization](#understanding-changes-to-initialization)
 * [Understanding changes to LDConfig](#understanding-changes-to-ldconfig)
 * [Understanding changes to LDClient and LDValue](#understanding-changes-to-ldclient-and-ldvalue)
 * [Understanding changes to connecting, listening, and fetching](#understanding-changes-to-connecting-listening-and-fetching)
 * [Connection mode changes](#connection-mode-changes)
 * [Subscribing to flag changes](#subscribing-to-flag-changes)
 * [Background fetch](#background-fetch)
 * [Understanding changes to LDContext](#understanding-changes-to-ldcontext)
 * [Logging](#logging)
## Overview
This topic explains the changes in the Flutter SDK version 4 release and how to migrate to that version.
**Version 4.0 includes breaking changes**. Version 4 of the Flutter SDK is now implemented in Flutter and supports development on all Flutter platforms.
As part of this update, version 4 includes the following changes:
 * The Flutter SDK now uses either a mobile key or a client-side ID as its credential, depending on the platform that you build for. To learn more, read [Understanding changes to initialization](/docs/sdk/client-side/flutter/migration-3-to-4#understanding-changes-to-initialization).
 * Setting the configuration options no longer uses a builder pattern. You can set the configuration options directly, including the credential. Then, pass the configuration object to the client when you instantiate it. To learn more, read [Understanding changes to LDConfig](/docs/sdk/client-side/flutter/migration-3-to-4#understanding-changes-to-ldconfig).
 * The `LDClient` is not required to be a singleton. Instead, you instantiate the client with configuration options and a context, and then call functions on this instance. To learn more, read [Understanding changes to LDClient and LDValue](/docs/sdk/client-side/flutter/migration-3-to-4#understanding-changes-to-ldclient-and-ldvalue).
 * Most of the `LDClient` methods are now synchronous, and do not need `await`. To learn more, read [Understanding changes to LDClient and LDValue](/docs/sdk/client-side/flutter/migration-3-to-4#understanding-changes-to-ldclient-and-ldvalue).
 * The mechanics of some of the connecting, listening, and fetching functionality has changed. To learn more, read [Understanding changes to connecting, listening, and fetching](/docs/sdk/client-side/flutter/migration-3-to-4#understanding-changes-to-connecting-listening-and-fetching).
 * Anonymous contexts now have the same behavior across all platforms. Anonymous contexts now respect the key provided. In the Flutter SDK version 3, anonymous contexts on Android would have their provided key overwritten with a generated key, while anonymous contexts on iOS would have their provided key respected.
 * The `LDContext` builder now provides setters for primitive types, so that you do not need to create the `LDValue`s yourself. Each setter also provides an optional parameter to indicate whether the attribute is private. To learn more, read [Understanding changes to LDContext](/docs/sdk/client-side/flutter/migration-3-to-4#understanding-changes-to-ldcontext).
 * Logging is now available. To learn more, read [Logging](/docs/sdk/client-side/flutter/migration-3-to-4#logging).
Additionally, when you migrate from the existing Flutter SDK version 3 to the new Flutter SDK version 4, your stored data will not automatically be ported.
## Understanding changes to initialization
The Flutter SDK version 4 uses either a mobile key or a client-side ID as its credential, depending on the platform that you build for. If you are building for Windows, Mac, Linux, Android, or iOS, you must use a mobile key. If you are building for a web browser, you must use a client-side ID. In version 3, only a mobile key was accepted.
Your environment’s mobile key and client-side ID are both available from the Environments list for each project.
You can set these credentials in the `LAUNCHDARKLY_MOBILE_KEY` and `LAUNCHDARKLY_CLIENT_SIDE_ID` environment variables, and then use the `CredentialSource` helper to select your credential and provide it to your configuration. `CredentialSource` expects one of the two environment variables to be set, but not both.
Here’s how to provide credentials in your configuration options:
Flutter SDK v4, providing credentials in config
```
1
| final config = LDConfig(CredentialSource.fromEnvironment(), AutoEnvAttributes.enabled)
---|--- 
```
To learn more, read [Get started](/docs/sdk/client-side/flutter#get-started) in the Flutter SDK reference guide.
## Understanding changes to LDConfig
In version 4 of the Flutter SDK, you can set the configuration options directly. The credential and automatic environment attributes configuration options are required. All other configuration options are optional and use default values if not set.
After you set the configuration, you can create a client using the configuration and a context.
Here’s an example that configures the credential, automatic environment attributes, and evaluation reasons options:
Flutter SDK v4Flutter SDK v3.x
```
1
| final config = LDConfig(
---|--- 
2
| CredentialSource.fromEnvironment(),
3
| AutoEnvAttributes.enabled,
4
| dataSourceConfig: DataSourceConfig(
5
| evaluationReasons: true
6
| ),
7
| );
```
To learn more, read [Configuration](/docs/sdk/features/config#flutter).
## Understanding changes to LDClient and LDValue
In version 4 of the Flutter SDK, the `LDClient` is no longer a singleton. Instead, you create a client of type `LDClient` and then call functions on it. You must change your initialization code to accommodate this.
Here’s how:
Flutter SDK v4Flutter SDK v3.x
```
1
| final config = LDConfig(
---|--- 
2
| CredentialSource.fromEnvironment(),
3
| AutoEnvAttributes.enabled,
4
| dataSourceConfig: DataSourceConfig(
5
| evaluationReasons: true
6
| ),
7
| );
8
| 
9
| final context = LDContextBuilder()
10
| .kind("user", "user-key-123abc")
11
| .build();
12
| 
13
| final client = LDClient(config, context);
14
| await client.start().timeout(const Duration(seconds: 30));
```
You can create multiple clients, each tied to separate credentials and separate environments, if you need to.
To learn more about initializing the client, read [Get started](/docs/sdk/client-side/flutter#get-started) in the Flutter SDK reference guide. To learn more about features supported by the client, read [Supported features](/docs/sdk/client-side/flutter#supported-features).
Most of the `LDClient` methods are now synchronous, and do not need an `await` in version 4 of the SDK. The `close`, `flush`, `identify`, and `clear` methods are asynchronous and still need an `await`. However, the other `LDClient` methods, including the `*Variation` methods for evaluating flags, are now synchronous:
Flutter SDK v4Flutter SDK v3.x
```
1
| await client.identify(updatedContext);
---|--- 
2
| 
3
| final variationResult = client.boolVariation(flagKey, false);
4
| 
5
| await client.close();
```
Finally, all of the `LDClient` methods that use parameters with the type `LDValue` now require that you pass in an `LDValue` explicitly. In version 3 of the SDK, you could pass in `null` for these parameters. In version 4, you must use an `LDValue` of null. To learn more, read [`LDValue`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDValue-class.html).
## Understanding changes to connecting, listening, and fetching
In version 4 of the Flutter SDK, there are a few breaking changes to client methods for connecting, listening, and fetching.
### Connection mode changes
It is rare to change the client’s connection mode from the default. If you do set the client’s connection mode on startup, the specifics have changed. In version 4, use the `initialConnectionMode` configuration option:
Flutter SDK v4Flutter SDK v3.x
```
1
| final config = LDConfig(
---|--- 
2
| CredentialSource.fromEnvironment(),
3
| AutoEnvAttributes.enabled,
4
| dataSourceConfig: DataSourceConfig(
5
| initialConnectionMode: ConnectionMode.offline // or .polling, or .streaming
6
| ),
7
| );
```
To change the client’s connection mode after it has started, use `offline`:
Flutter SDK v4Flutter SDK v3.x
```
1
| // To switch an already-instantiated client to offline mode:
---|--- 
2
| client.offline(true);
3
| 
4
| // To switch it back:
5
| client.offline(false);
```
To learn more, read [Offline mode](/docs/sdk/features/offline-mode#flutter).
### Subscribing to flag changes
To subscribe to feature flag changes, register listeners for change events from the SDK. The format for doing this has changed in version 4 of the SDK.
Here’s how:
Flutter SDK v4Flutter SDK v3.x
```
1
| final sub = client.flagChanges.listen((changeEvent) {
---|--- 
2
| for(var flagKey in changeEvent.keys) {
3
| print(client.jsonVariation(flagKey, LDValue.ofString('default')));
4
| }
5
| });
```
To learn more, read [Subscribing to flag changes](/docs/sdk/features/flag-changes#flutter).
### Background fetch
If you are using the Flutter SDK version 4 on desktop or on the web, by default your application will continue to get updates. For example, if the end user minimizes your Windows app or moves to a different tab in their web browser, the SDK will continue to fetch flags in the background. You can change this behavior in your client configuration.
If you are using the Flutter SDK version 4 in a power-constrained situation, such as in a mobile application on iOS or Android, the SDK will not receive real-time events when backgrounded.
In the Flutter SDK version 3, the SDK did receive real-time events through background fetch on Android platforms, but not on iOS platforms. In version 4 of the SDK, this behavior has been standardized. Mobile applications do not receive real-time events when backgrounded.
## Understanding changes to LDContext
The `LDContext` builder now provides setters for primitive types, so that you do not need to create the `LDValue`s yourself.
Starting in version 4, the Flutter SDK provides `setBool`, `setNum`, and `setString` methods that you can use when you attributes to a context. Each setter also provides an optional parameter to indicate whether the attribute is private.
Here’s how:
Flutter SDK v4Flutter SDK v3.x
```
1
| final context = LDContextBuilder()
---|--- 
2
| .kind('user', 'user-key-123abc')
3
| .setString('name', 'Sandy Smith') // or .name('Sandy Smith')
4
| .setNum('employeeID', 1234, private: true)
5
| .setBool('fullTimeEmployee', true, private: true)
6
| .build();
```
To learn more, read [Context configuration](/docs/sdk/features/context-config#flutter) and [Private attributes](/docs/sdk/features/private-attributes#flutter).
## Logging
Version 4 of the Flutter SDK now supports logging. By default, the SDK logs at the `info` level with a tag of “LaunchDarkly.” To change the logging, construct an `LDLogger` and include it in your `LDConfig`. You can change the log level, tag, and output destinations when you construct the logger.
Here’s how:
Flutter SDK v4
```
1
| final logger = LDLogger(level: LDLogLevel.warn);
---|--- 
2
| 
3
| final config = LDConfig(
4
| CredentialSource.fromEnvironment(),
5
| AutoEnvAttributes.enabled,
6
| logger: logger,
7
| );
```
To learn more, read [Logging](/docs/sdk/features/logging#flutter).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs