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
 * [Members](#members)
 * [Teams](#teams)
 * [Roles](#roles)
 * [Policies](#policies)
 * [Identity provider](#identity-provider)
 * [Single sign-on](#single-sign-on)
 * [SCIM](#scim)
 * [Review LaunchDarkly preset roles](#review-launchdarkly-preset-roles)
 * [Create your own roles](#create-your-own-roles)
 * [Map LaunchDarkly roles to your organization](#map-launchdarkly-roles-to-your-organization)
 * [Write your own roles](#write-your-own-roles)
 * [Use LaunchDarkly teams to manage permissions](#use-launchdarkly-teams-to-manage-permissions)
 * [Use roles with your IdP](#use-roles-with-your-idp)
 * [Conclusion](#conclusion)
##### Creating your own roles is available to customers on select plans
Creating your own roles is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This guide explains best practices for creating and managing roles, and how to use a single-sign-on (SSO) provider for cross-domain identity management (SCIM) provisioning.
You can enforce permissions or restrictions regarding projects, environments, and other resources using roles. After you configure them, you can manage roles with your SSO administration rather than in the LaunchDarkly application.
This guide covers:
 * [Understanding preset roles in LaunchDarkly](/docs/guides/teams-roles/custom-roles#review-launchdarkly-preset-roles)
 * [Creating your own roles](/docs/guides/teams-roles/custom-roles#create-your-own-roles)
 * [Mapping your current roles](/docs/guides/teams-roles/custom-roles#map-launchdarkly-roles-to-your-organization)
 * [Using teams to manage permissions](/docs/guides/teams-roles/custom-roles#use-launchdarkly-teams-to-manage-permissions)
 * [Using roles with specific IdPs](/docs/guides/teams-roles/custom-roles#use-roles-with-your-idp)
## Prerequisites
To complete this guide, you must have the following prerequisites:
 * An Admin or Owner base role in your LaunchDarkly account, or another role with [team management permissions](/docs/home/account/roles/role-actions#team-actions).
 * A basic understanding of roles within LaunchDarkly. To learn more, read [Roles](/docs/home/account/roles).
 * Access to the SSO and SCIM configuration at your organization and the identity provider (IdP) you use. To learn more, read [Single sign-on](/docs/home/account/sso).
##### Using SSO with custom roles is available to customers on select plans
Using SSO with custom roles is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Concepts
You should understand these concepts before reading this guide:
### Members
Account members are people who work at your organization or have access rights to your organization’s LaunchDarkly environment for another reason, such as contractors or part-time employees.
To learn more about members, read [Members](/docs/home/account/members).
### Teams
Teams are groups of your organization’s members. A LaunchDarkly account administrator can give specific permissions to teams with roles that let them perform actions on different resources, such as projects or flags.
To learn more about teams, read [Teams](/docs/home/account/teams).
### Roles
Roles enable organizations to define granular permissions of actions that an account member is allowed to perform, or is blocked from performing, in LaunchDarkly.
Every LaunchDarkly account has several [preset roles](/docs/home/getting-started/vocabulary#preset-roles). To learn more about preset roles, read [Organization roles](/docs/home/account/roles/organization-roles) and [Project roles](/docs/home/account/roles/project-roles).
Some organizations prefer to use roles that they create instead of LaunchDarkly’s preset roles. To learn more, read [Roles](/docs/home/account/roles).
### Policies
A policy in LaunchDarkly is a set of actions a role can or cannot take. Each policy is a list of statements allowing or denying an account member access to resources and actions within LaunchDarkly.
Policies can be direct or inverse. A direct policy allows or denies access to the resource defined. An inverse policy allows or denies actions for all resources except the one listed.
###### Expand direct policy example
This policy allows all actions within the production environment:
Direct policy
```
1
| [
---|--- 
2
| {
3
| "effect": "allow",
4
| "actions": ["*"],
5
| "resources": ["proj/*:env/production:flag/*"]
6
| }
7
| ]
```
###### Expand inverse policy example
This policy allows all actions across all environments except production:
Inverse policy
```
1
| [
---|--- 
2
| {
3
| "effect": "allow",
4
| "actions": ["*"],
5
| "notResources": ["proj/*:env/production:flag/*"]
6
| }
7
| ]
```
To learn more about policies, read [Using policies](/docs/home/account/roles/role-policies).
### Identity provider
An identity provider (IdP) is a service that creates, maintains, and manages members’ digital identities and permissions to use applications and services. It functions as a directory, sharing credentials with digital services and devices. IdPs communicate over Security Assertion Markup Language (SAML) or Open Authorization (OAuth).
To learn more about IdP configuration, read [Configure SAML SSO](/docs/home/account/saml).
### Single sign-on
Single sign-on allows members to access multiple applications with a single set of login credentials. SSO can be deployed with an IdP to manage credentials and authentication to applications.
### SCIM
SCIM is a standard for automating the exchange of information between identity domains, or IT systems.
The SSO workflow within LaunchDarkly creates a new member if they sign in with the IdP and the IdP can pass a role. SCIM allows you to pass a role when creating and managing members as an admin.
To learn more about SCIM, read [Enable SCIM provisioning](/docs/home/account/scim).
## Review LaunchDarkly preset roles
When you are ready to configure roles for your organization, start by reviewing LaunchDarkly’s preset roles. This way, you can determine whether the provided roles meet your organization’s needs.
In some cases, the preset roles use [role scope](/docs/home/getting-started/vocabulary#role-scope) to specify resources. A role scope is a resource type by which a role is a parameterized. When you assign the role to a member or team, you specify the parameter, which is a called a [role attribute](/docs/home/getting-started/vocabulary#role-attribute).
For example, the preset project role “LaunchDarkly Developer” can perform all actions on projects specified in the `developerProjectKeys` parameter. This means you can assign the Developer role to a member and give them access to a one or more projects of your choosing using the preset role.
In many situations, the LaunchDarkly preset roles will provide all the custom access you need.
You can also use the preset roles as a starting point. For example, you can add additional policy statements to them.
## Create your own roles
If you have reviewed LaunchDarkly’s preset roles and determined that your organization needs something different, you can also create your own roles.
When you create a new role, the role allows no access to any resources. You must explicitly grant access to a resource for a member with the role to view or edit that resource.
To learn how to create your own roles, read [Creating roles and policies](/docs/home/account/roles/role-create). For additional examples of roles you may find useful, read [Example roles and policies](/docs/home/account/roles/example-roles).
For some actions, access must be granted across all environments to function properly. These actions include:
 * `createFlag`
 * `deleteFlag`
 * `updateIncludeInSnippet`
 * `updateName`
 * `updateDescription`
 * `updateTemporary`
 * `updateTags`
 * `updateMaintainer`
 * `updateFlagVariations`
 * `updateFlagCustomProperties`
To learn more, read [Using actions](/docs/home/account/roles/role-actions).
## Map LaunchDarkly roles to your organization
Now that you are familiar with LaunchDarkly’s preset roles and know how to create your own roles, you can begin thinking about your organization’s specific needs. Scoping the different roles, teams, and permissions your organization uses will help you create a policy structure that’s scalable and easy to implement.
Some questions to consider include:
 * How are units at your organization structured?
 * Do you use LaunchDarkly’s [teams feature](/docs/guides/teams-roles/custom-roles#use-launchdarkly-teams-to-manage-permissions)?
 * Do you have separate QA, Dev, and Production units?
 * What level of access do you need for Engineering leads, QA, support, etc.?
 * Do you have a tech lead for each project?
 * Do your members need access to multiple projects?
 * Should members be able to view projects that aren’t their own, or that they aren’t working on?
 * What environments do you use within each project?
 * Do projects change frequently or do they last indefinitely?
 * Do you need separate roles for permissions at the flag level, project level, and environment level?
 * Do you have an internal approval process for enabling flags in Production?
 * Do external organizations ever toggle flags?
 * Who will be responsible for maintenance and future access control?
 * Do you need policies for service tokens?
 * Who should be able to rotate keys?
Account members can have more than one role. This is useful if one person performs multiple roles, or performs the same role for many different teams. For example, if an engineer works on several projects but should have no access to projects they are not working on, you could assign them LaunchDarkly “Developer” preset role and specify the projects they have access to. If an engineer is also a tech lead on only certain projects, you may want to assign them both a “Tech lead” role and a “Developer/QA” role that you create. Assigning multiple roles can make it easier to add and remove sets of permissions as an account member’s duties change.
If two roles have conflicting permission levels, the more permissive level of access is applied. For example, if a member has one role that allows access to a resource, and another role that denies access to that resource, the member is granted access.
If you don’t want to worry about conflicting permissions within multiple roles, you may want to create additional roles, such as a “Tech lead + QA” role, that includes access needed for both. This eliminates the complexity of managing multiple roles per member, but requires that you create more roles up front to cover all of the possible role combinations.
### Write your own roles
There are a few ways to approach writing your own roles:
 * Allow no access by default, then strategically allow actions as needed
 * Allow all actions by default, then strategically deny actions as needed
###### Expand No access by default
Allowing no access by default is the most secure. LaunchDarkly roles are no access by default, so your LaunchDarkly administrators must modify your role policies to allow individual actions. However, this can create additional work for your administrators, as they must explicitly add permissions to roles each time LaunchDarkly releases a new feature.
Here is an example of a role that explicitly allows actions only on certain resources:
View-only by default
```
1
| [
---|--- 
2
| {
3
| "effect": "allow",
4
| "actions": [
5
| "viewProject"
6
| ],
7
| "resources": ["proj/public"]
8
| },
9
| {
10
| "effect": "allow",
11
| "actions": [
12
| "deleteFlag",
13
| "updateTargets",
14
| "updateRules"
15
| ],
16
| "resources": ["proj/public:env/*;sandbox,prod:flag/*"]
17
| },
18
| {
19
| "effect": "allow",
20
| "actions": ["*"],
21
| "resources": ["proj/public:env/*;sandbox,prod:segment/*"]
22
| }
23
| ]
```
##### Older custom roles may have read-only access to all resources by default
By default, new roles cannot take any actions on any resources. However, roles created prior to October 2024 had the option to use the Reader base role as their starting point, rather than starting with no access.
To check whether this applies to any of your existing roles, edit the role and look for the warning statement “This role currently has base permissions set to Reader. Members can view all LaunchDarkly content.” Uncheck the box to update the role so that it starts with no access and only allows actions based on the statements in its policy.
![The warning statement on an older custom role, indicating it includes Reader access.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/0c6ebbf2a0144b984fc3368f79239a567e056226aba47109ac2f06d934068da4/assets/images/auto/custom-roles-base-permissions-checkbox.auto.png)
The warning statement on an older custom role, indicating it includes Reader access.
###### Expand Allow all actions by default
Allowing all actions by default automatically allows members access to new features as they are released. However, we do not consider this a best security practice, because all members, regardless of role, are automatically granted access to new features. Administrators will need to explicitly deny access to new features in role policies as needed.
Here is an example of a role that allows all actions, then explicitly denies actions on certain resources in the last statement:
Allow all actions by default
```
1
| [
---|--- 
2
| {
3
| "effect": "allow",
4
| "actions": ["*"],
5
| "resources": ["proj/*"]
6
| },
7
| {
8
| "effect": "allow",
9
| "actions": ["*"],
10
| "resources": ["proj/*:env/*"]
11
| },
12
| {
13
| "effect": "allow",
14
| "actions": ["*"],
15
| "resources": ["proj/*:metric/*"]
16
| },
17
| {
18
| "effect": "allow",
19
| "actions": ["*"],
20
| "resources": ["member/*"]
21
| },
22
| {
23
| "effect": "allow",
24
| "actions": ["*"],
25
| "resources": ["member/*:token/*"]
26
| },
27
| {
28
| "effect": "allow",
29
| "actions": ["*"],
30
| "resources": ["pending-request/*"]
31
| },
32
| {
33
| "effect": "allow",
34
| "actions": ["*"],
35
| "resources": ["role/*"]
36
| },
37
| {
38
| "effect": "allow",
39
| "actions": ["*"],
40
| "resources": ["proj/*:env/*:flag/*"]
41
| },
42
| {
43
| "effect": "allow",
44
| "actions": ["*"],
45
| "resources": ["integration/*"]
46
| },
47
| {
48
| "effect": "allow",
49
| "actions": ["*"],
50
| "resources": ["proj/*:env/*:segment/*"]
51
| },
52
| {
53
| "effect": "allow",
54
| "actions": ["*"],
55
| "resources": ["webhook/*"]
56
| },
57
| {
58
| "effect": "allow",
59
| "actions": ["*"],
60
| "resources": ["proj/*:context-kind/*"]
61
| },
62
| {
63
| "effect": "allow",
64
| "actions": ["*"],
65
| "resources": ["code-reference-repository/*"]
66
| },
67
| {
68
| "effect": "allow",
69
| "actions": ["*"],
70
| "resources": ["proj/*:env/*:destination/*"]
71
| },
72
| {
73
| "effect": "allow",
74
| "actions": ["*"],
75
| "resources": ["acct"]
76
| },
77
| {
78
| "effect": "deny",
79
| "actions": [
80
| "updateOn",
81
| "updatePrerequisites",
82
| "updateRules",
83
| "updateTargets",
84
| "updateFallthrough",
85
| "updateOffVariation",
86
| "updateAttachedGoals",
87
| "copyFlagConfigFrom",
88
| "updateFlagDefaultVariations",
89
| "copyFlagConfigTo",
90
| "updateMaintainer"
91
| ],
92
| "resources": ["proj/team-1:env/*;production:flag/*"]
93
| }
94
| ]
```
## Use LaunchDarkly teams to manage permissions
##### Teams are available to customers on select plans
Teams are only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
Teams help large organizations to manage their members and access in LaunchDarkly more easily. Instead of assigning roles to individual members, you can assign a role to a team, then add members to the team. If you update or add permissions to the team, all the team members inherit those permissions automatically. To learn how to add roles to a team, read [Assigning roles to teams](/docs/home/account/roles/manage-role-team).
Removing members from the team revokes any permissions the team granted to them. To learn how to add or remove members from a team, read [Manage team members](/docs/home/account/manage-teams#manage-team-members).
To learn more about best practices when using teams, read [Building teams in LaunchDarkly](/docs/guides/teams-roles/teams).
## Use roles with your IdP
##### Using SCIM to provision members
If you use SCIM to provision members, you will create the roles in LaunchDarkly, but you must configure and manage your account members in the IdP. To learn more, read [Enable SCIM provisioning](/docs/home/account/scim).
With your roles designed and built, you can now manage them using SSO and your IdP.
When you pass account member information into LaunchDarkly from your IdP, you can include the key of the member’s role in a `customRole` attribute, along with their other profile information such as name and email address, if you want to update those fields. To learn more about the `customRole` attribute, read [Roles](/docs/home/account/roles).
The fields and methods you must use to pass role information to LaunchDarkly differ depending on your IdP. We provide configuration guidance for the following IdPs:
 * Active Directory Federation Services (ADFS)
 * Entra ID
 * Google Apps
 * Okta
 * OneLogin
###### Expand ADFS details
You can map LaunchDarkly custom role attributes to ADFS using a Claim issuance Policy. To learn how, read [Configure custom roles](/docs/home/account/adfs#configure-custom-roles).
After your policy is set up, you can assign members to custom role groups using the **Member of** tab within the ADFS user properties window.
###### Expand Entra details
You can map LaunchDarkly `role` and `customRole` attributes to Entra using Entra claims. `role` and `customRole` can be mapped using any unused Entra source attribute. To learn how, read [Map custom roles to Entra user attributes](/docs/home/account/entra#map-custom-roles-to-entra-user-attributes).
After your `role` and `customRole` attributes are mapped, include the key of the role for each account member in the mapped fields.
###### Expand Google Apps details
Before you create the LaunchDarkly app in GSuite, you must create LaunchDarkly-specific fields for roles and custom roles. To learn how, read [Assign roles and custom roles with Google Apps](/docs/home/account/google#assign-roles-and-custom-roles-with-google-apps).
After your `role` and `customRole` attributes are mapped, include the key of the role for each account member in the mapped fields.
###### Expand Okta details
You can assign custom roles that you created in LaunchDarkly to members through the Okta user interface (UI). To learn how, read [Assign custom roles in Okta](/docs/home/account/okta#assign-custom-roles-in-okta).
###### Expand OneLogin details
You can assign custom roles that you created in LaunchDarkly to members through the OneLogin UI. To learn how, read [Add users and set roles in OneLogin](/docs/home/account/onelogin#add-users-and-set-roles-in-onelogin).
To learn more, read [Configure SAML SSO](/docs/home/account/saml).
## Conclusion
In this guide you have learned about creating roles for use within your organization. Using roles with an IdP gives you the security and flexibility you need to easily manage roles, permissions, and account members.
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Learn to use LaunchDarkly with the app's built-in quick start guide. You'll discover how easy it is to manage the whole feature lifecycle from concept to launch to control. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs