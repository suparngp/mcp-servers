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
 * [Understanding the changes to creating users](#understanding-the-changes-to-creating-users)
 * [Changes to variation functions](#changes-to-variation-functions)
 * [Understanding changes to variationDetail functions](#understanding-changes-to-variationdetail-functions)
 * [Understanding the changes to flag value observers](#understanding-the-changes-to-flag-value-observers)
 * [Recording custom events](#recording-custom-events)
## Overview
This topic explains how to adapt Objective-C code that currently uses a 5.x version of the [iOS client-side SDK](/docs/sdk/client-side/ios) to use version 6.0 or later. The sections in this topic address different changes and updates between versions 5.x and 6.0 of the SDK.
The Objective-C bridging types for the iOS SDK are implemented in Swift, where names are prefixed by `Objc`. This document refers to the types by the names exposed to Objective-C.
## Understanding the new LDValue type
The 6.0 release of the iOS client-side SDK introduces a new type that represents a value of any valid JSON type: `LDValue`. To learn more, read the [generated documentation](https://launchdarkly.github.io/ios-client-sdk/Classes/ObjcLDValue.html). You can initialize the `LDValue` type with different types of values to support arbitrary JSON data.
Here is an example:
6.0 syntax
```
1
| LDValue *nullValue = [LDValue ofNull];
---|--- 
2
| LDValue *boolValue = [LDValue ofBool:YES];
3
| LDValue *numericValue = [LDValue ofNumber:@5.5];
4
| LDValue *stringValue = [LDValue ofString:@"beta_testers"];
5
| LDValue *complexValue = [LDValue ofDict:@{@"groups": [LDValue ofArray:@[[LDValue ofBool:YES]]]}];
```
## Understanding the changes to creating users
The `LDUser.custom` property has changed in type from `NSDictionary<NSString*, id> * _Nullable` to `NSDictionary<NSString*, LDValue*> * _Nonnull`.
Here is an example of the change:
5.x syntax6.0 syntax
```
1
| LDUser *user = [[LDUser alloc] initWithKey:@"user-key-123abc"];
---|--- 
2
| user.custom = @{@"group": @"beta"};
```
The `isEqual` function on `LDUser` has changed. It no longer only compares the `key` property, and now compares all properties of the instance.
5.x syntax6.0 syntax
```
1
| LDUser *user1 = [[LDUser alloc] initWithKey:@"user-key-123abc"];
---|--- 
2
| user1.name = @"Jane Smith";
3
| LDUser *user2 = [[LDUser alloc] initWithKey:@"user-key-123abc"];
4
| user2.name = @"John Smith";
5
| // Results in true
6
| [user1 isEqual:user2]
```
Setting `"custom"` as a private attribute no longer sets all custom attributes as private. The SDK considers only the custom attribute with the key `"custom"` as private.
## Changes to variation functions
The `LDClient` functions `arrayVariation` and `dictionaryVariation` have been removed. The new `jsonVariation` function lets you evaluate flags with any value type.
5.x syntax6.0 syntax
```
1
| NSArray *result = [[LDClient get] arrayVariationForKey:@"flag-key-123abc" defaultValue:@[]];
---|--- 
```
## Understanding changes to variationDetail functions
The `LDClient` functions `arrayVariationDetail` and `dictionaryVariationDetail` have been removed. The new `jsonVariationDetail` function allows evaluating flags with any resultant value type. The `LDJSONEvaluationDetail` type is used to store the resultant variation and detailed evaluation information.
The `reason` property of the detailed evaluation result types has also changed from `NSDictionary<NSString*, id> * _Nullable` to `NSDictionary<NSString*, LDValue*> * _Nullable`.
5.x syntax6.0 syntax
```
1
| LDArrayEvaluationDetail *result = [[LDClient get] arrayVariationDetailForKey:@"flag-key-123abc" defaultValue:@[]];
---|--- 
2
| NSArray* resultValue = result.value;
3
| NSDictionary<NSString*, id> *reason = result.reason;
```
## Understanding the changes to flag value observers
The `LDClient` previously provided per-type functions for registering observers for flag values. These have been replaced with a single `observe` function you can use with flag variations of any JSON type.
5.x syntax6.0 syntax
```
1
| [[LDClient get] observeBool:@"flag-key-123abc" owner:self handler:^(LDBoolChangedFlag * _Nonnull changedFlag) {
---|--- 
2
| Bool newValue = changedFlag.newValue;
3
| }];
```
## Recording custom events
If your application uses `track` to record `custom` events, you must remove the `error` parameter. The `track` functions no longer have the potential to error from invalid custom event data, because the `data` parameter is now restricted to the `LDValue` type. Change provided `data` types to `LDValue` instances.
Here is an example of the required changes:
5.x syntax6.0 syntax
```
1
| NSError* err = nil;
---|--- 
2
| NSDictionary* data = @{@"abc": @123};
3
| [[LDClient get] trackWithKey:@"key" data:data error:&err];
4
| if (err != nil) {
5
| // Do something with the error
6
| }
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs