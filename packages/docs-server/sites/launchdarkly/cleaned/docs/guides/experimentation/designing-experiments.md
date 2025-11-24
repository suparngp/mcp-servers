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
 * [How LaunchDarkly performs experiments](#how-launchdarkly-performs-experiments)
 * [What hypotheses are and how they relate to experiments](#what-hypotheses-are-and-how-they-relate-to-experiments)
 * [Types of experiments](#types-of-experiments)
 * [Feature change experiments](#feature-change-experiments)
 * [Funnel optimization experiments](#funnel-optimization-experiments)
 * [Data Export experiments](#data-export-experiments)
 * [Warehouse native experiments](#warehouse-native-experiments)
 * [A/A tests](#aa-tests)
 * [Generate ideas](#generate-ideas)
 * [Formulate a hypothesis](#formulate-a-hypothesis)
 * [Choose a sample size](#choose-a-sample-size)
 * [Sample sizes for Bayesian experiments](#sample-sizes-for-bayesian-experiments)
 * [Sample sizes for frequentist experiments](#sample-sizes-for-frequentist-experiments)
 * [Experimentation keys](#experimentation-keys)
 * [Determine an audience](#determine-an-audience)
 * [Mutually exclusive experiments](#mutually-exclusive-experiments)
 * [Holdouts](#holdouts)
 * [Choose variations](#choose-variations)
 * [Metrics and variations](#metrics-and-variations)
 * [Set experiment metrics](#set-experiment-metrics)
 * [Decide which metrics to use](#decide-which-metrics-to-use)
 * [Metric types](#metric-types)
 * [Choose how many and what kind of metrics to use](#choose-how-many-and-what-kind-of-metrics-to-use)
 * [Choose an analysis method](#choose-an-analysis-method)
 * [Create a roadmap](#create-a-roadmap)
 * [Build and run an experiment](#build-and-run-an-experiment)
 * [After the experiment completes](#after-the-experiment-completes)
 * [Conclusion](#conclusion)
## Overview
This guide provides strategies and best practices to design an effective experiment in LaunchDarkly.
The changes you make to your applications should be purposeful and provide value to the businesses you support and the people who use your software. But how do you know that the decisions you make are valuable? Experimentation can help you determine this.
It is critical to plan out and document experiments before you run them. Experiment design documents contain the definition of why you are running this test and the decisions you want to make based on its outcomes.
The guide covers the following topics:
 * Types of experiments
 * Generating ideas
 * Formulating a hypothesis
 * Choosing your sample size
 * Determining an audience
 * Choosing variations
 * Setting experiment metrics
 * Creating a roadmap
To learn more about Experimentation, read [Experimentation](/docs/home/experimentation). To learn about Experimentation use cases, read [Example experiments](/docs/guides/experimentation/example-experiments).
To get started building your own experiment, follow our [Quickstart for Experimentation](/docs/home/experimentation/quickstart).
## Prerequisites
To complete this guide, you must have the following prerequisites:
 * A basic understanding of feature flags
 * A basic understanding of your business’s needs or key performance indicators (KPIs)
## Concepts
It’s not critical to understand these concepts completely, but some awareness of what they are will be helpful. Don’t worry if some of these items are complicated. Experimentation is a scientific discipline that takes time to learn and understand.
You should understand these concepts before you read this guide:
### How LaunchDarkly performs experiments
Experiments help you learn and demonstrate what you have learned to others. You can use experiments to gather supplemental data to confirm or refine your ideas. To learn more, read [Types of experiments](/docs/guides/experimentation/designing-experiments#types-of-experiments).
In LaunchDarkly, experiments can:
 * validate new ideas by testing multiple variations of a feature,
 * determine your user base’s interest in a feature before you build it,
 * gather performance data for a feature, service, or API,
 * increase the adoption of a product by determining the features your customers prefer,
 * drive revenue and conversion rate by rolling out successful variations to the rest of your user base,
 * and more.
You can create an experiment by connecting any flag or AI Config to a metric or group of metrics that you want to track. Because you can wrap any part of your technology stack or product in a feature flag, you can use experiments to test for much more than the efficacy of user interface (UI) changes.
### What hypotheses are and how they relate to experiments
A hypothesis is a theoretical statement that an experiment can prove or disprove. A well-constructed hypothesis has both a positive and negative result defined.
For example, you may hypothesize that changing the button position to the top-right corner will increase the site’s click-through rate, and leaving the button in its current position will not cause any changes to the site’s click-through rate.
To learn more about writing effective hypotheses, read [Formulate a hypothesis](/docs/guides/experimentation/designing-experiments#formulate-a-hypothesis).
## Types of experiments
Different types of experiments can test different types of hypotheses. LaunchDarkly supports several types of experiments, some of which you can run on AI Configs in addition to flags.
### Feature change experiments
Feature change experiments let you measure the effect different variations have on a metric. You can use feature change experiments to test a wide variety of feature changes. Feature change experiments are also sometimes called “A/B tests.”
Here are some examples of feature change experiments:
 * Feature validation: After developing a feature, make sure customer reaction to the feature is positive. If it’s not, iterate on the new feature until it’s neutral or positive for the target metric.
 * Risk mitigation: Some changes must go out. For example, upgrading to a new version of an operating system on all servers. It’s difficult to test all the failure scenarios before doing so, so you can roll these out slowly and watch critical metrics for dips.
 * Optimization: Used in different parts of an app where the app can be parameterized and new test configurations can be selected by an algorithm.
You can run feature change experiments on both flags and AI Configs.
### Funnel optimization experiments
A “funnel” is a marketing model that describes a customer’s journey through your purchasing or conversion cycle, typically from the awareness stage to the purchasing stage. LaunchDarkly’s funnel optimization experiments use multiple metrics to track the performance of each of the steps in your funnel over time.
Funnel experiments use funnel metric groups, which are reusable, ordered lists of metrics you can use to standardize what behavior you’re tracking across multiple experiments. To learn more, read [Funnel metric groups](/docs/home/metrics/metric-groups#funnel-metric-groups).
You can run funnel optimization experiments on both flags and AI Configs.
### Data Export experiments
Data Export experiments let you export experiment data to a third-party tool for analysis using [Data Export](/docs/integrations/data-export). Data Export experiments do not require a LaunchDarkly metric, and do not generate analysis results in the LaunchDarkly UI. This experiment type is useful when you want to use LaunchDarkly flags or AI Configs to manage your experiment, but have a preferred third-party analysis tool that allows you to import experiment data from other systems. To learn more, read [Creating Data Export experiments](/docs/home/experimentation/export).
You can run Data Export experiments on both flags and AI Configs.
### Warehouse native experiments
Warehouse native experiments let you connect LaunchDarkly to an external warehouse, such as Snowflake, and run experiments using events from that warehouse. To learn more, read [Warehouse native Experimentation](/docs/home/warehouse-native).
You can run funnel optimization experiments on flags, but not AI Configs.
### A/A tests
A/A tests are a type of feature change experiment that splits users into different, but identical, variations. When you run an A/A test, you compare two groups receiving the same product experience. This lets you validate that your experiment setup is working as intended, your metrics are tracking events as expected, and builds trust in your experiment results. If LaunchDarkly detects any unintended differences between variations, you can identify and correct sampling bias or configuration issues early.
You can run A/A tests on both flags and AI Configs.
## Generate ideas
When you plan your experiment, it can be helpful to identify it as a brief, simple explanation of what you are trying to prove and why. You may also want to explain where the rationale behind this experiment originates. References to any end user research, prior bugs, or feature requests provide context to what you are trying to achieve.
Here are some example questions you can answer with an experiment:
 * Does removing complexity and adding white space result in customers spending more time on the site?
 * Do more product images lead to increased sales?
 * Does page load time increase significantly when search results are sorted?
 * What is the best color for a call to action button?
 * What is the best location on the page for the button?
Remember that you can approach a solution from many perspectives. That means many hypotheses per idea and, potentially, multiple experiments.
## Formulate a hypothesis
A hypothesis is a theory or assumption that can be tested with an experiment. A hypothesis should be specific and answer a single question. You can phrase a hypothesis for a LaunchDarkly experiment as:
> If [I make a specific change to our codebase], then [one or more measurable metrics will improve] because [the change had this effect].
Secondary metrics can answer other questions you might have. Often, they are “guardrail” metrics that can ensure an experiment’s success. You may need to run multiple experiments to answer numerous questions about a feature.
Here are two example hypotheses:
> If we rewrite our results page in React, then we will reduce page load time and increase utilization because React has faster processing times than your current solution.
> If we add a chatbot to the second page of our account registration process, we will decrease incomplete signups and increase total signup completion because customers will have instant access to help.
Your hypothesis must be as robust and specific as possible to get useful data from your experiment. An imprecise hypothesis can allow more subjective interpretation of the results.
A good hypothesis has the following considerations:
 * Specific: The more specific you are in your expectations, the easier it is to determine whether you have a real effect and what you need to do next.
 * Rigorous: The hypothesis must have solid metrics to work toward, and you should review them regularly.
 * Multiplicative: A great hypothesis lets you generate further hypotheses. You should be able to build your next hypothesis from your results from the current one. It should generate value no matter what the results of the experiment.
## Choose a sample size
The number of end users included in an experiment is called the sample size. The larger an experiment’s sample size, the more confident you can be in the experiment’s outcome.
### Sample sizes for Bayesian experiments
If you are anticipating a relatively small sample size, we recommend using Bayesian statistics for your experimentation model, because you can still get useful results even with small sample sizes. We generally recommend you run Bayesian experiments for at least one week. For example, if your experiment needs to include 70,000 customers, it’s better to run an experiment that includes 10,000 customers per day for seven days, rather than an experiment that includes all 70,000 on the first day. This helps avoid “day of week” effects. To learn more about day of week effects and how they can affect your experiment, read [Carryover bias and variation reassignment](/docs/home/experimentation/carryover).
After you begin running an experiment, the experiment’s **Results** tab displays a sample size estimator in the “Summary” section that gives an estimate of how much more traffic needs to encounter your experiment before reaching your chosen probability to be best.
To learn more, read [Bayesian versus frequentist statistics](/docs/guides/experimentation/bayesian-frequentist).
### Sample sizes for frequentist experiments
When you assess a frequentist experiment’s viability, consider how many unique visitors it takes to get a representative sample of your audience. Sample size estimators can tell you things like how many visitors you need, how long the experiment should run for, an estimated impact of the experiment, and other information you need. To calculate these numbers, you can use LaunchDarkly’s [sample size calculator](https://launchdarkly.com/sample-size-calculator/).
When you use the sample size calculator, you can choose to calculate either:
 * the effect to sample size and duration, or
 * the sample size and duration to effect.
Expand the sections below to learn how to use each option.
###### Expand Effect to sample size and duration
Use this method to calculate the number of contexts, or sample size, you should include in an experiment when you know how big of an effect you want the treatment variation to have on your results.
To calculate the sample size, you need to know:
 * The **Relative effect** or **Absolute effect** you want the experiment to have:
 * Relative effect: the minimum difference in the metric between the control variation and the treatment variation, as a percentage.
 * Absolute effect: the minimum difference in the metric between the control variation and the treatment variation.
 * The **Exposure rate** of your experiment: The number of contexts you expect to be exposed to the experiment per day.
 * The **Control mean** : The average of the metric in the control variation. The control mean is also called the “control baseline.”
 * The **Control standard deviation** : How much individual measurements of the metric in the control variation would differ from the control mean.
You do not need to use or understand all of the advanced settings in order to use the calculator. However, if you are familiar with statistical concepts and want to calculate your sample size at a more granular level, you can specify several variables.
Other fields in the advanced setting section include:
 * **Alternative hypothesis** : The type of alternative for the hypothesis test. “Two-sided” tests whether the treatment is different from the control, “upper-tailed” tests whether the treatment is better than the control, and “lower-tailed” tests whether the treatment is worse than the control.
 * **Significance level** : The probability of detecting an effect when there is none, also called the false positive rate.
 * **Power** : The probability of correctly detecting an effect when an effect is truly present. The power is equal to `1` minus the false negative rate.
 * **Treatment proportion** : The proportion of traffic allocated to the treatment variation. The calculator assumes only two experiment variations: the control and treatment.
 * **Standard deviation ratio** : The ratio of the treatment variation standard deviation to the control variation standard deviation.
###### Expand Sample size and duration to effect
Use this method to calculate the estimated minimum detectable effect for an experiment when you know approximately how many contexts will be included in the experiment. The minimum detectable effect is an estimate of the smallest difference that the experiment will be able to detect between the control variation and a treatment variation in an experiment.
To calculate the minimum detectable effect, you need to know:
 * **Exposure rate** : The number of contexts you expect to be exposed to the experiment per day.
 * **Duration** or **Sample size** :
 * Duration: The number of days you plan to run the experiment.
 * Sample size: The total number of contexts you plan to include in the experiment.
 * the **Control mean** : The average of the metric in the control variation. The control mean is also called the “control baseline.”
 * the **Control standard deviation** : How much individual measurements of the metric in the control variation would differ from the control mean.
You do not need to use or understand all of the advanced settings in order to use the calculator. However, if you are familiar with statistical concepts and want to calculate your sample size at a more granular level, you can specify several variables.
Other fields in the advanced setting section include:
 * **Alternative hypothesis** : The type of alternative for the hypothesis test. “Two-sided” tests whether the treatment is different from the control, “upper-tailed” tests whether the treatment is better than the control, and “lower-tailed” tests whether the treatment is worse than the control.
 * **Significance level** : The probability of detecting an effect when there is none, also called the false positive rate.
 * **Power** : The probability of correctly detecting an effect when an effect is truly present. The power is equal to `1` minus the false negative rate.
 * **Treatment proportion** : The proportion of traffic allocated to the treatment variation. The calculator assumes only two experiment variations: the control and treatment.
 * **Standard deviation ratio** : The ratio of the treatment variation standard deviation to the control variation standard deviation.
To learn more about how to calculate sample sizes, read [Sample size calculations for frequentist experiments](/docs/guides/experimentation/sample-size-calc).
After you have calculated your sample size, you can run your experiment as long as you need until the experiment includes the desired number of participants.
### Experimentation keys
As you decide on a sample size, you may want to consider the number of Experimentation keys you have available in the LaunchDarkly plan you subscribe to. For example, if you have 50,000 Experimentation keys per month included in your plan, and you run ten experiments per month, you may want to limit your experiment audiences to no more than 5,000 keys each.
Experimentation keys include the total number of unique context keys, from server-side, client-side, AI, and edge SDKs, included in each experiment:
 * if the same context key is in one experiment multiple times, LaunchDarkly counts it as one Experimentation key
 * if the same context key is in two different experiments, LaunchDarkly counts it as two Experimentation keys
## Determine an audience
An experiment requires two or more samples to test against. You may want to run an experiment on all of your customers, or you may want to target customers based on certain attributes so you can run the experiment on a smaller sample of your population. For example, you may want to run your experiment only on customers in the United States, or only those that have an account with your business.
Here are some possible ways to construct your experiment sample:
 * Logged in as opposed to anonymous
 * By company
 * By geography
 * Randomly
If you want to restrict your experiment audience to only customers with certain attributes, create a targeting rule on the flag or AI Config you include in the experiment and run the experiment on that rule. If you don’t want to restrict the audience for your experiment, run the experiment on the flag or AI Config’s default rule. To learn more, read [Allocating experiment audiences](/docs/home/experimentation/allocation).
An experiment also requires determining who or what will be randomly assigned to each variation that you’re testing. For example, if you are testing an updated flow for processing purchase orders, you may want everyone in the same organization assigned to the same variation. If you are testing performance of a backend change, you may want each new request to your servers assigned to the same variation. When you build the experiment, you can choose which context kind to use as your randomization unit. To learn more, read [Randomization units](/docs/home/experimentation/randomization).
### Mutually exclusive experiments
You may also want to restrict your audience from being in more than one experiment at a time, or from being in two closely-related experiments at once. You can accomplish this by using layers to create mutually exclusive experiments. To learn more, read [Mutually exclusive experiments](/docs/home/experimentation/mutually-exclusive).
### Holdouts
Holdouts let you hold back a certain percentage of your audience from any running experiments. This lets you see the overall effect of your experiments on your customer base, and lets you answer questions about how effective the experiments you’re running are. If you are running a holdout, you will need to decide whether your new experiment should be included in the holdout or not. To learn more, read [Holdouts](/docs/home/holdouts).
## Choose variations
Before building the experiment, you need to decide how many variations you want to test, and what those variations are. For example, will you be testing a red checkout button versus a blue checkout button, or will you be testing a red versus a blue versus a green checkout button?
Then, you need to add the variations you choose to the flag or AI Config you are including in your experiment. To learn more, read [Creating flag variations](/docs/home/flags/variations) and [Create and manage AI Config variations](/docs/home/ai-configs/create-variation).
### Metrics and variations
##### Metrics should be applicable to all variations within an experiment
An experiment can only calculate a variation's probability to beat control or p-value if the primary metric can measure something within the variation. To learn more, read [Analyzing experiments](/home/experimentation/analyze).
A common goal of an experiment is finding out which variation performs better among a set of two or more options.
If you want to learn which variation performs better, it must be possible for that metric to measure something in all of the variations within the experiment.
For example, imagine you have a feature flag for a 1-click checkout process and a 2-click checkout process. The 2-click checkout process requires the use of a “Continue” button. For customers that use the 2-click checkout process, you want to find out if a red or blue “Continue” button results in more completed checkouts.
For this example, your flag would have three possible variations:
 * 1-click checkout
 * 2 click checkout with red button
 * 2 click checkout with blue button
The experiment will use a custom conversion count metric that tracks total clicks of the “Continue” button. Including customers that see the 1-click checkout process would skew your results, because those customers will never see either the red or the blue “Continue” button. Instead, you should exclude anyone that gets the “1-click checkout” variation from your experiment, so that the metric is applicable to all variations within the experiment.
## Set experiment metrics
A good experiment requires well-defined metrics. You must determine what kind and how many metrics to include in your experiment.
### Decide which metrics to use
Identifying the right metrics is imperative to getting accurate results from your experiments.
Choosing metrics that correctly measure the effect of a change on your customers or codebase can be difficult. Where possible, choose metrics that are a direct result of the changes you are making, rather than those that might be influenced by other factors. For example, if you know your business’ key performance indicators (KPIs), you may be able to break them down into smaller numeric goals, such as an item’s average revenue per order, a server’s response speed, or a link’s click-through rate. These goals might make useful metrics to track in an experiment.
### Metric types
LaunchDarkly supports the following metric types:
 * [Clicked or tapped conversion metrics](/docs/home/metrics/click): Tracks the clicks on a UI element. For example, how frequently a customer clicks the Save button. Only compatible with JavaScript-based SDKs.
 * [Custom conversion binary metrics](/docs/home/metrics/custom): Tracks events for any arbitrary event. For example, whether or not a customer search called a service.
 * [Custom conversion count metrics](/docs/home/metrics/custom-count): Counts events for any arbitrary event. For example, how many times a customer search called a service.
 * [Custom numeric metrics](/docs/home/metrics/custom-numeric): Tracks increases or decreases in numeric value against a baseline you set. For example, how many items are in a customer’s cart when they check out of your online store.
 * [Page viewed conversion metrics](/docs/home/metrics/pageview): Tracks how many times a page is viewed. For example, how many times a blog post is viewed based on three different titles. Only compatible with JavaScript-based SDKs.
To learn more, read [Choose a metric type](/docs/home/metrics/create-metrics#choose-a-metric-type).
### Choose how many and what kind of metrics to use
With feature change experiments, you will choose one primary metric to base your decision making on. With each additional metric you add to an experiment, decision making becomes harder, which is why you can choose only one primary metric. Your primary metric can be an individual metric you attach to the experiment, or part of a metric group. To learn more, read [Primary and secondary metrics](/docs/home/experimentation/types#primary-and-secondary-metrics).
With funnel optimization experiments, you will choose a funnel metric group to base your decision making on. The order of metrics within funnel metric groups affects how LaunchDarkly analyzes the metrics. When you create a funnel metric group, each metric should measure a required step in the user journey. Users should not be able to skip any steps the funnel group is measuring, or take any steps out of order. Doing so will skew your experiment results. To learn more, read [Metric groups](/docs/home/metrics/metric-groups).
## Choose an analysis method
LaunchDarkly offers two analysis methods: Bayesian and frequentist. Bayesian statistics and frequentist statistics only differ significantly in two ways: in smaller sample sizes and in interpretation.
Bayesian statistics is useful for experiments with small sample sizes. We generally recommend using Bayesian statistics for experiments that will have sample sizes in the hundreds or fewer. Bayesian statistics provides a probability for each treatment variation, as well as the control variation.
Frequentist statistics is useful when you have sample sizes in the thousands or more. Frequentist experiment results provide a p-value, or statistical significance, for each treatment as it compares to the control.
To learn more about when you might use Bayesian versus frequentist statistics, read [Bayesian versus frequentist statistics](/docs/guides/experimentation/bayesian-frequentist).
## Create a roadmap
There are many tools to help you manage an experiment’s roadmap. Jira, Trello, Asana, Excel, and Google Sheets are all good candidates for storing and logging information on experiments.
Your roadmap should contain the following:
 * Experiment name.
 * Experiment description.
 * Experiment hypothesis.
 * Sample size: how much traffic you need before you can check your results and determine an outcome.
 * Audience: the target population for your experiment and the logic you use to identify it.
 * Variations: how many variations this experiment uses, and what percentage of traffic each is assigned.
 * Metrics and metric groups: which metric types you are using and why.
 * Location: the project and environment within LaunchDarkly where your experiment will run.
 * Layers: whether the experiment should be part of a set of mutually exclusive experiments.
 * Holdouts: whether to include the experiment in a running holdout.
 * The date your experiment will start.
 * How long your experiment will run.
 * Status: whether your experiment is still being drafted, is running, is being analyzed after collecting data, or is complete.
 * Priority in comparison to other experiments and projects.
## Build and run an experiment
After your have designed your experiment, it’s time to build and run it. To learn how, read [Creating experiments](/docs/home/experimentation/create).
## After the experiment completes
One of the advantages of flag- or AI Config-based experimentation is that your engineering team can immediately roll out the winning variation to the appropriate audiences. The winning variation for a completed experiment is the variation that is most likely to be the best option out of all of the variations you tested. To learn more, read [Analyzing experiments](/docs/home/experimentation/analyze).
If you’re not ready to roll out the winning variation yet, you can change the variations in an experiment in order to measure different data. Iterations of an experiment build on the value you have generated and allow you to pivot and investigate further.
## Conclusion
In this guide you have learned some of the key concepts of experimentation and how to design experiments using feature flags and AI Configs.
We recommend these external resources to learn more about building experiments:
 * [What is A/B Testing? The Complete Guide: From Beginner to Pro](https://cxl.com/blog/ab-testing-guide/)
 * [Your First Chaos Experiment](https://www.gremlin.com/community/tutorials/your-first-chaos-experiment/)
 * [How to run a successful beta in 7 steps](https://www.intercom.com/blog/how-to-run-a-successful-beta/)
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs