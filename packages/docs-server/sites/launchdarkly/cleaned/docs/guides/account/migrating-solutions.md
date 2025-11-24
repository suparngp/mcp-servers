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
 * [LaunchDarkly data hierarchy](#launchdarkly-data-hierarchy)
 * [Prepare for the migration](#prepare-for-the-migration)
 * [Choose an organization schema](#choose-an-organization-schema)
 * [Create a flag naming convention](#create-a-flag-naming-convention)
 * [Plan your tags](#plan-your-tags)
 * [Use teams](#use-teams)
 * [Choose a project or group to migrate first](#choose-a-project-or-group-to-migrate-first)
 * [Communicate your plan](#communicate-your-plan)
 * [Migrate your flags](#migrate-your-flags)
 * [Identify permanent flags](#identify-permanent-flags)
 * [Import or recreate permanent flags in LaunchDarkly](#import-or-recreate-permanent-flags-in-launchdarkly)
 * [Compare flags between systems](#compare-flags-between-systems)
 * [Change the wrapper](#change-the-wrapper)
 * [Transition and test applications](#transition-and-test-applications)
 * [Repeat the process for each group](#repeat-the-process-for-each-group)
 * [Retire your legacy system](#retire-your-legacy-system)
 * [Plan for future use](#plan-for-future-use)
 * [Integrate your tools](#integrate-your-tools)
 * [Prevent technical debt](#prevent-technical-debt)
 * [Further resources](#further-resources)
## Overview
This guide provides guidance and tips for how to effectively migrate from a third-party or homegrown feature flagging system to LaunchDarkly’s feature management platform.
There are many reasons why your organization may be ready to migrate to LaunchDarkly. Some of these include:
 * **Your organization needs a more sophisticated system:** You’re adding new languages to your application stack and your old flagging system can’t keep up, or your system can’t handle both client-side and server-side flag evaluations.
 * **It’s burdensome to maintain your own system:** The ongoing required maintenance of your system means your engineers are spending time on internal maintenance instead of working on the service your organization provides.
 * **Your projects need to scale:** Your system can’t support multiple, discrete projects, or doesn’t have the capacity to handle the variety of access permissions your teams and team members need.
After you’ve decided to retire your old system, it’s time to begin planning your migration project, along with the challenges and opportunities it presents. We recommend careful planning as a preliminary step.
Successful migrations commonly take place over several incremental steps, rather than all at once. Tracking and visibility into the process helps you and your teams ensure a smooth rollout, as will having a failsafe in place if problems occur. A gradual migration also reduces opportunities for error.
To begin the process, divide your migration into three phases:
 1. [Preparing for the migration](/docs/guides/account/migrating-solutions#prepare-for-the-migration): Determine what is needed for a successful migration, and how the migration will occur.
 2. [Migrating your flags](/docs/guides/account/migrating-solutions#migrate-your-flags): Recreate selected flags from the legacy system in LaunchDarkly, group by group.
 3. [Planning for future use](/docs/guides/account/migrating-solutions#plan-for-future-use): Make a plan for how to go forward with day-to-day use.
## Prerequisites
To complete this guide, you must have the following prerequisites:
 * A LaunchDarkly account with the LaunchDarkly Admin role, or a [base role](/docs/home/account/roles) of Admin or Owner.
 * Administrative access to the third-party platform you’re migrating from.
 * Familiarity with and access to the LaunchDarkly REST API is helpful, but not required. To learn more, read our [API documentation](/docs/api).
## Concepts
This guide relies on the following concepts:
### LaunchDarkly data hierarchy
​​LaunchDarkly accounts can contain one or more projects. A project can contain multiple environments, and flags exist across all environments within a project. When you create a new feature flag, it is created in every environment in your LaunchDarkly project. However, flag configuration settings are specific to each environment. The changes you make in one environment do not apply to the same flag in any other environment. If you want to, you can configure the same flag in a unique way for every environment you have.
Many software projects have a test, staging, and production environment within each project. In LaunchDarkly, you can define any environment structure that suits your group’s needs. For example, your mobile team might need an `android test`, `android prod`, `ios test`, and `ios prod` environment in a “Mobile apps” project.
To learn more, read [Projects](/docs/home/account/project) and [Environments](/docs/home/account/environment).
## Prepare for the migration
Preparing for the migration may be the most important part of the process.
Here are the steps we recommend you take to prepare:
 * [Choose an organization schema](/docs/guides/account/migrating-solutions#choose-an-organization-schema)
 * [Create a flag naming convention](/docs/guides/account/migrating-solutions#create-a-flag-naming-convention)
 * [Plan your tags](/docs/guides/account/migrating-solutions#plan-your-tags)
 * [Decide whether to use LaunchDarkly teams](/docs/guides/account/migrating-solutions#use-teams)
 * [Communicate your plan](/docs/guides/account/migrating-solutions#choose-a-project-or-group-to-migrate-first)
### Choose an organization schema
The organization schema you choose for your LaunchDarkly account informs the way your account members interact with the platform and how flags are managed. There are three approaches you can take to organizing your projects, and there are pros and cons to each.
Common organizational schemas options include:
 * **A separate project for each “product”** : If you want to share flags across a set of components that is presented to your end users as a single product, you can create one project. For example, a mobile application, web application, and backend services that are presented as one product might all fit in one project. This approach can be helpful if you have a microservice architecture for your product and you know you want to share flags across multiple services. We do not recommend this approach if you have a hard separation between unrelated groups of services.
 * **A separate project for each app or executable owned by a team:** One project per app or executable is best when you are rolling out LaunchDarkly to the whole organization, or you have microservices that are functionally distinct from one another or share few dependencies. This option allows you to easily manage permissions for members on a per-project basis. You can also use LaunchDarkly [Teams](/docs/guides/account/migrating-solutions#use-teams) to manage access and permissions. One disadvantage to this method is that you can’t apply flags from one project to another project. You may also need to manage multiple SDK instances within the same project, and this adds complexity.
 * **A single project for the entire organization:** If you have a smaller team, or are rolling out LaunchDarkly for only a specific project, you may not need to break it up into multiple projects. We do not recommend this approach if you have multiple teams, as your account can quickly become complex with multiple groups making thousands of flags in your environment.
 * **Shared services with multiple projects:** In the shared services model, you have one project that refers to the product line and a second project that supports the shared service. You can initialize multiple instances of an SDK and write a wrapper around them to move the complexity away from your developers while still having feature flags for all your services. However, this model can be complex to manage. To learn more, read [Use cases for SDK wrappers](/docs/guides/sdk/sdk-wrappers).
### Create a flag naming convention
If you don’t already have a naming convention or style guide in place for feature flags, take this opportunity to create one. Establishing conventions for flag names and flag keys can help identify which team owns a flag, what release it is associated with, and the purpose of a flag. These conventions can also help prevent technical debt from accumulating by making it easier to understand which flags can be archived when.
To learn more, read [Flag conventions](/docs/guides/flags/flag-conventions).
### Plan your tags
If you only have a handful of flags, it’s not time-consuming to find a flag in LaunchDarkly. As your number of flags grows and more teams use feature flags, this becomes harder. Tags help you organize and sort flags into groups. For example, if you have flags related to experiments you can create an ‘experiments’ tag. If you have flags for specific departments, you can create a tag with the department name. These tags can help you control which team members can read, write, or modify a flag.
Before migrating, brainstorm a list of relevant tags. You can always add more tags later. To learn more, read [Tags](/docs/home/account/tags).
### Use teams
In addition to your broad organizational schema, you can further organize your LaunchDarkly account members using teams. Teams allow you to set up fine-grained access rules and assign this access to specific groups of people, giving them precise control over their feature flags, experiments, and projects. While you don’t need to define your teams and their permissions before you migrate, thinking about how you might like to organize your teams can help you decide which schema makes sense for your organization.
To learn more, read [Teams](/docs/home/account/teams).
### Choose a project or group to migrate first
If your engineering organization contains many groups, we recommend starting with a single group or project rather than trying to migrate all groups and their projects at once. This allows you to focus your attention on helping one group at time rather than spreading it across many. Because new flags are being created all the time, it also allows you to narrow your scope when managing the multi-state period.
Begin by grouping your flags organizationally, and decide on a rough order you’d like to move groups over in. Your goal should be to cause the least disruption, try not to break code, and require groups to use both systems for as little time as possible.
When choosing a pilot group, pick one that won’t be under time pressure. Groups starting a new project or groups with a maintenance period coming up between projects are good candidates. The group should be ready to provide regular feedback on its migration process, as well as assist in creating lightweight migration tools and documentation for the rest of the organization to use in their migrations.
You can also show your teams how to self-serve to enable groups to migrate on their own.
### Communicate your plan
Inform all of your engineering and other relevant teams of the plan. Provide your teams with a rough outline and a scheduled timeline.
## Migrate your flags
Once you’ve completed your preparations, it’s time to start migrating your feature flags, one group at a time. Often our customers run their old and new systems in parallel for some time. Your migration can take as long as you need. If you have a feature currently in the middle of a rollout, or you’re running an experiment, leave those flags on the existing platform while you set up new flags in LaunchDarkly. It’s fine to run systems in parallel for a couple of months while things wind down in your legacy system and your teams are trained. By implementing the migration slowly, you may be able to avoid giant cut-over steps and downtime.
To begin, create an “evaluation mode” flag in LaunchDarkly. This flag tells your application which system to consult for feature flags: your legacy system, LaunchDarkly, or both. You can leverage targeting rules for granular control between your environments and applications. When this flag is ready, you can begin the migration process.
Here’s how to migrate your feature flags, group by group:
 1. [Identify permanent flags](/docs/guides/account/migrating-solutions#identify-permanent-flags) for the group you’re working on
 2. [Import or recreate permanent flags in LaunchDarkly](/docs/guides/account/migrating-solutions#import-or-recreate-permanent-flags-in-launchdarkly)
 3. [Compare flags between systems](/docs/guides/account/migrating-solutions#compare-flags-between-systems)
 4. [Change the wrapper](/docs/guides/account/migrating-solutions#change-the-wrapper)
 5. [Transition and test applications](/docs/guides/account/migrating-solutions#transition-and-test-applications)
 6. [Repeat the process for each group](/docs/guides/account/migrating-solutions#repeat-the-process-for-each-group)
 7. [Retire your legacy system](/docs/guides/account/migrating-solutions#retire-your-legacy-system)
### Identify permanent flags
If you haven’t been regularly archiving flags in your legacy solution, you may have accumulated a lot of flag debt. You may have hundreds or thousands of flags that are no longer in use. Migrating every feature flag you’ve ever created would be an overwhelming task. Instead, consider the best way to address your flag debt, as well as how to avoid accumulating more in the future. To learn more about avoiding accumulating flag debt in LaunchDarkly, read [Reducing technical debt from feature flags](/docs/guides/flags/technical-debt).
Identify all permanent flags in your legacy system used by your pilot group. Ideally, you should leave all temporary flags in the legacy system. If a group as temporary flags in use, wait until those flags are no longer needed before migrating. Moving only permanent flags greatly reduces the flags you need to handle, and helps reduce your existing technical debt. To learn more about how to classify flags, read [Determine your flag’s use case](/docs/guides/flags/creating-flags#determine-your-flags-use-case).
If possible, keep your flag keys the same between the legacy system and LaunchDarkly. If you change keys between systems, it can cause problems with your wrappers. However, you may have to update keys for flags that use characters LaunchDarkly does not support. LaunchDarkly flag keys can contain only letters, numbers, periods (`.`), underscores (`_`), and dashes (`-`).
It may be helpful to organize your flags into a spreadsheet to help you decide which flags to migrate and which to leave in your legacy system. Here is an example:
Legacy flag key | Flag type | New flag key | Tags | Team 
---|---|---|---|--- 
2-click-checkout | Permanent | 2-click-checkout | `product`, `front-end`, `team-payment-processing` | Payment processing 
currency-display | Permanent | item-currency-display | `product`, `per-flag`, `front-end`, `team-payment-processing` | Payment processing 
background-colors | Temporary | Not needed | `team-ux` | UX 
If your legacy system only allows boolean flags, you may be able to simplify by combining multiple boolean flags into one multivariate flags.
For example, if you have three different possible background colors of red, blue, and yellow, your legacy system might have two boolean flags to determine the background color for a given context instance:
 * If flag A is on, the context instance receives a red background
 * If flag B is on, the context instance receives a blue background
 * If neither flag A nor B is on, the context instance receives a yellow background
You could replace flags A and B in the legacy system with one multivariate flag in LaunchDarkly that serves either a red, blue, or yellow background depending on the flag’s targeting rules.
### Import or recreate permanent flags in LaunchDarkly
If you are migrating from a third-party system, you can import your flags directly into LaunchDarkly. You can import flags from Split.io or Unleash. To learn how, read [Importing flags](/docs/home/flags/import).
If you are migrating from a different system, you’ll need to recreate your flags in LaunchDarkly. Follow the flag naming convention you created during your planning phase. Ideally, you will migrate a small number of flags and it will not be burdensome to create them manually. You can use the LaunchDarkly REST API to preload all of your existing flags and targeting rules, but if you are migrating so many flags you need an automated process, consider whether you have eliminated legacy flags thoroughly enough. There may be more you can archive or delete.
### Compare flags between systems
Search for mismatches between flags in your legacy system and LaunchDarkly. These may be flags that exist in both systems but have different targeting rules, or flags in the legacy system that you marked for migration but haven’t been migrated yet. You can do this manually or by using an external application performance management (APM) tool like New Relic One. To learn more about available observability and APM tool integrations, read [Observability tools](/docs/integrations/observability).
### Change the wrapper
Your legacy flag system may provide an API module. It likely contains flag evaluation functions that are called throughout the application code. Instead of changing all the application code that uses flags, change the implementation of the evaluation functions to use both the legacy system and LaunchDarkly. Internally, the new implementation evaluates flags by querying both the legacy system and LaunchDarkly and uses whichever flag it finds first. The order of querying is set by a dedicated “flag evaluation mode” flag, kept in LaunchDarkly. When the new wrapper is deployed, it should look to the legacy flag system first. After the group is comfortable with LaunchDarkly, and the most important flags have been migrated, you can switch the flag evaluation mode to query LaunchDarkly first.
To learn more, read [Use cases for SDK wrappers](/docs/guides/sdk/sdk-wrappers).
### Transition and test applications
Some customers use dual-writes so that any changes to feature flag states are automatically written to both LaunchDarkly and their legacy system. You can use webhooks to implement this in LaunchDarkly. You can then perform periodic comparisons of specific applications as you migrate, or of all flag data, across both systems to ensure they remain consistent over time. To learn more, read [Webhooks](/docs/home/infrastructure/webhooks).
### Repeat the process for each group
Repeat the above steps for each group you are migrating to LaunchDarkly. When all of your groups have been migrated, you can retire your legacy system.
### Retire your legacy system
After you’ve maintained flags in both systems long enough to ensure things are working as expected, phase out your legacy system by creating all new flags in LaunchDarkly only, and ceasing to create flags in your legacy system. This is the point of no return, as now the data between your legacy system and LaunchDarkly will diverge. You may want to enforce this by turning off the ability to create new flags in the legacy system, because it’s common for engineers to default to using it out of habit.
Utilize your APM tool to identify any unexpected behavior going forward. When you’re confident your flags are performing as expected, you can decommission your legacy system.
Congratulations! You have now successfully implemented LaunchDarkly.
## Plan for future use
As your organization begins using LaunchDarkly in earnest, you can begin integrating other third-party tools and thinking about how to manage technical debt.
### Integrate your tools
You likely use other third-party tools in your release process, such as applications like Slack, MS Teams, Jira, Azure DevOps, ServiceNow, Amazon Kinesis, or Azure Events Hub. You can integrate these tools, and many others, with LaunchDarkly. For a full list of LaunchDarkly integrations and instructions on how to add them to your LaunchDarkly account, read [Integrations](/docs/integrations).
### Prevent technical debt
Accumulating technical debt with feature flags is unavoidable, but there are steps you can take to minimize it.
First, define what done means when it comes to a feature. When you create a flag, what processes do you have in place for ensuring the flag is removed? Is a feature done when it rolls out to 100% of your customer base, or is it done when the flag is removed from the code? Coding a flag is a two-part process: creating a flag and removing a flag. You shouldn’t consider these two separate processes. If you’re using Git to manage your work, we recommend submitting a pull request (PR) to remove the flag at the same time you submit the PR to add it.
To learn more about managing technical debt in LaunchDarkly, read [Reducing technical debt from feature flags](/docs/guides/flags/technical-debt).
LaunchDarkly also provides code references to help you identify where in the codebase the feature flag is referenced for easier removal. To learn more, read [Code references](/docs/home/flags/code-references).
## Further resources
Here are some additional articles and talks about migrating to LaunchDarkly:
 * We discuss migration in our blog post [11 Tips for Migrating to LaunchDarkly](https://launchdarkly.com/blog/11-tips-for-migrating-to-launchdarkly/)
 * Rick Riensche shares his experience [Migrating from a Homegrown Feature Flags System to LaunchDarkly](https://launchdarkly.com/blog/galaxy-talk-successfully-migrating-from-a-homegrown/)
 * Dan Wells spoke at Trajectory about [Launching LaunchDarkly](https://launchdarkly.com/trajectory/rolling-out-launchdarkly-using-launchdarkly/)
If you have more questions or need further assistance, [start a Support ticket](https://support.launchdarkly.com/hc/en-us/requests/new).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs