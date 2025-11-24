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
 * [Using multiple environments in LaunchDarkly](#using-multiple-environments-in-launchdarkly)
 * [Using LaunchDarkly to focus on your product, not on different teams](#using-launchdarkly-to-focus-on-your-product-not-on-different-teams)
 * [How flag hierarchy impacts deployment and release](#how-flag-hierarchy-impacts-deployment-and-release)
 * [Flag relationships](#flag-relationships)
 * [Prerequisite flags](#prerequisite-flags)
 * [Dependent flags](#dependent-flags)
 * [Flag structure and dependencies](#flag-structure-and-dependencies)
 * [Feature bundling](#feature-bundling)
 * [Decommissioning](#decommissioning)
 * [Configuring flag dependencies](#configuring-flag-dependencies)
 * [The flag evaluation sequence](#the-flag-evaluation-sequence)
 * [Additional considerations](#additional-considerations)
 * [Role-based access control (RBAC)](#role-based-access-control-rbac)
 * [Conclusion](#conclusion)
## Overview
This guide explains how feature flags, evaluation rules, and sequences can make flag targeting more effective.
In this guide, you will:
 * Learn the difference between a prerequisite flag and a flag dependency
 * Learn about the order in which flags are evaluated
## Prerequisites
To complete this guide, you must have the following prerequisites:
 * A basic understanding of feature flags
 * Access to a LaunchDarkly account with permission to create flags
## Concepts
This guide relies on the following concepts.
### Using multiple environments in LaunchDarkly
LaunchDarkly is built to support multiple environments for different use cases or groups in your organization. These examples assume that you have separate environments for coding or testing and production. If that’s not the way you work, build in extra checks to make sure you don’t accidentally expose something in production before you are prepared.
To learn more about how LaunchDarkly manages different environments, read [Environments](/docs/home/account/environment).
### Using LaunchDarkly to focus on your product, not on different teams
Flag hierarchies can span multiple teams. When you think about the design of your hierarchy, remember that you may cross organizational boundaries to deliver a unified end user experience. Different teams may rely on the same flags, use the same environments, or do complementary work.
##### Flags must be in the same project to use one as a prerequisite of the other
While different teams can use flag hierarchies to collaborate, they must be working from a common project to use flag prerequisites. Feature flags from different projects cannot be prerequisites of one another.
## How flag hierarchy impacts deployment and release
Feature flags are control points we use to change how software acts after it’s deployed. You can think of the ability to feature flag as a tool, and the ways feature flags get implemented as patterns. Feature flags are tools that we implement in specific patterns with the objective of achieving a business goal, like controlling who can access a certain feature or testing UI changes on a website.
LaunchDarkly’s feature flagging capabilities reflect the complex ecosystems in which they exist. You can use nested or dependent flags to do exactly what you want in a given system.
There are three main use cases for flags with dependencies:
 * [Feature bundling](/docs/guides/flags/flag-hierarchy#feature-bundling)
 * [Prerequisite flags](/docs/guides/flags/flag-hierarchy#prerequisite-flags)
 * [Decommissioning](/docs/guides/flags/flag-hierarchy#decommissioning)
It’s useful to remember that deployment is the process of getting code onto the servers or endpoints that execute it, and release is the act of making the feature visible or accessible. For testing and experimentation purposes, it’s useful to have features that respect dependencies you have preconfigured, so you are never surprised by which features are active.
## Flag relationships
You can think of feature flags in different ways based on their relationships to each other. It might be helpful to use the mental model of the [Keystone Pattern](https://martinfowler.com/bliki/KeystoneInterface.html), where one flag is a keystone or required prerequisite that supports and enables other flags to do their jobs. Another pattern is “version gating,” where a feature is only available if the end user is on a certain version of the software. In version gating, the prerequisite is checking the software version number.
### Prerequisite flags
Prerequisite flags are flags that must be enabled in order for other flags to work. These are the “keystone” flags.
##### Adding prerequisites to flags is available to customers on select plans
Adding prerequisites to flags is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
Prerequisite flags may control large UI elements which contain multiple components such as:
 * dependent flags
 * access control restrictions or allowances
 * traffic operations tools
 * flags managing monitoring
Controlling these sub-elements with flags does not change the prerequisite flag behavior. All flag conditions and rules are evaluated, and if there is any condition that would prevent the flagged code from executing, that will stop execution. In other words, even if a flagged piece of code would execute according to 9 of its 10 rules, the tenth would prevent execution. That safety-first behavior would be reversed if the flag’s default behavior was to serve the code on, and the flag rules existed to turn it off.
For example, a flag named “New search bar” enables a new search bar on a new page in your app. Access to that page is required for an end user to use the new search bar, and is controlled by the “New page” flag. In this example, the “New page” flag is a prerequisite of the “New search bar” flag.
Prerequisite flag settings can vary by environment, so you could have the prerequisite and dependent flags all on in a test environment, but not in production. The production prerequisite flag might be secured by role-based access control (RBAC), so it could only be enabled by a small subset of your organization. To learn more, read [Roles](/docs/home/account/roles).
### Dependent flags
Dependent flags are flags that represent a feature or subfeature within a larger feature. They are controlled by the condition of a prerequisite flag. If the prerequisite flag is not enabled, none of the dependent flags are available.
In the example above, the “New search bar” flag is a dependent of the “New page” flag because it depends on the “New page” flag being enabled for the feature it controls to work.
You can set prerequisite flags when you create the dependent flag, or in the “Prerequisites” section of the dependent flag’s **Targeting** tab.
Here is an image of the “Prerequisites” section:
![The "Prerequisites" section of the dependent flag with a prerequisite flag added.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/f38e00fc6d4ffc675df870fe412bce8df0228ac7dcc02d1fcfa120eb54628572/assets/images/auto/targeting-prerequisite-section-new.auto.png)
The "Prerequisites" section of the dependent flag with a prerequisite flag added.
## Flag structure and dependencies
Here’s the most common structure for code that uses a flag:
Flag code structure
```
`IF` FeatureX_Flag is `true` 
--- 
`THEN` show Feature X 
`ELSE` don’t show Feature X 
```
Adding conditions or dependencies to the flag changes the code to something more like:
Flag code structure with dependencies
```
`IF` _Prerequisite-Flag is `true` 
--- 
`AND` FeatureX-Flag is `true` 
`THEN` show Feature X 
`ELSE` don’t show Feature X 
```
This adds a layer of evaluation to every feature controlled by a dependent flag, so you have more power to make sure flags only execute in the conditions you want.
Each of the following use cases describes the business value of certain types of flag hierarchy behaviors. In practical execution, each of them relies on a code structure of `if/and/else` statements like the ones given above.
Here are use cases for hierarchical flag relationships:
### Feature bundling
Feature bundling is when many features or subfeatures are controlled by a single prerequisite flag. This pattern allows many teams to contribute to a major release without accidentally exposing parts of the code before the entire release is ready.
For example, a LaunchDarkly customer did a major rebranding, including fonts, graphics, CSS, and naming. Each of the changes in that list was a feature that had its own flag. All of those flags were dependent on one prerequisite flag called “Rebranding.”
Teams could test that their own flags were working correctly in a test environment that had the “Rebranding” flag set to `true`. When everything was ready, the CEO flipped the “Rebranding” flag live in production while on stage at a major conference.
Because all the resources already existed at the destinations, when the “Rebranding” flag switched to `true`, the new branding appeared to everyone simultaneously, worldwide.
All of the dependent flags will then be instantly accessible and evaluated. You can think of this pattern as a pyramid, where all of the individual dependent flags form the foundation while the prerequisite flag is the single point of control at the apex. The value to the business in this case is that all the flags were tested and checked without any disruption, and the branding change happens instantly and completely.
### Decommissioning
In the previous two examples, we assumed that the default state of a flag is `false`. When `false` is the default, the feature doesn’t appear. From an end user’s standpoint, the software works the way it always has. Only if the flag changes from the default state (`false`) to `true` does a change appear to the context.
There is also a pattern for flags with a default state of `true.` These are flags that might be put around features that are being removed or decommissioned. Changing the flag state to `false` means the existing feature no longer appears. When a team uses feature flags to turn a feature off, they have the option of turning it back on instantly if they need to. If you put a feature flag around code that is being decommissioned and make it dependent on status checks or tests, you can be sure all important preparations are complete before you turn off the flag that controls the legacy code.
Dependent flags for decommissioning might include version checking, as above, or client-specific identifiers. For example, you might be eliminating support for a legacy feature for almost everyone, unless they belong to a specific client that is paying you to maintain it. In that case, the state of the flag would be `false` for everyone, except people who were in the targeted group “client_legacy.” For people in that group, the flag would remain `true`.
### Configuring flag dependencies
There are two ways to add a flag as a prerequisite to another flag:
 * You can add a prerequisite flag when you create the dependent flag, as part of the flag creation steps. If you add a prerequisite during the dependent flag’s creation, the prerequisite applies for all environments.
 * You can add a prerequisite flag when you edit the targeting rules for an existing flag. If you add a prerequisite from the dependent flag’s **Targeting** tab, the prerequisite only applies to the current environment.
Here is an image of the “Prerequisites” section:
![The "Prerequisites" section of the dependent flag with a prerequisite flag added.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/f38e00fc6d4ffc675df870fe412bce8df0228ac7dcc02d1fcfa120eb54628572/assets/images/auto/targeting-prerequisite-section-new.auto.png)
The "Prerequisites" section of the dependent flag with a prerequisite flag added.
Now you can use the prerequisite flag to make sure that all of the changes you make for a bundle are not visible in production, but turn it on for your test or development system so you can make sure they will work correctly. To learn more, read [Flag prerequisites](/docs/home/flags/prereqs).
## The flag evaluation sequence
When you assemble a complicated flag dependency, be sure that you understand the effect that you are trying to produce. It’s easy to end up in a state where a new feature won’t show because there’s a rule or prerequisite blocking it.
Flag rules are evaluated top-to-bottom, as shown in the flag’s **Targeting** tab. _Prerequisites always apply before flag rules._
If present, the individual targets rule is always on top and evaluated first. For each variation in an individual targeting rule, individual targets are evaluated alphabetically by context kind.
Then, additional flag rules are evaluated top-to-bottom. This includes segment, mobile, and custom rules. You can drag and drop flag rules to change the order of evaluation.
Here is an image of a flag with a prerequisite and two rules:
![A flag with a prerequisite and two rules.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/52e0d78209f8fcd944811b24b0f5a841e38fa1d07d9d1a3ba9836ba3d576ed7e/assets/images/auto/flag-deps-rules-new.auto.png)
A flag with a prerequisite and two rules.
## Additional considerations
These considerations may affect how you choose to implement flag hierarchy, although they are not strictly required.
### Role-based access control (RBAC)
For many flags, especially those that are bundling many features or decommissioning software, it may make sense to restrict which account members can change the flag state based on their role.
For example, you may set RBAC so that developers can add and remove dependent flags or change their state, but only release managers can change the state of prerequisite flags.
To learn more, read [Roles](/docs/home/account/roles).
## Conclusion
In this guide, we have covered some of the use cases and considerations for using feature flags in a hierarchy.
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs