`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Guides](/docs/guides)
 * [Account management](/docs/guides/account)
 * [AI Configs](/docs/guides/ai-configs)
 * [Experimentation](/docs/guides/experimentation)
 * [Feature flags](/docs/guides/flags)
 * [Infrastructure](/docs/guides/infrastructure)
 * [Integrations](/docs/guides/integrations)
 * [Metrics](/docs/guides/metrics)
 * [SDKs](/docs/guides/sdk)
 * [Statistical methodology](/docs/guides/statistical-methodology)
 * [REST API](/docs/guides/api)
 * [Teams and custom roles](/docs/guides/teams-roles)
 * [Additional resources](/docs/guides/additional-resources)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Concepts](#concepts)
 * [Contexts](#contexts)
 * [Targeting](#targeting)
 * [Create applications](#create-applications)
 * [Application and environment information](#application-and-environment-information)
 * [Create flag targeting rules based on application information](#create-flag-targeting-rules-based-on-application-information)
 * [Example: Targeting mobile applications](#example-targeting-mobile-applications)
 * [Conclusion](#conclusion)
## Overview
This guide discusses best practices for defining applications in LaunchDarkly so that you can easily target specific apps and versions.
Within LaunchDarkly, an application is a resource that describes what you are delivering to a customer. LaunchDarkly automatically creates applications when it establishes a connection with a LaunchDarkly SDK that contains application information. After an application is created, you can build flag targeting rules based on application name, version, or other properties, such as whether or not a particular application version is supported. Together, these options help you streamline adoption, enable mobile feature flagging capabilities, and gracefully deprecate unsupported app versions. You can use LaunchDarkly to support all stages of the mobile application lifecycle.
This guide discusses how to create applications and use them in your flag targeting. Then, it provides an example of how this works in practice.
## Concepts
You should understand the following concepts before you read this guide.
### Contexts
A context is a generalized way of referring to the people, services, devices, or other resources that encounter feature flags in your product. When a flag evaluation occurs, LaunchDarkly uses the context attributes to determine what flag variation to serve. To learn more, read [Contexts](/docs/home/flags/contexts).
### Targeting
To target is to specify that LaunchDarkly should serve certain flag variations to specific contexts that encounter feature flags in your applications. You can create targeting rules to describe the set of contexts. To learn more, read [Target with flags](/docs/home/flags/target).
## Create applications
An application is a resource that describes what you are delivering to a customer.
There are two ways to create applications in LaunchDarkly:
 * The most common way to create applications is to use an SDK that supports application metadata. LaunchDarkly automatically creates an application when it establishes a connection with a LaunchDarkly SDK that contains application information. “Application metadata” refers to the set of application information you can specify in your SDK configuration. This includes an application identifier and name, and an application version and version name. To learn more, read [Application metadata configuration](/docs/sdk/features/app-config).
 * The other way to create applications is to use [Engineering insights](/docs/home/releases/eng-insights). As part of this feature suite, you can use the engineering insights deployment events API to send LaunchDarkly information about your deployments, including an application key. LaunchDarkly automatically creates an application for each unique application key it receives from any deployment event. To learn more, read [Send events from your deployment pipeline](/docs/home/releases/config-deployment#option-2-send-events-from-your-deployment-pipeline).
In addition to creating applications, LaunchDarkly also automatically creates application versions if you include version information when you use either of the above methods. After the application versions are created, you can mark application versions as “supported” or “unsupported.” For example, this allows you to consistently target all of the unsupported versions of your application, without needing to make updates to any segments or flag targeting when you deprecate a version.
To view or update your applications and application versions, click the **gear** icon in the left sidenav to view Organization settings. Then select **Applications**.
## Application and environment information
Your mobile targeting is not limited to just the name and key of the application and application version. LaunchDarkly mobile SDKs can also automatically provide additional data about each mobile application and the environment where it is running.
When you enable the collection of this data, LaunchDarkly automatically adds it to an `ld_application` context and an `ld_device` context. The mobile SDKs include both of these contexts in each flag evaluation. To learn more, read [Automatic environment attributes](/docs/sdk/features/environment-attributes).
To target mobile applications and devices you must both use a supported mobile SDK, and configure your SDK to enable collection of environment attributes.
After you create applications and enable the collection of mobile application and environment data, you have access to a wealth of information about your mobile apps. You can use this information in your flag targeting rules.
For each mobile application, the information you have available includes:
 * Application key
 * Application name
 * Application kind
 * Application version name
 * Application version key
 * Application version support status
The application kind is automatically set to `mobile`, `browser`, or `server`, depending on the kind of SDK that LaunchDarkly establishes a connection with when it creates the application. The values in the other application fields are set based on information you provide during your SDK configuration.
For each device, the information you have available includes:
 * Device manufacturer
 * Device model
 * Device operating system
To learn more about the specific `ld_application` and `ld_device` fields, read [About the automatically added environment attributes](/docs/sdk/features/environment-attributes#about-the-automatically-added-environment-attributes).
##### Ensure your application identifier is unique per distributed application
We recommend that you set the application identifier or key to a different value for each separately distributed software binary.
For example, suppose you have two mobile apps, one for iOS and one for Android. If you set the application identifier to “example-app” and the version to “1.0” in both SDKs, then when you create a flag targeting rule based only on application information, the flag will target both the iOS and Android application. This may not be what you intend.
We recommend using different application identifiers in this situation, for instance, by setting “example-app-ios” and “example-app-android” in your [application metadata configuration](/docs/sdk/features/app-config). Alternatively, you can create flag targeting rules based on a combination of the `ld_application` information and the `ld_device` information.
## Create flag targeting rules based on application information
If you are working with one or more mobile SDKs, have enabled collection of environment data, and have applications in your account, then you can add mobile targeting rules for your feature flag. After LaunchDarkly has evaluated flags for contexts with mobile application and environment information, the attributes from the `ld_application` and `ld_device` contexts are available when you create mobile targeting rules.
From your flag’s **Targeting** tab, create a mobile targeting rule. The template for each mobile rule includes clauses for applications and devices, and automatically recommends targeting based on version support status. You can adjust each mobile targeting rule as needed.
![The template for a new mobile rule on a flag.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/bc6d9c75236de21fdb691a74c4dbede3a9edf59cfe860d44d9a66bcfdcbd5bbd/assets/images/auto/targeting-tab-mobile-rule-empty.auto.png)
The template for a new mobile rule on a flag.
## Example: Targeting mobile applications
This section provides an example of how targeting mobile applications can work in practice.
Suppose you’re an application developer for a hospital chain, Global Health Services. Doctors and nurses use your application on various devices and in various locations. You would like to capture information about the application versions and mobile devices that your customers use, so that you can:
 * provide specific features based on location, device, job function, or other attributes
 * prompt your customers to upgrade their apps when needed, and
 * provide a gracefully degraded experience if they continue using unsupported app versions.
Here’s one way to approach this situation:
 1. **Configure your SDK**. Define some basic information about your application, and ask LaunchDarkly to capture details about the application and device that each customer is using.
Here’s how:
Example SDK setup, Android SDK (Java)Example SDK setup, iOS SDK (Swift)
```
1
| LDConfig config = new LDConfig.Builder(AutoEnvAttributes.Enabled)
---|--- 
2
| .applicationInfo(
3
| Components.applicationInfo()
4
| .applicationId("ghs-android-app")
5
| .applicationName("Global-Health-Services-App-for-Doctors")
6
| .applicationVersion("1.0.0")
7
| .applicationVersionName("v1")
8
| )
9
| .build();
```
To learn more, read [Application metadata configuration](/docs/sdk/features/app-config).
 2. **Publish your applications** to their respective app stores.
 3. **Create targeting rules** for the flags used in your application.
For example, you may want to enable an extra feature if the device model includes “Pixel”:
![A mobile targeting rule using device model information.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/36624d2e383553e3fc8d5aa0f0d38377d621beaf5f9934ef0963ed61f8233068/assets/images/auto/guide-mobile-targeting-pixel.auto.png)
A mobile targeting rule using device model information.
As another example, you may want to show a splash screen advising customers to upgrade to the latest version if their application version is unsupported:
![A mobile targeting rule using the application version support status.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/4f884f933500085a05453647aa78e452c6da0b7ab5d72b530be459f757e54c4d/assets/images/auto/guide-unsupported-app-targeting.auto.png)
A mobile targeting rule using the application version support status.
To learn more, read [Mobile targeting](/docs/home/flags/mobile-targeting).
 4. **Continue development on your application**. For each new version, remember to update the application information in your SDK configuration:
Example SDK updated setup, Android SDK (Java)Example SDK updated setup, iOS SDK (Swift)
```
1
| // SDK setup for version 1.3
---|--- 
2
| LDConfig config = new LDConfig.Builder(AutoEnvAttributes.Enabled)
3
| .applicationInfo(
4
| Components.applicationInfo()
5
| .applicationId("ghs-android-app")
6
| .applicationName("Global-Health-Services-App-for-Doctors")
7
| .applicationVersion("1.3.0")
8
| .applicationVersionName("v1")
9
| )
10
| .build();
11
| 
12
| // SDK setup for version 2
13
| LDConfig config = new LDConfig.Builder(AutoEnvAttributes.Enabled)
14
| .applicationInfo(
15
| Components.applicationInfo()
16
| .applicationId("ghs-android-app")
17
| .applicationName("Global-Health-Services-App-for-Doctors")
18
| .applicationVersion("2.0.0")
19
| .applicationVersionName("v2")
20
| )
21
| .build();
```
 5. **Review your application usage**.
To view your applications, click the **gear** icon in the left sidenav to view Organization settings. Then select **Applications**. Click the name of the application you’re interested in. The application’s **Versions** tab appears. From the **Versions** tab, you can review details on the devices using your application, and review the adoption of your application by application version.
![The "Versions" tab for an application.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/f0bc7d025a942f7981d9a0e0bba50734429a64af11758d14d2c4697fa9b4a0dc/assets/images/auto/application-versions-tab.auto.png)
The "Versions" tab for an application.
To learn more read, [View applications and application versions](/docs/home/releases/apps-and-app-versions#view-applications-and-application-versions).
 6. **Clean up older versions**.
When you decide that version 2 of your application has been released for a sufficient period of time, you can mark version 1 of your application as unsupported. Any targeting rules that you have for unsupported versions will now automatically match v1. You don’t have to adjust any targeting rules for flags or segments. To learn more, read [Edit application versions](/docs/home/releases/app-versions#edit-application-versions).
If you have feature flags that are only used in v1 of your app, now is a good time to deprecate them. Deprecating a flag hides it from the live **Flags** list without archiving or deleting it. You can restore a deprecated flag if you need it, or find it to reference or update its configuration later. Deprecating flags can simplify your **Flags** list, especially in situations where you have a long tail of customers using older versions of your applications. To learn more, read [Deprecating flags](/docs/home/flags/deprecate).
## Conclusion
With applications, you can easily target specific app versions based on application, device, or version support status. This guide described how to create applications and use them in your flag targeting. Then, it provided an example of how this works in practice.
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs