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
 * [Understanding flag types](#understanding-flag-types)
 * [Naming your flags](#naming-your-flags)
 * [Boolean flags](#boolean-flags)
 * [Number flags](#number-flags)
 * [String flags](#string-flags)
 * [JSON object and array flags](#json-object-and-array-flags)
 * [Context attributes](#context-attributes)
 * [Strongly-typed SDKs](#strongly-typed-sdks)
 * [Generic JSON values](#generic-json-values)
 * [Date/time and semantic version operators](#datetime-and-semantic-version-operators)
 * [Representations of date/time values](#representations-of-datetime-values)
 * [Semantic versions](#semantic-versions)
## Overview
This topic explains feature flag templates and how different flag templates affect flag evaluations in LaunchDarkly SDKs.
## Understanding flag types
When you create a flag in the LaunchDarkly user interface (UI), the UI presents several different flag configurations for common use cases. Each of these configurations uses either a boolean or multivariate flag. You can also use multivariate flags in experiments to test different versions of a feature. To learn more, read [Experimentation](/docs/home/experimentation).
LaunchDarkly projects have groups of default settings, called “templates,” that support these common use cases for flags. To learn more, read [Flag templates](/docs/home/flags/templates).
Each flag template has variations that are either boolean, string, number, or JSON values. In other words, LaunchDarkly supports two basic types of flags:
 * [Boolean flags](/docs/sdk/concepts/flag-types#boolean-flags) have two possible variations of `true` or `false`.
 * Multivariate flags allow you to customize the number and types of variations they return. Multivariate flags have variations whose types include:
 * [number](/docs/sdk/concepts/flag-types#number-flags)
 * [string](/docs/sdk/concepts/flag-types#string-flags)
 * [JSON](/docs/sdk/concepts/flag-types#json-object-and-array-flags)
Imagine your organization wants to know if changing the color of your site’s “Checkout” button increases customer purchases. You can use a boolean flag if you want to compare only two colors. If you have more colors to test, you can use multivariate flags to roll out several different colors of the button to different audiences, allowing you to determine the most effective color more quickly.
When you choose a flag template, you should choose one whose variations are the same data type as the value your code returns. Decoders and encoders in your app should not translate one data type to another. For example, if you define a property as boolean, the JSON string values `”true”` and `”false”` will not work. You can use only the boolean values `true` and `false`.
When you create a flag in the LaunchDarkly user interface (UI), the UI presents several different flag configurations for common use cases. Each of these configurations uses either a boolean or multivariate flag.
### Naming your flags
We recommend naming your flag after the behavior that the flag enables when on. For example, “Two-step checkout” or “Dark mode.”
When naming multivariate flags, we recommend you name the flag after the general task it performs to indicate a number of choices are available. For example, “Account API Rate Limit” or “Purchase Flow Experiment.”
To learn more, read [Flag conventions](/docs/guides/flags/flag-conventions).
## Boolean flags
Boolean flags can have only `true` or `false` variations. As a best practice, we recommend setting boolean flags to `true` when targeting is on and `false` when targeting is off.
You can treat an optional boolean property as `false` if there is no property value present. You can write a false value as `false` or omit the property.
## Number flags
Number flags can be either an integer or a floating-point type.
Some strongly-typed SDKs use separate evaluation methods depending on whether a numeric value is an integer or a floating-point type. However, because the underlying type is “number” in either case, both integer and floating-point methods work on numeric flag values. To learn more, read [Strongly-typed SDKs](/docs/sdk/concepts/flag-types#strongly-typed-sdks).
LaunchDarkly SDKs use double-precision floating-point numbers that have a limit of 16 significant, or non-0, digits. If you use a number over 16 significant digits, the SDK will not store or transmit the additional digits accurately. You can use 16 non-0 digits followed by any number of 0s, but non-0 digits will be either dropped or converted to 0s.
For example:
 * LaunchDarkly SDKs store `1234567812345678` accurately
 * LaunchDarkly SDKs store `1234567812345678000000` accurately
 * LaunchDarkly SDKs store `1234567812345678999999` inaccurately as `1234567812345678000000` or `1234567812345678`
Trailing zeroes are trimmed off of floating-point numbers. For example, number flags consider `10000`, `10000.00`, and `1e4` to be the same number.
Most applications convert numbers to binary floating-point, which can cause rounding errors. This means fractional numbers may be imprecise. If you need to represent decimal fractional numbers exactly, you should use a string or an integer. For example, for currency values, use “10.23” instead of 10.23, or scale your numbers by a factor of 100 and use 1023.
## String flags
String flags have a limit of 32KB. Strings are UTF-8 encoded, so certain characters, like emojis and non-ASCII characters, take more than one byte each.
You can use escape sequences in string flag values. For example, LaunchDarkly treats string values `ab\u0063` and `abc` as the same value.
## JSON object and array flags
In addition to booleans, numbers, and strings, flags can be objects or arrays. In the LaunchDarkly UI, object and array flags are called “JSON flags.”
You can treat an optional array or object property as empty if there is no property value present. You can write an empty array as `[]`, an empty object as `{}`, or omit the property completely.
JSON object and array flags have a size limit of 32KB.
## Context attributes
Context attributes follow the same patterns as LaunchDarkly flag variations. The value of an attribute can be of the following types:
 * boolean
 * number
 * string
 * array
 * JSON object
If you set the value of an attribute to a JSON object, it won’t appear in your **Contexts** list.
Number attributes are subject to the same restrictions as number flags. For example, if you define a flag targeting rule where `myAttribute` is one of `0.3`, contexts with an attribute value of `0.3` may not be correctly targeted because 0.3 can’t be exactly represented in binary floating point.
Like number flags, LaunchDarkly truncates attribute number values to the first 16 digits. If you define a flag targeting rule where `myAttribute` is one of `1234567812345678999999`, LaunchDarkly will target contexts with an attribute value of `1234567812345678999998`, because both the flag rule and the attribute value are truncated to `1234567812345678`.
To learn more about custom attributes, read [Custom attributes](/docs/home/flags/custom-attributes). To learn more about setting context attributes in the SDK, read [Context configuration](/docs/sdk/features/context-config).
##### Newer versions of LaunchDarkly SDKs replace users with contexts
A context is a generalized way of referring to the people, services, machines, or other resources that encounter feature flags in your product. Contexts replace another data object in LaunchDarkly: “users.”
Creating contexts and evaluating flags based on them is supported in recent major versions of [most of our SDKs](/docs/sdk).
## Strongly-typed SDKs
Some of our SDK languages are strongly-typed. Strongly-typed languages have separate methods for evaluating different kinds of flags.
Strongly-typed SDKs must call the correct evaluation method for the flag they use. For example, strongly-typed SDKs won’t convert a boolean `true` to a string “true”.
If the evaluation method does not match the type of the flag variation, then the SDK will proceed as if the result is a variation index of “undefined.” The evaluation reason will have a `kind` of `ERROR` and an `errorKind` of `WRONG_TYPE`.
Other LaunchDarkly SDKs are not strongly-typed. They have just one variation method for all types of values.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Try it in your SDK: [Flag evaluation reasons](/docs/sdk/features/evaluation-reasons)
### Generic JSON values
If you don’t want to call a specific evaluation method for your flag, most strongly-typed SDKs have a method for getting a flag value as a generic JSON value, regardless of whether the flag’s value is a boolean, a number, a string, or JSON. In most situations, you do not need to get generic JSON values.
In some cases, you may need to use them for:
 * writing general-purpose code that copies flag values to somewhere else
 * using flag variations to hold complex data structures
For example, you may need to bundle unrelated properties, like text and color, with metadata, like your experiment name, to pass to a third-party system when using a flag in an experiment. Getting a generic JSON value allows you to keep this information together in one flag.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Try it in your SDK: [Evaluating flags](/docs/sdk/features/evaluating)
## Date/time and semantic version operators
Date/time and semantic version operators have individual rules because JSON does not have specific types for them.
### Representations of date/time values
LaunchDarkly uses two ways to represent a date/time value:
 * A number, not a numeric string, that is treated as a millisecond offset from the Unix epoch. For example, 1400967000000 is equivalent to 2014/05/24 15:30:00 PST. To learn more about UNIX date formatting, or convert a date and time to UNIX milliseconds, read [Current Millis](https://currentmillis.com/).
 * A string in RFC-3339 format, with no more than nine digits of fractional seconds. For example: `2014-05-24T15:30:00.000-08:00`. To learn more about RFC-3339 format, read [Date and Time on the Internet: Timestamps](https://datatracker.ietf.org/doc/html/rfc3339).
### Semantic versions
A value must be a string, not a numeric value, to be parsed as a semantic version. Semantic version syntax is defined by the Semantic Versioning 2.0.0 standard with the following addition: a string containing only two version components (”2.0”) is treated as if it had a suffix of .0 (”2.0.0”). To learn more, read [Semantic Versioning 2.0.0](https://semver.org/).
##### Pre-release versions have a lower precedence
LaunchDarkly treats pre-release versions as having a lower precedence than the associated “normal” (fully released) version, because a pre-release version indicates that the version is unstable and might not satisfy the intended compatibility requirements. For example, the pre-release version `2.1.0-rc2` is treated as lower than normal version `2.1.0`.
You may need to account for this if you are using semantic versions in your [targeting rules](/docs/home/flags/target-rules). For example, we recommend targeting based on a semantic version of greater than `2.0.9999` if you need to match both `2.1.0` and `2.1.0-rc2`.
Server-side SDKs must be the following minimum version or higher to support semantic versioning:
 * .NET: 3.6.1
 * Apex: all versions
 * C++: all versions
 * Erlang: all versions
 * Go: v3
 * Haskell: all versions
 * Java: 2.6.0
 * Lua: all versions
 * Node.js: 3.4.0
 * PHP: 2.5.0
 * Python: 4.3.0
 * Ruby: 2.5.0
 * Rust: 1.0.0-beta.1
No updates are required for client-side SDKs.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs