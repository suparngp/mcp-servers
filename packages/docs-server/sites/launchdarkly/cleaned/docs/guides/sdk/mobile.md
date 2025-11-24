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
 * [Avoiding app startup delays](#avoiding-app-startup-delays)
 * [Initializing asynchronously on specific platforms](#initializing-asynchronously-on-specific-platforms)
 * [.NET (client-side) initialization process](#net-client-side-initialization-process)
 * [Android initialization process](#android-initialization-process)
 * [iOS initialization process](#ios-initialization-process)
 * [React Native initialization process](#react-native-initialization-process)
 * [Deciding on the customer experience for flag changes](#deciding-on-the-customer-experience-for-flag-changes)
 * [Ensuring delivery of analytics events](#ensuring-delivery-of-analytics-events)
 * [Targeting the app version number, OS, and device when enabling new features](#targeting-the-app-version-number-os-and-device-when-enabling-new-features)
 * [Understanding SDK size and usage](#understanding-sdk-size-and-usage)
 * [Preparing for Apple App Store reviews](#preparing-for-apple-app-store-reviews)
## Overview
This guide explores some best practices for using LaunchDarkly’s mobile SDKs.
Mobile app development contains plenty of challenges. Your app will face wildly variable conditions, including many different devices and runtime environments, and unstable data connections. We’ve done our best to provide robust and efficient performance in our mobile SDKs. In addition, we provide these recommendations to improve the quality of your customers’ experience.
## Avoiding app startup delays
Every millisecond counts during app launch. Your app is likely to initialize many different components before presenting a live interface to the customer. The LaunchDarkly SDK is one of them.
When initializing, the LaunchDarkly SDK attempts these steps:
 1. Open a network connection to the feature server
 2. Download relevant flag data
 3. If the SDK has cached flag data from a previous session, then trigger event handlers for flags that have changed since they were cached
To avoid delays caused by LaunchDarkly connection setup, initialize the `LDClient` object **asynchronously** so that it doesn’t block other code from executing.
## Initializing asynchronously on specific platforms
The asynchronous initialization process is different for each SDK.
### .NET (client-side) initialization process
We recommend using `LdClient.InitAsync(key, context, timeout)` to initialize the SDK, as it runs asynchronously.
The alternative method, `LdClient.Init(key, context, timeout)` blocks until either it has retrieved flag data or it has exceeded the timeout period.
To learn more, read [Get started](/docs/sdk/client-side/dotnet#get-started) in the [.NET (client-side) SDK reference](/docs/sdk/client-side/dotnet) topic.
### Android initialization process
The Android SDK’s `LDClient.init()` method takes, as its fourth parameter, a timeout integer which specifies the maximum number of seconds the SDK can wait for a response from the server.
Depending on how `init()` is called, the SDK may block the current thread until either the flags are retrieved or the timeout period is exceeded. If `init()` is called in the main app thread, the rest of the app startup will be blocked until this call completes, resulting in poor customer experience.
To ensure that `LDClient.init()` doesn’t block the rest of the app we recommend providing `init()` a timeout value of `0`. The `init()` method returns an `LDClient` immediately but continues creating the connection in the background. If cached flag data is available from a previous execution, any invocation of a [`variation()`](/docs/sdk/features/evaluating#android) method will use that cached data until the SDK receives fresh data. Otherwise, it will use the fallback value specified in the invocation. You can also use [change listeners](/docs/sdk/features/flag-changes#android) to respond when the SDK updates the flag cache.
To learn more, read [Get started](/docs/sdk/client-side/android#get-started) in the [Android SDK reference](/docs/sdk/client-side/android) topic.
### iOS initialization process
`LDClient.start()` always executes asynchronously, to avoid blocking the main thread.
To execute code as soon as flags have been retrieved, you can provide an optional `completion` handler to `start()`.
To execute code either as soon as flags have been retrieved, or after a set amount of time, whichever comes first, you can also provide a `startWaitSeconds` timeout value to `start()`. This sets a maximum waiting period for establishing the connection. We recommend using a timeout of five seconds or fewer. The SDK provides a `timedOut` boolean to the `completion` closure, indicating whether the connection timed out.
To learn more, read [Get started](/docs/sdk/client-side/ios#get-started) in the [iOS SDK reference](/docs/sdk/client-side/ios) topic.
### React Native initialization process
In version 10 of the React Native SDK, you create a shared instance of `ReactNativeLDClient`, and then identify a context. For example, you may call `identify()` on application mount. End users will receive fallback values until you specify a context by calling `identify()`. The `identify` timeout defaults to five seconds.
If you are using older versions of the React Native SDK, the `LDClient.configure()` method takes, as an optional third parameter, a timeout number, and blocks until either it has retrieved flag data or it has exceeded the timeout period. We recommend setting this timeout to five seconds or fewer.
To learn more, read [Get started](/docs/sdk/client-side/react/react-native#get-started) in the [React Native SDK reference](/docs/sdk/client-side/react/react-native) topic.
## Deciding on the customer experience for flag changes
LaunchDarkly delivers flag updates to your app as soon as possible. This is great for ensuring that flag evaluations are up to date with the current flag settings, but may cause problems depending on how the flag is used. For example, consider a user interface (UI) configured by flags. If the flags change in the middle of a customer’s session, the customer may be confused or alarmed by the interface changing without warning.
For each flag used by your app, decide on a policy for how updates to the flag should be handled while the app is running. You may want to ignore updates to certain flags if they happen in the middle of a customer session, whereas other flags, such as circuit breakers, should update immediately.
These policies can be implemented as wrapper methods around the LaunchDarkly SDK, rather than configuration changes to the SDK itself.
## Ensuring delivery of analytics events
The SDK communicates evaluation and diagnostic data back to the server as part of normal usage. The LaunchDarkly UI displays this data in several places, including the [**Flags** list](/docs/home/flags/list), the [flag evaluations graph](/docs/home/releases/flag-evaluations), and in [Experimentation](/docs/home/experimentation).
This data is generated by the SDK and added to an event buffer. The SDK clears the buffer and sends the data back to LaunchDarkly periodically, every few seconds. To ensure that the client delivers any pending analytics to LaunchDarkly, we recommend shutting down the client properly when your application is about to terminate.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Try it in your SDK: [Shutting down](/docs/sdk/features/shutdown)
In some situations, such as when you test out the SDK in a simulator, you may want to manually flush the event buffer to request any queued events be sent immediately.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Try it in your SDK: [Flushing events](/docs/sdk/features/flush)
To learn more about the events SDKs send to LaunchDarkly, read [Analytics events](/docs/sdk/concepts/events).
## Targeting the app version number, OS, and device when enabling new features
In newer versions of LaunchDarkly’s mobile SDKs, the SDK can automatically provide data about the mobile environment where the application is running. This data makes it simpler to target your mobile customers based on application name or version, operating system name and version, and device model and manufacturer information. We recommend enabling this feature when you configure the SDK.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Configure your SDK: [Automatic environment attributes](/docs/sdk/features/environment-attributes)
If you are working with older versions of LaunchDarkly’s mobile SDKs, we recommend manually creating a “device” context kind to track information about each end user’s operating system and hardware, such as operating system and device, so that it’s easier to target specific configurations. To learn more, read [Context kinds](/docs/home/flags/context-kinds). Additionally, we recommend that your code set the application version.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Configure your SDK: [Application metadata configuration](/docs/sdk/features/app-config)
No matter how this data is collected, this combination of attributes is particularly useful for targeting the release of new features. For example, consider a “dark mode” feature being added to an app. Versions 10 through 14 contain early, incomplete versions of the feature. These versions are available to all customers, but the “dark mode” feature is only enabled for testers. With version 15, the feature is considered complete. You can use targeting rules to enable “dark mode” for all customers who are using version 15 or greater, and ensure that customers on previous versions don’t use the earlier, unfinished version of the feature.
Including the app version number in your SDK configuration makes it possible for you to add a flag rule which targets that version. This is also useful for situations when you must disable a feature due to code issues, which you then fix in a later release. By targeting the app version, you can re-enable the feature only for those customers running the corrected code.
## Understanding SDK size and usage
SDK size depends on the platform, SDK, SDK version, and platform-specific dependencies you are using. We try to keep our SDKs small, though on some platforms they introduce some larger dependencies. In practice, they’re likely to be one of the smaller dependencies in your app.
Our mobile SDKs consume resources differently depending on whether the host app is running in the foreground or background.
When running in the foreground, the SDK maintains a persistent HTTPS connection to LaunchDarkly. When a flag changes, LaunchDarkly uses the Server-Sent Events (SSE) protocol to notify the app of changes. The alternative method of receiving updates is for the SDK to poll the LaunchDarkly service with regular short requests.
Most evidence shows that when appropriately configured, persistent HTTPS connections result in longer battery life than polling for our connection and data transfer patterns. [A 2013 study](http://kth.diva-portal.org/smash/record.jsf?pid=diva2%3A874674&dswid=-8201) showed that an open SSE connection with low-frequency event updates (under 120 seconds) and heartbeats had negligible impact on battery life.
## Preparing for Apple App Store reviews
Many customers submit an app to be reviewed by Apple for inclusion in the App Store. You may have questions about how Apple App Store reviewers treat your app’s use of LaunchDarkly.
Apple’s App Store policies and the actions of their reviewers are beyond our control or ability to predict. Apple has, in the past, raised concerns about code which is present in an app but which doesn’t seem to be reachable during testing. If you encounter this feedback, you may be able to resolve it by enabling all features for the app version being tested, allowing App Store reviewers to investigate your app, and then disabling unlaunched features before release.
Since December 2020, the Apple App Store has required apps you submit to provide information about their privacy practices, including the practices of third-party partners whose code is integrated into the app. If you integrate a LaunchDarkly SDK into your app and submit it to the Apple App Store, you must disclose which data LaunchDarkly collects. To learn more about the data which LaunchDarkly may collect, read [Apple App Store data collection policy](/docs/sdk/concepts/apple-app-store).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs