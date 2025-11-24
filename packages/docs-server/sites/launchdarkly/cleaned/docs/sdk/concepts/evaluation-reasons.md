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
 * [Accessing flag variation information programmatically](#accessing-flag-variation-information-programmatically)
 * [Understanding the reason data](#understanding-the-reason-data)
 * [Error conditions](#error-conditions)
 * [Understanding how Data Export events display](#understanding-how-data-export-events-display)
## Overview
This topic explains how to use LaunchDarkly to determine why a context instance receives a given flag variation. It can be useful to have this information when you’re diagnosing problems or doing analysis of the impact of different flags.
You can access this information programmatically from your SDK or from Data Export events. To learn more about Data Export, read [Data Export](/docs/integrations/data-export).
You can also view evaluation reasons on the context detail page. To learn how, read [The context details page](/docs/home/flags/context-details).
## Accessing flag variation information programmatically
For each of the SDK methods that you call to evaluate a feature flag, there is a corresponding `detail` method.
This method returns three pieces of information:
 * The computed flag variation, which is what you get when you evaluate the flag
 * The variation index, which is a zero-based integer indicating which variation was selected. For example, if the flag’s possible variations are `A`, `B`, and `C`, in that order, and the computed variation is `C`, the variation index would be 2. This value is useful for tabulation, although in some cases, it may be absent. To learn more, read [Error conditions](/docs/sdk/concepts/evaluation-reasons#error-conditions).
 * A `reason` object, which contains information about why that variation was selected. This data structure is described below.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Try it in your SDK: [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons)
## Understanding the reason data
In strongly-typed languages, the reason object is composed of specific classes. In other languages, it is a hash, such as a dictionary or object.
The JSON representation is the same in every language, so we will describe the reason object here as if it were a JSON object.
The reason object’s only required property is `kind`. This describes the general reason that LaunchDarkly selected this variation. The possible values for `kind` are enums in the strongly-typed languages and strings in other languages.
These values are:
Value name | Description 
---|--- 
`OFF` | Targeting is off and therefore returned its configured off value. This value appears on the flag’s **Targeting** tab next to “If targeting is off, serve:”. 
`FALLTHROUGH` | Targeting is on, but the context did not match any targets or rules, so it returned the value that appears on the flag’s **Targeting** tab under “Default rule.” The “default rule” is not the same thing as the default value discussed in “Error conditions.” 
`TARGET_MATCH` | The context key was specifically targeted for this flag in the “Individual targets” section. 
`RULE_MATCH` | The context that encountered the flag matched one of the flag’s rules. In this case, the reason object also has these properties: `ruleIndex`, which is the positional index of the matched rule (0 for the first rule), and `ruleId`, which is the rule’s unique identifier, and stays the same even if you rearrange the order of the rules. 
`PREREQUISITE_FAILED` | The flag had at least one prerequisite flag that either was off or did not return the desired variation. Because of this, the flag returned its “off” value. In this case, the reason object also has this property: `prerequisiteKey`: The key of the prerequisite flag that failed. 
`ERROR` | The flag could not be evaluated, so the default value was returned. 
`inExperiment` is an optional attribute on the `reason` object that indicates whether the context was evaluated as part of an experiment:
 * If `inExperiment` is true, LaunchDarkly includes the event in experimentation analysis
 * If `inExperiment` is false, LaunchDarkly does not include this attribute in the reason object
For a list of SDKs that support experiment allocation, read [Allocating experiment audiences](/docs/home/experimentation/allocation).
## Error conditions
If the `kind` is `ERROR`, it means that the SDK was unable to select any of the flag’s variations. This is an abnormal occurrence.
In this case, the returned flag value is the default value that you specified in your code, which is the last parameter of the method you called to evaluate the flag, rather than any value that you specified on your flag’s **Targeting** tab. In addition, the variation index will be `null/nil`.
When there is an error, the reason object also has an `errorKind` property which will be one of the following:
Property Name | Description 
---|--- 
`CLIENT_NOT_READY` | The client is not able to establish a connection to LaunchDarkly yet. If there is a persistent feature store, the store does not yet contain flag data. 
`FLAG_NOT_FOUND` | The flag key did not match any known flag. 
`USER_NOT_SPECIFIED` | The context was not provided or was invalid. 
`MALFORMED_FLAG` | There was an internal inconsistency in the flag data. For example, a rule specified a nonexistent variation. This is an unusual condition that might require assistance from LaunchDarkly’s Support team. 
`WRONG_TYPE` | The application code requested the flag value with a different data type than it actually is. For example, the code asked for a boolean when the flag variation is a string. This can only happen in strongly-typed languages, such as Go, Java, and C#. 
`EXCEPTION` | An unexpected error stopped flag evaluation. This could happen if you are using a persistent feature store and the database stops working. When this happens, the SDK always prints the specific error to the log. 
## Understanding how Data Export events display
Calling any of the variation detail methods not only makes extra information available to your code, it also causes the SDK to include it in analytics events. You can view this information if you use the **Live events** page or Data Export.
To learn more, read [Live events](/docs/home/releases/live-events) and [Data Export](/docs/integrations/data-export).
The JSON representation of the reason data will be included in the feature evaluation event as an extra property called `reason`.
For instance, a `debug` event might look like this:
JSON event data
```
1
| {
---|--- 
2
| "kind": "debug",
3
| "context": {
4
| "key": "context-key-123abc",
5
| "kind": "user",
6
| "name": "Sandy"
7
| },
8
| "creationDate": 1548195712000,
9
| "key": "flag-key-123abc",
10
| "version": 1000,
11
| "variation": 0,
12
| "value": true,
13
| "default": false,
14
| "reason": {
15
| "kind": "TARGET_MATCH",
16
| "inExperiment": true
17
| }
18
| }
```
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs