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
 * [Benefits of using views](#benefits-of-using-views)
 * [Prerequisites](#prerequisites)
 * [Create views](#create-views)
 * [Assign access based on views](#assign-access-based-on-views)
 * [Use views from the list pages](#use-views-from-the-list-pages)
 * [Manage views with Terraform](#manage-views-with-terraform)
 * [Next steps](#next-steps)
##### This feature is for Early Access Program customers only
Views are under active development and are only available to members of LaunchDarkly’s Early Access Program (EAP). To request access to this feature, contact your LaunchDarkly account manager.
## Overview
This topic explains how to start using views. Views let you logically group flags and segments within a project. You can also control access to these resources using views.
For example, you can use views to group flags according to the teams in your organization and the features they work on. A flag can be linked to more than one view.
## Benefits of using views
The benefits of using views include:
 * **Consistency and security** : Views allow you to organize and control access to sets of resources within a single project.
 * **Reduced complexity** : When you restrict access to sets of resources, members of your organization can focus on just the items they work with. You can have multiple views per project, which means you can give multiple sets of developers access to some of the same resources if needed.
 * **Improved scalability** : Many organizations depend on the benefits of having all of their flags in a single project. For instance, using [flag prerequisites](/docs/home/flags/prereqs) requires all flags in a dependency chain to be in the same project. Using views means you can continue to use a single project, while limiting access to flags and related resources within that project.
## Prerequisites
Before you can use views, you must contact your LaunchDarkly account manager and request to join the Early Access Program (EAP).
Members with an Admin, Owner, or Writer [base role](/docs/home/account/roles/role-concepts#base-roles) automatically have access to creating and managing views. After you create the views you want in each project, you can create roles that assign access within the project based on each view.
## Create views
We recommend having one member, such as an architect or tech lead, create views for a given project.
To create a new view and link flags to it:
 1. Click the project dropdown. The project menu appears.
 2. Select **Project settings**.
 3. Select **Views**. The Views list appears:
![The Views list in project settings.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/089750a1139d6056c2ff121a0c32625fa959ee7c52f7591889bd7de115453fe3/assets/images/__toPlaywright_newIA/views-proj-settings-list.png)
The Views list in project settings.
 4. Click **Create view**. The “Create view” dialog appears:
![The "Create view" dialog.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a2d8abe4f756000f21540ca1dfef16d84c53d6cff5399a6ba9a4328d22ee0e09/assets/images/__toPlaywright_newIA/views-create-view-dialog.png)
The "Create view" dialog.
 5. Enter a unique, human-readable **Name** for the view.
 6. (Optional) Update the view **Key**. A suggested key auto-populates from the name you enter, but you can customize it if you wish.
 7. (Optional) Enter a **Description**.
 8. (Optional) Click **Add tags**. Enter a tag name to search for an existing tag or create a new one with that name.
 9. (Optional) Click **Choose maintainer** to set the maintainer of the view.
 10. Click **Create & link flags**. The “Link flags” dialog appears.
 11. Check the flags that you want to include in the view. You can add any segments after you finish creating the view.
 12. Click **Update linked flags**.
You can also create a view and then link flags and segments later. To create a view without linking any resources, follow steps 1-9 in the procedure above, and then click **Create view & close**.
## Assign access based on views
We recommend assigning most members, such as software engineers and product managers, access to the flags and segments they need based on the view that those items are linked to.
For example, to assign access to flags in a particular view, create a role with access to all actions on flags in that view and project.
Here’s how:
Allow access to flags in the "frontend" view in the "default" project
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
| "resources": ["proj/default:env/*:flag/*;view:frontend"]
6
| }
7
| ]
```
For additional examples, read [Use views in complex policy statements](/docs/home/account/roles/role-scope#use-views-in-complex-policy-statements).
If you use views to restrict access to sets of flags, it may be helpful to require that flags are associated with a view. One way to enforce this is to create a role that allows the `createFlag` action only within a particular view.
Here’s an example:
Only allow flag creation in the "frontend" view in the "default" project
```
1
| [
---|--- 
2
| {
3
| "effect": "allow",
4
| "actions": ["createFlag"],
5
| "resources": ["proj/default:env/*:flag/*;view:frontend"]
6
| }
7
| ]
```
## Use views from the list pages
From the **Flags** list and **Segments** list in the LaunchDarkly UI, you can use the **View** menu to show only those items that are linked to selected views. For example, here is an image of the **Flags** list showing only flags that are linked to selected views:
![The "Flags" list, showing flags in one view, with the "View" menu called out.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/fb6746d82aab4a4b33ea486508ebe0c272097a49cfe440285e147280ba4ae7a5/assets/images/__LD_UI_no_test/views-flags-list-view-menu-callout.png)
The "Flags" list, showing flags in one view, with the "View" menu called out.
## Manage views with Terraform
There is a beta version of the [LaunchDarkly Terraform provider](/docs/guides/infrastructure/terraform) available to manage your views using Terraform. You can view documentation for the EAP-specific version of the provider on the `preview` [feature branch of the repository](https://github.com/launchdarkly/terraform-provider-launchdarkly/tree/preview/docs).
To install and use the beta version of the Terraform provider:
 1. Visit the [LaunchDarkly Provider page on the Terraform Registry](https://registry.terraform.io/providers/launchdarkly/launchdarkly/latest).
 2. Select the most recent `-beta` tagged version.
 3. Update your Terraform Provider config to specifically select the beta version. For example:
Explicitly select a beta version of the provider
```
1
| terraform {
---|--- 
2
| required_providers {
3
| launchdarkly = {
4
| source = "launchdarkly/launchdarkly"
5
| version = "2.26.0-beta.1"
6
| }
7
| }
8
| }
```
##### You must explicitly select Beta versions
Terraform only uses beta releases if you explicitly specify them. General version selectors such as `version = ">= 2.0.0"` will not receive the beta version.
## Next steps
For additional information on managing views, read [Views](/docs/home/account/views). To learn more about creating roles, read [Creating roles and policies](/docs/home/account/roles/role-create).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs