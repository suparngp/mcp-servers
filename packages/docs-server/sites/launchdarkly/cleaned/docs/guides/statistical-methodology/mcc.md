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
 * [What is the multiple comparisons problem?](#what-is-the-multiple-comparisons-problem)
 * [A simple example](#a-simple-example)
 * [Adjusting across treatments, metrics, or both](#adjusting-across-treatments-metrics-or-both)
 * [When do I choose which group of comparisons?](#when-do-i-choose-which-group-of-comparisons)
 * [Bonferroni procedure](#bonferroni-procedure)
 * [Benjamini-Hochberg procedure](#benjamini-hochberg-procedure)
 * [When do I use Bonferroni versus Benjamini-Hochberg?](#when-do-i-use-bonferroni-versus-benjamini-hochberg)
 * [Conclusion](#conclusion)
##### This guide includes advanced concepts
This section includes an explanation of advanced statistical concepts. We provide them for informational purposes, but you do not need to understand these concepts to use LaunchDarkly Experimentation.
## Overview
This guide explains the methodology LaunchDarkly uses to perform multiple comparisons corrections on frequentist experiment results.
LaunchDarkly gives you the option to correct your frequentist experiment results for multiple comparisons arising from having more than one metric or more than one treatment configured on your experiment. We offer two different methods for doing so:
 * Bonferroni correction
 * Benjamini-Hochberg procedure
Here, we explore why you might consider using this for your experiment and how you might choose between the two different options above.
## What is the multiple comparisons problem?
The multiple comparisons problem is the problem of elevated false positive rates when doing many different comparisons within a single test.
[This XKCD comic](https://xkcd.com/882/) is a fun example of the multiple comparisons problem.
Frequentist experiments are designed to discover differences between variations when they exist. While doing so, they must control for the false positive rate when the null hypothesis is true, meaning no true differences exist between variations.
The amount of control is determined by the **significance level** for each test. If the significance level is 5% (or 0.05), this means that the test has an allowable rate of false positives of 5%. Lowering this threshold makes the threshold for declaring a significant result more stringent, both reducing the chance of declaring a false positive but also requiring more data to declare significance when true differences exist.
Crucially, the false positive rate guarantee is **expressed for a single comparison**. Adding multiple metrics or multiple treatments increases the number of total comparisons in a given experiment, which compounds the error.
## A simple example
Consider an A/A/A test where you have a control, treatment 1, and treatment 2 all serving the exact same experience.
Even though there is no difference between any of these experiences, randomness and noise will sometimes cause a significant difference to appear. If the significance level is configured as 5%, then the rate at which you can expect this to happen is no more than 5% for each comparison.
However, since there are two comparisons, the chance that a false positive occurs for the comparison of treatment 1 versus control is 5%, and the chance that the false positive occurs for the comparison of treatment 2 versus control is also 5%. For simplicity, if we assume that the comparisons are independent, the chance that at least one comparison shows up with a false positive is the sum of the following outcomes:
 * False positive on treatment 1 versus control and no false positive on treatment 2 versus control: `0.05 * 0.95`
 * No false positive on treatment 1 versus control and false positive on treatment 2 versus control: `0.95 * 0.05`
 * False positive on both comparisons: `0.05 * 0.05`
In total, the chance rises to `0.05 * 0.95 + 0.95 * 0.05 + 0.05 * 0.05 = 0.0975`
Adding one additional treatment to a test almost doubles the risk of a false positive. The same logic also applies when adding multiple metrics, especially if they are uncorrelated or measure very different things. Each additional metric represents an additional comparison which carries its own risk of a false positive.
The two corrections we offer at LaunchDarkly, the Bonferroni correction and the Benjamini-Hochberg procedure, are designed to mitigate this risk by changing the threshold for declaring significance to avoid declaring significance too easily when multiple comparisons are at play.
## Adjusting across treatments, metrics, or both
There are three different ways you can apply either the Bonferroni correction or the Benjamini-Hochberg procedure depending on what set of comparisons you’d like to correct for:
 * Across treatments
 * Across metrics
 * Across both treatments and metrics
As mentioned above, adding additional treatments and/or metrics increases the total number of comparisons in your experiment. For example, consider a case where you have three treatments plus one control, and two metrics:
 * Applying across treatments only means that, for each metric in the experiment, there are three comparisons within each metric to account for.
 * Applying across metrics only means that, for each treatment in the experiment, you would account for the fact that there are two comparisons being made with respect to the control.
 * Applying across both metrics and treatments means that you would consider all comparisons in the test (3 * 2 = 6 total) simultaneously when computing a correction.
## When do I choose which group of comparisons?
Taking more comparisons into account buys you less risk of false positives at the cost of making it harder to achieve significance. Therefore you may want to sometimes not correct for all comparisons in an experiment, but rather some most-relevant subset of them.
The right scope of correction depends on which set of comparisons will have the greatest bearing on your experiment decision. If certain comparisons are not vitally important to a ship/no-ship decision, then there is less need to take them into account when deciding what group of comparisons to correct for: a false positive on those comparisons will have little bearing on the actions you take as a result of the experiment.
Here are our suggestions:
 * **Correcting across both treatments and metrics** is the safest option. Choose this option if you think that a positive result on any comparison, for any treatment compared to control, on any metric, is likely to affect your ship/no-ship decision. You should also choose this option if you’re not sure and want to be maximally protected against false positives in general.
 * **Correcting across treatments only** is commonly used when you have multiple treatments and multiple metrics, but your decision is likely to be only keyed off the primary metric. This option ignores multiple metrics, which focuses attention on the single, primary metric. Choose this option if you have several secondary metrics, but you are using them in a monitoring capacity or for general learning, and not for decision-making.
 * **Correcting across metrics only** may be best when you have multiple metrics and multiple treatments, but only a particular treatment is the focus for the experiment. This is a comparatively rarer use case than the other two.
## Bonferroni procedure
The Bonferroni procedure works by adjusting your global significance level downwards. It takes your original significance level, `alpha`, and divides by the number of total comparisons you want to correct for, `m`:
`alpha_adjusted = alpha / m`
Then LaunchDarkly uses this new significance level in the place of the existing significance level everywhere it is required in the results page. This lowers the threshold against which the p-value is compared against for declaring a comparison significant, and also widens confidence intervals.
The familywise error rate (FWER) is the probability of observing **at least one** false positive within a group of comparisons. It is the analog of the false positive rate for a single comparison, generalized to the case of multiple comparisons. The Bonferroni procedure is guaranteed to control this rate in your test at the original significance level.
For example, if your original significance level is 0.05 (or 5%), and you apply the Bonferroni correction over `m=4` comparisons, then the FWER in your group of 4 comparisons is guaranteed to be no greater than 5%.
## Benjamini-Hochberg procedure
The Benjamini-Hochberg procedure, or “BH procedure,” also computes adjusted significance levels but with the aim of controlling a quantity called the false discovery rate (FDR). The FDR is the proportion of significant results which are false.
For example, consider the following scenario: the observed FDR is the percentage of significant comparisons (6) where there is no true effect (1), or `⅙ = 16.7%`.
Comparison | True effect? | Significant? 
---|---|--- 
1 | Yes | Yes 
2 | Yes | Yes 
3 | Yes | Yes 
4 | Yes | Yes 
5 | Yes | Yes 
6 | No | Yes 
7 | No | No 
8 | No | No 
The BH procedure is an algorithm that starts by considering the unadjusted p-values from your `m` comparisons:
 * Rank the `m` p-values from smallest to largest: `p(1), p(2), …, p(m)`
 * Compare each `p(i)` to a scaled significance threshold `alpha*i/m`
 * Get the index of the largest ranked p-value which still falls below its scaled significance threshold: `i_star :=` the largest `i` for which `p(i) < alpha*i/m`
 * Set the new significance level to `alpha * (i_star) / m`
After this adjusted significance level is obtained, then all results calculations use the adjusted significance level and you can interpret the results as usual. As in the Bonferroni correction, generally the adjusted significance level is less than the original significance level and so statistical significance is more difficult to achieve and confidence intervals are wider.
One way that the BH procedure differs from the Bonferroni correction is that in the BH procedure the adjusted significance level may differ between different sets of metrics or treatments depending on what grouping is being corrected against. In the Bonferroni correction the adjusted significance level is always the same across every comparison in the experiment.
For example, if you select “apply across treatments,” then you may have a scenario like the following. All of the values in this table are adjusted:
Treatment | Metric 1 | Metric 2 | Metric 3 
---|---|---|--- 
Treatment 1 | 0.0500 | 0.0250 | 0.0125 
Treatment 2 | 0.0500 | 0.0250 | 0.0125 
Treatment 3 | 0.0500 | 0.0250 | 0.0125 
Treatment 4 | 0.0500 | 0.0250 | 0.0125 
This result occurs because the BH procedure performs the ranking process independently for each different group of p-values in question. Because the set of p-values associated with all the treatments comparisons versus control may differ from metric to metric, the computed adjusted significance levels may also differ.
## When do I use Bonferroni versus Benjamini-Hochberg?
Deciding whether to control the FDR or the FWER requires considering different scenarios in-depth. Ultimately, they measure different things, and comparing them requires considering quite a few different sets of scenarios.
Here are some broad guidelines:
 * In general, having to control the FWER requires stricter treatment than controlling the FDR, so the Bonferroni correction is more conservative than the BH procedure especially when the number of comparisons is high. That means you may pay more of a penalty in terms of how difficult it is to achieve significance on real effects when the Bonferroni correction is applied.
 * On the other hand, the Bonferroni correction is simpler to understand and interpret.
We generally recommend Bonferroni when the number of comparisons is small, for example, three or fewer. When the number of comparisons grows past this point then we generally like to apply the BH procedure. The BH procedure does a better job of balancing protection against spurious results and statistical power, that is, the ability to detect a true difference.
## Conclusion
This guide explored why you might consider using multiple comparisons correction for your experiment, and how you might choose between the two different correction options. To learn more about LaunchDarkly’s Experimentation product, read [Experimentation](/docs/home/experimentation).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs