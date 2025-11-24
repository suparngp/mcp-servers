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
 * [Server-side SDKs](#server-side-sdks)
 * [.NET (server-side)](#net-server-side)
 * [Apex](#apex)
 * [C++ (server-side)](#c-server-side)
 * [Erlang](#erlang)
 * [Go](#go)
 * [Haskell](#haskell)
 * [Java](#java)
 * [Lua](#lua)
 * [Node.js (server-side)](#nodejs-server-side)
 * [PHP](#php)
 * [Python](#python)
 * [Ruby](#ruby)
 * [Rust](#rust)
 * [AI SDKs](#ai-sdks)
 * [.NET AI](#net-ai)
 * [Go AI](#go-ai)
 * [Node.js (server-side) AI](#nodejs-server-side-ai)
 * [Python AI](#python-ai)
 * [Ruby AI](#ruby-ai)
## Overview
This topic explains how to configure private context and user attributes in LaunchDarkly SDKs. These features are available for client-side, server-side, and AI SDKs.
You can optionally configure your SDK to treat some or all attributes as [private context attributes](/docs/home/flags/private-context-attributes). You can use private context attributes for targeting purposes, but the SDK removes them from the context data it sends back to LaunchDarkly.
##### The SDK always sends the context key and kind
The context key is not optional. You cannot set either the context key or the context kind as a private attribute.
If you initially mark an attribute as private, LaunchDarkly will continue to treat the attribute as private in subsequent evaluations as long as the context is in the **Contexts** list, even if you later remove the “private” designation from the attribute. If you no longer want LaunchDarkly to treat the attribute as private, remove the “private” designation within the SDK, delete the context from the **Contexts** list, and re-evaluate the context.
After you configure private attributes within your SDK, the context details page in the LaunchDarkly user interface shows the private attributes under a `_meta` section. The values of these attributes are not displayed:
![The "Attributes" section of the context details page, showing private attributes in a "_meta" section.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/b3321b028db961626484352c2984c8c03ac855797dd112959ddc2314725301f1/assets/images/auto/context-details-private-attribute.auto.png)
The "Attributes" section of the context details page, showing private attributes in a "_meta" section.
Depending on the type of SDK you use, LaunchDarkly does not receive or store the information in private attributes:
 * If you are using a server-side or AI SDK, the SDK will not send the private attribute back to LaunchDarkly.
 * If you are using a client-side SDK, the SDK will send the private attribute back to LaunchDarkly for evaluation. However, the SDK won’t send the attribute to LaunchDarkly in events data, LaunchDarkly won’t store the private attribute, and the private attribute will not appear on the **Contexts** list or on the detail page for the context.
##### Newer versions of LaunchDarkly SDKs replace users with contexts
A context is a generalized way of referring to the people, services, machines, or other resources that encounter feature flags in your product. Contexts replace another data object in LaunchDarkly: “users.” To learn more, read [Contexts](/docs/home/flags/contexts).
Creating contexts and evaluating flags based on them is supported in the latest major versions of [most of our SDKs](/docs/sdk). For these SDKs, the code samples on this page include the two most recent versions.
Details about each SDK’s configuration are available in the SDK-specific sections below.
 * [Client-side SDKs](/docs/sdk/features/private-attributes#client-side-sdks)
 * [Server-side SDKs](/docs/sdk/features/private-attributes#server-side-sdks)
 * [AI SDKs](/docs/sdk/features/private-attributes#ai-sdks)
## Client-side SDKs
Here are the configuration options for private context and user attributes in client-side SDKs:
 * [.NET (client-side)](/docs/sdk/features/private-attributes#net-client-side)
 * [Android](/docs/sdk/features/private-attributes#android)
 * [C++ (client-side)](/docs/sdk/features/private-attributes#c-client-side)
 * [Electron](/docs/sdk/features/private-attributes#electron)
 * [Flutter](/docs/sdk/features/private-attributes#flutter)
 * [iOS](/docs/sdk/features/private-attributes#ios)
 * [JavaScript](/docs/sdk/features/private-attributes#javascript)
 * [Node.js (client-side)](/docs/sdk/features/private-attributes#nodejs-client-side)
 * [React Native](/docs/sdk/features/private-attributes#react-native)
 * [React Web](/docs/sdk/features/private-attributes#javascript): The React Web SDK relies on the JavaScript SDK for context-related functionality.
 * [Roku](/docs/sdk/features/private-attributes#roku)
### .NET (client-side)
###### Expand .NET (client-side) code sample
In the client-side .NET SDK there are two ways to define private attributes for the entire LaunchDarkly client:
 * When creating the LaunchDarkly `Configuration` object, you can call the `AllAttributesPrivate` method, which takes in a boolean parameter. If `true`, all context attributes except the kind and key are removed for all contexts before the SDK sends the context to LaunchDarkly.
 * When creating the LaunchDarkly `Configuration` object, you can call the `PrivateAttributes` method, which takes any number of attribute names or slash-delimited paths to designated JSON properties within an attribute, such as `/address/street`. If any context has a custom or built-in attribute that matches one of these names, the SDK removes it before sending the context to LaunchDarkly.
For example:
.NET SDK v4.0 (C#).NET SDK v3.0 (C#)
```
1
| // All attributes marked private
---|--- 
2
| var configAllPrivate = Configuration
3
| .Builder("mobile-key-123abc", ConfigurationBuilder.AutoEnvAttributes.Enabled)
4
| .AllAttributesPrivate(true)
5
| .Build();
6
| LdClient client = LdClient.Init(configAllPrivate, context);
7
| 
8
| // Two attributes marked private
9
| var configSomePrivate = Configuration.Builder("mobile-key-123abc")
10
| .PrivateAttributes("email", "address")
11
| .Build();
12
| LdClient client = LdClient.Init(configSomePrivate, context);
```
You can also mark attributes as private when building the context object by calling `Private()` on the context builder.
For example:
.NET SDK v3.0+ (C#)
```
1
| var context = Context.Builder("context-key-123abc")
---|--- 
2
| .Set("email", "sandy@example.com")
3
| .Private("email")
4
| .Build();
```
When the SDK sends this context back to LaunchDarkly, it removes the `email` attribute.
### Android
###### Expand Android code sample
In the Android SDK you can define private attributes for the entire LaunchDarkly client. When creating the `LDConfig` object, call the `privateAttributes` method, which takes in a set of custom or built-in attributes as a parameter. If any context has a custom or built-in attribute named in this set, the SDK removes it before sending the context to LaunchDarkly.
Here’s how to configure private attributes:
Android SDK v5.x (Java)Android SDK v5.x (Kotlin)Android SDK v4.x (Java)Android SDK v4.x (Kotlin)
```
1
| // All attributes marked private
---|--- 
2
| LDConfig ldConfig = new LDConfig.Builder(AutoEnvAttributes.Enabled)
3
| .mobileKey("mobile-key-123abc")
4
| .events(
5
| Components.sendEvents()
6
| .allAttributesPrivate(true)
7
| )
8
| .build();
9
| 
10
| // Two attributes marked private
11
| LDConfig ldConfig = new LDConfig.Builder(AutoEnvAttributes.Enabled)
12
| .mobileKey("mobile-key-123abc")
13
| .events(
14
| Components.sendEvents()
15
| .privateAttributes("name", "group")
16
| )
17
| .build();
```
You can also mark attributes as private when building the context object by using the private versions of the builder methods to set the attributes. For example:
Android SDK v4.0+ (Java)Android SDK v4.0+ (Kotlin)
```
1
| LDContext context = LDContext.builder("context-key-123abc")
---|--- 
2
| .set("email", "sandy@example.com")
3
| .set("name", "Sandy")
4
| .set("group", "Microsoft")
5
| .privateAttributes("name", "group")
```
When the SDK sends this context back to LaunchDarkly, it removes the `name` and `group` attributes.
### C++ (client-side)
###### Expand C++ (client-side) code sample
In the C++ SDK there are two ways to define private attributes for the LaunchDarkly client:
 * When using the `ConfigBuilder`, you can call `AllAttributesPrivate()`. When you do this, all context attributes except the kind and key are removed before the SDK sends the context to LaunchDarkly.
 * When using the `ConfigBuilder`, you can configure a set of `PrivateAttributes()`. If any context has an attribute named in this list, the SDK removes it before sending the context to LaunchDarkly.
Here’s how:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x
```
1
| /* sets all attributes private */
---|--- 
2
| auto config_builder = client_side::ConfigBuilder("mobile-key-123abc");
3
| config_builder.Events().AllAttributesPrivate(true);
4
| auto config_all_private = config_builder.Build();
5
| 
6
| /* sets "email" and "address" private */
7
| auto config_builder = client_side::ConfigBuilder("mobile-key-123abc");
8
| config_builder.Events().PrivateAttributes({"email", "address"});
9
| auto configSomePrivate = config_builder.Build();
```
You can also define private attributes for a particular context by calling `.SetPrivate()` in the `ContextBuilder`.
Here’s how:
C++ SDK v3.0
```
1
| auto context = ContextBuilder()
---|--- 
2
| .Kind("user", "user-key-123abc")
3
| .Name("Sandy Smith")
4
| .SetPrivate("email", "sandy@example.com")
5
| .Build();
```
To learn more, read [`ContextBuilder`](https://launchdarkly.github.io/cpp-sdks/libs/client-sdk/docs/html/classlaunchdarkly_1_1ContextBuilder.html).
### Electron
###### Expand Electron code sample
To mark all user attributes except the key as private, use the `allAttributesPrivate` option:
JavaScriptTypeScript
```
1
| const user = {
---|--- 
2
| key: 'user-key-123abc',
3
| name: 'Sandy Smith',
4
| email: 'sandy@example.com'
5
| };
6
| 
7
| const client = LDElectron.initialize('client-side-id-123abc', user, {
8
| allAttributesPrivate: true
9
| });
```
In the above example, the SDK removes the `name` and `email` attributes.
You can also specify an array of which attributes should be private with the `privateAttributeNames` option. You can configure this option on a per-user basis by specifying which attributes should be private in your user object.
This option is configured in both the user object and the configuration object:
JavaScriptTypeScript
```
1
| const user = {
---|--- 
2
| key: 'user-key-123abc',
3
| name: 'Sandy Smith',
4
| email: 'sandy@example.com',
5
| privateAttributeNames: ['email']
6
| };
7
| 
8
| const client = LDElectron.initialize('client-side-id-123abc', user, {
9
| privateAttributeNames: ['email']
10
| });
```
In the above example, the SDK sends only the `key` and `name` back to LaunchDarkly.
### Flutter
###### Expand Flutter code sample
In the Flutter SDK, you can define private attributes for the **entire** LaunchDarkly client. When you create the `LDConfig` object, you can set all attributes private for all contexts. You can also provide a list of attributes to the `globalPrivateAttributes` option. If any context has an attribute named in this set, the SDK removes it before sending the context to LaunchDarkly.
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
| allAttributesPrivate: true, // all attributes marked private
5
| globalPrivateAttributes: ['user/email', 'user/group'], // two attributes marked private for the 'user' context kind
6
| )
```
You can also mark attributes as private when building the context object by using the `private` optional parameter. For example:
Flutter SDK v4Flutter SDK v2.x+Flutter SDK v1.x
```
1
| final context = LDContextBuilder()
---|--- 
2
| .kind('user', 'user-key-123abc'),
3
| .setString('name', 'Sandy')
4
| .setString('email', 'sandy@example.com', private: true)
5
| .setString('group', 'microsoft', private: true)
6
| .build();
```
When the SDK sends this context back to LaunchDarkly, the `email` and `group` attributes are removed.
To learn more about the configuration options for private attributes, read [`allAttributesPrivate`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDConfig/allAttributesPrivate.html) and [`globalPrivateAttributes`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDConfig/globalPrivateAttributes.html). To learn more about setting private attributes for a specific context, read [`LDContext`](https://pub.dev/documentation/launchdarkly_flutter_client_sdk/latest/launchdarkly_flutter_client_sdk/LDContext-class.html).
### iOS
###### Expand iOS code sample
In the iOS SDK there are two ways to define private attributes for the entire LaunchDarkly client:
 * When creating the `LDConfig` object, you can set the `allContextAttributesPrivate` attribute to `true`.
 * When creating the LDConfig object, you can set the `privateContextAttributes` property to a list of `Reference`s, such as `[Reference("name"), Reference("/address/state")]`. If any context has a custom or built-in attribute named in this list, the SDK removes it before sending the context to LaunchDarkly.
For example:
iOS SDK v9.0 (Swift)iOS SDK v9.0 (Objective-C)iOS SDK v8.x (Swift)iOS SDK v8.x (Objective-C)
```
1
| // All attributes marked private
---|--- 
2
| config = LDConfig(mobileKey: "mobile-key-123abc", autoEnvAttributes: .enabled)
3
| config.allContextAttributesPrivate = true
4
| 
5
| // Two attributes marked private
6
| config = LDConfig(mobileKey: "mobile-key-123abc", autoEnvAttributes: .enabled)
7
| config.privateContextAttributes = [Reference("email"), Reference("address")]
```
You can also mark attributes as private on a particular `LDContext` instance, for example:
iOS SDK v8.0+ (Swift)iOS SDK v8.0+ (Objective-C)
```
1
| var contextBuilder = LDContextBuilder(key: "context-key-123abc")
---|--- 
2
| contextBuilder.trySetValue("name", .string("Sandy"))
3
| contextBuilder.trySetValue("group", .array([LDValue(stringLiteral: "microsoft")]))
4
| contextBuilder.addPrivateAttribute(Reference("name"))
5
| contextBuilder.addPrivateAttribute(Reference("group"))
6
| 
7
| let context = try contextBuilder.build().get()
```
### JavaScript
###### Expand JavaScript code sample
You can configure the private attributes option either in the configuration object or in the context object.
In the configuration object, to mark all attributes except the key as private in the JavaScript SDK, use the `allAttributesPrivate` option:
JavaScript SDK v3.xJavaScript SDK v3.x (TypeScript)
```
1
| // All attributes marked private
---|--- 
2
| const ldclient = ld.initialize('client-side-id-123abc', context, options = {
3
| allAttributesPrivate: true
4
| });
5
| 
6
| try {
7
| await client.waitForInitialization(5);
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
To learn more, read [`allAttributesPrivate`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html#allAttributesPrivate).
In the configuration object, to mark some attributes as private specify your array of attributes in the `privateAttributes` configuration option:
JavaScript SDK v3.xJavaScript SDK v3.x (TypeScript)
```
1
| // Two attributes marked private
---|--- 
2
| const ldclient = ld.initialize('client-side-id-123abc', context, options = {
3
| privateAttributes: ['email', 'name']
4
| });
5
| 
6
| try {
7
| await client.waitForInitialization(5);
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
To learn more, read [`privateAttributes`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html#privateAttributes).
In the context object, specify your array of attributes in the `privateAttributes` field of the reserved `_meta` property.
Here’s how:
JavaScript SDK v3.xJavaScript SDK v3.x (TypeScript)
```
1
| const context = {
---|--- 
2
| kind: 'user',
3
| key: 'context-key-123abc',
4
| name: 'Sandy Smith',
5
| email: 'sandy@example.com',
6
| _meta: {
7
| privateAttributes: ['email']
8
| }
9
| };
```
To learn more, read [`privateAttributes`](https://launchdarkly.github.io/js-client-sdk/interfaces/LDContextMeta.html#privateAttributes).
### Node.js (client-side)
###### Expand Node.js (client-side) code sample
To mark all attributes except the key as private in the Node.js SDK, you can use the `allAttributesPrivate` option:
Node.js SDK v3.0 (JavaScript)Node.js SDK v3.0 (TypeScript)
```
1
| const context = {
---|--- 
2
| kind: 'user',
3
| key: 'user-key-123abc',
4
| name: 'Sandy Smith',
5
| email: 'sandy@example.com'
6
| };
7
| // All attributes marked private
8
| const client = ld.initialize('client-side-id-123abc', context, {
9
| allAttributesPrivate: true
10
| });
11
| // Two attributes marked private
12
| const client = ld.initialize('client-side-id-123abc', context, {
13
| privateAttributes: ['email', 'name']
14
| });
```
You can also specify an array of which attributes should be private with the `privateAttributes` option. You can configure this option on a per-context basis by specifying which attributes should be private in your context object.
You can configure this option in both the context object and the configuration object:
Node.js SDK v3.0 (JavaScript)Node.js SDK v3.0 (TypeScript)
```
1
| const context = {
---|--- 
2
| kind: 'user',
3
| key: 'user-key-123abc',
4
| name: 'Sandy Smith',
5
| email: 'sandy@example.com'
6
| _meta: {
7
| privateAttributes: ['email']
8
| }
9
| };
10
| 
11
| const client = ld.initialize('client-side-id-123abc', context, {
12
| privateAttributes: ['email']
13
| });
```
In the above example, the SDK sends only the context key and name back to LaunchDarkly.
### React Native
###### Expand React Native code sample
You can configure this option in the configuration object, to apply to all contexts, either for all attributes or some attributes:
React Native SDK v10
```
1
| // All attributes marked private
---|--- 
2
| const options = {
3
| allAttributesPrivate: true
4
| }
5
| const client = new ReactNativeLDClient('mobile-key-123abc', AutoEnvAttributes.Enabled, options);
6
| 
7
| // Two attributes marked private
8
| const options = {
9
| privateAttributes: ['email', 'address']
10
| }
11
| const client = new ReactNativeLDClient('mobile-key-123abc', AutoEnvAttributes.Enabled, options);
```
To learn more, read [`allAttributesPrivate`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/interfaces/LDOptions.html#allAttributesPrivate) and [`privateAttributes`](https://launchdarkly.github.io/js-core/packages/sdk/react-native/docs/interfaces/LDOptions.html#privateAttributes).
You can also mark an attribute as private for a particular context:
React Native SDK v7+
```
1
| const context = {
---|--- 
2
| kind: 'user',
3
| key: 'user-key-123abc',
4
| firstName: 'Sandy',
5
| lastName: 'Smith',
6
| email: 'sandy@example.com',
7
| address: {
8
| street: '123 Main St',
9
| city: 'Springfield'
10
| },
11
| _meta: {
12
| privateAttributes: ['email', '/address/street']
13
| }
14
| };
```
For attributes that are objects, you can mark specific fields private, using the `/` delimiter followed by the attribute name, then the `/` delimiter followed by the JSON property within the value. In the example, the attribute `"address": { "street": "Main St", "city": "Springfield" }` has only the `/address/street` marked as private.
### React Web
All context-related functionality provided by the [JavaScript SDK](/docs/sdk/features/private-attributes#javascript) is also available in the React Web SDK.
### Roku
###### Expand Roku code sample
You can configure this option in the configuration object, to apply to all contexts, either for all attributes or some attributes:
Brightscript
```
1
| ' All attributes marked private
---|--- 
2
| config = LaunchDarklyConfig("mobile-key-123abc", launchDarklyTaskNode)
3
| config.setAllAttributesPrivate(true)
4
| 
5
| LaunchDarklySGInit(config, context)
6
| client = LaunchDarklySG(launchDarklyTaskNode)
7
| 
8
| ' Two attributes marked private
9
| config = LaunchDarklyConfig("mobile-key-123abc", launchDarklyTaskNode)
10
| config.addPrivateAttribute("email")
11
| config.addPrivateAttribute("address")
12
| 
13
| LaunchDarklySGInit(config, context)
14
| client = LaunchDarklySG(launchDarklyTaskNode)
```
You can also mark an attribute as private for a particular context:
BrightScript
```
1
| ' when creating a context
---|--- 
2
| context = LaunchDarklyCreateContext({
3
| "kind": "user",
4
| "key": "context-key-123-abc",
5
| "email": "sandy@example.com",
6
| "_meta": { privateAttributes: ["email"] }
7
| })
8
| 
9
| ' for an existing context
10
| context.addPrivateAttribute("email")
11
| context.addPrivateAttribute("/address/street")
```
## Server-side SDKs
Here are the configuration options for private context and user attributes in server-side SDKs:
 * [.NET (server-side)](/docs/sdk/features/private-attributes#net-server-side)
 * [Apex](/docs/sdk/features/private-attributes#apex)
 * [C++ (server-side)](/docs/sdk/features/private-attributes#c-server-side)
 * [Erlang](/docs/sdk/features/private-attributes#erlang)
 * [Go](/docs/sdk/features/private-attributes#go)
 * [Haskell](/docs/sdk/features/private-attributes#haskell)
 * [Java](/docs/sdk/features/private-attributes#java)
 * [Lua](/docs/sdk/features/private-attributes#lua)
 * [Node.js (server-side)](/docs/sdk/features/private-attributes#nodejs-server-side)
 * [PHP](/docs/sdk/features/private-attributes#php)
 * [Python](/docs/sdk/features/private-attributes#python)
 * [Ruby](/docs/sdk/features/private-attributes#ruby)
 * [Rust](/docs/sdk/features/private-attributes#rust)
### .NET (server-side)
###### Expand .NET (server-side) code sample
In the server-side .NET SDK there are two ways to define private attributes for the entire LaunchDarkly client:
 * When creating the LaunchDarkly `Configuration` object, you can configure [`Events`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.ConfigurationBuilder.html#LaunchDarkly_Sdk_Server_ConfigurationBuilder_Events_) with [`AllAttributesPrivate`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Integrations.EventProcessorBuilder.html#LaunchDarkly_Sdk_Server_Integrations_EventProcessorBuilder_AllAttributesPrivate_), which takes in a boolean parameter. If `true`, the SDK removes all attributes for all contexts before sending the context to LaunchDarkly, except the key.
 * Or, you can configure `Events` with [`PrivateAttributes`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.Server.Integrations.EventProcessorBuilder.html#LaunchDarkly_Sdk_Server_Integrations_EventProcessorBuilder_PrivateAttributes_), which takes any number of attribute names or slash-delimited paths to designated a JSON property within an attribute, such as `/address/street`. If any context has a custom or built-in attribute that matches one of these names, the SDK removes it before sending the context to LaunchDarkly.
For example:
.NET SDK v7.0 (C#)
```
1
| // All attributes marked as private
---|--- 
2
| var config = Configuration.Builder("sdk-key-123abc")
3
| .Events(
4
| Components.SendEvents()
5
| .AllAttributesPrivate(true) // defaults to false
6
| )
7
| .Build();
8
| 
9
| var client = new LDClient(config);
10
| 
11
| // Two attributes marked as private
12
| var config = Configuration.Builder("sdk-key-123abc")
13
| .Events(
14
| Components.SendEvents()
15
| .PrivateAttributes("email", "address")
16
| )
17
| .Build();
18
| 
19
| var client = new LDClient(config);
```
You can also mark attributes as private when building the context object by calling [`Private()`](https://launchdarkly.github.io/dotnet-server-sdk/pkgs/sdk/server/api/LaunchDarkly.Sdk.ContextBuilder.html#LaunchDarkly_Sdk_ContextBuilder_Private_) after setting the attribute on the context builder.
For example:
.NET SDK v7.0 (C#)
```
1
| var context = Context.Builder("context-key-123abc")
---|--- 
2
| .Set("email", "sandy@example.com")
3
| .Private("email")
4
| .Build();
```
When the SDK sends this context back to LaunchDarkly, it removes the `email` attribute.
### Apex
###### Expand Apex code sample
You can configure the Apex SDK to treat some or all user attributes as private user attributes, either using the `LDConfig` object or on a per-user basis.
When creating the `LDConfig` object, you can use `setAllAttributesPrivate(true)`. When you do this, all user attributes, except the key, are redacted before the SDK sends the user to LaunchDarkly.
Here’s how:
Java
```
1
| LDConfig config = new LDConfig.Builder()
---|--- 
2
| .setAllAttributesPrivate(true)
3
| .build();
```
You can also define private attribute names on a per-user basis:
Java
```
1
| Set<String> privateAttributes = new Set<String>();
---|--- 
2
| privateAttributes.add('firstName');
3
| 
4
| LDUser user = new LDUser.Builder('user-key-123abc')
5
| .setFirstName('alice')
6
| .setPrivateAttributeNames(privateAttributes)
7
| .build();
```
### C++ (server-side)
###### Expand C++ (server-side) code sample
In the C++ SDK there are three ways to define private attributes for the LaunchDarkly client:
 * When creating the config object, you can use `AllAttributesPrivate`. When you do this, the SDK only sends the context key and kind to LaunchDarkly.
For example:
C++ SDK v3.0 (native)C++ SDK v3.0 (C binding)C SDK v2.x (native)
```
1
| auto config_builder = server_side::ConfigBuilder("sdk-key-123abc");
---|--- 
2
| config_builder.Events().AllAttributesPrivate(true);
3
| auto config = config_builder.Build();
```
 * When creating the config object, you can list specific private attributes with `PrivateAttributes`. The SDK removes all attributes in this list before sending the context to LaunchDarkly.
Here’s how:
C++ SDK v3.0 (native)C SDK v2.x (native)
```
1
| auto config_builder = server_side::ConfigBuilder("sdk-key-123abc");
---|--- 
2
| config_builder.Events().PrivateAttributes({"email"});
3
| auto config = config_builder.Build();
4
| if (!config) {
5
| /* an error occurred, config is not valid */
6
| }
```
 * You can also define private attributes on a per-context basis. For example:
C++ SDK v3.0 (native)C SDK v2.x (native)
```
1
| auto context = ContextBuilder()
---|--- 
2
| .Kind("user", "user-key-123abc")
3
| .SetPrivate("email", "sandy@example.com")
4
| .Build();
```
To learn more, read [`ContextBuilder`](https://launchdarkly.github.io/cpp-sdks/libs/server-sdk/docs/html/classlaunchdarkly_1_1ContextBuilder.html).
### Erlang
###### Expand Erlang code sample
Here’s how to set context attributes as private for all or just some contexts:
Erlang
```
1
| %% All attributes marked as private
---|--- 
2
| ldclient:start_instance("sdk-key-123abc", #{private_attributes => all}).
3
| 
4
| %% Two attributes marked as private
5
| ldclient:start_instance("sdk-key-123abc", #{private_attributes => [<<"email">>, <<"address">>]}).
```
Here’s how to set context attributes as private for a specific context:
Erlang
```
1
| ContextWithPrivateAttributes = ldclient_context:set_private_attributes([<<"name">>, <<"/address/street">>],
---|--- 
2
| ldclient_context:set(<<"name">>, <<"Global Health Services">>,
3
| ldclient_context:set(<<"email">>, <<"info@globalhealthexample.com">>,
4
| ldclient_context:set(<<"address">>, #{
5
| <<"street">> => <<"123 Main Street">>,
6
| <<"city">> => <<"Springfield">>
7
| },
8
| ldclient_context:new(<<"context-key-456def">>, <<"organization">>))))),
```
In the example, only the `name` and `/address/street` attributes are private for this context.
### Go
###### Expand Go code sample
In the Go SDK there are two ways to define private attributes for the entire LaunchDarkly client:
 * You can set the configuration option `AllAttributesPrivate` to true. If you enable this, the SDK removes all attributes for all contexts before it sends the context to LaunchDarkly, except the key and kind.
 * You can set the configuration option `PrivateAttributes` to a list of attribute names. If any context has an attribute named in this list, the SDK removes it before sending the context to LaunchDarkly.
Here’s how to to define private attributes:
Go SDK v6.0
```
1
| import (
---|--- 
2
| ld "github.com/launchdarkly/go-server-sdk/v6"
3
| "github.com/launchdarkly/go-server-sdk/v6/ldcomponents"
4
| )
5
| 
6
| var config ld.Config
7
| 
8
| // Make all attributes private for all contexts
9
| config.Events = ldcomponents.SendEvents().AllAttributesPrivate(true)
10
| 
11
| // Or, make just the email and address attributes private for all contexts
12
| config.Events = ldcomponents.SendEvents().
13
| PrivateAttributes("name", "email")
```
You can also define a set of private attributes on the context object itself. In the following example, “email” and the “street” field of the “address” attribute are private for this context, in addition to any private attributes that were specified globally:
Go SDK v6.0
```
1
| import (
---|--- 
2
| "github.com/launchdarkly/go-sdk-common/v3/ldcontext"
3
| )
4
| 
5
| context := ldcontext.NewBuilder("context-key-123abc").
6
| Kind("organization").
7
| Name("Global Health Services").
8
| SetString("email", "info@globalhealthexample.com").
9
| SetValue("address", ldvalue.ObjectBuild().
10
| SetString("street", "123 Main Street").
11
| SetString("city", "Springfield")).
12
| Private("email").
13
| Private("/address/street").
14
| Build()
```
### Haskell
###### Expand Haskell code sample
Optionally, you can configure the Haskell SDK to treat some or all context attributes as [private attributes](/docs/home/flags/private-context-attributes). You can use private context attributes for targeting purposes, but the SDK removes private context attributes from the data it sends to LaunchDarkly.
There are two ways to define private attributes for the entire LaunchDarkly client:
 * When you create the `Config` object, use `configSetAllAttributesPrivate` to set all context attributes as private. When you do this, all context attributes, except the key and kind, are removed before the SDK sends the context to LaunchDarkly.
 * When you create the `Config` object, you can list specific private attributes with `configSetPrivateAttributeNames`. If any context has attributes named in this list, the SDK removes them before sending the context to LaunchDarkly.
Here’s how:
Haskell SDK v4.0
```
1
| -- All attributes marked private
---|--- 
2
| makeConfig "sdk-key-123abc" & configSetAllAttributesPrivate True
3
| 
4
| -- Two attributes marked private
5
| import qualified Data.Set as S
6
| import qualified LaunchDarkly.Server.Reference as R
7
| 
8
| makeConfig sdkKey
9
| & configSetAllAttributesPrivate True
10
| & configSetPrivateAttributeNames (S.fromList $ map R.makeLiteral ["name", "email"])
11
| config = LaunchDarkly::Config.new({private_attributes: ["name", "email"]})
```
You can also define private attribute names on a per-context basis.
For example:
Haskell SDK v4.0Haskell SDK v3.x
```
1
| makeContext "key" "user"
---|--- 
2
| & withName "Sandy"
3
| & withAttribute "email" "sandy@example.com"
4
| & withPrivateAttributes (S.fromList $ map R.makeLiteral ["name", "email"])
```
### Java
###### Expand Java code sample
In the Java SDK there are two ways to define private attributes for the entire LaunchDarkly client:
 * When creating the `LDConfig` object, you can call the [`allAttributesPrivate`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/integrations/EventProcessorBuilder.html#allAttributesPrivate-boolean-) method, which takes in a boolean parameter. If `true`, all context attributes except the key for all contexts are removed before the SDK sends the context to LaunchDarkly.
 * When creating the `LDConfig` object, you can call the [`privateAttributes`](https://launchdarkly.github.io/java-core/lib/sdk/server/com/launchdarkly/sdk/server/integrations/EventProcessorBuilder.html#privateAttributes-java.lang.String...-) method, which takes in a set of custom or built-in attributes as a parameter. If any context has a custom or built-in attribute named in this list, the SDK removes it before sending the context to LaunchDarkly.
Here’s how to define private attributes:
Java SDK v6.0
```
1
| // All attributes marked private
---|--- 
2
| LDConfig configWithAllAttributesPrivate = new LDConfig.Builder()
3
| .events(
4
| Components.sendEvents()
5
| .allAttributesPrivate(true)
6
| )
7
| .build();
8
| 
9
| // Some attributes marked private
10
| LDConfig configWithSpecificAttributesPrivate = new LDConfig.Builder()
11
| .events(
12
| Components.sendEvents()
13
| .privateAttributes("name", "email", "someAttribute")
14
| )
15
| .build();
```
You can also mark attributes as private when building the context object by calling the `privateAttributes` builder method. For example:
Java SDK v6.0
```
1
| LDContext context = LDContext.builder("context-key-123abc")
---|--- 
2
| .set("email", "sandy@example.com")
3
| .privateAttributes("email")
4
| .build();
```
When the SDK sends this context back to LaunchDarkly, it removes the `email` attribute.
### Lua
###### Expand Lua code sample
In the Lua SDK there are two ways to define private attributes for the LaunchDarkly client:
 * Use `allAttributesPrivate` to remove all context attributes except for the kind and key from all contexts before the SDK sends the contexts to LaunchDarkly.
 * Use `privateAttributes` to designate a list of private attributes. If any context has an attribute named in this list, the SDK removes that attribute before sending the context to LaunchDarkly.
Here’s how to mark attributes as private:
Lua SDK v2Lua SDK v1.x
```
1
| -- sets all attributes private
---|--- 
2
| local configAllPrivate = {
3
| events = {
4
| allAttributesPrivate = true
5
| }
6
| }
7
| 
8
| -- sets "email" and "address" private
9
| local configSomePrivate = {
10
| events = {
11
| privateAttributes = { "email", "address" }
12
| }
13
| }
```
You can also define private attributes for a particular context using a list of `privateAttributes`:
Lua SDK v2Lua SDK v1.x
```
1
| local user = ld.makeContext({
---|--- 
2
| user = {
3
| key = "user-key-123abc",
4
| attributes = {
5
| firstName = "Sandy",
6
| lastName = "Smith",
7
| email = "sandy@example.com",
8
| groups = { "Google", "Microsoft" }
9
| },
10
| privateAttributes = { "email "}
11
| }
12
| })
```
To learn more, read [`clientInit`](https://launchdarkly.github.io/lua-server-sdk/modules/launchdarkly-server-sdk.html#clientInit) and [`makeContext`](https://launchdarkly.github.io/lua-server-sdk/modules/launchdarkly-server-sdk.html#makeContext).
### Node.js (server-side)
###### Expand Node.js (server-side) code sample
In the Node.js SDK there are two ways to define private attributes for the entire LaunchDarkly client:
 * In the LaunchDarkly `LDOptions`, you can set `allAttributesPrivate` to `true`. If you enable this, the SDK removes all attributes for all contexts before sending the context to LaunchDarkly, except the kind and key.
 * In the LaunchDarkly `LDOptions` object, you can define a list of `privateAttributes`. If any context has a custom or built-in attribute named in this list, the SDK removes it before sending the context to LaunchDarkly.
For example:
Node.js SDK v7.0+ (JavaScript)Node.js SDK v7.0+ (TypeScript)
```
1
| // All attributes marked private
---|--- 
2
| const options = {
3
| allAttributesPrivate: true
4
| };
5
| client = ld.init('sdk-key-123abc', options);
6
| 
7
| // Two attributes marked private
8
| const options = {
9
| privateAttributes: ['email', 'address']
10
| };
11
| client = ld.init('sdk-key-123abc', options);
```
You can also define a set of `privateAttributes` on the context object. For example:
Node.js SDK v8.x (TypeScript)Node.js SDK v7.x (JavaScript)Node.js SDK v7.x (TypeScript)
```
1
| import * as ld from '@launchdarkly/node-server-sdk';
---|--- 
2
| 
3
| const user: ld.LDContext = {
4
| kind: 'user',
5
| key: 'user-key-123abc',
6
| email: 'sandy@example.com',
7
| privateAttributes: ['email'],
8
| };
```
When the SDK sends this context back to LaunchDarkly, it removes the `email` attribute.
### PHP
###### Expand PHP code sample
In the PHP SDK there are two ways to define private attributes for the entire LaunchDarkly client:
 * In the LaunchDarkly `config`, you can set `all_attributes_private` to `true`. If you enable this, the SDK removes all attributes except the key and kind from a context before sending the context to LaunchDarkly.
 * In the LaunchDarkly `config` object, you can define a list of `private_attribute_names`. If any context has a custom or built-in attribute named in this list, the SDK removes it before sending the context to LaunchDarkly.
For example:
PHP SDK v5.0
```
1
| // All attributes marked private
---|--- 
2
| $client = new LaunchDarkly\LDClient($sdkKey, ['all_attributes_private' => true]);
3
| 
4
| // Two attributes marked private
5
| $client = new LaunchDarkly\LDClient($sdkKey, ['private_attribute_names' => ['name', 'email']]);
```
You can also mark attributes as private when building the context object by calling the equivalent “private” [`LDContextBuilder`](http://launchdarkly.github.io/php-server-sdk/classes/LaunchDarkly-LDContextBuilder.html) method.
For example:
PHP SDK v5.0
```
1
| $context = LDContext::builder('context-key-123abc')
---|--- 
2
| ->set('email', 'sandy@example.com')
3
| ->private('email')
4
| ->build();
```
When the SDK sends this context back to LaunchDarkly, it removes the `email` attribute.
### Python
###### Expand Python code sample
In the Python SDK there are two ways to define private attributes for the LaunchDarkly client:
 * In the LaunchDarkly `config`, you can set `all_attributes_private` to true. If you enable this, the SDK removes all context attributes for all contexts before sending the context to LaunchDarkly, except the key.
 * In the LaunchDarkly `config` object, you can define a list of attributes in `private_attributes`. If any context has a custom or built-in attribute named in this list, the SDK removes it before sending the context to LaunchDarkly.
For example:
Python SDK v8.0
```
1
| # All attributes marked private
---|--- 
2
| config = Config(all_attributes_private=True)
3
| 
4
| # Two attributes marked private
5
| config = Config(private_attributes=["name", "email"])
```
You can also mark attributes as private when building the context object by calling the `private` builder method. For example:
Python SDK v8.0
```
1
| context = Context.builder("context-key-123abc") \
---|--- 
2
| .set("email", "sandy@example.com") \
3
| .private("email") \
4
| .build()
```
When the SDK sends this context back to LaunchDarkly, it removes the `email` attribute.
### Ruby
###### Expand Ruby code sample
In the Ruby SDK there are two ways to define private attributes for the entire LaunchDarkly client:
 * In the LaunchDarkly `config`, you can set `all_attributes_private` to true. If you enable this, the SDK removes all context attributes for all contexts before sending the context to LaunchDarkly, except the key.
 * In the LaunchDarkly config object, you can define a list of `private_attributes`. If any context has a custom or built-in attribute named in this list, the SDK removes it before sending the context to LaunchDarkly.
For example:
Ruby SDK v7.0
```
1
| # All attributes marked private
---|--- 
2
| config = LaunchDarkly::Config.new({all_attributes_private: true})
3
| 
4
| # Two attributes marked private
5
| config = LaunchDarkly::Config.new({private_attributes: ["name", "email"]})
```
You can also define a set of `privateAttributes` on the context object. For example:
Ruby SDK v7.0
```
1
| context = LaunchDarkly::LDContext.create({
---|--- 
2
| key: "user-key-123abc",
3
| kind: "user",
4
| firstName: "Sandy",
5
| lastName: "Smith",
6
| email: "sandy@example.com",
7
| groups: ["Google", "Microsoft"],
8
| _meta: {
9
| privateAttributes: ['email']
10
| }
11
| })
```
When the SDK sends this context back to LaunchDarkly, it removes the `email` attribute.
### Rust
###### Expand Rust code sample
In the Rust SDK there are two ways to define private attributes for the entire LaunchDarkly client:
 * In the LaunchDarkly config object, you can set `all_attributes_private` to true. If you enable this, the SDK removes all attributes for all contexts before sending the context to LaunchDarkly, except the key and kind.
 * In the LaunchDarkly config object, you can define a list of `private_attributes`. If any contexts has an attribute named in this list, the SDK removes it before sending the context to LaunchDarkly.
For example:
Rust SDK v1
```
1
| // All attributes marked private
---|--- 
2
| let config_builder = ConfigBuilder::new("sdk-key-123abc");
3
| let mut processor_builder = EventProcessorBuilder::new();
4
| processor_builder.all_attributes_private(true);
5
| );
6
| config_builder.event_processor(&processor_builder);
7
| 
8
| // Two attributes marked private
9
| let config_builder = ConfigBuilder::new("sdk-key-123abc");
10
| let mut processor_builder = EventProcessorBuilder::new();
11
| processor_builder.private_attributes(
12
| vec!["email".into(), "address".into()]
13
| .into_iter()
14
| .collect(),
15
| );
16
| config_builder.event_processor(&processor_builder);
```
You can also define private attributes on the context object. For example:
Rust SDK v1
```
1
| let context = ContextBuilder::new("context-key-123abc")
---|--- 
2
| .set_value("email", "youremail@example.com".into())
3
| .add_private_attribute(Reference::new("email"))
4
| .build()?;
```
When the SDK sends this context back to LaunchDarkly, it removes the `email` attribute.
## AI SDKs
Here are the configuration options for private context attributes in AI SDKs:
 * [.NET AI](/docs/sdk/features/private-attributes#net-ai)
 * [Go AI](/docs/sdk/features/private-attributes#go-ai)
 * [Node.js (server-side) AI](/docs/sdk/features/private-attributes#nodejs-server-side-ai)
 * [Python AI](/docs/sdk/features/private-attributes#python-ai)
 * [Ruby AI](/docs/sdk/features/private-attributes#ruby-ai)
### .NET AI
###### Expand .NET AI SDK code sample
In the .NET AI SDK you can mark attributes as private when building the context object by calling `Private()` after setting the attribute on the context builder.
For example:
.NET AI SDK
```
1
| var context = Context.Builder("context-key-123abc")
---|--- 
2
| .Set("email", "sandy@example.com")
3
| .Private("email")
4
| .Build();
```
When the SDK sends this context back to LaunchDarkly, it removes the `email` attribute.
### Go AI
###### Expand Go AI SDK code sample
In the Go AI SDK you can mark attributes as private when building the context object by calling `Private()` after setting the attribute on the context builder.
For example:
Go AI SDK
```
1
| import (
---|--- 
2
| "github.com/launchdarkly/go-sdk-common/v3/ldcontext"
3
| )
4
| 
5
| context := ldcontext.NewBuilder("context-key-123abc").
6
| Kind("organization").
7
| Name("Global Health Services").
8
| SetString("email", "info@globalhealthexample.com").
9
| Private("email").
10
| Build()
```
When the SDK sends this context back to LaunchDarkly, it removes the `email` attribute.
### Node.js (server-side) AI
###### Expand Node.js (server-side) AI SDK code sample
In the Node.js (server-side) AI SDK you can define a set of `privateAttributes` on the context object.
Here’s how:
Node.js (server-side) AI SDK (TypeScript)Node.js (server-side) AI SDK (JavaScript)
```
1
| const context: LDContext = {
---|--- 
2
| kind: 'user',
3
| key: 'user-key-123abc',
4
| email: 'sandy@example.com',
5
| privateAttributes: ['email'],
6
| };
```
When the SDK sends this context back to LaunchDarkly, it removes the `email` attribute.
### Python AI
###### Expand Python AI code sample
In the Python AI SDK you can mark attributes as private when building the context object by calling the `private` builder method.
Here’s how:
Python AI SDK
```
1
| context = Context.builder("context-key-123abc") \
---|--- 
2
| .set("email", "sandy@example.com") \
3
| .private("email") \
4
| .build()
```
When the SDK sends this context back to LaunchDarkly, it removes the `email` attribute.
### Ruby AI
###### Expand Ruby AI code sample
In the Ruby AI SDK you can mark attributes as private when creating the context.
Here’s how:
Ruby AI SDK
```
1
| context = LaunchDarkly::LDContext.create({
---|--- 
2
| key: "user-key-123abc",
3
| kind: "user",
4
| firstName: "Sandy",
5
| lastName: "Smith",
6
| email: "sandy@example.com",
7
| groups: ["Google", "Microsoft"],
8
| _meta: {
9
| privateAttributes: ['email']
10
| }
11
| })
```
When the SDK sends this context back to LaunchDarkly, it removes the `email` attribute.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs