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
 * [Start the LaunchDarkly CLI development server](#start-the-launchdarkly-cli-development-server)
 * [Configure your SDK for testing](#configure-your-sdk-for-testing)
 * [Set and evaluate flags locally](#set-and-evaluate-flags-locally)
 * [Conclusion](#conclusion)
## Overview
This guide describes how to use the LaunchDarkly CLI to perform local testing and development.
LaunchDarkly provides a command line interface (CLI), which includes a `dev-server` command that you can use to start a local server and retrieve flag values from a LaunchDarkly source environment. This development server supports a single variation value for each flag, which you can override as needed. This means you can test your code locally, and you do not need to coordinate with other developers in your organization who are using the same LaunchDarkly source environment.
## Prerequisites
First, install the LaunchDarkly CLI. To use the `dev-server` command in the LaunchDarkly CLI, you must have a minimum version of 1.4.0.
###### Expand for installation and upgrade instructions
To install the LaunchDarkly CLI:
Install on macOS with HomebrewInstall on macOS, Windows, or Linux with npmPull from DockerBuild from sourceDownload executable from GitHub
```
$
| brew tap launchdarkly/homebrew-tap
---|--- 
>
| brew install ldcli
```
To update to the latest version of the LaunchDarkly CLI:
Update to latest version using HomebrewUpdate to latest version using npm
```
$
| brew upgrade ldcli
---|--- 
```
Before you run commands in the LaunchDarkly CLI, you need to authenticate yourself. You only need to do this once.
###### Expand for authentication instructions
To authenticate yourself in the LaunchDarkly CLI:
Authenticate with your loginAuthenticate with an access token
```
$
| # you only need to run this once
---|--- 
>
| ldcli login
```
If you want to use the `dev-server` command in a preview environment, there’s no one to log in. As a result, you need to set up a service token that you add to your secrets store, and then configure your preview environment to use that token.
To learn more about service tokens, read [Creating API access tokens](/docs/home/account/api-create).
To learn more about authentication in the LaunchDarkly CLI, read [Authentication](/docs/home/getting-started/ldcli#authentication).
## Start the LaunchDarkly CLI development server
Next, start the LaunchDarkly CLI dev-server and keep it running in the background:
Start the dev-server
```
$
| ldcli dev-server start
---|--- 
```
Then, configure the dev-server to access flags from your preferred LaunchDarkly project and environment. You will need:
 * your project key, which you can copy from the Projects list in the LaunchDarkly UI. To learn how, read [Project keys](/docs/home/account/project#project-keys).
 * your environment key, which you can copy from the **Environments** list in the LaunchDarkly UI. To learn how, read [Environment keys](/docs/home/account/environment/keys#environment-keys).
Here’s how:
Configure the dev-server to access your project and environmentExample
```
$
| ldcli dev-server add-project --project <project key> --source <environment key>
---|--- 
```
You can add as many projects as you like. If you’re primarily working in one project, you can set that project as your default within the CLI. Then you do not need to pass in `--project` to subsequent `dev-server` commands.
Here’s how:
Set your default project for ldcli commands
```
$
| # set your primary project
---|--- 
>
| ldcli config --set project <project key>
```
To verify that you’ve added your project and environment to the dev-server correctly, visit the UI for the dev-server at `http://localhost:8765/ui/`:
![The user interface for the LaunchDarkly CLI dev-server, connected to project "example-ldcli-project."](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/d13f2bb5a0d3eb9e7030bf6745e209344883c51c207378e08378b4be9de74ac2/assets/images/__not_from_LD_app_UI/ldcli-dev-server-ui.png)
The user interface for the LaunchDarkly CLI dev-server, connected to project "example-ldcli-project."
## Configure your SDK for testing
Next, configure your SDK to connect to the dev-server:
 * Set the SDK credentials to the project key of a project you have added to the dev-server. Do not use the SDK key, mobile key, or client-side ID.
 * Set the SDK service endpoints to `http://localhost:8765`, where the dev-server is running.
##### Use the project key with ldcli dev-server
When you connect a client-side SDK to the ldcli dev-server for local testing, use your project key as the SDK credential and set all service endpoints to `http://localhost:8765`.
Do not use an SDK key, mobile key, or client-side ID with the dev-server. If you use a client-side ID, the SDK connects to LaunchDarkly instead of the dev-server, which can result in CORS errors.
This configuration means the SDK uses flags from the project and environment you’ve added to the dev-server, and checks the local dev-server for flag values, rather than connecting to LaunchDarkly.
Here are a few examples of this configuration:
JavaScript SDKPython SDK
```
1
| const options = {
---|--- 
2
| streamUrl: 'http://localhost:8765',
3
| baseUrl: 'http://localhost:8765',
4
| eventsUrl: 'http://localhost:8765'
5
| };
6
| 
7
| const client = LDClient.initialize('example-project-key', context, options);
```
To find an example specific to your SDK, read [Service endpoint configuration](/docs/sdk/features/service-endpoint-configuration). Replace the example URIs with `http://localhost:8765`.
After you configure your SDK, create an appropriate evaluation context for your testing. You can define one that you want to test with manually in your application. Alternatively, you can copy an existing context instance from the [context details page](/docs/home/flags/context-details) in the LaunchDarkly UI.
The context that you define does not need to match what your application might encounter in production, because the dev-server always provides a single variation value for each flag. The dev-server does not connect to LaunchDarkly, and it does not evaluate targeting rules, so every context receives the same flag value. You can override the flag value locally to test alternate paths through your code.
Here are a few examples of contexts you could test with:
JavaScript SDKPython SDK
```
1
| const context = {
---|--- 
2
| kind: 'organization',
3
| key: 'org-key-123abc',
4
| name: 'ACME Feature Management, LLC',
5
| location: 'Springfield'
6
| };
7
| 
8
| const client = LDClient.initialize('example-project-key', context, options);
```
To learn more about defining contexts, read [Context configuration](/docs/sdk/features/context-config).
## Set and evaluate flags locally
Now that your SDK is configured to check the local dev-server for flag values, rather than connecting to LaunchDarkly, you can run your application and test it with these local flag values.
The dev-server retrieves flag values from your project and environment only when you explicitly sync with LaunchDarkly. As you perform local development and testing, you can override any flag values that you like. These flag values are served to all contexts.
You can use the dev-server UI at `http://localhost:8765/ui/`:
 * To sync flag values from LaunchDarkly, click **Sync**
 * To override the value of a particular flag, toggle it **Off** or **On**
You can also use the LaunchDarkly CLI:
Sync and override flag values
```
$
| # to sync flag values
---|--- 
>
| ldcli dev-server sync-project --project <project key>
>
| 
>
| # to override the value for a particular flag
>
| ldcli dev-server add-override --flag <flag key> --data <new variation value> --project <project key>
```
The `--project` argument is optional if you have set a default project using `ldcli config`.
Use `ldcli dev-server --help` to explore additional commands.
## Conclusion
In this guide, we described the LaunchDarkly CLI’s development server. The development server copies flags and flag values from your chosen LaunchDarkly project and environment, which enables you to develop and test locally without accessing LaunchDarkly. To learn about all the functionality exposed by the dev server, read the [reference guide](/docs/guides/flags/ldcli-dev-server-reference).
For additional information, or to provide feedback, visit [LaunchDarkly CLI](https://github.com/launchdarkly/ldcli) on GitHub.
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs