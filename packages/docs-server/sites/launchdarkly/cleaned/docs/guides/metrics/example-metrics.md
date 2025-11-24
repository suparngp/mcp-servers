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
 * [Metrics and metric events](#metrics-and-metric-events)
 * [Create metrics](#create-metrics)
 * [Metric definition options](#metric-definition-options)
 * [Clicked or tapped conversion metric options](#clicked-or-tapped-conversion-metric-options-1)
 * [Custom conversion binary metric options](#custom-conversion-binary-metric-options-1)
 * [Custom conversion count metric options](#custom-conversion-count-metric-options-1)
 * [Custom numeric metric options](#custom-numeric-metric-options-1)
 * [Page viewed conversion metric options](#page-viewed-conversion-metric-options)
 * [Examples: average purchase price per user](#examples-average-purchase-price-per-user)
 * [Average purchase price per user: only users who made a purchase](#average-purchase-price-per-user-only-users-who-made-a-purchase)
 * [Average purchase price per user: all users](#average-purchase-price-per-user-all-users)
 * [Example: percentile purchase price per user](#example-percentile-purchase-price-per-user)
 * [Examples: average revenue per user](#examples-average-revenue-per-user)
 * [Average revenue per user: only users who generated revenue](#average-revenue-per-user-only-users-who-generated-revenue)
 * [Average revenue per user: all users](#average-revenue-per-user-all-users)
 * [Example: average number of purchases](#example-average-number-of-purchases)
 * [Average number of purchases: per user who purchased](#average-number-of-purchases-per-user-who-purchased)
 * [Example: latency](#example-latency)
 * [Latency excluding the slowest 1% of results](#latency-excluding-the-slowest-1-of-results)
 * [Conclusion](#conclusion)
## Overview
This guide provides examples of metrics you can use with LaunchDarkly features such as Experimentation and guarded rollouts.
Metrics measure audience behaviors in your app or product and how those behaviors are affected by different flag variations. You can use metrics to track all kinds of things, from how often end users access a URL to how long that URL takes to load a page. How you set up a metric varies depending on what you want to measure. The examples included in this guide will help you understand how to configure metrics to meet your business needs.
##### You can narrow your analysis to specific context attributes or event properties
You can apply [metric event filters](/docs/home/metrics/event-filters) to any of these examples to include only events that match specific context attributes or event properties. For example, you might filter a “Sign-up conversion” metric to include only users where the `country` context attribute is `US` or the `plan` context attribute is `enterprise`.
## Metrics and metric events
An event happens when someone takes an action in your app, such as clicking on a button, or when a system takes an action, such as loading a page. Your SDKs send these metric events to LaunchDarkly, where it can aggregate and analyze them using metrics. LaunchDarkly can then quantify the overall performance and health of your product and provide suggestions on how to respond.
For example, you can set up a purchase event in your app that sends the following information to LaunchDarkly:
 * who made the purchase
 * the amount of money spent
 * the number of items purchased
Then you can configure a metric to calculate the average purchase total per user. With this metric, you can use Experimentation to compare two different versions of your shopping cart against each other to see which results in higher purchase totals, or use guarded rollouts to track purchase totals after you toggle on a site redesign to see if totals go up or down.
To learn more about events, read about [click events](/docs/integrations/data-export/schema-reference#click-events), [page view events](/docs/integrations/data-export/schema-reference#page-view-events), and [custom events](/docs/integrations/data-export/schema-reference#custom-events). To learn about how SDKs send events to LaunchDarkly, read [Sending custom events](/docs/sdk/features/events).
## Create metrics
There are five different types of metrics in LaunchDarkly:
 * [Clicked or tapped conversion](/docs/home/metrics/click): tracks how often an end user interacts with an element of your product’s UI.
 * [Custom conversion binary](/docs/home/metrics/custom): tracks whether a custom event occurs. You can use this metric with any event you set up in your codebase.
 * [Custom conversion count](/docs/home/metrics/custom-count): tracks how many times a custom event occurs. You can use this metric with any event you set up in your codebase.
 * [Custom numeric](/docs/home/metrics/custom-numeric): tracks changes to the amount of something, such as dollars spent or latency time.
 * [Page viewed conversion](/docs/home/metrics/pageview): tracks page views.
You do not need to understand each of these options in-depth to use this guide, because each of the provided examples includes the suggested metric types. However, if you want a full explanation of each of these options, read [Choose a metric type](/docs/home/metrics/create-metrics#choose-a-metric-type).
### Metric definition options
When you create a metric, you must decide how you want to handle its metric definition. A metric’s definition options vary based on metric type.
Expend each section below to read about different metric definition options.
###### Clicked or tapped conversion metric options
### Clicked or tapped conversion metric options
When you create a clicked or tapped conversion metric, you must first decide:
 * What do you want to measure:
 * **Count** : the number of times a target was clicked.
 * **Occurrence** : whether or not a target was clicked.
Then, clicked or tapped conversion metric definition options include:
 * Analysis method:
 * for metrics measuring count, you can analyze by:
 * **Average** : “average” is the default analysis method. This method calculates the average number of clicks or taps per context. For metrics you plan to use in funnel experiments, you must select “Average.”
 * **Percentile** : you can choose between P50-P99, which represent the 50th through the 99th percentile. This method counts the clicks or taps per context, then finds the number of clicks or taps that fall into the chosen percentile.
 * for metrics measuring occurrence, the metric automatically sets the analysis method to “average.”
 * **Randomization unit** : one or more context kinds, such as “user,” “device,” or “request,” that the metric can measure events from.
##### Percentile analysis methods for Experimentation are in beta
The default metric analysis method is “Average.” The use of percentile analysis methods with LaunchDarkly experiments is in beta. If you use a metric with a percentile analysis method in an experiment with a large audience, the experiment results tab may take longer to load, or the results tab may time out and display an error message. Percentile analysis methods are also not compatible with [CUPED adjustments](/docs/guides/statistical-methodology/cuped).
###### Custom conversion binary metric options
### Custom conversion binary metric options
When you create a custom conversion binary metric, you must first select **Occurrence** for what you want to measure.
Then, custom conversion binary metric definition options include:
 * **Randomization unit** : one or more context kinds, such as “user,” “device,” or “request,” that the metric can measure events from.
 * Success criteria:
 * **Higher is better** : choose this option for metrics measuring positive things like cart checkouts or sign-ups.
 * **Lower is better** : choose this option for metrics measuring negative things like errors.
###### Custom conversion count metric options
### Custom conversion count metric options
When you create a custom conversion count metric, you must first select **Count** for what you want to measure.
Then, custom conversion count metric definition options include:
 * Analysis method:
 * **Average** : “average” is the default analysis method. This method calculates the average number of conversions per context. For metrics you plan to use in funnel experiments, you must select “Average.”
 * **Percentile** : you can choose between P50-P99, which represent the 50th through the 99th percentile. This method counts the conversions per context, then finds the number of conversions that fall into the chosen percentile.
 * **Randomization unit** : one or more context kinds, such as “user,” “device,” or “request,” that the metric can measure events from.
 * Success criteria:
 * **Higher is better** : choose this option for metrics measuring positive things like cart checkouts or sign-ups.
 * **Lower is better** : choose this option for metrics measuring negative things like errors.
##### Percentile analysis methods for Experimentation are in beta
The default metric analysis method is “Average.” The use of percentile analysis methods with LaunchDarkly experiments is in beta. If you use a metric with a percentile analysis method in an experiment with a large audience, the experiment results tab may take longer to load, or the results tab may time out and display an error message. Percentile analysis methods are also not compatible with [CUPED adjustments](/docs/guides/statistical-methodology/cuped).
###### Custom numeric metric options
### Custom numeric metric options
When you create a custom numeric metric, you must first decide:
 * **how multiple event values are aggregated per unit** :
 * **Sum** : the total value per unit. For example, this option adds together the total purchase amount of all of a customer’s purchases.
 * **Average** : the average value per unit. For example, this option takes the average purchase price of all of a customer’s purchases.
 * What do you want to measure: select **Value/size**.
Then, custom numeric metric definition options include:
 * Analysis method:
 * **Average** : “average” is the default analysis method. For metrics you plan to use in funnel experiments, you must select “Average.”
 * **Percentile** : you can choose between P50-P99, which represent the 50th through the 99th percentile.
 * **Randomization unit** : one or more context kinds, such as “user,” “device,” or “request,” that the metric can measure events from.
 * Success criteria:
 * **Higher is better** : choose this option for metrics measuring positive things like cart checkouts or sign-ups.
 * **Lower is better** : choose this option for metrics measuring negative things like errors.
 * Units without events:
 * **Exclude units that did not send any events from the analysis** : this option is best for latency metrics. If LaunchDarkly never receives an event for a context instance, you do not want to default to 0 because LaunchDarkly would interpret this as an extremely fast latency time, which would skew or invalidate the results.
 * **Include units that did not send any events and set their value to 0** : this option is best for metrics where an incomplete process can be treated the same as 0, such as tracking cart totals for an online store. In this example, customers who put items in their cart but never completed the checkout process are treated as if they purchased $0.
 * **Unit of measure** : the label for what the metric is measuring, such as dollars or milliseconds.
##### Percentile analysis methods for Experimentation are in beta
The default metric analysis method is “Average.” The use of percentile analysis methods with LaunchDarkly experiments is in beta. If you use a metric with a percentile analysis method in an experiment with a large audience, the experiment results tab may take longer to load, or the results tab may time out and display an error message. Percentile analysis methods are also not compatible with [CUPED adjustments](/docs/guides/statistical-methodology/cuped).
###### Page viewed metric options
### Page viewed conversion metric options
When you create a page viewed conversion metric, you must first decide:
 * What do you want to measure:
 * **Count** : the number of times a page was viewed.
 * **Occurrence** : whether or not a page was viewed.
Then, page viewed metric definition options include:
 * Analysis method:
 * for metrics measuring count, you can analyze by:
 * **Average** : “average” is the default analysis method. This method calculates the average number of page views per context. For metrics you plan to use in funnel experiments, you must select “Average.”
 * **Percentile** : you can choose between P50-P99, which represent the 50th through the 99th percentile. This method counts the page views per context, then finds the number of page views that fall into the chosen percentile.
 * for metrics measuring occurrence, the metric automatically sets the analysis method to “average.”
 * **Randomization unit** : one or more context kinds, such as “user,” “device,” or “request,” that the metric can measure events from.
##### Percentile analysis methods for Experimentation are in beta
The default metric analysis method is “Average.” The use of percentile analysis methods with LaunchDarkly experiments is in beta. If you use a metric with a percentile analysis method in an experiment with a large audience, the experiment results tab may take longer to load, or the results tab may time out and display an error message. Percentile analysis methods are also not compatible with [CUPED adjustments](/docs/guides/statistical-methodology/cuped).
You do not need to understand each of these options in-depth to use this guide, because each of the provided examples includes the suggested unit analysis options. However, if you want a full explanation of each of these options, read [Metric analysis](/docs/home/metrics/metric-analysis).
## Examples: average purchase price per user
This section includes the configuration options for common custom numeric metrics related to average purchase price per user. For all of the examples in this section, the randomization unit is “user.”
### Average purchase price per user: only users who made a purchase
###### Expand Average purchase price per user: only users who made a purchase
You can use this custom numeric metric to learn the average amount of money spent by users who made a purchase.
The metric configuration options include:
 * Event kind: **Custom**
 * What do you want to measure: **Value/size**
 * How multiple event values are aggregated per unit: **Average**
 * Analysis method: **Average**
 * Randomization unit: **User**
 * Success criterion: Higher is better
 * Units without events: **Exclude units that did not send any events from the analysis**
 * Unit of measure: USD
Here is what the metric setup looks like:
![The metric creation dialog.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/23281038a68786d14a717f0e43c9aff9e088161693860a3607617043814d44a5/assets/images/auto/metric-examples-1.auto.png)
The metric creation dialog.
Here is an example of how the metric calculates its results:
Step 1 | Step 2 | Step 3 
---|---|--- 
Users mde the following purchases:
 * User A: 5,5, 5,15
 * User B: $10
 * User C: $7
 * User D: $0 (no purchases)
| The metric calculates the average for each user, excluding those who didn’t purchase anything:
 * User A: $10
 * User B: $10
 * User C: $7
| The metric then calculates the average purchase price per user:
 * Result: $9
This means that buyers spend an average of $9.
### Average purchase price per user: all users
###### Expand Average purchase price per user: all users
You can use this custom numeric metric to learn the average amount of money spent by all users, whether or not they made a purchase.
The metric configuration options include:
 * Event kind: **Custom**
 * What do you want to measure: **Value/size**
 * How multiple event values are aggregated per unit: **Average**
 * Analysis method: **Average**
 * Randomization unit: **User**
 * Success criterion: Higher is better
 * Units without events: **Include units that did not send any events and set their value to 0**
 * Unit of measure: USD
Here is what the metric setup looks like:
![The metric creation dialog.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/97bf69aeebea8c515124066f1e9e13242b9a2454c8194fcdcc8eae9627960039/assets/images/auto/metric-examples-2.auto.png)
The metric creation dialog.
Here is an example of how the metric calculates its results:
Step 1 | Step 2 | Step 3 
---|---|--- 
Users mde the following purchases:
 * User A: 5,5, 5,15
 * User B: $10
 * User C: $7
 * User D: $0 (no purchases)
| The metric calculates the average for each user, including those who didn’t purchase anything:
 * User A: $10
 * User B: $10
 * User C: $7
 * User D: $0
| The metric then calculates the average purchase price per user:
 * Result: $6.75
This means that all users, including buyers and non-buyers, spend an average of $6.75.
## Example: percentile purchase price per user
This section includes the configuration options for a custom numeric metric related to percentile purchase price per user. For the example in this section, the randomization unit is “user.”
###### Expand Percentile purchase price per user
##### Percentile analysis methods for Experimentation are in beta
The default metric analysis method is “Average.” The use of percentile analysis methods with LaunchDarkly experiments is in beta. If you use a metric with a percentile analysis method in an experiment with a large audience, the experiment results tab may take longer to load, or the results tab may time out and display an error message. Percentile analysis methods are also not compatible with [CUPED adjustments](/docs/guides/statistical-methodology/cuped).
In this example, you are only interested in learning about your typical spenders and want to exclude the few customers who spend significantly more than most and skew your data upward. This metric calculates the amount of money that 90% of your customer base spends less than.
This custom numeric metric only includes users who made a purchase. When using a percentile analysis method, LaunchDarkly automatically excludes units without events.
The metric configuration options include:
 * Event kind: **Custom**
 * What do you want to measure: **Value/size**
 * How multiple event values are aggregated per unit: **Average**
 * Analysis method: **P90**
 * Randomization unit: **User**
 * Success criterion: Higher is better
 * Unit of measure: USD
Here is what the metric setup looks like:
![The metric creation dialog.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/22e15d144a188373d90a332ca3684ca8db44a04c4cf3bd3cab8fb72a984d8ca2/assets/images/auto/metric-examples-3.auto.png)
The metric creation dialog.
Here is an example of how the metric calculates its results:
Step 1 | Step 2 | Step 3 
---|---|--- 
Users made the following purchases:
 * User A: $7
 * User B: $9
 * User C: $5, $15
 * User D: $12
 * User E: $21
 * User F: $20, $40
 * User G: $45
 * User H: $78
 * User I: $80
 * User J: $85
 * User K: $550
 * User L: No purchases
| The metric calculates the average for each user that made a purchase:
 * User A: $7 (0th percentile)
 * User B: $9 (10th percentile)
 * User C: $10 (20th percentile)
 * User D: $12 (30th percentile)
 * User E: $21 (40th percentile)
 * User F: $30 (50th percentile)
 * User G: $45 (60th percentile)
 * User H: $78 (70th percentile)
 * User I: $80 (80th percentile)
 * User J: $85 (90th percentile)
 * User k: $550 (100th percentile)
 * User L: Excluded from calculation
| The metric then calculates the average for the 90th percentile:
 * Result: $85
This means that 90% of all users that make a purchase spend less than $85.
## Examples: average revenue per user
This section includes the configuration options for common custom numeric metrics related to average revenue per user. For all of the examples in this section, the randomization unit is “user.”
### Average revenue per user: only users who generated revenue
###### Expand Average revenue per user: only users who generated revenue
This custom numeric metric sums purchase amounts per user who bought something, instead of calculating average amounts per purchase. This lets you find out about the purchasing behavior of users as a whole, ignoring whether the money they spent was all at once or spread between multiple purchases.
The metric configuration options include:
 * Event kind: **Custom**
 * What do you want to measure: **Value/size**
 * How multiple event values are aggregated per unit: **Sum**
 * Analysis method: **Average**
 * Randomization unit: **User**
 * Success criterion: Higher is better
 * Units without events: **Exclude units that did not send any events from the analysis**
 * Unit of measure: USD
Here is what the metric setup looks like:
![The metric creation dialog.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/d12d4829de40650570552f1dc75fe2d8254221d1eb1fa177abc30dbcd74a0453/assets/images/auto/metric-examples-4.auto.png)
The metric creation dialog.
Here is an example of how the metric calculates its results:
Step 1 | Step 2 | Step 3 
---|---|--- 
Users mde the following purchases:
 * User A: 100,100, 100,300
 * User B: $10
 * User C: $7
 * User D: $0 (no purchases)
| The metric calculates the sum for each user, excluding those who didn’t purchase anything:
 * User A: $400
 * User B: $10
 * User C: $7
| The metric then calculates the average sum:
 * Result: $139
### Average revenue per user: all users
###### Expand Average revenue per user: all users
This custom numeric metric sums purchase amounts per user, instead of calculating average amounts per purchase. This lets you find out about the purchasing behavior of users as a whole, ignoring whether the money they spent was all at once or spread between multiple purchases. This includes users who didn’t purchase anything.
The metric configuration options include:
 * Event kind: **Custom**
 * What do you want to measure: **Value/size**
 * How multiple event values are aggregated per unit: **Sum**
 * Analysis method: **Average**
 * Randomization unit: **User**
 * Success criterion: Higher is better
 * Units without events: **Include units that did not send any events and set their value to 0**
 * Unit of measure: USD
Here is what the metric setup looks like:
![The metric creation dialog.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/dae31386a358360047c3aa79be0f3879f15397e784119e8b8e9deeb1d5024b74/assets/images/auto/metric-examples-5.auto.png)
The metric creation dialog.
Here is an example of how the metric calculates its results:
Step 1 | Step 2 | Step 3 
---|---|--- 
Users mde the following purchases:
 * User A: 100,100, 100,300
 * User B: $10
 * User C: $7
 * User D: $0 (no purchases)
| The metric calculates the sum for each user, including those who didn’t purchase anything:
 * User A: $400
 * User B: $10
 * User C: $7
 * User D: $0
| The metric then calculates the average sum:
 * Result: $104.25
## Example: average number of purchases
This section includes the configuration options for common custom conversion binary metrics related to average number of purchases. For the example in this section, the randomization unit is “user.”
### Average number of purchases: per user who purchased
###### Expand Average number of purchases: per user who purchased
You can use this custom conversion binary metric to learn the average number of purchases for users who made a purchase.
The metric configuration options include:
 * Event kind: **Custom**
 * What do you want to measure: **Count**
 * Analysis method: **Average**
 * Randomization unit: **User**
 * Success criterion: Higher is better
Here is what the metric setup looks like:
![The metric creation dialog.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/52b409e70bc2dca84680dd95bcb58a00265daa8712f4741d5c15c7e58af9d7c2/assets/images/auto/metric-examples-6.auto.png)
The metric creation dialog.
Here is an example of how the metric calculates its results:
Step 1 | Step 2 | Step 3 
---|---|--- 
Users mde the following purchases:
 * User A: 1 purchase, 1 purchase
 * User B: 1 purchase
 * User C: 1 purchase
 * User D: 0 purchases
| The metric calculates the sum for each user, excluding those who didn’t purchase anything:
 * User A: 2
 * User B: 1
 * User C: 1
| The metric then calculates the average sum:
 * Result: 1.33
## Example: latency
This section includes the configuration options for common custom numeric metrics related to latency time. For the example in this section, the randomization unit is “request.”
### Latency excluding the slowest 1% of results
###### Expand Latency excluding the slowest 1% of results
##### Percentile analysis methods for Experimentation are in beta
The default metric analysis method is “Average.” The use of percentile analysis methods with LaunchDarkly experiments is in beta. If you use a metric with a percentile analysis method in an experiment with a large audience, the experiment results tab may take longer to load, or the results tab may time out and display an error message. Percentile analysis methods are also not compatible with [CUPED adjustments](/docs/guides/statistical-methodology/cuped).
This custom numeric metric calculates latency, excluding the slowest 1% of requests that may skew the data. When using a percentile analysis method, LaunchDarkly automatically excludes units without events.
The metric configuration options include:
 * Event kind: **Custom**
 * What do you want to measure: **Value/size**
 * How multiple event values are aggregated per unit: **Average**
 * Analysis method: **P99**
 * Randomization unit: **Request**
 * Success criterion: Lower is better
 * Unit of measure: ms
Here is what the metric setup looks like:
![The metric creation dialog.](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/4f840347b159cbc5f298b4cad080cd48e6b7abf3c1851e8419ddaad3d7b9e9c6/assets/images/auto/metric-examples-7.auto.png)
The metric creation dialog.
Here is an example of how the metric calculates its results:
Step 1 | Step 2 
---|--- 
Requests had the following latency:
 * Request A: 20ms
 * Request B: 10ms
 * Request C: 70ms
 * Request D: 30ms
| The metric then calculates the 99th percentile:
 * Result: 70ms
This means that 99% of requests, on average, have a latency of less than 70ms.
## Conclusion
The guide explained how to set up metrics to help answer common questions about your app’s revenue and latency performance. For more examples of experiments you can run, read [Example experiments](/docs/guides/experimentation/example-experiments).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs