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
 * [Concepts](#concepts)
 * [Objective of an experiment](#objective-of-an-experiment)
 * [Mean or conversion rate](#mean-or-conversion-rate)
 * [Relative difference from control](#relative-difference-from-control)
 * [Two-sided test](#two-sided-test)
 * [One-sided test](#one-sided-test)
 * [P-value](#p-value)
 * [Two-sided test](#two-sided-test-1)
 * [One-sided test](#one-sided-test-1)
 * [Statistical significance](#statistical-significance)
 * [Conclusion](#conclusion)
##### This guide includes advanced concepts
This section includes an explanation of advanced statistical concepts. We provide them for informational purposes, but you do not need to understand these concepts to use Experimentation.
## Overview
This guide explains the statistical methods LaunchDarkly applies to frequentist experiments in its Experimentation platform.
For a high-level overview of frequentist and Bayesian statistics, read [Bayesian versus frequentist statistics](/docs/guides/experimentation/bayesian-frequentist).
## Concepts
An experiment comprises two or more **variations** , one or more **metrics** , a **randomization unit** , and the **units** assigned to those variations in the experiment. This section defines the mathematical notation which we will use in the remainder of the document.
The Experimentation-related terms and their notations for the purpose of this document include:
 * **Variations** : An experiment has VVV _variations_ indexed v=0,1,…,V−1v = 0, 1, \ldots, V-1v=0,1,…,V−1. We will refer to the variation v=0v = 0v=0 as the _control_ variation.
 * **Randomization units** and **units** : The type of the experiment unit is called the [randomization unit](/docs/home/experimentation/randomization). Examples of randomization units include user, user-time, organization, and request. A **unit** is a specific instance of a randomization unit that you assign to a variation in the experiment. In LaunchDarkly, the randomization unit is a context kind, and a unit is a context key. At the time of an analysis, there are NvN_vNv​ units observed for variation vvv, which are indexed i=1,…,Nvi = 1, \ldots, N_vi=1,…,Nv​.
 * **Metrics** : An experiment can have one [primary metric and several secondary metrics](/docs/home/experimentation/types#primary-and-secondary-metrics). The methods described below apply to both primary and secondary metrics. yv\mathbf{y}_vyv​ be a NvN_vNv​ is the length vector representing the metric values for variation vvv, and yv,iy_{v,i}yv,i​ is the observed value of the metric for unit iii assigned to variation vvv in the experiment.
 * **Significance level** : You set the significance level α\alphaα when creating an experiment. The significance level falls within the range of 000 to 111. Some common choices of significance level include 0.10.10.1, 0.050.050.05, and 0.010.010.01. To understand the specific step at which the significance level is set, read [Creating feature change experiments](/docs/home/experimentation/feature) or [Creating funnel optimization experiments](/docs/home/experimentation/funnel).
In LaunchDarkly experiments, a metric’s unit of analysis must be the same as the unit of randomization. This means that if your experiment has “user” as the unit of randomization, then any metric in the experiment must also have “user” as the unit of analysis.
## Objective of an experiment
Our methods are designed around the belief that the primary objective of an experiment is to make a decision between variations. The experiment results inform that decision by providing estimates of the causal effects on the metrics of interest for each variation.
In LaunchDarkly experiments, the experimenter wants to learn the average value per unit of the metric conditional on the variation in order to make their decision. While we observe the average value in the experiment samples exposed to a variation, we do not know what the average value of that metric would be if a variation were applied to the entire target population.
Let μv\mu_vμv​ and σv2\sigma_v^2σv2​ refer to the unknown mean and variance value per unit of the metric of interest for variation vvv. The observed average value in the experiment samples exposed to variation vvv is denoted as:
yˉv=∑i=1Nvyv,iNv,∀v∈{0,…,V}\bar{y}_v = \frac{\sum_{ i = 1}^{N_v} y_{v,i}}{N_v}, \quad \forall v \in \\{0,\dots,V\\}yˉ​v​=Nv​∑i=1Nv​​yv,i​​,∀v∈{0,…,V}
The estimated standard deviation is denoted as σ^v2\hat{\sigma}_v^2σ^v2​.
We summarize the key statistics of μv\mu_vμv​ as follows:
 * **Mean** or **Conversion rate** : a point estimate of μv\mu_vμv​ based on the type of metric. For a conversion metric with the unit aggregation method set to “average,” such as a [custom conversion binary metric](/docs/home/metrics/custom), it is interpreted as the conversion rate. For other metrics, it is interpreted as the mean.
 * (1−α)×100%\mathbf{(1-\alpha) \times 100 \%}(1−α)×100% **Confidence interval** : a range defined by a lower and upper bound that is likely to contain the true value of μv\mu_vμv​ with (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% confidence level. This means that if the population is sampled repeatedly and a (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% confidence interval is calculated for each sample, about (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% of those intervals will contain the true value of μv\mu_vμv​. For example, if you set the significance level α=0.1\alpha=0.1α=0.1, LaunchDarkly will compute a 90%90\%90% confidence interval.
Because the primary purpose of an experiment is for you to decide which variation to launch, we estimate comparisons between a non-control variation and the control variation:
 * **Relative difference from control** : For each non-control variation v∈{1,…,V}v \in \\{1,\dots,V\\}v∈{1,…,V}, LaunchDarkly calculates a point estimate and a (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% confidence interval for the relative difference from control, expressed as %Δv,0=(μv−μ0)/μ0\%\Delta_{v,0} =(\mu_v - \mu_0) / \mu_0%Δv,0​=(μv​−μ0​)/μ0​.
 * **p-value** : For each non-control variation, the probability of observing a test statistic as extreme as, or more extreme than, the one calculated from the data, in favor of the alternative hypothesis, assuming the null hypothesis is true.
## Mean or conversion rate
The shape of the data generating distribution for the unit level metric values yv,iy_{v,i}yv,i​ is, unfortunately, unknown. However, because we are interested in estimating the population mean μv\mu_vμv​, we can simplify our analysis by appealing to the Central Limit Theorem. Under some regularity conditions, the sample mean is approximately normally distributed as Nv→∞N_v \to \inftyNv​→∞
yˉv∼˙Normal(μv,σvNv),∀v∈{0,…,V}\bar{y}_v \dot\sim Normal(\mu_v,\frac{\sigma_v}{\sqrt{N}_v}) , \quad \forall v \in \\{0,\dots,V\\}yˉ​v​∼˙Normal(μv​,N​v​σv​​),∀v∈{0,…,V}
For practical purposes, since estimating the standard deviation is not the primary goal, we substitute the true standard deviation σv\sigma_vσv​ with its sample estimate σ^v\hat{\sigma}_vσ^v​. While this substitution technically results in a student’s t-distribution, with a sufficiently large [sample size](https://launchdarkly.com/sample-size-calculator/), the t-distribution closely approximates a normal distribution.
We compute the (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% confidence interval by:
yˉv±zα2⋅σ^v,∀v∈{0,…,V}\bar{y}_v \pm z_{\frac{\alpha}{2}} \cdot \hat{\sigma}_{v}, \quad \forall v \in \\{0,\dots,V\\}yˉ​v​±z2α​​⋅σ^v​,∀v∈{0,…,V}
where zα2z_{\frac{\alpha}{2}}z2α​​ is the value such that the probability in either tail of a standard normal distribution is α2\frac{\alpha}{2}2α​. That is,
P(Z>zα2)=α2,whereZ∼Normal(0,1)P(Z > z_{\frac{\alpha}{2}}) = \frac{\alpha}{2}, \quad \text{where} \quad Z \sim Normal(0,1)P(Z>z2α​​)=2α​,whereZ∼Normal(0,1)
For example, if you set the significance level α\alphaα to 0.10.10.1, then zα2≈1.645z_{\frac{\alpha}{2}} \approx 1.645z2α​​≈1.645.
## Relative difference from control
When the sample size is large enough, you can approximate μv(∀v∈{0,…,V})\mu_v (\forall v \in \\{0,\dots,V\\})μv​(∀v∈{0,…,V}) by a normal distribution, as justified by the Central Limit Theorem. Assuming independence between the non-control and control variations, we use the delta method to derive the confidence interval for the relative difference from control. This gives us:
yˉv−yˉ0yˉ0∼˙Normal(%Δv,0,σ%Δv,02)∀v∈{1,…,V}σ%Δv,02=σv2Nvyˉ02+σ02yˉv2N0yˉ04\begin{aligned} \frac{\bar{y}_v-\bar{y}_0}{\bar{y}_0} &\dot\sim Normal(\%\Delta_{v,0},\sigma_{\%\Delta_{v,0}}^2) &\forall v \in \\{1,\dots,V\\}\\\ \sigma_{\%\Delta_{v,0}}^2 &= \frac{\sigma_v^2}{N_v\bar{y}_0^2}+\frac{\sigma_0^2 \bar{y}_v^2}{N_0 \bar{y}_0^4} \end{aligned}yˉ​0​yˉ​v​−yˉ​0​​σ%Δv,0​2​​∼˙Normal(%Δv,0​,σ%Δv,0​2​)=Nv​yˉ​02​σv2​​+N0​yˉ​04​σ02​yˉ​v2​​​∀v∈{1,…,V}
For practical purposes, as in the previous section, we use a plug-in estimate for the standard deviation of the relative difference from control:
σ^%Δv,02=σ^v2Nvyˉ02+σ^02yˉv2N0yˉ04\hat{\sigma}_{\%\Delta_{v,0}}^2 = \frac{\hat{\sigma}_v^2}{N_v\bar{y}_0^2}+\frac{\hat{\sigma}_0^2 \bar{y}_v^2}{N_0 \bar{y}_0^4}σ^%Δv,0​2​=Nv​yˉ​02​σ^v2​​+N0​yˉ​04​σ^02​yˉ​v2​​
### Two-sided test
The two-sided (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% confidence interval for the relative difference from control is:
yˉv−yˉ0yˉ0±zα2⋅σ^%Δv,0,∀v∈{1,…,V}\frac{\bar{y}_v-\bar{y}_0}{\bar{y}_0} \pm z_{\frac{\alpha}{2}} \cdot \hat{\sigma}_{\%\Delta_{v,0}}, \quad \forall v \in \\{1,\dots,V\\}yˉ​0​yˉ​v​−yˉ​0​​±z2α​​⋅σ^%Δv,0​​,∀v∈{1,…,V}
This two-sided (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% confidence interval provides a range within which the true relative difference %Δv,0\%\Delta_{v,0}%Δv,0​ is likely to fall with (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% confidence.
### One-sided test
For a one-sided test, the (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% confidence interval for the relative difference from control depends on the [success criteria](/docs/home/metrics/metric-analysis#success-criteria) of the metric. You define the success criteria when you create the metric.
The one-sided (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% confidence interval for the relative difference from control is computed as follows, depending on the metric’s success criteria v∈{1,…,V}v \in \\{1,\dots,V\\}v∈{1,…,V}
 * Higher is better: [yˉv−yˉ0yˉ0−zα⋅σ^%Δv,0,∞)\frac{\bar{y}_v-\bar{y}_0}{\bar{y}_0} - z_{\alpha} \cdot \hat{\sigma}_{\%\Delta_{v,0}}, \quad\infty)yˉ​0​yˉ​v​−yˉ​0​​−zα​⋅σ^%Δv,0​​,∞)
 * Lower is better: (−∞,yˉv−yˉ0yˉ0+zα⋅σ^%Δv,0(-\infty, \quad \frac{\bar{y}_v-\bar{y}_0}{\bar{y}_0} + z_{\alpha} \cdot \hat{\sigma}_{\%\Delta_{v,0}}(−∞,yˉ​0​yˉ​v​−yˉ​0​​+zα​⋅σ^%Δv,0​​]
For example, if you set the significance level α=0.1\alpha = 0.1α=0.1, the corresponding zαz_{\alpha}zα​​ value in the formula above is approximately 1.281.281.28.
## P-value
P-value p∈[0,1]p \in [0,1]p∈[0,1] represents the probability of observing a test statistic as extreme as, or more extreme than, the one observed in the sample, assuming the null hypothesis is true. The test statistic is computed based on the observed relative difference from control:
Zv,0=yˉv−yˉ0yˉ0σ^%Δv,0Z_{v,0} = \frac{ \frac{\bar{y}_v-\bar{y}_0}{\bar{y}_0}}{\hat{\sigma}_{\%\Delta_{v,0}}}Zv,0​=σ^%Δv,0​​yˉ​0​yˉ​v​−yˉ​0​​​
The null hypothesis is defined differently for two-sided and one-sided tests, and the interpretation of the p-value depends on the type of test.
### Two-sided test
For a two-sided test:
 * Null Hypothesis: There is no difference between the non-control variation’s mean and the control variation’s mean.
 * Alternative Hypothesis: There is a difference between the means.
The two-sided p-value is calculated as:
p=2(1−Φ(∣Zv,0∣))p = 2(1-\Phi(|Z_{v,0}|))p=2(1−Φ(∣Zv,0​∣))
Here, Φ(⋅)\Phi(\cdot)Φ(⋅) denotes the [cumulative distribution function (CDF)](https://en.wikipedia.org/wiki/Cumulative_distribution_function) of a standard normal distribution.
The practical interpretation is that a low two-sided p-value means there is strong evidence that the non-control variation’s performance differs from the control. A high p-value means the data does not provide strong evidence of any difference.
### One-sided test
For a one-sided test:
 * Null Hypothesis: The non-control variation is performing worse than or equal to the control variation on average.
 * Alternative Hypothesis: The non-control variation is performing better than the control on average.
The one-sided p-value depends on the metric’s success criteria:
 * Higher is better: p=1−Φ(Zv,0)p = 1-\Phi(Z_{v,0})p=1−Φ(Zv,0​)
 * Lower is better: p=Φ(Zv,0)p =\Phi(Z_{v,0})p=Φ(Zv,0​)
Here, Φ(⋅)\Phi(\cdot)Φ(⋅) denotes the CDF of a standard normal distribution.
The practical interpretation is that a low one-sided p-value indicates strong evidence that the non-control variation outperforms the control variation. A high p-value suggests insufficient evidence to claim superiority of the non-control variation relative to the control.
## Statistical significance
Statistical significance indicates the likelihood that the observed relationship or effect in the data is not due to random chance. When a test result is statistically significant, it means the observed effect is unlikely to have occurred purely by random variation.
A p-value at or below the experiment-specified significance level implies the result is statistically significant. The practical interpretation of a statistically significant result differs for the type of test:
 * **Two-sided Test:** A statistically significant result implies that the difference in performance between the control and non-control variations is unlikely to have occurred by chance. However, a two-sided p-value does not indicate the direction of the difference, either better or worse. To interpret the result, we rely on the sign of the relative difference from control:
 * Desired direction: If the sign of the relative difference aligns with the metric’s success criteria, it indicates that the non-control variation is performing better than the control variation. Specifically, the relative difference from control is positive when the metric’s success criteria is “Higher is better” and negative when it is “Lower is better.” In such cases, we refer to the significant result as being in the “desired direction.”
 * Undesired direction: If the sign of the relative difference is opposite to the success criteria, it suggests that the non-control variation is performing worse than the control variation.
 * **One-sided Test:** A statistically significant result indicates that the non-control variation’s better performance compared to the control variation is unlikely to be due to random chance.
## Conclusion
This guide explained the statistical methods LaunchDarkly applies to frequentist experiments. To learn about Bayesian statistical methods in LaunchDarkly, read [Experimentation statistical methodology for Bayesian experiments](/docs/guides/statistical-methodology/methodology-bayesian).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs