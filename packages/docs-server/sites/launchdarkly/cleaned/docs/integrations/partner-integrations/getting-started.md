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
 * [A replication of your integration’s desired behavior](#a-replication-of-your-integrations-desired-behavior)
 * [SVG logo files](#svg-logo-files)
 * [Build an integration with LaunchDarkly](#build-an-integration-with-launchdarkly)
 * [Fork the LaunchDarkly Integration Framework repository](#fork-the-launchdarkly-integration-framework-repository)
 * [Create a new directory](#create-a-new-directory)
 * [Create an integration manifest](#create-an-integration-manifest)
 * [Collect integration configuration data](#collect-integration-configuration-data)
 * [Define the integration’s capabilities](#define-the-integrations-capabilities)
 * [Validate the integration](#validate-the-integration)
 * [Create end-user documentation and README](#create-end-user-documentation-and-readme)
 * [Submit the integration](#submit-the-integration)
## Overview
This topic provides an overview of the process of building an integration with LaunchDarkly.
## Prerequisites
To build an integration with LaunchDarkly, you must have the following prerequisites:
### A replication of your integration’s desired behavior
Before you connect LaunchDarkly with a third-party service, replicate your integration’s desired behavior in an isolated standalone environment separate from LaunchDarkly.
The easiest way to do this is to use [`curl`](https://curl.se/docs/manpage.html). Find the API documentation for your third-party service and execute sample commands against the service. When you execute your sample commands, observe the request semantics. This helps streamline your manifest and template definitions.
If you want to integrate with a third-party service that you are not directly associated with, please open a [Feature Request](https://github.com/launchdarkly/integration-framework/issues/new/choose) describing your goal and expectations for the integration before submitting any pull requests.
### SVG logo files
You must provide two SVG logo files, one in horizontal and one in square dimensions.
LaunchDarkly renders square SVGs in a 40x40 container, and horizontal SVGs with a height of 55px and a width that maintains the original aspect ratio of the file.
Your logo appears in the [LaunchDarkly Integrations documentation](/docs/integrations) and in the LaunchDarkly user interface on the **Integrations** list.
## Build an integration with LaunchDarkly
The steps required to build an integration include:
 1. [Forking the LaunchDarkly Integration Framework repository](/docs/integrations/partner-integrations/getting-started#fork-the-launchdarkly-integration-framework-repository)
 2. [Creating a new directory](/docs/integrations/partner-integrations/getting-started#create-a-new-directory)
 3. [Creating an integration manifest](/docs/integrations/partner-integrations/getting-started#create-an-integration-manifest)
 4. [Collecting integration configuration data](/docs/integrations/partner-integrations/getting-started#collect-integration-configuration-data)
 5. [Defining the integration’s capabilities](/docs/integrations/partner-integrations/getting-started#define-the-integrations-capabilities)
 6. [Validating the integration](/docs/integrations/partner-integrations/getting-started#validate-the-integration)
 7. [Creating end-user documentation and README](/docs/integrations/partner-integrations/getting-started#create-end-user-documentation-and-readme)
 8. [Submitting the integration](/docs/integrations/partner-integrations/getting-started#submit-the-integration)
### Fork the LaunchDarkly Integration Framework repository
First, fork the [LaunchDarkly Integration Framework repository](https://github.com/launchdarkly/integration-framework) to your own GitHub account.
After you finish building your integration, you will submit a pull request to LaunchDarkly to have it approved and deployed. To learn more about submitting a pull request, read [Submit the integration](/docs/integrations/partner-integrations/getting-started#submit-the-integration).
### Create a new directory
Next, create a new directory inside the [integrations](https://github.com/launchdarkly/integration-framework/tree/main/integrations) directory. Name it after your organization or give it the integration’s name. For example, `your-company-name-dot-com`. The directory name must not have any spaces and must use [kebab-casing](https://wiki.c2.com/?KebabCase).
Only change files and directories inside your new directory. Our validation process rejects any pull requests with modified content outside of your directory.
### Create an integration manifest
Each integration contains a manifest defining basic concepts about your integration and organization. Manifests also instruct LaunchDarkly in how to interact with your integration.
Defining your manifest is the single most important step in contributing your integration to LaunchDarkly’s platform. It’s important to configure your manifest correctly.
To learn more, read [Defining an integration manifest](/docs/integrations/partner-integrations/manifest).
### Collect integration configuration data
Most integrations need to collect one or more pieces of configuration data that support the integration. For example, your integration may collect API tokens or webhook endpoints.
You can describe a set of `formVariables` that define these configuration properties.
To learn more, read [Using form variables](/docs/integrations/partner-integrations/form-variables).
### Define the integration’s capabilities
The next step to define your LaunchDarkly integration is describing its `capabilities`. Your integration’s `capabilities` are how it interacts with LaunchDarkly.
To learn more, read [Using integration framework capabilities](/docs/integrations/partner-integrations/capabilities).
### Validate the integration
Validating your integration ensures that it is running as intended. Any submitted integration must pass validation before we will accept it.
Here are some options to validate your integration:
 * Use LaunchDarkly’s integration validation server. This is a general tool that lets developers test some of their integration capabilities with LaunchDarkly. To learn more, read [Validating an integration](/docs/integrations/partner-integrations/validating).
 * A few of the capabilities have their own separate validation tools. To learn more, read [Using integration framework capabilities](/docs/integrations/partner-integrations/capabilities).
Additionally, we recommend you install [pre-commit hooks](https://pre-commit.com/#install) with `pre-commit install`. This runs the validation suite before every commit, saving you time if you need to troubleshoot anything.
### Create end-user documentation and README
Now that your integration is built and validated, you must provide documentation for end users and integration maintainers.
Send an email to the Ecosystem team with instructions for how to use your integration. Follow the pattern and language used by the other integration topics.
In addition to end-user documentation, you must also provide guidance on how to maintain and test your integration. Specify this developer-focused documentation in an integration README (`README.md`) in your integration’s directory. The README should also link to the end-user documentation you provide.
### Submit the integration
After you’ve built your integration, submit a pull request against the [LaunchDarkly Integration Framework repository](https://github.com/launchdarkly/integration-framework/pull/new/main). When you submit a pull request, your branch will run through some automated validations and be reviewed by our team.
After your Integration Framework repository pull request is approved, our Ecosystem and Documentation teams will review the documentation that you submitted and add it to `docs.launchdarkly.com`.
When we’re ready to publish your integration, we’ll get your permission and publish your integration and documentation live on our site.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs