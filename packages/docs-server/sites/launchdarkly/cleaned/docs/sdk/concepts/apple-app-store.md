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
 * [Affected SDKs](#affected-sdks)
 * [Collection practices](#collection-practices)
 * [Contact info](#contact-info)
 * [Health and fitness](#health-and-fitness)
 * [Financial info](#financial-info)
 * [Location](#location)
 * [Sensitive info](#sensitive-info)
 * [Contacts](#contacts)
 * [End user content](#end-user-content)
 * [Browsing history](#browsing-history)
 * [Search history](#search-history)
 * [Identifiers](#identifiers)
 * [Purchases](#purchases)
 * [Usage data](#usage-data)
 * [Diagnostics](#diagnostics)
 * [Other data](#other-data)
 * [LaunchDarkly’s privacy policy](#launchdarklys-privacy-policy)
## Overview
This topic explains the implications of using a LaunchDarkly SDK in an app you submit to the Apple App Store.
Since December 2020, the Apple App Store requires apps you submit to provide information about their privacy practices, including the practices of third-party partners whose code is integrated into the app. If you integrate a LaunchDarkly SDK into your app and submit it to the Apple App Store, you must disclose which data LaunchDarkly collects. Before you submit your app to Apple, you may have questions about how Apple App Store reviewers treat your app’s use of LaunchDarkly.
Apple’s App Store policies and the actions of their reviewers are beyond our control or ability to predict. Apple has, in the past, raised concerns about code which is present in an app but which doesn’t seem to be reachable during testing. If you encounter this feedback, you may be able to resolve it by enabling all features for the app version being tested, allowing App Store reviewers to investigate your app, and then disabling unlaunched features before release.
We’re providing this topic to help facilitate the submission process. Read this topic to understand which SDKs are impacted by the Apple App Store’s policy and learn about what kind of data our SDKs collect.
To learn more, read [App privacy details on the App Store](https://developer.apple.com/app-store/app-privacy-details/).
## Affected SDKs
You can use these SDKs to build apps for Apple’s platforms:
 * [Client-side .NET](/docs/sdk/client-side/dotnet)
 * [Flutter](/docs/sdk/client-side/flutter)
 * [iOS](/docs/sdk/client-side/ios)
 * [React Native](/docs/sdk/client-side/react/react-native)
This topic applies to each of these SDKs unless otherwise specified.
To learn more about how Apple uses the below data types, read [Apple’s documentation](https://developer.apple.com/app-store/app-privacy-details/#data-type).
## Collection practices
The tables below summarize the data that LaunchDarkly SDKs collect by default. These tables do _not_ include optional fields you can provide when you use an SDK.
### Contact info
This table explains the contact information LaunchDarkly SDKs collect by default:
Data type | Collection practice | Details 
---|---|--- 
Name | Not collected by default. | 
Email address | Not collected by default. | 
Phone number | Not collected by default. | 
Physical address | Not collected by default. | 
Other end user contact info | Not collected by default. | 
### Health and fitness
This table explains the personal health and fitness information LaunchDarkly SDKs collect by default:
Data type | Collection practice | Details 
---|---|--- 
Health | Not collected by default. | 
Fitness | Not collected by default. | 
### Financial info
This table explains the financial information LaunchDarkly SDKs collect by default:
Data type | Collection practice | Details 
---|---|--- 
Payment info | Not collected by default. | 
Credit info | Not collected by default. | 
Other financial info | Not collected by default. | 
### Location
This table explains the location information LaunchDarkly SDKs collect by default:
Data type | Collection practice | Details 
---|---|--- 
Precise location | Not collected by default. | 
Coarse location | Not collected by default. | 
### Sensitive info
This table explains the sensitive information LaunchDarkly SDKs collect by default:
Data type | Collection practice | Details 
---|---|--- 
Sensitive info | Not collected by default. | 
### Contacts
This table explains the contacts information LaunchDarkly SDKs collect by default:
Data type | Collection practice | Details 
---|---|--- 
Contacts | Not collected by default. | 
### End user content
This table explains the end user content information LaunchDarkly SDKs collect by default:
Data type | Collection practice | Details 
---|---|--- 
Emails or text messages | Not collected by default. | 
Photos or videos | Not collected by default. | 
Audio data | Not collected by default. | 
Gameplay content | Not collected by default. | 
Customer support | Not collected by default. | 
Other end user content | Not collected by default. | 
### Browsing history
This table explains the browsing history LaunchDarkly SDKs collect by default:
Data type | Collection practice | Details 
---|---|--- 
Browsing history | Not collected by default. | 
### Search history
This table explains the search history LaunchDarkly SDKs collect by default:
Data type | Collection practice | Details 
---|---|--- 
Search history | Not collected by default. | 
### Identifiers
LaunchDarkly SDKs collect context IDs so you can target by individual contexts. While the SDKs require you to provide context IDs, your application code is responsible for defining them. To learn more, read your [SDK’s reference page](/docs/sdk).
This table explains the identifier information LaunchDarkly SDKs collect by default:
Data type | Collection practice | Details 
---|---|--- 
Context ID | LaunchDarkly collects a unique identifier, as provided by your application code, for each of your contexts. | 
 * This data is used for product personalization.
 * This data may be linked to a user context depending on how your application specifies context IDs.
Device ID | Not collected by default. | 
### Purchases
This table explains the purchase information LaunchDarkly SDKs collect by default:
Data type | Collection practice | Details 
---|---|--- 
Purchase history | Not collected by default. | 
### Usage data
LaunchDarkly collects details about flag evaluations. This data powers LaunchDarkly features such as flag statuses, flag evaluations graphs, and Experimentation.
You can opt out of publishing usage events to LaunchDarkly. To learn more about your SDK configuration options, read your [SDK’s reference page](/docs/sdk).
This table explains the usage data LaunchDarkly SDKs collect by default:
Data type | Collection practice | Details 
---|---|--- 
Product interaction | Not collected by default. | 
Advertising data | Not collected by default. | 
Other usage data | LaunchDarkly collects counters of flag evaluations. | 
 * This data is used for analytics.
 * This data is not linked to end users.
### Diagnostics
Versions 5.0.0 and later of the iOS SDK, and all versions of the Flutter SDK, publish diagnostics to LaunchDarkly. Older versions of the iOS SDK, and all versions of the React Native and client-side .NET SDKs, do not publish diagnostics to LaunchDarkly.
You can opt out of publishing diagnostics to LaunchDarkly. To learn more about your SDK configuration options, read your [SDK’s reference page](/docs/sdk).
This table explains the diagnostics information LaunchDarkly SDKs collect by default:
Data type | Collection practice | Details 
---|---|--- 
Crash data | Not collected by default. | 
Performance data | LaunchDarkly collects:
 * the duration taken to connect to LaunchDarkly’s streaming services, and
 * whether or not streaming connections are successfully established.
| 
 * This data is used for analytics.
 * This data is not linked to end users.
Other diagnostic data | LaunchDarkly collects:
 * parts of the SDK configuration,
 * high-level information about the underlying platform, operating system, and device type,
 * metrics about LaunchDarkly event processing, and
 * metrics about LaunchDarkly context indexing.
| 
 * This data is used for analytics.
 * This data is not linked to end users.
### Other data
LaunchDarkly’s mobile SDKs collect high-level information about devices and their operating systems so you can target on these attributes. You may disable this reporting if you do not want LaunchDarkly to collect this information. To learn more, read your [SDK’s reference page](/docs/sdk) and [Automatic environment attributes](/docs/sdk/features/environment-attributes).
This table explains the device and operating system information LaunchDarkly SDKs collect by default:
Data type | Collection practice | Details 
---|---|--- 
Other data types | Not collected by default. | 
Other data types | LaunchDarkly collects:
 * device model descriptors,
 * operating system names, and
 * operating system versions.
| 
 * This data is used for product personalization.
 * This data is linked to the context ID.
To learn more about how Apple uses these data types, read [Apple’s documentation](https://developer.apple.com/app-store/app-privacy-details/#data-type).
## LaunchDarkly’s privacy policy
We have a clearly written, transparent privacy policy that explains how we collect, disclose, and use member data.
To learn more, read our [Privacy policy](https://launchdarkly.com/policies/privacy/).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs