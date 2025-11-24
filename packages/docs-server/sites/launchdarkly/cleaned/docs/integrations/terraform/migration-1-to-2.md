`/`
[Product docs](/docs/home)[Guides](/docs/guides)[SDKs](/docs/sdk)[Integrations](/docs/integrations)[API docs](/docs/api)[Tutorials](/docs/tutorials)[Flagship Blog](/docs/blog)
 * [Integrations](/docs/integrations)
 * [Collaboration tools](/docs/integrations/collaboration)
 * [Data Export](/docs/integrations/data-export)
 * [Edge tools](/docs/integrations/edge)
 * [Environments as a service](/docs/integrations/eaas)
 * [Experimentation and metric integrations](/docs/integrations/experimentation)
 * [IDE connectors](/docs/integrations/ide)
 * [Internal developer platforms](/docs/integrations/idp)
 * [Observability tools](/docs/integrations/observability)
 * [Segments integrations](/docs/integrations/segments)
 * [Workflow management tools](/docs/integrations/workflow)
 * [More integrations](/docs/integrations/more)
 * [Managing integrations](/docs/integrations/managing)
 * [Using the LaunchDarkly integration framework](/docs/integrations/building-integrations)
 * [Building partner integrations](/docs/integrations/partner-integrations)
[Sign in](/)[Sign up](https://app.launchdarkly.com/signup)
On this page
 * [Overview](#overview)
 * [Dropped support for Terraform 0.11 and below](#dropped-support-for-terraform-011-and-below)
 * [Removed deprecated attributes](#removed-deprecated-attributes)
 * [Standardized behavior of optional attributes](#standardized-behavior-of-optional-attributes)
 * [Updated recommendation for managing projects and environments](#updated-recommendation-for-managing-projects-and-environments)
 * [Importing project resources](#importing-project-resources)
 * [New required fields](#new-required-fields)
 * [Restructured default variations on launchdarkly_feature_flag](#restructured-default-variations-on-launchdarkly_feature_flag)
 * [Restructured targets block on launchdarkly_feature_flag_environment](#restructured-targets-block-on-launchdarkly_feature_flag_environment)
## Overview
This topic explains how to migrate your LaunchDarkly Terraform resources from v1.x to v2.0.
To learn more about v2.0, visit the [LaunchDarkly Terraform provider changelog](https://github.com/launchdarkly/terraform-provider-launchdarkly/blob/main/CHANGELOG.md).
Here are the changes between versions 1 and 2 of the Terraform provider:
 * [Dropped support for Terraform 0.11 and below](/docs/integrations/terraform/migration-1-to-2#dropped-support-for-terraform-011-and-below)
 * [Removed deprecated attributes](/docs/integrations/terraform/migration-1-to-2#removed-deprecated-attributes)
 * [Standardized behavior of optional attributes](/docs/integrations/terraform/migration-1-to-2#standardized-behavior-of-optional-attributes)
 * [Updated recommendation for managing projects and environments](/docs/integrations/terraform/migration-1-to-2#updated-recommendation-for-managing-projects-and-environments)
 * [New required fields](/docs/integrations/terraform/migration-1-to-2#new-required-fields)
 * [Restructured default variations on `launchdarkly_feature_flag`](/docs/integrations/terraform/migration-1-to-2#restructured-default-variations-on-launchdarkly_feature_flag)
 * [Restructured `targets` block on `launchdarkly_feature_flag_environment`](/docs/integrations/terraform/migration-1-to-2#restructured-targets-block-on-launchdarkly_feature_flag_environment)
## Dropped support for Terraform 0.11 and below
The [deprecation of Terraform 0.11 is ongoing](https://www.hashicorp.com/blog/deprecating-terraform-0-11-support-in-terraform-providers). Version 2.0.0 of the LaunchDarkly Terraform provider only supports Terraform 0.12 and higher.
## Removed deprecated attributes
The following previously-deprecated attributes are no longer supported:
 * `targeting_enabled` on the `launchdarkly_feature_flag_environment` resource was removed in favor of `on`.
 * `user_targets` on the `launchdarkly_feature_flag_environment` resource was removed in favor of `targets`.
 * `flag_fallthrough` on the `launchdarkly_feature_flag_environment` resource has been removed in favor of `fallthrough`. This field is required.
 * `enabled` on the `launchdarkly_webhooks` resource has been removed in favor of`on`.
## Standardized behavior of optional attributes
Except in a few special cases indicated in the [Terraform provider documentation](https://registry.terraform.io/providers/launchdarkly/launchdarkly/latest/docs), optional attributes revert to their `false` or `null` value when not explicitly set or when removed from a configuration.
The following fields have been updated in line with this behavior with v2 of the provider:
 * `on` on the `launchdarkly_destination` resource defaults to `false`.
 * `include_in_snippet` on the `launchdarkly_project` resource defaults to `false`.
 * `secure_mode` on the `launchdarkly_environment` resource and in `environments` blocks on the `launchdarkly_project` resource defaults to `false`.
 * `default_track_events` on the `launchdarkly_environment` resource and in `environments` blocks on the `launchdarkly_project` resource defaults to `false`.
 * `require_comments` on the `launchdarkly_environment` resource and in `environments` blocks on the `launchdarkly_project` resource defaults to `false`.
 * `confirm_changes` on the `launchdarkly_environment` resource and in `environments` blocks on the `launchdarkly_project` resource defaults to `false`.
 * `default_ttl` on the `launchdarkly_environment` resource and in `environments` blocks on the `launchdarkly_project` resource defaults to `0`.
 * `on` on the `launchdarkly_feature_flag_environment` resource defaults to `false`. `on` was previously `targeting_enabled`.
 * Removing `rules` blocks on the `launchdarkly_feature_flag_environment` resource deletes the rule.
 * Removing `targets` blocks on the `launchdarkly_feature_flag_environment` resource deletes the targets configuration in question. `targets` was previously `user_targets`.
 * Removing `prerequisites` blocks on the `launchdarkly_feature_flag_environment` resource removes the prerequisite from the feature flag environment.
 * `track_events` on the `launchdarkly_feature_flag_environment` resource defaults to `false`.
## Updated recommendation for managing projects and environments
We no longer recommend you manage environments in Terraform as separate resources. We will continue to maintain the environment resource for the exception of environments in projects that are not managed using Terraform.
Manage all environments in projects maintained by Terraform as `environments` config blocks on your `launchdarkly_project` resource. The `launchdarkly_project` resource now requires at least one environment be configured. The default `test` and `production` environments are not created unless you explicitly define them. Additionally, removing `environments` blocks from a `launchdarkly_project` resource configuration deletes that environment.
### Importing project resources
Because of a bug in the [2.0.0 release](https://github.com/launchdarkly/terraform-provider-launchdarkly/issues/67), slightly different logic applies for project imports in v2.0.1.
##### Managing the transition of environment resources in your Terraform state
To transition from managing environment resources independently to managing them as attribute blocks on a project resource, you must remove those environments from your Terraform state using `terraform state rm launchdarkly_environment.<resource_name>`.
After you do this, the next apply will incorrectly show that the environments are going to change. This is incorrect. Your resources will be imported into the relevant project resource without being replaced and your SDK keys will not change.
When importing `launchdarkly_project` resources, all of the project’s environments are saved to the Terraform state whether or not they are explicitly defined on the import configuration, and are updated with subsequent applies. This means that any environments not included in your import configuration are torn down with any subsequent apply. If you want to manage project properties with Terraform but not nested environments, you can use Terraform’s [ignore changes](https://developer.hashicorp.com/terraform/tutorials/state/resource-lifecycle#ignore-changes) lifecycle meta-argument.
Here is an example of the meta-argument:
Meta-argument example
```
resource "launchdarkly_project" "example" { 
--- 
 lifecycle { 
 ignore_changes = [environments] 
 } 
 name = "testProject" 
 key = "project-key-123abc" 
 # Environments not included on this configuration will not be affected by subsequent applies 
 } 
```
## New required fields
The following fields are now required:
 * `fallthrough` and `off_variation` on the `launchdarkly_feature_flag_environment` resource,
 * `on` on the `launchdarkly_webhooks` resource, and
 * `environments` on the `launchdarkly_project` resource.
## Restructured default variations on launchdarkly_feature_flag
The configuration of default variations on the `launchdarkly_feature_flag` resource has been restructured to match the shape of the HTTP response from the [LaunchDarkly API](/docs/api/feature-flags/post-feature-flag).
You can use an optional `defaults` block containing an `on_variation` and `off_variation` that evaluate to the index of the variation referenced.
For example, for a simple boolean flag with a 0-index variation of `true` and a 1-index variation of `false`, define the defaults like this:
Boolean flag example
```
resource "launchdarkly_feature_flag" "defaults_example" { 
--- 
 ... 
 defaults { 
 on_variation = 0 
 off_variation = 1 
 } 
} 
```
For more information, read [Terraform’s `launchdarkly_feature_flag` documentation](https://registry.terraform.io/providers/launchdarkly/launchdarkly/latest/docs/resources/feature_flag).
## Restructured targets block on launchdarkly_feature_flag_environment
The way `targets` is configured on the `launchdarkly_feature_flag_environment` resource has been restructured. `targets ` was previously `user_targets`.
You can define user targets block in an order corresponding to the variations they are meant to be applied to, including empty blocks for variations without specific user targets. Alternatively, you may also define a variation index which allows the user to list `targets` blocks in any order.
For more information, read [Terraform’s `feature_flag_environment` documentation](https://registry.terraform.io/providers/launchdarkly/launchdarkly/latest/docs/resources/feature_flag_environment).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs