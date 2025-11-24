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
 * [Set up Find Code References in Pull Request](#set-up-find-code-references-in-pull-request)
 * [Use output in subsequent steps](#use-output-in-subsequent-steps)
 * [Troubleshooting](#troubleshooting)
## Overview
This topic explains how to use the Find Code References in Pull Request (PR) GitHub Actions integration. The integration lets you determine if you modified any feature flags in a PR as a step in your [GitHub workflow jobs](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions#jobs) and use those values in later steps.
The action will post a comment to the PR that lists the flags found in the diff:
![A PR comment listing LaunchDarkly flag references.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/1240c6534deff398c48b6422ea98bc7543ad7d3c893c49d709c8aa67850cecbb/assets/images/__not_from_LD_app_UI/integrations-gh-action-code-comment.png)
A PR comment listing LaunchDarkly flag references.
The action will optionally create a GitHub pull request flag link for any modified flags. To learn more, read [Flag links](/docs/home/flags/links).
![A GitHub flag link.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/31f3b629c7274668d3900b30e354889ca88cc1ca5a1bfbe9d223794643841ec5/assets/images/__not_from_LD_app_UI/integrations-gh-action-flag-link.png)
A GitHub flag link.
## Prerequisites
To complete this procedure, you must have the following prerequisites:
This action requires a [LaunchDarkly access token](/docs/home/account/api) with:
 * Read access for the designated `project-key`
 * (Optional) the `createFlagLink` action, if you have set the `create-flag-links` input to `true`
## Set up Find Code References in Pull Request
To set up the Find Code References in Pull Request GitHub Action:
 1. Navigate to your GitHub repo.
 2. Navigate to **Settings** , then **Secrets**.
 3. Click **Add a new secret**.
 4. Enter your access token into the field.
 5. Click **Save secret**.
 6. Return to your GitHub repository to create a new Actions workflow.
If you already have a workflow file that runs on `pull_request` you can add the new find flags job to that file.
If you don’t already have a workflow file, create a new file titled `pull_request.yml` in the `.github/workflows` directory of your repository. Paste the `find-flags` job declaration below into the **Edit file** section.
Sample workflow: find flags job declaration
```
1
| on: pull_request
---|--- 
2
| 
3
| jobs:
4
| find-flags:
5
| runs-on: ubuntu-latest
6
| name: Find LaunchDarkly feature flags in diff
7
| steps:
8
| - name: Checkout
9
| uses: actions/checkout@v4
10
| - name: Find flags
11
| uses: launchdarkly/find-code-references-in-pull-request@v2
12
| id: find-flags
13
| with:
14
| project-key: default
15
| environment-key: production
16
| access-token: ${{ secrets.LD_ACCESS_TOKEN }}
17
| repo-token: ${{ secrets.GITHUB_TOKEN }}
```
##### Best practices for configuring an actions file
We strongly recommend that you update the `uses` attribute value to reference the most recent tag in the [launchdarkly/find-code-references-in-pull-request](https://github.com/launchdarkly/find-code-references-in-pull-request) repository. This pins your workflow to a particular version of the `launchdarkly/find-code-references-in-pull-request` action.
 1. Commit this file to the default branch of your repository.
## Use output in subsequent steps
In addition to posting a comment on the PR, the action will output details about how many and which flags were identified in the diff. GitHub Actions cast all value types to string in the output.
Read more about [Find Code References in Pull Request outputs](https://github.com/launchdarkly/find-code-references-in-pull-request#outputs).
Sample workflow: using find-flags output
```
1
| on: pull_request
---|--- 
2
| 
3
| jobs:
4
| find-feature-flags:
5
| runs-on: ubuntu-latest
6
| name: Find LaunchDarkly feature flags in diff
7
| steps:
8
| - name: Checkout
9
| uses: actions/checkout@v4
10
| - name: Find flags
11
| uses: launchdarkly/find-code-references-in-pull-request@v2
12
| id: find-flags
13
| with:
14
| project-key: default
15
| environment-key: production
16
| access-token: ${{ secrets.LD_ACCESS_TOKEN }}
17
| repo-token: ${{ secrets.GITHUB_TOKEN }}
18
| 
19
| # Add or remove labels on PRs if any flags have changed
20
| - name: Add label
21
| if: steps.find-flags.outputs.any-changed == 'true'
22
| run: gh pr edit $PR_NUMBER --add-label ld-flags
23
| env:
24
| GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
25
| PR_NUMBER: ${{ github.event.pull_request.number }}
26
| - name: Remove label
27
| if: steps.find-flags.outputs.any-changed == 'false'
28
| run: gh pr edit $PR_NUMBER --remove-label ld-flags
29
| env:
30
| GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
31
| PR_NUMBER: ${{ github.event.pull_request.number }}
```
## Troubleshooting
After you create the workflow, you can confirm that it’s working correctly by pushing an empty commit and verifying that the newly created action succeeds.
If the action fails, there may be a problem with your configuration. To investigate, review the action’s logs to view any error messages.
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs