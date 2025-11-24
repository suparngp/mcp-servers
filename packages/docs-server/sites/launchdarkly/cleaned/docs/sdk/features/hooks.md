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
 * [Hooks stages](#hooks-stages)
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [Go](#go)
 * [Java](#java)
 * [Node.js (server-side)](#nodejs-server-side)
 * [Python](#python)
 * [Ruby](#ruby)
 * [Client-side SDKs](#client-side-sdks)
 * [Android](#android)
 * [iOS](#ios)
 * [JavaScript](#javascript)
 * [React Native](#react-native)
## Overview
This topic explains how to define and add hooks to LaunchDarkly SDKs. Hooks are collections of developer-defined callbacks. They contain methods that the SDK executes at various points of interest.
In LaunchDarkly SDKs, hooks provide entry points to observe or modify aspects of SDK operation. For example, when you [enable OpenTelemetry in a server-side SDK](/docs/sdk/features/opentelemetry-server-side), you add a tracing hook, provided by LaunchDarkly, that surfaces telemetry data. You might also write your own hook, for instance to support logging or reporting errors.
## Hooks stages
LaunchDarkly SDKs provide the following series of hooks:
Series | Stages | Execution 
---|---|--- 
Evaluation | `beforeEvaluation`, `afterEvaluation` | When you include a hook in your SDK configuration, the SDK executes these two stages before and after you [evaluate a feature flag](/docs/sdk/features/evaluating). 
Identify | `beforeIdentify`, `afterIdentify` | When you include a hook in your SDK configuration, the SDK executes these two stages before and after you [identify a context](/docs/sdk/features/identify). Only available for client-side SDKs. 
Track | `afterTrack` | When you include a hook in your SDK configuration, the SDK executes this stage after you [send a custom event](/docs/sdk/features/events). 
Not all SDKs support all of these series. In particular, the identify series is only available for client-side SDKs. Details about how to add hooks to each SDK are available in the SDK-specific sections below.
 * [Server-side SDKs](/docs/sdk/features/hooks#server-side-sdks)
 * [Client-side SDKs](/docs/sdk/features/hooks#client-side-sdks)
## Server-side SDKs
This feature is available in the following SDKs:
 * [.NET (server-side)](/docs/sdk/features/hooks#net-server-side)
 * [Go](/docs/sdk/features/hooks#go)
 * [Java](/docs/sdk/features/hooks#java)
 * [Node.js (server-side)](/docs/sdk/features/hooks#nodejs-server-side)
 * [Python](/docs/sdk/features/hooks#python)
 * [Ruby](/docs/sdk/features/hooks#ruby)
### .NET (server-side)
###### Expand .NET (server-side) code sample
To use hook functionality with the .NET (server-side) SDK, first import the `LaunchDarkly.Sdk.Server.Hooks` namespace. Then, define a new hook. This class must derive from the [`Hook`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Hooks.Hook.html) class and override its methods. Finally, reference the hook in the configuration options when you initialize the SDK client.
Here’s how:
.NET (server-side), v8.4+
```
1
| using LaunchDarkly.Sdk.Server.Hooks;
---|--- 
2
| 
3
| public class ExampleHook : Hook {
4
| 
5
| // Implement at least one of `BeforeEvaluation`, `AfterEvaluation`
6
| 
7
| // `BeforeEvaluation` is called during the execution of a variation method
8
| // before the flag value has been determined
9
| 
10
| // `AfterEvaluation` is called during the execution of a variation method
11
| // after the flag value has been determined
12
| 
13
| }
14
| 
15
| var exampleHook = new ExampleHook();
16
| 
17
| var config = Configuration.Builder("sdk-key-123abc")
18
| .Hooks(Components.Hooks()
19
| .Add(exampleHook)
20
| ).Build();
21
| 
22
| var client = new LdClient(config);
```
To learn more, read [`Hooks`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Hooks.html).
### Go
###### Expand Go code sample
To use hook functionality with the Go SDK, first import the `ldhooks` package. Then, define a new hook. It must implement the [`Hook`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7@v7.4.0/ldhooks#Hook) interface. Finally, reference the hook in the configuration options when you initialize the SDK client.
Here’s how:
Go SDK, v7.4+
```
1
| import (
---|--- 
2
| ld "github.com/launchdarkly/go-server-sdk/v7"
3
| "github.com/launchdarkly/go-server-sdk/v7/ldhooks"
4
| )
5
| 
6
| type exampleHook struct {
7
| ldhooks.Unimplemented
8
| metadata ldhooks.Metadata
9
| }
10
| 
11
| func (e exampleHook) Metadata() ldhooks.Metadata {
12
| return e.metadata
13
| }
14
| 
15
| // Implement at least one of `BeforeEvaluation`, `AfterEvaluation`
16
| 
17
| // `BeforeEvaluation` is called during the execution of a variation method
18
| // before the flag value has been determined
19
| 
20
| // `AfterEvaluation` is called during the execution of a variation method
21
| // after the flag value has been determined
22
| 
23
| func newExampleHook() exampleHook {}
24
| 
25
| var config ld.Config
26
| 
27
| client, _ = ld.MakeCustomClient("sdk-key-123abc",
28
| ld.Config{
29
| Hooks: []ldhooks.Hook{newExampleHook()},
30
| }, 5*time.Second)
```
To learn more, read [`Hook`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7@v7.4.0/ldhooks#Hook).
### Java
###### Expand Java code sample
To use hook functionality with the Java SDK, first define a new hook. This class must implement the [`Hook`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/integrations/Hook.html) abstract class. Then, reference the hook in the configuration options when you initialize the SDK client.
Here’s how:
Java SDK, v7.4+
```
1
| import com.launchdarkly.sdk.server.integrations.Hook;
---|--- 
2
| 
3
| class ExampleHook extends Hook {
4
| 
5
| public ExampleHook(String name) {
6
| super(name);
7
| }
8
| 
9
| // Implement at least one of `beforeEvaluation`, `afterEvaluation`
10
| 
11
| // `beforeEvaluation` is called during the execution of a variation method
12
| // before the flag value has been determined
13
| 
14
| // `afterEvaluation` is called during the execution of a variation method
15
| // after the flag value has been determined
16
| }
17
| 
18
| ExampleHook exampleHook = new ExampleHook("example-hook");
19
| 
20
| LDConfig config = new LDConfig.Builder()
21
| .hooks(
22
| Components.hooks().setHooks(Collections.singletonList(exampleHook)))
23
| .build();
24
| 
25
| LDClient client = new LDClient("sdk-key-123abc", config);
```
To learn more, read [`Hook`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/integrations/Hook.html).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
To use hook functionality with the Node.js (server-side) SDK, first define a new hook. This class must extend the [`Hook`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/integrations.Hook.html) interface. Then, reference the hook in the configuration options when you initialize the SDK client.
Here’s how:
Node.js (server-side) SDK, v9.3+
```
1
| export class ExampleHook implements integrations.Hook {
---|--- 
2
| 
3
| getMetadata() {
4
| return { name: 'Example hook'}
5
| }
6
| 
7
| // Implement at least one of `beforeEvaluation`, `afterEvaluation`
8
| 
9
| // `beforeEvaluation` is called during the execution of a variation method
10
| // before the flag value has been determined
11
| 
12
| // `afterEvaluation` is called during the execution of a variation method
13
| // after the flag value has been determined
14
| }
15
| 
16
| const options: ld.LDOptions = {
17
| hooks: [new ExampleHook()]
18
| };
19
| 
20
| const client = ld.init('sdk-key-123abc', options);
```
You can also add a hook to an existing client using the `addHook` method:
Node.js (server-side) SDK, v9.3+
```
1
| const client = ld.init('sdk-key-123abc', options);
---|--- 
2
| client.addHook(new ExampleHook());
```
To learn more, read [`Hook`](https://launchdarkly.github.io/js-core/packages/sdk/server-node/docs/interfaces/integrations.Hook.html).
### Python
###### Expand Python code sample
To use hook functionality with the Python SDK, first define a new hook. This class must inherit from [`ldclient.hook.Hook`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#ldclient.hook.Hook). Then, reference the hook in the configuration options when you initialize the SDK client.
Here’s how:
Python, v9.4+
```
1
| import ldclient
---|--- 
2
| 
3
| from ldclient import Config
4
| from ldclient.hook import Hook, Metadata
5
| 
6
| 
7
| class ExampleHook(Hook):
8
| @property
9
| def metadata(self) -> Metadata:
10
| return Metadata(name="example-hook")
11
| 
12
| # Implement at least one of `before_evaluation`, `before_evaluation`
13
| 
14
| # `before_evaluation` is called during the execution of a variation method
15
| # before the flag value has been determined
16
| 
17
| # `after_evaluation` is called during the execution of a variation method
18
| # after the flag value has been determined
19
| 
20
| 
21
| example_hook = ExampleHook()
22
| 
23
| config = Config("sdk-key-123abc", hooks=[example_hook])
24
| 
25
| ldclient.set_config(config=config)
26
| client = ldclient.get()
```
You can also add a hook to an existing client using the `add_hook` method:
Python, v9.4+
```
1
| ldclient.set_config(config=config)
---|--- 
2
| client = ldclient.get()
3
| 
4
| client.add_hook(example_hook)
```
To learn more, read [`ldclient.hook`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#module-ldclient.hook).
If you are working with forking processes, any configuration that you provide to the SDK must survive the forking process independently. We recommend that you add any hooks after a `postfork()` call, unless you are certain they can survive the forking process. To learn more, read [Initialize the client](/docs/sdk/server-side/python#initialize-the-client) and [`ldclient.postfork`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#ldclient.client.LDClient.postfork).
### Ruby
###### Expand Ruby code sample
To use hook functionality with the Ruby SDK, first define a new hook. This class must include the [`Hooks`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Interfaces/Hooks/Hook.html) mixin. Then, reference the hook in the configuration options when you initialize the SDK client.
Here’s how:
Ruby, v8.4+
```
1
| require 'ldclient-rb'
---|--- 
2
| 
3
| class ExampleHook
4
| include LaunchDarkly::Interfaces::Hooks::Hook
5
| 
6
| def metadata
7
| LaunchDarkly::Interfaces::Hooks::Metadata.new('example-hook')
8
| end
9
| 
10
| # Implement at least one of `before_evaluation`, `after_evaluation`
11
| 
12
| # `before_evaluation` is called during the execution of a variation method
13
| # before the flag value has been determined
14
| 
15
| # `after_evaluation` is called during the execution of a variation method
16
| # after the flag value has been determined
17
| end
18
| 
19
| example_hook = ExampleHook.new
20
| 
21
| config = LaunchDarkly::Config.new(hooks: [example_hook])
22
| 
23
| client = LaunchDarkly::LDClient.new("sdk-key-123abc", config)
```
You can also add a hook to an existing client using the `add_hook` method:
Ruby, v8.4+
```
1
| client = LaunchDarkly::LDClient.new("sdk-key-123abc", config)
---|--- 
2
| 
3
| client.add_hook(example_hook)
```
To learn more, read [`Hooks`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Interfaces/Hooks.html).
If you are working with forking processes, any configuration that you provide to the SDK must survive the forking process independently. We recommend that you add any hooks after a `postfork()` call, unless you are certain they can survive the forking process. To learn more, read [Initialize the client](/docs/sdk/server-side/ruby#initialize-the-client) and [`postfork`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/LDClient.html#postfork-instance_method).
## Client-side SDKs
This feature is available in the following SDKs:
 * [Android](/docs/sdk/features/hooks#android)
 * [iOS](/docs/sdk/features/hooks#ios)
 * [JavaScript](/docs/sdk/features/hooks#javascript)
 * [React Native](/docs/sdk/features/hooks#react-native)
### Android
###### Expand Android code sample
To use hook functionality with the Android SDK, first define a new hook. This class must extend the [`Hook`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/integrations/Hook.html) class. Then, reference the hook in the configuration options when you initialize the SDK client.
Here’s how:
Android SDK, v5.8+
```
1
| public class ExampleHook extends Hook {
---|--- 
2
| 
3
| // Implement at least one of:
4
| //
5
| // * `beforeEvaluation` - called during the execution of a variation method
6
| // before the flag value has been determined
7
| //
8
| // * `afterEvaluation` - called during the execution of a variation method
9
| // after the flag value has been determined
10
| //
11
| // * `beforeIdentify` - called during the execution of the identify process
12
| // before the operation completes, but after any context modifications are performed
13
| //
14
| // * `afterIdentify` - called during the execution of the identify process
15
| // after the operation completes
16
| //
17
| // * `afterTrack` - called during the execution of the track process
18
| // after the event has been enqueued
19
| }
20
| 
21
| List<Hook> hookList = new ArrayList<>();
22
| ExampleHook exampleHook = new ExampleHook("Example hook");
23
| hookList.add(exampleHook);
24
| 
25
| LDConfig ldConfig = new LDConfig.Builder(AutoEnvAttributes.Enabled)
26
| .mobileKey("mobile-key-123abc")
27
| .hooks(
28
| Components.hooks()
29
| .setHooks(hookList)
30
| )
31
| .build();
32
| 
33
| LDContext context = LDContext.create("context-key-123abc");
34
| 
35
| LDClient client = LDClient.init(this.getApplication(), ldConfig, context, 0);
```
You can also add a hook to an existing client using the `setHooks` method:
Android SDK, v5.8+
```
1
| List<Hook> hookList = new ArrayList<>();
---|--- 
2
| ExampleHook exampleHook = new ExampleHook("Example hook");
3
| hookList.add(exampleHook);
4
| 
5
| LDClient client = LDClient.init(this.getApplication(), ldConfig, context, 0);
6
| client.setHooks(hookList);
```
To learn more, read [`Hook`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/integrations/Hook.html) and [`HooksConfigurationBuilder`](https://launchdarkly.github.io/android-client-sdk/com/launchdarkly/sdk/android/integrations/HooksConfigurationBuilder.html).
### iOS
###### Expand iOS code sample
To use hook functionality with the iOS SDK, first define a new hook. This class must use the [`Hook`](https://launchdarkly.github.io/ios-client-sdk/Protocols/Hook.html) protocol. Then, reference the hook in the configuration options when you initialize the SDK client.
Here’s how:
iOS, v9.7.2+ (Swift)
```
1
| import LaunchDarkly
---|--- 
2
| 
3
| class ExampleHook: Hook {
4
| func metadata() -> Metadata {
5
| return Metadata(name: "example-hook")
6
| }
7
| 
8
| /// Implement at least one of `beforeEvaluation`, `afterEvaluation`
9
| 
10
| /// beforeEvaluation is called during the execution of a variation method
11
| /// before the flag value has been determined
12
| 
13
| /// afterEvaluation is called during the execution of a variation method
14
| /// after the flag value has been determined
15
| }
16
| 
17
| let exampleHook = ExampleHook()
18
| 
19
| var config = LDConfig(
20
| mobileKey: "mobile-key-123abc",
21
| autoEnvAttributes: .enabled
22
| )
23
| config.hooks = [exampleHook]
24
| 
25
| let context = try! LDContextBuilder(key: "context-key-123abc").build().get()
26
| 
27
| LDClient.start(config: config, context: context, startWaitSeconds: 5) { timedOut in
28
| if timedOut {
29
| /// Client may not have the most recent flags for the configured context
30
| } else {
31
| /// Client has received flags for the configured context
32
| }
33
| }
```
To learn more, read [`Hook`](https://launchdarkly.github.io/ios-client-sdk/Protocols/Hook.html).
### JavaScript
###### Expand JavaScript code sample
To use hook functionality with the JavaScript SDK, first define a new hook. This class must extend the [`Hook`](https://launchdarkly.github.io/js-client-sdk/interfaces/Hook.html) interface. Then, reference the hook in the configuration options when you initialize the SDK client.
Here’s how:
JavaScript SDK, v3.6+
```
1
| export class ExampleHook implements Hook {
---|--- 
2
| 
3
| getMetadata() {
4
| return { name: 'Example hook'}
5
| }
6
| 
7
| // Implement at least one of:
8
| //
9
| // * `beforeEvaluation` - called during the execution of a variation method
10
| // before the flag value has been determined
11
| //
12
| // * `afterEvaluation` - called during the execution of a variation method
13
| // after the flag value has been determined
14
| //
15
| // * `beforeIdentify` - called during the execution of the identify process
16
| // before the operation completes, but after any context modifications are performed
17
| //
18
| // * `afterIdentify` - called during the execution of the identify process
19
| // after the operation completes
20
| //
21
| // * `afterTrack` - called during the execution of the track process
22
| // after the event has been enqueued
23
| }
24
| 
25
| const options = {
26
| hooks: [new ExampleHook()]
27
| };
28
| 
29
| const client = LDClient.initialize('client-side-id-123abc', context, options);
30
| 
31
| try {
32
| await client.waitForInitialization(5);
33
| proceedWithSuccessfullyInitializedClient();
34
| } catch(err) {
35
| // Client failed to initialized or timed out
36
| // variation() calls return fallback values until initialization completes
37
| }
```
You can also add a hook to an existing client using the `addHook` method:
JavaScript SDK, v3.6+
```
1
| const client = LDClient.initialize('client-side-id-123abc', context, options);
---|--- 
2
| 
3
| try {
4
| await client.waitForInitialization(5);
5
| 
6
| client.addHook(new ExampleHook());
7
| 
8
| proceedWithSuccessfullyInitializedClient();
9
| } catch(err) {
10
| // Client failed to initialized or timed out
11
| // variation() calls return fallback values until initialization completes
12
| }
```
To learn more, read [`Hook`](https://launchdarkly.github.io/js-client-sdk/interfaces/Hook.html).
### React Native
###### Expand React Native code sample
To use hook functionality with the React Native SDK, first define a new hook. This class must extend the [`Hook`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/interfaces/Hook.html) interface. Then, reference the hook in the configuration options when you initialize the SDK client.
Here’s how:
React Native SDK, v10+
```
1
| export class ExampleHook implements Hook {
---|--- 
2
| 
3
| getMetadata() {
4
| return { name: 'Example hook'}
5
| }
6
| 
7
| // Implement at least one of:
8
| //
9
| // * `beforeEvaluation` - called during the execution of a variation method
10
| // before the flag value has been determined
11
| //
12
| // * `afterEvaluation` - called during the execution of a variation method
13
| // after the flag value has been determined
14
| //
15
| // * `beforeIdentify` - called during the execution of the identify process
16
| // before the operation completes, but after any context modifications are performed
17
| //
18
| // * `afterIdentify` - called during the execution of the identify process
19
| // after the operation completes
20
| //
21
| // * `afterTrack` - called during the execution of the track process
22
| // after the event has been enqueued
23
| }
24
| 
25
| const options: ld.LDOptions = {
26
| hooks: [new ExampleHook()]
27
| };
28
| 
29
| const client = new ReactNativeLDClient('mobile-key-123abc', AutoEnvAttributes.Enabled, options);
```
You can also add a hook to an existing client using the `addHook` method:
React Native SDK, v10+
```
1
| const client = new ReactNativeLDClient('mobile-key-123abc', AutoEnvAttributes.Enabled, options);
---|--- 
2
| client.addHook(new ExampleHook());
```
To learn more, read [`Hook`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/interfaces/Hook.html).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs