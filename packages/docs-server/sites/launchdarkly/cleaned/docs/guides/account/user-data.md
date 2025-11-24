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
 * [About end-user data](#about-end-user-data)
 * [How LaunchDarkly receives end-user data](#how-launchdarkly-receives-end-user-data)
 * [How LaunchDarkly handles end-user data](#how-launchdarkly-handles-end-user-data)
 * [Consider data requirements](#consider-data-requirements)
 * [How the LaunchDarkly SDK you use affects context data](#how-the-launchdarkly-sdk-you-use-affects-context-data)
 * [How end-user data can be accessed within LaunchDarkly](#how-end-user-data-can-be-accessed-within-launchdarkly)
 * [Account member access](#account-member-access)
 * [Multi-factor authentication](#multi-factor-authentication)
 * [Single sign-on](#single-sign-on)
 * [How to minimize end-user data sent to LaunchDarkly](#how-to-minimize-end-user-data-sent-to-launchdarkly)
 * [Use REPORT in the JavaScript SDK](#use-report-in-the-javascript-sdk)
 * [Evaluate flags against a Relay Proxy](#evaluate-flags-against-a-relay-proxy)
 * [Bootstrap flag values against a server-side SDK](#bootstrap-flag-values-against-a-server-side-sdk)
 * [Use private attributes](#use-private-attributes)
 * [Use anonymous contexts](#use-anonymous-contexts)
 * [Disable environment attributes on a mobile device](#disable-environment-attributes-on-a-mobile-device)
 * [Remove PII from LaunchDarkly](#remove-pii-from-launchdarkly)
 * [How end users can minimize the data they send to LaunchDarkly](#how-end-users-can-minimize-the-data-they-send-to-launchdarkly)
 * [Do Not Track](#do-not-track)
 * [Ad blockers](#ad-blockers)
## Overview
LaunchDarkly complies with some of the strictest privacy and security standards available today, including the European Union’s General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). It is SOC 2 Type II, ISO 27001, and ISO 27701 compliant, as well as FedRAMP Moderate Authority to Operate (ATO) rated. LaunchDarkly handles customer and end-user data in compliance with these standards.
Depending on your organization’s security and privacy requirements, you may need to further restrict what end-user data you send to LaunchDarkly. This guide helps you understand what end-user data LaunchDarkly can access, how you can restrict or eliminate that access, and what features we provide to help you minimize access.
If you’re an existing or potential customer of LaunchDarkly with questions about how we handle sensitive or third-party data, this guide is for you.
### About end-user data
End-user data is information about your customers that your product sends to LaunchDarkly as part of a context. This is different from information about your account members, who are part of your LaunchDarkly account.
End user data can include personally identifiable information (PII), including names, email addresses, or other unique identifiers, depending on how you define your [context kinds](/docs/home/flags/context-kinds). This data can be business-critical information and can present significant risk if exposed to unauthorized parties. To learn more about contexts, read [Contexts](/docs/home/flags/contexts).
If you are using one of LaunchDarkly’s mobile SDKs, end user data can optionally include environment attributes from the device that is running your app, including the application name and version, the operating system name and version, and the device model and manufacturer information.
## How LaunchDarkly receives end-user data
You configure the LaunchDarkly SDK to collect and transmit attributes from contexts to LaunchDarkly for the purpose of flag targeting.
When you evaluate a feature flag in your SDK, you must provide a context, which is a generalized way of referring to the people, services, machines, or other resources that encounter feature flags in your product. The context includes the [context kind](/docs/home/flags/context-kinds) and the values of any attributes for particular end users visiting your application.
To learn more about the built-in attributes LaunchDarkly suggests you collect, read [Built-in attributes](/docs/home/flags/built-in-attributes).
When you configure a mobile SDK, you must explicitly instruct the SDK whether or not to collect environment attributes data from the device. If you enable this collection, the data is included in the context. To learn more, read [Automatic environment attributes](/docs/sdk/features/environment-attributes).
LaunchDarkly SDKs do not store or have access to end-user data outside of what you provide in the contexts. For example, LaunchDarkly SDKs do not store cookies.
## How LaunchDarkly handles end-user data
This section discusses how LaunchDarkly receives, stores, and transmits end-user data.
### Consider data requirements
Every company has different types of data they collect and use for various purposes. Consider whether data is advantageous for your business to collect, and if any data exposes you to unwanted risk. For data that presents a risk, understand your requirements for handling that data. If you are collecting data, examine the methods you use to store it, and how long you want to keep it.
When you pass data through LaunchDarkly, consider whether the end users affected are protected by regional laws that restrict which data you can transmit or we can receive. You may wish to default to a more restrictive set of data transmitted and stored than is required by your home country in order to comply with relevant international laws.
LaunchDarkly is a multi-tenant platform. This means that, with some exceptions, LaunchDarkly stores data in the same place and uses the same application to respond to customer requests. Exceptions to this include certain large customers and customers who are members of the United States federal government. Multi-tenant software has a broader security footprint because more people access the same database than they would in a single-tenant instance.
You may want to restrict which data you send to LaunchDarkly because of this, although multi-tenant software architecture is very common and extremely low-risk. When you pass data to LaunchDarkly, it is never available to anyone to whom you have not granted permission, regardless of where it is stored.
Depending on the requirements of your organization, you may want to limit or completely restrict the data you send to LaunchDarkly.
### How the LaunchDarkly SDK you use affects context data
LaunchDarkly SDKs have different constraints that affect context data. Specifically, client-side SDKs differ from server-side SDKs in the following ways:
 * Each flag that you want client-side or mobile SDKs to evaluate must be explicitly available to them. To do this, select the toggles in the “Advanced controls” section of the flag’s right sidebar. LaunchDarkly accounts created after October 21, 2025 have this box checked by default. To learn more, read [Client-side ID](/docs/sdk/concepts/client-side-server-side#client-side-id).
 * By default, client-side SDKs aren’t authenticated. Because of this, one end user could use another end user’s account to evaluate flags not meant for them. To authenticate context data, you can enable the SDK’s secure mode, which requires you to pass a server-generated hash in each evaluation context. To learn more, read [Secure mode](/docs/sdk/features/secure-mode#configure-secure-mode-in-javascript-based-sdks).
 * Client-side SDKs send context data in the URL as a `GET` query parameter. If you are concerned about that data being stored in logs or by intermediary proxies, you can use the [`useReport`](/docs/sdk/features/context-config#javascript) setting to use the HTTP `REPORT` verb. This sends the evaluation context in the request body, rather than in the header. To learn more, read [Use REPORT in the JavaScript SDK](/docs/guides/account/user-data#use-report-in-the-javascript-sdk).
## How end-user data can be accessed within LaunchDarkly
This section discusses how members of your LaunchDarkly team may be able to access end-user data, depending on how your team is configured.
You can configure LaunchDarkly features to increase the security of your LaunchDarkly project. Some of these features are optional, but as a best practice we recommend using as many of these features as are available on your plan.
### Account member access
Every account member with a LaunchDarkly Viewer [project role](/docs/home/account/roles/project-roles) in your LaunchDarkly project can view context and flag information, including targeting data. Account members with LaunchDarkly Project Admin, Maintainer, or Developer [project roles](/docs/home/account/roles/project-roles), or with a base role of Writer, Admin, or Owner, can configure flag settings, including targeting flags by PII like end user email addresses. Consider if your organization needs to restrict which account members can control access to this data.
The exceptions to this are if an account member is assigned:
 * the LaunchDarkly Member [organization role](/docs/home/account/roles/organization-roles), and no project role, or
 * the No access base role, or
 * another role with the `viewProject` action set to `deny`.
The `viewProject` action controls a role holder’s access to an entire project by preventing or granting them viewing rights to the project. Viewing rights are required for any other permissions in a project to take effect, so restricting viewing rights effectively removes all access to the project.
To learn more, read [Roles](/docs/home/account/roles).
### Multi-factor authentication
Multi-factor authentication (MFA) requires you to use a second verification step in addition to your password to log in to a service, app, or website. You or an Administrator can enable MFA for your LaunchDarkly account.
To learn more, read [Multi-factor authentication](/docs/home/account/mfa).
### Single sign-on
Single sign-on (SSO) allows your team to authenticate with LaunchDarkly using the same identity provider (IdP) you use for your other internal and external services. LaunchDarkly supports both SAML and SCIM-based SSO.
To learn more, read [Single sign-on](/docs/home/account/sso).
## How to minimize end-user data sent to LaunchDarkly
LaunchDarkly does not have guardrails that prevent you from sending PII.
##### Increased privacy comes with tradeoffs
Further hardening the privacy of your LaunchDarkly projects may require some LaunchDarkly features to stop working or cause performance degradation.
Here are some additional configuration options you can use to increase end user privacy in LaunchDarkly. Using these features can impact certain features in the LaunchDarkly UI.
### Use REPORT in the JavaScript SDK
You can configure the JavaScript SDK to use the REPORT HTTP verb instead of GET. In this model, the REPORT verb forces evaluation contexts to be sent as request bodies instead of as path parameters. Path parameters are frequently logged and easy for proxies to observe, but request bodies are typically not logged or stored.
In addition, LaunchDarkly uses end-to-end encryption and all communication occurs over HTTPS. Unless a malicious third party breaks transport layer security (TLS) encryption, a man-in-the-middle attack is impossible.
Using the REPORT HTTP verb requires an additional option when configuring the JavaScript SDK.
Here is an example where the `useReport` parameter is enabled:
JavaScript
```
1
| const client = LDClient.initialize('client-side-id-123abc', context, options = {
---|--- 
2
| useReport: true
3
| });
```
### Evaluate flags against a Relay Proxy
The LaunchDarkly Relay Proxy provides mobile and client-side evaluation endpoints. You can initialize a client-side SDK directly against the Relay Proxy instead of connecting to LaunchDarkly.
The benefit of this approach is that the Relay Proxy runs within your own infrastructure, so no private data ever needs to leave the network. Additionally, the SDK functions in the same way that it would function in a standard environment, so you can still take advantage of LaunchDarkly’s streaming API and real-time updates to flag changes.
To learn more, read [The Relay Proxy](/docs/sdk/relay-proxy).
![A diagram showing a Relay Proxy's position in LaunchDarkly's network architecture.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/36bd149b8e7210f4bad88d75b3a6e11f10d9ff0b5c637b61a678c3affc994dd8/assets/images/__not_from_LD_app_UI/architecture-fdn-diagram-rp.png)
A diagram showing a Relay Proxy's position in LaunchDarkly's network architecture.
Here is an example configuration for the client:
JavaScript
```
1
| const client = LDClient.initialize(‘client-side-id-123abc’,
---|--- 
2
| context, options = {
3
| allAttributesPrivate: true,
4
| baseUrl: "https://your-relay-proxy.com:8030",
5
| streamUrl: "https://your-relay-proxy.com:8030"
6
| });
```
Here is an example configuration for the Relay Proxy:
Relay Proxy configuration
```
1
| [environment "production"]
---|--- 
2
| prefix = "acme:example:production" // added to database keys if you use a feature store
3
| sdkKey = "sdk-key-123abc" // your SDK key
4
| envId = "63056cdba4884310c8a9bc14" // your client-side ID
5
| allowedOrigin = "https://example.com" // accepted headers for CORS requests, comma-separated
```
To learn more, read the Relay Proxy GitHub repository’s [Configuration docs](https://github.com/launchdarkly/ld-relay/blob/v8/docs/configuration.md).
### Bootstrap flag values against a server-side SDK
Similar to using a Relay Proxy, you can get the initial payload for evaluation contexts from one of your own servers instead of reaching out to LaunchDarkly. This technique is referred to as bootstrapping. In this model, the evaluation context values are acquired from a server-side SDK instance while the JavaScript SDK initializes.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Configure your SDK: [Bootstrapping](/docs/sdk/features/bootstrapping)
### Use private attributes
You can use LaunchDarkly’s private attribute settings to restrict the context data your service sends to LaunchDarkly while still using that data for flag targeting. You can make all attributes private, choose specific attributes to make private, or make attributes private for specific context kinds.
To learn more, read [Using private context attributes](/docs/home/flags/private-context-attributes).
### Use anonymous contexts
Anonymous contexts do not register as context instances in your [**Contexts** list](/docs/home/flags/contexts-list), and so the usual data LaunchDarkly collects isn’t available for an anonymous context instance. You can use anonymous contexts to hide personally identifiable information (PII), but we recommend using private attributes instead. To specify that a context should not be indexed, set `anonymous` to `true`.
To learn more, read [Anonymous contexts](/docs/home/flags/anonymous-contexts).
Anonymous context instances and private attributes don't appear on the Contexts list
If you use anonymous contexts or private attributes, the **Contexts** list won’t populate with a complete list of context instances that accessed LaunchDarkly, and autocomplete for private attributes won’t function in LaunchDarkly.
### Disable environment attributes on a mobile device
When you configure a mobile SDK, you must explicitly instruct the SDK whether or not to collect environment attributes from the device, such as the application name and version, the operating system name and version, and the device model and manufacturer information. If you disable this collection, the data is not collected, is not included in the evaluation context, and will not appear on the **Contexts** list. To learn more, read [Automatic environment attributes](/docs/sdk/features/environment-attributes).
## Remove PII from LaunchDarkly
In the event that you accidentally send PII to LaunchDarkly, you should take the following steps to remove the information from LaunchDarkly:
 1. Revert the change or action you took that sent the data to LaunchDarkly.
 2. Find any context instances with exposed PII using the [search context instances API endpoint](/docs/api/contexts/search-context-instances).
 3. Delete the affected context instances from the **Contexts** list in one of two ways:
 * [using the user interface (UI)](/docs/home/flags/contexts-list#remove-a-context-instance), or
 * [using the API with the delete context instances endpoint](/docs/api/contexts/delete-context-instances). If you want to delete all context instances out of an environment, you can find them using the [search context instances API endpoint](/docs/api/contexts/search-context-instances).
Deleting context instances from the Contexts list does not impact flag evaluations
Flag evaluations are made based on the evaluation context you provide to the SDK, not what’s on the **Contexts** list. To learn more, read [Evaluating flags](/docs/sdk/features/evaluating).
These steps ensure that the PII no longer exists in LaunchDarkly. The PII attribute name will still appear in menu recommendations such as when you’re creating or modifying a targeting rule, but no data will appear if you have deleted all of the context instances with the exposed data. LaunchDarkly automatically cycles out unused attribute fields within 30 days. If you need the field deleted sooner, [start a Support ticket](https://support.launchdarkly.com/hc/en-us/requests/new).
## How end users can minimize the data they send to LaunchDarkly
When your product uses LaunchDarkly JavaScript SDKs, end users can minimize the data that they send to LaunchDarkly by configuring their browser to prevent sending analytics data.
This works because the JavaScript SDK sends data to the feature flag API (`app.launchdarkly.com`), the streaming API (`stream.launchdarkly.com`), and the analytics API (`events.launchdarkly.com`). End users can block the analytics API to reduce the amount of data they provide to LaunchDarkly, but the feature flag API and analytics API are necessary for LaunchDarkly to work.
### Do Not Track
Modern web browsers have Do Not Track (DNT) options that request websites, apps, and services not harvest end user data.
Individual end users can enable DNT in their browsers. LaunchDarkly complies with DNT requests and does not send analytics data when a browser has DNT enabled. To learn more, read [Browser privacy settings block analytic events to LaunchDarkly](https://support.launchdarkly.com/hc/en-us/articles/13689033183771-Browser-privacy-settings-block-analytic-events-to-LaunchDarkly).
### Ad blockers
If end users configure ad blockers in their browsers, they can prevent analytics information from being transmitted to LaunchDarkly. However, because ad blockers are third-party products, LaunchDarkly cannot control how they implement their restrictions.
If you use an ad blocker, some feature flags may not work because the ad blocker incorrectly blocks access to `app.launchdarkly.com` or `stream.launchdarkly.com` when it should only be blocking outbound connections to `events.launchdarkly.com`.
Although ad blockers often block LaunchDarkly analytics data, LaunchDarkly analytics data is not used for ad targeting or tracking. To learn more, read our [Privacy Policy](https://launchdarkly.com/policies/privacy/).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs