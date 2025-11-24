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
 * [Example: new user sign-up flow](#example-new-user-sign-up-flow)
 * [Create the feature flag](#create-the-feature-flag)
 * [Create metrics](#create-metrics)
 * [Create the “Sign-up button clicked” metric](#create-the-sign-up-button-clicked-metric)
 * [Create the “Sign-up info entered” metric](#create-the-sign-up-info-entered-metric)
 * [Create the “Sign-up completed” metric](#create-the-sign-up-completed-metric)
 * [Create a funnel metric group](#create-a-funnel-metric-group)
 * [Build the experiment](#build-the-experiment)
 * [Turn flag targeting on and start an iteration](#turn-flag-targeting-on-and-start-an-iteration)
 * [Experiment results](#experiment-results)
 * [Conclusion](#conclusion)
## Overview
This guide provides an example of how to create and read the results of a funnel optimization experiment.
A “funnel” is a marketing model that describes a customer’s journey through your purchasing cycle, typically from the awareness stage to the purchasing stage. LaunchDarkly’s funnel optimization experiments use multiple metrics to track the performance of each of the steps in your funnel over time, and provide results specific to those product funnels. You can use funnel metric groups with funnel optimization experiments to measure the results of multi-step user journeys.
Funnel optimization experiments let your product and marketing teams safely and rapidly increase the performance of your funnels by:
 * measuring the performance of your main acquisition and engagement channels
 * identifying strong points and weak points in your funnel flow
 * testing changes to ensure your funnel’s effectiveness improves over time
## Prerequisites
To complete this guide, you must have the following prerequisites:
 * an understanding of your user funnel and the metrics you want to track at each step in the funnel
 * an active LaunchDarkly account with Experimentation enabled, and with permissions to create flags, metrics, and experiments
## Concepts
Before you build an experiment, you should read about and understand the following:
 * [randomization units](/docs/home/experimentation/randomization)
 * [Bayesian and frequentist statistics](/docs/guides/experimentation/bayesian-frequentist)
## Example: new user sign-up flow
In this example, we’ll demonstrate how to create an experiment that measures the effectiveness of two different versions of a sign-up form on increasing sign-ups for a product. The experiment will measure the effect on each step in the funnel and determine the most effective variation overall.
Creating this experiment requires six steps:
 1. [Creating a feature flag to experiment on](/docs/guides/experimentation/funnel-optimization#create-the-feature-flag): You can create a new flag, or you may already have an existing flag, to run an experiment on. This flag should control the feature on your site you want to experiment on, and include the variations you want to test as well as a control variation. You can use a boolean flag if you have just one variation to test in addition to the control, or a multivariate flag if you have more than one.
 2. [Creating the metrics for your metric group](/docs/guides/experimentation/funnel-optimization#create-metrics): Create a metric for each end-user action you want to track as part of your funnel. This might include actions like clicking a sign-up button, entering contact information, opting in to receive emails, and completing payment.
 3. [Creating a funnel metric group](/docs/guides/experimentation/funnel-optimization#create-a-funnel-metric-group): Funnel metric groups organize your metrics together in a set order. This ensures you’re tracking end-user behavior in the correct sequence, and lets you reuse the same group in multiple experiments so you don’t have re-set up your metrics each time.
 4. [Building the experiment](/docs/guides/experimentation/funnel-optimization#build-the-experiment): Building the experiment connects the metric group to your flag and determines the audience you want to run the experiment on.
 5. [Turning flag targeting on and starting an iteration](/docs/guides/experimentation/funnel-optimization#turn-flag-targeting-on-and-start-an-iteration): Your experiment will begin recording data after you turn on flag targeting and start an iteration. You can stop the iteration after you have received enough results to make a decision about the winning variation.
 6. [Reading experiment results](/docs/guides/experimentation/funnel-optimization#experiment-results): The experiment’s **Results** tab includes information about how each variation performed in each step of the funnel, as well as the winning variation overall.
These steps are explained in detail below.
## Create the feature flag
Imagine you have noticed that in your sign up flow, a lot of users drop off at your payment step. You think it might be related to the user interface (UI), so you’re going to test two new versions of the payment screen.
To test these versions, first create a feature flag for your experiment with three variations: a payment option with a drop-down menu, with a radio button, and with the current UI which will serve as the control.
To create the flag:
 1. Click **Create** and choose **Flag**. The “Create flag” dialog appears.
 2. Enter “Enable new sign-up menu options” for the **Name**. A suggested key auto-populates from the name you enter, but you can customize it if you wish.
 3. (Optional) Click **Edit key** to update the flag key. You’ll use this key to reference the flag in your code.
 4. (Optional) Enter a **Description** of the flag. A brief, human-readable description helps your account members understand what the flag is for.
 5. (Optional) Click **No template** and select **Experiment**. The flag type updates to **String**.
 6. Click **Create flag**. The flag **Targeting** tab appears.
 7. Click the **Variation** tab.
 8. For variation 1, update the **Name** to “Control.”
 9. For variation 2, update the **Name** to “Dropdown select.”
 10. For variation 3, update the **Name** to “Radio select.”
 11. Click **Review and save**.
Here is what the **Variations** section of a flag’s right sidebar looks like:
![The "Variations" section of a flag's right sidebar for use in a funnel optimization experiment.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/b0db2a7b2b32d3e534039d6164d6d2715827acb5e2d693440f5211832c1b3740/assets/images/auto/guide-optimization-flag.auto.png)
The "Variations" section of a flag's right sidebar for use in a funnel optimization experiment.
To learn more about creating flags, read [Create flags](/docs/home/flags/create).
## Create metrics
Next, create the metrics in your funnel.
In this example, your sign-up flow has the following steps:
 1. The customer clicks your site’s “Sign up” button
 2. They enter their personal information
 3. They click the “Pay now” button
This table explains the metrics you will create for this example:
Name | Metric type | Target type | Randomization unit 
---|---|---|--- 
Sign-up button clicked | Clicked or tapped | Exact match | user 
Sign-up info entered | Custom conversion binary | n/a | user 
Sign-up completed | Clicked or tapped | Exact match | user 
### Create the “Sign-up button clicked” metric
To create the first clicked or tapped metric:
 1. Navigate to the **Metrics** list.
 2. Click **Create metric**. The “Create metric” dialog appears.
 3. Select an event kind of **Clicked or tapped**.
 4. Enter the CSS selector for your sign-up button in the **Click targets** field. In this example, the selector is `.button`.
 5. Select the “exact match” **Target type**.
 6. Enter the **Target URL** that corresponds to your sign-up button:
![A clicked or tapped metric with a "user" randomization unit.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/9cde92aec2aa36cb34a9a1ff354b7fbfea511b9cc8ff50fbed66ba87ab293cf9/assets/images/auto/optimization-click-metric.auto.png)
A clicked or tapped metric with a "user" randomization unit.
 1. Choose **Occurrence** as what you want to measure.
 2. In the “Metric definition” section, select “Percentage of **User** units that clicked”
 3. Enter “Sign-up button clicked” as the **Name**.
 4. Click **Create metric**.
### Create the “Sign-up info entered” metric
To create the second custom conversion binary metric:
 1. Navigate to the **Metrics** list.
 2. Click **Create metric**. The “Create metric” dialog appears.
 3. Select an event kind of **Custom**.
 4. Enter an **Event key** such as `info-entered`. You will reference this event name in your code snippet when you insert the metric information into your app.
 5. Choose **Occurrence** as what you want to measure.
 6. In the “Metric definition” section, select the following:
 * Percentage of **User** units that sent the event,
 * **where higher is better**
 1. Enter “Sign-up info entered” as the **Name**.
 2. Click **Create metric**.
### Create the “Sign-up completed” metric
To create the third metric, repeat the process for creating the “Sign-up button clicked” clicked or tapped metric, but name the metric “Sign-up completed” with a target type of “Exact match.”
To learn more, read [Metrics](/docs/home/metrics).
## Create a funnel metric group
Now that you have created your metrics, you can combine them together into a funnel metric group.
To create your funnel metric group:
 1. Navigate to the **Funnel groups** tab from the **Metrics** list.
 2. Click **Create metric group**. The “Create metric group” dialog appears.
 3. Enter “New plan sign-up flow” for the **Name**.
 4. Enter “click sign up” as the first **Step name**.
 5. Choose the “Sign-up button clicked” metric from the **Metric** menu.
 6. Enter “Info entered” as the second **Step name**.
 7. Choose the “Sign-up info entered” metric from the **Metric** menu:
![A funnel optimization group with two steps added.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/1b34b2bdfea03e3844be6281713aab4b25860dde464dd2703dfe82510aca88ef/assets/images/auto/optimization-funnel-group.auto.png)
A funnel optimization group with two steps added.
 1. Click **Add metric** and repeat steps 4-5 for the remaining step in your funnel.
 2. Click **Create metric group**.
##### Metric order is important
The order of your metrics within a funnel metric group must match the order of the steps your users will take within the funnel. If they do not match the order of your user flow, your experiment results will be invalid.
To learn more, read [Metric groups](/docs/home/metrics/metric-groups).
## Build the experiment
Next, it’s time to put it all together to create a funnel optimization experiment.
As you decide on the percentage of traffic you want to include in the experiment, you may want to consider the number of Experimentation keys you have available in the LaunchDarkly plan you subscribe to. For example, if you have 50,000 Experimentation keys per month included in your plan, and you run ten experiments per month, you may want to limit your experiment audiences to no more than 5,000 keys each. To learn more, read [Experimentation keys](/docs/home/account/calculating-billing#experimentation-keys).
To build the experiment:
 1. Click **Create** and choose **Experiment**. The experiment **Design** tab appears.
 2. Select the **Funnel optimization** experiment type.
 3. Enter an experiment **Name**.
 4. Enter a **Hypothesis** such as “If we use a better sign-up UI, then we will see a higher number of overall sign ups for the product because customers will navigate the site more easily.”
 5. Choose your “New plan sign-up flow” Funnel group from the **Metrics** list.
![The "Select metrics" step of a new funnel optimization experiment.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/bcaca8cfabf36f77d9e27ff3b87d86c4e1172b8e6fc1048ba1a5d5ee5023afa2/assets/images/__toPlaywright_newIA/optimization-select-funnel-group.png)
The "Select metrics" step of a new funnel optimization experiment.
 1. Choose “Enable new sign-up menu options” from the **Flag or AI Config** menu.
 2. Choose “user” as the [randomization unit](/docs/home/experimentation/randomization) to **Target by**.
 3. Choose the default targeting rule for the **Experiment audience**.
![The "Audience targeting" section with the default rule chosen.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/39503b0adb7e876fa64cde29342d11ab9b06de5c05a2218fe8c06f7057729d77/assets/images/__toPlaywright_newIA/experiment-builder-define-audience.png)
The "Audience targeting" section with the default rule chosen.
 1. Select the **Sample size** for the experiment. For this example, we suggest including 10% of all contexts in the experiment.
 2. Choose “Control” for the **Variation served to users outside this experiment**. Contexts that are not in the experiment will receive this variation.
 3. Select **Split equally** for the variations split.
 4. Select the “Control” variation to serve as the **Control**.
 5. Select a **Statistical approach** of Bayesian or frequentist.
 * If you selected a statistical approach of Bayesian, select a preset or **Custom** success threshold.
 * If you selected a statistical approach of frequentist, select:
 * a **Significance level**.
 * a one-sided or two-sided **Direction of hypothesis test**.
###### Expand statistical approach options
You can select a statistical approach of **Bayesian** or **Frequentist**. Each approach includes one or more analysis options.
The Bayesian options include:
 * **Threshold** :
 * **90%** probability to beat control is the standard success threshold, but you can raise the threshold to **95%** or **99%** if you want to be more confident in your experiment results.
 * You can lower the threshold to less than 90% using the **Custom** option. We recommend a lower threshold only when you are experimenting on non-critical parts of your app and are less concerned with determining a clear winning variation.
The frequentist options include:
 1. **Significance level** :
 * **0.05** p-value is the standard significance level, but you can lower the level to **0.01** or raise the level to **0.10** , depending on whether you need to be more or less confident in your results. A lower significance level means that you can be more confident in your winning variation.
 * You can raise the significance level to more than 0.10 using the **Custom** option. We recommend a higher significance level only when you are experimenting on non-critical parts of your app and are less concerned with determining a clear winning variation.
 2. **Direction of hypothesis test** :
 * **Two-sided** : We recommend two-sided when you’re unsure about whether the difference between the control and the treatment variations will be negative or positive, and want to look for indications of statistical significance in both directions.
 * **One-sided** : We recommend one-sided when you feel confident that the difference between the control and treatment variations will be either negative or positive, and want to look for indications of statistical significance only in one direction.
 3. (Optional) Select a [Multiple comparisons correction](/docs/guides/statistical-methodology/mcc) option:
 * Select **Apply across treatments** to correct for additional comparisons from multiple treatments
 * Select **Apply across metrics** to correct for additional comparisons across multiple metrics
 * Select **Apply across both metrics and treatments** to correct for additional comparisons from multiple metrics and multiple treatments
To learn more, read [Bayesian versus frequentist statistics](/docs/guides/experimentation/bayesian-frequentist).
 1. Scroll to the top of the page and click **Save**.
To learn more, read [Creating experiments](/docs/home/experimentation/create).
## Turn flag targeting on and start an iteration
When you’re ready, turn your flag’s targeting on and begin recording results by clicking **Start** on the experiment’s **Design** tab:
![An experiment with the "Start" button called out.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/4856586600e776039dac53473c7f3f577efab2d83cf765772a56660a4f528659/assets/images/__toPlaywright_newIA/experiment-details-start-callout.png)
An experiment with the "Start" button called out.
To learn more, read [Turning flags on and off](/docs/home/flags/toggle) and [Start experiment iterations](/docs/home/experimentation/start-stop-exp#start-experiment-iterations).
## Experiment results
After enough users have encountered your experiment, you can evaluate its performance on the experiment’s **Results** tab. Here, you can see that variation 2 has a conversion rate of 3.67%:
![The winning variation on an experiment's "Results" tab.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/2287d3e8eb1ee3d4a250de97da37aeb2f8fdf12239beb2e113c47bfa71281f27/assets/images/__LD_UI_no_test/guide-optimization-funnel-probability-report.png)
The winning variation on an experiment's "Results" tab.
However, you can also see that in the second “Sign-up info entered” step, the control variation actually performed slightly better at 7.76% than variation 2 at 4.75%, but for some reason users aren’t completing the purchase as often. Still, LaunchDarkly declared variation 2 the winner because it had the highest conversion rate of all the variations in the funnel overall.
To learn more, read [Analyzing experiments](/docs/home/experimentation/analyze).
##### You can also send data to and run experiments with Snowflake
Snowflake users who want to explore this data more in-depth can send all of the experiment data to a Snowflake database using the Snowflake Data Export integration. By exporting your LaunchDarkly experiment data to the same Snowflake warehouse as your other data, you can build custom reports in Snowflake to answer product behavior questions. To learn more, read [Snowflake Data Export](/docs/integrations/data-export/snowflake).
You can also run warehouse native experiments in LaunchDarkly using data coming directly from your Snowflake warehouse. To learn more, read [Snowflake native Experimentation](/docs/home/warehouse-native/snowflake).
## Conclusion
In this guide you learned how to create a funnel optimization experiment to measure the success of a user funnel. You learned how to create the flag, how to set up metrics and a metric group, how to build the experiment, and how to interpret funnel optimization experiment results.
To get started building your own experiment, follow our [Quickstart for Experimentation](/docs/home/experimentation/quickstart).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs