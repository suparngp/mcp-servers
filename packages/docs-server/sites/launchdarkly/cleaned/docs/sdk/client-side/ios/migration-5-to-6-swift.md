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
 * [Understanding the new LDValue type](#understanding-the-new-ldvalue-type)
 * [Understanding the changes to configuration](#understanding-the-changes-to-configuration)
 * [Understanding the changes to creating users](#understanding-the-changes-to-creating-users)
 * [Changes to variation functions](#changes-to-variation-functions)
 * [Changes to variationDetail functions](#changes-to-variationdetail-functions)
 * [Recording custom events](#recording-custom-events)
## Overview
This topic explains how to adapt Swift code that currently uses a 5.x version of the [iOS client-side SDK](/docs/sdk/client-side/ios) to use version 6.0 or later.
Sections in this topic address different changes and updates between versions 5.x and 6.0 of the SDK.
## Understanding the new LDValue type
The 6.0 release of the iOS client-side SDK introduces a new type that represents a value of any valid JSON type: `LDValue`. To learn more about the new type, read the [generated documentation](https://launchdarkly.github.io/ios-client-sdk/Enums/LDValue.html). The `LDValue` `enum` implements several `ExpressibleBy` protocols allowing constants to be created the same as other Swift types, as shown below.
6.0 syntax
```
1
| let nullValue: LDValue = nil
---|--- 
2
| let boolValue: LDValue = true
3
| let numericValue: LDValue = 5.5
4
| let stringValue: LDValue = "abc"
5
| let complexValue: LDValue = ["abc": 123, "def": [false, true]]
```
## Understanding the changes to configuration
The `LDConfig` class only requires changes if the application specifies the `privateUserAttributes` property. The type of the property has changed from `[String]` to `[UserAttribute]`.
Here is an example that highlights the changes:
5.x syntax6.0 syntax
```
1
| var config = LDConfig(mobileKey: "mobile-key-123abc")
---|--- 
2
| config.privateUserAttributes = ["name", "premium"]
```
Setting `"custom"` as a private attribute no longer sets all custom attributes private. Only the custom attribute with the key `"custom"` would be considered private by the SDK.
## Understanding the changes to creating users
Similarly to `LDConfig.privateUserAttributes`, `LDUser.privateAttributes` has been updated to use `UserAttribute`. Additionally `LDUser.custom` now user the `LDValue` type rather than `Any` for specifying the value of custom attributes.
Here is an example that highlights the changes:
5.x syntax6.0 syntax
```
1
| let privateAttributes: [String] = ["name", "jobFunction"]
---|--- 
2
| let customAttributes: [String: Any] = ["jobFunction": ["doctor"]]
3
| let user = LDUser(key: "user-key-123abc", custom: customAttributes, privateAttributes: privateAttributes)
```
The `Equatable` instance for `LDUser` has also changed. It now compares all properties, rather than only the `key` property.
5.x syntax6.0 syntax
```
1
| let user1 = LDUser(key: "user-key-123abc", name: "Sandy Smith")
---|--- 
2
| let user2 = LDUser(key: "user-key-123abc", name: "Jesse Smith")
3
| // Results in true
4
| user1 == user2
```
## Changes to variation functions
The iOS SDK now provides functions per-type for retrieving the variation for a given flag. To retrieve variation values that are complex (JSON arrays or objects), use the new `jsonVariation` function.
Here is an example:
5.x syntax6.0 syntax
```
1
| let boolValue: Bool = LDClient.get()!.variation(forKey: "boolFlag", defaultValue: false)
---|--- 
2
| let arrayValue: [Any] = LDClient.get()!.variation(forKey: "arrayFlag", defaultValue: ["abc", "def"] as [Any])
```
## Changes to variationDetail functions
The iOS SDK now provides function per-type for retrieving the detailed variation result for a given flag. To retrieve variation values that are complex, such as JSON arrays or objects, use the new `jsonVariation` function. The `reason` information associated with a `LDEvaluationDetail` has also changed from `[String: Any]?` to `[String: LDValue]?`.
Here is an example:
5.x syntax6.0 syntax
```
1
| let boolValue: LDEvaluationDetail<Bool> = LDClient.get()!.variationDetail(forKey: "boolFlag", defaultValue: false)
---|--- 
2
| let arrayValue: LDEvaluationDetail<[Any]> = LDClient.get()!.variationDetail(forKey: "arrayFlag", defaultValue: ["abc", "def"] as [Any])
3
| let arrayReason: [String: Any]? = arrayValue.reason
```
## Recording custom events
If your application uses `track` to record `custom` events, remove `try` statements. This function no longer throws an error. Additionally, the `data` parameter type has changed from `Any?` to `LDValue?`. If your application provides the `data` parameter, you may need to update it to provide an `LDValue` type.
Here is an example:
5.x syntax6.0 syntax
```
1
| do {
---|--- 
2
| let customData: Any = ["abc": 123]
3
| try LDClient.get()!.track(key: "key", data: customData)
4
| } catch let error as LDInvalidArgumentError {
5
| // Do something with the error
6
| } catch {}
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs