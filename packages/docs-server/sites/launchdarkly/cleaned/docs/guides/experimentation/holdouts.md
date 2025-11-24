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
 * [Concepts](#concepts)
 * [Decide on and create a metric](#decide-on-and-create-a-metric)
 * [Create a holdout](#create-a-holdout)
 * [Decide which experiments to add to the holdout](#decide-which-experiments-to-add-to-the-holdout)
 * [Read the results](#read-the-results)
 * [Conclusion](#conclusion)
## Overview
This guide explains how to create a holdout experiment to measure the overall effectiveness of your Experimentation program.
As you begin planning your Experimentation program, you may want to track how much of an impact your experiments have over time. Will there be any measurable differences in behavior between the end users you include in experiments, and those you do not? Which group of end users will spend more money, sign up for services, or affect other metrics at higher rates? Holdout groups can help you answer these questions.
Holdouts let you exclude a percentage of your audience from your Experimentation program. This enables you to see the overall effect of your experiments on your customer base, and helps determine how effective the experiments you’re running are. If, after a set period of time, such as a month or quarter, there are no measurable differences between the two groups you may want to reconsider the number, scope, and design of the experiments you’re running.
In this guide, you will:
 * Decide on and create a metric
 * Create the holdout
 * Decide which experiments to add to the holdout
 * Read your results
To learn more about LaunchDarkly’s Experimentation offering, read [Experimentation](/docs/home/experimentation).
## Prerequisites
To complete this tutorial, you must have the following prerequisites:
 * An active LaunchDarkly account with Experimentation enabled, and with permissions to create flags and edit experiments
 * Familiarity with LaunchDarkly’s Experimentation feature
 * A basic understanding of your business’s needs or key performance indicators (KPIs)
## Concepts
To complete this guide, you should understand the following concepts:
 * [Experiment audiences](/docs/home/experimentation/allocation)
 * [Randomization units](/docs/home/experimentation/randomization)
 * [Analyzing experiment results by attribute](/docs/home/experimentation/filters)
## Decide on and create a metric
First, decide what metric you want to measure. Choose a metric that aligns with the same KPIs or goals you want to experiment on, such as average revenue per customer, or percentage of customers that sign up for your service.
In this example, you’re in charge of your organization’s growth program. You might be using a variety of metrics to measure things like total sign-ups, revenue per customer, or revenue per cart. Here, your main metric measuring the success of your organization’s Experimentation program will be new, completed account sign-ups.
To create your metric:
 1. Navigate to the **Metrics** list.
 2. Click **Create metric**. The “Create metric” dialog appears.
 3. Select an event kind of **Custom**.
 4. Enter “completed-sign-ups” for the **Event key**.
 5. Choose **Occurrence** as what you want to measure.
 6. In the “Metric definition” section, select the following:
 * Percentage of **User** units that sent the event
 * where **higher is better**
![The "Create metric" dialog for a new custom conversion binary metric.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/2be17d6d6181f7dbe89ca7019d150147198537edb0df60858bdd797e4d37d561/assets/images/auto/guide-holdouts-metric.auto.png)
The "Create metric" dialog for a new custom conversion binary metric.
 1. Enter “Completed sign-ups” as the metric **Name**.
 2. (Optional) Add a **Description**.
 3. (Optional) Add any **Tags**.
 4. (Optional) Update the **Maintainer**.
 5. Click **Create metric**.
##### Event keys and metric keys are different
Sending custom events to LaunchDarkly requires a unique **event key**. You can set the event key to anything you want. Adding this event key to your codebase lets your SDK track actions customers take in your app as events. To learn more, read [Sending custom events](/docs/sdk/features/events).
LaunchDarkly also automatically generates a **metric key** when you create a metric. You only use the metric key to identify the metric in API calls. To learn more, read [Creating and managing metrics](/docs/home/metrics/create-metrics).
You can create and add secondary metrics to your holdout if needed.
## Create a holdout
Before you create a holdout, you must decide the following:
 * **How long to run the holdout for:** in this example, you are running the holdout for a full quarter. You must create the holdout before you create any of the experiments you want to include within it, so be sure to create the holdout in advance of the time period you want to run it for.
 * **What percentage of your customer base to include in the holdout:** in this example, you are holding out 1% of your audience.
To create the holdout:
 1. Navigate to the **Holdouts** list from the left sidenav.
 2. Click **Create holdout**. The “Holdout details” section appears.
 3. Enter a **Name** such as “Growth-related experiments.”
 4. Enter a **Description** such as “Includes experiments related to our marketing campaigns and account sign-up process.”
 5. Enter a **Holdout amount**. For this example you are holding out 1% of your audience.
 6. Click **Next**. The “Choose randomization unit and attributes” section appears.
 7. Select `user` as the **Randomization unit**.
 8. Click **Next**. The “Select metrics” section appears.
 9. Select your “Completed sign-ups” metric.
 10. Click **Finish**.
You are directed to the holdouts details page.
Here is what your holdout will look like:
![The details page for a holdout with no experiments added yet.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/bc50b8a6bffadf250b7391162d5e21cca7793203fffd9321785c46fa370b8358/assets/images/auto/guide-holdouts-details.auto.png)
The details page for a holdout with no experiments added yet.
## Decide which experiments to add to the holdout
You can add experiments to your holdout when you create them. When deciding which experiments to add to a holdout, think about whether you want to measure the effectiveness of your Experimentation program as a whole, or only for a subset of your business.
In this example, you are adding only experiments related to front-end changes in your app such as pop-ups, different versions of copy, or different sign-up flows. You are not including experiments related to back-end changes that don’t have a direct affect on how customers interact with your app.
To learn how to add experiments to your holdout when you create them, read [Creating experiments](/docs/home/experimentation/create).
## Read the results
At the end of the quarter, you can analyze your holdout experiments to understand how much of an impact your Experimentation program is having on your chosen metrics.
On the holdout details page, the “Results” section displays the results of the metric for two variations:
 * “In holdout” includes the contexts that were excluded from experiments within the holdout.
 * “Not in holdout” includes any contexts included in an experiment within the holdout.
You can see which variation is performing better if at least one of the experiments in the holdout is running. However, we don’t recommend making any decisions about your holdout experiment until all of the experiments within the holdout are finished and you have shipped winning variations for all of them. To learn how, read [Analyzing experiments](/docs/home/experimentation/analyze).
![A holdout including experiments that are still running.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/36643b25f79ee120cf7ca84b0a0fa8d7a8c83ba3ed237b66bcf840be6792452f/assets/images/auto/guide-holdouts-analyzing.auto.png)
A holdout including experiments that are still running.
When you’re confident you have recorded enough data, you can stop the holdout and analyze its results. To do this, navigate to the holdout details page and click **End**. The contexts that were in the holdout will no longer be excluded from future experiments.
You can then make a decision about the results of your holdout based on which variation is performing better:
 * If the “Not in holdout” variation is performing better, then this means your experiments are overall having a positive impact on the metric.
 * If the “In holdout” variation is performing better, then this means your experiments are overall having a negative impact on the metric, and you may want to examine the experiments you’re running and the variations you’re testing to figure out how you can build better or more effective experiments.
## Conclusion
In this guide you learned how to create a holdout experiment using a prerequisite flag to measure the overall impact of your Experimentation program. By assessing the impact of your experiments as a whole, you can fine-tune your audiences and the metrics you’re measuring, and ensure you’re getting the most value out of LaunchDarkly Experimentation.
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs