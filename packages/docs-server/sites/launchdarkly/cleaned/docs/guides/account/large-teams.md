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
 * [Authentication](#authentication)
 * [Naming conventions](#naming-conventions)
 * [Projects and environments](#projects-and-environments)
 * [Plan projects](#plan-projects)
 * [Separate accounts for each team](#separate-accounts-for-each-team)
 * [Separate projects for each app or executable](#separate-projects-for-each-app-or-executable)
 * [Separate projects for each product](#separate-projects-for-each-product)
 * [Separate projects for each service](#separate-projects-for-each-service)
 * [Plan environments](#plan-environments)
 * [Teams and roles](#teams-and-roles)
 * [Building teams](#building-teams)
 * [Creating roles](#creating-roles)
 * [Assigning roles to teams](#assigning-roles-to-teams)
 * [Using approvals to manage permissions](#using-approvals-to-manage-permissions)
 * [Adding members](#adding-members)
 * [Approvals](#approvals)
 * [Managing flags](#managing-flags)
 * [Migrating from your existing solution](#migrating-from-your-existing-solution)
 * [Code references](#code-references)
 * [Context kinds and attributes](#context-kinds-and-attributes)
 * [Context attributes](#context-attributes)
 * [Experimentation](#experimentation)
 * [Integrations](#integrations)
 * [Slack or Microsoft Teams](#slack-or-microsoft-teams)
 * [Observability and APM tools](#observability-and-apm-tools)
 * [Flag links](#flag-links)
 * [Terraform](#terraform)
 * [SDK wrappers](#sdk-wrappers)
 * [Professional services](#professional-services)
 * [LaunchDarkly hub](#launchdarkly-hub)
 * [Introduction](#introduction)
 * [Getting started](#getting-started)
 * [Technical support](#technical-support)
 * [SDKs](#sdks)
 * [Integrations and architecture](#integrations-and-architecture)
 * [Example use cases](#example-use-cases)
 * [Administration](#administration)
 * [Additional resources](#additional-resources)
 * [FAQs](#faqs)
 * [Conclusion](#conclusion)
##### Many of these features are available to customers on select plans
Many of the features discussed in this guide are only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This guide explains how to plan a LaunchDarkly implementation for a large enterprise organization.
When you set up LaunchDarkly for the first time, it’s important to carefully plan how you want to standardize your use of the product across teams and projects. This is especially true for very large organizations with thousands of members. Thoughtful configuration choices as you implement LaunchDarkly can make the adoption process run more smoothly.
Here is the order of actions we recommend you take to prepare your LaunchDarkly instance for your large organization:
 1. [Configure member authentication](/docs/guides/account/large-teams#authentication) through a single sign-on (SSO) provider.
 2. [Create naming conventions for your resources](/docs/guides/account/large-teams#naming-conventions).
 3. [Decide how to structure your LaunchDarkly projects and environments](/docs/guides/account/large-teams#projects-and-environments), and enforce a naming convention for them.
 4. [Decide how to structure your LaunchDarkly teams](/docs/guides/account/large-teams#teams-and-roles), and assign roles to those teams. Enforce a naming convention for both teams and roles.
 5. [Add members to your teams](/docs/guides/account/large-teams#adding-members).
 6. [Decide what type of flag changes should require approvals](/docs/guides/account/large-teams#approvals), and configure approval settings.
 7. [Configure code references](/docs/guides/account/large-teams#managing-flags) and create a schedule or procedure for managing flag debt.
 8. [Configure context kinds](/docs/guides/account/large-teams#context-kinds-and-attributes), and create a naming convention for new context kinds.
 9. Optional: [Set up Experimentation](/docs/guides/account/large-teams#experimentation).
 10. Optional: [Set up integrations](/docs/guides/account/large-teams#integrations).
 11. [Configure SDK wrappers](/docs/guides/account/large-teams#sdk-wrappers).
 12. Optional: [Set up related professional services](/docs/guides/account/large-teams#professional-services).
This guide covers each of these steps in detail.
## Authentication
To begin, we recommend setting up SSO, preferably with a system for cross-domain identity management (SCIM).
SSO lets your team authenticate with LaunchDarkly using the same identity provider (IdP) you use for other internal and external services. Using SSO ensures compliance with your internal access control policies, and makes managing multiple large teams easier. To learn more about SSO, read [Single sign-on](/docs/home/account/sso).
SCIM facilitates user provisioning, which means your IdP can create, update, and deactivate members in LaunchDarkly. We have SCIM integrations with Okta and OneLogin. To learn more about SCIM provisioning, read [Enable SCIM provisioning](/docs/home/account/scim).
## Naming conventions
Before you start creating entities within LaunchDarkly, create a naming convention for projects, environments, flags, teams, context kinds, and context attributes. Later in this guide, we’ll talk about naming conventions for each of these resources in more detail.
Although creating a naming convention is more work up front, having a schema that your organization can refer back to will save your teams time and make it easier for different parts of your organization to understand what other teams are working on.
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
## Projects and environments
Next, decide how you plan to structure projects and environments across your organization. You can create multiple projects per account, and each project has its own unique set of environments and feature flags.
Different teams may need to use projects and environments differently. Even if this is the case, a general organization schema informs the way your account members interact with the platform and how they manage flags.
### Plan projects
To help decide how to structure your projects, consider which of your applications and services you will use with LaunchDarkly, and which applications and services need to coordinate releases. We recommend sharing projects where possible to help with lower overhead and coordination of dependent releases.
There are some common approaches you can take to organizing your projects, with pros and cons to each:
 * Separate accounts for each team
 * One account with separate projects for each app or executable
 * One account with separate projects for each product
 * One account with separate projects for each service
Expand each section below to read about that organizational schema.
###### Expand Separate accounts for each team
### Separate accounts for each team
In this model, each team has its own dedicated account.
This approach is the simplest way to manage access and permissions. You don’t need to create roles to prevent the team from accessing another team’s resources. It also lets you further separate the account into sub-projects and environments, and makes usage reporting straightforward.
The cons to this approach are that it requires significant effort for each team. Each individual account must set up things like SSO, integrations, teams, and so on individually. If you need to create a new account for a new team, it’s not as easy as creating a new project. Instead, you must work with your LaunchDarkly account representative to create a new account.
There is also no way to share resources between accounts including flags, experiments, segments, account activity, and usage metrics. If you choose this approach, you must be sure it’s acceptable that these resources are completely siloed. Members can belong to more than one account, but their access and permissions will not carry over between accounts. To learn more, read [Using one email for multiple accounts](/docs/home/account/multiple-accounts).
###### Expand Separate projects for each app or executable
### Separate projects for each app or executable
This approach is best when you are rolling out LaunchDarkly to the whole organization, or you have microservices that are functionally distinct from one another or share few dependencies. This option lets you manage permissions for members on a per-project basis easily. You can also use LaunchDarkly teams to manage access and permissions.
One disadvantage to this method is that you can’t apply flags from one project to another project. You may also need to manage multiple SDK instances within the same project, which adds complexity.
###### Expand Separate projects for each product
### Separate projects for each product
If you want to share flags across a set of components that’s presented to your end users as a single product, you can use one project per product. For example, a mobile app, web app, and back-end services that you present as one product might all fit into one project.
This approach can be helpful if you have a microservice architecture for your product and you want to share flags across multiple services. We do not recommend this approach if there is no overlap in your architecture between unrelated groups of services, and do not need to share flags, teams, and other resources between them.
###### Expand Separate projects for each service
### Separate projects for each service
In the shared services model, you have one project that refers to the product line and a second project that supports the shared service. You can initialize multiple instances of an SDK and write a wrapper around them to move the complexity away from your developers while still having feature flags for all your services. However, this model can be complex to manage.
Whatever schema you choose, restrict the ability to create new projects to a select group of administrators who can enforce your organization’s project structure and project naming convention. This guide discusses member permissions in detail in the [Teams and roles section](/docs/guides/account/large-teams#teams-and-roles).
### Plan environments
Each project comes with two default environments: Test and Production. You can make as many additional environments as you need. However, we recommend you destroy temporary environments, such as those you make for automated testing, when you are done using them. This keeps your environment list manageable and easy to use. As with other resources, using a naming convention will help you understand what an environment is for and when it can be deleted.
Connect your SDKs to each environment individually as needed. To learn how, read [Setting up an SDK](/docs/home/getting-started/setting-up).
![An example project with two environments.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/c09d01441fa2485cf8b2513fbc999405729e641a24b3d9b167d97d434ec32a83/assets/images/auto/environment-list.auto.png)
An example project with two environments.
## Teams and roles
Using teams and roles together lets you manage large numbers of LaunchDarkly members at scale, without having to update access and permissions for each individual member.
When considering how to structure your roles and teams, consider the security boundaries you need around your LaunchDarkly resources.
Here are some example boundaries you can use to structure your teams permissions:
 * By production status: permissions scoped to environments. Production environments have more restrictive controls than testing environments, such as requiring approvals.
 * By project: permissions scoped to individual or groups of projects.
 * By component or platform: permissions scoped to specific components within a project, such as “backend.”
 * By person or objective: permissions scoped to flags with a specific purpose, such as “incident response.”
 * By kind: permissions scoped to a kind of flag, such as short-lived release flags or long-lived configuration flags.
### Building teams
Similar to projects and environments, it’s important to decide how you will structure your teams before you start building them. A common approach is to build teams that reflect your permissions structure.
For example, if you have a project called “eCommerce” you might create the following teams:
 * eCommerce: Developer
 * eCommerce: Product owner
 * eCommerce: QA
 * eCommerce: Director
If you have a second project called “Mobile app” you could create analogous teams for this project:
 * Mobile app: Developer
 * Mobile app: Product owner
 * Mobile app: QA
 * Mobile app: Director
Like projects and environments, create and follow a naming convention for teams before you create them. This makes them easier to search for in the teams list and understand their purpose.
Assign each team multiple team maintainers. A team’s maintainer can update and manage the team, without necessarily being a member of that team. Having multiple maintainers ensures that if one person is unavailable or leaves the company, you can still update teams as needed. To learn more, read [Manage team maintainers](/docs/home/account/team-maintainers).
### Creating roles
Roles let you define the precise level of access each team should have to resources in LaunchDarkly.
We recommend creating granular roles that you can mix and match to individual teams as needed. If you have several teams whose members require the same set of permissions, we recommend that you create one role parameterized with a role scope, and assign it to each team with the appropriate scope for that team’s projects. To learn more, read [Using role scope](/docs/home/account/roles/role-scope).
LaunchDarkly’s roles are additive, so if a member has multiple roles, they will receive a superset of the permissions in each individual role. If there are conflicting permissions between roles, the member will receive the more permissive set of permissions. For example, if one role allows access to a project, and another role restricts access to that project, the team member will be able to access the project.
In the following examples, we’ve scoped permissions by project, production status, and role. The naming convention for these roles follows an “Action - Project - Environment” pattern.
These roles would allow these actions:
 * `SDK key viewer - eCommerce - Production`: can view the SDK key, mobile key, and client-side IDs of the eCommerce Production environment
 * `SDK key viewer - eCommerce - Test`: can view the SDK key, mobile key, and client-side IDs of the eCommerce Test environment
 * `Viewer - eCommerce - All`: can view everything in the eCommerce project
 * `Variation manager - eCommerce - All`: can edit flag variations in all environments of the eCommerce project
 * `SDK manager - eCommerce - All`: can view and edit the SDK key, mobile key, and client-side IDs in all environments of the eCommerce project
 * `Release manager - eCommerce - Production`: can view and edit flags and experiments in the eCommerce Production environment
 * `Release manager - eCommerce - Test`: can view and edit flags and experiments in the eCommerce Test environment
 * `Archiver - eCommerce - Production`: can archive flags in the eCommerce Production environment
 * `Archiver - eCommerce - Test`: can archive flags in the eCommerce Test environment
Here is an example of how to build the `SDK key viewer - eCommerce - Production` role in the advanced editor:
SDK key viewer - eCommerce - Production
```
1
| [
---|--- 
2
| {
3
| "effect": "allow",
4
| "actions": ["viewSdkKey"],
5
| "resources": ["proj/ecommerce:env/production"]
6
| }
7
| ]
```
For a full guide on roles, read [Creating roles](/docs/guides/teams-roles/custom-roles).
### Assigning roles to teams
Now that you have created your teams and roles, add at least one role to each team. This way, when you add individuals to teams, they inherit the team’s roles. Their access will automatically update when they’re removed from or added to a new team to reflect their updated teams’ access. To learn more, read [Building teams in LaunchDarkly](/docs/guides/teams-roles/teams).
For example, you might assign all eCommerce teams the `Viewer - eCommerce - All` role, while only assigning the Director and Product owner teams the `Release manager - eCommerce - Production` role.
Another method of granting access is to tag resources certain teams should have access to, then grant those teams permissions on resources with those tags. For example, you could create a `backend` tag and allow access to resources with that tag assigned. However, this method can be brittle and we don’t recommend it in all situations.
You may have many teams and many similar, but not identical, roles you want to apply to them. For example, you may have a “QA” role that you want to apply to many teams, with the only difference being which project the team has access to. We recommend creating one role parameterized by project, then setting the project attribute when you assign the role to each team. To learn more, read [Using role scope](/docs/home/account/roles/role-scope). Alternatively, you can use an Open Policy Agent (OPA) to manage these roles. You can view an example of managing rules using Terraform in the LaunchDarkly Labs [ps-reference-implementation GitHub repo](https://github.com/launchdarkly-labs/ps-reference-implementation).
### Using approvals to manage permissions
There maybe be certain flag actions that you want to restrict within LaunchDarkly. We recommend using approvals, rather than roles, to manage changes to flags. Approvals are a more flexible way of managing changes because multiple people can be in the approving group, so one particular person isn’t required to be available for a change to take effect. To learn more, read [Approvals](/docs/guides/account/large-teams#approvals).
![An approval request.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/82241c9a7812caf81cbba8ea0b1b6aefa8d55b31515e566a8ad032e88da111d4/assets/images/auto/approvals-approval-screen.auto.png)
An approval request.
## Adding members
After you have created your teams and assigned roles to those teams, it’s time to add members to your LaunchDarkly account.
Depending on your SSO provider, you can use SSO with SCIM provisioning to add members to teams at the same time you add the member to LaunchDarkly. This means you can add a member to LaunchDarkly, assign them to a team, and grant them permissions all in one step.
To learn more about enabling SCIM provisioning with Okta and OneLogin, read [Enable SCIM provisioning](/docs/home/account/scim).
If, for some reason, you can’t add members using your SSO provider, you can add members to LaunchDarkly directly, in bulk. However, we recommend this method only if SSO is unavailable. To learn more, read [Add members to LaunchDarkly](/docs/home/account/members#add-members-to-launchdarkly).
## Approvals
You can use approvals to manage changes for resources like flags and segments in certain environments by requiring approval before changes take effect.
To use approvals, you will need to decide:
 * Which environments to require approvals in
 * Whether to use LaunchDarkly or ServiceNow as the approval system
 * Whether to require approvals for all flags and segments within the environment, or only those matching certain tags
 * Whether to automatically apply changes in LaunchDarkly when an associated external change request is approved
 * Whether requestors can approve their own request if they have admin permissions or a role that allows approving changes
 * The minimum number of approvals required per change
 * Whether a member can apply changes if one or more reviewers declines, but at least one member approves
Anyone who has a role with the `reviewApprovalRequest` and `applyApprovalRequest` permissions can review, update, and apply a change. This includes members with the LaunchDarkly Project Admin, Maintainer, Developer, or Contributor project roles, as well as members with a base role of Writer, Admin, or Owner.
Here’s how to build a role with review, update, and apply permissions for approvals for flags in the `production` environment of the `ecommerce` project:
Review and update approval requests
```
1
| [
---|--- 
2
| {
3
| "effect": "allow",
4
| "actions": ["reviewApprovalRequest", "applyApprovalRequest"],
5
| "resources": ["proj/ecommerce:env/production:flag/*"]
6
| }
7
| ]
```
To learn more, read [Approvals](/docs/home/releases/approvals).
## Managing flags
As with projects, environments, and teams, we strongly recommend creating flag naming and flag key conventions before you begin creating flags. Your team members should know what behavior the flag controls and how it will change just by looking at the flag name and its variations. Creating a comprehensive and well-documented naming convention requires some initial effort, but results in members being able to quickly and easily find flags, name flags, and understand their purposes. To learn how, read [Flag conventions](/docs/guides/flags/flag-conventions).
Set flag maintainers to teams, rather than individuals. To learn how, read [Flag settings](/docs/home/flags/flag-settings). This helps encourage shared ownership of a flag, and you can update the flag maintainer to a new team as the flag moves through its lifecycle. As the flag nears the end of its lifecycle, the maintaining team is responsible for archiving it and removing it from your codebase using code references.
### Migrating from your existing solution
As part of adopting LaunchDarkly, you may be migrating from an existing homegrown or third-party feature-flagging application. For a guide on how to do this, read [Migrating your existing feature flag solution to LaunchDarkly](/docs/guides/account/migrating-solutions).
### Code references
This is also a good time to start thinking about how to manage technical debt in the long term. Using code references is essential for managing flag debt. Code references identify where your codebase uses flags and automatically update references with every commit. You can view code references to check how a flag is used in your code and remove them when you no longer need them.
To learn about the different CI/CD providers LaunchDarkly integrates with, read [Code references](/docs/home/flags/code-references).
![The "Code references" section of a feature flag.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/63cf303b64f7d39f099930445161a160996827f4024918f21d6137d8b84e7edf/assets/images/__LD_UI_no_test/flag-code-references.png)
The "Code references" section of a feature flag.
After you set up code references, establish a regular schedule or procedure for reviewing and removing stale flags from your code. For suggestions and best practices, read [Reducing technical debt from feature flags](/docs/guides/flags/technical-debt).
## Context kinds and attributes
Custom contexts let you create targeting rules for feature flags based on whatever entity type you need to target. For example, if you typically target mobile phones and tablets with your feature flags, you will likely want to use a custom context kind of “device.” If you’re a business-to-business (B2B) company that targets organizations rather than devices, you may want to target a custom context kind of “organization.” There is no limit to the number of context kinds you can use, and you can target multiple kinds at once using multi-contexts. To learn more, read [Contexts](/docs/home/flags/contexts).
![Different context kinds on the Contexts list.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/406805a241c05c866b636d758bc76e78911ed05b07d0d80e3ad4bb0c097cd320/assets/images/auto/contexts-list.auto.png)
Different context kinds on the Contexts list.
Before you start creating custom context kinds, create a naming convention for your contexts and context attributes. Although you may use a limited number of context kinds, you may want to add many attributes, and a naming convention will help keep their meaning clear across teams. Context attribute names are case-sensitive, so it’s important for different teams to use them consistently.
### Context attributes
`kind`, `key`, `name`, and `anonymous` are the only built-in context attributes. A value for `kind` and `key` are required.
You can create custom context attributes to capture whatever additional data you need about your contexts. `firstName`, `email`, `location`, and `deviceType` are all examples of custom attributes. To learn more, read [Context attributes](/docs/home/flags/context-attributes).
This table includes examples of context kinds and possible custom attributes:
Context kind | Use | Attributes 
---|---|--- 
`User` | Authenticated user sessions | `key`: universally unique identifier (UUID) 
`anonymous`: always false 
`name`: first and last name 
`created-at`: date the SDK created the user 
`Session` | Unauthenticated user sessions | `key`: random UUID stored in session-bound storage 
`anonymous`: always true 
`Application` | Application or service metadata | `key`: per instance/process UUID 
`application-name`: name of the application or service 
`application-version`: application version loaded from manifest 
`build-timestamp`: date the build artifact was created 
`Platform` | Information about the platform, operating system, and device | `key`: device ID 
`device`: device identifier 
`device-vendor`: vendor of the device 
`device-kind`: type of device 
`os`: operating system 
`browser-vendor`: vendor of the browser 
`browser-version`: semantic version of the browser 
`Request` | Request- or transaction-specific metadata, often populated from HTTP headers | `key`: request ID 
`request-path`: HTTP request path 
`request-method`: HTTP request method 
`request-client`: name of the requesting client application 
`api-version`: API version from the X-API version header 
Use private attributes when you target on personally identifiable information (PII) or other sensitive data. To learn how to mark attributes as private, read [Using private context attributes](/docs/home/flags/private-context-attributes).
## Experimentation
If you plan to use LaunchDarkly’s Experimentation product, decide on what types of experiments you want to run, and on what kind of flags.
Some questions to consider include:
 * What types of flags will you run experiments on?
 * Who will be in charge of creating, starting, and stopping experiments?
 * What type of metrics do you want to measure?
To learn more, read [Designing experiments](/docs/guides/experimentation/designing-experiments).
## Integrations
The larger your organization is, the harder it can be for disparate teams to know what a particular flag is for. Having an easy way to find out exactly what a flag does is important, particularly when experiencing an incident or when things aren’t behaving as expected. Integrations can help with this visibility.
We recommend setting up the following integrations:
 * Slack or Microsoft Teams
 * An APM tool
 * Flag links
 * Terraform, if it is already part of your existing workflow
### Slack or Microsoft Teams
If you use Slack or Microsoft Teams, you can receive flag change notifications, toggle flags on or off, manage approval requests, and more, depending on your integration. These tools can help disparate teams understand updates to relevant flags as they happen. To learn more, read [Collaboration tools](/docs/integrations/collaboration).
### Observability and APM tools
Observability and application performance management (APM) tools make it possible to surface flag change events and display them in context with other events or metrics you’re monitoring. You can use these tools to catch when flagged code introduces bugs. To read about example tool uses, read [Diagnose flag-related performance changes](/docs/guides/integrations/integrations-use-cases#diagnose-flag-related-performance-changes).
To learn about observability and APM tools that LaunchDarkly integrates with, read [Observability tools](/docs/integrations/observability).
### Flag links
Flag links are another useful way to connect relevant information about your flags to the flag itself. If you use Slack, Jira, or Trello as part of your workflow, integrating with LaunchDarkly lets you easily attach Slack conversations, Jira tickets, or Trello boards to specific flags. You can also manually create flag links using a URL. To learn how, read [Flag links](/docs/home/flags/links).
### Terraform
If you use Terraform, you can use the LaunchDarkly Terraform provider to manage LaunchDarkly resources as Terraform resources. This lets you use Terraform scripts to configure and control feature flags, environments, projects, teams, and more. You can also build Terraform modules that make resources like roles repeatable. To learn more, read [Terraform](/docs/integrations/terraform).
## SDK wrappers
An SDK wrapper is a data type or struct that acts as a [facade](https://en.wikipedia.org/wiki/Facade_pattern) around the LaunchDarkly SDK. We strongly recommend that you use an SDK wrapper to standardize interactions between LaunchDarkly SDKs and your codebase. Your application source code will use the wrapper instead of directly interfacing with our SDK APIs, simplifying your workflow by making the SDK easier to use and more accessible to your codebase.
Wrappers help standardize your teams’ usage of LaunchDarkly because they automate configuration options for your developers, increasing onramp speed and simplifying SDK usage. They also help you implement consistent practices for your internal policies around features like proxies, streaming versus polling, naming conventions, and private attributes.
For example, you can write an SDK wrapper that lets you call `FlagRollout` instead of `BoolVariation`. If you’re working with multiple SDKs, you can write a wrapper that calls the SDK with some pre-defined limitations to standardize the call. For more information about what you can use SDK wrappers for, read [Use cases for SDK wrappers](/docs/guides/sdk/sdk-wrappers).
The earlier you implement an SDK wrapper, the better. They don’t have to start with much, or any, functionality, but after they are in place it’s easy to add functions to the wrapper later.
## Professional services
After you decide to invest in LaunchDarkly, investing in available professional services can help ensure you’re configuring the app in a way that will be sustainable over the long term.
In particular, we recommend these services to make sure that your platform and your application are ready to launch:
 * [LaunchDarkly Platform Readiness](https://launchdarkly.com/platform-readiness/)
 * [LaunchDarkly Application Readiness](https://launchdarkly.com/application-readiness/)
To help with onboarding, you may also be interested in our [LaunchDarkly Academy](https://academy.launchdarkly.com/).
## LaunchDarkly hub
As you finish configuring LaunchDarkly, you may want to create a “hub” or “cheat sheet” that serves as a central location for information about adopting LaunchDarkly as a new user. This document might include information about how to get started, where to find technical support, which SDKs you’re using, links to relevant guides, and FAQs.
Expand the section below to view an example hub template. You can copy and edit the template as needed:
###### LaunchDarkly hub template example
### Introduction
As our approved vendor for feature flagging and feature management, LaunchDarkly aims to provide a first-class solution to releasing software safely and efficiently. LaunchDarkly manages individual feature exposure/release, allowing independent control for enablement/disablement and shifts feature releases to product managers and away from engineers. In addition to individual “toggles” to control features, we can serve hyper-personalized experiences to different user groups with LaunchDarkly’s targeting tools.
### Getting started
Here are some resources to help you get started with LaunchDarkly:
Topic | Resources 
---|--- 
LaunchDarkly-provided documentation | [Getting started](/docs/home/getting-started) 
Licenses | Enterprise-wide licenses are available for immediate use. 
General access | Available for all employees and applications 
Trying out LaunchDarkly | Because the platform is fully available, there is no need to conduct a trial before onboarding. Refer to the Onboarding new team members section below for instructions. 
Creating a new project and team | To use LaunchDarkly, you need to have a [project](/docs/home/account/project) for your application and a corresponding [team](/docs/home/account/teams) that has been provisioned the appropriate role permissions to access that project. To create a new project, submit an internal ticket request with _admin team_ using _internal process_. You must have the following:
 * The application ID where you’d like to use LaunchDarkly feature flags
 * The name of the engineering team that will be contributing to your project.
 * An identified [team maintainer](/docs/home/account/team-maintainers) who has completed the new team member onboarding
If you have specific project configuration requirements, such as additional [environments](/docs/home/account/environment), include those environment names in your new project creation request. 
Onboarding new team members | Individuals seeking access to LaunchDarkly must complete the relevant onboarding training in the [LaunchDarkly Academy](https://academy.launchdarkly.com/page/customer-success-program). By default, your license will be restricted to “no access” until you’ve been assigned a role by _admin_ and added to a LaunchDarkly team. 
Through _ticket system_ , request access to LaunchDarkly by following these steps: _insert steps_. After access has been approved and you have been assigned the appropriate role and team, _insert internal process_. 
Changing Roles | _insert internal process_ 
### Technical support
Here are some technical support resources:
Topic | Resources 
---|--- 
Opening a new Support ticket | Open a Support ticket in one of three ways:
 * Submit a ticket using the [LaunchDarkly ticketing system](https://support.launchdarkly.com/hc/en-us/requests/new)
 * Email support@launchdarkly.com
 * In the LaunchDarkly app, click the **?** icon and select “Create a support ticket”
Status | Subscribe to text, email, Slack, and webhook alerts from the [LaunchDarkly status page](https://status.launchdarkly.com/) 
### SDKs
Here are the LaunchDarkly SDKs we use _(examples, update as needed. We recommend using[wrappers](/docs/guides/account/large-teams#sdk-wrappers) with all of your SDKs.)_:
SDK | Documentation | Our implementation status 
---|---|--- 
JavaScript | [JavaScript SDK reference](/docs/sdk/client-side/javascript) | Complete 
Node.js (server-side) | [Node.js SDK reference (server-side)](/docs/sdk/server-side/node-js) | In progress 
Go | [Go SDK reference](/docs/sdk/server-side/go) | Planned 
### Integrations and architecture
This table lists the integrations and architecture tools we use with LaunchDarkly _(examples, update as needed)_ :
Function | Integration or tool | Link to instructions 
---|---|--- 
Observability | _Add your[observability integration](/docs/integrations/observability) if applicable, such as Datadog or Honeycomb_ | 
 * _LaunchDarkly integration documentation link_
 * _Internal documentation link_
Collaboration | _Add your[collaboration integration](/docs/integrations/collaboration) if applicable, such as Slack or Microsoft Teams_ | 
 * _LaunchDarkly integration documentation link_
 * _Internal documentation link_
Workflow management | _Add your[workflow management integration](/docs/integrations/workflow) if applicable, such as ServiceNow or Jira_ | 
 * _LaunchDarkly integration documentation link_
 * _Internal documentation link_
Code references | _Add your[code references integration](/docs/home/flags/code-references) if applicable, such as GitHub or Bitbucket_ | 
 * _LaunchDarkly integration documentation link_
 * _Internal documentation link_
REST API | LaunchDarkly REST API endpoints | 
 * [LaunchDarkly REST API documentation](/docs/api)
 * _Internal documentation link_
Data Export | LaunchDarkly Data Export tool | 
 * [LaunchDarkly Data Export documentation](/docs/integrations/data-export)
 * _Internal documentation link_
_Add more integrations as needed_ | _Add as needed_ | 
 * _LaunchDarkly integration documentation link_
 * _Internal documentation link_
### Example use cases
Here are some example use cases of LaunchDarkly:
 * [Using entitlements to manage customer experience](/docs/guides/flags/entitlements)
 * [Deployment and release strategies](/docs/guides/infrastructure/deployment-strategies)
 * [Integrations use cases](/docs/guides/integrations/integrations-use-cases)
### Administration
The following individual are in charge of LaunchDarkly administration:
 * Owner: _name and contact_
 * Architecture and engineering representative: _name and contact_
 * Operations manager: _name and contact_
 * Technical specialists: _name and contact_
 * LaunchDarkly account team: _name and contact_
### Additional resources
Here are some additional resources:
 * [LaunchDarkly documentation](/docs/home)
 * Learning & Enablement:
 * [LaunchDarkly Academy](https://academy.launchdarkly.com/)
 * [Self-serve modules](https://academy.launchdarkly.com/page/self-guided-training)
 * [On-demand Tech Talks](https://academy.launchdarkly.com/page/on-demand-tech-talks)
 * [Calendar](https://academy.launchdarkly.com/page/live-training) for live office hours, tech talks, and 101 sessions
 * [Certifications](https://academy.launchdarkly.com/page/certifications)
 * [Guides](/docs/guides)
 * [Blog](https://launchdarkly.com/blog/)
 * [Developer community](https://developers.launchdarkly.com/)
### FAQs
This table includes frequently-asked questions and their answers _(examples, update as needed)_ :
Question | Answer 
---|--- 
How do I get started with an SDK? | Read the [SDKs](/docs/guides/account/large-teams#sdks) section for links to get started with each of our SDKs. 
What are security considerations for client-side implementation? | Client-side SDKs run on customers’ own devices. They can be compromised by users who unpack a mobile app to examine the SDK bytecode or use their browser’s developer tools to inspect internal site data. As a result, you should never use a server-side SDK key in a client-side or mobile application. 
Client-side SDKs are configured to operate for a singular context. When requested, these SDKs delegate the flag evaluation task to LaunchDarkly. LaunchDarkly’s services are responsible for evaluating flag rules for the specific context. Then, through either the SDK’s streaming or polling connections, LaunchDarkly notifies the SDK of the evaluation results. The SDK then stores these results for quick lookup by the host applications. 
For security reasons, client-side SDKs cannot download and store an entire rule set. Client-side SDKs typically run on customers’ own devices, so they are vulnerable to having users investigate SDK content. Instead of storing potentially sensitive data, the client-side SDKs confirm and update flag rules by communicating with LaunchDarkly servers through streaming connections or with REST API requests. 
This approach is also beneficial from a data management perspective. Client-side SDKs bandwidth requirements are lower than server-side SDK requirements because LaunchDarkly sends client-side SDKs less data. For more information, read [About the different types of SDKs](/docs/sdk/concepts/client-side-server-side#about-the-different-types-of-sdks). 
What is the impact of downtime of the LaunchDarkly service? | Pre-initialization: if the SDK ever loses connectivity to LaunchDarkly, it continues to try to establish a streaming connection until it succeeds. If you evaluate a flag before the SDK receives its initial state, or you try to fetch a flag which otherwise doesn’t exist, then the SDK returns the fallback value that you’ve specified in the flag’s settings. All SDKs provide synchronous and asynchronous ways of waiting for the SDKs state to initialize. 
Post-initialization: if the SDK loses the connection with LaunchDarkly post-initialization, your feature flags will still work. The SDK relies on its stored state to evaluate flags. 
## Conclusion
In this guide, you learned about the planning steps necessary to implement LaunchDarkly for your large enterprise organization. Carefully planning account configuration is important for a smooth and successful implementation.
Here are further resources to assist with implementing LaunchDarkly at scale:
 * [An introduction to contexts](/docs/home/flags/contexts/intro)
 * [Designing experiments](/docs/guides/experimentation/designing-experiments)
 * [Managing flags with Terraform](/docs/guides/infrastructure/terraform)
 * [About LaunchDarkly integrations](/docs/guides/integrations/using-integrations)
 * Blog post: [The five stages of feature flag adoption](https://launchdarkly.com/blog/the-five-stages-of-feature-flag-adoption/)
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs