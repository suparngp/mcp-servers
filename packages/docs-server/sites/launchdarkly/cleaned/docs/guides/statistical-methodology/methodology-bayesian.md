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
 * [Numeric metrics](#numeric-metrics)
 * [Conversion metrics](#conversion-metrics)
 * [Probability to be best](#probability-to-be-best)
 * [Probability to beat control](#probability-to-beat-control)
 * [Sample ratio mismatch](#sample-ratio-mismatch)
 * [Average and sum metrics](#average-and-sum-metrics)
 * [Conclusion](#conclusion)
##### This guide includes advanced concepts
This section includes an explanation of advanced statistical concepts. We provide them for informational purposes, but you do not need to understand these concepts to use Experimentation.
## Overview
This guide explains the statistical methods LaunchDarkly applies to Bayesian experiments in its Experimentation platform.
For a high-level overview of frequentist and Bayesian statistics, read [Bayesian versus frequentist statistics](/docs/guides/experimentation/bayesian-frequentist).
## Concepts
An experiment comprises two or more **variations** , one or more **metrics** , a **randomization unit** , and the **units** assigned to those variations in the experiment. This section defines the mathematical notation which we will use in the remainder of the document.
The Experimentation-related terms and their notations for the purpose of this document include:
 * **Variations** : An experiment has VVV _variations_ indexed v=0,1,…,V−1v = 0, 1, \ldots, V-1v=0,1,…,V−1. We will refer to the variation v=0v = 0v=0 as the _control_ variation.
 * **Randomization units** and **units** : The type of the experiment unit is called the [randomization unit](/docs/home/experimentation/randomization). Examples of randomization units include user, user-time, organization, and request. A **unit** is a specific instance of a randomization unit that you assign to a variation in the experiment. In LaunchDarkly, the randomization unit is a context kind, and a unit is a context key. At the time of an analysis, there are NvN_vNv​ units observed for variation vvv, which are indexed i=1,…,Nvi = 1, \ldots, N_vi=1,…,Nv​.
 * **Metrics** : An experiment can have one primary metric and several secondary metrics as described in the [Metrics topic](/docs/home/metrics). The methods described below apply to both primary and secondary metrics. Let yv\mathbf{y}_vyv​ be a NvN_vNv​ length vector representing the metric values for variation vvv, and yv,iy_{v,i}yv,i​ be the observed value of the metric for unit iii assigned to variation vvv in the experiment.
 * **Threshold** : You set the success threshold (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% when creating an experiment. The threshold falls within the range of 0%0 \%0% to 100%100 \%100%. Some common choices of success threshold include 90%90\%90%, 95%95\%95%, and 99%99\%99%. To understand the specific step at which the threshold is set, read [Creating feature change experiments](/docs/home/experimentation/feature) or [Creating funnel optimization experiments](/docs/home/experimentation/funnel).
In LaunchDarkly experiments, a metric’s unit of analysis must be the same as the unit of randomization. This means that if your experiment has “user” as the unit of randomization then any metric must also be a user-level metric. Because units in an experiment can be associated with multiple events, all events for a user are aggregated into unit-level metrics as described in the section [Average and sum metrics](/docs/guides/statistical-methodology/methodology-bayesian#average-and-sum-metrics).
## Objective of an experiment
Our methods are designed around the belief that the primary objective of an experiment is to make a decision between variations. The experiment results inform that decision by providing estimates of the causal effects on the metrics of interest for each variation.
LaunchDarkly’s Experimentation platform offers Bayesian inference as an option for the reasons described in the guide [Bayesian versus frequentist statistics](/docs/guides/experimentation/bayesian-frequentist). In Bayesian statistics, the decision process is separated into inference and decision steps. Our first step is inference, where we combine our prior beliefs with the available data to estimate the unknown parameters we will use to make our decision. We will represent our beliefs about these parameters in the form of a probability distribution, called the posterior distribution.
The second step is to make a decision. Because Bayesian estimates are probability distributions, the experimenter can interpret these estimates as probabilities and incorporate them into their decision process.
In LaunchDarkly experiments, the experimenter wants to learn the average value per unit of the metric conditional on the variation in order to make their decision. While we observe the average value in the experiment samples exposed to a variation, we do not know what the average value of that metric would be if a variation were applied to the entire target population. Let μv\mu_vμv​ refer to the unknown mean value per unit of the metric of interest for variation vvv. Our statistical methods will estimate a posterior distribution for μv\mu_vμv​ for each variation vvv.
We summarize the posterior distribution of μv\mu_vμv​ with the following statistics:
 * (1−α)×100%\mathbf{(1-\alpha) \times 100 \%}(1−α)×100% **credible interval** is a lower and upper value that has a (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% probability of containing true value of μv\mu_vμv​
 * **Posterior mean** is a point estimate of μv\mu_vμv​
Because the primary purpose of an experiment is for you to decide which variation to launch, we estimate comparisons between variations:
 * **Probability to beat control** : For each treatment variation vvv, the probability that μv\mu_vμv​ is larger or smaller than μ0\mu_0μ0​, depending on the metric’s success criterion.
 * **Probability to be best** : For each variation, the probability that μv\mu_vμv​ is larger or smaller than the μw\mu_wμw​ of all other variations, depending on the metric’s success criterion.
 * **Relative difference from control** : For each treatment variation vvv, LaunchDarkly calculates a point estimate and a (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% credible interval for the relative difference from control, expressed as (μv−μ0)/μ0(\mu_v - \mu_0) / \mu_0(μv​−μ0​)/μ0​.
How LaunchDarkly calculates the posterior distribution of μv\mu_vμv​ depends on whether the metric is a numeric metric or a conversion metric. We discuss the estimation procedure for each metric type separately in the following sections.
## Numeric metrics
Numeric metrics have numeric values associated with their events so they can take any numeric value. Examples of numeric metrics include page load time, efficacy of various search algorithms, and number of items in a shopping cart at checkout. Numeric metrics contrast with conversion metrics which only track whether or not an event occurred. You can read more about creating these metrics in [Numeric metrics](/docs/home/metrics/custom-numeric).
In our statistical methods, numeric metrics are treated as unbound continuous random variables. With numeric metrics, the shape of the data generating distribution for the unit level metric values yv,ny_{v,n}yv,n​ is unfortunately unknown. However, because we are interested in estimating the population mean μv\mu_vμv​, we fortunately can simplify our analysis by appealing to the Central Limit Theorem. Under some regularity conditions, as Nv→∞N_v \to \inftyNv​→∞, the sample mean yˉv=(∑i=1Nvyv,i)/Nv\bar{y}_v = (\sum_{i = 1}^{N_v} y_{v,i}) / N_vyˉ​v​=(∑i=1Nv​​yv,i​)/Nv​ is approximately normally distributed with location μv\mu_vμv​ and scale σv/Nv\sigma_v / \sqrt{N}_vσv​/N​v​.
For numeric metrics, we use the following likelihood function for the sample mean of the observed data:
flike(yˉv∣μv)=Normal(μv,σ2/Nv)\begin{aligned} f_{\mathrm{like}}(\bar{y}_v | \mu_v) = \mathsf{Normal}(\mu_v, \sigma^2 / N_v) \end{aligned}flike​(yˉ​v​∣μv​)=Normal(μv​,σ2/Nv​)​
For convenience and because σ\sigmaσ is not the primary goal of our inference, we treat σ\sigmaσ as known and equal an estimate of the standard deviation σ^\hat{\sigma}σ^ calculated from the sample. Because we use an estimated value for sigma rather than estimating it in the model, our method is an empirical Bayesian method. This is the case with most of our statistical methods, as we are willing to trade off practicality for methodological purity.
To complete the model, we need to specify a prior distribution for μv\mu_vμv​. For the control variation, we use an improper non-informative prior fprior(μ0)∝1f_{\mathrm{prior}}(\mu_0) \propto 1fprior​(μ0​)∝1. For the other variations, we use priors that shrink the results towards the control variation’s mean. We generate this prior from the empirical distribution of relative differences between variations in all experiments on our platform using metrics of the same type (numeric or conversion) and aggregation function (average or sum).
The equation for this prior is:
fprior(μv)=Normal(av,wv2),av=yˉ0,wv2=yˉ02γ^2+σ^02/N0 \begin{aligned} f_{\mathrm{prior}}(\mu_v) &= \mathsf{Normal}(a_v, w_v^2), \\\ a_v &= \bar{y}_0, \\\ w_v^2 &= \bar{y}_0^2 \hat{\gamma}^2 + \hat{\sigma}_0^2 / N_0 \end{aligned}fprior​(μv​)av​wv2​​=Normal(av​,wv2​),=yˉ​0​,=yˉ​02​γ^​2+σ^02​/N0​​
where γ^2\hat{\gamma}^2γ^​2 is the variance of the distribution of observed relative differences ((yˉv−yˉ0)/yˉ0(\bar{y}_v - \bar{y}_0) / \bar{y}_0(yˉ​v​−yˉ​0​)/yˉ​0​) across all experiments with numeric metrics on the platform. The first term, yˉ02γ^2\bar{y}_0^2 \hat{\gamma}^2yˉ​02​γ^​2, scales the expected relative difference by the observed control mean. The second term, σ^02/N0\hat{\sigma}_0^2 / N_0σ^02​/N0​, accounts for the uncertainty in our estimate of the control mean. The value of γ^2\hat{\gamma}^2γ^​2 is between 0.13 and 0.19, conditional on the type of the metric.
Combining the likelihood and prior provides the posterior distribution of μv\mu_vμv​, which represents our beliefs about μv\mu_vμv​ _after_ observing the data from the experiment.
Given the normal likelihood and prior, the posterior distribution is also a normal distribution with the following parameters:
fpost(μv)=Normal(αv,ωv2),αv=ωv2(Nvσ^v2yˉv+1wv2av),ωv2=(1wv2+Nvσ^v2)−1 \begin{aligned} f_{\mathrm{post}}(\mu_v) &= \mathsf{Normal}(\alpha_v, \omega_v^2) , \\\ \alpha_v &= \omega_v^2 \left(\frac{N_v}{\hat{\sigma}_v^2} \bar{y}_v + \frac{1}{w_v^2} a_v \right) , \\\ \omega_v^2 &= \left(\frac{1}{w_v^2} + \frac{N_v}{\hat{\sigma}^2_v} \right)^{-1} \end{aligned}fpost​(μv​)αv​ωv2​​=Normal(αv​,ωv2​),=ωv2​(σ^v2​Nv​​yˉ​v​+wv2​1​av​),=(wv2​1​+σ^v2​Nv​​)−1​
The experiment results page displays the posterior distributions of each variation’s mean (fpost(μv)f_{\mathrm{post}}(\mu_v)fpost​(μv​)) in the [probability charts](/docs/home/experimentation/analyze).
We use the expected value of the posterior distribution as a point estimate for μv\mu_vμv​,
μ^v=E[fpost(μv)]=αv\hat{\mu}_v = \mathbb{E}[f_{\mathrm{post}}(\mu_v)] = \alpha_vμ^​v​=E[fpost​(μv​)]=αv​
The experiment results table displays the value of μ^v\hat{\mu}_vμ^​v​ in the [Posterior mean column](/docs/home/experimentation/bayesian-results#posterior-mean). We use a (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% credible interval of the posterior mean to provide a range of plausible values. Because there are multiple valid methods to calculate credible intervals, we use the highest density interval (HDI), which is the shortest interval that contains (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% of the probability mass of the posterior distribution.
We estimate the **relative difference in means** between two variations. We define the relative difference in the means of variations vvv and www as a parameter %Δv,w=(μv−μw)/μw\%\Delta_{v,w} = (\mu_v - \mu_w) / \mu_w%Δv,w​=(μv​−μw​)/μw​. The relative difference in the means %Δv,w\%\Delta_{v,w}%Δv,w​ also has a posterior distribution. To derive the posterior distribution of %Δv,w\%\Delta_{v,w}%Δv,w​, we apply the delta method to μv\mu_vμv​ and μw\mu_wμw​,
fpost(%Δv,w)≈Normal(αv/α0−1,αv2α02(ωv2αv2+ω02α02))f_{\mathrm{post}}\left(\%\Delta_{v,w}\right) \approx \mathsf{Normal}\left(\alpha_v / \alpha_0 - 1, \frac{\alpha_v^2}{\alpha_0^2} \left( \frac{\omega^2_v}{\alpha_v^2} + \frac{\omega_0^2}{\alpha_0^2} \right) \right)fpost​(%Δv,w​)≈Normal(αv​/α0​−1,α02​αv2​​(αv2​ωv2​​+α02​ω02​​))
Díaz-Francés (2013) show that the approximation we use for the ratio of means holds under reasonable assumptions; you can read more at [ “On the existence of a normal approximation to the distribution of the ratio of two independent normal random variables”](https://link.springer.com/article/10.1007/s00362-012-0429-2).
As with the mean of the metric for a single variation, we use the (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% highest density interval for (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% credible interval. The experiment results table displays the (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% credible interval of the relative difference in means between each variation and the control variation (%Δv,0\%\Delta_{v,0}%Δv,0​ for all v≠0v \neq 0v=0) in the column [Relative difference from Control](/docs/home/experimentation/bayesian-results).
## Conversion metrics
Conversion metrics in LaunchDarkly indicate whether or not an event occurred. You can read more about creating conversion metrics at [Create metrics](/docs/home/metrics/create-metrics#choose-a-metric-type).
We use different models for conversion metrics depending on whether the metric events are [aggregated by unit using the average or the sum](/docs/home/metrics/metric-analysis#unit-aggregation-method). If conversion metric events are aggregated by unit using the sum function, then the metric is interpreted as the average number of conversions per unit. We use the methods described in the previous section to estimate the mean of the metric for each variation.
If conversion metric events are aggregated by unit using the average function, the metric is interpreted as the _conversion rate_ , meaning the proportion of users which experienced an event. Using the per-unit average of metric events ignores the number of times a unit is converted and results in a binary variable taking values of 0 or 1. Because these conversion metrics are binary, we can use a binomial distribution to model the total number of conversions, with the conversion rate inferred as the proportion parameter of the binomial distribution.
Suppose that yˉv\bar{y}_vyˉ​v​ is the proportion of the NvN_vNv​ units in variation vvv that are converted. Then a total of NvyˉvN_{v} \bar{y}_vNv​yˉ​v​ units converted, and Nv(1−yˉv)N_{v} (1 - \bar{y}_v)Nv​(1−yˉ​v​) units did not convert.
To model the total number of conversions (NvyˉvN_{v} \bar{y}_vNv​yˉ​v​), we use a binomial distribution with proportion parameter μv\mu_vμv​ and size NvN_vNv​ as the likelihood function:
flike(Nvyˉv)=Binomial(Nv,μv) \begin{aligned} f_{\mathrm{like}}(N_v \bar{y}_v) &= \mathsf{Binomial}(N_v, \mu_v) \end{aligned}flike​(Nv​yˉ​v​)​=Binomial(Nv​,μv​)​
We denote the proportion parameter as μv\mu_vμv​ to be consistent with the notation used in the section [Numeric metrics](/docs/guides/statistical-methodology/methodology-bayesian#numeric-metrics).
We use a Beta distribution as the prior for μv\mu_vμv​,
fprior(μv)=Beta(av,bv)\begin{aligned} f_{\mathrm{prior}}(\mu_v) &= \mathsf{Beta}(a_v, b_v) \end{aligned}fprior​(μv​)​=Beta(av​,bv​)​
The values of the prior hyperparameters ava_vav​ and bvb_vbv​ differ between the control (v=0v = 0v=0) and treatment variations (v≠0v \neq 0v=0). For the control variation (v=0v = 0v=0), we use a distribution with a0=1a_0 = 1a0​=1 and b0=1b_0 = 1b0​=1. For the treatment variations (v≠0v \neq 0v=0), we use a prior similar to the one used for numeric metrics. The prior for treatment variations is a Beta distribution with hyperparameters ava_vav​, bvb_vbv​ parameters such that its expected value and variance are:
E[fprior(μv)]=yˉ0,Var(fprior(μv))=yˉ02γ^2+yˉ0(1−yˉ0)N0\begin{aligned} \mathbb{E}[f_{\mathrm{prior}}(\mu_v)] &= \bar{y}_0, \\\ \mathrm{Var}(f_{\mathrm{prior}}(\mu_v)) &= \bar{y}_0^2 \hat{\gamma}^2 + \frac{\bar{y}_0 (1 - \bar{y}_0)}{N_0} \end{aligned}E[fprior​(μv​)]Var(fprior​(μv​))​=yˉ​0​,=yˉ​02​γ^​2+N0​yˉ​0​(1−yˉ​0​)​​
The value of γ2\gamma^2γ2 is the variance of the empirical distribution of relative differences of experiments using a binary metric, and is currently set to γ2≈0.04\gamma^2 \approx 0.04γ2≈0.04.
The posterior distribution of μv\mu_vμv​ is also a Beta distribution:
fpost(μv∣yˉv,Nv)=Beta(av+Nvyˉv,bv+Nv(1−yˉv))\begin{aligned} f_{\mathrm{post}}(\mu_v | \bar{y}_v, N_v) &= \mathsf{Beta}(a_v + N_v \bar{y}_v, b_v + N_v (1 - \bar{y}_v)) \end{aligned}fpost​(μv​∣yˉ​v​,Nv​)​=Beta(av​+Nv​yˉ​v​,bv​+Nv​(1−yˉ​v​))​
The expected value of this distribution is our preferred point estimate of μv\mu_vμv​:
μ^v=E[fpost(μv)]=av+Nvyˉvav+bv+Nv\hat{\mu}_v = \mathbb{E}[f_{\mathrm{post}}(\mu_v)] = \frac{a_v + N_v \bar{y}_v}{a_v + b_v + N_v}μ^​v​=E[fpost​(μv​)]=av​+bv​+Nv​av​+Nv​yˉ​v​​
The experiment result table displays the value of μ^v\hat{\mu}_vμ^​v​ in the [Posterior mean column](/docs/home/experimentation/bayesian-results#posterior-mean).
As with numeric metrics, we use the highest density interval for the (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% credible interval of fpost(μv)f_{\mathrm{post}}(\mu_v)fpost​(μv​)
The experiment results table displays the (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% credible interval of μ^v\hat{\mu}_vμ^​v​ in the [Conversion rate column](/docs/home/experimentation/bayesian-results#conversion-rate-posterior-mean).
To calculate the relative difference in means between each variation and the control variation (%Δv,0\%\Delta_{v,0}%Δv,0​ for all v≠0v \neq 0v=0), we use the same method as for numeric metrics after transforming the posterior distributions of the means to normal distributions by matching the expected values and variances.
The experiment results table displays the (1−α)×100%(1-\alpha) \times 100 \%(1−α)×100% credible interval of the relative difference in means between each variation and the control variation (%Δv,0\%\Delta_{v,0}%Δv,0​ for all v≠0v \neq 0v=0) in the column [Relative difference from Control](/docs/home/experimentation/bayesian-results).
## Probability to be best
For both numeric and conversion metrics, LaunchDarkly calculates the **probability to be best** for each variation.
The probability to be best is the probability that the mean value per unit of a variation is the largest of all the variations if the success direction is positive. If the success direction is negative, then the probability to be best is the probability that the mean value per unit of a variation is the smallest of all the variations. The success direction is positive when the metric’s [success criteria](/docs/home/metrics/metric-analysis#success-criteria) is “Higher is better,” and negative when it is “Lower is better.” LaunchDarkly calculates the probability to be best for each variation by taking samples from the posterior distributions of the μv\mu_vμv​‘s. The proportion of samples in which a variation is the largest, or smallest if the success direction is negative, is the probability to be best for that variation.
In the case where there are only two variations (vvv and www) and the success direction of the metric is positive, the probability to be best for variation vvv is the probability that the difference in means Δv,w=μv−μw\Delta_{v,w} = \mu_v - \mu_wΔv,w​=μv​−μw​ is greater than zero.
## Probability to beat control
The probability to beat control represents the probability that a treatment variation’s mean outperforms the control variation’s mean. When the success direction is positive, it’s the probability that the mean value per unit of a treatment variation exceeds that of the control variation. Conversely, if the success direction is negative, it reflects the probability that the mean value per unit of a treatment variation is smaller than that of the control variation.
LaunchDarkly calculates this probability for each non-control variation vvv by sampling from the posterior distributions of μv\mu_vμv​ and μ0\mu_0μ0​​. The proportion of samples where a treatment variation outperforms the control, defined as the largest mean if the success direction is positive or smallest mean if the success direction is negative, determines the probability to beat control for that variation.
## Sample ratio mismatch
A sample ratio mismatch (SRM) is when the observed proportions of units receiving variations differ from the proportions chosen in the experiment design. An SRM often indicates an error in the experiment implementation and that the experiment results are not valid.
To detect SRMs we use the sequential method described in these sources:
 * [Anytime-Valid Inference for Multinomial Count Data](https://arxiv.org/abs/2011.03567)
 * [A Better Way to Test for Sample Ratio Mismatches (SRMs) and Validate Experiment Implementations](https://medium.com/engineers-optimizely/a-better-way-to-test-for-sample-ratio-mismatches-srms-and-validate-experiment-implementations-6da7c0d64552)
LaunchDarkly alerts you that a sample ratio mismatch has occurred when the posterior odds favoring a mismatch are greater than 99%.
For more about sample ratio mismatches in the product, read [Understanding sample ratios](/docs/guides/statistical-methodology/sample-ratios).
## Average and sum metrics
Because a unit in an experiment can have multiple metric events, but experiment metrics must have one value per unit, we aggregate all experiment metrics events associated with a unit. Suppose unit iii has EiE_iEi​ events associated with it during the experiment period, unit iii is assigned to variation vvv, and yv,i,ey_{v,i,e}yv,i,e​ is the value of the eeeth metric event for unit iii assigned to variation vvv. LaunchDarkly calculates the metric value yv,iy_{v,i}yv,i​ for unit iii assigned to variation vvv as follows:
 * Average: yv,i=1Ei∑e=1Eiyv,i,ey_{v,i} = \frac{1}{E_i} \sum_{e=1}^{E_i} y_{v,i,e}yv,i​=Ei​1​∑e=1Ei​​yv,i,e​ if Ei≥1E_i \geq 1Ei​≥1 else 0,
 * Sum: yv,i=∑1Eiyv,i,ey_{v,i} = \sum_{1}^{E_i} y_{v,i,e}yv,i​=∑1Ei​​yv,i,e​ if Ei≥1E_i \geq 1Ei​≥1 else 0.
For both aggregation methods, LaunchDarkly treats units for which we do not receive metric events as having a value of zero.
For example, consider a metric named `transaction_value` that is defined as the value in dollars of transactions made by a user. Suppose a particular user had `transaction_value` events during the experiment period with values of 10, 20, and 30.
Here is how the two unit aggregation methods would work:
 * When the average aggregation method is applied, the metric value is calculated as the mean of these events, resulting in `(10+20+30)/3=20`.
 * When the sum aggregation method is applied, the metric value is the total of these events, resulting in `10+20+30=60`.
To learn more, read [Unit aggregation method](/docs/home/metrics/metric-analysis#unit-aggregation-method).
## Conclusion
This guide explained the statistical methods LaunchDarkly applies to Bayesian experiments. To learn about frequentist statistical methods in LaunchDarkly, read [Experimentation statistical methodology for frequentist experiments](/docs/guides/statistical-methodology/methodology-frequentist).
##### Want to know more? Start a trial.
Your 14-day trial begins as soon as you sign up. Get started in minutes using the in-app Quickstart. You'll discover how easy it is to release, monitor, and optimize your software. 
Want to try it out? [Start a trial](https://app.launchdarkly.com/signup).
[![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)![Logo](https://files.buildwithfern.com/https://launchdarkly.docs.buildwithfern.com/docs/a8964c2c365fb94c416a0e31ff873d21ce0c3cbf40142e7e66cce5ae08a093af/assets/logo-dark.svg)](/docs/home)
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs
LaunchDarkly docs