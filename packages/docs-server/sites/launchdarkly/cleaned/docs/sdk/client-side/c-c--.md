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
 * [Understand the SDK namespaces](#understand-the-sdk-namespaces)
 * [Initialize the client](#initialize-the-client)
 * [Evaluate a flag](#evaluate-a-flag)
 * [Shut down the client](#shut-down-the-client)
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the client-side C++ SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and sample applications:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/cpp-sdks/libs/client-sdk/docs/html/) 
GitHub repository | [cpp-sdks](https://github.com/launchdarkly/cpp-sdks) 
Sample applications | [C++ (client-side) (native)](https://github.com/launchdarkly/cpp-sdks/tree/main/examples/hello-cpp-client) 
[C++ (client-side) (C binding)](https://github.com/launchdarkly/cpp-sdks/tree/main/examples/hello-c-client) 
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
##### For use in mobile, desktop, and embedded client applications only
This SDK is intended for use in single-user mobile, desktop, and embedded applications. If you have a C/C++ application and want to set up LaunchDarkly on the server-side, read the [server-side C/C++ SDK reference](/docs/sdk/server-side/c-c--).
To learn more about LaunchDarkly’s different SDK types, read [Choosing an SDK type](/docs/sdk/concepts/client-side-server-side).
## Get started
##### Version 3 of the C++ (client-side) SDK is a native C++ library 
Previous versions of this SDK were written in C, with a C++ wrapper available. In version 3.0 and higher, this SDK is written in C++, with a C wrapper available. The code samples below show all options, where applicable.
The following sections explain how to install and configure the SDK, and then to verify its connection to LaunchDarkly by fetching flag configuration information for a specific context.
After you complete the [Get started](/docs/home/getting-started) process, follow these instructions to start using the LaunchDarkly C++ SDK:
 * [Incorporate the SDK](/docs/sdk/client-side/c-c--#incorporate-the-sdk)
 * [Include the LaunchDarkly headers](/docs/sdk/client-side/c-c--#include-the-launchdarkly-headers)
 * [Understand the SDK namespaces](/docs/sdk/client-side/c-c--#understand-the-sdk-namespaces)
 * [Initialize the client](/docs/sdk/client-side/c-c--#initialize-the-client)
 * [Evaluate a flag](/docs/sdk/client-side/c-c--#evaluate-a-flag)
### Incorporate the SDK
You can incorporate the SDK by building from source using `cmake`, or by using pre-built artifacts. Then, include the LaunchDarkly headers.
###### Expand Incorporate the SDK using cmake
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
 3. Link your project’s target against the `launchdarkly::client` target:
Linking your target
```
$
| target_link_libraries(your-target PRIVATE launchdarkly::client)
---|--- 
```
###### Expand Incorporate the SDK using prebuilt artifacts
#### Incorporate the SDK using prebuilt artifacts
The C++ (client-side) SDK releases include 64-bit static and dynamic libraries for Linux, Mac, and Windows.
To incorporate the SDK using prebuilt artifacts:
 1. Download the correct release for your platform from the GitHub [Releases](https://github.com/launchdarkly/cpp-sdks/releases?q=%22launchdarkly-cpp-client%22) page.
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
###### Expand for how to install the SDK if you are using v2.x
Here’s how to install the SDK:
 1. Clone [the GitHub repository](https://github.com/launchdarkly/c-client-sdk) or download a release archive from the [GitHub Releases](https://github.com/launchdarkly/c-client-sdk/releases) page.
 2. Install the SDK locally.
 * If you use `cmake`, the build system will expect that `boost` and `openssl` exist on the system. The `cmake` configuration exports the target `ldclientapi`.
 * If you don’t use `cmake` and you cannot use LaunchDarkly’s artifacts, use `cmake install` to install the SDK in directory you choose. This copies the required headers, and binaries equivalent to LaunchDarkly’s release bundles.
 1. (Optional) Build the C++ wrapper, which is not included in the release binaries. Copy the [header](https://github.com/launchdarkly/c-client-sdk/blob/master/cpp/include/launchdarkly/api.hpp) and [source](https://github.com/launchdarkly/c-client-sdk/blob/master/cpp/api.cpp) files and add them to your own build system.
### Include the LaunchDarkly headers
To include the LaunchDarkly SDK headers:
C++ SDK v3 (native)C++ SDK v3 (C binding)C SDK v2.x (native)C SDK v2.x (C++ binding)
```
1
| #include <launchdarkly/client_side/client.hpp>
---|--- 
```
The C wrapper is included in the release binaries.
### Understand the SDK namespaces
SDK components common to the C++ (client-side) SDK v3.0 and the C++ (server-side) SDK v3.0 exist within the top-level `launchdarkly` namespace. Client-side components exist within `launchdarkly::client_side`.
To keep the examples in our documentation concise, we assume symbols in the top-level `launchdarkly` namespace are visible. You can bring `launchdarkly`, `launchdarkly::client_side`, or both into scope, or you can refer to SDK components by their fully-qualified names.
For example:
Using launchdarkly namespaceUsing launchdarkly::client_side namespaceNo namespace
```
1
| using namespace launchdarkly; # omitted in examples; assumed to be present
---|--- 
2
| auto config_builder = client_side::ConfigBuilder("mobile-key-123abc");
3
| auto config = config_builder.Build();
```
### Initialize the client
After you install the SDK, initialize a single shared `Client`. To create a client instance, you need your environment’s mobile key and the context for which you want to evaluate flags. The mobile key authorizes your application to connect to a particular environment within LaunchDarkly.
##### C++ (client-side) SDK credentials
The C++ (client-side) SDK uses a mobile key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
Mobile keys are not secret and you can expose them in your client-side code without risk. However, never embed a server-side SDK key into a client-side application.
Here’s how to configure the mobile key and define the context:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x (native)C SDK v2.x (C++ binding)
```
1
| auto config_builder = client_side::ConfigBuilder("mobile-key-123abc");
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
| auto context = ContextBuilder().Kind("user", "user-key-123abc").Build();
```
To learn more about the specific configuration options available in this SDK, read [`ConfigBuilder`](https://launchdarkly.github.io/cpp-sdks/libs/client-sdk/docs/html/classlaunchdarkly_1_1config_1_1shared_1_1builders_1_1ConfigBuilder.html).
Next, construct the client and call `StartAsync` to initiate a remote call to the LaunchDarkly service and fetch the feature flag settings for a given context. The `StartAsync` method returns a future. We strongly recommend using `StartAsync` with a method that takes a timeout, such as `wait_for`.
To block on initialization for a specific amount of time:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x (native)C SDK v2.x (C++ binding)
```
1
| client_side::Client client(config, context);
---|--- 
2
| client.StartAsync().wait_for(std::chrono::seconds(10));
```
You can also initialize the client asynchronously:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)
```
1
| client_side::Client client(config, context);
---|--- 
2
| client.StartAsync();
```
If you request a feature flag before initialization completes, you will receive the fallback value you defined in your `variation` call. Whether you block on initialization or initialize asynchronously, you can examine the result to determine if initialization succeeded.
Here’s how:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)
```
1
| client_side::Client client(config, context);
---|--- 
2
| 
3
| auto start_result = client.StartAsync();
4
| auto status = start_result.wait_for(maxwait);
5
| if (status == std::future_status::ready) {
6
| /* The client's attempt to initialize succeeded or failed in the specified amount of time. */
7
| if (start_result.get()) {
8
| /* Initialization succeeded. */
9
| } else {
10
| /* Initialization failed. */
11
| }
12
| } else {
13
| /* The specified timeout was reached, but the client is still initializing. */
14
| }
```
You may also choose to block until the client is ready by using `StartAsync` with `wait` rather than with `wait_for`. However, we strongly discourage this. If you block indefinitely, your application will hang if the client cannot connect to LaunchDarkly. To learn more, read [`StartAsync`](https://launchdarkly.github.io/cpp-sdks/libs/client-sdk/docs/html/classlaunchdarkly_1_1client__side_1_1Client.html). If you do choose to block indefinitely for client initialization, you can listen to status updates. To learn more, read [Monitoring SDK status](/docs/sdk/features/monitoring).
##### Client must be a singleton
It’s important to make `Client` a singleton for each LaunchDarkly project. The client instance maintains internal state that allows LaunchDarkly to serve feature flags without making any remote requests. Do not instantiate a new client with every request.
If you have multiple LaunchDarkly projects, you can create one `Client` for each. In this situation, the clients operate independently. For example, they do not share a single connection to LaunchDarkly.
### Evaluate a flag
After you create the client, you can use it to check which variation a particular context will receive for a given feature flag.
Here’s how:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x (native)C SDK v2.x (C++ binding)
```
1
| bool show_feature = client.BoolVariation("flag-key-123abc", false);
---|--- 
2
| if (show_feature) {
3
| // Application code to show the feature
4
| } else {
5
| // The code to run if the feature is off
6
| }
```
##### Making feature flags available to this SDK
You must make feature flags available to mobile SDKs before the SDK can evaluate those flags. If an SDK tries to evaluate a feature flag that is not available, the context will receive the fallback value for that flag.
To make a flag available to this SDK, check the **SDKs using Mobile key** checkbox during flag creation, or toggle on the option in the flag’s right sidebar. To make all of a project’s flags available to this SDK by default, check the **SDKs using Mobile key** checkbox on your project’s [Flag settings page](/docs/home/account/edit-project).
## Shut down the client
Shut down the client when your application terminates. To learn more, read [Shutting down](/docs/sdk/features/shutdown#c-client-side).
## Supported features
This SDK supports the following features:
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#c-client-side)
 * [Configuration](/docs/sdk/features/config#c-client-side), including
 * [Application metadata configuration](/docs/sdk/features/app-config#c-client-side)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#c-client-side)
 * [Context configuration](/docs/sdk/features/context-config#c-client-side)
 * [Evaluating flags](/docs/sdk/features/evaluating#c-client-side)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#c-client-side)
 * [Flushing events](/docs/sdk/features/flush#c-client-side)
 * [Getting all flags](/docs/sdk/features/all-flags#c-client-side)
 * [Identifying and changing contexts](/docs/sdk/features/identify#c-client-side)
 * [Monitoring SDK status](/docs/sdk/features/monitoring#c-client-side)
 * [Offline mode](/docs/sdk/features/offline-mode#c-client-side)
 * [Private attributes](/docs/sdk/features/private-attributes#c-client-side)
 * [Relay Proxy configuration, using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode#c-client-side)
 * [Sending custom events](/docs/sdk/features/events#c-client-side)
 * [Shutting down](/docs/sdk/features/shutdown#c-client-side)
 * [Subscribing to flag changes](/docs/sdk/features/flag-changes#c-client-side)
 * [Web proxy configuration](/docs/sdk/features/web-proxy#c-client-side)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs