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
 * [Get started](#get-started)
 * [Install the SDK](#install-the-sdk)
 * [Initialize the client](#initialize-the-client)
 * [Evaluate a context](#evaluate-a-context)
 * [Using the Java SDK in OSGi](#using-the-java-sdk-in-osgi)
 * [Shut down the client](#shut-down-the-client)
 * [Supported features](#supported-features)
## Overview
This topic documents how to get started with the Java SDK, and links to reference information on all of the supported features.
##### SDK quick links
LaunchDarkly’s SDKs are open source. In addition to this reference guide, we provide source, API reference documentation, and sample applications:
Resource | Location 
---|--- 
SDK API documentation | [SDK API docs](https://launchdarkly.github.io/java-core/lib/sdk/server/) 
GitHub repository | [java-server-sdk](https://github.com/launchdarkly/java-core/tree/main/lib/sdk/server) 
Sample applications | [Java](https://github.com/launchdarkly/hello-java) 
You can also use this SDK with [Kotlin](https://kotlinlang.org/) 
Published module | [Maven](https://mvnrepository.com/artifact/com.launchdarkly/launchdarkly-java-server-sdk) 
##### For use in server-side applications only
This SDK is intended for use in multi-user Java server applications. If you have an Android application and want to set up LaunchDarkly in a mobile, desktop, or embedded application, read the [Android SDK reference](/docs/sdk/client-side/android).
To learn more about LaunchDarkly’s different SDK types, read [Choosing an SDK type](/docs/sdk/concepts/client-side-server-side).
##### SDK version compatibility
The LaunchDarkly Java SDK, version 5.0 and higher, is compatible with Java 8 and higher.
Prior to version 5.0, the LaunchDarkly Java SDK also supported Java 7.
## Get started
After you complete the [Getting Started process](/docs/home/getting-started), follow these instructions to start using the LaunchDarkly SDK in your Java application.
### Install the SDK
First, install the LaunchDarkly SDK as a dependency in your application using your application’s dependency manager. Refer to the [SDK releases page](https://github.com/launchdarkly/java-core/releases) to identify the latest version.
In this example, it uses version 7.0.0:
XMLGradle
```
1
| <dependency>
---|--- 
2
| <groupId>com.launchdarkly</groupId>
3
| <artifactId>launchdarkly-java-server-sdk</artifactId>
4
| <version>7.0.0</version>
5
| </dependency>
```
Next, import the LaunchDarkly client in your application code.
Java
```
1
| import com.launchdarkly.sdk.*;
---|--- 
2
| import com.launchdarkly.sdk.server.*;
```
##### The Java SDK uses an SDK key
The Java SDK uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
### Initialize the client
After you install and import the SDK, create a single, shared instance of [`LDClient`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDClient.html). Specify your SDK key here to authorize your application to connect to a particular environment within LaunchDarkly.
Here’s how:
Java
```
1
| LDClient client = new LDClient("sdk-key-123abc");
---|--- 
```
The client attempts to connect to LaunchDarkly as soon as you call the constructor. The constructor will return when it successfully connects, or when the default timeout of five seconds expires, whichever comes first. If the client does not succeed, your feature flags will serve default values, and the client will continue trying to connect in the background. You can check whether the initialization succeeded using [`isInitialized()`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDClient.html#isInitialized--).
To learn more about the specific configuration properties that are available in this SDK, read [`LDConfig.Builder`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/LDConfig.Builder.html).
##### Working with reactive libraries
If you are working with reactive libraries, then you can create an instance of `LDReactorClient`, instead of `LDClient`. The `LDReactorClient` is a thin wrapper of the `LDClient` that adapts it to reactive stream programming. `LDReactorClient` uses an elastic scheduler internally, and may allocate a number of threads that is proportional to the number of concurrent API calls being made on the `LDClient`.
To learn more, read [`LDReactorClient`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/integrations/reactor/LDReactorClient.html).
If you receive an “unable to find valid certification path” error when you initialize the SDK, you must update the Java truststore. To learn how, read the [troubleshooting article in the LaunchDarkly Customer Knowledge Base](https://support.launchdarkly.com/hc/en-us/articles/14710791365019-Error-Error-in-stream-connection-unable-to-find-valid-certification-path-to-requested-target-).
##### LDClient must be a singleton
It’s important to make `LDClient` a singleton for each LaunchDarkly project. The client instance maintains internal state that allows LaunchDarkly to serve feature flags without making any remote requests. Do not instantiate a new client with every request.
If you have multiple LaunchDarkly projects, you can create one `LDClient` for each. In this situation, the clients operate independently. For example, they do not share a single connection to LaunchDarkly.
### Evaluate a context
You can use `client` to check which variation a particular context will receive for a given feature flag. To learn more, read [Evaluating flags](/docs/sdk/features/evaluating) and [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons). For more information about how contexts are specified, read [Context configuration](/docs/sdk/features/context-config).
In the v6 example, the context key is the string “context-key-123abc”. In the v5 example, the user key is the string “user-key-123abc”:
Java SDK v6.0+
```
1
| LDContext context = LDContext.builder("context-key-123abc")
---|--- 
2
| .name("Sandy")
3
| .build();
4
| 
5
| boolean flagValue = client.boolVariation("flag-key-123abc", context, false);
6
| 
7
| if (flagValue) {
8
| // Application code to show the feature
9
| }
10
| else {
11
| // The code to run if the feature is off
12
| }
```
## Using the Java SDK in OSGi
You can install versions 4.6.0 and higher of the SDK as OSGi bundles.
The SDK’s default jar, which it gets from Maven or Gradle if you do not specify a “classifier,” does not contain Gson or SLF4j because applications are often built with their own specific versions of those libraries. Using the default jar in OSGi requires Gson and SLF4j to be provided by some other bundle.
However, there is also a distribution that includes Gson and SLF4j as part of the SDK bundle. You can use this if you do not need to control the versions of those libraries separately.
To do so, add the classifier “all”:
XML
```
1
| <!-- in Maven -->
---|--- 
2
| <dependency>
3
| <groupId>com.launchdarkly</groupId>
4
| <artifactId>launchdarkly-java-server-sdk</artifactId>
5
| <version>7.0.0</version>
6
| <classifier>all</classifier>
7
| </dependency>
8
| 
9
| <!-- or in Gradle -->
10
| "com.launchdarkly:launchdarkly-java-server-sdk:7.0.0:all"
```
##### Potential network connectivity issues caused by DNS caching
There is a potential problem for any Java application that communicates with a web service, such as LaunchDarkly, that also uses a load-balancing framework. If a service starts to use a different set of IP addresses, a Java application could continue trying to use an old IP address, causing connection attempts to fail. In most environments, this is unlikely to be a problem because IP addresses are not cached for very long.
However, Java has special behavior if the runtime environment has a [security manager](https://docs.oracle.com/javase/tutorial/essential/environment/security.html). In that case, it caches IP addresses indefinitely and doesn’t update them until the application is restarted. If you are running in an environment that has a security manager, or if you’re not sure whether that is the case, we recommend that you set the cache duration (TTL) explicitly. To learn how, read [Setting the JVM TTL for DNS Name Lookups](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/java-dg-jvm-ttl.html).
## Shut down the client
Shut down the client when your application terminates. To learn more, read [Shutting down](/docs/sdk/features/shutdown#java).
## Supported features
This SDK supports the following features:
 * [Anonymous contexts and users](/docs/sdk/features/anonymous#java)
 * [Big segments](/docs/sdk/features/big-segments#java)
 * [Configuration](/docs/sdk/features/config#java), including
 * [Application metadata configuration](/docs/sdk/features/app-config#java)
 * [Migration configuration](/docs/sdk/features/migration-config#java)
 * [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration#java)
 * [Context configuration](/docs/sdk/features/context-config#java)
 * [Evaluating flags](/docs/sdk/features/evaluating#java)
 * [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons#java)
 * [Flushing events](/docs/sdk/features/flush#java)
 * [Getting all flags](/docs/sdk/features/all-flags#java)
 * [Hooks](/docs/sdk/features/hooks#java)
 * [Identifying and changing contexts](/docs/sdk/features/identify#java)
 * [Logging configuration](/docs/sdk/features/logging#java)
 * [Migrations](/docs/sdk/features/migrations#java)
 * [Monitoring SDK status](/docs/sdk/features/monitoring#java)
 * [Offline mode](/docs/sdk/features/offline-mode#java)
 * [OpenTelemetry](/docs/sdk/features/opentelemetry-server-side#java)
 * [Private attributes](/docs/sdk/features/private-attributes#java)
 * [Reading flags from a file](/docs/sdk/features/flags-from-files#java)
 * [Relay Proxy configuration](/docs/sdk/features/relay-proxy-configuration)
 * [Using proxy mode](/docs/sdk/features/relay-proxy-configuration/proxy-mode#java)
 * [Using daemon mode](/docs/sdk/features/relay-proxy-configuration/daemon-mode#java)
 * [Secure mode](/docs/sdk/features/secure-mode#java)
 * [Sending custom events](/docs/sdk/features/events#java)
 * [Shutting down](/docs/sdk/features/shutdown#java)
 * [Storing data](/docs/sdk/features/storing-data#java)
 * [Subscribing to flag changes](/docs/sdk/features/flag-changes#java)
 * [Test data sources](/docs/sdk/features/test-data-sources#java)
 * [Web proxy configuration](/docs/sdk/features/web-proxy#java)
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs