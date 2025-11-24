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
 * [Understanding changes to configuration options](#understanding-changes-to-configuration-options)
 * [Understanding the automatically added environment attributes](#understanding-the-automatically-added-environment-attributes)
 * [Automatic environment attributes and application metadata configuration](#automatic-environment-attributes-and-application-metadata-configuration)
## Overview
This topic explains the changes in the .NET (client-side) SDK 4.0 release and how to migrate to that version.
**Version 4.0 contains breaking changes**. It introduces the ability to have LaunchDarkly automatically provide data about the mobile environment where the application is running. This data makes it simpler to target your mobile customers based on application name or version, or on device characteristics including manufacturer, model, operating system, and so on.
When you configure the SDK, starting in version 4.0 you must indicate whether LaunchDarkly should or should not include this data. As part of this change, the `Init` and `InitAsync` methods now include an additional required parameter. To learn more, read [Understanding changes to configuration options](/docs/sdk/client-side/dotnet/migration-3-to-4#understanding-changes-to-configuration-options), below.
This data is provided in two new context kinds. The data is added automatically to each evaluation context you provide.
Customers who are billed by MAU may be charged based on the `ld_device` context kind if it becomes the context kind with the highest volume of monthly activity in their account. This feature does not affect customers on other billing models. To learn more, read [Account usage metrics](/docs/home/account/metrics).
Version 4.0 of the SDK also introduces the ability to configure the SDK to send application metadata to LaunchDarkly.
Before you migrate to version 4.0, we recommend updating to the latest 3.x version. If you update to the latest 3.x version, deprecation warnings appear in areas of your code that need to be changed for 4.0. You can update these areas at your own pace while still using 3.x, rather than migrating everything simultaneously. To learn more about updating to the latest 3.x version, visit the [SDK’s GitHub repository](https://github.com/launchdarkly/dotnet-client-sdk).
## Understanding changes to configuration options
Version 4.0 introduces a new, required configuration parameter. Use this to indicate whether LaunchDarkly should automatically provide data about the mobile environment where the application is running as part of each evaluation context. You must include this parameter when building your `Configuration`.
Here’s how:
.NET SDK v4.0 (C#).NET SDK v3.x (C#)
```
1
| var config = Configuration
---|--- 
2
| .Builder("mobile-key-123abc", ConfigurationBuilder.AutoEnvAttributes.Enabled)
3
| .Build();
```
You must also include this new parameter when calling `Init` or `InitAsync`.
For example:
.NET SDK v4.0 (C#), using Init.NET SDK v3.x (C#), using Init.NET SDK v4.0 (C#), using InitAsync.NET SDK v3.x (C#), using InitAsync
```
1
| var context = Context.New("context-key-123abc");
---|--- 
2
| var timeSpan = TimeSpan.FromSeconds(10);
3
| 
4
| client = LdClient.Init("mobile-key-123abc", ConfigurationBuilder.AutoEnvAttributes.Enabled, context, timeSpan);
```
To disable this option, pass in `AutoEnvAttributes.Disabled` instead.
To learn more, read [`Configuration`](https://launchdarkly.github.io/dotnet-client-sdk/api/LaunchDarkly.Sdk.Client.Configuration.html).
## Understanding the automatically added environment attributes
If you use `AutoEnvAttributes.Enabled` in the SDK client configuration, the SDK automatically adds two additional contexts to each context that you evaluate. You can use attributes from these contexts in your targeting rules.
##### Working with multi-contexts
Because the SDK automatically adds contexts, every evaluation context is now a set of multiple contexts, which is called a multi-context. This means to you can create targeting rules in your feature flags based on data from multiple contexts at once. To learn more, read [Multi-contexts](/docs/home/flags/multi-contexts).
These automatically added contexts include the following attributes:
Context kind | Context attribute | Description | Example 
---|---|---|--- 
`ld_application` | `key` | Unique for this context kind. Automatically generated by the SDK. | _randomly generated_ 
| `id` | Unique identifier of the application. | `com.launchdarkly.example` 
| `locale` | Locale of the device, in [IETF BCP 47 Language Tag](https://www.ietf.org/rfc/bcp/bcp47.txt) format. | `en-US` 
| `name` | Human-friendly name of the application. | `Example Mobile App` 
| `version` | Version of the application used for update comparison. | `5` 
| `versionName` | Human-friendly name of the version. May or may not be a semantic version. | `5` 
| `envAttributesVersion` | Version of the environment attributes schema being used. This may change in later versions of the SDK. | `1.0` 
`ld_device` | `key` | Unique for this context kind. Automatically generated by the SDK. | _randomly generated_ 
| `manufacturer` | Manufacturer of the device. | `Google` 
| `model` | Model of the device. | `Pixel 6 Pro` 
| `os` | Operating system of the device. Includes properties for `family`, `name`, and `version`. | 
 * `family`: `Android`
 * `version`: `13`
 * `name`: `Android33`
| `envAttributesVersion` | Version of the environment attributes schema being used. This may change in later versions of the SDK. | `1.0` 
If the SDK cannot determine the information for a particular attribute, it will not include that attribute. For example, if the SDK cannot determine the device’s model, it will not include the `model` attribute.
If the SDK can determine none of the information for an entire context, it will not include that context. For example, if you run the .NET (client-side) SDK on a desktop environment, the SDK cannot reliably get the device information. In this case the `ld_device` context is omitted.
### Automatic environment attributes and application metadata configuration
If you are already setting [application metadata](/docs/sdk/features/app-config) as part of your SDK configuration, you can still use this new [environment attributes](/docs/sdk/features/environment-attributes) feature. Any application metadata that you set will override the automatically collected environment attributes.
Specifically, the `ld_application` context attributes are set based on the following priority order:
 1. If you set values for application id, name, version, or version name using [application metadata configuration](/docs/sdk/features/app-config) in the SDK, then the `ld_application` context will reflect those values.
 2. Otherwise, if you have set values for the application id, name, version, or version name within your mobile app, the `ld_application` context will reflect those values.
 3. Otherwise, the `ld_application` context will use the LaunchDarkly SDK name and version.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs