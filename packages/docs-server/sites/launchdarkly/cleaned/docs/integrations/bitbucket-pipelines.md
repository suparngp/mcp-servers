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
 * [Prerequisites](#prerequisites)
 * [Create feature flags in your Pipelines build](#create-feature-flags-in-your-pipelines-build)
 * [Enable a feature flag in your Pipelines build](#enable-a-feature-flag-in-your-pipelines-build)
##### The Bitbucket Pipelines integration is available to customers on select plans
The Bitbucket Pipelines integration is only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains how to create and enable feature flags using Bitbucket Pipelines.
The LaunchDarkly integration lets you insert feature flag actions directly into your Pipeline’s continuous delivery flow. [Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines) is a continuous delivery platform that lets your team build, test, and deploy from Bitbucket. It exists within Bitbucket, giving you end-to-end visibility from coding to deployment.
We provide two scripts you can add to your pipelines:
 * **Create feature flags in your Pipelines build** : This lets you create feature flags within a specified project. The feature flag will be created in all environments for that project.
 * **Enable a feature flag in your Pipelines build** : This lets you turn on a specific feature flag for a specific environment within a project.
## Prerequisites
To use the LaunchDarkly Bitbucket Pipelines integration, you must meet the following prerequisites:
 * [A Bitbucket account](https://bitbucket.org/account/signup/)
 * [Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines) installed on your Bitbucket account
## Create feature flags in your Pipelines build
You can configure a Bitbucket Pipeline step to create a set of feature flags in LaunchDarkly as part of your build process.
To set up your Bitbucket Pipeline with LaunchDarkly:
 1. Copy the `create-launchdarkly-flags.sh` shell script from our [Bitbucket repository](https://bitbucket.org/launchdarkly/launchdarkly-pipelines/src).
 2. Add `create-launchdarkly-flags.sh` to your Pipelines build configuration.
 3. Add two environment variables to your Pipelines settings:
 * `LAUNCHDARKLY_ACCESS_TOKEN`: Copy your API access token from the [Authorizations tab](https://app.launchdarkly.com/settings/authorization) within Account settings.
 * `LAUNCHDARKLY_PROJECT_KEY`: Copy your project key from your [LaunchDarkly Projects tab](https://app.launchdarkly.com/settings/projects) within Account settings.
![The Access tokens section of the Authorization tab.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/be8907421e1d77c2ae5a64c3f1360286cee3c8386d1c6b5fe1bdd26212226698/assets/images/auto/settings-access-tokens.auto.png)
The Access tokens section of the Authorization tab.
##### Do not use the LaunchDarkly environment key
Be careful to use the LaunchDarkly **project key** in the Bitbucket Pipelines settings, not the environment key. To learn how to find your project key, read [Project keys](/docs/home/account/project#project-keys).
 1. Add an `ld-flags.conf` file to your repository and declare flags in it.
When your Pipelines build runs, any feature flags you declare in this file is also created in LaunchDarkly.
## Enable a feature flag in your Pipelines build
You can configure a Pipeline step that enables an existing feature flag in an environment as part of your build.
To enable feature flags with Bitbucket Pipelines:
 1. Copy the `enable-launchdarkly-flags.sh` shell script from our [Bitbucket repository](https://bitbucket.org/launchdarkly/launchdarkly-pipelines/src).
 2. Add `enable-launchdarkly-flags.sh` to your Pipelines build configuration.
 3. Add these environment variables to your Pipelines settings:
 * `LAUNCHDARKLY_ACCESS_TOKEN`: Copy your API access token from the [Authorization tab](https://app.launchdarkly.com/settings/authorization).
 * `LAUNCHDARKLY_PROJECT_KEY`: To learn how to find your project key, read [Project keys](/docs/home/account/project#project-keys).
 * `LAUNCHDARKLY_ENVIRONMENT_KEY`: Copy your environment key from your [LaunchDarkly Projects tab](https://app.launchdarkly.com/settings/projects).
 * `LAUNCHDARKLY_FLAG_KEY`: Enter the key for the feature flag you wish to enable.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs