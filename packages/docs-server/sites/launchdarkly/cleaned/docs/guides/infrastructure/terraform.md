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
 * [Infrastructure as code](#infrastructure-as-code)
 * [Terraform](#terraform)
 * [Hashicorp Configuration Language (HCL)](#hashicorp-configuration-language-hcl)
 * [Choose an approach based on your use case](#choose-an-approach-based-on-your-use-case)
 * [Best practices for avoiding conflicts between LaunchDarkly and Terraform](#best-practices-for-avoiding-conflicts-between-launchdarkly-and-terraform)
 * [Example 1: Use Terraform for automation](#example-1-use-terraform-for-automation)
 * [Example 2: Manage and protect flags without changing their state](#example-2-manage-and-protect-flags-without-changing-their-state)
 * [Protect Terraform-defined flags](#protect-terraform-defined-flags)
 * [Conclusion](#conclusion)
## Overview
This guide explains how to use Terraform to manage your LaunchDarkly resources, which can simplify change control for your team.
Complexity is unavoidable in modern software development. The variety of cloud services you can use to support your software makes simple projects into complicated ones.
These services solve many problems, but they also add others: how are you going to provision and manage all these different resources? What if you need to make a change across a hundred storage buckets? What if you have multiple account members all trying to make changes, and suddenly one of them needs to roll a change back?
Terraform can work together with LaunchDarkly to address all of these problems. The [LaunchDarkly Provider for Terraform](https://www.terraform.io/docs/providers/launchdarkly/index.html) can automate the creation and maintenance of most kinds of LaunchDarkly resources such as flags, projects, and environments.
## Concepts
You should understand these concepts before you read this guide:
### Infrastructure as code
Infrastructure as code is a type of infrastructure management that uses similar processes to those used for code. You declare and manage infrastructure resources, such as servers, databases, and networks, with text files in a version-controlled source repository. When the repository is deployed, tools interpret these text files and perform whatever infrastructural changes are necessary.
These processes mean that infrastructure changes are created, reviewed, and audited in a similar manner to code changes. Additionally, you can track infrastructure changes in sync with code changes.
### Terraform
Terraform is a popular open source tool created by Hashicorp. You can use Terraform to implement an infrastructure as code workflow. Terraform is capable of managing many kinds of infrastructural resources and providers.
##### This integration is for experienced Terraform operators
Terraform is a complex tool. This guide is intended for people who are already using Terraform in their toolchain.
### Hashicorp Configuration Language (HCL)
Hashicorp Configuration Language (HCL) is the infrastructure description syntax Terraform reads. Where most programming languages are _imperative_ , meaning they describe a series of actions to be performed in order to reach a desired outcome, HCL is _declarative_. It describes only the desired outcome, and Terraform calculates the actions needed to reach it from the current state.
## Choose an approach based on your use case
This guide shows multiple examples of how you can use Terraform to create and manage LaunchDarkly resources. These examples do not mean that those kinds of resources are best managed with Terraform in all cases. Think carefully before you use Terraform in these ways, as conflicts may occur if an account member tries to modify Terraform-managed resources through the **Flags** list.
With each example, we’ll discuss why Terraform was suited to that scenario. We’ll also discuss the additional measures you should take to avoid the conflicts mentioned above.
### Best practices for avoiding conflicts between LaunchDarkly and Terraform
These are the practices we recommend to avoid conflicts that can arise when some of your flags are managed through Terraform and others are managed through the **Flags** list:
 * Do not use Terraform to make changes to flag targeting rules or flag variations unless absolutely necessary. Managing these actions in the LaunchDarkly UI lets you use LaunchDarkly’s comment, change history, scheduling, flag trigger, and approval workflow features. Making flag changes in the UI lets you change app functionality quickly between deployments. Editing a Terraform file to update flag targeting or flag variations requires a review, merge, and redeployment, which can delay bug fixes or other improvements.
 * Tag everything Terraform manages with a `managed-by-terraform` tag.
 * Use custom roles to enforce that resources and properties managed by Terraform can not be manipulated by the LaunchDarkly UI. For example, put most account members in a role that does not have write access to the resources managed by Terraform.
 * Have clear policies on what is:
 * Managed exclusively by Terraform.
 * Provisioned by Terraform, then managed from the UI.
 * Provisioned and managed by the LaunchDarkly UI, but not Terraform.
 * Use methods such as prefixes, tags, and descriptions to ensure that anyone using the UI can understand the content.
 * For more complex patterns, add another tag such as `allow-ui-toggle`, to make it so rules are read-only but the toggle state is changeable.
 * Document all your practices and make the documentation widely accessible from both LaunchDarkly and Terraform.
## Example 1: Use Terraform for automation
You don’t need to store individual flag details in Terraform to use LaunchDarkly’s Terraform provider effectively.
Here’s a common scenario for engineering teams collaborating on a software product: the automatic creation of development instances and associated LaunchDarkly environments.
Each developer on the team should have their own running instance of the product with which they can experiment. Each instance requires its own set of resources, such as databases, static files, worker processes, and feature flags. The instance is created together with its resources, which include a LaunchDarkly environment. Each instance is given a unique identifier which includes the name of the developer for whom it was created.
Here is a Terraform configuration which creates these instances, each with an identical set of resources. It starts with the list of developer names, declared as a [local value](https://developer.hashicorp.com/terraform/language/values/locals):
HCL
```
1
| locals {
---|--- 
2
| developers = [“frankie”, “stony”, “cleo”, “tt”]
3
| }
```
This is followed by a collection of [resource blocks](https://developer.hashicorp.com/terraform/language/resources), each one representing a different component of the instance.
In this example, the resources we care about are the [LaunchDarkly environments](/docs/home/account/environment). Environments have to be part of a [LaunchDarkly project](/docs/home/account/project), so this configuration creates that first, using the [launchdarkly_project](https://www.terraform.io/docs/providers/launchdarkly/r/project.html) resource:
HCL
```
1
| resource "launchdarkly_project" "downtown" {
---|--- 
2
| key  = "downtown"
3
| name = "Downtown Bank project"
4
| }
```
This is the point where each developer’s LaunchDarkly Environment is created. Terraform 0.12 uses [loop constructs](https://www.thegreatcodeadventure.com/building-dynamic-outputs-with-terraform-for_each-for-and-zipmap/#building-dynamic-resources-with-for_each), so you do not need much additional code to create a [launchdarkly_environment](https://www.terraform.io/docs/providers/launchdarkly/r/environment.html) resource:
HCL
```
1
| resource "launchdarkly_environment" "downtown" {
---|--- 
2
| for_each    = toset(local.developers)
3
| key         = "${each.value}-dev"
4
| name        = "${title(each.value)} dev env"
5
| color       = substr(md5(each.value), 0, 6)
6
| project_key = launchdarkly_project.downtown.key
7
| }
```
In the example above, each environment is given a unique name that includes the developer’s name in the `key` and `name` properties. There’s even a different color for each environment, which is derived by calculating the [MD5 hash](https://www.makeuseof.com/tag/md5-hash-stuff-means-technology-explained/) of the developer name and extracting the first six hexadecimal digits.
For additional ways to approach this scenario, read [How to create multiple environments using the Terraform resource `launchdarkly_project`](https://support.launchdarkly.com/hc/en-us/articles/13196983496475-How-to-create-multiple-environments-using-the-Terraform-resource-launchdarkly-project).
## Example 2: Manage and protect flags without changing their state
If some flags are especially important, it makes sense to manage them through the same workflow as the code that relies on them. This is the “infrastructure as code” approach.
This example features:
 * HCL code to create a new feature flag
 * Automated validation of the Terraform syntax and actions by Terraform Cloud
 * Prevention of flag change through other methods and interfaces
The code in this example adds a flag for a new product feature. The feature’s name is “FeatureX,” and the product is “MyProduct.” The new flag’s name is “Show FeatureX.”
The code also specifies the flag maintainer by referencing a given account member. The flag is tagged `managed-by-terraform`, indicating to account members that they should not modify the core flag configuration in other ways.
Here is an example:
HCL
```
1
| resource "launchdarkly_project" "myproduct" {
---|--- 
2
| key = "myproduct"
3
| name = "MyProduct"
4
| tags = ["managed-by-terraform"] # LaunchDarkly tags
5
| }
6
| 
7
| data "launchdarkly_team_member" "luther" {
8
| email = "luther@myproduct.example.com"
9
| }
10
| 
11
| resource "launchdarkly_feature_flag" "show-featurex" {
12
| project_key   = launchdarkly_project.myproduct.key
13
| name          = "Show FeatureX"
14
| key           = "show-featurex"
15
| description   = "Adds the FeatureX to the displayed interface"
16
| tags          = ["managed-by-terraform"]
17
| maintainer_id = data.launchdarkly_team_member.luther.id
18
| variation_type = "boolean"
19
| variations {
20
| value = true
21
| }
22
| variations {
23
| value = false
24
| }
25
| }
```
The code above defines the base flag configuration, but not its per-environment states, such as targeting or evaluation rules. Those are managed using a different resource: [launchdarkly_feature_flag_environment](https://www.terraform.io/docs/providers/launchdarkly/r/feature_flag_environment.html). This resource is **deliberately excluded** from the code because it allows account members to edit per-environment states in the **Flags** list without their changes being overwritten by updates to the Terraform configuration.
##### You can use Terraform Cloud to perform automated reviews
If you use Terraform Cloud to perform Continuous Integration or Continuous Deployment (CI/CD) tasks for your Terraform code, you can implement it here to check all new pull requests for Terraform changes. If Terraform Cloud finds any changes, they will then run through the `terraform plan` command.
### Protect Terraform-defined flags
Now that the flag’s core configuration is controlled through Terraform, you can ensure that it’s not modified by other means, such as through the LaunchDarkly UI, by setting up some custom roles in LaunchDarkly.
 1. Create a dedicated “terraform” member account in LaunchDarkly, which Terraform Cloud can use to perform all LaunchDarkly actions. This ensures that Terraform actions aren’t dependent on an individual account member’s LaunchDarkly account. Instead, this account belongs to the entire team. If you are on an Enterprise plan, we recommend you use a service token instead of a member account. To learn more, read [Service tokens](/docs/home/account/api).
 2. Assign all the other account member accounts a new custom role that can’t modify certain attributes of Terraform-controlled resources. You can specify which resources those are by using a tag.
To learn more about roles, read [Roles](/docs/home/account/roles).
## Conclusion
Terraform provides a centralized change control process for infrastructure, helping a team to work together more effectively and with fewer errors.
Your feature flags are a vital part of application infrastructure and should be treated as such. The [LaunchDarkly Provider for Terraform](https://www.terraform.io/docs/providers/launchdarkly/index.html) brings your LaunchDarkly resources in line with the rest of your infrastructure control processes.
For additional assistance, read the following LaunchDarkly Knowledge Base Terraform troubleshooting articles:
 * [Terraform Error “You cannot remove the last environment from a project”](https://support.launchdarkly.com/hc/en-us/articles/13196889053723-Terraform-Error-You-cannot-remove-the-last-environment-from-a-project)
 * [Terraform Error “connection is shut down”](https://support.launchdarkly.com/hc/en-us/articles/13196846968603-Terraform-Error-connection-is-shut-down)
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs