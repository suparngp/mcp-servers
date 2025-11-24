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
 * [Prerequisites](#prerequisites)
 * [Concepts](#concepts)
 * [Targeting](#targeting)
 * [Permanent flags](#permanent-flags)
 * [Segments](#segments)
 * [Manage entitlements with feature flags](#manage-entitlements-with-feature-flags)
 * [Customize in-product experience for premium customers](#customize-in-product-experience-for-premium-customers)
 * [Rebrand software someone else built](#rebrand-software-someone-else-built)
 * [Customization and accessibility](#customization-and-accessibility)
 * [Localization](#localization)
 * [Best practices](#best-practices)
 * [Effective flag naming](#effective-flag-naming)
 * [Segments](#segments-1)
 * [Risks when using entitlement flags](#risks-when-using-entitlement-flags)
 * [Test plans and designs](#test-plans-and-designs)
 * [Learn more](#learn-more)
## Overview
This guide explains how you can use feature flags to create special access levels or variable experiences based on the customer type. Use this guide to understand how long-lived feature flags and precise flag targeting work together to ensure that every customer has access to the correct features. Providing different experiences for different customers based on context characteristics is referred to as “entitlement.”
Common use cases include:
 * Premium customers
 * Temporary privilege escalation
 * Localization
Conceptually, entitlement is a subset of flag targeting. It is meant to deliver a set of features to a designated segment or group of customers, whom you identify based on their customer type, location, or other criteria. The difference between targeting and entitlements is that entitlements are meant to be a permanent or long-lived targeting rule, whereas general flag targeting can be more temporary or flexible.
## Prerequisites
In order to complete this guide, you must have the following prerequisites:
 * You must know how to [create feature flags](/docs/home/flags/create)
 * You must know how to [configure flag targeting rules](/docs/home/flags/target)
## Concepts
This guide relies on the following concepts:
### Targeting
Targeting is when you use flag rules to determine which contexts or segments receive which variations of a flag. To learn more, read [Target with flags](/docs/home/flags/target).
### Permanent flags
Flags with no specified end date, or “permanent” flags, are part of the everyday operation of the application. They don’t have a determined lifespan, so you shouldn’t remove them as you would a temporary flag. In LaunchDarkly, you can designate a flag as either “temporary” or “permanent” when you create it. To learn more, read [Create a feature flag](/docs/home/flags/new#create-a-feature-flag).
### Segments
You can group a set of contexts that should consistently get the same behavior from the application into a segment. A segment might be end users in a certain geographic area, servers with a known IP address range, or members of an internal testing group.
Targeting a segment makes app behavior more repeatable and predictable. You can include test contexts in the segment to ensure the contexts are represented in test scenarios. To learn more, read [Segments](/docs/home/flags/segments).
## Manage entitlements with feature flags
This section explains how you can use feature flags to manage entitlements for different groups of contexts. You can use flag and rule targeting patterns to facilitate entitlements in several ways, depending on what your organization needs. We have described several of the most common below.
### Customize in-product experience for premium customers
Premium customers are the use case people think of most often when they think of entitlements. A premium customer has a different experience of the application or site than a standard customer. They might be notified about auctions sooner, have more editorial or posting rights, or receive fewer ads. Using a flag to identify a segment as premium customers saves you from the slightly-risky process of adding individual customers to a different permissions level in your application or site. If there is any breach or problem with access, you can remove either the customer or segment very quickly until the problem is resolved.
A “logged-in customer” is a special case of premium customer. Many sites, from e-commerce to newspapers to community sites, have a logged-in/account assumption, which is a kind of premium customer, even if it isn’t about money. A customer logs in to access the full site and the account they hold on it. In that sense, a logged-in customer is a premium customer who has more access than an anonymous customer.
### Rebrand software someone else built
If you use a small credit union or bank, a library website, or a health portal, you are probably using rebranded software. Your library or bank doesn’t have expertise in building a secure website that meets all the appropriate standards, and it’s not their core business. They contract with a provider who builds dozens or hundreds of these sites and rebrands them to have the appropriate appearance and connections.
This rebranding work is commonly managed by dozens or hundreds of release branches, one for each client. Developers create new code in the main branch and then merge it into the release branches, depending on what feature the customer is paying for. The website look and feel is also stored in the release branches. Managing updates across branches is sometimes difficult or risky.
With an entitlements flag, you can put the customizations behind a flag and turn the site features on and off according to what the customer is paying for. All of your code is in the main branch, and you don’t have to worry about making sure that it is ported to each branch. If there is a problem with a feature, you can turn it off for any or all of your customers until the problem is resolved, without having to touch each branch.
### Customization and accessibility
End users want to change their experience of their software to meet their own needs and use patterns. Some people find dark mode easier to read, other people prefer black-on-white text. Offering customization options for content, appearance, and accessibility gives end users more control over your software and lets them feel more comfortable.
It’s easy to imagine customization for appearances, things like light/dark mode, highlight colors, and font size. Customization can also include changing the type or frequency of notifications, changing the topics that are presented first, or accessibility options.
Building accessible applications and sites expands your potential audience. However, not all accessibility options are compatible with each other. For example, tab navigation and tablet navigation can have very different layout requirements. Using entitlements to enable customization for accessibility features lets your team perform more specific tests and allows end users to choose the options that work best for their needs.
### Localization
Localization is similar to rebranding, but sometimes there are localization needs that extend beyond appearance. For example, if you are localizing into a language that uses another alphabet or reads in a different direction, you may need to change text placement and sizes in a way that can cause bugs.
Localization can also involve respecting geographical restrictions of several kinds. These include:
 * Region-specific restrictions on data, such as those required by GDPR
 * Internet or data speed by region
 * Seasonal content that assumes all end users are in the same hemisphere
Wrapping geographically-specific content in feature flags allows you to target that content precisely to the people you want.
## Best practices
There are some standard best practices for entitlements-related feature flags. Managing flags across teams is especially important because entitlements flags are long-lived flags, and may outlast their creators.
Every organization has different needs, but we find that these practices generally help teams manage and create feature flags that are useful across time.
### Effective flag naming
Creating and using a flag naming convention saves your teams time and makes it easier for different parts of your organization to understand what other teams are working on.
For example, a good flag naming convention should convey:
 * The intended behavior and impact on the application when the flag serves a variation.
 * The scope and target of the behavior.
 * The purpose of the feature flag in both the **Flags** list and source code.
Poorly-named flags can result in the following consequences:
 * Unclear or ambiguous flag impact and intent. For example, does a flag named “Dark mode” turn on dark mode, or allow end users to choose dark mode?
 * Flags used for multiple purposes in an application by mistake.
 * Difficulty remembering and adhering to the naming convention.
 * Difficulty discovering and searching for flags from the **Flags** list.
For examples of flag naming conventions, read [Flag conventions](/docs/guides/flags/flag-conventions).
### Segments
You can add and remove individual targets to and from entitlement flags as needed, but depending on how often your customers change, this can be inefficient. Instead, consider the following strategies:
 * **Target rule-based or uploaded segments instead of individual contexts:** Targeting segments lets you move individual contexts in and out of segments as needed, eliminating the need to update individual flags. However, you still have to manually maintain the segment.
 * **Target synced segments:** If you use third-party applications, you can define a segment that automatically stays in sync with that external definition. This eliminates the need to update your segments manually. To learn more, read [Segments synced from external tools](/docs/home/flags/synced-segments).
 * **Target context attributes mapped to SAML attributes:** You can map SAML attribute values from your app to LaunchDarkly context attribute values, and then either target on those attributes, or target a segment that targets those attributes. SAML-defined attributes are dynamically generated and updated, which means you don’t have to manually track who your end users are and what level of entitlement and access they should have.
##### Synced segments are available to customers on select plans
Syncing segments with a third-party application is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Risks when using entitlement flags
Using entitlement flags can come with some risk. If your app can’t connect to LaunchDarkly, all of your end users will receive a single fallback variation that you specify in your SDK, rather than on the flag’s **Targeting** tab. This means that some of your end users could receive too much or too little access, or some other variation that’s not appropriate for all entitlement levels. To learn more, read [Evaluating flags](/docs/sdk/features/evaluating).
One option to help mitigate this risk is using the Relay Proxy in proxy mode with a persistent store. Using the Relay proxy in proxy mode with a persistent store provides the flag’s last known state to server-side apps when connectivity to LaunchDarkly is unavailable. To learn more, read [Using proxy mode](/docs/sdk/relay-proxy/sdk-config#using-proxy-mode) and [Caching guidelines](/docs/sdk/relay-proxy/guidelines#caching-guidelines).
## Test plans and designs
Entitlement flags are going to be a part of your code for the foreseeable future, so it’s important to build a plan for testing them and making sure that they remain healthy. We’ve found that it’s easy for long-lived flags to run so well and silently that the default values and fallback values may get stale.
Some best practices include:
 * Having alert-equipped test contexts in each segment
 * Writing test plans that include changing flag states and measuring the outcomes
 * Using monitoring and observability to ensure that contexts targeted by entitlement flags are getting the response times expected
 * Confirming that your test plan updates the default and fallback behavior of entitlement flags
## Learn more
This guide discussed concepts you can find in [Feature flag hierarchies](/docs/guides/flags/flag-hierarchy).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs