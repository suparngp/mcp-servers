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
 * [Install the Crossplane provider](#install-the-crossplane-provider)
 * [Create resources](#create-resources)
##### Some Crossplane provider features are only available to customers on select plans
The Crossplane provider is available to all customers, but some features are only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This topic explains what the LaunchDarkly Crossplane provider is, how you can use it, and where to find additional documentation for it.
The LaunchDarkly Crossplane provider manages LaunchDarkly resources as Kubernetes custom resources. This provider enables you to use Kubernetes-style YAML configurations to configure and control feature flags, environments, projects, teams, and more.
The provider exposes managed resources for the LaunchDarkly API.
You do not need to choose between the LaunchDarkly user interface (UI) and the Crossplane provider. You can use a hybrid approach that meets your needs. For example, you might manage one set of LaunchDarkly resources through the Crossplane provider and another set through the UI.
##### The Crossplane provider and roles
A common scenario is using roles to define the LaunchDarkly entities managed by Crossplane. For example, you can tag Crossplane-managed resources with a `crossplane` tag and use role policies to prevent team members from modifying those resources with the LaunchDarkly UI.
To learn more, read [Roles](/docs/home/account/roles).
## Install the Crossplane provider
For installation instructions, refer to the [Getting Started section of the GitHub repository](https://github.com/launchdarkly/crossplane-provider-launchdarkly?tab=readme-ov-file#getting-started).
## Create resources
This example shows how to create a boolean feature flag using the Crossplane provider:
Create a boolean feature flag
```
1
| apiVersion: flag.launchdarkly.com/v1alpha1
---|--- 
2
| kind: FeatureFlag
3
| metadata:
4
| name: boolean-flag
5
| spec:
6
| forProvider:
7
| clientSideAvailability:
8
| - usingEnvironmentId: false
9
| usingMobileKey: true
10
| defaults:
11
| - offVariation: 0
12
| onVariation: 1
13
| description: This is a boolean flag.
14
| key: boolean-flag
15
| name: Boolean Flag
16
| projectKey: crossplane-project
17
| tags:
18
| - example
19
| - crossplane
20
| variationType: boolean
21
| variations:
22
| - value: "false"
23
| - value: "true"
```
To learn more about using the Crossplane provider, read about the [LaunchDarkly Crossplane provider on the Upbound marketplace](https://marketplace.upbound.io/providers/launchdarkly/provider-launchdarkly), and the [API reference documentation](https://doc.crds.dev/github.com/launchdarkly/crossplane-provider-launchdarkly).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs