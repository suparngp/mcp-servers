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
 * [Get started](#get-started)
 * [Multiple release pipelines](#multiple-release-pipelines)
 * [Create a pipeline](#create-a-pipeline)
 * [Create the “Development” phase](#create-the-development-phase)
 * [Create a “QA testers” segment](#create-a-qa-testers-segment)
 * [Create the “QA” phase](#create-the-qa-phase)
 * [Create a “Beta testers” segment](#create-a-beta-testers-segment)
 * [Create the “Beta release” phase](#create-the-beta-release-phase)
 * [Create the “Generally available” phase](#create-the-generally-available-phase)
 * [Add flags to your pipeline](#add-flags-to-your-pipeline)
 * [Move flags through release pipeline phases](#move-flags-through-release-pipeline-phases)
 * [Conclusion](#conclusion)
##### Release pipelines are available to customers on select plans
Release pipelines are only available to customers on select plans. To learn more, [read about our pricing](https://launchdarkly.com/pricing/). To upgrade your plan, [contact Sales](https://launchdarkly.com/contact-sales/).
## Overview
This guide describes how to use LaunchDarkly’s release assistant capabilities to create an example release pipeline, how to add flags to the pipeline, and what factors to consider when building a release pipeline for your own organization or project.
Release pipelines let you move flags through a series of phases, rolling out flags to selected environments and audiences following automated steps. You can use release pipelines to enforce a standardized process for your releases and ensure your releases are following best practices. To learn more, read [Release pipelines](/docs/home/releases/release-pipelines).
## Prerequisites
To use this guide, you need to:
 * a role with [permission to create release pipelines](/docs/home/account/roles/role-actions#release-pipeline-actions). The LaunchDarkly Project Admin and Maintainer project roles, as well as the Admin and Owner base roles, include this ability.
 * be an Enterprise customer or have release pipelines enabled for your account.
 * be familiar with the release process for new features at your organization or within your team.
 * be familiar with LaunchDarkly [segments](/docs/home/flags/segments).
 * be familiar with [guarded rollouts](/docs/home/releases/guarded-rollouts).
## Get started
##### Automated releases is available for boolean flags only
JSON, string, and number flags cannot be added to a release pipeline.
The first time you set up a release pipeline in your LaunchDarkly project, use the opportunity to reinforce your existing best practices. You can align release pipeline phases with your current release process. For example, you could advance a flag that controls access to a new feature through “Development,” “QA,” “Beta release,” and “Generally available” phases.
You should also consider how you will know a flag is ready to move between phases. What qualifies a flag to move out of the “QA” phase and into the “Beta release” phase?
### Multiple release pipelines
You can create multiple release pipelines to separate releases for different groups, or to run simultaneous efforts in parallel. For example, if you have two release processes that are very different, you may want to create one release pipeline for each process.
If you want to set up more than one release pipeline, consider which parts of your organization’s work are affected by the flags and environments moving through the release pipelines.
It may be helpful to standardize on the name and number of phases in your organization’s release pipelines. Doing this will give a consistent view of the release processes as flags move between phases.
For example, all groups in your organization may use a “Beta testing” step in their release process, but some groups may have internal users complete the beta testing step, and other groups may have a small portion of customers complete the beta testing step.
## Create a pipeline
This scenario imagines that you have three main environments: Development, QA, and Production. In this example, you are creating a pipeline with four phases:
 * Development
 * QA
 * Beta release
 * Generally available
This guide describes setting up each phase in its own section.
To begin, create the release pipeline:
 1. Navigate to **Release assistant**.
 * If you have a release pipeline set up for your project, the default release pipeline and its releases appear. Click the release pipeline name, and select **Manage release pipelines**.
![The "Manage release pipelines" option.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/24fc32ff96de516407b0d72cd12b20340a39f49eb1b0791cc4e870ee68022d46/assets/images/auto/release-pipelines-guide-manage-pipelines.auto.png)
The "Manage release pipelines" option.
 1. Click **Create release pipeline**.
 2. Click into the title field and update the name to “Default release pipeline.”
 3. Click **Add description** and add a short description like “The default release pipeline for our major releases.”
 4. Proceed to the next section to begin setting up the pipeline phases.
### Create the “Development” phase
The initial “Development” phase is for an internal environment that only your developers have access to. This is the environment where the initial development work is done, and your feature may sit in this phase for several days or several weeks as it is being worked on.
In this example, you do not need to specify an audience, approvals, or rollout strategy for the Development phase, because this environment controls an internal-only developer environment.
To create the “Development” phase:
 1. The release pipeline automatically includes two phases: Testing and Production. Update the “Testing phase” **Name** to “Development.”
 2. In the “Who do you want to release to?” section, choose the “Development” **Environment**.
 3. Leave the **Audience** set to “Everyone,” and do not require **Approvals** or add a **Strategy**.
 4. Click **Done**.
![The "Development" phase of the release pipeline.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/889c3de7087d67344b8b483ced017357e7183f51f9c7e2c1ac6777ebeedfa605/assets/images/__toPlaywright_newIA/release-pipelines-guide-development-phase.png)
The "Development" phase of the release pipeline.
### Create a “QA testers” segment
Next, you want only a small subsection of your internal developers to be able to run QA testing on new features. To accomplish this, create a “QA testers” segment that includes only the QA testers and other developers that should have access to this feature.
This is what the targeting for your segment might look like:
![A small list-based segment that targets your QA testers.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/0ae2c3b56d8493714f72d5800ef1faa7b11a71cf3c4e7ca019d4aa36d53a8b9b/assets/images/auto/release-pipelines-guide-qa-segment.auto.png)
A small list-based segment that targets your QA testers.
To learn how to create a small list-based segment, read [Create rule-based and smaller list-based segments](/docs/home/flags/segments-create#create-rule-based-and-smaller-list-based-segments).
### Create the “QA” phase
To create the “QA” phase:
 1. Update the “Production” phase **Name** to “QA.”
 2. In the “Who do you want to release to?” section, choose the “QA” **Environment**.
 3. Under **Audience** , select “Segments.”
 4. Click the **+** icon and select “QA testers.”
 5. Do not require **Approvals** or add a **Strategy**.
 6. Click **Done**.
![The "QA" phase of the release pipeline.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/d339659e7526712938fccd6ddd96b02b853f6ebda85dd8bcf8e4745542cc61a9/assets/images/__toPlaywright_newIA/release-pipelines-guide-qa-phase.png)
The "QA" phase of the release pipeline.
### Create a “Beta testers” segment
Next, you want only a small subsection of your customers to be able to beta test new features. These might be customers that you have a close working relationship with and who have agreed to be early adopters.
To accomplish this, create a “Beta testers” segment that includes only the customers that should have access to this feature during the beta testing period. You can add a `beta-tester` context attribute and then set the attribute value to `yes` for user contexts or organization contexts that are in the beta tester group.
This is what the targeting for your segment might look like:
![A rule-based segment that targets your beta tester customers.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/e404aed6d4ba7dc5128bbb3ee52a2655cc3c6d346a95a10fd2ee24b453f4d7f2/assets/images/auto/release-pipelines-guide-beta-segment.auto.png)
A rule-based segment that targets your beta tester customers.
To learn how to create a rule-based segment, read [Rule-based segments](/docs/home/flags/rule-based-segments).
### Create the “Beta release” phase
In this example, your rollout should be approved by someone from your product manager team. To learn how to create a “Product managers” team that you can use for approvals, read [Creating a team](/docs/home/account/create-teams).
To create the “Beta release” phase:
 1. Click the add phase **+** icon between the “QA” phase and the green “Released” phase:
![The + icon to add a new phase to a pipeline.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/2b0190c77f577d8a035888fdf96e4f9608417f5f044b8e40b390cee0dd1d09bb/assets/images/auto/release-pipelines-guide-new-phase.auto.png)
The + icon to add a new phase to a pipeline.
 1. Enter “Beta release” for the phase **Name**.
 2. Click **Add automation**.
 3. Select the “Production” **Environment**.
 4. Under **Audience** , select “Segments.”
 5. Click the **+** icon and select “Beta testers.”
 6. Check **Require approval to start**.
 7. Click the **+** icon and select the “Product managers” team to approve rolling features out to your beta testers.
 8. Click **Done**.
![The "Beta release" phase of the release pipeline.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/511bc9b3fbf33fcd2d4ddb8c75270e7e7ecb63f9434f8ff9eec5eb65917faa08/assets/images/__toPlaywright_newIA/release-pipelines-guide-beta-phase.png)
The "Beta release" phase of the release pipeline.
### Create the “Generally available” phase
Finally, the last phase of your release plan is rolling out the feature to your full customer base. To ensure your new feature doesn’t cause unexpected issues in your app, you will use a guarded rollout to detect any regressions and automatically roll back the release if issues are found.
To create the “Generally available” phase:
 1. Click the add phase **+** icon between the “Beta testers” phase and the green “Released” phase.
 2. Enter “Generally available” for the phase **Name**.
 3. Select the “Production” **Environment**.
 4. Leave the **Audience** set to “Everyone.”
 5. Check **Require approval to start**.
 6. Click the **+** icon and select the “Product managers” team to approve rolling features out to your full customer base.
 7. Select the “Guarded rollout” **Strategy**. Keep the default **Traffic allocation** and **Duration**.
 8. Click **Done** :
![The "Generally available" phase of the release pipeline.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/70c9031b4b047fe7a6a679ec3f99c3f1d2604bd3c0d6cbf050ba48eda1361a02/assets/images/__toPlaywright_newIA/release-pipeline-guide-ga-phase.png)
The "Generally available" phase of the release pipeline.
 1. Click **Create release pipeline**.
Your release pipeline is now complete.
## Add flags to your pipeline
To add a flag to a release pipeline:
 1. From the **Flags** list, navigate to the boolean flag you want to add to your release pipeline.
 2. Click **Start release** in the right sidebar.
![The "Start release" option.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/d47c8cd4bc58a82d057ae0fee40ee4587340ca13a2708f63ad97b5fc3523e345/assets/images/auto/release-pipeline-start-release.auto.png)
The "Start release" option.
 1. If you have more than one pipeline, select the “Default release pipeline.”
The release appears in the right sidebar.
## Move flags through release pipeline phases
To begin moving a flag through the pipeline:
 1. From the flag’s right sidebar, find the phase you want to begin.
![A release pipeline's phases in a flag's sidebar.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/806b5779d0a3a55c9a98d329680071fc28b5465a2dd0987a9402a8f6fadc9819/assets/images/auto/release-pipeline-guide-sidebar.auto.png)
A release pipeline's phases in a flag's sidebar.
 1. Click the **start arrow** for the phase. A “Start phase” dialog appears.
 2. Click **Start**.
LaunchDarkly executes the release phase immediately:
 * If the phase includes an approval, starting the phase sends an approval request. If the approval request is approved and applied, then LaunchDarkly completes the remaining steps in the phase.
 * If the phase does not include an approval, the steps in the phase begin immediately, including updating any flag targeting, toggling the flag on, and beginning any guarded rollouts.
When the phase is complete, the next phase in the release pipeline is marked as “Ready to start.” When you’re ready for the flag to move through the next phase, click the **start arrow** for that phase.
After all the phases are complete for a flag, you can archive the flag. To learn more, read [Archive flags](/docs/home/flags/archive).
## Conclusion
In this guide, you learned best practices for implementing release pipelines across your organization, and how to think about flags as they move through the different phases of release pipelines.
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs