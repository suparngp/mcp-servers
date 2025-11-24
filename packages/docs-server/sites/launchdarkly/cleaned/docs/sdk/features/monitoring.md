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
 * [Monitor the connection to LaunchDarkly](#monitor-the-connection-to-launchdarkly)
 * [Client-side SDKs](#client-side-sdks)
 * [.NET (client-side)](#net-client-side)
 * [Android](#android)
 * [C++ (client-side)](#c-client-side)
 * [Electron](#electron)
 * [Flutter](#flutter)
 * [iOS](#ios)
 * [React Native](#react-native)
 * [Roku](#roku)
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [C++ (server-side)](#c-server-side)
 * [Go](#go)
 * [Java](#java)
 * [Python](#python)
 * [Ruby](#ruby)
## Overview
This topic explains how various SDKs monitor the connection to LaunchDarkly to determine the most recent flag values.
## Monitor the connection to LaunchDarkly
Some SDKs expose some of their internal statuses through the Connection Status API to allow your application to monitor the SDK’s status. This is provided primarily as a mechanism for the application to determine how recently the internal flag cache has been updated with the most recent values, as well as diagnosing potential reasons for the flag cache to be out of date.
 * [Client-side SDKs](/docs/sdk/features/monitoring#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/monitoring#server-side-sdks)
## Client-side SDKs
This feature is available in the following client-side SDKs:
 * [.NET (client-side)](/docs/sdk/features/monitoring#net-client-side)
 * [Android](/docs/sdk/features/monitoring#android)
 * [C++ (client-side)](/docs/sdk/features/monitoring#c-client-side)
 * [Electron](/docs/sdk/features/monitoring#electron)
 * [Flutter](/docs/sdk/features/monitoring#flutter)
 * [iOS](/docs/sdk/features/monitoring#ios)
 * [React Native](/docs/sdk/features/monitoring#react-native)
 * [Roku](/docs/sdk/features/monitoring#roku)
### .NET (client-side)
###### Expand .NET (client-side) code sample
##### Supported versions
This feature is available in the client-side .NET SDK’s versions 2.0.0 and later.
The client-side .NET SDK defines “data source status” as the status of the SDK’s communication with LaunchDarkly to get feature flag data. If the streaming connection to LaunchDarkly is interrupted, or, in polling mode, if a polling request fails, the SDK might not be able to receive flag updates. The data source status will indicate this, providing an overall state such as “valid” or “interrupted” and information about the last error that occurred, if any.
To check the data source status:
C#
```
1
| var dataSourceStatus = client.DataSourceStatusProvider.Status;
---|--- 
```
Alternatively, you can register an event handler that will receive a new status value whenever the status changes.
Here is an example:
C#
```
1
| client.DataSourceStatusProvider.StatusChanged +=
---|--- 
2
| (sender, status) => {
3
| Console.WriteLine("new status is: {0}", status);
4
| };
```
To learn more, read [`IDataSourceStatusProvider`](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.Client.Interfaces.IDataSourceStatusProvider.html).
### Android
###### Expand Android code sample
##### Supported versions
This feature is available in the Android SDK’s versions 2.8.0 and later.
The Android SDK exposes some of its internal status through APIs to let your application monitor it. This allows the application to determine how recently the internal flag cache has been updated with the most recent values, as well as diagnosing potential reasons for the flag cache to be out of date.
The SDK has seven connectivity states dependent on its configuration, application foreground state, network connectivity, and calls explicitly setting the client offline or online.
This table describes the states:
Connection mode | Description 
---|--- 
`STREAMING` | The SDK is either connected to the flag stream, or is actively attempting to acquire a connection. 
`POLLING` | The SDK is in foreground polling mode because it was configured with streaming disabled. 
`BACKGROUND_POLLING` | The SDK has detected the application is in the background and has transitioned to battery-saving background polling. 
`BACKGROUND_DISABLED` | The SDK was configured with background polling disabled. The SDK has detected the application is in the background and is not attempting to update the flag cache. 
`OFFLINE` | The SDK has detected that the mobile device does not have an active network connection. It has ceased flag update attempts until the network status changes. 
`SET_OFFLINE` | The SDK has been explicitly set offline, either in the initial configuration, by `setOffline()`, or as a result of failed authentication to LaunchDarkly. The SDK will stay offline unless `setOnline()` is called. 
`SHUTDOWN` | The shutdown state indicates the SDK has been permanently shutdown as a result of a call to `close()` . 
The SDK also internally stores a timestamp of the most recent successful and failed connections to LaunchDarkly, as well as information related to the most recent failed connection. The `LDClient` method `getConnectionInformation()` returns a structure allowing retrieval of these fields.
JavaKotlin
```
1
| LDClient client = LDClient.get();
---|--- 
2
| ConnectionInformation connectionInfo = client.getConnectionInformation();
3
| // One of the seven modes described above
4
| ConnectionInformation.ConnectionMode connectionMode =
5
| connectionInfo.getConnectionMode();
6
| // Most recent successful flag cache update in millis from the epoch
7
| // Or null if flags have never been retrieved
8
| Long lastSuccess = connectionInfo.getLastSuccessfulConnection();
9
| // Most recent unsuccessful flag cache update attempt in millis from the epoch
10
| // Or null if flag update has never been attempted
11
| Long lastError = connectionInfo.getLastFailedConnection();
12
| // Most recent failure or null
13
| LDFailure ldFailure = connectionInfo.getLastFailure();
```
`LDFailure` is a `LaunchDarklyException` with an associated `FailureType`. It may include a `.cause()`, which is propagated from an underlying exception associated with the update’s failure. The cause itself should be considered unstable because it is dependent on internal implementation, though the mechanism to retrieve it will be maintained.
The failure types are summarized below:
FailureType | Description 
---|--- 
`INVALID_RESPONSE_BODY` | A response body received either through polling or streaming was unable to be parsed. 
`NETWORK_FAILURE` | A network request for polling, or the `EventSource` stream reported a failure. 
`UNEXPECTED_STREAM_ELEMENT_TYPE` | An event was received through the stream with an unknown event key. This could indicate a newer SDK is available if new event kinds have become available through the flag stream since the SDK’s release. 
`UNEXPECTED_RESPONSE_CODE` | This indicates the `LDFailure` is an instance of `LDInvalidResponseCodeFailure`. Continue reading below for more details. 
`UNKNOWN_ERROR` | Some other issue occurred. 
If matching on the `FailureType`, use a default case to handle any future cases provided. The `UNEXPECTED_RESPONSE_CODE` case indicates that you can cast the `LDFailure` to a `LDInvalidResponseCodeFailure` for more information. This more specific failure includes a response code and whether the failure is considered retryable.
Here is an example:
JavaKotlin
```
1
| LDClient client = LDClient.get();
---|--- 
2
| ConnectionInformation connectionInfo = client.getConnectionInformation();
3
| LDFailure ldFailure = connectionInfo.getLastFailure();
4
| if (ldFailure != null) {
5
| Timber.d("Received failure with message %s", ldFailure.getMessage());
6
| // Retrieve the failure type
7
| LDFailure.FailureType failureType = ldFailure.getFailureType();
8
| switch (failureType) {
9
| case INVALID_RESPONSE_BODY:
10
| Timber.d("Received invalid response body");
11
| break;
12
| case NETWORK_FAILURE:
13
| Timber.d("Network failure, may have bad connection");
14
| break;
15
| case UNEXPECTED_STREAM_ELEMENT_TYPE:
16
| Timber.d("Unexpected stream element, may require update");
17
| break;
18
| case UNEXPECTED_RESPONSE_CODE:
19
| LDInvalidResponseCodeFailure responseCodeFailure =
20
| (LDInvalidResponseCodeFailure) ldFailure;
21
| int responseCode = responseCodeFailure.getResponseCode();
22
| if (responseCodeFailure.isRetryable()) {
23
| Timber.d("Received invalid response code %d", responseCode);
24
| } else {
25
| Timber.d("Received invalid response code %d, giving up", responseCode);
26
| }
27
| break;
28
| case UNKNOWN_ERROR:
29
| default:
30
| Timber.d("Unknown error");
31
| break;
32
| }
33
| 
34
| Throwable cause = ldFailure.getCause();
35
| if (cause != null) {
36
| // Do something with underlying cause
37
| }
38
| }
```
A callback-based interface is also provided to allow notifying the application when the `ConnectionMode` changes, as well as whenever the `LDFailure` in `ConnectionStatus` changes. The application must provide a class instance implementing `LDStatusListener` to the SDK client instance method `registerStatusListener` to register the listeners with the SDK.
##### Listener weak reference
The SDK maintains only a weak reference to the registered `LDStatusListener`, so the application maintains a reference for as long as the application desires the listener to be available. This helps prevent creating a long-term reference to an Activity by creating a static internal class instance for use as a listener. By using a weak reference to the listener, the Activity can still be garbage collected normally, even if it maintains a registered `LDStatusListener`. We recommend unregistering the listener when it’s finished.
Here is a brief example:
JavaKotlin
```
1
| class MainActivity extends Activity {
---|--- 
2
| private LDClient client;
3
| private LDStatusListener ldStatusListener;
4
| 
5
| @Override
6
| protected void onCreate(Bundle savedInstanceState) {
7
| super.onCreate(savedInstanceState);
8
| setContentView(R.layout.activity_main);
9
| 
10
| ldStatusListener = new LDStatusListener() {
11
| @Override
12
| public void onConnectionModeChanged(ConnectionInformation connectionInfo) {
13
| // handle new connection info
14
| }
15
| 
16
| @Override
17
| public void onInternalFailure(LDFailure ldFailure) {
18
| // handle failure
19
| }
20
| };
21
| 
22
| client = LDClient.get();
23
| client.registerStatusListener(ldStatusListener);
24
| }
25
| 
26
| @Override
27
| protected void onDestroy() {
28
| super.onDestroy();
29
| client.unregisterStatusListener(ldStatusListener);
30
| }
31
| }
```
### C++ (client-side)
###### Expand C++ (client-side) code sample
The C++ (client-side) SDK exposes some of its internal status to let your application monitor it.
The SDK has several data source states dependent on its configuration, network connectivity, and calls explicitly setting the client offline or online.
This table describes the states:
Data source state | Description 
---|--- 
`kInitializing` | The initial state of the data source when the SDK is being initialized. 
`kValid` | The data source is currently operational and has not had any problems since the last time it received data. 
`kInterrupted` | The data source encountered an error that it will attempt to recover from. 
`kSetOffline` | The application has told the SDK to stay offline. 
`kShutdown` | The data source has been permanently shut down. This could be because it encountered an unrecoverable error, or because the SDK client was explicitly shut down. 
The SDK stores a timestamp of when the data source state most recently changed. It also stores information about the last error that the data source encountered, if any.
This table describes the possible errors:
`LastError` value | Description 
---|--- 
`kUnknown` | An unexpected error, such as an uncaught exception. 
`kNetworkError` | An I/O error, such as a dropped connection. 
`kErrorResponse` | The LaunchDarkly service returned an HTTP response with an error status. 
`kInvalidData` | The SDK received malformed data from the LaunchDarkly service. 
`kStoreError` | The data source itself is working, but when it tried to put an update into the data store, the data store failed. The SDK may not have the latest data. 
Here’s how to monitor the data source state:
C++ SDK v3.0 (native)
```
1
| client.DataSourceStatus().OnDataSourceStatusChange([](client_side::data_sources::DataSourceStatus status) {
---|--- 
2
| if (status.State() ==
3
| client_side::data_sources::DataSourceStatus::
4
| DataSourceState::kValid) {
5
| /* Flag data has been received from LaunchDarkly.*/
6
| }
7
| });
```
If you are working in C, there are a few more steps:
 1. Define a callback to receive the data source status change:
C++ SDK v3.0 (C binding), define callback
```
1
| void OnDataSourceStatusChanged(LDDataSourceStatus status, void* user_data) {
---|--- 
2
| printf("status: %d\n", LDDataSourceStatus_GetState(status));
3
| }
```
 2. Assign the callback by creating a listener connection:
C++ SDK v3.0 (C binding), create listener connection
```
1
| struct LDDataSourceStatusListener listener;
---|--- 
2
| LDDataSourceStatusListener_Init(listener);
3
| 
4
| listener.StatusChanged = OnDataSourceStatusChanged;
5
| 
6
| /* You may optionally assign the UserData pointer, which will be passed into StatusChanged. */
7
| /* listener.UserData = &some_struct; */
8
| 
9
| LDListenerConnection connection =
10
| LDClientSDK_DataSourceStatus_OnStatusChange(sdk, listener);
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
Finally, if you are working in C but are still using the older v2.x SDK, the data source status interface is not available. To wait indefinitely, use a callback:
C SDK v2.x (native)
```
1
| void initCallback(LDStatus status)
---|--- 
2
| {
3
| if (status == LDStatusInitialized) {
4
| printf("Completed LaunchDarkly client initialization");
5
| }
6
| }
7
| 
8
| LDSetClientStatusCallback(initCallback);
```
To learn more, read [`DataSourceStatus`](https://launchdarkly.github.io/cpp-sdks/libs/client-sdk/docs/html/classlaunchdarkly_1_1client__side_1_1Client.html#adedade4cae0355b19f954907dbcf2362).
### Electron
###### Expand Electron code sample
By default, the client requests feature flag values only once per user. This happens once at startup time, and then each time you call `identify()`. You can also use a persistent connection to receive flag updates whenever they occur.
Enable this behavior by setting `streaming` to `true` in the client options or calling `client.setStreaming(true)`. LaunchDarkly pushes new values to the SDK, which updates the current feature flag state in the background, ensuring that `variation()` always returns the latest values.
If you want to be notified when a flag has changed, you can use an event listener for a specific flag.
Here’s how:
JavaScript
```
1
| client.on('change:flag-key-123abc', (newValue, oldValue) => {
---|--- 
2
| console.log('The flag was ' + oldValue + ' and now it is ' + newValue);
3
| });
```
Alternatively, you can listen for all feature flag changes.
Here’s how:
JavaScript
```
1
| client.on('change', (allFlagChanges) => {
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
Subscribing to `change` events automatically turns on streaming mode as well, unless you have explicitly set `streaming` to `false`.
### Flutter
###### Expand Flutter code sample
The Flutter SDK exposes some of its internal status through APIs to let your application monitor it. This allows the application to determine how recently the internal flag cache has been updated with the most recent values, as well as diagnose potential reasons for the flag cache to be out of date.
The SDK stores a timestamp of the most recent successful and failed connections to LaunchDarkly, as well as information related to the most recent failed connection. The `dataSourceStatus` returns a structure that lets you retrieve these fields.
Flutter SDK v4Flutter SDK v3.x
```
1
| // get the current status
---|--- 
2
| final status = client.dataSourceStatus;
3
| 
4
| // listen for changes
5
| final sub = client.dataSourceStatusChanges.listen((status){
6
| // act on status
7
| });
```
To learn more about the connection status fields, read [`DataSourceStatus`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/DataSourceStatus-class.html).
### iOS
###### Expand iOS code sample
##### Supported versions
This feature is available in the iOS SDK’s versions 4.2.0 and later.
The iOS SDK exposes some of its internal status through the Connection Status API to let your application monitor it. This allows the application to determine how recently the internal flag cache has been updated with the most recent values, as well as diagnosing potential reasons for the flag cache to be out of date.
The SDK has four connectivity states dependent on its configuration, application foreground state, network connectivity, and calls explicitly setting the client offline or online.
This table describes the states:
Connection Mode | Description 
---|--- 
`streaming` | The SDK has an active streaming connection. 
`polling` | The SDK has an active polling connection. 
`offline` | The SDK is set offline or has no network connection. 
`establishingStreamingConnection` | The SDK is attempting to connect to LaunchDarkly by streaming. 
The SDK also stores a timestamp of the most recent successful and failed connections to LaunchDarkly, as well as information related to the most recent failed connection. `lastKnownFlagValidity` is nil if either no connection has ever been made successfully or if the SDK has an active streaming connection. It has a value if it is in polling mode and at least one poll has completed successfully, or if it is in streaming mode whenever the streaming connection closes. The `LDClient.shared` method `getConnectionInformation()` returns a structure that lets you retrieve these fields.
The `ConnectionInformation` class can return four different values for `lastFailureReason`.
This table describes the values:
lastFailureReason value | Description 
---|--- 
`none` | This returns when no error has been recorded. 
`unknownError` | This returns when there is an internal error in the stream request. 
`unauthorized` | This returns when an incorrect mobile key is provided. 
`httpError` | This returns when an error with an HTTP error code is present. 
You can listen to changes in `ConnectionInformation.ConnectionMode` in a similar manner to flag observers.
Here is an example of the API:
Swift
```
1
| // Get current connection information
---|--- 
2
| let connectionInformation = LDClient.get()!.getConnectionInformation()
3
| // Setting a connection mode update observer
4
| LDClient.get()!.observeCurrentConnectionMode(owner: self) { [weak self] connectionMode in
5
| // do something after ConnectionMode was updated.
6
| }
```
### React Native
###### Expand React Native code sample
Starting with version 10 of the React Native SDK, the SDK uses an emitter pattern for errors. You can subscribe to `error` and `change` events.
Here’s how:
React Native SDK, v10
```
1
| client.on('error', (context: LDContext, error: Error) => {
---|--- 
2
| // handle error
3
| });
```
To learn more, read [`on`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/classes/LDClientImpl.html#on) and [`off`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/classes/LDClientImpl.html#off).
### Roku
###### Expand Roku code sample
You can use Roku’s `observeField` method on your node to respond to changes in status.
Here’s how:
BrightScript
```
1
| ' replace "onStatusChange" with the name of your handler functions
---|--- 
2
| launchDarklyNode.observeField("status", "onStatusChange")
```
## Server-side SDKs
The following server-side SDKs provide two kinds of SDK status monitoring:
 * Data source status
 * Data store status
Data source status is the status of the SDK’s communication with LaunchDarkly to get feature flag data. If the streaming connection to LaunchDarkly is interrupted, or, in polling mode, if a polling request fails, the SDK might not be able to receive flag updates. The data source status will indicate this, providing an overall state such as “valid” or “interrupted” and information about the last error that occurred, if any.
Data store status is the status of a database, such as Redis or DynamoDB, if the SDK has been configured to use one. If the SDK tries to read from or write to a database and encounters an error, the data store status will indicate this.
This feature is available in the following server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/monitoring#net-server-side)
 * [C++ (server-side)](/docs/sdk/features/monitoring#c-server-side)
 * [Go](/docs/sdk/features/monitoring#go)
 * [Java](/docs/sdk/features/monitoring#java)
 * [Python](/docs/sdk/features/monitoring#python)
 * [Ruby](/docs/sdk/features/monitoring#ruby)
### .NET (server-side)
###### Expand .NET (server-side) code sample
##### Supported versions
This feature is available in the .NET SDK’s versions 6.0.0 and later.
To check the data source status:
C#
```
1
| var dataSourceStatus = client.DataSourceStatusProvider.Status;
---|--- 
```
Alternatively, you can register an event handler that will receive a new status value whenever the status changes.
Here is an example:
C#
```
1
| client.DataSourceStatusProvider.StatusChanged +=
---|--- 
2
| (sender, status) => {
3
| Console.WriteLine("new status is: {0}", status);
4
| };
```
### C++ (server-side)
###### Expand C++ (server-side) code sample
The C++ (server-side) SDK exposes some of its internal status to let your application monitor it.
The SDK has several data source states dependent on its configuration, network connectivity, and calls explicitly setting the client offline or online.
This table describes the states:
Data source state | Description 
---|--- 
`kInitializing` | The initial state of the data source when the SDK is being initialized. 
`kValid` | The data source is currently operational and has not had any problems since the last time it received data. 
`kInterrupted` | The data source encountered an error that it will attempt to recover from. 
`kSetOffline` | The application has told the SDK to stay offline. 
`kShutdown` | The data source has been permanently shut down. This could be because it encountered an unrecoverable error, or because the SDK client was explicitly shut down. 
The SDK stores a timestamp of when the data source state most recently changed. It also stores information about the last error that the data source encountered, if any.
This table describes the possible errors:
`LastError` value | Description 
---|--- 
`kUnknown` | An unexpected error, such as an uncaught exception. 
`kNetworkError` | An I/O error, such as a dropped connection. 
`kErrorResponse` | The LaunchDarkly service returned an HTTP response with an error status. 
`kInvalidData` | The SDK received malformed data from the LaunchDarkly service. 
`kStoreError` | The data source itself is working, but when it tried to put an update into the data store, the data store failed. The SDK may not have the latest data. 
Here’s how to monitor the data source state:
C++ SDK v3.0 (native)
```
1
| client.DataSourceStatus().OnDataSourceStatusChange([](server_side::data_sources::DataSourceStatus status) {
---|--- 
2
| if (status.State() ==
3
| server_side::data_sources::DataSourceStatus::
4
| DataSourceState::kValid) {
5
| /* Flag data has been received from LaunchDarkly.*/
6
| }
7
| });
```
If you are working in C, there are a few more steps:
 1. Define a callback to receive the data source status change:
C++ SDK v3.0 (C binding), define callback
```
1
| void OnDataSourceStatusChanged(LDServerDataSourceStatus status, void* user_data) {
---|--- 
2
| printf("status: %d\n", LDServerDataSourceStatus_GetState(status));
3
| }
```
 2. Assign the callback by creating a listener connection:
C++ SDK v3.0 (C binding), create listener connection
```
1
| struct LDServerDataSourceStatusListener listener;
---|--- 
2
| LDServerDataSourceStatusListener_Init(&listener);
3
| 
4
| listener.StatusChanged = OnDataSourceStatusChanged;
5
| 
6
| /* You may optionally assign the UserData pointer, which will be passed into
7
| * StatusChanged. */
8
| 
9
| /* listener.UserData = &some_struct; */
10
| 
11
| LDListenerConnection connection = LDServerSDK_DataSourceStatus_OnStatusChange(client, listener);
12
| 
13
| /* You can disconnect the listener later */
14
| LDListenerConnection_Disconnect(connection);
```
 3. Ensure the connection is freed when you are done with it:
C++ SDK v3.0 (C binding), free connection
```
1
| LDListenerConnection_Free(connection);
---|--- 
```
To learn more, read `DataSourceStatus()` in [`Client`](https://launchdarkly.github.io/cpp-sdks/libs/server-sdk/docs/html/classlaunchdarkly_1_1server__side_1_1Client.html).
### Go
###### Expand Go code sample
To check the data source status:
Go
```
1
| dataSourceStatus := client.GetDataSourceStatusProvider().GetStatus()
---|--- 
```
Alternatively, you can monitor a channel that provides a new status value whenever the status changes:
Go
```
1
| dataStoreStatusChannel := client.GetDataStoreStatusProvider().AddStatusListener()
---|--- 
2
| go func() {
3
| for status := range dataStoreStatusChannel {
4
| fmt.Println("new status is: ", status)
5
| }
6
| }()
```
To learn more, read [`GetDataSourceStatusProvider`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDClient.GetDataSourceStatusProvider) and [`GetDataStoreStatusProvider`](https://pkg.go.dev/github.com/launchdarkly/go-server-sdk/v7#LDClient.GetDataStoreStatusProvider).
### Java
###### Expand Java code sample
To check the data source status:
Java
```
1
| DataSourceStatusProvider.Status dataSourceStatus =
---|--- 
2
| client.getDataSourceStatusProvider().getStatus();
```
Alternatively, you can register an event listener that receives a new status value whenever the status changes:
Java
```
1
| client.getDataSourceStatusProvider().addStatusListener(
---|--- 
2
| status -> {
3
| System.out.println("new status is: " + status);
4
| }
5
| );
```
To learn more, read [`DataSourceStatusProvider`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/interfaces/DataSourceStatusProvider.html) and [`DataStoreStatusProvider`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/interfaces/DataStoreStatusProvider.html).
### Python
###### Expand Python code sample
To check the data source status:
Python
```
1
| status = ldclient.get().data_source_status_provider.status
---|--- 
```
Alternatively, you can register an event listener that receives a new status value whenever the status changes:
Python
```
1
| listener = ldclient.get().data_source_status_provider.add_listener(source_status_listener)
---|--- 
```
To learn more, read [`DataSourceStatusProvider`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-extending.html#ldclient.interfaces.DataSourceStatusProvider) and [`DataStoreStatusProvider`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-extending.html#ldclient.interfaces.DataStoreStatusProvider).
If you are working with forking processes, any configuration that you provide to the SDK must survive the forking process independently. We recommend that you add any listeners after a `postfork()` call, unless you are certain they can survive the forking process. To learn more, read [Initialize the client](/docs/sdk/server-side/python#initialize-the-client) and [`ldclient.postfork`](https://launchdarkly-python-sdk.readthedocs.io/en/latest/api-main.html#ldclient.client.LDClient.postfork).
### Ruby
###### Expand Ruby code sample
To check the data source status:
Ruby
```
1
| status = client.data_source_status_provider.status
---|--- 
```
Alternatively, you can register an event listener that receives a new status value whenever the status changes:
Ruby
```
1
| # listener#update will be called when the status is changed
---|--- 
2
| client.data_source_status_provider.add_listener(listener);
```
To learn more, read [`DataSource::StatusProvider`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Interfaces/DataSource/StatusProvider.html) and [`DataStore::StatusProvider`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/Interfaces/DataStore/StatusProvider.html).
If you are working with forking processes, any configuration that you provide to the SDK must survive the forking process independently. We recommend that you add any listeners after a `postfork()` call, unless you are certain they can survive the forking process. To learn more, read [Initialize the client](/docs/sdk/server-side/ruby#initialize-the-client) and [`postfork`](https://launchdarkly.github.io/ruby-server-sdk/LaunchDarkly/LDClient.html#postfork-instance_method).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs