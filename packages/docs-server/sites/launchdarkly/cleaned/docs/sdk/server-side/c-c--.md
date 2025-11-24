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
 * [Prerequisites and dependencies](#prerequisites-and-dependencies)
 * [Get started](#get-started)
 * [Incorporate the SDK](#incorporate-the-sdk)
 * [Incorporate the SDK using cmake](#incorporate-the-sdk-using-cmake)
 * [Incorporate the SDK using prebuilt artifacts](#incorporate-the-sdk-using-prebuilt-artifacts)
 * [Include the LaunchDarkly headers](#include-the-launchdarkly-headers)
 * [About the SDK namespaces](#about-the-sdk-namespaces)
 * [Initialize the client](#initialize-the-client)
 * [Evaluate a context](#evaluate-a-context)
 * [Shut down the client](#shut-down-the-client)
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the server-side C++ SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/cpp-sdks/libs/server-sdk/docs/html) 
GitHub repository | [cpp-sdks](https://github.com/launchdarkly/cpp-sdks) 
Sample application | [C++ (server-side) (native)](https://github.com/launchdarkly/cpp-sdks/tree/main/examples/hello-cpp-server) 
[C++ (server-side) (C binding)](https://github.com/launchdarkly/cpp-sdks/tree/main/examples/hello-c-server) 
Published module | None 
## Prerequisites and dependencies
To use the C++ SDK, you must have the following prerequisites installed on your build machine:
 * Windows or a POSIX environment (Linux, OSX, BSD)
 * `cmake`, version 3.19 or above
 * `boost`, version 1.81 or above
 * `openssl`, version 1.1 or above
 * `libpthread`, if you are using a POSIX environment
To build the C++ SDK, you must have the following dependencies. These are automatically fetched by `cmake` during the build process:
 * [`tl/expected`](https://github.com/TartanLlama/expected)
 * [`djarek/certify`](https://github.com/djarek/certify.git)
If you are planning to run the C++ SDK test suite, you will also need the following:
 * [`nlohmann/json`](https://github.com/nlohmann/json)
 * [`googletest`](https://github.com/google/googletest)
You do not need to run the test suite in order to use the SDK.
##### For use in server-side applications only
This SDK is intended for use in multi-user C++ server applications. If you have a C++ application and want to set up LaunchDarkly in a mobile, desktop, or embedded application, read the [client-side C++ SDK reference](/docs/sdk/client-side/c-c--).
To learn more about LaunchDarkly’s different SDK types, read [Choosing an SDK type](/docs/sdk/concepts/client-side-server-side).
## Get started
##### Version 3 of the C++ (server-side) SDK is a native C++ library 
Previous versions of this SDK were written in C, with a C++ wrapper available. In version 3.0 and higher, this SDK is written in C++, with a C wrapper available. The code samples below show all options, where applicable.
After you complete the [Getting started process](/docs/home/getting-started), follow these instructions to start using the LaunchDarkly SDK in your C application.
The following sections explain how to install and configure the SDK, and then to verify its connection to LaunchDarkly by fetching flag configuration information.
### Incorporate the SDK
You can incorporate the SDK by building from source using `cmake`, or by using pre-built artifacts. Then, include the LaunchDarkly headers.
#### Incorporate the SDK using cmake
To incorporate the SDK using `cmake`:
 1. Clone the [GitHub repository](https://github.com/launchdarkly/cpp-sdks) as a subdirectory of your project.
 2. Update your project’s `CMakeLists.txt` to include the SDK repository:
Using add_subdirectory
```
$
| add_subdirectory(cpp-sdks)
---|--- 
```
 3. Link your project’s target against the `launchdarkly::server` target:
Linking your targetLinking your target, if you are using Redis
```
$
| target_link_libraries(your-target PRIVATE launchdarkly::server)
---|--- 
```
#### Incorporate the SDK using prebuilt artifacts
The C++ (server-side) SDK releases include 64-bit static and dynamic libraries for Linux, Mac, and Windows.
To incorporate the SDK using prebuilt artifacts:
 1. Download the correct release for your platform from the GitHub [Releases](https://github.com/launchdarkly/cpp-sdks/releases) page.
 2. Ensure the SDK’s headers are installed on the build system. One way to do this is to clone the [GitHub repository](https://github.com/launchdarkly/cpp-sdks) and install the headers using `cmake`:
Install headers
```
$
| cmake --build .
---|--- 
>
| cmake --install .
```
You can now reference the installed headers and link against the prebuilt libraries.
#### Include the LaunchDarkly headers
To include the LaunchDarkly SDK headers:
C++ SDK v3 (native)C++ SDK v3 (C binding)
```
1
| #include <launchdarkly/server_side/client.hpp>
---|--- 
```
The C wrapper is included in the release binaries.
###### Expand for how to install the SDK if you are using v2.x
Here’s how to install the SDK:
 1. Clone [the GitHub repository](https://github.com/launchdarkly/c-server-sdk) or download a release archive from the [GitHub Releases](https://github.com/launchdarkly/c-server-sdk/releases) page.
 2. Install the SDK locally.
 * If you use `cmake`, the build system will expect that `boost` and `openssl` exist on the system. The `cmake` configuration exports the target `ldclientapi`.
 * If you don’t use `cmake` and you cannot use LaunchDarkly’s artifacts, use `cmake install` to install the SDK in directory you choose. This copies the required headers, and binaries equivalent to LaunchDarkly’s release bundles.
After cloning the repository, include the LaunchDarkly SDK headers:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x
```
1
| #include <launchdarkly/server_side/client.hpp>
---|--- 
```
### About the SDK namespaces
SDK components common to the C++ (server-side) SDK v3.0 and the C++ (client-side) SDK v3.0 exist within the top-level `launchdarkly` namespace. Server-side components exist within `launchdarkly::server_side`.
Individual server-side config builders, for example the `LoggingBuilder`, are within the `launchdarkly::server_side::config::builders` namespace. To reduce verbosity of configuration code, you may bring this namespace into scope.
To keep the examples in our documentation concise, we assume symbols in the top-level `launchdarkly` namespace are visible. You can bring `launchdarkly`, `launchdarkly::server_side`, `launchdarkly::server_side::config::builders`, or all of these into scope, or you can refer to SDK components by their fully-qualified names.
For example:
Using launchdarkly namespaceUsing launchdarkly::server_side namespaceNo namespace
```
1
| using namespace launchdarkly; # omitted in examples; assumed to be present
---|--- 
2
| auto config_builder = server_side::ConfigBuilder("sdk-key-123abc");
3
| auto config = config_builder.Build();
```
### Initialize the client
##### The C++ (server-side) SDK uses an SDK key
The C++ (server-side) SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
After you install and import the SDK, create a single, shared instance of `Client`. To create a client instance, you need your environment’s SDK key to authorize your application to connect to a particular environment within LaunchDarkly.
Here’s how to configure the SDK key and create the client:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x
```
1
| auto config_builder = server_side::ConfigBuilder("sdk-key-123abc");
---|--- 
2
| auto config = config_builder.Build();
3
| if (!config) {
4
| /* an error occurred, config is not valid */
5
| }
6
| 
7
| server_side::Client client(*config);
```
To learn more about the specific configuration options available for this SDK, read [`ConfigBuilder`](https://launchdarkly.github.io/cpp-sdks/libs/server-sdk/docs/html/classlaunchdarkly_1_1config_1_1shared_1_1builders_1_1ConfigBuilder.html).
Next, construct the client and call `StartAsync` to initiate a request to the LaunchDarkly service and fetch the feature flag settings.
Because the client initializes asynchronously, you may choose to block until the client is ready.
To block on initialization:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x
```
1
| client.StartAsync().wait_for(std::chrono::seconds(10));
---|--- 
```
To initialize asynchronously:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)
```
1
| client.StartAsync();
---|--- 
```
Whether you block on initialization or initialize asynchronously, you can also examine the result to determine if initialization succeeded. Here’s how:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)
```
1
| server_side::Client client(*config);
---|--- 
2
| 
3
| auto start_result = client.StartAsync();
4
| if (auto const status = start_result.wait_for(maxwait); status == std::future_status::ready) {
5
| /* The client's attempt to initialize succeeded or failed in the specified amount of time. */
6
| if (start_result.get()) {
7
| /* Initialization succeeded. */
8
| } else {
9
| /* Initialization failed. */
10
| }
11
| } else {
12
| /* The specified timeout was reached, but the client is still initializing. */
13
| }
```
If you block on initialization, the initialization call blocks up to the time `maxwait`. If you request a feature flag before initialization completes, you will receive the fallback value you defined in your `variation` call.
### Evaluate a context
Now you can check which variation a specific context should receive for a given feature flag. Here’s how:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x
```
1
| auto context = ContextBuilder().Kind("user", "user-key-123abc").Name("Sandy").Build();
---|--- 
2
| 
3
| bool show_feature = client.BoolVariation(context, "flag-key-123abc", false);
4
| 
5
| if (show_feature) {
6
| // application code to show the feature
7
| } else {
8
| // the code to run if the feature is off
9
| }
```
## Shut down the client
Lastly, shut down the client when your application terminates.
In the C++ SDK v3.0, the SDK will be automatically closed. If you are using the C binding, or if you are working with earlier versions of the SDK, you must specifically close the client. To learn more, read [Shutting down](/docs/sdk/features/shutdown#c-server-side).
## Supported features
This SDK supports the following features:
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#c-server-side)
 * [Configuration](/docs/sdk/features/config#c-server-side), including
 * [Application metadata configuration](/docs/sdk/features/app-config#c-server-side)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#c-server-side)
 * [Context configuration](/docs/sdk/features/context-config#c-server-side)
 * [Evaluating flags](/docs/sdk/features/evaluating#c-server-side)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#c-server-side)
 * [Flushing events](/docs/sdk/features/flush#c-server-side)
 * [Getting all flags](/docs/sdk/features/all-flags#c-server-side)
 * [Identifying and changing contexts](/docs/sdk/features/identify#c-server-side)
 * [Logging configuration](/docs/sdk/features/logging#c-server-side)
 * [Monitoring SDK status](/docs/sdk/features/monitoring#c-server-side)
 * [Offline mode](/docs/sdk/features/offline-mode#c-server-side)
 * [Private attributes](/docs/sdk/features/private-attributes#c-server-side)
 * [Reading flags from a file](/docs/sdk/features/flags-from-files#c-server-side)
 * [Relay Proxy configuration](/docs/sdk/features/relay-proxy-configuration)
 * [Using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode#c-server-side)
 * [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#c-server-side)
 * [Sending custom events](/docs/sdk/features/events#c-server-side)
 * [Shutting down](/docs/sdk/features/shutdown#c-server-side)
 * [Storing data](/docs/sdk/features/storing-data#c-server-side)
 * [Test data sources](/docs/sdk/features/test-data-sources#c-server-side)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs