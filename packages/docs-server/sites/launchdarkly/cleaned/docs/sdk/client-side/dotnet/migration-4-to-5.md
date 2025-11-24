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
 * [Understanding changes to SDK compatibility](#understanding-changes-to-sdk-compatibility)
 * [Understanding changes to automatic environment attributes](#understanding-changes-to-automatic-environment-attributes)
## Overview
This topic explains the changes in the .NET (client-side) SDK 5.0 release and how to migrate to that version.
##### The .NET (client-side) SDK 5.0 release is currently in alpha.
**Version 5.0 contains breaking changes**. It introduces support for .NET 7 and MAUI, and drops support for Xamarin. As part of this change, the values of some [environment attributes](/docs/sdk/features/environment-attributes) have changed. You may need to adjust your flag targeting rules as a result.
## Understanding changes to SDK compatibility
You can continue to use the LaunchDarkly .NET (client-side) SDK version 5 in applications that can use Microsoft’s .NET Standard version 2.0 or higher, for example, console applications. You can also use it with MAUI, for example, for Android, Windows, and Mac applications.
If you use Xamarin, you cannot use version 5 of the LaunchDarkly .NET (client-side) SDK. You must migrate to MAUI to continue using the LaunchDarkly SDK. To learn more about migrating, read Microsoft’s documentation on how to [Upgrade from Xamarin to .NET](https://learn.microsoft.com/en-us/dotnet/maui/migration/?view=net-maui-8.0).
## Understanding changes to automatic environment attributes
When you upgrade your .NET (client-side) SDK to version 5, you should review your [flag targeting rules](/docs/home/flags/mobile-targeting) carefully. Some of the automatic environment attributes you may use in your targeting rules may have changed as part of the new SDK version.
If you enable automatic environment attributes during SDK initialization, LaunchDarkly automatically provides data about the environment where the application is running. This data makes it simpler to target your mobile customers based on application name or version, or on device characteristics including manufacturer, model, operating system, locale, and so on.
Here’s how:
.NET (client-side) SDK (C#)
```
1
| var config = Configuration
---|--- 
2
| .Builder("mobile-key-123abc", ConfigurationBuilder.AutoEnvAttributes.Enabled)
3
| .Build();
```
This data is provided in two context kinds, `ld_application` and `ld_device`. The SDK automatically adds this data to each evaluation context you provide. To learn more, read [Automatic environment attributes](/docs/sdk/features/environment-attributes).
When you upgrade from version 4 to version 5 of the LaunchDarkly .NET (client-side) SDK, the SDK returns different values for some of the attributes in the `ld_application` and `ld_device` contexts:
 * For Android, the `ld_device` attribute `os/name` now returns only the name. For example, the version 5 SDK returns `Android`, while the version 4 SDK returns `Android28` or similar. Use the `ld_device` attribute `os/version` to access the version information.
 * For iOS, the `ld_device` attribute `model` now returns model numbers in some cases. For example, the version 5 SDK returns `iPad5,2` or `iPhone10,3`, while the version 4 SDK returns `iPad` or `iPhone`.
 * For iOS, the `ld_application` attribute `name` is populated as follows:
 * `ld_application.name` returns the `name` that you set using [application metadata configuration](/docs/sdk/features/app-config) in the SDK, if any.
 * If that is not set, then the version 5 SDK returns the `CFBundleDisplayName` if defined. Otherwise, it returns the `CFBundleName`. This is a change in behavior. The version 4 SDK always returns the `CFBundleName`.
 * If that is not set, `ld_application.name` returns the LaunchDarkly SDK name and version.
These different context attribute values are because version 5 of the LaunchDarkly SDK uses .NET MAUI, while version 4 uses Xamarin Essentials.
To learn more about how the environment attributes are set, read [About the automatically added environment attributes](/docs/sdk/features/environment-attributes#about-the-automatically-added-environment-attributes).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs