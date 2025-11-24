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
 * [Temporary and operational flags](#temporary-and-operational-flags)
 * [Flag links](#flag-links)
 * [Tags](#tags)
 * [Why create a flag naming convention?](#why-create-a-flag-naming-convention)
 * [Get started](#get-started)
 * [Flag kinds](#flag-kinds)
 * [Consider shared architecture](#consider-shared-architecture)
 * [The components of a flag name](#the-components-of-a-flag-name)
 * [Flag key conventions](#flag-key-conventions)
 * [Flag templates](#flag-templates)
 * [Flag kind examples](#flag-kind-examples)
 * [Release flags](#release-flags)
 * [Kill switch flags](#kill-switch-flags)
 * [Experiment flags](#experiment-flags)
 * [Migration flags](#migration-flags)
 * [Operational flags](#operational-flags)
 * [Operational show flags](#operational-show-flags)
 * [Entitlement flags](#entitlement-flags)
 * [Managing flag keys](#managing-flag-keys)
 * [Effective flag descriptions](#effective-flag-descriptions)
 * [Tags](#tags-1)
 * [Flag variation names](#flag-variation-names)
 * [Practices to avoid](#practices-to-avoid)
 * [Avoid including ticket or sprint numbers in the flag name](#avoid-including-ticket-or-sprint-numbers-in-the-flag-name)
 * [Avoid including team or work group names in the flag name](#avoid-including-team-or-work-group-names-in-the-flag-name)
 * [Avoid using machine-generated names](#avoid-using-machine-generated-names)
 * [Conclusion](#conclusion)
## Overview
This guide explains best practices for creating conventions around flag names, keys, and templates. It describes how LaunchDarkly can help you enforce your conventions.
We recommend using a flag naming convention that gives your organization’s members an intuitive sense of the purpose and scope of a flag. Members should know what behavior the flag controls and how it will change just by looking at the flag name and its variations. Creating a comprehensive and well-documented naming convention requires some initial effort, but results in members being able to quickly and easily find flags, name flags, and understand their purposes.
We also recommend using a flag key convention to match your organization’s coding standards. For example, LaunchDarkly can help you enforce specific casing for your flag keys.
## Concepts
You should understand the following concepts before you read this guide:
### Temporary and operational flags
Most feature flags fall into one of two main categories: temporary or operational.
You can wrap a temporary flag around code for a new or improved feature, and use it to release the feature to customers all at once or in increments. After you verify the new code is stable and roll out the feature to 100% of customers, you should delete the temporary flag. To learn more about rollouts, read [Percentage rollouts](/docs/home/releases/percentage-rollouts).
Operational flags control or change how your app or service operates. Often, these changes happen in response to unplanned events, such as traffic spikes or third-party service failures. You can integrate operational flags with application performance management (APM) tools to automate flag shut off. Operational flags are usually permanent. To learn more about using operational flags with observability tools, read [Observability tools](/docs/integrations/observability).
### Flag links
You can use flag links to view external mentions of flags from other tools and services. Links to external flag references allow you to collaborate more easily and quickly review relevant flag contexts. To learn more, read [Flag links](/docs/home/flags/links).
### Tags
Tags are labels that help you categorize flags. They’re particularly helpful for managing flag permissions with custom roles. For example, you can tag flags with `marketing` or `devOps` tags, and then use these tags to determine who has read or write access to the flag. To learn more about using tags with custom roles, read [Using tags](/docs/home/account/roles/role-tags).
## Why create a flag naming convention?
Naming conventions are an important part of your organization’s experience of using feature flags.
A good naming convention should convey:
 * The intended behavior and impact of the application when the flag serves a variation.
 * The scope and target of the behavior.
 * The purpose of a feature flag in both the **Flags** list and source code.
Poorly-named flags can result in the following consequences:
 * Unclear or ambiguous flag impact and intent. For example, does a flag named “Dark mode” turn on dark mode, or allow end users to choose dark mode?
 * Flags used for multiple purposes in an application by mistake.
 * Difficulty remembering and adhering to the naming convention.
 * Difficulty discovering and searching for flags from the **Flags** list.
Continue reading to learn how to avoid these pitfalls and create a useful, usable flag naming convention.
## Get started
If your organization has a coding style guide, you may want to build your flag naming and flag key conventions off of your style guide, add your conventions to the guide, or store them together. If your organization doesn’t have a coding style guide, consider what information about a flag might be useful for future contributors to know.
Your conventions should include instructions on:
 * Which flag attributes make up the flag name and flag key
 * How those components should be phrased and formatted
 * How they should be ordered
### Flag kinds
In your flag conventions, we recommend that you describe each kind of flag used by your organization and the specific naming convention for that kind. Possible flag kinds you may want specific naming conventions for include “release,” “configuration,” “allow,” “show,” and “database” flags.
In the convention for each flag kind, you should include:
 * The action or prefix used
 * An example flag name, key, and the semantic meaning of the flag as a sentence
 * Examples when you should and should not use this kind of flag
To learn more, read [Flag kind examples](/docs/guides/flags/flag-conventions#flag-kind-examples).
### Consider shared architecture
When using a shared project architecture, all of your work groups should be able to adopt the naming convention easily. If you use feature flagging on multiple platforms, consider whether you use single flags for multiple platforms or a different flag for each platform. This can impact your flag naming convention by requiring more or less precise flag names.
You may want to assign prefixes to flags to designate them as belonging to members with particular roles. For example, you could add the “DBA” prefix to the name of flags managed by database administrators (DBAs). Then, in your custom role permissions for DBAs, you can grant permission to flags with keys that begin with `dba`.
However, we generally recommend using tags to manage flag access, rather than name prefixes. To learn more, read [Tags](/docs/guides/flags/flag-conventions#tags).
## The components of a flag name
Flag names should read as an instructional sentence that begins with an action and concludes with a subject.
The action describes purpose and behavior of the flag. This should be a single verb and an optional category, followed by a colon. Some example actions are “Release:” and “Release Mobile:”.
The subject describes the target and scope of the flag. Some example subjects are “Widget” and “Homepage banner color.”
You should be able to read the name as a sentence that describes the purpose and scope of a flag. For example:
 * “Rollout: a new feature”
 * “Configure: a setting”
 * “Allow: an action”
 * “Enable: an entitlement”
 * “Show: an offer”
The exception to this is flags that are a proxy for the state of an external system or process. For these flags, you may not need an action in the flag name.
For example:
 * “DB: widget table exists”
 * “Compliance: GDPR enforced”
Other useful facts you can include in a flag name are:
 * The effect of changing its value
 * Where that effect happens, such as the interface element or page affected
 * Which work group is responsible for it
 * Whether it is temporary or permanent
 * The date it was created
By default, flag keys match flag names with minor adjustments for spaces or special characters. LaunchDarkly can enforce flag key conventions for you, which can help you standardize flags across your projects.
## Flag key conventions
Flag keys are important and permanent. You use the flag key to reference the flag in your code. A suggested key auto-populates from the flag name you enter, but you can customize it if you wish.
If you would like to standardize how members of your organization define feature flag keys, you can specify a convention in the project settings and LaunchDarkly will enforce your convention for all new flags.
You can specify whether your flag keys should use camel case, Pascal case, snake case, or kebab case. You can also specify whether your flag keys require a specific prefix.
To learn more, read [Flag key conventions](/docs/home/flags/proj-flag-settings#flag-key-conventions).
## Flag templates
In addition to flag naming and key conventions, LaunchDarkly also allows you to set project-wide default settings for different types of flags. For example, if you want kill switch flags to be permanent and release flags to be temporary, you can set that default in your flag templates. You can set up flag templates for each type of flag that your organization commonly uses to help standardize features across your project.
Unlike flag key conventions, flag templates are not enforced by LaunchDarkly. For example, if your release flag template specifies that release flags are temporary and use a “release” tag, by default all new release flags are created with those settings. However, anyone with editing permission can update the settings for an individual flag.
To learn more, read [Flag templates](/docs/home/flags/templates).
## Flag kind examples
This section includes examples of naming schemes and best practices for specific flag kinds, including temporary release flags and several types of long-lived operational flags. When naming a flag, use the most specific category that you can. This ensures that all flags within that category have similar semantics and variations.
Expand the sections below for examples of each kind, when you should use them, and how you might name them.
###### Expand release flags example
### Release flags
Release flags are temporary flags that control the progressive release of a new feature or behavior. You should remove these flags after general release.
Here is a table of release flag example names, keys, and human-language interpretations:
Name | Key | Human-language interpretation 
---|---|--- 
Release: widget API | `release-widget-api` | Roll out the Widget API 
Release Android: live-chat | `release-android-live-chat` | Roll out live chat to Android customers 
You should create flag links for related APM dashboards, metrics, monitors, alerts, and application logs.
To learn more, read [Percentage rollouts](/docs/home/releases/percentage-rollouts).
###### Expand kill switch flags example
### Kill switch flags
Kill switch flags are permanent safety mechanisms used to shut off functionality or third-party tools in an emergency.
Here is a table of kill switch flag example names, keys, and human-language interpretations:
Name | Key | Human-language interpretation 
---|---|--- 
Kill switch: disable Acme integration | `kill-switch-disable-acme-integration` | Kill switch for the Acme integration 
Kill switch : social media auto posts | `kill-switch-social-media-auto-posts` | Kill switch for all automated social media posts 
You should create flag links for related APM dashboards, metrics, monitors, alerts, and application logs.
###### Expand experiment flags example
### Experiment flags
Experiment flags are a type of temporary rollout flag that control the release of a new feature or behavior and are included in an attached experiment. You should remove these flags after the experiment yields results or after general release.
Here is a table of experiment flag example names, keys, and human-language interpretations:
Name | Key | Human-language interpretation 
---|---|--- 
Experiment: one-button checkout flow | `experiment-one-button-checkout-flow` | Experiment on the new one-button checkout flow versus the current flow 
Experiment: notification opt-in | `experiment-notification-opt-in` | Experiment on notification opt in choices 
You should create flag links for documentation for the application, service, or component that is involved in the experiment.
To learn more, read [Experimentation](/docs/home/experimentation).
###### Expand migration flags example
### Migration flags
Migration flags are used to migrate data or systems, for example to coordinate releases with schema migrations.
Here is a migration flag example name, key, and human-language interpretation:
Name | Key | Human-language interpretation 
---|---|--- 
Migration: widget table exists | `migration-widget-table-exists` | In the database, the widget table exists 
DBAs or automated tooling can update the flag after they create the table. You can use database flags primarily as a prerequisite in other flags to facilitate coordinations between work groups.
You should create flag links for documentation for the application, service, or component that uses this configuration, related APM dashboards, metrics, monitors, alerts, and application logs.
To learn more, read [Migration flags](/docs/home/flags/migration).
###### Expand operational flags example
### Operational flags
Operational flags are long-lived configuration flags that control the behavior of an application, such as showing the visibility of a component. They do not typically have a planned removal date.
Here is a table of operational flag example names, keys, and human-language interpretations:
Name | Key | Human-language interpretation 
---|---|--- 
Configure: log verbosity | `configure-log-verbosity` | Configure the log verbosity 
Configure: API rate limit | `configure-api-rate-limit` | Configure the API rate limit 
Use operational flags when the flag’s behavior and variations do not fit into a more specific category. Document any constraints on when the value can be safely changed and any potential side effects such as increased load on critical services.
### Operational show flags
Show flags are a type of long-lived operational flag that control the visibility of a component.
Here is a show flag example name, key, and human-language interpretation:
Name | Key | Human-language interpretation 
---|---|--- 
Show: unsupported browser warning | `show-unsupported-browser-warning` | Show the unsupported browser warning 
Use show flags when controlling the visibility of a component for a subset of end users, such as informational banners, alerts, and offers. Show flags must be side effect-free and safe to turn on and off for any end user.
###### Expand entitlement flags example
### Entitlement flags
Entitlement flags are long-lived operational flags that control whether or not an action is allowed or denied, or whether a user has access to a particular feature.
Here is an entitlement flag example name, key, and human-language interpretation:
Name | Key | Human-language interpretation 
---|---|--- 
Allow: member impersonation | `allow-member-impersonation` | Allow use of member impersonation 
Use entitlement flags when the deny or false variation would cause the application to return “Access denied” or a 403 error. Changing allow/deny should be safe and side effect-free unless otherwise documented.
Create flag links for documentation for the application, service, or component that uses this configuration, documentation describing risks associated with allowing or denying access to this feature, and documentation describing when you should change the targeting of this flag.
## Managing flag keys
We typically recommend using the automatically generated flag key, with only minor changes for style and consistency. For example, If you have a flag named “Release: optional dark mode (ODM) function” the generated key would be `release-optional-dark-mode-odm-function`. You might want to change the generated key to `release-odm-function` for brevity.
Do not use flag keys to store additional metadata. The flag keys are static and cannot change, so must be applicable for the entire lifetime of the flag. For example, you shouldn’t include team names in the flag key, because team names and responsibilities may change over the lifetime of the flag.
## Effective flag descriptions
In addition to naming best practices, you can also document flag description best practices. Flag descriptions should be no longer than one or two sentences. Don’t repeat any information already present in the flag’s name. Instead, focus on other things you want your teammates to know about the flag.
This might include:
 * What enabling targeting will do
 * What side effects it may cause
 * Who is responsible for this flag
 * When you can remove the flag
You can format flag descriptions using Markdown and include in-line Confluence links.
## Tags
Tags are useful for grouping flags by particular details. For example, if you have a set of long-lived flags that you intend for operational use, you can tag them with `operational`. If you have flags that have special targeting for end users in Canada, you can tag them `canada`. To learn more, read [Tags](/docs/home/account/tags).
You can also use tags to control which account members can modify flags. To learn more, read [Tags in role policies](/docs/home/account/roles/role-tags#tags-in-role-policies).
Try to reuse existing tags as much as possible. This streamlines the **Flags** list and makes it easier to find things later.
## Flag variation names
When you create flag variations, you should add variation names and descriptions. Variation descriptions should describe the behavior of the application when the variation is served and any related side effects or required conditions. This is particularly important for non-boolean flags.
## Practices to avoid
Some organizations use the following practices in their flag naming conventions. In this section, we discuss why we don’t recommend these practices, and what to do instead.
### Avoid including ticket or sprint numbers in the flag name
Including ticket or sprint numbers in flag names lets you quickly identify which flags are related to a ticket or sprint. However, we advise against this because flags are not always tied to a specific sprint, or may be tied to several tickets. Instead, we recommend using flag links to associate a flag with particular tickets.
Some organizations include sprint numbers in flag names to avoid naming conflicts. However, if you need to include sprint numbers to differentiate between multiple flags using the same name, the flag names are likely not descriptive enough. Instead, tweak your flag naming conventions so they are sufficiently descriptive and unique.
If you must include a ticket or sprint number in a flag’s metadata, we recommend including it in the description or as a tag instead.
### Avoid including team or work group names in the flag name
You shouldn’t include team or work group names in a flag’s name or key, because team names and responsibilities may change over the lifetime of the flag. Instead, use tags and prefixes based on flag kind or component for access control.
You can also designate a flag maintainer for a specific flag to help track its ownership and maintenance.
Groups can also use custom dashboards to give them a view of flags that are relevant to their work. To learn more, read [Save filtered **Flags** lists](/docs/home/flags/list#save-shortcuts-to-filtered-flags-lists).
### Avoid using machine-generated names
You may be generating flag names automatically from an external system that are not human-readable. We do not recommend this, because it’s important for all stakeholders, including those using the user interface (UI), to understand what a flag does. If a flag’s name and key do not convey the intent of the flag, mistakes are easier to make and the scope of the flag may grow. If you must use machine-generated flag names, you should include your flag metadata in flag descriptions and tags instead.
## Conclusion
A set of clear and comprehensive flag conventions allows your organization to quickly and easily discover and understand the purpose of any given feature flag. It also relieves cognitive load on your engineers when creating and working with flags. Creating flag conventions for your organization is one of the many ways to set up your organization for success when using feature flags.
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs