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
 * [.NET (client-side)](#net-client-side)
 * [Android](#android)
 * [C++ (client-side)](#c-client-side)
 * [Electron](#electron)
 * [Flutter](#flutter)
 * [iOS](#ios)
 * [JavaScript](#javascript)
 * [Node.js (client-side)](#nodejs-client-side)
 * [React Native](#react-native)
 * [React Web](#react-web)
 * [Roku](#roku)
 * [Log levels in the Roku SDK](#log-levels-in-the-roku-sdk)
 * [Legacy API custom logger for the Roku SDK](#legacy-api-custom-logger-for-the-roku-sdk)
 * [SceneGraph API custom logger for the Roku SDK](#scenegraph-api-custom-logger-for-the-roku-sdk)
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [C++ (server-side)](#c-server-side)
 * [Go](#go)
 * [Java](#java)
 * [Lua](#lua)
 * [Node.js (server-side)](#nodejs-server-side)
 * [PHP](#php)
 * [Python](#python)
 * [Ruby](#ruby)
 * [Rust](#rust)
 * [Edge SDKs](#edge-sdks)
 * [Cloudflare](#cloudflare)
 * [Fastly](#fastly)
 * [Vercel](#vercel)
## Overview
This topic explains how to configure the logging feature. Logging is available for client-side, server-side, and edge SDKs.
LaunchDarkly SDKs rely on built-in logging packages and libraries to track events. Depending on which language you use, you can configure logging behavior to be highly or minimally verbose.
 * [Client-side SDKs](/docs/sdk/features/logging#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/logging#server-side-sdks)
 * [Edge SDKs](/docs/sdk/features/logging#edge-sdks)
## Client-side SDKs
This feature is available in the following client-side SDKs:
 * [.NET (client-side)](/docs/sdk/features/logging#net-client-side)
 * [Android](/docs/sdk/features/logging#android)
 * [C++ (client-side)](/docs/sdk/features/logging#c-client-side)
 * [Electron](/docs/sdk/features/logging#electron)
 * [Flutter](/docs/sdk/features/logging#flutter)
 * [iOS](/docs/sdk/features/logging#ios)
 * [JavaScript](/docs/sdk/features/logging#javascript)
 * [Node.js (client-side)](/docs/sdk/features/logging#nodejs-client-side)
 * [React Native](/docs/sdk/features/logging#react-native)
 * [React Web](/docs/sdk/features/logging#react-web)
 * [Roku](/docs/sdk/features/logging#roku)
### .NET (client-side)
###### Expand .NET (client-side) code sample
The client-side .NET SDK uses the `Common.Logging` framework. For an example configuration, read the [Common.Logging README](https://github.com/net-commons/common-logging#2-register-and-configure-commonlogging).
There are two important things to consider before you enable the DEBUG log level:
 1. Debug-level logs can be very verbose. We do not recommend using debug logging in high-volume environments.
 2. Debug-level logs include sensitive information, including LaunchDarkly contexts you create when you use this SDK.
### Android
###### Expand Android code sample
The Android SDK makes heavy use of Timber logging. Include Timber in your application to enable debug output or production logging. An example is shown below to enable debug output when the application is built with a debug configuration.
Here’s how:
JavaKotlin
```
1
| if (BuildConfig.DEBUG) {
---|--- 
2
| Timber.plant(new Timber.DebugTree());
3
| }
```
### C++ (client-side)
###### Expand C++ (client-side) code sample
By default, the SDK uses a console logger. The SDK does not lock on any logging. Ensure that your implementation is thread safe.
Whether you use a custom logger or the default logger, any logging configuration must be done using `LoggingBuilder` before the client is initialized. You cannot modify logging while the client is running.
If you use the default logger, you can configure how verbose it should be. The options are debug, info, warn, and error.
Here is an example:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)
```
1
| auto config_builder = client_side::ConfigBuilder("mobile-key-123abc");
---|--- 
2
| config_builder.Logging()
3
| .Logging(LoggingBuilder::BasicLogging().Tag("ArbitraryLogTag").Level(LogLevel::kWarn));
4
| auto config = config_builder.Build();
```
You can also use your own custom log function.
First, implement the log backend interface. For C++, this means implementing the `ILogBackend` interface. If you are working with the C binding, define the callback functions to implement the log backend interface.
Here’s how:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)
```
1
| #include <launchdarkly/logging/log_level.hpp>
---|--- 
2
| #include <launchdarkly/logging/log_backend.hpp>
3
| 
4
| using namespace launchdarkly;
5
| 
6
| class CustomLogger : public ILogBackend {
7
| public:
8
| /* Should return true if the specified level is enabled; in this example, return true to log all messages. */
9
| bool Enabled(LogLevel level) noexcept override { return true; }
10
| 
11
| /* Forwards to stdout as an example, printing the log tag along with the message. */
12
| void Write(LogLevel level, std::string message) noexcept override {
13
| std::cout << GetLogLevelName(level, "unknown") << ": " << message << std::endl;
14
| }
15
| };
```
Then, install the custom logger in the SDK’s config:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)
```
1
| // Make sure the <memory> header is included for std::make_shared
---|--- 
2
| #include <memory>
3
| 
4
| auto config_builder = client_side::ConfigBuilder("mobile-key-123abc");
5
| config_builder.Logging()
6
| .Logging(LoggingBuilder::CustomLogging().Backend(std::make_shared<CustomLogger>()));
7
| auto config = config_builder.Build();
```
It’s also possible to disable the SDK’s logging:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)
```
1
| auto config_builder = client_side::ConfigBuilder("mobile-key-123abc");
---|--- 
2
| config_builder.Logging().Logging(LoggingBuilder::NoLogging());
3
| 
4
| auto config = config_builder.Build();
```
### Electron
###### Expand Electron code sample
By default, the SDK uses the [`winston`](https://www.npmjs.com/package/winston) package. There are four logging levels: `debug`, `info`, `warn`, and `error`. By default, `debug` messages are hidden.
To change the logging configuration, you can set `LDOptions.logger` to either another Winston instance or any object that implements the `LDLogger` interface. The `createConsoleLogger` function creates a minimal logger.
### Flutter
###### Expand Flutter code sample
The Flutter SDK supports logging in version 4 and later.
There are four logging levels in the Flutter SDK: `debug`, `info`, `warn`, and `error`. You can also set the level to `none` to disable all logging.
By default, the SDK logs at the `info` level with a tag of “LaunchDarkly.” To change the logging, construct an `LDLogger` and include it in your `LDConfig`. You can change the log level, tag, and output destinations when you construct the logger.
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
Optionally, you can create a custom logging implementation. Your implementation should use the `LDLogAdapter` interface.
To learn more, read [`LDLogger`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDLogger-class.html).
### iOS
###### Expand iOS code sample
The iOS SDK emits log messages using calls to [`os_log`](https://developer.apple.com/documentation/os/os_log). The SDK provides a default logger `OSLog(subsystem: "com.launchdarkly", category: "ios-client-sdk")`. This logger can be overridden using the `LDConfig.logger` property.
Here’s how:
iOS SDK v9.x (Swift)iOS SDK v9.x (Objective-C)
```
1
| import OSLog
---|--- 
2
| 
3
| var config = LDConfig(mobileKey: "mobile-key-123abc", autoEnvAttributes: .enabled)
4
| config.logger = OSLog(subsystem: "your.preferred.subsystem", category: "ld-sdk")
5
| 
6
| // You can disable all SDK logging by setting this property to the shared disabled logger
7
| config.logger = .disabled
```
### JavaScript
###### Expand JavaScript code sample
In the default configuration, the SDK sends the output to the console and enables all log levels except `debug`.
To change the logging configuration, set `LDOptions.logger` to any object that implements the `LDLogger` interface and performs logging for the client. To learn more, read [LDOptions](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html) and [LDLogger](https://launchdarkly.github.io/js-client-sdk/interfaces/LDLogger.html) in the SDK API docs.
### Node.js (client-side)
###### Expand Node.js (client-side) code sample
The client-side Node.js SDK offers several choices for logging.
In the default configuration, the SDK sends output to the console and enables all log levels except `debug`.
Versions 1.x of the SDK used the [`winston`](https://www.npmjs.com/package/winston) logging package for the default configuration. Versions 2.0 and later do not have a dependency on `winston`. Instead, they write directly to the console by default.
For full control over logging behavior, you can set the [`logger`](https://launchdarkly.github.io/node-client-sdk/interfaces/LDOptions.html#logger) option to an object that implements the `LDLogger` interface. To learn more about the logger’s requirements and methods, read [LDLogger](https://launchdarkly.github.io/node-client-sdk/interfaces/LDLogger.html). The `winston` package is compatible with this interface, so if you are already using a `winston` logger, you can pass it directly to the SDK.
You can use [`basicLogger`](https://launchdarkly.github.io/node-client-sdk/functions/basicLogger.html) for simpler control over logging behavior. Versions 2.x and earlier of the SDK do not support `basicLogger`.
This example shows how to use `basicLogger` to enable debug-level logging in your SDK configuration:
JavaScriptTypeScript
```
1
| const LaunchDarkly = require('launchdarkly-node-client-sdk');
---|--- 
2
| 
3
| const options = {
4
| logger: LaunchDarkly.basicLogger({
5
| level: 'debug',
6
| }),
7
| };
8
| 
9
| const client = LaunchDarkly.initialize( 'client-side-id-123abc', user, options);
```
Be aware of two considerations when enabling debug-level logging:
 1. Debug-level logs can be very verbose. We do not recommend using debug logging in high-volume environments.
 2. Debug-level logs include sensitive information, including LaunchDarkly users you create when you use this SDK.
### React Native
###### Expand React Native code sample
By default, the React Native SDK uses [`BasicLogger`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/classes/platform-1.BasicLogger.html). This sends output to the console, with a default log level of `info`.
You can use `BasicLogger` to make some changes to logging behavior. For full control over logging behavior, you can set the `LDOptions.logger` option to an object that implements the `LDLogger` interface and performs logging for the client.
This example shows how to use `BasicLogger` to enable debug-level logging in your SDK configuration:
React Native SDK v10
```
1
| import {
---|--- 
2
| AutoEnvAttributes,
3
| BasicLogger,
4
| type LDOptions,
5
| ReactNativeLDClient,
6
| } from '@launchdarkly/react-native-client-sdk';
7
| 
8
| const options: LDOptions = {
9
| logger: new BasicLogger({
10
| level: 'debug',
11
| destination: console.log,
12
| }),
13
| };
14
| const featureClient = new ReactNativeLDClient('mobile-key-123abc', AutoEnvAttributes.Enabled, options);
```
To learn more, read [`LDOptions`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/index.html#LDOptions) and [`LDLogger`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/interfaces/platform-1.LDLogger.html).
### React Web
###### Expand React Web code sample
The React Web SDK relies on the JavaScript SDK for logging-related functionality. In the default configuration, the SDK sends the output to the console and enables all log levels except `debug`.
To change the logging configuration, set `LDOptions.logger` to any object that implements the `LDLogger` interface and performs logging for the client. The `basicLogger`, available in the JavaScript SDK, produces such an object.
Here’s how:
JavaScript
```
1
| import { basicLogger } from 'launchdarkly-js-client-sdk';
---|--- 
2
| 
3
| export default withLDProvider({
4
| clientSideID: 'client-side-id-123abc',
5
| options: {
6
| logger: basicLogger({level: 'debug'})
7
| }
8
| })(App);
```
To learn more, read [LDOptions](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html) and [LDLogger](https://launchdarkly.github.io/js-client-sdk/interfaces/LDLogger.html) in the JavaScript SDK API docs.
### Roku
###### Expand Roku code sample
The Roku SDK’s logging feature is configurable. You can set different log levels, or use a custom logging backend with one of the two supported custom loggers.
Those loggers are:
 * [Legacy API custom logger for the Roku SDK](/docs/sdk/features/logging#legacy-api-custom-logger-for-the-roku-sdk)
 * [SceneGraph API custom logger for the Roku SDK](/docs/sdk/features/logging#scenegraph-api-custom-logger-for-the-roku-sdk)
#### Log levels in the Roku SDK
You can configure the SDK log level. For example, to set the level to `info`:
BrightScript
```
1
| config.setLogLevel(LaunchDarklyLogLevels().info)
---|--- 
```
The SDK supports the following Levels:
BrightScript
```
1
| LaunchDarklyLogLevels().error
---|--- 
2
| LaunchDarklyLogLevels().warn
3
| LaunchDarklyLogLevels().info
4
| LaunchDarklyLogLevels().debug
5
| LaunchDarklyLogLevels().none
```
#### Legacy API custom logger for the Roku SDK
Here is an example of the legacy API custom logger:
Legacy custom logger (BrightScript)
```
1
| function CustomLogger() as Object
---|--- 
2
| return {
3
| log: function(level as Integer, message as String)
4
| 
5
| print level message
6
| end function
7
| }
8
| end function
9
| 
10
| config.setLogger(CustomLogger())
```
#### SceneGraph API custom logger for the Roku SDK
Here is an example of the SceneGraph API custom logger:
CustomLogger.xmlCustomLogger.brs
```
1
| <!-- /components/CustomLogger.xml -->
---|--- 
2
| 
3
| <component name="CustomLogger" extends="Task">
4
| <interface>
5
| <field id="log" type="assocarray" alwaysNotify="true"/>
6
| </interface>
7
| 
8
| <script type="text/brightscript" uri="pkg:/components/CustomLogger.brs"/>
9
| </component>
```
To use the logger, create the SceneGraph logger node, and then:
BrightScript
```
1
| config.setLoggerNode(myLoggerNode)
---|--- 
```
## Server-side SDKs
This feature is available in the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/logging#net-server-side)
 * [C++ (server-side)](/docs/sdk/features/logging#c-server-side)
 * [Go](/docs/sdk/features/logging#go)
 * [Java](/docs/sdk/features/logging#java)
 * [Lua](/docs/sdk/features/logging#lua)
 * [Node.js (server-side)](/docs/sdk/features/logging#nodejs-server-side)
 * [PHP](/docs/sdk/features/logging#php)
 * [Python](/docs/sdk/features/logging#python)
 * [Ruby](/docs/sdk/features/logging#ruby)
 * [Rust](/docs/sdk/features/logging#rust)
### .NET (server-side)
###### Expand .NET (server-side) code sample
The .NET SDK has four logging levels: `Debug`, `Info`, `Warn`, and `Error`. By default, the lowest enabled level is `Info`, so `Debug` messages are hidden. There are two important things to consider if you enable the `Debug` level:
 1. Debug-level logs can be very verbose. We do not recommend using debug logging in high-volume environments.
 2. Debug-level logs include sensitive information, including LaunchDarkly contexts you create when you use this SDK.
The .NET SDK sends log output to `Console.Error` by default. The [`ConfigurationBuilder.Logging`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.ConfigurationBuilder.html#LaunchDarkly_Sdk_Server_ConfigurationBuilder_Logging_) method and the [`LaunchDarkly.Logging`](https://launchdarkly.github.io/dotnet-logging/) API allow you to change the output destination and log level.
Here is an example:
C#
```
1
| using LaunchDarkly.Logging;
---|--- 
2
| using LaunchDarkly.Sdk.Server;
3
| 
4
| var config = Configuration.Builder("sdk-key-123abc")
5
| .Logging(
6
| Components.Logging(Logs.ToWriter(Console.Out)).Level(LogLevel.Debug)
7
| )
8
| .Build();
```
The destination could be another logging framework, such as the .NET Core `Microsoft.Extensions.Logging` API in this example:
C#
```
1
| using LaunchDarkly.Logging;
---|--- 
2
| using LaunchDarkly.Sdk.Server;
3
| 
4
| var config = Configuration.Builder("sdk-key-123abc")
5
| .Logging(Logs.CoreLogging)
6
| .Build();
```
To learn more about logging configuration and adapters for other logging frameworks, read the documentation for [`LaunchDarkly.Logging`](https://launchdarkly.github.io/dotnet-logging/).
All log messages from the SDK are tagged with a logger name, indicating the category of messages. If you use a logging framework like `Microsoft.Extensions.Logging` or NLog, you can use these names to filter the output:
 * `LaunchDarkly.Sdk`: general messages about the operation of the SDK client.
 * `LaunchDarkly.Sdk.DataSource`: messages about how the SDK client receives feature flag data, such as if the connection to LaunchDarkly has been interrupted.
 * `LaunchDarkly.Sdk.DataStore` (or more specific names like `LaunchDarkly.Sdk.DataStore.Redis`): messages about how the SDK client stores feature flag data, such as if you are using a database integration.
 * `LaunchDarkly.Sdk.Evaluation`: messages about unusual conditions during feature flag evaluation, such as if a feature flag could not be evaluated because its configuration is invalid.
 * `LaunchDarkly.Sdk.Events`: messages about analytics events, such as if event data could not be sent to LaunchDarkly due to a network problem.
Before version 6.0, the .NET SDK had different logging behavior:
 * The mechanism for specifying a log destination was the [`Common.Logging`](https://github.com/net-commons/common-logging#2-register-and-configure-commonlogging) framework.
 * If you did not specifically configure a log destination using `Common.Logging`, logging was disabled by default.
 * The main logger name was `LaunchDarkly.Client.LdClient`.
### C++ (server-side)
###### Expand C++ (server-side) code sample
By default, the SDK uses a console logger. The SDK does not lock on any logging. Ensure that your implementation is thread safe.
Whether you use a custom logger or the default logger, any logging configuration must be done using `LoggingBuilder` before the client is initialized. You cannot modify logging while the client is running.
If you use the default logger, you can configure how verbose it should be. The options are debug, info, warn, and error.
Here is an example:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2 (native)
```
1
| auto config_builder = server_side::ConfigBuilder("sdk-key-123abc");
---|--- 
2
| 
3
| using LoggingBuilder = server_side::config::builders::LoggingBuilder;
4
| config_builder.Logging().Logging(
5
| LoggingBuilder::BasicLogging().Tag("ArbitraryLogTag").Level(LogLevel::kWarn)
6
| );
```
You can also use your own custom log function.
First, implement the log backend interface. For C++, this means implementing the `ILogBackend` interface. If you are working with the C binding, define the callback functions to implement the log backend interface.
Here’s how:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x
```
1
| #include <launchdarkly/logging/log_level.hpp>
---|--- 
2
| #include <launchdarkly/logging/log_backend.hpp>
3
| 
4
| using namespace launchdarkly;
5
| 
6
| class CustomLogger : public ILogBackend {
7
| public:
8
| /* Should return true if the specified level is enabled; in this example, return true to log all messages. */
9
| bool Enabled(LogLevel level) noexcept override { return true; }
10
| 
11
| /* Forwards to stdout as an example, printing the log tag along with the message. */
12
| void Write(LogLevel level, std::string message) noexcept override {
13
| std::cout << GetLogLevelName(level, "unknown") << ": " << message << std::endl;
14
| }
15
| };
```
Then, install the custom logger in the SDK’s config:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x
```
1
| // Make sure the <memory> header is included for std::make_shared
---|--- 
2
| #include <memory>
3
| 
4
| auto config_builder = server_side::ConfigBuilder("sdk-key-123abc");
5
| 
6
| config_builder.Logging().Logging(LoggingBuilder::CustomLogging().Backend(
7
| std::make_shared<CustomLogger>()));
8
| 
9
| auto config = config_builder.Build();
```
It’s also possible to disable the SDK’s logging:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)
```
1
| auto config_builder = server_side::ConfigBuilder("sdk-key-123abc");
---|--- 
2
| 
3
| using LoggingBuilder = server_side::config::builders::LoggingBuilder;
4
| config_builder.Logging().Logging(
5
| LoggingBuilder::NoLogging()
6
| );
7
| 
8
| auto config = config_builder.Build();
```
### Go
###### Expand Go code sample
The Go SDK uses a logging abstraction that can write to a [`log.Logger`](https://pkg.go.dev/log#Logger) or anything with a compatible interface. This adds a system of log levels similar to logging frameworks on other platforms. There are four logging levels: `Debug`, `Info`, `Warn`, and `Error`.
By default, all levels of messages are enabled except `Debug`. You can tell the SDK to enable more or fewer levels, to send the output to a different destination, or to disable logging.
Here’s how:
Go SDK v6.0
```
1
| import (
---|--- 
2
| "log"
3
| "os"
4
| ldlog "github.com/launchdarkly/go-sdk-common/v3"
5
| ld "github.com/launchdarkly/go-server-sdk/v6"
6
| "github.com/launchdarkly/go-server-sdk/v6/ldcomponents"
7
| )
8
| 
9
| var config ld.Config
10
| 
11
| loggers := ldlog.NewDefaultLoggers()
12
| 
13
| // Send output to a file
14
| file, _ := os.Create("app.log")
15
| loggers.SetBaseLogger(log.New(file, "", log.LstdFlags))
16
| 
17
| config.Logging = ldcomponents.Logging().
18
| Loggers(loggers).
19
| MinLevel(ldlog.Warn) // Change minimum level to Warn (Debug and Info are disabled)
20
| 
21
| // Or, disable logging
22
| config.Logging = ldcomponents.NoLogging()
```
There are two things to consider if you enable the `Debug` log level:
 1. Debug-level logs can be very verbose. We do not recommend using debug logging in high-volume environments.
 2. Debug-level logs include sensitive information, including LaunchDarkly contexts you create when you use this SDK.
### Java
###### Expand Java code sample
In version 5.10.0 and higher, the Java SDK allows you to specify a destination for logging using the [`LDConfig.Builder.logging`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDConfig.Builder.html#logging-com.launchdarkly.sdk.server.subsystems.ComponentConfigurer-) method and the [`com.launchdarkly.logging`](https://github.com/launchdarkly/java-logging/) API.
If you do not specify a destination, the default behavior depends on the version of the SDK:
 * In versions 5.10.0 and earlier, the default destination is [SLF4J](https://www.slf4j.org/). SLF4J has its own configuration mechanisms for determining where output will go, and for filtering by level and/or logger name. It will not generate any output unless you have provided a configuration. For an example of using SLF4J with a simple console logging configuration, visit an SLF4J-specific version of [hello-java](https://github.com/launchdarkly/hello-java/tree/slf4j-logging).
 * Starting with version 6.0.0, the SDK does not require SLF4J. Instead, it detects whether the application is already using SLF4J. If the SLF4J classes are present in the classpath, then it sends log output to SLF4J by default. If the SLF4J classes are not present in the classpath, then it sends log output to `System.err` by default.
Here is an example of configuring log output to go to the standard output stream (`System.out`), and enabling `DEBUG` level:
Java SDK v5.10.x and later
```
1
| import com.launchdarkly.logging.*;
---|--- 
2
| import com.launchdarkly.sdk.server.*;
3
| 
4
| LDConfig config = new LDConfig.Builder()
5
| .logging(
6
| Components.logging(Logs.toStream(System.out)).level(LDLogLevel.DEBUG)
7
| )
8
| .build();
```
To learn more about logging configuration and adapters for other logging frameworks, read the documentation for [`com.launchdarkly.logging`](https://github.com/launchdarkly/java-logging).
All log messages from the SDK are tagged with a logger name, indicating the category of messages. If you use a logging framework like SLF4J, you can use these names to filter the output:
 * `com.launchdarkly.sdk.server.LDClient`: This is for general messages that do not fall into any other categories.
 * `com.launchdarkly.sdk.server.LDClient.DataSource`: This is for messages related to how the SDK obtains feature flag data. Usually, this means messages about the streaming connection to LaunchDarkly, but if you use polling mode or file data instead, the SDK logs those messages under this name.
 * `com.launchdarkly.sdk.server.LDClient.DataStore`: This is for messages related to how feature flag data is stored. For example, database errors appear here if you are using a database integration.
 * `com.launchdarkly.sdk.server.LDClient.Evaluation`: This is for messages related to feature flag evaluation.
 * `com.launchdarkly.sdk.server.LDClient.Events`: This is for messages related to analytics event processing.
In versions of the SDK before 5.0, logger names were not standardized and were sometimes the names of Java classes that are not part of the public API, but they consistently had a package prefix of either `com.launchdarkly.client.` or `com.launchdarkly.eventsource.`
There are two important things to consider before you enable the `DEBUG` log level:
 1. Debug-level logs can be very verbose. We do not recommend using debug logging in high-volume environments.
 2. Debug-level logs include sensitive information, including LaunchDarkly contexts you create when you use this SDK.
### Lua
###### Expand Lua code sample
The SDK configures a default logger if not otherwise specified. You may modify the behavior of the default logger by specifying a custom log tag and minimum log level, or you may completely replace it with a custom logging implementation.
The SDK does not lock on any logging, so ensure that your custom implementation is thread safe.
You cannot modify logging while the client is running.
If you use the default logger, you can configure how verbose it should be. The options are ‘debug’, ‘info’, ‘warn’, and ‘error’.
Here is an example:
Lua SDK v2
```
1
| local config = {
---|--- 
2
| logging = {
3
| basic = {
4
| tag = "launchdarkly",
5
| level = "warn"
6
| }
7
| }
8
| }
```
You can also use a custom logger. Here’s how:
Lua SDK v2
```
1
| local logger = ld.makeLogBackend(
---|--- 
2
| function(level)
3
| -- Log everything.
4
| return true
5
| end,
6
| function(level, message)
7
| -- Prints in the format: '[level] hello world'
8
| print(string.format("[%s] %s", level, message))
9
| end
10
| )
11
| 
12
| local config = {
13
| logging = {
14
| custom = logger
15
| }
16
| }
```
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
The Node.js SDK offers several choices for logging.
In the default configuration, the SDK sends output to the console and enables all log levels except `debug`.
Pre-6.0 versions of the SDK used the [`winston`](https://www.npmjs.com/package/winston) logging package for the default configuration. Versions 6.0 and later write directly to the console by default.
For full control over logging behavior, you can set the [`logger`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/LDOptions.html#logger) option to an object that implements the `LDLogger` interface. To learn more about the logger’s requirements and methods, read [LDLogger](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/platform-1.LDLogger.html).
You can use [`basicLogger`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/functions/basicLogger-1.html) for simpler control over logging behavior. Versions 5.x and earlier of the SDK do not support `basicLogger`.
This example shows how to use `basicLogger` to enable debug-level logging in your SDK configuration:
Node.js SDK v8.x (TypeScript)Node.js SDK v7.x and earlier (JavaScript)Node.js SDK v7.x and earlier (TypeScript)
```
1
| import { LDOptions, LDLogger, basicLogger } from '@launchdarkly/node-server-sdk';
---|--- 
2
| 
3
| const logger: LDLogger = basicLogger({
4
| level: 'debug',
5
| destination: console.log,
6
| });
7
| 
8
| const options: LDOptions = { logger: logger };
```
There are two important things to consider before you enable debug-level logging:
 1. Debug-level logs can be very verbose. We do not recommend using debug logging in high-volume environments.
 2. Debug-level logs include sensitive information, including LaunchDarkly users you create when you use this SDK.
### PHP
###### Expand PHP code sample
The PHP SDK uses [Monolog](https://github.com/Seldaek/monolog). All loggers are namespaced under `LaunchDarkly`.
There are two important things to consider before you enable the DEBUG log level:
 1. Debug-level logs can be very verbose. We do not recommend using debug logging in high-volume environments.
 2. Debug-level logs include sensitive information, including LaunchDarkly contexts you create when you use this SDK.
You can pass a custom logger to the SDK by using the configurable `logger` property:
PHP
```
1
| $client = new LaunchDarkly\LDClient("sdk-key-123abc", ["logger" => new Logger("LaunchDarkly", [new ErrorLogHandler(0, Level::Debug)])]);
---|--- 
```
### Python
###### Expand Python code sample
The Python SDK uses Python’s built-in [logging library](https://docs.python.org/2/library/logging.html).
Here’s how to enable the debug log level:
Python
```
1
| ld_logger = logging.getLogger("ldclient")
---|--- 
2
| ld_logger.setLevel(logging.DEBUG)
```
There are two important things to consider before you enable the debug log level:
 * Debug-level logs can be very verbose. We do not recommend using debug logging in high-volume environments.
 * Debug-level logs include sensitive information, including LaunchDarkly users you create when you use this SDK.
### Ruby
###### Expand Ruby code sample
The Ruby SDK uses Ruby’s built-in [Logger class](https://ruby-doc.org/stdlib-2.4.0/libdoc/logger/rdoc/Logger.html). All loggers are namespaced under `[LDClient]`.
There are two important things to consider before you enable the DEBUG log level:
 1. Debug-level logs can be very verbose. We do not recommend using debug logging in high-volume environments.
 2. Debug-level logs include sensitive information, including LaunchDarkly contexts you create when you use this SDK.
You can pass a custom logger to the SDK by using the configurable `logger` property:
Ruby
```
1
| log = ::Logger.new($stdout)
---|--- 
2
| log.level = ::Logger::DEBUG
3
| config = LaunchDarkly::Config.new({logger: log})
4
| client = LaunchDarkly::LDClient.new("sdk-key-123abc", config)
```
### Rust
###### Expand Rust code sample
The Rust SDK uses the [log](https://docs.rs/log/latest/log/) crate.
There are two important things to consider before you enable the DEBUG log level:
 1. Debug-level logs can be very verbose. We do not recommend using debug logging in high-volume environments.
 2. Debug-level logs include sensitive information, including LaunchDarkly contexts you create when you use this SDK.
## Edge SDKs
This feature is available in the following edge SDKs:
 * [Cloudflare](/docs/sdk/features/logging#cloudflare)
 * [Fastly](/docs/sdk/features/logging#fastly)
 * [Vercel](/docs/sdk/features/logging#vercel)
### Cloudflare
###### Expand Cloudflare code sample
In the default configuration, the SDK sends output to the console and enables all log levels except debug.
For full control over logging behavior, you can set the logger option to an object that implements the LDLogger interface. To learn more about the logger’s requirements and methods, read [LDLogger](https://launchdarkly.github.io/js-core/packages/sdk/cloudflare/docs/interfaces/LDLogger.html).
This example shows how to use BasicLogger to enable debug-level logging in your SDK configuration:
TypeScript
```
1
| import { BasicLogger, LDOptions } from '@launchdarkly/cloudflare-server-sdk';
---|--- 
2
| 
3
| const options: LDOptions = {
4
| logger: new BasicLogger({ level: 'debug', }),
5
| };
```
### Fastly
###### Expand Fastly code sample
In the default configuration, the SDK sends output to the console and enables all log levels except debug.
This example shows how to use BasicLogger to enable debug-level logging in your SDK configuration:
TypeScript
```
1
| import { BasicLogger, LDOptions } from '@launchdarkly/fastly-server-sdk';
---|--- 
2
| 
3
| const options: LDOptions = {
4
| logger: new BasicLogger({ level: 'debug', }),
5
| };
```
To learn more, read [`BasicLogger`](https://launchdarkly.github.io/js-core/packages/sdk/fastly/docs/classes/BasicLogger.html).
### Vercel
###### Expand Vercel code sample
In the default configuration, the SDK sends output to the console and enables all log levels except debug.
This example shows how to use BasicLogger to enable debug-level logging in your SDK configuration:
TypeScript
```
1
| import { BasicLogger, LDOptions } from '@launchdarkly/vercel-server-sdk';
---|--- 
2
| 
3
| const options: LDOptions = {
4
| logger: new BasicLogger({ level: 'debug', }),
5
| };
```
For full control over logging behavior, you can set the logger option to an object that implements the `LDLogger` interface. To learn more about the logger’s requirements and methods, read [`LDLogger`](https://launchdarkly.github.io/js-core/packages/sdk/vercel/docs/interfaces/platform-1.LDLogger.html).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs