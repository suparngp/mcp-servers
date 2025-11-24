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
 * [Version compatibility](#version-compatibility)
 * [Install the provider and dependencies](#install-the-provider-and-dependencies)
 * [Initialize the provider](#initialize-the-provider)
 * [Construct a context](#construct-a-context)
 * [Evaluate a context](#evaluate-a-context)
 * [Access the LaunchDarkly client](#access-the-launchdarkly-client)
## Overview
This topic documents how to get started with the LaunchDarkly OpenFeature provider for the Java SDK.
##### Provider quick links
LaunchDarkly’s OpenFeature providers are open source. In addition to this reference guide, we provide source, API reference documentation, and a sample application:
Resource | Location 
---|--- 
OpenFeature Provider API documentation | [Provider API docs](https://launchdarkly.github.io/openfeature-java-server/com/launchdarkly/openfeature/serverprovider/package-summary.html) 
GitHub repository | [openfeature-java-server](https://github.com/launchdarkly/openfeature-java-server) 
Sample application | [Sample OpenFeature Java provider application](https://github.com/launchdarkly/hello-openfeature-java-server) 
Published module | [Maven](https://mvnrepository.com/artifact/com.launchdarkly/launchdarkly-openfeature-serverprovider) 
## Get started
The LaunchDarkly OpenFeature provider for the Java SDK is intended for use in multi-user systems such as web servers and application. It is not intended for use in desktop and embedded systems applications.
Follow these instructions to start using the LaunchDarkly OpenFeature provider for the Java SDK in your application.
### Version compatibility
The LaunchDarkly OpenFeature provider for the Java SDK is compatible with the [OpenFeature Java SDK v1.x](https://openfeature.dev/docs/reference/technologies/server/java).
The provider is compatible with Java 11 and above.
## Install the provider and dependencies
First, you need compatible versions of the LaunchDarkly Java SDK and the OpenFeature java-sdk:
Gradle
```
implementation group: 'com.launchdarkly', name: 'launchdarkly-java-server-sdk', version: '[7.1.0, 8.0.0)' 
--- 
implementation 'dev.openfeature:sdk:[1.7.0,2.0.0)' 
```
Then, add the LaunchDarkly provider for the Java SDK as a dependency in your application:
XMLGradle
```
1
| <dependency>
---|--- 
2
| <groupId>com.launchdarkly</groupId>
3
| <artifactId>launchdarkly-openfeature-serverprovider</artifactId>
4
| <version>1.0.0</version>
5
| </dependency>
```
Next, import the OpenFeature and LaunchDarkly namespaces in your application code:
LaunchDarkly Java provider
```
1
| import dev.openfeature.sdk.OpenFeatureAPI;
---|--- 
2
| import com.launchdarkly.sdk.server.LDClient;
3
| import com.launchdarkly.openfeature.serverprovider.Provider;
```
## Initialize the provider
After you install and import the provider, create a single, shared instance of [`Provider`](https://launchdarkly.github.io/openfeature-java-server/com/launchdarkly/openfeature/serverprovider/Provider.html). Specify your SDK key here to authorize your application to connect to a particular environment within LaunchDarkly.
Here’s how:
Java
```
1
| public class Main {
---|--- 
2
| public static void main(String[] args) {
3
| OpenFeatureAPI.getInstance().setProvider(new Provider("sdk-key-123abc"));
4
| 
5
| Client client = OpenFeatureAPI.getInstance().getClient();
6
| }
7
| }
```
##### The Java provider uses an SDK key
The LaunchDarkly Java provider uses an SDK key. Keys are specific to each project and environment. They are available from **Project settings** , on the **Environments** list. To learn more about key types, read [Keys](/docs/sdk/concepts/client-side-server-side#keys).
## Construct a context
A [context](/docs/home/getting-started/vocabulary#context) is a generalized way of referring to the people, services, machines, or other resources that encounter feature flags in your product. The OpenFeature specification calls these [evaluation contexts](https://openfeature.dev/docs/reference/concepts/evaluation-context).
In the LaunchDarkly provider, contexts:
 * always have a particular [context kind](/docs/home/getting-started/vocabulary#context-kind). If you do not specify a kind, the provider treats the context as having a “user” kind. To specify a different kind, including a multi-context, you must include a `kind` attribute.
 * must have a targeting key. This is optional in the OpenFeature specification, but LaunchDarkly requires a key for evaluation. You can specify this using `targetingKey`, as in the OpenFeature specification, or `key`, which is the typical LaunchDarkly identifier for the targeting key.
Here are examples of a context:
Example user contextExample organization context
```
1
| EvaluationContext context = new ImmutableContext("user-key-123abc");
---|--- 
```
For additional examples, read [OpenFeature specific considerations](https://github.com/launchdarkly/openfeature-java-server?tab=readme-ov-file#openfeature-specific-considerations) in the provider GitHub repository.
## Evaluate a context
To evaluate feature flags for a context, use the OpenFeature [Evaluation API](https://openfeature.dev/docs/reference/concepts/evaluation-api). For example:
Evaluate a context
```
1
| boolean value = client.getBooleanValue("flag-key-123abc", false, context);
---|--- 
```
## Access the LaunchDarkly client
You may need access to the `LDClient` from within the [LaunchDarkly Java SDK](/docs/sdk/server-side/java) if you are working on use cases not supported by OpenFeature, such as [migration flags](/docs/sdk/features/migrations) or [sending custom events](/docs/sdk/features/events).
To access the `LDClient`, use `getLdClient()`:
Java
```
1
| LDClient ldClient = provider.getLdClient();
---|--- 
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs