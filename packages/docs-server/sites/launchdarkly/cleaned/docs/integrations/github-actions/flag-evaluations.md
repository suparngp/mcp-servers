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
 * [Set up Flag Evaluations](#set-up-flag-evaluations)
 * [Format of a flag evaluation](#format-of-a-flag-evaluation)
 * [Use output in subsequent steps](#use-output-in-subsequent-steps)
 * [Contexts created by the integration](#contexts-created-by-the-integration)
 * [Limitations](#limitations)
 * [Troubleshooting](#troubleshooting)
## Overview
This topic explains how to use the Flag Evaluations GitHub Actions integration. The integration lets you evaluate LaunchDarkly feature flags as a step in your [GitHub workflow jobs](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions#jobs) and use those values in later steps.
GitHub Actions is a platform that allows you to automate, customize, and execute your software development workflows in your repository. Using LaunchDarkly feature flags, you can gain additional flexibility and control over your CI/CD pipeline.
## Prerequisites
To complete this procedure, you must have the following prerequisites:
 * An SDK token for the LaunchDarkly environment you are using for flag evaluation. Store the token as a repository secret titled `LAUNCHDARKLY_SDK_KEY`.
## Set up Flag Evaluations
To set up Flag Evaluations:
 1. Log in to GitHub and navigate to your repo.
 2. Navigate to **Settings** , then **Secrets** and click **Add a new secret**.
 3. Paste in your SDK key to the field that appears and click **Save secret**.
 4. Return to your GitHub repository to create a new Actions workflow.
 * If you already have an `action.yml` file: Copy and paste the `eval-flags` job declaration below into the jobs section in your `action.yml` file.
 * If you don’t already have a workflow file: Create a new file titled `action.yml` in the `.github/workflows` directory of your repository. Paste the `eval-flags` job declaration below into the **Edit file** section.
Sample workflow: eval-flags job declaration
```
1
| name: Evaluate LaunchDarkly flags
---|--- 
2
| on: push
3
| jobs:
4
| eval-flags:
5
| runs-on: ubuntu-latest
6
| steps:
7
| - name: Evaluate flags
8
| id: ld
9
| uses: launchdarkly/gha-flags@v1.0.1
10
| with:
11
| sdk-key: ${{ secrets.LAUNCHDARKLY_SDK_KEY }}
12
| flags: test-boolean-flag,false
13
| - name: If true
14
| if: fromJSON(steps.ld.outputs.test-boolean-flag) == true
15
| run: echo "It's true"
16
| - name: If false
17
| if: fromJSON(steps.ld.outputs.test-boolean-flag) == false
18
| run: echo "It's false"
```
##### Best practices for configuring an actions file
We strongly recommend that you update the `uses` attribute value to reference the most recent tag in the [launchdarkly/gha-flags](https://github.com/launchdarkly/gha-flags) repository. This pins your workflow to a particular version of the `launchdarkly/gha-flags` action.
 1. Commit this file to the default branch of your repository.
## Format of a flag evaluation
The workflow evaluates the flags listed under the `flags` key of the action. Each flag that the workflow evaluates must include a flag key and fallback value.
The flag key identifies the flag. The SDK serves the fallback value if LaunchDarkly is unreachable or if the flag does not have an off variation set.
![](https://fern-image-hosting.s3.us-east-1.amazonaws.com/launchdarkly/terminal.svg)
Configure your SDK: [Evaluating flags](/docs/sdk/features/evaluating)
In the example workflow above, the key is `test-boolean-flag` and the fallback value is `false`.
## Use output in subsequent steps
Each of the flag keys included in the job will have their evaluation output accessible at `steps.<job id>.outputs.<flag key>`.
In the example above the flag key `test-boolean-flag` is available using `steps.ld.outputs.test-boolean-flag`.
GitHub Actions casts all value types to string in the output.
## Contexts created by the integration
Each time you execute this action, the action creates up to three contexts. You can view the created contexts on your [**Contexts** list](/docs/home/flags/contexts-list).
This action creates or updates contexts based on the following mappings:
 * The action maps environment variables starting with `GITHUB_` to a context with the kind `GitHub`.
 * The action maps environment variables starting with `RUNNER_` to a context with the kind `GitHubRunner`.
 * If you pass additional variables into the action, the action maps any variables starting with `LD_` to a context with the kind `GitHubCustomAttributes`.
For a list of the automatically mapped in environment variables, read GitHub’s [default environment variables](https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables).
## Limitations
This integration currently has the following limitations:
 * Use of JSON feature flags is not officially supported.
 * GitHub Actions casts output to `string` type.
 * If no fallback value is provided for a feature flag, `null` is returned for the value.
 * [Code References](/docs/home/flags/code-references) does not surface flags used in workflow files.
## Troubleshooting
After you create the workflow, you can confirm that it’s working correctly by pushing an empty commit and verifying that the newly created action succeeds.
If the action fails, there may be a problem with your configuration. To investigate, review the action’s logs to view any error messages.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs