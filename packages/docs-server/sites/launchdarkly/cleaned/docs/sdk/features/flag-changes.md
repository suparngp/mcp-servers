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
 * [Subscribe to flag change notifications](#subscribe-to-flag-change-notifications)
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
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [Go](#go)
 * [Java](#java)
 * [Node.js (server-side)](#nodejs-server-side)
 * [Python](#python)
 * [Ruby](#ruby)
 * [Roku](#roku)
## Overview
This topic explains how to configure each SDK to allow applications to subscribe to flag change notifications. This feature is available for client-side and server-side SDKs.
## Subscribe to flag change notifications
Flag change notifications allow your application to react to and consider flag changes immediately instead of waiting for your code to re-evaluate a flag. Some common use cases include updating content as part of a promotion, enabling/disabling feature code paths efficiently, showing outage bulletins to end users, and granting entitlements to groups of end users. You can register multiple listeners, and they will run in parallel.
Use caution if you use a flag change notification to trigger an identify call as this could lead to an infinite loop where the flag changes the context, which changes the flag, and on and on. For example, you may include additional application information if a flag is true, but you will need to make sure that the inclusion of that information does not cause the flag to toggle.
Details about each SDK’s configuration are available in the SDK-specific sections below.
 * [Client-side SDKs](/docs/sdk/features/flag-changes#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/flag-changes#server-side-sdks)
## Client-side SDKs
This feature is available in the following client-side SDKs:
 * [.NET (client-side)](/docs/sdk/features/flag-changes#net-client-side)
 * [Android](/docs/sdk/features/flag-changes#android)
 * [C++ (client-side)](/docs/sdk/features/flag-changes#c-client-side)
 * [Electron](/docs/sdk/features/flag-changes#electron)
 * [Flutter](/docs/sdk/features/flag-changes#flutter)
 * [iOS](/docs/sdk/features/flag-changes#ios)
 * [JavaScript](/docs/sdk/features/flag-changes#javascript)
 * [Node.js (client-side)](/docs/sdk/features/flag-changes#nodejs-client-side)
 * [React Native](/docs/sdk/features/flag-changes#react-native)
 * [Roku](/docs/sdk/features/flag-changes#roku)
### .NET (client-side)
###### Expand .NET (client-side) code sample
The client uses an event pattern which allows your app to subscribe to feature flag changes in real time.
To subscribe to feature flag changes, register listeners for change events from the SDK:
.NET SDK (C#)
```
1
| client.FlagTracker.FlagChanged += (sender, eventArgs) => {
---|--- 
2
| if (eventArgs.Key == "key-for-flag-i-am-watching") {
3
| DoSomethingWithNewFlagValue(eventArgs.NewBoolValue);
4
| }
5
| };
```
To learn more, read [`IFlagTracker`](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.Client.Interfaces.IFlagTracker.html).
### Android
###### Expand Android code sample
The client uses a listener pattern which allows your app to subscribe to feature flag changes in real time.
To subscribe to feature flag changes, register listeners for change events from the SDK:
JavaKotlin
```
1
| String flagKey = "yourFlagKey";
---|--- 
2
| 
3
| FeatureFlagChangeListener listener = new FeatureFlagChangeListener() {
4
| @Override
5
| public void onFeatureFlagChange(String flagKey) {
6
| boolean newValue = LDClient.get().boolVariation(flagKey, false);
7
| }
8
| };
9
| 
10
| LDClient.get().registerFeatureFlagListener(flagKey, listener);
```
The flag key passed to `onFeatureFlagChange` is the key of the updated flag, which lets a single listener be registered for multiple flags.
You can also disable listeners by unregistering them:
JavaKotlin
```
1
| LDClient.get().unregisterFeatureFlagListener(flagKey, listener);
---|--- 
```
##### Availability
These calls have been available since v2.8.0:
 * `LDAllFlagsListener`
 * `LDClient.registerAllFlagsListener`
 * `LDClient.unregisterAllFlagsListener`
Additionally, we provide an update listener interface for when you want to be notified when the flag cache is updated. The application provides a class implementing `LDAllFlagsListener` which provides the SDK with the method `onChange`. Whenever the SDK’s flag cache is updated, it calls the `onChange` method with a list of flag keys for flags that were updated during the update to the flag cache. If no flag values changed, this list is empty.
Here is an example:
JavaKotlin
```
1
| LDAllFlagsListener listener = new LDAllFlagsListener() {
---|--- 
2
| @Override
3
| public void onChange(List<String> flagKeys) {
4
| // Get new values for flagKeys or other operations
5
| }
6
| };
7
| 
8
| // register all flags listener
9
| LDClient.get().registerAllFlagsListener(listener);
10
| // when done with all flags listener it should be unregistered
11
| LDClient.get().unregisterAllFlagsListener(listener);
```
### C++ (client-side)
###### Expand C++ (client-side) code sample
The client exposes an interface which allows your app to subscribe to feature flag changes in real time.
To subscribe to feature flag changes, register listeners for change events from the SDK:
C++ SDK v3.0 (native)
```
1
| auto listener = client.FlagNotifier().OnFlagChange("flag-key-123abc", [](auto event) {
---|--- 
2
| if (event->Deleted()) {
3
| std::cout << "The flag was deleted" << std::endl;
4
| } else {
5
| std::cout << "The flag was " << event->OldValue() << " and now it is " << event->NewValue() << std::endl;
6
| }
7
| });
8
| 
9
| /* Then, you can disconnect the listener later */
10
| listener->Disconnect();
```
If you are working in C, there are a few more steps:
 1. Define a callback to receive the flag change notification:
C++ SDK v3.0 (C binding), define callback
```
1
| void OnFlagChange(char const* flag_key,
---|--- 
2
| LDValue new_value,
3
| LDValue old_value,
4
| bool deleted,
5
| void* user_data) {
6
| if (deleted) {
7
| printf("The flag %s was deleted\n", flag_key);
8
| } else {
9
| printf("The flag %s was updated\n", flag_key);
10
| }
11
| }
```
 2. Assign the callback by creating a listener connection:
C++ SDK v3.0 (C binding), create listener connection
```
1
| struct LDFlagListener listener;
---|--- 
2
| LDFlagListener_Init(listener);
3
| 
4
| listener.FlagChanged = OnFlagChange;
5
| 
6
| /* You may optionally assign the UserData pointer, which will be passed into FlagChanged. */
7
| /* listener.UserData = &some_struct; */
8
| 
9
| LDListenerConnection connection =
10
| LDClientSDK_FlagNotifier_OnFlagChange(sdk, "flag-key-123abc", listener);
11
| 
12
| /* You can disconnect the listener later */
13
| LDListenerConnection_Disconnect(connection);
```
 3. Ensure the connection is freed when you are done with it:
C++ SDK v3.0 (C binding), free connection
```
1
| LDListenerConnection_Free(connection);
---|--- 
```
To learn more, read [`FlagNotifier`](https://launchdarkly.github.io/cpp-sdks/libs/client-sdk/docs/html/classlaunchdarkly_1_1client__side_1_1Client.html#a0406a57e9c751b013696f6f7663a7170).
### Electron
###### Expand Electron code sample
The client uses an event emitter pattern which allows your app to subscribe to feature flag changes in real time.
To subscribe to feature flag changes, register listeners for change events from the SDK:
JavaScript
```
1
| client.on('update:flag-key-123abc', (newValue, oldValue) => {
---|--- 
2
| console.log('The flag was ' + oldValue + ' and now it is ' + newValue);
3
| });
```
Or, you can listen for all feature flag changes:
JavaScript
```
1
| client.on('update', (allFlagChanges) => {
---|--- 
2
| Object.keys(allFlagChanges).forEach((key) => {
3
| console.log('Flag ' + key + ' is now ' + allFlagChanges[key]);
4
| });
5
| });
```
Subscribing to `change` events automatically turns on streaming mode, unless you have explicitly set `streaming` to `false`.
### Flutter
###### Expand Flutter code sample
The client uses an observer pattern which allows your app to subscribe to feature flag changes in real time.
To subscribe to feature flag changes, register listeners for change events from the SDK:
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
`flagChanges` is a stream that emits all flag changes, so you can use a single listener for multiple flags.
You can disable listeners by unregistering them:
Flutter SDK v4Flutter SDK v3.x
```
1
| sub.cancel();
---|--- 
```
You can also use `flagChanges` if you want to be notified any time the flag cache is updated. The application provides a callback that is activated whenever the SDK receives new flag data from the service. It calls with a list of flag keys that were updated. If no flag values changed, this list is empty.
To learn more, read [`flagChanges`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDClient/flagChanges.html).
### iOS
###### Expand iOS code sample
The client uses an observer pattern which allows your app to subscribe to feature flag changes in real time. To subscribe to feature flag changes, register listeners for change events from the SDK.
The SDK provides methods for listening to a single flag, all flags, or no change to any flag. `observeFlagsUnchanged` is called when the SDK successfully receives an update or comes back online but no flags have changed. If the value of the flag changes, the method executes the handler. It passes in the `changedFlag` containing the old and new flag values, and old and new flag value source.
The SDK retains only weak references to the owner, which lets the client app freely destroy owners without issues. Client apps should use a capture list specifying `[weak self]` inside handlers to avoid retain cycles causing a memory leak.
The SDK executes handlers on the main thread. `LDChangedFlag` does not know the type of `oldValue` or `newValue`. The client app should cast the value into the type needed.
##### LDObserverOwner Lifecycle
The lifetime of the `LDObserverOwner` must extend for at least as long as you want to receive flag change notifications.
To configure the client:
SwiftObjective-C
```
1
| let flagKey = "flag-key-123abc"
---|--- 
2
| let flagObserverOwner = flagKey as LDObserverOwner
3
| 
4
| let client = LDClient.get()!
5
| 
6
| client.observe(keys: [flagKey], owner: flagObserverOwner, handler: { changedFlags in
7
| if changedFlags[flagKey] != nil {
8
| // Your code here
9
| }
10
| })
11
| 
12
| client.stopObserving(owner: flagObserverOwner)
13
| 
14
| client.observeFlagsUnchanged(owner: self) {
15
| client.stopObserving(owner: self as LDObserverOwner)
16
| }
17
| 
18
| client.observeAll(owner: self) {_ in
19
| client.stopObserving(owner: self as LDObserverOwner)
20
| }
```
### JavaScript
###### Expand JavaScript code sample
The client uses an event emitter pattern which allows your app to subscribe to feature flag changes in real time.
To subscribe to all feature flag changes, register listeners for change events from the SDK:
JavaScript
```
1
| client.on('change', (settings) => {
---|--- 
2
| console.log('flags changed:', settings);
3
| });
```
The `settings` object contains a map of updated feature flag keys and values. The map only contains the keys to flags that have changed. You can also subscribe to specific flags.
Here’s how:
JavaScript
```
1
| client.on('change:flag-key-123abc', (value, previous) => {
---|--- 
2
| console.log('flag-key-123abc changed:', value, '(' + previous + ')');
3
| });
```
### Node.js (client-side)
###### Expand Node.js (client-side) code sample
The client uses an event emitter pattern which allows your app to subscribe to feature flag changes in real time.
To subscribe to all feature flag changes, register listeners for change events from the SDK:
JavaScript
```
1
| client.on('change', allChanges => {
---|--- 
2
| console.log('flags changed:', JSON.stringify(allChanges));
3
| });
```
The `allChanges` object contains a map of updated feature flag keys and values. The map only contains the keys to flags that have changed. You can also subscribe to specific flags.
Here’s how:
JavaScript
```
1
| client.on('change:flag-key-123abc', (value, previous) => {
---|--- 
2
| console.log('flag-key-123abc changed:', value, '(was ' + previous + ')');
3
| });
```
### React Native
###### Expand React Native code sample
The client uses an event emitter pattern which allows your app to subscribe to feature flag changes in real time. The available event types include `error` and `change`.
To subscribe to all feature flag changes, register listeners for change events from the SDK. Here’s how:
React Native SDK v10
```
1
| const changeHandler = (context: LDContext, changedKeys: string[]) => {
---|--- 
2
| console.log('listening to change');
3
| };
4
| client.on('change', changeHandler);
```
You can also disable listeners by unregistering them:
React Native SDK v10
```
1
| const changeHandler = (context: LDContext, changedKeys: string[]) => {
---|--- 
2
| console.log('listening to change');
3
| };
4
| client.off('change', changeHandler);
```
To learn more, read [`on`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/classes/LDClientImpl.html#on) and [`off`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/classes/LDClientImpl.html#off).
## Server-side SDKs
This feature is available in the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/flag-changes#net-server-side)
 * [Go](/docs/sdk/features/flag-changes#go)
 * [Java](/docs/sdk/features/flag-changes#java)
 * [Node.js (server-side)](/docs/sdk/features/flag-changes#nodejs-server-side)
 * [Python](/docs/sdk/features/flag-changes#python)
 * [Ruby](/docs/sdk/features/flag-changes#ruby)
### .NET (server-side)
###### Expand .NET (server-side) code sample
##### This feature is not available in all SDK versions
The .NET SDK only supports subscribing to flag changes in versions 6.0.0 and higher.
The SDK provides an event-based mechanism to notify you when flag configurations change. [`LDClient.FlagTracker`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.LdClient.html#LaunchDarkly_Sdk_Server_LdClient_FlagTracker) returns an interface for this mechanism, [`IFlagTracker`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Interfaces.IFlagTracker.html).
Any event handler that you add to the [`IFlagTracker.FlagChanged`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Interfaces.IFlagTracker.html#LaunchDarkly_Sdk_Server_Interfaces_IFlagTracker_FlagChanged) event will be called with a [`FlagChangeEvent`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Interfaces.FlagChangeEvent.html) whenever there is a change in any feature flag’s configuration, or in anything else that could indirectly affect the flag value, such as a prerequisite flag or a segment that the flag uses.
The event data consists only of the flag key. It does not contain a flag value, because in server-side SDKs, there is no such thing as a flag value except when it is evaluated for a specific context.
The listener method is called synchronously from a background task.
Here’s how:
C#
```
1
| void LogWheneverAnyFlagChanges(LdClient client) {
---|--- 
2
| client.FlagTracker.FlagChanged += (sender, event) =>
3
| {
4
| Console.WriteLine("Flag \"{0}\" has changed", event.Key);
5
| };
6
| }
```
To listen for changes in flag values for a specific flag key and context, use [`IFlagTracker.FlagValueChangeHandler()`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Interfaces.IFlagTracker.html#LaunchDarkly_Sdk_Server_Interfaces_IFlagTracker_FlagValueChangeHandler_). It calls your code with a [`FlagValueChangeEvent`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Interfaces.FlagValueChangeEvent.html). This is equivalent to re-evaluating the flag for that context whenever there is a change in that flag. Because flag values can have different data types, the value is reported using the general type [`LdValue`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.LdValue.html).
.NET SDK v7.0 (C#)
```
1
| void LogWheneverOneFlagChangesForOneContext(LdClient client, string flagKey, Context context) {
---|--- 
2
| client.FlagTracker.FlagChanged += client.FlagTracker.FlagValueChangeHandler(
3
| flagKey,
4
| context,
5
| (sender, event) =>
6
| {
7
| Console.WriteLine(
8
| "Flag \"{0}\" for context \"{1}\" has changed from {2} to {3}",
9
| flagKey,
10
| context.Key,
11
| event.OldValue,
12
| event.NewValue
13
| );
14
| });
15
| }
```
### Go
###### Expand Go code sample
The Go SDK provides a channel-based mechanism to notify you when flag configurations change. The [`LDClient.GetFlagTracker()`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDClient.GetFlagTracker) method returns an interface for this mechanism called [`FlagTracker`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7/interfaces#FlagTracker).
Calling `GetFlagTracker().AddFlagChangeListener()` provides a channel that receives a [`FlagChangeEvent`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7/interfaces#FlagChangeEvent) whenever there is a change in any feature flag’s configuration. These changes include anything that could indirectly affect the flag value, such as a prerequisite flag or a segment that the flag uses.
The event data consists only of the flag key. It does not contain a flag value, because in server-side SDKs, flags only have values when they are evaluated for a specific evaluation context.
Go SDK
```
1
| import (
---|--- 
2
| "log"
3
| ld "github.com/launchdarkly/go-server-sdk/v7"
4
| )
5
| 
6
| func logWheneverAnyFlagChanges(client *ld.LDClient) {
7
| updateCh := client.GetFlagTracker().AddFlagChangeListener()
8
| go func() {
9
| for event := range updateCh {
10
| log.Printf("Flag %q has changed", event.Key)
11
| }
12
| }()
13
| }
```
To listen for changes in flag values for a specific flag key and context, use `GetFlagTracker().AddFlagValueChangeListener()`, which provides [`FlagValueChangeEvent`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7/interfaces#FlagValueChangeEvent)s. This is equivalent to re-evaluating the flag for that context whenever `AddFlagChangeListener()` reports a change in that flag. Because flag values can have different data types, the value is reported using the general type [`ldvalue.Value`](https://pkg.go.dev/github.com/launchdarkly/go-sdk-common/v3/ldvalue#Value).
Go SDK
```
1
| import (
---|--- 
2
| "log"
3
| ld "github.com/launchdarkly/go-server-sdk/v7"
4
| "github.com/launchdarkly/go-sdk-common/v3/ldcontext"
5
| "github.com/launchdarkly/go-sdk-common/v3/ldvalue"
6
| )
7
| 
8
| func logWheneverOneFlagChangesForOneUser(client *ld.LDClient, flagKey string, context ldcontext.Context) {
9
| updateCh := client.GetFlagTracker().AddFlagValueChangeListener(flagKey, context, ldvalue.Null())
10
| go func() {
11
| for event := range updateCh {
12
| log.Printf("Flag %q for context %q has changed from %s to %s", event.Key,
13
| context.Key(), event.OldValue, event.NewValue)
14
| }
15
| }()
16
| }
```
If you are using scoped clients, use `CurrentContext()` to pass in the scoped client’s current context. There is not an `AddFlagValueChangeListener` method in the `LDScopedClient`.
##### LDScopedClient is in beta
`LDScopedClient` is in beta. It is still undergoing testing and active development. Its functionality may change without notice, including becoming backwards incompatible.
With both of these methods, it is the caller’s responsibility to consume values from the channel. Letting values accumulate in the channel can cause an SDK goroutine to be blocked.
##### The flag change event channel can fill
If you call `GetFlagTracker().AddFlagChangeListener()` and fail to read from the provided channel, the channel will eventually fill up. When this happens, the SDK’s reconnections are blocked.
To prevent this, make sure to read flag change events from the provided channel, even if you choose to discard the updates.
### Java
###### Expand Java code sample
##### This feature is not available in all SDK versions
The Java SDK only supports subscribing to flag changes in versions 5.0.0 and higher.
The SDK provides a listener-based mechanism to notify you when flag configurations change. The [`LDClient.getFlagTracker()`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDClient.html#getFlagTracker--) method returns an interface for this mechanism, [`FlagTracker`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/interfaces/FlagTracker.html).
Calling [`getFlagTracker().addFlagChangeListener`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/interfaces/FlagTracker.html#addFlagChangeListener-com.launchdarkly.sdk.server.interfaces.FlagChangeListener-) calls your listener with a [`FlagChangeEvent`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/interfaces/FlagChangeEvent.html) whenever there is a change in any feature flag’s configuration, or in anything else that could indirectly affect the flag value, such as a prerequisite flag or a user segment that the flag uses.
The event data consists only of the flag key. It does not contain a flag value, because in server-side SDKs, there is no such thing as a flag value except when it is evaluated for a specific set of user properties.
The listener method is called from a worker thread.
Here’s how:
Java
```
1
| void logWheneverAnyFlagChanges(LDClient client) {
---|--- 
2
| client.getFlagTracker().addFlagChangeListener(event -> {
3
| System.out.printf("Flag \"%s\" has changed\n", event.getKey());
4
| });
5
| }
```
To listen for changes in flag values for a specific flag key and context, use [`getFlagTracker().addFlagValueChangeListener`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/interfaces/FlagTracker.html#addFlagValueChangeListener-java.lang.String-com.launchdarkly.sdk.LDContext-com.launchdarkly.sdk.server.interfaces.FlagValueChangeListener-), which provides [`FlagValueChangeEvent`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/interfaces/FlagValueChangeEvent.html)s. This is equivalent to re-evaluating the flag for that context whenever `addFlagChangeListener()` reports a change in that flag. Because flag values can have different data types, the value is reported using the general type [`LDValue`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/LDValue.html).
Java SDK v6.0
```
1
| void logWheneverOneFlagChangesForOneContext(LDClient client, String flagKey, LDContext context) {
---|--- 
2
| client.getFlagTracker().addFlagValueChangeListener(flagKey, context, event -> {
3
| System.out.printf("Flag \"%s\" for context \"%s\" has changed from %s to %s\n", event.getKey(),
4
| context.getKey(), event.getOldValue(), event.getNewValue());
5
| });
6
| }
```
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
The SDK provides an event-based mechanism to notify you when flag configurations change.
For example, imagine you have a feature flag named `flag-key-123abc`. If the SDK detects a change in `flag-key-123abc`’s configuration, or in anything else that could indirectly affect the flag value, such as a prerequisite flag or a user segment that `flag-key-123abc` uses, it emits two events.
These events are:
 * `"update"` and
 * `"update:flag-key-123abc"`
You can listen for `"update:flag-key-123abc"` if you only want to know about updates affecting that flag specifically, or `"update"` if you want to be notified about all updates.
For both of these event kinds, an extra parameter is sent to event listeners. This object has the single property `key`, with its value set to the flag key. If you listened for the general `"update"` event, this lets you know which flag changed.
The event parameter does not contain the flag value. In server-side SDKs, there is no such thing as a flag value except when it is evaluated for a specific set of user properties.
To find out what the effect, if any, of the configuration change was, call `variation()` after receiving an update event.
Here is an example:
JavaScript
```
1
| client.on('update', (param) => {
---|--- 
2
| console.log('a flag was changed: ' + param.key);
3
| });
4
| 
5
| client.on('update:flag-key-123abc', () => {
6
| console.log('the flag-key-123abc flag was changed');
7
| });
```
### Python
###### Expand Python code sample
##### This feature is not available in all SDK versions
The Python SDK only supports subscribing to flag changes in versions 9.1.0 and higher.
The SDK provides a listener-based mechanism to notify you when flag configurations change. The [`LDClient#flag_tracker`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#ldclient.client.LDClient.flag_tracker) method returns an interface for this mechanism, [`FlagTracker`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-extending.html#ldclient.interfaces.FlagTracker).
Calling [`flag_tracker.add_listener`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-extending.html#ldclient.interfaces.FlagTracker.add_listener) calls your listener with a [`FlagChange`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-extending.html#ldclient.interfaces.FlagChange) event whenever there is a change to any of the following:
 * the flag’s configuration
 * the prerequisite flag’s configuration
 * a segment used by the flag
The event data consists only of the flag key. It does not contain a flag value, because server-side SDKs only evaluate flags when you provide a specific context.
The listener method is called from the caller’s thread.
Here’s how:
Python
```
1
| def flag_change_listener(flag_change):
---|--- 
2
| print(f"{flag_change.key} has changed")
3
| 
4
| 
5
| listener = ldclient.get().flag_tracker.add_listener(flag_change_listener)
```
To listen for changes in flag values for a specific flag key and context, use [`flag_tracker.add_flag_value_change_listener`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-extending.html#ldclient.interfaces.FlagTracker.add_flag_value_change_listener), which provides [`FlagValueChange`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-extending.html#ldclient.interfaces.FlagValueChange) events. This is equivalent to re-evaluating the flag for that context whenever `add_listener` reports a change in that flag.
Python
```
1
| def flag_value_change_listener(flag_change):
---|--- 
2
| print(f"{flag_change.key} has changed from {flag_change.old_value} to {flag_change.new_value}")
3
| 
4
| 
5
| listener = ldclient.get().flag_tracker.add_flag_value_change_listener('example-flag-key', context, flag_value_change_listener)
```
### Ruby
###### Expand Ruby code sample
##### This feature is not available in all SDK versions
The Ruby SDK only supports subscribing to flag changes in versions 7.2.0 and higher.
The SDK provides a listener-based mechanism to notify you when flag configurations change. The [`LDClient#flag_tracker`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/LDClient.html#flag_tracker-instance_method) method returns an interface for this mechanism, [`FlagTracker`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Interfaces/FlagTracker.html).
Calling [`flag_tracker.add_listener`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Interfaces/FlagTracker.html#add_listener-instance_method) calls your listener with a [`FlagChange`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Interfaces/FlagChange.html) event whenever there is a change to any of the following:
 * the flag’s configuration
 * the prerequisite flag’s configuration
 * a segment used by the flag
The event data consists only of the flag key. It does not contain a flag value, because server-side SDKs only evaluate flags when you provide a specific context.
The listener method is called from a worker thread.
Here’s how:
Ruby
```
1
| class Listener
---|--- 
2
| def update(status)
3
| puts "Flag #{status.key} has changed"
4
| end
5
| end
6
| 
7
| client.flag_tracker.add_listener(Listener.new)
```
To listen for changes in flag values for a specific flag key and context, use [`flag_tracker.add_flag_value_change_listener`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Interfaces/FlagTracker.html#add_flag_value_change_listener-instance_method), which provides [`FlagValueChange`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Interfaces/FlagValueChange.html) events. This is equivalent to re-evaluating the flag for that context whenever `add_listener` reports a change in that flag.
Ruby
```
1
| class Listener
---|--- 
2
| def update(changed)
3
| puts "Flag #{changed.key} has changed from #{changed.old_value} to #{changed.new_value}"
4
| end
5
| end
6
| 
7
| client.flag_tracker.add_flag_value_change_listener("example-flag-key", context, Listener.new)
```
### Roku
###### Expand Roku code sample
You can use Roku’s `observeField` method on your node to respond to changes in flags.
Here’s how:
BrightScript
```
1
| ' replace "onFeatureChange" with the name of your handler functions
---|--- 
2
| launchDarklyNode.observeField("flags", "onFeatureChange")
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs