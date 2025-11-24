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
 * [Flag longevity](#flag-longevity)
 * [Experimentation](#experimentation)
 * [Determine your flag’s use case](#determine-your-flags-use-case)
 * [Release flags](#release-flags)
 * [Kill switch flags](#kill-switch-flags)
 * [Experiment flags](#experiment-flags)
 * [Migration flags](#migration-flags)
 * [Operational flags](#operational-flags)
 * [Entitlement flags](#entitlement-flags)
 * [Considering flag dependencies](#considering-flag-dependencies)
 * [Setting flag identifiers](#setting-flag-identifiers)
 * [Create a flag naming convention](#create-a-flag-naming-convention)
 * [Write effective flag descriptions](#write-effective-flag-descriptions)
 * [Assign tags to your flag](#assign-tags-to-your-flag)
 * [Use flag variations](#use-flag-variations)
 * [Flag default values](#flag-default-values)
 * [Set client-side visibility](#set-client-side-visibility)
 * [When not to use flags](#when-not-to-use-flags)
 * [Conclusion](#conclusion)
## Overview
This guide explains the best practices for creating feature flags in LaunchDarkly.
The purpose of this guide is to help you create flags that fit your current and future needs the first time, rather than needing to revise flag behaviors later. The better-defined the flag is, the easier it is to create. Effective flags help your team move faster.
Best practices around feature flags are always evolving. The suggestions below are best practices and advice rather than firm rules for how to use feature flags.
## Concepts
You should understand the following concepts before you read this guide.
### Flag longevity
Flags can be either temporary or permanent. You should create a temporary flag when you know you can remove it after a feature is fully deployed or the flag is no longer needed. Temporary flags can include flags used for experimentation, rollout, testing, and feature releases. Permanent flags are a part of regular software operations and architecture. When you create a permanent flag, you do not plan to remove it.
Every flag has a toggle in its right sidebar that identifies whether the flag is temporary or permanent. To learn more, read [Creating new flags](/docs/home/flags/new).
### Experimentation
An experiment is a set of actions used to test a hypothesis. You can use feature flags to send flag variations to different portions of your user base, and compare their different reactions. You can use this for A/B/n testing, acceptance testing, and stress testing. To learn more, read [Experimentation](/docs/home/experimentation).
## Determine your flag’s use case
Most flags fall into a specific category. These categories are:
 * [Release flags](/docs/guides/flags/creating-flags#release-flags): You can use release flags to manage incremental feature rollouts. You typically remove a release flag when its context targeting reaches 100%.
 * [Kill switch flags](/docs/guides/flags/creating-flags#kill-switch-flags): You can use kill switch flags as emergency shutoff flags, or “circuit breakers.” These flags are usually permanent.
 * [Experiment flags](/docs/guides/flags/creating-flags#experiment-flags): You can use flags for running experiments. You typically remove a flag used in an experiment when the experiment is done.
 * [Migration flags](/docs/guides/flags/creating-flags#migration-flags): You can use flags to migrate data or systems while keeping your application available and disruption free. You typically remove a migration flag when the migration is complete.
 * Custom flags: You can use custom flags for other use cases, or highly specified needs that aren’t covered by another category. Some examples include:
 * [Operational flags](/docs/guides/flags/creating-flags#operational-flags) are long-lived configuration flags that control the behavior of an application, such as showing the visibility of a component. Operational flags are usually permanent.
 * [Entitlement flags](/docs/guides/flags/creating-flags#entitlement-flags) manage permissions using long-term targeting. Entitlement flags are usually permanent.
Before you create a feature flag, answer these questions to determine what kind of flag you need:
 * Will this flag manage a code or feature release, experiment, customer permissions, or operations?
 * What relationship will this flag have to any other flags?
 * What is the smallest thing this flag can do to be useful?
 * Will this flag still be useful after the new code is fully and successfully released?
 * Is this a temporary or long-lived flag?
 * What are this flag’s default values?
Answering these questions will help you determine how you name and describe the flag, and whether you need to plan for the flag’s removal after you are no longer using it. To learn more, read [Creating a flag naming convention](/docs/guides/flags/creating-flags#create-a-flag-naming-convention).
### Release flags
You can wrap a flag around code for a new or improved feature, and use it to release the new feature to contexts in increments. Release flags are almost always boolean with `true` or `false` variations that represent whether the new code is enabled.
Release flags are temporary. After you verify the new code is stable and roll out the feature to 100% of contexts, you should archive the flag. To learn more, read [Percentage rollouts](/docs/home/releases/percentage-rollouts).
### Kill switch flags
Kill switch flags control or change how your app or service operates. Often, these changes happen in response to unplanned events, such as traffic spikes or third-party service failures. You can integrate kill switch flags with observability or application performance management (APM) tools to automate flag shut off. To learn how, read [Observability tools](/docs/integrations/observability).
Kill switch flags are usually permanent.
### Experiment flags
Experiment flags are similar to release flags in that they wrap around feature code that impacts end users. However, experiment flags can be either boolean or multivariate, so that the experiment can test multiple values. You can pair flags with metrics to compare context or system behavior between two or more flag variations.
Experiment flags are temporary. After you ship the winning variation for an experiment, you should archive the flag. To learn more, read [Experimentation](/docs/home/experimentation).
### Migration flags
Migration flags are temporary flags you can use to migrate data or systems while keeping your application available and disruption free. Migration flags break the transition from an old to a new implementation into a series of two to six stages. Migration flags also let you split traffic across two or more cohorts.
Migration flags are temporary. After you complete the migration, you should archive the flag. To learn more, read [Migration flags](/docs/home/flags/migration).
### Operational flags
Operational flags are long-lived configuration flags that control the behavior of an application, such as showing the visibility of a component for a subset of end users like informational banners, alerts, and offers. These kinds of operational flags must be side effect-free and safe to turn on and off for any end user.
Operational flags are usually permanent.
### Entitlement flags
Entitlement flags control access to certain features or areas of your product. For example, a flag might wrap around a feature that is only accessible by customers with a certain role or membership tier.
Entitlement flags are usually permanent.
## Considering flag dependencies
You can create flags with dependencies on other flags. Flags can depend on other flags being true or false, or on the features controlled by different flags.
If you have two related flags, ask yourself if one flag should be a prerequisite for the other. For example, do you want your new flag to show a variation only if the “New login screen” flag’s targeting is on? To learn more, read [Flag prerequisites](/docs/home/flags/prereqs).
Keep the scope of a flag as small as possible. Each flag should only do one thing. Both the code and the effects triggered by the flag changes, such as integrations and webhooks, should be small. Many small flags help prevent unintended impacts from flag targeting. Consider if your flag could actually be two flags with smaller scopes.
## Setting flag identifiers
Flags have two identifiers:
 * The flag **name** : Flag names only appear on the **Flags** list, above the flag’s description and near other useful details about the flag.
 * The flag **key** : This is how your flag is represented in LaunchDarkly’s code. Keys are the only identifier used in code, and that code usually has no other details about the flag.
You specify both of these identifiers when you create a flag for the first time.
### Create a flag naming convention
You are likely to make many more flags in the future, and it helps to name them consistently. The best way to write comprehensible names is to use conventions for flag names and flag keys.
Your conventions should address:
 * Which flag attributes make up the flag name and flag key
 * How those components should be phrased and formatted
 * How they should be ordered
Many organizations have a naming style guide as part of their coding style guide. We recommend using descriptive naming conventions that include information about the flag’s purpose and intent.
Some useful facts to include in a flag name are:
 * Which feature it relates to
 * The intent behind the flag
 * The effect of changing its value
 * Where that effect happens, such as the interface element or page affected
By default, flag keys match flag names with minor adjustments for spaces or special characters. LaunchDarkly can enforce flag key conventions for you, which can help you standardize flags across your projects. For example, you can specify whether your flag keys should use camel case, Pascal case, snake case, or kebab case, and whether your flag keys require a specific prefix.
To learn more, read [Flag conventions](/docs/guides/flags/flag-conventions).
### Write effective flag descriptions
Write short flag descriptions. They should be no longer than a sentence or two.
Don’t repeat any information already present in the flag’s name. Instead, focus on other things you want your teammates to know about this flag, such as:
 * What enabling targeting will do
 * What side effects it may cause
 * Who is responsible for this flag
 * When you can remove the flag
You can format flag descriptions using Markdown and include in-line Confluence links.
### Assign tags to your flag
The **Flags** list has controls for filtering and sorting flags by different major attributes. You can also create tags for flags you want to find quickly.
Tags are useful for grouping flags by particular details. For example, if there’s a set of long-lived flags that are specifically intended for operational use, you can tag them with `operational`. If you have flags that have special targeting for contexts in Belgium, you can tag them `belgium`. To learn more, read [Tags](/docs/home/account/tags).
You can also use tags to control which account members can modify flags. To learn more, read [Tags in role policies](/docs/home/account/roles/role-tags#tags-in-role-policies).
Try to reuse existing tags as much as possible. This streamlines the **Flags** list and makes it easier to find things later.
## Use flag variations
Most flags are boolean with two variations: `true` and `false`. However, you can use multivariate flags that evaluate different values, like strings or numbers, when you need to do more complex operations. You can add more variations to a multivariate flag at any time.
For example, imagine some of your customers need to be charged sales tax for a purchase. If they are charged, the tax is 7%. If they are not charged, it is zero. You could make a boolean flag that determines whether or not tax is applied by assigning the tax to `true` or `false` states.
However, there is an opportunity to add more complexity later if you use a multivariate flag and assign the flag variations to the numbers `7` and `0`. If the tax rate later changes, you can update the tax percentage charged by the app without changing your code. Alternatively, you could make more variations of the same flag that address other tax rates used in different regions, and use targeting rules to automatically return the customer’s correct tax rate.
### Flag default values
Your default values are the starting variations of the flag. For most flags, the default variation for a feature is `off`. In some cases, like when you want to deprecate a feature, you can set the default variation to `on`, where `on` is `false`, because the feature is already running. You would then set the `off` variation to `true`.
### Set client-side visibility
LaunchDarkly SDKs are divided into two types:
 * client-side, and
 * server-side
Client-side SDKs evaluate flags differently than server-side SDKs, because client-side SDKs may connect to and serve insecure or public devices. It is important to understand the security impact of making flags available on the client side. To learn more, read [Choosing an SDK type](/docs/sdk/concepts/client-side-server-side).
You can make new flags available to client-side and mobile SDKs from the “Create a feature flag” panel. To learn how, read [Make flags available to client-side and mobile SDKs](/docs/home/flags/new#make-flags-available-to-client-side-and-mobile-sdks).
For existing flags, you can make flags available to client-side and mobile SDKs from the flag’s right sidebar.
## When not to use flags
Feature flags are not appropriate for every change you make to your codebase.
We recommend against using flags in the following scenarios:
 * As a replacement for secrets management, or for targeting on secrets or credentials.
 * As a replacement for configuration management.
 * Don’t use feature flags with configuration that is static or rarely changes. Only use flags for this type of configuration if you need an emergency shut-off switch.
 * Don’t use feature flags on configuration that, if disabled, would completely block the application from starting. For example, a database hostname or API URLs.
 * As a database or file store. Instead, keep variations small and avoid complex JSON payloads where possible. Consider breaking up complex flags into smaller individual flags.
 * For every commit, sprint, or other small change. Flagging very small changes is usually not worth the cost of flag upkeep. Instead, wrap features as a whole.
## Conclusion
In this guide, you have learned about:
 * Flag naming standards
 * Flag categories
 * The difference between temporary and long-lived flags
 * Default flag variations
To learn more, continue reading our guides on [Feature flags](/docs/guides/flags).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs