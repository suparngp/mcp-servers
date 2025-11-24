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
 * [Why you generally want more data](#why-you-generally-want-more-data)
 * [Right versus wrong and experimental power](#right-versus-wrong-and-experimental-power)
 * [Mechanics of the calculation](#mechanics-of-the-calculation)
 * [”Power”](#power)
 * [Baseline noise](#baseline-noise)
 * [Why do I have to do this before starting my experiment?](#why-do-i-have-to-do-this-before-starting-my-experiment)
 * [Some background: the significance level](#some-background-the-significance-level)
 * [What does this have to do with precomputing the sample size?](#what-does-this-have-to-do-with-precomputing-the-sample-size)
 * [Conclusion](#conclusion)
## Overview
This guide explains why sample size calculations are important for frequentist experiments, and how to calculate them. You can use this information to help you determine a sample size for a frequentist experiment with LaunchDarkly’s [sample size calculator](https://launchdarkly.com/sample-size-calculator/).
All LaunchDarkly experiments are run on flags with at least two variations: the [control variation](/docs/home/getting-started/vocabulary#control-variation), and one or more [treatment variations](/docs/home/getting-started/vocabulary#treatment-variation). When you run a frequentist experiment, you are trying to use data to decide which of the following two states of the world is true:
 * **The null hypothesis:** There is no actual difference between the control and treatment variations
 * **The alternative hypothesis:** There _is_ some actual difference between the control and treatment variations
We say “actual difference” to emphasize that our statements apply to some underlying, unobservable true difference between the control and treatment. The data we collect is noisy and imprecise, so observed differences may not always reflect the true underlying differences.
Put another way: if you observe a difference of +20% in the treatment on a sample size of 1000 users, you may not actually see that difference borne out after releasing that treatment to production. The “real” difference in the very long run could be only 10%, or as high as 30%, depending on how precise the original 20% measurement was.
Frequentist experiments follow the principle of “innocent until proven guilty.” We start by assuming there is no actual difference between the treatment and the control, and then only reject this assumption if we collect enough data to the contrary. The “collect enough data” requirement points to the importance of sample sizes.
## Why you generally want more data
Why you generally want more data is probably self-evident, but it’s still worth exploring explicitly.
As you collect more data, you have **more confidence** to conclude that an observed difference reflects an underlying actual difference. For example:
 * An observed difference of +10% on a sample size of n=1,000,000 conveys **more confidence** than an observed difference of +10% on a sample size of only n=100.
Another way to look at this is that more data buys you **more resolution** :
 * Having a large sample size of n=1,000,000 units might give you the confidence to say that a small difference of +1% reflects an underlying true difference of +1%, whereas facing fewer samples of, say, n=1,000 might lead you to just conclude that that +1% difference is just noise.
 * Therefore, having **more data** means you have more ability to conclude that **smaller differences** exist.
The downside is that having more data means you have to wait to collect that data. So, the key is to find the right amount of data to have sufficient resolution while not having to wait longer than necessary.
## Right versus wrong and experimental power
Recall that in the frequentist paradigm, there are only two possible states of the world:
 * **The null hypothesis:** There is no actual difference
 * **The alternative hypothesis:** There is some actual difference
After you run your experiment and parse the results, you can make one of two decisions:
 * Conclude that there is an actual difference: reject the null hypothesis
 * Conclude that there is no actual difference: fail to reject the null hypothesis
If there is no actual difference between the treatment and the control and you conclude the same, or if there _is_ a difference and you conclude the same, then congratulations! You’ve made the right call.
The case where you come to the wrong conclusion is where sample size calculations become important to understand:
 * **Type 1:** There is no actual difference, but you conclude that there is a difference
 * **Type 2:** There is an actual difference, but you fail to conclude that there is a difference
Errors of type 1 happen mostly due to the nature of randomness. In any experiment of any duration, there is always some risk that you get an unusual run of data that doesn’t accurately represent real-world behavior. While an experiment’s sample size does have an impact on the chance of observing this type of error, sample size has less of a direct relationship to errors of type 1 than to errors of type 2, so we will gloss over errors of type 1 for now.
Errors of type 2 are more interesting because they are more directly caused by not having enough data. Recall that collecting more data usually gives you more of a chance to detect an actual underlying difference. So, concluding that there is _no_ difference when there actually _is_ one, usually means you didn’t have enough resolution, or that you didn’t allocate enough samples to the experiment.
Therefore, the main reason why sample size calculations are important is that they allow you to minimize the chance that you fail to detect a difference when it exists. Or put another way, sample size calculations allow you to properly **“power”** your experiment so that you will have enough samples to detect the types of differences that you’re actually interested in.
## Mechanics of the calculation
At a high level, calculating a sample size involves just two steps:
 * Inputting how much “power” you want
 * Estimating the baseline noise in your data
### ”Power”
We already discussed generally why “power” is influenced by sample size and vice versa, but let’s break it down further. Recall that previously we said that having more data benefits you in one of two ways:
 * Having more resolution to detect smaller differences
 * Having more confidence that a given observed difference is real
These are codified in sample size calculations as the **minimum detectable effect (MDE)** and the **power**. Note that power (no quotes) has a specific definition which does not match the plain English definition of “power” (with quotes) that we’ve been using so far:
 * **MDE:** What’s the smallest actual difference between the control and treatment I want to be able to detect?
 * **Power:** If an actual difference of the magnitude specified by the MDE exists, then what’s the probability that my experiment will lead me to (correctly) reject the null hypothesis?
As actual differences get smaller and smaller, the data required to tease them out from noise gets larger and larger, approaching infinity as the actual difference approaches zero.
Therefore, we put a lower limit on the range of actual differences we want to be able to detect as a practical matter. Once that is fixed, we can vary the amount of **power** we want to detect those small actual differences.
A standard amount of 80% translates to the statement:
 * If the actual difference between control and treatment is the same as the MDE, then my experiment will lead me to correctly reject the null hypothesis 80% of the time
Higher values of power mean more required certainty in rejecting the null hypothesis, which implies a higher required sample size, and vice versa.
### Baseline noise
Once you have your inputs for your MDE and desired power, you need to estimate what the baseline level of noise is in your data.
As you collect more data, the level of precision in the means of each of the control and treatment increases. You want that precision to be high enough so that any noise is drowned out and ends up significantly less than the MDE you need to measure down towards.
Therefore, as a starting point, you need to input some measure of the baseline noise level so that the calculation knows how many samples are needed to reduce that overall noise to an acceptable level:
 * For [numeric metrics](/docs/home/metrics/custom-numeric), you need to provide an estimate of the population standard deviation or variance in the metric
 * For [binary metrics](/docs/home/metrics/create-metrics#choose-a-metric-type), you need to provide a reasonable estimate of the baseline metric average (proportion or rate), because the population standard deviation is a simple function of this average and the sample size
## Why do I have to do this before starting my experiment?
In frequentist experiments, it is important to compute a sample size before starting your experiment and only make decisions when you’ve reached that sample size. Failure to do so usually results in elevated false positive rates over repeated experiments.
### Some background: the significance level
[P-values](/docs/home/getting-started/vocabulary#p-value) and [confidence intervals](/docs/home/getting-started/vocabulary#confidence-interval) are subject to similar natural fluctuations over the course of an experiment as the raw underlying data. This means that even if there is no true difference between the control and treatment, natural variation invariably results in low p-values that result in [statistical significance](/docs/home/getting-started/vocabulary#statistical-significance) some small fraction of the time.
The chance that this happens for a particular test depends on how strict the threshold for significance is. The **significance level** of an experiment (usually represented by the Greek letter alpha: α) is the configured allowable rate of false positives for an experiment. A significance level of 5%, for example, means that if the experiment were an A/A test, then you can count on the test only coming up significant 5% of the time.
Here is how significance level and statistical significance are related:
 * A lower significance level means fewer false positives, but a harder time reaching statistical significance
 * A higher significance level means more false positives, but an easier time reaching statistical significance
### What does this have to do with precomputing the sample size?
The significance level guarantee for the false positive rate assumes that you are only checking experiments at a single, predetermined point in time.
Allowing decisions to be made at multiple points during the life of an experiment exposes you to additional variability in statistical summaries such as the p-value or confidence interval, which could mislead you into declaring significance more often than you should. This is often referred to as the “peeking” problem.
To be clear, it is totally fine to look at the results at any point during the experiment. However, allowing oneself to make a decision based on the results is what can lead to elevated false positive rates.
When conducting frequentist experiments, it is therefore critical to:
 1. Estimate a sample size prior to starting the experiment
 2. Write it down or make it clear that stakeholders are aware of when that sample size may be reached
 3. Only take action on an experiment once that sample size is reached
## Conclusion
In this guide you learned why sample size calculations are important for frequentist experiments, and how to calculate them.
Here is a list of further resources:
 * To calculate your own sample size, use LaunchDarkly’s [sample size calculator](https://launchdarkly.com/sample-size-calculator/)
 * To learn more about LaunchDarkly Experimentation, read [Experimentation](/docs/home/experimentation)
 * To learn about Experimentation use cases, read [Example experiments](/docs/guides/experimentation/example-experiments)
 * To get started building your own experiment, follow our [Quickstart for Experimentation](/docs/home/experimentation/quickstart)
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs